import { animalAt, cloud, dateBunch, glow, n, palm, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { comeIn, risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { quickSparks, track } from "./toldArt";

/**
 * More of what the Prophet ﷺ told and lived, drawn as the scenes of his life are (graceArt.ts): every prophet a
 * shepherd, and he too for the people of Makkah; one honest date given in charity, grown like a mountain; the three
 * deeds that keep going after death; good and bad deeds and how they are written; his call from as-Safa; the blessing
 * in Jabir's dates; and the three that follow the dead, two going back and one staying. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet and no person is ever drawn, not even a hand: where
 * someone went, a dashed way shows it, where someone sat or stood, a ring or a small dashed circle, and a voice is arcs
 * in the air. Nothing is drawn for Allah and nothing comes down from the sky: a good deed, a blessing, a prayer and
 * praise are sparks rising.
 */

/** Colors that show on the light ground of these scenes: a voice, a way, sparks rising, and a harsh voice. */
const VOICE = "#6B4A2E";
const GOLD = "#C8963E";
const SPARK = "#E8A93A";
const HARSH = "#B3261E";
/** A deed that is not good, written as one: a small dark dot. */
const DARK = "#3B2A26";

/** Quick sparks (toldArt.ts) in gold, to show on light ground. */
const goldSparks = (label: string, list: [number, number][], start: number, step: number): SignPart[] =>
  quickSparks(label, list, start, step).map((part) => ({ ...part, svg: part.svg.split("#FFE7A0").join(SPARK) }));

/** A small dashed circle where someone is, its middle at (x, y). */
const someone = (x: number, y: number, r = 1.5, color = VOICE) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1 0.8" fill="none"/>`;

/** A small sun, its middle at (x, y). */
const sun = (x: number, y: number) => `${glow(x, y, 10, "#FFF0C0", 0.12)}<circle cx="${x}" cy="${y}" r="4.6" fill="#FFE07A"/>`;

/** The Ka'bah, small and far: a black cube with its gold band, its foot's middle at (x, y), `s` times 8 wide. */
const kaaba = (x: number, y: number, s = 1) => {
  const w = 8 * s;
  const h = 7.4 * s;
  const l = n(x - w / 2);
  return (
    `<ellipse cx="${x}" cy="${n(y + 0.6)}" rx="${n(w * 0.9)}" ry="${n(1.2 * s)}" fill="#F6EFDC"/>` +
    `<rect x="${l}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" fill="#1F1F1F"/>` +
    `<rect x="${n(x + w * 0.18)}" y="${n(y - h)}" width="${n(w * 0.32)}" height="${n(h)}" fill="#000000" opacity="0.35"/>` +
    `<rect x="${l}" y="${n(y - h * 0.72)}" width="${n(w)}" height="${n(1 * s)}" fill="#E2B33C"/>`
  );
};

/** A date, lying on its side, its middle at (x, y). */
const date = (x: number, y: number, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${n(2.4 * s)}" ry="${n(1.4 * s)}" fill="#8C3A1C"/>` +
  `<path d="M${n(x - 1.3 * s)} ${n(y - 0.5 * s)} Q${x} ${n(y - 1 * s)} ${n(x + 1.3 * s)} ${n(y - 0.5 * s)}" stroke="#B7603A" stroke-width="${n(0.4 * s)}" fill="none"/>`;

/** A small coin, its middle at (x, y). */
const coin = (x: number, y: number, r = 1.4) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#E9C25A" stroke="#B08A2E" stroke-width="0.4"/><circle cx="${x}" cy="${y}" r="${n(r * 0.55)}" fill="none" stroke="#C9A040" stroke-width="0.3"/>`;

/** Hills along the far side of the land, from y 61. */
const hills = (fill = "#C9B38C") =>
  peaks(
    [
      [20, 9, 30],
      [84, 13, 38],
      [148, 10, 30]
    ],
    61,
    fill,
    false
  );

// Every prophet a shepherd. The Prophet ﷺ said: Allah did not send any prophet but that he shepherded sheep. His
// companions asked: and you? He said: yes, I used to shepherd the sheep of the people of Makkah for some qirats (Sahih
// al-Bukhari 2262). No one is drawn: far off, a flock comes into sight on each of three hills in turn, with a dashed
// way among it; near by, small dashed circles where they sat ask, and a voice answers from a ring; the sheep of Makkah come
// out from its homes, by the Ka'bah, with a way among them; and a few small coins shine by the way.
function shepherds(): SignArt {
  const far = (x: number, y: number, left = false) => animalAt("sheep", x, y, 0.06, left);
  const flock = (x: number) => far(x, 63.4) + far(x + 7, 64.6, true) + far(x + 14, 63.2);
  const among = (x: number) => way(`M${n(x - 2)} 70.6 C${n(x + 5)} 72.6 ${n(x + 15)} 72.6 ${n(x + 22)} 70`, BROWN, 0.8);
  const near: [number, number, boolean][] = [
    [70, 85.6, false],
    [84, 89, true],
    [96, 85.4, false],
    [78, 92.6, false]
  ];
  const sat = someone(16, 99.6) + someone(24, 102) + someone(32, 100);
  return {
    kind: "shepherds",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E8D6AA", 61) },
      { name: "the sun", svg: sun(124, 22) },
      { name: "clouds", svg: cloud(54, 22, 0.4, "#FFFFFF", 0.9) + cloud(150, 30, 0.32, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [12, 76],
          [58, 74],
          [110, 78],
          [150, 74],
          [46, 116],
          [126, 116]
        ])
      },
      { name: "a flock far off, on the first hill", svg: flock(8), origin: { x: 16, y: 68 }, keys: showFrom(0.03, 0.05), loop: { move: "bob", ms: 2600, y: -0.2, rotate: 1 } },
      { name: "a way among them", svg: among(8), keys: showFrom(0.05, 0.09) },
      { name: "another flock far off", svg: flock(68), origin: { x: 76, y: 68 }, keys: showFrom(0.09, 0.11), loop: { move: "bob", ms: 2600, y: -0.2, rotate: 1, phase: 0.3 } },
      { name: "a way among those", svg: among(68), keys: showFrom(0.11, 0.15) },
      { name: "a third flock far off", svg: flock(128), origin: { x: 136, y: 68 }, keys: showFrom(0.15, 0.17), loop: { move: "bob", ms: 2600, y: -0.2, rotate: 1, phase: 0.6 } },
      { name: "a way among the third", svg: among(128), keys: showFrom(0.17, 0.21) },
      { name: "homes of Makkah", svg: home(124, 90, 16, 12) + home(150, 92, 14, 11) + home(110, 86, 10, 8, "#C9A777", "#AF9064"), keys: showFrom(0.52, 0.55) },
      { name: "the Ka'bah", svg: kaaba(138, 84, 0.9), keys: showFrom(0.52, 0.55) },
      { name: "small dashed circles, where they sat", svg: sat, keys: showFrom(0.31, 0.33) },
      { name: "a golden ring, his place", svg: ring(44, 100, 3, GOLD), keys: showFrom(0.31, 0.33) },
      { name: "a voice from them, asking", svg: arcs(35, 96, VOICE), keys: showWhile(0.34, 0.36, 0.44, 0.46), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      { name: "a voice from his place, answering", svg: arcsLeft(42, 95, GOLD), keys: showWhile(0.53, 0.55, 0.62, 0.64), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...near.map(
        ([x, y, left], i): SignPart => ({
          name: `a sheep of Makkah, coming out ${i + 1}`,
          svg: animalAt("sheep", x, y, 0.12, left),
          keys: comeIn(0.56, 0.68, 36 - i * 3),
          origin: { x: x + 6, y: y + 9 },
          loop: { move: "bob", ms: 2400, y: -0.4, rotate: 2, phase: i / 4 }
        })
      ),
      { name: "a way, out with the sheep", svg: way("M118 95 C110 100 96 102 84 100.4 C76 99.4 70 96.6 66 93", GOLD), keys: showFrom(0.58, 0.7) },
      ...[
        [106, 98.6],
        [111.4, 100],
        [116.8, 98.8]
      ].map(
        ([x, y], i): SignPart => ({
          name: `a qirat, a small coin ${i + 1}`,
          svg: coin(x, y),
          keys: track({
            opacity: [
              [0.8 + i * 0.03, 0],
              [0.81 + i * 0.03, 1]
            ],
            xy: [
              [0.8 + i * 0.03, 0, 1.6],
              [0.82 + i * 0.03, 0, 0]
            ]
          }),
          loop: { move: "twinkle", ms: 1400, low: 0.7, phase: i / 3 }
        })
      )
    ],
    words: [
      { text: "Allah sent no prophet who did not tend sheep", from: 0.02, to: 0.3 },
      { text: "They asked: did you do the same?", from: 0.32, to: 0.5 },
      { text: "Yes, I tended the sheep of the people of Makkah", from: 0.52, to: 0.76 },
      { text: "For a few qirats", from: 0.78, to: 1 }
    ]
  };
}

// A date that grows like a mountain. The Prophet ﷺ said: whoever gives in charity what equals one date from honestly
// earned money, and Allah accepts only what is honestly earned, Allah takes it and grows it for him, as one of you
// raises his foal, until it becomes as big as a mountain (Sahih al-Bukhari 1410). Nothing is drawn for Allah, and no
// hand: one date goes from the basket of the home's own palm along a way to a home in need; a glow comes on it, and its
// reward rises as a spark; a foal grows into a horse, and the reward grows with it; then a mountain of light rises.
function dateMountain(): SignArt {
  const mountain =
    `<path d="M32 92 L50 72 L58 77 L80 47 L93 63 L101 58 L128 92 Z" fill="#F4CE6C" opacity="0.85"/>` +
    `<path d="M80 47 L93 63 L101 58 L128 92 L98 92 L88 70 Z" fill="#E0A93E" opacity="0.5"/>` +
    `<path d="M50 72 L58 77 L52 92 L32 92 Z" fill="#E0A93E" opacity="0.3"/>` +
    `<path d="M80 47 L85.4 53.6 L82 53 L80 55.6 L77.4 52.8 L74.6 53.8 Z" fill="#FFF3CF" opacity="0.95"/>` +
    glow(80, 72, 26, "#FFE7A0", 0.12);
  const shine = sparkle(62, 70, 1.6, "#FFF6D0") + sparkle(98, 66, 1.3, "#FFF6D0") + sparkle(84, 80, 1.1, "#FFF6D0") + sparkle(70, 84, 1, "#FFF6D0");
  return {
    kind: "date-mountain",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(132, 22) },
      { name: "clouds", svg: cloud(52, 24, 0.4, "#FFFFFF", 0.9) + cloud(146, 34, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [56, 72],
          [104, 74],
          [150, 72],
          [60, 116],
          [140, 116]
        ])
      },
      {
        name: "the reward, as big as a mountain",
        svg: mountain,
        origin: { x: 80, y: 92 },
        keys: track({
          opacity: [
            [0.76, 0],
            [0.78, 1]
          ],
          scale: [
            [0.76, 0.08],
            [0.9, 1]
          ]
        })
      },
      { name: "light on the mountain", svg: shine, keys: showFrom(0.9, 0.92), loop: { move: "twinkle", ms: 1400, low: 0.4 } },
      // The palm and its dates come into sight with the first words, so a question on how small the charity is does
      // not show a date before it is asked.
      { name: "its own date palm", svg: palm(12, 98, 36) + dateBunch(12, 64) + dateBunch(17, 66), origin: { x: 12, y: 98 }, keys: showFrom(0.02, 0.04), loop: { move: "sway", ms: 4600, angle: 1 } },
      { name: "the home that gives", svg: home(30, 102, 24, 18) },
      { name: "a basket of its dates", svg: basketOfDates(47, 106), keys: showFrom(0.02, 0.04) },
      { name: "a home in need", svg: home(136, 100, 22, 16, "#C9A777", "#AF9064") + `<path d="M141 87 L139.6 90 L141.4 92.6" stroke="#9A7C52" stroke-width="0.6" fill="none"/>` },
      { name: "a way to the home in need", svg: way("M50 106.6 C70 109 100 109 124 104.6", BROWN), keys: showFrom(0.06, 0.18) },
      {
        name: "one date, given",
        svg: date(47, 99.6),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ],
          xy: [
            [0.06, 0, 0],
            [0.18, 77, 4.4]
          ]
        })
      },
      { name: "a glow on the date, accepted", svg: glow(124, 104, 5, "#FFE07A", 0.22), keys: showFrom(0.3, 0.33), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      ...risingSparks("its reward, rising", [[124, 100]], 0.35, 0.02, { color: SPARK, rise: 12, stay: true }),
      {
        name: "a foal, growing",
        svg: animalAt("horse", 54, 70, 0.22),
        origin: { x: 65, y: 87.4 },
        keys: track({
          opacity: [
            [0.52, 0],
            [0.54, 1]
          ],
          scale: [
            [0.54, 0.52],
            [0.68, 1]
          ]
        }),
        loop: { move: "bob", ms: 1800, y: -0.3, rotate: 0.8 }
      },
      {
        name: "the reward, growing",
        svg: glow(124, 88, 6, "#FFE07A", 0.18) + sparkle(124, 88, 2.4, SPARK),
        origin: { x: 124, y: 88 },
        keys: track({
          opacity: [
            [0.52, 0],
            [0.54, 1]
          ],
          scale: [
            [0.54, 0.6],
            [0.68, 1.6]
          ]
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      }
    ],
    words: [
      { text: "A date in charity, from honest earnings", from: 0.02, to: 0.26 },
      { text: "Allah accepts only what is honestly earned", from: 0.28, to: 0.48 },
      { text: "Allah grows it, as you raise a foal", from: 0.5, to: 0.72 },
      { text: "Until it becomes as big as a mountain", from: 0.74, to: 1 }
    ]
  };
}

// Deeds that keep going. The Prophet ﷺ said: when a man dies, his deeds come to an end except for three: a charity
// that keeps going, knowledge that people benefit from, or a righteous child who prays for him (Sahih Muslim 1631). No
// one is drawn: a way goes on, and good deeds rise as sparks along it; it ends at a ring, and the ring goes faint and
// still, with a soft glow on the place; then from a well given in charity water keeps flowing and those who drink
// come to it; small circles pass on what they learned, one voice after another; and a little one by the place prays,
// and from each of the three sparks rise and stay, and the glow on the place grows warmer.
function deedsContinue(): SignArt {
  const wellMouth = `<ellipse cx="120" cy="92" rx="8" ry="2" fill="#7D6A52"/><ellipse cx="120" cy="92.3" rx="6.2" ry="1.3" fill="#3F86B8"/>`;
  const well =
    `<ellipse cx="120" cy="98.6" rx="9.4" ry="1.2" fill="#000000" opacity="0.1"/>` +
    `<path d="M112 92 A8 2 0 0 0 128 92 L128 98.4 L112 98.4 Z" fill="#A89276"/>` +
    `<path d="M112 95.4 L128 95.4 M116 93.8 L116 95.4 M124 93.8 L124 95.4 M114 95.4 L114 98.4 M120 95.4 L120 98.4 M126 95.4 L126 98.4" stroke="#8A7458" stroke-width="0.5"/>` +
    `<path d="M112 92 A8 2 0 0 0 128 92" stroke="#6E5A44" stroke-width="0.9" fill="none"/>`;
  const trough = `<path d="M131 100 L149 100 L147.6 103.6 L132.4 103.6 Z" fill="#9C8466"/><path d="M132 100.6 L148 100.6" stroke="#3F86B8" stroke-width="1"/>`;
  const learners: [number, number][] = [
    [70, 82],
    [84, 84.4],
    [98, 82]
  ];
  const warmth = (from: number, to: number, a: number, b: number): [number, number][] => [
    [from, a],
    [to, b]
  ];
  return {
    kind: "deeds-continue",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E6D5AC", 61) },
      { name: "the sun", svg: sun(30, 22) },
      { name: "clouds", svg: cloud(82, 26, 0.36, "#FFFFFF", 0.9) + cloud(146, 22, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 72],
          [56, 76],
          [140, 74],
          [92, 116],
          [150, 114]
        ])
      },
      { name: "a palm by the well", svg: palm(146, 94, 30), origin: { x: 146, y: 94 }, loop: { move: "sway", ms: 4800, angle: 1 } },
      { name: "a way, going on", svg: way("M2 105 C14 107 26 105 38 101", GOLD), keys: showFrom(0.03, 0.12) },
      ...goldSparks(
        "good deeds along the way",
        [
          [10, 99],
          [20, 99],
          [30, 96]
        ],
        0.05,
        0.03
      ),
      {
        name: "a ring, where the way ended",
        svg: ring(42, 100, 3, GOLD),
        keys: track({
          opacity: [
            [0.11, 0],
            [0.12, 1],
            [0.16, 1],
            [0.2, 0.35]
          ]
        })
      },
      {
        name: "a soft glow on the place",
        svg: glow(42, 99, 7, "#FFE07A", 0.2),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.2, 0.3],
            ...warmth(0.42, 0.44, 0.3, 0.55),
            ...warmth(0.66, 0.68, 0.55, 0.8),
            ...warmth(0.9, 0.92, 0.8, 1)
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.75 }
      },
      { name: "a well, given in charity", svg: well },
      { name: "the top of the well", svg: wellMouth },
      { name: "a trough by the well", svg: trough },
      {
        name: "water, flowing to the trough",
        svg: `<path d="M127 93.6 C130 94 131 97 132 100.4" stroke="#5DA9DD" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,
        keys: showFrom(0.28, 0.3),
        loop: { move: "twinkle", ms: 700, low: 0.6 }
      },
      ...[
        [106, 100.4],
        [136, 104.6],
        [146, 104]
      ].map(
        ([x, y], i): SignPart => ({ name: `someone, coming to drink ${i + 1}`, svg: someone(x, y), keys: comeIn(0.3 + i * 0.02, 0.38 + i * 0.02, i === 0 ? -30 : 30) })
      ),
      ...risingSparks(
        "the charity, still rising",
        [
          [116, 88],
          [124, 87]
        ],
        0.36,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      ),
      ...learners.map(([x, y], i): SignPart => ({ name: `someone, who learned ${i + 1}`, svg: someone(x, y), keys: showFrom(0.5, 0.52) })),
      ...learners.slice(0, 2).map(
        ([x, y], i): SignPart => ({
          name: `a voice, passing it on ${i + 1}`,
          svg: arcs(x + 2.6, y - 1.4, VOICE),
          keys: showFrom(0.53 + i * 0.04, 0.55 + i * 0.04),
          loop: { move: "twinkle", ms: 1200, low: 0.5, phase: i / 2 }
        })
      ),
      ...risingSparks(
        "the knowledge, still rising",
        [
          [70, 78],
          [84, 80],
          [98, 78]
        ],
        0.6,
        0.015,
        { color: SPARK, rise: 10, stay: true }
      ),
      { name: "a little one, by the place", svg: someone(54, 102.4, 1.1), keys: showFrom(0.75, 0.77) },
      { name: "a voice, praying for him", svg: arcsLeft(52, 100.2, VOICE), keys: showFrom(0.78, 0.8), loop: { move: "twinkle", ms: 1400, low: 0.5 } },
      ...risingSparks(
        "the prayer, rising",
        [
          [54, 97],
          [47, 94]
        ],
        0.82,
        0.03,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "When a person dies, their deeds end", from: 0.02, to: 0.24 },
      { text: "Except three: a charity that keeps going", from: 0.26, to: 0.48 },
      { text: "Or knowledge that people benefit from", from: 0.5, to: 0.72 },
      { text: "Or a righteous child praying for the dead", from: 0.74, to: 1 }
    ]
  };
}

// Good intentions written. The Prophet ﷺ told of his Lord: Allah ordered that good and bad deeds be written. Whoever
// intends a good deed and does not do it, Allah writes it for him as a full good deed; if he intends it and does it,
// Allah writes it for him as ten good deeds up to seven hundred times and many more; if he intends a bad deed and
// does not do it, Allah writes it as a full good deed; and if he intends it and does it, Allah writes one bad deed
// (Sahih al-Bukhari 6491). No book, page or pen is drawn: a warm glow is a good intention and a spark rises from it;
// a way goes to a home in need and ten sparks rise, then many more; a dark dot is a bad intention, and when it is left
// it fades and a spark rises in its place; when it is done, it stays one small dark dot.
function goodIntentions(): SignArt {
  const ten: [number, number][] = [
    [118, 92],
    [124, 90],
    [130, 92],
    [136, 90],
    [142, 92],
    [121, 96],
    [127, 95],
    [133, 96],
    [139, 95],
    [145, 96]
  ];
  const many = [
    [102, 70],
    [110, 66],
    [118, 70],
    [126, 64],
    [134, 69],
    [142, 64],
    [150, 70],
    [106, 76],
    [114, 74],
    [122, 77],
    [130, 74],
    [138, 77],
    [146, 75],
    [154, 77],
    [98, 64],
    [154, 63]
  ]
    .map(([x, y], i) => sparkle(x, y, i % 3 ? 1.2 : 1.6, SPARK))
    .join("");
  return {
    kind: "good-intentions",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(26, 22) },
      { name: "clouds", svg: cloud(84, 24, 0.38, "#FFFFFF", 0.9) + cloud(146, 30, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [100, 76],
          [30, 116],
          [100, 116]
        ])
      },
      { name: "a home in need", svg: home(132, 100, 24, 17, "#C9A777", "#AF9064") + `<path d="M138 86 L136.6 89 L138.4 91.6" stroke="#9A7C52" stroke-width="0.6" fill="none"/>` },
      { name: "someone's place", svg: someone(64, 102, 1.8) },
      { name: "a good intention, glowing", svg: glow(64, 96, 4.6, "#FFE07A", 0.26), keys: showFrom(0.04, 0.07), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      ...risingSparks("a full good deed, rising", [[64, 94]], 0.1, 0.02, { color: SPARK, rise: 16, stay: true }),
      { name: "a way to the home in need", svg: way("M66 104 C84 108 106 107 122 100", GOLD), keys: showFrom(0.28, 0.36) },
      ...risingSparks("ten good deeds, rising", ten, 0.36, 0.004, { color: SPARK, rise: 12, stay: true }),
      { name: "many more, rising", svg: many, keys: { at: [0, 0.42, 0.44, 0.46], opacity: [0, 0, 1, 1], y: [8, 8, 2, 0] }, loop: { move: "twinkle", ms: 1600, low: 0.55 } },
      { name: "a bad intention, a dark dot", svg: `<circle cx="46" cy="96" r="1.6" fill="${DARK}"/>`, keys: showWhile(0.54, 0.56, 0.6, 0.62) },
      ...risingSparks("a full good deed, rising in its place", [[46, 96]], 0.62, 0.02, { color: SPARK, rise: 16, stay: true }),
      { name: "a way to another, the deed done", svg: way("M62 103 C54 105 44 104 37 101", BROWN), keys: showFrom(0.8, 0.86) },
      {
        name: "another bad intention, done: one bad deed",
        svg: `<circle cx="34" cy="100" r="1.6" fill="${DARK}"/>`,
        keys: track({
          opacity: [
            [0.78, 0],
            [0.8, 1]
          ],
          xy: [
            [0.86, 0, 0],
            [0.92, 0, -14]
          ]
        })
      }
    ],
    words: [
      { text: "A good deed intended but not done: a full one", from: 0.02, to: 0.24 },
      { text: "Done: ten to seven hundred times, or more", from: 0.26, to: 0.5 },
      { text: "A bad deed intended and left: a full good deed", from: 0.52, to: 0.74 },
      { text: "A bad deed done is written as one bad deed", from: 0.76, to: 1 }
    ]
  };
}

// The call from as-Safa. When "And warn your tribe of near kindred" (26:214) came, the Prophet ﷺ climbed as-Safa and
// called out to the tribes of Quraysh until they gathered. He said: if I told you that horsemen were coming to attack
// you, would you believe me? They said: we have never heard you tell a lie. He said: I am a plain warner to you of a
// severe punishment to come. Abu Lahab said: was it only for this that you gathered us? And Abu Lahab went away (Sahih
// al-Bukhari 4770, 4971). No one is drawn and no horseman: a way climbs as-Safa and a voice calls from its top; small
// dashed circles come from both sides and gather below; a voice asks, voices answer from below, and a voice warns;
// then a harsh voice comes from one of them, and that one goes away.
function safaCall(): SignArt {
  const safa =
    `<path d="M8 102 C20 90 34 80 50 79 C66 78 80 88 92 102 Z" fill="#B89A6E"/>` +
    `<path d="M50 79 C66 78 80 88 92 102 L70 102 C66 92 60 84 50 79 Z" fill="#000000" opacity="0.1"/>` +
    `<path d="M26 92 L30 90.6 L33 92.4 Z M58 88 L62.6 86.6 L64 89 Z M40 97 L44 95.6 L46.4 97.8 Z M72 96 L76 94.8 L77.6 97 Z" fill="#9C805A"/>`;
  const gather: [number, number, number][] = [
    [96, 99.4, -60],
    [104, 101.8, -64],
    [112, 99.6, -68],
    [120, 102.2, -72],
    [128, 99.8, 40],
    [144, 99.6, 30],
    [152, 102, 26]
  ];
  return {
    kind: "safa-call",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6D2A4", 62) },
      { name: "the sun", svg: sun(134, 20) },
      { name: "clouds", svg: cloud(80, 22, 0.36, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [22, 14, 30],
            [92, 18, 40],
            [146, 15, 32]
          ],
          62,
          "#B59A72",
          false
        )
      },
      {
        name: "the land",
        svg: `<rect y="62" width="160" height="58" fill="#E6D2A4"/><path d="M0 62 L160 62" stroke="#CDB283" stroke-width="0.7"/>`
      },
      { name: "homes of Makkah", svg: home(118, 84, 14, 10) + home(150, 86, 14, 11) + home(104, 80, 10, 7, "#C9A777", "#AF9064") },
      { name: "the Ka'bah", svg: kaaba(134, 82, 1) },
      { name: "as-Safa", svg: safa },
      { name: "a way, climbing as-Safa", svg: way("M4 106 C14 103 24 97 34 90 C40 85 44 82 48 80.6", GOLD), keys: showFrom(0.03, 0.09) },
      { name: "a golden ring on the top, his place", svg: ring(50, 79, 3, GOLD), keys: showFrom(0.09, 0.1) },
      {
        name: "a voice from the top, calling",
        svg: arcs(54.6, 76, VOICE) + arcsLeft(45.4, 76, VOICE),
        keys: showWhile(0.1, 0.11, 0.18, 0.2),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      ...gather.map(([x, y, from], i): SignPart => ({ name: `someone, gathering ${i + 1}`, svg: someone(x, y), keys: comeIn(0.11 + (i % 4) * 0.008, 0.165, from) })),
      {
        name: "one of them, gathering too",
        svg: someone(136, 102.2),
        keys: track({
          opacity: [
            [0.12, 0],
            [0.126, 1],
            [0.9, 1],
            [0.95, 0]
          ],
          xy: [
            [0.12, 34, 0],
            [0.165, 0, 0],
            [0.88, 0, 0],
            [0.95, 22, -3]
          ]
        })
      },
      { name: "a voice from the top, asking", svg: arcs(54.6, 76, VOICE), keys: showWhile(0.24, 0.26, 0.34, 0.36), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      {
        name: "voices from below, answering",
        svg: arcsLeft(101, 97, VOICE) + arcsLeft(117, 97.6, VOICE) + arcsLeft(133, 97, VOICE),
        keys: showWhile(0.44, 0.46, 0.56, 0.58),
        loop: { move: "twinkle", ms: 1000, low: 0.5 }
      },
      {
        name: "a voice from the top, warning",
        svg: arcs(54.6, 76, "#7A2E1C") + arcsLeft(45.4, 76, "#7A2E1C") + arcs(57.6, 76, "#7A2E1C"),
        keys: showWhile(0.62, 0.64, 0.76, 0.78),
        loop: { move: "twinkle", ms: 800, low: 0.55 }
      },
      {
        name: "a harsh voice, from one of them",
        svg: `<path d="M132.6 97.6 L134.4 95.2 L136 97.4 L137.8 94.8 L139.4 97.2 L141.2 94.6" stroke="${HARSH}" stroke-width="1" fill="none" stroke-linejoin="round"/>`,
        keys: showWhile(0.82, 0.84, 0.88, 0.9)
      },
      {
        name: "the way that one went away",
        svg: way("M138 103.4 C144 103.6 150 102.4 158 99.6", BROWN, 1),
        keys: showFrom(0.88, 0.95)
      }
    ],
    words: [
      { text: "He climbed as-Safa and called out to Quraysh", from: 0.02, to: 0.2 },
      { text: "If I warned of horsemen, would you believe me?", from: 0.22, to: 0.4 },
      { text: "We have never heard you tell a lie", from: 0.42, to: 0.58 },
      { text: "I am a plain warner of a severe punishment", from: 0.6, to: 0.78 },
      { text: "Abu Lahab said: only for this? and left", from: 0.8, to: 1 }
    ]
  };
}

// Jabir's dates. Jabir's father died in debt. Jabir offered the lenders the dates of his garden, but they would not
// take them, thinking they would not cover the debt. The Prophet ﷺ told him to gather the dates in the drying place
// and call him; he came with Abu Bakr and Umar, sat on the dates and asked Allah to bless them, and said: call your
// lenders and pay them in full. Every lender was paid in full, and thirteen wasqs of dates were left over (Sahih
// al-Bukhari 2709). No one is drawn: dates gather in a heap; small dashed circles of the lenders wait and doubt; three
// ways come, a ring sits on the heap, and blessing rises; a full sack comes by each lender, and the heap is no
// smaller; then thirteen sacks stand left over, and praise rises.
function jabirDates(): SignArt {
  const heap =
    `<path d="M56 104 Q80 80 104 104 Z" fill="#7E3016"/>` +
    [
      [64, 100.6],
      [72, 98.4],
      [80, 97],
      [88, 98.4],
      [96, 100.6],
      [68, 97],
      [76, 95.2],
      [84, 95.2],
      [92, 97],
      [80, 93.4],
      [74, 101.6],
      [86, 101.6]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.4" ry="1" fill="#A2441F"/>`)
      .join("");
  const floor = `<ellipse cx="80" cy="104.6" rx="34" ry="3.4" fill="#D9BF8E"/>`;
  const lenders: [number, number][] = [
    [116, 98.6],
    [126, 101.4],
    [136, 98.8],
    [146, 101.6],
    [154, 98]
  ];
  const left: [number, number][] = [
    ...[0, 1, 2, 3, 4, 5, 6].map((i): [number, number] => [8 + i * 7, 100.4]),
    ...[0, 1, 2, 3, 4, 5].map((i): [number, number] => [11.5 + i * 7, 106.4])
  ];
  return {
    kind: "jabir-dates",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3CF9E", 61) },
      { name: "the sun", svg: sun(118, 20) },
      { name: "clouds", svg: cloud(54, 24, 0.36, "#FFFFFF", 0.9) + cloud(150, 32, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the land",
        svg: landOf(
          [
            [44, 74],
            [100, 72],
            [128, 116]
          ],
          "#E3CF9E"
        )
      },
      {
        name: "date palms of the garden",
        svg: palm(12, 90, 32) + dateBunch(12, 58) + palm(30, 84, 26) + dateBunch(30, 58) + palm(150, 86, 28) + dateBunch(150, 58),
        origin: { x: 30, y: 90 },
        loop: { move: "sway", ms: 5200, angle: 0.8 }
      },
      { name: "the drying place", svg: floor },
      {
        name: "the heap of dates",
        svg: heap,
        origin: { x: 80, y: 104 },
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          scaleY: [
            [0.03, 0.2],
            [0.14, 1]
          ]
        })
      },
      ...lenders.map(([x, y], i): SignPart => ({ name: `a lender, waiting ${i + 1}`, svg: someone(x, y), keys: comeIn(0.06 + i * 0.01, 0.15, 40) })),
      {
        name: "voices of the lenders, doubting",
        svg: arcsLeft(113, 94.6, VOICE) + arcsLeft(133, 95, VOICE) + arcsLeft(151, 94.2, VOICE),
        keys: showWhile(0.22, 0.24, 0.32, 0.34),
        loop: { move: "twinkle", ms: 900, low: 0.45 }
      },
      { name: "a way, coming to the dates", svg: way("M2 80 C22 82 42 84 60 90 C67 93 72 92 77 91", GOLD), keys: showFrom(0.41, 0.47) },
      { name: "two more ways, with it", svg: way("M2 85 C20 87 40 89 58 95", BROWN) + way("M2 75 C22 76 44 78 62 85", BROWN), keys: showFrom(0.42, 0.48) },
      { name: "a golden ring on the dates, his place", svg: ring(80, 89, 3, GOLD), keys: showFrom(0.47, 0.48) },
      { name: "a voice, praying for blessing", svg: arcs(84, 86, VOICE), keys: showWhile(0.48, 0.5, 0.58, 0.6), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...risingSparks(
        "blessing, rising from the dates",
        [
          [72, 94],
          [88, 94],
          [80, 90]
        ],
        0.49,
        0.01,
        { color: SPARK, rise: 12, stay: true }
      ),
      ...lenders.map(
        ([x, y], i): SignPart => ({
          name: `a full sack, by the lender ${i + 1}`,
          svg: sack(x + 3.4, y + 4.4, 0.7),
          keys: track({
            opacity: [
              [0.63 + i * 0.02, 0],
              [0.64 + i * 0.02, 1]
            ],
            scale: [
              [0.63 + i * 0.02, 0.5],
              [0.65 + i * 0.02, 1]
            ]
          }),
          origin: { x: x + 3.4, y: y + 4.4 }
        })
      ),
      ...left.map(
        ([x, y], i): SignPart => ({
          name: `thirteen wasqs, left over ${i + 1}`,
          svg: sack(x, y, 0.8, i < 7 ? "#C9A66B" : "#BE9A5E"),
          keys: track({
            opacity: [
              [at3(0.82 + i * 0.006), 0],
              [at3(0.826 + i * 0.006), 1]
            ]
          })
        })
      ),
      ...risingSparks(
        "praise, rising",
        [
          [20, 92],
          [32, 90],
          [44, 92]
        ],
        0.92,
        0.01,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Jabir's father died and was in debt", from: 0.02, to: 0.18 },
      { text: "They thought the dates would not cover the debt", from: 0.2, to: 0.38 },
      { text: "He sat on the dates and prayed for blessing", from: 0.4, to: 0.6 },
      { text: "Every lender was paid in full", from: 0.62, to: 0.78 },
      { text: "And thirteen wasqs of dates were left over", from: 0.8, to: 1 }
    ]
  };
}

// Three follow, one stays. The Prophet ﷺ said: three follow the dead when he is carried to his grave; two go back and
// one stays with him: his family, his wealth and his deeds follow him; his family and his wealth go back, and his
// deeds stay with him (Sahih al-Bukhari 6514). No one is drawn, not even the one who died: a way goes from the town to
// the grave; then small dashed circles of his family, a laden camel for his wealth, and a soft light for his deeds
// follow along it; the grave is closed; the family's circles and the camel go back; and the light stays on the grave,
// and rises as sparks.
function threeFollow(): SignArt {
  const graves =
    [
      [106, 96],
      [146, 98],
      [138, 106]
    ]
      .map(([x, y]) => `<path d="M${x - 6} ${y} Q${x} ${y - 4} ${x + 6} ${y} Z" fill="#C7AD80"/><rect x="${x + 4}" y="${y - 4.6}" width="1.4" height="4.4" fill="#A88A5E"/>`)
      .join("");
  const open = `<ellipse cx="124" cy="100" rx="6.4" ry="1.6" fill="#8E7350"/>`;
  const closed = `<path d="M117.4 100.4 Q124 95.6 130.6 100.4 Z" fill="#CBB184"/><rect x="128.4" y="95.4" width="1.4" height="4.8" fill="#A88A5E"/>`;
  const tree = `<path d="M154 100 L154 82" stroke="#7A5A3A" stroke-width="1.8"/><circle cx="154" cy="78" r="8" fill="#7DA54E"/><circle cx="148" cy="82" r="5" fill="#6E9A44"/>`;
  const family: [number, number][] = [
    [90, 100.6],
    [97, 103],
    [104, 100.8]
  ];
  /** Follows along the way from `start`, then goes back from 0.6 by `x`, fading; `turn`: turns round first. */
  const go = (start: number, x: number, turn = false): SignPart["keys"] =>
    track({
      opacity: [
        [start, 0],
        [start + 0.01, 1],
        [0.62, 1],
        [0.72, 0]
      ],
      xy: [
        [start, -60, 0],
        [start + 0.12, 0, 0],
        [0.6, 0, 0],
        [0.72, x, 0]
      ],
      ...(turn
        ? {
            scaleX: [
              [0.6, 1],
              [0.62, -1]
            ]
          }
        : {})
    });
  return {
    kind: "three-follow",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#CFE3F2", "#E4D2A8", 61) },
      { name: "the sun", svg: sun(128, 26) },
      { name: "clouds", svg: cloud(60, 24, 0.36, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [52, 74],
          [92, 72],
          [60, 116],
          [150, 116]
        ])
      },
      { name: "homes of the town", svg: home(16, 94, 20, 15) + home(36, 90, 14, 10, "#C9A777", "#AF9064") },
      { name: "a tree by the graves", svg: tree, origin: { x: 154, y: 100 }, loop: { move: "sway", ms: 5000, angle: 0.8 } },
      { name: "graves, long there", svg: graves },
      { name: "the grave, open", svg: open, keys: showWhile(0.02, 0.04, 0.56, 0.58) },
      { name: "a way, to the grave", svg: way("M26 100 C52 106 86 106 117 100", "#FFF6DC", 1.3), keys: showFrom(0.04, 0.18) },
      ...family.map(([x, y], i): SignPart => ({ name: `his family, following ${i + 1}`, svg: someone(x, y), keys: go(0.32 + i * 0.01, -80) })),
      {
        name: "his wealth, a laden camel, following",
        svg: animalAt("camel", 58, 79, 0.2) + sack(72, 87.6, 0.8, "#B5523B"),
        origin: { x: 68, y: 94 },
        keys: go(0.36, -80, true),
        loop: { move: "bob", ms: 1400, y: -0.4, rotate: 0.6 }
      },
      {
        name: "his deeds, a soft light, following",
        svg: glow(112, 96, 5, "#FFE07A", 0.26) + sparkle(112, 96, 2, SPARK),
        keys: track({
          opacity: [
            [0.4, 0],
            [0.41, 1]
          ],
          xy: [
            [0.4, -60, 0],
            [0.48, 0, 0],
            [0.8, 0, 0],
            [0.84, 12, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.6 }
      },
      { name: "the grave, closed", svg: closed, keys: showFrom(0.56, 0.58) },
      { name: "a glow, staying on the grave", svg: glow(124, 97, 8, "#FFE07A", 0.2), keys: showFrom(0.84, 0.87), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...risingSparks(
        "light, rising from his deeds",
        [
          [120, 92],
          [128, 91]
        ],
        0.88,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Three follow the dead to his grave", from: 0.02, to: 0.28 },
      { text: "His family, his wealth and his deeds", from: 0.3, to: 0.52 },
      { text: "Two go back: his family and his wealth", from: 0.54, to: 0.76 },
      { text: "And his deeds stay with him", from: 0.78, to: 1 }
    ]
  };
}

export const REWARD_ART = {
  shepherds,
  "date-mountain": dateMountain,
  "deeds-continue": deedsContinue,
  "good-intentions": goodIntentions,
  "safa-call": safaCall,
  "jabir-dates": jabirDates,
  "three-follow": threeFollow
} as const;
