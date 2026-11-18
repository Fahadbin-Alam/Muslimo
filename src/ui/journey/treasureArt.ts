import { cloud, glow, n, palm, sky, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { crooked, DARK, GREY } from "./lovedArt";
import { dish, goldHeap, roundTree } from "./worthArt";
import { cup, curl, food, ledge, muskJar, shadeOf } from "./hopeArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * Treasures and trusts, as the Prophet ﷺ taught them, drawn as the scenes of hope and warning are (hopeArt.ts): the
 * house of hollow pearl in Paradise given as glad tidings to Khadijah; the tree of Paradise whose shade a rider could
 * travel a hundred years; his Pool, a month's journey across; gold as much as Uhud that would not reach a mudd of those
 * with him; the respite given to the wrongdoer until he is seized; conveying from him even one ayah; and the poor one
 * who has not enough and does not ask. Only the land, the sky, water, buildings, things, plants and animals are drawn.
 * No Prophet, no Companion and no person is ever drawn, not even a hand or a face, and no angel: where someone went, a
 * dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is
 * drawn for Allah and nothing comes down from the sky: deeds and words are sparks rising, what He gives is a warm glow,
 * Paradise is a light far off or gardens in a soft light with no sun, and what He seizes is darkness rising from the
 * ground. No fire is drawn: the seat of the liar is a darkness.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A crooked voice from (x, y), facing left: lovedArt.ts's crooked voice, turned about. */
const crookedLeft = (x: number, y: number) => `<g transform="translate(${n(2 * x)} 0) scale(-1 1)">${crooked(x, y)}</g>`;

/** A house of hollow pearl in Paradise: a white dome with soft sheens of violet and blue, its foot's middle at (x, y). */
const pearlHouse = (x: number, y: number) =>
  `<path d="M${n(x - 8)} ${y} L${n(x - 8)} ${n(y - 6)} Q${n(x - 8)} ${n(y - 15)} ${x} ${n(y - 16)} Q${n(x + 8)} ${n(y - 15)} ${n(x + 8)} ${n(y - 6)} L${n(x + 8)} ${y} Z" fill="#FBF7F0" stroke="#E4D9C8" stroke-width="0.4"/>` +
  `<path d="M${n(x - 6)} ${n(y - 5)} Q${n(x - 5.8)} ${n(y - 12.6)} ${n(x - 0.6)} ${n(y - 13.8)}" stroke="#E5D8F2" stroke-width="1.3" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x + 6)} ${n(y - 4.4)} Q${n(x + 6.4)} ${n(y - 10.6)} ${n(x + 2.4)} ${n(y - 13.2)}" stroke="#D6EAF2" stroke-width="1.1" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="${n(x - 3.2)}" cy="${n(y - 10.4)}" rx="1.3" ry="2.4" fill="#FFFFFF" opacity="0.9"/>` +
  `<path d="M${n(x - 1.9)} ${y} L${n(x - 1.9)} ${n(y - 3.8)} Q${x} ${n(y - 5.8)} ${n(x + 1.9)} ${n(y - 3.8)} L${n(x + 1.9)} ${y} Z" fill="#EADFCB"/>`;

/** A bowl of milk, its foot's middle at (x, y). */
const milkBowl = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y - 3)} Q${n(x - 3.6)} ${n(y + 0.4)} ${x} ${n(y + 0.4)} Q${n(x + 3.6)} ${n(y + 0.4)} ${n(x + 4)} ${n(y - 3)} Z" fill="#B57E3E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 3)}" rx="4" ry="1.1" fill="#FFFFFF" stroke="#E6DDD0" stroke-width="0.3"/>`;

/** A mudd, a small measure of grain, its foot's middle at (x, y): 7 wide. */
const mudd = (x: number, y: number) =>
  `<path d="M${n(x - 3.5)} ${n(y - 4.8)} L${n(x + 3.5)} ${n(y - 4.8)} L${n(x + 2.8)} ${y} L${n(x - 2.8)} ${y} Z" fill="#A9763E"/>` +
  `<path d="M${n(x - 3.5)} ${n(y - 4.8)} Q${x} ${n(y - 7.8)} ${n(x + 3.5)} ${n(y - 4.8)} Z" fill="#E8C987"/>` +
  `<path d="M${n(x - 3.2)} ${n(y - 2.4)} L${n(x + 3.2)} ${n(y - 2.4)}" stroke="#8A5E30" stroke-width="0.45"/>`;

/** A little golden mountain, its foot's middle at (x, y): the gold as much as Uhud, on its pan. */
const goldMountain = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${y} C${n(x - 4.4)} ${n(y - 3.2)} ${n(x - 2)} ${n(y - 6.8)} ${n(x + 0.4)} ${n(y - 7)} C${n(x + 2.4)} ${n(y - 6.2)} ${n(x + 4.4)} ${n(y - 3)} ${n(x + 6)} ${y} Z" fill="#E2B33C" stroke="#B8892A" stroke-width="0.35"/>` +
  `<path d="M${n(x + 0.4)} ${n(y - 7)} C${n(x + 2.4)} ${n(y - 6.2)} ${n(x + 4.4)} ${n(y - 3)} ${n(x + 6)} ${y} L${n(x + 2)} ${y} Z" fill="#000000" opacity="0.1"/>`;

/** A big, proud house with a tower, its foot's middle at (x, y). */
const proudHouse = (x: number, y: number) =>
  home(x, y, 30, 18, "#E3BE8A", "#C8963E", "#6B4A2E") +
  `<rect x="${n(x + 6)}" y="${n(y - 30)}" width="8" height="12" fill="#DDB27A"/><rect x="${n(x + 5.2)}" y="${n(y - 31.4)}" width="9.6" height="1.6" fill="#C8963E"/>` +
  `<rect x="${n(x + 8.8)}" y="${n(y - 27.4)}" width="2.4" height="3" fill="#6B4A2E"/><rect x="${n(x - 12)}" y="${n(y - 14)}" width="3" height="3" fill="#6B4A2E"/>`;

// The house of hollow pearl. Jibril came to the Prophet ﷺ and said: O Messenger of Allah, this is Khadijah coming to
// you with a dish of food or drink. When she reaches you, convey to her salam from her Lord and from me, and give her
// glad tidings of a house in Paradise of qasab, with no noise in it and no toil (Sahih al-Bukhari 3820); qasab here is
// hollow pearl. Nothing is drawn for Allah, no angel is drawn, and no one is drawn: by his home, his place is a golden
// ring; her place comes along a dashed way, a dish of food and a cup with her; a voice from his place gives her the
// salam, and a warm glow comes on her; far off, a light of Paradise, a garden ledge, and a house of hollow pearl rises
// on it, with a golden way to it from her place; a light shows within the pearl, and it shines; last, the crooked
// voices of noise and a heavy grey sack of toil come near and are kept away, and a calm is over the house.
function houseOfPearl(): SignArt {
  const ringAt: [number, number] = [118, 102];
  const start: [number, number] = [12, 102];
  const far: [number, number] = [116, 46];
  const walk: [number, number, number][] = [
    [0.04, 0, 0],
    [0.11, 28, 0],
    [0.21, 28, 0],
    [0.27, 54, 0],
    [0.34, 54, 0],
    [0.38, 78, 0]
  ];
  const her = start[0] + 78;
  return {
    kind: "house-of-pearl",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(22, 20) },
      { name: "clouds", svg: cloud(62, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his home", svg: home(141, 103, 18, 13) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      {
        name: "her way, coming to him",
        svg: way(`M${start[0]} 105.6 L${her} 105.6`, "#A07A4A", 0.9),
        origin: { x: start[0], y: 105.6 },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1]
          ],
          scaleX: walk.map(([t, dx]): [number, number] => [t, Math.max(0.02, Math.round((dx / 78) * 1000) / 1000)])
        })
      },
      { name: "her place, coming", svg: someone(start[0], start[1], 1.6), keys: track({ xy: walk }) },
      {
        name: "a dish of food or drink with her",
        svg: food(start[0] + 6.4, 102.6) + cup(start[0] + 11.6, 102.4),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.2, 1]
          ],
          xy: walk
        })
      },
      { name: "a voice from his place, giving her salam", svg: arcsLeft(ringAt[0] - 4.4, ringAt[1] - 3.4, VOICE), keys: showWhile(0.39, 0.4, 0.51, 0.52), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the salam on her, a warm glow", svg: glow(her, start[1], 6, WARM, 0.3), keys: showFrom(0.41, 0.44), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "Paradise, a light far off", svg: glow(far[0], far[1], 14, "#FFF3C0", 0.26) + wash(far[0], far[1] + 4, 18, 6, "#FFFBEA", 0.14), keys: showFrom(0.51, 0.54), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "a garden ledge of Paradise, far off", svg: ledge(far[0], 56, 17) + roundTree(101.6, 55.4, 5, "#5FA344") + roundTree(130.4, 55.4, 5, "#5FA344"), keys: showFrom(0.52, 0.55) },
      {
        name: "a house of hollow pearl, rising there",
        svg: pearlHouse(far[0], 55.6),
        origin: { x: far[0], y: 55.6 },
        keys: track({
          opacity: [
            [0.55, 0],
            [0.56, 1]
          ],
          scale: [
            [0.55, 0.4],
            [0.59, 1]
          ]
        })
      },
      { name: "a golden way from her place to it", svg: way(`M${her + 2} 99.6 C${her + 8} 86 ${far[0] - 6} 70 ${far[0] - 2} 59`, GOLD), keys: showFrom(0.57, 0.6) },
      { name: "a light within the hollow pearl", svg: glow(far[0], 47.6, 5.4, "#FFF6D6", 0.34), keys: showFrom(0.67, 0.71), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "the pearl, shining",
        svg: sparkle(106.6, 42.4, 1.2, "#FFFFFF") + sparkle(125.4, 44, 1, "#EADCF7") + sparkle(far[0], 36.4, 1.4, SPARK),
        keys: showFrom(0.69, 0.72),
        loop: { move: "twinkle", ms: 1200, low: 0.5 }
      },
      ...[
        [crookedLeft(104, 48), -8],
        [crooked(128, 48), 8]
      ].map(
        ([svg, dx], i): SignPart => ({
          name: `noise, kept away ${i + 1}`,
          svg: svg as string,
          keys: track({
            opacity: [
              [0.83, 0],
              [0.845, 1],
              [0.865, 1],
              [0.89, 0]
            ],
            xy: [
              [0.85, 0, 0],
              [0.89, dx as number, 0]
            ]
          })
        })
      ),
      {
        name: "toil, a heavy grey sack, kept away",
        svg: sack(137, 60, 0.75, GREY),
        keys: track({
          opacity: [
            [0.89, 0],
            [0.9, 1],
            [0.92, 1],
            [0.95, 0]
          ],
          xy: [
            [0.905, 0, 0],
            [0.95, 8, 0]
          ]
        })
      },
      { name: "a calm over the house", svg: wash(far[0], 49, 16, 9, "#FFFBEA", 0.22), keys: showFrom(0.93, 0.96), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "Jibril: This is Khadijah, coming to you", from: 0.02, to: 0.15 },
      { text: "With a dish of food or drink", from: 0.17, to: 0.31 },
      { text: "Jibril: Salam to her from her Lord and me", from: 0.33, to: 0.48 },
      { text: "And glad tidings of a house in Paradise", from: 0.5, to: 0.64 },
      { text: "Made of qasab", from: 0.66, to: 0.8 },
      { text: "With no noise in it and no toil", from: 0.82, to: 1 }
    ]
  };
}

// The tree of a hundred years. The Prophet ﷺ said: in Paradise there is a tree; a rider travels in its shade for a
// hundred years and does not cross it (Sahih al-Bukhari 3251). Nothing is drawn for Allah, and no one is drawn: in the
// gardens of Paradise, in a soft light with no sun, a tree grows until its leaves reach past both sides of the picture,
// light shining through them; its shade spreads wide below it; a traveller's small dashed place comes along a dashed
// way in the shade, and a row of small moons lights one after another as it goes on and on; last, at the edge, it has
// still not crossed it: more shade is still ahead.
function treeOfAHundredYears(): SignArt {
  const leaves: [number, number, number, string][] = [
    [-6, 28, 18, "#3F8A3A"],
    [18, 20, 20, "#3F8A3A"],
    [46, 14, 22, "#3F8A3A"],
    [80, 10, 24, "#3F8A3A"],
    [114, 14, 22, "#3F8A3A"],
    [142, 20, 20, "#3F8A3A"],
    [166, 28, 18, "#3F8A3A"],
    [8, 40, 15, "#4F9A3C"],
    [36, 36, 16, "#4F9A3C"],
    [64, 32, 17, "#4F9A3C"],
    [96, 32, 17, "#4F9A3C"],
    [124, 36, 16, "#4F9A3C"],
    [152, 40, 15, "#4F9A3C"]
  ];
  const canopy =
    leaves.map(([x, y, r, fill]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join("") +
    `<ellipse cx="80" cy="50" rx="92" ry="6" fill="#2F6B2E" opacity="0.28"/>` +
    [
      [20, 30],
      [52, 24],
      [80, 18],
      [108, 24],
      [140, 30],
      [34, 46],
      [126, 46]
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#6FB24E" opacity="0.6"/>`)
      .join("");
  const trunk =
    `<path d="M73 92 Q76 84 76.6 70 L77 48 L83 48 L83.4 70 Q84 84 87 92 Z" fill="#8A5A33"/>` +
    `<path d="M77 62 Q70 56 62 52 M83 60 Q90 55 98 51 M78 74 Q74 70 70 69" stroke="#8A5A33" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    `<path d="M80.6 88 L80.6 52" stroke="#734726" stroke-width="0.6"/>`;
  const years = Array.from({ length: 10 }, (_, i): [number, number] => [44 + 6 * i, 104.4]);
  const walk: [number, number, number][] = [
    [0.33, 0, 0],
    [0.46, 34, 0],
    [0.53, 34, 0],
    [0.7, 94, 0],
    [0.77, 94, 0],
    [0.9, 140, 0]
  ];
  return {
    kind: "tree-of-a-hundred-years",
    ms: 9000,
    parts: [
      { name: "a soft light, Paradise", svg: sky("#FFF5DC", "#F7E9C8", 64) },
      { name: "light, all about", svg: glow(84, 56, 70, "#FFFFFF", 0.06), loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      {
        name: "gardens far off, in the light",
        svg: `<path d="M0 70 Q14 54 34 61 Q56 48 80 58 Q104 46 126 57 Q144 50 160 59 L160 76 L0 76 Z" fill="#D4EBB6"/>`
      },
      {
        name: "the gardens of Paradise",
        svg: `<path d="M0 76 Q80 68 160 76 L160 120 L0 120 Z" fill="#BFE09A"/><path d="M0 76 Q80 68 160 76" stroke="#A6D97E" stroke-width="1" fill="none"/>` + tuft(14, 108, "#4F9A3C", 4) + tuft(150, 109, "#4F9A3C", 4)
      },
      {
        name: "its shade, spreading wide",
        svg: shadeOf(80, 98, 96, 13),
        origin: { x: 80, y: 98 },
        keys: track({
          opacity: [
            [0.27, 0],
            [0.29, 1]
          ],
          scaleX: [
            [0.27, 0.3],
            [0.31, 1]
          ]
        })
      },
      {
        name: "a tree of Paradise, growing",
        svg: trunk + canopy,
        origin: { x: 80, y: 92 },
        keys: track({
          scale: [
            [0.04, 0.35],
            [0.16, 1]
          ]
        })
      },
      {
        name: "light through its leaves",
        svg: sparkle(30, 26, 1.3, "#FFFFFF") + sparkle(62, 16, 1.1, "#FFF3C0") + sparkle(98, 20, 1.3, "#FFFFFF") + sparkle(132, 28, 1.1, "#FFF3C0") + sparkle(80, 38, 1, "#FFFFFF"),
        keys: showFrom(0.16, 0.18),
        loop: { move: "twinkle", ms: 1800, low: 0.4 }
      },
      {
        name: "the traveller's way, in the shade",
        svg: way("M6 98 L146 98", "#8A6A3A", 0.9),
        origin: { x: 6, y: 98 },
        keys: track({
          opacity: [
            [0.32, 0],
            [0.33, 1]
          ],
          scaleX: walk.map(([t, dx]): [number, number] => [t, Math.max(0.01, Math.round((dx / 140) * 1000) / 1000)])
        })
      },
      {
        name: "a traveller's place, going on and on",
        svg: someone(6, 95, 1.8),
        keys: track({
          opacity: [
            [0.31, 0],
            [0.33, 1]
          ],
          xy: walk
        })
      },
      ...years.map(
        ([x, y], i): SignPart => ({
          name: `the years going by ${i + 1}`,
          svg: crescent(x, y, 2.2, 1.1, "#E8C45A"),
          keys: showFrom(at3(0.541 + 0.017 * i), at3(0.551 + 0.017 * i))
        })
      ),
      { name: "more shade still ahead", svg: wash(160, 97, 14, 9, "#CFE6F0", 0.3) + sparkle(154, 88, 1.1, "#FFFFFF"), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1400, low: 0.6 } }
    ],
    words: [
      { text: "In Paradise there is a tree", from: 0.02, to: 0.24 },
      { text: "A rider could travel in its shade", from: 0.26, to: 0.5 },
      { text: "For a hundred years", from: 0.52, to: 0.74 },
      { text: "And not cross it", from: 0.76, to: 1 }
    ]
  };
}

// The Pool. The Prophet ﷺ said: my Pool is a month's journey across; its water is whiter than milk, its smell is better
// than musk, and its cups are like the stars of the sky; whoever drinks from it will never be thirsty (Sahih al-Bukhari
// 6579). Nothing is drawn for Allah, and no one is drawn, and no sun or moon: on a wide plain, a wide pool; a dashed way
// shows across it, with thirty marks, a mark for each day of a month's journey; a bowl of milk by it, and its water
// turns whiter than the milk; a jar of musk, its smell rising, and a sweeter smell rising from the Pool; many cups all
// about it, which shine like stars; the small places of those who come to drink, and a cool glow on each; last, a grey
// shade of thirst is kept away from each, and a calm comes on them.
function thePool(): SignArt {
  const at: [number, number] = [80, 84];
  const rx = 70;
  const ry = 13;
  const rimY = (x: number, side: 1 | -1) => n(at[1] + side * ry * Math.sqrt(Math.max(0, 1 - ((x - at[0]) / rx) ** 2)));
  const nearCups = [24, 38, 52, 66, 80, 94, 108, 122, 136].map((x): [number, number] => [x, rimY(x, 1) + 3.4]);
  const farCups = [30, 46, 62, 80, 98, 114, 130].map((x): [number, number] => [x, rimY(x, -1) - 0.6]);
  const cups = [...farCups, ...nearCups];
  const drinkers = [44, 68, 92, 116].map((x): [number, number] => [x, rimY(x, 1) + 6.6]);
  const days = Array.from({ length: 30 }, (_, i) => 13 + (i * 134) / 29);
  const water = `<ellipse cx="${at[0]}" cy="${at[1]}" rx="${rx}" ry="${ry}"`;
  const many = Array.from({ length: 13 }, (_, i): [number, number] => [8 + 12 * i, i % 2 ? 59 : 57]);
  return {
    kind: "the-pool",
    ms: 11000,
    parts: [
      { name: "a pale sky", svg: sky("#FBF1DC", "#F4E4BF", 54) },
      { name: "a soft light over the plain", svg: glow(80, 50, 64, "#FFFFFF", 0.07) },
      { name: "a wide plain", svg: `<rect y="54" width="160" height="66" fill="#EADBB7"/><path d="M0 54 L160 54" stroke="#DCC79C" stroke-width="0.6"/>` },
      { name: "the places of very many, far off", svg: many.map(([x, y]) => someone(x, y, 1.2, GREY)).join("") },
      { name: "the Pool, wide", svg: `${water} fill="#8FCBEB" stroke="#E8D9B4" stroke-width="1.6"/>` },
      { name: "its water, whiter than milk", svg: `${water} fill="#FFFFFF"/><ellipse cx="${at[0]}" cy="${at[1] - 3}" rx="46" ry="5" fill="#EAF6FF" opacity="0.7"/>`, keys: showFrom(0.22, 0.27) },
      {
        name: "ripples on the water",
        svg: [
          [24, 80],
          [52, 76],
          [86, 82],
          [118, 77],
          [138, 86],
          [62, 90],
          [102, 91]
        ]
          .map(([x, y]) => `<path d="M${x} ${y} q2.5 -1.2 5 0 q2.5 1.2 5 0" stroke="#D2ECFA" stroke-width="0.6" fill="none"/>`)
          .join(""),
        loop: { move: "bob", ms: 2600, x: 1.6 }
      },
      { name: "a way across it, a month's journey", svg: way(`M13 ${at[1] + 1} L147 ${at[1] + 1}`, GOLD, 1), keys: showFrom(0.03, 0.05) },
      ...[0, 1, 2].map(
        (k): SignPart => ({
          name: `ten days of the journey ${k + 1}`,
          svg: days
            .slice(k * 10, k * 10 + 10)
            .map((x) => `<circle cx="${n(x)}" cy="${at[1] + 1}" r="1.1" fill="#9A6B1E"/>`)
            .join(""),
          keys: showFrom(at3(0.05 + 0.02 * k), at3(0.06 + 0.02 * k))
        })
      ),
      { name: "a bowl of milk by it", svg: milkBowl(10, 104), keys: showFrom(0.19, 0.21) },
      { name: "a jar of musk by it", svg: muskJar(150, 105), keys: showFrom(0.35, 0.37) },
      { name: "the musk's smell, rising", svg: curl(150, 95.6, "#D99AC8", 5), keys: showFrom(0.37, 0.39), loop: { move: "bob", ms: 2400, y: -1 } },
      {
        name: "a sweeter smell, rising from the Pool",
        svg: [
          [42, 77],
          [66, 73],
          [94, 73],
          [118, 77]
        ]
          .map(([x, y]) => curl(x, y, "#E59AD0", 8))
          .join(""),
        keys: showFrom(0.4, 0.44),
        loop: { move: "bob", ms: 2600, y: -1.4 }
      },
      { name: "its cups, all about it", svg: cups.map(([x, y]) => cup(x, y)).join(""), keys: showFrom(0.51, 0.54) },
      { name: "its cups, shining like stars", svg: cups.map(([x, y], i) => sparkle(x, y - 5.4, i % 2 ? 1 : 1.3, i % 3 ? "#FFFFFF" : SPARK)).join(""), keys: showFrom(0.55, 0.59), loop: { move: "twinkle", ms: 1400, low: 0.4 } },
      ...drinkers.map(
        ([x, y], i): SignPart => ({
          name: `a place, come to drink ${i + 1}`,
          svg: someone(x, y, 1.7),
          keys: track({
            opacity: [
              [0.68, 0],
              [0.69, 1]
            ],
            xy: [
              [0.68, 0, 9],
              [0.74, 0, 0]
            ]
          })
        })
      ),
      { name: "a cool drink, a glow on each", svg: drinkers.map(([x, y]) => glow(x, y, 4.6, "#BFE6FF", 0.36)).join(""), keys: showFrom(0.74, 0.77) },
      {
        name: "thirst, a grey shade, kept away",
        svg: drinkers.map(([x, y]) => wash(x, y + 1, 5, 3.4, GREY, 0.3)).join(""),
        keys: track({
          opacity: [
            [0.83, 0],
            [0.845, 1],
            [0.86, 1],
            [0.9, 0]
          ],
          xy: [
            [0.86, 0, 0],
            [0.9, 0, 6]
          ]
        })
      },
      { name: "never thirsty, a calm on each", svg: drinkers.map(([x, y]) => glow(x, y, 6, WARM, 0.26)).join(""), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "My Pool is a month's journey across", from: 0.02, to: 0.16 },
      { text: "Its water is whiter than milk", from: 0.18, to: 0.32 },
      { text: "Its smell is better than musk", from: 0.34, to: 0.48 },
      { text: "Its cups are like the stars of the sky", from: 0.5, to: 0.65 },
      { text: "Whoever drinks from it", from: 0.67, to: 0.81 },
      { text: "Will never be thirsty again", from: 0.83, to: 1 }
    ]
  };
}

// Gold as much as Uhud. The Prophet ﷺ said: do not abuse my companions, for if one of you spent gold as much as Uhud,
// it would not reach a mudd of one of them, nor even half of it (Sahih al-Bukhari 3673). Nothing is drawn for Allah, and
// no one is drawn: by Mount Uhud, his place is a golden ring, the places of those with him about it; crooked voices
// come at them from two other places, a voice from his place answers, the crooked voices fade, and a calm comes on
// those with him; one of the other places shows, a way going from it to the mountain, and the mountain turns all to
// gold; then a balance: a little golden mountain on one pan, a mudd from those with him on the other, and the mudd's
// pan goes down; last, the mudd is only half as much, its pan stays down, a warm glow comes on those with him, and
// sparks rise from the mudd.
function goldLikeUhud(): SignArt {
  const ringAt: [number, number] = [134, 104];
  const withHim: [number, number][] = [
    [122, 100],
    [146, 100],
    [128, 93],
    [140, 93]
  ];
  const others: [number, number][] = [
    [80, 104],
    [94, 106]
  ];
  const pivot: [number, number] = [88, 69];
  const half = 20;
  const panY = pivot[1] + 11;
  const uhud =
    `<path d="M0 92 L0 70 C8 62 16 52 26 46 C32 43 36 44 42 50 C50 58 58 72 70 92 Z" fill="#B5715A"/>` +
    `<path d="M26 46 C32 43 36 44 42 50 C50 58 58 72 70 92 L42 92 C38 76 32 60 26 46 Z" fill="#000000" opacity="0.12"/>` +
    `<path d="M10 72 C14 70 18 72 22 70 M34 60 C38 61 40 60 44 62 M20 84 C26 82 30 84 36 82" stroke="#9A5C48" stroke-width="0.8" fill="none"/>`;
  const goldUhud =
    `<path d="M0 92 L0 70 C8 62 16 52 26 46 C32 43 36 44 42 50 C50 58 58 72 70 92 Z" fill="#E2B33C"/>` +
    `<path d="M26 46 C32 43 36 44 42 50 C50 58 58 72 70 92 L42 92 C38 76 32 60 26 46 Z" fill="#9A6B1E" opacity="0.22"/>` +
    `<path d="M10 72 C14 70 18 72 22 70 M34 60 C38 61 40 60 44 62 M20 84 C26 82 30 84 36 82" stroke="#F6D873" stroke-width="0.8" fill="none"/>`;
  const strings = (x: number) => `<path d="M${x} ${pivot[1]} L${n(x - 4.8)} ${panY} M${x} ${pivot[1]} L${n(x + 4.8)} ${panY}" stroke="#8A6A3A" stroke-width="0.4"/>`;
  const pan = (x: number) => `<path d="M${n(x - 6.6)} ${panY} Q${x} ${panY + 4} ${n(x + 6.6)} ${panY} Z" fill="#C9A15A"/>`;
  const tip = 12;
  const dy = n(half * Math.sin((tip * Math.PI) / 180));
  const dx = n(half * (1 - Math.cos((tip * Math.PI) / 180)));
  const tipping = (side: 1 | -1): SignKeys =>
    track({
      opacity: [
        [0.53, 0],
        [0.55, 1]
      ],
      xy: [
        [0.6, 0, 0],
        [0.66, -side * dx, side * dy]
      ]
    });
  return {
    kind: "gold-like-uhud",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#CFE3F0", "#E9D7AF", 80) },
      { name: "the sun", svg: sun(144, 18) },
      { name: "clouds", svg: cloud(96, 26, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "Mount Uhud", svg: uhud },
      { name: "the land", svg: `<rect y="90" width="160" height="30" fill="#E2CB9C"/><path d="M0 90 L160 90" stroke="#CDB283" stroke-width="0.7"/>` + tuft(110, 112, "#A99A5A", 3.4) + tuft(58, 114, "#A99A5A", 3.4) },
      { name: "a palm of Madinah", svg: palm(154, 96, 20), origin: { x: 154, y: 96 }, loop: { move: "sway", ms: 5200, angle: 1 } },
      { name: "Uhud, all of gold", svg: goldUhud, keys: showFrom(0.36, 0.42) },
      {
        name: "the gold, sparkling",
        svg: sparkle(24, 54, 1.4, "#FFFFFF") + sparkle(40, 62, 1.2, "#FFF3C0") + sparkle(14, 76, 1.2, "#FFFFFF") + sparkle(52, 80, 1.3, "#FFF3C0") + sparkle(32, 84, 1, "#FFFFFF"),
        keys: showFrom(0.4, 0.44),
        loop: { move: "twinkle", ms: 1200, low: 0.4 }
      },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "the places of those with him", svg: withHim.map(([x, y]) => someone(x, y, 1.6)).join("") },
      { name: "two other places", svg: others.map(([x, y]) => someone(x, y, 1.6, GREY)).join("") },
      ...others.map(
        ([x, y], i): SignPart => ({
          name: `a crooked voice at those with him ${i + 1}`,
          svg: crooked(x + 3, y - 3.4),
          keys: showWhile(at3(0.03 + 0.01 * i), at3(0.045 + 0.01 * i), 0.08, 0.1),
          loop: { move: "twinkle", ms: 800, low: 0.4 }
        })
      ),
      { name: "a voice from his place: do not", svg: arcsLeft(ringAt[0] - 8.4, ringAt[1] + 0.4, VOICE), keys: showWhile(0.06, 0.07, 0.2, 0.21), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a calm on those with him", svg: withHim.map(([x, y]) => glow(x, y, 4.6, WARM, 0.22)).join(""), keys: showFrom(0.1, 0.13), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "the place of one of you", svg: ring(others[0][0], others[0][1], 3.4, WARM) + glow(others[0][0], others[0][1], 4.4, WARM, 0.2), keys: showFrom(0.21, 0.24) },
      { name: "a way from it to the mountain, spending", svg: way(`M${others[0][0] - 3} ${others[0][1] - 2} C70 98 60 90 52 84`, GOLD), keys: showFrom(0.25, 0.29) },
      { name: "a balance, its post", svg: `<path d="M${pivot[0]} ${pivot[1]} L${pivot[0]} 97 M${pivot[0] - 5} 97 L${pivot[0] + 5} 97" stroke="#8A6A3A" stroke-width="1.1" stroke-linecap="round"/>`, keys: showFrom(0.53, 0.55) },
      {
        name: "the balance's bar, tipping to the mudd",
        svg: `<path d="M${pivot[0] - half} ${pivot[1]} L${pivot[0] + half} ${pivot[1]}" stroke="#8A6A3A" stroke-width="1.2" stroke-linecap="round"/><circle cx="${pivot[0]}" cy="${pivot[1]}" r="1.1" fill="#8A6A3A"/>`,
        origin: { x: pivot[0], y: pivot[1] },
        keys: track({
          opacity: [
            [0.53, 0],
            [0.55, 1]
          ],
          rotate: [
            [0.6, 0],
            [0.66, tip]
          ]
        })
      },
      { name: "the pan of the gold", svg: strings(pivot[0] - half) + pan(pivot[0] - half), keys: tipping(-1) },
      { name: "the pan of the mudd", svg: strings(pivot[0] + half) + pan(pivot[0] + half), keys: tipping(1) },
      {
        name: "gold as much as Uhud, on its pan",
        svg: goldMountain(pivot[0] - half, panY),
        keys: track({
          opacity: [
            [0.55, 0],
            [0.57, 1]
          ],
          xy: [
            [0.6, 0, 0],
            [0.66, dx, -dy]
          ]
        })
      },
      { name: "a way from those with him to the mudd", svg: way(`M${withHim[0][0] - 3} ${withHim[0][1] - 1} C118 92 116 86 ${pivot[0] + half + 6} ${panY + 1}`, GOLD), keys: showWhile(0.56, 0.58, 0.66, 0.68) },
      {
        name: "a mudd of theirs, on its pan",
        svg: mudd(pivot[0] + half, panY),
        origin: { x: pivot[0] + half, y: panY },
        keys: track({
          opacity: [
            [0.57, 0],
            [0.59, 1]
          ],
          xy: [
            [0.6, 0, 0],
            [0.66, -dx, dy]
          ],
          scale: [
            [0.77, 1],
            [0.81, 0.62]
          ]
        })
      },
      { name: "a warm glow on those with him", svg: withHim.map(([x, y]) => glow(x, y, 6, WARM, 0.26)).join(""), keys: showFrom(0.83, 0.87), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "sparks rising from the mudd",
        svg: sparkle(pivot[0] + half - 2.4, panY - 8, 1.4, SPARK) + sparkle(pivot[0] + half + 2.8, panY - 10, 1.1, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.86, 0],
            [0.87, 1]
          ],
          xy: [
            [0.87, -dx, dy],
            [0.92, -dx, n(dy - 10)]
          ]
        }),
        loop: { move: "twinkle", ms: 1000, low: 0.5 }
      }
    ],
    words: [
      { text: "Do not abuse my companions", from: 0.02, to: 0.17 },
      { text: "If one of you spent", from: 0.19, to: 0.33 },
      { text: "Gold as much as Uhud", from: 0.35, to: 0.5 },
      { text: "It would not reach a mudd of theirs", from: 0.52, to: 0.73 },
      { text: "Nor even half of it", from: 0.75, to: 1 }
    ]
  };
}

// Respite, then seized. The Prophet ﷺ said: Allah gives respite to the wrongdoer, until, when He seizes him, He does not
// let him go. Then he recited: such is the seizure of your Lord when He seizes the towns while they do wrong; His
// seizure is painful and severe (Quran 11:102; Sahih al-Bukhari 4686). Nothing is drawn for Allah, and no one is drawn,
// and nothing comes down from the sky: a big, proud house, the wrongdoer's place by it; crooked grey ways go from it to
// the small homes, and grey shades come on them; his heap grows, and the moons of the months light one after another;
// then cracks open in the ground about his house, a darkness rises from the ground, his house grows dark and his heap
// is gone; last, his ways out break off, a dark ring holds his place, the crooked ways are gone, and a calm comes on
// the small homes.
function respiteThenSeized(): SignArt {
  const small: [number, number, number, number][] = [
    [18, 104, 14, 10],
    [42, 107, 12, 9],
    [118, 107, 12, 9],
    [142, 104, 14, 10]
  ];
  const proud: [number, number] = [80, 101];
  const his: [number, number] = [92, 106];
  const months = Array.from({ length: 8 }, (_, i): [number, number] => [24 + 16 * i, 24]);
  const wrongs = [
    "M66 98 l-4 -2 l-4 2 l-4 -2 l-4 2 l-4 -2 l-4 2 l-4 -2 l-4 2 l-4 -2 l-4 2",
    "M68 103 l-3 2 l-3 -2 l-3 2 l-3 -2 l-3 2 l-3 -2 l-3 2",
    "M96 103 l3 2 l3 -2 l3 2 l3 -2 l3 2 l3 -2",
    "M96 97 l4 -2 l4 2 l4 -2 l4 2 l4 -2 l4 2 l4 -2 l4 2 l4 -2 l4 2"
  ];
  return {
    kind: "respite-then-seized",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#D2E4EF", "#E9D7AF", 61) },
      { name: "clouds", svg: cloud(70, 40, 0.3, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...months.map(
        ([x, y], i): SignPart => ({
          name: `the months of respite, going by ${i + 1}`,
          svg: crescent(x, y, 3, 1.4, "#E8C45A"),
          keys: showFrom(at3(0.06 + 0.04 * i), at3(0.072 + 0.04 * i))
        })
      ),
      { name: "the small homes", svg: small.map(([x, y, w, h]) => home(x, y, w, h)).join("") },
      { name: "a big, proud house", svg: proudHouse(proud[0], proud[1]) },
      { name: "the wrongdoer's place", svg: someone(his[0], his[1], 1.7, GREY) },
      { name: "crooked ways of wrong, to the small homes", svg: wrongs.map((d) => `<path d="${d}" stroke="${GREY}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`).join(""), keys: showWhile(0.05, 0.09, 0.74, 0.78) },
      { name: "grey shades on the small homes", svg: small.map(([x, y]) => wash(x, y - 5, 10, 7, GREY, 0.22)).join(""), keys: showWhile(0.1, 0.14, 0.84, 0.88) },
      {
        name: "his heap, growing",
        svg: goldHeap(106, 108, 1),
        origin: { x: 106, y: 108 },
        keys: track({
          opacity: [
            [0.13, 0],
            [0.14, 1],
            [0.56, 1],
            [0.6, 0]
          ],
          scale: [
            [0.14, 0.4],
            [0.3, 1]
          ]
        })
      },
      {
        name: "cracks in the ground about his house",
        svg: `<path d="M58 110 l3 -3 l-1 -3 l3 -3 M102 110 l-2 -3 l2 -3 l-2 -3 M70 112 l2 -2 l-1 -2 M90 112 l-2 -2 l1 -2 M50 104 l3 -1 l2 -2 M110 104 l-3 -1 l-2 -2" stroke="${DARK}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`,
        keys: showFrom(0.46, 0.49)
      },
      {
        name: "a darkness, rising from the ground",
        svg: wash(proud[0], 100, 34, 16, "#2C2420", 0.16),
        keys: track({
          opacity: [
            [0.49, 0],
            [0.52, 1]
          ],
          xy: [
            [0.49, 0, 8],
            [0.58, 0, 0]
          ]
        })
      },
      { name: "his house, gone dark", svg: `<rect x="${proud[0] - 15.8}" y="${proud[1] - 19.4}" width="31.6" height="19.4" fill="${DARK}" opacity="0.45"/><rect x="${proud[0] + 5.2}" y="${proud[1] - 31.4}" width="9.6" height="12" fill="${DARK}" opacity="0.45"/>`, keys: showFrom(0.55, 0.6) },
      {
        name: "his ways out, broken off",
        svg: way(`M${his[0] + 2} ${his[1]} L${his[0] + 12} ${his[1] + 1}`, GREY, 0.9) + way(`M${his[0] - 2} ${his[1] + 1.6} L${his[0] - 10} ${his[1] + 4}`, GREY, 0.9),
        keys: showWhile(0.73, 0.75, 0.77, 0.8)
      },
      { name: "a dark ring, holding his place", svg: ring(his[0], his[1], 5, DARK) + ring(his[0], his[1], 3.6, DARK), keys: showFrom(0.78, 0.82) },
      { name: "a calm on the small homes", svg: small.map(([x, y]) => glow(x, y - 5, 8, WARM, 0.2)).join(""), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "Allah gives respite to the wrongdoer", from: 0.02, to: 0.42 },
      { text: "Until, when He seizes him", from: 0.44, to: 0.7 },
      { text: "He does not let him go", from: 0.72, to: 1 }
    ]
  };
}

// Convey from me, even one ayah. The Prophet ﷺ said: convey from me, even if it is one ayah; tell of the Children of
// Israel, and there is no harm; and whoever lies about me on purpose, let him take his seat in the Fire (Sahih
// al-Bukhari 3461). Nothing is drawn for Allah, and no one is drawn, and no fire: by his masjid, his place is a golden
// ring; a small light goes from it along a dashed way to the first of five places, and on from each to the next, one
// light reaching them all, and each is lit; a voice from one of them tells, at ease, and a calm comes on it; then
// another place, far off, grey, with a crooked voice; last, a dark seat shows beneath it, and it sinks into the dark.
function conveyOneAyah(): SignArt {
  const ringAt: [number, number] = [30, 103];
  const places: [number, number][] = [
    [52, 100],
    [74, 104],
    [96, 99],
    [118, 104],
    [140, 100]
  ];
  const liar: [number, number] = [130, 84];
  const hops: [number, number, number][] = [[0.06, 0, 0]];
  const reach = [0.1, 0.2, 0.23, 0.26, 0.29];
  places.forEach(([x, y], i) => {
    if (i) hops.push([at3(reach[i] - 0.02), places[i - 1][0] - ringAt[0] - 4, places[i - 1][1] - 5 - (ringAt[1] - 4)]);
    hops.push([reach[i], x - ringAt[0] - 4, y - 5 - (ringAt[1] - 4)]);
  });
  const ways = [`M${ringAt[0] + 3.6} ${ringAt[1] - 1} Q42 98 ${places[0][0] - 2.4} ${places[0][1]}`, ...places.slice(1).map(([x, y], i) => `M${places[i][0] + 2.4} ${places[i][1]} Q${n((places[i][0] + x) / 2)} ${n(Math.min(places[i][1], y) - 5)} ${x - 2.4} ${y}`)];
  return {
    kind: "convey-one-ayah",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(136, 18) },
      { name: "clouds", svg: cloud(60, 24, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his masjid", svg: madinahMasjid(2, 96, 0.5) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "five places across the land", svg: places.map(([x, y]) => someone(x, y, 1.6)).join("") },
      ...ways.map(
        (d, i): SignPart => ({
          name: `a way of what is conveyed ${i + 1}`,
          svg: way(d, GOLD, 0.9),
          keys: showFrom(at3(i ? reach[i] - 0.03 : 0.03), at3(i ? reach[i] - 0.02 : 0.05))
        })
      ),
      {
        name: "one small light, conveyed on and on",
        svg: sparkle(ringAt[0] + 4, ringAt[1] - 4, 1.5, SPARK),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.06, 1]
          ],
          xy: hops
        }),
        loop: { move: "twinkle", ms: 900, low: 0.6 }
      },
      ...places.map(
        ([x, y], i): SignPart => ({
          name: `a light on the place it reached ${i + 1}`,
          svg: glow(x, y, 4.4, WARM, 0.32),
          keys: showFrom(reach[i], at3(reach[i] + 0.01)),
          loop: { move: "twinkle", ms: 1400, low: 0.7, phase: i / 5 }
        })
      ),
      { name: "a voice from one of them, telling at ease", svg: arcs(places[2][0] + 3.4, places[2][1] - 3.6, VOICE), keys: showWhile(0.39, 0.41, 0.57, 0.58), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "no harm, a calm on it", svg: wash(places[2][0], places[2][1], 9, 5, "#FFF6D0", 0.2), keys: showFrom(0.42, 0.46) },
      { name: "another place, far off", svg: someone(liar[0], liar[1], 1.7, GREY), keys: track({ opacity: [[0.57, 0], [0.59, 1]], xy: [[0.84, 0, 0], [0.88, 0, 2.6]] }) },
      { name: "a crooked voice from it, lying", svg: crookedLeft(liar[0] - 3, liar[1] - 3), keys: showWhile(0.6, 0.62, 0.84, 0.87), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      {
        name: "a dark seat beneath it",
        svg: `<ellipse cx="${liar[0]}" cy="${liar[1] + 3}" rx="6" ry="2.2" fill="${DARK}" opacity="0.8"/>` + wash(liar[0], liar[1] + 3, 9, 4, "#2C2420", 0.14),
        keys: showFrom(0.79, 0.83)
      },
      { name: "the dark, spreading under it", svg: wash(liar[0], liar[1] + 2, 14, 7, "#2C2420", 0.16), keys: showFrom(0.86, 0.9) }
    ],
    words: [
      { text: "Convey from me", from: 0.02, to: 0.15 },
      { text: "Even if it is one ayah", from: 0.17, to: 0.35 },
      { text: "Tell of the Children of Israel, no harm", from: 0.37, to: 0.54 },
      { text: "Whoever lies about me on purpose", from: 0.56, to: 0.75 },
      { text: "Let him take his seat in the Fire", from: 0.77, to: 1 }
    ]
  };
}

// The hidden poor. The Prophet ﷺ said: the poor one is not he who goes round to the people, turned away with a bite or
// two, a date or two; but the poor one is he who does not have enough for his needs, and no one notices him so as to
// give him charity, and he does not stand up and ask people (Sahih al-Bukhari 1479). Nothing is drawn for Allah, and
// no one is drawn: along a row of homes, a place goes round from door to door with its dish, and at the doors a bite
// and a date or two come into it; a quiet home stands apart, its door shut, and within it a dim place by an empty grey
// dish; other places pass along by it and never turn; last, it stays where it is, and a soft light of patience is on
// it.
function theHiddenPoor(): SignArt {
  const homes: [number, number][] = [
    [16, 101],
    [44, 102],
    [72, 101]
  ];
  const quiet: [number, number] = [132, 103];
  const within: [number, number] = [137, 92.6];
  const round: [number, number, number][] = [
    [0.04, 0, 0],
    [0.08, 12, 0],
    [0.1, 12, 0],
    [0.14, 40, 0],
    [0.24, 40, 0],
    [0.28, 68, 0]
  ];
  const passers: [number, number][] = [
    [166, 108],
    [178, 107.4]
  ];
  return {
    kind: "the-hidden-poor",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "clouds", svg: cloud(84, 26, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a row of homes", svg: homes.map(([x, y]) => home(x, y, 16, 12)).join("") },
      {
        name: "a quiet home, its door shut",
        svg:
          home(quiet[0], quiet[1], 26, 18, "#CFA36C", "#B88A58", "#6B4A2E") +
          `<rect x="${quiet[0] + 0.6}" y="${quiet[1] - 15.4}" width="12.8" height="9" fill="#6B4A2E"/><rect x="${quiet[0] + 1.4}" y="${quiet[1] - 14.6}" width="11.2" height="7.4" fill="#E2CDA6"/>` +
          `<path d="M${quiet[0] - 3.6} ${quiet[1]} L${quiet[0] - 3.6} ${quiet[1] - 5.4} Q${quiet[0] - 1.8} ${quiet[1] - 7.6} ${quiet[0]} ${quiet[1] - 5.4} L${quiet[0]} ${quiet[1]} Z" fill="#8A6040"/><path d="M${quiet[0] - 1.8} ${quiet[1]} L${quiet[0] - 1.8} ${quiet[1] - 6.4}" stroke="#6B4A2E" stroke-width="0.4"/>`
      },
      { name: "a place going round, door to door", svg: someone(4, 107, 1.6), keys: track({ xy: round }) },
      { name: "its dish, going round with it", svg: dish(9.6, 107.4), keys: track({ xy: round }) },
      ...[
        [0.21, `<ellipse cx="9.2" cy="105.8" rx="1.3" ry="0.8" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.25"/>`],
        [0.225, `<ellipse cx="11" cy="105.9" rx="0.8" ry="0.6" fill="#7A2E14"/>`],
        [0.3, `<ellipse cx="8.4" cy="105.2" rx="1.1" ry="0.7" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.25"/>`],
        [0.315, `<ellipse cx="10.4" cy="105" rx="0.8" ry="0.6" fill="#93391B"/>`]
      ].map(
        ([from, svg], i): SignPart => ({
          name: i % 2 ? `a date or two, given ${i < 2 ? 1 : 2}` : `a bite or two, given ${i < 2 ? 1 : 2}`,
          svg: svg as string,
          keys: track({
            opacity: [
              [from as number, 0],
              [at3((from as number) + 0.01), 1]
            ],
            xy: round
          })
        })
      ),
      { name: "a dim place within", svg: someone(within[0] - 1.4, within[1], 1.6, GREY), keys: showFrom(0.41, 0.44) },
      { name: "an empty grey dish within", svg: `<path d="M${within[0] + 1.6} 94 Q${within[0] + 3.4} 95.6 ${within[0] + 5.2} 94 Z" fill="#9A9088"/><path d="M${within[0] + 1.6} 94 L${within[0] + 5.2} 94" stroke="#7D746C" stroke-width="0.35"/>`, keys: showFrom(0.44, 0.47) },
      ...passers.map(
        ([x, y], i): SignPart => ({
          name: `another place, passing by without turning ${i + 1}`,
          svg: someone(x, y, 1.6),
          keys: track({
            opacity: [
              [0.59, 0],
              [0.6, 1],
              [0.81, 1],
              [0.83, 0]
            ],
            xy: [
              [0.6, 0, 0],
              [0.74, -70, 0]
            ]
          })
        })
      ),
      { name: "a soft light of patience on it", svg: glow(within[0] - 1.4, within[1], 4, WARM, 0.4), keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "a calm about the quiet home", svg: wash(quiet[0], quiet[1] - 9, 18, 12, "#FFF6D0", 0.14), keys: showFrom(0.88, 0.93) }
    ],
    words: [
      { text: "The poor is not the one who goes around", from: 0.02, to: 0.18 },
      { text: "For a bite or two, a date or two", from: 0.2, to: 0.38 },
      { text: "But the one who does not have enough", from: 0.4, to: 0.56 },
      { text: "Whom no one notices, to give charity", from: 0.58, to: 0.78 },
      { text: "And who does not stand up to ask people", from: 0.8, to: 1 }
    ]
  };
}

export const TREASURE_ART = {
  "house-of-pearl": houseOfPearl,
  "tree-of-a-hundred-years": treeOfAHundredYears,
  "the-pool": thePool,
  "gold-like-uhud": goldLikeUhud,
  "respite-then-seized": respiteThenSeized,
  "convey-one-ayah": conveyOneAyah,
  "the-hidden-poor": theHiddenPoor
};
