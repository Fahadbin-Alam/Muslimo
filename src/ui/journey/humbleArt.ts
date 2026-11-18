import { cloud, glow, n, peaks, sky, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, goldCoin, palms, sparkRising, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { dish } from "./worthArt";
import { faintRing, goldLine } from "./heedArt";
import { kabah } from "./historyArt";
import { roofOnTrunks } from "./gentleArt";
import { GREY } from "./lovedArt";
import { at3 } from "./storyArt";

/**
 * Humble ways and plain things, in his ﷺ days: the three who came to his circle in the masjid; the woman who cooked
 * silq for them each Friday; the dinars Yazid meant for charity, which came to his own son; the cloth with marks, and
 * the plain one he asked for; Asma carrying date stones from az-Zubair's land; Dimad, who heard words like no other;
 * and the takbir going up and the tasbih coming down. Only the land, the sky, buildings, things, plants and animals
 * are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a face: where someone was, a
 * ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing
 * is drawn for Allah, and nothing comes down from the sky: a prayer, a witness or a takbir is a spark that rises.
 */

/** A faint dashed ring about a voice that is gone, or a place left empty. */
const gapRing = (x: number, y: number) => faintRing(x, y, 1.8, "#FFFFFF");

/** The Ka'bah far off, small, with its band of gold. */
const kabahFar = () => kabah(70, 80.4, 6);

// The three who came. Abu Waqid al-Laythi said: while the Messenger of Allah ﷺ was sitting in the masjid with the
// people, three came. Two came to the Messenger of Allah ﷺ and one went away. The two stood by him; one of them saw a
// gap in the circle and sat in it, the other sat behind them, and the third turned his back and went away. When he
// finished, he said: shall I tell you of the three? One of them betook himself to Allah, so Allah took him in; the
// second was shy, so Allah sheltered him in His mercy; and the third turned away, so Allah turned away from him
// (Sahih al-Bukhari 66). No one is drawn: by the masjid of Madinah, the places of the folk sit in a circle, and his
// place, a golden ring, sits at its right end. Three places come from the right; two come and stand by him, and the
// third goes aside. A faint ring shows a gap in the circle, and one of the two goes into it and sits; the other goes
// round and sits behind them; and the third turns and goes away along a faint grey way. His voice speaks: a soft
// golden ring and a warm glow come about the one in the circle; a soft ring and a soft glow about the one behind; and
// a faint grey ring shows where the third went off.
function threeCame(): SignArt {
  const at = (deg: number): [number, number] => [n(84 + 17 * Math.cos((deg * Math.PI) / 180)), n(101 + 5.4 * Math.sin((deg * Math.PI) / 180))];
  const circle = [72, 108, 144, 180, 216, 252, 288, 324].map(at);
  const [gx, gy] = at(36);
  return {
    kind: "three-came",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(22, 20) },
      { name: "a cloud", svg: cloud(118, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [12, 76],
          [130, 74],
          [26, 116],
          [112, 116]
        ])
      },
      ...palms([
        [14, 98, 14],
        [150, 90, 13]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(44, 89, 1.05) },
      { name: "the folk in a circle: their places", svg: circle.map(([x, y]) => someone(x, y, 1.5)).join("") },
      { name: "his place, a golden ring", svg: ring(101, 101, 2.6, GOLD) },
      { name: "a gap in the circle: a faint ring", svg: gapRing(gx, gy), keys: showFor(0.275, 0.29, 0.33, 0.34) },
      {
        name: "the first of the three",
        svg: someone(148, 99.6, 1.5),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, -24, 0],
            [0.16, -24, 0],
            [0.22, -37.6, 5],
            [0.29, -37.6, 5],
            [0.33, n(gx - 148), n(gy - 99.6)]
          ]
        })
      },
      {
        name: "the second of the three",
        svg: someone(152, 104, 1.5),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, -25, 0],
            [0.16, -25, 0],
            [0.22, -41.2, -5.6],
            [0.395, -41.2, -5.6],
            [0.43, -52, -11.4],
            [0.46, -68, -12.6]
          ]
        })
      },
      {
        name: "the third of the three",
        svg: someone(156, 101.8, 1.5),
        keys: track({
          opacity: [
            [0.555, 1],
            [0.575, 0]
          ],
          xy: [
            [0.03, 0, 0],
            [0.1, -26, 0],
            [0.16, -26, 0],
            [0.22, -18, -1.6],
            [0.52, -18, -1.6],
            [0.575, 3.5, -4.8]
          ]
        })
      },
      { name: "the way the third went: a faint grey way", svg: way("M139.6 100.2 Q150 99 158.6 97", GREY, 0.8), keys: showAt(0.515, 0.53) },
      { name: "his voice: shall I tell you of the three", svg: arcs(104, 98.8, GOLD), keys: showFor(0.635, 0.645, 0.945, 0.955), loop: speaking },
      { name: "taken in: a soft golden ring about the first's place", svg: care(gx, gy, 3.4, 1.8, GOLD), keys: showAt(0.655, 0.675), loop: soft },
      { name: "a warm glow about the first's place", svg: glow(gx, n(gy - 0.6), 5, WARM, 0.35), keys: showAt(0.665, 0.695) },
      { name: "sheltered: a soft ring about the second's place", svg: care(84, 91.4, 3.2, 1.7, "#E8C878"), keys: showAt(0.775, 0.795), loop: soft },
      { name: "a soft glow about the second's place", svg: glow(84, 90.8, 4.4, WARM, 0.25), keys: showAt(0.785, 0.815) },
      { name: "turned away: a faint grey ring where the third went", svg: greyRing(154, 97.6, 4.4, 2.2), keys: showAt(0.885, 0.905) }
    ],
    words: [
      { text: "As he sat in the masjid, three came", from: 0.02, to: 0.14 },
      { text: "Two came to him, and one went away", from: 0.155, to: 0.26 },
      { text: "One saw a gap in the circle and sat in it", from: 0.275, to: 0.38 },
      { text: "The other sat behind them", from: 0.395, to: 0.5 },
      { text: "And the third turned his back and went", from: 0.515, to: 0.62 },
      { text: "He said: one went to Allah; He took him in", from: 0.635, to: 0.74 },
      { text: "The second was shy, so Allah sheltered him", from: 0.755, to: 0.86 },
      { text: "The third turned away; Allah turned away", from: 0.875, to: 1 }
    ]
  };
}

/** Silq, a leafy green with red stems, its foot at (x, y). */
const silq = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x - 1.2)} ${n(y - 2.6)} M${x} ${y} L${x} ${n(y - 3)} M${x} ${y} L${n(x + 1.2)} ${n(y - 2.6)}" stroke="#B5473A" stroke-width="0.4"/>` +
  `<ellipse cx="${n(x - 1.5)}" cy="${n(y - 3.1)}" rx="1.1" ry="1.6" fill="#4E9A3A"/><ellipse cx="${x}" cy="${n(y - 3.6)}" rx="1.1" ry="1.7" fill="#5FAE45"/><ellipse cx="${n(x + 1.5)}" cy="${n(y - 3.1)}" rx="1.1" ry="1.6" fill="#4E9A3A"/>`;

/** Pulled-up roots of silq, a small bundle, its foot at (x, y). */
const roots = (x: number, y: number) =>
  `<path d="M${n(x - 1.4)} ${y} L${n(x - 0.8)} ${n(y - 2.2)} M${x} ${n(y + 0.4)} L${x} ${n(y - 2.4)} M${n(x + 1.4)} ${y} L${n(x + 0.8)} ${n(y - 2.2)}" stroke="#E8D9B8" stroke-width="0.6" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y - 3)}" rx="2" ry="1" fill="#B5473A"/>`;

/** A cooking pot of clay, its rim's middle at (x, y). */
const pot = (x: number, y: number) =>
  `<path d="M${n(x - 3.6)} ${y} Q${n(x - 3.8)} ${n(y + 4.2)} ${x} ${n(y + 4.4)} Q${n(x + 3.8)} ${n(y + 4.2)} ${n(x + 3.6)} ${y} Z" fill="#7A5236"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="0.9" fill="#4A3324"/>`;

/** Steam rising from a pot at (x, y). */
const steam = (x: number, y: number) =>
  [-1.4, 0.4, 2].map((dx, i) => `<path d="M${n(x + dx)} ${y} q-1 -1.2 0 -2.4 q1 -1.2 0 -2.4" stroke="#FFFFFF" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="${0.7 - i * 0.12}"/>`).join("");

// The Friday silq. Sahl ibn Sa'd said: there was a woman among us who sowed silq on the edges of the streams of a farm
// of hers. On Fridays she would pull up the roots of the silq and put them in a pot, then put over them a handful of
// barley she had ground. After the Jumu'ah prayer we would greet her, and she would set that food before us, and for
// that food of hers we longed for Friday (Sahih al-Bukhari 938). No one is drawn: her place is in her farm, between
// its two streams, and silq grows along their edges. On Friday a soft glow comes on the masjid far off; she pulls up
// some of the silq, and its roots go with her place to a pot by her home and into it; a handful of barley goes in over
// them, and steam rises. A spark rises from the masjid, the prayer; the places of the folk come from it to her home,
// and their voices greet her. A dish of that food comes from the pot to them, and a warm glow comes about them all.
function fridaySilq(): SignArt {
  const rowOne = [88, 96, 112, 120, 128, 136, 144, 152];
  const rowTwo = [86, 94, 102, 110, 118, 126, 134, 142, 150];
  const grow = (from: number) =>
    track({
      opacity: [
        [from, 0],
        [at3(from + 0.005), 1]
      ],
      scaleY: [
        [from, 0.03],
        [at3(from + 0.04), 1]
      ]
    });
  const folk: [number, number, number, number][] = [
    [24, 86.4, 40.4, 103.6],
    [29, 87.2, 45.6, 105.6],
    [34, 86.4, 36, 105.2]
  ];
  return {
    kind: "friday-silq",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(128, 18) },
      { name: "a cloud", svg: cloud(60, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [40, 74],
          [74, 78],
          [20, 114],
          [70, 116]
        ])
      },
      { name: "the masjid of Madinah, far off", svg: madinahMasjid(4, 84, 0.62) },
      { name: "Friday: a soft glow on the masjid", svg: wash(19, 78, 18, 8, WARM, 0.12), keys: showAt(0.28, 0.3), loop: soft },
      { name: "her home", svg: home(54, 99, 20, 13) },
      { name: "a pot by her home", svg: pot(66, 98.4) },
      {
        name: "her farm",
        svg:
          `<path d="M82 91.6 L156 90.6 L158.6 108.6 L80 109 Z" fill="#C79A64"/>` +
          `<path d="M84 94 L155 93.2 M83 100.8 L156 100 M81.6 107 L157.6 106.4" stroke="#B08452" stroke-width="0.4" opacity="0.7"/>`
      },
      {
        name: "the streams of her farm",
        svg:
          `<path d="M82 97.4 Q100 96.2 120 97.4 T157 96.8" stroke="#7FB6D9" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
          `<path d="M80.6 104.8 Q104 103.8 124 105 T157.8 104.4" stroke="#7FB6D9" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
      },
      {
        name: "glints on the streams",
        svg: [
          [96, 96.8],
          [132, 97.4],
          [108, 104.2],
          [146, 104.6]
        ]
          .map(([x, y]) => sparkle(x, y, 0.7, "#FFFFFF"))
          .join(""),
        loop: { move: "twinkle", ms: 1400, low: 0.2 }
      },
      { name: "silq growing by the first stream", svg: rowOne.map((x) => silq(x, 96.2)).join(""), origin: { x: 120, y: 96.2 }, keys: grow(0.16) },
      { name: "silq growing by the second stream", svg: rowTwo.map((x) => silq(x, 103.6)).join(""), origin: { x: 118, y: 103.6 }, keys: grow(0.17) },
      {
        name: "the silq by her place, pulled up",
        svg: silq(100.6, 96.2) + silq(104.4, 96.2),
        origin: { x: 102.5, y: 96.2 },
        keys: track({
          opacity: [
            [0.16, 0],
            [0.165, 1],
            [0.3, 1],
            [0.32, 0]
          ],
          scaleY: [
            [0.16, 0.03],
            [0.2, 1]
          ]
        })
      },
      {
        name: "her place",
        svg: someone(104, 100.4, 1.5),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.44, -34, 1.2]
          ]
        })
      },
      {
        name: "the silq's roots, pulled up",
        svg: roots(104, 98.2),
        keys: track({
          opacity: [
            [0.3, 0],
            [0.32, 1],
            [0.445, 1],
            [0.455, 0]
          ],
          xy: [
            [0.4, 0, 0],
            [0.44, -34, 1.2],
            [0.445, -38, 1.6]
          ]
        })
      },
      {
        name: "a handful of barley she had ground",
        svg: [-1.2, -0.4, 0.4, 1.2, -0.8, 0, 0.8].map((dx, i) => `<ellipse cx="${n(66 + dx)}" cy="${n(95 - (i < 4 ? 0 : 0.8))}" rx="0.45" ry="0.3" fill="#E9D49A"/>`).join(""),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1],
            [0.55, 1],
            [0.56, 0]
          ],
          xy: [
            [0.535, 0, 0],
            [0.55, 0, 2.4]
          ]
        })
      },
      { name: "cooking: steam rising from the pot", svg: steam(66, 97.4), keys: showAt(0.555, 0.58), loop: { move: "twinkle", ms: 1600, low: 0.3 } },
      spark("the Jumu'ah prayer: a spark rising", 18, 70, 0.635, 0.665),
      ...folk.map(
        ([x, y, tx, ty], i): SignPart => ({
          name: `a place of the folk ${i + 1}`,
          svg: someone(x, y, 1.4),
          keys: track({
            xy: [
              [0.645, 0, 0],
              [0.685, n(tx - x), n(ty - y)]
            ]
          })
        })
      ),
      { name: "their voices: greeting her", svg: arcs(48.6, 102.4, VOICE), keys: showFor(0.69, 0.7, 0.775, 0.785), loop: speaking },
      {
        name: "that food: a dish of it",
        svg: dish(68, 104.6) + silq(67, 103.4).replace(/<path[^>]*>/, ""),
        keys: track({
          opacity: [
            [0.78, 0],
            [0.79, 1]
          ],
          xy: [
            [0.79, 0, 0],
            [0.83, -18, 1.2]
          ]
        })
      },
      { name: "longing for Friday: a warm glow about them all", svg: glow(46, 103.6, 9, WARM, 0.3), keys: showAt(0.9, 0.94) }
    ],
    words: [
      { text: "There was a woman among us", from: 0.02, to: 0.14 },
      { text: "She sowed silq by the streams of her farm", from: 0.155, to: 0.26 },
      { text: "On Friday she pulled up the silq's roots", from: 0.275, to: 0.38 },
      { text: "And put them in a pot", from: 0.395, to: 0.5 },
      { text: "With a handful of barley she had ground", from: 0.515, to: 0.62 },
      { text: "Leaving Jumu'ah, we would greet her", from: 0.635, to: 0.76 },
      { text: "And she set that food before us", from: 0.775, to: 0.88 },
      { text: "We longed for Friday for that food of hers", from: 0.895, to: 1 }
    ]
  };
}

/** Five gold dinars in a little heap, about (x, y). */
const dinars = (x: number, y: number) =>
  [
    [-1.8, 0.4],
    [0, 0.2],
    [1.8, 0.5],
    [-0.9, -1.1],
    [0.9, -1.2]
  ]
    .map(([dx, dy]) => goldCoin(n(x + dx), n(y + dy), 1.1))
    .join("");

// What you meant. Ma'n ibn Yazid said: my father Yazid took out some dinars to give in charity and left them with a
// man in the masjid. I came, took them, and brought them to him. He said: by Allah, it was not you I meant. So I took
// the case to the Messenger of Allah ﷺ, and he said: you have what you intended, O Yazid, and you have what you took,
// O Ma'n (Sahih al-Bukhari 1422). No one is drawn: by his home, Yazid's place has five dinars, a soft glint on them.
// It takes them to a place in the masjid, leaves them there and goes back. Ma'n's place comes, takes them and brings
// them to Yazid's place; Yazid's voice speaks, and a faint grey ring comes about the dinars. Both go to his place, a
// golden ring, by the masjid. His voice speaks: a soft golden ring and small lights come about Yazid's place; his voice
// speaks again: a soft golden ring comes about Ma'n's place and the dinars, and a warm glow about them both.
function whatYouMeant(): SignArt {
  return {
    kind: "what-you-meant",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "a cloud", svg: cloud(120, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [12, 76],
          [140, 74],
          [20, 116],
          [128, 116]
        ])
      },
      ...palms([
        [8, 98, 13],
        [148, 96, 14]
      ]),
      { name: "Yazid's home", svg: home(30, 99, 20, 13) },
      { name: "the masjid of Madinah", svg: madinahMasjid(60, 95, 1) },
      { name: "a place in the masjid", svg: someone(72, 99.4, 1.5) },
      { name: "his place, a golden ring", svg: ring(98, 99.6, 2.6, GOLD) },
      {
        name: "Yazid's place",
        svg: someone(42, 101, 1.5),
        keys: track({
          xy: [
            [0.205, 0, 0],
            [0.235, 24, 0.2],
            [0.245, 24, 0.2],
            [0.27, 0, 0],
            [0.61, 0, 0],
            [0.67, 50, 0.4]
          ]
        })
      },
      {
        name: "Ma'n's place",
        svg: someone(132, 103, 1.5),
        keys: track({
          xy: [
            [0.335, 0, 0],
            [0.365, -52, -2.4],
            [0.37, -52, -2.4],
            [0.4, -84, -1.6],
            [0.61, -84, -1.6],
            [0.67, -26, 0.6]
          ]
        })
      },
      {
        name: "the dinars",
        svg: dinars(42, 97.4),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.07, 1]
          ],
          xy: [
            [0.205, 0, 0],
            [0.235, 24, 0.2],
            [0.245, 34.4, 2.2],
            [0.37, 34.4, 2.2],
            [0.4, 6, 1.2],
            [0.61, 6, 1.2],
            [0.67, 64, 3.4]
          ]
        })
      },
      {
        name: "for charity: a soft glint on them",
        svg: sparkle(43.6, 95.4, 1, "#FFF3C0") + sparkle(40.4, 96.4, 0.7, "#FFF3C0"),
        keys: showFor(0.08, 0.11, 0.195, 0.205),
        loop: { move: "twinkle", ms: 1200, low: 0.3 }
      },
      { name: "Yazid's voice: I meant not you", svg: arcsLeft(45.4, 98.6, VOICE), keys: showFor(0.465, 0.475, 0.535, 0.545), loop: speaking },
      { name: "not meant for Ma'n: a faint grey ring about the dinars", svg: greyRing(48, 98.6, 3.6, 2), keys: showFor(0.48, 0.5, 0.6, 0.61) },
      { name: "his voice: yours is what you meant", svg: arcsLeft(95.4, 97.6, GOLD), keys: showFor(0.735, 0.745, 0.805, 0.815), loop: speaking },
      { name: "Yazid's intention: a soft golden ring about Yazid's place", svg: care(92, 101.4, 3.6, 2, GOLD), keys: showAt(0.75, 0.77), loop: soft },
      {
        name: "rewarded: small lights about Yazid's place",
        svg: sparkle(88.6, 97.6, 0.9, "#FFE7A0") + sparkle(92, 96.2, 1.1, "#FFE7A0") + sparkle(95.2, 97.8, 0.9, "#FFE7A0"),
        keys: showAt(0.76, 0.79),
        loop: { move: "twinkle", ms: 1400, low: 0.4 }
      },
      { name: "his voice: yours is what you took", svg: arcs(100.6, 97.6, GOLD), keys: showFor(0.87, 0.88, 0.94, 0.95), loop: speaking },
      { name: "Ma'n's to keep: a soft golden ring about Ma'n's place and the dinars", svg: care(106, 102.4, 4.2, 2.8, GOLD), keys: showAt(0.885, 0.905), loop: soft },
      { name: "a warm glow about them both", svg: glow(99, 101, 11, WARM, 0.25), keys: showAt(0.9, 0.94) }
    ],
    words: [
      { text: "My father Yazid took dinars for charity", from: 0.02, to: 0.18 },
      { text: "And left them with a man in the masjid", from: 0.195, to: 0.315 },
      { text: "I took them and brought them to my father", from: 0.33, to: 0.45 },
      { text: "My father said: by Allah, I meant not you", from: 0.465, to: 0.585 },
      { text: "So I took the case to him", from: 0.6, to: 0.72 },
      { text: "He said: yours is what you meant, Yazid", from: 0.735, to: 0.855 },
      { text: "And yours is what you took, Ma'n", from: 0.87, to: 1 }
    ]
  };
}

/** A cloth of wool, folded, its foot's middle at (x, y): dark, with marks on it, or plain. */
const woolCloth = (x: number, y: number, marked: boolean) =>
  `<path d="M${n(x - 3.8)} ${y} L${n(x + 3.8)} ${y} L${n(x + 3.2)} ${n(y - 3.4)} L${n(x - 3.2)} ${n(y - 3.4)} Z" fill="${marked ? "#3B3B4F" : "#8C7A63"}"/>` +
  (marked
    ? `<path d="M${n(x - 3.5)} ${n(y - 0.7)} L${n(x + 3.5)} ${n(y - 0.7)} M${n(x - 3.1)} ${n(y - 2.7)} L${n(x + 3.1)} ${n(y - 2.7)}" stroke="#E8C45A" stroke-width="0.6"/>` +
      [-2, 0, 2].map((dx) => `<rect x="${n(x + dx - 0.5)}" y="${n(y - 2.2)}" width="1" height="1" fill="#E8C45A"/>`).join("")
    : `<path d="M${n(x - 3.3)} ${n(y - 1.7)} L${n(x + 3.3)} ${n(y - 1.7)}" stroke="#7A6A55" stroke-width="0.3"/>`);

// The cloth with marks. Aishah said: the Prophet ﷺ prayed in a cloth with marks on it, and said: its marks drew my
// mind away. Take it to Abu Jahm, and bring me a plain one (Sahih al-Bukhari 752). No one is drawn: in the masjid,
// under its roof of palm leaves, his place, a golden ring, prays, a dark cloth with marks with it, and sparks of the
// prayer rise. Glints show on the marks, a faint grey line goes from them to his place, and his voice speaks. A way
// shows to Abu Jahm's home, and the cloth goes along it to Abu Jahm's place; a plain cloth comes back from there to
// his place. A soft glow comes about his place, and a spark of the prayer rises.
function markedCloth(): SignArt {
  return {
    kind: "marked-cloth",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(136, 18) },
      { name: "a cloud", svg: cloud(70, 22, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 7000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [128, 76],
          [150, 114],
          [118, 116]
        ])
      },
      {
        name: "the masjid's wall of mud brick",
        svg:
          `<rect x="0" y="66" width="114" height="36" fill="#D8B98A"/>` +
          `<path d="${Array.from({ length: 5 }, (_, k) => `M0 ${72 + 6 * k} L114 ${72 + 6 * k}`).join(" ")}" stroke="#C5A271" stroke-width="0.4"/>` +
          `<path d="M114 66 L114 102" stroke="#B89A6C" stroke-width="0.6"/>`
      },
      { name: "the floor of the masjid", svg: `<rect x="0" y="102" width="114" height="18" fill="#E8D3A6"/>` + tuft(130, 108, "#A99A5A", 3.4) },
      { name: "the roof of palm leaves on palm trunks", svg: roofOnTrunks(10, 110) },
      { name: "his place, a golden ring", svg: ring(60, 101.6, 2.6, GOLD) },
      spark("the prayer: a spark rising 1", 60, 96, 0.05, 0.11),
      spark("the prayer: a spark rising 2", 60, 96, 0.13, 0.19),
      { name: "Abu Jahm's home", svg: home(138, 99, 18, 12) },
      { name: "Abu Jahm's place", svg: someone(130, 101.4, 1.5) },
      {
        name: "the cloth with marks, with his place",
        svg: woolCloth(67, 105, true),
        keys: track({
          xy: [
            [0.52, 0, 0],
            [0.62, 62, 0.4]
          ]
        })
      },
      { name: "his voice: its marks drew my mind", svg: arcsLeft(57.4, 99.4, GOLD), keys: showFor(0.265, 0.275, 0.43, 0.44), loop: speaking },
      {
        name: "its marks: glints on them",
        svg: sparkle(65, 102.8, 0.8, "#FFF3C0") + sparkle(69, 102.8, 0.8, "#FFF3C0"),
        keys: showFor(0.28, 0.31, 0.5, 0.52),
        loop: { move: "twinkle", ms: 900, low: 0.2 }
      },
      { name: "drawing his mind: a faint grey line from the marks to his place", svg: lookLine(66.4, 101.2, 61.2, 99.4, 96.4, GREY), keys: showFor(0.31, 0.34, 0.5, 0.52) },
      { name: "the way to Abu Jahm's home", svg: way("M72 104.6 Q100 107.6 126 104"), keys: showAt(0.5, 0.52) },
      {
        name: "a plain cloth",
        svg: woolCloth(126, 105, false),
        keys: track({
          opacity: [
            [0.745, 0],
            [0.755, 1]
          ],
          xy: [
            [0.76, 0, 0],
            [0.85, -59, 0]
          ]
        })
      },
      { name: "calm: a soft glow about his place", svg: glow(60, 101, 6, WARM, 0.3), keys: showAt(0.86, 0.9) },
      spark("the prayer, calm: a spark rising", 60, 96, 0.89, 0.95)
    ],
    words: [
      { text: "He prayed in a cloth with marks on it", from: 0.02, to: 0.24 },
      { text: "He said: its marks drew my mind away", from: 0.26, to: 0.48 },
      { text: "Take it to Abu Jahm", from: 0.5, to: 0.72 },
      { text: "And bring me a plain one", from: 0.74, to: 1 }
    ]
  };
}

/** A small basket of date stones, its foot's middle at (x, y). */
const stonesBasket = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y - 1.8)} L${n(x + 2.4)} ${n(y - 1.8)} L${n(x + 1.6)} ${y} L${n(x - 1.6)} ${y} Z" fill="#B88A4A"/>` +
  [
    [-1.4, -2.4],
    [0, -2.7],
    [1.4, -2.4],
    [-0.7, -3.4],
    [0.7, -3.4]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.7" ry="0.45" fill="#8B5A3C"/>`)
    .join("");

/** A heap of date stones, its foot's middle at (x, y), `w` wide. */
const stonesHeap = (x: number, y: number, w: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - w * 0.5)} ${n(x + w / 2)} ${y} Z" fill="#9A6A48"/>` +
  Array.from({ length: Math.round(w / 1.6) }, (_, i) => `<ellipse cx="${n(x - w / 2 + 0.9 + i * 1.6)}" cy="${n(y - 0.5 - (i % 2) * 0.6)}" rx="0.6" ry="0.4" fill="#6E4428"/>`).join("");

// The date stones. Asma bint Abi Bakr said: I used to carry the date stones on my head from the land of az-Zubair that
// the Messenger of Allah ﷺ had given him, and it was two thirds of a farsakh from my house (Sahih al-Bukhari 3151). No
// one is drawn: on the right, the palms of az-Zubair's land and date stones heaped in it; on the left, her house, and a
// long way between. Her place, a basket of date stones over it, goes along the way to her house and sets them down;
// a soft golden ring comes about the land he gave az-Zubair, and her place goes back. A faint line of one farsakh in
// three parts shows below the way, and a golden line grows over two of them: the way is two thirds of it. Her place
// brings the date stones again, and the heap by her house grows.
function dateStones(): SignArt {
  const way1: [number, number, number][] = [
    [0, 0, 0],
    [0.2, -24, 2],
    [0.45, -50, 2.8],
    [0.7, -74, 1.8],
    [1, -96, -0.2]
  ];
  const along = (from: number, to: number, back = false) =>
    (back ? [...way1].reverse() : way1).map(([k, x, y], i): [number, number, number] => [at3(from + (to - from) * (back ? i / 4 : k)), x, y]);
  const there = along(0.04, 0.26);
  const backAgain = along(0.4, 0.59, true);
  const again = along(0.7, 0.91);
  return {
    kind: "date-stones",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "a cloud", svg: cloud(90, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 7000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [46, 76],
          [98, 74],
          [60, 116],
          [100, 114]
        ])
      },
      { name: "her house", svg: home(22, 99, 18, 12) },
      ...palms(
        [
          [124, 96, 13],
          [138, 94, 15],
          [151, 97, 12]
        ],
        "az-Zubair's land"
      ),
      { name: "date stones heaped in az-Zubair's land", svg: stonesHeap(134, 103.4, 9) },
      { name: "the way from az-Zubair's land to her house", svg: way("M28 100.6 Q74 105.4 122 101.6", "#FFF0C4", 1) },
      { name: "the land he gave az-Zubair: a soft golden ring about it", svg: care(137, 101.6, 17, 4.6, GOLD), keys: showAt(0.35, 0.39), loop: soft },
      {
        name: "her place",
        svg: someone(124, 101.4, 1.5),
        keys: track({ xy: [...there, ...backAgain, ...again] })
      },
      {
        name: "the date stones she carried",
        svg: stonesBasket(124, 98.4),
        keys: track({
          opacity: [
            [0.265, 1],
            [0.275, 0],
            [0.585, 0],
            [0.595, 1],
            [0.915, 1],
            [0.925, 0]
          ],
          xy: [...there, [0.35, -96, -0.2], [0.355, 0, 0], [0.7, 0, 0], ...again.slice(1)]
        })
      },
      { name: "date stones by her house", svg: stonesHeap(30, 100.2, 5.6), keys: showAt(0.265, 0.275) },
      { name: "more date stones by her house", svg: stonesHeap(31, 100.4, 8.4), keys: showAt(0.915, 0.925) },
      {
        name: "a farsakh: a faint line in three parts",
        svg:
          `<path d="M34 107 L159 107" stroke="#FFFFFF" stroke-width="0.5" stroke-dasharray="1 1" opacity="0.8"/>` +
          [34, 75.7, 117.3, 159].map((x) => `<path d="M${x} 105.8 L${x} 108.2" stroke="#FFFFFF" stroke-width="0.5" opacity="0.8"/>`).join(""),
        keys: showAt(0.67, 0.69)
      },
      {
        name: "two thirds: a golden line over two of the parts",
        svg: goldLine(34, 117.3, 107, 0.9),
        origin: { x: 34, y: 107 },
        keys: track({
          opacity: [
            [0.69, 0],
            [0.695, 1]
          ],
          scaleX: [
            [0.69, 0.03],
            [0.76, 1]
          ]
        })
      }
    ],
    words: [
      { text: "I used to carry the date stones", from: 0.02, to: 0.32 },
      { text: "From the land he gave az-Zubair", from: 0.34, to: 0.64 },
      { text: "On my head, two thirds of a farsakh away", from: 0.66, to: 1 }
    ]
  };
}

// Words like no other. Ibn Abbas said: Dimad came to Makkah; he used to treat people with ruqyah. He met him and
// offered him ruqyah, and the Messenger of Allah ﷺ said: praise be to Allah, we praise Him and ask His help ... and I
// bear witness that there is no god but Allah. Dimad said: say these words of yours to me again, and he said them to
// him three times. Dimad said: I have heard the words of soothsayers, of magicians and of poets, but never words like
// these of yours; they reach the depths of the sea. Give me your hand, and I will pledge to you on Islam (Sahih Muslim
// 868). No one is drawn: in Makkah, the Ka'bah far off, and far off on the right, the sea. Dimad's place comes along
// the way to his place, a golden ring. His voice speaks, and a spark rises, the praise; it speaks again, and a spark
// rises, the witness; then three small lights show over his place, one by one: he said them three times. Dimad's
// voice speaks, and faint grey arcs show far off and fade, the words he had heard before; then a soft golden glow
// comes about his place: never words like these. Soft glints show in the far sea, and a golden wash on it: they reach
// its depths. Dimad's voice speaks again, a soft golden ring comes about them both, and a spark rises: his Islam.
function likeNoOther(): SignArt {
  return {
    kind: "like-no-other",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(22, 18) },
      { name: "a cloud", svg: cloud(96, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "far off, the sea",
        svg: `<path d="M106 61 L160 61 L160 56.6 Q132 57.4 106 61 Z" fill="#6FA8CF"/><path d="M118 59.4 L132 58.6 M140 58.2 L154 57.6" stroke="#CFE6F5" stroke-width="0.4"/>`
      },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [14, 28, 24],
            [48, 20, 20],
            [84, 14, 18]
          ],
          61,
          "#B9A27A",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [22, 76],
          [120, 74],
          [34, 116],
          [112, 114]
        ])
      },
      { name: "the Ka'bah, far off", svg: kabahFar() },
      { name: "the way Dimad came", svg: way("M152 104.4 Q120 106.4 80 102.6", "#FFF0C4", 0.9) },
      { name: "his place, a golden ring", svg: ring(62, 101.4, 2.6, GOLD) },
      {
        name: "Dimad's place",
        svg: someone(134, 104.6, 1.5),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, -58, -2.2]
          ]
        })
      },
      { name: "his voice: the words of praise", svg: arcs(65, 99, GOLD), keys: showFor(0.155, 0.165, 0.21, 0.22), loop: speaking },
      spark("the praise: a spark rising", 62, 95, 0.17, 0.215),
      { name: "his voice: the witness", svg: arcs(65, 99, GOLD), keys: showFor(0.275, 0.285, 0.33, 0.34), loop: speaking },
      spark("the witness: a spark rising", 62, 95, 0.29, 0.335),
      { name: "his voice: the words again", svg: arcs(65, 99, GOLD), keys: showFor(0.395, 0.405, 0.45, 0.46), loop: speaking },
      ...[
        [57.6, 95.4],
        [62, 94.4],
        [66.4, 95.4]
      ].map(
        ([x, y], i): SignPart => ({
          name: `said again: a small light ${i + 1}`,
          svg: glow(x, y, 1.8, WARM, 0.4) + sparkle(x, y, 0.8, "#E8A93A"),
          keys: showAt(at3(0.405 + i * 0.02), at3(0.415 + i * 0.02))
        })
      ),
      { name: "Dimad's voice: soothsayers, magicians, poets", svg: arcsLeft(73.6, 100.2, VOICE), keys: showFor(0.515, 0.525, 0.57, 0.58), loop: speaking },
      {
        name: "the words he had heard before: faint grey arcs far off",
        svg: [
          [18, 82],
          [32, 78.6],
          [44, 83.4]
        ]
          .map(([x, y]) => arcs(x, y, "#A8A29C"))
          .join(""),
        keys: showFor(0.525, 0.545, 0.565, 0.58)
      },
      { name: "Dimad's voice: never words like these", svg: arcsLeft(73.6, 100.2, VOICE), keys: showFor(0.635, 0.645, 0.69, 0.7), loop: speaking },
      { name: "like no other: a soft golden glow about his place", svg: glow(62, 100.6, 6, WARM, 0.35), keys: showAt(0.65, 0.69) },
      { name: "Dimad's voice: they reach the depths of the sea", svg: arcsLeft(73.6, 100.2, VOICE), keys: showFor(0.755, 0.765, 0.81, 0.82), loop: speaking },
      {
        name: "the depths of the sea: soft glints in the far sea",
        svg: sparkle(122, 59.6, 0.8, "#FFF3C0") + sparkle(136, 59, 0.9, "#FFF3C0") + sparkle(150, 58.4, 0.8, "#FFF3C0"),
        keys: showAt(0.765, 0.79),
        loop: { move: "twinkle", ms: 1200, low: 0.3 }
      },
      { name: "a soft golden wash on the far sea", svg: wash(134, 59.2, 26, 2.4, WARM, 0.16), keys: showAt(0.77, 0.81) },
      { name: "Dimad's voice: I pledge to you on Islam", svg: arcsLeft(73.6, 100.2, VOICE), keys: showFor(0.875, 0.885, 0.93, 0.94), loop: speaking },
      { name: "the pledge: a soft golden ring about them both", svg: care(69, 102, 11, 3.4, GOLD), keys: showAt(0.89, 0.91), loop: soft },
      spark("Islam: a spark rising", 76, 97, 0.905, 0.955)
    ],
    words: [
      { text: "Dimad, who gave ruqyah, came to Makkah", from: 0.02, to: 0.14 },
      { text: "He said: praise be to Allah; we praise Him", from: 0.155, to: 0.26 },
      { text: "I bear witness: there is no god but Allah", from: 0.275, to: 0.38 },
      { text: "He said them thrice, and Dimad said:", from: 0.395, to: 0.5 },
      { text: "I heard soothsayers, magicians and poets", from: 0.515, to: 0.62 },
      { text: "But never words like these of yours", from: 0.635, to: 0.74 },
      { text: "They reach the depths of the sea", from: 0.755, to: 0.86 },
      { text: "Give your hand: I pledge to you on Islam", from: 0.875, to: 1 }
    ]
  };
}

/** A point on the way over the hill, `u` along it from 0 (its foot on the left) to 1 (its foot on the right). */
const overTheHill = (u: number): [number, number] => {
  const curves: [number, number][][] = [
    [
      [0, 108],
      [40, 106],
      [62, 90]
    ],
    [
      [62, 90],
      [80, 78],
      [98, 90]
    ],
    [
      [98, 90],
      [120, 106],
      [160, 108]
    ]
  ];
  const k = Math.min(2, Math.floor(u * 3));
  const t = u * 3 - k;
  const [a, b, c] = curves[k];
  return [n((1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t ** 2 * c[0]), n((1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t ** 2 * c[1])];
};

// Going up and coming down. Jabir ibn Abdullah said: whenever we went up a place we would say: Allahu akbar, and
// whenever we went down we would say: subhan Allah (Sahih al-Bukhari 2993). No one is drawn: a way goes over a hill,
// and the places of two travellers and their camel come up it from the left; as they go up, sparks rise, the takbir.
// Over the top, they come down the other side, and sparks rise again, the tasbih.
function upAndDown(): SignArt {
  const up: [number, number] = [0.04, 0.4];
  const down: [number, number] = [0.54, 0.92];
  const steps = 8;
  // Who goes where along the way: its middle at u when the walk starts, how far ahead of the camel, and how high over
  // the ground its middle is.
  const mover = (lead: number, lift: number) => {
    const start = overTheHill(0.1 + lead);
    const xy: [number, number, number][] = [];
    for (const [[from, to], [u0, u1]] of [
      [up, [0.1, 0.5]],
      [down, [0.5, 0.9]]
    ] as [[number, number], [number, number]][]) {
      for (let i = 0; i <= steps; i += 1) {
        const [x, y] = overTheHill(u0 + lead + ((u1 - u0) * i) / steps);
        xy.push([at3(from + ((to - from) * i) / steps), n(x - start[0]), n(y - start[1])]);
      }
    }
    return { start: [start[0], n(start[1] - lift)] as [number, number], keys: track({ xy }) };
  };
  const beast = mover(0, 0);
  const first = mover(0.05, 1.8);
  const second = mover(-0.05, 1.8);
  const sparkAt = (u: number, from: number, to: number, name: string, color: string): SignPart => {
    const [x, y] = overTheHill(u + 0.05);
    return { name, svg: sparkle(x, n(y - 5), 1.6, color), keys: sparkRising(from, to), loop: { move: "twinkle", ms: 900, low: 0.5 } };
  };
  return {
    kind: "up-and-down",
    ms: 6000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(40, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 6000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: landOf([[20, 76], [140, 74]]) },
      { name: "a hill on the way", svg: `<path d="M0 108 Q40 106 62 90 Q80 78 98 90 Q120 106 160 108 L160 120 L0 120 Z" fill="#D9BF8C"/><path d="M0 108 Q40 106 62 90 Q80 78 98 90 Q120 106 160 108" stroke="#C4A774" stroke-width="0.7" fill="none"/>` },
      { name: "the way over the hill", svg: way("M2 107 Q40 105 62 89 Q80 77 98 89 Q120 105 158 107", "#FFF0C4", 0.9) },
      { name: "their camel", svg: camel(beast.start[0], beast.start[1], 0.15), keys: beast.keys },
      { name: "a traveller's place 1", svg: someone(first.start[0], first.start[1], 1.5), keys: first.keys },
      { name: "a traveller's place 2", svg: someone(second.start[0], second.start[1], 1.5), keys: second.keys },
      sparkAt(0.2, 0.1, 0.17, "the takbir: a spark rising 1", "#FFE7A0"),
      sparkAt(0.3, 0.2, 0.27, "the takbir: a spark rising 2", "#FFE7A0"),
      sparkAt(0.42, 0.31, 0.38, "the takbir: a spark rising 3", "#FFE7A0"),
      sparkAt(0.6, 0.62, 0.69, "the tasbih: a spark rising 1", "#E6F2FF"),
      sparkAt(0.7, 0.72, 0.79, "the tasbih: a spark rising 2", "#E6F2FF"),
      sparkAt(0.82, 0.82, 0.89, "the tasbih: a spark rising 3", "#E6F2FF")
    ],
    words: [
      { text: "When we went up, we said: Allahu akbar", from: 0.02, to: 0.49 },
      { text: "When we went down, we said: subhan Allah", from: 0.51, to: 1 }
    ]
  };
}

export const HUMBLE_ART = {
  "three-came": threeCame,
  "friday-silq": fridaySilq,
  "what-you-meant": whatYouMeant,
  "marked-cloth": markedCloth,
  "date-stones": dateStones,
  "like-no-other": likeNoOther,
  "up-and-down": upAndDown
};
