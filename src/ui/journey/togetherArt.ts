import { cloud, dateBunch, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { at3 } from "./storyArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM } from "./worshipArt";
import { farOff, gardenIn, jug, lightIn, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, EIGHT, FOLK, glints, linesOn, places, plainLand, twinkle } from "./shareArt";
import { farHills, FIVE, insideTheMasjid } from "./wideArt";
import { GREY } from "./lovedArt";
import { QUICK } from "./dailyArt";
import { horseAt } from "./herdArt";
import { pulpit } from "./fairArt";
import { kaaba } from "./rewardArt";

/**
 * Together: the ablution done thoroughly when it is hard, more paces to the masjid and waiting for the next prayer,
 * by which Allah wipes out the sins and raises the ranks; reciting the Quran together while the hearts agree, and
 * getting up when they differ; the world sweet and green, and the successors put in it to see how they act; his
 * brothers who have not come yet, known as a man knows his own horses with white blazes among black ones; his two
 * sermons, sitting between them; and Umrah to Umrah, and the reward of an accepted Hajj. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book or page is drawn, and
 * nothing comes down from the sky: a prayer or a deed is a spark that rises, what is good is a light, glints and a
 * soft golden ring, and what is not to be done a grey dashed ring. Paradise is only far off, in a soft circle of light
 * with no sun in it. No name, word or number is written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
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

/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** Jundub's place and voice: a deep green. */
const JUNDUB = "#4E7A6A";
/** Abu Sa'id al-Khudri's place and voice: a slate blue. */
const ABU_SAID = "#5E6E8E";
/** Jabir ibn Samurah's place and voice: an olive green. */
const JABIR = "#6E7E4E";
/** The place of one who does the good deeds of a story: a plain green. */
const ONE = "#5E8A52";
/** The place of one who keeps everything to itself: a dull brown. */
const KEEPS = "#8A6A4E";
/** A black coat for a horse, near side and far side. */
const BLACK: [string, string] = ["#2F2A27", "#221E1C"];

/** Grey specks about a place, at each of `list`: its sins. */
const specks = (list: [number, number][]) => list.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.5" fill="#8E8A86"/>`).join("");

/** A lane along the given points, the places going along it a little above its middle. */
const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** A grey zigzag from x1 to x2 about y: a difference of opinion. */
const zigzag = (x1: number, x2: number, y: number) => {
  const count = 8;
  const points = Array.from({ length: count + 1 }, (_, i) => `${n(x1 + ((x2 - x1) * i) / count)} ${n(i === 0 || i === count ? y : y + (i % 2 ? -1.8 : 1.8))}`);
  return `<path d="M${points.join(" L")}" stroke="${GREY}" stroke-width="0.6" stroke-linejoin="round" fill="none"/>`;
};

/** A small green bush, its foot's middle at (x, y). */
const bush = (x: number, y: number) =>
  `<ellipse cx="${n(x - 1.6)}" cy="${n(y - 1.4)}" rx="2" ry="1.5" fill="#6FA84E"/><ellipse cx="${n(x + 1.6)}" cy="${n(y - 1.4)}" rx="2" ry="1.5" fill="#5F9A42"/><ellipse cx="${x}" cy="${n(y - 2.6)}" rx="2.1" ry="1.7" fill="#7DB85A"/>`;

/** A heap of dates on the ground, its middle at (x, y). */
const heapOfDates = (x: number, y: number) =>
  [
    [-1.6, 0],
    [0, 0.2],
    [1.6, 0],
    [-0.8, -1],
    [0.8, -1],
    [0, -2]
  ]
    .map(([dx, dy], i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="0.65" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`)
    .join("");

/** A few dates together, their middle at (x, y). */
const fewDates = (x: number, y: number) =>
  [
    [-0.9, 0],
    [0.9, 0],
    [0, -0.9]
  ]
    .map(([dx, dy], i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="0.65" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`)
    .join("");

/**
 * A horse with white blazes, `s` times its size, its feet at (x, y): a black horse of the picture cards with a white
 * blaze down its face and white above each hoof.
 */
const blazed = (x: number, y: number, s: number, left = false) =>
  horseAt(x, y, s, left, false, BLACK).replace(
    /<\/g>$/,
    `<path d="M75.6 13 Q80.6 18.6 86.4 26.6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none"/>` +
      [
        [28, 5],
        [53, 5],
        [34, 4.6],
        [58, 4.6]
      ]
        .map(([lx, w]) => `<rect x="${lx}" y="62" width="${w}" height="8" fill="#F2F0EA"/>`)
        .join("") +
      "</g>"
  );

// Despite the odds. Abu Hurairah said that the Messenger of Allah ﷺ said: should I not suggest to you that by which
// Allah obliterates the sins and elevates the ranks? They said: yes, Messenger of Allah. He said: performing the
// ablution thoroughly despite odds, more paces towards the mosque, and waiting for the next prayer after observing a
// prayer, and that is mindfulness (Sahih Muslim 251a; the page's "tranverside of" and its last words are left out of
// the lines). No one is drawn: the masjid of Madinah, his place before it, a golden ring, Abu Hurairah's place and two
// more by him, and far along a long, winding way a home with the place of one who lives there, grey specks about it:
// its sins. It is a cold morning, with frost on the land. Abu Hurairah's voice tells of it, his voice, soft and golden,
// asks, and the two by him answer. A cold wind blows, water pours from a jug by the home, and some of the specks fade.
// The place goes the long way to the masjid, leaving soft marks of its paces along the way, and more of the specks
// fade. At the masjid a spark of the prayer rises; the sun goes on while the place waits there, and a spark of the
// next prayer rises. The last specks fade, soft golden steps light up by it one after another, and a soft golden ring
// comes about it: raised in rank.
function despiteTheOdds(): SignArt {
  const his: [number, number] = [42, 110];
  const hurairah: [number, number] = [56, 112.6];
  const them: [number, number][] = [
    [68, 114],
    [80, 112.6]
  ];
  // The long way from the home to the masjid's door, and when the place is at each point of it.
  const path: [number, number][] = [
    [136, 94.6],
    [121, 97.6],
    [106, 95.8],
    [91, 99.6],
    [76, 98.2],
    [61, 102.4],
    [46, 101.2],
    [31, 102.6]
  ];
  const times = [0.64, 0.648, 0.657, 0.666, 0.675, 0.684, 0.692, 0.7];
  const walk = along(path, times);
  const start = path[0];
  const end = path[path.length - 1];
  const pace = (x: number, y: number) =>
    `<ellipse cx="${n(x - 0.7)}" cy="${n(y + 1.6)}" rx="0.5" ry="0.8" fill="${SOFT_GOLD}"/><ellipse cx="${n(x + 0.7)}" cy="${n(y + 1)}" rx="0.5" ry="0.8" fill="${SOFT_GOLD}"/>`;
  const stepAt = (x: number, y: number) => glow(n(x + 1.5), n(y + 0.4), 2.4, WARM, 0.3) + `<rect x="${x}" y="${y}" width="3" height="0.9" rx="0.4" fill="${SOFT_GOLD}"/>`;
  const steps: [number, number][] = [
    [35.6, 99.4],
    [38, 97.4],
    [40.4, 95.4]
  ];
  const gusts =
    `<g fill="none" stroke="#F4FAFF" stroke-width="0.8" stroke-linecap="round" opacity="0.9">` +
    `<path d="M92 68 C102 65 112 69 124 66"/><path d="M104 80 C114 77 124 81 136 78 C140 77 139 73 135 74"/><path d="M70 86 C80 83 90 87 100 84"/></g>`;
  const frost =
    `<rect y="61" width="160" height="59" fill="#E6F0F8" opacity="0.3"/>` +
    [12, 30, 52, 74, 98, 116, 140, 154].map((x, i) => `<circle cx="${x}" cy="${n(106 + (i % 3) * 2.6)}" r="0.55" fill="#F4FAFF"/>`).join("");
  return {
    kind: "despite-the-odds",
    ms: 12000,
    parts: [
      { name: "sky: a cold morning", svg: sky("#C9DBEA", "#E4EEF6", 62) },
      {
        name: "the sun, going on while the place waits",
        svg: sun(126, 44),
        keys: track({
          xy: [
            [0.792, 0, 0],
            [0.82, -22, -16]
          ]
        })
      },
      { name: "a cloud", svg: cloud(54, 26, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [14, 116],
          [98, 117],
          [150, 114]
        ])
      },
      { name: "the cold: frost on the land", svg: frost, loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      { name: "a home far along the way", svg: home(146, 93, 14, 10) },
      { name: "the long way to the masjid", svg: lane(path) },
      { name: "a jug of water by the home", svg: jug(130, 95.4) },
      { name: "a cold wind, blowing", svg: gusts, keys: showFor(0.512, 0.524, 0.688, 0.7), loop: { move: "slide", ms: 1800 } },
      {
        name: "the ablution done thoroughly: water pouring from the jug",
        svg: `<ellipse cx="134.9" cy="90.6" rx="0.5" ry="0.75" fill="#8CC8EA"/>`,
        keys: showFor(0.52, 0.526, 0.572, 0.578),
        loop: { move: "drip", ms: 700, distance: 3 }
      },
      {
        name: "its sins: grey specks about its place, fading 1",
        svg: specks([
          [132.4, 92.2],
          [139.8, 93]
        ]),
        keys: track({
          opacity: [
            [0.53, 1],
            [0.56, 0]
          ]
        })
      },
      {
        name: "its sins: grey specks about its place, fading 2",
        svg: specks([
          [133.8, 91.2],
          [139.2, 96.6]
        ]),
        keys: track({
          xy: walk,
          opacity: [
            [0.666, 1],
            [0.684, 0]
          ]
        })
      },
      {
        name: "its sins: grey specks about its place, fading 3",
        svg: specks([
          [132, 95.8],
          [138.6, 91.4]
        ]),
        keys: track({
          xy: walk,
          opacity: [
            [0.884, 1],
            [0.904, 0]
          ]
        })
      },
      ...path.slice(1, 7).map(
        ([x, y], i): SignPart => ({ name: `more paces towards the masjid: soft marks along the way ${i + 1}`, svg: pace(x, y), keys: showAt(at3(times[i + 1] + 0.002), at3(times[i + 1] + 0.006)) })
      ),
      { name: "the place of one who lives there: going the long way to the masjid", svg: someone(start[0], start[1], 1.4, ONE), keys: track({ xy: walk }) },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "the places of two more by him", svg: places(them, 1.5) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.022, 0.028, 0.06, 0.066), loop: speaking },
      { name: "his voice, soft and golden: asking, and then telling", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.07, 0.076, 0.94, 0.946), loop: speaking },
      { name: "their voices: answering yes", svg: them.map(([x, y]) => arcs(n(x + 2.8), n(y - 2.6), FOLK)).join(""), keys: showFor(0.41, 0.416, 0.444, 0.45), loop: speaking },
      spark("a prayer observed: a spark rising from the masjid", 28, 80, 0.756, 0.79),
      spark("the next prayer: a spark rising from the masjid", 28, 80, 0.88, 0.912),
      ...steps.map(([x, y], i): SignPart => ({ name: `raised in rank: a soft golden step lighting up ${i + 1}`, svg: stepAt(x, y), keys: showAt(at3(0.912 + i * 0.01), at3(0.918 + i * 0.01)), loop: soft })),
      { name: "and a soft golden ring about its place", svg: ring(end[0], n(end[1] + 0.6), 3.4, SOFT_GOLD), keys: showAt(0.944, 0.956) }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: he said: should I not",
      "Suggest to you that by which Allah",
      "Obliterates the sins and elevates the",
      "Ranks? They said: yes. He said:",
      "Performing the ablution thoroughly",
      "Despite odds, more paces towards the",
      "Mosque, and waiting for the next prayer",
      "After observing a prayer."
    ])
  };
}

// While the hearts agree. Jundub said that the Prophet ﷺ said: recite (and study) the Quran as long as you agree about
// its interpretation, but when you have any difference of opinion, then you should stop reciting it (for the time
// being) (Sahih al-Bukhari 5061; in Arabic: as long as your hearts agree on it, and when you differ, get up from it).
// No one is drawn: inside the masjid, his place, a golden ring, and Jundub's place by him; and on the floor a circle of
// places sitting together. Jundub's voice tells of it, and his voice, soft and golden, speaks. The circle recites: soft
// golden voices over it. A soft golden ring comes about the circle: their hearts agree. Then two of them differ: quick
// grey voices and a grey zigzag between them, their soft golden voices dim, and the soft golden ring fades. They stop:
// the voices go, and the places get up and move a little apart.
function whileHeartsAgree(): SignArt {
  const foot = 96;
  const his: [number, number] = [132, 104];
  const jundub: [number, number] = [118, 106.6];
  const middle: [number, number] = [54, 108.4];
  const circle: [number, number][] = [
    [69, 108.4],
    [61.5, 112.4],
    [46.5, 112.4],
    [39, 108.4],
    [46.5, 104.4],
    [61.5, 104.4]
  ];
  // A place sitting is lower and flatter; standing, a full ring.
  const SIT = 0.62;
  const apart = 0.35;
  const getUp = ([x, y]: [number, number]) =>
    track({
      scaleY: [
        [0.83, SIT],
        [0.856, 1]
      ],
      xy: [
        [0.866, 0, 0],
        [0.9, n((x - middle[0]) * apart), n((y - middle[1]) * apart)]
      ]
    });
  return {
    kind: "while-hearts-agree",
    ms: 10000,
    parts: [
      ...insideTheMasjid(foot),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Jundub's place, by him", svg: someone(jundub[0], jundub[1], 1.5, JUNDUB) },
      { name: "Jundub's voice: telling of it", svg: arcs(n(jundub[0] + 3.2), n(jundub[1] - 2.8), JUNDUB), keys: showFor(0.024, 0.03, 0.05, 0.056), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.06, 0.066, 0.94, 0.946), loop: speaking },
      {
        name: "their hearts agreeing: a soft golden ring about the circle",
        svg: `<ellipse cx="${middle[0]}" cy="${middle[1]}" rx="19.6" ry="7.6" stroke="${SOFT_GOLD}" stroke-width="0.8" fill="${WARM}" fill-opacity="0.14"/>`,
        keys: track({
          opacity: [
            [0.24, 0],
            [0.252, 1],
            [0.64, 1],
            [0.66, 0]
          ]
        })
      },
      ...circle.map((p, i): SignPart => ({ name: `the place of one reciting, sitting in the circle ${i + 1}`, svg: someone(p[0], p[1], 1.5, FOLK), origin: { x: p[0], y: n(p[1] + 1.5) }, keys: getUp(p) })),
      {
        name: "reciting the Quran together: their voices, soft and golden, over the circle",
        svg: arcs(57, 101.4, SOFT_GOLD) + arcsLeft(51, 101.4, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.1, 0],
            [0.11, 1],
            [0.62, 1],
            [0.63, 0.45],
            [0.81, 0.45],
            [0.82, 0]
          ]
        }),
        loop: speaking
      },
      {
        name: "differing: two of their voices, quick and grey",
        svg: arcsLeft(n(circle[3][0] - 2.6), n(circle[3][1] - 2.6), GREY) + arcs(n(circle[0][0] + 2.6), n(circle[0][1] - 2.6), GREY),
        keys: showFor(0.62, 0.632, 0.81, 0.82),
        loop: QUICK
      },
      { name: "a difference of opinion: a grey zigzag between the two", svg: zigzag(n(circle[3][0] + 2.4), n(circle[0][0] - 2.4), middle[1]), keys: showFor(0.626, 0.638, 0.81, 0.82), loop: QUICK }
    ],
    words: linesOn(FIVE, ["Jundub: he said: recite the Quran", "As long as you agree about its", "Interpretation, but when you have any", "Difference of opinion, then you should", "Stop reciting it."])
  };
}

// Sweet and green. Abu Sa'id al-Khudri said that the Messenger of Allah ﷺ said: the world is sweet and green
// (alluring), and verily Allah is going to install you as vicegerent in it in order to see how you act (Sahih Muslim
// 2742; what follows it is left out). No one is drawn, and nothing for Allah: his place, a golden ring, and Abu Sa'id's
// place by him, and a dry land with homes and palms. Abu Sa'id's voice tells of it, and his voice, soft and golden,
// speaks. The land turns green, plants grow, ripe dates hang on the palms, and glints on them. Faint places of those
// before fade by the homes, and new places come to them: successors. Then one of them shares its dates along a soft
// golden way with another, a small light comes on that one, and a soft golden ring about the one who shared; another
// heaps up dates by itself and keeps them all, and a grey dashed ring comes about it.
function sweetAndGreen(): SignArt {
  const his: [number, number] = [18, 110];
  const abuSaid: [number, number] = [32, 112.6];
  const homes: [number, number][] = [
    [30, 95],
    [80, 93],
    [126, 95]
  ];
  const palmsAt: [number, number, number][] = [
    [56, 97, 14],
    [104, 96, 13],
    [150, 98, 14]
  ];
  const now: [number, number][] = [
    [40, 98],
    [89.6, 95.6],
    [136, 98]
  ];
  const given: [number, number] = [64, 106];
  const plants: [number, number][] = [
    [8, 104],
    [50, 117],
    [86, 112],
    [114, 116],
    [152, 112]
  ];
  const keeps = now[2];
  return {
    kind: "sweet-and-green",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "a cloud", svg: cloud(110, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      {
        name: "the land, dry",
        svg: plainLand("#E6D3A6", [
          [20, 119],
          [100, 119.4]
        ])
      },
      {
        name: "the world green: the land turning green",
        svg: `<rect y="61" width="160" height="59" fill="#A9CC78"/><path d="M0 61 L160 61" stroke="#8DB45C" stroke-width="0.6"/>`,
        keys: track({
          opacity: [
            [0.28, 0],
            [0.33, 1]
          ]
        })
      },
      ...homes.map(([x, y], i): SignPart => ({ name: `a home on the land ${i + 1}`, svg: home(x, y, i === 1 ? 13 : 14, i === 1 ? 9 : 10) })),
      ...palms(palmsAt, "the land"),
      ...plants.map(
        ([x, y], i): SignPart => ({
          name: `a plant growing ${i + 1}`,
          svg: bush(x, y),
          origin: { x, y },
          keys: track({
            scale: [
              [0.3, 0.25],
              [0.36, 1]
            ]
          })
        })
      ),
      {
        name: "the world sweet: ripe dates on the palms",
        svg: palmsAt.map(([x, y, h]) => dateBunch(n(x + h * 0.08 - 3), n(y - h + 1.8)) + dateBunch(n(x + h * 0.08 + 2.8), n(y - h + 2.2))).join(""),
        keys: showAt(0.36, 0.372)
      },
      { name: "and glints on them", svg: glints(palmsAt.map(([x, y, h]): [number, number] => [n(x + h * 0.08), n(y - h + 4.8)])), keys: showAt(0.4, 0.412), loop: twinkle() },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Sa'id's place, by him", svg: someone(abuSaid[0], abuSaid[1], 1.5, ABU_SAID) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcs(n(abuSaid[0] + 3.2), n(abuSaid[1] - 2.8), ABU_SAID), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.09, 0.096, 0.94, 0.946), loop: speaking },
      {
        name: "those before: faint places by the homes, fading",
        svg: now.map(([x, y]) => someone(x, y, 1.4, "#B9AE9C")).join(""),
        keys: track({
          opacity: [
            [0.53, 0.7],
            [0.56, 0]
          ]
        })
      },
      {
        name: "made successors in it: new places coming to the homes",
        svg: now.slice(0, 2).map(([x, y]) => someone(x, y, 1.4, ONE)).join(""),
        keys: track({
          opacity: [
            [0.56, 0],
            [0.572, 1]
          ],
          xy: [
            [0.56, -5, 0],
            [0.6, 0, 0]
          ]
        })
      },
      {
        name: "and another, by the third home",
        svg: someone(keeps[0], keeps[1], 1.4, KEEPS),
        keys: track({
          opacity: [
            [0.56, 0],
            [0.572, 1]
          ],
          xy: [
            [0.56, -5, 0],
            [0.6, 0, 0]
          ]
        })
      },
      { name: "the place of another, along the way", svg: someone(given[0], given[1], 1.4, FOLK), keys: showAt(0.6, 0.612) },
      { name: "how they act: one shares, a soft golden way to the other", svg: way(`M${n(now[0][0] + 2.6)} ${n(now[0][1] + 1.4)} Q54 104.4 ${n(given[0] - 2.6)} ${n(given[1] + 0.4)}`, SOFT_GOLD, 0.9), keys: showAt(0.77, 0.782) },
      {
        name: "its dates going along it",
        svg: fewDates(n(now[0][0] + 3.4), n(now[0][1] + 0.6)),
        keys: track({
          opacity: [
            [0.78, 0],
            [0.786, 1]
          ],
          xy: [
            [0.786, 0, 0],
            [0.82, n(given[0] - now[0][0] - 6.4), n(given[1] - now[0][1] + 0.6)]
          ]
        })
      },
      { name: "a small light on the one it shared with", svg: lightIn(given[0], n(given[1] - 2.4), 3.4), keys: showAt(0.83, 0.842), loop: soft },
      { name: "a soft golden ring about the one who shared", svg: ring(now[0][0], n(now[0][1] + 0.8), 3.6, SOFT_GOLD), keys: showAt(0.85, 0.862) },
      { name: "another heaps up dates, keeping them all", svg: heapOfDates(n(keeps[0] + 5), n(keeps[1] + 1.4)), keys: showAt(0.8, 0.812) },
      { name: "a grey dashed ring about the one who keeps them all", svg: greyRing(n(keeps[0] + 2.4), n(keeps[1] + 1), 6.4, 2.8), keys: showAt(0.9, 0.912) }
    ],
    words: linesOn(FOUR, ["Abu Sa'id: he said: the world is", "Sweet and green and verily Allah is", "Going to install you as vicegerent in it", "In order to see how you act."])
  };
}

// The brothers to come. Abu Hurairah said that the Messenger of Allah ﷺ said: I love to see my brothers. They said:
// aren't we your brothers? He said: you are my companions, and our brothers are those who have, so far, not come into
// the world. They said: how would you recognise those of your Ummah who have not yet been born? He said: supposing a
// man had horses with white blazes on foreheads and legs among horses which were all black, would he not recognise his
// own horses? They said: certainly. He said: they would come with white faces and arms and legs owing to ablution
// (Sahih Muslim 249a; the graveyard, their question and the Cistern are left out of the lines). No one is drawn, no
// man and no rider: his place, a golden ring, Abu Hurairah's place and the places of those with him by him, on open land.
// Abu Hurairah's voice tells of it; his voice, soft and golden, speaks; and his companions' voices ask. A soft golden
// ring comes about his companions. Far off, faint dotted places show: those who have not come yet. Horses with white
// blazes come on the land, black horses about them, and a soft golden ring about each horse with white blazes: known
// at once. The faint places far off come nearer and grow bright, with soft white glows about them: bright from the
// ablution.
function brothersToCome(): SignArt {
  const his: [number, number] = [22, 104];
  const hurairah: [number, number] = [36, 106.6];
  const companions: [number, number][] = [
    [12, 111],
    [26, 112.6],
    [40, 113.4],
    [52, 110.4]
  ];
  const toCome: [number, number][] = [
    [112, 76],
    [122, 74.6],
    [132, 76.4],
    [142, 74.8],
    [152, 76.6],
    [117, 80.4],
    [137, 80.2],
    [147, 80.6]
  ];
  const S = 0.17;
  const blazes: [number, number][] = [
    [84, 104],
    [100, 106.6]
  ];
  const blacks: [number, number][] = [
    [66, 100.6],
    [118, 102.6],
    [72, 112.6],
    [108, 114.6],
    [90, 97.6]
  ];
  const nearer = track({
    xy: [
      [0.9, 0, 0],
      [0.94, -10, 3]
    ],
    opacity: [
      [0.37, 0],
      [0.39, 0.4],
      [0.9, 0.4],
      [0.93, 1]
    ]
  });
  return {
    kind: "brothers-to-come",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(80, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [60, 118],
          [130, 119],
          [154, 112]
        ])
      },
      ...palms(
        [
          [6, 98, 13],
          [50, 90, 11]
        ],
        "Madinah"
      ),
      {
        name: "those who have not come yet: faint dotted places far off, coming nearer",
        svg: toCome.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" stroke="#FBF6EA" stroke-width="0.5" stroke-dasharray="0.6 0.6" fill="none"/>`).join(""),
        keys: nearer
      },
      {
        name: "bright from the ablution: soft white glows about them",
        svg: toCome.map(([x, y]) => glow(x, y, 2.8, "#FFFFFF", 0.1)).join(""),
        keys: track({
          xy: [
            [0.9, 0, 0],
            [0.94, -10, 3]
          ],
          opacity: [
            [0.93, 0],
            [0.942, 1]
          ]
        }),
        loop: soft
      },
      { name: "black horses, about them", svg: blacks.map(([x, y], i) => horseAt(x, y, S, i % 2 === 0, false, BLACK)).join(""), keys: showAt(0.694, 0.706), loop: { move: "bob", ms: 2600, y: 0.4 } },
      { name: "one's own horses, with white blazes", svg: blazes.map(([x, y], i) => blazed(x, y, S, i === 0)).join(""), keys: showAt(0.586, 0.598), loop: { move: "bob", ms: 2400, y: 0.4, phase: 0.5 } },
      { name: "known at once: a soft golden ring about each horse with white blazes", svg: blazes.map(([x, y]) => ring(x, n(y + 0.4), 9.6, SOFT_GOLD)).join(""), keys: showAt(0.79, 0.802) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "the places of those with him", svg: places(companions, 1.5) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.022, 0.028, 0.044, 0.05), loop: speaking },
      {
        name: "his voice, soft and golden",
        svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD),
        keys: track({
          opacity: [
            [0.054, 0],
            [0.06, 1],
            [0.146, 1],
            [0.152, 0],
            [0.248, 0],
            [0.254, 1],
            [0.95, 1],
            [0.956, 0]
          ]
        }),
        loop: speaking
      },
      { name: "voices of those with him, asking", svg: arcs(n(companions[3][0] + 2.8), n(companions[3][1] - 2.6), FOLK), keys: showFor(0.156, 0.162, 0.24, 0.246), loop: speaking },
      { name: "with him now: a soft golden ring about those places", svg: `<ellipse cx="32" cy="110.2" rx="26" ry="6.4" stroke="${SOFT_GOLD}" stroke-width="0.8" fill="${WARM}" fill-opacity="0.12"/>`, keys: showAt(0.264, 0.276) }
    ],
    words: linesOn(NINE, [
      "Abu Hurairah: he said: I love to see my",
      "Brothers. They said: aren't we your",
      "Brothers? He said: you are my companions,",
      "And our brothers are those who have, so",
      "Far, not come into the world. Supposing",
      "A man had horses with white blazes among",
      "Horses which were all black, would he not",
      "Recognise his own horses? They would",
      "Come with white faces owing to ablution."
    ])
  };
}

// The two sermons. Jabir ibn Samurah said: the Apostle of Allah ﷺ gave two sermons between which he sat, recited the
// Quran and exhorted the people (Sahih Muslim 862). No one is drawn: inside the masjid, a pulpit with his place on it,
// a golden ring, and two rows of places before it, Jabir's place among them. Jabir's voice tells of it. His voice,
// soft and golden, gives the first sermon; his place sits, lower and flatter, and his voice is still; it stands again,
// and his voice gives the second. Glints come about his voice as he recites the Quran, soft golden ways go from his
// place to the rows, and small lights come on in them: exhorted.
function twoSermons(): SignArt {
  const foot = 96;
  const his: [number, number] = [22.2, 92];
  const front: [number, number][] = [40, 52, 64, 76, 88, 100, 112, 124].map((x): [number, number] => [x, 106]);
  const back: [number, number][] = [46, 58, 70, 94, 106, 118, 130].map((x): [number, number] => [x, 112.6]);
  const jabir: [number, number] = [82, 112.6];
  const SIT = 0.62;
  return {
    kind: "two-sermons",
    ms: 8000,
    parts: [
      ...insideTheMasjid(foot),
      { name: "a pulpit of three steps", svg: big(pulpit(20, 104), 20, 104, 1.8) },
      { name: "the places of the front row", svg: places(front, 1.5) },
      { name: "the places of the back row", svg: places(back, 1.5) },
      { name: "Jabir's place, in the back row", svg: someone(jabir[0], jabir[1], 1.5, JABIR) },
      { name: "Jabir's voice: telling of it", svg: arcs(n(jabir[0] + 3.2), n(jabir[1] - 2.8), JABIR), keys: showFor(0.024, 0.03, 0.07, 0.076), loop: speaking },
      {
        name: "his place, a golden ring, on the pulpit: sitting between the two sermons",
        svg: ring(his[0], his[1], 2.2, GOLD),
        origin: { x: his[0], y: n(his[1] + 1.2) },
        keys: track({
          scaleY: [
            [0.36, 1],
            [0.38, SIT],
            [0.46, SIT],
            [0.48, 1]
          ]
        })
      },
      { name: "the first sermon: his voice, soft and golden", svg: arcs(n(his[0] + 3), n(his[1] - 2.6), SOFT_GOLD), keys: showFor(0.09, 0.096, 0.34, 0.346), loop: speaking },
      { name: "the second sermon: his voice, soft and golden", svg: arcs(n(his[0] + 3), n(his[1] - 2.6), SOFT_GOLD), keys: showFor(0.5, 0.506, 0.94, 0.946), loop: speaking },
      {
        name: "reciting the Quran: glints about his voice",
        svg: glints([
          [n(his[0] + 9.6), n(his[1] - 6.4)],
          [n(his[0] + 11.6), n(his[1] - 2.4)],
          [n(his[0] + 8), n(his[1] - 9.4)]
        ]),
        keys: showAt(0.69, 0.702),
        loop: twinkle()
      },
      {
        name: "exhorting: soft golden ways from his place to the rows",
        svg: way(`M${n(his[0] + 3)} ${n(his[1] + 1.4)} Q44 98 ${n(front[3][0] - 2)} ${n(front[3][1] - 1.6)}`, SOFT_GOLD, 0.8) + way(`M${n(his[0] + 3)} ${n(his[1] + 1.8)} Q52 104 ${n(back[4][0] - 2)} ${n(back[4][1] - 1.6)}`, SOFT_GOLD, 0.8),
        keys: showAt(0.76, 0.772)
      },
      { name: "exhorted: small lights in the rows", svg: [front[1], front[3], front[6], back[1], back[4]].map(([x, y]) => lightIn(x, n(y - 2.6), 2.6)).join(""), keys: showAt(0.83, 0.842), loop: soft }
    ],
    words: linesOn(THREE, ["Jabir ibn Samurah: he gave two", "Sermons between which he sat, recited", "The Quran and exhorted the people."])
  };
}

// Umrah to Umrah. Abu Hurairah said that the Messenger of Allah ﷺ said: (the performance of) Umra is an expiation for
// the sins committed (between it and the previous one), and the reward of Hajj Mabrur (the one accepted by Allah) is
// nothing except Paradise (Sahih al-Bukhari 1773). No one is drawn: the hills of Makkah, the Ka'bah, a home far off
// and a way between them; his place, a golden ring, and Abu Hurairah's place by him. Abu Hurairah's voice tells of it,
// and his voice, soft and golden, speaks. The place of one from the home goes along the way to the Ka'bah, and a spark
// of its Umrah rises; it goes back home, and grey specks come about it there: sins committed. It goes for another
// Umrah, a spark rises, and the specks fade. Then many places come about the Ka'bah for the Hajj, and a soft golden
// ring comes about its place: accepted. Far off, Paradise: a soft circle of light, and glints about its place.
function umrahToUmrah(): SignArt {
  const his: [number, number] = [24, 110];
  const hurairah: [number, number] = [38, 112.6];
  const start: [number, number] = [26, 98.6];
  const atKaaba: [number, number] = [112, 99.4];
  const there: [number, number] = [n(atKaaba[0] - start[0]), n(atKaaba[1] - start[1])];
  const pilgrims: [number, number][] = [
    [106, 104.4],
    [116, 106.4],
    [127, 106.8],
    [137, 104.6],
    [140, 99.8],
    [131, 101.6]
  ];
  return {
    kind: "umrah-to-umrah",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(64, 20) },
      { name: "a cloud", svg: cloud(30, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [14, 16, 24],
            [56, 22, 30],
            [100, 15, 24],
            [146, 20, 28]
          ],
          63,
          "#9C7A5A",
          false
        )
      },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [60, 118],
          [96, 119],
          [154, 116]
        ])
      },
      { name: "the Ka'bah", svg: kaaba(124, 97, 1.6) },
      { name: "a home far off", svg: home(16, 96, 13, 9) },
      {
        name: "the way to the Ka'bah",
        svg: lane([
          start,
          [54, 101.4],
          [84, 98.4],
          atKaaba
        ])
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.07, 0.076), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.08, 0.086, 0.94, 0.946), loop: speaking },
      { name: "the places of others about the Ka'bah, for the Hajj", svg: places(pilgrims, 1.4), keys: showAt(0.53, 0.55) },
      {
        name: "the sins committed: grey specks about its place, fading",
        svg: specks([
          [n(start[0] - 3.4), n(start[1] - 2.4)],
          [n(start[0] + 3.6), n(start[1] - 1.6)],
          [n(start[0] - 2.6), n(start[1] + 2.2)],
          [n(start[0] + 3), n(start[1] + 2.4)]
        ]),
        keys: track({
          opacity: [
            [0.272, 0],
            [0.29, 1],
            [0.37, 1],
            [0.4, 0]
          ],
          xy: [
            [0.3, 0, 0],
            [0.34, there[0], there[1]]
          ]
        })
      },
      {
        name: "the place of one from the home: going to the Ka'bah, and back, and again",
        svg: someone(start[0], start[1], 1.4, ONE),
        keys: track({
          xy: [
            [0.1, 0, 0],
            [0.14, there[0], there[1]],
            [0.17, there[0], there[1]],
            [0.2, 0, 0],
            [0.3, 0, 0],
            [0.34, there[0], there[1]]
          ]
        })
      },
      spark("an Umrah: a spark rising", atKaaba[0], n(atKaaba[1] - 4), 0.142, 0.168),
      spark("another Umrah: a spark rising", atKaaba[0], n(atKaaba[1] - 4), 0.344, 0.37),
      { name: "accepted: a soft golden ring about its place", svg: ring(atKaaba[0], n(atKaaba[1] + 0.8), 3.4, SOFT_GOLD), keys: showAt(0.6, 0.612) },
      { name: "its reward: Paradise far off, a soft circle of light", svg: farOff(140, 30, 10) + gardenIn(140, 30, 10), keys: showAt(0.78, 0.8) },
      {
        name: "and glints about its place",
        svg: glints([
          [n(atKaaba[0] - 3), n(atKaaba[1] - 4.4)],
          [n(atKaaba[0] + 3.4), n(atKaaba[1] - 3.6)],
          [atKaaba[0], n(atKaaba[1] - 6)]
        ]),
        keys: showAt(0.86, 0.872),
        loop: twinkle()
      }
    ],
    words: linesOn(FOUR, ["Abu Hurairah: he said: Umrah is an", "Expiation for the sins committed.", "And the reward of Hajj Mabrur is", "Nothing except Paradise."])
  };
}

export const TOGETHER_ART = {
  "despite-the-odds": despiteTheOdds,
  "while-hearts-agree": whileHeartsAgree,
  "sweet-and-green": sweetAndGreen,
  "brothers-to-come": brothersToCome,
  "two-sermons": twoSermons,
  "umrah-to-umrah": umrahToUmrah
} as const;
