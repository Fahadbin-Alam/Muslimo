import { cloud, glow, n, peaks, rainStreaks, sky, stars, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { comeIn, risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { showFrom } from "./storyArt";
import { home } from "./trialArt";
import { track } from "./toldArt";

/**
 * What the Prophet ﷺ taught of kindness and of a believer's heart, drawn as the scenes of his life are (rewardArt.ts):
 * good in every affair of a believer, thanks in joy and patience in harm; his mother, three times, then his father; a
 * cheerful face counted as a good deed; the best who learn the Quran and teach it; the believers like one body; a boy
 * taught to say Bismillah and eat from what is near him; and a man told he will be with those he loves. Only the land,
 * the sky, buildings, things and plants are drawn. No Prophet and no person is ever drawn, not even a hand or a face:
 * where someone went, a dashed way shows it, where someone sat or stood, a ring or a small dashed circle, and a voice is
 * arcs in the air. Nothing is drawn for Allah and nothing comes down from the sky but the rain: a good deed, thanks
 * and joy are sparks rising.
 */

/** Colors that show on the light ground of these scenes: a voice, a way, sparks rising, a warm glow. */
const VOICE = "#6B4A2E";
const GOLD = "#C8963E";
const SPARK = "#E8A93A";
const WARM = "#FFE07A";
/** One who teaches the Quran, and those he teaches, are drawn in green, apart from the golden ring of the Prophet ﷺ. */
const TEACH = "#2F6F5E";

/** A small dashed circle where someone is, its middle at (x, y). */
const someone = (x: number, y: number, r = 1.5, color = VOICE) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1 0.8" fill="none"/>`;

/** A small sun, its middle at (x, y). */
const sun = (x: number, y: number) => `${glow(x, y, 10, "#FFF0C0", 0.12)}<circle cx="${x}" cy="${y}" r="4.6" fill="#FFE07A"/>`;

/** Hills along the far side of the land, from y 61. */
const hills = (fill = "#C9B38C") =>
  peaks(
    [
      [20, 9, 30],
      [84, 13, 38],
      [148, 10, 30]
    ],
    61,
    fill,
    false
  );

/** A light that comes into sight at `from` above someone, settling into place, and stays twinkling. */
const light = (name: string, x: number, y: number, from: number, r = 1.8): SignPart => ({
  name,
  svg: sparkle(x, y, r, SPARK),
  keys: { at: [0, from, from + 0.02], opacity: [0, 0, 1], y: [3, 3, 0] },
  loop: { move: "twinkle", ms: 1100, low: 0.55 }
});

// Good in every affair. The Prophet ﷺ said: wonderful is the affair of the believer, for every affair of his is good,
// and this is for no one but the believer: if joy comes to him, he gives thanks, and it is good for him; and if harm
// comes to him, he is patient, and it is good for him (Sahih Muslim 2999). No one is drawn: someone's place by a home
// and a field, a warm glow on it; rain comes, the crops grow green, a voice gives thanks and good rises from it; then
// the sun burns, the crops dry, a calm light of patience comes on the place, and good rises from it again.
function goodInEveryState(): SignArt {
  const rows = [90, 97, 104];
  const soil = rows.map((y) => `<path d="M72 ${n(y + 0.6)} L150 ${n(y + 0.6)}" stroke="#B08E5E" stroke-width="1.4" stroke-linecap="round"/>`).join("");
  const across = (y: number, draw: (x: number) => string) => {
    let out = "";
    for (let x = 76; x <= 146; x += 7) out += draw(x);
    return out;
  };
  const shoots = rows.map((y) => across(y, (x) => `<path d="M${x} ${y} L${x} ${n(y - 1.6)}" stroke="#7FB25A" stroke-width="0.8"/>`)).join("");
  return {
    kind: "good-in-every-state",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "the sun, burning hot", svg: glow(132, 20, 28, "#FFB347", 0.1), keys: showFrom(0.7, 0.74), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "clouds", svg: cloud(52, 22, 0.36, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [110, 76],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "a home", svg: home(28, 98, 22, 16) },
      { name: "the field", svg: soil },
      { name: "young shoots", svg: shoots },
      { name: "someone's place, by the home", svg: someone(50, 101, 1.8) },
      { name: "a warm glow on the place", svg: glow(50, 99, 5, WARM, 0.2), keys: { at: [0, 0.04, 0.08, 0.24, 0.3], opacity: [0, 0, 0.7, 0.7, 1] }, loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "a rain cloud",
        svg: cloud(112, 42, 0.62, "#E6EDF3", 0.96),
        keys: track({
          opacity: [
            [0.38, 0],
            [0.39, 1],
            [0.53, 1],
            [0.57, 0]
          ],
          xy: [
            [0.38, 40, 0],
            [0.42, 0, 0]
          ]
        })
      },
      { name: "rain on the field", svg: rainStreaks(74, 146, 50, 104), keys: showWhile(0.42, 0.43, 0.5, 0.52) },
      ...rows.map(
        (y, i): SignPart => ({
          name: `the crops, growing green ${i + 1}`,
          svg: across(y, (x) => tuft(x, y, "#5FA344", 5)),
          origin: { x: 111, y },
          keys: track({
            opacity: [
              [0.43, 0],
              [0.44, 1],
              [0.72, 1],
              [0.8, 0]
            ],
            scaleY: [
              [0.43, 0.25],
              [0.52, 1]
            ]
          })
        })
      ),
      { name: "a voice from the place, giving thanks", svg: arcs(53, 96, GOLD), keys: showWhile(0.52, 0.54, 0.67, 0.69), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...risingSparks(
        "good for him, rising",
        [
          [47, 94],
          [51, 92],
          [55, 94]
        ],
        0.55,
        0.012,
        { color: SPARK, rise: 14, stay: true }
      ),
      ...rows.map((y, i): SignPart => ({ name: `the crops, dried ${i + 1}`, svg: across(y, (x) => tuft(x, y, "#D4B25E", 4)), keys: showFrom(0.72, 0.8) })),
      { name: "a calm light on the place, patience", svg: glow(50, 99, 8, "#CFE3FF", 0.24), keys: showFrom(0.82, 0.85), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      ...risingSparks(
        "good for him again, rising",
        [
          [44, 95],
          [50, 93],
          [56, 95]
        ],
        0.86,
        0.012,
        { color: SPARK, rise: 22, stay: true }
      )
    ],
    words: [
      { text: "Wonderful: every affair of the believer is good", from: 0.02, to: 0.2 },
      { text: "And this is for no one but the believer", from: 0.22, to: 0.36 },
      { text: "If joy comes, he gives thanks: good for him", from: 0.38, to: 0.66 },
      { text: "If harm comes, he is patient: good for him", from: 0.68, to: 1 }
    ]
  };
}

// Your mother, three times. A man came to the Prophet ﷺ and asked: who most deserves my good company? He said: your
// mother. Then who? Your mother. Then who? Your mother. Then who? Your father (Sahih al-Bukhari 5971). No one is drawn:
// a way comes to the masjid, and a voice asks; a voice answers from a golden ring, his place; at the man's home, a light
// comes above the first one there with each answer, three in all, and the glow on her place grows; then one light above
// the next one.
function yourMother(): SignArt {
  const ask = (i: number, from: number, hide: number): SignPart => ({ name: `a voice from him, asking ${i}`, svg: arcsLeft(63, 98, VOICE), keys: showWhile(from, from + 0.02, hide, hide + 0.01), loop: { move: "twinkle", ms: 1000, low: 0.5 } });
  const answer = (i: number, keys: SignPart["keys"]): SignPart => ({ name: `a voice from his place, answering ${i}`, svg: arcs(29, 98, GOLD), keys, loop: { move: "twinkle", ms: 1000, low: 0.5 } });
  return {
    kind: "your-mother",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(84, 20) },
      { name: "clouds", svg: cloud(130, 26, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [110, 76],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "the masjid", svg: madinahMasjid(4, 96, 0.9) },
      { name: "a golden ring, his place", svg: ring(26, 101, 3, GOLD) },
      { name: "his home, far off", svg: home(124, 92, 26, 18) },
      { name: "the first one at home", svg: someone(116, 97, 1.7) },
      { name: "the next one at home", svg: someone(132, 97, 1.7) },
      { name: "a way, coming to ask", svg: way("M154 105 C128 107 96 106 70 102.6", BROWN), keys: showFrom(0.03, 0.11) },
      { name: "someone, asking", svg: someone(66, 102, 1.7), keys: showFrom(0.1, 0.12) },
      ask(1, 0.1, 0.205),
      answer(1, showWhile(0.23, 0.25, 0.3, 0.31)),
      ask(2, 0.31, 0.36),
      answer(2, showWhile(0.37, 0.39, 0.46, 0.47)),
      ask(3, 0.51, 0.56),
      answer(3, showWhile(0.57, 0.59, 0.68, 0.69)),
      ask(4, 0.73, 0.78),
      answer(4, showFrom(0.79, 0.81)),
      {
        name: "a glow on the first one",
        svg: glow(116, 95, 7, WARM, 0.2),
        keys: { at: [0, 0.26, 0.28, 0.41, 0.43, 0.61, 0.63], opacity: [0, 0, 0.4, 0.4, 0.7, 0.7, 1] },
        loop: { move: "twinkle", ms: 1400, low: 0.75 }
      },
      light("a light above the first one 1", 112, 89.6, 0.26),
      light("a light above the first one 2", 116, 87.6, 0.41),
      light("a light above the first one 3", 120, 89.6, 0.61),
      { name: "a glow on the next one", svg: glow(132, 95, 5, WARM, 0.2), keys: showFrom(0.84, 0.86), loop: { move: "twinkle", ms: 1400, low: 0.75 } },
      light("a light above the next one", 132, 88.6, 0.84)
    ],
    words: [
      { text: "Who most deserves my good company?", from: 0.02, to: 0.2 },
      { text: "Your mother. Then who? Your mother", from: 0.22, to: 0.48 },
      { text: "Then who? Your mother", from: 0.5, to: 0.7 },
      { text: "Then who? Your father", from: 0.72, to: 1 }
    ]
  };
}

// A cheerful face. The Prophet ﷺ said to Abu Dharr: do not think little of any good deed, even if it is meeting your
// brother with a cheerful face (Sahih Muslim 2626). No face is drawn: small good deeds rise as sparks along a lane
// between two homes; a way comes from each home and the two meet; a warm glow comes between them, greetings go both
// ways, and a good deed rises from the meeting, as bright as the others.
function cheerfulFace(): SignArt {
  return {
    kind: "cheerful-face",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(80, 20) },
      { name: "clouds", svg: cloud(36, 26, 0.34, "#FFFFFF", 0.9) + cloud(132, 22, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [110, 76],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "a home", svg: home(22, 96, 22, 16) },
      { name: "another home", svg: home(140, 96, 22, 16, "#C9A777", "#AF9064") },
      ...risingSparks(
        "small good deeds, rising",
        [
          [48, 104],
          [64, 100],
          [98, 100],
          [114, 104]
        ],
        0.06,
        0.04,
        { color: SPARK, rise: 10, stay: true }
      ),
      { name: "a way from the home", svg: way("M30 100 C44 104 60 104 73 102.4", BROWN), keys: showFrom(0.36, 0.46) },
      { name: "a way from the other home", svg: way("M132 100 C118 104 102 104 89 102.4", BROWN), keys: showFrom(0.37, 0.47) },
      { name: "someone, coming", svg: someone(76, 102, 1.7), keys: comeIn(0.36, 0.5, -42) },
      { name: "someone from the other home, coming", svg: someone(86, 102, 1.7), keys: comeIn(0.37, 0.5, 42) },
      { name: "a warm glow between them, cheerful", svg: glow(81, 99, 10, WARM, 0.22), keys: showFrom(0.66, 0.7), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "greetings, both ways", svg: arcs(78, 98.4, GOLD) + arcsLeft(84, 98.4, GOLD), keys: showFrom(0.67, 0.7), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      ...risingSparks(
        "a good deed, rising",
        [
          [77, 95],
          [81, 93],
          [85, 95]
        ],
        0.74,
        0.02,
        { color: SPARK, rise: 16, stay: true }
      )
    ],
    words: [
      { text: "Do not think little of any good deed", from: 0.02, to: 0.32 },
      { text: "Even if it is meeting your brother", from: 0.34, to: 0.62 },
      { text: "With a cheerful face", from: 0.64, to: 1 }
    ]
  };
}

// Learn the Quran and teach it. The Prophet ﷺ said: the best among you are those who learn the Quran and teach it
// (Sahih al-Bukhari 5027). No mushaf and no person is drawn: small circles gather before the masjid around one who
// recites; his voice and theirs, repeating, and a light comes on each of them; then ways go out from three of them to
// new circles, voices recite there, and good rises from every circle.
function learnAndTeach(): SignArt {
  const learners: [number, number, number][] = [
    [64, 102.6, -30],
    [70, 105.4, -24],
    [78, 106.4, 0],
    [86, 105.4, 24],
    [92, 102.6, 30]
  ];
  const circles: { way: string; at: [number, number]; from: number }[] = [
    { way: "M62 103 C50 105 38 104 28 101", at: [22, 101], from: 0.62 },
    { way: "M94 103 C108 106 122 105 132 101", at: [138, 101], from: 0.66 },
    { way: "M93 101 C100 96 106 92 112 89.4", at: [118, 86], from: 0.7 }
  ];
  const group = ([x, y]: [number, number]) => someone(x - 5, y + 1.6, 1.3, TEACH) + someone(x, y + 3.4, 1.3, TEACH) + someone(x + 5, y + 1.6, 1.3, TEACH);
  return {
    kind: "learn-and-teach",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "clouds", svg: cloud(30, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [110, 76],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "the masjid", svg: madinahMasjid(56, 90, 0.9) },
      { name: "one who recites, his place", svg: someone(78, 98, 1.9, TEACH) },
      ...learners.map(([x, y, from], i): SignPart => ({ name: `someone, coming to learn ${i + 1}`, svg: someone(x, y, 1.5, TEACH), keys: comeIn(0.04 + i * 0.02, 0.18, from) })),
      { name: "a voice, reciting", svg: arcs(81, 95, TEACH), keys: showWhile(0.28, 0.3, 0.56, 0.57), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "voices, repeating",
        svg: learners.map(([x, y]) => arcs(x + 2.4, y - 2.6, TEACH)).join(""),
        keys: showWhile(0.36, 0.38, 0.56, 0.57),
        loop: { move: "twinkle", ms: 900, low: 0.45 }
      },
      { name: "a light on each of them", svg: learners.map(([x, y]) => glow(x, y, 4, WARM, 0.2)).join(""), keys: showFrom(0.42, 0.46), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...circles.map((each, i): SignPart => ({ name: `a way, going out to teach ${i + 1}`, svg: way(each.way, GOLD), keys: showFrom(each.from, each.from + 0.06) })),
      ...circles.map((each, i): SignPart => ({ name: `a new circle, gathering ${i + 1}`, svg: group(each.at), keys: showFrom(each.from + 0.06, each.from + 0.08) })),
      ...circles.map(
        (each, i): SignPart => ({
          name: `a voice, teaching ${i + 1}`,
          svg: arcs(each.at[0] + 2.6, each.at[1] - 3.4, TEACH),
          keys: showFrom(each.from + 0.08, each.from + 0.1),
          loop: { move: "twinkle", ms: 1000, low: 0.5, phase: i / 3 }
        })
      ),
      ...risingSparks(
        "good, rising from every circle",
        [
          [78, 92],
          [22, 96],
          [138, 96],
          [118, 82]
        ],
        0.84,
        0.012,
        { color: SPARK, rise: 14, stay: true }
      )
    ],
    words: [
      { text: "The best among you", from: 0.02, to: 0.24 },
      { text: "Are those who learn the Quran", from: 0.26, to: 0.58 },
      { text: "And teach it", from: 0.6, to: 1 }
    ]
  };
}

// Like one body. The Prophet ﷺ said: you see the believers, in their mercy, love and kindness to one another, like one
// body: if any part of it is unwell, the whole body shares its sleeplessness and fever (Sahih al-Bukhari 6011). No body
// and no person is drawn: small circles in a town, joined one to another by warm threads; they draw close, and one
// soft shape holds them all; one of them is unwell; night comes, the windows stay lit, and a warm glow comes on every
// one of them.
function oneBody(): SignArt {
  const places: [number, number, number, number][] = [
    [62, 100, -10, 2],
    [70, 95, -6, -4],
    [80, 100.6, 0, 3],
    [90, 95, 6, -4],
    [98, 100, 10, 2],
    [72, 104.6, -6, 2],
    [88, 104.6, 6, 2]
  ];
  const threads = [
    [0, 1],
    [1, 3],
    [3, 4],
    [0, 5],
    [5, 2],
    [2, 6],
    [6, 4],
    [1, 2],
    [2, 3]
  ];
  const line = (a: number, b: number) => `<path d="M${places[a][0]} ${places[a][1]} L${places[b][0]} ${places[b][1]}" stroke="#E3A64B" stroke-width="0.7" opacity="0.8"/>`;
  const unwell = 4;
  return {
    kind: "one-body",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(132, 20), keys: { at: [0, 0.64, 0.7], opacity: [1, 1, 0] } },
      { name: "clouds", svg: cloud(40, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [110, 76],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "homes of the town", svg: home(22, 96, 22, 16) + home(140, 96, 22, 16, "#C9A777", "#AF9064") },
      {
        name: "the night",
        svg: `<rect width="160" height="120" fill="#0F1C3A" opacity="0.62"/>` + stars([[12, 14], [30, 30], [52, 12], [70, 26], [96, 14], [118, 30], [144, 12], [150, 36], [24, 46], [134, 48]]),
        keys: showFrom(0.66, 0.72)
      },
      { name: "the moon", svg: `<circle cx="132" cy="22" r="5" fill="#F4EBC8"/><circle cx="134.4" cy="20.6" r="4.4" fill="#2A3556" opacity="0.9"/>`, keys: showFrom(0.68, 0.72) },
      { name: "windows lit, no one asleep", svg: `<rect x="24.4" y="85.4" width="2.6" height="2.6" fill="#FFD36B"/><rect x="142.4" y="85.4" width="2.6" height="2.6" fill="#FFD36B"/>` + glow(25.7, 86.7, 4, "#FFD36B", 0.2) + glow(143.7, 86.7, 4, "#FFD36B", 0.2), keys: showFrom(0.74, 0.78) },
      ...threads.map((pair, i): SignPart => ({ name: `a warm thread between them ${i + 1}`, svg: line(pair[0], pair[1]), keys: showFrom(0.12 + i * 0.006, 0.134 + i * 0.006) })),
      { name: "one soft shape holding them all", svg: `<ellipse cx="80" cy="100" rx="25" ry="9.4" fill="#FFE7A0" opacity="0.28" stroke="#E3A64B" stroke-width="0.7"/>`, keys: showFrom(0.26, 0.32) },
      ...places.map(([x, y, dx, dy], i): SignPart => ({ name: `someone in the town ${i + 1}`, svg: someone(x, y, 1.6), keys: comeIn(0.02, 0.12, dx, dy) })),
      { name: "one of them, unwell", svg: someone(places[unwell][0], places[unwell][1], 1.6, "#C0392B") + glow(places[unwell][0], places[unwell][1], 4.4, "#E57373", 0.24), keys: showFrom(0.46, 0.5), loop: { move: "twinkle", ms: 900, low: 0.45 } },
      { name: "warm glows on every one of them, fever", svg: places.map(([x, y]) => glow(x, y, 4.6, "#FF9F43", 0.2)).join(""), keys: showFrom(0.78, 0.84), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "the threads, glowing", svg: threads.map((pair) => line(pair[0], pair[1])).join("").split('stroke="#E3A64B" stroke-width="0.7"').join('stroke="#FFB347" stroke-width="1.2"'), keys: showFrom(0.8, 0.84) }
    ],
    words: [
      { text: "The believers, in mercy, love and kindness", from: 0.02, to: 0.22 },
      { text: "Are like one body", from: 0.24, to: 0.42 },
      { text: "If any part of it is unwell", from: 0.44, to: 0.62 },
      { text: "The whole body shares sleeplessness and fever", from: 0.64, to: 1 }
    ]
  };
}

// Eat from what is near you. Umar ibn Abi Salamah said: I was a boy in the care of the Prophet ﷺ, and my hand used to go
// all around the dish. He said to me: O boy! Say Bismillah, eat with your right hand, and eat from what is near you
// (Sahih al-Bukhari 5376). No hand is drawn: around a dish on a cloth, a golden ring, his place, and a small dashed
// circle, the boy's; a dashed reach goes all around the dish; a voice teaches, a small voice answers, and Bismillah
// rises; the reach goes, and a short way goes only to the food near him, which grows less.
function eatNear(): SignArt {
  return {
    kind: "eat-near",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "clouds", svg: cloud(118, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [110, 76],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "a home behind", svg: home(80, 80, 44, 14) },
      { name: "a cloth, spread", svg: `<rect x="44" y="88" width="72" height="20" rx="3" fill="#E9D5B0" stroke="#C9A877" stroke-width="0.8"/><path d="M48 91 L112 91 M48 105 L112 105" stroke="#C9A877" stroke-width="0.5" stroke-dasharray="2 1.6"/>` },
      { name: "the dish", svg: `<ellipse cx="80" cy="98.6" rx="12" ry="4.6" fill="#B98552"/><ellipse cx="80" cy="97.6" rx="10.6" ry="3.6" fill="#8E5B32"/>` },
      { name: "the food in it", svg: `<path d="M70.6 97.8 Q80 91.4 89.4 97.8 Z" fill="#E2B867"/><circle cx="76" cy="95.6" r="0.8" fill="#C98F3E"/><circle cx="83" cy="95" r="0.8" fill="#C98F3E"/>` },
      { name: "a golden ring, his place", svg: ring(80, 90.6, 3, GOLD) },
      { name: "a small dashed circle, the little one's place", svg: someone(80, 106, 1.3) },
      { name: "another place at the cloth", svg: someone(52, 98, 1.6) },
      { name: "a third place at the cloth", svg: someone(108, 98, 1.6) },
      { name: "a reach, around the left of the dish", svg: way("M79 104.6 C70 104.4 66 101 67 97", VOICE, 0.9), keys: { at: [0, 0.05, 0.08, 0.34, 0.38], opacity: [0, 0, 1, 1, 0] } },
      { name: "a reach, across the far side", svg: way("M67 97 C70 92 90 92 93 97", VOICE, 0.9), keys: { at: [0, 0.1, 0.13, 0.34, 0.38], opacity: [0, 0, 1, 1, 0] } },
      { name: "a reach, around the right of the dish", svg: way("M93 97 C94 101 90 104.4 81 104.6", VOICE, 0.9), keys: { at: [0, 0.15, 0.18, 0.34, 0.38], opacity: [0, 0, 1, 1, 0] } },
      { name: "a voice from his place, teaching", svg: arcs(83, 89, GOLD), keys: showWhile(0.34, 0.36, 0.626, 0.64), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a small voice, saying Bismillah", svg: arcs(82, 104.4, VOICE), keys: showWhile(0.44, 0.46, 0.626, 0.64), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...risingSparks("Bismillah, rising", [[80, 102]], 0.47, 0.02, { color: SPARK, rise: 10, stay: true }),
      { name: "a short way, to the food near him", svg: way("M80 104.4 L80 100.6", GOLD, 1), keys: showFrom(0.66, 0.7) },
      { name: "the food near him", svg: `<path d="M76.4 98.8 Q80 96.6 83.6 98.8 Z" fill="#F0CB80"/>`, origin: { x: 80, y: 98.8 }, keys: track({ opacity: [[0.66, 0], [0.68, 1]], scaleY: [[0.74, 1], [0.86, 0.4]] }) }
    ],
    words: [
      { text: "My hand used to go all around the dish", from: 0.02, to: 0.3 },
      { text: "O boy! Say Bismillah, eat with your right hand", from: 0.32, to: 0.62 },
      { text: "And eat from what is near you", from: 0.64, to: 1 }
    ]
  };
}

// With those you love. A man asked the Prophet ﷺ: when will the Hour be? He said: what have you prepared for it? He
// said: nothing, except that I love Allah and His Messenger. He said: you will be with those you love. Anas said: we had
// never been so glad of anything (Sahih al-Bukhari 3688). No one is drawn: a way comes to the masjid and a voice asks; a
// voice answers from a golden ring, his place; a warm glow of love comes on the man's place; a light joins him to the
// ring; then glows come on all who sat there, and joy rises from them.
function thoseYouLove(): SignArt {
  const sitting: [number, number][] = [
    [40, 104.4],
    [47, 99.8],
    [53, 105.4]
  ];
  return {
    kind: "those-you-love",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(96, 20) },
      { name: "clouds", svg: cloud(136, 26, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [60, 72],
          [110, 76],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "the masjid", svg: madinahMasjid(4, 94, 0.9) },
      { name: "a golden ring, his place", svg: ring(28, 100, 3, GOLD) },
      ...sitting.map(([x, y], i): SignPart => ({ name: `someone sitting with him ${i + 1}`, svg: someone(x, y, 1.5) })),
      { name: "a way, coming to ask", svg: way("M156 104 C130 107 98 106 73 102.6", BROWN), keys: showFrom(0.03, 0.11) },
      { name: "someone, asking", svg: someone(70, 102, 1.7), keys: showFrom(0.1, 0.12) },
      { name: "a voice from him, asking", svg: arcsLeft(67, 98, VOICE), keys: showWhile(0.11, 0.13, 0.185, 0.195), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from his place, asking back", svg: arcs(31, 97, GOLD), keys: showWhile(0.21, 0.23, 0.34, 0.35), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from him, answering", svg: arcsLeft(67, 98, VOICE), keys: showWhile(0.39, 0.41, 0.56, 0.57), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a warm glow of love on his place", svg: glow(70, 100, 6, "#FFB0A0", 0.24), keys: showFrom(0.44, 0.48), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a voice from his place, giving glad news", svg: arcs(31, 97, GOLD), keys: showWhile(0.61, 0.63, 0.775, 0.785), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a light, joining him to the ring", svg: way("M67 101.4 C56 97.6 42 97.6 31.6 100", "#F2B33C", 1.5), keys: showFrom(0.66, 0.72), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "glows on all who sat there", svg: sitting.map(([x, y]) => glow(x, y, 4.4, WARM, 0.22)).join("") + glow(70, 100, 4.4, WARM, 0.22), keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      ...risingSparks(
        "joy, rising",
        [
          [40, 100],
          [47, 95.4],
          [53, 101],
          [70, 97.6]
        ],
        0.86,
        0.012,
        { color: SPARK, rise: 14, stay: true }
      )
    ],
    words: [
      { text: "When will the Hour be?", from: 0.02, to: 0.2 },
      { text: "What have you prepared for it?", from: 0.22, to: 0.36 },
      { text: "Nothing, but I love Allah and His Messenger", from: 0.38, to: 0.58 },
      { text: "You will be with those you love", from: 0.6, to: 0.8 },
      { text: "We had never been so glad", from: 0.82, to: 1 }
    ]
  };
}

export const KIND_ART = {
  "good-in-every-state": goodInEveryState,
  "your-mother": yourMother,
  "cheerful-face": cheerfulFace,
  "learn-and-teach": learnAndTeach,
  "one-body": oneBody,
  "eat-near": eatNear,
  "those-you-love": thoseYouLove
} as const;
