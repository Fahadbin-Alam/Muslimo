import { animalAt, cloud, flower, n, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { ring } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM } from "./worshipArt";
import { camel, care, DAWN, lightIn, palms, tent, track } from "./daysArt";
import { soft, spark, speaking } from "./fastArt";
import { restingCamel, road, saddled, showAt, SOFT_GOLD } from "./roadArt";
import { EIGHT, glints, linesOn, plainLand, SEVEN, SIX, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { rooster } from "./herdArt";
import { aDay, voice } from "./stepsArt";
import { farHills, FIVE } from "./wideArt";
import { NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";
import { loaded } from "./historyArt";

/**
 * From his ﷺ teaching in Sunan Abi Dawud: the rooster that wakes people for prayer; the thin camel, and fearing Allah
 * about animals that cannot speak; the mother bird whose young were taken; the four creatures not to be killed; travel
 * by night; standing to the side of a door, for doors had no curtains; and the parents left weeping, to be made to
 * laugh. Only the land, the sky, homes, things, plants and animals are drawn. No Prophet, no Companion and no person is
 * ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle
 * shows it, where someone went, the circle goes, and a voice is arcs in the air. No one is drawn on an animal. Nothing
 * is drawn for Allah, and nothing comes down from the sky: a prayer is a spark that rises, and care is a soft golden
 * ring. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** Abdullah ibn Mas'ud's place and voice: a slate blue. */
const IBN_MASUD = "#5E6E9A";
/** The places of those with him on the journey: a soft brown. */
const WITH_HIM = "#8A6E52";
/** Sahl ibn al-Hanzaliyyah's place and voice: a dusty rose. */
const SAHL = "#9A5E6A";
/** Zayd ibn Khalid's place and voice: an olive green. */
const ZAYD = "#6E7E4A";

/** A fence of five posts and two rails, from x 58 to 102, its posts' feet at y 103. */
const fence =
  [60, 70, 80, 90, 100].map((x) => `<rect x="${n(x - 0.8)}" y="88.6" width="1.6" height="14.4" fill="#8E6A42"/>`).join("") +
  `<path d="M58 90.8 L102 90.8 M58 96.8 L102 96.8" stroke="#A07A4E" stroke-width="1.2"/>`;

// Do not curse the rooster. Zayd ibn Khalid said: the Prophet ﷺ said: do not curse the cock, for it awakens for prayer
// (Sunan Abi Dawud 5101). The lines say "rooster" for the page's "cock", the word children know. No one is drawn: at
// dawn, two homes and a fence, and on the fence a rooster, quiet, bobbing its head. Zayd's voice tells of it, and his ﷺ
// voice, soft and golden, speaks from his place, a golden ring. Once he says not to curse the rooster, a soft golden
// ring of care comes about it. Only once it is said that it wakes people for prayer does the rooster crow: the windows
// of the homes light up, a place comes to each door, and a spark of prayer rises from each.
function doNotCurseTheRooster(): SignArt {
  const his: [number, number] = [66, 106.6];
  const zayd: [number, number] = [53, 107.6];
  const doors: [number, number][] = [
    [26.2, 106.8],
    [132.2, 105.8]
  ];
  return {
    kind: "do-not-curse-the-rooster",
    ms: 8000,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      { name: "clouds at dawn", svg: cloud(40, 30, 0.6, "#8C7F9E", 0.8) + cloud(118, 24, 0.5, "#8C7F9E", 0.75), loop: { move: "slide", ms: 12000 } },
      { name: "hills at dawn", svg: hills("#8D7E68") },
      { name: "the land at dawn", svg: landOf([[14, 112], [64, 116], [110, 113], [148, 115]], "#C4AC84") + `<rect y="61" width="160" height="59" fill="#2E3D6E" opacity="0.14"/>` },
      { name: "a home", svg: home(28, 104, 30, 20) },
      { name: "a home on the other side", svg: home(134, 103, 28, 18) },
      { name: "a window lit", svg: lightIn(31.3, 87.7, 3.6), keys: showAt(0.74, 0.76), loop: soft },
      { name: "a window lit on the other side", svg: lightIn(137.3, 88.7, 3.6), keys: showAt(0.75, 0.77), loop: soft },
      { name: "a fence", svg: fence },
      { name: "a rooster on the fence", svg: rooster(80, 88.6, 1.8), origin: { x: 80, y: 88.6 }, loop: { move: "bob", ms: 1400, y: -0.4 } },
      { name: "a soft golden ring of care about the rooster", svg: care(80, 89.2, 10, 3, GOLD), keys: showAt(0.4, 0.43), loop: soft },
      { name: "the rooster crows", svg: arcs(93.6, 71, WARM), keys: track({ opacity: [[0.69, 0], [0.71, 1], [0.84, 1], [0.86, 0]] }), loop: speaking },
      ...doors.map((p, i): SignPart => ({ name: `a place at the door ${i + 1}: woken for prayer`, svg: someone(p[0], p[1], 1.5, VOICE), keys: showAt(0.78 + i * 0.01, 0.8 + i * 0.01) })),
      ...doors.map((p, i): SignPart => spark(`a prayer: a spark rising ${i + 1}`, p[0], n(p[1] - 4.6), 0.86 + i * 0.01, 0.95 + i * 0.01)),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.336, 0.98]]), loop: speaking },
      { name: "Zayd's place", svg: someone(zayd[0], zayd[1], 1.7, ZAYD) },
      { name: "Zayd's voice: telling of it", svg: arcs(n(zayd[0] + 2.6), n(zayd[1] - 3.4), ZAYD), keys: voice([[0.02, 0.31]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Zayd ibn Khalid: the Prophet said:", "Do not curse the rooster,", "For it awakens for prayer."])
  };
}

/**
 * A camel worn thin, its feet at (x, y), `s` times its size: the camel of the picture cards with its body slimmed and its
 * hump sunk, in a dull, pale coat.
 */
const thinCamel = (x: number, y: number, s: number, left = false) =>
  camel(x, y, s, left)
    .replace('cx="44" cy="41" rx="22" ry="10.5"', 'cx="44" cy="39.4" rx="21" ry="6.6"')
    .replace("M27 38 C28 20 50 13 58 36 Z", "M28.6 37.2 C31 28.6 47.6 24.6 55.6 36.4 Z")
    .replace(/#E2AC62/g, "#CBB48E")
    .replace(/#C48A42/g, "#A8916C");

// The thin camel. Sahl ibn al-Hanzaliyyah said: the Messenger of Allah ﷺ came upon an emaciated camel and said: fear
// Allah regarding these dumb animals; ride them when they are in good condition, and feed them when they are in good
// condition (Sunan Abi Dawud 2548). The lines leave out the page's "dumb", which here means only that they cannot speak,
// and the last words, whose Arabic the page reads otherwise. No one is drawn, and no one is drawn on a camel: Sahl's
// voice tells of it, and his ﷺ place, a golden ring, comes along the land; only then does the thin camel show, its body
// slim and its hump sunk. His voice, soft and golden, speaks. Once he names these animals, a soft golden ring of care
// comes about the camel. Last, a strong camel in good condition, with its saddle cloth, shows beside it, and glints.
function theThinCamel(): SignArt {
  const sahl: [number, number] = [16, 107];
  const his: [number, number] = [30, 106.2];
  const walk = 32;
  const thin: [number, number] = [88, 103];
  return {
    kind: "the-thin-camel",
    ms: 10000,
    parts: [
      ...aDay([136, 22], [44, 28]),
      ...palms([
        [10, 98, 22],
        [116, 86, 12]
      ], "the land"),
      { name: "a thin camel, worn out", svg: thinCamel(thin[0], thin[1], 0.5), keys: showAt(0.3, 0.33), loop: { move: "bob", ms: 3200, y: -0.15 } },
      { name: "a soft golden ring of care about the thin camel", svg: care(n(thin[0] - 2), n(thin[1] + 0.6), 18, 3.6, GOLD), keys: showAt(0.62, 0.65), loop: soft },
      { name: "a camel in good condition, with its saddle cloth", svg: saddled(136, 103, 0.46), keys: showAt(0.82, 0.85), loop: { move: "bob", ms: 2200, y: -0.25 } },
      { name: "and glints over it", svg: glints([[130, 74], [140, 77], [122, 78]], 1.1), keys: showAt(0.88, 0.9), loop: twinkle() },
      {
        name: "his place, a golden ring: coming upon the camel",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({ xy: [[0.22, 0, 0], [0.36, walk, 0]] })
      },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + walk + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.412, 0.98]]), loop: speaking },
      { name: "Sahl's place", svg: someone(sahl[0], sahl[1], 1.7, SAHL) },
      { name: "Sahl's voice: telling of it", svg: arcs(n(sahl[0] + 2.6), n(sahl[1] - 3.4), SAHL), keys: voice([[0.02, 0.39]]), loop: speaking }
    ],
    words: linesOn(FIVE, ["Sahl ibn al-Hanzaliyyah: the Messenger", "Of Allah came upon an emaciated camel", "And said: fear Allah regarding", "These animals. Ride them when they", "Are in good condition."])
  };
}

/** A small red-brown bird, its body's middle at (x, y), facing left, or right; `spread`: its wings spread wide. */
const smallBird = (x: number, y: number, right = false, spread = false, s = 1.8) =>
  `<g transform="translate(${x} ${y}) scale(${right ? -s : s} ${s})">` +
  (spread
    ? `<path d="M-0.6 -0.8 C-3.6 -6.4 -8.4 -7.6 -11.4 -6.2 C-8 -4.6 -5 -2.2 -2.4 0.2 Z" fill="#8E3E26"/>` +
      `<path d="M0.8 -0.8 C3.8 -6.4 8.6 -7.6 11.6 -6.2 C8.2 -4.6 5.2 -2.2 2.6 0.2 Z" fill="#7A3420"/>`
    : "") +
  `<path d="M2.6 -0.4 L6.6 -1.8 L6.2 1.2 Z" fill="#6E2E1C"/>` +
  `<ellipse rx="3.4" ry="2.4" fill="#B5502E"/>` +
  `<ellipse cx="-0.6" cy="0.9" rx="2.3" ry="1.3" fill="#E9B98E"/>` +
  (spread ? "" : `<path d="M-1.4 -0.6 C0 -2.2 2.4 -2 3 -0.2 C1.6 0.6 -0.2 0.6 -1.4 -0.6 Z" fill="#8E3E26"/>`) +
  `<circle cx="-3" cy="-2" r="1.8" fill="#B5502E"/>` +
  `<circle cx="-3.6" cy="-2.3" r="0.4" fill="#2B2B2B"/>` +
  `<path d="M-4.6 -2.4 L-6.4 -1.8 L-4.6 -1.3 Z" fill="#E7A33E"/>` +
  `</g>`;

/** A young bird, small and round, its middle at (x, y), facing left. */
const youngOne = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.1" ry="2.7" fill="#9A7448"/>` +
  `<circle cx="${n(x - 1.9)}" cy="${n(y - 1.8)}" r="2" fill="#9A7448"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="2.2" fill="#E8C98E"/>` +
  `<circle cx="${n(x - 1.9)}" cy="${n(y - 1.8)}" r="1.5" fill="#E8C98E"/>` +
  `<circle cx="${n(x - 2.3)}" cy="${n(y - 2.1)}" r="0.32" fill="#2B2B2B"/>` +
  `<path d="M${n(x - 3.2)} ${n(y - 1.9)} L${n(x - 4.5)} ${n(y - 1.5)} L${n(x - 3.2)} ${n(y - 1.1)} Z" fill="#E7A33E"/>`;

/** A low thorny bush, its foot's middle at (x, y), with a nest in it whose rim's middle is at (x, y - 13). */
const bushWithNest = (x: number, y: number) =>
  `<path d="M${n(x - 1.4)} ${y} L${n(x - 8.4)} ${n(y - 11)} M${x} ${y} L${n(x + 1.4)} ${n(y - 14)} M${n(x + 1.4)} ${y} L${n(x + 9.8)} ${n(y - 10)}" stroke="#7A5236" stroke-width="1.6" stroke-linecap="round"/>` +
  [
    [-12.6, -11, 9],
    [12.6, -10.4, 8.4],
    [-4.2, -18.4, 8.6],
    [7, -19, 7.8]
  ]
    .map(([dx, dy, r], i) => `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="${r}" fill="${i % 2 ? "#6E8E4A" : "#7E9E56"}"/>`)
    .join("") +
  `<path d="M${n(x - 7.6)} ${n(y - 13)} Q${x} ${n(y - 6.6)} ${n(x + 7.6)} ${n(y - 13)} Z" fill="#8A6440"/>` +
  `<path d="M${n(x - 7.8)} ${n(y - 13)} L${n(x + 7.8)} ${n(y - 13)}" stroke="#6B4A2E" stroke-width="1.4" stroke-linecap="round"/>`;

// The mother bird. Abdullah ibn Mas'ud said: we were with the Messenger of Allah ﷺ during a journey. He went off for a
// need. We saw a bird with her two young ones, and we captured her young ones. The bird came and began to spread its
// wings. The Messenger of Allah ﷺ came and said: who grieved this for its young ones? Return its young ones to it
// (Sunan Abi Dawud 2675). The lines leave out why he went off, and the ants' village that had been burnt, told after
// it. No one is drawn: by a tent and a resting camel are the places of those on the journey, Ibn Mas'ud's among them,
// and his ﷺ place, a golden ring, which goes off along the land. In a bush is a nest; the bird and her two young show
// once they are seen. The young are taken to the places of those on the journey. The bird comes, over them, and
// spreads its wings. His place comes back, and his voice, soft and golden, speaks; once he says to return them, the
// young go back to the nest, the bird goes back with them, and glints show over it.
function theMotherBird(): SignArt {
  const masud: [number, number] = [36, 107];
  const others: [number, number][] = [
    [48, 107.6],
    [26, 105.6]
  ];
  const his: [number, number] = [62, 106.4];
  const nestAt: [number, number] = [116, 104];
  const inNest: [number, number][] = [
    [113, 88.6],
    [119.4, 88.6]
  ];
  const taken: [number, number][] = [
    [41, 102.6],
    [47.4, 103.2]
  ];
  const perch: [number, number] = [131, 84.4];
  const over: [number, number] = [44, 86];
  const back = at3(0.89);
  const home = at3(0.95);
  return {
    kind: "the-mother-bird",
    ms: 12000,
    parts: [
      ...aDay([136, 22], [46, 28]),
      { name: "a tent of the journey", svg: tent(17, 101, 26, 18) },
      { name: "a camel resting", svg: restingCamel(78, 103, 1.3), loop: { move: "bob", ms: 3000, y: -0.15 } },
      { name: "a bush with a nest", svg: bushWithNest(nestAt[0], nestAt[1]) },
      ...inNest.map(
        (p, i): SignPart => ({
          name: `a young one of the bird ${i + 1}`,
          svg: youngOne(p[0], p[1]),
          keys: track({
            opacity: [
              [0.27, 0],
              [0.29, 1]
            ],
            xy: [
              [at3(0.4 + i * 0.01), 0, 0],
              [at3(0.45 + i * 0.01), n(taken[i][0] - p[0]), n(taken[i][1] - p[1])],
              [back, n(taken[i][0] - p[0]), n(taken[i][1] - p[1])],
              [home, 0, 0]
            ]
          }),
          loop: { move: "bob", ms: 900, y: -0.25, phase: i / 2 }
        })
      ),
      {
        name: "the bird, by her nest",
        svg: smallBird(perch[0], perch[1]),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.29, 1],
            [0.57, 1],
            [0.58, 0],
            [back, 0],
            [at3(back + 0.01), 1]
          ],
          xy: [
            [0.52, 0, 0],
            [0.57, n(over[0] - perch[0]), n(over[1] - perch[1])],
            [back, n(over[0] - perch[0]), n(over[1] - perch[1])],
            [home, 0, 0]
          ]
        }),
        loop: { move: "bob", ms: 1200, y: -0.3 }
      },
      {
        name: "the bird, spreading its wings over them",
        svg: smallBird(over[0], over[1], false, true),
        keys: track({
          opacity: [
            [0.57, 0],
            [0.58, 1],
            [back, 1],
            [at3(back + 0.01), 0]
          ]
        }),
        loop: { move: "bob", ms: 420, y: -0.8 }
      },
      { name: "and glints over the nest", svg: glints([[nestAt[0], 76], [n(nestAt[0] - 9), 80], [n(nestAt[0] + 9), 80]], 1.1), keys: showAt(0.95, 0.96), loop: twinkle() },
      ...others.map((p, i): SignPart => ({ name: `the place of one on the journey ${i + 1}`, svg: someone(p[0], p[1], 1.7, WITH_HIM) })),
      { name: "Ibn Mas'ud's place", svg: someone(masud[0], masud[1], 1.7, IBN_MASUD) },
      { name: "Ibn Mas'ud's voice: telling of it", svg: arcs(n(masud[0] + 2.6), n(masud[1] - 3.4), IBN_MASUD), keys: voice([[0.02, 0.73]]), loop: speaking },
      {
        name: "his place, a golden ring: going off, and coming back",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({
          xy: [
            [0.27, 0, 0],
            [0.34, 104, 0],
            [0.64, 104, 0],
            [0.7, 0, 0]
          ],
          opacity: [
            [0.32, 1],
            [0.34, 0],
            [0.64, 0],
            [0.66, 1]
          ]
        })
      },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.752, 0.99]]), loop: speaking }
    ],
    words: linesOn(EIGHT, [
      "Abdullah ibn Mas'ud: we were with the",
      "Messenger of Allah during a journey.",
      "We saw a bird with her two young ones,",
      "And we captured her young ones.",
      "The bird came and began to spread",
      "Its wings. He came and said:",
      "Who grieved this for its young ones?",
      "Return its young ones to it."
    ])
  };
}

/** Abdullah ibn Abbas's place and voice: a sea teal. */
const IBN_ABBAS = "#4E7E8A";

/** A low mound of an ants' nest, its foot's middle at (x, y), with its door. */
const antsNest = (x: number, y: number) =>
  `<path d="M${n(x - 13)} ${y} Q${n(x - 5)} ${n(y - 9.6)} ${x} ${n(y - 9.2)} Q${n(x + 5)} ${n(y - 9.6)} ${n(x + 13)} ${y} Z" fill="#B38C5C"/>` +
  `<ellipse cx="${x}" cy="${n(y - 7.6)}" rx="1.9" ry="0.9" fill="#5A4026"/>`;

/** An ant, its legs' feet on y, about x; `left`: facing left. */
const antOn = (x: number, y: number, left = false) => animalAt("ant", n(x - 9), n(y - 64 * 0.18), 0.18, left);

/** A bee, its body's middle at (x, y), facing right: yellow, with two dark stripes and pale wings. */
const aBee = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="2.3" fill="#F2B632"/>` +
  `<path d="M${n(x - 0.8)} ${n(y - 2.1)} L${n(x - 0.8)} ${n(y + 2.1)} M${n(x + 1.2)} ${n(y - 2)} L${n(x + 1.2)} ${n(y + 2)}" stroke="#2B2B2B" stroke-width="0.8"/>` +
  `<circle cx="${n(x + 3)}" cy="${n(y - 0.3)}" r="1.1" fill="#2B2B2B"/>` +
  `<ellipse cx="${n(x - 0.6)}" cy="${n(y - 3)}" rx="1.9" ry="1.2" fill="#FFFFFF" opacity="0.85"/>` +
  `<ellipse cx="${n(x + 1.2)}" cy="${n(y - 2.8)}" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.7"/>`;

/**
 * A hoopoe on the ground, its feet at (x, y), facing left, `s` times its size: a soft orange body, a black wing with
 * white bars, a fan of a crest with black tips, and a long, thin, bent beak.
 */
const hoopoeOn = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M-1 -1.6 L-1.4 0 M1.4 -1.6 L1.2 0" stroke="#6B5A4A" stroke-width="0.6" stroke-linecap="round"/>` +
  `<path d="M5.6 -7.6 L12.4 -9.4 L12.6 -6.4 L6 -5.4 Z" fill="#2F2A28"/><path d="M9.4 -8.6 L9.6 -5.8" stroke="#FFFFFF" stroke-width="0.8"/>` +
  `<ellipse cx="1.6" cy="-5.6" rx="5.6" ry="3.8" fill="#E89A62"/>` +
  `<ellipse cx="3.4" cy="-6.4" rx="4.2" ry="2.4" fill="#2F2A28"/>` +
  `<path d="M1.6 -7.4 L2.4 -5.4 M3.4 -7.8 L4.2 -5.6 M5.2 -7.8 L5.8 -5.8" stroke="#FFFFFF" stroke-width="0.6" stroke-linecap="round"/>` +
  [-150, -122, -95, -68, -42]
    .map((a) => {
      const r = (a * Math.PI) / 180;
      const [cx, cy] = [n(-3 + Math.cos(r) * 3.6), n(-10.4 + Math.sin(r) * 3.6)];
      const [tx, ty] = [n(-3 + Math.cos(r) * 5.6), n(-10.4 + Math.sin(r) * 5.6)];
      return `<ellipse cx="${cx}" cy="${cy}" rx="2.4" ry="0.8" transform="rotate(${a} ${cx} ${cy})" fill="#EE9F68"/><circle cx="${tx}" cy="${ty}" r="0.75" fill="#2F2A28"/>`;
    })
    .join("") +
  `<circle cx="-3" cy="-9.6" r="2.6" fill="#E89A62"/>` +
  `<circle cx="-3.8" cy="-10.1" r="0.5" fill="#2B2B2B"/>` +
  `<path d="M-5.2 -9.8 C-7.4 -9.6 -9.4 -8.6 -10.6 -7 C-9 -8 -7.2 -8.6 -5.3 -8.7 Z" fill="#3A3330"/>` +
  `</g>`;

/**
 * A sparrow-hawk perched, its feet at (x, y), facing left, `s` times its size: a small hawk, grey-blue above, its pale
 * breast barred with rust, with a yellow eye, a short hooked beak and a long tail.
 */
const sparrowHawk = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M1.6 -5.6 L7.4 3.6 L4.4 4.6 L-0.6 -3.8 Z" fill="#56667A"/>` +
  `<path d="M3.4 -2.4 L6.2 2.2 M2.4 -1 L5 3.4" stroke="#8A98A8" stroke-width="0.5"/>` +
  `<ellipse cx="0" cy="-8.6" rx="4.2" ry="6.4" transform="rotate(18 0 -8.6)" fill="#6E7E92"/>` +
  `<ellipse cx="-1.7" cy="-8.2" rx="2.7" ry="4.9" transform="rotate(18 -1.7 -8.2)" fill="#F1E2C8"/>` +
  `<path d="M-4.2 -10.4 L-1 -9.8 M-4.4 -8.2 L-0.8 -7.6 M-4 -6 L-0.9 -5.4" stroke="#C07A4A" stroke-width="0.6" stroke-linecap="round"/>` +
  `<circle cx="-2.6" cy="-15" r="3" fill="#6E7E92"/>` +
  `<ellipse cx="-3.7" cy="-14" rx="1.4" ry="1.2" fill="#F1E2C8"/>` +
  `<circle cx="-3.4" cy="-15.6" r="0.9" fill="#F2C230"/><circle cx="-3.5" cy="-15.6" r="0.45" fill="#2B2B2B"/>` +
  `<path d="M-5.3 -15.4 L-7.2 -14.6 Q-6.9 -13.2 -5.7 -13.4 L-5 -14.2 Z" fill="#3A3A3A"/>` +
  `<path d="M-1.4 -2.8 L-1.8 0 M0.8 -2.6 L0.6 0" stroke="#E8B830" stroke-width="0.8" stroke-linecap="round"/>` +
  `</g>`;

/** A low rock, its foot's middle at (x, y), `w` wide and `h` high. */
const rock = (x: number, y: number, w: number, h: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${n(x - w * 0.46)} ${n(y - h)} ${n(x - w * 0.1)} ${n(y - h)} Q${n(x + w * 0.4)} ${n(y - h * 1.05)} ${n(x + w / 2)} ${y} Z" fill="#A99A86"/>` +
  `<path d="M${n(x - w * 0.3)} ${n(y - h * 0.7)} Q${n(x - w * 0.1)} ${n(y - h * 0.92)} ${n(x + w * 0.2)} ${n(y - h * 0.86)}" stroke="#C4B6A2" stroke-width="1" fill="none" stroke-linecap="round"/>`;

// Four creatures. Abdullah ibn Abbas said: the Prophet ﷺ prohibited to kill four creatures: ants, bees, hoopoes, and
// sparrow-hawks (Sunan Abi Dawud 5267). No one is drawn: on a meadow, Ibn Abbas's voice tells of it, and his ﷺ voice,
// soft and golden, speaks from his place, a golden ring. Only as the four are named does each show, one after another,
// with a soft golden ring of care about it: ants about their nest, bees over the flowers, a hoopoe, and a sparrow-hawk
// on a rock.
function fourCreatures(): SignArt {
  const ibnAbbas: [number, number] = [14, 107];
  const his: [number, number] = [30, 106.4];
  const nest: [number, number] = [54, 105];
  const hoopoe: [number, number] = [110, 104.6];
  const hawkRock: [number, number] = [140, 104.6];
  const comeAt = [0.68, 0.74, 0.8, 0.86];
  return {
    kind: "four-creatures",
    ms: 9000,
    parts: [
      ...aDay([136, 22], [46, 28]).slice(0, 4),
      { name: "a meadow", svg: plainLand("#CFD69C", [[20, 114], [70, 117], [118, 115], [152, 116]]) },
      { name: "flowers", svg: flower(74, 105, "#F47C9B", 10) + flower(80, 104, "#B98BE8", 12) + flower(86, 105.4, "#FFFFFF", 9) + flower(92, 104.2, "#F6B73C", 11), origin: { x: 83, y: 105 }, loop: { move: "bob", ms: 2600, x: 0.5 } },
      { name: "a rock", svg: rock(hawkRock[0], hawkRock[1], 24, 9) },
      { name: "the ants' nest", svg: antsNest(nest[0], nest[1]), keys: showAt(comeAt[0], comeAt[0] + 0.02) },
      { name: "an ant", svg: antOn(n(nest[0] - 9), n(nest[1] + 0.8)), keys: showAt(comeAt[0], comeAt[0] + 0.02), loop: { move: "swim", ms: 2600, x: 5 } },
      { name: "another ant", svg: antOn(n(nest[0] + 10), n(nest[1] + 1.6), true), keys: showAt(comeAt[0], comeAt[0] + 0.02), loop: { move: "swim", ms: 3000, x: 4, phase: 0.5 } },
      { name: "a soft golden ring of care about the ants", svg: care(nest[0], n(nest[1] + 0.8), 17, 3, GOLD), keys: showAt(comeAt[0] + 0.02, comeAt[0] + 0.05), loop: soft },
      { name: "a bee", svg: aBee(78, 89), keys: showAt(comeAt[1], comeAt[1] + 0.02), loop: { move: "bob", ms: 620, x: 1.2, y: 1 } },
      { name: "another bee", svg: aBee(89, 92), keys: showAt(comeAt[1], comeAt[1] + 0.02), loop: { move: "bob", ms: 540, x: -1, y: 1, phase: 0.4 } },
      { name: "a soft golden ring of care about the bees", svg: care(83, 105.6, 13, 2.8, GOLD), keys: showAt(comeAt[1] + 0.02, comeAt[1] + 0.05), loop: soft },
      { name: "a hoopoe", svg: hoopoeOn(hoopoe[0], hoopoe[1], 1.4), keys: showAt(comeAt[2], comeAt[2] + 0.02), origin: { x: hoopoe[0], y: hoopoe[1] }, loop: { move: "bob", ms: 1700, y: 0.3, rotate: 4 } },
      { name: "a soft golden ring of care about the hoopoe", svg: care(n(hoopoe[0] + 2), n(hoopoe[1] + 0.6), 11, 2.6, GOLD), keys: showAt(comeAt[2] + 0.02, comeAt[2] + 0.05), loop: soft },
      { name: "a sparrow-hawk on the rock", svg: sparrowHawk(n(hawkRock[0] - 1), n(hawkRock[1] - 8.6), 1.15), keys: showAt(comeAt[3], comeAt[3] + 0.02), loop: { move: "bob", ms: 2600, y: -0.2 } },
      { name: "a soft golden ring of care about the sparrow-hawk", svg: care(hawkRock[0], n(hawkRock[1] + 0.6), 14, 2.8, GOLD), keys: showAt(comeAt[3] + 0.02, comeAt[3] + 0.05), loop: soft },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.336, 0.65]]), loop: speaking },
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.7, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 2.6), n(ibnAbbas[1] - 3.4), IBN_ABBAS), keys: voice([[0.02, 0.31]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Abdullah ibn Abbas: the Prophet", "Prohibited to kill four creatures:", "Ants, bees, hoopoes, and sparrow-hawks."])
  };
}

/** Anas ibn Malik's place and voice: a soft violet. */
const ANAS = "#7A5E9A";

/** Stones and tufts along the way, `dx` along: drawn twice, a box apart, so the land can pass by without a seam. */
const alongTheWay = (dx: number) =>
  [0, 160]
    .map((off) =>
      [
        [12, 111],
        [46, 114.6],
        [82, 110.6],
        [118, 113.8],
        [148, 111.4]
      ]
        .map(([x, y], i) =>
          i % 2
            ? `<ellipse cx="${n(x + off + dx)}" cy="${y}" rx="2.6" ry="1.2" fill="#3E4466"/>`
            : `<path d="M${n(x + off + dx - 3.4)} ${y} Q${n(x + off + dx)} ${n(y - 5.2)} ${n(x + off + dx + 3.4)} ${y} Z" fill="#454B6A"/>`
        )
        .join("")
    )
    .join("");

// Travel by night. Anas said: the Messenger of Allah ﷺ said: keep to travelling by night, for the earth is traversed
// (more easily) by night (Sunan Abi Dawud 2571). The lines leave out the page's words in parentheses. No one is drawn,
// and no one is drawn on a camel: by day, Anas's voice tells of it, and his ﷺ voice, soft and golden, speaks from his
// place, a golden ring. Once he says to travel by night, the night comes, with its stars and the crescent, and a
// caravan of laden camels comes along the way, the places of those travelling walking beside them. Once he says the
// earth is traversed by night, the land passes by under them, quickly.
function travelByNight(): SignArt {
  const anas: [number, number] = [148, 107.4];
  const his: [number, number] = [132, 106.8];
  const camels = [4, 38, 72];
  const s = 0.34;
  const feet = 100.6;
  const walkIn = track({ xy: [[0.38, -140, 0], [0.54, 0, 0]] });
  return {
    kind: "travel-by-night",
    ms: 9000,
    parts: [
      { name: "the sky by day", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 30), keys: track({ opacity: [[0.34, 1], [0.4, 0]] }) },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand() },
      { name: "the night comes", svg: NIGHT_OVER_SKY + NIGHT_OVER_LAND, keys: showAt(0.34, 0.44) },
      { name: "hills far off, at night", svg: peaks([[18, 9, 24], [50, 12, 30], [86, 8, 22], [116, 11, 28], [150, 9, 22]], 67, "#2C3558", false), keys: showAt(0.34, 0.44), clip: { x: 0, y: 0, w: 160, h: 62 } },
      { name: "stars", svg: stars([[14, 14], [36, 26], [58, 12], [84, 22], [106, 10], [124, 30], [150, 18], [70, 36], [22, 40]]), keys: showAt(0.42, 0.46), loop: twinkle() },
      { name: "the crescent", svg: crescent(128, 22, 6, 3.6, "#F4E7B0"), keys: showAt(0.42, 0.46) },
      { name: "the way", svg: road(0, 160, 103.4, "#46506E"), keys: showAt(0.36, 0.44) },
      { name: "the land, still", svg: alongTheWay(0), keys: track({ opacity: [[0.36, 0], [0.44, 1], [0.68, 1], [0.69, 0]] }) },
      { name: "the land, passing by", svg: alongTheWay(0), keys: showAt(0.68, 0.69), loop: { move: "slide", ms: 2200, reverse: true } },
      {
        name: "a caravan of laden camels",
        svg: camels.map((x) => loaded(x, n(feet - 73 * s), s, false)).join(""),
        keys: walkIn,
        loop: { move: "bob", ms: 560, y: 0.5 }
      },
      ...camels.map(
        (x, i): SignPart => ({
          name: `the place of one travelling ${i + 1}`,
          svg: someone(n(x + 19), 107, 1.6, "#C9BFA8"),
          keys: walkIn,
          loop: { move: "bob", ms: 560, y: 0.4, phase: i / 3 }
        })
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.336, 0.98]]), loop: speaking },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.7, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 2.6), n(anas[1] - 3.4), ANAS), keys: voice([[0.02, 0.31]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Anas: the Messenger of Allah said:", "Keep to travelling by night,", "For the earth is traversed by night."])
  };
}

/** Abdullah ibn Busr's place and voice: a rust brown. */
const IBN_BUSR = "#A0643A";

/**
 * A home whose doorway is open, with no curtain, its foot's middle at (x, y), `w` wide and `h` high: through the
 * doorway, the room inside shows, with a mat on its floor and a jar.
 */
const openDoorHome = (x: number, y: number, w: number, h: number, dw: number, dh: number) => {
  const l = n(x - w / 2);
  const top = n(y - h);
  const dl = n(x - dw / 2);
  return (
    `<rect x="${l}" y="${top}" width="${w}" height="${h}" fill="#D3A872"/>` +
    `<rect x="${n(x + w * 0.16)}" y="${top}" width="${n(w * 0.34)}" height="${h}" fill="#000000" opacity="0.1"/>` +
    `<rect x="${n(l - 0.8)}" y="${n(top - 1.4)}" width="${n(w + 1.6)}" height="1.6" fill="#BC9060"/>` +
    `<path d="M${n(dl - 1)} ${y} L${n(dl - 1)} ${n(y - dh + 3)} Q${x} ${n(y - dh - 3)} ${n(dl + dw + 1)} ${n(y - dh + 3)} L${n(dl + dw + 1)} ${y} Z" fill="#BC9060"/>` +
    `<path d="M${dl} ${y} L${dl} ${n(y - dh + 3)} Q${x} ${n(y - dh - 1.6)} ${n(dl + dw)} ${n(y - dh + 3)} L${n(dl + dw)} ${y} Z" fill="#5A4232"/>` +
    `<rect x="${dl}" y="${n(y - 2.4)}" width="${dw}" height="2.4" fill="#B5523A"/>` +
    `<path d="M${n(dl + 1)} ${n(y - 1.2)} L${n(dl + dw - 1)} ${n(y - 1.2)}" stroke="#E2B85A" stroke-width="0.5" stroke-dasharray="1 1"/>` +
    `<path d="M${n(x + 2)} ${n(y - 2.4)} Q${n(x + 0.8)} ${n(y - 8)} ${n(x + 2.8)} ${n(y - 9.6)} L${n(x + 4.6)} ${n(y - 9.6)} Q${n(x + 6.6)} ${n(y - 8)} ${n(x + 5.4)} ${n(y - 2.4)} Z" fill="#8E6A4A"/>` +
    `<rect x="${n(l + w * 0.12)}" y="${n(top + h * 0.26)}" width="4.4" height="4.4" fill="#6B4A2E"/>` +
    `<rect x="${n(x + w * 0.3)}" y="${n(top + h * 0.26)}" width="4.4" height="4.4" fill="#6B4A2E"/>`
  );
};

/** The open doorway's outline, `dw` wide and `dh` high, its foot's middle at (x, y): a soft golden arch. */
const doorwayGlow = (x: number, y: number, dw: number, dh: number) =>
  `<path d="M${n(x - dw / 2 - 1.6)} ${y} L${n(x - dw / 2 - 1.6)} ${n(y - dh + 3)} Q${x} ${n(y - dh - 4.4)} ${n(x + dw / 2 + 1.6)} ${n(y - dh + 3)} L${n(x + dw / 2 + 1.6)} ${y}" stroke="${GOLD}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;

// The door's side. Abdullah ibn Busr said: when the Messenger of Allah ﷺ came to some people's door, he did not face it
// squarely, but faced the right or left corner, and said: peace be upon you! peace be upon you! That was because there
// were no curtains on the doors of the house at that time (Sunan Abi Dawud 5186). No one is drawn: Ibn Busr's voice
// tells of it, and his ﷺ place, a golden ring, comes along the land toward a home whose doorway is open, the room
// inside showing; it stops short of it. Only once it is said that he did not face the door does his place go to its
// side, by the wall, and soft golden marks show at both sides, the right and the left. His voice, soft and golden, gives
// the greeting twice. Last, once it is said that the doors had no curtains, a soft golden arch shows about the open
// doorway, and glints.
function theDoorsSide(): SignArt {
  const busr: [number, number] = [12, 107.4];
  const his: [number, number] = [28, 107];
  const door: [number, number] = [98, 105];
  const [dw, dh] = [16, 25];
  const yard: [number, number] = [62, 108.4];
  const side: [number, number] = [n(door[0] - 14), 106.6];
  return {
    kind: "the-doors-side",
    ms: 12000,
    parts: [
      ...aDay([136, 22], [46, 28]),
      ...palms([[149, 98, 18]], "the land"),
      { name: "a home, its doorway open", svg: openDoorHome(door[0], door[1], 84, 46, dw, dh) },
      { name: "soft golden marks at both sides of the door", svg: care(n(door[0] - 14), n(door[1] + 1.6), 5, 1.4, GOLD) + care(n(door[0] + 14), n(door[1] + 1.6), 5, 1.4, GOLD), keys: showAt(0.46, 0.49), loop: soft },
      { name: "a soft golden arch about the open doorway", svg: doorwayGlow(door[0], door[1], dw, dh), keys: showAt(0.75, 0.78), loop: soft },
      { name: "and glints at the doorway", svg: glints([[door[0], n(door[1] - dh - 7)], [n(door[0] - 13), n(door[1] - dh - 2)], [n(door[0] + 13), n(door[1] - dh - 2)]], 1.2), keys: showAt(0.9, 0.92), loop: twinkle() },
      {
        name: "his place, a golden ring: coming to the door, and going to its side",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({
          xy: [
            [0.17, 0, 0],
            [0.26, n(yard[0] - his[0]), n(yard[1] - his[1])],
            [0.32, n(yard[0] - his[0]), n(yard[1] - his[1])],
            [0.4, n(side[0] - his[0]), n(side[1] - his[1])]
          ]
        })
      },
      { name: "his voice, soft and golden: the greeting, twice", svg: arcs(n(side[0] + 2.8), n(side[1] - 2.6), SOFT_GOLD), keys: voice([[0.6, 0.655], [0.665, 0.71]]), loop: speaking },
      { name: "Ibn Busr's place", svg: someone(busr[0], busr[1], 1.7, IBN_BUSR) },
      { name: "Ibn Busr's voice: telling of it", svg: arcs(n(busr[0] + 2.6), n(busr[1] - 3.4), IBN_BUSR), keys: voice([[0.02, 0.57], [0.74, 0.99]]), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Abdullah ibn Busr: when the Messenger",
      "Of Allah came to some people's door,",
      "He did not face it squarely, but faced",
      "The right or left corner, and said:",
      "Peace be upon you! Peace be upon you!",
      "That was because there were no curtains",
      "On the doors of the house at that time."
    ])
  };
}

/** Abdullah ibn Amr's place and voice: a sage green. */
const IBN_AMR = "#5E8A7A";
/** The place and voice of the one who came to pledge: a lake blue. */
const WHO_CAME = "#3E7E9A";
/** The places of the two at home: a soft plum, and a dusty green. */
const AT_HOME = ["#8E7A9A", "#7A8A6E"];

/** A tear, a small cool-blue drop, its middle at (x, y). */
const tear = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 1.6)} Q${n(x + 1.1)} ${n(y + 0.1)} ${x} ${n(y + 1)} Q${n(x - 1.1)} ${n(y + 0.1)} ${x} ${n(y - 1.6)} Z" fill="#6FAED3"/>`;

// Make them laugh. Abdullah ibn Amr said: a man came to the Messenger of Allah ﷺ and said: I came to you to take the
// oath of allegiance to you on emigration, and I left my parents weeping. He said: return to them and make them laugh as
// you made them weep (Sunan Abi Dawud 2528). No one is drawn: by a home are the places of the two who live in it, and
// the place of the one who came goes from it along the land to his ﷺ place, a golden ring, and speaks. Only once it is
// said that he left them weeping do tears show by their places. His voice, soft and golden, speaks; once he says to
// return to them, the one who came goes back along the land to the home, and once he says to make them laugh, the tears
// go and golden glints of joy show over them.
function makeThemLaugh(): SignArt {
  const amr: [number, number] = [148, 107.4];
  const his: [number, number] = [124, 106.6];
  const home0: [number, number] = [30, 104];
  const two: [number, number][] = [
    [14, 108],
    [46, 108.4]
  ];
  const from: [number, number] = [56, 107.6];
  const there: [number, number] = [110, 107.4];
  const go = n(there[0] - from[0]);
  return {
    kind: "make-them-laugh",
    ms: 11000,
    parts: [
      ...aDay([136, 22], [70, 28]),
      ...palms([[100, 96, 13], [146, 95, 17]], "the land"),
      { name: "the way between them", svg: road(48, 132, 108.4) },
      { name: "a home", svg: home(home0[0], home0[1], 44, 28) },
      ...two.map((p, i): SignPart => ({ name: `the place of one at home ${i + 1}`, svg: someone(p[0], p[1], 1.7, AT_HOME[i]) })),
      {
        name: "tears by the places at home",
        svg: two.map(([x, y]) => tear(n(x + 2.8), n(y - 3.2)) + tear(n(x - 2.6), n(y - 2.8))).join(""),
        keys: track({ opacity: [[0.66, 0], [0.68, 1], [0.83, 1], [0.84, 0]] }),
        loop: { move: "drip", ms: 1400, distance: 2.2 }
      },
      { name: "golden glints of joy over the places at home", svg: glints([[12, 100], [48, 100.4], [17, 95], [43, 95.4]], 1.5), keys: showAt(0.84, 0.86), loop: twinkle() },
      {
        name: "the place of the one who came: coming, and going back",
        svg: someone(from[0], from[1], 1.7, WHO_CAME),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.12, go, n(there[1] - from[1])],
            [0.7, go, n(there[1] - from[1])],
            [0.77, 0, 0]
          ]
        })
      },
      { name: "the voice of the one who came: telling him", svg: arcs(n(there[0] + 2.6), n(there[1] - 3.4), WHO_CAME), keys: voice([[0.18, 0.66]]), loop: speaking },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.7, 0.98]]), loop: speaking },
      { name: "Ibn Amr's place", svg: someone(amr[0], amr[1], 1.7, IBN_AMR) },
      { name: "Ibn Amr's voice: telling of it", svg: arcs(n(amr[0] + 2.6), n(amr[1] - 3.4), IBN_AMR), keys: voice([[0.02, 0.158]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Abdullah ibn Amr: a man came to the",
      "Messenger of Allah and said: I came to",
      "You to take the oath of allegiance to you",
      "On emigration, and I left my parents",
      "Weeping. He said: return to them",
      "And make them laugh as you made them weep."
    ])
  };
}

export const CREATURES_ART = {
  "do-not-curse-the-rooster": doNotCurseTheRooster,
  "the-thin-camel": theThinCamel,
  "the-mother-bird": theMotherBird,
  "four-creatures": fourCreatures,
  "travel-by-night": travelByNight,
  "the-doors-side": theDoorsSide,
  "make-them-laugh": makeThemLaugh
};
