import { cloud, glow, n, nightSky, palm, peaks, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { basketOfDates, ring, sack, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { saddled, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { at3 } from "./storyArt";
import { dish } from "./worthArt";
import { kabah } from "./historyArt";
import { cup } from "./hopeArt";
import { jar } from "./tradeArt";
import { lookLine } from "./truthArt";

/**
 * Habits: he did ramal in three rounds and walked in the remaining four, in Hajj and Umrah; he used to like to start
 * from the right side on wearing shoes, combing his hair and cleaning or washing himself, and on doing anything else;
 * he used to accept gifts and used to give something in return; Umm Salamah asked: shall I receive a reward if I spend
 * for the sustenance of Abu Salamah's offspring, and in fact they are also my sons? and he replied: spend on them and
 * you will get a reward for what you spend on them; on a journey at night he said: I am afraid that you will sleep and
 * miss the prayer, and Bilal said: I will make you get up, then all slept, Bilal too, against his Rahila, and he got
 * up when the edge of the sun had risen, told Bilal to pronounce the Adhan, and prayed when the sun became bright; the
 * best of the Ansar families are Banu an-Najjar, then Abdul Ash-hal, then Banu al-Harith, then Banu Sa'idah, and there
 * is good in all the families of the Ansar, and to Sa'd he said: isn't it sufficient that you are regarded amongst the
 * best?; and in Itban's house he asked: where do you like me to pray in your house? and Itban pointed to a place he
 * liked, and they aligned behind him. Only the land, the sky, buildings, things, plants and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head or a face: where someone was, a
 * ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. No one
 * rides: the camels stand saddled with no one on them. Nothing is drawn for Allah, and nothing comes down from the
 * sky: a prayer is a spark that rises, what is good is a light, glints and a soft golden ring. No name or word is
 * written.
 */

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The places of the folk: of a town, of a house, of the pilgrims. */
const FOLK = "#C39A5A";

/** A place at night: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A spark that rises from its place from `from` until `to`, `rise` high, and stays there. */
const sparkStays = (from: number, to: number, rise = 10): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, -1, -rise]
});

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 114], [64, 117], [112, 115], [150, 116]]) => landOf(tufts, fill);

/** `svg` drawn `k` times its size about (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** How far it is from `a` to `b`, as [dx, dy]. */
const rel = (a: [number, number], b: [number, number]): [number, number] => [n(b[0] - a[0]), n(b[1] - a[1])];

/** A room: its back wall down to y `line`, with a band along its foot, and its floor below. */
export const room = (wall: string, floor: string, line: number) =>
  `<rect width="160" height="120" fill="${wall}"/><rect y="${line - 8}" width="160" height="8" fill="#000000" opacity="0.05"/><rect y="${line}" width="160" height="${120 - line}" fill="${floor}"/>` +
  `<path d="M0 ${line} L160 ${line}" stroke="#A07C52" stroke-width="0.8"/>`;

/** A doorway in the back wall of a room from x `x` to `x + w`, from y `top` to the floor at y `line`, with the day outside. */
const doorway = (x: number, w: number, top: number, line: number) =>
  `<rect x="${x}" y="${top}" width="${w}" height="${n(line - top)}" fill="#CFE8F6"/><rect x="${x}" y="${n(top + (line - top) * 0.62)}" width="${w}" height="${n((line - top) * 0.38)}" fill="#E7D3A8"/>` +
  `<path d="M${x} ${line} L${x} ${top} L${n(x + w)} ${top} L${n(x + w)} ${line}" stroke="#7C5A36" stroke-width="1.4" fill="none"/>`;

/** A shelf on the wall, its middle at (x, y) and `w` across, with a cup and a small jar on it. */
const shelf = (x: number, y: number, w: number) =>
  `<rect x="${n(x - w / 2)}" y="${y}" width="${w}" height="1.4" fill="#9A7444"/>` +
  `<path d="M${n(x - w / 2 + 2)} ${n(y + 1.4)} L${n(x - w / 2 + 2)} ${n(y + 3.6)} M${n(x + w / 2 - 2)} ${n(y + 1.4)} L${n(x + w / 2 - 2)} ${n(y + 3.6)}" stroke="#7C5A36" stroke-width="0.8"/>` +
  cup(n(x - w / 4), y) +
  jar(n(x + w / 4), y, 0.62);

/** A window in the back wall, its top left at (x, y), `w` wide and `h` high, with the day sky in it. */
const windowOn = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#CFE8F6"/><path d="M${n(x + w / 2)} ${y} L${n(x + w / 2)} ${n(y + h)}" stroke="#7C5A36" stroke-width="0.8"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" stroke="#7C5A36" stroke-width="1.2" fill="none"/>`;

/** A mat to sit on, its middle at (x, y), `w` across. */
const mat = (x: number, y: number, w = 8) =>
  `<path d="M${n(x - w / 2)} ${n(y - 1)} L${n(x + w / 2)} ${n(y - 1)} L${n(x + w / 2 + 1)} ${n(y + 1)} L${n(x - w / 2 - 1)} ${n(y + 1)} Z" fill="#B98F5A"/>` +
  `<path d="M${n(x - w / 2 + 0.6)} ${y} L${n(x + w / 2 - 0.6)} ${y}" stroke="#9A7444" stroke-width="0.3"/>`;

/** A sandal of leather seen from above, its toe up, its middle at (x, y), `s` times its size (2.8 wide): its sole and its two straps. */
const sandal = (x: number, y: number, s = 1) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(0, -2.6)} C${p(1.5, -2.6)} ${p(1.5, 0.4)} ${p(0.9, 2.2)} Q${p(0, 2.9)} ${p(-0.9, 2.2)} C${p(-1.5, 0.4)} ${p(-1.5, -2.6)} ${p(0, -2.6)} Z" fill="#8A5A30"/>` +
    `<path d="M${p(0, -1.8)} L${p(-1, 0.2)} M${p(0, -1.8)} L${p(1, 0.2)}" stroke="#4E2F16" stroke-width="${n(0.45 * s)}" stroke-linecap="round" fill="none"/>`
  );
};

/** A wooden comb, its middle at (x, y), `s` times its size (4.8 wide). */
const comb = (x: number, y: number, s = 1) =>
  `<rect x="${n(x - 2.4 * s)}" y="${n(y - 0.7 * s)}" width="${n(4.8 * s)}" height="${n(1.2 * s)}" rx="${n(0.4 * s)}" fill="#B98A55"/>` +
  `<path d="${[-2, -1.4, -0.8, -0.2, 0.4, 1, 1.6, 2.2].map((dx) => `M${n(x + dx * s)} ${n(y + 0.5 * s)} L${n(x + dx * s)} ${n(y + 1.9 * s)}`).join(" ")}" stroke="#9A6A38" stroke-width="${n(0.35 * s)}"/>`;

/** A folded cloth, its foot's middle at (x, y). */
const foldedCloth = (x: number, y: number, fill = "#EDE4CF") =>
  `<path d="M${n(x - 2.6)} ${y} L${n(x - 2.6)} ${n(y - 1.6)} L${n(x + 2.6)} ${n(y - 1.6)} L${n(x + 2.6)} ${y} Z" fill="${fill}"/><path d="M${n(x - 2.6)} ${n(y - 0.8)} L${n(x + 2.6)} ${n(y - 0.8)}" stroke="#C9BC9C" stroke-width="0.3"/>`;

/** Milk in a cup whose foot's middle is at (x, y). */
const milkIn = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 3.2)}" rx="1.4" ry="0.45" fill="#FFFFFF"/>`;

/** A small measure of dates, its foot's middle at (x, y), `s` times its size (4 wide). */
const datesMeasure = (x: number, y: number, s = 1) =>
  `<path d="M${n(x - 2 * s)} ${n(y - 2.6 * s)} L${n(x + 2 * s)} ${n(y - 2.6 * s)} L${n(x + 1.6 * s)} ${y} L${n(x - 1.6 * s)} ${y} Z" fill="#A9814A"/>` +
  [-1, 0, 1, -0.5, 0.5].map((dx, i) => `<ellipse cx="${n(x + dx * s)}" cy="${n(y - (3 + (i < 3 ? 0 : 0.8)) * s)}" rx="${n(0.6 * s)}" ry="${n(0.5 * s)}" fill="#7A2E14"/>`).join("");

/** A little food on a small dish, its middle at (x, y), `s` times its size (3.2 wide). */
const portion = (x: number, y: number, s = 1) =>
  `<path d="M${n(x - 1.6 * s)} ${n(y - 0.4 * s)} Q${x} ${n(y + 0.8 * s)} ${n(x + 1.6 * s)} ${n(y - 0.4 * s)} Z" fill="#B8864A"/><ellipse cx="${x}" cy="${n(y - 0.8 * s)}" rx="${n(1 * s)}" ry="${n(0.5 * s)}" fill="#D9A35E"/>`;

/** The Corner of the Black Stone: a dark stone in a silver rim, at (x, y). */
const blackStone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="1.2" fill="#2A2A2A" stroke="#D9D9D9" stroke-width="0.4"/>`;

/** The land by night from y 61 down, with a few dark tufts of grass. */
const nightLand = (fill: string, tufts: [number, number][]) =>
  `<rect y="61" width="160" height="59" fill="${fill}"/><path d="M0 61 L160 61" stroke="#4A5878" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#4E5B78", 3.4)).join("");

/** The night over a land of day: a deep blue over the land. */
const NIGHT_OVER_LAND = `<rect y="34" width="160" height="86" fill="#13224A" opacity="0.66"/>`;

/** The words of eight lines, in turn, over the whole scene. */
const EIGHT = [
  [0.02, 0.13],
  [0.142, 0.252],
  [0.264, 0.374],
  [0.386, 0.496],
  [0.508, 0.618],
  [0.63, 0.74],
  [0.752, 0.862],
  [0.874, 1]
] as const;

/** Eight lines of words on the times above. */
const eightLines = (lines: string[]) => lines.map((text, i) => ({ text, from: EIGHT[i][0], to: EIGHT[i][1] }));

// Ramal in three rounds. Ibn Umar said: the Prophet ﷺ did ramal in three rounds, and walked in the remaining four, in
// Hajj and Umrah (Sahih al-Bukhari 1604; the page's "(first)" and "(of Tawaf)" are left out). No one is drawn: in
// Makkah the Ka'bah stands on its open ground, the Corner of the Black Stone on its right, with the pilgrims' places
// about it. Ibn Umar's place is by the ground, and his voice tells of it. His place, a golden ring, goes round the
// House from the Corner, behind it and round in front again: three rounds briskly, with short quick steps, a gold
// mark showing as each is done; then four rounds walking, more slowly, each with its mark. At the end a soft golden
// ring comes about the ground of the House, with glints over it.
function ramalInThreeRounds(): SignArt {
  const [kx, ky, kw] = [68, 97, 22];
  const corner: [number, number] = [n(kx + kw + 0.2), n(ky - 2.6)];
  const ground = { x: 80, y: 100, rx: 50, ry: 8 };
  const begin = Math.PI / 4;
  const on = (theta: number): [number, number] => [ground.x + ground.rx * Math.cos(theta), ground.y + ground.ry * Math.sin(theta)];
  const [sx, sy] = on(begin);
  const rounds: [number, number, boolean][] = [
    [0.02, 0.1, true],
    [0.1, 0.18, true],
    [0.18, 0.26, true],
    [0.32, 0.43, false],
    [0.43, 0.54, false],
    [0.54, 0.65, false],
    [0.65, 0.76, false]
  ];
  const STEPS = 16;
  const xy: [number, number, number][] = [];
  const front: [number, number][] = [[0, 1]];
  const behind: [number, number][] = [[0, 0]];
  for (const [from, to, brisk] of rounds) {
    for (let k = 0; k <= STEPS; k += 1) {
      const t = at3(from + ((to - from) * k) / STEPS);
      const [x, y] = on(begin - (2 * Math.PI * k) / STEPS);
      const hop = brisk && k % 2 === 1 ? -0.8 : 0;
      if (!xy.length || xy[xy.length - 1][0] !== t) xy.push([t, n(x - sx), n(y - sy + hop)]);
      if (k === 2) {
        front.push([t, 1], [at3(t + 0.002), 0]);
        behind.push([t, 0], [at3(t + 0.002), 1]);
      }
      if (k === 10) {
        front.push([t, 0], [at3(t + 0.002), 1]);
        behind.push([t, 1], [at3(t + 0.002), 0]);
      }
    }
  }
  const marks = rounds.map(([, to, brisk], i): SignPart => {
    const [x, y] = [56 + i * 8, 116];
    const names = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];
    return {
      name: `the ${names[i]} round done: ${brisk ? "a gold mark, brisk" : "a mark, walking"}`,
      svg: brisk ? `<circle cx="${x}" cy="${y}" r="1.3" fill="#E8A93A"/>` + sparkle(x, n(y - 2.6), 0.8, "#FFE7A0") : `<circle cx="${x}" cy="${y}" r="1.3" fill="#B98F5A"/>`,
      keys: showAt(at3(to - 0.004), to)
    };
  });
  const ibnUmar: [number, number] = [12, 112];
  const pilgrims = (angles: number[]) =>
    angles
      .map((a) => {
        const theta = (a * Math.PI) / 180;
        return someone(n(80 + 58 * Math.cos(theta)), n(100 + 12 * Math.sin(theta)), 1.3, FOLK);
      })
      .join("");
  return {
    kind: "ramal-in-three-rounds",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(146, 16) },
      { name: "a cloud", svg: cloud(106, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
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
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118], [150, 117]]) },
      { name: "homes of Makkah, far off", svg: home(12, 80, 10, 7) + home(26, 78.4, 9, 6) + home(134, 79, 10, 7) + home(148, 80.6, 9, 6) },
      { name: "the open ground about the House", svg: `<ellipse cx="80" cy="100" rx="64" ry="12.4" fill="#EADFC6"/>` },
      { name: "the pilgrims' places behind the House", svg: pilgrims([200, 250, 290, 340]) },
      { name: "in Hajj and Umrah: a soft golden ring about the ground of the House", svg: care(80, 100, 58, 11.4, SOFT_GOLD), keys: showAt(0.825, 0.86), loop: soft },
      { name: "his place going round, behind the House", svg: ring(n(sx), n(sy), 2.4, GOLD), keys: track({ xy, opacity: behind }) },
      { name: "the Ka'bah, the House", svg: kabah(kx, ky, kw) },
      { name: "the Corner of the Black Stone", svg: blackStone(corner[0], corner[1]) },
      { name: "the pilgrims' places in front of the House", svg: pilgrims([20, 60, 120, 160]) },
      { name: "his place going round, in front of the House", svg: ring(n(sx), n(sy), 2.4, GOLD), keys: track({ xy, opacity: front }) },
      ...marks,
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, ITS_VOICE) },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(n(ibnUmar[0] + 3), n(ibnUmar[1] - 1.6), ITS_VOICE), keys: showFor(0.022, 0.03, 0.095, 0.105), loop: speaking },
      {
        name: "glints over the House",
        svg: glints(
          [
            [72, 71],
            [84, 69],
            [96, 72]
          ],
          1.4
        ),
        keys: showAt(0.87, 0.89),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Ibn Umar: he did ramal in three rounds,", from: 0.02, to: 0.3 },
      { text: "and walked in the remaining four,", from: 0.32, to: 0.8 },
      { text: "in Hajj and Umrah.", from: 0.82, to: 1 }
    ]
  };
}

// Start from the right side. Aishah said: the Prophet ﷺ used to like to start from the right side on wearing shoes,
// combing his hair and cleaning or washing himself, and on doing anything else (Sahih al-Bukhari 168). No one is
// drawn, and no hand, foot or head: in his room, his place, a golden ring, is on a mat, and the right is the
// picture's right. Aishah's place is by the doorway, and her voice tells of it. As the right side is named, a soft
// golden light comes on the right of his place and a pair of sandals shows before it: the right one comes to his
// place first, then the left. A comb shows on the right of his place and goes twice, then on its left; a jug pours
// water on the right of his place, then on its left. Then glints come over the right of each thing, then over the
// left, the light comes on the left of his place too, and a soft golden ring and a warm light come about it.
function startFromTheRightSide(): SignArt {
  const LINE = 78;
  const his: [number, number] = [80, 96];
  const aishah: [number, number] = [24, 100];
  const right: [number, number] = [92, 112];
  const left: [number, number] = [68, 112];
  const rightOn: [number, number] = [84.4, 102.4];
  const leftOn: [number, number] = [75.6, 102.4];
  const jug: [number, number] = [108, 104];
  const mouth: [number, number] = [106.6, 96.6];
  const pour = (to: number, top: [number, number]) =>
    `<path d="M${mouth[0]} ${mouth[1]} Q${top[0]} ${top[1]} ${to} ${n(his[1] - 0.6)}" stroke="#9FD3EE" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${to}" cy="${n(his[1] + 1)}" rx="2.4" ry="0.6" fill="#BFE0F0" opacity="0.85"/>`;
  return {
    kind: "start-from-the-right-side",
    ms: 10000,
    parts: [
      { name: "his room: its wall and floor", svg: room("#EAD7B4", "#D2AE7E", LINE) },
      { name: "the doorway, with the day outside", svg: doorway(10, 18, 30, LINE) },
      { name: "a window, with the sky in it", svg: windowOn(98, 22, 22, 16) },
      { name: "a cloud going by the window", svg: cloud(108, 29, 0.25, "#FFFFFF", 0.9), loop: { move: "bob", ms: 6400, x: 2.5 } },
      { name: "a shelf with a cup and a jar", svg: shelf(124, 52, 22) },
      {
        name: "a cushion by the wall",
        svg: `<rect x="40" y="70.6" width="24" height="8" rx="3" fill="#B5764A"/><path d="M42 73.6 L62 73.6" stroke="#D9A066" stroke-width="0.7"/>`
      },
      { name: "a mat", svg: mat(his[0], n(his[1] + 2.4), 30) },
      {
        name: "the right of his place: a soft golden light",
        svg: `<path d="M${his[0]} ${n(his[1] - 3.6)} A6 3.6 0 0 1 ${his[0]} ${n(his[1] + 3.6)}" stroke="${SOFT_GOLD}" stroke-width="1" fill="none"/>` + glow(n(his[0] + 4), his[1], 4.6, "#FFE7A0", 0.16),
        keys: showAt(0.222, 0.24),
        loop: soft
      },
      { name: "his place", svg: ring(his[0], his[1], 3.2, GOLD) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.8, ITS_VOICE) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 3.4), n(aishah[1] - 1.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.15, 0.16), loop: speaking },
      {
        name: "the right sandal, put on first",
        svg: sandal(right[0], right[1], 1.6),
        keys: track({
          opacity: [
            [0.222, 0],
            [0.232, 1]
          ],
          xy: [
            [0.24, 0, 0],
            [0.28, ...rel(right, rightOn)]
          ]
        })
      },
      { name: "a glint on the right sandal", svg: glints([[n(rightOn[0] + 3.4), n(rightOn[1] - 3)]], 1.2), keys: showFor(0.28, 0.29, 0.35, 0.36), loop: twinkle() },
      {
        name: "the left sandal, put on after",
        svg: sandal(left[0], left[1], 1.6),
        keys: track({
          opacity: [
            [0.222, 0],
            [0.232, 1]
          ],
          xy: [
            [0.3, 0, 0],
            [0.34, ...rel(left, leftOn)]
          ]
        })
      },
      {
        name: "a comb, on the right of his place first, then on its left",
        svg: comb(n(his[0] + 10), n(his[1] - 10), 1.6),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.425, 1],
            [0.545, 1],
            [0.555, 0]
          ],
          xy: [
            [0.425, 0, 0],
            [0.44, 0, 4],
            [0.45, 0, 0],
            [0.465, 0, 4],
            [0.475, 0, 0],
            [0.49, -20, 0],
            [0.505, -20, 4],
            [0.515, -20, 0],
            [0.53, -20, 4],
            [0.54, -20, 0]
          ]
        })
      },
      { name: "a jug of water", svg: jar(jug[0], jug[1], 0.9) },
      { name: "water poured on the right of his place", svg: pour(n(his[0] + 4.4), [97, 86]), keys: showFor(0.625, 0.64, 0.69, 0.7), loop: soft },
      { name: "water poured on the left of his place", svg: pour(n(his[0] - 4.4), [90, 80]), keys: showFor(0.7, 0.715, 0.75, 0.76), loop: soft },
      {
        name: "anything else: glints over the right of each thing",
        svg: glints(
          [
            [n(his[0] + 6.4), n(his[1] - 4.4)],
            [n(rightOn[0] + 3.4), n(rightOn[1] - 3)],
            [n(jug[0] + 3.6), n(jug[1] - 9)]
          ],
          1.2
        ),
        keys: showAt(0.825, 0.845),
        loop: twinkle()
      },
      {
        name: "then glints over the left of each thing",
        svg: glints(
          [
            [n(his[0] - 6.4), n(his[1] - 4.4)],
            [n(leftOn[0] - 3.4), n(leftOn[1] - 3)],
            [n(jug[0] - 3.6), n(jug[1] - 9)]
          ],
          1.2
        ),
        keys: showAt(0.865, 0.885),
        loop: twinkle()
      },
      {
        name: "the left of his place: the light, after",
        svg: `<path d="M${his[0]} ${n(his[1] - 3.6)} A6 3.6 0 0 0 ${his[0]} ${n(his[1] + 3.6)}" stroke="${SOFT_GOLD}" stroke-width="1" fill="none"/>`,
        keys: showAt(0.89, 0.905),
        loop: soft
      },
      { name: "a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 9, 4.2, SOFT_GOLD), keys: showAt(0.91, 0.93), loop: soft },
      { name: "a warm light in the room", svg: wash(his[0], his[1], 56, 14, WARM, 0.08), keys: showAt(0.93, 0.955), loop: soft }
    ],
    words: [
      { text: "Aishah: he used to like to start", from: 0.02, to: 0.2 },
      { text: "from the right side on wearing shoes,", from: 0.22, to: 0.4 },
      { text: "combing his hair", from: 0.42, to: 0.6 },
      { text: "and cleaning or washing himself", from: 0.62, to: 0.8 },
      { text: "and on doing anything else.", from: 0.82, to: 1 }
    ]
  };
}

// Something in return. Aishah said: Allah's Messenger ﷺ used to accept gifts and used to give something in return
// (Sahih al-Bukhari 2585). No one is drawn: by his home in Madinah, his place, a golden ring, is at the door, and
// Aishah's voice tells of it. From a home along the way a place comes with a basket of dates and sets it before his
// place, and a warm glow comes about it, taken; from another home another comes with a cup of milk, and it too is
// taken. Then from his place a folded cloth goes to the first and a small sack to the other, glints come over each,
// and they go home with them; a warm light comes about his home, with a soft golden ring about his place.
function somethingInReturn(): SignArt {
  const his: [number, number] = [116, 101];
  const aishah: [number, number] = [140, 104];
  const first: [number, number] = [18.2, 97.4];
  const second: [number, number] = [44.2, 93.6];
  const firstAt: [number, number] = [92, 103];
  const secondAt: [number, number] = [93, 110];
  const basketFrom: [number, number] = [n(first[0] + 5.4), n(first[1] + 1)];
  const basketBy: [number, number] = [n(firstAt[0] + 5.4), n(firstAt[1] + 1)];
  const basketTo: [number, number] = [106, 106.4];
  const cupFrom: [number, number] = [n(second[0] + 4.4), n(second[1] + 0.8)];
  const cupBy: [number, number] = [n(secondAt[0] + 4.4), n(secondAt[1] + 0.8)];
  const cupTo: [number, number] = [113.4, 107.4];
  const clothFrom: [number, number] = [121.6, 100];
  const clothOver: [number, number] = [108, 95.6];
  const sackFrom: [number, number] = [122.4, 112];
  const sackUnder: [number, number] = [110, 113.6];
  const withFirst: [number, number] = [4.6, 0.6];
  const withSecond: [number, number] = [4.6, 1];
  const goes = (from: number, to: number, a: [number, number], b: [number, number]): [number, number, number][] => [
    [from, 0, 0],
    [to, ...rel(a, b)]
  ];
  return {
    kind: "something-in-return",
    ms: 9000,
    parts: [
      { name: "a clear sky", svg: sky("#BFE3FA", "#E3F1F9", 62) },
      { name: "the sun", svg: sun(34, 18) },
      { name: "a cloud", svg: cloud(76, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 116], [64, 117], [150, 116]]) },
      { name: "another home along the way, further off", svg: home(46, 92, 16, 10) },
      { name: "a home along the way", svg: home(20, 96, 22, 13) },
      { name: "his home", svg: big(home(118, 96, 26, 15), 118, 96, 1.5) },
      ...palms([
        [150, 100, 26],
        [72, 92, 16]
      ]),
      { name: "the way to his door", svg: way("M18 98 C30 105 60 106.4 84 105.4 C96 105 104 103.4 112 101.6", "#D3BE96", 1) + way("M44 94.4 C48 99 54 103 62 105.4", "#D3BE96", 1) },
      { name: "taken: a warm glow about the basket", svg: glow(basketTo[0], n(basketTo[1] - 4), 6.4, "#FFE2A0", 0.18), keys: showAt(0.2, 0.23), loop: soft },
      { name: "taken: a warm glow about the cup", svg: glow(cupTo[0], n(cupTo[1] - 2.4), 5, "#FFE2A0", 0.18), keys: showAt(0.38, 0.41), loop: soft },
      { name: "his place, at the door", svg: ring(his[0], his[1], 3, GOLD) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.8, ITS_VOICE) },
      { name: "Aishah's voice: telling of it", svg: arcsLeft(n(aishah[0] - 3.4), n(aishah[1] - 1.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.1, 0.11), loop: speaking },
      {
        name: "the place of one bringing a gift, from a home along the way",
        svg: someone(first[0], first[1], 1.8, FOLK),
        keys: track({ xy: [...goes(0.05, 0.16, first, firstAt), [0.76, ...rel(first, firstAt)], [0.9, 0, 0]] })
      },
      {
        name: "a gift: a basket of dates, set before his place",
        svg: big(basketOfDates(basketFrom[0], basketFrom[1]), basketFrom[0], basketFrom[1], 1.3),
        keys: track({ xy: [...goes(0.05, 0.16, basketFrom, basketBy), [0.19, ...rel(basketFrom, basketTo)]] })
      },
      {
        name: "the place of another bringing a gift, from another home",
        svg: someone(second[0], second[1], 1.8, FOLK),
        keys: track({ xy: [...goes(0.24, 0.34, second, secondAt), [0.76, ...rel(second, secondAt)], [0.9, 0, 0]] })
      },
      {
        name: "a gift: a cup of milk, set before his place",
        svg: big(cup(cupFrom[0], cupFrom[1]) + milkIn(cupFrom[0], cupFrom[1]), cupFrom[0], cupFrom[1], 1.4),
        keys: track({ xy: [...goes(0.24, 0.34, cupFrom, cupBy), [0.37, ...rel(cupFrom, cupTo)]] })
      },
      {
        name: "in return: a folded cloth, given",
        svg: big(foldedCloth(clothFrom[0], clothFrom[1]), clothFrom[0], clothFrom[1], 1.4),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.51, 1]
          ],
          xy: [
            [0.52, 0, 0],
            [0.56, ...rel(clothFrom, clothOver)],
            [0.6, ...rel(clothFrom, [firstAt[0] + withFirst[0], firstAt[1] + withFirst[1]])],
            [0.76, ...rel(clothFrom, [firstAt[0] + withFirst[0], firstAt[1] + withFirst[1]])],
            [0.9, ...rel(clothFrom, [first[0] + withFirst[0], first[1] + withFirst[1]])]
          ]
        })
      },
      {
        name: "glints over the first place",
        svg: glints([[firstAt[0], n(firstAt[1] - 5)]], 1.3),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.62, 1]
          ],
          xy: [
            [0.76, 0, 0],
            [0.9, ...rel(firstAt, first)]
          ]
        }),
        loop: twinkle()
      },
      {
        name: "in return: a small sack, given",
        svg: sack(sackFrom[0], sackFrom[1], 0.7),
        keys: track({
          opacity: [
            [0.62, 0],
            [0.63, 1]
          ],
          xy: [
            [0.64, 0, 0],
            [0.68, ...rel(sackFrom, sackUnder)],
            [0.72, ...rel(sackFrom, [secondAt[0] + withSecond[0], secondAt[1] + withSecond[1]])],
            [0.76, ...rel(sackFrom, [secondAt[0] + withSecond[0], secondAt[1] + withSecond[1]])],
            [0.9, ...rel(sackFrom, [second[0] + withSecond[0], second[1] + withSecond[1]])]
          ]
        })
      },
      {
        name: "glints over the other place",
        svg: glints([[secondAt[0], n(secondAt[1] - 5)]], 1.3),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.74, 1]
          ],
          xy: [
            [0.76, 0, 0],
            [0.9, ...rel(secondAt, second)]
          ]
        }),
        loop: twinkle()
      },
      { name: "a warm light about his home", svg: wash(118, 90, 30, 16, WARM, 0.12), keys: showAt(0.9, 0.93), loop: soft },
      { name: "a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.4), 6.4, 2.6, SOFT_GOLD), keys: showAt(0.92, 0.95), loop: soft }
    ],
    words: [
      { text: "Aishah: he used to accept gifts", from: 0.02, to: 0.48 },
      { text: "and used to give something in return.", from: 0.5, to: 1 }
    ]
  };
}

// Spend on them. Zaynab, the daughter of Umm Salamah, said: my mother said: O Messenger of Allah, shall I receive a
// reward if I spend for the sustenance of Abu Salamah's offspring, and in fact they are also my sons? He replied:
// spend on them and you will get a reward for what you spend on them (Sahih al-Bukhari 1467). No one is drawn: by her
// home, Umm Salamah's place comes out of the door, with the places of her young ones about it; his place, a golden
// ring, is by a palm. Her voice asks; a dish of food and a measure of dates show by her, a warm ring comes about each
// young one's place, and a warm ring about them all. His voice answers; a soft golden ring comes about her place,
// with glints, the reward; and a little food goes from the dish to each young one, with a glint over each.
function spendOnThem(): SignArt {
  const door: [number, number] = [27.2, 101.4];
  const hers: [number, number] = [50, 106];
  const young: [number, number][] = [
    [63, 109.4],
    [70, 104.6],
    [69, 114.4]
  ];
  const his: [number, number] = [122, 107];
  const food: [number, number] = [50, 115];
  return {
    kind: "spend-on-them",
    ms: 12000,
    parts: [
      { name: "a clear sky", svg: sky("#BFE3FA", "#E3F1F9", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(80, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 117], [96, 118], [150, 117]]) },
      { name: "her home", svg: big(home(30, 100, 22, 13), 30, 100, 1.6) },
      ...palms([
        [138, 103, 26],
        [102, 94, 16]
      ]),
      { name: "his place, by the palm", svg: ring(his[0], his[1], 3, GOLD) },
      {
        name: "Umm Salamah's place, coming out of her door",
        svg: someone(door[0], door[1], 2, FOLK),
        keys: track({
          xy: [
            [0.025, 0, 0],
            [0.07, ...rel(door, hers)]
          ]
        })
      },
      ...young.map(([x, y], i): SignPart => ({ name: `the place of a young one of hers ${i + 1}`, svg: someone(x, y, 1.5, FOLK), loop: { move: "bob", ms: 2200 + i * 300, y: 0.5, phase: i / 3 } })),
      { name: "her voice: asking", svg: arcs(n(hers[0] + 3.8), n(hers[1] - 2), ITS_VOICE), keys: showFor(0.145, 0.155, 0.63, 0.636), loop: speaking },
      {
        name: "a dish of food by her",
        svg: big(dish(food[0], food[1]) + `<ellipse cx="${n(food[0] - 0.6)}" cy="${n(food[1] - 2)}" rx="2.2" ry="1.1" fill="#D9A35E"/>`, food[0], food[1], 1.4),
        keys: showAt(0.268, 0.29)
      },
      { name: "a measure of dates by her", svg: datesMeasure(37, n(food[1] + 1), 1.5), keys: showAt(0.3, 0.32) },
      {
        name: "Abu Salamah's offspring: a warm ring about each young one",
        svg: young.map(([x, y]) => care(x, n(y + 0.4), 3.6, 1.9, "#E8B45A")).join(""),
        keys: showAt(0.39, 0.42),
        loop: soft
      },
      { name: "they are hers too: a warm ring about them all", svg: care(60, 109.6, 16, 8.4, "#E8B45A"), keys: showAt(0.512, 0.545), loop: soft },
      { name: "his voice: spend on them", svg: arcsLeft(n(his[0] - 4), n(his[1] - 2), GOLD), keys: showAt(0.64, 0.65), loop: speaking },
      { name: "a reward: a soft golden ring about her place", svg: care(hers[0], n(hers[1] + 0.4), 5.4, 2.6, SOFT_GOLD), keys: showAt(0.756, 0.79), loop: soft },
      {
        name: "glints over her place",
        svg: glints(
          [
            [n(hers[0] - 3), n(hers[1] - 5.4)],
            [n(hers[0] + 3), n(hers[1] - 6)]
          ],
          1.2
        ),
        keys: showAt(0.79, 0.81),
        loop: twinkle()
      },
      ...young.map(
        ([x, y], i): SignPart => ({
          name: `a little food, going to a young one ${i + 1}`,
          svg: portion(food[0], n(food[1] - 2), 1.4),
          keys: track({
            opacity: [
              [at3(0.876 + i * 0.012), 0],
              [at3(0.879 + i * 0.012), 1]
            ],
            xy: [
              [at3(0.879 + i * 0.012), 0, 0],
              [at3(0.9 + i * 0.012), n(x + 3.2 - food[0]), n(y + 2.6 - food[1] + 2)]
            ]
          })
        })
      ),
      {
        name: "what she spends on them: a glint over each young one",
        svg: glints(
          young.map(([x, y]) => [x, n(y - 4.2)]),
          1.1
        ),
        keys: showAt(0.93, 0.95),
        loop: twinkle()
      }
    ],
    words: eightLines([
      "Zaynab: my mother said:",
      "O Allah's Messenger! Shall I receive",
      "a reward if I spend for the sustenance",
      "of Abu Salamah's offspring,",
      "and in fact they are also my sons?",
      "He replied: Spend on them",
      "and you will get a reward",
      "for what you spend on them."
    ])
  };
}

// I will make you get up. Abdullah ibn Abi Qatadah said: my father said: one night we were traveling with the Prophet
// ﷺ. He said: I am afraid that you will sleep and miss the prayer. Bilal said: I will make you get up. So all slept,
// and Bilal rested his back against his Rahila, and he too was overwhelmed and slept. The Prophet ﷺ got up when the
// edge of the sun had risen, and said: O Bilal, get up and pronounce the Adhan for the prayer. He performed ablution,
// and when the sun came up and became bright, he stood up and prayed (Sahih al-Bukhari 595; the words leave out the
// people's wish to rest, and what was said of the sleep). No one is drawn and no one rides: at night on the open
// land, his place, a golden ring, is with the travelers' places, by their camels, saddled with no one on them. His
// voice speaks, then Bilal's voice, and a soft light comes about Bilal's place, keeping watch. A soft blue comes over
// the travelers' places as they sleep; Bilal's place goes to rest by his camel, its light fades and it dims. Dawn
// comes, the stars fade, a soft light comes about his place, awake, and the edge of the sun shows over the hills. His
// voice calls to Bilal; Bilal's place comes up bright, and his voice gives the Adhan. The sun rises bright, the blue
// goes, and a spark of the prayer rises from his place.
function iWillMakeYouGetUp(): SignArt {
  const his: [number, number] = [42, 106];
  const bilal: [number, number] = [96, 110];
  const rest: [number, number] = [117, 111];
  const travelers: [number, number][] = [
    [20, 105],
    [28, 112],
    [56, 112],
    [64, 105.4]
  ];
  return {
    kind: "i-will-make-you-get-up",
    ms: 12000,
    parts: [
      { name: "the morning sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "dawn", svg: sky("#E4B49A", "#F2D7C2", 62) + glow(140, 62, 26, "#FFE6B8", 0.12), keys: showFor(0.632, 0.66, 0.876, 0.92) },
      { name: "the night", svg: nightSky(62), keys: track({ opacity: [[0.632, 1], [0.66, 0]] }) },
      {
        name: "stars",
        svg: stars([
          [12, 10],
          [34, 24],
          [56, 12],
          [78, 28],
          [96, 10],
          [118, 22],
          [148, 14],
          [140, 32],
          [8, 34],
          [66, 38]
        ]),
        keys: track({ opacity: [[0.632, 1], [0.65, 0]] }),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      { name: "the moon, low", svg: glow(24, 40, 8, "#FFF3B8", 0.07) + crescent(24, 40, 3.6, 1.8, "#F6EFD2"), keys: track({ opacity: [[0.632, 1], [0.65, 0]] }) },
      {
        name: "the sun: its edge, then rising bright",
        svg: sun(140, 66),
        keys: track({
          opacity: [
            [0.672, 0],
            [0.676, 1]
          ],
          xy: [
            [0.676, 0, 0],
            [0.7, 0, -3],
            [0.876, 0, -3],
            [0.93, 0, -32]
          ]
        })
      },
      {
        name: "the far hills",
        svg: peaks(
          [
            [20, 10, 28],
            [70, 8, 26],
            [124, 12, 26],
            [156, 9, 20]
          ],
          66,
          "#9A8468",
          false
        )
      },
      { name: "the land", svg: plainLand("#C4A672", [[8, 117], [96, 118], [152, 117]]) },
      {
        name: "a camel, saddled, with no one on it",
        svg: saddled(84, 101, 0.22, false),
        loop: { move: "bob", ms: 3200, y: 0.3 }
      },
      { name: "Bilal's camel, saddled, with no one on it", svg: saddled(137, 111, 0.26, true), loop: { move: "bob", ms: 3600, y: 0.3, phase: 0.5 } },
      { name: "the night over the land", svg: NIGHT_OVER_LAND, keys: track({ opacity: [[0.632, 1], [0.66, 0]] }) },
      { name: "the travelers' places", svg: travelers.map(([x, y]) => someone(x, y, 1.7, LIGHT)).join("") },
      {
        name: "asleep: a soft blue over the travelers' places",
        svg: wash(his[0], n(his[1] + 2.4), 30, 7.4, "#7FA0D8", 0.26),
        keys: showFor(0.39, 0.42, 0.876, 0.9),
        loop: soft
      },
      { name: "awake: a soft light about his place", svg: glow(his[0], his[1], 6, "#FFF3C8", 0.12), keys: showAt(0.66, 0.672), loop: soft },
      { name: "his place", svg: ring(his[0], his[1], 3, GOLD) },
      { name: "his voice: I am afraid", svg: arcs(n(his[0] + 4), n(his[1] - 2), GOLD), keys: showFor(0.022, 0.03, 0.15, 0.16), loop: speaking },
      {
        name: "keeping watch: a soft light about Bilal's place",
        svg: glow(bilal[0], bilal[1], 5.4, "#FFF3C8", 0.1) + care(bilal[0], n(bilal[1] + 0.4), 4.8, 2.6, "#F3E3C0"),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.3, 1],
            [0.53, 1],
            [0.555, 0]
          ],
          xy: [
            [0.43, 0, 0],
            [0.455, ...rel(bilal, rest)]
          ]
        }),
        loop: soft
      },
      {
        name: "Bilal's place",
        svg: someone(bilal[0], bilal[1], 1.8, LIGHT),
        keys: track({
          opacity: [
            [0.555, 1],
            [0.575, 0.45],
            [0.77, 0.45],
            [0.78, 1]
          ],
          xy: [
            [0.43, 0, 0],
            [0.455, rest[0] - bilal[0], n(rest[1] - bilal[1])],
            [0.77, rest[0] - bilal[0], n(rest[1] - bilal[1])],
            [0.79, rest[0] - bilal[0], n(rest[1] - bilal[1] - 2.4)]
          ]
        })
      },
      { name: "Bilal's voice: I will make you get up", svg: arcsLeft(n(bilal[0] - 3.4), n(bilal[1] - 2), "#E9C98C"), keys: showFor(0.196, 0.205, 0.325, 0.334), loop: speaking },
      { name: "his voice: O Bilal", svg: arcs(n(his[0] + 4), n(his[1] - 2), GOLD), keys: showFor(0.754, 0.762, 0.81, 0.82), loop: speaking },
      {
        name: "Bilal's voice: the Adhan",
        svg: arcsLeft(n(rest[0] - 3.4), n(rest[1] - 5), "#E8A93A") + arcs(n(rest[0] + 3.4), n(rest[1] - 5), "#E8A93A"),
        keys: showAt(0.795, 0.805),
        loop: speaking
      },
      { name: "the prayer: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 6), 1.6, "#FFE7A0"), keys: sparkStays(0.93, 0.958, 12), loop: twinkle() }
    ],
    words: eightLines([
      "He said: I am afraid that you will sleep",
      "and miss the prayer. Bilal said:",
      "I will make you get up.",
      "So all slept and Bilal rested his back",
      "against his Rahila and he too slept.",
      "He got up when the edge of the sun",
      "had risen. O Bilal! Pronounce the Adhan.",
      "When the sun became bright, he prayed."
    ])
  };
}

// Good in all the families of the Ansar. Abu Humayd said: the Prophet ﷺ said: the best of the Ansar families are the
// families of Banu an-Najjar, then Banu Abdul Ash-hal, then Banu al-Harith, then Banu Sa'idah; and there is good in
// all the families of the Ansar. Sa'd ibn Ubadah met the Prophet ﷺ and said: you have made us the last of them. He
// replied: isn't it sufficient that you are regarded amongst the best? (Sahih al-Bukhari 3791; the page's "(homes)" is
// left out). No one is drawn: in Madinah, among its palms, four groups of homes stand far off, and other homes of
// the Ansar about them; his place, a golden ring, is near. His voice speaks, and a soft golden ring comes about each
// group of homes in turn as it is named; then glints come over all the homes of the Ansar, with a warm light. Sa'd's
// place comes along the way and his voice speaks; his voice replies, a soft golden ring comes about Sa'd's place, and
// glints come over the homes of Banu Sa'idah, among the best.
function goodInAllTheAnsar(): SignArt {
  const his: [number, number] = [40, 108];
  const sad: [number, number] = [146, 113.2];
  const sadAt: [number, number] = [58, 109.6];
  const groups: [number, number][] = [
    [23, 88],
    [61, 87],
    [99, 88],
    [137, 87]
  ];
  const homesAt = ([x, y]: [number, number]) => home(n(x - 6.4), y, 12, 8.8) + home(n(x + 6.6), n(y - 0.8), 12, 9.8);
  const others: [number, number][] = [
    [42, 75],
    [80, 74],
    [118, 75],
    [154, 74]
  ];
  const ringed = (i: number, from: number, to: number): SignPart => ({
    name: ["the homes of Banu an-Najjar: a soft golden ring", "the homes of Abdul Ash-hal: a soft golden ring", "the homes of Banu al-Harith: a soft golden ring", "the homes of Banu Sa'idah: a soft golden ring"][i],
    svg: glow(groups[i][0], n(groups[i][1] - 4.6), 12, "#FFE7A0", 0.14) + care(groups[i][0], n(groups[i][1] + 0.6), 15.4, 3.8, SOFT_GOLD),
    keys: showAt(from, to),
    loop: soft
  });
  return {
    kind: "good-in-all-the-ansar",
    ms: 12000,
    parts: [
      { name: "a clear sky", svg: sky("#BFE3FA", "#E3F1F9", 62) },
      { name: "the sun", svg: sun(146, 16) },
      { name: "a cloud", svg: cloud(70, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 118], [96, 118], [124, 116]]) },
      { name: "other homes of the Ansar, further off", svg: others.map(([x, y]) => big(home(x, y, 12, 8.4, "#D9BC90", "#C9A878", "#9A7A58"), x, y, 0.6)).join("") },
      { name: "the homes of Banu an-Najjar", svg: homesAt(groups[0]) },
      { name: "the homes of Abdul Ash-hal", svg: homesAt(groups[1]) },
      { name: "the homes of Banu al-Harith", svg: homesAt(groups[2]) },
      { name: "the homes of Banu Sa'idah", svg: homesAt(groups[3]) },
      ...palms(
        [
          [6, 118, 22],
          [156, 118, 22]
        ],
        "the Ansar"
      ),
      { name: "the way across Madinah", svg: way("M160 113.6 C130 113 100 111 76 110.2 C68 110 60 109.6 46 108.6", "#D3BE96", 1) },
      { name: "his place", svg: ring(his[0], his[1], 3, GOLD) },
      { name: "his voice: the best of the Ansar families", svg: arcs(n(his[0] + 4), n(his[1] - 2), GOLD), keys: showFor(0.022, 0.03, 0.51, 0.52), loop: speaking },
      ringed(0, 0.146, 0.17),
      ringed(1, 0.185, 0.21),
      ringed(2, 0.268, 0.29),
      ringed(3, 0.305, 0.33),
      {
        name: "good in all the families of the Ansar: glints over all the homes",
        svg: glints(
          [...groups.map(([x, y]): [number, number] => [x, n(y - 14)]), ...others.map(([x, y]): [number, number] => [x, n(y - 7.4)])],
          1.1
        ),
        keys: showAt(0.39, 0.43),
        loop: twinkle(1500)
      },
      { name: "a warm light over Madinah", svg: wash(80, 84, 78, 16, WARM, 0.1), keys: showAt(0.43, 0.455), loop: soft },
      {
        name: "Sa'd's place, coming",
        svg: someone(sad[0], sad[1], 1.8, ITS_VOICE),
        keys: track({
          xy: [
            [0.512, 0, 0],
            [0.555, sadAt[0] - sad[0], sadAt[1] - sad[1]]
          ]
        })
      },
      { name: "Sa'd's voice: you have made us the last", svg: arcsLeft(n(sadAt[0] - 3.4), n(sadAt[1] - 2), ITS_VOICE), keys: showFor(0.56, 0.57, 0.672, 0.68), loop: speaking },
      { name: "his voice: isn't it sufficient", svg: arcs(n(his[0] + 4), n(his[1] - 2), GOLD), keys: showAt(0.685, 0.695), loop: speaking },
      { name: "a soft golden ring about Sa'd's place", svg: care(sadAt[0], n(sadAt[1] + 0.4), 5.4, 2.6, SOFT_GOLD), keys: showAt(0.756, 0.79), loop: soft },
      {
        name: "amongst the best: glints over the homes of Banu Sa'idah",
        svg: glints(
          [
            [n(groups[3][0] - 6.4), n(groups[3][1] - 12.4)],
            [n(groups[3][0] + 6.6), n(groups[3][1] - 14.4)],
            [n(groups[3][0]), n(groups[3][1] - 5)]
          ],
          1.3
        ),
        keys: showAt(0.878, 0.9),
        loop: twinkle()
      },
      { name: "a warm light about Sa'd's place", svg: glow(sadAt[0], sadAt[1], 6.4, "#FFE2A0", 0.18), keys: showAt(0.91, 0.94), loop: soft }
    ],
    words: eightLines([
      "He said: The best of the Ansar families",
      "are Banu an-Najjar, then Abdul Ash-hal,",
      "then Banu al-Harith, then Banu Sa'idah;",
      "and there is good in all the families",
      "of the Ansar. Sa'd said: you have made",
      "us the last of them. He replied:",
      "Isn't it sufficient that you are",
      "regarded amongst the best?"
    ])
  };
}

// Where do you like me to pray? Itban ibn Malik al-Ansari said: the Prophet ﷺ asked permission for entering and I
// allowed him. He asked: where do you like me to pray in your house? I pointed to a place which I liked. He stood up
// for prayer and we aligned behind him, and he finished the prayer with taslim and we did the same (Sahih al-Bukhari
// 686; the page's "(came to my house and)" is left out). No one is drawn: in Itban's house, his place, a golden ring,
// is at the doorway, and his voice asks to come in; Itban's voice answers, and his place comes in. His voice asks
// where to pray; Itban's voice answers, a faint golden line goes from Itban's place to a spot on the far side of
// the room, and a soft light shows there. His place goes to it and a spark of prayer rises; the places of Itban and
// his household come and stand in a row behind it, and sparks rise from them. A glint comes to his right and then
// his left, the taslim, and then to the right and the left of each in the row; and a warm light fills the room.
function whereDoYouLikeMeToPray(): SignArt {
  const LINE = 78;
  const atDoor: [number, number] = [19, 76];
  const inside: [number, number] = [56, 98];
  const spot: [number, number] = [132, 96];
  const itban: [number, number] = [90, 106];
  const household: [number, number][] = [
    [100, 90],
    [106, 114]
  ];
  const row: [number, number][] = [
    [118, 88],
    [118, 96],
    [118, 104]
  ];
  const rowFrom: [number, number][] = [household[0], itban, household[1]];
  return {
    kind: "where-do-you-like-me-to-pray",
    ms: 12000,
    parts: [
      { name: "Itban's house: its wall and floor", svg: room("#E8D2AC", "#CDA676", LINE) },
      { name: "the doorway, with the day outside", svg: doorway(10, 18, 30, LINE) },
      { name: "a palm outside the doorway", svg: palm(19, 70, 12), origin: { x: 19, y: 70 }, loop: { move: "sway", ms: 5400, angle: 1.2 } },
      { name: "a window, with the sky in it", svg: windowOn(70, 24, 20, 14) },
      { name: "a cloud going by the window", svg: cloud(79, 31, 0.22, "#FFFFFF", 0.9), loop: { move: "bob", ms: 7000, x: 2.4 } },
      { name: "a shelf with a cup and a jar", svg: shelf(118, 48, 22) },
      {
        name: "a cushion by the wall",
        svg: `<rect x="38" y="70.6" width="24" height="8" rx="3" fill="#A86E44"/><path d="M40 73.6 L60 73.6" stroke="#D29A62" stroke-width="0.7"/>`
      },
      { name: "the place which he liked: a soft light", svg: glow(spot[0], n(spot[1] + 0.6), 6, "#FFE7A0", 0.24) + care(spot[0], n(spot[1] + 0.6), 5.4, 2.4, SOFT_GOLD), keys: showAt(0.43, 0.452), loop: soft },
      {
        name: "his place: at the doorway, then in, then at the place Itban liked",
        svg: ring(atDoor[0], atDoor[1], 3, GOLD),
        keys: track({
          xy: [
            [0.16, 0, 0],
            [0.205, ...rel(atDoor, inside)],
            [0.512, ...rel(atDoor, inside)],
            [0.545, ...rel(atDoor, spot)]
          ]
        })
      },
      { name: "his voice at the doorway: asking permission", svg: arcs(n(atDoor[0] + 4), n(atDoor[1] - 2), GOLD), keys: showFor(0.022, 0.03, 0.08, 0.09), loop: speaking },
      { name: "Itban's voice: allowing him", svg: arcsLeft(n(itban[0] - 3.4), n(itban[1] - 2), ITS_VOICE), keys: showFor(0.145, 0.152, 0.195, 0.2), loop: speaking },
      { name: "his voice: where do you like me to pray", svg: arcs(n(inside[0] + 4), n(inside[1] - 2), GOLD), keys: showFor(0.205, 0.212, 0.386, 0.392), loop: speaking },
      { name: "Itban's voice: this place", svg: arcs(n(itban[0] + 3.4), n(itban[1] - 2), ITS_VOICE), keys: showFor(0.396, 0.404, 0.55, 0.56), loop: speaking },
      { name: "pointing to the place: a faint golden line", svg: lookLine(n(itban[0] + 2.4), n(itban[1] - 2.4), n(spot[0] - 2), n(spot[1] - 1.6), 84, GOLD), keys: showFor(0.415, 0.43, 0.55, 0.56) },
      { name: "the prayer: a spark rising from his place", svg: sparkle(spot[0], n(spot[1] - 6), 1.6, "#FFE7A0"), keys: sparkStays(0.548, 0.575, 12), loop: twinkle() },
      ...rowFrom.map(
        ([x, y], i): SignPart => ({
          name: i === 1 ? "Itban's place" : `the place of one of his household ${i === 0 ? 1 : 2}`,
          svg: someone(x, y, 1.8, i === 1 ? ITS_VOICE : "#7E5530"),
          keys: track({
            xy: [
              [at3(0.632 + i * 0.008), 0, 0],
              [at3(0.672 + i * 0.008), ...rel([x, y], row[i])]
            ]
          })
        })
      ),
      {
        name: "aligned behind him: sparks rising from the row",
        svg: row.map(([x, y]) => sparkle(x, n(y - 5), 1.2, "#FFE7A0")).join(""),
        keys: sparkStays(0.69, 0.7, 6),
        loop: twinkle()
      },
      { name: "the taslim: a glint to his right", svg: sparkle(spot[0], n(spot[1] + 5.2), 1.3, "#FFF3C0"), keys: showAt(0.758, 0.772), loop: twinkle(900) },
      { name: "the taslim: a glint to his left", svg: sparkle(spot[0], n(spot[1] - 5.2), 1.3, "#FFF3C0"), keys: showAt(0.788, 0.802), loop: twinkle(900) },
      { name: "the same: glints to the right of the row", svg: glints(row.map(([x, y]) => [n(x + 0.6), n(y + 3)]), 1, "#FFF3C0"), keys: showAt(0.878, 0.892), loop: twinkle(900) },
      { name: "the same: glints to the left of the row", svg: glints(row.map(([x, y]) => [n(x - 0.6), n(y - 3)]), 1, "#FFF3C0"), keys: showAt(0.904, 0.918), loop: twinkle(900) },
      { name: "a warm light in the house", svg: wash(112, 96, 56, 16, WARM, 0.1), keys: showAt(0.93, 0.955), loop: soft }
    ],
    words: eightLines([
      "Itban: he asked permission for entering",
      "and I allowed him. He asked:",
      "Where do you like me to pray",
      "in your house? I pointed to a place",
      "which I liked. He stood up for prayer",
      "and we aligned behind him,",
      "and he finished the prayer with taslim",
      "and we did the same."
    ])
  };
}

export const HABIT_ART = {
  "ramal-in-three-rounds": ramalInThreeRounds,
  "start-from-the-right-side": startFromTheRightSide,
  "something-in-return": somethingInReturn,
  "spend-on-them": spendOnThem,
  "i-will-make-you-get-up": iWillMakeYouGetUp,
  "good-in-all-the-ansar": goodInAllTheAnsar,
  "where-do-you-like-me-to-pray": whereDoYouLikeMeToPray
} as const;
