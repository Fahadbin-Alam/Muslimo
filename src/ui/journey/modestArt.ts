import { cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, SEVEN, SIX, sparkStays, twinkle } from "./shareArt";
import { farHills, insideTheMasjid } from "./wideArt";
import { coins } from "./tradeArt";

/**
 * Modest ways: the ground made level once, where one prostrates; the son of Adam growing old, and two growing old
 * with him; help and provision through the poor; the Companions at work, and told to bathe; Ibn Umar inside the
 * Ka'bah, praying where he ﷺ prayed; and the Ansar's followers, counted as from them. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn,
 * and nothing comes down from the sky: what is good is a light, glints, a soft golden ring and sparks that rise. No
 * name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.33],
  [0.346, 0.656],
  [0.672, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of five lines. */
const FIVE = [
  [0.02, 0.2],
  [0.216, 0.396],
  [0.412, 0.592],
  [0.608, 0.788],
  [0.804, 1]
] as const;

/** Mu'ayqib's place and voice: a violet. */
const MUAYQIB = "#6E5E8E";
/** The places of those in the row: a sand brown. */
const IN_THE_ROW = "#A08A6A";
/** The place of the one who levels the ground: a warm brown. */
const LEVELING = "#8A6A4E";
/** Anas's place and voice: an olive. */
const ANAS = "#6E7E4E";
/** The place of one, young: a warm brown. */
const YOUNG = "#A0764E";
/** The place of one, grown old: a grey. */
const OLD = "#9A948C";
/** Mus'ab's place and voice: a slate blue. */
const MUSAB = "#5E6E9A";
/** Sa'd's place: a deep brown. */
const SAAD = "#7A5A3E";
/** The places of the poor: a sand grey. */
const POOR = "#9A8A6E";
/** A pale ring: a pale yellow. */
const PALE = "#E9D77E";
/** Aishah's place and voice: a plum. */
const AISHAH = "#9A5E7A";
/** The places of those at work: a clay brown. */
const AT_WORK = "#8E6A48";
/** Nafi's place and voice: a sea blue. */
const NAFI = "#4E7A8A";
/** Ibn Umar's place: a deep green. */
const IBN_UMAR = "#3E6E5E";
/** Bilal's place and voice: a dark brown. */
const BILAL = "#5A4A3A";
/** Zayd's place and voice: a violet brown. */
const ZAYD = "#7A5E8E";
/** The Ansar's places and voice: a teal green. */
const ANSAR = "#4E7A6A";
/** The places of their followers: a warm sand. */
const FOLLOWERS = "#A0825E";
/** A soft light: a warm white. */
const WARM = "#FFF1C8";

/** A thousandth: times written as the sum of two are kept exact. */
const at3 = (time: number) => Math.round(time * 1000) / 1000;

/** A voice that speaks from `on` until `off`, for each pair. */
const voice = (spans: [number, number][]) =>
  track({
    opacity: spans.flatMap(([on, off]): [number, number][] => [
      [on, 0],
      [at3(on + 0.006), 1],
      [off, 1],
      [at3(off + 0.006), 0]
    ])
  });

/** Small pebbles of the floor, one at each of `list`. */
const pebbles = (list: [number, number][]) =>
  list.map(([x, y]) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="0.75" ry="0.45" fill="#B9A688" stroke="#9A876A" stroke-width="0.2"/>`).join("");

/** A year: a small sun, its middle at (x, y). */
const aYear = (x: number, y: number) => glow(x, y, 3.6, "#FFF0C0", 0.22) + `<circle cx="${x}" cy="${y}" r="2" fill="#FFD95E" stroke="#E0A83A" stroke-width="0.3"/>`;

/** A staff, leaning, its foot at (x, y): a long thin stick with a crook at its top. */
const staff = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x + 1.4)} ${n(y - 10)} Q${n(x + 2)} ${n(y - 12)} ${n(x + 3.2)} ${n(y - 11.2)}" stroke="#7A5232" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;

/** A low rise of the ground, its foot's middle at (x, y), `w` wide and `h` high. */
const rise = (x: number, y: number, w: number, h: number) => `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - h * 2)} ${n(x + w / 2)} ${y} Z" fill="#D8BE8C"/>`;

/** A well of stones, its foot's middle at (x, y), behind what goes down into it: its frame of wood and its dark opening. */
const wellBack = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${n(y - 5)} L${n(x - 4.4)} ${n(y - 15)} M${n(x + 4.4)} ${n(y - 5)} L${n(x + 4.4)} ${n(y - 15)} M${n(x - 5.4)} ${n(y - 15)} L${n(x + 5.4)} ${n(y - 15)}" stroke="#7A5232" stroke-width="0.9" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y - 5)}" rx="5" ry="1.4" fill="#4A3C2C" stroke="#8C7C64" stroke-width="0.6"/>`;

/** The same well in front of what goes down into it: its round wall of stones, up to the near half of its rim. */
const wellFront = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 5)} L${n(x - 5)} ${y} Q${x} ${n(y + 1.6)} ${n(x + 5)} ${y} L${n(x + 5)} ${n(y - 5)} A5 1.4 0 0 1 ${n(x - 5)} ${n(y - 5)} Z" fill="#A89880"/>` +
  `<path d="M${n(x - 5)} ${n(y - 2.2)} Q${x} ${n(y - 0.8)} ${n(x + 5)} ${n(y - 2.2)} M${n(x - 2)} ${n(y - 3.4)} L${n(x - 2)} ${n(y - 1.7)} M${n(x + 2.4)} ${n(y - 1.6)} L${n(x + 2.4)} ${n(y + 0.4)}" stroke="#8C7C64" stroke-width="0.4" fill="none"/>` +
  `<path d="M${n(x - 5)} ${n(y - 5)} A5 1.4 0 0 0 ${n(x + 5)} ${n(y - 5)}" stroke="#8C7C64" stroke-width="0.6" fill="none"/>`;

/** A bucket of wood with its handle, empty, its foot's middle at (x, y). */
const pail = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${n(y - 3.4)} L${n(x + 2.2)} ${n(y - 3.4)} L${n(x + 1.7)} ${y} L${n(x - 1.7)} ${y} Z" fill="#7E5A36"/>` +
  `<path d="M${n(x - 2)} ${n(y - 3.4)} Q${x} ${n(y - 6.4)} ${n(x + 2)} ${n(y - 3.4)}" stroke="#4E3420" stroke-width="0.4" fill="none"/>`;

/** The water in that bucket, at its brim. */
const pailWater = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 3.4)}" rx="2.2" ry="0.6" fill="#5EB1E4"/>`;

/** A long low trough of wood, its foot's middle at (x, y). */
const trough = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 2.4)} L${n(x + 5)} ${n(y - 2.4)} L${n(x + 4.2)} ${y} L${n(x - 4.2)} ${y} Z" fill="#8A6440"/>`;

/** The water in the trough whose foot's middle is at (x, y). */
const troughWater = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 2.4)}" rx="4.6" ry="0.6" fill="#6FB8E0"/>`;

/** A furrow in the field, its middle at (x, y), `w` wide. */
const furrow = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - 1)} ${n(x + w / 2)} ${y}" stroke="#7E5E3A" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;

/** An empty basket, its foot's middle at (x, y). */
const emptyBasket = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y - 4)} L${n(x + 4)} ${n(y - 4)} L${n(x + 3)} ${y} L${n(x - 3)} ${y} Z" fill="#B88A4A"/>` +
  `<path d="M${n(x - 3.6)} ${n(y - 2.6)} L${n(x + 3.6)} ${n(y - 2.6)} M${n(x - 3.3)} ${n(y - 1.3)} L${n(x + 3.3)} ${n(y - 1.3)}" stroke="#946A34" stroke-width="0.4"/>`;

/** A cluster of dates, hanging from a palm's crown at (x, y). */
const dateCluster = (x: number, y: number) =>
  [-1.2, 0, 1.2, -0.6, 0.6].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + (i < 3 ? 0 : 1.2))}" rx="0.8" ry="0.65" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`).join("");

/** The smell of sweat rising from (x, y): three faint wavy lines. */
const smell = (x: number, y: number) =>
  [-1.5, 0, 1.5]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 7 - (i % 2));
      return `<path d="M${sx} ${y} Q${n(sx - 0.9)} ${n(y - 2)} ${sx} ${n(y - 3.6)} Q${n(sx + 0.9)} ${n(y - 5.2)} ${sx} ${top}" stroke="#A8AE8A" stroke-width="0.5" fill="none" opacity="0.9" stroke-linecap="round"/>`;
    })
    .join("");

/** A basin of water, its foot's middle at (x, y). */
const basin = (x: number, y: number) =>
  `<path d="M${n(x - 3.4)} ${n(y - 2.2)} L${n(x + 3.4)} ${n(y - 2.2)} L${n(x + 2.6)} ${y} L${n(x - 2.6)} ${y} Z" fill="#9A7A5A"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.2)}" rx="3.4" ry="0.7" fill="#6FB8E0"/>`;

/** Steam rising over a basin whose foot's middle is at (x, y). */
const steam = (x: number, y: number) =>
  [-1.3, 0, 1.3]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 8 - (i % 2) * 1.2);
      return `<path d="M${sx} ${n(y - 3)} Q${n(sx - 0.8)} ${n(y - 4.8)} ${sx} ${n(y - 6.2)} Q${n(sx + 0.8)} ${n(y - 7.4)} ${sx} ${top}" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.8" stroke-linecap="round"/>`;
    })
    .join("");

/** A small cubit mark on the floor at (x, y). */
const cubitMark = (x: number, y: number) => `<path d="M${x} ${n(y - 1)} L${x} ${n(y + 1)}" stroke="#8C6E44" stroke-width="0.6" stroke-linecap="round"/>`;

/**
 * The Ka'bah, open on this side to show its inside: its black covering from x `l` to `r` and from y `top`, the band of
 * gold, the walls within, its floor down to y `floor`, and its door in the left wall.
 */
const kaabaOpen = (l: number, r: number, top: number, floor: number) =>
  `<rect x="${l}" y="${top}" width="${n(r - l)}" height="${n(floor + 2 - top)}" fill="#1F1F1F"/>` +
  `<rect x="${l}" y="${n(top + 5)}" width="${n(r - l)}" height="2.2" fill="#E2B33C"/>` +
  `<rect x="${n(l + 4)}" y="${n(top + 9)}" width="${n(r - l - 8)}" height="${n(floor - top - 9)}" fill="#C9AE86"/>` +
  `<rect x="${n(l + 4)}" y="${n(top + 9)}" width="${n(r - l - 8)}" height="${n(floor - top - 9)}" fill="#000000" opacity="0.06"/>` +
  `<rect x="${n(r - 8)}" y="${n(top + 9)}" width="4" height="${n(floor - top - 9)}" fill="#B39568"/>` +
  `<rect x="${n(l + 4)}" y="${n(floor - 3)}" width="${n(r - l - 8)}" height="3" fill="#EDE3CF"/><path d="M${n(l + 4)} ${n(floor - 3)} L${n(r - 4)} ${n(floor - 3)}" stroke="#CDBE9E" stroke-width="0.4"/>` +
  `<rect x="${l}" y="${n(floor - 15)}" width="4" height="12" fill="#3A2A1C"/><rect x="${n(l - 0.4)}" y="${n(floor - 15.6)}" width="4.8" height="0.9" fill="#E2B33C"/>` +
  `<path d="M${n(l - 0.4)} ${n(floor - 15)} L${n(l - 0.4)} ${n(floor - 3)} M${n(l + 4.4)} ${n(floor - 15)} L${n(l + 4.4)} ${n(floor - 3)}" stroke="#E2B33C" stroke-width="0.7"/>`;

/** A wooden pillar inside, at x, from y `top` down to y `foot`. */
const pillar = (x: number, top: number, foot: number) =>
  `<rect x="${n(x - 1.6)}" y="${top}" width="3.2" height="${n(foot - top)}" fill="#8A6440"/>` +
  `<rect x="${n(x - 2.2)}" y="${top}" width="4.4" height="1.4" fill="#6E5034"/><rect x="${n(x - 2.2)}" y="${n(foot - 1.4)}" width="4.4" height="1.4" fill="#6E5034"/>`;

// Smoothing the ground once. Mu'ayqib said: the Prophet ﷺ talked about a man leveling the earth on prostrating, and
// said: if you have to do so, then do it once (Sahih al-Bukhari 1207). No one is drawn: inside the masjid of Madinah,
// under its roof of palm fronds on palm trunks, its floor of small pebbles. A row of places stands on the floor, and
// the place of one who levels the ground, with pebbles before it where it prostrates; his place, a golden ring, on the
// right, and Mu'ayqib's place on the left. Mu'ayqib's voice tells of it, and his voice, soft and golden, speaks. The
// place goes down, lower and flatter: prostrating; a faint sweep passes over the ground before it, once, the pebbles
// go aside, and the ground is level. It rises, and goes down again on the level ground, and rises. His voice speaks:
// a soft golden ring comes about the level ground, and one glint over it: once.
function smoothingTheGroundOnce(): SignArt {
  const foot = 96;
  const his: [number, number] = [136, 102];
  const muayqib: [number, number] = [14, 107];
  const row: [number, number][] = [
    [32, 104],
    [46, 104],
    [60, 104]
  ];
  const one: [number, number] = [76, 104];
  /** The middle of the ground where it prostrates, before it. */
  const spot: [number, number] = [85, 105.6];
  /** The pebbles there, as offsets from the spot's middle: those to the left go left, the others go right. */
  const left: [number, number][] = [
    [-3.4, -0.4],
    [-2.2, 0.5],
    [-1, -0.6],
    [-0.4, 1.1]
  ];
  const right: [number, number][] = [
    [0.2, 0.4],
    [1.3, -0.3],
    [2.5, 0.6],
    [3.5, -0.5],
    [1.9, 1.2]
  ];
  const at = (list: [number, number][]) => list.map(([dx, dy]): [number, number] => [spot[0] + dx, spot[1] + dy]);
  const floor: [number, number][] = [
    [8, 99],
    [21, 112],
    [39, 99.6],
    [52, 111],
    [67, 99],
    [98, 112.6],
    [104, 99.4],
    [118, 110.4],
    [126, 99.2],
    [148, 111.6],
    [152, 99.6]
  ];
  return {
    kind: "smoothing-the-ground-once",
    ms: 6000,
    parts: [
      ...insideTheMasjid(foot),
      { name: "small pebbles on the floor of the masjid", svg: pebbles(floor) },
      { name: "the places of the row", svg: row.map(([x, y]) => someone(x, y, 1.5, IN_THE_ROW)).join("") },
      { name: "the pebbles before the place, to the left: pushed aside once", svg: pebbles(at(left)), keys: track({ xy: [[0.18, 0, 0], [0.24, -2.6, 0]] }) },
      { name: "the pebbles before the place, to the right: pushed aside once", svg: pebbles(at(right)), keys: track({ xy: [[0.18, 0, 0], [0.24, 2.6, 0]] }) },
      { name: "the ground made level", svg: `<ellipse cx="${spot[0]}" cy="${spot[1]}" rx="3" ry="0.9" fill="#F3E7CB"/>`, keys: showAt(0.2, 0.24) },
      {
        name: "leveling: a faint sweep over the ground, once",
        svg: `<path d="M${n(spot[0] - 4)} ${n(spot[1] - 1.6)} Q${spot[0]} ${n(spot[1] - 3.4)} ${n(spot[0] + 4)} ${n(spot[1] - 1.6)}" stroke="#FFFFFF" stroke-width="0.6" fill="none" opacity="0.8" stroke-linecap="round"/>`,
        keys: showFor(0.18, 0.19, 0.24, 0.25)
      },
      {
        name: "the place of the one who levels the ground, prostrating and rising",
        svg: someone(one[0], one[1], 1.5, LEVELING),
        origin: { x: one[0], y: n(one[1] + 1.5) },
        keys: track({
          scaleY: [
            [0.12, 1],
            [0.15, 0.5],
            [0.27, 0.5],
            [0.29, 1],
            [0.4, 1],
            [0.43, 0.5],
            [0.56, 0.5],
            [0.59, 1]
          ]
        })
      },
      { name: "do it once: a soft golden ring about the level ground", svg: care(spot[0], spot[1], 5.4, 1.9, SOFT_GOLD), keys: showAt(0.74, 0.755), loop: soft },
      { name: "once: a single glint over it", svg: glints([[spot[0], n(spot[1] - 3.6)]], 1.3), keys: showAt(0.8, 0.81), loop: twinkle() },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.1, 0.96]]), loop: speaking },
      { name: "Mu'ayqib's place", svg: someone(muayqib[0], muayqib[1], 1.5, MUAYQIB) },
      { name: "Mu'ayqib's voice: telling of it", svg: arcs(n(muayqib[0] + 2.4), n(muayqib[1] - 3.2), MUAYQIB), keys: voice([[0.024, 0.09]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Mu'ayqib: he talked about a man leveling", "The earth on prostrating, and said:", "If you have to do so, then do it once."])
  };
}

// Two grow old with him. Anas ibn Malik said: the Messenger of Allah ﷺ said: the son of Adam grows old, and two grow
// old with him: love for wealth and a long life (Sahih al-Bukhari 6421). The words leave out the translator's words.
// No one is drawn: in Madinah, the masjid far off and his place by it, a golden ring; a home, and the place of one by
// it; Anas's place on the left. Anas's voice tells of it, and his voice, soft and golden, speaks. Small suns show over
// the home, one by one: the years. The place turns from a warm brown to grey, and a staff leans by it: grown old. Two
// soft rings come beside it: two grow old with it. A heap of coins shows in the first and grows: love for wealth; and
// a way shows from the second and grows long, on to the far hills: a long life.
function twoGrowOld(): SignArt {
  const anas: [number, number] = [12, 107];
  const his: [number, number] = [30, 84.4];
  const homeAt: [number, number] = [62, 101];
  const one: [number, number] = [80, 103.6];
  const years: [number, number][] = [
    [48, 24],
    [66, 20],
    [84, 20],
    [102, 24]
  ];
  /** The two soft rings: the first about the heap of coins, the second about the way's start. */
  const wealth: [number, number] = [93, 104.6];
  const life: [number, number] = [106, 106.4];
  return {
    kind: "two-grow-old",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "a cloud", svg: cloud(130, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [90, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(6, 80, 0.4) },
      ...palms(
        [
          [50, 84, 10],
          [124, 90, 10],
          [152, 84, 10]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.1, 0.96]]), loop: speaking },
      { name: "a home", svg: home(homeAt[0], homeAt[1], 18, 11) },
      ...years.map(
        ([x, y], i): SignPart => ({
          name: `the years: a small sun over the home ${i + 1}`,
          svg: aYear(x, y),
          keys: showAt(at3(0.36 + i * 0.022), at3(0.368 + i * 0.022))
        })
      ),
      { name: "the place of one by the home, young", svg: someone(one[0], one[1], 1.5, YOUNG), keys: track({ opacity: [[0.44, 1], [0.48, 0]] }) },
      { name: "the place of one by the home, grown old", svg: someone(one[0], one[1], 1.5, OLD), keys: showAt(0.44, 0.48) },
      { name: "grown old: a staff leaning by its place", svg: staff(n(one[0] + 2.6), n(one[1] + 1.5)), keys: showAt(0.48, 0.495) },
      {
        name: "two grow old with it: two soft rings beside its place",
        svg: care(wealth[0], n(wealth[1] - 1.6), 4.2, 3.2, SOFT_GOLD) + care(life[0], n(life[1] - 0.4), 3.6, 2.2, SOFT_GOLD),
        keys: showAt(0.53, 0.545),
        loop: soft
      },
      {
        name: "love for wealth: a heap of coins, growing",
        svg: coins(wealth[0], wealth[1], 4),
        origin: { x: wealth[0], y: wealth[1] },
        keys: track({
          opacity: [
            [0.7, 0],
            [0.708, 1]
          ],
          scale: [
            [0.71, 1],
            [0.79, 1.7]
          ]
        })
      },
      {
        name: "and a long life: a way ahead, growing long, on to the far hills",
        svg: way(`M${life[0]} ${life[1]} Q${n(life[0] + 20)} ${n(life[1] - 3)} ${n(life[0] + 46)} ${n(life[1] - 10)}`, "#FFF0C4", 1.5),
        origin: { x: life[0], y: life[1] },
        keys: track({
          opacity: [
            [0.82, 0],
            [0.828, 1]
          ],
          scaleX: [
            [0.83, 0.2],
            [0.92, 1]
          ]
        })
      },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.5, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 2.4), n(anas[1] - 3.2), ANAS), keys: voice([[0.024, 0.09]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Anas ibn Malik: he said: the son of Adam", "Grows old and so also two grow old", "With him: love for wealth and a long life."])
  };
}

// Through the poor. Mus'ab ibn Sa'd said: once Sa'd thought that he was superior to those who were below him in rank.
// On that the Prophet ﷺ said: you gain no victory or livelihood except through the poor amongst you (Sahih al-Bukhari
// 2896). The words leave out the translator's words. No one is drawn, and nothing of fighting: in Madinah, the masjid
// far off and his place by it, a golden ring; Sa'd's place on a low rise; two small homes, and the places of the poor
// by them, lower down; Mus'ab's place on the left. Mus'ab's voice tells of it: a pale ring comes about Sa'd's place.
// His voice, soft and golden, speaks: sacks of grain and a basket of dates come along the way into the town, past the
// homes of the poor: livelihood, and a soft golden light comes over the town. Sparks rise from the places of the poor,
// and a soft golden ring comes about them: through them.
function throughThePoor(): SignArt {
  const musab: [number, number] = [12, 107];
  const his: [number, number] = [34, 84.4];
  const riseAt: [number, number] = [64, 101];
  const saad: [number, number] = [64, 95.4];
  const poor: [number, number][] = [
    [100, 104.4],
    [110, 106.6],
    [121, 104.6],
    [132, 106.6],
    [144, 104.4]
  ];
  /** Where the provision comes to, by the rise. */
  const given: [number, number] = [79, 106];
  return {
    kind: "through-the-poor",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(78, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(6, 80, 0.4) },
      ...palms(
        [
          [50, 84, 10],
          [152, 84, 10]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.53, 0.96]]), loop: speaking },
      { name: "a low rise of the ground", svg: rise(riseAt[0], riseAt[1], 22, 4.2) },
      { name: "a small home of the poor", svg: home(112, 98, 12, 8, "#C9A47A", "#A8845A", "#5A4028") },
      { name: "another small home of the poor", svg: home(136, 98, 12, 8, "#C9A47A", "#A8845A", "#5A4028") },
      { name: "the places of the poor, lower down", svg: poor.map(([x, y]) => someone(x, y, 1.5, POOR)).join("") },
      { name: "Sa'd's place, on the rise", svg: someone(saad[0], saad[1], 1.5, SAAD) },
      { name: "thought himself above them: a pale ring about Sa'd's place", svg: care(saad[0], n(saad[1] + 0.2), 4.2, 2.4, PALE), keys: showAt(0.25, 0.265), loop: soft },
      {
        name: "livelihood: sacks of grain and a basket of dates, coming into the town past the homes of the poor",
        svg: sack(given[0], given[1], 0.8) + sack(n(given[0] + 5.6), n(given[1] + 0.6), 0.8) + basketOfDates(n(given[0] + 11.2), n(given[1] + 0.2)),
        keys: track({
          opacity: [
            [0.63, 0],
            [0.636, 1]
          ],
          xy: [
            [0.63, 66, -2],
            [0.71, 0, 0]
          ]
        })
      },
      { name: "victory: a soft golden light over the town", svg: wash(80, 94, 80, 24, WARM, 0.07), keys: showAt(0.72, 0.745), loop: soft },
      ...poor.map(([x, y], i) => ({
        name: `through the poor: a spark rising from the place of one of them ${i + 1}`,
        svg: sparkle(x, n(y - 4.4), 1.3, "#FFE7A0"),
        keys: sparkStays(at3(0.82 + i * 0.01), at3(0.87 + i * 0.01), 12),
        loop: twinkle(900)
      })),
      { name: "through them: a soft golden ring about the places of the poor", svg: care(123, 105.5, 27, 3.4, SOFT_GOLD), keys: showAt(0.92, 0.935), loop: soft },
      { name: "Mus'ab's place", svg: someone(musab[0], musab[1], 1.5, MUSAB) },
      { name: "Mus'ab's voice: telling of it", svg: arcs(n(musab[0] + 2.4), n(musab[1] - 3.2), MUSAB), keys: voice([[0.024, 0.52]]), loop: speaking }
    ],
    words: linesOn(FIVE, ["Mus'ab ibn Sa'd: once Sa'd thought", "That he was superior to those who were", "Below him in rank. On that he said:", "You gain no victory or livelihood except", "Through the poor amongst you."])
  };
}

// Their own work. Aishah said: the companions of the Messenger of Allah ﷺ used to practice manual labor, so their
// sweat used to smell, and they were advised to take a bath (Sahih al-Bukhari 2071). No one is drawn, and no hand is
// drawn: in Madinah, the masjid far off and his place by it, a golden ring; a well with a frame of wood and a trough, a
// field, and a palm with an empty basket under it, the place of one at work by each; Aishah's place on the left. Her
// voice tells of it. They work: the bucket goes down into the well and comes up full, and the trough fills; furrows
// show in the field, one by one, as its place goes along; the dates go from the palm, and the basket is full. Faint
// wavy lines rise over each place: the smell of sweat. A basin of water shows by each, with steam: the bath; the wavy
// lines go, and glints of clean water show over each.
function theirOwnWork(): SignArt {
  const aishah: [number, number] = [12, 107];
  const his: [number, number] = [32, 84.4];
  const wellAt: [number, number] = [54, 103];
  const troughAt: [number, number] = [66, 104];
  const field: [number, number] = [96, 106];
  const basketAt: [number, number] = [130, 105];
  const palmAt: [number, number, number] = [140, 104, 22];
  const workers: [number, number][] = [
    [74, 105],
    [86, 102],
    [121, 105]
  ];
  /** Where each of the three is once the field's furrows are made. */
  const after: [number, number][] = [workers[0], [104, 102], workers[2]];
  /** Which side of each its basin is on: the third's is on its left, clear of the basket. */
  const side = [4.4, 4.4, -4.4];
  /** The bucket's way down into the well, and up again. */
  const dip: [number, number, number][] = [
    [0.29, 0, 0],
    [0.32, 0, 7.5],
    [0.35, 0, 7.5],
    [0.38, 0, 0]
  ];
  return {
    kind: "their-own-work",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(134, 18) },
      { name: "a cloud", svg: cloud(80, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [76, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(6, 80, 0.4) },
      ...palms(
        [
          [100, 86, 9],
          [palmAt[0], palmAt[1], palmAt[2]]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "a well: its frame of wood and its dark opening", svg: wellBack(wellAt[0], wellAt[1]) },
      {
        name: "the rope of the well, going down and coming up",
        svg: `<path d="M${wellAt[0]} ${n(wellAt[1] - 15)} L${wellAt[0]} ${n(wellAt[1] - 11.9)}" stroke="#C9B089" stroke-width="0.35"/>`,
        origin: { x: wellAt[0], y: n(wellAt[1] - 15) },
        keys: track({
          scaleY: [
            [0.29, 1],
            [0.32, 3.42],
            [0.35, 3.42],
            [0.38, 1]
          ]
        })
      },
      { name: "a bucket on the rope, going down into the well and coming up", svg: pail(wellAt[0], n(wellAt[1] - 7)), keys: track({ xy: dip }) },
      {
        name: "full: water in the bucket",
        svg: pailWater(wellAt[0], n(wellAt[1] - 7)),
        keys: track({
          opacity: [
            [0.334, 0],
            [0.336, 1]
          ],
          xy: dip
        })
      },
      { name: "the well's round wall of stones, in front", svg: wellFront(wellAt[0], wellAt[1]) },
      { name: "a trough by the well", svg: trough(troughAt[0], troughAt[1]) },
      { name: "the water drawn, in the trough", svg: troughWater(troughAt[0], troughAt[1]), keys: showAt(0.39, 0.4) },
      { name: "a field", svg: `<ellipse cx="${field[0]}" cy="${field[1]}" rx="13" ry="3.4" fill="#C9A878"/>` },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a furrow in the field ${i + 1}`,
          svg: furrow(n(field[0] - 4 + i * 4), n(field[1] - 1 + (i % 2) * 1.4), 7),
          keys: showAt(at3(0.3 + i * 0.04), at3(0.308 + i * 0.04))
        })
      ),
      { name: "an empty basket under the palm", svg: emptyBasket(basketAt[0], basketAt[1]), keys: track({ opacity: [[0.37, 1], [0.38, 0]] }) },
      { name: "dates on the palm", svg: dateCluster(n(palmAt[0] - 2.4), n(palmAt[1] - palmAt[2] + 3)) + dateCluster(n(palmAt[0] + 2.2), n(palmAt[1] - palmAt[2] + 3.4)), keys: track({ opacity: [[0.34, 1], [0.38, 0]] }) },
      { name: "the basket, full of dates", svg: basketOfDates(basketAt[0], basketAt[1]), keys: showAt(0.37, 0.38) },
      ...workers.map(
        ([x, y], i): SignPart => ({
          name: `the place of one at work ${i + 1}`,
          svg: someone(x, y, 1.5, AT_WORK),
          keys: track({
            xy: [
              [0.29, 0, 0],
              [0.42, n(after[i][0] - x), n(after[i][1] - y)]
            ]
          })
        })
      ),
      ...after.map(
        ([x, y], i): SignPart => ({
          name: `the smell of sweat: faint wavy lines over the place of one at work ${i + 1}`,
          svg: smell(x, n(y - 2)),
          keys: showFor(0.54, 0.555, 0.86, 0.875),
          loop: { move: "bob", ms: 2400, y: -0.6 }
        })
      ),
      { name: "the bath: a basin of water by each", svg: after.map(([x, y], i) => basin(n(x + side[i]), n(y + 1.4))).join(""), keys: showAt(0.78, 0.795) },
      { name: "and steam rising over each basin", svg: after.map(([x, y], i) => steam(n(x + side[i]), n(y + 1.4))).join(""), keys: showAt(0.8, 0.815), loop: { move: "bob", ms: 2400, y: -0.6 } },
      { name: "clean: glints over each place", svg: glints(after.map(([x, y]): [number, number] => [n(x + 0.6), n(y - 4)]), 1.1), keys: showAt(0.89, 0.905), loop: twinkle() },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 2.4), n(aishah[1] - 3.2), AISHAH), keys: voice([[0.024, 0.96]]), loop: speaking }
    ],
    words: linesOn(FOUR, ["Aishah: the companions of Allah's", "Messenger used to practice manual labor,", "So their sweat used to smell, and they", "Were advised to take a bath."])
  };
}

// Inside the Ka'bah. Nafi' said: whenever Ibn Umar entered the Ka'bah, he used to walk straight ahead, keeping the
// door at his back, and proceed till he was about three cubits from the wall in front of him, and then he would pray
// there, aiming at the place where the Messenger of Allah ﷺ prayed, as Bilal had told him (Sahih al-Bukhari 1599). The
// words leave out "keeping the door at his back" and the last words, that anyone may pray anywhere inside it. No one
// is drawn, and nothing is drawn for Allah: in Makkah, the Ka'bah, open on this side to show its inside, its door in
// the left wall, three pillars of wood within; Nafi's place outside on the left. Nafi's voice tells of it. Ibn Umar's
// place comes to the door and in, and goes straight ahead, on and on, and stops. Three small marks show on the floor
// between it and the wall in front of it, one by one: three cubits. It goes down, lower and flatter, and rises, and a
// spark rises: the prayer. A soft golden glow comes on the floor where it is: where he ﷺ prayed. Bilal's place shows
// by the door, its voice speaks, and a faint golden way goes from it to that place: as Bilal had told him.
function insideTheKabah(): SignArt {
  const L = 34;
  const R = 154;
  const TOP = 38;
  const FLOOR = 100;
  const nafi: [number, number] = [8, 107.4];
  const outside: [number, number] = [26, 104.6];
  const door: [number, number] = [37.6, 96.4];
  const stop: [number, number] = [128, 96.4];
  const bilal: [number, number] = [46, 96.4];
  const ON: [number, number] = [n(door[0] - outside[0]), n(door[1] - outside[1])];
  return {
    kind: "inside-the-kabah",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(14, 20) },
      { name: "a cloud", svg: cloud(120, 18, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "the hills of Makkah", svg: farHills() },
      { name: "the ground about the House", svg: plainLand("#EFE6D2", [[16, 116], [92, 118], [150, 117]]) },
      { name: "the Ka'bah, open on this side to show its inside", svg: kaabaOpen(L, R, TOP, FLOOR) },
      { name: "three pillars of wood within", svg: [70, 96, 122].map((x) => pillar(x, TOP + 9, FLOOR - 3)).join("") },
      {
        name: "Ibn Umar's place: to the door and in, then straight ahead, on and on, and praying there",
        svg: someone(outside[0], outside[1], 1.5, IBN_UMAR),
        origin: { x: stop[0], y: n(stop[1] + 1.5) },
        keys: track({
          xy: [
            [0.05, 0, 0],
            [0.1, ON[0], ON[1]],
            [0.17, ON[0], ON[1]],
            [0.26, n(80 - outside[0]), ON[1]],
            [0.31, n(80 - outside[0]), ON[1]],
            [0.4, n(stop[0] - outside[0]), ON[1]]
          ],
          scaleY: [
            [0.61, 1],
            [0.635, 0.5],
            [0.66, 0.5],
            [0.685, 1]
          ]
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `three cubits: a small mark on the floor ${i + 1}`,
          svg: cubitMark(n(stop[0] + 4.6 + i * 5.4), n(FLOOR - 1.6)),
          keys: showAt(at3(0.46 + i * 0.02), at3(0.466 + i * 0.02))
        })
      ),
      { name: "the prayer: a spark rising from its place", svg: sparkle(stop[0], n(stop[1] - 4.4), 1.3, "#FFE7A0"), keys: sparkStays(0.64, 0.68, 12), loop: twinkle(900) },
      {
        name: "where he prayed: a soft golden glow on the floor there",
        svg: wash(stop[0], n(FLOOR - 1.6), 7, 2.2, "#FFE7A0", 0.16) + care(stop[0], n(FLOOR - 1.6), 5.6, 1.6, SOFT_GOLD),
        keys: showAt(0.76, 0.78),
        loop: soft
      },
      { name: "Bilal's place, by the door", svg: someone(bilal[0], bilal[1], 1.5, BILAL), keys: showAt(0.886, 0.892) },
      { name: "Bilal's voice: telling of the place", svg: arcs(n(bilal[0] + 2.4), n(bilal[1] - 3.2), BILAL), keys: voice([[0.9, 0.96]]), loop: speaking },
      { name: "as Bilal had told: a faint golden way from Bilal's place to it", svg: way(`M${n(bilal[0] + 3)} ${n(FLOOR - 1.4)} L${n(stop[0] - 6)} ${n(FLOOR - 1.4)}`, SOFT_GOLD, 0.9), keys: showAt(0.91, 0.925) },
      { name: "Nafi's place", svg: someone(nafi[0], nafi[1], 1.5, NAFI) },
      { name: "Nafi's voice: telling of it", svg: arcs(n(nafi[0] + 2.4), n(nafi[1] - 3.2), NAFI), keys: voice([[0.024, 0.11]]), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Nafi': whenever Ibn Umar entered the",
      "Ka'bah he used to walk straight, and",
      "Used to proceed on till about three",
      "Cubits from the wall in front of him,",
      "And then he would offer the prayer there",
      "Aiming at the place where Allah's",
      "Messenger prayed, as Bilal had told him."
    ])
  };
}

// Their followers too. Zayd ibn Arqam said: the Ansar said: O Messenger of Allah, every prophet has his own followers,
// and we have followed you, so invoke Allah to let our followers be counted as from us. So he ﷺ invoked Allah
// accordingly (Sahih al-Bukhari 3787). No one is drawn, and nothing is drawn for Allah: in Madinah, the masjid, his
// place before it, a golden ring, the places of the Ansar gathered before him, and Zayd's place on the right. Zayd's
// voice tells of it, and the voice of the Ansar speaks. A faint golden way goes from them to his place, and they come
// nearer to it: we have followed you. The places of their followers show behind them, and come up near them. His
// voice speaks, soft and golden, a spark rises from his place: his du'a, and a soft golden ring comes about the Ansar
// and their followers together: from us.
function theirFollowersToo(): SignArt {
  const zayd: [number, number] = [150, 107];
  const his: [number, number] = [40, 100];
  const ansar: [number, number][] = [
    [62, 101],
    [69, 105.6],
    [76, 99.6],
    [83, 104.6],
    [90, 100.4]
  ];
  const followers: [number, number][] = [
    [110, 102],
    [117, 106.4],
    [124, 101],
    [131, 105.4]
  ];
  return {
    kind: "their-followers-too",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(84, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[44, 116], [96, 118], [150, 117]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 90, 0.5) },
      ...palms(
        [
          [52, 84, 11],
          [146, 88, 12]
        ],
        "Madinah"
      ),
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden: his du'a", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.8), SOFT_GOLD), keys: voice([[0.82, 0.96]]), loop: speaking },
      { name: "his du'a: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 4.4), 1.3, "#FFE7A0"), keys: sparkStays(0.83, 0.87, 12), loop: twinkle(900) },
      { name: "we have followed you: a faint golden way from them to his place", svg: way(`M${n(ansar[0][0] - 3)} ${ansar[0][1]} L${n(his[0] + 3.4)} ${his[1]}`, SOFT_GOLD, 0.9), keys: showAt(0.36, 0.375) },
      {
        name: "the places of the Ansar, gathered, then coming nearer to him",
        svg: ansar.map(([x, y]) => someone(x, y, 1.5, ANSAR)).join(""),
        keys: track({
          xy: [
            [0.38, 0, 0],
            [0.43, -5, 0]
          ]
        })
      },
      {
        name: "the voice of the Ansar, asking",
        svg: arcsLeft(n(ansar[0][0] - 2.4), n(ansar[0][1] - 3.4), ANSAR),
        keys: track({
          opacity: [
            [0.08, 0],
            [0.086, 1],
            [0.76, 1],
            [0.766, 0]
          ],
          xy: [
            [0.38, 0, 0],
            [0.43, -5, 0]
          ]
        }),
        loop: speaking
      },
      {
        name: "the places of their followers, showing behind them and coming up near them",
        svg: followers.map(([x, y]) => someone(x, y, 1.4, FOLLOWERS)).join(""),
        keys: track({
          opacity: [
            [0.67, 0],
            [0.685, 1]
          ],
          xy: [
            [0.69, 0, 0],
            [0.75, -12, 0]
          ]
        })
      },
      { name: "from us: a soft golden ring about the Ansar and their followers together", svg: care(88, 103, 36, 5.2, SOFT_GOLD), keys: showAt(0.89, 0.905), loop: soft },
      { name: "Zayd's place", svg: someone(zayd[0], zayd[1], 1.5, ZAYD) },
      { name: "Zayd's voice: telling of it", svg: arcsLeft(n(zayd[0] - 2.4), n(zayd[1] - 3.2), ZAYD), keys: voice([[0.024, 0.07]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Zayd ibn Arqam: the Ansar said: O Allah's",
      "Messenger, every prophet has his own",
      "Followers and we have followed you. So",
      "Will you invoke Allah to let our",
      "Followers be considered from us?",
      "So he invoked Allah accordingly."
    ])
  };
}

export const MODEST_ART = {
  "smoothing-the-ground-once": smoothingTheGroundOnce,
  "two-grow-old": twoGrowOld,
  "through-the-poor": throughThePoor,
  "their-own-work": theirOwnWork,
  "inside-the-kabah": insideTheKabah,
  "their-followers-too": theirFollowersToo
};
