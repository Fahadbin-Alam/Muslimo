import { animalAt, cloud, glow, n, palm, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, SPARK, sun, VOICE, WARM } from "./worshipArt";
import { camel, care, jug, sparkRising, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { food } from "./hopeArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { quickSparks } from "./toldArt";

/**
 * Trust and its keeping: the du'a for Anas, whom Umm Sulaym brought to serve, for wealth, for many after him and for
 * blessing in what he was given; Abu Ubaydah, the trustworthy one of this ummah, chosen for the two who came from
 * Najran; the takbir on every rise of the land on the way home from Hajj or Umrah, and the praise of the return; Ibn
 * al-Lutbiyyah, sent for the zakat, and the gift that would never have come to him at home; a guest's day and night,
 * his three days, and what is beyond them; garlic and onion kept away from the masjid; and guidance on the road and the
 * straightness of an arrow. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand, a foot or a face, and no one is drawn on a camel: where
 * someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the
 * air. Nothing is drawn for Allah, and nothing comes down from the sky: a du'a, a takbir or a praise is a spark that
 * rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** Something drawn closer: `k` times its size about (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** The land from y 61 down, with a few tufts of dry grass. */
const trustLand = () =>
  landOf([
    [18, 110],
    [64, 113],
    [112, 111],
    [148, 112]
  ]);

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across, the hills and the land. */
const day = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: trustLand() }
];

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

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A small home far off, its foot's middle at (x, y). */
const farHome = (x: number, y: number) =>
  `<rect x="${n(x - 2.6)}" y="${n(y - 3.4)}" width="5.2" height="3.4" fill="#A88B66"/><rect x="${n(x - 3)}" y="${n(y - 3.9)}" width="6" height="0.6" fill="#8E7454"/><rect x="${n(x - 0.6)}" y="${n(y - 1.8)}" width="1.1" height="1.8" fill="#5E4630"/>`;

// A du'a for Anas. Anas said: Umm Sulaym said to the Prophet ﷺ: Anas is your servant. He said: O Allah, increase his
// wealth and his children, and bless him in what You give him (Sahih al-Bukhari 6334). No one is drawn: by the masjid of
// Madinah, his place, a golden ring. From Umm Sulaym's home come her place and Anas's small place, and a jug of water
// shows by Anas's place: he served. Umm Sulaym's voice speaks, then his, and a spark of du'a rises from his place. A
// faint golden line goes from Anas's place to the land beyond: palms grow up there and sheep come in, his wealth; then
// small places show there one by one, many after him. Glints show on them all, a soft golden glow comes over them, and
// a soft golden ring about Anas's place.
function aDuaForAnas(): SignArt {
  const his: [number, number] = [30, 99.6];
  const sulaymFrom: [number, number] = [128, 100.6];
  const sulaymTo: [number, number] = [56, 100.8];
  const anasFrom: [number, number] = [133.6, 101.8];
  const anasTo: [number, number] = [43, 101.4];
  const palmsAt: [number, number, number][] = [
    [86, 93.4, 13],
    [104, 92.4, 15],
    [121, 93.6, 12]
  ];
  const sheepAt: [number, number][] = [
    [90, 103.4],
    [103, 104.4],
    [116, 103.2]
  ];
  const after: [number, number][] = [
    [82, 97.4],
    [91, 96.8],
    [99.6, 97.6],
    [108.4, 96.8],
    [117, 97.4]
  ];
  const grows = (i: number): SignPart => {
    const [x, y, h] = palmsAt[i];
    const from = at3(0.35 + i * 0.02);
    return {
      name: `his wealth: a palm growing up ${i + 1}`,
      svg: palm(x, y, h),
      origin: { x, y },
      keys: track({
        opacity: [
          [from, 0],
          [at3(from + 0.005), 1]
        ],
        scale: [
          [from, 0.1],
          [at3(from + 0.03), 1]
        ]
      }),
      loop: { move: "sway", ms: 5200 + i * 600, angle: 1.4, phase: i / 3 }
    };
  };
  const comes = (i: number): SignPart => {
    const from = at3(0.39 + i * 0.01);
    return {
      name: `his wealth: a sheep coming in ${i + 1}`,
      svg: sheep(sheepAt[i][0], sheepAt[i][1], 0.09, true),
      keys: track({
        opacity: [
          [from, 0],
          [at3(from + 0.01), 1]
        ],
        xy: [
          [from, 14, 0],
          [at3(from + 0.05), 0, 0]
        ]
      })
    };
  };
  const shows = (i: number): SignPart => {
    const from = at3(0.53 + i * 0.03);
    return { name: `many after Anas: a small place ${i + 1}`, svg: someone(after[i][0], after[i][1], 1.1), keys: showAt(from, at3(from + 0.015)) };
  };
  return {
    kind: "a-dua-for-anas",
    ms: 9000,
    parts: [
      ...day(124, 60, 9000),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.46) },
      { name: "Umm Sulaym's home", svg: home(140, 96, 18, 12) },
      { name: "the way from Umm Sulaym's home", svg: way("M132 101.4 C108 102.6 76 102.8 40 102.4", "#F4E3BC", 0.8) },
      grows(0),
      grows(1),
      grows(2),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Umm Sulaym's place",
        svg: someone(sulaymFrom[0], sulaymFrom[1], 1.6),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.11, n(sulaymTo[0] - sulaymFrom[0]), n(sulaymTo[1] - sulaymFrom[1])]
          ]
        })
      },
      {
        name: "Anas's small place",
        svg: someone(anasFrom[0], anasFrom[1], 1.15),
        keys: track({
          xy: [
            [0.035, 0, 0],
            [0.12, n(anasTo[0] - anasFrom[0]), n(anasTo[1] - anasFrom[1])]
          ]
        })
      },
      { name: "serving: a jug of water by Anas's place", svg: jug(37.4, 104.2), keys: showAt(0.125, 0.14) },
      { name: "Umm Sulaym's voice: Anas is yours to serve", svg: arcsLeft(n(sulaymTo[0] - 2.2), n(sulaymTo[1] - 3.8), VOICE), keys: showFor(0.12, 0.13, 0.2, 0.21), loop: speaking },
      { name: "his voice: increase his wealth", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.272, 0.282), loop: speaking },
      { name: "a du'a: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 3.2), 1.4, SPARK), keys: sparkRising(0.29, 0.335, 10), loop: speaking },
      { name: "for Anas: a faint golden line to the land beyond", svg: lookLine(n(anasTo[0] + 1.6), n(anasTo[1] - 1.6), 78, 99.4, 92, SOFT_GOLD), keys: showAt(0.338, 0.35) },
      comes(0),
      comes(1),
      comes(2),
      shows(0),
      shows(1),
      shows(2),
      shows(3),
      shows(4),
      {
        name: "blessed: glints on the palms, the sheep and the small places",
        svg:
          sparkle(88, 80, 1, "#FFE7A0") +
          sparkle(106, 77.6, 1.1, "#FFE7A0") +
          sparkle(122.4, 82, 0.9, "#FFE7A0") +
          sparkle(96, 99.4, 0.8, "#FFE7A0") +
          sparkle(112.4, 99.6, 0.8, "#FFE7A0") +
          sparkle(104.4, 94.2, 0.8, "#FFE7A0"),
        keys: showAt(0.775, 0.79),
        loop: speaking
      },
      { name: "blessed: a soft golden glow over them", svg: glow(102, 96, 22, WARM, 0.09), keys: showAt(0.785, 0.82) },
      { name: "blessed: a soft golden ring about Anas's place", svg: care(anasTo[0], n(anasTo[1] + 0.5), 3.2, 1.6, SOFT_GOLD), keys: showAt(0.8, 0.825), loop: soft }
    ],
    words: [
      { text: "Umm Sulaym said: Anas is your servant", from: 0.02, to: 0.253 },
      { text: "He said: O Allah, increase his wealth", from: 0.268, to: 0.501 },
      { text: "and his children", from: 0.516, to: 0.749 },
      { text: "and bless him in what You give him", from: 0.764, to: 1 }
    ]
  };
}

// Truly trustworthy. Hudhayfah said: al-Aqib and as-Sayyid, the two of Najran, came to the Messenger of Allah ﷺ. They
// said: we will give you what you ask of us; send with us a trustworthy man, and send none with us but one who is
// trustworthy. He said: I will send with you a man who is trustworthy, truly trustworthy. The Companions of the
// Messenger of Allah ﷺ each hoped for it. He said: stand up, Abu Ubaydah ibn al-Jarrah. When he stood, the Messenger of
// Allah ﷺ said: this is the trustworthy one of this ummah (Sahih al-Bukhari 4380). No one is drawn: by the masjid of
// Madinah, his place, a golden ring, and the places of four with him. Along the road from Najran, far off, come the
// places of the two; their voice speaks. His voice speaks, and small glints show over the four places: each one hoping.
// His voice speaks again; the glints fade, and a soft ring comes about Abu Ubaydah's place, which stands up. His voice
// speaks, a soft golden glow comes about Abu Ubaydah's place, and a faint golden way shows along the road to Najran.
function trulyTrustworthy(): SignArt {
  const his: [number, number] = [30, 99.4];
  const withHim: [number, number][] = [
    [40, 101.8],
    [46.6, 100.9],
    [53.2, 101.8],
    [59.8, 100.9]
  ];
  const abuUbaydah = withHim[2];
  const aqibFrom: [number, number] = [148, 93.6];
  const sayyidFrom: [number, number] = [154.4, 93];
  const aqibTo: [number, number] = [78, 101.4];
  const sayyidTo: [number, number] = [84.4, 102];
  const stands = track({
    xy: [
      [0.735, 0, 0],
      [0.77, 0, -3]
    ]
  });
  const comeIn = (name: string, from: [number, number], to: [number, number], start: number, end: number): SignPart => ({
    name,
    svg: someone(from[0], from[1], 1.5),
    keys: track({
      opacity: [
        [start, 0],
        [at3(start + 0.01), 1]
      ],
      xy: [
        [start, 0, 0],
        [end, n(to[0] - from[0]), n(to[1] - from[1])]
      ]
    })
  });
  return {
    kind: "truly-trustworthy",
    ms: 11000,
    parts: [
      ...day(118, 54, 11000),
      { name: "the hills of Najran, far off", svg: `<path d="M112 66 Q124 57.6 136 62.6 Q148 57 160 60.6 L160 70 L112 70 Z" fill="#BFA67C"/>` },
      { name: "the homes of Najran, far off", svg: farHome(128, 74.6) + farHome(139, 73.6) + farHome(150, 75) },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.46) },
      { name: "the road from Najran", svg: way("M160 92.4 C132 95 104 99.6 66 102", "#F4E3BC", 0.9) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of three with him", svg: [0, 1, 3].map((i) => someone(withHim[i][0], withHim[i][1], 1.4)).join("") },
      { name: "Abu Ubaydah's place", svg: someone(abuUbaydah[0], abuUbaydah[1], 1.4), keys: stands },
      comeIn("al-Aqib's place", aqibFrom, aqibTo, 0.025, 0.1),
      comeIn("as-Sayyid's place", sayyidFrom, sayyidTo, 0.03, 0.105),
      { name: "the voice of the two of Najran: send one trustworthy", svg: arcsLeft(n(aqibTo[0] - 2.2), n(aqibTo[1] - 3.8), VOICE), keys: showFor(0.165, 0.175, 0.448, 0.458), loop: speaking },
      { name: "his voice: I will send one truly trustworthy", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.45, 0.46, 0.66, 0.67), loop: speaking },
      {
        name: "each one there hoping to be the one: small glints",
        svg: withHim.map(([x, y]) => sparkle(x, n(y - 4.4), 1.25, "#FFD86B")).join(""),
        keys: showFor(0.475, 0.49, 0.6, 0.615),
        loop: speaking
      },
      {
        name: "named: a soft ring about Abu Ubaydah's place",
        svg: care(abuUbaydah[0], n(abuUbaydah[1] + 0.5), 3, 1.5, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.61, 0],
            [0.63, 1]
          ],
          xy: [
            [0.735, 0, 0],
            [0.77, 0, -3]
          ]
        }),
        loop: soft
      },
      { name: "his voice: this is the trustworthy one", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.875, 0.885), loop: speaking },
      { name: "the trustworthy one: a soft golden glow about Abu Ubaydah's place", svg: glow(abuUbaydah[0], n(abuUbaydah[1] - 2.4), 5, WARM, 0.3), keys: showAt(0.89, 0.915) },
      { name: "sent with them: a faint golden way along the road to Najran", svg: way("M57 98.4 C88 99 118 95.6 148 91.6", SOFT_GOLD, 0.7), keys: showAt(0.91, 0.935) }
    ],
    words: [
      { text: "Al-Aqib and as-Sayyid of Najran came", from: 0.02, to: 0.147 },
      { text: "They said: send with us a trustworthy man", from: 0.162, to: 0.289 },
      { text: "and send none with us but one trustworthy", from: 0.304, to: 0.431 },
      { text: "He said: I will send one truly trustworthy", from: 0.446, to: 0.573 },
      { text: "He said: stand up, Abu Ubaydah", from: 0.588, to: 0.715 },
      { text: "When Abu Ubaydah stood, he said:", from: 0.73, to: 0.857 },
      { text: "this is the trustworthy one of this ummah", from: 0.872, to: 1 }
    ]
  };
}

// Takbir on every rise. Abdullah ibn Umar said: when the Messenger of Allah ﷺ came home from a campaign, from Hajj or
// from Umrah, he would say Allahu Akbar three times on every high ground, then say: there is no god but Allah, alone,
// with no partner; His is the dominion and His the praise, and He has power over all things; we return, repenting,
// worshipping, prostrating, praising our Lord; Allah kept His promise, helped His servant, and alone defeated the clans
// (Sahih al-Bukhari 1797). No one is drawn: a caravan, its camels with no one on them and a small place walking by each,
// and his place, a golden ring, before them, comes up onto a rise of the land. His voice speaks, and three sparks rise
// one after another; his voice speaks again. A faint golden way shows on to Madinah, and the caravan goes on over the
// next rise, his voice speaking; a spark of praise rises there. The caravan comes down to Madinah, a soft golden glow
// comes over it, and the tents of the clans, far off, fade.
function takbirOnTheRises(): SignArt {
  // The caravan is drawn on top of the first rise; it comes up onto it, goes over the second, and down to Madinah.
  const goes: [number, number, number][] = [
    [0.025, 46, 17],
    [0.088, 0, 0],
    [0.518, 0, 0],
    [0.55, -26, 13],
    [0.583, -52, 4],
    [0.766, -52, 4],
    [0.8, -62, 12],
    [0.832, -70, 16]
  ];
  const his: [number, number] = [104, 86.4];
  const shown = track({
    opacity: [
      [0.025, 0],
      [0.035, 1]
    ],
    xy: goes
  });
  return {
    kind: "takbir-on-the-rises",
    ms: 12000,
    parts: [
      ...day(126, 44, 12000),
      {
        name: "the tents of the clans, far off",
        svg: tent(34, 72.4, 6, 4.2, "#D9C6A0") + tent(43.6, 71.8, 5.4, 3.8, "#D9C6A0") + tent(52.4, 72.6, 6, 4.2, "#D9C6A0"),
        keys: track({
          opacity: [
            [0.89, 1],
            [0.93, 0]
          ]
        })
      },
      { name: "a rise of the land", svg: `<path d="M78 110 C90 94 98 85.2 114 85.2 C130 85.2 138 94 152 110 Z" fill="#D5B985"/><path d="M84 102 C93 92 100 85.2 114 85.2 C128 85.2 135 92 146 102" stroke="#C4A672" stroke-width="0.6" fill="none"/>` },
      { name: "the next rise of the land", svg: `<path d="M28 110 C40 96 48 89.6 62 89.6 C76 89.6 84 96 96 110 Z" fill="#D9BE8E"/><path d="M34 103 C42 95 49 89.6 62 89.6 C75 89.6 82 95 90 103" stroke="#C6A976" stroke-width="0.6" fill="none"/>` },
      { name: "a palm of Madinah", svg: palm(30, 95.6, 13), origin: { x: 30, y: 95.6 }, loop: { move: "sway", ms: 5600, angle: 1.4 } },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 99, 0.5) },
      { name: "returning: a faint golden way on to Madinah", svg: way("M100 87.6 C90 98 82 99 68 91 C58 89 46 97 36 102.6", SOFT_GOLD, 0.7), keys: showAt(0.52, 0.54) },
      {
        name: "the caravan's camels, with no one on them",
        svg: camel(112, 85.6, 0.11, true) + camel(124, 85.9, 0.1, true),
        keys: shown
      },
      { name: "the places walking by the camels", svg: someone(118.4, 87.6, 1.2) + someone(130, 87.8, 1.2), keys: shown },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: shown },
      { name: "his voice: takbir", svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.147, 0.157, 0.326, 0.336), loop: speaking },
      ...quickSparks(
        "takbir, three times: a spark",
        [
          [100.4, 80.6],
          [104.8, 79.4],
          [109.2, 80.6]
        ],
        0.27,
        0.018
      ),
      { name: "his voice: none is worshipped but the One", svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.395, 0.405, 0.45, 0.46), loop: speaking },
      {
        name: "his voice: we return, repenting",
        svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.6), GOLD),
        keys: track({
          opacity: [
            [0.519, 0],
            [0.528, 1],
            [0.698, 1],
            [0.708, 0]
          ],
          xy: goes
        }),
        loop: speaking
      },
      { name: "praising: a spark rising over the next rise", svg: sparkle(52, 86.6, 1.4, SPARK), keys: sparkRising(0.655, 0.7, 10), loop: speaking },
      {
        name: "his voice: the promise kept",
        svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.6), GOLD),
        keys: track({
          opacity: [
            [0.766, 0],
            [0.776, 1]
          ],
          xy: goes
        }),
        loop: speaking
      },
      { name: "home: a soft golden glow over Madinah", svg: glow(16, 93, 15, WARM, 0.12), keys: showAt(0.8, 0.83) }
    ],
    words: [
      { text: "When he came home from Hajj or Umrah", from: 0.02, to: 0.129 },
      { text: "he said Allahu Akbar on every high ground", from: 0.144, to: 0.253 },
      { text: "three times", from: 0.268, to: 0.377 },
      { text: "then: La ilaha illallah, alone, no partner", from: 0.392, to: 0.501 },
      { text: "We return, repenting, worshipping,", from: 0.516, to: 0.625 },
      { text: "prostrating, praising our Lord", from: 0.64, to: 0.749 },
      { text: "Allah kept His promise, helped His servant", from: 0.764, to: 0.873 },
      { text: "and defeated the clans, alone", from: 0.888, to: 1 }
    ]
  };
}

/** A bundle in a cloth, tied at the top, its foot's middle at (x, y): a gift. */
const bundle = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${y} Q${n(x - 3.6)} ${n(y - 2.6)} ${n(x - 1)} ${n(y - 3.6)} L${n(x + 1)} ${n(y - 3.6)} Q${n(x + 3.6)} ${n(y - 2.6)} ${n(x + 3)} ${y} Z" fill="#B5655A"/>` +
  `<path d="M${n(x - 1)} ${n(y - 3.6)} L${n(x - 1.8)} ${n(y - 5)} M${n(x + 1)} ${n(y - 3.6)} L${n(x + 1.8)} ${n(y - 5)}" stroke="#B5655A" stroke-width="0.9" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.2)} ${n(y - 3.4)} L${n(x + 1.2)} ${n(y - 3.4)}" stroke="#E8C25A" stroke-width="0.6"/><path d="M${n(x - 2.6)} ${n(y - 1.4)} L${n(x + 2.6)} ${n(y - 1.4)}" stroke="#E8C25A" stroke-width="0.35"/>`;

/** The same bundle as a faint dashed outline only: a gift that is not there. */
const bundleOutline = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${y} Q${n(x - 3.6)} ${n(y - 2.6)} ${n(x - 1)} ${n(y - 3.6)} L${n(x + 1)} ${n(y - 3.6)} Q${n(x + 3.6)} ${n(y - 2.6)} ${n(x + 3)} ${y} Z" stroke="#9A8C7A" stroke-width="0.45" stroke-dasharray="0.9 0.7" fill="none"/>`;

// Gifts to the collector. Abu Humayd as-Sa'idi said: the Prophet ﷺ sent a man of al-Azd called Ibn al-Lutbiyyah to
// collect the zakat. When he came back he said: this is for you, and this was given to me as a gift. He said: why did he
// not sit in his father's house or his mother's house, to see whether gifts would come to him or not? … Then he raised
// his hands and said: O Allah, have I not conveyed? O Allah, have I not conveyed? three times (Sahih al-Bukhari 2597).
// No one is drawn: by the masjid of Madinah, his place, a golden ring, and Ibn al-Lutbiyyah's place. His voice speaks,
// and Ibn al-Lutbiyyah's place goes off along the way to the tents of al-Azd, far off; it comes back, and a camel and
// two sheep of the zakat come with it. His voice speaks: a faint golden way goes from the zakat to the masjid, and a
// gift, a bundle with a glint, shows by Ibn al-Lutbiyyah's place. His voice speaks, and a grey ring comes about the
// gift. A home shows far off, and a faint place by its door: had he sat at home; a faint bundle shows by it and fades:
// no gift would have come. A spark rises from his place, then two more, one after another: three times in all.
function giftsToTheCollector(): SignArt {
  const his: [number, number] = [30, 99.6];
  const from: [number, number] = [40.4, 101.2];
  const away: [number, number] = [126, 85.6];
  const back: [number, number] = [60, 101.4];
  const gift: [number, number] = [n(back[0] + 5.8), n(back[1] + 3.2)];
  const atHome: [number, number] = [108.2, 90.8];
  return {
    kind: "gifts-to-the-collector",
    ms: 12000,
    parts: [
      ...day(118, 62, 12000),
      { name: "the tents of al-Azd, far off", svg: tent(134, 80.4, 10, 7, "#E8D9B6") + tent(146, 81.6, 9, 6.4, "#E8D9B6") },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.46) },
      { name: "the way to the tents of al-Azd", svg: way("M42 102 C80 101.4 106 93 128 84.6", "#F4E3BC", 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Ibn al-Lutbiyyah's place",
        svg: someone(from[0], from[1], 1.5),
        origin: { x: from[0], y: from[1] },
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.088, n(away[0] - from[0]), n(away[1] - from[1])],
            [0.146, n(away[0] - from[0]), n(away[1] - from[1])],
            [0.21, n(back[0] - from[0]), n(back[1] - from[1])]
          ],
          scale: [
            [0.04, 1],
            [0.088, 0.7],
            [0.146, 0.7],
            [0.21, 1]
          ]
        })
      },
      { name: "his voice: go and collect the zakat", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.025, 0.035, 0.08, 0.089), loop: speaking },
      {
        name: "the zakat: a camel and two sheep",
        svg: camel(80, 101.8, 0.11, true) + sheep(91.6, 102.8, 0.085, true) + sheep(100.6, 101.8, 0.085, true),
        origin: { x: 90, y: 101.8 },
        keys: track({
          opacity: [
            [0.146, 0],
            [0.152, 1]
          ],
          xy: [
            [0.146, 52, -16.4],
            [0.21, 0, 0]
          ],
          scale: [
            [0.146, 0.6],
            [0.21, 1]
          ]
        })
      },
      { name: "Ibn al-Lutbiyyah's voice: this is for you", svg: arcsLeft(n(back[0] - 2.2), n(back[1] - 3.8), VOICE), keys: showFor(0.27, 0.28, 0.326, 0.336), loop: speaking },
      { name: "for you: a faint golden way from the zakat to the masjid", svg: way("M76 99.2 C64 96.4 46 95.4 25 93.6", SOFT_GOLD, 0.7), keys: showAt(0.28, 0.295) },
      { name: "a gift: a bundle by Ibn al-Lutbiyyah's place", svg: bundle(gift[0], gift[1]), keys: showAt(0.3, 0.312) },
      { name: "the gift: a glint", svg: sparkle(n(gift[0] + 2.6), n(gift[1] - 5.2), 0.9, "#FFE7A0"), keys: showAt(0.305, 0.317), loop: speaking },
      { name: "his voice: why did he not sit at home", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.395, 0.405), loop: speaking },
      { name: "a grey ring about the gift", svg: greyRing(gift[0], n(gift[1] - 1.6), 4.8, 3), keys: showAt(0.41, 0.43) },
      {
        name: "a home of Ibn al-Lutbiyyah's family, far off",
        svg: home(110, 88, 13, 9),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.545, 0.85]
          ]
        })
      },
      { name: "had he sat at home: a faint line to it", svg: lookLine(n(back[0] + 1.6), n(back[1] - 1.8), n(atHome[0] - 1.8), atHome[1], 89, "#A08A68"), keys: showAt(0.525, 0.54) },
      {
        name: "had he sat at home: a faint place by its door",
        svg: someone(atHome[0], atHome[1], 1.2),
        keys: track({
          opacity: [
            [0.545, 0],
            [0.565, 0.7]
          ]
        })
      },
      {
        name: "would gifts come to him: a faint bundle by that home, fading",
        svg: bundleOutline(n(atHome[0] - 6.2), n(atHome[1] + 1.2)),
        keys: track({
          opacity: [
            [0.645, 0],
            [0.66, 0.9],
            [0.685, 0.9],
            [0.705, 0]
          ]
        })
      },
      { name: "a spark rising from his place", svg: sparkle(his[0], n(his[1] - 3.2), 1.4, SPARK), keys: sparkRising(0.77, 0.825, 10), loop: speaking },
      ...quickSparks(
        "the second and third time: a spark",
        [
          [27.4, 94.6],
          [32.6, 94.6]
        ],
        0.889,
        0.025
      )
    ],
    words: [
      { text: "He sent Ibn al-Lutbiyyah to collect zakat", from: 0.02, to: 0.129 },
      { text: "Ibn al-Lutbiyyah came back and said:", from: 0.144, to: 0.253 },
      { text: "this is for you, and this was a gift to me", from: 0.268, to: 0.377 },
      { text: "He said: why did Ibn al-Lutbiyyah not sit", from: 0.392, to: 0.501 },
      { text: "in his father's or his mother's house", from: 0.516, to: 0.625 },
      { text: "to see if gifts would come to him or not?", from: 0.64, to: 0.749 },
      { text: "Then: O Allah, have I not conveyed?", from: 0.764, to: 0.873 },
      { text: "O Allah, have I not conveyed? Three times", from: 0.888, to: 1 }
    ]
  };
}

/** A short upright mark scratched on a wall, its foot at (x, y): a day counted. */
const tally = (x: number, y: number, color = "#FFFFFF") => `<path d="M${x} ${y} L${x} ${n(y - 2.6)}" stroke="${color}" stroke-width="0.6" stroke-linecap="round"/>`;

// Three days for a guest. Abu Shurayh al-Ka'bi said that the Messenger of Allah ﷺ said: whoever believes in Allah and
// the Last Day, let him honor his guest. His due is a day and a night, and hospitality is three days; what is beyond
// that is charity. And it is not lawful for him to stay with his host so long that it is hard on him (Sahih al-Bukhari
// 6135). No one is drawn: by the masjid of Madinah, his place, a golden ring, his voice speaking. The place of a
// visitor comes along the road to a home, the host's place meets it, and a soft golden ring comes about them both. The
// best of food shows on a dish, with glints. Night falls and day comes again, and a mark shows on the home's wall: a
// day; then twice more: three days. A fourth mark shows in gold, and a spark rises from the host's place: charity. A
// grey ring comes about the visitor's place; then the host's sack of food grows small, with a grey ring about it.
function threeDaysForAGuest(): SignArt {
  const his: [number, number] = [28, 99.6];
  const homeAt: [number, number] = [110, 95];
  const host: [number, number] = [98.6, 101.6];
  const visitorFrom: [number, number] = [156, 98.8];
  const visitorTo: [number, number] = [120.4, 101.8];
  const store: [number, number] = [88.4, 100.6];
  const dishAt: [number, number] = [109.6, 104.8];
  const nights: [number, number][] = [
    [0.335, 0],
    [0.35, 0.85],
    [0.365, 0.85],
    [0.38, 0],
    [0.452, 0],
    [0.464, 0.85],
    [0.474, 0.85],
    [0.486, 0],
    [0.494, 0],
    [0.506, 0.85],
    [0.516, 0.85],
    [0.528, 0]
  ];
  const night = track({ opacity: nights });
  const marks: [number, number, number][] = [
    [100.4, 0.38, 0.388],
    [102, 0.486, 0.492],
    [103.6, 0.526, 0.532]
  ];
  return {
    kind: "three-days-for-a-guest",
    ms: 11000,
    parts: [
      ...day(128, 50, 11000).map((part): SignPart => (part.name === "the sun" ? { ...part, keys: track({ opacity: nights.map(([t, v]): [number, number] => [t, v > 0 ? 0 : 1]) }) } : part)),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: whoever believes, let him honor", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.025, 0.035), loop: speaking },
      { name: "the host's home", svg: home(homeAt[0], homeAt[1], 22, 14) },
      { name: "the road to the home", svg: way("M160 98.4 C146 99.6 132 100.8 116 102", "#F4E3BC", 0.8) },
      { name: "the host's sack of food", svg: sack(store[0], store[1], 1.2), origin: { x: store[0], y: store[1] }, keys: track({ scale: [[0.88, 1], [0.93, 0.55]] }) },
      { name: "the host's place", svg: someone(host[0], host[1], 1.6) },
      {
        name: "the visitor's place",
        svg: someone(visitorFrom[0], visitorFrom[1], 1.6),
        keys: track({
          opacity: [
            [0.165, 0],
            [0.175, 1]
          ],
          xy: [
            [0.165, 0, 0],
            [0.235, n(visitorTo[0] - visitorFrom[0]), n(visitorTo[1] - visitorFrom[1])]
          ]
        })
      },
      { name: "honored: a soft golden ring about the visitor's place and the host's", svg: care(109.6, 102.2, 14, 2.8, SOFT_GOLD), keys: showAt(0.235, 0.248), loop: soft },
      { name: "a day and a night: the best of food on a dish", svg: big(food(dishAt[0], dishAt[1]), dishAt[0], dishAt[1], 1.5), keys: showAt(0.31, 0.325) },
      { name: "the best of food: glints", svg: sparkle(n(dishAt[0] - 4.4), n(dishAt[1] - 5.2), 0.8, "#FFE7A0") + sparkle(n(dishAt[0] + 4.8), n(dishAt[1] - 4.4), 0.7, "#FFE7A0"), keys: showAt(0.315, 0.33), loop: speaking },
      { name: "night", svg: NIGHT, keys: night },
      { name: "stars", svg: NIGHT_STARS, keys: night, loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      ...marks.map(([x, from, to], i): SignPart => ({ name: `a day counted: a mark on the home's wall ${i + 1}`, svg: tally(x, 89.4), keys: showAt(from, to) })),
      { name: "beyond that, charity: a fourth mark, in gold", svg: tally(105.2, 89.4, "#E8C25A"), keys: showAt(0.6, 0.612) },
      { name: "charity: a spark rising from the host's place", svg: sparkle(host[0], n(host[1] - 3.2), 1.4, SPARK), keys: sparkRising(0.615, 0.665, 10), loop: speaking },
      { name: "not to stay on: a grey ring about the visitor's place", svg: greyRing(visitorTo[0], n(visitorTo[1] + 0.4), 3.4, 1.7), keys: showAt(0.74, 0.76) },
      { name: "hard on the host: a grey ring about the sack", svg: greyRing(store[0], n(store[1] - 2.4), 5.2, 3.4), keys: showAt(0.925, 0.945) }
    ],
    words: [
      { text: "He said: whoever believes in Allah", from: 0.02, to: 0.147 },
      { text: "and the Last Day, let him honor his guest", from: 0.162, to: 0.289 },
      { text: "the guest's due: a day and a night", from: 0.304, to: 0.431 },
      { text: "and hospitality is three days", from: 0.446, to: 0.573 },
      { text: "what is beyond that is charity", from: 0.588, to: 0.715 },
      { text: "it is not lawful for the guest to stay", from: 0.73, to: 0.857 },
      { text: "so long that it is hard on his host", from: 0.872, to: 1 }
    ]
  };
}

/** A garlic plant: its white bulb half out of the ground at (x, y), and its long thin leaves. */
const garlicPlant = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 1.6)} Q${n(x - 1.4)} ${n(y - 6)} ${n(x - 3.4)} ${n(y - 9)} M${x} ${n(y - 1.6)} Q${n(x + 0.4)} ${n(y - 6.4)} ${n(x + 0.6)} ${n(y - 10.4)} M${x} ${n(y - 1.6)} Q${n(x + 1.6)} ${n(y - 5.4)} ${n(x + 3.6)} ${n(y - 8.2)}" stroke="#6E9A48" stroke-width="0.6" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.8)} ${y} Q${n(x - 2)} ${n(y - 1.8)} ${x} ${n(y - 2.2)} Q${n(x + 2)} ${n(y - 1.8)} ${n(x + 1.8)} ${y} Z" fill="#F4EEE0" stroke="#D8CDB4" stroke-width="0.3"/>`;

/** A garlic bulb, its middle at (x, y): white cloves with fine lines, and a short dry stem. */
const garlicBulb = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y + 1)} Q${n(x - 4.4)} ${n(y - 2.6)} ${x} ${n(y - 3.6)} Q${n(x + 4.4)} ${n(y - 2.6)} ${n(x + 4)} ${n(y + 1)} Q${x} ${n(y + 3.4)} ${n(x - 4)} ${n(y + 1)} Z" fill="#F7F2E6" stroke="#D8CDB4" stroke-width="0.4"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 3.2)} Q${n(x - 2.6)} ${y} ${n(x - 1.4)} ${n(y + 2.6)} M${n(x + 1.6)} ${n(y - 3.2)} Q${n(x + 2.6)} ${y} ${n(x + 1.4)} ${n(y + 2.6)} M${x} ${n(y - 3.6)} L${x} ${n(y + 2.8)}" stroke="#DCCFB2" stroke-width="0.35" fill="none"/>` +
  `<path d="M${x} ${n(y - 3.6)} L${n(x + 0.4)} ${n(y - 6)}" stroke="#C9B98E" stroke-width="0.8" stroke-linecap="round"/>`;

/** An onion half out of the ground at (x, y): a round purple bulb and its hollow green shoots. */
const onion = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 3)} L${n(x - 1.2)} ${n(y - 10)} M${x} ${n(y - 3)} L${n(x + 0.4)} ${n(y - 11)} M${x} ${n(y - 3)} L${n(x + 1.8)} ${n(y - 9.4)}" stroke="#5E9A3E" stroke-width="0.8" stroke-linecap="round"/>` +
  `<path d="M${n(x - 2.4)} ${n(y - 0.4)} Q${n(x - 2.6)} ${n(y - 3)} ${x} ${n(y - 3.4)} Q${n(x + 2.6)} ${n(y - 3)} ${n(x + 2.4)} ${n(y - 0.4)} Q${x} ${n(y + 0.8)} ${n(x - 2.4)} ${n(y - 0.4)} Z" fill="#B0577A"/>`;

/** Faint wisps of a smell rising over (x, y). */
const wisps = (x: number, y: number) =>
  [-2.4, 0, 2.4]
    .map((dx, i) => `<path d="M${n(x + dx)} ${n(y - (i % 2 ? 1 : 0))} q-1 -1.4 0 -2.8 q1 -1.4 0 -2.8" stroke="#94A86A" stroke-width="0.55" fill="none" opacity="0.85" stroke-linecap="round"/>`)
    .join("");

// Garlic and the masjid. Ibn Umar said that the Prophet ﷺ said, in the campaign of Khaybar: whoever ate of this plant,
// meaning garlic, should not come near our masjid (Sahih al-Bukhari 853). Jabir said that the Prophet ﷺ said: whoever
// eats garlic or onion should keep away from us, or he said: should keep away from our masjid, and stay in his house
// (Sahih al-Bukhari 855, 5452). No one is drawn: by the masjid of Madinah, his place, a golden ring, and the places of
// some at its door; by a home, a patch of garlic, and the place of one who eats of it, with faint wisps of its smell. A
// garlic bulb shows close. The eater's place starts toward the masjid, the smell drifts on ahead to the door, and a
// grey ring comes about the eater's place. His voice speaks again and onions show in the patch; the eater's place goes
// back, and into the home, and a soft ring shows at its door.
function garlicAndTheMasjid(): SignArt {
  const his: [number, number] = [34, 100.2];
  const eaterFrom: [number, number] = [128, 101.6];
  const ate: [number, number] = [113.6, 102.6];
  const near: [number, number] = [66, 102.2];
  const back: [number, number] = [96, 102.4];
  const inside: [number, number] = [138.2, 100.6];
  const plants: [number, number][] = [
    [93, 101.6],
    [98.4, 102.4],
    [103.8, 101.6]
  ];
  const eaten: [number, number] = [109.2, 102.4];
  const d = (to: [number, number]): [number, number] => [n(to[0] - eaterFrom[0]), n(to[1] - eaterFrom[1])];
  const walks: [number, number, number][] = [
    [0.04, 0, 0],
    [0.08, ...d(ate)],
    [0.355, ...d(ate)],
    [0.41, ...d(near)],
    [0.69, ...d(near)],
    [0.75, ...d(back)],
    [0.85, ...d(back)],
    [0.9, ...d(inside)]
  ];
  // The grey ring and the wisps go with the eater's place once they show.
  return {
    kind: "garlic-and-the-masjid",
    ms: 10000,
    parts: [
      ...day(120, 66, 10000),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.5) },
      { name: "the places of some at the masjid's door", svg: someone(9.6, 104.4, 1.2) + someone(15, 105, 1.2) + someone(20.4, 104.4, 1.2) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "a home", svg: home(140, 95, 18, 12) },
      { name: "a patch of garlic", svg: plants.map(([x, y]) => garlicPlant(x, y)).join("") },
      { name: "a garlic plant, pulled up and eaten", svg: garlicPlant(eaten[0], eaten[1]), keys: track({ opacity: [[0.088, 1], [0.1, 0]] }) },
      { name: "onions in the patch", svg: onion(87.4, 102.8) + onion(115.6, 103) + onion(101, 104.6), keys: showAt(0.54, 0.56) },
      { name: "the eater's place", svg: someone(eaterFrom[0], eaterFrom[1], 1.6), keys: track({ xy: walks, opacity: [[0.9, 1], [0.92, 0.5]] }) },
      {
        name: "the smell: faint wisps over the eater's place",
        svg: wisps(eaterFrom[0], n(eaterFrom[1] - 3)),
        keys: track({
          xy: walks,
          opacity: [
            [0.1, 0],
            [0.12, 1],
            [0.9, 1],
            [0.92, 0]
          ]
        }),
        loop: { move: "bob", ms: 1600, y: -0.8 }
      },
      { name: "his voice: whoever ate of this plant", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.025, 0.035, 0.45, 0.46), loop: speaking },
      { name: "this plant: a soft ring about the garlic", svg: care(101, 102.6, 11, 2.6, "#FFFFFF"), keys: showFor(0.04, 0.06, 0.19, 0.2), loop: soft },
      { name: "meaning garlic: a garlic bulb, close", svg: big(garlicBulb(100, 86), 100, 86, 1.8), keys: showFor(0.19, 0.21, 0.35, 0.36) },
      {
        name: "the smell, drifting on to the masjid's door",
        svg: wisps(n(near[0] - 3), n(near[1] - 4)),
        keys: track({
          opacity: [
            [0.41, 0],
            [0.42, 1],
            [0.45, 1],
            [0.46, 0]
          ],
          xy: [
            [0.41, 0, 0],
            [0.455, -40, 2]
          ]
        })
      },
      {
        name: "not near our masjid: a grey ring about the eater's place",
        svg: greyRing(eaterFrom[0], n(eaterFrom[1] + 0.4), 3.6, 1.8),
        keys: track({
          xy: walks,
          opacity: [
            [0.425, 0],
            [0.44, 1],
            [0.85, 1],
            [0.87, 0]
          ]
        })
      },
      { name: "his voice: garlic or onion", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      { name: "staying home: a soft ring at the home's door", svg: care(inside[0], n(inside[1] + 0.6), 4.4, 1.8, "#FFFFFF"), keys: showAt(0.91, 0.93), loop: soft }
    ],
    words: [
      { text: "He said: whoever ate of this plant", from: 0.02, to: 0.17 },
      { text: "meaning garlic,", from: 0.185, to: 0.335 },
      { text: "should not come near our masjid", from: 0.35, to: 0.5 },
      { text: "He said: whoever eats garlic or onion", from: 0.515, to: 0.665 },
      { text: "should keep away from our masjid", from: 0.68, to: 0.83 },
      { text: "and stay in his house", from: 0.845, to: 1 }
    ]
  };
}

/** An arrow lying level, its tip at (x, y) pointing right and its feathers at x - 18; bent, its shaft bows up. */
const arrow = (x: number, y: number, bent: boolean) => {
  const tail = n(x - 18);
  const shaft = bent ? `M${tail} ${y} Q${n(x - 9)} ${n(y - 5)} ${n(x - 2.6)} ${y}` : `M${tail} ${y} L${n(x - 2.6)} ${y}`;
  return (
    `<path d="${shaft}" stroke="#8A5A2E" stroke-width="0.8" fill="none" stroke-linecap="round"/>` +
    `<path d="M${x} ${y} L${n(x - 3)} ${n(y - 1.3)} L${n(x - 2.4)} ${y} L${n(x - 3)} ${n(y + 1.3)} Z" fill="#59616A"/>` +
    `<path d="M${n(tail + 3)} ${y} L${n(tail - 0.4)} ${n(y - 1.6)} L${n(tail + 0.6)} ${y} Z M${n(tail + 3)} ${y} L${n(tail - 0.4)} ${n(y + 1.6)} L${n(tail + 0.6)} ${y} Z" fill="#B5523B"/>`
  );
};

/** A round mark of straw on a post, its middle at (x, y), the post standing on the ground at `ground`. */
const mark = (x: number, y: number, ground: number) =>
  `<path d="M${x} ${n(y + 3)} L${x} ${ground}" stroke="#7A5634" stroke-width="1.2" stroke-linecap="round"/>` +
  `<circle cx="${x}" cy="${y}" r="4" fill="#E9D29A" stroke="#C9A85E" stroke-width="0.5"/><circle cx="${x}" cy="${y}" r="2.4" fill="none" stroke="#B5523B" stroke-width="0.7"/><circle cx="${x}" cy="${y}" r="0.9" fill="#B5523B"/>`;

// Straight as an arrow. Ali said: the Messenger of Allah ﷺ said to me: say: O Allah, guide me and keep me straight;
// and with guidance, remember your being guided on the road, and with straightness, the straightness of the arrow
// (Sahih Muslim 2725a). No one is drawn: his place, a golden ring, and Ali's place. His voice speaks, then Ali's, and a
// spark of du'a rises from Ali's place. A road forks; a golden way shows along the right fork, and a traveller's place
// goes along it, all the way to a home at its end, with a warm glow. An arrow shows, bent; it is made straight, then
// flies straight to a mark on a post, with a glint.
function straightAsAnArrow(): SignArt {
  const his: [number, number] = [26, 99.6];
  const ali: [number, number] = [38.4, 101];
  const traveller: [number, number] = [58, 104.6];
  const tip: [number, number] = [72, 76.4];
  const target: [number, number] = [134, 76.4];
  return {
    kind: "straight-as-an-arrow",
    ms: 9500,
    parts: [
      ...day(116, 52, 9500),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      {
        name: "a road that forks",
        svg:
          `<path d="M50 107 Q66 103 80 102.4 Q116 100.6 156 98" stroke="#EEDCAE" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
          `<path d="M80 102.4 Q92 94 106 84.4" stroke="#EEDCAE" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
      },
      { name: "a home at the road's end", svg: farHome(152, 95.6) },
      { name: "a mark on a post", svg: mark(target[0] + 2, target[1], 96.6) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ali's place", svg: someone(ali[0], ali[1], 1.6) },
      { name: "his voice: say", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.025, 0.035, 0.12, 0.13), loop: speaking },
      { name: "Ali's voice: guide me", svg: arcs(n(ali[0] + 2.4), n(ali[1] - 3.8), VOICE), keys: showFor(0.19, 0.2, 0.285, 0.295), loop: speaking },
      { name: "a du'a: a spark rising from Ali's place", svg: sparkle(ali[0], n(ali[1] - 3.4), 1.4, SPARK), keys: sparkRising(0.21, 0.26, 10), loop: speaking },
      { name: "his voice: remember the road and the arrow", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.352, 0.362), loop: speaking },
      { name: "guidance: a golden way along the right fork", svg: way("M60 104 Q72 102.6 80 102.2 Q114 100.4 148 98.2", GOLD, 0.8), keys: showAt(0.36, 0.385) },
      {
        name: "a traveller's place",
        svg: someone(traveller[0], traveller[1], 1.5),
        keys: track({
          xy: [
            [0.52, 0, 0],
            [0.54, 22, -2.4],
            [0.6, 88, -6]
          ]
        })
      },
      { name: "the road's end: a warm glow about the home", svg: glow(152, 93.6, 5.6, WARM, 0.3), keys: showAt(0.6, 0.62) },
      { name: "an arrow, bent", svg: arrow(tip[0], tip[1], true), keys: showFor(0.685, 0.7, 0.73, 0.76) },
      {
        name: "the arrow, made straight",
        svg: arrow(tip[0], tip[1], false),
        keys: track({
          opacity: [
            [0.73, 0],
            [0.76, 1]
          ],
          xy: [
            [0.85, 0, 0],
            [0.895, n(target[0] - tip[0]), 0]
          ]
        })
      },
      { name: "straight to the mark: a glint", svg: sparkle(n(target[0] + 2), n(target[1] - 5.6), 1.2, "#FFE7A0"), keys: showAt(0.895, 0.908), loop: speaking }
    ],
    words: [
      { text: "Ali said: he said to me: say", from: 0.02, to: 0.17 },
      { text: "O Allah, guide me, and keep me straight", from: 0.185, to: 0.335 },
      { text: "and with guidance, remember", from: 0.35, to: 0.5 },
      { text: "your being guided on the road", from: 0.515, to: 0.665 },
      { text: "and with straightness, remember", from: 0.68, to: 0.83 },
      { text: "the straightness of the arrow", from: 0.845, to: 1 }
    ]
  };
}

export const TRUST_ART = {
  "a-dua-for-anas": aDuaForAnas,
  "truly-trustworthy": trulyTrustworthy,
  "takbir-on-the-rises": takbirOnTheRises,
  "gifts-to-the-collector": giftsToTheCollector,
  "three-days-for-a-guest": threeDaysForAGuest,
  "garlic-and-the-masjid": garlicAndTheMasjid,
  "straight-as-an-arrow": straightAsAnArrow
} as const;
