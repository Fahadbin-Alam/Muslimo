import { cloud, glow, n, palm, sky, type SignArt, type SignKeys } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { crooked, DARK, DIM, GREY, goodLight, speck } from "./lovedArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * What the Prophet ﷺ taught of a good character, drawn as the scenes of the deeds Allah loves are (lovedArt.ts): a
 * mustard seed of pride, and the beauty Allah loves; what backbiting is, and slander; the one who looks after an orphan,
 * near him in Paradise; the Muslim others are safe from, and the one who leaves what Allah forbade; a word of refuge for
 * anger; the gate ar-Rayyan for those who fast; and making things easy for people. Only the land, the sky, buildings,
 * things and plants are drawn. No Prophet and no person is ever drawn, not even a hand or a face: where someone went, a
 * dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is
 * drawn for Allah and nothing comes down from the sky: good words and glad tidings are sparks rising, care and calm are
 * a warm glow, and Paradise is a light far off, or a light beyond a gate.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** The red of anger. */
const RED = "#D8513A";

/** A mustard seed at (x, y), so small it is hardly there, with a dark halo: pride, however little. */
const mustardSeed = (x: number, y: number) => glow(x, y, 1.8, DARK, 0.3) + `<circle cx="${x}" cy="${y}" r="0.55" fill="${DARK}"/>`;

/** A fine garment, folded, its middle at (x, y). */
const garment = (x: number, y: number) =>
  `<path d="M${n(x - 4.6)} ${n(y + 1.8)} L${n(x + 4.6)} ${n(y + 1.8)} L${n(x + 4)} ${n(y - 1.8)} L${n(x - 4)} ${n(y - 1.8)} Z" fill="#F4EEE2" stroke="#C9B48A" stroke-width="0.4"/>` +
  `<path d="M${n(x - 3.8)} ${n(y - 0.4)} L${n(x + 3.8)} ${n(y - 0.4)} M${n(x - 4.2)} ${n(y + 0.8)} L${n(x + 4.2)} ${n(y + 0.8)}" stroke="#D8C7A2" stroke-width="0.35"/>` +
  `<path d="M${n(x - 4.3)} ${n(y + 1.2)} L${n(x + 4.3)} ${n(y + 1.2)}" stroke="#2F7D6A" stroke-width="0.5"/>`;

/** A pair of fine sandals, side by side, their middle at (x, y). */
const sandals = (x: number, y: number) =>
  [-1.6, 1.6]
    .map(
      (dx) =>
        `<ellipse cx="${n(x + dx)}" cy="${y}" rx="1.2" ry="2.6" fill="#9A6B3C"/><path d="M${n(x + dx - 1)} ${n(y - 1)} Q${n(x + dx)} ${n(y - 2.2)} ${n(x + dx + 1)} ${n(y - 1)}" stroke="#E0B86A" stroke-width="0.5" fill="none"/>`
    )
    .join("");

/** A mound of earth under (x, y), `w` across and `h` high, its foot at y. */
const mound = (x: number, y: number, w: number, h: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${n(x - w / 4)} ${n(y - h)} ${x} ${n(y - h)} Q${n(x + w / 4)} ${n(y - h)} ${n(x + w / 2)} ${y} Z" fill="#CDB487"/>`;

/** A dark stain over (x, y): a wrong said of someone that is not even true. */
const stain = (x: number, y: number) => glow(x, y, 3.4, DARK, 0.35) + `<circle cx="${x}" cy="${y}" r="1.6" fill="${DARK}"/>`;

/** A small crescent over (x, y): one who fasted. */
const fasted = (x: number, y: number) => crescent(x, y, 2.3, 1.2, "#E8C45A");

/** A few grey rocks along a steep way. */
const rocks = (list: [number, number, number][]) =>
  list.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.7)}" fill="#9C948A" stroke="#7D746C" stroke-width="0.3"/>`).join("");

// A mustard seed of pride. The Prophet ﷺ said: he who has in his heart the weight of a mustard seed of pride shall not
// enter Paradise. A man said: a man loves that his clothes be fine and his shoes be fine. He said: Allah is beautiful
// and loves beauty. Pride is rejecting the truth and looking down on people (Sahih Muslim 91). No one is drawn: in a
// place, a mustard seed of pride shows, and a shade comes on it; a way goes out from it toward a light far off, and
// breaks off before it; by the golden ring, his place, a voice asks, with a fine garment and fine sandals by it; a
// voice answers from the ring, and a warm glow comes on them, loved; then a light, the truth, comes to the proud place,
// a crooked voice turns it away and it goes back, dim; last, the place is raised on a mound, looking down on the others.
function mustardOfPride(): SignArt {
  const ringAt: [number, number] = [34, 99];
  const asker: [number, number] = [52, 99.4];
  const proud: [number, number] = [104, 98];
  const far: [number, number] = [148, 50];
  const raised: [number, number, number][] = [
    [0.87, 0, 0],
    [0.92, 0, -7]
  ];
  return {
    kind: "mustard-of-pride",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "clouds", svg: cloud(92, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(2, 92, 0.6) },
      { name: "a light far off, Paradise", svg: glow(far[0], far[1], 9, "#FFF3C0", 0.25) + sparkle(far[0], far[1], 2.4, SPARK), keys: showFrom(0.2, 0.23), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "a way toward it, breaking off", svg: way(`M${proud[0] + 4} 96.4 C116 90 124 82 130 74`, GOLD), keys: showFrom(0.22, 0.25) },
      { name: "the rest of the way, not reached", svg: way(`M133.6 69.6 C138 63 142 58 ${far[0] - 4} ${far[1] + 4}`, "#CFC8BE", 0.7), keys: showFrom(0.25, 0.28) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "someone asking, by his place", svg: someone(asker[0], asker[1], 1.6) },
      { name: "a fine garment", svg: garment(61, 102.4), keys: showFrom(0.38, 0.41) },
      { name: "fine sandals", svg: sandals(69.6, 103.4), keys: showFrom(0.4, 0.43) },
      { name: "a voice from him, asking", svg: arcs(asker[0] + 3.6, asker[1] - 3.4, VOICE), keys: showWhile(0.37, 0.39, 0.46, 0.48), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from his place, answering", svg: arcs(ringAt[0] + 4, ringAt[1] - 3.8, GOLD), keys: showWhile(0.55, 0.57, 0.64, 0.66), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "beauty, loved, a warm glow on them", svg: glow(65, 102.6, 8, WARM, 0.22), keys: showFrom(0.58, 0.62), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "beauty, sparkling", svg: sparkle(60, 98.4, 1.4, SPARK) + sparkle(70.4, 99.2, 1.2, SPARK), keys: showFrom(0.6, 0.63), loop: { move: "twinkle", ms: 1100, low: 0.4 } },
      { name: "the others, below", svg: someone(88, 104.4, 1.4, DIM) + someone(120, 104.6, 1.4, DIM) + someone(133, 102.6, 1.4, DIM) },
      { name: "a mound under his place, rising", svg: mound(proud[0], 101.6, 18, 8), origin: { x: proud[0], y: 101.6 }, keys: track({ scaleY: [[0.87, 0.12], [0.92, 1]] }) },
      { name: "a grey shade on his place", svg: wash(proud[0], proud[1], 7, 4, "#7D746C", 0.22), keys: track({ opacity: [[0.09, 0], [0.13, 1]], xy: raised }) },
      { name: "someone's place, proud", svg: someone(proud[0], proud[1], 1.8), keys: track({ xy: raised }) },
      { name: "a mustard seed of pride, within", svg: mustardSeed(proud[0], proud[1]), keys: track({ opacity: [[0.04, 0], [0.07, 1]], xy: raised }), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      {
        name: "the truth, a light coming to him",
        svg: goodLight(proud[0] - 14, proud[1] - 5),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.73, 1],
            [0.78, 1],
            [0.81, 0.35]
          ],
          xy: [
            [0.73, -48, 0],
            [0.77, 0, 0],
            [0.78, 0, 0],
            [0.81, -12, -7]
          ]
        })
      },
      { name: "a crooked voice from him, turning it away", svg: crooked(proud[0] - 7.4, proud[1] - 3.4), keys: showWhile(0.76, 0.77, 0.8, 0.82), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      { name: "a grey look down on them", svg: way("M101.4 92 L90 102 M107 92 L118.6 102.4 M108.6 91.6 L131.4 100.4", GREY, 0.6), keys: showFrom(0.92, 0.95) }
    ],
    words: [
      { text: "Whoever has a mustard seed of pride in his heart", from: 0.02, to: 0.18 },
      { text: "Will not enter Paradise", from: 0.2, to: 0.34 },
      { text: "A man said: one likes fine clothes and shoes", from: 0.36, to: 0.52 },
      { text: "Allah is beautiful and loves beauty", from: 0.54, to: 0.7 },
      { text: "Pride is rejecting the truth", from: 0.72, to: 0.85 },
      { text: "And looking down on people", from: 0.87, to: 1 }
    ]
  };
}

// What backbiting is. The Prophet ﷺ said: do you know what backbiting is? They said: Allah and His Messenger know best.
// He said: it is talking about your brother in a way he dislikes. It was said: what if my brother is as I say? He said:
// if he is as you say, you have backbitten him, and if he is not, you have slandered him (Sahih Muslim 2589). No one is
// drawn: by the masjid, a golden ring, his place, and the places of those sitting with him; a voice asks from the ring,
// and a voice answers from them; then a crooked voice from one of them speaks of his brother, who is away by his home,
// and dark specks go to him, and a grey dimness comes on his place; a voice asks; a fault shows on the brother, and a
// dark speck comes on the one who spoke; last, the fault is gone from the brother, and a dark stain comes on the one who
// spoke, worse.
function whatBackbitingIs(): SignArt {
  const ringAt: [number, number] = [34, 99];
  const sitting: [number, number][] = [
    [48, 100],
    [59, 99.6]
  ];
  const spoke: [number, number] = [70, 100];
  const brother: [number, number] = [124, 100.4];
  return {
    kind: "what-backbiting-is",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "clouds", svg: cloud(60, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(2, 92, 0.6) },
      { name: "the home of the one spoken of", svg: home(140, 95, 20, 14) },
      { name: "the place of the one spoken of, away by his home", svg: someone(brother[0], brother[1], 1.6) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "those sitting with him", svg: sitting.map(([x, y]) => someone(x, y, 1.5)).join("") },
      { name: "someone's place, the one who spoke", svg: someone(spoke[0], spoke[1], 1.6) },
      { name: "a voice from his place, asking", svg: arcs(ringAt[0] + 4, ringAt[1] - 3.8, GOLD), keys: showWhile(0.03, 0.05, 0.1, 0.12), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from those sitting, answering", svg: arcsLeft(sitting[0][0] - 3.4, sitting[0][1] - 3.6, VOICE), keys: showWhile(0.18, 0.2, 0.26, 0.28), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a crooked voice from him, speaking of the one away", svg: crooked(spoke[0] + 3.4, spoke[1] - 3.4), keys: showWhile(0.34, 0.35, 0.45, 0.47), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      ...[0, 1, 2].map((i) => ({
        name: `what he dislikes, going to him ${i + 1}`,
        svg: speck(brother[0] - 3, brother[1] - 4 + i * 1.6, 0.9),
        keys: track({
          opacity: [
            [0.36 + i * 0.02, 0],
            [0.37 + i * 0.02, 1],
            [0.42 + i * 0.02, 1],
            [0.43 + i * 0.02, 0]
          ],
          xy: [
            [0.37 + i * 0.02, n(spoke[0] + 6 - (brother[0] - 3)), n(-1 - i * 1.6)],
            [0.42 + i * 0.02, 0, 0]
          ]
        })
      })),
      { name: "a grey dimness on the one away, disliking it", svg: wash(brother[0], brother[1], 7, 3, "#8E8A84", 0.28), keys: showFrom(0.43, 0.47) },
      { name: "a voice from him, asking", svg: arcs(spoke[0] + 3.6, spoke[1] - 3.6, VOICE), keys: showWhile(0.54, 0.56, 0.61, 0.63), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "a fault, in the one away",
        svg: speck(brother[0], brother[1] - 3.8, 1),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.71, 1],
            [0.85, 1],
            [0.88, 0]
          ]
        })
      },
      { name: "backbiting, a dark speck on the one who spoke", svg: speck(spoke[0], spoke[1] - 3.8, 1.1), keys: showFrom(0.72, 0.75) },
      {
        name: "slander, a dark stain on the one who spoke",
        svg: stain(spoke[0], spoke[1] - 0.4),
        origin: { x: spoke[0], y: spoke[1] - 0.4 },
        keys: track({
          opacity: [
            [0.88, 0],
            [0.89, 1]
          ],
          scale: [
            [0.88, 0.4],
            [0.93, 1]
          ]
        })
      }
    ],
    words: [
      { text: "Do you know what backbiting is?", from: 0.02, to: 0.15 },
      { text: "They said: Allah and His Messenger know best", from: 0.17, to: 0.31 },
      { text: "Talking of your brother in a way he dislikes", from: 0.33, to: 0.51 },
      { text: "What if my brother is as I say?", from: 0.53, to: 0.66 },
      { text: "If it is in him, you have backbitten him", from: 0.68, to: 0.82 },
      { text: "If it is not, you have slandered him", from: 0.84, to: 1 }
    ]
  };
}

// The one who looks after an orphan. The Prophet ﷺ said: I and the one who looks after an orphan will be in Paradise
// like this, and he pointed with his index and middle fingers, keeping them a little apart (Sahih al-Bukhari 5304).
// No one is drawn, not even a hand: an orphan's place, alone and dim by a palm; a way goes from a home to it with a
// basket of dates, a warm glow comes on it, and the two go back to the home together, where a warm glow comes; then a
// golden way rises to a light far off, Paradise, where the golden ring, his place, shows; a light rises from the home
// along the way, and comes to rest beside the ring, a little apart, and a glow comes about the two.
function orphanCarer(): SignArt {
  const carer: [number, number] = [50, 99.6];
  const orphan: [number, number] = [106, 100];
  const far: [number, number] = [119, 50];
  const ringAt: [number, number] = [122, 50];
  const beside: [number, number] = [114.6, 50.6];
  const together: [number, number, number][] = [
    [0.2, 0, 0],
    [0.28, -42, 0]
  ];
  return {
    kind: "orphan-carer",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(26, 18) },
      { name: "clouds", svg: cloud(84, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a home", svg: home(38, 95, 20, 14) },
      { name: "a palm", svg: palm(114, 97, 15) },
      { name: "Paradise, a light far off", svg: glow(far[0], far[1], 13, "#FFF3C0", 0.28) + wash(far[0], far[1], 16, 7, "#FFFBEA", 0.14), keys: showFrom(0.38, 0.42), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "a golden way up to the light", svg: way(`M44 91 C60 76 88 60 ${ringAt[0] - 6} 52`, GOLD), keys: showFrom(0.4, 0.44) },
      { name: "a golden ring, his place, in the light", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD), keys: showFrom(0.43, 0.46) },
      { name: "a way to the orphan", svg: way(`M${carer[0] + 4} 100.8 C70 103.4 86 103.4 ${orphan[0] - 4} 101`, GOLD), keys: showFrom(0.04, 0.07) },
      { name: "an orphan's place, alone", svg: someone(orphan[0], orphan[1], 1.4, DIM), keys: track({ xy: together }) },
      { name: "a warm glow on the orphan, cared for", svg: glow(orphan[0], orphan[1], 6, WARM, 0.24), keys: track({ opacity: [[0.14, 0], [0.18, 1]], xy: together }), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "a basket of dates, for the orphan",
        svg: basketOfDates(orphan[0] - 7, 102.8),
        keys: track({
          opacity: [
            [0.06, 0],
            [0.07, 1]
          ],
          xy: [
            [0.07, -42, 0],
            [0.13, 0, 0],
            [0.2, 0, 0],
            [0.28, -42, 0]
          ]
        })
      },
      {
        name: "someone's place, looking after him",
        svg: someone(carer[0], carer[1], 1.7),
        keys: track({
          xy: [
            [0.07, 0, 0],
            [0.13, 42, 0.4],
            [0.2, 42, 0.4],
            [0.28, 0, 0.4]
          ]
        })
      },
      { name: "a warm glow on the home", svg: glow(38, 92, 14, WARM, 0.12), keys: showFrom(0.28, 0.32), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "his light, rising to the light",
        svg: goodLight(beside[0], beside[1]),
        keys: track({
          opacity: [
            [0.46, 0],
            [0.47, 1]
          ],
          xy: [
            [0.47, n(carer[0] + 4 - beside[0]), n(92 - beside[1])],
            [0.52, n(75.5 - beside[0]), n(68.9 - beside[1])],
            [0.58, n(106 - beside[0]), n(55 - beside[1])],
            [0.7, n(106 - beside[0]), n(55 - beside[1])],
            [0.76, 0, 0]
          ]
        })
      },
      { name: "a glow about the two, side by side", svg: glow(n((ringAt[0] + beside[0]) / 2), n((ringAt[1] + beside[1]) / 2), 9, WARM, 0.26), keys: showFrom(0.77, 0.82), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "I and the one who looks after an orphan", from: 0.02, to: 0.36 },
      { text: "Will be in Paradise like this", from: 0.38, to: 0.66 },
      { text: "He pointed with two fingers, a little apart", from: 0.68, to: 1 }
    ]
  };
}

// Safe from his tongue and hands. The Prophet ﷺ said: a Muslim is the one who avoids harming Muslims with his tongue and
// hands, and an emigrant is the one who gives up all that Allah has forbidden (Sahih al-Bukhari 10). No one is drawn:
// between two homes, a place; a calm comes on each home, and all around him; a gentle voice from him, good words rise,
// and the basket by the home next to him is kept safe, glowing; then dark specks, what Allah has forbidden, show about
// him; a way goes off from them, and he goes along it; the specks fade behind, and he comes to a light at its end.
function safeFromHarm(): SignArt {
  const at: [number, number] = [80, 99];
  const along: [number, number, number][] = [
    [0.56, 0, 0],
    [0.65, 30, -12],
    [0.74, 30, -12],
    [0.86, 60, -33]
  ];
  return {
    kind: "safe-from-harm",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a home to his left", svg: home(28, 95, 18, 13) },
      { name: "a home to his right", svg: home(134, 95, 18, 13) },
      { name: "those in the homes", svg: someone(40, 100, 1.5) + someone(122, 100, 1.5) },
      { name: "their basket of dates, by their home", svg: basketOfDates(112, 102.6) },
      { name: "a calm on the home to his left", svg: glow(28, 92, 12, WARM, 0.1), keys: showFrom(0.04, 0.08), loop: { move: "twinkle", ms: 1600, low: 0.8 } },
      { name: "a calm on the home to his right", svg: glow(134, 92, 12, WARM, 0.1), keys: showFrom(0.07, 0.11), loop: { move: "twinkle", ms: 1600, low: 0.8 } },
      { name: "safe all around him, a calm", svg: wash(at[0], 101, 46, 5, "#FFFBEA", 0.18), keys: showFrom(0.12, 0.17) },
      { name: "a gentle voice from him", svg: arcs(at[0] + 3.8, at[1] - 3.6, GOLD), keys: showWhile(0.27, 0.29, 0.39, 0.41), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks(
        "good words, rising",
        [
          [at[0] - 4, at[1] - 6],
          [at[0] + 1, at[1] - 8],
          [at[0] + 6, at[1] - 6]
        ],
        0.3,
        0.02,
        { color: SPARK, rise: 12, stay: true }
      ),
      { name: "their basket, kept safe", svg: glow(112, 101.6, 6, WARM, 0.24), keys: showFrom(0.36, 0.4), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...(
        [
          [70, 91],
          [63.6, 95.6],
          [88, 90]
        ] as [number, number][]
      ).map(([x, y], i) => ({
        name: `what is forbidden, a dark speck ${i + 1}`,
        svg: speck(x, y, 1.1),
        keys: track({
          opacity: [
            [0.49 + i * 0.01, 0],
            [0.51 + i * 0.01, 1],
            [0.74 + i * 0.01, 1],
            [0.78 + i * 0.01, 0]
          ]
        }),
        loop: { move: "bob" as const, ms: 2200, y: 0.6, phase: i * 0.3 }
      })),
      { name: "a way, leaving it all", svg: way(`M${at[0] + 4} 97.6 C96 94 104 90 110 87 C122 80 132 72 ${140 + 2} 67`, GOLD), keys: showFrom(0.51, 0.55) },
      { name: "a light at the end of the way", svg: goodLight(146, 63) + glow(146, 63, 8, "#FFF3C0", 0.2), keys: showFrom(0.78, 0.82), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "someone's place, safe to be near, then leaving", svg: someone(at[0], at[1], 1.8), keys: track({ xy: along }) }
    ],
    words: [
      { text: "A Muslim is the one who avoids harming Muslims", from: 0.02, to: 0.24 },
      { text: "With his tongue and hands", from: 0.26, to: 0.46 },
      { text: "And an emigrant is the one who gives up", from: 0.48, to: 0.7 },
      { text: "All that Allah has forbidden", from: 0.72, to: 1 }
    ]
  };
}

// A word of refuge for anger. Sulayman ibn Surad said: I was sitting with the Prophet ﷺ when two men abused each other,
// and the face of one of them became red with anger. The Prophet ﷺ said: I know a word that would calm him if he said
// it; if he said, I seek refuge with Allah from Satan, all his anger would go away. It was told to the angry one, and
// he said: am I mad? (Sahih al-Bukhari 3282). So he is not drawn saying the word, and his anger is not drawn going. No
// one is drawn, not even a face: by the masjid, a golden ring, his place, and one sitting with him; two places, and
// crooked voices go back and forth; a red glow of anger grows on one of them; a voice from the ring, and a golden light,
// the word, shows by it; the word goes to the angry place and stays by it, the red glow still on it; last, a faint calm
// shows by the word, what it would bring.
function refugeFromAnger(): SignArt {
  const ringAt: [number, number] = [34, 99];
  const first: [number, number] = [90, 99];
  const angry: [number, number] = [114, 99];
  return {
    kind: "refuge-from-anger",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "clouds", svg: cloud(62, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(2, 92, 0.6) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "one sitting with him", svg: someone(48, 100, 1.5) },
      { name: "the first one's place", svg: someone(first[0], first[1], 1.7) },
      { name: "the other one's place", svg: someone(angry[0], angry[1], 1.7) },
      { name: "a crooked voice from the first", svg: crooked(first[0] + 3.4, first[1] - 3.4), keys: showWhile(0.03, 0.04, 0.29, 0.31), loop: { move: "twinkle", ms: 700, low: 0.3 } },
      { name: "a crooked voice from the other", svg: crooked(angry[0] - 7.4, angry[1] - 5.4), keys: showWhile(0.05, 0.06, 0.29, 0.31), loop: { move: "twinkle", ms: 700, low: 0.3, phase: 0.5 } },
      {
        name: "a red glow of anger on him",
        svg: glow(angry[0], angry[1], 9, RED, 0.3),
        origin: { x: angry[0], y: angry[1] },
        keys: track({
          opacity: [
            [0.19, 0],
            [0.22, 1]
          ],
          scale: [
            [0.19, 0.4],
            [0.27, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 700, low: 0.6 }
      },
      {
        name: "his place, red with anger",
        svg: someone(angry[0], angry[1], 1.7, RED),
        origin: { x: angry[0], y: angry[1] },
        keys: track({
          opacity: [
            [0.2, 0],
            [0.23, 1]
          ],
          scale: [
            [0.2, 1],
            [0.26, 1.4]
          ]
        })
      },
      { name: "a voice from his place, telling of a word", svg: arcs(ringAt[0] + 4, ringAt[1] - 3.8, GOLD), keys: showWhile(0.37, 0.39, 0.46, 0.48), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "a word, a golden light",
        svg: goodLight(angry[0] - 4, angry[1] - 7),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.44, 1]
          ],
          xy: [
            [0.56, n(ringAt[0] + 8 - (angry[0] - 4)), -1],
            [0.64, 0, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      },
      { name: "what the word would bring: a faint calm by it", svg: wash(angry[0] - 4, angry[1] - 7, 7, 4.4, "#FFFBEA", 0.22), keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "Two men abused each other", from: 0.02, to: 0.16 },
      { text: "One of them became red with anger", from: 0.18, to: 0.34 },
      { text: "He said: I know a word to calm the man", from: 0.36, to: 0.52 },
      { text: "If the man says: I seek refuge with Allah", from: 0.54, to: 0.74 },
      { text: "All the man's anger would go away", from: 0.76, to: 1 }
    ]
  };
}

// The gate ar-Rayyan. The Prophet ﷺ said: in Paradise there is a gate called ar-Rayyan; those who fast will enter
// through it on the Day of Resurrection, and none but them will enter through it. It will be said: where are those who
// used to fast? They will get up, and none but them will enter through it; and when they have entered, it will be
// closed (Sahih al-Bukhari 1896). No one is drawn: on a rise, a gate, a light beyond it; three places, a small crescent
// over each, those who fasted, and a golden way from them to the gate; two other places, their grey way stopping short;
// a warm glow on those who fasted, called; the gate's doors open, they get up and go along the way, and in; last, the
// doors close.
function gateArRayyan(): SignArt {
  const gate = { x: 120, top: 60, base: 84, half: 9.6 };
  const doorTop = gate.top + 5;
  const doorH = gate.base - doorTop;
  const fasting: [number, number][] = [
    [34, 101],
    [46, 102.4],
    [58, 101]
  ];
  const doors = track({
    scaleX: [
      [0.7, 1],
      [0.73, 0.14],
      [0.87, 0.14],
      [0.9, 1]
    ]
  });
  const goesIn = (x: number, y: number) =>
    track({
      opacity: [
        [0.78, 1],
        [0.8, 0]
      ],
      xy: [
        [0.69, 0, 0],
        [0.7, 0, -2],
        [0.78, n(gate.x - x), n(gate.base - 2 - y)]
      ]
    });
  return {
    kind: "gate-ar-rayyan",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#D2E8F6", "#EDE0BC", 61) },
      { name: "clouds", svg: cloud(36, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a rise", svg: mound(gate.x, 98, 64, 16) },
      { name: "a light beyond the gate", svg: `<rect x="${gate.x - gate.half}" y="${doorTop}" width="${gate.half * 2}" height="${doorH}" fill="#FFF3C8"/>` + glow(gate.x, 74, 8, "#FFFFFF", 0.3), keys: showFrom(0.03, 0.07), loop: { move: "twinkle", ms: 1800, low: 0.85 } },
      { name: "the gate's door on the left, open, then shut", svg: `<rect x="${gate.x - gate.half}" y="${doorTop}" width="${gate.half}" height="${doorH}" fill="#C9A25C" stroke="#9C7838" stroke-width="0.5"/><circle cx="${gate.x - 1.6}" cy="${n(doorTop + doorH * 0.55)}" r="0.6" fill="#7A5A28"/>`, origin: { x: gate.x - gate.half, y: n(doorTop + doorH / 2) }, keys: doors },
      { name: "the gate's door on the right, open, then shut", svg: `<rect x="${gate.x}" y="${doorTop}" width="${gate.half}" height="${doorH}" fill="#C9A25C" stroke="#9C7838" stroke-width="0.5"/><circle cx="${gate.x + 1.6}" cy="${n(doorTop + doorH * 0.55)}" r="0.6" fill="#7A5A28"/>`, origin: { x: gate.x + gate.half, y: n(doorTop + doorH / 2) }, keys: doors },
      {
        name: "a gate, ar-Rayyan",
        svg:
          `<path d="M${gate.x - gate.half - 2.4} ${gate.base} L${gate.x - gate.half - 2.4} ${doorTop} Q${gate.x - gate.half - 2.4} ${gate.top - 3} ${gate.x} ${gate.top - 4} Q${gate.x + gate.half + 2.4} ${gate.top - 3} ${gate.x + gate.half + 2.4} ${doorTop} L${gate.x + gate.half + 2.4} ${gate.base}" stroke="#B88A3E" stroke-width="2.4" fill="none"/>` +
          `<path d="M${gate.x - gate.half - 1} ${doorTop} Q${gate.x} ${gate.top - 1.6} ${gate.x + gate.half + 1} ${doorTop}" stroke="#E8C45A" stroke-width="0.7" fill="none"/>`
      },
      { name: "a golden way to the gate", svg: way(`M62 100 C80 98 98 94 ${gate.x - 4} ${gate.base - 1}`, GOLD), keys: showFrom(0.24, 0.28) },
      { name: "two other places", svg: someone(142, 104, 1.5, DIM) + someone(153, 103, 1.5, DIM) },
      { name: "their grey way, stopping short", svg: way(`M140 101.4 C136 96 133 91 ${gate.x + gate.half + 6} 88`, GREY, 0.9), keys: showFrom(0.38, 0.42) },
      ...fasting.map(([x, y], i) => ({ name: `a warm glow on one who fasted, called ${i + 1}`, svg: glow(x, y, 5, WARM, 0.26), keys: track({ opacity: [[0.53, 0], [0.57, 1], [0.69, 1], [0.7, 0]] }), loop: { move: "twinkle" as const, ms: 1300, low: 0.6 } })),
      ...fasting.map(([x, y], i) => ({ name: `one who fasted ${i + 1}`, svg: someone(x, y, 1.6), keys: goesIn(x, y) })),
      ...fasting.map(([x, y], i) => ({ name: `a crescent over one who fasted ${i + 1}`, svg: fasted(x, y - 5.4), keys: track({ opacity: [[0.2, 0], [0.23, 1], [0.78, 1], [0.8, 0]], xy: [[0.69, 0, 0], [0.7, 0, -2], [0.78, n(gate.x - x), n(gate.base - 2 - y)]] }) }))
    ],
    words: [
      { text: "In Paradise there is a gate called ar-Rayyan", from: 0.02, to: 0.17 },
      { text: "Those who fast will enter through it", from: 0.19, to: 0.34 },
      { text: "None but them will enter through it", from: 0.36, to: 0.5 },
      { text: "Where are those who used to fast?", from: 0.52, to: 0.66 },
      { text: "They will get up and enter", from: 0.68, to: 0.84 },
      { text: "Then it will be closed", from: 0.86, to: 1 }
    ]
  };
}

// Make things easy. The Prophet ﷺ said: make things easy for people and do not make them hard; give them good tidings
// and do not make them run away (Sahih al-Bukhari 69). No one is drawn: by the masjid, the place of one who teaches;
// far off, the places of a few coming; an easy, smooth way opens to the masjid and they come along it; a hard, steep way
// over rocks shows, and fades away; a voice from the one who teaches gives good tidings, sparks rise over them and a
// warm glow comes on them; last, they come on to the masjid, and one at the edge, going off, turns and comes too.
function makeItEasy(): SignArt {
  const teaches: [number, number] = [100, 99.4];
  const coming: [number, number][] = [
    [14, 101],
    [22, 103],
    [30, 100]
  ];
  const onTheWay: [number, number, number][] = [
    [0.09, 0, 0],
    [0.18, 36, 0],
    [0.74, 36, 0],
    [0.84, 58, -0.6]
  ];
  return {
    kind: "make-it-easy",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(108, 92, 0.9) },
      { name: "the place of one who teaches", svg: someone(teaches[0], teaches[1], 1.8) },
      { name: "an easy way, smooth, to the masjid", svg: way(`M34 101.4 C54 103.4 76 103.4 ${teaches[0] - 6} 100.6`, GOLD, 1.4), keys: showFrom(0.04, 0.08) },
      {
        name: "a hard way, steep, over the rocks",
        svg: way("M30 98 L38 84 L46 92 L54 78 L62 88 L70 74 L80 86 L92 96", GREY, 0.9) + rocks([[38, 86.4, 2.2], [54, 80.6, 2.6], [70, 76.6, 2.4], [62, 90, 1.8], [46, 94, 1.6]]),
        keys: track({
          opacity: [
            [0.25, 0],
            [0.28, 0.9],
            [0.34, 0.9],
            [0.39, 0]
          ]
        })
      },
      { name: "a way off, away", svg: way("M16 96.4 C10 95.4 4 94.8 -3 94.2", GREY, 0.8), keys: track({ opacity: [[0.72, 0], [0.74, 1], [0.78, 1], [0.81, 0]] }) },
      {
        name: "one at the edge, going off, then coming",
        svg: someone(20, 96.6, 1.5),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.73, 1]
          ],
          xy: [
            [0.73, 0, 0],
            [0.77, -8, -0.6],
            [0.79, -8, -0.6],
            [0.88, 44, 5.4]
          ]
        })
      },
      ...coming.map(([x, y], i) => ({ name: `one coming ${i + 1}`, svg: someone(x, y, 1.5), keys: track({ xy: onTheWay }) })),
      { name: "a voice from him, giving good tidings", svg: arcsLeft(teaches[0] - 3.6, teaches[1] - 3.6, GOLD), keys: showWhile(0.47, 0.49, 0.6, 0.62), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks(
        "good tidings, rising",
        coming.map(([x, y]) => [x + 36, y - 6] as [number, number]),
        0.5,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      ),
      { name: "a warm glow on them, glad", svg: glow(58, 101, 14, WARM, 0.18), keys: track({ opacity: [[0.55, 0], [0.59, 1]], xy: [[0.74, 0, 0], [0.84, 20, -0.6]] }), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "Make things easy for people", from: 0.02, to: 0.22 },
      { text: "And do not make them hard", from: 0.24, to: 0.44 },
      { text: "Give them good tidings", from: 0.46, to: 0.7 },
      { text: "And do not make them run away", from: 0.72, to: 1 }
    ]
  };
}

export const CHARACTER_ART = {
  "mustard-of-pride": mustardOfPride,
  "what-backbiting-is": whatBackbitingIs,
  "orphan-carer": orphanCarer,
  "safe-from-harm": safeFromHarm,
  "refuge-from-anger": refugeFromAnger,
  "gate-ar-rayyan": gateArRayyan,
  "make-it-easy": makeItEasy
};
