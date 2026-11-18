import { animalAt, cloud, glow, n, sky, stars, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, goldCoin, LIGHT, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { dish } from "./worthArt";
import { faintRing } from "./heedArt";
import { cover } from "./lovedArt";
import { thornyTree } from "./dearArt";
import { at3 } from "./storyArt";

/**
 * What passes and what remains, in his ﷺ days and after: the tree of the pledge, which even those who pledged could
 * not find a year later; the snake in the cave at Mina, which got away; his ring of silver, worn after him until it
 * fell into the well of Aris; gold like Uhud, which he would not keep three nights; the sheep given to Nusaybah, whose
 * gift reached its place; the horse kept for good, whose food and drink are kept for its keeper; and the carpets he
 * said would come. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion
 * and no person is ever drawn, not even a hand or a face: where someone was, a ring or a small dashed circle shows it,
 * where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes
 * down from the sky: a prayer or a deed is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#E8C878";

/** The land from y 61 down, with a few tufts of dry grass. */
const dryLand = () =>
  landOf([
    [30, 108],
    [70, 112],
    [118, 110],
    [150, 106]
  ]);

/** A small stone, its middle at (x, y). */
const stone = (x: number, y: number, rx = 0.9) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${n(rx * 0.56)}" fill="#A8946E"/>`;

/** A ring of silver, a little turned, its middle at (x, y), `r` across, with a glint on its band. */
const silverRing = (x: number, y: number, r = 2.2) =>
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.86)}" stroke="#8F99A5" stroke-width="${n(r * 0.48)}" fill="none"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.86)}" stroke="#DDE3EA" stroke-width="${n(r * 0.22)}" fill="none"/>` +
  `<path d="M${n(x - r * 0.8)} ${n(y - r * 0.5)} Q${n(x - r * 0.5)} ${n(y - r * 0.86)} ${x} ${n(y - r * 0.86)}" stroke="#FFFFFF" stroke-width="${n(r * 0.18)}" fill="none" stroke-linecap="round"/>`;

/** A well of stones, its middle at (x, y). */
const stoneWell = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y + 1)}" rx="7" ry="2.8" fill="#8C7A5E"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="2.4" fill="#A8946E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 0.2)}" rx="4.4" ry="1.5" fill="#2F3B44"/>` +
  [-5, -2.4, 0.4, 3.2, 5.4].map((dx) => `<path d="M${n(x + dx)} ${n(y + 1.6)} l1.8 0" stroke="#7A684C" stroke-width="0.6"/>`).join("");

/** Rings on still water about (x, y). */
const ripples = (x: number, y: number) =>
  [1.2, 2.4, 3.6].map((r, i) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.34)}" stroke="#BFD9EA" stroke-width="0.4" fill="none" opacity="${0.9 - i * 0.22}"/>`).join("");

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s = 0.12, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);

/** A horse of the picture cards, `s` times its size, with its feet at (x, y). */
const horseAt = (x: number, y: number, s: number, left = false) => animalAt("horse", n(x - 50 * s), n(y - 73 * s), s, left);

/** A dish with a soft cover over it, its middle at (x, y): food sent as a gift. */
const coveredDish = (x: number, y: number) => dish(x, y) + cover(x, n(y - 1.4));

/** A small light of good, its middle at (x, y). */
const goodLight = (x: number, y: number, r = 1.1) => glow(x, y, n(r * 1.8), WARM, 0.5) + sparkle(x, y, r, "#FFE7A0");

/** Opacity keys through the given points, each [time, opacity]. */
const fade = (points: [number, number][]) => track({ opacity: points });

// The tree that was forgotten. Tariq ibn Abdur-Rahman said: I set out for Hajj and passed by some people praying. I
// asked: what is this masjid? They said: this is the tree where the Messenger of Allah ﷺ took the pledge of Ridwan. I
// went to Sa'id ibn al-Musayyib and told him. Sa'id said: my father told me that he was among those who pledged beneath
// the tree, and he said: when we set out the following year, we forgot it, and could not find it. Then Sa'id said: the
// Companions of Muhammad ﷺ did not know it, and you know it? Then you know better (Sahih al-Bukhari 4163). No one is
// drawn: thorny trees stand on a plain by the road, and by one of them the places of some folk stand in a row, in a
// prayer place marked out with stones, and a spark of their prayer rises. Tariq's place comes along the road and its
// voice asks; their voices answer, and a faint ring comes about their tree. Tariq's place goes on to Sa'id's place, by
// his home, and Sa'id's voice speaks. The prayer place fades, and the land grows warm and pale, long ago: the places of
// those who pledged come along the road the year after and go from tree to tree, and a grey ring comes about each one,
// not found. The long ago fades, the prayer place comes back, Sa'id's voice speaks again, and the faint ring comes back
// about their tree.
function forgottenTree(): SignArt {
  const rowAt: [number, number][] = [
    [71, 96.4],
    [75.4, 96.4],
    [79.8, 96.4],
    [84.2, 96.4]
  ];
  const stones = [
    ...[66, 70, 74, 78, 82, 86, 90].flatMap((x) => [stone(x, 94.2), stone(x, 98.6)]),
    stone(66, 96.4),
    stone(90, 96.4)
  ].join("");
  // The prayer place and its folk, now: they fade into long ago, and come back after it.
  const now: [number, number][] = [
    [0.45, 1],
    [0.465, 0],
    [0.79, 0],
    [0.805, 1]
  ];
  // The places of those who pledged, the year after: from the road's start, to the second tree, the third, the fourth.
  const searcher = (i: number): SignPart => ({
    name: `the places of those who pledged, the year after ${i + 1}`,
    svg: someone(4 + i * 5, 103.4 - (i % 2) * 0.6),
    keys: track({
      opacity: [
        [0.525, 0],
        [0.535, 1],
        [0.775, 1],
        [0.79, 0]
      ],
      xy: [
        [0.535, 0, 0],
        [0.56, 32, -14.6],
        [0.65, 32, -14.6],
        [0.67, 66, -10.6],
        [0.685, 66, -10.6],
        [0.705, 98, -14.8]
      ]
    })
  });
  return {
    kind: "forgotten-tree",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE3F0", "#E9D7AF", 62) },
      { name: "the sun", svg: sun(130, 22) },
      { name: "a cloud", svg: cloud(44, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: dryLand() },
      { name: "the road", svg: way("M0 104 C40 99 84 103 120 100 C134 99 146 99 160 100", "#F4E3BC", 1.1) },
      { name: "a thorny tree on the plain 1", svg: thornyTree(14, 90, 0.72) },
      { name: "a thorny tree on the plain 2", svg: thornyTree(42, 86, 0.68) },
      { name: "a thorny tree on the plain 3", svg: thornyTree(76, 91, 0.86) },
      { name: "a thorny tree on the plain 4", svg: thornyTree(108, 86, 0.7) },
      ...palms([[157, 97, 14]]),
      { name: "Sa'id's home", svg: home(146, 99, 16, 13) },
      { name: "Sa'id's place, by his home", svg: someone(137, 99.6) },
      { name: "a prayer place marked out with stones", svg: stones, keys: fade(now) },
      { name: "the folk at prayer: their places in a row", svg: rowAt.map(([x, y]) => someone(x, y, 1.4)).join(""), keys: fade(now) },
      spark("their prayer: a spark rising", 78, 92, 0.04, 0.08),
      {
        name: "Tariq's place",
        svg: someone(4, 103.4),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.08, 56, -2.2],
            [0.395, 56, -2.2],
            [0.44, 120, -3]
          ]
        })
      },
      { name: "Tariq's voice: what is this masjid", svg: arcs(62.6, 100.6, VOICE), keys: showFor(0.145, 0.155, 0.265, 0.275), loop: speaking },
      { name: "their voices: here is the tree", svg: arcsLeft(68.8, 95.8, VOICE), keys: showFor(0.27, 0.28, 0.4, 0.41), loop: speaking },
      {
        name: "their tree: a faint ring about it",
        svg: care(76, 91.6, 9, 2.2, "#FFFFFF"),
        keys: fade([
          [0.285, 0],
          [0.3, 1],
          [0.45, 1],
          [0.465, 0],
          [0.895, 0],
          [0.91, 1]
        ]),
        loop: soft
      },
      {
        name: "Sa'id's voice",
        svg: arcsLeft(134.6, 98.8, VOICE),
        keys: fade([
          [0.445, 0],
          [0.455, 1],
          [0.7, 1],
          [0.71, 0],
          [0.78, 0],
          [0.79, 1]
        ]),
        loop: speaking
      },
      { name: "long ago: the land warm and pale", svg: `<rect y="61" width="160" height="59" fill="#FFF3DA" opacity="0.32"/>`, keys: showFor(0.52, 0.535, 0.775, 0.79) },
      searcher(0),
      searcher(1),
      searcher(2),
      { name: "not found: a grey ring about the second tree", svg: greyRing(42, 86.8, 7.6, 2), keys: showAt(0.565, 0.58) },
      { name: "not found: a grey ring about the third tree", svg: greyRing(76, 92, 9, 2.4), keys: showAt(0.672, 0.682) },
      { name: "not found: a grey ring about the fourth tree", svg: greyRing(108, 86.8, 7.8, 2), keys: showAt(0.705, 0.715) }
    ],
    words: [
      { text: "I passed by some folk praying", from: 0.02, to: 0.125 },
      { text: "I asked: what is this masjid?", from: 0.14, to: 0.245 },
      { text: "They said: here is the tree of the pledge", from: 0.26, to: 0.375 },
      { text: "Sa'id said: my father was one who pledged", from: 0.39, to: 0.505 },
      { text: "My father said: next year, we forgot it", from: 0.52, to: 0.635 },
      { text: "and we could not recognize it", from: 0.65, to: 0.755 },
      { text: "Sa'id: the Companions did not know it", from: 0.77, to: 0.875 },
      { text: "yet you know it, so you know better!", from: 0.89, to: 1 }
    ]
  };
}

// The snake in the cave at Mina. Abdullah ibn Mas'ud said: while we were with the Prophet ﷺ in a cave at Mina,
// Al-Mursalat was revealed to him, and he was reciting it, and I was taking it from his mouth, when a snake sprang at
// us. The Prophet ﷺ said: kill it. We rushed at it, and it got away. The Prophet ﷺ said: it was saved from your evil,
// as you were saved from its evil (Sahih al-Bukhari 1830). No one is drawn: in the rocky hills of Mina, a cave opens,
// and in it his place is a golden ring among the places of the folk. A soft golden glow comes about his place:
// revealed to him. His voice recites, and a faint golden line goes from it to the place beside him: taking it from
// him. A snake springs out from the rocks at them. His voice speaks; the places go at it, and the snake slips away
// into a crack in the rocks and is gone. His voice speaks again: a soft ring comes about the crack, and a soft ring
// about the folk.
function caveAtMina(): SignArt {
  const mountain =
    `<path d="M0 98 C8 84 18 70 34 60 C46 52 58 46 72 44 C86 42 100 46 112 54 C126 62 140 74 152 86 C156 90 158 94 160 96 L160 120 L0 120 Z" fill="#9C7E62"/>` +
    `<path d="M72 44 C86 42 100 46 112 54 C126 62 140 74 152 86 C156 90 158 94 160 96 L160 120 L112 120 C116 92 98 64 72 44 Z" fill="#000000" opacity="0.1"/>` +
    `<path d="M28 74 l8 -4 M44 60 l6 -2 M116 64 l7 4 M134 80 l6 3 M48 86 l6 2 M128 92 l5 2" stroke="#7E644C" stroke-width="0.9"/>` +
    `<ellipse cx="22" cy="96" rx="5" ry="2.6" fill="#8A6E54"/><ellipse cx="140" cy="97" rx="6" ry="3" fill="#8A6E54"/>`;
  const ground = `<path d="M0 100 C40 98 120 99 160 100 L160 120 L0 120 Z" fill="#B49A78"/><path d="M0 100 C40 98 120 99 160 100" stroke="#C7AE8A" stroke-width="1"/>`;
  const mouth = `<path d="M58 100.6 C58 85 66 73 80 73 C94 73 102 85 102 100.6 Z" fill="#3A2C22"/><path d="M63 100.6 C63 88 70 79 80 79 C90 79 97 88 97 100.6 Z" fill="#2A1F18"/>`;
  const crack = `<path d="M103 101.4 C104.6 99.4 107.4 99.4 109 101.4 Z" fill="#241A14"/><path d="M102.6 101.6 L109.4 101.6" stroke="#8A6E54" stroke-width="0.6"/>`;
  const his: [number, number] = [72, 98];
  return {
    kind: "cave-at-mina",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#CFE3F0", "#E9D7AF", 62) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "a cloud", svg: cloud(118, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "the rocky hills of Mina", svg: mountain },
      { name: "the ground of the valley", svg: ground + tuft(30, 108, "#A99A5A", 3.4) + tuft(128, 110, "#A99A5A", 3.4) },
      { name: "the opening of the cave", svg: mouth },
      { name: "a crack in the rocks", svg: crack },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "a place of the folk in the cave", svg: someone(64.6, 98.4, 1.5, LIGHT) },
      {
        name: "a place beside him, taking it from him",
        svg: someone(81, 98.2, 1.5, LIGHT),
        keys: track({
          xy: [
            [0.645, 0, 0],
            [0.665, 5, 0.2]
          ]
        })
      },
      {
        name: "another of the folk, going at it",
        svg: someone(88.8, 98.4, 1.5, LIGHT),
        keys: track({
          xy: [
            [0.645, 0, 0],
            [0.665, 3.6, 0.4]
          ]
        })
      },
      { name: "revealed to him: a soft golden glow about his place", svg: glow(his[0], n(his[1] - 1), 6, WARM, 0.35), keys: showAt(0.15, 0.18), loop: soft },
      { name: "his voice, reciting", svg: arcs(75, 96.8, GOLD), keys: showFor(0.275, 0.285, 0.405, 0.415), loop: speaking },
      { name: "taking it from him: a faint golden line", svg: lookLine(74.6, 97, 79.6, 97.4, 94.6, GOLD), keys: showFor(0.29, 0.31, 0.41, 0.42) },
      {
        name: "a snake, springing at them",
        svg: animalAt("snake", 96, 89.1, 0.15, true),
        origin: { x: 102.4, y: 99.4 },
        keys: track({
          opacity: [
            [0.405, 0],
            [0.41, 1],
            [0.68, 1],
            [0.695, 0]
          ],
          xy: [
            [0.41, 0, 0],
            [0.43, -6, 0],
            [0.65, -6, 0],
            [0.68, 3.6, 1.4]
          ],
          scale: [
            [0.665, 1],
            [0.695, 0.3]
          ]
        }),
        loop: { move: "bob", ms: 700, y: -0.4 }
      },
      { name: "his voice: kill it", svg: arcs(75, 96.8, GOLD), keys: showFor(0.525, 0.535, 0.645, 0.655), loop: speaking },
      { name: "his voice: it was saved from your evil", svg: arcs(75, 96.8, GOLD), keys: showAt(0.765, 0.775), loop: speaking },
      { name: "saved: a soft ring about the crack", svg: care(106, 101.8, 4.6, 1.8, SOFT_GOLD), keys: showAt(0.78, 0.8), loop: soft },
      { name: "saved: a soft ring about the folk", svg: care(80, 99.4, 17, 2.8, SOFT_GOLD), keys: showAt(0.89, 0.91), loop: soft }
    ],
    words: [
      { text: "Ibn Mas'ud: We were in a cave at Mina", from: 0.02, to: 0.125 },
      { text: "when Al-Mursalat was revealed to him", from: 0.14, to: 0.255 },
      { text: "He was reciting it, and I took it from him", from: 0.27, to: 0.385 },
      { text: "Suddenly a snake sprang at us", from: 0.4, to: 0.505 },
      { text: "He said: kill it", from: 0.52, to: 0.625 },
      { text: "We rushed at it, and it got away", from: 0.64, to: 0.745 },
      { text: "He said: it escaped your evil", from: 0.76, to: 0.865 },
      { text: "as you escaped its evil", from: 0.88, to: 1 }
    ]
  };
}

// The ring that fell into the well of Aris. Ibn Umar said: the Messenger of Allah ﷺ had a ring of silver made, and it
// was on his hand. Afterwards it was on the hand of Abu Bakr, then of Umar, then of Uthman, until it fell into the
// well of Aris (Sahih al-Bukhari 5873). No one is drawn, and no hand: by the masjid of Madinah, his place is a golden
// ring, and a ring of silver shows over it, with a glint, and a soft shine about it: worn. Abu Bakr's place comes, and
// the ring goes over to it; then Umar's place, and the ring goes over to it; then Uthman's place, by the garden of
// Aris, and the ring goes over to it. Then the ring drops into the well and is gone: ripples show on its water, and a
// faint grey ring comes about the well.
function wellOfAris(): SignArt {
  const over = 95.2;
  return {
    kind: "well-of-aris",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(142, 20) },
      { name: "a cloud", svg: cloud(70, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[28, 110], [76, 112], [150, 108]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 93, 0.7) },
      { name: "the way to the garden of Aris", svg: way("M44 102.4 C70 104.6 100 103 124 100.6", "#F4E3BC", 1) },
      ...palms(
        [
          [104, 93, 12],
          [118, 96, 15],
          [152, 97, 17]
        ],
        "the garden of Aris"
      ),
      { name: "the well of Aris", svg: stoneWell(132, 99) },
      { name: "his place, a golden ring", svg: ring(46, 100.4, 2.6, GOLD) },
      { name: "Abu Bakr's place", svg: someone(66, 100.6), keys: showAt(0.36, 0.375) },
      { name: "Umar's place", svg: someone(88, 100.8), keys: showAt(0.53, 0.545) },
      { name: "Uthman's place", svg: someone(112, 100.6), keys: showAt(0.6, 0.615) },
      { name: "worn: a soft shine about the ring", svg: glow(46, over, 4, "#FFFFFF", 0.3), keys: showFor(0.2, 0.23, 0.38, 0.395) },
      {
        name: "the ring of silver",
        svg: silverRing(46, over),
        origin: { x: 46, y: over },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.07, 1],
            [0.79, 1],
            [0.81, 0]
          ],
          xy: [
            [0.38, 0, 0],
            [0.42, 20, 0],
            [0.56, 20, 0],
            [0.6, 42, 0],
            [0.63, 42, 0],
            [0.67, 66, 0],
            [0.75, 66, 0],
            [0.79, 86, 3.4]
          ],
          scale: [
            [0.77, 1],
            [0.81, 0.4]
          ]
        }),
        loop: soft
      },
      { name: "made: a glint on the ring", svg: sparkle(48.6, n(over - 2.4), 1.4, "#FFFFFF"), keys: showFor(0.05, 0.07, 0.11, 0.125) },
      { name: "ripples on the water of the well", svg: ripples(132, 98.8), keys: showFor(0.81, 0.82, 0.9, 0.92) },
      { name: "gone: a faint grey ring about the well", svg: greyRing(132, 100, 9, 3.2), keys: showAt(0.86, 0.88) }
    ],
    words: [
      { text: "He had a ring of silver made", from: 0.02, to: 0.17 },
      { text: "and it was worn on his hand", from: 0.19, to: 0.34 },
      { text: "Afterwards it was worn by Abu Bakr", from: 0.36, to: 0.51 },
      { text: "then by Umar, and then by Uthman", from: 0.53, to: 0.72 },
      { text: "till it fell in the well of Aris", from: 0.74, to: 1 }
    ]
  };
}

// Gold he would not keep. Abu Hurairah said: the Messenger of Allah ﷺ said: if I had gold like Uhud, it would please
// me that three nights should not pass over me while I have any of it, except something I keep back for a debt (Sahih
// al-Bukhari 6445). No one is drawn: by the masjid of Madinah, his place is a golden ring, and Mount Uhud stands beyond
// the homes. His voice speaks, and a golden sheen comes over Uhud: gold like Uhud. Night comes, three times, and each
// night small lights of gold go from the mountain to the homes of Madinah, and the sheen grows less, until none is left
// on it. Then one small coin shows by his place, a soft ring about it: kept back for a debt.
function goldNotKept(): SignArt {
  const uhudPath = "M64 96 C74 86 84 74 96 64 C106 56 114 48 124 46 C132 44 138 48 146 56 C152 62 156 68 160 72 L160 96 Z";
  const uhud =
    `<path d="${uhudPath}" fill="#B5715A"/>` +
    `<path d="M124 46 C132 44 138 48 146 56 C152 62 156 68 160 72 L160 96 L132 96 C132 80 128 62 124 46 Z" fill="#000000" opacity="0.12"/>` +
    `<path d="M88 80 C92 78 96 80 100 77 M110 64 C114 65 116 64 120 66 M134 76 C138 77 142 76 146 79" stroke="#9A5C48" stroke-width="0.8" fill="none"/>`;
  const goldUhud =
    `<path d="${uhudPath}" fill="#E2B33C"/>` +
    `<path d="M124 46 C132 44 138 48 146 56 C152 62 156 68 160 72 L160 96 L132 96 C132 80 128 62 124 46 Z" fill="#9A6B1E" opacity="0.22"/>` +
    sparkle(104, 70, 1.4, "#FFF6CF") +
    sparkle(130, 58, 1.2, "#FFF6CF") +
    sparkle(144, 78, 1.3, "#FFF6CF");
  const nights: [number, number][] = [
    [0.24, 0],
    [0.27, 1],
    [0.3, 1],
    [0.33, 0],
    [0.34, 0],
    [0.37, 1],
    [0.4, 1],
    [0.43, 0],
    [0.5, 0],
    [0.53, 1],
    [0.56, 1],
    [0.59, 0]
  ];
  const homesAt: [number, number][] = [
    [46, 92],
    [59, 93],
    [20, 88],
    [46, 92],
    [59, 93],
    [20, 88]
  ];
  const goes = [0.27, 0.27, 0.37, 0.37, 0.53, 0.53];
  const fromAt: [number, number][] = [
    [104, 72],
    [118, 60],
    [132, 66],
    [110, 80],
    [140, 74],
    [122, 54]
  ];
  return {
    kind: "gold-not-kept",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#CFE3F0", "#E9D7AF", 92) },
      { name: "a cloud", svg: cloud(40, 24, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "the land", svg: `<rect y="92" width="160" height="28" fill="#E2CB9C"/>` + tuft(80, 110, "#A99A5A", 3.4) + tuft(130, 112, "#A99A5A", 3.4) },
      { name: "Mount Uhud", svg: uhud },
      {
        name: "gold like Uhud: a golden sheen over the mountain",
        svg: goldUhud,
        keys: fade([
          [0.06, 0],
          [0.12, 0.85],
          [0.27, 0.85],
          [0.3, 0.6],
          [0.37, 0.6],
          [0.4, 0.35],
          [0.53, 0.35],
          [0.56, 0]
        ]),
        loop: soft
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 98, 0.56) },
      { name: "homes of Madinah", svg: home(46, 99, 11, 10) + home(59, 99.6, 10, 9) },
      ...palms([
        [38, 100, 13],
        [68, 101, 12]
      ]),
      { name: "his place, a golden ring", svg: ring(24, 102.4, 2.6, GOLD) },
      { name: "his voice: if I had gold like Uhud", svg: arcs(27, 101, GOLD), keys: showFor(0.03, 0.04, 0.225, 0.235), loop: speaking },
      { name: "night, three times", svg: `<rect width="160" height="120" fill="#0F1C3A"/>`, keys: fade(nights.map(([t, o]) => [t, o * 0.55])) },
      {
        name: "the moon and stars of the nights",
        svg:
          `<path d="M146 12 A6 6 0 1 0 152.6 20 A4.6 4.6 0 1 1 146 12 Z" fill="#F4F1DC"/>` +
          stars([
            [14, 14],
            [56, 12],
            [74, 24],
            [92, 12],
            [112, 22],
            [128, 10],
            [10, 34]
          ]),
        keys: fade(nights)
      },
      ...fromAt.map(
        ([x, y], i): SignPart => ({
          name: `given out: a small light of gold going to Madinah ${i + 1}`,
          svg: goldCoin(x, y, 1.2) + glow(x, y, 2.6, WARM, 0.4),
          keys: track({
            opacity: [
              [at3(goes[i] - 0.01), 0],
              [goes[i], 1],
              [at3(goes[i] + 0.03), 1],
              [at3(goes[i] + 0.035), 0]
            ],
            xy: [
              [goes[i], 0, 0],
              [at3(goes[i] + 0.03), n(homesAt[i][0] - x), n(homesAt[i][1] - y)]
            ]
          })
        })
      ),
      { name: "a warm glow on the homes of Madinah", svg: wash(40, 92, 30, 10, WARM, 0.14), keys: showAt(0.3, 0.33), loop: soft },
      { name: "kept back for a debt: one small coin by his place", svg: goldCoin(30.6, 101.4, 1.3), keys: showAt(0.77, 0.79) },
      { name: "kept back: a soft ring about the coin", svg: care(30.6, 101.8, 3, 1.4, SOFT_GOLD), keys: showAt(0.8, 0.82), loop: soft }
    ],
    words: [
      { text: "He said: if I had gold like Uhud", from: 0.02, to: 0.2 },
      { text: "I would not like three nights to pass", from: 0.22, to: 0.48 },
      { text: "and any of it still be with me", from: 0.5, to: 0.74 },
      { text: "except something I keep for a debt", from: 0.76, to: 1 }
    ]
  };
}

// The gift that reached its place. Umm Atiyyah said: a sheep was sent to Nusaybah al-Ansariyyah, and she sent some of
// it to Aishah. The Prophet ﷺ asked Aishah for something to eat. Aishah said there was nothing, except what Nusaybah
// had sent of that sheep. He said: bring it, for it has reached its place (Sahih al-Bukhari 1446). No one is drawn: on
// the left, Nusaybah's home and her place; on the right, his home by the masjid, and his place by the masjid. A sheep
// comes along the way to Nusaybah's door, a soft ring about it: given to her. It goes in, and a covered dish comes out
// and goes along the way to his home. His place comes to his door, and his voice asks; a voice answers from his home,
// and faint lines go from the door to the dish, and from the dish back to Nusaybah's home. His voice speaks again, the
// dish comes to his place, and a soft golden ring and a warm glow come about it: it has reached its place.
function reachedItsPlace(): SignArt {
  return {
    kind: "reached-its-place",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(22, 20) },
      { name: "a cloud", svg: cloud(96, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[20, 110], [84, 112], [140, 110]]) },
      { name: "the way to Nusaybah's door", svg: way("M0 103.6 C14 102.6 26 102.4 37 100.8", "#F4E3BC", 1) },
      { name: "the way between the two homes", svg: way("M44 101.6 C66 104 88 103.6 106 101.4", "#F4E3BC", 1) },
      ...palms([
        [12, 96, 14],
        [76, 93, 12],
        [156, 96, 15]
      ]),
      { name: "Nusaybah's home", svg: home(40, 99, 18, 14) },
      { name: "Nusaybah's place", svg: someone(47, 101.2) },
      { name: "his home, by the masjid", svg: home(112, 99, 16, 13) },
      { name: "the masjid of Madinah", svg: madinahMasjid(123, 99, 0.62) },
      {
        name: "a sheep, sent to Nusaybah",
        svg: sheepAt(-6, 103, 0.12),
        keys: track({
          opacity: [
            [0.18, 1],
            [0.195, 0]
          ],
          xy: [
            [0.03, 0, 0],
            [0.1, 38, -2.4],
            [0.175, 38, -2.4],
            [0.19, 43, -3.4]
          ]
        }),
        loop: { move: "bob", ms: 600, y: -0.3 }
      },
      { name: "given to her: a soft ring about the sheep", svg: care(32, 101.2, 5.4, 1.8, SOFT_GOLD), keys: showFor(0.1, 0.11, 0.175, 0.185), loop: soft },
      {
        name: "some of it: a covered dish",
        svg: coveredDish(41, 100.6),
        keys: track({
          opacity: [
            [0.195, 0],
            [0.2, 1]
          ],
          xy: [
            [0.2, 0, 0],
            [0.245, 63, 0.6],
            [0.67, 63, 0.6],
            [0.71, 80, 0.4]
          ]
        })
      },
      {
        name: "his place, a golden ring",
        svg: ring(134, 101.6, 2.6, GOLD),
        keys: track({
          xy: [
            [0.325, 0, 0],
            [0.36, -18, -0.2]
          ]
        })
      },
      { name: "his voice: do you have anything", svg: arcsLeft(113.6, 100.2, GOLD), keys: showFor(0.365, 0.375, 0.475, 0.485), loop: speaking },
      { name: "a voice from his home: none but what was sent", svg: arcs(111.4, 96.6, VOICE), keys: showFor(0.48, 0.49, 0.645, 0.655), loop: speaking },
      { name: "a faint line from the door to the dish", svg: lookLine(110, 97.8, 105, 98.6, 95.8, "#FFFFFF"), keys: showFor(0.5, 0.52, 0.645, 0.655) },
      { name: "a faint line from the dish to Nusaybah's home", svg: lookLine(102, 98.4, 47, 97, 86, "#FFFFFF"), keys: showFor(0.52, 0.54, 0.645, 0.655) },
      { name: "his voice: bring it", svg: arcsLeft(113.6, 100.2, GOLD), keys: showFor(0.645, 0.655, 0.795, 0.805), loop: speaking },
      { name: "reached its place: a soft golden ring about the dish", svg: care(121, 101.8, 5, 1.8, GOLD), keys: showAt(0.81, 0.83), loop: soft },
      { name: "a warm glow about the dish and his place", svg: glow(118, 100, 8, WARM, 0.3), keys: showAt(0.83, 0.87) }
    ],
    words: [
      { text: "A sheep was sent to Nusaybah, as charity", from: 0.02, to: 0.15 },
      { text: "and she sent some of it to Aishah", from: 0.17, to: 0.3 },
      { text: "He asked: do you have anything?", from: 0.32, to: 0.45 },
      { text: "Aishah said: none but what Nusaybah sent", from: 0.47, to: 0.62 },
      { text: "He said: bring it", from: 0.64, to: 0.77 },
      { text: "for it has reached its place", from: 0.79, to: 1 }
    ]
  };
}

// The horse kept for good. Abu Hurairah said: the Prophet ﷺ said: whoever keeps a horse in Allah's cause, out of faith
// in Allah and belief in His promise, its fill, its drink, its dung and its urine will be in his scale on the Day of
// Resurrection (Sahih al-Bukhari 2853). No one is drawn, and no one on the horse: among the palms, a horse comes along
// with its keeper's place beside it, and is tied at a post, a soft ring about it: kept. A soft golden ring comes about
// the keeper's place, and a spark rises: faith; a soft glow comes about it, and a spark rises: belief in His promise.
// Then the barley in the horse's manger goes down as it eats, and sparks rise from it; the water in its trough goes
// down as it drinks, and sparks rise from it. A row of small lights shows over the keeper's place, kept for it, and a
// warm glow comes about the keeper and the horse.
function horseKept(): SignArt {
  const s = 0.26;
  const post = `<path d="M62 101 L62 89.6" stroke="#7A5A3A" stroke-width="1.4" stroke-linecap="round"/><path d="M60.8 90 L63.2 90" stroke="#5E432A" stroke-width="0.8"/>`;
  const manger =
    `<path d="M89 99.6 L89.6 93.4 M98.4 99.6 L97.8 93.4" stroke="#7A5A3A" stroke-width="0.9"/>` +
    `<path d="M87.6 91 L99.8 91 L98.8 94 L88.6 94 Z" fill="#8C6A44"/><path d="M87.6 91 L99.8 91" stroke="#6E5034" stroke-width="0.5"/>`;
  const barley = `<path d="M88.6 91.2 Q93.7 87.4 98.8 91.2 Z" fill="#E3C46A"/><path d="M90.4 90.4 L91 89.6 M93 89.4 L93.6 88.6 M95.8 89.8 L96.4 89" stroke="#C9A64A" stroke-width="0.4"/>`;
  const trough = `<path d="M87 103.6 L100.4 103.6 L99.4 100.4 L88 100.4 Z" fill="#8A8F96"/><path d="M87 100.4 L100.4 100.4" stroke="#6E737A" stroke-width="0.5"/>`;
  const water = `<rect x="88.6" y="100.6" width="10.2" height="1.6" fill="#6FA8D6"/>`;
  const lightsAt: [number, number][] = [
    [56, 76],
    [61, 74.6],
    [66, 74],
    [71, 74.6],
    [76, 76]
  ];
  return {
    kind: "horse-kept",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(140, 20) },
      { name: "a cloud", svg: cloud(52, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[24, 110], [84, 112], [140, 110]]) },
      ...palms([
        [12, 96, 16],
        [128, 94, 13],
        [150, 96, 16]
      ]),
      { name: "a post to tie the horse", svg: post },
      { name: "the horse's manger", svg: manger },
      { name: "barley in the manger", svg: barley, origin: { x: 93.7, y: 91.2 }, keys: track({ scaleY: [[0.56, 1], [0.6, 0.3]] }) },
      { name: "the horse's trough", svg: trough },
      { name: "water in the trough", svg: water, origin: { x: 93.7, y: 102.2 }, keys: track({ scaleY: [[0.62, 1], [0.66, 0.35]] }) },
      {
        name: "a horse, kept for good",
        svg: horseAt(20, 104, s),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.12, 58, -2]
          ]
        }),
        loop: { move: "bob", ms: 1400, y: -0.3 }
      },
      {
        name: "the keeper's place",
        svg: someone(12, 104.4),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.12, 54, -2.8]
          ]
        })
      },
      { name: "kept: a cord from the post", svg: `<path d="M62.6 91.4 Q71 94.6 80.4 91" stroke="#8C7B63" stroke-width="0.6" fill="none"/>`, keys: showAt(0.125, 0.14) },
      { name: "kept: a soft ring about the horse", svg: care(79, 102.6, 12, 2.4, SOFT_GOLD), keys: showAt(0.135, 0.15), loop: soft },
      { name: "faith: a soft golden ring about the keeper's place", svg: care(66, 102.2, 3.4, 1.8, GOLD), keys: showAt(0.22, 0.24), loop: soft },
      spark("faith: a spark rising from the keeper's place", 66, 97, 0.25, 0.31),
      { name: "belief in the promise: a soft glow about the keeper's place", svg: glow(66, 100.6, 6, WARM, 0.3), keys: showAt(0.39, 0.42) },
      spark("belief in the promise: a spark rising", 66, 97, 0.42, 0.48),
      spark("what it eats: a spark rising from the manger 1", 91.6, 88, 0.565, 0.615),
      spark("what it eats: a spark rising from the manger 2", 95.8, 88, 0.585, 0.635),
      spark("what it drinks: a spark rising from the trough 1", 90.8, 98.6, 0.625, 0.675),
      spark("what it drinks: a spark rising from the trough 2", 96.6, 98.6, 0.645, 0.695),
      ...lightsAt.map(
        ([x, y], i): SignPart => ({
          name: `kept for the keeper: a small light ${i + 1}`,
          svg: goodLight(x, y),
          keys: showAt(at3(0.77 + i * 0.02), at3(0.785 + i * 0.02)),
          loop: { move: "twinkle", ms: 1100, low: 0.6, phase: i / 5 }
        })
      ),
      { name: "a warm glow about the keeper and the horse", svg: wash(74, 98, 22, 8, WARM, 0.16), keys: showAt(0.88, 0.91) }
    ],
    words: [
      { text: "Whoever keeps a horse in Allah's cause", from: 0.02, to: 0.19 },
      { text: "out of faith in Allah", from: 0.21, to: 0.36 },
      { text: "and belief in His promise", from: 0.38, to: 0.53 },
      { text: "what it has eaten and drunk", from: 0.55, to: 0.74 },
      { text: "is in his scale on the Day of Resurrection", from: 0.76, to: 1 }
    ]
  };
}

/** A carpet of many colors from x to x + w, its back edge at y, `h` deep: a field, a border and small diamonds. */
const carpet = (x: number, y: number, w: number, h: number, field: string, border: string) => {
  const diamonds = Array.from({ length: Math.floor((w - 3) / 3.4) }, (_, i) => {
    const cx = n(x + 2.6 + i * 3.4);
    const cy = n(y + h / 2);
    return `<path d="M${cx} ${n(cy - 1)} L${n(cx + 0.9)} ${cy} L${cx} ${n(cy + 1)} L${n(cx - 0.9)} ${cy} Z" fill="${border}"/>`;
  }).join("");
  return (
    `<path d="M${x} ${y} L${n(x + w)} ${y} L${n(x + w + 1.2)} ${n(y + h)} L${n(x - 1.2)} ${n(y + h)} Z" fill="${field}"/>` +
    `<path d="M${n(x + 0.6)} ${n(y + 0.5)} L${n(x + w - 0.6)} ${n(y + 0.5)} M${n(x - 0.4)} ${n(y + h - 0.5)} L${n(x + w + 0.4)} ${n(y + h - 0.5)}" stroke="${border}" stroke-width="0.5"/>` +
    diamonds
  );
};

/** The faint dashed outline of a carpet still to come, from x to x + w, its back edge at y, `h` deep. */
const carpetToCome = (x: number, y: number, w: number, h: number) =>
  `<path d="M${x} ${y} L${n(x + w)} ${y} L${n(x + w + 1.2)} ${n(y + h)} L${n(x - 1.2)} ${n(y + h)} Z" stroke="${GOLD}" stroke-width="0.5" stroke-dasharray="1 1" fill="none" opacity="0.85"/>`;

// The carpets that would come. Jabir said: the Prophet ﷺ said: have you got carpets? I said: where would we get
// carpets? He said: you shall soon have carpets. And now I say to my wife: take your carpets away from me, and she
// says: did the Prophet ﷺ not say that you would soon have carpets? So I leave them (Sahih al-Bukhari 3631). No one is
// drawn: a home in Madinah, open at its front, with a bare floor and an old mat; a place in the home, and his place
// outside it. His voice asks; the voice of the place in the home answers, and a grey ring comes on the bare floor. His
// voice speaks again, and faint golden outlines of carpets show on the floor: still to come. His place goes, and time
// goes by: the carpets come, rolling out on the floor, and a second place shows in the home. The voice of the first
// speaks, and one carpet rolls up; the second's voice speaks, and a faint golden ring shows where his place stood, and
// the faint outlines show again about the carpets. The carpet rolls out again, and a warm glow comes over the home.
function carpetsWillCome(): SignArt {
  const room =
    `<rect x="22" y="70" width="96" height="30" fill="#E2C49A"/>` +
    `<rect x="22" y="70" width="5" height="30" fill="#C9A97A"/>` +
    `<rect x="113" y="70" width="5" height="30" fill="#C9A97A"/>` +
    `<rect x="20" y="66.8" width="100" height="3.6" fill="#BC9060"/>` +
    `<rect x="44" y="76" width="6" height="5" fill="#6B4A2E"/>` +
    `<path d="M22 100 L118 100 L121 107.6 L19 107.6 Z" fill="#C9A97A"/><path d="M19 107.6 L121 107.6" stroke="#A98A5E" stroke-width="0.8"/>`;
  const mat = `<path d="M66 101.6 L86 101.6 L86.8 105 L65.2 105 Z" fill="#C8A060"/><path d="M67 103.2 L86 103.2 M70 101.8 L69.6 104.8 M76 101.8 L76 104.8 M82 101.8 L82.4 104.8" stroke="#A88444" stroke-width="0.4"/>`;
  const outlines = carpetToCome(30, 101, 22, 4.4) + carpetToCome(56, 101.4, 24, 4.4) + carpetToCome(84, 101, 22, 4.4);
  const roll = (from: number): Parameters<typeof track>[0] => ({
    opacity: [
      [from, 0],
      [at3(from + 0.005), 1]
    ],
    scaleX: [
      [from, 0],
      [at3(from + 0.035), 1]
    ]
  });
  return {
    kind: "carpets-will-come",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(140, 20) },
      { name: "a cloud", svg: cloud(66, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[10, 112], [132, 112], [150, 108]]) },
      ...palms([[146, 97, 16]]),
      { name: "a home in Madinah, open at its front", svg: room },
      { name: "an old mat on the bare floor", svg: mat },
      { name: "a carpet of red", svg: carpet(30, 101, 22, 4.4, "#B0413E", "#E8C66A"), origin: { x: 30, y: 103 }, keys: track(roll(0.395)) },
      {
        name: "a carpet of blue",
        svg: carpet(56, 101.4, 24, 4.4, "#3E5C8A", "#E8D9B0"),
        origin: { x: 81.2, y: 103.4 },
        keys: track({
          opacity: [
            [0.405, 0],
            [0.41, 1]
          ],
          scaleX: [
            [0.405, 0],
            [0.44, 1],
            [0.52, 1],
            [0.56, 0.3],
            [0.88, 0.3],
            [0.92, 1]
          ]
        })
      },
      { name: "a carpet of green", svg: carpet(84, 101, 22, 4.4, "#4E7A4A", "#E8C66A"), origin: { x: 84, y: 103 }, keys: track(roll(0.415)) },
      { name: "the place in the home", svg: someone(40, 102.6) },
      { name: "the second place in the home", svg: someone(100, 102.6), keys: showAt(0.43, 0.44) },
      { name: "his place, a golden ring", svg: ring(134, 104.6, 2.6, GOLD), keys: fade([[0.385, 1], [0.395, 0]]) },
      { name: "his voice: have you got carpets", svg: arcsLeft(131.2, 103.2, GOLD), keys: showFor(0.03, 0.04, 0.145, 0.155), loop: speaking },
      { name: "the voice in the home: where would we get them", svg: arcs(42.6, 101.6, VOICE), keys: showFor(0.145, 0.155, 0.265, 0.275), loop: speaking },
      { name: "none: a grey ring on the bare floor", svg: greyRing(70, 104, 30, 2.6), keys: showFor(0.16, 0.18, 0.385, 0.395) },
      { name: "his voice: you shall soon have carpets", svg: arcsLeft(131.2, 103.2, GOLD), keys: showFor(0.265, 0.275, 0.38, 0.39), loop: speaking },
      {
        name: "still to come: faint golden outlines of carpets",
        svg: outlines,
        keys: fade([
          [0.28, 0],
          [0.3, 1],
          [0.395, 1],
          [0.41, 0],
          [0.76, 0],
          [0.78, 1]
        ]),
        loop: soft
      },
      { name: "the voice in the home: take them out of my sight", svg: arcs(42.6, 101.6, VOICE), keys: showFor(0.44, 0.45, 0.565, 0.575), loop: speaking },
      { name: "the second voice: did he not tell you", svg: arcsLeft(97.6, 101.6, VOICE), keys: showFor(0.64, 0.65, 0.88, 0.89), loop: speaking },
      { name: "where his place stood: a faint golden ring", svg: faintRing(134, 103.6, 2.8, GOLD), keys: showFor(0.66, 0.68, 0.88, 0.9) },
      { name: "a warm glow over the home", svg: wash(70, 96, 50, 12, WARM, 0.14), keys: showAt(0.92, 0.95) }
    ],
    words: [
      { text: "He asked: have you got carpets?", from: 0.02, to: 0.125 },
      { text: "Jabir: I said: where would we get carpets?", from: 0.14, to: 0.245 },
      { text: "He said: you shall soon have carpets", from: 0.26, to: 0.365 },
      { text: "I would say to my wife:", from: 0.38, to: 0.5 },
      { text: "take your carpets out of my sight", from: 0.515, to: 0.62 },
      { text: "She would say: did he not tell you", from: 0.635, to: 0.74 },
      { text: "that you would soon have carpets?", from: 0.755, to: 0.86 },
      { text: "So I would let them be", from: 0.875, to: 1 }
    ]
  };
}

export const REMAIN_ART = {
  "forgotten-tree": forgottenTree,
  "cave-at-mina": caveAtMina,
  "well-of-aris": wellOfAris,
  "gold-not-kept": goldNotKept,
  "reached-its-place": reachedItsPlace,
  "horse-kept": horseKept,
  "carpets-will-come": carpetsWillCome
};
