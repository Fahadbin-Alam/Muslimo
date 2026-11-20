import { cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, palms, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, SIX, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { coins } from "./tradeArt";
import { farHills, FIVE } from "./wideArt";

/**
 * Pure: the siwak, the first thing he did on coming home; Aishah's kunyah, Umm Abdullah; the best of people, pure of
 * heart and sincere in speech; seven small pebbles at Aqabah, and the warning against exaggeration in religion; not
 * being demanding when asking; and the Quran recited as fresh as when it was revealed. Only the land, the sky,
 * buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot,
 * a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle
 * goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes
 * down from the sky: what is good is a light, glints and a soft golden ring. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.34, 0.66],
  [0.68, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of eight lines. */
const EIGHT = [
  [0.012, 0.132],
  [0.136, 0.256],
  [0.26, 0.38],
  [0.384, 0.504],
  [0.508, 0.628],
  [0.632, 0.752],
  [0.756, 0.876],
  [0.88, 1]
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

/** Shurayh's place and voice: a slate blue. */
const SHURAYH = "#5E6E8E";
/** Aishah's place and voice: a soft rose. */
const AISHAH = "#9A6E8E";
/** The places of his other wives: a warm grey brown. */
const WIVES = "#8E7A6A";
/** Abdullah ibn Amr's place and voice: an olive green. */
const IBN_AMR = "#6E7E4E";
/** The places and voices of the folk: a soft brown. */
const FOLK = "#9A8A70";
/** The place of one who is pure of heart and sincere in speech: a deep blue. */
const PURE = "#4E5E8E";
/** Ibn Abbas's place and voice: a deep blue. */
const IBN_ABBAS = "#3E5E8A";
/** Mu'awiyah's place and voice: a plum. */
const MUAWIYAH = "#7A5A7E";
/** The place of the one who asks: a warm brown. */
const ASKER = "#8E6A48";
/** A voice that asks again and again: a grey. */
const PRESSING = "#8C8C8C";
/** Abu Bakr's place and voice: a deep teal. */
const ABU_BAKR = "#3E6E7A";
/** Umar's place and voice: a deep green. */
const UMAR = "#4E6E4E";
/** Ibn Mas'ud's place and voice: an olive brown. */
const IBN_MASUD = "#7A6A4E";
/** A recitation, fresh: a soft fresh green. */
const FRESH = "#8FC07A";

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

/** The sky, the sun, a cloud, the far hills and the land of Madinah (as in growArt). */
const madinahDay = (sunAt: [number, number], cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** A siwak, a twig of the arak tree for cleaning the teeth, lying with its foot at (x, y) and its soft end up right
 * (as in homeArt). */
const siwak = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x + 3.8)} ${n(y - 1.6)}" stroke="#9C7A4A" stroke-width="0.8" stroke-linecap="round"/>` +
  `<path d="M${n(x + 3.6)} ${n(y - 1.3)} l1.1 -0.9 M${n(x + 3.8)} ${n(y - 1.6)} l1.2 -0.2 M${n(x + 3.7)} ${n(y - 1.4)} l1 0.5" stroke="#EADCB8" stroke-width="0.35" stroke-linecap="round"/>`;

/** The rooms of his family by the masjid: small rooms of mud brick in a row from x, each `w` wide and `h` high, with a
 * roof of palm leaves and a door (as in praisedArt). */
const rooms = (x: number, y: number, count: number, w: number, h: number) =>
  Array.from({ length: count }, (_, i) => {
    const l = n(x + i * w);
    return (
      `<rect x="${l}" y="${n(y - h)}" width="${w}" height="${h}" fill="#C9A577" stroke="#A8865A" stroke-width="0.3"/>` +
      `<rect x="${n(l - 0.3)}" y="${n(y - h - 1.2)}" width="${n(w + 0.6)}" height="1.4" fill="#6E8F3A"/>` +
      `<rect x="${n(l + w / 2 - 1.1)}" y="${n(y - 4.4)}" width="2.2" height="4.4" fill="#6B4A2E"/>`
    );
  }).join("");

/** A Jamrah: a stone pillar in a low round basin, its middle at x, the basin's rim at y 100 (as in betterArt). */
const jamrah = (x: number) =>
  `<ellipse cx="${x}" cy="100.6" rx="7.4" ry="2.4" fill="#A89676"/><ellipse cx="${x}" cy="100" rx="6.4" ry="1.8" fill="#C9B898"/>` +
  `<rect x="${n(x - 2)}" y="86" width="4" height="14" rx="0.6" fill="#B9A88E"/><path d="M${n(x - 2)} 86 L${n(x + 2)} 86" stroke="#9C8A6C" stroke-width="0.6"/>`;

/** A small pebble, its middle at (x, y). */
const pebble = (x: number, y: number, fill = "#7E7466") => `<ellipse cx="${x}" cy="${y}" rx="0.8" ry="0.6" fill="${fill}"/>`;

// The siwak first. Shurayh ibn Hani said: I said to Aishah: tell me, what was the first thing that the Messenger of
// Allah ﷺ did when he entered upon you? She said: the first thing he would do would be to use the tooth stick (Sunan
// Ibn Majah 290). No one is drawn: in Madinah, the masjid, and by it the rooms of his family, Aishah's room the first;
// his place, a golden ring, before the masjid. On the right, Shurayh's place and Aishah's place: Shurayh's voice asks,
// and Aishah's voice answers. His place goes from the masjid to the door of her room, and comes in at the door. Then a
// siwak shows by his place: the first thing he would do; a soft light comes on it, and glints over it.
function theSiwakFirst(): SignArt {
  const his: [number, number] = [21.7, 100.8];
  const door: [number, number] = [50.5, 97.6];
  const shurayh: [number, number] = [112, 104.6];
  const aishah: [number, number] = [132, 104.6];
  return {
    kind: "the-siwak-first",
    ms: 8000,
    parts: [
      ...madinahDay([136, 20], [70, 26]),
      ...palms(
        [
          [100, 97, 12],
          [154, 97, 12]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 97, 0.82) },
      { name: "Aishah's room, by the masjid", svg: rooms(42, 97, 1, 17, 14) },
      { name: "the other rooms of his family", svg: rooms(59, 97, 2, 15, 13) },
      {
        name: "his place, a golden ring, going from the masjid to her room, and coming in at its door",
        svg: ring(his[0], his[1], 2.4, GOLD),
        keys: track({
          xy: [
            [0.43, 0, 0],
            [0.54, n(door[0] - his[0]), -0.2],
            [0.63, n(door[0] - his[0]), -0.2],
            [0.68, n(door[0] - his[0]), n(door[1] - his[1])]
          ]
        })
      },
      { name: "a soft light on the siwak", svg: glow(56.2, 99.8, 4, "#FFE7A0", 0.3), keys: showAt(0.86, 0.88), loop: soft },
      { name: "the first thing he would do: a siwak, by his place", svg: `<g transform="translate(52.8 101.2) scale(1.7)">${siwak(0, 0)}</g>`, keys: showAt(0.83, 0.842) },
      {
        name: "and glints over it",
        svg: glints(
          [
            [53.4, 96.2],
            [60, 96.6]
          ],
          1
        ),
        keys: showAt(0.89, 0.9),
        loop: twinkle()
      },
      { name: "Shurayh's place", svg: someone(shurayh[0], shurayh[1], 1.8, SHURAYH) },
      { name: "Shurayh's voice: asking Aishah", svg: arcs(n(shurayh[0] + 2.6), n(shurayh[1] - 3.4), SHURAYH), keys: voice([[0.03, 0.55]]), loop: speaking },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.8, AISHAH) },
      { name: "Aishah's voice: answering", svg: arcsLeft(n(aishah[0] - 2.6), n(aishah[1] - 3.4), AISHAH), keys: voice([[0.62, 0.96]]), loop: speaking }
    ],
    words: linesOn(FIVE, [
      "Shurayh ibn Hani: I said to Aishah: tell",
      "Me, what was the first thing that the",
      "Messenger of Allah did when he entered",
      "Upon you? She said: the first thing he",
      "Would do would be to use the tooth stick."
    ])
  };
}

// Umm Abdullah. Aishah said to the Prophet ﷺ: all of your wives have a kunyah except me. He said: you are Umm
// Abdullah (Sunan Ibn Majah 3739). No one is drawn: in Madinah, the masjid, and by it the rooms of his family in a row,
// Aishah's room the first; his place, a golden ring, by the masjid, Aishah's place before her door, and the places of
// his other wives before theirs. Aishah's voice speaks to him, and as she tells of it, a soft golden ring comes about
// the place of each of his other wives, one after another: a kunyah; none about hers. His voice, soft and golden,
// answers, and a soft golden ring comes about her place too, with glints over it: Umm Abdullah.
function youAreUmmAbdullah(): SignArt {
  const his: [number, number] = [30.4, 101.8];
  const aishah: [number, number] = [50, 101.4];
  const wives: [number, number][] = [66, 82, 98, 114, 130].map((x) => [x, 101.4]);
  return {
    kind: "you-are-umm-abdullah",
    ms: 6500,
    parts: [
      ...madinahDay([26, 18], [120, 24]),
      ...palms([[151, 97, 12]], "Madinah"),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 97, 0.82) },
      { name: "the rooms of his family, by the masjid", svg: rooms(42, 97, 6, 16, 13) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden: answering her", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.7, 0.96]]), loop: speaking },
      { name: "Aishah's place, before her door", svg: someone(aishah[0], aishah[1], 1.8, AISHAH) },
      { name: "Aishah's voice: speaking to him", svg: arcsLeft(n(aishah[0] - 2.4), n(aishah[1] - 3.2), AISHAH), keys: voice([[0.04, 0.6]]), loop: speaking },
      ...wives.map(
        ([x, y], i): SignPart => ({ name: `the place of one of his other wives, before her door ${i + 1}`, svg: someone(x, y, 1.8, WIVES) })
      ),
      ...wives.map(
        ([x, y], i): SignPart => ({
          name: `her kunyah: a soft golden ring about it ${i + 1}`,
          svg: care(x, n(y + 0.3), 4, 2.4, SOFT_GOLD),
          keys: showAt(at3(0.4 + i * 0.03), at3(0.412 + i * 0.03)),
          loop: soft
        })
      ),
      { name: "Umm Abdullah: a soft golden ring about Aishah's place too", svg: care(aishah[0], n(aishah[1] + 0.3), 4, 2.4, SOFT_GOLD), keys: showAt(0.84, 0.856), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [45.6, 96.4],
            [54.4, 96.2]
          ],
          1
        ),
        keys: showAt(0.88, 0.89),
        loop: twinkle()
      }
    ],
    words: linesOn(THREE, ["Aishah said to the Prophet: all of your", "Wives have a kunyah except me.", "He said: you are Umm Abdullah."])
  };
}

// Pure of heart. Abdullah ibn Amr said: it was said to the Messenger of Allah ﷺ: which of the people is best? He said:
// everyone who is pure of heart and sincere in speech. They said: sincere in speech, we know what this is, but what is
// pure of heart? He said: it is pious and pure, with no sin, injustice, rancor or envy in it (Sunan Ibn Majah 4216).
// The words leave out the page's "(the heart) that". No one is drawn: in Madinah, the masjid, his place, a golden ring,
// before it, and the places of the folk about him; Abdullah ibn Amr's place on the left; on the right, by a home, the
// place of one who is pure of heart and sincere in speech. Abdullah ibn Amr's voice tells of it; the voices of the folk
// ask, and his voice, soft and golden, answers. A soft clear light comes within the place on the right: pure of heart;
// and its voice, soft and golden, speaks: sincere in speech. The folk ask again, and he answers: four small grey marks
// come near the place, and go away without coming into it: no sin, injustice, rancor or envy in it; a soft golden ring
// comes about it, the light within grows brighter, and glints come over it.
function pureOfHeart(): SignArt {
  const his: [number, number] = [44.6, 98.4];
  const folk: [number, number][] = [
    [30, 101.6],
    [38, 104.6],
    [51.4, 104.6],
    [59.4, 101.6]
  ];
  const ibnAmr: [number, number] = [10, 106];
  const pure: [number, number] = [112, 102.6];
  const marks: [number, number, number, number][] = [
    [104, 97.4, -5, -3],
    [120, 97, 5, -3],
    [103.4, 106, -5, 1.6],
    [120.6, 106.4, 5, 1.8]
  ];
  return {
    kind: "pure-of-heart",
    ms: 11000,
    parts: [
      ...madinahDay([22, 17], [100, 24]),
      ...palms(
        [
          [84, 96, 12],
          [156, 97, 11]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(24, 92, 0.86) },
      { name: "a home on the right", svg: home(138, 99, 20, 13) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice, soft and golden: answering", svg: arcs(n(his[0] + 3), n(his[1] - 3), SOFT_GOLD), keys: voice([[0.27, 0.466], [0.76, 0.96]]), loop: speaking },
      ...folk.map(([x, y], i): SignPart => ({ name: `the place of one of the folk, about him ${i + 1}`, svg: someone(x, y, 1.8, FOLK) })),
      {
        name: "the voices of the folk: asking him",
        svg: arcs(n(folk[0][0] + 2.4), n(folk[0][1] - 3.2), FOLK) + arcsLeft(n(folk[3][0] - 2.4), n(folk[3][1] - 3.2), FOLK),
        keys: voice([
          [0.14, 0.22],
          [0.52, 0.714]
        ]),
        loop: speaking
      },
      { name: "Abdullah ibn Amr's place", svg: someone(ibnAmr[0], ibnAmr[1], 1.8, IBN_AMR) },
      { name: "Abdullah ibn Amr's voice: telling of it", svg: arcs(n(ibnAmr[0] + 2.6), n(ibnAmr[1] - 3.4), IBN_AMR), keys: voice([[0.02, 0.09]]), loop: speaking },
      { name: "the place of one who is pure of heart and sincere in speech", svg: someone(pure[0], pure[1], 2, PURE) },
      {
        name: "pure of heart: a soft clear light within its place",
        svg: `${glow(pure[0], pure[1], 1.6, "#FFFFFF", 0.4)}<circle cx="${pure[0]}" cy="${pure[1]}" r="0.6" fill="#FFF3CF"/>`,
        keys: showAt(0.3, 0.33),
        loop: soft
      },
      { name: "sincere in speech: its voice, soft and golden", svg: arcs(n(pure[0] + 2.8), n(pure[1] - 3.6), SOFT_GOLD), keys: voice([[0.4, 0.46]]), loop: speaking },
      ...marks.map(
        ([x, y, dx, dy], i): SignPart => ({
          name: `no sin, injustice, rancor or envy in it: a small grey mark coming near, and going away ${i + 1}`,
          svg: `<path d="M${n(x - 1.4)} ${n(y - 0.9)} L${n(x + 1.4)} ${n(y + 0.9)} M${n(x - 1.4)} ${n(y + 0.9)} L${n(x + 1.4)} ${n(y - 0.9)}" stroke="#8C8C8C" stroke-width="0.7" stroke-linecap="round"/>`,
          keys: track({
            opacity: [
              [at3(0.78 + i * 0.012), 0],
              [at3(0.79 + i * 0.012), 1],
              [0.9, 1],
              [0.93, 0]
            ],
            xy: [
              [0.884, 0, 0],
              [0.93, dx, dy]
            ]
          })
        })
      ),
      { name: "pious and pure: a soft golden ring about its place", svg: care(pure[0], n(pure[1] + 0.4), 4.6, 2.8, SOFT_GOLD), keys: showAt(0.82, 0.836), loop: soft },
      {
        name: "the light within, brighter",
        svg: `${glow(pure[0], pure[1], 2.2, "#FFE7A0", 0.34)}<circle cx="${pure[0]}" cy="${pure[1]}" r="0.85" fill="#FFF3CF"/>`,
        keys: showAt(0.9, 0.93),
        loop: soft
      },
      {
        name: "and glints over it",
        svg: glints(
          [
            [106.4, 96.2],
            [117.8, 95.8]
          ],
          1.1
        ),
        keys: showAt(0.94, 0.95),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Abdullah ibn Amr: it was said to the",
      "Messenger of Allah: which of the people",
      "Is best? He said: everyone who is pure",
      "Of heart and sincere in speech. They",
      "Said: sincere in speech, we know what",
      "This is, but what is pure of heart? He",
      "Said: it is pious and pure, with no sin,",
      "Injustice, rancor or envy in it."
    ])
  };
}

// Pebbles like these. Ibn Abbas said: on the morning of Aqabah, the Messenger of Allah ﷺ said: pick up some pebbles
// for me. So I picked up seven pebbles for him. He began to toss them, saying: throw something like these. Then he
// said: O people, beware of exaggeration in religious matters, for those who came before you were doomed because of
// exaggeration in religious matters (Sunan Ibn Majah 3029). The words and the scene leave out the page's "when he was
// atop his she-camel", "suitable for Khadhf" and "in his hand". No one is drawn: Mina in the morning, the sun low in
// the east, white tents far off, a hill at the valley's edge, the Jamrah of Aqabah on the right, and the places of the
// folk on the way to it; his place, a golden ring, and Ibn Abbas's place by it; small pebbles lying on the land on the
// left. Ibn Abbas's voice tells of it; his voice, soft and golden, speaks. Ibn Abbas's place goes to the pebbles, seven
// small pebbles gather by it, and it brings them back to his place. The seven pebbles go up and down by his place,
// twice: tossed; a soft light comes on them: like these. Then his voice speaks on to the folk; nothing is drawn for
// those who were doomed.
function pebblesLikeThese(): SignArt {
  const his: [number, number] = [80, 100.6];
  const ibnAbbas: [number, number] = [66, 103];
  const goTo: [number, number] = [-29, 0.4];
  const folk: [number, number][] = [
    [104, 97.6],
    [112, 98.8],
    [120, 97.6],
    [106, 103],
    [114, 104.2],
    [122, 103]
  ];
  const seven: [number, number][] = [0, 1, 2, 3, 4, 5, 6].map((i) => [n(28 + i * 2.4), n(105.8 + (i % 2) * 1.1)]);
  const others: [number, number][] = [
    [22.4, 103.6],
    [25.6, 107.4],
    [33.4, 103.2],
    [40.6, 107.8],
    [45.4, 103.8],
    [48.6, 106.8],
    [19.6, 105.8],
    [52.4, 104.8]
  ];
  // Where each of the seven gathers by Ibn Abbas's place at the pebbles, and then by his place.
  const gather = (i: number): [number, number] => [n(ibnAbbas[0] + goTo[0] + 2.6 + (i % 4) * 1.3), n(ibnAbbas[1] + goTo[1] + 1.6 + Math.floor(i / 4) * 1)];
  const byHim = (i: number): [number, number] => [n(his[0] + 4 + (i % 4) * 1.3), n(his[1] + 2.4 + Math.floor(i / 4) * 1)];
  const to = (i: number, at: [number, number], up = 0): [number, number] => [n(at[0] - seven[i][0]), n(at[1] - seven[i][1] - up)];
  return {
    kind: "pebbles-like-these",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun, low in the east: the morning", svg: sun(18, 40) },
      { name: "a cloud", svg: cloud(96, 22, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "the hills about Mina", svg: farHills() },
      { name: "the valley floor of Mina", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) },
      { name: "white tents far off in the valley", svg: tent(58, 72, 7, 5) + tent(70, 71.4, 6, 4.4) + tent(96, 72, 7, 5) + tent(108, 71.4, 6, 4.4) },
      { name: "a hill at the valley's edge", svg: `<path d="M0 54 Q16 56 24 66 Q30 76 34 86 L0 90 Z" fill="#C2A77E"/><path d="M0 54 Q16 56 24 66" stroke="#A88E66" stroke-width="0.6" fill="none"/>` },
      { name: "the Jamrah of Aqabah", svg: jamrah(140) },
      ...folk.map(([x, y], i): SignPart => ({ name: `the place of one of the folk on the way ${i + 1}`, svg: someone(x, y, 1.7, FOLK) })),
      { name: "small pebbles lying on the land", svg: others.map(([x, y]) => pebble(x, y)).join("") },
      ...seven.map(
        (_, i): SignPart => ({
          name: `one of the seven pebbles: picked up, brought to his place, and tossed ${i + 1}`,
          svg: pebble(seven[i][0], seven[i][1]),
          keys: track({
            xy: [
              [0.29, 0, 0],
              [0.3, ...to(i, gather(i))],
              [0.35, ...to(i, gather(i))],
              [0.4, ...to(i, byHim(i))],
              [0.45, ...to(i, byHim(i))],
              [0.465, ...to(i, byHim(i), 2.4)],
              [0.48, ...to(i, byHim(i))],
              [0.495, ...to(i, byHim(i), 2.4)],
              [0.51, ...to(i, byHim(i))]
            ]
          })
        })
      ),
      { name: "like these: a soft light on the seven pebbles", svg: glow(n(his[0] + 6), n(his[1] + 3), 4, "#FFE7A0", 0.4), keys: showAt(0.5, 0.515), loop: soft },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "his voice, soft and golden",
        svg: arcs(n(his[0] + 3), n(his[1] - 3), SOFT_GOLD),
        keys: voice([
          [0.13, 0.19],
          [0.45, 0.515],
          [0.56, 0.96]
        ]),
        loop: speaking
      },
      {
        name: "Ibn Abbas's place, going to the pebbles and bringing seven back",
        svg: someone(ibnAbbas[0], ibnAbbas[1], 1.8, IBN_ABBAS),
        keys: track({
          xy: [
            [0.24, 0, 0],
            [0.28, goTo[0], goTo[1]],
            [0.35, goTo[0], goTo[1]],
            [0.4, 0, 0]
          ]
        })
      },
      {
        name: "Ibn Abbas's voice: telling of it",
        svg: arcsLeft(n(ibnAbbas[0] - 2.6), n(ibnAbbas[1] - 3.4), IBN_ABBAS),
        keys: track({
          opacity: spoken([
            [0.02, 0.08],
            [0.24, 0.298]
          ]),
          xy: [
            [0.24, 0, 0],
            [0.28, goTo[0], goTo[1]],
            [0.35, goTo[0], goTo[1]],
            [0.4, 0, 0]
          ]
        }),
        loop: speaking
      }
    ],
    words: linesOn(NINE, [
      "Ibn Abbas: on the morning of Aqabah, the",
      "Messenger of Allah said: pick up some",
      "Pebbles for me. So I picked up seven",
      "Pebbles for him. He began to toss them,",
      "Saying: throw something like these. Then",
      "He said: O people, beware of exaggeration",
      "In religious matters, for those who came",
      "Before you were doomed because of",
      "Exaggeration in religious matters."
    ])
  };
}

// Do not be demanding. Mu'awiyah said: the Messenger of Allah ﷺ said: do not be demanding when asking. If one of you
// asks me for anything and I give it reluctantly, there will be no blessing in it (Sunan an-Nasa'i 2593). No one is
// drawn: in Madinah, the masjid, his place, a golden ring, before it, and a small sack of coins by it; Mu'awiyah's place
// on the right. Mu'awiyah's voice tells of it, and his voice, soft and golden, speaks. The place of one who asks comes
// to him, and its voice, grey, asks again and again. Coins go slowly from the sack to its place, stopping on the way:
// given reluctantly. A ring of grey dashes comes about the coins, and no glint comes over them: no blessing in it.
function doNotBeDemanding(): SignArt {
  const his: [number, number] = [30, 100.8];
  const muawiyah: [number, number] = [150, 105.6];
  const asker: [number, number] = [132, 101];
  const comes = -60;
  const at: [number, number] = [asker[0] + comes, asker[1]];
  const from: [number, number] = [26, 105.4];
  const to: [number, number] = [n(at[0] - 6), 105.2];
  const step = n((to[0] - from[0]) / 3);
  return {
    kind: "do-not-be-demanding",
    ms: 8000,
    parts: [
      ...madinahDay([130, 18], [58, 24]),
      ...palms(
        [
          [94, 96, 12],
          [110, 97, 11]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "a small sack of coins by his place", svg: sack(22, 104.8, 0.7) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.11, 0.96]]), loop: speaking },
      { name: "Mu'awiyah's place", svg: someone(muawiyah[0], muawiyah[1], 1.8, MUAWIYAH) },
      { name: "Mu'awiyah's voice: telling of it", svg: arcsLeft(n(muawiyah[0] - 2.6), n(muawiyah[1] - 3.4), MUAWIYAH), keys: voice([[0.03, 0.1]]), loop: speaking },
      {
        name: "the place of one who asks, coming to him",
        svg: someone(asker[0], asker[1], 1.8, ASKER),
        keys: track({
          xy: [
            [0.28, 0, 0],
            [0.38, comes, 0]
          ]
        })
      },
      {
        name: "its voice, grey: asking again and again",
        svg: arcsLeft(n(at[0] - 2.6), n(at[1] - 3.4), PRESSING),
        keys: voice([
          [0.4, 0.42],
          [0.43, 0.45],
          [0.53, 0.55],
          [0.56, 0.58]
        ]),
        loop: speaking
      },
      {
        name: "given reluctantly: coins going slowly from the sack to its place, stopping on the way",
        svg: coins(from[0], from[1], 3),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.606, 1]
          ],
          xy: [
            [0.6, 0, 0],
            [0.635, step, 0],
            [0.665, step, 0],
            [0.71, n(to[0] - from[0]), n(to[1] - from[1])]
          ]
        })
      },
      { name: "no blessing in it: a ring of grey dashes about the coins", svg: greyRing(to[0], n(to[1] - 1), 4.2, 2.8), keys: showAt(0.8, 0.812) }
    ],
    words: linesOn(FOUR, ["Mu'awiyah: he said: do not be demanding", "When asking. If one of you asks me for", "Anything and I give it reluctantly,", "There will be no blessing in it."])
  };
}

// As fresh as it came down. Abdullah ibn Mas'ud said that Abu Bakr and Umar gave him the glad tidings that the
// Messenger of Allah ﷺ had said: whoever would like to recite the Quran as fresh as when it was revealed, let him
// recite it like Ibn Umm Abd (Sunan Ibn Majah 138). The words read "Ibn Mas'ud" for the page's "him", so that "him" is
// not taken for the Prophet ﷺ. No one is drawn: in Madinah, the masjid, and before it his place, a golden ring; Ibn
// Mas'ud's home on the right, and Ibn Mas'ud's place before it. The places of Abu Bakr and Umar go from the masjid
// toward Ibn Mas'ud's home, and their voices, soft and golden, give the glad tidings; a soft golden ring comes about Ibn
// Mas'ud's place. Then Ibn Mas'ud's voice recites, soft and fresh; a soft golden ring comes about Ibn Mas'ud's home,
// and glints over it. Nothing comes down from the sky.
function asFreshAsRevealed(): SignArt {
  const his: [number, number] = [21.2, 100];
  const masud: [number, number] = [134, 104.2];
  const abuBakr: [number, number] = [34, 102.4];
  const umar: [number, number] = [40, 105.2];
  const walk = 62;
  return {
    kind: "as-fresh-as-revealed",
    ms: 8000,
    parts: [
      ...madinahDay([28, 18], [92, 24]),
      ...palms(
        [
          [64, 96, 12],
          [118, 97, 10]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "Ibn Mas'ud's home", svg: home(140, 100, 26, 16) },
      { name: "Ibn Mas'ud's place, before it", svg: someone(masud[0], masud[1], 1.8, IBN_MASUD) },
      {
        name: "Abu Bakr's place, going toward Ibn Mas'ud's home",
        svg: someone(abuBakr[0], abuBakr[1], 1.8, ABU_BAKR),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.13, walk, 0]
          ]
        })
      },
      {
        name: "Umar's place, going with it",
        svg: someone(umar[0], umar[1], 1.8, UMAR),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.13, walk, 0]
          ]
        })
      },
      {
        name: "their voices, soft and golden: the glad tidings",
        svg: arcs(n(abuBakr[0] + walk + 2.6), n(abuBakr[1] - 3.2), SOFT_GOLD) + arcs(n(umar[0] + walk + 2.6), n(umar[1] - 3.2), SOFT_GOLD),
        keys: voice([[0.18, 0.44]]),
        loop: speaking
      },
      { name: "the glad tidings: a soft golden ring about Ibn Mas'ud's place", svg: care(masud[0], n(masud[1] + 0.4), 4.2, 2.5, SOFT_GOLD), keys: showAt(0.26, 0.272), loop: soft },
      { name: "Ibn Mas'ud's voice: reciting, soft and fresh", svg: arcsLeft(n(masud[0] - 5), n(masud[1] - 3.6), FRESH), keys: voice([[0.52, 0.96]]), loop: speaking },
      { name: "a soft golden ring about Ibn Mas'ud's home as its voice recites", svg: care(140, 100.8, 15, 2.6, SOFT_GOLD), keys: showAt(0.7, 0.73), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [130, 80.6],
            [149, 80]
          ],
          1.1
        ),
        keys: showAt(0.86, 0.87),
        loop: twinkle()
      }
    ],
    words: linesOn(SIX, [
      "Abu Bakr and Umar gave Ibn Mas'ud the",
      "Glad tidings that the Messenger of",
      "Allah had said: whoever would like to",
      "Recite the Quran as fresh as when it",
      "Was revealed, let him recite it like",
      "Ibn Umm Abd."
    ])
  };
}

/** The scenes in this file, by kind. */
export const PURE_ART = {
  "the-siwak-first": theSiwakFirst,
  "you-are-umm-abdullah": youAreUmmAbdullah,
  "pure-of-heart": pureOfHeart,
  "pebbles-like-these": pebblesLikeThese,
  "do-not-be-demanding": doNotBeDemanding,
  "as-fresh-as-revealed": asFreshAsRevealed
};
