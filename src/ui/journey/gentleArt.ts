import { animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3 } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, jug, LIGHT, sparkRising, track } from "./daysArt";
import { fastRing, greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { GREY } from "./lovedArt";
import { cup, food } from "./hopeArt";
import { kabah } from "./historyArt";

/**
 * Gentle ways in his ﷺ days, and what is promised: the two gardens of silver and the two of gold; a guard for the night
 * in Madinah; a vow to stand in the sun, eased; the one who followed to a meal, let in; water set out for his wudu, and
 * a du'a for the one who set it; going round the House on a camel, with the takbir at the Corner; and a salam at night
 * that woke no one asleep. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand or a face, and no one is drawn on a camel: where someone was, a
 * ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing
 * is drawn for Allah, and nothing comes down from the sky: a du'a or a prayer is a spark that rises, and the gardens of
 * Paradise are a soft light with no sun in it.
 */

/** A thing turned to face the other way about the upright line x = `cx`. */
const turned = (svg: string, cx: number) => `<g transform="translate(${n(cx * 2)} 0) scale(-1 1)">${svg}</g>`;

/** The colours of a thing of silver, or of gold. */
type Metal = { trunk: string; crown: string; shade: string; light: string; ground: string; edge: string; shine: string };
const SILVER: Metal = { trunk: "#A3AEBA", crown: "#DCE3EA", shade: "#B7C2CD", light: "#F6F9FB", ground: "#E3EAEE", edge: "#C2CCD5", shine: "#FFFFFF" };
const GOLDEN: Metal = { trunk: "#B4862C", crown: "#F2C94C", shade: "#D4A238", light: "#FFEBA6", ground: "#F2E2AE", edge: "#D8B55C", shine: "#FFF6CF" };

/** A round tree of a garden, `h` high, its trunk's foot at (x, y), all of the metal `m`. */
const gardenTree = (x: number, y: number, h: number, m: Metal) =>
  `<path d="M${n(x - 0.7)} ${y} L${n(x - 0.4)} ${n(y - h * 0.55)} L${n(x + 0.4)} ${n(y - h * 0.55)} L${n(x + 0.7)} ${y} Z" fill="${m.trunk}"/>` +
  `<circle cx="${x}" cy="${n(y - h * 0.7)}" r="${n(h * 0.36)}" fill="${m.shade}"/>` +
  `<circle cx="${n(x - h * 0.05)}" cy="${n(y - h * 0.75)}" r="${n(h * 0.3)}" fill="${m.crown}"/>` +
  `<circle cx="${n(x - h * 0.13)}" cy="${n(y - h * 0.86)}" r="${n(h * 0.1)}" fill="${m.light}"/>`;

/** A garden of Paradise, its middle at (x, 102): a ground of the metal `m` with a low edge about it, and three trees. */
const garden = (x: number, m: Metal) =>
  `<ellipse cx="${x}" cy="102" rx="15" ry="5" fill="${m.ground}" stroke="${m.edge}" stroke-width="0.9"/>` +
  gardenTree(n(x - 8), 100.4, 11, m) +
  gardenTree(n(x + 8), 100.4, 11, m) +
  gardenTree(x, 98.6, 13.4, m);

/** Glints on a garden's trees, its middle at (x, 102). */
const treeGlints = (x: number, m: Metal) =>
  [
    [-9.4, 91.4, 0.9],
    [-0.8, 87, 1.1],
    [7, 92, 0.9]
  ]
    .map(([dx, y, r]) => sparkle(n(x + dx), y, r, m.shine))
    .join("");

/** A cup and a jug of the metal `m`, set on a garden's ground before its middle at (x, 102). */
const vessels = (x: number, m: Metal) => {
  const [cx, cy] = [n(x - 4.4), 105.4];
  const [jx, jy] = [n(x + 4), 105.6];
  return (
    `<path d="M${n(cx - 1.5)} ${n(cy - 3)} L${n(cx + 1.5)} ${n(cy - 3)} L${n(cx + 1)} ${cy} L${n(cx - 1)} ${cy} Z" fill="${m.crown}" stroke="${m.trunk}" stroke-width="0.35"/>` +
    `<path d="M${n(jx - 2.1)} ${jy} Q${n(jx - 3)} ${n(jy - 2.8)} ${n(jx - 1.3)} ${n(jy - 4.9)} L${n(jx - 1.3)} ${n(jy - 6)} L${n(jx + 1.3)} ${n(jy - 6)} L${n(jx + 1.3)} ${n(jy - 4.9)} Q${n(jx + 3)} ${n(jy - 2.8)} ${n(jx + 2.1)} ${jy} Z" fill="${m.crown}" stroke="${m.trunk}" stroke-width="0.35"/>` +
    `<path d="M${n(jx + 1.9)} ${n(jy - 3.4)} L${n(jx + 4)} ${n(jy - 5)}" stroke="${m.trunk}" stroke-width="0.8" stroke-linecap="round"/>` +
    sparkle(n(cx - 0.4), n(cy - 2.2), 0.8, m.shine) +
    sparkle(n(jx - 0.6), n(jy - 3.6), 0.9, m.shine)
  );
};

// The gardens of silver and of gold. Abu Musa said: the Messenger of Allah ﷺ said: two gardens of silver, their vessels
// and all that is in them, and two gardens of gold, their vessels and all that is in them (Sahih al-Bukhari 4878). No
// one is drawn: Paradise is a soft light with no sun in it, over a land of gardens. Two gardens of silver show, their
// trees of silver, glinting; then their vessels of silver, a cup and a jug in each, and a silver glow over all in them.
// Then two gardens of gold show, their trees of gold; then their vessels of gold, and a golden glow over all in them.
function silverAndGoldGardens(): SignArt {
  const silver = [22, 58];
  const gold = [102, 138];
  const gardens = [
    { metal: SILVER, xs: silver, name: "silver", shown: [0.03, 0.07], vessels: [0.23, 0.26], all: [0.32, 0.35] },
    { metal: GOLDEN, xs: gold, name: "gold", shown: [0.47, 0.51], vessels: [0.71, 0.74], all: [0.8, 0.83] }
  ];
  return {
    kind: "silver-and-gold-gardens",
    ms: 9000,
    parts: [
      { name: "Paradise: a soft light with no sun in it", svg: sky("#E4EEF6", "#F3EBD3", 60) + wash(80, 42, 96, 34, "#FFF8E8", 0.22) + glow(80, 40, 46, "#FFF4D0", 0.1) },
      { name: "a far rise in the light", svg: `<path d="M0 64 Q40 58 80 59 Q120 58 160 64 L160 68 Q80 64 0 68 Z" fill="#E3EED0"/>` },
      {
        name: "the land of the gardens",
        svg:
          `<path d="M0 66 Q80 60 160 66 L160 120 L0 120 Z" fill="#CFE3B4"/><path d="M0 86 Q80 80 160 86 L160 120 L0 120 Z" fill="#C3DCA4"/>` +
          [10, 30, 52, 74, 96, 118, 140, 156].map((x, i) => `<ellipse cx="${x}" cy="${i % 2 ? 66.4 : 67.4}" rx="6" ry="2.6" fill="#D6E7C2"/>`).join("")
      },
      ...gardens.flatMap(({ metal, xs, name, shown }) =>
        xs.map((x, i): SignPart => ({ name: `a garden of ${name} ${i + 1}, its trees of ${name}`, svg: garden(x, metal), keys: showAt(shown[i], at3(shown[i] + 0.05)) }))
      ),
      ...gardens.flatMap(({ metal, xs, name, shown }) =>
        xs.map((x, i): SignPart => ({
          name: `a garden of ${name} ${i + 1}: glints on its trees`,
          svg: treeGlints(x, metal),
          keys: showAt(shown[i], at3(shown[i] + 0.05)),
          loop: { move: "twinkle", ms: 1600, low: 0.3, phase: i / 2 }
        }))
      ),
      ...gardens.flatMap(({ metal, xs, name, vessels: at }) =>
        xs.map((x, i): SignPart => ({ name: `a garden of ${name} ${i + 1}: its vessels of ${name}`, svg: vessels(x, metal), keys: showAt(at[i], at3(at[i] + 0.04)) }))
      ),
      ...gardens.flatMap(({ metal, xs, name, all }) =>
        xs.map((x, i): SignPart => ({
          name: `a garden of ${name} ${i + 1}: all in it, a glow of ${name}`,
          svg: glow(x, 98, 17, metal.light, 0.2),
          keys: showAt(all[i], at3(all[i] + 0.05)),
          loop: soft
        }))
      )
    ],
    words: [
      { text: "Two gardens of silver", from: 0.02, to: 0.2 },
      { text: "Their vessels, and all in them", from: 0.22, to: 0.44 },
      { text: "And two gardens of gold", from: 0.46, to: 0.68 },
      { text: "Their vessels and all that is in them", from: 0.7, to: 1 }
    ]
  };
}

/** Glints of steel in the dark at (x, y): the weapons heard, not drawn. */
const steelGlints = (list: [number, number][]) => list.map(([x, y]) => sparkle(x, y, 1.1, "#E6EDF3")).join("");

/** Short strokes about (x, y): a clatter in the night. */
const clatter = (x: number, y: number) =>
  [
    [-4.4, -2.6, -2.8, -1.6],
    [-4.6, 0.6, -3, 0.6],
    [3.2, -2.8, 4.6, -1.4],
    [3.4, 0.8, 5, 0.6]
  ]
    .map(([x1, y1, x2, y2]) => `<path d="M${n(x + x1)} ${n(y + y1)} L${n(x + x2)} ${n(y + y2)}" stroke="#D8E0E8" stroke-width="0.5" stroke-linecap="round"/>`)
    .join("");

// A guard for the night. Aishah said: the Prophet ﷺ was wakeful; when he came to Madinah he said: would that a good man
// of my companions would guard me tonight. Then we heard the clatter of weapons. He said: who is this? He said: I am
// Sa'd ibn Abi Waqqas; I have come to guard you. And the Prophet ﷺ slept (Sahih al-Bukhari 2885). No one is drawn: at
// night, his place, a golden ring, comes along the way into Madinah to his home, and a light stays on in its window. His
// voice speaks, and a faint ring shows by the door, empty. Then far along the way, in the dark, glints of steel show and
// short strokes of a clatter. His voice asks; Sa'd's place comes along the way to the faint ring by the door, its voice
// answering, and a soft golden ring comes about it: guarding. Then his place goes in, the light in the window goes out,
// and a calm comes over the home.
function guardTonight(): SignArt {
  const homeAt: [number, number] = [80, 100];
  const start: [number, number] = [150, 105.6];
  const door: [number, number] = [78, 105.2];
  const guardAt: [number, number] = [89, 106];
  const sadFrom: [number, number] = [141, 104.4];
  return {
    kind: "guard-tonight",
    ms: 11000,
    parts: [
      { name: "the sky at night", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [40, 16],
          [62, 28],
          [86, 14],
          [104, 26],
          [126, 14],
          [148, 24],
          [12, 34]
        ]),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      { name: "the moon", svg: glow(24, 22, 10, "#FFF6D0", 0.08) + crescent(24, 22, 5, 2.4, "#FFF3B8") },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 99, 0.5) },
      { name: "a palm of Madinah", svg: palm(36, 99, 15) },
      { name: "his home", svg: home(homeAt[0], homeAt[1], 16, 11) },
      { name: "the way into Madinah", svg: way("M160 106 Q132 103.4 108 105 Q94 106 82 105.6", "#B8A47C", 0.8) },
      { name: "the dark of the night", svg: `<rect width="160" height="120" fill="#0B1430" opacity="0.5"/>` },
      {
        name: "wakeful: a light in his home's window",
        svg: glow(n(homeAt[0] + 3.3), 92.7, 3.4, "#FFD866", 0.3) + `<rect x="${n(homeAt[0] + 2)}" y="91.4" width="2.6" height="2.6" fill="#FFD866"/>`,
        keys: showFor(0.08, 0.1, 0.9, 0.93)
      },
      {
        name: "a golden ring, his place",
        svg: ring(start[0], start[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, n(door[0] - start[0]), n(door[1] - start[1])],
            [0.87, n(door[0] - start[0]), n(door[1] - start[1])],
            [0.9, n(door[0] - 1.6 - start[0]), n(door[1] - 0.6 - start[1])]
          ],
          opacity: [
            [0.87, 1],
            [0.9, 0]
          ]
        })
      },
      { name: "his voice: wishing for a guard tonight", svg: arcs(n(door[0] + 3.4), n(door[1] - 4.4), GOLD), keys: showFor(0.17, 0.18, 0.44, 0.45), loop: speaking },
      { name: "hoped for: a faint ring by the door, empty", svg: `<g opacity="0.6">${care(guardAt[0], guardAt[1], 3.4, 1.8, GOLD)}</g>`, keys: showFor(0.31, 0.35, 0.78, 0.8) },
      {
        name: "the clatter in the dark: glints of steel",
        svg: steelGlints([
          [136, 101.6],
          [141, 103.8],
          [146, 101]
        ]),
        keys: showFor(0.45, 0.47, 0.73, 0.75),
        loop: speaking
      },
      { name: "a sound in the night: short strokes", svg: clatter(141, 102.4), keys: showFor(0.46, 0.48, 0.73, 0.75), loop: { ...speaking, phase: 0.5 } },
      { name: "his voice: who is this?", svg: arcs(n(door[0] + 3.4), n(door[1] - 4.4), GOLD), keys: showFor(0.59, 0.6, 0.65, 0.66), loop: speaking },
      {
        name: "Sa'd's place, coming to guard",
        svg: someone(sadFrom[0], sadFrom[1], 1.5, LIGHT),
        keys: track({
          xy: [
            [0.73, 0, 0],
            [0.78, n(guardAt[0] - sadFrom[0]), n(guardAt[1] - sadFrom[1])]
          ],
          opacity: [
            [0.72, 0],
            [0.73, 1]
          ]
        })
      },
      { name: "Sa'd's voice: I have come to guard you", svg: arcs(n(guardAt[0] + 2.8), n(guardAt[1] - 4.2), LIGHT), keys: showFor(0.78, 0.79, 0.87, 0.88), loop: speaking },
      { name: "guarding: a soft golden ring about Sa'd's place", svg: care(guardAt[0], guardAt[1], 4.4, 2.4, GOLD), keys: showAt(0.79, 0.8), loop: soft },
      { name: "he slept: a calm over his home", svg: glow(n(homeAt[0] + 1), 95, 12, "#9FB4E0", 0.16), keys: showAt(0.92, 0.95), loop: soft }
    ],
    words: [
      { text: "He was wakeful; when he came to Madinah", from: 0.02, to: 0.14 },
      { text: "Would that a good man of my companions", from: 0.16, to: 0.28 },
      { text: "Would guard me tonight", from: 0.3, to: 0.42 },
      { text: "Then we heard the clatter of weapons", from: 0.44, to: 0.56 },
      { text: "He said: who is this?", from: 0.58, to: 0.7 },
      { text: "Sa'd ibn Abi Waqqas: I came to guard you", from: 0.72, to: 0.84 },
      { text: "And he slept", from: 0.86, to: 1 }
    ]
  };
}

/** The roofed part of the masjid: a roof of palm leaves on palm trunks from x1 to x2, before the masjid's wall. */
export const roofOnTrunks = (x1: number, x2: number) =>
  `<path d="M${n(x1 - 2)} 84 L${n(x2 + 2)} 84 L${n(x2 + 1)} 88.4 L${n(x1 - 1)} 88.4 Z" fill="#6E8F3A"/>` +
  `<path d="${Array.from({ length: Math.floor((x2 - x1) / 6) }, (_, i) => `M${n(x1 + 1 + i * 6)} 85.6 L${n(x1 + 5 + i * 6)} 84.6`).join(" ")}" stroke="#56742B" stroke-width="0.6"/>` +
  [x1 + 2, (x1 * 2 + x2) / 3, (x1 + x2 * 2) / 3, x2 - 2].map((x) => `<rect x="${n(x - 0.8)}" y="88.4" width="1.6" height="15.6" fill="#A9895C"/>`).join("");

/** Wavy lines of heat over the sunlit ground at (x, y). */
const heatAt = (x: number, y: number) =>
  `<path d="M${x} ${y} Q${n(x + 1)} ${n(y - 1.4)} ${x} ${n(y - 2.8)} Q${n(x - 1)} ${n(y - 4.2)} ${x} ${n(y - 5.6)}" stroke="#F2D58A" stroke-width="0.5" fill="none" stroke-linecap="round"/>`;

/** A small mat to sit on, its middle at (x, y). */
const mat = (x: number, y: number) => `<path d="M${n(x - 4)} ${n(y - 0.8)} L${n(x + 4)} ${n(y - 0.8)} L${n(x + 4.8)} ${n(y + 0.8)} L${n(x - 4.8)} ${n(y + 0.8)} Z" fill="#B98F5A"/>`;

// A vow to stand in the sun. Ibn Abbas said: while the Prophet ﷺ was giving the khutbah, he saw a man standing, and he
// asked about him. They said: Abu Isra'il; he vowed to stand and not sit, not to come into the shade, not to speak, and
// to fast. The Prophet ﷺ said: tell him to speak, to come into the shade and to sit, and let him complete his fast
// (Sahih al-Bukhari 6704). No one is drawn: at midday, the sun high, the masjid's roof of palm leaves gives a shade, and
// his place, a golden ring, is in it, his voice speaking, the folk's places sitting in the shade. Out in the sun, heat
// rising about it, a place stands. A faint golden line goes to it from his place, and his voice asks; the folk's voice
// answers. Grey rings show what was vowed: the ground where it would sit, a grey line to the shade stopping short, and
// where its voice would be; and a soft golden ring of the fast about it. His voice speaks; the grey rings go, the place
// comes into the shade, the fast's ring with it, and its voice speaks. It sits on a mat, a warm glow about its fast, and
// the sky warms toward evening.
function vowInTheSun(): SignArt {
  const his: [number, number] = [16, 102.6];
  const voiceAt: [number, number] = [n(his[0] + 3.4), n(his[1] - 4.4)];
  const folk: [number, number][] = [
    [30, 104.4],
    [38, 105.4],
    [46, 104.4],
    [54, 105.4]
  ];
  const vower: [number, number] = [114, 100.6];
  const shaded: [number, number] = [66, 102.6];
  const [dx, dy] = [n(shaded[0] - vower[0]), n(shaded[1] - vower[1])];
  const into: [number, number, number][] = [
    [0.74, 0, 0],
    [0.79, dx, dy],
    [0.87, dx, dy],
    [0.9, dx, n(dy + 1.6)]
  ];
  return {
    kind: "vow-in-the-sun",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C9E4F6", "#F1E6C8", 62) },
      { name: "the sun high, at midday", svg: glow(128, 22, 18, "#FFF0B0", 0.1) + sun(128, 22) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid's wall of mud brick", svg: `<rect x="2" y="84" width="156" height="15" fill="#D2B98C"/><rect x="2" y="84" width="156" height="1.4" fill="#BFA275"/>` },
      { name: "the shade under the roof", svg: `<path d="M3 98 L74 98 L79 108 L1 108 Z" fill="#000000" opacity="0.16"/><rect x="2" y="88.4" width="72" height="10.6" fill="#000000" opacity="0.12"/>` },
      { name: "the roof of palm leaves on palm trunks", svg: roofOnTrunks(4, 72) },
      { name: "the heat of the sun on the open ground", svg: [94, 106, 122, 136, 150].map((x, i) => heatAt(x, i % 2 ? 97 : 99.4)).join(""), loop: { move: "twinkle", ms: 1400, low: 0.25 } },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the folk's places, sitting in the shade", svg: folk.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "his voice, giving the khutbah", svg: arcs(voiceAt[0], voiceAt[1], GOLD), keys: showFor(0.03, 0.04, 0.15, 0.16), loop: speaking },
      { name: "he saw: a faint golden line to the place in the sun", svg: lookLine(n(his[0] + 2.4), n(his[1] - 2), n(vower[0] - 2), n(vower[1] - 1), 86, GOLD), keys: showFor(0.16, 0.19, 0.58, 0.6) },
      { name: "his voice: asking about him", svg: arcs(voiceAt[0], voiceAt[1], GOLD), keys: showFor(0.2, 0.21, 0.29, 0.3), loop: speaking },
      { name: "the folk's voice: this is Abu Isra'il", svg: arcs(n(folk[3][0] + 3), n(folk[3][1] - 4.4), VOICE), keys: showFor(0.3, 0.31, 0.57, 0.58), loop: speaking },
      { name: "vowed never to sit: a grey ring on the ground below it", svg: greyRing(vower[0], n(vower[1] + 4.8), 3.4, 1.4), keys: showFor(0.32, 0.35, 0.73, 0.75) },
      {
        name: "vowed never to come into the shade: a grey line stopping short, a grey ring",
        svg: lookLine(n(vower[0] - 2.6), n(vower[1] + 1), 86, 103.4, 98, GREY) + greyRing(84, 103.4, 2.6, 1.4),
        keys: showFor(0.44, 0.48, 0.73, 0.75)
      },
      { name: "vowed never to speak: a grey ring where its voice would be", svg: greyRing(n(vower[0] + 4.8), n(vower[1] - 4.6), 2.6, 2.2), keys: showFor(0.48, 0.51, 0.73, 0.75) },
      {
        name: "and to fast: a soft golden ring about it",
        svg: fastRing(vower[0], n(vower[1] + 1.8), 3.6, 1.8),
        keys: track({
          xy: into,
          opacity: [
            [0.58, 0],
            [0.62, 1]
          ]
        })
      },
      { name: "the place standing in the sun", svg: someone(vower[0], vower[1], 1.5), keys: track({ xy: into }) },
      { name: "his voice: tell him to speak, come into the shade and sit", svg: arcs(voiceAt[0], voiceAt[1], GOLD), keys: showFor(0.72, 0.73, 0.87, 0.88), loop: speaking },
      { name: "told to speak: its voice", svg: arcs(n(shaded[0] + 3), n(shaded[1] - 4.4), VOICE), keys: showFor(0.79, 0.8, 0.87, 0.88), loop: speaking },
      { name: "sitting in the shade: a small mat under it", svg: mat(shaded[0], n(shaded[1] + 3.2)), keys: showAt(0.87, 0.9) },
      { name: "his fast kept: a warm glow about it", svg: glow(shaded[0], n(shaded[1] + 1), 6, WARM, 0.3), keys: showAt(0.91, 0.94), loop: soft },
      { name: "toward evening, the fast completed: a warm wash in the sky", svg: `<rect width="160" height="62" fill="#F6C98A" opacity="0.3"/>`, keys: showAt(0.92, 0.96) }
    ],
    words: [
      { text: "While he was giving the khutbah", from: 0.02, to: 0.13 },
      { text: "He saw a man standing, and asked about him", from: 0.15, to: 0.27 },
      { text: "They said: Abu Isra'il vowed to stand", from: 0.29, to: 0.41 },
      { text: "Never sit, nor come into shade, nor speak", from: 0.43, to: 0.55 },
      { text: "And to fast", from: 0.57, to: 0.69 },
      { text: "Tell him to speak, come into the shade", from: 0.71, to: 0.84 },
      { text: "And sit, and let him complete his fast", from: 0.86, to: 1 }
    ]
  };
}

/** A pot of food on stones, its foot's middle at (x, y). */
const pot = (x: number, y: number) =>
  `<ellipse cx="${n(x - 2.6)}" cy="${n(y - 0.4)}" rx="1.2" ry="0.7" fill="#8E8272"/><ellipse cx="${n(x + 2.6)}" cy="${n(y - 0.4)}" rx="1.2" ry="0.7" fill="#8E8272"/>` +
  `<path d="M${n(x - 3)} ${n(y - 5)} Q${n(x - 3.6)} ${n(y - 0.6)} ${x} ${n(y - 0.6)} Q${n(x + 3.6)} ${n(y - 0.6)} ${n(x + 3)} ${n(y - 5)} Z" fill="#5E4A3A"/>` +
  `<ellipse cx="${x}" cy="${n(y - 5)}" rx="3.2" ry="0.8" fill="#7A644E"/>`;

/** Steam rising over a pot whose foot's middle is at (x, y). */
const steam = (x: number, y: number) =>
  [-1.6, 0, 1.6]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 9 - (i % 2) * 1.4);
      return `<path d="M${sx} ${n(y - 6)} Q${n(sx + 1)} ${n(y - 7.4)} ${sx} ${n(y - 8)} Q${n(sx - 1)} ${n(y - 8.6)} ${sx} ${top}" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.8" stroke-linecap="round"/>`;
    })
    .join("");

// The one who followed. Abu Mas'ud al-Ansari said: a man of the Ansar called Abu Shu'aib had a servant, and he said: make
// me food, that I may invite the Messenger of Allah ﷺ as one of five. So he invited the Messenger of Allah ﷺ as one of
// five, and a man followed them. The Prophet ﷺ said: you invited us as one of five, and this man has followed us; if you
// wish, let him in, and if you wish, leave him. He said: rather, I let him in (Sahih al-Bukhari 5434). No one is drawn:
// in Madinah, by the host's home, the host's voice speaks, steam rises from a pot and a dish of food shows. A dashed way
// goes from the host's place to his, a golden ring by the masjid, with four places by it, and a soft ring comes about
// the five. The five come along to the host's door, and one more place follows behind them. His voice speaks at the door,
// and a soft ring comes about the five again; a faint golden line goes to the one who followed, and a soft ring about
// it. A faint golden way shows from it to the door, and a faint grey way back: let in, or left. The host's voice
// answers, the grey way goes, and all go in at the door, the one who followed with them; a warm glow comes in the home.
function oneWhoFollowed(): SignArt {
  const homeAt: [number, number] = [132, 100];
  const host: [number, number] = [122, 105.4];
  const cook: [number, number] = [149, 106.4];
  const potAt: [number, number] = [154.4, 108.6];
  const his: [number, number] = [54, 104.6];
  const four: [number, number][] = [
    [48, 106],
    [43, 104.4],
    [38, 106],
    [33, 104.4]
  ];
  const go = 58;
  const behind: [number, number] = [20, 105.4];
  const inAt = 75;
  return {
    kind: "one-who-followed",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(146, 16) },
      { name: "a cloud", svg: cloud(70, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 99, 0.5) },
      { name: "a palm of Madinah", svg: palm(30, 99, 14) },
      { name: "the host's home", svg: home(homeAt[0], homeAt[1], 22, 14) },
      { name: "the host's place, by his door", svg: someone(host[0], host[1], 1.5) },
      { name: "the cook's place", svg: someone(cook[0], cook[1], 1.4) },
      { name: "a pot of food", svg: pot(potAt[0], potAt[1]) },
      { name: "the host's voice: make me food", svg: arcs(n(host[0] + 3), n(host[1] - 4.4), VOICE), keys: showFor(0.03, 0.04, 0.14, 0.15), loop: speaking },
      { name: "making the food: steam rising from the pot", svg: steam(potAt[0], potAt[1]), keys: showAt(0.05, 0.08), loop: { move: "twinkle", ms: 1400, low: 0.3 } },
      { name: "the food made ready: a dish", svg: food(141, 107.4), keys: showAt(0.06, 0.085) },
      { name: "inviting him: a dashed way to his place", svg: way(`M${n(host[0] - 2)} ${host[1]} Q90 97 ${n(his[0] + 3)} ${n(his[1] - 0.6)}`, GOLD, 0.8), keys: showFor(0.15, 0.19, 0.26, 0.28) },
      { name: "one of five: a soft ring about the five", svg: care(43.4, 105.2, 14, 3.4, GOLD), keys: showFor(0.18, 0.2, 0.26, 0.28) },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.27, 0, 0],
            [0.32, go, 0],
            [0.89, go, 0],
            [0.93, inAt, -0.6]
          ],
          opacity: [
            [0.91, 1],
            [0.94, 0]
          ]
        })
      },
      {
        name: "the places of the four invited with him",
        svg: four.map(([x, y]) => someone(x, y, 1.4)).join(""),
        keys: track({
          xy: [
            [0.27, 0, 0],
            [0.32, go, 0],
            [0.89, go, 0],
            [0.94, n(go + 30), -0.4]
          ],
          opacity: [
            [0.92, 1],
            [0.95, 0]
          ]
        })
      },
      {
        name: "the one who followed: a place behind them",
        svg: someone(behind[0], behind[1], 1.4),
        keys: track({
          xy: [
            [0.27, 0, 0],
            [0.325, go, 0],
            [0.9, go, 0],
            [0.95, n(go + 48), -0.4]
          ],
          opacity: [
            [0.26, 0],
            [0.27, 1],
            [0.93, 1],
            [0.96, 0]
          ]
        })
      },
      { name: "his voice: you invited me as one of five", svg: arcs(n(his[0] + go + 3.4), n(his[1] - 4.4), GOLD), keys: showFor(0.39, 0.4, 0.8, 0.805), loop: speaking },
      { name: "one of five: a soft ring about the five, at the door", svg: care(n(43.4 + go), 105.2, 14, 3.4, GOLD), keys: showFor(0.4, 0.43, 0.87, 0.89) },
      {
        name: "this one has followed: a faint golden line to it",
        svg: lookLine(n(his[0] + go - 2.4), n(his[1] - 2), n(behind[0] + go + 1.6), n(behind[1] - 2), 94, GOLD),
        keys: showFor(0.51, 0.54, 0.87, 0.89)
      },
      { name: "the one who followed: a soft ring about it", svg: care(n(behind[0] + go), n(behind[1] + 0.2), 4, 2, GOLD), keys: showFor(0.53, 0.56, 0.87, 0.89) },
      { name: "if you wish, let him in: a faint golden way to the door", svg: way(`M${n(behind[0] + go + 2)} ${n(behind[1] - 1)} Q100 97.6 ${n(homeAt[0] - 4.6)} ${n(homeAt[1] + 2.6)}`, GOLD, 0.6), keys: showFor(0.63, 0.67, 0.9, 0.93) },
      { name: "and if you wish, leave him: a faint grey way back", svg: way(`M${n(behind[0] + go - 2)} ${n(behind[1] + 0.6)} Q60 109 36 106.6`, GREY, 0.6), keys: showFor(0.75, 0.79, 0.87, 0.89) },
      { name: "the host's voice: rather, I let him in", svg: arcs(n(host[0] + 3), n(host[1] - 4.4), VOICE), keys: showFor(0.87, 0.88, 0.95, 0.96), loop: speaking },
      { name: "let in: a warm glow in the home", svg: glow(homeAt[0], 94, 10, WARM, 0.3), keys: showAt(0.93, 0.96) }
    ],
    words: [
      { text: "Abu Shu'aib: Make me food to invite him", from: 0.02, to: 0.125 },
      { text: "So Abu Shu'aib invited him, one of five", from: 0.14, to: 0.245 },
      { text: "But a man followed them", from: 0.26, to: 0.365 },
      { text: "You invited me as one of five", from: 0.38, to: 0.485 },
      { text: "And this man has followed us", from: 0.5, to: 0.605 },
      { text: "If you wish, let him in", from: 0.62, to: 0.725 },
      { text: "And if you wish, leave him", from: 0.74, to: 0.845 },
      { text: "Abu Shu'aib: Rather, I let this man in", from: 0.86, to: 1 }
    ]
  };
}

/** A small walled place set apart, low walls of mud brick with an opening, its foot's middle at (x, y). */
const walledPlace = (x: number, y: number) =>
  `<rect x="${n(x - 11)}" y="${n(y - 10)}" width="22" height="10" fill="#CDB083"/><rect x="${n(x - 11.6)}" y="${n(y - 11)}" width="23.2" height="1.2" fill="#B39466"/>` +
  `<path d="M${n(x - 2.4)} ${y} L${n(x - 2.4)} ${n(y - 6.6)} Q${x} ${n(y - 8.4)} ${n(x + 2.4)} ${n(y - 6.6)} L${n(x + 2.4)} ${y} Z" fill="#6B4A2E"/>`;

// The water for wudu. Ibn Abbas said: the Prophet ﷺ went in to relieve himself, and I set out water for his wudu. He
// said: who put this? He was told, and he said: O Allah, give him understanding of the religion (Sahih al-Bukhari 143).
// No one is drawn: in the morning in Madinah, his place, a golden ring, goes in at the opening of a small walled place
// set apart. A small place comes from the home with a jug of water, sets it by the opening, and steps back. His place
// comes out, a soft ring comes about the jug, and his voice asks. A voice from the home tells him, and a faint golden
// line goes from his place to the small place. His voice makes the du'a, and a spark rises; then a soft golden ring
// comes about the small place, small lights about it, and a warm glow: understanding of the religion.
function waterForWudu(): SignArt {
  const homeAt: [number, number] = [34, 100];
  const placeAt: [number, number] = [114.4, 106];
  const his: [number, number] = [90, 105.6];
  const small: [number, number] = [41, 106.4];
  const setBy: [number, number] = [108, 106.6];
  const back: [number, number] = [96, 106.6];
  const jugFrom: [number, number] = [43.4, 107.2];
  const jugAt: [number, number] = [110.4, 107.4];
  return {
    kind: "water-for-wudu",
    ms: 9000,
    parts: [
      { name: "sky in the morning", svg: sky("#CFE6F7", "#F4E7CF", 62) },
      { name: "the morning sun", svg: sun(20, 24) },
      { name: "a cloud", svg: cloud(118, 22, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a palm of Madinah", svg: palm(66, 99, 15), origin: { x: 66, y: 99 }, loop: { move: "sway", ms: 5400, angle: 1.2 } },
      { name: "the home", svg: home(homeAt[0], homeAt[1], 22, 14) },
      { name: "a small walled place, set apart", svg: walledPlace(placeAt[0], placeAt[1]) },
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.07, n(placeAt[0] - his[0]), n(placeAt[1] + 0.4 - his[1])]
          ],
          opacity: [
            [0.06, 1],
            [0.08, 0],
            [0.23, 0],
            [0.25, 1]
          ]
        })
      },
      {
        name: "Ibn Abbas's place: a small dashed circle",
        svg: someone(small[0], small[1], 1.2),
        keys: track({
          xy: [
            [0.08, 0, 0],
            [0.12, n(setBy[0] - small[0]), n(setBy[1] - small[1])],
            [0.13, n(setBy[0] - small[0]), n(setBy[1] - small[1])],
            [0.16, n(back[0] - small[0]), n(back[1] - small[1])]
          ]
        })
      },
      {
        name: "the water for wudu: a jug",
        svg: jug(jugFrom[0], jugFrom[1]),
        keys: track({
          xy: [
            [0.08, 0, 0],
            [0.12, n(jugAt[0] - jugFrom[0]), n(jugAt[1] - jugFrom[1])]
          ]
        })
      },
      { name: "he saw it: a soft ring about the jug", svg: care(jugAt[0], n(jugAt[1] - 1), 3.8, 2, GOLD), keys: showFor(0.25, 0.28, 0.8, 0.82) },
      { name: "his voice: who put this?", svg: arcs(n(placeAt[0] + 3.4), n(placeAt[1] - 4), GOLD), keys: showFor(0.27, 0.28, 0.42, 0.43), loop: speaking },
      { name: "a voice from the home: telling him", svg: arcs(n(homeAt[0] + 2.4), n(homeAt[1] - 1), VOICE), keys: showFor(0.43, 0.44, 0.53, 0.54), loop: speaking },
      { name: "told: a faint golden line to Ibn Abbas's place", svg: lookLine(n(placeAt[0] - 2.4), n(placeAt[1] - 1.6), n(back[0] + 1.8), n(back[1] - 1.6), 99, GOLD), keys: showFor(0.46, 0.5, 0.8, 0.82) },
      { name: "his voice: the du'a", svg: arcs(n(placeAt[0] + 3.4), n(placeAt[1] - 4), GOLD), keys: showFor(0.61, 0.62, 0.95, 0.96), loop: speaking },
      { name: "the du'a: a spark rising", svg: sparkle(placeAt[0], 96, 1.6, "#FFE7A0"), keys: sparkRising(0.63, 0.72, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "understanding of the religion: a soft golden ring about Ibn Abbas's place", svg: care(back[0], back[1], 4.4, 2.4, GOLD), keys: showAt(0.81, 0.84), loop: soft },
      {
        name: "understanding: small lights about his place",
        svg: [
          [91.6, 101.4],
          [99.6, 100.6],
          [95.6, 98]
        ]
          .map(([x, y]) => sparkle(x, y, 0.9, "#FFE7A0"))
          .join(""),
        keys: showAt(0.84, 0.88),
        loop: speaking
      },
      { name: "a warm glow about Ibn Abbas's place", svg: glow(back[0], n(back[1] - 2), 6, WARM, 0.3), keys: showAt(0.86, 0.9) }
    ],
    words: [
      { text: "Ibn Abbas: He went in; I set out water", from: 0.02, to: 0.2 },
      { text: "He said: who put this?", from: 0.22, to: 0.4 },
      { text: "He was told, and he said", from: 0.42, to: 0.58 },
      { text: "O Allah, give Ibn Abbas understanding", from: 0.6, to: 0.78 },
      { text: "Of the religion", from: 0.8, to: 1 }
    ]
  };
}

/** The Black Stone in its frame of silver, its middle at (x, y). */
const blackStone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="1.6" fill="#2A2A2A" stroke="#C9CED4" stroke-width="0.6"/>`;

// Tawaf on his camel. Ibn Abbas said: the Prophet ﷺ went round the House on a camel; each time he came to the Corner he
// pointed to it with something he had with him, and said: Allahu akbar (Sahih al-Bukhari 1613). No one is drawn, and no
// one is drawn on the camel: in Makkah, the Ka'bah stands in the middle, the Corner of the Black Stone at its front, and
// the folk's places about it. The camel goes round, his place a golden ring by it: along the front, behind the House
// and round again to the Corner. A soft golden ring comes about the Corner; a faint golden line goes from his place to
// it, and a glint shows there. His voice says the takbir, a spark rises, and the camel goes on round.
function tawafOnCamel(): SignArt {
  const [kx, ky, kw] = [66, 97, 28];
  const stone: [number, number] = [n(kx + 1.6), 92.2];
  const front: [number, number] = [62, 106.4];
  const behind: [number, number] = [100, 94.6];
  const camelWithRing = (x: number, y: number, s: number, left: boolean, r: number) => camel(x, y, s, left) + ring(x, n(y + 1.6), r, GOLD);
  return {
    kind: "tawaf-on-camel",
    ms: 10000,
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
      { name: "the land", svg: land() },
      { name: "homes of Makkah, far off", svg: home(12, 80, 10, 7) + home(26, 78.4, 9, 6) + home(134, 79, 10, 7) + home(148, 80.6, 9, 6) },
      { name: "the ground about the House", svg: `<ellipse cx="80" cy="99" rx="62" ry="9.6" fill="#EADFC6"/>` },
      {
        name: "the camel going round, behind the House: his place a golden ring by it",
        svg: camelWithRing(behind[0], behind[1], 0.12, true, 2),
        keys: track({
          xy: [
            [0.11, 0, 0],
            [0.17, -44, 0]
          ],
          opacity: [
            [0.1, 0],
            [0.11, 1],
            [0.24, 1],
            [0.26, 0]
          ]
        })
      },
      { name: "the Ka'bah, the House", svg: turned(kabah(kx, ky, kw), n(kx + kw / 2)) },
      { name: "the Corner of the Black Stone", svg: blackStone(stone[0], stone[1]) },
      {
        name: "the folk's places about the House",
        svg: [
          [36, 101.4],
          [124, 101.4],
          [116, 106.4],
          [42, 106.8]
        ]
          .map(([x, y]) => someone(x, y, 1.3))
          .join("")
      },
      {
        name: "the camel going round, in front: his place a golden ring by it",
        svg: camelWithRing(front[0], front[1], 0.15, false, 2.6),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, 38, 0],
            [0.12, 38, 0],
            [0.16, -12, -4],
            [0.26, -12, -4],
            [0.3, 0, 0],
            [0.87, 0, 0],
            [0.95, 30, 0]
          ],
          opacity: [
            [0.1, 1],
            [0.11, 0],
            [0.24, 0],
            [0.26, 1]
          ]
        })
      },
      { name: "at the Corner: a soft golden ring", svg: care(stone[0], stone[1], 3.4, 3.6, GOLD), keys: showFor(0.31, 0.34, 0.87, 0.9) },
      { name: "pointing to the Corner: a faint golden line", svg: lookLine(front[0], n(front[1] - 1.4), n(stone[0] - 0.6), n(stone[1] + 1.8), 100, GOLD), keys: showFor(0.49, 0.53, 0.87, 0.89) },
      { name: "at the Corner: a glint", svg: sparkle(stone[0], stone[1], 1.6, "#FFF3C0"), keys: showFor(0.53, 0.56, 0.87, 0.89), loop: speaking },
      { name: "his voice: the takbir", svg: arcsLeft(n(front[0] - 9.6), n(front[1] - 6), GOLD), keys: showFor(0.73, 0.74, 0.87, 0.89), loop: speaking },
      { name: "the takbir: a spark rising", svg: sparkle(n(front[0] - 4), 90, 1.6, "#FFE7A0"), keys: sparkRising(0.75, 0.84, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } }
    ],
    words: [
      { text: "He went round the House on a camel", from: 0.02, to: 0.22 },
      { text: "Each time he came to the Corner", from: 0.24, to: 0.46 },
      { text: "He pointed to it with something he had", from: 0.48, to: 0.7 },
      { text: "And said: Allahu akbar", from: 0.72, to: 1 }
    ]
  };
}

/** A goat of the picture cards, `s` times its size, its feet at (x, y). */
const goat = (x: number, y: number, s: number, left = false) => animalAt("goat", n(x - 50 * s), n(y - 73 * s), s, left);

/** A wooden bowl for milking, its rim's middle at (x, y). */
const bowl = (x: number, y: number) => `<path d="M${n(x - 3)} ${y} Q${x} ${n(y + 3.2)} ${n(x + 3)} ${y} Z" fill="#9A6234"/><ellipse cx="${x}" cy="${y}" rx="3" ry="0.8" fill="#C98B4E"/>`;

/** Milk in a cup whose foot's middle is at (x, y). */
const milkIn = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 3.2)}" rx="1.4" ry="0.45" fill="#FFFFFF"/>`;

/** A cloth over a cup whose foot's middle is at (x, y): covered, kept. */
const cover = (x: number, y: number) => `<path d="M${n(x - 2.2)} ${n(y - 3)} Q${x} ${n(y - 5.4)} ${n(x + 2.2)} ${n(y - 3)} L${n(x + 2)} ${n(y - 2.2)} L${n(x - 2)} ${n(y - 2.2)} Z" fill="#E9E2D0"/>`;

// A soft salam at night. Al-Miqdad said: the Prophet ﷺ took us to his family, and there were three goats. He said: milk
// this milk, to share among us. Each of us would drink his share, and we kept his share for him. He would come at night
// and give salam in a way that did not wake one asleep, and let one awake hear it. Then he would come to the masjid and
// pray, then come to his drink and drink it (Sahih Muslim 2055a). No one is drawn: at dusk in Madinah, his home stands by
// the masjid, three goats by it. His place, a golden ring, comes to the home with the places of the three who came. His
// voice speaks, and milk shows in the bowl; a cup comes by each of the three, and a covered cup by the door, a soft ring
// about it: kept for him. His place goes in at the masjid. Night comes, the stars and the moon; his place comes to the
// home, and his voice is soft arcs. A soft blue ring comes about two places: asleep, not woken; a faint golden line goes
// to the third, and a soft golden ring about it: awake, it heard. His place goes to the masjid, and a spark of the
// prayer rises. Then it comes to the covered cup; the cover goes, the milk goes down, and a soft glint shows: he drank.
function softSalam(): SignArt {
  const homeAt: [number, number] = [84, 100];
  const door: [number, number] = [82, 105.4];
  const masjidDoor: [number, number] = [58.4, 102.2];
  const hisFrom: [number, number] = [64, 105.6];
  const three: [number, number][] = [
    [100, 107.6],
    [106, 106.6],
    [112, 107.6]
  ];
  const go = 54;
  const kept: [number, number] = [88.6, 106.6];
  const drinkAt: [number, number] = [91.6, 105.6];
  const bowlAt: [number, number] = [119, 108.8];
  const atDoor: [number, number] = [n(door[0] - hisFrom[0]), n(door[1] - hisFrom[1])];
  const atMasjid: [number, number] = [n(masjidDoor[0] - hisFrom[0]), n(masjidDoor[1] - hisFrom[1])];
  const atDrink: [number, number] = [n(drinkAt[0] - hisFrom[0]), n(drinkAt[1] - hisFrom[1])];
  const threeAt = (x: number, y: number, color: string) => someone(x, y, 1.4, color);
  return {
    kind: "soft-salam",
    ms: 12000,
    parts: [
      { name: "the sky at dusk", svg: sky("#E9B98E", "#F6DCC0", 62) },
      {
        name: "the night coming",
        svg: nightSky(62),
        keys: track({
          opacity: [
            [0.38, 0],
            [0.42, 1]
          ]
        })
      },
      {
        name: "stars",
        svg: stars([
          [44, 16],
          [66, 28],
          [90, 14],
          [108, 26],
          [128, 14],
          [150, 24],
          [14, 36]
        ]),
        keys: showAt(0.4, 0.43),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      { name: "the moon", svg: glow(28, 22, 10, "#FFF6D0", 0.08) + crescent(28, 22, 5, 2.4, "#FFF3B8"), keys: showAt(0.4, 0.43) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a palm of Madinah", svg: palm(30, 99, 15) },
      { name: "the masjid of Madinah, by his home", svg: madinahMasjid(44, 99, 0.6) },
      { name: "his home", svg: home(homeAt[0], homeAt[1], 20, 14) },
      { name: "three goats", svg: goat(128, 107.6, 0.12) + goat(140, 108.4, 0.12, true) + goat(151, 107.6, 0.12) },
      { name: "a bowl for the milk", svg: bowl(bowlAt[0], bowlAt[1]) },
      {
        name: "the dark of the night over the land",
        svg: `<rect y="58" width="160" height="62" fill="#0B1430" opacity="0.45"/>`,
        keys: track({
          opacity: [
            [0.38, 0],
            [0.42, 1]
          ]
        })
      },
      {
        name: "a golden ring, his place",
        svg: ring(hisFrom[0], hisFrom[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.08, atDoor[0], atDoor[1]],
            [0.29, atDoor[0], atDoor[1]],
            [0.32, atMasjid[0], atMasjid[1]],
            [0.39, atMasjid[0], atMasjid[1]],
            [0.43, atDoor[0], atDoor[1]],
            [0.74, atDoor[0], atDoor[1]],
            [0.77, atMasjid[0], atMasjid[1]],
            [0.885, atMasjid[0], atMasjid[1]],
            [0.92, atDrink[0], atDrink[1]]
          ],
          opacity: [
            [0.31, 1],
            [0.325, 0],
            [0.38, 0],
            [0.39, 1]
          ]
        })
      },
      {
        name: "the places of the three who came",
        svg: three.map(([x, y]) => threeAt(n(x - go), y, VOICE)).join(""),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.08, go, 0]
          ],
          opacity: [
            [0.38, 1],
            [0.42, 0]
          ]
        })
      },
      { name: "the three at night: their places", svg: three.map(([x, y]) => threeAt(x, y, LIGHT)).join(""), keys: showAt(0.38, 0.42) },
      { name: "his voice: milk this milk, to share among us", svg: arcs(n(door[0] + 3.4), n(door[1] - 4.4), GOLD), keys: showFor(0.15, 0.16, 0.26, 0.27), loop: speaking },
      { name: "milking: milk in the bowl", svg: `<ellipse cx="${bowlAt[0]}" cy="${n(bowlAt[1] + 0.1)}" rx="2.4" ry="0.6" fill="#FFFFFF"/>`, keys: showAt(0.17, 0.2) },
      { name: "each one's share: a cup by each of the three", svg: three.map(([x, y]) => cup(n(x + 2.6), n(y + 0.6)) + milkIn(n(x + 2.6), n(y + 0.6))).join(""), keys: showAt(0.27, 0.29) },
      { name: "his share, kept for him: a covered cup by the door", svg: cup(kept[0], kept[1]), keys: showAt(0.28, 0.3) },
      {
        name: "his drink in the cup",
        svg: milkIn(kept[0], kept[1]),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.3, 1],
            [0.925, 1],
            [0.95, 0]
          ]
        })
      },
      {
        name: "the cloth over his cup",
        svg: cover(kept[0], kept[1]),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.3, 1],
            [0.915, 1],
            [0.925, 0]
          ]
        })
      },
      { name: "kept for him: a soft ring about the covered cup", svg: care(kept[0], n(kept[1] - 0.6), 3.2, 1.8, GOLD), keys: showFor(0.29, 0.31, 0.92, 0.94) },
      { name: "his voice: a soft salam", svg: `<g opacity="0.7">${arcs(n(door[0] + 3.2), n(door[1] - 4.2), LIGHT)}</g>`, keys: showFor(0.43, 0.44, 0.745, 0.76), loop: speaking },
      ...three.slice(0, 2).map(([x, y], i): SignPart => ({
        name: `asleep, not woken: a soft blue ring about a place ${i + 1}`,
        svg: care(x, n(y + 0.2), 3.4, 1.8, "#8FA6D8"),
        keys: showAt(at3(0.51 + i * 0.01), at3(0.54 + i * 0.01))
      })),
      { name: "awake, hearing it: a faint golden line", svg: lookLine(n(door[0] + 3.4), n(door[1] - 3), n(three[2][0] - 1.6), n(three[2][1] - 1.6), 96, GOLD), keys: showFor(0.62, 0.65, 0.745, 0.76) },
      { name: "awake, it heard: a soft golden ring about the third place", svg: care(three[2][0], n(three[2][1] + 0.2), 3.6, 2, GOLD), keys: showAt(0.64, 0.67), loop: soft },
      { name: "the prayer: a spark rising", svg: sparkle(masjidDoor[0], 88, 1.6, "#FFE7A0"), keys: sparkRising(0.775, 0.825, 8), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "he drank: a soft glint at his place", svg: sparkle(n(drinkAt[0] - 0.6), n(drinkAt[1] - 4.6), 1.2, "#E4F2FA"), keys: showAt(0.94, 0.96), loop: speaking }
    ],
    words: [
      { text: "He took us home: there were three goats", from: 0.02, to: 0.125 },
      { text: "Milk this milk, to share among us", from: 0.14, to: 0.245 },
      { text: "Each drank his share; we kept his for him", from: 0.26, to: 0.365 },
      { text: "He would come at night and give salam", from: 0.38, to: 0.485 },
      { text: "Not waking one who was asleep", from: 0.5, to: 0.605 },
      { text: "And letting one awake hear it", from: 0.62, to: 0.725 },
      { text: "Then he would go to the masjid and pray", from: 0.74, to: 0.865 },
      { text: "Then come to his drink, and drink it", from: 0.88, to: 1 }
    ]
  };
}

export const GENTLE_ART = {
  "silver-and-gold-gardens": silverAndGoldGardens,
  "guard-tonight": guardTonight,
  "vow-in-the-sun": vowInTheSun,
  "one-who-followed": oneWhoFollowed,
  "water-for-wudu": waterForWudu,
  "tawaf-on-camel": tawafOnCamel,
  "soft-salam": softSalam
};
