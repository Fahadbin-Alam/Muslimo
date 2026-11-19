import { animalAt, cloud, glow, n, sky, type SignArt } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, SIX, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { jar } from "./tradeArt";
import { lane } from "./freshArt";
import { kaaba } from "./rewardArt";
import { dish } from "./worthArt";

/**
 * Ties, and care: keeping a sick flock away from a healthy one; one whose neighbor is not safe from its harm; a
 * Hajj made at seven years old; being brothers, and not deserting one another for more than three nights; keeping ties
 * with those who cut them; and mentioning Allah's name and eating. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a
 * face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is
 * arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes down from the sky: what
 * is good is a light, glints and a soft golden ring. No name, word or number is written.
 */

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

/** The words of seven lines, the last held longest: the three nights show in it. */
const SEVEN_LONG = [
  [0.02, 0.13],
  [0.146, 0.256],
  [0.272, 0.382],
  [0.398, 0.508],
  [0.524, 0.634],
  [0.65, 0.76],
  [0.776, 1]
] as const;

/** Abu Hurairah's place and voice: a plum. */
const ABU_HURAIRAH = "#8A5E7A";
/** The place of the one who keeps the healthy sheep: a green. */
const KEEPER = "#5E8A52";
/** The place of the one who keeps the sick sheep: a dusty brown. */
const KEEPS_SICK = "#9A7A5E";
/** Sickness: a soft blue grey. */
const SICK = "#7E8EA8";
/** Abu Shuraih's place and voice: a deep blue. */
const ABU_SHURAIH = "#3E5E7A";
/** The place by the home on the left, the harm came from it: a dull brown. */
const HARMS = "#8A7A6A";
/** The place next door: a teal. */
const NEXT_DOOR = "#4E7A7A";
/** Not safe: a soft blue grey. */
const NOT_SAFE = "#7E8EA8";
/** As-Sa'ib's place and voice: a slate blue. */
const SAIB = "#5E7A9A";
/** The place of the one who brought him on Hajj: a warm brown. */
const BROUGHT = "#8A6E4E";
/** The places of those on Hajj: a sand brown. */
const ON_HAJJ = "#B49A78";
/** Anas's place and voice: an olive. */
const ANAS = "#6E7E4E";
/** The place of one of the two Muslims: a green. */
const ONE = "#4E8A6E";
/** The place of the other of the two Muslims: a rose brown. */
const OTHER = "#9A6A6E";
/** Abdullah ibn Amr's place and voice: an olive brown. */
const ABDULLAH = "#7E7A4E";
/** The place of the one who keeps the ties: a deep green. */
const WASIL = "#3E6E5E";
/** The places of its relatives: a dusk purple. */
const KIN = "#7A6E9A";
/** Aishah's place and voice: a plum. */
const AISHAH = "#9A5E7A";
/** The places and voices of those who asked him: a slate. */
const ASKED = "#5E6E8A";
/** The places of those new to Islam: a warm sand. */
const NEW_TO_ISLAM = "#A88E5E";
/** What is grey: what is not to be done, what is cut, what is not known. */
const GREY = "#8C8C96";
/** What is heavier: harm, and not believing. */
const HEAVY = "#5E5E68";

/** A thousandth: times written as the sum of two are kept exact. */
const at3 = (time: number) => Math.round(time * 1000) / 1000;

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y); `left`: facing left. */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A fold of rails for sheep from x1 to x2, its foot at y, with a post every `step`. */
const fold = (x1: number, x2: number, y: number, step: number) => {
  const posts: number[] = [];
  for (let x = x1; x <= x2 + 0.01; x += step) posts.push(n(x));
  return (
    `<path d="M${x1} ${n(y - 6.4)} L${x2} ${n(y - 6.4)} M${x1} ${n(y - 3)} L${x2} ${n(y - 3)}" stroke="#9C7A50" stroke-width="0.6"/>` +
    posts.map((x) => `<path d="M${x} ${n(y - 8)} L${x} ${y}" stroke="#7E5E3A" stroke-width="0.8" stroke-linecap="round"/>`).join("")
  );
};

/** A piece of cooked meat, its middle at (x, y). */
const piece = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="1.1" ry="0.75" fill="#8E5A36"/><path d="M${n(x - 0.6)} ${n(y - 0.2)} L${n(x + 0.5)} ${n(y - 0.3)}" stroke="#B07A4E" stroke-width="0.3" stroke-linecap="round"/>`;

/** A dish with pieces of cooked meat on it, its middle at (x, y). */
const meat = (x: number, y: number) =>
  dish(x, y) +
  [
    [-1.6, -1.6],
    [0.3, -2.1],
    [1.9, -1.5]
  ]
    .map(([dx, dy]) => piece(n(x + dx), n(y + dy)))
    .join("");

/** A small soft golden dot, its middle at (x, y). */
const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="0.75" fill="#EDB846" stroke="#B07E2A" stroke-width="0.25"/>`;

// Keep the sick apart. Abu Hurairah said: the Messenger of Allah ﷺ said: the cattle suffering from a disease should not
// be mixed up with healthy cattle (Sahih al-Bukhari 5771). The words leave out the translator's list of cattle and what
// comes after. No one is drawn: a fold of healthy sheep on the left, the place of the one who keeps them by it; far off,
// the masjid of Madinah and his place by it, a golden ring. Abu Hurairah's voice tells of it. A sheep comes along from
// the right with the place of the one who keeps it, and stops by the lane to the fold. His voice speaks, soft and golden,
// far off. A soft blue-grey ring comes about that sheep: it is sick. A grey dashed ring comes about the lane to the fold:
// it is not to be mixed with the healthy ones. Glints show over the healthy sheep, and a soft golden ring comes about the
// place that kept the sick one apart.
function keepTheSickApart(): SignArt {
  const abuHurairah: [number, number] = [154, 106.8];
  const his: [number, number] = [122.6, 90.6];
  const keeper: [number, number] = [7, 104.8];
  const herd: [number, number, boolean][] = [
    [22, 101.6, false],
    [33, 100.6, true],
    [44, 102, false],
    [55, 100.8, true]
  ];
  const sickFrom: [number, number] = [126, 104.2];
  const sickAt: [number, number] = [100, 104];
  const keepsFrom: [number, number] = [136, 105];
  const keepsAt: [number, number] = [110, 104.8];
  const comes = (from: [number, number], to: [number, number]) =>
    track({
      xy: [
        [0.04, 0, 0],
        [0.16, n(to[0] - from[0]), n(to[1] - from[1])]
      ]
    });
  return {
    kind: "keep-the-sick-apart",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(76, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#D9CB98", [[20, 116], [70, 118], [140, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(112, 88, 0.44) },
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.8, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcsLeft(n(his[0] - 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: showFor(0.2, 0.206, 0.96, 0.966), loop: speaking },
      ...palms([[144, 92, 7]]),
      { name: "the lane to the fold", svg: lane([[62, 104.8], [80, 105], [94, 104.8]]) },
      { name: "not to be mixed: a grey dashed ring about the lane to the fold", svg: care(79, 105.8, 10, 2.2, GREY), keys: showAt(0.72, 0.735) },
      ...herd.map(([x, y, left], i) => ({
        name: `a healthy sheep ${i + 1}, in the fold`,
        svg: sheep(x, y, 0.1, left),
        origin: { x, y },
        loop: { move: "bob" as const, ms: 1800 + i * 240, y: -0.3, phase: i / 4 }
      })),
      { name: "the fold, its rails", svg: fold(14, 62, 105, 8) },
      { name: "glints over the healthy sheep", svg: glints([[24, 92.4], [38, 90.8], [52, 92.4]]), keys: showAt(0.82, 0.835), loop: twinkle() },
      { name: "the place of the one who keeps the healthy sheep", svg: someone(keeper[0], keeper[1], 1.5, KEEPER) },
      { name: "sick: a soft blue-grey ring about the sheep from the right", svg: care(sickAt[0], n(sickAt[1] + 0.6), 6, 2.4, SICK), keys: showAt(0.4, 0.42), loop: soft },
      {
        name: "a sheep from the right, sick, coming to the lane and stopping there",
        svg: sheep(sickFrom[0], sickFrom[1], 0.1, true),
        keys: comes(sickFrom, sickAt),
        loop: { move: "bob", ms: 2800, y: -0.2 }
      },
      { name: "the place of the one who keeps the sick sheep, coming with it", svg: someone(keepsFrom[0], keepsFrom[1], 1.5, KEEPS_SICK), keys: comes(keepsFrom, keepsAt) },
      { name: "kept apart: a soft golden ring about the place that keeps the sick sheep", svg: care(keepsAt[0], n(keepsAt[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ABU_HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(abuHurairah[0] - 2.4), n(abuHurairah[1] - 3.2), ABU_HURAIRAH), keys: showFor(0.024, 0.03, 0.18, 0.186), loop: speaking }
    ],
    words: linesOn(THREE, ["Abu Hurairah: he said: the cattle", "Suffering from a disease should not be", "Mixed up with healthy cattle."])
  };
}

// Safe next door. Abu Shuraih said: the Prophet ﷺ said: by Allah, he does not believe! By Allah, he does not believe! By
// Allah, he does not believe! It was said: who is that, O Messenger of Allah? He said: that person whose neighbor does not
// feel safe from his evil (Sahih al-Bukhari 6016). The words leave out "O Allah's Messenger". No one is drawn, and
// nothing is drawn for Allah: two homes side by side on a lane, and a place by each; far off, the masjid of Madinah and
// his place by it, a golden ring. Abu Shuraih's voice tells of it. His voice speaks, soft and golden, far off, and three
// times a small grey dot shows by it: three times he said it. The voice of one by him asks who. His voice speaks again.
// Grey specks go from the place on the left to the place next door: harm. That place draws back to its door, and a soft
// blue-grey ring comes about it: not safe. A heavy grey ring comes about the place the harm came from.
function safeNextDoor(): SignArt {
  const abuShuraih: [number, number] = [154, 106.8];
  const his: [number, number] = [122.6, 90.6];
  const asked: [number, number] = [133.6, 91.4];
  const harms: [number, number] = [36, 105];
  const nextDoor: [number, number] = [62, 105];
  const drawsBack: [number, number] = [2.2, -3.4];
  const said = (x: number) => `<circle cx="${x}" cy="77.2" r="0.9" fill="${GREY}" stroke="${HEAVY}" stroke-width="0.3"/>`;
  const speck = (x: number, y: number) => `<path d="M${n(x - 0.8)} ${y} L${x} ${n(y - 0.8)} L${n(x + 0.8)} ${y} L${x} ${n(y + 0.8)} Z" fill="${HEAVY}"/>`;
  const specks: [number, number, number, number][] = [
    [38.8, 102.6, 18.2, 0.2],
    [38.4, 104.2, 19.6, 0.2],
    [39, 105.8, 18.6, -0.4]
  ];
  return {
    kind: "safe-next-door",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(36, 20) },
      { name: "a cloud", svg: cloud(88, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(112, 88, 0.44) },
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.8, GOLD) },
      {
        name: "his voice, soft and golden, far off",
        svg: arcsLeft(n(his[0] - 2.6), n(his[1] - 2.4), SOFT_GOLD),
        keys: track({
          opacity: [
            [0.07, 0],
            [0.076, 1],
            [0.498, 1],
            [0.504, 0],
            [0.586, 0],
            [0.592, 1],
            [0.96, 1],
            [0.966, 0]
          ]
        }),
        loop: speaking
      },
      { name: "said once: a small grey dot by his voice", svg: said(117.6), keys: showAt(0.19, 0.205) },
      { name: "said a second time: a second small grey dot", svg: said(121.6), keys: showAt(0.35, 0.365) },
      { name: "said a third time: a third small grey dot", svg: said(125.6), keys: showAt(0.43, 0.445) },
      { name: "far off: the place of one who asked him", svg: someone(asked[0], asked[1], 1.2, ASKED) },
      { name: "its voice, asking who", svg: arcsLeft(n(asked[0] - 2.2), n(asked[1] - 2.2), ASKED), keys: showFor(0.508, 0.514, 0.574, 0.58), loop: speaking },
      ...palms([[144, 92, 7], [96, 98, 8]]),
      { name: "a home on the left", svg: home(30, 99, 18, 10.5) },
      { name: "the home next door", svg: home(66, 99, 18, 10.5, "#D8B47E") },
      { name: "the lane before the two homes", svg: lane([[12, 105.4], [50, 105.6], [90, 105.2]]) },
      { name: "the place by the home on the left", svg: someone(harms[0], harms[1], 1.5, HARMS) },
      ...specks.map(([x, y, dx, dy], i) => ({
        name: `harm: a grey speck ${i + 1}, from the place on the left to the place next door`,
        svg: speck(x, y),
        keys: track({
          opacity: [
            [at3(0.662 + i * 0.016), 0],
            [at3(0.668 + i * 0.016), 1]
          ],
          xy: [
            [at3(0.668 + i * 0.016), 0, 0],
            [at3(0.73 + i * 0.016), dx, dy]
          ]
        })
      })),
      {
        name: "the place next door, drawing back to its door",
        svg: someone(nextDoor[0], nextDoor[1], 1.5, NEXT_DOOR),
        keys: track({
          xy: [
            [0.825, 0, 0],
            [0.865, drawsBack[0], drawsBack[1]]
          ]
        })
      },
      {
        name: "not safe: a soft blue-grey ring about the place next door",
        svg: care(n(nextDoor[0] + drawsBack[0]), n(nextDoor[1] + drawsBack[1] + 0.8), 4.4, 2.2, NOT_SAFE),
        keys: showAt(0.875, 0.89),
        loop: soft
      },
      {
        name: "does not believe: a heavy grey ring about the place the harm came from",
        svg: care(harms[0], n(harms[1] + 0.8), 6.4, 3.2, HEAVY) + care(harms[0], n(harms[1] + 0.8), 5.4, 2.7, HEAVY),
        keys: showAt(0.915, 0.935)
      },
      { name: "Abu Shuraih's place", svg: someone(abuShuraih[0], abuShuraih[1], 1.5, ABU_SHURAIH) },
      { name: "Abu Shuraih's voice: telling of it", svg: arcsLeft(n(abuShuraih[0] - 2.4), n(abuShuraih[1] - 3.2), ABU_SHURAIH), keys: showFor(0.024, 0.03, 0.06, 0.066), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Abu Shuraih: he said: by Allah, he does",
      "Not believe! By Allah, he does not",
      "Believe! By Allah, he does not believe!",
      "It was said: who is that? He said:",
      "That person whose neighbor does not",
      "Feel safe from his evil."
    ])
  };
}

// Hajj at seven. As-Sa'ib ibn Yazid said: I was made to perform Hajj with the Messenger of Allah ﷺ, and I was a
// seven-year-old boy then (Sahih al-Bukhari 1858). The words leave out the translator's "while in the company of my
// parents". No one is drawn: the Ka'bah among the hills of Makkah, the places of those on Hajj about it, and his place by
// it, a golden ring. As-Sa'ib's voice tells of it. A place comes from the right with a small place by it: the one who
// brought him, and As-Sa'ib, young. A soft light comes about the Ka'bah: the Hajj; and a faint golden way goes from the
// young place to his place: with him. Seven small soft golden dots show over the young place, one by one: seven years;
// and a soft golden ring comes about it.
function hajjAtSeven(): SignArt {
  const saib: [number, number] = [154, 106.8];
  const his: [number, number] = [98, 105.4];
  const onHajj: [number, number][] = [
    [54, 104.6],
    [61, 107.2],
    [68.6, 108.2],
    [124, 104.6],
    [131, 107]
  ];
  const broughtFrom: [number, number] = [140.6, 106.4];
  const brought: [number, number] = [112.6, 106.2];
  const youngFrom: [number, number] = [134.6, 107];
  const young: [number, number] = [106.6, 106.8];
  const comes = (from: [number, number], to: [number, number]) =>
    track({
      opacity: [
        [0.34, 0],
        [0.35, 1]
      ],
      xy: [
        [0.35, 0, 0],
        [0.5, n(to[0] - from[0]), n(to[1] - from[1])]
      ]
    });
  return {
    kind: "hajj-at-seven",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(84, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "the hills of Makkah", svg: hills("#B89E76") },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the Hajj: a soft light about the Ka'bah", svg: glow(80, 95.6, 11, "#FFF3CF", 0.2), keys: showAt(0.54, 0.555), loop: soft },
      { name: "the Ka'bah", svg: kaaba(80, 101, 1.6) },
      { name: "the places of those on Hajj", svg: onHajj.map(([x, y]) => someone(x, y, 1.5, ON_HAJJ)).join("") },
      { name: "his place, a golden ring, by the Ka'bah", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "with him: a faint golden way from the young place to his place",
        svg: way(`M${n(young[0] - 1.4)} ${n(young[1] - 1.2)} Q${n((young[0] + his[0]) / 2)} 101.4 ${n(his[0] + 1.6)} ${n(his[1] - 1.6)}`, SOFT_GOLD, 0.8),
        keys: showAt(0.58, 0.595)
      },
      { name: "the place of the one who brought him on Hajj, coming from the right", svg: someone(broughtFrom[0], broughtFrom[1], 1.5, BROUGHT), keys: comes(broughtFrom, brought) },
      { name: "As-Sa'ib's young place, small, coming from the right", svg: someone(youngFrom[0], youngFrom[1], 1, SAIB), keys: comes(youngFrom, young) },
      ...Array.from({ length: 7 }, (_, i) => {
        const from = at3(0.69 + i * 0.018);
        return {
          name: `seven years: a soft golden dot ${i + 1} over the young place`,
          svg: dot(n(young[0] + (i - 3) * 1.7), 98.4),
          keys: showAt(from, at3(from + 0.008))
        };
      }),
      { name: "a soft golden ring about the young place", svg: care(young[0], n(young[1] + 0.6), 3.4, 1.7, SOFT_GOLD), keys: showAt(0.88, 0.895), loop: soft },
      { name: "As-Sa'ib's place", svg: someone(saib[0], saib[1], 1.5, SAIB) },
      { name: "As-Sa'ib's voice: telling of it", svg: arcsLeft(n(saib[0] - 2.4), n(saib[1] - 3.2), SAIB), keys: showFor(0.024, 0.03, 0.28, 0.286), loop: speaking }
    ],
    words: linesOn(THREE, ["As-Sa'ib ibn Yazid: I was made to", "Perform Hajj with him, and I was a", "Seven-year-old boy then."])
  };
}

// Be brothers. Anas ibn Malik said: the Messenger of Allah ﷺ said: do not hate one another, nor be jealous of one
// another; and do not desert one another, but O Allah's worshipers! Be brothers! And it is unlawful for a Muslim to
// desert his brother Muslim for more than three nights (Sahih al-Bukhari 6076). The words leave out the translator's "and
// not to talk to him". No one is drawn: two homes, one on each side, a lane between them, and the places of two Muslims
// together in the middle; far off, the masjid of Madinah and his place by it, a golden ring. Anas's voice tells of it.
// His voice speaks, soft and golden. The two places go apart, each to its home, and a grey dashed way shows between
// them: deserting. It goes, they come back together, and a soft golden ring comes about them: brothers. They go apart
// again and the grey way shows; three pale crescents show in the sky, one by one: three nights; then the grey way goes,
// they come back together, and the soft golden ring and glints come about them.
function beBrothers(): SignArt {
  const anas: [number, number] = [154, 106.8];
  const his: [number, number] = [72.6, 90.6];
  const one: [number, number] = [70, 105.2];
  const other: [number, number] = [77, 105.4];
  const goes = (dx: number) =>
    track({
      xy: [
        [0.28, 0, 0],
        [0.33, dx, -0.4],
        [0.4, dx, -0.4],
        [0.45, 0, 0],
        [0.655, 0, 0],
        [0.7, dx, -0.4],
        [0.87, dx, -0.4],
        [0.92, 0, 0]
      ]
    });
  const nights = [0.79, 0.815, 0.84];
  return {
    kind: "be-brothers",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(96, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      ...nights.map((from, i) => ({
        name: `three nights: a pale crescent ${i + 1} in the sky`,
        svg: crescent(30 + i * 11, 22, 3.2, 1.6, "#E6C35C"),
        keys: showAt(from, at3(from + 0.01))
      })),
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(62, 88, 0.44) },
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.8, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcsLeft(n(his[0] - 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: showFor(0.07, 0.076, 0.96, 0.966), loop: speaking },
      ...palms([[102, 92, 7]]),
      { name: "a home on the left", svg: home(16, 99, 18, 11) },
      { name: "a home on the right", svg: home(132, 99, 18, 11) },
      { name: "the lane between the homes", svg: lane([[25, 104.8], [73.5, 105.4], [122, 104.8]]) },
      {
        name: "deserting: a grey dashed way between the two places",
        svg: way("M31 106.6 Q73.5 109.4 116 106.6", GREY, 0.9),
        keys: track({
          opacity: [
            [0.335, 0],
            [0.35, 1],
            [0.4, 1],
            [0.415, 0],
            [0.705, 0],
            [0.72, 1],
            [0.87, 1],
            [0.885, 0]
          ]
        })
      },
      {
        name: "together as one: a soft golden ring about the two places",
        svg: care(73.5, 106, 8.4, 2.8, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.455, 0],
            [0.47, 1],
            [0.655, 1],
            [0.67, 0],
            [0.925, 0],
            [0.94, 1]
          ]
        }),
        loop: soft
      },
      { name: "the place of one Muslim, going to its home on the left and back", svg: someone(one[0], one[1], 1.5, ONE), keys: goes(-42) },
      { name: "the place of the other Muslim, going to its home on the right and back", svg: someone(other[0], other[1], 1.5, OTHER), keys: goes(42) },
      { name: "glints over the two places together", svg: glints([[69, 96.6], [73.5, 95], [78, 96.6]]), keys: showAt(0.95, 0.962), loop: twinkle() },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.5, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcsLeft(n(anas[0] - 2.4), n(anas[1] - 3.2), ANAS), keys: showFor(0.024, 0.03, 0.06, 0.066), loop: speaking }
    ],
    words: linesOn(SEVEN_LONG, [
      "Anas ibn Malik: he said: do not hate",
      "One another, nor be jealous of one",
      "Another; and do not desert one another,",
      "But O Allah's worshipers! Be brothers!",
      "And it is unlawful for a Muslim to",
      "Desert his brother Muslim for more",
      "Than three nights."
    ])
  };
}

// Keep ties when cut. Abdullah ibn Amr said: the Prophet ﷺ said: al-Wasil is not the one who recompenses the good done
// to him by his relatives, but al-Wasil is the one who keeps good relations with those relatives who had severed the bond
// of kinship with him (Sahih al-Bukhari 5991). No one is drawn: on the left, a home and the place of one by it; on the
// right, the home of its relatives and their places; far off, the masjid of Madinah and his place by it, a golden ring.
// Abdullah's voice tells of it. His voice speaks, soft and golden. A basket of dates goes from the relatives to the one
// on the left: good done to it; and a jar goes back: repaid. A soft light comes about the one on the left: al-Wasil. The
// relatives' places go back to their home, and a grey dashed way shows between the homes: the bond is severed. Then the
// one on the left goes to them with a sack; the grey way goes, a faint golden way shows between the homes, and a soft
// golden ring comes about its place: it keeps the ties.
function keepTiesWhenCut(): SignArt {
  const abdullah: [number, number] = [154, 106.8];
  const his: [number, number] = [72.6, 89.6];
  const wasil: [number, number] = [30, 104.8];
  const goes = 76;
  const kin: [number, number][] = [
    [106, 104.8],
    [113, 105.6]
  ];
  const between = "M34 107 Q70 110.4 104 107";
  const withIt = track({
    xy: [
      [0.83, 0, 0],
      [0.88, goes, 0]
    ]
  });
  return {
    kind: "keep-ties-when-cut",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(110, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(62, 87, 0.44) },
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.8, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcsLeft(n(his[0] - 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: showFor(0.11, 0.116, 0.96, 0.966), loop: speaking },
      ...palms([[96, 92, 7]]),
      { name: "a home on the left", svg: home(14, 99, 18, 11) },
      { name: "the home of its relatives, on the right", svg: home(128, 99, 20, 12) },
      { name: "the lane between the homes", svg: lane([[30, 104.8], [70, 105.2], [110, 104.8]]) },
      {
        name: "the bond severed: a grey dashed way between the homes",
        svg: way(between, GREY, 0.9),
        keys: track({
          opacity: [
            [0.725, 0],
            [0.74, 1],
            [0.885, 1],
            [0.9, 0]
          ]
        })
      },
      { name: "the ties kept: a faint golden way between the homes", svg: way(between, SOFT_GOLD, 0.9), keys: showAt(0.9, 0.915) },
      {
        name: "good done to it: a basket of dates, from its relatives to it",
        svg: basketOfDates(102, 105.6),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.19, 1]
          ],
          xy: [
            [0.19, 0, 0],
            [0.27, -66, 0]
          ]
        })
      },
      {
        name: "repaid: a jar, from it back to its relatives",
        svg: jar(43, 105.6, 0.7),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.35, 1]
          ],
          xy: [
            [0.35, 0, 0],
            [0.43, 53, 0.2]
          ]
        })
      },
      {
        name: "the places of its relatives, turning back to their home",
        svg: kin.map(([x, y]) => someone(x, y, 1.5, KIN)).join(""),
        keys: track({
          xy: [
            [0.66, 0, 0],
            [0.72, 16, 0.4]
          ]
        })
      },
      {
        name: "al-Wasil: a soft light about its place, going with it",
        svg: glow(wasil[0], n(wasil[1] - 0.6), 4.4, "#FFF3CF", 0.22),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.515, 1]
          ],
          xy: [
            [0.83, 0, 0],
            [0.88, goes, 0]
          ]
        }),
        loop: soft
      },
      {
        name: "a sack it takes to them",
        svg: sack(25, 105.2, 0.6),
        keys: track({
          opacity: [
            [0.82, 0],
            [0.83, 1]
          ],
          xy: [
            [0.83, 0, 0],
            [0.88, goes, 0]
          ]
        })
      },
      { name: "the place of the one on the left, going to its relatives", svg: someone(wasil[0], wasil[1], 1.5, WASIL), keys: withIt },
      { name: "it keeps the ties: a soft golden ring about its place", svg: care(n(wasil[0] + goes), n(wasil[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.92, 0.935), loop: soft },
      { name: "Abdullah's place", svg: someone(abdullah[0], abdullah[1], 1.5, ABDULLAH) },
      { name: "Abdullah's voice: telling of it", svg: arcsLeft(n(abdullah[0] - 2.4), n(abdullah[1] - 3.2), ABDULLAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Abdullah ibn Amr: he said: al-Wasil is",
      "Not the one who recompenses the good",
      "Done to him by his relatives, but",
      "Al-Wasil is the one who keeps good",
      "Relations with those relatives who had",
      "Severed the bond of kinship with him."
    ])
  };
}

// Say Bismillah and eat. Aishah said: the people said to the Prophet ﷺ: O Allah's Messenger! Here are people who have
// recently embraced Islam, and they bring meat, and we do not know whether they had mentioned Allah's Name while
// slaughtering the animals or not. The Prophet ﷺ said: you should mention Allah's Name and eat (Sahih al-Bukhari 7398).
// The words leave out "O Allah's Messenger" and "while slaughtering the animals", and nothing of that is drawn. No one is
// drawn: the masjid of Madinah on the right and his place at its door, a golden ring, and the places of those who asked
// him. Aishah's voice tells of it. Their voice asks him. The places of three new to Islam come along the lane from the
// left, and a dish of meat they bring is set down before those who asked. A grey dashed ring comes about the dish: they
// do not know. His voice answers, soft and golden. Their voices say Bismillah, soft and golden, glints rise from the dish,
// a piece of it goes to each of them, and a soft golden ring comes about their places.
function sayBismillahAndEat(): SignArt {
  const aishah: [number, number] = [154, 106.8];
  const his: [number, number] = [119.8, 104.2];
  const asked: [number, number][] = [
    [94, 104.8],
    [87, 105.6]
  ];
  const newFrom: [number, number][] = [
    [8, 104.8],
    [16, 105.6],
    [24, 104.6]
  ];
  const dishFrom: [number, number] = [73, 106];
  const dishAt: [number, number] = [80.6, 106.2];
  const rise: [number, number][] = [
    [-2.4, -3],
    [0, -4],
    [2.4, -3]
  ];
  return {
    kind: "say-bismillah-and-eat",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(36, 20) },
      { name: "a cloud", svg: cloud(80, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[60, 92, 7.2]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(104, 100, 0.66) },
      { name: "the lane from the left", svg: lane([[4, 105], [40, 105.2], [76, 105]]) },
      { name: "not known: a grey dashed ring about the dish", svg: care(dishAt[0], n(dishAt[1] - 0.4), 5.4, 2.4, GREY), keys: showFor(0.52, 0.535, 0.84, 0.855) },
      {
        name: "a dish of meat they bring, set down before those who asked",
        svg: meat(dishFrom[0], dishFrom[1]),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.35, 1]
          ],
          xy: [
            [0.35, 0, 0],
            [0.4, n(dishAt[0] - dishFrom[0]), n(dishAt[1] - dishFrom[1])]
          ]
        })
      },
      ...rise.map(([dx, dy], i) => ({
        name: `Bismillah: a glint ${i + 1}, rising from the dish`,
        svg: sparkle(n(dishAt[0] + dx), n(dishAt[1] + dy), 1.3, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.86, 0],
            [0.87, 1]
          ],
          xy: [
            [0.87, 0, 0],
            [0.9, 0, -6]
          ]
        }),
        loop: twinkle(1200 + i * 150)
      })),
      ...asked.map(([x, y], i) => ({
        name: `and eat: a piece of the meat, going to the place of one who asked ${i + 1}`,
        svg: piece(n(dishAt[0] + (i ? -1.6 : 1.9)), n(dishAt[1] - 1.6)),
        keys: track({
          opacity: [
            [0.875, 0],
            [0.88, 1]
          ],
          xy: [
            [0.88, 0, 0],
            [0.93, n(x - 2.4 - (dishAt[0] + (i ? -1.6 : 1.9))), n(y - 0.6 - (dishAt[1] - 1.6))]
          ]
        })
      })),
      {
        name: "the places of three new to Islam, coming along the lane",
        svg: newFrom.map(([x, y]) => someone(x, y, 1.5, NEW_TO_ISLAM)).join(""),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.19, 1]
          ],
          xy: [
            [0.19, 0, 0],
            [0.28, 44, 0]
          ]
        })
      },
      { name: "the places of those who asked him", svg: asked.map(([x, y]) => someone(x, y, 1.5, ASKED)).join("") },
      { name: "their voice: asking him", svg: arcs(n(asked[0][0] + 2.4), n(asked[0][1] - 3.2), ASKED), keys: showFor(0.11, 0.116, 0.6, 0.606), loop: speaking },
      {
        name: "Bismillah: their voices, soft and golden",
        svg: asked.map(([x, y]) => arcsLeft(n(x - 2.4), n(y - 3.2), SOFT_GOLD)).join(""),
        keys: showFor(0.83, 0.836, 0.94, 0.946),
        loop: speaking
      },
      { name: "a soft golden ring about the places of those who asked", svg: care(90.5, 105.8, 8, 2.8, SOFT_GOLD), keys: showAt(0.94, 0.955), loop: soft },
      { name: "his place, a golden ring, at the masjid's door", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: mention it, and eat", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.7, 0.706, 0.96, 0.966), loop: speaking },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: telling of it", svg: arcsLeft(n(aishah[0] - 2.4), n(aishah[1] - 3.2), AISHAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Aishah: the people said to him: here",
      "Are people who have recently embraced",
      "Islam, and they bring meat, and we do",
      "Not know whether they had mentioned",
      "Allah's Name or not. He said: you",
      "Should mention Allah's Name and eat."
    ])
  };
}

export const TIES_ART = {
  "keep-the-sick-apart": keepTheSickApart,
  "safe-next-door": safeNextDoor,
  "hajj-at-seven": hajjAtSeven,
  "be-brothers": beBrothers,
  "keep-ties-when-cut": keepTiesWhenCut,
  "say-bismillah-and-eat": sayBismillahAndEat
};
