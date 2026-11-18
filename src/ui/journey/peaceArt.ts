import { cloud, glow, n, palm, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM } from "./worshipArt";
import { camel, care, goldCoin, sparkRising, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { GREY } from "./lovedArt";
import { roofOnTrunks } from "./gentleArt";

/**
 * Peace made and provision given, in his ﷺ days: the army of the khabat fed by the sea; the archers of Aslam, all of
 * them with him; a Bedouin's camels and his deeds, not lost from beyond the seas; half a debt let go in the masjid; the
 * folk of Quba, and his going to make peace between them; what is better than a servant, said at bedtime; and Thumamah,
 * set free, who came back a Muslim. Only the land, the sea, the sky, buildings, things, plants and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand or a face, and no one is drawn on a camel: where
 * someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the
 * air. Nothing is drawn for Allah, and nothing comes down from the sky: a praise or a witness is a spark that rises.
 */

/** Waves along a row at height y, from x1 to x2, as the sea's. */
const seaRow = (x1: number, x2: number, y: number, color = "#E8F3FB") => {
  let d = `M${x1} ${y}`;
  for (let x = x1; x < x2; x += 6) d += " q1.5 -1.3 3 0 t3 0";
  return `<path d="${d}" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.85"/>`;
};

/** The trunk and thorny branches of a salam tree of the coast, its foot at (x, y), `s` times its size. */
const salamTrunk = (x: number, y: number, s: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  const thorns = [-8, -4, 0, 4, 8]
    .map((dx, i) => `<path d="M${p(dx, -13.6 + (i % 2) * 0.6)} L${p(dx + 0.5, -12 + (i % 2) * 0.6)}" stroke="#4E3A24" stroke-width="${n(0.45 * s)}" stroke-linecap="round"/>`)
    .join("");
  return (
    `<path d="M${p(0, 0)} Q${p(-0.8, -5)} ${p(0.6, -9)} M${p(0.6, -9)} L${p(-6, -14)} M${p(0.6, -9)} L${p(7, -14.2)} M${p(0.4, -9)} L${p(0.8, -15)}" stroke="#6E5034" stroke-width="${n(1.2 * s)}" fill="none" stroke-linecap="round"/>` +
    thorns
  );
};

/** The leaves of a salam tree whose foot is at (x, y): its flat green crown. */
const salamLeaves = (x: number, y: number, s: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-12, -14.6)} Q${p(-11, -19)} ${p(-5, -18.6)} Q${p(0, -21)} ${p(5, -18.8)} Q${p(11.6, -19.4)} ${p(12.4, -14.8)} Q${p(0, -13.2)} ${p(-12, -14.6)} Z" fill="#6F8F45"/>` +
    `<path d="M${p(-11.6, -15)} Q${p(0, -13.8)} ${p(12, -15.2)}" stroke="#56703A" stroke-width="${n(0.8 * s)}" fill="none"/>`
  );
};

/** A small leaf, its middle at (x, y). */
const leaf = (x: number, y: number) => `<path d="M${n(x - 1.4)} ${y} Q${x} ${n(y - 1.2)} ${n(x + 1.4)} ${y} Q${x} ${n(y + 1.2)} ${n(x - 1.4)} ${y} Z" fill="#6F8F45"/>`;

/** A few dates in a small heap, its middle at (x, y). */
const dates = (x: number, y: number) =>
  [
    [-1.6, 0.4],
    [0, 0.6],
    [1.6, 0.4],
    [-0.8, -0.6],
    [0.8, -0.6]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="0.6" fill="#7A4A26"/>`)
    .join("");

/** Al-Anbar, the great fish the sea threw out, lying on the shore, its head at the right, about (68, 98). */
const anbar = () =>
  `<path d="M90 96 Q91 90.6 84 90.4 L58 92 Q50 93 46 97 L40 93.4 L41.6 98 L39.6 102.8 L46 99.4 Q52 103.6 60 104 L84 104 Q91 103.6 90 96 Z" fill="#5D6E80"/>` +
  `<path d="M58 101.6 Q70 104.4 84 103.4 Q72 104.9 58 103.4 Z" fill="#8C9BAA"/>` +
  `<path d="M60 92.6 Q72 91.2 83 91.4" stroke="#7D8EA0" stroke-width="0.6" fill="none"/>` +
  `<circle cx="84.4" cy="96.2" r="0.7" fill="#1F2A33"/><path d="M84 100.4 L89.6 99.8" stroke="#3E4C5A" stroke-width="0.5" stroke-linecap="round"/>`;

/** A piece of its meat, its middle at (x, y). */
const piece = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="0.8" fill="#C98B7A" stroke="#A86A5A" stroke-width="0.3"/>`;

// The army of the khabat. Jabir ibn Abdullah said: the Messenger of Allah ﷺ sent us, three hundred riders, our leader
// Abu Ubaidah ibn al-Jarrah, to watch for a caravan of Quraysh. We stayed at the shore half a month, and such hunger
// struck us that we ate the khabat, the leaves of the trees, so that army was called the army of the khabat. Then the
// sea threw out for us a creature called al-Anbar, and we ate of it half a month. Abu Ubaidah took one of its ribs and
// set it up, and a man and a camel passed under it (Sahih al-Bukhari 4361). No one is drawn, and no one on a camel: by
// the sea, the places of the three hundred come to their tents, Abu Ubaidah's place a soft ring among them, their
// camels by the tents and a few dates by them. The dates go, a grey ring of hunger comes about the camp, and leaves go
// from the thorny trees to it, the trees growing bare; a soft ring comes about the camp and the trees. Then a swell comes
// in, and the great fish comes out of the sea onto the shore. Pieces of it go to the camp, the grey ring goes, and a warm
// glow comes about it. Abu Ubaidah's place goes to the fish, and one of its ribs rises from the sand, an arch; a camel,
// a place beside it, passes under it.
function armyOfLeaves(): SignArt {
  const camp: [number, number][] = [
    [124, 104],
    [130, 106],
    [136, 104],
    [142, 106],
    [148, 104],
    [154, 106],
    [128, 100.4],
    [140, 101],
    [152, 100.6]
  ];
  const leader: [number, number] = [120, 102.4];
  const trees: [number, number, number][] = [
    [114, 82, 0.6],
    [134, 80, 0.55],
    [152, 82.4, 0.6]
  ];
  const arrive = (extra: [number, number, number][] = []) =>
    track({
      xy: [[0.02, 30, 0], [0.08, 0, 0], ...extra],
      opacity: [
        [0.02, 0],
        [0.04, 1]
      ]
    });
  const at = (value: number) => Math.round(value * 1000) / 1000;
  const taken = (from: [number, number], to: [number, number], t0: number, t1: number) =>
    track({
      xy: [
        [t0, 0, 0],
        [t1, n(to[0] - from[0]), n(to[1] - from[1])]
      ],
      opacity: [
        [t0, 0],
        [at(t0 + 0.005), 1],
        [at(t1 - 0.005), 1],
        [t1, 0]
      ]
    });
  return {
    kind: "army-of-leaves",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(70, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the sand of the shore", svg: `<rect y="62" width="160" height="58" fill="#EBD5A2"/><path d="M60 112 Q90 108 120 113 Q90 112 60 112 Z" fill="#E2C890"/>` },
      {
        name: "the sea",
        svg: `<path d="M0 62 L160 62 L160 66 Q120 66 96 70 Q70 76 54 88 Q40 100 32 120 L0 120 Z" fill="#7FB8E6"/><rect y="62" width="160" height="2.4" fill="#6AA6D8"/>`
      },
      {
        name: "waves at the shore",
        svg: seaRow(70, 100, 69) + seaRow(46, 64, 82) + seaRow(30, 46, 96) + seaRow(14, 30, 110) + seaRow(4, 40, 74),
        loop: { move: "slide", ms: 2400, period: 6 }
      },
      ...trees.map(([x, y, s], i): SignPart => ({ name: `a thorny tree of the coast ${i + 1}`, svg: salamTrunk(x, y, s) })),
      ...trees.map(
        ([x, y, s], i): SignPart => ({
          name: `a thorny tree of the coast ${i + 1}: its leaves`,
          svg: salamLeaves(x, y, s),
          keys: track({
            opacity: [
              [0.28, 1],
              [0.32, 0.3]
            ]
          })
        })
      ),
      { name: "their tents by the shore", svg: tent(128, 98, 14, 9) + tent(146, 99.4, 12, 8) + tent(158, 97.6, 9, 6.4) },
      { name: "their camels by the tents", svg: camel(118, 97.6, 0.1, true) + camel(150, 96.4, 0.1) },
      { name: "their food: a few dates by the tents", svg: dates(134, 101.8), keys: track({ opacity: [[0.26, 1], [0.275, 0]] }) },
      { name: "the places of the three hundred, come to the shore", svg: camp.map(([x, y]) => someone(x, y, 1.3)).join(""), keys: arrive() },
      {
        name: "Abu Ubaidah's place, a soft ring about it",
        svg: someone(leader[0], leader[1], 1.4) + ring(leader[0], n(leader[1] + 0.8), 2.6, VOICE),
        keys: arrive([
          [0.74, 0, 0],
          [0.77, -5, 1]
        ])
      },
      { name: "hunger: a grey ring about the camp", svg: greyRing(138, 103, 22, 5.4), keys: showFor(0.27, 0.29, 0.62, 0.64) },
      ...trees.map(
        ([x, y, s], i): SignPart => ({
          name: `the khabat: leaves taken to the camp ${i + 1}`,
          svg: leaf(n(x + 2), n(y - 16 * s)),
          keys: taken([n(x + 2), n(y - 16 * s)], camp[i * 2 + 1], 0.28, 0.32)
        })
      ),
      { name: "the army of the khabat: a soft ring about the camp and the trees", svg: care(136, 96, 26, 15, VOICE), keys: showAt(0.38, 0.42) },
      {
        name: "the sea's swell at the shore",
        svg: `<path d="M30 96 Q40 88 52 90" stroke="#FFFFFF" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.9"/>` + sparkle(40, 91, 1, "#FFFFFF"),
        keys: showFor(0.5, 0.51, 0.555, 0.565)
      },
      {
        name: "al-Anbar, the great fish the sea threw out",
        svg: anbar(),
        keys: track({
          xy: [
            [0.505, -34, -7],
            [0.555, 0, 0]
          ],
          opacity: [
            [0.5, 0],
            [0.515, 1]
          ]
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `pieces of it, taken to the camp ${i + 1}`,
          svg: piece(n(70 + i * 6), 97),
          keys: taken([n(70 + i * 6), 97], camp[i * 3], 0.62, at(0.665 + i * 0.006))
        })
      ),
      { name: "fed: a warm glow about the camp", svg: glow(138, 102, 22, WARM, 0.22), keys: showAt(0.67, 0.685), loop: soft },
      {
        name: "one of its ribs, set up: an arch",
        svg: `<path d="M92 104.4 Q103 56 114 104.4" stroke="#F1ECDF" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M92.9 104.4 Q103 58 113.1 104.4" stroke="#CFC7B4" stroke-width="0.4" fill="none"/>`,
        origin: { x: 103, y: 104.4 },
        keys: track({
          opacity: [
            [0.76, 0],
            [0.765, 1]
          ],
          scaleY: [
            [0.76, 0.05],
            [0.8, 1]
          ]
        })
      },
      {
        name: "a place and a camel, passing under the rib",
        svg: camel(124, 104.6, 0.12, true) + someone(127, 103.2, 1.3),
        keys: track({
          xy: [
            [0.86, 0, 0],
            [0.95, -21, 0]
          ],
          opacity: [
            [0.86, 0],
            [0.87, 1]
          ]
        })
      }
    ],
    words: [
      { text: "Three hundred riders, under Abu Ubaidah", from: 0.02, to: 0.125 },
      { text: "We stayed at the shore half a month", from: 0.14, to: 0.245 },
      { text: "So hungry, we ate the leaves, the khabat", from: 0.26, to: 0.365 },
      { text: "So it was called the army of the khabat", from: 0.38, to: 0.485 },
      { text: "Then the sea threw out a fish, al-Anbar", from: 0.5, to: 0.605 },
      { text: "We ate of it for half a month", from: 0.62, to: 0.725 },
      { text: "Abu Ubaidah set up one of its ribs", from: 0.74, to: 0.845 },
      { text: "A man and a camel passed under it", from: 0.86, to: 1 }
    ]
  };
}

/** A round mark of straw on its stand, to shoot at, its middle at (x, y). */
const target = (x: number, y: number) =>
  `<path d="M${n(x - 2)} ${n(y + 5.2)} L${x} ${n(y + 1)} L${n(x + 2)} ${n(y + 5.2)}" stroke="#8A6A44" stroke-width="0.6" fill="none"/>` +
  `<circle cx="${x}" cy="${y}" r="3.4" fill="#F2E6C8" stroke="#B98F5A" stroke-width="0.5"/><circle cx="${x}" cy="${y}" r="2.1" fill="#D9A25A"/><circle cx="${x}" cy="${y}" r="0.9" fill="#F2E6C8"/>`;

/** An arrow flying to the right, its head at (x, y). */
const arrow = (x: number, y: number) =>
  `<path d="M${n(x - 7)} ${y} L${n(x - 1)} ${y}" stroke="#8A6A44" stroke-width="0.5"/>` +
  `<path d="M${x} ${y} L${n(x - 1.4)} ${n(y - 0.8)} L${n(x - 1.4)} ${n(y + 0.8)} Z" fill="#6E6E6E"/>` +
  `<path d="M${n(x - 7)} ${y} L${n(x - 8)} ${n(y - 0.9)} M${n(x - 6)} ${y} L${n(x - 7)} ${n(y - 0.9)} M${n(x - 7)} ${y} L${n(x - 8)} ${n(y + 0.9)} M${n(x - 6)} ${y} L${n(x - 7)} ${n(y + 0.9)}" stroke="#C9B994" stroke-width="0.4"/>`;

/** An arrow standing still, held, its head up, its foot at (x, y). */
const heldArrow = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - 6)}" stroke="#8A6A44" stroke-width="0.5"/><path d="M${x} ${n(y - 7)} L${n(x - 0.8)} ${n(y - 5.6)} L${n(x + 0.8)} ${n(y - 5.6)} Z" fill="#6E6E6E"/>`;

// The archers of Aslam. Salamah ibn al-Akwa' said: the Prophet ﷺ passed by some of Aslam practising archery, and he
// said: shoot, children of Isma'il, for your father was an archer; shoot, and I am with the sons of so-and-so. So one of
// the two sides held back. The Messenger of Allah ﷺ said: why do you not shoot? They said: how can we shoot, when you
// are with them? He said: shoot, and I am with you all (Sahih al-Bukhari 2899). No one is drawn: on open ground, the
// places of two sides shoot at two round marks of straw, their arrows flying, glints where they hit. His place, a golden
// ring, comes along a way and stands by them. His voice speaks, and a soft ring comes about both sides; arrows show in
// the marks. His voice speaks again; a faint golden line goes to one side, a soft golden ring about it. The other side's
// arrows stop, held. His voice asks, and their voice answers. Then his voice speaks once more: the golden line and ring
// go, a soft golden ring comes about both sides, and the arrows of both fly again.
function archersOfAslam(): SignArt {
  const sideA: [number, number][] = [
    [12, 96.6],
    [18, 95],
    [24, 96.6]
  ];
  const sideB: [number, number][] = [
    [12, 107.6],
    [18, 106],
    [24, 107.6]
  ];
  const marks: [number, number][] = [
    [148, 95.6],
    [148, 106.6]
  ];
  const his: [number, number] = [76, 88.6];
  const voiceAt: [number, number] = [n(his[0] + 3.4), n(his[1] - 4.4)];
  const stopped = track({
    opacity: [
      [0.5, 1],
      [0.515, 0],
      [0.9, 0],
      [0.915, 1]
    ]
  });
  return {
    kind: "archers-of-aslam",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(26, 18) },
      { name: "a cloud", svg: cloud(104, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a way across the land", svg: way("M132 84 Q106 86 80 89", "#B79B72", 1) },
      { name: "two round marks of straw, to shoot at", svg: marks.map(([x, y]) => target(x, y)).join("") },
      { name: "one side's places, shooting", svg: sideA.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "the other side's places, shooting", svg: sideB.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "one side's arrows, flying", svg: arrow(36, 95.6), loop: { move: "slide", ms: 1500, period: 106 }, clip: { x: 29, y: 93, w: 116, h: 5 } },
      { name: "the other side's arrows, flying", svg: arrow(36, 106.6), loop: { move: "slide", ms: 1700, period: 106 }, clip: { x: 29, y: 104, w: 116, h: 5 }, keys: stopped },
      { name: "one side's arrows, hitting: a glint on its mark", svg: sparkle(148, 95.6, 1.2, "#FFFFFF"), loop: { move: "twinkle", ms: 1500, low: 0.2 } },
      { name: "the other side's arrows, hitting: a glint on its mark", svg: sparkle(148, 106.6, 1.2, "#FFFFFF"), loop: { move: "twinkle", ms: 1700, low: 0.2 }, keys: stopped },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.02, 52, -4.6],
            [0.08, 0, 0]
          ],
          opacity: [
            [0.02, 0],
            [0.03, 1]
          ]
        })
      },
      { name: "his voice: shoot, Bani Ismail", svg: arcs(voiceAt[0], voiceAt[1], GOLD), keys: showFor(0.14, 0.15, 0.315, 0.325), loop: speaking },
      { name: "Bani Ismail: a soft ring about both sides", svg: care(18, 101.6, 12, 10, VOICE), keys: showFor(0.15, 0.18, 0.38, 0.4) },
      {
        name: "arrows in the marks, as of old",
        svg: marks.map(([x, y]) => `<path d="M${n(x - 6)} ${n(y - 1.4)} L${n(x - 1)} ${n(y - 0.6)} M${n(x - 6)} ${n(y + 1.2)} L${n(x - 1.2)} ${n(y + 0.4)}" stroke="#8A6A44" stroke-width="0.5"/>`).join(""),
        keys: showAt(0.26, 0.29)
      },
      { name: "his voice: shoot, I am with Bani so-and-so", svg: arcs(voiceAt[0], voiceAt[1], GOLD), keys: showFor(0.38, 0.39, 0.435, 0.445), loop: speaking },
      { name: "with them: a faint golden line to one side", svg: lookLine(n(his[0] - 2.4), n(his[1] + 1), 27, 95, 88, GOLD), keys: showFor(0.39, 0.41, 0.87, 0.89) },
      { name: "with them: a soft golden ring about one side", svg: care(18, 96, 10, 3.6, GOLD), keys: showFor(0.4, 0.43, 0.87, 0.89) },
      { name: "held back: the other side's arrows, still", svg: sideB.map(([x, y]) => heldArrow(n(x + 2.4), n(y + 1))).join(""), keys: showFor(0.51, 0.53, 0.9, 0.915) },
      { name: "his voice: why do you not shoot?", svg: arcs(voiceAt[0], voiceAt[1], GOLD), keys: showFor(0.62, 0.63, 0.675, 0.685), loop: speaking },
      { name: "the other side's voice: how, when you are with them?", svg: arcs(28, 102.6, VOICE), keys: showFor(0.74, 0.75, 0.795, 0.805), loop: speaking },
      { name: "his voice: shoot, and I am with you all", svg: arcs(voiceAt[0], voiceAt[1], GOLD), keys: showAt(0.86, 0.87), loop: speaking },
      { name: "with you all: a soft golden ring about both sides", svg: care(18, 101.6, 13, 11, GOLD), keys: showAt(0.88, 0.91), loop: soft }
    ],
    words: [
      { text: "He passed folk of Aslam at archery", from: 0.02, to: 0.125 },
      { text: "Shoot, children of Ismail", from: 0.14, to: 0.245 },
      { text: "For your father was an archer", from: 0.26, to: 0.365 },
      { text: "Shoot, I am with the sons of so-and-so", from: 0.38, to: 0.485 },
      { text: "So one of the two sides held back", from: 0.5, to: 0.605 },
      { text: "Why do you not shoot?", from: 0.62, to: 0.725 },
      { text: "They said: How, when you are with them?", from: 0.74, to: 0.845 },
      { text: "Shoot, and I am with you all", from: 0.86, to: 1 }
    ]
  };
}

// Beyond the seas. Abu Sa'id al-Khudri said: a Bedouin asked the Messenger of Allah ﷺ about the hijrah. He said: mercy
// on you, its matter is hard. Have you camels whose zakat you give? He said: yes. He said: then work from beyond the
// seas, for Allah will not let any of your deeds go to waste (Sahih al-Bukhari 1452). No one is drawn, and no one on a
// camel: far off, the seas; on the left, a Bedouin's tent of goat hair, his camels by it; on the right, the masjid of
// Madinah and his place, a golden ring. The Bedouin's place comes along the way to him, and its voice asks. His voice
// answers, and a long grey way shows from the tent to Madinah, a grey ring about the tent: hard. His voice asks again; a
// soft ring comes about the camels, and one of them, a soft golden ring about it, goes from the herd: their zakat given.
// The Bedouin's voice answers. His voice speaks, glints show on the far seas, the grey way goes, and the Bedouin's place
// goes back to its tent. Sparks of its deeds rise there, and a warm glow comes about the tent.
function beyondTheSeas(): SignArt {
  const tentAt: [number, number] = [28, 97];
  const his: [number, number] = [124, 104.6];
  const asker: [number, number] = [38, 103];
  const near: [number, number] = [110, 105];
  const [dx, dy] = [n(near[0] - asker[0]), n(near[1] - asker[1])];
  return {
    kind: "beyond-the-seas",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(140, 16) },
      { name: "a cloud", svg: cloud(84, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "the seas, far off", svg: `<path d="M0 54.6 L92 54.6 Q97 58 101 62 L0 62 Z" fill="#8CC0E6"/><rect y="54.6" width="92" height="1" fill="#7AB2DE"/>` + seaRow(4, 82, 58.2) },
      { name: "a far shore of hills", svg: `<path d="M100 62 Q112 54 126 57 Q142 52 160 56 L160 62 Z" fill="#C9B38C"/>` },
      { name: "the land", svg: land() },
      { name: "a way from the tent to Madinah", svg: way(`M${asker[0]} ${n(asker[1] + 1.6)} Q74 98 ${near[0]} ${n(near[1] + 1.6)}`, "#B79B72", 1) },
      { name: "the Bedouin's tent of goat hair", svg: tent(tentAt[0], tentAt[1], 17, 10, "#6B5646") },
      { name: "the Bedouin's camels by the tent", svg: camel(12, 101, 0.11) + camel(46, 106.4, 0.12, true) },
      { name: "the masjid of Madinah", svg: madinahMasjid(110, 99, 0.5) },
      { name: "a palm of Madinah", svg: palm(148, 99, 14) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the Bedouin's place",
        svg: someone(asker[0], asker[1], 1.5),
        keys: track({
          xy: [
            [0.02, 0, 0],
            [0.09, dx, dy],
            [0.67, dx, dy],
            [0.74, 0, 0]
          ]
        })
      },
      { name: "the Bedouin's voice: asking of the hijrah", svg: arcs(n(near[0] + 3), n(near[1] - 4.4), VOICE), keys: showFor(0.09, 0.1, 0.17, 0.18), loop: speaking },
      { name: "his voice: its matter is hard", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), GOLD), keys: showFor(0.17, 0.18, 0.26, 0.27), loop: speaking },
      { name: "the hijrah: a long grey way from the tent to Madinah", svg: lookLine(n(tentAt[0] + 6), n(tentAt[1] + 1), n(near[0] - 2), n(near[1] - 1), 86, GREY), keys: showFor(0.19, 0.22, 0.66, 0.69) },
      { name: "hard: a grey ring about the tent", svg: greyRing(tentAt[0], n(tentAt[1] + 0.6), 11, 4), keys: showFor(0.22, 0.25, 0.66, 0.69) },
      { name: "his voice: have you camels? do you give their zakat?", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), GOLD), keys: showFor(0.33, 0.34, 0.42, 0.43), loop: speaking },
      { name: "camels: a soft ring about the Bedouin's camels", svg: care(28, 103, 24, 6.6, VOICE), keys: showFor(0.34, 0.36, 0.66, 0.69) },
      {
        name: "their zakat: a camel given, a soft golden ring about it",
        svg: camel(60, 104.4, 0.11, true) + care(60, 105, 6.4, 2, GOLD),
        keys: track({
          xy: [
            [0.38, -6, 0],
            [0.42, 10, -1]
          ],
          opacity: [
            [0.37, 0],
            [0.38, 1]
          ]
        })
      },
      { name: "the Bedouin's voice: yes", svg: arcs(n(near[0] + 3), n(near[1] - 4.4), VOICE), keys: showFor(0.49, 0.5, 0.58, 0.59), loop: speaking },
      { name: "his voice: then work from beyond the seas", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), GOLD), keys: showFor(0.65, 0.66, 0.74, 0.75), loop: speaking },
      {
        name: "beyond the seas: glints on the far seas",
        svg: [14, 34, 56].map((x) => sparkle(x, 59.6, 0.9, "#FFFFFF")).join(""),
        keys: showAt(0.66, 0.69),
        loop: { move: "twinkle", ms: 1600, low: 0.3 }
      },
      { name: "the Bedouin's deeds: a spark rising 1", svg: sparkle(asker[0], n(asker[1] - 3), 1.1, "#E8A93A"), keys: sparkRising(0.82, 0.9) },
      { name: "the Bedouin's deeds: a spark rising 2", svg: sparkle(n(asker[0] - 2), n(asker[1] - 3), 1, "#E8A93A"), keys: sparkRising(0.86, 0.94) },
      { name: "not wasted: a warm glow about the tent", svg: glow(30, 100, 14, WARM, 0.3), keys: showAt(0.84, 0.88), loop: soft }
    ],
    words: [
      { text: "A Bedouin asked him about the hijrah", from: 0.02, to: 0.15 },
      { text: "Mercy on you! Its matter is hard", from: 0.17, to: 0.31 },
      { text: "Have you camels? Do you give their zakat?", from: 0.33, to: 0.47 },
      { text: "The Bedouin said: yes", from: 0.49, to: 0.63 },
      { text: "Then work from beyond the seas", from: 0.65, to: 0.79 },
      { text: "Allah will not waste any of your deeds", from: 0.81, to: 1 }
    ]
  };
}

/** A coin owed, not yet paid: a dashed ring, its middle at (x, y). */
const owed = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="1.5" stroke="#98A2AD" stroke-width="0.5" stroke-dasharray="0.8 0.6" fill="#DDE2E8" fill-opacity="0.5"/>`;

/** Coins in two rows of `count` from (x, y), 3.4 apart. */
const inRows = (x: number, y: number, count: number, coin: (x: number, y: number) => string) =>
  Array.from({ length: count }, (_, i) => coin(n(x + (i % 3) * 3.4), n(y + Math.floor(i / 3) * 3.2))).join("");

/** The masjid's wall of mud brick from x1 to x2. */
const mudWall = (x1: number, x2: number) => `<rect x="${x1}" y="84" width="${x2 - x1}" height="15" fill="#D2B98C"/><rect x="${x1}" y="84" width="${x2 - x1}" height="1.4" fill="#BFA275"/>`;

// Half the debt. Ka'b ibn Malik asked Ibn Abi Hadrad, in the masjid, for a debt he owed him, and their voices rose until
// the Messenger of Allah ﷺ heard them while he was in his house. He came out to them, lifting the curtain of his room,
// and called: O Ka'b! He said: at your service, O Messenger of Allah. He pointed to him: drop half. Ka'b said: I have
// done so, O Messenger of Allah. He said: get up and pay him (Sahih al-Bukhari 2710). No one is drawn: in the masjid,
// within its wall of mud brick, two places stand, Ka'b's and Ibn Abi Hadrad's, and between them the debt: coins owed,
// dashed. Their voices speak, then rise, and a grey ring comes between them; a faint golden line goes to his room at
// the side: he heard. The curtain of his room lifts, and his place, a golden ring, is at the door. His voice calls, and
// Ka'b's voice answers. A faint golden line goes to the coins, and half of them go. Ka'b's voice speaks, and a soft ring
// comes about his place. His voice speaks again; Ibn Abi Hadrad's place stands, the other half goes to Ka'b's place,
// paid, gold, and a warm glow comes about them both.
function halfTheDebt(): SignArt {
  const kab: [number, number] = [70, 104.6];
  const other: [number, number] = [96, 104.6];
  const door: [number, number] = [137, 104.6];
  const fromDoor: [number, number] = [n(door[0] - 3.4), n(door[1] - 4.6)];
  return {
    kind: "half-the-debt",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C9E4F6", "#F1E6C8", 62) },
      { name: "the sun", svg: sun(36, 18) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid's wall of mud brick", svg: mudWall(2, 122) },
      { name: "the shade under the roof", svg: `<rect x="2" y="88.4" width="56" height="10.6" fill="#000000" opacity="0.12"/>` },
      { name: "the roof of palm leaves on palm trunks", svg: roofOnTrunks(4, 56) },
      {
        name: "his room, by the masjid",
        svg:
          `<rect x="122" y="80" width="34" height="24.6" fill="#CDB07E"/><rect x="121" y="78.6" width="36" height="1.8" fill="#B4935F"/>` +
          `<rect x="133" y="92" width="8" height="12.6" fill="#5E4330"/>`
      },
      {
        name: "the curtain of his room",
        svg: `<rect x="132.6" y="92" width="8.8" height="12.6" fill="#E8DCC0"/><path d="M135 92.4 L134.6 104.4 M137.4 92.4 L137.4 104.4 M139.8 92.4 L140 104.4" stroke="#C9B994" stroke-width="0.5"/>`,
        origin: { x: 137, y: 92 },
        keys: track({
          scaleY: [
            [0.3, 1],
            [0.34, 0.22]
          ]
        })
      },
      { name: "a golden ring, his place, at the door", svg: ring(door[0], door[1], 2.6, GOLD), keys: showAt(0.33, 0.36) },
      { name: "Ka'b's place", svg: someone(kab[0], kab[1], 1.5) },
      {
        name: "Ibn Abi Hadrad's place",
        svg: someone(other[0], other[1], 1.5),
        keys: track({
          xy: [
            [0.87, 0, 0],
            [0.89, 0, -1.4]
          ]
        })
      },
      { name: "Ka'b's voice: asking for his debt", svg: arcs(n(kab[0] + 3), n(kab[1] - 4.4), VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      {
        name: "the debt: half of it, coins owed",
        svg: inRows(78, 95, 5, owed),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.08, 1],
            [0.6, 1],
            [0.64, 0]
          ]
        })
      },
      {
        name: "the debt: the other half, coins owed",
        svg: inRows(84.8, 98.2, 5, owed),
        keys: track({
          xy: [
            [0.89, 0, 0],
            [0.93, -20, 0]
          ],
          opacity: [
            [0.04, 0],
            [0.08, 1],
            [0.92, 1],
            [0.93, 0]
          ]
        })
      },
      {
        name: "Ka'b's voice, raised",
        svg: arcs(n(kab[0] + 3), n(kab[1] - 4.4), VOICE),
        origin: { x: n(kab[0] + 3), y: n(kab[1] - 4.4) },
        keys: track({
          opacity: [
            [0.15, 0],
            [0.16, 1],
            [0.35, 1],
            [0.36, 0]
          ],
          scale: [
            [0.16, 1],
            [0.2, 1.4]
          ]
        }),
        loop: speaking
      },
      {
        name: "Ibn Abi Hadrad's voice, raised",
        svg: arcsLeft(n(other[0] - 3), n(other[1] - 4.4), VOICE),
        origin: { x: n(other[0] - 3), y: n(other[1] - 4.4) },
        keys: track({
          opacity: [
            [0.15, 0],
            [0.16, 1],
            [0.35, 1],
            [0.36, 0]
          ],
          scale: [
            [0.16, 1],
            [0.2, 1.4]
          ]
        }),
        loop: speaking
      },
      { name: "raised voices: a grey ring between them", svg: greyRing(83, 104.8, 17, 4.6), keys: showFor(0.17, 0.2, 0.72, 0.75) },
      { name: "he heard them: a faint golden line from his room", svg: lookLine(132, 98, 100, 99, 88, GOLD), keys: showFor(0.2, 0.23, 0.35, 0.36) },
      { name: "his voice: O Ka'b", svg: arcsLeft(fromDoor[0], fromDoor[1], GOLD), keys: showFor(0.43, 0.44, 0.47, 0.48), loop: speaking },
      { name: "Ka'b's voice: at your service", svg: arcs(n(kab[0] + 3), n(kab[1] - 4.4), VOICE), keys: showFor(0.47, 0.48, 0.505, 0.51), loop: speaking },
      { name: "he pointed: a faint golden line to the debt", svg: lookLine(n(door[0] - 2.6), n(door[1] - 2.4), 90, 97, 86, GOLD), keys: showFor(0.57, 0.6, 0.86, 0.88) },
      { name: "Ka'b's voice: I have done so", svg: arcs(n(kab[0] + 3), n(kab[1] - 4.4), VOICE), keys: showFor(0.71, 0.72, 0.78, 0.79), loop: speaking },
      { name: "agreed: a soft ring about Ka'b's place", svg: care(kab[0], n(kab[1] + 0.6), 4.2, 2.2, VOICE), keys: showAt(0.73, 0.76) },
      { name: "his voice: get up and pay him", svg: arcsLeft(fromDoor[0], fromDoor[1], GOLD), keys: showFor(0.85, 0.86, 0.9, 0.91), loop: speaking },
      { name: "paid: gold coins by Ka'b's place", svg: inRows(64.6, 98.2, 5, (x, y) => goldCoin(x, y, 1.4)), keys: showAt(0.92, 0.94) },
      { name: "a warm glow about them both", svg: glow(83, 104, 18, WARM, 0.24), keys: showAt(0.93, 0.96), loop: soft }
    ],
    words: [
      { text: "In the masjid, Ka'b asked for a debt", from: 0.02, to: 0.13 },
      { text: "Their voices rose; he heard them at home", from: 0.15, to: 0.27 },
      { text: "He lifted the curtain of his room", from: 0.29, to: 0.41 },
      { text: "O Ka'b! Ka'b said: at your service", from: 0.43, to: 0.55 },
      { text: "He pointed: drop half of the debt", from: 0.57, to: 0.69 },
      { text: "Ka'b said: I have done so", from: 0.71, to: 0.83 },
      { text: "He told Ibn Abi Hadrad: get up and pay", from: 0.85, to: 1 }
    ]
  };
}

/** A small stone, its middle at (x, y). */
const stone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.7" fill="#9A958C" stroke="#7A766E" stroke-width="0.3"/>`;

// Peace at Quba. Sahl ibn Sa'd said: the folk of Quba fought one another, till they threw stones at each other. The
// Messenger of Allah ﷺ was told of it, and he said: let us go, to make peace between them (Sahih al-Bukhari 2693). No
// one is drawn: on the left, the masjid of Madinah and his place, a golden ring, with the places of those with him; on
// the right, Quba among its palms, the folk's places in two sides. Their voices rise, grey rings come about both sides
// and a grey line between them; stones go from side to side, and lie on the ground between them. A place comes along
// the way from Quba to his, and its voice tells him. His voice speaks; a faint golden way shows to Quba, and his place
// and those with him go along it, until they come between the two sides, and a soft golden ring comes about them.
function qubaPeace(): SignArt {
  const his: [number, number] = [30, 104.6];
  const withHim: [number, number][] = [
    [38, 106.2],
    [44, 104.4]
  ];
  const sideA: [number, number][] = [
    [100, 101.6],
    [106, 103.2],
    [112, 101.6]
  ];
  const sideB: [number, number][] = [
    [140, 101.6],
    [146, 103.2],
    [152, 101.6]
  ];
  const teller: [number, number] = [94, 101.4];
  const told: [number, number] = [37, 101.2];
  const goes = (end: [number, number]): [number, number, number][] => [
    [0.68, 0, 0],
    [0.74, n(end[0] * 0.42), n(end[1] * 0.42)],
    [0.8, n(end[0] * 0.42), n(end[1] * 0.42)],
    [0.9, end[0], end[1]]
  ];
  const throwAt = (from: [number, number], to: [number, number], t0: number) =>
    track({
      xy: [
        [t0, 0, 0],
        [Math.round((t0 + 0.03) * 1000) / 1000, n((to[0] - from[0]) / 2), -6],
        [Math.round((t0 + 0.06) * 1000) / 1000, n(to[0] - from[0]), n(to[1] - from[1])]
      ],
      opacity: [
        [t0, 0],
        [Math.round((t0 + 0.005) * 1000) / 1000, 1],
        [Math.round((t0 + 0.055) * 1000) / 1000, 1],
        [Math.round((t0 + 0.06) * 1000) / 1000, 0]
      ]
    });
  return {
    kind: "quba-peace",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(84, 16) },
      { name: "a cloud", svg: cloud(122, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 99, 0.45) },
      { name: "the way from Madinah to Quba", svg: way("M36 106 Q76 100 116 104", "#B79B72", 1) },
      { name: "a palm of Quba 1", svg: palm(104, 98, 13), origin: { x: 104, y: 98 }, loop: { move: "sway", ms: 5200, angle: 1.4 } },
      { name: "a palm of Quba 2", svg: palm(134, 96, 14), origin: { x: 134, y: 96 }, loop: { move: "sway", ms: 5800, angle: 1.4, phase: 0.3 } },
      { name: "the homes of Quba", svg: home(118, 99, 14, 10) + home(148, 98, 16, 11) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD), keys: track({ xy: goes([96, -1.6]) }) },
      ...withHim.map(
        (at, i): SignPart => ({ name: `a place with him ${i + 1}`, svg: someone(at[0], at[1], 1.4), keys: track({ xy: goes(i ? [88, -0.8] : [82, -2.6]) }) })
      ),
      { name: "the folk of Quba: one side", svg: sideA.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "the folk of Quba: the other side", svg: sideB.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "their voices, raised in a quarrel", svg: arcs(115, 97.6, GREY) + arcsLeft(137, 97.6, GREY), keys: showFor(0.03, 0.05, 0.33, 0.34), loop: speaking },
      { name: "fighting: grey rings about both sides", svg: greyRing(106, 102.8, 9, 3.4) + greyRing(146, 102.8, 9, 3.4), keys: showAt(0.06, 0.1) },
      { name: "a grey line between them", svg: lookLine(117, 101.4, 135, 101.4, 96.4, GREY), keys: showAt(0.09, 0.12) },
      { name: "a stone thrown 1", svg: stone(114, 99.4), keys: throwAt([114, 99.4], [138, 100.6], 0.2) },
      { name: "a stone thrown 2", svg: stone(138, 99.4), keys: throwAt([138, 99.4], [114, 100.8], 0.23) },
      { name: "a stone thrown 3", svg: stone(113, 100.6), keys: throwAt([113, 100.6], [139, 101.6], 0.26) },
      { name: "a stone thrown 4", svg: stone(139, 100.6), keys: throwAt([139, 100.6], [113, 101.8], 0.28) },
      { name: "stones on the ground between them", svg: stone(120, 106.4) + stone(126.4, 107.2) + stone(132, 106.2), keys: showAt(0.32, 0.34) },
      {
        name: "the one who told him: a place from Quba",
        svg: someone(teller[0], teller[1], 1.4),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.47, n(told[0] - teller[0]), n(told[1] - teller[1])],
            [0.68, n(told[0] - teller[0]), n(told[1] - teller[1])],
            [0.74, -30, n(told[1] - teller[1])],
            [0.8, -30, n(told[1] - teller[1])],
            [0.9, 0, 0]
          ],
          opacity: [
            [0.4, 0],
            [0.41, 1]
          ]
        })
      },
      { name: "its voice: telling him", svg: arcsLeft(n(told[0] - 3), n(told[1] - 4), VOICE), keys: showFor(0.47, 0.48, 0.51, 0.52), loop: speaking },
      { name: "his voice: let us go", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showFor(0.58, 0.59, 0.66, 0.67), loop: speaking },
      { name: "to make peace: a faint golden way to Quba", svg: way("M36 103 Q72 97 106 102", GOLD, 0.9), keys: showAt(0.62, 0.66) },
      { name: "to make peace between them: a soft golden ring", svg: care(126, 103.4, 10, 3.8, GOLD), keys: showAt(0.9, 0.94), loop: soft }
    ],
    words: [
      { text: "The folk of Quba fought one another", from: 0.02, to: 0.18 },
      { text: "Till they threw stones at each other", from: 0.2, to: 0.38 },
      { text: "He was told of it", from: 0.4, to: 0.56 },
      { text: "And he said: let us go", from: 0.58, to: 0.78 },
      { text: "To make peace between them", from: 0.8, to: 1 }
    ]
  };
}

/** A hand mill of two round stones, seen from above and a little in front, its middle at (x, y). */
const millStones = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y + 1.2)}" rx="5" ry="1.8" fill="#7E7A72"/><ellipse cx="${x}" cy="${y}" rx="4.4" ry="1.6" fill="#A39E94"/>` +
  `<circle cx="${x}" cy="${y}" r="0.5" fill="#5E5A52"/><ellipse cx="${n(x + 6.4)}" cy="${n(y + 1.8)}" rx="2" ry="0.7" fill="#F4ECDA"/>`;

/** The mill's handle, a peg near its edge at (x, y). */
const millPeg = (x: number, y: number) => `<rect x="${n(x - 0.4)}" y="${n(y - 2.6)}" width="0.8" height="2.6" fill="#6E5034"/>`;

/** A row of `count` small lights from x1 to x2 at height y: a count of praise. */
const lights = (x1: number, x2: number, y: number, count: number, color: string) =>
  Array.from({ length: count }, (_, i) => `<circle cx="${n(x1 + ((x2 - x1) * i) / (count - 1))}" cy="${y}" r="0.55" fill="${color}"/>`).join("");

// Better than a servant. Ali said: Fatimah complained of what the hand mill did to her. Captives came to the Prophet ﷺ,
// and she went to him, but did not find him; she found Aishah and told her. When the Prophet ﷺ came, Aishah told him,
// and he came to us when we had gone to bed. He said: shall I not teach you something better than what you asked? When
// you go to bed, say Allahu akbar thirty-four times, subhanallah thirty-three times and alhamdulillah thirty-three
// times: that is better for you both than a servant (Sahih al-Bukhari 3705). No one is drawn: by a home in Madinah, a
// hand mill turns, its handle going round, flour by it, and her place by it; a grey ring comes about the mill, and her
// voice speaks. Her place goes to his house, a grey ring at its door: not found; and comes back. Night comes, the mill
// rests, two places rest in the home on a mat, a small light in it, and his place, a golden ring, comes from his house
// to their door. His voice speaks. A row of thirty-four small lights shows over the home, the takbir, and a spark rises;
// then a row of thirty-three, the tasbih, and a row of thirty-three, the praise, each with a spark. The grey ring about
// the mill goes, and a warm glow comes over the home.
function betterThanAServant(): SignArt {
  const homeAt: [number, number] = [128, 100];
  const hisHouse: [number, number] = [28, 100];
  const mill: [number, number] = [104, 104];
  const her: [number, number] = [112.4, 103.4];
  const his: [number, number] = [34, 104.6];
  const night = track({
    opacity: [
      [0.27, 0],
      [0.3, 1]
    ]
  });
  const day = track({
    opacity: [
      [0.27, 1],
      [0.29, 0]
    ]
  });
  const row = (x1: number, y: number, from: number, to: number) => ({
    origin: { x: x1, y },
    keys: track({
      opacity: [
        [from, 0],
        [Math.round((from + 0.005) * 1000) / 1000, 1]
      ],
      scaleX: [
        [from, 0.03],
        [to, 1]
      ]
    })
  });
  return {
    kind: "better-than-a-servant",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(142, 16), keys: day },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "night: the sky dark, with stars", svg: `<rect width="160" height="62" fill="#16284C"/>` + stars([[20, 14], [44, 24], [66, 12], [92, 20], [118, 10], [146, 22], [30, 40], [80, 36], [136, 42]]), keys: night },
      { name: "night over the land", svg: `<rect y="61" width="160" height="59" fill="#0F1C3A" opacity="0.42"/>`, keys: night },
      { name: "his house", svg: home(hisHouse[0], hisHouse[1], 22, 14) },
      { name: "the home of Ali and Fatimah", svg: home(homeAt[0], homeAt[1], 26, 16) },
      { name: "a small light in the home, at night", svg: glow(n(homeAt[0] + 3.3), 89.6, 4.4, WARM, 0.4) + `<rect x="${n(homeAt[0] + 2)}" y="86.4" width="2.6" height="2.6" fill="#FFE9A8"/>`, keys: showAt(0.28, 0.31) },
      { name: "the mill's stones, and flour by them", svg: millStones(mill[0], mill[1]) },
      { name: "the mill's handle, turning", svg: millPeg(n(mill[0] + 2.8), mill[1]), loop: { move: "bob", ms: 1200, x: 2.4, y: 0.6 }, keys: day },
      { name: "the mill's handle, at rest", svg: millPeg(n(mill[0] + 2.8), mill[1]), keys: night },
      { name: "what the mill did: a grey ring about it", svg: greyRing(mill[0], n(mill[1] + 0.8), 8.4, 3), keys: showFor(0.03, 0.06, 0.87, 0.9) },
      {
        name: "Fatimah's place",
        svg: someone(her[0], her[1], 1.5),
        keys: track({
          xy: [
            [0.14, 0, 0],
            [0.165, -78, -0.6],
            [0.18, -78, -0.6],
            [0.21, 0, 0],
            [0.27, 0, 0],
            [0.3, 14.6, -2.4]
          ],
          opacity: [
            [0.28, 1],
            [0.3, 0]
          ]
        })
      },
      { name: "her voice: complaining of the mill", svg: arcsLeft(n(her[0] - 3), n(her[1] - 4.4), VOICE), keys: showFor(0.04, 0.05, 0.075, 0.08), loop: speaking },
      { name: "not found: a grey ring at his door", svg: greyRing(n(hisHouse[0] - 1.8), n(hisHouse[1] + 1), 4.2, 2), keys: showFor(0.165, 0.175, 0.205, 0.215) },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.29, 0, 0],
            [0.33, 88, -2]
          ],
          opacity: [
            [0.27, 0],
            [0.28, 1]
          ]
        })
      },
      { name: "his voice: shall I teach you better than you asked?", svg: arcs(n(his[0] + 91.4), n(his[1] - 6.4), GOLD), keys: showFor(0.39, 0.4, 0.445, 0.455), loop: speaking },
      { name: "the takbir, thirty-four: a row of small lights", svg: lights(104, 152, 72, 34, "#F2C94C"), ...row(104, 72, 0.51, 0.57) },
      { name: "the takbir: a spark rising", svg: sparkle(n(homeAt[0] - 0.4), 93.4, 1.1, "#E8A93A"), keys: sparkRising(0.53, 0.57) },
      { name: "the tasbih, thirty-three: a row of small lights", svg: lights(104, 152, 76, 33, "#DCE8F5"), ...row(104, 76, 0.63, 0.685) },
      { name: "the tasbih: a spark rising", svg: sparkle(n(homeAt[0] - 0.4), 93.4, 1.1, "#E8A93A"), keys: sparkRising(0.645, 0.685) },
      { name: "the praise, thirty-three: a row of small lights", svg: lights(104, 152, 80, 33, "#FFE9A8"), ...row(104, 80, 0.75, 0.805) },
      { name: "the praise: a spark rising", svg: sparkle(n(homeAt[0] - 0.4), 93.4, 1.1, "#E8A93A"), keys: sparkRising(0.765, 0.805) },
      { name: "better for them both: a warm glow over the home", svg: glow(homeAt[0], 100, 18, WARM, 0.3), keys: showAt(0.87, 0.91), loop: soft }
    ],
    words: [
      { text: "Fatimah complained of the hand mill", from: 0.02, to: 0.125 },
      { text: "She went to him, but did not find him", from: 0.14, to: 0.255 },
      { text: "Ali: He came to us when we had gone to bed", from: 0.27, to: 0.375 },
      { text: "Shall I teach you better than you asked?", from: 0.39, to: 0.495 },
      { text: "In bed: Allahu akbar, thirty-four times", from: 0.51, to: 0.615 },
      { text: "Subhanallah, thirty-three times", from: 0.63, to: 0.735 },
      { text: "Alhamdulillah, thirty-three times", from: 0.75, to: 0.855 },
      { text: "Better for you both than a servant", from: 0.87, to: 1 }
    ]
  };
}

/** Ripples on water about (x, y). */
const ripples = (x: number, y: number) =>
  [2.4, 4.6].map((r) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.35)}" stroke="#E8F3FB" stroke-width="0.5" fill="none"/>`).join("");

// Thumamah set free. Abu Hurairah said: horsemen the Prophet ﷺ sent toward Najd brought a man of Banu Hanifah called
// Thumamah ibn Uthal, and they tied him to one of the pillars of the masjid. The Prophet ﷺ came out to him and said:
// what do you have, Thumamah? So it was till the next day, and the day after. Then he said: set Thumamah free. He went
// to palms near the masjid and washed, then came into the masjid and said: I testify that there is no god but Allah,
// and that Muhammad is the Messenger of Allah. By Allah, there was no face on earth more hateful to me than yours, and
// now your face has become the dearest of all faces to me (Sahih al-Bukhari 4372). No one is drawn: in the masjid,
// under its roof of palm leaves on palm trunks, a place is tied by a grey cord to one of the trunks. His place, a golden
// ring, comes from his house at the side to it, and his voice asks. Night comes and goes, and again. His voice speaks;
// the cord goes, and a soft ring comes about the place. It goes out to palms near the masjid, by water, and ripples
// show: it washed. It comes back in, its voice speaks, and a spark rises: its witness. Its voice speaks again, it comes
// nearer to his place, and a warm glow comes about them both.
function thumamahFreed(): SignArt {
  const pillarX = 73.3;
  const tied: [number, number] = [77.4, 104.4];
  const his: [number, number] = [14, 104.6];
  const by: [number, number] = [64, 104.6];
  const pool: [number, number] = [137, 106.4];
  const [wx, wy] = [n(pool[0] - 4 - tied[0]), n(pool[1] - 0.6 - tied[1])];
  const nights = track({
    opacity: [
      [0.31, 0],
      [0.325, 0.55],
      [0.335, 0.55],
      [0.35, 0],
      [0.355, 0],
      [0.37, 0.55],
      [0.375, 0.55],
      [0.39, 0]
    ]
  });
  return {
    kind: "thumamah-freed",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C9E4F6", "#F1E6C8", 62) },
      { name: "the sun", svg: sun(30, 18) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid's wall of mud brick", svg: mudWall(2, 112) },
      { name: "the shade under the roof", svg: `<rect x="2" y="88.4" width="108" height="10.6" fill="#000000" opacity="0.12"/>` },
      { name: "the roof of palm leaves on palm trunks", svg: roofOnTrunks(4, 108) },
      { name: "his house, by the masjid", svg: home(12, 104, 16, 20) },
      { name: "a palm near the masjid 1", svg: palm(124, 99, 15), origin: { x: 124, y: 99 }, loop: { move: "sway", ms: 5400, angle: 1.4 } },
      { name: "a palm near the masjid 2", svg: palm(150, 98, 14), origin: { x: 150, y: 98 }, loop: { move: "sway", ms: 6000, angle: 1.4, phase: 0.4 } },
      { name: "water by the palms", svg: `<ellipse cx="${pool[0]}" cy="${pool[1]}" rx="8" ry="2.2" fill="#8CC0E6" stroke="#6AA6D8" stroke-width="0.4"/>` },
      {
        name: "the cord, tying the place to a trunk",
        svg: `<path d="M${n(pillarX + 0.9)} 101.4 Q${n(pillarX + 2.6)} 104.6 ${n(tied[0] - 1.5)} ${tied[1]}" stroke="${GREY}" stroke-width="0.6" fill="none"/><ellipse cx="${pillarX}" cy="101.4" rx="1.2" ry="0.5" stroke="${GREY}" stroke-width="0.5" fill="none"/>`,
        keys: showFor(0.03, 0.06, 0.47, 0.5)
      },
      {
        name: "Thumamah's place",
        svg: someone(tied[0], tied[1], 1.5),
        keys: track({
          xy: [
            [0.58, 0, 0],
            [0.63, wx, wy],
            [0.71, wx, wy],
            [0.75, 0, 0],
            [0.86, 0, 0],
            [0.9, -5, 0]
          ]
        })
      },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.18, n(by[0] - his[0]), 0]
          ]
        })
      },
      { name: "his voice: what do you have, Thumamah?", svg: arcs(n(by[0] + 3.4), n(by[1] - 4.4), GOLD), keys: showFor(0.18, 0.19, 0.24, 0.25), loop: speaking },
      { name: "the next day, and the day after: nights passing", svg: `<rect width="160" height="120" fill="#0F1C3A"/>`, keys: nights },
      { name: "his voice: set Thumamah free", svg: arcs(n(by[0] + 3.4), n(by[1] - 4.4), GOLD), keys: showFor(0.45, 0.46, 0.5, 0.51), loop: speaking },
      { name: "set free: a soft ring about its place", svg: care(tied[0], n(tied[1] + 0.6), 3.8, 2, VOICE), keys: showFor(0.49, 0.52, 0.58, 0.6) },
      { name: "washing: ripples in the water", svg: ripples(pool[0], pool[1]), keys: showFor(0.62, 0.64, 0.71, 0.72), loop: { move: "twinkle", ms: 1200, low: 0.3 } },
      { name: "its voice: I testify", svg: arcsLeft(n(tied[0] - 3), n(tied[1] - 4.4), VOICE), keys: showFor(0.75, 0.755, 0.785, 0.79), loop: speaking },
      { name: "its witness: a spark rising", svg: sparkle(tied[0], n(tied[1] - 4), 1.1, "#E8A93A"), keys: sparkRising(0.755, 0.79) },
      { name: "its voice: now the dearest of all to me", svg: arcsLeft(n(tied[0] - 8), n(tied[1] - 4.4), VOICE), keys: showAt(0.9, 0.91), loop: speaking },
      { name: "a warm glow about them both", svg: glow(n((by[0] + tied[0] - 5) / 2), 104, 10, WARM, 0.32), keys: showAt(0.88, 0.92), loop: soft }
    ],
    words: [
      { text: "They tied Thumamah to a masjid pillar", from: 0.02, to: 0.13 },
      { text: "What do you have, Thumamah?", from: 0.15, to: 0.29 },
      { text: "Till the next day, and the day after", from: 0.31, to: 0.43 },
      { text: "Then he said: set Thumamah free", from: 0.45, to: 0.56 },
      { text: "Thumamah washed at palms near the masjid", from: 0.58, to: 0.69 },
      { text: "Thumamah: I testify, no god but Allah", from: 0.71, to: 0.83 },
      { text: "Thumamah: your face is now dearest to me", from: 0.85, to: 1 }
    ]
  };
}

export const PEACE_ART = {
  "army-of-leaves": armyOfLeaves,
  "archers-of-aslam": archersOfAslam,
  "beyond-the-seas": beyondTheSeas,
  "half-the-debt": halfTheDebt,
  "quba-peace": qubaPeace,
  "better-than-a-servant": betterThanAServant,
  "thumamah-freed": thumamahFreed
};
