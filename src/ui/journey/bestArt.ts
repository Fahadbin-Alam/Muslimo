import { cloud, glow, n, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { at3 } from "./storyArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, DAWN, farOff, gardenIn, jug, lightIn, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, FOLK, glints, linesOn, places, plainLand, SEVEN, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { GREY } from "./lovedArt";
import { QUICK } from "./dailyArt";
import { kaaba } from "./rewardArt";

/**
 * The best: the best of his followers, his own generation, then those who follow them, and those who come later and
 * do not keep their vows; Ibn Mas'ud, who knew where every surah was revealed and would go wherever camels can reach to
 * learn from one who knew more; the simple path to Paradise of an-Nu'man ibn Qawqal; what whispers in the hearts and
 * is forgiven, unless it is done or said; Maghrib and Isha prayed together at Muzdalifah; and Friday, the best day on
 * which the sun has risen. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring
 * or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. No one rides
 * the camel. Nothing is drawn for Allah, no book or page is drawn, and nothing comes down from the sky: a prayer or a
 * du'a is a spark that rises, what is good is a light, glints and a soft golden ring, and what is not to be done a grey
 * dashed ring. Paradise is only far off, in a soft circle of light with no sun in it. No name, word or number is
 * written.
 */

/** The words of two lines. */
const TWO = [
  [0.02, 0.48],
  [0.5, 1]
] as const;

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of eight lines, the last of them longer. */
const EIGHT_LONG_LAST = [
  [0.02, 0.126],
  [0.136, 0.242],
  [0.252, 0.358],
  [0.368, 0.474],
  [0.484, 0.59],
  [0.6, 0.706],
  [0.716, 0.822],
  [0.832, 1]
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

/** Imran ibn Husayn's place and voice: a muted purple. */
const IMRAN = "#6A5E8E";
/** Ibn Mas'ud's place and voice: a deep teal. */
const MASUD = "#3E6E7A";
/** Jabir ibn Abdullah's place and voice: a slate blue. */
const JABIR = "#4E6E8E";
/** An-Nu'man ibn Qawqal's place and voice: a warm brown. */
const NUMAN = "#8A5A3A";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** Abu Ayyub al-Ansari's place and voice: a deep green. */
const AYYUB = "#4E7A5A";
/** The place of one who does the good deeds of a story: a plain green. */
const ONE = "#5E8A52";
/** The places of those who come later: a dull grey-brown. */
const LATER = "#8E7E6E";
/** The place of one who knows more: a deep blue. */
const KNOWS = "#4E5E9A";

/** A lane along the given points, the places going along it a little above its middle. */
const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** A ring like `ring`, grey and broken on both sides: a vow not kept. */
const brokenRing = (x: number, y: number, r: number) => {
  const ry = n(r * 0.55);
  return (
    `<path d="M${n(x - r * 0.94)} ${n(y - ry * 0.34)} A${r} ${ry} 0 0 1 ${n(x + r * 0.5)} ${n(y - ry * 0.86)}" stroke="#6E6A66" stroke-width="0.9" stroke-dasharray="1 0.8" fill="none"/>` +
    `<path d="M${n(x + r * 0.94)} ${n(y + ry * 0.34)} A${r} ${ry} 0 0 1 ${n(x - r * 0.5)} ${n(y + ry * 0.86)}" stroke="#6E6A66" stroke-width="0.9" stroke-dasharray="1 0.8" fill="none"/>`
  );
};

/** A grey flicker within a place at (x, y), with small grey specks about it: what whispers within. */
const whispers = (x: number, y: number) =>
  glow(x, n(y - 0.2), 2.6, GREY, 0.34) +
  [
    [-1.2, -0.6],
    [1.1, -0.9],
    [0.2, 0.9]
  ]
    .map(([dx, dy]) => `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="0.32" fill="#7A7672"/>`)
    .join("");

/** A heap of grey stones on the ground, its middle at (x, y): what is forbidden. */
const greyHeap = (x: number, y: number) =>
  [
    [-2, 0, 1.4],
    [0.2, 0.2, 1.6],
    [2.2, 0, 1.3],
    [-0.9, -1.4, 1.2],
    [1.2, -1.4, 1.2],
    [0.2, -2.6, 1]
  ]
    .map(([dx, dy, r], i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="${r}" ry="${n(r * 0.72)}" fill="${i % 2 ? "#8E8A86" : "#7A7672"}"/>`)
    .join("");

/** A few dates together, their middle at (x, y). */
const fewDates = (x: number, y: number) =>
  [
    [-0.9, 0],
    [0.9, 0],
    [0, -0.9]
  ]
    .map(([dx, dy], i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="0.65" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`)
    .join("");

/** Low sand dunes across the land. */
const dunes = () =>
  `<path d="M0 82 Q22 75 44 80 T88 79 T132 77 T160 76 L160 120 L0 120 Z" fill="#E6C998" opacity="0.8"/>` +
  `<path d="M60 96 Q86 88 112 93 T160 90 L160 120 L60 120 Z" fill="#E1C08A" opacity="0.6"/>`;

// The best generation. Imran ibn Husayn said that the Messenger of Allah ﷺ said: the best of my followers are those
// living in my generation (i.e. my contemporaries), and then those who will follow the latter. Imran added: I do not
// remember whether he mentioned two or three generations after his generation. Then the Prophet ﷺ added: there will
// come after you, people who will bear witness without being asked to do so, and will be treacherous and
// untrustworthy, and they will vow and never fulfill their vows (Sahih al-Bukhari 3650; "treacherous and
// untrustworthy" and the last words of the hadith are left out of the lines). No one is drawn: the masjid of Madinah,
// his place, a golden ring, and the places of his generation about it, Imran's among them; and a long way going on
// from the masjid across the land: the time after him. Imran's voice tells of it, and his voice, soft and golden,
// speaks. A soft golden ring comes about his generation, with glints: the best. Along the way a home and the places of
// the next generation come, in a softer ring; then Imran's voice: he does not remember. A third home and its places
// come, and then, faint and dotted, the places of a fourth come and go: two or three. Far along the way the places of
// those who come later arrive; quick grey voices speak from them with no voice asking them, and a grey dashed ring
// comes about them. Small soft golden rings of their vows come by them, fade, and are left broken and grey.
function bestGeneration(): SignArt {
  const his: [number, number] = [22, 107.4];
  const imran: [number, number] = [31, 111.4];
  const first: [number, number][] = [
    [9, 110.6],
    [13, 104.6],
    [36, 104.2],
    [45, 108.6],
    [42, 114.8],
    [19, 115.2]
  ];
  const second: [number, number][] = [
    [62, 104.4],
    [70, 100.4],
    [78, 103.2],
    [85, 98.6]
  ];
  const third: [number, number][] = [
    [95, 96.2],
    [102, 92.8],
    [109, 95.4],
    [101, 99.4]
  ];
  const fourth: [number, number][] = [
    [117, 90.6],
    [123, 88],
    [128, 91.4]
  ];
  const later: [number, number][] = [
    [137, 85.4],
    [144, 82.2],
    [151, 85],
    [145, 88.6]
  ];
  const vowed: [number, number][] = [later[0], later[2]];
  return {
    kind: "best-generation",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(60, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [56, 117],
          [96, 118],
          [150, 116]
        ])
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 99, 0.8) },
      {
        name: "a long way on from the masjid: the time after him",
        svg: lane([
          [48, 105.4],
          [70, 100.2],
          [92, 94.6],
          [114, 89.2],
          [136, 84.2],
          [160, 79.4]
        ])
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Imran's place, among them", svg: someone(imran[0], imran[1], 1.5, IMRAN) },
      { name: "the places of his generation, about him", svg: places(first, 1.5) },
      { name: "Imran's voice: telling of it", svg: arcs(n(imran[0] + 3.2), n(imran[1] - 2.8), IMRAN), keys: showFor(0.014, 0.02, 0.07, 0.076), loop: speaking },
      { name: "his voice, soft and golden: the best of my followers", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.03, 0.036, 0.284, 0.29), loop: speaking },
      { name: "the best: a soft golden ring about his generation", svg: care(27, 109.8, 22, 7.4, SOFT_GOLD), keys: showAt(0.128, 0.15), loop: soft },
      {
        name: "and glints over it",
        svg: glints([
          [16, 101.4],
          [28, 100.6],
          [40, 101.6]
        ]),
        keys: showAt(0.152, 0.166),
        loop: twinkle()
      },
      { name: "a home of the next generation, along the way", svg: home(76, 92.4, 11, 7.6), keys: showAt(0.232, 0.246) },
      { name: "the places of those who follow them", svg: places(second, 1.4), keys: showAt(0.24, 0.256) },
      { name: "a softer golden ring about them", svg: `<g opacity="0.7">${care(73.5, 101.6, 14, 5.4, SOFT_GOLD)}</g>`, keys: showAt(0.262, 0.28), loop: soft },
      { name: "Imran's voice: I do not remember", svg: arcs(n(imran[0] + 3.2), n(imran[1] - 2.8), IMRAN), keys: showFor(0.341, 0.347, 0.5, 0.506), loop: speaking },
      { name: "a home of a third generation, further along", svg: home(106, 86.2, 10, 7), keys: showAt(0.452, 0.466) },
      { name: "the places of a third generation", svg: places(third, 1.3), keys: showAt(0.456, 0.47) },
      { name: "a fainter golden ring about them", svg: `<g opacity="0.45">${care(102, 96.4, 10.6, 4.6, SOFT_GOLD)}</g>`, keys: showAt(0.474, 0.488), loop: soft },
      {
        name: "or three: the faint dotted places of a fourth, coming and going",
        svg: `<g opacity="0.55">${places(fourth, 1.2, "#B8A88C")}${care(122.6, 90.2, 8.4, 3.6, "#D8C8A0")}</g>`,
        keys: showAt(0.49, 0.506),
        loop: { move: "twinkle", ms: 1500, low: 0.15 }
      },
      { name: "his voice, soft and golden: there will come after you", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.6, 0.606, 0.95, 0.956), loop: speaking },
      { name: "a home far along the way, later", svg: home(150, 76.4, 10, 7), keys: showAt(0.598, 0.612) },
      {
        name: "the places of those who come after, arriving",
        svg: places(later, 1.4, LATER),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.61, 1]
          ],
          xy: [
            [0.6, 10, -1],
            [0.62, 0, 0]
          ]
        })
      },
      {
        name: "their quick grey voices: bearing witness, with no voice asking them",
        svg: arcsLeft(n(later[0][0] - 2.6), n(later[0][1] - 2.4), GREY) + arcs(n(later[2][0] + 2.6), n(later[2][1] - 2.4), GREY),
        keys: showFor(0.67, 0.676, 0.834, 0.84),
        loop: QUICK
      },
      { name: "without being asked: a grey dashed ring about them", svg: greyRing(144, 85.8, 11.6, 5.8), keys: showAt(0.78, 0.796) },
      { name: "their vows: small soft golden rings by them", svg: vowed.map(([x, y]) => ring(x, n(y + 0.4), 3.2, SOFT_GOLD)).join(""), keys: showFor(0.886, 0.896, 0.912, 0.924) },
      { name: "never fulfilled: the rings left broken and grey", svg: vowed.map(([x, y]) => brokenRing(x, n(y + 0.4), 3.2)).join(""), keys: showAt(0.92, 0.934) }
    ],
    words: linesOn(NINE, [
      "Imran: he said: the best of my followers",
      "Are those living in my generation, and",
      "Then those who will follow the latter.",
      "Imran: I do not remember whether he",
      "Mentioned two or three generations after",
      "His generation. He added: there will come",
      "After you, people who will bear witness",
      "Without being asked to do so, and they",
      "Will vow and never fulfill their vows."
    ])
  };
}

// Where camels can reach. Abdullah ibn Mas'ud said: by Allah other than Whom none has the right to be worshipped! There
// is no surah revealed in Allah's Book but I know at what place it was revealed; and there is no ayah revealed in
// Allah's Book but I know about whom it was revealed. And if I know that there is somebody who knows Allah's Book
// better than I, and he is at a place that camels can reach, I would go to him (Sahih al-Bukhari 5002; the oath is
// left out of the lines, and in Arabic he says: I would ride to him). No one is drawn, and no one rides: Ibn Mas'ud's
// home and his place by it; far off, the hills of Makkah with the Ka'bah, and the masjid of Madinah with its palms;
// dunes between. Ibn Mas'ud's voice tells of it, and small lights gather about his place: what he knows. Faint soft
// golden ways go from his place to Makkah and to Madinah, and soft lights come on over them: where each surah was
// revealed. Faint places show by them, and small lights come on in them: about whom. Far off beyond the dunes, the
// place of one who knows more shows in a soft golden light, and a long way to it across the dunes. A camel comes by
// his home and walks along the way, and his place goes along beside it to the far place; a soft golden ring comes
// about the two places.
function camelsCanReach(): SignArt {
  const far: [number, number] = [146, 91];
  const known: [number, number][] = [
    [26, 101.8],
    [33.6, 101.4],
    [23.4, 105.6],
    [36.8, 105.2],
    [30, 99.8]
  ];
  const about: [number, number][] = [
    [39, 71.2],
    [54, 71.4],
    [80, 71.4],
    [99, 71.6]
  ];
  // The way across the dunes, and when the camel and his place are at each point of it.
  const path: [number, number][] = [
    [42, 106.4],
    [70, 102.2],
    [100, 98],
    [136, 93.4]
  ];
  const times = [0.85, 0.878, 0.906, 0.935];
  const camelWalk = along(path, times);
  const beside: [number, number][] = path.map(([x, y]) => [n(x - 8), n(y + 1.6)]);
  const goes = along(beside, times);
  return {
    kind: "camels-can-reach",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(108, 30, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the hills of Makkah, far off",
        svg: peaks(
          [
            [32, 11, 15],
            [46, 15, 16],
            [60, 10, 13]
          ],
          67,
          "#A88A64",
          false
        )
      },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      { name: "dunes", svg: dunes() },
      { name: "the Ka'bah, far off", svg: kaaba(46, 67.6, 0.55) },
      { name: "the masjid of Madinah, far off", svg: madinahMasjid(84, 68.4, 0.26) },
      ...palms(
        [
          [81, 68.6, 4.6],
          [100, 68.4, 4.2]
        ],
        "Madinah, far off"
      ),
      { name: "Ibn Mas'ud's home", svg: home(17, 102, 15, 10.6) },
      { name: "Ibn Mas'ud's place, by it, going along beside the camel", svg: someone(beside[0][0], beside[0][1], 1.5, MASUD), keys: track({ xy: goes }) },
      { name: "Ibn Mas'ud's voice: telling of it", svg: arcs(n(beside[0][0] + 3.2), n(beside[0][1] - 2.8), MASUD), keys: showFor(0.022, 0.028, 0.774, 0.78), loop: speaking },
      ...known.map(([x, y], i): SignPart => ({ name: `what he knows: a small light about his place ${i + 1}`, svg: glints([[x, y]], 1), keys: showAt(at3(0.03 + i * 0.01), at3(0.04 + i * 0.01)), loop: twinkle(1300 + i * 120) })),
      { name: "a faint soft golden way to Makkah", svg: `<g opacity="0.7">${way("M30 104 Q36 86 45 70", SOFT_GOLD, 0.7)}</g>`, keys: showAt(0.14, 0.16) },
      { name: "a faint soft golden way to Madinah", svg: `<g opacity="0.7">${way("M32 104 Q58 86 88 70", SOFT_GOLD, 0.7)}</g>`, keys: showAt(0.146, 0.166) },
      { name: "where it was revealed: a soft light over Makkah", svg: lightIn(46, 61, 3.4), keys: showAt(0.17, 0.184), loop: soft },
      { name: "and a soft light over Madinah", svg: lightIn(90, 61.4, 3.4), keys: showAt(0.18, 0.194), loop: soft },
      { name: "faint places by them, far off", svg: `<g opacity="0.75">${places(about, 0.9)}</g>`, keys: showAt(0.372, 0.39) },
      { name: "about whom: small lights in those places", svg: glints(about.map(([x, y]) => [x, n(y - 2.2)]), 0.7), keys: showAt(0.49, 0.506), loop: twinkle() },
      { name: "the soft golden light of one who knows more, far off", svg: glow(far[0], far[1], 6, WARM, 0.36), keys: showAt(0.606, 0.63), loop: soft },
      { name: "the place of one who knows more, far off", svg: someone(far[0], far[1], 1.4, KNOWS), keys: showAt(0.61, 0.632) },
      {
        name: "a long way across the dunes, to that place",
        svg: way(`M${path.map(([x, y]) => `${x} ${n(y + 1.4)}`).join(" L")} L${n(far[0] - 3)} ${n(far[1] + 1.4)}`, "#C9A66E", 1),
        keys: showAt(0.72, 0.756)
      },
      {
        name: "a camel, by his home, walking along the way",
        svg: camel(path[0][0], path[0][1], 0.13),
        keys: track({
          opacity: [
            [0.834, 0],
            [0.846, 1]
          ],
          xy: camelWalk
        }),
        loop: { move: "bob", ms: 900, y: 0.4 }
      },
      { name: "a soft golden ring about the two places, together", svg: care(n(far[0] - 4), n(far[1] + 1.8), 9, 3.8, SOFT_GOLD), keys: showAt(0.94, 0.955), loop: soft }
    ],
    words: linesOn(EIGHT_LONG_LAST, [
      "Ibn Mas'ud: there is no surah revealed in",
      "Allah's Book but I know at what place it",
      "Was revealed; and there is no ayah",
      "Revealed in Allah's Book but I know about",
      "Whom it was revealed. And if I know that",
      "There is somebody who knows Allah's Book",
      "Better than I, and he is at a place that",
      "Camels can reach, I would go to him."
    ])
  };
}

// The simple path. Jabir said that Nu'man b. Qaufal (an-Nu'man ibn Qawqal) came to the Prophet ﷺ and said: would I
// enter Paradise if I say the obligatory prayers and deny myself that which is forbidden and treat that as lawful
// what has been made permissible (by the Shari'ah)? The Prophet ﷺ replied in the affirmative (Sahih Muslim 15a). No one
// is drawn: the masjid of Madinah, his place, a golden ring, and Jabir's place by it. Jabir's voice tells of it. The
// place of an-Nu'man comes to him, and its voice asks; far off, faint, Paradise shows: a soft circle of light. Sparks
// of the obligatory prayers rise from its place, one after another. A heap of grey stones shows by it, and a grey
// dashed ring about it: what is forbidden; its place keeps away from it. Dates and a jug of water show: what is
// permitted; its place goes to them, and a soft light comes on them. His voice, soft and golden, replies: Paradise
// shows bright, a soft golden ring comes about an-Nu'man's place, and glints over it.
function simplePath(): SignArt {
  const his: [number, number] = [30, 107.6];
  const jabir: [number, number] = [16, 112];
  const start: [number, number] = [100, 104];
  // An-Nu'man's place: coming to him, keeping away from the grey heap, and going to what is permitted.
  const comes: [number, number, number][] = [
    [0.03, 0, 0],
    [0.09, -48, 3.4],
    [0.47, -48, 3.4],
    [0.52, -51, 2.4],
    [0.6, -51, 2.4],
    [0.66, -24, -2.4]
  ];
  const end: [number, number] = [n(start[0] - 24), n(start[1] - 2.4)];
  const heap: [number, number] = [86, 113.4];
  return {
    kind: "simple-path",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(70, 18) },
      { name: "a cloud", svg: cloud(100, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [52, 118],
          [100, 117],
          [150, 116]
        ])
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 99, 0.85) },
      ...palms([[136, 99, 14]]),
      { name: "a home in Madinah, where Ibn Qawqal came from", svg: home(118, 98.4, 13, 9) },
      { name: "Paradise far off, faint: what it asked about", svg: `<g opacity="0.4">${farOff(136, 30, 10)}${gardenIn(136, 30, 10)}</g>`, keys: showAt(0.2, 0.23) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Jabir's place, by him", svg: someone(jabir[0], jabir[1], 1.5, JABIR) },
      { name: "Jabir's voice: telling of it", svg: arcs(n(jabir[0] + 3.2), n(jabir[1] - 2.8), JABIR), keys: showFor(0.022, 0.028, 0.1, 0.106), loop: speaking },
      { name: "what is forbidden: a heap of grey stones", svg: big(greyHeap(heap[0], heap[1]), heap[0], heap[1], 1.5), keys: showAt(0.37, 0.388) },
      { name: "and a grey dashed ring about it", svg: greyRing(heap[0], n(heap[1] - 1.4), 6.4, 3.6), keys: showAt(0.456, 0.47) },
      { name: "what is permitted: dates and a jug of water", svg: big(fewDates(84, 101.6) + jug(90, 101.8), 87, 101.6, 1.6), keys: showAt(0.598, 0.616) },
      { name: "and a soft light on them", svg: lightIn(86.4, 93.8, 4.4), keys: showAt(0.744, 0.76), loop: soft },
      { name: "Ibn Qawqal's place: coming to him", svg: someone(start[0], start[1], 1.5, NUMAN), keys: track({ xy: comes }) },
      {
        name: "Ibn Qawqal's voice: asking",
        svg: arcsLeft(n(start[0] - 3.2), n(start[1] - 2.8), NUMAN),
        keys: track({
          opacity: [
            [0.166, 0],
            [0.172, 1],
            [0.82, 1],
            [0.826, 0]
          ],
          xy: comes
        }),
        loop: speaking
      },
      ...[0, 1, 2, 3, 4].map((i) => spark(`the obligatory prayers: a spark rising ${i + 1}`, 48 + i * 2, 103, at3(0.31 + i * 0.012), at3(0.34 + i * 0.012))),
      { name: "his voice, soft and golden: replying yes", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.886, 0.892, 0.95, 0.956), loop: speaking },
      { name: "Paradise far off, bright", svg: farOff(136, 30, 10) + gardenIn(136, 30, 10), keys: showAt(0.894, 0.91) },
      { name: "a soft golden ring about Ibn Qawqal's place", svg: ring(end[0], n(end[1] + 0.6), 3.4, SOFT_GOLD), keys: showAt(0.912, 0.926), loop: soft },
      {
        name: "and glints over it",
        svg: glints([
          [n(end[0] - 3.4), n(end[1] - 4.6)],
          [n(end[0] + 3.4), n(end[1] - 4.4)],
          [end[0], n(end[1] - 6.4)]
        ]),
        keys: showAt(0.93, 0.944),
        loop: twinkle()
      }
    ],
    words: linesOn(SEVEN, [
      "Jabir: an-Nu'man ibn Qawqal came to him",
      "And said: would I enter Paradise if I",
      "Say the obligatory prayers and deny",
      "Myself that which is forbidden and treat",
      "That as lawful what has been",
      "Made permissible?",
      "He replied in the affirmative."
    ])
  };
}

// What whispers in the hearts. Abu Hurairah said that the Prophet ﷺ said: Allah has accepted my invocation to forgive
// what whispers in the hearts of my followers, unless they put it to action or utter it (Sahih al-Bukhari 2528; and
// Sahih Muslim 127a: Allah forgave my people the evil promptings which arise within their hearts as long as they did
// not speak about them or did not act upon them). No one is drawn: the masjid of Madinah, his place, a golden ring, and
// Abu Hurairah's place by it; a lane on through the town, with two homes and the places of two who live there. Abu
// Hurairah's voice tells of it, and his voice, soft and golden, speaks. A spark of his invocation rises from his place,
// and a soft light comes over the lane: forgiveness. A grey flicker shows in each of the two places: what whispers
// within. One of them speaks: a quick grey voice; and goes along a grey dashed way, and a grey dashed ring comes about
// it. The other keeps still and says nothing: its grey flicker fades, a soft golden ring comes about it, and glints.
function passingThoughts(): SignArt {
  const his: [number, number] = [20, 107.4];
  const hurairah: [number, number] = [34, 110.8];
  const keeps: [number, number] = [84, 106.6];
  const does: [number, number] = [116, 104.6];
  const goes: [number, number, number][] = [
    [0.79, 0, 0],
    [0.84, 28, -0.4]
  ];
  const there: [number, number] = [n(does[0] + 28), n(does[1] - 0.4)];
  return {
    kind: "passing-thoughts",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(104, 20) },
      { name: "a cloud", svg: cloud(46, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [50, 118],
          [100, 117],
          [148, 118]
        ])
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 99, 0.7) },
      { name: "a home along the lane", svg: home(82, 97.4, 13, 9) },
      { name: "another home along the lane", svg: home(122, 95.4, 13, 9) },
      {
        name: "a lane through the town",
        svg: lane([
          [42, 106.2],
          [80, 104.8],
          [118, 102.8],
          [158, 101]
        ])
      },
      { name: "a grey dashed way on, past the homes", svg: way(`M${n(does[0] + 2)} ${n(does[1] + 1.6)} Q130 ${n(does[1] + 2.6)} ${n(there[0] - 2)} ${n(there[1] + 1.6)}`, GREY, 0.8), keys: showAt(0.776, 0.79) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.022, 0.03, 0.2, 0.206), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.06, 0.068, 0.95, 0.958), loop: speaking },
      spark("his invocation: a spark rising", his[0], n(his[1] - 5), 0.28, 0.42),
      { name: "to forgive: a soft light over the lane", svg: wash(100, 104, 34, 7, WARM, 0.16), keys: showAt(0.38, 0.42), loop: soft },
      { name: "the place of one who keeps still", svg: someone(keeps[0], keeps[1], 2.3, ONE) },
      { name: "the place of one who does it", svg: someone(does[0], does[1], 2.3, FOLK), keys: track({ xy: goes }) },
      { name: "what whispers within: a grey flicker in the one who keeps still, fading", svg: whispers(keeps[0], keeps[1]), keys: showFor(0.52, 0.55, 0.87, 0.9), loop: { move: "twinkle", ms: 700, low: 0.35 } },
      {
        name: "what whispers within: a grey flicker in the one who does it",
        svg: whispers(does[0], does[1]),
        keys: track({
          opacity: [
            [0.526, 0],
            [0.556, 1]
          ],
          xy: goes
        }),
        loop: { move: "twinkle", ms: 760, low: 0.35 }
      },
      {
        name: "uttering it: its quick grey voice",
        svg: arcs(n(does[0] + 3.4), n(does[1] - 3), GREY),
        keys: track({
          opacity: [
            [0.762, 0],
            [0.772, 1]
          ],
          xy: goes
        }),
        loop: QUICK
      },
      { name: "putting it to action: a grey dashed ring about it", svg: greyRing(there[0], n(there[1] + 0.4), 5, 3.2), keys: showAt(0.85, 0.864) },
      { name: "forgiven: a soft golden ring about the one who keeps still", svg: ring(keeps[0], n(keeps[1] + 0.6), 4.2, SOFT_GOLD), keys: showAt(0.905, 0.92), loop: soft },
      {
        name: "and glints over it",
        svg: glints([
          [n(keeps[0] - 3.4), n(keeps[1] - 4.6)],
          [n(keeps[0] + 3.4), n(keeps[1] - 4.4)],
          [keeps[0], n(keeps[1] - 6.6)]
        ]),
        keys: showAt(0.926, 0.94),
        loop: twinkle()
      }
    ],
    words: linesOn(FOUR, ["Abu Hurairah: he said: Allah has", "Accepted my invocation to forgive what", "Whispers in the hearts of my followers,", "Unless they put it to action, or utter it."])
  };
}

// Together at Muzdalifah. Abu Ayyub al-Ansari said: the Messenger of Allah ﷺ offered the Maghrib and Isha prayers
// together at Muzdalifah (Sahih al-Bukhari 1674; in Arabic: he joined them in the Farewell Hajj). No one is drawn: the
// evening over the hills, and the road from Arafah into the plain of Muzdalifah. The places of the pilgrims come along
// it into the plain, his place, a golden ring, among them, and Abu Ayyub's place by him; Abu Ayyub's voice tells of
// it. The sun sets behind the hills, night falls and the stars come out. A spark of the Maghrib prayer rises from his
// place, and right after it a spark of the Isha prayer; two small lights stay side by side where they rose, and a soft
// golden ring comes about the two together. A soft golden ring comes about all the places in the plain, and a warm
// light over them.
function togetherAtMuzdalifah(): SignArt {
  const his: [number, number] = [94, 108];
  const ayyub: [number, number] = [108, 109.6];
  const pilgrims: [number, number][] = [
    [70, 104.2],
    [80, 106.8],
    [88, 102.6],
    [102, 104],
    [114, 103.2],
    [122, 106.4],
    [84, 111.4],
    [100, 112.6],
    [118, 111.6],
    [72, 111.2],
    [130, 110.4],
    [62, 108]
  ];
  const arrive = track({
    opacity: [
      [0.04, 0],
      [0.08, 1]
    ],
    xy: [
      [0.04, -40, -2],
      [0.2, 0, 0]
    ]
  });
  const NIGHT_STARS: [number, number][] = [
    [14, 12],
    [40, 22],
    [62, 9],
    [88, 18],
    [104, 8],
    [124, 24],
    [146, 12],
    [154, 36],
    [76, 34],
    [24, 38]
  ];
  return {
    kind: "together-at-muzdalifah",
    ms: 8000,
    parts: [
      { name: "the evening sky", svg: sky("#F0BE8C", "#F8DDB8", 62) },
      {
        name: "the sun, low, then setting behind the hills",
        svg: sun(28, 50),
        keys: track({
          opacity: [
            [0.37, 1],
            [0.4, 0]
          ],
          xy: [
            [0.34, 0, 0],
            [0.39, 0, 16]
          ]
        })
      },
      {
        name: "the hills of Arafah, behind",
        svg: peaks(
          [
            [24, 13, 26],
            [60, 9, 20],
            [140, 11, 24]
          ],
          63,
          "#B08C66",
          false
        )
      },
      {
        name: "the plain of Muzdalifah",
        svg: plainLand("#D9BE8E", [
          [40, 117],
          [96, 118],
          [150, 116]
        ])
      },
      { name: "the road from Arafah into the plain", svg: way("M0 104 Q30 106 60 106.6", "#9C916F", 1) },
      {
        name: "night falling",
        svg: `<rect width="160" height="120" fill="#0F1C3A"/>`,
        keys: track({
          opacity: [
            [0.36, 0],
            [0.44, 0.8]
          ]
        })
      },
      { name: "stars of the night", svg: stars(NIGHT_STARS), keys: showAt(0.44, 0.47), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
      { name: "the places of the pilgrims, coming into the plain", svg: places(pilgrims, 1.3), keys: arrive },
      { name: "his place, a golden ring, among them", svg: ring(his[0], his[1], 2.6, GOLD), keys: arrive },
      { name: "Abu Ayyub's place, by him", svg: someone(ayyub[0], ayyub[1], 1.5, AYYUB), keys: arrive },
      { name: "Abu Ayyub's voice: telling of it", svg: arcs(n(ayyub[0] + 3.2), n(ayyub[1] - 2.8), AYYUB), keys: showFor(0.205, 0.212, 0.272, 0.278), loop: speaking },
      spark("the Maghrib prayer: a spark rising", his[0], n(his[1] - 6), 0.46, 0.57),
      spark("and the Isha prayer with it: a spark rising", n(his[0] + 3.4), n(his[1] - 6), 0.472, 0.582),
      {
        name: "together: two small lights side by side, where the sparks rose",
        svg: lightIn(his[0], n(his[1] - 16.4), 2.6) + lightIn(n(his[0] + 3.4), n(his[1] - 16.4), 2.6),
        keys: showAt(0.566, 0.584),
        loop: soft
      },
      { name: "and a soft golden ring about the two", svg: ring(n(his[0] + 1.7), n(his[1] - 16.2), 5.2, SOFT_GOLD), keys: showAt(0.586, 0.6), loop: soft },
      { name: "at Muzdalifah: a soft golden ring about all the places", svg: care(96, 107.8, 38, 7.6, SOFT_GOLD), keys: showAt(0.68, 0.71), loop: soft },
      { name: "and a warm light over them", svg: wash(96, 107, 40, 9, WARM, 0.14), keys: showAt(0.72, 0.75), loop: soft }
    ],
    words: linesOn(THREE, ["Abu Ayyub al-Ansari: he offered the", "Maghrib and Isha prayers together", "At al-Muzdalifah."])
  };
}

// The best day. Abu Hurairah said that the Messenger of Allah ﷺ said: the best day on which the sun has risen is
// Friday; on it Adam was created, on it he was made to enter Paradise, on it he was expelled from it (Sahih Muslim 854;
// only its first words are in the lines, and nothing is drawn for what follows). No one is drawn: Madinah at dawn, its
// masjid, homes and palms; his place, a golden ring, and Abu Hurairah's place by it, and the places of a few who live
// there. Abu Hurairah's voice tells of it, and his voice, soft and golden, speaks. The sun rises over the hills and
// the day comes. Then a soft golden glow spreads about the sun, glints come about it, a warm light comes over the town,
// glints over the masjid and the homes, and small lights in the places.
function bestDay(): SignArt {
  const his: [number, number] = [72, 108.4];
  const hurairah: [number, number] = [86, 111];
  const folk: [number, number][] = [
    [30, 108.4],
    [44, 112],
    [116, 108.6],
    [132, 112.2]
  ];
  return {
    kind: "best-day",
    ms: 7000,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      {
        name: "the sky of the day, coming",
        svg: sky("#BFE3FA", "#E3F2FB", 62),
        keys: track({
          opacity: [
            [0.1, 0],
            [0.3, 1]
          ]
        })
      },
      { name: "the soft golden glow of the best day, about the sun", svg: glow(118, 30, 20, "#FFE9A8", 0.4), keys: showAt(0.52, 0.58), loop: soft },
      {
        name: "the sun, rising over the hills",
        svg: sun(118, 30),
        keys: track({
          xy: [
            [0.08, 0, 32],
            [0.3, 0, 0]
          ]
        })
      },
      {
        name: "glints about the sun",
        svg: glints([
          [104, 24],
          [131, 22],
          [110, 42],
          [128, 40]
        ]),
        keys: showAt(0.58, 0.62),
        loop: twinkle()
      },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [14, 117],
          [100, 118],
          [150, 116]
        ])
      },
      ...palms([
        [8, 100, 15],
        [150, 100, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(54, 100, 0.9) },
      { name: "a home", svg: home(24, 98, 13, 9) },
      { name: "another home", svg: home(124, 97.6, 13, 9) },
      { name: "a third home", svg: home(140, 99, 10, 7.4) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "the places of a few who live there", svg: places(folk, 1.4) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.03, 0.04, 0.42, 0.43), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.12, 0.13, 0.94, 0.95), loop: speaking },
      { name: "a warm light over the town", svg: wash(80, 107, 80, 11, WARM, 0.12), keys: showAt(0.6, 0.66), loop: soft },
      {
        name: "glints over the masjid and the homes",
        svg: glints([
          [24, 85],
          [62, 81],
          [92, 81],
          [124, 84.6],
          [140, 89]
        ]),
        keys: showAt(0.68, 0.72),
        loop: twinkle()
      },
      { name: "small lights in the places", svg: folk.map(([x, y]) => lightIn(x, n(y - 0.4), 2.6)).join(""), keys: showAt(0.74, 0.78), loop: soft }
    ],
    words: linesOn(TWO, ["Abu Hurairah: he said: the best day on", "Which the sun has risen is Friday."])
  };
}

export const BEST_ART = {
  "best-generation": bestGeneration,
  "camels-can-reach": camelsCanReach,
  "simple-path": simplePath,
  "passing-thoughts": passingThoughts,
  "together-at-muzdalifah": togetherAtMuzdalifah,
  "best-day": bestDay
} as const;
