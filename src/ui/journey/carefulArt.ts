import { cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { coins, stall } from "./tradeArt";
import { farHills, FIVE } from "./wideArt";

/**
 * Careful: provision that will reach every soul, and seeking it with care; the pledge given as much as one is able;
 * the best provision of this world; and the care of Anas and of Zaid ibn Arqam with the words of the Prophet ﷺ. Only
 * the land, the sky, buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not
 * even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is
 * drawn, and nothing comes down from the sky: what is good is a light, glints and a soft golden ring. No name, word or
 * number is written.
 */

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

/** Jabir's place and voice: a sage green. */
const JABIR = "#5E7A5E";
/** The places and voices of the folk: a soft brown. */
const FOLK = "#9A8A70";
/** Umaymah's place and voice: a deep rose. */
const UMAYMAH = "#9A5E7A";
/** The places and voices of the group who gave the pledge with her: a soft rose grey. */
const GROUP = "#A08496";
/** Abdullah ibn Amr's place and voice: an olive green (as in pureArt). */
const IBN_AMR = "#6E7E4E";
/** The place of a righteous one at the home: a soft plum. */
const RIGHTEOUS = "#8A6A8E";
/** Anas's place and voice: a steel blue. */
const ANAS = "#4E6E8E";
/** Ibn Sirin's place and voice: a slate violet. */
const IBN_SIRIN = "#6E5E7E";
/** Zaid ibn Arqam's place and voice: a grey teal. */
const ZAID = "#5E7E8E";
/** Abdur-Rahman ibn Abi Laila's place and voice: a deep brown. */
const ABDUR_RAHMAN = "#7E5E4A";
/** Grown old: a soft silver. */
const SILVER = "#9AA2AE";
/** A weighty matter: a deep gold. */
const WEIGHTY = "#A8803A";

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

/** The sky, the sun, a cloud, the far hills and the land (as in pureArt). */
const aDay = (sunAt: [number, number], cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** A small bundle of goods wrapped in cloth and tied, its foot's middle at (x, y). */
const bundle = (x: number, y: number, fill = "#B8A07A") =>
  `<rect x="${n(x - 2.2)}" y="${n(y - 3)}" width="4.4" height="3" rx="0.8" fill="${fill}"/>` +
  `<path d="M${x} ${n(y - 3)} L${x} ${y} M${n(x - 2.2)} ${n(y - 1.5)} L${n(x + 2.2)} ${n(y - 1.5)}" stroke="#7A6440" stroke-width="0.35"/>`;

// Your provision will reach you. Jabir ibn Abdullah said: the Messenger of Allah ﷺ said: O people, fear Allah and be
// moderate in seeking a living, for no soul will die until it has received all its provision, even if it is slow in
// coming. So fear Allah and be moderate in seeking provision; take that which is permissible and leave that which is
// forbidden (Sunan Ibn Majah 2144). No one is drawn: in Madinah, the masjid, and before it his place, a golden ring;
// Jabir's place on the left, the places of the folk in the middle, and on the right two stalls of the market. Jabir's
// voice tells of it, and his voice, soft and golden, speaks. One of the folk's places goes calmly a little way toward
// the market: moderate in seeking a living. A sack of provision comes along the land to each of the other two places,
// and a soft golden ring comes about each: all its provision; the sack for the place on the way comes slowly, stopping
// on the way, and comes all the same, and a soft golden ring comes about it too. Then that place goes on calmly to the
// market, with its provision: a soft light comes on one stall, and a small sack goes from it to the place: what is
// permissible, taken; a ring of grey dashes comes about the goods of the other stall: what is forbidden, left. Nothing
// comes down from the sky, and nothing is drawn for death.
function provisionWillReachYou(): SignArt {
  const his: [number, number] = [24, 100.4];
  const jabir: [number, number] = [8, 106.4];
  const folk: [number, number][] = [
    [44, 102.6],
    [58, 102.6],
    [70, 102.6]
  ];
  // The third place goes calmly a little way toward the market, its provision reaches it there, and then it goes on
  // to the stalls with it.
  const calm = 14;
  const goOn: [number, number] = [24, 1];
  const sackBy = (i: number): [number, number] => [n(folk[i][0] + (i === 2 ? calm : 0) + 4.2), n(folk[i][1] + 4.6)];
  const ringBy = (i: number): [number, number] => [n(folk[i][0] + (i === 2 ? calm : 0) + 2), n(folk[i][1] + 1.4)];
  const keysOfSack = (i: number) =>
    i < 2
      ? track({
          opacity: [
            [at3(0.264 + i * 0.026), 0],
            [at3(0.27 + i * 0.026), 1]
          ],
          xy: [
            [at3(0.27 + i * 0.026), 12, 0],
            [at3(0.3 + i * 0.026), 0, 0]
          ]
        })
      : track({
          opacity: [
            [0.388, 0],
            [0.394, 1]
          ],
          xy: [
            [0.394, 26, 0],
            [0.44, 13, 0],
            [0.512, 13, 0],
            [0.56, 0, 0],
            [0.636, 0, 0],
            [0.718, goOn[0], goOn[1]]
          ]
        });
  const keysOfRing = (i: number) =>
    i < 2
      ? showAt(at3(0.302 + i * 0.026), at3(0.314 + i * 0.026))
      : track({
          opacity: [
            [0.565, 0],
            [0.58, 1]
          ],
          xy: [
            [0.636, 0, 0],
            [0.718, goOn[0], goOn[1]]
          ]
        });
  return {
    kind: "provision-will-reach-you",
    ms: 11000,
    parts: [
      ...aDay([136, 18], [70, 26]),
      ...palms(
        [
          [62, 95, 11],
          [100, 96, 12]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.8) },
      {
        name: "a stall of the market, with sacks and dates",
        svg: stall(122, 18, "#6E8A5E", 82, 95) + sack(116.8, 95, 0.42) + basketOfDates(122.4, 95) + sack(127.8, 95, 0.42, "#B8955A")
      },
      { name: "another stall of the market, with its goods", svg: stall(146, 18, "#8A6E5E", 82, 95) + bundle(141, 95) + bundle(146, 95, "#A89070") + bundle(151, 95) },
      { name: "what is permissible: a soft light on the first stall", svg: glow(122, 90, 7, "#FFE7A0", 0.26), keys: showAt(0.76, 0.78), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [115, 79.6],
            [129.6, 79]
          ],
          1
        ),
        keys: showAt(0.8, 0.81),
        loop: twinkle()
      },
      { name: "what is forbidden: a ring of grey dashes about the goods of the other stall", svg: greyRing(146, 93.6, 8.4, 2.8), keys: showAt(0.884, 0.9) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.06, 0.96]]), loop: speaking },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.8, JABIR) },
      { name: "Jabir's voice: telling of it", svg: arcs(n(jabir[0] + 2.6), n(jabir[1] - 3.4), JABIR), keys: voice([[0.014, 0.05]]), loop: speaking },
      { name: "the place of one of the folk 1", svg: someone(folk[0][0], folk[0][1], 1.8, FOLK) },
      { name: "the place of one of the folk 2", svg: someone(folk[1][0], folk[1][1], 1.8, FOLK) },
      {
        name: "the place of one of the folk 3: going calmly toward the market, and then on to it",
        svg: someone(folk[2][0], folk[2][1], 1.8, FOLK),
        keys: track({
          xy: [
            [0.14, 0, 0],
            [0.222, calm, 0],
            [0.636, calm, 0],
            [0.718, n(calm + goOn[0]), goOn[1]]
          ]
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: i < 2 ? `its provision: a sack coming along the land to its place ${i + 1}` : "its provision: a sack coming slowly along the land to its place, stopping on the way 3",
          svg: sack(...sackBy(i), 0.55),
          keys: keysOfSack(i)
        })
      ),
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `all its provision, received: a soft golden ring about the place and its sack ${i + 1}`,
          svg: care(...ringBy(i), 5.6, 4, SOFT_GOLD),
          keys: keysOfRing(i),
          loop: soft
        })
      ),
      {
        name: "what is permissible, taken: a small sack going from the first stall to the place",
        svg: sack(116.6, 108.2, 0.42),
        keys: track({
          opacity: [
            [0.79, 0],
            [0.796, 1]
          ],
          xy: [
            [0.796, 1.4, -13.2],
            [0.835, 0, 0]
          ]
        })
      }
    ],
    words: linesOn(EIGHT, [
      "Jabir: he said: O people, fear Allah",
      "And be moderate in seeking a living, for",
      "No soul will die until it has received",
      "All its provision, even if it is slow",
      "In coming. So fear Allah and be",
      "Moderate in seeking provision; take",
      "That which is permissible and leave",
      "That which is forbidden."
    ])
  };
}

// As much as you are able. Umaymah bint Ruqayqah said: we gave pledge to the Messenger of Allah ﷺ among a group of
// women, and he said to us: in as much as you can and are able (Sunan an-Nasa'i 4190). No one is drawn: in Madinah,
// the masjid, and before it his place, a golden ring. The places of a group come along the land to him, Umaymah's place
// among them, and Umaymah's voice tells of it; their voices give the pledge. His voice, soft and golden, answers, and a
// soft golden ring comes about each of their places, one after another: as much as each can and is able; glints come
// over them.
function asYouAreAble(): SignArt {
  const his: [number, number] = [24, 100.4];
  const group: [number, number][] = [
    [46, 102.4],
    [56, 105.4],
    [66, 102.4],
    [76, 105.4],
    [86, 102.4]
  ];
  const umaymah = 2;
  const come = 50;
  const coming = track({
    xy: [
      [0.03, come, 0],
      [0.16, 0, 0]
    ]
  });
  return {
    kind: "as-you-are-able",
    ms: 7000,
    parts: [
      ...aDay([136, 18], [62, 24]),
      ...palms(
        [
          [112, 97, 12],
          [154, 98, 10]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.8) },
      { name: "a home on the right", svg: home(136, 99, 22, 14) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden: answering them", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.52, 0.96]]), loop: speaking },
      ...group.map(
        ([x, y], i): SignPart => ({
          name: i === umaymah ? "Umaymah's place, among them, coming to him" : `the place of one of the group, coming to him ${i + 1}`,
          svg: someone(x, y, 1.8, i === umaymah ? UMAYMAH : GROUP),
          keys: coming
        })
      ),
      {
        name: "Umaymah's voice: telling of it",
        svg: arcsLeft(n(group[umaymah][0] - 2.6), n(group[umaymah][1] - 3.4), UMAYMAH),
        keys: track({
          opacity: spoken([[0.03, 0.2]]),
          xy: [
            [0.03, come, 0],
            [0.16, 0, 0]
          ]
        }),
        loop: speaking
      },
      {
        name: "their voices: giving the pledge",
        svg: arcsLeft(n(group[0][0] - 2.6), n(group[0][1] - 3.4), GROUP) + arcsLeft(n(group[4][0] - 2.6), n(group[4][1] - 3.4), GROUP),
        keys: voice([[0.28, 0.44]]),
        loop: speaking
      },
      ...group.map(
        ([x, y], i): SignPart => ({
          name: `in as much as you can and are able: a soft golden ring about each of their places ${i + 1}`,
          svg: care(x, n(y + 0.3), 3.6, 2.2, SOFT_GOLD),
          keys: showAt(at3(0.6 + i * 0.022), at3(0.612 + i * 0.022)),
          loop: soft
        })
      ),
      {
        name: "and glints over them",
        svg: glints(
          [
            [51, 97.4],
            [66, 96.6],
            [81, 97.4]
          ],
          1
        ),
        keys: showAt(0.8, 0.81),
        loop: twinkle()
      }
    ],
    words: linesOn(FOUR, ["Umaymah: we gave pledge to the Messenger", "Of Allah among a group of women, and he", "Said to us: in as much as you can and", "Are able."])
  };
}

// The best provision. Abdullah ibn Amr said: the Messenger of Allah ﷺ said: this world is but provisions, and there is
// no provision in this world better than a righteous wife (Sunan Ibn Majah 1855). No one is drawn: in Madinah, a stall
// of the market with its goods, sacks, dates and coins; his place, a golden ring, Abdullah ibn Amr's place by it, and a
// home on the right. Abdullah ibn Amr's voice tells of it, and his voice, soft and golden, speaks. A soft light comes on
// the goods of the market: this world is but provisions. Then a place shows at the door of the home, a righteous one; a
// soft golden ring comes about it, and glints over it: no provision of this world is better.
function theBestProvision(): SignArt {
  const his: [number, number] = [66, 101.4];
  const ibnAmr: [number, number] = [54, 106.6];
  const door: [number, number] = [126.2, 102.6];
  return {
    kind: "the-best-provision",
    ms: 7000,
    parts: [
      ...aDay([140, 18], [84, 24]),
      ...palms(
        [
          [92, 97, 12],
          [154, 98, 11]
        ],
        "Madinah"
      ),
      {
        name: "a stall of the market of Madinah, with its goods: sacks, dates and coins",
        svg: stall(30, 30, "#B5483A", 80, 94) + sack(20, 94, 0.45) + basketOfDates(27, 94) + coins(34, 94, 3) + sack(40.4, 94, 0.45, "#B8955A")
      },
      {
        name: "this world is but provisions: a soft light on the goods, growing faint beside the best of them",
        svg: glow(30, 90.6, 7, "#FFE7A0", 0.22),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.3, 1],
            [0.8, 1],
            [0.83, 0.4]
          ]
        }),
        loop: soft
      },
      { name: "a home on the right", svg: home(128, 99, 26, 16) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.12, 0.96]]), loop: speaking },
      { name: "Abdullah ibn Amr's place", svg: someone(ibnAmr[0], ibnAmr[1], 1.8, IBN_AMR) },
      { name: "Abdullah ibn Amr's voice: telling of it", svg: arcsLeft(n(ibnAmr[0] - 2.6), n(ibnAmr[1] - 3.4), IBN_AMR), keys: voice([[0.03, 0.1]]), loop: speaking },
      { name: "a righteous one's place, at the door of the home", svg: someone(door[0], door[1], 1.8, RIGHTEOUS), keys: showAt(0.77, 0.79) },
      { name: "the best provision: a soft light about it", svg: glow(door[0], n(door[1] - 0.6), 5, "#FFE7A0", 0.26), keys: showAt(0.81, 0.83), loop: soft },
      { name: "and a soft golden ring about it", svg: care(door[0], n(door[1] + 0.4), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.81, 0.826), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [120.4, 97.4],
            [132, 97]
          ],
          1.1
        ),
        keys: showAt(0.86, 0.87),
        loop: twinkle()
      }
    ],
    words: linesOn(FOUR, ["Abdullah ibn Amr: he said: this world is", "But provisions, and there is no", "Provision in this world better than a", "Righteous wife."])
  };
}

// Or as he said. Muhammad ibn Sirin said: whenever Anas ibn Malik finished narrating a hadith from the Messenger of
// Allah ﷺ, he would say: or as the Messenger of Allah ﷺ said (Sunan Ibn Majah 24). It was after his ﷺ time, so his
// place is not drawn. No one is drawn: by a home, Anas's place, and the places of those who sit with him to hear, Ibn
// Sirin's place among them. Ibn Sirin's voice tells of it. Anas's voice narrates a hadith, and stops: finished. Then
// Anas's voice speaks again: or as he said; a soft golden ring of care comes about Anas's place, and glints over it.
function orAsHeSaid(): SignArt {
  const anas: [number, number] = [40, 104.4];
  const sitting: [number, number][] = [
    [58, 102.6],
    [68, 105.8],
    [78, 102.6]
  ];
  const ibnSirin: [number, number] = [88, 105.8];
  return {
    kind: "or-as-he-said",
    ms: 7000,
    parts: [
      ...aDay([136, 18], [70, 24]),
      ...palms(
        [
          [116, 97, 13],
          [148, 98, 11]
        ],
        "the town"
      ),
      { name: "a home", svg: home(40, 99, 28, 16) },
      { name: "Anas's place, before it", svg: someone(anas[0], anas[1], 1.8, ANAS) },
      { name: "Anas's voice: narrating a hadith, and finishing it", svg: arcs(n(anas[0] + 2.8), n(anas[1] - 3.4), ANAS), keys: voice([[0.12, 0.44]]), loop: speaking },
      { name: "Anas's voice again: or as he said", svg: arcs(n(anas[0] + 2.8), n(anas[1] - 3.4), ANAS), keys: voice([[0.66, 0.96]]), loop: speaking },
      { name: "care with his words: a soft golden ring about Anas's place", svg: care(anas[0], n(anas[1] + 0.4), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.68, 0.7), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [34.6, 99.4],
            [45.4, 99]
          ],
          1
        ),
        keys: showAt(0.8, 0.81),
        loop: twinkle()
      },
      ...sitting.map(([x, y], i): SignPart => ({ name: `the place of one who sits to hear ${i + 1}`, svg: someone(x, y, 1.8, FOLK) })),
      { name: "Ibn Sirin's place, among them", svg: someone(ibnSirin[0], ibnSirin[1], 1.8, IBN_SIRIN) },
      { name: "Ibn Sirin's voice: telling of it", svg: arcs(n(ibnSirin[0] + 2.6), n(ibnSirin[1] - 3.4), IBN_SIRIN), keys: voice([[0.03, 0.1]]), loop: speaking }
    ],
    words: linesOn(FOUR, ["Ibn Sirin: whenever Anas ibn Malik", "Finished narrating a hadith from the", "Messenger of Allah, Anas would say: or", "As the Messenger of Allah said."])
  };
}

// We have grown old. Abdur-Rahman ibn Abi Laila said: we said to Zaid ibn Arqam: tell us a hadith from the Messenger
// of Allah ﷺ. He said: we have grown old and have forgotten, and ahadith from the Messenger of Allah ﷺ is difficult
// (Sunan Ibn Majah 25). The words leave out the page's "(narrating)" and "(not a simple matter)". It was after his ﷺ
// time, so his place is not drawn. No one is drawn: Zaid's home, and Zaid's place before it, with small soft lights by
// it: what Zaid had heard from him. The places of Abdur-Rahman and those with him come to Zaid, and Abdur-Rahman's voice
// asks. Zaid's voice answers: a soft silver ring comes about Zaid's place: grown old; the small soft lights fade, one
// after another: forgotten. Then a ring of care, deep gold, comes about Zaid's place: a weighty matter.
function weHaveGrownOld(): SignArt {
  const zaid: [number, number] = [120, 104.6];
  const askers: [number, number][] = [
    [96, 104.2],
    [88, 101.2],
    [88, 106.6]
  ];
  const come = 48;
  const lights: [number, number][] = [
    [116.4, 99.4],
    [120, 98.2],
    [123.6, 99.4]
  ];
  return {
    kind: "we-have-grown-old",
    ms: 8000,
    parts: [
      ...aDay([28, 18], [96, 24]),
      ...palms(
        [
          [16, 97, 12],
          [150, 98, 11]
        ],
        "the town"
      ),
      { name: "Zaid's home", svg: home(128, 100, 26, 16) },
      { name: "Zaid's place, before it", svg: someone(zaid[0], zaid[1], 1.8, ZAID) },
      ...lights.map(
        ([x, y], i): SignPart => ({
          name: `what Zaid had heard from him: a small soft light by Zaid's place, fading: forgotten ${i + 1}`,
          svg: `${glow(x, y, 1.6, "#FFE7A0", 0.3)}<circle cx="${x}" cy="${y}" r="0.5" fill="#FFF3CF"/>`,
          keys: track({
            opacity: [
              [at3(0.67 + i * 0.02), 1],
              [at3(0.69 + i * 0.02), 0]
            ]
          }),
          loop: soft
        })
      ),
      ...askers.map(
        ([x, y], i): SignPart => ({
          name: i === 0 ? "Abdur-Rahman's place, coming to Zaid" : `the place of one with Abdur-Rahman, coming to Zaid ${i}`,
          svg: someone(x, y, 1.8, i === 0 ? ABDUR_RAHMAN : FOLK),
          keys: track({
            xy: [
              [0.03, -come, 0],
              [0.12, 0, 0]
            ]
          })
        })
      ),
      { name: "Abdur-Rahman's voice, with those with him: asking Zaid", svg: arcs(n(askers[0][0] + 2.6), n(askers[0][1] - 3.4), ABDUR_RAHMAN), keys: voice([[0.14, 0.36]]), loop: speaking },
      { name: "Zaid's voice: answering", svg: arcsLeft(n(zaid[0] - 2.6), n(zaid[1] - 3.4), ZAID), keys: voice([[0.48, 0.96]]), loop: speaking },
      { name: "grown old: a soft silver ring about Zaid's place", svg: care(zaid[0], n(zaid[1] + 0.4), 4.4, 2.6, SILVER), keys: showAt(0.62, 0.64), loop: soft },
      { name: "a weighty matter: a ring of care, deep gold, about Zaid's place", svg: care(zaid[0], n(zaid[1] + 0.4), 6.4, 3.6, WEIGHTY), keys: showAt(0.83, 0.85), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Abdur-Rahman ibn Abi Laila: we said to",
      "Zaid ibn Arqam: tell us a hadith from the",
      "Messenger of Allah. Zaid said: we have",
      "Grown old and have forgotten, and ahadith",
      "From the Messenger of Allah is difficult."
    ])
  };
}

/** The scenes in this file, by kind. */
export const CAREFUL_ART = {
  "provision-will-reach-you": provisionWillReachYou,
  "as-you-are-able": asYouAreAble,
  "the-best-provision": theBestProvision,
  "or-as-he-said": orAsHeSaid,
  "we-have-grown-old": weHaveGrownOld
};
