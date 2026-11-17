import { animalAt, cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, goldCoin, palms, sparkRising, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { thornyTree } from "./dearArt";

/**
 * Guidance, gifts and good turns in his ﷺ days and after: the little black khamisa he gave Umm Khalid, with a prayer
 * that she would wear it out and mend it; the garden of Banu an-Najjar, whose price they would ask only from Allah,
 * where the masjid was built; his prayer that Daws be guided and brought, when he was asked to pray against them; Umar
 * and his Ansari neighbour, who went down to him by turns and brought each other the news; Ibn Umar's donkey and
 * turban, given to a man of the desert whose father Umar loved; the hundred camels among which hardly one is fit to
 * ride; and the sins that are forgiven, even if they were like the foam of the sea. Only the land, the sea, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and
 * a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: what was revealed to him
 * is a soft golden glow about his place, and a praise or a prayer is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** Grey, for a far place gone dim. */
const DIM = "#8C8C8C";

/** Opacity keys through the given points, each [time, opacity]. */
const fade = (points: [number, number][]) => track({ opacity: points });

/** Something drawn closer: `k` times its size about (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** The land from y 61 down, with a few tufts of dry grass. */
const guideLand = () =>
  landOf([
    [20, 111],
    [66, 113],
    [114, 111],
    [146, 109]
  ]);

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across, the hills and the land. */
const day = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: guideLand() }
];

/** A few small homes far off, the middle of their foot at (x, y). */
const farHomes = (x: number, y: number) =>
  `<rect x="${n(x - 7)}" y="${n(y - 3.6)}" width="5" height="3.6" fill="#A88B66"/>` +
  `<rect x="${n(x - 1.2)}" y="${n(y - 3)}" width="4.2" height="3" fill="#9C805C"/>` +
  `<rect x="${n(x + 3.6)}" y="${n(y - 3.3)}" width="3.8" height="3.3" fill="#A88B66"/>` +
  `<rect x="${n(x - 5)}" y="${n(y - 1.8)}" width="0.9" height="1.8" fill="#5E4630"/>` +
  `<rect x="${n(x + 0.4)}" y="${n(y - 1.5)}" width="0.8" height="1.5" fill="#5E4630"/>` +
  `<rect x="${n(x + 5)}" y="${n(y - 1.6)}" width="0.8" height="1.6" fill="#5E4630"/>`;

/** A cloth folded on the ground, its foot's middle at (x, y), `w` from its middle to its ends. */
const fold = (x: number, y: number, w: number, fill: string, line: string) =>
  `<path d="M${n(x - w)} ${y} L${n(x + w)} ${y} L${n(x + w - 0.5)} ${n(y - 1.7)} L${n(x - w + 0.5)} ${n(y - 1.7)} Z" fill="${fill}"/>` +
  `<path d="M${n(x - w + 0.3)} ${n(y - 0.85)} L${n(x + w - 0.3)} ${n(y - 0.85)}" stroke="${line}" stroke-width="0.35"/>`;

/** Clothes folded and piled, the middle of the pile's foot at (x, y). */
const foldedClothes = (x: number, y: number) =>
  fold(x, y, 4.6, "#E9E2D0", "#C9BFA6") + fold(x, n(y - 1.7), 4, "#B9D0E6", "#94AFC9") + fold(x, n(y - 3.4), 3.4, "#E6C9A0", "#C9A87A");

/** The black of the little khamisa, and its mark of green or yellow. */
const KHAMISA = "#2B2626";
const GREEN_MARK = "#5DAE62";
const YELLOW_MARK = "#E8C547";

/** The little black khamisa, folded, its foot's middle at (x, y), with its mark of green and yellow along it. */
const khamisaFolded = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${y} L${n(x + 3)} ${y} L${n(x + 2.5)} ${n(y - 1.8)} L${n(x - 2.5)} ${n(y - 1.8)} Z" fill="${KHAMISA}"/>` +
  `<path d="M${n(x - 2.8)} ${n(y - 0.5)} L${n(x + 2.8)} ${n(y - 0.5)}" stroke="${GREEN_MARK}" stroke-width="0.4"/>` +
  `<path d="M${n(x - 2.6)} ${n(y - 1.1)} L${n(x + 2.6)} ${n(y - 1.1)}" stroke="${YELLOW_MARK}" stroke-width="0.35"/>`;

/** The little black khamisa spread out on the ground, the middle of its far edge at (x, y). */
const khamisaSpread = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${y} L${n(x + 4.4)} ${y} L${n(x + 5.4)} ${n(y + 2.8)} L${n(x - 5.4)} ${n(y + 2.8)} Z" fill="${KHAMISA}"/>` +
  `<path d="M${n(x - 4.9)} ${n(y + 1.5)} L${n(x + 4.9)} ${n(y + 1.5)}" stroke="${YELLOW_MARK}" stroke-width="0.4"/>` +
  `<path d="M${n(x - 5.1)} ${n(y + 2.2)} L${n(x + 5.1)} ${n(y + 2.2)}" stroke="${GREEN_MARK}" stroke-width="0.45"/>` +
  [-2.6, 0, 2.6].map((dx) => `<circle cx="${n(x + dx)}" cy="${n(y + 0.7)}" r="0.35" fill="${GREEN_MARK}"/>`).join("");

/** The same khamisa grown pale with wear, laid over it. */
const khamisaWorn = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${y} L${n(x + 4.4)} ${y} L${n(x + 5.4)} ${n(y + 2.8)} L${n(x - 5.4)} ${n(y + 2.8)} Z" fill="#BFB6AA" opacity="0.42"/>`;

/** A patch sewn on, its middle at (x, y). */
const patch = (x: number, y: number, fill: string) =>
  `<rect x="${n(x - 0.9)}" y="${n(y - 0.5)}" width="1.8" height="1" fill="${fill}"/>` +
  `<rect x="${n(x - 0.9)}" y="${n(y - 0.5)}" width="1.8" height="1" stroke="#F3E8D4" stroke-width="0.2" stroke-dasharray="0.3 0.25" fill="none"/>`;

// A khamisa to wear out. Umm Khalid bint Khalid said: the Prophet ﷺ was brought some clothes, among them a small black
// khamisa. He said: whom do you think we should dress in this? The people kept silent, and he said: bring me Umm Khalid.
// I was brought, carried, and he took the khamisa in his hand and dressed me in it, and said: may you live to wear it
// out and mend it many times. On it was a mark of green or yellow, and he said: O Umm Khalid, this is sanah; sanah is
// the Abyssinian word for beautiful (Sahih al-Bukhari 5823). No one is drawn: by the masjid of Madinah, his place, a
// golden ring, with the places of the folk. Folded clothes are brought before him, and a little black khamisa on top of
// them glints. His voice asks; the folk's places stay still and grow faint a while. His voice speaks again, and two
// places come from Umm Khalid's home, a small one carried by the other. The khamisa goes to her, and lies spread by her
// place, with a soft golden ring about her place. It grows pale and three patches show on it, sewn on, then it is new
// again. Its mark of green or yellow glints, and as his voice speaks a soft golden glow comes about it.
function blackKhamisa(): SignArt {
  // The pile and the khamisa are drawn closer, `k` and `kk` times their size, so the khamisa's mark and its patches
  // read on a phone.
  const k = 1.6;
  const kk = 2;
  const pile: [number, number] = [62.4, 107];
  const top = n(pile[1] - 5.1);
  const spread: [number, number] = [103, 101.4];
  const carried: [number, number, number][] = [
    [0.405, 0, 0],
    [0.455, -42, 0.6]
  ];
  const voice = arcs(49.2, 102.2, GOLD);
  return {
    kind: "black-khamisa",
    ms: 12000,
    parts: [
      ...day(126, 40, 12000),
      ...palms([
        [154, 97, 13],
        [29, 94.4, 10]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(1, 98.4, 0.46) },
      { name: "Umm Khalid's home", svg: home(134, 100.4, 20, 14) },
      { name: "the way from Umm Khalid's home", svg: way("M130 104.8 C118 106.2 104 107 85 105.8", "#F4E3BC", 0.8) },
      {
        name: "the places of the folk, silent a while",
        svg: someone(30, 106.2) + someone(35.4, 103.6) + someone(74.6, 103.2) + someone(78.8, 105.8),
        keys: fade([
          [0.272, 1],
          [0.3, 0.55],
          [0.392, 0.55],
          [0.41, 1]
        ])
      },
      { name: "his place, a golden ring", svg: ring(46, 103.6, 2.6, GOLD) },
      {
        name: "clothes brought to him, folded",
        svg: big(foldedClothes(pile[0], pile[1]), pile[0], pile[1], k),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.06, 1]
          ],
          xy: [
            [0.03, 0, 1.6],
            [0.07, 0, 0]
          ]
        })
      },
      {
        name: "a little black khamisa, folded, on top",
        svg: big(khamisaFolded(pile[0], top), pile[0], pile[1], k),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.06, 1],
            [0.555, 1],
            [0.57, 0]
          ],
          xy: [
            [0.03, 0, 1.6],
            [0.07, 0, 0],
            [0.52, 0, 0],
            [0.56, spread[0] - pile[0], 5.2]
          ]
        })
      },
      { name: "a black khamisa among them: a small glint", svg: sparkle(66.6, 96.6, 1, "#FFE7A0"), keys: showFor(0.07, 0.08, 0.268, 0.278), loop: speaking },
      { name: "his voice: whom should we dress in this", svg: voice, keys: showFor(0.144, 0.154, 0.268, 0.278), loop: speaking },
      { name: "his voice: bring me Umm Khalid", svg: voice, keys: showFor(0.392, 0.402, 0.516, 0.526), loop: speaking },
      {
        name: "the place of the one who brought Umm Khalid",
        svg: someone(128, 104.8),
        keys: track({
          opacity: [
            [0.405, 0],
            [0.415, 1]
          ],
          xy: carried
        })
      },
      {
        name: "Umm Khalid's place, a little one, carried",
        svg: someone(126.2, 102, 1),
        keys: track({
          opacity: [
            [0.405, 0],
            [0.415, 1]
          ],
          xy: carried
        })
      },
      { name: "his voice: may you live to wear it out, and mend it", svg: voice, keys: showFor(0.516, 0.526, 0.764, 0.774), loop: speaking },
      { name: "the little black khamisa, spread by Umm Khalid's place", svg: big(khamisaSpread(spread[0], spread[1]), spread[0], spread[1], kk), keys: showAt(0.555, 0.575) },
      { name: "a long life asked for her: a soft golden ring about Umm Khalid's place", svg: care(85.4, 104.2, 4.4, 2.8, SOFT_GOLD), keys: showAt(0.565, 0.585), loop: soft },
      { name: "worn, years on: the khamisa grown pale", svg: big(khamisaWorn(spread[0], spread[1]), spread[0], spread[1], kk), keys: showFor(0.642, 0.662, 0.764, 0.78) },
      { name: "mended: a patch on it 1", svg: big(patch(100.2, 102.4, "#8A6E52"), spread[0], spread[1], kk), keys: showFor(0.648, 0.658, 0.764, 0.78) },
      { name: "mended: a patch on it 2", svg: big(patch(104, 103.4, "#6E7C88"), spread[0], spread[1], kk), keys: showFor(0.668, 0.678, 0.764, 0.78) },
      { name: "mended: a patch on it 3", svg: big(patch(106.4, 102.2, "#9C7A55"), spread[0], spread[1], kk), keys: showFor(0.688, 0.698, 0.764, 0.78) },
      { name: "its mark of green or yellow: a soft white ring about it", svg: care(spread[0], 104.4, 12.8, 3.8, "#FFFFFF"), keys: showFor(0.77, 0.79, 0.888, 0.9), loop: soft },
      { name: "its mark of green or yellow: small glints", svg: sparkle(94.4, 105.2, 0.8, "#FFFFFF") + sparkle(111.4, 105.6, 0.8, "#FFFFFF"), keys: showAt(0.775, 0.795), loop: speaking },
      { name: "his voice: this is sanah", svg: voice, keys: showAt(0.888, 0.898), loop: speaking },
      { name: "beautiful: a soft golden glow about the khamisa", svg: glow(spread[0], 104.2, 8, WARM, 0.28), keys: showAt(0.9, 0.93) }
    ],
    words: [
      { text: "Clothes came to him, with a black khamisa", from: 0.02, to: 0.129 },
      { text: "He said: whom should we dress in this?", from: 0.144, to: 0.253 },
      { text: "The people kept silent", from: 0.268, to: 0.377 },
      { text: "He said: bring me Umm Khalid", from: 0.392, to: 0.501 },
      { text: "He said: may you live to wear it out", from: 0.516, to: 0.625 },
      { text: "and mend it, many times over", from: 0.64, to: 0.749 },
      { text: "On it was a mark of green or yellow", from: 0.764, to: 0.873 },
      { text: "He said: Umm Khalid, this is sanah!", from: 0.888, to: 1 }
    ]
  };
}

/** The walled garden of Banu an-Najjar: its ground, its far wall and its two side walls. */
const gardenBehind = () =>
  `<path d="M84 93.6 L126 93.6 L132 106 L78 106 Z" fill="#D9CB97"/>` +
  `<path d="M83.4 91.4 L126.6 91.4 L126.6 93.8 L83.4 93.8 Z" fill="#B08E62"/><path d="M83.4 91.4 L126.6 91.4" stroke="#C9A87A" stroke-width="0.5"/>` +
  `<path d="M84 93.6 L78 106 M126 93.6 L132 106" stroke="#A8875F" stroke-width="1.6" stroke-linecap="round"/>`;

/** The garden's near wall, low, of mud brick. */
const gardenFront = () =>
  `<path d="M76.6 105 L133.4 105 L133.4 107.4 L76.6 107.4 Z" fill="#B89566"/><path d="M76.6 105 L133.4 105" stroke="#CDAE80" stroke-width="0.5"/>`;

// The price asked only from Allah. Anas ibn Malik said: when the Messenger of Allah ﷺ came to Madinah, he ordered that a
// masjid be built, and said: O Banu an-Najjar, name me a price for this garden of yours. They said: no, by Allah, we
// will not ask its price except from Allah (Sahih al-Bukhari 2774). No one is drawn: his place, a golden ring, comes
// along the way into Madinah with the places of those with him. Before him is the walled garden of Banu an-Najjar, with
// its palms, and their homes and places beyond it. His voice speaks, and a faint golden outline of a masjid shows in the
// garden. His voice calls them, a soft ring comes about their places, a faint golden line goes from his place to the
// garden, and gold coins show by his place: a price. Their voices answer, and the coins fade. Then two sparks rise from
// their places, and a soft golden glow comes over the garden.
function gardenForTheMasjid(): SignArt {
  const comes: [number, number, number][] = [
    [0.03, -62, 0.4],
    [0.1, 0, 0]
  ];
  const voice = arcs(55.4, 102.8, GOLD);
  return {
    kind: "garden-for-the-masjid",
    ms: 10500,
    parts: [
      ...day(30, 110, 10500),
      ...palms([
        [8, 96, 12],
        [66, 94, 10]
      ]),
      { name: "a home of Madinah", svg: home(26, 99, 14, 10) },
      { name: "the homes of Banu an-Najjar", svg: home(148.6, 99.6, 15, 12) },
      { name: "the walled garden of Banu an-Najjar", svg: gardenBehind() },
      {
        name: "where the masjid would be: a faint golden outline in the garden",
        svg: `<path d="M90 96.4 L118 96.4 L121.4 103.2 L86.6 103.2 Z" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1.4 1" fill="#FFE7A0" fill-opacity="0.14"/>`,
        keys: showAt(0.175, 0.205)
      },
      ...palms(
        [
          [92, 101.6, 10.6],
          [106, 99.2, 12.4],
          [119.4, 101.8, 10.4]
        ],
        "the garden"
      ),
      { name: "the garden's low near wall", svg: gardenFront() },
      { name: "the way into Madinah", svg: way("M0 105.2 C16 105 34 104.6 46 104.4", "#F4E3BC", 0.8) },
      { name: "the places of those with him", svg: someone(40.4, 105.8) + someone(36, 103.4), keys: track({ xy: comes }) },
      { name: "his place, a golden ring", svg: ring(52, 104.2, 2.6, GOLD), keys: track({ xy: comes }) },
      { name: "his voice: a masjid to be built", svg: voice, keys: showFor(0.162, 0.172, 0.304, 0.314), loop: speaking },
      { name: "his voice: name me a price for this garden", svg: voice, keys: showFor(0.304, 0.314, 0.588, 0.598), loop: speaking },
      { name: "called: a soft ring about the places of Banu an-Najjar", svg: care(144, 104.6, 9, 2.8, "#FFFFFF"), keys: showFor(0.315, 0.34, 0.588, 0.6), loop: soft },
      { name: "the places of Banu an-Najjar", svg: someone(138.4, 105.2) + someone(144, 103.4) + someone(149.8, 105.6) },
      { name: "for this garden: a faint golden line to it", svg: lookLine(56, 103.4, 84, 100.6, 96.6, SOFT_GOLD), keys: showFor(0.45, 0.47, 0.588, 0.6) },
      { name: "a price: gold coins by his place", svg: goldCoin(58.6, 107.6, 1.2) + goldCoin(61.2, 107.8, 1.2) + goldCoin(60, 106.3, 1.2), keys: showFor(0.455, 0.475, 0.74, 0.76) },
      { name: "the voices of Banu an-Najjar: no price", svg: arcsLeft(135, 104, VOICE), keys: showFor(0.588, 0.598, 0.872, 0.882), loop: speaking },
      { name: "a spark rising from the places of Banu an-Najjar 1", svg: sparkle(140.6, 100, 1.2, "#FFE7A0"), keys: sparkRising(0.876, 0.95, 9), loop: speaking },
      { name: "a spark rising from the places of Banu an-Najjar 2", svg: sparkle(147, 99.2, 1.2, "#FFE7A0"), keys: sparkRising(0.886, 0.955, 9), loop: speaking },
      { name: "its reward asked: a soft golden glow over the garden", svg: wash(105, 100.6, 21, 6.4, "#FFE7A0", 0.14), keys: showAt(0.88, 0.91) }
    ],
    words: [
      { text: "When he came to Madinah", from: 0.02, to: 0.147 },
      { text: "he ordered a masjid to be built", from: 0.162, to: 0.289 },
      { text: "He said: O Banu an-Najjar,", from: 0.304, to: 0.431 },
      { text: "name me a price for this garden of yours", from: 0.446, to: 0.573 },
      { text: "They said: no, by Allah,", from: 0.588, to: 0.715 },
      { text: "we will not ask its price", from: 0.73, to: 0.857 },
      { text: "except from Allah", from: 0.872, to: 1 }
    ]
  };
}

// Guide them, and bring them. Abu Hurairah said: at-Tufayl and his companions came and said: O Messenger of Allah, Daws
// has disbelieved and refused, so pray to Allah against them. It was said: Daws is ruined, and the people thought he
// would pray against them. He ﷺ said: O Allah, guide Daws, and bring them (Sahih Muslim 2524, Sahih al-Bukhari 6397).
// No one is drawn: by the masjid of Madinah, his place, a golden ring, with the places of the folk; far off, the homes of
// Daws, and the road from them. The places of at-Tufayl and his companions come along the road. At-Tufayl's voice
// speaks, and a grey ring comes about the far homes of Daws. A voice among the folk speaks, and the far homes grow
// grey. His voice speaks, and a spark rises from his place. The grey fades, a soft golden glow comes about the homes of
// Daws, a faint golden way shows along the road, and the places of Daws come along it.
function guideDaws(): SignArt {
  const road = "M138 74.4 C132 80 120 88 104 94.6 C92 99.4 80 102.6 68 104.2";
  const comers: [number, number, number][] = [
    [0.03, 46, -16],
    [0.12, 0, 0]
  ];
  return {
    kind: "guide-daws",
    ms: 9500,
    parts: [
      ...day(118, 60, 9500),
      ...palms([
        [36, 95.4, 11],
        [154, 98, 12]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 98.4, 0.56) },
      { name: "far off: the homes of Daws", svg: big(farHomes(138, 72.4), 138, 72.4, 1.7) },
      { name: "the road from Daws", svg: way(road, "#F4E3BC", 0.8) },
      { name: "the places of the folk", svg: someone(24.6, 106.2) + someone(30.2, 107.4) },
      { name: "his place, a golden ring", svg: ring(44, 104.4, 2.6, GOLD) },
      {
        name: "the places of at-Tufayl and his folk",
        svg: someone(64, 104.6) + someone(70, 103.2) + someone(72, 106.2),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ],
          xy: comers
        })
      },
      { name: "at-Tufayl's voice: pray against them", svg: arcsLeft(60.6, 103.4, VOICE), keys: showFor(0.185, 0.195, 0.515, 0.525), loop: speaking },
      { name: "refused: a grey ring about the homes of Daws", svg: greyRing(138, 70.2, 14.6, 4), keys: showFor(0.2, 0.225, 0.85, 0.87) },
      { name: "a voice among the folk: Daws is ruined", svg: arcs(33.4, 105.6, VOICE), keys: showFor(0.515, 0.525, 0.68, 0.69), loop: speaking },
      { name: "ruined, it was said: the homes of Daws grown grey", svg: wash(138, 69.6, 15, 4.8, DIM, 0.2), keys: showFor(0.53, 0.56, 0.85, 0.87) },
      { name: "his voice: guide Daws", svg: arcs(47.4, 103, GOLD), keys: showFor(0.68, 0.69, 0.845, 0.855), loop: speaking },
      { name: "his prayer: a spark rising from his place", svg: sparkle(44, 100.6, 1.3, "#FFE7A0"), keys: sparkRising(0.685, 0.785, 10), loop: speaking },
      { name: "guided: a soft golden glow about the homes of Daws", svg: glow(138, 69.4, 8, WARM, 0.3), keys: showAt(0.85, 0.88) },
      { name: "brought: a faint golden way along the road", svg: way(road, GOLD, 0.9), keys: showAt(0.86, 0.885) },
      {
        name: "the places of Daws, coming",
        svg: someone(136.4, 74.4, 1.1) + someone(140, 75.6, 1.1) + someone(133.6, 76, 1.1),
        keys: track({
          opacity: [
            [0.87, 0],
            [0.88, 1]
          ],
          xy: [
            [0.88, 0, 0],
            [0.955, -30, 20]
          ]
        })
      }
    ],
    words: [
      { text: "At-Tufayl and his companions came", from: 0.02, to: 0.17 },
      { text: "They said: Daws disbelieved and refused", from: 0.185, to: 0.335 },
      { text: "so pray to Allah against them", from: 0.35, to: 0.5 },
      { text: "It was said: Daws is ruined", from: 0.515, to: 0.665 },
      { text: "He said: O Allah, guide Daws", from: 0.68, to: 0.83 },
      { text: "and bring them", from: 0.845, to: 1 }
    ]
  };
}

/** A glint, deep gold with a light heart, its middle at (x, y): news brought, or a praise rising, on the light sand. */
const newsGlint = (x: number, y: number) => sparkle(x, y, 1.8, "#F2B33D") + sparkle(x, y, 0.8, "#FFF6D8");

/** The high ground of the Awali, rising on the left. */
const awali = () => `<path d="M0 89.6 C10 86.2 34 85.2 52 88.4 C60 89.8 66 93.6 70 100 L0 100 Z" fill="#D6BD8B"/>`;

// Learning by turns. Umar said: I and a neighbour of mine from the Ansar, of Banu Umayyah ibn Zayd, at the Awali of
// Madinah, used to go down to the Messenger of Allah ﷺ by turns: my neighbour one day, and I one day. When it was my
// day, I brought my neighbour the news of that day, of the revelation and other things, and on my neighbour's day, my
// neighbour did the same (Sahih al-Bukhari 89). No one is drawn: on the high ground of the Awali, Umar's home and the
// Ansari's home, with their places; far down the way, the masjid of Madinah, and his place, a golden ring, before it. A
// soft ring comes about each of their places, and a soft white glow over the Awali. The Ansari's place goes down the
// way to his, and comes back; then Umar's place goes, and comes back with a small golden glint, which goes on to the
// Ansari's place. A soft golden glow comes about his place. The Ansari's place goes down again, and comes back with a
// glint, which goes on to Umar's place.
function learningInTurns(): SignArt {
  const umar: [number, number] = [13, 97.4];
  const ansari: [number, number] = [37, 96.4];
  const ansariGoes: [number, number] = [79.4, 8.2];
  const umarGoes: [number, number] = [101.6, 7.4];
  return {
    kind: "learning-in-turns",
    ms: 11500,
    parts: [
      ...day(140, 70, 11500),
      { name: "the high ground of the Awali", svg: awali() },
      ...palms(
        [
          [52, 90.6, 9],
          [3, 91.6, 8.6]
        ],
        "the Awali"
      ),
      ...palms([
        [150, 98, 12],
        [100, 96, 10]
      ]),
      { name: "Umar's home", svg: home(13, 92.6, 13, 9.4) },
      { name: "the Ansari's home", svg: home(37, 91.4, 13, 9.4) },
      { name: "the masjid of Madinah", svg: madinahMasjid(110, 99.6, 0.62) },
      { name: "the way down to the masjid", svg: way("M40 97.8 C52 100.6 74 104.6 116 104.8", "#F4E3BC", 0.8) },
      { name: "his place, a golden ring", svg: ring(125, 104.4, 2.4, GOLD) },
      { name: "a soft ring about Umar's place", svg: care(umar[0], 97.6, 3.2, 1.6, "#FFFFFF"), keys: showFor(0.03, 0.05, 0.162, 0.18), loop: soft },
      { name: "a soft ring about the Ansari's place", svg: care(ansari[0], 96.6, 3.2, 1.6, "#FFFFFF"), keys: showFor(0.07, 0.09, 0.162, 0.18), loop: soft },
      { name: "the Awali: a soft white glow over the high ground", svg: wash(30, 92, 30, 6, "#FFFFFF", 0.12), keys: showFor(0.17, 0.2, 0.304, 0.33) },
      {
        name: "Umar's place",
        svg: someone(umar[0], umar[1]),
        keys: track({
          xy: [
            [0.49, 0, 0],
            [0.53, umarGoes[0], umarGoes[1]],
            [0.592, umarGoes[0], umarGoes[1]],
            [0.63, 0, 0]
          ]
        })
      },
      {
        name: "the Ansari's place",
        svg: someone(ansari[0], ansari[1]),
        keys: track({
          xy: [
            [0.31, 0, 0],
            [0.385, ansariGoes[0], ansariGoes[1]],
            [0.45, ansariGoes[0], ansariGoes[1]],
            [0.49, 0, 0],
            [0.74, 0, 0],
            [0.81, ansariGoes[0], ansariGoes[1]],
            [0.876, ansariGoes[0], ansariGoes[1]],
            [0.915, 0, 0]
          ]
        })
      },
      {
        name: "the news of Umar's day: a small golden glint",
        svg: newsGlint(umar[0] + umarGoes[0], 101.4),
        keys: track({
          opacity: [
            [0.588, 0],
            [0.596, 1],
            [0.74, 1],
            [0.76, 0]
          ],
          xy: [
            [0.592, 0, 0],
            [0.63, -umarGoes[0], -7.4],
            [0.67, ansari[0] - umar[0] - umarGoes[0], -8.4]
          ]
        }),
        loop: speaking
      },
      { name: "revealed to him: a soft golden glow about his place", svg: glow(125, 103.4, 7, WARM, 0.28), keys: showFor(0.735, 0.76, 0.872, 0.89) },
      {
        name: "the news of the Ansari's day: a small golden glint",
        svg: newsGlint(ansari[0] + ansariGoes[0], 101.6),
        keys: track({
          opacity: [
            [0.872, 0],
            [0.88, 1]
          ],
          xy: [
            [0.876, 0, 0],
            [0.915, -ansariGoes[0], -7.6],
            [0.955, umar[0] - ansari[0] - ansariGoes[0], -6.6]
          ]
        }),
        loop: speaking
      }
    ],
    words: [
      { text: "Umar said: I and an Ansari neighbour", from: 0.02, to: 0.147 },
      { text: "lived at the Awali, on the edge of Madinah", from: 0.162, to: 0.289 },
      { text: "We went down to him by turns:", from: 0.304, to: 0.431 },
      { text: "my neighbour one day, and I one day", from: 0.446, to: 0.573 },
      { text: "I brought my neighbour that day's news", from: 0.588, to: 0.715 },
      { text: "of the revelation and other things", from: 0.73, to: 0.857 },
      { text: "and my neighbour did the same", from: 0.872, to: 1 }
    ]
  };
}

/** A donkey of the picture cards, its feet's middle at (x, y), `s` times its size. */
const donkey = (x: number, y: number, s: number, left = false) => animalAt("donkey", n(x - 50 * s), n(y - 73 * s), s, left);

/** A turban, its cloth wound and folded, its foot's middle at (x, y). */
const turban = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${y} L${n(x + 2.6)} ${y} L${n(x + 2.1)} ${n(y - 1.7)} L${n(x - 2.1)} ${n(y - 1.7)} Z" fill="#F4F1EA" stroke="#B9AE98" stroke-width="0.25"/>` +
  `<path d="M${n(x - 2.3)} ${n(y - 0.6)} Q${x} ${n(y - 1.3)} ${n(x + 2.3)} ${n(y - 0.6)}" stroke="#D9D2C4" stroke-width="0.35" fill="none"/>` +
  `<path d="M${n(x + 2.2)} ${n(y - 0.4)} L${n(x + 3.4)} ${n(y + 0.2)}" stroke="#F4F1EA" stroke-width="0.6" stroke-linecap="round"/>`;

/** Something drawn faintly. */
const faintly = (svg: string, opacity = 0.7) => `<g opacity="${opacity}">${svg}</g>`;

// A father's friends. Abdullah ibn Dinar said: a man of the desert met Abdullah ibn Umar on the road to Makkah. Ibn Umar
// greeted the man, set him on the donkey Ibn Umar had been riding, and gave him the turban from Ibn Umar's own head. We
// said: may Allah set you right, they are desert folk, and they are happy with little. Ibn Umar said: this man's father
// was dear to Umar ibn al-Khattab, and I heard the Messenger of Allah ﷺ say: the finest goodness is a son's kindness to
// the loved ones of his father (Sahih Muslim 2552a). No one is drawn: on the road to Makkah, Ibn Umar's place, his
// donkey, led, no one on it, and his turban, folded; behind, the places of Ibn Dinar and those with him. The place of a
// man of the desert comes along the road, and a soft white glow lies over the road ahead. The donkey goes to the man's
// side, then the turban, and a soft golden ring comes about the man's place. A voice speaks from Ibn Dinar's folk, then
// Ibn Umar's; the land grows warm and pale, long ago, with two faint places side by side and a warm glow about them.
// Then a soft golden glow comes about the man's place, and a soft golden line goes to it from Ibn Umar's place.
function fathersFriend(): SignArt {
  const ibnUmar: [number, number] = [49, 104.4];
  const man: [number, number] = [86, 104.6];
  return {
    kind: "fathers-friend",
    ms: 12000,
    parts: [
      ...day(126, 40, 12000),
      { name: "far off: the hills of Makkah", svg: `<path d="M112 61.4 L126 52.6 L136 57.6 L146 50.8 L160 58 L160 61.4 Z" fill="#B49A72"/>` },
      { name: "a thorny tree by the road 1", svg: thornyTree(8, 99, 0.6), origin: { x: 8, y: 99 }, loop: { move: "sway", ms: 5600, angle: 1.2 } },
      { name: "a thorny tree by the road 2", svg: thornyTree(146, 96, 0.5), origin: { x: 146, y: 96 }, loop: { move: "sway", ms: 6200, angle: 1.2, phase: 0.4 } },
      { name: "the road to Makkah", svg: way("M0 107.4 C40 107 100 106.8 160 107.6", "#F4E3BC", 1) },
      { name: "the road ahead: a soft white glow toward Makkah", svg: wash(126, 103, 28, 3, "#FFFFFF", 0.12), keys: showFor(0.15, 0.18, 0.268, 0.29) },
      { name: "the places of Ibn Dinar and those with him", svg: someone(22, 105.8) + someone(28, 103.4) },
      {
        name: "Ibn Umar's donkey, led, no one on it",
        svg: donkey(38, 106.6, 0.15),
        origin: { x: 38, y: 101.6 },
        keys: track({
          xy: [
            [0.272, 0, 0],
            [0.33, 56, 0.2]
          ]
        }),
        loop: { move: "bob", ms: 1600, y: 0.25 }
      },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1]) },
      {
        name: "Ibn Umar's turban, folded",
        svg: big(turban(55, 104.4), 55, 104.4, 1.6),
        keys: track({
          xy: [
            [0.396, 0, 0],
            [0.44, 23.4, 1.6]
          ]
        })
      },
      {
        name: "the desert Arab's place",
        svg: someone(man[0], man[1]),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: [
            [0.03, 52, 0],
            [0.085, 0, 0]
          ]
        })
      },
      { name: "given: a soft golden ring about the desert Arab's place", svg: care(88, 105, 9.4, 3, SOFT_GOLD), keys: showAt(0.445, 0.46), loop: soft },
      { name: "a voice from Ibn Dinar's folk: happy with little", svg: arcs(31, 102.6, VOICE), keys: showFor(0.516, 0.526, 0.64, 0.65), loop: speaking },
      { name: "Ibn Umar's voice", svg: arcsLeft(46.2, 103.2, VOICE), keys: showAt(0.64, 0.65), loop: speaking },
      { name: "long ago: the land warm and pale", svg: wash(80, 98, 96, 26, "#FFD9A0", 0.14), keys: showFor(0.65, 0.68, 0.764, 0.79) },
      { name: "long ago: Umar's place, faint", svg: faintly(someone(104, 93), 0.85), keys: showFor(0.655, 0.68, 0.764, 0.79) },
      { name: "long ago: the place of the desert Arab's elder, faint", svg: faintly(someone(111, 93.4), 0.85), keys: showFor(0.655, 0.68, 0.764, 0.79) },
      { name: "dear to Umar: a soft warm glow about the two", svg: glow(107.4, 93, 6, WARM, 0.28), keys: showFor(0.655, 0.68, 0.764, 0.79) },
      { name: "kindness: a soft golden glow about the desert Arab's place", svg: glow(man[0] + 1, 103.6, 7, WARM, 0.28), keys: showAt(0.892, 0.92) },
      { name: "ties kept: a soft golden line from Ibn Umar's place to the desert Arab's", svg: lookLine(51, 103.4, 84, 103.4, 99.6, SOFT_GOLD), keys: showAt(0.9, 0.93) }
    ],
    words: [
      { text: "A man of the desert met Ibn Umar", from: 0.02, to: 0.129 },
      { text: "on the road to Makkah", from: 0.144, to: 0.253 },
      { text: "Ibn Umar set the man on his own donkey", from: 0.268, to: 0.377 },
      { text: "and gave the turban from his own head", from: 0.392, to: 0.501 },
      { text: "We said: desert folk are happy with little", from: 0.516, to: 0.625 },
      { text: "Ibn Umar said: Umar loved the man's father", from: 0.64, to: 0.749 },
      { text: "I heard him say: the finest goodness is", from: 0.764, to: 0.873 },
      { text: "a son's kindness to his father's friends", from: 0.888, to: 1 }
    ]
  };
}

/** A camel far off, a small shape of it, its feet's middle at (x, y); `left`: facing left. */
const farCamel = (x: number, y: number, left = false) => {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * d)} ${n(y + dy)}`;
  return (
    `<path d="M${p(-2, -2.4)} Q${p(-1.2, -4.4)} ${p(0.3, -2.8)} L${p(1.2, -2.8)} Q${p(2, -3.2)} ${p(2.3, -4.4)} L${p(3.1, -4.4)} L${p(3.1, -3.9)} L${p(2.7, -3.9)} Q${p(2.5, -2.4)} ${p(1.3, -1.9)} L${p(-1.8, -1.9)} Q${p(-2.4, -2)} ${p(-2, -2.4)} Z" fill="#C9A26A"/>` +
    `<path d="M${p(-1.6, -2)} L${p(-1.6, 0)} M${p(-0.9, -2)} L${p(-0.9, 0)} M${p(0.6, -2)} L${p(0.6, 0)} M${p(1.2, -2)} L${p(1.2, 0)}" stroke="#B38A52" stroke-width="0.32"/>`
  );
};

/** A camel's saddle of wood with its cloth, its foot's middle at (x, y), `k` times its size. */
const saddle = (x: number, y: number, k: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx * k)} ${n(y + dy * k)}`;
  return (
    `<path d="M${p(-5, 0)} L${p(5, 0)} L${p(4.4, -1.4)} L${p(-4.4, -1.4)} Z" fill="#9C6A3C"/>` +
    `<path d="M${p(3.6, -1.2)} Q${p(4.4, -3.6)} ${p(5.4, -5.6)}" stroke="#7A4E2A" stroke-width="${n(1 * k)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${p(-3.6, -1.2)} Q${p(-4.6, -4.2)} ${p(-5.8, -7)}" stroke="#7A4E2A" stroke-width="${n(1.1 * k)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${p(-3.4, -1.6)} L${p(3.4, -1.6)} L${p(3.8, -3.4)} Q${p(0, -2.6)} ${p(-4, -3.8)} Z" fill="#B5473A"/>` +
    `<path d="M${p(-4.6, 0)} L${p(-4.2, 3.6)} L${p(4.2, 3.6)} L${p(4.6, 0)} Z" fill="#B5473A" opacity="0.9"/>`
  );
};

// One in a hundred. Abdullah ibn Umar said: I heard the Messenger of Allah ﷺ say: people are like camels; among a
// hundred, you can hardly find one fit to ride (Sahih al-Bukhari 6498). No one is drawn: a herd of camels roams the
// pasture, near and far, one of them with a saddle on its hump, no one on it. A soft white glow lies over the herd. Then
// many more camels show far off, the rest of the hundred. A faint golden ring goes from camel to camel, and comes to
// rest about the camel with the saddle: a soft golden glow comes about it, and its saddle glints.
function oneInAHundred(): SignArt {
  const near: [number, number, number, boolean][] = [
    [22, 104.6, 0.15, false],
    [54, 107, 0.16, true],
    [124, 106.4, 0.155, true]
  ];
  const middle: [number, number, number, boolean][] = [
    [16, 88.6, 0.095, false],
    [46, 87.4, 0.09, true],
    [76, 88.8, 0.095, false],
    [106, 87.6, 0.09, true],
    [136, 89, 0.095, false]
  ];
  const far: [number, number][] = [
    [12, 74],
    [22, 72.6],
    [31, 75.4],
    [44, 73],
    [55, 76.2],
    [67, 72.8],
    [78, 75],
    [90, 73.4],
    [101, 76.4],
    [113, 72.6],
    [124, 74.8],
    [136, 73.2],
    [147, 75.6],
    [18, 79.4],
    [40, 80.2],
    [62, 79.6],
    [86, 80.4],
    [108, 79.8],
    [130, 80.6],
    [150, 79.2]
  ];
  const fit: [number, number, number] = [90, 104.4, 0.16];
  const hump: [number, number] = [n(fit[0] - 10 * fit[2]), n(fit[1] - 52 * fit[2])];
  const camelPart = ([x, y, s, left]: [number, number, number, boolean], i: number, row: string, ms: number): SignPart => ({
    name: `a camel of the herd, ${row} ${i + 1}`,
    svg: camel(x, y, s, left),
    loop: { move: "bob", ms: ms + i * 700, x: left ? -1.2 : 1.2, y: 0.2, phase: (i % 3) / 3 }
  });
  return {
    kind: "one-in-a-hundred",
    ms: 9000,
    parts: [
      ...day(30, 120, 9000),
      { name: "a thorny tree of the pasture", svg: thornyTree(152, 97, 0.42), origin: { x: 152, y: 97 }, loop: { move: "sway", ms: 6000, angle: 1.2 } },
      { name: "the rest of the hundred, far off", svg: far.map(([x, y], i) => farCamel(x, y, i % 2 === 1)).join(""), keys: showAt(0.425, 0.47), loop: { move: "bob", ms: 7000, x: 0.6 } },
      ...middle.map((c, i) => camelPart(c, i, "a little way off", 6200)),
      { name: "a soft white glow over the herd", svg: wash(80, 100, 74, 10, "#FFFFFF", 0.1), keys: showFor(0.225, 0.26, 0.418, 0.44) },
      ...near.map((c, i) => camelPart(c, i, "near", 5400)),
      {
        name: "a camel fit to ride, its saddle on, no one on it",
        svg: camel(fit[0], fit[1], fit[2]) + saddle(hump[0], n(hump[1] + 0.9), 0.45),
        loop: { move: "bob", ms: 5000, x: 1, y: 0.2, phase: 0.5 }
      },
      {
        name: "hardly found: a faint golden ring going from camel to camel",
        svg: care(near[0][0], 105, 8.4, 2.4, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.62, 0],
            [0.63, 1]
          ],
          xy: [
            [0.63, 0, 0],
            [0.66, 0, 0],
            [0.685, 32, 2.4],
            [0.71, 32, 2.4],
            [0.735, 102, 1.8],
            [0.82, 102, 1.8],
            [0.85, 68, -0.4]
          ]
        }),
        loop: soft
      },
      { name: "found: a soft golden glow about the camel fit to ride", svg: glow(fit[0], 98.6, 7.4, WARM, 0.28), keys: showAt(0.84, 0.87) },
      { name: "a glint on its saddle", svg: sparkle(n(hump[0] + 0.6), n(hump[1] - 1.4), 0.9, "#FFE7A0"), keys: showAt(0.845, 0.865), loop: speaking }
    ],
    words: [
      { text: "Ibn Umar said: I heard him say:", from: 0.02, to: 0.204 },
      { text: "People are like camels:", from: 0.219, to: 0.403 },
      { text: "a hundred of them,", from: 0.418, to: 0.602 },
      { text: "and you can hardly find among them", from: 0.617, to: 0.801 },
      { text: "one fit to ride", from: 0.816, to: 1 }
    ]
  };
}

/** Rows of small white crests across the sea at y, `gap` apart, to slide round. */
const crests = (y: number, gap: number, offset: number) => {
  const list: string[] = [];
  for (let x = offset; x < 160; x += gap) list.push(`<path d="M${n(x)} ${y} q1.6 -1.1 3.2 0" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.7" stroke-linecap="round"/>`);
  return list.join("");
};

/** Puffs of foam about (x, y), `k` times their size. */
const foamPuffs = (x: number, y: number, k = 1) =>
  [
    [0, 0, 1.2],
    [1.6, -0.4, 0.9],
    [-1.6, -0.2, 1],
    [0.6, -1.1, 0.7],
    [2.8, 0.2, 0.6]
  ]
    .map(([dx, dy, r]) => `<circle cx="${n(x + dx * k)}" cy="${n(y + dy * k)}" r="${n(r * k)}" fill="#FFFFFF"/>`)
    .join("");

/** Small grey specks on the sand about (x, y). */
const specks = (x: number, y: number) =>
  [
    [-4.4, 1.2, 0.7],
    [-3, -1.4, 0.55],
    [3.6, -1, 0.65],
    [4.6, 1.4, 0.5],
    [-1.4, 2.6, 0.5],
    [1.8, 2.4, 0.6]
  ]
    .map(([dx, dy, r]) => `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="${r}" fill="${DIM}"/>`)
    .join("");

// Like the foam of the sea. Abu Hurairah said that the Messenger of Allah ﷺ said: whoever says Subhan Allah wa
// bihamdihi a hundred times in a day, his sins are taken away, even if they were like the foam of the sea (Sahih
// al-Bukhari 6405). No one is drawn: the sea, its waves and the foam along the shore, and on the sand the place of one
// who says it, with small grey specks about it. Sparks rise from the place, one after another, as the sun goes across
// the sky: a day. The grey specks fade, and a soft white glow and a soft white ring come about the place. Then the foam
// along the shore gleams.
function foamOfTheSea(): SignArt {
  const place: [number, number] = [60, 104];
  const spark = (i: number, from: number, to: number): SignPart => ({
    name: `a praise rising ${i}`,
    svg: newsGlint(place[0] + (i % 2 ? -1.2 : 1.2), 100.2),
    keys: sparkRising(from, to, 10),
    loop: speaking
  });
  const shore = "M0 92.4 C30 91 60 93.6 90 92.2 C120 91 140 93 160 92";
  return {
    kind: "foam-of-the-sea",
    ms: 9500,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun",
        svg: sun(24, 34),
        keys: track({
          xy: [
            [0.422, 0, 0],
            [0.49, 56, -10],
            [0.556, 112, 2]
          ]
        })
      },
      { name: "a cloud", svg: cloud(100, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9500 } },
      { name: "a seabird", svg: animalAt("dove", 116, 32, 0.11), loop: { move: "bob", ms: 7000, x: 6, y: 1.4 } },
      { name: "the sea", svg: `<rect y="61" width="160" height="33" fill="#4F9FD0"/><rect y="61" width="160" height="4" fill="#7DBCE4"/>` },
      { name: "the waves, far", svg: crests(68, 16, 4), loop: { move: "slide", ms: 12000 } },
      { name: "the waves, nearer", svg: crests(76, 20, 10), loop: { move: "slide", ms: 10000 } },
      { name: "the waves, near", svg: crests(85, 16, 2), loop: { move: "slide", ms: 8000 } },
      { name: "the shore", svg: `<path d="${shore} L160 120 L0 120 Z" fill="#EAD7A8"/>` },
      { name: "the wet sand", svg: `<path d="${shore} L160 95 C130 96 100 94.6 70 96 C40 97.2 20 95 0 95.6 Z" fill="#D9C08E"/>` },
      {
        name: "the foam of the sea",
        svg: [6, 20, 34, 48, 62, 76, 90, 104, 118, 132, 146, 158].map((x, i) => foamPuffs(x, i % 2 ? 92.6 : 91.8, i % 3 ? 0.9 : 1.1)).join(""),
        loop: { move: "bob", ms: 3000, x: 1.2, y: 0.4 }
      },
      { name: "the place of one who says it", svg: someone(place[0], place[1]), keys: showAt(0.03, 0.06) },
      { name: "wrongs: small grey specks about that place", svg: specks(place[0], place[1] + 1), keys: track({ opacity: [[0.03, 0], [0.06, 1], [0.62, 1], [0.66, 0]] }) },
      spark(1, 0.222, 0.3),
      spark(2, 0.252, 0.33),
      spark(3, 0.282, 0.36),
      spark(4, 0.422, 0.5),
      spark(5, 0.452, 0.53),
      spark(6, 0.482, 0.56),
      { name: "forgiven: a soft white glow about that place", svg: wash(place[0], place[1], 8, 3, "#FFFFFF", 0.12), keys: showAt(0.64, 0.67) },
      { name: "a soft white ring about that place", svg: care(place[0], place[1] + 0.4, 4, 2, "#FFFFFF"), keys: showAt(0.645, 0.675), loop: soft },
      { name: "like the foam of the sea: a soft white gleam along it", svg: wash(80, 92.4, 80, 2.6, "#FFFFFF", 0.14), keys: showAt(0.82, 0.85) },
      {
        name: "glints on the foam",
        svg: [18, 52, 86, 120, 150].map((x) => sparkle(x, 90.6, 0.7, "#FFFFFF")).join(""),
        keys: showAt(0.825, 0.85),
        loop: speaking
      }
    ],
    words: [
      { text: "He said: whoever says", from: 0.02, to: 0.204 },
      { text: "Subhan Allah wa bihamdihi", from: 0.219, to: 0.403 },
      { text: "a hundred times in a day,", from: 0.418, to: 0.602 },
      { text: "their sins are all forgiven,", from: 0.617, to: 0.801 },
      { text: "even if they were like the foam of the sea", from: 0.816, to: 1 }
    ]
  };
}

export const GUIDE_ART = {
  "black-khamisa": blackKhamisa,
  "garden-for-the-masjid": gardenForTheMasjid,
  "guide-daws": guideDaws,
  "learning-in-turns": learningInTurns,
  "fathers-friend": fathersFriend,
  "one-in-a-hundred": oneInAHundred,
  "foam-of-the-sea": foamOfTheSea
} as const;
