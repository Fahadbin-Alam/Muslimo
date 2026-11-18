import { cloud, n, peaks, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, farOff, gardenIn, palms, tent, track } from "./daysArt";
import { date, soft, speaking } from "./fastArt";
import { road, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { kabah } from "./historyArt";
import { big, EIGHT, FOLK, glints, ITS_VOICE, linesOn, places, plainLand, rel, SEVEN, SIX, sparkStays, twinkle } from "./shareArt";
import { fronds, trunk } from "./learnArt";
import { howdah } from "./springArt";
import { acacia } from "./easeArt";
import { GREY } from "./lovedArt";
import { stall } from "./tradeArt";

/**
 * Wide mercy and what he promised: the bedouin who asked for mercy on himself and on him only, and was told he had
 * narrowed something vast; the lady in a howdah who would travel from al-Hirah to the Ka'bah fearing none but Allah,
 * as Adi lived to see; Abu Musa's newborn, named Ibrahim, given a date and blessed; the place made ready in Paradise for
 * whoever goes to the masjid morning and afternoon; Jabir's greeting, not returned while he prayed; Umar's vow of one
 * night of i'tikaf, made before Islam, and his word: fulfil it; and the boy too young for the pledge, blessed, whose
 * trade was blessed when he grew up. Only the land, the sky, buildings, things, plants and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head or a face: where someone was, a
 * ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. No one
 * is drawn on a camel: a closed howdah sits on its back. Nothing is drawn for Allah, and nothing comes down from the
 * sky: a prayer or a du'a is a spark that rises, what is good is a light, glints and a soft golden ring. Paradise is
 * only far off, in a soft circle of light with no sun in it. No name or word is written.
 */

/** The words of five lines. */
const FIVE = [
  [0.02, 0.2],
  [0.216, 0.396],
  [0.412, 0.592],
  [0.608, 0.788],
  [0.804, 1]
] as const;

/** The land from y `top` down, with tufts: plainLand's land, which starts at 61, moved down. */
const landFrom = (top: number, tufts: [number, number][]) =>
  plainLand("#E2CB9C", tufts)
    .replace('<rect y="61" width="160" height="59"', `<rect y="${top}" width="160" height="${120 - top}"`)
    .replace("M0 61 L160 61", `M0 ${top} L160 ${top}`);

/** Low hills far off behind Madinah, a range drawn before the land, so only their tops show over its edge. */
const farHills = () => peaks([[18, 9, 24], [50, 12, 30], [86, 8, 22], [116, 11, 28], [150, 9, 22]], 67, "#CDB892", false);

/** The masjid of Madinah from inside: its wall, its floor, palm trunks and a roof of palm fronds, the floor from y `foot`. */
const insideTheMasjid = (foot: number): SignArt["parts"] => [
  { name: "the sky over the masjid", svg: `<rect width="160" height="31" fill="#BFE3FA"/>` },
  { name: "clouds", svg: cloud(44, 16, 0.4, "#FFFFFF", 0.9) + cloud(122, 12, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
  { name: "the masjid's wall", svg: `<rect x="0" y="40" width="160" height="${foot - 40}" fill="#E5CFA6"/>` + [52, 64, 76, 88].map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#D6BD92" stroke-width="0.5"/>`).join("") },
  { name: "the floor of the masjid", svg: `<rect x="0" y="${foot}" width="160" height="${120 - foot}" fill="#EAD9B4"/><path d="M0 ${foot} L160 ${foot}" stroke="#C9AE80" stroke-width="0.6"/>` },
  { name: "a palm trunk holding up the roof 1", svg: trunk(10, 40, foot) },
  { name: "a palm trunk holding up the roof 2", svg: trunk(80, 40, foot) },
  { name: "a palm trunk holding up the roof 3", svg: trunk(150, 40, foot) },
  { name: "a roof of palm fronds", svg: fronds(0, 160) }
];

// You have narrowed something vast. Abu Hurairah said: the Messenger of Allah ﷺ stood up for the prayer and we stood
// up along with him. Then a bedouin said, while in the prayer: O Allah, have mercy on me and on Muhammad, and have mercy
// on no one else along with us. When the Prophet ﷺ had finished the prayer with the taslim, he said to the bedouin:
// you have narrowed something vast, meaning Allah's mercy (Sahih al-Bukhari 6010). No one is drawn: inside the masjid,
// under its roof of palm fronds on palm trunks. His place is in front and two rows of places behind him, all sitting,
// lower and flatter; his place stands up, a spark of the prayer rises, and the rows stand up with him. The bedouin's
// voice calls out from the back row; a small soft light comes about the bedouin's place and another about his place,
// and a tight dashed ring closes about each: for them and for no one else. His voice gives the taslim, and speaks to
// the bedouin; the tight rings go, and a soft light spreads wide over the whole masjid and all in it, with glints over
// all the rows: vast.
function youNarrowedWhatIsVast(): SignArt {
  const foot = 96;
  const his: [number, number] = [132, 101];
  const front: [number, number][] = [18, 28, 38, 48, 58, 68, 78, 88, 98].map((x): [number, number] => [x, 106]);
  const back: [number, number][] = [33, 43, 53, 63, 73, 83, 93, 103, 113].map((x): [number, number] => [x, 112.6]);
  const hurairah: [number, number] = [108, 106];
  const bedouin: [number, number] = [23, 112.6];
  // A place sitting is lower and flatter; standing, a full ring.
  const SIT = 0.62;
  const stand = () =>
    track({
      scaleY: [
        [0.15, SIT],
        [0.19, 1]
      ]
    });
  return {
    kind: "you-narrowed-what-is-vast",
    ms: 12000,
    parts: [
      ...insideTheMasjid(foot),
      {
        name: "his place, in front: standing up for the prayer",
        svg: ring(his[0], his[1], 2.6, GOLD),
        origin: { x: his[0], y: n(his[1] + 1.4) },
        keys: track({
          scaleY: [
            [0.034, SIT],
            [0.07, 1]
          ]
        })
      },
      { name: "the places of the front row: standing with him", svg: places(front, 1.5), origin: { x: 80, y: 107.5 }, keys: stand() },
      { name: "the places of the back row: standing with him", svg: places(back, 1.5), origin: { x: 80, y: 114.1 }, keys: stand() },
      { name: "Abu Hurairah's place, in the front row", svg: someone(hurairah[0], hurairah[1], 1.5, ITS_VOICE), origin: { x: 80, y: 107.5 }, keys: stand() },
      { name: "the bedouin's place, in the back row", svg: someone(bedouin[0], bedouin[1], 1.5, ITS_VOICE), origin: { x: 80, y: 114.1 }, keys: stand() },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      { name: "the prayer: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.3, "#FFE7A0"), keys: sparkStays(0.17, 0.205), loop: twinkle(900) },
      {
        name: "the bedouin's voice: calling out in the prayer",
        svg: arcs(n(bedouin[0] + 3.2), n(bedouin[1] - 2.8), ITS_VOICE) + big(arcs(n(bedouin[0] + 3.2), n(bedouin[1] - 2.8), ITS_VOICE), n(bedouin[0] + 3.2), n(bedouin[1] - 2.8), 1.6),
        keys: showFor(0.27, 0.278, 0.636, 0.644),
        loop: speaking
      },
      { name: "mercy asked for: a small soft light about the bedouin's place", svg: wash(bedouin[0], bedouin[1], 4.4, 2.8, WARM, 0.3), keys: showAt(0.392, 0.41), loop: soft },
      { name: "mercy asked for: a small soft light about his place", svg: wash(his[0], his[1], 5, 3.2, WARM, 0.3), keys: showAt(0.42, 0.44), loop: soft },
      {
        name: "and on no one else: a tight dashed ring about each of the two",
        svg: care(bedouin[0], n(bedouin[1] + 0.4), 3.6, 2.2, SOFT_GOLD) + care(his[0], n(his[1] + 0.4), 4.2, 2.6, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.515, 0],
            [0.535, 1],
            [0.76, 1],
            [0.78, 0]
          ]
        })
      },
      {
        name: "his voice: the taslim, to the right and to the left",
        svg: arcs(n(his[0] + 3.4), n(his[1] - 1.6), GOLD) + arcsLeft(n(his[0] - 3.4), n(his[1] - 1.6), GOLD),
        keys: showFor(0.636, 0.644, 0.688, 0.696),
        loop: speaking
      },
      { name: "his voice: you have narrowed something vast", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3.4), GOLD), keys: showAt(0.758, 0.766), loop: speaking },
      {
        name: "vast: a soft light spreading wide over the masjid and all in it",
        svg: wash(80, 100, 96, 40, WARM, 0.08),
        origin: { x: 80, y: 100 },
        keys: track({
          opacity: [
            [0.88, 0],
            [0.9, 1]
          ],
          scale: [
            [0.88, 0.16],
            [0.95, 1]
          ]
        }),
        loop: soft
      },
      {
        name: "vast: glints over all the rows",
        svg: glints([
          [30, 101.6],
          [60, 101.2],
          [90, 101.6],
          [120, 102],
          [46, 108.4],
          [76, 108.8],
          [106, 108.6],
          [140, 104]
        ]),
        keys: showAt(0.93, 0.95),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: he stood up for the prayer,",
      "And we stood up along with him.",
      "A bedouin said, while in the prayer:",
      "O Allah, have mercy on me and on him,",
      "And have mercy on no one else with us.",
      "When he had finished with the taslim,",
      "He said: you narrowed something vast,",
      "Meaning Allah's mercy."
    ])
  };
}

/** Al-Hirah far off on the right: a walled town with two domes and palms. */
const alHirah = () =>
  `<rect x="132" y="76" width="26" height="8" fill="#D9BE8E"/><path d="M132 76 L158 76" stroke="#BFA070" stroke-width="0.6"/>` +
  [134, 139, 144, 149, 154].map((x) => `<rect x="${x}" y="74.6" width="2.2" height="1.6" fill="#D9BE8E"/>`).join("") +
  `<path d="M137 76 Q140.4 70.6 143.8 76 Z" fill="#C9A66B"/><path d="M147 76 Q149.6 71.8 152.2 76 Z" fill="#C9A66B"/>` +
  `<rect x="143.2" y="80" width="2.4" height="4" fill="#8A6440"/>`;

// The lady from al-Hirah. Adi ibn Hatim said: while I was with the Prophet ﷺ, a man came and complained to him of
// poverty, and another came and complained of robbery on the roads. He said: Adi, have you been to al-Hirah? If you
// should live for a long time, you will certainly see a lady in a howdah travelling from al-Hirah until she does the
// tawaf of the Ka'bah, fearing none but Allah. Adi said: I saw a lady in a howdah travelling from al-Hirah until she
// did the tawaf of the Ka'bah, fearing none but Allah (Sahih al-Bukhari 3595; the treasures of Khosrau, the gold none
// would take and the rest are left out). No one is drawn, and no one on the camel: near, in Madinah, his place and
// Adi's place; far off across the desert, the walls and domes of al-Hirah on the right, the hills of Makkah and the
// Ka'bah on the left, and the long road between. His voice speaks to Adi, and glints show over al-Hirah; the sun goes
// over: a long time. A camel with a closed howdah shows at al-Hirah and goes along the whole road to Makkah; her place
// shows by the Ka'bah and goes round it, and a soft light comes about her place and the Ka'bah, and along the whole
// road: fearing none but Allah. Adi's voice tells of it, glints show along the road, and a soft golden ring comes
// about the Ka'bah: he saw it.
function aLadyFromAlHirah(): SignArt {
  const his: [number, number] = [70, 109];
  const adi: [number, number] = [86, 109.6];
  const k = 0.15;
  // The camel's feet along the road: at al-Hirah, then on toward Makkah, resting between the words.
  const start: [number, number] = [146, 85];
  const p1: [number, number] = [118, 85.6];
  const p2: [number, number] = [68, 88];
  const p3: [number, number] = [38, 89.4];
  const hump = ([x, y]: [number, number]): [number, number] => [n(x + 10 * k), n(y - 52 * k + 0.8)];
  const atKabah: [number, number] = [31, 91];
  const around: [number, number, number][] = [
    [0.548, 0, 0],
    [0.556, -9, 1.8],
    [0.564, -18, 0],
    [0.572, -9, -2.6],
    [0.576, 0, 0]
  ];
  return {
    kind: "a-lady-from-al-hirah",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#EFE2C2", 64) },
      {
        name: "the sun: going over, a long time",
        svg: sun(134, 18),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.2, -64, -2]
          ]
        })
      },
      { name: "a cloud", svg: cloud(90, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the hills of Makkah, far off on the left", svg: peaks([[4, 14, 14], [18, 18, 15], [34, 13, 14], [48, 10, 13], [62, 6, 12]], 81, "#BFA67C", false) },
      { name: "the desert, far off", svg: `<rect x="0" y="80" width="160" height="22" fill="#EAD7A8"/>` },
      { name: "al-Hirah, far off on the right: its walls and domes", svg: alHirah() },
      ...palms(
        [
          [128, 84, 9],
          [157, 84, 8]
        ],
        "al-Hirah"
      ),
      { name: "the road from al-Hirah to Makkah", svg: way("M150 85.4 C120 85.8 96 87.4 68 88.6 C52 89.4 40 90 30 91.2", "#F6E9C8", 1.4) },
      { name: "the court about the Ka'bah", svg: `<ellipse cx="24" cy="91.6" rx="15" ry="3.6" fill="#EFE6D2"/>` },
      { name: "the Ka'bah", svg: kabah(18, 90, 9) },
      { name: "Madinah, near: its ground", svg: landFrom(100, [[12, 114], [40, 117], [112, 115], [150, 116]]) },
      ...palms(
        [
          [54, 108, 15],
          [118, 108, 13]
        ],
        "Madinah"
      ),
      { name: "his place, near", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Adi's place, near", svg: someone(adi[0], adi[1], 1.6, ITS_VOICE) },
      { name: "his voice: Adi, have you been to al-Hirah?", svg: arcs(n(his[0] + 3.4), n(his[1] - 3), GOLD), keys: showFor(0.024, 0.032, 0.084, 0.09), loop: speaking },
      {
        name: "al-Hirah: glints over it, far off",
        svg: glints([
          [136, 72],
          [145, 69],
          [154, 72]
        ]),
        keys: showAt(0.05, 0.07),
        loop: twinkle()
      },
      {
        name: "a camel with a closed howdah: from al-Hirah, along the road to Makkah",
        svg: camel(start[0], start[1], k, true) + big(howdah(hump(start)[0], hump(start)[1], "#B5483A", "#E8C25A"), hump(start)[0], hump(start)[1], 0.86),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.29, 1]
          ],
          xy: [
            [0.29, 0, 0],
            [0.33, ...rel(start, p1)],
            [0.39, ...rel(start, p1)],
            [0.45, ...rel(start, p2)],
            [0.512, ...rel(start, p2)],
            [0.54, ...rel(start, p3)]
          ]
        }),
        loop: { move: "bob", ms: 1100, y: -0.3 }
      },
      {
        name: "her place: going round the Ka'bah",
        svg: someone(atKabah[0], atKabah[1], 1.2, "#8A3A2E"),
        keys: track({
          opacity: [
            [0.542, 0],
            [0.548, 1]
          ],
          xy: around
        })
      },
      { name: "fearing none: a soft light about her place and the Ka'bah", svg: wash(24, 89.6, 14, 6, WARM, 0.22), keys: showAt(0.636, 0.656), loop: soft },
      { name: "safe all the way: a soft light along the whole road", svg: way("M150 84.4 C120 84.8 96 86.4 68 87.6 C52 88.4 40 89 30 90.2", SOFT_GOLD, 0.6), keys: showAt(0.66, 0.69), loop: soft },
      { name: "Adi's voice: I saw it", svg: arcsLeft(n(adi[0] - 3.2), n(adi[1] - 2.8), ITS_VOICE), keys: showFor(0.756, 0.764, 0.94, 0.948), loop: speaking },
      {
        name: "he saw it: glints along the road",
        svg: glints([
          [140, 82.6],
          [110, 83.2],
          [84, 84.6],
          [56, 86.4]
        ]),
        keys: showAt(0.78, 0.8),
        loop: twinkle()
      },
      { name: "it came true: a soft golden ring about the Ka'bah", svg: care(24, 91.4, 13, 3.4, SOFT_GOLD), keys: showAt(0.88, 0.9), loop: soft },
      {
        name: "it came true: glints over the howdah",
        svg: glints([
          [n(p3[0] - 1), n(p3[1] - 14)],
          [n(p3[0] + 4), n(p3[1] - 12)]
        ]),
        keys: showAt(0.9, 0.92),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "He said: Adi, have you been to al-Hirah?",
      "If you should live for a long time,",
      "You will see a lady in a howdah",
      "Travel from al-Hirah",
      "Till she does tawaf of the Ka'bah,",
      "Fearing none but Allah.",
      "Adi: I saw a lady in a howdah",
      "Travel from al-Hirah till she did tawaf."
    ])
  };
}

// He named him Ibrahim. Abu Musa said: a son was born to me, and I took him to the Prophet ﷺ, who named him Ibrahim,
// did tahnik for him with a date, invoked Allah to bless him, and returned him to me. He was the eldest son of Abu
// Musa (Sahih al-Bukhari 5467). No one is drawn: his house in Madinah on the left, al-Ash'ari's home on the right, the
// road between, palms and the day. A soft light shows at al-Ash'ari's door, and the newborn's place shows there, small,
// as al-Ash'ari's voice tells of it; the two go along the road to his door. His voice speaks, and glints come over the
// newborn's place: named. A date goes from his place to the newborn's place: tahnik. His voice speaks, a spark of his
// du'a rises, and a soft golden ring comes about the newborn's place: blessed. The newborn's place goes back to
// al-Ash'ari's place, and the two go home, the ring with it; glints show about it at home: the eldest.
function heNamedHimIbrahim(): SignArt {
  const his: [number, number] = [40, 103.4];
  const ashari: [number, number] = [132.6, 104.6];
  const newborn: [number, number] = [126.4, 104.8];
  const ashariAtHim: [number, number] = [58, 104.6];
  const newbornAtHim: [number, number] = [50.6, 104.8];
  const newbornBack: [number, number] = [53.6, 104.8];
  // The newborn's way: shown at the door, along the road to his door, back to al-Ash'ari's side, and home.
  const newbornGoes = (opacity: [number, number][]) =>
    track({
      opacity,
      xy: [
        [0.17, 0, 0],
        [0.24, ...rel(newborn, newbornAtHim)],
        [0.744, ...rel(newborn, newbornAtHim)],
        [0.758, ...rel(newborn, newbornBack)],
        [0.764, ...rel(newborn, newbornBack)],
        [0.82, 0, 0]
      ]
    });
  return {
    kind: "he-named-him-ibrahim",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "a cloud", svg: cloud(122, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [70, 118], [140, 116]]) },
      ...palms(
        [
          [8, 100, 15],
          [96, 100, 17],
          [152, 100, 14]
        ],
        "Madinah"
      ),
      { name: "his house in Madinah", svg: home(34, 99, 30, 22) },
      { name: "al-Ash'ari's home", svg: home(130, 99, 24, 18, "#D8B07A", "#C29868") },
      { name: "the road between", svg: road(40, 160, 105) },
      { name: "his place, at his door", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "born: a soft light at al-Ash'ari's door", svg: wash(126.4, 101.6, 6, 4, WARM, 0.24), keys: showAt(0.03, 0.05), loop: soft },
      {
        name: "al-Ash'ari's place: along the road to his door, and home again",
        svg: someone(ashari[0], ashari[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.17, 0, 0],
            [0.24, ...rel(ashari, ashariAtHim)],
            [0.764, ...rel(ashari, ashariAtHim)],
            [0.82, 0, 0]
          ]
        })
      },
      {
        name: "the newborn's place, small",
        svg: someone(newborn[0], newborn[1], 1, FOLK),
        keys: newbornGoes([
          [0.05, 0],
          [0.07, 1]
        ])
      },
      { name: "al-Ash'ari's voice: telling of the newborn", svg: arcsLeft(n(ashari[0] - 3.2), n(ashari[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.1, 0.108), loop: speaking },
      { name: "his voice: naming him Ibrahim", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.312, 0.32, 0.384, 0.392), loop: speaking },
      {
        name: "named: glints over the newborn's place",
        svg: glints([
          [n(newbornAtHim[0] - 2.4), n(newbornAtHim[1] - 3)],
          [n(newbornAtHim[0] + 2.4), n(newbornAtHim[1] - 3.4)],
          [newbornAtHim[0], n(newbornAtHim[1] - 5)]
        ]),
        keys: showFor(0.33, 0.35, 0.744, 0.752),
        loop: twinkle()
      },
      {
        name: "tahnik: a date from his place to the newborn's place",
        svg: date(n(his[0] + 3.2), n(his[1] - 1.6)),
        keys: track({
          opacity: [
            [0.456, 0],
            [0.462, 1],
            [0.5, 1],
            [0.51, 0]
          ],
          xy: [
            [0.462, 0, 0],
            [0.498, n(newbornAtHim[0] - his[0] - 3.2), n(newbornAtHim[1] - his[1] + 0.6)]
          ]
        })
      },
      { name: "his voice: asking blessing for him", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.6, 0.608, 0.67, 0.678), loop: speaking },
      { name: "his du'a: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.4, "#FFE7A0"), keys: sparkStays(0.612, 0.645), loop: twinkle(900) },
      {
        name: "blessed: a soft golden ring about the newborn's place",
        svg: care(newborn[0], n(newborn[1] + 0.3), 3, 1.8, SOFT_GOLD),
        keys: newbornGoes([
          [0.65, 0],
          [0.672, 1]
        ]),
        loop: soft
      },
      {
        name: "the eldest: glints about the newborn's place, at home",
        svg: glints([
          [n(newborn[0] - 2.6), n(newborn[1] - 3)],
          [n(newborn[0] + 2.6), n(newborn[1] - 3.2)],
          [newborn[0], n(newborn[1] - 5)]
        ]),
        keys: showAt(0.89, 0.91),
        loop: twinkle()
      }
    ],
    words: linesOn(SEVEN, [
      "Abu Musa: a son was born to me,",
      "And I took the boy to him.",
      "He named him Ibrahim,",
      "Did tahnik for him with a date,",
      "Invoked Allah to bless him,",
      "And returned him to me.",
      "That was Abu Musa's eldest son."
    ])
  };
}

// A place made ready in Paradise. Abu Hurairah said that the Prophet ﷺ said: Allah will prepare for whoever goes to
// the masjid in the morning and in the afternoon an honorable place in Paradise, with good hospitality, every time he
// goes in the morning or the afternoon (Sahih al-Bukhari 662). No one is drawn: Madinah, the masjid on the left, a home
// on the right, the road between, palms and the day, with the sun low. His place is by the masjid, and his voice
// speaks. The place of one who goes to the masjid goes along the road from the home to it in the morning; it goes
// home, the sun goes over to the afternoon, and it goes to the masjid again. A glint rises from the masjid; far off,
// high up, a soft circle of light with a garden in it shows: Paradise, with a small home of light in it, glints about
// it and a dish of dates and fruit by it: the honorable place, with good hospitality. The place goes home and to the
// masjid once more, a glint rises again, and the home of light glows: every time.
function aPlaceMadeReady(): SignArt {
  const his: [number, number] = [14, 107];
  const atHome: [number, number] = [132, 106.4];
  const atMasjid: [number, number] = [30, 106.4];
  const goes = rel(atHome, atMasjid);
  const high: [number, number] = [100, 24];
  // A glint rising from the masjid toward the place made ready: it shows at `from`, rises from `up` to `to`, and goes.
  const glintRises = (from: number, up: number, to: number, gone: number) =>
    track({
      opacity: [
        [from, 0],
        [up, 1],
        [to, 1],
        [gone, 0]
      ],
      xy: [
        [up, 0, 0],
        [to, 40, -38]
      ]
    });
  return {
    kind: "a-place-made-ready",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun: in the morning, then over to the afternoon",
        svg: sun(148, 50),
        keys: track({
          xy: [
            [0.252, 0, 0],
            [0.27, -118, -10]
          ]
        })
      },
      { name: "a cloud", svg: cloud(52, 22, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[60, 116], [100, 118], [150, 116]]) },
      ...palms(
        [
          [64, 100, 15],
          [104, 100, 16],
          [156, 100, 13]
        ],
        "Madinah"
      ),
      { name: "the masjid", svg: madinahMasjid(6, 103, 0.9) },
      { name: "a home", svg: home(134, 102, 22, 16) },
      { name: "the road between", svg: road(26, 140, 107) },
      { name: "his place, by the masjid", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: whoever goes to the masjid", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.024, 0.032, 0.148, 0.156), loop: speaking },
      {
        name: "the place of one who goes to the masjid: morning and afternoon",
        svg: someone(atHome[0], atHome[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.1, ...goes],
            [0.22, ...goes],
            [0.25, 0, 0],
            [0.274, 0, 0],
            [0.31, ...goes],
            [0.81, ...goes],
            [0.84, 0, 0],
            [0.85, 0, 0],
            [0.885, ...goes]
          ]
        })
      },
      { name: "made ready for him: a glint rising from the masjid", svg: sparkle(30, 82, 1.2, "#FFE7A0"), keys: glintRises(0.42, 0.426, 0.5, 0.508) },
      { name: "Paradise far off: a soft circle of light with a garden", svg: farOff(high[0], high[1], 13) + gardenIn(high[0], high[1], 13), keys: showAt(0.612, 0.64) },
      { name: "an honorable place: a small home of light in it", svg: home(high[0], n(high[1] + 3.6), 7, 4.6, "#FFF3C0", "#E8C25A", "#E8C25A"), keys: showAt(0.645, 0.67) },
      {
        name: "an honorable place: glints about it",
        svg: glints([
          [n(high[0] - 6), n(high[1] - 3)],
          [n(high[0] + 6), n(high[1] - 4)]
        ]),
        keys: showAt(0.665, 0.685),
        loop: twinkle()
      },
      { name: "good hospitality: a dish of dates and fruit by it", svg: `<ellipse cx="${n(high[0] + 7)}" cy="${n(high[1] + 3.4)}" rx="3.2" ry="1" fill="#B8864A"/>` + date(n(high[0] + 6), n(high[1] + 2.6)) + date(n(high[0] + 7.8), n(high[1] + 2.4)) + `<circle cx="${n(high[0] + 7)}" cy="${n(high[1] + 1.6)}" r="0.9" fill="#C0392B"/>`, keys: showAt(0.69, 0.72) },
      { name: "every time: a glint rising from the masjid again", svg: sparkle(30, 82, 1.2, "#FFE7A0"), keys: glintRises(0.89, 0.896, 0.924, 0.932) },
      { name: "every time: the home of light glows", svg: wash(high[0], n(high[1] + 1.6), 9, 6, WARM, 0.26), keys: showAt(0.932, 0.952), loop: soft }
    ],
    words: linesOn(FIVE, [
      "He said: whoever goes to the masjid",
      "In the morning and in the afternoon,",
      "Allah will prepare for him",
      "An honorable place in Paradise,",
      "Every time he goes, morning or afternoon."
    ])
  };
}

// A greeting not returned. Jabir ibn Abdullah said: the Messenger of Allah ﷺ sent me on an errand of his, and when I
// had finished it I came back to the Prophet ﷺ and greeted him, but he did not return my greeting. I felt so sorry that
// only Allah knows it, and said to myself: perhaps the Messenger of Allah ﷺ is angry with me because I was slow. Then
// again I greeted him, and he did not reply, and I felt even more sorry than the first time. Again I greeted him, and
// he returned the greeting and said: the thing which prevented me from returning the greeting was that I was praying
// (Sahih al-Bukhari 1217; what Jabir said to himself, and that he was on his mount, are left out). No one is drawn: the
// open land with acacias, tents far off, and his place. His voice sends Jabir, and Jabir's place goes along the land to
// a tent far off; glints show at the tent: done, and it comes back. Jabir's voice greets him, and no voice answers; a
// grey shade comes about Jabir's place: sorry. Jabir's voice greets again, no voice answers, and the grey grows: more
// sorry. Jabir's voice greets a third time, and his voice answers; the grey goes, and a soft golden ring comes about
// Jabir's place. Only then, as his voice tells why, a spark rises from his place and a soft light comes about it: he
// was praying.
function aGreetingNotReturned(): SignArt {
  const his: [number, number] = [40, 104];
  const jabir: [number, number] = [54, 104.6];
  const errand: [number, number] = [130, 100.4];
  const back: [number, number] = [56, 104.6];
  const at = (opacity: [number, number][]) => track({ opacity });
  return {
    kind: "a-greeting-not-returned",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E8EEEA", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(96, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: peaks([[24, 9, 26], [92, 12, 34], [146, 8, 24]], 66, "#CDB892", false) },
      { name: "the open land", svg: plainLand("#E2CB9C", [[16, 114], [70, 117], [112, 115], [150, 116]]) },
      { name: "acacias", svg: acacia(16, 100, 12) + acacia(92, 98, 10) + acacia(150, 101, 11) },
      { name: "tents far off", svg: tent(122, 100, 10, 7) + tent(136, 100.6, 9, 6.4, "#E6D6B4") },
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: sending Jabir on an errand", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      {
        name: "Jabir's place: to a tent far off on the errand, and back",
        svg: someone(jabir[0], jabir[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.034, 0, 0],
            [0.088, ...rel(jabir, errand)],
            [0.16, ...rel(jabir, errand)],
            [0.208, ...rel(jabir, back)]
          ]
        })
      },
      {
        name: "the errand done: glints at the tent",
        svg: glints([
          [n(errand[0] - 3), n(errand[1] - 5)],
          [n(errand[0] + 3), n(errand[1] - 6)]
        ]),
        keys: showFor(0.146, 0.156, 0.2, 0.208),
        loop: twinkle()
      },
      { name: "Jabir's voice: greeting him, once", svg: arcsLeft(n(back[0] - 3.2), n(back[1] - 2.8), ITS_VOICE), keys: showFor(0.27, 0.278, 0.32, 0.328), loop: speaking },
      { name: "sorry: a grey shade about Jabir's place", svg: wash(back[0], back[1], 5, 3.2, GREY, 0.2), keys: at([[0.392, 0], [0.42, 1], [0.68, 1], [0.696, 0]]), loop: soft },
      { name: "Jabir's voice: greeting him again", svg: arcsLeft(n(back[0] - 3.2), n(back[1] - 2.8), ITS_VOICE), keys: showFor(0.512, 0.52, 0.56, 0.568), loop: speaking },
      { name: "more sorry: the grey shade grows", svg: wash(back[0], back[1], 7, 4.4, GREY, 0.18), keys: at([[0.54, 0], [0.57, 1], [0.68, 1], [0.696, 0]]), loop: soft },
      { name: "Jabir's voice: greeting him a third time", svg: arcsLeft(n(back[0] - 3.2), n(back[1] - 2.8), ITS_VOICE), keys: showFor(0.634, 0.642, 0.662, 0.67), loop: speaking },
      { name: "his voice: returning the greeting", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.67, 0.678), loop: speaking },
      { name: "a soft golden ring about Jabir's place", svg: care(back[0], n(back[1] + 0.4), 4, 2.4, SOFT_GOLD), keys: showAt(0.76, 0.78), loop: soft },
      { name: "he was praying: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 6), 1.3, "#FFE7A0"), keys: sparkStays(0.878, 0.91), loop: twinkle(900) },
      { name: "he was praying: a soft light about his place", svg: wash(his[0], his[1], 8, 4.4, WARM, 0.22), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Jabir: he sent me on an errand of his;",
      "When I had done it, I came back",
      "And greeted him, but he did not reply.",
      "I felt so sorry that only Allah knows it.",
      "Again I greeted him; he did not reply.",
      "Again I greeted him, and he replied,",
      "And said: what kept me from replying",
      "Was that I was praying."
    ])
  };
}

// Fulfil your vow. Ibn Umar said: Umar said: O Messenger of Allah, I vowed in the pre-Islamic period of ignorance to
// stay in i'tikaf for one night in al-Masjid al-Haram. The Prophet ﷺ said: fulfil your vow (Sahih al-Bukhari 6697; the
// lines keep the order of its Arabic, which names the time before the i'tikaf). No one is drawn: Makkah in the evening,
// its hills, the Ka'bah and its court; near, his place and Umar's place. Umar's voice speaks; a small dashed circle
// shows by the Ka'bah: the place of the vow, and a grey shade comes about it: made before Islam. The sky grows dark,
// with stars and the moon: one night; a soft light comes about the Ka'bah and its court: al-Masjid al-Haram. His voice
// speaks; the grey goes, a golden way goes from Umar's place to the place of the vow, and a soft golden ring comes
// about it: fulfil it.
function fulfilYourVow(): SignArt {
  const his: [number, number] = [124, 108];
  const umar: [number, number] = [138, 108.6];
  const vow: [number, number] = [60, 99];
  const hills: [number, number, number][] = [
    [6, 14, 18],
    [30, 18, 20],
    [54, 11, 18],
    [102, 12, 20],
    [126, 16, 20],
    [152, 11, 18]
  ];
  const night = () => showAt(0.416, 0.45);
  return {
    kind: "fulfil-your-vow",
    ms: 9000,
    parts: [
      { name: "the evening sky", svg: sky("#F3CFA4", "#F1DFC0", 62) },
      { name: "the night of the vow: the sky grows dark", svg: `<rect width="160" height="90" fill="#22305A"/>`, keys: night() },
      {
        name: "stars",
        svg: stars([
          [14, 12],
          [36, 24],
          [62, 10],
          [88, 20],
          [112, 8],
          [134, 22],
          [150, 12],
          [74, 34]
        ]),
        keys: showAt(0.45, 0.48),
        loop: twinkle(1600)
      },
      { name: "the moon: one night", svg: crescent(118, 34, 4, 2.2, "#FFF3C4"), keys: showAt(0.47, 0.5) },
      { name: "the hills of Makkah", svg: peaks(hills, 92, "#B89F78", false) },
      { name: "the hills of Makkah at night", svg: peaks(hills, 92, "#4A4A66", false), keys: night() },
      { name: "the land", svg: landFrom(90, [[16, 114], [96, 117], [150, 115]]) },
      { name: "the night over the land", svg: `<rect y="90" width="160" height="30" fill="#22305A" opacity="0.32"/>`, keys: night() },
      { name: "the court about the Ka'bah", svg: `<ellipse cx="78" cy="98.4" rx="40" ry="7" fill="#EFE6D2"/>` },
      { name: "the Ka'bah", svg: kabah(70, 97, 14) },
      { name: "his place, near", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Umar's place, near", svg: someone(umar[0], umar[1], 1.6, ITS_VOICE) },
      { name: "Umar's voice: I vowed", svg: arcsLeft(n(umar[0] - 3.2), n(umar[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.74, 0.748), loop: speaking },
      { name: "the place of the vow: a small dashed circle by the Ka'bah", svg: someone(vow[0], vow[1], 1.5, "#8A6A48"), keys: showAt(0.22, 0.25) },
      { name: "made before Islam: a grey shade about the place of the vow", svg: wash(vow[0], vow[1], 4.6, 3, GREY, 0.3), keys: track({ opacity: [[0.27, 0], [0.3, 1], [0.81, 1], [0.84, 0]] }) },
      { name: "al-Masjid al-Haram: a soft light about the Ka'bah and its court", svg: wash(78, 96, 34, 10, WARM, 0.14), keys: showAt(0.612, 0.65), loop: soft },
      { name: "his voice: fulfil your vow", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.808, 0.816), loop: speaking },
      { name: "fulfil it: a golden way from Umar's place to the place of the vow", svg: way("M135.6 107 C118 101.6 92 100.4 63 99.6", SOFT_GOLD, 0.7), keys: showAt(0.84, 0.87) },
      { name: "fulfil it: a soft golden ring about the place of the vow", svg: care(vow[0], n(vow[1] + 0.4), 4, 2.4, SOFT_GOLD), keys: showAt(0.88, 0.91), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Umar said: O Messenger of Allah,",
      "I vowed in the pre-Islamic period",
      "To stay in i'tikaf one night",
      "In al-Masjid al-Haram.",
      "He said: fulfil your vow."
    ])
  };
}

// Too young for the pledge. Abdullah ibn Hisham's mother, Zaynab bint Humayd, took him to the Messenger of Allah ﷺ and
// said: O Messenger of Allah, take the pledge of allegiance from him. He said: he is too young, and invoked Allah's
// blessing for him. Zuhrah ibn Ma'bad said that his grandfather, Abdullah ibn Hisham, would take him to the market to
// buy food, and Ibn Umar and Ibn az-Zubayr would meet him and say: be our partner, for the Prophet ﷺ invoked Allah's
// blessing for you; so he would be their partner, and very often he would win a camel's load as it was and send it
// home (Sahih al-Bukhari 2501; the hand on his head is not drawn). No one is drawn: his house in Madinah, the road to
// the market, palms and the day. Zaynab's place and the young one's place, small, come along the road to his door;
// her voice speaks, and his voice answers. A spark of his du'a rises, and a soft golden ring comes about the young
// one's place. They go; Abdullah's place shows at the market, grown; the places of Ibn Umar and Ibn az-Zubayr come to
// him, and their voice speaks; a dashed ring comes about the three: partners, and glints about Abdullah's place: the
// blessing. A camel bearing sacks goes from the market along the road, home: a camel's load.
function tooYoungForThePledge(): SignArt {
  const his: [number, number] = [40, 103.4];
  const zaynab: [number, number] = [96, 104.6];
  const young: [number, number] = [102, 105.2];
  const zaynabAtHim: [number, number] = [58, 104.6];
  const youngAtHim: [number, number] = [51, 105.2];
  const abdullah: [number, number] = [116, 104.6];
  const ibnUmar: [number, number] = [156, 104.2];
  const ibnZubayr: [number, number] = [158, 106.8];
  const ibnUmarAt: [number, number] = [129, 104.4];
  const ibnZubayrAt: [number, number] = [134, 106.6];
  const k = 0.17;
  const load: [number, number] = [120, 104.4];
  // The camel faces left, so its hump is to the right of its feet's middle.
  const hump = ([x, y]: [number, number]): [number, number] => [n(x + 10 * k), n(y - 52 * k)];
  const sacksOn = ([x, y]: [number, number]) => sack(n(x - 2.2), n(y + 2), 0.5, "#B8955A") + sack(n(x + 2.4), n(y + 2), 0.5, "#B8955A") + sack(x, n(y + 0.6), 0.55, "#C9A66B");
  return {
    kind: "too-young-for-the-pledge",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(84, 16) },
      { name: "a cloud", svg: cloud(58, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [70, 118], [140, 116]]) },
      ...palms(
        [
          [8, 100, 15],
          [68, 100, 16]
        ],
        "Madinah"
      ),
      { name: "his house in Madinah", svg: home(34, 99, 30, 22) },
      { name: "the market: its stalls", svg: stall(124, 18, "#B5483A", 84, 95) + stall(146, 18, "#4A6FA5", 84, 95) },
      { name: "sacks of food by the stalls", svg: sack(116, 101.6, 0.7) + sack(138, 101.6, 0.7, "#B8955A") + sack(154, 101.6, 0.7) },
      { name: "the road to the market", svg: road(40, 160, 105) },
      { name: "his place, at his door", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Zaynab's place: along the road to his door",
        svg: someone(zaynab[0], zaynab[1], 1.6, ITS_VOICE),
        keys: track({
          opacity: [
            [0.512, 1],
            [0.53, 0]
          ],
          xy: [
            [0.03, 0, 0],
            [0.085, ...rel(zaynab, zaynabAtHim)]
          ]
        })
      },
      {
        name: "the young one's place, small: along the road with her",
        svg: someone(young[0], young[1], 1, FOLK),
        keys: track({
          opacity: [
            [0.512, 1],
            [0.53, 0]
          ],
          xy: [
            [0.03, 0, 0],
            [0.085, ...rel(young, youngAtHim)]
          ]
        })
      },
      { name: "Zaynab's voice: take the pledge from him", svg: arcsLeft(n(zaynabAtHim[0] - 3.2), n(zaynabAtHim[1] - 2.8), ITS_VOICE), keys: showFor(0.146, 0.154, 0.2, 0.208), loop: speaking },
      { name: "his voice: he is too young", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.268, 0.276, 0.32, 0.328), loop: speaking },
      { name: "his du'a: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.4, "#FFE7A0"), keys: sparkStays(0.392, 0.425), loop: twinkle(900) },
      {
        name: "blessed: a soft golden ring about the young one's place",
        svg: care(youngAtHim[0], n(youngAtHim[1] + 0.3), 3, 1.8, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.43, 0],
            [0.452, 1],
            [0.512, 1],
            [0.53, 0]
          ]
        }),
        loop: soft
      },
      { name: "Abdullah's place, grown: at the market", svg: someone(abdullah[0], abdullah[1], 1.6, ITS_VOICE), keys: showAt(0.532, 0.55) },
      {
        name: "Ibn Umar's place: coming to Abdullah",
        svg: someone(ibnUmar[0], ibnUmar[1], 1.6),
        keys: track({
          opacity: [
            [0.632, 0],
            [0.64, 1]
          ],
          xy: [
            [0.64, 0, 0],
            [0.672, ...rel(ibnUmar, ibnUmarAt)]
          ]
        })
      },
      {
        name: "Ibn az-Zubayr's place: coming to Abdullah",
        svg: someone(ibnZubayr[0], ibnZubayr[1], 1.6),
        keys: track({
          opacity: [
            [0.632, 0],
            [0.64, 1]
          ],
          xy: [
            [0.64, 0, 0],
            [0.672, ...rel(ibnZubayr, ibnZubayrAt)]
          ]
        })
      },
      { name: "their voice: be our partner", svg: arcsLeft(n(ibnUmarAt[0] - 3), n(ibnUmarAt[1] - 3), "#6B4A2E"), keys: showFor(0.678, 0.686, 0.81, 0.818), loop: speaking },
      { name: "partners: a dashed ring about the three", svg: care(125, 105.6, 13, 3.8, SOFT_GOLD), keys: showAt(0.76, 0.78), loop: soft },
      {
        name: "the blessing: glints about Abdullah's place",
        svg: glints([
          [n(abdullah[0] - 3), n(abdullah[1] - 3.6)],
          [n(abdullah[0] + 3), n(abdullah[1] - 4)],
          [abdullah[0], n(abdullah[1] - 6)]
        ]),
        keys: showAt(0.79, 0.81),
        loop: twinkle()
      },
      {
        name: "a camel's load: a camel bearing sacks, going home",
        svg: camel(load[0], load[1], k, true) + sacksOn(hump(load)),
        keys: track({
          opacity: [
            [0.876, 0],
            [0.886, 1]
          ],
          xy: [
            [0.886, 0, 0],
            [0.95, -26, 0.4]
          ]
        }),
        loop: { move: "bob", ms: 1100, y: -0.3 }
      }
    ],
    words: linesOn(EIGHT, [
      "Zaynab took her son, Abdullah, to him",
      "And said: take the pledge from him.",
      "He said: he is too young for the pledge,",
      "And invoked Allah's blessing for him.",
      "Abdullah would go to market to buy food;",
      "Ibn Umar and Ibn az-Zubayr would say:",
      "Be our partner: he asked blessing for you.",
      "Often Abdullah would win a camel's load."
    ])
  };
}

export const WIDE_ART = {
  "you-narrowed-what-is-vast": youNarrowedWhatIsVast,
  "a-lady-from-al-hirah": aLadyFromAlHirah,
  "he-named-him-ibrahim": heNamedHimIbrahim,
  "a-place-made-ready": aPlaceMadeReady,
  "a-greeting-not-returned": aGreetingNotReturned,
  "fulfil-your-vow": fulfilYourVow,
  "too-young-for-the-pledge": tooYoungForThePledge
} as const;
