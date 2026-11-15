import { animalAt, cloud, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { sack, showWhile, sparkle, way } from "./giveArt";
import { comeIn, risingSparks } from "./charityArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { quickSparks, shownWhile, track } from "./toldArt";
import { THING_ART, type ThingKind } from "../lesson/thingArt";

/**
 * More likenesses the Prophet ﷺ gave, drawn as his other likenesses are (likenessArt.ts, toldArt.ts): the one who
 * recites the Quran like a citron and the one who does not like a date, the trader who let off those in hardship, the
 * birds that go out hungry and come back full, the sheep that wanders between two flocks, the fresh plant the wind
 * bends, and the one who remembers his Lord and the one who does not, like the living and the dead. Only the land, the
 * sky, homes, things, plants and animals are drawn. No Prophet and no person is ever drawn, not even a hand: where
 * someone went, a dashed way shows it, and a voice is arcs in the air. No page of the Quran is drawn, only a voice
 * reciting. Nothing is drawn for Allah, and nothing comes down from the sky: a good deed is sparks rising.
 */

/** A thing of the picture cards (its box 100 wide and 80 high), set in the scene with its box's corner at (x, y), `s` times its card's size. */
function thingAt(kind: ThingKind, x: number, y: number, s: number) {
  const body = THING_ART[kind]().body.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${s})">${body}</g>`;
}

/** A wisp of a sweet smell, rising from (x, y). */
const wisp = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y} c-1.6 -1.2 1.6 -2.4 0 -3.6 c-1.6 -1.2 1.6 -2.4 0 -3.6 c-1.6 -1.2 1.6 -2.4 0 -3.6" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;

/** A date, its middle at (x, y), turned by `turn` degrees. */
const date = (x: number, y: number, turn: number) =>
  `<g transform="translate(${x} ${y}) rotate(${turn})">` +
  `<ellipse rx="5.4" ry="3.2" fill="#86401F"/>` +
  `<path d="M-3.4 1.3 Q0 0.4 3.4 1.4" stroke="#5E2A12" stroke-width="0.6" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="-1.2" cy="-1.2" rx="2.8" ry="1" fill="#B86E3E" opacity="0.9"/>` +
  `</g>`;

/** A small sun, its middle at (x, y). */
const sun = (x: number, y: number) => `${glow(x, y, 10, "#FFF0C0", 0.12)}<circle cx="${x}" cy="${y}" r="4.6" fill="#FFE07A"/>`;

// The citron and the date. The Prophet ﷺ said: a believer who recites the Quran is like a citron; it smells good and
// it tastes good. And a believer who does not recite the Quran is like a date; it tastes good, but it has no smell
// (Sahih al-Bukhari 5020). No one is drawn, and no page of the Quran: a voice recites in one home, and a citron comes
// onto the mat before it, its sweet smell rising, and a slice of it shines, good to taste; a dashed way goes into the
// other home, where no voice is heard, and dates come onto its mat, shining, good to taste, with nothing rising.
function citron(): SignArt {
  const mat = (x: number) =>
    `<path d="M${x - 15} 91.6 L${x + 15} 91.6 L${x + 18} 101 L${x - 18} 101 Z" fill="#B5523B"/>` +
    `<path d="M${x - 12.6} 93.2 L${x + 12.6} 93.2 L${x + 15} 99.4 L${x - 15} 99.4 Z" fill="none" stroke="#E9C46A" stroke-width="0.6"/>` +
    `<path d="M${x - 18} 101 L${x - 19.4} 103 M${x - 9} 101 L${x - 9.6} 103 M${x} 101 L${x} 103 M${x + 9} 101 L${x + 9.6} 103 M${x + 18} 101 L${x + 19.4} 103" stroke="#E9C46A" stroke-width="0.6" stroke-linecap="round"/>`;
  const slice =
    `<path d="M49.6 98.8 A3.8 3.8 0 0 1 57.2 98.8 Z" fill="#F4D23E"/>` +
    `<path d="M50.5 98.8 A2.9 2.9 0 0 1 56.3 98.8 Z" fill="#FBEFA8"/>` +
    `<path d="M53.4 98.8 L51.3 96.7 M53.4 98.8 L53.4 95.9 M53.4 98.8 L55.5 96.7" stroke="#F4D23E" stroke-width="0.45"/>`;
  const plate = (x: number) => `<ellipse cx="${x}" cy="98.2" rx="11.6" ry="2.6" fill="#FFFFFF"/><ellipse cx="${x}" cy="97.8" rx="9" ry="1.7" fill="#EEEAE0"/>`;
  const shine = (list: [number, number, number][]) => list.map(([x, y, r]) => sparkle(x, y, r, "#FFFFFF")).join("");
  return {
    kind: "citron",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: sun(142, 44) },
      { name: "clouds", svg: cloud(30, 40, 0.5, "#FFFFFF", 0.9) + cloud(96, 34, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [30, 9, 30],
            [92, 13, 36],
            [150, 8, 26]
          ],
          61,
          "#D8C7A0",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [12, 70],
          [70, 74],
          [92, 66],
          [150, 72],
          [8, 108],
          [80, 112],
          [152, 110]
        ])
      },
      { name: "the home where it is recited", svg: home(36, 84, 28, 19) },
      { name: "the quiet home", svg: home(124, 84, 28, 19, "#CFA66F", "#B88A58") },
      { name: "a mat before each home, with a plate", svg: mat(40) + mat(120) + plate(40) + plate(120) },
      { name: "a voice, reciting", svg: arcs(42.6, 68.6), keys: showFrom(0.04, 0.05), loop: { move: "twinkle", ms: 1400, low: 0.45 } },
      {
        name: "a citron",
        svg: thingAt("citron", 22.3, 74.7, 0.34),
        origin: { x: 40, y: 97.5 },
        keys: track({
          opacity: [
            [0.19, 0],
            [0.195, 1]
          ],
          scale: [
            [0.19, 0.3],
            [0.23, 1]
          ]
        })
      },
      { name: "its sweet smell, rising", svg: wisp(33, 82, "#E8C24A") + wisp(39.4, 80.6, "#E8C24A") + wisp(45.8, 82, "#E8C24A"), keys: showFrom(0.35, 0.37), loop: { move: "bob", ms: 2400, y: -1.4 } },
      { name: "a slice of it, good to taste", svg: slice, keys: showFrom(0.4, 0.42) },
      {
        name: "its good taste, shining",
        svg: shine([
          [58.4, 93.6, 1.6],
          [49.2, 94.4, 1.2]
        ]),
        keys: showFrom(0.42, 0.44),
        loop: { move: "twinkle", ms: 1100, low: 0.35 }
      },
      { name: "a way into the quiet home, part 1", svg: way("M160 110 C150 106 138 100 130 94", BROWN), keys: showFrom(0.53, 0.545) },
      { name: "a way into the quiet home, part 2", svg: way("M130 94 C126 91 123.4 88 122.4 85", BROWN), keys: showFrom(0.545, 0.56) },
      {
        name: "dates",
        svg: date(114.4, 96.4, -14) + date(125.4, 96.8, 16) + date(119.8, 93.2, 4),
        origin: { x: 120, y: 97 },
        keys: track({
          opacity: [
            [0.69, 0],
            [0.695, 1]
          ],
          scale: [
            [0.69, 0.3],
            [0.73, 1]
          ]
        })
      },
      {
        name: "their good taste, shining",
        svg: shine([
          [129.6, 90.6, 1.6],
          [110.6, 91.4, 1.2]
        ]),
        keys: showFrom(0.83, 0.85),
        loop: { move: "twinkle", ms: 1100, low: 0.35 }
      }
    ],
    words: [
      { text: "A believer who recites the Quran", from: 0.02, to: 0.16 },
      { text: "Is like a citron", from: 0.18, to: 0.32 },
      { text: "It smells good, and it tastes good", from: 0.34, to: 0.5 },
      { text: "A believer who does not recite it", from: 0.52, to: 0.66 },
      { text: "Is like a date", from: 0.68, to: 0.8 },
      { text: "It tastes good, but has no smell", from: 0.82, to: 1 }
    ]
  };
}

// The trader who let them off. The Prophet ﷺ said: there was a trader who used to lend to people, and when he saw
// one in hardship, he said to his young helpers: let him off, so that Allah may let us off. So Allah let him off
// (Sahih al-Bukhari 2078). No one is drawn: dashed ways come to a stall and go off with sacks taken on credit, and a
// mark goes up on its tally board for each; two come back and pay, and their marks go; the third comes with an empty
// purse; a voice from the stall lets him off, and his mark is wiped away; his way goes home free, and sparks rise from
// the stall.
function forgivingTrader(): SignArt {
  const colors = [BROWN, "#C0612B", "#3E7FB0"];
  const stripes = Array.from({ length: 13 }, (_, i) => `<rect x="${54 + i * 4}" y="57" width="4" height="7" fill="${i % 2 ? "#FFF3D6" : "#D9534F"}"/>`).join("");
  const scallops = Array.from({ length: 13 }, (_, i) => `<path d="M${54 + i * 4} 64 A2 2 0 0 0 ${58 + i * 4} 64 Z" fill="${i % 2 ? "#FFF3D6" : "#D9534F"}"/>`).join("");
  const stall =
    `<rect x="61" y="64" width="38" height="22" fill="#6B4A2E"/>` +
    `<rect x="59" y="62" width="2.2" height="35" fill="#8A6440"/><rect x="98.8" y="62" width="2.2" height="35" fill="#8A6440"/>` +
    stripes +
    scallops +
    `<rect x="53" y="55.6" width="54" height="1.8" rx="0.6" fill="#8A6440"/>` +
    `<rect x="57" y="87" width="46" height="10" fill="#A0703F"/><path d="M57 90.4 L103 90.4 M57 93.8 L103 93.8" stroke="#8A6440" stroke-width="0.5"/>` +
    `<rect x="56" y="85.4" width="48" height="2" rx="0.5" fill="#BC8A55"/>`;
  const jar = (x: number) =>
    `<path d="M${x - 2.2} 85.4 C${x - 3.6} 82.4 ${x - 3.4} 79.6 ${x - 1.6} 78.6 L${x - 1.4} 77.4 L${x + 1.4} 77.4 L${x + 1.6} 78.6 C${x + 3.4} 79.6 ${x + 3.6} 82.4 ${x + 2.2} 85.4 Z" fill="#B66A3C"/><path d="M${x - 1.8} 77.4 L${x + 1.8} 77.4" stroke="#8C4E2A" stroke-width="0.8" stroke-linecap="round"/>`;
  const board =
    `<path d="M104.4 69 L108 65.4 L111.6 69" stroke="#6B4A2E" stroke-width="0.5" fill="none"/><circle cx="108" cy="65.2" r="0.6" fill="#6B4A2E"/>` +
    `<rect x="103" y="69" width="10" height="12" rx="0.6" fill="#EAD3A4" stroke="#8A6440" stroke-width="0.6"/>`;
  const mark = (x: number) => `<path d="M${x} 71.4 L${x} 78.6" stroke="#4A3420" stroke-width="0.9" stroke-linecap="round"/>`;
  const coins = (x: number, y: number) =>
    [0, 1, 2].map((i) => `<ellipse cx="${x}" cy="${n(y - i * 1.1)}" rx="2.2" ry="0.9" fill="#E9B949" stroke="#B8862A" stroke-width="0.35"/>`).join("");
  const purse =
    `<g transform="translate(78 97.6) scale(1.5)">` +
    `<path d="M-3.4 2.6 C-4 -0.6 -2.6 -2.8 0 -3 C2.6 -2.8 4 -0.6 3.4 2.6 C2.4 3.6 -2.4 3.6 -3.4 2.6 Z" fill="#D2A878"/>` +
    `<path d="M-3.1 1.4 C-1 2.4 1 2.4 3.1 1.4" stroke="#B8875A" stroke-width="0.5" fill="none"/>` +
    `<ellipse cx="0" cy="-2.8" rx="2.6" ry="1" fill="#3E2C1C"/>` +
    `<path d="M-2.4 -3.2 C-1.4 -4.4 1.4 -4.4 2.4 -3.2" stroke="#8A6440" stroke-width="0.5" fill="none"/>` +
    `</g>`;
  // Where each way ends at the stall, and where its sack goes off with it.
  const ways = ["M0 104 C18 103 40 104 64 100.6", "M160 104 C142 103 120 104 94 100.6", "M24 120 C36 112 56 106 78 101"];
  const sacks: { x: number; take: number; hand: [number, number]; off: [number, number] }[] = [
    { x: 66, take: 0.055, hand: [-2, 13.4], off: [-72, 18.4] },
    { x: 74, take: 0.095, hand: [20, 13.4], off: [92, 18.4] },
    { x: 82, take: 0.135, hand: [-4, 14.4], off: [-58, 36] }
  ];
  return {
    kind: "forgiving-trader",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      {
        name: "the sun",
        svg: sun(24, 44),
        keys: track({
          xy: [
            [0.245, 0, 0],
            [0.27, 16, -4]
          ]
        })
      },
      { name: "clouds", svg: cloud(118, 36, 0.5, "#FFFFFF", 0.9) + cloud(52, 30, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the land",
        svg: landOf([
          [10, 70],
          [46, 66],
          [120, 68],
          [152, 74],
          [12, 112],
          [140, 114]
        ])
      },
      { name: "homes behind the market", svg: home(20, 78, 22, 15) + home(142, 78, 22, 15, "#CFA66F", "#B88A58") },
      { name: "the stall", svg: stall },
      { name: "jars on the stall", svg: jar(92.6) + jar(97.8) },
      { name: "the tally board", svg: board },
      ...colors.map(
        (color, i): SignPart => ({ name: `a way, coming to buy on credit ${i + 1}`, svg: way(ways[i], color), keys: showFrom(at3(0.03 + i * 0.04), at3(0.045 + i * 0.04)) })
      ),
      ...sacks.map(
        ({ x, take, hand, off }, i): SignPart => ({
          name: `a sack, taken on credit ${i + 1}`,
          svg: sack(x, 85.6, 1.15),
          keys: track({
            xy: [
              [take, 0, 0],
              [at3(take + 0.01), hand[0], hand[1]],
              [at3(take + 0.04), off[0], off[1]]
            ],
            opacity: [
              [at3(take + 0.035), 1],
              [at3(take + 0.042), 0]
            ]
          })
        })
      ),
      ...[105.4, 108, 110.6].map(
        (x, i): SignPart => ({
          name: `a mark on the tally board ${i + 1}`,
          svg: mark(x),
          keys: track({
            opacity:
              i < 2
                ? [
                    [at3(0.06 + i * 0.04), 0],
                    [at3(0.065 + i * 0.04), 1],
                    [at3(0.29 + i * 0.03), 1],
                    [at3(0.295 + i * 0.03), 0]
                  ]
                : [
                    [0.14, 0],
                    [0.145, 1],
                    [0.5, 1],
                    [0.52, 0]
                  ]
          })
        })
      ),
      ...[
        { at: 64, y: 99, to: [70, 84.6] },
        { at: 94, y: 99, to: [88, 84.6] }
      ].map(
        (pay, i): SignPart => ({
          name: `coins, paid back ${i + 1}`,
          svg: coins(pay.at, pay.y),
          keys: track({
            opacity: shownWhile(at3(0.27 + i * 0.03), at3(0.275 + i * 0.03), at3(0.29 + i * 0.03), at3(0.295 + i * 0.03)),
            xy: [
              [at3(0.275 + i * 0.03), 0, 0],
              [at3(0.29 + i * 0.03), pay.to[0] - pay.at, n(pay.to[1] - pay.y)]
            ]
          })
        })
      ),
      {
        name: "an empty purse, opened",
        svg: purse,
        origin: { x: 78, y: 98 },
        keys: track({
          opacity: shownWhile(0.34, 0.35, 0.63, 0.64),
          rotate: [
            [0.355, 0],
            [0.37, -28]
          ]
        })
      },
      ...[
        [-1.4, 0],
        [0.4, 1.2],
        [-2.6, 1.6]
      ].map(
        ([dx, dy], i): SignPart => ({
          name: `only dust, from the empty purse ${i + 1}`,
          svg: `<circle cx="${n(75.8 + dx)}" cy="${n(94 + dy)}" r="0.45" fill="#9C8A72"/>`,
          keys: { at: [0, 0.37, 0.373, 0.38, 0.384], opacity: [0, 0, 1, 1, 0], x: [0, 0, -0.6, -2.4, -2.8], y: [0, 0, 0.8, 3.4, 4] }
        })
      ),
      { name: "a voice from the stall, saying: let him off", svg: arcs(80, 75), keys: showWhile(0.45, 0.46, 0.735, 0.745), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...quickSparks(
        "the debt, let off",
        [
          [106, 74],
          [110.4, 76.4]
        ],
        0.52,
        0.006
      ),
      { name: "a way, going home free", svg: way("M78 101 C96 104 120 110 160 112", colors[2]), keys: showFrom(0.64, 0.68) },
      { name: "warmth over the stall", svg: glow(80, 78, 26, "#FFE7A0", 0.05), keys: showFrom(0.82, 0.86) },
      ...risingSparks(
        "forgiven, rising",
        [
          [68, 78],
          [80, 74],
          [92, 78],
          [74, 70],
          [86, 70]
        ],
        0.82,
        0.015,
        { stay: true, rise: 18 }
      )
    ],
    words: [
      { text: "A trader used to lend to people", from: 0.02, to: 0.22 },
      { text: "When one in hardship could not pay him back", from: 0.24, to: 0.42 },
      { text: "He told his helpers: let him off", from: 0.44, to: 0.6 },
      { text: "So that Allah may let us off", from: 0.62, to: 0.78 },
      { text: "And Allah forgave him", from: 0.8, to: 1 }
    ]
  };
}

/** A bird, its body's middle at (x, y): hungry (slim) or full (round), facing right, or left. */
function bird(x: number, y: number, full: boolean, left = false) {
  const rx = full ? 4.8 : 3.3;
  const ry = full ? 3.9 : 1.7;
  return (
    `<g transform="translate(${x} ${y}) scale(${left ? -1.3 : 1.3} 1.3)">` +
    `<path d="M${n(-rx + 0.6)} -0.6 L${n(-rx - 3.2)} -2 L${n(-rx - 2.8)} 1 Z" fill="#6E4A30"/>` +
    `<ellipse rx="${rx}" ry="${ry}" fill="#A9734A"/>` +
    `<ellipse cx="0.6" cy="${n(ry * 0.38)}" rx="${n(rx * 0.68)}" ry="${n(ry * 0.56)}" fill="#EBCB9F"/>` +
    `<path d="M-2.6 -0.4 C-1 -2.6 1.8 -2.4 2.6 -0.2 C1 0.6 -1.2 0.7 -2.6 -0.4 Z" fill="#7A5236"/>` +
    `<circle cx="${n(rx - 0.4)}" cy="${n(-ry + 0.2)}" r="2" fill="#A9734A"/>` +
    `<circle cx="${n(rx + 0.2)}" cy="${n(-ry - 0.1)}" r="0.45" fill="#2B2B2B"/>` +
    `<path d="M${n(rx + 1.4)} ${n(-ry - 0.3)} L${n(rx + 3)} ${n(-ry + 0.3)} L${n(rx + 1.4)} ${n(-ry + 0.9)} Z" fill="#E7A33E"/>` +
    `</g>`
  );
}

// The birds. The Prophet ﷺ said: if you relied on Allah as He should be relied on, He would provide for you as He
// provides for the birds: they go out in the morning hungry, and come back in the evening full (Jami at-Tirmidhi
// 2344). At dawn the birds sleep in their nests in a tree; grain ripens in the field; in the morning they fly out,
// slim and hungry, and peck at it all day; in the evening they fly back to their nests, round and full.
function hungryBirds(): SignArt {
  const nests: [number, number][] = [
    [18, 70],
    [34, 57],
    [45, 73]
  ];
  // Where each bird sits in its nest, and where it eats in the field.
  const seat = nests.map(([x, y]): [number, number] => [x, n(y - 2.6)]);
  const field: [number, number][] = [
    [104, 99],
    [120, 102],
    [137, 98.6]
  ];
  const tree =
    `<path d="M27.4 106 C28.4 96 28.6 86 29 74 L32 74 C32.4 86 32.6 96 34 106 Z" fill="#7A5236"/>` +
    `<path d="M30 84 C24 80 20 76 18 71 M30.6 78 C36 72 38 66 35 58 M31.4 88 C38 84 42 80 45 74" stroke="#7A5236" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
    [
      [30, 58, 15],
      [17, 66, 11],
      [44, 66, 11],
      [30, 70, 13]
    ]
      .map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? "#4E8A3C" : "#5E9E4A"}"/>`)
      .join("") +
    nests.map(([x, y]) => `<path d="M${x - 5.4} ${y} Q${x} ${y + 4.6} ${x + 5.4} ${y} Z" fill="#8A6440"/><path d="M${x - 5.6} ${y} L${x + 5.6} ${y}" stroke="#6B4A2E" stroke-width="1.1" stroke-linecap="round"/>`).join("");
  const crops = Array.from({ length: 9 }, (_, i) => {
    const x = 94 + i * 7;
    const h = 14 + (i % 3) * 2;
    return `<path d="M${x} 108 C${x - 0.4} ${108 - h * 0.5} ${x + 0.6} ${108 - h * 0.8} ${x} ${108 - h}" stroke="#B9A04A" stroke-width="0.8" fill="none"/><ellipse cx="${x}" cy="${n(106 - h)}" rx="1.2" ry="3" fill="#D9B45A"/>`;
  }).join("");
  const grain = field
    .flatMap(([x, y]) =>
      [
        [-4, 2.6],
        [-1.4, 3.4],
        [1.8, 2.8],
        [4.2, 3.6]
      ].map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.8" ry="0.5" fill="#C99A3A"/>`)
    )
    .join("");
  // A flight from `from` to `to`, over an arc, between `start` and `end`: [at, x, y] moves from where it is drawn.
  const flight = (from: [number, number], to: [number, number], start: number, end: number): [number, number, number][] => [
    [start, 0, 0],
    [at3((start + end) / 2), n((to[0] - from[0]) / 2), n(Math.min(0, to[1] - from[1]) - 20)],
    [end, n(to[0] - from[0]), n(to[1] - from[1])]
  ];
  return {
    kind: "hungry-birds",
    ms: 12000,
    parts: [
      { name: "the sky by day", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      {
        name: "the dawn sky",
        svg: `<rect width="160" height="61" fill="#F2B994"/><rect y="38" width="160" height="23" fill="#FADCBE"/>`,
        keys: track({
          opacity: [
            [0.37, 1],
            [0.43, 0]
          ]
        })
      },
      {
        name: "the evening sky",
        svg: `<rect width="160" height="61" fill="#E49A78"/><rect y="38" width="160" height="23" fill="#F4C79C"/>`,
        keys: track({
          opacity: [
            [0.66, 0],
            [0.74, 1]
          ]
        })
      },
      {
        name: "the sun",
        svg: sun(66, 46),
        keys: track({
          xy: [
            [0.04, 0, 20],
            [0.12, 0, 0],
            [0.42, 0, 0],
            [0.54, 34, -10],
            [0.66, 34, -10],
            [0.8, 84, 22]
          ]
        })
      },
      { name: "clouds", svg: cloud(70, 34, 0.45, "#FFFFFF", 0.85) + cloud(130, 40, 0.4, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [70, 10, 30],
            [128, 14, 34]
          ],
          61,
          "#C9BE8E",
          false
        )
      },
      {
        name: "the land",
        svg: landOf(
          [
            [64, 70],
            [84, 76],
            [150, 68],
            [10, 112],
            [70, 114]
          ],
          "#D7DFA2"
        )
      },
      { name: "a tree with nests", svg: tree },
      {
        name: "the crops in the field",
        svg: crops,
        origin: { x: 122, y: 108 },
        keys: track({
          scale: [
            [0.2, 0.2],
            [0.26, 1]
          ],
          opacity: [
            [0.2, 0],
            [0.205, 1]
          ]
        })
      },
      { name: "the grain on the ground", svg: grain, keys: track({ opacity: shownWhile(0.25, 0.27, 0.52, 0.58) }) },
      {
        name: "the grain, shining",
        svg: field.map(([x, y]) => sparkle(x + 5.6, y - 1, 1.3, "#FFF6C8")).join(""),
        keys: track({ opacity: shownWhile(0.27, 0.29, 0.5, 0.52) }),
        loop: { move: "twinkle", ms: 1000, low: 0.3 }
      },
      {
        name: "dusk over the land",
        svg: `<rect y="61" width="160" height="59" fill="#3B2A4A"/>`,
        keys: track({
          opacity: [
            [0.66, 0],
            [0.78, 0.16]
          ]
        })
      },
      ...seat.map(
        (place, i): SignPart => ({
          name: `a bird, going out hungry ${i + 1}`,
          svg: bird(place[0], place[1], false),
          keys: track({
            xy: flight(place, field[i], at3(0.38 + i * 0.02), at3(0.46 + i * 0.02)),
            opacity: [
              [0.66, 1],
              [0.666, 0]
            ]
          }),
          loop: { move: "bob", ms: 520, y: -0.9, phase: i / 3 }
        })
      ),
      ...field.map(
        (place, i): SignPart => ({
          name: `a bird, coming back full ${i + 1}`,
          svg: bird(place[0], place[1], true, true),
          keys: track({
            xy: flight(place, seat[i], at3(0.68 + i * 0.02), at3(0.76 + i * 0.02)),
            opacity: [
              [0.66, 0],
              [0.666, 1]
            ]
          }),
          loop: { move: "bob", ms: 700, y: -0.6, phase: i / 3 }
        })
      )
    ],
    words: [
      { text: "If you relied on Allah as you should", from: 0.02, to: 0.16 },
      { text: "He would provide for you, as for the birds", from: 0.18, to: 0.34 },
      { text: "They go out in the morning hungry", from: 0.36, to: 0.62 },
      { text: "And come back in the evening full", from: 0.64, to: 1 }
    ]
  };
}

// The sheep between two flocks. The Prophet ﷺ said: the likeness of a hypocrite is that of a sheep wandering between
// two flocks; it goes to this one once, and to that one once (Sahih Muslim 2784). A sheep comes onto the meadow; two
// flocks come, one on each side, grazing; it runs to the one, then to the other, then back between them, turning this
// way and that, and stays with neither.
function twoFlocks(): SignArt {
  const s = 0.17;
  const first: [number, number][] = [
    [6, 84],
    [21, 86],
    [9, 92],
    [24, 94]
  ];
  const second: [number, number][] = [
    [137, 84],
    [122, 86],
    [134, 92],
    [119, 94]
  ];
  return {
    kind: "two-flocks",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: sun(80, 42) },
      { name: "clouds", svg: cloud(30, 38, 0.5, "#FFFFFF", 0.9) + cloud(126, 34, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [26, 10, 32],
            [84, 13, 34],
            [140, 9, 30]
          ],
          61,
          "#A9C98A",
          false
        )
      },
      {
        name: "the meadow",
        svg: landOf(
          [
            [14, 68],
            [56, 72],
            [104, 66],
            [150, 74],
            [70, 116],
            [150, 116]
          ],
          "#C6DE98"
        )
      },
      ...first.map(
        ([x, y], i): SignPart => ({
          name: `a sheep of the first flock ${i + 1}`,
          svg: animalAt("sheep", x, y, s),
          keys: comeIn(0.19, 0.26, -70),
          loop: { move: "bob", ms: 2600, y: -0.4, rotate: 2, phase: i / 4 }
        })
      ),
      ...second.map(
        ([x, y], i): SignPart => ({
          name: `a sheep of the second flock ${i + 1}`,
          svg: animalAt("sheep", x, y, s, true),
          keys: comeIn(0.19, 0.26, 70),
          loop: { move: "bob", ms: 2600, y: -0.4, rotate: -2, phase: i / 4 }
        })
      ),
      { name: "its way, to the first flock", svg: way("M80 106 C70 108 60 104 49 106", BROWN), keys: showFrom(0.38, 0.43) },
      { name: "its way, to the second flock", svg: way("M49 108.4 C70 111 92 105 111 108.4", BROWN), keys: showFrom(0.54, 0.62) },
      { name: "its way, back between them", svg: way("M111 110.6 C102 112.4 92 109.6 80 110.6", BROWN), keys: showFrom(0.7, 0.74) },
      {
        name: "a sheep, wandering",
        svg: animalAt("sheep", 71.5, 90, s),
        origin: { x: 80, y: 96 },
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          scale: [
            [0.03, 0.6],
            [0.07, 1]
          ],
          scaleX: [
            [0.27, 1],
            [0.274, -1],
            [0.3, -1],
            [0.304, 1],
            [0.37, 1],
            [0.374, -1],
            [0.53, -1],
            [0.534, 1],
            [0.685, 1],
            [0.689, -1],
            [0.8, -1],
            [0.804, 1],
            [0.86, 1],
            [0.864, -1],
            [0.92, -1],
            [0.924, 1]
          ],
          xy: [
            [0.375, 0, 0],
            [0.43, -31.5, 0],
            [0.535, -31.5, 0],
            [0.62, 31.5, 0],
            [0.69, 31.5, 0],
            [0.74, 0, 0]
          ]
        }),
        loop: { move: "bob", ms: 900, y: -0.9 }
      }
    ],
    words: [
      { text: "A hypocrite is like a sheep", from: 0.02, to: 0.16 },
      { text: "Wandering between two flocks", from: 0.18, to: 0.34 },
      { text: "It goes to this one", from: 0.36, to: 0.5 },
      { text: "Then to that one", from: 0.52, to: 0.66 },
      { text: "Never settling with either", from: 0.68, to: 1 }
    ]
  };
}

// The fresh plant and the pine. The Prophet ﷺ said: the believer is like a fresh, tender plant: from wherever the wind
// comes, it bends it, and when the wind is still, it stands straight again; so the believer is bent by trials. And the
// wicked is like a pine, hard and straight, until Allah breaks it when He wills (Sahih al-Bukhari 5644). A fresh plant
// grows in a field; the wind bends it one way, then the other; when the wind is still, it stands straight again. A
// pine stands hard and straight, and does not bend in the wind; then a strong gust breaks it, and it falls, while the
// plant bends, and stands again.
function bendingPlant(): SignArt {
  const leaf = (x: number, y: number, turn: number, k: number) =>
    `<path d="M0 0 C3 -2.2 7 -2.2 10 0 C7 2.2 3 2.2 0 0 Z" transform="translate(${x} ${y}) rotate(${turn}) scale(${k})" fill="#6CC24A"/>`;
  const plant =
    `<path d="M54 104 C53.4 96 55 88 54 80 C53.4 76 54.4 72 54 68" stroke="#4E9A3C" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
    leaf(54, 98, -30, 1) +
    leaf(54, 92.4, 210, 0.95) +
    leaf(54.4, 86.4, -36, 0.85) +
    leaf(54, 80.4, 216, 0.75) +
    leaf(54.2, 74.6, -42, 0.6) +
    `<ellipse cx="54" cy="66" rx="2.2" ry="4" fill="#A6D65A"/><path d="M54 62.4 L54 69.6" stroke="#7DB540" stroke-width="0.5"/>`;
  const tiers = [
    [40, 54, 7],
    [47, 65, 10],
    [56, 77, 13]
  ]
    .map(
      ([top, base, w]) =>
        `<path d="M118 ${top} L${118 - w} ${base} L${118 + w} ${base} Z" fill="#2F6B3A"/><path d="M118 ${top} L${118 + w} ${base} L${118 + w * 0.3} ${base} Z" fill="#000000" opacity="0.14"/>`
    )
    .join("");
  const pineTop =
    `<path d="M116.8 84 L116.8 70 L119.2 70 L119.2 84 L118.4 82.6 L117.6 84.4 Z" fill="#6B4A2E"/>` + tiers;
  const stump =
    `<path d="M116.4 104 L116.4 84.6 L117.4 83.4 L118.2 85 L119 83.2 L119.6 84.6 L119.6 104 Z" fill="#6B4A2E"/>` +
    `<path d="M116.4 104 L113.6 105.4 M119.6 104 L122.6 105.4" stroke="#6B4A2E" stroke-width="1.1" stroke-linecap="round"/>`;
  const gusts = (k: number) =>
    `<g fill="none" stroke="#FFFFFF" stroke-width="${k}" stroke-linecap="round" opacity="0.9">` +
    `<path d="M6 66 C16 63 26 68 38 65 C42 64 42 60 38 61"/><path d="M60 78 C72 75 84 79 96 76"/>` +
    `<path d="M110 70 C120 67 132 71 144 68 C148 67 147 63 143 64"/><path d="M20 90 C32 87 44 91 56 88"/>` +
    `<path d="M96 94 C108 91 118 95 130 92"/></g>`;
  const fromRight = (svg: string) => `<g transform="translate(160 0) scale(-1 1)">${svg}</g>`;
  const chips = [
    [-3.6, -3],
    [3.4, -4],
    [1.2, 2.6]
  ];
  return {
    kind: "bending-plant",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: sun(26, 42) },
      { name: "clouds", svg: cloud(90, 36, 0.5, "#FFFFFF", 0.9) + cloud(146, 42, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [20, 9, 30],
            [84, 12, 36],
            [146, 10, 30]
          ],
          61,
          "#B9C98E",
          false
        )
      },
      {
        name: "the field",
        svg: landOf(
          [
            [12, 70],
            [36, 76],
            [90, 70],
            [146, 76],
            [20, 112],
            [92, 114],
            [146, 112]
          ],
          "#D9D79A"
        )
      },
      { name: "the wind, from the left", svg: gusts(1.2), keys: showWhile(0.19, 0.2, 0.265, 0.275), loop: { move: "slide", ms: 1600 } },
      { name: "the wind, from the right", svg: fromRight(gusts(1.2)), keys: showWhile(0.27, 0.28, 0.41, 0.42), loop: { move: "slide", ms: 1600, reverse: true } },
      { name: "its trunk, standing", svg: stump, keys: track({ opacity: [[0.59, 0], [0.63, 1]] }) },
      {
        name: "a pine, hard and straight",
        svg: pineTop,
        origin: { x: 118, y: 84 },
        keys: track({
          opacity: [
            [0.59, 0],
            [0.63, 1]
          ],
          rotate: [
            [0.8, 0],
            [0.81, 3],
            [0.83, 3],
            [0.88, 86]
          ],
          xy: [
            [0.85, 0, 0],
            [0.89, 0, 17]
          ]
        })
      },
      ...chips.map(
        ([dx, dy], i): SignPart => ({
          name: `a splinter, as it breaks ${i + 1}`,
          svg: `<rect x="117.4" y="83.2" width="1.4" height="0.7" rx="0.2" fill="#8A6440"/>`,
          keys: { at: [0, 0.81, 0.815, 0.835, 0.84], opacity: [0, 0, 1, 1, 0], x: [0, 0, n(dx * 0.2), dx, dx], y: [0, 0, n(dy * 0.2), dy, n(dy + 1)] }
        })
      ),
      {
        name: "a fresh, soft plant",
        svg: plant,
        origin: { x: 54, y: 104 },
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          scale: [
            [0.03, 0.15],
            [0.11, 1]
          ],
          rotate: [
            [0.2, 0],
            [0.235, 26],
            [0.275, 26],
            [0.31, -26],
            [0.42, -26],
            [0.46, 6],
            [0.49, -2],
            [0.51, 0],
            [0.66, 0],
            [0.69, 22],
            [0.78, 22],
            [0.8, 34],
            [0.9, 34],
            [0.94, -4],
            [0.96, 0]
          ]
        }),
        loop: { move: "sway", ms: 3000, angle: 1.5 }
      },
      { name: "the wind again, from the left", svg: gusts(1.2), keys: showWhile(0.65, 0.66, 0.765, 0.775), loop: { move: "slide", ms: 1600 } },
      { name: "a strong gust", svg: gusts(2) + `<g transform="translate(14 8)">${gusts(1.6)}</g>`, keys: showWhile(0.77, 0.78, 0.88, 0.9), loop: { move: "slide", ms: 900 } }
    ],
    words: [
      { text: "A believer is like a fresh, soft plant", from: 0.02, to: 0.16 },
      { text: "From wherever the wind comes, it bends it", from: 0.18, to: 0.38 },
      { text: "When the wind is still, it stands straight again", from: 0.4, to: 0.56 },
      { text: "The wicked is like a pine, hard and straight", from: 0.58, to: 0.74 },
      { text: "Until Allah breaks it, when He wills", from: 0.76, to: 1 }
    ]
  };
}

// The living and the dead. The Prophet ﷺ said: the likeness of one who remembers his Lord and one who does not
// remember Him is that of the living and the dead (Sahih al-Bukhari 6407). No one is drawn: at dusk, a voice remembers
// in one home, and sparks rise from it; a dashed way goes into the other home, where no voice is heard. The home that
// remembers comes alive: its lamp burns bright, its door glows, and sparks rise and stay over it; the other home's
// lamp goes out, and it stands dark and still.
function remember(): SignArt {
  const pane = (x: number) => `<rect x="${x}" y="74" width="7" height="7" fill="#4A3424"/>`;
  const lamp = (x: number) => `<rect x="${x}" y="74" width="7" height="7" fill="#FFD66B"/><path d="M${x + 3.5} 74 L${x + 3.5} 81 M${x} 77.5 L${x + 7} 77.5" stroke="#6B4A2E" stroke-width="0.6"/>`;
  return {
    kind: "remember",
    ms: 11000,
    parts: [
      { name: "the sky at dusk", svg: sky("#E8B08A", "#F4D3B2", 60) },
      { name: "the sun, setting", svg: `${glow(80, 60, 14, "#FFE0B0", 0.16)}<circle cx="80" cy="60" r="5" fill="#FFC77A"/>` },
      {
        name: "hills",
        svg: peaks(
          [
            [24, 9, 32],
            [80, 7, 30],
            [140, 10, 32]
          ],
          61,
          "#C7A784",
          false
        )
      },
      {
        name: "the land",
        svg: landOf(
          [
            [10, 70],
            [80, 74],
            [150, 70],
            [14, 112],
            [80, 116],
            [146, 112]
          ],
          "#D9BF8E"
        )
      },
      { name: "the home that remembers", svg: home(44, 92, 34, 24) + pane(49) },
      { name: "the other home", svg: home(116, 92, 34, 24, "#CFA66F", "#B88A58") + pane(121) },
      {
        name: "its warmth, all around",
        svg: glow(48, 80, 28, "#FFD98A", 0.14),
        keys: showFrom(0.44, 0.48)
      },
      {
        name: "the lamp in the home that remembers",
        svg: lamp(49),
        keys: track({
          opacity: [
            [0.43, 0.55],
            [0.47, 1]
          ]
        })
      },
      { name: "its door, glowing", svg: `<path d="M40.4 92 L40.4 86.6 Q42.2 84.4 44 86.6 L44 92 Z" fill="#FFC85A"/>`, keys: showFrom(0.45, 0.48) },
      {
        name: "the lamp in the other home",
        svg: lamp(121),
        keys: track({
          opacity: [
            [0.7, 0.55],
            [0.74, 0]
          ]
        })
      },
      { name: "a voice, remembering", svg: arcs(57.6, 77.4), keys: showFrom(0.04, 0.05), loop: { move: "twinkle", ms: 1400, low: 0.45 } },
      ...risingSparks(
        "remembrance, rising",
        [
          [54, 70],
          [60, 66],
          [48, 66]
        ],
        0.06,
        0.02,
        { rise: 22 }
      ),
      { name: "a way into the other home", svg: way("M160 108 C146 106 128 100 115 93", BROWN), keys: showFrom(0.23, 0.27) },
      ...risingSparks(
        "life in it, rising",
        [
          [52, 70],
          [58, 64],
          [46, 64],
          [55, 58]
        ],
        0.48,
        0.02,
        { stay: true, rise: 16 }
      ),
      {
        name: "the other home, dark and still",
        svg: `<rect x="99" y="66" width="34" height="26" fill="#2A2238"/>`,
        keys: track({
          opacity: [
            [0.71, 0],
            [0.77, 0.35]
          ]
        })
      }
    ],
    words: [
      { text: "One who remembers his Lord", from: 0.02, to: 0.2 },
      { text: "And one who does not remember Him", from: 0.22, to: 0.4 },
      { text: "Are like the living", from: 0.42, to: 0.66 },
      { text: "And the dead", from: 0.68, to: 1 }
    ]
  };
}

export const EXAMPLE_ART = {
  citron,
  "forgiving-trader": forgivingTrader,
  "hungry-birds": hungryBirds,
  "two-flocks": twoFlocks,
  "bending-plant": bendingPlant,
  remember
};
