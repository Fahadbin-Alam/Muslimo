import { cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, sparkStays, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { farHills } from "./wideArt";

/**
 * Praised: a night portion missed in sleep and recited between the Fajr prayer and the Zuhr prayer, written as if it
 * were recited in the night; the most merciful of his nation to his nation, and those of them who knew most and
 * recited best; what an excellent man each of seven Companions is; and the best of you, the best to his wives. Only
 * the land, the sky, buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not
 * even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter
 * is drawn, and nothing comes down from the sky: what is good is a light, glints, a soft golden ring and sparks that
 * rise, and what is not to be done has a grey dashed edge. No name, word or number is written.
 */

/** The words of five lines. */
const FIVE = [
  [0.014, 0.19],
  [0.204, 0.39],
  [0.404, 0.59],
  [0.604, 0.79],
  [0.804, 1]
] as const;

/** The words of nine lines. */
const NINE = [
  [0.012, 0.117],
  [0.121, 0.226],
  [0.23, 0.335],
  [0.339, 0.444],
  [0.448, 0.553],
  [0.557, 0.662],
  [0.666, 0.771],
  [0.775, 0.88],
  [0.884, 1]
] as const;

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.34, 0.66],
  [0.68, 1]
] as const;

/** Umar's place and voice: a light slate blue, to show by night and by day. */
const UMAR = "#7E9CC0";
/** The place of the one who slept: a violet. */
const SLEPT = "#7A6AA0";
/** Anas's place and voice: a sea green. */
const ANAS = "#4E7E6E";
/** Abu Hurairah's place and voice: a deep teal. */
const ABU_HURAIRAH = "#3E6E7A";
/** Aishah's place and voice: a rose brown. */
const AISHAH = "#9A5E6A";
/** The places of his nation: a soft brown. */
const NATION = "#B09070";
/** The places of the Companions he names: each its own color. */
const NAMED = ["#9A6A3E", "#4E6E8E", "#7A6A4E", "#3E6E7A", "#8E5A6E", "#3E7A6A", "#6A5E8E"];
/** What is not to be done: a grey. */
const GREY = "#8C8C96";
/** The places of one of you and of the one he is married to: a warm brown and a plum. */
const YOU = "#8E6A48";
const SPOUSE = "#8E5A7A";

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

// Missed at night. Umar ibn al-Khattab said: the Messenger of Allah ﷺ said: whoever slept, missing his section or
// some of it, then he recited it between the Fajr prayer and the Zuhr prayer, it is written for him as if he had
// recited it in the night (Jami at-Tirmidhi 581). The words read "missing" without the page's brackets: it gives the
// Arabic «عن», slept away from it. No one is drawn: in Madinah by night, the masjid far off, a home, and by it the
// place of one asleep, dim; his place, a golden ring, and Umar's place on the left. Umar's voice tells of it, and his
// voice, soft and golden, speaks. By its place, a faint dashed light: its section, missed. The night goes, and the
// dawn comes. A soft light shows at the masjid: the Fajr prayer. The place wakes, its voice, soft and golden, recites,
// the sun rises, and the light of its section fills, golden. The sun climbs high, and a soft light shows at the
// masjid again: the Zuhr prayer. A spark rises from its place: written for him. A soft round of the night, with small
// stars, comes about the spark: as if in the night; and a soft golden ring with glints comes about its place.
function missedAtNight(): SignArt {
  const umar: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const homeAt: [number, number] = [88, 97];
  const slept: [number, number] = [107, 100.8];
  const section: [number, number] = [101.4, 101.6];
  const sparkTop: [number, number] = [107, 82];
  const masjidLight: [number, number] = [18, 74];
  return {
    kind: "missed-at-night",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      {
        name: "the sun, rising and then high: from the Fajr prayer to the Zuhr prayer",
        svg: sun(128, 22),
        keys: track({
          opacity: [
            [0.47, 0],
            [0.5, 1]
          ],
          xy: [
            [0.47, 0, 34],
            [0.51, 0, 20],
            [0.61, 0, 20],
            [0.65, 0, 0]
          ]
        })
      },
      { name: "the night sky, until the dawn", svg: nightSky(62), keys: track({ opacity: [[0.3, 1], [0.36, 0]] }) },
      { name: "the dawn: a soft warm light low over the hills", svg: `<rect y="30" width="160" height="14" fill="#FFE0B0" opacity="0.4"/><rect y="44" width="160" height="18" fill="#FFC27A" opacity="0.6"/>`, keys: showFor(0.33, 0.36, 0.46, 0.52) },
      {
        name: "stars",
        svg: stars([
          [14, 18],
          [30, 30],
          [58, 14],
          [76, 28],
          [96, 16],
          [116, 34],
          [138, 14],
          [150, 30]
        ]),
        keys: track({ opacity: [[0.3, 1], [0.34, 0]] }),
        loop: twinkle(2400)
      },
      { name: "the moon: a crescent", svg: crescent(44, 22, 3.6, 2, "#F3E3C0"), keys: track({ opacity: [[0.3, 1], [0.34, 0]] }) },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(6, 82, 0.5) },
      ...palms(
        [
          [52, 90, 10],
          [146, 92, 11]
        ],
        "Madinah"
      ),
      { name: "its home", svg: home(homeAt[0], homeAt[1], 22, 14) },
      { name: "the night over the land", svg: `<rect y="56" width="160" height="64" fill="#0F1C3A" opacity="0.45"/>`, keys: track({ opacity: [[0.3, 1], [0.36, 0]] }) },
      { name: "the Fajr prayer: a soft light at the masjid", svg: glow(masjidLight[0], masjidLight[1], 9, "#FFF0C4", 0.14), keys: showFor(0.408, 0.424, 0.46, 0.48), loop: soft },
      { name: "the Zuhr prayer: a soft light at the masjid", svg: glow(masjidLight[0], masjidLight[1], 9, "#FFF0C4", 0.14), keys: showAt(0.655, 0.67), loop: soft },
      { name: "its section, missed: a faint dashed light by its place", svg: care(section[0], section[1], 1.8, 1.8, "#C4C4CC"), keys: showFor(0.215, 0.23, 0.5, 0.55) },
      {
        name: "recited: the light of its section, filled and golden",
        svg: glow(section[0], section[1], 3.6, "#FFE7A0", 0.16) + `<circle cx="${section[0]}" cy="${section[1]}" r="1.4" fill="#FFE7A0"/>`,
        keys: showAt(0.5, 0.55),
        loop: soft
      },
      {
        name: "the place of one who slept, by its home: dim until it wakes",
        svg: someone(slept[0], slept[1], 1.6, SLEPT),
        keys: track({
          opacity: [
            [0.43, 0.42],
            [0.44, 1]
          ]
        })
      },
      { name: "its voice, soft and golden, reciting", svg: arcs(n(slept[0] + 2.4), n(slept[1] - 3.2), SOFT_GOLD), keys: voice([[0.448, 0.552]]), loop: speaking },
      {
        name: "as if in the night: a soft round of the night about the spark, with small stars",
        svg:
          `<circle cx="${sparkTop[0]}" cy="${sparkTop[1]}" r="7" fill="#16284C" opacity="0.82"/>` +
          stars([
            [n(sparkTop[0] - 4), n(sparkTop[1] - 3)],
            [n(sparkTop[0] + 4.2), n(sparkTop[1] - 3.6)],
            [n(sparkTop[0] - 3.4), n(sparkTop[1] + 3.6)],
            [n(sparkTop[0] + 3.6), n(sparkTop[1] + 3.2)]
          ]),
        keys: showAt(0.81, 0.835),
        loop: soft
      },
      { name: "written for it: a spark rising from its place", svg: glints([[sparkTop[0], n(sparkTop[1] + 10)]], 1.4), keys: sparkStays(0.69, 0.73, 10), loop: twinkle(900) },
      { name: "a soft golden ring about its place", svg: care(slept[0], n(slept[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showAt(0.85, 0.862), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [n(slept[0] - 4), n(slept[1] - 4.6)],
            [n(slept[0] + 4.4), n(slept[1] - 5.4)]
          ],
          1
        ),
        keys: showAt(0.875, 0.885),
        loop: twinkle()
      },
      ...tellers("Umar", umar, UMAR, [0.024, 0.06], his, [0.066, 0.96])
    ],
    words: linesOn(FIVE, [
      "Umar: he said: whoever slept, missing his",
      "Section or some of it, then he",
      "Recited it between the Fajr prayer and",
      "The Zuhr prayer, it is written for him",
      "As if he had recited it in the night."
    ])
  };
}

// The most merciful of my nation. Anas ibn Malik said: the Messenger of Allah ﷺ said: the most merciful of my nation
// to my nation is Abu Bakr, and the most severe of them concerning the order of Allah is Umar ... The most
// knowledgeable of them concerning the lawful and unlawful is Mu'adh bin Jabal, the most knowledgeable of them
// concerning inheritance is Zaid bin Thabit, the best reciter among them is Ubayy bin Ka'b (Jami at-Tirmidhi 3790).
// The words leave out Uthman's modesty, so that they fit, and the trustworthy one of this nation, Abu Ubaydah, whose
// own scene is the trustworthy one; and "(the laws of)" and "(of the Qur'an)". No one is drawn, and nothing for
// Allah: in Madinah, the masjid far off, three homes, and the places of his nation about the land, with five places
// among them; his place, a golden ring, and Anas's place on the left. Anas's voice tells of it, and his voice, soft
// and golden, speaks. A soft golden ring comes about Abu Bakr's place, and a soft warm light spreads from it over the
// places of the nation: the most merciful to them. A soft golden ring comes about Umar's place, and a strong ring
// about it: the most severe concerning the order of Allah. Two short ways show by Mu'adh's place, one edged in soft
// gold, the lawful, and one with a grey dashed edge, the unlawful, and a soft golden ring comes about it. A sack of
// wealth shows, and a soft golden ring comes about Zayd's place; three shares go from the sack to the three homes:
// inheritance. A soft golden ring comes about Ubayy's place, and its voice, soft and golden, recites: the best reciter.
function mostMerciful(): SignArt {
  const anas: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const [abuBakr, umar, muadh, zayd, ubayy]: [number, number][] = [
    [46, 101.6],
    [68, 104],
    [90, 101.6],
    [112, 104],
    [136, 101.6]
  ];
  const nation: [number, number][] = [
    [38, 94.6],
    [52, 96.4],
    [64, 93.6],
    [78, 96.2],
    [100, 95.6],
    [56, 108.6],
    [82, 109],
    [104, 108.8],
    [128, 109]
  ];
  const homes: [number, number][] = [
    [104, 88],
    [124, 86],
    [146, 88]
  ];
  const sackAt: [number, number] = [124, 97.4];
  const named = (x: number, y: number) => care(x, n(y + 0.4), 3.4, 2, SOFT_GOLD);
  return {
    kind: "most-merciful-of-my-nation",
    ms: 12000,
    parts: [
      ...madinahDay([30, 18], [100, 26]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(46, 84, 0.72) },
      ...palms(
        [
          [14, 92, 10],
          [88, 88, 9],
          [156, 96, 11]
        ],
        "Madinah"
      ),
      ...homes.map(([x, y], i): SignPart => ({ name: `a home ${i + 1}`, svg: home(x, y, 12, 9) })),
      {
        name: "the most merciful of his nation to his nation: a soft warm light, spreading from Abu Bakr's place over theirs",
        svg: wash(abuBakr[0], n(abuBakr[1] - 3), 40, 12, "#FFE2A8", 0.12),
        origin: { x: abuBakr[0], y: n(abuBakr[1] - 3) },
        keys: track({
          opacity: [
            [0.142, 0],
            [0.15, 1]
          ],
          scale: [
            [0.142, 0.25],
            [0.19, 1]
          ]
        }),
        loop: soft
      },
      { name: "the places of his nation, about the land", svg: nation.map(([x, y]) => someone(x, y, 1.3, NATION)).join("") },
      { name: "Abu Bakr's place", svg: someone(abuBakr[0], abuBakr[1], 1.6, NAMED[0]) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6, NAMED[1]) },
      { name: "Mu'adh's place", svg: someone(muadh[0], muadh[1], 1.6, NAMED[5]) },
      { name: "Zayd's place", svg: someone(zayd[0], zayd[1], 1.6, NAMED[4]) },
      { name: "Ubayy's place", svg: someone(ubayy[0], ubayy[1], 1.6, NAMED[6]) },
      { name: "Abu Bakr: a soft golden ring about his place", svg: named(...abuBakr), keys: showAt(0.126, 0.138), loop: soft },
      { name: "Umar: a soft golden ring about his place", svg: named(...umar), keys: showAt(0.345, 0.357), loop: soft },
      {
        name: "the most severe concerning the order: a strong ring about Umar's place",
        svg: `<ellipse cx="${umar[0]}" cy="${n(umar[1] + 0.4)}" rx="5" ry="3" stroke="${SOFT_GOLD}" stroke-width="1.2" fill="none"/>`,
        keys: showAt(0.362, 0.374)
      },
      {
        name: "the lawful: a short way by Mu'adh's place, edged in soft gold",
        svg: way(`M${n(muadh[0] - 2)} ${n(muadh[1] - 1.2)} Q${n(muadh[0] - 6)} ${n(muadh[1] - 4)} ${n(muadh[0] - 9)} ${n(muadh[1] - 8.4)}`, "#F2D27A", 0.9),
        keys: showAt(0.456, 0.47)
      },
      {
        name: "the unlawful: a short way by Mu'adh's place, with a grey dashed edge",
        svg: way(`M${n(muadh[0] + 2)} ${n(muadh[1] - 1.2)} Q${n(muadh[0] + 6)} ${n(muadh[1] - 4)} ${n(muadh[0] + 9)} ${n(muadh[1] - 8.4)}`, GREY, 0.9),
        keys: showAt(0.562, 0.574)
      },
      { name: "Mu'adh: a soft golden ring about his place", svg: named(...muadh), keys: showAt(0.585, 0.597), loop: soft },
      { name: "wealth to be shared: a sack", svg: sack(sackAt[0], sackAt[1], 0.9), keys: showAt(0.672, 0.686) },
      { name: "Zayd: a soft golden ring about his place", svg: named(...zayd), keys: showAt(0.782, 0.794), loop: soft },
      ...homes.map(
        ([x, y], i): SignPart => ({
          name: `inheritance: a share of the wealth, going to a home ${i + 1}`,
          svg: sack(n(x + 4.6), y, 0.42, "#D6B47A"),
          keys: track({
            opacity: [
              [0.8, 0],
              [0.806, 1]
            ],
            xy: [
              [0.8, n(sackAt[0] - x - 4.6), n(sackAt[1] - 2 - y)],
              [0.84, 0, 0]
            ]
          })
        })
      ),
      { name: "Ubayy: a soft golden ring about his place", svg: named(...ubayy), keys: showAt(0.89, 0.902), loop: soft },
      { name: "the best reciter: Ubayy's voice, soft and golden, reciting", svg: arcs(n(ubayy[0] + 2.4), n(ubayy[1] - 3.2), SOFT_GOLD), keys: voiceFrom(0.905), loop: speaking },
      ...tellers("Anas", anas, ANAS, [0.024, 0.06], his, [0.066, 0.96])
    ],
    words: linesOn(NINE, [
      "Anas: he said: the most merciful of my",
      "Nation to my nation is Abu Bakr, and the",
      "Most severe of them concerning the order",
      "Of Allah is Umar. The most knowledgeable",
      "Of them concerning the lawful and",
      "Unlawful is Mu'adh bin Jabal, the most",
      "Knowledgeable of them concerning",
      "Inheritance is Zaid bin Thabit, the best",
      "Reciter among them is Ubayy bin Ka'b."
    ])
  };
}

// What an excellent man. Abu Hurairah said: the Messenger of Allah ﷺ said: what an excellent man is Abu Bakr, what an
// excellent man is Umar, what an excellent man is Abu Ubaidah bin Al-Jarrah, what an excellent man is Usaid bin
// Hudair, what an excellent man is Thabit bin Qais bin Shammas, what an excellent man is Mu'adh bin Jabal, and what
// an excellent man is Mu'adh bin Amr bin Al-Jamuh (Jami at-Tirmidhi 3795). The words read "Mu'adh" for the page's
// "Mua'dh". No one is drawn: in Madinah, the masjid, and before it seven places; his place, a golden ring, and Abu
// Hurairah's place on the left. Abu Hurairah's voice tells of it, and his voice, soft and golden, speaks. As each is
// named, a soft golden ring comes about its place, and a spark rises from it: praised. Then glints show over them
// all.
function whatAnExcellentMan(): SignArt {
  const abuHurairah: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const seven: [string, number, number, number][] = [
    ["Abu Bakr", 44, 100.4, 0.128],
    ["Umar", 58, 104.6, 0.237],
    ["Abu Ubaydah", 72, 100.4, 0.346],
    ["Usayd", 86, 104.8, 0.455],
    ["Thabit", 100, 100.4, 0.564],
    ["Mu'adh ibn Jabal", 114, 104.6, 0.69],
    ["Mu'adh ibn Amr", 128, 100.4, 0.89]
  ];
  return {
    kind: "what-an-excellent-man",
    ms: 12000,
    parts: [
      ...madinahDay([142, 18], [36, 24]),
      { name: "the masjid of Madinah", svg: madinahMasjid(62, 86, 0.8) },
      ...palms(
        [
          [40, 90, 10],
          [136, 90, 10],
          [154, 96, 12]
        ],
        "Madinah"
      ),
      ...seven.map(([who, x, y], i): SignPart => ({ name: `${who}'s place`, svg: someone(x, y, 1.6, NAMED[i]) })),
      ...seven.flatMap(([who, x, y, at]): SignPart[] => [
        { name: `${who}: a soft golden ring about his place`, svg: care(x, n(y + 0.4), 3.4, 2, SOFT_GOLD), keys: showAt(at, at3(at + 0.012)), loop: soft },
        { name: `praised: a spark rising from ${who}'s place`, svg: glints([[x, n(y - 4)]], 1.3), keys: sparkStays(at3(at + 0.015), at3(at + (at > 0.68 && at < 0.7 ? 0.048 : 0.05)), 8), loop: twinkle(900) }
      ]),
      {
        name: "glints over them all",
        svg: glints(
          seven.map(([, x, y]): [number, number] => [n(x + 3), n(y - 9.6)]),
          0.9
        ),
        keys: showAt(0.945, 0.955),
        loop: twinkle()
      },
      ...tellers("Abu Hurairah", abuHurairah, ABU_HURAIRAH, [0.016, 0.034], his, [0.04, 0.96])
    ],
    words: linesOn(NINE, [
      "Abu Hurairah: he said: what an excellent",
      "Man is Abu Bakr, what an excellent man is",
      "Umar, what an excellent man is Abu",
      "Ubaidah bin Al-Jarrah, what an excellent",
      "Man is Usaid bin Hudair, what an",
      "Excellent man is Thabit bin Qais bin",
      "Shammas, what an excellent man is Mu'adh",
      "Bin Jabal, and what an excellent man is",
      "Mu'adh bin Amr bin Al-Jamuh."
    ])
  };
}

/** The rooms of his family by the masjid: small rooms of mud brick in a row from x, each `w` wide and `h` high, with a
 * roof of palm leaves and a door. */
const rooms = (x: number, y: number, count: number, w: number, h: number) =>
  Array.from({ length: count }, (_, i) => {
    const l = n(x + i * w);
    return (
      `<rect x="${l}" y="${n(y - h)}" width="${w}" height="${h}" fill="#C9A577" stroke="#A8865A" stroke-width="0.3"/>` +
      `<rect x="${n(l - 0.3)}" y="${n(y - h - 1.2)}" width="${n(w + 0.6)}" height="1.4" fill="#6E8F3A"/>` +
      `<rect x="${n(l + w / 2 - 1.1)}" y="${n(y - 4.4)}" width="2.2" height="4.4" fill="#6B4A2E"/>`
    );
  }).join("");

// The best of you. Aishah said: the Messenger of Allah ﷺ said: the best of you is the best to his wives, and I am
// the best of you to my wives (Jami at-Tirmidhi 3895). The words, the caption and the scene leave out the last words,
// on the death of a companion. No one is drawn: in Madinah, the masjid, and by it the rooms of his family; a home,
// and by its door the place of the one married to one of you; his place, a golden ring, and Aishah's place on the
// left. Aishah's voice tells of it, and his voice, soft and golden, speaks. The place of one of you comes home with a
// basket of dates and sets it down by the other's place. A soft golden ring comes about the two places, a soft warm
// light over their home, and glints: the best to his wives. A soft warm light comes over his rooms by the masjid, and
// a soft golden ring about them, with glints: and I am the best of you to mine.
function bestToHisFamily(): SignArt {
  const aishah: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const homeAt: [number, number] = [52, 97];
  const spouse: [number, number] = [61, 100.8];
  const you: [number, number] = [44, 102.4];
  const comes: [number, number] = [36, 5];
  const basketAt: [number, number] = [48.6, 104.6];
  /** Where the basket is set down, from where it is carried. */
  const setDown: [number, number] = [17.4, -1.4];
  const roomsAt: [number, number] = [120, 90];
  return {
    kind: "best-to-his-family",
    ms: 8000,
    parts: [
      ...madinahDay([24, 18], [72, 24]),
      { name: "the masjid of Madinah", svg: madinahMasjid(82, 90, 0.75) },
      { name: "his rooms by the masjid, where his family lived", svg: rooms(roomsAt[0], roomsAt[1], 4, 7.6, 8) },
      ...palms(
        [
          [34, 90, 10],
          [72, 93, 9],
          [156, 98, 11]
        ],
        "Madinah"
      ),
      { name: "the home of one of you", svg: home(homeAt[0], homeAt[1], 22, 14) },
      { name: "the place of the one married to it, by their home", svg: someone(spouse[0], spouse[1], 1.6, SPOUSE) },
      {
        name: "the place of one of you, coming home",
        svg: someone(you[0], you[1], 1.6, YOU),
        keys: track({
          xy: [
            [0.12, comes[0], comes[1]],
            [0.2, 0, 0]
          ]
        })
      },
      {
        name: "a basket of dates, brought home and set down by the other's place",
        svg: basketOfDates(basketAt[0], basketAt[1]),
        keys: track({
          xy: [
            [0.12, comes[0], comes[1]],
            [0.2, 0, 0],
            [0.36, 0, 0],
            [0.38, setDown[0], setDown[1]]
          ]
        })
      },
      { name: "the best to his spouse: a soft golden ring about the two places", svg: care(n((you[0] + spouse[0]) / 2), 102.4, 13, 4, SOFT_GOLD), keys: showAt(0.4, 0.412), loop: soft },
      { name: "a soft warm light over their home", svg: glow(homeAt[0], n(homeAt[1] - 8), 15, "#FFE7A0", 0.08), keys: showAt(0.42, 0.44), loop: soft },
      {
        name: "glints over their home",
        svg: glints(
          [
            [n(homeAt[0] - 8), n(homeAt[1] - 17)],
            [n(homeAt[0] + 8.6), n(homeAt[1] - 18.4)]
          ],
          1.1
        ),
        keys: showAt(0.45, 0.46),
        loop: twinkle()
      },
      { name: "a soft warm light over his rooms", svg: glow(n(roomsAt[0] + 15.2), n(roomsAt[1] - 6), 17, "#FFE7A0", 0.09), keys: showAt(0.69, 0.71), loop: soft },
      { name: "a soft golden ring about his rooms", svg: care(n(roomsAt[0] + 15.2), n(roomsAt[1] + 1.4), 19, 3.6, SOFT_GOLD), keys: showAt(0.73, 0.742), loop: soft },
      {
        name: "and glints over them",
        svg: glints(
          [
            [n(roomsAt[0] + 3), n(roomsAt[1] - 13)],
            [n(roomsAt[0] + 15), n(roomsAt[1] - 15)],
            [n(roomsAt[0] + 27), n(roomsAt[1] - 13)]
          ],
          1.1
        ),
        keys: showAt(0.76, 0.77),
        loop: twinkle()
      },
      ...tellers("Aishah", aishah, AISHAH, [0.03, 0.08], his, [0.086, 0.96])
    ],
    words: linesOn(THREE, ["Aishah: he said: the best of you is", "The best to his wives, and I am the", "Best of you to my wives."])
  };
}

export const PRAISED_ART = {
  "missed-at-night": missedAtNight,
  "most-merciful-of-my-nation": mostMerciful,
  "what-an-excellent-man": whatAnExcellentMan,
  "best-to-his-family": bestToHisFamily
};
