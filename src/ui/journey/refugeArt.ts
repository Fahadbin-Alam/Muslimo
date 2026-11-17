import { cloud, flower, glow, n, palm, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, wall, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { care, lightIn, palms, sparkRising, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { faintRing } from "./heedArt";
import { prayerMat } from "./lovedArt";
import { shadeOf } from "./hopeArt";
import { coins } from "./tradeArt";
import { lookLine } from "./truthArt";
import { dish, goldHeap, roundTree } from "./worthArt";
import { dayLit, showAt, showFor } from "./roadArt";

/**
 * Refuge: two blessings many are deceived into losing, health and free time; Jarir's pledge, to keep up the prayer,
 * pay the zakat and be sincere to every Muslim; the refuge he sought from worry and grief, incapacity and laziness,
 * cowardice and miserliness, heavy debt and being overpowered; a woman married for four, and the one with religion
 * chosen; Sawdah, whom Aishah wished to be like, giving her day to Aishah when she grew old; a believer who does not
 * hate a believing woman, since if one trait displeases, another pleases; and wrongdoing, darkness on the Day of
 * Resurrection, and stinginess, which destroyed those before. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face: where
 * someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in
 * the air. Nothing is drawn for Allah: a prayer is a spark that rises, and refuge is a soft golden ring on the ground.
 * What is sought refuge from is grey, off to the side, and fades. No name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** Grey, for what should not be. */
const GREY = "#8C8C8C";

/** Dark, for the darkness of a wrong. */
const DARK = "#3E3448";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number, sunY = 20): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, sunY) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts, fill);

/** The road across the land, from x 0 to 160 about y 104. */
const ROAD = `<path d="M0 101.4 Q80 99.8 160 101 L160 107.8 Q80 106.4 0 108 Z" fill="#EEDCAE"/>`;

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** `svg` drawn `s` times its size about (x, y). */
const bigger = (x: number, y: number, s: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${svg}</g>`;

/** Shown from `from` to `to`, then faded to a trace from `dim` to `low`: what refuge is sought from. */
const fadedAfter = (from: number, to: number, dim: number, low: number) =>
  track({
    opacity: [
      [from, 0],
      [to, 1],
      [dim, 1],
      [low, 0.35]
    ]
  });

/** A plain reed mat on the ground, its middle at (x, y). */
const mat = (x: number, y: number) =>
  `<path d="M${n(x - 4.6)} ${n(y + 1.2)} L${n(x + 3.6)} ${n(y + 1.2)} L${n(x + 4.8)} ${n(y - 1)} L${n(x - 3.4)} ${n(y - 1)} Z" fill="#D9B978"/>` +
  `<path d="M${n(x - 3.2)} ${n(y + 0.1)} L${n(x + 3.8)} ${n(y + 0.1)}" stroke="#BF9C5A" stroke-width="0.35"/>`;

// Health and free time. Ibn Abbas said that the Prophet ﷺ said: there are two blessings that many people are deceived
// into losing: health and free time (Sahih al-Bukhari 6412). No one is drawn: by the masjid of Madinah, his place, a
// golden ring; his voice speaks. Two soft golden lights show over the land, one over a place standing strong in the
// open, one over a free mat in a palm's shade. Under a shady tree, idle places sit on their mats: the sun moves on
// across the sky and the shade moves with it, the day going by, and the two lights fade; grey rings come about the
// idle places. Then a warm glow comes about the strong place, its health, a soft golden ring about the free mat in the
// shade, its free time, and glints over both.
function healthAndFreeTime(): SignArt {
  const his: [number, number] = [32, 99.6];
  const strong: [number, number] = [62, 101.4];
  const free: [number, number] = [88, 102.6];
  const tree: [number, number] = [124, 99];
  const idle: [number, number][] = [
    [113.6, 101.6],
    [123, 103.4],
    [133, 101.8]
  ];
  return {
    kind: "health-and-free-time",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun, moving on as the day goes by",
        svg: sun(40, 20),
        keys: track({
          xy: [
            [0.38, 0, 0],
            [0.58, 80, 0]
          ]
        })
      },
      { name: "a cloud", svg: cloud(76, 27, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      { name: "a home", svg: home(150, 95, 11, 8) },
      {
        name: "the shade of the tree, moving as the sun moves",
        svg: shadeOf(n(tree[0] + 4), 102.6, 15, 3.8),
        keys: track({
          xy: [
            [0.38, 0, 0],
            [0.58, -8, 0]
          ]
        })
      },
      { name: "a shady tree", svg: roundTree(tree[0], tree[1], 22, "#5FA344") },
      { name: "the shade of a palm", svg: shadeOf(free[0], n(free[1] + 0.2), 8, 2.4) },
      ...palms([[94, 101, 14]]),
      { name: "a free mat in the palm's shade", svg: mat(free[0], free[1]) },
      { name: "the idle mats under the tree", svg: idle.map(([x, y]) => mat(x, n(y + 0.8))).join("") },
      { name: "idle places sitting on their mats", svg: idle.map(([x, y]) => someone(x, y, 1.5)).join("") },
      { name: "a place standing strong in the open", svg: someone(strong[0], strong[1], 1.7) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: two blessings", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "a blessing: a soft golden light over the strong place", svg: lightIn(strong[0], 89, 4), keys: showFor(0.1, 0.12, 0.52, 0.56), loop: soft },
      { name: "a blessing: a soft golden light over the free mat", svg: lightIn(free[0], 89, 4), keys: showFor(0.16, 0.18, 0.52, 0.56), loop: soft },
      { name: "deceived into losing them: grey rings about the idle places", svg: idle.map(([x, y]) => greyRing(x, n(y + 0.4), 3.2, 1.7)).join(""), keys: showAt(0.58, 0.6) },
      { name: "health: a warm glow about the strong place", svg: glow(strong[0], strong[1], 5.4, WARM, 0.3), keys: showAt(0.7, 0.72), loop: soft },
      { name: "free time: a soft golden ring about the free mat", svg: care(free[0], n(free[1] + 0.4), 6.4, 2.4, SOFT_GOLD), keys: showAt(0.8, 0.82), loop: soft },
      {
        name: "glints over the strong place and the free mat",
        svg: glints(
          [
            [n(strong[0] + 2.4), n(strong[1] - 4.6)],
            [n(strong[0] - 2.6), n(strong[1] - 3.4)],
            [n(free[0] + 3), n(free[1] - 4.2)],
            [n(free[0] - 2.8), n(free[1] - 3.2)]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle()
      }
    ],
    words: [
      { text: "He said: there are two blessings", from: 0.02, to: 0.33 },
      { text: "that many people are deceived into losing:", from: 0.345, to: 0.655 },
      { text: "health and free time", from: 0.67, to: 1 }
    ]
  };
}

// Sincere to every Muslim. Jarir ibn Abdullah said: I gave the Messenger of Allah ﷺ my pledge to keep up the prayer, to
// pay the zakat, and to be sincere to every Muslim (Sahih al-Bukhari 57). No one is drawn: by the masjid of Madinah,
// his place, a golden ring. Jarir's place comes along the road to it, and Jarir's voice speaks; a soft golden ring
// comes about both places, the pledge, and glints. A prayer mat shows by the masjid and a spark rises from it; a sack
// goes from Jarir's place to a place in need by its home, with an empty dish, and a warm glow comes about that place.
// Then faint golden lines go from Jarir's place to the places about the homes, every one of them, and a soft golden
// ring comes about each; a warm glow comes about Jarir's place, and glints.
function sincereToEveryMuslim(): SignArt {
  const his: [number, number] = [32, 100];
  const jarirFrom: [number, number] = [152, 104.4];
  const jarir: [number, number] = [41, 101.6];
  const need: [number, number] = [96, 101.4];
  const mosqueMat: [number, number] = [15, 101.8];
  const others: [number, number][] = [
    [64, 102.2],
    [80, 104.6],
    need,
    [114, 104.4],
    [134, 101.8]
  ];
  return {
    kind: "sincere-to-every-muslim",
    ms: 9000,
    parts: [
      ...daySky(118, 50, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the road", svg: ROAD },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      { name: "a home 1", svg: home(72, 95, 11, 8) },
      { name: "a home 2", svg: home(100, 94.4, 12, 9) },
      { name: "a home 3", svg: home(128, 95, 11, 8) },
      ...palms([
        [52, 93, 12],
        [148, 93, 13]
      ]),
      { name: "an empty dish by the place in need", svg: dish(n(need[0] + 4.2), n(need[1] + 1.4)) },
      { name: "the places about the homes", svg: others.map(([x, y]) => someone(x, y, 1.5)).join("") },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "Jarir ibn Abdullah's place, coming to his",
        svg: someone(jarirFrom[0], jarirFrom[1], 1.5),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.13, n(jarir[0] - jarirFrom[0]), n(jarir[1] - jarirFrom[1])]
          ]
        })
      },
      { name: "Jarir's voice: I gave the pledge", svg: arcs(n(jarir[0] + 1.8), n(jarir[1] - 3.2), "#A8783A"), keys: showAt(0.15, 0.16), loop: speaking },
      { name: "the pledge: a soft golden ring about both places", svg: care(n((his[0] + jarir[0]) / 2), n(his[1] + 0.8), 8.4, 3, GOLD), keys: showAt(0.2, 0.22), loop: soft },
      {
        name: "glints over the pledge",
        svg: glints(
          [
            [n(his[0] - 1), n(his[1] - 5.6)],
            [n(jarir[0] + 1.6), n(jarir[1] - 6)]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.25, 0.26),
        loop: twinkle()
      },
      { name: "the prayer: a prayer mat by the masjid", svg: bigger(mosqueMat[0], mosqueMat[1], 0.55, prayerMat(mosqueMat[0], mosqueMat[1])), keys: showAt(0.36, 0.37) },
      { name: "a spark rising from the prayer mat", svg: sparkle(mosqueMat[0], n(mosqueMat[1] - 3), 1.6, "#FFE7A0"), keys: sparkRising(0.38, 0.48, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "the zakat: a sack going from Jarir's place to the place in need",
        svg: sack(n(jarir[0] + 3.4), n(jarir[1] + 1.4), 0.8),
        keys: track({
          opacity: [
            [0.48, 0],
            [0.49, 1]
          ],
          xy: [
            [0.5, 0, 0],
            [0.58, n(need[0] - 3.6 - jarir[0] - 3.4), n(need[1] - jarir[1])]
          ]
        })
      },
      { name: "a warm glow about the place in need", svg: glow(need[0], need[1], 5, WARM, 0.3), keys: showAt(0.59, 0.61) },
      {
        name: "sincere to every one: faint golden lines from Jarir's place to the places",
        svg: others.map(([x, y]) => lookLine(n(jarir[0] + 1.6), n(jarir[1] - 1), n(x - 0.4), n(y - 1.4), n(Math.min(jarir[1], y) - 6 - (x - jarir[0]) * 0.06))).join(""),
        keys: showAt(0.7, 0.72)
      },
      { name: "a soft golden ring about each place", svg: others.map(([x, y]) => care(x, n(y + 0.4), 2.8, 1.5, SOFT_GOLD)).join(""), keys: showAt(0.78, 0.8), loop: soft },
      { name: "a warm glow about Jarir's place", svg: glow(jarir[0], jarir[1], 5, WARM, 0.32), keys: showAt(0.86, 0.88) },
      {
        name: "glints over the places",
        svg: glints(others.map(([x, y]): [number, number] => [n(x + 1.8), n(y - 4)]), 0.9, "#FFD866"),
        keys: showAt(0.9, 0.91),
        loop: twinkle(1200)
      }
    ],
    words: [
      { text: "Jarir: I gave him the pledge", from: 0.02, to: 0.33 },
      { text: "to keep up the prayer, to pay the zakat,", from: 0.345, to: 0.655 },
      { text: "and to be sincere to every Muslim", from: 0.67, to: 1 }
    ]
  };
}

/** A grey tangle in the air about (x, y): worry. */
const tangle = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${n(y + 0.6)} Q${n(x - 2.6)} ${n(y - 3.4)} ${n(x - 0.2)} ${n(y - 1)} Q${n(x + 2.2)} ${n(y + 1.8)} ${n(x + 1.2)} ${n(y - 2.2)} ` +
  `Q${n(x - 0.4)} ${n(y - 4.6)} ${n(x - 2.4)} ${n(y - 1.4)} Q${n(x - 3.6)} ${n(y + 1.4)} ${n(x - 0.4)} ${n(y + 1.4)} Q${n(x + 3)} ${n(y + 1.2)} ${n(x + 4.4)} ${n(y - 1.8)}" ` +
  `stroke="${GREY}" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;

/** A wilted flower, its head hanging and its petals grey, its foot at (x, y): grief. */
const wilted = (x: number, y: number) =>
  `<path d="M${x} ${y} Q${n(x - 0.4)} ${n(y - 6)} ${n(x + 2)} ${n(y - 6.6)} Q${n(x + 3.6)} ${n(y - 6.6)} ${n(x + 3.6)} ${n(y - 4.6)}" stroke="#8F9A6A" stroke-width="0.8" fill="none" stroke-linecap="round"/>` +
  `<circle cx="${n(x + 3)}" cy="${n(y - 3.4)}" r="1.1" fill="#A8A096"/><circle cx="${n(x + 4.4)}" cy="${n(y - 3.6)}" r="1.1" fill="#A8A096"/><circle cx="${n(x + 3.7)}" cy="${n(y - 2.4)}" r="1.1" fill="#9A9288"/>` +
  `<path d="M${n(x - 0.2)} ${n(y - 2.6)} Q${n(x - 2)} ${n(y - 2.6)} ${n(x - 2.6)} ${n(y - 1)}" stroke="#8F9A6A" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;

/** A heavy grey stone, its foot's middle at (x, y). */
const stone = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${y} Q${n(x - 5.4)} ${n(y - 4.6)} ${n(x - 1)} ${n(y - 5.4)} Q${n(x + 4.4)} ${n(y - 5.6)} ${n(x + 5)} ${y} Z" fill="#9A958C"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 4.4)} L${n(x - 0.6)} ${n(y - 2.6)} L${n(x + 0.8)} ${n(y - 2.2)}" stroke="#7E796F" stroke-width="0.4" fill="none"/>`;

/** Dry, unworked ground about (x, y), with a hoe left lying on it. */
const leftLying = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="7" ry="2" fill="#CDB68A"/>` +
  `<path d="M${n(x - 5)} ${n(y - 0.4)} L${n(x - 3)} ${n(y + 0.4)} M${n(x - 1)} ${n(y - 0.6)} L${n(x + 1)} ${n(y + 0.6)} M${n(x + 3)} ${n(y - 0.4)} L${n(x + 5)} ${n(y + 0.4)}" stroke="#B49C70" stroke-width="0.4"/>` +
  `<path d="M${n(x - 4.4)} ${n(y - 0.2)} L${n(x + 3.6)} ${n(y - 1.4)}" stroke="#8A5A33" stroke-width="0.7" stroke-linecap="round"/>` +
  `<path d="M${n(x + 3.4)} ${n(y - 1.4)} L${n(x + 4.6)} ${n(y - 1.6)} L${n(x + 4.8)} ${n(y + 0.2)} L${n(x + 3.8)} ${n(y + 0.4)} Z" fill="#7A7A7A"/>`;

// Refuge from worry. Anas said: the Prophet ﷺ used to say: O Allah, I seek refuge with You from worry and grief, from
// incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by
// men (Sahih al-Bukhari 6369). Nothing is drawn for Allah, and no one is drawn: by the masjid of Madinah and his home,
// his place, a golden ring, and Anas's place by it. Anas's voice speaks, and a faint line goes from Anas's place to
// his; his voice speaks, a spark rises from his place, and a soft golden ring comes about it. Off to the side, away from
// his place, grey things show one pair at a time and each fades to a trace: a grey tangle, worry, and a wilted flower,
// grief; a heavy stone by a small place that cannot move it, incapacity, and a hoe left lying on unworked ground,
// laziness; a grey place shrinking back behind a wall, cowardice, and a sack tied shut in a grey ring, miserliness; a
// heap of grey coins, debt, weighing down; and three grey places closing in on one, overpowering it. Then a soft golden
// glow comes about his place and his home, and glints.
function refugeFromWorry(): SignArt {
  const his: [number, number] = [36, 100.6];
  const anas: [number, number] = [47.4, 102.6];
  const worry: [number, number] = [68, 84];
  const grief: [number, number] = [76, 103];
  const heavy: [number, number] = [94, 88];
  const lazy: [number, number] = [100, 104];
  const behind: [number, number] = [119, 87];
  const shut: [number, number] = [126, 103.6];
  const debt: [number, number] = [143, 88.4];
  const one: [number, number] = [148, 102.6];
  const closing: [number, number, number, number][] = [
    [158, 97.6, 151.4, 100],
    [158.6, 106, 151.8, 104.6],
    [137.6, 107.4, 144, 104.8]
  ];
  return {
    kind: "refuge-from-worry",
    ms: 12000,
    parts: [
      ...daySky(26, 60, 12000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      { name: "his home", svg: home(40, 95, 11, 8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Anas ibn Malik's place", svg: someone(anas[0], anas[1], 1.5) },
      { name: "Anas's voice: he used to say", svg: arcs(n(anas[0] + 1.8), n(anas[1] - 3.2), "#A8783A"), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "Anas heard him: a faint line from Anas's place to his", svg: lookLine(n(anas[0] - 1.6), n(anas[1] - 1), n(his[0] + 2.6), n(his[1] - 0.8), 96.4, "#9A8A78"), keys: showAt(0.06, 0.08) },
      { name: "his voice: I seek refuge", svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.09, 0.1), loop: speaking },
      { name: "a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.6, "#FFE7A0"), keys: sparkRising(0.18, 0.24, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "refuge: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.4), 5.6, 2.4, GOLD), keys: showAt(0.21, 0.23), loop: soft },
      { name: "worry: a grey tangle", svg: tangle(worry[0], worry[1]), keys: fadedAfter(0.31, 0.32, 0.36, 0.38), loop: { move: "bob", ms: 1600, y: -0.4 } },
      { name: "grief: a wilted flower", svg: wilted(grief[0], grief[1]), keys: fadedAfter(0.33, 0.34, 0.36, 0.38) },
      { name: "incapacity: a heavy stone", svg: stone(heavy[0], heavy[1]), keys: fadedAfter(0.45, 0.46, 0.5, 0.52) },
      { name: "a small place by it that cannot move it", svg: someone(n(heavy[0] - 7.4), n(heavy[1] - 1.6), 1.3, GREY), keys: fadedAfter(0.45, 0.46, 0.5, 0.52) },
      { name: "laziness: a hoe left lying on unworked ground", svg: leftLying(lazy[0], lazy[1]), keys: fadedAfter(0.47, 0.48, 0.5, 0.52) },
      {
        name: "cowardice: a grey place shrinking back behind a wall",
        svg: someone(n(behind[0] + 2), n(behind[1] + 4), 1.4, GREY),
        keys: track({
          opacity: [
            [0.585, 0],
            [0.595, 1],
            [0.64, 1],
            [0.66, 0.35]
          ],
          xy: [
            [0.6, 0, 0],
            [0.625, -2, -7.4]
          ]
        })
      },
      { name: "a wall", svg: wall(n(behind[0] - 6), n(behind[0] + 6), behind[1], 3.4), keys: fadedAfter(0.58, 0.59, 0.64, 0.66) },
      { name: "miserliness: a sack tied shut", svg: sack(shut[0], shut[1], 0.9, "#B09A78"), keys: fadedAfter(0.62, 0.63, 0.645, 0.66) },
      { name: "held back: a grey ring about the sack", svg: greyRing(shut[0], n(shut[1] - 2.6), 4.4, 4), keys: fadedAfter(0.63, 0.64, 0.645, 0.66) },
      { name: "debt: a heap of grey coins", svg: coins(n(debt[0] - 2.6), debt[1], 5, "#B8B4AC", "#8C8880") + coins(n(debt[0] + 2.4), debt[1], 7, "#B8B4AC", "#8C8880"), keys: fadedAfter(0.73, 0.75, 0.78, 0.8) },
      { name: "heavily: a grey ring weighing about the coins", svg: greyRing(debt[0], n(debt[1] - 3.6), 6, 5), keys: fadedAfter(0.76, 0.77, 0.78, 0.8) },
      { name: "a place that is overpowered", svg: someone(one[0], one[1], 1.5), keys: fadedAfter(0.865, 0.875, 0.905, 0.915) },
      ...closing.map(
        ([x, y, tx, ty], i): SignPart => ({
          name: `a grey place closing in ${i + 1}`,
          svg: someone(x, y, 1.5, GREY),
          keys: track({
            opacity: [
              [0.865, 0],
              [0.875, 1],
              [0.905, 1],
              [0.915, 0.35]
            ],
            xy: [
              [0.875, 0, 0],
              [0.9, n(tx - x), n(ty - y)]
            ]
          })
        })
      ),
      { name: "a soft golden glow about his place and his home", svg: wash(38, 97.6, 13, 7, WARM, 0.14), keys: showAt(0.92, 0.935), loop: soft },
      {
        name: "glints over his home",
        svg: glints(
          [
            [32.4, 93],
            [46.6, 85],
            [40.8, 96.6]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.94, 0.95),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Anas: he used to say:", from: 0.02, to: 0.145 },
      { text: "O Allah, I seek refuge with You", from: 0.16, to: 0.285 },
      { text: "from worry and grief,", from: 0.3, to: 0.425 },
      { text: "from incapacity and laziness,", from: 0.44, to: 0.565 },
      { text: "from cowardice and miserliness,", from: 0.58, to: 0.705 },
      { text: "from being heavily in debt,", from: 0.72, to: 0.845 },
      { text: "and from being overpowered by men", from: 0.86, to: 1 }
    ]
  };
}

/** A little masjid with its dome and minaret, its foot's middle at (x, y). */
const littleMasjid = (x: number, y: number) =>
  `<rect x="${n(x - 5)}" y="${n(y - 5)}" width="10" height="5" fill="#EFE2C2"/>` +
  `<path d="M${n(x - 3)} ${n(y - 5)} Q${x} ${n(y - 9.6)} ${n(x + 3)} ${n(y - 5)} Z" fill="#7FB07A"/>` +
  `<rect x="${n(x + 5.4)}" y="${n(y - 10)}" width="1.5" height="10" fill="#E6D6B2"/><path d="M${n(x + 5.2)} ${n(y - 10)} L${n(x + 6.15)} ${n(y - 11.6)} L${n(x + 7.1)} ${n(y - 10)} Z" fill="#7FB07A"/>`;

/** The window of a home (trialArt.ts) whose foot's middle is at (x, y) and `h` high, lit. */
const litWindowOf = (x: number, y: number, h: number) => {
  const [wx, wy] = [n(x + 2), n(y - h + 2.4)];
  return `${glow(n(wx + 1.3), n(wy + 1.3), 4, "#FFD866", 0.22)}<rect x="${wx}" y="${wy}" width="2.6" height="2.6" fill="#FFD866"/>`;
};

// Married for four. Abu Hurairah said that the Prophet ﷺ said: a woman is married for four things: her wealth, her
// family status, her beauty and her religion; so marry the one with religion, may your hands be in the dust (Sahih
// al-Bukhari 5090). No one is drawn: by the masjid of Madinah, his place, a golden ring; his voice speaks. Four homes
// stand along a lane, and a faint ring shows over each, one by one: four. By the first, a heap of gold coins shows,
// with glints: wealth. The second, a fine home among the homes of its kin, a soft light comes about them: family
// status. Flowers come out before the third: beauty. A light shows in the window of the fourth, by a little masjid, and
// a spark rises from it: religion. Then a place sets out along the lane, past the first three, to the fourth; a golden
// ring comes about the fourth home, a warm glow about the place, and glints.
function marriedForFour(): SignArt {
  const his: [number, number] = [30, 100];
  const homes: [number, number, number, number][] = [
    [54, 95, 11, 8],
    [84, 95, 14, 10.4],
    [112, 95, 11, 8],
    [140, 95, 11, 8]
  ];
  const seeker: [number, number] = [42, 104.6];
  const at4: [number, number] = [137.6, 104];
  const flowers: [number, number, string][] = [
    [106, 101.4, "#F28CB8"],
    [110.4, 102.4, "#F2A93B"],
    [115, 101.6, "#E85A6A"],
    [119, 102.6, "#F28CB8"]
  ];
  return {
    kind: "married-for-four",
    ms: 9000,
    parts: [
      ...daySky(110, 46, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the lane", svg: ROAD },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      { name: "the homes of its kin about the second home", svg: home(73.6, 93, 8, 6, "#CFA574", "#B98C5E") + home(94.4, 93, 8, 6, "#CFA574", "#B98C5E") },
      ...homes.map(([x, y, w, h], i): SignPart => ({ name: `a home on the lane ${i + 1}`, svg: home(x, y, w, h, i === 1 ? "#E0BC86" : "#D3A872") })),
      { name: "a little masjid by the fourth home", svg: littleMasjid(151.4, 95) },
      ...palms([[41, 92, 11]]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: married for four", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      ...homes.map(
        ([x, y, , h], i): SignPart => ({
          name: `four: a faint ring over a home ${i + 1}`,
          svg: faintRing(x, n(y - h - 6), 2.4, "#FFFFFF"),
          keys: showAt(at3(0.08 + i * 0.03), at3(0.09 + i * 0.03)),
          loop: soft
        })
      ),
      { name: "wealth: a heap of gold coins by the first home", svg: goldHeap(n(homes[0][0] + 9.4), 99.6, 0.9), keys: showAt(0.27, 0.29) },
      { name: "glints over the gold", svg: glints([[n(homes[0][0] + 11.6), 94], [n(homes[0][0] + 7.4), 95.4]], 0.9, "#FFF0B8"), keys: showAt(0.3, 0.31), loop: twinkle(1200) },
      { name: "family status: a soft light about the fine home and its kin", svg: wash(84, 89, 20, 8, "#FFF3C0", 0.2), keys: showAt(0.36, 0.38), loop: soft },
      ...flowers.map(
        ([x, y, petal], i): SignPart => ({
          name: `beauty: a flower before the third home ${i + 1}`,
          svg: bigger(x, y, 0.62, flower(x, y, petal, 5)),
          origin: { x, y },
          keys: track({
            opacity: [
              [at3(0.51 + i * 0.01), 0],
              [at3(0.525 + i * 0.01), 1]
            ],
            scale: [
              [at3(0.51 + i * 0.01), 0.3],
              [at3(0.54 + i * 0.01), 1]
            ]
          })
        })
      ),
      { name: "religion: a light in the window of the fourth home", svg: litWindowOf(homes[3][0], homes[3][1], homes[3][3]), keys: showAt(0.6, 0.62) },
      { name: "a spark rising from the fourth home", svg: sparkle(n(homes[3][0] - 1.8), 89, 1.6, "#FFE7A0"), keys: sparkRising(0.62, 0.68, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "a place setting out along the lane to the fourth home",
        svg: someone(seeker[0], seeker[1], 1.5),
        keys: track({
          xy: [
            [0.75, 0, 0],
            [0.85, n(at4[0] - seeker[0]), n(at4[1] - seeker[1])]
          ]
        })
      },
      { name: "a golden ring about the fourth home", svg: care(homes[3][0], n(homes[3][1] - 3.6), 10, 7.4, GOLD), keys: showAt(0.86, 0.88), loop: soft },
      { name: "a warm glow about the place at the fourth home", svg: glow(at4[0], at4[1], 5, WARM, 0.32), keys: showAt(0.9, 0.92) },
      {
        name: "glints over the fourth home",
        svg: glints(
          [
            [n(homes[3][0] - 7), 84.6],
            [n(homes[3][0] + 6.6), 86.2],
            [n(at4[0] + 2.4), n(at4[1] - 4.4)]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.94, 0.95),
        loop: twinkle()
      }
    ],
    words: [
      { text: "He said: a woman is married for four:", from: 0.02, to: 0.245 },
      { text: "her wealth, her family status,", from: 0.26, to: 0.485 },
      { text: "her beauty and her religion", from: 0.5, to: 0.725 },
      { text: "So marry the religious woman", from: 0.74, to: 1 }
    ]
  };
}

/** A dashed round ring about (x, y), `r` across, in `color`. */
const round = (x: number, y: number, r: number, color: string) =>
  `<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" stroke-width="0.7" stroke-dasharray="1.4 1.1" fill="none"/>`;

/** A walking staff leaning by (x, y), its foot there. */
const staff = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x + 1.4)} ${n(y - 8)} Q${n(x + 1.8)} ${n(y - 9.6)} ${n(x + 3)} ${n(y - 9)}" stroke="#8A5A33" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;

// Sawdah gave her day. Aishah said: I never saw a woman I would love more to be like than Sawdah bint Zam'ah, a woman
// of spirit. When she grew old, she gave her day with the Messenger of Allah ﷺ to Aishah; she said: O Messenger of
// Allah, I have given my day with you to Aishah. So the Messenger of Allah ﷺ gave Aishah two days, her own day and
// Sawdah's day (Sahih Muslim 1463, 1463b). No one is drawn: by the masjid of Madinah, his place, a golden ring, and the
// homes of his wives along its side. Aishah's place is by her home, and Sawdah's by hers. Aishah's voice speaks, and a
// faint line goes from Aishah's place to Sawdah's; a soft golden ring and a warm glow come about Sawdah's place. A soft
// white glow comes about it, and a walking staff by it: grown old. Over Sawdah's home, her day, a small light, shows,
// and goes over to Aishah's home, with glints. A faint golden line goes from his place to Aishah's home, and her own
// day shows by the other: two days. A ring comes about each day, glints, and a warm glow about Sawdah's place.
function sawdahGaveHerDay(): SignArt {
  const his: [number, number] = [21, 100.4];
  const aishahHome: [number, number] = [46, 95];
  const sawdahHome: [number, number] = [64, 95];
  const aishah: [number, number] = [43.2, 101.8];
  const sawdah: [number, number] = [67.4, 101.8];
  const sawdahDay: [number, number] = [sawdahHome[0], 80.6];
  const givenTo: [number, number] = [50, 80.6];
  const ownDay: [number, number] = [42, 80.6];
  return {
    kind: "sawdah-gave-her-day",
    ms: 12000,
    parts: [
      ...daySky(132, 96, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 96, 0.6) },
      { name: "Aishah's home", svg: home(aishahHome[0], aishahHome[1], 12, 8.4) },
      { name: "Sawdah's home", svg: home(sawdahHome[0], sawdahHome[1], 12, 8.4) },
      { name: "the homes of his other wives", svg: home(82, 95, 12, 8.4) + home(100, 95, 12, 8.4) },
      ...palms([
        [118, 93, 12],
        [146, 94, 14]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5) },
      { name: "Sawdah bint Zam'ah's place", svg: someone(sawdah[0], sawdah[1], 1.5) },
      { name: "Aishah's voice: I never saw one I'd love to be like", svg: arcsLeft(n(aishah[0] - 1.8), n(aishah[1] - 3.2), "#A8783A"), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "a faint line from Aishah's place to Sawdah's", svg: lookLine(n(aishah[0] + 1.6), n(aishah[1] - 1), n(sawdah[0] - 1.6), n(sawdah[1] - 1), 96.4, "#B8924E"), keys: showAt(0.07, 0.09) },
      { name: "a soft golden ring about Sawdah's place", svg: care(sawdah[0], n(sawdah[1] + 0.4), 3, 1.6, SOFT_GOLD), keys: showAt(0.2, 0.22), loop: soft },
      { name: "a warm glow about Sawdah's place", svg: glow(sawdah[0], sawdah[1], 5, WARM, 0.28), keys: showAt(0.25, 0.27) },
      { name: "grown old: a soft white glow about Sawdah's place", svg: wash(sawdah[0], n(sawdah[1] - 0.6), 5.6, 4, "#FFFFFF", 0.22), keys: showAt(0.37, 0.4) },
      { name: "a walking staff by Sawdah's place", svg: staff(n(sawdah[0] + 2.8), n(sawdah[1] + 1.4)), keys: showAt(0.41, 0.43) },
      {
        name: "Sawdah's day: a small light over her home, going over to Aishah's",
        svg: `${glow(sawdahDay[0], sawdahDay[1], 4.6, "#FFF0B8", 0.2)}${dayLit(sawdahDay[0], sawdahDay[1])}`,
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1]
          ],
          xy: [
            [0.54, 0, 0],
            [0.6, n(givenTo[0] - sawdahDay[0]), 0]
          ]
        }),
        loop: soft
      },
      { name: "glints as it comes over Aishah's home", svg: glints([[n(givenTo[0] + 3.6), 76.4], [n(givenTo[0] - 1), 75.4]], 0.9, "#FFD866"), keys: showAt(0.605, 0.615), loop: twinkle(1200) },
      { name: "a faint golden line from his place to Aishah's home", svg: lookLine(n(his[0] + 2.4), n(his[1] - 1), n(aishahHome[0] - 3.6), n(aishahHome[1] + 3.6), 92.4), keys: showAt(0.69, 0.71) },
      { name: "Aishah's own day: a small light over her home", svg: `${glow(ownDay[0], ownDay[1], 4.6, "#FFF0B8", 0.2)}${dayLit(ownDay[0], ownDay[1])}`, keys: showAt(0.73, 0.74), loop: soft },
      { name: "her own day: a golden ring about it", svg: round(ownDay[0], ownDay[1], 4.2, GOLD), keys: showAt(0.855, 0.865) },
      { name: "and Sawdah's day: a golden ring about it", svg: round(givenTo[0], givenTo[1], 4.2, GOLD), keys: showAt(0.89, 0.9) },
      {
        name: "glints over the two days",
        svg: glints(
          [
            [n(ownDay[0] - 5.4), 76.6],
            [n(givenTo[0] + 5.4), 77.2],
            [46, 74.4]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.92, 0.93),
        loop: twinkle()
      },
      { name: "a warm glow about Sawdah's place, who gave", svg: glow(sawdah[0], sawdah[1], 5.6, WARM, 0.34), keys: showAt(0.94, 0.955) }
    ],
    words: [
      { text: "Aishah: I never saw a woman I'd love", from: 0.02, to: 0.17 },
      { text: "to be like more than Sawdah bint Zam'ah", from: 0.185, to: 0.335 },
      { text: "When Sawdah grew old,", from: 0.35, to: 0.5 },
      { text: "she gave her day to Aishah", from: 0.515, to: 0.665 },
      { text: "So he gave Aishah two days:", from: 0.68, to: 0.83 },
      { text: "her own day and Sawdah's day", from: 0.845, to: 1 }
    ]
  };
}

/** A rose bush, its foot's middle at (x, y): leaves on stems, with one sharp grey thorn on its left. */
const roseBush = (x: number, y: number) =>
  `<path d="M${n(x - 7)} ${y} Q${n(x - 7.6)} ${n(y - 7)} ${x} ${n(y - 8.4)} Q${n(x + 7.6)} ${n(y - 7)} ${n(x + 7)} ${y} Z" fill="#5E9A48"/>` +
  `<path d="M${n(x - 4)} ${n(y - 2)} Q${n(x - 2)} ${n(y - 5)} ${n(x - 3)} ${n(y - 7)} M${n(x + 3)} ${n(y - 2)} Q${n(x + 2)} ${n(y - 5)} ${n(x + 3.6)} ${n(y - 7)}" stroke="#4A7F38" stroke-width="0.5" fill="none"/>` +
  `<path d="M${n(x - 6.8)} ${n(y - 3.6)} L${n(x - 9.4)} ${n(y - 4.6)} L${n(x - 6.8)} ${n(y - 2.6)} Z" fill="#7A7A72"/>`;

/** Roses opening on a bush whose foot's middle is at (x, y). */
const roses = (x: number, y: number) =>
  [
    [-3.4, -6.4],
    [0.4, -7.8],
    [3.6, -5.6],
    [-0.8, -3.8],
    [4.6, -2.4]
  ]
    .map(
      ([dx, dy]) =>
        `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="1.3" fill="#E85A7A"/><circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="0.55" fill="#B83A5A"/>`
    )
    .join("");

// Another will please. Abu Hurairah said that the Messenger of Allah ﷺ said: a believing man should not hate a
// believing woman; if he dislikes one of her traits, he will be pleased with another (Sahih Muslim 1468b). No one is
// drawn: by the masjid of Madinah, his place, a golden ring; his voice speaks, and a faint golden line goes from it
// toward a home. By the home are two places, the two of it, and a soft golden ring comes about the first, for its faith,
// then about the second, for its faith, and a warm glow about both. By the home, a rose bush with a sharp thorn: a grey
// ring comes about the thorn, the one trait disliked, and a faint line goes to it from the first place. Then roses open
// all over the bush, the grey ring fades, glints show over the roses, and a warm glow comes about the first place.
function pleasedWithAnother(): SignArt {
  const his: [number, number] = [30, 100];
  const homeAt: [number, number] = [100, 95];
  const first: [number, number] = [89.6, 102.4];
  const second: [number, number] = [101.6, 102.8];
  const bush: [number, number] = [126, 102.6];
  const thorn: [number, number] = [n(bush[0] - 8.2), n(bush[1] - 3.8)];
  return {
    kind: "pleased-with-another",
    ms: 9000,
    parts: [
      ...daySky(116, 52, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      { name: "a home", svg: home(homeAt[0], homeAt[1], 16, 11) },
      { name: "a garden ground by the home", svg: `<ellipse cx="${n(bush[0] + 1)}" cy="${n(bush[1] + 0.6)}" rx="12" ry="2.4" fill="#C9D79A"/>` },
      { name: "a rose bush", svg: roseBush(bush[0], bush[1]), origin: { x: bush[0], y: bush[1] }, loop: { move: "sway", ms: 5600, angle: 1 } },
      ...palms([
        [60, 93, 12],
        [148, 93, 13]
      ]),
      { name: "the first of the two in the home", svg: someone(first[0], first[1], 1.5) },
      { name: "the second of the two in the home", svg: someone(second[0], second[1], 1.5) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: should not hate", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "a faint golden line from his place toward the home", svg: lookLine(n(his[0] + 3), n(his[1] - 1), n(first[0] - 2.4), n(first[1] - 1.2), 92), keys: showAt(0.06, 0.08) },
      { name: "faith: a soft golden ring about the first place", svg: care(first[0], n(first[1] + 0.4), 3, 1.6, SOFT_GOLD), keys: showAt(0.12, 0.14), loop: soft },
      { name: "faith: a soft golden ring about the second place", svg: care(second[0], n(second[1] + 0.4), 3, 1.6, SOFT_GOLD), keys: showAt(0.27, 0.29), loop: soft },
      { name: "a warm glow about the two", svg: wash(n((first[0] + second[0]) / 2), n(first[1] - 0.6), 10, 4.4, WARM, 0.16), keys: showAt(0.36, 0.38) },
      {
        name: "one trait disliked: a grey ring about the thorn",
        svg: greyRing(thorn[0], thorn[1], 2.6, 2),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.54, 1],
            [0.8, 1],
            [0.83, 0.35]
          ]
        })
      },
      { name: "a faint line from the first place to the thorn", svg: lookLine(n(first[0] + 1.6), n(first[1] - 1.2), n(thorn[0] - 2), n(thorn[1] + 0.6), 93.6, "#9A8A78"), keys: showFor(0.56, 0.58, 0.8, 0.83) },
      {
        name: "another pleases: roses opening on the bush",
        svg: roses(bush[0], bush[1]),
        origin: { x: bush[0], y: n(bush[1] - 5) },
        keys: track({
          opacity: [
            [0.76, 0],
            [0.78, 1]
          ],
          scale: [
            [0.76, 0.4],
            [0.8, 1]
          ]
        })
      },
      {
        name: "glints over the roses",
        svg: glints(
          [
            [n(bush[0] - 5.4), n(bush[1] - 11)],
            [n(bush[0] + 5.6), n(bush[1] - 10.4)],
            [n(bush[0] + 0.6), n(bush[1] - 12.6)]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.84, 0.85),
        loop: twinkle()
      },
      { name: "pleased: a warm glow about the first place", svg: glow(first[0], first[1], 5, WARM, 0.32), keys: showAt(0.88, 0.9) }
    ],
    words: [
      { text: "He said: a believing man should not hate", from: 0.02, to: 0.245 },
      { text: "a believing woman;", from: 0.26, to: 0.485 },
      { text: "if the man dislikes one of her traits,", from: 0.5, to: 0.725 },
      { text: "another will please him", from: 0.74, to: 1 }
    ]
  };
}

/** A wide pale plain over the whole scene: the Day. */
const PLAIN = `<rect width="160" height="120" fill="#EEE8F0"/><rect y="70" width="160" height="50" fill="#E6DECD"/><path d="M0 70 L160 70" stroke="#D6CCB8" stroke-width="0.6"/>`;

/** An old home broken down: low walls with broken tops, and stones about it, its foot's middle at (x, y). */
const ruin = (x: number, y: number) =>
  `<path d="M${n(x - 3.6)} ${y} L${n(x - 3.6)} ${n(y - 3)} L${n(x - 2.2)} ${n(y - 4.2)} L${n(x - 1.2)} ${n(y - 2.2)} L${n(x + 0.6)} ${n(y - 3.4)} L${n(x + 1.4)} ${n(y - 1.4)} L${n(x + 3.2)} ${n(y - 2.4)} L${n(x + 3.6)} ${y} Z" fill="#B9A88A"/>` +
  `<ellipse cx="${n(x + 4.8)}" cy="${n(y - 0.3)}" rx="0.9" ry="0.5" fill="#A8977A"/><ellipse cx="${n(x - 4.6)}" cy="${n(y - 0.2)}" rx="0.7" ry="0.4" fill="#A8977A"/>`;

// Beware of wrongdoing. Jabir ibn Abdullah said that the Messenger of Allah ﷺ said: beware of wrongdoing, for
// wrongdoing is darkness on the Day of Resurrection; and beware of stinginess, for stinginess destroyed those who were
// before you (Sahih Muslim 2578). No one is drawn: by the masjid of Madinah, his place, a golden ring; his voice speaks.
// A grey place goes to a small home and takes the sack by its door, and a grey ring comes about it; a dark haze comes
// about the wrongdoer, deepening. A wide pale plain comes over the whole scene, the Day, and on it only the wrongdoer
// shows, in its darkness; then the plain lifts. By another home a full sack stands tied shut, and a place in need comes
// with an empty dish; a grey ring comes about the sack, held back, and about the place that keeps it. Far off, in a pale
// light, the homes of those before fall to ruins in a grey haze, and their faded places are gone.
function bewareOfWrongdoing(): SignArt {
  const his: [number, number] = [30, 100];
  const small: [number, number] = [62, 95];
  const takenFrom: [number, number] = [66.4, 99.6];
  const wrongFrom: [number, number] = [84, 104];
  const wrongAt: [number, number] = [70.6, 101.4];
  const wrongEnd: [number, number] = [86, 104.6];
  const keeper: [number, number] = [118, 101.4];
  const keptSack: [number, number] = [124, 100.4];
  const needFrom: [number, number] = [158, 104];
  const needAt: [number, number] = [134, 103.4];
  const old: [number, number, number, number][] = [
    [104, 76.4, 8, 6],
    [116, 75, 9, 6.6],
    [129, 76.6, 8, 6],
    [141, 75.4, 7.4, 5.6]
  ];
  const oldPlaces: [number, number][] = [
    [108.6, 79],
    [121, 78.4],
    [133.6, 79.2],
    [145.4, 78.6]
  ];
  const faded = "#9A8A78";
  const sackFrom: [number, number] = [n(takenFrom[0]), n(takenFrom[1])];
  return {
    kind: "beware-of-wrongdoing",
    ms: 12000,
    parts: [
      ...daySky(26, 70, 12000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      { name: "long ago: a pale light over the far homes", svg: wash(124, 75, 28, 7, "#FFFFFF", 0.14) },
      ...old.map(
        ([x, y, w, h], i): SignPart => ({
          name: `a home of those before ${i + 1}`,
          svg: home(x, y, w, h, "#D9C4A2", "#C9B08A", "#8A7458"),
          keys: track({
            opacity: [
              [0.83, 1],
              [0.86, 0]
            ]
          })
        })
      ),
      ...old.map(([x, y], i): SignPart => ({ name: `destroyed: a broken home ${i + 1}`, svg: ruin(x, y), keys: showAt(0.83, 0.86) })),
      {
        name: "the faded places of those before",
        svg: oldPlaces.map(([x, y]) => someone(x, y, 1.1, faded)).join(""),
        keys: track({
          opacity: [
            [0.86, 1],
            [0.88, 0]
          ]
        })
      },
      { name: "destroyed: a grey haze over the broken homes", svg: wash(124, 75, 24, 6, GREY, 0.16), keys: showAt(0.88, 0.9) },
      { name: "a small home", svg: home(small[0], small[1], 10, 7.4) },
      { name: "the place of the small home", svg: someone(56.4, 101.8, 1.5) },
      { name: "another home", svg: home(122, 94.4, 12, 9) },
      ...palms([
        [44, 92, 11],
        [150, 93, 13]
      ]),
      { name: "a full sack by the other home, tied shut", svg: sack(keptSack[0], keptSack[1], 1.1) },
      { name: "the place that keeps the sack", svg: someone(keeper[0], keeper[1], 1.5) },
      {
        name: "a place in need coming with an empty dish",
        svg: someone(needFrom[0], needFrom[1], 1.5) + dish(n(needFrom[0] + 4), n(needFrom[1] + 1.4)),
        keys: track({
          xy: [
            [0.62, 0, 0],
            [0.66, n(needAt[0] - needFrom[0]), n(needAt[1] - needFrom[1])]
          ]
        })
      },
      { name: "held back: a grey ring about the sack", svg: greyRing(keptSack[0], n(keptSack[1] - 3), 4.8, 4.4), keys: showAt(0.68, 0.7) },
      { name: "stingy: a grey ring about the place that keeps it", svg: greyRing(keeper[0], n(keeper[1] + 0.4), 3.2, 1.7), keys: showAt(0.71, 0.72) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: beware", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "the Day of Resurrection: a wide pale plain over the whole scene", svg: PLAIN, keys: showFor(0.42, 0.45, 0.52, 0.55) },
      {
        name: "the sack by the small home, taken",
        svg: sack(sackFrom[0], sackFrom[1], 0.8),
        keys: track({
          xy: [
            [0.1, 0, 0],
            [0.14, n(wrongEnd[0] - 3.6 - sackFrom[0]), n(wrongEnd[1] + 0.2 - sackFrom[1])]
          ],
          opacity: [
            [0.42, 1],
            [0.45, 0],
            [0.52, 0],
            [0.55, 1]
          ]
        })
      },
      {
        name: "the wrongdoer: a grey place, going to the small home and taking its sack",
        svg: someone(wrongFrom[0], wrongFrom[1], 1.5, GREY),
        keys: track({
          xy: [
            [0.06, 0, 0],
            [0.09, n(wrongAt[0] - wrongFrom[0]), n(wrongAt[1] - wrongFrom[1])],
            [0.1, n(wrongAt[0] - wrongFrom[0]), n(wrongAt[1] - wrongFrom[1])],
            [0.14, n(wrongEnd[0] - wrongFrom[0]), n(wrongEnd[1] - wrongFrom[1])]
          ]
        })
      },
      { name: "wrongdoing: a grey ring about the wrongdoer", svg: greyRing(wrongEnd[0], n(wrongEnd[1] + 0.4), 3.2, 1.7), keys: showAt(0.145, 0.155) },
      { name: "darkness: a dark haze about the wrongdoer", svg: wash(wrongEnd[0], n(wrongEnd[1] - 1), 7, 5, DARK, 0.16), keys: showAt(0.23, 0.27) },
      { name: "deeper darkness about it", svg: wash(wrongEnd[0], n(wrongEnd[1] - 1), 5, 3.6, DARK, 0.2), keys: showAt(0.3, 0.33) }
    ],
    words: [
      { text: "He said: beware of wrongdoing,", from: 0.02, to: 0.2 },
      { text: "for wrongdoing is darkness", from: 0.215, to: 0.395 },
      { text: "on the Day of Resurrection", from: 0.41, to: 0.59 },
      { text: "and beware of stinginess,", from: 0.605, to: 0.785 },
      { text: "for stinginess destroyed those before you", from: 0.8, to: 1 }
    ]
  };
}

export const REFUGE_ART = {
  "health-and-free-time": healthAndFreeTime,
  "sincere-to-every-muslim": sincereToEveryMuslim,
  "refuge-from-worry": refugeFromWorry,
  "married-for-four": marriedForFour,
  "sawdah-gave-her-day": sawdahGaveHerDay,
  "pleased-with-another": pleasedWithAnother,
  "beware-of-wrongdoing": bewareOfWrongdoing
};
