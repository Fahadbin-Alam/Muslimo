import { animalAt, cloud, glow, n, palm, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { crescent, home } from "./trialArt";
import { kabah } from "./historyArt";
import { GOLD, hills, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, sparkRising, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { food } from "./hopeArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { quickSparks } from "./toldArt";

/**
 * Joys and the ways of the good: the people of the ship, who have two hijrahs, and their joy at hearing it; Khabbab in
 * the shade of the Ka'bah, and the promise that a rider would go from San'a to Hadramawt fearing none but Allah; the
 * caller in the open country with his sheep, whose voice everything that hears will testify for; feeding the hungry,
 * visiting the sick and setting free the captive; perfume, never refused, from him to Anas to Thumamah to Azra; the
 * measure, the sa' and the mudd of Madinah, blessed; and Malik ibn al-Huwayrith's twenty nights, and the way home to
 * teach. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person
 * is ever drawn, not even a hand, a foot or a face, and no one is drawn on a camel: where someone was, a ring or a small
 * dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for
 * Allah, and nothing comes down from the sky: a du'a, a testimony or a prayer is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** Something drawn smaller or larger: `k` times its size about (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of dry grass. */
const joyLand = (tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts);

/** Night over the whole scene, laid on what is under it. */
const NIGHT = `<rect width="160" height="120" fill="#0F1C3A" opacity="0.52"/>`;

/** Stars in the night sky. */
const NIGHT_STARS = stars([
  [12, 14],
  [30, 46],
  [58, 10],
  [86, 46],
  [104, 10],
  [138, 46],
  [150, 14],
  [146, 30]
]);

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A wolf of the picture cards, `s` times its size, with its feet at (x, y). */
const wolf = (x: number, y: number, s: number, left = false) => animalAt("wolf", n(x - 50 * s), n(y - 73.4 * s), s, left);

/** A small home far off, its foot's middle at (x, y). */
const farHome = (x: number, y: number) =>
  `<rect x="${n(x - 2.6)}" y="${n(y - 3.4)}" width="5.2" height="3.4" fill="#A88B66"/><rect x="${n(x - 3)}" y="${n(y - 3.9)}" width="6" height="0.6" fill="#8E7454"/><rect x="${n(x - 0.6)}" y="${n(y - 1.8)}" width="1.1" height="1.8" fill="#5E4630"/>`;

/** A ship with one mast and its sails, the middle of its deck at (x, y), `k` times the size of the boat of hopeArt.ts. */
const ship = (x: number, y: number, k: number) =>
  big(
    `<path d="M${n(x - 18)} ${y} L${n(x + 18)} ${y} L${n(x + 13)} ${n(y + 7)} L${n(x - 13.6)} ${n(y + 7)} Z" fill="#8A5530"/>` +
      `<path d="M${n(x - 17)} ${n(y + 2.4)} L${n(x + 17)} ${n(y + 2.4)} M${n(x - 15.4)} ${n(y + 4.8)} L${n(x + 15)} ${n(y + 4.8)}" stroke="#A86C3C" stroke-width="0.7"/>` +
      `<path d="M${x} ${y} L${x} ${n(y - 26)}" stroke="#6B4226" stroke-width="1.2"/>` +
      `<path d="M${n(x + 1)} ${n(y - 24)} Q${n(x + 14)} ${n(y - 14)} ${n(x + 1)} ${n(y - 3)} Z" fill="#FFFDF5"/><path d="M${n(x - 1)} ${n(y - 22)} Q${n(x - 10)} ${n(y - 13)} ${n(x - 1)} ${n(y - 4)} Z" fill="#F4ECDA"/>`,
    x,
    y,
    k
  );

/** A short white wave crest at (x, y). */
const crest = (x: number, y: number) => `<path d="M${x} ${y} q1.6 -1.1 3.2 0" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.75" stroke-linecap="round"/>`;

/** Places of a group, each a small dashed circle. */
const placesAt = (list: [number, number][], r = 1.4) => list.map(([x, y]) => someone(x, y, r)).join("");

/** A group of places coming from `dx`, `dy` away to where they are drawn, from `from` to `to`, showing as they start. */
const comingIn = (dx: number, dy: number, from: number, to: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.01), 1]
    ],
    xy: [
      [from, dx, dy],
      [to, 0, 0]
    ]
  });

// Two hijrahs. Abu Musa said: we heard that the Prophet ﷺ had gone out, while we were in Yemen; we set out to him by
// ship, and the ship cast us ashore in Abyssinia, where we met Ja'far, and stayed with him until we came together.
// Asma bint Umays, who had come with them, went in to Hafsah, and Umar came in and said: we went on hijrah before you,
// so we have more right to the Messenger of Allah ﷺ than you. When the Prophet ﷺ came, she said: O Prophet of Allah,
// Umar said such and such. He said: what did you say to him? She said: I said such and such. He said: he has no more
// right to me than you; he and his companions have one hijrah, and you, the people of the ship, have two hijrahs. She
// said: I saw Abu Musa and the people of the ship coming to me in groups, asking me about this hadith; nothing in this
// world made them happier or meant more to them than what the Prophet ﷺ said to them (Sahih al-Bukhari 4230, 4231).
// No one is drawn: Madinah, with its masjid, and far off the hills of Makkah; far off over the sea, the land of
// Abyssinia, and a ship on the sea. His place, a golden ring, comes to the home where Asma's place is; her voice
// speaks, then his. A soft golden ring comes about Umar's place and about Asma's: equal. Two places show with Umar's.
// A faint golden way goes from far Makkah to Madinah, and a glint shows over Umar's place: one; a faint golden way goes
// from Makkah over the sea to Abyssinia, and another back over the sea to Madinah, the ship sailing along it, and two
// glints show over Asma's place: two. Then the places of the ship's folk come to Asma's place, group after group, their
// voices asking, and glints and a soft golden glow come over them.
function twoHijrahs(): SignArt {
  const his0: [number, number] = [28, 99.4];
  const his: [number, number] = [64, 101];
  const asma: [number, number] = [79.4, 101.6];
  const umar: [number, number] = [40, 104.6];
  const withUmar: [number, number][] = [
    [34.2, 106],
    [45.8, 106]
  ];
  const first: [number, number][] = [
    [96, 103.4],
    [101.4, 105],
    [106.8, 103.4]
  ];
  const second: [number, number][] = [
    [112.2, 105],
    [117.6, 103.4],
    [123, 105]
  ];
  const twoWays = (from: number, to: number) => showFor(from, to, 0.645, 0.66);
  return {
    kind: "two-hijrahs",
    ms: 12000,
    parts: [
      ...daySky(140, 52, 12000),
      { name: "the hills of Makkah, far off", svg: `<path d="M0 61.4 L0 57.4 Q8 52.4 18 55.4 Q28 50.6 38 55.8 Q46 53.4 54 57.6 L58 61.4 Z" fill="#C9B38C"/>` },
      { name: "Abyssinia, far over the sea", svg: `<path d="M108 61.4 Q116 58.4 126 59.2 Q138 56.4 148 58.2 Q155 57.4 160 58.4 L160 61.4 Z" fill="#B9A27A"/>` },
      { name: "the land", svg: joyLand([[14, 110], [52, 113], [86, 111], [140, 112]]) },
      {
        name: "the sea",
        svg: `<path d="M64 61 L160 61 L160 79.6 C140 80.6 116 78.6 98 73.6 C86 70.2 74 65.4 64 61 Z" fill="#5AA6D4"/><path d="M64 61 C74 65.4 86 70.2 98 73.6 C116 78.6 140 80.6 160 79.6" stroke="#F4ECDA" stroke-width="0.9" fill="none"/>`
      },
      { name: "the waves", svg: crest(88, 65.6) + crest(104, 64.4) + crest(120, 67.6) + crest(138, 65.4) + crest(150, 72) + crest(112, 72.4) + crest(130, 75.2), loop: { move: "bob", ms: 4200, x: 1.2 } },
      {
        name: "the ship, far off on the sea",
        svg: ship(128, 67.4, 0.3),
        origin: { x: 128, y: 67.4 },
        keys: track({
          xy: [
            [0.556, 0, 0],
            [0.582, -20, 7]
          ]
        }),
        loop: { move: "bob", ms: 3600, y: 0.4, rotate: 1.2 }
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.46) },
      { name: "the home where Asma was", svg: home(86, 96, 18, 12) },
      { name: "the way to the home", svg: way("M26 100.4 C40 101 54 101.6 74 101.6", "#F4E3BC", 0.8) },
      { name: "one hijrah: a faint golden way from far Makkah to Madinah", svg: way("M24 59.4 C24 68 18 76 13 83.4", SOFT_GOLD, 0.7), keys: twoWays(0.52, 0.53) },
      { name: "two hijrahs: a faint golden way from far Makkah over the sea to Abyssinia", svg: way("M30 59.6 C56 63 96 63.6 128 60.4", SOFT_GOLD, 0.7), keys: twoWays(0.54, 0.552) },
      { name: "two hijrahs: a faint golden way from Abyssinia over the sea to Madinah", svg: way("M132 62.2 C120 70.6 96 76 70 80.6 C50 84 34 86.6 25 88.6", SOFT_GOLD, 0.7), keys: twoWays(0.556, 0.568) },
      {
        name: "his place, a golden ring",
        svg: ring(his0[0], his0[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.025, 0, 0],
            [0.075, n(his[0] - his0[0]), n(his[1] - his0[1])]
          ]
        })
      },
      { name: "Asma's place", svg: someone(asma[0], asma[1], 1.6) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6) },
      { name: "with Umar: two small places", svg: placesAt(withUmar, 1.3), keys: showAt(0.4, 0.42) },
      { name: "Asma's voice: what Umar said", svg: arcsLeft(n(asma[0] - 2.2), n(asma[1] - 3.8), VOICE), keys: showFor(0.07, 0.08, 0.146, 0.154), loop: speaking },
      { name: "his voice: what did you say to him?", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.155, 0.165, 0.2, 0.21), loop: speaking },
      { name: "his voice: no more right to me than you", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.272, 0.282, 0.575, 0.585), loop: speaking },
      { name: "equal: a soft golden ring about Umar's place", svg: care(umar[0], n(umar[1] + 0.5), 3.2, 1.6, SOFT_GOLD), keys: showFor(0.29, 0.31, 0.645, 0.66), loop: soft },
      { name: "equal: a soft golden ring about Asma's place", svg: care(asma[0], n(asma[1] + 0.5), 3.2, 1.6, SOFT_GOLD), keys: showFor(0.29, 0.31, 0.645, 0.66), loop: soft },
      { name: "one: a golden glint over Umar's place", svg: sparkle(umar[0], n(umar[1] - 4.6), 1.2, "#FFD86B"), keys: twoWays(0.528, 0.536), loop: speaking },
      { name: "two: two golden glints over Asma's place", svg: sparkle(n(asma[0] - 1.9), n(asma[1] - 4.6), 1.2, "#FFD86B") + sparkle(n(asma[0] + 1.9), n(asma[1] - 4.6), 1.2, "#FFD86B"), keys: twoWays(0.568, 0.578), loop: speaking },
      { name: "the ship's folk: a first group", svg: placesAt(first), keys: comingIn(44, 0, 0.65, 0.705) },
      { name: "the ship's folk: a second group", svg: placesAt(second), keys: comingIn(40, 0, 0.765, 0.81) },
      { name: "the first group's voices: asking", svg: arcsLeft(n(first[0][0] - 2), n(first[0][1] - 3.6), VOICE), keys: showFor(0.775, 0.785, 0.888, 0.898), loop: speaking },
      { name: "the second group's voices: asking", svg: arcsLeft(n(second[0][0] - 2), n(second[0][1] - 3.6), VOICE), keys: showFor(0.815, 0.825, 0.888, 0.898), loop: speaking },
      { name: "Asma's voice: telling them", svg: arcs(n(asma[0] + 2.2), n(asma[1] - 3.8), VOICE), keys: showAt(0.9, 0.91), loop: speaking },
      {
        name: "happier than anything: glints over the ship's folk",
        svg: [...first, ...second].map(([x, y], i) => sparkle(x, n(y - 4.4), i % 2 ? 0.8 : 1, "#FFE7A0")).join(""),
        keys: showAt(0.89, 0.905),
        loop: speaking
      },
      { name: "happier than anything: a soft golden glow over them", svg: wash(110, 103, 22, 5, WARM, 0.12), keys: showAt(0.895, 0.93) }
    ],
    words: [
      { text: "When he came, Asma told him what Umar said", from: 0.02, to: 0.129 },
      { text: "He said: what did you say to him?", from: 0.144, to: 0.253 },
      { text: "He said: Umar has no more right to me", from: 0.268, to: 0.377 },
      { text: "than you; Umar and his companions have", from: 0.392, to: 0.501 },
      { text: "one hijrah, and you of the ship have two", from: 0.516, to: 0.625 },
      { text: "Asma said: Abu Musa and the ship's people", from: 0.64, to: 0.749 },
      { text: "came to me in groups, asking about it", from: 0.764, to: 0.873 },
      { text: "nothing in this world made them happier", from: 0.888, to: 1 }
    ]
  };
}

/** A post of wood, its foot at (x, y). */
const post = (x: number, y: number, h = 7) => `<rect x="${n(x - 0.6)}" y="${n(y - h)}" width="1.2" height="${h}" fill="#7A5230"/><rect x="${n(x - 0.9)}" y="${n(y - h - 0.5)}" width="1.8" height="0.6" fill="#5E3C1E"/>`;

// From San'a to Hadramawt. Khabbab said: I came to the Prophet ﷺ while he was resting his head on his cloak in the
// shade of the Ka'bah, and we had met hardship from the idolaters. I said: will you not pray to Allah? He sat up, his
// face red, and said: among those before you, one would be combed with iron combs, and that would not turn him from his
// religion... And Allah will complete this matter, until a rider goes from San'a to Hadramawt fearing none but Allah.
// Bayan added: and the wolf for his sheep (Sahih al-Bukhari 3852). No one is drawn: the Ka'bah, and his place, a golden
// ring, by it; its shade grows over his place. Khabbab's place comes, and a grey ring of hardship comes about it; his
// voice asks. His voice answers, a soft golden glow comes over Makkah, and a faint golden way goes from Makkah to
// San'a, far off. From San'a a camel, with no one on it, sets out, the walker's place by it and two sheep after it,
// and goes along the road to Hadramawt, a soft golden ring about the walker's place: safe. Far off on the land a wolf
// shows, with a grey ring about it.
function sanaToHadramawt(): SignArt {
  const his: [number, number] = [49, 99.4];
  const khabbab0: [number, number] = [84, 104.6];
  const khabbab: [number, number] = [57.4, 101.8];
  const walker: [number, number] = [110.4, 86.4];
  const goes = track({
    opacity: [
      [0.645, 0],
      [0.655, 1]
    ],
    xy: [
      [0.655, 0, 0],
      [0.705, 12, 2.4],
      [0.765, 12, 2.4],
      [0.825, 25.6, 2]
    ]
  });
  return {
    kind: "sana-to-hadramawt",
    ms: 12000,
    parts: [
      ...daySky(16, 96, 12000),
      { name: "the hills of Makkah", svg: `<path d="M0 61.4 L0 50 Q10 42 22 48 Q32 40.6 44 47.6 Q54 44 62 52 L66 61.4 Z" fill="#B89F78"/>` },
      { name: "the far land of Yemen", svg: `<path d="M84 61.4 Q100 56.8 116 58.6 Q132 55.4 146 57.8 Q154 57 160 58 L160 61.4 Z" fill="#CDB892"/>` },
      { name: "the land", svg: joyLand([[14, 112], [70, 112], [118, 108], [150, 104]]) },
      { name: "San'a, far off", svg: home(94, 84.6, 7, 5) + home(102.4, 83.8, 8, 5.6) },
      { name: "Hadramawt, far off", svg: home(146.6, 88.8, 8, 5.6) + home(154.8, 88, 7, 5) },
      { name: "the road from San'a to Hadramawt", svg: way("M106 86.6 C118 89.6 130 90.6 142 89.2", "#F4E3BC", 0.7) },
      { name: "completed: a soft golden glow over Makkah", svg: glow(30, 86, 18, WARM, 0.1), keys: showAt(0.54, 0.57) },
      { name: "the Ka'bah", svg: kabah(20, 97, 15) },
      {
        name: "the shade of the Ka'bah",
        svg: `<path d="M35 97 L39.5 94.3 L60 97.8 L57 103.4 Z" fill="#3A2A18" opacity="0.18"/>`,
        origin: { x: 35, y: 97 },
        keys: track({
          scaleX: [
            [0.15, 0.3],
            [0.2, 1]
          ]
        })
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Khabbab's place", svg: someone(khabbab0[0], khabbab0[1], 1.6), keys: track({ xy: [[0.025, 0, 0], [0.075, n(khabbab[0] - khabbab0[0]), n(khabbab[1] - khabbab0[1])]] }) },
      { name: "hardship: a grey ring about Khabbab's place", svg: greyRing(khabbab[0], n(khabbab[1] + 0.5), 3.4, 1.7), keys: showAt(0.275, 0.295) },
      { name: "Khabbab's voice: asking for a du'a", svg: arcsLeft(n(khabbab[0] - 2.2), n(khabbab[1] - 3.8), VOICE), keys: showFor(0.395, 0.405, 0.52, 0.53), loop: speaking },
      { name: "his voice: this matter will be completed", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.525, 0.535, 0.89, 0.9), loop: speaking },
      { name: "a faint golden way from Makkah to San'a, far off", svg: lookLine(62, 97, 94, 86.4, 82, SOFT_GOLD), keys: showAt(0.555, 0.575) },
      { name: "a camel going to Hadramawt, with no one on it", svg: camel(n(walker[0] - 5.4), walker[1], 0.1), keys: goes },
      { name: "the walker's place by the camel", svg: someone(walker[0], n(walker[1] + 0.4), 1.3), keys: goes },
      { name: "the walker's two sheep", svg: sheep(n(walker[0] - 14.4), n(walker[1] + 0.2), 0.06) + sheep(n(walker[0] - 20.6), n(walker[1] - 0.2), 0.06), keys: goes },
      {
        name: "safe: a soft golden ring about the walker's place",
        svg: care(walker[0], n(walker[1] + 0.8), 2.8, 1.4, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.77, 0],
            [0.79, 1]
          ],
          xy: [
            [0.655, 0, 0],
            [0.705, 12, 2.4],
            [0.765, 12, 2.4],
            [0.825, 25.6, 2]
          ]
        }),
        loop: soft
      },
      { name: "a wolf, off on the land", svg: wolf(130, 80.6, 0.075, true), keys: showAt(0.89, 0.905) },
      { name: "the only fear: a grey ring about the wolf", svg: greyRing(130, 80.4, 5.2, 2.2), keys: showAt(0.905, 0.925) }
    ],
    words: [
      { text: "Khabbab said: I came to him", from: 0.02, to: 0.129 },
      { text: "he was in the shade of the Ka'bah", from: 0.144, to: 0.253 },
      { text: "we had met hardship from the idolaters", from: 0.268, to: 0.377 },
      { text: "I said: will you not pray to Allah?", from: 0.392, to: 0.501 },
      { text: "He said: Allah will complete this matter", from: 0.516, to: 0.625 },
      { text: "until a rider goes from San'a to Hadramawt", from: 0.64, to: 0.749 },
      { text: "fearing none but Allah", from: 0.764, to: 0.873 },
      { text: "Bayan added: and the wolf for his sheep", from: 0.888, to: 1 }
    ]
  };
}

/** A rock of the open country, its foot's middle at (x, y), `w` across. */
const rock = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${n(x - w * 0.46)} ${n(y - w * 0.42)} ${n(x - w * 0.12)} ${n(y - w * 0.5)} Q${n(x + w * 0.3)} ${n(y - w * 0.56)} ${n(x + w / 2)} ${y} Z" fill="#A89478"/>` +
  `<path d="M${n(x - w * 0.1)} ${n(y - w * 0.46)} Q${n(x + w * 0.18)} ${n(y - w * 0.3)} ${n(x + w * 0.12)} ${y}" stroke="#8E7B62" stroke-width="0.4" fill="none"/>`;

/** A lone acacia, its trunk's foot at (x, y), `h` high: a thin trunk, two boughs and a wide flat crown. */
const acacia = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${n(x + 0.4)} ${n(y - h * 0.62)} M${n(x + 0.3)} ${n(y - h * 0.5)} L${n(x - h * 0.22)} ${n(y - h * 0.78)} M${n(x + 0.4)} ${n(y - h * 0.6)} L${n(x + h * 0.26)} ${n(y - h * 0.8)}" stroke="#6E4E30" stroke-width="${n(h * 0.06)}" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y - h * 0.84)}" rx="${n(h * 0.62)}" ry="${n(h * 0.16)}" fill="#7E9A4A"/><ellipse cx="${n(x - h * 0.1)}" cy="${n(y - h * 0.9)}" rx="${n(h * 0.42)}" ry="${n(h * 0.1)}" fill="#93AE5C"/>`;

/** A wide dashed ring about (x, y), `rx` across: how far a voice reaches. */
const reachRing = (x: number, y: number, rx: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${n(rx * 0.42)}" stroke="#E8C25A" stroke-width="0.6" stroke-dasharray="1.6 1.4" fill="none" opacity="0.9"/>`;

/** A ring of a voice's reach spreading from (x, y) to `rx` across, from `from` to `to`, and fading from `fade`. */
const spreading = (name: string, x: number, y: number, rx: number, from: number, to: number, fade: number, gone: number): SignPart => ({
  name,
  svg: reachRing(x, y, rx),
  origin: { x, y },
  keys: track({
    opacity: [
      [from, 0],
      [at3(from + 0.006), 1],
      [fade, 1],
      [gone, 0]
    ],
    scale: [
      [from, 0.25],
      [to, 1]
    ]
  })
});

// Heard by all. Abdullah ibn Abd ar-Rahman ibn Abi Sa'sa'ah said that his father told him that Abu Sa'id al-Khudri said
// to him: I see you love sheep and the open country. So when you are with your sheep, or in your open country, and you
// call the adhan for the prayer, raise your voice in the call; for none hears the reach of the caller's voice, jinn,
// human or thing, but will testify for him on the Day of Resurrection. Abu Sa'id said: I heard it from the Messenger of
// Allah ﷺ (Sahih al-Bukhari 609). No one is drawn: by the masjid of Madinah, Abu Sa'id's place and the listener's
// place; Abu Sa'id's voice speaks. Sheep come in to graze in the open country, among rocks and a lone acacia, and a
// soft golden light lies over it. The listener's place goes out among the sheep, and its voice is raised: the adhan.
// Rings of its reach spread out over the open country; glints show on the rocks, the acacia, the sheep and a
// traveller's place far off, and sparks rise from them. A soft golden ring and glow come about the caller's place. Abu
// Sa'id's voice speaks again, and his place, a faint golden ring, shows by the masjid, with a faint golden line from it
// to Abu Sa'id's place.
function heardByAll(): SignArt {
  const abuSaid: [number, number] = [24, 99.4];
  const from: [number, number] = [33, 101];
  const caller: [number, number] = [96, 99.6];
  const his: [number, number] = [12, 97.6];
  const flock: [number, number][] = [
    [84.6, 104.4],
    [95.8, 105.4],
    [106.6, 103.6],
    [117.4, 105]
  ];
  const traveller: [number, number] = [148, 86.4];
  return {
    kind: "heard-by-all",
    ms: 12000,
    parts: [
      ...daySky(128, 62, 12000),
      { name: "hills", svg: hills() },
      { name: "the open country", svg: joyLand([[60, 112], [92, 110], [132, 111], [150, 100]]) },
      { name: "rocks of the open country", svg: rock(70, 100.6, 6) + rock(129, 104.8, 7) + rock(139.6, 93.4, 5) + rock(78, 89.6, 4) },
      { name: "a lone acacia", svg: acacia(112, 92.4, 15), origin: { x: 112, y: 92.4 }, loop: { move: "sway", ms: 6200, angle: 0.8 } },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 92, 0.4) },
      { name: "a traveller's place, far off", svg: someone(traveller[0], traveller[1], 1.1), keys: track({ opacity: [[0, 0.7]] }) },
      {
        name: "the sheep, coming in to graze",
        svg: flock.map(([x, y], i) => sheep(x, y, 0.075, i % 2 === 1)).join(""),
        keys: comingIn(30, 0, 0.03, 0.085),
        loop: { move: "bob", ms: 2600, y: 0.3 }
      },
      { name: "loved: a soft golden light over the open country", svg: wash(108, 94, 46, 10, WARM, 0.07), keys: showFor(0.15, 0.18, 0.395, 0.41) },
      { name: "loved: a faint line from the listener's place to the open country", svg: lookLine(n(from[0] + 1.6), n(from[1] - 1.6), 74, 96, 90, SOFT_GOLD), keys: showFor(0.15, 0.165, 0.272, 0.282) },
      { name: "Abu Sa'id's place", svg: someone(abuSaid[0], abuSaid[1], 1.6) },
      { name: "the listener's place", svg: someone(from[0], from[1], 1.6), keys: track({ xy: [[0.272, 0, 0], [0.33, n(caller[0] - from[0]), n(caller[1] - from[1])]] }) },
      { name: "Abu Sa'id's voice: I see you love sheep", svg: arcs(n(abuSaid[0] + 2.2), n(abuSaid[1] - 3.8), VOICE), keys: showFor(0.025, 0.035, 0.765, 0.775), loop: speaking },
      {
        name: "the caller's voice, raised: the adhan",
        svg: big(arcs(n(caller[0] + 2.2), n(caller[1] - 3.8), VOICE) + arcsLeft(n(caller[0] - 2.2), n(caller[1] - 3.8), VOICE), caller[0], n(caller[1] - 3.8), 1.4),
        keys: showFor(0.395, 0.405, 0.765, 0.775),
        loop: speaking
      },
      spreading("the reach of the caller's voice: a ring spreading 1", caller[0], n(caller[1] - 2), 14, 0.52, 0.545, 0.765, 0.78),
      spreading("the reach of the caller's voice: a ring spreading 2", caller[0], n(caller[1] - 2), 30, 0.53, 0.56, 0.765, 0.78),
      spreading("the reach of the caller's voice: a ring spreading 3", caller[0], n(caller[1] - 2), 50, 0.54, 0.578, 0.765, 0.78),
      {
        name: "every thing that hears: glints on the rocks, the acacia, the sheep and the traveller's place",
        svg:
          sparkle(70, 95, 0.9, "#FFE7A0") +
          sparkle(129, 98.4, 0.9, "#FFE7A0") +
          sparkle(139.6, 89, 0.8, "#FFE7A0") +
          sparkle(112, 76.4, 1, "#FFE7A0") +
          sparkle(84.6, 97.6, 0.8, "#FFE7A0") +
          sparkle(106.6, 96.8, 0.8, "#FFE7A0") +
          sparkle(traveller[0], n(traveller[1] - 3.4), 0.8, "#FFE7A0"),
        keys: showFor(0.645, 0.66, 0.765, 0.78),
        loop: speaking
      },
      ...quickSparks(
        "testifying: a spark",
        [
          [70, 94],
          [112, 75],
          [106.6, 96],
          [129, 97.6],
          [traveller[0], n(traveller[1] - 4.4)]
        ],
        0.655,
        0.005
      ),
      { name: "for him: a soft golden glow about the caller's place", svg: glow(caller[0], n(caller[1] - 2.4), 8, WARM, 0.2), keys: showAt(0.775, 0.81) },
      { name: "for him: a soft golden ring about the caller's place", svg: care(caller[0], n(caller[1] + 0.5), 4, 2, SOFT_GOLD), keys: showAt(0.77, 0.79), loop: soft },
      { name: "Abu Sa'id's voice: I heard it from him", svg: arcs(n(abuSaid[0] + 2.2), n(abuSaid[1] - 3.8), VOICE), keys: showAt(0.89, 0.9), loop: speaking },
      { name: "whom Abu Sa'id heard it from: his place, a faint golden ring by the masjid", svg: ring(his[0], his[1], 2.4, GOLD), keys: track({ opacity: [[0.895, 0], [0.91, 0.8]] }) },
      { name: "heard from him: a faint golden line from his place to Abu Sa'id's place", svg: lookLine(n(his[0] + 2.4), n(his[1] - 1), n(abuSaid[0] - 1.6), n(abuSaid[1] - 1.2), 93, SOFT_GOLD), keys: showAt(0.91, 0.925) }
    ],
    words: [
      { text: "Abu Sa'id said: I see you love sheep", from: 0.02, to: 0.129 },
      { text: "and the open country", from: 0.144, to: 0.253 },
      { text: "so when you are with your sheep", from: 0.268, to: 0.377 },
      { text: "and call the adhan, raise your voice", from: 0.392, to: 0.501 },
      { text: "none hears the reach of the caller's voice", from: 0.516, to: 0.625 },
      { text: "jinn, human or thing, but will testify", from: 0.64, to: 0.749 },
      { text: "for the caller on the Day of Resurrection", from: 0.764, to: 0.873 },
      { text: "Abu Sa'id said: I heard it from him", from: 0.888, to: 1 }
    ]
  };
}

/** An empty bowl, its foot's middle at (x, y). */
const emptyBowl = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${n(y - 2)} Q${x} ${n(y + 0.8)} ${n(x + 2.6)} ${n(y - 2)} Z" fill="#9A6234"/><ellipse cx="${x}" cy="${n(y - 2)}" rx="2.6" ry="0.7" fill="#6E4524"/>`;

/** A mat on the ground, its middle at (x, y). */
const mat = (x: number, y: number) => `<path d="M${n(x - 4)} ${n(y - 0.8)} L${n(x + 4)} ${n(y - 0.8)} L${n(x + 4.8)} ${n(y + 0.8)} L${n(x - 4.8)} ${n(y + 0.8)} Z" fill="#B98F5A"/>`;

/** A place lying down, a long dashed ring, its middle at (x, y). */
const lying = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="1.3" stroke="${VOICE}" stroke-width="0.9" stroke-dasharray="1 0.8" fill="none"/>`;

// Feed, visit, set free. Abu Musa al-Ash'ari said that the Prophet ﷺ said: feed the hungry, visit the sick, and set
// free the captive. Sufyan said: al-ani is the captive (Sahih al-Bukhari 5373, 5649). No one is drawn: by the masjid of
// Madinah, his place, a golden ring, his voice speaking, and the place of one who does what he says. A hungry one's
// place stands by a home with an empty bowl and a grey ring about it; a dish of food is brought, glints show on it and
// a warm glow comes. By the next home a sick one's place lies on a mat, in a grey haze; the place comes, a soft golden
// ring of care comes about the sick one, and the haze grows lighter. A captive's place is held by a rope to a post; the
// place comes, the rope falls loose, and the freed place goes off, with a glint and a glow; then a soft golden ring
// comes about it.
function feedVisitFree(): SignArt {
  const his: [number, number] = [24, 99.6];
  const doer: [number, number] = [30.6, 101.6];
  const hungry: [number, number] = [49.6, 100.6];
  const bowlAt: [number, number] = [55, 104.4];
  const sick: [number, number] = [93.6, 102.2];
  const captive: [number, number] = [130, 102.2];
  const freed: [number, number] = [146, 101.4];
  const stops: [number, number][] = [
    [41.4, 102.4],
    [84.4, 102.8],
    [118.4, 103.2]
  ];
  return {
    kind: "feed-visit-free",
    ms: 9000,
    parts: [
      ...daySky(132, 70, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: joyLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.36) },
      { name: "the hungry one's home", svg: home(52, 94, 13, 9.4) },
      { name: "the sick one's home", svg: home(92, 94, 14, 10) },
      { name: "the sick one's mat", svg: mat(sick[0], n(sick[1] + 0.6)) },
      { name: "a post", svg: post(124, 104.6, 8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: feed, visit, set free", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.025, 0.035, 0.7, 0.709), loop: speaking },
      {
        name: "the place of one who does it",
        svg: someone(doer[0], doer[1], 1.5),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.09, n(stops[0][0] - doer[0]), n(stops[0][1] - doer[1])],
            [0.275, n(stops[0][0] - doer[0]), n(stops[0][1] - doer[1])],
            [0.33, n(stops[1][0] - doer[0]), n(stops[1][1] - doer[1])],
            [0.52, n(stops[1][0] - doer[0]), n(stops[1][1] - doer[1])],
            [0.57, n(stops[2][0] - doer[0]), n(stops[2][1] - doer[1])]
          ]
        })
      },
      { name: "the hungry one's place", svg: someone(hungry[0], hungry[1], 1.5) },
      { name: "hungry: a grey ring about the hungry one's place", svg: greyRing(hungry[0], n(hungry[1] + 0.5), 3.2, 1.6), keys: track({ opacity: [[0.125, 1], [0.14, 0]] }) },
      { name: "hungry: an empty bowl", svg: emptyBowl(bowlAt[0], bowlAt[1]), keys: track({ opacity: [[0.115, 1], [0.125, 0]] }) },
      {
        name: "fed: a dish of food",
        svg: food(bowlAt[0], bowlAt[1]),
        keys: track({
          xy: [
            [0.04, n(doer[0] + 3.6 - bowlAt[0]), 0],
            [0.09, n(stops[0][0] + 3.6 - bowlAt[0]), 0],
            [0.12, 0, 0]
          ]
        })
      },
      { name: "fed: glints on the dish", svg: sparkle(n(bowlAt[0] - 2.6), n(bowlAt[1] - 4.6), 0.8, "#FFE7A0") + sparkle(n(bowlAt[0] + 2.8), n(bowlAt[1] - 4), 0.7, "#FFE7A0"), keys: showAt(0.13, 0.145), loop: speaking },
      { name: "fed: a warm glow about the hungry one's place", svg: glow(n(hungry[0] + 1.6), n(hungry[1] - 0.6), 7, WARM, 0.2), keys: showAt(0.14, 0.17) },
      { name: "the sick one's place, lying on the mat", svg: lying(sick[0], sick[1]) },
      { name: "ill: a grey haze about the sick one's place", svg: wash(sick[0], n(sick[1] - 0.6), 5.6, 2.8, "#8C8C8C", 0.1), keys: track({ opacity: [[0.37, 1], [0.42, 0.35]] }) },
      { name: "visited: a soft golden ring about the sick one's place", svg: care(sick[0], n(sick[1] + 0.4), 5, 2.2, SOFT_GOLD), keys: showAt(0.34, 0.36), loop: soft },
      {
        name: "the captive's place",
        svg: someone(captive[0], captive[1], 1.5),
        keys: track({ xy: [[0.6, 0, 0], [0.66, n(freed[0] - captive[0]), n(freed[1] - captive[1])]] })
      },
      {
        name: "held: a rope about the captive's place, to the post",
        svg: `<circle cx="${captive[0]}" cy="${captive[1]}" r="2.6" stroke="#9C7A4C" stroke-width="0.6" fill="none"/><path d="M${n(captive[0] - 2.5)} ${n(captive[1] - 0.6)} Q${n(captive[0] - 4.2)} ${n(captive[1] - 0.2)} 124.4 99.4" stroke="#9C7A4C" stroke-width="0.6" fill="none"/>`,
        keys: track({ opacity: [[0.58, 1], [0.595, 0]] })
      },
      { name: "set free: the rope, loose on the ground", svg: `<path d="M124.8 104.4 q1.6 -1 3 0 q1.6 1 3 0 q1.4 -0.8 2.6 0" stroke="#9C7A4C" stroke-width="0.6" fill="none"/>`, keys: showAt(0.585, 0.6) },
      { name: "free: a glint over the freed one's place", svg: sparkle(freed[0], n(freed[1] - 4.4), 1.2, "#FFE7A0"), keys: showAt(0.66, 0.672), loop: speaking },
      { name: "free: a soft golden glow about the freed one's place", svg: glow(freed[0], n(freed[1] - 1.6), 6, WARM, 0.22), keys: showAt(0.665, 0.69) },
      { name: "al-ani, the captive: a soft golden ring about the freed one's place", svg: care(freed[0], n(freed[1] + 0.5), 3.4, 1.7, SOFT_GOLD), keys: showAt(0.77, 0.79), loop: soft }
    ],
    words: [
      { text: "Abu Musa said: he said: feed the hungry", from: 0.02, to: 0.253 },
      { text: "and visit the sick", from: 0.268, to: 0.501 },
      { text: "and set free the captive", from: 0.516, to: 0.749 },
      { text: "Sufyan said: al-ani is the captive", from: 0.764, to: 1 }
    ]
  };
}

/** A small flask of scent, its foot's middle at (x, y). */
const scentFlask = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} Q${n(x - 2.2)} ${n(y - 2.2)} ${n(x - 0.6)} ${n(y - 3.2)} L${n(x - 0.6)} ${n(y - 4.2)} L${n(x + 0.6)} ${n(y - 4.2)} L${n(x + 0.6)} ${n(y - 3.2)} Q${n(x + 2.2)} ${n(y - 2.2)} ${n(x + 1.6)} ${y} Z" fill="#B9A2D6"/><rect x="${n(x - 0.8)}" y="${n(y - 5.2)}" width="1.6" height="1" fill="#8A6A3E"/>`;

/** Two soft curls of scent going up from about (x, y). */
const curls = (x: number, y: number, color = "#C9B2E6") =>
  `<path d="M${n(x - 1)} ${y} q-1.4 -1.6 0 -3.2 q1.4 -1.6 0 -3.2" stroke="${color}" stroke-width="0.6" fill="none" stroke-linecap="round"/><path d="M${n(x + 1.2)} ${n(y - 0.6)} q1.2 -1.4 0 -2.8 q-1.2 -1.4 0 -2.8" stroke="${color}" stroke-width="0.5" fill="none" stroke-linecap="round"/>`;

/** A flask coming from `dx` along the ground to where it is drawn, from `from` to `to`, showing as it starts. */
const handed = (dx: number, from: number, to: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.01), 1]
    ],
    xy: [
      [from, dx, 0],
      [to, 0, 0]
    ]
  });

// Never refused perfume. Azra ibn Thabit al-Ansari said: I went in to Thumamah ibn Abdullah, and he handed me some
// perfume, and said: Anas would never refuse perfume. And Anas said that the Prophet ﷺ would never refuse perfume
// (Sahih al-Bukhari 2582, 5929). No one is drawn: Thumamah's place by his home, and Azra's place coming to it. A small
// flask of perfume goes from Thumamah's place to Azra's, and curls of scent rise. Thumamah's voice speaks; long before,
// Anas's place shows, a flask comes to it, curls rise, and a faint golden line goes from it to Thumamah's place. Anas's
// voice speaks; long before that, by the masjid of Madinah, his place, a golden ring, shows, a flask comes to it,
// golden curls rise and a soft golden glow comes about it, and a faint golden line goes from it to Anas's place.
function neverRefusedPerfume(): SignArt {
  const his: [number, number] = [28.4, 99.8];
  const anas: [number, number] = [62, 101.4];
  const thumamah: [number, number] = [112, 101.6];
  const azra0: [number, number] = [158, 104.4];
  const azra: [number, number] = [126, 102.8];
  return {
    kind: "never-refused-perfume",
    ms: 9000,
    parts: [
      ...daySky(130, 64, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: joyLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      { name: "Thumamah's home", svg: home(136, 96, 18, 12) },
      { name: "Thumamah's place", svg: someone(thumamah[0], thumamah[1], 1.6) },
      { name: "Azra's place", svg: someone(azra0[0], azra0[1], 1.6), keys: track({ xy: [[0.03, 0, 0], [0.15, n(azra[0] - azra0[0]), n(azra[1] - azra0[1])]] }) },
      { name: "perfume: a small flask handed to Azra", svg: scentFlask(n(azra[0] - 3.4), n(azra[1] + 2.4)), keys: handed(-10.6, 0.28, 0.34) },
      { name: "taken: curls of scent by Azra's place", svg: curls(n(azra[0] - 3.4), n(azra[1] - 3.4)), keys: showAt(0.35, 0.37), loop: soft },
      { name: "Thumamah's voice: Anas never refused it", svg: arcs(n(thumamah[0] + 2.2), n(thumamah[1] - 3.8), VOICE), keys: showFor(0.52, 0.53, 0.7, 0.709), loop: speaking },
      { name: "long before: Anas's place", svg: someone(anas[0], anas[1], 1.6), keys: track({ opacity: [[0.53, 0], [0.55, 0.9]] }) },
      { name: "a small flask coming to Anas", svg: scentFlask(n(anas[0] + 3.4), n(anas[1] + 2.4)), keys: handed(9, 0.56, 0.6) },
      { name: "never refused: curls of scent by Anas's place", svg: curls(n(anas[0] + 3.4), n(anas[1] - 3.4)), keys: showAt(0.61, 0.63), loop: soft },
      { name: "kept by Anas: a faint golden line from Anas's place to Thumamah's", svg: lookLine(n(anas[0] + 1.8), n(anas[1] - 1.6), n(thumamah[0] - 1.8), n(thumamah[1] - 1.6), 92, SOFT_GOLD), keys: showAt(0.635, 0.655) },
      { name: "Anas's voice: he never refused it", svg: arcsLeft(n(anas[0] - 2.2), n(anas[1] - 3.8), VOICE), keys: showAt(0.77, 0.78), loop: speaking },
      { name: "long before that: his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: showAt(0.775, 0.79) },
      { name: "a small flask coming to him", svg: scentFlask(n(his[0] + 3.6), n(his[1] + 2.6)), keys: handed(9, 0.795, 0.835) },
      { name: "his perfume: golden curls of scent", svg: curls(n(his[0] + 3.6), n(his[1] - 3.2), "#E8C25A"), keys: showAt(0.845, 0.865), loop: soft },
      { name: "a soft golden glow about his place", svg: glow(his[0], n(his[1] - 1.8), 7, WARM, 0.22), keys: showAt(0.85, 0.88) },
      { name: "handed on: a faint golden line from his place to Anas's place", svg: lookLine(n(his[0] + 2.4), n(his[1] - 1.4), n(anas[0] - 1.8), n(anas[1] - 1.6), 92, SOFT_GOLD), keys: showAt(0.885, 0.9) }
    ],
    words: [
      { text: "Azra said: I went in to Thumamah", from: 0.02, to: 0.253 },
      { text: "and Thumamah handed me some perfume", from: 0.268, to: 0.501 },
      { text: "Thumamah said: Anas never refused perfume", from: 0.516, to: 0.749 },
      { text: "Anas said: he never refused perfume", from: 0.764, to: 1 }
    ]
  };
}

/** A wooden measure, its foot's middle at (x, y), `w` across its rim and `h` high. */
const measureOf = (x: number, y: number, w: number, h: number) =>
  `<path d="M${n(x - w / 2)} ${n(y - h)} L${n(x + w / 2)} ${n(y - h)} L${n(x + w * 0.38)} ${y} L${n(x - w * 0.38)} ${y} Z" fill="#9A6B3E"/>` +
  `<ellipse cx="${x}" cy="${n(y - h)}" rx="${n(w / 2)}" ry="${n(w * 0.12)}" fill="#7A5230"/>` +
  `<path d="M${n(x - w * 0.43)} ${n(y - h * 0.5)} L${n(x + w * 0.43)} ${n(y - h * 0.5)}" stroke="#7A5230" stroke-width="0.3"/>`;

/** Grain heaped on a measure's rim, its middle at (x, y), `w` across. */
const grainOn = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - w * 0.62)} ${n(x + w / 2)} ${y} Z" fill="#E2C374"/>` +
  [-0.22, 0, 0.2, -0.08, 0.1].map((k, i) => `<ellipse cx="${n(x + w * k)}" cy="${n(y - w * (0.08 + (i % 3) * 0.06))}" rx="0.5" ry="0.3" fill="#C9A24A"/>`).join("");

/** A measure of `w` and `h` heaped with grain, its foot's middle at (x, y). */
const heaped = (x: number, y: number, w: number, h: number) => measureOf(x, y, w, h) + grainOn(x, n(y - h), w);

// Blessed measures. Al-Miqdam ibn Ma'dikarib said that the Prophet ﷺ said: measure your food, and it will be blessed
// for you (Sahih al-Bukhari 2128). Anas ibn Malik said that the Messenger of Allah ﷺ said: O Allah, bless them in their
// measure, and bless them in their sa' and their mudd, meaning the people of Madinah (Sahih al-Bukhari 2130). No one is
// drawn: by the masjid of Madinah, his place, a golden ring, and the homes of Madinah among its palms. His voice speaks;
// a measure heaped with grain goes from a heap to a sack and back, twice, and the sacks fill; glints and a soft golden
// glow come on them. His voice speaks again, and a spark of du'a rises from his place. A glint and a soft golden ring
// come on the measure; a sa' heaped with grain shows, with a glint, then a smaller mudd; and a soft golden glow and
// glints come over the homes of Madinah.
function blessedMeasures(): SignArt {
  const his: [number, number] = [28.4, 99.6];
  const pile: [number, number] = [42, 105.8];
  const measure: [number, number] = [57, 105.8];
  const sacks: [number, number][] = [
    [72, 106],
    [85, 106]
  ];
  const sa: [number, number] = [114, 105.8];
  const mudd: [number, number] = [128, 105.8];
  const filled = (i: number, from: number): SignPart => ({
    name: `measured: a sack filled ${i + 1}`,
    svg: sack(sacks[i][0], sacks[i][1], 1.35),
    origin: { x: sacks[i][0], y: sacks[i][1] },
    keys: track({
      opacity: [
        [from, 0],
        [at3(from + 0.004), 1]
      ],
      scale: [
        [from, 0.4],
        [at3(from + 0.007), 1]
      ]
    })
  });
  return {
    kind: "blessed-measures",
    ms: 11000,
    parts: [
      ...daySky(130, 50, 11000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: joyLand([[14, 112], [100, 111], [146, 112]]) },
      { name: "the homes of Madinah", svg: home(58, 89.6, 13, 9) + home(86, 89, 15, 10) + home(110, 89.4, 13, 9) + home(138, 89.2, 14, 9.6) },
      ...[
        [70, 89.4, 12],
        [124, 89, 13],
        [151, 89.6, 11]
      ].map(([x, y, h], i): SignPart => ({ name: `a palm of Madinah ${i + 1}`, svg: palm(x, y, h), origin: { x, y }, loop: { move: "sway", ms: 5200 + i * 600, angle: 1.4, phase: i / 3 } })),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.44) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: measure your food", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.025, 0.035, 0.2, 0.21), loop: speaking },
      {
        name: "a heap of grain",
        svg:
          `<path d="M${n(pile[0] - 8)} ${pile[1]} Q${pile[0]} ${n(pile[1] - 11)} ${n(pile[0] + 8)} ${pile[1]} Z" fill="#E2C374"/>` +
          [-4.4, -2, 0.6, 3, 5, -3, -0.6, 1.8, -1.6, 0.6]
            .map((dx, i) => `<ellipse cx="${n(pile[0] + dx)}" cy="${n(pile[1] - 1 - (i < 5 ? 0 : i < 8 ? 2.2 : 4.2))}" rx="0.55" ry="0.33" fill="#C9A24A"/>`)
            .join(""),
        origin: { x: pile[0], y: pile[1] },
        keys: track({ scale: [[0.04, 1], [0.09, 0.72]] })
      },
      filled(0, 0.043),
      filled(1, 0.076),
      {
        name: "the measure, heaped with grain",
        svg: heaped(measure[0], measure[1], 6.4, 5),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.045, n(sacks[0][0] - measure[0] - 3.6), 0],
            [0.06, 0, 0],
            [0.078, n(sacks[1][0] - measure[0] - 3.6), 0],
            [0.095, 0, 0]
          ]
        })
      },
      { name: "blessed: glints on the sacks", svg: sparkle(sacks[0][0], n(sacks[0][1] - 12.4), 1.1, "#FFE7A0") + sparkle(sacks[1][0], n(sacks[1][1] - 12.4), 1.1, "#FFE7A0"), keys: showAt(0.17, 0.185), loop: speaking },
      { name: "blessed: a soft golden glow over the sacks", svg: glow(78.4, 101.4, 10, WARM, 0.16), keys: showAt(0.18, 0.21) },
      { name: "his voice: a du'a for their measures", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.31, 0.32, 0.805, 0.815), loop: speaking },
      { name: "a du'a: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 3.2), 1.4, SPARK), keys: sparkRising(0.325, 0.375, 10), loop: speaking },
      { name: "their measure: a glint on the measure", svg: sparkle(measure[0], n(measure[1] - 10.8), 1.1, "#FFE7A0"), keys: showAt(0.45, 0.465), loop: speaking },
      { name: "their measure: a soft golden ring about it", svg: care(measure[0], n(measure[1] + 0.2), 5, 1.8, SOFT_GOLD), keys: showAt(0.455, 0.475), loop: soft },
      {
        name: "their sa': a measure heaped with grain",
        svg: heaped(sa[0], sa[1], 8.6, 6.6),
        origin: { x: sa[0], y: sa[1] },
        keys: track({
          opacity: [
            [0.595, 0],
            [0.605, 1]
          ],
          scale: [
            [0.595, 0.6],
            [0.612, 1]
          ]
        })
      },
      { name: "their sa': a glint", svg: sparkle(sa[0], n(sa[1] - 14.6), 1.2, "#FFE7A0"), keys: showAt(0.612, 0.625), loop: speaking },
      {
        name: "their mudd: a smaller measure heaped with grain",
        svg: heaped(mudd[0], mudd[1], 5.4, 4.2),
        origin: { x: mudd[0], y: mudd[1] },
        keys: track({
          opacity: [
            [0.735, 0],
            [0.745, 1]
          ],
          scale: [
            [0.735, 0.6],
            [0.752, 1]
          ]
        })
      },
      { name: "their mudd: a glint", svg: sparkle(mudd[0], n(mudd[1] - 10.4), 1.1, "#FFE7A0"), keys: showAt(0.752, 0.765), loop: speaking },
      { name: "the folk of Madinah: a soft golden glow over its homes", svg: wash(98, 85, 52, 9, WARM, 0.1), keys: showAt(0.875, 0.91) },
      { name: "the folk of Madinah: glints over its homes", svg: sparkle(58, 77.6, 0.9, "#FFE7A0") + sparkle(86, 76, 0.9, "#FFE7A0") + sparkle(110, 77.4, 0.9, "#FFE7A0") + sparkle(138, 76.6, 0.9, "#FFE7A0"), keys: showAt(0.885, 0.9), loop: speaking }
    ],
    words: [
      { text: "Al-Miqdam said: he said: measure your food", from: 0.02, to: 0.147 },
      { text: "and it will be blessed for you", from: 0.162, to: 0.289 },
      { text: "Anas said: he said: O Allah, bless them", from: 0.304, to: 0.431 },
      { text: "in their measure", from: 0.446, to: 0.573 },
      { text: "and bless them in their sa'", from: 0.588, to: 0.715 },
      { text: "and their mudd", from: 0.73, to: 0.857 },
      { text: "meaning the people of Madinah", from: 0.872, to: 1 }
    ]
  };
}

// Twenty nights. Malik ibn al-Huwayrith said: I came to the Prophet ﷺ with some of my people, and we stayed with him
// twenty nights. He was merciful and gentle; when he saw how we longed for our families, he said: go back, and be among
// them, and teach them, and pray; and when the prayer is due, let one of you give the adhan for you, and let the eldest
// of you lead you (Sahih al-Bukhari 628). No one is drawn: by the masjid of Madinah, his place, a golden ring. Six
// places come from their homes, far along the way. Night falls, and twenty small crescents show in the sky one after
// another; day comes again, and a soft golden glow and ring come about his place and theirs. Faint lines go from them to
// their homes, where warm lights show. His voice speaks, and the six go back along the way; glints show by their
// families' places, which grow clear, and sparks rise from the homes. One voice is raised, the adhan, with a ring of
// its reach; then the eldest's place steps out in front of the others, and a soft golden ring comes about it.
function twentyNights(): SignArt {
  const his: [number, number] = [30, 99.4];
  const row: [number, number][] = [
    [40, 103],
    [45.6, 103],
    [51.2, 103],
    [56.8, 103],
    [62.4, 103]
  ];
  const eldest: [number, number] = [68, 103];
  const back: [number, number] = [78, -5.4];
  const ahead: [number, number] = [129.2, 94.2];
  const families: [number, number][] = [
    [113.6, 91.4],
    [127, 91],
    [141, 91.2],
    [155, 91.6]
  ];
  const comeAndGo = (extra: [number, number, number][] = []) =>
    track({
      xy: [
        [0.025, 80, -9],
        [0.085, 0, 0],
        [0.535, 0, 0],
        [0.585, back[0], back[1]],
        ...extra
      ]
    });
  const night = showFor(0.146, 0.156, 0.27, 0.28);
  const crescents = Array.from({ length: 20 }, (_, i): SignPart => {
    const from = at3(0.158 + i * 0.0022);
    return {
      name: `twenty nights: a crescent ${i + 1}`,
      svg: crescent(30 + (i % 10) * 11, i < 10 ? 26 : 35, 2, 1, "#F6E7B0"),
      keys: showFor(from, at3(from + 0.004), 0.27, 0.28)
    };
  });
  return {
    kind: "twenty-nights",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(118, 20), keys: track({ opacity: [[0.146, 1], [0.156, 0], [0.27, 0], [0.28, 1]] }) },
      { name: "a cloud", svg: cloud(50, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: joyLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.46) },
      { name: "the homes of Malik's folk", svg: home(120, 89.4, 11, 8) + home(134, 88.8, 12, 8.6) + home(148, 89.6, 11, 8) },
      { name: "the way to the homes of Malik's folk", svg: way("M36 102.4 C64 102.6 96 97.6 116 92", "#F4E3BC", 0.8) },
      { name: "their families' places, by the homes", svg: placesAt(families, 1.1), keys: track({ opacity: [[0, 0.45], [0.645, 0.45], [0.665, 1]] }) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Malik and those with him: five places", svg: placesAt(row), keys: comeAndGo() },
      {
        name: "the eldest's place",
        svg: someone(eldest[0], eldest[1], 1.4),
        keys: comeAndGo([
          [0.89, back[0], back[1]],
          [0.93, n(ahead[0] - eldest[0]), n(ahead[1] - eldest[1])]
        ])
      },
      { name: "night", svg: NIGHT, keys: night },
      { name: "stars", svg: NIGHT_STARS, keys: night, loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      ...crescents,
      { name: "merciful: a soft golden glow about his place and theirs", svg: wash(50, 101.4, 30, 5.6, WARM, 0.12), keys: showFor(0.29, 0.32, 0.52, 0.53) },
      { name: "gentle: a soft golden ring about them", svg: care(54, 103.6, 18.6, 3, SOFT_GOLD), keys: showFor(0.3, 0.32, 0.52, 0.53), loop: soft },
      { name: "longing: a faint line from them to their homes", svg: lookLine(64, 101.4, 128, 92.6, 86, "#A08A68"), keys: showFor(0.4, 0.42, 0.52, 0.53) },
      { name: "their families: warm lights in the homes", svg: glow(120, 85.4, 4, WARM, 0.25) + glow(134, 84.4, 4, WARM, 0.25) + glow(148, 85.6, 4, WARM, 0.25), keys: showFor(0.42, 0.45, 0.645, 0.66) },
      { name: "his voice: go back, and be among them", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      { name: "teaching: glints by their families' places", svg: families.map(([x, y]) => sparkle(x, n(y - 4), 0.9, "#FFE7A0")).join(""), keys: showFor(0.645, 0.66, 0.765, 0.78), loop: speaking },
      ...quickSparks(
        "praying: a spark",
        [
          [124, 86.6],
          [134, 86],
          [144, 86.6]
        ],
        0.665,
        0.006
      ),
      {
        name: "the adhan: one voice raised",
        svg: arcs(n(row[0][0] + back[0] + 2.2), n(row[0][1] + back[1] - 3.8), VOICE) + arcsLeft(n(row[0][0] + back[0] - 2.2), n(row[0][1] + back[1] - 3.8), VOICE),
        keys: showFor(0.77, 0.78, 0.888, 0.898),
        loop: speaking
      },
      spreading("the adhan: a ring of its reach", n(row[0][0] + back[0]), n(row[0][1] + back[1] - 2), 16, 0.78, 0.82, 0.888, 0.9),
      { name: "the eldest: a soft golden ring about the eldest's place", svg: care(ahead[0], n(ahead[1] + 0.5), 3.2, 1.6, SOFT_GOLD), keys: showAt(0.93, 0.95), loop: soft }
    ],
    words: [
      { text: "Malik said: I came with some of my people", from: 0.02, to: 0.129 },
      { text: "we stayed with him twenty nights", from: 0.144, to: 0.253 },
      { text: "he was merciful and gentle", from: 0.268, to: 0.377 },
      { text: "when he saw how we longed for our families", from: 0.392, to: 0.501 },
      { text: "he said: go back, and be among them", from: 0.516, to: 0.625 },
      { text: "and teach them, and pray", from: 0.64, to: 0.749 },
      { text: "when prayer is due, let one give the adhan", from: 0.764, to: 0.873 },
      { text: "and let the eldest of you lead you", from: 0.888, to: 1 }
    ]
  };
}

export const JOY_ART = {
  "two-hijrahs": twoHijrahs,
  "sana-to-hadramawt": sanaToHadramawt,
  "heard-by-all": heardByAll,
  "feed-visit-free": feedVisitFree,
  "never-refused-perfume": neverRefusedPerfume,
  "blessed-measures": blessedMeasures,
  "twenty-nights": twentyNights
};
