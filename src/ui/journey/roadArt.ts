import { animalAt, cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3 } from "./storyArt";
import { home } from "./trialArt";
import { GREY, prayerMat } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, LIGHT, palms, tent, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { nightLand } from "./heedArt";

/**
 * On the road with him ﷺ: Jabir's tired camel, bought and given back; the water-skins that forty drank from; no rider
 * alone by night; two setting out, with the adhan, the iqamah and the older leading; setting out on a Thursday; a young
 * camel bought and given to Abdullah ibn Umar; and Jubair's lost camel on the day of Arafah. Only the land, the sky,
 * homes, tents, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand or a face, and no one is drawn on a camel: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from
 * the sky: a du'a or a prayer is a spark that rises, and what Allah gives is a warm glow about its place.
 */

/** A soft golden ring: a place or a thing marked out. */
const SOFT_GOLD = "#E8C25A";

/** A shown-from: hidden until `from`, shown by `to`. */
const showAt = (from: number, to: number) => track({ opacity: [[from, 0], [to, 1]] });

/** Shown from `from` to `to`, and hidden again from `hide` to `gone`. */
const showFor = (from: number, to: number, hide: number, gone: number) =>
  track({
    opacity: [
      [from, 0],
      [to, 1],
      [hide, 1],
      [gone, 0]
    ]
  });

/** A camel's saddle cloth, in the picture card's own units: a red cloth over its back with a light band. */
const SADDLE = `<path d="M29 31 L56 31 L58 40 L27 40 Z" fill="#B5473A"/><path d="M28 35.4 L57 35.4" stroke="#F0D8A8" stroke-width="2.2"/>`;

/** The camel of the picture cards, `s` times its size with its feet at (x, y), with `extra` drawn on it in the card's units; `coat`: its near and far sides in other colors. */
const camelWith = (x: number, y: number, s: number, left: boolean, extra: string, coat?: [string, string]) => {
  let svg = animalAt("camel", n(x - 50 * s), n(y - 73 * s), s, left);
  if (coat) svg = svg.replace(/#E2AC62/g, coat[0]).replace(/#C48A42/g, coat[1]);
  return svg.replace(/<\/g>$/, `${extra}</g>`);
};

/** Only what is drawn on a camel (in the card's units), set where a camel `s` times its size with its feet at (x, y) would carry it. */
const onlyOnCamel = (x: number, y: number, s: number, left: boolean, extra: string) => {
  const [x0, y0] = [n(x - 50 * s), n(y - 73 * s)];
  return `<g transform="translate(${left ? n(x0 + 100 * s) : x0} ${y0}) scale(${left ? -s : s} ${s})">${extra}</g>`;
};

/** A camel with a saddle cloth on its back, ready for the road, and no one on it. */
const saddled = (x: number, y: number, s: number, left = false, coat?: [string, string]) => camelWith(x, y, s, left, SADDLE, coat);

/** The card's units: where a point (cx, cy) of the card falls in the scene, for a camel `s` times its size with its feet at (x, y). */
const onCamel = (x: number, y: number, s: number, left: boolean, cx: number, cy: number): [number, number] => [n(x - 50 * s + (left ? 100 - cx : cx) * s), n(y - 73 * s + cy * s)];

/** Two big water-skins hung on a camel's side, in the card's units; `full`: swollen, all but bursting. */
const skins = (full = false) => {
  const k = full ? 1.16 : 1;
  const bag = (cx: number) => {
    const p = (dx: number, dy: number) => `${n(cx + dx * k)} ${n(38 + dy * k)}`;
    return (
      `<path d="M${p(-7, 0)} Q${p(-10.6, 10)} ${p(-1.6, 15.4)} Q${p(7.6, 13.6)} ${p(7, 0)} Z" fill="#8A5A2E" stroke="#5E3C1E" stroke-width="0.8"/>` +
      `<path d="M${p(-4.6, 4.4)} Q${p(0, 7)} ${p(4.6, 4.4)}" stroke="#6E4724" stroke-width="0.7" fill="none"/>` +
      `<ellipse cx="${n(cx - 1.4 * k)}" cy="${n(38 + 16.4 * k)}" rx="1.6" ry="1.4" fill="#5E3C1E"/>`
    );
  };
  return bag(34) + bag(53);
};

/** Where the mouths of the two water-skins are in the card's units, as (cx, cy). */
const MOUTHS: [number, number][] = [
  [32.6, 54.4],
  [51.6, 54.4]
];

/** A purse, tied at its neck, its foot's middle at (x, y): a price. */
const purse = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${y} C${n(x - 2.9)} ${n(y - 2.2)} ${n(x - 1.6)} ${n(y - 3.3)} ${n(x - 0.7)} ${n(y - 3.5)} L${n(x + 0.7)} ${n(y - 3.5)} C${n(x + 1.6)} ${n(y - 3.3)} ${n(x + 2.9)} ${n(y - 2.2)} ${n(x + 2.2)} ${y} Z" fill="#8C5A2E"/>` +
  `<path d="M${n(x - 0.8)} ${n(y - 3.4)} L${n(x + 0.8)} ${n(y - 3.4)}" stroke="#E0B86A" stroke-width="0.6"/>` +
  `<path d="M${n(x - 0.6)} ${n(y - 3.5)} L${n(x - 1.2)} ${n(y - 4.6)} M${n(x + 0.6)} ${n(y - 3.5)} L${n(x + 1.2)} ${n(y - 4.6)}" stroke="#8C5A2E" stroke-width="0.5" stroke-linecap="round"/>`;

/** The road, a lighter band across the land from x1 to x2 about y. */
const road = (x1: number, x2: number, y: number, fill = "#EEDCAE") =>
  `<path d="M${x1} ${n(y - 3)} Q${n((x1 + x2) / 2)} ${n(y - 4.6)} ${x2} ${n(y - 3.4)} L${x2} ${n(y + 3.4)} Q${n((x1 + x2) / 2)} ${n(y + 2.6)} ${x1} ${n(y + 3.6)} Z" fill="${fill}"/>`;

/** Three short grey strokes over (x, y): weary. */
const weary = (x: number, y: number) =>
  [-2.2, 0, 2.2]
    .map((dx, i) => `<path d="M${n(x + dx)} ${n(y - 1.6 + (i % 2) * 0.6)} q0.8 1 0 2" stroke="${GREY}" stroke-width="0.6" fill="none" stroke-linecap="round"/>`)
    .join("");

/** Light quick dashes behind (x, y): going fast. */
const dashes = (x: number, y: number) =>
  [
    [0, -3.4, 6],
    [-2, 0, 7],
    [0, 3.4, 5]
  ]
    .map(([dx, dy, w]) => `<path d="M${n(x + dx - w)} ${n(y + dy)} L${n(x + dx)} ${n(y + dy)}" stroke="#FFF6DC" stroke-width="0.9" stroke-linecap="round"/>`)
    .join("");

/** A light touch at (x, y): small strokes about a point. */
const touch = (x: number, y: number) =>
  [
    [-1.6, -1.6],
    [0, -2.2],
    [1.6, -1.6]
  ]
    .map(([dx, dy]) => `<path d="M${n(x + dx * 0.5)} ${n(y + dy * 0.5)} L${n(x + dx * 1.4)} ${n(y + dy * 1.4)}" stroke="#FFF3CF" stroke-width="0.7" stroke-linecap="round"/>`)
    .join("");

// Jabir's tired camel. Jabir said that he was riding a camel of his that had grown tired. The Prophet ﷺ passed by,
// struck it and made du'a for it, and it went as it had never gone before. He said: sell it to me for an uqiyah. I
// said: no. Then he said: sell it to me for an uqiyah. So I sold it, keeping its carrying me to my family. When we
// arrived, I brought him the camel and he paid me its price; then I went away, and he sent after me and said: I was
// not going to take your camel. Take that camel of yours, for it is your wealth (Sahih al-Bukhari 2718). No one is
// drawn, and no one is drawn on the camel: on the road to Madinah a camel with a saddle cloth plods along, weary, and
// his place, a golden ring, comes up beside it. A light touch shows at its side and a spark of du'a rises; the camel
// runs on, quick dashes behind it, as it never went before. His voice speaks twice, and a purse shows by his place: an
// uqiyah. A golden line joins his place and the camel; the camel goes on to its owner's home, and his place to his own
// home. The owner's place comes, and the camel goes with it to his home; the purse goes to the owner's place. Then the
// owner's place goes back home with the purse, his voice speaks, and the camel is sent back after it, with a warm glow
// about it at its owner's home.
function tiredCamel(): SignArt {
  const s = 0.2;
  const [cx, cy] = [24, 103];
  const head = onCamel(cx, cy, s, false, 84, 14);
  const hump = onCamel(84, cy, s, false, 44, 20);
  return {
    kind: "tired-camel",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(20, 20) },
      { name: "clouds", svg: cloud(70, 24, 0.6, "#FFFFFF", 0.9) + cloud(126, 18, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the road to Madinah", svg: road(0, 160, 101.5) },
      ...palms([
        [92, 85, 11],
        [126, 84, 12],
        [156, 86, 13]
      ]),
      { name: "the owner's home", svg: home(108, 92, 16, 12) },
      { name: "his home", svg: home(142, 92, 20, 14, "#CFA66F", "#B88A58") },
      {
        name: "a golden ring, his place",
        svg: ring(-6, 109, 2.4, GOLD),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.09, 40, 0],
            [0.3, 40, 0],
            [0.36, 70, 0],
            [0.61, 70, 0],
            [0.65, 148, -8.4]
          ]
        })
      },
      {
        name: "a camel grown tired",
        svg: saddled(cx, cy, s),
        keys: track({
          opacity: [
            [0.29, 1],
            [0.3, 0]
          ]
        }),
        loop: { move: "bob", ms: 1800, y: -0.3 }
      },
      {
        name: "weary marks over the tired camel",
        svg: weary(n(head[0] + 2.4), n(head[1] - 4.4)),
        keys: track({
          opacity: [
            [0.21, 1],
            [0.23, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.4 }
      },
      { name: "he struck it: a light touch at its side", svg: touch(17.4, 95.6), keys: showFor(0.16, 0.17, 0.19, 0.2) },
      spark("a spark of du'a, rising", 34, 104.4, 0.18, 0.23),
      {
        name: "the camel, going as it never went before",
        svg: saddled(cx, cy, s),
        keys: track({
          xy: [
            [0.3, 0, 0],
            [0.36, 60, 0]
          ],
          opacity: [
            [0.29, 0],
            [0.3, 1],
            [0.36, 1],
            [0.37, 0]
          ]
        }),
        loop: { move: "bob", ms: 440, y: -0.7 }
      },
      {
        name: "quick dashes behind the camel",
        svg: dashes(12, 96.4),
        keys: track({
          xy: [
            [0.3, 0, 0],
            [0.36, 60, 0]
          ],
          opacity: [
            [0.3, 0],
            [0.31, 1],
            [0.355, 1],
            [0.365, 0]
          ]
        })
      },
      {
        name: "the camel, sold, going on",
        svg: saddled(84, cy, s),
        keys: track({
          xy: [
            [0.61, 0, 0],
            [0.65, 24, 0],
            [0.72, 24, 0],
            [0.76, 40, 0]
          ],
          opacity: [
            [0.36, 0],
            [0.37, 1],
            [0.88, 1],
            [0.89, 0]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: -0.25 }
      },
      {
        name: "the camel, sent back",
        svg: saddled(124, cy, s, true),
        keys: track({
          xy: [
            [0.89, 0, 0],
            [0.93, -16, 0]
          ],
          opacity: [
            [0.88, 0],
            [0.89, 1]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: -0.25 }
      },
      {
        name: "his voice: sell it to me for an uqiyah",
        svg: arcs(66.8, 104, VOICE),
        keys: track({
          opacity: [
            [0.43, 0],
            [0.44, 1],
            [0.46, 1],
            [0.47, 0],
            [0.48, 0],
            [0.49, 1],
            [0.57, 1],
            [0.58, 0]
          ]
        }),
        loop: speaking
      },
      {
        name: "an uqiyah, its price, in a purse",
        svg: purse(58, 106) + sparkle(60.6, 101.6, 0.7, "#FFF3CF"),
        keys: track({
          xy: [
            [0.61, 0, 0],
            [0.65, 78, -7],
            [0.76, 78, -7],
            [0.79, 58, -5],
            [0.85, 58, -5],
            [0.88, 42, -5]
          ],
          opacity: [
            [0.45, 0],
            [0.47, 1]
          ]
        })
      },
      { name: "sold: a golden line between his place and the camel", svg: way(`M65.6 107.2 Q66 96 ${n(hump[0] - 1.6)} ${n(hump[1] + 0.6)}`, GOLD, 0.8), keys: showFor(0.57, 0.58, 0.6, 0.61) },
      {
        name: "the owner's place",
        svg: someone(100, 105),
        keys: track({
          xy: [
            [0.72, 0, 0],
            [0.76, 16, 0],
            [0.85, 16, 0],
            [0.88, 0, 0]
          ],
          opacity: [
            [0.71, 0],
            [0.72, 1]
          ]
        })
      },
      { name: "his voice: take your camel", svg: arcsLeft(138.4, 95.6, VOICE), keys: showAt(0.85, 0.86), loop: speaking },
      { name: "your wealth: a warm glow about the camel at its owner's home", svg: wash(108, 98, 14, 8, WARM, 0.14), keys: showAt(0.93, 0.95), loop: soft }
    ],
    words: [
      { text: "Jabir rode a camel that had grown tired", from: 0.02, to: 0.14 },
      { text: "He struck it and made du'a for it", from: 0.16, to: 0.27 },
      { text: "It went as it had never gone before", from: 0.29, to: 0.41 },
      { text: "Sell it to me for an uqiyah", from: 0.43, to: 0.55 },
      { text: "I sold it, and rode it to my family", from: 0.57, to: 0.69 },
      { text: "He paid me its price", from: 0.71, to: 0.83 },
      { text: "Take your camel: it is your wealth", from: 0.85, to: 1 }
    ]
  };
}

/** Forty small places in four rows, from x 6, each row's own list of (x, y). */
const FORTY: [number, number][][] = [0, 1, 2, 3].map((row) => Array.from({ length: 10 }, (_, i): [number, number] => [n(6 + i * 3.8 + (row % 2) * 1.2), n(83.6 + row * 4.4)]));

/** A small dashed place, `r` across, at (x, y). */
const smallPlace = (x: number, y: number, r = 1.15) => `<circle cx="${x}" cy="${y}" r="${r}" stroke="${VOICE}" stroke-width="0.5" stroke-dasharray="0.8 0.55" fill="none"/>`;

/** A small waterskin of leather, its foot's middle at (x, y); `full`: plump with water, a blue gleam at its neck. */
const smallSkin = (x: number, y: number, full: boolean) => {
  const w = full ? 2.6 : 2.2;
  const h = full ? 4.2 : 2.6;
  return (
    `<path d="M${n(x - w)} ${y} Q${n(x - w - 0.8)} ${n(y - h * 0.7)} ${n(x - 0.8)} ${n(y - h)} L${n(x - 0.5)} ${n(y - h - 0.9)} L${n(x + 0.5)} ${n(y - h - 0.9)} L${n(x + 0.8)} ${n(y - h)} Q${n(x + w + 0.8)} ${n(y - h * 0.7)} ${n(x + w)} ${y} Z" fill="${full ? "#8A5A2E" : "#C9A97E"}"/>` +
    (full ? `<ellipse cx="${x}" cy="${n(y - h - 0.9)}" rx="0.6" ry="0.3" fill="#7FB6E0"/>` : "")
  );
};

/** A small clay vessel, its foot's middle at (x, y); `full`: water to its brim. */
const vessel = (x: number, y: number, full: boolean) =>
  `<path d="M${n(x - 2)} ${y} Q${n(x - 2.8)} ${n(y - 2.6)} ${n(x - 1.3)} ${n(y - 4.2)} L${n(x + 1.3)} ${n(y - 4.2)} Q${n(x + 2.8)} ${n(y - 2.6)} ${n(x + 2)} ${y} Z" fill="${full ? "#B87A48" : "#D8B48C"}"/>` +
  (full ? `<ellipse cx="${x}" cy="${n(y - 4.2)}" rx="1.3" ry="0.4" fill="#4F86B8"/>` : `<ellipse cx="${x}" cy="${n(y - 4.2)}" rx="1.3" ry="0.4" fill="#A88A66"/>`);

/** A small sun in a day's light circle at (x, y): a day. */
const dayDisc = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="3" fill="#CFE8FA" stroke="#9CC4E4" stroke-width="0.4"/><circle cx="${x}" cy="${y}" r="1.4" fill="#FFD84A"/>`;

/** A crescent in a night's dark circle at (x, y): a night. */
const nightDisc = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="3" fill="#24345E" stroke="#3E5080" stroke-width="0.4"/>` +
  `<path d="M${n(x - 0.2)} ${n(y - 1.7)} A1.7 1.7 0 1 0 ${n(x - 0.2)} ${n(y + 1.7)} A1.3 1.7 0 1 1 ${n(x - 0.2)} ${n(y - 1.7)} Z" fill="#FFF3C4"/>`;

/** Bread in pieces and dates on a cloth, its middle at (x, y). */
const breadAndDates = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y + 0.6)} L${n(x + 4)} ${n(y + 0.6)} L${n(x + 3)} ${n(y - 0.8)} L${n(x - 3)} ${n(y - 0.8)} Z" fill="#EFE0BC"/>` +
  `<path d="M${n(x - 3)} ${n(y - 0.6)} Q${n(x - 2.2)} ${n(y - 2.6)} ${n(x - 0.6)} ${n(y - 0.6)} Z" fill="#D9A55A"/><path d="M${n(x - 0.8)} ${n(y - 0.6)} Q${n(x + 0.2)} ${n(y - 2.2)} ${n(x + 1.2)} ${n(y - 0.6)} Z" fill="#C98E46"/>` +
  [
    [1.9, -1.1],
    [2.9, -0.9],
    [2.4, -1.9]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.6" ry="0.42" fill="#7A2E14"/>`)
    .join("");

/** A dry hollow in the ground, its middle at (x, y): cracked, and no water in it. */
const dryHollow = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="2" fill="#CDB07A"/>` +
  `<path d="M${n(x - 4)} ${n(y - 0.4)} l1.4 0.6 l1.2 -0.8 l1.6 0.7 M${n(x + 0.6)} ${n(y + 0.6)} l1.2 -0.6 l1.4 0.5 l1.2 -0.6" stroke="#A88A56" stroke-width="0.4" fill="none"/>`;

/** Wavy lines of heat over a stretch from x1 to x2 at y. */
const heat = (x1: number, x2: number, y: number) =>
  [0, 1, 2]
    .map((i) => {
      const yy = n(y + i * 2);
      let d = `M${n(x1 + i * 2)} ${yy}`;
      for (let x = x1 + i * 2; x < x2 - 3; x += 6) d += ` q1.5 -1 3 0 q1.5 1 3 0`;
      return `<path d="${d}" stroke="#E6B56A" stroke-width="0.5" fill="none" opacity="0.8"/>`;
    })
    .join("");

// The water-skins. Imran ibn Husayn said: we were with the Prophet ﷺ on a journey, and we had grown very thirsty. As we
// went on, we came upon a woman sitting between two water-skins, her legs hanging down. We said: where is the water?
// She said: there is no water. We said: how far is it between your people and the water? She said: a day and a night.
// We brought her to the Prophet ﷺ; he had her two water-skins brought and wiped their mouths, and forty of us drank,
// thirsty, until we had our fill. We filled every water-skin and vessel we had, and her water-skins were all but
// bursting from fullness. He said: bring what you have, and bread and dates were gathered for her. She went to her
// people, and Allah guided them through her: she accepted Islam, and they accepted Islam (Sahih al-Bukhari 3571). No one
// is drawn, and no one is drawn on a camel: forty small places stand in rows under a hot sun, heat over them, and his
// place is a golden ring before them. A camel comes with two big water-skins on its side, her place beside it. A voice
// asks from the rows, and her voice answers: a grey ring comes about a dry hollow. A way goes far off to water, with a
// day and a night on it. The camel goes to his place, and a soft light comes at the mouths of the water-skins. A blue
// way goes from them to the rows, and the forty places fill with water row by row. Small water-skins and vessels fill
// one by one, and her water-skins swell, all but bursting. Bread and dates go to her place; her camel and her place go
// to her people's tents, and a warm glow comes over them.
function waterSkins(): SignArt {
  const s = 0.22;
  const [hx, hy] = [128, 103];
  const at = 70;
  const mouths = MOUTHS.map(([mx, my]) => onCamel(at, hy, s, true, mx, my));
  const gear: [number, number, boolean][] = [
    [8, 108.6, true],
    [15, 108.6, true],
    [22, 108.6, true],
    [29, 108.6, false],
    [35.6, 108.6, false]
  ];
  const draw = (x: number, y: number, skin: boolean, full: boolean) => (skin ? smallSkin(x, y, full) : vessel(x, y, full));
  return {
    kind: "water-skins",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#F4E2B6", "#F8ECCF", 62) },
      { name: "the sun", svg: sun(84, 18) + glow(84, 18, 16, "#FFE7A0", 0.08), loop: { move: "twinkle", ms: 2200, low: 0.8 } },
      { name: "hills", svg: hills("#D2B98E") },
      {
        name: "the land",
        svg: landOf(
          [
            [60, 72],
            [100, 70],
            [132, 76],
            [64, 116],
            [116, 116]
          ],
          "#E8CF9A"
        )
      },
      { name: "the tents of her tribe", svg: tent(112, 90, 14, 10, "#E4D4B2") + tent(125, 89, 11, 8.4, "#D9C7A2") },
      { name: "a dry hollow", svg: dryHollow(92, 108) },
      { name: "heat over the thirsty places", svg: heat(4, 44, 76.6), keys: track({ opacity: [[0.56, 1], [0.58, 0]] }), loop: { move: "twinkle", ms: 1600, low: 0.4 } },
      { name: "forty thirsty places", svg: FORTY.flat().map(([x, y]) => smallPlace(x, y)).join("") },
      ...FORTY.map(
        (row, i): SignPart => ({
          name: `drank their fill: row ${i + 1}`,
          svg: row.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.8" fill="#6FA8DC"/>`).join(""),
          keys: showAt(at3(0.56 + i * 0.015), at3(0.57 + i * 0.015))
        })
      ),
      { name: "water-skins and vessels, empty", svg: gear.map(([x, y, skin]) => draw(x, y, skin, false)).join("") },
      ...gear.map(
        ([x, y, skin], i): SignPart => ({
          name: `filled ${i + 1}`,
          svg: draw(x, y, skin, true),
          keys: showAt(at3(0.69 + i * 0.01), at3(0.697 + i * 0.01))
        })
      ),
      { name: "a golden ring, his place", svg: ring(52, 100, 2.4, GOLD) },
      {
        name: "her camel, with two water-skins",
        svg: camelWith(hx, hy, s, true, skins()),
        keys: track({
          xy: [
            [0.03, 48, 0],
            [0.09, 0, 0],
            [0.42, 0, 0],
            [0.46, at - hx, 0]
          ],
          opacity: [
            [0.86, 1],
            [0.87, 0]
          ]
        })
      },
      {
        name: "her place",
        svg: someone(140, 107),
        keys: track({
          xy: [
            [0.03, 48, 0],
            [0.09, 0, 0],
            [0.42, 0, 0],
            [0.46, -58, 0],
            [0.87, -58, 0],
            [0.92, -28, -6.6]
          ]
        })
      },
      {
        name: "the travellers' voice, asking",
        svg: arcs(45, 92, VOICE),
        keys: track({
          opacity: [
            [0.15, 0],
            [0.16, 1],
            [0.19, 1],
            [0.2, 0],
            [0.29, 0],
            [0.3, 1],
            [0.42, 1],
            [0.43, 0]
          ]
        }),
        loop: speaking
      },
      {
        name: "her voice, answering",
        svg: arcsLeft(136.6, 102.6, VOICE),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.2, 1],
            [0.29, 1],
            [0.3, 0],
            [0.31, 0],
            [0.32, 1],
            [0.42, 1],
            [0.43, 0]
          ]
        }),
        loop: speaking
      },
      { name: "there is no water: a grey ring about the dry hollow", svg: greyRing(92, 108, 8.6, 3), keys: showFor(0.2, 0.22, 0.42, 0.44) },
      { name: "the way to water, far off", svg: way("M141.6 103.6 Q157 88 151.6 68.8", "#FFF6DC", 1), keys: showFor(0.31, 0.33, 0.42, 0.44) },
      { name: "water, far off", svg: `<ellipse cx="151" cy="66.4" rx="6" ry="1.5" fill="#7FB6E0"/>`, keys: showFor(0.31, 0.33, 0.42, 0.44) },
      { name: "a day on the way", svg: dayDisc(154.6, 91.4), keys: showFor(0.33, 0.34, 0.42, 0.44) },
      { name: "a night on the way", svg: nightDisc(155.6, 79.6), keys: showFor(0.34, 0.35, 0.42, 0.44) },
      ...mouths.map(
        ([x, y], i): SignPart => ({
          name: `the spout of a water-skin, wiped: a soft light ${i + 1}`,
          svg: glow(x, y, 3.2, WARM, 0.32) + sparkle(x, y, 0.9, "#FFF3CF"),
          keys: showFor(0.46, 0.48, 0.86, 0.87),
          loop: soft
        })
      ),
      { name: "water for the thirsty: a blue way to the rows", svg: way("M64 99 Q52 92 42.6 93", "#6FA8DC", 1), keys: showFor(0.55, 0.56, 0.62, 0.63), loop: speaking },
      { name: "her water-skins, all but bursting", svg: onlyOnCamel(at, hy, s, true, skins(true)), keys: showFor(0.74, 0.76, 0.86, 0.87) },
      {
        name: "her camel, going back to her tribe",
        svg: camelWith(at, hy, s, false, skins(true)),
        keys: track({
          xy: [
            [0.87, 0, 0],
            [0.92, 26, -6]
          ],
          opacity: [
            [0.86, 0],
            [0.87, 1]
          ]
        })
      },
      {
        name: "bread and dates, gathered for her",
        svg: breadAndDates(46, 104),
        keys: track({
          xy: [
            [0.83, 0, 0],
            [0.86, 34, 0],
            [0.87, 34, 0],
            [0.92, 64, -6.4]
          ],
          opacity: [
            [0.82, 0],
            [0.83, 1]
          ]
        })
      },
      { name: "she accepted Islam: a soft golden ring about her place", svg: ring(112, 100.4, 3.4, SOFT_GOLD), keys: showAt(0.92, 0.94), loop: soft },
      { name: "and they accepted Islam: a warm glow over the tents", svg: wash(118, 86, 17, 9, WARM, 0.16), keys: showAt(0.92, 0.94), loop: soft }
    ],
    words: [
      { text: "We had grown very thirsty", from: 0.02, to: 0.13 },
      { text: "Where is the water? There is no water", from: 0.15, to: 0.27 },
      { text: "How far to the water? A day and a night", from: 0.29, to: 0.4 },
      { text: "He wiped the mouths of the water-skins", from: 0.42, to: 0.53 },
      { text: "Forty of us drank until we had our fill", from: 0.55, to: 0.67 },
      { text: "We filled every water-skin and vessel", from: 0.69, to: 0.8 },
      { text: "She accepted Islam, and so did they", from: 0.82, to: 1 }
    ]
  };
}

/** A camel lying down by a camp at night, as camels kneel at a stop: its belly's middle at (x, y), facing right, `s` times its size. */
const restingCamel = (x: number, y: number, s = 1) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  const [main, far] = ["#8E6E46", "#76583A"];
  return (
    `<ellipse cx="${n(x - 5 * s)}" cy="${n(y - 0.9 * s)}" rx="${n(2.6 * s)}" ry="${n(1.1 * s)}" fill="${far}"/>` +
    `<ellipse cx="${n(x + 5.4 * s)}" cy="${n(y - 0.9 * s)}" rx="${n(2.6 * s)}" ry="${n(1.1 * s)}" fill="${far}"/>` +
    `<ellipse cx="${x}" cy="${n(y - 4.2 * s)}" rx="${n(9.2 * s)}" ry="${n(3.9 * s)}" fill="${main}"/>` +
    `<path d="M${p(-5.6, -6.6)} Q${p(-1.4, -12.6)} ${p(3, -6.8)} Z" fill="${main}"/>` +
    `<path d="M${p(6.6, -6)} Q${p(10.8, -8.4)} ${p(11.2, -13.2)} L${p(13.6, -13.4)} Q${p(13.4, -7.6)} ${p(8.8, -3.2)} Z" fill="${main}"/>` +
    `<ellipse cx="${n(x + 13.8 * s)}" cy="${n(y - 13.9 * s)}" rx="${n(2.9 * s)}" ry="${n(1.6 * s)}" fill="${main}"/>` +
    `<circle cx="${n(x + 14.2 * s)}" cy="${n(y - 14.4 * s)}" r="${n(0.4 * s)}" fill="#1E1E1E"/>`
  );
};

/** A small lamp at (x, y), its light soft about it. */
const lampAt = (x: number, y: number) =>
  glow(x, n(y - 2.6), 9, "#FFD866", 0.16) +
  `<path d="M${n(x - 2.4)} ${y} C${n(x - 2.4)} ${n(y - 1.8)} ${n(x + 2.4)} ${n(y - 1.8)} ${n(x + 2.4)} ${y} Z" fill="#B86E3E"/>` +
  `<ellipse cx="${n(x + 1.6)}" cy="${n(y - 2.4)}" rx="0.7" ry="1.1" fill="#FFE07A"/>`;

/** The dark of the road ahead, deepening from x1 to x2 over the land. */
const darkAhead = (x1: number, x2: number) =>
  Array.from({ length: 12 }, (_, i) => {
    const x = n(x1 + ((x2 - x1) * i) / 12);
    return `<rect x="${x}" y="62" width="${n(x2 - x)}" height="50" fill="#05091A" opacity="0.045"/>`;
  }).join("");

/** The camels' coat at night: their near and far sides darker. */
const NIGHT_COAT: [string, string] = ["#A9844E", "#8A6A3C"];

// No rider alone by night. Ibn Umar said that the Prophet ﷺ said: if people knew what I know of being alone, no rider
// would travel by night alone (Sahih al-Bukhari 2998). No one is drawn, and no one is drawn on the camel: at night, by a
// camp of tents with a small lamp, camels lie down and places sit by the lamp. A camel with a saddle cloth sets out
// alone along the road into the dark, a grey dashed ring about it, and the dark ahead deepens. Then it turns back and
// comes to the camp, and a soft golden ring comes about the camp, all of them together.
function aloneAtNight(): SignArt {
  const s = 0.19;
  const out: [number, number] = [44, -3];
  return {
    kind: "alone-at-night",
    ms: 8000,
    parts: [
      { name: "night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [12, 14],
          [30, 30],
          [48, 12],
          [66, 24],
          [84, 10],
          [98, 34],
          [112, 16],
          [146, 30],
          [154, 12],
          [22, 48],
          [76, 46],
          [140, 50]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the moon",
        svg: `${glow(128, 20, 9, "#FFF3C4", 0.08)}<path d="M128 14.6 A5.4 5.4 0 1 0 128 25.4 A4.2 5.4 0 1 1 128 14.6 Z" fill="#FFF3C4"/>`
      },
      { name: "dark hills", svg: hills("#2B3358") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [60, 74],
          [104, 72],
          [140, 78],
          [70, 116]
        ])
      },
      { name: "the road into the dark", svg: `<path d="M46 101 Q100 97 160 93 L160 99 Q100 104 46 107.6 Z" fill="#3D4568"/>` },
      { name: "the dark ahead", svg: darkAhead(96, 160), keys: showAt(0.3, 0.38) },
      { name: "tents of the camp", svg: tent(14, 96, 18, 13, "#8E8268") + tent(34, 98, 16, 11, "#80765F") },
      { name: "camels lying by the camp", svg: restingCamel(7, 108.6, 0.6) + restingCamel(43, 108.8, 0.56) },
      { name: "a lamp at the camp", svg: lampAt(26, 103.4), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "places by the lamp", svg: someone(20.4, 104.4, 1.4, LIGHT) + someone(31.6, 105, 1.4, LIGHT) },
      {
        name: "a camel setting out alone",
        svg: saddled(60, 103, s, false, NIGHT_COAT),
        keys: track({
          xy: [
            [0.06, 0, 0],
            [0.3, out[0], out[1]]
          ],
          opacity: [
            [0.5, 1],
            [0.51, 0]
          ]
        }),
        loop: { move: "bob", ms: 1600, y: -0.3 }
      },
      {
        name: "alone: a grey dashed ring about it",
        svg: greyRing(60, 98, 13, 9),
        keys: track({
          xy: [
            [0.06, 0, 0],
            [0.3, out[0], out[1]],
            [0.51, out[0], out[1]],
            [0.69, 0, 0]
          ],
          opacity: [
            [0.08, 0],
            [0.1, 1],
            [0.69, 1],
            [0.71, 0]
          ]
        })
      },
      {
        name: "the camel turning back",
        svg: saddled(60 + out[0], 103 + out[1], s, true, NIGHT_COAT),
        keys: track({
          xy: [
            [0.51, 0, 0],
            [0.69, -out[0], -out[1]]
          ],
          opacity: [
            [0.5, 0],
            [0.51, 1]
          ]
        }),
        loop: { move: "bob", ms: 1600, y: -0.3 }
      },
      { name: "together: a soft golden ring about the camp", svg: care(32, 102, 30, 7, SOFT_GOLD), keys: showAt(0.71, 0.75), loop: soft }
    ],
    words: [
      { text: "If people knew what I know of being alone", from: 0.02, to: 0.46 },
      { text: "No rider would travel by night alone", from: 0.48, to: 1 }
    ]
  };
}

/** A call going out from (x, y): arcs rising, wide; `short`: the iqamah, nearer and quicker. */
const call = (x: number, y: number, short = false) =>
  (short ? [0, 1] : [0, 1, 2])
    .map((i) => {
      const r = (short ? 2.4 : 3) + i * (short ? 1.6 : 2.6);
      return `<path d="M${n(x - r)} ${n(y - i * 0.4)} A${r} ${n(r * 0.7)} 0 0 1 ${n(x + r)} ${n(y - i * 0.4)}" stroke="${short ? "#FFFFFF" : "#FFF6DC"}" stroke-width="${short ? 0.8 : 0.9}" fill="none" stroke-linecap="round"/>`;
    })
    .join("");

// Two setting out. Malik ibn al-Huwairith said: two men came to the Prophet ﷺ, intending a journey. The Prophet ﷺ said:
// when you two set out, give the adhan, then the iqamah, and let the older of you lead you (Sahih al-Bukhari 630). No
// one is drawn, and no one is drawn on a camel: by his home in Madinah his place is a golden ring, and two camels stand
// ready for the road. Two places come from the camels to his place, and his voice speaks. They set out with the
// camels, and the sun climbs to the middle of the sky, with a dashed ring about it: a prayer's time. A call goes out
// from where they stopped: the adhan; then a shorter call: the iqamah. Two prayer mats show and the two places go onto
// them. A soft golden ring comes about the older one's place, leading, and a spark rises from each place.
function travellersAdhan(): SignArt {
  const s = 0.19;
  const camels: [number, number][] = [
    [98, 102],
    [112, 104]
  ];
  const places: [number, number][] = [
    [86, 106],
    [92, 107.6]
  ];
  const mats: [number, number][] = [
    [96, 99.4],
    [100, 105.6]
  ];
  const go = 30;
  const toHim = -54;
  const toMat = (i: number): [number, number] => [n(mats[i][0] + 1 - places[i][0]), n(mats[i][1] - places[i][1])];
  return {
    kind: "travellers-adhan",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun",
        svg: sun(24, 44),
        keys: track({
          xy: [
            [0.23, 0, 0],
            [0.3, 56, -26]
          ]
        })
      },
      { name: "the time of a prayer: a dashed ring about the sun", svg: `<circle cx="80" cy="18" r="6.4" stroke="${GOLD}" stroke-width="0.7" stroke-dasharray="1.6 1.3" fill="#FFFFFF" fill-opacity="0.18"/>`, keys: showAt(0.3, 0.32) },
      { name: "clouds", svg: cloud(54, 30, 0.55, "#FFFFFF", 0.9) + cloud(122, 22, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the road out", svg: road(30, 160, 103.4) },
      ...palms([
        [8, 86, 13],
        [44, 84, 12]
      ]),
      { name: "his home", svg: home(24, 92, 18, 13) },
      { name: "a golden ring, his place", svg: ring(24, 100.6, 2.4, GOLD) },
      ...camels.map(
        ([x, y], i): SignPart => ({
          name: `a camel for the journey ${i + 1}`,
          svg: saddled(x, y, s),
          keys: track({
            xy: [
              [0.27, 0, 0],
              [0.33, go, 0]
            ]
          }),
          loop: { move: "bob", ms: 2400 + i * 300, y: -0.25 }
        })
      ),
      { name: "prayer mats on the ground", svg: mats.map(([x, y]) => prayerMat(x, y)).join(""), keys: showAt(0.48, 0.5) },
      ...places.map(
        ([x, y], i): SignPart => ({
          name: i === 0 ? "the older one's place" : "the younger one's place",
          svg: someone(x, y),
          keys: track({
            xy: [
              [0.04, 0, 0],
              [0.11, toHim, 0],
              [0.24, toHim, 0],
              [0.32, 6 + i * 4, -2],
              [0.5, 6 + i * 4, -2],
              [0.54, ...toMat(i)]
            ]
          })
        })
      ),
      { name: "his voice: when you two set out", svg: arcs(27.4, 96, VOICE), keys: showFor(0.22, 0.23, 0.33, 0.34), loop: speaking },
      { name: "the adhan: its call going out", svg: call(98, 96), keys: showFor(0.34, 0.36, 0.46, 0.47), loop: speaking },
      { name: "the iqamah: a shorter call", svg: call(98, 98, true), keys: showFor(0.47, 0.48, 0.62, 0.63), loop: speaking },
      { name: "the older one leads: a soft golden ring about the place", svg: ring(mats[0][0] + 1, mats[0][1], 3.4, SOFT_GOLD), keys: showAt(0.63, 0.66), loop: soft },
      spark("a spark of prayer, rising 1", mats[0][0] + 1, mats[0][1] - 2, 0.68, 0.74),
      spark("a spark of prayer, rising 2", mats[1][0] + 1, mats[1][1] - 2, 0.7, 0.76),
      { name: "together in prayer: a warm glow about the two", svg: wash(99, 102, 16, 7, WARM, 0.14), keys: showAt(0.78, 0.82), loop: soft }
    ],
    words: [
      { text: "Two came to him, intending a journey", from: 0.02, to: 0.2 },
      { text: "When you two set out, give the adhan", from: 0.22, to: 0.44 },
      { text: "Then the iqamah", from: 0.46, to: 0.6 },
      { text: "Then let the older of you lead you", from: 0.62, to: 1 }
    ]
  };
}

/** A day of the week, a small dim circle at (x, y). */
const weekDay = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#FFFFFF" fill-opacity="0.35" stroke="#9CC4E4" stroke-width="0.5"/>`;

/** A day gone by, its light come on: a soft yellow in its circle at (x, y). */
const dayLit = (x: number, y: number, fill = "#FFF0B8") => `<circle cx="${x}" cy="${y}" r="2.6" fill="${fill}"/>`;

// Setting out on a Thursday. Ka'b ibn Malik used to say: seldom did the Messenger of Allah ﷺ set out on a journey on
// any day other than Thursday (Sahih al-Bukhari 2949). No one is drawn, and no one is drawn on a camel: the seven days
// of the week are small circles in the sky, and his place is a golden ring by his home, two camels with saddle cloths
// beside it. Ka'b's place speaks. The days light up one by one, Sunday to Wednesday, and the camels wait. Thursday, the
// fifth, lights golden, with a golden ring about it: a way shows, and his place and the camels set out along it. Then
// Friday and Saturday light up.
function setOutOnThursday(): SignArt {
  const s = 0.19;
  const days = [0, 1, 2, 3, 4, 5, 6].map((i): [number, number] => [34 + i * 16, 26]);
  const camels: [number, number][] = [
    [54, 102],
    [68, 104]
  ];
  return {
    kind: "set-out-on-thursday",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "clouds", svg: cloud(60, 46, 0.5, "#FFFFFF", 0.85) + cloud(130, 44, 0.45, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [10, 86, 13],
        [46, 84, 12]
      ]),
      { name: "his home", svg: home(30, 92, 18, 13) },
      { name: "the days of the week", svg: days.map(([x, y]) => weekDay(x, y)).join("") },
      ...days.slice(0, 4).map(
        ([x, y], i): SignPart => ({
          name: `a day gone by ${i + 1}`,
          svg: dayLit(x, y),
          keys: showAt(at3(0.25 + i * 0.05), at3(0.27 + i * 0.05))
        })
      ),
      { name: "Thursday: the fifth day, lit golden", svg: glow(days[4][0], days[4][1], 6, "#FFE7A0", 0.2) + dayLit(days[4][0], days[4][1], "#FFD84A"), keys: showAt(0.55, 0.57) },
      { name: "Thursday: a golden ring about it", svg: `<circle cx="${days[4][0]}" cy="${days[4][1]}" r="5" stroke="${GOLD}" stroke-width="0.9" fill="none"/>`, keys: showAt(0.56, 0.58), loop: soft },
      ...days.slice(5).map(
        ([x, y], i): SignPart => ({
          name: `a day after it ${i + 1}`,
          svg: dayLit(x, y),
          keys: showAt(at3(0.86 + i * 0.04), at3(0.88 + i * 0.04))
        })
      ),
      { name: "the way of the journey", svg: way("M36 106 L158 106"), keys: showAt(0.57, 0.59) },
      {
        name: "a golden ring, his place",
        svg: ring(30, 100.6, 2.4, GOLD),
        keys: track({
          xy: [
            [0.6, 0, 0],
            [0.8, 72, 5.4]
          ]
        })
      },
      ...camels.map(
        ([x, y], i): SignPart => ({
          name: `a camel of the journey ${i + 1}`,
          svg: saddled(x, y, s),
          keys: track({
            xy: [
              [0.6, 0, 0],
              [0.8, 72, 0]
            ]
          }),
          loop: { move: "bob", ms: 1800 + i * 240, y: -0.3, phase: i / 2 }
        })
      ),
      { name: "Ka'b's place", svg: someone(10, 106) },
      { name: "Ka'b's voice", svg: arcs(13, 102, VOICE), keys: showFor(0.03, 0.05, 0.22, 0.24), loop: speaking }
    ],
    words: [
      { text: "Ka'b ibn Malik used to say", from: 0.02, to: 0.2 },
      { text: "Seldom did he set out on a journey", from: 0.22, to: 0.52 },
      { text: "On a day other than Thursday", from: 0.54, to: 1 }
    ]
  };
}

/** A young camel: the camel of the picture cards in a paler coat, with a small cloth on its back. */
const youngCamel = (x: number, y: number, s: number) =>
  camelWith(x, y, s, false, `<path d="M31 32 L54 32 L56 39 L29 39 Z" fill="#3E7FB0"/><path d="M30 35.6 L55 35.6" stroke="#E8F1F8" stroke-width="1.8"/>`, ["#EBC58A", "#D2A766"]);

// The camel is yours. Ibn Umar said: we were with the Prophet ﷺ on a journey, and I was on a young camel that was hard
// to handle. The Prophet ﷺ said to Umar: sell it to me. So he bought it, and the Prophet ﷺ said: it is yours, O
// Abdullah (Sahih al-Bukhari 2611). No one is drawn, and no one is drawn on a camel: on the road, camels with saddle
// cloths go along with his place, a golden ring, and Umar's place, and a young camel tosses its head among them. It
// starts and turns, ahead and back, and a grey dashed ring comes about it: hard to handle. His voice speaks toward
// Umar's place. A golden line goes from his place to the young camel, with a soft ring about it: bought. His voice
// speaks again, the golden line goes, and a warm glow comes about the young camel: given.
function camelIsYours(): SignArt {
  const s = 0.19;
  const ys = 0.16;
  const go = 30;
  const young: [number, number] = [64, 103];
  const at = young[0] + go;
  const hump = onCamel(at, young[1], ys, false, 44, 20);
  const along = track({
    xy: [
      [0.03, 0, 0],
      [0.12, go, 0]
    ]
  });
  return {
    kind: "camel-is-yours",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "clouds", svg: cloud(40, 24, 0.55, "#FFFFFF", 0.9) + cloud(96, 16, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the road", svg: road(0, 160, 104) },
      { name: "a camel of the company 1", svg: saddled(14, 102, s), keys: along, loop: { move: "bob", ms: 1800, y: -0.3 } },
      { name: "a camel of the company 2", svg: saddled(98, 101.6, s), keys: along, loop: { move: "bob", ms: 2000, y: -0.3, phase: 0.5 } },
      { name: "a golden ring, his place", svg: ring(30, 107.6, 2.4, GOLD), keys: along },
      { name: "Umar's place", svg: someone(48, 107.4), keys: along },
      {
        name: "a young camel, hard to handle",
        svg: youngCamel(young[0], young[1], ys),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.12, go, 0],
            [0.21, go, 0],
            [0.24, go + 7, 0],
            [0.27, go - 3, 0],
            [0.3, go + 6, 0],
            [0.33, go, 0]
          ]
        }),
        origin: { x: young[0], y: young[1] },
        loop: { move: "bob", ms: 560, y: -0.8, rotate: 4 }
      },
      { name: "hard to handle: a grey dashed ring about it", svg: greyRing(at, 98, 13, 8), keys: showFor(0.22, 0.24, 0.62, 0.64) },
      { name: "his voice: sell it to me", svg: arcs(63.4, 103.4, VOICE), keys: showFor(0.42, 0.43, 0.62, 0.63), loop: speaking },
      { name: "bought: a golden line from his place to the young camel", svg: way(`M61.6 105.8 Q74 92 ${n(hump[0] - 1.2)} ${n(hump[1] + 0.4)}`, GOLD, 0.9), keys: showFor(0.62, 0.64, 0.78, 0.8) },
      { name: "bought: a soft ring about the young camel", svg: care(at, 99, 11, 6.4, SOFT_GOLD), keys: showFor(0.64, 0.66, 0.8, 0.82), loop: soft },
      { name: "his voice: it is yours, O Abdullah", svg: arcs(63.4, 103.4, VOICE), keys: showAt(0.78, 0.79), loop: speaking },
      { name: "given: a warm glow about the young camel", svg: wash(at, 97, 13, 9, WARM, 0.16), keys: showAt(0.82, 0.85), loop: soft }
    ],
    words: [
      { text: "We were with him on a journey", from: 0.02, to: 0.18 },
      { text: "I was on a young camel, hard to handle", from: 0.2, to: 0.4 },
      { text: "He said to Umar: sell it to me", from: 0.42, to: 0.6 },
      { text: "So he bought it", from: 0.62, to: 0.76 },
      { text: "It is yours, O Abdullah", from: 0.78, to: 1 }
    ]
  };
}

/** A rocky mount, its foot from x1 to x2 at y, its top at (top, peak). */
const mount = (x1: number, x2: number, y: number, top: number, peak: number) =>
  `<path d="M${x1} ${y} Q${n(x1 + (top - x1) * 0.4)} ${n(peak + 10)} ${top} ${peak} Q${n(top + (x2 - top) * 0.6)} ${n(peak + 8)} ${x2} ${y} Z" fill="#B49A72"/>` +
  `<path d="M${n(top - 2)} ${n(peak + 1.6)} Q${n(top + 6)} ${n(peak + 8)} ${n(top + 4)} ${n(y - 8)}" stroke="#9A8060" stroke-width="0.6" fill="none"/>` +
  [
    [-12, 14, 2.2],
    [10, 12, 1.8],
    [2, 20, 2.6],
    [-20, 22, 1.6],
    [18, 22, 2]
  ]
    .map(([dx, dy, r]) => `<ellipse cx="${n(top + dx)}" cy="${n(peak + dy)}" rx="${r}" ry="${n(r * 0.66)}" fill="#9C8664"/>`)
    .join("");

/** Places of those standing at Arafah, groups of small dashed circles. */
const STANDING: [number, number][][] = [
  [
    [98, 98],
    [102, 100.4],
    [96, 103],
    [101, 105.6],
    [106, 103.4],
    [94, 107.4],
    [99.6, 107.6]
  ],
  [
    [124, 98.6],
    [129, 101],
    [134, 99],
    [126, 104.4],
    [132, 106],
    [138, 103.4],
    [128, 107.6]
  ],
  [
    [144, 99],
    [149, 101.6],
    [154, 99.4],
    [146, 106],
    [152, 107],
    [157, 104],
    [142, 107.6]
  ]
];

// A lost camel on the day of Arafah. Jubair ibn Mut'im said: I lost a camel of mine, and I went looking for it on the
// day of Arafah. I saw the Prophet ﷺ standing at Arafah, and I said: by Allah, this one is of the Hums; what is he
// doing here? (Sahih al-Bukhari 1664). No one is drawn: on a hot day, the mount of Arafah rises over its plain, and
// places stand on the plain in groups; his place is a golden ring among them. Jubair's camel wanders off and is lost
// far away, and a grey dashed ring comes where it was. Jubair's place goes looking along a dashed way to the edge of the
// plain. A faint golden line goes from it to the golden ring, and a soft ring comes about his place: standing at
// Arafah. Jubair's voice wonders, and a soft dashed ring comes about the plain: here.
function searchAtArafah(): SignArt {
  const s = 0.19;
  const lost: [number, number] = [30, 103];
  const seeker: [number, number] = [14, 105];
  const his: [number, number] = [116, 101.6];
  return {
    kind: "search-at-arafah",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E4F2FB", 62) },
      { name: "the sun", svg: sun(56, 16) },
      { name: "clouds", svg: cloud(110, 24, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the mount of Arafah", svg: mount(104, 160, 96, 132, 64) },
      { name: "the plain of Arafah", svg: `<path d="M72 102 Q76 93 104 92.6 Q136 92 160 93.4 L160 112.6 Q122 114.4 88 112 Q72 110 72 102 Z" fill="#E9D7A6"/>` },
      ...STANDING.map((group, i): SignPart => ({ name: `places standing at Arafah ${i + 1}`, svg: group.map(([x, y]) => someone(x, y, 1.3)).join("") })),
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "Jubair's camel, wandering off",
        svg: camelWith(lost[0], lost[1], s, false, ""),
        origin: { x: lost[0], y: lost[1] },
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.12, 44, -26]
          ],
          scale: [
            [0.04, 1],
            [0.12, 0.5]
          ],
          opacity: [
            [0.09, 1],
            [0.12, 0]
          ]
        }),
        loop: { move: "bob", ms: 1400, y: -0.3 }
      },
      { name: "lost: a grey dashed ring where it was", svg: greyRing(lost[0], 101, 10, 4), keys: showFor(0.11, 0.13, 0.2, 0.22) },
      { name: "Jubair's search: a dashed way", svg: way(`M${seeker[0] + 2} ${seeker[1]} Q50 110 84 104.6`), keys: showAt(0.21, 0.23) },
      {
        name: "Jubair's place",
        svg: someone(seeker[0], seeker[1]),
        keys: track({
          xy: [
            [0.22, 0, 0],
            [0.28, 34, 2],
            [0.34, 70, -0.4]
          ]
        })
      },
      { name: "Jubair sees: a faint golden line to the golden ring", svg: lookLine(86, 104, his[0] - 2.6, his[1] - 0.4, 94), keys: showAt(0.43, 0.45) },
      { name: "standing at Arafah: a soft ring about his place", svg: ring(his[0], his[1], 4.2, SOFT_GOLD), keys: showAt(0.45, 0.48), loop: soft },
      { name: "Jubair's voice, wondering", svg: arcs(87.6, 100.4, VOICE), keys: showAt(0.64, 0.65), loop: speaking },
      { name: "here: a soft dashed ring about the plain of Arafah", svg: care(124, 101, 36, 8, SOFT_GOLD), keys: showAt(0.83, 0.86), loop: soft }
    ],
    words: [
      { text: "I lost a camel of mine", from: 0.02, to: 0.18 },
      { text: "I looked for it on the day of Arafah", from: 0.2, to: 0.4 },
      { text: "I saw him standing at Arafah", from: 0.42, to: 0.62 },
      { text: "By Allah, this one is of the Hums", from: 0.64, to: 0.8 },
      { text: "What is he doing here?", from: 0.82, to: 1 }
    ]
  };
}

export const ROAD_ART = {
  "tired-camel": tiredCamel,
  "water-skins": waterSkins,
  "alone-at-night": aloneAtNight,
  "travellers-adhan": travellersAdhan,
  "set-out-on-thursday": setOutOnThursday,
  "camel-is-yours": camelIsYours,
  "search-at-arafah": searchAtArafah
};
