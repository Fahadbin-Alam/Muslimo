import { animalAt, cloud, flame, glow, n, palm, peaks, sky, tuft, type SignArt, type SignPart } from "./signDraw";
import { ring, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { showFrom } from "./storyArt";
import { home } from "./trialArt";
import { quickSparks, track } from "./toldArt";

/**
 * More of the wisdom the Prophet ﷺ taught with a picture, drawn as his other likenesses are (deedArt.ts): the two
 * hungry wolves among sheep, the sins that fall as a tree sheds its leaves, the camel tied before trusting Allah, the
 * branches of faith, the drop a finger brings back from the sea, the jar of gold neither man would keep, and the
 * charity that never lessens wealth. Only the land, the sky, the sea, homes, things, plants and animals are drawn. No
 * Prophet and no person is ever drawn, not even a hand or a finger: where someone went, a dashed way shows it, and a
 * voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a good deed, a mercy and
 * a rank raised are sparks rising.
 */

/** A small sun, its middle at (x, y). */
const sun = (x: number, y: number) => `${glow(x, y, 10, "#FFF0C0", 0.12)}<circle cx="${x}" cy="${y}" r="4.6" fill="#FFE07A"/>`;

/** A gold coin seen from the side, its middle at (x, y). */
const coin = (x: number, y: number, r = 1.9) =>
  `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${r}" ry="${n(r * 0.55)}" fill="#F2C94C" stroke="#B8912F" stroke-width="0.35"/>`;

/** A gold coin seen face on, its middle at (x, y). */
const faceCoin = (x: number, y: number, r = 1.8) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#F2C94C" stroke="#B8912F" stroke-width="0.4"/><circle cx="${x}" cy="${y}" r="${n(r * 0.55)}" fill="none" stroke="#D9A93A" stroke-width="0.3"/>`;

/** A heap of gold coins, its foot's middle at (x, y). */
function coinHeap(x: number, y: number) {
  const spots = [
    [-7, -0.8],
    [-3.4, -1.2],
    [0.4, -1],
    [4, -1.2],
    [7.2, -0.8],
    [-5.2, -3],
    [-1.6, -3.4],
    [2.2, -3.2],
    [5.4, -2.8],
    [-3.4, -5.2],
    [0.4, -5.6],
    [3.6, -5],
    [-1.4, -7.4],
    [2, -7.4],
    [0.4, -9.2]
  ];
  return (
    `<ellipse cx="${x}" cy="${n(y + 0.4)}" rx="10.4" ry="1.6" fill="#000000" opacity="0.14"/>` +
    `<path d="M${n(x - 9)} ${y} C${n(x - 7)} ${n(y - 9)} ${n(x + 7)} ${n(y - 9)} ${n(x + 9)} ${y} Z" fill="#D9A93A"/>` +
    spots.map(([dx, dy]) => coin(x + dx, y + dy)).join("")
  );
}

/** An oil lamp, the middle of its foot at (x, y), its spout to the right; its flame burns at (x + 8.2, y - 2.8). */
const lampBody = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${y} C${n(x - 6)} ${n(y - 3.6)} ${n(x + 6)} ${n(y - 3.6)} ${n(x + 6)} ${y} Z" fill="#B86E3E"/>` +
  `<path d="M${n(x + 4.6)} ${n(y - 2)} L${n(x + 8)} ${n(y - 3)}" stroke="#B86E3E" stroke-width="1.4" stroke-linecap="round"/>`;

/** Smoke rising from (x, y). */
const smoke = (x: number, y: number) =>
  `<path d="M${x} ${y} c-1.6 -2.4 1.6 -4 0 -6.4 c-1.6 -2.4 1.6 -4 0 -6.4" stroke="#8C8C8C" stroke-width="1" fill="none" opacity="0.8" stroke-linecap="round"/>`;

/** A leaf, its middle at (x, y), turned by `turn` degrees. */
const leaf = (x: number, y: number, turn: number, fill: string, s = 1) =>
  `<path d="M-2.4 0 Q0 -1.7 2.4 0 Q0 1.7 -2.4 0 Z" transform="translate(${x} ${y}) rotate(${turn}) scale(${s})" fill="${fill}"/>`;

/** A small flower of five petals, its middle at (x, y). */
const blossom = (x: number, y: number) =>
  [0, 72, 144, 216, 288]
    .map((turn) => `<ellipse cx="${x}" cy="${n(y - 1.3)}" rx="0.9" ry="1.3" fill="#F6B7C8" transform="rotate(${turn} ${x} ${y})"/>`)
    .join("") + `<circle cx="${x}" cy="${y}" r="0.7" fill="#F2C94C"/>`;

// Two hungry wolves. The Prophet ﷺ said: two hungry wolves let loose among sheep do no more harm to them than a
// person's greed for wealth and honor does to his religion (Jami at-Tirmidhi 2376). No one is drawn: at dusk, sheep
// graze in a pasture, two wolves come among them and scatter them; then, before a hut, a heap of gold and a crown grow,
// and the lamp by the hut burns low.
function twoWolves(): SignArt {
  const s = 0.2;
  const w = 0.26;
  const sheepAt = (x: number, y: number, left: boolean) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);
  const wolfAt = (x: number, y: number, left = false) => animalAt("wolf", n(x - 50 * w), n(y - 73.4 * w), w, left);
  const flock: { feet: [number, number]; left: boolean; run: [number, number] }[] = [
    { feet: [38, 92], left: false, run: [44, -8] },
    { feet: [56, 89], left: true, run: [40, 5] },
    { feet: [66, 99], left: false, run: [24, 8] },
    { feet: [44, 103], left: true, run: [26, 6] }
  ];
  const lamp = { x: 116, y: 98 };
  const tip = { x: lamp.x + 8.2, y: lamp.y - 2.8 };
  return {
    kind: "two-wolves",
    ms: 10000,
    parts: [
      { name: "the sky at dusk", svg: sky("#F1B88E", "#F6D3A4", 52) },
      { name: "the setting sun", svg: `${glow(34, 56, 18, "#FFE2B0", 0.14)}<circle cx="34" cy="56" r="6" fill="#FFB35C"/>` },
      { name: "clouds", svg: cloud(70, 30, 0.42, "#FBE3CF", 0.9) + cloud(124, 22, 0.36, "#FBE3CF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [18, 9, 30],
            [92, 13, 40],
            [150, 9, 30]
          ],
          61,
          "#B08E6C",
          false
        )
      },
      {
        name: "the pasture",
        svg:
          landOf([], "#C3C98E") +
          [
            [12, 72],
            [70, 74],
            [100, 70],
            [20, 110],
            [104, 112],
            [150, 108]
          ]
            .map(([x, y]) => tuft(x, y, "#7FA05A", 4))
            .join("")
      },
      { name: "a hut", svg: home(142, 94, 30, 22, "#C9A26C", "#B08A58") },
      { name: "a stone before the hut", svg: `<rect x="${lamp.x - 8}" y="${lamp.y}" width="16" height="3.6" rx="1.2" fill="#9B8B74"/>` },
      { name: "a lamp on it", svg: lampBody(lamp.x, lamp.y) },
      {
        name: "the lamp's light",
        svg: glow(tip.x, tip.y - 3, 15, "#FFE7A0", 0.1),
        keys: track({
          opacity: [
            [0.74, 1],
            [0.88, 0.12]
          ]
        })
      },
      {
        name: "the lamp's flame",
        svg: flame(tip.x, tip.y, 3.4),
        origin: tip,
        keys: track({
          scale: [
            [0.74, 1],
            [0.88, 0.35]
          ]
        }),
        loop: { move: "sway", ms: 700, angle: 5 }
      },
      { name: "smoke, as it burns low", svg: smoke(tip.x, tip.y - 2), keys: showFrom(0.84, 0.88), loop: { move: "bob", ms: 2000, y: -1.2 } },
      ...flock.map(
        (each, i): SignPart => ({
          name: `a sheep of the flock ${i + 1}`,
          svg: sheepAt(each.feet[0], each.feet[1], each.left),
          origin: { x: each.feet[0], y: each.feet[1] },
          keys: track({
            xy: [
              [0.26 + i * 0.01, 0, 0],
              [0.34 + i * 0.01, each.run[0], each.run[1]]
            ],
            ...(each.left
              ? {
                  scaleX: [
                    [0.26 + i * 0.01, 1],
                    [0.264 + i * 0.01, -1]
                  ] as [number, number][]
                }
              : {})
          }),
          loop: { move: "bob", ms: 1400 + i * 200, y: -0.4, phase: i / 4 }
        })
      ),
      {
        name: "a hungry wolf, from the left",
        svg: wolfAt(22, 101),
        origin: { x: 22, y: 101 },
        keys: track({
          xy: [
            [0.04, -60, 0],
            [0.14, 0, 0],
            [0.27, 0, 0],
            [0.36, 14, -1]
          ]
        }),
        loop: { move: "bob", ms: 900, y: -0.4 }
      },
      {
        name: "a hungry wolf, from far off",
        svg: wolfAt(48, 82, true),
        origin: { x: 48, y: 82 },
        keys: track({
          xy: [
            [0.06, 16, -14],
            [0.16, 0, 0],
            [0.27, 0, 0],
            [0.36, 10, 6]
          ],
          opacity: [
            [0.06, 0],
            [0.066, 1]
          ]
        }),
        loop: { move: "bob", ms: 1000, y: -0.4 }
      },
      {
        name: "a heap of gold, growing",
        svg: coinHeap(138, 107),
        origin: { x: 138, y: 107 },
        keys: track({
          opacity: [
            [0.5, 0],
            [0.52, 1]
          ],
          scale: [
            [0.5, 0.3],
            [0.6, 1],
            [0.74, 1],
            [0.86, 1.15]
          ]
        })
      },
      {
        name: "a crown over it",
        svg: `<g transform="translate(126 85.4) scale(0.22)">${CROWN}</g>`,
        keys: track({
          opacity: [
            [0.56, 0],
            [0.58, 1]
          ],
          xy: [
            [0.56, 0, 5],
            [0.62, 0, 0],
            [0.74, 0, 0],
            [0.86, 0, -2]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.8 }
      }
    ],
    words: [
      { text: "Two hungry wolves, let loose among sheep", from: 0.02, to: 0.22 },
      { text: "Do no more harm to them", from: 0.24, to: 0.44 },
      { text: "Than greed for wealth and honor", from: 0.46, to: 0.7 },
      { text: "Does to a person's religion", from: 0.72, to: 1 }
    ]
  };
}

/** The crown of the picture cards, drawn in its own card's box (100 wide, 80 high). */
const CROWN =
  `<path d="M30 58 L26 26 L40 40 L50 20 L60 40 L74 26 L70 58 Z" fill="#F2C94C"/>` +
  `<path d="M50 20 L60 40 L74 26 L70 58 L52 58 Z" fill="#000000" opacity="0.08"/>` +
  `<rect x="28" y="52" width="44" height="8" rx="2" fill="#D9A93A"/>` +
  `<circle cx="40" cy="56" r="2.2" fill="#3F9AD9"/><circle cx="50" cy="56" r="2.4" fill="#E2483C"/><circle cx="60" cy="56" r="2.2" fill="#3F9AD9"/>` +
  `<circle cx="26" cy="25" r="2.4" fill="#F2C94C"/><circle cx="50" cy="19" r="2.6" fill="#F2C94C"/><circle cx="74" cy="25" r="2.4" fill="#F2C94C"/>`;

// The leaves that fall. The Prophet ﷺ said: no Muslim is hurt by anything, even the prick of a thorn, but Allah wipes
// away his sins by it, as a tree sheds its leaves (Sahih al-Bukhari 5648). No one is drawn: a dashed way goes along a
// path, its sins dark marks on it, and is pricked by a thorn bush; the marks are wiped away, with sparks rising; then
// the way goes on to a tree, and its dry leaves fall.
function fallingLeaves(): SignArt {
  const tree =
    `<ellipse cx="124" cy="102" rx="21" ry="3" fill="#000000" opacity="0.14"/>` +
    `<path d="M121.6 102 L122.6 72 M122.8 86 L111 73 M122.8 80 L135 70 M122.6 76 L124 60" stroke="#7A5634" stroke-width="2.6" stroke-linecap="round" fill="none"/>` +
    `<ellipse cx="124" cy="60" rx="25" ry="15" fill="#5E9A3E"/>` +
    `<ellipse cx="109" cy="66" rx="12" ry="8.4" fill="#6CA848"/><ellipse cx="139" cy="65" rx="12" ry="8.6" fill="#558E38"/>` +
    `<ellipse cx="119" cy="53" rx="11" ry="7" fill="#78B452"/>`;
  const bush =
    `<ellipse cx="50" cy="102.4" rx="10" ry="1.8" fill="#000000" opacity="0.12"/>` +
    `<path d="M50 102 L45 89 M50 102 L50 86.4 M50 102 L57 89.6 M49 98 L40.6 93 M51 98.6 L60 95" stroke="#6E5236" stroke-width="1.1" stroke-linecap="round" fill="none"/>` +
    `<path d="M47.4 95.6 l-2.4 -1 M46 92 l-2.2 0.8 M50 93.4 l2.2 -1 M50 89.6 l-2 -1 M53.4 94.6 l2 1 M55.6 91.6 l2.2 -0.8 M44 95.2 l0.4 -2.2 M57.4 96.6 l0.4 -2.2 M48.6 99 l-2 0.4 M51.4 99.4 l2 -0.6" stroke="#5A4028" stroke-width="0.7" stroke-linecap="round"/>` +
    leaf(44.6, 88.6, -60, "#4E7A34") +
    leaf(57.4, 89, 50, "#4E7A34") +
    leaf(40.4, 92.6, -20, "#4E7A34");
  const dry: [number, number][] = [
    [106, 63],
    [116, 51],
    [130, 50],
    [143, 58],
    [112, 70],
    [136, 72],
    [124, 61],
    [147, 67],
    [100, 68],
    [128, 68]
  ];
  const marks = [10, 19, 28];
  return {
    kind: "falling-leaves",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#CFE6F2", "#E8DDBF", 60) },
      { name: "the sun", svg: sun(30, 28) },
      { name: "clouds", svg: cloud(60, 30, 0.42, "#FFFFFF", 0.9) + cloud(120, 22, 0.36, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [24, 10, 32],
            [86, 13, 38],
            [150, 9, 28]
          ],
          61,
          "#C9B38C",
          false
        )
      },
      {
        name: "the land",
        svg: landOf(
          [
            [14, 72],
            [70, 74],
            [96, 70],
            [24, 112],
            [84, 112],
            [150, 110]
          ],
          "#D9CC9E"
        )
      },
      { name: "a path", svg: `<path d="M0 104 C40 103.4 80 104 112 102.4 C132 101.4 146 101 160 101" stroke="#EADFBF" stroke-width="7" fill="none" stroke-linecap="round"/>` },
      { name: "a tree", svg: tree },
      ...dry.map(([x, y], i): SignPart => {
        const from = 0.64 + i * 0.022;
        const ground = 104 + (i % 3) * 1.6;
        const drift = (i % 2 ? 1 : -1) * (6 + (i % 4) * 2.4);
        return {
          name: `a dry leaf on the tree ${i + 1}`,
          svg: leaf(x, y, 30 + i * 20, ["#D9A441", "#C27C2C", "#B5652A"][i % 3], 1.3),
          origin: { x, y },
          keys: track({
            xy: [
              [from, 0, 0],
              [from + 0.05, n(-drift * 0.4), n((ground - y) * 0.45)],
              [from + 0.1, n(drift), n(ground - y)]
            ],
            rotate: [
              [from, 0],
              [from + 0.1, i % 2 ? 200 : -160]
            ]
          })
        };
      }),
      { name: "a thorn bush", svg: bush },
      { name: "a way, along the path", svg: way("M0 103.8 C10 103.8 20 103.6 31 103.4", BROWN), keys: showFrom(0.04, 0.14) },
      ...marks.map(
        (x, i): SignPart => ({
          name: `its sins, dark marks on the way ${i + 1}`,
          svg: `<ellipse cx="${x}" cy="103.6" rx="2.2" ry="1.2" fill="#4A4038" opacity="0.75"/>`,
          keys: track({
            opacity: [
              [0.06 + i * 0.03, 0],
              [0.066 + i * 0.03, 1],
              [0.42 + i * 0.014, 1],
              [0.432 + i * 0.014, 0]
            ]
          })
        })
      ),
      { name: "a way, coming to the thorns", svg: way("M31 103.4 C36 103.2 40 103 44.6 102.6", BROWN), keys: showFrom(0.21, 0.24) },
      {
        name: "the prick of a thorn",
        svg: sparkle(45, 99.6, 2.6, "#E2483C") + `<circle cx="45" cy="99.6" r="4.4" fill="#E2483C" opacity="0.2"/>`,
        keys: showWhile(0.24, 0.245, 0.3, 0.31)
      },
      ...quickSparks(
        "a mercy, rising",
        marks.map((x) => [x, 100] as [number, number]),
        0.42,
        0.014
      ),
      { name: "a way, going on to the tree", svg: way("M44.6 102.6 C64 104 90 103 112 101.6", BROWN), keys: showFrom(0.48, 0.56) }
    ],
    words: [
      { text: "No Muslim is hurt by anything", from: 0.02, to: 0.18 },
      { text: "Even the prick of a thorn", from: 0.2, to: 0.36 },
      { text: "But Allah wipes away his sins by it", from: 0.38, to: 0.6 },
      { text: "As a tree sheds its leaves", from: 0.62, to: 1 }
    ]
  };
}

// Tie it, and trust Allah. A man asked: O Messenger of Allah, shall I tie my camel and trust Allah, or leave it loose
// and trust Allah? He ﷺ said: tie it, and trust Allah (Jami at-Tirmidhi 2517). No one is drawn: a dashed way comes with
// a camel to a home; a voice asks, as the camel starts to wander off; a voice from the door answers; the camel is
// brought back and a rope ties it to a post; then the way goes in, and trust rises as sparks.
function tieCamel(): SignArt {
  const s = 0.3;
  const feet = { x: 56, y: 100 };
  const post =
    `<ellipse cx="80.3" cy="101" rx="3.6" ry="1" fill="#000000" opacity="0.14"/>` +
    `<rect x="79" y="86" width="2.6" height="15" rx="0.8" fill="#7A5634"/><rect x="78" y="85" width="4.6" height="1.6" rx="0.6" fill="#5E3A1E"/>`;
  return {
    kind: "tie-camel",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E9D7AF", 60) },
      { name: "the sun", svg: sun(30, 28) },
      { name: "clouds", svg: cloud(70, 32, 0.42, "#FFFFFF", 0.9) + cloud(124, 24, 0.36, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [20, 9, 30],
            [84, 13, 38],
            [148, 10, 30]
          ],
          61,
          "#C9B38C",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [12, 72],
          [60, 74],
          [92, 110],
          [20, 110],
          [140, 112]
        ])
      },
      { name: "a palm", svg: palm(148, 99, 30), loop: { move: "sway", ms: 4600, angle: 1.2 }, origin: { x: 148, y: 99 } },
      { name: "a home", svg: home(116, 97, 36, 26) },
      { name: "a post", svg: post },
      { name: "a way, with the camel", svg: way("M0 104 C14 103.6 28 103.4 42 103.2", BROWN), keys: showFrom(0.04, 0.12) },
      {
        name: "a camel",
        svg: animalAt("camel", n(feet.x - 50 * s), n(feet.y - 73.4 * s), s),
        origin: feet,
        keys: track({
          xy: [
            [0.03, -70, 0],
            [0.13, 0, 0],
            [0.27, 0, 0],
            [0.34, -10, -4],
            [0.5, -10, -4],
            [0.55, 0, 0]
          ],
          scaleX: [
            [0.27, 1],
            [0.274, -1],
            [0.5, -1],
            [0.504, 1]
          ]
        }),
        loop: { move: "bob", ms: 1800, y: -0.5 }
      },
      { name: "a voice, asking", svg: arcs(44, 90), keys: showWhile(0.22, 0.24, 0.36, 0.37) },
      { name: "a voice from the home, answering", svg: arcsLeft(95, 88), keys: showWhile(0.44, 0.46, 0.52, 0.53) },
      {
        name: "a rope, tying it to the post",
        svg: `<path d="M65 88 C70 92 75 92.4 80.3 88.4" stroke="#C9A66B" stroke-width="1" fill="none" stroke-linecap="round"/><circle cx="80.3" cy="88.4" r="1.2" fill="none" stroke="#C9A66B" stroke-width="0.9"/>`,
        keys: showFrom(0.55, 0.59)
      },
      { name: "a way, going in", svg: way("M42 103.2 C60 107 92 105 112.6 97.4", BROWN), keys: showFrom(0.66, 0.76) },
      ...risingSparks(
        "trust, rising",
        [
          [60, 76],
          [70, 72],
          [80, 78],
          [66, 68]
        ],
        0.8,
        0.02,
        { stay: true, rise: 12 }
      )
    ],
    words: [
      { text: "Anas: a man asked about a camel", from: 0.02, to: 0.18 },
      { text: "Shall I leave it loose, and trust Allah?", from: 0.2, to: 0.4 },
      { text: "Tie it, and trust Allah", from: 0.42, to: 0.62 },
      { text: "Do your part, then trust Allah", from: 0.64, to: 1 }
    ]
  };
}

// The branches of faith. The Prophet ﷺ said: faith has over seventy, or over sixty, branches; the highest of them is
// saying there is no god but Allah, the lowest is removing harm from the road, and modesty is a branch of faith (Sahih
// Muslim 35b; Sahih al-Bukhari 9). No one is drawn: a tree grows branch after branch; its highest branch shines; a way
// comes along the road, and a stone on it moves off to the side, as the lowest branch shines; then a branch blossoms.
function faithBranches(): SignArt {
  const branches: [number, number, number, number][] = [
    [80, 94.6, 56, 89],
    [80, 92.2, 104, 86.6],
    [80, 85.2, 57, 77.4],
    [80, 82.8, 103, 75],
    [80, 75.8, 61, 67],
    [80, 73.4, 99, 64.6],
    [80, 66.2, 67, 57.6],
    [80, 64.6, 93, 56.8]
  ];
  const branch = ([x0, y0, x1, y1]: [number, number, number, number]) => {
    const mx = n((x0 + x1) / 2);
    const my = n((y0 + y1) / 2 - 2);
    return (
      `<path d="M${x0} ${y0} Q${mx} ${n(y0 - 3)} ${x1} ${y1}" stroke="#7A5634" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="${mx}" cy="${my}" rx="4" ry="2.8" fill="#6CA848"/><ellipse cx="${x1}" cy="${y1}" rx="6.4" ry="4.2" fill="#5E9A3E"/>` +
      `<ellipse cx="${n(x1 - 1.6)}" cy="${n(y1 - 1.4)}" rx="3.2" ry="2" fill="#78B452"/>`
    );
  };
  const top = { x: 80, y: 46 };
  const stone =
    `<path d="M108.6 109 C108 105 110.4 102.6 114 102.6 C117.6 102.6 120 105 119.4 109 Z" fill="#8E8478"/>` +
    `<path d="M114 102.6 C117.6 102.6 120 105 119.4 109 L115.6 109 C116.4 106 115.8 104 114 102.6 Z" fill="#000000" opacity="0.14"/>`;
  return {
    kind: "faith-branches",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3EFD8", 60) },
      { name: "the sun", svg: sun(136, 24) },
      { name: "clouds", svg: cloud(30, 30, 0.42, "#FFFFFF", 0.9) + cloud(112, 40, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [22, 9, 30],
            [140, 11, 34]
          ],
          61,
          "#A9B98A",
          false
        )
      },
      {
        name: "the land",
        svg: landOf(
          [
            [14, 72],
            [40, 92],
            [120, 90],
            [150, 74]
          ],
          "#CFD9A6"
        )
      },
      {
        name: "a road",
        svg: `<rect y="101" width="160" height="10" fill="#E2D2AA"/><path d="M0 101 L160 101 M0 111 L160 111" stroke="#C8B488" stroke-width="0.7"/>`
      },
      { name: "a stone lying on the road", svg: stone, keys: track({ xy: [[0.61, 0, 0], [0.67, 15, -13]] }) },
      { name: "a way, along the road", svg: way("M160 107 C146 107 134 106.6 121 106.4", BROWN), keys: showFrom(0.55, 0.6) },
      {
        name: "the trunk of a tree",
        svg: `<ellipse cx="80" cy="100.6" rx="14" ry="1.8" fill="#000000" opacity="0.14"/><path d="M76.6 100.6 C77.6 88 78.4 70 79.2 52.6 L80.8 52.6 C81.6 70 82.4 88 83.4 100.6 Z" fill="#7A5634"/>`,
        origin: { x: 80, y: 100.6 },
        keys: track({
          scaleY: [
            [0.03, 0.15],
            [0.09, 1]
          ]
        })
      },
      ...branches.map(
        (each, i): SignPart => ({
          name: `a branch ${i + 1}`,
          svg: branch(each),
          origin: { x: each[0], y: each[1] },
          keys: track({
            scale: [
              [0.08 + i * 0.013, 0],
              [0.11 + i * 0.013, 1]
            ]
          })
        })
      ),
      {
        name: "the highest branch",
        svg: `<path d="M80 53.6 L${top.x} ${top.y + 4}" stroke="#7A5634" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="${top.x}" cy="${top.y}" rx="8.4" ry="6" fill="#5E9A3E"/><ellipse cx="${top.x - 2}" cy="${top.y - 2}" rx="4.4" ry="2.8" fill="#78B452"/>`,
        origin: { x: 80, y: 53.6 },
        keys: track({
          scale: [
            [0.19, 0],
            [0.21, 1]
          ]
        })
      },
      { name: "the highest branch, shining", svg: glow(top.x, top.y, 20, "#FFE7A0", 0.12) + `<ellipse cx="${top.x}" cy="${top.y}" rx="8.4" ry="6" fill="#F2C94C" opacity="0.55"/>`, keys: showFrom(0.3, 0.34) },
      ...risingSparks(
        "its light, rising",
        [
          [72, 42],
          [88, 40],
          [80, 36]
        ],
        0.34,
        0.02,
        { stay: true, rise: 10 }
      ),
      { name: "the lowest branch, shining", svg: glow(56, 89, 12, "#FFE7A0", 0.12) + `<ellipse cx="56" cy="89" rx="6.4" ry="4.2" fill="#F2C94C" opacity="0.45"/>`, keys: showFrom(0.66, 0.69) },
      ...quickSparks(
        "the road cleared, rising",
        [
          [114, 104],
          [122, 99]
        ],
        0.66,
        0.012
      ),
      {
        name: "blossoms of modesty on a branch",
        svg:
          blossom(100, 73) +
          blossom(105.4, 74.4) +
          blossom(102.6, 77.4) +
          blossom(98, 76.8) +
          blossom(106.6, 71.4) +
          blossom(91, 77.6),
        origin: { x: 103, y: 75 },
        keys: track({
          scale: [
            [0.8, 0],
            [0.86, 1]
          ]
        })
      },
      { name: "modesty's branch, glowing", svg: glow(102, 75, 14, "#FFD6E2", 0.12), keys: showFrom(0.84, 0.88) }
    ],
    words: [
      { text: "Faith has over seventy, or sixty, branches", from: 0.02, to: 0.24 },
      { text: "The highest: saying there is no god but Allah", from: 0.26, to: 0.5 },
      { text: "The lowest: removing harm from the road", from: 0.52, to: 0.74 },
      { text: "And modesty is a branch of faith", from: 0.76, to: 1 }
    ]
  };
}

// The sea and the drop. The Prophet ﷺ said: by Allah, this world beside the Hereafter is only like one of you dipping
// his finger in the sea; let him see what it brings back (Sahih Muslim 2858). No one is drawn, not even a finger: light
// runs across a wide sea; rings spread where something dipped in it; a single drop rises from them and hangs, so small;
// and the whole sea shines around it.
function seaDrop(): SignArt {
  const dip = { x: 80, y: 97 };
  const waves = (y: number, gap: number, color: string) => {
    let d = "";
    for (let x = -gap; x < 160 + gap; x += gap) d += `M${x} ${y} q${n(gap / 4)} -1.6 ${n(gap / 2)} 0 `;
    return `<path d="${d}" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;
  };
  return {
    kind: "sea-drop",
    ms: 10000,
    parts: [
      { name: "sky", svg: `<rect width="160" height="46" fill="#BFE3FA"/><rect y="36" width="160" height="10" fill="#D8EEFA"/>` },
      { name: "the sun", svg: sun(126, 20) },
      { name: "clouds", svg: cloud(36, 22, 0.42, "#FFFFFF", 0.9) + cloud(92, 14, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the sea, wide to the edge of sight",
        svg: `<rect y="46" width="160" height="74" fill="#3E86C1"/><rect y="46" width="160" height="7" fill="#5B9FD3"/><rect y="53" width="160" height="12" fill="#4A92CB"/><rect y="84" width="160" height="18" fill="#3A82BD"/><rect y="102" width="160" height="18" fill="#367DB8"/>`
      },
      { name: "waves", svg: waves(58, 16, "#7FB6E0") + waves(70, 20, "#6AA8D8") + waves(84, 24, "#5E9DD0") + waves(104, 28, "#5395CB"), loop: { move: "slide", ms: 9000 } },
      {
        name: "the sun on the water",
        svg: [50, 56, 63, 71].map((y, i) => sparkle(126 + (i % 2 ? 3 : -3), y, i % 2 ? 1.2 : 1.6, "#FFF6D0")).join(""),
        loop: { move: "twinkle", ms: 1600, low: 0.3 }
      },
      {
        name: "light running across the sea, to the edge of sight",
        svg: `<path d="M-14 120 L2 120 L22 46 L14 46 Z" fill="#FFF6D0" opacity="0.28"/><path d="M-2 120 L4 120 L24 46 L21 46 Z" fill="#FFFFFF" opacity="0.3"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1],
            [0.17, 1],
            [0.18, 0]
          ],
          xy: [
            [0.04, -20, 0],
            [0.18, 160, 0]
          ]
        })
      },
      {
        name: "a splash, where it dipped",
        svg: `<circle cx="${dip.x - 2.4}" cy="${dip.y - 2.4}" r="0.8" fill="#FFFFFF"/><circle cx="${dip.x + 2.2}" cy="${dip.y - 3}" r="0.7" fill="#FFFFFF"/><circle cx="${dip.x}" cy="${dip.y - 4}" r="0.6" fill="#FFFFFF"/>`,
        keys: showWhile(0.29, 0.3, 0.33, 0.35)
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a ring spreading on the water ${i + 1}`,
          svg: ring(dip.x, dip.y, 6, "#FFFFFF"),
          origin: dip,
          keys: track({
            opacity: [
              [0.29 + i * 0.025, 0],
              [0.3 + i * 0.025, 1],
              [0.39 + i * 0.025, 0]
            ],
            scale: [
              [0.29 + i * 0.025, 0.3],
              [0.39 + i * 0.025, 1.9]
            ]
          })
        })
      ),
      {
        name: "a drop it brings back",
        svg: `<path d="M${dip.x} ${dip.y - 2.4} C${dip.x + 1.4} ${dip.y - 0.6} ${dip.x + 1.4} ${dip.y + 1} ${dip.x} ${dip.y + 1} C${dip.x - 1.4} ${dip.y + 1} ${dip.x - 1.4} ${dip.y - 0.6} ${dip.x} ${dip.y - 2.4} Z" fill="#E4F4FF" stroke="#FFFFFF" stroke-width="0.4"/>`,
        origin: dip,
        keys: track({
          opacity: [
            [0.56, 0],
            [0.565, 1]
          ],
          xy: [
            [0.56, 0, 0],
            [0.64, 0, -17]
          ]
        })
      },
      {
        name: "so little, beside it all",
        svg: `<circle cx="${dip.x}" cy="${dip.y - 17.6}" r="5.6" stroke="#FFF3CF" stroke-width="0.8" stroke-dasharray="1.4 1.4" fill="none"/>`,
        keys: showFrom(0.65, 0.69),
        loop: { move: "twinkle", ms: 1300, low: 0.45 }
      },
      {
        name: "the whole sea, shining",
        svg: `<path d="M0 46.4 L160 46.4" stroke="#FFE7A0" stroke-width="1.6"/><path d="M0 48.8 L160 48.8" stroke="#FFF3CF" stroke-width="0.8" opacity="0.7"/>`,
        keys: showFrom(0.8, 0.88),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      {
        name: "glints across the sea",
        svg: [
          [14, 62],
          [40, 76],
          [64, 58],
          [104, 80],
          [140, 92],
          [24, 100],
          [120, 106],
          [150, 66]
        ]
          .map(([x, y], i) => sparkle(x, y, i % 2 ? 1.3 : 1.8, "#FFF6D0"))
          .join(""),
        keys: showFrom(0.84, 0.9),
        loop: { move: "twinkle", ms: 1500, low: 0.3 }
      }
    ],
    words: [
      { text: "This world, beside the Hereafter", from: 0.02, to: 0.24 },
      { text: "Is like a finger dipped in the sea", from: 0.26, to: 0.5 },
      { text: "Then see what it brings back", from: 0.52, to: 0.74 },
      { text: "A drop, beside the whole sea", from: 0.76, to: 1 }
    ]
  };
}

// The jar of gold. The Prophet ﷺ said: a man bought land from another man, and the buyer found in it a clay jar full
// of gold. He said to the seller: take your gold, for I bought only the land from you, not the gold. The seller said:
// I sold you the land and all that is in it. They took their case to a man, who asked: have you children? One said: I
// have a boy; the other: I have a girl. He said: marry the girl to the boy, spend some of it on them, and give charity
// (Sahih al-Bukhari 3472). No one is drawn: the price goes along a dashed way from one home to the other; a way digs
// in the land and a jar of gold rises; it is taken to the home that sold the land and comes back; ways go to a home where a
// voice speaks; the two homes are joined by a line of light; the gold goes to both homes, and the rest rises as
// sparks.
function jarOfGold(): SignArt {
  const jar = { x: 92, y: 97 };
  const jarSvg =
    `<ellipse cx="${jar.x}" cy="${n(jar.y + 0.3)}" rx="5" ry="1.1" fill="#000000" opacity="0.16"/>` +
    `<path d="M${n(jar.x - 2.4)} ${n(jar.y - 9)} C${n(jar.x - 2.4)} ${n(jar.y - 7.6)} ${n(jar.x - 5.4)} ${n(jar.y - 6.4)} ${n(jar.x - 5.4)} ${n(jar.y - 3.4)} C${n(jar.x - 5.4)} ${n(jar.y - 0.6)} ${n(jar.x - 3)} ${jar.y} ${jar.x} ${jar.y} C${n(jar.x + 3)} ${jar.y} ${n(jar.x + 5.4)} ${n(jar.y - 0.6)} ${n(jar.x + 5.4)} ${n(jar.y - 3.4)} C${n(jar.x + 5.4)} ${n(jar.y - 6.4)} ${n(jar.x + 2.4)} ${n(jar.y - 7.6)} ${n(jar.x + 2.4)} ${n(jar.y - 9)} Z" fill="#B5683A"/>` +
    `<rect x="${n(jar.x - 3)}" y="${n(jar.y - 10)}" width="6" height="1.4" rx="0.5" fill="#94532C"/>` +
    `<path d="M${n(jar.x - 4.4)} ${n(jar.y - 4.6)} L${n(jar.x + 4.4)} ${n(jar.y - 4.6)}" stroke="#E9C46A" stroke-width="0.5"/>` +
    faceCoin(jar.x - 1.2, jar.y - 10.6, 1.3) +
    faceCoin(jar.x + 1.4, jar.y - 10.9, 1.3) +
    faceCoin(jar.x, jar.y - 12, 1.3);
  const jarMoves: [number, number, number][] = [
    [0.24, 0, 5],
    [0.28, 0, 0],
    [0.36, 0, 0],
    [0.42, -58, 1],
    [0.58, -58, 1],
    [0.63, 0, 0]
  ];
  const field =
    `<path d="M50 88 L110 88 L116 103 L44 103 Z" fill="#9C7448"/>` +
    [91, 94, 97, 100].map((y) => `<path d="M${n(50 - ((y - 88) / 15) * 6)} ${y} L${n(110 + ((y - 88) / 15) * 6)} ${y}" stroke="#7E5A36" stroke-width="0.8"/>`).join("");
  const lit = (x: number) => `<rect x="${x + 2}" y="72.4" width="2.6" height="2.6" fill="#FFD66B"/>`;
  return {
    kind: "jar-of-gold",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E9D7AF", 60) },
      { name: "the sun", svg: sun(80, 22) },
      { name: "clouds", svg: cloud(36, 30, 0.42, "#FFFFFF", 0.9) + cloud(124, 26, 0.36, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [24, 9, 30],
            [80, 11, 36],
            [142, 9, 30]
          ],
          61,
          "#C9B38C",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [8, 104],
          [60, 72],
          [102, 72],
          [152, 106]
        ])
      },
      { name: "a home where they went to ask", svg: home(80, 73, 22, 14, "#E0BE8C", "#C9A26C") },
      { name: "the home that sold the land", svg: home(24, 92, 30, 22) },
      { name: "the home that bought the land", svg: home(136, 92, 30, 22) },
      { name: "the land that was sold, ploughed", svg: field },
      { name: "a way, for the price", svg: way("M131 97 C116 109 44 109 29 97", BROWN), keys: showWhile(0.03, 0.06, 0.17, 0.19) },
      {
        name: "the price, paid",
        svg: `<path d="M126.6 101 C126 98 127.4 96.6 128.6 96.2 L130.4 96.2 C131.6 96.6 133 98 132.4 101 Z" fill="#C9A66B"/>${faceCoin(129.6, 99, 1.2)}`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.044, 1],
            [0.13, 1],
            [0.134, 0]
          ],
          xy: [
            [0.04, 0, 0],
            [0.07, -28, 5.4],
            [0.1, -68, 5.4],
            [0.13, -97, -1]
          ]
        })
      },
      {
        name: "the land, sold",
        svg: `<path d="M50 88 L110 88 L116 103 L44 103 Z" stroke="#F2C94C" stroke-width="0.9" stroke-dasharray="1.6 1.6" fill="none"/>`,
        keys: showWhile(0.1, 0.13, 0.2, 0.22)
      },
      { name: "a way, digging in the land", svg: way("M131 97 C122 97.6 108 97.6 97 97.4", BROWN), keys: showWhile(0.19, 0.23, 0.66, 0.68) },
      {
        name: "the earth, dug",
        svg: `<ellipse cx="${jar.x}" cy="${n(jar.y + 0.6)}" rx="7" ry="2" fill="#5E3E22"/><path d="M${jar.x - 9} ${n(jar.y + 0.6)} q2 -2.4 4 0 M${jar.x + 5} ${n(jar.y + 0.6)} q2 -2.2 4 0" fill="#7E5A36"/>`,
        keys: showFrom(0.23, 0.25)
      },
      {
        name: "a jar of gold",
        svg: jarSvg,
        keys: track({
          opacity: [
            [0.24, 0],
            [0.244, 1]
          ],
          xy: jarMoves
        })
      },
      {
        name: "the gold, shining",
        svg: sparkle(jar.x + 3.6, jar.y - 13, 2.2, "#FFF3CF") + glow(jar.x, jar.y - 10, 8, "#FFE7A0", 0.12),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.29, 1]
          ],
          xy: jarMoves
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.4 }
      },
      { name: "a way, taking it to the home that sold it", svg: way("M97 97.4 C80 99.6 54 99.6 36 97", BROWN), keys: showWhile(0.36, 0.42, 0.66, 0.68) },
      { name: "a voice, giving the gold back", svg: arcsLeft(46, 90), keys: showWhile(0.41, 0.43, 0.48, 0.49) },
      { name: "a voice from that home, giving it back again", svg: arcs(40, 82), keys: showWhile(0.53, 0.55, 0.58, 0.59) },
      { name: "a way from the home that sold it, to ask", svg: way("M26 87 C34 80 56 74.6 75 72.6", BROWN), keys: showFrom(0.69, 0.73) },
      { name: "a way from the home that bought it, to ask", svg: way("M134 87 C126 80 104 74.6 85 72.6", BROWN), keys: showFrom(0.69, 0.73) },
      { name: "a voice from the home they went to, judging", svg: arcs(93, 64) + arcsLeft(67, 64), keys: showWhile(0.73, 0.75, 0.79, 0.8) },
      {
        name: "the two homes, joined",
        svg: `<path d="M28 67 Q80 30 132 67" stroke="#F2C94C" stroke-width="1" stroke-dasharray="1.8 1.8" fill="none"/>`,
        keys: showFrom(0.76, 0.79),
        loop: { move: "twinkle", ms: 1400, low: 0.55 }
      },
      { name: "their windows, lit", svg: lit(24) + lit(136) + glow(27, 74, 9, "#FFE7A0", 0.1) + glow(139, 74, 9, "#FFE7A0", 0.1), keys: showFrom(0.76, 0.79) },
      ...(
        [
          ["the gold, spent on the home that sold it", -62, -9],
          ["the gold, spent on the home that bought it", 42, -9]
        ] as [string, number, number][]
      ).map(
        ([name, x, y], i): SignPart => ({
          name,
          svg: faceCoin(jar.x, jar.y - 12, 1.8),
          keys: track({
            opacity: [
              [0.86 + i * 0.01, 0],
              [0.864 + i * 0.01, 1],
              [0.92 + i * 0.01, 1],
              [0.924 + i * 0.01, 0]
            ],
            xy: [
              [0.86 + i * 0.01, 0, 0],
              [0.89 + i * 0.01, n(x / 2), y - 6],
              [0.92 + i * 0.01, x, y]
            ]
          })
        })
      ),
      ...risingSparks(
        "the rest, given in charity",
        [
          [88, 82],
          [97, 80],
          [92, 76]
        ],
        0.92,
        0.015,
        { stay: true, rise: 8 }
      )
    ],
    words: [
      { text: "A man bought land from another", from: 0.02, to: 0.16 },
      { text: "And found in it a jar of gold", from: 0.18, to: 0.32 },
      { text: "Take your gold: I bought only the land", from: 0.34, to: 0.5 },
      { text: "I sold you the land, and all in it", from: 0.52, to: 0.66 },
      { text: "Their judge: marry the girl to the boy", from: 0.68, to: 0.82 },
      { text: "Spend on them, and give the rest in charity", from: 0.84, to: 1 }
    ]
  };
}

// Charity never lessens wealth. The Prophet ﷺ said: charity does not lessen wealth; Allah adds nothing to a servant
// who forgives but honor; and no one is humble for Allah but Allah raises him up (Sahih Muslim 2588). No one is drawn:
// gold goes from a chest along a dashed way to the home next door, and the chest stays full; a quarrel hangs between
// the two homes like a dark cloud, a voice forgives, and it clears, as honor shines on the home; then a voice prays low
// on a prayer mat, and the home is raised up on a hill.
function charityWealth(): SignArt {
  const lift = track({
    xy: [
      [0.8, 0, 0],
      [0.9, 0, -12]
    ]
  });
  const chest =
    `<ellipse cx="56" cy="100.4" rx="9" ry="1.4" fill="#000000" opacity="0.14"/>` +
    `<path d="M48.6 91 L49.4 85.6 L62.6 85.6 L63.4 91 Z" fill="#6E4A2C"/>` +
    `<rect x="49" y="91" width="14" height="9" rx="0.8" fill="#8A5A33"/>` +
    `<path d="M49 94.4 L63 94.4" stroke="#5E3A1E" stroke-width="0.8"/><rect x="55" y="93.2" width="2" height="2.4" fill="#E9C46A"/>` +
    coin(51.6, 90.6) +
    coin(55, 90) +
    coin(58.4, 90.4) +
    coin(61, 90.8) +
    coin(53.2, 88.8) +
    coin(56.8, 88.6) +
    coin(55, 87.2);
  return {
    kind: "charity-wealth",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E9D7AF", 60) },
      { name: "the sun", svg: sun(140, 24) },
      { name: "clouds", svg: cloud(110, 32, 0.4, "#FFFFFF", 0.9) + cloud(40, 22, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [30, 9, 32],
            [96, 12, 38],
            [152, 9, 26]
          ],
          61,
          "#C9B38C",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [80, 72],
          [110, 104],
          [150, 110],
          [92, 112]
        ])
      },
      {
        name: "a hill, rising under the home",
        svg: `<path d="M0 110 L0 95 C2 86 8 82 14 82 L64 82 C70 82 74 90 78 110 Z" fill="#DCC495"/><path d="M0 95 C2 86 8 82 14 82 L64 82 C70 82 74 90 78 110" stroke="#C9AE7E" stroke-width="0.8" fill="none"/>`,
        origin: { x: 40, y: 110 },
        keys: track({
          opacity: [
            [0.79, 0],
            [0.8, 1]
          ],
          scaleY: [
            [0.8, 0.571],
            [0.9, 1]
          ]
        })
      },
      { name: "the home next door", svg: home(130, 94, 32, 24, "#CFA66F", "#B88A58") },
      { name: "a home, with a chest of gold", svg: home(30, 94, 32, 24), keys: lift },
      { name: "a chest of gold", svg: chest, keys: lift },
      {
        name: "a way to the home next door",
        svg: way("M63 98 C80 102 108 100 127 94.6", BROWN),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.1, 1],
            [0.3, 1],
            [0.32, 0]
          ]
        })
      },
      ...[0.1, 0.14, 0.18].map(
        (from, i): SignPart => ({
          name: `gold given in charity ${i + 1}`,
          svg: faceCoin(56, 86, 1.8),
          keys: track({
            opacity: [
              [from, 0],
              [from + 0.004, 1],
              [from + 0.08, 1],
              [from + 0.084, 0]
            ],
            xy: [
              [from, 0, 0],
              [from + 0.04, 35, -6],
              [from + 0.08, 71, 6]
            ]
          })
        })
      ),
      ...quickSparks(
        "the chest, filled again",
        [
          [56, 86],
          [59.4, 86.6],
          [52.6, 86.6]
        ],
        0.11,
        0.04
      ),
      { name: "the chest, still full", svg: glow(56, 88, 10, "#FFE7A0", 0.12), keys: { ...showFrom(0.23, 0.26) } },
      {
        name: "harsh words from the home next door",
        svg: [80, 86].map((y, i) => `<path d="M${110 - i * 4} ${y} l-4 -2.4 l-4 2.4 l-4 -2.4 l-4 2.4 l-4 -2.4 l-4 2.4" stroke="#B5523B" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join(""),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.37, 1],
            [0.47, 1],
            [0.51, 0]
          ]
        }),
        loop: { move: "bob", ms: 700, x: -1 }
      },
      { name: "a voice, forgiving", svg: arcs(48, 82), keys: showWhile(0.39, 0.41, 0.47, 0.48) },
      {
        name: "honor, shining on the home",
        svg: glow(30, 78, 24, "#FFE7A0", 0.08),
        keys: {
          at: [0, 0.5, 0.54, 0.8, 0.9],
          opacity: [0, 0, 1, 1, 1],
          y: [0, 0, 0, 0, -12]
        }
      },
      ...risingSparks(
        "honor, rising",
        [
          [22, 64],
          [34, 60],
          [28, 56]
        ],
        0.51,
        0.012,
        { stay: true, rise: 10 }
      ),
      {
        name: "a prayer mat",
        svg: `<rect x="18" y="97.6" width="22" height="5.4" rx="0.8" fill="#2F7D6B"/><rect x="19.2" y="98.6" width="19.6" height="3.4" rx="0.5" fill="none" stroke="#E9C46A" stroke-width="0.5"/><path d="M36 98.6 L38.8 100.3 L36 102" stroke="#E9C46A" stroke-width="0.5" fill="none"/>`,
        keys: {
          at: [0, 0.67, 0.7, 0.8, 0.9],
          opacity: [0, 0, 1, 1, 1],
          y: [0, 0, 0, 0, -12]
        }
      },
      { name: "a voice, praying low and humbly", svg: arcs(40, 99.4), keys: showWhile(0.7, 0.72, 0.78, 0.79) },
      ...risingSparks(
        "raised up, rising",
        [
          [20, 52],
          [36, 48],
          [28, 44],
          [44, 54]
        ],
        0.9,
        0.012,
        { stay: true, rise: 10 }
      )
    ],
    words: [
      { text: "Charity does not lessen wealth", from: 0.02, to: 0.3 },
      { text: "Allah adds honor to one who forgives", from: 0.32, to: 0.64 },
      { text: "And raises up one who is humble for Him", from: 0.66, to: 1 }
    ]
  };
}

export const WISDOM_ART = {
  "two-wolves": twoWolves,
  "falling-leaves": fallingLeaves,
  "tie-camel": tieCamel,
  "faith-branches": faithBranches,
  "sea-drop": seaDrop,
  "jar-of-gold": jarOfGold,
  "charity-wealth": charityWealth
};
