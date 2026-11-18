import { animalAt, cloud, glow, n, nightSky, peaks, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { showFrom } from "./storyArt";
import { home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { DARK, GREY } from "./lovedArt";
import { kabah } from "./historyArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * What truly counts, as the Prophet ﷺ taught it, drawn as the scenes of a good character are (characterArt.ts): what
 * Allah gives, which lessens nothing of what He has, like a needle dipped in the sea; hearts and deeds, not looks and
 * wealth; real strength, holding oneself in anger; a treasure of Paradise in a quiet word; the hundred grades of
 * Paradise and al-Firdaws above them; faith, even at the Pleiades; and the sanctuary of Makkah. Only the land, the sky,
 * the sea, buildings, things, plants and animals are drawn. No Prophet and no person is ever drawn, not even a hand or
 * a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is
 * arcs in the air. Nothing is drawn for Allah and nothing comes down from the sky: words and requests are sparks rising,
 * what He gives is a warm glow, and Paradise is a light far off, or gardens in a soft light.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** The red of anger. */
const RED = "#D8513A";

/** A light color for places, voices and ways at night. */
const PALE = "#E9E1D2";

/** A zigzag mark at (x, y), `w` across: a wrong, dark. */
const zigzag = (x: number, y: number, w: number, color = DARK) => {
  let d = `M${n(x)} ${n(y)}`;
  for (let i = 1; i <= 6; i += 1) d += ` L${n(x + (w * i) / 6)} ${n(y + (i % 2 ? -1.6 : 0))}`;
  return `<path d="${d}" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/** Short waves in a row at height y, from x to the right edge, `gap` apart. */
const waves = (x: number, y: number, gap: number, color: string) => {
  let d = "";
  for (let at = x; at < 158; at += gap) d += `M${n(at)} ${y} q${n(gap / 4)} -1.4 ${n(gap / 2)} 0 `;
  return `<path d="${d}" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;
};

/** A shallow dish, empty, its middle at (x, y). */
export const dish = (x: number, y: number) =>
  `<path d="M${n(x - 3.6)} ${n(y - 1)} Q${x} ${n(y + 1.6)} ${n(x + 3.6)} ${n(y - 1)} Z" fill="#B8864A"/><path d="M${n(x - 3.6)} ${n(y - 1)} L${n(x + 3.6)} ${n(y - 1)}" stroke="#946A34" stroke-width="0.4"/>`;

/** A needle, upright, its point at (x, y) and its eye at the top. */
const needle = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x - 0.6)} ${n(y - 3)} L${n(x - 0.6)} ${n(y - 17)} Q${x} ${n(y - 18.6)} ${n(x + 0.6)} ${n(y - 17)} L${n(x + 0.6)} ${n(y - 3)} Z" fill="#59616A"/>` +
  `<ellipse cx="${x}" cy="${n(y - 15.6)}" rx="0.3" ry="1.1" fill="#FFFFFF"/><path d="M${n(x + 0.25)} ${n(y - 3)} L${n(x + 0.25)} ${n(y - 13.6)}" stroke="#C9D0D6" stroke-width="0.25"/>`;

/** A heap of gold coins, its foot's middle at (x, y). */
export const goldHeap = (x: number, y: number, s = 1) =>
  [
    [-4, 0],
    [-1.4, 0.2],
    [1.4, 0.1],
    [4, 0.2],
    [-2.6, -1.4],
    [0, -1.3],
    [2.6, -1.4],
    [-1.3, -2.7],
    [1.3, -2.6],
    [0, -3.9]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx * s)}" cy="${n(y + (dy - 0.7) * s)}" rx="${n(1.6 * s)}" ry="${n(0.75 * s)}" fill="#E2B33C" stroke="#B8892A" stroke-width="0.3"/>`)
    .join("");

/** A small round tree, its foot at (x, y), `h` high. */
export const roundTree = (x: number, y: number, h: number, leaves = "#4F9A3C") =>
  `<path d="M${x} ${y} L${x} ${n(y - h * 0.55)}" stroke="#8A5A33" stroke-width="${n(h * 0.12)}"/><circle cx="${x}" cy="${n(y - h * 0.7)}" r="${n(h * 0.34)}" fill="${leaves}"/>`;

/** A grade of Paradise: a garden ledge about (x, y), `w` from its middle to its ends. */
const grade = (x: number, y: number, w: number, top = "#86C56E", face = "#D8C69A") =>
  `<ellipse cx="${x}" cy="${n(y + 2.2)}" rx="${w}" ry="3" fill="${face}"/><ellipse cx="${x}" cy="${y}" rx="${w}" ry="3" fill="${top}"/>` +
  `<path d="M${n(x - w * 0.8)} ${n(y - 1.4)} Q${x} ${n(y - 3.6)} ${n(x + w * 0.8)} ${n(y - 1.4)}" stroke="#FFFFFF" stroke-width="0.4" fill="none" opacity="0.5"/>`;

/** A thorny bush, its foot's middle at (x, y). */
const thornBush = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${y} Q${n(x - 5.4)} ${n(y - 5)} ${x} ${n(y - 6)} Q${n(x + 5.4)} ${n(y - 5)} ${n(x + 5)} ${y} Z" fill="#7F8C4A"/>` +
  `<path d="M${n(x - 4.2)} ${n(y - 3)} l-1.4 -0.6 M${n(x - 2)} ${n(y - 5.4)} l-0.8 -1.2 M${n(x + 1.6)} ${n(y - 5.6)} l0.8 -1.2 M${n(x + 4)} ${n(y - 3.4)} l1.4 -0.6 M${x} ${n(y - 6)} l0 -1.4 M${n(x - 3)} ${n(y - 1)} l-1.6 0.2 M${n(x + 3)} ${n(y - 1.2)} l1.6 0.2` +
  `" stroke="#5E6A33" stroke-width="0.45" stroke-linecap="round"/>`;

/** A small purse, tied at its neck, its foot's middle at (x, y). */
const purse = (x: number, y: number) =>
  `<path d="M${n(x - 2)} ${y} C${n(x - 2.6)} ${n(y - 2)} ${n(x - 1.4)} ${n(y - 3)} ${n(x - 0.6)} ${n(y - 3.2)} L${n(x + 0.6)} ${n(y - 3.2)} C${n(x + 1.4)} ${n(y - 3)} ${n(x + 2.6)} ${n(y - 2)} ${n(x + 2)} ${y} Z" fill="#8C5A2E"/>` +
  `<path d="M${n(x - 0.7)} ${n(y - 3.1)} L${n(x + 0.7)} ${n(y - 3.1)}" stroke="#E0B86A" stroke-width="0.5"/>`;

/** A treasure chest, its foot's middle at (x, y): its body, with bands of gold. */
const chest = (x: number, y: number) =>
  `<rect x="${n(x - 6)}" y="${n(y - 6)}" width="12" height="6" rx="0.6" fill="#8C5A2E"/>` +
  `<path d="M${n(x - 6)} ${n(y - 3)} L${n(x + 6)} ${n(y - 3)} M${n(x - 3.6)} ${n(y - 6)} L${n(x - 3.6)} ${y} M${n(x + 3.6)} ${n(y - 6)} L${n(x + 3.6)} ${y}" stroke="#E2B33C" stroke-width="0.7"/>` +
  `<rect x="${n(x - 0.9)}" y="${n(y - 4.2)}" width="1.8" height="2" fill="#E2B33C"/>`;

/** A treasure chest's lid, over the chest whose foot's middle is at (x, y). */
const chestLid = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${n(y - 6)} L${n(x - 6)} ${n(y - 7.4)} Q${x} ${n(y - 10.4)} ${n(x + 6)} ${n(y - 7.4)} L${n(x + 6)} ${n(y - 6)} Z" fill="#9E6A36" stroke="#E2B33C" stroke-width="0.6"/>`;

// The needle and the sea. The Prophet ﷺ said that Allah said: O My servants, I have forbidden oppression for Myself and
// have made it forbidden amongst you, so do not oppress one another. All of you are astray except those I have guided,
// so seek guidance of Me and I shall guide you; all of you are hungry except those I have fed, so seek food of Me and I
// shall feed you. Were the first of you and the last of you to rise up in one place and make a request of Me, and were
// I to give everyone what he requested, that would not decrease what I have, any more than a needle decreases the sea
// if put into it (Sahih Muslim 2577). Nothing is drawn for Allah, and no one is drawn: on a plain by the sea, the
// places of many; a dark mark of oppression shows and is gone, and a calm comes over the land; a dark crooked way goes
// from one place toward another and breaks off, and a calm comes between them; one wanders on a crooked way, a voice
// asks from it, a golden way shows to a light far off, and it goes on along it; one by an empty dish asks, and a basket
// of dates is by it, with a warm glow; then from every place a request rises, and a warm glow comes on each; a light
// runs over the full sea; last, a needle dips into the sea and comes up again, and the sea shines as full as before.
function needleInTheSea(): SignArt {
  const one: [number, number] = [28, 96];
  const other: [number, number] = [54, 97];
  const astray: [number, number] = [10, 106];
  const guided: [number, number] = [5.2, -13.6];
  const hungry: [number, number] = [80, 101];
  const rest: [number, number][] = [
    [40, 106],
    [66, 105],
    [93, 104],
    [70, 91]
  ];
  const everyone: [number, number][] = [one, other, [astray[0] + guided[0], astray[1] + guided[1]], hungry, ...rest];
  const point: [number, number] = [134, 80];
  return {
    kind: "needle-in-the-sea",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.34, "#FFFFFF", 0.9) + cloud(132, 14, 0.28, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the plain", svg: land() },
      {
        name: "the sea, wide and full",
        svg:
          `<path d="M98 120 C99 104 102 86 110 61 L160 61 L160 120 Z" fill="#3E86C1"/><path d="M110 61 L160 61 L160 65 L109 65 Z" fill="#5B9FD3"/>` +
          `<path d="M98 120 C99 104 102 86 110 61" stroke="#F1E6CC" stroke-width="1.2" fill="none"/>`
      },
      { name: "waves", svg: waves(111, 70, 10, "#7FB6E0") + waves(107, 81, 12, "#6AA8D8") + waves(104, 93, 13, "#5E9DD0") + waves(102, 106, 14, "#5395CB"), loop: { move: "bob", ms: 3200, x: 1.6 } },
      { name: "the sun on the water", svg: [66, 72, 78].map((y, i) => sparkle(144 + (i % 2 ? 3 : -3), y, i % 2 ? 1 : 1.4, "#FFF6D0")).join(""), loop: { move: "twinkle", ms: 1600, low: 0.3 } },
      { name: "oppression, a dark mark", svg: zigzag(36, 92, 10), keys: track({ opacity: [[0.03, 0], [0.05, 1], [0.08, 1], [0.1, 0]] }) },
      { name: "a calm over all the land", svg: wash(52, 100, 52, 10, WARM, 0.07), keys: showFrom(0.07, 0.1) },
      ...everyone.slice(4).map((at, i): SignPart => ({ name: `a place on the plain ${i + 1}`, svg: someone(at[0], at[1], 1.5) })),
      { name: "someone's place", svg: someone(one[0], one[1], 1.6) },
      { name: "another's place", svg: someone(other[0], other[1], 1.6) },
      { name: "a dark crooked way toward the other, breaking off", svg: zigzag(31.6, 96.6, 18), keys: track({ opacity: [[0.16, 0], [0.18, 1], [0.2, 1], [0.22, 0]] }) },
      { name: "a calm between them", svg: glow(41, 96, 9, WARM, 0.16), keys: showFrom(0.2, 0.23), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a crooked way, astray", svg: way("M11 104 L4.6 99 L12 95 L5 90 L12.6 86", GREY, 0.8), keys: track({ opacity: [[0.285, 0], [0.3, 1], [0.34, 1], [0.36, 0]] }) },
      { name: "a voice from him, asking for guidance", svg: arcs(astray[0] + 3.4, astray[1] - 3.4, VOICE), keys: showWhile(0.3, 0.31, 0.33, 0.34), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a golden way, guidance", svg: way(`M${astray[0]} ${astray[1]} C14 92 24 74 38 56`, GOLD, 1.2), keys: showFrom(0.33, 0.35) },
      { name: "a light far off, at the end of the way", svg: glow(40, 54, 7, "#FFF3C0", 0.25) + sparkle(40, 54, 2, SPARK), keys: showFrom(0.33, 0.35), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "one astray, then guided", svg: someone(astray[0], astray[1], 1.5), keys: track({ xy: [[0.34, 0, 0], [0.37, guided[0], guided[1]]] }) },
      { name: "one who is hungry", svg: someone(hungry[0], hungry[1], 1.6) },
      { name: "an empty dish by him", svg: dish(hungry[0] + 7, hungry[1] + 2.4), keys: track({ opacity: [[0.47, 1], [0.49, 0]] }) },
      { name: "a voice from him, asking for food", svg: arcs(hungry[0] + 3.4, hungry[1] - 3.4, VOICE), keys: showWhile(0.43, 0.44, 0.46, 0.47), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a basket of dates, food given", svg: basketOfDates(hungry[0] + 7, hungry[1] + 3), keys: showFrom(0.47, 0.49) },
      { name: "a warm glow on him, fed", svg: glow(hungry[0] + 3, hungry[1], 7, WARM, 0.2), keys: showFrom(0.48, 0.51), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...everyone.map(
        ([x, y], i): SignPart => {
          const from = 0.57 + i * 0.006;
          return {
            name: `a request, rising ${i + 1}`,
            svg: sparkle(x, y - 4, i % 2 ? 1.6 : 2, SPARK),
            keys: track({
              opacity: [
                [from, 0],
                [from + 0.01, 1],
                [from + 0.05, 1],
                [from + 0.06, 0]
              ],
              xy: [
                [from, 0, 0],
                [from + 0.05, 0, -14]
              ]
            })
          };
        }
      ),
      ...everyone.map(
        ([x, y], i): SignPart => ({
          name: `a warm glow on each, given ${i + 1}`,
          svg: glow(x, y, 4.4, WARM, 0.22),
          keys: track({ opacity: [[0.64 + i * 0.004, 0], [0.66 + i * 0.004, 1]] }),
          loop: { move: "twinkle", ms: 1400, low: 0.7, phase: i / everyone.length }
        })
      ),
      {
        name: "a light running over the sea",
        svg: `<path d="M104 120 L110 120 L118 61 L113 61 Z" fill="#FFF6D0" opacity="0.32"/>`,
        keys: track({
          opacity: [
            [0.745, 0],
            [0.75, 1],
            [0.82, 1],
            [0.825, 0]
          ],
          xy: [
            [0.745, 0, 0],
            [0.825, 42, 0]
          ]
        })
      },
      {
        name: "a needle, dipped into the sea",
        svg: needle(point[0], point[1]),
        keys: track({
          opacity: [
            [0.885, 0],
            [0.895, 1]
          ],
          xy: [
            [0.895, 0, 0],
            [0.915, 0, 7],
            [0.935, 0, 7],
            [0.955, 0, 0]
          ]
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a ring on the water ${i + 1}`,
          svg: ring(point[0], point[1] + 7, 3.4, "#FFFFFF"),
          origin: { x: point[0], y: point[1] + 7 },
          keys: track({
            opacity: [
              [0.915 + i * 0.008, 0],
              [0.92 + i * 0.008, 1],
              [0.962, 0]
            ],
            scale: [
              [0.915 + i * 0.008, 0.4],
              [0.962, 1.8]
            ]
          })
        })
      ),
      { name: "so little on the needle, a glint", svg: sparkle(point[0], point[1] + 0.6, 1.3, "#FFFFFF"), keys: showFrom(0.955, 0.965) },
      { name: "the sea, as full as before, shining", svg: [118, 126, 140, 150].map((x, i) => sparkle(x, 88 + (i % 2 ? 10 : 0), 1.2, "#FFF6D0")).join(""), keys: showFrom(0.955, 0.965), loop: { move: "twinkle", ms: 1200, low: 0.4 } }
    ],
    words: [
      { text: "Allah: I forbade oppression for Myself", from: 0.02, to: 0.13 },
      { text: "So do not oppress one another", from: 0.15, to: 0.26 },
      { text: "Seek guidance of Me and I shall guide you", from: 0.28, to: 0.4 },
      { text: "Seek food of Me and I shall feed you", from: 0.42, to: 0.54 },
      { text: "Were all of you to ask, and I gave each one", from: 0.56, to: 0.72 },
      { text: "That would not decrease what I have", from: 0.74, to: 0.86 },
      { text: "Any more than a needle decreases the sea", from: 0.88, to: 1 }
    ]
  };
}

// Hearts and deeds. The Prophet ﷺ said: verily Allah does not look to your faces and your wealth, but He looks to your
// hearts and to your deeds (Sahih Muslim 2564c). Nothing is drawn for Allah, and no one is drawn, not even a face: by a
// fine home, a place fine to look at, sparkling, and a heap of gold; by a plain home, a plain place; the fine looks grow
// dim, and so does the gold; then a warm light shows within each place, a heart, and good deeds rise from them both.
function heartsAndDeeds(): SignArt {
  const fine: [number, number] = [48, 99.6];
  const plain: [number, number] = [110, 99.6];
  const rising = (at: [number, number], label: string, start: number, count: number): SignPart[] =>
    Array.from({ length: count }, (_, i) => {
      const from = start + i * 0.04;
      return {
        name: `${label} ${i + 1}`,
        svg: sparkle(at[0] + (i % 2 ? 3 : -3), at[1] - 5, i % 2 ? 2 : 2.4, SPARK),
        keys: track({
          opacity: [
            [from, 0],
            [from + 0.01, 1]
          ],
          xy: [
            [from, 0, 0],
            [from + 0.05, 0, -10 - i * 3]
          ]
        }),
        loop: { move: "twinkle" as const, ms: 1000, low: 0.5, phase: i / count }
      };
    });
  return {
    kind: "hearts-and-deeds",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(80, 18) },
      { name: "clouds", svg: cloud(40, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      {
        name: "a fine home",
        svg:
          home(30, 96, 30, 17, "#E6C48C", "#C9A15E") +
          `<path d="M15 79 L45 79" stroke="#E2B33C" stroke-width="1"/>` +
          [19, 25, 35, 41].map((x) => `<rect x="${x - 0.7}" y="80" width="1.4" height="16" fill="#F2DCAE"/>`).join("")
      },
      { name: "a plain home", svg: home(128, 96, 16, 11) },
      { name: "a heap of gold by the fine home", svg: goldHeap(64, 104, 1.5), keys: track({ opacity: [[0.34, 1], [0.42, 0.35]] }) },
      { name: "a gleam on the gold", svg: sparkle(61.4, 97.6, 1.6, "#FFFFFF") + sparkle(67, 100, 1.2, "#FFFFFF"), keys: track({ opacity: [[0.34, 1], [0.42, 0]] }), loop: { move: "twinkle", ms: 1100, low: 0.4 } },
      { name: "a place by the fine home", svg: someone(fine[0], fine[1], 2.2) },
      {
        name: "fine looks, sparkling about him",
        svg: sparkle(fine[0] - 5.4, fine[1] - 4.4, 1.8, "#FFFFFF") + sparkle(fine[0] + 5.2, fine[1] - 5, 1.5, "#FFFFFF") + sparkle(fine[0] + 4.6, fine[1] + 3.2, 1.2, "#FFFFFF") + ring(fine[0], fine[1], 4.4, "#F2DCAE"),
        keys: track({ opacity: [[0.12, 1], [0.18, 0.3]] }),
        loop: { move: "twinkle", ms: 1200, low: 0.5 }
      },
      { name: "a place by the plain home", svg: someone(plain[0], plain[1], 2.2) },
      { name: "a heart, a warm light within him", svg: glow(fine[0], fine[1], 6, WARM, 0.3) + sparkle(fine[0], fine[1], 1.4, SPARK), keys: showFrom(0.5, 0.57), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a heart, a warm light within the other", svg: glow(plain[0], plain[1], 6, WARM, 0.3) + sparkle(plain[0], plain[1], 1.4, SPARK), keys: showFrom(0.52, 0.59), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: 0.5 } },
      ...rising(fine, "his good deeds, rising", 0.75, 2),
      ...rising(plain, "good deeds of the other, rising", 0.77, 2)
    ],
    words: [
      { text: "Verily Allah does not look to your faces", from: 0.02, to: 0.22 },
      { text: "And your wealth", from: 0.24, to: 0.46 },
      { text: "But He looks to your heart", from: 0.48, to: 0.72 },
      { text: "And to your deeds", from: 0.74, to: 1 }
    ]
  };
}

// Real strength. The Prophet ﷺ said: the strong is not the one who overcomes the people by his strength, but the strong
// is the one who controls himself while in anger (Sahih al-Bukhari 6114). No one is drawn: a big, strong place swells,
// pushes on and knocks two others down, and a grey shade comes on it; then a crooked voice angers another, a red glow
// of anger grows in him; a ring closes about him as he holds himself, the red fades, and a warm golden glow of real
// strength comes on him.
function realStrength(): SignArt {
  const big: [number, number] = [26, 98];
  const knocked: [number, number][] = [
    [39, 98.6],
    [45, 100.2]
  ];
  const calm: [number, number] = [112, 98.6];
  const other: [number, number] = [136, 99.4];
  const pushed: [number, number] = [8, 0];
  return {
    kind: "real-strength",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "clouds", svg: cloud(60, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      {
        name: "a big place, strong",
        svg: `<circle cx="${big[0]}" cy="${big[1]}" r="3.6" stroke="${VOICE}" stroke-width="1.4" stroke-dasharray="1.5 1" fill="none"/>`,
        origin: { x: big[0], y: big[1] },
        keys: track({
          scale: [
            [0.04, 1],
            [0.1, 1.3]
          ],
          xy: [
            [0.25, 0, 0],
            [0.29, pushed[0], pushed[1]]
          ]
        })
      },
      ...knocked.map(
        ([x, y], i): SignPart => ({
          name: `one knocked down ${i + 1}`,
          svg: someone(x, y, 1.8),
          origin: { x, y },
          keys: track({
            opacity: [
              [0.27, 1],
              [0.34, 0.55]
            ],
            xy: [
              [0.27, 0, 0],
              [0.34, 12 + i * 4, 3 - i]
            ],
            rotate: [
              [0.27, 0],
              [0.34, 160]
            ]
          })
        })
      ),
      { name: "a shove, dashes of dust", svg: `<path d="M40 102.6 l-2 1 M43.6 103.4 l-1 1.6 M47 103 l0.6 1.6" stroke="#C9B48A" stroke-width="0.6" stroke-linecap="round"/>`, keys: showWhile(0.28, 0.3, 0.33, 0.35) },
      { name: "a grey shade on the big place, not truly strong", svg: wash(big[0] + pushed[0], big[1], 7, 4.4, GREY, 0.2), keys: showFrom(0.38, 0.44) },
      { name: "someone's place", svg: someone(calm[0], calm[1], 2.2) },
      { name: "another's place", svg: someone(other[0], other[1], 1.9) },
      { name: "a crooked voice from the other, angering him", svg: zigzag(other[0] - 13, other[1] - 4, 8, GREY), keys: showWhile(0.51, 0.53, 0.58, 0.6), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      {
        name: "a red glow of anger in him",
        svg: glow(calm[0], calm[1], 6.4, RED, 0.2),
        origin: { x: calm[0], y: calm[1] },
        keys: track({
          opacity: [
            [0.53, 0],
            [0.55, 1],
            [0.79, 1],
            [0.85, 0]
          ],
          scale: [
            [0.53, 0.6],
            [0.62, 1.4],
            [0.79, 1.4],
            [0.85, 0.6]
          ]
        })
      },
      {
        name: "a ring about him, holding himself",
        svg: ring(calm[0], calm[1], 5.4, GOLD),
        origin: { x: calm[0], y: calm[1] },
        keys: track({
          opacity: [
            [0.75, 0],
            [0.76, 1]
          ],
          scale: [
            [0.75, 2.2],
            [0.8, 1]
          ]
        })
      },
      { name: "real strength, a warm golden glow", svg: glow(calm[0], calm[1], 9, WARM, 0.22), keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "strength, sparkling", svg: sparkle(calm[0] - 5.6, calm[1] - 4.4, 1.3, SPARK) + sparkle(calm[0] + 5.4, calm[1] - 5, 1.1, SPARK), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1100, low: 0.4 } }
    ],
    words: [
      { text: "The strong is not the one", from: 0.02, to: 0.22 },
      { text: "Who overcomes the people by his strength", from: 0.24, to: 0.48 },
      { text: "But the strong is the one", from: 0.5, to: 0.72 },
      { text: "Who controls himself while in anger", from: 0.74, to: 1 }
    ]
  };
}

// A treasure of Paradise. Abu Musa said: we were with the Prophet ﷺ on a journey, and whenever we ascended a high
// place, we used to say Takbir. The Prophet ﷺ said: O people, be kind to yourselves, for you are not calling upon a deaf
// or an absent one, but you are calling an All-Hearer, an All-Seer. Then he came to me as I was saying within myself: la
// hawla wa la quwwata illa billah. He said: O Abdullah ibn Qays, say la hawla wa la quwwata illa billah, for it is one
// of the treasures of Paradise (Sahih al-Bukhari 6384). Nothing is drawn for Allah, and no one is drawn: a golden ring,
// his place, and the places of those with him go along a way up a high place; loud voices rise from them; a voice from
// the ring, and their voices grow small and gentle, and gentle words rise; a calm comes on them all; the ring comes to
// one at the edge, saying it within himself, a small light; last, far off in a light, a treasure chest opens, and his
// words rise to it.
function treasureOfParadise(): SignArt {
  const top: [number, number][] = [
    [74, 79],
    [81, 77.4],
    [88, 77.2],
    [95, 78.8]
  ];
  const start: [number, number][] = [
    [14, 103],
    [22, 104.4],
    [30, 103],
    [38, 104.6]
  ];
  const up = (i: number): [number, number, number][] => [
    [0.03 + i * 0.003, 0, 0],
    [0.088 + i * 0.003, n(top[i][0] - start[i][0]), n(top[i][1] - start[i][1])]
  ];
  const quiet = top[3];
  const beside: [number, number] = [101.4, 79.8];
  const chestAt: [number, number] = [138, 62];
  const highPlace =
    `<path d="M44 104 C56 98 66 82 78 76.6 C84 74 92 74.4 100 77.6 C110 82 120 96 132 104 Z" fill="#D7BC8C"/>` +
    `<path d="M78 76.6 C84 74 92 74.4 100 77.6 C110 82 120 96 132 104 L112 104 C104 94 98 84 92 80 Z" fill="#000000" opacity="0.06"/>`;
  return {
    kind: "treasure-of-paradise",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a high place on the way", svg: highPlace },
      { name: "a way up the high place", svg: way("M10 104 C30 106 44 102 54 96 C62 90 68 82 76 79 C84 76.6 92 76.6 100 79", "#B89A6C", 1) },
      { name: "Paradise, a light far off", svg: glow(chestAt[0], chestAt[1] - 4, 12, "#FFF3C0", 0.22), keys: showFrom(0.85, 0.88), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "a treasure chest in Paradise", svg: chest(chestAt[0], chestAt[1]), keys: showFrom(0.86, 0.88) },
      {
        name: "the chest's lid, opening",
        svg: chestLid(chestAt[0], chestAt[1]),
        origin: { x: chestAt[0] + 6, y: chestAt[1] - 6 },
        keys: track({
          opacity: [
            [0.86, 0],
            [0.88, 1]
          ],
          rotate: [
            [0.88, 0],
            [0.92, -34]
          ]
        })
      },
      { name: "light from the treasure, sparkling", svg: sparkle(chestAt[0] - 2.6, chestAt[1] - 9, 1.6, SPARK) + sparkle(chestAt[0] + 1.8, chestAt[1] - 11, 1.2, "#FFFFFF") + sparkle(chestAt[0], chestAt[1] - 7.4, 1, SPARK), keys: showFrom(0.9, 0.93), loop: { move: "twinkle", ms: 1000, low: 0.4 } },
      { name: "a golden ring, his place", svg: ring(start[0][0], start[0][1], 3, GOLD), keys: track({ xy: [...up(0), [0.71, top[0][0] - start[0][0], top[0][1] - start[0][1]], [0.75, beside[0] - start[0][0], beside[1] - start[0][1]]] }) },
      ...[1, 2, 3].map((i): SignPart => ({ name: `one going with him ${i}`, svg: someone(start[i][0], start[i][1], 1.5), keys: track({ xy: up(i) }) })),
      ...[1, 2, 3].map(
        (i): SignPart => ({
          name: `a loud voice, saying Takbir ${i}`,
          svg: arcs(top[i][0] + 1.6, top[i][1] - 4.6, VOICE),
          origin: { x: top[i][0] + 1.6, y: top[i][1] - 4.6 },
          keys: track({
            opacity: [
              [0.16, 0],
              [0.18, 1],
              [0.58, 1],
              [0.61, 0]
            ],
            scale: [
              [0.16, 1.9],
              [0.31, 1.9],
              [0.35, 0.8]
            ]
          }),
          loop: { move: "twinkle", ms: 900, low: 0.5, phase: i / 3 }
        })
      ),
      { name: "a voice from his place, gently", svg: arcs(top[0][0] + 3.6, top[0][1] - 3.6, GOLD), keys: showWhile(0.29, 0.31, 0.36, 0.37), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...[1, 2, 3].map(
        (i): SignPart => {
          const from = 0.43 + (i - 1) * 0.015;
          return {
            name: `gentle words, rising ${i}`,
            svg: sparkle(top[i][0] + 2.4, top[i][1] - 7, 1.2, SPARK),
            keys: track({
              opacity: [
                [from, 0],
                [from + 0.01, 1],
                [from + 0.05, 1],
                [from + 0.06, 0]
              ],
              xy: [
                [from, 0, 0],
                [from + 0.05, 0, -10]
              ]
            })
          };
        }
      ),
      { name: "a calm on them all", svg: wash(85, 78, 18, 6, WARM, 0.12), keys: showFrom(0.58, 0.62), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "his words within himself, a small light", svg: glow(quiet[0], quiet[1], 3.6, WARM, 0.35) + sparkle(quiet[0], quiet[1], 0.9, SPARK), keys: showFrom(0.71, 0.74), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "a voice from his place, to him", svg: arcsLeft(beside[0] - 3.6, beside[1] - 3.6, GOLD), keys: showWhile(0.75, 0.76, 0.78, 0.79), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "his words, rising to the treasure",
        svg: sparkle(quiet[0], quiet[1] - 4, 1.6, SPARK),
        keys: track({
          opacity: [
            [0.86, 0],
            [0.87, 1],
            [0.92, 1],
            [0.94, 0]
          ],
          xy: [
            [0.86, 0, 0],
            [0.92, chestAt[0] - quiet[0], chestAt[1] - 8 - (quiet[1] - 4)]
          ]
        })
      }
    ],
    words: [
      { text: "Abu Musa: Whenever we climbed a high place", from: 0.02, to: 0.13 },
      { text: "We used to say Takbir", from: 0.15, to: 0.26 },
      { text: "O people! Be kind to yourselves", from: 0.28, to: 0.4 },
      { text: "You are not calling a deaf or absent one", from: 0.42, to: 0.55 },
      { text: "You are calling an All-Hearer, an All-Seer", from: 0.57, to: 0.68 },
      { text: "Say: La hawla wa la quwwata illa billah", from: 0.7, to: 0.82 },
      { text: "For it is one of the treasures of Paradise", from: 0.84, to: 1 }
    ]
  };
}

// The hundred grades. The Prophet ﷺ said: Paradise has one hundred grades, and the distance between each of two grades
// is like the distance between the heaven and the earth. So, when you ask Allah, ask for al-Firdaws, which is the best
// and highest part of Paradise; from it originate the rivers of Paradise (Sahih al-Bukhari 2790). Nothing is drawn for
// Allah, and no one is drawn: in a soft light, the grades of Paradise show one above another, garden on garden, with
// many more rising to al-Firdaws at the top; the distance between two grades is measured, and a little sky and earth
// show in it; from the land of this world, a voice asks, and a du'a rises to al-Firdaws; al-Firdaws glows, the best;
// last, rivers come out from it over the grades.
function hundredLevels(): SignArt {
  const asker: [number, number] = [16, 100];
  const firdaws: [number, number] = [100, 48];
  // A river along each grade's front, al-Firdaws first, and a short fall from each grade's ends to the one below.
  const rivers: [string, number, number][] = [
    ["M83.5 48.8 Q100 51.6 116.5 48.8", 48, 0.85],
    ["M71.5 76.8 Q100 79.8 128.5 76.8", 76, 0.87],
    ["M65.5 88.8 Q100 92 134.5 88.8", 88, 0.89],
    ["M59.5 102.8 Q100 106.2 140.5 102.8", 102, 0.91]
  ];
  const falls = [
    "M71.5 77.2 Q70.6 83 70.8 89.8 M128.5 77.2 Q129.4 83 129.2 89.8",
    "M65.5 89.2 Q64.6 96 65 103.6 M134.5 89.2 Q135.4 96 135 103.6"
  ];
  const many = [69, 65.6, 62.6, 59.8, 57.2, 54.8];
  return {
    kind: "hundred-levels",
    ms: 11000,
    parts: [
      { name: "a soft light, Paradise", svg: sky("#FFF5DC", "#F7E9C8", 64) },
      { name: "light, all about", svg: glow(100, 54, 60, "#FFFFFF", 0.05), loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      { name: "the land of this world", svg: `<path d="M0 120 L0 96 C10 93 22 93 34 97 C40 99 44 104 46 120 Z" fill="#E2CB9C"/><path d="M0 96 C10 93 22 93 34 97 C40 99 44 104 46 120" stroke="#CDB283" stroke-width="0.7" fill="none"/>` + tuft(8, 104, "#A99A5A", 3.4) },
      { name: "a grade of Paradise, the first", svg: grade(100, 102, 54) + roundTree(64, 101, 7) + roundTree(132, 101, 6) + tuft(100, 102, "#4F9A3C", 4), keys: showFrom(0.03, 0.05) },
      { name: "a grade of Paradise, the second", svg: grade(100, 88, 46) + roundTree(76, 87, 6) + roundTree(126, 87, 6, "#5FA344"), keys: showFrom(0.05, 0.07) },
      { name: "a grade of Paradise, the third", svg: grade(100, 76, 38, "#8ECB72") + roundTree(84, 75, 5) + roundTree(118, 75, 5, "#5FA344"), keys: showFrom(0.07, 0.09) },
      {
        name: "many more grades, rising",
        svg: many.map((y, i) => `<ellipse cx="100" cy="${y}" rx="${n(33 - i * 1.6)}" ry="1.2" fill="#9AD07C" opacity="${n(0.85 - i * 0.08)}"/>`).join(""),
        keys: showFrom(0.09, 0.12)
      },
      { name: "al-Firdaws, the highest", svg: grade(firdaws[0], firdaws[1], 22, "#A6D97E", "#E8D49C") + roundTree(92, 47, 5, "#3F8A35") + roundTree(108, 47, 5, "#3F8A35") + tuft(100, 48, "#4F9A3C", 3.6), keys: showFrom(0.11, 0.14) },
      { name: "the distance between two grades, measured", svg: `<path d="M58 99.6 L58 88.6 M55.8 99.6 L60.2 99.6 M55.8 88.6 L60.2 88.6" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1.2 0.8"/>`, keys: showFrom(0.2, 0.23) },
      {
        name: "a little sky and earth, as far apart",
        svg:
          `<rect x="62" y="92.8" width="14" height="6.4" rx="1" fill="#BFE3FA"/><rect x="62" y="97" width="14" height="2.2" fill="#E2CB9C"/>` +
          `<circle cx="65.4" cy="94.6" r="0.9" fill="#FFE07A"/><rect x="62" y="92.8" width="14" height="6.4" rx="1" stroke="#FFFFFF" stroke-width="0.4" fill="none"/>`,
        keys: showFrom(0.36, 0.4)
      },
      { name: "someone's place, asking", svg: someone(asker[0], asker[1], 1.6) },
      { name: "a voice from him, asking for al-Firdaws", svg: arcs(asker[0] + 3.4, asker[1] - 3.4, VOICE), keys: showWhile(0.52, 0.535, 0.6, 0.62), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "his du'a, rising to al-Firdaws",
        svg: sparkle(asker[0] + 2, asker[1] - 6, 1.8, SPARK),
        keys: track({
          opacity: [
            [0.545, 0],
            [0.555, 1]
          ],
          xy: [
            [0.555, 0, 0],
            [0.58, 14, -16],
            [0.605, 42, -32],
            [0.63, firdaws[0] - asker[0] - 2, firdaws[1] - 4 - (asker[1] - 6)]
          ]
        }),
        loop: { move: "twinkle", ms: 1000, low: 0.6 }
      },
      { name: "al-Firdaws, a bright glow, the best", svg: glow(firdaws[0], firdaws[1], 18, WARM, 0.2), keys: showFrom(0.69, 0.74), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "al-Firdaws, sparkling", svg: sparkle(84, 44.4, 1.4, SPARK) + sparkle(116, 44, 1.2, SPARK) + sparkle(100, 41.6, 1.6, "#FFFFFF"), keys: showFrom(0.71, 0.75), loop: { move: "twinkle", ms: 1100, low: 0.4 } },
      ...rivers.map(
        ([d, y, from], i): SignPart => ({
          name: i ? `a river from al-Firdaws, on a grade below ${i}` : "a river from al-Firdaws, on al-Firdaws",
          svg: `<path d="${d}" stroke="#6FB8E8" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#E4F4FF" stroke-width="0.4" stroke-dasharray="1.6 2.4" fill="none"/>`,
          origin: { x: firdaws[0], y: y + 1.6 },
          keys: track({
            opacity: [
              [from, 0],
              [from + 0.01, 1]
            ],
            scaleX: [
              [from, 0.1],
              [from + 0.03, 1]
            ]
          })
        })
      ),
      ...falls.map(
        (d, i): SignPart => ({
          name: `water falling to the grade below ${i + 1}`,
          svg: `<path d="${d}" stroke="#8CC8EE" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
          keys: showFrom(0.88 + i * 0.02, 0.9 + i * 0.02)
        })
      ),
      { name: "the rivers, sparkling", svg: [
          [94, 50.6],
          [84, 79],
          [118, 90.6],
          [72, 104.4],
          [128, 104.6]
        ]
          .map(([x, y]) => sparkle(x, y, 0.9, "#FFFFFF"))
          .join(""),
        keys: showFrom(0.93, 0.95), loop: { move: "twinkle", ms: 1000, low: 0.3 } }
    ],
    words: [
      { text: "Paradise has one hundred grades", from: 0.02, to: 0.17 },
      { text: "The distance between each of two grades", from: 0.19, to: 0.33 },
      { text: "Is like that between the heaven and the earth", from: 0.35, to: 0.5 },
      { text: "When you ask Allah, ask for al-Firdaws", from: 0.52, to: 0.66 },
      { text: "The best and highest part of Paradise", from: 0.68, to: 0.82 },
      { text: "Perhaps he said: from it rivers originate", from: 0.84, to: 1 }
    ]
  };
}

// Faith at the Pleiades. Abu Hurayrah said: we were sitting with the Prophet ﷺ when Surat al-Jumu'ah was revealed. I
// said: who are they, O Messenger of Allah? He did not reply till I repeated my question thrice. Salman al-Farisi was
// with us. The Prophet ﷺ put his hand on Salman and said: if faith were at Ath-Thurayya, the Pleiades, even then men,
// or a man, from these would attain it (Sahih al-Bukhari 4897). No one is drawn, not even a hand: at night, by the
// masjid, a golden ring, his place, the place beside him, and those sitting with him; a voice asks from one of them,
// once, twice and a third time; a voice answers from the ring, and a light of faith shows at the Pleiades, high among
// the stars; ways rise from a far land to the east, up to the light, and reach it, and a warm glow comes on the place
// beside him.
function faithAtThePleiades(): SignArt {
  const ringAt: [number, number] = [48, 103];
  const beside: [number, number] = [40, 103.6];
  const asker: [number, number] = [76, 103.8];
  const pleiades: [number, number] = [121, 46];
  const cluster: [number, number][] = [
    [117.6, 44.2],
    [120.4, 43],
    [123.4, 44.4],
    [119.2, 46.6],
    [122.2, 47.2],
    [125.2, 46.2],
    [121, 49.2]
  ];
  const from: [number, number][] = [
    [130, 86.4],
    [142, 85.8],
    [152, 86.2]
  ];
  // Halfway up each way, from where its spark starts.
  const middle: [number, number][] = [
    [-0.3, -17],
    [-4.6, -18],
    [-8, -19.8]
  ];
  const ways = [
    `M${from[0][0]} ${from[0][1]} C134 74 128 60 ${pleiades[0] + 0.4} ${pleiades[1] + 4.4}`,
    `M${from[1][0]} ${from[1][1]} C146 72 132 58 ${pleiades[0] + 2} ${pleiades[1] + 5}`,
    `M${from[2][0]} ${from[2][1]} C156 70 136 56 ${pleiades[0] + 3.4} ${pleiades[1] + 5.4}`
  ];
  return {
    kind: "faith-at-the-pleiades",
    ms: 10000,
    parts: [
      { name: "the night sky", svg: nightSky(84) },
      {
        name: "stars",
        svg: stars([
          [10, 14],
          [26, 30],
          [44, 12],
          [60, 34],
          [76, 18],
          [92, 10],
          [100, 30],
          [146, 14],
          [154, 34],
          [18, 50],
          [66, 56],
          [88, 48],
          [140, 60],
          [104, 64],
          [32, 70]
        ]),
        loop: { move: "twinkle", ms: 2200, low: 0.6 }
      },
      { name: "the Pleiades, a small cluster of stars", svg: cluster.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.6" fill="#FFFFFF"/><circle cx="${x}" cy="${y}" r="1.4" fill="#DDE8FF" opacity="0.2"/>`).join(""), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a far land to the east", svg: `<path d="M112 88 C122 85 136 84.6 160 85.4 L160 89 L112 89 Z" fill="#3A3D58"/>` + [128, 140, 151].map((x) => `<circle cx="${x}" cy="86.8" r="0.5" fill="#FFD98A"/>`).join("") },
      { name: "the land at night", svg: `<rect y="88" width="160" height="32" fill="#2E2E42"/><path d="M0 88 C40 87 120 89 160 88" stroke="#3E3E58" stroke-width="1" fill="none"/>` },
      { name: "the masjid at night", svg: madinahMasjid(6, 100, 0.62) + `<rect x="5" y="89" width="32" height="12" fill="#0F1C3A" opacity="0.38"/>` },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "the place beside him", svg: someone(beside[0], beside[1], 1.6, PALE) },
      { name: "the places of those sitting with him", svg: someone(58, 104.4, 1.5, PALE) + someone(66, 103, 1.5, PALE) },
      { name: "someone asking", svg: someone(asker[0], asker[1], 1.6, PALE) },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a voice from him, asking, ${["once", "twice", "a third time"][i]}`,
          svg: arcsLeft(asker[0] - 3.4, asker[1] - 3.4, PALE),
          keys: [showWhile(0.03, 0.05, 0.14, 0.16), showWhile(0.23, 0.25, 0.29, 0.31), showWhile(0.32, 0.34, 0.37, 0.39)][i],
          loop: { move: "twinkle", ms: 1000, low: 0.5 }
        })
      ),
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `asked, a mark ${i + 1}`,
          svg: `<circle cx="${n(asker[0] - 2.6 + i * 2.6)}" cy="${n(asker[1] - 6.6)}" r="0.7" fill="#F2E6C8"/>`,
          keys: showFrom([0.04, 0.24, 0.33][i], [0.06, 0.26, 0.35][i])
        })
      ),
      { name: "a voice from his place, answering", svg: arcs(ringAt[0] + 3.8, ringAt[1] - 3.6, GOLD), keys: showWhile(0.45, 0.47, 0.63, 0.65), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "faith, a light at the Pleiades",
        svg: glow(pleiades[0], pleiades[1], 10, WARM, 0.16) + sparkle(pleiades[0], pleiades[1] - 0.4, 1.4, "#FFF3C0"),
        origin: { x: pleiades[0], y: pleiades[1] },
        keys: track({
          opacity: [
            [0.47, 0],
            [0.53, 1]
          ],
          scale: [
            [0.86, 1],
            [0.9, 1.4]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.7 }
      },
      ...ways.map((d, i): SignPart => ({ name: `a way up from the far land ${i + 1}`, svg: way(d, GOLD, 0.9), keys: showFrom(0.71 + i * 0.02, 0.74 + i * 0.02) })),
      ...from.map(
        ([x, y], i): SignPart => ({
          name: `going up to it ${i + 1}`,
          svg: sparkle(x, y - 2, 1.3, "#FFF3C0"),
          keys: track({
            opacity: [
              [0.76 + i * 0.02, 0],
              [0.77 + i * 0.02, 1]
            ],
            xy: [
              [0.77 + i * 0.02, 0, 0],
              [0.805 + i * 0.02, middle[i][0], middle[i][1]],
              [0.84 + i * 0.02, n(pleiades[0] + 0.4 + i * 1.5 - x), n(pleiades[1] + 3 - (y - 2))]
            ]
          }),
          loop: { move: "twinkle", ms: 900, low: 0.6, phase: i / 3 }
        })
      ),
      { name: "a warm glow on the place beside him", svg: glow(beside[0], beside[1], 4.6, WARM, 0.26), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "Abu Hurairah: Who are they?", from: 0.02, to: 0.2 },
      { text: "I repeated my question thrice", from: 0.22, to: 0.42 },
      { text: "If faith were at Ath-Thurayya, the Pleiades", from: 0.44, to: 0.68 },
      { text: "Men, or a man, from these would attain it", from: 0.7, to: 1 }
    ]
  };
}

// The sacred city. On the day Makkah was opened, the Prophet ﷺ said: Allah has made this place a sanctuary since the
// creation of the heavens and the earth, and it will remain a sanctuary till the Day of Resurrection. Its thorns should
// not be uprooted, its game should not be chased, and its fallen things should not be picked up except by one who would
// announce it publicly (Sahih al-Bukhari 1834). No one is drawn: in the valley among Makkah's hills, the Ka'bah; a
// golden ring of sanctuary shows about it; a first light spreads over the sky and the land; the sun crosses, day after
// day, and the ring stays; a cut comes near a thorny bush and is held back, and the bush is kept; a way comes near the
// game, grazing, and turns aside; one passes a fallen purse and leaves it; last, one comes and takes it up, and his
// voice announces it.
function sacredCity(): SignArt {
  const bush: [number, number] = [30, 102];
  const grazing: [number, number] = [108, 90];
  const fallen: [number, number] = [94, 102.6];
  const announcer: [number, number] = [60, 103.4];
  const comes: [number, number] = [29, 0];
  const valley = `<rect y="82" width="160" height="38" fill="#E3CDA0"/><path d="M0 82 C40 80 120 81 160 82" stroke="#CDB385" stroke-width="1"/>`;
  return {
    kind: "sacred-city",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 82) },
      {
        name: "the sun, crossing day after day",
        svg: sun(24, 24),
        keys: track({
          xy: [
            [0.3, 0, 0],
            [0.335, 56, -8],
            [0.37, 112, 0]
          ]
        })
      },
      { name: "clouds", svg: cloud(96, 22, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the hills about the valley",
        svg: peaks(
          [
            [14, 30, 24],
            [46, 20, 20],
            [118, 24, 22],
            [148, 34, 24]
          ],
          84,
          "#A68B66",
          false
        )
      },
      { name: "the valley", svg: valley + tuft(20, 112, "#A99A5A", 3.4) + tuft(140, 114, "#A99A5A", 3.4) },
      { name: "the Ka'bah", svg: kabah(73, 97.4, 12) },
      { name: "a first light over the sky and the land", svg: glow(80, 60, 70, "#FFF6D8", 0.06), keys: track({ opacity: [[0.16, 0], [0.2, 1], [0.24, 0.5]] }) },
      { name: "the sanctuary, a golden ring about it", svg: `<ellipse cx="80" cy="97" rx="68" ry="15" stroke="${GOLD}" stroke-width="0.9" stroke-dasharray="2.4 1.8" fill="none"/>`, keys: showFrom(0.03, 0.07) },
      { name: "the sanctuary, a calm about it", svg: wash(80, 97, 68, 15, WARM, 0.05), keys: showFrom(0.05, 0.09), loop: { move: "twinkle", ms: 2000, low: 0.75 } },
      { name: "a thorny bush", svg: thornBush(bush[0], bush[1]) },
      {
        name: "a cut coming near, held back",
        svg: `<path d="M${bush[0] - 15} ${bush[1] - 3} L${bush[0] - 8} ${bush[1] - 3}" stroke="${GREY}" stroke-width="0.8" stroke-dasharray="1.4 1.2" stroke-linecap="round"/>`,
        keys: track({
          opacity: [
            [0.43, 0],
            [0.44, 1],
            [0.48, 1],
            [0.5, 0]
          ],
          xy: [
            [0.44, -6, 0],
            [0.47, 0, 0],
            [0.5, -4, 0]
          ]
        })
      },
      { name: "the thorny bush, kept, a glow on it", svg: glow(bush[0], bush[1] - 3, 6, WARM, 0.2), keys: showFrom(0.47, 0.5), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "game, grazing", svg: animalAt("deer", grazing[0], grazing[1], 0.15), loop: { move: "bob", ms: 2600, y: 0.3 } },
      {
        name: "a way coming near it, turning aside",
        svg: way(`M152 104 C142 102 132 101 126 100 C122 99.4 122 104 132 108`, GREY, 0.8),
        keys: track({
          opacity: [
            [0.56, 0],
            [0.6, 1]
          ]
        })
      },
      { name: "a calm on the game", svg: glow(grazing[0] + 7.5, grazing[1] + 6, 8, WARM, 0.16), keys: showFrom(0.59, 0.63), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "a fallen purse, left lying",
        svg: purse(fallen[0], fallen[1]),
        keys: track({
          xy: [
            [0.86, 0, 0],
            [0.88, comes[0] + announcer[0] + 3 - fallen[0], announcer[1] - 2.2 - fallen[1]]
          ]
        })
      },
      { name: "a gleam on the purse", svg: sparkle(fallen[0] + 1.8, fallen[1] - 3.6, 0.9, "#FFFFFF"), keys: track({ opacity: [[0.86, 1], [0.87, 0]] }), loop: { move: "twinkle", ms: 1100, low: 0.3 } },
      {
        name: "someone passing it by",
        svg: someone(66, 106, 1.5),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.7, 1],
            [0.76, 1],
            [0.77, 0]
          ],
          xy: [
            [0.7, 0, 0],
            [0.76, 50, 0.4]
          ]
        })
      },
      {
        name: "one who comes to announce it",
        svg: someone(announcer[0], announcer[1], 1.6),
        keys: track({
          opacity: [
            [0.82, 0],
            [0.83, 1]
          ],
          xy: [
            [0.83, 0, 0],
            [0.86, comes[0], comes[1]]
          ]
        })
      },
      { name: "a voice from him, announcing it", svg: arcs(announcer[0] + comes[0] + 3.4, announcer[1] - 3.6, VOICE), keys: showFrom(0.88, 0.9), loop: { move: "twinkle", ms: 1000, low: 0.5 } }
    ],
    words: [
      { text: "Allah has made this place a sanctuary", from: 0.02, to: 0.13 },
      { text: "Since the creation of the heavens and the earth", from: 0.15, to: 0.27 },
      { text: "Till the Day of Resurrection", from: 0.29, to: 0.4 },
      { text: "Its thorns should not be uprooted", from: 0.42, to: 0.53 },
      { text: "Its game should not be chased", from: 0.55, to: 0.66 },
      { text: "Its fallen things should not be picked up", from: 0.68, to: 0.8 },
      { text: "Except by one who would announce it", from: 0.82, to: 1 }
    ]
  };
}

export const WORTH_ART = {
  "needle-in-the-sea": needleInTheSea,
  "hearts-and-deeds": heartsAndDeeds,
  "real-strength": realStrength,
  "treasure-of-paradise": treasureOfParadise,
  "hundred-levels": hundredLevels,
  "faith-at-the-pleiades": faithAtThePleiades,
  "sacred-city": sacredCity
};
