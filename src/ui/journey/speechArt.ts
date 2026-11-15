import { cloud, glow, n, palm, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { track } from "./toldArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * What the Prophet ﷺ taught of what we say and how we keep our word, drawn as the scenes of worship are
 * (worshipArt.ts): two expressions light on the tongue and heavy in the balance; cleanliness, half of faith; the three
 * signs of a hypocrite; calling to good and calling to error; praising Allah for a morsel and a drink; good words or
 * silence; and "Say: I affirm my faith in Allah, then remain steadfast". Only the land, the sky, buildings, things and
 * plants are drawn. No Prophet and no person is ever drawn, not even a hand or a face: where someone went, a dashed way
 * shows it, where someone sat or stood, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is
 * drawn for Allah and nothing comes down from the sky: praise, good words and rewards are sparks rising or lights.
 */

/** The grey of someone who does wrong, and the dark of a wrong done. */
const GREY = "#7D746C";
const DARK = "#4A3A2A";

/** The land, its tufts of grass kept clear of a balance on the right. */
const openLand = () =>
  landOf([
    [14, 74],
    [62, 72],
    [30, 116],
    [84, 116],
    [152, 110]
  ]);

/** A crooked voice from (x, y), facing right: the words of a lie, or a call to error. */
const crooked = (x: number, y: number) =>
  `<path d="M${x} ${n(y + 1.2)} l1 -1.4 l1 1.4 l1 -1.4 l1 1.4 M${x} ${n(y - 1.2)} l1.4 -1.6 l1.4 1.6 l1.4 -1.6 l1.4 1.6" stroke="${GREY}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;

/** A balance standing on its foot at (x, 100), its crossbar `half` to each side of its pivot at (x, top). */
function balance(x: number, top: number, half: number) {
  const stand =
    `<rect x="${n(x - 8)}" y="99.4" width="16" height="2.2" rx="0.8" fill="#8C6A3A"/>` +
    `<rect x="${n(x - 0.8)}" y="${n(top + 1)}" width="1.6" height="${n(99.4 - top - 1)}" fill="#A47C46"/>` +
    `<circle cx="${x}" cy="${top}" r="1.7" fill="#C9A055"/>`;
  const crossbar =
    `<rect x="${n(x - half - 0.6)}" y="${n(top - 0.7)}" width="${n(half * 2 + 1.2)}" height="1.4" rx="0.7" fill="#B98E4E"/>` +
    `<circle cx="${n(x - half)}" cy="${top}" r="0.9" fill="#8C6A3A"/><circle cx="${n(x + half)}" cy="${top}" r="0.9" fill="#8C6A3A"/>`;
  const rim = top + 15.2;
  const pan = (px: number) =>
    `<path d="M${n(px)} ${n(top + 0.4)} L${n(px - 6.4)} ${n(rim)} M${n(px)} ${n(top + 0.4)} L${n(px + 6.4)} ${n(rim)}" stroke="#6E5532" stroke-width="0.4"/>` +
    `<path d="M${n(px - 7.4)} ${n(rim)} Q${n(px)} ${n(rim + 5.8)} ${n(px + 7.4)} ${n(rim)} Z" fill="#C9A055"/>` +
    `<path d="M${n(px - 7.4)} ${n(rim)} L${n(px + 7.4)} ${n(rim)}" stroke="#A88438" stroke-width="0.6"/>`;
  return { stand, crossbar, left: pan(x - half), right: pan(x + half), rim };
}

/** [at, value] keys that tip a balance from `from`: to `deg` (overshooting, then settling) by `from` + 0.075. */
const tip = (from: number, deg: number): [number, number][] => [
  [from, 0],
  [at3(from + 0.04), n(deg * 1.16)],
  [at3(from + 0.06), n(deg * 0.93)],
  [at3(from + 0.075), deg]
];

/** The same, as a pan's rise (`sign` -1) or fall (`sign` 1), in [at, x, y]. */
const panMoves = (from: number, by: number, sign: 1 | -1): [number, number, number][] => tip(from, by).map(([t, y]) => [t, 0, n(y * sign)]);

// Two expressions. The Prophet ﷺ said: two expressions are very easy for the tongue to say, but very heavy in the
// balance and very dear to the Most Merciful: Subhan Allah al-Azim, and Subhan Allah wa bihamdihi (Sahih al-Bukhari
// 6406). No one is drawn: someone's place by his home, and a voice; two small lights, the two expressions, float up
// from it, light and easy; they come to rest in a pan of the balance, and it sinks, heavy; a warm glow comes on them and
// sparks rise, dear; then a voice glorifies, and each of the two shines in turn as it is said.
function twoWords(): SignArt {
  const b = balance(120, 62.4, 17);
  /** How far the pan with the two expressions sinks, and the pan without them rises. */
  const sink = 2.7;
  // The two expressions, each drawn where it rests in the pan; they float up from the voice, wait, and glide there.
  const first: [number, number] = [133.8, b.rim - 1.4];
  const second: [number, number] = [140.2, b.rim - 1.4];
  const goes = (at: [number, number], start: [number, number], mid: [number, number], hover: [number, number], from: number, wait: number) =>
    track({
      opacity: [
        [from, 0],
        [at3(from + 0.01), 1]
      ],
      xy: [
        [from, n(start[0] - at[0]), n(start[1] - at[1])],
        [at3(from + 0.06), n(mid[0] - at[0]), n(mid[1] - at[1])],
        [at3(from + 0.12), n(hover[0] - at[0]), n(hover[1] - at[1])],
        [wait, n(hover[0] - at[0]), n(hover[1] - at[1])],
        [0.36, 0, 0],
        ...panMoves(0.38, sink, 1)
      ]
    });
  const light = (at: [number, number]) => glow(at[0], at[1], 3.6, WARM, 0.3) + sparkle(at[0], at[1], 2.2, SPARK);
  return {
    kind: "two-words",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(30, 18) },
      { name: "clouds", svg: cloud(96, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: openLand() },
      { name: "his home", svg: home(20, 94, 20, 14) },
      { name: "someone's place, by his home", svg: someone(40, 96, 2) },
      { name: "a voice from his place, saying them", svg: arcs(43.8, 93, VOICE), keys: showWhile(0.04, 0.06, 0.2, 0.22), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the stand of the balance", svg: b.stand },
      { name: "the crossbar of the balance", svg: b.crossbar, origin: { x: 120, y: 62.4 }, keys: track({ rotate: tip(0.38, 9) }) },
      { name: "the pan that rises", svg: b.left, keys: track({ xy: panMoves(0.38, sink, -1) }) },
      { name: "the pan that sinks", svg: b.right, keys: track({ xy: panMoves(0.38, sink, 1) }) },
      { name: "the first expression, light", svg: light(first), keys: goes(first, [46, 91], [54, 84], [60, 79], 0.07, 0.3), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "the second expression, light", svg: light(second), keys: goes(second, [47, 95], [58, 89], [68, 84], 0.1, 0.31), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: 0.5 } },
      { name: "a warm glow on the two, dear", svg: glow(137, first[1] + sink, 7.4, WARM, 0.16), keys: showFrom(0.54, 0.58), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...risingSparks(
        "dear, rising",
        [
          [131, 72],
          [137, 70],
          [143, 72]
        ],
        0.56,
        0.02,
        { color: SPARK, rise: 14, stay: true }
      ),
      { name: "a voice from his place, glorifying", svg: arcs(43.8, 93, GOLD), keys: showFrom(0.74, 0.76), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the first expression, shining", svg: glow(first[0], first[1] + sink, 4, "#FFF3C0", 0.22), keys: showFrom(0.76, 0.79), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the second expression, shining", svg: glow(second[0], second[1] + sink, 4, "#FFF3C0", 0.22), keys: showFrom(0.88, 0.91), loop: { move: "twinkle", ms: 900, low: 0.5, phase: 0.5 } }
    ],
    words: [
      { text: "Two expressions, easy for the tongue to say", from: 0.02, to: 0.26 },
      { text: "But very heavy in the balance", from: 0.28, to: 0.5 },
      { text: "And very dear to the Most Merciful", from: 0.52, to: 0.7 },
      { text: "Subhan Allah al-Azim", from: 0.72, to: 0.84 },
      { text: "Subhan Allah wa bihamdihi", from: 0.86, to: 1 }
    ]
  };
}

// Half of faith. The Prophet ﷺ said: cleanliness is half of faith, and al-Hamdu lillah fills the scale; ... and prayer
// is a light, and charity is proof, and endurance is a brightness (Sahih Muslim 223). No one is drawn: someone's place
// at a basin by the masjid, and water washing; a dashed circle, faith, and half of it fills with light; a voice praises,
// and the praise fills a pan of the balance until it sinks; the place moves to a prayer mat, and a light comes on it; a
// sack goes from it along a dashed way to someone in need by the masjid, and a glint of proof shows on the giver; then a
// grey cloud of hardship comes over him, and a brightness grows about him.
function halfOfFaith(): SignArt {
  const b = balance(124, 65.4, 16);
  const basin: [number, number] = [60, 95];
  const at: [number, number] = [70, 96];
  const mat: [number, number] = [89, 99.4];
  const needy: [number, number] = [34, 99];
  /** How far the pan with the praise sinks. */
  const sink = 2.6;
  const praise = [0.26, 0.275, 0.29, 0.305];
  // The heap of praise in the pan, from the pan's bottom up to its brim.
  const heap = `<path d="M${n(108 - 6.6)} ${n(b.rim)} Q108 ${n(b.rim - 5.4)} ${n(108 + 6.6)} ${n(b.rim)} Q108 ${n(b.rim + 5)} ${n(108 - 6.6)} ${n(b.rim)} Z" fill="${WARM}"/>`;
  const prayerMat =
    `<path d="M80 102 L96 102 L98.6 97 L82.6 97 Z" fill="#B5473A"/><path d="M81.6 101 L94.8 101 L97 98 L83.6 98 Z" stroke="#E8C45A" stroke-width="0.5" fill="none"/>` +
    `<path d="M84.6 99.8 Q89.4 97.4 92.4 99.8" stroke="#E8C45A" stroke-width="0.4" fill="none"/>`;
  return {
    kind: "half-of-faith",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(146, 18) },
      { name: "clouds", svg: cloud(26, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: openLand() },
      { name: "the masjid", svg: madinahMasjid(2, 90, 0.95) },
      {
        name: "a basin of water for wudu",
        svg: `<path d="M${basin[0] - 7} ${basin[1]} L${basin[0] + 7} ${basin[1]} L${basin[0] + 5} ${basin[1] + 5} L${basin[0] - 5} ${basin[1] + 5} Z" fill="#B9A585"/><ellipse cx="${basin[0]}" cy="${basin[1]}" rx="7" ry="1.5" fill="#7CC4E8" stroke="#9C8A6A" stroke-width="0.4"/>`
      },
      {
        name: "water, washing",
        svg: [
          [64.6, 91.4],
          [66.4, 93.4],
          [63.4, 94]
        ]
          .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.6" ry="0.9" fill="#6CB8E6"/>`)
          .join(""),
        keys: showWhile(0.04, 0.06, 0.16, 0.18),
        loop: { move: "drip", ms: 700, distance: 3 }
      },
      { name: "a clean sparkle on his place", svg: sparkle(at[0] + 2.8, at[1] - 4.6, 1.6, "#FFFFFF") + sparkle(at[0] - 3, at[1] - 3.2, 1.1, "#FFFFFF"), keys: showWhile(0.1, 0.12, 0.2, 0.21), loop: { move: "twinkle", ms: 700, low: 0.3 } },
      { name: "a dashed circle, faith", svg: `<circle cx="70" cy="52" r="9" stroke="${GOLD}" stroke-width="0.8" stroke-dasharray="1.8 1.4" fill="#FFFFFF" fill-opacity="0.25"/>`, keys: showFrom(0.03, 0.06) },
      {
        name: "half of faith, filling with light",
        svg: `<path d="M70 43.4 A8.6 8.6 0 0 0 70 60.6 Z" fill="${WARM}"/><path d="M70 43 L70 61" stroke="${GOLD}" stroke-width="0.5"/>`,
        origin: { x: 70, y: 52 },
        keys: track({
          opacity: [
            [0.12, 0],
            [0.13, 1]
          ],
          scaleX: [
            [0.12, 0.05],
            [0.18, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.8 }
      },
      { name: "a prayer mat", svg: prayerMat, keys: showFrom(0.44, 0.46) },
      { name: "a light on the prayer mat", svg: glow(mat[0], mat[1] - 1.4, 9, WARM, 0.12) + wash(mat[0], mat[1], 11, 3, "#FFF6D0", 0.14), keys: showFrom(0.5, 0.54), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "a brightness about him, enduring",
        svg: glow(mat[0], mat[1] - 2, 18, "#FFE9A8", 0.09),
        origin: { x: mat[0], y: mat[1] - 2 },
        keys: track({
          opacity: [
            [0.87, 0],
            [0.875, 1]
          ],
          scale: [
            [0.87, 0.25],
            [0.94, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.8 }
      },
      {
        name: "someone's place, at the basin, then on the mat",
        svg: someone(at[0], at[1], 2),
        keys: track({
          xy: [
            [0.45, 0, 0],
            [0.49, n(mat[0] - at[0]), n(mat[1] - at[1])]
          ]
        })
      },
      { name: "the stand of the balance", svg: b.stand },
      { name: "the crossbar of the balance", svg: b.crossbar, origin: { x: 124, y: 65.4 }, keys: track({ rotate: tip(0.3, -9) }) },
      { name: "the pan that sinks", svg: b.left, keys: track({ xy: panMoves(0.3, sink, 1) }) },
      { name: "the pan that rises", svg: b.right, keys: track({ xy: panMoves(0.3, sink, -1) }) },
      { name: "a voice from his place, praising", svg: arcs(at[0] + 3.8, at[1] - 3, GOLD), keys: showWhile(0.25, 0.27, 0.36, 0.38), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...praise.map(
        (from, i): SignPart => ({
          name: `praise, going to the scale ${i + 1}`,
          svg: sparkle(108, b.rim - 1, 1.8, SPARK),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.005), 1],
              [at3(from + 0.035), 1],
              [at3(from + 0.04), 0]
            ],
            xy: [
              [from, n(at[0] + 6 - 108), n(at[1] - 5 - (b.rim - 1))],
              [at3(from + 0.02), n(92 - 108), n(78 - (b.rim - 1))],
              [at3(from + 0.035), 0, 0]
            ]
          })
        })
      ),
      {
        name: "praise, filling the scale",
        svg: heap,
        origin: { x: 108, y: b.rim + 2.4 },
        keys: track({
          opacity: [
            [0.275, 0],
            [0.28, 1]
          ],
          scaleY: [
            [0.275, 0.1],
            [0.345, 1]
          ],
          xy: panMoves(0.3, sink, 1)
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.75 }
      },
      { name: "someone in need, by the masjid", svg: someone(needy[0], needy[1], 1.8) },
      { name: "a way to the one in need", svg: way(`M${mat[0] - 4} 102.6 C70 105 50 105 ${needy[0] + 4} 101.4`, GOLD), keys: showFrom(0.63, 0.66) },
      {
        name: "charity, a sack going",
        svg: sack(needy[0] + 6.4, 102.2, 1.1),
        keys: track({
          opacity: [
            [0.64, 0],
            [0.65, 1]
          ],
          xy: [
            [0.66, n(mat[0] + 6.4 - (needy[0] + 6.4)), -0.6],
            [0.72, 0, 0]
          ]
        })
      },
      { name: "a warm glow on the one in need", svg: glow(needy[0], needy[1], 6, WARM, 0.2), keys: showFrom(0.72, 0.75), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a glint of proof on the giver", svg: glow(mat[0] + 3.6, mat[1] - 5.6, 3, WARM, 0.3) + sparkle(mat[0] + 3.6, mat[1] - 5.6, 1.9, "#FFF3C0"), keys: showFrom(0.74, 0.76), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      { name: "a grey cloud of hardship over him", svg: cloud(mat[0], mat[1] - 13.4, 0.3, "#8E98A6", 0.95), keys: showFrom(0.83, 0.86), loop: { move: "bob", ms: 2400, y: 0.8 } }
    ],
    words: [
      { text: "Cleanliness is half of faith", from: 0.02, to: 0.22 },
      { text: "Alhamdulillah fills the scale", from: 0.24, to: 0.42 },
      { text: "Prayer is a light", from: 0.44, to: 0.6 },
      { text: "Charity is proof", from: 0.62, to: 0.8 },
      { text: "Endurance is a brightness", from: 0.82, to: 1 }
    ]
  };
}

// Three signs. The Prophet ﷺ said: the signs of a hypocrite are three: whenever he speaks, he tells a lie; whenever he
// promises, he always breaks it; and if you trust him, he proves to be dishonest: if you keep something as a trust with
// him, he will not return it (Sahih al-Bukhari 33). No one is drawn: three dashed marks, and someone's place, grey; a
// crooked voice, and a dark speck goes from it to one who hears; a voice promises, a dashed way sets out toward one who
// waits by a palm and breaks off halfway, and the one who waits is left dim; a sack is brought to him from a home and
// left in his trust, a voice comes asking for it, and it is kept back and darkens. Each mark fills dark in its turn.
function threeSigns(): SignArt {
  const at: [number, number] = [80, 94];
  const hears: [number, number] = [102, 85];
  const waits: [number, number] = [131, 96];
  const owner: [number, number] = [32, 96];
  const marks = [60, 80, 100];
  const fills = [0.34, 0.6, 0.9];
  const kept: [number, number] = [at[0] + 6.6, 99.4];
  return {
    kind: "three-signs",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE0EA", "#E6D6B2", 61) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "clouds", svg: cloud(28, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a home", svg: home(18, 92, 20, 14) },
      { name: "a palm, a place to meet", svg: palm(142, 94, 17) },
      ...marks.map((x, i): SignPart => ({ name: `sign ${i + 1}, a dashed mark`, svg: `<circle cx="${x}" cy="50" r="5" stroke="${GREY}" stroke-width="0.8" stroke-dasharray="1.6 1.3" fill="#FFFFFF" fill-opacity="0.3"/>`, keys: showFrom(at3(0.04 + i * 0.02), at3(0.07 + i * 0.02)) })),
      ...marks.map(
        (x, i): SignPart => ({
          name: `sign ${i + 1}, filling dark`,
          svg: `<circle cx="${x}" cy="50" r="4.2" fill="#5A4E46"/>`,
          origin: { x, y: 50 },
          keys: track({
            opacity: [
              [fills[i], 0],
              [at3(fills[i] + 0.01), 0.9]
            ],
            scale: [
              [fills[i], 0.3],
              [at3(fills[i] + 0.03), 1]
            ]
          })
        })
      ),
      { name: "someone's place, grey", svg: someone(at[0], at[1], 2.2, GREY) },
      { name: "one who hears", svg: someone(hears[0], hears[1], 1.7) },
      { name: "a crooked voice from his place, lying", svg: crooked(at[0] + 3.6, at[1] - 3.4), keys: showWhile(0.22, 0.24, 0.33, 0.35), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      {
        name: "a lie, a dark speck going",
        svg: `<circle cx="${hears[0]}" cy="${n(hears[1] - 3.6)}" r="1.2" fill="${DARK}"/>`,
        keys: track({
          opacity: [
            [0.25, 0],
            [0.26, 1]
          ],
          xy: [
            [0.26, n(at[0] + 5.4 - hears[0]), n(at[1] - 4.4 - (hears[1] - 3.6))],
            [0.32, 0, 0]
          ]
        })
      },
      { name: "a voice from his place, promising", svg: arcs(at[0] + 3.8, at[1] - 3, GREY), keys: showWhile(0.46, 0.48, 0.52, 0.54), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "one who waits by the palm", svg: someone(waits[0], waits[1], 1.8) },
      { name: "a warm glow of hope on the one who waits", svg: glow(waits[0], waits[1], 5.4, WARM, 0.26), keys: showWhile(0.48, 0.5, 0.57, 0.6) },
      { name: "the promised way, going only halfway", svg: way(`M${at[0] + 4.4} 96.6 C92 99.6 98 99.8 106 98.6`, GOLD), keys: showFrom(0.52, 0.55) },
      { name: "the promised way, broken off", svg: `<path d="M107.8 96.4 l1.6 3.6 M110.4 96.4 l1.6 3.6" stroke="${GREY}" stroke-width="0.8" stroke-linecap="round"/>`, keys: showFrom(0.55, 0.57) },
      { name: "the one who waits, left dim", svg: glow(waits[0], waits[1], 5.4, "#8E98A6", 0.3), keys: showFrom(0.58, 0.61) },
      { name: "one who trusts him", svg: someone(owner[0], owner[1], 1.8), keys: showFrom(0.71, 0.72) },
      { name: "a way, bringing the trust", svg: way(`M${owner[0] + 3.4} 98.4 C44 102 60 102.4 ${at[0] + 1} 98.8`, BROWN), keys: showWhile(0.71, 0.73, 0.82, 0.84) },
      {
        name: "a sack, left in his trust",
        svg: sack(kept[0], kept[1], 1.2),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.73, 1]
          ],
          xy: [
            [0.73, n(owner[0] + 6.6 - kept[0]), -0.6],
            [0.79, 0, 0]
          ]
        })
      },
      { name: "a voice from the one who trusts him, asking for it", svg: arcs(owner[0] + 3.8, owner[1] - 3, VOICE), keys: showWhile(0.83, 0.85, 0.89, 0.91), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the sack, kept back, darkening", svg: `<g opacity="0.55">${sack(kept[0], kept[1], 1.2, "#3E3026")}</g>`, keys: showFrom(0.88, 0.91) },
      { name: "the one who trusts him, left dim", svg: glow(owner[0], owner[1], 5.4, "#8E98A6", 0.3), keys: showFrom(0.9, 0.93) }
    ],
    words: [
      { text: "The signs of a hypocrite are three", from: 0.02, to: 0.18 },
      { text: "Whenever he speaks, he tells a lie", from: 0.2, to: 0.42 },
      { text: "Whenever he promises, he always breaks it", from: 0.44, to: 0.68 },
      { text: "If you trust him, he proves to be dishonest", from: 0.7, to: 1 }
    ]
  };
}

// Calling to good. The Prophet ﷺ said: he who called to righteousness has a reward like the rewards of those who
// adhered to it, without their rewards being diminished in any respect; and he who called to error carries the sin of
// it, like those who committed it, without their sins being diminished in any respect (Sahih Muslim 2674). No one is
// drawn: by the masjid, someone's place and a voice calling; dashed ways come from three homes to it, and a light, a
// reward, comes on each who came, and lights like theirs on the one who called, while theirs stay whole; then on the
// other side, a grey place and a crooked voice calling; grey ways come from two homes to it, and dark specks come on
// each who came, and specks like theirs on the one who called.
function callToGood(): SignArt {
  const caller: [number, number] = [34, 96];
  const came: [number, number][] = [
    [48, 99],
    [56, 95.4],
    [64, 99.4]
  ];
  const homes: [number, number][] = [
    [54, 78],
    [66, 76],
    [78, 79]
  ];
  const fromHome = ["M54 79 C52 86 50 92 48.6 96.6", "M66 77 C64 84 59 89 56.6 93", "M78 80 C76 87 70 93 65 97"];
  const copies: [number, number][] = [
    [caller[0] - 4.4, caller[1] - 6.4],
    [caller[0], caller[1] - 8.4],
    [caller[0] + 4.4, caller[1] - 6.4]
  ];
  const wrong: [number, number] = [118, 96];
  const led: [number, number][] = [
    [130, 99.4],
    [138, 95.6]
  ];
  const darkHomes: [number, number][] = [
    [128, 78],
    [146, 80]
  ];
  const ledFrom = ["M128 79 C129 86 130 92 130 96.6", "M146 81 C144 87 141 92 139.4 93.2"];
  const reward = (x: number, y: number) => glow(x, y, 3.4, WARM, 0.3) + sparkle(x, y, 1.6, SPARK);
  const speck = (x: number, y: number) => `<circle cx="${n(x)}" cy="${n(y)}" r="1.2" fill="${DARK}"/>`;
  return {
    kind: "call-to-good",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(30, 16) },
      { name: "clouds", svg: cloud(100, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(2, 88, 0.85) },
      ...homes.map(([x, y], i): SignPart => ({ name: `a home ${i + 1}`, svg: home(x, y, 9, 7) })),
      ...darkHomes.map(([x, y], i): SignPart => ({ name: `a home on the other side ${i + 1}`, svg: home(x, y, 9, 7, "#BFA27A", "#A88B64") })),
      { name: "a palm between", svg: palm(96, 92, 15) },
      { name: "someone's place, calling to good", svg: someone(caller[0], caller[1], 2) },
      { name: "a voice from his place, calling to good", svg: arcs(caller[0] + 3.8, caller[1] - 3, GOLD), keys: showFrom(0.04, 0.06), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...fromHome.map((d, i): SignPart => ({ name: `a way, coming to follow ${i + 1}`, svg: way(d, GOLD, 1), keys: showFrom(at3(0.21 + i * 0.02), at3(0.25 + i * 0.02)) })),
      ...came.map(([x, y], i): SignPart => ({ name: `one who came ${i + 1}`, svg: someone(x, y, 1.7), keys: showFrom(at3(0.25 + i * 0.02), at3(0.26 + i * 0.02)) })),
      ...came.map(([x, y], i): SignPart => ({ name: `a reward on one who came ${i + 1}`, svg: reward(x, y - 4.6), keys: showFrom(at3(0.29 + i * 0.01), at3(0.31 + i * 0.01)), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 3 } })),
      ...copies.map(([x, y], i): SignPart => ({ name: `a reward like theirs on the one who called ${i + 1}`, svg: reward(x, y), keys: showFrom(at3(0.32 + i * 0.01), at3(0.34 + i * 0.01)), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 3 } })),
      { name: "their rewards, kept whole", svg: came.map(([x, y]) => `<circle cx="${x}" cy="${n(y - 4.6)}" r="3.4" stroke="#F2B33C" stroke-width="0.6" fill="none"/>`).join(""), keys: showFrom(0.45, 0.48), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "someone's place on the other side, grey", svg: someone(wrong[0], wrong[1], 2, GREY) },
      { name: "a crooked voice from it, calling to error", svg: crooked(wrong[0] + 3.4, wrong[1] - 3.4), keys: showFrom(0.62, 0.64), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      ...ledFrom.map((d, i): SignPart => ({ name: `a grey way, coming to follow ${i + 1}`, svg: way(d, GREY, 1), keys: showFrom(at3(0.66 + i * 0.02), at3(0.7 + i * 0.02)) })),
      ...led.map(([x, y], i): SignPart => ({ name: `one who followed the error ${i + 1}`, svg: someone(x, y, 1.7, GREY), keys: showFrom(at3(0.7 + i * 0.02), at3(0.71 + i * 0.02)) })),
      ...led.map(([x, y], i): SignPart => ({ name: `its sin on one who followed ${i + 1}`, svg: speck(x, y - 4.4), keys: showFrom(at3(0.82 + i * 0.02), at3(0.84 + i * 0.02)) })),
      ...led.map((_, i): SignPart => ({ name: `a sin like theirs on the one who called to it ${i + 1}`, svg: speck(wrong[0] - 2.6 + i * 5.2, wrong[1] - 5.6), keys: showFrom(at3(0.87 + i * 0.02), at3(0.89 + i * 0.02)) }))
    ],
    words: [
      { text: "He who calls to righteousness", from: 0.02, to: 0.18 },
      { text: "Has a reward like those who adhered to it", from: 0.2, to: 0.4 },
      { text: "Without their rewards being diminished", from: 0.42, to: 0.58 },
      { text: "And he who calls to error", from: 0.6, to: 0.78 },
      { text: "Carries its sin, like those who committed it", from: 0.8, to: 1 }
    ]
  };
}

// Praise for each morsel. The Prophet ﷺ said: Allah is pleased with His servant who says al-Hamdu lillah while taking a
// morsel of food and while drinking (Sahih Muslim 2734). No one is drawn and no hand: someone's place at a cloth with a
// dish of dates and a cup of water; a dashed reach goes to the dish and a date is gone; a voice praises, praise rises,
// and a warm glow comes on his place; then a dashed reach goes to the cup and the water is less; a voice praises again,
// praise rises, and the glow grows.
function praiseEachBite(): SignArt {
  const at: [number, number] = [56, 92];
  const dates: [number, number][] = [
    [70.4, 90.6],
    [73.6, 89.6],
    [76.8, 90.6],
    [72, 92.2],
    [75.4, 92.2]
  ];
  const cup: [number, number] = [98, 94];
  return {
    kind: "praise-each-bite",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "clouds", svg: cloud(40, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his home", svg: home(22, 88, 22, 16) },
      { name: "a palm", svg: palm(140, 90, 17) },
      { name: "a way from his home", svg: way(`M26 89.6 C34 93.4 42 93.6 ${at[0] - 3.4} 92.6`, BROWN), keys: showFrom(0.12, 0.17) },
      { name: "a cloth, spread", svg: `<rect x="46" y="84" width="68" height="16" rx="3" fill="#E9D5B0" stroke="#C9A877" stroke-width="0.8"/><path d="M50 87 L110 87 M50 97 L110 97" stroke="#C9A877" stroke-width="0.5" stroke-dasharray="2 1.6"/>` },
      { name: "a dish", svg: `<ellipse cx="73.6" cy="91.8" rx="9.6" ry="4" fill="#B98552"/><ellipse cx="73.6" cy="91.2" rx="8.2" ry="3" fill="#8E5B32"/>`, keys: showFrom(0.04, 0.07) },
      ...dates.map(
        ([x, y], i): SignPart => ({
          name: i === 2 ? "a morsel, a date" : `dates on the dish ${i + 1}`,
          svg: `<ellipse cx="${x}" cy="${y}" rx="1.9" ry="1.15" fill="#6B3A1E"/><ellipse cx="${n(x - 0.5)}" cy="${n(y - 0.4)}" rx="0.6" ry="0.3" fill="#9A5A32"/>`,
          keys: i === 2 ? { at: [0, 0.05, 0.08, 0.38, 0.4], opacity: [0, 0, 1, 1, 0] } : showFrom(0.05, 0.08)
        })
      ),
      { name: "a cup", svg: `<path d="M${cup[0] - 4.5} ${cup[1] - 9} L${cup[0] + 4.5} ${cup[1] - 9} L${cup[0] + 3.5} ${cup[1]} L${cup[0] - 3.5} ${cup[1]} Z" fill="#E8DCC4" stroke="#B9A585" stroke-width="0.5"/>`, keys: showFrom(0.08, 0.11) },
      {
        name: "water in the cup",
        svg: `<path d="M${cup[0] - 4} ${cup[1] - 7.4} L${cup[0] + 4} ${cup[1] - 7.4} L${cup[0] + 3.4} ${cup[1] - 0.6} L${cup[0] - 3.4} ${cup[1] - 0.6} Z" fill="#7CC4E8"/>`,
        origin: { x: cup[0], y: cup[1] - 0.6 },
        keys: track({
          opacity: [
            [0.08, 0],
            [0.11, 1]
          ],
          scaleY: [
            [0.7, 1],
            [0.73, 0.45]
          ]
        })
      },
      { name: "someone's place at the cloth", svg: someone(at[0], at[1], 2), keys: showFrom(0.17, 0.19) },
      { name: "a reach, to the dish", svg: way(`M${at[0] + 2.6} 92.6 C64 94.6 70 94 ${dates[2][0] - 1.8} 91.4`, VOICE, 0.9), keys: showWhile(0.34, 0.36, 0.41, 0.43) },
      { name: "a voice from his place, praising", svg: arcs(at[0] + 3.8, at[1] - 3.6, GOLD), keys: showWhile(0.44, 0.46, 0.56, 0.58), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks("praise for the morsel, rising", [[at[0], at[1] - 5.4]], 0.46, 0, { color: SPARK, rise: 16, stay: true }),
      { name: "a warm glow on his place, pleasing", svg: glow(at[0], at[1], 7, WARM, 0.2), keys: showFrom(0.5, 0.54), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a reach, to the cup", svg: way(`M${at[0] + 2.6} 93.4 C72 98.4 88 98 ${cup[0] - 4.4} 92.4`, VOICE, 0.9), keys: showWhile(0.67, 0.69, 0.74, 0.76) },
      { name: "a voice from his place, praising again", svg: arcs(at[0] + 3.8, at[1] - 3.6, GOLD), keys: showWhile(0.77, 0.79, 0.9, 0.92), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks("praise for the drink, rising", [[at[0] + 4.4, at[1] - 5.4]], 0.79, 0, { color: SPARK, rise: 16, stay: true }),
      { name: "the warm glow, growing", svg: glow(at[0], at[1], 12, WARM, 0.14), keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "Allah is pleased with His servant", from: 0.02, to: 0.3 },
      { text: "Who says Alhamdulillah while taking a morsel", from: 0.32, to: 0.64 },
      { text: "And while drinking", from: 0.66, to: 1 }
    ]
  };
}

// Good words or silence. The Prophet ﷺ said: anybody who believes in Allah and the Last Day should not harm his
// neighbor, and anybody who believes in Allah and the Last Day should entertain his guest generously, and anybody who
// believes in Allah and the Last Day should talk what is good or keep quiet (Sahih al-Bukhari 6018). No one is drawn:
// someone's place by his home, and a light within it, his faith; the home next door at ease, a warm glow on it; a
// visitor's way comes, a cloth with a dish and a cup is spread, and a warm glow of welcome; then a voice, and good words
// rise; the voice stops, and a quiet calm comes on his place.
function goodOrQuiet(): SignArt {
  const at: [number, number] = [76, 96];
  const visitor: [number, number] = [58, 97];
  return {
    kind: "good-or-quiet",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(30, 18) },
      { name: "clouds", svg: cloud(130, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his home", svg: home(84, 92, 22, 16) },
      { name: "the home next door", svg: home(120, 92, 20, 15, "#C9A777", "#AF9064") },
      { name: "a calm between the two homes", svg: wash(104, 90, 14, 5, "#FFF6D8", 0.1), keys: showFrom(0.27, 0.31), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "a warm glow on the home next door, at ease", svg: glow(120, 85, 12, WARM, 0.1), keys: showFrom(0.3, 0.34), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a light within his place, his faith", svg: glow(at[0], at[1], 4.6, "#FFC83A", 0.36), keys: showFrom(0.05, 0.09), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "someone's place, by his home", svg: someone(at[0], at[1], 2) },
      { name: "a visitor's way, coming", svg: way(`M2 99 C20 103 40 102 ${visitor[0] - 3.4} 98`, BROWN), keys: showFrom(0.47, 0.52) },
      { name: "a warm glow of welcome", svg: glow(67, 98.6, 11, WARM, 0.14), keys: showFrom(0.59, 0.63), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a visitor's place", svg: someone(visitor[0], visitor[1], 1.9), keys: showFrom(0.51, 0.53) },
      { name: "a cloth, spread for the visitor", svg: `<rect x="60" y="99.4" width="18" height="5" rx="1.2" fill="#E9D5B0" stroke="#C9A877" stroke-width="0.5"/>`, keys: showFrom(0.55, 0.57) },
      {
        name: "a dish and a cup on it",
        svg: `<ellipse cx="66.4" cy="101.6" rx="3.6" ry="1.5" fill="#B98552"/><ellipse cx="66.4" cy="101.1" rx="2.7" ry="0.9" fill="#E8BE55"/><path d="M72.6 98.8 L76 98.8 L75.5 102.6 L73.1 102.6 Z" fill="#E8DCC4" stroke="#B9A585" stroke-width="0.3"/>`,
        keys: showFrom(0.57, 0.59)
      },
      { name: "a voice from his place, saying good", svg: arcs(at[0] + 3.8, at[1] - 3, GOLD), keys: showWhile(0.72, 0.74, 0.83, 0.85), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks(
        "good words, rising",
        [
          [at[0] + 6, at[1] - 6],
          [at[0] + 10, at[1] - 8],
          [at[0] + 14, at[1] - 6]
        ],
        0.75,
        0.02,
        { color: SPARK, rise: 14, stay: true }
      ),
      { name: "a quiet calm on his place", svg: wash(at[0], at[1], 10, 3.4, "#FFFBEA", 0.2), keys: showFrom(0.87, 0.91), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "Anybody who believes in Allah and the Last Day", from: 0.02, to: 0.22 },
      { text: "Should not harm his neighbor", from: 0.24, to: 0.44 },
      { text: "Should entertain his guest generously", from: 0.46, to: 0.68 },
      { text: "Should talk what is good or keep quiet", from: 0.7, to: 1 }
    ]
  };
}

// Then remain steadfast. Sufyan ibn Abdullah ath-Thaqafi said: I asked the Messenger of Allah ﷺ to tell me something
// about Islam that I need ask no one other than him about. He said: Say: I affirm my faith in Allah, and then remain
// steadfast to it (Sahih Muslim 38). No one is drawn: by the masjid, a golden ring, his place; a way comes to ask, and a
// voice asks; far places stay dim, not asked; a voice answers from the golden ring, and a light comes within the one who
// asked; then a straight way to the far land, ways turning off it, and his place goes on along the straight way, never
// turning, to a light at its end.
function thenSteadfast(): SignArt {
  const asks: [number, number] = [62, 98];
  const end: [number, number] = [112, 64.4];
  const along: [number, number, number][] = [
    [0.76, 0, 0],
    [0.94, n(end[0] - asks[0]), n(end[1] + 1.6 - asks[1])]
  ];
  const far: [number, number][] = [
    [124, 86],
    [138, 82],
    [150, 87]
  ];
  return {
    kind: "then-steadfast",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(2, 90, 0.95) },
      { name: "a golden ring, his place", svg: ring(40, 97, 3.2, GOLD) },
      { name: "a way, coming to ask", svg: way(`M158 103 C130 105 96 103 ${asks[0] + 4} 99.4`, BROWN), keys: showFrom(0.03, 0.1) },
      { name: "far places, not asked", svg: far.map(([x, y]) => someone(x, y, 1.6, "#A89F94")).join(""), keys: showFrom(0.28, 0.32) },
      { name: "a voice from him, asking", svg: arcsLeft(asks[0] - 3.6, asks[1] - 3, VOICE), keys: showWhile(0.11, 0.13, 0.4, 0.42), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from his place, answering", svg: arcs(43.8, 94, GOLD), keys: showFrom(0.5, 0.52), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the straight way ahead", svg: way(`M${asks[0] + 1.6} ${asks[1] - 2} L${end[0]} ${n(end[1] + 2)}`, GOLD, 1.3), keys: showFrom(0.69, 0.72) },
      {
        name: "ways turning off",
        svg: way("M74 89.4 C68 86 60 85 52 86", "#A89F94", 0.9) + way("M90.6 79.2 C97 79.8 103 82.8 109 87", "#A89F94", 0.9) + way("M100.6 73.4 C95.6 71 89.6 70.2 83.6 70.6", "#A89F94", 0.9),
        keys: showFrom(0.72, 0.75)
      },
      { name: "a light at the end of the straight way", svg: glow(end[0], end[1], 9, WARM, 0.2), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "a light within the one who asked, faith",
        svg: glow(asks[0], asks[1], 4.6, "#FFC83A", 0.42),
        origin: { x: asks[0], y: asks[1] },
        keys: track({
          opacity: [
            [0.56, 0],
            [0.6, 1]
          ],
          xy: along,
          scale: [
            [0.76, 1],
            [0.94, 0.6]
          ]
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      },
      {
        name: "someone asking, then going on steadily",
        svg: someone(asks[0], asks[1], 2),
        origin: { x: asks[0], y: asks[1] },
        keys: track({
          opacity: [
            [0.09, 0],
            [0.11, 1]
          ],
          xy: along,
          scale: [
            [0.76, 1],
            [0.94, 0.6]
          ]
        })
      }
    ],
    words: [
      { text: "Tell me something about Islam", from: 0.02, to: 0.24 },
      { text: "That I need ask no one other than you", from: 0.26, to: 0.46 },
      { text: "Say: I affirm my faith in Allah", from: 0.48, to: 0.66 },
      { text: "And then remain steadfast to it", from: 0.68, to: 1 }
    ]
  };
}

export const SPEECH_ART = {
  "two-words": twoWords,
  "half-of-faith": halfOfFaith,
  "three-signs": threeSigns,
  "call-to-good": callToGood,
  "praise-each-bite": praiseEachBite,
  "good-or-quiet": goodOrQuiet,
  "then-steadfast": thenSteadfast
} as const;
