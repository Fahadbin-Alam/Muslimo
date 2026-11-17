import { cloud, glow, n, nightSky, palm, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3 } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, goldCoin, jug, LIGHT, sparkRising, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { restingCamel, showAt, showFor } from "./roadArt";
import { GREY } from "./lovedArt";
import { cup } from "./hopeArt";
import { kabah } from "./historyArt";
import { quickStrokes } from "./seenArt";

/**
 * What was given, asked and answered in his ﷺ days: the Ash'aris, known by their recitation at night; the gold of
 * charity he did not keep overnight; Dimam's questions in the masjid; a camel paid back better than its age; the gates
 * of Paradise for those who spend a pair; the Ash'aris sharing their food equally; and the drink at the drinking place
 * and at Zamzam. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and
 * no person is ever drawn, not even a hand or a face, and no one is drawn on a camel: where someone was, a ring or a
 * small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn
 * for Allah, and nothing comes down from the sky: a recitation or a prayer is a spark that rises, and Paradise is only
 * far off, a soft light with no sun in it.
 */

/** A small heap of gold, its foot's middle at (x, y). */
const goldHeap = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${y} Q${x} ${n(y - 3.2)} ${n(x + 2.6)} ${y} Z" fill="#E8B83A"/>` +
  `<circle cx="${n(x - 0.9)}" cy="${n(y - 0.9)}" r="0.55" fill="#FFE58A"/><circle cx="${n(x + 0.8)}" cy="${n(y - 1.3)}" r="0.5" fill="#FFE58A"/><circle cx="${n(x + 0.1)}" cy="${n(y - 2)}" r="0.45" fill="#FFF0B0"/>`;

/** A piece of gold, its middle at (x, y). */
const goldPiece = (x: number, y: number) =>
  `<path d="M${n(x - 1.3)} ${n(y + 0.7)} L${n(x - 0.7)} ${n(y - 0.8)} L${n(x + 0.9)} ${n(y - 0.7)} L${n(x + 1.4)} ${n(y + 0.7)} Z" fill="#F2C94C" stroke="#B8902E" stroke-width="0.3"/>`;

/** A thing turned to face the other way about the upright line x = `cx`. */
const facingLeft = (svg: string, cx: number) => `<g transform="translate(${n(cx * 2)} 0) scale(-1 1)">${svg}</g>`;

/** A cord tied about a kneeling camel's foreleg, its middle at (x, y). */
const cord = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="0.8" stroke="#5E4024" stroke-width="0.6" fill="none"/><path d="M${n(x + 1.2)} ${n(y + 0.3)} L${n(x + 2.6)} ${n(y + 1.2)}" stroke="#5E4024" stroke-width="0.5" stroke-linecap="round"/>`;

/** A gate of Paradise far off, open, a light in it: two golden posts and an arch, its foot's middle at (x, y). */
const farGate = (x: number, y: number, w = 10, h = 12) =>
  `<path d="M${n(x - w / 2 + 1.1)} ${y} L${n(x - w / 2 + 1.1)} ${n(y - h * 0.58)} Q${x} ${n(y - h * 1.04)} ${n(x + w / 2 - 1.1)} ${n(y - h * 0.58)} L${n(x + w / 2 - 1.1)} ${y} Z" fill="#FFF6D6" opacity="0.85"/>` +
  `<path d="M${n(x - w / 2)} ${y} L${n(x - w / 2)} ${n(y - h * 0.6)} Q${x} ${n(y - h * 1.12)} ${n(x + w / 2)} ${n(y - h * 0.6)} L${n(x + w / 2)} ${y}" stroke="${GOLD}" stroke-width="1.2" fill="none"/>`;

/** A small flag on its pole, the pole's foot at (x, y): a plain dark cloth with a light edge. */
const smallFlag = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - 7)}" stroke="#8A6A42" stroke-width="0.6" stroke-linecap="round"/>` +
  `<path d="M${n(x + 0.3)} ${n(y - 6.9)} Q${n(x + 2)} ${n(y - 7.5)} ${n(x + 3.8)} ${n(y - 6.8)} L${n(x + 3.8)} ${n(y - 4.4)} Q${n(x + 2)} ${n(y - 5.1)} ${n(x + 0.3)} ${n(y - 4.6)} Z" fill="#3B3632" stroke="#DCD2BE" stroke-width="0.3"/>`;

/** A cloth spread on the ground, its middle at (x, y). */
const spreadCloth = (x: number, y: number, rx = 11, ry = 3) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#E9E2D0"/><ellipse cx="${x}" cy="${y}" rx="${n(rx - 1.4)}" ry="${n(ry - 0.8)}" fill="none" stroke="#C9BFA6" stroke-width="0.4"/>`;

/** A little food, a few dates and a crust, its foot's middle at (x, y). */
const littleFood = (x: number, y: number) =>
  `<ellipse cx="${n(x - 1.2)}" cy="${n(y - 0.6)}" rx="1.6" ry="0.7" fill="#C9A26A"/>` +
  `<ellipse cx="${n(x + 0.9)}" cy="${n(y - 0.7)}" rx="0.8" ry="0.6" fill="#93391B"/><ellipse cx="${n(x + 1.9)}" cy="${n(y - 0.5)}" rx="0.7" ry="0.55" fill="#7A2E14"/>`;

/** A heap of food on the cloth, dates and bread, its foot's middle at (x, y). */
const gatheredHeap = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${y} Q${x} ${n(y - 6)} ${n(x + 6)} ${y} Z" fill="#C9A26A"/>` +
  [
    [-3, -1],
    [-1.2, -2.4],
    [0.8, -3],
    [2.6, -1.6],
    [0, -1],
    [-2, -0.4],
    [3.8, -0.5]
  ]
    .map(([dx, dy], i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.8" ry="0.6" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`)
    .join("");

/** A wooden bowl, the one vessel they shared with, its rim's middle at (x, y). */
const vessel = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${y} Q${x} ${n(y + 3.4)} ${n(x + 3)} ${y} Z" fill="#9A6234"/><ellipse cx="${x}" cy="${y}" rx="3" ry="0.8" fill="#C98B4E"/>`;

/** An equal share, a bowl of it, its rim's middle at (x, y). */
const share = (x: number, y: number) =>
  `<path d="M${n(x - 1.8)} ${y} Q${x} ${n(y + 2)} ${n(x + 1.8)} ${y} Z" fill="#9A6234"/><ellipse cx="${x}" cy="${n(y - 0.3)}" rx="1.7" ry="0.6" fill="#93391B"/>`;

// The Ash'aris, known by their recitation. Abu Musa said: the Prophet ﷺ said: I know the voices of the company of the
// Ash'aris with the Quran when they come in at night, and I know where they stay from their voices with the Quran at
// night, though I had not seen where they stayed when they stopped there by day (Sahih al-Bukhari 4232). No one is
// drawn: at night, by the masjid of Madinah, his place is a golden ring; beyond a dune the homes of the Ash'aris stand.
// Their places come along the way with their voices, and go in at the doors; then the voices are in the homes. Faint
// golden lines go from his place over the dune to each home, and soft golden rings come about them: known by their
// voices. Lights come on in the homes, and sparks of their recitation rise. Then the day comes: the night lifts, the sun
// shows, and a grey line from his place stops at the dune, a grey ring there: not seen by day. Their camels kneel by
// the homes, and their places are by them: where they stopped by day.
function ashariRecitation(): SignArt {
  const his: [number, number] = [18, 105];
  const homes: [number, number][] = [
    [110, 101],
    [124, 97.6],
    [138, 101],
    [151, 97.6]
  ];
  return {
    kind: "ashari-recitation",
    ms: 11000,
    parts: [
      { name: "the sky at night", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [40, 14],
          [62, 26],
          [86, 12],
          [104, 24],
          [124, 12],
          [146, 22],
          [12, 32]
        ]),
        keys: track({
          opacity: [
            [0.69, 1],
            [0.72, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      {
        name: "the moon",
        svg: glow(26, 22, 10, "#FFF6D0", 0.08) + crescent(26, 22, 5, 2.4, "#FFF3B8"),
        keys: track({
          opacity: [
            [0.69, 1],
            [0.72, 0]
          ]
        })
      },
      { name: "the sky by day", svg: sky("#BFE3FA", "#DDF1FC", 62), keys: showAt(0.69, 0.74) },
      { name: "the sun by day", svg: sun(132, 20), keys: showAt(0.7, 0.74) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a dune between", svg: `<path d="M44 108 Q60 84 74 83 Q88 82 102 108 Z" fill="#D8C08E"/><path d="M52 100 Q66 88 74 87" stroke="#C4AA78" stroke-width="0.6" fill="none"/>` },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 99, 0.5) },
      { name: "a palm of Madinah", svg: palm(34, 99, 15), origin: { x: 34, y: 99 }, loop: { move: "sway", ms: 5400, angle: 1.2 } },
      ...homes.map(([x, y], i): SignPart => ({ name: `where they stay: a home ${i + 1}`, svg: home(x, y, 12, 9) })),
      {
        name: "the dark of the night",
        svg: `<rect width="160" height="120" fill="#0B1430" opacity="0.5"/>`,
        keys: track({
          opacity: [
            [0.69, 1],
            [0.74, 0]
          ]
        })
      },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "hearing them: a soft ring about his place", svg: care(his[0], his[1], 5, 2.6, GOLD), keys: showFor(0.07, 0.1, 0.69, 0.7), loop: soft },
      ...homes.map(([x, y], i): SignPart => {
        const from: [number, number] = [n(x + 5), 108.4];
        const goes = at3(0.2 + i * 0.01);
        return {
          name: `the company, coming in at night ${i + 1}`,
          svg: someone(from[0], from[1], 1.4, LIGHT),
          keys: track({
            xy: [
              [goes, 0, 0],
              [at3(goes + 0.04), n(x - 1.8 - from[0]), n(y - 1 - from[1])]
            ],
            opacity: [
              [0.03, 0],
              [0.05, 1],
              [at3(goes + 0.05), 1],
              [at3(goes + 0.07), 0]
            ]
          })
        };
      }),
      { name: "their voices with the Quran, on the way", svg: arcs(128, 103, LIGHT), keys: showFor(0.04, 0.06, 0.2, 0.21), loop: speaking },
      ...homes.map(([x, y], i): SignPart => ({
        name: `their voices with the Quran, in the homes ${i + 1}`,
        svg: arcs(n(x + 2), n(y - 12.6), LIGHT),
        keys: showFor(at3(0.28 + i * 0.004), at3(0.288 + i * 0.004), 0.69, 0.7),
        loop: { ...speaking, phase: i / 4 }
      })),
      ...homes.map(([x, y], i): SignPart => ({
        name: `knowing where they stay: a faint golden line ${i + 1}`,
        svg: lookLine(n(his[0] + 2), n(his[1] - 2.4), x, n(y - 4.4), 60, GOLD),
        keys: showFor(at3(0.37 + i * 0.01), at3(0.39 + i * 0.01), 0.69, 0.7)
      })),
      ...homes.map(([x, y], i): SignPart => ({
        name: `known by their voices: a soft golden ring ${i + 1}`,
        svg: care(x, n(y - 4.6), 8.4, 6.4, GOLD),
        keys: showFor(at3(0.41 + i * 0.01), at3(0.43 + i * 0.01), 0.69, 0.7)
      })),
      ...homes.map(([x, y], i): SignPart => ({
        name: `a light in the home ${i + 1}`,
        svg: glow(n(x + 3.3), n(y - 5.3), 3, "#FFD866", 0.3) + `<rect x="${n(x + 2)}" y="${n(y - 6.6)}" width="2.6" height="2.6" fill="#FFD866"/>`,
        keys: showFor(at3(0.53 + i * 0.008), at3(0.55 + i * 0.008), 0.69, 0.71)
      })),
      ...homes.map(([x, y], i): SignPart => ({
        name: `their recitation: a spark rising ${i + 1}`,
        svg: sparkle(x, n(y - 13), 1.5, "#FFE7A0"),
        keys: sparkRising(at3(0.54 + i * 0.012), at3(0.58 + i * 0.012), 10),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      })),
      { name: "by day: a grey line, stopping at the dune", svg: lookLine(n(his[0] + 2), n(his[1] - 2.4), 62, 88.4, 86, GREY), keys: showAt(0.75, 0.77) },
      { name: "not seen by day: a grey ring at the dune", svg: greyRing(62, 88.4, 4, 2.6), keys: showAt(0.77, 0.79) },
      { name: "stopped there by day: camels kneeling", svg: restingCamel(117, 108.4, 0.42) + restingCamel(145, 107.8, 0.42), keys: showAt(0.87, 0.9) },
      ...homes.map(([x, y], i): SignPart => ({
        name: `where they stopped by day: their places ${i + 1}`,
        svg: someone(n(x - 7.4), n(y + 1), 1.4),
        keys: showAt(at3(0.88 + i * 0.01), at3(0.9 + i * 0.01))
      }))
    ],
    words: [
      { text: "I know the voices of the Ash'aris", from: 0.02, to: 0.17 },
      { text: "With the Quran, when they come in at night", from: 0.19, to: 0.34 },
      { text: "I know where they stay by their voices", from: 0.36, to: 0.5 },
      { text: "With the Quran at night", from: 0.52, to: 0.66 },
      { text: "Though I had not seen where they stayed", from: 0.68, to: 0.84 },
      { text: "When they stopped there by day", from: 0.86, to: 1 }
    ]
  };
}

// The gold not kept overnight. Uqbah ibn al-Harith said: the Prophet ﷺ prayed Asr with us, then he hurried and went
// into the house, and soon came out again. I said, or it was said to him, and he said: I had left in the house some
// gold of charity, and I disliked to keep it overnight, so I shared it out (Sahih al-Bukhari 1430). No one is drawn:
// in the afternoon, by the masjid of Madinah, the folk's places pray Asr, and sparks of their prayer rise. His place, a
// golden ring, goes quickly to his house, quick strokes behind it, and in at its door; a light shows in the door. It
// comes out again, and the folk's voice asks. His voice answers, and gold of charity shows in the house, a glow about
// it. The sun goes lower and the sky warms, the evening coming, and a grey ring comes about the gold: not to be kept
// overnight. Then pieces of the gold go out to homes nearby, and a warm glow comes on each.
function goldNotKeptOvernight(): SignArt {
  const his: [number, number] = [24, 101.6];
  const door: [number, number] = [54.2, 100.6];
  const out: [number, number] = [44, 102];
  const folk: [number, number][] = [
    [12, 105.6],
    [20, 105.6],
    [28, 105.6],
    [36, 105.6],
    [16, 107.6],
    [32, 107.6]
  ];
  const homesNear: [number, number][] = [
    [104, 99],
    [124, 100],
    [144, 99]
  ];
  const gold: [number, number] = [59.3, 93.6];
  const goes = (from: number, to: number, x: number, y: number) =>
    track({
      xy: [
        [from, 0, 0],
        [to, n(x - gold[0]), n(y - gold[1])]
      ],
      opacity: [
        [0.86, 0],
        [0.87, 1],
        [at3(to + 0.01), 1],
        [at3(to + 0.02), 0]
      ]
    });
  return {
    kind: "gold-not-kept-overnight",
    ms: 10000,
    parts: [
      { name: "the sky of the afternoon", svg: sky("#C4E0F2", "#F1E3C4", 62) },
      { name: "the evening coming: a warm sky", svg: sky("#F0C08C", "#F8E0BA", 62), keys: showAt(0.69, 0.78) },
      {
        name: "the sun of the afternoon, going lower",
        svg: sun(128, 38),
        keys: track({
          xy: [
            [0.69, 0, 0],
            [0.78, 0, 14]
          ]
        })
      },
      { name: "a cloud", svg: cloud(48, 24, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 0.62) },
      { name: "his house, by the masjid", svg: home(56, 100, 14, 11) },
      { name: "a palm of Madinah", svg: palm(80, 99, 17), origin: { x: 80, y: 99 }, loop: { move: "sway", ms: 5600, angle: 1.4 } },
      ...homesNear.map(([x, y], i): SignPart => ({ name: `homes nearby ${i + 1}`, svg: home(x, y, 12, 9) })),
      { name: "the folk's places, praying Asr", svg: folk.map(([x, y]) => someone(x, y, 1.4)).join("") },
      ...[12, 24, 36].map((x, i): SignPart => ({
        name: `their prayer: a spark rising ${i + 1}`,
        svg: sparkle(x, 99.6, 1.5, "#FFE7A0"),
        keys: sparkRising(at3(0.03 + i * 0.01), at3(0.06 + i * 0.01), 10),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      })),
      { name: "a light in the door: he is in the house", svg: glow(door[0], 97, 4.2, "#FFE7A0", 0.5), keys: showFor(0.22, 0.25, 0.37, 0.38) },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.09, 0, 0],
            [0.125, n(door[0] - his[0]), n(door[1] - his[1])],
            [0.39, n(door[0] - his[0]), n(door[1] - his[1])],
            [0.43, n(out[0] - his[0]), n(out[1] - his[1])]
          ],
          opacity: [
            [0.2, 1],
            [0.23, 0],
            [0.37, 0],
            [0.39, 1]
          ]
        })
      },
      {
        name: "hurrying: quick strokes behind his place",
        svg: `<g opacity="0.9">${quickStrokes(n(his[0] - 3.4), his[1])}</g>`,
        keys: track({
          xy: [
            [0.09, 0, 0],
            [0.125, n(door[0] - his[0]), n(door[1] - his[1])]
          ],
          opacity: [
            [0.09, 0],
            [0.095, 1],
            [0.12, 1],
            [0.125, 0]
          ]
        })
      },
      { name: "the folk's voice, asking", svg: arcs(38.4, 101.4, VOICE), keys: showFor(0.43, 0.44, 0.53, 0.54), loop: speaking },
      { name: "his voice: I had left gold of charity", svg: arcsLeft(41, 98.6, GOLD), keys: showFor(0.53, 0.54, 0.87, 0.88), loop: speaking },
      { name: "gold of charity, left in the house: a glow", svg: glow(gold[0], n(gold[1] - 1), 5, "#FFE07A", 0.5), keys: showFor(0.54, 0.57, 0.87, 0.89), loop: soft },
      { name: "gold of charity, left in the house", svg: goldHeap(gold[0], n(gold[1] + 0.8)), keys: showFor(0.54, 0.56, 0.87, 0.88) },
      { name: "not to be kept overnight: a grey ring about the gold", svg: greyRing(gold[0], n(gold[1] - 0.6), 5, 3.6), keys: showFor(0.72, 0.75, 0.87, 0.88) },
      ...homesNear.map(([x, y], i): SignPart => ({
        name: `shared out: a piece of the gold, going ${i + 1}`,
        svg: goldPiece(gold[0], gold[1]),
        keys: goes(0.87, at3(0.91 + i * 0.01), n(x - 3), n(y - 2))
      })),
      ...homesNear.map(([x, y], i): SignPart => ({
        name: `shared out: a piece of the gold, given ${i + 1}`,
        svg: goldPiece(n(x - 3), n(y - 2)),
        keys: showAt(at3(0.92 + i * 0.01), at3(0.93 + i * 0.01))
      })),
      ...homesNear.map(([x, y], i): SignPart => ({
        name: `a warm glow on the home ${i + 1}`,
        svg: glow(x, n(y - 4), 8, WARM, 0.3),
        keys: showAt(at3(0.92 + i * 0.01), at3(0.94 + i * 0.01)),
        loop: soft
      }))
    ],
    words: [
      { text: "He prayed Asr with us, then hurried", from: 0.02, to: 0.17 },
      { text: "He went into the house", from: 0.19, to: 0.34 },
      { text: "And soon came out again", from: 0.36, to: 0.5 },
      { text: "I had left gold of charity in the house", from: 0.52, to: 0.66 },
      { text: "I disliked to keep it overnight", from: 0.68, to: 0.84 },
      { text: "So I shared it out", from: 0.86, to: 1 }
    ]
  };
}

// Dimam's questions. Anas said: while we were sitting with the Prophet ﷺ in the masjid, a man came in on a camel; he
// made it kneel in the masjid, then tied it. He said: I will ask you, and be hard in asking, so do not be angry with
// me. He said: ask whatever you want. He said: I ask you by your Lord: did Allah send you to all the people? He said:
// by Allah, yes. He said: I ask you by Allah: did Allah order that we pray the five prayers in the day and the night?
// He said: by Allah, yes. Then the man said: I believe in what you have brought (Sahih al-Bukhari 63). No one is drawn,
// and no one on the camel: in the yard of the masjid of Madinah, within its low walls of mud brick, his place is a
// golden ring among the folk's places. A camel comes in, the asker's place beside it; the camel kneels, and a cord is tied about its foreleg. The asker's place comes
// near, and its voice asks; his voice answers, and a soft ring comes about his place. The asker's voice asks again, and
// far off, small places show on every side: all the people. His voice answers, a warm glow about his place. The asker's
// voice asks of the five prayers, and five sparks rise from the masjid, one by one. Then a warm glow comes about the
// asker's place: I believe.
function dimamQuestions(): SignArt {
  const his: [number, number] = [54, 101];
  const folk: [number, number][] = [
    [42, 100.4],
    [44, 105.8],
    [64, 105.8],
    [66, 100.4],
    [34, 104]
  ];
  const kneel: [number, number] = [102, 107];
  const asker: [number, number] = [118, 106];
  const near: [number, number] = [80, 103];
  const far: [number, number][] = [
    [8, 64],
    [16, 66],
    [26, 63.4],
    [132, 64],
    [142, 66],
    [152, 63.4]
  ];
  const prayers = [36, 45, 54, 63, 72];
  return {
    kind: "dimam-questions",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(134, 18) },
      { name: "a cloud", svg: cloud(20, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      {
        name: "the masjid's low walls of mud brick, about its yard",
        svg: `<path d="M0 86.4 L30 86.4 L30 92 L0 92 Z M78 86.4 L160 86.4 L160 92 L78 92 Z" fill="#D8B98A"/><path d="M0 86.4 L30 86.4 M78 86.4 L160 86.4" stroke="#B89A6C" stroke-width="0.6"/>`
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(30, 92, 1) },
      { name: "a palm of Madinah 1", svg: palm(22, 96, 18), origin: { x: 22, y: 96 }, loop: { move: "sway", ms: 5200, angle: 1.4 } },
      { name: "a palm of Madinah 2", svg: palm(92, 94, 19), origin: { x: 92, y: 94 }, loop: { move: "sway", ms: 5800, angle: 1.4, phase: 0.5 } },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.8, GOLD) },
      { name: "the folk's places, sitting with him", svg: folk.map(([x, y]) => someone(x, y, 1.5)).join("") },
      {
        name: "a camel, coming into the masjid",
        svg: camel(kneel[0], kneel[1], 0.18, true),
        keys: track({
          xy: [
            [0.03, 44, 0],
            [0.08, 0, 0]
          ],
          opacity: [
            [0.15, 1],
            [0.17, 0]
          ]
        })
      },
      { name: "the camel, kneeling", svg: facingLeft(restingCamel(kneel[0], kneel[1], 0.6).replace(/#8E6E46/g, "#DCA85E").replace(/#76583A/g, "#BC8642"), kneel[0]), keys: showAt(0.15, 0.17) },
      { name: "tied: a cord about its foreleg", svg: cord(n(kneel[0] - 4.6), n(kneel[1] - 1.2)), keys: showAt(0.19, 0.21) },
      {
        name: "the asker's place",
        svg: someone(asker[0], asker[1], 1.5),
        keys: track({
          xy: [
            [0.03, 44, 0],
            [0.08, 0, 0],
            [0.28, 0, 0],
            [0.33, n(near[0] - asker[0]), n(near[1] - asker[1])]
          ]
        })
      },
      { name: "the asker's voice: I will be hard in asking", svg: arcsLeft(n(near[0] - 3.4), n(near[1] - 4), VOICE), keys: showFor(0.33, 0.34, 0.4, 0.41), loop: speaking },
      { name: "his voice: ask whatever you want", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showFor(0.41, 0.42, 0.52, 0.53), loop: speaking },
      { name: "not angry: a soft ring about his place", svg: care(his[0], his[1], 6, 3.2, GOLD), keys: showAt(0.42, 0.45), loop: soft },
      { name: "the asker's voice: were you sent to all the folk", svg: arcsLeft(n(near[0] - 3.4), n(near[1] - 4), VOICE), keys: showFor(0.53, 0.54, 0.64, 0.65), loop: speaking },
      ...far.map(([x, y], i): SignPart => ({ name: `to all the folk: small places far off ${i + 1}`, svg: someone(x, y, 0.9), keys: showAt(at3(0.55 + i * 0.004), at3(0.56 + i * 0.004)) })),
      { name: "his voice: yes", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showFor(0.65, 0.66, 0.76, 0.77), loop: speaking },
      { name: "yes: a warm glow about his place", svg: glow(his[0], n(his[1] - 1), 6, WARM, 0.3), keys: showAt(0.66, 0.7), loop: soft },
      { name: "the asker's voice: the five prayers", svg: arcsLeft(n(near[0] - 3.4), n(near[1] - 4), VOICE), keys: showFor(0.77, 0.78, 0.88, 0.89), loop: speaking },
      ...prayers.map((x, i): SignPart => ({
        name: `the five prayers: a spark rising ${i + 1}`,
        svg: sparkle(x, 68, 1.6, "#FFE7A0"),
        keys: sparkRising(at3(0.778 + i * 0.006), at3(0.798 + i * 0.006), 10),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      })),
      { name: "his voice, answering again", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showFor(0.81, 0.82, 0.88, 0.885), loop: speaking },
      { name: "the asker's voice: I believe", svg: arcsLeft(n(near[0] - 3.4), n(near[1] - 4), VOICE), keys: showAt(0.89, 0.9), loop: speaking },
      { name: "I believe: a warm glow about the asker's place", svg: glow(near[0], n(near[1] - 1), 6, WARM, 0.32), keys: showAt(0.89, 0.93), loop: soft }
    ],
    words: [
      { text: "A man came into the masjid on a camel", from: 0.02, to: 0.125 },
      { text: "He made it kneel there, then tied it", from: 0.14, to: 0.265 },
      { text: "I will be hard in asking: do not be angry", from: 0.28, to: 0.385 },
      { text: "Ask whatever you want", from: 0.4, to: 0.505 },
      { text: "Did Allah send you to all the people?", from: 0.52, to: 0.625 },
      { text: "He said: by Allah, yes", from: 0.64, to: 0.745 },
      { text: "Did Allah order that we pray five prayers?", from: 0.76, to: 0.865 },
      { text: "I believe in what you have brought", from: 0.88, to: 1 }
    ]
  };
}

// Paid back better. Abu Hurairah said: the Prophet ﷺ took a camel of a certain age, and its owner came asking for it
// back. He said: one who has a right has a say. Then he gave him back better than its age, and said: the best of you
// are the best of you in repaying (Sahih al-Bukhari 2609). No one is drawn: by the masjid of Madinah, his place is a
// golden ring. A young camel goes from its owner's place to his. The owner's place comes, and its voice asks for it
// back. His voice speaks, and a soft ring comes about the owner's place: a right, and a say. Then a bigger, older camel
// comes from the herd to the owner's place, a soft golden ring about it: better than its age. A warm glow comes about
// his place: the best in repaying.
function repaidBetter(): SignArt {
  const his: [number, number] = [40, 103];
  const owner: [number, number] = [124, 104];
  const comes: [number, number] = [72, 104];
  const young: [number, number] = [116, 107];
  const older: [number, number] = [146, 107.6];
  return {
    kind: "repaid-better",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(20, 18) },
      { name: "clouds", svg: cloud(70, 24, 0.55, "#FFFFFF", 0.9) + cloud(124, 18, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 99, 0.56) },
      { name: "a palm of Madinah 1", svg: palm(96, 97, 17), origin: { x: 96, y: 97 }, loop: { move: "sway", ms: 5400, angle: 1.4 } },
      { name: "a palm of Madinah 2", svg: palm(156, 96, 19), origin: { x: 156, y: 96 }, loop: { move: "sway", ms: 6000, angle: 1.4, phase: 0.5 } },
      { name: "the herd's camels, resting", svg: restingCamel(132, 97, 0.36) + restingCamel(148, 95.6, 0.34) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.8, GOLD) },
      {
        name: "a young camel, taken",
        svg: camel(young[0], young[1], 0.12, true),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.12, n(his[0] + 10 - young[0]), -1]
          ]
        })
      },
      {
        name: "its owner's place",
        svg: someone(owner[0], owner[1], 1.5),
        keys: track({
          xy: [
            [0.23, 0, 0],
            [0.3, n(comes[0] - owner[0]), 0]
          ]
        })
      },
      { name: "the owner's voice, asking for it back", svg: arcsLeft(n(comes[0] - 3.4), n(comes[1] - 4.2), VOICE), keys: showFor(0.3, 0.31, 0.42, 0.43), loop: speaking },
      { name: "his voice: one who has a right has a say", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showFor(0.43, 0.44, 0.62, 0.63), loop: speaking },
      { name: "a right, and a say: a soft ring about the owner's place", svg: care(comes[0], comes[1], 5, 2.8, GOLD), keys: showAt(0.45, 0.49), loop: soft },
      {
        name: "better than its age: an older camel, going to the owner",
        svg: camel(older[0], older[1], 0.17, true),
        keys: track({
          xy: [
            [0.63, 0, 0],
            [0.72, n(comes[0] + 9 - older[0]), -1.6]
          ]
        })
      },
      { name: "better than its age: a soft golden ring about it", svg: care(n(comes[0] + 9), n(older[1] - 2.6), 10, 3.6, GOLD), keys: showAt(0.73, 0.76), loop: soft },
      { name: "his voice: the best of you are the best in repaying", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showAt(0.83, 0.84), loop: speaking },
      { name: "the best in repaying: a warm glow about his place", svg: glow(his[0], n(his[1] - 1), 6.4, WARM, 0.32), keys: showAt(0.83, 0.87), loop: soft }
    ],
    words: [
      { text: "He took a camel of a certain age", from: 0.02, to: 0.2 },
      { text: "Its owner came, asking for it back", from: 0.22, to: 0.4 },
      { text: "One who has a right has a say", from: 0.42, to: 0.6 },
      { text: "He gave him back better than its age", from: 0.62, to: 0.8 },
      { text: "The best of you are the best in repaying", from: 0.82, to: 1 }
    ]
  };
}

// Called from every gate. Abu Hurairah said: I heard the Messenger of Allah ﷺ say: whoever spends a pair of anything in
// the cause of Allah will be called from the gates of Paradise: O servant of Allah, this is good. Whoever was of the
// people of prayer will be called from the gate of prayer; whoever was of the people of jihad, from the gate of jihad;
// whoever was of the people of charity, from the gate of charity; and whoever was of the people of fasting, from the
// gate of fasting, the gate of ar-Rayyan. Abu Bakr said: is anyone called from all of them, O Messenger of Allah? He
// said: yes, and I hope you will be one of them (Sahih al-Bukhari 3666). No one is drawn: far off, beyond the land,
// Paradise is a soft light with no sun in it, and four gates stand open in it. His place is a golden ring, his voice
// speaking. A place spends a pair, two coins, and they rise and are gone. A soft call comes from the gates, and a warm
// glow about that place. Then each gate in turn lights, a sign over it: a spark for prayer, a small flag for jihad, a
// coin for charity, a crescent for fasting; places come below it, and a golden way goes from them to their gate. Abu
// Bakr's place shows, its voice asking; his voice answers, golden ways go from Abu Bakr's place to all four gates, and
// a warm glow comes about it.
function everyGate(): SignArt {
  const his: [number, number] = [26, 102];
  const spender: [number, number] = [80, 104];
  const abuBakr: [number, number] = [118, 103];
  const foot = 64;
  const gates = [34, 64, 96, 126];
  const signs = [
    sparkle(gates[0], 47.6, 1.5, "#FFE7A0"),
    smallFlag(n(gates[1] - 1.8), 50.6),
    goldCoin(gates[2], 47.8, 1.5),
    crescent(n(gates[3] - 0.6), 47.8, 1.8, 0.9, "#E8C25A")
  ];
  const signNames = ["the gate of prayer: a spark over it", "the gate of jihad: a small flag over it", "the gate of charity: a coin over it", "the gate of fasting, ar-Rayyan: a crescent over it"];
  const gateNames = ["the gate of prayer", "the gate of jihad", "the gate of charity", "the gate of fasting, ar-Rayyan"];
  const groupNames = ["those of prayer", "those of jihad", "those of charity", "those of fasting"];
  const lines = [0.28, 0.4, 0.52, 0.64];
  return {
    kind: "every-gate",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#D2E8F6", "#EDE0BC", 61) },
      { name: "a cloud", svg: cloud(140, 20, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: land() },
      { name: "Paradise far off: a soft light with no sun in it", svg: wash(80, 56, 78, 14, "#FFF8E6", 0.3) + glow(80, 54, 30, "#FFF3C0", 0.16) },
      { name: "a far rise in the light", svg: `<path d="M0 66 Q40 59 80 60 Q120 59 160 66 L160 70 Q80 66 0 70 Z" fill="#EAF2D6"/>` },
      ...gates.map((x, i): SignPart => ({ name: `${gateNames[i]}, standing open`, svg: farGate(x, foot) })),
      ...gates.map((x, i): SignPart => ({
        name: `a soft light in ${gateNames[i]}`,
        svg: glow(x, n(foot - 6), 7, "#FFFFFF", 0.4),
        keys: showAt(at3(0.15 + i * 0.006), at3(0.17 + i * 0.006))
      })),
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.8, GOLD) },
      { name: "his voice, speaking", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showFor(0.03, 0.04, 0.76, 0.77), loop: speaking },
      { name: "the place of one who spends", svg: someone(spender[0], spender[1], 1.5) },
      ...[-3.4, 3.4].map((dx, i): SignPart => ({
        name: `spending a pair: a coin ${i + 1}`,
        svg: goldCoin(n(spender[0] + dx), n(spender[1] - 4.6), 1.4),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.08, n(dx * 0.6), -8]
          ],
          opacity: [
            [0.03, 0],
            [0.04, 1],
            [0.07, 1],
            [0.08, 0]
          ]
        })
      })),
      ...gates.map((x, i): SignPart => ({
        name: `the call from ${gateNames[i]}: soft arcs`,
        svg: arcs(n(x + 5.4), n(foot - 8), "#E8C25A"),
        keys: showFor(at3(0.16 + i * 0.006), at3(0.17 + i * 0.006), 0.28, 0.29),
        loop: { ...speaking, phase: i / 4 }
      })),
      { name: "called: a warm glow about the place of one who spends", svg: glow(spender[0], n(spender[1] - 1), 6, WARM, 0.32), keys: showAt(0.18, 0.21), loop: soft },
      ...gates.map((_, i): SignPart => ({ name: signNames[i], svg: signs[i], keys: showAt(at3(lines[i] + 0.01), at3(lines[i] + 0.03)) })),
      ...gates.map((x, i): SignPart => ({
        name: `${gateNames[i]}: a soft golden ring about it`,
        svg: care(x, n(foot - 6), 8, 8.6, GOLD),
        keys: showAt(at3(lines[i] + 0.02), at3(lines[i] + 0.05))
      })),
      ...gates.map((x, i): SignPart => ({
        name: `${groupNames[i]}: their places`,
        svg: someone(n(x - 4), 107, 1.3) + someone(n(x + 4), 107.4, 1.3),
        keys: showAt(at3(lines[i] + 0.01), at3(lines[i] + 0.03))
      })),
      ...gates.map((x, i): SignPart => ({
        name: `${groupNames[i]}: a golden way to their gate`,
        svg: way(`M${x} 105 C${x} 92 ${x} 80 ${x} ${foot + 1}`, GOLD, 0.9),
        keys: showAt(at3(lines[i] + 0.03), at3(lines[i] + 0.06))
      })),
      { name: "Abu Bakr's place", svg: someone(abuBakr[0], abuBakr[1], 1.5), keys: showAt(0.77, 0.79) },
      { name: "Abu Bakr's voice: is anyone called from all of them", svg: arcsLeft(n(abuBakr[0] - 3.4), n(abuBakr[1] - 4.2), VOICE), keys: showFor(0.78, 0.79, 0.88, 0.89), loop: speaking },
      { name: "his voice: yes, and I hope you are one of them", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showAt(0.89, 0.9), loop: speaking },
      ...gates.map((x, i): SignPart => ({
        name: `hoped for: a golden way from Abu Bakr's place to ${gateNames[i]}`,
        svg: way(`M${abuBakr[0]} ${n(abuBakr[1] - 2)} Q${n((abuBakr[0] + x) / 2)} ${n(foot + 20 + i * 2)} ${x} ${foot + 1}`, GOLD, 0.8),
        keys: showAt(at3(0.9 + i * 0.008), at3(0.91 + i * 0.008))
      })),
      { name: "hoped for: a warm glow about Abu Bakr's place", svg: glow(abuBakr[0], n(abuBakr[1] - 1), 6, WARM, 0.34), keys: showAt(0.92, 0.95), loop: soft }
    ],
    words: [
      { text: "Whoever spends a pair in Allah's cause", from: 0.02, to: 0.125 },
      { text: "Is called from the gates of Paradise", from: 0.14, to: 0.265 },
      { text: "The people of prayer: the gate of prayer", from: 0.28, to: 0.385 },
      { text: "The people of jihad: the gate of jihad", from: 0.4, to: 0.505 },
      { text: "The people of charity: the gate of charity", from: 0.52, to: 0.625 },
      { text: "Of fasting: the gate of fasting, ar-Rayyan", from: 0.64, to: 0.745 },
      { text: "Is anyone called from all of them?", from: 0.76, to: 0.865 },
      { text: "Yes, and I hope you are one of them", from: 0.88, to: 1 }
    ]
  };
}

// The Ash'aris share. Abu Musa said: the Messenger of Allah ﷺ said: when the Ash'aris run short on a campaign, or the
// food of their families runs low in Madinah, they gather what they have in one cloth, then share it among themselves
// equally in one vessel. They are of me, and I am of them (Sahih Muslim 2500). No one is drawn: far off on the left,
// the tents of a campaign, a little food by each, which grows less, and a grey ring comes about them; on the right, the
// homes of Madinah, a little food by each, which grows less, and a grey ring about them. A cloth is spread between, and
// the food goes to it from every tent and home, and is heaped on it. Then a vessel shows by it, and equal shares go
// from the cloth to every tent and home, as the heap goes down. His place shows, a golden ring, and a soft golden ring
// comes about it and the cloth, and a warm glow over every tent and home.
function sharingAshari(): SignArt {
  const tents: [number, number][] = [
    [14, 94],
    [30, 92],
    [46, 94]
  ];
  const homes: [number, number][] = [
    [112, 99],
    [132, 100],
    [150, 99]
  ];
  const cloth: [number, number] = [80, 106];
  const tentFood = tents.map(([x, y]): [number, number] => [n(x + 5.6), n(y + 0.4)]);
  const homeFood = homes.map(([x, y]): [number, number] => [n(x - 8.4), n(y + 2)]);
  const all = [...tentFood, ...homeFood];
  const his: [number, number] = [80, 96];
  return {
    kind: "sharing-ashari",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "clouds", svg: cloud(36, 26, 0.5, "#FFFFFF", 0.9) + cloud(128, 22, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...tents.map(([x, y], i): SignPart => ({ name: `on a campaign: a tent ${i + 1}`, svg: tent(x, y, 10, 7.4) })),
      ...homes.map(([x, y], i): SignPart => ({ name: `in Madinah: the home of their families ${i + 1}`, svg: home(x, y, 12, 9) })),
      { name: "a palm of Madinah", svg: palm(98, 98, 17), origin: { x: 98, y: 98 }, loop: { move: "sway", ms: 5600, angle: 1.4 } },
      ...tentFood.map(([x, y], i): SignPart => ({
        name: `on a campaign: a little food, running short ${i + 1}`,
        svg: littleFood(x, y),
        origin: { x, y },
        keys: track({
          scale: [
            [0.05, 1],
            [0.1, 0.5]
          ],
          xy: [
            [at3(0.45 + i * 0.01), 0, 0],
            [at3(0.5 + i * 0.01), n(cloth[0] - x), n(cloth[1] - 1 - y)]
          ],
          opacity: [
            [at3(0.5 + i * 0.01), 1],
            [at3(0.51 + i * 0.01), 0]
          ]
        })
      })),
      ...homeFood.map(([x, y], i): SignPart => ({
        name: `in Madinah: a little food, running low ${i + 1}`,
        svg: littleFood(x, y),
        origin: { x, y },
        keys: track({
          scale: [
            [0.25, 1],
            [0.3, 0.5]
          ],
          xy: [
            [at3(0.46 + i * 0.01), 0, 0],
            [at3(0.51 + i * 0.01), n(cloth[0] - x), n(cloth[1] - 1 - y)]
          ],
          opacity: [
            [at3(0.51 + i * 0.01), 1],
            [at3(0.52 + i * 0.01), 0]
          ]
        })
      })),
      { name: "running short: a grey ring about the tents", svg: greyRing(30, 91, 24, 7), keys: showFor(0.1, 0.13, 0.43, 0.44) },
      { name: "running low: a grey ring about the homes", svg: greyRing(131, 95, 27, 9), keys: showFor(0.3, 0.33, 0.43, 0.44) },
      { name: "one cloth, spread", svg: spreadCloth(cloth[0], cloth[1]), keys: showAt(0.43, 0.45) },
      {
        name: "gathered in one cloth: a heap",
        svg: gatheredHeap(cloth[0], n(cloth[1] - 0.4)),
        origin: { x: cloth[0], y: cloth[1] },
        keys: track({
          scale: [
            [0.5, 0.3],
            [0.54, 1],
            [0.65, 1],
            [0.74, 0.2]
          ],
          opacity: [
            [0.5, 0],
            [0.52, 1],
            [0.73, 1],
            [0.74, 0]
          ]
        })
      },
      { name: "one vessel", svg: vessel(n(cloth[0] + 15), n(cloth[1] - 1)), keys: showAt(0.63, 0.64) },
      ...all.map(([x, y], i): SignPart => {
        const from = at3(0.64 + i * 0.012);
        return {
          name: `shared equally: a share ${i + 1}`,
          svg: share(cloth[0], n(cloth[1] - 2)),
          keys: track({
            xy: [
              [from, 0, 0],
              [at3(from + 0.03), n(x - cloth[0]), n(y - 1 - cloth[1] + 2)]
            ],
            opacity: [
              [at3(from - 0.002), 0],
              [from, 1]
            ]
          })
        };
      }),
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD), keys: showAt(0.83, 0.85) },
      { name: "of me, and I of them: a soft golden ring", svg: care(80, 101.6, 17, 7.6, GOLD), keys: showAt(0.85, 0.88), loop: soft },
      ...[...tents, ...homes].map(([x, y], i): SignPart => ({
        name: `a warm glow ${i < 3 ? "on the tent" : "on the home"} ${(i % 3) + 1}`,
        svg: glow(x, n(y - 4), 7, WARM, 0.28),
        keys: showAt(at3(0.86 + i * 0.006), at3(0.88 + i * 0.006)),
        loop: soft
      }))
    ],
    words: [
      { text: "When the Ash'aris run short on campaign", from: 0.02, to: 0.2 },
      { text: "Or food runs low for their families", from: 0.22, to: 0.4 },
      { text: "They gather what they have in one cloth", from: 0.42, to: 0.6 },
      { text: "Then share it equally in one vessel", from: 0.62, to: 0.8 },
      { text: "They are of me, and I am of them", from: 0.82, to: 1 }
    ]
  };
}

/** A basin of stone for the drink of the pilgrims, the drinking place, its foot's middle at (x, y). */
const basin = (x: number, y: number) =>
  `<path d="M${n(x - 16)} ${n(y - 8)} L${n(x + 16)} ${n(y - 8)} L${n(x + 14)} ${y} L${n(x - 14)} ${y} Z" fill="#B8A88A"/>` +
  `<rect x="${n(x - 14.6)}" y="${n(y - 7.6)}" width="29.2" height="1.8" fill="#7FB8DA"/><path d="M${n(x - 16)} ${n(y - 8)} L${n(x + 16)} ${n(y - 8)}" stroke="#8E7E62" stroke-width="0.6"/>`;

/** The well of Zamzam: a round wall, two posts and a crossbar, a rope and a bucket; its foot's middle at (x, y). */
const zamzamWell = (x: number, y: number) =>
  `<path d="M${n(x - 7)} ${n(y - 12)} L${n(x - 7)} ${n(y - 4)} M${n(x + 7)} ${n(y - 12)} L${n(x + 7)} ${n(y - 4)}" stroke="#7A5A38" stroke-width="1"/>` +
  `<path d="M${n(x - 8)} ${n(y - 12)} L${n(x + 8)} ${n(y - 12)}" stroke="#5E4024" stroke-width="1.2" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y - 4.4)}" rx="7.6" ry="1.8" fill="#3E5A6E"/>` +
  `<path d="M${n(x - 7.6)} ${n(y - 4.4)} L${n(x - 7.6)} ${y} L${n(x + 7.6)} ${y} L${n(x + 7.6)} ${n(y - 4.4)} A7.6 1.8 0 0 1 ${n(x - 7.6)} ${n(y - 4.4)} Z" fill="#B49C78"/>`;

/** The rope and bucket of Zamzam, hanging from the crossbar over (x, y - 12). */
const ropeAndBucket = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 12)} L${x} ${n(y - 7.4)}" stroke="#8A6A42" stroke-width="0.5"/><path d="M${n(x - 1.4)} ${n(y - 7.4)} L${n(x + 1.4)} ${n(y - 7.4)} L${n(x + 1)} ${n(y - 5.2)} L${n(x - 1)} ${n(y - 5.2)} Z" fill="#8E6440"/>`;

// The drink at the drinking place, and at Zamzam. Ibn Abbas said: the Messenger of Allah ﷺ came to the drinking place
// and asked for a drink. Al-Abbas said: Fadl, go to your mother, and bring him a drink from her. He said: give me a
// drink. He said: O Messenger of Allah, they put their hands in it. He said: give me a drink; and he drank from it.
// Then he came to Zamzam, where they were giving water and working at it, and he said: work on, for you are doing a
// good deed (Sahih al-Bukhari 1635). No one is drawn: in Makkah, the Ka'bah far behind, the drinking place is a basin of
// stone, the folk's places about it. His place, a golden ring, comes to it, and his voice asks. Al-Abbas's voice
// speaks, and a dashed way goes from Fadl's place to a home, a jug of drink by it. Small ripples show in the basin's
// water where the folk drink. His voice asks again; the way and the jug fade, a cup goes from the basin to his place,
// and a soft glint shows there: he drank. Then his place goes to Zamzam, where the places of those giving water stand;
// the bucket goes down and comes up, and cups of water go to those who drink. His voice speaks, a warm glow comes
// about those working, and a spark rises.
function zamzamDrink(): SignArt {
  const his: [number, number] = [86, 106];
  const atBasin: [number, number] = [62, 104];
  const atWell: [number, number] = [108, 105];
  const basinAt: [number, number] = [40, 104];
  const abbas: [number, number] = [32, 94.6];
  const fadl: [number, number] = [44, 94];
  const motherHome: [number, number] = [12, 92];
  const folk: [number, number][] = [
    [22, 106.6],
    [30, 107.6],
    [50, 107.6],
    [58, 106.4]
  ];
  const well: [number, number] = [132, 102];
  const workers: [number, number][] = [
    [121, 106.6],
    [143, 106.6]
  ];
  const drinkers: [number, number][] = [
    [128, 107.6],
    [152, 107.4]
  ];
  return {
    kind: "zamzam-drink",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(146, 16) },
      { name: "a cloud", svg: cloud(108, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [18, 16, 26],
            [60, 12, 22],
            [104, 18, 28],
            [148, 14, 24]
          ],
          66,
          "#A88E6A",
          false
        )
      },
      { name: "the land", svg: land() },
      { name: "the Ka'bah far behind", svg: kabah(75, 76, 8) },
      { name: "a home in Makkah", svg: home(motherHome[0], motherHome[1], 12, 9) },
      { name: "the drinking place: a basin of stone", svg: basin(basinAt[0], basinAt[1]) },
      { name: "the folk's places about the basin", svg: folk.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "al-Abbas's place", svg: someone(abbas[0], abbas[1], 1.4) },
      { name: "Fadl's place", svg: someone(fadl[0], fadl[1], 1.3) },
      { name: "the well of Zamzam", svg: zamzamWell(well[0], well[1]) },
      {
        name: "the well's rope and bucket",
        svg: ropeAndBucket(well[0], well[1]),
        keys: track({
          xy: [
            [0.7, 0, 0],
            [0.73, 0, 4],
            [0.76, 0, 0],
            [0.77, 0, 0],
            [0.79, 0, 4]
          ]
        })
      },
      { name: "the places of those giving water", svg: workers.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "the places of those who drink", svg: drinkers.map(([x, y]) => someone(x, y, 1.3)).join("") },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.09, n(atBasin[0] - his[0]), n(atBasin[1] - his[1])],
            [0.69, n(atBasin[0] - his[0]), n(atBasin[1] - his[1])],
            [0.76, n(atWell[0] - his[0]), n(atWell[1] - his[1])]
          ]
        })
      },
      { name: "his voice: asking for a drink", svg: arcsLeft(n(atBasin[0] - 3.4), n(atBasin[1] - 4.2), GOLD), keys: showFor(0.1, 0.11, 0.2, 0.21), loop: speaking },
      { name: "al-Abbas's voice: bring him a drink", svg: arcs(n(abbas[0] + 2.6), n(abbas[1] - 4), VOICE), keys: showFor(0.2, 0.21, 0.52, 0.53), loop: speaking },
      { name: "a dashed way from Fadl's place to the home", svg: way(`M${n(fadl[0] - 2)} ${fadl[1]} Q30 88 ${n(motherHome[0] + 7)} ${n(motherHome[1] - 2)}`, VOICE, 0.8), keys: showFor(0.22, 0.26, 0.53, 0.55) },
      { name: "a drink from her: a jug by the home", svg: jug(n(motherHome[0] + 8.6), n(motherHome[1] + 0.4)), keys: showFor(0.25, 0.28, 0.53, 0.55) },
      ...folk.map(([x, y], i): SignPart => ({
        name: `the folk dipping in: a ripple in the water ${i + 1}`,
        svg: `<ellipse cx="${n(basinAt[0] - 10 + i * 6.6)}" cy="${n(basinAt[1] - 6.7)}" rx="1.8" ry="0.5" stroke="#E4F2FA" stroke-width="0.4" fill="none"/>`,
        keys: showAt(at3(0.37 + i * 0.01), at3(0.39 + i * 0.01)),
        loop: { move: "twinkle", ms: 1100, low: 0.3, phase: i / 4 }
      })),
      { name: "his voice: give me a drink", svg: arcsLeft(n(atBasin[0] - 3.4), n(atBasin[1] - 4.2), GOLD), keys: showFor(0.53, 0.54, 0.69, 0.7), loop: speaking },
      {
        name: "a cup from the basin",
        svg: cup(n(basinAt[0] + 10), n(basinAt[1] - 8)),
        keys: track({
          xy: [
            [0.55, 0, 0],
            [0.59, n(atBasin[0] - 3 - basinAt[0] - 10), n(atBasin[1] - 2 - basinAt[1] + 8)]
          ],
          opacity: [
            [0.54, 0],
            [0.55, 1],
            [0.6, 1],
            [0.62, 0]
          ]
        })
      },
      { name: "he drank: a soft glint at his place", svg: sparkle(n(atBasin[0] - 2.4), n(atBasin[1] - 5), 1.2, "#E4F2FA"), keys: showFor(0.59, 0.6, 0.69, 0.7), loop: { move: "twinkle", ms: 900, low: 0.4 } },
      ...drinkers.map(([x, y], i): SignPart => ({
        name: `water given: a cup to one who drinks ${i + 1}`,
        svg: cup(n(x + 2.6), n(y - 1)),
        keys: showAt(at3(0.77 + i * 0.01), at3(0.78 + i * 0.01))
      })),
      { name: "his voice: work on, for you are doing a good deed", svg: arcs(n(atWell[0] + 3.4), n(atWell[1] - 4.4), GOLD), keys: showAt(0.87, 0.88), loop: speaking },
      ...workers.map(([x, y], i): SignPart => ({
        name: `a good deed: a warm glow about those giving water ${i + 1}`,
        svg: glow(x, n(y - 1), 5.4, WARM, 0.32),
        keys: showAt(at3(0.88 + i * 0.01), at3(0.91 + i * 0.01)),
        loop: soft
      })),
      { name: "a good deed: a spark rising", svg: sparkle(well[0], 86, 1.6, "#FFE7A0"), keys: sparkRising(0.9, 0.95, 10), loop: { move: "twinkle", ms: 900, low: 0.5 } }
    ],
    words: [
      { text: "At the drinking place he asked for a drink", from: 0.02, to: 0.17 },
      { text: "Fadl, bring him a drink from your mother", from: 0.19, to: 0.34 },
      { text: "They put their hands in it", from: 0.36, to: 0.5 },
      { text: "Give me a drink; and he drank from it", from: 0.52, to: 0.66 },
      { text: "He came to Zamzam, where they gave water", from: 0.68, to: 0.84 },
      { text: "Work on, for you are doing a good deed", from: 0.86, to: 1 }
    ]
  };
}

export const GENEROUS_ART = {
  "ashari-recitation": ashariRecitation,
  "gold-not-kept-overnight": goldNotKeptOvernight,
  "dimam-questions": dimamQuestions,
  "repaid-better": repaidBetter,
  "every-gate": everyGate,
  "sharing-ashari": sharingAshari,
  "zamzam-drink": zamzamDrink
};
