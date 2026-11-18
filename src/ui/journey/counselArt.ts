import { animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { crooked, GREY, prayerMat } from "./lovedArt";
import { dish } from "./worthArt";
import { cup, food } from "./hopeArt";
import { risingSparks } from "./charityArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * Counsel he ﷺ gave, drawn as the scenes of those who were with him are (companyArt.ts): the farewell sermon at
 * Arafah; the day he asked Ibn Mas'ud to recite to him; richness of the soul; the neighbor he was told of again and
 * again; the nearest a servant is to his Lord, in sujud; Allah accepts only what is good; and mercy on Musa, who was
 * harmed with more and was patient. Only the land, the sky, buildings, things, plants and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand or a face, and no angel: where someone went, a
 * dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is
 * drawn for Allah, and nothing comes down from the sky: a du'a, or a word of witness, is a spark that rises.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A place at night, or in white: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** A dark land at night, from y `top` down, with a few tufts. */
const nightLand = (top: number, tufts: [number, number][]) =>
  `<rect y="${top}" width="160" height="${120 - top}" fill="#2E3556"/><path d="M0 ${top} L160 ${top}" stroke="#454B6A" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("");

/** A home at night, darker, its foot's middle at (x, y). */
const nightHome = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#8C7350", "#77603F", "#3A2A1C");

/** The window of a home (trialArt.ts), lit. */
const litWindow = (x: number, y: number, h: number) => {
  const [wx, wy] = [n(x + 2), n(y - h + 2.4)];
  return `${glow(n(wx + 1.3), n(wy + 1.3), 4, "#FFD866", 0.16)}<rect x="${wx}" y="${wy}" width="2.6" height="2.6" fill="#FFD866"/>`;
};

/** A dashed ring of care on the ground about (x, y), `rx` across and `ry` high. */
const care = (x: number, y: number, rx: number, ry: number, color = GOLD) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="none"/>`;

/** A tear, a small drop, its middle at (x, y). */
const tear = (x: number, y: number, fill = "#6FAED3") =>
  `<path d="M${x} ${n(y - 1.3)} Q${n(x + 0.9)} ${n(y + 0.1)} ${x} ${n(y + 0.8)} Q${n(x - 0.9)} ${n(y + 0.1)} ${x} ${n(y - 1.3)} Z" fill="${fill}"/>`;

/** A tent of white cloth, its foot's middle at (x, y), `w` wide. */
const tent = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} L${x} ${n(y - w * 0.6)} L${n(x + w / 2)} ${y} Z" fill="#F4F1EA"/><path d="M${x} ${n(y - w * 0.6)} L${n(x + w / 2)} ${y} L${n(x + w * 0.1)} ${y} Z" fill="#000000" opacity="0.08"/>`;

/** Folded cloth, its foot's middle at (x, y). */
const cloth = (x: number, y: number, fill = "#E9E2D0", line = "#C9BFA6") =>
  `<path d="M${n(x - 3.4)} ${y} L${n(x + 3.4)} ${y} L${n(x + 2.8)} ${n(y - 2.4)} L${n(x - 2.8)} ${n(y - 2.4)} Z" fill="${fill}"/><path d="M${n(x - 3)} ${n(y - 1.2)} L${n(x + 3)} ${n(y - 1.2)}" stroke="${line}" stroke-width="0.4"/>`;

/** The moon by day, pale, more than half lit on its right, its middle at (x, y). */
const paleMoon = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity="0.8"/><path d="M${x} ${n(y - r)} A${r} ${r} 0 0 0 ${x} ${n(y + r)} A${n(r * 0.45)} ${r} 0 0 1 ${x} ${n(y - r)} Z" fill="#BFE3FA" opacity="0.85"/>`;

/** A few small dashed circles at the given points: places of a gathering. */
const places = (list: [number, number][], color = LIGHT, r = 1.3) => list.map(([x, y]) => someone(x, y, r, color)).join("");

/** Keys that show a part at `from` (at once) and lift it by `rise` by `to`, where it stays. */
const risesAndStays = (from: number, to: number, rise: number): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, n(-rise * 0.15), -rise]
});

/** A crooked voice facing left (lovedArt.ts faces right), its middle at (x, y). */
const crookedLeft = (x: number, y: number) => `<g transform="translate(${n(2 * x + 6)} 0) scale(-1 1)">${crooked(x, y)}</g>`;

// The farewell sermon. Jabir said: at Arafah he ﷺ came to the bottom of the valley and addressed the people: your blood
// and your wealth are sacred to you, like the sacredness of this day of yours, in this month of yours, in this town of
// yours. Fear Allah concerning women; their right on you is their food and their clothing, in a fitting manner. You
// will be asked about me; so what will you say? They said: we bear witness that you have conveyed, fulfilled and given
// sincere counsel. He raised his finger to the sky and pointed it to the people: O Allah, be witness; O Allah, be
// witness, three times (Sahih Muslim 1218). No one is drawn: on the plain of Arafah, by the Mount of Mercy, the places
// of the pilgrims are small dashed circles in white; his place in the valley is a golden ring, his camel al-Qaswa
// standing by it, and his voice is arcs; a golden ring of care comes about them and their wealth; the sun, the pale
// moon of the month and the far hills about the town each get a soft light; a soft light is on a home kept in trust, and
// food and clothing are given at it, with a warm glow; his voice asks; their voices answer over all the plain; and
// three times his voice rises, and stays.
function farewellSermon(): SignArt {
  const his: [number, number] = [32, 101.4];
  const s = 0.2;
  const pilgrims: [number, number][] = [];
  const rows: [number, number, number, number][] = [
    [94, 58, 112, 7.2],
    [99, 54, 116, 7],
    [104.2, 54, 118, 7.4],
    [109.4, 60, 114, 7.8]
  ];
  rows.forEach(([y, x0, x1, step], row) => {
    for (let x = x0 + (row % 2 ? 2.4 : 0); x <= x1; x += step) pilgrims.push([n(x), y]);
  });
  const trust: [number, number] = [138, 101];
  const witness = [-3, 0, 3].map((dx, i): SignPart => ({
    name: `his voice, rising: be witness ${i + 1}`,
    svg: sparkle(n(his[0] + dx), n(his[1] - 6), 1.8, "#FFE7A0") + glow(n(his[0] + dx), n(his[1] - 6), 3, WARM, 0.22),
    keys: risesAndStays(at3(0.86 + i * 0.03), at3(0.89 + i * 0.03), 14 + i * 6),
    loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 3 }
  }));
  return {
    kind: "farewell-sermon",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun, past its height", svg: sun(98, 18) },
      { name: "clouds", svg: cloud(40, 30, 0.6, "#FFFFFF", 0.85) + cloud(130, 24, 0.55, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills of Arafah", svg: peaks([[12, 16, 16], [40, 12, 14], [92, 14, 16], [150, 18, 16]], 86, "#B79E78", false) },
      { name: "the land", svg: land() },
      { name: "the Mount of Mercy", svg: `<path d="M118 92 Q130 76 142 80 Q150 82 156 92 Z" fill="#A88E68"/><path d="M128 84 L131 86 M138 82 L140 85 M146 85 L148 88" stroke="#8E7652" stroke-width="0.6"/>` },
      { name: "a tent at Namirah", svg: tent(14, 97, 14) },
      { name: "his camel al-Qaswa, standing by", svg: animalAt("camel", n(20 - 50 * s), n(104.6 - 73 * s), s), loop: { move: "bob", ms: 1800, y: -0.3 } },
      { name: "a golden ring, his place in the valley", svg: ring(his[0], his[1], 2.8, GOLD) },
      { name: "the places of the pilgrims, over the plain", svg: places(pilgrims) },
      { name: "his voice, addressing them", svg: arcs(n(his[0] + 4), n(his[1] - 5), VOICE), keys: showWhile(0.03, 0.04, 0.57, 0.58), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "their wealth, among them: a sack", svg: sack(88, 106.6, 0.7), keys: showFrom(0.04, 0.06) },
      { name: "sacred to them: a golden ring of care about them", svg: care(86, 101.8, 32, 10), keys: showFrom(0.06, 0.1) },
      { name: "this day: a ring of light about the sun", svg: `<circle cx="98" cy="18" r="8" stroke="${GOLD}" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="#FFF6D6" fill-opacity="0.3"/>`, keys: showFrom(0.16, 0.18) },
      { name: "this month: the moon, pale by day", svg: paleMoon(142, 30, 3.4) + `<circle cx="142" cy="30" r="6.4" stroke="${GOLD}" stroke-width="0.7" stroke-dasharray="1.6 1.2" fill="none"/>`, keys: showFrom(0.18, 0.2) },
      { name: "this town: a soft light along its far hills", svg: wash(80, 84, 76, 5, "#FFF0C0", 0.3), keys: showFrom(0.2, 0.23) },
      { name: "a home in trust", svg: tent(trust[0], trust[1], 13) },
      { name: "a home in trust: a soft light on it", svg: glow(trust[0], n(trust[1] - 4), 9, "#FFF6DA", 0.22), keys: showFrom(0.3, 0.34), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "food for the home, given", svg: food(n(trust[0] - 8), 106), keys: showFrom(0.44, 0.46) },
      { name: "clothing for the home, given", svg: cloth(n(trust[0] + 8), 106.4), keys: showFrom(0.46, 0.48) },
      { name: "in fairness: a warm glow at the home", svg: wash(trust[0], 105, 14, 3.4, WARM, 0.22), keys: showFrom(0.48, 0.51) },
      { name: "his voice, asking: what will you say?", svg: arcs(n(his[0] + 4), n(his[1] - 5), VOICE), keys: showWhile(0.58, 0.59, 0.71, 0.72), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      {
        name: "their voices: we bear witness",
        svg: [
          [62, 90],
          [80, 95],
          [98, 90],
          [70, 100],
          [104, 100]
        ]
          .map(([x, y]) => arcsLeft(x, y, "#FFFFFF"))
          .join(""),
        keys: showWhile(0.72, 0.74, 0.86, 0.88),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      { name: "a warm light over all the plain", svg: wash(84, 102, 72, 10, WARM, 0.12), keys: showFrom(0.74, 0.79), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      ...witness
    ],
    words: [
      { text: "Your blood and wealth are sacred to you", from: 0.02, to: 0.13 },
      { text: "Like this day, in this month, in this town", from: 0.15, to: 0.27 },
      { text: "Fear Allah concerning women", from: 0.29, to: 0.41 },
      { text: "Their right: food and clothing, in fairness", from: 0.43, to: 0.55 },
      { text: "You will be asked of me: what will you say?", from: 0.57, to: 0.69 },
      { text: "We testify you conveyed, fulfilled, advised", from: 0.71, to: 0.83 },
      { text: "O Allah, be witness; O Allah, be witness", from: 0.85, to: 1 }
    ]
  };
}

// Recite to me. Abdullah ibn Mas'ud said: the Messenger of Allah ﷺ said to me: recite to me. I said: shall I recite to
// you, when it was sent down to you? He said: I love to hear it from another. So I recited Surat an-Nisa until I
// reached the ayah of the witness (4:41), and he said: stop; and his eyes were overflowing with tears (Sahih al-Bukhari
// 4582). No one is drawn: by the masjid of Madinah, his place is a golden ring and the one he asked is a small dashed
// circle; their voices are arcs, one after the other; as the one asked recites, a long band of the surah's ayat fills
// from its start, up to a soft mark at its forty-first ayah; his voice says stop, the recitation stops, and tears
// show by his place, with a soft light over them both.
function reciteToMe(): SignArt {
  const his: [number, number] = [70, 104.6];
  const reader: [number, number] = [90, 105];
  const band: [number, number, number] = [24, 60, 112];
  const at41 = n(band[0] + (band[2] * 41) / 176);
  return {
    kind: "recite-to-me",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(136, 20) },
      { name: "clouds", svg: cloud(36, 28, 0.65, "#FFFFFF", 0.9) + cloud(100, 22, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms of Madinah", svg: palm(12, 98, 20) + palm(124, 97, 19) + palm(150, 98, 21) },
      { name: "the masjid of Madinah", svg: madinahMasjid(20, 100.6, 0.62) },
      { name: "his home by the masjid", svg: home(58, 101, 13, 10) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of the one he asked", svg: someone(reader[0], reader[1]) },
      { name: "his voice: recite to me", svg: arcs(n(his[0] + 4), n(his[1] - 4.6), VOICE), keys: showWhile(0.03, 0.04, 0.15, 0.16), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the voice of the one asked: shall I recite to you?", svg: arcsLeft(n(reader[0] - 4), n(reader[1] - 4.6), VOICE), keys: showWhile(0.16, 0.17, 0.29, 0.3), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: I love to hear it from another", svg: arcs(n(his[0] + 4), n(his[1] - 4.6), VOICE), keys: showWhile(0.3, 0.31, 0.43, 0.44), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "listening: a warm glow on his place", svg: glow(his[0], his[1], 5, WARM, 0.28), keys: showFrom(0.32, 0.36), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "the recitation: a voice", svg: arcsLeft(n(reader[0] - 4), n(reader[1] - 4.6), "#FFF6DA"), keys: showWhile(0.44, 0.45, 0.71, 0.72), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      {
        name: "an-Nisa: a long band of its ayat",
        svg: `<rect x="${band[0]}" y="${band[1]}" width="${band[2]}" height="3" rx="1.5" fill="#FFF6DA" stroke="#E2C48C" stroke-width="0.4"/>`,
        keys: showFrom(0.44, 0.46)
      },
      {
        name: "recited so far: the band filling",
        svg: `<rect x="${band[0]}" y="${band[1]}" width="${band[2]}" height="3" rx="1.5" fill="${GOLD}"/>`,
        origin: { x: band[0], y: n(band[1] + 1.5) },
        keys: track({
          opacity: [
            [0.45, 0],
            [0.455, 1]
          ],
          scaleX: [
            [0.45, 0.01],
            [0.5, 0.14],
            [0.57, 0.14],
            [0.64, Number((41 / 176).toFixed(3))]
          ]
        })
      },
      { name: "its forty-first ayah: a soft mark on the band", svg: glow(at41, n(band[1] + 1.5), 4.4, WARM, 0.3) + sparkle(at41, n(band[1] + 1.5), 1.6, "#FFF3C0"), keys: showFrom(0.62, 0.65) },
      { name: "his voice: stop", svg: arcs(n(his[0] + 4), n(his[1] - 4.6), VOICE), keys: showWhile(0.72, 0.73, 0.85, 0.86), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "tears by his place", svg: tear(n(his[0] - 2), n(his[1] - 5)) + tear(n(his[0] + 2), n(his[1] - 4.4)), keys: showFrom(0.86, 0.88), loop: { move: "drip", ms: 1400, distance: 2.4 } },
      { name: "a soft light over them both", svg: wash(80, 103.4, 18, 5, WARM, 0.14), keys: showFrom(0.89, 0.94), loop: { move: "twinkle", ms: 2000, low: 0.8 } }
    ],
    words: [
      { text: "Ibn Mas'ud: he said to me: recite to me", from: 0.02, to: 0.13 },
      { text: "Recite to you, when it was revealed to you?", from: 0.15, to: 0.27 },
      { text: "He said: I love to hear it from another", from: 0.29, to: 0.41 },
      { text: "So I recited an-Nisa to him", from: 0.43, to: 0.55 },
      { text: "Until I reached its ayah forty-one", from: 0.57, to: 0.69 },
      { text: "He said: stop", from: 0.71, to: 0.83 },
      { text: "And his eyes were overflowing with tears", from: 0.85, to: 1 }
    ]
  };
}

// Richness of the soul. The Prophet ﷺ said: richness is not in having many possessions; richness is the richness of
// the soul (Sahih al-Bukhari 6446). No one is drawn: by a great home, possessions gather one after another, sacks,
// camels and coins, and still a grey hollow is on its place and crooked ways go out from it for more; by a small home
// with a dish of food, a warm full glow comes on its place, a soft light rises from it and stays, and a warm light is
// over the small home.
function richnessOfTheSoul(): SignArt {
  const much: [number, number] = [40, 105];
  const content: [number, number] = [122, 105.2];
  const s = 0.17;
  const camel = (x: number, y: number) => animalAt("camel", n(x - 50 * s), n(y - 73 * s), s);
  const coins = [
    [50, 108],
    [52.6, 108.4],
    [51.2, 106.8],
    [54, 107],
    [55.2, 108.6]
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#E8C45A" stroke="#B8902E" stroke-width="0.3"/>`)
    .join("");
  return {
    kind: "richness-of-the-soul",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(80, 18) },
      { name: "clouds", svg: cloud(30, 30, 0.6, "#FFFFFF", 0.9) + cloud(130, 26, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a great home", svg: home(34, 101, 24, 15) },
      { name: "the place of the one with much", svg: someone(much[0], much[1]) },
      { name: "possessions: sacks by the great home", svg: sack(14, 106.8, 0.8) + sack(21, 108.2, 0.9) + sack(58, 107.6, 0.8), keys: showFrom(0.04, 0.06) },
      { name: "possessions: camels", svg: camel(10, 99.4) + camel(66, 101), keys: showFrom(0.1, 0.13), loop: { move: "bob", ms: 1600, y: -0.3 } },
      { name: "possessions: coins", svg: coins, keys: showFrom(0.16, 0.18) },
      { name: "possessions: more sacks", svg: sack(27, 108.6, 0.7) + sack(64, 108.6, 0.7), keys: showFrom(0.2, 0.22) },
      { name: "still not enough: a grey hollow on its place", svg: `<circle cx="${much[0]}" cy="${much[1]}" r="3.4" stroke="${GREY}" stroke-width="0.9" fill="#FFFFFF" fill-opacity="0.15"/>`, keys: showFrom(0.26, 0.3) },
      {
        name: "seeking more: crooked ways going out",
        svg: `<path d="M44 105 L50 101 L54 104 L60 99 L64 102 L70 97" stroke="${GREY}" stroke-width="0.8" stroke-dasharray="1.6 1.3" fill="none"/><path d="M36 104 L32 99 L28 102 L24 96" stroke="${GREY}" stroke-width="0.8" stroke-dasharray="1.6 1.3" fill="none"/>`,
        keys: showFrom(0.3, 0.36)
      },
      { name: "a crooked voice: more", svg: crooked(n(much[0] + 3), n(much[1] - 6)), keys: showFrom(0.36, 0.38), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      { name: "a small home", svg: home(132, 102, 13, 9, "#E3CFA4", "#CDB78A", "#7A6A50") },
      { name: "enough: a dish of food by it", svg: food(n(content[0] - 6), 106.6) },
      { name: "the place of the one content", svg: someone(content[0], content[1]) },
      { name: "rich in the soul: a warm full glow on it", svg: glow(content[0], content[1], 6, WARM, 0.32), keys: showFrom(0.52, 0.58), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "content: a soft light, rising and staying", svg: sparkle(content[0], n(content[1] - 5), 1.8, "#FFE7A0") + glow(content[0], n(content[1] - 5), 3, WARM, 0.22), keys: risesAndStays(0.58, 0.66, 14), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "a warm light over the small home", svg: wash(128, 100, 18, 9, WARM, 0.14), keys: showFrom(0.66, 0.74), loop: { move: "twinkle", ms: 2000, low: 0.8 } }
    ],
    words: [
      { text: "Richness is not having many possessions", from: 0.02, to: 0.48 },
      { text: "Richness is the richness of the soul", from: 0.5, to: 1 }
    ]
  };
}

// The neighbor. The Prophet ﷺ said: Jibril kept on advising me about the neighbor, until I thought he would make him
// an heir (Sahih al-Bukhari 6014). No angel is drawn and no one is drawn: his place is a golden ring by his home in
// Madinah, and the home next door has its own place; the advice is a white voice that comes again and again, each
// time a small white light counted over his place; then kindness goes to the home next door, a dish carried along a
// golden way, and a warm glow comes on it; and last, a faint share, as if it would go to the home next door, comes by
// it, and a soft ring goes about both homes as if they were one family.
function theNeighbor(): SignArt {
  const his: [number, number] = [64, 105];
  const next: [number, number] = [106, 105.2];
  const counted = [-6, -2, 2, 6].map((dx, i): SignPart => ({
    name: `advised again, counted ${i + 1}`,
    svg: sparkle(n(his[0] + dx), n(his[1] - 12), 1.4, "#FFFFFF") + glow(n(his[0] + dx), n(his[1] - 12), 2.4, "#FFFFFF", 0.3),
    keys: showFrom(at3(0.05 + i * 0.055), at3(0.06 + i * 0.055))
  }));
  return {
    kind: "the-neighbor",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "clouds", svg: cloud(40, 28, 0.6, "#FFFFFF", 0.9) + cloud(96, 22, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms of Madinah", svg: palm(10, 98, 19) + palm(142, 97, 20) + palm(156, 99, 16) },
      { name: "the masjid of Madinah", svg: madinahMasjid(14, 100.6, 0.5) },
      { name: "his home", svg: home(58, 101, 14, 10) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the home next door", svg: home(100, 101, 14, 10, "#D8B07A", "#C29660", "#6B4A2E") },
      { name: "the place of the one next door", svg: someone(next[0], next[1]) },
      { name: "the advice, again and again: a white voice", svg: arcsLeft(n(his[0] - 4), n(his[1] - 5), "#FFFFFF"), keys: showWhile(0.03, 0.04, 0.62, 0.63), loop: { move: "twinkle", ms: 800, low: 0.35 } },
      ...counted,
      { name: "a golden way between the two homes", svg: way(`M${n(his[0] + 4)} 108.4 L${n(next[0] - 4)} 108.4`, GOLD, 1), keys: showFrom(0.34, 0.37) },
      {
        name: "kindness to the home next door: a dish carried over",
        svg: food(n(his[0] + 5), 107.4),
        keys: track({
          opacity: [
            [0.37, 0],
            [0.375, 1]
          ],
          xy: [
            [0.38, 0, 0],
            [0.46, n(next[0] - 10 - his[0]), 0]
          ]
        })
      },
      { name: "a warm glow on the home next door", svg: glow(next[0], n(next[1] - 3), 8, WARM, 0.26), keys: showFrom(0.47, 0.52), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      {
        name: "as if he would inherit: a faint share",
        svg: `<g opacity="0.75">${sack(n(his[0] + 8), 106.8, 0.8, "#F2E2B8")}</g><path d="M${n(his[0] + 5)} 106.8 L${n(his[0] + 11)} 106.8" stroke="#C9A66B" stroke-width="0.4" stroke-dasharray="0.8 0.8"/>`,
        keys: track({
          opacity: [
            [0.64, 0],
            [0.66, 1]
          ],
          xy: [
            [0.67, 0, 0],
            [0.79, n(next[0] - 16 - his[0]), 0]
          ]
        })
      },
      { name: "as if one family: a soft ring about both homes", svg: care(85, 104.6, 34, 6.4, "#FFF6DA"), keys: showFrom(0.8, 0.86) }
    ],
    words: [
      { text: "Jibril kept on advising me", from: 0.02, to: 0.3 },
      { text: "Advising me about the neighbor", from: 0.32, to: 0.6 },
      { text: "Till I thought the neighbor would inherit", from: 0.62, to: 1 }
    ]
  };
}

// Closest in sujud. The Messenger of Allah ﷺ said: the nearest a servant is to his Lord is when he is in sujud, so make
// much du'a then (Sahih Muslim 482). Nothing is drawn for Allah and no one is drawn: at night, by a home with a lit
// window, a place at prayer stands on a prayer mat, a small dashed circle, with a soft glow; a soft light is over it;
// then the place goes low on the mat, in sujud, and the soft light comes close about it and grows; and last, sparks of
// its du'a rise one after another, and stay, with a warm glow on the mat.
function closestInSujud(): SignArt {
  const mat: [number, number] = [96, 103.6];
  const place: [number, number] = [96, 96];
  const low = 5.6;
  const sparks = risingSparks(
    "its du'a, rising",
    [
      [92, 98],
      [99, 97],
      [95, 96],
      [101, 98.4],
      [93.4, 96.6],
      [97.6, 95.4]
    ],
    0.68,
    0.035,
    { stay: true, rise: 26 }
  );
  return {
    kind: "closest-in-sujud",
    ms: 9000,
    parts: [
      { name: "the night sky", svg: nightSky(84) },
      {
        name: "stars",
        svg: stars([
          [10, 16],
          [26, 34],
          [44, 12],
          [62, 28],
          [82, 14],
          [104, 30],
          [122, 12],
          [140, 32],
          [154, 18],
          [20, 56],
          [136, 58]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon", svg: `<circle cx="130" cy="20" r="5" fill="#FFF3C0"/><circle cx="132.4" cy="18.6" r="4.4" fill="#0F1C3A"/>` },
      { name: "the land at night", svg: nightLand(100, [[14, 110], [54, 114], [130, 112], [150, 108]]) },
      { name: "a home at night", svg: nightHome(42, 101, 18, 12) + litWindow(42, 101, 12) },
      { name: "a prayer mat", svg: prayerMat(mat[0], mat[1]) },
      {
        name: "the place at prayer",
        svg: someone(place[0], place[1], 1.6, LIGHT),
        origin: { x: place[0], y: place[1] },
        keys: track({
          xy: [
            [0.37, 0, 0],
            [0.46, 0, low]
          ],
          scaleY: [
            [0.37, 1],
            [0.46, 0.7]
          ]
        })
      },
      { name: "at prayer: a soft glow on the place", svg: glow(place[0], place[1], 4.4, "#FFF6DA", 0.24), keys: track({ opacity: [[0.04, 0], [0.08, 1]], xy: [[0.37, 0, 0], [0.46, 0, low]] }) },
      {
        name: "near: a soft light about the place",
        svg: glow(place[0], place[1], 9, "#FFF3C0", 0.16),
        origin: { x: place[0], y: place[1] },
        keys: track({
          opacity: [
            [0.1, 0],
            [0.16, 0.6],
            [0.46, 0.6],
            [0.52, 1]
          ],
          scale: [
            [0.1, 0.6],
            [0.22, 1],
            [0.46, 1],
            [0.54, 1.25]
          ],
          xy: [
            [0.37, 0, 0],
            [0.46, 0, low]
          ]
        })
      },
      { name: "much du'a: a warm glow on the mat", svg: wash(mat[0], mat[1], 11, 3, WARM, 0.24), keys: showFrom(0.68, 0.72), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      ...sparks
    ],
    words: [
      { text: "The nearest a servant is to his Lord", from: 0.02, to: 0.32 },
      { text: "Is when he is in sujud", from: 0.34, to: 0.64 },
      { text: "So make much du'a then", from: 0.66, to: 1 }
    ]
  };
}

// Only what is good. The Messenger of Allah ﷺ said: O people, Allah is Good and accepts only what is good. Then he
// mentioned a man who travels long, unkempt and dusty, lifting his hands to the sky: O Lord, O Lord, while his food is
// unlawful, his drink is unlawful, his clothing is unlawful, and he is nourished with the unlawful; so how can he be
// answered? (Sahih Muslim 1015). Nothing is drawn for Allah and no one is drawn: a dish of good food has a warm glow,
// and its good rises and stays; along a long dusty way a traveller's place comes from far off, a brown haze of dust on
// it; its voice calls, and sparks of its du'a begin to rise; a grey dish and a grey cup show by it, then grey cloth and
// a grey shade on its place; and last, the sparks dim and stop where they are.
function acceptsOnlyGood(): SignArt {
  const good: [number, number] = [24, 105.6];
  const comes = 52;
  const traveller: [number, number] = [150, 105.4];
  const at: [number, number] = [n(traveller[0] - comes), traveller[1]];
  const sparkAt: [number, number][] = [
    [at[0] - 2, at[1] - 6],
    [at[0] + 2, at[1] - 7.4],
    [at[0], at[1] - 9]
  ];
  const duas = sparkAt.map(([x, y], i): SignPart => ({
    name: `its du'a, rising ${i + 1}`,
    svg: sparkle(n(x), n(y), 1.6, "#FFE7A0"),
    keys: track({
      opacity: [
        [at3(0.36 + i * 0.02), 0],
        [at3(0.365 + i * 0.02), 1],
        [0.84, 1],
        [0.9, 0.2]
      ],
      xy: [
        [at3(0.365 + i * 0.02), 0, 0],
        [0.44, 0, -16 + i * 2]
      ]
    }),
    loop: { move: "twinkle", ms: 1000, low: 0.55, phase: i / 3 }
  }));
  return {
    kind: "accepts-only-good",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE4F2", "#EAF0EE", 62) },
      { name: "the sun", svg: sun(70, 18) },
      { name: "clouds", svg: cloud(36, 28, 0.6, "#FFFFFF", 0.85) + cloud(124, 24, 0.55, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills("#C9B08A") },
      { name: "the land", svg: land() },
      { name: "the long dusty way", svg: way(`M160 106.6 Q130 104 ${n(at[0] - 4)} 106.6`, "#B89A6C", 1) },
      { name: "what is good: a dish of good food", svg: food(good[0], good[1]) },
      { name: "good: a warm glow on it", svg: glow(good[0], n(good[1] - 2), 6, WARM, 0.28), keys: showFrom(0.03, 0.05), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "accepted: its good, rising and staying", svg: sparkle(good[0], n(good[1] - 6), 1.8, "#FFE7A0") + glow(good[0], n(good[1] - 6), 3, WARM, 0.24), keys: risesAndStays(0.05, 0.11, 30), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      {
        name: "the place of one who travels long",
        svg: someone(traveller[0], traveller[1]),
        keys: track({
          opacity: [
            [0.17, 0],
            [0.175, 1]
          ],
          xy: [
            [0.18, 0, 0],
            [0.27, -comes, 0]
          ]
        })
      },
      {
        name: "dusty: a brown haze on it",
        svg: wash(traveller[0], n(traveller[1] - 0.6), 5, 3, "#C9A27A", 0.3),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.22, 1]
          ],
          xy: [
            [0.18, 0, 0],
            [0.27, -comes, 0]
          ]
        })
      },
      { name: "its voice: O Lord, O Lord", svg: arcs(n(at[0] + 3), n(at[1] - 6), VOICE), keys: showFrom(0.34, 0.35), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      ...duas,
      { name: "its food, unlawful: a grey dish", svg: dish(n(at[0] - 9), 107.2) + `<ellipse cx="${n(at[0] - 9.6)}" cy="105" rx="2.2" ry="1.2" fill="#9A938C"/>`, keys: showFrom(0.5, 0.53) },
      { name: "its drink, unlawful: a grey cup", svg: cup(n(at[0] - 15), 107.4).replace(/#8FB8D6/g, "#9A938C").replace(/#D8ECF8/g, "#BDB6AE"), keys: showFrom(0.53, 0.56) },
      { name: "its clothes, unlawful: grey cloth", svg: cloth(n(at[0] + 9), 107.6, "#A9A29A", "#8C857D"), keys: showFrom(0.66, 0.69) },
      { name: "fed on the unlawful: a grey shade on its place", svg: wash(at[0], n(at[1] - 0.4), 6, 3.6, GREY, 0.26), keys: showFrom(0.69, 0.73) }
    ],
    words: [
      { text: "Allah is Good, accepting only what is good", from: 0.02, to: 0.15 },
      { text: "One who travels long, unkempt and dusty", from: 0.17, to: 0.31 },
      { text: "The man raises both hands: O Lord, O Lord", from: 0.33, to: 0.47 },
      { text: "The man's food is unlawful, drink unlawful", from: 0.49, to: 0.63 },
      { text: "Clothes unlawful, fed on the unlawful", from: 0.65, to: 0.79 },
      { text: "So how can such a man be answered?", from: 0.81, to: 1 }
    ]
  };
}

// Mercy on Musa. Abdullah ibn Mas'ud said: the Prophet ﷺ divided a share, and a man said: this is a division by which
// Allah's Face was not sought. I came to the Prophet ﷺ and told him, and he was angry, until I saw the anger on his
// face. Then he said: may Allah have mercy on Musa; he was harmed with more than this, and he was patient (Sahih
// al-Bukhari 3405). No one is drawn, no Prophet and no face: by the masjid of Madinah, his place is a golden ring, and
// shares go from it to the places of those he gave to; a crooked voice comes from one of them, with a grey shade; one
// place goes to his and a voice tells him; a red glow of anger comes on his place, and goes as his voice speaks; far
// off, long ago, in a soft circle of light, a place by the sea gets a warm glow of mercy; crooked voices gather about
// it, more and more; and a steady light stays on it, for he was patient.
function mercyOnMusa(): SignArt {
  const his: [number, number] = [42, 104.8];
  const given: [number, number][] = [
    [78, 104.6],
    [88, 105.6],
    [98, 104.6],
    [108, 105.6],
    [118, 104.6]
  ];
  const teller = given[1];
  const far: [number, number] = [124, 52];
  const shares = [0, 2, 4].map((k, i): SignPart => ({
    name: `a share given: a sack ${i + 1}`,
    svg: sack(n(his[0] + 6), 107.4, 0.6),
    keys: track({
      opacity: [
        [at3(0.02 + i * 0.01), 0],
        [at3(0.025 + i * 0.01), 1]
      ],
      xy: [
        [at3(0.03 + i * 0.01), 0, 0],
        [at3(0.07 + i * 0.01), n(given[k][0] + 2.6 - his[0] - 6), n(given[k][1] + 2.4 - 107.4)]
      ]
    })
  }));
  const harm = [
    [far[0] - 14, far[1] - 6],
    [far[0] + 12, far[1] - 9],
    [far[0] - 12, far[1] + 6],
    [far[0] + 10, far[1] + 4]
  ].map(([x, y], i): SignPart => ({
    name: `harmed with more: a crooked voice about it ${i + 1}`,
    svg: x < far[0] ? crooked(n(x - 2), n(y)) : crookedLeft(n(x - 4), n(y)),
    keys: showFrom(at3(0.72 + i * 0.02), at3(0.725 + i * 0.02)),
    loop: { move: "twinkle", ms: 800, low: 0.45, phase: i / 4 }
  }));
  return {
    kind: "mercy-on-musa",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(70, 18) },
      { name: "clouds", svg: cloud(30, 28, 0.6, "#FFFFFF", 0.9) + cloud(84, 34, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms of Madinah", svg: palm(8, 98, 19) + palm(140, 98, 18) + palm(154, 99, 15) },
      { name: "the masjid of Madinah", svg: madinahMasjid(14, 100.6, 0.5) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...given.map(([x, y], i): SignPart => (i === 1 ? { name: "the place of the one who told him", svg: someone(x, y), keys: track({ xy: [[0.3, 0, 0], [0.36, n(his[0] + 9 - x), n(his[1] + 0.6 - y)]] }) } : { name: `the place of one given a share ${i < 1 ? 1 : i}`, svg: someone(x, y) })),
      ...shares,
      { name: "a crooked voice from one of them", svg: crookedLeft(n(given[3][0] - 3), n(given[3][1] - 6)), keys: showFrom(0.16, 0.17), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      { name: "a grey shade on that place", svg: wash(given[3][0], given[3][1], 5, 3, GREY, 0.22), keys: showFrom(0.17, 0.2) },
      { name: "his voice, telling him", svg: arcsLeft(n(his[0] + 7), n(his[1] - 4.4), VOICE), keys: showWhile(0.36, 0.37, 0.43, 0.44), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "angry: a red glow on his place", svg: glow(his[0], his[1], 6, "#E8735A", 0.3), keys: showWhile(0.44, 0.48, 0.6, 0.65) },
      { name: "his voice: may mercy be on him", svg: arcs(n(his[0] + 4), n(his[1] - 4.6), VOICE), keys: showFrom(0.58, 0.59), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "far off, long ago: a soft circle of light",
        svg: `<circle cx="${far[0]}" cy="${far[1]}" r="21" fill="#FFF8E6" opacity="0.9" stroke="#E8D8B0" stroke-width="0.6"/><ellipse cx="${far[0]}" cy="${n(far[1] + 9)}" rx="16" ry="4" fill="#E6CF9C"/><ellipse cx="${n(far[0] + 7)}" cy="${n(far[1] + 12)}" rx="8" ry="2.2" fill="#7DB4E0"/>`,
        keys: showFrom(0.59, 0.62)
      },
      { name: "a place far off, long ago, by the sea", svg: someone(far[0], n(far[1] + 7)), keys: showFrom(0.61, 0.63) },
      { name: "mercy on it: a warm glow", svg: glow(far[0], n(far[1] + 7), 6, WARM, 0.32), keys: showFrom(0.63, 0.66), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      ...harm,
      { name: "patient: a steady light stays on it", svg: sparkle(far[0], n(far[1] + 1), 1.8, "#FFE7A0") + care(far[0], n(far[1] + 7.6), 6, 2.2), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 2000, low: 0.85 } }
    ],
    words: [
      { text: "He divided a share among them", from: 0.02, to: 0.13 },
      { text: "One said: this was not shared for Allah's sake", from: 0.15, to: 0.27 },
      { text: "Abdullah: I came to him and told him", from: 0.29, to: 0.41 },
      { text: "He was angry, till I saw it on his face", from: 0.43, to: 0.55 },
      { text: "May Allah have mercy on Musa", from: 0.57, to: 0.69 },
      { text: "Musa was harmed with more than this", from: 0.71, to: 0.83 },
      { text: "And Musa was patient", from: 0.85, to: 1 }
    ]
  };
}

export const COUNSEL_ART = {
  "farewell-sermon": farewellSermon,
  "recite-to-me": reciteToMe,
  "richness-of-the-soul": richnessOfTheSoul,
  "the-neighbor": theNeighbor,
  "closest-in-sujud": closestInSujud,
  "accepts-only-good": acceptsOnlyGood,
  "mercy-on-musa": mercyOnMusa
};
