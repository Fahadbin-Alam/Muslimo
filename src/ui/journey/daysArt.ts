import { animalAt, cloud, glow, n, nightSky, palm, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { GREY, prayerMat } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * Days with him ﷺ, drawn as the scenes of what he taught are (heartArt.ts): the one told to go back and pray; the
 * Ansar after Hunayn; the sneeze and its answer; the poor visitors of Mudar; Bilal's steps heard in Paradise; the day
 * Madinah rejoiced at his coming; and the flag at Khaybar, and the red camels. Only the land, the sky, buildings,
 * things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, an eye
 * or a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice
 * is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a du'a, a praise or a prayer is
 * a spark that rises, and what Allah gives is a light that comes about its place. Paradise is only far off, in a soft
 * circle of light with no sun in it.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
export const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A point of a move: when, and how far across and down. */
export type At = [number, number, number];

/** A place at night: a small dashed circle, light on the dark. */
export const LIGHT = "#F3E3C0";

/** A dashed ring of care on the ground about (x, y), `rx` across and `ry` high. */
export const care = (x: number, y: number, rx: number, ry: number, color = GOLD) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="none"/>`;

/** The day: sky, sun, a cloud or two, the hills and the land. */
export const dayAround = (sunAt: [number, number], ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "clouds", svg: cloud(46, 28, 0.6, "#FFFFFF", 0.9) + cloud(104, 22, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: land() }
];

/** Palms at the given feet, each `h` high, swaying a little. */
export const palms = (list: [number, number, number][], of = "Madinah"): SignPart[] =>
  list.map(([x, y, h], i) => ({ name: `a palm of ${of} ${i + 1}`, svg: palm(x, y, h), origin: { x, y }, loop: { move: "sway", ms: 5200 + i * 600, angle: 1.4, phase: i / 3 } }));

/** A camel of the picture cards, `s` times its size, with its feet at (x, y). */
export const camel = (x: number, y: number, s: number, left = false) => animalAt("camel", n(x - 50 * s), n(y - 73 * s), s, left);

/** A red camel: the camel of the picture cards with a deep red-brown coat, the finest the Arabs had. */
export const redCamel = (x: number, y: number, s: number, left = false) =>
  camel(x, y, s, left).replace(/#E2AC62/g, "#C2603A").replace(/#C48A42/g, "#A04C2C").replace(/#9C6A30/g, "#74351C").replace(/#8A5A26/g, "#682C16");

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** Keys of a spark that shows at `from`, rises by `rise` and fades by `to`. */
export const sparkRising = (from: number, to: number, rise = 10): SignKeys => ({
  at: [0, from, at3(from + 0.005), at3(to - 0.005), to],
  opacity: [0, 0, 1, 1, 0],
  y: [0, 0, -1, -rise, n(-rise - 1)]
});

/** A small light in a place, a soft glow with a spark in its middle at (x, y). */
export const lightIn = (x: number, y: number, r = 4, color = WARM) => glow(x, y, r, color, 0.36) + sparkle(x, y, 1.1, "#E8A93A");

/** Quick grey strokes beside a place at (x, y): a prayer rushed, up and down. */
const rushed = (x: number, y: number) =>
  [-4.2, -3, 3, 4.2]
    .map((dx, i) => `<path d="M${n(x + dx)} ${n(y - 2.2 + (i % 2) * 0.8)} L${n(x + dx)} ${n(y + 1.6 - (i % 2) * 0.8)}" stroke="${GREY}" stroke-width="0.6" stroke-linecap="round"/>`)
    .join("");

/** A small grey mark turning back on itself, its middle at (x, y): sent back. */
const backMark = (x: number, y: number) =>
  `<path d="M${n(x + 1.8)} ${n(y + 0.8)} A1.9 1.9 0 1 0 ${n(x - 1.4)} ${n(y + 1.2)}" stroke="${GREY}" stroke-width="0.6" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x - 2.6)} ${n(y + 0.4)} L${n(x - 1.4)} ${n(y + 1.4)} L${n(x - 0.6)} ${n(y + 0.2)}" stroke="${GREY}" stroke-width="0.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

/** A gold coin, its middle at (x, y). */
export const goldCoin = (x: number, y: number, r = 1.6) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#F2C94C" stroke="#B8902E" stroke-width="0.4"/><circle cx="${x}" cy="${y}" r="${n(r * 0.55)}" fill="none" stroke="#D9AE3C" stroke-width="0.3"/>`;

/** A silver coin, its middle at (x, y). */
const silverCoin = (x: number, y: number, r = 1.5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#DDE2E8" stroke="#98A2AD" stroke-width="0.4"/><circle cx="${x}" cy="${y}" r="${n(r * 0.55)}" fill="none" stroke="#B8C0C9" stroke-width="0.3"/>`;

/** Folded cloth, its foot's middle at (x, y). */
const cloth = (x: number, y: number, fill = "#E9E2D0", line = "#C9BFA6", w = 3.4) =>
  `<path d="M${n(x - w)} ${y} L${n(x + w)} ${y} L${n(x + w - 0.6)} ${n(y - 2.4)} L${n(x - w + 0.6)} ${n(y - 2.4)} Z" fill="${fill}"/><path d="M${n(x - w + 0.4)} ${n(y - 1.2)} L${n(x + w - 0.4)} ${n(y - 1.2)}" stroke="${line}" stroke-width="0.4"/>`;

/** Half a date, its middle at (x, y). */
const halfDate = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} A1.6 1.1 0 0 1 ${n(x + 1.6)} ${y} Z" fill="#93391B"/><path d="M${n(x - 1.4)} ${y} L${n(x + 1.4)} ${y}" stroke="#C98A4A" stroke-width="0.4"/>`;

/** A heap of food, wheat and dates, its foot's middle at (x, y). */
const foodHeap = (x: number, y: number) =>
  `<path d="M${n(x - 8)} ${y} Q${n(x - 4)} ${n(y - 8.6)} ${x} ${n(y - 9)} Q${n(x + 4)} ${n(y - 8.6)} ${n(x + 8)} ${y} Z" fill="#E2C374"/>` +
  `<path d="M${n(x - 6)} ${y} Q${n(x - 1)} ${n(y - 5.4)} ${n(x + 2.4)} ${n(y - 4.6)} Q${n(x + 5)} ${n(y - 3)} ${n(x + 7)} ${y} Z" fill="#7E3016"/>` +
  [
    [-3.6, -1.4],
    [-1.4, -2.6],
    [1, -3],
    [3.4, -1.8],
    [5.4, -0.8],
    [-0.6, -1]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="0.7" fill="#A2441F"/>`)
    .join("") +
  [-4.4, -2.4, -3.2].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 6.4 + i * 0.9)}" rx="0.6" ry="0.36" fill="#C9A24A"/>`).join("");

/** A heap of clothes, folded and piled, its foot's middle at (x, y). */
const clothesHeap = (x: number, y: number) =>
  cloth(x, y, "#E9E2D0", "#C9BFA6", 7) + cloth(x, n(y - 2.4), "#B9D0E6", "#94AFC9", 6) + cloth(x, n(y - 4.8), "#E6C9A0", "#C9A87A", 5.2) + cloth(x, n(y - 7.2), "#C8D9B0", "#A6BC8A", 4.2);

/** A jug of water, its foot's middle at (x, y), its spout to the right. */
export const jug = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${y} Q${n(x - 3.2)} ${n(y - 3)} ${n(x - 1.4)} ${n(y - 5.2)} L${n(x - 1.4)} ${n(y - 6.4)} L${n(x + 1.4)} ${n(y - 6.4)} L${n(x + 1.4)} ${n(y - 5.2)} Q${n(x + 3.2)} ${n(y - 3)} ${n(x + 2.2)} ${y} Z" fill="#B87A48"/>` +
  `<path d="M${n(x + 2)} ${n(y - 3.6)} L${n(x + 4.4)} ${n(y - 5.4)}" stroke="#B87A48" stroke-width="0.9" stroke-linecap="round"/><path d="M${n(x - 1.4)} ${n(y - 6.4)} L${n(x + 1.4)} ${n(y - 6.4)}" stroke="#8E5A30" stroke-width="0.5"/>`;

/** A tent, its foot's middle at (x, y), `w` wide and `h` high. */
export const tent = (x: number, y: number, w: number, h: number, fill = "#EFE3C6") =>
  `<path d="M${n(x - w / 2)} ${y} L${x} ${n(y - h)} L${n(x + w / 2)} ${y} Z" fill="${fill}"/>` +
  `<path d="M${x} ${n(y - h)} L${n(x + w / 2)} ${y} L${n(x + w * 0.18)} ${y} Z" fill="#000000" opacity="0.1"/>` +
  `<path d="M${n(x - w * 0.12)} ${y} L${x} ${n(y - h * 0.5)} L${n(x + w * 0.12)} ${y} Z" fill="#6B4A2E"/>`;

/** A flag on its pole, the pole's foot at (x, y): a plain dark cloth with a light edge. */
const flag = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - 15)}" stroke="#8A6A42" stroke-width="0.8" stroke-linecap="round"/>` +
  `<path d="M${n(x + 0.4)} ${n(y - 14.8)} Q${n(x + 3.6)} ${n(y - 15.8)} ${n(x + 7.4)} ${n(y - 14.4)} L${n(x + 7.4)} ${n(y - 9.6)} Q${n(x + 3.6)} ${n(y - 11)} ${n(x + 0.4)} ${n(y - 10)} Z" fill="#3B3632" stroke="#DCD2BE" stroke-width="0.4"/>`;

/** Forts on a rise far off, from x 116 to 158, their feet on y 86. */
const forts = () =>
  `<path d="M108 88 Q122 74 138 76 Q152 75 164 84 L164 90 L108 90 Z" fill="#BCA47C"/>` +
  [
    [122, 80, 9, 9],
    [136, 77.6, 11, 12],
    [150, 80.4, 9, 8.4]
  ]
    .map(
      ([x, y, w, h]) =>
        `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${w}" height="${h}" fill="#A88C62"/>` +
        `<path d="M${n(x - w / 2)} ${n(y - h)} l0 -1.4 l1.6 0 l0 1.4 M${n(x - 0.8)} ${n(y - h)} l0 -1.4 l1.6 0 l0 1.4 M${n(x + w / 2 - 1.6)} ${n(y - h)} l0 -1.4 l1.6 0 l0 1.4" fill="#A88C62" stroke="#A88C62" stroke-width="0.6"/>` +
        `<rect x="${n(x + w * 0.12)}" y="${n(y - h)}" width="${n(w * 0.38)}" height="${h}" fill="#000000" opacity="0.1"/><rect x="${n(x - 0.8)}" y="${n(y - 3.4)}" width="1.6" height="3.4" fill="#5E4628"/>`
    )
    .join("");

/** A dawn sky: still dark above, warm low down over the hills. */
export const DAWN = `<rect width="160" height="120" fill="#2E3D6E"/><rect y="28" width="160" height="18" fill="#4F6196"/><rect y="46" width="160" height="9" fill="#B9928E"/><rect y="54" width="160" height="8" fill="#F0BF8E"/>`;

/** Paradise far off: a soft circle of light with no sun in it, its middle at (x, y). */
export const farOff = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF8E6" opacity="0.92" stroke="#E8D8B0" stroke-width="0.6"/>` + glow(x, y, n(r * 0.8), "#FFF3C0", 0.3);

/** A garden low in a far circle of light about (x, y), `r` across: green ground and three small trees. */
export const gardenIn = (x: number, y: number, r: number) =>
  `<path d="M${n(x - r * 0.86)} ${n(y + r * 0.4)} Q${x} ${n(y + r * 0.06)} ${n(x + r * 0.86)} ${n(y + r * 0.4)} Q${x} ${n(y + r * 0.9)} ${n(x - r * 0.86)} ${n(y + r * 0.4)} Z" fill="#9FD487"/>` +
  [-0.45, 0, 0.45]
    .map((k) => {
      const tx = n(x + r * k);
      const ty = n(y + r * 0.3);
      return `<path d="M${tx} ${ty} L${tx} ${n(ty - r * 0.22)}" stroke="#7A5A38" stroke-width="0.5"/><circle cx="${tx}" cy="${n(ty - r * 0.3)}" r="${n(r * 0.13)}" fill="#5FA344"/>`;
    })
    .join("");

/** Two small marks of steps, side by side, their middle at (x, y). */
const stepMarks = (x: number, y: number) =>
  `<ellipse cx="${n(x - 0.8)}" cy="${y}" rx="0.6" ry="1" fill="${GOLD}"/><ellipse cx="${n(x + 0.8)}" cy="${n(y - 0.7)}" rx="0.6" ry="1" fill="${GOLD}"/>`;

/** The soft sound of steps at (x, y): a faint ring about them. */
const stepSound = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 0.3)}" rx="2.8" ry="1.9" stroke="#E8A93A" stroke-width="0.4" fill="none" opacity="0.8"/>`;

// Go back and pray. Abu Hurairah said: the Messenger of Allah ﷺ came into the masjid, and a man came in and prayed,
// then came and gave salam to the Prophet ﷺ, who returned his salam and said: go back and pray, for you have not
// prayed. He went back and prayed as he had prayed, then came and gave salam, and he said: go back and pray, for you
// have not prayed; three times. Then he said: by the One who sent you with the truth, I cannot do better than this, so
// teach me. He said: when you stand for the prayer, say takbir, then recite what is easy for you of the Quran, then
// bow until you are at rest bowing, then rise until you stand up straight, then prostrate until you are at rest in
// prostration, then sit until you are at rest sitting, and do that in all your prayer (Sahih al-Bukhari 757). No one
// is drawn: by the masjid of Madinah his place is a golden ring; a place comes in to a prayer mat and prays in a rush,
// up and down, with quick grey strokes; its salam goes to him along a golden way, his voice answers, and a grey mark
// turns back for each time it was sent back, three times. Its voice asks to be taught, and his voice teaches: a spark
// of the takbir rises, a golden voice recites, and then the place goes down for bowing and stays, rises up straight,
// goes low in prostration and stays, and sits; at each, a calm light comes, and at the end a warm glow on the mat.
function goBackAndPray(): SignArt {
  const his: [number, number] = [30, 104.6];
  const at: [number, number] = [112, 101.8];
  const quick = (from: number): At[] => [
    [from, 0, 0],
    [at3(from + 0.003), 0, 1.6],
    [at3(from + 0.006), 0, 0],
    [at3(from + 0.009), 0, 2.2],
    [at3(from + 0.012), 0, 1.1],
    [at3(from + 0.015), 0, 0]
  ];
  const calm: [number, number][] = [
    [100, 90],
    [108, 88.6],
    [116, 88.6],
    [124, 90]
  ];
  const calmAt: [number, number][] = [
    [0.62, 0.645],
    [0.755, 0.78],
    [0.885, 0.9],
    [0.93, 0.95]
  ];
  const marks: [number, number][] = [
    [104, 91.6],
    [111, 91.6],
    [118, 91.6]
  ];
  const markAt: [number, number][] = [
    [0.16, 0.17],
    [0.31, 0.314],
    [0.332, 0.336]
  ];
  return {
    kind: "go-back-and-pray",
    ms: 12000,
    parts: [
      ...dayAround([140, 18], 12000),
      ...palms([
        [64, 99, 14],
        [156, 100, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 101, 1.05) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "a mat to pray on", svg: prayerMat(at[0], 104) },
      { name: "prayed well: a warm glow on the mat", svg: wash(at[0], 103.6, 14, 4.4, WARM, 0.3), keys: showFrom(0.95, 0.965), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      {
        name: "the place of the one who came in and prayed",
        svg: someone(at[0], at[1], 1.9),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.025, 1]
          ],
          xy: [
            [0.02, 34, 0],
            [0.045, 0, 0],
            ...quick(0.05),
            ...quick(0.295),
            ...quick(0.315),
            [0.58, 0, 0],
            [0.61, 0, 1.2],
            [0.72, 0, 1.2],
            [0.745, 0, 0],
            [0.86, 0, 0],
            [0.88, 0, 2.2],
            [0.905, 0, 2.2],
            [0.925, 0, 1]
          ]
        })
      },
      {
        name: "its prayer, rushed: quick grey strokes",
        svg: rushed(at[0], at[1]),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.052, 1],
            [0.063, 1],
            [0.065, 0],
            [0.295, 0],
            [0.297, 1],
            [0.308, 1],
            [0.31, 0],
            [0.315, 0],
            [0.317, 1],
            [0.328, 1],
            [0.33, 0]
          ]
        })
      },
      { name: "its salam to him: a golden way to his place", svg: way("M104 102.4 Q70 97.6 34 103.4", GOLD, 0.8), keys: showWhile(0.07, 0.08, 0.15, 0.16) },
      { name: "his voice: go back and pray", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.155, 0.165, 0.34, 0.345), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...marks.map(
        ([x, y], i): SignPart => ({
          name: `sent back: a grey mark turning back ${i + 1}`,
          svg: backMark(x, y),
          keys: track({
            opacity: [
              [markAt[i][0], 0],
              [markAt[i][1], 1],
              [0.44, 1],
              [0.47, 0]
            ]
          })
        })
      ),
      { name: "its voice: teach me", svg: arcsLeft(n(at[0] - 2.6), n(at[1] - 4), VOICE), keys: showWhile(0.345, 0.355, 0.43, 0.44), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice, teaching", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.435, 0.445), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "the takbir: a spark rising", svg: sparkle(at[0], n(at[1] - 5), 1.8, "#FFE7A0"), keys: sparkRising(0.445, 0.5) },
      { name: "its recitation: a golden voice", svg: arcs(n(at[0] + 2.6), n(at[1] - 4), GOLD), keys: showWhile(0.47, 0.48, 0.57, 0.58), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...calm.map(
        ([x, y], i): SignPart => ({
          name: `${["at rest bowing", "standing up straight", "at rest in prostration", "sitting at rest"][i]}: a calm light`,
          svg: glow(x, y, 3.2, "#FFF3C0", 0.34) + sparkle(x, y, 1.3, "#E8A93A"),
          keys: showFrom(calmAt[i][0], calmAt[i][1]),
          loop: { move: "twinkle", ms: 1500, low: 0.6, phase: i / 4 }
        })
      )
    ],
    words: [
      { text: "One came in and prayed, then gave salam", from: 0.02, to: 0.13 },
      { text: "Go back and pray, for you have not prayed", from: 0.15, to: 0.27 },
      { text: "Three times; then the man said: teach me", from: 0.29, to: 0.41 },
      { text: "Say takbir, recite what is easy for you", from: 0.43, to: 0.55 },
      { text: "Bow until you are at rest bowing", from: 0.57, to: 0.69 },
      { text: "Rise until you stand up straight", from: 0.71, to: 0.83 },
      { text: "Prostrate at rest, then sit at rest", from: 0.85, to: 1 }
    ]
  };
}

// The Ansar at Hunayn. Abdullah ibn Zayd ibn Asim said: when Allah gave His Messenger ﷺ the spoils on the day of
// Hunayn, he shared them among those whose hearts were being won, and gave the Ansar nothing; and it was as if they
// felt it, since they did not get what the others got. So he spoke to them and said: O Ansar, did I not find you
// astray, and Allah guided you through me; divided, and Allah joined you together through me; and poor, and Allah made
// you rich through me? Whatever he said, they said: Allah and His Messenger did us more favor... Will you not be
// pleased that the others go with sheep and camels, and you go with the Prophet to your homes? (Sahih al-Bukhari
// 4330). No one is drawn: his place is a golden ring; sheep and camels go to the places of those given them; the
// places of the Ansar are scattered, and a grey shade comes over them. His voice speaks: a light comes in each of
// their places; they come together, and a ring of care comes about them; a warm glow comes on them, with small lights.
// Their voices answer. Then the others go away with the sheep and camels, his ring comes to the Ansar, and a way home
// shows, with a warm glow over them all.
function ansarAtHunayn(): SignArt {
  const his: [number, number] = [84, 100.6];
  const toThem: At[] = [
    [0.88, 0, 0],
    [0.95, 26, 1.4]
  ];
  const given: [number, number][] = [
    [10, 99.6],
    [18, 98.4],
    [26, 99.8],
    [14, 104],
    [23, 104.4]
  ];
  const scattered: [number, number][] = [
    [104, 95.6],
    [134, 97.4],
    [152, 103],
    [110, 106.6],
    [144, 107.2],
    [126, 102]
  ];
  const joined: [number, number][] = [
    [117, 99],
    [124, 98.2],
    [131, 99],
    [116, 103.4],
    [124, 104.2],
    [132, 103.4]
  ];
  const coming = (i: number): At[] => [
    [0.44, 0, 0],
    [0.51, n(joined[i][0] - scattered[i][0]), n(joined[i][1] - scattered[i][1])]
  ];
  const rich: [number, number][] = [
    [110, 96.6],
    [138, 97.4],
    [109, 106],
    [139, 106.6]
  ];
  return {
    kind: "ansar-at-hunayn",
    ms: 12000,
    parts: [
      ...dayAround([136, 16], 12000),
      ...palms(
        [
          [44, 97, 12],
          [62, 95, 10]
        ],
        "the valley"
      ),
      { name: "homes of Madinah, far off", svg: home(144, 92, 9, 6) + home(155, 91.6, 8, 5.6) + palm(150, 92, 9) },
      {
        name: "the sheep and camels of the spoils",
        svg: camel(52, 101, 0.13, true) + camel(68, 100, 0.12, true) + sheep(58, 105.6, 0.1, true) + sheep(70, 105.8, 0.1, true) + sheep(46, 105.4, 0.1, true),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.08, -26, 0],
            [0.86, -26, 0],
            [0.93, -110, 0]
          ]
        }),
        loop: { move: "bob", ms: 900, y: -0.3 }
      },
      {
        name: "the places of those given them",
        svg: given.map(([x, y]) => someone(x, y, 1.4)).join(""),
        keys: track({
          xy: [
            [0.86, 0, 0],
            [0.93, -60, 0]
          ]
        })
      },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD), keys: track({ xy: toThem }) },
      ...scattered.map(([x, y], i): SignPart => ({ name: `the place of one of the Ansar ${i + 1}`, svg: someone(x, y, 1.5), keys: track({ xy: coming(i) }) })),
      {
        name: "the Ansar, feeling it: a grey shade over them",
        svg: wash(128, 101.6, 28, 8, GREY, 0.2),
        keys: track({
          opacity: [
            [0.16, 0],
            [0.2, 1],
            [0.3, 1],
            [0.34, 0.6],
            [0.44, 0.6],
            [0.48, 0.3],
            [0.58, 0.3],
            [0.62, 0]
          ]
        })
      },
      { name: "his voice, reminding them", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: track({ opacity: [[0.29, 0], [0.3, 1], [0.71, 1], [0.715, 0], [0.855, 0], [0.865, 1]], xy: toThem }), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...scattered.map(
        ([x, y], i): SignPart => ({
          name: `guided: a light in a place of the Ansar ${i + 1}`,
          svg: lightIn(x, y, 3.2),
          keys: track({
            opacity: [
              [at3(0.3 + i * 0.006), 0],
              [at3(0.306 + i * 0.006), 1]
            ],
            xy: coming(i)
          }),
          loop: { move: "twinkle", ms: 1400, low: 0.6, phase: i / 6 }
        })
      ),
      { name: "joined together: a ring of care about them", svg: care(124, 101.2, 12.6, 5.6), keys: showFrom(0.47, 0.51), loop: { move: "twinkle", ms: 1800, low: 0.7 } },
      { name: "made rich: a warm glow on them", svg: wash(124, 101.4, 15, 6.4, WARM, 0.3), keys: showFrom(0.58, 0.62), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      ...rich.map(([x, y], i): SignPart => ({ name: `made rich: a small light ${i + 1}`, svg: sparkle(x, y, 1.3, "#E8A93A"), keys: showFrom(at3(0.6 + i * 0.008), at3(0.606 + i * 0.008)), loop: { move: "twinkle", ms: 1200, low: 0.5, phase: i / 4 } })),
      ...[0, 3, 1].map((k, i): SignPart => ({ name: `their voices: more favor ${i + 1}`, svg: arcsLeft(n(joined[k][0] - 2.4), n(joined[k][1] - 3.6), VOICE), keys: showWhile(0.715, 0.725, 0.85, 0.86), loop: { move: "twinkle", ms: 900, low: 0.5, phase: i / 3 } })),
      { name: "the way home to Madinah", svg: way("M134 101 Q142 98 146 94.4", "#FFF0C4", 0.9), keys: showFrom(0.9, 0.93) },
      { name: "going home with him: a warm glow over them all", svg: wash(121, 101.6, 18, 7, WARM, 0.32), keys: showFrom(0.93, 0.965), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "He gave Hunayn's spoils, none to the Ansar", from: 0.02, to: 0.13 },
      { text: "They felt it, not getting what others got", from: 0.15, to: 0.27 },
      { text: "I found you astray; Allah guided you through me", from: 0.29, to: 0.41 },
      { text: "Divided, and Allah joined you through me", from: 0.43, to: 0.55 },
      { text: "Poor, and Allah made you rich through me", from: 0.57, to: 0.69 },
      { text: "Ansar: Allah and His Messenger gave more", from: 0.71, to: 0.83 },
      { text: "They go with sheep and camels; you, with him", from: 0.85, to: 1 }
    ]
  };
}

// The sneeze. Abu Hurairah said: the Prophet ﷺ said: when one of you sneezes, let him say: al-hamdu lillah, and let
// his brother or his companion say to him: yarhamuk Allah. When he says to him: yarhamuk Allah, let him say:
// yahdikumullah wa yuslihu balakum (Sahih al-Bukhari 6224). No one is drawn: by a home, two places sit on a cloth; a
// small puff of air shows by one, a spark of its praise rises, and its voice speaks; the other's voice wishes it mercy,
// and a soft light comes about it; its voice answers, wishing guidance, a light comes about the other place, and a
// warm glow comes on both.
function theSneeze(): SignArt {
  const a: [number, number] = [68, 101.6];
  const b: [number, number] = [92, 101.6];
  return {
    kind: "the-sneeze",
    ms: 8000,
    parts: [
      ...dayAround([136, 18], 8000),
      ...palms([
        [22, 99, 16],
        [148, 100, 14]
      ]),
      { name: "a home", svg: home(80, 95, 18, 12) },
      {
        name: "a cloth spread to sit on",
        svg: `<path d="M56 105.4 L104 105.4 L100.4 99.6 L59.6 99.6 Z" fill="#C9A06A"/><path d="M58.4 104.4 L101.6 104.4 L98.8 100.4 L61.2 100.4 Z" stroke="#E8C45A" stroke-width="0.5" fill="none"/>`
      },
      { name: "the place of the one who sneezed", svg: someone(a[0], a[1], 1.6) },
      { name: "the place of the one beside it", svg: someone(b[0], b[1], 1.6) },
      {
        name: "a sneeze: a small puff of air",
        svg: [
          [2.6, -1.4],
          [3, 0],
          [2.6, 1.4]
        ]
          .map(([dx, dy]) => `<path d="M${n(a[0] + 2.2)} ${n(a[1] - 2.4)} l${dx} ${dy}" stroke="#FFFFFF" stroke-width="0.7" stroke-linecap="round"/>`)
          .join("") + `<circle cx="${n(a[0] + 6)}" cy="${n(a[1] - 3.6)}" r="0.4" fill="#FFFFFF"/><circle cx="${n(a[0] + 6.4)}" cy="${n(a[1] - 1.4)}" r="0.4" fill="#FFFFFF"/>`,
        origin: { x: n(a[0] + 2.2), y: n(a[1] - 2.4) },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.045, 1],
            [0.09, 1],
            [0.1, 0]
          ],
          scale: [
            [0.04, 0.5],
            [0.07, 1.15],
            [0.1, 1.3]
          ]
        })
      },
      { name: "its praise: a spark rising", svg: sparkle(a[0], n(a[1] - 5), 1.8, "#FFE7A0"), keys: sparkRising(0.1, 0.21, 12) },
      { name: "its voice, praising", svg: arcs(n(a[0] + 2.6), n(a[1] - 4), VOICE), keys: showWhile(0.1, 0.11, 0.32, 0.33), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the other's voice, wishing it mercy", svg: arcsLeft(n(b[0] - 2.6), n(b[1] - 4), VOICE), keys: showWhile(0.33, 0.34, 0.645, 0.655), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "mercy: a soft light about the first place", svg: lightIn(a[0], a[1], 4.4), keys: showFrom(0.36, 0.42), loop: { move: "twinkle", ms: 1500, low: 0.65 } },
      { name: "its voice, answering: guidance", svg: arcs(n(a[0] + 2.6), n(a[1] - 4), VOICE), keys: showFrom(0.655, 0.665), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "guidance: a light about the other place", svg: lightIn(b[0], b[1], 4.4), keys: showFrom(0.68, 0.74), loop: { move: "twinkle", ms: 1500, low: 0.65 } },
      { name: "their affairs set right: a warm glow on both", svg: wash(80, 101.6, 20, 5, WARM, 0.3), keys: showFrom(0.8, 0.88), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "Who sneezes should say: Alhamdulillah", from: 0.02, to: 0.3 },
      { text: "A brother or friend says: Yarhamuk Allah", from: 0.32, to: 0.62 },
      { text: "Sneezer: Yahdikumullah wa yuslihu balakum", from: 0.64, to: 1 }
    ]
  };
}

// The visitors of Mudar. Jarir said: we were with the Messenger of Allah ﷺ early in the day, when some came to him
// barefoot, in striped woollen cloaks, most of them, rather all of them, of Mudar; and the face of the Messenger of
// Allah ﷺ changed when he saw their need. He went in and came out, and told Bilal, who gave the adhan and the iqamah,
// and he prayed; then he spoke, reciting: O people, be mindful of your Lord (4:1), and the ayah in al-Hashr (59:18):
// let one give charity from his dinar, from his dirham, from his cloth, from his sa' of wheat, from his sa' of dates,
// until he said: even if it is half a date... until I saw two heaps of food and clothes, and I saw the face of the
// Messenger of Allah ﷺ shining as if it were gold (Sahih Muslim 1017). No one is drawn: by the masjid his place is a
// golden ring; the places of the visitors come in under a grey shade, and a grey shade comes on his place; a voice
// calls the adhan from the masjid, a spark of the prayer rises, and his voice speaks. A gold coin, a silver coin,
// cloth, a sack of wheat and a basket of dates come one by one, and half a date with a soft light; then two heaps
// grow, of food and of clothes. The grey goes from his place and a golden glow comes about it; ways go from the heaps
// to the visitors, and warm glows come on them.
function visitorsOfMudar(): SignArt {
  const his: [number, number] = [24, 104.6];
  const visitors: [number, number][] = [
    [120, 100.6],
    [128, 99.8],
    [136, 100.8],
    [124, 104.8],
    [133, 105.2]
  ];
  const cameIn: At[] = [
    [0.03, 40, 0],
    [0.08, 0, 0]
  ];
  const gifts: [string, string][] = [
    ["a dinar: a gold coin", goldCoin(50, 105.4)],
    ["a dirham: a silver coin", silverCoin(57, 105.8)],
    ["cloth", cloth(65, 107.2)],
    ["a sa' of wheat in a sack", sack(74, 107.6, 0.8, "#D9BC78")],
    ["a sa' of dates in a basket", basketOfDates(84, 107.6)]
  ];
  const grow = (x: number, y: number): Partial<SignPart> => ({
    origin: { x, y },
    keys: track({
      opacity: [
        [0.72, 0],
        [0.725, 1]
      ],
      scaleY: [
        [0.72, 0.1],
        [0.78, 1]
      ]
    })
  });
  return {
    kind: "visitors-of-mudar",
    ms: 12000,
    parts: [
      ...dayAround([120, 16], 12000),
      ...palms([
        [58, 98, 13],
        [154, 99, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 0.8) },
      {
        name: "seeing their need: a grey shade on his place",
        svg: glow(his[0], his[1], 4.4, GREY, 0.16),
        keys: track({
          opacity: [
            [0.16, 0],
            [0.2, 1],
            [0.86, 1],
            [0.9, 0]
          ]
        })
      },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of the visitors of Mudar, barefoot", svg: visitors.map(([x, y]) => someone(x, y, 1.5)).join(""), keys: track({ opacity: [[0.03, 0], [0.036, 1]], xy: cameIn }) },
      {
        name: "their need: a grey shade over them",
        svg: wash(128, 102.6, 14, 5.8, GREY, 0.22),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.036, 1],
            [0.88, 1],
            [0.92, 0]
          ],
          xy: cameIn
        })
      },
      { name: "the adhan: a voice from the masjid", svg: arcs(32, 80, VOICE), keys: showWhile(0.295, 0.305, 0.33, 0.335), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "the prayer: a spark rising", svg: sparkle(his[0], n(his[1] - 5), 1.8, "#FFE7A0"), keys: sparkRising(0.335, 0.375) },
      { name: "his voice, urging charity", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.35, 0.36, 0.71, 0.715), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...gifts.map(
        ([name, svg], i): SignPart => ({
          name: `given: ${name}`,
          svg,
          keys: track({
            opacity: [
              [at3(0.44 + i * 0.014), 0],
              [at3(0.446 + i * 0.014), 1],
              [0.72, 1],
              [0.74, 0]
            ]
          })
        })
      ),
      { name: "even half a date", svg: halfDate(96, 106.6), keys: showFrom(0.58, 0.59) },
      { name: "even half a date: a soft light about it", svg: glow(96, 106.4, 3.6, WARM, 0.4) + sparkle(96, 103.4, 1, "#E8A93A"), keys: showFrom(0.6, 0.64), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "a heap of food", svg: foodHeap(66, 107.4), ...grow(66, 107.4) },
      { name: "a heap of clothes", svg: clothesHeap(84, 107.4), ...grow(84, 107.4) },
      { name: "shining as if gold: a golden glow about his place", svg: glow(his[0], his[1], 6, "#FFE07A", 0.5) + glow(his[0], his[1], 3.4, "#FFD54A", 0.5), keys: showFrom(0.86, 0.93), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "given to them: ways from the heaps", svg: way("M92 105.4 Q106 103.4 117 102", "#FFF0C4", 0.9), keys: showFrom(0.88, 0.92) },
      ...visitors.map(([x, y], i): SignPart => ({ name: `given: a warm glow on a visitor's place ${i + 1}`, svg: glow(x, y, 3.4, WARM, 0.42), keys: showFrom(at3(0.9 + i * 0.008), at3(0.906 + i * 0.008)), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 5 } }))
    ],
    words: [
      { text: "Some came, barefoot and poor, all of Mudar", from: 0.02, to: 0.13 },
      { text: "His face changed, seeing their need", from: 0.15, to: 0.27 },
      { text: "He prayed, then spoke and urged charity", from: 0.29, to: 0.41 },
      { text: "From dinar, dirham, cloth, wheat, dates", from: 0.43, to: 0.55 },
      { text: "Even if it is half a date", from: 0.57, to: 0.69 },
      { text: "Jarir: I saw two heaps of food and clothes", from: 0.71, to: 0.83 },
      { text: "And his face shone, as if gold", from: 0.85, to: 1 }
    ]
  };
}

// Bilal's steps in Paradise. Abu Hurairah said: the Prophet ﷺ said to Bilal at the Fajr prayer: O Bilal, tell me of
// the deed you most hope for that you have done in Islam, for I heard the sound of your steps ahead of me in Paradise.
// He said: I have done no deed I hope for more than this: I have not made wudu at any hour of the night or the day but
// I prayed with that wudu what was written for me to pray (Sahih al-Bukhari 1149). No one is drawn: at dawn, by the
// masjid, his place is a golden ring and Bilal's place is by it; his voice asks; far off a soft circle of light shows,
// with a garden in it, and small marks of steps come in it one after another, with their soft sound. Bilal's voice
// answers: a jug of water pours for wudu, a small moon and a small sun show for night and day, and Bilal's place goes
// to a prayer mat; a spark of its prayer rises, and a warm glow comes on the mat.
function stepsInParadise(): SignArt {
  const his: [number, number] = [24, 104.6];
  const bilal: [number, number] = [40, 105.4];
  const mat: [number, number] = [66, 106];
  const toMat: At[] = [
    [0.8, 0, 0],
    [0.84, n(mat[0] - bilal[0]), n(mat[1] - 1.4 - bilal[1])]
  ];
  const steps: [number, number][] = [
    [115, 39.6],
    [120, 38.4],
    [125, 39.4],
    [130, 38.2]
  ];
  return {
    kind: "steps-in-paradise",
    ms: 10000,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      {
        name: "the last stars",
        svg: stars([
          [14, 10],
          [40, 18],
          [66, 8],
          [92, 16],
          [150, 10],
          [30, 30],
          [78, 28]
        ]),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "hills", svg: hills("#A48F6C") },
      {
        name: "the land at dawn",
        svg: landOf(
          [
            [14, 74],
            [60, 72],
            [110, 76],
            [96, 116],
            [140, 114]
          ],
          "#D2B98C"
        )
      },
      ...palms([
        [86, 99, 14],
        [154, 100, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 0.8) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "a prayer mat", svg: prayerMat(mat[0], mat[1]) },
      { name: "Bilal's place", svg: someone(bilal[0], bilal[1], 1.5), keys: track({ xy: toMat }) },
      { name: "his voice: tell me", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.03, 0.04, 0.6, 0.605), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "Paradise far off: a soft circle of light", svg: farOff(123, 32, 15) + gardenIn(123, 32, 15), keys: showFrom(0.41, 0.47) },
      ...steps.map(([x, y], i): SignPart => ({ name: `steps ahead in it ${i + 1}`, svg: stepMarks(x, y), keys: showFrom(at3(0.47 + i * 0.015), at3(0.475 + i * 0.015)) })),
      ...steps.map(([x, y], i): SignPart => ({ name: `the sound of the steps: a soft ring ${i + 1}`, svg: stepSound(x, y), keys: showFrom(at3(0.472 + i * 0.015), at3(0.478 + i * 0.015)), loop: { move: "twinkle", ms: 800, low: 0.2, phase: i / 4 } })),
      { name: "Bilal's voice, answering", svg: arcs(n(bilal[0] + 2.4), n(bilal[1] - 3.6), VOICE), keys: showWhile(0.605, 0.615, 0.8, 0.805), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "wudu: a jug of water", svg: jug(52, 106.8), keys: showFrom(0.62, 0.63) },
      { name: "wudu: water pouring", svg: `<ellipse cx="56.6" cy="101.8" rx="0.5" ry="0.75" fill="#8CC8EA"/>`, keys: showFrom(0.63, 0.64), loop: { move: "drip", ms: 900, distance: 3.6 } },
      { name: "by night: a small moon", svg: crescent(46, 92, 2.4, 1.2, "#FFF3B8"), keys: showFrom(0.68, 0.7), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "or by day: a small sun", svg: glow(56, 92, 3.6, "#FFF0C0", 0.3) + `<circle cx="56" cy="92" r="1.9" fill="#FFE07A"/>`, keys: showFrom(0.7, 0.72), loop: { move: "twinkle", ms: 1600, low: 0.7, phase: 0.5 } },
      { name: "its prayer: a spark rising", svg: sparkle(mat[0], n(mat[1] - 6.4), 1.8, "#FFE7A0"), keys: sparkRising(0.85, 0.92, 12) },
      { name: "a warm glow on the mat", svg: wash(mat[0], n(mat[1] - 0.6), 12, 4, WARM, 0.3), keys: showFrom(0.92, 0.96), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "At Fajr he said: Bilal, tell me", from: 0.02, to: 0.18 },
      { text: "Of the deed you most hope for in Islam", from: 0.2, to: 0.38 },
      { text: "For I heard your steps ahead of me in Paradise", from: 0.4, to: 0.58 },
      { text: "Bilal: whenever I made wudu, night or day", from: 0.6, to: 0.78 },
      { text: "I prayed with it what was written for me", from: 0.8, to: 1 }
    ]
  };
}

// Madinah rejoiced. Al-Bara said: the first to come to us were Mus'ab ibn Umayr and Ibn Umm Maktum, and they taught
// the people to recite the Quran. Then Bilal, Sa'd and Ammar ibn Yasir came; then Umar ibn al-Khattab came with twenty
// of the Companions of the Prophet ﷺ; then the Prophet ﷺ came, and I never saw the people of Madinah rejoice at
// anything as they rejoiced at the Messenger of Allah ﷺ, until even the girls said: the Messenger of Allah has come
// (Sahih al-Bukhari 3925). No one is drawn: a road comes into Madinah among its homes and palms; two places come along
// it, and their golden voices recite, and places come to sit by them; then three places come; then a group of twenty-
// one; then his golden ring comes. Light comes in the homes one by one, sparks of joy rise, voices call from the homes,
// and a golden light comes about his place.
function madinahRejoiced(): SignArt {
  const first: [number, number][] = [
    [112, 101],
    [119, 102.2]
  ];
  const learners: [number, number][] = [
    [106, 105.2],
    [113, 106.6],
    [120, 106.8],
    [127, 105.2]
  ];
  const three: [number, number][] = [
    [132, 101.6],
    [138, 102.6],
    [144, 101.4]
  ];
  const twenty = Array.from({ length: 20 }, (_, i): [number, number] => [n(70 + (i % 7) * 3.6 + (Math.floor(i / 7) % 2) * 1.8), n(95.4 + Math.floor(i / 7) * 2.8)]);
  const umar: [number, number] = [96, 97.6];
  const his: [number, number] = [96, 105.6];
  const homes: [number, number, number, number][] = [
    [104, 93, 11, 7.6],
    [119, 92, 12, 8.4],
    [135, 93, 11, 7.6],
    [150, 92, 11, 8.4]
  ];
  return {
    kind: "madinah-rejoiced",
    ms: 12000,
    parts: [
      ...dayAround([24, 18], 12000),
      ...palms([
        [112, 92, 12],
        [143, 91, 13],
        [158, 94, 12]
      ]),
      { name: "the homes of Madinah", svg: homes.map(([x, y, w, h]) => home(x, y, w, h)).join("") },
      { name: "the road into Madinah", svg: way("M0 104.6 Q44 106 98 101", "#FFF0C4", 1.1) },
      { name: "the places of Mus'ab and Ibn Umm Maktum, the first to come", svg: first.map(([x, y]) => someone(x, y, 1.5)).join(""), keys: track({ opacity: [[0.03, 0], [0.035, 1]], xy: [[0.03, -112, 2], [0.085, 0, 0]] }) },
      ...first.map(([x, y], i): SignPart => ({ name: `teaching the Quran: a golden voice ${i + 1}`, svg: arcs(n(x + 2.4), n(y - 3.6), GOLD), keys: showFrom(at3(0.16 + i * 0.006), at3(0.166 + i * 0.006)), loop: { move: "twinkle", ms: 1000, low: 0.5, phase: i / 2 } })),
      {
        name: "learning from them: places come to sit",
        svg: learners.map(([x, y]) => someone(x, y, 1.2)).join(""),
        keys: track({
          opacity: [
            [0.17, 0],
            [0.175, 1]
          ],
          xy: [
            [0.17, 0, -8],
            [0.22, 0, 0]
          ]
        })
      },
      { name: "the places of Bilal, Sa'd and Ammar", svg: three.map(([x, y]) => someone(x, y, 1.5)).join(""), keys: track({ opacity: [[0.3, 0], [0.305, 1]], xy: [[0.3, -140, 2], [0.36, 0, 0]] }) },
      {
        name: "Umar's place, and twenty with him",
        svg: someone(umar[0], umar[1], 1.6) + twenty.map(([x, y]) => someone(x, y, 1.2)).join(""),
        keys: track({
          opacity: [
            [0.44, 0],
            [0.445, 1]
          ],
          xy: [
            [0.44, -96, 4],
            [0.505, 0, 0]
          ]
        })
      },
      { name: "a golden ring, his place, coming", svg: ring(his[0], his[1], 2.6, GOLD), keys: track({ opacity: [[0.58, 0], [0.585, 1]], xy: [[0.58, -96, -1], [0.64, 0, 0]] }) },
      ...homes.map(([x, y, w], i): SignPart => ({ name: `rejoicing: light in a home ${i + 1}`, svg: glow(n(x + 3.3), n(y - 4.6), 4, WARM, 0.4), keys: showFrom(at3(0.72 + i * 0.012), at3(0.73 + i * 0.012)), loop: { move: "twinkle", ms: 1400, low: 0.6, phase: i / 4 } })),
      ...homes.map(([x, y, , h], i): SignPart => ({ name: `rejoicing: a spark rising from a home ${i + 1}`, svg: sparkle(x, n(y - h - 3), 1.6, "#FFE7A0"), keys: sparkRising(at3(0.74 + i * 0.01), at3(0.765 + i * 0.01), 9) })),
      ...homes.slice(0, 3).map(([x, y], i): SignPart => ({ name: `he has come: a voice from a home ${i + 1}`, svg: arcsLeft(n(x - 4), n(y - 4), VOICE), keys: showFrom(at3(0.86 + i * 0.01), at3(0.866 + i * 0.01)), loop: { move: "twinkle", ms: 800, low: 0.5, phase: i / 3 } })),
      { name: "a golden light about his place", svg: glow(his[0], his[1], 6, "#FFE07A", 0.45) + care(his[0], his[1], 6, 3), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "First came Mus'ab and Ibn Umm Maktum", from: 0.02, to: 0.13 },
      { text: "They taught the people the Quran", from: 0.15, to: 0.27 },
      { text: "Then Bilal, Sa'd and Ammar came", from: 0.29, to: 0.41 },
      { text: "Then Umar came, with twenty", from: 0.43, to: 0.55 },
      { text: "Then he came", from: 0.57, to: 0.69 },
      { text: "Madinah never rejoiced so at anything", from: 0.71, to: 0.83 },
      { text: "Even the girls said: he has come!", from: 0.85, to: 1 }
    ]
  };
}

// The flag and the red camels. Sahl ibn Sa'd said: the Prophet ﷺ said on the day of Khaybar: I will give the flag
// tomorrow to one through whom Allah will give victory, who loves Allah and His Messenger, and Allah and His Messenger
// love him. So they spent the night wondering to whom it would be given, and in the morning each of them hoped to be
// given it. He said: where is Ali? It was said: his eyes are sore. He prayed for him, and he was cured as if he had
// had no pain, and he gave him the flag... He said: go calmly until you reach their land, then invite them to Islam
// and tell them what is due on them; by Allah, that Allah guides one through you is better for you than red camels
// (Sahih al-Bukhari 3701). No one is drawn: at night in a camp of tents his place is a golden ring with a flag by it,
// and his voice speaks; small lights of hope come over the tents. Morning comes, the forts show far off, and places
// come from the tents and gather, each with a light of hope. His voice asks; a place comes from a far tent under a
// grey shade of pain; a spark of his du'a rises, the grey goes and a light comes, and the flag goes to it. His voice
// speaks, and the place goes calmly along a way to the forts with the flag, and its voice invites there. Red camels
// come, and a warm light comes about one place by the forts, and the camels grow faint beside it.
function redCamels(): SignArt {
  const his: [number, number] = [36, 104.6];
  const flagAt: [number, number] = [44, 104.6];
  const ali: [number, number] = [140, 104.8];
  const tents: [number, number, number, number][] = [
    [12, 96, 12, 9],
    [26, 94, 11, 8],
    [96, 96, 12, 9],
    [112, 95, 11, 8]
  ];
  const gathered: [number, number][] = [
    [62, 100.4],
    [70, 99.6],
    [78, 100.6],
    [66, 104.4],
    [76, 104.8]
  ];
  const fromTent = [0, 1, 2, 3, 2];
  const comesIn: At[] = [
    [0.44, 0, 0],
    [0.51, -88, 0]
  ];
  const goesOn: At[] = [
    [0.72, 0, 0],
    [0.79, 76, -20]
  ];
  const morning = (keysFrom = 0.3, keysTo = 0.36) =>
    track({
      opacity: [
        [keysFrom, 0],
        [keysTo, 1]
      ]
    });
  const camels: [number, number][] = [
    [96, 106.8],
    [110, 105.4],
    [124, 107]
  ];
  return {
    kind: "red-camels",
    ms: 12000,
    parts: [
      { name: "the sky at night", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [12, 12],
          [34, 22],
          [58, 10],
          [84, 20],
          [110, 8],
          [132, 18],
          [152, 28],
          [70, 34]
        ]),
        loop: { move: "twinkle", ms: 2400, low: 0.5 }
      },
      { name: "the land at night", svg: `<rect y="61" width="160" height="59" fill="#2E3556"/><path d="M0 61 L160 61" stroke="#454B6A" stroke-width="0.7"/>` + [[20, 112], [60, 90], [150, 112], [100, 116]].map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("") },
      { name: "morning: the day comes", svg: sky("#BFE3FA", "#DDF1FC", 62) + sun(26, 20) + hills() + land(), keys: morning() },
      { name: "the forts of Khaybar, far off", svg: forts(), keys: morning() },
      ...tents.map(([x, y, w, h], i): SignPart => ({ name: `a tent of the camp ${i + 1}`, svg: tent(x, y, w, h) })),
      { name: "a far tent", svg: tent(146, 101, 12, 9) },
      { name: "the night over the camp", svg: `<rect y="61" width="160" height="59" fill="#16284C" opacity="0.55"/>`, keys: track({ opacity: [[0.3, 1], [0.36, 0]] }) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the flag",
        svg: flag(flagAt[0], flagAt[1]),
        origin: { x: flagAt[0], y: flagAt[1] },
        keys: track({
          xy: [
            [0.63, 0, 0],
            [0.655, 12, 0.2],
            [0.72, 12, 0.2],
            [0.79, 88, -19.8]
          ]
        }),
        loop: { move: "sway", ms: 2600, angle: 1.6 }
      },
      { name: "his voice: tomorrow, the flag", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), LIGHT), keys: showWhile(0.03, 0.04, 0.15, 0.16), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...tents.map(
        ([x, y, , h], i): SignPart => ({
          name: `all night, hoping: a small light over a tent ${i + 1}`,
          svg: sparkle(x, n(y - h - 3), 1.4, "#FFE7A0"),
          keys: track({
            opacity: [
              [at3(0.16 + i * 0.01), 0],
              [at3(0.166 + i * 0.01), 1],
              [0.3, 1],
              [0.34, 0]
            ]
          }),
          loop: { move: "twinkle", ms: 1200, low: 0.4, phase: i / 4 }
        })
      ),
      ...gathered.map(
        ([x, y], i): SignPart => ({
          name: `in the morning, a place comes to gather ${i + 1}`,
          svg: someone(x, y, 1.4),
          keys: track({
            opacity: [
              [0.3, 0],
              [0.305, 1]
            ],
            xy: [
              [0.3, n(tents[fromTent[i]][0] - x), n(tents[fromTent[i]][1] + 1 - y)],
              [0.36, 0, 0]
            ]
          })
        })
      ),
      ...gathered.map(
        ([x, y], i): SignPart => ({
          name: `each one hoping: a small light ${i + 1}`,
          svg: sparkle(x, n(y - 3.6), 1, "#E8A93A"),
          keys: track({
            opacity: [
              [at3(0.36 + i * 0.003), 0],
              [at3(0.364 + i * 0.003), 1],
              [0.63, 1],
              [0.655, 0]
            ]
          }),
          loop: { move: "twinkle", ms: 1100, low: 0.5, phase: i / 5 }
        })
      ),
      { name: "his voice: where is Ali?", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.435, 0.445, 0.57, 0.58), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Ali's place", svg: someone(ali[0], ali[1], 1.5), keys: track({ opacity: [[0.44, 0], [0.445, 1]], xy: [...comesIn, ...goesOn.map(([t, x, y]): At => [t, x - 88, y])] }) },
      { name: "in pain: a grey shade on Ali's place", svg: glow(ali[0], ali[1], 3.8, GREY, 0.42), keys: track({ opacity: [[0.44, 0], [0.445, 1], [0.6, 1], [0.64, 0]], xy: comesIn }) },
      { name: "his du'a for him: a spark rising", svg: sparkle(his[0], n(his[1] - 5), 1.8, "#FFE7A0"), keys: sparkRising(0.58, 0.62) },
      { name: "cured: a light on Ali's place", svg: lightIn(n(ali[0] - 88), ali[1], 3.6), keys: track({ opacity: [[0.6, 0], [0.64, 1]], xy: goesOn }), loop: { move: "twinkle", ms: 1500, low: 0.65 } },
      { name: "his voice: go calmly", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.715, 0.725), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "going calmly: a way to their land", svg: way("M56 104 Q98 100 126 86.6", "#FFF0C4", 0.9), keys: showFrom(0.72, 0.75) },
      { name: "Ali's voice, inviting them", svg: arcs(n(ali[0] - 88 + 76 + 2.4), n(ali[1] - 20 - 3.6), VOICE), keys: showFrom(0.785, 0.795), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "red camels",
        svg: camels.map(([x, y]) => redCamel(x, y, 0.13, true)).join(""),
        keys: track({
          opacity: [
            [0.86, 0],
            [0.865, 1],
            [0.92, 1],
            [0.95, 0.55]
          ],
          xy: [
            [0.86, 60, 0],
            [0.9, 0, 0]
          ]
        }),
        loop: { move: "bob", ms: 900, y: -0.3 }
      },
      { name: "one guided: a place by the forts", svg: someone(142, 87.4, 1.4), keys: showFrom(0.87, 0.875) },
      { name: "one guided: a warm light about it", svg: glow(142, 87.4, 5.4, WARM, 0.45) + sparkle(142, 87.4, 1.3, "#E8A93A"), keys: showFrom(0.88, 0.93), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Tomorrow I will give the flag to one", from: 0.02, to: 0.13 },
      { text: "All night they wondered who it would be", from: 0.15, to: 0.27 },
      { text: "In the morning, each one hoped for it", from: 0.29, to: 0.41 },
      { text: "Where is Ali? People: Ali's eyes are sore", from: 0.43, to: 0.55 },
      { text: "He prayed for Ali, and Ali was cured", from: 0.57, to: 0.69 },
      { text: "Go calmly, then invite them to Islam", from: 0.71, to: 0.83 },
      { text: "One guided through you is better than red camels", from: 0.85, to: 1 }
    ]
  };
}

export const DAYS_ART = {
  "go-back-and-pray": goBackAndPray,
  "ansar-at-hunayn": ansarAtHunayn,
  "the-sneeze": theSneeze,
  "visitors-of-mudar": visitorsOfMudar,
  "steps-in-paradise": stepsInParadise,
  "madinah-rejoiced": madinahRejoiced,
  "red-camels": redCamels
};
