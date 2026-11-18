import { cloud, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { kabah } from "./historyArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, wash } from "./worshipArt";
import { camel, care, DAWN, palms, sparkRising, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { road, showAt, showFor } from "./roadArt";
import { at3 } from "./storyArt";
import { lookLine } from "./truthArt";

/**
 * Simple: his bed was of leather, stuffed with palm fibre, Aishah said. Anas never knew him to eat from fancy dishes,
 * nor was thin bread baked for him, nor did he eat at a table; they ate on leather mats, Qatadah said. Ibn Umar never
 * left touching the two corners, in hardship or in ease, since he saw him touching them. When he had prayed Fajr, the
 * servants of Madinah brought their vessels of water, and he dipped his hand in each, even in the cold dawn. On the
 * road to Makkah he passed Jumdan and said: go on, the mufarridun have gone ahead: men and women who remember Allah
 * much. Wear sandals often, he said, for a man is still riding as long as he wears sandals. And people will be gathered
 * on the Day of Resurrection on a reddish-white land, like a loaf of pure flour, with no landmark for anyone. Only the
 * land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn,
 * not even a hand, a foot or a face, and no one rides: where someone was, a ring or a small dashed circle shows it,
 * where someone went, the circle goes, and a voice is arcs in the air. Nothing comes down from the sky: what is good is
 * a light, glints and a soft golden ring, and what was never his a grey ring. No name or word is written.
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

/** A spark at (x, y) that rises by `rise` from `from` and is gone by `to`. */
const rising = (name: string, x: number, y: number, from: number, to: number, rise = 10): SignPart => ({
  name,
  svg: sparkle(x, y, 1.4, "#FFE7A0"),
  keys: sparkRising(from, to, rise),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

/** A picture turned about the upright line through x `cx`. */
const turned = (svg: string, cx: number) => `<g transform="translate(${n(cx * 2)} 0) scale(-1 1)">${svg}</g>`;

/** Keys of a move from (0, 0) through the given points, each [at, x, y]. */
const moves = (points: [number, number, number][]) => track({ xy: points });

/** A bed of leather lying on the ground, its middle at (x, y), `w` wide, stitched along its edge. */
const leatherBed = (x: number, y: number, w = 26) =>
  `<rect x="${n(x - w / 2 + 0.6)}" y="${n(y - 2.2)}" width="${w}" height="5.6" rx="2.4" fill="#000000" opacity="0.1"/>` +
  `<rect x="${n(x - w / 2)}" y="${n(y - 3)}" width="${w}" height="5.6" rx="2.4" fill="#A0663A"/>` +
  `<rect x="${n(x - w / 2 + 1)}" y="${n(y - 2.2)}" width="${n(w - 2)}" height="4" rx="1.8" fill="none" stroke="#D9A86C" stroke-width="0.4" stroke-dasharray="0.8 0.6"/>` +
  `<path d="M${n(x - w / 2 + 2)} ${n(y - 1.4)} Q${x} ${n(y - 2.6)} ${n(x + w / 2 - 2)} ${n(y - 1.4)}" stroke="#C48A52" stroke-width="0.5" fill="none" opacity="0.7"/>`;

/** A tanned hide spread on the ground to dry, its middle at (x, y). */
const hide = (x: number, y: number) =>
  `<path d="M${n(x - 7)} ${n(y - 1)} Q${n(x - 6)} ${n(y - 3.4)} ${n(x - 3)} ${n(y - 2.6)} Q${x} ${n(y - 4)} ${n(x + 3)} ${n(y - 2.6)} Q${n(x + 6)} ${n(y - 3.4)} ${n(x + 7)} ${n(y - 1)} Q${n(x + 7.6)} ${n(y + 1.6)} ${n(x + 4)} ${n(y + 2)} Q${x} ${n(y + 3)} ${n(x - 4)} ${n(y + 2)} Q${n(x - 7.6)} ${n(y + 1.6)} ${n(x - 7)} ${n(y - 1)} Z" fill="#B97E4A"/>` +
  `<path d="M${n(x - 4)} ${n(y - 0.4)} Q${x} ${n(y - 1.4)} ${n(x + 4)} ${n(y - 0.4)}" stroke="#9C6436" stroke-width="0.4" fill="none"/>`;

/** A small tuft of palm fibre, brown strands, its middle at (x, y). */
const fibre = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${n(y + 0.6)} Q${n(x - 0.4)} ${n(y - 1.2)} ${n(x + 1.6)} ${n(y - 0.4)} M${n(x - 1.4)} ${n(y - 0.4)} Q${n(x + 0.2)} ${n(y + 1)} ${n(x + 1.4)} ${n(y + 0.8)} M${n(x - 0.8)} ${n(y - 1)} Q${x} ${n(y + 0.2)} ${n(x + 0.9)} ${n(y - 1.2)}" stroke="#7A4A26" stroke-width="0.45" fill="none" stroke-linecap="round"/>`;

/** A big tray of fine dishes: small bowls on a wide tray, its middle at (x, y). */
const fancyDishes = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="8" ry="2.2" fill="#D7C9A8" stroke="#B9A57A" stroke-width="0.4"/>` +
  [-4.6, 0, 4.6]
    .map(
      (dx) =>
        `<path d="M${n(x + dx - 1.8)} ${n(y - 1.6)} Q${n(x + dx)} ${n(y + 0.6)} ${n(x + dx + 1.8)} ${n(y - 1.6)} Z" fill="#E9F0F4" stroke="#9FB4C2" stroke-width="0.3"/><ellipse cx="${n(x + dx)}" cy="${n(y - 1.6)}" rx="1.8" ry="0.45" fill="#C98A4E"/>`
    )
    .join("");

/** Thin bread, well baked: a wide thin round, its middle at (x, y). */
const thinBread = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="1.5" fill="#E9CB8E" stroke="#C9A160" stroke-width="0.35"/>` +
  `<circle cx="${n(x - 2.4)}" cy="${n(y - 0.2)}" r="0.35" fill="#B8864A"/><circle cx="${n(x + 1.2)}" cy="${n(y + 0.4)}" r="0.3" fill="#B8864A"/><circle cx="${n(x + 3.4)}" cy="${n(y - 0.3)}" r="0.3" fill="#B8864A"/>`;

/** A dining table on four legs, its top's middle at (x, y). */
const table = (x: number, y: number) =>
  `<rect x="${n(x - 9)}" y="${n(y - 1)}" width="18" height="2" fill="#8E5E34"/>` +
  [-7.6, -3.4, 3.4, 7.6].map((dx) => `<rect x="${n(x + dx - 0.5)}" y="${n(y + 1)}" width="1" height="${Math.abs(dx) > 5 ? 5.6 : 4.6}" fill="#74482A"/>`).join("");

/** The Black Stone in its frame of silver, its middle at (x, y). */
const blackStone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="1.6" fill="#2A2A2A" stroke="#C9CED4" stroke-width="0.6"/>`;

/** The Yemeni Corner: a faint line down the corner of the House, its foot at (x, y). */
const yemeniCorner = (x: number, y: number) => `<path d="M${x} ${n(y - 26)} L${x} ${y}" stroke="#4A4A4A" stroke-width="0.8"/>`;

/** A bowl of water, its foot's middle at (x, y). */
const vessel = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${n(y - 2.4)} Q${n(x - 2.4)} ${y} ${x} ${y} Q${n(x + 2.4)} ${y} ${n(x + 2.6)} ${n(y - 2.4)} Z" fill="#9A6A3E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.4)}" rx="2.5" ry="0.6" fill="#6FA6CC"/>`;

/** A sandal of leather, seen from the side, its sole's middle at (x, y), with two straps. */
const sandal = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${y} L${n(x + 2.6)} ${y} Q${n(x + 3.2)} ${n(y - 0.5)} ${n(x + 2.6)} ${n(y - 0.9)} L${n(x - 2.6)} ${n(y - 0.9)} Q${n(x - 3)} ${n(y - 0.5)} ${n(x - 2.6)} ${y} Z" fill="#9A6B3C"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 0.9)} Q${n(x - 0.6)} ${n(y - 2.6)} ${n(x + 0.6)} ${n(y - 0.9)} M${n(x + 0.4)} ${n(y - 0.9)} Q${n(x + 1.4)} ${n(y - 2.4)} ${n(x + 2.2)} ${n(y - 0.9)}" stroke="#5E3C1E" stroke-width="0.45" fill="none"/>`;

/** Stones and thorns along a rough way, about y `y`, from x `x1` to `x2`. */
const roughWay = (x1: number, x2: number, y: number) => {
  let out = "";
  for (let x = x1 + 3, i = 0; x < x2; x += 7.4, i += 1) {
    const dy = i % 2 ? 1.2 : -0.8;
    out +=
      i % 3 === 2
        ? `<path d="M${n(x - 1.4)} ${n(y + dy)} L${n(x - 0.4)} ${n(y + dy - 1.6)} L${n(x + 0.2)} ${n(y + dy - 0.4)} L${n(x + 1)} ${n(y + dy - 1.8)} L${n(x + 1.6)} ${n(y + dy)}" stroke="#7E6A48" stroke-width="0.4" fill="none"/>`
        : `<ellipse cx="${n(x)}" cy="${n(y + dy)}" rx="${i % 2 ? 1.2 : 0.9}" ry="${i % 2 ? 0.7 : 0.55}" fill="#9C8C74"/>`;
  }
  return out;
};

/** A round loaf of pure white flour, its middle at (x, y). */
const pureLoaf = (x: number, y: number, r = 7) =>
  `<ellipse cx="${n(x + 0.6)}" cy="${n(y + 0.8)}" rx="${r}" ry="${n(r * 0.42)}" fill="#000000" opacity="0.08"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.42)}" fill="#F3E6DC"/>` +
  `<ellipse cx="${n(x - r * 0.2)}" cy="${n(y - r * 0.12)}" rx="${n(r * 0.55)}" ry="${n(r * 0.2)}" fill="#FBF4EE"/>`;

/** The wide land of that Day: pale over all, its ground from y 64 down. */
const PLAIN = `<rect width="160" height="120" fill="#EEE8F0"/><rect y="64" width="160" height="56" fill="#ECE2D8"/><path d="M0 64 L160 64" stroke="#DDD0C2" stroke-width="0.6"/>`;

// A bed of leather. Aishah said: the bed mattress of the Prophet ﷺ was made of a leather case stuffed with palm fibres
// (Sahih al-Bukhari 6456). No one is drawn: in Madinah, by his home, his place, a golden ring, and Aishah's place, and
// a palm by the home. Aishah's voice speaks; his mattress shows, lying on the ground by his home. A tanned hide shows,
// a faint line goes from it to the mattress, and glints come over the mattress's leather. Glints come about the fibres
// at the top of the palm's trunk; tufts of fibre go from the palm to the mattress, and its open end shows the fibres
// within; a soft golden ring comes about the mattress.
function aBedOfLeather(): SignArt {
  const bed: [number, number] = [70, 108];
  const palmAt: [number, number, number] = [126, 104, 34];
  const fibreTop: [number, number] = [n(palmAt[0] + palmAt[2] * 0.08 - 0.2), n(palmAt[1] - palmAt[2] + 3)];
  const tuft = (i: number, from: number): SignPart => {
    const start: [number, number] = [n(fibreTop[0] - 1 + i * 1.2), n(fibreTop[1] + 1 + i * 0.8)];
    const end: [number, number] = [n(bed[0] + 6 - i * 5), n(bed[1] - 1.2)];
    return {
      name: `palm fibres, going into the mattress ${i + 1}`,
      svg: fibre(start[0], start[1]),
      keys: track({
        opacity: [
          [from, 0],
          [at3(from + 0.01), 1],
          [at3(from + 0.09), 1],
          [at3(from + 0.1), 0]
        ],
        xy: [
          [at3(from + 0.01), 0, 0],
          [at3(from + 0.09), n(end[0] - start[0]), n(end[1] - start[1])]
        ]
      })
    };
  };
  return {
    kind: "a-bed-of-leather",
    ms: 8000,
    parts: [
      ...daySky(30, 96, 8000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "his home in Madinah", svg: home(64, 98, 36, 24) },
      ...palms([palmAt]),
      { name: "his place, a golden ring", svg: ring(92, 106.4, 2.4, GOLD) },
      { name: "Aishah's place", svg: someone(42, 108.4, 1.6) },
      { name: "Aishah's voice: his mattress", svg: arcs(44.6, 105, ITS_VOICE), keys: showFor(0.03, 0.04, 0.25, 0.26), loop: speaking },
      { name: "his mattress, lying on the ground by his home", svg: leatherBed(bed[0], bed[1]), keys: showAt(0.08, 0.12) },
      { name: "a leather case: a tanned hide", svg: hide(108, 113), keys: showAt(0.33, 0.37) },
      { name: "a leather case: a faint line from the hide to the mattress", svg: lookLine(101, 112, n(bed[0] + 12), n(bed[1] + 0.4), 106, SOFT_GOLD), keys: showFor(0.4, 0.43, 0.56, 0.58) },
      {
        name: "glints over the mattress's leather",
        svg: glints([
          [n(bed[0] - 7), n(bed[1] - 4.6)],
          [n(bed[0] + 2), n(bed[1] - 5.2)],
          [n(bed[0] + 9), n(bed[1] - 4.4)]
        ]),
        keys: showFor(0.46, 0.48, 0.56, 0.58),
        loop: twinkle()
      },
      {
        name: "palm fibres at the top of the palm's trunk: glints",
        svg: glints([
          [n(fibreTop[0] - 2.4), n(fibreTop[1] - 1)],
          [n(fibreTop[0] + 2.4), n(fibreTop[1] + 0.6)]
        ]),
        keys: showFor(0.65, 0.67, 0.86, 0.88),
        loop: twinkle()
      },
      tuft(0, 0.68),
      tuft(1, 0.71),
      tuft(2, 0.74),
      {
        name: "stuffed: palm fibres within the mattress's open end",
        svg:
          `<rect x="${n(bed[0] + 9.6)}" y="${n(bed[1] - 2.2)}" width="2.6" height="4" rx="1" fill="#C9A06A"/>` +
          fibre(n(bed[0] + 10.9), n(bed[1] - 0.6)),
        keys: showAt(0.84, 0.86)
      },
      { name: "a soft golden ring about the mattress", svg: care(bed[0], n(bed[1] + 0.4), 16, 4.6, SOFT_GOLD), keys: showAt(0.89, 0.92), loop: soft }
    ],
    words: [
      { text: "Aishah: his mattress", from: 0.02, to: 0.3 },
      { text: "was a leather case", from: 0.32, to: 0.62 },
      { text: "stuffed with palm fibres.", from: 0.64, to: 1 }
    ]
  };
}

// Never at a dining table. Anas said: to the best of my knowledge, the Prophet ﷺ never took his meals in a big tray,
// nor did he ever eat well-baked thin bread, nor did he ever eat at a dining table (Sahih al-Bukhari 5386). No one is
// drawn: by his home in Madinah, his place, a golden ring, and Anas's place. Anas's voice speaks; a big tray of fine
// dishes shows faint by the home, and a grey ring comes about it, never his; then well-baked thin bread shows faint
// beside it, with a grey ring; then a dining table, faint, with a grey ring. The three stay, faint in their grey rings.
function neverAtATable(): SignArt {
  const his: [number, number] = [70, 106.4];
  const tray: [number, number] = [106, 107];
  const bread: [number, number] = [126, 108];
  const board: [number, number] = [146, 101.6];
  return {
    kind: "never-at-a-table",
    ms: 9000,
    parts: [
      ...daySky(140, 40, 9000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([[12, 100, 24]]),
      { name: "his home in Madinah", svg: home(76, 97, 34, 22) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Anas's place", svg: someone(30, 104, 1.6) },
      { name: "Anas's voice: to the best of my knowledge", svg: arcs(32.6, 100.6, ITS_VOICE), keys: showFor(0.03, 0.04, 0.94, 0.95), loop: speaking },
      { name: "a big tray of fine dishes, faint", svg: `<g opacity="0.6">${fancyDishes(tray[0], tray[1])}</g>`, keys: showAt(0.25, 0.28) },
      { name: "never his: a grey ring about the big tray", svg: greyRing(tray[0], n(tray[1] - 0.6), 10, 3.6), keys: showAt(0.3, 0.33) },
      { name: "well-baked thin bread, faint", svg: `<g opacity="0.6">${thinBread(bread[0], bread[1])}</g>`, keys: showAt(0.49, 0.52) },
      { name: "never his: a grey ring about the thin bread", svg: greyRing(bread[0], n(bread[1] - 0.2), 8.4, 3), keys: showAt(0.54, 0.57) },
      { name: "a dining table on four legs, faint", svg: `<g opacity="0.6">${table(board[0], board[1])}</g>`, keys: showAt(0.75, 0.78) },
      { name: "never his: a grey ring about the dining table", svg: greyRing(board[0], n(board[1] + 2.4), 11.4, 5), keys: showAt(0.8, 0.83) }
    ],
    words: [
      { text: "Anas: to the best of my knowledge,", from: 0.02, to: 0.22 },
      { text: "he never ate from a big tray,", from: 0.24, to: 0.46 },
      { text: "nor did he ever eat well-baked thin bread,", from: 0.48, to: 0.72 },
      { text: "nor did he ever eat at a dining table.", from: 0.74, to: 1 }
    ]
  };
}

// The two corners. Ibn Umar said: I have never missed touching these two stones of the Ka'bah, the Black Stone and the
// Yemeni Corner, in crowds or without crowds, since I saw the Prophet ﷺ touching them (Sahih al-Bukhari 1606). No one
// is drawn: in Makkah, the Ka'bah stands with its door near the Corner of the Black Stone, at its front, and the Yemeni
// Corner at the far end of its left side. Ibn Umar's voice speaks; its place comes round by the Yemeni Corner, and a
// glint shows there, then along to the Black Stone, a glint, and it goes on round. Soft golden rings come about the two
// corners. A crowd's places press about the House, and Ibn Umar's place comes round through them, a glint at each
// corner; the crowd goes, the ground about the House lies open and calm, and it comes round again, a glint at each
// corner. Then his place, a golden ring, as Ibn Umar saw it, comes round the same way, with a glint at each corner,
// and a faint golden line goes to it from Ibn Umar's place, which stands back to see.
function theTwoCorners(): SignArt {
  const [kx, ky, kw] = [66, 97, 28];
  const d = n(kw * 0.3);
  const yemeni: [number, number] = [n(kx - d), n(ky - d * 0.6)];
  const stone: [number, number] = [n(kx + 1.6), 92.2];
  const start: [number, number] = [44, 100.4];
  const from = (x: number, y: number): [number, number] => [n(x - start[0]), n(y - start[1])];
  const byYemeni = from(n(yemeni[0] - 2), 95.4);
  const byStone = from(64.4, 100);
  const onRound = from(86, 101);
  const standBack = from(36, 106.4);
  const yemeniGlint: [number, number] = [yemeni[0], n(yemeni[1] - 2.6)];
  const stoneGlint: [number, number] = [n(stone[0] - 0.4), n(stone[1] + 0.2)];
  const crowd: [number, number][] = [
    [50, 104.4],
    [57, 108.6],
    [66, 104.4],
    [74, 109],
    [82, 104.2],
    [90, 108.8],
    [100, 104.6],
    [108, 108.4],
    [44, 109.4],
    [116, 105],
    [50, 96.6],
    [96, 101]
  ];
  return {
    kind: "the-two-corners",
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
      { name: "the land", svg: plainLand("#E6D3A8") },
      { name: "homes of Makkah, far off", svg: home(12, 80, 10, 7) + home(26, 78.4, 9, 6) + home(134, 79, 10, 7) + home(148, 80.6, 9, 6) },
      { name: "the ground about the House", svg: `<ellipse cx="80" cy="102" rx="66" ry="11" fill="#EADFC6"/>` },
      { name: "the Ka'bah, the House", svg: turned(kabah(kx, ky, kw), n(kx + kw / 2)) },
      { name: "the Yemeni Corner", svg: yemeniCorner(yemeni[0], yemeni[1]) },
      { name: "the Corner of the Black Stone", svg: blackStone(stone[0], stone[1]) },
      { name: "Ibn Umar's voice: I have never missed touching them", svg: arcs(36, 96.6, ITS_VOICE), keys: showFor(0.03, 0.04, 0.17, 0.18), loop: speaking },
      {
        name: "in crowds: the places of a crowd about the House",
        svg: crowd.map(([x, y]) => someone(x, y, 1.4)).join(""),
        keys: showFor(0.44, 0.455, 0.52, 0.535)
      },
      {
        name: "Ibn Umar's place, going round the House",
        svg: someone(start[0], start[1], 1.6, "#5A3C22"),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.03, 1],
            [0.17, 1],
            [0.18, 0],
            [0.445, 0],
            [0.455, 1],
            [0.52, 1],
            [0.53, 0],
            [0.535, 0],
            [0.545, 1]
          ],
          xy: [
            [0.03, 0, 0],
            [0.07, ...byYemeni],
            [0.09, ...byYemeni],
            [0.13, ...byStone],
            [0.15, ...byStone],
            [0.18, ...onRound],
            [0.44, ...onRound],
            [0.445, 0, 0],
            [0.455, 0, 0],
            [0.475, ...byYemeni],
            [0.485, ...byYemeni],
            [0.505, ...byStone],
            [0.515, ...byStone],
            [0.53, ...onRound],
            [0.535, 0, 0],
            [0.545, 0, 0],
            [0.565, ...byYemeni],
            [0.575, ...byYemeni],
            [0.595, ...byStone],
            [0.69, ...byStone],
            [0.72, ...standBack]
          ]
        })
      },
      { name: "touching the Yemeni Corner: a glint", svg: sparkle(...yemeniGlint, 1.5, "#FFF3C0"), keys: showFor(0.07, 0.075, 0.09, 0.1), loop: speaking },
      { name: "touching the Black Stone: a glint", svg: sparkle(...stoneGlint, 1.5, "#FFF3C0"), keys: showFor(0.13, 0.135, 0.15, 0.16), loop: speaking },
      { name: "the Black Stone: a soft golden ring about its corner", svg: care(stone[0], n(stone[1] + 0.6), 3.4, 4.6, GOLD), keys: showAt(0.25, 0.28), loop: soft },
      { name: "the Yemeni Corner: a soft golden ring about it", svg: care(yemeni[0], n(yemeni[1] - 4), 3, 5.6, GOLD), keys: showAt(0.29, 0.32), loop: soft },
      { name: "in crowds too: a glint at the Yemeni Corner", svg: sparkle(...yemeniGlint, 1.5, "#FFF3C0"), keys: showFor(0.475, 0.48, 0.49, 0.495), loop: speaking },
      { name: "in crowds too: a glint at the Black Stone", svg: sparkle(...stoneGlint, 1.5, "#FFF3C0"), keys: showFor(0.505, 0.51, 0.52, 0.525), loop: speaking },
      { name: "without crowds: the open ground about the House, calm", svg: wash(80, 104, 50, 7, "#FFF6DA", 0.18), keys: showAt(0.535, 0.55), loop: soft },
      { name: "without crowds too: a glint at the Yemeni Corner", svg: sparkle(...yemeniGlint, 1.5, "#FFF3C0"), keys: showFor(0.565, 0.57, 0.58, 0.585), loop: speaking },
      { name: "without crowds too: a glint at the Black Stone", svg: sparkle(...stoneGlint, 1.5, "#FFF3C0"), keys: showFor(0.595, 0.6, 0.61, 0.615), loop: speaking },
      {
        name: "as Ibn Umar saw it: his place, a golden ring, going round the House",
        svg: ring(start[0], start[1], 2.4, GOLD),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.71, 1]
          ],
          xy: [
            [0.71, 0, 0],
            [0.75, ...byYemeni],
            [0.77, ...byYemeni],
            [0.81, ...byStone]
          ]
        })
      },
      { name: "he touched the Yemeni Corner: a glint", svg: sparkle(...yemeniGlint, 1.6, "#FFE7A0"), keys: showAt(0.75, 0.76), loop: twinkle() },
      { name: "he touched the Black Stone: a glint", svg: sparkle(...stoneGlint, 1.6, "#FFE7A0"), keys: showAt(0.81, 0.82), loop: twinkle() },
      {
        name: "since I saw him: a faint golden line from Ibn Umar's place to his",
        svg: lookLine(n(start[0] + standBack[0] + 1.4), n(start[1] + standBack[1] - 1), n(start[0] + byStone[0] - 2.6), n(start[1] + byStone[1] + 0.4), 98, GOLD),
        keys: showAt(0.86, 0.89)
      }
    ],
    words: [
      { text: "Ibn Umar: I have never missed touching", from: 0.02, to: 0.22 },
      { text: "the Black Stone and the Yemeni Corner,", from: 0.24, to: 0.42 },
      { text: "in crowds or without crowds,", from: 0.44, to: 0.66 },
      { text: "since I saw him touching them.", from: 0.68, to: 1 }
    ]
  };
}

// The vessels after Fajr. Anas said: when the Messenger of Allah ﷺ had completed his dawn prayer, the servants of
// Madinah came to him with utensils containing water, and no utensil was brought in which he did not dip his hand; and
// at times they came in the cold dawn, and he dipped his hand in them (Sahih Muslim 2324). No one is drawn, not even a
// hand: at dawn, by the masjid of Madinah, his place, a golden ring, and Anas's place. Anas's voice speaks, and a spark
// rises from the masjid, the prayer done. Three places come along the way from the homes, each with a bowl of water,
// and wait before his place; each comes up to it in turn, and a golden glint shows in each bowl's water. The dawn grows
// cold: a pale chill comes over the land, and frost on the ground; a fourth place comes with its bowl, and a golden
// glint shows in its water too.
function vesselsAfterFajr(): SignArt {
  const his: [number, number] = [38, 104.6];
  const bringer = (i: number): SignPart[] => {
    const x0 = 120 + i * 8;
    const y0 = 102.4 + (i % 2) * 1.6;
    const wait: [number, number] = [60 + i * 12, 106 + (i % 2) * 1.6];
    const half: [number, number] = [n((x0 + wait[0]) / 2), n((y0 + wait[1]) / 2)];
    const close: [number, number] = [n(his[0] + 10 + i * 5.4), n(his[1] + 1.4 + i * 1.8)];
    const up = at3(0.49 + i * 0.02);
    const glint = at3(0.62 + i * 0.025);
    const keys = track({
      opacity: [
        [0.15, 0],
        [0.16, 1]
      ],
      xy: [
        [0.16, 0, 0],
        [0.27, n(half[0] - x0), n(half[1] - y0)],
        [0.33, n(half[0] - x0), n(half[1] - y0)],
        [0.43, n(wait[0] - x0), n(wait[1] - y0)],
        [up, n(wait[0] - x0), n(wait[1] - y0)],
        [at3(up + 0.03), n(close[0] - x0), n(close[1] - y0)]
      ]
    });
    return [
      { name: `the place of one bringing a bowl of water ${i + 1}`, svg: someone(x0, y0, 1.4), keys },
      { name: `its bowl of water ${i + 1}`, svg: vessel(n(x0 - 3.6), n(y0 + 1.6)), keys },
      {
        name: `dipped in: a golden glint in the water of bowl ${i + 1}`,
        svg: sparkle(n(close[0] - 3.6), n(close[1] + 1.6 - 2.6), 1.2, "#FFE07A"),
        keys: showAt(glint, at3(glint + 0.01)),
        loop: twinkle()
      }
    ];
  };
  const fourth: [number, number] = [104, 104.4];
  const fourthTo: [number, number] = [n(his[0] + 7), n(his[1] - 3)];
  const fourthKeys = track({
    opacity: [
      [0.76, 0],
      [0.77, 1]
    ],
    xy: [
      [0.77, 0, 0],
      [0.83, n(fourthTo[0] - fourth[0]), n(fourthTo[1] - fourth[1])]
    ]
  });
  return {
    kind: "vessels-after-fajr",
    ms: 12000,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      { name: "the morning light, growing", svg: glow(120, 60, 40, "#FFD9A8", 0.12), keys: track({ opacity: [[0.02, 0.4], [0.09, 1]] }) },
      { name: "hills", svg: hills("#B9A27E") },
      { name: "the land", svg: plainLand("#D9C190") },
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 98, 0.44) },
      { name: "homes of Madinah", svg: home(128, 92, 14, 10) + home(146, 94, 12, 9) + home(112, 90, 10, 7) },
      { name: "the way from the homes", svg: way("M150 103 Q110 102 70 106 Q56 107.4 46 106", "#EFE2C4") },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Anas's place", svg: someone(18, 108.6, 1.5) },
      { name: "Anas's voice: when he finished the dawn prayer", svg: arcs(20.6, 105.2, ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      rising("the prayer done: a spark rising from the masjid", 16.4, 86, 0.04, 0.09, 12),
      ...bringer(0),
      ...bringer(1),
      ...bringer(2),
      { name: "the cold dawn: a pale chill over the land", svg: wash(80, 100, 90, 22, "#E6F0F8", 0.16), keys: showAt(0.76, 0.8) },
      {
        name: "frost on the ground",
        svg: glints(
          [
            [12, 114],
            [30, 116],
            [52, 113.4],
            [76, 116.6],
            [98, 113.8],
            [122, 116.2],
            [146, 113.6]
          ],
          0.7,
          "#FFFFFF"
        ),
        keys: showAt(0.77, 0.81),
        loop: twinkle(1800)
      },
      { name: "the place of one bringing a bowl in the cold dawn", svg: someone(fourth[0], fourth[1], 1.4), keys: fourthKeys },
      { name: "its bowl of water, in the cold dawn", svg: vessel(n(fourth[0] - 3.6), n(fourth[1] + 1.6)), keys: fourthKeys },
      { name: "dipped in, even in the cold: a golden glint in its water", svg: sparkle(n(fourthTo[0] - 3.6), n(fourthTo[1] + 1.6 - 2.6), 1.2, "#FFE07A"), keys: showAt(0.9, 0.91), loop: twinkle() },
    ],
    words: [
      { text: "Anas: when he finished the dawn prayer,", from: 0.02, to: 0.13 },
      { text: "the servants of Madinah came to him", from: 0.15, to: 0.31 },
      { text: "with utensils containing water,", from: 0.33, to: 0.47 },
      { text: "and no utensil was brought", from: 0.49, to: 0.6 },
      { text: "in which he did not dip his hand;", from: 0.62, to: 0.73 },
      { text: "at times they came in the cold dawn,", from: 0.75, to: 0.87 },
      { text: "and he dipped his hand in them.", from: 0.89, to: 1 }
    ]
  };
}

// Gone ahead. Abu Hurairah said: the Messenger of Allah ﷺ was travelling along the road to Makkah and passed a mountain
// called Jumdan, and he said: proceed on, it is Jumdan; the mufarridun have gone ahead. They said: who are the
// mufarridun, O Messenger of Allah? He said: those males and females who remember Allah much (Sahih Muslim 2676). No
// one is drawn, and no one rides: his place, a golden ring, goes along the road with the places of three with him, Abu
// Hurairah's voice speaks, and they pass by Jumdan, a mountain by the road. His voice speaks: go on; far ahead along
// the road the places of some who have gone ahead show, faint, in a soft golden light. The voices of those with him
// ask; his voice answers, and sparks rise from the places ahead, one after another, remembering, and soft golden rings
// come about them.
function goneAhead(): SignArt {
  const going = (dx: number): SignPart["keys"] =>
    moves([
      [0.03, 0, 0],
      [0.1, 18, 0],
      [0.155, 18, 0],
      [0.235, 46, 0],
      [0.3, 46, 0],
      [0.37, n(46 + dx), 0]
    ]);
  const ahead: [number, number][] = [
    [128, 102.2],
    [138, 104.6],
    [148, 102.6]
  ];
  return {
    kind: "gone-ahead",
    ms: 12000,
    parts: [
      ...daySky(26, 110, 12000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E0C796", [[12, 114], [58, 116], [104, 114.6], [150, 115.4]]) },
      { name: "Jumdan, a mountain by the road", svg: peaks([[86, 22, 26]], 99, "#9C8466", false) },
      { name: "the road to Makkah", svg: road(0, 160, 104) },
      { name: "his place, a golden ring, going along the road", svg: ring(14, 103.4, 2.4, GOLD), keys: going(14) },
      { name: "the places of three with him, going along the road", svg: someone(4, 101.6, 1.4) + someone(6, 106, 1.4) + someone(-3, 104, 1.4), keys: going(14) },
      { name: "Abu Hurairah's voice: he was on the road to Makkah", svg: arcs(10, 96, ITS_VOICE), keys: showFor(0.03, 0.04, 0.22, 0.23), loop: speaking },
      { name: "his voice: proceed on, it is Jumdan", svg: arcs(n(14 + 46 + 2.6), 99.6, GOLD), keys: showFor(0.3, 0.31, 0.36, 0.37), loop: speaking },
      { name: "gone ahead: a soft golden light far along the road", svg: wash(138, 102, 18, 6, "#FFF1C4", 0.2), keys: showAt(0.43, 0.47), loop: soft },
      { name: "the places of some who have gone ahead, faint", svg: ahead.map(([x, y]) => someone(x, y, 1.4, "#8A6A44")).join(""), keys: showAt(0.44, 0.48) },
      { name: "their voices: who are the mufarridun?", svg: arcs(n(14 + 60 - 9), 98.4, ITS_VOICE), keys: showFor(0.57, 0.58, 0.63, 0.64), loop: speaking },
      { name: "his voice: those who remember much", svg: arcs(n(14 + 60 + 2.6), 99.6, GOLD), keys: showFor(0.7, 0.71, 0.94, 0.95), loop: speaking },
      rising("remembering much: a spark rising 1", ahead[0][0], n(ahead[0][1] - 3.6), 0.72, 0.8),
      rising("remembering much: a spark rising 2", ahead[1][0], n(ahead[1][1] - 3.6), 0.75, 0.82),
      rising("remembering much: a spark rising 3", ahead[2][0], n(ahead[2][1] - 3.6), 0.88, 0.95),
      {
        name: "a soft golden ring about each place ahead",
        svg: ahead.map(([x, y]) => care(x, n(y + 0.4), 3.4, 1.8, GOLD)).join(""),
        keys: showAt(0.89, 0.92),
        loop: soft
      }
    ],
    words: [
      { text: "Abu Hurairah: he was on the road to Makkah", from: 0.02, to: 0.14 },
      { text: "and passed a mountain called Jumdan.", from: 0.155, to: 0.275 },
      { text: "He said: proceed on, it is Jumdan;", from: 0.29, to: 0.41 },
      { text: "the mufarridun have gone ahead.", from: 0.425, to: 0.545 },
      { text: "They asked: who are the mufarridun?", from: 0.56, to: 0.68 },
      { text: "He said: those who remember Allah much,", from: 0.695, to: 0.86 },
      { text: "males and females.", from: 0.875, to: 1 }
    ]
  };
}

// As if riding. Jabir said: I heard the Prophet ﷺ say, during an expedition we went on: make a general practice of
// wearing sandals, for a man is riding, as it were, when he wears sandals (Sahih Muslim 2096). No one is drawn, not
// even a foot, and no one rides: by a rough way of stones and thorns, his place, a golden ring, and Jabir's place.
// Jabir's voice speaks, and his; a pair of sandals shows under the place of one who will walk, with glints. It sets off
// along the rough way, and a camel, no one on it, goes along beside it at the same pace, a faint line between them: as
// if riding. They go on together past the stones and thorns, and a soft golden ring comes about the sandals.
function asIfRiding(): SignArt {
  const walker: [number, number] = [44, 104];
  const path: [number, number, number][] = [
    [0.47, 0, 0],
    [0.65, 42, 0],
    [0.73, 42, 0],
    [0.93, 88, 0]
  ];
  const together = (opacity?: [number, number][]) => track(opacity ? { opacity, xy: path } : { xy: path });
  return {
    kind: "as-if-riding",
    ms: 9000,
    parts: [
      ...daySky(132, 52, 9000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#DCC394", [[10, 116], [70, 117], [130, 116.4]]) },
      { name: "a sandy track above the rough way", svg: road(30, 160, 94.6, "#E9D6A8") },
      { name: "the rough way", svg: road(30, 160, 106, "#D6C29A") },
      { name: "stones and thorns along the rough way", svg: roughWay(52, 158, 106.4) },
      { name: "his place, a golden ring", svg: ring(14, 104.4, 2.4, GOLD) },
      { name: "Jabir's place", svg: someone(24, 110.6, 1.5) },
      { name: "Jabir's voice: I heard him say", svg: arcs(26.6, 107.2, ITS_VOICE), keys: showFor(0.03, 0.04, 0.15, 0.16), loop: speaking },
      { name: "his voice: make a practice of wearing sandals", svg: arcs(16.6, 101, GOLD), keys: showFor(0.23, 0.24, 0.94, 0.95), loop: speaking },
      { name: "the place of one walking in sandals", svg: someone(walker[0], n(walker[1] - 4.4), 1.6), keys: together() },
      {
        name: "wearing sandals: a pair of sandals under it",
        svg: sandal(n(walker[0] - 1.6), walker[1]) + sandal(n(walker[0] + 2.4), n(walker[1] + 0.8)),
        keys: together([
          [0.24, 0],
          [0.27, 1]
        ])
      },
      {
        name: "glints over the sandals",
        svg: glints([
          [n(walker[0] - 3.4), n(walker[1] - 2.2)],
          [n(walker[0] + 4.6), n(walker[1] - 1.6)]
        ]),
        keys: showFor(0.3, 0.32, 0.38, 0.4),
        loop: twinkle()
      },
      {
        name: "a camel, no one on it, going along beside it",
        svg: camel(walker[0] - 8, 96, 0.16),
        keys: together([
          [0.47, 0],
          [0.49, 1]
        ])
      },
      {
        name: "as if riding: a faint line from the camel to the place",
        svg: way(`M${walker[0]} 91.6 L${walker[0]} ${n(walker[1] - 7)}`, "#C8963E", 0.6),
        keys: together([
          [0.6, 0],
          [0.63, 1]
        ])
      },
      {
        name: "a soft golden ring about the sandals",
        svg: care(n(walker[0] + 88 + 0.4), n(walker[1] + 0.2), 5.4, 2.2, GOLD),
        keys: showAt(0.93, 0.95),
        loop: soft
      }
    ],
    words: [
      { text: "Jabir: I heard him say, on an expedition:", from: 0.02, to: 0.2 },
      { text: "make a general practice of wearing sandals", from: 0.22, to: 0.44 },
      { text: "for a man is riding, as it were,", from: 0.46, to: 0.7 },
      { text: "when the man wears sandals.", from: 0.72, to: 1 }
    ]
  };
}

// Like a pure loaf. Sahl ibn Sa'd said: I heard the Prophet ﷺ say: the people will be gathered on the Day of
// Resurrection on a reddish-white land, like a pure loaf of bread. Sahl added: that land will have no landmarks for
// anybody (Sahih al-Bukhari 6521). No one is drawn: by the masjid of Madinah, his place, a golden ring, and Sahl's
// place; Sahl's voice speaks. The pale land of that Day comes over all, and the places of many come onto it, faint,
// gathered; a soft pale light spreads over it. Its ground turns a soft reddish-white; a round loaf of pure white flour
// shows on it, the same soft white, with glints, and glints come over the land as over the loaf: alike. Then a soft
// light runs along the land from one side to the other, and nothing stands on it anywhere: no landmark.
function likeAPureLoaf(): SignArt {
  const gathered: [number, number][] = [
    [22, 92],
    [40, 98.4],
    [58, 91.6],
    [76, 99],
    [94, 92.4],
    [112, 98.6],
    [130, 92],
    [146, 98.2],
    [30, 108],
    [66, 109.4],
    [102, 108.6],
    [138, 109.2]
  ];
  return {
    kind: "like-a-pure-loaf",
    ms: 11000,
    parts: [
      ...daySky(132, 56, 11000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(26, 100, 0.5) },
      { name: "his place, a golden ring", svg: ring(76, 104.4, 2.4, GOLD) },
      { name: "Sahl ibn Sa'd's place", svg: someone(92, 107.4, 1.5) },
      { name: "Sahl's voice: I heard him say", svg: arcs(94.6, 104, ITS_VOICE), keys: showFor(0.03, 0.04, 0.11, 0.12), loop: speaking },
      { name: "that Day: the wide pale land, over all", svg: PLAIN, keys: showAt(0.19, 0.24) },
      {
        name: "gathered: the places of many, coming onto the land",
        svg: gathered.map(([x, y]) => someone(x, y, 1.3, "#9A8A7A")).join(""),
        keys: track({
          opacity: [
            [0.24, 0],
            [0.28, 0.85]
          ]
        })
      },
      { name: "the Day of Resurrection: a soft pale light over the land", svg: wash(80, 90, 90, 30, "#FFFFFF", 0.14), keys: showAt(0.35, 0.4) },
      { name: "a reddish-white land: its ground turning", svg: `<rect y="64" width="160" height="56" fill="#E9CFC2" opacity="0.55"/>`, keys: showAt(0.51, 0.56) },
      { name: "a loaf of pure flour, on the land", svg: pureLoaf(80, 110, 9), keys: showAt(0.67, 0.7) },
      {
        name: "glints over the loaf",
        svg: glints([
          [72, 105.4],
          [88, 106.4]
        ]),
        keys: showAt(0.7, 0.72),
        loop: twinkle()
      },
      {
        name: "alike: glints over the land, as over the loaf",
        svg: glints(
          [
            [18, 80],
            [50, 74],
            [112, 76],
            [142, 82]
          ],
          0.9,
          "#FFFFFF"
        ),
        keys: showAt(0.72, 0.75),
        loop: twinkle(1600)
      },
      {
        name: "no landmark: a soft light running along the bare land",
        svg: wash(16, 86, 18, 8, "#FFFFFF", 0.3),
        keys: track({
          opacity: [
            [0.83, 0],
            [0.84, 1],
            [0.94, 1],
            [0.96, 0]
          ],
          xy: [
            [0.84, 0, 0],
            [0.94, 128, 0]
          ]
        })
      }
    ],
    words: [
      { text: "Sahl: I heard him say:", from: 0.02, to: 0.16 },
      { text: "People will be gathered", from: 0.18, to: 0.32 },
      { text: "on the Day of Resurrection", from: 0.34, to: 0.48 },
      { text: "on a reddish-white land,", from: 0.5, to: 0.64 },
      { text: "like a pure loaf of bread.", from: 0.66, to: 0.8 },
      { text: "Sahl added: no landmarks for anybody.", from: 0.82, to: 1 }
    ]
  };
}

export const SIMPLE_ART = {
  "a-bed-of-leather": aBedOfLeather,
  "never-at-a-table": neverAtATable,
  "the-two-corners": theTwoCorners,
  "vessels-after-fajr": vesselsAfterFajr,
  "gone-ahead": goneAhead,
  "as-if-riding": asIfRiding,
  "like-a-pure-loaf": likeAPureLoaf
};
