import { cloud, n, peaks, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle } from "./giveArt";
import { arcs, bucket } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { dayLit, road, showAt, showFor, SOFT_GOLD, weekDay } from "./roadArt";
import { EIGHT, FOLK, glints, ITS_VOICE, linesOn, places, plainLand, rel, SIX, sparkStays, twinkle } from "./shareArt";
import { acacia } from "./easeArt";
import { GREY } from "./lovedArt";
import { stall } from "./tradeArt";
import { cracks, dustShining, emptySkin } from "./blessingArt";
import { farHills, FIVE, insideTheMasjid } from "./wideArt";

/**
 * Quiet and ease in worship: the one who sat apart with no water, told that clean earth is enough; the prayer in which
 * they once spoke, until they were told to be silent; Mahmud, who at five remembered the water he ﷺ sprayed on his face
 * from a bucket; the prayer of two rak'at, kept so on a journey and completed at home; Abdullah, who taught on
 * Thursdays only, so as not to bore them; the parts of land dearest to Allah and the parts most hateful to Him; and the
 * two who sneezed, one who praised Allah and one who did not. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a
 * face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice
 * is arcs in the air. No one is drawn on a camel. Nothing is drawn for Allah, and nothing comes down from the sky: a
 * prayer or praise is a spark that rises, what is good is a light, glints and a soft golden ring. No name or word is
 * written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** A place where someone sits: a small dashed circle, lower and flatter, its middle at (x, y). */
const sitting = (x: number, y: number, r = 1.6, color = ITS_VOICE) =>
  `<ellipse cx="${n(x)}" cy="${n(y + r * 0.38)}" rx="${r}" ry="${n(r * 0.62)}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1 0.8" fill="none"/>`;

/** A sneeze: a small puff of air beside a place at (x, y), to its right, or to its left when `left`. */
export const puff = (x: number, y: number, left = false) => {
  const s = left ? -1 : 1;
  return (
    [
      [2.6, -1.4],
      [3, 0],
      [2.6, 1.4]
    ]
      .map(([dx, dy]) => `<path d="M${n(x + s * 2.2)} ${n(y - 2.4)} l${n(s * dx)} ${dy}" stroke="#FFFFFF" stroke-width="0.7" stroke-linecap="round"/>`)
      .join("") +
    `<circle cx="${n(x + s * 6)}" cy="${n(y - 3.6)}" r="0.4" fill="#FFFFFF"/><circle cx="${n(x + s * 6.4)}" cy="${n(y - 1.4)}" r="0.4" fill="#FFFFFF"/>`
  );
};

/** A puff that shows at `from`, grows and is gone by `gone`. */
export const puffKeys = (from: number, gone: number) =>
  track({
    opacity: [
      [from, 0],
      [n3(from + 0.005), 1],
      [n3(gone - 0.01), 1],
      [gone, 0]
    ],
    scale: [
      [from, 0.5],
      [n3((from + gone) / 2), 1.15],
      [gone, 1.3]
    ]
  });

/** A time, to a thousandth. */
const n3 = (t: number) => Math.round(t * 1000) / 1000;

// Clean earth is enough. Imran ibn Husayn al-Khuza'i said: the Messenger of Allah ﷺ saw a person sitting aloof and not
// praying with the people. He asked him: O so and so, what prevented you from offering the prayer with the people? He
// replied: O Messenger of Allah, I am junub and there is no water. He said: perform tayammum with clean earth, and that
// will be sufficient for you (Sahih al-Bukhari 348). No one is drawn: the open land with acacias and hills far off. His
// place is in front and two rows of places behind him, Imran's place in the front row; far to the right sits the place
// of one apart, lower and flatter, and a soft grey dashed ring comes about it: aloof. A spark of the prayer rises from
// his place, with glints over the rows: they pray, and it does not. His voice asks it, and a soft dashed ring comes about
// the rows: with the people. Its voice answers; empty water skins show by it, and the ground about it is dry: no water.
// His voice speaks again; a soft golden light comes on the clean earth by it, and dust shines about its place:
// tayammum. A soft golden ring comes about it, the grey ring goes, and glints show: that is enough.
function cleanEarthIsEnough(): SignArt {
  const his: [number, number] = [40, 99.6];
  const imran: [number, number] = [49, 105.6];
  const front: [number, number][] = [22, 31, 40, 58, 67].map((x): [number, number] => [x, 105.6]);
  const back: [number, number][] = [26, 35, 44, 53, 62].map((x): [number, number] => [x, 111.6]);
  const apart: [number, number] = [128, 106.6];
  return {
    kind: "clean-earth-is-enough",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E8EEEA", 62) },
      { name: "the sun", svg: sun(134, 18) },
      { name: "a cloud", svg: cloud(70, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: peaks([[20, 9, 26], [84, 12, 34], [142, 8, 24]], 66, "#CDB892", false) },
      { name: "the open land", svg: plainLand("#E2CB9C", [[12, 116], [86, 118], [150, 115]]) },
      { name: "acacias", svg: acacia(10, 99, 11) + acacia(96, 97, 10) + acacia(154, 100, 10) },
      { name: "his place, in front", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of the rows behind him", svg: places([...front, ...back], 1.5) },
      { name: "Imran's place, in the front row", svg: someone(imran[0], imran[1], 1.5, ITS_VOICE) },
      { name: "Imran's voice: telling of it", svg: arcs(n(imran[0] + 3.2), n(imran[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      { name: "the place of one sitting apart", svg: sitting(apart[0], apart[1]) },
      {
        name: "aloof: a soft grey dashed ring about the place apart",
        svg: care(apart[0], n(apart[1] + 0.6), 5, 3, GREY),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.08, 1],
            [0.876, 1],
            [0.9, 0]
          ]
        })
      },
      { name: "the prayer: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.3, "#FFE7A0"), keys: sparkStays(0.15, 0.19), loop: twinkle(900) },
      {
        name: "praying in rows: glints over the rows",
        svg: glints([
          [26, 101.4],
          [44, 101],
          [62, 101.4],
          [32, 107.4],
          [56, 107.6]
        ]),
        keys: showAt(0.17, 0.2),
        loop: twinkle()
      },
      { name: "his voice: what prevented you?", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.27, 0.278, 0.44, 0.448), loop: speaking },
      {
        name: "with the rest: a soft dashed ring about the rows",
        svg: care(44, 108.8, 27, 6.4, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.392, 0],
            [0.42, 1],
            [0.512, 1],
            [0.53, 0]
          ]
        })
      },
      { name: "the voice of the place apart: I am junub", svg: arcsLeft(n(apart[0] - 3.2), n(apart[1] - 2.4), ITS_VOICE), keys: showFor(0.512, 0.52, 0.69, 0.698), loop: speaking },
      { name: "no water: empty water skins by it", svg: emptySkin(n(apart[0] + 9), n(apart[1] + 2.4)) + emptySkin(n(apart[0] + 15), n(apart[1] + 4)), keys: showAt(0.636, 0.656) },
      { name: "no water: the ground about it, dry", svg: cracks(n(apart[0] - 7), n(apart[1] + 5.4)) + cracks(n(apart[0] + 5), n(apart[1] + 8.4)), keys: showAt(0.646, 0.666) },
      { name: "his voice: perform tayammum with clean earth", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showAt(0.756, 0.764), loop: speaking },
      { name: "clean earth: a soft golden light on the ground by it", svg: wash(n(apart[0] - 4), n(apart[1] + 4.4), 8, 2.6, WARM, 0.3), keys: showAt(0.77, 0.8), loop: soft },
      { name: "tayammum: dust shining about its place", svg: dustShining(apart[0], apart[1]), keys: showAt(0.8, 0.82), loop: soft },
      { name: "enough: a soft golden ring about the place apart", svg: care(apart[0], n(apart[1] + 0.6), 4, 2.4, SOFT_GOLD), keys: showAt(0.88, 0.91), loop: soft },
      {
        name: "enough: glints about it",
        svg: glints([
          [n(apart[0] - 5), n(apart[1] - 5)],
          [n(apart[0] + 5), n(apart[1] - 6)],
          [apart[0], n(apart[1] - 8.6)]
        ]),
        keys: showAt(0.91, 0.93),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Imran: he saw a man sitting aloof,",
      "Not praying with the people.",
      "He asked: O so and so, what prevented you",
      "From offering the prayer with the people?",
      "The man replied: I am junub",
      "And there is no water. He said:",
      "Perform tayammum with clean earth,",
      "And that will be sufficient for you."
    ])
  };
}

// Silence in the prayer. Zayd ibn Arqam said: in the lifetime of the Prophet ﷺ we used to speak while praying, and one
// of us would tell his needs to his companions, till the ayah was revealed: guard strictly your prayers. After that we
// were ordered to remain silent while praying (Sahih al-Bukhari 1200). No one is drawn: inside the masjid, under its roof
// of palm fronds on palm trunks. His place is in front and two rows of places behind him, Zayd's place in the front row.
// Zayd's voice tells of it, and small voices show among the rows, place to place: speaking. A spark of the prayer rises
// from his place: while praying. One place's voice speaks to the next: telling its needs. A soft light comes about his
// place, and his voice recites: guard strictly your prayers, with glints over the rows. Then all the small voices go, a
// calm soft light comes over the rows, and a spark of the prayer rises from them: silent.
function silenceInThePrayer(): SignArt {
  const foot = 96;
  const his: [number, number] = [128, 101];
  const zayd: [number, number] = [58, 106];
  const front: [number, number][] = [18, 28, 38, 48, 68, 78, 88, 98].map((x): [number, number] => [x, 106]);
  const back: [number, number][] = [23, 33, 43, 53, 63, 73, 83, 93, 103].map((x): [number, number] => [x, 112.6]);
  const asker: [number, number] = [43, 112.6];
  const talk = track({
    opacity: [
      [0.06, 0],
      [0.08, 1],
      [0.82, 1],
      [0.84, 0]
    ]
  });
  return {
    kind: "silence-in-the-prayer",
    ms: 10000,
    parts: [
      ...insideTheMasjid(foot),
      { name: "his place, in front", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of the front row", svg: places(front, 1.5) },
      { name: "the places of the back row", svg: places(back, 1.5) },
      { name: "Zayd's place, in the front row", svg: someone(zayd[0], zayd[1], 1.5, ITS_VOICE) },
      { name: "Zayd's voice: telling of it", svg: arcs(n(zayd[0] + 3.2), n(zayd[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.11, 0.118), loop: speaking },
      {
        name: "speaking in the prayer: small voices among the rows",
        svg: arcs(31.2, 103.2, FOLK) + arcsLeft(69.8, 109.8, FOLK) + arcs(91.2, 103.2, FOLK) + arcsLeft(19.8, 109.8, FOLK),
        keys: talk,
        loop: speaking
      },
      { name: "while praying: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.3, "#FFE7A0"), keys: sparkStays(0.18, 0.215), loop: twinkle(900) },
      {
        name: "telling his needs: a voice from one place to the next",
        svg: arcs(n(asker[0] + 3.2), n(asker[1] - 2.8), ITS_VOICE),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.348, 1],
            [0.82, 1],
            [0.84, 0]
          ]
        }),
        loop: speaking
      },
      { name: "the ayah: a soft light about his place", svg: wash(his[0], his[1], 8, 4.4, WARM, 0.22), keys: showAt(0.5, 0.53), loop: soft },
      { name: "his voice: guard strictly your prayers", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.66, 0.668), loop: speaking },
      {
        name: "your prayers: glints over the rows",
        svg: glints([
          [24, 101.6],
          [52, 101.2],
          [84, 101.6],
          [38, 108.4],
          [68, 108.8],
          [98, 108.6]
        ]),
        keys: showAt(0.69, 0.72),
        loop: twinkle()
      },
      { name: "silent: a calm soft light over the rows", svg: wash(62, 109, 52, 8, WARM, 0.1), keys: showAt(0.86, 0.9), loop: soft },
      { name: "silent: a spark of the prayer rising from the rows", svg: sparkle(60, 100, 1.2, "#FFE7A0"), keys: sparkStays(0.88, 0.92, 12), loop: twinkle(900) }
    ],
    words: linesOn(SIX, [
      "Zayd ibn Arqam: we used to speak",
      "While praying, in his lifetime;",
      "One of us told his companions his needs,",
      "Till there was revealed:",
      "Guard strictly your prayers.",
      "Then we were ordered to remain silent."
    ])
  };
}

// A boy of five. Mahmud ibn ar-Rabi' said: when I was a boy of five, I remember, the Prophet ﷺ took water from a bucket
// with his mouth and threw it on my face (Sahih al-Bukhari 77; the lines keep the order of its Arabic, and the well the
// translator names is not drawn). No one is drawn: a home of the Ansar among palms in Madinah. His place is by it, and
// Mahmud's small place near it; Mahmud's voice tells of it. A bucket full of water shows by his place, and a glint of
// its water goes to his place; drops go from his place to Mahmud's place, with glints about it. Five small lights come
// over Mahmud's place, one by one: five years old. Glints show at the bucket, and a warm light comes about Mahmud's
// place: remembered.
function aBoyOfFive(): SignArt {
  const his: [number, number] = [70, 104];
  const mahmud: [number, number] = [88, 105.6];
  const pail: [number, number] = [58, 106.4];
  const years: [number, number][] = [
    [80, 98],
    [84, 96.4],
    [88, 95.8],
    [92, 96.4],
    [96, 98]
  ];
  return {
    kind: "a-boy-of-five",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(30, 18) },
      { name: "a cloud", svg: cloud(108, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[14, 116], [70, 118], [146, 116]]) },
      ...palms(
        [
          [14, 100, 16],
          [132, 99, 13],
          [152, 100, 15]
        ],
        "Madinah"
      ),
      { name: "a home of the Ansar", svg: home(108, 99, 26, 18) },
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Mahmud's place, small", svg: someone(mahmud[0], mahmud[1], 1, ITS_VOICE) },
      { name: "Mahmud's voice: I remember", svg: arcs(n(mahmud[0] + 2.4), n(mahmud[1] - 2.2), ITS_VOICE), keys: showFor(0.024, 0.032, 0.148, 0.156), loop: speaking },
      { name: "a bucket full of water", svg: bucket(pail[0], pail[1]), keys: showAt(0.222, 0.25) },
      {
        name: "water: a glint from the bucket to his place",
        svg: sparkle(pail[0], n(pail[1] - 4.6), 0.8, "#BFE6FF"),
        keys: track({
          opacity: [
            [0.25, 0],
            [0.256, 1],
            [0.3, 1],
            [0.306, 0]
          ],
          xy: [
            [0.256, 0, 0],
            [0.3, ...rel([pail[0], n(pail[1] - 4.6)], [his[0], n(his[1] - 2.6)])]
          ]
        })
      },
      {
        name: "on Mahmud's place: drops of water from his place",
        svg: [
          [0, 0],
          [1.2, -0.8],
          [1, 0.9]
        ]
          .map(([dx, dy]) => `<circle cx="${n(his[0] + 2.6 + dx)}" cy="${n(his[1] - 2 + dy)}" r="0.45" fill="#7CC4F0"/>`)
          .join(""),
        keys: track({
          opacity: [
            [0.416, 0],
            [0.42, 1],
            [0.466, 1],
            [0.474, 0]
          ],
          xy: [
            [0.42, 0, 0],
            [0.444, 7.6, -4],
            [0.468, 14.6, 1.2]
          ]
        })
      },
      {
        name: "on Mahmud's place: glints of the water",
        svg: glints(
          [
            [n(mahmud[0] - 2.4), n(mahmud[1] - 3.4)],
            [n(mahmud[0] + 2.2), n(mahmud[1] - 3.8)]
          ],
          0.7,
          "#D8F0FF"
        ),
        keys: showAt(0.47, 0.5),
        loop: twinkle()
      },
      ...years.map(([x, y], i): SignArt["parts"][number] => ({
        name: `five years: a small light ${i + 1}`,
        svg: sparkle(x, y, 1.1, "#FFD45A"),
        keys: showAt(n3(0.614 + i * 0.016), n3(0.626 + i * 0.016)),
        loop: twinkle(1100 + i * 100)
      })),
      {
        name: "from a bucket: glints at the bucket",
        svg: glints([
          [n(pail[0] - 3.4), n(pail[1] - 6)],
          [n(pail[0] + 3.2), n(pail[1] - 6.6)]
        ]),
        keys: showAt(0.81, 0.84),
        loop: twinkle()
      },
      { name: "remembered: a warm light about Mahmud's place", svg: wash(mahmud[0], mahmud[1], 6, 3.6, WARM, 0.25), keys: showAt(0.86, 0.9), loop: soft }
    ],
    words: linesOn(FIVE, ["Mahmud ibn ar-Rabi': I remember", "He took water with his mouth", "And threw it on my face,", "When I was a boy of five,", "From a bucket."])
  };
}

// Two rak'at on a journey. Aishah said: when the prayers were first enjoined, they were of two rak'at each. Later the
// prayer in a journey was kept as it was, but the prayers for non-travelers were completed (Sahih al-Bukhari 1090; what
// az-Zuhri asked Urwah after it is left out). No one is drawn, and no one on the camel: a home in a town among palms on
// the left, and a road going out of the town to the right. Aishah's voice tells of it, and a traveler's place goes out
// along the road beside a camel bearing sacks. Two sparks of the prayer rise at home, and two on the journey. A soft
// golden ring comes about the two of the journey, with glints: kept as it was. Two more sparks rise at home, and a soft
// golden ring comes about the four: completed.
function twoRakahsOnAJourney(): SignArt {
  const aishah: [number, number] = [16, 104.6];
  const atHome: [number, number] = [46, 104.6];
  const traveler: [number, number] = [70, 106];
  const away: [number, number] = [134, 104];
  const goes = rel(traveler, away);
  const k = 0.17;
  const camelAt: [number, number] = [82, 108.4];
  // The camel faces right, so its hump is to the left of its feet's middle.
  const hump: [number, number] = [n(camelAt[0] - 10 * k), n(camelAt[1] - 52 * k)];
  const sacks = sack(n(hump[0] - 2.2), n(hump[1] + 2), 0.5, "#B8955A") + sack(n(hump[0] + 2.4), n(hump[1] + 2), 0.5, "#B8955A") + sack(hump[0], n(hump[1] + 0.6), 0.55, "#C9A66B");
  const homeSparks = [41, 45.5, 50, 54.5];
  const awaySparks = [131.6, 136.4];
  const along = track({
    xy: [
      [0.03, 0, 0],
      [0.2, ...goes]
    ]
  });
  return {
    kind: "two-rakahs-on-a-journey",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(96, 18) },
      { name: "a cloud", svg: cloud(52, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [90, 118], [150, 116]]) },
      ...palms(
        [
          [6, 100, 15],
          [62, 100, 14]
        ],
        "Madinah"
      ),
      { name: "a home in the town", svg: home(30, 99, 24, 16) },
      { name: "the road out of the town", svg: road(40, 160, 106) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.6, ITS_VOICE) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 3.2), n(aishah[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.2, 0.208), loop: speaking },
      { name: "the place of one at home", svg: someone(atHome[0], atHome[1], 1.6, FOLK) },
      { name: "a camel bearing sacks: out along the road", svg: camel(camelAt[0], camelAt[1], k, false) + sacks, keys: along },
      { name: "the place of one travelling: out along the road", svg: someone(traveler[0], traveler[1], 1.6, ITS_VOICE), keys: along },
      ...homeSparks.slice(0, 2).map((x, i): SignArt["parts"][number] => ({
        name: `at home: a spark of the prayer rising, rak'ah ${i + 1}`,
        svg: sparkle(x, 98, 1.1, "#FFE7A0"),
        keys: sparkStays(n3(0.27 + i * 0.02), n3(0.31 + i * 0.02), 8),
        loop: twinkle(900)
      })),
      ...awaySparks.map((x, i): SignArt["parts"][number] => ({
        name: `on the journey: a spark of the prayer rising, rak'ah ${i + 1}`,
        svg: sparkle(x, 98, 1.1, "#FFE7A0"),
        keys: sparkStays(n3(0.3 + i * 0.02), n3(0.34 + i * 0.02), 8),
        loop: twinkle(900)
      })),
      { name: "kept as it was: a soft golden ring about the two on the journey", svg: care(134, 90, 5.4, 2.6, SOFT_GOLD), keys: showAt(0.52, 0.55), loop: soft },
      {
        name: "kept as it was: glints about them",
        svg: glints([
          [127, 87],
          [141, 87.4]
        ]),
        keys: showAt(0.56, 0.58),
        loop: twinkle()
      },
      ...homeSparks.slice(2).map((x, i): SignArt["parts"][number] => ({
        name: `at home: a spark of the prayer rising, rak'ah ${i + 3}`,
        svg: sparkle(x, 98, 1.1, "#FFE7A0"),
        keys: sparkStays(n3(0.77 + i * 0.02), n3(0.81 + i * 0.02), 8),
        loop: twinkle(900)
      })),
      { name: "completed: a soft golden ring about the four at home", svg: care(47.8, 90, 9.6, 2.8, SOFT_GOLD), keys: showAt(0.86, 0.9), loop: soft }
    ],
    words: linesOn(FOUR, ["Aishah: when prayers were first enjoined,", "They were of two rak'at each.", "The journey prayer was kept as it was,", "But for non-travelers they were completed."])
  };
}

// Lest you be bored. Abu Wa'il said: Abdullah used to give a religious talk to the people every Thursday. Once a man
// said: O Aba Abdur-Rahman, I wish you could preach to us daily. Abdullah replied: the only thing which prevents me from
// doing so is that I hate to bore you, and I take care of you in preaching by selecting a suitable time, just as the
// Prophet ﷺ used to do with us, for fear of making us bored (Sahih al-Bukhari 70). No one is drawn: a masjid among palms,
// and the seven days of the week as small circles in the sky. Abdullah's place is by the masjid with the places of the
// people gathered about it, Abu Wa'il's place among them. Abu Wa'il's voice tells of it, and Abdullah's voice speaks to
// them; Thursday, the fifth day, lights, and a soft golden ring comes about it: every Thursday. A voice among them asks,
// and a faint light comes on every day of the week: daily. Abdullah's voice answers, and the faint light goes; a soft
// golden ring comes about the gathered places: he cares for them. Glints show about Thursday: a suitable time; a warm
// light and glints come over the gathered places: not bored.
function lestYouBeBored(): SignArt {
  const abdullah: [number, number] = [96, 103];
  const abuWail: [number, number] = [86, 109.4];
  const asker: [number, number] = [106, 109.4];
  const gathered: [number, number][] = [
    [74, 104],
    [78, 107.4],
    [96, 110.4],
    [114, 107.4],
    [118, 104]
  ];
  const days = [34, 49, 64, 79, 94, 109, 124];
  const thursday = days[4];
  const dayY = 20;
  return {
    kind: "lest-you-be-bored",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "a cloud", svg: cloud(140, 36, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the days of the week", svg: days.map((x) => weekDay(x, dayY)).join("") },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[60, 116], [104, 118], [150, 116]]) },
      ...palms(
        [
          [54, 100, 15],
          [140, 100, 16]
        ],
        "Madinah"
      ),
      { name: "a masjid", svg: madinahMasjid(4, 100, 0.8) },
      { name: "Abdullah's place", svg: someone(abdullah[0], abdullah[1], 1.8, ITS_VOICE) },
      { name: "the places gathered about it", svg: places(gathered, 1.5) },
      { name: "Abu Wa'il's place, among them", svg: someone(abuWail[0], abuWail[1], 1.5, ITS_VOICE) },
      { name: "a place among them", svg: someone(asker[0], asker[1], 1.5, FOLK) },
      { name: "Abu Wa'il's voice: telling of it", svg: arcsLeft(n(abuWail[0] - 3.2), n(abuWail[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      { name: "Abdullah's voice: giving a talk", svg: arcs(n(abdullah[0] + 3.4), n(abdullah[1] - 3), ITS_VOICE), keys: showFor(0.05, 0.058, 0.2, 0.208), loop: speaking },
      { name: "every Thursday: Thursday lights", svg: dayLit(thursday, dayY, "#FFE7A0"), keys: showAt(0.15, 0.17) },
      { name: "every Thursday: a soft golden ring about it", svg: care(thursday, dayY, 4.6, 4.6, SOFT_GOLD), keys: showAt(0.18, 0.2), loop: soft },
      { name: "a voice among them: asking", svg: arcsLeft(n(asker[0] - 3.2), n(asker[1] - 2.8), FOLK), keys: showFor(0.27, 0.278, 0.44, 0.448), loop: speaking },
      {
        name: "daily: a faint light on every day of the week",
        svg: days.map((x) => dayLit(x, dayY, "#FFF6D6")).join(""),
        keys: track({
          opacity: [
            [0.392, 0],
            [0.42, 0.8],
            [0.512, 0.8],
            [0.53, 0]
          ]
        })
      },
      { name: "Abdullah's voice: what prevents me", svg: arcs(n(abdullah[0] + 3.4), n(abdullah[1] - 3), ITS_VOICE), keys: showAt(0.512, 0.52), loop: speaking },
      { name: "lest they be bored: a soft golden ring about the gathered places", svg: care(96, 107.4, 26, 6, SOFT_GOLD), keys: showAt(0.636, 0.66), loop: soft },
      {
        name: "a suitable time: glints about Thursday",
        svg: glints([
          [n(thursday - 6), n(dayY - 4)],
          [n(thursday + 6), n(dayY - 3)],
          [thursday, n(dayY + 6.4)]
        ]),
        keys: showAt(0.76, 0.79),
        loop: twinkle()
      },
      { name: "not bored: a warm light over the gathered places", svg: wash(96, 107, 28, 7, WARM, 0.12), keys: showAt(0.88, 0.91), loop: soft },
      {
        name: "not bored: glints over the gathered places",
        svg: glints([
          [74, 99.4],
          [86, 104],
          [106, 104],
          [118, 99.4]
        ]),
        keys: showAt(0.91, 0.94),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Abu Wa'il: Abdullah used to give a talk",
      "To the people every Thursday.",
      "A man said: O Aba Abdur-Rahman,",
      "I wish you could preach to us daily.",
      "Abdullah: what prevents me from doing so",
      "Is that I hate to bore you;",
      "I pick a suitable time, as he did with us,",
      "For fear of making us bored."
    ])
  };
}

// The dearest places. Abu Hurairah reported that the Messenger of Allah ﷺ said: the parts of land dearest to Allah are
// its masjids, and the parts most hateful to Allah are markets (Sahih Muslim 671). No one is drawn: a town, its masjid
// on the left, homes and palms in the middle, and its market on the right, stalls and sacks with places about them. His
// place is by the masjid with Abu Hurairah's place, and his voice speaks. A faint light passes over the whole land; then
// a soft golden light comes about the masjid, with glints and a soft golden ring: dearest. The faint light passes over
// the land again; then a grey shade comes over the market, with loud voices among its stalls: most hateful.
function theDearestPlaces(): SignArt {
  const his: [number, number] = [50, 104.6];
  const hurairah: [number, number] = [60, 105.6];
  const crowd: [number, number][] = [
    [118, 104.6],
    [130, 105.8],
    [142, 104.6],
    [152, 106]
  ];
  return {
    kind: "the-dearest-places",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "a cloud", svg: cloud(40, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [80, 118], [140, 117]]) },
      ...palms(
        [
          [62, 99, 14],
          [100, 100, 15]
        ],
        "Madinah"
      ),
      { name: "the masjid", svg: madinahMasjid(4, 100, 0.8) },
      { name: "homes of the town", svg: home(76, 99, 16, 12) + home(92, 100, 14, 11) },
      { name: "the market: its stalls", svg: stall(124, 16, "#B5483A", 84, 95) + stall(146, 16, "#4A6FA5", 84, 95) },
      { name: "sacks by the stalls", svg: sack(116, 101.6, 0.7) + sack(136, 101.6, 0.7, "#B8955A") + sack(156, 101.6, 0.7) },
      { name: "places about the market", svg: places(crowd, 1.5) },
      { name: "his place, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.5, ITS_VOICE) },
      { name: "his voice: the parts of land", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.024, 0.032, 0.148, 0.156), loop: speaking },
      { name: "the parts of land: a faint light over it all", svg: wash(80, 100, 82, 14, WARM, 0.06), keys: showFor(0.22, 0.25, 0.33, 0.356) },
      { name: "dearest: a soft golden light about the masjid", svg: wash(23, 93, 24, 11, WARM, 0.25), keys: showAt(0.42, 0.45), loop: soft },
      {
        name: "dearest: glints over the masjid",
        svg: glints([
          [10, 80],
          [23, 78],
          [36, 80]
        ]),
        keys: showAt(0.46, 0.49),
        loop: twinkle()
      },
      { name: "dearest: a soft golden ring about the masjid", svg: care(23, 93, 23, 10, SOFT_GOLD), keys: showAt(0.5, 0.53), loop: soft },
      { name: "the parts of land again: a faint light over it all", svg: wash(80, 100, 82, 14, WARM, 0.06), keys: showFor(0.612, 0.64, 0.72, 0.748) },
      { name: "most hateful: a grey shade over the market", svg: wash(136, 96, 26, 12, GREY, 0.2), keys: showAt(0.81, 0.84), loop: soft },
      {
        name: "the market: loud voices among its stalls",
        svg: crowd.map(([x, y], i) => (i % 2 ? arcsLeft(n(x - 3.2), n(y - 2.8), FOLK) : arcs(n(x + 3.2), n(y - 2.8), FOLK))).join(""),
        keys: showAt(0.84, 0.86),
        loop: speaking
      }
    ],
    words: linesOn(FIVE, ["Abu Hurairah reported that he said:", "The parts of land dearest to Allah", "Are its masjids,", "And the parts most hateful to Allah", "Are markets."])
  };
}

// Two men sneezed. Anas ibn Malik said: two men sneezed before the Prophet ﷺ. He said to one of them: may Allah bestow
// His mercy on you, but he did not say that to the other. On being asked, he said: that one praised Allah, while the
// other did not praise Allah (Sahih al-Bukhari 6221). No one is drawn: by his home in Madinah, among palms. His place
// is in the middle, and a place on each side of it; Anas's place is near. Anas's voice tells of it; a small puff of air
// shows by the one place, then by the other: they sneezed. His voice speaks to the first, and a soft light comes about
// it: mercy. A soft grey dashed ring comes about the other: not said to it. A voice asks him, and his voice answers; a
// spark of praise rises from the first place, and a soft golden ring comes about it: it praised Allah. Glints show
// about the first place, and none about the other.
function twoMenSneezed(): SignArt {
  const his: [number, number] = [80, 101.4];
  const first: [number, number] = [63, 104.6];
  const other: [number, number] = [97, 104.6];
  const anas: [number, number] = [118, 106];
  const asker: [number, number] = [46, 106];
  return {
    kind: "two-men-sneezed",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(136, 18) },
      { name: "clouds", svg: cloud(46, 28, 0.6, "#FFFFFF", 0.9) + cloud(104, 22, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[14, 116], [70, 118], [146, 116]]) },
      ...palms(
        [
          [20, 99, 16],
          [146, 100, 14]
        ],
        "Madinah"
      ),
      { name: "his home", svg: home(80, 95, 22, 14) },
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of the first who sneezed", svg: someone(first[0], first[1], 1.6, FOLK) },
      { name: "the place of the other who sneezed", svg: someone(other[0], other[1], 1.6, FOLK) },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.6, ITS_VOICE) },
      { name: "a place nearby", svg: someone(asker[0], asker[1], 1.6, FOLK) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 3.2), n(anas[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.11, 0.118), loop: speaking },
      { name: "a sneeze: a small puff of air by the first", svg: puff(first[0], first[1], true), origin: { x: n(first[0] - 2.2), y: n(first[1] - 2.4) }, keys: puffKeys(0.04, 0.075) },
      { name: "a sneeze: a small puff of air by the other", svg: puff(other[0], other[1]), origin: { x: n(other[0] + 2.2), y: n(other[1] - 2.4) }, keys: puffKeys(0.078, 0.113) },
      { name: "his voice: to the first, wishing it mercy", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.18, 0.188, 0.27, 0.278), loop: speaking },
      { name: "mercy: a soft light about the first place", svg: wash(first[0], first[1], 4.4, 2.8, WARM, 0.3), keys: showAt(0.2, 0.23), loop: soft },
      { name: "not said to the other: a soft grey dashed ring about it", svg: care(other[0], n(other[1] + 0.4), 3.8, 2.4, GREY), keys: showAt(0.34, 0.37) },
      { name: "a voice nearby: asking him why", svg: arcs(n(asker[0] + 3.2), n(asker[1] - 2.8), FOLK), keys: showFor(0.5, 0.508, 0.55, 0.558), loop: speaking },
      { name: "his voice: answering", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.6), GOLD), keys: showAt(0.566, 0.574), loop: speaking },
      { name: "its praise: a spark rising from the first place", svg: sparkle(first[0], n(first[1] - 5), 1.3, "#FFE7A0"), keys: sparkStays(0.66, 0.69), loop: twinkle(900) },
      { name: "its praise: a soft golden ring about the first place", svg: care(first[0], n(first[1] + 0.4), 3.8, 2.4, SOFT_GOLD), keys: showAt(0.7, 0.73), loop: soft },
      {
        name: "glints about the first place",
        svg: glints([
          [n(first[0] - 5), n(first[1] - 3)],
          [n(first[0] + 5), n(first[1] - 4)]
        ]),
        keys: showAt(0.82, 0.85),
        loop: twinkle()
      }
    ],
    words: linesOn(SIX, [
      "Anas: two men sneezed by him.",
      "He told one: may Allah have mercy on you,",
      "But he did not say it to the other.",
      "He was asked about it, and said:",
      "That one praised Allah,",
      "While the other did not praise Allah."
    ])
  };
}

export const QUIET_ART = {
  "clean-earth-is-enough": cleanEarthIsEnough,
  "silence-in-the-prayer": silenceInThePrayer,
  "a-boy-of-five": aBoyOfFive,
  "two-rakahs-on-a-journey": twoRakahsOnAJourney,
  "lest-you-be-bored": lestYouBeBored,
  "the-dearest-places": theDearestPlaces,
  "two-men-sneezed": twoMenSneezed
} as const;
