import { glow, n, nightSky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, wall, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GREY } from "./lovedArt";
import { kabah } from "./historyArt";
import { GOLD, hills, land, someone, SPARK, VOICE, WARM, wash } from "./worshipArt";
import { care, DAWN, dayAround, LIGHT, lightIn, palms, sparkRising, tent, track, type At } from "./daysArt";

/**
 * Faith and those who held to it, drawn as the scenes of rights and mercy are (rightsArt.ts): the few who were with him
 * at first; Abu Bakr, who freed Bilal; whom he loved most; the trustworthy one of this nation; the two surahs of refuge;
 * the greatest ayah; and changing a wrong with the hand, the tongue or the heart. Only the land, the sky, buildings,
 * things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, an eye or a face:
 * where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in
 * the air. Nothing is drawn for Allah, and nothing comes down from the sky: a recitation is a spark that rises, and the
 * ayat are soft lights that show by his place.
 */

/** A soft warm light about a place at (x, y): love, or honor. */
const warmOn = (x: number, y: number, r = 4.4) => glow(x, y, r, WARM, 0.42);

/** A small light of faith at (x, y), `k` times its size: a soft glow with a spark in its middle. */
const faithIn = (x: number, y: number, k = 1) => glow(x, y, n(3.4 * k), WARM, 0.36) + sparkle(x, y, n(1.1 * k), SPARK);

/** A far-off home, small, its foot's middle at (x, y), `w` wide and `h` high. */
const farHome = (x: number, y: number, w: number, h: number) =>
  `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${w}" height="${h}" fill="#C9A878"/><rect x="${n(x + w * 0.1)}" y="${n(y - h)}" width="${n(w * 0.4)}" height="${h}" fill="#000000" opacity="0.1"/><rect x="${n(x - 0.5)}" y="${n(y - h * 0.5)}" width="1" height="${n(h * 0.5)}" fill="#6B4A2E"/>`;

/** A small box with a golden clasp, its foot's middle at (x, y): a trust kept. */
const keptBox = (x: number, y: number) =>
  `<rect x="${n(x - 2.2)}" y="${n(y - 2.8)}" width="4.4" height="2.8" rx="0.4" fill="#8A5A2E"/>` +
  `<path d="M${n(x - 2.2)} ${n(y - 1.9)} L${n(x + 2.2)} ${n(y - 1.9)}" stroke="#E8C45A" stroke-width="0.4"/><rect x="${n(x - 0.5)}" y="${n(y - 2.4)}" width="1" height="1" fill="#E8C45A"/>`;

/** A grey tangle on the way, its middle at (x, y), half as big again as its path: a wrong. */
const tangle = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) scale(1.5) translate(${-x} ${-y})"><path d="M${n(x - 3.4)} ${y} c1 -2.6 2.6 -2.6 2.2 0.2 c-0.4 2.4 -2.8 1.6 -1.4 -0.8 c1.2 -2 3.4 -1.6 3.6 0.4 c0.2 2 -2 2.4 -2.2 0.6 c-0.2 -1.6 1.8 -2.6 3.2 -0.6" stroke="${GREY}" stroke-width="0.6" fill="none" stroke-linecap="round"/></g>`;

/** A straight golden line on the way, its middle at (x, y): a wrong set right. */
const setRight = (x: number, y: number) => `<path d="M${n(x - 5.2)} ${y} L${n(x + 5.2)} ${y}" stroke="${GOLD}" stroke-width="0.9" stroke-linecap="round"/>`;

/** A faint golden line from (x1, y1) to (x2, y2), bowed up to `top`: a look, a seeing. */
const lookLine = (x1: number, y1: number, x2: number, y2: number, top: number) =>
  `<path d="M${x1} ${y1} Q${n((x1 + x2) / 2)} ${top} ${x2} ${y2}" stroke="${GOLD}" stroke-width="0.5" stroke-dasharray="1 1.2" fill="none" opacity="0.8"/>`;

// The first believers. Ammar said: I saw the Messenger of Allah ﷺ, and there was none with him but five slaves, two
// women and Abu Bakr (Sahih al-Bukhari 3660). No one is drawn: in Makkah, by the Ka'bah, his place is a golden ring,
// and Ammar's place is far off; a faint golden line goes from it to him. Five places come by him one by one, and a
// light of faith comes in each; two more come, and their lights come; then Abu Bakr's place comes from a home, its
// light comes, and a ring of care comes about the few who were with him.
function firstBelievers(): SignArt {
  const his: [number, number] = [56, 104.8];
  const ammar: [number, number] = [134, 104.2];
  const five: [number, number][] = [
    [80, 103.4],
    [87, 105.4],
    [94, 103.4],
    [101, 105.4],
    [108, 103.4]
  ];
  const two: [number, number][] = [
    [32, 103.4],
    [40, 105.4]
  ];
  const abuBakr: [number, number] = [66, 106];
  // Abu Bakr's place comes from the home on the left.
  const from: [number, number] = [-46, -4];
  return {
    kind: "first-believers",
    ms: 10000,
    parts: [
      ...dayAround([140, 18], 10000),
      { name: "a home of Makkah 1", svg: home(14, 97, 16, 11) },
      { name: "a home of Makkah 2", svg: home(148, 97, 14, 10) },
      { name: "the Ka'bah", svg: kabah(60, 96, 12) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ammar's place", svg: someone(ammar[0], ammar[1], 1.5) },
      { name: "seeing him: a faint golden line from Ammar's place", svg: lookLine(n(ammar[0] - 2.4), n(ammar[1] - 1.6), n(his[0] + 2.8), n(his[1] - 1.8), 94), keys: showFrom(0.06, 0.1) },
      ...five.map(([x, y], i): SignPart => ({ name: `five who were slaves: a place ${i + 1}`, svg: someone(x, y, 1.4), keys: showFrom(at3(0.27 + i * 0.03), at3(0.29 + i * 0.03)) })),
      ...five.map(([x, y], i): SignPart => ({ name: `faith: a light in a place of the five ${i + 1}`, svg: faithIn(x, y, 0.8), keys: showFrom(0.41, 0.44), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 5 } })),
      ...two.map(([x, y], i): SignPart => ({ name: `and two: a place ${i + 1}`, svg: someone(x, y, 1.4), keys: showFrom(at3(0.52 + i * 0.04), at3(0.54 + i * 0.04)) })),
      ...two.map(([x, y], i): SignPart => ({ name: `faith: a light in a place of the two ${i + 1}`, svg: faithIn(x, y, 0.8), keys: showFrom(0.62, 0.66), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 2 } })),
      {
        name: "Abu Bakr's place, coming from a home",
        svg: someone(abuBakr[0], abuBakr[1], 1.5),
        keys: track({
          opacity: [
            [0.77, 0],
            [0.775, 1]
          ],
          xy: [
            [0.77, from[0], from[1]],
            [0.83, 0, 0]
          ]
        })
      },
      { name: "faith: a light in Abu Bakr's place", svg: faithIn(abuBakr[0], abuBakr[1], 0.8), keys: showFrom(0.84, 0.87), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "the few with him: a ring of care about them all", svg: care(70, 104.8, 42, 3.8), keys: showFrom(0.88, 0.93) }
    ],
    words: [
      { text: "Ammar said: I saw him", from: 0.02, to: 0.23 },
      { text: "None was with him but five slaves", from: 0.25, to: 0.48 },
      { text: "And two women", from: 0.5, to: 0.73 },
      { text: "And Abu Bakr", from: 0.75, to: 1 }
    ]
  };
}

// Freed by Abu Bakr. Jabir ibn Abdullah said: Umar used to say: Abu Bakr is our master, and he freed our master,
// meaning Bilal (Sahih al-Bukhari 3754). No one is drawn: by the masjid, Umar's place speaks. A warm glow of honor
// comes about Abu Bakr's place; far from it, Bilal's place is held in a grey band. Abu Bakr's place goes to it, the grey
// band goes, and a soft light comes about Bilal's place; then a warm glow of honor comes about it too, and a ring of
// care about the two.
function freedBilal(): SignArt {
  const umar: [number, number] = [50, 104.4];
  const abuBakr: [number, number] = [84, 103.6];
  const bilal: [number, number] = [122, 104.6];
  // How far Abu Bakr's place goes, to stand by Bilal's.
  const to: [number, number] = [29, 1];
  const goes: At[] = [
    [0.52, 0, 0],
    [0.58, to[0], to[1]]
  ];
  return {
    kind: "freed-bilal",
    ms: 10000,
    parts: [
      ...dayAround([140, 18], 10000),
      ...palms([[154, 99, 13]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.8) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6) },
      { name: "Umar's voice", svg: arcs(n(umar[0] + 2.6), n(umar[1] - 4), VOICE), keys: showFrom(0.04, 0.05), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "held as a slave: a grey band about Bilal's place",
        svg: glow(bilal[0], bilal[1], 4.4, GREY, 0.3) + `<ellipse cx="${bilal[0]}" cy="${bilal[1]}" rx="3.4" ry="2" stroke="${GREY}" stroke-width="1.1" fill="none"/>`,
        keys: track({
          opacity: [
            [0.6, 1],
            [0.65, 0]
          ]
        })
      },
      { name: "Bilal's place", svg: someone(bilal[0], bilal[1], 1.6) },
      { name: "Abu Bakr's place, going to Bilal's", svg: someone(abuBakr[0], abuBakr[1], 1.6), keys: track({ xy: goes }) },
      {
        name: "honor: a warm glow about Abu Bakr's place",
        svg: warmOn(abuBakr[0], abuBakr[1], 5.4) + sparkle(abuBakr[0], n(abuBakr[1] - 4.6), 1.1, SPARK),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.33, 1]
          ],
          xy: goes
        }),
        loop: { move: "twinkle", ms: 1500, low: 0.75 }
      },
      { name: "freed: a soft light about Bilal's place", svg: lightIn(bilal[0], bilal[1], 3.4), keys: showFrom(0.64, 0.69), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      {
        name: "honor: a warm glow about Bilal's place",
        svg: warmOn(bilal[0], bilal[1], 5.6) + sparkle(bilal[0], n(bilal[1] - 4.6), 1.1, SPARK),
        keys: showFrom(0.78, 0.83),
        loop: { move: "twinkle", ms: 1500, low: 0.75, phase: 0.4 }
      },
      { name: "honored both: a ring of care about the two places", svg: care(n((abuBakr[0] + to[0] + bilal[0]) / 2), 104.8, 9.4, 3.2), keys: showFrom(0.86, 0.91) }
    ],
    words: [
      { text: "Umar used to say:", from: 0.02, to: 0.23 },
      { text: "Abu Bakr is our master", from: 0.25, to: 0.48 },
      { text: "And he freed our master", from: 0.5, to: 0.73 },
      { text: "Meaning Bilal", from: 0.75, to: 1 }
    ]
  };
}

// The most beloved. Amr ibn al-As said: the Prophet ﷺ sent him to lead the army of Dhat as-Salasil. I came to him and
// said: who of the people is most beloved to you? He said: Aishah. I said: and among the men? He said: her father. I
// said: then who? He said: then Umar ibn al-Khattab; and he named other men (Sahih al-Bukhari 3662). No one is drawn:
// by the masjid, his place is a golden ring, and Amr's place is beside it. A way shows to an army's tents far off, and
// Amr's place goes along it, then comes back. Amr's voice asks; his voice answers, and a warm light comes on her home by
// the masjid. Amr's voice asks again; his voice answers, and a warm light comes on Abu Bakr's place; then on Umar's; then
// on other places he named, one by one.
function mostBeloved(): SignArt {
  const his: [number, number] = [67.2, 104.8];
  const amr: [number, number] = [80, 104.2];
  // How far Amr's place goes, to the army's tents.
  const out: [number, number] = [58, -5.6];
  const herHome: [number, number] = [104, 99];
  const abuBakr: [number, number] = [36, 104.4];
  const umar: [number, number] = [24, 106];
  const others: [number, number][] = [
    [46, 106.4],
    [12, 104],
    [116, 105.8],
    [126, 104]
  ];
  return {
    kind: "most-beloved",
    ms: 12000,
    parts: [
      ...dayAround([18, 18], 12000),
      ...palms([[120, 97, 12]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(48, 99, 0.8) },
      { name: "her home, by the masjid", svg: home(herHome[0], herHome[1], 13, 9) },
      { name: "an army's tents, far off", svg: tent(131, 94.8, 6.4, 4.8) + tent(140, 93.6, 8, 6) + tent(150.4, 94.6, 7, 5.4) },
      ...[
        [135, 97.8],
        [145, 98.4],
        [154, 97.8]
      ].map(([x, y], i): SignPart => ({ name: `the army: a small place by the tents ${i + 1}`, svg: someone(x, y, 1) })),
      { name: "the way to the army", svg: way("M83 103 Q110 99.4 134 98.8", "#FFF0C4", 1.1), keys: showFrom(0.02, 0.04) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Amr's place, sent out and coming back",
        svg: someone(amr[0], amr[1], 1.5),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.09, out[0], out[1]],
            [0.15, out[0], out[1]],
            [0.19, 0, 0]
          ]
        })
      },
      { name: "Abu Bakr's place", svg: someone(abuBakr[0], abuBakr[1], 1.5) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.5) },
      ...others.map(([x, y], i): SignPart => ({ name: `another place he named ${i + 1}`, svg: someone(x, y, 1.4) })),
      { name: "Amr's voice: who is most beloved to you?", svg: arcsLeft(n(amr[0] - 2.4), n(amr[1] - 3.8), VOICE), keys: showWhile(0.19, 0.2, 0.29, 0.3), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice, answering", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.3, 0.31, 0.43, 0.44), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "most beloved: a warm light on her home", svg: glow(herHome[0], n(herHome[1] - 4.6), 7, WARM, 0.4), keys: showFrom(0.33, 0.37), loop: { move: "twinkle", ms: 1700, low: 0.75 } },
      { name: "Amr's voice, asking again", svg: arcsLeft(n(amr[0] - 2.4), n(amr[1] - 3.8), VOICE), keys: showWhile(0.44, 0.45, 0.57, 0.58), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice, answering again", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.58, 0.59, 0.71, 0.72), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "loved: a warm light on Abu Bakr's place", svg: warmOn(abuBakr[0], abuBakr[1]), keys: showFrom(0.61, 0.65), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "Amr's voice: then who?", svg: arcsLeft(n(amr[0] - 2.4), n(amr[1] - 3.8), VOICE), keys: showWhile(0.72, 0.73, 0.85, 0.86), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: then Umar, and others", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.75, 0.76), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "loved: a warm light on Umar's place", svg: warmOn(umar[0], umar[1]), keys: showFrom(0.77, 0.8), loop: { move: "twinkle", ms: 1500, low: 0.75, phase: 0.3 } },
      ...others.map(
        ([x, y], i): SignPart => ({
          name: `loved: a warm light on another place he named ${i + 1}`,
          svg: warmOn(x, y, 3.6),
          keys: showFrom(at3(0.87 + i * 0.02), at3(0.89 + i * 0.02)),
          loop: { move: "twinkle", ms: 1500, low: 0.75, phase: i / 4 }
        })
      )
    ],
    words: [
      { text: "He sent Amr to lead an army", from: 0.02, to: 0.13 },
      { text: "Amr asked: who is most beloved to you?", from: 0.15, to: 0.27 },
      { text: "He said: Aishah", from: 0.29, to: 0.41 },
      { text: "Amr asked: and among the men?", from: 0.43, to: 0.55 },
      { text: "He said: her father", from: 0.57, to: 0.69 },
      { text: "Then who? He said: then Umar", from: 0.71, to: 0.83 },
      { text: "And he named other men", from: 0.85, to: 1 }
    ]
  };
}

// The trustworthy one. Anas ibn Malik said: the Messenger of Allah ﷺ said: every nation has a trustworthy one, and our
// trustworthy one, O nation, is Abu Ubaydah ibn al-Jarrah (Sahih al-Bukhari 3744). No one is drawn: by the masjid, his
// place is a golden ring, and his voice speaks. Far off on the land are nations, each a few small homes and places, and
// a soft light comes in one place of each. By the masjid, the places of this nation stand, and a ring of care comes
// about them; then a golden light comes in Abu Ubaydah's place, and a small box shows by it, a trust kept, glowing.
function trustworthyOne(): SignArt {
  const his: [number, number] = [23.2, 104.8];
  const nations: [number, number][] = [
    [44, 70.4],
    [86, 68.6],
    [128, 70.4]
  ];
  const near: [number, number][] = [
    [50, 104],
    [60, 106],
    [70, 104],
    [80, 106],
    [100, 106],
    [110, 104]
  ];
  const abuUbaydah: [number, number] = [90, 104];
  const kept: [number, number] = [95.6, 106.2];
  return {
    kind: "trustworthy-one",
    ms: 10000,
    parts: [
      ...dayAround([140, 18], 10000),
      ...palms([[152, 99, 13]]),
      ...nations.map(
        ([x, y], i): SignPart => ({
          name: `a nation, far off ${i + 1}`,
          svg: farHome(n(x - 3.4), y, 4.6, 3.4) + farHome(n(x + 3.4), n(y - 0.4), 4, 3) + someone(n(x - 3), n(y + 2.6), 0.75) + someone(x, n(y + 3.2), 0.75) + someone(n(x + 3), n(y + 2.6), 0.75)
        })
      ),
      ...nations.map(
        ([x, y], i): SignPart => ({
          name: `its trustworthy one: a soft light in a place of a far nation ${i + 1}`,
          svg: glow(x, n(y + 3.2), 2.2, WARM, 0.45) + sparkle(x, n(y + 3.2), 0.6, SPARK),
          keys: showFrom(at3(0.06 + i * 0.06), at3(0.09 + i * 0.06)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 3 }
        })
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.8) },
      { name: "a home of Madinah", svg: home(136, 98, 13, 9) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.03, 0.04), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...near.map(([x, y], i): SignPart => ({ name: `a place of this nation ${i + 1}`, svg: someone(x, y, 1.4) })),
      { name: "Abu Ubaydah's place", svg: someone(abuUbaydah[0], abuUbaydah[1], 1.5) },
      { name: "this nation: a ring of care about the places by the masjid", svg: care(80, 105, 34, 3.6), keys: showFrom(0.36, 0.41) },
      {
        name: "the trustworthy one of this nation: a golden light in Abu Ubaydah's place",
        svg: warmOn(abuUbaydah[0], abuUbaydah[1], 5) + sparkle(abuUbaydah[0], n(abuUbaydah[1] - 4.6), 1.2, SPARK),
        keys: showFrom(0.69, 0.74),
        loop: { move: "twinkle", ms: 1500, low: 0.75 }
      },
      { name: "a trust kept: a small box by Abu Ubaydah's place", svg: keptBox(kept[0], kept[1]), keys: showFrom(0.78, 0.82) },
      { name: "kept safe: a soft glow on the box", svg: glow(kept[0], n(kept[1] - 1.4), 3, WARM, 0.4), keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: 0.5 } }
    ],
    words: [
      { text: "Every nation has a trustworthy one", from: 0.02, to: 0.31 },
      { text: "And the trustworthy one of this nation", from: 0.33, to: 0.64 },
      { text: "Is Abu Ubaydah ibn al-Jarrah", from: 0.66, to: 1 }
    ]
  };
}

// The two refuges. Uqbah ibn Amir said: the Messenger of Allah ﷺ said: have you not seen ayat revealed tonight, the
// like of which has never been seen? Say: I seek refuge with the Lord of the dawn, and Say: I seek refuge with the Lord
// of men (Sahih Muslim 814a). No one is drawn: it is night over Madinah, with its stars and its moon; by the masjid,
// his place is a golden ring, and Uqbah's place is near. His voice speaks, and two soft golden lights show by his
// place; they shine like no others. The night goes and the dawn comes, warm low over the hills, and a soft ring of
// refuge comes about the homes; then places come by the homes, and a wide ring comes about every place.
function twoRefuges(): SignArt {
  const his: [number, number] = [23.2, 104.8];
  const uqbah: [number, number] = [46, 104.4];
  const homes: [number, number, number, number][] = [
    [86, 99, 13, 9],
    [113, 98.6, 12, 8.6],
    [140, 99, 13, 9]
  ];
  const two: [number, number][] = [
    [31, 96.4],
    [38, 94.4]
  ];
  const places: [number, number][] = [
    [76, 104.4],
    [90, 105.8],
    [104, 104.2],
    [118, 105.8],
    [132, 104.4],
    [146, 105.8]
  ];
  const night = (from: number, to: number) =>
    track({
      opacity: [
        [from, 1],
        [to, 0]
      ]
    });
  return {
    kind: "two-refuges",
    ms: 12000,
    parts: [
      { name: "the dawn sky", svg: DAWN },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [64, 99, 13],
        [156, 99, 12]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.8) },
      ...homes.map(([x, y, w, h], i): SignPart => ({ name: `a home of Madinah ${i + 1}`, svg: home(x, y, w, h) })),
      { name: "Uqbah's place", svg: someone(uqbah[0], uqbah[1], 1.6) },
      { name: "the night, until the dawn", svg: nightSky(), keys: night(0.52, 0.6) },
      {
        name: "the stars of the night",
        svg: stars([
          [12, 14],
          [36, 26],
          [60, 12],
          [92, 22],
          [118, 10],
          [148, 20]
        ]),
        keys: night(0.52, 0.58),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "the moon", svg: crescent(130, 30, 4.6, 2.2, "#FFF3B8"), keys: night(0.52, 0.58) },
      { name: "the masjid at night", svg: `<g opacity="0.55">${madinahMasjid(4, 100, 0.8)}</g>`, keys: night(0.52, 0.58) },
      {
        name: "the homes at night, lamps lit",
        svg: homes.map(([x, y, w, h]) => home(x, y, w, h, "#8A7258", "#7A6248", "#3A3028") + glow(n(x + 3.3), n(y - h + 3.6), 2.4, WARM, 0.55)).join(""),
        keys: night(0.52, 0.58)
      },
      { name: "Uqbah's place, by night", svg: someone(uqbah[0], uqbah[1], 1.6, LIGHT), keys: night(0.52, 0.58) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), GOLD), keys: showFrom(0.04, 0.05), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "hearing him: a ring by Uqbah's place", svg: care(uqbah[0], uqbah[1], 3.6, 1.9), keys: showFrom(0.06, 0.08), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...two.map(
        ([x, y], i): SignPart => ({
          name: `two ayat: a soft golden light by his place ${i + 1}`,
          svg: glow(x, y, 3.4, "#FFE7A0", 0.4) + sparkle(x, y, 1.2, "#FFE7A0"),
          keys: showFrom(at3(0.08 + i * 0.04), at3(0.11 + i * 0.04)),
          loop: { move: "twinkle", ms: 1400, low: 0.7, phase: i / 2 }
        })
      ),
      { name: "like no others: the two lights, shining", svg: glow(34.5, 95.4, 9, "#FFF3C0", 0.22), keys: showFrom(0.3, 0.36), loop: { move: "twinkle", ms: 1800, low: 0.7 } },
      { name: "the dawn: a warm light low over the hills", svg: wash(80, 58, 84, 9, "#FFD9A0", 0.12), keys: showFrom(0.56, 0.62) },
      { name: "refuge: a soft ring about the homes", svg: care(113, 101.4, 36, 6.2), keys: showWhile(0.63, 0.68, 0.88, 0.92) },
      ...places.map(([x, y], i): SignPart => ({ name: `a place of all, by the homes ${i + 1}`, svg: someone(x, y, 1.4), keys: showFrom(at3(0.77 + i * 0.015), at3(0.785 + i * 0.015)) })),
      { name: "refuge for all: a wide ring about every place", svg: care(92, 104.6, 66, 3.8), keys: showFrom(0.88, 0.93) }
    ],
    words: [
      { text: "Have you not seen ayat revealed tonight", from: 0.02, to: 0.23 },
      { text: "The like of which was never seen?", from: 0.25, to: 0.48 },
      { text: "Say: I seek refuge with the Lord of the dawn", from: 0.5, to: 0.73 },
      { text: "And Say: I seek refuge with the Lord of men", from: 0.75, to: 1 }
    ]
  };
}

// The greatest ayah. Ubayy ibn Ka'b said: the Messenger of Allah ﷺ said: O Abu al-Mundhir, do you know which ayah of
// the Book of Allah with you is greatest? I said: Allah and His Messenger know best. He said: O Abu al-Mundhir, do you
// know which ayah of the Book of Allah with you is greatest? I said: Allah, there is no god but He, the Living, the
// Eternal. He struck my chest and said: by Allah, may knowledge be pleasant for you, Abu al-Mundhir (Sahih Muslim
// 810). No one is drawn, and no blow: by the masjid, his place is a golden ring, and Ubayy's place is near. His voice
// asks, and Ubayy's voice answers; he asks again, and Ubayy's voice answers in gold, golden sparks rising from it; a
// warm glow comes on Ubayy's place. His voice speaks, a ring of light comes about Ubayy's place, and small lights of
// knowledge come about it.
function greatestAyah(): SignArt {
  const his: [number, number] = [23.2, 104.8];
  const ubayy: [number, number] = [58, 104.2];
  const lights: [number, number][] = [
    [-4.2, -5.4],
    [0, -7.4],
    [4.2, -5.4]
  ];
  return {
    kind: "greatest-ayah",
    ms: 12000,
    parts: [
      ...dayAround([136, 18], 12000),
      ...palms([
        [100, 99, 14],
        [154, 99, 13]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.8) },
      { name: "a home of Madinah", svg: home(126, 97, 16, 11) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ubayy's place", svg: someone(ubayy[0], ubayy[1], 1.6) },
      { name: "his voice, asking", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.03, 0.04, 0.17, 0.18), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "Ubayy's voice, the first time", svg: arcsLeft(n(ubayy[0] - 2.6), n(ubayy[1] - 4), VOICE), keys: showWhile(0.18, 0.19, 0.33, 0.34), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice, asking again", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.34, 0.35, 0.49, 0.5), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "Ubayy's voice: the ayah, in gold", svg: arcsLeft(n(ubayy[0] - 2.6), n(ubayy[1] - 4), GOLD), keys: showFrom(0.5, 0.51), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...[0.52, 0.56, 0.67, 0.71].map((from, i): SignPart => ({ name: `the ayah, recited: a golden spark rising ${i + 1}`, svg: sparkle(ubayy[0], n(ubayy[1] - 6.4), 1.6, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.03), 10) })),
      { name: "the right answer: a warm glow on Ubayy's place", svg: warmOn(ubayy[0], ubayy[1], 5.4), keys: showFrom(0.72, 0.76), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "his voice: may knowledge be pleasant for you", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.82, 0.83), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "knowledge: a ring of light about Ubayy's place", svg: care(ubayy[0], n(ubayy[1] + 0.4), 5.4, 2.6), keys: showFrom(0.86, 0.9) },
      ...lights.map(
        ([dx, dy], i): SignPart => ({
          name: `knowledge: a small light about Ubayy's place ${i + 1}`,
          svg: sparkle(n(ubayy[0] + dx), n(ubayy[1] + dy), 0.9, SPARK),
          keys: showFrom(at3(0.9 + i * 0.015), at3(0.915 + i * 0.015)),
          loop: { move: "twinkle", ms: 1300, low: 0.6, phase: i / 3 }
        })
      )
    ],
    words: [
      { text: "O Abu al-Mundhir, which ayah is greatest?", from: 0.02, to: 0.15 },
      { text: "I said: Allah and His Messenger know best", from: 0.17, to: 0.31 },
      { text: "He asked again: which ayah is greatest?", from: 0.33, to: 0.47 },
      { text: "I said: Allah, there is no god but He", from: 0.49, to: 0.63 },
      { text: "The Living, the Eternal", from: 0.65, to: 0.79 },
      { text: "May knowledge be pleasant for you", from: 0.81, to: 1 }
    ]
  };
}

// Change it. Abu Sa'id said: I heard the Messenger of Allah ﷺ say: whoever of you sees a wrong, let him change it with
// his hand; if he cannot, then with his tongue; and if he cannot, then with his heart, and that is the weakest of faith
// (Sahih Muslim 49a). No one is drawn, not a hand nor a tongue: three grey tangles, wrongs, show on a way, with a place
// by each. The first place goes to its wrong, the tangle goes, a straight golden line shows where it was, and a light of
// faith comes in that place. A low wall stands between the second place and its wrong: its voice speaks, the tangle grows
// faint, and a smaller light comes in it. A high wall stands between the third place and its wrong: only a small light
// comes in it, and a faint ring comes about that smallest light.
function changeIt(): SignArt {
  const y = 101.6;
  const wrongs: [number, number][] = [
    [44, y],
    [87, y],
    [131, y]
  ];
  const places: [number, number][] = [
    [24, 104.6],
    [64, 104.8],
    [106, 105]
  ];
  // How far the first place goes, to stand by its wrong.
  const to: [number, number] = [11, -0.6];
  const first: [number, number] = [places[0][0] + to[0], places[0][1] + to[1]];
  const shows = (i: number): [number, number][] => [
    [at3(0.04 + i * 0.03), 0],
    [at3(0.06 + i * 0.03), 1]
  ];
  return {
    kind: "change-it",
    ms: 12000,
    parts: [
      ...dayAround([140, 18], 12000),
      ...palms([
        [8, 99, 14],
        [152, 99, 13]
      ]),
      { name: "the way", svg: way(`M4 ${y} L156 ${y}`, "#FFF0C4", 1.1) },
      { name: "a low wall: the second place cannot reach its wrong", svg: wall(74, 77.6, 105.4, 5) },
      { name: "a high wall: the third place cannot change its wrong at all", svg: wall(115, 119.2, 105.8, 9) },
      { name: "a wrong on the way 1", svg: tangle(wrongs[0][0], wrongs[0][1]), keys: track({ opacity: [...shows(0), [0.28, 1], [0.32, 0]] }) },
      { name: "a wrong on the way 2", svg: tangle(wrongs[1][0], wrongs[1][1]), keys: track({ opacity: [...shows(1), [0.46, 1], [0.51, 0.3]] }) },
      { name: "a wrong on the way 3", svg: tangle(wrongs[2][0], wrongs[2][1]), keys: track({ opacity: shows(2) }) },
      { name: "changed: a straight golden line where the first wrong was", svg: setRight(wrongs[0][0], wrongs[0][1]), keys: showFrom(0.29, 0.33) },
      {
        name: "the first place, going to its wrong",
        svg: someone(places[0][0], places[0][1], 1.5),
        keys: track({
          xy: [
            [0.22, 0, 0],
            [0.27, to[0], to[1]]
          ]
        })
      },
      { name: "the second place", svg: someone(places[1][0], places[1][1], 1.5) },
      { name: "the third place", svg: someone(places[2][0], places[2][1], 1.5) },
      { name: "faith: a light in the first place", svg: faithIn(first[0], first[1], 1.1), keys: showFrom(0.31, 0.35), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "by word: the voice of the second place", svg: arcs(n(places[1][0] + 2.4), n(places[1][1] - 3.8), VOICE), keys: showFrom(0.42, 0.43), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "faith: a smaller light in the second place", svg: faithIn(places[1][0], places[1][1], 0.8), keys: showFrom(0.5, 0.54), loop: { move: "twinkle", ms: 1500, low: 0.75, phase: 0.3 } },
      { name: "by the heart: a small light in the third place", svg: faithIn(places[2][0], places[2][1], 0.55), keys: showFrom(0.64, 0.68), loop: { move: "twinkle", ms: 1500, low: 0.75, phase: 0.6 } },
      { name: "the weakest of faith: a faint ring about the smallest light", svg: care(places[2][0], places[2][1], 3.6, 2, GREY), keys: showFrom(0.84, 0.88) }
    ],
    words: [
      { text: "Whoever of you sees a wrong", from: 0.02, to: 0.18 },
      { text: "Let him change it with his hand", from: 0.2, to: 0.38 },
      { text: "If he cannot, then with his tongue", from: 0.4, to: 0.58 },
      { text: "If he cannot, then with his heart", from: 0.6, to: 0.78 },
      { text: "And that is the weakest of faith", from: 0.8, to: 1 }
    ]
  };
}

export const FAITH_ART = {
  "first-believers": firstBelievers,
  "freed-bilal": freedBilal,
  "most-beloved": mostBeloved,
  "trustworthy-one": trustworthyOne,
  "two-refuges": twoRefuges,
  "greatest-ayah": greatestAyah,
  "change-it": changeIt
};
