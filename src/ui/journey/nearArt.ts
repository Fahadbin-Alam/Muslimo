import { animalAt, cloud, glow, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, DAWN, palms, tent, track } from "./daysArt";
import { cloth, greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { kabah } from "./historyArt";
import { dish } from "./worthArt";
import { at3 } from "./storyArt";

/**
 * Those near, and what is owed to them, in his ﷺ days: the one who asked leave to go out for jihad and was sent back to
 * strive in serving his parents; Ja'far, the best of people to the poor, who fed them what was in his home, even a butter
 * skin with nothing in it; the boys who went out to Thaniyyat al-Wada' to meet him as he came back from Tabuk; the folk
 * at Quba who heard in their Fajr prayer that he had been told to face the Ka'bah, and turned to it; the caravan that
 * came on a Friday, when all left but twelve; the cloak Abu Hurairah spread out and wrapped to him, after which he forgot
 * nothing; and Zaynab, who spent on her husband and the orphans in her care, and had two rewards for it. Only the land,
 * the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not
 * even a hand or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle
 * goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: what was
 * revealed to him is a soft golden glow about his place.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#E8C878";

/** A pale light, for a mark or a ring that is not gold. */
const PALE = "#FFF3D6";

/** Opacity keys through the given points, each [time, opacity]. */
const fade = (points: [number, number][]) => track({ opacity: points });

/** The land from y 61 down, with a few tufts of dry grass. */
const nearLand = (fill?: string) =>
  landOf(
    [
      [24, 110],
      [70, 112],
      [118, 110],
      [150, 108]
    ],
    fill
  );

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across, the hills and the land. */
const day = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: nearLand() }
];

/** A camel of the picture cards with its load, its feet's middle at (x, y), `s` times its size, facing left. */
const ladenCamel = (x: number, y: number, s: number) => {
  const cx = x - 50 * s;
  const cy = y - 73 * s;
  const hump = cx + 60 * s;
  const top = cy + 26 * s;
  return (
    animalAt("camel", n(cx), n(cy), s, true) +
    `<rect x="${n(hump - 9 * s)}" y="${n(top - 2 * s)}" width="${n(18 * s)}" height="${n(5 * s)}" rx="${n(2 * s)}" fill="#9C3D1E"/>` +
    `<rect x="${n(hump - 13 * s)}" y="${n(top + 2 * s)}" width="${n(9 * s)}" height="${n(14 * s)}" rx="${n(2 * s)}" fill="#C8A274"/>` +
    `<rect x="${n(hump + 4 * s)}" y="${n(top + 2 * s)}" width="${n(9 * s)}" height="${n(14 * s)}" rx="${n(2 * s)}" fill="#B58D5E"/>`
  );
};

/** A small butter skin of leather, lying flat with nothing in it, its middle at (x, y), its tied neck to the right. */
const butterSkin = (x: number, y: number) =>
  `<ellipse cx="${n(x - 0.4)}" cy="${y}" rx="2.7" ry="1" fill="#9A6436"/>` +
  `<path d="M${n(x + 2)} ${n(y - 0.5)} L${n(x + 3.4)} ${n(y - 0.9)} L${n(x + 3.4)} ${n(y + 0.2)} L${n(x + 2)} ${n(y + 0.5)} Z" fill="#7E4E28"/>` +
  `<path d="M${n(x + 2.4)} ${n(y - 0.7)} L${n(x + 2.4)} ${n(y + 0.6)}" stroke="#5E3C1E" stroke-width="0.4"/>` +
  `<path d="M${n(x - 2.8)} ${n(y + 0.1)} Q${n(x - 0.4)} ${n(y + 0.5)} ${n(x + 1.8)} ${n(y + 0.1)}" stroke="#7E4E28" stroke-width="0.3" fill="none"/>`;

/** The butter skin split open in two, its middle at (x, y): each half laid open, light inside. */
const skinSplit = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${n(y - 0.5)} Q${x} ${n(y - 3.1)} ${n(x + 3)} ${n(y - 0.6)} Z" fill="#9A6436"/>` +
  `<path d="M${n(x - 2.6)} ${n(y - 0.7)} Q${x} ${n(y - 2.5)} ${n(x + 2.4)} ${n(y - 0.8)} Z" fill="#E9D3A6"/>` +
  `<path d="M${n(x - 3.2)} ${n(y + 0.3)} Q${x} ${n(y + 2.9)} ${n(x + 3)} ${n(y + 0.4)} Z" fill="#9A6436"/>` +
  `<path d="M${n(x - 2.6)} ${n(y + 0.5)} Q${x} ${n(y + 2.3)} ${n(x + 2.4)} ${n(y + 0.6)} Z" fill="#E9D3A6"/>`;

/** A cloak spread out on the ground, from x 65.6 to 81.4, with its two stripes: no one in it. */
const SPREAD_CLOAK =
  `<path d="M66.6 104.4 L80.4 104.4 L81.4 107.6 L65.6 107.6 Z" fill="#E7D7B4"/>` +
  `<path d="M66.9 105.2 L80.7 105.2 M65.9 106.8 L81.1 106.8" stroke="#B86A46" stroke-width="0.4"/>`;

// Strive in serving them. Abdullah ibn Amr said: a man came to the Prophet ﷺ asking his permission to take part in
// jihad. He said: are your parents alive? He said: yes. He said: then strive in serving them (Sahih al-Bukhari 3004). No
// one is drawn: on the left, the home of his parents and their places by its door; by the masjid of Madinah, his place,
// a golden ring; far off on the right, the tents of those going out. The asker's place comes from the home to his place,
// its voice asks, and a faint way shows toward the far tents. His voice asks, and a faint golden line goes back to the
// home; the asker's voice answers, and a soft ring comes about each of the two: alive. His voice speaks again: the way to
// the tents fades, a soft golden way shows back to the home, the asker's place goes along it to the two, and a soft
// golden ring comes about the three, with a warm glow about the home.
function serveYourParents(): SignArt {
  const going: [number, number, number][] = [
    [0.03, 0, 0],
    [0.12, 34, 0],
    [0.84, 34, 0],
    [0.91, 0, 0]
  ];
  return {
    kind: "serve-your-parents",
    ms: 9000,
    parts: [
      ...day(126, 92, 9000),
      ...palms([
        [4, 97, 13],
        [44, 95, 11],
        [104, 95, 12]
      ]),
      { name: "far off: the tents of those going out", svg: tent(131, 91, 7, 5.6) + tent(140, 90.2, 8, 6.4) + tent(149, 91.2, 7, 5.6) },
      { name: "the home of the two who raised him", svg: home(24, 100, 22, 15) },
      { name: "the masjid of Madinah", svg: madinahMasjid(54, 98, 0.56) },
      { name: "the places of the two who raised him", svg: someone(16.6, 104.4) + someone(21.8, 104.8) },
      { name: "his place, a golden ring", svg: ring(74, 103.6, 2.6, GOLD) },
      { name: "the asker's place", svg: someone(28.6, 104.6), keys: track({ xy: going }) },
      { name: "the asker's voice: asking leave", svg: arcs(65.4, 103.2, VOICE), keys: showFor(0.2, 0.21, 0.39, 0.4), loop: speaking },
      { name: "to go out: a faint way toward the far tents", svg: way("M77 105.6 C96 104.6 114 98.4 128 93", "#FFFFFF", 0.6), keys: showFor(0.24, 0.27, 0.8, 0.82) },
      { name: "his voice: are they alive", svg: arcsLeft(71, 102.2, GOLD), keys: showFor(0.395, 0.405, 0.59, 0.6), loop: speaking },
      { name: "are they alive: a faint golden line back to the home", svg: lookLine(70, 101.4, 27, 100.6, 90), keys: showFor(0.43, 0.46, 0.59, 0.61) },
      { name: "the asker's voice: yes", svg: arcs(65.4, 103.2, VOICE), keys: showFor(0.59, 0.6, 0.785, 0.795), loop: speaking },
      {
        name: "alive: a soft ring about each of the two",
        svg: care(16.6, 104.4, 2.6, 1.3, "#FFFFFF") + care(21.8, 104.8, 2.6, 1.3, "#FFFFFF"),
        keys: showAt(0.62, 0.65),
        loop: soft
      },
      { name: "his voice: then strive in serving them", svg: arcsLeft(71, 102.2, GOLD), keys: showAt(0.785, 0.795), loop: speaking },
      { name: "serving them: a soft golden way back to the home", svg: way("M60 106.2 C50 107 40 106.8 31 105.8", SOFT_GOLD, 0.8), keys: showAt(0.81, 0.83) },
      { name: "a soft golden ring about the three", svg: care(22.6, 104.6, 9.6, 2.8, SOFT_GOLD), keys: showAt(0.92, 0.94), loop: soft },
      { name: "a warm glow about the home", svg: glow(24, 95, 8, WARM, 0.28), keys: showAt(0.93, 0.95) }
    ],
    words: [
      { text: "A man came to him", from: 0.02, to: 0.18 },
      { text: "asking his permission to go for jihad", from: 0.195, to: 0.375 },
      { text: "He said: are your parents alive?", from: 0.39, to: 0.57 },
      { text: "The man said: yes", from: 0.585, to: 0.765 },
      { text: "He said: then strive in serving them", from: 0.78, to: 1 }
    ]
  };
}

// Best to the poor. Abu Hurairah said: I would press my belly to the pebbles from hunger ... and the best of people to
// the poor was Ja'far ibn Abi Talib: he would take us home with him and feed us what was in his home, even bringing out
// to us the butter skin with nothing in it, and we would split it open and lick what was in it (Sahih al-Bukhari 3708).
// No one is drawn: by the masjid of Madinah, Abu Hurairah's place, with pebbles on the ground by it and a faint grey
// ring about it, hungry; then the places of two more of the poor, hungry too. Ja'far's place shows, with a soft golden
// ring about it; a way shows to his home, and all the places go along it with him. A cloth is spread by his home with a
// dish on it, and the grey rings fade: fed. A butter skin comes out of his door to the cloth, lying flat, with nothing
// in it; it splits open in two halves, a few glints of butter in them, and the glints go one by one: licked. A warm glow
// comes about them all.
function bestToThePoor(): SignArt {
  /** A place and where it goes with Ja'far: [x, y, across, down]. */
  const places: Record<string, [number, number, number, number]> = {
    abuHurairah: [40, 104.6, 57, -0.4],
    poor1: [46.6, 105.4, 54.4, 2],
    poor2: [52.8, 104.4, 74.8, 2.8],
    jafar: [62, 104, 69, 0]
  };
  const withHim = (key: string): [number, number, number][] => [
    [0.41, 0, 0],
    [0.46, places[key][2], places[key][3]]
  ];
  // A place shown at `from`, with its grey ring of hunger shown just after and gone once fed.
  const hungry = (key: string, name: string, from: number): SignPart[] => {
    const [x, y] = places[key];
    return [
      { name: `hungry: a faint grey ring about ${name}`, svg: greyRing(x, y, 3.2, 1.5), keys: track({ opacity: [[at3(from + 0.02), 0], [at3(from + 0.04), 1], [0.565, 1], [0.585, 0]], xy: withHim(key) }) }
    ];
  };
  const skinAt: [number, number] = [117.6, 103];
  const glint = (i: number, x: number, y: number): SignPart => ({
    name: `licked: a glint of butter ${i}`,
    svg: sparkle(x, y, 0.75, "#F6D66B"),
    keys: fade([
      [0.81, 0],
      [0.825, 1],
      [at3(0.885 + i * 0.015), 1],
      [at3(0.895 + i * 0.015), 0]
    ]),
    loop: soft
  });
  return {
    kind: "best-to-the-poor",
    ms: 11500,
    parts: [
      ...day(30, 96, 11500),
      ...palms([
        [4, 97, 13],
        [84, 93, 11],
        [156, 96, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 98, 0.6) },
      { name: "Ja'far's home", svg: home(142, 100, 20, 15) },
      {
        name: "pebbles on the ground by Abu Hurairah's place",
        svg: [
          [36.6, 106.6, 0.8],
          [39, 107.3, 0.7],
          [41.8, 106.9, 0.9],
          [44, 107.6, 0.6],
          [38.2, 108.2, 0.6]
        ]
          .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.6)}" fill="#A8977C"/>`)
          .join("")
      },
      { name: "the way to Ja'far's home", svg: way("M66 106 C86 107 108 106.8 130 104.8", "#F4E3BC", 1), keys: showFor(0.395, 0.405, 0.525, 0.54) },
      { name: "a cloth spread by his home", svg: cloth(104, 122, 101.4), keys: showAt(0.525, 0.54) },
      {
        name: "what was in his home: a dish on the cloth",
        svg: dish(109.4, 103.2) + [[108, 102], [109.4, 101.7], [110.8, 102]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.7" ry="0.5" fill="#6B3A1E"/>`).join(""),
        keys: showAt(0.54, 0.555)
      },
      {
        name: "a butter skin, with nothing in it",
        svg: butterSkin(skinAt[0], skinAt[1]),
        keys: track({
          opacity: [
            [0.655, 0],
            [0.665, 1],
            [0.8, 1],
            [0.815, 0]
          ],
          xy: [
            [0.66, 22.6, -4],
            [0.705, 0, 0]
          ]
        })
      },
      { name: "split open: the skin in two halves", svg: skinSplit(skinAt[0], skinAt[1]), keys: showAt(0.8, 0.815) },
      glint(1, 116.4, 104.1),
      glint(2, 118.2, 104.2),
      glint(3, 117.4, 101.7),
      { name: "Abu Hurairah's place", svg: someone(40, 104.6), keys: track({ xy: withHim("abuHurairah") }) },
      ...hungry("abuHurairah", "Abu Hurairah's place", 0.01),
      { name: "a place of the poor 1", svg: someone(46.6, 105.4), keys: track({ opacity: [[0.15, 0], [0.17, 1]], xy: withHim("poor1") }) },
      { name: "a place of the poor 2", svg: someone(52.8, 104.4), keys: track({ opacity: [[0.15, 0], [0.17, 1]], xy: withHim("poor2") }) },
      ...hungry("poor1", "a place of the poor 1", 0.15),
      ...hungry("poor2", "a place of the poor 2", 0.15),
      { name: "Ja'far's place", svg: someone(62, 104), keys: track({ opacity: [[0.27, 0], [0.29, 1]], xy: withHim("jafar") }) },
      {
        name: "the best to the poor: a soft golden ring about Ja'far's place",
        svg: care(62, 104, 3.4, 1.6, SOFT_GOLD),
        keys: track({ opacity: [[0.3, 0], [0.32, 1]], xy: withHim("jafar") }),
        loop: soft
      },
      { name: "a warm glow about them all", svg: glow(114, 104.4, 8, WARM, 0.27), keys: showAt(0.94, 0.955) }
    ],
    words: [
      { text: "I pressed my belly to pebbles from hunger", from: 0.02, to: 0.125 },
      { text: "The best of people to the poor", from: 0.14, to: 0.245 },
      { text: "was Ja'far ibn Abi Talib", from: 0.26, to: 0.375 },
      { text: "Ja'far would take us home and feed us", from: 0.39, to: 0.505 },
      { text: "what was in his home", from: 0.52, to: 0.635 },
      { text: "even bringing out to us a butter skin", from: 0.65, to: 0.755 },
      { text: "with nothing in it, and we split it open", from: 0.77, to: 0.875 },
      { text: "and licked what was in it", from: 0.89, to: 1 }
    ]
  };
}

// Out to welcome him. As-Sa'ib ibn Yazid said: I remember that I went out with the boys to meet the Prophet ﷺ at
// Thaniyyat al-Wada', as he came back from the expedition of Tabuk (Sahih al-Bukhari 4427). No one is drawn: the homes of
// Madinah on the left; on the right, two hills with a pass between them, Thaniyyat al-Wada', and the way from Tabuk
// coming through it. As-Sa'ib's place and the places of the little ones come out from the homes, small glints of
// gladness over them, and go along the way toward the pass; a soft golden ring comes about the pass, and they go on to
// its foot. Then his place, a golden ring, comes through the pass along the way from Tabuk, the places of two with him
// after it; a warm glow comes about the little ones, welcoming him, and a soft golden ring about his place.
function outToWelcome(): SignArt {
  const going = track({
    opacity: [
      [0.025, 0],
      [0.04, 1]
    ],
    xy: [
      [0.04, 0, 0],
      [0.16, 22, 0],
      [0.3, 22, 0],
      [0.42, 44, -0.6],
      [0.52, 44, -0.6],
      [0.64, 66, -1.4]
    ]
  });
  const little: [number, number][] = [
    [36, 105.6],
    [30.4, 104.6],
    [24.6, 105.8],
    [18.8, 104.8]
  ];
  return {
    kind: "out-to-welcome",
    ms: 8000,
    parts: [
      ...day(30, 96, 8000),
      ...palms([
        [21.4, 96, 12],
        [62, 95.4, 11]
      ]),
      { name: "the homes of Madinah", svg: home(12, 99.4, 16, 11) + home(30, 100, 14, 10) + home(47, 99.2, 15, 11) },
      {
        name: "the two hills of the pass",
        svg:
          `<path d="M98 99.8 C104 92 113 84 121 86.4 C125 88 127.4 93 129 97.4 L129 99.8 Z" fill="#C4A67A"/>` +
          `<path d="M133 97.4 C135 90 141 83 148 82.6 C153 82.4 157 86 160 88.6 L160 99.8 Z" fill="#B6986C"/>`
      },
      { name: "the way from Tabuk, through the pass", svg: way("M131 97 C122 99.8 106 102.6 84 104.6", "#F4E3BC", 1) },
      { name: "Thaniyyat al-Wada': a soft golden ring about the pass", svg: care(131, 93.6, 9, 5, SOFT_GOLD), keys: showAt(0.5, 0.53), loop: soft },
      { name: "As-Sa'ib's place", svg: someone(42, 104.8, 1.3), keys: going },
      { name: "the places of the little ones with As-Sa'ib", svg: little.map(([x, y]) => someone(x, y, 1.2)).join(""), keys: going },
      {
        name: "glad: small glints over the little ones",
        svg: [[42, 104.8] as [number, number], ...little].map(([x, y]) => sparkle(x, n(y - 2.8), 0.6, "#FFE7A0")).join(""),
        keys: track({
          opacity: [
            [0.265, 0],
            [0.285, 1]
          ],
          xy: [
            [0.3, 22, 0],
            [0.42, 44, -0.6],
            [0.52, 44, -0.6],
            [0.64, 66, -1.4]
          ]
        }),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      {
        name: "his place, a golden ring",
        svg: ring(118, 100.6, 2.6, GOLD),
        keys: track({
          opacity: [
            [0.745, 0],
            [0.76, 1]
          ],
          xy: [
            [0.745, 13, -3.6],
            [0.85, 0, 0]
          ]
        })
      },
      {
        name: "the places of two with him",
        svg: someone(124.6, 99.2) + someone(129.6, 97.8),
        keys: track({
          opacity: [
            [0.79, 0],
            [0.81, 1]
          ],
          xy: [
            [0.79, 6, -1.6],
            [0.88, 0, 0]
          ]
        })
      },
      { name: "welcoming him: a warm glow about the little ones", svg: glow(94, 104, 7, WARM, 0.26) + glow(106, 103, 6, WARM, 0.26), keys: showAt(0.88, 0.9) },
      { name: "back from Tabuk: a soft golden ring about his place", svg: care(118, 100.6, 4.2, 1.9, SOFT_GOLD), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: [
      { text: "I remember going out with the boys", from: 0.02, to: 0.24 },
      { text: "to meet him", from: 0.255, to: 0.48 },
      { text: "at Thaniyyat al-Wada'", from: 0.495, to: 0.72 },
      { text: "as he came back from Tabuk", from: 0.735, to: 1 }
    ]
  };
}

// Turning in the prayer. Ibn Umar said: while the people were praying Fajr in the masjid of Quba, someone came and said:
// Allah has revealed Quran to the Prophet ﷺ that he should face the Ka'bah, so face it; and they turned to the Ka'bah
// (Sahih al-Bukhari 4488). No one is drawn: at dawn, with the last stars, the masjid of Quba, and two rows of places
// before it, a small mark at the front of each place, and a faint way going off to the left, the way they faced; far off
// on the left, the homes of Madinah, and his place there, a small golden ring. A soft ring comes about the rows,
// praying, and a soft light about the masjid. The comer's place comes from Madinah, and its voice speaks; a soft golden
// glow comes far off over his place: revealed to him. The Ka'bah shows far off on the right, with a soft golden glow, and
// a soft golden way goes toward it. The way they faced fades, the mark at each place turns about to the other side,
// toward the Ka'bah, and a soft golden ring comes about the rows as the dawn grows.
function qubaTurn(): SignArt {
  const rows: [number, number][] = [
    [44, 102.6],
    [52, 102.6],
    [60, 102.6],
    [68, 102.6],
    [48, 106.6],
    [56, 106.6],
    [64, 106.6],
    [72, 106.6]
  ];
  return {
    kind: "quba-turn",
    ms: 10500,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      {
        name: "the last stars",
        svg: stars([
          [14, 10],
          [40, 18],
          [66, 8],
          [92, 16],
          [118, 9],
          [150, 12],
          [30, 30],
          [78, 28],
          [134, 26]
        ]),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "hills", svg: hills("#A48F6C") },
      { name: "the land at dawn", svg: nearLand("#D2B98C") },
      {
        name: "far off: the homes of Madinah",
        svg:
          `<rect x="4" y="88.4" width="7" height="4.4" fill="#A88B66"/><rect x="12.6" y="89" width="6" height="3.8" fill="#9C805C"/><rect x="20" y="88.8" width="5.4" height="4" fill="#A88B66"/>` +
          `<rect x="6.6" y="90.6" width="1.2" height="2.2" fill="#5E4630"/><rect x="14.8" y="91" width="1.1" height="1.8" fill="#5E4630"/><rect x="22" y="90.8" width="1.1" height="2" fill="#5E4630"/>`
      },
      { name: "his place far off, in Madinah: a small golden ring", svg: ring(14.6, 94.6, 1.3, GOLD) },
      { name: "the masjid of Quba", svg: madinahMasjid(30, 98, 0.62) },
      { name: "the masjid of Quba: a soft light about it", svg: wash(45, 92, 19, 8, PALE, 0.14), keys: showAt(0.15, 0.18) },
      { name: "the way they faced before: a faint way off to the left", svg: way("M40 104.6 C30 104 16 103.2 0 102.4", PALE, 0.6), keys: fade([[0.8, 1], [0.82, 0]]) },
      { name: "the places of those praying", svg: rows.map(([x, y]) => someone(x, y)).join("") },
      ...rows.map(
        ([x, y], i): SignPart => ({
          name: `facing: a small mark before place ${i + 1}`,
          svg: `<path d="M${n(x - 2.3)} ${n(y - 1.1)} Q${n(x - 3.1)} ${y} ${n(x - 2.3)} ${n(y + 1.1)}" stroke="${PALE}" stroke-width="0.55" fill="none"/>`,
          origin: { x, y },
          keys: track({
            rotate: [
              [0.81, 0],
              [0.87, 180]
            ]
          })
        })
      ),
      { name: "praying: a soft white ring about the rows", svg: care(58, 104.4, 17, 4.2, "#FFFFFF"), keys: showFor(0.03, 0.06, 0.88, 0.9), loop: soft },
      {
        name: "the comer's place",
        svg: someone(30.6, 107.2),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.29, 1]
          ],
          xy: [
            [0.28, -26, -3],
            [0.335, 0, 0]
          ]
        })
      },
      { name: "the comer's voice", svg: arcs(33.4, 105.8, VOICE), keys: showFor(0.34, 0.35, 0.8, 0.81), loop: speaking },
      { name: "revealed to him: a soft golden glow far off over his place", svg: glow(14.6, 92, 6.4, WARM, 0.3), keys: showAt(0.41, 0.43) },
      { name: "a soft golden glow about the Ka'bah", svg: glow(146.6, 91.2, 6.4, WARM, 0.28), keys: showAt(0.56, 0.58) },
      { name: "far off: the Ka'bah", svg: kabah(144, 94, 5), keys: showAt(0.54, 0.56) },
      { name: "toward the Ka'bah: a soft golden way off to the right", svg: way("M76 105 C96 103.6 118 99.8 140 95.6", SOFT_GOLD, 0.8), keys: showAt(0.67, 0.69) },
      { name: "turned: a soft golden ring about the rows", svg: care(58, 104.4, 17, 4.2, SOFT_GOLD), keys: showAt(0.88, 0.9), loop: soft },
      { name: "the dawn growing: a warm light low over the hills", svg: wash(80, 60, 84, 8, "#FFD9A0", 0.12), keys: showAt(0.88, 0.95) }
    ],
    words: [
      { text: "While the people were praying Fajr", from: 0.02, to: 0.13 },
      { text: "in the masjid of Quba", from: 0.145, to: 0.26 },
      { text: "someone came and said:", from: 0.275, to: 0.39 },
      { text: "Allah has revealed Quran to him", from: 0.405, to: 0.52 },
      { text: "that he should face the Ka'bah", from: 0.535, to: 0.65 },
      { text: "so face it", from: 0.665, to: 0.78 },
      { text: "And they turned to the Ka'bah", from: 0.795, to: 1 }
    ]
  };
}

// The caravan on a Friday. Jabir ibn Abdullah said: a caravan came on a Friday while we were with the Prophet ﷺ, and all
// the people left except twelve men; then Allah revealed the ayah (Sahih al-Bukhari 4899; Quran 62:11). No one is drawn:
// by the masjid of Madinah, his place, a golden ring, standing, and three rows of places before it. A caravan of laden
// camels comes along the way from the right. The places of all but twelve go along to the caravan; a soft golden ring
// comes about the twelve who stayed, and a small light over each of them, one by one, twelve. Then a soft golden glow
// comes about his place: the ayah revealed to him.
function caravanOnFriday(): SignArt {
  const rowsAt = [100.8, 104, 107.2];
  const xs = Array.from({ length: 10 }, (_, k) => n(46 + k * 4.8));
  const stayed = rowsAt.flatMap((y) => xs.slice(0, 4).map((x): [number, number] => [x, y]));
  const left = rowsAt.flatMap((y) => xs.slice(4).map((x): [number, number] => [x, y]));
  const coming = track({
    xy: [
      [0.04, 40, 0],
      [0.17, 0, 0]
    ]
  });
  return {
    kind: "caravan-on-friday",
    ms: 8000,
    parts: [
      ...day(84, 124, 8000),
      ...palms([
        [44, 95, 12],
        [100, 94, 11]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 98, 0.66) },
      { name: "the way the caravan came", svg: way("M160 98.2 C142 99 124 99.8 104 100.4", "#F4E3BC", 1) },
      ...[122, 135, 148].map((x, i): SignPart => ({ name: `a camel of the caravan, laden ${i + 1}`, svg: ladenCamel(x, 100, 0.12), keys: coming })),
      { name: "his place, a golden ring, standing", svg: ring(39.4, 102.6, 2.6, GOLD) },
      { name: "the places of the twelve who stayed", svg: stayed.map(([x, y]) => someone(x, y, 1.3)).join("") },
      {
        name: "the places of those who left",
        svg: left.map(([x, y]) => someone(x, y, 1.3)).join(""),
        keys: track({
          xy: [
            [0.27, 0, 0],
            [0.42, 42, 0]
          ]
        })
      },
      { name: "stayed: a soft golden ring about the twelve", svg: care(53.2, 104, 10.6, 4.8, SOFT_GOLD), keys: showAt(0.5, 0.53), loop: soft },
      ...stayed.map(
        ([x, y], i): SignPart => ({
          name: `twelve: a small light over a place that stayed ${i + 1}`,
          svg: sparkle(x, n(y - 2.3), 0.6, "#FFE07A"),
          keys: showAt(at3(0.53 + i * 0.011), at3(0.538 + i * 0.011))
        })
      ),
      { name: "revealed to him: a soft golden glow about his place", svg: glow(39.4, 101.8, 7, WARM, 0.3), keys: showAt(0.745, 0.765) }
    ],
    words: [
      { text: "A caravan came on a Friday", from: 0.02, to: 0.24 },
      { text: "All the people left,", from: 0.255, to: 0.48 },
      { text: "except twelve men", from: 0.495, to: 0.72 },
      { text: "Then Allah revealed the ayah", from: 0.735, to: 1 }
    ]
  };
}

// He never forgot. Abu Hurairah said: I said: O Messenger of Allah, I hear many hadith from you, but I forget them. He
// said: spread out your cloak. So I spread it out, and he scooped with his hands, then said: wrap it to you. So I
// wrapped it to me, and I forgot nothing after that (Sahih al-Bukhari 119). No one is drawn: by the masjid of Madinah,
// his place, a golden ring, and Abu Hurairah's place, with his cloak folded by it. Abu Hurairah's voice speaks; small
// golden lights go from his place to Abu Hurairah's, and fade away, forgotten, with a faint grey ring about Abu
// Hurairah's place. His voice speaks, and the cloak is spread out on the ground; small golden lights go from his place
// into it, one by one. His voice speaks again; the cloak is folded up, with the lights in it, and wrapped to Abu
// Hurairah's place: the grey ring goes and a soft golden ring comes about it. Then small golden lights come to it again,
// and stay, with a warm glow.
function neverForgot(): SignArt {
  const heard: [number, number][] = [
    [82.6, 100.2],
    [86, 99.2],
    [89.4, 100.2]
  ];
  // His words, heard and forgotten: from his place to over Abu Hurairah's place, and gone again.
  const forgotten = ([x, y]: [number, number], i: number): SignPart => {
    const t = at3(0.03 + i * 0.012);
    const gone = at3(0.15 + i * 0.012);
    return {
      name: `his words: a small golden light ${i + 1}`,
      svg: glow(x, y, 1.6, WARM, 0.3) + sparkle(x, y, 0.8, "#E8A93A"),
      keys: track({
        opacity: [
          [t, 0],
          [at3(t + 0.005), 1],
          [gone, 1],
          [at3(gone + 0.02), 0]
        ],
        xy: [
          [t, n(56.4 - x), n(101.8 - y)],
          [at3(t + 0.025), 0, 0],
          [gone, 0, 0],
          [at3(gone + 0.02), 0, -2]
        ]
      })
    };
  };
  // Scooped into the spread cloak, and folded up with it.
  const scooped = (x: number, y: number, i: number): SignPart => {
    const t = at3(0.525 + i * 0.02);
    return {
      name: `scooped: a small golden light into the cloak ${i + 1}`,
      svg: glow(x, y, 1.6, WARM, 0.3) + sparkle(x, y, 0.8, "#E8A93A"),
      keys: track({
        opacity: [
          [t, 0],
          [at3(t + 0.005), 1],
          [0.78, 1],
          [0.81, 0]
        ],
        xy: [
          [t, n(56.4 - x), n(102.4 - y)],
          [at3(t + 0.025), 0, 0],
          [0.78, 0, 0],
          [0.81, n(79.4 - x), 0]
        ]
      }),
      loop: soft
    };
  };
  // Kept: from his place to over Abu Hurairah's place, and there they stay.
  const kept = ([x, y]: [number, number], i: number): SignPart => {
    const t = at3(0.895 + i * 0.015);
    return {
      name: `kept: a small golden light that stays ${i + 1}`,
      svg: glow(x, y, 1.6, WARM, 0.3) + sparkle(x, y, 0.8, "#E8A93A"),
      keys: track({
        opacity: [
          [t, 0],
          [at3(t + 0.005), 1]
        ],
        xy: [
          [t, n(56.4 - x), n(101.8 - y)],
          [at3(t + 0.025), 0, 0]
        ]
      }),
      loop: soft
    };
  };
  return {
    kind: "never-forgot",
    ms: 11500,
    parts: [
      ...day(124, 92, 11500),
      ...palms([
        [4, 97, 13],
        [108, 94, 12],
        [154, 96, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(10, 98, 0.62) },
      { name: "his place, a golden ring", svg: ring(54, 103.6, 2.6, GOLD) },
      {
        name: "Abu Hurairah's cloak",
        svg: SPREAD_CLOAK,
        origin: { x: 81, y: 106 },
        keys: track({
          scaleX: [
            [0.4, 0.2],
            [0.45, 1],
            [0.78, 1],
            [0.81, 0.24]
          ],
          xy: [
            [0.81, 0, 0],
            [0.83, 2.2, -0.6]
          ]
        })
      },
      { name: "Abu Hurairah's place", svg: someone(86, 104.2) },
      { name: "Abu Hurairah's voice: I hear many hadith", svg: arcsLeft(83.2, 102, VOICE), keys: showFor(0.025, 0.035, 0.26, 0.27), loop: speaking },
      ...heard.map(forgotten),
      { name: "forgetting: a faint grey ring about Abu Hurairah's place", svg: greyRing(86, 104.2, 3.4, 1.6), keys: showFor(0.16, 0.18, 0.8, 0.815) },
      { name: "his voice: spread out your cloak", svg: arcs(56.8, 102.4, GOLD), keys: showFor(0.265, 0.275, 0.39, 0.4), loop: speaking },
      scooped(70, 105.8, 0),
      scooped(73.6, 106.2, 1),
      scooped(77.2, 105.8, 2),
      { name: "his voice: wrap it to you", svg: arcs(56.8, 102.4, GOLD), keys: showFor(0.655, 0.665, 0.77, 0.78), loop: speaking },
      { name: "wrapped: a soft golden ring about Abu Hurairah's place", svg: care(86, 104.2, 3.6, 1.7, SOFT_GOLD), keys: showAt(0.815, 0.83), loop: soft },
      ...heard.map(kept),
      { name: "a warm glow about Abu Hurairah's place", svg: glow(86, 102, 7, WARM, 0.28), keys: showAt(0.94, 0.955) }
    ],
    words: [
      { text: "I said: I hear many hadith from you", from: 0.02, to: 0.125 },
      { text: "but I forget them", from: 0.14, to: 0.245 },
      { text: "He said: spread out your cloak", from: 0.26, to: 0.375 },
      { text: "So I spread it out", from: 0.39, to: 0.505 },
      { text: "He scooped with his hands", from: 0.52, to: 0.635 },
      { text: "then said: wrap it to you", from: 0.65, to: 0.755 },
      { text: "So I wrapped it to me", from: 0.77, to: 0.875 },
      { text: "and I forgot nothing after that", from: 0.89, to: 1 }
    ]
  };
}

// Two rewards. Zaynab, the wife of Abdullah, said: I was in the masjid and saw the Prophet ﷺ, and he said: give charity,
// even of your jewellery. Zaynab spent on Abdullah and on orphans in her care ... I found a woman of the Ansar at the
// door, with the same need as mine. Bilal passed by us, and we said: ask the Prophet ﷺ ... He went in and asked him, and
// he said: who are they? He said: Zaynab. He said: which Zaynab? He said: the wife of Abdullah. He said: yes, she has two
// rewards: the reward of kinship and the reward of charity (Sahih al-Bukhari 1466). No one is drawn: on the left,
// Zaynab's home, with Abdullah's place and the places of the orphans in her care; the masjid of Madinah, with his place
// before it and the places of others there, Zaynab's among them; and his home by the masjid. His voice speaks, and small
// golden glints show by the places: jewellery. His place goes into his home, and Zaynab's place goes to her own, and soft
// golden lines go from it to the places in her care. Then it goes to his door, where the Ansari's place stands. Bilal's
// place passes by, and their voice asks him; it goes in at the door, and from within come his voice and Bilal's. A faint
// ring comes about Zaynab's place, which one; Bilal's voice answers, and a faint golden line goes from Zaynab's place to
// Abdullah's. His voice speaks: a soft golden ring comes about Zaynab's place, and a second one, two rewards, and a warm
// glow over her home.
function twoRewards(): SignArt {
  return {
    kind: "two-rewards",
    ms: 12000,
    parts: [
      ...day(130, 100, 12000),
      ...palms([
        [34, 95, 12],
        [124, 94, 12],
        [156, 96, 14]
      ]),
      { name: "Zaynab's home", svg: home(18, 100, 22, 14) },
      { name: "the masjid of Madinah", svg: madinahMasjid(44, 98, 0.56) },
      { name: "his home, by the masjid", svg: home(81, 100, 18, 12) },
      { name: "Abdullah's place", svg: someone(10.4, 104.4) },
      { name: "the places of the orphans in her care", svg: someone(15.4, 106.4, 1.15) + someone(20.6, 105.6, 1.15) },
      {
        name: "his place, a golden ring",
        svg: ring(62, 103.4, 2.4, GOLD),
        keys: track({
          opacity: [
            [0.18, 1],
            [0.2, 0]
          ],
          xy: [
            [0.15, 0, 0],
            [0.19, 17.2, -3.8]
          ]
        })
      },
      { name: "the places of others in the masjid", svg: someone(46.4, 104.8) + someone(51, 105.6), keys: fade([[0.16, 1], [0.19, 0]]) },
      {
        name: "Zaynab's place",
        svg: someone(55.6, 104.8),
        keys: track({
          xy: [
            [0.145, 0, 0],
            [0.18, -27.2, 0.2],
            [0.27, -27.2, 0.2],
            [0.32, 18.8, 0]
          ]
        })
      },
      { name: "his voice: give, even of your jewellery", svg: arcsLeft(59.2, 102.2, GOLD), keys: showFor(0.025, 0.035, 0.14, 0.15), loop: speaking },
      {
        name: "jewellery: small golden glints by the places",
        svg: sparkle(46.4, 102.4, 0.7, "#FFE7A0") + sparkle(51, 103.2, 0.7, "#FFE7A0") + sparkle(55.6, 102.4, 0.7, "#FFE7A0"),
        keys: showFor(0.045, 0.065, 0.15, 0.17),
        loop: soft
      },
      {
        name: "spent on them: soft golden lines from Zaynab's place to theirs",
        svg: lookLine(27, 104, 11.8, 103.4, 100, SOFT_GOLD) + lookLine(27, 104.6, 16.6, 105.6, 102.2, SOFT_GOLD) + lookLine(27.4, 105, 21.8, 104.8, 103, SOFT_GOLD),
        keys: showFor(0.185, 0.2, 0.27, 0.28)
      },
      { name: "the Ansari's place, at his door", svg: someone(85.4, 104.6), keys: showAt(0.305, 0.32) },
      {
        name: "Bilal's place",
        svg: someone(96.4, 104.4),
        keys: track({
          opacity: [
            [0.392, 0],
            [0.4, 1],
            [0.545, 1],
            [0.56, 0]
          ],
          xy: [
            [0.395, 54, 0],
            [0.44, 0, 0],
            [0.525, 0, 0],
            [0.555, -17.2, -4.6]
          ]
        })
      },
      { name: "the voices of the two: ask him", svg: arcs(88.2, 103.2, VOICE), keys: showFor(0.445, 0.455, 0.525, 0.535), loop: speaking },
      { name: "his voice, from within: who are they", svg: arcs(81.6, 94.8, GOLD), keys: showFor(0.56, 0.57, 0.655, 0.665), loop: speaking },
      { name: "Bilal's voice, from within: Zaynab", svg: arcs(81.6, 98.8, VOICE), keys: showFor(0.575, 0.585, 0.655, 0.665), loop: speaking },
      { name: "his voice, from within: which Zaynab", svg: arcs(81.6, 94.8, GOLD), keys: showFor(0.655, 0.665, 0.775, 0.785), loop: speaking },
      { name: "which one: a faint white ring about Zaynab's place", svg: care(74.4, 104.8, 3, 1.4, "#FFFFFF"), keys: showFor(0.67, 0.69, 0.775, 0.785), loop: soft },
      { name: "Bilal's voice, from within, again", svg: arcs(81.6, 98.8, VOICE), keys: showFor(0.775, 0.785, 0.895, 0.905), loop: speaking },
      { name: "Abdullah's: a faint golden line from Zaynab's place to Abdullah's", svg: lookLine(72.8, 104, 12, 103.6, 92, SOFT_GOLD), keys: showAt(0.8, 0.825) },
      { name: "his voice, from within: two rewards", svg: arcs(81.6, 94.8, GOLD), keys: showAt(0.895, 0.905), loop: speaking },
      { name: "the reward of kinship: a soft golden ring about Zaynab's place", svg: care(74.4, 104.8, 3.4, 1.6, SOFT_GOLD), keys: showAt(0.91, 0.925), loop: soft },
      { name: "the reward of charity: a second soft golden ring about Zaynab's place", svg: care(74.4, 104.8, 5, 2.3, SOFT_GOLD), keys: showAt(0.935, 0.95), loop: soft },
      { name: "a warm glow over Zaynab's home", svg: glow(18, 96, 8, WARM, 0.28), keys: showAt(0.94, 0.955) }
    ],
    words: [
      { text: "He said: give, even of your jewellery", from: 0.02, to: 0.125 },
      { text: "Zaynab spent on Abdullah and orphans", from: 0.14, to: 0.245 },
      { text: "I found a woman of the Ansar at the door", from: 0.26, to: 0.375 },
      { text: "Bilal passed by, and we said: ask him", from: 0.39, to: 0.505 },
      { text: "He said: who are they? Bilal said: Zaynab", from: 0.52, to: 0.635 },
      { text: "He said: which Zaynab?", from: 0.65, to: 0.755 },
      { text: "Bilal said: the wife of Abdullah", from: 0.77, to: 0.875 },
      { text: "He said: two rewards, kinship and charity", from: 0.89, to: 1 }
    ]
  };
}

export const NEAR_ART = {
  "serve-your-parents": serveYourParents,
  "best-to-the-poor": bestToThePoor,
  "out-to-welcome": outToWelcome,
  "quba-turn": qubaTurn,
  "caravan-on-friday": caravanOnFriday,
  "never-forgot": neverForgot,
  "two-rewards": twoRewards
} as const;
