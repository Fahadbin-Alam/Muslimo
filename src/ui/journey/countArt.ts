import { cloud, flower, glow, n, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { at3 } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, lightIn, palms, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, EIGHT, FOLK, glints, linesOn, mat, places, plainLand, SEVEN, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { kaaba } from "./rewardArt";
import { goldHeap } from "./worthArt";
import { room } from "./habitArt";

/**
 * What is counted and what lasts: the years counted from his arrival at Madinah, not from the day he was sent; every
 * tribe hurrying to Islam once Makkah was opened, after they had waited; the truest words a poet said, Labid's, that
 * everything except Allah is perishable; Ibn Mas'ud's words, that one who does not know should say that Allah knows
 * better, for that too is knowledge; a third of Sa'd's wealth, and a third is much, and his heir left wealthy; and
 * modesty, which brings nothing but good. Only the land, the sky, buildings, things and plants are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring
 * or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is
 * drawn for Allah, no book or page is drawn, and nothing comes down from the sky: what is good is a light, glints and
 * a soft golden ring, and what is not to be done a grey dashed ring. No name, word or number is written: a month is a
 * crescent in the evening sky.
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

/** The words of four lines, the last of them longer. */
const FOUR_LONG_LAST = [
  [0.02, 0.22],
  [0.236, 0.44],
  [0.456, 0.66],
  [0.676, 1]
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

/** Sahl ibn Sa'd's place and voice: a sea green. */
const SAHL = "#4E7A6E";
/** Amr ibn Salamah's place and voice: a plum. */
const AMR = "#7A5A8A";
/** Salamah's place, Amr's father, the first of his tribe to hurry: a warm brown. */
const SALAMAH = "#8A5A3A";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** Ibn Mas'ud's place and voice: a deep teal. */
const MASUD = "#3E6E7A";
/** The place of one who knows: a deep blue. */
const KNOWS = "#4E5E9A";
/** The place of one who does not know, and says so: a plain green. */
const ONE = "#5E8A52";
/** Sa'd ibn Abi Waqqas's place and voice: an olive. */
const SAAD = "#5E6E3A";
/** The place of Sa'd's one heir: a soft rose. */
const HEIR = "#9A6E8E";
/** Imran ibn Husayn's place and voice: a muted purple. */
const IMRAN = "#6A5E8E";
/** A crescent of the evening sky. */
const MOON = "#FFF3CF";

/** A lane along the given points, the places going along it a little above its middle. */
const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** Sand dunes across the land. */
const dunes = () =>
  `<path d="M0 82 Q22 75 44 80 T88 79 T132 77 T160 76 L160 120 L0 120 Z" fill="#E6C998" opacity="0.8"/>` +
  `<path d="M60 96 Q86 88 112 93 T160 90 L160 120 L60 120 Z" fill="#E1C08A" opacity="0.6"/>`;

/** A thin crescent, its middle at (x, y): a new month seen in the evening sky. */
const newMoon = (x: number, y: number, r = 3.4) => glow(x, y, n(r * 1.5), MOON, 0.035) + crescent(x, y, r, n(r * 0.45), MOON);

/** A small pool of water by the road, its middle at (x, y). */
const pool = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="8" ry="2.4" fill="#7FB8D8"/><ellipse cx="${n(x - 1.6)}" cy="${n(y - 0.5)}" rx="4" ry="0.8" fill="#BFE0F0" opacity="0.8"/>`;

/** Marks in the sand along the given points: where some went, long ago. */
const marks = (list: [number, number][]) => list.map(([x, y], i) => `<ellipse cx="${x}" cy="${n(y + (i % 2 ? 0.8 : 0))}" rx="0.8" ry="0.4" fill="#B8975E" opacity="0.8"/>`).join("");

/** A dry stalk, its foot at (x, y), `h` high, bent over: what was a flower. */
const dryStalk = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} Q${n(x + 0.4)} ${n(y - h * 0.8)} ${n(x + h * 0.36)} ${n(y - h * 0.7)}" stroke="#A88A58" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;

/** A window in a back wall, from (x, y), `w` wide and `h` high, with the day outside. */
const window_ = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#CFE8F6"/><path d="M${n(x + w / 2)} ${y} L${n(x + w / 2)} ${n(y + h)}" stroke="#7C5A36" stroke-width="0.8"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" stroke="#7C5A36" stroke-width="1.2" fill="none"/>`;

/** A faint white dashed ring on the ground about (x, y): waiting, or not yet. */
const faintRing = (x: number, y: number, rx: number, ry: number) => `<g opacity="0.75">${care(x, y, rx, ry, "#FFFFFF")}</g>`;

// Counted from his arrival. Sahl ibn Sa'd said: the companions did not take as a starting date for the
// Muslim calendar the day the Prophet ﷺ had been sent as an Apostle, or the day of his death, but the day of his
// arrival at Madinah (Sahih al-Bukhari 3934; "or the day of his death" is left out of the lines, and nothing is drawn
// for it). No one is drawn: Madinah on the left, its homes and palms; the hills of Makkah on the right, with the
// Ka'bah; a road between them. His place, a golden ring, is in Makkah, and Sahl's place and the places of those with
// him are in Madinah. Sahl's voice tells of it. A faint dashed line comes across the sky, where the count of the
// months and years will go, and a faint dashed circle at its start, over Madinah. A soft light comes about his place
// in Makkah: the day he was sent; the start of the count stays empty. Then his place goes along the road to Madinah,
// and a soft golden ring comes about Madinah: his arrival. Evening comes, the new crescent shows at the start of the
// count, over Madinah, and then crescents one after another along it: counted from then on.
function countedFromArrival(): SignArt {
  const sahl: [number, number] = [12, 99];
  const road: [number, number][] = [
    [128, 93],
    [107, 97.6],
    [86, 99],
    [66, 98],
    [46, 95]
  ];
  const goes = along(road, [0.69, 0.72, 0.75, 0.78, 0.81]);
  const slots = [22, 39, 56, 73, 90, 107, 124, 141];
  return {
    kind: "counted-from-arrival",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      {
        name: "the sun, setting at evening",
        svg: sun(84, 30),
        keys: track({
          opacity: [
            [0.85, 1],
            [0.87, 0]
          ],
          xy: [
            [0.82, 0, 0],
            [0.87, 0, 36]
          ]
        })
      },
      { name: "a cloud", svg: cloud(60, 34, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [116, 14, 13],
            [134, 19, 15],
            [151, 13, 12]
          ],
          88,
          "#A88A64",
          false
        )
      },
      { name: "the Ka'bah, among the hills of Makkah", svg: kaaba(132, 90, 0.62) },
      { name: "a home of Madinah", svg: home(16, 90, 10, 6.6) },
      { name: "another home of Madinah", svg: home(38, 90.6, 11, 7.2) },
      ...palms(
        [
          [8, 88, 6],
          [27, 87.4, 6.6],
          [52, 88.6, 5.8]
        ],
        "Madinah"
      ),
      { name: "the road from Makkah to Madinah", svg: way(`M${road.map(([x, y]) => `${x} ${n(y + 1.4)}`).join(" L")}`, "#C9A66E", 1) },
      { name: "his place, a golden ring, in Makkah, then going along the road to Madinah", svg: ring(road[0][0], road[0][1], 2.6, GOLD), keys: track({ xy: goes }) },
      { name: "Sahl ibn Sa'd's place, in Madinah", svg: someone(sahl[0], sahl[1], 1.5, SAHL) },
      { name: "Sahl ibn Sa'd's voice: telling of it", svg: arcs(n(sahl[0] + 3.2), n(sahl[1] - 2.8), SAHL), keys: showFor(0.022, 0.028, 0.18, 0.186), loop: speaking },
      {
        name: "the places of those with him in Madinah",
        svg: places(
          [
            [24, 101],
            [36, 102.6],
            [48, 101]
          ],
          1.3
        )
      },
      {
        name: "where the count of the months and years will go: a faint dashed line across the sky",
        svg: `<path d="M16 19 L148 19" stroke="#FFFFFF" stroke-width="0.6" stroke-dasharray="1.2 1.8" opacity="0.85"/>`,
        keys: showAt(0.25, 0.28)
      },
      { name: "the start of the count, over Madinah: a faint dashed circle", svg: someone(slots[0], 19, 3.8, "#FFFFFF"), keys: showFor(0.29, 0.31, 0.872, 0.88) },
      { name: "the day he was sent: a soft light about his place, in Makkah", svg: lightIn(road[0][0], n(road[0][1] - 4), 3.4), keys: showAt(0.5, 0.52), loop: soft },
      { name: "his arrival: a soft golden ring about Madinah", svg: care(30, 97, 24, 7.6, SOFT_GOLD), keys: showAt(0.815, 0.83), loop: soft },
      {
        name: "evening coming over the land",
        svg: `<rect width="160" height="120" fill="#2E3D6E"/>`,
        keys: track({
          opacity: [
            [0.83, 0],
            [0.87, 0.42]
          ]
        })
      },
      { name: "the new crescent at the start of the count, over Madinah: the first month counted", svg: newMoon(slots[0], 19), keys: showAt(0.875, 0.885), loop: soft },
      ...slots.slice(1).map(
        (x, i): SignPart => ({
          name: `counted from then on: a crescent along the line ${i + 2}`,
          svg: newMoon(x, 19, 2.8),
          keys: showAt(at3(0.89 + i * 0.01), at3(0.896 + i * 0.01)),
          loop: twinkle(1500 + i * 100)
        })
      )
    ],
    words: linesOn(FOUR_LONG_LAST, [
      "Sahl ibn Sa'd: his companions did not take",
      "As a starting date for the Muslim calendar",
      "The day he had been sent as an Apostle,",
      "But the day of his arrival at Madinah."
    ])
  };
}

// Every tribe hurried. Amr ibn Salamah said: the Arabs delayed their conversion to Islam till the Conquest. They used
// to say: leave him and his people Quraysh: if he overpowers them, then he is a true Prophet. So, when Makkah was
// conquered, then every tribe rushed to embrace Islam, and my father hurried to embrace Islam before my tribe (Sahih
// al-Bukhari 4302; what Amr told of before and after this is left out). No one is drawn, and nothing of fighting: the
// hills of Makkah with the Ka'bah and its homes, the faint places of Quraysh by them; the camps of the tribes about it,
// their tents and places; and Amr's tribe by a pool of water on the road, Amr's place and his father Salamah's among
// them. Amr's voice tells of it. A faint dashed ring comes about each camp: waiting; and a faint ring about Makkah:
// what they waited for. The tribes' voices speak: leave him and his people. Then a soft golden light comes over
// Makkah, glints about the Ka'bah, and the ring about it turns soft and golden: it is opened. One camp after another,
// quickly, their places step toward Makkah and a soft golden ring comes about them: they hurry to Islam. Last, a way
// shows from Amr's camp toward Makkah, and Salamah's place hurries along it before the rest of his tribe, and a soft
// golden ring comes about it; the rest stay by their tents.
function everyTribeHurried(): SignArt {
  const amr: [number, number] = [146, 106];
  const salamah: [number, number] = [104, 104];
  // Three camps of the tribes: where their places are, how far they step toward Makkah, and when.
  const camps: { tents: string; folk: [number, number][]; ring: [number, number, number, number]; step: [number, number]; at: number; where: string }[] = [
    {
      where: "on the left",
      tents: tent(14, 88, 9, 6.4) + tent(26, 89, 8, 5.6),
      folk: [
        [12, 94],
        [22, 95],
        [32, 94]
      ],
      ring: [22, 94.6, 14, 3.4],
      step: [4, -1],
      at: 0.76
    },
    {
      where: "on the right",
      tents: tent(134, 88, 9, 6.4) + tent(146, 89, 8, 5.6),
      folk: [
        [128, 94],
        [138, 95],
        [148, 94]
      ],
      ring: [138, 94.6, 14, 3.4],
      step: [-4, -1],
      at: 0.775
    },
    {
      where: "in front",
      tents: tent(44, 98, 12, 8) + tent(60, 100, 10, 7),
      folk: [
        [36, 104],
        [50, 106],
        [64, 105]
      ],
      ring: [50, 105.2, 18, 4],
      step: [4, -2],
      at: 0.79
    }
  ];
  const amrTribe: [number, number][] = [
    [116, 105.4],
    [126, 106.6],
    [136, 105.4]
  ];
  const hurry = along(
    [
      salamah,
      [98.6, 97],
      [92, 90]
    ],
    [0.89, 0.915, 0.94]
  );
  return {
    kind: "every-tribe-hurried",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "a cloud", svg: cloud(110, 26, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [64, 14, 14],
            [80, 19, 16],
            [96, 13, 13]
          ],
          78,
          "#A88A64",
          false
        )
      },
      { name: "Makkah opened: a soft golden light over Makkah", svg: glow(80, 76, 16, WARM, 0.3), keys: showAt(0.65, 0.68), loop: soft },
      { name: "the homes of Makkah", svg: home(66, 80.6, 8, 5.4) + home(95, 80.6, 8, 5.4) },
      { name: "the Ka'bah, among the hills of Makkah", svg: kaaba(80, 80, 0.62) },
      {
        name: "the faint places of Quraysh, in Makkah",
        svg: `<g opacity="0.7">${places(
          [
            [72, 83.4],
            [89, 83.4]
          ],
          0.9
        )}</g>`
      },
      ...camps.flatMap(({ tents, folk, step, at, where }): SignPart[] => [
        { name: `the tents of a tribe, ${where}`, svg: tents },
        {
          name: `the places of that tribe, ${where}, stepping toward Makkah`,
          svg: places(folk, 1.3),
          keys: track({
            xy: [
              [at, 0, 0],
              [at3(at + 0.02), step[0], step[1]]
            ]
          })
        }
      ]),
      { name: "a pool of water on the road", svg: pool(96, 108) },
      { name: "the tents of Amr's tribe, by it", svg: tent(116, 98, 12, 8) + tent(132, 100, 10, 7) },
      { name: "the places of Amr's tribe", svg: places(amrTribe, 1.5) },
      { name: "Amr ibn Salamah's place, among them", svg: someone(amr[0], amr[1], 1.5, AMR) },
      { name: "Amr ibn Salamah's voice: telling of it", svg: arcsLeft(n(amr[0] - 3.2), n(amr[1] - 2.8), AMR), keys: showFor(0.022, 0.028, 0.092, 0.098), loop: speaking },
      ...camps.map(
        ({ ring: [x, y, rx, ry], at, where }): SignPart => ({
          name: `delayed: a faint dashed ring about the tribe ${where}, waiting`,
          svg: faintRing(x, y, rx, ry),
          keys: showFor(0.07, 0.09, at, at3(at + 0.01))
        })
      ),
      { name: "Amr's tribe, delayed too: a faint dashed ring about them, waiting", svg: faintRing(125, 105.8, 25, 3.8), keys: showAt(0.074, 0.094) },
      { name: "what they waited for: a faint ring about Makkah", svg: faintRing(80, 81.4, 22, 5.2), keys: showFor(0.17, 0.19, 0.69, 0.7) },
      {
        name: "the tribes' voices: leave him to Quraysh",
        svg: arcs(34, 90, FOLK) + arcsLeft(126, 90, FOLK) + arcs(68, 100.4, FOLK) + arcsLeft(112, 101, FOLK),
        keys: showFor(0.27, 0.276, 0.578, 0.584),
        loop: speaking
      },
      {
        name: "and glints about the Ka'bah",
        svg: glints([
          [73, 70],
          [87, 69.4],
          [80, 66.4]
        ]),
        keys: showAt(0.68, 0.7),
        loop: twinkle()
      },
      { name: "the ring about Makkah, soft and golden now", svg: care(80, 81.4, 22, 5.2, SOFT_GOLD), keys: showAt(0.69, 0.71), loop: soft },
      ...camps.map(
        ({ ring: [x, y, rx, ry], step, at, where }): SignPart => ({
          name: `hurrying to Islam: a soft golden ring about the tribe ${where}`,
          svg: care(n(x + step[0]), n(y + step[1]), rx, ry, SOFT_GOLD),
          keys: showAt(at3(at + 0.012), at3(at + 0.024)),
          loop: soft
        })
      ),
      { name: "the way from Amr's camp, toward Makkah", svg: way("M104 105.4 Q99 97 92 91.4", "#C9A66E", 1), keys: showAt(0.878, 0.888) },
      { name: "Salamah's place, among Amr's tribe, hurrying along the way before the rest of them", svg: someone(salamah[0], salamah[1], 1.5, SALAMAH), keys: track({ xy: hurry }) },
      { name: "hurrying to Islam first: a soft golden ring about Salamah's place", svg: care(92, 90.6, 5.4, 2.4, SOFT_GOLD), keys: showAt(0.944, 0.958), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Amr ibn Salamah: the Arabs delayed their",
      "Conversion to Islam till the Conquest.",
      "They used to say: Leave him and his",
      "People Quraysh: if he overpowers them",
      "Then he is a true Prophet. So, when",
      "Makkah was conquered, then every tribe",
      "Rushed to embrace Islam, and my father",
      "Hurried to embrace Islam before my tribe."
    ])
  };
}

// The truest words. Abu Hurairah said that the Prophet ﷺ said: the most true words said by a poet was the words of
// Labid: verily, everything except Allah is perishable; and Umayyah ibn Abi as-Salt was about to be a Muslim (Sahih
// al-Bukhari 3841; "verily" and Umayyah are left out of the lines). No one is drawn, and nothing is drawn for Allah: the
// desert in the late afternoon, its dunes, the tents of an old camp, marks in the sand, and desert flowers; his place,
// a golden ring, and Abu Hurairah's place by it. Abu Hurairah's voice tells of it, and his voice, soft and golden,
// speaks; glints come about it: the most true words. Labid's words: a voice by the old camp. Then everything there
// passes: the flowers fade and only dry stalks are left, the marks in the sand fade, the tents of the old camp wear
// away, the sun sets, and evening comes, with its first stars.
function truestWords(): SignArt {
  const his: [number, number] = [132, 103];
  const hurairah: [number, number] = [146, 105.4];
  const blooms: [number, number, string][] = [
    [84, 106.4, "#E8A0B8"],
    [95, 108, "#F0C05A"],
    [106, 106.4, "#B8A0E8"],
    [117, 107.8, "#E8A0B8"]
  ];
  return {
    kind: "truest-words",
    ms: 9000,
    parts: [
      { name: "the sky of the late afternoon", svg: sky("#F3D2A2", "#FAE6C8", 62) },
      {
        name: "the sun, low, then setting",
        svg: sun(122, 40),
        keys: track({
          opacity: [
            [0.9, 1],
            [0.94, 0]
          ],
          xy: [
            [0.8, 0, 0],
            [0.94, 0, 26]
          ]
        })
      },
      { name: "a cloud, passing", svg: cloud(60, 26, 0.45, "#FFFFFF", 0.8), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      { name: "dunes", svg: dunes() },
      {
        name: "the tents of an old camp, wearing away",
        svg: tent(42, 92, 12, 8.4) + tent(60, 94, 10, 7) + tent(26, 96, 9, 6.4),
        keys: track({
          opacity: [
            [0.74, 1],
            [0.86, 0.22]
          ]
        })
      },
      {
        name: "marks in the sand, fading",
        svg: marks([
          [70, 99],
          [74, 100],
          [78, 99.2],
          [82, 100.4],
          [86, 99.6],
          [90, 100.8],
          [94, 100],
          [98, 101.2]
        ]),
        keys: track({
          opacity: [
            [0.72, 1],
            [0.8, 0]
          ]
        })
      },
      ...blooms.map(
        ([x, y, petal], i): SignPart => ({
          name: `a desert flower, fading ${i + 1}`,
          svg: big(flower(x, y, petal, 4.6), x, y, 0.6),
          keys: track({
            opacity: [
              [at3(0.7 + i * 0.01), 1],
              [at3(0.76 + i * 0.01), 0]
            ]
          })
        })
      ),
      { name: "dry stalks where the flowers were", svg: blooms.map(([x, y]) => dryStalk(x, y, 3.2)).join(""), keys: showAt(0.74, 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.022, 0.028, 0.08, 0.086), loop: speaking },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 3.6), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.09, 0.096, 0.95, 0.956), loop: speaking },
      {
        name: "the most true words: glints about his voice",
        svg: glints([
          [122, 95],
          [127, 92],
          [117, 92.4]
        ]),
        keys: showAt(0.2, 0.22),
        loop: twinkle()
      },
      { name: "Labid's words: a voice by the old camp", svg: arcs(54, 84, "#8A6E5A"), keys: showFor(0.4, 0.406, 0.62, 0.626), loop: speaking },
      {
        name: "evening coming",
        svg: `<rect width="160" height="120" fill="#2E3D6E"/>`,
        keys: track({
          opacity: [
            [0.84, 0],
            [0.92, 0.38]
          ]
        })
      },
      {
        name: "the first stars of the evening",
        svg: stars([
          [20, 14],
          [48, 22],
          [76, 10],
          [104, 18],
          [142, 12]
        ]),
        keys: showAt(0.92, 0.95),
        loop: { move: "twinkle", ms: 1500, low: 0.3 }
      }
    ],
    words: linesOn(THREE, ["Abu Hurairah: he said: the most true words", "Said by a poet was the words of Labid:", "Everything except Allah is perishable."])
  };
}

// If you do not know. Abdullah ibn Mas'ud said: O people! If somebody knows something, he can say it, but if he does
// not know it, he should say: Allah knows better, for it is a sign of having knowledge to say about something which one
// does not know: Allah knows better (Sahih al-Bukhari 4809; the ayah he recited after it and what he told of the smoke
// are left out). No one is drawn: a room, its window, and Ibn Mas'ud's place, with the places of those who came to him
// sitting about it. Ibn Mas'ud's voice speaks. Small lights show in the place of one who knows, and its voice, soft and
// golden, says it. A faint dashed ring shows about the place of one who does not know; its voice says that Allah
// knows better, and a soft golden ring comes about it. Then small lights come in that place too, for that is
// knowledge, and the faint ring fades. Glints come over both, and a soft golden ring about all who sit there.
function ifYouDoNotKnow(): SignArt {
  const LINE = 84;
  const masud: [number, number] = [80, 93];
  const knows: [number, number] = [60, 101];
  const not: [number, number] = [100, 101];
  const sitting: [number, number][] = [
    [34, 95],
    [46, 98.4],
    [114, 98.4],
    [126, 95]
  ];
  return {
    kind: "if-you-do-not-know",
    ms: 11000,
    parts: [
      { name: "the room where they came to Ibn Mas'ud: its wall and floor", svg: room("#EAD7B4", "#D2AE7E", LINE) },
      { name: "a window, with the day outside", svg: window_(68, 44, 24, 16) },
      { name: "a cloud, outside the window", svg: cloud(80, 50, 0.22, "#FFFFFF", 0.9), clip: { x: 68, y: 44, w: 24, h: 16 } },
      { name: "mats of palm leaves to sit on", svg: mat(masud[0], n(masud[1] + 1.2), 12) + mat(80, n(knows[1] + 1.2), 60) },
      { name: "Ibn Mas'ud's place", svg: someone(masud[0], masud[1], 1.6, MASUD) },
      { name: "Ibn Mas'ud's voice: speaking to those there", svg: arcs(n(masud[0] + 3.2), n(masud[1] - 2.8), MASUD), keys: showFor(0.024, 0.03, 0.95, 0.956), loop: speaking },
      { name: "the places of those who came to him, sitting", svg: places(sitting, 1.4) },
      { name: "the place of one who knows", svg: someone(knows[0], knows[1], 1.5, KNOWS) },
      { name: "the place of one who does not know", svg: someone(not[0], not[1], 1.5, ONE) },
      { name: "what it knows: small lights in its place", svg: glints([[n(knows[0] - 0.6), n(knows[1] - 3.8)], [n(knows[0] - 2.6), n(knows[1] - 2.4)]], 0.9), keys: showAt(0.09, 0.11), loop: twinkle() },
      { name: "its voice, soft and golden: saying it", svg: arcs(n(knows[0] + 3.2), n(knows[1] - 2.8), SOFT_GOLD), keys: showFor(0.2, 0.206, 0.25, 0.256), loop: speaking },
      { name: "not knowing: a faint dashed ring about the other", svg: faintRing(not[0], n(not[1] + 0.6), 5.6, 2.4), keys: showFor(0.32, 0.34, 0.62, 0.64) },
      { name: "its voice, soft: saying who knows better", svg: arcs(n(not[0] + 3.2), n(not[1] - 2.8), "#FFF3CF"), keys: showFor(0.456, 0.462, 0.51, 0.516), loop: speaking },
      { name: "a soft golden ring about it", svg: care(not[0], n(not[1] + 0.6), 6, 2.6, SOFT_GOLD), keys: showAt(0.518, 0.532), loop: soft },
      { name: "a sign of knowledge: small lights come in its place too", svg: glints([[n(not[0] - 0.6), n(not[1] - 3.8)], [n(not[0] - 2.6), n(not[1] - 2.4)]], 0.9), keys: showAt(0.62, 0.64), loop: twinkle() },
      {
        name: "glints over both places",
        svg: glints([
          [n(knows[0] + 1.4), n(knows[1] - 7.2)],
          [n(not[0] + 1.4), n(not[1] - 7.2)]
        ]),
        keys: showAt(0.9, 0.92),
        loop: twinkle()
      },
      { name: "a soft golden ring about all who sit there", svg: care(masud[0], 97.4, 52, 8.2, SOFT_GOLD), keys: showAt(0.93, 0.95), loop: soft }
    ],
    words: linesOn(SEVEN, [
      "Ibn Mas'ud: O people! If somebody knows",
      "Something, he can say it, but if he does",
      "Not know it, he should say,",
      "Allah knows better, for it is a sign of",
      "Having knowledge to say about",
      "Something which one does not know,",
      "Allah knows better."
    ])
  };
}

// A third is much. Sa'd ibn Abi Waqqas said: in the year of the last Hajj I became seriously ill, and the Prophet ﷺ
// used to visit me. I told him: I am reduced to this state because of illness, and I am wealthy and have no
// inheritors except a daughter. Should I give two-thirds of my property in charity? He said: no. I asked: half? He
// said: no. Then he added: one-third, and even one-third is much. You'd better leave your inheritors wealthy rather
// than leaving them poor, begging others (Sahih al-Bukhari 1295; with Ibn Abbas's report of it, Sahih al-Bukhari 2743;
// what he said after it is left out). No one is drawn: Makkah, its hills and the Ka'bah far off, Sa'd's lodging, and
// his place by it, faint with illness. His place, a golden ring, comes to visit him, and Sa'd's voice speaks. His
// wealth shows: a heap of gold in three heaps, and his one heir, a small place by his lodging. The places of the poor
// show further off. Two-thirds: a faint dashed ring about two of the heaps, and no: a grey dashed ring. Half: a faint
// dashed line through the middle heap, and no: a grey dashed ring about half of the gold. One-third: a soft golden ring
// about one heap, and it goes along a soft golden way to the poor, with glints: it is much. The rest of the gold goes
// to his heir, with glints and a soft golden ring: left wealthy, not begging from others.
function aThirdIsMuch(): SignArt {
  const saad: [number, number] = [44, 97];
  const heir: [number, number] = [12, 103];
  const his: [number, number] = [54, 99];
  const heaps: [number, number][] = [
    [64, 105],
    [78, 105.6],
    [92, 105]
  ];
  const poor: [number, number][] = [
    [122, 95.6],
    [136, 97],
    [150, 95.6]
  ];
  const visit = along(
    [
      [112, 94],
      [84, 97],
      his
    ],
    [0.03, 0.055, 0.08]
  );
  const third = along(
    [
      heaps[2],
      [110, 103.4],
      [128, 103.6]
    ],
    [0.69, 0.71, 0.73]
  );
  const toHeir = (from: [number, number], to: [number, number], start: number): [number, number, number][] => [
    [start, 0, 0],
    [at3(start + 0.04), n(to[0] - from[0]), n(to[1] - from[1])]
  ];
  return {
    kind: "a-third-is-much",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 24) },
      { name: "a cloud", svg: cloud(70, 30, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [96, 15, 16],
            [118, 20, 17],
            [142, 14, 15]
          ],
          82,
          "#A88A64",
          false
        )
      },
      { name: "the Ka'bah, far off", svg: kaaba(120, 84, 0.5) },
      { name: "Sa'd's lodging in Makkah", svg: home(26, 99, 24, 15) },
      { name: "Sa'd's place, by his lodging, faint with illness", svg: `<g opacity="0.62">${someone(saad[0], saad[1], 1.5, SAAD)}</g>` },
      { name: "his place, a golden ring, coming to visit him", svg: ring(112, 94, 2.6, GOLD), keys: track({ xy: visit }) },
      { name: "Sa'd's voice: asking", svg: arcs(n(saad[0] + 3.2), n(saad[1] - 2.8), SAAD), keys: showFor(0.13, 0.136, 0.51, 0.516), loop: speaking },
      {
        name: "his wealth: a heap of gold in three heaps, two of them here, later going to his heir",
        svg: goldHeap(heaps[0][0], heaps[0][1], 0.62) + goldHeap(heaps[1][0], heaps[1][1], 0.62),
        keys: track({ opacity: [[0.17, 0], [0.19, 1]], xy: toHeir(heaps[0], [22, 106.4], 0.79) })
      },
      { name: "and the third heap of his wealth: one-third, later going to the poor", svg: goldHeap(heaps[2][0], heaps[2][1], 0.62), keys: track({ opacity: [[0.17, 0], [0.19, 1]], xy: third }) },
      { name: "his one heir: a small place by his lodging", svg: someone(heir[0], heir[1], 1.2, HEIR), keys: showAt(0.27, 0.29) },
      { name: "the places of the poor, further off", svg: places(poor, 1.3), keys: showAt(0.34, 0.36) },
      { name: "two-thirds: a faint dashed ring about two of the heaps", svg: faintRing(85, 105.4, 12, 3.6), keys: showFor(0.37, 0.385, 0.452, 0.46) },
      { name: "no: a grey dashed ring about the two heaps", svg: greyRing(85, 105.4, 12.6, 3.9), keys: showFor(0.452, 0.46, 0.478, 0.484) },
      { name: "half: a faint dashed line through the middle heap", svg: `<path d="M78 97 L78 108.6" stroke="#FFFFFF" stroke-width="0.7" stroke-dasharray="1 1" opacity="0.85"/>`, keys: showFor(0.484, 0.49, 0.512, 0.518) },
      { name: "no: a grey dashed ring about half of the gold", svg: greyRing(86, 105.4, 9.4, 3.6), keys: showFor(0.5, 0.506, 0.512, 0.518) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.455, 0.461, 0.96, 0.966), loop: speaking },
      { name: "one-third: a soft golden ring about one heap", svg: care(heaps[2][0], n(heaps[2][1] - 0.6), 5.2, 2.4, SOFT_GOLD), keys: track({ opacity: [[0.575, 0], [0.59, 1]], xy: third }), loop: soft },
      { name: "a soft golden way from it to the poor", svg: way("M96 104.6 Q112 101.4 128 102.2", SOFT_GOLD, 0.9), keys: showAt(0.68, 0.69) },
      {
        name: "it is much: glints over it, by the poor",
        svg: glints([
          [122, 100.6],
          [128, 99.2],
          [134, 100.6]
        ]),
        keys: showAt(0.73, 0.74),
        loop: twinkle()
      },
      {
        name: "left wealthy: glints over his heir's place",
        svg: glints([
          [heir[0], n(heir[1] - 5)],
          [n(heir[0] + 6), n(heir[1] - 3.4)]
        ]),
        keys: showAt(0.832, 0.846),
        loop: twinkle()
      },
      { name: "and a soft golden ring about his heir's place", svg: care(n(heir[0] + 10), n(heir[1] + 3), 15, 3.6, SOFT_GOLD), keys: showAt(0.888, 0.9), loop: soft }
    ],
    words: linesOn(NINE, [
      "Sa'd: in the year of the last Hajj I",
      "Became seriously ill. I am wealthy and",
      "Have no inheritors except a daughter.",
      "Should I give two-thirds in charity?",
      "He said: No. I asked: Half? He said: No.",
      "Then he added: One-third, and even",
      "One-third is much. You'd better leave",
      "Your inheritors wealthy rather than",
      "Leaving them poor, begging others."
    ])
  };
}

// Modesty brings good. Imran ibn Husayn said that the Prophet ﷺ said: modesty brings forth nothing but goodness (Sahih
// Muslim 37a, with Sahih al-Bukhari 6117; what Bushayr said after it, and Imran's answer, are left out). No one is
// drawn: a lane between the homes of Madinah, with palms; his place, a golden ring, and Imran's place by it. Imran's
// voice tells of it, and his voice, soft and golden, speaks. The place of one with modesty goes gently along the side
// of the lane, its voice soft and low, as the places of others pass the other way. Then goodness: small flowers come up
// along its way, glints over them, a soft golden ring comes about it, small lights in the places it passed, and a warm
// light over the lane.
function modestyBringsGood(): SignArt {
  const his: [number, number] = [146, 104];
  const imran: [number, number] = [132, 105.6];
  const walk: [number, number][] = [
    [34, 100.4],
    [78, 100.6],
    [78, 100.6],
    [90, 100.4]
  ];
  const passing: [number, number][] = [
    [124, 94.6],
    [134, 95.2]
  ];
  const passTo: [number, number] = [-64, 0.4];
  const bloomsAt: [number, number, string][] = [
    [42, 104.6, "#E8A0B8"],
    [56, 105.2, "#F0C05A"],
    [70, 104.8, "#B8A0E8"],
    [84, 105.2, "#E8A0B8"]
  ];
  return {
    kind: "modesty-brings-good",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(118, 20) },
      { name: "a cloud", svg: cloud(52, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the homes of Madinah, along the lane", svg: home(18, 90, 16, 11) + home(54, 89, 14, 10) + home(104, 89, 14, 10) + home(140, 90, 16, 11) },
      ...palms(
        [
          [36, 86, 7],
          [122, 86, 7.4]
        ],
        "Madinah"
      ),
      {
        name: "a lane between the homes",
        svg: lane([
          [0, 96],
          [40, 98],
          [80, 97.4],
          [120, 98],
          [160, 96]
        ])
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Imran's place, by him", svg: someone(imran[0], imran[1], 1.5, IMRAN) },
      { name: "Imran's voice: telling of it", svg: arcsLeft(n(imran[0] - 3.2), n(imran[1] - 2.8), IMRAN), keys: showFor(0.022, 0.028, 0.1, 0.106), loop: speaking },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 3.6), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.11, 0.116, 0.9, 0.906), loop: speaking },
      { name: "the place of one with modesty, going gently along the side of the lane", svg: someone(walk[0][0], walk[0][1], 1.5, ONE), keys: track({ xy: along(walk, [0.08, 0.3, 0.34, 0.4]) }) },
      { name: "its voice, soft and low: a greeting", svg: big(arcs(n(walk[1][0] + 2.6), n(walk[1][1] - 3), "#FFF3CF"), n(walk[1][0] + 2.6), n(walk[1][1] - 3), 0.7), keys: showFor(0.3, 0.306, 0.334, 0.34), loop: speaking },
      {
        name: "the places of others, passing the other way",
        svg: places(passing, 1.4),
        keys: track({
          xy: [
            [0.1, 0, 0],
            [0.38, passTo[0], passTo[1]]
          ]
        })
      },
      ...bloomsAt.map(
        ([x, y, petal], i): SignPart => ({
          name: `goodness: a small flower along its way ${i + 1}`,
          svg: big(flower(x, y, petal, 4.4), x, y, 0.6),
          keys: showAt(at3(0.54 + i * 0.016), at3(0.56 + i * 0.016))
        })
      ),
      {
        name: "glints over them",
        svg: glints(bloomsAt.map(([x, y]) => [x, n(y - 6)])),
        keys: showAt(0.62, 0.66),
        loop: twinkle()
      },
      { name: "a soft golden ring about it", svg: care(walk[3][0], n(walk[3][1] + 1.2), 6, 2.6, SOFT_GOLD), keys: showAt(0.68, 0.7), loop: soft },
      {
        name: "small lights in the places it passed",
        svg: passing.map(([x, y]) => lightIn(n(x + passTo[0]), n(y + passTo[1] - 0.4), 2.4)).join(""),
        keys: showAt(0.74, 0.78),
        loop: soft
      },
      { name: "a warm light over the lane", svg: wash(80, 99, 70, 8, WARM, 0.14), keys: showAt(0.8, 0.84), loop: soft }
    ],
    words: linesOn(TWO, ["Imran: he said: modesty brings forth", "Nothing but goodness."])
  };
}

export const COUNT_ART = {
  "counted-from-arrival": countedFromArrival,
  "every-tribe-hurried": everyTribeHurried,
  "truest-words": truestWords,
  "if-you-do-not-know": ifYouDoNotKnow,
  "a-third-is-much": aThirdIsMuch,
  "modesty-brings-good": modestyBringsGood
} as const;
