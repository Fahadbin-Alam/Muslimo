import { animalAt, cloud, glow, n, nightSky, palm, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { GREY, prayerMat } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * What he ﷺ taught of the heart, and of the Quran, drawn as the scenes of ways he taught are (sunnahArt.ts): Allah is
 * Gentle and loves gentleness; Allah looks at hearts; the best way to ask forgiveness; ten blessings for one; what he
 * recited in Fajr on Friday; learning the Quran from four; and young Ibn Abbas among the elders of Badr. Only the land,
 * the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not
 * even a hand or a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle,
 * and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a du'a, or a
 * blessing sent, is a spark that rises, and what Allah gives is a light that comes about its place. Paradise is only far
 * off, in a soft circle of light with no sun in it, and no Quran is written out: a recitation is a voice, with a golden
 * band for how long it is.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A point of a move: when, and how far across and down. */
type At = [number, number, number];

/** A place at night: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** A dashed ring of care on the ground about (x, y), `rx` across and `ry` high. */
const care = (x: number, y: number, rx: number, ry: number, color = GOLD) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="none"/>`;

/** Keys that show a part at `from` (at once) and lift it by `rise` by `to`, where it stays. */
const risesAndStays = (from: number, to: number, rise: number): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, n(-rise * 0.15), -rise]
});

/** A harsh voice: three jagged grey marks from (x, y), facing right. */
const harsh = (x: number, y: number, color = GREY) =>
  [0, 1, 2]
    .map((i) => {
      const ax = n(x + i * 2.2);
      const h = 1.6 + i * 1.1;
      return `<path d="M${ax} ${n(y - h)} L${n(ax + h * 0.5)} ${n(y - h * 0.35)} L${ax} ${n(y + h * 0.3)} L${n(ax + h * 0.5)} ${n(y + h)}" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");

/** The same harsh voice, facing left, from (x, y). */
const harshLeft = (x: number, y: number, color = GREY) =>
  [0, 1, 2]
    .map((i) => {
      const ax = n(x - i * 2.2);
      const h = 1.6 + i * 1.1;
      return `<path d="M${ax} ${n(y - h)} L${n(ax - h * 0.5)} ${n(y - h * 0.35)} L${ax} ${n(y + h * 0.3)} L${n(ax - h * 0.5)} ${n(y + h)}" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");

/** A trough for animals, its middle at (x, y), `w` wide; with water in it, or dry. */
const trough = (x: number, y: number, w: number, water = true) =>
  `<rect x="${n(x - w / 2)}" y="${n(y - 2.6)}" width="${w}" height="2.6" rx="0.4" fill="#9A7650"/>` +
  `<rect x="${n(x - w / 2 + 0.6)}" y="${n(y - 2.3)}" width="${n(w - 1.2)}" height="1" fill="${water ? "#8CC8EA" : "#B8996C"}"/>`;

/** Paradise far off: a soft circle of light with no sun in it, its middle at (x, y). */
const farOff = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF8E6" opacity="0.92" stroke="#E8D8B0" stroke-width="0.6"/>` + glow(x, y, n(r * 0.8), "#FFF3C0", 0.3);

/** A garden low in a far circle of light about (x, y), `r` across: green ground and three small trees. */
const gardenIn = (x: number, y: number, r: number) =>
  `<path d="M${n(x - r * 0.86)} ${n(y + r * 0.4)} Q${x} ${n(y + r * 0.06)} ${n(x + r * 0.86)} ${n(y + r * 0.4)} Q${x} ${n(y + r * 0.9)} ${n(x - r * 0.86)} ${n(y + r * 0.4)} Z" fill="#9FD487"/>` +
  [-0.45, 0, 0.45]
    .map((k) => {
      const tx = n(x + r * k);
      const ty = n(y + r * 0.3);
      return `<path d="M${tx} ${ty} L${tx} ${n(ty - r * 0.22)}" stroke="#7A5A38" stroke-width="0.5"/><circle cx="${tx}" cy="${n(ty - r * 0.3)}" r="${n(r * 0.13)}" fill="#5FA344"/>`;
    })
    .join("");

/** The day: sky, sun, a cloud or two, the hills and the land. */
const dayAround = (sunAt: [number, number], ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "clouds", svg: cloud(46, 28, 0.6, "#FFFFFF", 0.9) + cloud(104, 22, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: land() }
];

/** Palms of Madinah at the given feet, each `h` high, swaying a little. */
const palms = (list: [number, number, number][]): SignPart[] =>
  list.map(([x, y, h], i) => ({ name: `a palm of Madinah ${i + 1}`, svg: palm(x, y, h), origin: { x, y }, loop: { move: "sway", ms: 5200 + i * 600, angle: 1.4, phase: i / 3 } }));

/** A dark land at night, from y `top` down, with a few tufts. */
const nightLand = (top: number, tufts: [number, number][]) =>
  `<rect y="${top}" width="160" height="${120 - top}" fill="#2E3556"/><path d="M0 ${top} L160 ${top}" stroke="#454B6A" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("");

/** An evening sky, warm, lighter low down. */
export const EVENING = `<rect width="160" height="62" fill="#F3C9A0"/><rect y="36" width="160" height="26" fill="#F7D9B4"/><rect y="52" width="160" height="10" fill="#FBE6C8"/>`;

/** A camel of the picture cards, `s` times its size, with its feet at (x, y). */
const camel = (x: number, y: number, s: number, left = false) => animalAt("camel", n(x - 50 * s), n(y - 73 * s), s, left);

// Gentleness. Aishah, the wife of the Prophet ﷺ, said: the Messenger of Allah ﷺ said: O Aishah, Allah is Gentle and
// loves gentleness, and He gives for gentleness what He does not give for harshness, and what He does not give for
// anything besides it (Sahih Muslim 2593). No one is drawn: by the masjid of Madinah his place is a golden ring, and his
// voice speaks to the place of the one beside him. Then a soft golden way goes to the water, and a soft light is over
// it; a place walks ahead of its young camel along it, speaking softly, and the camel follows it gently to the trough,
// and a warm glow and small lights come on them there. Far off, another place speaks harshly, with grey, jagged marks,
// and its camel turns from it and goes off; a grey shade comes over them, and their trough stays dry. Then a soft ring
// of light comes about the gentle pair, grass grows by their water, and more small lights come about them.
function gentleness(): SignArt {
  const his: [number, number] = [22, 105];
  const beside: [number, number] = [30, 106.2];
  const s = 0.16;
  const gentle: [number, number] = [86, 105.4];
  const feet: [number, number] = [74, 106.8];
  const mouth: [number, number] = [n(feet[0] + 43 * s), n(feet[1] - 55.5 * s)];
  const walk = 64;
  const steps: At[] = [
    [0.34, 0, 0],
    [0.48, walk, 0]
  ];
  const walking = () => track({ xy: steps });
  const far = 0.12;
  const harshAt: [number, number] = [104, 93];
  const farFeet: [number, number] = [92, 94];
  const water: [number, number] = [145, 103.6];
  const given: [number, number][] = [
    [134, 97.4],
    [146, 94],
    [156, 97.8]
  ];
  const more: [number, number][] = [
    [128, 101],
    [139, 95],
    [151, 93.2],
    [157.6, 103]
  ];
  return {
    kind: "gentleness",
    ms: 12000,
    parts: [
      ...dayAround([140, 18], 12000),
      ...palms([
        [46, 99, 16],
        [156, 99, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 0.5) },
      { name: "his home beside the masjid", svg: home(36, 100, 9, 6.5) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of the one he spoke to", svg: someone(beside[0], beside[1]) },
      { name: "his voice: He is Gentle", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.03, 0.04), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a trough far off, dry", svg: trough(136, 94.4, 8, false) },
      { name: "a trough with water", svg: trough(water[0], water[1], 9) },
      { name: "the water in it, glinting", svg: sparkle(n(water[0] - 2.4), n(water[1] - 1.8), 0.8, "#FFFFFF") + sparkle(n(water[0] + 2.6), n(water[1] - 2), 0.7, "#FFFFFF"), loop: { move: "twinkle", ms: 1400, low: 0.3 } },
      { name: "the gentle way: a soft golden way to the water", svg: way("M90 107 Q118 105.2 148 106.8", "#FFE7A0", 1), keys: showFrom(0.18, 0.22) },
      { name: "loved: a soft light over the gentle way", svg: wash(119, 106, 30, 4.4, "#FFF6DA", 0.26), keys: showFrom(0.2, 0.26), loop: { move: "twinkle", ms: 2000, low: 0.7 } },
      { name: "the gentle one's place, walking ahead", svg: someone(gentle[0], gentle[1]), keys: walking() },
      { name: "a soft lead rope", svg: `<path d="M${mouth[0]} ${mouth[1]} Q${n(mouth[0] + 1.6)} ${n(mouth[1] + 5)} ${n(gentle[0] - 1.4)} ${n(gentle[1] - 0.6)}" stroke="#8A6440" stroke-width="0.45" fill="none"/>`, keys: walking() },
      { name: "its young camel, following gently", svg: camel(feet[0], feet[1], s), keys: walking(), loop: { move: "bob", ms: 1300, y: -0.3, rotate: 0.4 } },
      {
        name: "its voice, soft: round arcs",
        svg: arcs(n(gentle[0] + 2.6), n(gentle[1] - 4), "#E8A93A"),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.345, 1],
            [0.55, 1],
            [0.555, 0]
          ],
          xy: steps
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.55 }
      },
      { name: "given for gentleness: a warm glow on them", svg: wash(144, 103, 15, 4.6, WARM, 0.3), keys: showFrom(0.47, 0.49), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      ...given.map(([x, y], i): SignPart => ({ name: `given for gentleness: a small light ${i + 1}`, svg: sparkle(x, y, 1.4, "#FFE7A0"), keys: showFrom(at3(0.475 + i * 0.004), at3(0.48 + i * 0.004)), loop: { move: "twinkle", ms: 1200, low: 0.5, phase: i / 3 } })),
      { name: "the harsh one's place", svg: someone(harshAt[0], harshAt[1], 1.2) },
      {
        name: "its camel, turning from it and going off",
        svg: camel(farFeet[0], farFeet[1], far),
        origin: { x: n(farFeet[0] - 6 * far), y: n(farFeet[1] - 32 * far) },
        keys: track({
          scaleX: [
            [0.58, 1],
            [0.6, -1]
          ],
          xy: [
            [0.6, 0, 0],
            [0.67, -12, 0]
          ]
        }),
        loop: { move: "bob", ms: 1100, y: -0.25, rotate: 0.5 }
      },
      { name: "its voice, harsh: grey, jagged marks", svg: harsh(n(harshAt[0] + 2.4), n(harshAt[1] - 3.6)), keys: showWhile(0.56, 0.57, 0.75, 0.755), loop: { move: "twinkle", ms: 700, low: 0.45 } },
      { name: "for harshness: a grey shade over them", svg: wash(98, 91.6, 15, 4, GREY, 0.22), keys: showFrom(0.6, 0.65) },
      { name: "for gentleness, more: a soft ring of light about them", svg: care(144, 105.4, 15, 3.8), keys: showFrom(0.76, 0.8), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "grass growing by their water",
        svg: tuft(131, 108.4, "#5FA344", 4) + tuft(135, 108.8, "#5FA344", 3.2) + tuft(154, 108.6, "#5FA344", 4),
        origin: { x: 142, y: 108.8 },
        keys: track({
          opacity: [
            [0.78, 0],
            [0.785, 1]
          ],
          scaleY: [
            [0.785, 0.1],
            [0.86, 1]
          ]
        })
      },
      ...more.map(([x, y], i): SignPart => ({ name: `for gentleness, more: a small light ${i + 1}`, svg: sparkle(x, y, 1.2, "#FFE7A0"), keys: showFrom(at3(0.82 + i * 0.012), at3(0.826 + i * 0.012)), loop: { move: "twinkle", ms: 1300, low: 0.5, phase: i / 4 } }))
    ],
    words: [
      { text: "O Aishah, Allah is Gentle", from: 0.02, to: 0.15 },
      { text: "And He loves gentleness", from: 0.17, to: 0.31 },
      { text: "He gives for gentleness", from: 0.33, to: 0.53 },
      { text: "What He does not give for harshness", from: 0.55, to: 0.73 },
      { text: "Nor for anything else besides it", from: 0.75, to: 1 }
    ]
  };
}

// Allah looks at hearts. Abu Hurairah said: the Messenger of Allah ﷺ said: Allah does not look at your bodies, nor at
// your faces, but He looks at your hearts; and he pointed to his chest with his fingers (Sahih Muslim 2564b). No one is
// drawn, not a body and not a face: by the masjid of Madinah his place is a golden ring, and his voice speaks to the
// places of four before him. A ring on the ground by each shows how big it looks, one wide, one small; the rings go
// faint. Fine colors are about each; they go faint too. Then in the middle of each place a light comes, one after
// another, and stays; and a soft light comes in the middle of his own place.
function looksAtHearts(): SignArt {
  const his: [number, number] = [22, 105];
  const xs = [62, 86, 110, 134];
  const y = 104;
  const sizes = [9, 4.6, 7.4, 5.8];
  const colors = ["#E07A6A", "#6AA0E0", "#7CC07A", "#B58AD8"];
  return {
    kind: "looks-at-hearts",
    ms: 10000,
    parts: [
      ...dayAround([140, 18], 10000),
      ...palms([
        [44, 99, 15],
        [154, 99, 16]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 0.5) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, speaking", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.03, 0.04), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...xs.map(
        (x, i): SignPart => ({
          name: `how big it looks: a ring on the ground ${i + 1}`,
          svg: `<ellipse cx="${x}" cy="${n(y + 2.4)}" rx="${sizes[i]}" ry="${n(sizes[i] * 0.32)}" stroke="#A88B60" stroke-width="0.8" fill="#C9AE80" fill-opacity="0.35"/>`,
          keys: track({
            opacity: [
              [0.1, 1],
              [0.17, 0.2]
            ]
          })
        })
      ),
      ...xs.map(
        (x, i): SignPart => ({
          name: `how it looks: fine colors about it ${i + 1}`,
          svg: wash(x, n(y - 0.6), 5.6, 4.4, colors[i], 0.32),
          keys: track({
            opacity: [
              [0.33, 1],
              [0.41, 0.12]
            ]
          })
        })
      ),
      ...xs.map((x, i): SignPart => ({ name: `a place before him ${i + 1}`, svg: someone(x, y, 1.6) })),
      ...xs.map(
        (x, i): SignPart => ({
          name: `its heart: a light in its middle ${i + 1}`,
          svg: glow(x, y, 3.6, WARM, 0.36) + sparkle(x, y, 1.1, "#E8A93A"),
          keys: showFrom(at3(0.52 + i * 0.03), at3(0.53 + i * 0.03)),
          loop: { move: "twinkle", ms: 1500, low: 0.65, phase: i / 4 }
        })
      ),
      { name: "pointed to: a soft light in the middle of his place", svg: glow(his[0], his[1], 3.8, WARM, 0.4) + sparkle(his[0], his[1], 1.1, "#E8A93A"), keys: showFrom(0.78, 0.82), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Allah does not look at your bodies", from: 0.02, to: 0.24 },
      { text: "Nor at your faces", from: 0.26, to: 0.48 },
      { text: "But He looks at your hearts", from: 0.5, to: 0.74 },
      { text: "And he pointed to his chest", from: 0.76, to: 1 }
    ]
  };
}

// The best way to ask forgiveness. Shaddad ibn Aws said: the Prophet ﷺ said: the best way to ask forgiveness is to say:
// O Allah, You are my Lord, there is no god but You; You created me, and I am Your slave, and I keep Your covenant and
// promise as much as I can; I seek refuge in You from the evil of what I have done; I admit to You Your favor on me, and
// I admit my sin, so forgive me, for none forgives sins but You. And he said: whoever says it by day, sure of it, and
// dies that day before evening, is of the people of Paradise; and whoever says it by night, sure of it, and dies before
// morning, is of the people of Paradise (Sahih al-Bukhari 6306). No one is drawn: by the masjid his place is a golden
// ring, and his voice teaches it; by a home, a place on a prayer mat says it, and its words rise as sparks; a warm glow
// comes about it for His favor, and a grey mark by it for its sin; it asks to be forgiven, and the grey mark shrinks and
// goes; a steady ring of light comes about it, sure of it, as the sun goes on toward evening; and far off a soft circle
// of light shows, with a garden in it, and a warm glow comes on its place.
function bestForgiveness(): SignArt {
  const his: [number, number] = [22, 105];
  const at: [number, number] = [100, 105.6];
  const sin: [number, number] = [110, 99.4];
  return {
    kind: "best-forgiveness",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "evening coming: a warm sky", svg: EVENING, keys: showFrom(0.86, 0.91) },
      {
        name: "the sun, going on toward evening",
        svg: sun(32, 16),
        keys: track({
          xy: [
            [0.72, 0, 0],
            [0.79, 106, 36]
          ]
        })
      },
      { name: "clouds", svg: cloud(60, 30, 0.6, "#FFFFFF", 0.9) + cloud(112, 22, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([[50, 99, 15]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 0.5) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: the best way to ask forgiveness", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.03, 0.04, 0.15, 0.155), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a home", svg: home(130, 101, 14, 9) },
      { name: "a prayer mat by the home", svg: prayerMat(at[0], n(at[1] + 1.8)) },
      { name: "the place of the one who says it", svg: someone(at[0], at[1], 1.5) },
      { name: "its voice, saying it", svg: arcs(n(at[0] + 2.8), n(at[1] - 4.4), VOICE), keys: showWhile(0.15, 0.16, 0.71, 0.715), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "its words, rising: You are my Lord", svg: sparkle(96, 98, 1.8, "#E8A93A"), keys: risesAndStays(0.16, 0.22, 16), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "its words, rising: I am Your slave", svg: sparkle(104, 97, 1.6, "#E8A93A"), keys: risesAndStays(0.3, 0.36, 12), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: 0.3 } },
      { name: "His favor on it: a warm glow about its place", svg: glow(at[0], n(at[1] - 1), 7, WARM, 0.3), keys: showFrom(0.44, 0.48), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      {
        name: "its sin, admitted: a grey mark by it, then forgiven",
        svg: `<ellipse cx="${sin[0]}" cy="${sin[1]}" rx="3.2" ry="1.9" fill="${GREY}" opacity="0.75"/><ellipse cx="${n(sin[0] + 1.6)}" cy="${n(sin[1] - 1)}" rx="2" ry="1.4" fill="${GREY}" opacity="0.6"/>`,
        origin: { x: sin[0], y: sin[1] },
        keys: track({
          opacity: [
            [0.47, 0],
            [0.5, 1],
            [0.59, 1],
            [0.64, 0]
          ],
          scale: [
            [0.59, 1],
            [0.64, 0.3]
          ]
        })
      },
      { name: "its words, rising: forgive me", svg: sparkle(98, 97, 1.8, "#E8A93A"), keys: risesAndStays(0.58, 0.64, 14), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: 0.6 } },
      { name: "sure of it: a steady ring of light about its place", svg: care(at[0], n(at[1] + 1.2), 11, 3.2), keys: showFrom(0.72, 0.76), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      { name: "far off: a soft circle of light, with no sun in it", svg: farOff(40, 32, 13), keys: showFrom(0.87, 0.91) },
      { name: "a garden in it", svg: gardenIn(40, 32, 13), keys: showFrom(0.88, 0.92) },
      { name: "of Paradise: a warm glow on its place", svg: glow(at[0], n(at[1] - 1), 5, WARM, 0.42), keys: showFrom(0.89, 0.93), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "The best way to ask forgiveness is to say", from: 0.02, to: 0.13 },
      { text: "O Allah, You are my Lord, no god but You", from: 0.15, to: 0.27 },
      { text: "You created me, and I am Your slave", from: 0.29, to: 0.41 },
      { text: "I admit Your favor on me, and admit my sin", from: 0.43, to: 0.55 },
      { text: "So forgive me: none forgives sins but You", from: 0.57, to: 0.69 },
      { text: "Who says it by day, sure, and dies that day", from: 0.71, to: 0.83 },
      { text: "Before evening, is of the people of Paradise", from: 0.85, to: 1 }
    ]
  };
}

// Ten blessings for one. Abu Hurairah said: the Messenger of Allah ﷺ said: whoever sends blessings on me once, Allah
// sends blessings on him ten times (Sahih Muslim 408). No one is drawn: by a home, a place says it, and one spark rises
// from it, high and out of sight, and one small mark lights: once. Then ten soft lights come about its place, one after
// another, and stay, each with a small mark of the ten; and a warm glow comes on its place.
function tenBlessings(): SignArt {
  const at: [number, number] = [80, 103];
  const lights = Array.from({ length: 10 }, (_, i): [number, number] => {
    const turn = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return [n(at[0] + 15 * Math.cos(turn)), n(at[1] - 3 + 7.4 * Math.sin(turn))];
  });
  const from = (i: number) => at3(0.53 + i * 0.035);
  return {
    kind: "ten-blessings",
    ms: 8000,
    parts: [
      ...dayAround([138, 18], 8000),
      ...palms([
        [18, 99, 16],
        [150, 100, 14]
      ]),
      { name: "a home", svg: home(112, 101, 14, 9) },
      { name: "the place of the one who sends them", svg: someone(at[0], at[1], 1.5) },
      { name: "its voice, sending blessings on him", svg: arcs(n(at[0] + 2.8), n(at[1] - 4.4), VOICE), keys: showWhile(0.04, 0.05, 0.5, 0.51), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "sent once: a spark rising out of sight",
        svg: sparkle(at[0], n(at[1] - 8), 2.2, "#E8A93A") + glow(at[0], n(at[1] - 8), 3.4, WARM, 0.22),
        keys: { at: [0, 0.1, 0.105, 0.34, 0.38], opacity: [0, 0, 1, 1, 0], y: [0, 0, -2, -46, -52] },
        loop: { move: "twinkle", ms: 1000, low: 0.6 }
      },
      { name: "once: one small mark", svg: `<circle cx="22" cy="15" r="1.8" fill="${WARM}" stroke="${GOLD}" stroke-width="0.6"/>`, keys: showFrom(0.12, 0.14) },
      ...lights.map(
        ([x, y], i): SignPart => ({
          name: `ten blessings on it: a soft light ${i + 1}`,
          svg: glow(x, y, 2.8, WARM, 0.3) + sparkle(x, y, 1.3, "#E8A93A"),
          keys: showFrom(from(i), at3(from(i) + 0.01)),
          loop: { move: "twinkle", ms: 1300, low: 0.6, phase: i / 10 }
        })
      ),
      ...lights.map(
        (_, i): SignPart => ({
          name: `ten times: a small mark ${i + 1}`,
          svg: `<circle cx="${n(52 + i * 7)}" cy="15" r="1.8" fill="${WARM}" stroke="${GOLD}" stroke-width="0.6"/>`,
          keys: showFrom(from(i), at3(from(i) + 0.01))
        })
      ),
      { name: "a warm glow on its place", svg: glow(at[0], n(at[1] - 1), 6, WARM, 0.36), keys: showFrom(0.89, 0.94), loop: { move: "twinkle", ms: 1700, low: 0.75 } }
    ],
    words: [
      { text: "Whoever sends blessings on me once", from: 0.02, to: 0.45 },
      { text: "Allah sends blessings on him ten times", from: 0.5, to: 1 }
    ]
  };
}

// Friday's Fajr. Abu Hurairah said: the Prophet ﷺ used to recite in the Fajr prayer on Friday Alif Lam Mim Tanzil,
// as-Sajdah, and Hal ata 'ala al-insan (Sahih al-Bukhari 891). No one is drawn: before the sun, the true dawn spreads
// white along the far side, and a soft golden light is over the masjid of Madinah for Friday; the rows come and stand
// behind his place, a golden ring; his voice recites, and a golden band on the wall fills for as-Sajdah, then a second
// for al-Insan, as the dawn grows and the stars fade. The sun has not risen by the end.
function fridayFajr(): SignArt {
  const his: [number, number] = [108, 104];
  const rows: [number, number][] = [
    ...[0, 1, 2, 3, 4, 5].map((i): [number, number] => [100 - i * 6, 104]),
    ...[0, 1, 2, 3, 4, 5].map((i): [number, number] => [97 - i * 6, 108])
  ];
  const band = (y: number, w: number) => `<rect x="44" y="${y}" width="${w}" height="1.8" rx="0.9" fill="${GOLD}"/>`;
  return {
    kind: "friday-fajr",
    ms: 10000,
    parts: [
      { name: "the sky before dawn", svg: nightSky(86) },
      {
        name: "the dawn, growing",
        svg: `<rect width="160" height="86" fill="#7C8DBE" opacity="0.55"/><rect y="52" width="160" height="34" fill="#C9D3EA" opacity="0.5"/><rect y="72" width="160" height="14" fill="#F1D9C0" opacity="0.6"/>`,
        keys: track({
          opacity: [
            [0.34, 0],
            [0.6, 0.5],
            [0.67, 0.5],
            [0.95, 1]
          ]
        })
      },
      {
        name: "stars, fading",
        svg: stars([
          [10, 14],
          [28, 30],
          [44, 12],
          [64, 26],
          [84, 13],
          [102, 30],
          [124, 16],
          [142, 32],
          [154, 12],
          [18, 52],
          [136, 54]
        ]),
        keys: track({
          opacity: [
            [0.34, 1],
            [0.6, 0.6],
            [0.67, 0.6],
            [0.95, 0.15]
          ]
        }),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the true dawn: white along the far side", svg: `<rect y="78" width="160" height="8" fill="#EEF2FA" opacity="0.45"/><path d="M0 85.2 L160 85.2" stroke="#F7F9FD" stroke-width="0.8"/>`, keys: showFrom(0.05, 0.12) },
      { name: "the land", svg: nightLand(86, [[14, 114], [60, 92], [150, 114], [128, 92]]) },
      { name: "palms", svg: palm(140, 104, 20, "#3E6B39") + palm(156, 102, 16, "#3E6B39") + palm(16, 103, 18, "#3E6B39") },
      { name: "the masjid of Madinah", svg: `<g opacity="0.92">${madinahMasjid(40, 101, 1.1)}</g>` },
      { name: "Friday: a soft golden light over the masjid", svg: glow(66, 90, 24, "#FFF3C0", 0.1), keys: showFrom(0.06, 0.12), loop: { move: "twinkle", ms: 2400, low: 0.7 } },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the rows, coming to stand behind him",
        svg: rows.map(([x, y]) => someone(x, y, 1.3, LIGHT)).join(""),
        keys: track({
          opacity: [
            [0.08, 0],
            [0.09, 1]
          ],
          xy: [
            [0.08, -16, 0],
            [0.2, 0, 0]
          ]
        })
      },
      { name: "his voice, reciting", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), LIGHT), keys: showFrom(0.33, 0.34), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "as-Sajdah: a golden band on the wall, filling",
        svg: band(86, 40),
        origin: { x: 44, y: 86.9 },
        keys: track({
          opacity: [
            [0.34, 0],
            [0.345, 1]
          ],
          scaleX: [
            [0.345, 0.05],
            [0.6, 1]
          ]
        })
      },
      {
        name: "al-Insan: a second golden band, filling",
        svg: band(90.2, 40),
        origin: { x: 44, y: 91.1 },
        keys: track({
          opacity: [
            [0.67, 0],
            [0.675, 1]
          ],
          scaleX: [
            [0.675, 0.05],
            [0.95, 1]
          ]
        })
      }
    ],
    words: [
      { text: "On Friday, in the Fajr prayer", from: 0.02, to: 0.3 },
      { text: "He recited Alif Lam Mim Tanzil, as-Sajdah", from: 0.32, to: 0.64 },
      { text: "And Hal ata 'ala al-insan", from: 0.66, to: 1 }
    ]
  };
}

// Learn the Quran from four. Masruq said: Abdullah ibn Mas'ud was spoken of before Abdullah ibn Amr, who said: that is a
// man I still love, since I heard the Messenger of Allah ﷺ say: take the recitation of the Quran from four: from Abdullah
// ibn Mas'ud (and he began with him), Salim the freed slave of Abu Hudhayfah, Ubayy ibn Ka'b and Mu'adh ibn Jabal
// (Sahih al-Bukhari 3758). No one is drawn: a voice speaks of the first of the four, and a warm glow comes on its place;
// by the masjid his place is a golden ring, and his voice says it; four places show; the first lights first, with a
// golden mark, and its voice recites, and the places of those who learn come and sit about it; then the second; then
// the third and the fourth.
function learnFromFour(): SignArt {
  const his: [number, number] = [22, 105];
  const four: [number, number][] = [
    [54, 96],
    [80, 94],
    [106, 95],
    [132, 96.4]
  ];
  const lit = [0.37, 0.56, 0.75, 0.81];
  const learners = (x: number, y: number): [number, number][] => [
    [x - 6, y + 5],
    [x, y + 6.6],
    [x + 6, y + 5]
  ];
  return {
    kind: "learn-from-four",
    ms: 12000,
    parts: [
      ...dayAround([140, 18], 12000),
      ...palms([
        [40, 99, 14],
        [156, 100, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 100, 0.5) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of the one who still loves him", svg: someone(150, 104, 1.4) },
      { name: "its voice: I still love him", svg: arcsLeft(146.6, 99.6, VOICE), keys: showWhile(0.03, 0.04, 0.19, 0.195), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "still loved: a warm glow on the first place", svg: glow(four[0][0], four[0][1], 5, WARM, 0.32), keys: showFrom(0.05, 0.09), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "his voice: learn from four", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.2, 0.21, 0.36, 0.365), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "the first of the four, its place",
        svg: someone(four[0][0], four[0][1], 1.6),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 0.5],
            [0.37, 0.5],
            [0.4, 1]
          ]
        })
      },
      ...four.slice(1).map(
        ([x, y], i): SignPart => ({
          name: `${["the second", "the third", "the fourth"][i]} of the four, its place`,
          svg: someone(x, y, 1.6),
          keys: track({
            opacity: [
              [0.22, 0],
              [0.26, 0.5],
              [lit[i + 1], 0.5],
              [at3(lit[i + 1] + 0.03), 1]
            ]
          })
        })
      ),
      { name: "he began with him: a golden spark over the first", svg: sparkle(four[0][0], n(four[0][1] - 6.4), 1.8, GOLD), keys: showFrom(0.37, 0.4), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      ...four.map(
        ([x, y], i): SignPart => ({
          name: `${["the first", "the second", "the third", "the fourth"][i]} of the four, reciting: a voice`,
          svg: arcs(n(x + 2.6), n(y - 4), GOLD),
          keys: showFrom(at3(lit[i] + 0.01), at3(lit[i] + 0.02)),
          loop: { move: "twinkle", ms: 1000 + i * 100, low: 0.5, phase: i / 4 }
        })
      ),
      ...four.map(
        ([x, y], i): SignPart => ({
          name: `${["the first", "the second", "the third", "the fourth"][i]} of the four, lit: a soft light`,
          svg: glow(x, y, 4, "#FFF3C0", 0.3),
          keys: showFrom(lit[i], at3(lit[i] + 0.03)),
          loop: { move: "twinkle", ms: 1700, low: 0.75, phase: i / 4 }
        })
      ),
      ...four.map(
        ([x, y], i): SignPart => ({
          name: `learning from ${["the first", "the second", "the third", "the fourth"][i]}: places coming to sit`,
          svg: learners(x, y)
            .map(([lx, ly]) => someone(lx, ly, 1.1))
            .join(""),
          keys: track({
            opacity: [
              [at3(lit[i] + 0.02), 0],
              [at3(lit[i] + 0.025), 1]
            ],
            xy: [
              [at3(lit[i] + 0.02), 0, 10],
              [at3(lit[i] + 0.08), 0, 0]
            ]
          })
        })
      )
    ],
    words: [
      { text: "A man I still love, since I heard him say", from: 0.02, to: 0.17 },
      { text: "Learn to recite the Quran from four", from: 0.19, to: 0.34 },
      { text: "Abdullah ibn Mas'ud, and he began with him", from: 0.36, to: 0.53 },
      { text: "And Salim, freed slave of Abu Hudhayfah", from: 0.55, to: 0.72 },
      { text: "And Ubayy ibn Ka'b, and Mu'adh ibn Jabal", from: 0.74, to: 1 }
    ]
  };
}

// Young Ibn Abbas. Ibn Abbas said: Umar used to bring me in with the elders of Badr, and some of them felt it, and said:
// why do you bring this one in with us, when we have sons like him? Umar said: it is for what you know of him. One day
// he called them and brought me in with them, and I think he called me that day only to show them. He said: what do you
// say of the word of Allah: when the help of Allah comes, and the opening? Some of them said: we are told to praise
// Allah and ask His forgiveness when He helps us and opens for us. Some kept quiet and said nothing. Then he said to me:
// is that what you say, Ibn Abbas? I said: no. He said: then what do you say? I said: it is the end of the life of the
// Messenger of Allah ﷺ, which He made known to him (Sahih al-Bukhari 4970)... Umar said: I know of it only what you
// say. No one is drawn: under a shade of palm leaves the elders sit in a ring, and Umar's place is among them; the
// young one's place comes in and sits; two grey voices ask why; Umar's voice asks; three answer; three keep quiet,
// their places still and faint; the young one's voice says it, as the sun goes on toward evening; and Umar's voice
// answers, and a warm glow comes on the young one's place.
function youngIbnAbbas(): SignArt {
  const umar: [number, number] = [96, 95.4];
  const young: [number, number] = [96, 105.6];
  const elders: [number, number][] = [
    [72, 99],
    [80, 96.4],
    [112, 96.4],
    [120, 99],
    [112, 104.6],
    [80, 104.6]
  ];
  const asked = [0, 3];
  const answered = [1, 2, 4];
  const quiet = [0, 3, 5];
  return {
    kind: "young-ibn-abbas",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "toward evening: a warm sky", svg: EVENING, keys: showFrom(0.73, 0.79) },
      {
        name: "the sun, going on toward evening",
        svg: sun(118, 20),
        keys: track({
          xy: [
            [0.72, 0, 0],
            [0.79, 24, 32]
          ]
        })
      },
      { name: "clouds", svg: cloud(40, 28, 0.6, "#FFFFFF", 0.9) + cloud(92, 20, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [14, 100, 16],
        [30, 99, 13],
        [152, 100, 15]
      ]),
      {
        name: "a shade of palm leaves on posts",
        svg:
          `<path d="M60 81 L132 81 L130 78 L62 78 Z" fill="#6E8F3A"/><path d="M64 79.6 L70 78.6 M74 79.6 L80 78.6 M84 79.6 L90 78.6 M94 79.6 L100 78.6 M104 79.6 L110 78.6 M114 79.6 L120 78.6 M124 79.6 L130 78.6" stroke="#56742B" stroke-width="0.6"/>` +
          [64, 128].map((x) => `<rect x="${x - 0.7}" y="81" width="1.4" height="24" fill="#8A6A42"/>`).join("")
      },
      { name: "the shade on the ground", svg: wash(96, 101, 34, 7, "#6B5A3E", 0.06) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6) },
      ...elders.map(
        ([x, y], i): SignPart =>
          quiet.includes(i)
            ? {
                name: `the place of an elder of Badr ${i + 1}, keeping quiet`,
                svg: someone(x, y, 1.5),
                keys: track({
                  opacity: [
                    [0.58, 1],
                    [0.62, 0.5],
                    [0.72, 0.5],
                    [0.76, 1]
                  ]
                })
              }
            : { name: `the place of an elder of Badr ${i + 1}`, svg: someone(x, y, 1.5) }
      ),
      {
        name: "the young one's place, brought in",
        svg: someone(young[0], young[1], 1.1),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: [
            [0.03, -70, 0],
            [0.09, 0, 0]
          ]
        })
      },
      { name: "its way in", svg: way("M28 105.6 Q60 107 92 105.8", "#FFF0C4", 1), keys: showWhile(0.03, 0.04, 0.09, 0.095) },
      ...asked.map(
        (k, i): SignPart => ({
          name: `some of them: why this one? a grey voice ${i + 1}`,
          svg: elders[k][0] < umar[0] ? harsh(n(elders[k][0] + 2.4), n(elders[k][1] - 3.6)) : harshLeft(n(elders[k][0] - 2.4), n(elders[k][1] - 3.6)),
          keys: showWhile(0.16, 0.17, 0.29, 0.295),
          loop: { move: "twinkle", ms: 800, low: 0.45, phase: i / 2 }
        })
      ),
      { name: "Umar's voice, asking them", svg: arcs(n(umar[0] + 2.6), n(umar[1] - 4), VOICE), keys: showWhile(0.3, 0.31, 0.43, 0.435), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...answered.map(
        (k, i): SignPart => ({
          name: `some of them, answering: a voice ${i + 1}`,
          svg: elders[k][0] < umar[0] ? arcs(n(elders[k][0] + 2.4), n(elders[k][1] - 3.6), VOICE) : arcsLeft(n(elders[k][0] - 2.4), n(elders[k][1] - 3.6), VOICE),
          keys: showWhile(0.44, 0.45, 0.57, 0.575),
          loop: { move: "twinkle", ms: 900, low: 0.5, phase: i / 3 }
        })
      ),
      { name: "the young one's voice", svg: arcs(n(young[0] + 2.4), n(young[1] - 3.6), VOICE), keys: showWhile(0.72, 0.73, 0.85, 0.855), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Umar's voice: I know only what you say", svg: arcs(n(umar[0] + 2.6), n(umar[1] - 4), VOICE), keys: showFrom(0.86, 0.87), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a warm glow on the young one's place", svg: glow(young[0], young[1], 4.6, WARM, 0.42), keys: showFrom(0.87, 0.91), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "Umar brought me in with the elders of Badr", from: 0.02, to: 0.13 },
      { text: "Some said: why him? We have sons like him", from: 0.15, to: 0.27 },
      { text: "He asked about: When Allah's help comes", from: 0.29, to: 0.41 },
      { text: "Some said: we are to praise, ask forgiveness", from: 0.43, to: 0.55 },
      { text: "Some kept quiet and said nothing", from: 0.57, to: 0.69 },
      { text: "I said: it is his life's end, made known to him", from: 0.71, to: 0.83 },
      { text: "Umar said: I know of it only what you say", from: 0.85, to: 1 }
    ]
  };
}

export const HEART_ART = {
  gentleness,
  "looks-at-hearts": looksAtHearts,
  "best-forgiveness": bestForgiveness,
  "ten-blessings": tenBlessings,
  "friday-fajr": fridayFajr,
  "learn-from-four": learnFromFour,
  "young-ibn-abbas": youngIbnAbbas
};
