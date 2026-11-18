import { glow, n, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { GREY } from "./lovedArt";
import { dish } from "./worthArt";
import { GOLD, someone, VOICE, WARM, wash } from "./worshipArt";
import { care, dayAround, LIGHT, lightIn, palms, sparkRising, tent, track } from "./daysArt";
import { lookLine } from "./truthArt";
import { faintRing, goldLight, NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";

/**
 * Mercy and closeness, drawn as the scenes of what is kept are (keptArt.ts): Umamah carried in his prayer; a mother
 * among the captives, and a mercy greater than hers; the house of Abu Ayyub, where he stayed; al-Miqdad's promise at
 * Badr; the call of ignorance, left; Abu Bakr, who forgave and gave again; and a prayer between every two calls. Only
 * the land, the sky, buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not
 * even a hand or a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle,
 * and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer is a spark
 * that rises, and mercy is a warm light that comes about each place. Nothing of an army is drawn but tents far off.
 */

/** Keys of a thing that shows at `from` and goes through `points` (each [at, dx, dy] from where it is drawn). */
const along = (from: number, points: [number, number, number][]) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.005), 1]
    ],
    xy: [[at3(from + 0.005), 0, 0], ...points]
  });

/** A spark of prayer at (x, y), rising from `from` until `to`. */
const prayerSpark = (name: string, x: number, y: number, from: number, to: number): SignPart => ({
  name,
  svg: sparkle(x, y, 1.6, "#FFE7A0"),
  keys: sparkRising(from, to),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

/** A well of stones, its middle at (x, y). */
const well = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y + 1)}" rx="7" ry="2.8" fill="#8C7A5E"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="2.4" fill="#A8946E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 0.2)}" rx="4.4" ry="1.5" fill="#2F3B44"/>` +
  [-5, -2.4, 0.4, 3.2, 5.4].map((dx) => `<path d="M${n(x + dx)} ${n(y + 1.6)} l1.8 0" stroke="#7A684C" stroke-width="0.6"/>`).join("");

/** A grey stroke across (x, y): struck. */
const struck = (x: number, y: number, r = 2.6) => `<path d="M${n(x - r)} ${n(y + r * 0.7)} L${n(x + r)} ${n(y - r * 0.7)}" stroke="${GREY}" stroke-width="0.9" stroke-linecap="round"/>`;

// Umamah in his prayer. Abu Qatadah al-Ansari said that the Messenger of Allah ﷺ was praying while carrying Umamah,
// the daughter of Zaynab, the daughter of the Messenger of Allah ﷺ; when he prostrated he put her down, and when he
// stood he carried her (Sahih al-Bukhari 516). No one is drawn, and no hand: by the masjid of Madinah his place is a
// golden ring, and Umamah's place is a small dashed circle held up with him, with a warm glow about it. A spark of his
// prayer rises, and Abu Qatadah's place sees it. A golden ring of kin comes about the two. When he
// prostrates, her place comes down to the ground beside him, a soft golden glow lies on the ground at his place, and a
// spark of his sujud rises; when he stands, the glow fades, her place goes up with him again, and a spark rises.
function umamahInPrayer(): SignArt {
  const his: [number, number] = [64, 104.4];
  const held: [number, number] = [67.4, 98.8];
  const down: [number, number] = [72.4, 105.6];
  const [dx, dy] = [n(down[0] - held[0]), n(down[1] - held[1])];
  const qatadah: [number, number] = [106, 105.4];
  const moves = (xy: [number, number, number][]) => track({ xy });
  const herWay: [number, number, number][] = [
    [0.5, 0, 0],
    [0.56, dx, dy],
    [0.76, dx, dy],
    [0.82, 0, 0]
  ];
  return {
    kind: "umamah-in-prayer",
    ms: 10000,
    parts: [
      ...dayAround([138, 22], 10000),
      ...palms([
        [126, 97, 12],
        [148, 100, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 101, 0.9) },
      { name: "a golden ring, his place in prayer", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Qatadah's place", svg: someone(qatadah[0], qatadah[1], 1.7) },
      { name: "Abu Qatadah, seeing: a faint line to his place", svg: lookLine(103.6, 103.6, 70, 98.6, 90), keys: showFrom(0.06, 0.1) },
      prayerSpark("his prayer: a spark rising", his[0], n(his[1] - 6), 0.08, 0.2),
      { name: "Umamah's place, small, held up with him", svg: someone(held[0], held[1], 1.1), keys: moves(herWay) },
      {
        name: "gentle: a warm glow about Umamah's place",
        svg: wash(held[0], held[1], 4, 3.4, WARM, 0.24),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.07, 1]
          ],
          xy: herWay
        }),
        loop: { move: "twinkle", ms: 1800, low: 0.75 }
      },
      { name: "his own: a golden ring of kin about the two", svg: care(n((his[0] + held[0]) / 2), 102, 7.4, 5.8), keys: showWhile(0.28, 0.32, 0.49, 0.5) },
      { name: "his sujud: a soft golden glow on the ground at his place", svg: wash(n(his[0] - 1), n(his[1] + 0.6), 6.4, 2.4, WARM, 0.3), keys: showWhile(0.56, 0.6, 0.76, 0.78) },
      prayerSpark("his sujud: a spark rising", n(his[0] - 1), n(his[1] - 4), 0.58, 0.68),
      prayerSpark("standing again in prayer: a spark rising", his[0], n(his[1] - 6), 0.84, 0.94)
    ],
    words: [
      { text: "He prayed, carrying Umamah", from: 0.02, to: 0.24 },
      { text: "The daughter of Zaynab, his daughter", from: 0.26, to: 0.46 },
      { text: "When he prostrated, he put her down", from: 0.48, to: 0.72 },
      { text: "And when he stood, he carried her", from: 0.74, to: 1 }
    ]
  };
}

// More merciful than a mother. Umar ibn al-Khattab said: captives were brought to the Prophet ﷺ, and among the
// captives was a woman whose milk was flowing; whenever she found a child among the captives, she took it, held it close
// and nursed it. The Prophet ﷺ said to us: do you think this woman would throw her child into the fire? We said: no,
// not while she is able not to. He said: Allah is more merciful to His servants than this woman is to her child (Sahih
// al-Bukhari 5999). No one is drawn, and nothing of fire: by the tents of the camp his place is a golden ring, with the
// places of the Muslims. The places of the captives come in, the small places of children among them; a faint ring
// shows about a woman's place. She goes to a child, it comes close to her, and a warm glow comes about the two. His
// voice asks, and a faint line goes from him to her; their voices answer. His voice speaks again, a soft warm light
// comes over all the land, and a small warm light about every place, the mother's and her child's among them.
function moreMerciful(): SignArt {
  const his: [number, number] = [30, 104.6];
  const muslims: [number, number][] = [
    [44, 103.2],
    [17, 106]
  ];
  const captives: [number, number][] = [
    [98, 102.4],
    [112, 100.6],
    [130, 103.2],
    [146, 101.2]
  ];
  const children: [number, number][] = [
    [138, 107],
    [104, 107.2]
  ];
  const child: [number, number] = [121, 105.8];
  const mother: [number, number] = [88, 105.4];
  const found: [number, number] = [117.6, 105.6];
  const close: [number, number] = [120, 104.4];
  const come = (k: string, i: number, [x, y]: [number, number], r: number): SignPart => ({
    name: `${k} ${i + 1}`,
    svg: someone(x, y, r),
    keys: track({
      opacity: [
        [0.03, 0],
        [0.045, 1]
      ],
      xy: [
        [0.03, 16, 0],
        [0.08, 0, 0]
      ]
    })
  });
  const every = [his, ...muslims, ...captives, ...children, found].map(([x, y]) => glow(x, n(y - 2.6), 4.4, WARM, 0.3)).join("");
  return {
    kind: "more-merciful",
    ms: 12000,
    parts: [
      ...dayAround([134, 20], 12000),
      { name: "the tents of the camp", svg: tent(14, 93, 12, 8) + tent(34, 91, 10, 7, "#E7D9B8") + tent(54, 93.4, 11, 7.4) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...muslims.map(([x, y], i): SignPart => ({ name: `a place of the Muslims with him ${i + 1}`, svg: someone(x, y, 1.7) })),
      ...captives.map((at, i) => come("brought in: the place of a captive", i, at, 1.7)),
      ...children.map((at, i) => come("brought in: a small place among the captives", i, at, 1.1)),
      {
        name: "among them: her place",
        svg: someone(mother[0], mother[1], 1.7),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.045, 1]
          ],
          xy: [
            [0.03, 16, 0],
            [0.08, 0, 0],
            [0.19, 0, 0],
            [0.25, n(found[0] - mother[0]), n(found[1] - mother[1])]
          ]
        })
      },
      { name: "among them: a faint ring about her place", svg: faintRing(mother[0], n(mother[1] - 0.2), 3), keys: showWhile(0.08, 0.11, 0.32, 0.34) },
      { name: "she looks among them: a faint dashed way", svg: way("M91 107.6 Q104 109.6 115.4 107.8", "#FFFFFF", 0.7), keys: showWhile(0.17, 0.19, 0.32, 0.34) },
      { name: "the small place she found", svg: someone(child[0], child[1], 1.1), keys: along(0.03, [[0.08, 0, 0], [0.33, 0, 0], [0.37, n(close[0] - child[0]), n(close[1] - child[1])]]) },
      { name: "held close: a warm glow about the two", svg: wash(n((found[0] + close[0]) / 2), n(found[1] - 1.4), 6, 4.4, WARM, 0.26), keys: showFrom(0.37, 0.41), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "his voice: would she throw it", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.48, 0.485, 0.61, 0.615), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his look: a faint line to her", svg: lookLine(33, 102, 115, 103.4, 88), keys: showWhile(0.49, 0.52, 0.61, 0.62) },
      ...muslims.map(([x, y], i): SignPart => ({
        name: `their voices: no ${i + 1}`,
        svg: (i === 0 ? arcs : arcsLeft)(n(x + (i === 0 ? 3.2 : -3.2)), n(y - 4.2), VOICE),
        keys: showWhile(0.62, 0.625, 0.74, 0.745),
        loop: { move: "twinkle", ms: 800, low: 0.5 }
      })),
      { name: "his voice: more merciful", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showFrom(0.75, 0.755), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "mercy: a soft warm light over all the land", svg: wash(80, 96, 92, 30, WARM, 0.09), keys: showFrom(0.76, 0.8), loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      { name: "mercy: a small warm light about every place", svg: every, keys: showFrom(0.78, 0.83), loop: { move: "twinkle", ms: 2000, low: 0.7 } }
    ],
    words: [
      { text: "Captives were brought, among them a woman", from: 0.02, to: 0.15 },
      { text: "Whenever she found a child among them", from: 0.17, to: 0.3 },
      { text: "She took it, held it close, and nursed it", from: 0.32, to: 0.45 },
      { text: "Would she throw her child into the fire?", from: 0.47, to: 0.59 },
      { text: "No, not while she is able not to", from: 0.61, to: 0.72 },
      { text: "Allah is more merciful to His servants", from: 0.74, to: 0.87 },
      { text: "Than she is to her child", from: 0.89, to: 1 }
    ]
  };
}

/** The house of Abu Ayyub, cut open to show its two floors: the lower from y 86.4 to the ground at 104, the upper from
 * y 67 to its floor at 84, and a stair inside on the right, up from the ground to an opening in the floor. */
const HOUSE =
  `<rect x="38" y="64.6" width="80" height="2.6" fill="#BC9060"/>` +
  `<rect x="42.4" y="67" width="71.2" height="17" fill="#F0E2C4"/><rect x="42.4" y="86.4" width="71.2" height="17.6" fill="#EADAB8"/>` +
  `<rect x="54" y="71" width="4" height="4" fill="#8A6A44"/><rect x="70" y="90" width="4" height="4" fill="#8A6A44"/>` +
  `<rect x="40" y="67" width="2.4" height="17" fill="#D3A872"/><rect x="40" y="84" width="2.4" height="10" fill="#D3A872"/>` +
  `<rect x="113.6" y="67" width="2.4" height="37" fill="#D3A872"/>` +
  `<rect x="40" y="84" width="54" height="2.4" fill="#BC9060"/><rect x="110" y="84" width="6" height="2.4" fill="#BC9060"/>` +
  `<path d="M94 104 L94 86.4 L97.2 86.4 L97.2 89.4 L100.4 89.4 L100.4 92.4 L103.6 92.4 L103.6 95.4 L106.8 95.4 L106.8 98.4 L110 98.4 L110 101.4 L113.2 101.4 L113.2 104 Z" fill="#B8915E"/>` +
  `<path d="M42.4 104 L113.6 104" stroke="#B89A6C" stroke-width="0.6"/>`;

/** A dish of food with garlic on it, its middle at (x, y). */
const garlicDish = (x: number, y: number) =>
  dish(x, y) +
  `<path d="M${x} ${n(y - 4.4)} C${n(x + 0.4)} ${n(y - 3.4)} ${n(x + 1.8)} ${n(y - 2.8)} ${n(x + 1.6)} ${n(y - 1.6)} C${n(x + 1.4)} ${n(y - 0.9)} ${n(x - 1.4)} ${n(y - 0.9)} ${n(x - 1.6)} ${n(y - 1.6)} C${n(x - 1.8)} ${n(y - 2.8)} ${n(x - 0.4)} ${n(y - 3.4)} ${x} ${n(y - 4.4)} Z" fill="#F7F1E6" stroke="#C4B496" stroke-width="0.3"/>` +
  `<path d="M${x} ${n(y - 4.4)} L${n(x + 0.3)} ${n(y - 5.4)}" stroke="#D7CBB0" stroke-width="0.4" stroke-linecap="round"/>`;

// The house of Abu Ayyub. Abu Ayyub said that the Prophet ﷺ stayed with him: the Prophet ﷺ below, and Abu Ayyub above.
// One night Abu Ayyub woke and said: we walk above the head of the Messenger of Allah ﷺ! So they moved aside and spent
// the night to one side. Then the Prophet ﷺ moved up, and Abu Ayyub down. He made him food with garlic in it, and when
// it came back he was told: he did not eat. He was alarmed, went up to him and said: is it forbidden? The Prophet ﷺ said:
// no, but I dislike it. He said: then I dislike what you dislike (Sahih Muslim 2053). No one is drawn, and no hand or
// finger: the house is drawn open, with its two floors and its stair. His place, a golden ring, comes in below, and Abu
// Ayyub's place and his household's are above. Night comes, Abu Ayyub's voice speaks, and their places move aside. In
// the day they go down the stair, and his ring goes up. A dish with garlic goes up to him and comes back full, and a
// faint ring shows about it. Abu Ayyub's place goes up, its voice asks, his voice answers, Abu Ayyub's voice speaks, and
// a warm glow comes over the upper floor.
function abuAyyubHouse(): SignArt {
  const his: [number, number] = [62, 102.4];
  const above: [number, number] = [64, 81.6];
  const household: [number, number] = [72.4, 81.6];
  const aside: [number, number] = [48.4, 81.6];
  const asideToo: [number, number] = [54.4, 81.6];
  // The stair: its foot by the lowest step, and its head at the opening in the floor.
  const foot = 106;
  const head = 92;
  const plate: [number, number] = [63, 103.4];
  return {
    kind: "abu-ayyub-house",
    ms: 12000,
    parts: [
      ...dayAround([140, 20], 12000),
      {
        name: "the night over the sky",
        svg: NIGHT_OVER_SKY,
        keys: track({
          opacity: [
            [0.15, 0],
            [0.18, 0.95],
            [0.3, 0.95],
            [0.33, 0]
          ]
        })
      },
      {
        name: "stars of the night",
        svg: stars([
          [16, 16],
          [34, 26],
          [128, 14],
          [146, 30],
          [100, 22]
        ]),
        keys: showWhile(0.16, 0.18, 0.3, 0.32),
        loop: { move: "twinkle", ms: 1800, low: 0.5 }
      },
      ...palms([
        [20, 99, 13],
        [140, 99, 14]
      ]),
      { name: "the house of Abu Ayyub, open to show its two floors", svg: HOUSE },
      {
        name: "the night over the land",
        svg: NIGHT_OVER_LAND,
        keys: track({
          opacity: [
            [0.15, 0],
            [0.18, 1],
            [0.3, 1],
            [0.33, 0]
          ]
        })
      },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: [
            [0.03, -22, 0],
            [0.08, 0, 0],
            [0.375, 0, 0],
            [0.395, n(foot - his[0]), 0],
            [0.415, n(head - his[0]), -20],
            [0.435, 6, -20]
          ]
        })
      },
      {
        name: "Abu Ayyub's place",
        svg: someone(above[0], above[1], 1.7),
        keys: track({
          xy: [
            [0.19, 0, 0],
            [0.23, n(aside[0] - above[0]), 0],
            [0.31, n(aside[0] - above[0]), 0],
            [0.335, n(head - above[0]), 0],
            [0.355, n(foot - above[0]), 20],
            [0.375, -8, 20],
            [0.76, -8, 20],
            [0.77, n(foot - above[0]), 20],
            [0.785, n(head - above[0]), 0],
            [0.8, 12, 0]
          ]
        })
      },
      {
        name: "the place of his household",
        svg: someone(household[0], household[1], 1.6),
        keys: track({
          xy: [
            [0.19, 0, 0],
            [0.23, n(asideToo[0] - household[0]), 0],
            [0.31, n(asideToo[0] - household[0]), 0],
            [0.335, n(head - household[0]), 0],
            [0.355, n(foot - household[0]), 20],
            [0.375, -2.4, 20]
          ]
        })
      },
      {
        name: "Abu Ayyub's voice: we walk above his head",
        svg: arcs(n(above[0] + 3.2), n(above[1] - 4.2), LIGHT),
        // Its voice goes with its place as it moves aside, and stays until the night ends.
        keys: track({
          opacity: [
            [0.17, 0],
            [0.175, 1],
            [0.3, 1],
            [0.305, 0]
          ],
          xy: [
            [0.19, 0, 0],
            [0.23, n(aside[0] - above[0]), 0]
          ]
        }),
        loop: { move: "twinkle", ms: 800, low: 0.5 }
      },
      {
        name: "food for him: a dish with garlic",
        svg: garlicDish(plate[0], plate[1]),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.505, 1]
          ],
          xy: [
            [0.51, 0, 0],
            [0.53, n(foot - plate[0]), 0],
            [0.55, n(head - plate[0]), -20],
            [0.57, 18, -20],
            [0.64, 18, -20],
            [0.66, n(head - plate[0]), -20],
            [0.68, n(foot - plate[0]), 0],
            [0.7, 0, 0]
          ]
        })
      },
      { name: "not eaten: a faint ring about the dish", svg: faintRing(plate[0], n(plate[1] - 1.6), 4.2), keys: showWhile(0.69, 0.7, 0.76, 0.77) },
      { name: "Abu Ayyub's voice: is it forbidden", svg: arcsLeft(n(68 + 3), n(above[1] - 4.2), VOICE), keys: showWhile(0.8, 0.805, 0.82, 0.825), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "his voice: no, but I dislike it", svg: arcs(n(his[0] + 6 + 3.4), n(above[1] - 3.4), VOICE), keys: showWhile(0.82, 0.825, 0.9, 0.905), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Abu Ayyub's voice: I dislike what you dislike", svg: arcsLeft(n(76 - 3), n(above[1] - 4.2), VOICE), keys: showFrom(0.905, 0.91), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "a warm glow over the upper floor", svg: wash(72, 76, 22, 7, WARM, 0.16), keys: showFrom(0.92, 0.96), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "He stayed below, and Abu Ayyub above", from: 0.02, to: 0.13 },
      { text: "We walk above his head!", from: 0.15, to: 0.28 },
      { text: "So he moved up, and Abu Ayyub down", from: 0.3, to: 0.48 },
      { text: "Abu Ayyub made him food with garlic in it", from: 0.5, to: 0.62 },
      { text: "Abu Ayyub was told: he did not eat it", from: 0.63, to: 0.74 },
      { text: "Is it forbidden? No, but I dislike it", from: 0.76, to: 0.88 },
      { text: "Abu Ayyub: Then I dislike what you dislike", from: 0.89, to: 1 }
    ]
  };
}

/** Tents far off, small on the far side: the camp of Quraysh at Badr, never its men. */
const FAR_TENTS = tent(121, 77, 7, 5, "#C9BBA0") + tent(133, 76, 8, 5.6, "#BFB196") + tent(145, 77.4, 7, 5, "#C9BBA0") + tent(155, 76.4, 6, 4.4, "#BFB196");

// Al-Miqdad's promise. Ibn Mas'ud said: I saw al-Miqdad ibn al-Aswad in a stand that I would rather have been mine
// than anything. He came to the Prophet ﷺ while he was making du'a against the idolaters, and said: we will not say as
// Musa's people said: go, you and your Lord, and fight (Quran 5:24); but we will fight on your right and on your left,
// and in front of you and behind you. I saw the face of the Prophet ﷺ shine, and it pleased him (Sahih al-Bukhari
// 3952). No one is drawn, not even a face, and nothing of the armies but tents far off: at Badr, by its well, his place
// is a golden ring, and sparks of his du'a rise; the places of the Muslims are behind him. Al-Miqdad's place comes to
// him and speaks; then it goes to his right, and another place to his left; then two more go before him and behind him.
// He faces the tents far off, so his right is the near side and his left the far side. A warm light comes about his
// place, and a golden ring of care about them all.
function miqdadPromise(): SignArt {
  const his: [number, number] = [70, 100];
  const right: [number, number] = [70, 105];
  const left: [number, number] = [70, 95.2];
  const before: [number, number] = [84, 100.2];
  const behind: [number, number] = [56, 100.2];
  const miqdad: [number, number] = [40, 102.4];
  const spoke: [number, number] = [58, 103];
  const muslims: [number, number][] = [
    [26, 101.4],
    [34, 106],
    [18, 105]
  ];
  const to = (from: [number, number], at: [number, number]) => [n(at[0] - from[0]), n(at[1] - from[1])] as const;
  return {
    kind: "miqdad-promise",
    ms: 11000,
    parts: [
      ...dayAround([28, 22], 11000),
      { name: "far off: the tents of Quraysh", svg: FAR_TENTS },
      { name: "a well of Badr", svg: well(124, 99) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      prayerSpark("his du'a: a spark rising", his[0], n(his[1] - 6), 0.03, 0.12),
      prayerSpark("his du'a: another spark rising", n(his[0] + 2), n(his[1] - 5), 0.07, 0.16),
      {
        name: "al-Miqdad's place",
        svg: someone(miqdad[0], miqdad[1], 1.7),
        keys: track({
          xy: [
            [0.05, 0, 0],
            [0.13, ...to(miqdad, spoke)],
            [0.44, ...to(miqdad, spoke)],
            [0.5, ...to(miqdad, right)]
          ]
        })
      },
      {
        name: "al-Miqdad's voice: we will not say, but we will stand",
        svg: arcs(n(spoke[0] + 3.2), n(spoke[1] - 4.2), VOICE),
        keys: track({
          opacity: [
            [0.23, 0],
            [0.235, 1],
            [0.8, 1],
            [0.805, 0]
          ],
          xy: [
            [0.44, 0, 0],
            [0.5, ...to(spoke, right)]
          ]
        }),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      {
        name: "a place of the Muslims, to his left",
        svg: someone(muslims[0][0], muslims[0][1], 1.7),
        keys: track({
          xy: [
            [0.44, 0, 0],
            [0.48, 22, -5.4],
            [0.52, ...to(muslims[0], left)]
          ]
        })
      },
      {
        name: "a place of the Muslims, before him",
        svg: someone(muslims[1][0], muslims[1][1], 1.7),
        keys: track({
          xy: [
            [0.64, 0, 0],
            [0.67, 22, 1],
            [0.7, 46, 0.6],
            [0.72, ...to(muslims[1], before)]
          ]
        })
      },
      {
        name: "a place of the Muslims, behind him",
        svg: someone(muslims[2][0], muslims[2][1], 1.7),
        keys: track({
          xy: [
            [0.64, 0, 0],
            [0.71, ...to(muslims[2], behind)]
          ]
        })
      },
      { name: "his joy: a warm light about his place", svg: lightIn(his[0], n(his[1] - 3), 7) + wash(his[0], n(his[1] - 1), 8, 5, WARM, 0.2), keys: showFrom(0.82, 0.86), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "with him all about: a golden ring of care", svg: care(his[0], n(his[1] + 0.2), 19, 8.4), keys: showFrom(0.86, 0.9) }
    ],
    words: [
      { text: "Al-Miqdad came to him as he made du'a", from: 0.02, to: 0.2 },
      { text: "Al-Miqdad: We won't say as Musa's folk did", from: 0.22, to: 0.4 },
      { text: "But we will fight on your right and your left", from: 0.42, to: 0.6 },
      { text: "And in front of you and behind you", from: 0.62, to: 0.78 },
      { text: "Ibn Mas'ud: his face shone; it pleased him", from: 0.8, to: 1 }
    ]
  };
}

// Leave that call. Jabir ibn Abdullah said: we were on a campaign, and one of the Muhajirun struck one of the Ansar.
// The Ansari said: O Ansar! And the Muhajir said: O Muhajirun! The Messenger of Allah ﷺ heard it and said: what is this
// call of ignorance? They said: O Messenger of Allah, one of the Muhajirun struck one of the Ansar. He said: leave it,
// for it is foul (Sahih al-Bukhari 4905). No one is drawn, and no foot or hand: by the tents of a camp his place is a
// golden ring, and two places stand by the water. One goes to the other, a grey stroke shows, and a grey shade comes
// over the one struck. Each calls out in harsh grey arcs, and the places of his own side come to him, with a grey
// shade between the two sides. His voice asks, and a faint line goes from them to him. Then the grey arcs stop, the
// shades fade, the two sides come together about the water, and a warm glow comes over them all.
function leaveThatCall(): SignArt {
  const his: [number, number] = [22, 105.4];
  const muhajir: [number, number] = [70, 104.6];
  const ansari: [number, number] = [92, 105];
  const ansar: [number, number][] = [
    [104, 103.4],
    [114, 106.2],
    [124, 103]
  ];
  const muhajirun: [number, number][] = [
    [58, 103.2],
    [50, 106.2],
    [42, 103]
  ];
  return {
    kind: "leave-that-call",
    ms: 10000,
    parts: [
      ...dayAround([128, 22], 10000),
      { name: "the tents of the camp", svg: tent(14, 94, 12, 8) + tent(34, 92, 10, 7, "#E7D9B8") + tent(126, 93, 12, 8) + tent(146, 95, 11, 7.6, "#E7D9B8") },
      { name: "the water: a well", svg: well(82, 96) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the place of one of the Muhajirun",
        svg: someone(muhajir[0], muhajir[1], 1.7),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.08, 16, 0.2],
            [0.11, 16, 0.2],
            [0.15, 0, 0],
            [0.86, 0, 0],
            [0.92, 4, 0]
          ]
        })
      },
      { name: "the place of one of the Ansar", svg: someone(ansari[0], ansari[1], 1.7) },
      { name: "struck: a grey stroke", svg: struck(n(ansari[0] - 3), n(ansari[1] - 2.6)), keys: showWhile(0.08, 0.085, 0.16, 0.17) },
      { name: "hurt: a grey shade over its place", svg: wash(ansari[0], n(ansari[1] - 2), 6, 4.6, GREY, 0.3), keys: showWhile(0.09, 0.12, 0.84, 0.88) },
      { name: "O Ansar: harsh grey arcs", svg: arcs(n(ansari[0] + 3.4), n(ansari[1] - 4.4), GREY), keys: showWhile(0.25, 0.255, 0.83, 0.835), loop: { move: "twinkle", ms: 500, low: 0.3 } },
      ...ansar.map(([x, y], i): SignPart => ({
        name: `called to his side: a place of the Ansar ${i + 1}`,
        svg: someone(x, y, 1.7),
        keys: track({
          opacity: [
            [at3(0.27 + i * 0.02), 0],
            [at3(0.275 + i * 0.02), 1]
          ],
          xy: [
            [at3(0.27 + i * 0.02), 24, 0],
            [at3(0.31 + i * 0.02), 0, 0],
            [0.86, 0, 0],
            [0.92, -6, 0]
          ]
        })
      })),
      { name: "O Muhajirun: harsh grey arcs", svg: arcsLeft(n(muhajir[0] - 3.4), n(muhajir[1] - 4.4), GREY), keys: showWhile(0.45, 0.455, 0.83, 0.835), loop: { move: "twinkle", ms: 500, low: 0.3 } },
      ...muhajirun.map(([x, y], i): SignPart => ({
        name: `called to his side: a place of the Muhajirun ${i + 1}`,
        svg: someone(x, y, 1.7),
        keys: track({
          opacity: [
            [at3(0.47 + i * 0.02), 0],
            [at3(0.475 + i * 0.02), 1]
          ],
          xy: [
            [at3(0.47 + i * 0.02), -24, 0],
            [at3(0.51 + i * 0.02), 0, 0],
            [0.86, 0, 0],
            [0.92, 6, 0]
          ]
        })
      })),
      { name: "split: a grey shade between the two sides", svg: wash(81, 103, 8, 6, GREY, 0.26), keys: showWhile(0.52, 0.56, 0.84, 0.88) },
      { name: "his voice: what is this call of ignorance", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showFrom(0.65, 0.655), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "he heard it: a faint line from them to him", svg: lookLine(78, 100.6, 26, 101, 86), keys: showWhile(0.66, 0.7, 0.84, 0.86) },
      { name: "together again: a warm glow over them all", svg: wash(82, 101, 34, 8, WARM, 0.16), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "One of the Muhajirun struck one of the Ansar", from: 0.02, to: 0.22 },
      { text: "The Ansari called: O Ansar!", from: 0.24, to: 0.42 },
      { text: "The Muhajir called: O Muhajirun!", from: 0.44, to: 0.62 },
      { text: "What is this call of ignorance?", from: 0.64, to: 0.8 },
      { text: "Leave it, for it is foul", from: 0.82, to: 1 }
    ]
  };
}

// Abu Bakr forgives. Aishah said: Abu Bakr as-Siddiq used to spend on Mistah ibn Uthathah, because he was his kin and
// because he was poor. He said: by Allah, I will never spend anything on Mistah again, after what he said about Aishah.
// Then Allah sent down: let not those of grace and wealth among you swear not to give to their kin, the poor, and those
// who emigrated for the sake of Allah; let them pardon and overlook; do you not love that Allah should forgive you?
// (Quran 24:22). Abu Bakr said: yes, by Allah, I love that Allah should forgive me; and he gave back to Mistah what he
// used to spend on him (Sahih al-Bukhari 4750). No one is drawn: Abu Bakr's place is by the door of his home, and a
// sack goes from it to Mistah's poorer home, and then another, with a golden line of kin between the two. His voice
// swears, a sack stays by his door, and the line of kin turns grey. At the masjid, his place is a golden ring, and the
// ayah comes as golden arcs as he recites it, with a golden light; a faint golden line goes from it to Abu Bakr's
// place. Abu Bakr's voice answers in golden arcs, and a warm glow comes about his place; the sack goes to Mistah's home,
// the line of kin is golden again, and a warm light comes in Mistah's home.
function abuBakrForgives(): SignArt {
  const abuBakr: [number, number] = [32, 106.2];
  const mistah: [number, number] = [124, 106.2];
  const his: [number, number] = [79.6, 97.2];
  const start: [number, number] = [37.4, 107.8];
  const door: [number, number] = [130.4, 107.2];
  const [gx, gy] = [n(door[0] - start[0]), n(door[1] - start[1])];
  const gift = (k: number, from: number, to: number): SignPart => ({
    name: `his spending: a sack going to Mistah's home ${k}`,
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
        [to, gx, gy]
      ]
    })
  });
  return {
    kind: "abu-bakr-forgives",
    ms: 12000,
    parts: [
      ...dayAround([132, 20], 12000),
      ...palms([
        [8, 99, 12],
        [152, 99, 12]
      ]),
      { name: "the home of Abu Bakr", svg: home(24, 103, 24, 16) },
      { name: "the masjid of Madinah", svg: madinahMasjid(58, 95, 0.9) },
      { name: "the home of Mistah, poorer", svg: home(138, 103, 18, 12, "#CBB08A", "#B39874", "#6E5638") },
      { name: "a golden ring, his place at the masjid", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Abu Bakr's place", svg: someone(abuBakr[0], abuBakr[1], 1.7) },
      { name: "Mistah's place", svg: someone(mistah[0], mistah[1], 1.7) },
      gift(1, 0.03, 0.09),
      gift(2, 0.17, 0.23),
      { name: "kin: a golden line between the two homes", svg: lookLine(34, 102, 122, 102, 44), keys: showWhile(0.17, 0.2, 0.34, 0.38) },
      { name: "his oath: Abu Bakr's voice", svg: arcs(n(abuBakr[0] + 3.2), n(abuBakr[1] - 4.2), VOICE), keys: showWhile(0.31, 0.315, 0.75, 0.755), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      {
        name: "held back: a sack by his door",
        svg: sack(start[0], start[1], 0.5),
        keys: track({
          opacity: [
            [0.33, 0],
            [0.35, 1],
            [0.94, 1],
            [0.95, 0]
          ],
          xy: [
            [0.89, 0, 0],
            [0.94, gx, gy]
          ]
        })
      },
      { name: "kin, cut: a grey line between the two homes", svg: lookLine(34, 102, 122, 102, 44, GREY), keys: showWhile(0.34, 0.38, 0.89, 0.92) },
      { name: "the ayah, as he recites it: golden arcs", svg: arcs(n(his[0] + 3.2), n(his[1] - 4), GOLD), keys: showWhile(0.47, 0.475, 0.75, 0.755), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the ayah: a golden light at the masjid", svg: goldLight(his[0], n(his[1] - 13), 1.8), keys: showWhile(0.49, 0.53, 0.75, 0.76), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "to Abu Bakr: a faint golden line from the masjid", svg: lookLine(76.6, 95.4, 35, 102.6, 84), keys: showWhile(0.61, 0.65, 0.75, 0.76) },
      { name: "Abu Bakr's voice: yes, I love to be forgiven", svg: arcs(n(abuBakr[0] + 3.2), n(abuBakr[1] - 4.2), GOLD), keys: showFrom(0.755, 0.76), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "forgiving: a warm glow about Abu Bakr's place", svg: wash(abuBakr[0], n(abuBakr[1] - 3.5), 8, 5.5, WARM, 0.22), keys: showFrom(0.77, 0.81), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "kin, kept: a golden line between the two homes again", svg: lookLine(34, 102, 122, 102, 44), keys: showFrom(0.89, 0.92) },
      { name: "given again: a warm light in Mistah's home", svg: lightIn(134.4, 98.6, 4.6), keys: showFrom(0.94, 0.96), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Abu Bakr used to spend on Mistah", from: 0.02, to: 0.14 },
      { text: "Mistah was Abu Bakr's kin, and poor", from: 0.16, to: 0.28 },
      { text: "Abu Bakr: By Allah, I'll never spend again", from: 0.3, to: 0.44 },
      { text: "Let them pardon and overlook", from: 0.46, to: 0.58 },
      { text: "Would you not love that Allah forgive you?", from: 0.6, to: 0.72 },
      { text: "Abu Bakr: yes, I want Allah to forgive me", from: 0.74, to: 0.86 },
      { text: "Abu Bakr gave back to Mistah as before", from: 0.88, to: 1 }
    ]
  };
}

// A prayer between two calls. Abdullah ibn Mughaffal al-Muzani said: the Messenger of Allah ﷺ said three times: between
// every two calls there is a prayer; and he said: for whoever wishes (Sahih al-Bukhari 624). No one is drawn: the call
// to prayer rings out over the masjid of Madinah, and places come to it from the homes. His place is a golden ring at
// its door, and his voice speaks, three times, a small golden light coming each time; sparks of prayer rise from three
// places, while a fourth sits, a faint ring about it: it is for whoever wishes. Then the iqamah rings at the door, and
// the places come into a row behind his place.
function betweenTwoCalls(): SignArt {
  const his: [number, number] = [80, 102.8];
  const spots: [number, number][] = [
    [64, 104.4],
    [70, 106.2],
    [92, 104.4],
    [98, 106.2]
  ];
  const doors: [number, number][] = [
    [14, 103.6],
    [14, 103.6],
    [142, 103.6],
    [142, 103.6]
  ];
  const row: [number, number][] = [
    [68, 107],
    [76, 107],
    [84, 107],
    [92, 107]
  ];
  // Three of them pray between the calls; the fourth (the last) sits.
  const praying = spots.slice(0, 3);
  return {
    kind: "between-two-calls",
    ms: 10000,
    parts: [
      ...dayAround([28, 22], 10000),
      ...palms([
        [46, 96, 12],
        [116, 95, 12]
      ]),
      { name: "homes of Madinah", svg: home(16, 103, 20, 13) + home(144, 103, 20, 13, "#D8B585", "#BF9A6A") },
      { name: "the masjid of Madinah", svg: madinahMasjid(56, 99, 1) },
      ...[4, 7.5, 11].map((r, i): SignPart => ({
        name: `the call to prayer, ring ${i + 1}`,
        svg: ring(80, 72, r, "#FFFFFF"),
        keys: showWhile(at3(0.03 + i * 0.015), at3(0.04 + i * 0.015), 0.13, 0.14),
        loop: { move: "twinkle", ms: 1100, low: 0.2, phase: i / 3 }
      })),
      { name: "a golden ring, his place at the door", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...spots.map(([x, y], i): SignPart => {
        const [fx, fy] = doors[i];
        const [rx, ry] = row[i];
        return {
          name: `a place come to the masjid ${i + 1}`,
          svg: someone(x, y, 1.6),
          keys: track({
            opacity: [
              [0.06, 0],
              [0.065, 1]
            ],
            xy: [
              [0.06, n(fx - x), n(fy - y)],
              [0.14, 0, 0],
              [0.84, 0, 0],
              [0.92, n(rx - x), n(ry - y)]
            ]
          })
        };
      }),
      {
        name: "his voice: between every two calls, a prayer",
        svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE),
        keys: { at: [0, 0.15, 0.155, 0.35, 0.355, 0.38, 0.385, 0.45, 0.455, 0.48, 0.485, 0.78, 0.785], opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0] },
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      ...["the first", "the second", "the third"].map((which, i): SignPart => ({
        name: `${which} time: a small golden light`,
        svg: goldLight(at3(70 + i * 10), 75, 1.6),
        keys: showFrom([0.16, 0.39, 0.49][i], [0.18, 0.41, 0.51][i]),
        loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 3 }
      })),
      ...praying.map(([x, y], i) => prayerSpark(`a prayer between the calls: a spark rising ${i + 1}`, x, n(y - 5), at3(0.18 + i * 0.02), at3(0.24 + i * 0.02))),
      { name: "for whoever wishes: a faint ring about the one who sits", svg: faintRing(spots[3][0], n(spots[3][1] - 0.2), 2.8), keys: showWhile(0.64, 0.66, 0.84, 0.85) },
      ...praying.map(([x, y], i) => prayerSpark(`for whoever wishes: a spark rising ${i + 1}`, x, n(y - 5), at3(0.66 + i * 0.02), at3(0.72 + i * 0.02))),
      ...[3, 5.5, 8].map((r, i): SignPart => ({
        name: `the iqamah, ring ${i + 1}`,
        svg: ring(80, 90.6, r, "#FFFFFF"),
        keys: showFrom(at3(0.8 + i * 0.012), at3(0.81 + i * 0.012)),
        loop: { move: "twinkle", ms: 900, low: 0.2, phase: i / 3 }
      }))
    ],
    words: [
      { text: "Between every two calls there is a prayer", from: 0.02, to: 0.32 },
      { text: "He said it three times", from: 0.34, to: 0.6 },
      { text: "For whoever wishes", from: 0.62, to: 1 }
    ]
  };
}

export const MERCY_ART = {
  "umamah-in-prayer": umamahInPrayer,
  "more-merciful": moreMerciful,
  "abu-ayyub-house": abuAyyubHouse,
  "miqdad-promise": miqdadPromise,
  "leave-that-call": leaveThatCall,
  "abu-bakr-forgives": abuBakrForgives,
  "between-two-calls": betweenTwoCalls
};
