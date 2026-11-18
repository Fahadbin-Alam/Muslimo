import { cloud, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { kabah } from "./historyArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, wash } from "./worshipArt";
import { care, DAWN, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor } from "./roadArt";
import { at3 } from "./storyArt";
import { lookLine } from "./truthArt";
import { jar } from "./tradeArt";
import { dish } from "./worthArt";

/**
 * Sweet: Jabir's father was martyred and left six daughters and some debts; at the time of the dates he went round the
 * biggest heap three times and sat over it, and kept on measuring and giving the creditors, till Allah cleared all the
 * debts, and the heap where he sat looked as if not a single date had been taken. Jabir knocked on his door about that
 * debt: who is that? I. I, I? as if he disliked it. Aishah said he used to love sweet edible things and honey. There
 * is healing in black cumin for all diseases except death, Abu Hurairah heard him say; and four words, Exalted is
 * Allah, all praise is due to Allah, there is no god but Allah, and Allah is the Greatest, are dearer to him than
 * anything over which the sun rises. In the Tawaf of the Ka'bah he did Ramal in the first three rounds and walked in
 * the last four, Ibn Umar said; and whenever he spoke a sentence, Anas said, he repeated it thrice so that the people
 * could understand it properly from him. Only the land, the sky, buildings, things, plants and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face: where someone was, a ring or a
 * small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing comes
 * down from the sky: what is good is a light, glints and a soft golden ring, and what was disliked a grey ring. No
 * name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number, sunY = 20): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, sunY) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 112], [64, 115], [112, 113], [150, 114]]) => landOf(tufts, fill);

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A picture made `s` times bigger about the point (x, y). */
const bigger = (svg: string, x: number, y: number, s: number) => `<g transform="translate(${n(x * (1 - s))} ${n(y * (1 - s))}) scale(${s})">${svg}</g>`;

/** A picture turned about the upright line through x `cx`. */
const turned = (svg: string, cx: number) => `<g transform="translate(${n(cx * 2)} 0) scale(-1 1)">${svg}</g>`;

/** A heap of dates: a low mound `w` wide and `h` high, its foot's middle at (x, y), with rows of dates over it. */
const dateHeap = (x: number, y: number, w: number, h: number) => {
  let out =
    `<ellipse cx="${n(x + 0.8)}" cy="${n(y + 0.4)}" rx="${n(w / 2 + 1)}" ry="1.4" fill="#000000" opacity="0.1"/>` +
    `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - 2 * h)} ${n(x + w / 2)} ${y} Z" fill="#7A3C1A"/>`;
  [0.16, 0.42, 0.66, 0.86].forEach((f, row) => {
    const half = (w / 2) * Math.sqrt(1 - f) * 0.8;
    const count = Math.max(1, Math.round((half * 2) / 2.8));
    for (let i = 0; i < count; i += 1) {
      const dx = count === 1 ? 0 : -half + (2 * half * i) / (count - 1);
      const dy = -f * h + (i % 2 ? 0.3 : -0.2);
      out += `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="1" ry="0.62" fill="${(row + i) % 2 ? "#5A2810" : "#9C5428"}"/>`;
    }
  });
  return out;
};

/** A measure of wood heaped with dates, its foot's middle at (x, y). */
const measure = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} L${n(x - 2.1)} ${n(y - 2.8)} L${n(x + 2.1)} ${n(y - 2.8)} L${n(x + 1.6)} ${y} Z" fill="#A87444"/>` +
  `<path d="M${n(x - 2.1)} ${n(y - 2.8)} Q${x} ${n(y - 4.8)} ${n(x + 2.1)} ${n(y - 2.8)} Z" fill="#6E3418"/>` +
  `<path d="M${n(x - 1.9)} ${n(y - 1.3)} L${n(x + 1.9)} ${n(y - 1.3)}" stroke="#86552C" stroke-width="0.35"/>`;

/** Knocks on a door: three short arcs going out to the left from (x, y). */
const knocks = (x: number, y: number) =>
  [0, 1, 2]
    .map((i) => {
      const ax = n(x - 1 - i * 1.4);
      const h = 0.9 + i * 0.7;
      return `<path d="M${ax} ${n(y - h)} Q${n(ax - h * 0.6)} ${y} ${ax} ${n(y + h)}" stroke="#7A5A3A" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;
    })
    .join("");

/** A dish of sweet things: small soft pieces of halwa, golden, on a dish, its middle at (x, y). */
const sweets = (x: number, y: number) =>
  dish(x, y) +
  (
    [
      [-2.1, -1.8],
      [0.1, -2],
      [2.2, -1.7],
      [-1, -3],
      [1.2, -3.1]
    ] as [number, number][]
  )
    .map(([dx, dy], i) => `<rect x="${n(x + dx - 0.8)}" y="${n(y + dy - 0.6)}" width="1.6" height="1.2" rx="0.4" fill="${i % 2 ? "#D49A4C" : "#EBC274"}"/>`)
    .join("");

/** A jar of honey, `s` times its size, its foot's middle at (x, y), golden honey at its mouth and down its side. */
const honeyJar = (x: number, y: number, s = 1) =>
  jar(x, y, s, "#B9773C") +
  `<ellipse cx="${x}" cy="${n(y - 8 * s)}" rx="${n(1.5 * s)}" ry="${n(0.45 * s)}" fill="#F2B632"/>` +
  `<path d="M${n(x + 1.2 * s)} ${n(y - 7.8 * s)} Q${n(x + 2 * s)} ${n(y - 6.6 * s)} ${n(x + 1.7 * s)} ${n(y - 5.4 * s)}" stroke="#F2B632" stroke-width="${n(0.6 * s)}" fill="none" stroke-linecap="round"/>`;

/** A small bee, its middle at (x, y), its wings over it. */
const littleBee = (x: number, y: number) =>
  `<ellipse cx="${n(x - 0.4)}" cy="${n(y - 1.2)}" rx="0.9" ry="0.6" fill="#FFFFFF" opacity="0.85"/><ellipse cx="${n(x + 0.5)}" cy="${n(y - 1.1)}" rx="0.7" ry="0.5" fill="#FFFFFF" opacity="0.7"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="0.85" fill="#F2B632"/>` +
  `<path d="M${n(x - 0.3)} ${n(y - 0.8)} L${n(x - 0.3)} ${n(y + 0.8)} M${n(x + 0.5)} ${n(y - 0.75)} L${n(x + 0.5)} ${n(y + 0.75)}" stroke="#2B2B2B" stroke-width="0.35"/>` +
  `<circle cx="${n(x + 1.3)}" cy="${n(y - 0.1)}" r="0.45" fill="#2B2B2B"/>`;

/** A black cumin plant, its foot at (x, y), `h` high: a thin stem, fine leaves, and on top a pale blue flower or a
 * round pod with its little horns; `s` times the size of its leaves and head. */
const cumin = (x: number, y: number, h: number, pod: boolean, s = 1.5) => {
  const top = n(y - h);
  const k = (v: number) => n(v * s);
  const leaves = [0.3, 0.55]
    .map((f) => {
      const ly = n(y - h * f);
      return `<path d="M${x} ${ly} Q${n(x - k(2.2))} ${n(ly - k(1.4))} ${n(x - k(3.2))} ${n(ly - k(0.4))} M${x} ${ly} Q${n(x + k(2.2))} ${n(ly - k(1.6))} ${n(x + k(3))} ${n(ly - k(0.6))} M${n(x - k(1.6))} ${n(ly - k(1))} L${n(x - k(2))} ${n(ly - k(2.2))} M${n(x + k(1.6))} ${n(ly - k(1.1))} L${n(x + k(2.1))} ${n(ly - k(2.3))}" stroke="#6E9A48" stroke-width="${k(0.3)}" fill="none"/>`;
    })
    .join("");
  const cy = n(top - k(1.6));
  const head = pod
    ? `<ellipse cx="${x}" cy="${cy}" rx="${k(1.7)}" ry="${k(1.9)}" fill="#B9C98A"/>` +
      `<path d="M${n(x - k(0.8))} ${n(cy - k(1.6))} L${n(x - k(0.8))} ${n(cy + k(1.5))} M${n(x + k(0.8))} ${n(cy - k(1.6))} L${n(x + k(0.8))} ${n(cy + k(1.5))}" stroke="#93A866" stroke-width="${k(0.25)}"/>` +
      `<path d="M${n(x - k(0.9))} ${n(cy - k(1.8))} L${n(x - k(1.4))} ${n(cy - k(3))} M${x} ${n(cy - k(1.9))} L${x} ${n(cy - k(3.2))} M${n(x + k(0.9))} ${n(cy - k(1.8))} L${n(x + k(1.4))} ${n(cy - k(3))}" stroke="#93A866" stroke-width="${k(0.25)}"/>`
    : [0, 72, 144, 216, 288]
        .map((deg) => {
          const r = (deg * Math.PI) / 180;
          const px = n(x + Math.cos(r) * k(1.3));
          const py = n(cy + 0.2 + Math.sin(r) * k(1.3));
          return `<ellipse cx="${px}" cy="${py}" rx="${k(1)}" ry="${k(0.7)}" fill="#C9DBF2" transform="rotate(${deg} ${px} ${py})"/>`;
        })
        .join("") + `<circle cx="${x}" cy="${n(cy + 0.2)}" r="${k(0.6)}" fill="#7A9A5A"/>`;
  return `<path d="M${x} ${y} L${x} ${top}" stroke="#6E9A48" stroke-width="${k(0.35)}"/>${leaves}${head}`;
};

/** Where a cumin pod's middle is, for a plant at (x, y), `h` high, `s` times its size. */
const podAt = (x: number, y: number, h: number, s = 1.5): [number, number] => [x, n(y - h - 1.6 * s)];

/** Black seeds, small and angled, about (x, y). */
const blackSeeds = (x: number, y: number, list: [number, number][]) =>
  list.map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.5" ry="0.32" fill="#1E1E1E"/>`).join("");

/** The Black Stone in its frame of silver, its middle at (x, y). */
const blackStone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="1.6" fill="#2A2A2A" stroke="#C9CED4" stroke-width="0.6"/>`;

/** Keys of a place going round the ellipse about (cx, cy), `rx` by `ry`, from angle `start` (degrees, turning the way
 * the angle falls), `rounds` times in `steps` steps each, from `from` with `step` between points; held before and after. */
const goingRound = (cx: number, cy: number, rx: number, ry: number, start: number, rounds: number, steps: number, from: number, step: number) => {
  const at = (deg: number): [number, number] => [cx + rx * Math.cos((deg * Math.PI) / 180), cy + ry * Math.sin((deg * Math.PI) / 180)];
  const [x0, y0] = at(start);
  const points: [number, number, number][] = [];
  for (let k = 0; k <= rounds * steps; k += 1) {
    const [x, y] = at(start - (360 / steps) * k);
    points.push([at3(from + step * k), n(x - x0), n(y - y0)]);
  }
  return { start: [n(x0), n(y0)] as [number, number], points };
};

// The biggest heap. Jabir ibn Abdullah al-Ansari said: my father was martyred on the day of Uhud and left six daughters
// and some debts to be paid. At the time of plucking the dates, the Prophet ﷺ said: go and collect the various kinds
// of dates and place them separately in heaps. On seeing him, the creditors started claiming their rights pressingly;
// he went round the biggest heap three times and sat over it, and said: call your companions. Then he kept on
// measuring and giving them, till Allah cleared all my father's debts. By Allah, all the heaps were complete, and I
// looked at the heap where he was sitting, as if not a single date had been taken (Sahih al-Bukhari 2781). No one is
// drawn: by Jabir's home among the palms, Jabir's place, and the heaps of dates, each kind on its own. Jabir's voice
// speaks; six small places show by the home, a grey ring of the debts comes about it, and the creditors' places come
// from the right. His place, a golden ring, goes round the biggest heap three times, a glint for each round, and then
// it is on top of the heap. Measures of dates go from the heap to the creditors' places, one after another; the grey
// ring goes, the creditors go away with their dates, and a warm light comes about the home. Jabir's voice speaks again,
// a faint line goes from Jabir's place to the heap where he sits, and glints and a soft golden ring come about the
// heap, as full as it was.
function theBiggestHeap(): SignArt {
  const heap: [number, number, number, number] = [84, 106, 26, 10];
  const jabir: [number, number] = [38, 111];
  const round = goingRound(84, 104.6, 18, 5, 180, 3, 8, 0.265, 0.006);
  const roundEnd = (k: number) => at3(0.265 + 0.006 * 8 * k);
  const creditors: [number, number][] = [
    [134, 103.4],
    [142, 108.2],
    [150, 103.8]
  ];
  const creditorKeys = track({
    opacity: [
      [0.14, 0],
      [0.15, 1],
      [0.645, 1],
      [0.665, 0]
    ],
    xy: [
      [0.14, 30, 0],
      [0.2, 0, 0],
      [0.61, 0, 0],
      [0.665, 36, 0]
    ]
  });
  const from: [number, number] = [97, 105];
  const measured = (i: number): SignPart => {
    const [cx, cy] = creditors[i];
    const to: [number, number] = [n(cx - 3.4), n(cy + 2.6)];
    const [dx, dy] = [n(to[0] - from[0]), n(to[1] - from[1])];
    const start = at3(0.475 + 0.025 * i);
    return {
      name: `measuring and giving: a measure of dates ${i + 1}`,
      svg: measure(from[0], from[1]),
      keys: track({
        opacity: [
          [start, 0],
          [at3(start + 0.005), 1],
          [0.645, 1],
          [0.665, 0]
        ],
        xy: [
          [at3(start + 0.005), 0, 0],
          [at3(start + 0.013), n(dx / 2), n(dy / 2 - 6)],
          [at3(start + 0.021), dx, dy],
          [0.61, dx, dy],
          [0.665, n(dx + 36), dy]
        ]
      })
    };
  };
  return {
    kind: "the-biggest-heap",
    ms: 12000,
    parts: [
      ...daySky(132, 52, 12000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#DCC394", [[10, 116], [60, 117], [104, 116.4], [148, 116]]) },
      ...palms([
        [62, 85, 17],
        [100, 84, 19],
        [6, 101, 24]
      ]),
      { name: "Jabir's home", svg: home(24, 99, 24, 16) },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.6) },
      { name: "Jabir's voice: martyred, and left debts", svg: arcs(n(jabir[0] + 2.6), n(jabir[1] - 3.4), ITS_VOICE), keys: showFor(0.03, 0.04, 0.2, 0.207), loop: speaking },
      {
        name: "left behind: six small places by the home",
        svg: (
          [
            [13, 103.6],
            [19, 103.4],
            [25, 103.8],
            [10, 107.6],
            [16, 107.8],
            [22, 107.4]
          ] as [number, number][]
        )
          .map(([x, y]) => someone(x, y, 1.1))
          .join(""),
        keys: showAt(0.14, 0.16)
      },
      { name: "some debts: a grey ring about the home", svg: greyRing(22, 101.4, 17, 6), keys: showFor(0.17, 0.19, 0.61, 0.64) },
      { name: "the creditors' places, coming for the debts", svg: creditors.map(([x, y]) => someone(x, y, 1.4)).join(""), keys: creditorKeys },
      { name: "heaps of dates, each kind on its own", svg: dateHeap(54, 106, 15, 5.4) + dateHeap(116, 106, 15, 5.4) },
      { name: "his place, a golden ring, going round the biggest heap", svg: ring(...round.start, 2.4, GOLD), keys: track({ opacity: [[0.259, 0], [0.265, 1], [0.409, 1], [0.415, 0]], xy: round.points }) },
      { name: "the biggest heap of dates", svg: dateHeap(...heap) },
      ...[1, 2, 3].map(
        (k): SignPart => ({
          name: `three times: a glint for round ${k}`,
          svg: sparkle(78 + (k - 1) * 6, 116.4, 1.1, "#FFE07A"),
          keys: showAt(at3(roundEnd(k) - 0.005), roundEnd(k)),
          loop: twinkle()
        })
      ),
      { name: "sat over it: his place, a golden ring, on the heap", svg: ring(84, 94.8, 2.4, GOLD), keys: showAt(0.409, 0.417) },
      measured(0),
      measured(1),
      measured(2),
      { name: "the debts cleared: a warm light about the home", svg: wash(22, 98, 18, 8, "#FFE9B0", 0.16), keys: showAt(0.63, 0.67), loop: soft },
      { name: "Jabir's voice: I looked at the heap", svg: arcs(n(jabir[0] + 2.6), n(jabir[1] - 3.4), ITS_VOICE), keys: showFor(0.73, 0.74, 0.95, 0.96), loop: speaking },
      { name: "a faint line from Jabir's place to the heap where he sits", svg: lookLine(n(jabir[0] + 1.6), n(jabir[1] - 1.6), 81, 95.8, 90, SOFT_GOLD), keys: showAt(0.735, 0.765) },
      {
        name: "not a single date taken: glints over the biggest heap",
        svg: glints([
          [76, 101.6],
          [84, 99.2],
          [92, 101.8],
          [80, 104.4],
          [89, 104.6]
        ]),
        keys: showAt(0.86, 0.88),
        loop: twinkle()
      },
      { name: "a soft golden ring about the biggest heap", svg: care(84, 104.6, 16, 4.6, GOLD), keys: showAt(0.88, 0.91), loop: soft },
      {
        name: "all the heaps complete: glints over the other heaps",
        svg: glints([
          [52, 102.6],
          [57, 104.2],
          [114, 102.6],
          [119, 104.2]
        ]),
        keys: showAt(0.9, 0.93),
        loop: twinkle(1500)
      }
    ],
    words: [
      { text: "Jabir: my father was martyred", from: 0.02, to: 0.125 },
      { text: "and left six daughters and some debts.", from: 0.137, to: 0.247 },
      { text: "He went round the biggest heap three times", from: 0.259, to: 0.459 },
      { text: "Then he kept measuring and giving them,", from: 0.471, to: 0.591 },
      { text: "till Allah cleared all my father's debts.", from: 0.603, to: 0.713 },
      { text: "I looked at the heap where he was sitting,", from: 0.725, to: 0.84 },
      { text: "as if not a single date had been taken.", from: 0.852, to: 1 }
    ]
  };
}

// Who is that? Jabir said: I came to the Prophet ﷺ regarding my father's debt. When I knocked on the door, he asked:
// who is that? I replied: I. He said: I, I? as if he disliked it (Sahih al-Bukhari 6250). No one is drawn: his home,
// with a soft golden light at its window, for he is within, and Jabir's place. Jabir's voice speaks, and Jabir's place
// goes up to the door. Knocks go out from the door; his voice asks from within, and Jabir's voice answers. His voice
// speaks twice: I, I? Jabir's answer shows again, faint, and a grey ring comes about it, as if he disliked it.
function whoIsThat(): SignArt {
  const start: [number, number] = [30, 108];
  const atDoor: [number, number] = [97, 103.6];
  const answer: [number, number] = [n(atDoor[0] + 2.6), n(atDoor[1] - 3.4)];
  return {
    kind: "who-is-that",
    ms: 8000,
    parts: [
      ...daySky(30, 60, 8000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([
        [148, 101, 26],
        [10, 98, 22]
      ]),
      { name: "homes of Madinah, far off", svg: home(20, 84, 12, 8) + home(36, 82.6, 10, 7) + home(54, 84.4, 11, 7.4) },
      { name: "the way to his door", svg: way(`M${start[0]} ${n(start[1] + 0.6)} Q64 110.4 ${n(atDoor[0] - 1)} ${n(atDoor[1] + 0.8)}`, "#EFE2C4") },
      { name: "his home", svg: home(110, 100, 34, 24) },
      { name: "he is within: a soft golden light at the window", svg: glow(113.3, 79.7, 3.4, "#FFE7A0", 0.34), loop: soft },
      { name: "Jabir's place", svg: someone(start[0], start[1], 1.6), keys: track({ xy: [[0.17, 0, 0], [0.255, n(atDoor[0] - start[0]), n(atDoor[1] - start[1])]] }) },
      { name: "Jabir's voice: I came to him", svg: arcs(n(start[0] + 2.6), n(start[1] - 3.4), ITS_VOICE), keys: showFor(0.03, 0.04, 0.1, 0.11), loop: speaking },
      { name: "knocking on the door: knocks going out from it", svg: knocks(106, 97), keys: showFor(0.32, 0.33, 0.38, 0.39), loop: speaking },
      { name: "his voice from within: who is that?", svg: turned(arcs(103.4, 94.6, GOLD), 103.4), keys: showFor(0.42, 0.43, 0.53, 0.54), loop: speaking },
      { name: "Jabir's voice: I", svg: arcs(...answer, ITS_VOICE), keys: showFor(0.55, 0.56, 0.6, 0.61), loop: speaking },
      {
        name: "his voice from within, twice: I, I?",
        svg: turned(arcs(103.4, 94.6, GOLD), 103.4),
        keys: track({
          opacity: [
            [0.67, 0],
            [0.675, 1],
            [0.7, 1],
            [0.705, 0],
            [0.715, 0],
            [0.72, 1],
            [0.75, 1],
            [0.755, 0]
          ]
        })
      },
      { name: "as if he disliked it: Jabir's answer again, faint", svg: `<g opacity="0.55">${arcs(...answer, ITS_VOICE)}</g>`, keys: showAt(0.82, 0.84) },
      { name: "a grey ring about Jabir's answer", svg: greyRing(n(answer[0] + 2.2), answer[1], 4.4, 4.6), keys: showAt(0.84, 0.87) }
    ],
    words: [
      { text: "Jabir: I came to him", from: 0.02, to: 0.15 },
      { text: "regarding my father's debt.", from: 0.165, to: 0.3 },
      { text: "When I knocked on the door, he asked:", from: 0.315, to: 0.48 },
      { text: "Who is that? I replied: I.", from: 0.495, to: 0.65 },
      { text: "He said: I, I?", from: 0.665, to: 0.8 },
      { text: "as if he disliked it.", from: 0.815, to: 1 }
    ]
  };
}

// Sweet things and honey. Aishah said: the Messenger of Allah ﷺ used to love sweet edible things and honey (Sahih
// al-Bukhari 5431). No one is drawn: by his home in Madinah, his place, a golden ring, and Aishah's place. Aishah's
// voice speaks, and a warm light comes about his place. A dish of sweet things shows by the home, with glints; a jar of
// honey, golden at its mouth, with glints, and a small bee comes and hovers over it; a soft golden ring comes about the
// sweet things and the honey.
function sweetThingsAndHoney(): SignArt {
  const his: [number, number] = [92, 106.4];
  const plate: [number, number] = [108, 111];
  const honey: [number, number] = [129, 113];
  return {
    kind: "sweet-things-and-honey",
    ms: 6000,
    parts: [
      ...daySky(132, 40, 6000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[18, 112], [64, 115], [152, 116]]) },
      ...palms([[14, 100, 26]]),
      { name: "his home in Madinah", svg: home(64, 98, 36, 24) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Aishah's place", svg: someone(42, 108.4, 1.6) },
      { name: "Aishah's voice: he used to love", svg: arcs(44.6, 105, ITS_VOICE), keys: showFor(0.03, 0.04, 0.37, 0.38), loop: speaking },
      { name: "he used to love: a warm light about his place", svg: wash(his[0], his[1], 9, 3.6, "#FFE9B0", 0.22), keys: showAt(0.2, 0.26), loop: soft },
      { name: "sweet edible things: a dish of halwa", svg: bigger(sweets(plate[0], plate[1]), plate[0], plate[1], 1.6), keys: showAt(0.47, 0.51) },
      {
        name: "glints over the sweet things",
        svg: glints([
          [n(plate[0] - 4), n(plate[1] - 7)],
          [n(plate[0] + 4.4), n(plate[1] - 6.6)]
        ]),
        keys: showAt(0.53, 0.56),
        loop: twinkle()
      },
      { name: "and honey: a jar of honey", svg: honeyJar(honey[0], honey[1], 1.6), keys: showAt(0.62, 0.66) },
      {
        name: "glints over the honey",
        svg: glints([
          [n(honey[0] - 3.4), n(honey[1] - 15)],
          [n(honey[0] + 5), n(honey[1] - 10)]
        ]),
        keys: showAt(0.68, 0.71),
        loop: twinkle()
      },
      { name: "a small bee over the honey", svg: bigger(littleBee(n(honey[0] + 6), n(honey[1] - 18)), n(honey[0] + 6), n(honey[1] - 18), 1.5), keys: showAt(0.72, 0.75), loop: { move: "bob", ms: 700, x: 1.4, y: 1 } },
      { name: "a soft golden ring about the sweet things and the honey", svg: care(119, 111.8, 20, 5.4, GOLD), keys: showAt(0.82, 0.86), loop: soft }
    ],
    words: [
      { text: "Aishah: he used to love", from: 0.02, to: 0.42 },
      { text: "sweet edible things and honey.", from: 0.45, to: 1 }
    ]
  };
}

// Healing in black cumin. Abu Hurairah said: I heard the Messenger of Allah ﷺ saying: there is healing in black cumin
// for all diseases except death (Sahih al-Bukhari 5688). No one is drawn: by the homes of Madinah, the places of some
// who are ill, a grey haze about each; his place, a golden ring, and Abu Hurairah's place; and a patch of black cumin,
// some in pale blue flower, some with their round pods. Abu Hurairah's voice speaks, and his. The pods open, their
// black seeds within; seeds go from a pod into a dish, and glints and a soft light come about the black seeds. Then
// the grey haze lifts from each place of one who is ill, one after another, and a warm light comes about it.
function healingInBlackCumin(): SignArt {
  const ill: [number, number][] = [
    [12, 104.6],
    [28, 107.6],
    [44, 104.2]
  ];
  const seedsDish: [number, number] = [96, 115];
  const pods: [number, number, number][] = [
    [114, 112.6, 14],
    [134, 113, 16],
    [151, 112.4, 13]
  ];
  const flowers: [number, number, number][] = [
    [105, 111.6, 12],
    [124, 112, 17],
    [142, 111.8, 14],
    [158, 111.4, 12]
  ];
  return {
    kind: "healing-in-black-cumin",
    ms: 8000,
    parts: [
      ...daySky(26, 100, 8000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [54, 117], [84, 117]]) },
      { name: "homes of Madinah", svg: home(16, 96, 18, 13) + home(38, 94, 16, 11) },
      { name: "the places of some who are ill, by their homes", svg: ill.map(([x, y]) => someone(x, y, 1.4)).join("") },
      ...ill.map(
        ([x, y], i): SignPart => ({
          name: `a grey haze of illness about place ${i + 1}`,
          svg: wash(x, y, 4.6, 3.4, "#8E8E8E", 0.16),
          keys: track({
            opacity: [
              [at3(0.66 + 0.04 * i), 1],
              [at3(0.71 + 0.04 * i), 0]
            ]
          })
        })
      ),
      { name: "his place, a golden ring", svg: ring(76, 104.6, 2.4, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(60, 109, 1.5) },
      { name: "Abu Hurairah's voice: I heard him saying", svg: arcs(62.6, 105.6, ITS_VOICE), keys: showFor(0.03, 0.04, 0.23, 0.24), loop: speaking },
      { name: "his voice: there is healing in black cumin", svg: arcs(78.6, 101.2, GOLD), keys: showFor(0.3, 0.31, 0.95, 0.96), loop: speaking },
      {
        name: "black cumin in pale blue flower",
        svg: flowers.map(([x, y, h]) => cumin(x, y, h, false)).join(""),
        origin: { x: 130, y: 112 },
        loop: { move: "sway", ms: 4200, angle: 1.2 }
      },
      {
        name: "black cumin with round pods",
        svg: pods.map(([x, y, h]) => cumin(x, y, h, true)).join(""),
        origin: { x: 132, y: 113 },
        loop: { move: "sway", ms: 4800, angle: 1, phase: 0.4 }
      },
      {
        name: "the pods open: black seeds within",
        svg: pods
          .map(([x, y, h]) => {
            const [px, py] = podAt(x, y, h);
            return `<ellipse cx="${px}" cy="${py}" rx="1.2" ry="2" fill="#3A3A2A"/>` + blackSeeds(px, py, [[-0.3, -0.8], [0.3, 0.1], [-0.2, 0.9]]);
          })
          .join(""),
        keys: showAt(0.33, 0.37)
      },
      ...[0, 1, 2].map((i): SignPart => {
        const [px, py] = podAt(...pods[0]);
        const s: [number, number] = [n(px - 0.4 + i * 0.4), n(py + 0.2 + i * 0.3)];
        const t = at3(0.37 + 0.015 * i);
        return {
          name: `black seeds going into the dish ${i + 1}`,
          svg: blackSeeds(s[0], s[1], [[0, 0]]),
          keys: track({
            opacity: [
              [t, 0],
              [at3(t + 0.005), 1],
              [at3(t + 0.04), 1],
              [at3(t + 0.045), 0]
            ],
            xy: [
              [at3(t + 0.005), 0, 0],
              [at3(t + 0.04), n(seedsDish[0] - 1.6 + 1.6 * i - s[0]), n(seedsDish[1] - 2.6 - s[1])]
            ]
          })
        };
      }),
      {
        name: "black seeds in a dish",
        svg: bigger(
          dish(seedsDish[0], seedsDish[1]) + blackSeeds(seedsDish[0], n(seedsDish[1] - 1.4), [[-2, -0.2], [-1, -0.5], [0, -0.3], [1, -0.6], [2, -0.2], [-0.5, -1], [0.6, -1.1], [-1.5, -0.8], [1.6, -0.9]]),
          seedsDish[0],
          seedsDish[1],
          1.6
        ),
        keys: showAt(0.4, 0.44)
      },
      {
        name: "glints over the black seeds",
        svg: glints([
          [n(seedsDish[0] - 4), n(seedsDish[1] - 5.2)],
          [n(seedsDish[0] + 4.4), n(seedsDish[1] - 4.8)]
        ]),
        keys: showAt(0.46, 0.49),
        loop: twinkle()
      },
      { name: "healing: a soft light about the black seeds", svg: wash(seedsDish[0], n(seedsDish[1] - 1.6), 10, 4.6, "#FFF1C4", 0.24), keys: showAt(0.5, 0.55), loop: soft },
      ...ill.map(
        ([x, y], i): SignPart => ({
          name: `for all diseases: a warm light about place ${i + 1}`,
          svg: wash(x, y, 4.4, 3, "#FFE9B0", 0.2),
          keys: showAt(at3(0.69 + 0.04 * i), at3(0.74 + 0.04 * i)),
          loop: soft
        })
      )
    ],
    words: [
      { text: "Abu Hurairah: I heard him saying:", from: 0.02, to: 0.28 },
      { text: "There is healing in black cumin", from: 0.3, to: 0.62 },
      { text: "for all diseases except death.", from: 0.64, to: 1 }
    ]
  };
}

// Over which the sun rises. Abu Hurairah reported the Messenger of Allah ﷺ as saying: the uttering of: Exalted is
// Allah, all praise is due to Allah, there is no god but Allah, and Allah is the Greatest, is dearer to me than
// anything over which the sun rises (Sahih Muslim 2695). No one is drawn: at dawn, by the masjid of Madinah, with its
// homes and palms, the land and the sea, his place, a golden ring, and Abu Hurairah's place. Abu Hurairah's voice
// speaks; then his, and with each of the four a glint rises from his place and stays. A soft golden ring and a warm
// light come about the four glints. Then the sun rises from behind the hills, the morning light spreads over all the
// land and the sea, and the sun glints on the water.
function overWhichTheSunRises(): SignArt {
  const his: [number, number] = [84, 104.4];
  const four = [0.165, 0.3, 0.435, 0.57];
  const names = ["the first", "the second", "the third", "the fourth"];
  return {
    kind: "over-which-the-sun-rises",
    ms: 11000,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      { name: "the morning light", svg: glow(124, 56, 40, "#FFD9A8", 0.1), keys: track({ opacity: [[0.86, 0], [0.95, 1]] }) },
      { name: "the sun, rising from behind the hills", svg: sun(124, 46), keys: track({ xy: [[0.85, 0, 22], [0.93, 0, 0]] }) },
      { name: "hills", svg: hills("#8E7E78") },
      { name: "the land", svg: plainLand("#C9AE84") },
      {
        name: "the sea",
        svg: `<path d="M106 61 L160 61 L160 84 Q134 80 118 72 Q110 66 106 61 Z" fill="#4E6E9A"/><path d="M118 66 L130 66 M136 70 L150 70 M126 75 L140 75" stroke="#7E9CC4" stroke-width="0.5"/>`
      },
      ...palms([
        [18, 100, 26],
        [150, 106, 22]
      ]),
      { name: "homes of Madinah", svg: home(44, 92, 14, 10) + home(60, 90, 12, 8) },
      { name: "the masjid of Madinah", svg: madinahMasjid(62, 100, 0.4) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(68, 108.6, 1.5) },
      { name: "Abu Hurairah's voice: he said", svg: arcs(70.6, 105.2, ITS_VOICE), keys: showFor(0.03, 0.04, 0.09, 0.1), loop: speaking },
      { name: "his voice: the four words", svg: arcs(86.6, 101, GOLD), keys: showFor(0.16, 0.17, 0.63, 0.64), loop: speaking },
      ...four.map(
        (f, i): SignPart => ({
          name: `${names[i]} of the four: a glint rising from his place`,
          svg: sparkle(n(his[0] - 4.5 + 3 * i), 99, 1.3, "#FFE7A0"),
          keys: track({
            opacity: [
              [f, 0],
              [at3(f + 0.005), 1]
            ],
            xy: [
              [at3(f + 0.005), 0, 0],
              [at3(f + 0.06), 0, -12]
            ]
          }),
          loop: twinkle(1100 + 200 * i)
        })
      ),
      { name: "dearer to him: a warm light about the four", svg: glow(his[0], 87, 8, "#FFE7A0", 0.14), keys: showAt(0.7, 0.74), loop: soft },
      { name: "a soft golden ring about the four", svg: care(his[0], 87, 8.4, 3.2, GOLD), keys: showAt(0.72, 0.76), loop: soft },
      { name: "over all the land and the sea: the sun's light", svg: `<rect y="61" width="160" height="59" fill="#FFE9C0" opacity="0.2"/>`, keys: showAt(0.88, 0.94) },
      {
        name: "the sun glinting on the sea",
        svg: glints(
          [
            [122, 68],
            [134, 72],
            [146, 66],
            [152, 76]
          ],
          0.9,
          "#FFF3C0"
        ),
        keys: showAt(0.9, 0.93),
        loop: twinkle(1600)
      }
    ],
    words: [
      { text: "Abu Hurairah reported him as saying:", from: 0.02, to: 0.14 },
      { text: "The uttering of: Exalted is Allah,", from: 0.155, to: 0.275 },
      { text: "all praise is due to Allah,", from: 0.29, to: 0.41 },
      { text: "there is no god but Allah,", from: 0.425, to: 0.545 },
      { text: "and Allah is the Greatest,", from: 0.56, to: 0.68 },
      { text: "is dearer to me than anything", from: 0.695, to: 0.83 },
      { text: "over which the sun rises.", from: 0.845, to: 1 }
    ]
  };
}

// Brisk, then walking. Ibn Umar said: when the Prophet ﷺ performed the Tawaf of the Ka'bah, he did Ramal during the
// first three rounds, and in the last four rounds he used to walk (Sahih al-Bukhari 1617). No one is drawn: in Makkah,
// the Ka'bah stands with the Black Stone at its front corner. Ibn Umar's voice speaks; his place, a golden ring, shows
// by the Black Stone and goes round the House with the House on its left, three rounds quickly, a bright glint for
// each, and then four rounds at a walk, a soft glint for each: seven glints in all.
function briskThenWalking(): SignArt {
  const [kx, ky, kw] = [66, 97, 28];
  const stone: [number, number] = [n(kx + 1.6), 92.2];
  const brisk = goingRound(78, 100, 32, 8.6, 120, 3, 8, 0.2, 0.0075);
  const walking = goingRound(78, 100, 32, 8.6, 120, 4, 8, 0.44, 0.0161);
  const ends = [1, 2, 3].map((k) => at3(0.2 + 0.0075 * 8 * k)).concat([1, 2, 3, 4].map((k) => at3(0.44 + 0.0161 * 8 * k)));
  return {
    kind: "brisk-then-walking",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(146, 16) },
      { name: "a cloud", svg: cloud(110, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [18, 16, 26],
            [60, 12, 22],
            [104, 18, 28],
            [148, 14, 24]
          ],
          66,
          "#A88E6A",
          false
        )
      },
      { name: "the land", svg: plainLand("#E6D3A8", [[8, 117], [150, 117]]) },
      { name: "homes of Makkah, far off", svg: home(12, 80, 10, 7) + home(26, 78.4, 9, 6) + home(134, 79, 10, 7) + home(148, 80.6, 9, 6) },
      { name: "the ground about the House", svg: `<ellipse cx="78" cy="101" rx="66" ry="12" fill="#EADFC6"/>` },
      {
        name: "his place, a golden ring, going round the House",
        svg: ring(...brisk.start, 2.4, GOLD),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.06, 1]
          ],
          xy: [...brisk.points, ...walking.points]
        })
      },
      { name: "the Ka'bah, the House", svg: turned(kabah(kx, ky, kw), n(kx + kw / 2)) },
      { name: "the Corner of the Black Stone", svg: blackStone(stone[0], stone[1]) },
      { name: "Ibn Umar's place", svg: someone(30, 108.4, 1.6) },
      { name: "Ibn Umar's voice: when he did the Tawaf", svg: arcs(32.6, 105, ITS_VOICE), keys: showFor(0.03, 0.04, 0.13, 0.14), loop: speaking },
      ...ends.map(
        (end, i): SignPart => ({
          name: i < 3 ? `Ramal, quickly: a bright glint for round ${i + 1}` : `walking: a soft glint for round ${i + 1}`,
          svg: sparkle(54 + 8 * i, 116.4, i < 3 ? 1.6 : 1.4, i < 3 ? "#FFD24A" : "#FFF3C0"),
          keys: showAt(at3(end - 0.005), end),
          loop: twinkle(i < 3 ? 900 : 1600)
        })
      )
    ],
    words: [
      { text: "Ibn Umar: when he performed the Tawaf,", from: 0.02, to: 0.18 },
      { text: "he did Ramal during the first three rounds", from: 0.2, to: 0.42 },
      { text: "in the last four rounds he used to walk.", from: 0.44, to: 1 }
    ]
  };
}

// Said three times. Anas said: whenever the Prophet ﷺ spoke a sentence, he used to repeat it thrice so that the people
// could understand it properly from him (Sahih al-Bukhari 95). No one is drawn: by the masjid of Madinah, his place, a
// golden ring, the places of a gathering before him, near, further off and furthest off, and Anas's place. Anas's
// voice speaks; his voice speaks, and again, and a third time, a glint for each. A soft light comes over the places
// near, then further off, then furthest off: they understood. A soft golden ring comes about the gathering, and a faint
// golden line goes from his place to the furthest of them.
function saidThreeTimes(): SignArt {
  const his: [number, number] = [40, 104.4];
  const near: [number, number][] = [
    [54, 103.8],
    [58, 108.6],
    [62, 103.4]
  ];
  const further: [number, number][] = [
    [76, 103.4],
    [81, 108.4],
    [86, 103.6],
    [91, 108.2]
  ];
  const furthest: [number, number][] = [
    [104, 103.6],
    [109, 108.6],
    [114, 103.4],
    [119, 108.2],
    [124, 103.8]
  ];
  const sayings = [
    [0.07, 0.145],
    [0.26, 0.315],
    [0.34, 0.395]
  ];
  const opacity: [number, number][] = [];
  for (const [a, b] of sayings) opacity.push([a, 0], [at3(a + 0.005), 1], [at3(b - 0.005), 1], [b, 0]);
  const counts = ["once", "twice", "a third time"];
  const light = (list: [number, number][], name: string, from: number): SignPart => ({
    name: `understanding: a soft light on the places ${name}`,
    svg: list.map(([x, y]) => wash(x, y, 3.4, 2.6, "#FFF1C4", 0.26)).join(""),
    keys: showAt(from, at3(from + 0.03)),
    loop: soft
  });
  return {
    kind: "said-three-times",
    ms: 9000,
    parts: [
      ...daySky(140, 50, 9000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([[150, 100, 26]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 96, 0.5) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the places of a gathering, near", svg: near.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "the places of a gathering, further off", svg: further.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "the places of a gathering, furthest off", svg: furthest.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "Anas's place", svg: someone(26, 109.6, 1.5) },
      { name: "Anas's voice: whenever he spoke", svg: arcs(28.6, 106.2, ITS_VOICE), keys: showFor(0.025, 0.03, 0.06, 0.065), loop: speaking },
      { name: "his voice: a sentence, three times", svg: arcs(42.6, 101, GOLD), keys: track({ opacity }), loop: speaking },
      ...sayings.map(
        ([, b], i): SignPart => ({
          name: `said ${counts[i]}: a glint`,
          svg: sparkle(n(his[0] - 3.6 + 3.6 * i), i === 1 ? 96.8 : 97.6, 1.1, "#FFE7A0"),
          keys: showAt(at3(b - 0.005), b),
          loop: twinkle()
        })
      ),
      light(near, "near", 0.5),
      light(further, "further off", 0.56),
      light(furthest, "furthest off", 0.62),
      { name: "a soft golden ring about the gathering", svg: care(89, 106, 40, 6.4, GOLD), keys: showAt(0.78, 0.82), loop: soft },
      { name: "from him: a faint golden line from his place to the furthest", svg: lookLine(n(his[0] + 2.6), n(his[1] - 1), 122.4, 102.2, 95, GOLD), keys: showAt(0.84, 0.88) }
    ],
    words: [
      { text: "Anas: whenever he spoke a sentence,", from: 0.02, to: 0.22 },
      { text: "he used to repeat it thrice", from: 0.24, to: 0.46 },
      { text: "so that the people could understand it", from: 0.48, to: 0.74 },
      { text: "properly from him.", from: 0.76, to: 1 }
    ]
  };
}

export const SWEET_ART = {
  "the-biggest-heap": theBiggestHeap,
  "who-is-that": whoIsThat,
  "sweet-things-and-honey": sweetThingsAndHoney,
  "healing-in-black-cumin": healingInBlackCumin,
  "over-which-the-sun-rises": overWhichTheSunRises,
  "brisk-then-walking": briskThenWalking,
  "said-three-times": saidThreeTimes
};
