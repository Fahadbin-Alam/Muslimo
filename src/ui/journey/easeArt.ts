import { cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, jug, palms, sparkRising, tent, track } from "./daysArt";
import { cloth, date, greyRing, soft, speaking } from "./fastArt";
import { cup, food } from "./hopeArt";
import { restingCamel, showAt, showFor } from "./roadArt";

/**
 * Ease and plain ways: his choice of the easier of two things, never a sin; his words, so clear they could be counted;
 * the date of the sadaqah that al-Hasan had to throw out; vinegar, all there was at home, and praised; the talbiyah
 * as his camel stood up at Dhul-Hulayfah; Umm al-Fadl's bowl of milk at Arafah; and the days of Tashriq, for eating,
 * drinking and remembering Allah. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet,
 * no Companion and no person is ever drawn, not even a hand, a foot or a face, and no one is drawn on a camel: where
 * someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the
 * air. Nothing is drawn for Allah, and nothing comes down from the sky: dhikr is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A grey for what is hard or not to be done. */
const GREY = "#8C8C8C";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of dry grass. */
const easeLand = (tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts);

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

/** A row of `count` places from x1, `step` apart, on y, each `r` across. */
const row = (x1: number, step: number, y: number, count: number, r = 1.2) =>
  placesAt(
    Array.from({ length: count }, (_, i) => [n(x1 + i * step), n(y + (i % 2 ? 0.6 : 0))] as [number, number]),
    r
  );

/** A stone, its middle at (x, y), `r` across. */
const stone = (x: number, y: number, r: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.62)}" fill="#8C765A"/><ellipse cx="${n(x - r * 0.3)}" cy="${n(y - r * 0.22)}" rx="${n(r * 0.5)}" ry="${n(r * 0.26)}" fill="#B49E7E"/>`;

/** The mount of Arafat on the far side of the plain, strewn with boulders. */
const ARAFAT =
  `<path d="M34 79 Q44 71 54 67 Q60 62 68 60.2 Q76 57 84 58.2 Q92 59 99 62.6 Q110 67 126 79 Z" fill="#A08A6C"/>` +
  (
    [
      [56, 67.4, 3.2],
      [66, 62.6, 2.8],
      [78, 59.8, 3.4],
      [90, 61.4, 3],
      [100, 66, 3.4],
      [62, 72.6, 3.6],
      [84, 66.8, 4],
      [106, 73, 3.2],
      [48, 74.4, 3]
    ] as [number, number, number][]
  )
    .map(([x, y, r]) => stone(x, y, r))
    .join("");

// The easier of two. Aishah said: whenever the Messenger of Allah ﷺ had a choice between two things, he took the
// easier of them, as long as it was not a sin; and if it was a sin, he was the farthest of people from it. And he
// never took revenge for himself, unless the sanctities of Allah were violated; then he took revenge for Allah (Sahih
// al-Bukhari 3560). No one is drawn: his place, a golden ring, stands where a way divides, and two ways show: a steep,
// rocky way up a hill, and a smooth, level way along the land. A soft golden glow comes along the level way, and his
// place goes along it; a soft white glow and glints come on it. A grey way shows ahead, branching off to a grey haze,
// and his place goes back, far from it, with a soft golden ring. A grey place comes, and a small grey mark shows by
// his place; the grey place goes off again, unharmed, the mark fades, and a soft golden glow comes about his place.
function theEasierOfTwo(): SignArt {
  const his: [number, number] = [22, 102.4];
  const back: [number, number] = [36, 102.8];
  const wrong: [number, number] = [52, 103.2];
  return {
    kind: "the-easier-of-two",
    ms: 10000,
    parts: [
      ...daySky(30, 70, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: easeLand() },
      {
        name: "a steep hill",
        svg: `<path d="M64 99 Q84 84 104 76 Q120 69 136 66 Q148 64 160 65 L160 99 Z" fill="#C2A87C"/><path d="M64 99 Q84 84 104 76 Q120 69 136 66 Q148 64 160 65" stroke="#A88E62" stroke-width="0.6" fill="none"/>`
      },
      {
        name: "the hard one: a steep, rocky way up the hill",
        svg:
          `<path d="M27 101.6 Q44 99.6 60 97.6 L70 93.4 L80 94 L90 87.6 L100 88 L110 81.2 L120 81.6 L132 74.6 L144 72" stroke="#D9C49A" stroke-width="1.8" fill="none" stroke-linejoin="round"/>` +
          (
            [
              [66, 96.4, 1.4],
              [76, 92.4, 1.2],
              [86, 90.6, 1.5],
              [97, 86, 1.2],
              [106, 83.6, 1.5],
              [117, 79.4, 1.2],
              [128, 76.8, 1.4],
              [140, 72.6, 1.2]
            ] as [number, number, number][]
          )
            .map(([x, y, r]) => stone(x, y, r))
            .join(""),
        keys: showAt(0.04, 0.07)
      },
      {
        name: "the easier one: a smooth, level way",
        svg: `<path d="M27 104.4 L158 104.4" stroke="#D2B98A" stroke-width="3" stroke-linecap="round"/><path d="M27 104.4 L158 104.4" stroke="#F1E4C4" stroke-width="2.2" stroke-linecap="round"/>`,
        keys: showAt(0.09, 0.12)
      },
      { name: "taken: a soft golden glow along the level way", svg: wash(66, 104.2, 34, 3, SOFT_GOLD, 0.1), keys: showAt(0.23, 0.26) },
      { name: "not a sin: a soft white glow along the level way", svg: wash(96, 104.2, 40, 3.2, "#FFFFFF", 0.14), keys: showAt(0.43, 0.47) },
      {
        name: "clear: glints along the level way",
        svg: glints([
          [84, 100.6],
          [104, 100.2],
          [124, 100.6]
        ]),
        keys: showAt(0.47, 0.5),
        loop: speaking
      },
      {
        name: "a sin: a grey way, branching off",
        svg: `<path d="M90 104.4 Q104 105.8 116 106.6 Q126 107.2 134 106.4" stroke="#9A9A9A" stroke-width="1.2" stroke-dasharray="1.6 1.2" fill="none" stroke-linecap="round"/>`,
        keys: showAt(0.62, 0.645)
      },
      { name: "a sin: a grey haze at its end", svg: wash(140, 105.6, 9, 3.6, "#6E6E6E", 0.14) + greyRing(140, 105.8, 6, 2.6), keys: showAt(0.64, 0.665) },
      {
        name: "his place, a golden ring",
        svg: ring(his[0], his[1], 2.4, GOLD),
        keys: track({
          xy: [
            [0.26, 0, 0],
            [0.34, 44, 0.4],
            [0.67, 44, 0.4],
            [0.72, n(back[0] - his[0]), n(back[1] - his[1])]
          ]
        })
      },
      { name: "far from it: a soft golden ring about his place", svg: care(back[0], n(back[1] + 0.4), 4.2, 2, SOFT_GOLD), keys: showAt(0.73, 0.75), loop: soft },
      {
        name: "one who wronged him: a grey place, going off unharmed",
        svg: someone(wrong[0], wrong[1], 1.5, GREY),
        keys: track({
          opacity: [
            [0.82, 0],
            [0.83, 1],
            [0.93, 1],
            [0.94, 0]
          ],
          xy: [
            [0.82, 104, 0],
            [0.86, 0, 0],
            [0.9, 0, 0],
            [0.94, 104, 0]
          ]
        })
      },
      {
        name: "a wrong done to him: a small grey mark by his place",
        svg: `<circle cx="${n(back[0] + 4.2)}" cy="${n(back[1] - 3.6)}" r="0.9" fill="${GREY}"/><circle cx="${n(back[0] + 5.4)}" cy="${n(back[1] - 2.6)}" r="0.5" fill="${GREY}"/>`,
        keys: track({
          opacity: [
            [0.86, 0],
            [0.865, 1],
            [0.9, 1],
            [0.93, 0]
          ]
        })
      },
      { name: "no revenge: a soft golden glow about his place", svg: glow(back[0], n(back[1] - 1), 6, WARM, 0.24), keys: showAt(0.88, 0.91) }
    ],
    words: [
      { text: "Whenever he had a choice of two things", from: 0.02, to: 0.204 },
      { text: "he took the easier of them", from: 0.219, to: 0.403 },
      { text: "as long as it was not a sin", from: 0.418, to: 0.602 },
      { text: "if it was a sin, he was farthest from it", from: 0.617, to: 0.801 },
      { text: "He never took revenge for himself", from: 0.816, to: 1 }
    ]
  };
}

// Words you could count. Aishah said that the Prophet ﷺ would talk so clearly that if one counting were to count his
// words, he could number them all (Sahih al-Bukhari 3567). No one is drawn: by the masjid of Madinah and Aishah's room,
// his place, a golden ring, and the places of those listening. His voice speaks, and his words come one by one, each a
// golden glint in the air, with space between them. A faint golden line goes from them to the place of one who counts,
// and a small mark shows by it for each of them; a soft golden ring comes about the marks, a soft golden glow over the
// glints, and a soft golden ring about his words: all counted, every word clear.
function wordsYouCouldCount(): SignArt {
  const his: [number, number] = [44, 101.4];
  const counter: [number, number] = [72, 105.2];
  const word = (i: number): [number, number] => [n(50 + i * 6.4), i % 2 ? 91.4 : 92.6];
  const mark = (i: number) => n(counter[0] + 5 + i * 1.4);
  const said = [0.06, 0.09, 0.12, 0.15, 0.18, 0.21];
  const counted = [0.375, 0.405, 0.435, 0.465, 0.495, 0.525];
  return {
    kind: "words-you-could-count",
    ms: 8000,
    parts: [
      ...daySky(134, 96, 8000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: easeLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      { name: "Aishah's room, by the masjid", svg: home(29, 94, 9.4, 8.6) },
      ...palms([
        [124, 92.6, 12],
        [152, 93, 11]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: so clear", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      ...said.map((t, i) => ({
        name: `his words, one by one: a golden glint ${i + 1}`,
        svg: glow(word(i)[0], word(i)[1], 2.6, "#FFF3C0", 0.4) + sparkle(word(i)[0], word(i)[1], 1.6, "#F2C14E"),
        keys: showAt(t, at3(t + 0.01))
      })),
      { name: "the places of those listening", svg: placesAt([[60, 104.4], [84, 104.8], [92, 106]], 1.4) },
      { name: "the place of one who counts", svg: someone(counter[0], counter[1], 1.5) },
      { name: "counting: a faint golden line from the glints to the one who counts", svg: way(`M${word(3)[0]} 94.6 Q${n(counter[0] - 1)} 97 ${counter[0]} ${n(counter[1] - 2.6)}`, SOFT_GOLD, 0.6), keys: showAt(0.35, 0.365) },
      ...counted.map((t, i) => ({
        name: `counted: a small mark by the one who counts ${i + 1}`,
        svg: `<path d="M${mark(i)} 100.2 L${mark(i)} 103.4" stroke="#7A5A3A" stroke-width="0.6" stroke-linecap="round"/>`,
        keys: showAt(t, at3(t + 0.01))
      })),
      { name: "all counted: a soft golden ring about the marks", svg: care(n(mark(2.5)), 101.8, 5.6, 2.6, SOFT_GOLD), keys: showAt(0.68, 0.71), loop: soft },
      { name: "all counted: a soft golden glow over the glints", svg: wash(n(word(2.5)[0]), 92, 22, 3.4, WARM, 0.14), keys: showAt(0.74, 0.78) },
      { name: "every word clear: a soft golden ring about his words", svg: care(n(word(2.5)[0]), 92, 21, 3.8, SOFT_GOLD), keys: showAt(0.84, 0.88), loop: soft }
    ],
    words: [
      { text: "Aishah said: he would talk so clearly", from: 0.02, to: 0.33 },
      { text: "that if a counter counted his words", from: 0.345, to: 0.655 },
      { text: "they could all be counted", from: 0.67, to: 1 }
    ]
  };
}

/** A heap of dates on a cloth, the heap's foot's middle at (x, y). */
const dateHeap = (x: number, y: number) =>
  cloth(n(x - 11), n(x + 11), n(y - 0.6)) +
  (
    [
      [-7.6, 0.6],
      [-5.6, 0.8],
      [-3.6, 0.8],
      [-1.6, 0.9],
      [0.4, 0.9],
      [2.4, 0.8],
      [4.4, 0.8],
      [6.4, 0.6],
      [-6.4, -0.6],
      [-4.4, -0.6],
      [-2.4, -0.5],
      [-0.4, -0.5],
      [1.6, -0.5],
      [3.6, -0.6],
      [5.4, -0.6],
      [-5.2, -1.9],
      [-3.2, -1.8],
      [-1.2, -1.8],
      [0.8, -1.8],
      [2.8, -1.9],
      [-3.8, -3.1],
      [-1.8, -3.1],
      [0.2, -3.1],
      [-2.6, -4.2],
      [-0.6, -4.2]
    ] as [number, number][]
  )
    .map(([dx, dy]) => date(n(x + dx), n(y + dy)))
    .join("");

// A date of the sadaqah. Abu Hurairah said: al-Hasan ibn Ali took a date of the dates of the sadaqah and put it in his
// mouth, and the Messenger of Allah ﷺ said: kikh, kikh, throw it out; do you not know that we do not eat the sadaqah?
// (Sahih Muslim 1069a). No one is drawn: by the masjid of Madinah, a heap of the dates of the sadaqah on a cloth, and
// his place, a golden ring. Al-Hasan's small place comes to the heap, and a date goes from it to al-Hasan's place, then
// goes in. His voice speaks; the date comes out again and is thrown down by the heap, and a soft ring comes about
// al-Hasan's place. A faint golden line goes from his place to al-Hasan's; the places of those in need come to the heap,
// glints show over it, and a faint golden way goes from it to them.
function aDateOfSadaqah(): SignArt {
  const his: [number, number] = [38, 101.2];
  const heap: [number, number] = [74, 104];
  const hasan0: [number, number] = [124, 104.8];
  const hasan: [number, number] = [92, 104.8];
  const taken: [number, number] = [n(heap[0] + 6.4), n(heap[1] - 1.8)];
  const atHasan: [number, number] = [n(hasan[0] - 0.4), n(hasan[1] - 3.6)];
  const needy: [number, number][] = [
    [104, 106.2],
    [112, 104.4],
    [120, 106.6]
  ];
  return {
    kind: "a-date-of-sadaqah",
    ms: 9000,
    parts: [
      ...daySky(132, 66, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: easeLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [128, 92.6, 12],
        [154, 93, 11]
      ]),
      { name: "the sadaqah: a heap of dates on a cloth", svg: dateHeap(heap[0], heap[1]) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "al-Hasan's small place", svg: someone(hasan0[0], hasan0[1], 1.1), keys: comingFrom(hasan0, hasan, 0.03, 0.12) },
      {
        name: "a date of the sadaqah, taken",
        svg: date(taken[0], taken[1]),
        keys: track({
          opacity: [
            [0.29, 1],
            [0.32, 0]
          ],
          xy: [
            [0.14, 0, 0],
            [0.18, n(atHasan[0] - taken[0]), n(atHasan[1] - taken[1])],
            [0.28, n(atHasan[0] - taken[0]), n(atHasan[1] - taken[1])],
            [0.31, n(hasan[0] - taken[0]), n(hasan[1] - 1.6 - taken[1])]
          ]
        })
      },
      { name: "his voice: kikh, kikh, throw it out", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      {
        name: "thrown out: the date, down by the heap",
        svg: date(atHasan[0], atHasan[1]),
        keys: track({
          opacity: [
            [0.56, 0],
            [0.565, 1]
          ],
          xy: [
            [0.57, 0, 0],
            [0.585, -3, -3.4],
            [0.6, n(heap[0] + 13 - atHasan[0]), n(heap[1] + 1.6 - atHasan[1])]
          ]
        })
      },
      { name: "gently: a soft ring about al-Hasan's small place", svg: care(hasan[0], n(hasan[1] + 0.4), 2.6, 1.4, SOFT_GOLD), keys: showAt(0.62, 0.65), loop: soft },
      { name: "his household: a faint golden line from his place to al-Hasan's", svg: way(`M${n(his[0] + 3)} ${n(his[1] - 3)} Q${n((his[0] + hasan[0]) / 2)} 90 ${n(hasan[0] - 1)} ${n(hasan[1] - 3)}`, GOLD, 0.6), keys: showAt(0.77, 0.8) },
      { name: "the sadaqah is for those in need: their places come to it", svg: placesAt(needy, 1.4), keys: track({ opacity: [[0.8, 0], [0.81, 1]], xy: [[0.8, 40, 0], [0.86, 0, 0]] }) },
      {
        name: "for those in need: glints over the heap",
        svg: glints([
          [68, 98.6],
          [76, 97.8],
          [83, 99]
        ]),
        keys: showAt(0.87, 0.9),
        loop: speaking
      },
      { name: "for those in need: a faint golden way from the heap to their places", svg: way(`M${n(heap[0] + 12)} 103.2 Q104 100.4 ${n(needy[1][0] - 2)} 102.4`, SOFT_GOLD, 0.7), keys: showAt(0.88, 0.91) }
    ],
    words: [
      { text: "Al-Hasan ibn Ali took a sadaqah date", from: 0.02, to: 0.253 },
      { text: "and put it in his mouth", from: 0.268, to: 0.501 },
      { text: "He said: kikh, kikh! Throw it out", from: 0.516, to: 0.749 },
      { text: "do you not know we do not eat sadaqah?", from: 0.764, to: 1 }
    ]
  };
}

/** A round flat loaf, its middle at (x, y). */
const loaf = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/><path d="M${n(x - 1.2)} ${n(y - 0.3)} L${n(x + 1.2)} ${n(y - 0.3)}" stroke="#B57E3E" stroke-width="0.25"/>`;

/** A small clay pot, empty, its foot's middle at (x, y). */
const emptyPot = (x: number, y: number) =>
  `<path d="M${n(x - 1.8)} ${y} Q${n(x - 2.8)} ${n(y - 2.4)} ${n(x - 1.4)} ${n(y - 3.8)} L${n(x + 1.4)} ${n(y - 3.8)} Q${n(x + 2.8)} ${n(y - 2.4)} ${n(x + 1.8)} ${y} Z" fill="#A87A52"/><ellipse cx="${x}" cy="${n(y - 3.8)}" rx="1.4" ry="0.45" fill="#4E3218"/>`;

/** A small jar of vinegar, its foot's middle at (x, y). */
const vinegar = (x: number, y: number) =>
  `<path d="M${n(x - 1.5)} ${y} Q${n(x - 2.4)} ${n(y - 2)} ${n(x - 1.2)} ${n(y - 3.4)} L${n(x + 1.2)} ${n(y - 3.4)} Q${n(x + 2.4)} ${n(y - 2)} ${n(x + 1.5)} ${y} Z" fill="#8E9E6E"/><ellipse cx="${x}" cy="${n(y - 3.4)}" rx="1.2" ry="0.4" fill="#C7A65A"/><path d="M${n(x - 0.9)} ${n(y - 1.6)} L${n(x + 0.9)} ${n(y - 1.6)}" stroke="#6E7E52" stroke-width="0.3"/>`;

// A good condiment. Jabir ibn Abdullah said that the Prophet ﷺ asked his family for a condiment; they said: we have
// nothing but vinegar. He called for it, and began to eat with it, saying: what a good condiment vinegar is, what a
// good condiment vinegar is (Sahih Muslim 2052a). And Jabir said: I have loved vinegar ever since I heard it from him
// (Sahih Muslim 2052b). No one is drawn: by his home, loaves of bread on a cloth before his place, a golden ring, and
// Jabir's place beside. His voice speaks, and a faint golden line goes to the door, where the places of his family are;
// their voice answers, empty pots show by the door, and a small jar of vinegar. The jar comes to the bread; a piece of
// bread dips into it and comes back. A soft golden glow and glints come about the jar. Jabir's voice speaks, a warm glow
// comes about his place, and a faint golden line goes from the jar to it.
function aGoodCondiment(): SignArt {
  const his: [number, number] = [52, 101.8];
  const jabir: [number, number] = [34, 104.6];
  const door: [number, number] = [104.4, 103.6];
  const jar0: [number, number] = [109.6, 104.4];
  const jar: [number, number] = [66.4, 104.8];
  const piece0: [number, number] = [58.4, 103.4];
  return {
    kind: "a-good-condiment",
    ms: 10000,
    parts: [
      ...daySky(24, 120, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: easeLand() },
      { name: "his home", svg: home(110, 94, 18, 11) },
      ...palms([
        [140, 92.6, 12],
        [10, 93, 11]
      ]),
      { name: "bread: loaves on a cloth before his place", svg: cloth(55, 71, 102.4) + loaf(60, 104) + loaf(66.6, 103.6) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.5) },
      { name: "the places of his family, by the door", svg: placesAt([[98.6, 104.6], [93.4, 106]], 1.4) },
      { name: "his voice: is there a condiment?", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "asking: a faint golden line from his place to the door", svg: way(`M${n(his[0] + 3)} ${n(his[1] - 2)} Q78 94 ${n(door[0] - 7)} ${n(door[1] - 3)}`, GOLD, 0.6), keys: showAt(0.06, 0.09) },
      { name: "his family's voice: only vinegar", svg: arcsLeft(n(door[0] - 7.6), n(door[1] - 3.6), VOICE), keys: showAt(0.23, 0.24), loop: speaking },
      { name: "nothing else: empty pots by the door", svg: emptyPot(116.4, 104.6) + emptyPot(121, 105.2) + greyRing(118.6, 104.4, 5.4, 2), keys: showAt(0.25, 0.27) },
      { name: "only vinegar: a small jar by the door", svg: vinegar(jar0[0], jar0[1]), keys: track({ opacity: [[0.28, 0], [0.3, 1]], xy: [[0.43, 0, 0], [0.47, n(jar[0] - jar0[0]), n(jar[1] - jar0[1])]] }) },
      {
        name: "eaten with it: a piece of bread, dipped",
        svg: `<ellipse cx="${piece0[0]}" cy="${piece0[1]}" rx="1" ry="0.6" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.25"/>`,
        keys: track({
          opacity: [
            [0.48, 0],
            [0.485, 1],
            [0.55, 1],
            [0.56, 0]
          ],
          xy: [
            [0.49, 0, 0],
            [0.51, n(jar[0] - piece0[0]), n(jar[1] - 3.8 - piece0[1])],
            [0.53, n(jar[0] - piece0[0]), n(jar[1] - 3.8 - piece0[1])],
            [0.55, -4.6, -1.8]
          ]
        })
      },
      { name: "a good condiment: a soft golden glow about the jar", svg: glow(jar[0], n(jar[1] - 1.8), 5.4, WARM, 0.3), keys: showAt(0.63, 0.66) },
      {
        name: "a good condiment: glints about the jar",
        svg: glints([
          [n(jar[0] - 2.6), n(jar[1] - 5.6)],
          [n(jar[0] + 2.8), n(jar[1] - 4.8)]
        ]),
        keys: showAt(0.66, 0.68),
        loop: speaking
      },
      { name: "Jabir's voice: I have loved vinegar since", svg: arcsLeft(n(jabir[0] - 2), n(jabir[1] - 3.6), VOICE), keys: showAt(0.82, 0.83), loop: speaking },
      { name: "loved since: a warm glow about Jabir's place", svg: glow(jabir[0], n(jabir[1] - 1), 4.6, WARM, 0.3), keys: showAt(0.84, 0.87) },
      { name: "loved since: a faint golden line from the jar to Jabir's place", svg: way(`M${n(jar[0] - 2)} ${n(jar[1] - 4)} Q48 92 ${n(jabir[0] + 1)} ${n(jabir[1] - 3)}`, SOFT_GOLD, 0.6), keys: showAt(0.86, 0.89) }
    ],
    words: [
      { text: "He asked his family for a condiment", from: 0.02, to: 0.204 },
      { text: "they said: we have nothing but vinegar", from: 0.219, to: 0.403 },
      { text: "he called for it, and ate with it", from: 0.418, to: 0.602 },
      { text: "and said: vinegar is a good condiment", from: 0.617, to: 0.801 },
      { text: "Jabir said: I have loved vinegar since", from: 0.816, to: 1 }
    ]
  };
}

/** An acacia tree, its foot at (x, y), `h` high. */
export const acacia = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h * 0.62)}" stroke="#7A5A3A" stroke-width="${n(h * 0.06)}" stroke-linecap="round"/>` +
  `<path d="M${x} ${n(y - h * 0.5)} L${n(x - h * 0.24)} ${n(y - h * 0.74)} M${x} ${n(y - h * 0.56)} L${n(x + h * 0.26)} ${n(y - h * 0.78)}" stroke="#7A5A3A" stroke-width="${n(h * 0.04)}" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y - h * 0.84)}" rx="${n(h * 0.56)}" ry="${n(h * 0.16)}" fill="#7E9A4E"/>` +
  `<ellipse cx="${n(x - h * 0.12)}" cy="${n(y - h * 0.9)}" rx="${n(h * 0.3)}" ry="${n(h * 0.08)}" fill="#97B064"/>`;

// Labbayk as it rose. Ibn Umar said: I saw the Messenger of Allah ﷺ mount his riding camel at Dhul-Hulayfah, then
// begin the talbiyah when it stood upright (Sahih al-Bukhari 1514). No one is drawn, and no one is drawn on the camel:
// in the valley of Dhul-Hulayfah, with its acacias and its little masjid, his camel kneels. His place, a golden ring,
// comes from the masjid to the camel's side, and a faint golden line goes to it from Ibn Umar's place. A faint golden
// way shows from Madinah, far off, to Dhul-Hulayfah, with glints by its masjid. The camel stands up, its place, a
// golden ring, still by its side; his voice rises with the talbiyah, sparks rise, and a soft golden ring comes about
// his place and the camel.
function labbaykAsItRose(): SignArt {
  const his0: [number, number] = [38, 101.6];
  const his: [number, number] = [68, 103.6];
  const kneel: [number, number] = [88, 105];
  const ibnUmar: [number, number] = [134, 104.6];
  const k = 0.18;
  return {
    kind: "labbayk-as-it-rose",
    ms: 8000,
    parts: [
      ...daySky(120, 40, 8000),
      { name: "hills", svg: hills("#C4AC84") },
      { name: "the land", svg: easeLand([[14, 110], [58, 112], [108, 112], [150, 110]]) },
      { name: "Madinah, far off", svg: [138, 145, 152].map((x, i) => `<rect x="${x}" y="${n(78.6 - (i % 2) * 1.2)}" width="5.4" height="${n(3.4 + (i % 2) * 1.2)}" fill="#C9A878"/>`).join("") + `<rect x="135" y="81.6" width="24" height="0.8" fill="#B89668"/>` },
      { name: "the little masjid of Dhul-Hulayfah", svg: madinahMasjid(14, 94, 0.3) },
      {
        name: "acacias of the valley",
        svg: acacia(52, 94, 12) + acacia(112, 93.6, 11) + acacia(150, 95, 9)
      },
      { name: "his camel, kneeling", svg: restingCamel(kneel[0], kneel[1], 0.62).replace(/#8E6E46/g, "#DCA85E").replace(/#76583A/g, "#BC8642"), keys: track({ opacity: [[0.69, 1], [0.7, 0]] }) },
      {
        name: "his camel, standing up, with no one on it",
        svg: camel(n(kneel[0] + 4), n(kneel[1] - 0.4), k),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.7, 1]
          ],
          xy: [
            [0.69, 0, 3],
            [0.72, 0, 0]
          ]
        })
      },
      { name: "his place, a golden ring", svg: ring(his0[0], his0[1], 2.4, GOLD), keys: track({ xy: [[0.04, 0, 0], [0.14, n(his[0] - his0[0]), n(his[1] - his0[1])]] }) },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5) },
      { name: "Ibn Umar saw: a faint golden line from Ibn Umar's place to his place", svg: way(`M${n(ibnUmar[0] - 2)} ${n(ibnUmar[1] - 2.6)} Q102 88 ${n(his[0] + 3)} ${n(his[1] - 3)}`, SOFT_GOLD, 0.6), keys: showAt(0.17, 0.21) },
      { name: "from Madinah: a faint golden way to Dhul-Hulayfah", svg: way(`M136 82.4 Q96 86 52 90 Q36 91.6 26 93.4`, SOFT_GOLD, 0.8), keys: showAt(0.36, 0.42) },
      {
        name: "Dhul-Hulayfah: glints by its masjid",
        svg: glints([
          [10, 84.4],
          [22, 83.6],
          [30, 86.2]
        ]),
        keys: showAt(0.44, 0.47),
        loop: speaking
      },
      { name: "his voice: labbayk", svg: arcs(n(his[0] - 7.6), n(his[1] - 4), GOLD), keys: showAt(0.73, 0.74), loop: speaking },
      { name: "labbayk: a spark rising 1", svg: sparkle(n(his[0] - 2), n(his[1] - 6), 1.4, "#FFE7A0"), keys: sparkRising(0.75, 0.82, 12), loop: speaking },
      { name: "labbayk: a spark rising 2", svg: sparkle(n(his[0] + 1.6), n(his[1] - 6.4), 1.2, "#FFE7A0"), keys: sparkRising(0.8, 0.87, 12), loop: speaking },
      { name: "labbayk: a spark rising 3", svg: sparkle(n(his[0] - 0.4), n(his[1] - 6), 1.3, "#FFE7A0"), keys: sparkRising(0.85, 0.92, 12), loop: speaking },
      { name: "a soft golden ring about his place and the camel", svg: care(n(his[0] + 14), n(his[1] + 1.2), 20, 3.6, SOFT_GOLD), keys: showAt(0.77, 0.8), loop: soft }
    ],
    words: [
      { text: "Ibn Umar said: I saw him mount his camel", from: 0.02, to: 0.33 },
      { text: "at Dhul-Hulayfah", from: 0.345, to: 0.655 },
      { text: "then labbayk, as it stood upright", from: 0.67, to: 1 }
    ]
  };
}

/** A wooden bowl, its foot's middle at (x, y). */
const bowl = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${n(y - 2.4)} Q${n(x - 2.4)} ${y} ${x} ${y} Q${n(x + 2.4)} ${y} ${n(x + 2.6)} ${n(y - 2.4)} Z" fill="#9A6A3E"/><path d="M${n(x - 2.6)} ${n(y - 2.4)} L${n(x + 2.6)} ${n(y - 2.4)}" stroke="#7A4E2A" stroke-width="0.35"/>`;

// A bowl of milk. Umm al-Fadl bint al-Harith said that people by her differed on the day of Arafah about whether the
// Prophet ﷺ was fasting; some said: he is fasting, and some said: he is not fasting. So she sent him a bowl of milk
// while he was standing on his camel, and he drank it (Sahih al-Bukhari 1661). No one is drawn, and no one is drawn on
// the camel: on the plain of Arafah, below the mount, his camel stands, his place, a golden ring, by it. By Umm al-Fadl's
// tent are her place and the places of those with her, a grey ring about them; a faint line goes from them to his
// place. A voice speaks from some of them, then a voice from others. A bowl of milk goes from her place to his; a soft
// golden ring comes about his place and the camel. The milk in the bowl goes; the grey ring goes, and a soft golden ring
// comes about them.
function aBowlOfMilk(): SignArt {
  const his: [number, number] = [56, 103.6];
  const camelAt: [number, number] = [36, 104.8];
  const her: [number, number] = [118, 104.6];
  const these: [number, number][] = [
    [128, 103.4],
    [134, 105.6]
  ];
  const those: [number, number][] = [
    [142, 103.6],
    [148, 105.8]
  ];
  const bowlTo: [number, number] = [n(his[0] + 4.6), n(his[1] + 1.4)];
  const bowl0: [number, number] = [n(her[0] - 3.4), n(her[1] + 1.2)];
  return {
    kind: "a-bowl-of-milk",
    ms: 10000,
    parts: [
      ...daySky(70, 130, 10000),
      { name: "hills", svg: hills("#BFA57E") },
      { name: "the land", svg: easeLand() },
      { name: "the mount of Arafat", svg: ARAFAT },
      { name: "Umm al-Fadl's tent", svg: tent(126, 99.6, 16, 9.6) },
      { name: "his camel, standing, with no one on it", svg: camel(camelAt[0], camelAt[1], 0.18), loop: { move: "bob", ms: 2400, y: -0.3 } },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Umm al-Fadl's place", svg: someone(her[0], her[1], 1.5) },
      { name: "the places of those with Umm al-Fadl", svg: placesAt([...these, ...those], 1.4) },
      { name: "differing: a grey ring about those with Umm al-Fadl", svg: greyRing(138, 104.8, 13, 3.2), keys: showFor(0.04, 0.07, 0.86, 0.89) },
      { name: "looking: a faint line from them to his place", svg: way(`M${n(these[0][0] - 3)} ${n(these[0][1] - 3)} Q92 92 ${n(his[0] + 3)} ${n(his[1] - 3)}`, "#E8DCC4", 0.6), keys: showFor(0.08, 0.11, 0.86, 0.89) },
      { name: "some: a voice saying he is fasting", svg: arcsLeft(n(these[0][0] - 2), n(these[0][1] - 3.6), VOICE), keys: showAt(0.19, 0.2), loop: speaking },
      { name: "others: a voice saying he is not fasting", svg: arcs(n(those[1][0] + 2), n(those[1][1] - 3.6), VOICE), keys: showAt(0.355, 0.365), loop: speaking },
      {
        name: "Umm al-Fadl's bowl",
        svg: bowl(bowl0[0], bowl0[1]),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1]
          ],
          xy: [
            [0.53, 0, 0],
            [0.6, n(bowlTo[0] - bowl0[0]), n(bowlTo[1] - bowl0[1])]
          ]
        })
      },
      {
        name: "milk in the bowl",
        svg: `<ellipse cx="${bowl0[0]}" cy="${n(bowl0[1] - 2.4)}" rx="2.3" ry="0.6" fill="#FAF7EE"/>`,
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1],
            [0.86, 1],
            [0.9, 0]
          ],
          xy: [
            [0.53, 0, 0],
            [0.6, n(bowlTo[0] - bowl0[0]), n(bowlTo[1] - bowl0[1])]
          ]
        })
      },
      { name: "standing at Arafah: a soft golden ring about his place and the camel", svg: care(n((camelAt[0] + his[0]) / 2 + 2), n(his[1] + 1.4), 18, 3.6, SOFT_GOLD), keys: showAt(0.69, 0.72), loop: soft },
      { name: "drunk: a glint over the bowl", svg: sparkle(bowlTo[0], n(bowlTo[1] - 5.6), 1, "#FFE7A0"), keys: showAt(0.9, 0.915), loop: speaking },
      { name: "settled: a soft golden ring about those with Umm al-Fadl", svg: care(138, 104.8, 13, 3.2, SOFT_GOLD), keys: showAt(0.9, 0.93), loop: soft }
    ],
    words: [
      { text: "People by Umm al-Fadl differed at Arafah", from: 0.02, to: 0.17 },
      { text: "some said: he is fasting", from: 0.185, to: 0.335 },
      { text: "and some said: he is not fasting", from: 0.35, to: 0.5 },
      { text: "so Umm al-Fadl sent him a bowl of milk", from: 0.515, to: 0.665 },
      { text: "as he stood on his camel", from: 0.68, to: 0.83 },
      { text: "and he drank it", from: 0.845, to: 1 }
    ]
  };
}

// The days of Tashriq. Nubayshah al-Hudhali said that the Messenger of Allah ﷺ said: the days of Tashriq are days of
// eating and drinking (Sahih Muslim 1141a), and in another telling: and of remembering Allah (Sahih Muslim 1141b). No
// one is drawn: in the valley of Mina, between its rocky hills, rows of tents and the places of the pilgrims by them;
// his place, a golden ring, by the near tents. His voice speaks, and the sun goes on across the sky. Food shows on a
// dish by each tent, one after another, with glints; then a cup by each. Voices are raised by the tents, sparks rise
// from them, and a soft golden glow comes over Mina.
function daysOfTashriq(): SignArt {
  const his: [number, number] = [22, 102.4];
  const tents: [number, number][] = [
    [50, 98.4],
    [78, 97.6],
    [106, 98.4],
    [134, 97.8]
  ];
  const fed = [0.28, 0.31, 0.34, 0.37];
  const drank = [0.53, 0.56, 0.59, 0.62];
  return {
    kind: "days-of-tashriq",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun, going on across the sky",
        svg: sun(26, 26),
        keys: track({
          xy: [
            [0.05, 0, 0],
            [0.12, 48, -6],
            [0.2, 104, 0]
          ]
        })
      },
      { name: "a cloud", svg: cloud(70, 30, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      {
        name: "the rocky hills of Mina",
        svg:
          `<path d="M0 61 L0 44 Q10 36 22 38 Q34 41 44 50 Q50 55 58 61 Z" fill="#A48C68"/><path d="M104 61 Q112 54 120 48 Q132 38 144 37 Q154 37 160 41 L160 61 Z" fill="#A48C68"/>` +
          `<path d="M40 61 Q52 52 66 50 Q76 51 84 56 Q90 59 96 61 Z" fill="#B49A74"/>` +
          (
            [
              [10, 45, 2.6],
              [24, 44, 2.2],
              [36, 50.4, 2.4],
              [62, 54.6, 2],
              [78, 55.4, 1.8],
              [124, 47.6, 2.4],
              [140, 42.4, 2.6],
              [152, 46, 2.2]
            ] as [number, number, number][]
          )
            .map(([x, y, r]) => stone(x, y, r))
            .join("")
      },
      { name: "the land", svg: easeLand([[10, 111], [62, 112], [118, 112], [152, 110]]) },
      {
        name: "tents of Mina, far",
        svg: [26, 40, 54, 68, 82, 96, 110, 124, 138, 152].map((x, i) => tent(x, n(88 + (i % 2) * 0.8), 9, 5.6, "#F3EBD8")).join("")
      },
      { name: "tents of Mina, near", svg: tents.map(([x, y]) => tent(x, y, 15, 9.2)).join("") },
      {
        name: "the places of the pilgrims by the tents",
        svg: placesAt(tents.flatMap(([x, y]) => [[n(x - 4.4), n(y + 6.4)], [n(x + 4.6), n(y + 6.8)]] as [number, number][]), 1.3)
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: the days of Tashriq", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      ...fed.map((t, i) => ({
        name: `eating: food on a dish by a tent ${i + 1}`,
        svg: food(n(tents[i][0] - 0.4), n(tents[i][1] + 3.6)),
        keys: showAt(t, at3(t + 0.02))
      })),
      {
        name: "eating: glints over the dishes",
        svg: glints(tents.map(([x, y]) => [n(x - 2.4), n(y - 0.6)] as [number, number])),
        keys: showAt(0.4, 0.43),
        loop: speaking
      },
      ...drank.map((t, i) => ({
        name: `drinking: a cup by a tent ${i + 1}`,
        svg: cup(n(tents[i][0] + 4.6), n(tents[i][1] + 3.4)) + `<ellipse cx="${n(tents[i][0] + 4.6)}" cy="${n(tents[i][1] + 0.1)}" rx="1.45" ry="0.45" fill="#4F86B8"/>`,
        keys: showAt(t, at3(t + 0.02))
      })),
      { name: "drinking: a jug by the near tents", svg: jug(64, 106.4), keys: showAt(0.645, 0.665) },
      { name: "dhikr: voices raised by the tents", svg: tents.map(([x, y]) => arcs(n(x + 7.6), n(y - 6), VOICE)).join(""), keys: showAt(0.77, 0.79), loop: speaking },
      ...[0.8, 0.84, 0.88].map((t, i) => ({
        name: `dhikr: a spark rising ${i + 1}`,
        svg: sparkle(tents[i + 1][0], n(tents[i + 1][1] - 11), 1.3, "#FFE7A0"),
        keys: sparkRising(t, at3(t + 0.07), 12),
        loop: speaking
      })),
      { name: "dhikr: a soft golden glow over Mina", svg: wash(92, 98, 64, 9, WARM, 0.08), keys: showAt(0.85, 0.9) }
    ],
    words: [
      { text: "The days of Tashriq", from: 0.02, to: 0.253 },
      { text: "are days of eating", from: 0.268, to: 0.501 },
      { text: "and drinking", from: 0.516, to: 0.749 },
      { text: "and of remembering Allah", from: 0.764, to: 1 }
    ]
  };
}

export const EASE_ART = {
  "the-easier-of-two": theEasierOfTwo,
  "words-you-could-count": wordsYouCouldCount,
  "a-date-of-sadaqah": aDateOfSadaqah,
  "a-good-condiment": aGoodCondiment,
  "labbayk-as-it-rose": labbaykAsItRose,
  "a-bowl-of-milk": aBowlOfMilk,
  "days-of-tashriq": daysOfTashriq
};
