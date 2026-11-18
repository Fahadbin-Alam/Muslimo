import { camelAt, cloud, glow, n, palm, sky, stars, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { cover, crooked, GREY, prayerMat } from "./lovedArt";
import { dish, roundTree } from "./worthArt";
import { food, ledge } from "./hopeArt";
import { risingSparks } from "./charityArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * What the Prophet ﷺ taught, drawn as the scenes of treasures and trusts are (treasureArt.ts): the day Jibril came in
 * very white clothes to ask about Islam, iman, ihsan and the Hour, and to teach the religion; Asma keeping ties with
 * her mother who was not Muslim; the fast and the night prayer of Dawud, the best of them; the prophets as brothers of
 * one father, whose religion is one; all of his ummah entering Paradise but whoever refuses; the mother of Abu
 * Hurairah guided at her door; and the prayer he made short for a child's crying. Only the land, the sky, buildings,
 * things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a
 * face, and no angel: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle,
 * and a voice is arcs in the air; the one who came in very white clothes is only a white light. Nothing is drawn for
 * Allah and nothing comes down from the sky: a du'a or a good deed is sparks rising, what He gives is a warm glow, and
 * Paradise is a light far off, gardens and an open gate, with no sun.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A tear, a small drop, its middle at (x, y). */
const tear = (x: number, y: number, fill = "#6FAED3") =>
  `<path d="M${x} ${n(y - 1.3)} Q${n(x + 0.9)} ${n(y + 0.1)} ${x} ${n(y + 0.8)} Q${n(x - 0.9)} ${n(y + 0.1)} ${x} ${n(y - 1.3)} Z" fill="${fill}"/>`;

/** A crooked grey way from (x1, y1) to (x2, y2): dashes going to and fro, off the straight way. */
function crookedWay(x1: number, y1: number, x2: number, y2: number, steps = 6) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const [px, py] = [-(y2 - y1) / length, (x2 - x1) / length];
  let d = `M${x1} ${y1}`;
  for (let i = 1; i <= steps; i += 1) {
    const off = i === steps ? 0 : i % 2 ? 1.6 : -1.6;
    d += ` L${n(x1 + ((x2 - x1) * i) / steps + px * off)} ${n(y1 + ((y2 - y1) * i) / steps + py * off)}`;
  }
  return `<path d="${d}" stroke="${GREY}" stroke-width="0.9" stroke-dasharray="1.6 1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** A tall building of many floors, its foot's middle at (x, y), `w` wide and `h` high, with rows of windows. */
function tallBuilding(x: number, y: number, w: number, h: number, wall: string) {
  const l = n(x - w / 2);
  let windows = "";
  for (let yy = y - h + 3; yy < y - 3; yy += 4.4) {
    windows += `<rect x="${n(x - w / 2 + 1.6)}" y="${n(yy)}" width="1.8" height="2" fill="#5A4632"/><rect x="${n(x + w / 2 - 3.4)}" y="${n(yy)}" width="1.8" height="2" fill="#5A4632"/>`;
  }
  return (
    `<rect x="${l}" y="${n(y - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<rect x="${n(x + w * 0.1)}" y="${n(y - h)}" width="${n(w * 0.4)}" height="${h}" fill="#000000" opacity="0.1"/>` +
    `<rect x="${n(l - 0.6)}" y="${n(y - h - 1.2)}" width="${n(w + 1.2)}" height="1.4" fill="#F2E6CC"/>${windows}`
  );
}

/** A night: a dark disc with a thin crescent in it, its middle at (x, y). */
const nightDisc = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#22345C"/>${crescent(n(x + 0.5), y, 1.8, 0.9, "#FFF3C0")}`;

/** A gate of Paradise, standing open: two golden posts and an arch over them, its foot's middle at (x, y). */
const gate = (x: number, y: number) =>
  `<path d="M${n(x - 5.4)} ${y} L${n(x - 5.4)} ${n(y - 6)} Q${x} ${n(y - 12)} ${n(x + 5.4)} ${n(y - 6)} L${n(x + 5.4)} ${y}" stroke="${GOLD}" stroke-width="1.3" fill="none"/>` +
  `<path d="M${n(x - 3.8)} ${y} L${n(x - 3.8)} ${n(y - 5.4)} Q${x} ${n(y - 9.8)} ${n(x + 3.8)} ${n(y - 5.4)} L${n(x + 3.8)} ${y} Z" fill="#FFF6D6" opacity="0.75"/>`;

/** The garden of Paradise far off, in a soft light with no sun: a ledge with trees, its middle at (x, y). */
const gardenFarOff = (x: number, y: number) =>
  glow(x, n(y - 10), 16, "#FFF3C0", 0.26) + wash(x, n(y - 6), 20, 6, "#FFFBEA", 0.14) + ledge(x, y, 22) + roundTree(n(x - 20), n(y - 0.4), 7, "#5FA344") + roundTree(n(x + 20), n(y - 0.4), 7, "#5FA344");

// The day Jibril came to teach. Umar said: one day, as we sat with the Messenger of Allah ﷺ, a man came upon us in very
// white clothes, with no trace of travel on him, and none of us knew him. He said: tell me of Islam; then: tell me of
// iman; then: tell me of ihsan; and he ﷺ said: ihsan is to worship Allah as if you see Him, and if you do not see Him,
// He sees you. He asked about the Hour, and he ﷺ said: the one asked about it knows no more than the one asking; and he
// told him of its signs: the herders competing in tall buildings. Then he turned away, and he ﷺ said: bring him back;
// but they saw nothing. He ﷺ said: that was Jibril, who came to teach you your religion (Sahih al-Bukhari 50, Sahih
// Muslim 8a). Nothing is drawn for Allah, no angel is drawn, and no one is drawn: by the masjid, his place is a golden
// ring and those with him are small dashed circles; the one who came is only a white light, coming along a white dashed
// way; his question is a voice, and three small lights show for what he asked of; a prayer mat with a place on it, and
// a warm glow on it; a dimness over it, and still a soft ring of light about it, for He sees; a mist far off, for when
// the Hour is; camels and their herders, and tall buildings rising, each over the last; the white light goes, ways go
// out and find nothing; and last, a warm glow on those with him, and what he came to teach rises.
function cameToTeach(): SignArt {
  const ringAt: [number, number] = [88, 98.6];
  const white: [number, number] = [112, 96.4];
  const withHim: [number, number][] = [
    [66, 94.6],
    [74, 100.4],
    [78, 106.4],
    [90, 107],
    [102, 106.6]
  ];
  const lights: [string, number, number, number][] = [
    ["Islam", 76, 82, 0.16],
    ["iman", 88, 78, 0.18],
    ["ihsan", 100, 82, 0.2]
  ];
  const coming = {
    opacity: [
      [0.03, 0],
      [0.035, 1],
      [0.8, 1],
      [0.81, 0]
    ] as [number, number][],
    xy: [
      [0.03, 52, 0],
      [0.09, 0, 0],
      [0.77, 0, 0],
      [0.8, 60, 0]
    ] as [number, number, number][]
  };
  const towers: [number, number, number, string, number][] = [
    [12, 9, 22, "#D9B98C", 0.665],
    [26, 10, 28, "#CFAE80", 0.68],
    [41, 11, 34, "#C9A274", 0.695]
  ];
  return {
    kind: "came-to-teach",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(22, 18) },
      { name: "clouds", svg: cloud(64, 22, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(116, 77, 0.5) },
      { name: "a palm by the masjid", svg: palm(148, 80, 15), origin: { x: 148, y: 80 }, loop: { move: "sway", ms: 4200, angle: 2 } },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      ...withHim.map(([x, y], i): SignPart => ({ name: `a place of those with him ${i + 1}`, svg: someone(x, y) })),
      {
        name: "a white dashed way, the one in white coming",
        svg: way(`M158 97.4 L${white[0] + 4} 96.8`, "#FFFFFF", 0.9),
        origin: { x: 158, y: 97.4 },
        keys: track({
          opacity: coming.opacity,
          scaleX: [
            [0.03, 0.02],
            [0.09, 1]
          ]
        })
      },
      {
        name: "the one who came, in very white: a white light",
        svg: glow(white[0], white[1], 6.4, "#FFFFFF", 0.42) + sparkle(white[0], white[1], 1.8, "#FFFFFF") + `<circle cx="${white[0]}" cy="${white[1]}" r="2.6" stroke="#E6ECF2" stroke-width="0.4" fill="none"/>`,
        keys: track(coming),
        loop: { move: "twinkle", ms: 1400, low: 0.75 }
      },
      { name: "a voice asking: tell me of them", svg: arcsLeft(white[0] - 3.6, 93.6, VOICE), keys: showWhile(0.145, 0.155, 0.27, 0.28), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "his voice, answering", svg: arcs(ringAt[0] + 3.8, 100.8, VOICE), keys: showWhile(0.18, 0.19, 0.76, 0.77), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      ...lights.map(
        ([what, x, y, at], i): SignPart => ({
          name: `${what}, a small light`,
          svg: glow(x, y, 3.6, WARM, 0.32) + sparkle(x, y, 1.6, SPARK),
          origin: { x, y },
          keys:
            i === 2
              ? track({
                  opacity: [
                    [at, 0],
                    [at + 0.01, 1]
                  ],
                  scale: [
                    [0.28, 1],
                    [0.31, 1.5]
                  ]
                })
              : showFrom(at, at3(at + 0.01)),
          loop: { move: "twinkle", ms: 1300, low: 0.6, phase: i / 3 }
        })
      ),
      { name: "a prayer mat", svg: prayerMat(30, 101), keys: showFrom(0.275, 0.29) },
      { name: "a place at prayer on it", svg: someone(30, 99.2), keys: showFrom(0.28, 0.295) },
      { name: "a warm glow over the prayer", svg: glow(30, 98.6, 9, WARM, 0.22), keys: showFrom(0.3, 0.32), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      ...risingSparks("the prayer, rising", [[31, 94]], 0.3, 0, { stay: true, rise: 9 }),
      { name: "a dimness over it: you do not see", svg: wash(30, 99, 26, 13, "#6E7090", 0.05), keys: showWhile(0.405, 0.44, 0.52, 0.55) },
      {
        name: "yet it is seen: a soft ring of light about it",
        svg: `<circle cx="30" cy="99" r="6.4" stroke="${WARM}" stroke-width="0.9" fill="none"/><circle cx="30" cy="99" r="7.6" stroke="#FFF3C0" stroke-width="0.5" fill="none" opacity="0.7"/>`,
        origin: { x: 30, y: 99 },
        keys: track({
          opacity: [
            [0.44, 0],
            [0.45, 1]
          ],
          scale: [
            [0.44, 0.5],
            [0.47, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1500, low: 0.6 }
      },
      { name: "the voice asking again: when is the Hour", svg: arcsLeft(white[0] - 3.6, 93.6, VOICE), keys: showWhile(0.525, 0.535, 0.64, 0.65), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a mist far off: when it is, unknown", svg: wash(80, 57, 84, 9, "#F4F1EA", 0.24), keys: showFrom(0.53, 0.56), loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      { name: "camels of the herders", svg: camelAt(48, 62.6, 0.14) + camelAt(60, 64.2, 0.13), keys: showFrom(0.645, 0.66), origin: { x: 60, y: 74 }, loop: { move: "bob", ms: 1600, y: -0.3 } },
      { name: "the herders' places, by the buildings", svg: someone(19, 76.6, 1.3) + someone(34, 77.4, 1.3), keys: showFrom(0.65, 0.665) },
      ...towers.map(
        ([x, w, h, wall, at], i): SignPart => ({
          name: `a tall building, rising over the last ${i + 1}`,
          svg: tallBuilding(x, 74, w, h, wall),
          origin: { x, y: 74 },
          keys: track({
            opacity: [
              [at, 0],
              [at + 0.005, 1]
            ],
            scaleY: [
              [at, 0.05],
              [at + 0.02, 1]
            ]
          })
        })
      ),
      { name: "his voice: bring him back", svg: arcs(ringAt[0] + 3.8, 95.6, VOICE), keys: showWhile(0.775, 0.785, 0.88, 0.89), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...[
        `M80 104.6 Q116 112 152 106`,
        `M104 104.4 Q130 99 154 95`
      ].map((d, i): SignPart => ({ name: `a way going out, seeing nothing ${i + 1}`, svg: way(d, VOICE, 0.8), keys: showWhile(0.79, 0.81, 0.825, 0.835) })),
      {
        name: "a warm glow on those with him",
        svg: withHim.map(([x, y]) => glow(x, y, 4.4, WARM, 0.3)).join("") + glow(ringAt[0], ringAt[1], 5, WARM, 0.3),
        keys: showFrom(0.89, 0.93),
        loop: { move: "twinkle", ms: 1500, low: 0.7 }
      },
      ...risingSparks(
        "what he came to teach, rising",
        lights.map(([, x, y]): [number, number] => [x, y - 2]),
        0.89,
        0.01,
        { stay: true, rise: 18 }
      ),
      { name: "a warm light over the gathering", svg: wash(ringAt[0], 101, 32, 10, WARM, 0.12), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "One came to him, in very white clothes", from: 0.02, to: 0.125 },
      { text: "The man: Tell me of Islam, iman, ihsan", from: 0.14, to: 0.25 },
      { text: "Ihsan: worship Allah as if you see Him", from: 0.27, to: 0.38 },
      { text: "And if you do not see Him, He sees you", from: 0.4, to: 0.505 },
      { text: "The one asked knows no more than the asker", from: 0.52, to: 0.625 },
      { text: "When herders compete in tall buildings", from: 0.64, to: 0.745 },
      { text: "Bring the man back! But they saw nothing", from: 0.76, to: 0.865 },
      { text: "Jibril came to teach you your religion", from: 0.88, to: 1 }
    ]
  };
}

// Keeping ties with a mother who was not Muslim. Asma bint Abi Bakr said: my mother came to me, hoping for my kindness,
// in the time of the Messenger of Allah ﷺ, and she was a polytheist. I asked the Messenger of Allah ﷺ: shall I keep
// ties with my mother? He ﷺ said: yes, keep ties with your mother (Sahih al-Bukhari 2620, 5978). No one is drawn: her
// mother's place comes along a dashed way to her home, a soft glow of hope with it; a grey shade lies between them;
// her place goes to the golden ring by the masjid, and her voice asks; his voice answers; she goes back, the grey
// between them lifts, a golden way joins them, a warm glow comes on both, and a gift goes to her mother.
function keepTies(): SignArt {
  const start: [number, number] = [8, 103];
  const hers: [number, number] = [69, 103];
  const ringAt: [number, number] = [131, 107.2];
  const walk: [number, number, number][] = [
    [0.04, 0, 0],
    [0.18, 42, 0]
  ];
  const mother = start[0] + 42;
  const there: [number, number, number][] = [
    [0.53, 0, 0],
    [0.6, 47, 3.4],
    [0.8, 47, 3.4],
    [0.86, 0, 0]
  ];
  return {
    kind: "keep-ties",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "clouds", svg: cloud(70, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms of Madinah", svg: palm(14, 82, 15) + palm(152, 90, 16), origin: { x: 80, y: 90 }, loop: { move: "sway", ms: 4400, angle: 1 } },
      { name: "the masjid", svg: madinahMasjid(112, 104, 0.7) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "her home", svg: home(76, 102, 22, 15) },
      {
        name: "a dashed way, coming to her home",
        svg: way(`M${start[0]} 106.4 L${mother} 106.4`, "#A07A4A", 0.9),
        origin: { x: start[0], y: 106.4 },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1]
          ],
          scaleX: [
            [0.04, 0.02],
            [0.18, 1]
          ]
        })
      },
      { name: "a place coming, hoping", svg: someone(start[0], start[1], 1.6), keys: track({ xy: walk }) },
      {
        name: "hoping: a soft glow with it",
        svg: glow(start[0], start[1], 5, WARM, 0.26),
        keys: track({
          opacity: [
            [0.06, 0],
            [0.08, 1]
          ],
          xy: walk
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      },
      { name: "a grey shade between them", svg: wash(n((mother + hers[0]) / 2), 101.6, 8, 5, GREY, 0.16), keys: showWhile(0.28, 0.32, 0.85, 0.88) },
      {
        name: "her way to his place",
        svg: way(`M${hers[0] + 2} 106.4 L${hers[0] + 44.6} 108.4`, "#A07A4A", 0.9),
        origin: { x: hers[0] + 2, y: 106.4 },
        keys: track({
          opacity: [
            [0.53, 0],
            [0.535, 1],
            [0.86, 1],
            [0.87, 0]
          ],
          scaleX: [
            [0.53, 0.02],
            [0.6, 1]
          ]
        })
      },
      { name: "her place", svg: someone(hers[0], hers[1], 1.6), keys: track({ xy: there }) },
      { name: "her voice: shall I keep ties with her", svg: arcs(hers[0] + 49.4, 104.4, VOICE), keys: showWhile(0.6, 0.61, 0.76, 0.77), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "his voice: yes, keep ties", svg: arcsLeft(ringAt[0] - 4.4, 104.4, VOICE), keys: showWhile(0.77, 0.78, 0.86, 0.87), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a golden way joining them", svg: way(`M${mother + 2} 106 Q${n((mother + hers[0]) / 2)} 110 ${hers[0] - 2} 106`, GOLD), keys: showFrom(0.87, 0.9) },
      { name: "a warm glow on both", svg: glow(mother, start[1], 5, WARM, 0.3) + glow(hers[0], hers[1], 5, WARM, 0.3), keys: showFrom(0.89, 0.93), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "a gift, kindly given",
        svg: sack(hers[0] - 3, 105, 0.55, "#C9A66B"),
        keys: track({
          opacity: [
            [0.9, 0],
            [0.905, 1]
          ],
          xy: [
            [0.905, 0, 0],
            [0.95, -12.4, 0]
          ]
        })
      }
    ],
    words: [
      { text: "Asma: My mother came to me, hoping", from: 0.02, to: 0.24 },
      { text: "She was a polytheist", from: 0.26, to: 0.5 },
      { text: "I asked: shall I keep ties with her?", from: 0.52, to: 0.74 },
      { text: "Yes, keep ties with your mother", from: 0.76, to: 1 }
    ]
  };
}

// The fast of Dawud. Abdullah ibn Amr said he would fast every day and pray all night as long as he lived. The Prophet
// ﷺ said: you cannot do that; fast and break your fast, pray and sleep; and at the last: fast one day and break your
// fast one day: that is the fast of Dawud, and it is the best fast (Sahih al-Bukhari 1976). And: the prayer most
// beloved to Allah is the prayer of Dawud, and the fast most beloved to Allah is the fast of Dawud: he slept half the
// night, prayed a third of it and slept a sixth (Sahih al-Bukhari 1131). Nothing is drawn for Allah, and no one is
// drawn: by his home, a small dashed circle and his voice; eight days in a row, each a dish under the night above it;
// covers come on every dish and a light on every night; by the golden ring, his voice; a grey weariness, then food on
// every other dish and every other night dark; the fasting days glow, and a golden line goes about the row, the best
// fast; then night comes, stars, and a long bar of the night: half of it asleep, a third of it at prayer, sparks
// rising, and a sixth asleep, as the moon goes over; and last, the dawn.
function fastOfDawud(): SignArt {
  const days = [44, 57, 70, 83, 96, 109, 122, 135];
  const fasting = (i: number) => i % 2 === 0;
  const bar = { x: 20, y: 38, w: 120, h: 10 };
  const piece = (i: number, fill: string) => `<rect x="${bar.x + i * 20}" y="${bar.y}" width="20" height="${bar.h}" fill="${fill}"/>`;
  const asleep = (i: number) => piece(i, "#3B5488") + crescent(bar.x + i * 20 + 10.6, bar.y + 5, 2.2, 1.1, "#FFF3C0");
  const atPrayer = (i: number) => piece(i, "#E8B84A") + sparkle(bar.x + i * 20 + 10, bar.y + 5, 2, "#FFF6D6");
  const nightStars: [number, number][] = [
    [10, 10],
    [30, 22],
    [52, 8],
    [74, 18],
    [96, 6],
    [118, 16],
    [140, 8],
    [152, 24],
    [8, 30],
    [64, 30],
    [106, 28],
    [146, 54],
    [12, 56]
  ];
  return {
    kind: "fast-of-dawud",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(20, 18) },
      { name: "clouds", svg: cloud(84, 20, 0.3, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his home", svg: home(16, 104, 18, 13) },
      { name: "his place by his home", svg: someone(30, 104.4) },
      { name: "a golden ring, his place", svg: ring(148, 104.6, 3.2, GOLD) },
      ...days.map((x, i): SignPart => ({ name: `a day ${i + 1}`, svg: dish(x, 94) })),
      ...days.map((x, i): SignPart => ({ name: `its night ${i + 1}`, svg: nightDisc(x, 82) })),
      { name: "his voice: I will fast all day, pray all night", svg: arcs(32.4, 101.4, VOICE), keys: showWhile(0.025, 0.035, 0.14, 0.15), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...days.map((x, i): SignPart => {
        const from = at3(0.03 + i * 0.007);
        return {
          name: `fasting: a cover on the day ${i + 1}`,
          svg: cover(x, 93),
          keys: fasting(i) ? showFrom(from, at3(from + 0.01)) : { at: [0, from, at3(from + 0.01), 0.2, 0.215], opacity: [0, 0, 1, 1, 0] }
        };
      }),
      ...days.map((x, i): SignPart => {
        const from = at3(0.035 + i * 0.006);
        return {
          name: `at prayer: a light on the night ${i + 1}`,
          svg: glow(x, 82, 4.6, WARM, 0.34) + sparkle(x, 78.4, 1.2, SPARK),
          keys: fasting(i) ? showFrom(from, at3(from + 0.01)) : { at: [0, from, at3(from + 0.01), 0.22, 0.235], opacity: [0, 0, 1, 1, 0] }
        };
      }),
      { name: "his voice: you cannot", svg: arcsLeft(144.4, 101.6, VOICE), keys: showFrom(0.145, 0.155), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "a grey weariness on the one who vowed", svg: wash(30, 101, 10, 7, GREY, 0.16), keys: showWhile(0.165, 0.185, 0.24, 0.26) },
      ...days.filter((_, i) => !fasting(i)).map((x, j): SignPart => ({ name: `eating: food on the day ${2 * j + 2}`, svg: food(x, 94), keys: showFrom(0.205, 0.22) })),
      ...days
        .filter((_, i) => fasting(i))
        .map((x, j): SignPart => {
          const from = at3(0.325 + j * 0.012);
          return { name: `a fasting day, glowing ${j + 1}`, svg: glow(x, 92, 6, WARM, 0.26), keys: showFrom(from, at3(from + 0.01)), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: j / 4 } };
        }),
      {
        name: "the best fast: a golden line about the days",
        svg: `<rect x="36" y="75.6" width="107" height="22.4" rx="3" stroke="${GOLD}" stroke-width="0.9" stroke-dasharray="2 1.6" fill="none"/>`,
        keys: showFrom(0.445, 0.47)
      },
      { name: "a warm light over the days", svg: wash(89.5, 88, 58, 13, WARM, 0.08), keys: showFrom(0.45, 0.48), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "the best, shining", svg: sparkle(89.5, 71.4, 2.2, SPARK) + sparkle(80, 72.6, 1.2, "#FFFFFF") + sparkle(99, 72.6, 1.2, "#FFFFFF"), keys: showFrom(0.47, 0.5), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      {
        name: "night comes",
        svg: `<rect width="160" height="61" fill="#0F1C3A" opacity="0.88"/><rect y="61" width="160" height="59" fill="#0F1C3A" opacity="0.42"/>`,
        keys: track({
          opacity: [
            [0.565, 0],
            [0.6, 1],
            [0.9, 1],
            [0.95, 0.55]
          ]
        })
      },
      { name: "stars", svg: stars(nightStars), keys: showFrom(0.585, 0.6), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      {
        name: "the night, a long bar in six",
        svg:
          `<rect x="${bar.x}" y="${bar.y}" width="${bar.w}" height="${bar.h}" rx="1.4" fill="#16284C" stroke="#E8DCC0" stroke-width="0.6"/>` +
          [1, 2, 3, 4, 5].map((i) => `<path d="M${bar.x + i * 20} ${bar.y} L${bar.x + i * 20} ${bar.y + bar.h}" stroke="#E8DCC0" stroke-width="0.4" stroke-dasharray="1 1"/>`).join(""),
        keys: showFrom(0.6, 0.62)
      },
      {
        name: "the moon going over",
        svg: crescent(bar.x, 28, 3.2, 1.6, "#FFF3C0") + glow(bar.x, 28, 6, "#FFF3C0", 0.12),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.615, 1]
          ],
          xy: [
            [0.69, 0, 0],
            [0.735, 60, 0],
            [0.765, 100, 0],
            [0.85, 100, 0],
            [0.865, 120, 0]
          ]
        })
      },
      ...[0, 1, 2].map((i): SignPart => ({ name: `half the night, asleep ${i + 1}`, svg: asleep(i), keys: showFrom(at3(0.69 + i * 0.015), at3(0.705 + i * 0.015)) })),
      ...[3, 4].map((i): SignPart => ({ name: `a third of it, at prayer ${i - 2}`, svg: atPrayer(i), keys: showFrom(at3(0.735 + (i - 3) * 0.015), at3(0.75 + (i - 3) * 0.015)) })),
      ...[3, 4].map((i, j): SignPart => {
        const from = at3(0.74 + j * 0.015);
        return {
          name: `the night prayer, rising ${j + 1}`,
          svg: sparkle(bar.x + i * 20 + 10, bar.y - 1, j ? 1.6 : 2, "#FFE7A0"),
          keys: { at: [0, from, at3(from + 0.006), at3(from + 0.03)], opacity: [0, 0, 1, 1], y: [0, 0, -2, -12] },
          loop: { move: "twinkle", ms: 1000, low: 0.5, phase: j / 2 }
        };
      }),
      { name: "a sixth of it, asleep", svg: asleep(5), keys: showFrom(0.85, 0.865) },
      { name: "the dawn", svg: glow(150, 64, 16, "#FFD9A0", 0.16) + wash(124, 61, 40, 5, "#FFE9C4", 0.18), keys: showFrom(0.88, 0.92) }
    ],
    words: [
      { text: "Abdullah: I'll fast by day, pray all night", from: 0.02, to: 0.125 },
      { text: "You cannot. Fast and eat, pray and sleep", from: 0.14, to: 0.3 },
      { text: "Fast one day and eat the next", from: 0.32, to: 0.425 },
      { text: "That is the fast of Dawud, the best fast", from: 0.44, to: 0.54 },
      { text: "Most beloved to Allah is Dawud's prayer", from: 0.56, to: 0.665 },
      { text: "Dawud slept half the night, prayed a third", from: 0.68, to: 0.82 },
      { text: "And slept a sixth of it", from: 0.84, to: 1 }
    ]
  };
}

// One religion. The Prophet ﷺ said: I am the nearest of all people to Isa son of Maryam, in this world and in the
// Hereafter; the prophets are brothers of one father: their mothers are different, and their religion is one (Sahih
// al-Bukhari 3443). Nothing is drawn for Allah, and no one is drawn: along the long way of the ages, his place is a
// golden ring and the place just before his, the nearest, a ring with a short golden way between them; a warm light on
// the land, and a light far off for the Hereafter, sparks rising to it from both; the earlier rings, one after another,
// and one golden thread through them all; a home of its own behind each, each a different color; and last, one light
// goes along the thread, a glow comes on each ring as it passes, and a warm light is over them all.
function oneReligion(): SignArt {
  const y = 98;
  const before = [16, 34, 52, 70, 88];
  const nearest = 112;
  const his = 134;
  const all = [...before, nearest, his];
  const walls = ["#D98C6A", "#8FB5D6", "#B9D28A", "#E6C27A", "#C9A0D6", "#E8A0A8", "#9FD0C2"];
  const passing = (x: number) => at3(0.76 + ((x - 16) / 118) * 0.1);
  return {
    kind: "one-religion",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(22, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms", svg: palm(30, 74, 12) + palm(76, 72, 11), origin: { x: 53, y: 74 }, loop: { move: "sway", ms: 4600, angle: 1 } },
      { name: "the long way of the ages", svg: way(`M6 ${y} L154 ${y}`, "#A07A4A", 0.8) },
      { name: "a golden ring, his place", svg: ring(his, y, 4, GOLD) + glow(his, y, 6, WARM, 0.2) },
      { name: "the ring just before his, the nearest", svg: ring(nearest, y, 4, "#A0763C"), keys: showFrom(0.03, 0.05) },
      { name: "a short golden way between the two", svg: way(`M${nearest + 3} ${y - 3} Q${(nearest + his) / 2} ${y - 10} ${his - 3} ${y - 3}`, GOLD), keys: showFrom(0.06, 0.1) },
      { name: "in this world: a warm light on the land", svg: wash((nearest + his) / 2, y + 1, 22, 6, WARM, 0.14), keys: showFrom(0.2, 0.23), loop: { move: "twinkle", ms: 1700, low: 0.8 } },
      { name: "the Hereafter, gardens far off in a soft light", svg: gardenFarOff(123, 54), keys: showFrom(0.22, 0.25), loop: { move: "twinkle", ms: 1800, low: 0.85 } },
      ...risingSparks(
        "the two, together there",
        [
          [nearest, y - 6],
          [his, y - 6]
        ],
        0.235,
        0.01,
        { stay: true, rise: 36 }
      ),
      ...before.map((x, i): SignPart => {
        const from = at3(0.36 + i * 0.012);
        return { name: `an earlier ring, one after another ${i + 1}`, svg: ring(x, y, 4, "#A0763C"), keys: showFrom(from, at3(from + 0.01)) };
      }),
      {
        name: "one golden thread through them all",
        svg: `<path d="M${before[0]} ${y} L${his} ${y}" stroke="${GOLD}" stroke-width="0.9" stroke-linecap="round"/>`,
        origin: { x: before[0], y },
        keys: track({
          opacity: [
            [0.43, 0],
            [0.435, 1]
          ],
          scaleX: [
            [0.43, 0.02],
            [0.47, 1]
          ]
        })
      },
      ...all.map((x, i): SignPart => {
        const from = at3(0.53 + i * 0.02);
        return { name: `a home of its own behind each, each a different color ${i + 1}`, svg: home(x, 91.4, 12, 10, walls[i], "#B88E5E", "#6B4A2E"), keys: showFrom(from, at3(from + 0.01)) };
      }),
      {
        name: "one light along the thread",
        svg: glow(before[0], y, 5, WARM, 0.36) + sparkle(before[0], y, 2, SPARK),
        keys: track({
          opacity: [
            [0.755, 0],
            [0.76, 1]
          ],
          xy: [
            [0.76, 0, 0],
            [0.86, his - before[0], 0]
          ]
        }),
        loop: { move: "twinkle", ms: 900, low: 0.6 }
      },
      ...all.map((x, i): SignPart => ({ name: `a warm glow on each ring ${i + 1}`, svg: glow(x, y, 5.6, WARM, 0.3), keys: showFrom(passing(x), at3(passing(x) + 0.01)), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 7 } })),
      { name: "one religion: a warm light over them all", svg: wash(75, 93, 76, 13, WARM, 0.1), keys: showFrom(0.88, 0.93), loop: { move: "twinkle", ms: 2000, low: 0.8 } }
    ],
    words: [
      { text: "I am nearest of all to Isa son of Maryam", from: 0.02, to: 0.17 },
      { text: "In this world and in the Hereafter", from: 0.19, to: 0.33 },
      { text: "The prophets are brothers, of one father", from: 0.35, to: 0.5 },
      { text: "Their mothers are different", from: 0.52, to: 0.73 },
      { text: "And their religion is one", from: 0.75, to: 1 }
    ]
  };
}

// Whoever refuses. The Prophet ﷺ said: all my ummah will enter Paradise, except whoever refuses. They asked: O
// Messenger of Allah, and who would refuse? He ﷺ said: whoever obeys me enters Paradise, and whoever disobeys me has
// refused (Sahih al-Bukhari 7280). Nothing is drawn for Allah, and no one is drawn: from his golden ring a golden way
// goes up to the open gate of Paradise far off, gardens in a soft light with no sun; small dashed places go up it one
// after another and through the gate; one turns away along a crooked way, and greys; a voice asks from those with him;
// his voice answers, and one follows his way all the way in, and the gate glows; last, one goes partway, then turns
// off along a crooked way, and a grey shade is on it.
function whoRefuses(): SignArt {
  const ringAt: [number, number] = [12, 97];
  const p0: [number, number] = [26, 93.4];
  const up: [number, number][] = [
    [30.6, -7.2],
    [63.4, -19.1],
    [94, -37.4]
  ];
  const spots: [number, number][] = [
    [81, -40.2],
    [87.4, -41],
    [104.6, -41],
    [111, -40.2]
  ];
  const goingUp = (s: number, end: [number, number]): [number, number, number][] => [
    [s, 0, 0],
    [at3(s + 0.012), ...up[0]],
    [at3(s + 0.024), ...up[1]],
    [at3(s + 0.04), ...up[2]],
    [at3(s + 0.05), ...end]
  ];
  const withHim: [number, number][] = [
    [32, 99.4],
    [21, 104.6],
    [34.6, 105.4]
  ];
  return {
    kind: "who-refuses",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(20, 18) },
      { name: "clouds", svg: cloud(60, 24, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "Paradise far off, its gardens in a soft light", svg: gardenFarOff(122, 55), loop: { move: "twinkle", ms: 2200, low: 0.85 } },
      { name: "its gate, standing open", svg: gate(122, 55) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "his way, golden, up to the gate", svg: way(`M${p0[0]} ${p0[1]} C54 88 92 78 120 56`, GOLD, 1.1) },
      ...withHim.map(([x, y], i): SignPart => ({ name: `a place of those with him ${i + 1}`, svg: someone(x, y) })),
      ...spots.map((spot, i): SignPart => {
        const s = at3(0.03 + i * 0.02);
        return {
          name: `a place going up and in ${i + 1}`,
          svg: someone(p0[0], p0[1]),
          keys: track({
            opacity: [
              [s, 0],
              [at3(s + 0.005), 1]
            ],
            xy: goingUp(s, spot)
          })
        };
      }),
      { name: "a crooked way, turning away", svg: crookedWay(24, 91.6, 9.6, 83.4), keys: showFrom(0.2, 0.22) },
      {
        name: "one who turns away from it",
        svg: someone(p0[0], p0[1]),
        keys: track({
          opacity: [
            [0.195, 0],
            [0.2, 1],
            [0.27, 1],
            [0.28, 0]
          ],
          xy: [
            [0.21, 0, 0],
            [0.26, -18, -11.4]
          ]
        })
      },
      { name: "one who refused, grey", svg: someone(p0[0] - 18, p0[1] - 11.4, 1.5, GREY) + wash(p0[0] - 18, p0[1] - 11.4, 6, 4, GREY, 0.2), keys: showFrom(0.27, 0.29) },
      { name: "a voice from those with him: who would refuse", svg: arcsLeft(29.4, 97.8, VOICE), keys: showWhile(0.36, 0.37, 0.52, 0.53), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "his voice: whoever obeys me", svg: arcs(15.6, 94.4, VOICE), keys: showWhile(0.525, 0.535, 0.75, 0.76), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "one who follows his way, all the way in",
        svg: someone(p0[0], p0[1]),
        keys: track({
          opacity: [
            [0.545, 0],
            [0.55, 1]
          ],
          xy: [
            [0.55, 0, 0],
            [0.57, ...up[0]],
            [0.59, ...up[1]],
            [0.61, ...up[2]],
            [0.62, 96, -42]
          ]
        })
      },
      { name: "the gate, glowing", svg: glow(122, 49, 7, WARM, 0.34), keys: showFrom(0.62, 0.66), loop: { move: "twinkle", ms: 1300, low: 0.6 } },
      { name: "a crooked way, off his way", svg: crookedWay(75, 82.6, 99, 94.6), keys: showFrom(0.8, 0.82) },
      {
        name: "one who goes partway, then turns off",
        svg: someone(p0[0], p0[1]),
        keys: track({
          opacity: [
            [0.755, 0],
            [0.76, 1],
            [0.86, 1],
            [0.87, 0]
          ],
          xy: [
            [0.76, 0, 0],
            [0.775, ...up[0]],
            [0.79, 47, -12.5],
            [0.82, 47, -12.5],
            [0.86, 74, 2.6]
          ]
        })
      },
      { name: "a grey shade on it: it has refused", svg: someone(p0[0] + 74, p0[1] + 2.6, 1.5, GREY) + wash(p0[0] + 74, p0[1] + 2.6, 7, 4.4, GREY, 0.2), keys: showFrom(0.86, 0.89) }
    ],
    words: [
      { text: "All my ummah will enter Paradise", from: 0.02, to: 0.17 },
      { text: "Except whoever refuses", from: 0.19, to: 0.33 },
      { text: "They asked: who would refuse?", from: 0.35, to: 0.5 },
      { text: "Whoever obeys me enters Paradise", from: 0.52, to: 0.73 },
      { text: "Whoever disobeys me has refused", from: 0.75, to: 1 }
    ]
  };
}

// Guided at her door. Abu Hurairah said: I used to invite my mother to Islam, and she was a polytheist. One day I
// invited her, and she said to me about the Messenger of Allah ﷺ what I hated; I came to him weeping and asked him to
// pray for her, and he ﷺ said: O Allah, guide the mother of Abu Hurairah. I went out glad at his du'a; when I came to
// the door it was shut, and I heard the sound of water. She washed, dressed and opened the door, and said: I bear
// witness that there is no god but Allah, and that Muhammad is His servant and His Messenger. I went back to him
// weeping for joy, and asked him to pray that the believers love us, and he ﷺ said: O Allah, make this servant of
// Yours and his mother beloved to Your believing servants (Sahih Muslim 2491). Nothing is drawn for Allah, and no one
// is drawn: by her home, her place and his; his voice and a small warm light held out to her; her crooked voice, and
// she goes in and the door shuts; his place goes to the golden ring by the masjid with tears; sparks of the du'a rise;
// he hurries back, and the sound of water comes from within; the door opens, her place in the doorway, her voice, and
// a warm glow on her; he goes back with tears of joy; and last, the du'a rises again, warm glows come on the homes of
// Madinah, and golden ways go from them to her home and to him.
function guidedAtTheDoor(): SignArt {
  const ringAt: [number, number] = [127.2, 106.6];
  const hers: [number, number] = [36, 104.4];
  const his: [number, number] = [48, 104.4];
  const going: [number, number, number][] = [
    [0.205, 0, 0],
    [0.235, 72, 0],
    [0.44, 72, 0],
    [0.49, -4, 0],
    [0.72, -4, 0],
    [0.76, 72, 0]
  ];
  const homes: [number, number, number, number][] = [
    [54, 70, 10, 7],
    [70, 68.6, 9, 6.4],
    [86, 70, 10, 7]
  ];
  const door = `<path d="M26.4 104 L26.4 98.6 Q28.2 96.4 30 98.6 L30 104 Z" fill="#8A5A33"/><path d="M28.2 97.2 L28.2 104" stroke="#6E4524" stroke-width="0.35"/><circle cx="29.2" cy="101" r="0.35" fill="#E8C45A"/>`;
  return {
    kind: "guided-at-the-door",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(20, 18) },
      { name: "clouds", svg: cloud(64, 24, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "homes of Madinah", svg: homes.map(([x, y, w, h]) => home(x, y, w, h)).join("") },
      { name: "a palm by the masjid", svg: palm(152, 92, 16), origin: { x: 152, y: 92 }, loop: { move: "sway", ms: 4400, angle: 2 } },
      { name: "the masjid", svg: madinahMasjid(108, 104, 0.8) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "her home", svg: home(30, 104, 26, 18) },
      {
        name: "her door",
        svg: door,
        origin: { x: 26.4, y: 100 },
        keys: track({
          opacity: [
            [0.2, 0],
            [0.215, 1]
          ],
          scaleX: [
            [0.575, 1],
            [0.59, 0.16]
          ]
        })
      },
      {
        name: "her place",
        svg: someone(hers[0], hers[1], 1.6),
        keys: track({
          opacity: [
            [0.19, 1],
            [0.2, 0]
          ],
          xy: [
            [0.185, 0, 0],
            [0.198, -7.8, -1.6]
          ]
        })
      },
      { name: "his place", svg: someone(his[0], his[1], 1.6), keys: track({ xy: going }) },
      { name: "his voice: inviting her", svg: arcsLeft(45.4, 102, VOICE), keys: showWhile(0.03, 0.04, 0.15, 0.16), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a small warm light, held out to her", svg: glow(41.4, 95, 3, WARM, 0.34) + sparkle(41.4, 95, 1.2, SPARK), keys: showWhile(0.05, 0.07, 0.16, 0.17), loop: { move: "twinkle", ms: 1100, low: 0.6 } },
      { name: "her voice, saying what he hated", svg: crooked(38.4, 100.6), keys: showWhile(0.16, 0.17, 0.185, 0.195) },
      {
        name: "his tears",
        svg: tear(n(his[0] - 1.6), 101.2) + tear(n(his[0] + 1.6), 101.6),
        keys: track({
          opacity: [
            [0.2, 0],
            [0.205, 1],
            [0.43, 1],
            [0.44, 0]
          ],
          xy: going.slice(0, 2)
        })
      },
      ...risingSparks(
        "his du'a for her, rising",
        [
          [ringAt[0], 99],
          [ringAt[0] - 3.6, 97],
          [ringAt[0] + 3.6, 97]
        ],
        0.3,
        0.012,
        { stay: true, rise: 26 }
      ),
      { name: "the sound of water, from within", svg: arcs(31.4, 100.6, "#5B9BD5"), keys: showWhile(0.495, 0.505, 0.575, 0.585), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      { name: "her place, in the open doorway", svg: someone(28.2, 102.4, 1.5), keys: showFrom(0.585, 0.595) },
      { name: "her voice: I testify", svg: arcs(31.4, 100.6, VOICE), keys: showWhile(0.6, 0.61, 0.71, 0.72), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "guided: a warm glow on her", svg: glow(28.2, 101.6, 6, WARM, 0.32), keys: showFrom(0.61, 0.64), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "his tears of joy",
        svg: tear(n(his[0] - 1.6), 101.2, "#8CC6E6") + tear(n(his[0] + 1.6), 101.6, "#8CC6E6") + sparkle(n(his[0] + 3.4), 99.4, 1, SPARK),
        keys: track({
          opacity: [
            [0.715, 0],
            [0.72, 1]
          ],
          xy: going.slice(4)
        })
      },
      ...risingSparks(
        "his second du'a, rising",
        [
          [ringAt[0] - 7.6, 99.4],
          [ringAt[0] + 7.6, 99.4],
          [ringAt[0], 96.4]
        ],
        0.86,
        0.012,
        { stay: true, rise: 16 }
      ),
      { name: "a warm glow on the homes of Madinah", svg: homes.map(([x, y]) => glow(x, y - 3, 6, WARM, 0.26)).join(""), keys: showFrom(0.9, 0.93), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...[`M52 71.4 Q42 76 38 84.4`, `M68 71.4 Q52 84 44.6 98`, `M88 71.4 C92 90 102 104 116.6 105.4`].map((d, i): SignPart => ({ name: `a golden way of love from them ${i + 1}`, svg: way(d, GOLD), keys: showFrom(0.92, 0.95) })),
      { name: "a warm glow on her home", svg: glow(30, 95, 12, WARM, 0.16), keys: showFrom(0.93, 0.96), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "Abu Hurairah: I invited my mother to Islam", from: 0.02, to: 0.13 },
      { text: "She said what I hated; I came weeping", from: 0.15, to: 0.27 },
      { text: "He: O Allah, guide Abu Hurairah's mother", from: 0.29, to: 0.41 },
      { text: "The door was shut, and I heard water", from: 0.43, to: 0.55 },
      { text: "My mother: I testify, no god but Allah", from: 0.57, to: 0.69 },
      { text: "I went back weeping for joy", from: 0.71, to: 0.83 },
      { text: "He prayed: make them beloved to believers", from: 0.85, to: 1 }
    ]
  };
}

// The prayer made short. The Prophet ﷺ said: I stand in prayer meaning to make it long; then I hear a child crying, so
// I make my prayer short, disliking to make it hard for his mother (Sahih al-Bukhari 707). No one is drawn: inside the
// masjid of Madinah, its walls of mud brick, its roof of palm leaves on palm trunks; his place before the rows is a
// golden ring, and the rows are small dashed circles; on the wall, a golden band grows long, for the prayer he meant to
// make long; at the back, a little one's crying is pink arcs, a grey worry is on the one with it, and the cry reaches
// the front along a dashed way; the band grows short; and last, the crying stops, a calm glow is on them, and a soft
// light of mercy is over all.
function prayerMadeShort(): SignArt {
  const rows: [number, number][] = [
    ...[60, 68, 76, 84, 92, 100].map((x): [number, number] => [x, 82]),
    ...[56, 64, 72, 80, 88, 96, 104].map((x): [number, number] => [x, 91]),
    ...[72, 80, 88, 120].map((x): [number, number] => [x, 104])
  ];
  const holder: [number, number] = [100, 104];
  const little: [number, number] = [104.4, 105.4];
  const trunks = [8, 30, 130, 152];
  return {
    kind: "prayer-made-short",
    ms: 9000,
    parts: [
      {
        name: "the masjid's walls of mud brick",
        svg:
          `<rect width="160" height="66" fill="#D8B98A"/>` +
          [24, 34, 44, 54].map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#C9A676" stroke-width="0.4"/>`).join("")
      },
      {
        name: "its roof of palm leaves",
        svg: `<rect width="160" height="14" fill="#6E8F3A"/><path d="M0 14 L160 14" stroke="#56742B" stroke-width="0.8"/>` + Array.from({ length: 20 }, (_, i) => `<path d="M${i * 8 + 1} 12 L${i * 8 + 5} 4" stroke="#56742B" stroke-width="0.6"/>`).join("")
      },
      { name: "its floor", svg: `<rect y="66" width="160" height="54" fill="#E2CB9C"/><path d="M0 66 L160 66" stroke="#C9AE80" stroke-width="0.7"/>` },
      { name: "its palm trunks", svg: trunks.map((x) => `<rect x="${n(x - 1.6)}" y="14" width="3.2" height="${x === 30 || x === 130 ? 86 : 92}" fill="#A9895C"/><path d="M${x} 14 L${x} ${x === 30 || x === 130 ? 100 : 106}" stroke="#8C6E45" stroke-width="0.4"/>`).join("") },
      {
        name: "a golden band on the wall: how long the prayer is meant to be",
        svg: `<rect x="30" y="42.6" width="100" height="2.8" rx="1.4" fill="${GOLD}"/><rect x="30" y="42.6" width="100" height="1" rx="0.5" fill="#FFF3C0" opacity="0.7"/>`,
        origin: { x: 30, y: 44 },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.045, 1]
          ],
          scaleX: [
            [0.04, 0.02],
            [0.18, 1],
            [0.53, 1],
            [0.6, 0.45]
          ]
        })
      },
      { name: "a golden ring, his place, before the rows", svg: ring(80, 72, 3.2, GOLD) },
      { name: "standing to pray: a warm glow on it", svg: glow(80, 72, 5, WARM, 0.3), keys: showFrom(0.03, 0.06), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...rows.map(([x, y], i): SignPart => ({ name: `a place in the rows ${i + 1}`, svg: someone(x, y) })),
      { name: "the one with the little one", svg: someone(holder[0], holder[1]) },
      { name: "the little one", svg: someone(little[0], little[1], 1) },
      { name: "the little one's crying", svg: arcs(little[0] + 2, 103.4, "#E58FA6"), keys: showWhile(0.27, 0.29, 0.77, 0.79), loop: { move: "twinkle", ms: 600, low: 0.4 } },
      { name: "a grey worry on the one with it", svg: wash(102, 104, 7, 4.4, GREY, 0.16), keys: showWhile(0.3, 0.33, 0.78, 0.8) },
      { name: "the cry, heard at the front", svg: way(`M101.4 100.6 Q96 86 83.6 74.6`, "#E58FA6", 0.9), keys: showWhile(0.33, 0.37, 0.77, 0.79) },
      { name: "a calm glow on them", svg: glow(102, 104.6, 7, WARM, 0.28), keys: showFrom(0.78, 0.81), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a soft light of mercy over all", svg: wash(80, 92, 64, 18, WARM, 0.09), keys: showFrom(0.82, 0.87), loop: { move: "twinkle", ms: 2000, low: 0.8 } }
    ],
    words: [
      { text: "I stand to pray, meaning to make it long", from: 0.02, to: 0.24 },
      { text: "Then I hear a child crying", from: 0.26, to: 0.5 },
      { text: "So I make my prayer short", from: 0.52, to: 0.74 },
      { text: "Disliking to make it hard for his mother", from: 0.76, to: 1 }
    ]
  };
}

export const TEACH_ART = {
  "came-to-teach": cameToTeach,
  "keep-ties": keepTies,
  "fast-of-dawud": fastOfDawud,
  "one-religion": oneReligion,
  "who-refuses": whoRefuses,
  "guided-at-the-door": guidedAtTheDoor,
  "prayer-made-short": prayerMadeShort
};
