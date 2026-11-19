import { cloud, glow, n, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, lightIn, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, FOLK, glints, linesOn, places, plainLand, SEVEN, SIX, sparkStays, twinkle } from "./shareArt";
import { farHills, FIVE, insideTheMasjid } from "./wideArt";
import { coins } from "./tradeArt";
import { GREY } from "./lovedArt";
import { looking, QUICK } from "./dailyArt";
import { puff, puffKeys } from "./quietArt";

/**
 * Virtue: whoever cuts the ties of kinship will not enter Paradise; the best of teachers, who did not scold one who
 * spoke in the prayer; not sent to curse, but sent as mercy; virtue is good character, and vice what rankles within and
 * one would hate people to know of; a sin screened at night, told of in the morning; and spending what is more than
 * enough. Only the land, the sky, buildings and things are drawn. No Prophet, no Companion and no person is ever drawn,
 * not even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book or page is drawn,
 * and nothing comes down from the sky: a deed is a spark that rises, what is good is a light, glints and a soft golden
 * ring, and what is not to be done a grey dashed ring. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** A grey dotted line of staring, along `d`. */
const staring = (d: string) => `<path d="${d}" stroke="${GREY}" stroke-width="0.6" stroke-dasharray="0.5 1.3" stroke-linecap="round" fill="none"/>`;

/** Jubayr ibn Mut'im's place and voice: a deep green. */
const JUBAYR = "#4E7A6A";
/** Mu'awiya ibn al-Hakam's place and voice: a slate blue. */
const MUAWIYA = "#5E6E8E";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** An-Nawwas ibn Sam'an's place and voice: a slate blue. */
const NAWWAS = "#4E6E7E";
/** Abu Umamah's place and voice: an olive green. */
const ABU_UMAMAH = "#6E7E4E";
/** The place and voice of someone who asked: a slate blue. */
const ASKER = "#4E6E7E";
/** The place of one who cuts the ties: a muted violet. */
const CUTS = "#7E5E8C";
/** And of its kin: a dull teal. */
const KIN = "#4E7E6E";
/** The place and voice of one who is kind: a plain green. */
const KIND = "#5E8A52";
/** The place of one with something that rankles within: a dull brown. */
const UNEASY = "#8A6A4E";
/** The place and voice of one who sinned at night: a dull brown. */
const SINNED = "#8A6A4E";
/** The place of so-and-so, who is told of it: a dull teal. */
const TOLD = "#4E7E6E";
/** The place of one who spends: a plain green. */
const GIVER = "#5E8A52";
/** The place of one who withholds: a dull brown. */
const WITHHOLDS = "#8A6A4E";

// Cutting the ties. Jubayr ibn Mut'im said that he heard the Prophet ﷺ saying: the one who cuts the ties of kinship
// will not enter Paradise (Sahih al-Bukhari 5984; the English page: the person who severs the bond of kinship will not
// enter Paradise). No one is drawn, and nothing for Paradise: the masjid of Madinah, his place before it, a golden ring,
// Jubayr's place by him, and along the lane two homes of one family, the place of one of them by each, a soft golden
// way between them: the bond of kinship. Jubayr's voice tells of it, and his voice, soft and golden, speaks. The soft
// golden way fades, a grey dashed way broken in the middle shows where it was, and the one of the first home turns
// away from its kin. A grey dashed ring comes about the one who cut the bond.
function cutTies(): SignArt {
  const jubayr: [number, number] = [46, 108.6];
  const his: [number, number] = [28, 106];
  const cuts: [number, number] = [92, 112.6];
  const kin: [number, number] = [140, 112.6];
  const away: [number, number] = [-12, 0.6];
  return {
    kind: "cut-ties",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(74, 20) },
      { name: "a cloud", svg: cloud(126, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 118], [60, 118.6], [156, 118]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      ...palms(
        [
          [64, 98, 12],
          [116, 99, 11]
        ],
        "Madinah"
      ),
      { name: "a home of one family, along the lane", svg: home(92, 99, 16, 12) },
      { name: "another home of the same family", svg: home(140, 99, 16, 12) },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Jubayr's place, by him", svg: someone(jubayr[0], jubayr[1], 1.5, JUBAYR) },
      { name: "Jubayr's voice: telling what he heard", svg: arcs(n(jubayr[0] + 3.2), n(jubayr[1] - 2.8), JUBAYR), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.16, 0.166, 0.94, 0.946), loop: speaking },
      { name: "the place of one of the other home, its kin", svg: someone(kin[0], kin[1], 1.6, KIN) },
      {
        name: "the bond of kinship: a soft golden way between the two, fading",
        svg: way(`M${n(cuts[0] + 3.6)} ${n(cuts[1] + 1)} Q116 117.6 ${n(kin[0] - 3.6)} ${n(kin[1] + 1)}`, SOFT_GOLD, 0.9),
        keys: track({
          opacity: [
            [0.36, 1],
            [0.4, 0]
          ]
        })
      },
      {
        name: "severed: a grey dashed way, broken in the middle",
        svg:
          way(`M${n(cuts[0] + 3.6)} ${n(cuts[1] + 1)} Q102 116.2 110 116.6`, GREY, 0.8) +
          way(`M122 116.6 Q130 116.2 ${n(kin[0] - 3.6)} ${n(kin[1] + 1)}`, GREY, 0.8),
        keys: showAt(0.402, 0.414)
      },
      {
        name: "the place of one of the first home: turning away from its kin",
        svg: someone(cuts[0], cuts[1], 1.6, CUTS),
        keys: track({
          xy: [
            [0.44, 0, 0],
            [0.5, away[0], away[1]]
          ]
        })
      },
      { name: "a grey dashed ring about the one who severed the bond", svg: greyRing(n(cuts[0] + away[0]), n(cuts[1] + away[1] + 0.6), 4.2, 2.6), keys: showAt(0.72, 0.732) }
    ],
    words: linesOn(THREE, ["Jubayr ibn Mut'im heard him saying:", "The person who severs the bond of", "Kinship will not enter Paradise."])
  };
}

// The best of teachers. Mu'awiya ibn al-Hakam as-Sulami said: while I was praying with the Messenger of Allah ﷺ, a man
// of the people sneezed, and I said: may Allah have mercy on you; and the people threw their looks at me ... when the
// Messenger of Allah ﷺ had prayed, may my father and mother be his ransom, I never saw a teacher before him or after
// him who taught better than he; by Allah, he did not scold me, nor strike me, nor revile me; he said: in this prayer
// nothing of the talk of people is fitting (Sahih Muslim 537; the English page: a man in the company sneezed. I said:
// Allah have mercy on you! The people stared at me with disapproving looks ... I have seen a leader who gave better
// instruction ... he did not scold, beat or revile me but said: talking to persons is not fitting during the prayer).
// What he said next of the prayer, and all the rest of the hadith, are left out. No one is drawn: inside the masjid,
// under its roof of palm fronds on palm trunks, his place in front, a golden ring, and two rows of places behind him,
// Mu'awiya's place in the back row. A spark of the prayer rises from his place. A small puff of air comes by a place
// beside Mu'awiya's: a sneeze, and Mu'awiya's voice speaks in the prayer. Grey dotted lines of staring go to him from
// the places about him. His voice gives the taslim; a soft golden ring comes about his place, and glints: none taught
// better. His voice, soft and golden, never grey, speaks to Mu'awiya, a soft golden way goes to him, and a small light
// and a soft golden ring come about Mu'awiya's place.
function bestTeacher(): SignArt {
  const foot = 96;
  const his: [number, number] = [132, 101];
  const muawiya: [number, number] = [53, 112.6];
  const sneezed: [number, number] = [63, 112.6];
  const front: [number, number][] = [18, 28, 38, 48, 58, 68, 78, 88, 98].map((x): [number, number] => [x, 106]);
  const back: [number, number][] = [33, 43, 73, 83, 93, 103, 113].map((x): [number, number] => [x, 112.6]);
  return {
    kind: "best-teacher",
    ms: 12000,
    parts: [
      ...insideTheMasjid(foot),
      { name: "his place, in front, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of the front row", svg: places(front, 1.5) },
      { name: "the places of the back row", svg: places(back, 1.5) },
      { name: "Mu'awiya's place, in the back row", svg: someone(muawiya[0], muawiya[1], 1.5, MUAWIYA) },
      { name: "the place of one in the row, by Mu'awiya", svg: someone(sneezed[0], sneezed[1], 1.5) },
      { name: "Mu'awiya's voice: telling of it", svg: arcs(n(muawiya[0] + 3.2), n(muawiya[1] - 2.8), MUAWIYA), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      { name: "the prayer: a spark rising from his place", svg: glints([[his[0], n(his[1] - 5)]], 1.3), keys: sparkStays(0.04, 0.085), loop: twinkle(900) },
      { name: "a sneeze: a small puff of air by that place", svg: puff(sneezed[0], sneezed[1]), origin: { x: n(sneezed[0] + 2.2), y: n(sneezed[1] - 2.4) }, keys: puffKeys(0.15, 0.185) },
      { name: "Mu'awiya's voice in the prayer, to the one who sneezed", svg: arcsLeft(n(muawiya[0] - 3.2), n(muawiya[1] - 2.8), MUAWIYA), keys: showFor(0.19, 0.196, 0.3, 0.306), loop: speaking },
      {
        name: "staring: grey dotted lines to Mu'awiya from the places about him",
        svg:
          staring(`M38.6 107.6 Q46 108.2 ${n(muawiya[0] - 1.6)} ${n(muawiya[1] - 1.4)}`) +
          staring(`M48.4 107.8 Q49.6 110.4 ${n(muawiya[0] - 0.8)} ${n(muawiya[1] - 1.8)}`) +
          staring(`M58.2 107.8 Q57.4 110.2 ${n(muawiya[0] + 1)} ${n(muawiya[1] - 1.8)}`) +
          staring(`M44.8 112.6 L${n(muawiya[0] - 2)} ${muawiya[1]}`) +
          staring(`M71.4 111.8 Q64 108.8 ${n(muawiya[0] + 1.8)} ${n(muawiya[1] - 0.8)}`),
        keys: showFor(0.31, 0.322, 0.4, 0.412)
      },
      {
        name: "his voice: the taslim, to the right and to the left",
        svg: arcs(n(his[0] + 3.4), n(his[1] - 1.6), GOLD) + arcsLeft(n(his[0] - 3.4), n(his[1] - 1.6), GOLD),
        keys: showFor(0.418, 0.424, 0.51, 0.516),
        loop: speaking
      },
      { name: "none taught better: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 5, 3, SOFT_GOLD), keys: showAt(0.53, 0.542), loop: soft },
      {
        name: "and glints about it",
        svg: glints(
          [
            [n(his[0] - 6), n(his[1] - 5)],
            [n(his[0] + 6), n(his[1] - 5.4)],
            [his[0], n(his[1] - 8.6)]
          ],
          0.8
        ),
        keys: showAt(0.64, 0.652),
        loop: twinkle(1300)
      },
      { name: "his voice, soft and golden, never grey: to Mu'awiya", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3.4), SOFT_GOLD), keys: showFor(0.756, 0.762, 0.95, 0.956), loop: speaking },
      { name: "teaching kindly: a soft golden way from his place to Mu'awiya", svg: way(`M${n(his[0] - 3.4)} ${n(his[1] + 1.6)} Q96 118.6 ${n(muawiya[0] + 3.2)} ${n(muawiya[1] + 1.2)}`, SOFT_GOLD, 0.8), keys: showAt(0.77, 0.782) },
      { name: "taught: a small light on Mu'awiya's place", svg: lightIn(muawiya[0], n(muawiya[1] - 0.4), 2.6, WARM), keys: showAt(0.886, 0.898), loop: soft },
      { name: "and a soft golden ring about it", svg: care(muawiya[0], n(muawiya[1] + 0.6), 4.2, 2.6, SOFT_GOLD), keys: showAt(0.91, 0.922), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Mu'awiya ibn al-Hakam: while I was praying",
      "With him, a man in the company sneezed. I",
      "Said: Allah have mercy on you! The people",
      "Stared at me. When he had said the prayer,",
      "Neither before him nor after him have I",
      "Seen a leader who gave better instruction.",
      "He did not scold me but said: talking to",
      "Persons is not fitting during the prayer."
    ])
  };
}

// Sent as mercy. Abu Hurairah said: it was said: O Messenger of Allah, pray against the polytheists; he said: I was
// not sent as one who curses, I was only sent as a mercy (Sahih Muslim 2599; the English page: invoke curse upon the
// polytheists, whereupon he said: I have not been sent as the invoker of curse, but I have been sent as mercy). No one
// is drawn: the masjid of Madinah, his place before it, a golden ring, the place of someone who asked by him, Abu
// Hurairah's place far off, and homes far off with places by them. Abu Hurairah's voice tells of it, and the voice of
// the one who asked speaks. His voice, soft and golden, replies, never grey: no grey way goes from it. A soft golden
// ring comes about his place, then a soft light spreads wide from it over all the land, small lights come on the
// places far off, and glints over the homes: mercy.
function sentAsMercy(): SignArt {
  const hurairah: [number, number] = [10, 112];
  const his: [number, number] = [28, 106];
  const asker: [number, number] = [46, 108];
  const far: [number, number][] = [
    [100, 111],
    [112, 112.4],
    [130, 111],
    [144, 112.4]
  ];
  return {
    kind: "sent-as-mercy",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(70, 20) },
      { name: "a cloud", svg: cloud(122, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[14, 118.6], [62, 118], [120, 118.8], [152, 117.6]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      ...palms(
        [
          [64, 98, 13],
          [154, 99, 11]
        ],
        "Madinah"
      ),
      { name: "a home far off", svg: home(106, 99, 14, 11) },
      { name: "another home far off", svg: home(136, 99, 14, 11) },
      { name: "the places of those far off", svg: places(far, 1.5, FOLK) },
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of someone who asked, by him", svg: someone(asker[0], asker[1], 1.5, ASKER) },
      { name: "the asker's voice: asking", svg: arcs(n(asker[0] + 3.2), n(asker[1] - 2.8), ASKER), keys: showFor(0.11, 0.116, 0.33, 0.336), loop: speaking },
      { name: "his voice, soft and golden, never grey: replying", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.416, 0.422, 0.95, 0.956), loop: speaking },
      { name: "a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 4.6, 2.8, SOFT_GOLD), keys: showAt(0.62, 0.632), loop: soft },
      {
        name: "mercy: a soft light spreading wide from his place over all the land",
        svg: wash(84, 106, 84, 22, WARM, 0.08),
        origin: { x: his[0], y: his[1] },
        keys: track({
          opacity: [
            [0.81, 0],
            [0.83, 1]
          ],
          scale: [
            [0.81, 0.16],
            [0.88, 1]
          ]
        }),
        loop: soft
      },
      { name: "small lights on the places far off", svg: far.map(([x, y]) => lightIn(x, n(y - 0.4), 2.2, WARM)).join(""), keys: showAt(0.89, 0.902), loop: soft },
      {
        name: "and glints over the homes far off",
        svg: glints([
          [100, 84.6],
          [112, 85.4],
          [130, 84.6],
          [142, 85.4]
        ]),
        keys: showAt(0.92, 0.932),
        loop: twinkle()
      }
    ],
    words: linesOn(FIVE, [
      "Abu Hurairah: it was said to him: invoke",
      "Curse upon the polytheists, whereupon",
      "He said: I have not been sent as the",
      "Invoker of curse, but I have been sent",
      "As mercy."
    ])
  };
}

// Virtue and vice. An-Nawwas ibn Sam'an al-Ansari said: I asked the Messenger of Allah ﷺ about righteousness and sin,
// and he said: righteousness is good character, and sin is what wavers in your breast and you hate that people should
// see it (Sahih Muslim 2553; the English page: virtue is a kind disposition and vice is what rankles in your heart and
// that you disapprove that people should come to know of it). No one is drawn: the masjid of Madinah, his place before
// it, a golden ring, An-Nawwas's place by him, and places along a lane of the town. An-Nawwas's voice asks, and his
// voice, soft and golden, replies. Along the lane one place speaks softly to another; a small light comes on that one,
// and a soft golden ring about the one who was kind. In another place a grey flicker shows: what rankles within. Faint
// dotted lines of looking go to it from the places about, and it goes off away from them, and a grey dashed ring comes
// about it.
function virtueAndVice(): SignArt {
  const nawwas: [number, number] = [46, 108.6];
  const his: [number, number] = [28, 106];
  const kind: [number, number] = [76, 111];
  const heard: [number, number] = [90, 111.4];
  const uneasy: [number, number] = [116, 112];
  const goes: [number, number] = [34, -3];
  const about: [number, number][] = [
    [102, 113.6],
    [130, 113.4]
  ];
  const flicker = track({
    opacity: [
      [0.5, 0],
      [0.512, 1]
    ],
    xy: [
      [0.69, 0, 0],
      [0.74, goes[0], goes[1]]
    ]
  });
  return {
    kind: "virtue-and-vice",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(96, 20) },
      { name: "a cloud", svg: cloud(132, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 118], [64, 118.6], [104, 118.4], [148, 118.8]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      { name: "a home along the lane", svg: home(96, 99, 16, 12) },
      { name: "another home along the lane", svg: home(138, 99, 16, 12) },
      ...palms(
        [
          [64, 98, 12],
          [118, 99, 11]
        ],
        "Madinah"
      ),
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "An-Nawwas's place, by him", svg: someone(nawwas[0], nawwas[1], 1.5, NAWWAS) },
      { name: "An-Nawwas's voice: asking him", svg: arcs(n(nawwas[0] + 3.2), n(nawwas[1] - 2.8), NAWWAS), keys: showFor(0.024, 0.03, 0.2, 0.206), loop: speaking },
      { name: "his voice, soft and golden: replying", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.24, 0.246, 0.95, 0.956), loop: speaking },
      { name: "the place of one along the lane", svg: someone(kind[0], kind[1], 1.6, KIND) },
      { name: "the place of another along the lane", svg: someone(heard[0], heard[1], 1.5, FOLK) },
      { name: "the places of others along the lane", svg: places(about, 1.5, FOLK) },
      { name: "a kind way: its voice, soft, to the other", svg: arcs(n(kind[0] + 3.2), n(kind[1] - 2.8), KIND), keys: showFor(0.34, 0.346, 0.43, 0.436), loop: speaking },
      { name: "spoken to kindly: a small light on the other", svg: lightIn(heard[0], n(heard[1] - 0.4), 2.4, WARM), keys: showAt(0.38, 0.392), loop: soft },
      { name: "virtue: a soft golden ring about the one who was kind", svg: care(kind[0], n(kind[1] + 0.6), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.41, 0.422), loop: soft },
      { name: "what rankles within: a grey flicker in its place", svg: glow(uneasy[0], n(uneasy[1] - 0.2), 2.6, GREY, 0.34), keys: flicker, loop: { move: "twinkle", ms: 700, low: 0.35 } },
      {
        name: "the place of one more along the lane: going off away from the looks",
        svg: someone(uneasy[0], uneasy[1], 1.6, UNEASY),
        keys: track({
          xy: [
            [0.69, 0, 0],
            [0.74, goes[0], goes[1]]
          ]
        })
      },
      {
        name: "others coming to know of it: faint dotted lines of looking from them",
        svg:
          looking(`M${n(about[0][0] + 1.8)} ${n(about[0][1] - 1.2)} Q109 110.4 ${n(uneasy[0] - 2)} ${n(uneasy[1] - 0.6)}`) +
          looking(`M${n(about[1][0] - 1.8)} ${n(about[1][1] - 1.2)} Q123 110.6 ${n(uneasy[0] + 2)} ${n(uneasy[1] - 0.6)}`) +
          looking(`M${n(heard[0] + 1.8)} ${n(heard[1] - 1)} Q103 107.6 ${n(uneasy[0] - 1.6)} ${n(uneasy[1] - 1.6)}`),
        keys: showFor(0.66, 0.672, 0.744, 0.756)
      },
      { name: "vice: a grey dashed ring about it", svg: greyRing(n(uneasy[0] + goes[0]), n(uneasy[1] + goes[1] + 0.6), 4.2, 2.6), keys: showAt(0.83, 0.842) }
    ],
    words: linesOn(SIX, [
      "An-Nawwas ibn Sam'an: I asked him about",
      "Virtue and vice. He said:",
      "Virtue is a kind disposition and vice is",
      "What rankles in your heart and that you",
      "Disapprove that people should come to",
      "Know of it."
    ])
  };
}

// Screened at night. Abu Hurairah said: I heard the Messenger of Allah ﷺ say: all of my Ummah will be pardoned except
// those who make it public; and of making it public is that a man does a deed at night, then morning comes and Allah has
// screened it, and he says: O so-and-so, I did such and such last night; he spent the night with his Lord screening
// him, and he comes in the morning tearing away the screen of Allah from himself (Sahih al-Bukhari 6069; the English
// page: all the sins of my followers will be forgiven except those of the Mujahirin ... and though Allah screens it
// from the public, then he comes in the morning, and says, 'O so-and-so, I did such-and-such deed yesterday' ... and in
// the morning he removes Allah's screen from himself). The translator's notes are left out. No one is drawn, and
// nothing for Allah: the masjid of Madinah, his place before it, a golden ring, Abu Hurairah's place by him, and two
// homes of the town, each with a place before it. Abu Hurairah's voice tells of it, and his voice, soft and golden,
// speaks. Night comes, with the stars and the moon; a grey flicker shows in the place before the first home: a sin at
// night. A soft shade comes about it and the flicker dims: screened. Morning comes, and the shade is still about it.
// Its voice, quick and grey, speaks to the other place, and a grey dashed way goes to it: telling of it. The shade
// fades away and the flicker shows again, and a grey dashed ring comes about it.
function coveredAtNight(): SignArt {
  const hurairah: [number, number] = [46, 108.6];
  const his: [number, number] = [28, 106];
  const sinned: [number, number] = [100, 112];
  const told: [number, number] = [136, 112];
  const night = track({
    opacity: [
      [0.39, 0],
      [0.43, 1],
      [0.636, 1],
      [0.68, 0]
    ]
  });
  return {
    kind: "covered-at-night",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(70, 20) },
      { name: "a cloud", svg: cloud(122, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the night sky, and then morning", svg: `<rect width="160" height="64" fill="#1B2A50"/>`, keys: night },
      {
        name: "stars",
        svg: stars([
          [14, 12],
          [36, 26],
          [58, 8],
          [84, 20],
          [104, 10],
          [148, 18],
          [72, 38],
          [44, 42]
        ]),
        keys: night,
        loop: twinkle(1600)
      },
      { name: "the moon", svg: crescent(128, 24, 4, 2.2, "#FFF3C4"), keys: night },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 118.6], [66, 118], [118, 118.8], [152, 117.6]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      { name: "a home of the town", svg: home(100, 99, 16, 12) },
      { name: "another home of the town", svg: home(136, 99, 16, 12) },
      ...palms(
        [
          [68, 98, 13],
          [154, 99, 11]
        ],
        "Madinah"
      ),
      { name: "the night over the land, and then morning", svg: `<rect y="50" width="160" height="70" fill="#1B2A50" opacity="0.4"/>`, keys: night },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he heard", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.15, 0.156, 0.95, 0.956), loop: speaking },
      {
        name: "a sin at night: a grey flicker in its place, dimming, and showing again",
        svg: glow(sinned[0], n(sinned[1] - 0.2), 3.2, "#C4BCB3", 0.42),
        keys: track({
          opacity: [
            [0.44, 0],
            [0.452, 1],
            [0.52, 1],
            [0.54, 0.35],
            [0.88, 0.35],
            [0.91, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 700, low: 0.35 }
      },
      { name: "the place of one before the first home", svg: someone(sinned[0], sinned[1], 1.6, SINNED) },
      { name: "the place of so-and-so, before the other home", svg: someone(told[0], told[1], 1.6, TOLD) },
      {
        name: "screened: a soft shade about its place, and then fading away",
        svg: wash(sinned[0], n(sinned[1] - 0.6), 7.4, 5, "#24345E", 0.22),
        keys: track({
          opacity: [
            [0.512, 0],
            [0.532, 1],
            [0.88, 1],
            [0.91, 0]
          ]
        })
      },
      { name: "telling of it: its voice, quick and grey, to so-and-so", svg: arcs(n(sinned[0] + 3.2), n(sinned[1] - 2.8), GREY), keys: showFor(0.684, 0.69, 0.81, 0.816), loop: QUICK },
      { name: "a grey dashed way from it to so-and-so", svg: way(`M${n(sinned[0] + 3.6)} ${n(sinned[1] + 1)} Q118 116.6 ${n(told[0] - 3.6)} ${n(told[1] + 1)}`, GREY, 0.8), keys: showAt(0.756, 0.768) },
      { name: "made public: a grey dashed ring about it", svg: greyRing(sinned[0], n(sinned[1] + 0.6), 4.2, 2.6), keys: showAt(0.93, 0.942) }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: I heard him saying: all the",
      "Sins of my followers will be forgiven",
      "Except those of the Mujahirin. An example",
      "Is that a person commits a sin at night",
      "And though Allah screens it, then he comes",
      "In the morning, and says: O so-and-so, I",
      "Did such-and-such deed yesterday, and in",
      "The morning he removes Allah's screen."
    ])
  };
}

// The upper hand. Abu Umamah said: the Messenger of Allah ﷺ said: O son of Adam, that you spend what is more than you
// need is good for you, and that you hold it back is bad for you; and you are not blamed for having just enough; and
// begin with those you support; and the upper hand is better than the lower hand (Sahih Muslim 1036; the English page:
// O son of Adam, it is better for you if you spend your surplus, but if you withhold it, it is evil for you. There is
// no reproach for you for a living. And begin with your dependents; and the upper hand is better than the lower hand).
// The translator's notes are left out. No one is drawn: his place, a golden ring, by a palm, Abu Umamah's place far
// off, a home with coins by it, the place of one of it, and the places of its dependents in its yard, someone in need
// further off, and another home, with coins by it and its place before it. Abu Umamah's voice tells of it, and his
// voice, soft and golden, speaks. A soft golden way goes from the first home to the one in need, coins go along it, a
// spark rises from the one who spent, and a small light comes on the one in need. A grey dashed ring comes about the
// coins of the other home, held back, and about its place. A soft light comes about the few coins the first keeps: for
// a living. Coins go to its dependents, and small lights come on them. A soft golden ring comes about the one who gave,
// and glints.
function upperHand(): SignArt {
  const abuUmamah: [number, number] = [6, 112];
  const his: [number, number] = [22, 106];
  const giver: [number, number] = [58, 108];
  const kept: [number, number] = [65, 111];
  const surplus: [number, number] = [74, 110.6];
  const forThem: [number, number] = [79, 111];
  const dependents: [number, number][] = [
    [68, 115.4],
    [76, 115.8]
  ];
  const needy: [number, number] = [106, 112];
  const withholds: [number, number] = [126, 108];
  const heldBack: [number, number] = [140, 110.6];
  return {
    kind: "upper-hand",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(100, 22) },
      { name: "a cloud", svg: cloud(48, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[14, 119], [92, 118.6], [152, 118.8]]) },
      { name: "a home of the town", svg: home(72, 99, 18, 12) },
      { name: "another home of the town", svg: home(134, 99, 14, 11) },
      ...palms(
        [
          [36, 98, 13],
          [156, 99, 11]
        ],
        "the town"
      ),
      { name: "Abu Umamah's place, far off", svg: someone(abuUmamah[0], abuUmamah[1], 1.5, ABU_UMAMAH) },
      { name: "Abu Umamah's voice: telling what he said", svg: arcs(n(abuUmamah[0] + 3.2), n(abuUmamah[1] - 2.8), ABU_UMAMAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "his place, a golden ring, by a palm", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.06, 0.066, 0.95, 0.956), loop: speaking },
      { name: "the place of one of the first home", svg: someone(giver[0], giver[1], 1.6, GIVER) },
      { name: "a few coins it keeps, by its door", svg: coins(kept[0], kept[1], 2) },
      { name: "the places of its dependents, in its yard", svg: places(dependents, 1.3, FOLK) },
      { name: "the place of someone in need, further off", svg: someone(needy[0], needy[1], 1.5, FOLK) },
      { name: "the place of one of the other home", svg: someone(withholds[0], withholds[1], 1.6, WITHHOLDS) },
      { name: "coins by the other home", svg: coins(heldBack[0], heldBack[1], 3) + coins(n(heldBack[0] + 4.4), heldBack[1], 2) },
      { name: "spending: a soft golden way to the one in need", svg: way(`M${n(surplus[0] + 3)} ${n(surplus[1] + 1.8)} Q92 116.4 ${n(needy[0] - 3.4)} ${n(needy[1] + 1.4)}`, SOFT_GOLD, 0.9), keys: showAt(0.17, 0.182) },
      {
        name: "the surplus: coins going to the one in need",
        svg: coins(surplus[0], surplus[1], 3),
        keys: track({
          xy: [
            [0.186, 0, 0],
            [0.226, n(needy[0] - 4.6 - surplus[0]), n(needy[1] + 2 - surplus[1])]
          ]
        })
      },
      spark("spent: a spark rising from the one who spent", giver[0], n(giver[1] - 4.4), 0.2, 0.25),
      { name: "a small light on the one in need", svg: lightIn(needy[0], n(needy[1] - 0.4), 2.4, WARM), keys: showAt(0.234, 0.246), loop: soft },
      { name: "withheld: a grey dashed ring about the coins of the other home", svg: greyRing(n(heldBack[0] + 2.2), n(heldBack[1] - 0.6), 5.6, 2.8), keys: showAt(0.32, 0.332) },
      { name: "evil for it: a grey dashed ring about the one who withholds", svg: greyRing(withholds[0], n(withholds[1] + 0.6), 4.2, 2.6), keys: showAt(0.35, 0.362) },
      { name: "no reproach for a living: a soft light about the few coins it keeps", svg: glow(kept[0], n(kept[1] - 0.6), 3.6, WARM, 0.3), keys: showAt(0.47, 0.482), loop: soft },
      {
        name: "beginning with its dependents: coins going to them",
        svg: coins(forThem[0], forThem[1], 2),
        keys: track({
          xy: [
            [0.61, 0, 0],
            [0.65, -7, 4.8]
          ]
        })
      },
      { name: "small lights on its dependents", svg: dependents.map(([x, y]) => lightIn(x, n(y - 0.4), 2.2, WARM)).join(""), keys: showAt(0.66, 0.672), loop: soft },
      { name: "the better: a soft golden ring about the one who gave", svg: care(giver[0], n(giver[1] + 0.6), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.75, 0.762), loop: soft },
      {
        name: "and glints about it",
        svg: glints(
          [
            [n(giver[0] - 4.6), n(giver[1] - 4)],
            [n(giver[0] + 4.6), n(giver[1] - 4.4)]
          ],
          0.8
        ),
        keys: showAt(0.89, 0.902),
        loop: twinkle(1300)
      }
    ],
    words: linesOn(SEVEN, [
      "Abu Umamah: he said: O son of Adam, it is",
      "Better for you if you spend your surplus,",
      "But if you withhold it, it is evil for",
      "You. There is no reproach for you for a",
      "Living. And begin with your dependents;",
      "And the upper hand is better than the",
      "Lower hand."
    ])
  };
}

export const VIRTUE_ART = {
  "cut-ties": cutTies,
  "best-teacher": bestTeacher,
  "sent-as-mercy": sentAsMercy,
  "virtue-and-vice": virtueAndVice,
  "covered-at-night": coveredAtNight,
  "upper-hand": upperHand
} as const;
