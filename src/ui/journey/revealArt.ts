import { cloud, glow, n, nightSky, palm, peaks, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { cover, crooked, GREY, prayerMat } from "./lovedArt";
import { dish } from "./worthArt";
import { food, ledge } from "./hopeArt";
import { risingSparks } from "./charityArt";
import { kabah } from "./historyArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * The first revelation and some deeds he ﷺ taught, drawn as the scenes of what he taught are (teachArt.ts): the cave of
 * Hira, where the truth came to him; Khadijah's comfort, that Allah would never disgrace him, and Waraqah's words;
 * prayer in congregation, twenty-seven degrees better than prayer alone; the last two ayat of al-Baqarah at night,
 * which are enough for whoever recites them; the one who recites the Quran well, with the noble scribes, and the one
 * who finds it hard, with two rewards; the fast of the day of Arafah, which expiates two years; and one word, which
 * raises a servant or makes him fall. Only the land, the sky, buildings, things and plants are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand or a face, and no angel: where someone went, a dashed way
 * shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the air; the truth that came in
 * the cave is only a white light. Nothing is drawn for Allah and nothing comes down from the sky: a deed or a word that
 * pleases Him is a spark rising, what He gives is a warm glow, and Jahannam is only a dark pit, with no fire.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** The path of cubic curves from `start`, each [x1, y1, x2, y2, x, y]. */
const curvePath = (start: [number, number], curves: number[][]) => `M${start[0]} ${start[1]}` + curves.map((c) => ` C${c.join(" ")}`).join("");

/**
 * Points along cubic curves from `start` (each [x1, y1, x2, y2, x, y]), `per` to each curve, as offsets from the start,
 * evenly from `from` to `to`.
 */
function along(start: [number, number], curves: number[][], from: number, to: number, per = 4): [number, number, number][] {
  const points: [number, number][] = [[0, 0]];
  let [px, py] = start;
  for (const [x1, y1, x2, y2, x, y] of curves) {
    for (let i = 1; i <= per; i += 1) {
      const t = i / per;
      const u = 1 - t;
      const bx = u * u * u * px + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x;
      const by = u * u * u * py + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y;
      points.push([bx - start[0], by - start[1]]);
    }
    [px, py] = [x, y];
  }
  return points.map(([dx, dy], i) => [at3(from + ((to - from) * i) / (points.length - 1)), n(dx), n(dy)]);
}

/** The same points gone back over, from the last to the first, evenly from `from` to `to`. */
const backOver = (points: [number, number, number][], from: number, to: number): [number, number, number][] =>
  [...points].reverse().map(([, x, y], i) => [at3(from + ((to - from) * i) / (points.length - 1)), x, y]);

/** A dark land at night, from y `top` down, with a few tufts. */
const nightLand = (top: number, tufts: [number, number][]) =>
  `<rect y="${top}" width="160" height="${120 - top}" fill="#2E3556"/><path d="M0 ${top} L160 ${top}" stroke="#454B6A" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("");

/** A home at night, darker, its foot's middle at (x, y). */
const nightHome = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#8C7350", "#77603F", "#3A2A1C");

/** The window of a home (trialArt.ts), lit. */
const litWindow = (x: number, y: number, w: number, h: number) => {
  const [wx, wy] = [n(x + 2), n(y - h + 2.4)];
  return `${glow(n(wx + 1.3), n(wy + 1.3), 4, "#FFD866", 0.16)}<rect x="${wx}" y="${wy}" width="2.6" height="2.6" fill="#FFD866"/>`;
};

/** A place at night: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** A crooked voice from (x, y), facing left (lovedArt.ts's, turned about). */
const crookedLeft = (x: number, y: number) => `<g transform="translate(${n(2 * x)} 0) scale(-1 1)">${crooked(x, y)}</g>`;

/** A voice that halts and starts: three arcs of short dashes from (x, y), facing right. */
const haltingArcs = (x: number, y: number, color = GREY) =>
  [0, 1, 2]
    .map((i) => {
      const ax = n(x + i * 2.2);
      const h = 1.6 + i * 1.1;
      return `<path d="M${ax} ${n(y - h)} Q${n(ax + h * 0.7)} ${y} ${ax} ${n(y + h)}" stroke="${color}" stroke-width="0.9" stroke-dasharray="0.9 0.9" fill="none" stroke-linecap="round"/>`;
    })
    .join("");

/** A white tent on the plain, its foot's middle at (x, y), `w` wide. */
const tent = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} L${x} ${n(y - w * 0.6)} L${n(x + w / 2)} ${y} Z" fill="#F4F1EA"/><path d="M${x} ${n(y - w * 0.6)} L${n(x + w / 2)} ${y} L${n(x + w * 0.1)} ${y} Z" fill="#000000" opacity="0.08"/>`;

// The cave of Hira. Aishah said: the revelation began for the Messenger of Allah ﷺ with good dreams in his sleep, and
// every dream he saw came true like the break of dawn. Then being alone was made dear to him: he would go alone to the
// cave of Hira and worship there for many nights, taking food with him for it, until the truth came to him while he
// was in the cave of Hira. The angel came and said: read; he ﷺ said: I am not one who reads. Then the Messenger of
// Allah ﷺ came back with it, his heart trembling (Sahih al-Bukhari 3). No angel is drawn and no one is drawn: his
// place is a golden ring at his home in Makkah; a good dream is a soft glow over the home, and its coming true is the
// light of daybreak; a dashed way goes up the mountain to the cave, and his place goes up it with a sack of food; the
// nights go by, one crescent after another, as a warm glow of worship is in the cave and rises; a white light comes in
// the cave for the truth, and the mountain is lit; a voice in the cave says read, and his voice answers; and his place
// comes back down to his home, trembling.
function caveOfHira(): SignArt {
  const start: [number, number] = [140, 106.4];
  const up = [
    [122, 109, 102, 106, 90, 97],
    [80, 89.5, 66, 72, 57.5, 63.4]
  ];
  const going = along(start, up, 0.19, 0.3);
  const coming = backOver(going, 0.85, 0.95);
  const [, endX, endY] = going[going.length - 1];
  const atCave: [number, number] = [n(start[0] + endX), n(start[1] + endY)];
  const cave: [number, number] = [52, 59.5];
  const nights = [0, 1, 2, 3, 4, 5, 6];
  return {
    kind: "cave-of-hira",
    ms: 11000,
    parts: [
      { name: "the night sky", svg: nightSky(94) },
      {
        name: "stars",
        svg: stars([
          [8, 12],
          [22, 26],
          [36, 10],
          [62, 20],
          [80, 32],
          [96, 12],
          [112, 30],
          [126, 16],
          [142, 10],
          [154, 28],
          [148, 58],
          [104, 62],
          [74, 64],
          [156, 76],
          [120, 74]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "like daybreak: the light of dawn along the land", svg: wash(80, 94, 96, 18, "#FFD9A0", 0.12), keys: showWhile(0.06, 0.1, 0.17, 0.2) },
      { name: "the land", svg: nightLand(94, [[70, 100], [96, 114], [30, 112], [150, 116]]) },
      {
        name: "the mountain of Hira",
        svg:
          peaks([[46, 60, 42]], 101, "#3B3654", false) +
          peaks([[20, 30, 20]], 101, "#34304B", false) +
          `<path d="M30 80 L38 78 L44 81 M62 86 L70 84 L76 88" stroke="#4A4566" stroke-width="0.8" fill="none" stroke-linecap="round"/>`
      },
      { name: "the cave's opening", svg: `<path d="M48.5 62.5 Q48.6 56.2 52 55.8 Q55.4 56.2 55.5 62.5 Z" fill="#15131F"/>` },
      { name: "homes of Makkah", svg: nightHome(100, 103, 12, 9) + nightHome(126, 102, 10, 8) },
      { name: "the Ka'bah", svg: kabah(110, 104, 7) },
      { name: "his home", svg: nightHome(142, 104, 16, 12) },
      { name: "a lit window in his home", svg: litWindow(142, 104, 16, 12), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "a good dream: a soft glow over his home", svg: glow(142, 87, 9, "#FFF3C4", 0.16), keys: showWhile(0.03, 0.05, 0.17, 0.19), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "his way up to the cave", svg: way(curvePath(start, up), LIGHT, 0.9), keys: showFrom(0.18, 0.2) },
      { name: "a golden ring, his place", svg: ring(start[0], start[1], 2.6, GOLD), keys: track({ xy: [...going, ...coming] }) },
      {
        name: "food for his stay, with him",
        svg: sack(n(start[0] + 4.4), n(start[1] + 1.6), 0.42),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.19, 1],
            [0.45, 1],
            [0.47, 0]
          ],
          xy: [...going, ...coming]
        })
      },
      ...nights.map(
        (i): SignPart => ({
          name: `a night of his worship ${i + 1}`,
          svg: glow(72 + 10 * i, 47, 3.4, "#FFF3C4", 0.1) + crescent(72 + 10 * i, 47, 2.2, 0.9, "#FFF3C4"),
          keys: showFrom(at3(0.36 + 0.014 * i), at3(0.37 + 0.014 * i))
        })
      ),
      { name: "his worship in the cave: a warm glow", svg: glow(cave[0], 60, 6, WARM, 0.22), keys: showFrom(0.35, 0.38), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...risingSparks("his worship, rising", [[cave[0], 55]], 0.38, 0, { stay: true, rise: 8 }),
      {
        name: "the truth, come to him in the cave: a white light",
        svg: glow(cave[0], cave[1], 8, "#FFFFFF", 0.28) + sparkle(cave[0], cave[1], 2.2, "#FFFFFF"),
        origin: { x: cave[0], y: cave[1] },
        keys: track({
          opacity: [
            [0.52, 0],
            [0.535, 1]
          ],
          scale: [
            [0.52, 0.4],
            [0.6, 1.3]
          ]
        }),
        loop: { move: "twinkle", ms: 1300, low: 0.75 }
      },
      { name: "a white light over the mountain", svg: wash(46, 72, 34, 26, "#FFFFFF", 0.05), keys: showFrom(0.56, 0.6), loop: { move: "twinkle", ms: 2200, low: 0.8 } },
      { name: "a voice in the cave: read", svg: arcsLeft(48, 58.4, "#FFFFFF"), keys: showWhile(0.69, 0.7, 0.84, 0.85), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      { name: "his voice: I am not one who reads", svg: arcs(n(atCave[0] + 3.6), n(atCave[1] - 1.2), LIGHT), keys: showWhile(0.72, 0.73, 0.84, 0.85), loop: { move: "twinkle", ms: 800, low: 0.4, phase: 0.5 } },
      {
        name: "trembling, about his place",
        svg: `<path d="M${n(atCave[0] - 4.4)} ${n(atCave[1] - 2)} q-1.2 2 0 4 M${n(atCave[0] + 4.4)} ${n(atCave[1] - 2)} q1.2 2 0 4" stroke="${LIGHT}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`,
        keys: track({
          opacity: [
            [0.85, 0],
            [0.86, 1]
          ],
          xy: coming.map(([t, x, y]): [number, number, number] => [t, n(x - endX), n(y - endY)])
        }),
        loop: { move: "bob", ms: 400, x: 0.5 }
      }
    ],
    words: [
      { text: "Good dreams that came true like daybreak", from: 0.02, to: 0.15 },
      { text: "He would go alone to the cave of Hira", from: 0.17, to: 0.33 },
      { text: "Worshipping there for many nights", from: 0.35, to: 0.5 },
      { text: "Until the truth came to him in the cave", from: 0.52, to: 0.66 },
      { text: "Read! I am not one who reads", from: 0.68, to: 0.82 },
      { text: "He came back, his heart trembling", from: 0.84, to: 1 }
    ]
  };
}

// Khadijah's comfort. He ﷺ went in to Khadijah and said: cover me, cover me; and they covered him until the fear left
// him. Khadijah said: never! By Allah, Allah will never disgrace you: you keep ties of kinship, you carry the weak, you
// help the poor and you honor the guest. Then Khadijah took him to Waraqah ibn Nawfal, her cousin, an old man who had
// lost his sight, who said: this is the Namus whom Allah sent to Musa; and no man ever came with the like of what you
// have brought but he was opposed (Sahih al-Bukhari 3). No angel is drawn and no one is drawn: at his home, his place
// is a golden ring, still trembling, and hers is a small dashed circle; his voice asks, and a soft cover comes over
// him; her voice answers, and a warm glow comes on him; golden ways go to the homes of kin, a load goes to a weak one,
// food comes on a poor one's dish, and one come to stay is welcomed; then a way goes to the old one's home, and both
// places go along it; the old one's voice answers, as the light in the cave far off grows, and goes on as crooked
// voices come from homes of Makkah; and still a soft light stays on his place.
function neverDisgrace(): SignArt {
  const his: [number, number] = [40, 105.4];
  const hers: [number, number] = [30, 105.4];
  const old: [number, number] = [145, 105.4];
  const go = 88;
  const there: [number, number, number][] = [
    [0.58, 0, 0],
    [0.65, go, 0]
  ];
  const against: [string, number, number, boolean][] = [
    ["a crooked voice from a home, against it 1", 101, 72.6, true],
    ["a crooked voice from a home, against it 2", 115, 72.2, true],
    ["a crooked voice from a home, against it 3", 149, 72.6, false]
  ];
  return {
    kind: "never-disgrace",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(80) },
      {
        name: "stars",
        svg: stars([
          [10, 14],
          [26, 30],
          [44, 12],
          [58, 34],
          [74, 18],
          [92, 10],
          [104, 32],
          [140, 16],
          [152, 36],
          [48, 56],
          [70, 64],
          [88, 50],
          [124, 56],
          [150, 62]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon", svg: `${glow(124, 24, 8, "#FFF3C4", 0.08)}${crescent(124, 24, 4.4, 1.6, "#FFF3C4")}` },
      { name: "the mountain of Hira, far off", svg: peaks([[16, 34, 20]], 80, "#34304B", false) },
      { name: "the cave far off, a soft light in it", svg: `<path d="M17.4 58.6 Q17.5 55.4 19 55.2 Q20.5 55.4 20.6 58.6 Z" fill="#15131F"/>${glow(19, 57.2, 3.4, "#FFFFFF", 0.16)}` },
      { name: "the light in the cave far off, brighter", svg: glow(19, 57.2, 8, "#FFFFFF", 0.22), keys: showFrom(0.74, 0.78), loop: { move: "twinkle", ms: 1300, low: 0.7 } },
      { name: "the land", svg: nightLand(80, [[60, 112], [10, 92], [150, 112], [88, 116], [122, 90]]) },
      { name: "homes of Makkah", svg: nightHome(62, 84, 10, 7) + nightHome(100, 84, 10, 7) + nightHome(114, 83, 9, 6) + nightHome(150, 84, 10, 7) },
      { name: "homes of kin", svg: nightHome(78, 95, 14, 10) + nightHome(94, 96, 12, 9) },
      { name: "his home", svg: nightHome(42, 102, 30, 20) },
      { name: "a lit window in his home", svg: litWindow(42, 102, 30, 20), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "the old one's home", svg: nightHome(140, 102, 20, 15) },
      { name: "a lit window in the old one's home", svg: litWindow(140, 102, 20, 15), loop: { move: "twinkle", ms: 1800, low: 0.75, phase: 0.4 } },
      { name: "the old one's place, at his home", svg: someone(old[0], old[1], 1.5, "#D6D0C6") },
      { name: "a weak one's place", svg: someone(106, 99.4, 1.4, "#A8A29A") },
      { name: "a poor one's place", svg: someone(120, 99, 1.4, "#A8A29A") },
      { name: "an empty dish by the poor one", svg: dish(120, 102) },
      { name: "a place of one come to stay", svg: someone(16, 104.4, 1.4, LIGHT) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD), keys: track({ xy: there }) },
      { name: "her place", svg: someone(hers[0], hers[1], 1.5, LIGHT), keys: track({ xy: there }) },
      {
        name: "trembling, about his place",
        svg: `<path d="M${n(his[0] - 4.4)} ${n(his[1] - 2)} q-1.2 2 0 4 M${n(his[0] + 4.4)} ${n(his[1] - 2)} q1.2 2 0 4" stroke="${LIGHT}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`,
        keys: track({
          opacity: [
            [0.07, 1],
            [0.1, 0]
          ]
        }),
        loop: { move: "bob", ms: 400, x: 0.5 }
      },
      { name: "his voice: cover me", svg: arcs(n(his[0] + 3.6), n(his[1] - 1.8), LIGHT), keys: showWhile(0.03, 0.04, 0.15, 0.16), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a soft cover over his place", svg: cover(his[0], his[1]), keys: showWhile(0.05, 0.07, 0.57, 0.59) },
      { name: "her voice: never", svg: arcs(n(hers[0] + 2.2), n(hers[1] - 2), LIGHT), keys: showWhile(0.16, 0.17, 0.29, 0.3), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a warm glow on his place", svg: glow(his[0], n(his[1] - 1), 6, WARM, 0.22), keys: showWhile(0.18, 0.22, 0.57, 0.59), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a golden way of ties to the homes of kin", svg: way(`M47 104 Q60 102 74 95.8 M47 104 Q72 104.6 92 96.8`, GOLD, 0.9), keys: showFrom(0.3, 0.33) },
      {
        name: "a load, carried for the weak one",
        svg: sack(48, 107.4, 0.45),
        keys: track({
          opacity: [
            [0.3, 0],
            [0.31, 1]
          ],
          xy: [
            [0.33, 0, 0],
            [0.37, 62, -5.4]
          ]
        })
      },
      { name: "food, given on the poor one's dish", svg: food(120, 102), keys: showFrom(0.44, 0.46) },
      { name: "food, set out for the one come to stay", svg: food(16, 107.4), keys: showFrom(0.47, 0.49) },
      { name: "a warm welcome on the one come to stay", svg: glow(16, 104.4, 5, WARM, 0.24), keys: showFrom(0.49, 0.52), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      {
        name: "the way to the old one's home",
        svg: way(`M44 107.6 L134 107.6`, LIGHT, 0.9),
        origin: { x: 44, y: 107.6 },
        keys: track({
          opacity: [
            [0.58, 0],
            [0.585, 1]
          ],
          scaleX: [
            [0.58, 0.02],
            [0.65, 1]
          ]
        })
      },
      { name: "the old one's voice: it is the one who came before", svg: arcsLeft(n(old[0] - 2.6), n(old[1] - 1.8), "#E8E2D6"), keys: showFrom(0.72, 0.73), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      ...against.map(
        ([name, x, y, right], i): SignPart => ({
          name,
          svg: right ? crooked(x, y) : crookedLeft(x, y),
          keys: showFrom(at3(0.86 + 0.012 * i), at3(0.875 + 0.012 * i)),
          loop: { move: "twinkle", ms: 900, low: 0.5, phase: i / 3 }
        })
      ),
      { name: "still, a soft light stays on his place", svg: glow(his[0] + go, n(his[1] - 1), 6, "#FFF3C4", 0.24), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Cover me! Cover me!", from: 0.02, to: 0.13 },
      { text: "Never! Allah will never disgrace you", from: 0.15, to: 0.27 },
      { text: "You keep ties, you carry the weak", from: 0.29, to: 0.41 },
      { text: "You help the poor and honor the guest", from: 0.43, to: 0.55 },
      { text: "She took him to her cousin Waraqah", from: 0.57, to: 0.69 },
      { text: "This is the angel Allah sent to Musa", from: 0.71, to: 0.83 },
      { text: "None brought the like but met hostility", from: 0.85, to: 1 }
    ]
  };
}

// Prayer together. The Prophet ﷺ said: prayer in congregation is better than the prayer of one alone by twenty-seven
// degrees (Sahih Muslim 650a, Sahih al-Bukhari 645). No one is drawn: before the masjid in Madinah, the imam's place is
// a ring and a row of places comes to pray behind it, with a warm glow over them and sparks rising; apart, by a home,
// one place prays alone on its mat, and one step shows for it; then twenty-seven golden steps rise, one degree after
// another, and a warm light comes over them.
function prayerTogether(): SignArt {
  const row = [0, 1, 2, 3, 4, 5, 6].map((i): [number, number] => [110 + 6 * i, 105.8]);
  const degrees = Array.from({ length: 27 }, (_, i) => i);
  return {
    kind: "prayer-together",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "clouds", svg: cloud(68, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms of Madinah", svg: palm(152, 82, 15) + palm(8, 84, 14), origin: { x: 80, y: 84 }, loop: { move: "sway", ms: 4400, angle: 1 } },
      { name: "the masjid", svg: madinahMasjid(104, 100, 1) },
      {
        name: "a long mat before the masjid",
        svg: `<rect x="106" y="104.2" width="44" height="3.4" rx="0.6" fill="#E9D7A6"/><rect x="107" y="104.9" width="42" height="2" rx="0.4" stroke="#C9A866" stroke-width="0.4" fill="none"/>`
      },
      { name: "the imam's place, before the row", svg: ring(128, 102.2, 2.4, GOLD) },
      ...row.map(([x, y], i): SignPart => ({ name: `a place in the row at prayer together ${i + 1}`, svg: someone(x, y, 1.4), keys: showFrom(at3(0.04 + 0.016 * i), at3(0.05 + 0.016 * i)) })),
      { name: "a warm glow over the row together", svg: wash(128, 104, 26, 5, WARM, 0.16), keys: showFrom(0.17, 0.22), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      ...risingSparks(
        "the prayer together, rising",
        [
          [116, 79],
          [128, 77],
          [140, 79]
        ],
        0.19,
        0.01,
        { stay: true, rise: 10 }
      ),
      { name: "a home, apart", svg: home(22, 104, 16, 12) },
      { name: "a prayer mat, alone", svg: prayerMat(42, 104.6), keys: showFrom(0.33, 0.35) },
      { name: "a place at prayer alone", svg: someone(42, 103, 1.4), keys: showFrom(0.34, 0.36) },
      { name: "one step, for the prayer alone", svg: `<rect x="53" y="101.2" width="4" height="2.8" fill="#C9A274"/><rect x="53" y="101.2" width="4" height="0.7" fill="#F2E6CC"/>`, keys: showFrom(0.4, 0.43) },
      ...degrees.map(
        (i): SignPart => {
          const x = n(60 + 1.4 * i);
          const top = n(101.4 - 2 * (i + 1));
          return {
            name: `a degree higher ${i + 1}`,
            svg: `<rect x="${x}" y="${top}" width="1.4" height="${n(104 - top)}" fill="${GOLD}"/><rect x="${x}" y="${top}" width="1.4" height="0.7" fill="#FFF3C0"/>`,
            keys: showFrom(at3(0.58 + 0.0105 * i), at3(0.588 + 0.0105 * i))
          };
        }
      ),
      { name: "a warm light over the degrees", svg: wash(80, 76, 26, 30, WARM, 0.1), keys: showFrom(0.88, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "Prayer in congregation is better", from: 0.02, to: 0.3 },
      { text: "Than the prayer of one alone", from: 0.32, to: 0.55 },
      { text: "By twenty-seven degrees", from: 0.57, to: 1 }
    ]
  };
}

// The last two ayat of al-Baqarah. The Prophet ﷺ said: whoever recites the last two ayat of Surat al-Baqarah at night,
// they will be enough for him (Sahih al-Bukhari 5009). No one is drawn and no page: in a home at night, a voice recites
// by a lit window, and two lights rise from it for the two ayat; the night deepens and the moon goes over; a soft light
// comes about the home, and stays till the dawn.
function twoAyatAtNight(): SignArt {
  const win: [number, number] = [83.3, 87.7];
  const moonWay: [number, number, number][] = [
    [0.33, 0, 0],
    [0.5, 40, -6],
    [0.6, 40, -6],
    [0.8, 90, -2]
  ];
  return {
    kind: "two-ayat-at-night",
    ms: 9000,
    parts: [
      { name: "the night sky", svg: nightSky(92) },
      { name: "the night, deepening", svg: `<rect width="160" height="92" fill="#070D22" opacity="0.45"/>`, keys: showFrom(0.33, 0.4) },
      {
        name: "stars",
        svg: stars([
          [8, 14],
          [24, 32],
          [40, 12],
          [56, 26],
          [104, 14],
          [118, 30],
          [134, 12],
          [150, 26],
          [12, 60],
          [146, 64],
          [62, 66],
          [102, 70]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon, going over", svg: `${glow(30, 48, 7, "#FFF3C4", 0.08)}${crescent(30, 48, 4, 1.5, "#FFF3C4")}`, keys: track({ xy: moonWay }) },
      { name: "dawn, the night gone by", svg: wash(80, 92, 92, 20, "#FFD9A0", 0.14), keys: showFrom(0.84, 0.92) },
      { name: "the land", svg: nightLand(92, [[20, 104], [140, 106], [50, 116], [116, 116]]) },
      { name: "a palm by the home", svg: palm(118, 100, 15, "#3E6E3A"), origin: { x: 118, y: 100 }, loop: { move: "sway", ms: 4600, angle: 1.5 } },
      { name: "a home at night", svg: nightHome(80, 104, 30, 20) },
      { name: "a lit window", svg: litWindow(80, 104, 30, 20), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "a voice reciting within", svg: arcs(n(win[0] + 3), win[1], "#FFE7A0"), keys: showFrom(0.04, 0.05), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...(
        [
          ["the first of the two ayat, a light rising", 0.08, 0.16, -11.3],
          ["the second of the two ayat, a light rising", 0.12, 0.2, 10.7]
        ] as [string, number, number, number][]
      ).map(
        ([name, from, to, x], i): SignPart => ({
          name,
          svg: glow(win[0], win[1], 3.4, "#FFF3C4", 0.3) + sparkle(win[0], win[1], 1.8, "#FFF3C4"),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.01), 1]
            ],
            xy: [
              [from, 0, 0],
              [to, x, -25.7]
            ]
          }),
          loop: { move: "twinkle", ms: 1300, low: 0.6, phase: i / 2 }
        })
      ),
      {
        name: "enough for him: a soft light about the home",
        svg: wash(80, 94, 26, 24, "#FFF3C4", 0.07) + `<path d="M56 104 Q56 72 80 68 Q104 72 104 104" stroke="#FFF3C4" stroke-width="0.6" fill="none" opacity="0.5"/>`,
        keys: showFrom(0.58, 0.66),
        loop: { move: "twinkle", ms: 2000, low: 0.8 }
      }
    ],
    words: [
      { text: "Whoever recites the last two ayat", from: 0.02, to: 0.3 },
      { text: "Of Surat al-Baqarah at night", from: 0.32, to: 0.55 },
      { text: "They will be enough for him", from: 0.57, to: 1 }
    ]
  };
}

// The skilled reciter. The Prophet ﷺ said: the one who recites the Quran and knows it well by heart is with the noble,
// righteous scribes; and the one who recites it and keeps at it, though it is hard for him, has two rewards (Sahih
// al-Bukhari 4937, Sahih Muslim 798a). No one is drawn, no angel and no page: on the left, a place recites on its mat
// with a smooth golden voice and a warm glow; a high place of honor shows far above, and its light goes up a golden way
// to it; on the right, another place recites with a halting voice, a grey weight of effort on it, and keeps at it
// again; and two rewards rise from it, one and then the other, and a warm glow comes on it.
function skilledReciter(): SignArt {
  return {
    kind: "skilled-reciter",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(136, 20) },
      { name: "clouds", svg: cloud(70, 24, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a palm between them", svg: palm(80, 98, 18), origin: { x: 80, y: 98 }, loop: { move: "sway", ms: 4200, angle: 2 } },
      { name: "a mat, for reciting well", svg: prayerMat(38, 104) },
      { name: "a place, reciting it well", svg: someone(38, 102.4, 1.5) },
      { name: "a smooth voice, reciting", svg: arcs(41.6, 101, GOLD), keys: showFrom(0.03, 0.05), loop: { move: "twinkle", ms: 1100, low: 0.6 } },
      { name: "knowing it well: a warm glow on it", svg: glow(38, 102, 6, WARM, 0.2), keys: showFrom(0.08, 0.14), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a high place of honor, far above", svg: glow(38, 50, 12, "#FFF6D6", 0.12) + ledge(38, 56, 14, "#FFF3C4", "#E9D8AE"), keys: showFrom(0.26, 0.32), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      { name: "a golden way up to it", svg: way(`M38 98 C35 86 41 70 38 60`, GOLD, 0.9), keys: showFrom(0.32, 0.36) },
      {
        name: "its light, going up to the high place",
        svg: glow(38, 98, 3.4, WARM, 0.3) + sparkle(38, 98, 1.8, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.33, 0],
            [0.335, 1]
          ],
          xy: [
            [0.33, 0, 0],
            [0.36, -0.6, -12],
            [0.39, 0.4, -27],
            [0.42, 0, -40]
          ]
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      },
      { name: "a mat, for reciting with effort", svg: prayerMat(118, 104) },
      { name: "a place, reciting with effort", svg: someone(118, 102.4, 1.5) },
      { name: "a halting voice, trying", svg: haltingArcs(121.6, 101), keys: showFrom(0.51, 0.52), loop: { move: "bob", ms: 500, x: 0.4 } },
      { name: "it is hard: a grey weight on it", svg: wash(118, 101, 12, 7, GREY, 0.09), keys: showFrom(0.53, 0.57) },
      { name: "keeping at it, again", svg: haltingArcs(121.6, 95.4), keys: showFrom(0.6, 0.61), loop: { move: "bob", ms: 500, x: 0.4, phase: 0.5 } },
      ...(
        [
          ["the first reward, rising", 114, 0.77, -2],
          ["the second reward, rising", 122, 0.83, 2]
        ] as [string, number, number, number][]
      ).map(
        ([name, x, from, dx], i): SignPart => ({
          name,
          svg: glow(x, 98, 3.6, WARM, 0.32) + sparkle(x, 98, 2.2, "#FFE7A0"),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.005), 1]
            ],
            xy: [
              [from, 0, 0],
              [at3(from + 0.03), dx, -28]
            ]
          }),
          loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 2 }
        })
      ),
      { name: "two rewards: a warm glow on it", svg: glow(118, 102, 7, WARM, 0.22), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "One recites the Quran, knowing it well", from: 0.02, to: 0.23 },
      { text: "He is with the noble, righteous scribes", from: 0.25, to: 0.48 },
      { text: "One keeps at it, though it is hard", from: 0.5, to: 0.73 },
      { text: "He has two rewards", from: 0.75, to: 1 }
    ]
  };
}

// The fast of Arafah. Abu Qatadah said: the Messenger of Allah ﷺ was asked about fasting on the day of Arafah, and he
// ﷺ said: it expiates the year gone by and the year to come (Sahih Muslim 1162b). No one is drawn: on the plain of
// Arafah, with its hill and white tents, a voice asks from a place, and a covered dish shows the fast, with a warm
// glow; his place is a golden ring, and his voice answers; the twelve months of the year gone by are crescents with a
// grey mark on each, and the marks go, one after another, and a soft light comes on them; then the marks on the twelve
// months of the year to come go too, and a warm light comes over the day.
function fastOfArafah(): SignArt {
  const months = (left: number): [number, number][] => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => [n(left + 8.4 * (i % 6)), i < 6 ? 46 : 54]);
  const gone = months(12);
  const toCome = months(106);
  const marks = (list: [number, number][], label: string, start: number): SignPart[] =>
    list.map(([x, y], i) => ({
      name: `${label} ${i + 1}`,
      svg: `<circle cx="${n(x - 0.4)}" cy="${n(y + 1.2)}" r="1.5" fill="${GREY}" opacity="0.85"/>`,
      keys: track({
        opacity: [
          [at3(start + 0.016 * i), 1],
          [at3(start + 0.01 + 0.016 * i), 0]
        ]
      })
    }));
  const moon = ([x, y]: [number, number]) => crescent(x, y, 2.2, 0.9, "#E9C766");
  return {
    kind: "fast-of-arafah",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(80, 22) },
      { name: "clouds", svg: cloud(40, 26, 0.3, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a hill on the plain of Arafah", svg: peaks([[80, 17, 20]], 100, "#B39A72", false) + `<path d="M72 94 L76 92 L80 94 M84 90 L88 92" stroke="#9C8460" stroke-width="0.7" fill="none"/>` },
      { name: "white tents on the plain", svg: tent(30, 99, 7) + tent(42, 100, 6) + tent(118, 100, 6) + tent(130, 99, 7) + tent(144, 100, 6), loop: { move: "bob", ms: 3000, y: -0.2 } },
      { name: "the year gone by: its twelve months together", svg: `<rect x="5" y="40.4" width="56" height="19.2" rx="3" fill="#FFFFFF" opacity="0.4"/>` },
      { name: "the year to come: its twelve months together", svg: `<rect x="99" y="40.4" width="56" height="19.2" rx="3" fill="#FFFFFF" opacity="0.4"/>` },
      ...gone.map(([x, y], i): SignPart => ({ name: `a month of the year gone by ${i + 1}`, svg: moon([x, y]) })),
      ...toCome.map(([x, y], i): SignPart => ({ name: `a month of the year to come ${i + 1}`, svg: moon([x, y]) })),
      ...marks(gone, "a grey mark on a month gone by", 0.33),
      ...marks(toCome, "a grey mark on a month to come", 0.63),
      { name: "the year gone by, made clean: a soft light", svg: wash(33, 50, 26, 10, "#FFF6D6", 0.14), keys: showFrom(0.52, 0.56), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "the year to come, made clean: a soft light", svg: wash(127, 50, 26, 10, "#FFF6D6", 0.14), keys: showFrom(0.82, 0.86), loop: { move: "twinkle", ms: 1800, low: 0.8, phase: 0.5 } },
      { name: "a place, asking", svg: someone(50, 106.4) },
      { name: "a voice asking about the fast", svg: arcs(53.6, 104.6, VOICE), keys: showWhile(0.03, 0.04, 0.32, 0.33), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a golden ring, his place", svg: ring(110, 106.8, 2.8, GOLD) },
      { name: "his voice, answering", svg: arcsLeft(106.4, 104.8, VOICE), keys: showFrom(0.33, 0.34), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "a dish, covered: the fast", svg: dish(80, 108) + cover(80, 106.6), keys: showFrom(0.1, 0.13) },
      { name: "a warm glow on the fast", svg: glow(80, 105.6, 6, WARM, 0.2), keys: showFrom(0.15, 0.2), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a warm light over the day", svg: wash(80, 80, 80, 30, WARM, 0.06), keys: showFrom(0.88, 0.94), loop: { move: "twinkle", ms: 2200, low: 0.8 } }
    ],
    words: [
      { text: "He was asked about fasting on Arafah", from: 0.02, to: 0.3 },
      { text: "It expiates the year gone by", from: 0.32, to: 0.6 },
      { text: "And the year to come", from: 0.62, to: 1 }
    ]
  };
}

// One word. The Prophet ﷺ said: a servant may say a word that pleases Allah, paying it no mind, and by it Allah raises
// him by degrees; and a servant may say a word that angers Allah, paying it no mind, and by it he falls into Jahannam
// (Sahih al-Bukhari 6478). No one is drawn, and no fire: on the left, a place says a good word, a golden voice, and a
// spark rises from it; it walks on, thinking little of it; golden steps show, one above another, and it goes up them,
// and a warm glow comes on it; on the right, another place says a word that angers, a crooked voice, and a dark blot
// comes on it; it walks on, thinking little of it; a dark pit opens before it, it falls into the pit, and the dark
// rises from it.
function oneWord(): SignArt {
  const good: [number, number] = [26, 104];
  const bad: [number, number] = [108, 104];
  const steps = [0, 1, 2, 3, 4];
  const climbing: [number, number, number][] = [
    [0.13, 0, 0],
    [0.19, 8, 0],
    [0.34, 8, 0],
    [0.36, 15, -6.5],
    [0.38, 21, -11.5],
    [0.4, 27, -16.5],
    [0.42, 33, -21.5],
    [0.44, 39, -26.5]
  ];
  const falling: [number, number, number][] = [
    [0.6, 0, 0],
    [0.67, 10, 0],
    [0.8, 10, 0],
    [0.83, 18, 1.6],
    [0.88, 18, 8]
  ];
  const pit: [number, number] = [126, 106];
  const above = { x: 96, y: 60, w: 60, h: 46.4 };
  return {
    kind: "one-word",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(80, 20) },
      { name: "clouds", svg: cloud(120, 26, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a palm", svg: palm(152, 92, 15), origin: { x: 152, y: 92 }, loop: { move: "sway", ms: 4400, angle: 2 } },
      ...steps.map(
        (i): SignPart => ({
          name: `a rank higher ${i + 1}`,
          svg: `<rect x="${38 + 6 * i}" y="${104 - 5 * (i + 1)}" width="6" height="${5 * (i + 1)}" fill="${GOLD}"/><rect x="${38 + 6 * i}" y="${104 - 5 * (i + 1)}" width="6" height="0.9" fill="#FFF3C0"/>`,
          keys: showFrom(at3(0.26 + 0.015 * i), at3(0.27 + 0.015 * i))
        })
      ),
      { name: "a place, saying a good word", svg: someone(good[0], good[1]), keys: track({ xy: climbing }) },
      { name: "a good word, spoken: a golden voice", svg: arcs(n(good[0] + 3.6), n(good[1] - 1.6), GOLD), keys: showWhile(0.03, 0.04, 0.25, 0.26), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks("the good word, rising: it pleases", [[n(good[0] + 6), 98]], 0.06, 0, { stay: true, rise: 14 }),
      { name: "raised: a warm glow on it", svg: glow(good[0] + 39, good[1] - 26.5, 6, WARM, 0.25), keys: showFrom(0.42, 0.45), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a dark pit, opening before it", svg: `<ellipse cx="${pit[0]}" cy="${pit[1]}" rx="7" ry="2.6" fill="#1C1612"/><ellipse cx="${pit[0]}" cy="${n(pit[1] - 0.6)}" rx="6" ry="1.6" fill="#0E0A08"/>`, origin: { x: pit[0], y: pit[1] }, keys: track({ opacity: [[0.76, 0], [0.77, 1]], scale: [[0.76, 0.1], [0.8, 1]] }) },
      {
        name: "another place, saying a word that angers",
        svg: someone(bad[0], bad[1]),
        clip: above,
        keys: track({
          xy: falling,
          opacity: [
            [0.86, 1],
            [0.9, 0]
          ]
        })
      },
      { name: "a word that angers, spoken: a crooked voice", svg: crooked(n(bad[0] + 3.6), n(bad[1] - 1.6)), keys: showWhile(0.51, 0.52, 0.75, 0.76), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      {
        name: "a dark blot on it",
        svg: glow(bad[0], n(bad[1] - 0.6), 4.6, "#3A2E28", 0.2),
        clip: above,
        keys: track({
          opacity: [
            [0.54, 0],
            [0.57, 1],
            [0.86, 1],
            [0.9, 0]
          ],
          xy: falling
        })
      },
      { name: "the dark, rising from the pit", svg: wash(pit[0], n(pit[1] - 2), 16, 8, "#1C1612", 0.12), keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 1600, low: 0.7 } }
    ],
    words: [
      { text: "A servant says a word that pleases Allah", from: 0.02, to: 0.23 },
      { text: "He pays it no mind; Allah raises him ranks", from: 0.25, to: 0.48 },
      { text: "A servant says a word that angers Allah", from: 0.5, to: 0.73 },
      { text: "He pays it no mind; he falls in Jahannam", from: 0.75, to: 1 }
    ]
  };
}

export const REVEAL_ART = {
  "cave-of-hira": caveOfHira,
  "never-disgrace": neverDisgrace,
  "prayer-together": prayerTogether,
  "two-ayat-at-night": twoAyatAtNight,
  "skilled-reciter": skilledReciter,
  "fast-of-arafah": fastOfArafah,
  "one-word": oneWord
};
