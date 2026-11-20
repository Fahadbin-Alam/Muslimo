import { cloud, glow, n, nightSky, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { nightLand } from "./heedArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, SIX, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { farHills, FIVE } from "./wideArt";

/**
 * Steps: the steps of Bani Salama to the masjid, each one rewarded; the Muslim who keeps coming to the masjid, with whom
 * Allah is happy, as a family is happy when its absent one comes back; a bucket of water drawn for a date; and the
 * nights when his ﷺ family had no supper, and their bread was barley bread. Only the land, the sky, buildings, a well,
 * things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a
 * mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes,
 * and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes down
 * from the sky: what is good is a light, glints and a soft golden ring. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** The words of seven lines. */
export const SEVEN = [
  [0.02, 0.15],
  [0.166, 0.29],
  [0.306, 0.43],
  [0.446, 0.57],
  [0.586, 0.71],
  [0.726, 0.85],
  [0.866, 1]
] as const;

/** Anas's place and voice: a steel blue (as in leadArt). */
const ANAS = "#4E6E8E";
/** The places of Bani Salama: a warm brown. */
const SALAMA = "#9A6E4E";
/** Abu Hurairah's place and voice: a soft plum (as in greenArt). */
const ABU_HURAIRAH = "#8A5E6E";
/** The place of the Muslim who keeps coming to the masjid: a sage green. */
const COMER = "#5E7A5E";
/** The places of a family, and of its absent one: a soft violet. */
const FAMILY = "#7A6E9A";
/** Ali's place and voice: a deep green (as in greenArt). */
const ALI = "#3E6E5E";
/** Ibn Abbas's place and voice: a soft blue, seen at night. */
const IBN_ABBAS = "#8EA8D6";
/** The places of his ﷺ family: a soft violet, seen at night. */
const HIS_FAMILY = "#B8A8DA";

/** How a voice that speaks from `on` until `off`, for each pair, shows and goes. */
const spoken = (spans: [number, number][]) =>
  spans.flatMap(([on, off]): [number, number][] => [
    [on, 0],
    [at3(on + 0.006), 1],
    [off, 1],
    [at3(off + 0.006), 0]
  ]);

/** A voice that speaks from `on` until `off`, for each pair. */
export const voice = (spans: [number, number][]) => track({ opacity: spoken(spans) });

/** The sky, the sun, a cloud, the far hills and the land (as in leadArt). */
export const aDay = (sunAt: [number, number], cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide" as const, ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** A step on the land: a small golden mark, its middle at (x, y). */
const aStep = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.1" ry="0.5" fill="#C08A2E" opacity="0.9"/>`;

/** A date, a little larger than fastArt's, its middle at (x, y). */
const aDate = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="1.5" ry="1" fill="#7A3418"/><ellipse cx="${n(x - 0.5)}" cy="${n(y - 0.4)}" rx="0.5" ry="0.25" fill="#B0563A"/>`;

/** A shallow dish, empty, wider than worthArt's, its middle at (x, y). */
const wideDish = (x: number, y: number) =>
  `<path d="M${n(x - 4.6)} ${n(y - 1.2)} Q${x} ${n(y + 2)} ${n(x + 4.6)} ${n(y - 1.2)} Z" fill="#B8864A"/><path d="M${n(x - 4.6)} ${n(y - 1.2)} L${n(x + 4.6)} ${n(y - 1.2)}" stroke="#946A34" stroke-width="0.5"/>`;

/** A flat loaf of barley bread, its middle at (x, y) (as in dearArt). */
const loaf = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.3" fill="#C9A26A" stroke="#A9824A" stroke-width="0.3"/>` +
  `<circle cx="${n(x - 1)}" cy="${n(y - 0.2)}" r="0.3" fill="#9A7440"/><circle cx="${n(x + 0.9)}" cy="${n(y + 0.2)}" r="0.3" fill="#9A7440"/>`;

// The steps of Bani Salama. Anas said: Bani Salama intended to shift near the mosque, but the Messenger of Allah ﷺ
// disliked to see Madinah vacated, and said: O people of Bani Salama, do you not think that you will be rewarded for
// your footsteps which you take towards the mosque? So they stayed at their old places (Sahih al-Bukhari 1887). The
// words leave out the page's "(The people of)" and "(of the Prophet)", say "Madinah" for "Medina", and leave out the
// page's "which", so that the words fit. No one is drawn: the masjid of Madinah on the left, his place before it, a
// golden ring, with Anas's place by it; on the right, far off, the old homes of Bani Salama, with their places. Anas's
// voice tells of it, and faint rings show near the masjid: where they wished to move. His voice, soft and golden,
// speaks; then one of their places goes from its home along the land to the masjid, its steps showing behind it one
// after another, and a glint comes over each step: rewarded. Then it goes back to its home, the faint rings go, and a
// soft golden ring comes about each of their places: they stayed at their old places.
function theStepsOfBaniSalama(): SignArt {
  const his: [number, number] = [26, 100.4];
  const anas: [number, number] = [8, 106.4];
  const wished: [number, number][] = [
    [48, 99.4],
    [56, 101],
    [64, 99.4]
  ];
  const theirs: [number, number][] = [
    [118, 103.8],
    [128, 105.6],
    [140, 103.8]
  ];
  const walker = theirs[1];
  const atMasjid = 40;
  const far = n(atMasjid - walker[0]);
  const steps = [114, 105, 96, 87, 78, 69, 60, 51];
  const walk: [number, number] = [0.588, 0.672];
  const passes = (x: number) => at3(walk[0] + ((walker[0] - x) / (walker[0] - atMasjid)) * (walk[1] - walk[0]));
  return {
    kind: "the-steps-of-bani-salama",
    ms: 11000,
    parts: [
      ...aDay([140, 18], [80, 24]),
      ...palms([
        [72, 95, 11],
        [94, 96, 12]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.8) },
      { name: "the old homes of Bani Salama, far off", svg: home(124, 98, 16, 11) + home(146, 99, 14, 10) },
      {
        name: "where Bani Salama wished to move, near the masjid: faint rings",
        svg: wished.map(([x, y]) => someone(x, y, 1.8, SALAMA)).join(""),
        keys: track({
          opacity: [
            [0.07, 0],
            [0.09, 0.5],
            [0.87, 0.5],
            [0.89, 0]
          ]
        })
      },
      ...steps.map(
        (x, i): SignPart => ({
          name: `a step towards the masjid ${i + 1}`,
          svg: aStep(x, 107.2),
          keys: showAt(passes(x), at3(passes(x) + 0.006))
        })
      ),
      ...steps.map(
        (x, i): SignPart => ({
          name: `rewarded: a glint over a step ${i + 1}`,
          svg: glints([[x, 104.6]], 1.1),
          keys: showAt(at3(0.73 + i * 0.01), at3(0.736 + i * 0.01)),
          loop: { move: "twinkle", ms: 1300, low: 0.5, phase: i / steps.length }
        })
      ),
      ...theirs.map(
        ([x, y], i): SignPart => ({
          name: `they stayed at their old places: a soft golden ring about each ${i + 1}`,
          svg: care(x, n(y + 0.3), 3.6, 2.2, SOFT_GOLD),
          keys: showAt(0.952, 0.966),
          loop: soft
        })
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.38, 0.8]]), loop: speaking },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.8, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 2.6), n(anas[1] - 3.4), ANAS), keys: voice([[0.02, 0.06]]), loop: speaking },
      { name: "the places of Bani Salama, at their old homes 1", svg: someone(theirs[0][0], theirs[0][1], 1.8, SALAMA) },
      { name: "the places of Bani Salama, at their old homes 2", svg: someone(theirs[2][0], theirs[2][1], 1.8, SALAMA) },
      {
        name: "the place of one of Bani Salama, going to the masjid and back to its home",
        svg: someone(walker[0], walker[1], 1.8, SALAMA),
        keys: track({
          xy: [
            [walk[0], 0, 0],
            [walk[1], far, 0],
            [0.87, far, 0],
            [0.95, 0, 0]
          ]
        })
      }
    ],
    words: linesOn(SEVEN, [
      "Anas: Bani Salama intended to shift near",
      "The mosque but Allah's Messenger disliked",
      "To see Madinah vacated and said: O the",
      "People of Bani Salama! Don't you think",
      "That you will be rewarded for your",
      "Footsteps you take towards the mosque?",
      "So, they stayed at their old places."
    ])
  };
}

// Like a family's joy. Abu Hurairah said: the Prophet ﷺ said: a Muslim does not regularly attend the mosques to
// perform prayer and remember Allah, but Allah feels happy with him, just as the family of one who is absent feels
// happy when he comes back to them (Sunan Ibn Majah 800). The words say "the Muslim" for the page's "him", and "the
// absent one" for its "he", so that "he" is only the Prophet ﷺ. No one is drawn: the masjid of Madinah on the left,
// his place before it, a golden ring, with Abu Hurairah's place by it; the home of a Muslim, and on the right the home
// of a family. Abu Hurairah's voice tells of it, and his voice, soft and golden, speaks. The place of the Muslim goes
// from its home to the masjid, and a soft light comes at the door of the masjid: prayer and remembrance. Then a soft
// golden ring comes about its place, with glints over it. The places of the family show by their home, and far off the
// place of their absent one; it comes back to them, and a soft light comes about their places, with glints over them.
function likeAFamilysJoy(): SignArt {
  const his: [number, number] = [30, 104.4];
  const abuHurairah: [number, number] = [8, 106.4];
  const comer: [number, number] = [58.4, 102.6];
  const atMasjid: [number, number] = [21.2, 98.4];
  const go: [number, number] = [n(atMasjid[0] - comer[0]), n(atMasjid[1] - comer[1])];
  const family: [number, number][] = [
    [104, 103.6],
    [111, 105.2],
    [118, 103.6]
  ];
  const absent: [number, number] = [156, 103.8];
  const back = -32;
  return {
    kind: "like-a-familys-joy",
    ms: 10000,
    parts: [
      ...aDay([140, 18], [84, 24]),
      ...palms([
        [84, 96, 11],
        [140, 97, 11]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.8) },
      { name: "prayer and remembrance: a soft light at the door of the masjid", svg: glow(atMasjid[0], 93.6, 5.4, "#FFE7A0", 0.32), keys: showAt(0.34, 0.36), loop: soft },
      { name: "the home of the Muslim who keeps coming to the masjid", svg: home(62, 99, 14, 10) },
      { name: "a home on the right, of a family", svg: home(112, 99, 18, 12) },
      { name: "happy with the Muslim: a soft golden ring about its place", svg: care(atMasjid[0], n(atMasjid[1] + 0.3), 3.6, 2.2, SOFT_GOLD), keys: showAt(0.5, 0.52), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [16.6, 93.4],
            [21.2, 91.8],
            [25.8, 93.4]
          ],
          1
        ),
        keys: showAt(0.55, 0.56),
        loop: twinkle()
      },
      { name: "the family's joy: a soft light about their places", svg: glow(113, 104.2, 9, "#FFE7A0", 0.24), keys: showAt(0.91, 0.93), loop: soft },
      {
        name: "and glints over them",
        svg: glints(
          [
            [104, 99.4],
            [111, 98.2],
            [118, 99.4],
            [124, 99.6]
          ],
          1
        ),
        keys: showAt(0.93, 0.94),
        loop: twinkle()
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.07, 0.96]]), loop: speaking },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.8, ABU_HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 2.6), n(abuHurairah[1] - 3.4), ABU_HURAIRAH), keys: voice([[0.02, 0.06]]), loop: speaking },
      {
        name: "the place of the Muslim, going to the masjid",
        svg: someone(comer[0], comer[1], 1.8, COMER),
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.26, go[0], go[1]]
          ]
        })
      },
      ...family.map(
        ([x, y], i): SignPart => ({
          name: `the place of one of the family ${i + 1}`,
          svg: someone(x, y, 1.8, FAMILY),
          keys: showAt(0.66, 0.68)
        })
      ),
      {
        name: "the place of the one who is absent, far off, coming back to them",
        svg: someone(absent[0], absent[1], 1.8, FAMILY),
        keys: track({
          opacity: [
            [0.7, 0],
            [0.72, 1]
          ],
          xy: [
            [0.82, 0, 0],
            [0.9, back, 0]
          ]
        })
      }
    ],
    words: linesOn(SIX, [
      "Abu Hurairah: he said: a Muslim does not",
      "Regularly attend the mosques to perform",
      "Prayer and remember Allah, but Allah",
      "Feels happy with the Muslim just as the",
      "Family of one who is absent feels happy",
      "When the absent one comes back to them."
    ])
  };
}

// A bucket for a date. Ali said: I used to draw water, one bucket for a date, and I stipulated that they should be good
// quality, dried dates (Sunan Ibn Majah 2447). No one is drawn: a well of stones among palms, with a frame of wood over
// it and a wheel, a rope and a bucket; Ali's place by the well, and a dish by it. Ali's voice tells of it. The bucket
// goes down into the well and comes up full, three times, and each time it comes up, a date shows on the dish: one
// bucket for a date. Then a soft light comes about the dates, with glints over them: good quality.
function aBucketForADate(): SignArt {
  const ali: [number, number] = [86, 103.4];
  const deep = 10;
  const rope = 6.6;
  const cycles: [number, number, number, number][] = [
    [0.05, 0.09, 0.1, 0.15],
    [0.17, 0.21, 0.22, 0.27],
    [0.34, 0.38, 0.39, 0.44]
  ];
  const datesAt = [0.155, 0.275, 0.445];
  const dates: [number, number][] = [
    [95, 103.3],
    [98, 102.9],
    [101, 103.3]
  ];
  const opening = `<ellipse cx="70" cy="92" rx="8" ry="2.2" fill="#7D6A52"/><ellipse cx="70" cy="92.3" rx="6.2" ry="1.5" fill="#2F3B44"/>`;
  const frame =
    `<path d="M61 97 L61 74.4 M79 97 L79 74.4" stroke="#7A5A3A" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M59.6 74.4 L80.4 74.4" stroke="#6E4E30" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M70 74.4 L70 76" stroke="#5E4428" stroke-width="0.5"/><circle cx="70" cy="76" r="1.5" fill="#8A6A44" stroke="#5E4428" stroke-width="0.4"/>`;
  const stones =
    `<ellipse cx="70" cy="99.2" rx="9.4" ry="1.2" fill="#000000" opacity="0.1"/>` +
    `<path d="M62 92 A8 2.2 0 0 0 78 92 L78 99 L62 99 Z" fill="#A89276"/>` +
    `<path d="M62 96 L78 96 M66 94.2 L66 96 M74 94.2 L74 96 M64 96 L64 99 M70 96 L70 99 M76 96 L76 99" stroke="#8A7458" stroke-width="0.5"/>` +
    `<path d="M62 92 A8 2.2 0 0 0 78 92" stroke="#8A7458" stroke-width="0.6" fill="none"/>`;
  const downAndUp = cycles.flatMap(([a, b, c, d]): [number, number, number][] => [
    [a, 0, 0],
    [b, 0, deep],
    [c, 0, deep],
    [d, 0, 0]
  ]);
  const longer = (rope + deep) / rope;
  return {
    kind: "a-bucket-for-a-date",
    ms: 9000,
    parts: [
      ...aDay([140, 18], [100, 26]),
      ...palms([
        [22, 95, 12],
        [40, 96, 10],
        [122, 96, 12],
        [146, 97, 10]
      ]),
      { name: "the opening of the well", svg: opening },
      { name: "a frame of wood over the well, with its wheel", svg: frame },
      {
        name: "the rope, going down and up",
        svg: `<path d="M70 77.5 L70 84.1" stroke="#C8B08A" stroke-width="0.4"/>`,
        keys: track({ scaleY: cycles.flatMap(([a, b, c, d]): [number, number][] => [[a, 1], [b, longer], [c, longer], [d, 1]]) }),
        origin: { x: 70, y: 77.5 }
      },
      {
        name: "the bucket, going down into the well and coming up full",
        svg:
          `<path d="M67.8 85.6 L72.2 85.6 L71.7 89 L68.3 89 Z" fill="#7E5A36"/><ellipse cx="70" cy="85.6" rx="2.2" ry="0.6" fill="#5EB1E4"/>` +
          `<path d="M68 85.6 Q70 82.6 72 85.6" stroke="#4E3420" stroke-width="0.4" fill="none"/>`,
        keys: track({ xy: downAndUp })
      },
      { name: "the stones of the well", svg: stones },
      { name: "good quality: a soft light about the dates", svg: glow(98, 103.2, 4.6, "#FFE7A0", 0.3), keys: showAt(0.68, 0.7), loop: soft },
      { name: "a dish by Ali's place", svg: wideDish(98, 104.6) },
      ...dates.map(
        ([x, y], i): SignPart => ({
          name: `a date for a bucket ${i + 1}`,
          svg: aDate(x, y),
          keys: showAt(datesAt[i], at3(datesAt[i] + 0.008))
        })
      ),
      {
        name: "and glints over them",
        svg: glints(
          [
            [94.6, 99.6],
            [98, 98.4],
            [101.4, 99.6]
          ],
          1.1
        ),
        keys: showAt(0.72, 0.73),
        loop: twinkle()
      },
      { name: "Ali's place", svg: someone(ali[0], ali[1], 1.8, ALI) },
      { name: "Ali's voice: telling of it", svg: arcsLeft(n(ali[0] - 2.6), n(ali[1] - 3.4), ALI), keys: voice([[0.02, 0.96]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Ali: I used to draw water, one bucket for", "A date, and I stipulated that they should", "Be good quality, dried dates."])
  };
}

// Nights without supper. Ibn Abbas said: the Messenger of Allah ﷺ would spend many consecutive nights while his family
// did not have supper, and most of the time their bread was barley bread (Jami at-Tirmidhi 2360). No one is drawn: it
// is night over Madinah, with stars, dark hills and dark homes; his home, with his place at its door, a golden ring,
// and the places of his family by it; Ibn Abbas's place on the left. Ibn Abbas's voice tells of it. The moon goes over
// the sky, night after night, three times. Then an empty dish shows before their places: no supper; then loaves of
// barley bread show by it. No sun is drawn: it is night, and no lamp is lit.
function nightsWithoutSupper(): SignArt {
  const his: [number, number] = [82, 103.4];
  const ibnAbbas: [number, number] = [8, 106.4];
  const family: [number, number][] = [
    [93, 103.8],
    [100, 102.8]
  ];
  const rise: [number, number] = [66, 26];
  const set: [number, number] = [-66, 26];
  const nights: [number, number][] = [
    [0.09, 0.165],
    [0.22, 0.29],
    [0.295, 0.365]
  ];
  const overSky = nights.flatMap(([a, b], i): [number, number, number][] => [
    [a, rise[0], rise[1]],
    [at3((a + b) / 2), 0, 0],
    [b, set[0], set[1]],
    ...(i < nights.length - 1 ? ([[at3(b + 0.002), rise[0], rise[1]]] as [number, number, number][]) : [])
  ]);
  const shown = nights.flatMap(([a, b]): [number, number][] => [
    [a, 0],
    [at3(a + 0.01), 1],
    [at3(b - 0.01), 1],
    [b, 0]
  ]);
  return {
    kind: "nights-without-supper",
    ms: 11000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [14, 16],
          [34, 26],
          [58, 12],
          [104, 10],
          [128, 24],
          [148, 14],
          [70, 34]
        ]),
        loop: twinkle(2400)
      },
      {
        name: "the moon, going over the sky: night after night",
        svg: `${glow(80, 16, 6, "#FFF4D0", 0.12)}${crescent(80, 16, 3.4, 1.6, "#F5E9C0")}`,
        keys: track({ xy: overSky, opacity: shown })
      },
      { name: "hills in the dark, far off", svg: peaks([[18, 9, 24], [50, 12, 30], [86, 8, 22], [116, 11, 28], [150, 9, 22]], 67, "#3A4263", false) },
      { name: "the land at night", svg: nightLand(62, [[18, 76], [62, 74], [124, 78], [30, 116], [140, 116]]) },
      { name: "homes of Madinah, dark", svg: home(36, 98, 14, 10, "#5A4C40", "#4E4236", "#2E2620") + home(134, 99, 16, 11, "#5A4C40", "#4E4236", "#2E2620") },
      { name: "his home", svg: home(84, 100, 22, 13, "#6A5A4C", "#5A4C40", "#2E2620") },
      { name: "no supper: an empty dish before their places", svg: wideDish(87, 106.8), keys: showAt(0.42, 0.44) },
      { name: "their bread: loaves of barley bread", svg: loaf(102, 106.8) + loaf(107.6, 106.2), keys: showAt(0.81, 0.83) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      ...family.map(
        ([x, y], i): SignPart => ({
          name: `the places of his family ${i + 1}`,
          svg: someone(x, y, 1.8, HIS_FAMILY)
        })
      ),
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.8, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 2.6), n(ibnAbbas[1] - 3.4), IBN_ABBAS), keys: voice([[0.02, 0.96]]), loop: speaking }
    ],
    words: linesOn(FIVE, [
      "Ibn Abbas: the Messenger of Allah",
      "Would spend many consecutive nights",
      "And his family did not have supper,",
      "And most of the time their bread was",
      "Barley bread."
    ])
  };
}

export const STEPS_ART = {
  "the-steps-of-bani-salama": theStepsOfBaniSalama,
  "like-a-familys-joy": likeAFamilysJoy,
  "a-bucket-for-a-date": aBucketForADate,
  "nights-without-supper": nightsWithoutSupper
};
