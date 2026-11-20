import { cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, mat, plainLand, SIX, sparkStays, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { coins, jar } from "./tradeArt";
import { farHills, FIVE } from "./wideArt";
import { dish } from "./worthArt";
import { pulpit } from "./fairArt";

/**
 * Grow: the worker paid before his sweat dries; olive oil from a blessed tree; faith learned before the Quran, and
 * the Quran making it grow; fasting, for there is nothing like it; Umm Sulaim's words for her prayer; and the stranger
 * taught his religion in the middle of the khutbah. Only the land, the sky, buildings, things, plants and animals are
 * drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face:
 * where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs
 * in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes down from the sky: what is
 * good is a light, glints, a soft golden ring and sparks that rise. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.34, 0.66],
  [0.68, 1]
] as const;

/** The words of nine lines. */
const NINE = [
  [0.012, 0.117],
  [0.121, 0.226],
  [0.23, 0.335],
  [0.339, 0.444],
  [0.448, 0.553],
  [0.557, 0.662],
  [0.666, 0.771],
  [0.775, 0.88],
  [0.884, 1]
] as const;

/** Ibn Umar's place and voice: a deep teal. */
const IBN_UMAR = "#3E6E7A";
/** The worker's place: a warm brown. */
const WORKER = "#8E6A48";
/** The place of the one he worked for: a slate blue. */
const HIRER = "#5E6E8E";
/** Umar's place and voice: a deep green. */
const UMAR = "#4E6E4E";
/** The place of one at its home: a warm brown. */
const AT_HOME = "#8E6A48";
/** Jundub's place and voice: a deep blue. */
const JUNDUB = "#4E5E8E";
/** The places of the young ones with him: a strong brown. */
const YOUNG = "#7E5A3A";
/** Abu Umamah's place and voice: a plum. */
const ABU_UMAMAH = "#7A5A7E";
/** Anas's place and voice: a slate. */
const ANAS = "#5E7088";
/** Umm Sulaim's place and voice: a rose brown. */
const UMM_SULAIM = "#8A4A5A";
/** Abu Rifa'ah's place and voice: a sea green. */
const ABU_RIFAAH = "#4E7E6E";
/** The places of the folk: a soft brown. */
const FOLK = "#9A8A70";

/** How a voice that speaks from `on` until `off`, for each pair, shows and goes. */
const spoken = (spans: [number, number][]) =>
  spans.flatMap(([on, off]): [number, number][] => [
    [on, 0],
    [at3(on + 0.006), 1],
    [off, 1],
    [at3(off + 0.006), 0]
  ]);

/** A voice that speaks from `on` until `off`, for each pair. */
const voice = (spans: [number, number][]) => track({ opacity: spoken(spans) });

/** The sky, the sun, a cloud, the far hills and the land of Madinah. */
const madinahDay = (sunAt: [number, number] | null, cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  ...(sunAt ? [{ name: "the sun", svg: sun(sunAt[0], sunAt[1]) }] : []),
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** The speaker's place and voice, and his place, a golden ring, and his voice, soft and golden. */
const tellers = (who: string, at: [number, number], color: string, tells: [number, number], his: [number, number], speaks: [number, number]): SignPart[] => [
  { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
  { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([speaks]), loop: speaking },
  { name: `${who}'s place`, svg: someone(at[0], at[1], 1.5, color) },
  { name: `${who}'s voice: telling of it`, svg: arcs(n(at[0] + 2.4), n(at[1] - 3.2), color), keys: voice([tells]), loop: speaking }
];

/** A mud brick, its foot's left at (x, y): 7 wide and 3.2 high. */
const brick = (x: number, y: number) =>
  `<rect x="${x}" y="${n(y - 3.2)}" width="7" height="3.2" fill="#B98A56" stroke="#9A6E40" stroke-width="0.35"/>`;

/** An olive tree, its foot at (x, y), `s` times its size: grey-green leaves and small dark olives (as in devotionArt). */
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

/** A round flat loaf on its dish, its middle at (x, y). */
const loafOnDish = (x: number, y: number) => `${dish(x, y)}<ellipse cx="${x}" cy="${n(y - 1.6)}" rx="2.8" ry="1" fill="#D9A863"/><path d="M${n(x - 1.6)} ${n(y - 1.7)} L${n(x + 1.6)} ${n(y - 1.7)}" stroke="#B8864A" stroke-width="0.3"/>`;

/** A drop of golden olive oil, its middle at (x, y). */
const drop = (x: number, y: number) => `<path d="M${x} ${n(y - 1.3)} Q${n(x + 0.9)} ${n(y + 0.1)} ${x} ${n(y + 0.7)} Q${n(x - 0.9)} ${n(y + 0.1)} ${x} ${n(y - 1.3)} Z" fill="#D8B840"/>`;

/** A prayer mat of soft blue, its middle at (x, y), so that a place on it shows (as lovedArt's, which is red). */
const blueMat = (x: number, y: number) =>
  `<path d="M${n(x - 9)} ${n(y + 2.6)} L${n(x + 7)} ${n(y + 2.6)} L${n(x + 9.6)} ${n(y - 2.4)} L${n(x - 6.4)} ${n(y - 2.4)} Z" fill="#8DB0CF"/>` +
  `<path d="M${n(x - 7.4)} ${n(y + 1.6)} L${n(x + 5.8)} ${n(y + 1.6)} L${n(x + 8)} ${n(y - 1.4)} L${n(x - 5.4)} ${n(y - 1.4)} Z" stroke="#F2F0E4" stroke-width="0.5" fill="none"/>`;

/** A dish with a cloth over it, and a cup by it, its middle at (x, y): food left for the day. */
const coveredDish = (x: number, y: number) =>
  `${dish(x, y)}<path d="M${n(x - 3.2)} ${n(y - 1)} Q${x} ${n(y - 5)} ${n(x + 3.2)} ${n(y - 1)} Z" fill="#E6D2A8"/><path d="M${n(x - 2.4)} ${n(y - 2.2)} Q${x} ${n(y - 4)} ${n(x + 2.4)} ${n(y - 2.2)}" stroke="#C9AE7C" stroke-width="0.3" fill="none"/>` +
  `<path d="M${n(x + 4.6)} ${n(y - 2.8)} L${n(x + 7)} ${n(y - 2.8)} L${n(x + 6.6)} ${n(y + 0.2)} L${n(x + 5)} ${n(y + 0.2)} Z" fill="#B66A3C"/>`;

/** A low chair of wood with legs of iron, its foot's middle at (x, y). */
const chair = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${y} L${n(x - 3.2)} ${n(y - 3.6)} M${n(x + 3.2)} ${y} L${n(x + 3.2)} ${n(y - 3.6)} M${n(x - 3.2)} ${n(y - 1.4)} L${n(x + 3.2)} ${n(y - 1.4)}" stroke="#6E7074" stroke-width="0.7" stroke-linecap="round"/>` +
  `<rect x="${n(x - 4)}" y="${n(y - 4.6)}" width="8" height="1.2" fill="#9A7448"/>`;

/** Ten small sparks in a low arc, their middle at (x, y). */
const tenSparks = (x: number, y: number, fill: string) =>
  Array.from({ length: 10 }, (_, i) => {
    const dx = (i - 4.5) * 1.5;
    return `<circle cx="${n(x + dx)}" cy="${n(y + Math.abs(dx) * 0.16)}" r="0.42" fill="${fill}"/>`;
  }).join("");

// Pay the worker. Ibn Umar said: the Messenger of Allah ﷺ said: give the worker his wages before his sweat dries (Sunan
// Ibn Majah 2443). No one is drawn: in Madinah, a wall of mud brick being built, and by it the place of the worker, a
// soft warm haze about it in the heat of the work; by a home on the right, the place of the one he worked for, and a
// small sack of coins by it; his place, a golden ring, and Ibn Umar's place on the left. Ibn Umar's voice tells of it,
// and his voice, soft and golden, speaks. The last bricks are laid. The place of the one he worked for comes to the
// worker with his wages, and the coins go to the worker's place at once; a soft golden ring with glints comes about it,
// and only then does the warm haze about it go: before his sweat dries.
function payTheWorker(): SignArt {
  const worker: [number, number] = [66, 103.6];
  const hirer: [number, number] = [132, 104.4];
  const walk = -44;
  const wallY = 98.4;
  const firstCourse = [72, 79, 86, 93, 100, 107];
  const laid = [0.05, 0.09, 0.13, 0.17, 0.21, 0.25];
  return {
    kind: "pay-the-worker",
    ms: 8000,
    parts: [
      ...madinahDay([30, 17], [112, 25]),
      ...palms(
        [
          [14, 93, 10],
          [154, 94, 10]
        ],
        "Madinah"
      ),
      { name: "the home of the one he worked for", svg: home(144, 99, 18, 12) },
      { name: "the wall of mud brick, its first course laid", svg: firstCourse.map((x) => brick(x, wallY)).join("") },
      ...firstCourse.map(
        (x, i): SignPart => ({
          name: `the work: a mud brick laid on the wall ${i + 1}`,
          svg: brick(n(x + 3.5), n(wallY - 3.2)),
          keys: showAt(laid[i], at3(laid[i] + 0.012))
        })
      ),
      {
        name: "the heat of the work: a soft warm haze about the worker's place, until it goes",
        svg: wash(worker[0], n(worker[1] - 3), 6.4, 5.2, "#FFB070", 0.16),
        keys: track({
          opacity: [
            [0.86, 1],
            [0.92, 0]
          ]
        }),
        loop: soft
      },
      { name: "the worker's place, by the wall", svg: someone(worker[0], worker[1], 1.6, WORKER) },
      {
        name: "the place of the one he worked for, coming to the worker with his wages",
        svg: someone(hirer[0], hirer[1], 1.6, HIRER),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.52, walk, 0]
          ]
        })
      },
      {
        name: "his wages: a small sack of coins, brought with it",
        svg: sack(n(hirer[0] + 4.4), n(hirer[1] + 0.6), 0.6),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.52, walk, 0]
          ]
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `paid at once: coins going to the worker's place ${i + 1}`,
          svg: coins(n(worker[0] + 3.4 + i * 0.4), n(worker[1] + 0.8), 2),
          keys: track({
            opacity: [
              [at3(0.7 + i * 0.012), 0],
              [at3(0.706 + i * 0.012), 1]
            ],
            xy: [
              [at3(0.7 + i * 0.012), n(hirer[0] + walk + 3 - worker[0] - 3.4 - i * 0.4), -1.6],
              [at3(0.74 + i * 0.012), 0, 0]
            ]
          })
        })
      ),
      { name: "paid: a soft golden ring about the worker's place", svg: care(worker[0], n(worker[1] + 0.4), 4, 2.4, SOFT_GOLD), keys: showAt(0.78, 0.792), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [62.4, 96.4],
            [70, 95.6]
          ],
          1.1
        ),
        keys: showAt(0.8, 0.81),
        loop: twinkle()
      },
      ...tellers("Ibn Umar", [10, 106.4], IBN_UMAR, [0.03, 0.1], [26, 101.4], [0.106, 0.96])
    ],
    words: linesOn(THREE, ["Ibn Umar: he said:", "Give the worker his wages", "Before his sweat dries."])
  };
}

// Oil from a blessed tree. Umar said: the Messenger of Allah ﷺ said: season with olive oil and anoint yourselves with
// it, for it comes from a blessed tree (Sunan Ibn Majah 3319). The words leave out the page's "(your food)". No one is
// drawn: a home in Madinah, a mat before it with a loaf on its dish and a jar of olive oil, and by them the place of one
// at its home; a hill on the right; his place, a golden ring, and Umar's place on the left. Umar's voice tells of it,
// and his voice, soft and golden, speaks. A drop of oil goes from the jar onto the loaf, and a soft
// golden sheen comes on it: seasoned. Another drop goes to the place of the one at its home, and a soft shining ring
// comes about it: anointed. An olive tree shows on the hill as it is told, a soft golden light comes about it, glints
// over it and a soft golden ring about it: a blessed tree.
function oilFromABlessedTree(): SignArt {
  const homeAt: [number, number] = [70, 98];
  const loaf: [number, number] = [64, 103.4];
  const jarAt: [number, number] = [76.4, 104.2];
  const eats: [number, number] = [88, 104];
  const tree: [number, number] = [140, 92];
  const mouth: [number, number] = [76.4, 98];
  return {
    kind: "oil-from-a-blessed-tree",
    ms: 8000,
    parts: [
      ...madinahDay([118, 17], [44, 24]),
      { name: "a hill on the right", svg: `<path d="M112 116 Q124 96 140 93 Q154 91 162 96 L162 116 Z" fill="#D8BE8C"/>` },
      ...palms([[16, 94, 10]], "Madinah"),
      { name: "a home", svg: home(homeAt[0], homeAt[1], 20, 13) },
      { name: "a mat before it", svg: mat(70, 104.4, 16) },
      { name: "a loaf on its dish, on the mat", svg: loafOnDish(loaf[0], loaf[1]) },
      { name: "a jar of olive oil, on the mat", svg: jar(jarAt[0], jarAt[1], 0.7) },
      { name: "a blessed tree: a soft golden light about the olive tree", svg: wash(n(tree[0] + 0.2), n(tree[1] - 16), 15, 13, "#FFE2A8", 0.14), keys: showAt(0.72, 0.76), loop: soft },
      { name: "an olive tree on the hill, showing as it is told", svg: oliveTree(tree[0], tree[1], 1.3), origin: { x: tree[0], y: tree[1] }, keys: showAt(0.69, 0.71), loop: { move: "sway", ms: 6000, angle: 0.8 } },
      {
        name: "olive oil from the jar, onto the loaf",
        svg: drop(mouth[0], mouth[1]),
        keys: track({
          opacity: [
            [0.14, 0],
            [0.146, 1],
            [0.2, 1],
            [0.206, 0]
          ],
          xy: [
            [0.14, 0, 0],
            [0.2, n(loaf[0] - mouth[0]), n(loaf[1] - 2.4 - mouth[1])]
          ]
        })
      },
      { name: "seasoned: a soft golden sheen on the loaf", svg: wash(loaf[0], n(loaf[1] - 1.6), 3.6, 1.6, "#FFD86A", 0.3), keys: showAt(0.2, 0.24), loop: soft },
      { name: "the place of one at its home", svg: someone(eats[0], eats[1], 1.6, AT_HOME) },
      {
        name: "olive oil from the jar, to its place",
        svg: drop(mouth[0], mouth[1]),
        keys: track({
          opacity: [
            [0.4, 0],
            [0.406, 1],
            [0.46, 1],
            [0.466, 0]
          ],
          xy: [
            [0.4, 0, 0],
            [0.46, n(eats[0] - mouth[0]), n(eats[1] - 2.6 - mouth[1])]
          ]
        })
      },
      { name: "anointed: a soft shining ring about its place", svg: care(eats[0], n(eats[1] + 0.2), 3.6, 2.6, "#D8C878"), keys: showAt(0.47, 0.49), loop: soft },
      {
        name: "and glints by it",
        svg: glints(
          [
            [84.6, 99],
            [91.4, 98.4]
          ],
          1
        ),
        keys: showAt(0.5, 0.51),
        loop: twinkle()
      },
      {
        name: "glints over the olive tree",
        svg: glints(
          [
            [128, 76],
            [140, 68],
            [152, 77]
          ],
          1.2
        ),
        keys: showAt(0.78, 0.79),
        loop: twinkle()
      },
      { name: "a soft golden ring about the olive tree", svg: care(tree[0], n(tree[1] + 0.4), 9, 2.6, SOFT_GOLD), keys: showAt(0.84, 0.852), loop: soft },
      ...tellers("Umar", [10, 106.4], UMAR, [0.03, 0.1], [28, 101.6], [0.106, 0.96])
    ],
    words: linesOn(THREE, ["Umar: he said: season with olive oil", "And anoint yourselves with it, for it", "Comes from a blessed tree."])
  };
}

// Faith, then the Quran. Jundub ibn Abdullah said: we were with the Prophet ﷺ, and we were strong youths, so we
// learned faith before we learned Quran. Then we learned Quran and our faith increased thereby (Sunan Ibn Majah 61). No
// one is drawn: in Madinah, the masjid far off and a palm; his place, a golden ring, and Jundub's place by it. Jundub's
// voice tells of it. The places of four more young ones come quickly and sit with him: strong youths. His voice, soft
// and golden, teaches, and a soft light comes within each of their places: faith. His voice recites and their voices
// recite after it: the Quran. The light within each place grows larger and brighter, with glints: their faith
// increased.
function faithThenTheQuran(): SignArt {
  const his: [number, number] = [56, 99.6];
  const jundub: [number, number] = [72, 102.8];
  const young: [number, number][] = [
    [83, 105],
    [94, 103.4],
    [105, 105.4],
    [116, 103.2]
  ];
  const all: [number, number][] = [jundub, ...young];
  return {
    kind: "faith-then-the-quran",
    ms: 10000,
    parts: [
      ...madinahDay([30, 18], [104, 25]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(112, 84, 0.55) },
      ...palms(
        [
          [40, 96, 11],
          [150, 95, 10]
        ],
        "Madinah"
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden: teaching, then reciting", svg: arcs(n(his[0] + 3), n(his[1] - 2.8), SOFT_GOLD), keys: voice([[0.416, 0.96]]), loop: speaking },
      { name: "Jundub's place, sitting with him", svg: someone(jundub[0], jundub[1], 1.7, JUNDUB) },
      { name: "Jundub's voice: telling of it", svg: arcs(n(jundub[0] + 2.4), n(jundub[1] - 3.4), JUNDUB), keys: voice([[0.03, 0.164]]), loop: speaking },
      ...young.map(
        ([x, y], i): SignPart => ({
          name: `the place of a strong young one, coming quickly to sit with him ${i + 1}`,
          svg: someone(x, y, 1.7, YOUNG),
          keys: track({
            opacity: [
              [at3(0.222 + i * 0.016), 0],
              [at3(0.228 + i * 0.016), 1]
            ],
            xy: [
              [at3(0.222 + i * 0.016), 40, 0],
              [at3(0.27 + i * 0.016), 0, 0]
            ]
          }),
          loop: { move: "bob", ms: 2400 + i * 260, y: 0.3, phase: i / 4 }
        })
      ),
      {
        name: "faith: a soft light within each of their places",
        svg: all.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.75" fill="#FFD86A"/>`).join(""),
        keys: track({
          opacity: [
            [0.43, 0],
            [0.47, 1],
            [0.82, 1],
            [0.86, 0]
          ]
        })
      },
      {
        name: "the Quran: their voices, soft and golden, reciting after his",
        svg: all.map(([x, y]) => arcs(n(x + 2.4), n(y - 3.4), SOFT_GOLD)).join(""),
        keys: showFor(0.64, 0.646, 0.74, 0.746),
        loop: speaking
      },
      {
        name: "their faith, increased: a larger, brighter light within each place",
        svg: all.map(([x, y]) => `${glow(x, y, 3.4, "#FFE7A0", 0.3)}<circle cx="${x}" cy="${y}" r="1.1" fill="#FFD86A"/>`).join(""),
        keys: showAt(0.82, 0.86),
        loop: soft
      },
      {
        name: "and glints over them",
        svg: glints(
          [
            [78, 96.4],
            [99, 96],
            [120, 96.6]
          ],
          1.2
        ),
        keys: showAt(0.88, 0.89),
        loop: twinkle()
      }
    ],
    words: linesOn(FIVE, ["Jundub: we were with the Prophet, and", "We were strong youths, so we learned", "Faith before we learned Quran.", "Then we learned Quran and our faith", "Increased thereby."])
  };
}

// Nothing like fasting. Abu Umamah said: I came to the Messenger of Allah ﷺ and said: tell me of something that I may
// take from you. He said: take to fasting, for there is nothing like it (Sunan an-Nasa'i 2220). The words leave out the
// page's "(learn)" and read "tell" for its "Tel l". No one is drawn: in Madinah, the masjid, and by it his place, a
// golden ring; Abu Umamah's home on the right. Abu Umamah's place comes to him, and its voice asks. His voice, soft
// and golden, speaks. The day goes on, the sun climbing high, and by Abu Umamah's home a dish and a cup stay covered:
// fasting; a soft light comes about its place. Then a soft golden glow, like no other, comes about its place, with a
// soft golden ring and glints: there is nothing like it.
function nothingLikeFasting(): SignArt {
  const his: [number, number] = [52, 101.6];
  const abuUmamah: [number, number] = [70, 103.6];
  const homeAt: [number, number] = [132, 98];
  return {
    kind: "nothing-like-fasting",
    ms: 10000,
    parts: [
      ...madinahDay(null, [96, 26]),
      {
        name: "the sun, climbing high as the day of fasting goes on",
        svg: sun(28, 44),
        keys: track({
          xy: [
            [0.62, 0, 0],
            [0.75, 54, -28]
          ]
        })
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(16, 92, 0.62) },
      ...palms([[96, 94, 10]], "Madinah"),
      { name: "Abu Umamah's home", svg: home(homeAt[0], homeAt[1], 20, 13) },
      { name: "fasting: a dish and a cup by its home, left covered", svg: coveredDish(n(homeAt[0] - 14), 104.6), keys: showAt(0.62, 0.64) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.8), SOFT_GOLD), keys: voice([[0.612, 0.96]]), loop: speaking },
      { name: "a soft light about Abu Umamah's place as it fasts", svg: wash(abuUmamah[0], n(abuUmamah[1] - 1.6), 5.4, 4, "#FFF0C0", 0.2), keys: showAt(0.66, 0.7), loop: soft },
      {
        name: "Abu Umamah's place, coming to him",
        svg: someone(abuUmamah[0], abuUmamah[1], 1.6, ABU_UMAMAH),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.036, 1]
          ],
          xy: [
            [0.03, 52, -2],
            [0.15, 0, 0]
          ]
        })
      },
      { name: "Abu Umamah's voice: asking", svg: arcs(n(abuUmamah[0] + 2.4), n(abuUmamah[1] - 3.2), ABU_UMAMAH), keys: voice([[0.23, 0.608]]), loop: speaking },
      { name: "nothing like it: a soft golden glow about its place, like no other", svg: `${glow(abuUmamah[0], n(abuUmamah[1] - 2), 12, "#FFE2A8", 0.22)}${wash(abuUmamah[0], n(abuUmamah[1] - 2), 9, 7, "#FFE2A8", 0.14)}`, keys: showAt(0.82, 0.87), loop: soft },
      { name: "a soft golden ring about its place", svg: care(abuUmamah[0], n(abuUmamah[1] + 0.4), 4, 2.4, SOFT_GOLD), keys: showAt(0.88, 0.892), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [65, 95],
            [75.4, 94.2]
          ],
          1.2
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle()
      }
    ],
    words: linesOn(FIVE, ["Abu Umamah: I came to the Messenger of", "Allah and said: tell me of something", "That I may take from you.", "He said: take to fasting, for there", "Is nothing like it."])
  };
}

// Umm Sulaim's words. Anas ibn Malik said: Umm Sulaim came to the Prophet ﷺ and said: O Messenger of Allah, teach me
// some words that I may supplicate with during my prayer. He said: glorify Allah ten times, and praise Him ten times,
// and magnify Him ten times, then ask Him for what you need; He will say: yes, yes (Sunan an-Nasa'i 1299). The words
// leave out "O Messenger of Allah", the page's parentheses, "Him" and the last words, which the caption has. No one is
// drawn: in Madinah, the masjid, and by it his place, a golden ring; Umm Sulaim's home on the right, and her prayer mat
// before it; Anas's place on the left. Anas's voice tells of it. Umm Sulaim's place comes from her home to him, and its
// voice asks. His voice, soft and golden, speaks, and her place goes back to her prayer mat. Ten small sparks rise from
// it, then ten more, then ten more; then a larger spark rises: what she needs; and a soft golden ring comes about her
// place.
function ummSulaimsWords(): SignArt {
  const his: [number, number] = [50, 101.6];
  const homeAt: [number, number] = [141, 98];
  const atMat: [number, number] = [120, 103.8];
  const atHim: [number, number] = [64, 103.6];
  const back = n(atMat[0] - atHim[0]);
  const sets: [string, string, number][] = [
    ["glorify: ten small sparks rising from her place", "#F4D060", 0.53],
    ["praise: ten more small sparks rising from her place", "#EEBE40", 0.665],
    ["magnify: ten more small sparks rising from her place", "#E8AC30", 0.72]
  ];
  return {
    kind: "umm-sulaims-words",
    ms: 11000,
    parts: [
      ...madinahDay([28, 17], [100, 24]),
      { name: "the masjid of Madinah", svg: madinahMasjid(18, 92, 0.6) },
      ...palms([[94, 94, 10]], "Madinah"),
      { name: "Umm Sulaim's home", svg: home(homeAt[0], homeAt[1], 18, 12) },
      { name: "her prayer mat, before her home", svg: blueMat(atMat[0], n(atMat[1] + 0.6)) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.8), SOFT_GOLD), keys: voice([[0.5, 0.96]]), loop: speaking },
      {
        name: "Umm Sulaim's place, coming to him, then going back to her prayer mat",
        svg: someone(atHim[0], atHim[1], 1.6, UMM_SULAIM),
        keys: track({
          xy: [
            [0.03, back, 0.2],
            [0.12, 0, 0],
            [0.5, 0, 0],
            [0.56, back, 0.2]
          ]
        })
      },
      { name: "Umm Sulaim's voice: asking", svg: arcs(n(atHim[0] + 2.4), n(atHim[1] - 3.2), UMM_SULAIM), keys: voice([[0.18, 0.44]]), loop: speaking },
      ...sets.map(
        ([name, fill, t], i): SignPart => ({
          name,
          svg: tenSparks(atMat[0], n(atMat[1] - 5 - i * 3.2), fill),
          keys: { at: [0, t, at3(t + 0.006), at3(t + 0.04)], opacity: [0, 0, 1, 1], y: [0, 0, -0.6, -3] }
        })
      ),
      { name: "then what she needs: a larger spark rising from her place", svg: glints([[atMat[0], n(atMat[1] - 5)]], 1.5), keys: sparkStays(0.83, 0.87, 14), loop: twinkle() },
      { name: "a soft golden ring about her place", svg: care(atMat[0], n(atMat[1] + 0.4), 4, 2.4, SOFT_GOLD), keys: showAt(0.9, 0.912), loop: soft },
      { name: "Anas's place", svg: someone(10, 106.4, 1.5, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(12.4, 103.2, ANAS), keys: voice([[0.03, 0.1]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Anas: Umm Sulaim came to the Prophet",
      "And said: teach me some words that I",
      "May supplicate with during my prayer.",
      "He said: glorify Allah ten times, and",
      "Praise ten times, and magnify ten times,",
      "Then ask for what you need."
    ])
  };
}

// A stranger asks. Abu Rifa'ah said: I came to the Messenger of Allah ﷺ while he was delivering a khutbah, and said: O
// Messenger of Allah, a stranger has come to ask about his religion, for he does not know what his religion is. The
// Messenger of Allah ﷺ stopped delivering his khutbah and turned to me. A chair was brought, and I think its legs were
// of iron. The Messenger of Allah ﷺ sat down on it and started to teach me what Allah has taught him, then he went and
// completed his khutbah (Sunan an-Nasa'i 5377). The words leave out "O Messenger of Allah", "for he does not know what
// his religion is", the legs of iron and the second "delivering". No one is drawn: the masjid of Madinah, and Abu Rifa'ah's place coming to it.
// The pulpit shows, with his place, a golden ring, on it, and the places of the folk sitting before it; his voice, soft
// and golden, speaks from it: the khutbah. Abu Rifa'ah's voice asks, and the voice from the pulpit stops. His place comes down from the
// pulpit to Abu Rifa'ah's place; a chair is brought, and his place sits on it, and his voice, soft and golden, teaches;
// a soft light with glints comes about Abu Rifa'ah's place. Then his place goes back to the pulpit, and the voice from
// it speaks again, to the end of the khutbah.
function aStrangerAsks(): SignArt {
  const top: [number, number] = [41.4, 95.4];
  const abuRifaah: [number, number] = [126, 104.4];
  const seat: [number, number] = [116, 100.6];
  const folk: [number, number][] = [
    [58, 101.4],
    [68, 101.8],
    [78, 101.4],
    [88, 101.8],
    [63, 106.2],
    [73, 106.6],
    [83, 106.2],
    [93, 106.6]
  ];
  const toSeat: [number, number] = [n(seat[0] - top[0]), n(seat[1] - top[1])];
  const beside: [number, number] = [n(seat[0] - 2 - top[0]), n(abuRifaah[1] - 0.2 - top[1])];
  return {
    kind: "a-stranger-asks",
    ms: 12000,
    parts: [
      ...madinahDay([136, 17], [70, 24]),
      { name: "the masjid of Madinah", svg: madinahMasjid(14, 92, 0.66) },
      ...palms([[150, 95, 10]], "Madinah"),
      { name: "the pulpit, showing as the khutbah is told", svg: pulpit(38, 104.6), keys: showAt(0.125, 0.14) },
      {
        name: "the places of the folk, sitting for the khutbah",
        svg: folk.map(([x, y]) => someone(x, y, 1.4, FOLK)).join(""),
        keys: showAt(0.125, 0.14)
      },
      {
        name: "his place, a golden ring: on the pulpit, then by Abu Rifa'ah, then on the chair, then on the pulpit again",
        svg: ring(top[0], top[1], 2, GOLD),
        keys: track({
          opacity: [
            [0.125, 0],
            [0.14, 1]
          ],
          xy: [
            [0.468, 0, 0],
            [0.52, beside[0], beside[1]],
            [0.67, beside[0], beside[1]],
            [0.688, toSeat[0], toSeat[1]],
            [0.888, toSeat[0], toSeat[1]],
            [0.93, 0, 0]
          ]
        })
      },
      { name: "his voice from the pulpit, soft and golden: the khutbah, stopped, then completed", svg: arcs(n(top[0] + 3), n(top[1] - 2.8), SOFT_GOLD), keys: voice([[0.125, 0.452], [0.932, 0.962]]), loop: speaking },
      {
        name: "a chair, brought",
        svg: chair(seat[0], n(seat[1] + 4.2)),
        keys: track({
          opacity: [
            [0.566, 0],
            [0.596, 1]
          ],
          xy: [
            [0.566, 4, 0],
            [0.606, 0, 0]
          ]
        })
      },
      { name: "his voice, soft and golden: teaching", svg: arcs(n(seat[0] + 2.8), n(seat[1] - 2.8), SOFT_GOLD), keys: voice([[0.778, 0.886]]), loop: speaking },
      { name: "taught: a soft light about Abu Rifa'ah's place", svg: wash(abuRifaah[0], n(abuRifaah[1] - 1.6), 5.4, 4, "#FFF0C0", 0.22), keys: showAt(0.8, 0.84), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [122, 97.6],
            [130.4, 97]
          ],
          1.1
        ),
        keys: showAt(0.826, 0.836),
        loop: twinkle()
      },
      {
        name: "Abu Rifa'ah's place, coming to the masjid",
        svg: someone(abuRifaah[0], abuRifaah[1], 1.6, ABU_RIFAAH),
        keys: track({
          opacity: [
            [0.015, 0],
            [0.021, 1]
          ],
          xy: [
            [0.015, 34, 0],
            [0.08, 0, 0]
          ]
        })
      },
      { name: "Abu Rifa'ah's voice: asking", svg: arcsLeft(n(abuRifaah[0] - 2.4), n(abuRifaah[1] - 3.2), ABU_RIFAAH), keys: voice([[0.235, 0.39]]), loop: speaking }
    ],
    words: linesOn(NINE, [
      "Abu Rifa'ah: I came to the Messenger of",
      "Allah while he was delivering a Khutbah,",
      "And said: a stranger has come to ask",
      "About his religion. The Messenger of",
      "Allah stopped his Khutbah and turned to",
      "Me. A chair was brought. The Messenger",
      "Of Allah sat down on it and started to",
      "Teach me what Allah has taught him, then",
      "He went and completed his Khutbah."
    ])
  };
}

export const GROW_ART = {
  "pay-the-worker": payTheWorker,
  "oil-from-a-blessed-tree": oilFromABlessedTree,
  "faith-then-the-quran": faithThenTheQuran,
  "nothing-like-fasting": nothingLikeFasting,
  "umm-sulaims-words": ummSulaimsWords,
  "a-stranger-asks": aStrangerAsks
};
