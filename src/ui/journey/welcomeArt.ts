import { animalAt, cloud, glow, n, peaks, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, palms, track } from "./daysArt";
import { cloth, fastRing, soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, mat, places, plainLand, twinkle } from "./shareArt";
import { cup, food } from "./hopeArt";
import { farHills, FIVE } from "./wideArt";
import { NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";
import { kaaba } from "./rewardArt";
import { waterskin } from "./truthArt";
import { dish } from "./worthArt";

/**
 * Welcome and good will: the one who came from far to Muzdalifah, worn out, and was told that he had completed his
 * Hajj; the Zamzam water Aishah carried home, as he would carry it; masjids built among the homes, kept clean and
 * scented; the zakat collector, who should leave only while pleased; answering an invitation, and making du'a when
 * fasting; and the best of those who travel together and of those who live side by side. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn,
 * and nothing comes down from the sky: what is good is a light, glints and a soft golden ring. No name, word or
 * number is written.
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
  [0.266, 0.5],
  [0.516, 0.75],
  [0.766, 1]
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

/** Urwah ibn Mudarris's place and voice: a soft purple. */
const MUDARRIS = "#8A6EB0";
/** The places of the pilgrims at Muzdalifah. */
const PILGRIM = "#D8B878";
/** Urwah's place and voice, who tells of Aishah: a deep teal. */
const URWAH = "#3E6E7A";
/** Aishah's place and voice: a soft rose. */
const AISHAH = "#9A6E8E";
/** Jarir's place and voice: a slate blue. */
const JARIR = "#4E6E8E";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** Abdullah ibn Amr's place and voice: a deep teal. */
const AMR = "#3E6E7A";
/** A place that welcomes, gives or is good to another: a blue green. */
const GIVES = "#4E7A9A";
/** A place that comes, is invited or is given to: a dusty red. */
const COMES = "#9A6E5E";
/** One who keeps a fast: a warm brown. */
const FASTING = "#8A6E3A";
/** The water of Zamzam. */
const WATER = "#4F86B8";

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** A lane along the given points, the places going along it a little above its middle. */
const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A goat of the picture cards, `s` times its size, with its feet at (x, y). */
const goat = (x: number, y: number, s: number, left = false) => animalAt("goat", n(x - 50 * s), n(y - 73 * s), s, left);

/** Small pebbles on the ground, at the given points. */
const pebbles = (list: [number, number][]) => list.map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="${i % 2 ? 0.7 : 0.5}" ry="0.4" fill="#9C9284"/>`).join("");

/** Low sand hills, their feet on y 106, from x1 to x2 and rising to y. */
const sandHill = (x1: number, x2: number, y: number, fill = "#E8D3A4") => `<path d="M${x1} 106 Q${n(x1 + (x2 - x1) * 0.3)} ${y} ${n((x1 + x2) / 2)} ${y} Q${n(x1 + (x2 - x1) * 0.7)} ${y} ${x2} 106 Z" fill="${fill}"/>`;

/** Mount Arafat, a low hill of rounded rocks, from x1 to x2 with its feet on y, `h` high. */
const arafat = (x1: number, x2: number, y: number, h: number) => {
  const mid = n((x1 + x2) / 2);
  return (
    `<path d="M${x1} ${y} Q${n(x1 + (x2 - x1) * 0.18)} ${n(y - h * 0.7)} ${n(mid - (x2 - x1) * 0.12)} ${n(y - h)} Q${mid} ${n(y - h * 1.08)} ${n(mid + (x2 - x1) * 0.12)} ${n(y - h)} Q${n(x2 - (x2 - x1) * 0.18)} ${n(y - h * 0.7)} ${x2} ${y} Z" fill="#9E8466"/>` +
    [
      [0.3, 0.46, 2.4],
      [0.5, 0.78, 2],
      [0.66, 0.5, 2.2],
      [0.42, 0.24, 1.6]
    ]
      .map(([k, up, r]) => `<ellipse cx="${n(x1 + (x2 - x1) * k)}" cy="${n(y - h * up)}" rx="${r}" ry="${n(r * 0.7)}" fill="#8A7056"/>`)
      .join("")
  );
};

/** The well of Zamzam: a round wall of stone, two posts and a crossbar, a rope and a bucket; its foot's middle at (x, y). */
const zamzamWell = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${n(y - 11)} L${n(x - 6)} ${n(y - 3.6)} M${n(x + 6)} ${n(y - 11)} L${n(x + 6)} ${n(y - 3.6)}" stroke="#7A5A38" stroke-width="0.9"/>` +
  `<path d="M${n(x - 7)} ${n(y - 11)} L${n(x + 7)} ${n(y - 11)}" stroke="#5E4024" stroke-width="1.1" stroke-linecap="round"/>` +
  `<path d="M${x} ${n(y - 11)} L${x} ${n(y - 7)}" stroke="#8A6A42" stroke-width="0.45"/><path d="M${n(x - 1.2)} ${n(y - 7)} L${n(x + 1.2)} ${n(y - 7)} L${n(x + 0.9)} ${n(y - 5.2)} L${n(x - 0.9)} ${n(y - 5.2)} Z" fill="#8E6440"/>` +
  `<ellipse cx="${x}" cy="${n(y - 3.8)}" rx="6.4" ry="1.5" fill="#3E5A6E"/><ellipse cx="${x}" cy="${n(y - 3.7)}" rx="5" ry="1" fill="${WATER}"/>` +
  `<path d="M${n(x - 6.4)} ${n(y - 3.8)} L${n(x - 6.4)} ${y} L${n(x + 6.4)} ${y} L${n(x + 6.4)} ${n(y - 3.8)} A6.4 1.5 0 0 1 ${n(x - 6.4)} ${n(y - 3.8)} Z" fill="#B49C78"/>` +
  `<path d="M${n(x - 6.4)} ${n(y - 1.8)} L${n(x + 6.4)} ${n(y - 1.8)}" stroke="#9A8462" stroke-width="0.35"/>`;

/** A broom of palm fibre, its bristles' foot at (x, y), leaning a little to the right. */
const broom = (x: number, y: number) =>
  `<path d="M${n(x + 0.6)} ${n(y - 2.4)} L${n(x + 3.4)} ${n(y - 11)}" stroke="#8A5A2E" stroke-width="0.6" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.6)} ${y} L${n(x + 0.2)} ${n(y - 2.8)} L${n(x + 1.2)} ${n(y - 2.4)} L${n(x + 1.8)} ${y} Z" fill="#C9A66E"/>` +
  `<path d="M${n(x - 0.8)} ${y} L${n(x + 0.4)} ${n(y - 2.4)} M${n(x + 0.6)} ${y} L${n(x + 0.8)} ${n(y - 2.4)}" stroke="#9E7E4A" stroke-width="0.25"/>`;

/** A small flask of scent, its foot's middle at (x, y). */
const flask = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} Q${n(x - 2.2)} ${n(y - 2.2)} ${n(x - 0.6)} ${n(y - 3.2)} L${n(x - 0.6)} ${n(y - 4.2)} L${n(x + 0.6)} ${n(y - 4.2)} L${n(x + 0.6)} ${n(y - 3.2)} Q${n(x + 2.2)} ${n(y - 2.2)} ${n(x + 1.6)} ${y} Z" fill="#B9A2D6"/><rect x="${n(x - 0.8)}" y="${n(y - 5.2)}" width="1.6" height="1" fill="#8A6A3E"/>`;

/** Soft curls of a sweet scent, going up from about (x, y). */
const curls = (x: number, y: number, color = "#C9B2E6") =>
  [-2.6, 0, 2.6]
    .map((dx, i) => `<path d="M${n(x + dx)} ${n(y - (i % 2) * 1.2)} q-1.4 -1.6 0 -3.2 q1.4 -1.6 0 -3.2" stroke="${color}" stroke-width="0.6" fill="none" stroke-linecap="round"/>`)
    .join("");

/** Dust on the ground: small soft specks about the given points. */
const dust = (list: [number, number][]) =>
  list
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.8" ry="0.5" fill="#B49A70" opacity="0.7"/><ellipse cx="${n(x + 1.4)}" cy="${n(y - 0.6)}" rx="0.5" ry="0.3" fill="#9E845C"/>`)
    .join("");

/** The outline of a masjid yet to be built, its foot's left at (x, y), `w` wide and `h` high: a faint dashed line. */
const outline = (x: number, y: number, w: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h)} L${n(x + w)} ${n(y - h)} L${n(x + w)} ${y}" stroke="#FFF0C4" stroke-width="0.7" stroke-dasharray="1.4 1.2" fill="none"/>`;

/** A water glint: a small light on the water at (x, y). */
const waterGlint = (x: number, y: number) => sparkle(x, y, 1, "#E6F4FF");

// Is there Hajj for me? Urwah ibn Mudarris at-Ta'i said: I came to the Messenger of Allah ﷺ at Muzdalifah when he left
// for the prayer. I said: O Messenger of Allah, I came from the two mountains of Tayy, wearing out my mount and
// exhausting myself; by Allah, I did not leave a sand hill without stopping on it. So is there Hajj for me? He said:
// whoever attends this prayer of ours and stays here with us until departing, while he has stood at Arafat before
// that, by night or by day, then he has completed his Hajj and fulfilled his rites (Jami at-Tirmidhi 891). The oath,
// the sand hills he stopped on, "by night or by day" and the last words are left out of the lines. No one is drawn:
// Muzdalifah at night before the dawn, its pebbles, the places of the pilgrims resting on it and his place, a golden
// ring, among them; the two mountains of Tayy far off on the left, and Mount Arafat on the right. Urwah's voice tells
// of it, and his place comes along the road with his camel, no one on it. The first light of the dawn shows, and his
// place goes out for the prayer. Urwah's voice asks: a soft light on the two mountains far off and the long way from
// them; the camel's head goes down, worn out, and Urwah's place grows faint. His voice answers, soft and golden: the
// places of the pilgrims come into rows behind his place for the prayer, and Urwah's place joins them. The night goes,
// and they stay. A soft light comes on Mount Arafat and a faint golden way from it, and then a soft golden ring about
// Urwah's place: he has completed his Hajj.
function isThereHajjForMe(): SignArt {
  const urwah: [number, number] = [46, 103.6];
  const camelAt: [number, number] = [32, 104.8];
  const came = -46;
  const rested: [number, number] = [130, 101.6];
  const his: [number, number] = [110, 100.4];
  const resting: [number, number][] = [
    [64, 106.4],
    [80, 104.2],
    [88, 107],
    [118, 106.6],
    [140, 104.6],
    [150, 107]
  ];
  const rows: [number, number][] = [
    [101, 100.6],
    [101, 103.4],
    [101, 106.2],
    [94, 100.6],
    [94, 103.4],
    [87, 100.6]
  ];
  const joins: [number, number] = [94, 106.2];
  return {
    kind: "is-there-hajj-for-me",
    ms: 12000,
    parts: [
      { name: "sky, before the sun", svg: sky("#CFE3F2", "#F4E6D4", 62) },
      { name: "the night over the sky", svg: NIGHT_OVER_SKY, keys: track({ opacity: [[0.67, 1], [0.74, 0]] }) },
      { name: "the stars of the night", svg: stars([[16, 14], [40, 24], [62, 12], [92, 20], [118, 10], [146, 22]]), keys: track({ opacity: [[0.67, 1], [0.72, 0]] }), loop: twinkle(2200) },
      { name: "the first light of the dawn, low in the sky", svg: wash(80, 62, 96, 9, "#FFD9A8", 0.16), keys: showAt(0.13, 0.19), loop: soft },
      { name: "the two mountains of Tai, far off", svg: peaks([[14, 13, 11], [32, 16, 12]], 69, "#A8927A", false) },
      { name: "a soft light on the two mountains far off", svg: wash(23, 62, 18, 7, WARM, 0.24), keys: showFor(0.27, 0.29, 0.6, 0.62) },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "Mount Arafat, on the right", svg: arafat(120, 160, 92, 15) },
      { name: "sand hills on the way", svg: sandHill(0, 30, 98.4) + sandHill(18, 44, 100.6, "#E4CC98") },
      { name: "the pebbles of Muzdalifah", svg: pebbles([[58, 108], [70, 107.6], [78, 108.4], [106, 108.2], [124, 107.6], [132, 108.4], [144, 106.4], [156, 108]]) },
      { name: "the road he came along", svg: lane([[0, 103.4], [24, 103.4], [46, 103.6]]) },
      { name: "the long way he came, from the two mountains far off", svg: `<g opacity="0.75">${way("M24 70 C24 82 6 88 6 100 L40 103", "#FFF0C4", 0.8)}</g>`, keys: showFor(0.29, 0.3, 0.6, 0.62) },
      { name: "the night over the land", svg: NIGHT_OVER_LAND, keys: track({ opacity: [[0.67, 1], [0.74, 0]] }) },
      { name: "a soft light on Mount Arafat", svg: wash(140, 82, 16, 6.4, WARM, 0.18), keys: showAt(0.79, 0.81), loop: soft },
      { name: "glints on Mount Arafat", svg: glints([[132, 82], [146, 79], [140, 86]]), keys: showAt(0.8, 0.815), loop: twinkle(1500) },
      { name: "before that: a faint golden way from Mount Arafat", svg: way("M128 90 Q118 96 108 99.4", "#FFF0C4", 0.9), keys: showAt(0.82, 0.835) },
      ...resting.map(([x, y], i) => ({
        name: `the place of a pilgrim, resting, then in the rows of the prayer ${i + 1}`,
        svg: someone(x, y, 1.5, PILGRIM),
        keys: track({ xy: [[0.565, 0, 0], [0.6, n(rows[i][0] - x), n(rows[i][1] - y)]] })
      })),
      { name: "his place, a golden ring, among them", svg: ring(rested[0], rested[1], 2.6, GOLD), keys: track({ xy: [[0.13, 0, 0], [0.18, n(his[0] - rested[0]), n(his[1] - rested[1])]] }) },
      { name: "his voice, soft and golden: whoever attends this prayer of ours", svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.4), SOFT_GOLD), keys: showAt(0.515, 0.521), loop: speaking },
      {
        name: "the camel he wore out, no one on it",
        svg: camel(camelAt[0], camelAt[1], 0.13),
        origin: { x: camelAt[0], y: camelAt[1] },
        keys: track({
          xy: [
            [0.014, came, 0],
            [0.07, 0, 0]
          ],
          rotate: [
            [0.36, 0],
            [0.39, 12]
          ]
        })
      },
      {
        name: "Urwah's place, coming with it, then faint, worn out, then joining the rows",
        svg: someone(urwah[0], urwah[1], 1.5, MUDARRIS),
        keys: track({
          xy: [
            [0.014, came, 0],
            [0.07, 0, 0],
            [0.6, 0, 0],
            [0.63, n(joins[0] - urwah[0]), n(joins[1] - urwah[1])]
          ],
          opacity: [
            [0.395, 1],
            [0.41, 0.55],
            [0.886, 0.55],
            [0.9, 1]
          ]
        })
      },
      {
        name: "Urwah's voice: telling of it",
        svg: arcs(n(urwah[0] + 2.6), n(urwah[1] - 3.2), MUDARRIS),
        keys: track({
          xy: [
            [0.014, came, 0],
            [0.07, 0, 0]
          ],
          opacity: [
            [0.03, 0],
            [0.036, 1],
            [0.08, 1],
            [0.086, 0]
          ]
        }),
        loop: speaking
      },
      { name: "Urwah's voice: is there Hajj for me?", svg: arcs(n(urwah[0] + 2.6), n(urwah[1] - 3.2), MUDARRIS), keys: showFor(0.235, 0.241, 0.5, 0.506), loop: speaking },
      { name: "he has completed his Hajj: a soft golden ring about Urwah's place", svg: care(joins[0], n(joins[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft },
      { name: "glints over it", svg: glints([[91, 102.4], [97, 102]]), keys: showAt(0.92, 0.935), loop: twinkle() }
    ],
    words: linesOn(NINE, [
      "Urwah ibn Mudarris: I came to him at",
      "Muzdalifah when he left for the salat.",
      "I said: I came from the two mountains of",
      "Tai, wearing out my mount and exhausting",
      "Myself. So is there Hajj for me? He said:",
      "Whoever attends this salat of ours, and",
      "Stays here with us until departing, while",
      "He has stood at Arafat before that, then",
      "He has completed his Hajj."
    ])
  };
}

// Zamzam to take home. Hisham ibn Urwah narrated from his father that Aishah would carry some Zamzam water, and she
// would say: indeed the Messenger of Allah ﷺ would carry it (Jami at-Tirmidhi 963). No one is drawn: Makkah on the
// left, its hills, the Ka'bah and the well of Zamzam, with Aishah's place by it; a road going to Madinah, its palms and
// homes, on the right, and Urwah's place by them. Urwah's voice tells of it. Light glints on the water of the well, a
// waterskin is filled, and it goes with Aishah's place along the road to Madinah. Her voice speaks. Then his place, a
// golden ring, goes the same way with a waterskin of its own: he would carry it; and a soft golden ring comes about
// Aishah's place.
function zamzamToTakeHome(): SignArt {
  const well: [number, number] = [46, 101];
  const aishah: [number, number] = [56, 103.2];
  const home_: [number, number] = [120, 103];
  const urwah: [number, number] = [150, 106.4];
  return {
    kind: "zamzam-to-take-home",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(84, 20) },
      { name: "a cloud", svg: cloud(118, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [6, 22, 16],
            [30, 15, 13]
          ],
          90,
          "#A88A64",
          false
        )
      },
      { name: "the Ka'bah", svg: kaaba(24, 98, 0.9) },
      { name: "the well of Zamzam", svg: zamzamWell(well[0], well[1]) },
      { name: "light on the water of Zamzam", svg: waterGlint(n(well[0] - 1.6), n(well[1] - 3.8)) + waterGlint(n(well[0] + 2), n(well[1] - 3.6)), keys: showFor(0.36, 0.37, 0.41, 0.42), loop: twinkle(800) },
      ...palms(
        [
          [134, 92, 7],
          [156, 93, 7.4]
        ],
        "Madinah"
      ),
      { name: "the homes of Madinah", svg: home(144, 100, 14, 9) + home(126, 99, 10, 6.4) },
      { name: "the road to Madinah", svg: lane([[52, 103.4], [76, 104.6], [100, 104.2], [122, 103.4]]) },
      {
        name: "a waterskin of Zamzam, filled, then going with her",
        svg: waterskin(n(aishah[0] + 3.4), n(aishah[1] + 2.2)),
        keys: track({
          opacity: [
            [0.38, 0],
            [0.39, 1]
          ],
          xy: along(
            [
              [aishah[0], aishah[1]],
              [76, 104.4],
              [home_[0], home_[1]]
            ],
            [0.42, 0.5, 0.58]
          )
        })
      },
      { name: "Aishah's place, by the well, then going to Madinah", svg: someone(aishah[0], aishah[1], 1.5, AISHAH), keys: track({ xy: along([[aishah[0], aishah[1]], [76, 104.4], [home_[0], home_[1]]], [0.42, 0.5, 0.58]) }) },
      { name: "Aishah's voice: indeed he would carry it", svg: arcsLeft(n(home_[0] - 2.4), n(home_[1] - 3.2), AISHAH), keys: showAt(0.6, 0.606), loop: speaking },
      { name: "Urwah's place", svg: someone(urwah[0], urwah[1], 1.5, URWAH) },
      { name: "Urwah's voice: telling of it", svg: arcsLeft(n(urwah[0] - 2.4), n(urwah[1] - 3.2), URWAH), keys: showFor(0.024, 0.03, 0.28, 0.286), loop: speaking },
      {
        name: "he would carry it: his place, a golden ring, going the same way with a waterskin",
        svg: ring(aishah[0], aishah[1], 2.6, GOLD) + waterskin(n(aishah[0] + 4.2), n(aishah[1] + 2.4)),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.7, 1]
          ],
          xy: along(
            [
              [aishah[0], aishah[1]],
              [76, 104.4],
              [100, 104]
            ],
            [0.71, 0.79, 0.86]
          )
        })
      },
      { name: "a soft golden ring about Aishah's place", svg: care(home_[0], n(home_[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft }
    ],
    words: linesOn(THREE, ["Urwah: Aishah would carry some", "Zamzam water, and she would say:", "Indeed he would carry it."])
  };
}

// Clean and scented. Aishah said: the Prophet ﷺ ordered the construction of masjids in all Dur, and that they be kept
// clean and scented (Jami at-Tirmidhi 594). No one is drawn: homes on the left and on the right with an empty plot
// between them, its dust on the ground, and far off, more homes on the left and on the right. Aishah's voice tells of
// it. His voice speaks, soft and golden, and the faint dashed outline of a masjid shows on the plot. Then the masjid
// rises among the homes, its walls and its roof of palm leaves, and small masjids rise among the homes far off too.
// The place of one who sweeps comes with a broom: the dust goes, and glints come on the clean ground. A flask of scent
// is set by the door, and soft curls of scent go up. Then a soft golden ring comes about the masjid.
function cleanAndScented(): SignArt {
  const plot = 62;
  const foot = 104;
  const his: [number, number] = [52, 106.6];
  const aishah: [number, number] = [150, 106];
  const sweeps: [number, number] = [64, 107.6];
  return {
    kind: "clean-and-scented",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(52, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "homes far off, on the left", svg: home(10, 82, 7, 4.6) + home(28, 83, 6, 4) },
      { name: "homes far off, on the right", svg: home(134, 83, 6, 4) + home(150, 82, 7, 4.6) },
      { name: "a small masjid, rising among the homes far off on the left", svg: madinahMasjid(14, 83.4, 0.2), origin: { x: 18.8, y: 83.4 }, keys: track({ opacity: [[0.46, 0], [0.47, 1]], scaleY: [[0.46, 0], [0.52, 1]] }) },
      { name: "a small masjid, rising among the homes far off on the right", svg: madinahMasjid(136.8, 83.4, 0.2), origin: { x: 141.6, y: 83.4 }, keys: track({ opacity: [[0.5, 0], [0.51, 1]], scaleY: [[0.5, 0], [0.56, 1]] }) },
      { name: "homes on the left", svg: home(14, 100, 16, 10) + home(36, 98, 12, 8) },
      { name: "homes on the right", svg: home(124, 98, 12, 8) + home(146, 100, 16, 10) },
      { name: "the dust on the plot", svg: dust([[68, 106.4], [78, 107.6], [88, 106.6], [96, 107.8]]), keys: track({ opacity: [[0.7, 1], [0.77, 0]] }) },
      { name: "the outline of a masjid yet to be built", svg: outline(plot, foot, 33.6, 13.3), keys: showFor(0.22, 0.24, 0.36, 0.37) },
      { name: "the masjid, rising among the homes", svg: madinahMasjid(plot, foot, 0.7), origin: { x: n(plot + 16.8), y: foot }, keys: track({ opacity: [[0.36, 0], [0.37, 1]], scaleY: [[0.36, 0], [0.46, 1]] }) },
      { name: "clean: glints on the ground before it", svg: glints([[70, 106.6], [82, 107.6], [92, 106.6]]), keys: showAt(0.77, 0.79), loop: twinkle() },
      { name: "a flask of scent, set by its door", svg: flask(n(plot + 21), n(foot + 0.4)), keys: showAt(0.8, 0.81) },
      { name: "scented: soft curls of scent going up", svg: curls(n(plot + 21), n(foot - 5.6)), keys: showAt(0.82, 0.84), loop: { move: "bob", ms: 2000, y: 0.5 } },
      { name: "a sweet soft light about the door", svg: glow(n(plot + 18), n(foot - 6), 6, "#F3E4FF", 0.08), keys: showAt(0.83, 0.85), loop: soft },
      {
        name: "a broom, sweeping",
        svg: broom(sweeps[0], sweeps[1]),
        origin: { x: sweeps[0], y: sweeps[1] },
        keys: track({
          opacity: [
            [0.68, 0],
            [0.69, 1],
            [0.78, 1],
            [0.79, 0]
          ],
          xy: [
            [0.69, 0, 0],
            [0.77, 28, 0]
          ],
          rotate: [
            [0.69, 0],
            [0.71, 14],
            [0.73, -6],
            [0.75, 14],
            [0.77, 0]
          ]
        })
      },
      {
        name: "the place of one who sweeps",
        svg: someone(n(sweeps[0] - 3.4), n(sweeps[1] - 2.4), 1.5, GIVES),
        keys: track({
          opacity: [
            [0.68, 0],
            [0.69, 1]
          ],
          xy: [
            [0.69, 0, 0],
            [0.77, 28, 0]
          ]
        })
      },
      { name: "his place, a golden ring, by the plot", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: he ordered it", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.16, 0.166, 0.28, 0.286), loop: speaking },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: telling of it", svg: arcsLeft(n(aishah[0] - 2.4), n(aishah[1] - 3.2), AISHAH), keys: showFor(0.024, 0.03, 0.14, 0.146), loop: speaking },
      { name: "a soft golden ring about the masjid", svg: care(n(plot + 16.8), n(foot + 1.6), 22, 4, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft }
    ],
    words: linesOn(THREE, ["Aishah: he ordered the construction of", "Masjids in all Dur, and that they be kept", "Clean and scented."])
  };
}

// A pleased collector. Jarir said that the Prophet ﷺ said: when the charity collector comes to you, then he should
// not depart from you except while pleased (Jami at-Tirmidhi 647). No one is drawn: a home on the right with its palms,
// and its sheep and goats grazing by it, the place of the one whose home it is by its door; a road coming from the
// left. Jarir's voice tells of it. The place of the collector comes along the road with a camel, no one on it. The voice
// of the one whose home it is welcomes him, soft and warm; a mat is spread and food and a drink are set before him; two
// sheep of the flock go over to him, the share that is due. A soft golden ring comes about the collector's place, and
// it goes back along the road with the camel and the sheep, the ring with it: pleased. Glints come at the home, and a
// soft golden ring about the place of the one whose home it is.
function pleasedCollector(): SignArt {
  const collector: [number, number] = [80, 102.8];
  const camelAt: [number, number] = [66, 104.2];
  const came = -74;
  const gives: [number, number] = [122, 102.4];
  const jarir: [number, number] = [154, 107.2];
  const away = -50;
  const share: [number, number][] = [
    [100, 106.6],
    [112, 107]
  ];
  const sheepGo: [number, number][] = [
    [72, 106.8],
    [62, 107.2]
  ];
  const leave = (from: [number, number], to: [number, number]) =>
    track({
      xy: [
        [0.46, 0, 0],
        [0.56, n(to[0] - from[0]), n(to[1] - from[1])],
        [0.74, n(to[0] - from[0]), n(to[1] - from[1])],
        [0.86, n(to[0] - from[0] + away), n(to[1] - from[1])]
      ]
    });
  return {
    kind: "pleased-collector",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(40, 20) },
      { name: "a cloud", svg: cloud(110, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms(
        [
          [104, 92, 7],
          [154, 92, 7.6]
        ],
        "the home"
      ),
      { name: "the home", svg: home(132, 100, 18, 11) },
      { name: "the road coming from the left", svg: lane([[0, 103.6], [40, 103.4], [84, 103.6]]) },
      { name: "a goat of the flock, grazing", svg: goat(146, 103.6, 0.09, true), origin: { x: 146, y: 103.6 }, loop: { move: "bob", ms: 2200, y: 0.3 } },
      { name: "a sheep of the flock, grazing", svg: sheep(134, 106.8, 0.1), origin: { x: 134, y: 106.8 }, loop: { move: "bob", ms: 2600, y: 0.3 } },
      ...share.map(([x, y], i) => ({ name: `a sheep of the flock, the share that is due ${i + 1}`, svg: sheep(x, y, 0.1, true), origin: { x, y }, keys: leave([x, y], sheepGo[i]) })),
      { name: "a mat, spread for him", svg: mat(n(collector[0] + 6.6), n(collector[1] + 1.6), 9), keys: track({ opacity: [[0.4, 0], [0.41, 1], [0.72, 1], [0.73, 0]] }) },
      { name: "food and a drink, set before him", svg: food(n(collector[0] + 5.4), n(collector[1] + 1.4)) + cup(n(collector[0] + 9.6), n(collector[1] + 2.2)), keys: track({ opacity: [[0.42, 0], [0.43, 1], [0.72, 1], [0.73, 0]] }) },
      { name: "the camel that came with him, no one on it", svg: camel(camelAt[0], camelAt[1], 0.13), keys: track({ xy: [[0.03, came, 0], [0.2, 0, 0], [0.74, 0, 0], [0.86, away, 0]] }) },
      { name: "the collector's place, coming, then going back", svg: someone(collector[0], collector[1], 1.5, COMES), keys: track({ xy: [[0.03, came, 0], [0.2, 0, 0], [0.74, 0, 0], [0.86, away, 0]] }) },
      { name: "pleased: a soft golden ring about the collector's place, going with it", svg: care(collector[0], n(collector[1] + 0.6), 4, 2, SOFT_GOLD), keys: track({ opacity: [[0.69, 0], [0.705, 1]], xy: [[0.74, 0, 0], [0.86, away, 0]] }), loop: soft },
      { name: "the place of the one whose home it is", svg: someone(gives[0], gives[1], 1.5, GIVES) },
      { name: "its voice, soft and warm: welcome", svg: arcsLeft(n(gives[0] - 2.4), n(gives[1] - 3.2), "#E8A04E"), keys: showFor(0.34, 0.346, 0.44, 0.446), loop: speaking },
      { name: "glints at the home", svg: glints([[124, 90], [134, 87.6], [144, 90.4]]), keys: showAt(0.88, 0.895), loop: twinkle() },
      { name: "a soft golden ring about its place", svg: care(gives[0], n(gives[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft },
      { name: "Jarir's place", svg: someone(jarir[0], jarir[1], 1.5, JARIR) },
      { name: "Jarir's voice: telling of it", svg: arcs(n(jarir[0] + 2.6), n(jarir[1] - 3.2), JARIR), keys: showFor(0.024, 0.03, 0.14, 0.146), loop: speaking }
    ],
    words: linesOn(THREE, ["Jarir: he said: when the charity collector", "Comes to you, then he should not depart", "From you except while pleased."])
  };
}

// Invited while fasting. Abu Hurairah said that the Prophet ﷺ said: when one of you is invited to eat then let him
// respond; if he is fasting then let him pray; meaning: supplicate (Jami at-Tirmidhi 780). No one is drawn: the home of
// one who invites on the left, a cloth spread before it with food on it, and the places of others who came, sitting at
// it; the home of one who is invited on the right, its place by it. Abu Hurairah's voice tells of it. The voice of the
// one who invites calls, warm; a faint golden way shows from the other home, and the place of the one invited goes
// along it and sits at the cloth, a dish set before it: he responds. A soft golden ring comes about it: he is fasting.
// The food of the others goes as they eat, and his dish stays as it was. His voice speaks, soft: glints go up from it
// and over to the home of the one who invites, and a soft golden ring comes about its place.
function invitedWhileFasting(): SignArt {
  const invites: [number, number] = [28, 103.6];
  const invited: [number, number] = [134, 103.4];
  const sits: [number, number] = [72, 102.6];
  const others: [number, number][] = [
    [44, 102.4],
    [58, 102.4]
  ];
  const hurairah: [number, number] = [152, 107];
  return {
    kind: "invited-while-fasting",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "a cloud", svg: cloud(40, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms(
        [
          [8, 93, 7],
          [104, 92, 7.4]
        ],
        "Madinah"
      ),
      { name: "the home of the one who invites", svg: home(22, 99, 18, 11) },
      { name: "the home of the one invited", svg: home(142, 99, 16, 10) },
      { name: "a cloth spread before the home, for the meal", svg: cloth(38, 78, 103.4) },
      ...others.map(([x, y], i) => ({ name: `a dish of food before the place of another who came ${i + 1}`, svg: dish(x, n(y + 3.6)) })),
      ...others.map(([x, y], i) => ({
        name: `the food on it, going as they eat ${i + 1}`,
        svg: `<ellipse cx="${n(x - 0.6)}" cy="${n(y + 2.4)}" rx="2" ry="1.1" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/><ellipse cx="${n(x + 1.6)}" cy="${n(y + 2.6)}" rx="0.8" ry="0.6" fill="#7A2E14"/>`,
        keys: track({ opacity: [[0.57 + i * 0.02, 1], [0.6 + i * 0.02, 0]] })
      })),
      { name: "the places of others who came, sitting at the cloth", svg: places(others, 1.5, COMES) },
      { name: "the dish set before the one invited, staying as it was", svg: food(n(sits[0] - 0.4), n(sits[1] + 4)), keys: showAt(0.46, 0.47) },
      { name: "the place of the one who invites", svg: someone(invites[0], invites[1], 1.5, GIVES) },
      { name: "its voice, warm: calling to the meal", svg: arcs(n(invites[0] + 2.6), n(invites[1] - 3.4), "#E8A04E"), keys: showFor(0.28, 0.286, 0.36, 0.366), loop: speaking },
      { name: "the way he comes, from the other home: a faint golden way", svg: way(`M${invited[0]} ${n(invited[1] + 1.4)} Q104 106 ${n(sits[0] + 3)} ${n(sits[1] + 1.4)}`, "#FFF0C4", 0.9), keys: showFor(0.36, 0.37, 0.46, 0.47) },
      { name: "the place of the one invited, coming to the meal", svg: someone(invited[0], invited[1], 1.5, FASTING), keys: track({ xy: along([invited, [104, 104.6], sits], [0.38, 0.42, 0.46]) }) },
      { name: "he is fasting: a soft golden ring about its place", svg: fastRing(sits[0], n(sits[1] + 0.6)), keys: showAt(0.53, 0.55), loop: soft },
      { name: "its voice, soft: making du'a for them", svg: arcsLeft(n(sits[0] - 2.4), n(sits[1] - 3.4), SOFT_GOLD), keys: showAt(0.62, 0.626), loop: speaking },
      {
        name: "glints going up from it, and over to the home of the one who invites",
        svg: glints([
          [sits[0], n(sits[1] - 7)],
          [n(sits[0] - 4), n(sits[1] - 9)],
          [n(sits[0] + 3), n(sits[1] - 10)]
        ]),
        keys: track({
          opacity: [
            [0.64, 0],
            [0.65, 1]
          ],
          xy: [
            [0.65, 0, 0],
            [0.7, -8, -6],
            [0.78, -8, -6],
            [0.84, n(invites[0] - sits[0] + 2), -8]
          ]
        }),
        loop: twinkle()
      },
      { name: "a soft golden ring about the place of the one who invites", svg: care(invites[0], n(invites[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(hurairah[0] - 2.4), n(hurairah[1] - 3.2), HURAIRAH), keys: showFor(0.024, 0.03, 0.2, 0.206), loop: speaking }
    ],
    words: linesOn(FOUR, ["Abu Hurairah: he said: when one of you", "Is invited to eat then let him respond,", "If he is fasting then let him pray.", "Meaning: supplicate."])
  };
}

// The best companion. Abdullah ibn Amr said that the Messenger of Allah ﷺ said: the companion who is the best to Allah
// is the one who is best to his companion, and the neighbor that is the best to Allah is the one that is best to his
// neighbor (Jami at-Tirmidhi 1944). No one is drawn: on the left, a road and a palm, and two who travel together come
// along it with a camel, no one on it; on the right, two homes side by side, a lane between their doors. Abdullah's
// voice tells of it. The two stop under the palm: one spreads a cloth in its shade, and the other's place sits on it.
// A cup of water goes from the one to the other, then dates, and a soft golden ring comes about the one who gave. Then
// the place of the one in the first home comes out of its door, a dish of food by it; the dish goes along the lane to
// the home next door, glints come at its door, and a soft golden ring comes about the one who sent it.
function bestCompanion(): SignArt {
  const good: [number, number] = [40, 103.4];
  const other: [number, number] = [52, 103.8];
  const camelAt: [number, number] = [24, 104.8];
  const came = -44;
  const rests: [number, number] = [58, 101.6];
  const first: [number, number] = [112, 100.6];
  const outside: [number, number] = [116, 104];
  const nextDoor: [number, number] = [134, 104.4];
  const amr: [number, number] = [84, 107.4];
  const goes = track({ xy: [[0.03, came, 0], [0.15, 0, 0]] });
  return {
    kind: "best-companion",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(68, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[60, 93, 8]], "the road"),
      { name: "the shade of the palm", svg: `<ellipse cx="60" cy="103.6" rx="10" ry="2" fill="#000000" opacity="0.08"/>` },
      { name: "the road", svg: lane([[0, 103.6], [26, 103.6], [52, 104]]) },
      { name: "the first home", svg: home(110, 100, 14, 9) },
      { name: "the home next door", svg: home(140, 100, 14, 9) },
      { name: "a lane between their doors", svg: lane([[108, 104], [124, 104.6], [138, 104.4]], "#D8C49A") },
      { name: "a cloth, spread in the shade", svg: cloth(54, 64, 101.6), keys: showAt(0.24, 0.26) },
      { name: "the camel going with them, no one on it", svg: camel(camelAt[0], camelAt[1], 0.13), keys: goes },
      { name: "the place of one who travels, good to the other", svg: someone(good[0], good[1], 1.5, GIVES), keys: goes },
      { name: "the place of the one with it, then sitting in the shade", svg: someone(other[0], other[1], 1.5, COMES), keys: track({ xy: [[0.03, came, 0], [0.15, 0, 0], [0.27, 0, 0], [0.32, n(rests[0] + 1 - other[0]), n(rests[1] + 0.4 - other[1])]] }) },
      {
        name: "a cup of water, going to the one in the shade",
        svg: cup(n(good[0] + 2.6), n(good[1] + 2.2)),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.425, 1]
          ],
          xy: [
            [0.425, 0, 0],
            [0.46, n(rests[0] - good[0] - 4.6), n(rests[1] - good[1] + 0.2)]
          ]
        })
      },
      {
        name: "a few dates, going to it after",
        svg: [-1.2, 0, 1.2].map((dx, i) => `<ellipse cx="${n(good[0] + 3 + dx)}" cy="${n(good[1] + 1.6 - (i === 1 ? 0.8 : 0))}" rx="0.8" ry="0.6" fill="#7A2E14"/>`).join(""),
        keys: track({
          opacity: [
            [0.47, 0],
            [0.475, 1]
          ],
          xy: [
            [0.475, 0, 0],
            [0.5, n(rests[0] - good[0] - 0.8), n(rests[1] - good[1] + 1.2)]
          ]
        })
      },
      { name: "a soft golden ring about the one who gave", svg: care(good[0], n(good[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.52, 0.535), loop: soft },
      {
        name: "the place of the one in the first home, coming out of its door",
        svg: someone(first[0], first[1], 1.5, GIVES),
        keys: track({
          opacity: [
            [0.62, 0],
            [0.63, 1]
          ],
          xy: [
            [0.63, 0, 0],
            [0.66, n(outside[0] - first[0]), n(outside[1] - first[1])]
          ]
        })
      },
      { name: "the place of the one in the home next door", svg: someone(nextDoor[0], nextDoor[1], 1.5, COMES) },
      {
        name: "a dish of food, by it, then going along the lane to the home next door",
        svg: food(n(outside[0] + 3.6), n(outside[1] + 2.2)),
        keys: track({
          opacity: [
            [0.68, 0],
            [0.69, 1]
          ],
          xy: [
            [0.81, 0, 0],
            [0.87, n(nextDoor[0] - outside[0] - 8), 0.4]
          ]
        })
      },
      { name: "glints at the door next door", svg: glints([[n(nextDoor[0] + 3), 93.6], [n(nextDoor[0] + 8), 95]]), keys: showAt(0.88, 0.89), loop: twinkle() },
      { name: "a soft golden ring about the one who sent it", svg: care(outside[0], n(outside[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft },
      { name: "Abdullah's place", svg: someone(amr[0], amr[1], 1.5, AMR) },
      { name: "Abdullah's voice: telling of it", svg: arcs(n(amr[0] + 2.6), n(amr[1] - 3.2), AMR), keys: showFor(0.024, 0.03, 0.16, 0.166), loop: speaking }
    ],
    words: linesOn(FIVE, ["Abdullah ibn Amr: he said: the companion", "Who is the best to Allah is the one who", "Is best to his companion. And the", "Neighbor that is the best to Allah is the", "One that is best to his neighbor."])
  };
}

export const WELCOME_ART = {
  "is-there-hajj-for-me": isThereHajjForMe,
  "zamzam-to-take-home": zamzamToTakeHome,
  "clean-and-scented": cleanAndScented,
  "pleased-collector": pleasedCollector,
  "invited-while-fasting": invitedWhileFasting,
  "best-companion": bestCompanion
} as const;
