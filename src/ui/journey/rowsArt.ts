import { cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, LIGHT, palms, sparkRising, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { food } from "./hopeArt";
import { lookLine } from "./truthArt";
import { dish } from "./worthArt";
import { litWindow, NIGHT_OVER_LAND, NIGHT_OVER_SKY, nightLand } from "./heedArt";
import { quickSparks } from "./toldArt";
import { road, showAt, showFor } from "./roadArt";

/**
 * Ways kept: drawing up in rows, the first rows complete and close together; Zayd ibn Arqam, who told the truth, and
 * Allah confirmed him; the three who would outdo his worship, and his Sunnah of fasting and eating, prayer and sleep,
 * and marriage; not coming home to one's family at night after a long time away; shortening the prayer on a journey, a
 * charity from Allah to be accepted; the du'a before sleep; and Abu Bakr, who would not tell his secret. Only the land,
 * the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not
 * even a hand, a foot or a face, and no one is drawn on a camel: where someone was, a ring or a small dashed circle
 * shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah or for the
 * angels, and nothing comes down from the sky: a du'a is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** Grey, for words that should not have been said. */
const GREY = "#8C8C8C";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const rowsLand = (tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts);

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** Keys of a place drawn where it ends, that shows at `from` `dx`, `dy` away and comes to its place by `to`. */
const cameFrom = (dx: number, dy: number, from: number, to: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.005), 1]
    ],
    xy: [
      [from, dx, dy],
      [to, 0, 0]
    ]
  });

/** A small upright mark scratched on stone or a wall, its foot at (x, y): a day counted. */
const tally = (x: number, y: number, color = "#FFFFFF") =>
  `<path d="M${x} ${y} L${x} ${n(y - 2.6)}" stroke="${color}" stroke-width="0.6" stroke-linecap="round"/>`;

/** A mat on the ground, its middle at (x, y), `w` wide. */
const mat = (x: number, y: number, w = 8) =>
  `<path d="M${n(x - w / 2)} ${n(y - 0.8)} L${n(x + w / 2)} ${n(y - 0.8)} L${n(x + w / 2 + 0.8)} ${n(y + 0.8)} L${n(x - w / 2 - 0.8)} ${n(y + 0.8)} Z" fill="#B98F5A"/>`;

/** A faint golden line along the ground from x1 to x2 at y: where a row is to stand. */
const rowLine = (x1: number, x2: number, y: number) =>
  `<path d="M${x1} ${y} L${x2} ${y}" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1.4 1" opacity="0.85"/>`;

// Close in the rows. Jabir ibn Samurah said: the Prophet ﷺ came out to us and saw us sitting in circles, and said: why
// do I see you apart, in groups? Then he came out to us again and said: will you not draw up in rows as the angels
// draw up before their Lord? We asked how the angels draw up before their Lord, and he said: they complete the first
// rows, and keep close together in the row (Sahih Muslim 430). No one is drawn, and nothing for the angels: by the
// masjid of Madinah, twelve places sit in three circles. His place, a golden ring, comes out from his home, and a faint
// golden line goes from it to the circles; his voice speaks, and grey rings come about the circles. His place goes in,
// and comes out again; his voice speaks, and two faint golden lines show on the ground, where rows would stand. A voice
// from one circle asks. His voice speaks, and the places of two circles line up along the first line until the first
// row is full, then those of the third along the second; then each row draws close together, and a soft golden ring, a
// soft glow and glints come about the rows.
function closeInTheRows(): SignArt {
  const homeAt: [number, number] = [12, 97];
  const door: [number, number] = [11.4, 99.6];
  const his: [number, number] = [28, 103];
  const out: [number, number] = [n(door[0] - his[0]), n(door[1] - his[1])];
  const circles: [number, number][] = [
    [46, 104],
    [82, 106.2],
    [118, 103.4]
  ];
  // Each circle's four places, left to right along it.
  const around: [number, number][] = [
    [-3.4, 0],
    [0, -1.7],
    [0, 1.7],
    [3.4, 0]
  ];
  const row1 = 100.6;
  const row2 = 106.4;
  const slot = (i: number, count: number, step: number) => n(80 + (i - (count - 1) / 2) * step);
  // Where each place goes: the first and third circles fill the first row, the middle one the second.
  const places: SignPart[] = circles.flatMap(([cx, cy], c) =>
    around.map(([ox, oy], j): SignPart => {
      const [x, y] = [n(cx + ox), n(cy + oy)];
      const first = c !== 1;
      const i = c === 2 ? j + 4 : j;
      const [count, ry, go, there] = first ? [8, row1, 0.715, 0.76] : [4, row2, 0.765, 0.805];
      const loose: [number, number] = [n(slot(i, count, 5) - x), n(ry - y)];
      const close: [number, number] = [n(slot(i, count, 3.3) - x), n(ry - y)];
      return {
        name: `a place in the circles ${c * 4 + j + 1}`,
        svg: someone(x, y, 1.3),
        keys: track({
          xy: [
            [go, 0, 0],
            [there, loose[0], loose[1]],
            [0.87, loose[0], loose[1]],
            [0.9, close[0], close[1]]
          ]
        })
      };
    })
  );
  return {
    kind: "close-in-the-rows",
    ms: 12000,
    parts: [
      ...daySky(134, 76, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: rowsLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(50, 91, 1.05) },
      ...palms([
        [38, 92, 12],
        [130, 92.6, 13]
      ]),
      { name: "his home", svg: home(homeAt[0], homeAt[1], 12, 9) },
      {
        name: "his place, a golden ring",
        svg: ring(his[0], his[1], 2.4, GOLD),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.03, 1],
            [0.24, 1],
            [0.25, 0],
            [0.305, 0],
            [0.31, 1]
          ],
          xy: [
            [0.03, out[0], out[1]],
            [0.07, 0, 0],
            [0.225, 0, 0],
            [0.245, out[0], out[1]],
            [0.31, out[0], out[1]],
            [0.335, 0, 0]
          ]
        })
      },
      { name: "he saw them: a faint golden line from his place to the circles", svg: lookLine(30.4, 102, 80, 104.2, 93), keys: showFor(0.075, 0.09, 0.215, 0.225) },
      { name: "his voice: why do I see you apart", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.17, 0.18, 0.215, 0.225), loop: speaking },
      { name: "apart: grey rings about the circles", svg: circles.map(([x, y]) => greyRing(x, y, 5.6, 3)).join(""), keys: showFor(0.19, 0.2, 0.705, 0.715) },
      { name: "his voice, again: why not draw up in rows", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.34, 0.35, 0.575, 0.585), loop: speaking },
      { name: "rows: two faint golden lines on the ground", svg: rowLine(58, 102, row1 + 1.9) + rowLine(68, 92, row2 + 1.9), keys: showAt(0.45, 0.47) },
      { name: "the voice of one asking how", svg: arcs(84.2, 100.8, VOICE), keys: showFor(0.58, 0.59, 0.705, 0.715), loop: speaking },
      { name: "his voice: they complete the first rows", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.71, 0.72), loop: speaking },
      ...places,
      { name: "complete: a soft golden ring about the rows", svg: care(80, 103.6, 16.4, 6.4, SOFT_GOLD), keys: showAt(0.905, 0.92), loop: soft },
      { name: "close together: a soft golden glow over the rows", svg: wash(80, 103.4, 18, 7, WARM, 0.12), keys: showAt(0.925, 0.94) },
      {
        name: "lined up: glints over the rows",
        svg: glints([
          [70, 96.4],
          [80, 95.6],
          [90, 96.4]
        ]),
        keys: showAt(0.945, 0.955),
        loop: { move: "twinkle", ms: 1400, low: 0.5 }
      }
    ],
    words: [
      { text: "He came to us and saw us in circles", from: 0.02, to: 0.15 },
      { text: "He said: why do I see you apart in groups?", from: 0.165, to: 0.29 },
      { text: "He came again and said: why not draw up", from: 0.305, to: 0.43 },
      { text: "in rows as angels do before their Lord?", from: 0.445, to: 0.56 },
      { text: "We asked: how do the angels draw up?", from: 0.575, to: 0.69 },
      { text: "He said: they complete the first rows", from: 0.705, to: 0.85 },
      { text: "and keep close together in the row", from: 0.865, to: 1 }
    ]
  };
}

// Zayd told the truth. Zayd ibn Arqam said: I was on a campaign, and I heard Abdullah ibn Ubayy say: do not spend on
// those who are with the Messenger of Allah, so that they go away from him. I told my uncle, or Umar, and he told the
// Prophet ﷺ. He sent for Abdullah ibn Ubayy and his companions, and they swore they had not said it; so he believed
// him, and not me, and I grieved as never before. Then Allah revealed: when the hypocrites come to you; and he sent
// for me, recited it, and said: Allah has confirmed you, O Zayd (Sahih al-Bukhari 4900). No one is drawn: in a camp of
// tents, his place, a golden ring, by his tent. Ibn Ubayy's voice speaks, grey, and a faint line goes from it to
// Zayd's small place; a grey ring comes about Ibn Ubayy and his folk. Zayd's place goes to the one it told, and its
// voice speaks; that one's voice speaks toward his place, and a faint line goes to it. A faint golden line goes from
// his place to Ibn Ubayy's: they come, and their voice speaks, grey. A grey ring comes about Zayd's place; they go
// back, and Zayd's place goes back to its tent, with a grey haze of grief. A faint golden line goes from his place to
// Zayd's tent; Zayd's place comes, his voice speaks, the grey goes, and a soft golden ring, a warm glow and golden
// glints come about Zayd's place; a grey ring comes about Ibn Ubayy's.
function zaydWasTruthful(): SignArt {
  const his: [number, number] = [22, 101.4];
  const told: [number, number] = [66, 102];
  const zayd: [number, number] = [98, 102.4];
  const ubayy: [number, number] = [126, 103.4];
  const folk: [number, number][] = [
    [133, 104.8],
    [140, 103.6]
  ];
  // Where Ibn Ubayy and his folk stand before his place, along the front of the camp.
  const before: [number, number][] = [
    [36, 106.6],
    [42.5, 107.6],
    [49, 106.6]
  ];
  const sentFor = ([x, y]: [number, number], [bx, by]: [number, number]) =>
    track({
      xy: [
        [0.465, 0, 0],
        [0.5, n(bx - x), n(by - y)],
        [0.6, n(bx - x), n(by - y)],
        [0.64, 0, 0]
      ]
    });
  const atTold: [number, number] = [n(told[0] + 5), zayd[1]];
  const byHim: [number, number] = [30, 103.4];
  // Zayd's way: to the one it told, back to its tent, and to his place when he sends for it.
  const zaydWay = (): [number, number, number][] => [
    [0.305, 0, 0],
    [0.33, n(atTold[0] - zayd[0]), 0],
    [0.61, n(atTold[0] - zayd[0]), 0],
    [0.64, 0, 0],
    [0.75, 0, 0],
    [0.785, n(byHim[0] - zayd[0]), n(byHim[1] - zayd[1])]
  ];
  return {
    kind: "zayd-was-truthful",
    ms: 12000,
    parts: [
      ...daySky(120, 64, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: rowsLand() },
      { name: "his tent", svg: tent(20, 93, 13, 8.5) },
      { name: "the tent of the one Zayd told", svg: tent(64, 92.4, 11, 7.5, "#E8DAB8") },
      { name: "Zayd's tent", svg: tent(98, 93, 10, 7, "#EADFC2") },
      { name: "Ibn Ubayy's tent", svg: tent(136, 92.4, 14, 9, "#E4D6B4") },
      { name: "a camel of the camp", svg: camel(82, 98.6, 0.13), loop: { move: "bob", ms: 2600, y: -0.2 } },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the one Zayd told: its place", svg: someone(told[0], told[1], 1.5) },
      { name: "Ibn Ubayy's place", svg: someone(ubayy[0], ubayy[1], 1.5), keys: sentFor(ubayy, before[0]) },
      ...folk.map(([x, y], i): SignPart => ({ name: `Ibn Ubayy's folk: a place ${i + 1}`, svg: someone(x, y, 1.4), keys: sentFor([x, y], before[i + 1]) })),
      { name: "Ibn Ubayy's voice: do not spend on them", svg: arcsLeft(n(ubayy[0] - 2.4), n(ubayy[1] - 3.6), GREY), keys: showFor(0.03, 0.04, 0.305, 0.315), loop: speaking },
      { name: "heard: a faint line from Ibn Ubayy's voice to Zayd's small place", svg: lookLine(117.6, 99.6, 99.6, 100.6, 95, "#9A8A78"), keys: showFor(0.07, 0.08, 0.305, 0.315) },
      { name: "do not spend: a grey ring about Ibn Ubayy and his folk", svg: greyRing(133, 104.2, 10.6, 3.2), keys: showFor(0.17, 0.18, 0.446, 0.456) },
      { name: "Zayd's small place", svg: someone(zayd[0], zayd[1], 1.15), keys: track({ xy: zaydWay() }) },
      { name: "Zayd's voice: what Ibn Ubayy said", svg: arcsLeft(n(atTold[0] - 1.8), n(atTold[1] - 3), VOICE), keys: showFor(0.333, 0.338, 0.352, 0.357), loop: speaking },
      { name: "the voice of the one Zayd told, toward his place", svg: arcsLeft(n(told[0] - 2), n(told[1] - 3.6), VOICE), keys: showFor(0.36, 0.368, 0.446, 0.456), loop: speaking },
      { name: "told him: a faint line from the one Zayd told to his place", svg: lookLine(60.8, 100, 24.6, 100.2, 92, "#9A8A78"), keys: showFor(0.375, 0.385, 0.446, 0.456) },
      { name: "he sent for them: a faint golden line from his place to Ibn Ubayy's place", svg: lookLine(24.6, 100.2, 123.6, 102, 86), keys: showFor(0.45, 0.46, 0.505, 0.515) },
      { name: "Ibn Ubayy and his folk swear: their voice", svg: arcsLeft(n(before[0][0] - 2.2), n(before[0][1] - 3.4), GREY), keys: showFor(0.505, 0.515, 0.588, 0.598), loop: speaking },
      {
        name: "not believed: a grey ring about Zayd's small place",
        svg: greyRing(zayd[0], n(zayd[1] + 0.4), 2.8, 1.6),
        keys: track({
          xy: zaydWay(),
          opacity: [
            [0.595, 0],
            [0.605, 1],
            [0.875, 1],
            [0.885, 0]
          ]
        })
      },
      {
        name: "grief: a grey haze about Zayd's small place",
        svg: wash(zayd[0], zayd[1], 4.6, 3.4, GREY, 0.14),
        keys: track({
          xy: zaydWay(),
          opacity: [
            [0.645, 0],
            [0.66, 1],
            [0.875, 1],
            [0.885, 0]
          ]
        })
      },
      { name: "he sent for Zayd: a faint golden line from his place to Zayd's tent", svg: lookLine(24.6, 100.2, 96, 101.2, 88), keys: showFor(0.735, 0.745, 0.79, 0.8) },
      { name: "his voice: confirmed, O Zayd", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.79, 0.8), loop: speaking },
      { name: "confirmed: a soft golden ring about Zayd's small place", svg: care(byHim[0], n(byHim[1] + 0.4), 2.8, 1.5, SOFT_GOLD), keys: showAt(0.89, 0.9), loop: soft },
      { name: "truthful: a warm glow about Zayd's small place", svg: glow(byHim[0], byHim[1], 5, WARM, 0.3), keys: showAt(0.905, 0.915) },
      {
        name: "truthful: golden glints over Zayd's small place",
        svg: glints(
          [
            [27.6, 99.2],
            [32.6, 98.8]
          ],
          0.9,
          "#FFD866"
        ),
        keys: showAt(0.92, 0.93),
        loop: { move: "twinkle", ms: 1200, low: 0.5 }
      },
      { name: "found out: a grey ring about Ibn Ubayy's place", svg: greyRing(ubayy[0], n(ubayy[1] + 0.5), 3.2, 1.7), keys: showAt(0.935, 0.945) }
    ],
    words: [
      { text: "Zayd: I heard Abdullah ibn Ubayy say", from: 0.02, to: 0.147 },
      { text: "don't spend, so they go away from him", from: 0.162, to: 0.289 },
      { text: "I told my uncle or Umar, who told him", from: 0.304, to: 0.431 },
      { text: "Ibn Ubayy and his folk swore they had not", from: 0.446, to: 0.573 },
      { text: "He believed him, not me, and I grieved", from: 0.588, to: 0.715 },
      { text: "Then he sent for me and recited it", from: 0.73, to: 0.857 },
      { text: "and said: Allah has confirmed you, O Zayd", from: 0.872, to: 1 }
    ]
  };
}

/** A small soft golden ring in the air: a day of fasting. */
const aFast = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="1.2" stroke="#E8C25A" stroke-width="0.6" fill="#FFE07A" fill-opacity="0.2"/>`;

/** A small dish with a date on it, in the air: a day of eating. */
const aMeal = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${n(y + 0.2)} Q${x} ${n(y + 1.4)} ${n(x + 1.6)} ${n(y + 0.2)} Z" fill="#B8864A"/><ellipse cx="${x}" cy="${n(y - 0.3)}" rx="0.9" ry="0.55" fill="#7A3E1E"/>`;

// This is my Sunnah. Anas ibn Malik said: three came to the homes of the Prophet's ﷺ wives, asking about his worship,
// and when they were told, it was as if they thought it little. One said: as for me, I will pray all night, always.
// Another said: I will fast all the time and not break my fast. Another said: I will keep away from women and never
// marry. Then he came and said: ... but I fast and I break my fast, I pray and I sleep, and I marry women; so whoever
// turns from my Sunnah is not of me (Sahih al-Bukhari 5063). No one is drawn: by the masjid of Madinah, his homes. Three
// places come along the way, and their voice asks at a door; a voice answers from his homes, and a grey ring comes about
// the three. Night falls, and sparks rise from the first, one after another, as its voice speaks; day comes. The second
// one's voice speaks, and a soft golden ring of fasting shows for each day in a row. The third one's voice speaks, and a
// grey ring comes about its home. His place, a golden ring, comes from the masjid, and his voice speaks: fasts and meals
// show in turn. A spark rises from his place; a mat shows by it; and his homes' windows grow warm with light. A faint
// golden way goes from his place to the three, a soft golden ring comes about his place, the grey ring goes, and a soft
// golden glow comes over his homes.
function thisIsMySunnah(): SignArt {
  const homes = [34, 46, 58, 70];
  const three: [number, number][] = [
    [90, 102.2],
    [100, 103.2],
    [110, 102.2]
  ];
  const from: [number, number] = [14, 99.4];
  const his: [number, number] = [80, 102.6];
  const fastsAt = [92, 96, 100, 104, 108, 112, 116];
  const turnsAt = [70, 74, 78, 82, 86, 90];
  return {
    kind: "this-is-my-sunnah",
    ms: 12000,
    parts: [
      ...daySky(132, 104, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: rowsLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.5) },
      { name: "his homes by the masjid", svg: homes.map((x) => home(x, 95, 10, 7.5)).join("") },
      { name: "the home of the third one", svg: home(130, 95.4, 10, 7.5, "#CDA67A", "#B58F62") },
      ...palms([[150, 93, 12]]),
      ...three.map(([x, y], i): SignPart => ({ name: `the three: a place ${i + 1}`, svg: someone(x, y, 1.5), keys: cameFrom(n(56 - i * 2), 0, 0.025, 0.07) })),
      { name: "the three asking: a voice at the door", svg: arcsLeft(n(three[0][0] - 2.4), n(three[0][1] - 3.6), VOICE), keys: showFor(0.075, 0.085, 0.145, 0.155), loop: speaking },
      { name: "told: a voice from his homes", svg: arcs(73.4, 92.4, "#FFFFFF"), keys: showFor(0.15, 0.16, 0.27, 0.28), loop: speaking },
      { name: "they thought it little: a grey ring about the three", svg: greyRing(100, 103, 13.6, 3.4), keys: showFor(0.18, 0.19, 0.93, 0.94) },
      { name: "the first one's night", svg: NIGHT_OVER_SKY + NIGHT_OVER_LAND, keys: showFor(0.272, 0.282, 0.395, 0.405) },
      {
        name: "the first one's night: stars and the moon",
        svg:
          stars([
            [20, 16],
            [48, 30],
            [74, 12],
            [118, 28],
            [146, 14]
          ]) + crescent(98, 22, 4, 2, "#FFF3B8"),
        keys: showFor(0.272, 0.282, 0.395, 0.405)
      },
      { name: "the first one's voice: I will pray all night", svg: arcs(n(three[0][0] + 1.8), n(three[0][1] - 3.4), LIGHT), keys: showFor(0.275, 0.285, 0.395, 0.405), loop: speaking },
      ...quickSparks(
        "all night: a spark rising from the first one's place",
        [
          [90, 98],
          [90, 97],
          [90, 98]
        ],
        0.285,
        0.012
      ),
      { name: "the second one's voice: I will always fast", svg: arcs(n(three[1][0] + 1.8), n(three[1][1] - 3.4), VOICE), keys: showFor(0.4, 0.41, 0.52, 0.53), loop: speaking },
      ...fastsAt.map((x, i): SignPart => ({ name: `always fasting: a fast for each day ${i + 1}`, svg: aFast(x, 88), keys: showFor(at3(0.41 + i * 0.007), at3(0.415 + i * 0.007), 0.645, 0.655) })),
      { name: "the third one's voice: I will never marry", svg: arcs(n(three[2][0] + 1.8), n(three[2][1] - 3.4), VOICE), keys: showFor(0.525, 0.535, 0.645, 0.655), loop: speaking },
      { name: "never to marry: a grey ring about the third one's home", svg: greyRing(130, 92, 8, 5.6), keys: showFor(0.545, 0.56, 0.93, 0.94) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: cameFrom(n(from[0] - his[0]), n(from[1] - his[1]), 0.65, 0.69) },
      { name: "his voice: I fast, and break my fast", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.695, 0.705), loop: speaking },
      ...turnsAt.map((x, i): SignPart => ({ name: `fasting and eating: a fast or a meal in turn ${i + 1}`, svg: i % 2 ? aMeal(x, 89) : aFast(x, 88), keys: showAt(at3(0.698 + i * 0.002), at3(0.703 + i * 0.002)) })),
      { name: "I pray: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 4), 1.6, "#FFE7A0"), keys: sparkRising(0.775, 0.805), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "and I sleep: a mat by his place", svg: mat(n(his[0] + 0.4), n(his[1] + 3.4)), keys: showAt(0.81, 0.82) },
      { name: "and I marry: warm light in his homes", svg: homes.map((x) => litWindow(x, 95, 7.5)).join(""), keys: showAt(0.825, 0.835) },
      { name: "my Sunnah: a faint golden way from his place to the three", svg: way(`M${n(his[0] + 3)} 104.4 Q95 109 ${n(three[2][0] + 2)} 104.6`, "#F3D58A", 0.9), keys: showAt(0.9, 0.915) },
      { name: "his Sunnah: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.5), 3.8, 1.9, SOFT_GOLD), keys: showAt(0.915, 0.925), loop: soft },
      { name: "his Sunnah: a soft golden glow over his homes", svg: wash(52, 92, 28, 8, WARM, 0.1), keys: showAt(0.945, 0.955) }
    ],
    words: [
      { text: "Three came, asking about his worship", from: 0.02, to: 0.13 },
      { text: "When told, they thought it was little", from: 0.145, to: 0.255 },
      { text: "One said: I will pray all night, always", from: 0.27, to: 0.38 },
      { text: "Another: I will fast and never break it", from: 0.395, to: 0.505 },
      { text: "Another: I will not marry, ever", from: 0.52, to: 0.63 },
      { text: "He said: but I fast and break my fast", from: 0.645, to: 0.755 },
      { text: "I pray and I sleep, and I marry", from: 0.77, to: 0.88 },
      { text: "Whoever turns from my Sunnah is not of me", from: 0.895, to: 1 }
    ]
  };
}

/** A grey rock, its foot's middle at (x, y), `w` wide. */
const rock = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${n(x - w / 2 + 0.6)} ${n(y - w * 0.5)} ${n(x - w * 0.1)} ${n(y - w * 0.6)} Q${n(x + w * 0.4)} ${n(y - w * 0.56)} ${n(x + w / 2)} ${y} Z" fill="#9A8F80"/>`;

/** The dusk over the land: a warm tint low in the sky, and the land a little darker. */
const DUSK_TINT =
  `<rect width="160" height="62" fill="#EE9A72" opacity="0.5"/><rect width="160" height="30" fill="#6F7FB4" opacity="0.45"/>` +
  `<rect y="62" width="160" height="58" fill="#6F5A70" opacity="0.18"/>`;

// Not home at night. Jabir ibn Abdullah said that the Messenger of Allah ﷺ said: when one of you has been away a long
// time, he should not come to his family at night (Sahih al-Bukhari 5244). No one is drawn, and no one on a camel: far
// off, a traveller's place and its camel stand by a tent, and a mark is scratched on a rock for each day away. They set
// out along the road to the town; dusk comes as they near it, and they stop outside, a soft ring about the traveller's
// place. Night falls, with stars and the moon; the home's window is lit, and the traveller's place rests on a mat by the
// road. Day comes, the sun rises, and the traveller's place goes home with its camel; glints show over the family's
// places, a warm glow comes about the home, and a soft golden ring about the traveller's place.
function notHomeAtNight(): SignArt {
  const homeAt: [number, number] = [20, 96];
  const family: [number, number][] = [
    [28.6, 103.2],
    [33, 104.4]
  ];
  const t0: [number, number] = [134, 103.4];
  const c0: [number, number] = [148, 104.6];
  const outside = -70;
  const homeward = -96;
  const travel: [number, number, number][] = [
    [0.35, 0, 0],
    [0.52, outside, 0],
    [0.72, outside, 0],
    [0.73, n(outside + 1.4), 0.6],
    [0.86, n(outside + 1.4), 0.6],
    [0.9, homeward, 0]
  ];
  const camelWay: [number, number, number][] = [
    [0.35, 0, 0],
    [0.52, outside, 0],
    [0.86, outside, 0],
    [0.9, n(homeward + 4), 0]
  ];
  const night = showFor(0.675, 0.7, 0.8, 0.83);
  const marks = [119.6, 121, 122.4, 123.8, 125.2, 126.6, 128, 129.4];
  return {
    kind: "not-home-at-night",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun",
        svg: sun(110, 20),
        keys: track({
          opacity: [
            [0.53, 1],
            [0.6, 0],
            [0.82, 0],
            [0.83, 1]
          ],
          xy: [
            [0.53, 0, 0],
            [0.6, 0, 38],
            [0.7, 0, 38],
            [0.72, -80, 38],
            [0.83, -80, 38],
            [0.86, -80, 0]
          ]
        })
      },
      { name: "a cloud", svg: cloud(60, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: rowsLand() },
      { name: "the road", svg: road(0, 160, 104.4) },
      { name: "a home of the town", svg: home(6, 95.4, 10, 7.5, "#C99A66", "#B08452") },
      { name: "the traveller's home", svg: home(homeAt[0], homeAt[1], 14, 10) },
      { name: "far off: the traveller's tent", svg: tent(142, 93, 12, 8) },
      { name: "a rock by the tent", svg: rock(124.6, 100.4, 13) },
      ...marks.map((x, i): SignPart => ({ name: `a day away: a mark on the rock ${i + 1}`, svg: tally(x, 98.6), keys: showFor(at3(0.04 + i * 0.03), at3(0.045 + i * 0.03), 0.35, 0.36) })),
      { name: "the traveller's family: small places by the home", svg: someone(family[0][0], family[0][1], 1.3) + someone(family[1][0], family[1][1], 1) },
      {
        name: "the traveller's camel",
        svg: camel(c0[0], c0[1], 0.17, true),
        keys: track({ xy: camelWay }),
        loop: { move: "bob", ms: 1100, y: -0.3 }
      },
      { name: "the traveller's place", svg: someone(t0[0], t0[1], 1.5), keys: track({ xy: travel }) },
      { name: "dusk", svg: DUSK_TINT, keys: showFor(0.53, 0.56, 0.8, 0.83) },
      { name: "not at night: a soft ring about the traveller's place", svg: care(n(t0[0] + outside), n(t0[1] + 0.5), 3.2, 1.7, "#FFFFFF"), keys: showFor(0.575, 0.59, 0.71, 0.72), loop: soft },
      { name: "the night over the sky", svg: NIGHT_OVER_SKY, keys: night },
      { name: "the night over the land", svg: NIGHT_OVER_LAND, keys: night },
      {
        name: "stars",
        svg: stars([
          [14, 14],
          [36, 40],
          [62, 10],
          [90, 34],
          [118, 12],
          [140, 42],
          [152, 20]
        ]),
        keys: night,
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "the moon", svg: crescent(128, 22, 4.2, 2, "#FFF3B8"), keys: night },
      { name: "the home at night: its window lit", svg: litWindow(homeAt[0], homeAt[1], 10), keys: showFor(0.705, 0.715, 0.8, 0.83) },
      { name: "a mat by the road for the night", svg: mat(n(t0[0] + outside + 1.4), n(t0[1] + 3.6)), keys: showFor(0.715, 0.725, 0.84, 0.85) },
      {
        name: "home in the day: glints over the family's places",
        svg: glints([
          [29.4, 99.4],
          [33.8, 100.4]
        ]),
        keys: showAt(0.905, 0.915),
        loop: { move: "twinkle", ms: 1300, low: 0.5 }
      },
      { name: "home in the day: a warm glow about the home", svg: glow(homeAt[0], 94, 11, WARM, 0.22), keys: showAt(0.92, 0.935) },
      { name: "a soft golden ring about the traveller's place, home", svg: care(n(t0[0] + homeward), n(t0[1] + 0.5), 3.2, 1.7, SOFT_GOLD), keys: showAt(0.94, 0.955), loop: soft }
    ],
    words: [
      { text: "He said: when one of you is long away", from: 0.02, to: 0.33 },
      { text: "he should not come to his family", from: 0.345, to: 0.655 },
      { text: "at night", from: 0.67, to: 1 }
    ]
  };
}

/** A small mark of a prayer's rak'ah in the air, a light dot ringed in gold. */
const rakah = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#FFF0C4" stroke="${GOLD}" stroke-width="0.4"/>`;

// A charity for travellers. Ya'la ibn Umayyah said: I said to Umar ibn al-Khattab: (Allah says) you may shorten the
// prayer if you fear that those who disbelieve may harm you (Quran 4:101), and now the people are safe. He said: I
// wondered at what you wonder at, so I asked the Messenger of Allah ﷺ about it, and he said: it is a charity Allah has
// given you, so accept His charity (Sahih Muslim 686). No one is drawn, and no one on a camel: by the road, travellers'
// places sit by their resting camels, and over them four small marks of a prayer. Ya'la's voice speaks to Umar's place;
// a soft ring comes about the travellers: safe. Umar's voice answers. Long before, in a pale wash, his place, a golden
// ring, with Umar's place by it, and Umar's voice asks. His voice speaks; two of the four marks go, glints show over the
// two left, and a soft golden glow comes over the travellers. A soft golden ring comes about them, and two sparks rise
// from their places.
function aCharityForTravellers(): SignArt {
  const umar: [number, number] = [62, 103.6];
  const yala: [number, number] = [74, 104];
  const travellers: [number, number][] = [
    [112, 103.2],
    [119, 104.4],
    [126, 103.2]
  ];
  const his: [number, number] = [18, 100.6];
  const umarThen: [number, number] = [28, 102.4];
  return {
    kind: "a-charity-for-travellers",
    ms: 10000,
    parts: [
      ...daySky(96, 40, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: rowsLand() },
      { name: "the road", svg: road(40, 160, 108) },
      { name: "a travellers' camel 1", svg: camel(140, 99, 0.15, true), loop: { move: "bob", ms: 2400, y: -0.2 } },
      { name: "a travellers' camel 2", svg: camel(154, 100.4, 0.14, true), loop: { move: "bob", ms: 2800, y: -0.2, phase: 0.4 } },
      { name: "the travellers' places", svg: travellers.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "a prayer of four: two marks", svg: rakah(112, 93) + rakah(116.6, 93) },
      { name: "a prayer of four: two more marks", svg: rakah(121.2, 93) + rakah(125.8, 93), keys: track({ opacity: [[0.705, 1], [0.725, 0]] }) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.5) },
      { name: "Ya'la's place", svg: someone(yala[0], yala[1], 1.5) },
      { name: "Ya'la's voice: now the travellers are safe", svg: arcsLeft(n(yala[0] - 2.2), n(yala[1] - 3.6), VOICE), keys: showFor(0.03, 0.04, 0.35, 0.36), loop: speaking },
      { name: "safe: a soft ring about the travellers' places", svg: care(119, 104, 11.4, 3.2, "#FFFFFF"), keys: showAt(0.19, 0.205), loop: soft },
      { name: "Umar's voice: I wondered as you wonder", svg: arcs(n(umar[0] + 2.2), n(umar[1] - 3.6), VOICE), keys: showFor(0.355, 0.365, 0.515, 0.525), loop: speaking },
      { name: "long before: a pale wash", svg: wash(23, 101.6, 13, 7, "#FFFFFF", 0.14), keys: showAt(0.52, 0.535) },
      { name: "long before: his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: showAt(0.52, 0.535) },
      { name: "long before: Umar's place by his place", svg: someone(umarThen[0], umarThen[1], 1.5), keys: showAt(0.52, 0.535) },
      { name: "Umar's voice, long before: asking him", svg: arcsLeft(n(umarThen[0] - 2), n(umarThen[1] - 3.4), VOICE), keys: showFor(0.54, 0.55, 0.68, 0.69), loop: speaking },
      { name: "his voice: a charity given to you", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.685, 0.695), loop: speaking },
      {
        name: "a charity: glints over the two marks left",
        svg: glints([
          [110.4, 89.6],
          [118.2, 89.6]
        ]),
        keys: showAt(0.73, 0.745),
        loop: { move: "twinkle", ms: 1300, low: 0.5 }
      },
      { name: "a charity: a soft golden glow over the travellers' places", svg: wash(119, 101, 15, 6, WARM, 0.12), keys: showAt(0.75, 0.765) },
      { name: "accepted: a soft golden ring about the travellers' places", svg: care(119, 104, 11.4, 3.2, SOFT_GOLD), keys: showAt(0.85, 0.865), loop: soft },
      { name: "their prayer, shortened: a spark rising 1", svg: sparkle(114, 99, 1.6, "#FFE7A0"), keys: sparkRising(0.87, 0.91), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "their prayer, shortened: a spark rising 2", svg: sparkle(124, 99, 1.6, "#FFE7A0"), keys: sparkRising(0.895, 0.935), loop: { move: "twinkle", ms: 900, low: 0.5, phase: 0.5 } }
    ],
    words: [
      { text: "Ya'la said to Umar ibn al-Khattab", from: 0.02, to: 0.17 },
      { text: "the people are now safe", from: 0.185, to: 0.335 },
      { text: "Umar: I wondered as you wonder", from: 0.35, to: 0.5 },
      { text: "so I asked him about it", from: 0.515, to: 0.665 },
      { text: "He said: it is a charity Allah gives you", from: 0.68, to: 0.83 },
      { text: "so accept His charity", from: 0.845, to: 1 }
    ]
  };
}

/** A grain on the ground at (x, y), in two halves that part by `gap`. */
const grainHalf = (x: number, y: number, side: -1 | 1) =>
  `<path d="M${x} ${n(y - 1.3)} Q${n(x + side * 2.2)} ${n(y - 1.2)} ${n(x + side * 2.2)} ${y} Q${n(x + side * 2.2)} ${n(y + 1.2)} ${x} ${n(y + 1.3)} Z" fill="#E9C46A" stroke="#B8902F" stroke-width="0.3"/>`;

/** A date-stone on the ground at (x, y), in two halves. */
const stoneHalf = (x: number, y: number, side: -1 | 1) =>
  `<path d="M${x} ${n(y - 0.9)} Q${n(x + side * 2.6)} ${n(y - 0.9)} ${n(x + side * 2.6)} ${y} Q${n(x + side * 2.6)} ${n(y + 0.9)} ${x} ${n(y + 0.9)} Z" fill="#8A5A34" stroke="#5E3C1E" stroke-width="0.3"/>`;

/** A green shoot from (x, y), `h` high, with two small leaves. */
const shoot = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h)}" stroke="#6DB24F" stroke-width="0.8" stroke-linecap="round"/>` +
  `<path d="M${x} ${n(y - h * 0.7)} Q${n(x - 2.4)} ${n(y - h * 1.1)} ${n(x - 2.8)} ${n(y - h * 0.6)} Q${n(x - 1.2)} ${n(y - h * 0.5)} ${x} ${n(y - h * 0.7)} Z" fill="#7FC25A"/>` +
  `<path d="M${x} ${n(y - h * 0.8)} Q${n(x + 2.4)} ${n(y - h * 1.2)} ${n(x + 2.8)} ${n(y - h * 0.7)} Q${n(x + 1.2)} ${n(y - h * 0.6)} ${x} ${n(y - h * 0.8)} Z" fill="#7FC25A"/>`;

/** A small pillow at the end of a mat, its middle at (x, y). */
const pillow = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="0.9" fill="#E8D9B8" stroke="#B9A57E" stroke-width="0.3"/>`;

// Before you sleep. Suhayl said that Abu Salih used to tell us: when one of us goes to sleep, he should lie on his
// right side and say: O Allah, Lord of the heavens and Lord of the earth, ... Splitter of the grain and the date-stone,
// ... O Allah, You are the First, there is nothing before You; You are the Last, there is nothing after You; You are the
// Evident, there is nothing above You; You are the Innermost, there is nothing beyond You; settle our debt for us and
// free us from want. Abu Salih told it from Abu Hurairah, from the Prophet ﷺ (Sahih Muslim 2713). Nothing is drawn for
// Allah: at night, by a home with its window lit, the place of one going to sleep comes from the door to a mat, and lies
// at its right end, by the pillow; its voice speaks. Glints show over the sky and a soft glow over the land. A grain on
// the ground parts and a green shoot rises from it; a date-stone parts and a shoot rises. Three sparks of the du'a rise
// one after another. A small sack by the home with a grey ring of a debt: the grey ring goes; an empty dish: dates show
// on it, with glints, and a soft golden glow comes over the home.
function beforeYouSleep(): SignArt {
  const homeAt: [number, number] = [54, 96];
  const door: [number, number] = [52.2, 99.6];
  const lies: [number, number] = [90.6, 103.4];
  const grain: [number, number] = [116, 107];
  const stone: [number, number] = [128, 106.6];
  const sackAt: [number, number] = [70, 104.6];
  const dishAt: [number, number] = [38, 104.8];
  const parting = (side: -1 | 1, from: number, to: number) => track({ xy: [[from, 0, 0], [to, n(side * 0.9), 0]] });
  return {
    kind: "before-you-sleep",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [12, 14],
          [30, 40],
          [52, 18],
          [74, 44],
          [98, 12],
          [118, 38],
          [146, 18],
          [154, 46]
        ]),
        loop: { move: "twinkle", ms: 2400, low: 0.5 }
      },
      { name: "the moon", svg: crescent(130, 22, 4.4, 2.1, "#FFF3B8") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [18, 110],
          [64, 113],
          [104, 111],
          [148, 112]
        ])
      },
      { name: "the home", svg: home(homeAt[0], homeAt[1], 18, 12, "#8E7A66", "#7A6855", "#2A2238") },
      { name: "the home's window, lit", svg: litWindow(homeAt[0], homeAt[1], 12) },
      { name: "a mat for sleep", svg: mat(88, 105, 10) },
      { name: "the pillow, at the mat's right end", svg: pillow(93.6, 103.8) },
      {
        name: "the place of one going to sleep",
        svg: someone(lies[0], lies[1], 1.4, LIGHT),
        keys: track({
          opacity: [
            [0.025, 0],
            [0.03, 1]
          ],
          xy: [
            [0.03, n(door[0] - lies[0]), n(door[1] - lies[1])],
            [0.075, n(86 - lies[0]), n(102.8 - lies[1])],
            [0.15, n(86 - lies[0]), n(102.8 - lies[1])],
            [0.175, 0, 0]
          ]
        })
      },
      { name: "its voice: a du'a before sleep", svg: arcsLeft(n(lies[0] - 3), n(lies[1] - 4.2), LIGHT), keys: showAt(0.185, 0.195), loop: speaking },
      {
        name: "the skies: glints over them",
        svg: glints(
          [
            [22, 24],
            [44, 32],
            [66, 10],
            [86, 28],
            [110, 22],
            [140, 34]
          ],
          1,
          "#FFF3B8"
        ),
        keys: showAt(0.275, 0.29),
        loop: { move: "twinkle", ms: 1500, low: 0.4 }
      },
      { name: "the earth: a soft light over the land", svg: `<rect y="62" width="160" height="58" fill="${LIGHT}" opacity="0.07"/>`, keys: showAt(0.3, 0.315) },
      { name: "a grain: one half", svg: grainHalf(grain[0], grain[1], -1), keys: parting(-1, 0.4, 0.415) },
      { name: "a grain: the other half", svg: grainHalf(grain[0], grain[1], 1), keys: parting(1, 0.4, 0.415) },
      { name: "the grain, split: a green shoot", svg: shoot(grain[0], n(grain[1] - 0.6), 5), origin: { x: grain[0], y: grain[1] }, keys: { at: [0, 0.415, 0.435], scaleY: [0, 0, 1], opacity: [0, 0, 1] } },
      { name: "a date-stone: one half", svg: stoneHalf(stone[0], stone[1], -1), keys: parting(-1, 0.435, 0.45) },
      { name: "a date-stone: the other half", svg: stoneHalf(stone[0], stone[1], 1), keys: parting(1, 0.435, 0.45) },
      { name: "the date-stone, split: a green shoot", svg: shoot(stone[0], n(stone[1] - 0.6), 6), origin: { x: stone[0], y: stone[1] }, keys: { at: [0, 0.45, 0.465], scaleY: [0, 0, 1], opacity: [0, 0, 1] } },
      ...[
        [0.525, 0.585],
        [0.65, 0.71],
        [0.775, 0.835]
      ].map(([a, b], i): SignPart => ({ name: `the du'a: a spark rising ${i + 1}`, svg: sparkle(n(lies[0] - 1), n(lies[1] - 5), 1.6, "#FFE7A0"), keys: sparkRising(a, b, 16), loop: { move: "twinkle", ms: 900, low: 0.5 } })),
      { name: "a debt: a small sack by the home", svg: sack(sackAt[0], sackAt[1], 0.7) },
      { name: "a debt: a grey ring about the sack", svg: greyRing(sackAt[0], n(sackAt[1] - 2), 4, 3.6), keys: track({ opacity: [[0.9, 1], [0.915, 0]] }) },
      { name: "want: an empty dish by the home", svg: dish(dishAt[0], dishAt[1]) },
      { name: "free from want: food on the dish", svg: food(dishAt[0], dishAt[1]), keys: showAt(0.92, 0.935) },
      {
        name: "free from want: glints over the dish",
        svg: glints([
          [35.6, 100],
          [40.6, 99.6]
        ]),
        keys: showAt(0.935, 0.945),
        loop: { move: "twinkle", ms: 1300, low: 0.5 }
      },
      { name: "a soft golden glow over the home", svg: wash(homeAt[0], 92, 20, 10, WARM, 0.1), keys: showAt(0.945, 0.955) }
    ],
    words: [
      { text: "When one of us goes to sleep", from: 0.02, to: 0.13 },
      { text: "lie on the right side, then say", from: 0.145, to: 0.255 },
      { text: "O Allah, Lord of the heavens and earth", from: 0.27, to: 0.38 },
      { text: "Splitter of the grain and the date-stone", from: 0.395, to: 0.505 },
      { text: "You are the First, nothing before You", from: 0.52, to: 0.63 },
      { text: "and the Last, nothing after You", from: 0.645, to: 0.755 },
      { text: "You are the Evident and the Innermost", from: 0.77, to: 0.88 },
      { text: "Settle our debt, and free us from want", from: 0.895, to: 1 }
    ]
  };
}

// A secret not told. Umar ibn al-Khattab said: when Hafsah bint Umar had lost her husband, I met Uthman ibn Affan and
// offered him Hafsah. He said: I will think it over; and after some nights he said: it seems to me I should not marry at
// this time. Then I met Abu Bakr and said: if you wish, I will marry you to Hafsah. Abu Bakr was silent and gave me no
// answer, and I was angrier with him than with Uthman. After some nights the Messenger of Allah ﷺ asked for her hand,
// and I married her to him. Then Abu Bakr met me and said: perhaps you were angry with me? ... Nothing kept me from
// answering you but that I knew the Messenger of Allah ﷺ had spoken of her, and I would not tell his secret; had he
// left her, I would have accepted her (Sahih al-Bukhari 4005). No one is drawn: by the masjid of Madinah, his place, a
// golden ring; along the way, the homes of Umar, Uthman and Abu Bakr, and Hafsah's place by Umar's home. Umar's place
// goes to Uthman's, and its voice speaks; Uthman's voice answers, and Umar's place comes back. It goes to Abu Bakr's,
// and its voice speaks; a soft white ring comes about Abu Bakr's place, silent, and a grey ring about Umar's place as it
// goes home. His place comes to Umar's home and his voice speaks: a soft golden ring comes about Hafsah's place, and a
// warm glow about the home. Abu Bakr's place comes to Umar's, and its voice speaks; the grey ring goes. A faint golden
// line goes from his place to Abu Bakr's: he had spoken of her; a soft white veil comes about Abu Bakr's place, and a
// soft golden glow about them.
function aSecretNotTold(): SignArt {
  const his: [number, number] = [14, 100.6];
  const hisThere: [number, number] = [38, 101.4];
  const umar: [number, number] = [58, 102.6];
  const hafsah: [number, number] = [46.4, 103.6];
  const uthman: [number, number] = [106, 102.6];
  const abuBakr: [number, number] = [134, 102.6];
  const atUthman = n(uthman[0] - 7.4 - umar[0]);
  const atAbuBakr = n(abuBakr[0] - 7.4 - umar[0]);
  const umarWay: [number, number, number][] = [
    [0.025, 0, 0],
    [0.06, atUthman, 0],
    [0.175, atUthman, 0],
    [0.21, 0, 0],
    [0.275, 0, 0],
    [0.29, 20, 3.6],
    [0.305, n(atAbuBakr - 20), 3.6],
    [0.32, atAbuBakr, 0],
    [0.435, atAbuBakr, 0],
    [0.445, n(atAbuBakr - 20), 3.6],
    [0.455, 20, 3.6],
    [0.465, 0, 0]
  ];
  const abuBakrBy: [number, number] = [66, 102.6];
  const abuBakrWay: [number, number, number][] = [
    [0.65, 0, 0],
    [0.66, -10, 3.6],
    [0.685, n(abuBakrBy[0] - abuBakr[0] + 10), 3.6],
    [0.695, n(abuBakrBy[0] - abuBakr[0]), 0]
  ];
  return {
    kind: "a-secret-not-told",
    ms: 12000,
    parts: [
      ...daySky(130, 84, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: rowsLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [28, 93, 11],
        [84, 92.4, 12],
        [152, 93, 11]
      ]),
      { name: "Umar's home", svg: home(52, 95.4, 13, 9.5) },
      { name: "Uthman's home", svg: home(110, 95, 12, 9, "#CDA67A", "#B58F62") },
      { name: "Abu Bakr's home", svg: home(138, 95, 12, 9, "#D8B07C", "#C09868") },
      {
        name: "his place, a golden ring",
        svg: ring(his[0], his[1], 2.4, GOLD),
        keys: track({
          xy: [
            [0.525, 0, 0],
            [0.55, n(hisThere[0] - his[0]), n(hisThere[1] - his[1])]
          ]
        })
      },
      { name: "Hafsah's place", svg: someone(hafsah[0], hafsah[1], 1.3) },
      { name: "Uthman's place", svg: someone(uthman[0], uthman[1], 1.5) },
      { name: "Abu Bakr's place", svg: someone(abuBakr[0], abuBakr[1], 1.5), keys: track({ xy: abuBakrWay }) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.5), keys: track({ xy: umarWay }) },
      { name: "Umar's voice: I offered him Hafsah", svg: arcs(n(umar[0] + atUthman + 1.8), n(umar[1] - 3.4), VOICE), keys: showFor(0.065, 0.075, 0.145, 0.155), loop: speaking },
      { name: "Uthman's voice: not now", svg: arcsLeft(n(uthman[0] - 1.8), n(uthman[1] - 3.4), VOICE), keys: showFor(0.15, 0.16, 0.27, 0.28), loop: speaking },
      { name: "Umar's voice: I offered her to Abu Bakr", svg: arcs(n(umar[0] + atAbuBakr + 1.8), n(umar[1] - 3.4), VOICE), keys: showFor(0.322, 0.332, 0.395, 0.405), loop: speaking },
      { name: "silent: a soft white ring about Abu Bakr's place", svg: care(abuBakr[0], n(abuBakr[1] + 0.5), 3.2, 1.7, "#FFFFFF"), keys: showFor(0.4, 0.41, 0.645, 0.65), loop: soft },
      {
        name: "angrier: a grey ring about Umar's place",
        svg: greyRing(umar[0], n(umar[1] + 0.5), 3.2, 1.7),
        keys: track({
          xy: umarWay,
          opacity: [
            [0.42, 0],
            [0.43, 1],
            [0.78, 1],
            [0.79, 0]
          ]
        })
      },
      { name: "his voice: asking to marry her", svg: arcs(n(hisThere[0] + 2.4), n(hisThere[1] - 3.6), GOLD), keys: showFor(0.555, 0.565, 0.645, 0.655), loop: speaking },
      { name: "married to him: a soft golden ring about Hafsah's place", svg: care(hafsah[0], n(hafsah[1] + 0.4), 2.8, 1.5, SOFT_GOLD), keys: showAt(0.57, 0.58), loop: soft },
      { name: "married: a warm glow about Umar's home", svg: glow(52, 92, 9, WARM, 0.25), keys: showAt(0.58, 0.59) },
      { name: "Abu Bakr's voice: perhaps you were angry", svg: arcsLeft(n(abuBakrBy[0] - 1.8), n(abuBakrBy[1] - 3.4), VOICE), keys: showAt(0.7, 0.71), loop: speaking },
      { name: "he had spoken of her: a faint golden line from his place to Abu Bakr's place", svg: lookLine(40.6, 100.4, 64.4, 101.6, 93), keys: showAt(0.9, 0.91) },
      { name: "kept his secret: a soft white veil about Abu Bakr's place", svg: wash(abuBakrBy[0], n(abuBakrBy[1] - 0.4), 5, 3.4, "#FFFFFF", 0.22), keys: showAt(0.915, 0.93) },
      { name: "a soft golden glow about them", svg: wash(52, 102, 18, 6, WARM, 0.1), keys: showAt(0.935, 0.95) }
    ],
    words: [
      { text: "Umar: I met Uthman and offered him Hafsah", from: 0.02, to: 0.13 },
      { text: "Uthman said: I will not marry now", from: 0.145, to: 0.255 },
      { text: "Then I offered her to Abu Bakr", from: 0.27, to: 0.38 },
      { text: "Abu Bakr was silent; I was angrier", from: 0.395, to: 0.505 },
      { text: "He asked for her; I married her to him", from: 0.52, to: 0.63 },
      { text: "Abu Bakr: perhaps you were angry with me", from: 0.645, to: 0.755 },
      { text: "Nothing held me back but that I knew", from: 0.77, to: 0.88 },
      { text: "he had spoken of her; I kept his secret", from: 0.895, to: 1 }
    ]
  };
}

export const ROWS_ART = {
  "close-in-the-rows": closeInTheRows,
  "zayd-was-truthful": zaydWasTruthful,
  "this-is-my-sunnah": thisIsMySunnah,
  "not-home-at-night": notHomeAtNight,
  "a-charity-for-travellers": aCharityForTravellers,
  "before-you-sleep": beforeYouSleep,
  "a-secret-not-told": aSecretNotTold
};
