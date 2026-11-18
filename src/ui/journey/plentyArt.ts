import { animalAt, cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { kabah } from "./historyArt";
import { EVENING } from "./heartArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, jug, palms, sparkRising, tent, track } from "./daysArt";
import { cloth, date, drink, greyRing, soft, speaking } from "./fastArt";
import { dish } from "./worthArt";
import { road, saddled, showAt, showFor } from "./roadArt";
import { coins, jar, stall } from "./tradeArt";
import { cup } from "./hopeArt";

/**
 * Plenty: a man asked him for sheep between two mountains and was given them, and told his tribe: embrace Islam, for he
 * gives as one who does not fear want; and Islam became dearer to that man than the world. He walked to visit Jabir,
 * riding neither a mule nor a horse. A family which has dates will not be hungry, and a family with none will be, he
 * said to Aishah, twice or thrice. When he ordered charity, they went to the market and worked as porters for a mudd to
 * give, and today some of them have a hundred thousand. An Umrah in Ramadan is equal to a Hajj, he said to a woman of
 * the Ansar whose family had ridden their camel and left one for watering. He breathed three times in the course of a
 * drink, and said it is more thirst-quenching, healthier and more wholesome, and Anas did the same. And truffles are
 * like manna, and their water heals the eyes. Only the land, the sky, buildings, things, plants and animals are drawn.
 * No Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face, and no one rides: where
 * someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in
 * the air. Nothing comes down from the sky: what is good is a light, glints and a soft golden ring, and what is
 * withheld a grey ring or a grey haze. No name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** A grey haze. */
const HAZE = "#8C8580";

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number, sunY = 20): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, sunY) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 112], [64, 115], [112, 113], [150, 114]]) => landOf(tufts, fill);

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A spark at (x, y) that rises by `rise` from `from` and is gone by `to`. */
const rising = (name: string, x: number, y: number, from: number, to: number, rise = 10): SignPart => ({
  name,
  svg: sparkle(x, y, 1.4, "#FFE7A0"),
  keys: sparkRising(from, to, rise),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

/** The masjid of Madinah, small at the left, and his place, a golden ring, by it. */
const masjidAtLeft = (): SignPart[] => [
  { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.36) },
  { name: "his place, a golden ring", svg: ring(10.6, 100.4, 2.2, GOLD) }
];

/** His voice by his place at the left. */
const HIS_VOICE = arcs(12.8, 97.4, GOLD);

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s = 0.12, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);

/** A mule or a horse of the picture cards, `s` times its size, with its feet at (x, y). */
const standing = (kind: "mule" | "horse", x: number, y: number, s: number, left = false) => animalAt(kind, n(x - 50 * s), n(y - 73 * s), s, left);

/** Keys of a move from (0, 0) through the given points, each [at, x, y]. */
const moves = (points: [number, number, number][]) => track({ xy: points });

/** Two mountains with a valley between them: the first from x 34 to 78, the second from x 90 to 136, their feet on y 95. */
const twoMountains = () =>
  `<path d="M34 95 Q46 70 56 65 Q66 70 78 95 Z" fill="#B69C74"/><path d="M56 65 Q66 70 78 95 L65 95 Q63 79 56 65 Z" fill="#000000" opacity="0.08"/>` +
  `<path d="M90 95 Q102 72 112 67 Q122 72 136 95 Z" fill="#AE946C"/><path d="M112 67 Q122 72 136 95 L122 95 Q120 81 112 67 Z" fill="#000000" opacity="0.08"/>` +
  `<path d="M52 70 L55 67 L58 69.4 M108 71.6 L111.4 68.6 L114.4 71" stroke="#CDB894" stroke-width="0.5" fill="none"/>`;

/** A basket, empty, its foot's middle at (x, y). */
const emptyBasket = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y - 4)} L${n(x + 4)} ${n(y - 4)} L${n(x + 3)} ${y} L${n(x - 3)} ${y} Z" fill="#B88A4A"/>` +
  `<path d="M${n(x - 3.6)} ${n(y - 2.6)} L${n(x + 3.6)} ${n(y - 2.6)} M${n(x - 3.3)} ${n(y - 1.3)} L${n(x + 3.3)} ${n(y - 1.3)}" stroke="#946A34" stroke-width="0.4"/>` +
  `<ellipse cx="${x}" cy="${n(y - 4)}" rx="3.8" ry="0.8" fill="#5E4220"/>`;

/** A mudd, the small measure, heaped with grain, its foot's middle at (x, y). */
const mudd = (x: number, y: number) =>
  `<rect x="${n(x - 2.4)}" y="${n(y - 3.8)}" width="4.8" height="3.8" fill="#A8743F"/><rect x="${n(x - 2.4)}" y="${n(y - 2.6)}" width="4.8" height="0.6" fill="#8A5A2E"/>` +
  `<rect x="${n(x + 0.6)}" y="${n(y - 3.8)}" width="1.8" height="3.8" fill="#000000" opacity="0.1"/>` +
  `<path d="M${n(x - 2.4)} ${n(y - 3.8)} Q${x} ${n(y - 6.8)} ${n(x + 2.4)} ${n(y - 3.8)} Z" fill="#E2C374"/>`;

/** A well of stones, its middle at (x, y). */
const well = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y + 1)}" rx="7" ry="2.8" fill="#8C7A5E"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="2.4" fill="#A8946E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 0.2)}" rx="4.4" ry="1.5" fill="#2F3B44"/>` +
  [-5, -2.4, 0.4, 3.2, 5.4].map((dx) => `<path d="M${n(x + dx)} ${n(y + 1.6)} l1.8 0" stroke="#7A684C" stroke-width="0.6"/>`).join("");

/** A small puff of breath, white and soft, its middle at (x, y). */
const puff = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="1.6" fill="#FFFFFF" stroke="#C9D8E2" stroke-width="0.25" opacity="0.9"/><circle cx="${n(x - 1.8)}" cy="${n(y + 0.8)}" r="1.1" fill="#FFFFFF" stroke="#C9D8E2" stroke-width="0.2" opacity="0.8"/><circle cx="${n(x - 3.1)}" cy="${n(y + 0.3)}" r="0.7" fill="#FFFFFF" stroke="#C9D8E2" stroke-width="0.15" opacity="0.65"/>`;

/** A desert truffle, round and knobbly, its middle at (x, y). */
const truffle = (x: number, y: number, r = 2) =>
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.82)}" fill="#C49C72"/>` +
  `<ellipse cx="${n(x - r * 0.3)}" cy="${n(y - r * 0.3)}" rx="${n(r * 0.42)}" ry="${n(r * 0.3)}" fill="#DCBD94"/>` +
  `<circle cx="${n(x + r * 0.4)}" cy="${n(y + r * 0.1)}" r="${n(r * 0.16)}" fill="#A07A52"/><circle cx="${n(x - r * 0.2)}" cy="${n(y + r * 0.4)}" r="${n(r * 0.13)}" fill="#A07A52"/>`;

/** A low mound of sand, its foot's middle at (x, y), `w` wide. */
const mound = (x: number, y: number, w = 8) => `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - 3.6)} ${n(x + w / 2)} ${y} Z" fill="#D7BB86"/>`;

/** A crack across the top of a mound whose foot's middle is at (x, y). */
const crack = (x: number, y: number) =>
  `<path d="M${n(x - 2)} ${n(y - 1.4)} L${n(x - 0.7)} ${n(y - 2)} L${n(x + 0.3)} ${n(y - 1.5)} L${n(x + 1.9)} ${n(y - 2.1)}" stroke="#9C7E4E" stroke-width="0.45" fill="none" stroke-linecap="round"/>`;

/** A wooden bowl, its foot's middle at (x, y), empty. */
const bowl = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${n(y - 2.6)} Q${n(x - 2.8)} ${y} ${x} ${y} Q${n(x + 2.8)} ${y} ${n(x + 3)} ${n(y - 2.6)} Z" fill="#9A6A3E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.6)}" rx="2.9" ry="0.65" fill="#6E4A28"/>`;

// A flock between two mountains. Anas said: a man asked the Prophet ﷺ for sheep between two mountains, and he gave them
// to him; the man came to his people and said: my people, embrace Islam, for by Allah, Muhammad ﷺ gives as one who does
// not fear want. Anas said: a man would embrace Islam wanting only the world, and before long Islam became dearer to him
// than the world and all on it (Sahih Muslim 2312b). No one is drawn: by the masjid of Madinah, the place of the one who
// asked speaks to his place, and goes to a very large flock in the valley between two mountains; a soft golden ring
// comes about the flock, given. It drives the flock on to the tents of its tribe, and its voice speaks to them; the
// places of the tribe come out, glints come over the flock, and a warm glow comes about his place. A soft white ring
// comes about the one who asked as it embraces Islam, and a faint line goes from it to the flock, for the world; the sun
// goes on, and sparks rise from it, the line and the glints fade, and a soft golden ring and a warm glow come about it.
function flockBetweenMountains(): SignArt {
  const anas: [number, number] = [26, 110.4];
  const asker: [number, number] = [26, 101.6];
  const atFlock: [number, number] = [64, 102.6];
  const atTents: [number, number] = [137, 107];
  const go = (to: [number, number]) => [n(to[0] - asker[0]), n(to[1] - asker[1])] as [number, number];
  const shift: [number, number] = [30, 3.2];
  const flock: [number, number, boolean][] = [
    [77, 93.4, false],
    [84, 92.8, true],
    [91, 93.4, false],
    [98, 93, false],
    [73, 96.8, false],
    [80, 96.4, false],
    [87, 96.8, true],
    [94, 96.4, false],
    [101, 96.8, false],
    [76.6, 100.2, false],
    [84, 100.4, false],
    [91.4, 100.2, true]
  ];
  const doors: [number, number][] = [
    [146, 100],
    [146, 100],
    [155, 104.6]
  ];
  const tribe: [number, number][] = [
    [143.4, 111],
    [150.6, 112],
    [157, 110.6]
  ];
  const withFlock = (extra: [number, number, number][] = []) =>
    moves([
      [0.27, 0, 0],
      [0.33, ...shift],
      ...extra
    ]);
  const final = (x: number, y: number): [number, number] => [n(x + shift[0]), n(y + shift[1])];
  return {
    kind: "flock-between-mountains",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun, going on across the sky",
        svg: sun(34, 22),
        keys: moves([
          [0.78, 0, 0],
          [0.82, 30, -6]
        ])
      },
      { name: "a cloud", svg: cloud(118, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "two mountains, a valley between them", svg: twoMountains() },
      { name: "a tent of its tribe", svg: tent(146, 100, 13, 10, "#E9DCBC") },
      { name: "another tent of its tribe", svg: tent(155, 104.6, 9, 7.6, "#E2D2AE") },
      ...masjidAtLeft(),
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.4) },
      { name: "Anas's voice: one asked him", svg: arcs(n(anas[0] + 1.8), n(anas[1] - 3.2), ITS_VOICE), keys: showFor(0.025, 0.035, 0.08, 0.09), loop: speaking },
      {
        name: "a very large flock of sheep, between the two mountains",
        svg: flock.map(([x, y, left]) => sheepAt(x, y, 0.065, left)).join(""),
        keys: withFlock(),
        loop: { move: "bob", ms: 1800, y: -0.3 }
      },
      {
        name: "given: a soft golden ring about the flock",
        svg: care(87, 97.6, 18, 6, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.21, 1]
          ],
          xy: [
            [0.27, 0, 0],
            [0.33, ...shift]
          ]
        }),
        loop: soft
      },
      {
        name: "the place of the one who asked, going to the flock and on to its tribe",
        svg: someone(asker[0], asker[1], 1.5),
        keys: moves([
          [0.15, 0, 0],
          [0.2, ...go(atFlock)],
          [0.27, ...go(atFlock)],
          [0.33, ...go(atTents)]
        ])
      },
      { name: "its voice: asking him for a flock", svg: arcsLeft(n(asker[0] - 2), n(asker[1] - 3.4), ITS_VOICE), keys: showFor(0.05, 0.06, 0.145, 0.155), loop: speaking },
      { name: "its voice to its tribe: embrace Islam", svg: arcs(n(atTents[0] + 2), n(atTents[1] - 3.4), ITS_VOICE), keys: showFor(0.39, 0.4, 0.56, 0.57), loop: speaking },
      ...tribe.map(
        ([x, y], i): SignPart => ({
          name: `the place of one of its tribe, coming out ${i + 1}`,
          svg: someone(x, y, 1.4),
          keys: track({
            opacity: [
              [0.4, 0],
              [0.405, 1]
            ],
            xy: [
              [0.4, n(doors[i][0] - x), n(doors[i][1] - y)],
              [0.45, 0, 0]
            ]
          })
        })
      ),
      {
        name: "glints over the flock",
        svg: glints(
          [
            final(80, 87.6),
            final(90, 87),
            final(100, 88)
          ],
          1,
          "#FFD866"
        ),
        keys: showFor(0.52, 0.53, 0.9, 0.93),
        loop: twinkle()
      },
      { name: "he gives: a warm glow about his place", svg: glow(10.6, 99.6, 5.6, WARM, 0.3), keys: showAt(0.53, 0.55), loop: soft },
      { name: "Anas's voice: it would embrace Islam", svg: arcs(n(anas[0] + 1.8), n(anas[1] - 3.2), ITS_VOICE), keys: showFor(0.635, 0.645, 0.8, 0.81), loop: speaking },
      { name: "embracing Islam: a soft white ring about it", svg: care(atTents[0], n(atTents[1] + 0.6), 3.8, 1.8, "#FFFFFF"), keys: showAt(0.66, 0.68), loop: soft },
      {
        name: "for the world: a faint line from it to the flock",
        svg: `<path d="M${n(atTents[0] - 2)} ${n(atTents[1] - 1.2)} L${final(92, 98)[0]} ${final(92, 98)[1]}" stroke="#FFFFFF" stroke-width="0.5" stroke-dasharray="0.9 0.9" opacity="0.75"/>`,
        keys: showFor(0.76, 0.77, 0.88, 0.9)
      },
      rising("dearer than the world: a spark rising", n(atTents[0] - 0.8), n(atTents[1] - 4.6), 0.88, 0.95),
      rising("and another spark rising", n(atTents[0] + 1.2), n(atTents[1] - 4.6), 0.9, 0.96),
      { name: "a soft golden ring about it", svg: care(atTents[0], n(atTents[1] + 0.6), 4.4, 2, SOFT_GOLD), keys: showAt(0.9, 0.92), loop: soft },
      { name: "a warm glow about it", svg: glow(atTents[0], n(atTents[1] - 0.8), 5.4, WARM, 0.3), keys: showAt(0.92, 0.94), loop: soft }
    ],
    words: [
      { text: "Anas: a person asked him for", from: 0.02, to: 0.13 },
      { text: "a very large flock, and he gave it.", from: 0.142, to: 0.252 },
      { text: "The person came to his own tribe and said:", from: 0.264, to: 0.374 },
      { text: "O people, embrace Islam; by Allah,", from: 0.386, to: 0.496 },
      { text: "he gives as if he did not fear want.", from: 0.508, to: 0.618 },
      { text: "Anas: a man would embrace Islam", from: 0.63, to: 0.74 },
      { text: "wanting only the world, but before long", from: 0.752, to: 0.862 },
      { text: "Islam became dearer to him than the world", from: 0.874, to: 1 }
    ]
  };
}

// On foot to visit. Jabir said: the Prophet ﷺ came to visit me while I was sick, riding neither a mule nor a horse
// (Sahih al-Bukhari 5664). No one is drawn, and no one rides: by the masjid of Madinah a mule and a horse stand tied to
// a post. Jabir's voice speaks; his place, a golden ring, walks along the way toward Jabir's home, and a grey haze comes
// about Jabir's place on a mat; his place walks on to Jabir. A soft white ring comes about the mule, left standing, and
// the way he walked shows as a dashed line; a soft white ring comes about the horse, left standing too. A warm glow
// comes about Jabir's place, the grey haze fades, and a soft golden ring comes about his place by Jabir.
function onFootToVisit(): SignArt {
  const start: [number, number] = [10.6, 100.4];
  const mid: [number, number] = [66, 104.6];
  const end: [number, number] = [120.6, 105];
  const jabir: [number, number] = [134, 104.4];
  const d = (p: [number, number]) => [n(p[0] - start[0]), n(p[1] - start[1])] as [number, number];
  const mule: [number, number] = [34, 93.6];
  const horse: [number, number] = [53, 94];
  return {
    kind: "on-foot-to-visit",
    ms: 8000,
    parts: [
      ...daySky(118, 46, 8000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the way across the land", svg: road(4, 130, 104.8) },
      ...palms(
        [
          [100, 92, 18],
          [156, 96, 16]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.36) },
      {
        name: "a post the animals are tied to",
        svg:
          `<rect x="42.8" y="85.4" width="1.2" height="8.8" fill="#8A6440"/><ellipse cx="43.4" cy="94.2" rx="1.4" ry="0.4" fill="#000000" opacity="0.12"/>` +
          `<path d="M38.2 88 Q40.6 89.6 42.8 88.4 M44 88.4 Q46.2 89.6 48.4 88" stroke="#6B4A2E" stroke-width="0.4" fill="none"/>`
      },
      { name: "a mule, tied and left standing", svg: standing("mule", mule[0], mule[1], 0.12), loop: { move: "bob", ms: 2400, y: -0.2 } },
      { name: "a horse, tied and left standing", svg: standing("horse", horse[0], horse[1], 0.13, true), loop: { move: "bob", ms: 2800, y: -0.2, phase: 0.4 } },
      { name: "Jabir's home", svg: home(141, 97, 20, 13) },
      { name: "a mat by Jabir's home", svg: cloth(127, 142, 102.8, "#D8C39A") },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.5) },
      { name: "Jabir's voice: he came to visit me", svg: arcsLeft(n(jabir[0] - 2), n(jabir[1] - 3.4), ITS_VOICE), keys: showFor(0.03, 0.04, 0.19, 0.2), loop: speaking },
      {
        name: "sick: a grey haze about Jabir's place",
        svg: wash(jabir[0], n(jabir[1] - 0.6), 6.4, 4, HAZE, 0.14),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.29, 1],
            [0.82, 1],
            [0.86, 0]
          ]
        })
      },
      {
        name: "his place, a golden ring, walking to visit",
        svg: ring(start[0], start[1], 2.2, GOLD),
        keys: moves([
          [0.06, 0, 0],
          [0.2, ...d(mid)],
          [0.3, ...d(mid)],
          [0.44, ...d(end)]
        ])
      },
      { name: "neither a mule: a soft white ring about the mule", svg: care(mule[0], n(mule[1] + 0.4), 7.4, 2, "#FFFFFF"), keys: showAt(0.52, 0.54), loop: soft },
      { name: "walking: the way he went, a dashed line", svg: way("M15 102.6 Q40 106.4 66 105.6 Q92 104.8 117 106", "#FFF0C4", 0.8), keys: showAt(0.56, 0.6) },
      { name: "nor a horse: a soft white ring about the horse", svg: care(horse[0], n(horse[1] + 0.4), 7.8, 2, "#FFFFFF"), keys: showAt(0.75, 0.77), loop: soft },
      { name: "visiting: a warm glow about Jabir's place", svg: glow(jabir[0], n(jabir[1] - 0.6), 5.6, WARM, 0.3), keys: showAt(0.8, 0.82), loop: soft },
      { name: "a soft golden ring about his place by Jabir", svg: care(end[0], n(end[1] + 0.6), 3.8, 1.7, SOFT_GOLD), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: [
      { text: "Jabir: he came to visit me", from: 0.02, to: 0.245 },
      { text: "while I was sick,", from: 0.26, to: 0.485 },
      { text: "and he was riding neither a mule,", from: 0.5, to: 0.725 },
      { text: "nor a horse.", from: 0.74, to: 1 }
    ]
  };
}

// Dates in the home. Aishah said that the Messenger of Allah ﷺ said: a family which has dates will not be hungry;
// and: Aishah, a home with no dates in it, its family will be hungry; he said it twice or three times (Sahih Muslim
// 2046). No one is drawn: by his home, his place, a golden ring, and Aishah's place; Aishah's voice speaks, and
// his. By a home with a basket of dates, glints come over the dates, a warm glow comes about its family's places, and
// dates show on a dish before them. His voice turns to Aishah; a grey ring comes about the empty basket of another home,
// a grey haze comes about its family's places, and an empty dish shows before them. His voice to Aishah stops and
// speaks again, twice, and a third time.
function datesInTheHome(): SignArt {
  const his: [number, number] = [26, 104.6];
  const aishah: [number, number] = [14, 105.6];
  const withDates: [number, number][] = [
    [68, 104.2],
    [74.4, 105.6],
    [80.8, 104.4]
  ];
  const without: [number, number][] = [
    [122, 104.2],
    [128.4, 105.6],
    [134.8, 104.4]
  ];
  const basket: [number, number] = [90, 104.8];
  const empty: [number, number] = [144, 104.8];
  return {
    kind: "dates-in-the-home",
    ms: 9000,
    parts: [
      ...daySky(108, 56, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms(
        [
          [100, 96, 18],
          [156, 98, 16]
        ],
        "Madinah"
      ),
      { name: "his home", svg: home(20, 97, 24, 14) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.4) },
      { name: "Aishah's voice: he said", svg: arcs(n(aishah[0] + 1.6), n(aishah[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      { name: "his voice: a family which has dates", svg: arcs(n(his[0] + 2.2), n(his[1] - 3), GOLD), keys: showFor(0.1, 0.11, 0.41, 0.42), loop: speaking },
      { name: "a home with dates", svg: home(74, 96, 20, 13) },
      { name: "the places of the family with dates", svg: withDates.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "a basket of dates by that home", svg: basketOfDates(basket[0], basket[1]) },
      {
        name: "glints over the basket of dates",
        svg: glints(
          [
            [n(basket[0] - 3), n(basket[1] - 8.4)],
            [n(basket[0] + 2.8), n(basket[1] - 9)]
          ],
          0.9,
          "#FFD866"
        ),
        keys: showAt(0.22, 0.23),
        loop: twinkle()
      },
      { name: "not hungry: a warm glow about the family with dates", svg: wash(74.4, 104.4, 11, 4.2, WARM, 0.16), keys: showAt(0.25, 0.27), loop: soft },
      {
        name: "dates on a dish before them",
        svg:
          dish(74.4, 110.4) +
          [
            [-1.7, 109],
            [0, 109.2],
            [1.7, 109],
            [-0.8, 108],
            [0.9, 108]
          ]
            .map(([dx, y]) => date(n(74.4 + dx), y))
            .join(""),
        keys: showAt(0.28, 0.3)
      },
      {
        name: "his voice to Aishah: O Aishah",
        svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.2), GOLD),
        keys: track({
          opacity: [
            [0.415, 0],
            [0.425, 1],
            [0.8, 1],
            [0.81, 0],
            [0.83, 0],
            [0.84, 1],
            [0.87, 1],
            [0.88, 0],
            [0.9, 0],
            [0.91, 1]
          ]
        }),
        loop: speaking
      },
      { name: "a home with no dates", svg: home(128, 96, 20, 13) },
      { name: "the places of the family with no dates", svg: without.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "an empty basket by that home", svg: emptyBasket(empty[0], empty[1]) },
      { name: "no dates: a grey ring about the empty basket", svg: greyRing(empty[0], n(empty[1] - 2.2), 5.2, 3.6), keys: showAt(0.47, 0.49) },
      { name: "hungry: a grey haze about the family with no dates", svg: wash(128.4, 104.4, 11, 4.2, HAZE, 0.12), keys: showAt(0.62, 0.64) },
      { name: "an empty dish before them", svg: dish(128.4, 110.4), keys: showAt(0.66, 0.68) }
    ],
    words: [
      { text: "Aishah: he said: a family which has dates", from: 0.02, to: 0.2 },
      { text: "will not be hungry.", from: 0.215, to: 0.395 },
      { text: "O Aishah, a family which has no dates,", from: 0.41, to: 0.59 },
      { text: "its members will be hungry.", from: 0.605, to: 0.785 },
      { text: "He said this twice or thrice.", from: 0.8, to: 1 }
    ]
  };
}

// Porters in the market. Abu Mas'ud al-Ansari said: whenever the Messenger of Allah ﷺ ordered us to give in charity,
// one of us would go to the market and work as a porter, and so earn a mudd; and today some of them have a hundred
// thousand (Sahih al-Bukhari 1416). No one is drawn: by the masjid of Madinah, his place, a golden ring, and the
// teller's place; the teller's voice speaks, and his, and a place in need shows by the way with an empty dish. The
// teller's place goes to the market, and a load shows by it and is carried from one stall to the other. A mudd of grain
// shows by it, and it carries the mudd back to the place in need, given in charity, and a warm glow comes about it. The
// sun goes on, and by a home a heap of sacks and coins shows, with glints.
function portersInTheMarket(): SignArt {
  const teller: [number, number] = [26, 104.6];
  const needy: [number, number] = [54, 106.4];
  const atFirst: [number, number] = [96, 104.6];
  const atSecond: [number, number] = [132, 104.6];
  const back: [number, number] = [65, 104.8];
  const d = (p: [number, number]) => [n(p[0] - teller[0]), n(p[1] - teller[1])] as [number, number];
  const load: [number, number] = [100.4, 106.6];
  const muddAt: [number, number] = [127.4, 108.4];
  const muddTo: [number, number] = [59.6, 109.4];
  return {
    kind: "porters-in-the-market",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun, going on to today",
        svg: sun(30, 24),
        keys: moves([
          [0.725, 0, 0],
          [0.8, 44, -8]
        ])
      },
      { name: "a cloud", svg: cloud(120, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...masjidAtLeft(),
      { name: "a home of the town", svg: home(80, 96, 16, 11) },
      { name: "a market's stall", svg: stall(104, 22, "#B8603A", 80, 94) },
      { name: "another market's stall", svg: stall(140, 22, "#C27A3C", 80, 94) },
      { name: "goods on the stalls", svg: jar(97.6, 94, 0.6) + jar(102, 94, 0.6, "#C47E46") + sack(108.6, 94, 0.5) + jar(134, 94, 0.6) + coins(140.4, 93.6, 2) + sack(146.4, 94, 0.5) },
      {
        name: "the place of the one who told it, going to the market and back",
        svg: someone(teller[0], teller[1], 1.4),
        keys: moves([
          [0.3, 0, 0],
          [0.38, ...d(atFirst)],
          [0.45, ...d(atFirst)],
          [0.5, ...d(atSecond)],
          [0.6, ...d(atSecond)],
          [0.645, ...d(back)]
        ])
      },
      { name: "the teller's voice: whenever he ordered us", svg: arcs(n(teller[0] + 1.8), n(teller[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.24, 0.245), loop: speaking },
      { name: "his voice: give in charity", svg: HIS_VOICE, keys: showFor(0.06, 0.07, 0.2, 0.21), loop: speaking },
      { name: "a place in need by the way", svg: someone(needy[0], needy[1], 1.4), keys: showAt(0.18, 0.2) },
      { name: "an empty dish by the place in need", svg: dish(n(needy[0] - 5.4), 109.2), keys: showAt(0.18, 0.2) },
      {
        name: "working as a porter: a load carried from one stall to the other",
        svg: sack(load[0], load[1], 0.8),
        keys: track({
          opacity: [
            [0.44, 0],
            [0.45, 1]
          ],
          xy: [
            [0.45, 0, 0],
            [0.5, 36, 0]
          ]
        })
      },
      {
        name: "a mudd of grain, earned, and carried to the place in need",
        svg: mudd(muddAt[0], muddAt[1]),
        keys: track({
          opacity: [
            [0.585, 0],
            [0.595, 1]
          ],
          xy: [
            [0.6, 0, 0],
            [0.645, n(muddTo[0] - muddAt[0]), n(muddTo[1] - muddAt[1])]
          ]
        })
      },
      { name: "given in charity: a warm glow about the place in need", svg: glow(needy[0], n(needy[1] - 0.6), 5, WARM, 0.32), keys: showAt(0.648, 0.66), loop: soft },
      {
        name: "today: a heap of sacks and coins by the home",
        svg: sack(73.6, 103.6, 0.8) + sack(79.6, 103.2, 0.95) + sack(85.8, 103.6, 0.8) + coins(76.6, 106.2, 4) + coins(82.6, 106.4, 5),
        keys: showAt(0.87, 0.89)
      },
      {
        name: "glints over the heap",
        svg: glints(
          [
            [73, 96.4],
            [80.4, 95.2],
            [87, 96.6]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abu Mas'ud: whenever he ordered us", from: 0.02, to: 0.145 },
      { text: "to give in charity,", from: 0.16, to: 0.285 },
      { text: "we used to go to the market", from: 0.3, to: 0.425 },
      { text: "and work as porters", from: 0.44, to: 0.565 },
      { text: "and get a mudd,", from: 0.58, to: 0.705 },
      { text: "and today some of us have", from: 0.72, to: 0.845 },
      { text: "one hundred thousand.", from: 0.86, to: 1 }
    ]
  };
}

// Umrah in Ramadan. Ibn Abbas said that the Messenger of Allah ﷺ asked a woman of the Ansar: what kept you from Hajj
// with us? She said: we had a camel for watering; the father of so-and-so and his son rode it, and left a camel for us to
// water with. He said: when Ramadan comes, perform Umrah, for an Umrah in Ramadan is equal to a Hajj (Sahih al-Bukhari
// 1782). No one is drawn, and no one rides: by the masjid of Madinah, Ibn Abbas's voice speaks, and his to the place of
// the one he asked, and the way to the Ka'bah, far off in Makkah, shows as a faint dashed line. Her voice answers. By her
// home two places show by a camel, and are gone, and the camel, saddled, goes off up the way toward Makkah. A soft white
// ring comes about the other camel, by a well: it walks on, its rope draws the bucket up, and water runs in the channel
// to the palms. His voice speaks; the evening comes and the new moon of Ramadan shows; the way to Makkah turns golden, a
// soft golden glow comes about the Ka'bah, and a soft golden ring about her place.
function umrahInRamadan(): SignArt {
  const ibn: [number, number] = [22, 110.4];
  const her: [number, number] = [30, 102];
  const first: [number, number] = [72, 103.8];
  const two: [number, number][] = [
    [64.2, 106],
    [80.6, 106.4]
  ];
  const wellAt: [number, number] = [100, 101.8];
  const second: [number, number] = [118, 104.6];
  const walk = 10;
  const toMakkah = "M46 100.6 Q58 93 68 87.4 Q78 81.6 84.6 77.6";
  return {
    kind: "umrah-in-ramadan",
    ms: 12000,
    parts: [
      ...daySky(120, 44, 12000),
      { name: "the evening, when Ramadan comes", svg: EVENING, keys: showAt(0.77, 0.79) },
      { name: "the new moon of Ramadan", svg: `${glow(136, 22, 6, "#FFF3C4", 0.1)}${crescent(136, 22, 3.6, 1.4, "#FFF3C4")}`, keys: showAt(0.78, 0.79), loop: soft },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the hills of Makkah, far off", svg: `<path d="M74 79 Q80 72 86 74 Q92 71 98 78 Z" fill="#C2AA80"/>` },
      { name: "the Ka'bah, far off in Makkah", svg: kabah(83.4, 77.4, 4) },
      { name: "the way to Makkah, a faint dashed line", svg: way(toMakkah, "#FFF0C4", 0.7), keys: showAt(0.15, 0.17) },
      { name: "perform Umrah: the way to Makkah, turning golden", svg: way(toMakkah, "#E8C25A", 0.9), keys: showAt(0.8, 0.82) },
      ...masjidAtLeft(),
      { name: "Ibn Abbas's place", svg: someone(ibn[0], ibn[1], 1.4) },
      { name: "Ibn Abbas's voice: he asked", svg: arcs(n(ibn[0] + 1.8), n(ibn[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      { name: "his voice: what kept you from Hajj", svg: HIS_VOICE, keys: showFor(0.05, 0.06, 0.27, 0.28), loop: speaking },
      { name: "the place of the one he asked, of the Ansar", svg: someone(her[0], her[1], 1.4) },
      { name: "her voice: we had a camel", svg: arcsLeft(n(her[0] - 1.8), n(her[1] - 3.4), ITS_VOICE), keys: showFor(0.27, 0.28, 0.755, 0.765), loop: speaking },
      { name: "her home", svg: home(56, 96, 18, 12) },
      ...palms(
        [
          [134, 99, 18],
          [150, 101, 16]
        ],
        "the garden"
      ),
      { name: "the channel to the palms, dry", svg: `<path d="M106 103.4 Q120 106 132 104.6 Q140 103.8 148 104.8" stroke="#B8986A" stroke-width="1.4" fill="none"/>` },
      {
        name: "water running in the channel to the palms",
        svg: `<path d="M106 103.4 Q120 106 132 104.6 Q140 103.8 148 104.8" stroke="#6FA8D8" stroke-width="1" fill="none"/>`,
        origin: { x: 106, y: 104 },
        keys: track({
          opacity: [
            [0.66, 0],
            [0.665, 1]
          ],
          scaleX: [
            [0.66, 0.05],
            [0.69, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.7 }
      },
      { name: "a well by the palms", svg: well(wellAt[0], wellAt[1]) },
      {
        name: "the frame over the well",
        svg: `<path d="M94.6 101.6 L94.6 92.4 M105.4 101.6 L105.4 92.4" stroke="#8A6440" stroke-width="1"/><path d="M93.8 92.6 L106.2 92.6" stroke="#7A5634" stroke-width="1.1"/>`
      },
      {
        name: "the bucket, drawn up from the well",
        svg: `<path d="M100 92.8 L100 98.6" stroke="#9C8A6C" stroke-width="0.4"/><path d="M98.4 98.6 L101.6 98.6 L101.2 101 L98.8 101 Z" fill="#7A5A38"/>`,
        keys: moves([
          [0.635, 0, 0],
          [0.68, 0, -4.6]
        ])
      },
      {
        name: "the rope from the frame to the other camel",
        svg: `<path d="M105.6 92.8 L112.4 97.4" stroke="#9C8A6C" stroke-width="0.5"/>`,
        origin: { x: 105.6, y: 92.8 },
        keys: track({
          scaleX: [
            [0.635, 1],
            [0.68, n((112.4 - 105.6 + walk) / (112.4 - 105.6))]
          ]
        })
      },
      {
        name: "the other camel, left for watering",
        svg: camel(second[0], second[1], 0.15),
        keys: moves([
          [0.635, 0, 0],
          [0.68, walk, 0]
        ]),
        loop: { move: "bob", ms: 2600, y: 0.3 }
      },
      {
        name: "left for us: a soft white ring about the other camel",
        svg: care(n(second[0] + 0.6), n(second[1] + 0.4), 8.4, 2.2, "#FFFFFF"),
        keys: track({
          opacity: [
            [0.56, 0],
            [0.575, 1]
          ],
          xy: [
            [0.635, 0, 0],
            [0.68, walk, 0]
          ]
        }),
        loop: soft
      },
      {
        name: "the first camel, saddled, going off up the way",
        svg: saddled(first[0], first[1], 0.15),
        origin: { x: first[0], y: first[1] },
        keys: track({
          opacity: [
            [0.555, 1],
            [0.575, 0]
          ],
          xy: [
            [0.52, 0, 0],
            [0.575, 10, -22]
          ],
          scale: [
            [0.52, 1],
            [0.575, 0.45]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: 0.3 }
      },
      { name: "the two who rode it: their places by the first camel", svg: two.map(([x, y]) => someone(x, y, 1.4)).join(""), keys: showFor(0.39, 0.41, 0.51, 0.52) },
      { name: "his voice: perform Umrah when Ramadan comes", svg: HIS_VOICE, keys: showAt(0.755, 0.765), loop: speaking },
      { name: "equal to a Hajj: a soft golden glow about the Ka'bah", svg: glow(85.4, 75, 6.4, WARM, 0.3), keys: showAt(0.88, 0.9), loop: soft },
      { name: "a soft golden ring about her place", svg: care(her[0], n(her[1] + 0.6), 3.8, 1.7, SOFT_GOLD), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: [
      { text: "Ibn Abbas: he asked a woman of the Ansar:", from: 0.02, to: 0.13 },
      { text: "what prevented you from Hajj with us?", from: 0.142, to: 0.252 },
      { text: "She said: we have a camel;", from: 0.264, to: 0.374 },
      { text: "the father of so-and-so and his son", from: 0.386, to: 0.496 },
      { text: "rode it, and left one camel for us", from: 0.508, to: 0.618 },
      { text: "to use for irrigation.", from: 0.63, to: 0.74 },
      { text: "He said: perform Umrah when Ramadan comes,", from: 0.752, to: 0.862 },
      { text: "for Umrah in Ramadan is equal to Hajj", from: 0.874, to: 1 }
    ]
  };
}

// Three breaths. Anas said: the Messenger of Allah ﷺ would breathe three times in the course of a drink, outside the
// vessel, and say: it is more thirst-quenching, healthier and more wholesome. Anas said: so I breathe three times in
// the course of a drink (Sahih Muslim 2028b). No one is drawn, not even a mouth: by his home, his place, a golden ring,
// on a cloth, with a jug and a cup of water. The cup rises to his place and is set down, and a small puff of breath shows
// outside it, three times, until the cup is empty; Anas's voice speaks, and his. A cool glow, a warm glow and a soft
// golden ring come about his place. Anas's voice speaks again, and Anas's cup rises and is set down three times, a puff
// of breath outside it each time, and a soft golden ring comes about Anas's place.
function threeBreaths(): SignArt {
  const his: [number, number] = [40, 101.8];
  const anas: [number, number] = [114, 104];
  const hisCup: [number, number] = [46.2, 107];
  const anasCup: [number, number] = [120.2, 109.2];
  const up = (place: [number, number], c: [number, number]) => [n(place[0] + 3.4 - c[0]), n(place[1] + 1.2 - c[1])] as [number, number];
  const sips = (c: [number, number], place: [number, number], list: [number, number, number, number][]) =>
    moves(
      list.flatMap(([a, b, e, f]): [number, number, number][] => [
        [a, 0, 0],
        [b, ...up(place, c)],
        [e, ...up(place, c)],
        [f, 0, 0]
      ])
    );
  const HIS_SIPS: [number, number, number, number][] = [
    [0.045, 0.06, 0.075, 0.09],
    [0.19, 0.2, 0.21, 0.22],
    [0.24, 0.25, 0.26, 0.27]
  ];
  const ANAS_SIPS: [number, number, number, number][] = [
    [0.71, 0.725, 0.74, 0.755],
    [0.85, 0.86, 0.87, 0.88],
    [0.905, 0.915, 0.925, 0.935]
  ];
  const breath = (name: string, x: number, y: number, show: number, fade: number): SignPart => ({
    name,
    svg: puff(x, y),
    keys: track({
      opacity: [
        [show, 0],
        [at4(show + 0.005), 1],
        [fade, 1],
        [at4(fade + 0.005), 0]
      ],
      xy: [
        [at4(show + 0.005), 0, 0],
        [at4(fade + 0.005), -1.2, -0.6]
      ]
    })
  });
  const ORDER = ["first", "second", "third"];
  return {
    kind: "three-breaths",
    ms: 10000,
    parts: [
      ...daySky(132, 70, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms(
        [
          [86, 96, 18],
          [154, 98, 16]
        ],
        "Madinah"
      ),
      { name: "his home", svg: home(38, 95, 24, 14) },
      { name: "a cloth spread to sit on", svg: cloth(29, 51, 102.6, "#E9D9B0") },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "a jug of water", svg: jug(53.8, 107.2) },
      { name: "his cup", svg: cup(hisCup[0], hisCup[1]), keys: sips(hisCup, his, HIS_SIPS) },
      {
        name: "the water in his cup, drunk",
        svg: drink(hisCup[0], hisCup[1]),
        keys: track({
          opacity: [
            [0.25, 1],
            [0.26, 0]
          ],
          xy: HIS_SIPS.flatMap(([a, b, e, f]): [number, number, number][] => [
            [a, 0, 0],
            [b, ...up(his, hisCup)],
            [e, ...up(his, hisCup)],
            [f, 0, 0]
          ])
        })
      },
      ...HIS_SIPS.map(([, , , f], i) => breath(`his ${ORDER[i]} breath, outside the cup`, n(his[0] - 4), n(his[1] - 2.6), f, at4(f + 0.02))),
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.5) },
      { name: "a cloth for Anas", svg: cloth(104, 124, 105.6, "#E3D2A6") },
      { name: "Anas's cup", svg: cup(anasCup[0], anasCup[1]), keys: sips(anasCup, anas, ANAS_SIPS) },
      {
        name: "the water in Anas's cup, drunk",
        svg: drink(anasCup[0], anasCup[1]),
        keys: track({
          opacity: [
            [0.915, 1],
            [0.925, 0]
          ],
          xy: ANAS_SIPS.flatMap(([a, b, e, f]): [number, number, number][] => [
            [a, 0, 0],
            [b, ...up(anas, anasCup)],
            [e, ...up(anas, anasCup)],
            [f, 0, 0]
          ])
        })
      },
      ...ANAS_SIPS.map(([, , , f], i) => breath(`Anas's ${ORDER[i]} breath, outside the cup`, n(anas[0] - 3.4), n(anas[1] - 2.4), f, at4(f + 0.02))),
      { name: "Anas's voice: he would breathe three times", svg: arcs(n(anas[0] + 1.8), n(anas[1] - 3.4), ITS_VOICE), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      { name: "his voice: more thirst-quenching", svg: arcs(n(his[0] + 2.6), n(his[1] - 3.8), GOLD), keys: showAt(0.28, 0.29), loop: speaking },
      { name: "thirst-quenching: a cool glow about his place", svg: glow(his[0], n(his[1] - 0.8), 6, "#D6EEFB", 0.3), keys: showAt(0.36, 0.38), loop: soft },
      { name: "healthier: a warm glow about his place", svg: glow(his[0], n(his[1] - 0.8), 5.2, WARM, 0.3), keys: showAt(0.52, 0.54), loop: soft },
      { name: "more wholesome: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 4.6, 2, SOFT_GOLD), keys: showAt(0.56, 0.58), loop: soft },
      { name: "Anas's voice: so I also breathe three times", svg: arcs(n(anas[0] + 1.8), n(anas[1] - 3.4), ITS_VOICE), keys: showAt(0.685, 0.695), loop: speaking },
      { name: "a soft golden ring about Anas's place", svg: care(anas[0], n(anas[1] + 0.6), 4, 1.8, SOFT_GOLD), keys: showAt(0.945, 0.955), loop: soft }
    ],
    words: [
      { text: "Anas: he would breathe three times", from: 0.02, to: 0.17 },
      { text: "in the course of a drink, and said:", from: 0.185, to: 0.335 },
      { text: "it is more thirst-quenching,", from: 0.35, to: 0.5 },
      { text: "healthier and more wholesome.", from: 0.515, to: 0.665 },
      { text: "Anas: so I also breathe three times", from: 0.68, to: 0.83 },
      { text: "in the course of a drink.", from: 0.845, to: 1 }
    ]
  };
}

/** A time rounded to a ten-thousandth. */
const at4 = (value: number) => Math.round(value * 10000) / 10000;

// Truffles like manna. Sa'id ibn Zayd said: I heard the Prophet ﷺ say: truffles are like manna, and their water heals
// the eyes (Sahih al-Bukhari 5708). No one is drawn, not even an eye: by the masjid of Madinah, his place, a golden ring,
// and Sa'id's place; Sa'id's voice speaks, and his. Out on the sand, low mounds rise and crack, and truffles push up
// through them, with glints, and more come up on their own. A bowl shows by them and their water fills it, with glints.
// The bowl goes to a place with a grey haze about it, the haze fades, and a soft white glow and ring come about the
// place, and a soft golden glow over the truffles.
function trufflesLikeManna(): SignArt {
  const said: [number, number] = [26, 104.6];
  const sick: [number, number] = [148, 104.6];
  const first: [number, number][] = [
    [62, 103.6],
    [78, 99.8],
    [94, 104.8],
    [110, 100.6],
    [124, 104.2]
  ];
  const more: [number, number][] = [
    [70, 109.2],
    [102, 110],
    [117, 109.6]
  ];
  const bowlAt: [number, number] = [132, 111.4];
  const bowlTo: [number, number] = [142.6, 108.6];
  return {
    kind: "truffles-like-manna",
    ms: 8000,
    parts: [
      ...daySky(122, 64, 8000),
      { name: "hills", svg: hills("#D3BA8C") },
      { name: "the sand", svg: plainLand("#E8D3A2") },
      ...masjidAtLeft(),
      { name: "Sa'id's place", svg: someone(said[0], said[1], 1.4) },
      { name: "Sa'id's voice: I heard him say", svg: arcs(n(said[0] + 1.8), n(said[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.19, 0.2), loop: speaking },
      { name: "his voice: truffles are like manna", svg: HIS_VOICE, keys: showAt(0.1, 0.11), loop: speaking },
      { name: "low mounds of sand, rising", svg: first.map(([x, y]) => mound(x, y)).join(""), keys: showAt(0.27, 0.3) },
      { name: "the mounds cracking", svg: first.map(([x, y]) => crack(x, y)).join(""), keys: showAt(0.3, 0.33) },
      {
        name: "truffles, pushing up through the sand",
        svg: first.map(([x, y]) => truffle(x, n(y - 2.2))).join(""),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.36, 1]
          ],
          xy: [
            [0.34, 0, 1.6],
            [0.38, 0, 0]
          ]
        })
      },
      {
        name: "glints over the truffles",
        svg: glints(
          first.filter((_, i) => i % 2 === 0).map(([x, y]): [number, number] => [n(x + 2.6), n(y - 6.4)]),
          0.9,
          "#FFE7A0"
        ),
        keys: showAt(0.4, 0.41),
        loop: twinkle()
      },
      { name: "more truffles, coming up on their own", svg: more.map(([x, y]) => mound(x, y, 7) + truffle(x, n(y - 2), 1.8)).join(""), keys: showAt(0.41, 0.44) },
      { name: "a place with a grey haze about it", svg: someone(sick[0], sick[1], 1.4) },
      {
        name: "a grey haze about that place",
        svg: wash(sick[0], n(sick[1] - 0.8), 6, 4, HAZE, 0.14),
        keys: track({
          opacity: [
            [0.82, 1],
            [0.86, 0]
          ]
        })
      },
      {
        name: "a bowl by the truffles",
        svg: bowl(bowlAt[0], bowlAt[1]),
        keys: track({
          opacity: [
            [0.51, 0],
            [0.53, 1]
          ],
          xy: [
            [0.75, 0, 0],
            [0.8, n(bowlTo[0] - bowlAt[0]), n(bowlTo[1] - bowlAt[1])]
          ]
        })
      },
      {
        name: "their water, filling the bowl",
        svg: `<ellipse cx="${bowlAt[0]}" cy="${n(bowlAt[1] - 2.6)}" rx="2.6" ry="0.55" fill="#9CCBEA"/>`,
        origin: { x: bowlAt[0], y: n(bowlAt[1] - 2.6) },
        keys: track({
          opacity: [
            [0.55, 0],
            [0.56, 1]
          ],
          scale: [
            [0.55, 0.2],
            [0.6, 1]
          ],
          xy: [
            [0.75, 0, 0],
            [0.8, n(bowlTo[0] - bowlAt[0]), n(bowlTo[1] - bowlAt[1])]
          ]
        })
      },
      {
        name: "glints over the water",
        svg: glints(
          [
            [n(bowlAt[0] - 1.6), n(bowlAt[1] - 4.6)],
            [n(bowlAt[0] + 1.8), n(bowlAt[1] - 5)]
          ],
          0.8,
          "#E6F5FF"
        ),
        keys: track({
          opacity: [
            [0.62, 0],
            [0.63, 1]
          ],
          xy: [
            [0.75, 0, 0],
            [0.8, n(bowlTo[0] - bowlAt[0]), n(bowlTo[1] - bowlAt[1])]
          ]
        }),
        loop: twinkle()
      },
      { name: "healing: a soft white glow about the place", svg: glow(sick[0], n(sick[1] - 0.8), 6, "#FFFFFF", 0.22), keys: showAt(0.86, 0.88), loop: soft },
      { name: "a soft white ring about it", svg: care(sick[0], n(sick[1] + 0.6), 4, 1.8, "#FFFFFF"), keys: showAt(0.88, 0.9), loop: soft },
      { name: "a soft golden glow over the truffles", svg: wash(94, 103, 36, 6, WARM, 0.12), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: [
      { text: "Sa'id ibn Zayd: I heard him say:", from: 0.02, to: 0.245 },
      { text: "truffles are like manna,", from: 0.26, to: 0.485 },
      { text: "and their water", from: 0.5, to: 0.725 },
      { text: "heals eye diseases.", from: 0.74, to: 1 }
    ]
  };
}

export const PLENTY_ART = {
  "flock-between-mountains": flockBetweenMountains,
  "on-foot-to-visit": onFootToVisit,
  "dates-in-the-home": datesInTheHome,
  "porters-in-the-market": portersInTheMarket,
  "umrah-in-ramadan": umrahInRamadan,
  "three-breaths": threeBreaths,
  "truffles-like-manna": trufflesLikeManna
};
