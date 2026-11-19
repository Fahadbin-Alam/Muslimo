import { cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, goldCoin, palms, track } from "./daysArt";
import { cloth, greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, glints, linesOn, plainLand, SEVEN, sparkStays, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { farHills } from "./wideArt";
import { coins, jar, stall } from "./tradeArt";

/**
 * Serving: Abu Dharr asking "and if I cannot?", until all that is left is to keep one's harm from people, a charity
 * for oneself; Abu Bakr's trade, that fed his family, set aside to serve the Muslims; what Allah forbade for us and
 * what He dislikes for us; and his meals, never taken while leaning. Only the land, the sky, buildings, things,
 * plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head,
 * a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes,
 * and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes down
 * from the sky: what is good is a light, glints, a soft golden ring and sparks that rise, and what is not to be done
 * has a grey dashed ring about it. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.3],
  [0.346, 0.626],
  [0.672, 1]
] as const;

/** Abu Dharr's place and voice: a violet. */
const ABU_DHARR = "#6A5E8E";
/** The place of one who is weak: a pale blue grey. */
const WEAK = "#7E8EA8";
/** The place of one who cannot work for himself: a sand brown. */
const UNABLE = "#9A8466";
/** The places of others: a warm brown. */
const OTHERS = "#9A7A56";
/** Aishah's place and voice: a plum. */
const AISHAH = "#9A5E7A";
/** Abu Bakr's place and voice: a deep teal. */
const ABU_BAKR = "#3E6E7A";
/** The places of his family: a soft brown. */
const FAMILY = "#A08260";
/** The places of the Muslims: a warm brown. */
const MUSLIMS = "#8E7050";
/** Al-Mughirah's place and voice: an olive brown. */
const MUGHIRAH = "#7A6A4E";
/** Her place, an elder's: a dusky rose. */
const ELDER = "#A8707E";
/** The places in what is drawn of each thing not to be done: a clay brown. */
const SOME = "#8E6A48";
/** Abu Juhayfah's place and voice: a sea green. */
const ABU_JUHAYFAH = "#4E7E6E";

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
const madinahDay = (sunAt: [number, number], cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** An empty purse, limp and open, its foot's middle at (x, y). */
const emptyPurse = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${y} C${n(x - 2.8)} ${n(y - 1.2)} ${n(x - 1.8)} ${n(y - 1.9)} ${n(x - 1.2)} ${n(y - 2)} L${n(x + 1.4)} ${n(y - 2.2)} C${n(x + 2.2)} ${n(y - 1.8)} ${n(x + 2.9)} ${n(y - 1)} ${n(x + 2.4)} ${y} Z" fill="#8C5A2E"/>` +
  `<ellipse cx="${n(x + 0.1)}" cy="${n(y - 2.1)}" rx="1.3" ry="0.35" fill="#4E3018"/>` +
  `<path d="M${n(x + 1.3)} ${n(y - 2.2)} Q${n(x + 2.6)} ${n(y - 3.2)} ${n(x + 3.4)} ${n(y - 2.4)}" stroke="#8C5A2E" stroke-width="0.4" fill="none" stroke-linecap="round"/>`;

/** An empty basket, its foot's middle at (x, y). */
const emptyBasket = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y - 4)} L${n(x + 4)} ${n(y - 4)} L${n(x + 3)} ${y} L${n(x - 3)} ${y} Z" fill="#B88A4A"/>` +
  `<path d="M${n(x - 3.6)} ${n(y - 2.6)} L${n(x + 3.6)} ${n(y - 2.6)} M${n(x - 3.3)} ${n(y - 1.3)} L${n(x + 3.3)} ${n(y - 1.3)}" stroke="#946A34" stroke-width="0.4"/>`;

/** The dates heaped in a basket whose foot's middle is at (x, y). */
const datesIn = (x: number, y: number) =>
  [-2.4, -0.8, 0.8, 2.4, -1.6, 0, 1.6, -0.8, 0.8]
    .map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 4.6 - (i < 4 ? 0 : i < 7 ? 1.1 : 2.1))}" rx="0.9" ry="0.7" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`)
    .join("");

/** Harm: three short grey jagged marks, their feet about (x, y). */
const harmMarks = (x: number, y: number) =>
  [-2.2, 0, 2.2]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 3.4 - (i % 2) * 0.8);
      return `<path d="M${n(sx - 0.6)} ${y} L${n(sx + 0.5)} ${n(y - 1.2)} L${n(sx - 0.5)} ${n(y - 2.2)} L${n(sx + 0.6)} ${top}" stroke="#7E7E76" stroke-width="0.55" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");

/** A flat loaf of bread, its middle at (x, y). */
const loaf = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.3" fill="#C9A26A" stroke="#A9824A" stroke-width="0.3"/>` +
  `<circle cx="${n(x - 1)}" cy="${n(y - 0.2)}" r="0.3" fill="#9A7440"/><circle cx="${n(x + 0.9)}" cy="${n(y + 0.2)}" r="0.3" fill="#9A7440"/>`;

/** A date, its middle at (x, y). */
const aDate = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.95" ry="0.7" fill="#93391B"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.25)}" rx="0.3" ry="0.18" fill="#B5583A"/>`;

/** A cushion to lean on, its foot's middle at (x, y): a low seat with a bolster at its back. */
const cushion = (x: number, y: number) =>
  `<rect x="${n(x - 5.4)}" y="${n(y - 1.6)}" width="10.8" height="2" rx="0.8" fill="#9C3D2E"/><rect x="${n(x - 5.4)}" y="${n(y - 1.6)}" width="10.8" height="0.6" rx="0.3" fill="#C9674E"/>` +
  `<rect x="${n(x - 5.8)}" y="${n(y - 4.8)}" width="11.6" height="3.4" rx="1.6" fill="#B8573E"/><path d="M${n(x - 4.6)} ${n(y - 3.1)} L${n(x + 4.6)} ${n(y - 3.1)}" stroke="#E2B07A" stroke-width="0.4"/>`;

/** An empty bowl, its middle at (x, y). */
const smallBowl = (x: number, y: number) =>
  `<path d="M${n(x - 2)} ${n(y - 0.9)} Q${x} ${n(y + 1.6)} ${n(x + 2)} ${n(y - 0.9)} Z" fill="#9A6A38"/><ellipse cx="${x}" cy="${n(y - 0.9)}" rx="2" ry="0.5" fill="#6E4A26"/>`;

/** A small purse, tied at its neck, its foot's middle at (x, y). */
const purse = (x: number, y: number) =>
  `<path d="M${n(x - 2)} ${y} C${n(x - 2.6)} ${n(y - 2)} ${n(x - 1.4)} ${n(y - 3)} ${n(x - 0.6)} ${n(y - 3.2)} L${n(x + 0.6)} ${n(y - 3.2)} C${n(x + 1.4)} ${n(y - 3)} ${n(x + 2.6)} ${n(y - 2)} ${n(x + 2)} ${y} Z" fill="#8C5A2E"/>` +
  `<path d="M${n(x - 0.7)} ${n(y - 3.1)} L${n(x + 0.7)} ${n(y - 3.1)}" stroke="#E0B86A" stroke-width="0.5"/>`;

/** One small arc of a voice asking, its middle at (x, y). */
const askArc = (x: number, y: number) => `<path d="M${x} ${n(y - 1.3)} Q${n(x + 1)} ${y} ${x} ${n(y + 1.3)}" stroke="${SOME}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;

// And if I cannot? Abu Dharr said: I asked the Prophet ﷺ: what is the best deed? ... I said: if I cannot afford to
// do that? He said: help the weak or do good for a person who cannot work for himself. I said: if I cannot do that?
// He said: refrain from harming others, for this will be regarded as a charitable deed for your own good (Sahih
// al-Bukhari 2518). The words leave out his first answers. No one is drawn, and no hand: in Madinah, the masjid far
// off; his place, a golden ring, and Abu Dharr's place before it; the home of one who is weak, with a heavy sack set
// down far from it; the home of one who cannot work for himself, with an empty basket by it; and the places of
// others. Abu Dharr's voice asks, and an empty purse shows by his place: he cannot afford it. His voice, soft and
// golden, speaks: the sack goes along a faint way to the weak one's door, and a soft golden ring comes about the
// weak one's place; the empty basket fills with dates, and a soft golden ring comes about the place of the one who
// cannot work. Abu Dharr's voice asks again, and his voice speaks: grey jagged marks of harm show by Abu Dharr's
// place, a grey dashed ring about them, and they are gone; a soft golden ring comes about the places of others, kept
// from harm. A spark rises from Abu Dharr's place: a charity, and a soft golden ring comes about his own place.
function andIfICannot(): SignArt {
  const abuDharr: [number, number] = [10, 106.4];
  const his: [number, number] = [25, 99.6];
  const purseAt: [number, number] = [16.6, 108.4];
  const harmAt: [number, number] = [30, 107.6];
  const others: [number, number][] = [
    [42, 106],
    [50, 106.8],
    [58, 106]
  ];
  const weakHome: [number, number] = [78, 96];
  const weak: [number, number] = [66.4, 99.4];
  /** The sack, set down on the way, and how far it goes to the weak one's door. */
  const sackAt: [number, number] = [104, 104.8];
  const toDoor: [number, number] = [-26, -6.6];
  const unableHome: [number, number] = [126, 95];
  const unable: [number, number] = [137.4, 98.4];
  const basketAt: [number, number] = [145.6, 100.4];
  return {
    kind: "and-if-i-cannot",
    ms: 12000,
    parts: [
      ...madinahDay([140, 18], [84, 24]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(4, 80, 0.4) },
      ...palms(
        [
          [50, 88, 9],
          [100, 88, 9],
          [154, 86, 10]
        ],
        "Madinah"
      ),
      { name: "the home of one who is weak", svg: home(weakHome[0], weakHome[1], 16, 10) },
      { name: "the place of one who is weak, by its home", svg: someone(weak[0], weak[1], 1.4, WEAK) },
      {
        name: "help the weak: a faint way from the sack to its door",
        svg: way(`M${sackAt[0]} ${n(sackAt[1] - 0.4)} Q${n(sackAt[0] - 12)} ${n(sackAt[1] - 1)} ${n(sackAt[0] + toDoor[0])} ${n(sackAt[1] + toDoor[1] + 0.2)}`, "#FFF0C4", 0.8),
        keys: showFor(0.272, 0.278, 0.336, 0.342)
      },
      {
        name: "a heavy sack set down far from its home, then taken along the way to its door",
        svg: sack(sackAt[0], sackAt[1], 0.7),
        keys: track({
          xy: [
            [0.28, 0, 0],
            [0.326, toDoor[0], toDoor[1]]
          ]
        })
      },
      { name: "helped: a soft golden ring about the weak one's place", svg: care(weak[0], n(weak[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showAt(0.33, 0.342), loop: soft },
      { name: "the home of one who cannot work for himself", svg: home(unableHome[0], unableHome[1], 16, 10) },
      { name: "the place of one who cannot work for himself, by its home", svg: someone(unable[0], unable[1], 1.5, UNABLE) },
      { name: "an empty basket by its place", svg: emptyBasket(basketAt[0], basketAt[1]) },
      { name: "good done for it: the basket filled with dates", svg: datesIn(basketAt[0], basketAt[1]), keys: showAt(0.392, 0.42) },
      {
        name: "a soft golden ring about its place and its basket",
        svg: care(n((unable[0] + basketAt[0]) / 2), n(unable[1] + 0.6), 7.4, 2.8, SOFT_GOLD),
        keys: showAt(0.432, 0.444),
        loop: soft
      },
      { name: "the places of others", svg: others.map(([x, y]) => someone(x, y, 1.5, OTHERS)).join("") },
      { name: "harm: grey jagged marks by Abu Dharr's place", svg: harmMarks(harmAt[0], harmAt[1]), keys: showFor(0.634, 0.642, 0.684, 0.696) },
      { name: "refrain from harming: a grey dashed ring about them", svg: greyRing(harmAt[0], n(harmAt[1] - 1.8), 4.4, 3), keys: showFor(0.648, 0.656, 0.684, 0.696) },
      { name: "kept from harm: a soft golden ring about the places of others", svg: care(50, 106.4, 12.6, 2.4, SOFT_GOLD), keys: showAt(0.698, 0.71), loop: soft },
      { name: "a charitable deed: a spark rising from Abu Dharr's place", svg: glints([[abuDharr[0], n(abuDharr[1] - 3)]], 1.5), keys: sparkStays(0.756, 0.83, 10), loop: twinkle(900) },
      { name: "for your own good: a soft golden ring about Abu Dharr's own place", svg: care(abuDharr[0], n(abuDharr[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showAt(0.878, 0.89), loop: soft },
      { name: "and glints over it", svg: glints([[n(abuDharr[0] - 3), n(abuDharr[1] - 6.6)], [n(abuDharr[0] + 3.4), n(abuDharr[1] - 8.4)]], 1), keys: showAt(0.9, 0.91), loop: twinkle() },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.268, 0.46], [0.556, 0.96]]), loop: speaking },
      { name: "Abu Dharr's place", svg: someone(abuDharr[0], abuDharr[1], 1.5, ABU_DHARR) },
      { name: "cannot afford it: an empty purse by Abu Dharr's place", svg: emptyPurse(purseAt[0], purseAt[1]), keys: showAt(0.15, 0.162) },
      {
        name: "Abu Dharr's voice: asking",
        svg: arcs(n(abuDharr[0] + 2.4), n(abuDharr[1] - 3.2), ABU_DHARR),
        keys: voice([
          [0.024, 0.09],
          [0.146, 0.21],
          [0.512, 0.55]
        ]),
        loop: speaking
      }
    ],
    words: linesOn(EIGHT, [
      "Abu Dharr: I asked: what is the best deed?",
      "I said: if I cannot afford to do that?",
      "He said: help the weak or do good for a",
      "Person who cannot work for himself.",
      "I said: if I cannot do that? He said:",
      "Refrain from harming others, for this",
      "Will be regarded as a charitable deed",
      "For your own good."
    ])
  };
}

// Abu Bakr's trade. Aishah said: when Abu Bakr as-Siddiq was chosen Caliph, he said: my people know that my
// profession was not incapable of providing sustenance to my family. And as I will be busy serving the Muslim
// nation, my family will eat from the National Treasury of Muslims, and I will practice the profession of serving
// the Muslims (Sahih al-Bukhari 2070). The words leave out "of Muslims" after the Treasury, and read "sustenance" for
// the page's "substance". No one is drawn, and no hand: in Madinah, the masjid far off; Abu Bakr's place before his
// stall in the market, with its goods; the home of his family, and their places by it; the storehouse of the
// Treasury, with its sacks and coins; the places of the Muslims; and Aishah's place on the left. Aishah's voice
// tells of it. A faint golden way shows from the places of the Muslims to Abu Bakr's place, and a soft golden ring
// comes about it: chosen. His voice speaks: glints show over the goods of his stall, and a basket of dates goes from
// it to his family's home, and a soft golden ring comes about their places. His place leaves the stall and goes
// along the way to the places of the Muslims. Glints show over the storehouse of the Treasury, and a sack goes from
// it to his family's home. A soft golden ring comes about his place and the places of the Muslims together, and a
// spark rises from his place: serving them.
function abuBakrsTrade(): SignArt {
  const aishah: [number, number] = [9, 107.2];
  const stallAt = 34;
  const abuBakr: [number, number] = [34, 106.2];
  /** Abu Bakr's place goes on the way in two steps, to the places of the Muslims. */
  const step1: [number, number] = [54, 0.8];
  const step2: [number, number] = [90.4, 0.4];
  const end: [number, number] = [n(abuBakr[0] + step2[0]), n(abuBakr[1] + step2[1])];
  const homeAt: [number, number] = [68, 98];
  const family: [number, number][] = [
    [79.4, 101.4],
    [84.4, 102.4]
  ];
  const storeAt: [number, number] = [106, 97];
  const muslims: [number, number][] = [
    [134, 104.2],
    [142, 106.6],
    [150, 104.2],
    [156.6, 106.6]
  ];
  /** Abu Bakr's place and all that goes with it. */
  const walking = (extra: Parameters<typeof track>[0] = {}) =>
    track({
      ...extra,
      xy: [
        [0.512, 0, 0],
        [0.58, step1[0], step1[1]],
        [0.634, step1[0], step1[1]],
        [0.7, step2[0], step2[1]]
      ]
    });
  return {
    kind: "abu-bakrs-trade",
    ms: 12000,
    parts: [
      ...madinahDay([140, 18], [76, 22]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(110, 80, 0.42) },
      ...palms(
        [
          [16, 88, 9],
          [92, 86, 9],
          [152, 86, 10]
        ],
        "Madinah"
      ),
      { name: "Abu Bakr's stall in the market", svg: stall(stallAt, 18, "#6E8A5E", 82, 95) },
      { name: "the goods of his stall", svg: jar(n(stallAt - 5), 95, 0.55) + jar(stallAt, 95, 0.5, "#C98A4A") + sack(n(stallAt + 5.2), 95, 0.5) },
      { name: "his profession: glints over the goods of his stall", svg: glints([[n(stallAt - 4.4), 91.4], [n(stallAt + 5.6), 92]], 1), keys: showAt(0.27, 0.278), loop: twinkle() },
      { name: "the home of his family", svg: home(homeAt[0], homeAt[1], 16, 10) },
      { name: "the places of his family, by their home", svg: family.map(([x, y]) => someone(x, y, 1.4, FAMILY)).join("") },
      {
        name: "sustenance for his family: a basket of dates, going from his stall to their home",
        svg: basketOfDates(42, 105.6),
        keys: track({
          opacity: [
            [0.39, 0],
            [0.396, 1]
          ],
          xy: [
            [0.398, 0, 0],
            [0.44, 15.4, -6]
          ]
        })
      },
      { name: "a soft golden ring about the places of his family", svg: care(82, 102.2, 6.4, 2.4, SOFT_GOLD), keys: showAt(0.446, 0.458), loop: soft },
      { name: "the storehouse of the Treasury", svg: home(storeAt[0], storeAt[1], 16, 10, "#C9B48E", "#A8926A", "#5A4430") },
      { name: "its sacks and coins", svg: sack(117.6, 99.6, 0.6) + sack(122, 100, 0.55, "#BFA06A") + coins(119.8, 102.4, 4) },
      { name: "the Treasury: glints over its storehouse", svg: glints([[100, 84], [112, 85]], 1.1), keys: showAt(0.756, 0.764), loop: twinkle() },
      {
        name: "his family will eat from it: a sack going from the Treasury to their home",
        svg: sack(100, 99.6, 0.6),
        keys: track({
          opacity: [
            [0.766, 0],
            [0.772, 1]
          ],
          xy: [
            [0.774, 0, 0],
            [0.826, -28.6, 0]
          ]
        })
      },
      { name: "the places of the Muslims", svg: muslims.map(([x, y]) => someone(x, y, 1.5, MUSLIMS)).join("") },
      { name: "chosen: a faint golden way from the places of the Muslims to Abu Bakr's place", svg: way(`M${n(muslims[0][0] - 2.6)} 105.2 Q${n(abuBakr[0] + 52)} 108.4 ${n(abuBakr[0] + 3.4)} 106.8`, SOFT_GOLD, 0.8), keys: showAt(0.15, 0.164) },
      { name: "Abu Bakr's place: going from his stall to the places of the Muslims", svg: someone(abuBakr[0], abuBakr[1], 1.5, ABU_BAKR), keys: walking() },
      { name: "chosen: a soft golden ring about Abu Bakr's place", svg: care(abuBakr[0], n(abuBakr[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: walking({ opacity: [[0.172, 0], [0.184, 1]] }), loop: soft },
      { name: "Abu Bakr's voice", svg: arcs(n(abuBakr[0] + 2.4), n(abuBakr[1] - 3.2), ABU_BAKR), keys: walking({ opacity: spoken([[0.19, 0.96]]) }), loop: speaking },
      { name: "serving the Muslims: a soft golden ring about his place and theirs together", svg: care(140.4, 105.6, 18.4, 3.4, SOFT_GOLD), keys: showAt(0.878, 0.89), loop: soft },
      { name: "a spark rising from his place, among them", svg: glints([[end[0], n(end[1] - 3)]], 1.5), keys: sparkStays(0.9, 0.96, 8), loop: twinkle(900) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 2.4), n(aishah[1] - 3.2), AISHAH), keys: voice([[0.024, 0.09]]), loop: speaking }
    ],
    words: linesOn(EIGHT, [
      "Aishah: when Abu Bakr as-Siddiq was",
      "Chosen Caliph, he said: my people know",
      "That my profession was not incapable of",
      "Providing sustenance to my family. And",
      "As I will be busy serving the Muslim",
      "Nation, my family will eat from the",
      "National Treasury, and I will practice",
      "The profession of serving the Muslims."
    ])
  };
}

// Forbidden and disliked. Al-Mughirah ibn Shu'bah said: the Prophet ﷺ said: Allah has forbidden for you to be
// undutiful to your mothers, to bury your daughters alive, not to pay the rights of the others, and to beg of men.
// And Allah has hated for you vain, useless talk, or that you talk too much about others, to ask too many questions,
// and to waste the wealth (Sahih al-Bukhari 2408). The words leave out the daughters, the translator's words, and
// the numbers. No one is drawn, and nothing is drawn for Allah: in Madinah, the masjid far off; his place, a golden
// ring, and al-Mughirah's place on the left, and six small sights, each of a thing not to be done, three behind and
// three in front. Al-Mughirah's voice tells of it, and his voice, soft and golden, speaks. One by one: the place by
// an elder's home goes away from her, and a grey dashed ring comes about it; a faint way shows from a sack to the
// place whose right it is, with its empty bowl, but the sack stays, and a grey dashed ring comes about it; a place
// with an empty bowl goes from one door to the next, and a grey dashed ring comes about it; voices go back and forth
// between two places, then on about a third, and a grey dashed ring comes about them; small arcs of asking rise from
// a place, one after another, and a grey dashed ring comes about them; coins roll out of a purse and are lost, and a
// grey dashed ring comes about them.
function forbiddenAndDisliked(): SignArt {
  const mughirah: [number, number] = [9, 107.4];
  const his: [number, number] = [24, 101.6];
  // Behind: an elder's home; a sack withheld; two homes, one door to the next.
  const elderHome: [number, number] = [48, 92.4];
  const elder: [number, number] = [58.4, 95];
  const turning: [number, number] = [63.4, 96.4];
  const away: [number, number] = [8.6, 1.8];
  const owes: [number, number] = [84, 96];
  const sackAt: [number, number] = [89.6, 96.6];
  const owed: [number, number] = [103.4, 96];
  const bowlAt: [number, number] = [108, 96.8];
  const door1: [number, number] = [121.6, 94];
  const door2: [number, number] = [143.6, 94];
  // In front: two who talk, and a third they talk about; one who asks, and one asked; a purse and its coins.
  const talk: [number, number][] = [
    [40, 105.8],
    [60, 105.8]
  ];
  const third: [number, number] = [73, 106.6];
  const asks: [number, number] = [92, 105.6];
  const asked: [number, number] = [105, 105.6];
  const purseAt: [number, number] = [128, 106.4];
  const rolls: [number, number][] = [
    [-6.4, 1.2],
    [-3, 2],
    [4, 1.6],
    [7.6, 0.6]
  ];
  return {
    kind: "forbidden-and-disliked",
    ms: 11000,
    parts: [
      ...madinahDay([140, 18], [96, 22]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(4, 80, 0.4) },
      ...palms(
        [
          [34, 86, 9],
          [76, 84, 9],
          [156, 84, 10]
        ],
        "Madinah"
      ),
      // Undutiful.
      { name: "an elder's home", svg: home(elderHome[0], elderHome[1], 14, 9) },
      { name: "her place by her home", svg: someone(elder[0], elder[1], 1.4, ELDER) },
      {
        name: "undutiful: the place by her, turning away from her and going",
        svg: someone(turning[0], turning[1], 1.4, SOME),
        keys: track({
          xy: [
            [0.17, 0, 0],
            [0.22, away[0], away[1]]
          ]
        })
      },
      { name: "a grey dashed ring about the place gone from her", svg: greyRing(n(turning[0] + away[0]), n(turning[1] + away[1] + 0.4), 3.6, 2.4), keys: showAt(0.228, 0.24) },
      // The rights of others withheld.
      { name: "the place of one who keeps a sack by it", svg: someone(owes[0], owes[1], 1.4, SOME) + sack(sackAt[0], sackAt[1], 0.55) },
      { name: "the place whose right it is, with its empty bowl", svg: someone(owed[0], owed[1], 1.4, SOME) + smallBowl(bowlAt[0], bowlAt[1]) },
      { name: "a faint way from the sack to the place whose right it is", svg: way(`M${n(sackAt[0] + 3)} ${n(sackAt[1] - 0.6)} L${n(owed[0] - 2.4)} ${n(owed[1] + 0.4)}`, "#E9DDBA", 0.7), keys: showAt(0.312, 0.32) },
      { name: "withheld: a grey dashed ring about the sack, staying where it is", svg: greyRing(sackAt[0], n(sackAt[1] - 2), 3.4, 2.8), keys: showAt(0.34, 0.352) },
      // Begging.
      { name: "a home", svg: home(n(door1[0] + 2.4), 92, 11, 8) },
      { name: "and the next home", svg: home(n(door2[0] + 2.4), 92, 11, 8) },
      {
        name: "begging: a place with an empty bowl, going from one door to the next",
        svg: someone(door1[0], door1[1], 1.4, SOME) + smallBowl(n(door1[0] + 2.8), n(door1[1] + 1.2)),
        keys: track({
          xy: [
            [0.456, 0, 0],
            [0.5, n(door2[0] - door1[0]), 0]
          ]
        })
      },
      { name: "a grey dashed ring about it at the next door", svg: greyRing(n(door2[0] + 1.2), n(door1[1] + 0.6), 4.2, 2.6), keys: showAt(0.506, 0.518) },
      // Vain, useless talk, and too much about others.
      { name: "two places, talking", svg: talk.map(([x, y]) => someone(x, y, 1.4, SOME)).join("") },
      {
        name: "vain, useless talk: voices going back and forth between them",
        svg: arcs(n(talk[0][0] + 2.2), n(talk[0][1] - 3), SOME) + arcsLeft(n(talk[1][0] - 2.2), n(talk[1][1] - 3), SOME),
        keys: showAt(0.6, 0.61),
        loop: speaking
      },
      { name: "a third place, nearby", svg: someone(third[0], third[1], 1.4, SOME) },
      { name: "too much about others: their voices going on about the third", svg: arcs(n(talk[1][0] + 2.4), n(talk[1][1] - 2.4), SOME), keys: showAt(0.744, 0.752), loop: speaking },
      { name: "a grey dashed ring about the two who talk", svg: greyRing(50, n(talk[0][1] - 1.4), 12.6, 4.4), keys: showAt(0.66, 0.672) },
      // Too many questions.
      { name: "a place that asks, and the place asked", svg: someone(asks[0], asks[1], 1.4, SOME) + someone(asked[0], asked[1], 1.4, SOME) },
      ...[0, 1, 2, 3, 4].map(
        (i): SignPart => ({
          name: `too many questions: a small arc of asking ${i + 1}`,
          svg: askArc(n(asks[0] + 2.4 + i * 2), n(asks[1] - 2.8 - i * 0.9)),
          keys: showAt(at3(0.77 + i * 0.012), at3(0.776 + i * 0.012)),
          loop: speaking
        })
      ),
      { name: "a grey dashed ring about its asking", svg: greyRing(n(asks[0] + 6), n(asks[1] - 3.6), 7.4, 3.6), keys: showAt(0.888, 0.898) },
      // Wasting wealth.
      { name: "a purse, open", svg: purse(purseAt[0], purseAt[1]) },
      ...rolls.map(
        ([dx, dy], i): SignPart => ({
          name: `wasted: a coin rolling out of the purse and lost ${i + 1}`,
          svg: goldCoin(purseAt[0], n(purseAt[1] - 1.6), 1.1),
          keys: track({
            opacity: [
              [0.9, 0],
              [0.904, 1],
              [0.93, 1],
              [0.942, 0.45]
            ],
            xy: [
              [0.904, 0, 0],
              [0.94, n(dx * (1 + i * 0.15)), dy]
            ]
          })
        })
      ),
      { name: "a grey dashed ring about the wealth wasted", svg: greyRing(n(purseAt[0] + 0.6), n(purseAt[1] - 0.4), 11, 3.6), keys: showAt(0.948, 0.958) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.066, 0.96]]), loop: speaking },
      { name: "al-Mughirah's place", svg: someone(mughirah[0], mughirah[1], 1.5, MUGHIRAH) },
      { name: "al-Mughirah's voice: telling of it", svg: arcs(n(mughirah[0] + 2.4), n(mughirah[1] - 3.2), MUGHIRAH), keys: voice([[0.024, 0.06]]), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Al-Mughirah: he said: Allah has forbidden",
      "For you to be undutiful to your mothers,",
      "Not to pay the rights of the others, and",
      "To beg of men. And Allah has hated for you",
      "Vain, useless talk, or that you talk too",
      "Much about others, to ask too many",
      "Questions, and to waste the wealth."
    ])
  };
}

// Not while leaning. Abu Juhayfah said: Allah's Messenger ﷺ said: I do not take my meals while leaning (Sahih
// al-Bukhari 5398). The words leave out the translator's words. No one is drawn, and no hand: in Madinah, the masjid
// far off; his place, a golden ring, by a cloth spread on the ground, with bread and dates on it; a cushion to lean on,
// beside his place; and Abu Juhayfah's place on the left. Abu Juhayfah's voice tells of it, and his voice, soft and
// golden, speaks: a soft warm light comes over the meal. A grey dashed ring comes about the cushion: not while
// leaning. The dates go, one by one, and the bread grows less: he eats, upright.
function notWhileLeaning(): SignArt {
  const abuJuhayfah: [number, number] = [14, 106.4];
  const his: [number, number] = [78, 99.4];
  const dates: [number, number][] = [
    [80.4, 104.2],
    [82.4, 104.6],
    [84.4, 104.2]
  ];
  const loafAt: [number, number] = [73.4, 104.4];
  const cushionAt: [number, number] = [91.4, 100.4];
  return {
    kind: "not-while-leaning",
    ms: 6000,
    parts: [
      ...madinahDay([140, 18], [60, 24]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(6, 80, 0.4) },
      ...palms(
        [
          [46, 88, 10],
          [116, 88, 10],
          [150, 84, 10]
        ],
        "Madinah"
      ),
      { name: "a cloth spread on the ground", svg: cloth(68, 88, 102.6) },
      { name: "my meals: a soft warm light over the meal", svg: glow(78, 104, 8, "#FFF4D6", 0.3), keys: showAt(0.36, 0.372), loop: soft },
      {
        name: "bread on the cloth, growing less",
        svg: loaf(loafAt[0], loafAt[1]),
        origin: { x: n(loafAt[0] - 3.2), y: loafAt[1] },
        keys: track({
          scaleX: [
            [0.84, 1],
            [0.86, 0.6]
          ]
        })
      },
      ...dates.map(
        ([x, y], i): SignPart => ({
          name: `a date on the cloth ${i + 1}`,
          svg: aDate(x, y),
          keys: track({
            opacity: [
              [at3(0.72 + i * 0.04), 1],
              [at3(0.728 + i * 0.04), 0]
            ]
          })
        })
      ),
      { name: "a cushion to lean on, beside his place", svg: cushion(cushionAt[0], cushionAt[1]) },
      { name: "not while leaning: a grey dashed ring about the cushion", svg: greyRing(cushionAt[0], n(cushionAt[1] - 2), 7.6, 3.8), keys: showAt(0.676, 0.688) },
      { name: "his place, a golden ring, upright by the meal", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.35, 0.96]]), loop: speaking },
      { name: "Abu Juhayfah's place", svg: someone(abuJuhayfah[0], abuJuhayfah[1], 1.5, ABU_JUHAYFAH) },
      { name: "Abu Juhayfah's voice: telling of it", svg: arcs(n(abuJuhayfah[0] + 2.4), n(abuJuhayfah[1] - 3.2), ABU_JUHAYFAH), keys: voice([[0.024, 0.264]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Abu Juhayfah: Allah's Messenger said:", "I do not take my meals", "While leaning."])
  };
}

export const SERVE_ART = {
  "and-if-i-cannot": andIfICannot,
  "abu-bakrs-trade": abuBakrsTrade,
  "forbidden-and-disliked": forbiddenAndDisliked,
  "not-while-leaning": notWhileLeaning
};
