import { animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, measure, heapOf, ring, sparkle, wall, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { care, goldCoin, palms, track } from "./daysArt";
import { drink, fastRing, greyRing, soft, speaking } from "./fastArt";
import { saddled, showAt, showFor } from "./roadArt";
import { at3 } from "./storyArt";
import { dish, goldHeap } from "./worthArt";
import { kabah } from "./historyArt";
import { cup } from "./hopeArt";
import { jar } from "./tradeArt";

/**
 * Travel: do not set out on a journey except for three masjids: al-Masjid al-Haram, the masjid of Allah's Messenger,
 * and the masjid of al-Aqsa; on a rainy day Ibn Abbas said to his mu'adhdhin: say: pray in your houses, and said: it
 * was done by one who was much better than I; no doubt, the Jumu'ah prayer is compulsory, but I dislike to put you to
 * task by bringing you out walking in mud and slush; Abu Dharr went out at night and found him walking all alone, and
 * he said: O Abu Dharr, come here! The rich are in fact the poor on the Day of Resurrection, except him whom Allah
 * gives wealth which he gives to his right, left, front and back, and does good deeds with it; on reaching the
 * sanctuary of Makkah, Ibn Umar used to stop reciting talbiyah, then would pass the night at Dhi Tuwa, then offer the
 * Fajr prayer and take a bath, and he used to say that the Prophet used to do the same; the young should greet the
 * old, the passer by the sitting one, and the small group the large group; the one who looks after a widow or a poor
 * person is like a mujahid who fights for Allah's cause, or like him who performs prayers all the night and fasts all
 * the day; and whenever he finished his meals he used to say: praise be to Allah Who has satisfied our needs and
 * quenched our thirst; Your favor cannot be compensated or denied. Only the land, the sky, buildings, things, plants
 * and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face:
 * where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is
 * arcs in the air. No one rides: the camel stands saddled with no one on it. Nothing is drawn for Allah or for the
 * Day, and nothing of fighting. Nothing comes down from the sky but the drops of a wet day: a prayer is a spark that
 * rises, what is good is a light, glints and a soft golden ring, and what is in need is a grey ring. No name or word
 * is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The places of the folk: of a town, of a lane, of those in need. */
const FOLK = "#C39A5A";

/** A place on a light lane: a small dashed circle, darker than the folk's. */
const ON_LANE = "#8E6538";

/** A place at night: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** A way that is lit: gold. */
const LIT = "#F2C14E";

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });

/** A spark that rises from its place from `from` until `to`, `rise` high, and stays there. */
const sparkStays = (from: number, to: number, rise = 10): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, -1, -rise]
});

/** A spark that rises quickly from its place at `from`, and is gone 0.03 after. */
const sparkGoes = (from: number, rise = 10): SignKeys => ({
  at: [0, from, at3(from + 0.006), at3(from + 0.024), at3(from + 0.03)],
  opacity: [0, 0, 1, 1, 0],
  y: [0, 0, -1, -(rise - 1), -rise]
});

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 114], [64, 117], [112, 115], [150, 116]]) => landOf(tufts, fill);

/** The land by night from y 61 down, with a few dark tufts of grass. */
const nightLand = (fill: string, tufts: [number, number][]) =>
  `<rect y="61" width="160" height="59" fill="${fill}"/><path d="M0 61 L160 61" stroke="#4A5878" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#4E5B78", 3.4)).join("");

/** A small flat house of a far town, its foot's left at (x, y), `w` wide and `h` high, with its door. */
const house = (x: number, y: number, w: number, h: number, wall = "#DCC6A2") =>
  `<rect x="${x}" y="${n(y - h)}" width="${w}" height="${h}" fill="${wall}"/><rect x="${n(x + w / 2 - 0.6)}" y="${n(y - 2)}" width="1.2" height="2" fill="#7C6448"/>`;

/** An olive tree, its foot at (x, y), `s` times its size: grey-green leaves on a short trunk. */
const oliveTree = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y} L${n(x + 0.4 * s)} ${n(y - 10 * s)}" stroke="#7A5A3A" stroke-width="${n(1.6 * s)}" stroke-linecap="round"/>` +
  `<circle cx="${n(x - 3.4 * s)}" cy="${n(y - 11 * s)}" r="${n(4.4 * s)}" fill="#7F9A5A"/><circle cx="${n(x + 3.6 * s)}" cy="${n(y - 12 * s)}" r="${n(4 * s)}" fill="#8AA664"/>` +
  `<circle cx="${n(x + 0.2 * s)}" cy="${n(y - 15.4 * s)}" r="${n(4.2 * s)}" fill="#94AE6C"/>`;

/** Drops of a wet day: short slanting strokes from x1 to x2 and from y1 to y2; `seed` sets them apart. */
const drops = (x1: number, x2: number, y1: number, y2: number, seed: number, step = 12, opacity = 0.8, color = "#6E8FB0") => {
  let d = "";
  let k = seed;
  for (let y = y1; y < y2; y += n(step * 0.68)) {
    for (let x = x1 + ((k * 5) % step); x < x2; x += step) d += `M${n(x)} ${n(y)} l-0.5 2.6 `;
    k += 1;
  }
  return `<path d="${d.trim()}" stroke="${color}" stroke-width="0.6" stroke-linecap="round" opacity="${opacity}"/>`;
};

/** Three layers of drops, each coming down a little and fading, one after another, so they never stop. */
const shower = (label: string, x1: number, x2: number, y1: number, y2: number, step = 12, opacity = 0.8): SignPart[] =>
  [0, 1, 2].map((i) => ({
    name: `${label} ${i + 1}`,
    svg: drops(x1, x2, y1, y2, i * 4, step, opacity),
    loop: { move: "drip" as const, ms: 900, distance: 7, phase: i / 3 }
  }));

/** A warm light in a window at (x, y), the window's top left corner, as `home()` draws it. */
const lampIn = (x: number, y: number) => `<rect x="${x}" y="${y}" width="2.6" height="2.6" fill="#FFD27A"/>` + glow(n(x + 1.3), n(y + 1.3), 4.4, "#FFD27A", 0.18);

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** The night over a land of day: a deep blue over the land and the far hills. */
const NIGHT_OVER_LAND = `<rect y="34" width="160" height="86" fill="#13224A" opacity="0.66"/>`;

/** A mat to sit on, its middle at (x, y). */
const mat = (x: number, y: number) => `<path d="M${n(x - 4)} ${n(y - 0.8)} L${n(x + 4)} ${n(y - 0.8)} L${n(x + 4.8)} ${n(y + 0.8)} L${n(x - 4.8)} ${n(y + 0.8)} Z" fill="#B98F5A"/>`;

// The far places of the three masjids, each on the far land below the horizon.

/** Al-Masjid al-Haram as it was: the Ka'bah, with the open ground about it. */
const HARAM = `<ellipse cx="24.4" cy="74.2" rx="10" ry="2" fill="#F3EBDA"/>` + kabah(21, 74, 6);

/** The hills and the houses of Makkah about it. */
const MAKKAH_HILLS = peaks(
  [
    [6, 16, 13],
    [42, 14, 13]
  ],
  74,
  "#9A8468",
  false
);
const MAKKAH_HOUSES = house(4, 74, 5, 5) + house(9.6, 74, 4.2, 3.6) + house(38, 74, 6, 4.4);

/** The masjid of al-Aqsa as a house of prayer of stone with arched doors (no dome: none stood there then). */
const AQSA =
  `<rect x="128" y="66" width="16" height="8" fill="#EDE6D3" stroke="#9C8E73" stroke-width="0.5"/><rect x="127.4" y="65.2" width="17.2" height="1.4" fill="#B9AC8E"/>` +
  [131.5, 136, 140.5].map((x) => `<path d="M${n(x - 1.2)} 74 L${n(x - 1.2)} 70.8 A1.2 1.2 0 0 1 ${n(x + 1.2)} 70.8 L${n(x + 1.2)} 74 Z" fill="#7C6E56"/>`).join("");

/** The hills about Jerusalem, its stone houses and its olive trees. */
const JERUSALEM_HILLS = peaks(
  [
    [120, 12, 16],
    [154, 14, 14]
  ],
  74,
  "#A9A68E",
  false
);
const JERUSALEM_HOUSES = house(117.4, 74, 7, 6, "#E6DCC4") + house(146, 74, 6, 6.6, "#E6DCC4");
const OLIVES = oliveTree(113, 76, 0.42) + oliveTree(156.4, 76.4, 0.4);

// Except for three masjids. Abu Hurairah said: the Prophet ﷺ said: do not set out on a journey except for three
// masjids: al-Masjid al-Haram, the masjid of Allah's Messenger ﷺ, and the masjid of al-Aqsa (Sahih al-Bukhari 1189;
// the page's "i.e." and "(Mosque of Jerusalem)" are left out). No one is drawn and no one rides: by a home stands a
// camel, saddled and ready for the road, with no one on it, and the road goes out from the home. Three soft lights
// show far off, and a faint way goes to each. As each masjid is named, it shows where its light is: on the left the
// Ka'bah with the open ground about it, among the hills and houses of Makkah; in the middle his masjid in Madinah, as
// it was built, among palms; and on the right the masjid of al-Aqsa, a house of prayer of stone among stone houses and
// olive trees. Each one's way is lit gold, with glints over it, and at the end a warm light comes over the three.
function exceptForThreeMasjids(): SignArt {
  const abuHurairah: [number, number] = [22, 108];
  const lights: [number, number][] = [
    [24, 70],
    [80, 70],
    [136, 70]
  ];
  const ways = ["M80 98 C64 92 44 84 30 76.6", "M80 98 L80 77", "M80 98 C96 92 116 84 132 76"];
  const madinahPalms = palms([
    [60, 77, 12],
    [100, 77, 11],
    [106, 78.4, 8]
  ]).map((part): SignPart => ({ ...part, keys: showAt(0.65, 0.675) }));
  return {
    kind: "except-for-three-masjids",
    ms: 9000,
    parts: [
      { name: "a clear sky", svg: sky("#BFE3FA", "#E3F1F9", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(56, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "far hills", svg: hills("#CDB894") },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [12, 116],
          [44, 118],
          [120, 116],
          [150, 114]
        ])
      },
      ...lights.map(([x, y], i): SignPart => ({
        name: `a soft light far off: ${["the first", "the second", "the third"][i]} of the three`,
        svg: glow(x, y, 10, "#FFF3C4", 0.16),
        keys: showAt(at3(0.325 + i * 0.02), at3(0.345 + i * 0.02)),
        loop: soft
      })),
      { name: "the hills of Makkah", svg: MAKKAH_HILLS, keys: showAt(0.485, 0.51) },
      { name: "the houses of Makkah", svg: MAKKAH_HOUSES, keys: showAt(0.485, 0.51) },
      { name: "al-Masjid al-Haram: the Ka'bah and the open ground about it", svg: HARAM, keys: showAt(0.49, 0.515) },
      { name: "his masjid in Madinah, as it was built", svg: madinahMasjid(66, 76, 0.58), keys: showAt(0.645, 0.67) },
      ...madinahPalms,
      { name: "the hills about Jerusalem", svg: JERUSALEM_HILLS, keys: showAt(0.825, 0.85) },
      { name: "the stone houses of Jerusalem", svg: JERUSALEM_HOUSES, keys: showAt(0.825, 0.85) },
      { name: "olive trees of Jerusalem", svg: OLIVES, keys: showAt(0.83, 0.855) },
      { name: "the masjid of al-Aqsa: a house of prayer of stone", svg: AQSA, keys: showAt(0.83, 0.855) },
      { name: "a home", svg: home(58, 106, 20, 12) },
      { name: "the road out from the home", svg: way("M58 106.6 Q70 104 80 98", "#F1E3C4", 1.1), keys: showAt(0.19, 0.21) },
      ...ways.map((d, i): SignPart => ({
        name: `a faint way to ${["the first", "the second", "the third"][i]} light`,
        svg: way(d, "#F6EEDA", 0.9),
        keys: showAt(at3(0.33 + i * 0.02), at3(0.355 + i * 0.02))
      })),
      { name: "the way to al-Masjid al-Haram, lit", svg: way(ways[0], LIT, 1.1), keys: showAt(0.515, 0.535), loop: soft },
      { name: "the way to his masjid, lit", svg: way(ways[1], LIT, 1.1), keys: showAt(0.68, 0.7), loop: soft },
      { name: "the way to the masjid of al-Aqsa, lit", svg: way(ways[2], LIT, 1.1), keys: showAt(0.86, 0.88), loop: soft },
      { name: "a saddled camel by the home, ready for the road, with no one on it", svg: saddled(98, 109, 0.22, true), keys: showAt(0.155, 0.175) },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 3), n(abuHurairah[1] - 1.6), ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      {
        name: "glints over al-Masjid al-Haram",
        svg: glints([
          [18, 64.6],
          [30, 65.4],
          [24.6, 62.4]
        ]),
        keys: showAt(0.54, 0.555),
        loop: twinkle()
      },
      {
        name: "glints over his masjid",
        svg: glints([
          [70, 62.4],
          [80, 61.2],
          [90, 62.4]
        ]),
        keys: showAt(0.705, 0.72),
        loop: twinkle()
      },
      {
        name: "glints over the masjid of al-Aqsa",
        svg: glints([
          [130, 62.6],
          [136, 61.4],
          [142, 62.6]
        ]),
        keys: showAt(0.885, 0.9),
        loop: twinkle()
      },
      { name: "a warm light over the three masjids", svg: lights.map(([x, y]) => wash(x, n(y + 2), 13, 4.4, WARM, 0.14)).join(""), keys: showAt(0.91, 0.94), loop: soft }
    ],
    words: [
      { text: "Abu Hurairah: he said:", from: 0.02, to: 0.13 },
      { text: "Do not set out on a journey", from: 0.15, to: 0.3 },
      { text: "except for three masjids:", from: 0.32, to: 0.46 },
      { text: "al-Masjid al-Haram,", from: 0.48, to: 0.62 },
      { text: "the masjid of Allah's Messenger,", from: 0.64, to: 0.8 },
      { text: "and the masjid of al-Aqsa.", from: 0.82, to: 1 }
    ]
  };
}

// Pray in your houses. Muhammad ibn Sirin said: on a rainy day Ibn Abbas said to his mu'adhdhin: after saying: I
// testify that Muhammad is Allah's Messenger ﷺ, do not say: come for the prayer, but say: pray in your houses. The
// people disliked it. Ibn Abbas said: it was done by one who was much better than I. No doubt, the Jumu'ah prayer is
// compulsory, but I dislike to put you to task by bringing you out walking in mud and slush (Sahih al-Bukhari 901; the
// words leave out the words of the call, and that the people disliked it). No one is drawn: on a grey day, with drops
// coming down, Ibn Abbas's place is at the masjid and his voice speaks; the mu'adhdhin's place shows on its roof, and
// his call goes out; warm lights come in the homes, with sparks of prayer rising from them. Ibn Abbas's voice speaks
// again, and glints come over the call, done before. A warm light shows in the masjid's door, the Jumu'ah prayer;
// ways show from the homes to it, then mud and slush on them, and the ways fade while the homes glow, warm and dry.
function prayInYourHouses(): SignArt {
  const ibnAbbas: [number, number] = [112, 100];
  const muadhdhin: [number, number] = [124, 76];
  // Each home: its foot's middle, its width and height.
  const homes: [number, number, number, number][] = [
    [16, 92, 16, 11],
    [42, 90, 16, 11],
    [70, 94, 16, 11],
    [30, 106, 16, 10]
  ];
  const ways = ["M13 92.6 C40 98 80 100 121.6 96", "M39 90.6 C60 94 90 97 121.6 95.4", "M67 94.6 C84 96 100 97 121.4 95.4", "M27 106.4 C60 106 92 102 122.4 96.4"];
  const mud: [number, number, number][] = [
    [58, 100.6, 3.6],
    [88, 99.6, 3],
    [104, 98.8, 2.6],
    [50, 105.6, 3.4],
    [78, 103.4, 3.2]
  ];
  const slush: [number, number, number][] = [
    [70, 99.4, 2.4],
    [96, 98.4, 2],
    [62, 104.4, 2.2],
    [110, 97.6, 1.8]
  ];
  const masjid =
    `<rect x="100" y="80" width="48" height="15" fill="#CDB08A"/><rect x="99.2" y="78.6" width="49.6" height="1.6" fill="#B08F66"/>` +
    `<rect x="100" y="80" width="48" height="2" fill="#000000" opacity="0.06"/><rect x="121" y="88" width="6" height="7" fill="#6E5638"/>` +
    [106, 112, 134, 140].map((x) => `<rect x="${x}" y="84" width="2.4" height="3" fill="#6E5638"/>`).join("");
  return {
    kind: "pray-in-your-houses",
    ms: 10000,
    parts: [
      { name: "a grey, wet sky", svg: sky("#A9B6C2", "#C9D2DA", 62) },
      { name: "grey clouds", svg: cloud(36, 22, 0.9, "#8C98A4", 0.95) + cloud(104, 16, 1, "#96A2AD", 0.95) + cloud(150, 26, 0.7, "#8C98A4", 0.9), loop: { move: "slide", ms: 10000 } },
      ...shower("drops of the wet day, far off", 0, 160, 30, 60),
      { name: "hills", svg: hills("#9DA195") },
      {
        name: "the wet land",
        svg: plainLand("#B7A486", [
          [8, 116],
          [58, 118],
          [150, 116]
        ])
      },
      ...homes.map(([x, y, w, h], i): SignPart => ({ name: `a home ${i + 1}`, svg: home(x, y, w, h, "#C9A274", "#B08A5E") })),
      { name: "the masjid", svg: masjid },
      ...ways.map((d, i): SignPart => ({ name: `a way from a home to the masjid ${i + 1}`, svg: way(d, "#E9DDC4", 0.9), keys: showWhile(at3(0.77 + i * 0.005), at3(0.785 + i * 0.005), 0.915, 0.93) })),
      { name: "mud on the ways", svg: mud.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.3)}" fill="#7A5C3A"/>`).join(""), keys: showAt(0.886, 0.9) },
      {
        name: "slush on the ways",
        svg: slush.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.32)}" fill="#A9BCC9"/><ellipse cx="${n(x - r * 0.3)}" cy="${n(y - 0.2)}" rx="${n(r * 0.4)}" ry="0.2" fill="#D6E2EA"/>`).join(""),
        keys: showAt(0.894, 0.908)
      },
      ...shower("drops of the wet day, near", 0, 160, 64, 116, 17, 0.5),
      { name: "Ibn Abbas's place, at the masjid", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.6, ITS_VOICE) },
      { name: "Ibn Abbas's voice: to the mu'adhdhin", svg: arcs(n(ibnAbbas[0] + 3), n(ibnAbbas[1] - 1.6), ITS_VOICE), keys: showFor(0.03, 0.04, 0.265, 0.272), loop: speaking },
      { name: "the mu'adhdhin's place, on the roof of the masjid", svg: someone(muadhdhin[0], muadhdhin[1], 1.4, "#7A5A3A"), keys: showAt(0.145, 0.16) },
      {
        name: "the mu'adhdhin's call: pray in your houses",
        svg: arcs(n(muadhdhin[0] + 3), n(muadhdhin[1] - 1), "#7A5A3A") + arcsLeft(n(muadhdhin[0] - 3), n(muadhdhin[1] - 1), "#7A5A3A"),
        keys: showFor(0.272, 0.282, 0.385, 0.395),
        loop: speaking
      },
      ...homes.map(([x, y, w, h], i): SignPart => ({ name: `a warm light in a home ${i + 1}`, svg: lampIn(n(x + 2), n(y - h + 2.4)), keys: showAt(at3(0.288 + i * 0.006), at3(0.298 + i * 0.006)), loop: soft })),
      ...homes.map(([x, y, , h], i): SignPart => ({
        name: `a spark of prayer rising from a home ${i + 1}`,
        svg: sparkle(x, n(y - h - 3), 1.2, "#FFE7A0"),
        keys: sparkGoes(at3(0.285 + i * 0.005), 9),
        loop: twinkle(900)
      })),
      { name: "Ibn Abbas's voice: answering", svg: arcs(n(ibnAbbas[0] + 3), n(ibnAbbas[1] - 1.6), ITS_VOICE), keys: showAt(0.39, 0.4), loop: speaking },
      {
        name: "done before by one much better: glints over the call",
        svg: glints([
          [118.4, 72.4],
          [124, 70.6],
          [129.6, 72.4]
        ]),
        keys: showAt(0.52, 0.535),
        loop: twinkle()
      },
      { name: "the Jumu'ah prayer: a warm light in the masjid's door", svg: `<rect x="121" y="88" width="6" height="7" fill="#FFD27A"/>` + glow(124, 91.4, 8, "#FFD27A", 0.16), keys: showAt(0.64, 0.655), loop: soft },
      { name: "a soft light about the masjid", svg: wash(124, 88, 28, 10, "#FFF3C8", 0.12), keys: showAt(0.65, 0.67), loop: soft },
      { name: "warm and dry: a glow about the homes", svg: homes.map(([x, y, w, h]) => wash(x, n(y - h / 2), n(w * 0.7), n(h * 0.7), "#FFE2A0", 0.16)).join(""), keys: showAt(0.925, 0.945), loop: soft }
    ],
    words: [
      { text: "On a rainy day Ibn Abbas said", from: 0.02, to: 0.13 },
      { text: "to his mu'adhdhin:", from: 0.142, to: 0.25 },
      { text: "say: Pray in your houses.", from: 0.262, to: 0.37 },
      { text: "Ibn Abbas said: It was done by one", from: 0.382, to: 0.5 },
      { text: "who was much better than I.", from: 0.512, to: 0.62 },
      { text: "No doubt, the Jumu'ah prayer is compulsory", from: 0.632, to: 0.75 },
      { text: "but I dislike to put you to task by", from: 0.762, to: 0.87 },
      { text: "bringing you out walking in mud and slush.", from: 0.882, to: 1 }
    ]
  };
}

// Right, left, front and back. Abu Dharr said: once I went out at night and found Allah's Messenger ﷺ walking all
// alone ... he said: O Abu Dharr, come here! So I accompanied him for a while, and then he said: the rich are in fact
// the poor on the Day of Resurrection, except him whom Allah gives wealth which he gives to his right, left, front and
// back, and does good deeds with it (Sahih al-Bukhari 6443; the page's "(little rewarded)" and "(in charity)" are left
// out). Nothing is drawn for the Day, and no one is drawn: on a moonlit night, Abu Dharr's place comes out, and his
// place, a golden ring, walks all alone along the path; his voice calls, and Abu Dharr's place comes to walk with him.
// By a home in the town a heap of gold shows, and a grey ring comes about the place by it; by another home a heap of
// gold shows with the place of one who gives, glints come over the heap, and gold coins go from it to places in need
// to its right, left, front and back, whose grey rings go. Then a soft golden ring and a warm light come about the one
// who gives, with glints.
function rightLeftFrontAndBack(): SignArt {
  const abuDharr: [number, number] = [4, 106];
  const his: [number, number] = [24, 110];
  const heap: [number, number] = [112, 92];
  const giver: [number, number] = [124, 93];
  // The places in need: to the right, the left, in front and behind.
  const needy: { name: string; at: [number, number] }[] = [
    { name: "to the right", at: [146, 96] },
    { name: "to the left", at: [86, 96] },
    { name: "in front", at: [112, 104] },
    { name: "behind", at: [104, 80] }
  ];
  const darkHome = (x: number, y: number) => home(x, y, 18, 12, "#6E6450", "#5E5644", "#2A2A3A");
  return {
    kind: "right-left-front-and-back",
    ms: 10000,
    parts: [
      { name: "a night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [10, 12],
          [30, 26],
          [52, 10],
          [74, 22],
          [94, 8],
          [150, 12],
          [146, 34],
          [8, 38],
          [62, 36],
          [100, 30]
        ])
      },
      { name: "the moon", svg: glow(126, 20, 13, "#FFF3B8", 0.07) + `<circle cx="126" cy="20" r="5" fill="#F6EFD2"/><circle cx="124.4" cy="18.8" r="1" fill="#E4DCBE"/><circle cx="127.8" cy="21.6" r="0.8" fill="#E4DCBE"/>` },
      { name: "hills by night", svg: hills("#2C3A5C") },
      {
        name: "the land by night",
        svg: nightLand("#3A4766", [
          [20, 117],
          [70, 118],
          [140, 117]
        ])
      },
      {
        name: "dark stones of the open land",
        svg: (
          [
            [10, 96, 2.4],
            [72, 102, 2],
            [92, 84, 1.8],
            [150, 104, 2.6],
            [24, 118, 2.2],
            [128, 116, 2]
          ] as [number, number, number][]
        )
          .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.6)}" fill="#262E46"/><ellipse cx="${n(x - r * 0.3)}" cy="${n(y - r * 0.2)}" rx="${n(r * 0.4)}" ry="${n(r * 0.2)}" fill="#3E4A68"/>`)
          .join("")
      },
      { name: "a home by night", svg: darkHome(34, 88) },
      { name: "another home by night", svg: darkHome(136, 86) },
      { name: "the path by night", svg: way("M0 111.6 L160 111.6", "#6E6E78", 0.8) },
      { name: "Abu Dharr's place", svg: someone(abuDharr[0], abuDharr[1], 1.5, LIGHT), keys: track({ opacity: [[0.025, 0], [0.035, 1]], xy: [[0.03, 0, 0], [0.085, 10, 0], [0.28, 10, 0], [0.325, 51, 3.6]] }) },
      { name: "his place, walking all alone", svg: ring(his[0], his[1], 2.4, GOLD), keys: track({ opacity: [[0.145, 0], [0.155, 1]], xy: [[0.15, 0, 0], [0.205, 38, 0]] }) },
      { name: "his voice", svg: arcs(n(his[0] + 38 + 4.4), n(his[1] - 1.6), GOLD), keys: showAt(0.265, 0.275), loop: speaking },
      { name: "a heap of gold by a home", svg: goldHeap(50, 93, 0.9), keys: showAt(0.385, 0.4) },
      { name: "the place of one with much wealth", svg: someone(58, 92, 1.4, LIGHT), keys: showAt(0.39, 0.405) },
      { name: "a grey ring about it: little in the end", svg: greyRing(54, 92.8, 8, 2.8), keys: showAt(0.415, 0.435) },
      { name: "another heap of gold", svg: goldHeap(heap[0], heap[1], 0.9), keys: showAt(0.515, 0.53) },
      { name: "the place of one who gives", svg: someone(giver[0], giver[1], 1.4, LIGHT), keys: track({ opacity: [[0.52, 0], [0.535, 1]], xy: [[0.665, 0, 0], [0.695, -6, 0]] }) },
      {
        name: "glints over the heap: wealth given to it",
        svg: glints([
          [108, 86.6],
          [116, 87],
          [112, 84.4]
        ]),
        keys: showAt(0.635, 0.65),
        loop: twinkle()
      },
      ...needy.map(({ name, at }): SignPart => ({ name: `a place in need ${name}`, svg: someone(at[0], at[1], 1.3, LIGHT), keys: showAt(0.765, 0.775) })),
      ...needy.map(({ name, at }): SignPart => ({ name: `a grey ring of need ${name}`, svg: greyRing(at[0], n(at[1] + 0.6), 3.6, 1.6), keys: showWhile(0.765, 0.775, 0.806, 0.816) })),
      ...needy.map(({ name, at }): SignPart => ({
        name: `a gold coin going ${name}`,
        svg: goldCoin(heap[0], n(heap[1] - 3.4), 1.1),
        keys: track({
          opacity: [
            [0.772, 0],
            [0.776, 1]
          ],
          xy: [
            [0.776, 0, 0],
            [0.8, n(at[0] - heap[0]), n(at[1] - heap[1])]
          ]
        })
      })),
      { name: "a soft golden ring about the one who gives", svg: care(n(giver[0] - 6), n(giver[1] + 0.4), 5, 2, SOFT_GOLD), keys: showAt(0.886, 0.9), loop: soft },
      { name: "a warm light about the one who gives", svg: wash(n(giver[0] - 6), n(giver[1] - 1), 7, 4, WARM, 0.18), keys: showAt(0.892, 0.912), loop: soft },
      {
        name: "glints: good deeds done with it",
        svg: glints([
          [113, 88.8],
          [121.6, 89.2],
          [117.4, 86.4]
        ]),
        keys: showAt(0.91, 0.925),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abu Dharr: I went out at night and", from: 0.02, to: 0.13 },
      { text: "found him walking all alone.", from: 0.142, to: 0.25 },
      { text: "He said: O Abu Dharr, come here!", from: 0.262, to: 0.37 },
      { text: "The rich are in fact the poor", from: 0.382, to: 0.5 },
      { text: "on the Day of Resurrection except him", from: 0.512, to: 0.62 },
      { text: "whom Allah gives wealth which he gives", from: 0.632, to: 0.75 },
      { text: "to his right, left, front and back,", from: 0.762, to: 0.87 },
      { text: "and does good deeds with it.", from: 0.882, to: 1 }
    ]
  };
}

// The night at Dhi Tuwa. Nafi' said: on reaching the sanctuary of Makkah, Ibn Umar used to stop reciting talbiyah,
// and then he would pass the night at Dhi Tuwa and then offer the Fajr prayer and take a bath. He used to say that the
// Prophet ﷺ used to do the same (Sahih al-Bukhari 1573; the page's comma after "stop" is left out, as the Arabic is
// "he stopped reciting the talbiyah"). No one is drawn: in the evening, Ibn Umar's place comes along the road, with
// his talbiyah, to the edge of the sanctuary, a faint line across the land, and there his talbiyah stops. Night comes
// with its stars and moon, and his place goes on to the valley of Dhi Tuwa, between its hills, where a soft light
// comes about it. At dawn a spark of the Fajr prayer rises, a jar of water shows by it, and water about it, the bath.
// The sun rises, his voice tells of it, and a soft golden light comes over Dhi Tuwa, the same done before, with glints.
function theNightAtDhiTuwa(): SignArt {
  const start: [number, number] = [4, 109];
  // Where Ibn Umar's place goes: to the edge of the sanctuary, then on to Dhi Tuwa.
  const walk: [number, number, number][] = [
    [0.02, 0, 0],
    [0.1, 34, -4.4],
    [0.305, 34, -4.4],
    [0.385, 80, -9]
  ];
  const valley: [number, number] = [84, 100];
  const placeOf = (x: number, y: number) => someone(x, y, 1.5, "#8A5A2E") + `<circle cx="${x}" cy="${y}" r="2.3" stroke="#FFF3D6" stroke-width="0.4" fill="none" opacity="0.7"/>`;
  return {
    kind: "the-night-at-dhi-tuwa",
    ms: 10000,
    parts: [
      { name: "an evening sky", svg: sky("#F1C79A", "#F6DFC0", 62) },
      { name: "the evening sun, setting", svg: glow(26, 48, 12, "#FFD9A0", 0.16) + `<circle cx="26" cy="48" r="4.6" fill="#FFC873"/>`, keys: track({ xy: [[0.305, 0, 0], [0.37, 0, 20]] }) },
      { name: "the night coming", svg: nightSky(62), keys: showAt(0.305, 0.34) },
      {
        name: "stars",
        svg: stars([
          [12, 10],
          [34, 24],
          [56, 12],
          [78, 28],
          [96, 10],
          [148, 14],
          [140, 30],
          [8, 34],
          [66, 38]
        ]),
        keys: showAt(0.33, 0.36)
      },
      { name: "the moon", svg: glow(112, 22, 9, "#FFF3B8", 0.07) + crescent(112, 22, 4, 2, "#F6EFD2"), keys: showAt(0.33, 0.36) },
      { name: "dawn", svg: sky("#E4B49A", "#F2D7C2", 62) + glow(140, 62, 26, "#FFE6B8", 0.12), keys: showAt(0.585, 0.615) },
      { name: "the morning sun, rising", svg: sun(138, 40), keys: track({ opacity: [[0.725, 0], [0.735, 1]], xy: [[0.725, 0, 12], [0.8, 0, 0]] }) },
      {
        name: "the hills of Makkah",
        svg: peaks(
          [
            [118, 18, 16],
            [146, 22, 18]
          ],
          66,
          "#A9886A",
          false
        )
      },
      {
        name: "the land",
        svg: plainLand("#E0C49A", [
          [16, 117],
          [60, 118],
          [130, 116],
          [152, 118]
        ])
      },
      { name: "Makkah far off: the Ka'bah among its houses", svg: `<ellipse cx="132.4" cy="72.4" rx="6" ry="1.2" fill="#F3EBDA"/>` + kabah(130, 72, 4.4) + house(121, 72, 5, 4.6, "#B99A70") + house(140, 72, 5, 4, "#B99A70") },
      {
        name: "the valley of Dhi Tuwa, between its hills",
        svg: peaks(
          [
            [64, 12, 15],
            [104, 14, 16]
          ],
          98,
          "#C9A57E",
          false
        )
      },
      { name: "the road to Makkah", svg: way("M0 109.4 C24 108 44 105 62 103 C74 102 80 101 84 100.4 C92 96 104 88 124 76", "#D3BE96", 1) },
      { name: "the edge of the sanctuary: a faint line across the land", svg: way("M40 64 C38 78 42 94 38 118", "#FFF3D2", 0.7), keys: showAt(0.06, 0.08) },
      { name: "the night over the land", svg: NIGHT_OVER_LAND, keys: showWhile(0.305, 0.34, 0.585, 0.615) },
      { name: "a soft light in the valley: the night passed there", svg: wash(valley[0], valley[1], 10, 3, "#FFF3C8", 0.16), keys: showAt(0.445, 0.475), loop: soft },
      { name: "Ibn Umar's place", svg: placeOf(start[0], start[1]), keys: track({ xy: walk }) },
      {
        name: "Ibn Umar's talbiyah",
        svg: arcs(n(start[0] + 3.2), n(start[1] - 1.6), "#8A5A2E"),
        keys: track({
          opacity: [
            [0.165, 1],
            [0.185, 0]
          ],
          xy: walk.slice(0, 2)
        }),
        loop: speaking
      },
      { name: "a spark of the Fajr prayer, rising", svg: sparkle(valley[0], n(valley[1] - 5), 1.4, "#FFE7A0"), keys: sparkStays(0.615, 0.645, 12), loop: twinkle() },
      { name: "a jar of water for the bath", svg: jar(91, 101.4, 0.7), keys: showAt(0.638, 0.648) },
      {
        name: "water about Ibn Umar's place: the bath",
        svg: `<ellipse cx="84" cy="101.8" rx="3.8" ry="0.9" fill="#BFE0F0" opacity="0.85"/><path d="M80.6 98.4 Q84 95.8 87.4 98.4" stroke="#9FD3EE" stroke-width="0.6" fill="none" stroke-linecap="round"/>`,
        keys: showWhile(0.648, 0.658, 0.73, 0.745),
        loop: soft
      },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(87.4, 98.4, "#8A5A2E"), keys: showAt(0.725, 0.735), loop: speaking },
      { name: "the same, done before: a soft golden light over Dhi Tuwa", svg: wash(valley[0], n(valley[1] - 4), 16, 6, WARM, 0.16), keys: showAt(0.866, 0.895), loop: soft },
      {
        name: "glints over Dhi Tuwa",
        svg: glints([
          [76, 90],
          [92, 89],
          [84, 86.4]
        ]),
        keys: showAt(0.9, 0.915),
        loop: twinkle()
      }
    ],
    words: [
      { text: "On reaching the sanctuary of Makkah,", from: 0.02, to: 0.15 },
      { text: "Ibn Umar used to stop reciting talbiyah", from: 0.162, to: 0.29 },
      { text: "and then would pass the night", from: 0.302, to: 0.43 },
      { text: "at Dhi Tuwa and then offer", from: 0.442, to: 0.57 },
      { text: "the Fajr prayer and take a bath.", from: 0.582, to: 0.71 },
      { text: "Ibn Umar used to say that the Prophet", from: 0.722, to: 0.85 },
      { text: "used to do the same.", from: 0.862, to: 1 }
    ]
  };
}

// The young greet the old. Abu Hurairah said: the Prophet ﷺ said: the young should greet the old, the passer by should
// greet the sitting one, and the small group of persons should greet the large group of persons (Sahih al-Bukhari
// 6231). No one is drawn: along a lane of a town, a small place comes to a big one, the old, and its voice greets it;
// a place passing by comes along the lane, greets a place sitting on a mat by a door, and goes on; then a small group
// of three comes to a large group, and its voice greets them. Glints come over the three greetings, and a warm light.
function theYoungGreetTheOld(): SignArt {
  const abuHurairah: [number, number] = [8, 92];
  const old: [number, number] = [34, 104];
  const young: [number, number] = [8, 105.4];
  const sitting: [number, number] = [80, 99.4];
  const passer: [number, number] = [52, 107];
  const large: [number, number][] = [
    [114, 101],
    [120, 100],
    [126, 100],
    [132, 101],
    [117, 105],
    [123, 104.6],
    [129, 104.6],
    [135, 105],
    [126, 108.6]
  ];
  const small: [number, number][] = [
    [148, 106.6],
    [152.4, 109.4],
    [148, 112.2]
  ];
  return {
    kind: "the-young-greet-the-old",
    ms: 9000,
    parts: [
      { name: "a clear sky", svg: sky("#BFE3FA", "#E3F1F9", 62) },
      { name: "the sun", svg: sun(28, 18) },
      { name: "a cloud", svg: cloud(110, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "a home of the town 1", svg: home(22, 86, 18, 12) },
      { name: "a home of the town 2", svg: home(52, 84, 16, 11) },
      { name: "the home by the lane", svg: home(84, 92, 18, 12) },
      { name: "a home of the town 3", svg: home(112, 84, 16, 11) },
      { name: "a home of the town 4", svg: home(142, 86, 18, 12) },
      { name: "a palm by the lane", svg: palm(66, 92, 16), origin: { x: 66, y: 92 }, loop: { move: "sway", ms: 5200, angle: 1.4 } },
      { name: "the lane", svg: `<path d="M0 97 L160 97 L160 114 L0 114 Z" fill="#EBD9B2"/><path d="M0 97 L160 97" stroke="#D6C29A" stroke-width="0.5"/>` },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 3), n(abuHurairah[1] - 1.6), ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      { name: "the place of the old: a big one", svg: someone(old[0], old[1], 2.2, ON_LANE), keys: showAt(0.152, 0.165) },
      { name: "the place of the young: a small one", svg: someone(young[0], young[1], 1.1, ON_LANE), keys: track({ opacity: [[0.155, 0], [0.165, 1]], xy: [[0.16, 0, 0], [0.205, 16, 0]] }) },
      { name: "the young one's voice: greeting the old", svg: arcs(n(young[0] + 18.4), n(young[1] - 1), ITS_VOICE), keys: showFor(0.215, 0.225, 0.325, 0.335), loop: speaking },
      { name: "a mat by the door", svg: mat(sitting[0], n(sitting[1] + 1.2)), keys: showAt(0.322, 0.335) },
      { name: "the place of the sitting one", svg: someone(sitting[0], sitting[1], 1.6, ON_LANE), keys: showAt(0.322, 0.335) },
      {
        name: "the place of the passer by",
        svg: someone(passer[0], passer[1], 1.4, ON_LANE),
        keys: track({
          opacity: [
            [0.325, 0],
            [0.335, 1]
          ],
          xy: [
            [0.33, 0, 0],
            [0.41, 18, 0],
            [0.522, 18, 0],
            [0.555, 42, 0]
          ]
        })
      },
      { name: "the passer by's voice: greeting the sitting one", svg: arcs(n(passer[0] + 20.6), n(passer[1] - 1.4), ITS_VOICE), keys: showFor(0.485, 0.495, 0.512, 0.52), loop: speaking },
      { name: "the places of the large group", svg: large.map(([x, y]) => someone(x, y, 1.3, ON_LANE)).join(""), keys: showAt(0.622, 0.64) },
      {
        name: "the places of the small group",
        svg: small.map(([x, y]) => someone(x, y, 1.3, ON_LANE)).join(""),
        keys: track({
          opacity: [
            [0.655, 0],
            [0.665, 1]
          ],
          xy: [
            [0.66, 16, 0],
            [0.72, 0, 0]
          ]
        })
      },
      { name: "the small group's voice: greeting the large group", svg: arcsLeft(144.4, 107.4, ITS_VOICE), keys: showAt(0.825, 0.835), loop: speaking },
      {
        name: "glints over the three greetings",
        svg: glints(
          [
            [29, 99],
            [75, 101.4],
            [141, 102]
          ],
          1
        ),
        keys: showAt(0.86, 0.875),
        loop: twinkle()
      },
      { name: "a warm light over the lane", svg: wash(80, 105, 72, 8, WARM, 0.1), keys: showAt(0.89, 0.92), loop: soft }
    ],
    words: [
      { text: "Abu Hurairah: he said:", from: 0.02, to: 0.13 },
      { text: "The young should greet the old,", from: 0.15, to: 0.3 },
      { text: "the passer by should greet", from: 0.32, to: 0.46 },
      { text: "the sitting one,", from: 0.48, to: 0.6 },
      { text: "and the small group of persons should", from: 0.62, to: 0.8 },
      { text: "greet the large group of persons.", from: 0.82, to: 1 }
    ]
  };
}

// A widow or a poor person. Abu Hurairah said: the Prophet ﷺ said: the one who looks after a widow or a poor person is
// like a mujahid who fights for Allah's cause, or like him who performs prayers all the night and fasts all the day
// (Sahih al-Bukhari 5353; the page's "(warrior)" is left out). Nothing of fighting is drawn, and no one: by her home,
// a widow's place shows with a grey ring; a place comes to her, a dish of food shows by her, and her grey ring goes.
// By a low wall a poor one's place shows with a grey ring; the place comes to it, a sa' of dates shows by it, and its
// grey ring goes. A way far off is lit gold, with glints, and a soft golden ring comes about the one who looks after
// them. Night comes; at a home on the far side a place shows, and sparks of prayer rise from it one after another all
// the night; then the day comes, the sun goes across, and a soft golden ring of a fast comes about it. Glints come
// over the one who looks after them and the one who prays and fasts, alike.
function aWidowOrAPoorPerson(): SignArt {
  const widow: [number, number] = [34, 100.6];
  const poor: [number, number] = [72, 106.4];
  const carer: [number, number] = [56, 112];
  const worshipper: [number, number] = [140, 99];
  // Where the one who looks after them goes: to the widow, then to the poor one.
  const goes: [number, number, number][] = [
    [0.165, 0, 0],
    [0.215, -16, -9],
    [0.34, -16, -9],
    [0.39, 8, -4]
  ];
  const sparksAt = [0.665, 0.69, 0.71, 0.805, 0.82];
  const abuHurairah: [number, number] = [8, 90];
  return {
    kind: "a-widow-or-a-poor-person",
    ms: 10000,
    parts: [
      { name: "a clear sky", svg: sky("#BFE3FA", "#E3F1F9", 62) },
      { name: "the sun", svg: sun(40, 20), keys: track({ opacity: [[0.625, 1], [0.65, 0]] }) },
      { name: "a cloud", svg: cloud(110, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "the night", svg: nightSky(62), keys: showWhile(0.625, 0.655, 0.84, 0.865) },
      {
        name: "stars",
        svg: stars([
          [14, 12],
          [36, 26],
          [58, 10],
          [80, 24],
          [100, 12],
          [126, 28],
          [150, 14],
          [70, 38]
        ]),
        keys: showWhile(0.64, 0.66, 0.84, 0.865)
      },
      { name: "the sun of the day, going across", svg: sun(24, 56), keys: track({ opacity: [[0.845, 0], [0.86, 1]], xy: [[0.845, 0, 0], [0.94, 96, -34]] }) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the widow's home", svg: home(22, 96, 18, 12) },
      { name: "a low wall", svg: wall(60, 84, 104, 4) },
      { name: "a home on the far side", svg: home(132, 94, 18, 12) },
      { name: "a way lit far off: striving in His cause", svg: way("M66 104.6 C78 96 96 76 112 63.4", LIT, 1.1), keys: showAt(0.485, 0.51), loop: soft },
      {
        name: "glints along the lit way",
        svg: glints(
          [
            [80, 92.6],
            [94, 79],
            [106.4, 67.6]
          ],
          1
        ),
        keys: showAt(0.515, 0.53),
        loop: twinkle()
      },
      { name: "the night over the land", svg: NIGHT_OVER_LAND, keys: showWhile(0.625, 0.655, 0.84, 0.865) },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 3), n(abuHurairah[1] - 1.6), ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      { name: "the widow's place", svg: someone(widow[0], widow[1], 1.5, FOLK), keys: showAt(0.152, 0.165) },
      { name: "a grey ring of need about the widow", svg: greyRing(widow[0], n(widow[1] + 0.6), 4, 1.8), keys: showWhile(0.16, 0.175, 0.24, 0.255) },
      { name: "a dish of food, brought to her", svg: dish(28.4, 103.4) + `<ellipse cx="27.6" cy="101.2" rx="2.2" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>`, keys: showAt(0.22, 0.235) },
      { name: "the poor one's place, by the wall", svg: someone(poor[0], poor[1], 1.5, FOLK), keys: showAt(0.322, 0.335) },
      { name: "a grey ring of need about the poor one", svg: greyRing(poor[0], n(poor[1] + 0.6), 4, 1.8), keys: showWhile(0.325, 0.34, 0.405, 0.415) },
      { name: "a sa' of dates, brought to the poor one", svg: measure(80, 110) + heapOf(80, 110, "dates"), keys: showAt(0.395, 0.405) },
      { name: "the place of the one who looks after them", svg: someone(carer[0], carer[1], 1.6, "#7A4E26"), keys: track({ opacity: [[0.152, 0], [0.162, 1]], xy: goes }) },
      { name: "a soft golden ring about the one who looks after them", svg: care(64, n(108 + 0.4), 5, 2, SOFT_GOLD), keys: showAt(0.535, 0.555), loop: soft },
      { name: "the place of one who prays and fasts", svg: someone(worshipper[0], worshipper[1], 1.5, FOLK), keys: showAt(0.625, 0.64) },
      ...sparksAt.map(
        (from, i): SignPart => ({
          name: `a spark of prayer in the night ${i + 1}`,
          svg: sparkle(worshipper[0], n(worshipper[1] - 4), 1.2, "#FFE7A0"),
          keys: sparkGoes(from, 10),
          loop: twinkle(900)
        })
      ),
      { name: "a fast being kept, all the day", svg: fastRing(worshipper[0], n(worshipper[1] + 0.6), 4, 2), keys: showAt(0.87, 0.885), loop: soft },
      {
        name: "glints over the two alike",
        svg: glints(
          [
            [64, 102.6],
            [140, 93.4]
          ],
          1.1
        ),
        keys: showAt(0.92, 0.935),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abu Hurairah: he said:", from: 0.02, to: 0.13 },
      { text: "The one who looks after a widow", from: 0.15, to: 0.3 },
      { text: "or a poor person is like a mujahid", from: 0.32, to: 0.46 },
      { text: "who fights for Allah's cause,", from: 0.48, to: 0.6 },
      { text: "or like him who performs prayers", from: 0.62, to: 0.78 },
      { text: "all the night and fasts all the day.", from: 0.8, to: 1 }
    ]
  };
}

// Satisfied and quenched. Abu Umamah said: whenever the Prophet ﷺ finished his meals, he used to say: praise be to
// Allah Who has satisfied our needs and quenched our thirst. Your favor cannot be compensated or denied (Sahih
// al-Bukhari 5459; the page's "(or when his dining sheet was taken away)" is left out, and its "cannot by" is read
// "cannot be"). No one is drawn: by his home a cloth is spread with a dish of bread and dates and a cup of water, and
// his place, a golden ring, is at it. Abu Umamah's voice tells of it; the bread and the dates go, eaten, and the
// water goes from the cup. His voice speaks, and a spark of praise rises. A warm glow comes about the dish and a glint
// on the cup; glints come over the palm's dates and the well, over the sheep and the land, His favors; and a warm
// light comes over all, with a soft golden ring about his place.
function satisfiedAndQuenched(): SignArt {
  const abuUmamah: [number, number] = [18, 106];
  const his: [number, number] = [52, 101.4];
  const plate: [number, number] = [46, 106];
  const water: [number, number] = [59.4, 107];
  return {
    kind: "satisfied-and-quenched",
    ms: 9000,
    parts: [
      { name: "a clear sky", svg: sky("#BFE3FA", "#E3F1F9", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(70, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "his home", svg: home(50, 96, 24, 14) },
      { name: "a palm by the home, with its dates", svg: palm(92, 98, 22) + `<ellipse cx="93.6" cy="78.6" rx="1.2" ry="1.5" fill="#9C3D1E"/><ellipse cx="95.6" cy="79.2" rx="1.1" ry="1.4" fill="#9C3D1E"/><ellipse cx="94.6" cy="81" rx="1" ry="1.3" fill="#9C3D1E"/>`, origin: { x: 92, y: 98 }, loop: { move: "sway", ms: 5600, angle: 1.2 } },
      {
        name: "a well",
        svg: `<ellipse cx="124" cy="101" rx="6" ry="2.2" fill="#8C7B64"/><ellipse cx="124" cy="100.4" rx="4.4" ry="1.4" fill="#3E6E8E"/><path d="M118 101 L118 103.4 Q124 106 130 103.4 L130 101" fill="#A39278"/>`
      },
      { name: "a sheep by the well", svg: sheepAt(108, 104, 0.12), loop: { move: "bob", ms: 2600, y: 0.3 } },
      { name: "a cloth, spread", svg: `<path d="M38 103.6 L66 103.6 L68.4 108.6 L35.6 108.6 Z" fill="#EFE0BC"/>` },
      { name: "a dish", svg: dish(plate[0], plate[1]) },
      { name: "a round loaf on the dish", svg: `<ellipse cx="${n(plate[0] - 0.8)}" cy="${n(plate[1] - 2.2)}" rx="2.2" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>`, keys: track({ opacity: [[0.05, 1], [0.08, 0]] }) },
      {
        name: "dates on the dish",
        svg: [
          [1.6, -1.8],
          [2.7, -1.5],
          [2.2, -2.6]
        ]
          .map(([dx, dy]) => `<ellipse cx="${n(plate[0] + dx)}" cy="${n(plate[1] + dy)}" rx="0.8" ry="0.6" fill="#7A2E14"/>`)
          .join(""),
        keys: track({ opacity: [[0.06, 1], [0.09, 0]] })
      },
      { name: "a cup", svg: cup(water[0], water[1]) },
      { name: "water in the cup", svg: drink(water[0], water[1]), keys: track({ opacity: [[0.175, 1], [0.2, 0]] }) },
      { name: "his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Abu Umamah's place", svg: someone(abuUmamah[0], abuUmamah[1], 1.5, ITS_VOICE) },
      { name: "Abu Umamah's voice: telling of it", svg: arcs(n(abuUmamah[0] + 3), n(abuUmamah[1] - 1.6), ITS_VOICE), keys: showFor(0.025, 0.035, 0.095, 0.105), loop: speaking },
      { name: "his voice: the praise", svg: arcs(n(his[0] + 3.4), n(his[1] - 1.6), GOLD), keys: showAt(0.325, 0.335), loop: speaking },
      { name: "a spark of praise rising", svg: sparkle(his[0], n(his[1] - 6), 1.4, "#FFE7A0"), keys: sparkStays(0.35, 0.41, 22), loop: twinkle() },
      { name: "satisfied: a warm glow about the dish", svg: glow(plate[0], n(plate[1] - 1.4), 6, "#FFE2A0", 0.2), keys: showAt(0.495, 0.515), loop: soft },
      { name: "quenched: a cool glint on the cup", svg: glints([[n(water[0] + 0.4), n(water[1] - 5)]], 1, "#FFFFFF"), keys: showAt(0.52, 0.535), loop: twinkle() },
      {
        name: "His favors: glints over the dates, the well and the sheep",
        svg: glints(
          [
            [94.4, 76.4],
            [124, 96.6],
            [108, 92.4]
          ],
          1
        ),
        keys: showAt(0.545, 0.56),
        loop: twinkle()
      },
      {
        name: "His favors all about: glints over the land",
        svg: glints(
          [
            [16, 92],
            [34, 114],
            [76, 112],
            [140, 112],
            [150, 92]
          ],
          0.9
        ),
        keys: showAt(0.67, 0.7),
        loop: twinkle(1500)
      },
      { name: "a warm light over all", svg: wash(80, 96, 76, 20, WARM, 0.1), keys: showAt(0.85, 0.88), loop: soft },
      { name: "a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.4), 5, 2, SOFT_GOLD), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: [
      { text: "Abu Umamah: whenever he finished", from: 0.02, to: 0.15 },
      { text: "his meals, he used to say:", from: 0.17, to: 0.3 },
      { text: "Praise be to Allah Who has satisfied", from: 0.32, to: 0.47 },
      { text: "our needs and quenched our thirst.", from: 0.49, to: 0.64 },
      { text: "Your favor cannot be compensated", from: 0.66, to: 0.82 },
      { text: "or denied.", from: 0.84, to: 1 }
    ]
  };
}

export const TRAVEL_ART = {
  "except-for-three-masjids": exceptForThreeMasjids,
  "pray-in-your-houses": prayInYourHouses,
  "right-left-front-and-back": rightLeftFrontAndBack,
  "the-night-at-dhi-tuwa": theNightAtDhiTuwa,
  "the-young-greet-the-old": theYoungGreetTheOld,
  "a-widow-or-a-poor-person": aWidowOrAPoorPerson,
  "satisfied-and-quenched": satisfiedAndQuenched
};
