import { animalAt, cloud, glow, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, jug, palms, sparkRising, track } from "./daysArt";
import { cloth, greyRing, soft, speaking } from "./fastArt";
import { food } from "./hopeArt";
import { coins, stall } from "./tradeArt";
import { showAt, showFor } from "./roadArt";

/**
 * Tender ways: no two of three talking apart from the third; the four words dearest to Allah, in any order; two girls
 * looked after until they are grown, and the one who did it close to him on the Day; the du'a for one who is ill; food
 * from the work of one's own hands, as Dawud ate; every good deed a charity; and turning to Allah a hundred times a
 * day. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person
 * is ever drawn, not even a hand, a foot or a face: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air; what changes hands moves by itself. Nothing is drawn
 * for Allah, and nothing comes down from the sky: a du'a, a word of praise or a deed is a spark that rises.
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

/** The land from y 61 down, with a few tufts of grass. */
const tenderLand = (tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts);

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

/** Keys of something that shows at `from`, goes by `dx`, `dy` by `to` and fades as it gets there. */
const goingTo = (from: number, to: number, dx: number, dy: number): SignPart["keys"] =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.005), 1],
      [at3(to - 0.005), 1],
      [to, 0]
    ],
    xy: [
      [from, 0, 0],
      [at3(to - 0.005), dx, dy]
    ]
  });

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

/** A wide pale plain over the whole scene: the Day. */
const PLAIN = `<rect width="160" height="120" fill="#EEE8F0"/><rect y="70" width="160" height="50" fill="#E6DECD"/><path d="M0 70 L160 70" stroke="#D6CCB8" stroke-width="0.6"/>`;

/** Two little arcs facing each other at (x, y): a whisper between two places. */
const whisper = (x: number, y: number) =>
  `<path d="M${n(x - 1.3)} ${n(y - 0.9)} q0.7 0.9 0 1.8" stroke="#8E7F6E" stroke-width="0.4" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x + 1.3)} ${n(y - 0.9)} q-0.7 0.9 0 1.8" stroke="#8E7F6E" stroke-width="0.4" fill="none" stroke-linecap="round"/>`;

// A group of three. Abdullah ibn Mas'ud said that the Prophet ﷺ said: when you are three, no two should talk in secret,
// leaving out the third, until you are with other people, for that would grieve him (Sahih al-Bukhari 6290, Sahih
// Muslim 2184). No one is drawn: by the masjid of Madinah, his place, a golden ring, and his voice; under a palm, three
// places sit together on a mat, and a soft ring comes about them. Two of them draw close, whispers show between them,
// and a grey ring comes about the two: not to be done. A grey ring comes about the third, left out. Other places come
// along the way and sit by the third; the grey rings go, and a soft golden ring comes about the third and the others.
// A warm glow comes about the third, not grieved, and a soft golden ring about them all.
function aGroupOfThree(): SignArt {
  const his: [number, number] = [32, 101.6];
  const a: [number, number] = [92, 104.2];
  const b: [number, number] = [101, 104.8];
  const third: [number, number] = [111, 104];
  const othersFrom: [number, number][] = [
    [146, 105.8],
    [153, 104.8],
    [160, 105.8]
  ];
  return {
    kind: "a-group-of-three",
    ms: 10000,
    parts: [
      ...daySky(132, 70, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: tenderLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [62, 92.8, 12],
        [104, 92.4, 13]
      ]),
      { name: "a mat under the palm", svg: cloth(86, 116, 105.6) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: when you are three", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "the first of the two places", svg: someone(a[0], a[1], 1.5), keys: track({ xy: [[0.23, 0, 0], [0.27, 3, 0.2]] }) },
      { name: "the second of the two places", svg: someone(b[0], b[1], 1.5), keys: track({ xy: [[0.23, 0, 0], [0.27, -1.6, -0.2]] }) },
      { name: "the third place", svg: someone(third[0], third[1], 1.5) },
      { name: "three: a soft ring about the three places", svg: care(101.5, 105.2, 13, 2.6, SOFT_GOLD), keys: showFor(0.08, 0.11, 0.24, 0.26), loop: soft },
      { name: "talking in secret: whispers between the two places", svg: whisper(97.2, 101.4), keys: showAt(0.28, 0.29), loop: speaking },
      { name: "not to be done: a grey ring about the two places", svg: greyRing(97.2, 104.9, 5.4, 2.1), keys: showFor(0.32, 0.34, 0.71, 0.73) },
      { name: "left out: a grey ring about the third place", svg: greyRing(third[0], n(third[1] + 0.4), 3.2, 1.7), keys: showFor(0.45, 0.48, 0.7, 0.72) },
      { name: "other places, coming to sit by the third", svg: placesAt(othersFrom, 1.5), keys: comingFrom(othersFrom[0], [120, 105.2], 0.62, 0.7) },
      { name: "with others: a soft golden ring about the third place and the others", svg: care(122.4, 105.4, 15.2, 2.8, SOFT_GOLD), keys: showAt(0.73, 0.76), loop: soft },
      { name: "not grieved: a warm glow about the third place", svg: glow(third[0], n(third[1] - 1), 6, WARM, 0.3), keys: showAt(0.83, 0.87) },
      { name: "together: a soft golden ring about them all", svg: care(113, 105.4, 25, 3.6, SOFT_GOLD), keys: showAt(0.89, 0.92), loop: soft }
    ],
    words: [
      { text: "He said: when you are three", from: 0.02, to: 0.204 },
      { text: "no two should talk in secret", from: 0.219, to: 0.403 },
      { text: "leaving out the third", from: 0.418, to: 0.602 },
      { text: "until you are with other people", from: 0.617, to: 0.801 },
      { text: "for that would grieve him", from: 0.816, to: 1 }
    ]
  };
}

/** A small light, a soft glow with a spark in its middle at (x, y), in `color`. */
const smallLight = (x: number, y: number, color: string) => glow(x, y, 3, color, 0.5) + sparkle(x, y, 1.3, color);

// The four dearest words. Samurah ibn Jundub said that the Messenger of Allah ﷺ said: the dearest words to Allah are
// four: Subhan Allah, al-hamdu lillah, la ilaha illa Allah and Allahu akbar; it does not matter which of them you begin
// with (Sahih Muslim 2137a). No one is drawn: by the masjid of Madinah, his place, a golden ring, and his voice; four
// faint rings wait over the place of one who remembers. Its voice speaks, and four sparks rise from it one after
// another, each to a ring, where it stays as a small light. Then the lights change places, the last one going first,
// and a soft golden ring and a soft golden glow come about the four.
function fourDearestWords(): SignArt {
  const his: [number, number] = [32, 101.6];
  const one: [number, number] = [104, 104];
  const from: [number, number] = [one[0], n(one[1] - 3.2)];
  const slots: [number, number][] = [
    [92, 86],
    [100, 83.4],
    [108, 83.4],
    [116, 86]
  ];
  const colors = ["#FFE7A0", "#FFFFFF", "#FFD27A", "#DDEEFF"];
  const said: [number, number][] = [
    [0.28, 0.33],
    [0.38, 0.43],
    [0.53, 0.58],
    [0.63, 0.68]
  ];
  const ordinal = ["first", "second", "third", "fourth"];
  const lightNames = ["a soft gold light", "a soft white light", "a warm light", "a pale light"];
  const shift = (i: number): SignPart["keys"] => {
    const lit = showAt(at3(said[i][1] - 0.005), said[i][1]) as { at: number[]; opacity: number[] };
    const moves: [number, number, number][] =
      i === 3
        ? [
            [0.78, 0, 0],
            [0.81, n((slots[0][0] - slots[3][0]) / 2), -6],
            [0.84, n(slots[0][0] - slots[3][0]), n(slots[0][1] - slots[3][1])]
          ]
        : [
            [0.78, 0, 0],
            [0.84, n(slots[i + 1][0] - slots[i][0]), n(slots[i + 1][1] - slots[i][1])]
          ];
    return track({ opacity: lit.at.map((t, k): [number, number] => [t, lit.opacity[k]]), xy: moves });
  };
  return {
    kind: "four-dearest-words",
    ms: 9000,
    parts: [
      ...daySky(70, 128, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: tenderLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [60, 92.6, 12],
        [134, 93, 12]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: four words are dearest", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "the place of one who remembers", svg: someone(one[0], one[1], 1.5) },
      {
        name: "four: four faint rings over that place, waiting",
        svg: slots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" stroke="#F3E9D2" stroke-width="0.5" stroke-dasharray="1 0.8" fill="none"/>`).join(""),
        keys: showFor(0.08, 0.11, 0.86, 0.88),
        loop: soft
      },
      { name: "saying them: the voice of one who remembers", svg: arcs(n(one[0] + 2.2), n(one[1] - 3.6), VOICE), keys: showAt(0.27, 0.275), loop: speaking },
      ...said.map(([a, b], i): SignPart => ({
        name: `the ${ordinal[i]} word: a spark rising to its ring`,
        svg: sparkle(from[0], from[1], 1.4, SPARK),
        keys: goingTo(a, b, n(slots[i][0] - from[0]), n(slots[i][1] - from[1]))
      })),
      ...slots.map(([x, y], i): SignPart => ({ name: `the ${ordinal[i]} word: ${lightNames[i]}`, svg: smallLight(x, y, colors[i]), keys: shift(i), loop: soft })),
      { name: "any order: a soft golden ring about the four lights", svg: care(104, 85.6, 15.6, 4.4, SOFT_GOLD), keys: showAt(0.87, 0.9), loop: soft },
      { name: "dearest: a soft golden glow over the four lights", svg: glow(104, 84.8, 14, WARM, 0.18), keys: showAt(0.91, 0.94) }
    ],
    words: [
      { text: "He said: four words are dearest to Allah", from: 0.02, to: 0.253 },
      { text: "Subhan Allah, and al-hamdu lillah", from: 0.268, to: 0.501 },
      { text: "la ilaha illa Allah, and Allahu akbar", from: 0.516, to: 0.749 },
      { text: "it does not matter which you begin with", from: 0.764, to: 1 }
    ]
  };
}

// Two raised well. Anas ibn Malik said that the Messenger of Allah ﷺ said: whoever looks after two girls until they come
// of age will come on the Day of Resurrection, I and he, and he joined his fingers (Sahih Muslim 2631). No one is
// drawn: by the masjid of Madinah, his place, a golden ring, and his voice; by a home, the place of one who looks
// after two small places. A dish of food and a jug of water come by them, and a soft warm glow. Nights come and go,
// and the two small places grow; a soft golden ring comes about them. Then a wide pale plain, the Day: his place, a
// golden ring, and the place of the one who looked after them, which comes close to his; a soft golden ring, a soft
// golden glow and glints come about the two.
function twoRaisedWell(): SignArt {
  const his: [number, number] = [32, 101.6];
  const guardian: [number, number] = [100, 103.8];
  const small: [number, number][] = [
    [113.6, 105.6],
    [121, 105.2]
  ];
  const hisOnTheDay: [number, number] = [70, 101];
  const theirsOnTheDay: [number, number] = [96, 103];
  const nights: [number, number][] = [
    [0.28, 0],
    [0.29, 0.85],
    [0.31, 0.85],
    [0.32, 0],
    [0.36, 0],
    [0.37, 0.85],
    [0.39, 0.85],
    [0.4, 0]
  ];
  const night = track({ opacity: nights });
  const growing = track({
    scale: [
      [0.3, 1],
      [0.34, 1.15],
      [0.41, 1.15],
      [0.44, 1.35]
    ]
  });
  return {
    kind: "two-raised-well",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(70, 20), keys: track({ opacity: nights.map(([t, v]): [number, number] => [t, v > 0 ? 0 : 1]) }) },
      { name: "a cloud", svg: cloud(128, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: tenderLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [60, 92.6, 12],
        [148, 93.4, 11]
      ]),
      { name: "a home", svg: home(118, 94.6, 20, 12) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: whoever looks after two", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "the place of one who looks after them", svg: someone(guardian[0], guardian[1], 1.5) },
      ...small.map(([x, y], i): SignPart => ({
        name: `a small place by the home ${i + 1}`,
        svg: someone(x, y, 0.95),
        keys: growing,
        origin: { x, y: n(y + 1) }
      })),
      { name: "looking after them: a faint line from that place to the two small places", svg: way(`M${n(guardian[0] + 2.2)} ${n(guardian[1] - 1.6)} Q107 99.6 ${n(small[0][0] - 1.6)} ${n(small[0][1] - 1.8)}`, SOFT_GOLD, 0.6), keys: showAt(0.06, 0.08) },
      { name: "looked after: a dish of food by the two small places", svg: food(127, 107.2), keys: showAt(0.09, 0.11) },
      { name: "looked after: a jug of water", svg: jug(131.6, 107.6), keys: showAt(0.12, 0.14) },
      { name: "cared for: a soft warm glow about the two small places", svg: glow(117.3, 104.2, 7, WARM, 0.28), keys: showAt(0.16, 0.19) },
      { name: "night", svg: NIGHT, keys: night },
      { name: "stars", svg: NIGHT_STARS, keys: night, loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "grown: a soft golden ring about the two places", svg: care(117.3, 106.4, 7, 2.4, SOFT_GOLD), keys: showAt(0.445, 0.46), loop: soft },
      {
        name: "that Day: a wide pale plain",
        svg: PLAIN,
        keys: track({
          opacity: [
            [0.53, 0],
            [0.57, 1]
          ]
        })
      },
      { name: "on that Day: his place, a golden ring", svg: ring(hisOnTheDay[0], hisOnTheDay[1], 2.4, GOLD), keys: showAt(0.56, 0.58) },
      {
        name: "on that Day: the place of the one who looked after them",
        svg: someone(theirsOnTheDay[0], theirsOnTheDay[1], 1.6),
        keys: track({
          opacity: [
            [0.58, 0],
            [0.6, 1]
          ],
          xy: [
            [0.78, 0, 0],
            [0.85, -20.8, -1.6]
          ]
        })
      },
      { name: "close: a soft golden ring about the two places", svg: care(72.6, 101.8, 6.4, 2.4, SOFT_GOLD), keys: showAt(0.86, 0.89), loop: soft },
      { name: "close: a soft golden glow about the two places", svg: glow(72.6, 100.2, 8, WARM, 0.24), keys: showAt(0.88, 0.92) },
      {
        name: "close: glints over the two places",
        svg: glints([
          [69.4, 96.6],
          [76, 96.4]
        ]),
        keys: showAt(0.91, 0.93),
        loop: speaking
      }
    ],
    words: [
      { text: "He said: whoever looks after two girls", from: 0.02, to: 0.253 },
      { text: "until they come of age", from: 0.268, to: 0.501 },
      { text: "will come on the Day of Resurrection", from: 0.516, to: 0.749 },
      { text: "I and that one, and he joined his fingers", from: 0.764, to: 1 }
    ]
  };
}

// The du'a for one who is ill. Aishah said: when the Messenger of Allah ﷺ came to one who was ill, or one who was ill
// was brought to him, he would say: take away the harm, O Lord of the people; heal, for You are the Healer; there is
// no healing but Your healing, a healing that leaves no illness (Sahih al-Bukhari 5675). No one is drawn: by a home,
// the place of one who is ill lies on a mat, with a grey haze about it. His place, a golden ring, comes from the
// masjid of Madinah to it, and his voice speaks; with each line of the du'a a spark rises from his place. A soft warm
// glow comes about the place of the one who is ill, then a soft golden ring; the grey haze goes, and glints show.
function aDuaForTheSick(): SignArt {
  const his0: [number, number] = [32, 101.6];
  const his1: [number, number] = [109.6, 104.6];
  const ill: [number, number] = [121.6, 105.6];
  const rising: [number, number][] = [
    [0.21, 0.28],
    [0.36, 0.43],
    [0.52, 0.58],
    [0.69, 0.75]
  ];
  return {
    kind: "a-dua-for-the-sick",
    ms: 12000,
    parts: [
      ...daySky(70, 34, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: tenderLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [58, 92.6, 12],
        [148, 93.4, 11]
      ]),
      { name: "a home", svg: home(126, 94.4, 20, 12) },
      { name: "a mat by the home's door", svg: cloth(114, 130, 106.4) },
      { name: "the place of one who is ill, on the mat", svg: someone(ill[0], ill[1], 1.5) },
      {
        name: "ill: a grey haze about that place",
        svg: wash(ill[0], n(ill[1] - 0.6), 6.4, 3.4, "#6E6E6E", 0.16),
        keys: track({
          opacity: [
            [0.85, 1],
            [0.89, 0]
          ]
        })
      },
      { name: "his place, a golden ring", svg: ring(his0[0], his0[1], 2.4, GOLD), keys: track({ xy: [[0.03, 0, 0], [0.12, n(his1[0] - his0[0]), n(his1[1] - his0[1])]] }) },
      { name: "his voice: take away the harm", svg: arcs(n(his1[0] + 2.4), n(his1[1] - 3.6), GOLD), keys: showAt(0.19, 0.2), loop: speaking },
      ...rising.map(([a, b], i): SignPart => ({
        name: `the du'a: a spark rising from his place ${i + 1}`,
        svg: sparkle(his1[0], n(his1[1] - 3.2), 1.4, SPARK),
        keys: sparkRising(a, b, 12),
        loop: speaking
      })),
      { name: "heal: a soft warm glow about the place of the one who is ill", svg: glow(ill[0], n(ill[1] - 1), 6, WARM, 0.3), keys: showAt(0.59, 0.62) },
      { name: "healing from Him alone: a soft golden ring about that place", svg: care(ill[0], n(ill[1] + 0.5), 3.6, 1.8, SOFT_GOLD), keys: showAt(0.76, 0.79), loop: soft },
      {
        name: "no illness left: glints over that place",
        svg: glints([
          [n(ill[0] - 2.6), n(ill[1] - 5)],
          [n(ill[0] + 2.8), n(ill[1] - 5.4)]
        ]),
        keys: showAt(0.9, 0.92),
        loop: speaking
      }
    ],
    words: [
      { text: "When he came to one who was ill", from: 0.02, to: 0.17 },
      { text: "he said: take away the harm", from: 0.185, to: 0.335 },
      { text: "O Lord of the people", from: 0.35, to: 0.5 },
      { text: "heal, for You are the Healer", from: 0.515, to: 0.665 },
      { text: "there is no healing but Your healing", from: 0.68, to: 0.83 },
      { text: "a healing that leaves no illness", from: 0.845, to: 1 }
    ]
  };
}

/** A heap of cut palm fronds lying on the ground about (x, y). */
const fronds = (x: number, y: number) =>
  [-3, -1, 1.2, 3]
    .map((dx, i) => `<path d="M${n(x + dx - 3)} ${n(y - (i % 2) * 0.6)} Q${n(x + dx)} ${n(y - 2.4)} ${n(x + dx + 3.4)} ${n(y - 0.4 - (i % 2) * 0.4)}" stroke="${i % 2 ? "#6E9A44" : "#86AE52"}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`)
    .join("");

/** One band of a woven basket, its foot at (x, y): band `i` of three, from the bottom. */
const basketBand = (x: number, y: number, i: number) => {
  const y1 = n(y - i * 1.4);
  const y2 = n(y - (i + 1) * 1.4);
  const w1 = 3.4 + i * 0.4;
  const w2 = 3.8 + i * 0.4;
  return (
    `<path d="M${n(x - w1)} ${y1} L${n(x + w1)} ${y1} L${n(x + w2)} ${y2} L${n(x - w2)} ${y2} Z" fill="${i % 2 ? "#C8A066" : "#B88E52"}"/>` +
    `<path d="M${n(x - w1 + 1)} ${n((y1 + y2) / 2)} L${n(x + w1 - 1)} ${n((y1 + y2) / 2)}" stroke="#9C7640" stroke-width="0.25" stroke-dasharray="0.8 0.6"/>`
  );
};

/** A whole woven basket, its foot at (x, y). */
const basket = (x: number, y: number) => basketBand(x, y, 0) + basketBand(x, y, 1) + basketBand(x, y, 2) + `<path d="M${n(x - 4.6)} ${n(y - 4.2)} L${n(x + 4.6)} ${n(y - 4.2)}" stroke="#8E6A38" stroke-width="0.5"/>`;

/** A row of five rings of iron, joined, from (x, y). */
const mailRow = (x: number, y: number) =>
  Array.from({ length: 5 }, (_, i) => `<circle cx="${n(x + i * 1.6)}" cy="${y}" r="0.9" stroke="#7C8794" stroke-width="0.4" fill="none"/>`).join("");

// The work of his hands. Al-Miqdam said that the Messenger of Allah ﷺ said: no one has ever eaten food better than
// what he eats from the work of his own hands, and the Prophet of Allah Dawud, peace be on him, used to eat from the
// work of his hands (Sahih al-Bukhari 2072). No one is drawn: by the masjid of Madinah, his place, a golden ring, and
// his voice; by a heap of palm fronds, a basket is woven band by band beside the place of one who works. The basket
// goes to a stall of the market, and coins come back to that place; a dish of food shows by it, a soft golden ring
// comes about the place and a soft golden glow about the dish. Long before: Dawud's work, rings of iron joining row by
// row into a coat of mail spread on the ground; a dish of food shows by it, with a soft golden glow and glints.
function theWorkOfHisHands(): SignArt {
  const his: [number, number] = [32, 101.6];
  const worker: [number, number] = [64, 103.8];
  const basketAt: [number, number] = [72.4, 106.4];
  const stallAt: [number, number] = [100, 97];
  const coinsAt: [number, number] = [96.6, 96.4];
  return {
    kind: "the-work-of-his-hands",
    ms: 11000,
    parts: [
      ...daySky(70, 124, 11000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: tenderLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [48, 92.6, 12],
        [150, 93.4, 11]
      ]),
      { name: "a stall of the market", svg: stall(stallAt[0], 16, "#5C8A4E", 84, stallAt[1]) },
      { name: "a heap of palm fronds", svg: fronds(56.4, 106.6) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: no one has eaten better", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "the place of one who works", svg: someone(worker[0], worker[1], 1.5) },
      ...[0, 1, 2].map((i): SignPart => ({
        name: `the work: a basket woven, band ${i + 1}`,
        svg: basketBand(basketAt[0], basketAt[1], i),
        keys: showFor(at3(0.07 + i * 0.03), at3(0.08 + i * 0.03), 0.22, 0.225)
      })),
      {
        name: "the basket, going to the market",
        svg: basket(basketAt[0], basketAt[1]),
        keys: track({
          opacity: [
            [0.22, 0],
            [0.225, 1]
          ],
          xy: [
            [0.23, 0, 0],
            [0.28, n(stallAt[0] + 4 - basketAt[0]), n(stallAt[1] - 0.2 - basketAt[1])]
          ]
        })
      },
      {
        name: "the price: coins coming back to that place",
        svg: coins(coinsAt[0], coinsAt[1], 3),
        keys: track({
          opacity: [
            [0.3, 0],
            [0.305, 1],
            [0.42, 1],
            [0.43, 0]
          ],
          xy: [
            [0.31, 0, 0],
            [0.35, n(worker[0] + 3 - coinsAt[0]), n(worker[1] + 2.4 - coinsAt[1])]
          ]
        })
      },
      { name: "earned: a dish of food by that place", svg: food(n(worker[0] + 4.4), 107), keys: showAt(0.43, 0.45) },
      { name: "earned: a soft golden ring about that place", svg: care(worker[0], n(worker[1] + 0.4), 3.2, 1.7, SOFT_GOLD), keys: showAt(0.47, 0.5), loop: soft },
      { name: "better: a soft golden glow about the dish", svg: glow(n(worker[0] + 4.4), 105, 6, WARM, 0.3), keys: showAt(0.51, 0.54) },
      ...[0, 1, 2].map((i): SignPart => ({
        name: `long before: Dawud's work, rings of iron joining, row ${i + 1}`,
        svg: mailRow(126 + (i % 2) * 0.8, n(104 + i * 1.5)),
        keys: showAt(at3(0.66 + i * 0.03), at3(0.67 + i * 0.03))
      })),
      { name: "long before: a coat of mail, spread on the ground", svg: care(129.6, 105.6, 5.6, 2.8, "#9AA6B2"), keys: showAt(0.74, 0.75) },
      { name: "from his work: a dish of food by the coat of mail", svg: food(142, 107), keys: showAt(0.83, 0.85) },
      { name: "from his work: a soft golden glow about the dish", svg: glow(142, 105, 6, WARM, 0.3), keys: showAt(0.87, 0.9) },
      {
        name: "from his work: glints over the coat of mail",
        svg: glints([
          [126.4, 100.6],
          [133.4, 100.2]
        ]),
        keys: showAt(0.92, 0.94),
        loop: speaking
      }
    ],
    words: [
      { text: "He said: no one has ever eaten food", from: 0.02, to: 0.204 },
      { text: "better than what one eats", from: 0.219, to: 0.403 },
      { text: "from the work of one's own hands", from: 0.418, to: 0.602 },
      { text: "and Allah's Prophet Dawud", from: 0.617, to: 0.801 },
      { text: "used to eat from the work of his hands", from: 0.816, to: 1 }
    ]
  };
}

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A low wooden trough on the ground about (x, y). */
const trough = (x: number, y: number) => `<path d="M${n(x - 4)} ${n(y - 1.8)} L${n(x + 4)} ${n(y - 1.8)} L${n(x + 3.2)} ${y} L${n(x - 3.2)} ${y} Z" fill="#9C7A52" stroke="#7A5C3A" stroke-width="0.3"/>`;

// Every good deed is charity. Jabir ibn Abdullah said that the Prophet ﷺ said: every good deed is charity (Sahih
// al-Bukhari 6021). No one is drawn: by the masjid of Madinah, his place, a golden ring, and Jabir's place; Jabir's
// voice speaks, then his. Along the way, good is done: a jug pours water into the trough of a thirsty sheep; a bundle
// goes with a young one's small place to an older one's home; and a dish goes from one home to the next. A glint shows
// at each. Then a golden spark rises from each, soft golden rings come about them, and a soft golden glow over the way.
function everyGoodIsCharity(): SignArt {
  const his: [number, number] = [32, 101.6];
  const jabir: [number, number] = [46, 104.4];
  const troughAt: [number, number] = [86, 107];
  const jugAt: [number, number] = [78.6, 106.8];
  const young0: [number, number] = [100, 105.4];
  const young1: [number, number] = [113.4, 105.2];
  const dish0: [number, number] = [126, 106.8];
  const dish1: [number, number] = [142, 106.8];
  const deeds: [number, number][] = [
    [troughAt[0], n(troughAt[1] - 4)],
    [n(young1[0] + 2.2), n(young1[1] - 3.8)],
    [dish1[0], n(dish1[1] - 4)]
  ];
  // Each glint shows once its deed is done: the water poured, the bundle brought, the dish passed on.
  const glintAt = [0.43, 0.535, 0.6];
  return {
    kind: "every-good-is-charity",
    ms: 8000,
    parts: [
      ...daySky(70, 140, 8000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: tenderLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([[62, 92.6, 12]]),
      { name: "an older one's home", svg: home(118, 94.6, 14, 10, "#D9B27C", "#BC9060") },
      { name: "a home along the way", svg: home(132, 94.6, 12, 9, "#CDAE7E", "#B39468") },
      { name: "the next home", svg: home(148, 94.6, 12, 10) },
      { name: "a trough", svg: trough(troughAt[0], troughAt[1]) },
      { name: "a thirsty sheep by the trough", svg: sheep(94, 107.6, 0.11, true), loop: { move: "bob", ms: 2600, y: -0.3 } },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.5) },
      { name: "Jabir's voice", svg: arcs(n(jabir[0] + 2.2), n(jabir[1] - 3.6), VOICE), keys: showAt(0.04, 0.05), loop: speaking },
      { name: "his voice: every good deed", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.18, 0.19), loop: speaking },
      {
        name: "water for the sheep: a jug, pouring into the trough",
        svg: jug(jugAt[0], jugAt[1]),
        origin: { x: jugAt[0], y: jugAt[1] },
        keys: track({
          xy: [
            [0.36, 0, 0],
            [0.39, 3.6, -3],
            [0.44, 3.6, -3],
            [0.47, 0, 0]
          ],
          rotate: [
            [0.36, 0],
            [0.39, 40],
            [0.44, 40],
            [0.47, 0]
          ]
        })
      },
      { name: "water in the trough", svg: `<path d="M${n(troughAt[0] - 3.4)} ${n(troughAt[1] - 1.5)} L${n(troughAt[0] + 3.4)} ${n(troughAt[1] - 1.5)}" stroke="#6FB7DA" stroke-width="0.9" stroke-linecap="round"/>`, keys: showAt(0.4, 0.43) },
      { name: "the young one's small place", svg: someone(young0[0], young0[1], 1), keys: track({ xy: [[0.46, 0, 0], [0.53, n(young1[0] - young0[0]), n(young1[1] - young0[1])]] }) },
      { name: "a bundle, going with it to the older one's home", svg: sack(n(young0[0] + 2.2), n(young0[1] + 0.4), 0.42, "#BCA67E"), keys: track({ xy: [[0.46, 0, 0], [0.53, n(young1[0] - young0[0]), n(young1[1] - young0[1])]] }) },
      { name: "shared: a dish going from one home to the next", svg: food(dish0[0], dish0[1]), keys: track({ xy: [[0.55, 0, 0], [0.6, n(dish1[0] - dish0[0]), 0]] }) },
      ...deeds.map(([x, y], i): SignPart => ({ name: `a good deed: a glint ${i + 1}`, svg: sparkle(x, y, 1, "#FFE7A0"), keys: showAt(glintAt[i], at3(glintAt[i] + 0.01)), loop: speaking })),
      ...deeds.map(([x, y], i): SignPart => ({
        name: `charity: a golden spark rising ${i + 1}`,
        svg: sparkle(x, n(y - 1.6), 1.4, SPARK),
        keys: sparkRising(at3(0.68 + i * 0.02), at3(0.74 + i * 0.02), 10)
      })),
      {
        name: "charity: soft golden rings about each good deed",
        svg: care(troughAt[0], n(troughAt[1] - 0.6), 5.4, 2, SOFT_GOLD) + care(young1[0], n(young1[1] + 0.4), 3.6, 1.6, SOFT_GOLD) + care(dish1[0], n(dish1[1] - 0.6), 4.2, 1.8, SOFT_GOLD),
        keys: showAt(0.8, 0.83),
        loop: soft
      },
      { name: "a soft golden glow over the way", svg: wash(112, 104, 40, 6, WARM, 0.12), keys: showAt(0.86, 0.9) }
    ],
    words: [
      { text: "Jabir ibn Abdullah said: he said", from: 0.02, to: 0.33 },
      { text: "every good deed", from: 0.345, to: 0.655 },
      { text: "is charity", from: 0.67, to: 1 }
    ]
  };
}

// A hundred times a day. Al-Agharr al-Muzani said that the Messenger of Allah ﷺ said: O people, turn to Allah in
// repentance, for I turn to Him in repentance a hundred times a day (Sahih Muslim 2702b). In another narration: I ask
// Allah's forgiveness a hundred times a day (Sahih Muslim 2702a). No one is drawn: by the masjid of Madinah, his place,
// a golden ring, and his voice, with the places of those he spoke to; a faint golden way goes from their places to the
// masjid, and sparks rise from them. As the sun goes across the sky, sparks rise from his place one after another;
// then small golden glints show over it, ten in a row, row after row, a hundred; and a soft golden ring comes about his
// place.
function aHundredTimesADay(): SignArt {
  const his: [number, number] = [32, 101.6];
  const folk: [number, number][] = [
    [56, 104.6],
    [64, 103.4],
    [72, 104.8],
    [80, 103.6],
    [88, 104.6]
  ];
  const theirs: [number, number][] = [folk[0], folk[2], folk[4]];
  const mine: [number, number][] = [
    [0.36, 0.42],
    [0.45, 0.51],
    [0.54, 0.6]
  ];
  return {
    kind: "a-hundred-times-a-day",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun, going across the sky",
        svg: sun(20, 30),
        keys: track({
          xy: [
            [0.36, 0, 0],
            [0.6, 50, -8],
            [0.68, 50, -8],
            [0.94, 110, 2]
          ]
        })
      },
      { name: "a cloud", svg: cloud(120, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: tenderLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [104, 92.6, 12],
        [150, 93.4, 11]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the places of those he spoke to", svg: placesAt(folk, 1.4) },
      { name: "his voice: turn back in repentance", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "turning back: a faint golden way from their places to the masjid", svg: way(`M${n(folk[0][0] - 2.2)} ${n(folk[0][1] - 2)} Q44 88 22.6 93.4`, SOFT_GOLD, 0.7), keys: showAt(0.14, 0.18) },
      ...theirs.map(([x, y], i): SignPart => ({
        name: `their repentance: a spark rising ${i + 1}`,
        svg: sparkle(x, n(y - 3), 1.2, SPARK),
        keys: sparkRising(at3(0.2 + i * 0.02), at3(0.25 + i * 0.02), 9),
        loop: speaking
      })),
      ...mine.map(([a, b], i): SignPart => ({
        name: `his repentance: a spark rising from his place ${i + 1}`,
        svg: sparkle(his[0], n(his[1] - 3.2), 1.4, SPARK),
        keys: sparkRising(a, b, 12),
        loop: speaking
      })),
      ...Array.from(
        { length: 10 },
        (_, row): SignPart => ({
          name: `a hundred: small golden glints, ten in row ${row + 1}`,
          svg: Array.from({ length: 10 }, (_, k) => `<circle cx="${n(27 + k * 2)}" cy="${n(73 + row * 1.9)}" r="0.55" fill="#E8A62E"/>`).join(""),
          keys: showAt(at3(0.69 + row * 0.02), at3(0.695 + row * 0.02)),
          loop: soft
        })
      ),
      { name: "a day of it: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.5), 3.8, 1.9, SOFT_GOLD), keys: showAt(0.9, 0.93), loop: soft }
    ],
    words: [
      { text: "He said: O people, turn to Allah", from: 0.02, to: 0.33 },
      { text: "for I turn in repentance", from: 0.345, to: 0.655 },
      { text: "to Him a hundred times a day", from: 0.67, to: 1 }
    ]
  };
}

export const TENDER_ART = {
  "a-group-of-three": aGroupOfThree,
  "four-dearest-words": fourDearestWords,
  "two-raised-well": twoRaisedWell,
  "a-dua-for-the-sick": aDuaForTheSick,
  "the-work-of-his-hands": theWorkOfHisHands,
  "every-good-is-charity": everyGoodIsCharity,
  "a-hundred-times-a-day": aHundredTimesADay
};
