import { cloud, glow, n, palm, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { kabah } from "./historyArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track } from "./toldArt";

/**
 * What the Prophet ﷺ taught of worship and of the heart, drawn as the scenes of kindness are (kindArt.ts): what he said
 * when he finished his prayer; Islam built on five; asking forgiveness more than seventy times a day; family ties that
 * bring more provision and a longer life; praying standing, else sitting, else lying on one's side; the prick of a
 * thorn that wipes away sins; and deeds that are only by their intentions. Only the land, the sky, buildings, things
 * and plants are drawn. No Prophet and no person is ever drawn, not even a hand or a face: where someone went, a dashed
 * way shows it, where someone sat or stood, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is
 * drawn for Allah and nothing comes down from the sky: forgiveness asked, praise and prayer are sparks rising.
 */

/** Colors that show on the light ground of these scenes: a voice, a way, sparks rising, a warm glow. */
const VOICE = "#6B4A2E";
const GOLD = "#C8963E";
const SPARK = "#E8A93A";
const WARM = "#FFE07A";

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

/** The land, with a few tufts of dry grass. */
const land = () =>
  landOf([
    [14, 74],
    [60, 72],
    [110, 76],
    [30, 116],
    [120, 116]
  ]);

/** A soft wash of light over (x, y), `rx` across and `ry` high, brightest in the middle. */
const wash = (x: number, y: number, rx: number, ry: number, color: string, opacity = 0.1) =>
  [1, 0.8, 0.62, 0.46, 0.32].map((k) => `<ellipse cx="${x}" cy="${y}" rx="${n(rx * k)}" ry="${n(ry * k)}" fill="${color}" opacity="${opacity}"/>`).join("");

// After the salam. Thawban said: when the Messenger of Allah ﷺ finished his prayer, he asked forgiveness three times
// and said: O Allah, You are Peace, and peace is from You; blessed are You, Owner of Majesty and Honor (Sahih Muslim
// 591). No one is drawn: the rows sit before the masjid behind a golden ring, his place; the salam to the right and to
// the left; then three sparks of forgiveness asked rise from his place, one by one; peace spreads over the rows; and
// praise rises.
function afterTheSalam(): SignArt {
  const rows: [number, number][] = [];
  for (let i = 0; i < 7; i += 1) rows.push([62 + i * 10, 99]);
  for (let i = 0; i < 7; i += 1) rows.push([67 + i * 10, 105]);
  return {
    kind: "after-the-salam",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "clouds", svg: cloud(30, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(58, 90, 1.5) },
      { name: "the rows, sitting", svg: rows.map(([x, y]) => someone(x, y, 1.8)).join("") },
      { name: "a golden ring, his place", svg: ring(42, 101, 3.4, GOLD) },
      { name: "a calm light on the rows, praying", svg: wash(92, 102, 44, 9, "#FFF6D8", 0.14), keys: { at: [0, 0.15, 0.2], opacity: [1, 1, 0.3] } },
      { name: "the salam, to the right", svg: arcs(45.6, 98, GOLD), keys: showWhile(0.06, 0.08, 0.11, 0.12) },
      { name: "the salam, to the left", svg: arcsLeft(38.4, 98, GOLD), keys: showWhile(0.13, 0.15, 0.18, 0.19) },
      { name: "a voice from his place, asking forgiveness", svg: arcs(45.6, 98, GOLD), keys: showWhile(0.3, 0.32, 0.5, 0.51), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks(
        "forgiveness asked, rising",
        [
          [34, 96],
          [40, 94],
          [46, 96]
        ],
        0.33,
        0.06,
        { color: SPARK, rise: 14, stay: true }
      ),
      { name: "a voice from his place, praising", svg: arcs(45.6, 98, GOLD), keys: showWhile(0.6, 0.62, 0.74, 0.75), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "peace, spreading over the rows",
        svg: wash(92, 102, 52, 10, "#FFFBEA", 0.2),
        origin: { x: 42, y: 101 },
        keys: track({
          opacity: [
            [0.62, 0],
            [0.63, 1]
          ],
          scale: [
            [0.62, 0.15],
            [0.72, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.75 }
      },
      { name: "a voice from his place, glorifying", svg: arcs(45.6, 98, GOLD), keys: showFrom(0.84, 0.86), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...risingSparks(
        "praise, rising",
        [
          [30, 95],
          [42, 93],
          [54, 95]
        ],
        0.87,
        0.02,
        { color: WARM, rise: 26, stay: true }
      )
    ],
    words: [
      { text: "When he finished his prayer", from: 0.02, to: 0.26 },
      { text: "He asked forgiveness three times", from: 0.28, to: 0.56 },
      { text: "O Allah, You are Peace, and peace is from You", from: 0.58, to: 0.8 },
      { text: "Blessed are You, Owner of Majesty and Honor", from: 0.82, to: 1 }
    ]
  };
}

// Built on five. The Prophet ﷺ said: Islam is built on five: to testify that none is worthy of worship but Allah and
// that Muhammad is the Messenger of Allah, to offer the prayers, to pay Zakat, to perform Hajj, and to fast in Ramadan
// (Sahih al-Bukhari 8). A house on its foundation: first its plan, five pillars dashed; then the first pillar rises,
// half with "none is worthy of worship but Allah" and the rest with "Muhammad is the Messenger of Allah", and a light
// shows on it; then the pillars of the prayer (a small mihrab), Zakat (coins), Hajj (the Ka'bah) and Ramadan (a
// crescent) rise one after another; and the roof is set on them all.
function builtOnFive(): SignArt {
  const pillars = [46, 63, 80, 97, 114];
  const top = 62;
  const foot = 96;
  const pillar = (x: number) =>
    `<rect x="${n(x - 3.4)}" y="${top}" width="6.8" height="${foot - top}" fill="#EFE4CA"/>` +
    `<rect x="${n(x + 0.6)}" y="${top}" width="2.8" height="${foot - top}" fill="#000000" opacity="0.08"/>` +
    `<rect x="${n(x - 4.6)}" y="${top - 2.4}" width="9.2" height="2.6" fill="#DCCBA4"/>` +
    `<rect x="${n(x - 4.6)}" y="${foot - 2.4}" width="9.2" height="2.4" fill="#DCCBA4"/>`;
  const plan =
    pillars.map((x) => `<rect x="${n(x - 3.4)}" y="${top}" width="6.8" height="${foot - top}" stroke="#A88A5C" stroke-width="0.6" stroke-dasharray="1.6 1.4" fill="none"/>`).join("") +
    `<path d="M38 59.6 L122 59.6 L122 54 L38 54 Z M68 54 A12 9 0 0 1 92 54" stroke="#A88A5C" stroke-width="0.6" stroke-dasharray="1.6 1.4" fill="none"/>`;
  const plaque = (x: number, inner: string) => `<circle cx="${x}" cy="79" r="4" fill="#FFF8E8" stroke="#CDBD98" stroke-width="0.5"/>${inner}`;
  const marks = [
    sparkle(46, 79, 2.6, GOLD),
    `<path d="M60.6 81.8 L60.6 78.6 Q63 75.2 65.4 78.6 L65.4 81.8 Z" fill="#2F6F5E"/>`,
    `<circle cx="78.8" cy="79.8" r="1.5" fill="#E8C45A" stroke="#B8902E" stroke-width="0.3"/><circle cx="81.4" cy="78.2" r="1.5" fill="#E8C45A" stroke="#B8902E" stroke-width="0.3"/>`,
    kabah(95.2, 81.6, 3.2),
    crescent(113.4, 79, 2.7, 1.9, "#D9A83A")
  ];
  // When each pillar rises, and when its mark shows on it.
  const rise: [number, number][] = [
    [0.42, 0.47],
    [0.6, 0.64],
    [0.66, 0.7],
    [0.8, 0.83],
    [0.84, 0.87]
  ];
  return {
    kind: "built-on-five",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "clouds", svg: cloud(22, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      {
        name: "the foundation",
        svg: `<rect x="30" y="100.6" width="100" height="5.4" fill="#CDBB94"/><rect x="36" y="96" width="88" height="4.8" fill="#DCCBA4"/><path d="M30 100.6 L130 100.6" stroke="#B8A47A" stroke-width="0.5"/>`
      },
      { name: "the plan, five pillars, dashed", svg: plan, keys: showFrom(0.04, 0.08) },
      ...pillars.map(
        (x, i): SignPart => ({
          name: `pillar ${i + 1}, rising`,
          svg: pillar(x),
          origin: { x, y: foot },
          keys:
            i === 0
              ? track({
                  opacity: [
                    [0.2, 0],
                    [0.205, 1]
                  ],
                  scaleY: [
                    [0.2, 0.04],
                    [0.26, 0.5],
                    [0.42, 0.5],
                    [0.47, 1]
                  ]
                })
              : track({
                  opacity: [
                    [rise[i][0], 0],
                    [rise[i][0] + 0.005, 1]
                  ],
                  scaleY: [
                    [rise[i][0], 0.04],
                    [rise[i][1], 1]
                  ]
                })
        })
      ),
      ...pillars.map((x, i): SignPart => ({ name: `the mark on pillar ${i + 1}`, svg: plaque(x, marks[i]), keys: showFrom(rise[i][1], rise[i][1] + 0.012) })),
      {
        name: "the roof, set on them all",
        svg: `<rect x="38" y="54" width="84" height="5.8" fill="#E6D6B0"/><path d="M38 59.8 L122 59.8" stroke="#C4AE80" stroke-width="0.6"/><path d="M68 54 A12 9 0 0 1 92 54 Z" fill="#7FA9A0"/><path d="M71 54 A9 6.6 0 0 1 80 47.6" stroke="#A7CBC3" stroke-width="0.8" fill="none"/>`,
        keys: showFrom(0.875, 0.9)
      },
      { name: "a light on the house", svg: glow(80, 70, 30, WARM, 0.07), keys: showFrom(0.89, 0.93), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...risingSparks(
        "good, rising from the house",
        [
          [60, 50],
          [80, 43],
          [100, 50]
        ],
        0.89,
        0.01,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Islam is built on five", from: 0.02, to: 0.16 },
      { text: "To testify none is worthy of worship but Allah", from: 0.18, to: 0.38 },
      { text: "And that Muhammad is the Messenger of Allah", from: 0.4, to: 0.56 },
      { text: "To offer the prayers, and to pay Zakat", from: 0.58, to: 0.76 },
      { text: "To perform Hajj, and to fast in Ramadan", from: 0.78, to: 1 }
    ]
  };
}

// More than seventy times a day. The Prophet ﷺ said: by Allah, I ask Allah for forgiveness and turn to Him in
// repentance more than seventy times a day (Sahih al-Bukhari 6307). No one is drawn: by the masjid, a golden ring, his
// place; a voice asks forgiveness, and sparks rise from it again and again; a warm glow of turning to Him; then the sun
// crosses the sky from morning to evening, and as it goes, seven rings of ten lights each fill along the sky, and more.
function seventyTimes(): SignArt {
  // Seven rings of ten lights in a row across the sky, below the sun's way, and an eighth begun.
  const tens = [26, 44, 62, 80, 98, 116, 134];
  const high = 44;
  const ten = (cx: number, count = 10) => {
    let out = `${glow(cx, high, 7, WARM, 0.08)}<circle cx="${cx}" cy="${high}" r="5.2" stroke="${GOLD}" stroke-width="0.3" fill="#FFFFFF" opacity="0.55"/>`;
    for (let k = 0; k < count; k += 1) {
      const a = (k / 10) * Math.PI * 2 - Math.PI / 2;
      out += `<circle cx="${n(cx + Math.cos(a) * 3.8)}" cy="${n(high + Math.sin(a) * 3.8)}" r="0.95" fill="${SPARK}"/>`;
    }
    return out;
  };
  const rising = (label: string, list: number[]) => risingSparks(label, list.map((): [number, number] => [100, 95]), list[0], list.length > 1 ? list[1] - list[0] : 0, { color: SPARK, rise: 16 });
  return {
    kind: "seventy-times",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      {
        name: "the sun, crossing the sky",
        svg: sun(80, 26),
        keys: track({
          xy: [
            [0.6, -62, 24],
            [0.68, -34, 8],
            [0.76, 0, 0],
            [0.84, 34, 8],
            [0.92, 62, 24]
          ]
        })
      },
      {
        name: "the evening",
        svg: `<rect width="160" height="34" fill="#E7A27A" opacity="0.85"/><rect y="34" width="160" height="27" fill="#F5C787" opacity="0.85"/><rect y="61" width="160" height="59" fill="#E08A4A" opacity="0.12"/>`,
        keys: showFrom(0.86, 0.93)
      },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(30, 92, 1.1) },
      { name: "his home, by the masjid", svg: home(118, 96, 18, 13) },
      { name: "a golden ring, his place", svg: ring(100, 100, 3, GOLD) },
      { name: "a voice from his place, asking forgiveness", svg: arcs(103.6, 97, GOLD), keys: showFrom(0.05, 0.07), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...rising("forgiveness asked, rising", [0.08, 0.14, 0.2]),
      { name: "a warm glow on his place, turning to Him", svg: glow(100, 99, 6, WARM, 0.22), keys: showFrom(0.36, 0.4), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...rising("repentance, rising", [0.4, 0.46]),
      ...tens.map(
        (x, i): SignPart => ({
          name: `ten times, ${i + 1}`,
          svg: ten(x),
          origin: { x, y: high },
          keys: track({
            opacity: [
              [0.61 + i * 0.04, 0],
              [0.62 + i * 0.04, 1]
            ],
            scale: [
              [0.61 + i * 0.04, 0.5],
              [0.63 + i * 0.04, 1]
            ]
          })
        })
      ),
      {
        name: "and more",
        svg: ten(152, 3),
        origin: { x: 152, y: high },
        keys: track({
          opacity: [
            [0.89, 0],
            [0.9, 1]
          ],
          scale: [
            [0.89, 0.5],
            [0.91, 1]
          ]
        })
      },
      ...rising("forgiveness asked all day, rising", [0.62, 0.68, 0.74, 0.8, 0.86])
    ],
    words: [
      { text: "By Allah! I ask for forgiveness from Allah", from: 0.02, to: 0.3 },
      { text: "And turn to Him in repentance", from: 0.32, to: 0.56 },
      { text: "More than seventy times a day", from: 0.58, to: 1 }
    ]
  };
}

// Family ties. The Prophet ﷺ said: whoever loves to be granted more provision, and that his life be prolonged, let him
// keep good relations with his kin (Sahih al-Bukhari 5986). No one is drawn: someone's place by his home, a sack of
// provision beside it, and the road of his days going on from it; dashed ways go out from his place to the homes of his
// kin, and they glow warm; then more sacks of provision come beside his, and the road of his days goes on further.
function familyTies(): SignArt {
  const kin: [number, number][] = [
    [100, 86],
    [124, 90],
    [146, 86]
  ];
  const toKin = ["M40 100 C60 98 80 92 98 87.6", "M40 101 C70 102 100 98 122 91.6", "M40 102 C80 106 124 100 144 87.6"];
  const sacks: [number, number][] = [
    [50, 106],
    [58, 106],
    [66, 106],
    [74, 106]
  ];
  /** Small stones along a road, one for each stretch of it. */
  const milestones = (list: [number, number][], s = 1) =>
    list.map(([x, y]) => `<path d="M${n(x - 1.2 * s)} ${y} L${n(x - 1 * s)} ${n(y - 2 * s)} Q${x} ${n(y - 2.8 * s)} ${n(x + 1 * s)} ${n(y - 2 * s)} L${n(x + 1.2 * s)} ${y} Z" fill="#B9A585"/>`).join("");
  return {
    kind: "family-ties",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(80, 18) },
      { name: "clouds", svg: cloud(128, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his home", svg: home(22, 98, 22, 16) },
      ...kin.map(([x, y], i): SignPart => ({ name: `a home of his kin ${i + 1}`, svg: home(x, y, 14, 10, i === 1 ? "#C9A777" : "#D3A872", i === 1 ? "#AF9064" : "#BC9060") })),
      { name: "the road of his days", svg: way("M36 97 C42 88 48 80 52 74", BROWN, 1) + milestones([[41.6, 89.4], [46.4, 82.6], [50.4, 77]]), keys: showFrom(0.32, 0.38) },
      { name: "the road of his days, going on further", svg: way("M52 74 C54 70 56 66 58 63", BROWN, 0.8) + milestones([[54.4, 70.4], [56.6, 66.2]], 0.7), keys: showFrom(0.84, 0.9) },
      { name: "someone's place, by his home", svg: someone(40, 101, 1.8) },
      { name: "his provision, a sack", svg: sack(sacks[0][0], sacks[0][1], 1.1) },
      { name: "a light on his provision", svg: glow(50, 102, 6, WARM, 0.2), keys: showFrom(0.06, 0.1), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...toKin.map((d, i): SignPart => ({ name: `a way to his kin ${i + 1}`, svg: way(d, GOLD), keys: showFrom(0.53 + i * 0.03, 0.58 + i * 0.03) })),
      { name: "the ways to his kin, glowing", svg: toKin.map((d) => `<path d="${d}" stroke="#F2B33C" stroke-width="2.2" fill="none" opacity="0.28" stroke-linecap="round"/>`).join(""), keys: showFrom(0.66, 0.7), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "warm glows on the homes of his kin", svg: kin.map(([x, y]) => glow(x, y - 5, 9, WARM, 0.12)).join(""), keys: showFrom(0.64, 0.68), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...sacks.slice(1).map(
        ([x, y], i): SignPart => ({
          name: `more provision ${i + 1}`,
          svg: sack(x, y, 1.1),
          origin: { x, y },
          keys: track({
            opacity: [
              [0.74 + i * 0.03, 0],
              [0.745 + i * 0.03, 1]
            ],
            scale: [
              [0.74 + i * 0.03, 0.4],
              [0.76 + i * 0.03, 1]
            ]
          })
        })
      ),
      ...risingSparks(
        "blessing, rising",
        [
          [40, 96],
          [60, 99],
          [56, 70]
        ],
        0.87,
        0.015,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Whoever loves to be granted more provision", from: 0.02, to: 0.26 },
      { text: "And that his life be prolonged", from: 0.28, to: 0.48 },
      { text: "Then let him keep good relations with his kin", from: 0.5, to: 1 }
    ]
  };
}

// Pray as you can. Imran ibn Husayn said: I had piles, so I asked the Prophet ﷺ about the prayer, and he said: pray
// while standing; and if you can't, pray while sitting; and if you cannot do even that, then pray lying on your side
// (Sahih al-Bukhari 1117). No one is drawn: a way comes from a home to the masjid and a voice asks; a voice answers from
// a golden ring, his place; then before the home, a prayer mat, and someone's place on it, and the prayer rises; a
// cushion, the place moves to it, and the prayer rises; a bed with its pillow, the place moves to it, and the prayer
// rises still.
function prayAsYouCan(): SignArt {
  const mat: [number, number] = [83, 102.4];
  const cushion: [number, number] = [104, 100.6];
  const bed: [number, number] = [122, 97.8];
  return {
    kind: "pray-as-you-can",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(96, 18) },
      { name: "clouds", svg: cloud(132, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(4, 94, 0.9) },
      { name: "a golden ring, his place", svg: ring(28, 100, 3, GOLD) },
      { name: "a home", svg: home(142, 96, 22, 16) },
      { name: "a way, coming to ask", svg: way("M134 100.6 C112 106 82 106 62 102.6", BROWN), keys: showWhile(0.03, 0.1, 0.28, 0.31) },
      { name: "someone, asking", svg: someone(58, 102, 1.7), keys: showWhile(0.09, 0.11, 0.28, 0.31) },
      { name: "a pale glow on him, unwell", svg: glow(58, 101, 5, "#F2A0A0", 0.2), keys: showWhile(0.1, 0.12, 0.28, 0.31) },
      { name: "a voice from him, asking", svg: arcsLeft(55, 98, VOICE), keys: showWhile(0.12, 0.14, 0.19, 0.2), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from his place, answering", svg: arcs(31, 97, GOLD), keys: showFrom(0.27, 0.29), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "a prayer mat",
        svg: `<path d="M74 106 L90 106 L93 100.6 L77 100.6 Z" fill="#B5473A"/><path d="M75.6 105 L88.8 105 L91.2 101.6 L78 101.6 Z" stroke="#E8C45A" stroke-width="0.5" fill="none"/><path d="M78.6 103.6 Q83.6 101 86.6 103.6" stroke="#E8C45A" stroke-width="0.4" fill="none"/>`,
        keys: showFrom(0.3, 0.33)
      },
      {
        name: "a cushion to sit on",
        svg: `<path d="M98 103.4 C98 101 100 100.2 104 100.2 C108 100.2 110 101 110 103.4 C110 104.6 108 105 104 105 C100 105 98 104.6 98 103.4 Z" fill="#4C7A9E"/><path d="M99.6 102 C102 101.4 106 101.4 108.4 102" stroke="#7FA6C4" stroke-width="0.5" fill="none"/>`,
        keys: showFrom(0.48, 0.51)
      },
      {
        name: "a bed with its pillow",
        svg: `<rect x="134" y="94.6" width="1.8" height="11.4" rx="0.6" fill="#7A5634"/><rect x="113" y="100.4" width="22" height="2.6" fill="#8A6440"/><rect x="114" y="103" width="1.4" height="3" fill="#6E5034"/><rect x="113.6" y="98.4" width="20.6" height="2.4" rx="0.8" fill="#EADFC8"/><path d="M113.6 98.6 L126 98.6 L126 101.2 L113.6 101.2 Z" fill="#9BB57A" opacity="0.9"/><rect x="128.6" y="96.8" width="5" height="2.4" rx="1.1" fill="#FFFFFF" stroke="#D8CBB0" stroke-width="0.3"/>`,
        keys: showFrom(0.7, 0.73)
      },
      {
        name: "his place, praying as he can",
        svg: someone(mat[0], mat[1], 1.7),
        keys: track({
          opacity: [
            [0.33, 0],
            [0.35, 1]
          ],
          xy: [
            [0.51, 0, 0],
            [0.55, cushion[0] - mat[0], cushion[1] - mat[1]],
            [0.73, cushion[0] - mat[0], cushion[1] - mat[1]],
            [0.77, bed[0] - mat[0], bed[1] - mat[1]]
          ]
        })
      },
      ...risingSparks("the prayer, standing, rising", [[mat[0], mat[1] - 3]], 0.355, 0, { color: SPARK, rise: 14, stay: true }),
      ...risingSparks("the prayer, sitting, rising", [[cushion[0], cushion[1] - 3]], 0.555, 0, { color: SPARK, rise: 14, stay: true }),
      ...risingSparks("the prayer, lying on the side, rising", [[bed[0], bed[1] - 3]], 0.775, 0, { color: SPARK, rise: 14, stay: true }),
      { name: "a light on every place of prayer", svg: [mat, cushion, bed].map(([x, y]) => glow(x, y - 1, 6, WARM, 0.16)).join(""), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "I asked him about the prayer", from: 0.02, to: 0.24 },
      { text: "Pray while standing", from: 0.26, to: 0.44 },
      { text: "And if you can't, pray while sitting", from: 0.46, to: 0.66 },
      { text: "If you cannot, then pray lying on your side", from: 0.68, to: 1 }
    ]
  };
}

// Even a thorn. The Prophet ﷺ said: no fatigue, illness, worry, sadness, hurt or distress befalls a Muslim, even the
// prick of a thorn, but Allah wipes away some of his sins for it (Sahih al-Bukhari 5641). No one is drawn:
// someone's place on a dry road, small dark specks about it, his sins; the long road behind him, a pale glow of illness,
// a grey cloud of worry and sadness over it; a thorn by the road pricks; then some of the dark specks fade away, and a soft light
// comes on his place.
function evenAThorn(): SignArt {
  const at: [number, number] = [78, 97];
  const specks: [number, number][] = [
    [-7.6, -5.4],
    [6.8, -6.6],
    [-9.8, 1.8],
    [9.6, 0.6],
    [-4.2, 7.2],
    [5.4, 7]
  ];
  /** A thorny bush, its foot at (x, y), `s` times its size. */
  const thorny = (x: number, y: number, s: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<path d="M0 0 C2 -4 5 -6 9 -7 M3 -3 C5 -3 8 -2 11 -3 M1 -1.4 C-1 -5 -1 -8 1 -10 M-1 0 C-3 -2 -5 -3 -8 -3" stroke="#7A5634" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
    [
      [2, -2.6, -1.4, -0.6],
      [5, -5, 0.2, -1.6],
      [7.6, -6.2, 0.6, -1.5],
      [6, -2.8, 0.4, 1.4],
      [9, -2.6, 0.8, -1.4],
      [-0.4, -4.4, -1.5, -0.4],
      [-0.6, -7.4, 1.4, -0.6],
      [-4, -2.2, -0.4, -1.5],
      [-6.4, -2.8, -0.2, 1.4]
    ]
      .map(([dx, dy, tx, ty]) => `<path d="M${dx} ${dy} l${tx} ${ty}" stroke="#5E3F22" stroke-width="0.55" stroke-linecap="round"/>`)
      .join("") +
    `<ellipse cx="9.4" cy="-7.4" rx="1.3" ry="0.7" fill="#8FA650"/><ellipse cx="11.4" cy="-3.2" rx="1.2" ry="0.6" fill="#8FA650"/><ellipse cx="1.2" cy="-10.4" rx="0.7" ry="1.2" fill="#8FA650"/>` +
    `</g>`;
  return {
    kind: "even-a-thorn",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#D8E6EE", "#EAD8AE", 61) },
      { name: "the sun, hot", svg: sun(132, 20) + glow(132, 20, 22, "#FFB347", 0.06) },
      { name: "hills", svg: hills("#C4A984") },
      {
        name: "the dry land",
        svg:
          landOf(
            [
              [20, 76],
              [64, 70],
              [118, 78],
              [146, 110]
            ],
            "#E6CFA0"
          ) + [[22, 90], [44, 110], [126, 88], [148, 98], [104, 112]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.8" ry="1.3" fill="#C9B08A"/>`).join("")
      },
      { name: "a far palm", svg: palm(140, 74, 15) },
      { name: "the long road behind him", svg: way(`M2 92 C24 102 50 102 ${at[0] - 4} ${at[1] + 1}`, BROWN, 1.3), keys: showFrom(0.04, 0.1) },
      { name: "the road on", svg: way(`M${at[0] + 4} ${at[1] + 1} C108 98 134 94 158 90`, BROWN, 1) },
      { name: "a thorny bush by the road", svg: thorny(at[0] + 3.6, at[1] + 7, 1.5) },
      { name: "someone's place on the road", svg: someone(at[0], at[1], 2.6) },
      ...specks.map(
        ([dx, dy], i): SignPart => ({
          name: `his sins, a dark speck ${i + 1}`,
          svg: `<circle cx="${n(at[0] + dx)}" cy="${n(at[1] + dy)}" r="1.15" fill="#4A3A2A"/>`,
          keys:
            i < 4
              ? track({
                  opacity: [
                    [0.76 + i * 0.03, 1],
                    [0.785 + i * 0.03, 0]
                  ],
                  xy: [
                    [0.76 + i * 0.03, 0, 0],
                    [0.785 + i * 0.03, n(dx * 0.4), n(dy * 0.4 - 3)]
                  ]
                })
              : undefined
        })
      ),
      { name: "a pale glow on his place, tired and ill", svg: glow(at[0], at[1], 8, "#F29090", 0.2), keys: showFrom(0.12, 0.16), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "a grey cloud over his place, worry and sadness", svg: cloud(at[0], at[1] - 8, 0.34, "#8E98A6", 0.95), keys: showFrom(0.32, 0.36), loop: { move: "bob", ms: 2400, y: 0.8 } },
      { name: "the prick of a thorn", svg: glow(at[0] + 3, at[1] + 2.6, 3, "#E0503F", 0.3) + sparkle(at[0] + 3, at[1] + 2.6, 1.8, "#D2463A"), keys: showFrom(0.56, 0.58), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      { name: "a soft light on his place", svg: glow(at[0], at[1], 10, "#FFF3C8", 0.26), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "No fatigue or illness befalls a Muslim", from: 0.02, to: 0.28 },
      { text: "Nor worry, sadness, hurt or distress", from: 0.3, to: 0.5 },
      { text: "Even the prick of a thorn", from: 0.52, to: 0.72 },
      { text: "But Allah wipes away some of his sins for it", from: 0.74, to: 1 }
    ]
  };
}

// Deeds are only by intentions. Alqamah said: I heard Umar on the minbar say: I heard the Messenger of Allah ﷺ say:
// deeds are only by intentions, and each person gets only what he intended; so whoever emigrated for the world, to gain
// it, or to marry a woman, his emigration is for what he emigrated for (Sahih al-Bukhari 1). No one is drawn: a voice
// from the minbar in the masjid, and small circles listening; two set out from one home on the same road, a light within
// each, one golden and one dull; the golden one goes on to the masjid, and good rises from it; the other turns off to a
// stall heaped with coins, and only the coins glint there.
function intentions(): SignArt {
  const start: [number, number] = [134, 101];
  const other: [number, number] = [134, 97.4];
  const stall: [number, number] = [96, 80];
  // Where the two go: side by side on one road, then the one on to the masjid, and the other off to the stall.
  const goes: [number, number, number][] = [
    [0.22, 0, 0],
    [0.32, -16, 2.2],
    [0.42, -16, 2.2],
    [0.445, -40, 3],
    [0.47, -66, -0.6]
  ];
  const turns: [number, number, number][] = [
    [0.22, 0, 0],
    [0.32, -16, -1],
    [0.64, -16, -1],
    [0.68, -30, -3.4],
    [0.72, stall[0] + 2 - other[0], stall[1] + 3 - other[1]]
  ];
  /** Keys that move a part along `xy`, out of sight until `from` and in sight by `to`. */
  const along = (xy: [number, number, number][], from: number, to: number) =>
    track({
      xy,
      opacity: [
        [from, 0],
        [to, 1]
      ]
    });
  return {
    kind: "intentions",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(96, 18) },
      { name: "clouds", svg: cloud(132, 26, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(4, 94, 1.2) },
      { name: "the minbar inside", svg: `<path d="M40 86.6 L40 83.6 L42.4 83.6 L42.4 81 L44.8 81 L44.8 78.4 L47.2 78.4 L47.2 86.6 Z" fill="#C9A36A"/><path d="M47.2 78.4 L47.2 76" stroke="#C9A36A" stroke-width="0.8"/>` },
      { name: "small circles, listening", svg: [20, 26.4, 32.8].map((x) => someone(x, 84.4, 1.3, "#F4E6C8")).join("") },
      { name: "a voice from the minbar", svg: arcs(49, 78, "#F4E6C8"), keys: showFrom(0.04, 0.06), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "a stall heaped with coins",
        svg:
          `<path d="M${stall[0] - 7} ${stall[1] - 7} L${stall[0] + 7} ${stall[1] - 7} L${stall[0] + 8.4} ${stall[1] - 4.6} L${stall[0] - 8.4} ${stall[1] - 4.6} Z" fill="#C0583F"/>` +
          `<path d="M${stall[0] - 6.4} ${stall[1] - 4.6} L${stall[0] - 6.4} ${stall[1]} M${stall[0] + 6.4} ${stall[1] - 4.6} L${stall[0] + 6.4} ${stall[1]}" stroke="#7A5634" stroke-width="0.8"/>` +
          `<rect x="${stall[0] - 6.8}" y="${stall[1] - 1.6}" width="13.6" height="1.8" fill="#8A6440"/>` +
          [-3, -1, 1, 3, -2, 0, 2, -1, 1, 0].map((dx, i) => `<circle cx="${stall[0] + dx}" cy="${n(stall[1] - 2.4 - (i < 4 ? 0 : i < 7 ? 1.2 : i < 9 ? 2.4 : 3.4))}" r="0.8" fill="#E8C45A" stroke="#B8902E" stroke-width="0.2"/>`).join("")
      },
      { name: "a home", svg: home(146, 98, 16, 12) },
      { name: "a way on the road, for the sake of good", svg: way(`M${start[0]} ${start[1]} C112 104 86 104 66 100`, GOLD), keys: showFrom(0.22, 0.28) },
      { name: "a way on the same road", svg: way(`M${other[0]} ${other[1]} C126 96.6 120 96.4 118 96.4`, BROWN), keys: showFrom(0.22, 0.28) },
      { name: "a way turning off, to the world", svg: way(`M118 96.4 C112 96 106 92 ${stall[0] + 2} ${stall[1] + 3}`, BROWN), keys: showFrom(0.62, 0.66) },
      { name: "someone setting out, for the sake of good", svg: someone(start[0], start[1], 2.2), keys: along(goes, 0.22, 0.23) },
      { name: "someone setting out, for the world", svg: someone(other[0], other[1], 2.2), keys: along(turns, 0.22, 0.23) },
      { name: "a golden light within, his intention", svg: glow(start[0], start[1], 4.8, "#FFC83A", 0.42), keys: along(goes, 0.27, 0.3), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "a dull light within, his intention", svg: glow(other[0], other[1], 4.8, "#5E5A52", 0.4), keys: along(turns, 0.27, 0.3) },
      { name: "a warm glow on his place, at the masjid", svg: glow(68, 100, 6, WARM, 0.22), keys: showFrom(0.47, 0.5), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...risingSparks(
        "good, rising from him",
        [
          [65, 97],
          [68, 95],
          [71, 97]
        ],
        0.475,
        0.008,
        { color: SPARK, rise: 12, stay: true }
      ),
      { name: "the coins he went for, glinting", svg: sparkle(stall[0] - 1, stall[1] - 5, 1.4, "#FFF3C0") + sparkle(stall[0] + 2.4, stall[1] - 3.6, 1, "#FFF3C0"), keys: showFrom(0.84, 0.86), loop: { move: "twinkle", ms: 800, low: 0.3 } }
    ],
    words: [
      { text: "I heard Umar on the minbar say", from: 0.02, to: 0.18 },
      { text: "Deeds are only by intentions", from: 0.2, to: 0.38 },
      { text: "Each person gets only what he intended", from: 0.4, to: 0.58 },
      { text: "Whoever emigrated for the world, or to marry", from: 0.6, to: 0.8 },
      { text: "His emigration is for what he emigrated for", from: 0.82, to: 1 }
    ]
  };
}

export const WORSHIP_ART = {
  "after-the-salam": afterTheSalam,
  "built-on-five": builtOnFive,
  "seventy-times": seventyTimes,
  "family-ties": familyTies,
  "pray-as-you-can": prayAsYouCan,
  "even-a-thorn": evenAThorn,
  intentions
} as const;
