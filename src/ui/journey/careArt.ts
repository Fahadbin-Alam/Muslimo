import { animalAt, cloud, glow, n, sky, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, palms, tent, track } from "./daysArt";
import { cloth, greyRing, soft, spark, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { dish } from "./worthArt";
import { kabah } from "./historyArt";
import { thornyTree } from "./dearArt";
import { at3 } from "./storyArt";

/**
 * Care in small things and in great ones, in his ﷺ days: the Ka'bah left as Quraysh had built it, short of Ibrahim's
 * foundations, so as not to unsettle a people new to Islam; a garment spread to prostrate on in the scorching heat; a
 * cup of milk to be covered, even with a stick laid across it; one date, shared by a mother between her two
 * daughters; the bowl he drank from, kept and shared after him; Abu Dharr's slave dressed as Abu Dharr was dressed;
 * and half a sa' of dates, given and mocked. Only the land, the sky, buildings, things, plants and animals are drawn.
 * No Prophet, no Companion and no person is ever drawn, not even a hand or a face: where someone was, a ring or a
 * small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn
 * for Allah, and nothing comes down from the sky: a prayer or a deed is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#E8C878";

/** Grey, for words that should not have been said. */
const GREY = "#8E8E8E";

/** Opacity keys through the given points, each [time, opacity]. */
const fade = (points: [number, number][]) => track({ opacity: points });

/** Keys that unroll a part from its origin: shown at `from`, spread out by 0.035 after. */
const unroll = (from: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.005), 1]
    ],
    scaleX: [
      [from, 0],
      [at3(from + 0.035), 1]
    ]
  });

/** A date, lying on its side, its middle at (x, y). */
const bigDate = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="1.9" ry="1.1" fill="#8C3A1C"/>` +
  `<path d="M${n(x - 1)} ${n(y - 0.4)} Q${x} ${n(y - 0.9)} ${n(x + 1)} ${n(y - 0.4)}" stroke="#B7603A" stroke-width="0.35" fill="none"/>`;

/** Half of a date, its cut side up, its middle at (x, y). */
const halfDate = (x: number, y: number) =>
  `<path d="M${n(x - 1.2)} ${y} A1.2 0.9 0 0 0 ${n(x + 1.2)} ${y} Z" fill="#8C3A1C"/><path d="M${n(x - 1.1)} ${y} L${n(x + 1.1)} ${y}" stroke="#D9955E" stroke-width="0.4"/>`;

/** A wooden cup, its foot's middle at (x, y). */
const woodCup = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y - 3.4)} L${n(x + 2.4)} ${n(y - 3.4)} L${n(x + 1.6)} ${y} L${n(x - 1.6)} ${y} Z" fill="#9A6A3C"/>` +
  `<ellipse cx="${x}" cy="${n(y - 3.4)}" rx="2.4" ry="0.6" fill="#7A522C"/>`;

/** The milk in a wooden cup whose foot's middle is at (x, y). */
const milkIn = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 3.3)}" rx="2.1" ry="0.48" fill="#FBF8F0"/>`;

/** A wooden bowl, its foot's middle at (x, y). */
const woodBowl = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${n(y - 2.6)} Q${x} ${n(y + 1.2)} ${n(x + 3.2)} ${n(y - 2.6)} Z" fill="#9A6A3C"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.6)}" rx="3.2" ry="0.7" fill="#7A522C"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 1.2)} Q${x} ${n(y - 0.4)} ${n(x + 1.6)} ${n(y - 1.2)}" stroke="#B88650" stroke-width="0.35" fill="none"/>`;

/** A small measure of wood with dates heaped in it, its foot's middle at (x, y): half a sa'. */
const halfSa = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${n(y - 2.6)} L${n(x + 2.2)} ${n(y - 2.6)} L${n(x + 1.8)} ${y} L${n(x - 1.8)} ${y} Z" fill="#A87A44"/>` +
  [-1.1, 0, 1.1, -0.5, 0.6].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 3 - (i < 3 ? 0 : 0.8))}" rx="0.7" ry="0.5" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`).join("");

/** A folded cloak of stripes, its middle at (x, y). */
const stripedCloak = (x: number, y: number) =>
  `<rect x="${n(x - 3.6)}" y="${n(y - 1.2)}" width="7.2" height="2.4" rx="0.6" fill="#8C4A3A"/>` +
  `<path d="M${n(x - 3.6)} ${n(y - 0.4)} L${n(x + 3.6)} ${n(y - 0.4)} M${n(x - 3.6)} ${n(y + 0.5)} L${n(x + 3.6)} ${n(y + 0.5)}" stroke="#E8C45A" stroke-width="0.4"/>`;

/** Food on a dish, its middle at (x, y): a round loaf and two dates. */
const meal = (x: number, y: number) =>
  dish(x, y) +
  `<ellipse cx="${n(x - 0.8)}" cy="${n(y - 1.8)}" rx="1.9" ry="1" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>` +
  `<ellipse cx="${n(x + 1.6)}" cy="${n(y - 1.5)}" rx="0.8" ry="0.55" fill="#7A2E14"/><ellipse cx="${n(x + 2.4)}" cy="${n(y - 1.2)}" rx="0.8" ry="0.55" fill="#93391B"/>`;

/** A thin rising line of heat, its foot at (x, y). */
const heatLine = (x: number, y: number) =>
  `<path d="M${x} ${y} q1.2 -1.6 0 -3.2 q-1.2 -1.6 0 -3.2 q1.2 -1.6 0 -3.2" stroke="#F6B86A" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="0.8"/>`;

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s = 0.12, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);

// The Ka'bah left as it was. Aishah said that the Messenger of Allah ﷺ said to her: do you not see that when your
// people built the Ka'bah, they fell short of the foundations of Ibrahim? I said: will you not return it to the
// foundations of Ibrahim? He said: were it not that your people are so newly out of disbelief, I would have done it.
// Abdullah ibn Umar said: then I think he ﷺ left touching the two corners that face the Hijr only because the House was
// not completed on the foundations of Ibrahim (Sahih al-Bukhari 1583). No one is drawn: in Makkah, among its hills, the
// open ground about the House, and the places of the folk about it. His place, a golden ring, and the place beside it
// are in front. His voice speaks, and the House rises, as they built it, and the low curved wall of the Hijr beside
// it. A faint golden outline shows on the ground: Ibrahim's foundations, reaching beyond it, and a faint ring comes
// about the Hijr, left out. The voice beside him asks, and a faint golden outline of the House rises over the whole of
// the foundations: as it could be. His voice answers: a soft ring comes about the folk, new to Islam; the outlines
// fade, not done, and a warm glow comes about the folk. Ibn Umar's place comes and its voice speaks: faint rings show
// at the two corners by the Hijr, and Ibrahim's foundations show again on the ground, beyond the House.
function kaabaAsItWas(): SignArt {
  const ground = `<ellipse cx="84" cy="98.8" rx="56" ry="8.4" fill="#F3EAD6"/>`;
  const hijr =
    `<path d="M82.8 96.6 C90 100.2 101.6 99.8 105 95.8 C106.6 93.6 99 91.6 88.6 92.8" stroke="#BDB3A0" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    `<path d="M82.8 95.8 C90 99.4 101.6 99 105 95 C106.6 92.8 99 90.8 88.6 92" stroke="#F4EFE3" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  const foundations = `<path d="M61.2 96.9 L98.8 96.9 L105.2 92.9 L67.6 92.9 Z" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1.2 1" fill="${WARM}" fill-opacity="0.12"/>`;
  const couldBe = `<path d="M62 96 L62 76 L98 76 L98 96 M98 96 L104 92.4 L104 72.4 L98 76 M62 76 L68 72.4 L104 72.4" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1.2 1" fill="none"/>`;
  const folk: [number, number][] = [
    [47, 101.4],
    [55, 103.8],
    [113, 103],
    [123, 100.8],
    [131, 103.6]
  ];
  return {
    kind: "kaaba-as-it-was",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE3F0", "#ECDDBA", 62) },
      { name: "the sun", svg: sun(138, 22) },
      { name: "a cloud", svg: cloud(44, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the hills of Makkah", svg: hills("#B8A27E") },
      { name: "the land", svg: landOf([[12, 110], [148, 109]]) },
      { name: "the open ground about the House", svg: ground },
      { name: "the places of the folk, about the House", svg: folk.map(([x, y]) => someone(x, y)).join("") },
      {
        name: "the House, as they built it",
        svg: kabah(62, 96, 20),
        origin: { x: 75, y: 96 },
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          scaleY: [
            [0.03, 0],
            [0.075, 1]
          ]
        })
      },
      { name: "the Hijr: its low curved wall", svg: hijr, keys: showAt(0.07, 0.08) },
      { name: "his place, a golden ring", svg: ring(24, 104.6, 2.6, GOLD) },
      { name: "the place beside him", svg: someone(36, 105) },
      { name: "his voice: when your folk built it", svg: arcs(26.8, 103.2, GOLD), keys: showFor(0.025, 0.035, 0.145, 0.155), loop: speaking },
      {
        name: "Ibrahim's foundations: a faint golden outline on the ground",
        svg: foundations,
        keys: fade([
          [0.15, 0],
          [0.17, 1],
          [0.55, 1],
          [0.58, 0],
          [0.9, 0],
          [0.92, 1]
        ]),
        loop: soft
      },
      { name: "left out: a faint ring about the Hijr", svg: care(95, 95.6, 12, 3.4, "#FFFFFF"), keys: showFor(0.175, 0.19, 0.55, 0.58), loop: soft },
      { name: "the voice beside him: will you not return it", svg: arcsLeft(33.4, 103.6, VOICE), keys: showFor(0.265, 0.275, 0.395, 0.405), loop: speaking },
      {
        name: "as it could be: a faint golden outline of the House on the foundations",
        svg: couldBe,
        keys: fade([
          [0.285, 0],
          [0.315, 1],
          [0.55, 1],
          [0.58, 0]
        ]),
        loop: soft
      },
      { name: "his voice: were your folk not so new", svg: arcs(26.8, 103.2, GOLD), keys: showFor(0.395, 0.405, 0.655, 0.665), loop: speaking },
      {
        name: "new to Islam: a soft ring about the folk",
        svg: care(51, 102.6, 8, 2.6, SOFT_GOLD) + care(122, 102.2, 13, 3, SOFT_GOLD),
        keys: showAt(0.42, 0.44),
        loop: soft
      },
      {
        name: "gentle with them: a warm glow about the folk",
        svg: wash(51, 102, 12, 5, WARM, 0.16) + wash(122, 101.8, 16, 5, WARM, 0.16),
        keys: showAt(0.56, 0.59)
      },
      { name: "Ibn Umar's place", svg: someone(146, 105), keys: showAt(0.655, 0.665) },
      { name: "Ibn Umar's voice", svg: arcsLeft(143.4, 103.6, VOICE), keys: showAt(0.665, 0.675), loop: speaking },
      {
        name: "not touched: faint rings at the two corners by the Hijr",
        svg: care(82.6, 96.2, 2.6, 1.2, "#FFFFFF") + care(88.4, 92.8, 2.4, 1.1, "#FFFFFF"),
        keys: showAt(0.785, 0.8),
        loop: soft
      }
    ],
    words: [
      { text: "He said: when your people built the Ka'bah", from: 0.02, to: 0.125 },
      { text: "they fell short of Ibrahim's foundations", from: 0.14, to: 0.245 },
      { text: "Aishah: will you not return it to them?", from: 0.26, to: 0.375 },
      { text: "He said: were your people not so newly", from: 0.39, to: 0.505 },
      { text: "out of disbelief, I would have done it", from: 0.52, to: 0.635 },
      { text: "Ibn Umar said: he did not touch", from: 0.65, to: 0.755 },
      { text: "the two corners that face the Hijr", from: 0.77, to: 0.875 },
      { text: "as the House was not completed on them", from: 0.89, to: 1 }
    ]
  };
}

// A garment in the heat. Anas ibn Malik said: we used to pray with the Prophet ﷺ in the scorching heat, and if one of
// us could not put his face on the earth, he would spread his garment and prostrate on it (Sahih al-Bukhari 1208). No
// one is drawn: by the masjid of Madinah, under a burning sun, his place, a golden ring, leads, and the places of the
// folk stand behind it in two rows. A hot glow comes about the sun, heat rises from the earth, and a spark of the
// prayer rises. A pale red glow shows on the earth before one place, too hot, and heat rises there. Then a garment
// is spread out there, and before two more places, and the red glow is gone; a spark rises from each garment, the
// prostration, and soft rings come about them.
function clothInTheHeat(): SignArt {
  const first = [62, 71, 80, 89];
  const second = [66, 75, 84, 93];
  const garment = (i: number, x: number, y: number, from: number): SignPart => ({
    name: `a garment spread out ${i}`,
    svg: cloth(n(x - 8), n(x - 3), n(y - 1), i === 2 ? "#E3EBF2" : "#FBF5E8"),
    origin: { x: n(x - 3), y: n(y + 0.6) },
    keys: unroll(from)
  });
  const heat = (i: number, x: number, y: number, phase: number): SignPart => ({
    name: `heat rising from the earth ${i}`,
    svg: heatLine(x, y),
    keys: showAt(0.04, 0.08),
    loop: { move: "bob", ms: 1600, y: -1.4, phase }
  });
  return {
    kind: "cloth-in-the-heat",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#F4E4BE", "#F6E7C8", 62) },
      { name: "the sun", svg: sun(116, 22) },
      { name: "the scorching heat: a hot glow about the sun", svg: glow(116, 22, 24, "#FFC861", 0.12), keys: showAt(0.03, 0.08), loop: { move: "twinkle", ms: 2400, low: 0.7 } },
      { name: "hills", svg: hills("#D2B48A") },
      { name: "the land", svg: landOf([[20, 110], [118, 111], [150, 108]], "#E8C892") },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 93, 0.72) },
      ...palms([
        [148, 96, 14],
        [136, 94, 11]
      ]),
      { name: "the earth, burning hot", svg: wash(78, 103, 58, 7, "#FF9A5A", 0.12), keys: showAt(0.05, 0.1) },
      heat(1, 44, 101, 0),
      heat(2, 104, 102, 0.33),
      heat(3, 122, 101, 0.66),
      { name: "his place, a golden ring, leading", svg: ring(50, 100.6, 2.6, GOLD) },
      { name: "the places in the first row", svg: first.map((x) => someone(x, 100.4)).join("") },
      { name: "the places in the second row", svg: second.map((x) => someone(x, 104.6)).join("") },
      spark("the prayer: a spark rising", 76, 95, 0.1, 0.145),
      {
        name: "too hot: a pale red glow on the earth before one place",
        svg: wash(65.5, 100.6, 4.6, 1.8, "#FF6A3D", 0.34),
        keys: fade([
          [0.22, 0],
          [0.25, 1],
          [0.62, 1],
          [0.64, 0]
        ]),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      },
      {
        name: "heat rising there",
        svg: heatLine(65.5, 99.6),
        keys: fade([
          [0.42, 0],
          [0.46, 1],
          [0.62, 1],
          [0.64, 0]
        ]),
        loop: { move: "bob", ms: 1200, y: -1.2 }
      },
      garment(1, 71, 100.4, 0.62),
      garment(2, 89, 100.4, 0.655),
      garment(3, 75, 104.6, 0.69),
      spark("the prostration: a spark rising from the first garment", 65.5, 97.6, 0.82, 0.86),
      spark("the prostration: a spark rising from the second garment", 83.5, 97.6, 0.845, 0.885),
      spark("the prostration: a spark rising from the third garment", 69.5, 101.8, 0.87, 0.91),
      {
        name: "eased: soft rings about the garments",
        svg: care(65.5, 101, 4.2, 1.6, SOFT_GOLD) + care(83.5, 101, 4.2, 1.6, SOFT_GOLD) + care(69.5, 105.2, 4.2, 1.6, SOFT_GOLD),
        keys: showAt(0.86, 0.9),
        loop: soft
      }
    ],
    words: [
      { text: "Anas: We'd pray with him in scorching heat", from: 0.02, to: 0.19 },
      { text: "If one of us could not put", from: 0.21, to: 0.39 },
      { text: "their face on the earth", from: 0.41, to: 0.59 },
      { text: "that one would spread out their garment", from: 0.61, to: 0.79 },
      { text: "and prostrate on it", from: 0.81, to: 1 }
    ]
  };
}

// The covered cup. Jabir ibn Abdullah said: Abu Humayd brought a cup of milk from al-Naqi', and the Messenger of
// Allah ﷺ said to him: will you not cover it, even by laying a stick across it? (Sahih al-Bukhari 5605). No one is
// drawn: on the left, the green pasture of al-Naqi', with its pool and its sheep; on the right, his home in Madinah,
// and his place, a golden ring, before it. By Abu Humayd's place at al-Naqi', a wooden cup fills with milk, and a soft
// glint shows on it. A faint ring comes about the pasture, and Abu Humayd's place and the cup come along the way to
// his place. His voice speaks, and a faint ring comes about the open cup. A stick comes up from the ground and lies
// across the cup's mouth, and a soft golden ring comes about the cup: covered.
function coveredCup(): SignArt {
  const pasture =
    `<path d="M0 84 C14 82 32 83 52 87 C58 96 60 108 58 120 L0 120 Z" fill="#9CC46A"/>` +
    `<ellipse cx="22" cy="93.6" rx="9" ry="2.2" fill="#8EC3DE"/><ellipse cx="22" cy="93.4" rx="6" ry="1.2" fill="#B9DDEE"/>` +
    [
      [8, 100],
      [38, 98],
      [46, 106],
      [12, 108]
    ]
      .map(([x, y]) => tuft(x, y, "#5FA344", 4))
      .join("");
  // Abu Humayd's place and the cup come together from al-Naqi' to his place.
  const coming = track({
    xy: [
      [0.27, 0, 0],
      [0.41, 80, -0.2]
    ]
  });
  return {
    kind: "covered-cup",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(84, 20) },
      { name: "a cloud", svg: cloud(130, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[84, 110], [140, 109]]) },
      { name: "the pasture of al-Naqi'", svg: pasture },
      { name: "ripples on the pool", svg: `<path d="M17 93.8 q1.4 -0.5 2.8 0 M24 93.4 q1.4 -0.5 2.8 0" stroke="#FFFFFF" stroke-width="0.35" fill="none"/>`, loop: { move: "bob", ms: 2000, x: 1 } },
      { name: "a sheep grazing at al-Naqi' 1", svg: sheepAt(36, 92.6, 0.1), loop: { move: "bob", ms: 1800, y: 0.3 } },
      { name: "a sheep grazing at al-Naqi' 2", svg: sheepAt(10, 96.4, 0.1, true), loop: { move: "bob", ms: 2200, y: 0.3, phase: 0.5 } },
      { name: "the way from al-Naqi'", svg: way("M28 104.4 C52 106 80 105.6 112 103.6", "#F4E3BC", 1) },
      ...palms([
        [96, 94, 12],
        [156, 96, 15]
      ]),
      { name: "his home in Madinah", svg: home(140, 99, 18, 14) },
      { name: "his place, a golden ring", svg: ring(126, 103.6, 2.6, GOLD) },
      { name: "Abu Humayd's place", svg: someone(26, 103.8), keys: coming },
      { name: "a wooden cup", svg: woodCup(30.5, 104.4), keys: coming },
      {
        name: "milk, filling the cup",
        svg: milkIn(30.5, 104.4),
        origin: { x: 30.5, y: 101.2 },
        keys: track({
          opacity: [
            [0.05, 0],
            [0.06, 1]
          ],
          scale: [
            [0.05, 0.2],
            [0.11, 1]
          ],
          xy: [
            [0.27, 0, 0],
            [0.41, 80, -0.2]
          ]
        })
      },
      { name: "a soft glint on the milk", svg: sparkle(31.6, 100.6, 0.8, "#FFFFFF"), keys: fade([[0.12, 0], [0.135, 1], [0.27, 1], [0.28, 0]]), loop: soft },
      { name: "al-Naqi': a faint ring about the pasture", svg: care(24, 98, 22, 5.4, "#FFFFFF"), keys: showFor(0.255, 0.27, 0.42, 0.44), loop: soft },
      { name: "his voice: will you not cover it", svg: arcsLeft(123.2, 102.2, GOLD), keys: showAt(0.505, 0.515), loop: speaking },
      { name: "open: a faint ring about the cup", svg: care(110.5, 104.2, 3.6, 1.4, "#FFFFFF"), keys: showFor(0.53, 0.55, 0.83, 0.845), loop: soft },
      {
        name: "a stick, laid across the cup",
        svg: `<path d="M106.4 100.6 L114.6 100.6" stroke="#7A5634" stroke-width="0.7" stroke-linecap="round"/><path d="M113 100.6 L114.2 99.6" stroke="#7A5634" stroke-width="0.4" stroke-linecap="round"/>`,
        keys: track({
          opacity: [
            [0.765, 0],
            [0.775, 1]
          ],
          xy: [
            [0.78, 7, 5.4],
            [0.82, 0, 0]
          ]
        })
      },
      { name: "covered: a soft golden ring about the cup", svg: care(110.5, 104.2, 3.8, 1.5, SOFT_GOLD), keys: showAt(0.845, 0.865), loop: soft }
    ],
    words: [
      { text: "Abu Humayd brought a cup of milk", from: 0.02, to: 0.23 },
      { text: "from al-Naqi'", from: 0.25, to: 0.48 },
      { text: "He said to him: will you not cover it,", from: 0.5, to: 0.74 },
      { text: "even by laying a stick across it?", from: 0.76, to: 1 }
    ]
  };
}

// One date, shared. Aishah said: a lady came in with her two daughters, asking, and she found nothing with me but one
// date, which I gave her. She divided it between her two daughters and did not eat of it; then she got up and went
// out. The Prophet ﷺ came in to us, and I told him, and he said: whoever is tried with any of these daughters, they
// will be a shield for him from the Fire (Sahih al-Bukhari 1418). No one is drawn, and no fire: a home in Madinah, open
// at its front, the place in the home, an empty jar and a dish. The lady's place and her two little ones' places
// come along the way to the home, and her voice asks. A faint ring comes about the empty jar, and one date shows on the
// dish. The date goes to the lady's place, and it is two halves; the halves go to her little ones' places, and a faint
// ring comes about her own place: none for herself. The halves are gone, and the three places go out. His place, a
// golden ring, comes in, and the voice in the home tells him. His voice speaks: faint rings show where the little ones
// stood, and a soft golden shield and a warm glow come over the place where they were.
function oneDateShared(): SignArt {
  const room =
    `<rect x="68" y="72" width="66" height="28" fill="#E2C49A"/>` +
    `<rect x="68" y="72" width="5" height="28" fill="#C9A97A"/>` +
    `<rect x="129" y="72" width="5" height="28" fill="#C9A97A"/>` +
    `<rect x="66" y="68.8" width="70" height="3.6" fill="#BC9060"/>` +
    `<rect x="96" y="77" width="6" height="5" fill="#6B4A2E"/>` +
    `<path d="M68 100 L134 100 L137 107.6 L65 107.6 Z" fill="#C9A97A"/><path d="M65 107.6 L137 107.6" stroke="#A98A5E" stroke-width="0.8"/>`;
  const jar =
    `<path d="M98.4 100.6 C96.2 99 96.4 94.8 98.6 93.6 L98.6 92.4 L101.4 92.4 L101.4 93.6 C103.6 94.8 103.8 99 101.6 100.6 Z" fill="#B4703E"/>` +
    `<ellipse cx="100" cy="92.4" rx="1.6" ry="0.5" fill="#6B3E1E"/>`;
  // The lady and her two little ones: in along the way, and out again, gone.
  const visit = (dx: number) =>
    track({
      opacity: [
        [0.575, 1],
        [0.59, 0]
      ],
      xy: [
        [0.03, -58 + dx, 0.8],
        [0.075, 0, 0],
        [0.56, 0, 0],
        [0.59, -36, 0.6]
      ]
    });
  const half = (i: number, x: number, to: [number, number], from: number): SignPart => ({
    name: `half of the date ${i}`,
    svg: halfDate(x, 101.2),
    keys: track({
      opacity: [
        [0.31, 0],
        [0.315, 1],
        [0.54, 1],
        [0.555, 0]
      ],
      xy: [
        [from, 0, 0],
        [at3(from + 0.03), to[0], to[1]]
      ]
    })
  });
  return {
    kind: "one-date-shared",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "a cloud", svg: cloud(108, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[10, 112], [52, 110], [150, 108]]) },
      { name: "the way to the home", svg: way("M0 104.6 C20 103.8 44 104.4 66 103.6", "#F4E3BC", 1) },
      ...palms([
        [14, 96, 14],
        [150, 97, 15]
      ]),
      { name: "a home in Madinah, open at its front", svg: room },
      { name: "an empty jar", svg: jar },
      { name: "a dish", svg: dish(110, 102.8) },
      { name: "the place in the home", svg: someone(116, 102.8) },
      { name: "the lady's place", svg: someone(80, 102.6), keys: visit(0) },
      { name: "her first little one's place", svg: someone(90, 104.4, 1.1), keys: visit(4) },
      { name: "her second little one's place", svg: someone(70, 104.4, 1.1), keys: visit(-4) },
      { name: "the lady's voice: asking", svg: arcs(82.6, 101.2, VOICE), keys: showFor(0.075, 0.085, 0.145, 0.155), loop: speaking },
      { name: "nothing in the home: a faint ring about the empty jar", svg: care(100, 100.8, 4, 1.6, "#FFFFFF"), keys: showFor(0.15, 0.165, 0.265, 0.275), loop: soft },
      {
        name: "one date",
        svg: bigDate(110, 101.2),
        keys: track({
          opacity: [
            [0.175, 0],
            [0.19, 1],
            [0.31, 1],
            [0.315, 0]
          ],
          xy: [
            [0.265, 0, 0],
            [0.3, -30, 0]
          ]
        })
      },
      half(1, 78.8, [11.2, 1.6], 0.395),
      half(2, 81.2, [-11.2, 1.6], 0.405),
      { name: "none for herself: a faint ring about the lady's place", svg: care(80, 103.4, 3.4, 1.4, "#FFFFFF"), keys: showFor(0.525, 0.54, 0.575, 0.59), loop: soft },
      {
        name: "his place, a golden ring",
        svg: ring(128, 104.2, 2.6, GOLD),
        keys: track({
          opacity: [
            [0.655, 0],
            [0.66, 1]
          ],
          xy: [
            [0.655, 24, 0],
            [0.685, 0, 0]
          ]
        })
      },
      { name: "the voice in the home: telling him", svg: arcs(118.6, 101.4, VOICE), keys: showFor(0.69, 0.7, 0.775, 0.785), loop: speaking },
      { name: "his voice: whoever is tried with them", svg: arcsLeft(125.4, 102.8, GOLD), keys: showAt(0.775, 0.785), loop: speaking },
      {
        name: "where the little ones stood: faint rings",
        svg: care(90, 104.4, 2.6, 1.1, "#FFFFFF") + care(70, 104.4, 2.6, 1.1, "#FFFFFF"),
        keys: showAt(0.79, 0.81),
        loop: soft
      },
      {
        name: "a shield: a soft golden dome where they stood",
        svg: `<path d="M65 105.8 Q80 89.8 95 105.8" stroke="${GOLD}" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="${WARM}" fill-opacity="0.14"/>`,
        keys: showAt(0.9, 0.92),
        loop: soft
      },
      { name: "a warm glow where they stood", svg: wash(80, 102.4, 16, 5, WARM, 0.16), keys: showAt(0.92, 0.95) }
    ],
    words: [
      { text: "A lady came with her two daughters, asking", from: 0.02, to: 0.125 },
      { text: "she found nothing with me but one date", from: 0.14, to: 0.245 },
      { text: "I gave it to her, and she divided it", from: 0.26, to: 0.375 },
      { text: "between her two daughters", from: 0.39, to: 0.505 },
      { text: "and did not eat of it; then she went out", from: 0.52, to: 0.635 },
      { text: "He came in to us, and I told him", from: 0.65, to: 0.755 },
      { text: "He said: whoever is tried with daughters", from: 0.77, to: 0.875 },
      { text: "they will be a shield for him", from: 0.89, to: 1 }
    ]
  };
}

// The bowl he drank from. Abu Burdah said: I came to Madinah, and Abdullah ibn Salam met me and said: come with me to
// the house, and I will give you a drink in a bowl the Messenger of Allah ﷺ drank from, and you will pray in a masjid
// the Prophet ﷺ prayed in. So I went with him, and he gave me sawiq to drink and fed me dates, and I prayed in his
// masjid (Sahih al-Bukhari 7342). No one is drawn, and his place is not shown, for this was after him: in Madinah,
// among its palms, Ibn Salam's home and a small masjid by it. Abu Burdah's place comes along the way into Madinah, and
// Ibn Salam's place comes out to meet it; Ibn Salam's voice speaks, and a faint way shows to his home. A wooden bowl
// shows by the door, and a soft golden glint comes on it: the bowl he drank from; a soft golden glow comes on the small
// masjid: where he prayed. The two places go along the way to the home; sawiq shows in the bowl, and dates on a dish.
// Then Abu Burdah's place goes to the masjid, and a spark of the prayer rises.
function blessedBowl(): SignArt {
  const masjid = madinahMasjid(86, 99, 0.42);
  return {
    kind: "blessed-bowl",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(110, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[18, 110], [70, 112], [146, 110]]) },
      { name: "the way into Madinah", svg: way("M0 104.8 C28 103.6 62 104.6 96 103.6 C108 103.2 116 103.4 122 103.2", "#F4E3BC", 1) },
      ...palms([
        [10, 96, 14],
        [64, 94, 12],
        [154, 96, 15]
      ]),
      { name: "a small masjid by Ibn Salam's home", svg: masjid },
      { name: "Ibn Salam's home", svg: home(128, 99, 20, 15) },
      {
        name: "Abu Burdah's place",
        svg: someone(4, 104.4),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.08, 36, -0.6],
            [0.655, 36, -0.6],
            [0.7, 104, -1.2],
            [0.895, 104, -1.2],
            [0.93, 92, -2.6]
          ]
        })
      },
      {
        name: "Ibn Salam's place",
        svg: someone(124, 103),
        keys: track({
          xy: [
            [0.145, 0, 0],
            [0.19, -70, 0.6],
            [0.655, -70, 0.6],
            [0.7, -4, 0]
          ]
        })
      },
      { name: "Ibn Salam's voice", svg: arcsLeft(51.4, 102.4, VOICE), keys: showFor(0.19, 0.2, 0.655, 0.665), loop: speaking },
      { name: "to his home: a faint way", svg: way("M56 103.2 C78 101.4 100 101.6 116 102.6", "#FFFFFF", 0.8), keys: showFor(0.265, 0.29, 0.655, 0.67) },
      { name: "a wooden bowl, by the door", svg: woodBowl(114.6, 103.2), keys: showAt(0.395, 0.41) },
      {
        name: "the bowl he drank from: a soft golden glint",
        svg: care(114.6, 102.4, 4.2, 1.6, GOLD) + sparkle(116.6, 99.6, 0.9, "#FFE7A0"),
        keys: showAt(0.42, 0.44),
        loop: soft
      },
      { name: "where he prayed: a soft golden glow on the masjid", svg: wash(96, 94, 12, 6, WARM, 0.2), keys: showAt(0.525, 0.56), loop: soft },
      { name: "sawiq in the bowl", svg: `<ellipse cx="114.6" cy="100.6" rx="2.7" ry="0.5" fill="#D8BF8C"/>`, keys: showAt(0.7, 0.71) },
      { name: "dates on a dish", svg: meal(106.6, 104.2), keys: showAt(0.78, 0.795) },
      spark("the prayer: a spark rising from the masjid", 96, 91.4, 0.93, 0.96)
    ],
    words: [
      { text: "When I came to Madinah,", from: 0.02, to: 0.125 },
      { text: "Abdullah ibn Salam met me and said:", from: 0.14, to: 0.245 },
      { text: "come home, I will give you a drink", from: 0.26, to: 0.375 },
      { text: "from a bowl he drank from", from: 0.39, to: 0.505 },
      { text: "and you will pray in a masjid he prayed in", from: 0.52, to: 0.635 },
      { text: "So I went; Ibn Salam gave me sawiq", from: 0.65, to: 0.755 },
      { text: "and fed me dates", from: 0.77, to: 0.875 },
      { text: "and I prayed in that masjid", from: 0.89, to: 1 }
    ]
  };
}

// Cloaks alike. Al-Ma'rur said: I met Abu Dharr at ar-Rabadhah, wearing a cloak, and his slave wore a cloak like it. I
// asked him about it, and he said: I abused a man, and shamed him for his mother. The Prophet ﷺ said to me: O Abu Dharr,
// did you shame him for his mother? You are a man with some ignorance in you. Your servants are your brothers, whom
// Allah has placed under your hands; so whoever has his brother under his hand, let him feed him of what he eats and
// dress him of what he wears (Sahih al-Bukhari 30). No one is drawn: at ar-Rabadhah, a plain with thorny trees, Abu
// Dharr's tent, his place and his slave's place, and a striped cloak by each, alike. Al-Ma'rur's place comes along the
// way; soft glints show on the two cloaks, and a faint golden line between them. Al-Ma'rur's voice asks, and Abu
// Dharr's voice answers. Then the land grows warm and pale, long ago: another place stands by Abu Dharr's, and grey
// arcs go from his to it. His place, a golden ring, comes, and his voice speaks: a faint grey ring comes about Abu
// Dharr's place. The long ago fades, and Abu Dharr's voice tells on what he said: a soft golden line comes between
// Abu Dharr's place and his slave's, kin; food shows on a dish by each, soft golden rings come about the two cloaks,
// and a warm glow about them both.
function cloaksAlike(): SignArt {
  // Now: they fade into long ago, and come back after it.
  const now: [number, number][] = [
    [0.395, 1],
    [0.41, 0],
    [0.655, 0],
    [0.67, 1]
  ];
  // Long ago: shown from `from`, until it fades as the now comes back.
  const longAgo = (from: number): [number, number][] => [
    [from, 0],
    [at3(from + 0.01), 1],
    [0.655, 1],
    [0.67, 0]
  ];
  return {
    kind: "cloaks-alike",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE3F0", "#E9D7AF", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(48, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[22, 110], [72, 112], [146, 110]]) },
      { name: "the way across ar-Rabadhah", svg: way("M0 104.6 C24 103.8 46 104.2 64 103.8", "#F4E3BC", 1) },
      { name: "a thorny tree on the plain 1", svg: thornyTree(18, 92, 0.7) },
      { name: "a thorny tree on the plain 2", svg: thornyTree(146, 90, 0.66) },
      { name: "Abu Dharr's tent", svg: tent(101, 98.4, 20, 13), keys: fade(now) },
      { name: "another tent", svg: tent(130, 97.4, 14, 9.6), keys: fade(now) },
      { name: "Abu Dharr's place", svg: someone(90, 103.4) },
      { name: "the slave's place", svg: someone(112, 103.4), keys: fade(now) },
      { name: "a cloak by Abu Dharr's place", svg: stripedCloak(82.6, 104.8), keys: fade(now) },
      { name: "a cloak by the slave's place", svg: stripedCloak(119.4, 104.8), keys: fade(now) },
      {
        name: "al-Ma'rur's place",
        svg: someone(10, 104.2),
        keys: track({
          opacity: now,
          xy: [
            [0.03, 0, 0],
            [0.08, 50, -0.4]
          ]
        })
      },
      {
        name: "alike: soft glints on the two cloaks",
        svg: sparkle(84.4, 103.2, 0.8, "#FFF3CF") + sparkle(121.2, 103.2, 0.8, "#FFF3CF"),
        keys: fade([
          [0.15, 0],
          [0.165, 1],
          [0.395, 1],
          [0.41, 0]
        ]),
        loop: soft
      },
      {
        name: "alike: a faint golden line between the cloaks",
        svg: lookLine(86.6, 104.2, 115.4, 104.2, 99.6),
        keys: fade([
          [0.18, 0],
          [0.2, 1],
          [0.395, 1],
          [0.41, 0]
        ])
      },
      { name: "al-Ma'rur's voice: asking", svg: arcs(62.6, 102.4, VOICE), keys: showFor(0.265, 0.275, 0.295, 0.305), loop: speaking },
      { name: "Abu Dharr's voice", svg: arcsLeft(87.4, 102, VOICE), keys: showFor(0.3, 0.31, 0.395, 0.405), loop: speaking },
      { name: "long ago: the land warm and pale", svg: `<rect y="61" width="160" height="59" fill="#FFF3DA" opacity="0.32"/>`, keys: showFor(0.395, 0.41, 0.655, 0.67) },
      { name: "the place of the one abused", svg: someone(114, 102.6), keys: fade(longAgo(0.41)) },
      { name: "harsh words: grey arcs from Abu Dharr's place", svg: arcs(92.6, 102, GREY), keys: showFor(0.425, 0.435, 0.525, 0.535), loop: speaking },
      { name: "his place, a golden ring", svg: ring(136, 104.2, 2.6, GOLD), keys: fade(longAgo(0.525)) },
      { name: "his voice: there is still ignorance in you", svg: arcsLeft(133.2, 102.8, GOLD), keys: showFor(0.535, 0.545, 0.655, 0.67), loop: speaking },
      { name: "some ignorance still: a faint grey ring about Abu Dharr's place", svg: greyRing(90, 104.2, 3.6, 1.6), keys: showFor(0.55, 0.57, 0.655, 0.67) },
      { name: "Abu Dharr's voice: telling what he said", svg: arcsLeft(87.4, 102, VOICE), keys: showAt(0.67, 0.68), loop: speaking },
      { name: "as kin: a soft golden line between his place and the slave's", svg: lookLine(92.6, 102.6, 109.4, 102.6, 97.8), keys: showAt(0.675, 0.695) },
      { name: "fed alike: food on a dish by Abu Dharr's place", svg: meal(96.6, 105.6), keys: showAt(0.795, 0.81) },
      { name: "fed alike: food on a dish by the slave's place", svg: meal(105.4, 105.6), keys: showAt(0.81, 0.825) },
      {
        name: "dressed alike: soft golden rings about the two cloaks",
        svg: care(82.6, 104.8, 4.6, 1.8, SOFT_GOLD) + care(119.4, 104.8, 4.6, 1.8, SOFT_GOLD),
        keys: showAt(0.9, 0.92),
        loop: soft
      },
      { name: "a warm glow about them both", svg: wash(101, 102.6, 22, 6, WARM, 0.14), keys: showAt(0.92, 0.95) }
    ],
    words: [
      { text: "At ar-Rabadhah I met Abu Dharr", from: 0.02, to: 0.125 },
      { text: "a cloak on him, and one on his slave", from: 0.14, to: 0.245 },
      { text: "I asked about it; Abu Dharr said:", from: 0.26, to: 0.375 },
      { text: "I abused a man, shaming him for his mother", from: 0.39, to: 0.505 },
      { text: "He said: there is still ignorance in you", from: 0.52, to: 0.635 },
      { text: "your servants are your brothers", from: 0.65, to: 0.755 },
      { text: "feed them of what you eat", from: 0.77, to: 0.875 },
      { text: "and dress them of what you wear", from: 0.89, to: 1 }
    ]
  };
}

// Half a sa'. Abu Mas'ud said: when we were told to give charity, we would carry loads for hire. Abu Aqil came with
// half a sa', and someone came with more than him, and the hypocrites said: Allah has no need of this one's charity,
// and the other did it only to show off. Then the ayah was revealed (Sahih al-Bukhari 4668; Quran 9:79). No one is
// drawn: by the masjid of Madinah, his place, a golden ring, and a cloth spread before it, where the charity is
// gathered. His voice speaks; two places show, carrying loads for hire, and go along. Abu Aqil's place comes along the
// way with a small measure of dates, half a sa', and sets it on the cloth; another place comes with a big sack and sets
// it down. The places of the hypocrites stand aside, and their voices mock: faint grey lines go from them to the half
// sa', and then to the big sack. Then a soft golden glow comes about his place: the ayah revealed; the grey lines fade,
// soft golden rings come about the two gifts, and a grey ring about the mockers.
function halfASa(): SignArt {
  // A load carried for hire, and the place that carries it, at the back of the land: they show as the words tell of
  // them, and go along.
  const carry = (i: number, x: number, y: number, dx: number, s: number): SignPart[] => {
    const keys = track({
      opacity: [
        [0.145, 0],
        [0.155, 1]
      ],
      xy: [
        [0.155, 0, 0],
        [0.2, dx, 0]
      ]
    });
    return [
      { name: `a load carried for hire ${i}`, svg: sack(x, n(y - 3.4), s, "#C9A66B"), keys },
      { name: `the place carrying it ${i}`, svg: someone(x, y), keys }
    ];
  };
  return {
    kind: "half-a-sa",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(52, 20) },
      { name: "a cloud", svg: cloud(126, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[14, 112], [60, 110], [150, 110]]) },
      { name: "the way into the market", svg: way("M0 104.8 C16 104.2 34 104.6 52 104", "#F4E3BC", 1) },
      ...palms([
        [6, 96, 14],
        [152, 96, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(98, 98, 0.62) },
      { name: "his place, a golden ring", svg: ring(92, 103.2, 2.6, GOLD) },
      { name: "the charity, gathered: a cloth by the masjid", svg: cloth(70, 85, 101.8, "#E8D8B4") },
      { name: "his voice: give charity", svg: arcsLeft(89.2, 101.8, GOLD), keys: showFor(0.025, 0.035, 0.145, 0.155), loop: speaking },
      ...carry(1, 12, 99.8, 16, 0.7),
      ...carry(2, 26, 100.4, 16, 0.6),
      {
        name: "Abu Aqil's place",
        svg: someone(-6, 104.2),
        keys: track({
          xy: [
            [0.265, 0, 0],
            [0.31, 70, -0.6]
          ]
        })
      },
      {
        name: "half a sa' of dates",
        svg: halfSa(-2.4, 101.2),
        keys: track({
          xy: [
            [0.265, 0, 0],
            [0.31, 70, -0.6],
            [0.325, 76.4, 2.2]
          ]
        })
      },
      {
        name: "the place of one who brought more",
        svg: someone(-8, 104.4),
        keys: track({
          xy: [
            [0.395, 0, 0],
            [0.44, 66, -0.8]
          ]
        })
      },
      {
        name: "a big sack, more than his",
        svg: sack(-4, 101, 0.9, "#B8925A"),
        keys: track({
          xy: [
            [0.395, 0, 0],
            [0.44, 66, -0.8],
            [0.455, 84.6, 2.4]
          ]
        })
      },
      { name: "the hypocrites' places", svg: someone(138, 102.2, 1.5, "#7A7A7A") + someone(145.4, 103.8, 1.5, "#7A7A7A") + someone(152.6, 102.4, 1.5, "#7A7A7A"), keys: showAt(0.525, 0.535) },
      { name: "their voices: mocking", svg: arcsLeft(135.4, 100.8, GREY), keys: showFor(0.535, 0.545, 0.895, 0.905), loop: speaking },
      { name: "mocked: a faint grey line to the half sa'", svg: lookLine(136, 100.6, 74, 100.6, 92, "#9A9A9A"), keys: showFor(0.66, 0.68, 0.9, 0.915) },
      { name: "mocked: a faint grey line to the big sack", svg: lookLine(136, 100.6, 80.6, 98.8, 89.4, "#9A9A9A"), keys: showFor(0.78, 0.8, 0.9, 0.915) },
      { name: "revealed to him: a soft golden glow about his place", svg: glow(92, 101.4, 7, WARM, 0.3), keys: showAt(0.895, 0.915) },
      {
        name: "given for good: soft golden rings about the two gifts",
        svg: care(74, 104, 3.6, 1.4, SOFT_GOLD) + care(80.6, 104, 4.4, 1.6, SOFT_GOLD),
        keys: showAt(0.92, 0.94),
        loop: soft
      },
      { name: "a grey ring about the mockers", svg: greyRing(145.4, 103.2, 11, 3), keys: showAt(0.93, 0.95) }
    ],
    words: [
      { text: "When we were told to give charity", from: 0.02, to: 0.125 },
      { text: "we would carry loads for hire", from: 0.14, to: 0.245 },
      { text: "Abu Aqil came with half a sa'", from: 0.26, to: 0.375 },
      { text: "and someone brought more than Abu Aqil", from: 0.39, to: 0.505 },
      { text: "The hypocrites said: Allah has no need", from: 0.52, to: 0.635 },
      { text: "of this one's charity", from: 0.65, to: 0.755 },
      { text: "and the other gave only to show off", from: 0.77, to: 0.875 },
      { text: "Then the ayah was revealed", from: 0.89, to: 1 }
    ]
  };
}

export const CARE_ART = {
  "kaaba-as-it-was": kaabaAsItWas,
  "cloth-in-the-heat": clothInTheHeat,
  "covered-cup": coveredCup,
  "one-date-shared": oneDateShared,
  "blessed-bowl": blessedBowl,
  "cloaks-alike": cloaksAlike,
  "half-a-sa": halfASa
} as const;
