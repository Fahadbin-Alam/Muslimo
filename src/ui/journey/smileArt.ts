import { animalAt, cloud, n, peaks, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, goldCoin, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { road, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { kabah } from "./historyArt";
import { EIGHT, FOLK, glints, ITS_VOICE, linesOn, places, plainLand, rel, SEVEN, sparkStays, twinkle } from "./shareArt";
import { fronds, trunk } from "./learnArt";

/**
 * His smile and his giving: Jarir, whom he never kept out, and met with a smile whenever he saw him, and for whom he
 * asked Allah to make him firm and a guide; the cloak a woman wove with her own hands, which he wore and then gave to
 * the one who asked for it, for he never turned down a request; the delegation of Abd al-Qays, welcomed and taught,
 * and told to tell those they had left behind; the prayer in which he stood up after two rak'at without sitting, and
 * made two prostrations before the taslim; Ibn Mas'ud and his mother going in so often that they seemed of his family;
 * the wealth from Bahrain, and his word that he did not fear poverty for them, but the world spread out; and Makkah,
 * entered from its higher side and left from its lower side. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head or a face:
 * where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs
 * in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer or a du'a is a spark that
 * rises, what is good is a light, glints and a soft golden ring. No name or word is written.
 */

/** The words of five lines. */
const FIVE = [
  [0.02, 0.2],
  [0.216, 0.396],
  [0.412, 0.592],
  [0.608, 0.788],
  [0.804, 1]
] as const;

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** The words of seven lines, the last one long enough for two prostrations and the taslim. */
const SEVEN_LONG_LAST = [
  [0.02, 0.13],
  [0.146, 0.256],
  [0.272, 0.382],
  [0.398, 0.508],
  [0.524, 0.634],
  [0.65, 0.76],
  [0.776, 1]
] as const;

/** A cloak, folded, its middle at (x, y), s times its usual size: woven, with a border along its edges. */
const foldedCloak = (x: number, y: number, s = 1) =>
  `<rect x="${n(x - 3.6 * s)}" y="${n(y - 1.6 * s)}" width="${n(7.2 * s)}" height="${n(3.2 * s)}" rx="${n(0.4 * s)}" fill="#EFE2C2"/>` +
  `<rect x="${n(x - 3.6 * s)}" y="${n(y - 1.6 * s)}" width="${n(7.2 * s)}" height="${n(0.8 * s)}" fill="#B0563C"/><rect x="${n(x - 3.6 * s)}" y="${n(y + 0.8 * s)}" width="${n(7.2 * s)}" height="${n(0.8 * s)}" fill="#B0563C"/>` +
  [-2.4, -0.8, 0.8, 2.4].map((dx) => `<path d="M${n(x + (dx - 0.5) * s)} ${n(y + 0.6 * s)} L${n(x + (dx + 0.5) * s)} ${n(y - 0.6 * s)}" stroke="#C9B48A" stroke-width="${n(0.3 * s)}"/>`).join("");

/** Three short strokes by (x, y), up and down: not sitting firm. */
const unsteady = (x: number, y: number, color: string) =>
  [-1.4, 0, 1.4].map((dx) => `<path d="M${n(x + dx)} ${n(y - 1.2)} l0.6 1.2 l-0.6 1.2" stroke="${color}" stroke-width="0.5" fill="none" stroke-linecap="round"/>`).join("");

/** A new moon at (x, y): a crescent, lit on its left. */
const newMoon = (x: number, y: number) =>
  `<path d="M${n(x)} ${n(y - 4.4)} A4.4 4.4 0 0 0 ${n(x)} ${n(y + 4.4)} A1.8 4.4 0 0 1 ${n(x)} ${n(y - 4.4)} Z" fill="#FFF3C4"/>`;

// Always a smile. Jarir said: Allah's Messenger ﷺ did not screen himself from me since my embracing Islam, and
// whenever he saw me he would receive me with a smile. Once I told him that I could not sit firm on horses. He stroked
// me on the chest with his hand and said: O Allah, make him firm and make him a guiding and a rightly guided man
// (Sahih al-Bukhari 3035; and Sahih Muslim 2475a: he never refused me permission to see him since I embraced Islam,
// and never looked at me but with a smile). No one is drawn: his house in Madinah, the road to its door, palms and the
// day. Jarir's voice tells of it from the road, and a soft light shows in the open doorway: never kept out. Jarir's
// place comes along the road to the door, and a soft warm light comes about his place: he smiled. A horse comes, not
// steady; Jarir's voice tells him he cannot sit firm on horses, and short strokes show by it. His voice speaks, and a
// spark of his du'a rises; a soft golden ring comes about Jarir's place: made firm; and a golden way goes on from it,
// with glints: a guide, rightly guided. The hand on the chest is not drawn.
function alwaysASmile(): SignArt {
  const his: [number, number] = [40, 103.4];
  const start: [number, number] = [126, 104.6];
  const atDoor: [number, number] = [48, 104.4];
  const horse: [number, number] = [96, 104.6];
  return {
    kind: "always-a-smile",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(76, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [70, 118], [140, 116]]) },
      ...palms(
        [
          [8, 100, 15],
          [148, 100, 17]
        ],
        "Madinah"
      ),
      { name: "his house in Madinah", svg: home(34, 99, 30, 22) },
      {
        name: "never kept out: a soft light in his open doorway",
        svg: `<path d="M30.4 99 L30.4 93.6 Q32.2 91.4 34 93.6 L34 99 Z" fill="#FFE9A8" opacity="0.75"/>`,
        keys: showAt(0.17, 0.2),
        loop: soft
      },
      { name: "the road to his door", svg: road(40, 160, 105) },
      { name: "his place, at his door", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Jarir's place: along the road to his door",
        svg: someone(start[0], start[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.31, 0, 0],
            [0.37, ...rel(start, atDoor)]
          ]
        })
      },
      { name: "Jarir's voice: telling of it, from the road", svg: arcsLeft(n(start[0] - 3.4), n(start[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.098, 0.106), loop: speaking },
      { name: "he smiled: a soft warm light about his place", svg: wash(his[0], his[1], 7, 4.4, WARM, 0.24), keys: showAt(0.456, 0.47), loop: soft },
      {
        name: "received with a smile: glints about his place",
        svg: glints([
          [36.4, 98.4],
          [43.6, 98],
          [40, 96.6]
        ]),
        keys: showAt(0.49, 0.51),
        loop: twinkle()
      },
      {
        name: "a horse, coming along the road",
        svg: animalAt("horse", n(horse[0] - 50 * 0.2), n(horse[1] - 73 * 0.2), 0.2, true),
        origin: { x: horse[0], y: horse[1] },
        keys: track({
          opacity: [
            [0.6, 0],
            [0.606, 1]
          ],
          xy: [
            [0.606, 30, 0],
            [0.646, 0, 0]
          ]
        }),
        loop: { move: "sway", ms: 900, angle: 2.4 }
      },
      { name: "Jarir's voice: telling him, at his door", svg: arcsLeft(n(atDoor[0] - 3.2), n(atDoor[1] - 2.8), ITS_VOICE), keys: showFor(0.65, 0.656, 0.74, 0.748), loop: speaking },
      { name: "not sitting firm: short strokes by the horse", svg: unsteady(n(horse[0] + 1), n(horse[1] - 16.4), "#8A6A48"), keys: showAt(0.664, 0.676), loop: twinkle(700) },
      { name: "his voice: making du'a for Jarir", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.752, 0.76), loop: speaking },
      { name: "his du'a: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.4, "#FFE7A0"), keys: sparkStays(0.766, 0.796), loop: twinkle(900) },
      { name: "made firm: a soft golden ring about Jarir's place", svg: care(atDoor[0], atDoor[1], 4.6, 2.6, SOFT_GOLD), keys: showAt(0.804, 0.82), loop: soft },
      {
        name: "guiding and rightly guided: a golden way on from Jarir's place",
        svg: way("M52.6 103.2 C68 99.4 92 96.6 122 95.4", SOFT_GOLD, 0.7),
        keys: showAt(0.888, 0.912)
      },
      {
        name: "rightly guided: glints about Jarir's place",
        svg: glints([
          [44.6, 99.8],
          [51.4, 99.4],
          [48, 98]
        ]),
        keys: showAt(0.92, 0.94),
        loop: twinkle()
      }
    ],
    words: linesOn(SEVEN, [
      "Jarir said: he did not screen himself",
      "From me, since I embraced Islam.",
      "Whenever he saw me,",
      "He would receive me with a smile.",
      "I told him I could not sit firm on horses.",
      "He said: O Allah, make him firm,",
      "And make him guiding and rightly guided."
    ])
  };
}

// Woven with her own hands. Sahl said: a woman brought the Prophet ﷺ a woven burdah having edging, and said: I have
// woven it with my own hands, and I have brought it so that you may wear it. The Prophet ﷺ accepted it, and at that
// time he was in need of it. So he came out wearing it as his waist-sheet. A man praised it and said: will you give it
// to me? How nice it is! The other people said: you have not done the right thing, as the Prophet ﷺ is in need of it,
// and you have asked for it when you know that he never turns down anybody's request (Sahih al-Bukhari 1277; what the
// man answered after is left out). No one is drawn: his house in Madinah, the road to it, a palm and the day; those
// sitting outside, Sahl among them. The place of the one who wove it comes along the road with the cloak, folded, and
// her voice speaks; glints come over the cloak: woven by her. The cloak goes to his place: accepted, and her place goes
// back. His place goes to his door with it and comes out to those sitting. One of them comes near, and his voice asks
// for it; glints come over the cloak. The voice of those sitting speaks. A soft golden ring comes about his place, and
// the cloak goes to the one who asked: he never turns down a request. The cloak is only ever drawn folded.
function wovenWithHerOwnHands(): SignArt {
  const his: [number, number] = [42, 104.6];
  const door: [number, number] = [26.2, 100.8];
  const out: [number, number] = [70, 104.6];
  const weaverFrom: [number, number] = [148, 106.4];
  const weaverAt: [number, number] = [57, 105.8];
  const askerFrom: [number, number] = [104, 112.6];
  const askerAt: [number, number] = [86, 106.4];
  // The cloak: beside the weaver, then at his place, at his door, beside him outside, and with the one who asked.
  const c0: [number, number] = [154, 104.2];
  const c1: [number, number] = [63, 103.6];
  const c2: [number, number] = [48.2, 102.8];
  const cDoor: [number, number] = [30.6, 99.6];
  const c3: [number, number] = [76.2, 102.8];
  const c4: [number, number] = [92, 104.2];
  return {
    kind: "woven-with-her-own-hands",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(128, 16) },
      { name: "a cloud", svg: cloud(80, 22, 0.46, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 118], [60, 117], [140, 118]]) },
      ...palms(
        [
          [6, 100, 15],
          [150, 99, 16]
        ],
        "Madinah"
      ),
      { name: "his house in Madinah", svg: home(28, 100, 34, 24) },
      { name: "the road to his house", svg: road(40, 160, 106) },
      {
        name: "those sitting outside",
        svg: places(
          [
            [96, 113],
            [112, 113],
            [120, 111.6]
          ],
          1.6
        )
      },
      { name: "Sahl's place, among those sitting", svg: someone(88, 112.6, 1.6, ITS_VOICE) },
      { name: "Sahl's voice: telling of it", svg: arcsLeft(84.4, 109.8, ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      {
        name: "his place: to his door, and out to those sitting",
        svg: ring(his[0], his[1], 2.8, GOLD),
        keys: track({
          xy: [
            [0.51, 0, 0],
            [0.526, ...rel(his, door)],
            [0.54, ...rel(his, door)],
            [0.572, ...rel(his, out)]
          ]
        })
      },
      {
        name: "the place of the one who wove it: along the road, and back",
        svg: someone(weaverFrom[0], weaverFrom[1], 1.6, ITS_VOICE),
        keys: track({
          opacity: [
            [0.44, 1],
            [0.452, 0]
          ],
          xy: [
            [0.024, 0, 0],
            [0.086, ...rel(weaverFrom, weaverAt)],
            [0.44, ...rel(weaverFrom, weaverAt)],
            [0.452, n(rel(weaverFrom, weaverAt)[0] + 6), rel(weaverFrom, weaverAt)[1]]
          ]
        })
      },
      {
        name: "the cloak, folded: brought, accepted, and given",
        svg: foldedCloak(c0[0], c0[1], 1.3),
        keys: track({
          xy: [
            [0.024, 0, 0],
            [0.086, ...rel(c0, c1)],
            [0.39, ...rel(c0, c1)],
            [0.42, ...rel(c0, c2)],
            [0.51, ...rel(c0, c2)],
            [0.526, ...rel(c0, cDoor)],
            [0.54, ...rel(c0, cDoor)],
            [0.572, ...rel(c0, c3)],
            [0.9, ...rel(c0, c3)],
            [0.934, ...rel(c0, c4)]
          ]
        })
      },
      { name: "her voice: speaking to him", svg: arcsLeft(n(weaverAt[0] - 3.4), n(weaverAt[1] - 3), ITS_VOICE), keys: showFor(0.146, 0.154, 0.388, 0.396), loop: speaking },
      {
        name: "woven by the one who brought it: glints over the cloak",
        svg: glints([
          [59.6, 100.4],
          [65.6, 100],
          [62.8, 98.4]
        ]),
        keys: showFor(0.27, 0.29, 0.388, 0.396),
        loop: twinkle()
      },
      { name: "accepted: a soft golden ring about his place", svg: care(his[0], his[1], 5.6, 3, SOFT_GOLD), keys: showFor(0.424, 0.44, 0.51, 0.516), loop: soft },
      {
        name: "the place of one who asked for it",
        svg: someone(askerFrom[0], askerFrom[1], 1.6, FOLK),
        keys: track({
          xy: [
            [0.632, 0, 0],
            [0.668, ...rel(askerFrom, askerAt)]
          ]
        })
      },
      { name: "a voice: asking for it", svg: arcsLeft(n(askerAt[0] - 3.4), n(askerAt[1] - 3), FOLK), keys: showFor(0.672, 0.68, 0.752, 0.76), loop: speaking },
      {
        name: "how nice it is: glints over the cloak",
        svg: glints([
          [72.8, 99.6],
          [78.8, 99.2],
          [76, 97.6]
        ]),
        keys: showFor(0.684, 0.698, 0.876, 0.884),
        loop: twinkle()
      },
      { name: "the voice of those sitting", svg: arcs(124, 109.2, FOLK), keys: showFor(0.756, 0.764, 0.876, 0.884), loop: speaking },
      { name: "he never turns down a request: a soft golden ring about his place", svg: care(out[0], out[1], 5.6, 3, SOFT_GOLD), keys: showAt(0.878, 0.894), loop: soft },
      { name: "given: a soft warm light about the place of the one who asked", svg: wash(askerAt[0], askerAt[1], 7.4, 4.4, WARM, 0.2), keys: showAt(0.938, 0.956), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Sahl: a woman brought a woven cloak,",
      "With edging, and said: I have woven it",
      "With my own hands for you to wear.",
      "He accepted it, and he was in need of it.",
      "He came out wearing it as his waist-sheet.",
      "A man praised it: will you give it to me?",
      "The people said: you have not done right,",
      "For he never turns down anybody's request."
    ])
  };
}

// Tell those you left behind. Abu Jamrah said: Ibn Abbas said: a delegation of the tribe of Abd al-Qays came to the
// Prophet ﷺ. He said to them: welcome, O people, neither will you have disgrace nor will you regret. They said: we have
// come to you from a distant place, and we cannot come to you except in the sacred month; so please order us to do
// something good, that we may also inform our people whom we have left behind, and that we may enter Paradise. He
// ordered them to believe in Allah alone: to testify that none has the right to be worshipped but Allah and that
// Muhammad is His Messenger, to offer prayers perfectly, to pay zakat and to observe fasts during the month of Ramadan;
// and he said: memorize them, and tell them to the people whom you have left behind (Sahih al-Bukhari 87; the tribe on
// the road, the fifth of the spoils and the vessels he forbade are left out). No one is drawn: the masjid of Madinah
// on the left, a palm, the long road from the east, and far off on the right the homes of their people. The places of
// the delegation come along the road to his place; his voice welcomes them, and a soft golden ring and a soft warm
// light come about them. Their voice speaks; a soft light goes along the long road, and over the homes far off. Glints
// come over them; a spark of the prayer rises, a small sack shows for the zakat, and a thin new moon for the fast of
// Ramadan. Then they go back along the road, and glints come over the homes far off: told.
function tellThoseYouLeftBehind(): SignArt {
  const his: [number, number] = [40, 104];
  // The delegation, as one group: its first place on the road, near him, and back on the road home.
  const group: [number, number][] = [
    [0, 0],
    [6, 0.6],
    [12, 0],
    [3, 4.4],
    [9, 4.4]
  ];
  const onRoad: [number, number] = [112, 89.4];
  const halfway: [number, number] = [84, 96.4];
  const near: [number, number] = [52, 103];
  const home2: [number, number] = [122, 87];
  const delegation = group.map(([dx, dy]): [number, number] => [n(onRoad[0] + dx), n(onRoad[1] + dy)]);
  const nearMiddle: [number, number] = [n(near[0] + 6), n(near[1] + 2.4)];
  return {
    kind: "tell-those-you-left-behind",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(26, 16) },
      { name: "a cloud", svg: cloud(96, 22, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [92, 118], [146, 116]]) },
      { name: "the far land they came from", svg: `<path d="M106 80 Q130 72 160 74 L160 84 Q132 82 106 86 Z" fill="#D6BF92"/>` },
      { name: "their homes, far off", svg: home(134, 79, 10, 7) + home(146, 78.4, 9, 6.4) + home(155, 79.4, 7, 5.4) },
      { name: "the long road from the east", svg: `<path d="M156 81 C132 86 100 94 54 106" stroke="#EEDCAE" stroke-width="3.6" fill="none" stroke-linecap="round"/>` },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 1) },
      ...palms([[64, 99, 14]], "Madinah"),
      { name: "his place, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the places of the delegation of Abd al-Qays: along the road to him, and back",
        svg: places(delegation, 1.5),
        keys: track({
          xy: [
            [0.022, 0, 0],
            [0.088, ...rel(onRoad, halfway)],
            [0.144, ...rel(onRoad, halfway)],
            [0.2, ...rel(onRoad, near)],
            [0.876, ...rel(onRoad, near)],
            [0.95, ...rel(onRoad, home2)]
          ]
        })
      },
      { name: "his voice: welcome", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.202, 0.21), loop: speaking },
      { name: "neither disgrace nor regret: a soft golden ring about the delegation", svg: care(nearMiddle[0], nearMiddle[1], 11, 4.4, SOFT_GOLD), keys: showFor(0.27, 0.288, 0.876, 0.884), loop: soft },
      { name: "welcome: a soft warm light about the delegation", svg: wash(nearMiddle[0], nearMiddle[1], 13, 6, WARM, 0.18), keys: showFor(0.3, 0.32, 0.876, 0.884), loop: soft },
      { name: "the voice of the delegation: asking him", svg: arcsLeft(n(near[0] - 3.4), n(near[1] - 2.6), FOLK), keys: showFor(0.39, 0.398, 0.63, 0.638), loop: speaking },
      { name: "a distant place: a soft light along the long road", svg: way("M150 82.4 C128 87.4 98 95 66 103", SOFT_GOLD, 0.7), keys: showAt(0.412, 0.444) },
      { name: "those they left behind: a soft light over the homes far off", svg: wash(145, 76, 13, 5.6, WARM, 0.22), keys: showAt(0.52, 0.55), loop: soft },
      {
        name: "belief, first of all: glints over the delegation",
        svg: glints([
          [n(near[0] + 1), n(near[1] - 4)],
          [n(near[0] + 7), n(near[1] - 4.6)],
          [n(near[0] + 13), n(near[1] - 4)]
        ]),
        keys: showFor(0.64, 0.66, 0.876, 0.884),
        loop: twinkle()
      },
      { name: "the prayer: a spark rising over the delegation", svg: sparkle(n(near[0] + 4), n(near[1] - 6), 1.4, "#FFE7A0"), keys: sparkStays(0.756, 0.784), loop: twinkle(900) },
      { name: "the zakat: a small sack by the delegation", svg: sack(n(near[0] + 17), n(near[1] + 5), 0.6), keys: showFor(0.784, 0.794, 0.876, 0.884) },
      { name: "the fast of Ramadan: a thin new moon", svg: newMoon(112, 26), keys: showAt(0.8, 0.816), loop: soft },
      {
        name: "told to those left behind: glints over the homes far off",
        svg: glints([
          [134, 70.4],
          [146, 70],
          [155, 72.4]
        ]),
        keys: showAt(0.93, 0.95),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Ibn Abbas: a delegation of Abd al-Qays",
      "Came to him. He said: welcome, O people,",
      "Neither will you have disgrace nor regret.",
      "They said: we come from a distant place;",
      "Order us to do good, to tell our people.",
      "He ordered them to believe in Allah alone:",
      "Prayer, zakat, and the fast of Ramadan.",
      "Memorize them, tell those you left behind."
    ])
  };
}

// He stood up without sitting. Abdullah ibn Buhaynah said: the Messenger of Allah ﷺ once led us in a prayer and offered
// two rak'at and got up without sitting. The people also got up with him, and when he was about to finish his prayer,
// we waited for him to finish the prayer with taslim, but he said takbir before taslim and performed two prostrations
// while sitting, and then finished the prayer with taslim (Sahih al-Bukhari 1224). No one is drawn: inside the masjid,
// under its roof of palm fronds on palm trunks. His place is in front and the rows of places behind him; standing, a
// place is a full ring, sitting it is lower and flatter, and prostrating lowest and flattest. A spark of the prayer
// rises, and two more for the two rak'at; his place goes down and stands up again without sitting, and the rows, down
// with him, stand up with him. Near the end all sit, and a soft light comes over the rows: waiting for the taslim. His
// voice says takbir; his place prostrates twice, sitting between, and the rows with him, as two sparks rise; then his
// voice gives the taslim to the right and to the left, and a soft golden ring comes about his place.
function heStoodUpWithoutSitting(): SignArt {
  const foot = 96;
  const his: [number, number] = [132, 101];
  const front: [number, number][] = [18, 28, 38, 48, 58, 68, 78, 88, 98, 108].map((x): [number, number] => [x, 106]);
  const back: [number, number][] = [23, 33, 43, 53, 63, 73, 83, 93, 103, 113].map((x): [number, number] => [x, 112.6]);
  const buhaynah: [number, number] = [118, 112.6];
  // A place standing is a full ring; sitting, it is lower and flatter; prostrating, lowest and flattest.
  const DOWN = 0.32;
  const SIT = 0.62;
  // The rows go down, stand and sit just after him.
  const rowKeys = () =>
    track({
      scaleY: [
        [0.162, 1],
        [0.172, DOWN],
        [0.276, DOWN],
        [0.29, 1],
        [0.41, 1],
        [0.42, SIT],
        [0.8, SIT],
        [0.81, DOWN],
        [0.824, DOWN],
        [0.834, SIT],
        [0.848, SIT],
        [0.858, DOWN],
        [0.872, DOWN],
        [0.882, SIT]
      ]
    });
  return {
    kind: "he-stood-up-without-sitting",
    ms: 12000,
    parts: [
      { name: "the sky over the masjid", svg: `<rect width="160" height="31" fill="#BFE3FA"/>` },
      { name: "clouds", svg: cloud(44, 16, 0.4, "#FFFFFF", 0.9) + cloud(122, 12, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the masjid's wall", svg: `<rect x="0" y="40" width="160" height="${foot - 40}" fill="#E5CFA6"/>` + [52, 64, 76, 88].map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#D6BD92" stroke-width="0.5"/>`).join("") },
      { name: "the floor of the masjid", svg: `<rect x="0" y="${foot}" width="160" height="${120 - foot}" fill="#EAD9B4"/><path d="M0 ${foot} L160 ${foot}" stroke="#C9AE80" stroke-width="0.6"/>` },
      { name: "a palm trunk holding up the roof 1", svg: trunk(10, 40, foot) },
      { name: "a palm trunk holding up the roof 2", svg: trunk(80, 40, foot) },
      { name: "a palm trunk holding up the roof 3", svg: trunk(150, 40, foot) },
      { name: "a roof of palm fronds", svg: fronds(0, 160) },
      {
        name: "his place, in front: down, up without sitting, sitting, and two prostrations",
        svg: ring(his[0], his[1], 2.6, GOLD),
        origin: { x: his[0], y: n(his[1] + 2.6) },
        keys: track({
          scaleY: [
            [0.15, 1],
            [0.16, DOWN],
            [0.19, DOWN],
            [0.2, 1],
            [0.402, 1],
            [0.412, SIT],
            [0.79, SIT],
            [0.8, DOWN],
            [0.814, DOWN],
            [0.824, SIT],
            [0.838, SIT],
            [0.848, DOWN],
            [0.862, DOWN],
            [0.872, SIT]
          ]
        })
      },
      { name: "the places of the front row: with him", svg: places(front, 1.5), origin: { x: 80, y: 107.5 }, keys: rowKeys() },
      { name: "the places of the back row: with him", svg: places(back, 1.5), origin: { x: 80, y: 114.1 }, keys: rowKeys() },
      { name: "Ibn Buhaynah's place, in the back row", svg: someone(buhaynah[0], buhaynah[1], 1.5, ITS_VOICE), origin: { x: 80, y: 114.1 }, keys: rowKeys() },
      { name: "Ibn Buhaynah's voice: telling of it", svg: arcs(n(buhaynah[0] + 3.2), n(buhaynah[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      { name: "the prayer: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.3, "#FFE7A0"), keys: sparkStays(0.034, 0.07), loop: twinkle(900) },
      {
        name: "two rak'at: two sparks rising",
        svg: sparkle(n(his[0] - 4), n(his[1] - 6), 1.1, "#FFE7A0") + sparkle(n(his[0] + 4), n(his[1] - 6), 1.1, "#FFE7A0"),
        keys: sparkStays(0.15, 0.186, 6),
        loop: twinkle(1100)
      },
      { name: "waiting for the taslim: a soft light over the rows", svg: wash(66, 109, 54, 7, WARM, 0.12), keys: showAt(0.53, 0.56), loop: soft },
      { name: "his voice: takbir before the taslim", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3), GOLD), keys: showFor(0.652, 0.66, 0.778, 0.786), loop: speaking },
      {
        name: "two prostrations sitting: two sparks rising",
        svg: sparkle(n(his[0] - 3), n(his[1] - 7), 1.1, "#FFE7A0") + sparkle(n(his[0] + 3), n(his[1] - 7), 1.1, "#FFE7A0"),
        keys: sparkStays(0.8, 0.86, 6),
        loop: twinkle(1100)
      },
      {
        name: "his voice: the taslim, to the right and to the left",
        svg: arcs(n(his[0] + 3.4), n(his[1] - 1.6), GOLD) + arcsLeft(n(his[0] - 3.4), n(his[1] - 1.6), GOLD),
        keys: showAt(0.9, 0.91),
        loop: speaking
      },
      { name: "the prayer finished: a soft golden ring about his place", svg: care(his[0], n(his[1] + 1.2), 5, 2.8, SOFT_GOLD), keys: showAt(0.926, 0.946), loop: soft }
    ],
    words: linesOn(SEVEN_LONG_LAST, [
      "Ibn Buhaynah: he led us in a prayer,",
      "Two rak'at, then got up without sitting.",
      "The people also got up with him.",
      "When he was about to finish his prayer,",
      "We waited for him to finish with taslim,",
      "But he said takbir before taslim,",
      "Two prostrations sitting, then the taslim."
    ])
  };
}

// Like one of his family. Abu Musa al-Ash'ari said: my brother and I came from Yemen, and for some time we continued
// to consider Abdullah ibn Mas'ud as one of the members of the family of the Prophet ﷺ, because we used to see him and
// his mother going in the house of the Prophet ﷺ very often (Sahih al-Bukhari 3763). No one is drawn: his house in
// Madinah, Ibn Mas'ud's home nearby, the road from Yemen, palms and the day. The places of the two from Yemen come
// along the road, and Abu Musa's voice tells of it; the sun goes over: for some time. A soft golden ring comes about
// his house and Ibn Mas'ud's place: as one of his family. Ibn Mas'ud's place goes in at his door, comes out again and
// goes back; then the place of the one who goes with him shows by Ibn Mas'ud's home, and both go in at his door and
// come out again; glints come about the doorway: very often.
function likeOneOfHisFamily(): SignArt {
  const door: [number, number] = [48.2, 99.6];
  const ibn: [number, number] = [100, 104.6];
  const withHim: [number, number] = [104.4, 105.4];
  const nearDoor: [number, number] = [n(door[0] + 1.4), n(door[1] + 0.6)];
  const twoFrom: [number, number] = [150, 105.6];
  const twoAt: [number, number] = [124, 105.6];
  const out: [number, number] = [56, 104.4];
  const outWith: [number, number] = [61, 105.2];
  return {
    kind: "like-one-of-his-family",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      {
        name: "the sun: going over, for some time",
        svg: sun(22, 22),
        keys: track({
          xy: [
            [0.22, 0, 0],
            [0.35, 112, 0]
          ]
        })
      },
      { name: "a cloud", svg: cloud(88, 26, 0.46, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 116], [84, 118], [140, 116]]) },
      ...palms(
        [
          [8, 100, 15],
          [146, 99, 16]
        ],
        "Madinah"
      ),
      { name: "as one of his family: a soft golden ring about his house and Ibn Mas'ud's place", svg: care(76, 102.6, 34, 5.4, SOFT_GOLD), keys: showAt(0.42, 0.444), loop: soft },
      { name: "his house in Madinah", svg: home(50, 99, 32, 22) },
      { name: "Ibn Mas'ud's home, nearby", svg: home(98, 99.6, 18, 13) },
      { name: "the road from Yemen", svg: road(104, 160, 107) },
      {
        name: "the places of the two from Yemen, al-Ash'ari among them",
        svg: someone(twoFrom[0], twoFrom[1], 1.5, ITS_VOICE) + someone(n(twoFrom[0] + 6), n(twoFrom[1] + 1), 1.5, FOLK),
        keys: track({
          xy: [
            [0.024, 0, 0],
            [0.15, ...rel(twoFrom, twoAt)]
          ]
        })
      },
      { name: "al-Ash'ari's voice: telling of it", svg: arcsLeft(n(twoAt[0] - 3.2), n(twoAt[1] - 2.8), ITS_VOICE), keys: showAt(0.152, 0.158), loop: speaking },
      {
        name: "Ibn Mas'ud's place: in at his door, and out again",
        svg: someone(ibn[0], ibn[1], 1.5, ITS_VOICE),
        keys: track({
          opacity: [
            [0.64, 1],
            [0.646, 0],
            [0.664, 0],
            [0.67, 1],
            [0.85, 1],
            [0.856, 0],
            [0.874, 0],
            [0.88, 1]
          ],
          xy: [
            [0.614, 0, 0],
            [0.64, ...rel(ibn, door)],
            [0.67, ...rel(ibn, door)],
            [0.7, 0, 0],
            [0.814, 0, 0],
            [0.85, ...rel(ibn, door)],
            [0.88, ...rel(ibn, door)],
            [0.92, ...rel(ibn, out)]
          ]
        })
      },
      {
        name: "the place of the one who went in with Ibn Mas'ud",
        svg: someone(withHim[0], withHim[1], 1.4, FOLK),
        keys: track({
          opacity: [
            [0.806, 0],
            [0.814, 1],
            [0.85, 1],
            [0.856, 0],
            [0.874, 0],
            [0.88, 1]
          ],
          xy: [
            [0.814, 0, 0],
            [0.85, ...rel(withHim, nearDoor)],
            [0.88, ...rel(withHim, nearDoor)],
            [0.92, ...rel(withHim, outWith)]
          ]
        })
      },
      {
        name: "very often: glints about his doorway",
        svg: glints([
          [44, 92.6],
          [50.6, 92],
          [52.4, 96]
        ]),
        keys: showAt(0.93, 0.95),
        loop: twinkle()
      }
    ],
    words: linesOn(FIVE, [
      "Abu Musa: my brother and I came from Yemen",
      "And for some time we continued to consider",
      "Ibn Mas'ud as one of his family members,",
      "Because we used to see him going in,",
      "And his mother, very often."
    ])
  };
}

// I fear not poverty for you. Amr ibn Awf said: Allah's Messenger ﷺ sent Abu Ubaidah ibn al-Jarrah to Bahrain to
// collect the jizyah; Abu Ubaidah arrived from Bahrain with the money. The Ansar heard of his arrival, which coincided
// with the Fajr prayer led by Allah's Messenger ﷺ. When he finished the prayer, they came to him. He smiled when he saw
// them and said: I think you have heard of the arrival of Abu Ubaidah and that he has brought something. They replied:
// yes, O Messenger of Allah. He said: have the good news, and hope for what will please you. By Allah, I am not afraid
// that you will become poor, but I am afraid that worldly wealth will be given to you in abundance as it was given to
// those before you, and you will start competing with each other for it as they competed for it, and then it will
// divert you as it diverted them (Sahih al-Bukhari 6425; who Amr was, and that he was at Badr, is left out). No one is
// drawn: Madinah at dawn, the masjid on the left, homes of the Ansar, a palm, the road from the east. Abu Ubaidah's
// place comes with two camels bearing sacks; the places of the Ansar come from their homes to the masjid; a spark of
// the prayer rises, and the light of dawn comes. They come to his place, and a soft warm light comes about it: he
// smiled. His voice speaks; glints come over them, and a soft golden ring: not poverty. Then coins spread out wide over
// the land: the world given in abundance; glints race over them, and a grey shade comes over them: what diverts.
function iFearNotPoverty(): SignArt {
  const his: [number, number] = [30, 104];
  const ansar: [number, number][] = [
    [0, 0],
    [6, 0],
    [12, 0],
    [18, 0],
    [3, 4.4],
    [9, 4.4],
    [15, 4.4]
  ];
  const fromHomes: [number, number] = [64, 102];
  const inRows: [number, number] = [8, 108];
  const toHim: [number, number] = [38, 104];
  const ansarHere = ansar.map(([dx, dy]): [number, number] => [n(fromHomes[0] + dx), n(fromHomes[1] + dy)]);
  const middle: [number, number] = [n(toHim[0] + 9), n(toHim[1] + 2.2)];
  const coinsAt: [number, number][] = [
    [70, 112],
    [78, 115.6],
    [86, 111.4],
    [94, 116],
    [102, 112.6],
    [110, 116.4],
    [118, 111.6],
    [126, 115.4],
    [134, 112],
    [142, 116],
    [150, 112.6],
    [82, 118.4],
    [114, 118.6],
    [138, 118.4]
  ];
  return {
    kind: "i-fear-not-poverty",
    ms: 12000,
    parts: [
      { name: "the sky at dawn", svg: sky("#9DB7D6", "#E7D5C4", 62) },
      { name: "the light of Fajr over the land", svg: wash(96, 62, 90, 20, "#FFE0B0", 0.4), keys: showAt(0.28, 0.33) },
      { name: "a cloud", svg: cloud(110, 24, 0.44, "#F4EEF2", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[16, 116], [60, 118], [150, 119]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 100, 1) },
      { name: "homes of the Ansar", svg: home(72, 98, 14, 10) + home(90, 97, 12, 9) },
      ...palms([[150, 98, 15]], "Madinah"),
      { name: "the road from the east", svg: road(96, 160, 106) },
      { name: "his place, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "two camels bearing sacks from Bahrain",
        svg: camel(108, 106, 0.16, true) + camel(124, 106, 0.16, true) + sack(108, 94.6, 0.6) + sack(124, 94.6, 0.6),
        keys: track({
          xy: [
            [0.024, 32, 0],
            [0.086, 0, 0]
          ]
        })
      },
      {
        name: "Abu Ubaidah's place, come from Bahrain",
        svg: someone(116, 110.6, 1.5, ITS_VOICE),
        keys: track({
          xy: [
            [0.024, 32, 0],
            [0.086, 0, 0]
          ]
        })
      },
      {
        name: "the places of the Ansar: from their homes to the prayer, and to him",
        svg: places(ansarHere, 1.5),
        keys: track({
          xy: [
            [0.146, 0, 0],
            [0.2, ...rel(fromHomes, inRows)],
            [0.39, ...rel(fromHomes, inRows)],
            [0.42, ...rel(fromHomes, toHim)]
          ]
        })
      },
      { name: "the Fajr prayer: a spark rising over the masjid", svg: sparkle(30, 96, 1.4, "#FFE7A0"), keys: sparkStays(0.27, 0.31), loop: twinkle(900) },
      { name: "he smiled: a soft warm light about his place", svg: wash(his[0], his[1], 7, 4.4, WARM, 0.26), keys: showAt(0.43, 0.45), loop: soft },
      { name: "his voice: good news", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.51, 0.518), loop: speaking },
      {
        name: "hope for what will please you: glints over the Ansar",
        svg: glints([
          [n(middle[0] - 7), n(middle[1] - 6)],
          [middle[0], n(middle[1] - 7)],
          [n(middle[0] + 7), n(middle[1] - 6)]
        ]),
        keys: showAt(0.53, 0.55),
        loop: twinkle()
      },
      { name: "not poverty: a soft golden ring about the Ansar", svg: care(middle[0], middle[1], 13, 4.6, SOFT_GOLD), keys: showAt(0.64, 0.66), loop: soft },
      {
        name: "the world given in abundance: coins spread out wide over the land",
        svg: coinsAt.map(([x, y]) => goldCoin(x, y, 1.3)).join(""),
        origin: { x: 110, y: 115 },
        keys: track({
          opacity: [
            [0.756, 0],
            [0.766, 1]
          ],
          scaleX: [
            [0.756, 0.2],
            [0.81, 1]
          ]
        })
      },
      {
        name: "competing for it: glints racing over the coins",
        svg: glints([
          [76, 109.6],
          [98, 110],
          [120, 109.4],
          [142, 110]
        ]),
        keys: showAt(0.88, 0.89),
        loop: twinkle(500)
      },
      { name: "what diverts: a grey shade over the coins", svg: wash(110, 115, 46, 6, "#6E6E6E", 0.2), keys: showAt(0.92, 0.95) }
    ],
    words: linesOn(EIGHT, [
      "Amr ibn Awf: Abu Ubaidah brought money",
      "From Bahrain; the Ansar heard, and came",
      "To the Fajr prayer. When he finished,",
      "They came; he smiled when he saw them.",
      "Good news! Hope for what will please you.",
      "By Allah, I fear not poverty for you,",
      "But I fear wealth given you in abundance;",
      "You compete for it, and it diverts you."
    ])
  };
}

// From its higher side. Aishah said: when the Prophet ﷺ came to Makkah, he entered from its higher side and left from
// its lower side (Sahih al-Bukhari 1577). No one is drawn: the valley of Makkah between its hills, the Ka'bah and the
// homes about it, the road down from the high pass on its higher side, and the road out across its low ground. Aishah's
// voice tells of it. His place shows at the high pass and comes down the road into Makkah, with a golden way behind it,
// and a soft golden ring comes about the Ka'bah; then it goes out along the road across the low ground, with a golden
// way behind it.
function fromItsHigherSide(): SignArt {
  const pass: [number, number] = [32, 75.6];
  const down1: [number, number] = [40, 83];
  const down2: [number, number] = [51, 92];
  const atKabah: [number, number] = [64, 101.4];
  const low1: [number, number] = [96, 105];
  const low2: [number, number] = [124, 108.6];
  const lowEnd: [number, number] = [150, 111.8];
  return {
    kind: "from-its-higher-side",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(136, 16) },
      { name: "a cloud", svg: cloud(84, 20, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [14, 44, 22],
            [50, 34, 20],
            [112, 26, 22],
            [148, 32, 22]
          ],
          84,
          "#B89B70",
          false
        )
      },
      { name: "the valley of Makkah", svg: `<path d="M0 84 L160 84 L160 120 L0 120 Z" fill="#E2CB9C"/>` },
      { name: "its higher side: the ground rising to the high pass", svg: `<path d="M0 84 L22 76 Q32 73 42 76 Q60 86 74 100 L0 104 Z" fill="#D2B686"/>` },
      { name: "its low ground, to the right", svg: `<path d="M84 104 Q118 106 160 112 L160 120 L84 120 Z" fill="#EBDAB2"/>` },
      { name: "the road down from the high pass", svg: `<path d="M30 75.6 C38 82 48 90 64 101" stroke="#F1E1B6" stroke-width="2.8" fill="none" stroke-linecap="round"/>` },
      { name: "the road out across the low ground", svg: `<path d="M84 103.6 C104 106 128 109.4 158 113" stroke="#F1E1B6" stroke-width="2.8" fill="none" stroke-linecap="round"/>` },
      { name: "homes of Makkah", svg: home(52, 103, 12, 8) + home(98, 101.4, 12, 8) + home(114, 103.6, 10, 7) + home(132, 104.6, 9, 6.4) },
      { name: "the Ka'bah", svg: kabah(70, 101.4, 9) },
      { name: "Aishah's voice: telling of it", svg: arcsLeft(146, 97, ITS_VOICE), keys: showFor(0.022, 0.03, 0.27, 0.278), loop: speaking },
      {
        name: "his place: down from the higher side into Makkah, and out by the lower side",
        svg: ring(pass[0], pass[1], 2.2, GOLD),
        keys: track({
          opacity: [
            [0.338, 0],
            [0.348, 1]
          ],
          xy: [
            [0.35, 0, 0],
            [0.43, ...rel(pass, down1)],
            [0.51, ...rel(pass, down2)],
            [0.59, ...rel(pass, atKabah)],
            [0.68, ...rel(pass, atKabah)],
            [0.76, ...rel(pass, low1)],
            [0.84, ...rel(pass, low2)],
            [0.92, ...rel(pass, lowEnd)]
          ]
        })
      },
      { name: "entered from its higher side: a golden way down from the high pass", svg: way("M32 76.6 C40 83 49 90.6 62 100", SOFT_GOLD, 0.7), keys: showAt(0.37, 0.46) },
      { name: "at the Ka'bah: a soft golden ring", svg: care(74.5, 101.6, 9, 2.6, SOFT_GOLD), keys: showAt(0.592, 0.612), loop: soft },
      { name: "left from its lower side: a golden way out across the low ground", svg: way("M84 104.6 C104 107 128 110.4 150 113", SOFT_GOLD, 0.7), keys: showAt(0.7, 0.8) }
    ],
    words: linesOn(THREE, ["Aishah said: when he came to Makkah,", "He entered from its higher side,", "And left from its lower side."])
  };
}

export const SMILE_ART = {
  "always-a-smile": alwaysASmile,
  "woven-with-her-own-hands": wovenWithHerOwnHands,
  "tell-those-you-left-behind": tellThoseYouLeftBehind,
  "he-stood-up-without-sitting": heStoodUpWithoutSitting,
  "like-one-of-his-family": likeOneOfHisFamily,
  "i-fear-not-poverty": iFearNotPoverty,
  "from-its-higher-side": fromItsHigherSide
} as const;

