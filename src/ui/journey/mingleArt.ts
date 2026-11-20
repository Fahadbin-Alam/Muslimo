import { animalAt, cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, glints, linesOn, plainLand, SEVEN, SIX, sparkStays, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { coins, jar, stall } from "./tradeArt";
import { farHills } from "./wideArt";

/**
 * Mingle: forgiveness asked for the first row three times and for the second once; sheep, for in them is blessing;
 * merchants told to mix some charity with their selling; what your neighbors say of you; the one who mixes with the
 * folk and bears their annoyance with patience; and voices made beautiful in reciting. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn,
 * and nothing comes down from the sky: what is good is a light, glints, a soft golden ring and sparks that rise, and
 * what is not to be done has a grey dashed edge. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.34, 0.66],
  [0.68, 1]
] as const;

/** The places of the folk: a soft brown. */
const FOLK = "#9A8A70";
/** Al-Irbad's place and voice: a slate blue. */
const IRBAD = "#5E7E9A";
/** Umm Hani's place and voice: a rose brown. */
const UMM_HANI = "#9A5E6A";
/** Qays's place and voice: a sea green. */
const QAYS = "#4E7E6E";
/** The places of the other merchants: a warm brown and a plum. */
const MERCHANTS = ["#8E6A48", "#8E5A7A"];
/** The place of one in need: a pale brown. */
const NEED = "#A0907A";
/** Ibn Mas'ud's place and voice: an olive brown. */
const IBN_MASUD = "#7A6A4E";
/** The place of the one who asked, and of the other one: a blue and a violet. */
const ASKED = "#4E6E8E";
const OTHER = "#7A6AA0";
/** The places of those next door: a light brown. */
const NEXT_DOOR = "#B09070";
/** Ibn Umar's place and voice: a deep teal. */
const IBN_UMAR = "#3E6E7A";
/** The place of the one who mixes with the folk, and of the one apart: a warm brown and a moss green. */
const MIXES = "#8E6A48";
const APART = "#5E7A52";
/** Al-Bara's place and voice: a light slate blue, to show by night. */
const AL_BARA = "#7E9CC0";
/** The place of one reciting by its home at night: a pale sand. */
const RECITES = "#E0CFA8";
/** What is not to be done: a grey. */
const GREY = "#8C8C96";

/** How a voice that speaks from `on` until `off`, for each pair, shows and goes. */
const spoken = (spans: [number, number][]) =>
  spans.flatMap(([on, off]): [number, number][] => [
    [on, 0],
    [at3(on + 0.006), 1],
    [off, 1],
    [at3(off + 0.006), 0]
  ]);

/** A voice that speaks from `on` until `off`, for each pair. */
const voice = (spans: [number, number][]) => track({ opacity: spoken(spans) });

/** A voice that begins at `on` and goes on to the end. */
const voiceFrom = (on: number) => track({ opacity: [[on, 0], [at3(on + 0.006), 1]] });

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** Annoyance: three short grey jagged marks, their feet about (x, y). */
const annoyance = (x: number, y: number) =>
  [-2.2, 0, 2.2]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 3.4 - (i % 2) * 0.8);
      return `<path d="M${n(sx - 0.6)} ${y} L${n(sx + 0.5)} ${n(y - 1.2)} L${n(sx - 0.5)} ${n(y - 2.2)} L${n(sx + 0.6)} ${top}" stroke="#7E7E76" stroke-width="0.55" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");

/** The sky, the sun, a cloud, the far hills and the land of Madinah. */
const madinahDay = (sunAt: [number, number], cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** The speaker's place and voice, and his place, a golden ring, and his voice, soft and golden. */
const tellers = (who: string, at: [number, number], color: string, tells: [number, number], his: [number, number], speaks: [number, number]): SignPart[] => [
  { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
  { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([speaks]), loop: speaking },
  { name: `${who}'s place`, svg: someone(at[0], at[1], 1.5, color) },
  { name: `${who}'s voice: telling of it`, svg: arcs(n(at[0] + 2.4), n(at[1] - 3.2), color), keys: voice([tells]), loop: speaking }
];

// Forgiveness for the first row. Al-Irbad ibn Sariyah said: the Messenger of Allah ﷺ used to ask for forgiveness for
// the first row three times, and for the second row once (Sunan Ibn Majah 996). The page's English says "twice", but
// its Arabic says «وللثاني مرة», for the second once, as Sunan an-Nasa'i 817 does too, so the words and the scene
// follow the Arabic. No one is drawn: before the masjid of Madinah, far off, his place, a golden ring, leads, and the
// places of the folk stand behind it in two rows, Al-Irbad's at the end of the second. Al-Irbad's voice tells of it,
// and his voice, soft and golden, asks. A soft golden light comes over the first row, three times, and each time a
// glint stays over it; then a soft golden ring comes about it. A soft golden light comes over the second row, once,
// and one glint stays over it; then a soft golden ring comes about it.
function forgivenessForTheFirstRow(): SignArt {
  const his: [number, number] = [40, 99.4];
  const firstY = 95;
  const secondY = 104;
  const first = [56, 66, 76, 86, 96, 106];
  const second = [61, 71, 81, 91, 101];
  const irbad: [number, number] = [111, secondY];
  const times = [0.37, 0.45, 0.53];
  const glintAt: [number, number][] = [
    [66, 89.4],
    [81, 88.6],
    [96, 89.4]
  ];
  return {
    kind: "forgiveness-for-the-first-row",
    ms: 9000,
    parts: [
      ...madinahDay([132, 20], [52, 26]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(94, 84, 0.6) },
      ...palms(
        [
          [14, 92, 10],
          [148, 94, 11]
        ],
        "Madinah"
      ),
      ...times.map(
        (t, i): SignPart => ({
          name: `asked for the first row: a soft golden light over it ${i + 1}`,
          svg: wash(81, firstY, 30, 3.4, "#FFE2A8", 0.16),
          keys: showFor(t, at3(t + 0.01), at3(t + 0.04), at3(t + 0.05))
        })
      ),
      { name: "asked for the second row: a soft golden light over it", svg: wash(86, secondY, 30, 3.4, "#FFE2A8", 0.16), keys: showFor(0.72, 0.73, 0.76, 0.77) },
      { name: "his place, a golden ring, leading", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice, soft and golden: asking forgiveness", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: voice([[0.14, 0.94]]), loop: speaking },
      { name: "the places in the first row", svg: first.map((x) => someone(x, firstY, 1.4, FOLK)).join("") },
      { name: "the places in the second row", svg: second.map((x) => someone(x, secondY, 1.4, FOLK)).join("") },
      { name: "Al-Irbad's place, at the end of the second row", svg: someone(irbad[0], irbad[1], 1.5, IRBAD) },
      { name: "Al-Irbad's voice: telling of it", svg: arcs(n(irbad[0] + 2.4), n(irbad[1] - 3.2), IRBAD), keys: voice([[0.03, 0.11]]), loop: speaking },
      ...glintAt.map(
        ([x, y], i): SignPart => ({
          name: `each time: a glint over the first row ${i + 1}`,
          svg: glints([[x, y]], 1.3),
          keys: showAt(at3(times[i] + 0.005), at3(times[i] + 0.015)),
          loop: twinkle(1300 + i * 200)
        })
      ),
      { name: "the first row: a soft golden ring about it", svg: care(81, n(firstY + 0.4), 31, 2.8, SOFT_GOLD), keys: showAt(0.59, 0.602), loop: soft },
      { name: "once: a glint over the second row", svg: glints([[86, 99.4]], 1.3), keys: showAt(0.725, 0.735), loop: twinkle(1500) },
      { name: "the second row: a soft golden ring about it", svg: care(86, n(secondY + 0.4), 31, 2.8, SOFT_GOLD), keys: showAt(0.8, 0.812), loop: soft }
    ],
    words: linesOn(THREE, ["Al-Irbad: he used to ask for forgiveness", "For the first row three times", "And for the second row once."])
  };
}

// Keep sheep. Umm Hani said: the Prophet ﷺ said to her: keep sheep, for in them is blessing (Sunan Ibn Majah 2304).
// No one is drawn: a home, and by its door Umm Hani's place; his place, a golden ring, by it. Umm Hani's voice tells
// of it, and his voice, soft and golden, speaks. A small flock of sheep comes along the land to her home and grazes
// there. Glints come over the flock, a soft golden light over it, and a lamb by the flock: blessing; and a soft golden
// ring comes about her home.
function keepSheep(): SignArt {
  const homeAt: [number, number] = [64, 98];
  const ummHani: [number, number] = [56, 102.4];
  const his: [number, number] = [36, 102.4];
  const flock: [number, number, number][] = [
    [98, 106.4, 0.13],
    [114, 102.4, 0.12],
    [128, 106.6, 0.13],
    [144, 103, 0.12]
  ];
  const lamb: [number, number] = [106.6, 108.6];
  return {
    kind: "keep-sheep",
    ms: 8000,
    parts: [
      ...madinahDay([30, 18], [110, 24]),
      ...palms(
        [
          [14, 94, 10],
          [88, 90, 9],
          [154, 92, 10]
        ],
        "the land"
      ),
      { name: "her home", svg: home(homeAt[0], homeAt[1], 22, 14) },
      { name: "blessing: a soft golden light over the flock", svg: wash(121, 102.4, 32, 8, "#FFE2A8", 0.12), keys: showAt(0.74, 0.78), loop: soft },
      ...flock.map(
        ([x, y, s], i): SignPart => ({
          name: `a sheep, coming to her home and grazing ${i + 1}`,
          svg: sheep(x, y, s, true),
          origin: { x, y },
          keys: track({
            opacity: [
              [at3(0.36 + i * 0.01), 0],
              [at3(0.37 + i * 0.01), 1]
            ],
            xy: [
              [at3(0.36 + i * 0.01), 44, 0],
              [at3(0.5 + i * 0.02), 0, 0]
            ]
          }),
          loop: { move: "bob", ms: 2600 + i * 300, y: 0.3, phase: i / 4 }
        })
      ),
      { name: "and a lamb by the flock", svg: sheep(lamb[0], lamb[1], 0.075, true), origin: { x: lamb[0], y: lamb[1] }, keys: showAt(0.82, 0.85), loop: { move: "bob", ms: 2200, y: 0.25 } },
      {
        name: "glints over the flock",
        svg: glints(
          [
            [96, 93.2],
            [112, 89.6],
            [126, 93.4],
            [142, 90.2]
          ],
          1.2
        ),
        keys: showAt(0.72, 0.73),
        loop: twinkle()
      },
      { name: "a soft golden ring about her home", svg: care(homeAt[0], n(homeAt[1] + 0.6), 14, 2.4, SOFT_GOLD), keys: showAt(0.88, 0.892), loop: soft },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.1, 0.62]]), loop: speaking },
      { name: "Umm Hani's place, by her door", svg: someone(ummHani[0], ummHani[1], 1.5, UMM_HANI) },
      { name: "Umm Hani's voice: telling of it", svg: arcs(n(ummHani[0] + 2.4), n(ummHani[1] - 3.2), UMM_HANI), keys: voice([[0.03, 0.08]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Umm Hani: he said to her:", "Keep sheep,", "For in them is blessing!"])
  };
}

// Mix it with charity. Qays ibn Abi Gharazah said: at the time of the Messenger of Allah ﷺ we used to be called
// brokers, but the Messenger of Allah ﷺ passed by us and called us by a name that was better than that. He said: O
// merchants, selling involves oaths and idle talk, so mix some charity with it (Sunan Ibn Majah 2145). The words leave
// out the page's "(false)" and read "called us" for its "called". No one is drawn: in the market of Madinah, three
// stalls with their goods, and before them the places of three merchants, Qays's the first; by the end of the market,
// the place of one in need. Qays's voice tells of it, and their voices call over their goods. His place, a golden
// ring, comes along the market and stops before them, and his voice, soft and golden, speaks. A soft golden ring
// comes about each of their places: a better name. Grey arcs rise over the stalls: idle talk, then more: oaths. Coins
// go from each stall to the place of one in need: charity; the grey arcs grow faint, glints come over the stalls, and
// a soft golden ring about the place of one in need.
function mixItWithCharity(): SignArt {
  const stalls = [72, 100, 128];
  const sellers: [number, number][] = stalls.map((x): [number, number] => [x, 104.6]);
  const his: [number, number] = [44, 106];
  const comes: [number, number] = [-40, 0];
  const need: [number, number] = [150, 106];
  /** Where each stall's coins go: to the place of one in need. */
  const coinsFrom: [number, number][] = stalls.map((x): [number, number] => [n(x + 4.4), 89.6]);
  const coinsTo: [number, number][] = [
    [n(need[0] - 5.2), n(need[1] + 0.8)],
    [n(need[0] - 3.4), n(need[1] - 2.4)],
    [n(need[0] + 3.6), n(need[1] + 0.8)]
  ];
  const ringAt = (x: number, y: number) => care(x, n(y + 0.4), 3.6, 2.2, SOFT_GOLD);
  return {
    kind: "mix-it-with-charity",
    ms: 11000,
    parts: [
      ...madinahDay([24, 18], [96, 26]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(4, 84, 0.46) },
      ...palms(
        [
          [40, 90, 10],
          [148, 92, 10]
        ],
        "Madinah"
      ),
      ...stalls.map((x, i): SignPart => ({ name: `a stall in the market ${i + 1}`, svg: stall(x, 20, ["#7A6A9A", "#4E7E8E", "#9A6A4E"][i], 78, 91) })),
      { name: "the goods of the first stall", svg: coins(n(stalls[0] - 5), 90.6, 3) + jar(stalls[0], 91, 0.5, "#C98A4A") },
      { name: "the goods of the second stall", svg: `<rect x="${n(stalls[1] - 6.6)}" y="87.8" width="5" height="3.2" rx="0.6" fill="#5E7E8E"/><rect x="${n(stalls[1] - 1.4)}" y="88.4" width="4.6" height="2.6" rx="0.6" fill="#B65A4A"/>` + coins(n(stalls[1] + 6), 90.6, 2) },
      { name: "the goods of the third stall", svg: jar(n(stalls[2] - 4), 91, 0.55, "#B66A3C") + jar(n(stalls[2] + 1.6), 91, 0.45, "#C98A4A") + coins(n(stalls[2] + 6.4), 90.6, 2) },
      { name: "the place of one in need, by the end of the market", svg: someone(need[0], need[1], 1.5, NEED) },
      { name: "Qays's place, before the first stall", svg: someone(sellers[0][0], sellers[0][1], 1.5, QAYS) },
      ...sellers.slice(1).map(([x, y], i): SignPart => ({ name: `the place of a merchant before a stall ${i + 2}`, svg: someone(x, y, 1.5, MERCHANTS[i]) })),
      { name: "Qays's voice: telling of it", svg: arcs(n(sellers[0][0] + 2.4), n(sellers[0][1] - 3.2), QAYS), keys: voice([[0.03, 0.11]]), loop: speaking },
      {
        name: "their voices: calling over their goods",
        svg: sellers.map(([x, y], i) => arcs(n(x + 2.4), n(y - 3.2), [QAYS, ...MERCHANTS][i])).join(""),
        keys: showFor(0.18, 0.186, 0.25, 0.256),
        loop: speaking
      },
      {
        name: "his place, a golden ring, coming along the market and stopping before them",
        svg: ring(his[0], his[1], 2, GOLD),
        keys: track({
          opacity: [
            [0.31, 0],
            [0.316, 1]
          ],
          xy: [
            [0.31, comes[0], comes[1]],
            [0.4, 0, 0]
          ]
        })
      },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.46, 0.96]]), loop: speaking },
      { name: "a better name: a soft golden ring about each of their places", svg: sellers.map(([x, y]) => ringAt(x, y)).join(""), keys: showAt(0.6, 0.612), loop: soft },
      {
        name: "idle talk: grey arcs over the stalls",
        svg: stalls.map((x) => arcs(n(x + 2.6), 71.6, GREY)).join(""),
        keys: track({
          opacity: [
            [0.75, 0],
            [0.76, 1],
            [0.93, 1],
            [0.95, 0.35]
          ]
        }),
        loop: speaking
      },
      {
        name: "oaths: more grey arcs over the stalls",
        svg: stalls.map((x) => arcsLeft(n(x - 2.6), 71.2, GREY)).join(""),
        keys: track({
          opacity: [
            [0.79, 0],
            [0.8, 1],
            [0.93, 1],
            [0.95, 0.35]
          ]
        }),
        loop: speaking
      },
      ...coinsFrom.map(
        ([x, y], i): SignPart => ({
          name: `charity: coins going from a stall to the place of one in need ${i + 1}`,
          svg: coins(coinsTo[i][0], coinsTo[i][1], 2),
          keys: track({
            opacity: [
              [at3(0.888 + i * 0.008), 0],
              [at3(0.894 + i * 0.008), 1]
            ],
            xy: [
              [at3(0.888 + i * 0.008), n(x - coinsTo[i][0]), n(y - coinsTo[i][1])],
              [at3(0.92 + i * 0.008), 0, 0]
            ]
          })
        })
      ),
      {
        name: "mixed with charity: glints over the stalls",
        svg: glints(
          stalls.flatMap((x): [number, number][] => [
            [n(x - 8.6), 75.6],
            [n(x + 8.6), 75.6]
          ]),
          1.1
        ),
        keys: showAt(0.94, 0.95),
        loop: twinkle()
      },
      { name: "a soft golden ring about the place of one in need", svg: ringAt(need[0], need[1]), keys: showAt(0.945, 0.957), loop: soft }
    ],
    words: linesOn(SEVEN, [
      "Qays: at the time of the Messenger of",
      "Allah we used to be called brokers, but",
      "The Messenger of Allah passed by us and",
      "Called us by a name that was better than",
      "That. He said: O merchants, selling",
      "Involves oaths and idle talk, so mix",
      "Some charity with it."
    ])
  };
}

// What your neighbors say. Abdullah ibn Mas'ud said: a man said to the Messenger of Allah ﷺ: how can I know when I
// have done well and when I have done something bad? The Prophet ﷺ said: if you hear your neighbors saying that you
// have done well, then you have done well, and if you hear them saying that you have done something bad, then you have
// done something bad (Sunan Ibn Majah 4223). No one is drawn: in Madinah, two rows of three homes; by the middle home
// of each, the place of one who lives there, the first the one who asked; his place, a golden ring, and Ibn Mas'ud's
// place on the left. Ibn Mas'ud's voice tells of it, the voice of the one who asked asks, and his voice, soft and
// golden, speaks. The places of those next door to the one who asked come out by their homes, and their voices, soft
// and golden, come toward it: you have done well; a soft golden ring with glints comes about its place. The places of
// those next door to the other come out, and their voices, grey, come toward it: you have done something bad; a grey
// dashed ring comes about its place.
function whatYourNeighborsSay(): SignArt {
  const ibnMasud: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const homes = [50, 68, 86, 112, 130, 148];
  const placeY = 102.4;
  const asked: [number, number] = [68, placeY];
  const other: [number, number] = [130, placeY];
  const nextToAsked: [number, number][] = [
    [50, placeY],
    [86, placeY]
  ];
  const nextToOther: [number, number][] = [
    [112, placeY],
    [148, placeY]
  ];
  const toward = (list: [number, number][], color: string) => arcs(n(list[0][0] + 2.4), n(list[0][1] - 3.2), color) + arcsLeft(n(list[1][0] - 2.4), n(list[1][1] - 3.2), color);
  return {
    kind: "what-your-neighbors-say",
    ms: 12000,
    parts: [
      ...madinahDay([138, 18], [70, 26]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(26, 80, 0.4) },
      ...palms([[99, 88, 9]], "Madinah"),
      ...homes.map((x, i): SignPart => ({ name: `a home ${i + 1}`, svg: home(x, 96, 14, 10) })),
      { name: "the place of the one who asked, by its home", svg: someone(asked[0], asked[1], 1.5, ASKED) },
      { name: "its voice: asking", svg: arcs(n(asked[0] + 2.4), n(asked[1] - 3.2), ASKED), keys: voice([[0.15, 0.33]]), loop: speaking },
      { name: "the place of the other one, by its home", svg: someone(other[0], other[1], 1.5, OTHER) },
      { name: "the places of those next door to the one who asked, coming out by their homes", svg: nextToAsked.map(([x, y]) => someone(x, y, 1.4, NEXT_DOOR)).join(""), keys: showAt(0.4, 0.41) },
      { name: "their voices, soft and golden, toward it: you have done well", svg: toward(nextToAsked, SOFT_GOLD), keys: showFor(0.52, 0.526, 0.58, 0.586), loop: speaking },
      { name: "then you have done well: a soft golden ring about its place", svg: care(asked[0], n(asked[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showAt(0.64, 0.652), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [n(asked[0] - 4), n(asked[1] - 4.6)],
            [n(asked[0] + 4.4), n(asked[1] - 5.4)]
          ],
          1
        ),
        keys: showAt(0.66, 0.67),
        loop: twinkle()
      },
      { name: "the places of those next door to the other, coming out by their homes", svg: nextToOther.map(([x, y]) => someone(x, y, 1.4, NEXT_DOOR)).join(""), keys: showAt(0.68, 0.69) },
      { name: "their voices, grey, toward it: you have done something bad", svg: toward(nextToOther, GREY), keys: showFor(0.76, 0.766, 0.826, 0.832), loop: speaking },
      { name: "then you have done something bad: a grey dashed ring about its place", svg: greyRing(other[0], n(other[1] + 0.2), 3.8, 2.4), keys: showAt(0.89, 0.902) },
      ...tellers("Ibn Mas'ud", ibnMasud, IBN_MASUD, [0.024, 0.06], his, [0.39, 0.96])
    ],
    words: linesOn(EIGHT, [
      "Ibn Mas'ud: a man said to the Messenger",
      "Of Allah: how can I know when I have done",
      "Well and when I have done something bad?",
      "He said: if you hear your neighbors",
      "Saying that you have done well, then you",
      "Have done well, and if you hear them",
      "Saying that you have done something bad,",
      "Then you have done something bad."
    ])
  };
}

// Patient with the folk. Ibn Umar said: the Messenger of Allah ﷺ said: the believer who mixes with people and bears
// their annoyance with patience will have a greater reward than the believer who does not mix with people and does
// not put up with their annoyance (Sunan Ibn Majah 4032). No one is drawn: in Madinah, two stalls of the market, and
// among the places of the folk before them the place of one who mixes with them; on a hill apart, the place of
// another, alone; his place, a golden ring, and Ibn Umar's place on the left. Ibn Umar's voice tells of it, and his
// voice, soft and golden, speaks. Grey jagged marks of annoyance come toward the place among the folk from two sides,
// and are gone; a soft golden ring comes about it: patience, then a soft golden light and glints: a greater reward. A
// soft light picks out the place apart on the hill, and a smaller soft golden ring comes about it.
function patientWithPeople(): SignArt {
  const ibnUmar: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const mixes: [number, number] = [76, 103.6];
  const folk: [number, number][] = [
    [50, 101],
    [58, 107.4],
    [62, 96.8],
    [92, 100.6],
    [98, 107]
  ];
  const apart: [number, number] = [136, 89.4];
  return {
    kind: "patient-with-people",
    ms: 10000,
    parts: [
      ...madinahDay([118, 18], [58, 24]),
      { name: "a hill apart", svg: `<path d="M108 110 Q126 84 146 89 Q156 92 162 110 Z" fill="#D8BE8C"/><path d="M118 100 Q128 90 140 91" stroke="#C8AA78" stroke-width="0.6" fill="none"/>` },
      ...palms(
        [
          [44, 90, 10],
          [104, 90, 9]
        ],
        "Madinah"
      ),
      { name: "a stall in the market 1", svg: stall(58, 16, "#7A6A9A", 72, 84) },
      { name: "a stall in the market 2", svg: stall(92, 16, "#4E7E8E", 72, 84) },
      { name: "the places of the folk", svg: folk.map(([x, y]) => someone(x, y, 1.4, FOLK)).join("") },
      { name: "the place of one who mixes with the folk", svg: someone(mixes[0], mixes[1], 1.6, MIXES) },
      { name: "the place of one apart, alone on the hill", svg: someone(apart[0], apart[1], 1.6, APART) },
      {
        name: "annoyance: grey jagged marks coming toward its place from one side, then gone",
        svg: annoyance(n(mixes[0] - 5.4), n(mixes[1] + 0.2)),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.196, 1],
            [0.226, 1],
            [0.234, 0]
          ],
          xy: [
            [0.19, -10, -1.4],
            [0.222, 0, 0]
          ]
        })
      },
      {
        name: "annoyance: grey jagged marks coming toward its place from the other side, then gone",
        svg: annoyance(n(mixes[0] + 5.6), n(mixes[1] + 0.2)),
        keys: track({
          opacity: [
            [0.236, 0],
            [0.242, 1],
            [0.272, 1],
            [0.28, 0]
          ],
          xy: [
            [0.236, 10, -1.4],
            [0.268, 0, 0]
          ]
        })
      },
      { name: "with patience: a soft golden ring about its place", svg: care(mixes[0], n(mixes[1] + 0.4), 3.8, 2.3, SOFT_GOLD), keys: showAt(0.34, 0.352), loop: soft },
      { name: "a greater reward: a soft golden light about its place", svg: wash(mixes[0], n(mixes[1] - 1.4), 14, 6, "#FFE2A8", 0.14), keys: showAt(0.37, 0.41), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [n(mixes[0] - 4.6), n(mixes[1] - 5.6)],
            [n(mixes[0] + 4.8), n(mixes[1] - 6.2)],
            [mixes[0], n(mixes[1] - 8.6)]
          ],
          1
        ),
        keys: showAt(0.42, 0.43),
        loop: twinkle()
      },
      { name: "a soft light picking out the place apart on the hill", svg: glow(apart[0], apart[1], 5, "#FFF0C4", 0.22), keys: showFor(0.5, 0.52, 0.58, 0.6) },
      { name: "its reward: a smaller soft golden ring about its place", svg: care(apart[0], n(apart[1] + 0.4), 3, 1.8, SOFT_GOLD), keys: showAt(0.83, 0.842), loop: soft },
      ...tellers("Ibn Umar", ibnUmar, IBN_UMAR, [0.024, 0.06], his, [0.066, 0.96])
    ],
    words: linesOn(SIX, [
      "Ibn Umar: he said: the believer who mixes",
      "With people and bears their annoyance",
      "With patience will have a greater reward",
      "Than the believer who does not mix with",
      "People and does not put up with their",
      "Annoyance."
    ])
  };
}

// Beautiful voices. Al-Bara ibn Azib said: the Messenger of Allah ﷺ said: make your voices beautiful when you recite
// Quran (Sunan an-Nasa'i 1016). No one is drawn and no book is drawn: in Madinah by night, the masjid far off, two
// homes with a lamp's light in each window, and by the first the place of one at its home; his place, a golden ring,
// and Al-Bara's place on the left. Al-Bara's voice tells of it, and his voice, soft and golden, speaks. The voice of
// the one at its home rises, plain and grey; then it is soft and golden, with a warm glow and glints: made beautiful.
// A soft light comes about its place and its home as it recites, and a spark rises from its place.
function beautifulVoices(): SignArt {
  const alBara: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const homeAt: [number, number] = [84, 97];
  const otherHome: [number, number] = [130, 95];
  const recites: [number, number] = [97, 102.4];
  const voiceAt: [number, number] = [n(recites[0] + 2.4), n(recites[1] - 3.2)];
  const lamp = (x: number, y: number, w: number, h: number) => glow(n(x + 3.3), n(y - h + 3.7), 2.6, "#FFD98A", 0.5) + `<rect x="${n(x + 2)}" y="${n(y - h + 2.4)}" width="2.6" height="2.6" fill="#FFD98A" opacity="0.85"/>`;
  return {
    kind: "beautiful-voices",
    ms: 7000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [14, 18],
          [32, 30],
          [56, 14],
          [78, 28],
          [98, 16],
          [140, 32],
          [152, 14]
        ]),
        loop: twinkle(2400)
      },
      { name: "the moon: a crescent", svg: crescent(120, 20, 3.6, 2, "#F3E3C0") },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(34, 82, 0.44) },
      ...palms(
        [
          [62, 90, 9],
          [150, 92, 10]
        ],
        "Madinah"
      ),
      { name: "its home", svg: home(homeAt[0], homeAt[1], 20, 13) },
      { name: "another home", svg: home(otherHome[0], otherHome[1], 18, 12) },
      { name: "the night over the land", svg: `<rect y="56" width="160" height="64" fill="#0F1C3A" opacity="0.45"/>` },
      { name: "a lamp's light in each window", svg: lamp(homeAt[0], homeAt[1], 20, 13) + lamp(otherHome[0], otherHome[1], 18, 12), loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "as it recites: a soft light about its place and its home", svg: wash(n(homeAt[0] + 4), n(homeAt[1] + 1.6), 20, 8, "#FFE7A0", 0.1), keys: showAt(0.72, 0.76), loop: soft },
      { name: "the place of one at its home", svg: someone(recites[0], recites[1], 1.5, RECITES) },
      { name: "its voice, plain and grey", svg: arcs(voiceAt[0], voiceAt[1], "#9AA4B4"), keys: voice([[0.14, 0.38]]), loop: speaking },
      { name: "made beautiful: its voice, soft and golden", svg: arcs(voiceAt[0], voiceAt[1], SOFT_GOLD), keys: voiceFrom(0.38), loop: speaking },
      { name: "a warm glow about its voice", svg: glow(n(voiceAt[0] + 2.4), voiceAt[1], 5, "#FFE7A0", 0.18), keys: showAt(0.42, 0.45), loop: soft },
      {
        name: "and glints in it",
        svg: glints(
          [
            [n(voiceAt[0] + 5.6), n(voiceAt[1] - 3.4)],
            [n(voiceAt[0] + 2.6), n(voiceAt[1] - 5.8)]
          ],
          0.8
        ),
        keys: showAt(0.48, 0.49),
        loop: twinkle()
      },
      { name: "a spark rising from its place", svg: glints([[recites[0], n(recites[1] - 6)]], 1.4), keys: sparkStays(0.8, 0.84, 10), loop: twinkle(900) },
      ...tellers("Al-Bara", alBara, AL_BARA, [0.03, 0.1], his, [0.106, 0.96])
    ],
    words: linesOn(THREE, ["Al-Bara: he said:", "Make your voices beautiful", "When you recite Quran."])
  };
}

export const MINGLE_ART = {
  "forgiveness-for-the-first-row": forgivenessForTheFirstRow,
  "keep-sheep": keepSheep,
  "mix-it-with-charity": mixItWithCharity,
  "what-your-neighbors-say": whatYourNeighborsSay,
  "patient-with-people": patientWithPeople,
  "beautiful-voices": beautifulVoices
};
