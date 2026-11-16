import { cloud, glow, n, nightSky, sky, stars, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { cover, GREY, prayerMat } from "./lovedArt";
import { dish } from "./worthArt";
import { EVENING } from "./heartArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, dayAround, LIGHT, lightIn, palms, sparkRising, tent, track } from "./daysArt";
import { lookLine } from "./truthArt";

/**
 * What is heard and heeded, drawn as the scenes of worship and devotion are (devotionArt.ts): the one who loved to end
 * his recitation with Al-Ikhlas, a night of prayer with Hudhayfah, Ubayy named and weeping, the six days of Shawwal,
 * the six rights of a Muslim, the warner who saw the army, and Sa'd, firm in his faith and kind. Only the land, the sky,
 * buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a
 * face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is
 * arcs in the air. No page of the Quran is drawn: its words are lights and golden arcs. Nothing is drawn for Allah, and
 * nothing comes down from the sky: a prayer or a praise is a spark that rises.
 */

/** A long mat for a row of prayer, from x1 to x2, under places whose middle is at y. */
const longMat = (y: number, x1: number, x2: number) =>
  `<rect x="${x1}" y="${n(y - 1.6)}" width="${n(x2 - x1)}" height="3.8" rx="0.6" fill="#E9D7A6"/>` +
  `<rect x="${n(x1 + 1)}" y="${n(y - 0.9)}" width="${n(x2 - x1 - 2)}" height="2.4" rx="0.4" stroke="#C9A866" stroke-width="0.4" fill="none"/>`;

/** A small golden light, its middle at (x, y). */
const goldLight = (x: number, y: number, r = 1.8) => glow(x, y, n(r * 2), WARM, 0.3) + sparkle(x, y, r, "#E8A93A");

/** A golden line from x1 to x2 at y: drawn whole, and grown from its left end (its `origin`). */
const goldLine = (x1: number, x2: number, y: number, width = 1.4) =>
  `<path d="M${x1} ${y} L${x2} ${y}" stroke="#FFF3C0" stroke-width="${n(width + 1.2)}" stroke-linecap="round" opacity="0.45"/>` +
  `<path d="M${x1} ${y} L${x2} ${y}" stroke="${GOLD}" stroke-width="${width}" stroke-linecap="round"/>`;

/** A faint dashed ring in the air at (x, y): something still to come. */
const faintRing = (x: number, y: number, r = 2.4, color = "#FFFFFF") =>
  `<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" stroke-width="0.5" stroke-dasharray="0.9 0.9" fill="none" opacity="0.7"/>`;

/** Small silver glints about (x, y): weeping, drawn as light and not as tears. */
const glints = (x: number, y: number) =>
  (
    [
      [-3.4, -1.6],
      [3.2, -2.2],
      [-2.2, 2.4],
      [2.8, 2],
      [0.2, -3.6]
    ] as [number, number][]
  )
    .map(([dx, dy]) => sparkle(n(x + dx), n(y + dy), 0.7, "#E6ECF4"))
    .join("");

/** A cup, its foot's middle at (x, y). */
const cup = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${n(y - 3.2)} L${n(x + 1.6)} ${n(y - 3.2)} L${n(x + 1.1)} ${y} L${n(x - 1.1)} ${y} Z" fill="#B8864A"/>` +
  `<path d="M${n(x - 1.4)} ${n(y - 2.7)} L${n(x + 1.4)} ${n(y - 2.7)}" stroke="#E2C48C" stroke-width="0.4"/>`;

/** A grey stroke across (x, y): refused, or struck out. */
const struck = (x: number, y: number, r = 3) => `<path d="M${n(x - r)} ${n(y + r * 0.8)} L${n(x + r)} ${n(y - r * 0.8)}" stroke="${GREY}" stroke-width="0.8" stroke-linecap="round"/>`;

/** Low grey dust over the ground, its middle at (x, y), `s` times its size: an army seen from afar, never its men. */
const dust = (x: number, y: number, s: number) =>
  wash(x, y, n(22 * s), n(6 * s), "#A3937A", 0.2) +
  (
    [
      [-12, 1.6, 3.4],
      [-4, -0.6, 4.4],
      [5, 0.8, 3.8],
      [13, 2, 3]
    ] as [number, number, number][]
  )
    .map(([dx, dy, r]) => `<ellipse cx="${n(x + dx * s)}" cy="${n(y + dy * s)}" rx="${n(r * 1.6 * s)}" ry="${n(r * s)}" fill="#B3A386" opacity="0.55"/>`)
    .join("");

/** A dark land at night, from y `top` down, with a few tufts. */
const nightLand = (top: number, tufts: [number, number][]) =>
  `<rect y="${top}" width="160" height="${120 - top}" fill="#2E3556"/><path d="M0 ${top} L160 ${top}" stroke="#454B6A" stroke-width="0.7"/>` +
  tufts.map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("");

/** The window of a home (trialArt.ts), lit at night. */
const litWindow = (x: number, y: number, h: number) => {
  const [wx, wy] = [n(x + 2), n(y - h + 2.4)];
  return `${glow(n(wx + 1.3), n(wy + 1.3), 4, "#FFD866", 0.18)}<rect x="${wx}" y="${wy}" width="2.6" height="2.6" fill="#FFD866"/>`;
};

/** The door of a home (trialArt.ts) whose foot's middle is at (x, y), lit from within. */
const litDoor = (x: number, y: number) =>
  `${glow(n(x - 1.8), n(y - 3.4), 4.6, "#FFD866", 0.24)}<path d="M${n(x - 3.6)} ${y} L${n(x - 3.6)} ${n(y - 5.4)} Q${n(x - 1.8)} ${n(y - 7.6)} ${x} ${n(y - 5.4)} L${x} ${y} Z" fill="#FFD866" opacity="0.85"/>`;

/** A night over the sky, from the top down to y 62; and over the land, from y 62 down. */
const NIGHT_OVER_SKY = `<rect width="160" height="62" fill="#16284C"/><rect width="160" height="34" fill="#0F1C3A"/>`;
const NIGHT_OVER_LAND = `<rect y="62" width="160" height="58" fill="#0F1C3A" opacity="0.42"/>`;

/** A place that goes out to `to` (from its own start) between `from` and `out`, and back between `back` and `home`. */
const outAndBack = (dx: number, dy: number, from: number, out: number, back: number, home: number) =>
  track({
    xy: [
      [from, 0, 0],
      [out, dx, dy],
      [back, dx, dy],
      [home, 0, 0]
    ]
  });

// The one who loved Al-Ikhlas. Aishah said: the Prophet ﷺ sent a man in charge of a party, and he would recite for his
// companions in their prayer and end with Say: He is Allah, One. When they came back, they told the Prophet ﷺ of it,
// and he said: ask him why he does so. They asked him, and he said: because it is the description of the Most
// Merciful, and I love to recite it. The Prophet ﷺ said: tell him that Allah loves him (Sahih al-Bukhari 7375). No one
// is drawn: by the masjid of Madinah his place is a golden ring; his voice speaks, and the places of the party go out
// along a way to their camp, the one in charge of them ahead. There it leads their prayer on a long mat, its
// recitation golden arcs, and at its end one golden light shows over the row. They come back; their voices tell him,
// and his voice asks why. Its voice answers, and the light of the surah it loved shows over its place, with a warm glow
// about it; his voice speaks, and a warm light comes in its place, with a ring of care.
function lovesAlIkhlas(): SignArt {
  const his: [number, number] = [24, 104.8];
  const lead: [number, number] = [56, 103.2];
  const leadAt: [number, number] = [112, 102.2];
  const party: [number, number][] = [
    [62, 104.8],
    [66, 102],
    [70, 105.2],
    [74, 102.6]
  ];
  const row: [number, number][] = [
    [121, 103.4],
    [126.4, 103.4],
    [131.8, 103.4],
    [137.2, 103.4]
  ];
  const go = (i: number, to: [number, number], from: [number, number]): SignPart["keys"] => outAndBack(n(to[0] - from[0]), n(to[1] - from[1]), at3(0.05 + 0.006 * i), at3(0.09 + 0.002 * i), 0.45, at3(0.485 + 0.002 * i));
  return {
    kind: "loves-al-ikhlas",
    ms: 12000,
    parts: [
      ...dayAround([86, 18], 12000),
      ...palms([
        [48, 98, 13],
        [100, 97, 12]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(1, 101, 0.92) },
      { name: "the party's camp: tents", svg: tent(124, 96.4, 12, 9) + tent(146, 97.6, 14, 10.4) },
      { name: "a long mat for their prayer", svg: longMat(104.8, 116, 141) },
      { name: "the way between Madinah and the camp", svg: way("M50 107.2 Q82 100.6 108 106.4", LIGHT, 0.9), keys: showFrom(0.03, 0.05) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: sending the party", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.03, 0.035, 0.16, 0.165), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...party.map(
        ([x, y], i): SignPart => ({
          name: `a place of the party ${i + 1}`,
          svg: someone(x, y, 1.5),
          keys: go(i, row[i], [x, y])
        })
      ),
      { name: "the place of the one in charge of them", svg: someone(lead[0], lead[1], 1.8), keys: go(0, leadAt, lead) },
      { name: "its recitation in their prayer: golden arcs", svg: arcs(n(leadAt[0] + 3), n(leadAt[1] - 4.4), GOLD), keys: showWhile(0.17, 0.18, 0.44, 0.45), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      {
        name: "at its end, al-Ikhlas: a single golden light",
        svg: `${glow(127, 86, 7, "#FFF3C0", 0.2)}${goldLight(127, 86, 2.2)}<circle cx="127" cy="86" r="4.6" stroke="${GOLD}" stroke-width="0.5" fill="none" opacity="0.7"/>`,
        keys: showWhile(0.31, 0.34, 0.44, 0.46),
        loop: { move: "twinkle", ms: 1500, low: 0.7 }
      },
      { name: "their voices: telling him", svg: arcsLeft(n(party[1][0] - 2.4), n(party[1][1] - 4), VOICE), keys: showWhile(0.49, 0.495, 0.505, 0.51), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "his voice: ask him why", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.505, 0.51, 0.58, 0.59), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "its voice: because it describes the Most Merciful", svg: arcsLeft(n(lead[0] - 2.6), n(lead[1] - 4.2), VOICE), keys: showWhile(0.59, 0.6, 0.86, 0.865), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the surah it loved: a golden light over its place", svg: goldLight(lead[0], n(lead[1] - 9.6), 2), keys: showFrom(0.6, 0.63), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "its love of the surah: a warm glow about its place", svg: wash(lead[0], n(lead[1] - 3), 9, 7.4, WARM, 0.2), keys: showFrom(0.73, 0.77), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "his voice: tell him", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showFrom(0.86, 0.87), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "loved: a warm light in its place", svg: lightIn(lead[0], lead[1], 4.4), keys: showFrom(0.9, 0.92), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a ring of care about it", svg: care(lead[0], n(lead[1] + 1.4), 7.4, 3), keys: showFrom(0.92, 0.95) }
    ],
    words: [
      { text: "He sent a man in charge of a party", from: 0.02, to: 0.14 },
      { text: "In their prayer, he would end with", from: 0.16, to: 0.28 },
      { text: "Say: He is Allah, One", from: 0.3, to: 0.42 },
      { text: "They told him; he said: ask him why", from: 0.44, to: 0.56 },
      { text: "Because it describes the Most Merciful", from: 0.58, to: 0.7 },
      { text: "And I love to recite it", from: 0.72, to: 0.84 },
      { text: "Tell him that Allah loves him", from: 0.86, to: 1 }
    ]
  };
}

// A night with Hudhayfah. Hudhayfah said: I prayed with the Prophet ﷺ one night, and he began al-Baqarah. I thought he
// would bow at a hundred ayat, but he went on; I thought he would pray it in a rak'ah, but he went on; I thought he
// would bow with it. Then he began an-Nisa and recited it, then he began Al Imran and recited it, reciting slowly. When
// he passed an ayah with glorification in it, he glorified; when he passed an asking, he asked; and when he passed a
// seeking of refuge, he sought refuge. Then he bowed, and began to say: Glory be to my Lord, the Most Great; and his
// bowing was about as long as his standing (Sahih Muslim 772). No one is drawn: at night, his place is a golden ring
// on a prayer mat, and Hudhayfah's place comes to pray beside it. His voice recites in golden arcs, and a golden line
// grows across the sky for each surah, al-Baqarah, then an-Nisa, then Al Imran: his standing. The arcs grow slow and
// soft. At an ayah of glory a spark rises; at an asking a light rises; at a seeking of refuge a ring of care comes
// about his place. Then a calm light comes for his bowing, his voice glorifies his Lord, and a second golden line grows
// under the first, nearly as long: his bowing, about as long as his standing.
function nightWithHudhayfah(): SignArt {
  /** A spark that shows at `from`, rises until `to`, and stays there until he bows. */
  const riseAndStay = (from: number, to: number) =>
    track({
      opacity: [
        [from, 0],
        [at3(from + 0.005), 1],
        [0.72, 1],
        [0.73, 0]
      ],
      xy: [
        [from, 0, 0],
        [to, 0, -14]
      ]
    });
  const his: [number, number] = [66, 103.4];
  const hudhayfah: [number, number] = [88, 103.8];
  const surahs: [string, number, number][] = [
    ["al-Baqarah", 26, 71],
    ["an-Nisa", 73, 99],
    ["Al Imran", 101, 126]
  ];
  const grow = (from: number, to: number) =>
    track({
      opacity: [
        [from, 0],
        [at3(from + 0.003), 1]
      ],
      scaleX: [
        [from, 0.02],
        [to, 1]
      ]
    });
  return {
    kind: "night-with-hudhayfah",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars of the night",
        svg: stars([
          [8, 12],
          [22, 40],
          [40, 10],
          [58, 44],
          [84, 8],
          [104, 42],
          [124, 12],
          [146, 36],
          [152, 8],
          [14, 54]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon of the night", svg: `${glow(142, 52, 7, "#FFF3C4", 0.08)}${crescent(142, 52, 4, 1.4, "#FFF3C4")}` },
      { name: "hills in the dark", svg: hills("#3A4263") },
      { name: "the land at night", svg: nightLand(62, [[18, 76], [62, 74], [112, 78], [30, 116], [124, 116]]) },
      { name: "a home of Madinah", svg: home(132, 101, 24, 16, "#6A5A4C", "#5A4C40", "#2E2620") + litWindow(132, 101, 16) },
      { name: "a mat, his place of prayer", svg: prayerMat(his[0], 105.4) },
      { name: "a mat, Hudhayfah's place of prayer", svg: prayerMat(hudhayfah[0], 105.8) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Hudhayfah's place, praying with him",
        svg: someone(hudhayfah[0], hudhayfah[1], 1.6, LIGHT),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: [
            [0.03, 26, 0],
            [0.09, 0, 0]
          ]
        })
      },
      { name: "his recitation: golden arcs", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showWhile(0.17, 0.18, 0.31, 0.32), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...surahs.map(
        ([name, x1, x2], i): SignPart => ({
          name: `his standing, ${name}: a golden line growing`,
          svg: goldLine(x1, x2, 22),
          origin: { x: x1, y: 22 },
          keys: grow([0.17, 0.2, 0.22][i], [0.2, 0.22, 0.24][i])
        })
      ),
      { name: "his recitation, slow: soft golden arcs", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showWhile(0.31, 0.33, 0.72, 0.73), loop: { move: "twinkle", ms: 2600, low: 0.35 } },
      { name: "at an ayah of glory, his glorifying: a spark rising", svg: sparkle(n(his[0] - 3), n(his[1] - 8), 1.8, "#FFE7A0"), keys: riseAndStay(0.45, 0.51) },
      { name: "at an asking, his asking: a light rising", svg: goldLight(n(his[0] + 3), n(his[1] - 8), 1.6), keys: riseAndStay(0.59, 0.63) },
      { name: "at a seeking of refuge: a ring of care about his place", svg: care(his[0], n(his[1] + 1.4), 8, 3.4), keys: showWhile(0.63, 0.65, 0.72, 0.74) },
      { name: "at rest bowing: a calm light", svg: glow(n(his[0] - 5), n(his[1] - 2), 3.2, "#FFF3C0", 0.34) + sparkle(n(his[0] - 5), n(his[1] - 2), 1.3, "#E8A93A"), keys: showFrom(0.73, 0.75), loop: { move: "twinkle", ms: 1500, low: 0.6 } },
      { name: "his voice in ruku: glory be to my Lord, the Most Great", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), WARM), keys: showFrom(0.74, 0.75), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      { name: "his bowing, about as long as his standing: a golden line growing", svg: goldLine(26, 122, 29, 1.2), origin: { x: 26, y: 29 }, keys: grow(0.87, 0.95) }
    ],
    words: [
      { text: "I prayed with him one night", from: 0.02, to: 0.14 },
      { text: "Al-Baqarah, then an-Nisa, then Al Imran", from: 0.16, to: 0.28 },
      { text: "He recited slowly", from: 0.3, to: 0.42 },
      { text: "At an ayah of glory, he glorified", from: 0.44, to: 0.56 },
      { text: "At an asking he asked; at refuge, he sought refuge", from: 0.58, to: 0.7 },
      { text: "He bowed: Glory be to my Lord, the Most Great", from: 0.72, to: 0.84 },
      { text: "His bowing was about as long as his standing", from: 0.86, to: 1 }
    ]
  };
}

// Ubayy named. Anas ibn Malik said: the Prophet ﷺ said to Ubayy: Allah has ordered me to recite to you: Those who
// disbelieved were not (al-Bayyinah 98:1). Ubayy said: and He named me? He said: yes. And Ubayy wept (Sahih al-Bukhari
// 4959). No one is drawn: by the masjid of Madinah his place is a golden ring, and Ubayy's place sits with it. His voice
// speaks; Ubayy's voice asks; his voice answers, and a golden glow comes about Ubayy's place. Then golden arcs of his
// recitation go to Ubayy, soft silver glints shimmer about Ubayy's place, for his weeping, and a warm light comes in it.
function ubayyNamed(): SignArt {
  const his: [number, number] = [58, 104.4];
  const ubayy: [number, number] = [80, 104.2];
  return {
    kind: "ubayy-named",
    ms: 9000,
    parts: [
      ...dayAround([136, 20], 9000),
      ...palms([
        [112, 98, 14],
        [150, 99, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 101, 0.95) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ubayy's place", svg: someone(ubayy[0], ubayy[1], 1.7) },
      { name: "his voice: ordered to recite to Ubayy", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.03, 0.04, 0.28, 0.29), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Ubayy's voice: did He name me", svg: arcsLeft(n(ubayy[0] - 3), n(ubayy[1] - 4.2), VOICE), keys: showWhile(0.29, 0.3, 0.52, 0.53), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "his voice: yes", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.53, 0.54, 0.74, 0.75), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "named: a golden glow about Ubayy's place", svg: wash(ubayy[0], n(ubayy[1] - 2), 8, 6.6, "#FFE9A8", 0.22), keys: showFrom(0.56, 0.6), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "his recitation to Ubayy: golden arcs", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showFrom(0.75, 0.77), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "Ubayy's weeping: soft silver glints", svg: glints(ubayy[0], n(ubayy[1] - 1)), keys: showFrom(0.77, 0.8), loop: { move: "twinkle", ms: 700, low: 0.3 } },
      { name: "a warm light in Ubayy's place", svg: lightIn(ubayy[0], ubayy[1], 4.4), keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Allah has ordered me to recite to you", from: 0.02, to: 0.26 },
      { text: "Did He name me?", from: 0.28, to: 0.5 },
      { text: "He said: yes", from: 0.52, to: 0.72 },
      { text: "And he wept", from: 0.74, to: 1 }
    ]
  };
}

// Six of Shawwal. Abu Ayyub al-Ansari said: the Messenger of Allah ﷺ said: whoever fasts Ramadan, then follows it with
// six of Shawwal, it is like fasting all the time (Sahih Muslim 1164). Nothing of a person is drawn: across the sky are
// the twelve months of the year as crescents. Ramadan's crescent lights, and a golden line fills under it as its days
// are fasted, by the covered dish of the fast at a home; then Shawwal's crescent lights, and six small lights come
// under it one by one. Then every month of the year lights in turn, a golden line runs along the whole year from end
// to end, and a warm light comes in the place of the one who fasted.
function sixOfShawwal(): SignArt {
  const months = Array.from({ length: 12 }, (_, i) => 14 + 12 * i);
  const ramadan = months[8];
  const shawwal = months[9];
  const fasting: [number, number] = [64, 104.2];
  const six: [number, number][] = [
    [shawwal - 3, 30],
    [shawwal, 30],
    [shawwal + 3, 30],
    [shawwal - 3, 33],
    [shawwal, 33],
    [shawwal + 3, 33]
  ];
  return {
    kind: "six-of-shawwal",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the months of the year: twelve crescents", svg: `<rect x="6" y="14" width="148" height="23" rx="3" fill="#FFFFFF" opacity="0.32"/>` + months.map((x) => crescent(x, 22, 2.6, 1, "#D9CDA8")).join("") },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms(
        [
          [24, 99, 13],
          [138, 98, 14]
        ],
        "the town"
      ),
      { name: "a home", svg: home(96, 103, 26, 18) },
      { name: "the place of the one who fasts", svg: someone(fasting[0], fasting[1], 1.6) },
      { name: "a dish, covered: the fast", svg: dish(74, 106.6) + cover(74, 105.2), keys: showFrom(0.04, 0.07) },
      { name: "Ramadan: its crescent, lit", svg: glow(ramadan, 22, 5.6, "#FFF3C0", 0.3) + crescent(ramadan, 22, 2.6, 1, GOLD), keys: showFrom(0.04, 0.07), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "the days of Ramadan, fasted: a golden line under its crescent",
        svg: goldLine(n(ramadan - 4.4), n(ramadan + 4.4), 30, 1.2),
        origin: { x: n(ramadan - 4.4), y: 30 },
        keys: track({
          opacity: [
            [0.08, 0],
            [0.085, 1]
          ],
          scaleX: [
            [0.08, 0.02],
            [0.26, 1]
          ]
        })
      },
      { name: "Shawwal: its crescent, lit", svg: glow(shawwal, 22, 5.6, "#FFF3C0", 0.3) + crescent(shawwal, 22, 2.6, 1, GOLD), keys: showFrom(0.33, 0.36), loop: { move: "twinkle", ms: 1600, low: 0.7, phase: 0.5 } },
      ...six.map(
        ([x, y], i): SignPart => ({
          name: `six days of Shawwal, fasted ${i + 1}`,
          svg: `<circle cx="${x}" cy="${y}" r="1" fill="${GOLD}"/>`,
          keys: showFrom(at3(0.38 + 0.026 * i), at3(0.39 + 0.026 * i))
        })
      ),
      ...months.map(
        (x, i): SignPart => ({
          name: `as if all the time: a month of the year, lit ${i + 1}`,
          svg: glow(x, 22, 4.4, "#FFF3C0", 0.22) + crescent(x, 22, 2.6, 1, "#E9C766"),
          keys: showFrom(at3(0.66 + 0.018 * i), at3(0.672 + 0.018 * i))
        })
      ),
      {
        name: "on and on: a golden line along the whole year",
        svg: goldLine(6, 154, 39, 1.2),
        origin: { x: 6, y: 39 },
        keys: track({
          opacity: [
            [0.87, 0],
            [0.875, 1]
          ],
          scaleX: [
            [0.87, 0.02],
            [0.93, 1]
          ]
        })
      },
      { name: "a warm light in the place of the one who fasted", svg: lightIn(fasting[0], fasting[1], 4.4), keys: showFrom(0.9, 0.93), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Whoever fasts Ramadan", from: 0.02, to: 0.3 },
      { text: "Then follows it with six of Shawwal", from: 0.32, to: 0.62 },
      { text: "It is like fasting all the time", from: 0.64, to: 1 }
    ]
  };
}

// Six rights. Abu Hurairah said: the Messenger of Allah ﷺ said: the rights of a Muslim on a Muslim are six. It was
// said: what are they, O Messenger of Allah? He said: when you meet him, greet him; when he invites you, answer him;
// when he asks your advice, advise him; when he sneezes and praises Allah, say: Allah have mercy on you; when he is
// ill, visit him; and when he dies, follow him (Sahih Muslim 2162). No one is drawn: his place is a golden ring by
// the masjid, his voice speaks, and six faint rings show in the air. Two places meet on the way and a golden greeting
// goes between them; one goes home and lights its door, and the other comes in to a dish; one asks and the other
// answers in gold; one sneezes, a spark of its praise rises, and a golden answer comes back; a grey shade comes over
// one, and the other comes to it with a warm glow; and last its place is gone, and the other and two more places walk
// after the faint ring that goes ahead. Each time, one of the six rings fills with gold.
function sixRights(): SignArt {
  const his: [number, number] = [22, 106];
  const one: [number, number] = [56, 104.4];
  const other: [number, number] = [112, 104.4];
  const homeAt: [number, number, number, number] = [130, 101, 24, 17];
  const rings = [40, 56, 72, 88, 104, 120];
  const kept = [0.22, 0.36, 0.5, 0.64, 0.78, 0.92];
  const followers: [number, number][] = [
    [96, 106.4],
    [104, 102.4]
  ];
  return {
    kind: "six-rights",
    ms: 12000,
    parts: [
      ...dayAround([148, 44], 12000).map((p) => (p.name === "clouds" ? { ...p, svg: cloud(40, 41, 0.5, "#FFFFFF", 0.9) + cloud(96, 38, 0.45, "#FFFFFF", 0.85) } : p)),
      { name: "the masjid of Madinah", svg: madinahMasjid(0, 101, 0.7) },
      { name: "a home", svg: home(...homeAt) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: the rights are six", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showWhile(0.03, 0.035, 0.16, 0.165), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the six rights: six faint rings", svg: `<rect x="32" y="13" width="96" height="14" rx="3" fill="#FFFFFF" opacity="0.32"/>` + rings.map((x) => faintRing(x, 20, 2.6, "#B9A27A")).join(""), keys: showFrom(0.04, 0.07) },
      ...rings.map(
        (x, i): SignPart => ({
          name: `a right kept: a golden light ${i + 1}`,
          svg: goldLight(x, 20, 1.9),
          keys: showFrom(kept[i], at3(kept[i] + 0.02)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 6 }
        })
      ),
      { name: "its invitation: a lit door", svg: litDoor(homeAt[0], homeAt[1]), keys: showWhile(0.31, 0.33, 0.72, 0.74) },
      { name: "a meal at its home: a dish", svg: dish(118, 107.4) + `<circle cx="117" cy="105.8" r="0.8" fill="#C9763A"/><circle cx="119" cy="105.6" r="0.8" fill="#D4A04A"/>`, keys: showWhile(0.35, 0.37, 0.45, 0.46) },
      {
        name: "the place of one Muslim",
        svg: someone(one[0], one[1], 1.7),
        keys: track({
          xy: [
            [0.17, 0, 0],
            [0.2, 8, 0],
            [0.33, 8, 0],
            [0.36, 54, 0.4],
            [0.72, 54, 0.4],
            [0.74, 24, 0.4],
            [0.75, 24, 0.4],
            [0.77, 52, 0.4],
            [0.88, 52, 0.4],
            [0.95, 4, 1.2]
          ]
        })
      },
      {
        name: "the place of the other Muslim",
        svg: someone(other[0], other[1], 1.7),
        keys: track({
          xy: [
            [0.16, 0, 0],
            [0.2, -38, 0],
            [0.31, -38, 0],
            [0.34, 10, -0.6]
          ],
          opacity: [
            [0.87, 1],
            [0.89, 0]
          ]
        })
      },
      { name: "the greeting: golden arcs between them", svg: arcs(n(one[0] + 11), n(one[1] - 4.2), GOLD) + arcsLeft(n(other[0] - 41), n(other[1] - 4.2), GOLD), keys: showWhile(0.21, 0.215, 0.31, 0.315), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "its voice, asking for advice", svg: arcsLeft(n(other[0] + 7.4), n(other[1] - 4.8), VOICE), keys: showWhile(0.45, 0.455, 0.475, 0.48), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "advice given: golden arcs", svg: arcs(n(one[0] + 57), n(one[1] - 4.4), GOLD), keys: showWhile(0.48, 0.485, 0.58, 0.585), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the sneeze: a small spark", svg: sparkle(n(other[0] + 10), n(other[1] - 3.6), 1.2, "#FFFFFF"), keys: sparkRising(0.59, 0.61, 5) },
      { name: "its praise: a spark rising", svg: sparkle(n(other[0] + 10), n(other[1] - 6), 1.6, "#FFE7A0"), keys: sparkRising(0.612, 0.64, 12) },
      { name: "answered with mercy: golden arcs", svg: arcs(n(one[0] + 57), n(one[1] - 4.4), GOLD), keys: showWhile(0.63, 0.635, 0.72, 0.725), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "ill: a grey shade over its place", svg: wash(n(other[0] + 10), n(other[1] - 1.6), 6.4, 5, GREY, 0.3), keys: track({ opacity: [[0.73, 0], [0.75, 1], [0.77, 1], [0.79, 0.4], [0.87, 0.4], [0.88, 0]] }) },
      { name: "the visit: a warm glow over them both", svg: wash(n(other[0] + 6), n(other[1] - 2), 11, 6.4, WARM, 0.2), keys: showWhile(0.77, 0.79, 0.87, 0.88), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      {
        name: "gone ahead: a faint dashed ring",
        svg: someone(n(other[0] + 10), n(other[1] - 0.6), 1.7, "#B9AC9A"),
        keys: track({
          opacity: [
            [0.87, 0],
            [0.89, 0.7]
          ],
          xy: [
            [0.89, 0, 0],
            [0.95, -54, 1.4]
          ]
        })
      },
      ...followers.map(
        ([x, y], i): SignPart => ({
          name: `a place following ${i + 1}`,
          svg: someone(x, y, 1.5),
          keys: track({
            opacity: [
              [0.87, 0],
              [0.89, 1]
            ],
            xy: [
              [0.89, 0, 0],
              [0.95, -52, 0]
            ]
          })
        })
      )
    ],
    words: [
      { text: "A Muslim's rights on a Muslim are six", from: 0.02, to: 0.14 },
      { text: "When you meet him, greet him", from: 0.16, to: 0.28 },
      { text: "When he invites you, answer him", from: 0.3, to: 0.42 },
      { text: "When he asks your advice, advise him", from: 0.44, to: 0.56 },
      { text: "If he sneezes and praises Allah, ask mercy for him", from: 0.58, to: 0.7 },
      { text: "When he is ill, visit him", from: 0.72, to: 0.84 },
      { text: "When he dies, follow him", from: 0.86, to: 1 }
    ]
  };
}

// The warner. Abu Musa said: the Messenger of Allah ﷺ said: my likeness, and the likeness of what Allah sent me with,
// is like a man who came to a people and said: I saw the army with my own eyes, and I am the warner, so save
// yourselves, save yourselves! A group of them obeyed him, went out by night at their ease, and were saved; and a
// group denied him, and the army came on them in the morning and swept them away (Sahih al-Bukhari 6482). Nothing of
// the army is drawn but its dust far off: in the evening, the warner's place comes running from the hills to the homes
// of a people; its voice cries out, and far beyond the hills a grey dust shows, with a faint line from the warner to
// it. Night comes: three places go out along a way at their ease, and a ring of care comes about them, far off. The
// others stay, their voices grey. Morning comes, the grey dust sweeps over their homes, their places are gone, and a
// warm light shows among those who were saved.
function theWarner(): SignArt {
  const warner: [number, number] = [146, 103.2];
  const homes: [number, number, number, number][] = [
    [70, 100, 18, 14],
    [98, 101, 20, 15],
    [126, 100, 18, 14]
  ];
  const obeyed: [number, number][] = [
    [62, 105],
    [78, 104.2],
    [90, 105.4]
  ];
  const safe: [number, number][] = [
    [10, 104.4],
    [16, 102.8],
    [22, 105]
  ];
  const denied: [number, number][] = [
    [106, 104.6],
    [116, 105.6],
    [134, 104.4]
  ];
  return {
    kind: "the-warner",
    ms: 12000,
    parts: [
      { name: "the evening sky", svg: EVENING + `<rect y="62" width="160" height="58" fill="#D9C29A"/>` },
      {
        name: "the night over the sky",
        svg: NIGHT_OVER_SKY,
        keys: track({
          opacity: [
            [0.5, 0],
            [0.53, 0.95],
            [0.82, 0.95],
            [0.86, 0]
          ]
        })
      },
      {
        name: "stars of the night",
        svg: stars([
          [12, 14],
          [30, 34],
          [52, 12],
          [74, 30],
          [96, 10],
          [118, 32],
          [138, 14],
          [152, 40]
        ]),
        keys: track({
          opacity: [
            [0.51, 0],
            [0.54, 1],
            [0.82, 1],
            [0.85, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the morning: a pale light",
        svg: `<rect width="160" height="62" fill="#DCEBF5"/><rect y="40" width="160" height="22" fill="#F4E9D2"/>`,
        keys: track({
          opacity: [
            [0.83, 0],
            [0.87, 1]
          ]
        })
      },
      { name: "hills", svg: hills("#B9A27E") },
      {
        name: "the land",
        svg: `<rect y="62" width="160" height="58" fill="#CDB68C"/>` + [[16, 76], [58, 73], [112, 77], [30, 116], [120, 116]].map(([x, y]) => tuft(x, y, "#A99468", 4)).join("")
      },
      { name: "the homes of the town", svg: homes.map((h) => home(...h)).join("") },
      {
        name: "the night over the land",
        svg: NIGHT_OVER_LAND,
        keys: track({
          opacity: [
            [0.5, 0],
            [0.53, 1],
            [0.82, 1],
            [0.86, 0]
          ]
        })
      },
      { name: "the homes at night: lit windows", svg: homes.map(([x, y, , h]) => litWindow(x, y, h)).join(""), keys: track({ opacity: [[0.53, 0], [0.55, 1], [0.84, 1], [0.86, 0]] }) },
      { name: "far off: the grey dust of an army", svg: dust(144, 58.6, 0.5), keys: track({ opacity: [[0.2, 0], [0.24, 1], [0.84, 1], [0.86, 0]] }) },
      { name: "the warner's look: a faint line to the dust", svg: lookLine(n(warner[0] - 1), n(warner[1] - 3), 144, 60, 70, "#8C7A60"), keys: showWhile(0.21, 0.24, 0.34, 0.36) },
      {
        name: "the place of the warner, running",
        svg: someone(warner[0], warner[1], 1.7),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1],
            [0.55, 1],
            [0.6, 0]
          ],
          xy: [
            [0.03, 16, -8],
            [0.08, 0, 0],
            [0.53, 0, 0],
            [0.6, -64, 1]
          ]
        })
      },
      { name: "the warner's voice: crying out", svg: arcsLeft(n(warner[0] - 3), n(warner[1] - 4.4), "#8A3A2A"), keys: showWhile(0.19, 0.195, 0.5, 0.505), loop: { move: "twinkle", ms: 500, low: 0.3 } },
      { name: "the way out by night: a dashed way", svg: way("M92 108.6 Q56 110 8 107.4", LIGHT, 0.9), keys: showFrom(0.51, 0.53) },
      ...obeyed.map(
        ([x, y], i): SignPart => ({
          name: `a place that obeyed ${i + 1}`,
          svg: someone(x, y, 1.6, "#4E3A26"),
          keys: track({
            xy: [
              [at3(0.53 + 0.006 * i), 0, 0],
              [at3(0.59 + 0.004 * i), n(safe[i][0] - x), n(safe[i][1] - y)]
            ]
          })
        })
      ),
      { name: "saved: a ring of care far off", svg: care(16, 105.4, 10, 3.6), keys: showFrom(0.58, 0.6) },
      ...denied.map(
        ([x, y], i): SignPart => ({
          name: `a place that denied ${i + 1}`,
          svg: someone(x, y, 1.6, "#4E3A26"),
          keys: track({
            opacity: [
              [0.88, 1],
              [0.9, 0]
            ]
          })
        })
      ),
      { name: "their denial: grey arcs", svg: arcs(n(denied[1][0] + 2.6), n(denied[1][1] - 4.4), "#C8C1B4"), keys: showWhile(0.67, 0.68, 0.82, 0.83), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "at morning: the grey dust sweeping over their homes",
        svg: dust(116, 102, 1.3),
        keys: track({
          opacity: [
            [0.84, 0],
            [0.86, 1]
          ],
          xy: [
            [0.84, 44, -4],
            [0.9, 0, 0]
          ]
        })
      },
      { name: "a grey shade over the homes left behind", svg: wash(116, 98, 30, 12, GREY, 0.22), keys: showFrom(0.9, 0.93) },
      { name: "a warm light among those who were saved", svg: lightIn(16, 103.4, 5), keys: showFrom(0.92, 0.95), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Like a man who came to a people", from: 0.02, to: 0.16 },
      { text: "I saw the army with my own eyes", from: 0.18, to: 0.32 },
      { text: "I am the warner: save yourselves!", from: 0.34, to: 0.48 },
      { text: "Some obeyed and left by night, and were saved", from: 0.5, to: 0.64 },
      { text: "Some denied him", from: 0.66, to: 0.8 },
      { text: "At morning the army swept them away", from: 0.82, to: 1 }
    ]
  };
}

// Sa'd, firm and kind. Mus'ab ibn Sa'd said, from his father: ayat of the Quran came down about him. Sa'd's mother swore
// that she would never speak to him until he disbelieved in his religion, nor eat nor drink. She said: you claim that
// Allah has enjoined you to be good to your parents, and I am your mother, and I command you to do this. She stayed so
// for three days, until she fainted from the strain. Then Allah sent down in the Quran this ayah: And We enjoined on
// man goodness to his parents, and: but if they strive to make you join with Me (29:8), and in it: and keep company
// with them in this world kindly (31:15) (Sahih Muslim 1748). No one is drawn: at a home in Makkah, Sa'd's place has a
// golden ring of faith about it, and the place of the one who swore is by the door. Its grey voice speaks, a grey line
// comes between them, and a grey way shows away from his faith; a dish and a cup are left untouched by it, struck out.
// Three days pass, and its place grows faint. Then a golden line of goodness goes between them; the grey way shows
// again, and fades, as the golden glow about Sa'd's place grows; and last Sa'd's place comes near, and a warm glow
// comes about them both.
function firmAndKind(): SignArt {
  const sad: [number, number] = [92, 104.4];
  const swore: [number, number] = [60, 104.2];
  return {
    kind: "firm-and-kind",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C9DCEB", "#E7D6B6", 61) },
      {
        name: "the days passing: the sky dims",
        svg: `<rect width="160" height="62" fill="#16284C"/>`,
        keys: track({
          opacity: [
            [0.45, 0],
            [0.461, 0.5],
            [0.472, 0],
            [0.483, 0.5],
            [0.494, 0],
            [0.505, 0.5],
            [0.516, 0]
          ]
        })
      },
      { name: "the dark hills of Makkah", svg: hills("#8C7A66") },
      { name: "the land", svg: land() },
      { name: "a home of Makkah", svg: home(50, 101, 26, 18, "#C9A47A", "#B28E64", "#6B4A2E") },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `three days: a day passing ${i + 1}`,
          svg: `${glow(n(66 + 14 * i), 18, 4, "#FFF0C0", 0.2)}<circle cx="${n(66 + 14 * i)}" cy="18" r="2.4" fill="#FFE07A"/>`,
          keys: showFrom(at3(0.464 + 0.022 * i), at3(0.471 + 0.022 * i))
        })
      ),
      {
        name: "Sa'd's faith: a golden ring about his place",
        svg: care(sad[0], n(sad[1] + 1.2), 5.4, 2.6),
        origin: { x: sad[0], y: n(sad[1] + 1.2) },
        keys: track({
          scale: [
            [0.76, 1],
            [0.79, 1.25]
          ],
          xy: [
            [0.87, 0, 0],
            [0.92, -16, 0]
          ]
        })
      },
      {
        name: "his faith kept: a golden glow about Sa'd's place",
        svg: wash(sad[0], n(sad[1] - 2), 8.6, 6.6, "#FFE9A8", 0.24),
        keys: track({
          opacity: [
            [0.76, 0],
            [0.79, 1]
          ],
          xy: [
            [0.87, 0, 0],
            [0.92, -16, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1800, low: 0.75 }
      },
      {
        name: "Sa'd's place",
        svg: someone(sad[0], sad[1], 1.7),
        keys: track({
          xy: [
            [0.87, 0, 0],
            [0.92, -16, 0]
          ]
        })
      },
      {
        name: "the place of the one who swore",
        svg: someone(swore[0], swore[1], 1.7),
        keys: track({
          opacity: [
            [0.49, 1],
            [0.52, 0.55],
            [0.88, 0.55],
            [0.91, 1]
          ]
        })
      },
      { name: "its voice, swearing: grey arcs", svg: arcs(n(swore[0] + 3.2), n(swore[1] - 4.2), GREY), keys: showWhile(0.03, 0.035, 0.08, 0.085), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "never to speak to him: a grey line between them", svg: `<path d="M${n(swore[0] + 4)} ${n(swore[1] - 1)} L${n(sad[0] - 4)} ${n(sad[1] - 1)}" stroke="${GREY}" stroke-width="0.7" stroke-dasharray="1.4 1.2"/>`, keys: showWhile(0.08, 0.1, 0.59, 0.6) },
      { name: "the way it asked of him: a grey way, away from his faith", svg: way(`M${n(sad[0] + 3)} ${n(sad[1] + 2)} Q124 112 150 100`, GREY, 0.9), keys: track({ opacity: [[0.17, 0], [0.2, 0.6], [0.73, 0.6], [0.74, 1], [0.77, 1], [0.79, 0]] }) },
      { name: "a dish and a cup, left untouched", svg: dish(n(swore[0] + 7), 107.4) + cover(n(swore[0] + 7), 106) + cup(n(swore[0] + 12), 107.6), keys: track({ opacity: [[0.31, 0], [0.34, 1], [0.86, 1], [0.88, 0]] }) },
      { name: "refused: a grey stroke across them", svg: struck(n(swore[0] + 9.4), 104.8, 3.6), keys: track({ opacity: [[0.35, 0], [0.37, 1], [0.86, 1], [0.88, 0]] }) },
      {
        name: "goodness, as enjoined: a golden line between them",
        svg: `<path d="M${n(swore[0] + 4)} ${n(swore[1] - 1)} L${n(sad[0] - 4)} ${n(sad[1] - 1)}" stroke="${GOLD}" stroke-width="0.8"/>`,
        origin: { x: n(swore[0] + 4), y: n(swore[1] - 1) },
        keys: track({
          opacity: [
            [0.59, 0],
            [0.62, 1]
          ],
          scaleX: [
            [0.87, 1],
            [0.92, (sad[0] - 16 - 4 - (swore[0] + 4)) / (sad[0] - 4 - (swore[0] + 4))]
          ]
        })
      },
      { name: "kindness in this world: a warm glow about them both", svg: wash(n((swore[0] + sad[0] - 16) / 2), n(swore[1] - 2), 14, 7, WARM, 0.2), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "Sa'd's mother swore never to speak to him", from: 0.02, to: 0.14 },
      { text: "Until he disbelieved in his religion", from: 0.16, to: 0.28 },
      { text: "Nor would she eat or drink", from: 0.3, to: 0.42 },
      { text: "She stayed so for three days", from: 0.44, to: 0.56 },
      { text: "And We enjoined on man goodness to his parents", from: 0.58, to: 0.7 },
      { text: "But if they strive to make you join with Me", from: 0.72, to: 0.84 },
      { text: "Keep company with them in this world kindly", from: 0.86, to: 1 }
    ]
  };
}

export const HEED_ART = {
  "loves-al-ikhlas": lovesAlIkhlas,
  "night-with-hudhayfah": nightWithHudhayfah,
  "ubayy-named": ubayyNamed,
  "six-of-shawwal": sixOfShawwal,
  "six-rights": sixRights,
  "the-warner": theWarner,
  "firm-and-kind": firmAndKind
};
