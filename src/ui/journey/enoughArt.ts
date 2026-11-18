import { animalAt, cloud, glow, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, jug, LIGHT, palms, sparkRising, track } from "./daysArt";
import { cloth, greyRing, soft, speaking } from "./fastArt";
import { food } from "./hopeArt";
import { dish } from "./worthArt";
import { coins, jar, stall } from "./tradeArt";
import { showAt, showFor } from "./roadArt";

/**
 * Enough, given and kept: the buyer who was cheated and told to say: no cheating; fresh dates eaten with cucumbers; the
 * worst food, a wedding feast for the rich alone; the meat that was charity for Barirah and a gift for him; the Ansar,
 * given until nothing was left, and patience, the best gift; the one who is given just enough and made content; and
 * the deeds most loved, the most constant, even if few. Only the land, the sky, buildings, things, plants and animals
 * are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face: where someone
 * was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air;
 * what changes hands moves by itself. Nothing is drawn for Allah, and nothing comes down from the sky: a deed is a
 * spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of dry grass. */
const enoughLand = (tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts);

/** Places of a group, each a small dashed circle of radius `r`. */
const placesAt = (list: [number, number][], r = 1.4) => list.map(([x, y]) => someone(x, y, r)).join("");

/** A place drawn at `a` that shows at `from` and goes to `b` by `to`. */
const comingFrom = (a: [number, number], b: [number, number], from: number, to: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.01), 1]
    ],
    xy: [
      [from, 0, 0],
      [to, n(b[0] - a[0]), n(b[1] - a[1])]
    ]
  });

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** Something drawn closer: `k` times its size about (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** A curve from (x1, y1) to (x2, y2), bowed up by `bow`, as an SVG path. */
const arc = (x1: number, y1: number, x2: number, y2: number, bow: number) => `M${n(x1)} ${n(y1)} Q${n((x1 + x2) / 2)} ${n((y1 + y2) / 2 - bow)} ${n(x2)} ${n(y2)}`;

// Say: no cheating. Abdullah ibn Umar said that a man mentioned to the Prophet ﷺ that he was cheated in his trading,
// and he said: when you buy, say: no cheating (Sahih al-Bukhari 2117). No one is drawn: by the masjid of Madinah, his
// place, a golden ring. From the market, with its stalls, comes the buyer's place, and the buyer's voice speaks. A faint
// line goes from it back to the seller's stall: coins show on the counter and a small sack, half empty; a grey ring
// comes about the sack, then about the buyer's place. His voice speaks, and a faint golden line goes from his place to
// the buyer's. The old trade is gone, and the buyer's place goes back to the stall; its voice speaks there, and a soft
// golden ring comes about it. The hadith tells no outcome after that, so none is drawn.
function sayNoCheating(): SignArt {
  const his: [number, number] = [34, 101.6];
  const market: [number, number] = [92, 105.6];
  const told: [number, number] = [50, 103.8];
  const counter = 96;
  const seller: [number, number] = [111.6, 92.6];
  const sackAt: [number, number] = [115, counter];
  const there = (t: number): [number, number, number] => [t, n(told[0] - market[0]), n(told[1] - market[1])];
  return {
    kind: "say-no-cheating",
    ms: 10000,
    parts: [
      ...daySky(124, 64, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: enoughLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([[66, 92.8, 12]]),
      { name: "a stall of the market", svg: stall(145, 18, "#5C8A4E", 84, 97) + jar(140.4, 97, 0.5, "#C98A4E") + jar(148.6, 97, 0.45) },
      { name: "the seller's stall", svg: stall(112, 20, "#D9534F", 82, counter) },
      { name: "goods on the counter: a jar", svg: jar(119, counter, 0.45, "#C98A4E") },
      { name: "the seller's place, behind the counter", svg: someone(seller[0], seller[1], 1.4, LIGHT) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "the buyer's place",
        svg: someone(market[0], market[1], 1.5),
        keys: track({ xy: [[0.03, 0, 0], there(0.11), there(0.65), [0.7, 0, 0]] })
      },
      { name: "the buyer's voice: cheated in trade", svg: arcsLeft(n(told[0] - 2), n(told[1] - 3.6), VOICE), keys: showFor(0.13, 0.14, 0.64, 0.65), loop: speaking },
      { name: "his trading: a faint line from the buyer's place to the stall", svg: way(arc(told[0] + 2.4, told[1] - 2.4, 100.4, 98.6, 6), "#E8DCC4", 0.6), keys: showFor(0.27, 0.29, 0.6, 0.62) },
      { name: "the price: coins on the counter", svg: coins(106.4, n(counter - 0.6), 3), keys: showFor(0.3, 0.31, 0.62, 0.63) },
      {
        name: "what came to the buyer: a small sack, half empty",
        svg: sack(sackAt[0], sackAt[1], 0.5, "#BCA67E") + `<path d="M${n(sackAt[0] - 1.4)} ${n(sackAt[1] - 1.8)} q1.4 -0.8 2.8 0" stroke="#8E7650" stroke-width="0.3" fill="none"/>`,
        keys: showFor(0.32, 0.33, 0.62, 0.63)
      },
      { name: "cheated: a grey ring about the small sack", svg: greyRing(sackAt[0], n(sackAt[1] - 1.8), 3, 2.4), keys: showFor(0.35, 0.37, 0.6, 0.62) },
      { name: "often cheated: a grey ring about the buyer's place", svg: greyRing(told[0], n(told[1] + 0.4), 3.2, 1.7), keys: showFor(0.41, 0.43, 0.6, 0.62) },
      { name: "his voice: when you buy", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      { name: "his teaching: a faint golden line from his place to the buyer's", svg: way(arc(his[0] + 3, his[1] - 2.6, told[0] - 2.2, told[1] - 2.8, 5), GOLD, 0.6), keys: showFor(0.55, 0.58, 0.64, 0.65) },
      { name: "the buyer's voice at the stall: no cheating", svg: arcs(n(market[0] + 2.2), n(market[1] - 3.8), VOICE), keys: showAt(0.77, 0.78), loop: speaking },
      { name: "no cheating: a soft golden ring about the buyer's place", svg: care(market[0], n(market[1] + 0.4), 3.2, 1.6, SOFT_GOLD), keys: showAt(0.8, 0.83), loop: soft }
    ],
    words: [
      { text: "A man told him", from: 0.02, to: 0.253 },
      { text: "that he was often cheated in trade", from: 0.268, to: 0.501 },
      { text: "He said: when you buy", from: 0.516, to: 0.749 },
      { text: "say: no cheating", from: 0.764, to: 1 }
    ]
  };
}

/** A fresh, ripe date (rutab), its middle at (x, y). */
const freshDate = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="0.95" ry="0.7" fill="#C27A2C"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.25)}" rx="0.36" ry="0.17" fill="#EDB862"/>`;

/** Fresh dates heaped on a dish, the dish's middle at (x, y). */
const freshDates = (x: number, y: number) =>
  dish(x, y) +
  (
    [
      [-2, -1.5],
      [0, -1.7],
      [2, -1.5],
      [-1, -2.8],
      [1, -2.8],
      [0, -3.9]
    ] as [number, number][]
  )
    .map(([dx, dy]) => freshDate(n(x + dx), n(y + dy)))
    .join("");

/** A snake cucumber, long and thin, from (x, y), `len` long and bowed up by `bow`. */
const snakeCucumber = (x: number, y: number, len: number, bow: number) =>
  `<path d="${arc(x, y, x + len, y, bow)}" stroke="#76A247" stroke-width="1.5" stroke-linecap="round" fill="none"/>` +
  `<path d="${arc(x + len * 0.18, y - bow * 0.3 - 0.35, x + len * 0.82, y - bow * 0.3 - 0.35, bow * 0.4)}" stroke="#B9D98C" stroke-width="0.35" stroke-linecap="round" fill="none"/>`;

/** Cucumber vines on the ground from x1 to x2 at y, with leaves and two snake cucumbers lying among them. */
const cucumberPatch = (x1: number, x2: number, y: number) => {
  const step = (x2 - x1) / 4;
  let vine = `M${x1} ${y}`;
  for (let i = 0; i < 4; i += 1) vine += ` Q${n(x1 + step * (i + 0.5))} ${n(y - (i % 2 ? -1 : 1.6))} ${n(x1 + step * (i + 1))} ${y}`;
  const leaves = Array.from({ length: 6 }, (_, i) => {
    const lx = n(x1 + step * 0.4 + i * step * 0.62);
    const ly = n(y - (i % 2 ? 0.2 : 1.4));
    return `<ellipse cx="${lx}" cy="${ly}" rx="1.5" ry="1" fill="${i % 2 ? "#5E8F3A" : "#6FA347"}"/>`;
  }).join("");
  return `<path d="${vine}" stroke="#4E7E30" stroke-width="0.5" fill="none"/>` + leaves + snakeCucumber(n(x1 + step * 0.6), n(y + 1.6), 7, 0.8) + snakeCucumber(n(x1 + step * 2.4), n(y + 2), 8, 1);
};

// Dates with cucumber. Abdullah ibn Ja'far said: I saw the Prophet ﷺ eating fresh dates with snake cucumbers (Sahih
// al-Bukhari 5447). No one is drawn: by his home, with its palms and a patch of snake cucumbers, a cloth is spread
// before his place, a golden ring. Abdullah ibn Ja'far's small place comes along, a faint line goes from it to his
// place, and Abdullah's voice speaks. A dish of fresh dates shows on the cloth, with glints, and a date goes from it to
// his place. Snake cucumbers, long and thin, show by the dish, and a date with a piece of cucumber goes to his place; a
// soft golden ring comes about the dates and the cucumbers.
function datesWithCucumber(): SignArt {
  const his: [number, number] = [44, 101.4];
  const abd0: [number, number] = [152, 105.6];
  const abd: [number, number] = [84, 105.2];
  const dishAt: [number, number] = [56, 104.2];
  const toHim: [number, number] = [n(his[0] + 2.4), n(his[1] - 0.6)];
  const date0: [number, number] = [n(dishAt[0] + 1.4), n(dishAt[1] - 3.9)];
  const piece0: [number, number] = [69, 102.4];
  const cukes: [number, number] = [68, 104];
  return {
    kind: "dates-with-cucumber",
    ms: 7000,
    parts: [
      ...daySky(24, 110, 7000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: enoughLand() },
      { name: "his home", svg: home(124, 94, 20, 12) },
      ...palms([
        [100, 92.6, 13],
        [8, 93, 11]
      ]),
      { name: "a patch of snake cucumbers by his home", svg: cucumberPatch(136, 156, 104.6) },
      { name: "a cloth before his place", svg: cloth(50, 76, 102.2) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Abdullah ibn Ja'far's small place", svg: someone(abd0[0], abd0[1], 1.1), keys: comingFrom(abd0, abd, 0.03, 0.12) },
      { name: "I saw him: a faint line from Abdullah's place to his place", svg: way(arc(abd[0] - 2, abd[1] - 2.4, his[0] + 3.4, his[1] - 2.6, 7), "#E8DCC4", 0.6), keys: showAt(0.15, 0.18) },
      { name: "Abdullah's voice: I saw him", svg: arcsLeft(n(abd[0] - 1.8), n(abd[1] - 3.4), VOICE), keys: showAt(0.21, 0.22), loop: speaking },
      { name: "fresh dates: ripe dates on a dish", svg: big(freshDates(dishAt[0], dishAt[1]), dishAt[0], dishAt[1], 1.4), keys: showAt(0.35, 0.37) },
      {
        name: "fresh and ripe: glints over the dates",
        svg: glints([
          [n(dishAt[0] - 4.4), n(dishAt[1] - 6.4)],
          [n(dishAt[0] + 4.2), n(dishAt[1] - 7)]
        ]),
        keys: showAt(0.38, 0.4),
        loop: speaking
      },
      {
        name: "eating: a fresh date, taken",
        svg: big(freshDate(date0[0], date0[1]), date0[0], date0[1], 1.4),
        keys: track({
          opacity: [
            [0.41, 0],
            [0.42, 1],
            [0.5, 1],
            [0.52, 0]
          ],
          xy: [
            [0.42, 0, 0],
            [0.47, n(toHim[0] - date0[0]), n(toHim[1] - date0[1])]
          ]
        })
      },
      { name: "snake cucumbers, long and thin, by the dish", svg: big(snakeCucumber(63.4, 104.8, 9, 1) + snakeCucumber(64.6, 103.2, 8, 0.8), cukes[0], cukes[1], 1.3), keys: showAt(0.68, 0.7) },
      {
        name: "with cucumbers: a fresh date and a piece of cucumber, taken",
        svg: big(
          freshDate(n(piece0[0] - 1.6), piece0[1]) + `<ellipse cx="${n(piece0[0] + 0.6)}" cy="${piece0[1]}" rx="1.2" ry="0.6" fill="#76A247"/><ellipse cx="${n(piece0[0] + 0.6)}" cy="${piece0[1]}" rx="0.7" ry="0.32" fill="#D9EBB6"/>`,
          piece0[0],
          piece0[1],
          1.3
        ),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.73, 1],
            [0.82, 1],
            [0.84, 0]
          ],
          xy: [
            [0.74, 0, 0],
            [0.79, n(toHim[0] - piece0[0]), n(toHim[1] - piece0[1])]
          ]
        })
      },
      { name: "together: a soft golden ring about the dates and the cucumbers", svg: care(62.6, 103.4, 13, 3.4, SOFT_GOLD), keys: showAt(0.88, 0.91), loop: soft }
    ],
    words: [
      { text: "Abdullah ibn Ja'far said: I saw him", from: 0.02, to: 0.33 },
      { text: "eating fresh dates", from: 0.345, to: 0.655 },
      { text: "with snake cucumbers", from: 0.67, to: 1 }
    ]
  };
}

/** A fine, tall home, its foot's middle at (x, y), with a coloured band below its roof and two windows. */
const fineHome = (x: number, y: number, w: number, h: number, wall: string, band: string) =>
  home(x, y, w, h, wall, "#B88E5E") +
  `<rect x="${n(x - w / 2)}" y="${n(y - h + 0.6)}" width="${w}" height="1.1" fill="${band}"/>` +
  `<rect x="${n(x - w / 2 + 1.8)}" y="${n(y - h + 2.4)}" width="2.6" height="2.6" fill="#6B4A2E"/>`;

/** A small, low hut of mud, its foot's middle at (x, y). */
const hut = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#BFA27A", "#A88B66", "#5E4630");

// The worst feast. Abu Hurairah used to say: the worst food is the food of a wedding feast to which the rich are
// invited and the poor are left out; and whoever turns down the invitation has disobeyed Allah and His Messenger ﷺ
// (Sahih al-Bukhari 5177). No one is drawn: Abu Hurairah's place stands at one side, and his voice speaks. Food shows
// on a cloth before a home; warm lights show by its door, a wedding. Faint golden lines go from it to the fine homes of
// the rich, and two of their places come to the food; the places of the poor stay by their huts, and a grey ring comes
// about them, and a grey haze over the feast. At the second fine home, its place turns and goes in at its door: a grey
// ring comes about the door, its golden line turns grey, and a grey haze comes about that home.
function theWorstFeast(): SignArt {
  const abu: [number, number] = [10, 104.6];
  const poor: [number, number][] = [
    [29, 103.4],
    [38.6, 104.8],
    [48, 103.4]
  ];
  const r1: [number, number] = [120.2, 99.4];
  const r2: [number, number] = [128, 100.4];
  const r3: [number, number] = [141.6, 99.6];
  const door3: [number, number] = [144.2, 94.6];
  const feast: [number, number][] = [
    [70, 103],
    [78, 103.2],
    [86, 103.2],
    [94, 103]
  ];
  const lineTo3 = arc(91.6, 86.4, 136.6, 84.4, 10);
  return {
    kind: "the-worst-feast",
    ms: 12000,
    parts: [
      ...daySky(60, 128, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: enoughLand() },
      { name: "the huts of the poor", svg: hut(32, 96, 10, 7) + hut(47, 96.4, 10, 6.8) },
      { name: "the wedding home", svg: home(82, 94, 20, 13) },
      { name: "the fine homes of the rich", svg: fineHome(122, 93, 18, 15, "#EBCB94", "#3E7CA8") + fineHome(146, 93, 18, 17, "#E6BE86", "#A8453E") },
      { name: "Abu Hurairah's place", svg: someone(abu[0], abu[1], 1.5) },
      { name: "Abu Hurairah's voice: the worst food", svg: arcs(n(abu[0] + 2.4), n(abu[1] - 3.6), VOICE), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "the food: dishes on a cloth", svg: cloth(66, 98, 100.8, "#F2E6C8") + feast.map(([x, y]) => food(x, y)).join(""), keys: showAt(0.07, 0.09) },
      {
        name: "a wedding: warm lights by its door",
        svg: [75, 82, 89].map((x) => glow(x, 85, 2.4, WARM, 0.55) + `<circle cx="${x}" cy="85" r="0.8" fill="#FFE7A0"/>`).join(""),
        keys: showAt(0.19, 0.21),
        loop: { move: "twinkle", ms: 1600, low: 0.6 }
      },
      { name: "a wedding: a soft golden glow about the home", svg: glow(82, 88, 13, WARM, 0.16), keys: showAt(0.24, 0.27) },
      { name: "the places of the poor, by their huts", svg: placesAt(poor, 1.4) },
      { name: "invited: a faint golden line to the first fine home", svg: way(arc(91.6, 88.4, 112.6, 88, 5), GOLD, 0.6), keys: showAt(0.36, 0.38) },
      { name: "invited: a faint golden line to the second fine home", svg: way(lineTo3, GOLD, 0.6), keys: showFor(0.36, 0.38, 0.86, 0.88) },
      { name: "the places of the rich: one", svg: someone(r1[0], r1[1], 1.5), keys: track({ xy: [[0.39, 0, 0], [0.45, n(102.4 - r1[0]), n(102.6 - r1[1])]] }) },
      { name: "the places of the rich: two", svg: someone(r2[0], r2[1], 1.5), keys: track({ xy: [[0.39, 0, 0], [0.45, n(96 - r2[0]), n(106.2 - r2[1])]] }) },
      { name: "left out: a grey ring about the places of the poor", svg: greyRing(38.6, 104.4, 13.4, 3.2), keys: showAt(0.52, 0.54) },
      { name: "the worst food: a grey haze over the feast", svg: wash(82, 102.6, 20, 4.2, "#6E6E6E", 0.2), keys: showAt(0.57, 0.6) },
      {
        name: "the places of the rich: three, turning down the invitation",
        svg: someone(r3[0], r3[1], 1.5),
        keys: track({
          opacity: [
            [0.72, 1],
            [0.74, 0]
          ],
          xy: [
            [0.69, 0, 0],
            [0.73, n(door3[0] - r3[0]), n(door3[1] - r3[1])]
          ]
        })
      },
      { name: "turned down: a grey ring about its door", svg: greyRing(door3[0], n(door3[1] - 2.6), 3.2, 3.4), keys: showAt(0.75, 0.77) },
      { name: "turned down: the line to the second fine home, grey", svg: way(lineTo3, "#9A9A9A", 0.6), keys: showAt(0.86, 0.88) },
      { name: "disobeyed: a grey haze about the second fine home", svg: wash(146, 84.6, 11, 10.4, "#6E6E6E", 0.18), keys: showAt(0.86, 0.89) }
    ],
    words: [
      { text: "Abu Hurairah said: the worst food", from: 0.02, to: 0.17 },
      { text: "is that of a wedding feast", from: 0.185, to: 0.335 },
      { text: "to which only the rich are invited", from: 0.35, to: 0.5 },
      { text: "and the poor are left out", from: 0.515, to: 0.665 },
      { text: "Whoever turns down the invitation", from: 0.68, to: 0.83 },
      { text: "has disobeyed Allah and His Messenger", from: 0.845, to: 1 }
    ]
  };
}

/** Cooked meat on a dish, the dish's middle at (x, y). */
const meat = (x: number, y: number) =>
  dish(x, y) +
  `<path d="M${n(x - 2.4)} ${n(y - 1.1)} Q${n(x - 2.8)} ${n(y - 3.2)} ${n(x - 0.6)} ${n(y - 3.5)} Q${n(x + 2.2)} ${n(y - 3.8)} ${n(x + 2.5)} ${n(y - 1.4)} Z" fill="#94522F"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 2.6)} Q${n(x - 0.2)} ${n(y - 3.3)} ${n(x + 1.5)} ${n(y - 2.8)}" stroke="#B9744A" stroke-width="0.5" fill="none" stroke-linecap="round"/>`;

// Charity for her, a gift for us. Anas said: meat was brought to the Prophet ﷺ that had been given to Barirah in
// charity. He said: it is charity for her, and for us it is a gift (Sahih al-Bukhari 1495). No one is drawn: by the
// masjid of Madinah and his home, his place, a golden ring, and Barirah's place. Meat on a dish goes from Barirah's
// place to his. Far off, the place of one who gave in charity shows, and a faint golden way goes from it to Barirah's
// place; a soft white ring comes about the meat. His voice speaks; a faint line goes from the meat to Barirah's place,
// and a soft white ring comes about her place. The white ring about the meat goes; glints show over it, a soft golden
// ring comes about it, and a soft golden glow about his place and his home.
function charityForBarirah(): SignArt {
  const his: [number, number] = [54, 101.8];
  const barirah: [number, number] = [80, 104.4];
  const giver: [number, number] = [136, 104];
  const meat0: [number, number] = [75, 105.4];
  const meatAt: [number, number] = [62.4, 105];
  return {
    kind: "charity-for-barirah",
    ms: 9000,
    parts: [
      ...daySky(136, 50, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: enoughLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      { name: "his home", svg: home(38, 94, 16, 11) },
      ...palms([
        [104, 92.6, 12],
        [152, 93, 11]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Barirah's place", svg: someone(barirah[0], barirah[1], 1.5) },
      { name: "brought to him: meat on a dish", svg: meat(meat0[0], meat0[1]), keys: track({ xy: [[0.04, 0, 0], [0.12, n(meatAt[0] - meat0[0]), n(meatAt[1] - meat0[1])]] }) },
      { name: "the place of one who gave in charity, far off", svg: someone(giver[0], giver[1], 1.5), keys: showAt(0.27, 0.28) },
      { name: "given to Barirah: a faint golden way from the giver's place to hers", svg: way(arc(giver[0] - 3, giver[1] - 1.6, barirah[0] + 3, barirah[1] - 1.6, 6), SOFT_GOLD, 0.7), keys: showAt(0.29, 0.32) },
      { name: "in charity: a soft white ring about the meat", svg: care(meatAt[0], n(meatAt[1] - 0.6), 4.6, 2.4, "#FFFFFF"), keys: showFor(0.36, 0.39, 0.77, 0.79), loop: soft },
      { name: "his voice: it is charity for her", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      { name: "charity for her: a faint line from the meat to Barirah's place", svg: way(arc(meatAt[0] + 3.2, meatAt[1] - 3.6, barirah[0] - 2, barirah[1] - 2.8, 4), "#FFFFFF", 0.6), keys: showAt(0.55, 0.58) },
      { name: "hers: a soft white ring about Barirah's place", svg: care(barirah[0], n(barirah[1] + 0.4), 3.2, 1.6, "#FFFFFF"), keys: showAt(0.6, 0.63), loop: soft },
      {
        name: "a gift: glints over the meat",
        svg: glints([
          [n(meatAt[0] - 2.6), n(meatAt[1] - 5.4)],
          [n(meatAt[0] + 2.8), n(meatAt[1] - 5.8)]
        ]),
        keys: showAt(0.8, 0.82),
        loop: speaking
      },
      { name: "a gift for us: a soft golden ring about the meat", svg: care(meatAt[0], n(meatAt[1] - 0.6), 4.6, 2.4, SOFT_GOLD), keys: showAt(0.84, 0.87), loop: soft },
      { name: "for us: a soft golden glow about his place and his home", svg: glow(46, 99.6, 11, WARM, 0.2), keys: showAt(0.89, 0.92) }
    ],
    words: [
      { text: "Meat was brought to him", from: 0.02, to: 0.253 },
      { text: "that was given to Barirah in charity", from: 0.268, to: 0.501 },
      { text: "He said: it is charity for her", from: 0.516, to: 0.749 },
      { text: "and for us it is a gift", from: 0.764, to: 1 }
    ]
  };
}

// The best gift. Abu Sa'id al-Khudri said: some of the Ansar asked the Messenger of Allah ﷺ, and he gave them; then
// they asked him, and he gave them, until what he had ran out. He said: whatever good I have, I will never keep it from
// you. Whoever keeps from asking, Allah keeps him chaste; whoever seeks to be free of need, Allah makes him free of
// need; and whoever bears up, Allah makes him patient; and no one is given a gift better and vaster than patience
// (Sahih al-Bukhari 1469). No one is drawn: by the masjid of Madinah, his place, a golden ring, with sacks on a cloth
// beside it. The places of the Ansar stand before it; their voice asks, and two sacks go to them; their voice asks
// again, and a third goes; then the last, and the cloth is empty. His voice speaks, and a faint golden line goes from
// his place to theirs. A soft ring comes about one of their places, and a warm glow; golden glints show over it, and a
// soft golden glow comes about it.
function theBestGift(): SignArt {
  const his: [number, number] = [32, 101.6];
  const ansar: [number, number][] = [
    [76, 104.6],
    [86, 103],
    [96, 104.8],
    [106, 103.2]
  ];
  const sacks: [number, number][] = [
    [41.6, 105.2],
    [46.4, 105.2],
    [51.2, 105.2],
    [56, 105.2]
  ];
  const given: [number, number, number][] = [
    [0.06, 0.09, 0],
    [0.08, 0.11, 1],
    [0.22, 0.26, 2],
    [0.36, 0.4, 3]
  ];
  const patient = ansar[1];
  return {
    kind: "the-best-gift",
    ms: 12000,
    parts: [
      ...daySky(26, 100, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: enoughLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [124, 92.6, 12],
        [150, 93, 11]
      ]),
      { name: "what he had: a cloth beside his place", svg: cloth(38, 58, 102.4) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the places of the Ansar", svg: placesAt(ansar, 1.5) },
      {
        name: "the voice of the Ansar, asking",
        svg: arcsLeft(n(ansar[0][0] - 2.2), n(ansar[0][1] - 3.6), VOICE),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1],
            [0.115, 1],
            [0.12, 0],
            [0.19, 0],
            [0.2, 1],
            [0.28, 1],
            [0.285, 0]
          ]
        }),
        loop: speaking
      },
      ...given.map(([from, to, i]): SignPart => {
        const [x, y] = sacks[i];
        const [px, py] = ansar[i];
        return {
          name: `he gave them: a sack ${i + 1}`,
          svg: sack(x, y, 0.62),
          keys: track({ xy: [[from, 0, 0], [to, n(px + 3.2 - x), n(py + 1.2 - y)]] })
        };
      }),
      { name: "all given: a soft white ring about the empty cloth", svg: care(48, 104, 11, 2.4, "#FFFFFF"), keys: showAt(0.42, 0.45), loop: soft },
      { name: "his voice: I would never keep it from you", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      { name: "never kept back: a faint golden line from his place to theirs", svg: way(arc(his[0] + 3.4, his[1] - 2.6, ansar[3][0] - 2, ansar[3][1] - 3, 10), GOLD, 0.6), keys: showAt(0.55, 0.58) },
      { name: "bearing up: a soft ring about one place", svg: care(patient[0], n(patient[1] + 0.4), 3, 1.6, SOFT_GOLD), keys: showAt(0.69, 0.72), loop: soft },
      { name: "made patient: a warm glow about that place", svg: glow(patient[0], n(patient[1] - 1), 5, WARM, 0.3), keys: showAt(0.74, 0.77) },
      {
        name: "patience, the best gift: golden glints over that place",
        svg: glints(
          [
            [n(patient[0] - 3), n(patient[1] - 5)],
            [n(patient[0] + 3), n(patient[1] - 5.6)],
            [patient[0], n(patient[1] - 7.4)]
          ],
          1.1
        ),
        keys: showAt(0.85, 0.87),
        loop: speaking
      },
      { name: "better and vaster: a soft golden glow about that place", svg: glow(patient[0], n(patient[1] - 2), 9, WARM, 0.22), keys: showAt(0.89, 0.92) }
    ],
    words: [
      { text: "Some of the Ansar asked him; he gave them", from: 0.02, to: 0.17 },
      { text: "they asked again, and he gave them", from: 0.185, to: 0.335 },
      { text: "until what he had ran out", from: 0.35, to: 0.5 },
      { text: "He said: I would never keep good from you", from: 0.515, to: 0.665 },
      { text: "whoever bears up, Allah makes him patient", from: 0.68, to: 0.83 },
      { text: "none is given a gift better than patience", from: 0.845, to: 1 }
    ]
  };
}

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

// Content with enough. Abdullah ibn Amr said that the Messenger of Allah ﷺ said: successful is the one who has
// accepted Islam, is given just what is enough, and whom Allah makes content with what He has given him (Sahih Muslim
// 1054). No one is drawn: by the masjid of Madinah, his place, a golden ring, and his voice; a soft golden ring comes
// about the place of one by a modest home. A faint golden way goes from that place to the masjid, and golden glints
// show over it. A loaf and a few dates on a dish show by it, and a jug of water: just enough. A warm glow comes about
// the place, glints show over the dish, and a soft golden glow over the home.
function contentWithEnough(): SignArt {
  const his: [number, number] = [32, 101.6];
  const one: [number, number] = [110, 103.8];
  const dishAt: [number, number] = [102.2, 105.6];
  return {
    kind: "content-with-enough",
    ms: 9000,
    parts: [
      ...daySky(132, 76, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: enoughLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [60, 92.6, 12],
        [150, 93.4, 11]
      ]),
      { name: "a modest home", svg: home(122, 94.6, 14, 9, "#CDAE7E", "#B39468") },
      { name: "a sheep by the home, grazing", svg: sheep(140, 105.6, 0.11), loop: { move: "bob", ms: 2600, y: -0.3 } },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the place of one by a modest home", svg: someone(one[0], one[1], 1.5) },
      { name: "his voice: successful is one who", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "successful: a soft golden ring about that place", svg: care(one[0], n(one[1] + 0.4), 3.2, 1.7, SOFT_GOLD), keys: showAt(0.08, 0.11), loop: soft },
      { name: "accepted Islam: a faint golden way from that place to the masjid", svg: way(`M${n(one[0] - 2.6)} ${n(one[1] - 2.2)} Q70 90 22.6 93.4`, SOFT_GOLD, 0.8), keys: showAt(0.28, 0.31) },
      {
        name: "a Muslim: golden glints over that place",
        svg: glints([
          [n(one[0] - 2.8), n(one[1] - 5)],
          [n(one[0] + 2.8), n(one[1] - 5.6)]
        ]),
        keys: showAt(0.34, 0.37),
        loop: speaking
      },
      { name: "just enough: a loaf and a few dates on a dish", svg: food(dishAt[0], dishAt[1]), keys: showAt(0.53, 0.55) },
      { name: "just enough: a jug of water", svg: jug(95.6, 106.6), keys: showAt(0.57, 0.59) },
      { name: "content: a warm glow about that place", svg: glow(one[0], n(one[1] - 1), 6, WARM, 0.32), keys: showAt(0.78, 0.82) },
      {
        name: "content with it: glints over the dish",
        svg: glints([
          [n(dishAt[0] - 2.4), n(dishAt[1] - 5)],
          [n(dishAt[0] + 2.6), n(dishAt[1] - 5.4)]
        ]),
        keys: showAt(0.84, 0.86),
        loop: speaking
      },
      { name: "content: a soft golden glow over the home", svg: wash(118, 98, 18, 7, WARM, 0.12), keys: showAt(0.88, 0.92) }
    ],
    words: [
      { text: "He said: successful is one who", from: 0.02, to: 0.253 },
      { text: "has accepted Islam", from: 0.268, to: 0.501 },
      { text: "is given just what is enough", from: 0.516, to: 0.749 },
      { text: "and whom Allah makes content with it", from: 0.764, to: 1 }
    ]
  };
}

/** Night over the whole scene, laid on what is under it. */
const NIGHT = `<rect width="160" height="120" fill="#0F1C3A" opacity="0.52"/>`;

/** Stars in the night sky. */
const NIGHT_STARS = stars([
  [16, 16],
  [38, 28],
  [62, 12],
  [88, 24],
  [112, 14],
  [138, 26],
  [152, 12],
  [26, 44],
  [128, 42]
]);

/** A short upright mark scratched on a wall, its foot at (x, y): a day counted. */
const tally = (x: number, y: number) => `<path d="M${x} ${y} L${x} ${n(y - 2.6)}" stroke="#FFFFFF" stroke-width="0.6" stroke-linecap="round"/>`;

// Constant deeds. Aishah said: the Prophet ﷺ was asked: which deeds are most loved by Allah? He said: the most
// constant of them, even if they are few. And he said: take on of deeds what you can bear (Sahih al-Bukhari 6465). And
// he said: know that the deed most loved by Allah is the most constant, even if it is little (Sahih al-Bukhari 6464).
// No one is drawn: by the masjid of Madinah, his place, a golden ring, and the place of one asking, whose voice speaks.
// His voice speaks; by a home, a small spark rises from the place of one who does a deed, and a mark shows on the
// home's wall: a day. Night comes and goes, and it is so again, day after day: four small sparks, four marks. A soft
// golden ring comes about the marks. His voice speaks again; a soft golden ring comes about the place, a soft golden
// glow over the home, and golden glints over the marks.
function constantDeeds(): SignArt {
  const his: [number, number] = [32, 101.6];
  const asker: [number, number] = [48, 104.4];
  const doer: [number, number] = [112, 103.8];
  const nights: [number, number][] = [
    [0.37, 0],
    [0.38, 0.85],
    [0.39, 0.85],
    [0.4, 0],
    [0.52, 0],
    [0.53, 0.85],
    [0.54, 0.85],
    [0.55, 0],
    [0.61, 0],
    [0.62, 0.85],
    [0.63, 0.85],
    [0.64, 0]
  ];
  const night = track({ opacity: nights });
  const days: [number, number, number, number][] = [
    [0.3, 0.36, 0.33, 129.4],
    [0.41, 0.455, 0.43, 130.8],
    [0.56, 0.6, 0.58, 132.2],
    [0.65, 0.69, 0.67, 133.6]
  ];
  return {
    kind: "constant-deeds",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(70, 20), keys: track({ opacity: nights.map(([t, v]): [number, number] => [t, v > 0 ? 0 : 1]) }) },
      { name: "a cloud", svg: cloud(110, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: enoughLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [74, 92.6, 12],
        [152, 93, 11]
      ]),
      { name: "a home", svg: home(126, 94, 18, 11) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the place of one asking", svg: someone(asker[0], asker[1], 1.5) },
      { name: "a voice asking: which deeds are most loved?", svg: arcsLeft(n(asker[0] - 2.2), n(asker[1] - 3.6), VOICE), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "the place of one who does a deed, by the home", svg: someone(doer[0], doer[1], 1.5) },
      { name: "his voice: the most constant", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.27, 0.28, 0.45, 0.455), loop: speaking },
      ...days.map(([from, to], i): SignPart => ({
        name: `a deed, a little each day: a small spark rising ${i + 1}`,
        svg: sparkle(doer[0], n(doer[1] - 3.2), 1.4, SPARK),
        keys: sparkRising(from, to, 10),
        loop: speaking
      })),
      ...days.map(([, , markAt, x], i): SignPart => ({ name: `a day kept: a mark on the home's wall ${i + 1}`, svg: tally(x, 92), keys: showAt(markAt, at3(markAt + 0.005)) })),
      { name: "night", svg: NIGHT, keys: night },
      { name: "stars", svg: NIGHT_STARS, keys: night, loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "few, but constant: a soft golden ring about the marks", svg: care(131.5, 90.6, 3.6, 2.2, SOFT_GOLD), keys: showAt(0.695, 0.705), loop: soft },
      { name: "his voice: take on what you can bear", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.77, 0.78), loop: speaking },
      { name: "what one can bear: a soft golden ring about the place", svg: care(doer[0], n(doer[1] + 0.4), 3.2, 1.7, SOFT_GOLD), keys: showAt(0.8, 0.83), loop: soft },
      { name: "loved: a soft golden glow over the home", svg: wash(122, 97, 20, 8, WARM, 0.12), keys: showAt(0.86, 0.9) },
      {
        name: "kept up: golden glints over the marks",
        svg: glints([
          [128.6, 87.6],
          [134.4, 87]
        ]),
        keys: showAt(0.91, 0.93),
        loop: speaking
      }
    ],
    words: [
      { text: "He was asked which deeds Allah loves most", from: 0.02, to: 0.253 },
      { text: "He said: the most constant", from: 0.268, to: 0.501 },
      { text: "even if they are few", from: 0.516, to: 0.749 },
      { text: "and said: take on deeds you can bear", from: 0.764, to: 1 }
    ]
  };
}

export const ENOUGH_ART = {
  "say-no-cheating": sayNoCheating,
  "dates-with-cucumber": datesWithCucumber,
  "the-worst-feast": theWorstFeast,
  "charity-for-barirah": charityForBarirah,
  "the-best-gift": theBestGift,
  "content-with-enough": contentWithEnough,
  "constant-deeds": constantDeeds
};
