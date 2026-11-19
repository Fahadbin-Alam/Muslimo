import { cloud, dateBunch, glow, n, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, measure, ring, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, jug, lightIn, palms, tent, track } from "./daysArt";
import { cloth, date, DUSK, fastRing, greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, EIGHT, FOLK, glints, linesOn, mat, places, plainLand, SEVEN, SIX, twinkle } from "./shareArt";
import { cup, food } from "./hopeArt";
import { farHills } from "./wideArt";
import { GREY } from "./lovedArt";
import { QUICK } from "./dailyArt";
import { stall, jar } from "./tradeArt";
import { kaaba } from "./rewardArt";

/**
 * Warm and welcoming: the cat Abu Qatadah let drink from the water of his wudu, for it is not impure; feeding one who
 * fasts, which earns his reward and takes nothing from it; hosting one who did not host you; the brother who came to
 * him while the other worked, and was provided for because of him; Makkah, the best of the earth, which he would not
 * have left had he not been driven out; and the first fruit, which he gave to the smallest little one he saw. Only the
 * land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn,
 * not even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it,
 * where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or
 * letter is drawn, and nothing comes down from the sky: what is good is a light, glints and a soft golden ring, and
 * what is not to be done a grey dashed ring. No name, word or number is written.
 */

/** Kabshah's place and voice: a soft rose. */
const KABSHAH = "#9A6E8E";
/** Abu Qatadah's place and voice: a slate blue. */
const QATADAH = "#4E6E8E";
/** The cat's coat, its stripes and the light of its chest. */
const COAT = "#E8A04E";
const STRIPE = "#C27A2E";
const CHEST = "#FBE3C2";
/** Water in a vessel. */
const WATER = "#6FA8D6";
/** Zayd ibn Khalid's place and voice: a muted purple. */
const ZAID = "#6A5E8E";
/** The place of the one who gives the food: a plain green. */
const GIVER = "#5E8A52";
/** The place of the one fasting: an ochre. */
const FASTING = "#8A6E3A";
/** The place of the one who asked (Abu al-Ahwas's father), and its voice: a warm brown. */
const ASKER = "#8A5A3A";
/** The place of the one who did not host him: a slate. */
const OTHER = "#5E6E8E";
/** Anas's place and voice: a deep teal. */
const ANAS = "#3E6E7A";
/** The one who comes to him to learn: a sea green. */
const LEARNS = "#4E7A6E";
/** The one who works in the market: a dusty red. */
const WORKS = "#9A6E5E";
/** Abdullah ibn Adi's place and voice: a muted purple. */
const ADI = "#6A5E8E";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** The place of the one who brings the first fruit: a blue green. */
const BRINGS = "#4E7A9A";

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** A lane along the given points, the places going along it a little above its middle. */
const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A cat seen from the side, facing left, its feet on y at x, `s` times its size: its body, legs and tail. */
const catBody = (x: number, y: number, s: number) =>
  `<path d="M${n(x + 4.2 * s)} ${n(y - 4.2 * s)} Q${n(x + 7.6 * s)} ${n(y - 4.6 * s)} ${n(x + 7 * s)} ${n(y - 8.6 * s)}" stroke="${COAT}" stroke-width="${n(1 * s)}" stroke-linecap="round" fill="none"/>` +
  [
    [-3.2, "#D28A3E"],
    [2, "#D28A3E"],
    [-1.9, COAT],
    [3.3, COAT]
  ]
    .map(([dx, fill]) => `<rect x="${n(x + (dx as number) * s - 0.42 * s)}" y="${n(y - 3 * s)}" width="${n(0.85 * s)}" height="${n(3 * s)}" rx="${n(0.4 * s)}" fill="${fill}"/>`)
    .join("") +
  `<ellipse cx="${x}" cy="${n(y - 3.6 * s)}" rx="${n(4.6 * s)}" ry="${n(2.3 * s)}" fill="${COAT}"/>` +
  `<ellipse cx="${n(x - 2.6 * s)}" cy="${n(y - 2.9 * s)}" rx="${n(1.6 * s)}" ry="${n(1.2 * s)}" fill="${CHEST}"/>` +
  [-0.6, 1, 2.6].map((dx) => `<path d="M${n(x + dx * s)} ${n(y - 5.7 * s)} Q${n(x + (dx + 0.5) * s)} ${n(y - 4.6 * s)} ${n(x + (dx + 0.2) * s)} ${n(y - 3.9 * s)}" stroke="${STRIPE}" stroke-width="${n(0.45 * s)}" stroke-linecap="round" fill="none"/>`).join("");

/** The cat's head, facing left, for a cat whose feet are on y at x, `s` times its size. */
const catHead = (x: number, y: number, s: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-6.6, -6.9)} L${p(-6.3, -9)} L${p(-5.2, -7.6)} Z" fill="${COAT}"/><path d="M${p(-4.7, -7.6)} L${p(-3.9, -9)} L${p(-3.6, -6.8)} Z" fill="${COAT}"/>` +
    `<path d="M${p(-6.2, -7.3)} L${p(-6.1, -8.4)} L${p(-5.5, -7.6)} Z" fill="#F7B9B0"/>` +
    `<circle cx="${n(x - 5 * s)}" cy="${n(y - 5.6 * s)}" r="${n(2.1 * s)}" fill="${COAT}"/>` +
    `<ellipse cx="${n(x - 6.4 * s)}" cy="${n(y - 5.1 * s)}" rx="${n(0.9 * s)}" ry="${n(0.7 * s)}" fill="${CHEST}"/>` +
    `<circle cx="${n(x - 5.9 * s)}" cy="${n(y - 6.1 * s)}" r="${n(0.3 * s)}" fill="#3A2A1A"/>` +
    `<ellipse cx="${n(x - 7.1 * s)}" cy="${n(y - 5.4 * s)}" rx="${n(0.32 * s)}" ry="${n(0.24 * s)}" fill="#E07A7A"/>` +
    `<path d="M${p(-4.4, -7.2)} L${p(-4.2, -6.4)} M${p(-3.7, -6.9)} L${p(-3.6, -6.2)}" stroke="${STRIPE}" stroke-width="${n(0.4 * s)}" stroke-linecap="round"/>`
  );
};

/** A wide clay vessel for wudu, its foot's middle at (x, y): 10 across. */
const vessel = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 3.4)} Q${n(x - 4.4)} ${y} ${x} ${y} Q${n(x + 4.4)} ${y} ${n(x + 5)} ${n(y - 3.4)} Z" fill="#B8784A"/>` +
  `<path d="M${n(x + 1)} ${n(y - 3.3)} Q${n(x + 3.6)} ${n(y - 0.4)} ${n(x + 4.9)} ${n(y - 3.3)} Z" fill="#000000" opacity="0.1"/>` +
  `<ellipse cx="${x}" cy="${n(y - 3.4)}" rx="5" ry="1.1" fill="#8E5A30"/>`;

/** The water in that vessel. */
const waterIn = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y - 3.3)}" rx="4.2" ry="0.75" fill="${WATER}"/><path d="M${n(x - 2.4)} ${n(y - 3.5)} L${n(x - 0.6)} ${n(y - 3.5)}" stroke="#D8ECF8" stroke-width="0.35" stroke-linecap="round"/>`;

/** A small dish, its middle at (x, y). */
const smallDish = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${n(y - 0.6)} Q${x} ${n(y + 1.4)} ${n(x + 3)} ${n(y - 0.6)} Z" fill="#9A6A38"/><ellipse cx="${x}" cy="${n(y - 0.6)}" rx="3" ry="0.7" fill="#C98B4E"/>`;

/** Dates on a dish whose middle is at (x, y), as offsets from it. */
const ON_SMALL_DISH: [number, number][] = [
  [-1.4, -1.3],
  [0.1, -1.6],
  [1.5, -1.2]
];

/** Green dates, not yet ripe, under a palm's crown at (x, y). */
const greenBunch = (x: number, y: number) =>
  [
    [0, 0],
    [2.2, 0.8],
    [-2.2, 0.8],
    [1.1, 2.4],
    [-1.1, 2.4]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="1.1" ry="1.5" fill="#8FA84A"/>`)
    .join("") + `<path d="M${x} ${n(y - 2.6)} L${x} ${y}" stroke="#C9A25A" stroke-width="0.7"/>`;

/** A low rise of the land, a little higher than the valley floor, from x1 to x2 with its top at y. */
const rise = (x1: number, x2: number, y: number, fill = "#D8C08E") => `<path d="M${x1} 106 Q${n(x1 + (x2 - x1) * 0.3)} ${y} ${n((x1 + x2) / 2)} ${y} Q${n(x1 + (x2 - x1) * 0.7)} ${y} ${x2} 106 Z" fill="${fill}"/>`;

// The cat at the water. Kabshah bint Ka'b said: Abu Qatadah visited, and I poured water for him to use for wudu. A cat
// came to drink, so he lowered the container until it drank. He saw me looking at it and said: are you surprised, my
// niece? I said yes. He said: the Messenger of Allah ﷺ said: it is not impure; it is only one of those that roam
// around among you (Jami at-Tirmidhi 92). No one is drawn: a home in Madinah on the left, with palms, Kabshah's place
// by it, and a jug of water; a lane coming to it, and a mat where Abu Qatadah sits, with a wide vessel for wudu before
// it. Kabshah's voice tells of it. Abu Qatadah's place comes along the lane and sits. Kabshah's place goes to the
// vessel with the jug; the jug tips and pours, and the water shows in the vessel. A cat comes along the lane; the
// vessel tips toward it, the cat lowers its head and drinks, and the water ripples. Abu Qatadah's voice speaks, with
// soft golden glints: what he heard from him; and a clear light comes on the water: it is not impure. The vessel
// rights itself, and the cat goes on, roaming around among the places, to the home; then a soft golden ring comes
// about the home and its places.
function theCatAtTheWater(): SignArt {
  const kabshah: [number, number] = [40, 100.8];
  const qatadah: [number, number] = [89.4, 94.6];
  const at: [number, number] = [90, 104.6];
  const foot: [number, number] = [101, 105.6];
  const s = 1.3;
  const tip: [number, number] = [n(at[0] + 4.6), n(at[1] - 0.2)];
  const jugAt: [number, number] = [46.4, 101.8];
  const cat: [number, number, number][] = [
    [0.31, 71, 0.6],
    [0.4, 0, 0],
    [0.745, 0, 0],
    [0.8, -26, 2.2],
    [0.89, -26, 2.2],
    [0.93, -60, -2.6]
  ];
  const head: [number, number, number][] = [
    [0.31, 71, 0.6],
    [0.4, 0, 0],
    [0.47, 0, 0],
    [0.48, -1.3, 2.3],
    [0.6, -1.3, 2.3],
    [0.61, 0, 0],
    [0.745, 0, 0],
    [0.8, -26, 2.2],
    [0.89, -26, 2.2],
    [0.93, -60, -2.6]
  ];
  const tipped: [number, number][] = [
    [0.455, 0],
    [0.47, 16],
    [0.745, 16],
    [0.76, 0]
  ];
  return {
    kind: "the-cat-at-the-water",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(130, 20) },
      { name: "a cloud", svg: cloud(54, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "Kabshah's home", svg: home(26, 94, 28, 16) },
      ...palms(
        [
          [58, 91, 8],
          [150, 91, 9]
        ],
        "Madinah"
      ),
      {
        name: "a lane coming to the home",
        svg: lane([
          [158, 100.2],
          [128, 98.8],
          [100, 99.4],
          [70, 100.4],
          [40, 100.6]
        ])
      },
      { name: "a mat where Abu Qatadah sits", svg: mat(qatadah[0], n(qatadah[1] + 1.4), 10) },
      { name: "Kabshah's place, by her home", svg: someone(kabshah[0], kabshah[1], 1.5, KABSHAH), keys: track({ xy: [[0.17, 0, 0], [0.2, 33.4, 0.8], [0.31, 33.4, 0.8], [0.34, 14, 0.4]] }) },
      { name: "Kabshah's voice: telling of it", svg: arcs(n(kabshah[0] + 3.2), n(kabshah[1] - 2.8), KABSHAH), keys: showFor(0.024, 0.03, 0.108, 0.114), loop: speaking },
      {
        name: "Abu Qatadah's place, coming along the lane to visit",
        svg: someone(qatadah[0], qatadah[1], 1.5, QATADAH),
        keys: track({
          xy: [
            [0.04, 38.6, 3],
            [0.07, 14.6, 3.6],
            [0.1, 0, 0]
          ]
        })
      },
      { name: "a wide vessel for wudu, before it", svg: vessel(at[0], at[1]), origin: { x: tip[0], y: tip[1] }, keys: track({ rotate: tipped }) },
      { name: "the water for wudu, poured into it", svg: waterIn(at[0], at[1]), origin: { x: tip[0], y: tip[1] }, keys: track({ opacity: [[0.22, 0], [0.24, 1]], rotate: tipped }) },
      {
        name: "a jug of water, going with her and pouring",
        svg: jug(jugAt[0], jugAt[1]),
        origin: { x: n(jugAt[0] + 2.2), y: jugAt[1] },
        keys: track({
          xy: [
            [0.17, 0, 0],
            [0.2, 33.4, 0.8],
            [0.31, 33.4, 0.8],
            [0.34, 14, 0.4]
          ],
          rotate: [
            [0.204, 0],
            [0.212, 40],
            [0.25, 40],
            [0.258, 0]
          ]
        })
      },
      {
        name: "the water pouring from the jug",
        svg: `<path d="M87.2 100.1 Q88.4 100.4 88.7 101.8" stroke="${WATER}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`,
        keys: track({
          opacity: [
            [0.214, 0],
            [0.218, 1],
            [0.244, 1],
            [0.248, 0]
          ]
        })
      },
      { name: "a cat, coming along the lane, and roaming", svg: catBody(foot[0], foot[1], s), keys: track({ xy: cat }), loop: { move: "bob", ms: 520, y: 0.25 } },
      { name: "its head, lowered to drink", svg: catHead(foot[0], foot[1], s), keys: track({ xy: head }), loop: { move: "bob", ms: 520, y: 0.25 } },
      {
        name: "the water rippling as it drinks",
        svg: `<path d="M89.6 101.7 Q91 101.1 92.4 101.7 M88.6 102.3 Q91 101.5 93.4 102.3" stroke="#D8ECF8" stroke-width="0.35" fill="none" stroke-linecap="round"/>`,
        keys: showFor(0.48, 0.49, 0.54, 0.55),
        loop: { move: "twinkle", ms: 600, low: 0.3 }
      },
      { name: "Abu Qatadah's voice: telling what he heard", svg: arcsLeft(n(qatadah[0] - 3.2), n(qatadah[1] - 2.8), QATADAH), keys: showAt(0.6, 0.606), loop: speaking },
      {
        name: "what he heard from him: soft golden glints by Abu Qatadah's voice",
        svg: glints([
          [n(qatadah[0] - 6.4), n(qatadah[1] - 6.4)],
          [n(qatadah[0] - 9.2), n(qatadah[1] - 4.4)]
        ]),
        keys: showAt(0.62, 0.63),
        loop: twinkle(1500)
      },
      { name: "not impure: a clear light on the water in the vessel", svg: glow(at[0], n(at[1] - 3.4), 4.6, "#DDF3FF", 0.4) + sparkle(at[0], n(at[1] - 3.8), 0.9, "#FFFFFF"), keys: showAt(0.65, 0.67), loop: soft },
      { name: "among you: a soft golden ring about the home and its places", svg: care(64, 100.2, 50, 9.8, SOFT_GOLD), keys: showAt(0.935, 0.95), loop: soft }
    ],
    words: linesOn(SEVEN, [
      "Kabshah: Abu Qatadah visited, so I",
      "Poured water for him to use for wudu.",
      "A cat came to drink, so Abu Qatadah",
      "Lowered the container until it drank.",
      "Abu Qatadah: he said: it is not impure,",
      "It is only one of those that roam",
      "Around among you."
    ])
  };
}

// Feeding one who fasts. Zayd ibn Khalid al-Juhani said that the Messenger of Allah ﷺ said: whoever provides the food
// for a fasting person to break his fast with, then for him is the same reward as his, without anything being
// diminished from the reward of the fasting person (Jami at-Tirmidhi 807). No one is drawn: Madinah at sunset, the home
// of the one who gives on the left, its place by it with a dish of dates and a cup of water; the place of the one
// fasting on a mat by its home on the right, a fasting ring about it, and a cloth spread before it, waiting. Zayd's
// voice tells of it. The sun sets behind the hills. The one who gives goes along the lane with the dates and the water,
// and sets them on the cloth. The dates go one by one and the water is drunk: the fast is broken, and a soft golden ring
// comes about the one fasting: its reward. The same soft golden ring comes about the one who gave, with glints over
// both. A soft light stays in the ring of the one fasting: nothing is taken from its reward. The first stars come, and
// a warm light over the two places.
function feedAFastingPerson(): SignArt {
  const zaid: [number, number] = [14, 104];
  const giver: [number, number] = [40, 100.8];
  const fasting: [number, number] = [126, 100.2];
  const sat: [number, number] = [104, 100.4];
  const dish: [number, number] = [46, 102.8];
  const cupAt: [number, number] = [49.6, 103.4];
  const go: [number, number] = [66.4, 0.6];
  const going = (dx: number, dy: number) =>
    track({
      xy: [
        [0.18, 0, 0],
        [0.25, dx, dy]
      ]
    });
  return {
    kind: "feed-a-fasting-person",
    ms: 9000,
    parts: [
      { name: "the sky at sunset", svg: DUSK },
      {
        name: "the sun, setting behind the hills",
        svg: sun(124, 50),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.125, 0, 6],
            [0.18, 0, 6],
            [0.27, 0, 13]
          ],
          opacity: [
            [0.25, 1],
            [0.28, 0]
          ]
        })
      },
      { name: "a cloud", svg: cloud(52, 30, 0.4, "#F6D8C8", 0.8), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#DCC394", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the home of the one who gives", svg: home(28, 94, 22, 14) },
      { name: "the home of the one fasting", svg: home(130, 93, 24, 15) },
      ...palms(
        [
          [62, 91, 8],
          [94, 90, 9]
        ],
        "Madinah"
      ),
      {
        name: "a lane between the homes",
        svg: lane([
          [36, 100.8],
          [70, 99.6],
          [94, 99.8],
          [106, 100.4]
        ])
      },
      { name: "Zayd's place", svg: someone(zaid[0], zaid[1], 1.5, ZAID) },
      { name: "Zayd's voice: telling of it", svg: arcs(n(zaid[0] + 3.2), n(zaid[1] - 2.8), ZAID), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "a mat by the home of the one fasting", svg: mat(fasting[0], n(fasting[1] + 1.4), 10) },
      { name: "a cloth spread before it, waiting", svg: cloth(110, 120, 102.6) },
      { name: "the place of the one fasting, waiting for sunset", svg: someone(fasting[0], fasting[1], 1.5, FASTING) },
      { name: "fasting: a soft ring about it", svg: fastRing(fasting[0], n(fasting[1] + 0.6), 3.6, 1.9), keys: track({
          opacity: [
            [0.42, 1],
            [0.43, 0]
          ]
        }) },
      { name: "the place of the one who gives, by its home", svg: someone(giver[0], giver[1], 1.5, GIVER), keys: going(n(sat[0] - giver[0]), n(sat[1] - giver[1])) },
      { name: "a dish, going with it", svg: smallDish(dish[0], dish[1]), keys: going(go[0], go[1]) },
      ...ON_SMALL_DISH.map(
        ([dx, dy], i): SignPart => ({
          name: `a date on the dish ${i + 1}, eaten when the fast is broken`,
          svg: date(n(dish[0] + dx), n(dish[1] + dy)),
          keys: track({
            xy: [
              [0.18, 0, 0],
              [0.25, go[0], go[1]]
            ],
            opacity: [
              [0.35 + i * 0.02, 1],
              [0.36 + i * 0.02, 0]
            ]
          })
        })
      ),
      { name: "a cup, going with it", svg: cup(cupAt[0], cupAt[1]), keys: going(go[0], go[1]) },
      {
        name: "the water in the cup, drunk when the fast is broken",
        svg: `<ellipse cx="${cupAt[0]}" cy="${n(cupAt[1] - 2.6)}" rx="1.3" ry="0.4" fill="#4F86B8"/>`,
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.25, go[0], go[1]]
          ],
          opacity: [
            [0.4, 1],
            [0.41, 0]
          ]
        })
      },
      { name: "its fast's reward: a soft golden ring about the one fasting", svg: care(fasting[0], n(fasting[1] + 1), 5, 2.2, SOFT_GOLD), keys: showAt(0.42, 0.435), loop: soft },
      { name: "the same reward: a soft golden ring about the one who gave", svg: care(sat[0], n(sat[1] + 1), 5, 2.2, SOFT_GOLD), keys: showAt(0.5, 0.515), loop: soft },
      {
        name: "glints over both places",
        svg: glints([
          [n(sat[0] - 1), n(sat[1] - 6)],
          [n(fasting[0] + 1), n(fasting[1] - 6)],
          [115, 92.4]
        ]),
        keys: showAt(0.54, 0.555),
        loop: twinkle()
      },
      { name: "nothing taken from it: a soft light stays in the ring of the one fasting", svg: lightIn(fasting[0], n(fasting[1] - 0.2), 3.4), keys: showAt(0.67, 0.685), loop: soft },
      {
        name: "the first stars of the evening",
        svg: stars([
          [22, 18],
          [48, 12],
          [78, 20],
          [104, 14],
          [136, 22],
          [150, 12]
        ]),
        keys: showAt(0.83, 0.86),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      { name: "a warm light over the two places", svg: wash(115, 101, 18, 6, WARM, 0.12), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: linesOn(SIX, [
      "Zayd ibn Khalid: he said: whoever",
      "Provides the food for a fasting person",
      "To break his fast with, then for him is",
      "The same reward as his, without anything",
      "Being diminished from the reward of the",
      "Fasting person."
    ])
  };
}

// Host him anyway. The father of Abu al-Ahwas said: I said: O Messenger of Allah ﷺ, I stayed with a man who did not
// entertain me nor behave hospitably with me. Then he came to stay with me; shall I reciprocate the same to him? He
// said: no, entertain him (Jami at-Tirmidhi 2006). His words after it, on wealth being seen, are left out. No one is
// drawn: the desert, the tent of the man on the left and the tent of the one who asked (Abu al-Ahwas's father) on the
// right; Madinah between them, the masjid and his place, a golden ring. The asker's voice tells of it. The asker's
// place goes along the road to the other's tent; no mat is spread and no food comes, and a grey dashed ring comes about
// the other's place: not hosting. It goes back home. Then the other's place comes along the road to the asker's tent.
// The asker's voice asks, and a faint grey ring comes about the other's place: doing the same. His voice, soft and
// golden, answers; the faint ring goes, a mat is spread for the other's place, food is set before it, a warm light
// comes over the tent, and a soft golden ring about both places. No part is named for a father: the test forbids it.
function hostHimAnyway(): SignArt {
  const asker: [number, number] = [118, 101];
  const other: [number, number] = [36, 101.4];
  const there: [number, number] = [46, 101.6];
  const came: [number, number] = [106, 101.2];
  const his: [number, number] = [80, 96.4];
  return {
    kind: "host-him-anyway",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(34, 20) },
      { name: "a cloud", svg: cloud(112, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the masjid of Madinah, between them", svg: big(madinahMasjid(56, 93, 1), 80, 93, 0.5) },
      ...palms(
        [
          [62, 91, 6],
          [99, 91.4, 6.4]
        ],
        "Madinah"
      ),
      { name: "the tent of the one who did not host him", svg: tent(26, 98, 22, 12, "#E6D7B4") },
      { name: "the tent of the one who asked", svg: tent(130, 97, 24, 13) },
      { name: "a road between the tents", svg: way("M40 103.6 Q62 100 80 101.4 T120 103.4", "#C9A66E", 0.9) },
      { name: "his place, a golden ring, in Madinah", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of the one who did not host him, by its tent", svg: someone(other[0], other[1], 1.5, OTHER), keys: track({ xy: along([other, [70, 100.8], came], [0.5, 0.54, 0.58]) }) },
      {
        name: "the place of the one who asked, by its tent",
        svg: someone(asker[0], asker[1], 1.5, ASKER),
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.26, n(there[0] - asker[0]), n(there[1] - asker[1])],
            [0.34, n(there[0] - asker[0]), n(there[1] - asker[1])],
            [0.41, 0, 0]
          ]
        })
      },
      { name: "the voice of the one who asked: telling of it", svg: arcs(n(asker[0] + 3.2), n(asker[1] - 2.8), ASKER), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "not hosting: a grey dashed ring about the other's place", svg: greyRing(other[0], n(other[1] + 0.6), 4.4, 2.2), keys: showFor(0.27, 0.28, 0.41, 0.42) },
      { name: "the voice of the one who asked: asking him", svg: arcsLeft(n(asker[0] - 2.4), n(asker[1] - 6), ASKER), keys: showFor(0.66, 0.666, 0.82, 0.826), loop: speaking },
      { name: "doing the same: a faint grey ring about the other's place, at the tent", svg: `<g opacity="0.7">${greyRing(came[0], n(came[1] + 0.6), 4.4, 2.2)}</g>`, keys: showFor(0.68, 0.69, 0.82, 0.83) },
      { name: "his voice, soft and golden: no, host him", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showAt(0.74, 0.746), loop: speaking },
      { name: "a mat spread for it", svg: mat(came[0], n(came[1] + 1.4), 9), keys: showAt(0.83, 0.835) },
      { name: "food set before it", svg: food(n(came[0] + 5.2), n(came[1] + 2.6)), keys: showAt(0.85, 0.86) },
      { name: "a warm light over the tent", svg: wash(124, 100, 16, 7, WARM, 0.12), keys: showAt(0.88, 0.9), loop: soft },
      { name: "a soft golden ring about both places", svg: care(112, 102, 11, 4, SOFT_GOLD), keys: showAt(0.91, 0.925), loop: soft }
    ],
    words: linesOn(SIX, [
      "Abu al-Ahwas's father: I said: I stayed",
      "With a man who did not entertain me nor",
      "Behave hospitably with me. Then the man",
      "Came to stay with me, shall I",
      "Reciprocate the same to him? He said:",
      "No, entertain him."
    ])
  };
}

// Two brothers. Anas ibn Malik said: there were two brothers during the time of the Messenger of Allah ﷺ. One of them
// used to come to the Prophet ﷺ, and the other had some business. The businessman among them complained to the
// Prophet ﷺ about his brother, so he said: perhaps you are provided for because of him (Jami at-Tirmidhi 2345). No one
// is drawn: Madinah, a stall in the market on the left, their home in the middle, and the masjid on the right with his
// place, a golden ring, Anas's place and the places of those who come to learn. Anas's voice tells of it. The place of
// the one goes along the lane to the masjid and sits with them, and a small light comes in it. The place of the other
// goes to the stall, and its wares show. Then it goes to the masjid, its voice quick and grey: complaining. His voice,
// soft and golden, answers. Glints go from the place of the one who learns to the stall, more wares show there, and a
// soft golden ring comes about each of the two.
function twoBrothers(): SignArt {
  const learns: [number, number] = [52, 101.4];
  const works: [number, number] = [58, 101.6];
  const sits: [number, number] = [127, 106.2];
  const atStall: [number, number] = [20, 100];
  const complains: [number, number] = [112, 99.6];
  const his: [number, number] = [126, 100.4];
  const anas: [number, number] = [140, 102.6];
  return {
    kind: "two-brothers",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(36, 20) },
      { name: "a cloud", svg: cloud(110, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the masjid", svg: madinahMasjid(104, 93, 1) },
      ...palms(
        [
          [72, 90, 8],
          [94, 89.4, 9]
        ],
        "Madinah"
      ),
      { name: "a stall in the market", svg: big(stall(20, 22, "#B0573E", 66, 84), 20, 96, 0.5) },
      { name: "its wares on the stall", svg: jar(15.6, 90.2, 0.42) + jar(19.6, 90.2, 0.42, "#C98B4E") + jar(23.6, 90.2, 0.42), keys: showAt(0.41, 0.42) },
      { name: "their home", svg: home(54, 94, 20, 13) },
      {
        name: "a lane from the market to the masjid",
        svg: lane([
          [24, 99.4],
          [40, 100.6],
          [56, 101],
          [84, 99.6],
          [104, 100],
          [118, 101.6]
        ])
      },
      { name: "his place, a golden ring, at the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the places of those who come to learn from him",
        svg: places(
          [
            [112, 104],
            [118, 105.4],
            [134, 105.6]
          ],
          1.4
        )
      },
      { name: "Anas's place, by him", svg: someone(anas[0], anas[1], 1.5, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 3.2), n(anas[1] - 2.8), ANAS), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "the place of the one who comes to him, going to the masjid", svg: someone(learns[0], learns[1], 1.5, LEARNS), keys: track({ xy: along([learns, [84, 99.6], [110, 101.6], sits], [0.18, 0.21, 0.23, 0.25]) }) },
      { name: "learning: a small light in its place", svg: lightIn(sits[0], n(sits[1] - 0.6), 3), keys: showAt(0.27, 0.28), loop: soft },
      {
        name: "the place of the one who works, going to the stall and then to the masjid",
        svg: someone(works[0], works[1], 1.5, WORKS),
        keys: track({
          xy: [
            [0.34, 0, 0],
            [0.4, n(atStall[0] - works[0]), n(atStall[1] - works[1])],
            [0.5, n(atStall[0] - works[0]), n(atStall[1] - works[1])],
            [0.54, n(56 - works[0]), n(101 - works[1])],
            [0.58, n(complains[0] - works[0]), n(complains[1] - works[1])]
          ]
        })
      },
      { name: "its voice, quick and grey: complaining", svg: arcs(n(complains[0] + 3), n(complains[1] - 2.8), GREY), keys: showFor(0.585, 0.59, 0.66, 0.666), loop: QUICK },
      { name: "his voice, soft and golden: answering", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showAt(0.7, 0.706), loop: speaking },
      {
        name: "because of it: glints going from its place to the stall",
        svg: glints([
          [n(sits[0] - 1), n(sits[1] - 5)],
          [n(sits[0] + 1.6), n(sits[1] - 7)]
        ]),
        keys: track({
          opacity: [
            [0.82, 0],
            [0.83, 1],
            [0.875, 1],
            [0.885, 0]
          ],
          xy: along(
            [
              [n(sits[0] - 1), n(sits[1] - 5)],
              [96, 94],
              [60, 90],
              [24, 86.4]
            ],
            [0.83, 0.845, 0.86, 0.875]
          )
        }),
        loop: twinkle()
      },
      { name: "provided for: more wares on the stall", svg: jar(17.6, 86.6, 0.36, "#C98B4E") + jar(21.6, 86.6, 0.36) + glints([[14, 85], [26, 84.6]]), keys: showAt(0.875, 0.89), loop: twinkle(1500) },
      { name: "a soft golden ring about each of the two", svg: care(complains[0], n(complains[1] + 0.3), 4, 2, SOFT_GOLD) + care(sits[0], n(sits[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.91, 0.925), loop: soft }
    ],
    words: linesOn(SIX, [
      "Anas: there were two brothers. One of",
      "Them used to come to him, and the other",
      "Had some business. The businessman",
      "Among them complained to him about his",
      "Brother, so he said: perhaps you are",
      "Provided for because of him."
    ])
  };
}

// The best of the earth. Abdullah ibn Adi ibn al-Hamra said: I saw the Messenger of Allah ﷺ standing at al-Hazwarah, and
// he said: by Allah! You are the best of Allah's earth, and the most beloved of Allah's earth to Allah, and if it were
// not that I was expelled from you I would not have left (Jami at-Tirmidhi 3925). No one is drawn: the valley of
// Makkah between its hills, the Ka'bah and the homes about it, the faint places of Quraysh by them; al-Hazwarah, a rise
// with stalls on the left, where his place stands, a golden ring, and Abdullah's place by it; a road going out of the
// valley between the hills on the right. Abdullah's voice tells of it, and a soft light comes about his place. His
// voice, soft and golden, speaks. Glints come over the valley: the best of the earth; and a soft golden light about the
// Ka'bah, with glints about it: the most beloved. The voices of Quraysh, quick and grey: driven out; a faint dashed way
// shows along the road out. Then his place goes along the road out of the valley, the light still over Makkah.
function bestOfTheEarth(): SignArt {
  const his: [number, number] = [30, 98.6];
  const adi: [number, number] = [44, 102.4];
  const out: [number, number][] = [his, [56, 103.6], [92, 105], [118, 99.2], [138, 89.6]];
  return {
    kind: "best-of-the-earth",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "a cloud", svg: cloud(36, 30, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [10, 22, 18],
            [36, 15, 14],
            [126, 16, 14],
            [152, 24, 18]
          ],
          86,
          "#A88A64",
          false
        )
      },
      { name: "most beloved: a soft golden light about the Ka'bah", svg: glow(80, 88, 13, WARM, 0.3), keys: showAt(0.5, 0.52), loop: soft },
      { name: "the homes of Makkah", svg: home(60, 92, 10, 6.4) + home(100, 92, 10, 6.4) + home(70, 89.4, 8, 5) + home(91, 89.4, 8, 5) },
      { name: "the Ka'bah", svg: kaaba(80, 93, 0.9) },
      {
        name: "the faint places of Quraysh, by the homes",
        svg: `<g opacity="0.7">${places(
          [
            [64, 96.4],
            [97, 96.4],
            [106, 98]
          ],
          0.9
        )}</g>`
      },
      { name: "al-Hazwarah, a rise in Makkah", svg: rise(6, 58, 95) },
      { name: "the stalls of al-Hazwarah", svg: big(stall(20, 16, "#B0573E", 66, 84), 20, 97, 0.4) + big(stall(46, 16, "#3E7FB0", 66, 84), 46, 98, 0.4) },
      { name: "a road going out of the valley, between the hills", svg: way("M58 106 Q92 108 116 100 T140 88", "#C9A66E", 0.9) },
      { name: "his place, a golden ring, standing at al-Hazwarah", svg: ring(his[0], his[1], 2.6, GOLD), keys: track({ xy: along(out, [0.82, 0.85, 0.88, 0.91, 0.94]) }) },
      { name: "a soft light about his place", svg: wash(his[0], n(his[1] + 0.4), 7, 3.4, WARM, 0.16), keys: showFor(0.08, 0.09, 0.82, 0.83) },
      { name: "Abdullah's place, by him", svg: someone(adi[0], adi[1], 1.5, ADI) },
      { name: "Abdullah's voice: telling of it", svg: arcs(n(adi[0] + 3.2), n(adi[1] - 2.8), ADI), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.22, 0.226, 0.82, 0.826), loop: speaking },
      {
        name: "the best of the earth: glints over the valley of Makkah",
        svg: glints([
          [58, 84.6],
          [70, 80],
          [92, 80.4],
          [104, 85],
          [80, 98.6]
        ]),
        keys: showAt(0.35, 0.37),
        loop: twinkle()
      },
      {
        name: "glints about the Ka'bah",
        svg: glints([
          [72, 84.4],
          [88, 84],
          [80, 81]
        ]),
        keys: showAt(0.55, 0.56),
        loop: twinkle(1500)
      },
      { name: "driven out: the voices of Quraysh, quick and grey", svg: arcs(67.4, 93.8, GREY) + arcs(109.2, 95.4, GREY), keys: showFor(0.66, 0.666, 0.82, 0.826), loop: QUICK },
      { name: "where he was made to go: a faint dashed way along the road out", svg: `<g opacity="0.6">${way("M60 104.6 Q92 106.6 115 98.6 T138 87", GREY, 0.7)}</g>`, keys: showFor(0.7, 0.72, 0.82, 0.83) }
    ],
    words: linesOn(SIX, [
      "Abdullah ibn Adi: I saw him standing at",
      "Al-Hazwarah, and he said: by Allah! You",
      "Are the best of Allah's earth, and the",
      "Most beloved of Allah's earth to Allah,",
      "And if it were not that I was expelled",
      "From you I would not have left."
    ])
  };
}

// The first fruit. Abu Hurairah said: when the people would see the first fruit, they would bring it to the Messenger
// of Allah ﷺ. When he would take it, he would say: O Allah, bless for us our fruits, and bless for us our city, and
// bless for us our sa' and our mudd. Then he would call the smallest young child he saw and give him that fruit (Jami
// at-Tirmidhi 3454). The rest of his dua is left out. No one is drawn: a palm grove of Madinah on the left, its dates
// still green, the places of those in it; the homes of Madinah, with a sa' and a mudd by them; the masjid on the right,
// his place, a golden ring, Abu Hurairah's place, and the places of the little ones by it, one smaller than the rest.
// Abu Hurairah's voice tells of it. One bunch ripens: the first fruit, and a soft light comes on it. It is picked onto a
// dish, and one of the places goes with it along the lane to him, and it is set by his place. His voice, soft and
// golden, speaks: glints come over the palms, then over the homes, then over the sa' and the mudd. His voice calls; a
// soft light comes about the smallest place, and it comes to him; the dish goes to it, with glints, and a soft golden
// ring comes about it.
function theFirstFruit(): SignArt {
  const bringer: [number, number] = [38, 102.4];
  const brought: [number, number] = [112, 101.6];
  const his: [number, number] = [124, 99.6];
  const hurairah: [number, number] = [142, 102.6];
  const dishAt: [number, number] = [42.4, 102.2];
  const byHim: [number, number] = [129.6, 102.4];
  const smallest: [number, number] = [108.6, 106.2];
  const came: [number, number] = [119, 104.4];
  const toIt: [number, number] = [n(came[0] + 3.6), n(came[1] + 0.8)];
  const dishMoves: [number, number, number][] = [
    [0.155, 0, 0],
    [0.215, n(brought[0] + 3.4 - dishAt[0]), n(brought[1] - 0.2 - dishAt[1])],
    [0.27, n(brought[0] + 3.4 - dishAt[0]), n(brought[1] - 0.2 - dishAt[1])],
    [0.29, n(byHim[0] - dishAt[0]), n(byHim[1] - dishAt[1])],
    [0.876, n(byHim[0] - dishAt[0]), n(byHim[1] - dishAt[1])],
    [0.9, n(toIt[0] - dishAt[0]), n(toIt[1] - dishAt[1])]
  ];
  return {
    kind: "the-first-fruit",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(86, 18) },
      { name: "a cloud", svg: cloud(132, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the masjid", svg: madinahMasjid(104, 92, 1) },
      ...palms(
        [
          [12, 97, 18],
          [30, 95, 20],
          [48, 97, 17]
        ],
        "the grove"
      ),
      { name: "dates still green, under the palms", svg: greenBunch(14.2, 81.4) + greenBunch(50, 82.4) },
      {
        name: "the first fruit: a bunch ripening under a palm",
        svg: dateBunch(32.4, 77.6),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.07, 1],
            [0.145, 1],
            [0.15, 0]
          ]
        })
      },
      { name: "seen: a soft light on it", svg: glow(32.4, 79.6, 6, WARM, 0.25), keys: showFor(0.07, 0.08, 0.145, 0.15), loop: soft },
      { name: "the homes of Madinah", svg: home(68, 94, 14, 9) + home(86, 93, 12, 8) },
      { name: "a sa', the wooden measure, by the homes", svg: measure(64, 102.6) },
      { name: "and a mudd, the small measure", svg: big(measure(73.4, 102.6), 73.4, 102.6, 0.6) },
      {
        name: "a lane from the grove to the masjid",
        svg: lane([
          [36, 101.6],
          [64, 99.2],
          [90, 99],
          [114, 100.8]
        ])
      },
      { name: "his place, a golden ring, at the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.09, 0.096), loop: speaking },
      { name: "the places of those in the grove", svg: places([[22, 101.8]], 1.5) },
      { name: "the place that brings it, going to him", svg: someone(bringer[0], bringer[1], 1.5, BRINGS), keys: track({ xy: along([bringer, [64, 99.2], [90, 99], brought], [0.155, 0.175, 0.195, 0.215]) }) },
      {
        name: "the places of the little ones, by the masjid",
        svg: places(
          [
            [96, 105.6],
            [102, 106.4]
          ],
          1.25
        )
      },
      { name: "the place of the smallest little one", svg: someone(smallest[0], smallest[1], 0.85, FOLK), keys: track({ xy: along([smallest, came], [0.77, 0.81]) }) },
      { name: "the first fruit, on a dish", svg: smallDish(dishAt[0], dishAt[1]), keys: track({ opacity: [[0.145, 0], [0.15, 1]], xy: dishMoves }) },
      ...ON_SMALL_DISH.map(
        ([dx, dy], i): SignPart => ({
          name: `a ripe date on the dish ${i + 1}`,
          svg: date(n(dishAt[0] + dx), n(dishAt[1] + dy)),
          keys: track({ opacity: [[0.145, 0], [0.15, 1]], xy: dishMoves })
        })
      ),
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.32, 0.326, 0.66, 0.666), loop: speaking },
      {
        name: "bless our fruits: glints over the palms",
        svg: glints([
          [12, 76],
          [30, 72.4],
          [48, 77.2],
          [21, 84]
        ]),
        keys: showAt(0.39, 0.41),
        loop: twinkle()
      },
      {
        name: "and our city: glints over the homes",
        svg: glints([
          [66, 81.6],
          [86, 81.2],
          [76, 86.6]
        ]),
        keys: showAt(0.51, 0.53),
        loop: twinkle()
      },
      {
        name: "and our sa' and our mudd: glints over the measures",
        svg: glints([
          [63, 93.2],
          [74.2, 96.2]
        ]),
        keys: showAt(0.632, 0.65),
        loop: twinkle(1500)
      },
      { name: "his voice, calling the smallest", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 5.4), SOFT_GOLD), keys: showAt(0.68, 0.686), loop: speaking },
      { name: "a soft light about the smallest place", svg: wash(smallest[0], smallest[1], 4.4, 2.4, WARM, 0.2), keys: track({ opacity: [[0.755, 0], [0.765, 1]], xy: along([smallest, came], [0.77, 0.81]) }), loop: soft },
      {
        name: "given to it: glints over the dish",
        svg: glints([
          [n(toIt[0] - 2), n(toIt[1] - 4)],
          [n(toIt[0] + 2), n(toIt[1] - 5)]
        ]),
        keys: showAt(0.91, 0.92),
        loop: twinkle()
      },
      { name: "a soft golden ring about the smallest place", svg: care(n(came[0] + 1.6), n(came[1] + 0.8), 5, 2.2, SOFT_GOLD), keys: showAt(0.93, 0.945), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: when the people would see",
      "The first fruit, they would bring it to",
      "Him. When he would take it, he would say:",
      "O Allah, bless for us our fruits, and",
      "Bless for us our city, and bless for us",
      "Our sa' and our mudd. Then he would call",
      "The smallest young child he saw and",
      "Give him that fruit."
    ])
  };
}

export const WARM_ART = {
  "the-cat-at-the-water": theCatAtTheWater,
  "feed-a-fasting-person": feedAFastingPerson,
  "host-him-anyway": hostHimAnyway,
  "two-brothers": twoBrothers,
  "best-of-the-earth": bestOfTheEarth,
  "the-first-fruit": theFirstFruit
} as const;
