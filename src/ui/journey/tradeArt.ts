import { cloud, dateBunch, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, ring, sack, showWhile, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { GREY } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, jug, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";

/**
 * Trade and the market in his ﷺ teaching: Abdur-Rahman ibn Awf asking for the market; food bought to be paid later,
 * with his iron armour pledged; a bundle of firewood, better than asking; the easygoing trader; fruit sold only once it
 * is clearly good; gold for gold only equal for equal; and the Ansar sharing the fruit of their palms. Only the land,
 * the sky, homes, stalls, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn,
 * not even a hand or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle
 * goes, and a voice is arcs in the air; what changes hands moves by itself. Nothing is drawn for Allah: mercy and
 * blessing are only a warm glow about a place, and nothing comes down from the sky.
 */

/** A soft golden ring: a place or a thing marked out. */
const SOFT_GOLD = "#E8C25A";
const GOLD_COIN = "#E9B949";
const GOLD_EDGE = "#B8862A";
const SILVER_COIN = "#DDE2E8";
const SILVER_EDGE = "#98A2AD";

/** A line drawn as a ring about (x, y), `rx` across and `ry` high. */
const oval = (x: number, y: number, rx: number, ry: number, color: string, width = 0.8) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${color}" stroke-width="${width}" fill="none"/>`;

/** A stack of `count` coins, the lowest one's middle at (x, y); `big`: larger, set apart, to be counted on a balance. */
export const coins = (x: number, y: number, count: number, fill = GOLD_COIN, edge = GOLD_EDGE, big = false) =>
  Array.from(
    { length: count },
    (_, i) => `<ellipse cx="${x}" cy="${n(y - i * (big ? 1.5 : 1.1))}" rx="${big ? 2.7 : 2.2}" ry="${big ? 1 : 0.85}" fill="${fill}" stroke="${edge}" stroke-width="0.35"/>`
  ).join("");

/** A clay jar, its foot's middle at (x, y), `s` times its size (8 high). */
export const jar = (x: number, y: number, s = 1, fill = "#B66A3C") => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-2.2, 0)} C${p(-3.6, -3)} ${p(-3.4, -5.8)} ${p(-1.6, -6.8)} L${p(-1.4, -8)} L${p(1.4, -8)} L${p(1.6, -6.8)} C${p(3.4, -5.8)} ${p(3.6, -3)} ${p(2.2, 0)} Z" fill="${fill}"/>` +
    `<path d="M${p(-1.8, -8)} L${p(1.8, -8)}" stroke="#8C4E2A" stroke-width="${n(0.8 * s)}" stroke-linecap="round"/>`
  );
};

/** A market stall, its middle at x and `w` wide: a striped awning from y `top`, and its counter's top at y `counter`. */
export const stall = (x: number, w: number, color: string, top = 66, counter = 84) => {
  const l = n(x - w / 2);
  const cols = Math.max(4, Math.round(w / 3));
  const sw = w / cols;
  let awning = "";
  for (let i = 0; i < cols; i += 1) {
    const sx = n(l + i * sw);
    const fill = i % 2 ? "#FFF3D6" : color;
    awning += `<rect x="${sx}" y="${n(top + 1.2)}" width="${n(sw + 0.05)}" height="4.4" fill="${fill}"/><path d="M${sx} ${n(top + 5.6)} A${n(sw / 2)} ${n(sw / 2)} 0 0 0 ${n(sx + sw)} ${n(top + 5.6)} Z" fill="${fill}"/>`;
  }
  return (
    `<rect x="${n(l + 1.5)}" y="${n(top + 5.6)}" width="${n(w - 3)}" height="${n(counter - top - 5.6)}" fill="#6B4A2E"/>` +
    `<rect x="${n(l + 0.4)}" y="${n(top + 1)}" width="1.4" height="${n(counter - top + 8)}" fill="#8A6440"/>` +
    `<rect x="${n(l + w - 1.8)}" y="${n(top + 1)}" width="1.4" height="${n(counter - top + 8)}" fill="#8A6440"/>` +
    awning +
    `<rect x="${n(l - 1)}" y="${top}" width="${n(w + 2)}" height="1.3" rx="0.5" fill="#8A6440"/>` +
    `<rect x="${n(l + 0.6)}" y="${n(counter + 1)}" width="${n(w - 1.2)}" height="7" fill="#A0703F"/>` +
    `<path d="M${n(l + 0.6)} ${n(counter + 4.4)} L${n(l + w - 0.6)} ${n(counter + 4.4)}" stroke="#8A6440" stroke-width="0.5"/>` +
    `<rect x="${l}" y="${counter}" width="${w}" height="1.4" rx="0.4" fill="#BC8A55"/>`
  );
};

// Show me the market. Anas said: when Abdur-Rahman ibn Awf came to Madinah, the Prophet ﷺ made him and Sa'd ibn
// ar-Rabi' al-Ansari brothers. Sa'd was a man of wealth and said: I will share my wealth with you in two halves. He
// said: may Allah bless you in your family and your wealth; show me the market. He did not come back until he had
// gained dried yogurt and butter (Sahih al-Bukhari 2049). In his own telling, Sa'd said: the market of Qaynuqa'; and he
// went to it in the morning and came back with dried yogurt and butter (Sahih al-Bukhari 2048). No one is drawn:
// Abdur-Rahman's place is a small dashed circle by a small home, Sa'd's by his larger home, and his place a golden ring
// between them. A golden line joins the two places; Sa'd's wealth parts in two halves, and one half goes toward
// Abdur-Rahman and then back; a warm glow comes over Sa'd's home. A way shows to the market, a soft ring comes about it,
// and Abdur-Rahman's place goes there and comes back to his home with butter and dried yogurt.
function showMeTheMarket(): SignArt {
  const toMarket = -46;
  const half = (x: number) => sack(x, 102.6, 1.1) + coins(n(x + 6), 102.6, 3);
  const butter = (x: number, y: number) => jar(x, y, 0.62, "#C98A4E") + `<ellipse cx="${x}" cy="${n(y - 5)}" rx="1" ry="0.4" fill="#F2C94C"/>`;
  const yogurt = (x: number, y: number) =>
    [
      [-1.6, 0],
      [1.4, 0.1],
      [0, -1.3]
    ]
      .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 0.9 + dy)}" rx="1.3" ry="0.95" fill="#F4EEDC" stroke="#D3C6A4" stroke-width="0.3"/>`)
      .join("");
  const wares = jar(9, 84, 0.7) + jar(14.4, 84, 0.6, "#C98A4E") + sack(22, 84, 0.8) + sack(37.6, 84, 0.8, "#D8BA7E") + jar(45, 84, 0.66) + jar(50.4, 84, 0.6, "#C98A4E");
  return {
    kind: "show-me-the-market",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(146, 20) },
      { name: "clouds", svg: cloud(62, 26, 0.6, "#FFFFFF", 0.9) + cloud(112, 18, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [62, 86, 14],
        [101, 83, 12],
        [150, 88, 13]
      ]),
      { name: "the market of Qaynuqa'", svg: stall(16, 24, "#D9534F") + stall(44, 22, "#3E7FB0") },
      { name: "wares in the market", svg: wares },
      { name: "Abdur-Rahman's home", svg: home(78, 92, 16, 12) },
      { name: "Sa'd's home", svg: home(136, 92, 28, 18, "#CFA66F", "#B88A58") },
      { name: "Sa'd's wealth: the half he keeps", svg: half(124) },
      {
        name: "Sa'd's wealth: the half he offers",
        svg: half(110),
        keys: track({
          xy: [
            [0.24, 0, 0],
            [0.29, -16, 0],
            [0.38, -16, 0],
            [0.42, 0, 0]
          ]
        })
      },
      {
        name: "in two halves: a line between them",
        svg: `<path d="M119.4 92.6 L119.4 103.6" stroke="${VOICE}" stroke-width="0.6" stroke-dasharray="1.2 1"/>`,
        keys: showWhile(0.21, 0.24, 0.41, 0.44)
      },
      { name: "a golden ring, his place", svg: ring(107, 106, 2.4, GOLD) },
      {
        name: "Abdur-Rahman's place",
        svg: someone(78, 100),
        keys: track({
          xy: [
            [0.83, 0, 0],
            [0.865, toMarket, 0],
            [0.877, toMarket, 0],
            [0.915, 0, 0]
          ]
        })
      },
      { name: "Sa'd's place", svg: someone(136, 100) },
      { name: "brotherhood: a golden line between the two places", svg: way("M80.4 97.4 Q107 84 133.6 97.4", GOLD, 0.9), keys: showFrom(0.05, 0.09) },
      { name: "brotherhood: a soft ring about Abdur-Rahman's place", svg: ring(78, 100, 3.4, SOFT_GOLD), keys: showWhile(0.08, 0.11, 0.82, 0.83), loop: soft },
      { name: "brotherhood: a soft ring about Sa'd's place", svg: ring(136, 100, 3.4, SOFT_GOLD), keys: showFrom(0.08, 0.11), loop: soft },
      { name: "Sa'd's voice: I will share my wealth", svg: arcsLeft(132.6, 89.6, VOICE), keys: showWhile(0.19, 0.21, 0.36, 0.38), loop: speaking },
      { name: "Abdur-Rahman's voice: a blessing, and the market", svg: arcs(81.4, 89.6, VOICE), keys: showWhile(0.36, 0.38, 0.66, 0.68), loop: speaking },
      { name: "in your family and your wealth: a warm glow over Sa'd's home", svg: wash(136, 90, 22, 13, WARM, 0.14), keys: showFrom(0.42, 0.46), loop: soft },
      { name: "show me the market: a way to it", svg: way("M75.6 100 L35 100"), keys: showFrom(0.54, 0.58) },
      { name: "Sa'd's voice: the market of Qaynuqa'", svg: arcsLeft(132.6, 89.6, VOICE), keys: showWhile(0.66, 0.68, 0.82, 0.84), loop: speaking },
      { name: "the market of Qaynuqa': a soft ring about it", svg: oval(30, 80, 29, 16, SOFT_GOLD), keys: showFrom(0.69, 0.73), loop: soft },
      {
        name: "dried yogurt and butter, brought back",
        svg: butter(84.6, 101.4) + yogurt(89.4, 101.4),
        keys: track({
          xy: [
            [0.877, toMarket, 0],
            [0.915, 0, 0]
          ],
          opacity: [
            [0.866, 0],
            [0.874, 1]
          ]
        })
      },
      { name: "to his household: a warm glow at Abdur-Rahman's home", svg: wash(78, 90, 15, 11, WARM, 0.16), keys: showFrom(0.92, 0.95), loop: soft }
    ],
    words: [
      { text: "He made Abdur-Rahman and Sa'd brothers", from: 0.02, to: 0.17 },
      { text: "Sa'd: I'll share my wealth in two halves", from: 0.19, to: 0.34 },
      { text: "Allah bless you in your family and wealth", from: 0.36, to: 0.5 },
      { text: "Show me the market", from: 0.52, to: 0.64 },
      { text: "Sa'd: the market of Qaynuqa'", from: 0.66, to: 0.8 },
      { text: "He came back with dried yogurt and butter", from: 0.82, to: 1 }
    ]
  };
}

/** A coat of iron rings, its middle at (x, y): 13.6 wide and 12 high. */
const armour = (x: number, y: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx)} ${n(y + dy)}`;
  let links = "";
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 4; col += 1) links += `<circle cx="${n(x - 2.4 + col * 1.6 + (row % 2) * 0.8)}" cy="${n(y - 3 + row * 1.9)}" r="0.55" fill="none" stroke="#6E7884" stroke-width="0.3"/>`;
  }
  return (
    `<path d="M${p(-2, -6)} L${p(-5.6, -4.6)} L${p(-6.8, -0.4)} L${p(-4.4, 0.4)} L${p(-3.6, -1.8)} L${p(-3.6, 6)} L${p(3.6, 6)} L${p(3.6, -1.8)} L${p(4.4, 0.4)} L${p(6.8, -0.4)} L${p(5.6, -4.6)} L${p(2, -6)} Q${p(0, -4.6)} ${p(-2, -6)} Z" fill="#9AA4AF" stroke="#5F6A76" stroke-width="0.45"/>` +
    links +
    `<path d="M${p(-3.6, 5.4)} L${p(3.6, 5.4)}" stroke="#5F6A76" stroke-width="0.5"/>`
  );
};

/** A day to come, a small light in the sky at (x, y). */
const day = (x: number, y: number) => glow(x, y, 4, "#FFF0C0", 0.16) + `<circle cx="${x}" cy="${y}" r="2.2" fill="#FFE9A8" stroke="#E0B65A" stroke-width="0.5"/>`;

// Food bought, to be paid later. Aishah said: the Prophet ﷺ bought food from a Jewish man, to be paid at a set time, and
// pledged his iron armour to him (Sahih al-Bukhari 2068). No one is drawn: his place is a golden ring at the door of his
// home, and the seller's place a small dashed circle by his store, with its sacks of grain. A way shows between the two,
// and a sack of food goes from the store to his home, with a warm glow there. Small days come one by one in a row above,
// and a golden ring comes about the last: the set time. Then his iron armour, a coat of rings, goes to the store, and a
// soft ring comes about it there: held as a pledge.
function grainOnCredit(): SignArt {
  const days = [52, 66, 80, 94, 108];
  return {
    kind: "grain-on-credit",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "clouds", svg: cloud(24, 24, 0.5, "#FFFFFF", 0.9) + cloud(138, 42, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [8, 86, 13],
        [62, 84, 12],
        [150, 86, 13]
      ]),
      { name: "his home", svg: home(30, 92, 20, 14) },
      { name: "the seller's store", svg: home(126, 92, 30, 18, "#CFA66F", "#B88A58") },
      { name: "sacks of grain by the store", svg: sack(104.4, 102.4, 1) + sack(145, 102, 1.1) + sack(151.6, 102.6, 1) },
      { name: "a golden ring, his place", svg: ring(30, 100.6, 2.4, GOLD) },
      { name: "the seller's place", svg: someone(126, 101) },
      { name: "the way of the sale", svg: way("M33.6 101 L122.4 101"), keys: showFrom(0.04, 0.08) },
      {
        name: "food bought: a sack of grain",
        svg: sack(116, 102.6, 1.2, "#D2AE72"),
        keys: track({
          xy: [
            [0.1, 0, 0],
            [0.22, -72, 0]
          ]
        })
      },
      { name: "food for his home: a warm glow", svg: wash(30, 90, 14, 10, WARM, 0.14), keys: showFrom(0.23, 0.27), loop: soft },
      ...days.map((x, i): SignPart => ({ name: `to a set time: a day ${i + 1}`, svg: day(x, 30), keys: showFrom(at3(0.36 + i * 0.03), at3(0.38 + i * 0.03)) })),
      { name: "the set time: a golden ring about the last day", svg: `<circle cx="108" cy="30" r="4.4" stroke="${GOLD}" stroke-width="0.9" fill="none"/>`, keys: showFrom(0.52, 0.56), loop: soft },
      {
        name: "his iron armour, given as a pledge",
        svg: armour(52, 88),
        keys: track({
          xy: [
            [0.7, 0, 0],
            [0.84, 48, 0]
          ],
          opacity: [
            [0.67, 0],
            [0.69, 1]
          ]
        })
      },
      { name: "held as a pledge: a soft ring about the armour", svg: care(100, 88, 8.6, 8.8, GOLD), keys: showFrom(0.86, 0.9), loop: soft }
    ],
    words: [
      { text: "He bought food from a Jewish man", from: 0.02, to: 0.32 },
      { text: "To be paid at a set time", from: 0.34, to: 0.64 },
      { text: "And pledged his iron armour to him", from: 0.66, to: 1 }
    ]
  };
}

/** A thorn tree of the hillside, its foot at (x, y), `h` high. */
const thornTree = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h * 0.6)} M${x} ${n(y - h * 0.45)} L${n(x - h * 0.3)} ${n(y - h * 0.8)} M${x} ${n(y - h * 0.5)} L${n(x + h * 0.3)} ${n(y - h * 0.82)}" stroke="#7A5A38" stroke-width="${n(h * 0.06 + 0.4)}" stroke-linecap="round" fill="none"/>` +
  `<ellipse cx="${x}" cy="${n(y - h * 0.86)}" rx="${n(h * 0.55)}" ry="${n(h * 0.16)}" fill="#7FA05A"/>` +
  `<ellipse cx="${n(x + h * 0.08)}" cy="${n(y - h * 0.9)}" rx="${n(h * 0.4)}" ry="${n(h * 0.1)}" fill="#91B266"/>`;

/** A dry stick, its middle at (x, y), 14 long. */
const stick = (x: number, y: number, tilt: number) =>
  `<path d="M${n(x - 7)} ${n(y + tilt)} L${n(x + 7)} ${n(y - tilt)}" stroke="#8A6440" stroke-width="0.9" stroke-linecap="round"/>` +
  `<path d="M${n(x + 2.5)} ${n(y - tilt * 0.4)} L${n(x + 3.9)} ${n(y - 1.4)}" stroke="#8A6440" stroke-width="0.5" stroke-linecap="round"/>`;

/** A small dish of food, its foot's middle at (x, y). */
const dish = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${n(y - 1.6)} Q${x} ${n(y + 0.8)} ${n(x + 3)} ${n(y - 1.6)} Z" fill="#B5713F"/>` +
  [
    [-1.3, -2.1],
    [0, -2.5],
    [1.3, -2.1]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="0.65" fill="#7A2E14"/>`)
    .join("");

// A bundle of firewood. Abu Hurairah said that the Messenger of Allah ﷺ said: for one of you to gather firewood, a
// bundle on his back, is better than to ask anyone, who may give him or refuse him (Sahih al-Bukhari 2074). No one is
// drawn: the place of one who gathers is a small dashed circle on a hillside of thorn trees. Dry sticks come together
// into a pile and a rope comes about them; the bundle rises over the place, which carries it toward the town, and a
// golden ring comes about the two. Then a faint grey place stands by two doors of the town, with a grey dashed way to
// each: from one door a dish comes to it, and the other stays shut, with a grey dashed ring about it.
function bundleOfWood(): SignArt {
  const slots = [0, 1, 2, 3, 4].map((i) => n(95 + i * 0.95));
  const lying: [number, number][] = [
    [16, 106],
    [30, 92],
    [64, 106],
    [22, 98.6],
    [70, 95]
  ];
  const tilt = (i: number) => (i % 2 ? -0.3 : 0.3);
  const bundle = slots.map((y, i) => stick(48, y, tilt(i))).join("");
  const carried: [number, number, number][] = [
    [0.32, 0, 0],
    [0.35, -12, -4.5],
    [0.36, -12, -4.5],
    [0.43, 24, -4.5]
  ];
  return {
    kind: "bundle-of-wood",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(128, 22) },
      { name: "clouds", svg: cloud(46, 24, 0.55, "#FFFFFF", 0.9) + cloud(96, 16, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [8, 72],
          [52, 70],
          [88, 76],
          [124, 112],
          [150, 74]
        ])
      },
      { name: "thorn trees of the hillside", svg: thornTree(12, 84, 18) + thornTree(38, 80, 13) + thornTree(60, 84, 11) },
      { name: "homes of the town", svg: home(110, 92, 18, 13) + home(142, 92, 20, 14, "#CFA66F", "#B88A58") },
      ...slots.map(
        (y, i): SignPart => ({
          name: `dry sticks, gathered ${i + 1}`,
          svg: stick(48, y, tilt(i)),
          keys: track({
            xy: [
              [at3(0.05 + i * 0.025), lying[i][0] - 48, n(lying[i][1] - y)],
              [at3(0.1 + i * 0.025), 0, 0]
            ],
            opacity: [
              [0.285, 1],
              [0.29, 0]
            ]
          })
        })
      ),
      {
        name: "a bundle of firewood",
        svg: bundle,
        keys: track({
          xy: carried,
          opacity: [
            [0.28, 0],
            [0.285, 1]
          ]
        })
      },
      {
        name: "a rope about the bundle",
        svg: `<path d="M44.5 93.6 L44.5 100.2 M51.5 93.6 L51.5 100.2" stroke="#C9A25A" stroke-width="1.1"/>`,
        keys: track({
          xy: carried,
          opacity: [
            [0.29, 0],
            [0.31, 1]
          ]
        })
      },
      {
        name: "the place of one who gathers",
        svg: someone(36, 101),
        keys: track({
          xy: [
            [0.36, 0, 0],
            [0.43, 36, 0]
          ]
        })
      },
      { name: "better: a golden ring about the place and its bundle", svg: oval(72, 96.4, 10, 7.8, SOFT_GOLD), keys: showFrom(0.51, 0.55), loop: soft },
      { name: "asking instead: a faint grey place by the doors", svg: someone(125, 101, 1.5, GREY), keys: showFrom(0.56, 0.58) },
      { name: "asking anyone: a grey dashed way to each door", svg: way("M123.8 100.2 L109 92.6", GREY, 0.8) + way("M126.2 100.2 L139.6 93", GREY, 0.8), keys: showFrom(0.6, 0.64) },
      {
        name: "he may give: a dish from the door",
        svg: dish(120.4, 99.4),
        keys: track({
          xy: [
            [0.76, -12, -6.6],
            [0.81, 0, 0]
          ],
          opacity: [
            [0.755, 0],
            [0.765, 1]
          ]
        })
      },
      { name: "or refuse: a grey dashed ring about the shut door", svg: greyRing(140.2, 89.2, 3.6, 4.6), keys: showFrom(0.84, 0.88) }
    ],
    words: [
      { text: "For one of you to gather firewood", from: 0.02, to: 0.24 },
      { text: "A bundle of it on his back", from: 0.26, to: 0.48 },
      { text: "Is better than to ask anyone", from: 0.5, to: 0.72 },
      { text: "Who may give him or refuse him", from: 0.74, to: 1 }
    ]
  };
}

// The easygoing trader. Jabir ibn Abdullah said that the Messenger of Allah ﷺ said: may Allah have mercy on a man who is
// easygoing when he sells, when he buys, and when he asks for what he is owed (Sahih al-Bukhari 2076). No one is drawn:
// the trader's place is a small dashed circle by his stall, and a warm glow and a soft ring come about it. A buyer's
// place comes, and along a soft golden way a jar goes to it and its coins come to the counter. A seller's place comes
// with a sack: the coins go to it, and the sack to the counter. Then the trader's place goes along a soft way to the
// home of one who owes him, and what he is owed comes to it there.
function easygoingTrader(): SignArt {
  const walk: [number, number, number][] = [
    [0.79, 0, 0],
    [0.86, -52, -6]
  ];
  return {
    kind: "easygoing-trader",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "clouds", svg: cloud(40, 24, 0.55, "#FFFFFF", 0.9) + cloud(98, 16, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [108, 86, 14],
        [150, 88, 12]
      ]),
      { name: "the home of one who owes him", svg: home(20, 84, 24, 16) },
      { name: "a home of the town", svg: home(140, 84, 20, 13, "#CFA66F", "#B88A58") },
      { name: "the trader's stall", svg: stall(72, 40, "#D9534F") },
      { name: "jars on the counter", svg: jar(58, 84, 0.8) + jar(63.4, 84, 0.7, "#C98A4E") },
      { name: "the place of one who owes him", svg: someone(24, 93.4) },
      {
        name: "mercy: a warm glow about the trader's place",
        svg: wash(86, 99, 9, 6, WARM, 0.18),
        keys: track({
          xy: walk,
          opacity: [
            [0.06, 0],
            [0.12, 1]
          ]
        }),
        loop: soft
      },
      {
        name: "one who is easy: a soft ring about the trader's place",
        svg: ring(86, 101, 3.4, SOFT_GOLD),
        keys: track({
          xy: walk,
          opacity: [
            [0.1, 0],
            [0.14, 1]
          ]
        }),
        loop: soft
      },
      { name: "the trader's place", svg: someone(86, 101), keys: track({ xy: walk }) },
      {
        name: "a buyer's place",
        svg: someone(64, 101),
        keys: track({
          xy: [
            [0.27, -76, 0],
            [0.33, 0, 0],
            [0.5, 0, 0],
            [0.54, -76, 0]
          ],
          opacity: [
            [0.27, 0],
            [0.272, 1],
            [0.536, 1],
            [0.54, 0]
          ]
        })
      },
      { name: "when he sells: a soft golden way between the two", svg: way("M66 101 L84 101", SOFT_GOLD, 0.9), keys: showWhile(0.33, 0.35, 0.5, 0.52) },
      {
        name: "a jar, sold",
        svg: jar(84, 84, 0.8),
        keys: track({
          xy: [
            [0.35, 0, 0],
            [0.4, -24, 17.6],
            [0.5, -24, 17.6],
            [0.54, -100, 17.6]
          ],
          opacity: [
            [0.536, 1],
            [0.54, 0]
          ]
        })
      },
      {
        name: "coins for the jar",
        svg: coins(78, 83.4, 3),
        keys: track({
          xy: [
            [0.395, -10, 16.6],
            [0.43, 0, 0],
            [0.6, 0, 0],
            [0.64, 17.8, 16.6],
            [0.74, 17.8, 16.6],
            [0.78, 89.8, 16.6]
          ],
          opacity: [
            [0.39, 0],
            [0.395, 1],
            [0.776, 1],
            [0.78, 0]
          ]
        })
      },
      {
        name: "a seller's place",
        svg: someone(100, 101),
        keys: track({
          xy: [
            [0.52, 66, 0],
            [0.57, 0, 0],
            [0.74, 0, 0],
            [0.78, 66, 0]
          ],
          opacity: [
            [0.52, 0],
            [0.522, 1],
            [0.776, 1],
            [0.78, 0]
          ]
        })
      },
      {
        name: "a sack he buys",
        svg: sack(84, 84, 0.85),
        keys: track({
          xy: [
            [0.52, 88, 17.6],
            [0.57, 22, 17.6],
            [0.61, 22, 17.6],
            [0.65, 0, 0]
          ],
          opacity: [
            [0.52, 0],
            [0.522, 1]
          ]
        })
      },
      { name: "when he buys: a soft golden way between the two", svg: way("M88 101 L98 101", SOFT_GOLD, 0.9), keys: showWhile(0.57, 0.59, 0.74, 0.76) },
      { name: "when he asks for what he is owed: a soft way to the one who owes", svg: way("M84 100 L36 94.4", SOFT_GOLD, 0.9), keys: showFrom(0.75, 0.78) },
      {
        name: "what he is owed, come to him",
        svg: coins(29, 95.6, 2),
        keys: track({
          xy: [
            [0.88, -10.8, -11.6],
            [0.92, 0, 0]
          ],
          opacity: [
            [0.875, 0],
            [0.88, 1]
          ]
        })
      }
    ],
    words: [
      { text: "May Allah have mercy on one who is easy", from: 0.02, to: 0.24 },
      { text: "When he sells", from: 0.26, to: 0.48 },
      { text: "When he buys", from: 0.5, to: 0.72 },
      { text: "And when he asks for what he is owed", from: 0.74, to: 1 }
    ]
  };
}

/** Where a palm's two bunches of dates hang under its crown, for a palm with its foot at (x, y), `h` high. */
const bunchesOf = (x: number, y: number, h: number): [number, number][] => {
  const tx = x + h * 0.08;
  const top = y - h;
  return [
    [n(tx - 3), n(top + 3)],
    [n(tx + 3.4), n(top + 3.4)]
  ];
};

/** The sway of the i-th palm of `palms` (daysArt.ts), for what hangs on it. */
const swayOf = (i: number) => ({ move: "sway" as const, ms: 5200 + i * 600, angle: 1.4, phase: i / 3 });

// Fruit sold only once it is clearly good. Abdullah ibn Umar said that the Messenger of Allah ﷺ forbade selling fruit
// until it is clearly good; he forbade it to the seller and to the buyer (Sahih al-Bukhari 2194). No one is drawn: green
// dates hang on three palms, with the seller's place under them, and his place is a golden ring by them. His voice
// speaks; a buyer's place comes with coins, and a grey dashed way between the two and a grey dashed ring about the green
// dates show the sale he forbade. The sun goes on and the dates ripen; the grey fades, a soft golden ring comes about
// the ripe dates, and a golden way between the two. His voice speaks again, and a ring comes about the seller's place
// and about the buyer's.
function fruitWhenRipe(): SignArt {
  const trees: [number, number, number][] = [
    [36, 92, 30],
    [66, 90, 34],
    [96, 92, 28]
  ];
  const bunches = (color?: string) =>
    trees.map(([x, y, h], i): SignPart => {
      const svg = bunchesOf(x, y, h)
        .map(([bx, by]) => (color ? dateBunch(bx, by).replace(/#9C3D1E/g, color) : dateBunch(bx, by)))
        .join("");
      return color
        ? { name: `green dates on a palm ${i + 1}`, svg, origin: { x, y }, loop: swayOf(i) }
        : { name: `the dates ripening on a palm ${i + 1}`, svg, origin: { x, y }, keys: track({ opacity: [[0.36, 0], [0.5, 1]] }), loop: swayOf(i) };
    });
  const buyerComes = track({
    xy: [
      [0.04, 50, 0],
      [0.1, 0, 0]
    ],
    opacity: [
      [0.04, 0],
      [0.042, 1]
    ]
  });
  return {
    kind: "fruit-when-ripe",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun",
        svg: sun(20, 26),
        keys: track({
          xy: [
            [0.36, 0, 0],
            [0.5, 32, -8]
          ]
        })
      },
      { name: "clouds", svg: cloud(118, 22, 0.55, "#FFFFFF", 0.9) + cloud(150, 36, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills("#B9B486") },
      {
        name: "the garden ground",
        svg: landOf(
          [
            [14, 74],
            [122, 72],
            [150, 80],
            [10, 112],
            [140, 114]
          ],
          "#D9D3A0"
        )
      },
      ...palms(trees, "the grove"),
      ...bunches("#7FAE4A"),
      ...bunches(),
      { name: "a golden ring, his place", svg: ring(84, 105.6, 2.4, GOLD) },
      { name: "the seller's place", svg: someone(58, 100) },
      { name: "a buyer's place", svg: someone(112, 100), keys: buyerComes },
      { name: "the buyer's coins", svg: coins(117.4, 100.6, 3), keys: buyerComes },
      { name: "his voice: he forbade it", svg: arcs(87.4, 104.6, VOICE), keys: showWhile(0.04, 0.06, 0.34, 0.36), loop: speaking },
      { name: "selling the green fruit: a grey dashed way", svg: way("M61 100 L109 100", GREY, 0.9), keys: showWhile(0.12, 0.16, 0.5, 0.53) },
      { name: "not yet good: a grey dashed ring about the green dates", svg: greyRing(68.5, 63, 38, 11), keys: showWhile(0.18, 0.22, 0.48, 0.52) },
      { name: "clearly good: a soft golden ring about the ripe dates", svg: oval(68.5, 63, 38, 11, SOFT_GOLD), keys: showFrom(0.52, 0.56), loop: soft },
      { name: "now it may be sold: a golden way", svg: way("M61 100 L109 100", SOFT_GOLD, 0.9), keys: showFrom(0.53, 0.56) },
      { name: "his voice: the seller and the buyer", svg: arcs(87.4, 104.6, VOICE), keys: showFrom(0.67, 0.69), loop: speaking },
      { name: "the seller: a ring about the place", svg: ring(58, 100, 3.6, GOLD), keys: showFrom(0.7, 0.74) },
      { name: "the buyer: a ring about the place", svg: ring(112, 100, 3.6, GOLD), keys: showFrom(0.76, 0.8) }
    ],
    words: [
      { text: "He forbade selling fruit", from: 0.02, to: 0.32 },
      { text: "Until it is clearly good", from: 0.34, to: 0.64 },
      { text: "He forbade the seller and the buyer", from: 0.66, to: 1 }
    ]
  };
}

// Gold for gold. Abu Bakrah said that the Messenger of Allah ﷺ said: do not sell gold for gold unless equal for equal,
// nor silver for silver unless equal for equal; and sell gold for silver and silver for gold however you wish (Sahih
// al-Bukhari 2175). No one is drawn: a balance stands on a market counter. Three gold coins on one pan and two on the
// other: the beam tips, and a grey dashed ring comes about it; a third coin comes from the heap, the beam comes level,
// and a soft golden ring comes about it. Then the same with silver. Then gold on one pan and silver on the other: the
// beam tips and stays so, with golden ways between the two pans, and a warm glow comes over it.
function goldForGold(): SignArt {
  const left = 54.6;
  const right = 105.4;
  const tip = (angle: number) => n((right - 80) * Math.sin((angle * Math.PI) / 180));
  const turns: [number, number][] = [
    [0, 0],
    [0.06, 0],
    [0.1, -8],
    [0.26, -8],
    [0.3, 0],
    [0.44, 0],
    [0.47, -8],
    [0.52, -8],
    [0.55, 0],
    [0.68, 0],
    [0.71, 6]
  ];
  const leftPan = turns.map(([t, angle]): [number, number, number] => [t, 0, -tip(angle)]);
  const rightPan = turns.map(([t, angle]): [number, number, number] => [t, 0, tip(angle)]);
  const on = (pan: [number, number, number][], opacity: [number, number][]) => track({ xy: pan, opacity });
  const gold = (x: number, count: number) => coins(x, 69.2, count, GOLD_COIN, GOLD_EDGE, true);
  const silver = (x: number, count: number) => coins(x, 69.2, count, SILVER_COIN, SILVER_EDGE, true);
  const heap = (x: number, fill: string, edge: string) =>
    [
      [-3, 86.4],
      [1.2, 86.6],
      [-1, 85.4],
      [3.2, 85.7],
      [0.6, 84.4]
    ]
      .map(([dx, y]) => `<ellipse cx="${n(x + dx)}" cy="${y}" rx="2.2" ry="0.85" fill="${fill}" stroke="${edge}" stroke-width="0.35"/>`)
      .join("");
  const pan = (x: number) =>
    `<path d="M${x} 49.6 L${n(x - 6.4)} 70 M${x} 49.6 L${n(x + 6.4)} 70" stroke="#6E5532" stroke-width="0.4"/>` +
    `<path d="M${n(x - 7.4)} 70 Q${x} 75.6 ${n(x + 7.4)} 70 Z" fill="#C9A055"/><path d="M${n(x - 7.4)} 70 L${n(x + 7.4)} 70" stroke="#A88438" stroke-width="0.6"/>`;
  let stripes = "";
  let scallops = "";
  for (let i = 0; i < 16; i += 1) {
    stripes += `<rect x="${n(14 + i * 8.25)}" y="13" width="8.3" height="8" fill="${i % 2 ? "#F2E3C6" : "#3E7FB0"}"/>`;
    scallops += `<path d="M${n(14 + i * 8.25)} 21 A4.1 3.4 0 0 0 ${n(22.25 + i * 8.25)} 21 Z" fill="${i % 2 ? "#E8D5B0" : "#356E9A"}"/>`;
  }
  const counter =
    `<rect x="22" y="88.6" width="116" height="13.4" fill="#9A6537"/>` +
    [36, 50, 64, 78, 92, 106, 120].map((x) => `<path d="M${x} 89 L${x} 102" stroke="#86552C" stroke-width="0.6"/>`).join("") +
    `<rect x="22" y="88.6" width="116" height="1.6" fill="#000000" opacity="0.16"/><rect x="20" y="87" width="120" height="1.8" rx="0.6" fill="#B07A47"/>`;
  const ringAbout = (color: string) => oval(80, 61, 36, 17, color);
  return {
    kind: "gold-for-gold",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(30, 36) },
      { name: "clouds", svg: cloud(122, 38, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "poles of the stall", svg: `<rect x="17" y="14" width="2" height="88" fill="#8A6340"/><rect x="141" y="14" width="2" height="88" fill="#8A6340"/>` },
      { name: "awning of the stall", svg: stripes + `<rect x="14" y="13" width="132" height="1.2" fill="#000000" opacity="0.12"/>` },
      { name: "fringe of the awning", svg: scallops, loop: { move: "bob", ms: 1700, y: 0.45 } },
      { name: "the counter", svg: counter },
      { name: "a heap of gold on the counter", svg: heap(118, GOLD_COIN, GOLD_EDGE) },
      { name: "a heap of silver on the counter", svg: heap(130, SILVER_COIN, SILVER_EDGE) },
      {
        name: "stand of the balance",
        svg: `<rect x="73" y="85.2" width="14" height="2" rx="0.6" fill="#8C6A3A"/><rect x="79.2" y="50" width="1.6" height="35.4" fill="#A47C46"/><circle cx="80" cy="49" r="1.7" fill="#C9A055"/>`
      },
      {
        name: "crossbar of the balance",
        svg: `<rect x="54" y="48.35" width="52" height="1.3" rx="0.6" fill="#B98E4E"/><circle cx="${left}" cy="49" r="0.9" fill="#8C6A3A"/><circle cx="${right}" cy="49" r="0.9" fill="#8C6A3A"/>`,
        origin: { x: 80, y: 49 },
        keys: { at: turns.map(([t]) => t), rotate: turns.map(([, angle]) => angle) }
      },
      { name: "the pan on the left", svg: pan(left), keys: track({ xy: leftPan }) },
      { name: "the pan on the right", svg: pan(right), keys: track({ xy: rightPan }) },
      {
        name: "gold for gold: three coins on the left",
        svg: gold(left, 3),
        keys: on(leftPan, [
          [0.03, 0],
          [0.06, 1],
          [0.4, 1],
          [0.42, 0]
        ])
      },
      {
        name: "gold for gold: two coins on the right",
        svg: gold(right, 2),
        keys: on(rightPan, [
          [0.03, 0],
          [0.06, 1],
          [0.4, 1],
          [0.42, 0]
        ])
      },
      {
        name: "equal for equal: a gold coin added",
        svg: coins(right, 66.2, 1, GOLD_COIN, GOLD_EDGE, true),
        keys: track({
          xy: [
            [0.225, 13.2, 18.2],
            [0.255, 0, tip(-8)],
            [0.26, 0, tip(-8)],
            [0.3, 0, 0]
          ],
          opacity: [
            [0.22, 0],
            [0.225, 1],
            [0.4, 1],
            [0.42, 0]
          ]
        })
      },
      {
        name: "silver for silver: three coins on the left",
        svg: silver(left, 3),
        keys: on(leftPan, [
          [0.42, 0],
          [0.44, 1],
          [0.64, 1],
          [0.66, 0]
        ])
      },
      {
        name: "silver for silver: two coins on the right",
        svg: silver(right, 2),
        keys: on(rightPan, [
          [0.42, 0],
          [0.44, 1],
          [0.64, 1],
          [0.66, 0]
        ])
      },
      {
        name: "unless equal: a silver coin added",
        svg: coins(right, 66.2, 1, SILVER_COIN, SILVER_EDGE, true),
        keys: track({
          xy: [
            [0.495, 25.2, 18.2],
            [0.515, 0, tip(-8)],
            [0.52, 0, tip(-8)],
            [0.55, 0, 0]
          ],
          opacity: [
            [0.49, 0],
            [0.495, 1],
            [0.64, 1],
            [0.66, 0]
          ]
        })
      },
      {
        name: "gold for silver: gold on the left",
        svg: gold(left, 2),
        keys: on(leftPan, [
          [0.66, 0],
          [0.68, 1]
        ])
      },
      {
        name: "silver for gold: silver on the right",
        svg: silver(n(right - 3), 2) + silver(n(right + 3), 3),
        keys: on(rightPan, [
          [0.66, 0],
          [0.68, 1]
        ])
      },
      { name: "not equal: a grey dashed ring about the balance", svg: greyRing(80, 61, 36, 17), keys: showWhile(0.1, 0.13, 0.26, 0.29) },
      { name: "equal for equal: a soft golden ring about the balance", svg: ringAbout(SOFT_GOLD), keys: showWhile(0.29, 0.33, 0.4, 0.42), loop: soft },
      { name: "silver not equal: a grey dashed ring about the balance", svg: greyRing(80, 61, 36, 17), keys: showWhile(0.47, 0.49, 0.52, 0.54) },
      { name: "silver equal: a soft golden ring about the balance", svg: ringAbout(SOFT_GOLD), keys: showWhile(0.54, 0.57, 0.64, 0.66), loop: soft },
      { name: "gold for silver: a golden way between the pans", svg: way("M56 44.6 Q80 31 104 44.6", SOFT_GOLD, 0.9), keys: showFrom(0.71, 0.74) },
      { name: "silver for gold: a silver way back", svg: way("M104 41 Q80 27.4 56 41", "#B8C0C9", 0.9), keys: showFrom(0.73, 0.76) },
      { name: "however you wish: a warm glow over the balance", svg: wash(80, 62, 40, 22, WARM, 0.12), keys: showFrom(0.86, 0.9), loop: soft },
      { name: "however you wish: a soft golden ring about the balance", svg: ringAbout(SOFT_GOLD), keys: showFrom(0.88, 0.92), loop: soft }
    ],
    words: [
      { text: "Do not sell gold for gold", from: 0.02, to: 0.2 },
      { text: "Unless equal for equal", from: 0.22, to: 0.38 },
      { text: "Nor silver for silver, unless equal", from: 0.4, to: 0.62 },
      { text: "Sell gold for silver, silver for gold", from: 0.64, to: 0.82 },
      { text: "However you wish", from: 0.84, to: 1 }
    ]
  };
}

// Sharing the fruit. Abu Hurairah said: the Ansar said to the Prophet ﷺ: divide the palms between us and our brothers.
// He said: no. The Ansar said: then you do the work of the trees for us, and we share the fruit with you. The emigrants
// said: we hear and obey (Sahih al-Bukhari 2325). No one is drawn: four palms stand in a garden, the places of the Ansar
// on one side and of the emigrants on the other, and his place is a golden ring before it. The Ansar's voice speaks, and
// a dashed line comes through the garden; his voice speaks, and the line fades. The Ansar's voice speaks again: the
// emigrants' places go to the palms, a jug of water by each; dates come on the palms, and a basket of dates goes to each
// side. The emigrants' voice speaks, and a warm glow comes over the garden.
function shareTheFruits(): SignArt {
  const trees: [number, number, number][] = [
    [34, 90, 24],
    [62, 88, 26],
    [98, 88, 26],
    [126, 90, 24]
  ];
  const emigrants: [number, number][] = [
    [6, 103],
    [13, 99],
    [20, 103],
    [27, 99]
  ];
  const ansar: [number, number][] = [
    [138, 99],
    [146, 103],
    [154, 99]
  ];
  const drops = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.45" ry="0.65" fill="#5B8FC7"/><ellipse cx="${n(x + 0.6)}" cy="${n(y + 1.6)}" rx="0.4" ry="0.55" fill="#5B8FC7"/>`;
  return {
    kind: "share-the-fruits",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(144, 20) },
      { name: "clouds", svg: cloud(44, 26, 0.55, "#FFFFFF", 0.9) + cloud(104, 18, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills("#B9B486") },
      {
        name: "the garden ground",
        svg: landOf(
          [
            [12, 74],
            [80, 72],
            [148, 76],
            [60, 112],
            [110, 114]
          ],
          "#D9D3A0"
        )
      },
      ...palms(trees, "the garden"),
      ...trees.map(([x, y], i): SignPart => ({ name: `watered: wet ground at the root of a palm ${i + 1}`, svg: `<ellipse cx="${n(x + 3)}" cy="${n(y + 1.4)}" rx="5" ry="1.4" fill="#8E7A50" opacity="0.4"/>`, keys: showFrom(0.5, 0.54) })),
      ...trees.map(([x, y, h], i): SignPart => ({
        name: `and we share the fruit: dates on a palm ${i + 1}`,
        svg: bunchesOf(x, y, h)
          .map(([bx, by]) => dateBunch(bx, by))
          .join(""),
        origin: { x, y },
        keys: showFrom(0.61, 0.65),
        loop: swayOf(i)
      })),
      { name: "divide the palms: a dashed line through the garden", svg: `<path d="M80 56 L80 101" stroke="#8A6440" stroke-width="0.7" stroke-dasharray="1.6 1.4"/>`, keys: showWhile(0.07, 0.11, 0.26, 0.3) },
      { name: "a golden ring, his place", svg: ring(80, 104.6, 2.4, GOLD) },
      ...ansar.map(([x, y], i): SignPart => ({ name: `a place of the Ansar ${i + 1}`, svg: someone(x, y) })),
      ...emigrants.map(
        ([x, y], i): SignPart => ({
          name: `an emigrant's place ${i + 1}`,
          svg: someone(x, y),
          keys: track({
            xy: [
              [0.41, 0, 0],
              [0.48, trees[i][0] - 5 - x, 97 - y],
              [0.64, trees[i][0] - 5 - x, 97 - y],
              [0.72, 0, 0]
            ]
          })
        })
      ),
      ...trees.map(([x, y], i): SignPart => ({ name: `the work of the trees: a jug by a palm ${i + 1}`, svg: jug(n(x + 6), n(y + 2.6)), keys: showWhile(0.48, 0.5, 0.6, 0.62) })),
      ...trees.map(
        ([x, y], i): SignPart => ({
          name: `the work of the trees: water from the jug ${i + 1}`,
          svg: drops(n(x + 10.8), n(y - 1.6)),
          keys: showWhile(0.49, 0.51, 0.6, 0.62),
          loop: { move: "drip", ms: 900, distance: 2.4, phase: i / 4 }
        })
      ),
      { name: "the Ansar's voice: divide the palms", svg: arcsLeft(150, 92, VOICE), keys: showWhile(0.02, 0.04, 0.22, 0.24), loop: speaking },
      { name: "his voice: no", svg: arcs(83, 103.6, VOICE), keys: showWhile(0.22, 0.24, 0.38, 0.4), loop: speaking },
      { name: "the Ansar's voice: you do the work, and we share the fruit", svg: arcsLeft(150, 92, VOICE), keys: showWhile(0.38, 0.4, 0.82, 0.84), loop: speaking },
      {
        name: "a basket of dates for the emigrants",
        svg: basketOfDates(36, 105.4),
        keys: track({
          xy: [
            [0.67, 36, -8],
            [0.74, 0, 0]
          ],
          opacity: [
            [0.655, 0],
            [0.665, 1]
          ]
        })
      },
      {
        name: "a basket of dates for the Ansar",
        svg: basketOfDates(128, 105.4),
        keys: track({
          xy: [
            [0.67, -40, -8],
            [0.74, 0, 0]
          ],
          opacity: [
            [0.655, 0],
            [0.665, 1]
          ]
        })
      },
      { name: "the emigrants' voice: we hear and obey", svg: arcs(16, 92.4, VOICE), keys: showFrom(0.82, 0.84), loop: speaking },
      { name: "a warm glow over the garden", svg: wash(80, 80, 64, 22, WARM, 0.1), keys: showFrom(0.86, 0.9), loop: soft },
      { name: "we hear and obey: a soft golden ring about the emigrants", svg: oval(16.5, 101, 15, 5.2, SOFT_GOLD), keys: showFrom(0.88, 0.92), loop: soft }
    ],
    words: [
      { text: "Divide the palms with our brothers", from: 0.02, to: 0.2 },
      { text: "He said: no", from: 0.22, to: 0.36 },
      { text: "You do the work of the trees", from: 0.38, to: 0.58 },
      { text: "And we share the fruit with you", from: 0.6, to: 0.8 },
      { text: "They said: we hear and obey", from: 0.82, to: 1 }
    ]
  };
}

export const TRADE_ART = {
  "show-me-the-market": showMeTheMarket,
  "grain-on-credit": grainOnCredit,
  "bundle-of-wood": bundleOfWood,
  "easygoing-trader": easygoingTrader,
  "fruit-when-ripe": fruitWhenRipe,
  "gold-for-gold": goldForGold,
  "share-the-fruits": shareTheFruits
};
