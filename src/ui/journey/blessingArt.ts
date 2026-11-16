import { cloud, glow, n, nightSky, stars, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GREY, prayerMat } from "./lovedArt";
import { GOLD, someone, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, dayAround, farOff, gardenIn, goldCoin, LIGHT, palms, sparkRising, tent, track, type At } from "./daysArt";

/**
 * Blessings and the Quran, drawn as the scenes of days with him ﷺ are (daysArt.ts): the lost necklace, and the ayah of
 * tayammum; the fever of Madinah, and his du'a for it; Thabit's good news; dearer than your own self; two ayat better
 * than two she-camels; the two bright ones on the Day; and a third of the Quran. Only the land, the sky, buildings,
 * things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, an eye
 * or a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice
 * is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a du'a or a recitation is a
 * spark that rises, and what Allah gives is a light that comes about its place. Paradise is only far off, in a soft
 * circle of light with no sun in it.
 */

/** A camel lying down, as camels kneel at a stop: its belly's middle at (x, y), facing right, `s` times its size. */
const kneelingCamel = (x: number, y: number, s = 1) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<ellipse cx="${n(x - 5 * s)}" cy="${n(y - 0.9 * s)}" rx="${n(2.6 * s)}" ry="${n(1.1 * s)}" fill="#C48A42"/>` +
    `<ellipse cx="${n(x + 5.4 * s)}" cy="${n(y - 0.9 * s)}" rx="${n(2.6 * s)}" ry="${n(1.1 * s)}" fill="#C48A42"/>` +
    `<path d="M${p(-8.6, -4.6)} Q${p(-10.6, -3.2)} ${p(-9.8, -1.4)}" stroke="#9C6A30" stroke-width="${n(0.7 * s)}" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${x}" cy="${n(y - 4.2 * s)}" rx="${n(9.2 * s)}" ry="${n(3.9 * s)}" fill="#E2AC62"/>` +
    `<path d="M${p(-5.6, -6.6)} Q${p(-1.4, -12.6)} ${p(3, -6.8)} Z" fill="#E2AC62"/>` +
    `<path d="M${p(-4.6, -7.4)} Q${p(-1.2, -10.4)} ${p(2.2, -7.4)} L${p(2.4, -6.2)} L${p(-4.8, -6.2)} Z" fill="#A4553A"/>` +
    `<path d="M${p(6.6, -6)} Q${p(10.8, -8.4)} ${p(11.2, -13.2)} L${p(13.6, -13.4)} Q${p(13.4, -7.6)} ${p(8.8, -3.2)} Z" fill="#E2AC62"/>` +
    `<ellipse cx="${n(x + 13.8 * s)}" cy="${n(y - 13.9 * s)}" rx="${n(2.9 * s)}" ry="${n(1.6 * s)}" fill="#E2AC62"/>` +
    `<path d="M${p(11.8, -15.1)} L${p(11.4, -16.4)} L${p(12.7, -15.3)} Z" fill="#C48A42"/>` +
    `<circle cx="${n(x + 14.2 * s)}" cy="${n(y - 14.4 * s)}" r="${n(0.4 * s)}" fill="#2B2B2B"/>` +
    `<path d="M${p(-8.6, -3)} Q${p(0, -0.6)} ${p(8.6, -3)} Q${p(0, 0.4)} ${p(-8.6, -3)} Z" fill="#C48A42" opacity="0.55"/>`
  );
};

/** A necklace of small beads on a thread, its middle at (x, y), `w` across. */
const necklace = (x: number, y: number, w = 6) =>
  `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y + 2.2)} ${n(x + w / 2)} ${y}" stroke="#C9A25A" stroke-width="0.35" fill="none"/>` +
  [-1, -0.66, -0.33, 0, 0.33, 0.66, 1]
    .map((k) => `<circle cx="${n(x + (k * w) / 2)}" cy="${n(y + (1 - k * k) * 1.1)}" r="0.6" fill="${k === 0 ? "#E0B84A" : "#F6EEDC"}" stroke="#C9A25A" stroke-width="0.2"/>`)
    .join("");

/** A water skin lying empty and limp, its middle at (x, y), tied at its neck on the right. */
const emptySkin = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${y} Q${n(x - 4.4)} ${n(y - 2)} ${n(x - 1.6)} ${n(y - 1.8)} Q${n(x + 1.4)} ${n(y - 2.6)} ${n(x + 3.2)} ${n(y - 1.2)} L${n(x + 4.6)} ${n(y - 1.8)} L${n(x + 4.4)} ${n(y - 0.6)} L${n(x + 3.4)} ${n(y - 0.4)} Q${n(x + 2)} ${n(y + 0.6)} ${n(x - 4)} ${y} Z" fill="#9C7A58"/>` +
  `<path d="M${n(x - 2.6)} ${n(y - 1)} Q${x} ${n(y - 0.4)} ${n(x + 2.2)} ${n(y - 1)}" stroke="#7A5A3C" stroke-width="0.3" fill="none"/>`;

/** Dry ground: a few grey cracks in the sand about (x, y). */
const cracks = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${y} L${n(x - 2)} ${n(y - 0.6)} L${n(x)} ${n(y + 0.4)} L${n(x + 3)} ${n(y - 0.4)} M${n(x - 2)} ${n(y - 0.6)} L${n(x - 2.6)} ${n(y - 1.8)} M${n(x)} ${n(y + 0.4)} L${n(x + 0.6)} ${n(y + 1.6)}" stroke="${GREY}" stroke-width="0.4" fill="none" stroke-linecap="round"/>`;

/** Dust shining about a place at (x, y), as after tayammum with clean earth. */
const dustShining = (x: number, y: number) =>
  glow(x, n(y - 0.4), 3.2, "#F3E3C0", 0.4) + sparkle(n(x + 1.8), n(y - 2.2), 0.9, "#E8C27A") + sparkle(n(x - 1.9), n(y - 1.4), 0.7, "#E8C27A");

// The lost necklace. Aishah said: we went out with the Messenger of Allah ﷺ on one of his journeys, until at al-Bayda'
// or Dhat al-Jaysh a necklace of mine was lost. The Messenger of Allah ﷺ stayed to look for it, and the people stayed
// with him, and they were not at water, and had no water with them... The Messenger of Allah ﷺ rose in the morning with
// no water; then Allah revealed the ayah of tayammum, so they did tayammum. Usayd ibn Hudayr said: this is not the
// first of your blessings, O family of Abu Bakr. She said: then we raised the camel I had been on, and found the
// necklace under it (Sahih al-Bukhari 334). No one is drawn and no rider is drawn: three camels come in across the
// desert with his golden ring and the places of those with them; the necklace falls from her camel to the sand, and the
// camel kneels over it. They stay: tents go up, and the places look about; night comes, then the morning, with the
// water skins empty and the sand dry. A soft golden light comes on the clean earth, and dust shines about each place;
// Usayd's voice speaks, and a warm glow comes about her place. Her camel rises and steps aside, and the necklace shines
// where it lay.
function lostNecklace(): SignArt {
  const his: [number, number] = [52, 105];
  const hers: [number, number] = [96, 106.4];
  const kneel: [number, number] = [80, 102.6];
  const others: [number, number][] = [
    [66, 107.2],
    [110, 107.4],
    [126, 106],
    [140, 104.6]
  ];
  // Each place looks about the camp for the necklace, and comes back to where it stopped.
  const looks: [number, number][][] = [
    [
      [-6, -1.6],
      [4, -2.4],
      [-2, 0.4]
    ],
    [
      [6, -2],
      [-4, -3.2],
      [3, 0.2]
    ],
    [
      [-8, 0.4],
      [2, -2.8],
      [-3, -1]
    ],
    [
      [6, 1.2],
      [-5, 1.6],
      [2, -1.4]
    ]
  ];
  const walkIn: At[] = [
    [0.02, -150, 0],
    [0.09, 0, 0]
  ];
  const lookAbout = (i: number): At[] => [
    ...walkIn,
    [0.29, 0, 0],
    [0.31, looks[i][0][0], looks[i][0][1]],
    [0.33, looks[i][1][0], looks[i][1][1]],
    [0.35, looks[i][2][0], looks[i][2][1]],
    [0.37, 0, 0]
  ];
  return {
    kind: "lost-necklace",
    ms: 12000,
    parts: [
      ...dayAround([136, 18], 12000),
      { name: "they stayed: tents", svg: tent(16, 99, 15, 10) + tent(150, 98, 13, 9), keys: showFrom(0.295, 0.32) },
      { name: "no water: the skins lie empty", svg: emptySkin(26, 106.6) + emptySkin(136, 108.4), keys: showFrom(0.46, 0.48) },
      { name: "no water: the sand is dry", svg: cracks(36, 109) + cracks(120, 110.4), keys: showFrom(0.47, 0.49) },
      { name: "her necklace, lost", svg: necklace(kneel[0], 100.4), keys: track({ opacity: [[0.15, 0], [0.155, 1]], xy: [[0.15, 0, -7], [0.17, 0, 0]] }) },
      { name: "a camel, in front", svg: camel(38, 101, 0.26), keys: track({ xy: walkIn }), loop: { move: "bob", ms: 2600, y: 0.4 } },
      { name: "a camel, behind", svg: camel(120, 100.4, 0.24), keys: track({ xy: walkIn }), loop: { move: "bob", ms: 2800, y: 0.4, phase: 0.5 } },
      {
        name: "her camel, walking, then rising",
        svg: camel(kneel[0], 101, 0.26),
        keys: track({
          opacity: [
            [0.18, 1],
            [0.2, 0],
            [0.86, 0],
            [0.875, 1]
          ],
          xy: [...walkIn, [0.875, 0, 0], [0.93, 14, 0]]
        }),
        loop: { move: "bob", ms: 2700, y: 0.4, phase: 0.25 }
      },
      { name: "her camel, kneeling over it", svg: kneelingCamel(kneel[0], kneel[1], 0.95), keys: track({ opacity: [[0.18, 0], [0.2, 1], [0.86, 1], [0.875, 0]] }) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD), keys: track({ xy: walkIn }) },
      { name: "her place", svg: someone(hers[0], hers[1], 1.5), keys: track({ xy: walkIn }) },
      ...others.map(([x, y], i): SignPart => ({ name: `a place, with him ${i + 1}`, svg: someone(x, y, 1.5), keys: track({ xy: lookAbout(i) }) })),
      { name: "night", svg: `<rect width="160" height="120" fill="#0F1C3A"/>`, keys: track({ opacity: [[0.345, 0], [0.37, 0.62], [0.44, 0.62], [0.49, 0]] }) },
      { name: "the night sky, dark through", svg: `<rect width="160" height="47" fill="#0F1C3A"/>`, keys: track({ opacity: [[0.345, 0], [0.37, 1], [0.44, 1], [0.49, 0]] }) },
      {
        name: "the stars of the night",
        svg: stars([
          [12, 12],
          [34, 22],
          [58, 10],
          [84, 18],
          [108, 9],
          [130, 20],
          [152, 12],
          [70, 30]
        ]),
        keys: track({ opacity: [[0.345, 0], [0.37, 1], [0.44, 1], [0.47, 0]] }),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "the morning, low over the hills", svg: `<rect y="44" width="160" height="18" fill="#F0BF8E"/>`, keys: track({ opacity: [[0.44, 0], [0.46, 0.5], [0.475, 0.5], [0.5, 0]] }) },
      { name: "the ayah of tayammum: a soft golden light on the clean earth", svg: wash(84, 107, 76, 6, WARM, 0.2), keys: showFrom(0.58, 0.61), loop: { move: "twinkle", ms: 2000, low: 0.75 } },
      ...[his, hers, ...others].map(([x, y], i): SignPart => ({ name: `tayammum: dust shining about a place ${i + 1}`, svg: dustShining(x, y), keys: showFrom(at3(0.615 + i * 0.004), at3(0.625 + i * 0.004)), loop: { move: "twinkle", ms: 1400, low: 0.6, phase: i / 6 } })),
      { name: "Usayd's voice: not your first blessing", svg: arcsLeft(n(others[2][0] - 2.6), n(others[2][1] - 4), VOICE), keys: showWhile(0.71, 0.72, 0.85, 0.86), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a blessing: a warm glow about her place", svg: glow(hers[0], hers[1], 6, WARM, 0.4) + care(hers[0], hers[1], 6, 3), keys: showFrom(0.73, 0.77), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "found under it: the necklace shining", svg: glow(kneel[0], 101.2, 5, "#FFF3C0", 0.5) + sparkle(83, 98.8, 1.2, "#FFE7A0"), keys: showFrom(0.9, 0.93), loop: { move: "twinkle", ms: 1300, low: 0.6 } }
    ],
    words: [
      { text: "We went out with him on one of his journeys", from: 0.02, to: 0.13 },
      { text: "At al-Bayda', a necklace of mine was lost", from: 0.15, to: 0.27 },
      { text: "He stayed to look for it, and the people with him", from: 0.29, to: 0.41 },
      { text: "Morning came, and there was no water", from: 0.43, to: 0.55 },
      { text: "Then Allah revealed the ayah of tayammum", from: 0.57, to: 0.69 },
      { text: "Not your first blessing, family of Abu Bakr", from: 0.71, to: 0.83 },
      { text: "We raised the camel: the necklace was under it", from: 0.85, to: 1 }
    ]
  };
}

/** The grey haze of a fever over a home, about (x, y): a dull wash and wavy lines rising. */
const fever = (x: number, y: number) =>
  wash(x, y, 10, 7, GREY, 0.18) +
  [-4, 0, 4]
    .map((dx) => `<path d="M${n(x + dx)} ${n(y - 2)} q1.2 -1.4 0 -2.8 q-1.2 -1.4 0 -2.8" stroke="${GREY}" stroke-width="0.5" fill="none" stroke-linecap="round" opacity="0.8"/>`)
    .join("");

/** Far off, a valley of Makkah in a soft window, about (x, y): its dark hills, its floor and idhkhir grass about it. */
const makkahValley = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FFF8E6" opacity="0.92" stroke="#E8D8B0" stroke-width="0.6"/>` +
  `<path d="M${n(x - rx * 0.9)} ${n(y + ry * 0.25)} L${n(x - rx * 0.45)} ${n(y - ry * 0.35)} L${n(x - rx * 0.1)} ${n(y + ry * 0.2)} L${n(x + rx * 0.3)} ${n(y - ry * 0.45)} L${n(x + rx * 0.9)} ${n(y + ry * 0.25)} Z" fill="#A88E66" opacity="0.85"/>` +
  `<path d="M${n(x - rx * 0.92)} ${n(y + ry * 0.3)} Q${x} ${n(y + ry * 0.05)} ${n(x + rx * 0.92)} ${n(y + ry * 0.3)} Q${x} ${n(y + ry * 0.95)} ${n(x - rx * 0.92)} ${n(y + ry * 0.3)} Z" fill="#D9C08E"/>` +
  [-0.55, -0.3, -0.05, 0.2, 0.45]
    .map((k, i) => tuft(n(x + rx * k), n(y + ry * (0.5 + (i % 2) * 0.12)), i % 2 ? "#9DBE62" : "#86A94E", 2.6))
    .join("");

/** A wooden measure for grain, its foot's middle at (x, y), `w` across its rim and `h` high. */
const measure = (x: number, y: number, w: number, h: number) =>
  `<path d="M${n(x - w / 2)} ${n(y - h)} L${n(x + w / 2)} ${n(y - h)} L${n(x + w * 0.38)} ${y} L${n(x - w * 0.38)} ${y} Z" fill="#9A6B3E"/>` +
  `<ellipse cx="${x}" cy="${n(y - h)}" rx="${n(w / 2)}" ry="${n(w * 0.12)}" fill="#7A5230"/>` +
  `<path d="M${n(x - w * 0.43)} ${n(y - h * 0.5)} L${n(x + w * 0.43)} ${n(y - h * 0.5)}" stroke="#7A5230" stroke-width="0.3"/>`;

/** Grain heaped on a measure, its rim's middle at (x, y), `w` across. */
const grainOn = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - w * 0.62)} ${n(x + w / 2)} ${y} Z" fill="#E2C374"/>` +
  [-0.22, 0, 0.2, -0.08, 0.1]
    .map((k, i) => `<ellipse cx="${n(x + w * k)}" cy="${n(y - w * (0.08 + (i % 3) * 0.06))}" rx="0.5" ry="0.3" fill="#C9A24A"/>`)
    .join("");

// Make Madinah dear to us. Aishah said: when the Messenger of Allah ﷺ came to Madinah, Abu Bakr and Bilal fell ill. I
// went in to them and said: how do you find yourself? ... When the fever left Bilal, he would raise his voice and say:
// would that I knew whether I will spend a night in a valley, with idhkhir and jalil around me... I came to the
// Messenger of Allah ﷺ and told him, and he said: O Allah, make Madinah dear to us as we love Makkah, or more; and make
// it healthy, and bless us in its sa' and its mudd, and move its fever and put it in al-Juhfah (Sahih al-Bukhari
// 3926). No one is drawn: by the masjid his place is a golden ring; a grey haze of fever lies over the homes of Abu
// Bakr and Bilal. Her place goes to them along the way, and her voice asks; Bilal's voice answers, and far off a valley
// of Makkah shows with its idhkhir. Her place comes back and tells him; his voice makes du'a, a spark rises, a soft
// light comes on far Makkah and a greater one over Madinah. A sa' and a mudd fill with grain, with a glow, and the grey
// haze goes away to al-Juhfah, far off, and a warm glow comes on the homes.
function loveMadinah(): SignArt {
  const his: [number, number] = [30, 105];
  const hers: [number, number] = [42, 106.6];
  const abuBakr: [number, number] = [96, 105.4];
  const bilal: [number, number] = [134, 104.8];
  const toThem: At[] = [
    [0.15, 0, 0],
    [0.21, 46, -1.4],
    [0.43, 46, -1.4],
    [0.5, 0, 0]
  ];
  const away = (x: number, y: number): SignPart => ({
    name: x < 110 ? "fever: a grey haze over Abu Bakr's home" : "fever: a grey haze over Bilal's home",
    svg: fever(x, y),
    keys: track({
      opacity: [
        [0.03, 0],
        [0.07, 1],
        [0.9, 1],
        [0.94, 0]
      ],
      xy: [
        [0.86, 0, 0],
        [0.94, 40, -8]
      ]
    }),
    loop: { move: "twinkle", ms: 1700, low: 0.6 }
  });
  return {
    kind: "love-madinah",
    ms: 12000,
    parts: [
      ...dayAround([22, 18], 12000),
      { name: "al-Juhfah, far off on the hills", svg: `<path d="M140 64 Q150 59 160 62 L160 66 L140 66 Z" fill="#B8A27A" opacity="0.8"/>` + glow(152, 62.6, 3, GREY, 0.18), keys: showFrom(0.86, 0.88) },
      ...palms([
        [70, 98, 13],
        [114, 97, 14],
        [152, 99, 13]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 101, 0.85) },
      { name: "Abu Bakr's home", svg: home(92, 100, 13, 9) },
      { name: "Bilal's home", svg: home(130, 99.4, 12, 8.6) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Bakr's place, ill", svg: someone(abuBakr[0], abuBakr[1], 1.5) },
      { name: "Bilal's place, ill", svg: someone(bilal[0], bilal[1], 1.5) },
      away(93, 97.6),
      away(131, 97.2),
      { name: "the way to their homes", svg: way("M46 107 Q68 109 88 105.6", "#FFF0C4", 1), keys: showFrom(0.15, 0.17) },
      { name: "her place, going to them and back", svg: someone(hers[0], hers[1], 1.5), keys: track({ xy: toThem }) },
      { name: "her voice: how do you find yourself?", svg: arcs(n(hers[0] + 46 + 2.4), n(hers[1] - 1.4 - 3.6), VOICE), keys: showWhile(0.215, 0.225, 0.29, 0.295), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Bilal's voice, raised", svg: arcsLeft(n(bilal[0] - 2.6), n(bilal[1] - 4), VOICE), keys: showWhile(0.29, 0.3, 0.43, 0.435), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a valley of Makkah, far off, with its idhkhir", svg: makkahValley(118, 36, 24, 13), keys: showFrom(0.3, 0.34) },
      { name: "her voice: telling him", svg: arcsLeft(n(hers[0] - 2.6), n(hers[1] - 4), VOICE), keys: showWhile(0.5, 0.51, 0.57, 0.575), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: his du'a", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.57, 0.58), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "his du'a: a spark rising", svg: sparkle(his[0], n(his[1] - 7), 1.8, "#FFE7A0"), keys: sparkRising(0.58, 0.64, 12) },
      { name: "Makkah dear to them: a soft light on it", svg: glow(118, 37, 11, WARM, 0.22), keys: showFrom(0.59, 0.61), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "or more: a greater light over Madinah", svg: wash(84, 100, 74, 13, WARM, 0.2), keys: showFrom(0.61, 0.65), loop: { move: "twinkle", ms: 2000, low: 0.75 } },
      { name: "its sa': a measure", svg: measure(108, 108, 7, 3.6), keys: showFrom(0.71, 0.72) },
      { name: "its mudd: a smaller measure", svg: measure(118, 108, 4.6, 2.6), keys: showFrom(0.71, 0.72) },
      { name: "blessed: grain heaped on the sa'", svg: grainOn(108, 104.4, 7), origin: { x: 108, y: 104.4 }, keys: track({ opacity: [[0.72, 0], [0.725, 1]], scaleY: [[0.72, 0.1], [0.76, 1]] }) },
      { name: "blessed: grain heaped on the mudd", svg: grainOn(118, 105.4, 4.6), origin: { x: 118, y: 105.4 }, keys: track({ opacity: [[0.72, 0], [0.725, 1]], scaleY: [[0.72, 0.1], [0.76, 1]] }) },
      { name: "the blessing: a glow on the measures", svg: glow(113, 105, 7, WARM, 0.32), keys: showFrom(0.765, 0.79), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "healthy: a warm glow on the homes", svg: glow(abuBakr[0], n(abuBakr[1] - 1), 5, WARM, 0.4) + glow(bilal[0], n(bilal[1] - 1), 5, WARM, 0.4), keys: showFrom(0.92, 0.95), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "In Madinah, Abu Bakr and Bilal fell ill", from: 0.02, to: 0.13 },
      { text: "I went in to them: how do you find yourself?", from: 0.15, to: 0.27 },
      { text: "Bilal: will I spend a night in a valley of idhkhir?", from: 0.29, to: 0.41 },
      { text: "Aishah: I came to him and told him", from: 0.43, to: 0.55 },
      { text: "Make us love Madinah as Makkah, or more", from: 0.57, to: 0.69 },
      { text: "Make it healthy, and bless its sa' and its mudd", from: 0.71, to: 0.83 },
      { text: "And move its fever to al-Juhfah", from: 0.85, to: 1 }
    ]
  };
}

// Thabit's good news. Anas ibn Malik said: the Prophet ﷺ missed Thabit ibn Qays, and a man said: O Messenger of
// Allah, I will find out about him for you. He went to him and found him sitting in his house, his head lowered, and
// said: what is the matter with you? He said: bad; he used to raise his voice above the voice of the Prophet ﷺ, so his
// deeds have come to nothing, and he is of the people of the Fire. The man came and told him that he said such and
// such; then he went back to him the second time with great good news: go to him and say to him: you are not of the
// people of the Fire, but you are of the people of Paradise (Sahih al-Bukhari 3613, 4846). No one is drawn: by the
// masjid his place is a golden ring, with places sitting in a row, and one spot in it empty; a ring of care comes about
// it. A place goes along the way to Thabit's home, where his place sits low under a grey shade, with small lights of
// his deeds by it. His voice speaks, grey; the lights of his deeds fade and the shade deepens. The place goes back and
// tells; his voice speaks, and the place goes again with a golden spark of good news. The grey goes, Thabit's place
// rises, a warm glow comes about it, and far off a soft circle of light shows, with a garden in it.
function thabitGoodNews(): SignArt {
  const his: [number, number] = [30, 104.8];
  const row: [number, number][] = [
    [42, 107],
    [50, 107.4],
    [58, 107.4]
  ];
  const man: [number, number] = [66, 107];
  const empty: [number, number] = [74, 106.6];
  const thabit: [number, number] = [124, 105.6];
  const goes: At[] = [
    [0.15, 0, 0],
    [0.215, 52, -1.8],
    [0.57, 52, -1.8],
    [0.63, 0, 0],
    [0.72, 0, 0],
    [0.785, 52, -1.8]
  ];
  const deeds: [number, number][] = [
    [133, 102.4],
    [137, 100.6],
    [141, 102.6]
  ];
  return {
    kind: "thabit-good-news",
    ms: 12000,
    parts: [
      ...dayAround([26, 16], 12000),
      ...palms([
        [86, 98, 13],
        [156, 99, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 101, 0.85) },
      { name: "Thabit's home", svg: home(128, 99.6, 15, 9.6) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "places sitting by the masjid", svg: row.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "Thabit's spot, empty", svg: someone(empty[0], empty[1], 1.4, GREY), keys: showFrom(0.02, 0.03) },
      { name: "he missed him: a ring of care about the empty spot", svg: care(empty[0], empty[1], 3.6, 1.9), keys: showFrom(0.03, 0.06), loop: { move: "twinkle", ms: 1400, low: 0.5 } },
      { name: "the way to Thabit's home", svg: way("M70 108 Q96 110.6 116 106", "#FFF0C4", 1), keys: showFrom(0.15, 0.17) },
      { name: "a grey shade over Thabit", svg: wash(thabit[0], n(thabit[1] - 1.4), 8, 5, GREY, 0.22), keys: track({ opacity: [[0.02, 0], [0.04, 1], [0.86, 1], [0.89, 0]] }) },
      { name: "the shade deepening", svg: wash(thabit[0], n(thabit[1] - 1.4), 6, 4, GREY, 0.2), keys: track({ opacity: [[0.44, 0], [0.48, 1], [0.86, 1], [0.89, 0]] }) },
      ...deeds.map(([x, y], i): SignPart => ({
        name: `his deeds: a small light ${i + 1}`,
        svg: glow(x, y, 2.4, WARM, 0.4) + sparkle(x, y, 0.8, "#E8A93A"),
        keys: track({ opacity: [[0.02, 0], [0.04, 1], [at3(0.44 + i * 0.01), 1], [at3(0.47 + i * 0.01), 0]] })
      })),
      { name: "Thabit's place, sitting low", svg: someone(thabit[0], thabit[1], 1.6), keys: track({ xy: [[0.86, 0, 0], [0.89, 0, -1.6]] }) },
      { name: "the place that went to him", svg: someone(man[0], man[1], 1.4), keys: track({ xy: goes }) },
      { name: "Thabit's voice: bad", svg: arcsLeft(n(thabit[0] - 2.8), n(thabit[1] - 4), GREY), keys: showWhile(0.29, 0.3, 0.57, 0.575), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "its voice: telling him", svg: arcsLeft(n(man[0] - 2.6), n(man[1] - 4), VOICE), keys: showWhile(0.635, 0.645, 0.71, 0.715), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: go to him and say", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.71, 0.72, 0.85, 0.855), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "great good news: a golden spark going with it",
        svg: sparkle(man[0], n(man[1] - 4.4), 1.4, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.725, 1],
            [0.88, 1],
            [0.9, 0]
          ],
          xy: [
            [0.72, 0, 0],
            [0.785, 52, -1.8]
          ]
        }),
        loop: { move: "twinkle", ms: 800, low: 0.6 }
      },
      { name: "of Paradise: a warm glow about Thabit's place", svg: glow(thabit[0], n(thabit[1] - 1.6), 6, WARM, 0.42) + care(thabit[0], n(thabit[1] - 1.6), 5.4, 2.7), keys: showFrom(0.89, 0.92), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "Paradise far off: a soft circle of light", svg: farOff(134, 32, 13) + gardenIn(134, 32, 13), keys: showFrom(0.9, 0.95) }
    ],
    words: [
      { text: "He missed Thabit ibn Qays", from: 0.02, to: 0.13 },
      { text: "A man found him at home, his head lowered", from: 0.15, to: 0.27 },
      { text: "Bad: he raised his voice above the Prophet's", from: 0.29, to: 0.41 },
      { text: "So his deeds are lost, and he is of the Fire", from: 0.43, to: 0.55 },
      { text: "The man came back and told him", from: 0.57, to: 0.69 },
      { text: "Go to him and say: you are not of the Fire", from: 0.71, to: 0.83 },
      { text: "But you are of the people of Paradise", from: 0.85, to: 1 }
    ]
  };
}

// Dearer than your own self. Abdullah ibn Hisham said: we were with the Prophet ﷺ, and he was holding the hand of Umar
// ibn al-Khattab. Umar said to him: O Messenger of Allah, you are dearer to me than everything except my own self. The
// Prophet ﷺ said: no, by the One in whose hand is my soul, not until I am dearer to you than your own self. Umar said:
// then now, by Allah, you are dearer to me than my own self. The Prophet ﷺ said: now, O Umar (Sahih al-Bukhari 6632).
// And he said: none of you believes until I am dearer to him than his father, his child and all the people (Sahih
// al-Bukhari 15). No one is drawn and no hand is drawn: his place is a golden ring, Umar's place is by it, and a soft
// golden band joins them. Above, a soft circle shows what Umar holds dear: a home, a palm, coins and a camel on its
// outer ring, and his own self in its middle. The golden light of his love for him comes inside the outer ring but
// stays outside his self; then it comes to the very middle, and his self moves out; a full golden glow comes. Then the
// things go, and places of all the believers come on the land; on the outer ring come an elder's place, a young place
// and many places, and the golden light in the middle glows.
function dearerThanYourself(): SignArt {
  const his: [number, number] = [44, 105];
  const umar: [number, number] = [58, 105.6];
  const mid: [number, number] = [112, 40];
  const rim = 20;
  const at = (angle: number, r = rim): [number, number] => [n(mid[0] + r * Math.cos((angle * Math.PI) / 180)), n(mid[1] + r * Math.sin((angle * Math.PI) / 180))];
  const homeAt = at(-90);
  const palmAt = at(180);
  const coinsAt = at(0);
  const camelAt = at(90);
  const onLand: [number, number][] = [
    [74, 106.4],
    [84, 107.2],
    [94, 106.2],
    [104, 107.2],
    [114, 106],
    [124, 107],
    [134, 105.8],
    [144, 106.8]
  ];
  const all = [20, 45, 70, 110, 135, 160, 200, 225, 250, 290, 315, 340].map((angle) => at(angle));
  const things = (from: number, to: number) => track({ opacity: [[from, 0], [to, 1], [0.71, 1], [0.73, 0]] });
  return {
    kind: "dearer-than-yourself",
    ms: 12000,
    parts: [
      ...dayAround([20, 16], 12000),
      ...palms([
        [10, 99, 13],
        [152, 100, 14]
      ]),
      { name: "homes of Madinah", svg: home(82, 99.4, 12, 8.4) + home(126, 99, 13, 9) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6) },
      { name: "with him: a soft golden band between them", svg: `<path d="M${n(his[0] + 2.8)} ${n(his[1] - 0.6)} Q${n((his[0] + umar[0]) / 2)} ${n(his[1] - 2.6)} ${n(umar[0] - 2)} ${n(umar[1] - 0.6)}" stroke="${GOLD}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`, keys: showFrom(0.03, 0.06) },
      { name: "what Umar holds dear: a soft circle", svg: `<circle cx="${mid[0]}" cy="${mid[1]}" r="26" fill="#FFF8E6" opacity="0.9" stroke="#E8D8B0" stroke-width="0.6"/>`, keys: showFrom(0.16, 0.19) },
      { name: "its outer ring", svg: `<circle cx="${mid[0]}" cy="${mid[1]}" r="${rim}" stroke="#C9B38C" stroke-width="0.6" stroke-dasharray="1.6 1.4" fill="none"/>`, keys: showFrom(0.16, 0.19) },
      { name: "its inner ring", svg: `<circle cx="${mid[0]}" cy="${mid[1]}" r="7.5" stroke="#C9B38C" stroke-width="0.5" stroke-dasharray="1.2 1.1" fill="none"/>`, keys: showFrom(0.16, 0.19) },
      { name: "a home he holds dear", svg: home(homeAt[0], n(homeAt[1] + 2.4), 6.4, 4.6), keys: things(0.16, 0.19) },
      { name: "a palm he holds dear", svg: palms([[palmAt[0], n(palmAt[1] + 4), 8]])[0].svg, keys: things(0.165, 0.195) },
      { name: "coins he holds dear", svg: goldCoin(n(coinsAt[0] - 1.6), coinsAt[1], 1.3) + goldCoin(n(coinsAt[0] + 1.4), n(coinsAt[1] - 0.6), 1.3) + goldCoin(coinsAt[0], n(coinsAt[1] + 1.6), 1.3), keys: things(0.17, 0.2) },
      { name: "a camel he holds dear", svg: camel(camelAt[0], n(camelAt[1] + 3.4), 0.11), keys: things(0.175, 0.205) },
      { name: "his own self, in the middle", svg: someone(mid[0], mid[1], 2.2), keys: track({ opacity: [[0.16, 0], [0.19, 1]], xy: [[0.45, 0, 0], [0.5, 13.5, 0]] }) },
      {
        name: "the golden light of his love for him",
        svg: glow(n(mid[0] - 13.5), mid[1], 4.6, "#FFE07A", 0.42) + ring(n(mid[0] - 13.5), mid[1], 2.2, GOLD),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.2, 1]
          ],
          xy: [
            [0.19, -16, 0],
            [0.23, 0, 0],
            [0.45, 0, 0],
            [0.5, 13.5, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.75 }
      },
      { name: "not until: a dashed way to the middle", svg: way(`M${n(mid[0] - 10.6)} ${mid[1]} L${n(mid[0] - 3.4)} ${mid[1]}`, GOLD, 0.7), keys: showWhile(0.31, 0.33, 0.43, 0.435) },
      {
        name: "Umar's voice",
        svg: arcs(n(umar[0] + 2.4), n(umar[1] - 3.6), VOICE),
        keys: track({ opacity: [[0.15, 0], [0.16, 1], [0.29, 1], [0.295, 0], [0.43, 0], [0.44, 1], [0.57, 1], [0.575, 0]] }),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      {
        name: "his voice",
        svg: arcsLeft(n(his[0] - 2.6), n(his[1] - 4.6), VOICE),
        keys: track({ opacity: [[0.29, 0], [0.3, 1], [0.43, 1], [0.435, 0], [0.57, 0], [0.58, 1]] }),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      { name: "now: a full golden glow about Umar's place", svg: glow(umar[0], umar[1], 6, "#FFE07A", 0.42) + care(umar[0], umar[1], 5.6, 2.8), keys: showFrom(0.58, 0.63), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "now: the middle glowing", svg: glow(mid[0], mid[1], 7, "#FFE07A", 0.34), keys: showFrom(0.59, 0.63), loop: { move: "twinkle", ms: 1700, low: 0.75 } },
      ...onLand.map(([x, y], i): SignPart => ({ name: `none of you: a place on the land ${i + 1}`, svg: someone(x, y, 1.3), keys: showFrom(at3(0.72 + i * 0.004), at3(0.73 + i * 0.004)) })),
      { name: "an elder's place on the outer ring", svg: someone(homeAt[0], homeAt[1], 2), keys: showFrom(0.86, 0.87) },
      { name: "a young place on the outer ring", svg: someone(palmAt[0], palmAt[1], 1.2), keys: showFrom(0.87, 0.88) },
      ...all.map(([x, y], i): SignPart => ({ name: `all on the outer ring: a place ${i + 1}`, svg: someone(x, y, 1), keys: showFrom(at3(0.88 + i * 0.002), at3(0.885 + i * 0.002)) })),
      { name: "dearer than all: the middle glowing more", svg: glow(mid[0], mid[1], 10, "#FFE07A", 0.26), keys: showFrom(0.91, 0.94), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      ...onLand.map(([x, y], i): SignPart => ({ name: `his faith: a warm glow on a place ${i + 1}`, svg: glow(x, y, 3, WARM, 0.36), keys: showFrom(at3(0.92 + i * 0.003), at3(0.93 + i * 0.003)), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 8 } }))
    ],
    words: [
      { text: "We were with him, and he held Umar's hand", from: 0.02, to: 0.13 },
      { text: "Umar: you are dearer to me than all but myself", from: 0.15, to: 0.27 },
      { text: "No, until I am dearer to you than your own self", from: 0.29, to: 0.41 },
      { text: "Umar: now, by Allah, you are dearer than myself", from: 0.43, to: 0.55 },
      { text: "He said: now, O Umar", from: 0.57, to: 0.69 },
      { text: "None of you believes until I am dearer to him", from: 0.71, to: 0.83 },
      { text: "Than his father, his child, and all the people", from: 0.85, to: 1 }
    ]
  };
}

/** The Suffah: a shade of palm leaves on posts by the masjid, from x `from` to `to`, its roof at y `top`. */
const suffah = (from: number, to: number, top: number, ground: number) =>
  `<path d="M${n(from - 1)} ${top} L${n(to + 1)} ${top} L${n(to)} ${n(top - 2.4)} L${from} ${n(top - 2.4)} Z" fill="#7E9A48"/>` +
  `<path d="M${from} ${n(top - 1.2)} L${to} ${n(top - 1.2)}" stroke="#5E7A30" stroke-width="0.5"/>` +
  [from + 1, (from + to) / 2, to - 1].map((x) => `<rect x="${n(x - 0.6)}" y="${top}" width="1.2" height="${n(ground - top)}" fill="#8A6A42"/>`).join("");

/** Two valleys far off, Buthan and al-Aqiq: dips in the far hills, green along their floors. */
const valleys = () =>
  `<path d="M104 66 Q112 58 120 63 Q126 66 132 61 Q140 56 148 62 Q154 65 160 61 L160 68 L104 68 Z" fill="#BFA77E"/>` +
  `<path d="M110 66.4 Q118 64.6 126 66.2" stroke="#7FAE57" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
  `<path d="M136 66.6 Q144 64.6 154 66.4" stroke="#7FAE57" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;

// Better than she-camels. Uqbah ibn Amir said: the Messenger of Allah ﷺ came out while we were in the Suffah, and said:
// which of you would like to go out every morning to Buthan or al-Aqiq, and come back with two big she-camels, with no
// sin and without cutting the ties of kinship? We said: O Messenger of Allah, we would love that. He said: does one of
// you not go out in the morning to the masjid and learn or recite two ayat of the Book of Allah? That is better for him
// than two she-camels, and three better than three, and four better than four, and so on of camels (Sahih Muslim
// 803). No one is drawn: by the masjid of Madinah, places sit under the Suffah's shade; his golden ring comes out. His
// voice speaks; a way shows to the two valleys far off, and two big she-camels come along it from far away, growing as
// they come. The places' voices answer. His voice speaks again; a place goes into the masjid, and two golden lights of
// two ayat rise over it; they glow brighter and the camels grow faint beside them. A third light, a third camel; a
// fourth light, a fourth camel.
function betterThanCamels(): SignArt {
  const his: [number, number] = [24, 104.8];
  const sitting: [number, number][] = [
    [34, 105.8],
    [41, 106.4],
    [48, 106.4],
    [55, 105.8]
  ];
  const lights: [number, number][] = [
    [12, 76],
    [22, 74],
    [32, 76],
    [42, 74]
  ];
  // Each she-camel's feet, and where it comes from: the valleys far off.
  const camels: [number, number, number, number][] = [
    [100, 101, 26, -32],
    [122, 100.4, 22, -32],
    [142, 102.6, 4, -35],
    [112, 106.4, 16, -38]
  ];
  const comes = (i: number, from: number, to: number) => {
    const [, , dx, dy] = camels[i];
    return track({
      // The first two grow faint beside the two ayat; the third and fourth come in faint already, beside their lights.
      opacity:
        i < 2
          ? [
              [from, 0],
              [at3(from + 0.01), 1],
              [0.72, 1],
              [0.76, 0.55]
            ]
          : [
              [from, 0],
              [at3(from + 0.01), 0.55]
            ],
      xy: [
        [from, dx, dy],
        [to, 0, 0]
      ],
      scale: [
        [from, 0.3],
        [to, 1]
      ]
    });
  };
  return {
    kind: "better-than-camels",
    ms: 12000,
    parts: [
      ...dayAround([18, 20], 12000),
      { name: "Buthan and al-Aqiq: two valleys far off", svg: valleys() },
      { name: "the valleys, lit far off", svg: glow(118, 64, 8, WARM, 0.2) + glow(145, 64, 8, WARM, 0.2), keys: showFrom(0.17, 0.2) },
      ...palms([
        [70, 99, 13],
        [154, 99, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(0, 101, 0.75) },
      { name: "the Suffah: a shade by the masjid", svg: suffah(30, 59, 94, 101) },
      ...sitting.map(([x, y], i): SignPart => ({
        name: `a place under the Suffah ${i + 1}`,
        svg: someone(x, y, 1.4),
        keys: i === 3 ? track({ xy: [[0.58, 0, 0], [0.62, -36, -1.6]] }) : undefined
      })),
      { name: "a golden ring, his place, coming out", svg: ring(his[0], his[1], 2.6, GOLD), keys: track({ opacity: [[0.03, 0], [0.04, 1]], xy: [[0.03, -6, 0], [0.08, 0, 0]] }) },
      { name: "the way to the valleys", svg: way("M62 104 Q96 98 116 70", "#FFF0C4", 1), keys: showFrom(0.16, 0.19) },
      ...camels.map(([x, y], i): SignPart => ({
        name: `a big she-camel ${i + 1}`,
        svg: camel(x, y, 0.27, i % 2 === 1),
        origin: { x, y },
        keys: i < 2 ? comes(i, at3(0.29 + i * 0.01), at3(0.36 + i * 0.01)) : comes(i, i === 2 ? 0.86 : 0.9, i === 2 ? 0.91 : 0.95),
        loop: { move: "bob", ms: 2600 + i * 200, y: 0.4, phase: i / 4 }
      })),
      {
        name: "his voice",
        svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE),
        keys: track({ opacity: [[0.15, 0], [0.16, 1], [0.43, 1], [0.435, 0], [0.57, 0], [0.58, 1]] }),
        loop: { move: "twinkle", ms: 1000, low: 0.5 }
      },
      ...sitting.map(([x, y], i): SignPart => ({ name: `we would love that: a voice ${i + 1}`, svg: arcs(n(x + 1.8), n(y - 3.4), VOICE), keys: showWhile(at3(0.43 + i * 0.004), at3(0.44 + i * 0.004), 0.57, 0.575), loop: { move: "twinkle", ms: 900, low: 0.5, phase: i / 4 } })),
      ...lights.map(([x, y], i): SignPart => {
        const from = i < 2 ? at3(0.62 + i * 0.01) : i === 2 ? 0.86 : 0.9;
        return {
          name: `an ayah learned: a golden light ${i + 1}`,
          svg: glow(x, y, 3.6, "#FFE07A", 0.45) + sparkle(x, y, 1.5, "#E8A93A"),
          keys: track({ opacity: [[from, 0], [at3(from + 0.005), 1]], xy: [[from, 0, 8], [at3(from + 0.025), 0, 0]] }),
          loop: { move: "twinkle", ms: 1400, low: 0.7, phase: i / 4 }
        };
      }),
      { name: "better: the two lights glowing brighter", svg: glow(17, 75, 11, "#FFE07A", 0.26), keys: showFrom(0.72, 0.76), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "better still: all the lights glowing", svg: glow(27, 75, 16, "#FFE07A", 0.2), keys: showFrom(0.93, 0.96), loop: { move: "twinkle", ms: 1700, low: 0.75 } }
    ],
    words: [
      { text: "He came out while we were in the Suffah", from: 0.02, to: 0.13 },
      { text: "Who would go each day to Buthan or al-Aqiq", from: 0.15, to: 0.27 },
      { text: "And bring two big she-camels, with no sin?", from: 0.29, to: 0.41 },
      { text: "We said: we would love that", from: 0.43, to: 0.55 },
      { text: "Why not go and learn two ayat in the masjid?", from: 0.57, to: 0.69 },
      { text: "That is better for him than two she-camels", from: 0.71, to: 0.83 },
      { text: "Three better than three, four better than four", from: 0.85, to: 1 }
    ]
  };
}

/** A small bird in flight, its wings spread wide, its body's middle at (x, y), facing right (or left). */
const glider = (x: number, y: number, left = false) => {
  const d = left ? -1 : 1;
  return (
    `<path d="M${n(x - 3.6 * d)} ${n(y - 1.8)} Q${n(x - 1.6 * d)} ${n(y - 2.6)} ${x} ${n(y - 0.2)} Q${n(x + 1.6 * d)} ${n(y - 2.6)} ${n(x + 3.6 * d)} ${n(y - 1.8)}" stroke="#4E5F78" stroke-width="0.8" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="0.6" fill="#4E5F78"/><circle cx="${n(x + 1.2 * d)}" cy="${n(y - 0.3)}" r="0.45" fill="#4E5F78"/>`
  );
};

/** A flock of birds in rows, the front of it about (x, y): three rows of birds, wings spread, facing right (or left). */
const flock = (x: number, y: number, left = false) =>
  [
    [0, 0],
    [-6, -3.4],
    [-6, 3.4],
    [-12, -6.8],
    [-12, 0],
    [-12, 6.8]
  ]
    .map(([dx, dy]) => glider(n(x + (left ? -dx : dx)), n(y + dy), left))
    .join("");

/** A soft shade over (x, y): a wide dark canopy with a light rim, as a shade in the air. */
const shade = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#5E6A7E" opacity="0.55"/><ellipse cx="${x}" cy="${n(y - ry * 0.2)}" rx="${n(rx * 0.8)}" ry="${n(ry * 0.55)}" fill="#7E8A9E" opacity="0.4"/>`;

// The two bright ones. Abu Umamah said: I heard the Messenger of Allah ﷺ say: read the Quran, for it will come on the
// Day of Resurrection as an intercessor for its companions. Read the two bright ones, al-Baqarah and Surah Al Imran, for
// they will come on the Day of Resurrection as if they were two clouds, or two shades, or two flocks of birds in rows,
// pleading for their companions. Read Surah al-Baqarah, for taking it is a blessing, and leaving it is a regret, and the
// sorcerers cannot face it (Sahih Muslim 804a). No one is drawn: at night by a home, a place sits on a prayer mat, and
// its golden voice reads, with sparks rising. Then a wide pale plain comes, the Day; the place stands on it, and a soft
// golden light comes to its side. Two bright lights show over it. Two clouds come from either side and stay over it,
// then they are two shades; then two flocks of birds come in rows, their wings spread over it. Golden voices plead, a
// warm glow comes about the place, and far from it another place stands under a grey shade.
function twoBrightOnes(): SignArt {
  const reader: [number, number] = [70, 104.4];
  const there: [number, number] = [80, 104.2];
  return {
    kind: "two-bright-ones",
    ms: 12000,
    parts: [
      { name: "the night", svg: nightSky() },
      {
        name: "stars",
        svg: stars([
          [12, 12],
          [36, 24],
          [60, 9],
          [92, 18],
          [118, 10],
          [142, 22],
          [150, 8]
        ]),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "the moon", svg: crescent(128, 30, 5, 2.4, "#FFF3B8") },
      {
        name: "the land at night",
        svg: landOf(
          [
            [14, 74],
            [96, 76],
            [130, 116]
          ],
          "#34466A"
        )
      },
      { name: "a home at night", svg: home(48, 100, 15, 10, "#8A7258", "#7A6248", "#3A3028") + glow(n(48 + 3.3), 94.6, 2.6, WARM, 0.5) },
      { name: "a prayer mat", svg: prayerMat(reader[0], 106) },
      { name: "reading: a golden voice", svg: arcs(n(reader[0] + 2.4), n(reader[1] - 3.6), GOLD), keys: track({ opacity: [[0.02, 0], [0.03, 1], [0.15, 1], [0.17, 0]] }), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...[0.03, 0.05, 0.065].map((from, i): SignPart => ({ name: `its reading: a spark rising ${i + 1}`, svg: sparkle(n(reader[0] - 2 + i * 2), n(reader[1] - 6), 1.5, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.03), 10) })),
      { name: "the Day: a wide pale plain", svg: `<rect width="160" height="120" fill="#EEE8F0"/><rect y="70" width="160" height="50" fill="#E6DECD"/><path d="M0 70 L160 70" stroke="#D6CCB8" stroke-width="0.6"/>`, keys: showFrom(0.15, 0.19) },
      { name: "the one who read it: a place", svg: someone(reader[0], reader[1], 1.6, LIGHT), keys: track({ opacity: [[0.15, 1], [0.17, 0]] }) },
      { name: "the one who read it, on that Day", svg: someone(there[0], there[1], 1.6), keys: showFrom(0.17, 0.19) },
      { name: "it comes to plead for it: a soft golden light", svg: glow(n(there[0] + 7), n(there[1] - 2.4), 3.4, "#FFE07A", 0.46) + sparkle(n(there[0] + 7), n(there[1] - 2.4), 1.2, "#E8A93A"), keys: track({ opacity: [[0.19, 0], [0.2, 1]], xy: [[0.19, -90, 0], [0.235, 0, 0]] }), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...[
        [70, 84],
        [90, 84]
      ].map(([x, y], i): SignPart => ({
        name: `the two bright ones: a light ${i + 1}`,
        svg: glow(x, y, 4.4, "#FFE07A", 0.42) + sparkle(x, y, 1.8, "#E8A93A"),
        keys: track({ opacity: [[at3(0.3 + i * 0.01), 0], [at3(0.32 + i * 0.01), 1], [0.44, 1], [0.46, 0]] }),
        loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 2 }
      })),
      ...[
        [66, 62, -70],
        [94, 62, 70]
      ].map(([x, y, dx], i): SignPart => ({
        name: `like two clouds: a cloud ${i + 1}`,
        svg: cloud(x, y, 0.62, "#FFFFFF", 0.95),
        keys: track({ opacity: [[0.44, 0], [0.445, 1], [0.49, 1], [0.51, 0]], xy: [[0.44, dx, 0], [0.49, 0, 0]] })
      })),
      ...[66, 94].map((x, i): SignPart => ({ name: `or two shades: a shade ${i + 1}`, svg: shade(x, 58, 13, 5), keys: track({ opacity: [[0.49, 0], [0.51, 1], [0.57, 1], [0.6, 0]] }) })),
      ...[
        [74, 60, false, -80],
        [88, 60, true, 80]
      ].map(([x, y, left, dx], i): SignPart => ({
        name: `or two flocks of birds in rows: a flock ${i + 1}`,
        svg: flock(x as number, y as number, left as boolean),
        keys: track({ opacity: [[0.58, 0], [0.59, 1]], xy: [[0.58, dx as number, 0], [0.645, 0, 0]] }),
        loop: { move: "bob", ms: 900, y: 0.6, phase: i / 2 }
      })),
      { name: "pleading for it: golden voices", svg: arcs(70, 66.4, GOLD) + arcsLeft(90, 66.4, GOLD), keys: showFrom(0.72, 0.73), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a warm glow about the one who read it", svg: glow(there[0], there[1], 7, WARM, 0.42) + care(there[0], there[1], 6, 3), keys: showFrom(0.73, 0.77), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "taking it, a blessing: small lights about it", svg: sparkle(n(there[0] - 6), n(there[1] - 5), 1.1, "#E8A93A") + sparkle(n(there[0] + 2), n(there[1] - 8), 1, "#E8A93A") + sparkle(n(there[0] - 2), n(there[1] - 9.6), 0.9, "#E8A93A"), keys: showFrom(0.86, 0.89), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      { name: "leaving it, a regret: another place, far from it", svg: someone(136, 106, 1.5), keys: showFrom(0.88, 0.9) },
      { name: "the regret: a grey shade about it", svg: wash(136, 105.4, 7, 4.4, GREY, 0.22), keys: showFrom(0.9, 0.93) }
    ],
    words: [
      { text: "I heard him say: read the Quran", from: 0.02, to: 0.13 },
      { text: "It will intercede for its companions on the Day", from: 0.15, to: 0.27 },
      { text: "Read the bright two: al-Baqarah and Al Imran", from: 0.29, to: 0.41 },
      { text: "They will come like two clouds, or two shades", from: 0.43, to: 0.55 },
      { text: "Or like two flocks of birds in rows", from: 0.57, to: 0.69 },
      { text: "Pleading for their companions", from: 0.71, to: 0.83 },
      { text: "Taking it is a blessing, and leaving it a regret", from: 0.85, to: 1 }
    ]
  };
}

/** A ring of light in three parts, its middle at (x, y), `r` across: what the whole of the Quran is, in thirds. */
const thirds = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF8E6" opacity="0.92" stroke="#E8D8B0" stroke-width="0.7"/>` +
  [-90, 30, 150]
    .map((angle) => `<path d="M${x} ${y} L${n(x + r * Math.cos((angle * Math.PI) / 180))} ${n(y + r * Math.sin((angle * Math.PI) / 180))}" stroke="#D9C9A0" stroke-width="0.6"/>`)
    .join("");

/** One third of that ring, from the top round to the lower right, filled gold. */
const oneThird = (x: number, y: number, r: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - r)} A${r} ${r} 0 0 1 ${n(x + r * Math.cos(Math.PI / 6))} ${n(y + r * Math.sin(Math.PI / 6))} Z" fill="#F2C94C" opacity="0.85"/>`;

// A third of the Quran. Abu Sa'id al-Khudri said: a man heard a man reciting Qul huwa Allahu ahad, repeating it. In the
// morning he came to the Messenger of Allah ﷺ and told him of it, as if he thought it was little. The Messenger of
// Allah ﷺ said: by the One in whose hand is my soul, it equals a third of the Quran (Sahih al-Bukhari 5013). And he
// ﷺ said to his companions: is any of you unable to recite a third of the Quran in one night? That was hard on them,
// and they said: which of us can do that? He said: Allah, the One, as-Samad, is a third of the Quran (Sahih al-Bukhari
// 5015). No one is drawn: at night, by a home, a place recites, and a golden spark rises from it again and again;
// another place by a home hears it. The morning comes; that place goes to his golden ring by the masjid, with a small
// dim spark: little, it thought. His voice speaks, and a ring of light in three parts shows, and one third of it fills
// with gold. His voice asks again; places come by him with grey marks, for it was hard on them, and the third grows
// faint. His voice answers, the grey goes, the third fills again, and sparks rise from their places.
function thirdOfTheQuran(): SignArt {
  const his: [number, number] = [30, 104.8];
  const reciter: [number, number] = [104, 104.6];
  const hearer: [number, number] = [134, 104.8];
  const ring3: [number, number] = [80, 40];
  const by: [number, number][] = [
    [44, 106.6],
    [52, 107.2],
    [60, 106.6]
  ];
  const night = (from: number, to: number) => track({ opacity: [[from, 1], [to, 0]] });
  return {
    kind: "third-of-the-quran",
    ms: 12000,
    parts: [
      ...dayAround([136, 18], 12000),
      ...palms([
        [72, 98, 13],
        [154, 99, 13]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 101, 0.85) },
      { name: "a home, where one recites", svg: home(100, 99.6, 13, 9) },
      { name: "a home, where one hears it", svg: home(130, 99, 12, 8.6) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of the one reciting", svg: someone(reciter[0], reciter[1], 1.5) },
      { name: "the place of the one who heard it", svg: someone(hearer[0], hearer[1], 1.5), keys: track({ xy: [[0.33, 0, 0], [0.36, -90, 1.6]] }) },
      { name: "the night, until the morning", svg: nightSky(), keys: night(0.29, 0.33) },
      {
        name: "the stars of the night",
        svg: stars([
          [14, 12],
          [38, 24],
          [62, 10],
          [96, 20],
          [120, 8],
          [146, 18]
        ]),
        keys: night(0.29, 0.32),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "the moon", svg: crescent(130, 28, 4.6, 2.2, "#FFF3B8"), keys: night(0.29, 0.32) },
      {
        name: "the homes at night, lamps lit",
        svg:
          home(100, 99.6, 13, 9, "#8A7258", "#7A6248", "#3A3028") +
          home(130, 99, 12, 8.6, "#8A7258", "#7A6248", "#3A3028") +
          glow(n(100 + 3.3), 94.2, 2.6, WARM, 0.55) +
          glow(n(130 + 3.3), 94, 2.4, WARM, 0.55),
        keys: night(0.29, 0.32)
      },
      { name: "the one reciting, by night", svg: someone(reciter[0], reciter[1], 1.5, LIGHT), keys: night(0.29, 0.32) },
      { name: "the one who heard it, by night", svg: someone(hearer[0], hearer[1], 1.5, LIGHT), keys: night(0.29, 0.32) },
      { name: "reciting: a golden voice", svg: arcs(n(reciter[0] + 2.4), n(reciter[1] - 3.6), GOLD), keys: showWhile(0.02, 0.03, 0.29, 0.3), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...[0.03, 0.15, 0.18, 0.21].map((from, i): SignPart => ({ name: `the surah, again and again: a golden spark rising ${i + 1}`, svg: sparkle(reciter[0], n(reciter[1] - 6.4), 1.6, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.025), 10) })),
      { name: "hearing it: a ring by the one who heard it", svg: care(hearer[0], hearer[1], 3.6, 1.9, LIGHT), keys: showWhile(0.05, 0.07, 0.29, 0.3), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      { name: "its voice, telling him", svg: arcsLeft(n(hearer[0] - 90 - 2.6), n(hearer[1] + 1.6 - 4), VOICE), keys: showWhile(0.36, 0.368, 0.43, 0.435), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "little, it thought: a small dim spark", svg: sparkle(n(hearer[0] - 90 + 3.4), n(hearer[1] + 1.6 - 5.2), 0.8, "#BFB29A"), keys: showWhile(0.362, 0.37, 0.6, 0.62) },
      {
        name: "his voice",
        svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE),
        keys: track({ opacity: [[0.43, 0], [0.44, 1]] }),
        loop: { move: "twinkle", ms: 1000, low: 0.5 }
      },
      { name: "the Quran in three parts: a ring of light", svg: thirds(ring3[0], ring3[1], 15), keys: showFrom(0.57, 0.6) },
      { name: "a third of it, filled with gold", svg: oneThird(ring3[0], ring3[1], 15), keys: track({ opacity: [[0.6, 0], [0.64, 1], [0.72, 1], [0.74, 0.25], [0.87, 0.25], [0.91, 1]] }) },
      { name: "a third: a glow on it", svg: glow(n(ring3[0] + 6.5), n(ring3[1] - 3.8), 9, "#FFE07A", 0.26), keys: track({ opacity: [[0.62, 0], [0.65, 1], [0.72, 1], [0.74, 0], [0.88, 0], [0.92, 1]] }), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      ...by.map(([x, y], i): SignPart => ({ name: `a place by him ${i + 1}`, svg: someone(x, y, 1.4), keys: showFrom(at3(0.72 + i * 0.005), at3(0.73 + i * 0.005)) })),
      ...by.map(([x, y], i): SignPart => ({
        name: `hard on them: a grey mark ${i + 1}`,
        svg: `<path d="M${n(x - 1.6)} ${n(y - 4)} q0.8 -1 1.6 0 q0.8 1 1.6 0" stroke="${GREY}" stroke-width="0.5" fill="none" stroke-linecap="round"/>`,
        keys: track({ opacity: [[at3(0.75 + i * 0.005), 0], [at3(0.76 + i * 0.005), 1], [0.87, 1], [0.9, 0]] })
      })),
      ...by.map(([x, y], i): SignPart => ({ name: `they can: a spark rising from a place ${i + 1}`, svg: sparkle(x, n(y - 6), 1.4, "#FFE7A0"), keys: sparkRising(at3(0.91 + i * 0.01), at3(0.935 + i * 0.01), 9) }))
    ],
    words: [
      { text: "A man heard one recite: Qul huwa Allahu ahad", from: 0.02, to: 0.13 },
      { text: "Repeating it, again and again", from: 0.15, to: 0.27 },
      { text: "In the morning he told him, as if it were little", from: 0.29, to: 0.41 },
      { text: "By the One in whose hand is my soul", from: 0.43, to: 0.55 },
      { text: "It equals a third of the Quran", from: 0.57, to: 0.69 },
      { text: "Can one of you not recite a third in a night?", from: 0.71, to: 0.83 },
      { text: "Allah, One, as-Samad: a third of the Quran", from: 0.85, to: 1 }
    ]
  };
}

export const BLESSING_ART = {
  "lost-necklace": lostNecklace,
  "love-madinah": loveMadinah,
  "thabit-good-news": thabitGoodNews,
  "dearer-than-yourself": dearerThanYourself,
  "better-than-camels": betterThanCamels,
  "two-bright-ones": twoBrightOnes,
  "third-of-the-quran": thirdOfTheQuran
};
