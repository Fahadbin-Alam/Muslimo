import { animalAt, cloud, dateBunch, glow, n, palm, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { ring, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { quickSparks, track } from "./toldArt";

/**
 * Scenes from the Prophet's ﷺ life and from what he taught for the home, drawn as his likenesses are (wisdomArt.ts):
 * the palm trunk that cried when he moved to the pulpit, the rock in the trench that became sand, the horse that threw
 * the horseman who chased him on the road to Madinah, one bowl of milk for all the people of the Suffah, a few barley
 * loaves for seventy or eighty, the home at nightfall, and the half date that shields from the Fire. Only the land, the sky, buildings,
 * things, plants and animals are drawn. No Prophet and no person is ever drawn, not even a hand: where someone went, a
 * dashed way shows it, where someone sat or stood, a ring or a small dashed circle, and a voice is arcs in the air.
 * Nothing is drawn for Allah, and nothing comes down from the sky: a blessing and a good deed are sparks rising.
 */

/** Colors that show on the light ground of these scenes: a voice, a way coming back, and sparks rising. */
const VOICE = "#6B4A2E";
const GOLD = "#C8963E";
const SPARK = "#E8A93A";

/** Quick sparks (toldArt.ts) in gold, to show on light ground. */
const goldSparks = (label: string, list: [number, number][], start: number, step: number): SignPart[] =>
  quickSparks(label, list, start, step).map((part) => ({ ...part, svg: part.svg.split("#FFE7A0").join(SPARK) }));

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

/** A short flash where something strikes, at (x, y), lit only from `start` for a moment. */
const flash = (name: string, x: number, y: number, start: number): SignPart => ({
  name,
  svg: sparkle(x, y, 2.6, "#FFFFFF") + sparkle(x, y, 1.2, "#FFE7A0"),
  keys: { at: [0, at3(start), at3(start + 0.004), at3(start + 0.014), at3(start + 0.02)], opacity: [0, 0, 1, 1, 0] }
});

/** A small dashed circle where someone is, its middle at (x, y). */
const someone = (x: number, y: number, r = 1.3, color = BROWN) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" stroke="${color}" stroke-width="0.7" stroke-dasharray="0.9 0.7" fill="none"/>`;

/** Ten small dashed circles, in two rows of five, around (x, y). */
const ten = (x: number, y: number) =>
  [0, 1, 2, 3, 4].flatMap((i) => [someone(x - 8 + i * 4, y - 2), someone(x - 8 + i * 4 + 1.4, y + 2.2)]).join("");

// The crying palm trunk. The Prophet ﷺ used to stand by a palm trunk on Fridays. When a pulpit was made for him and
// he stood on it, the trunk cried like a child, until he came down and held it (Sahih al-Bukhari 3584). No one is
// drawn: in the mosque, under its roof of palm fronds held up on trunks, a voice speaks by one trunk; a pulpit of three
// steps is made, a way goes up it, and the voice speaks from it; the trunk shakes, crying; then a way comes down to it,
// a glow holds it, its crying stops, and calm rises as sparks.
function cryingTrunk(): SignArt {
  const foot = 102;
  const trunkAt = (x: number) => {
    let rings = "";
    for (let y = 46; y < foot - 2; y += 5) rings += `<path d="M${n(x - 2.4)} ${y} Q${x} ${n(y + 1.3)} ${n(x + 2.4)} ${y}" stroke="#7A5232" stroke-width="0.7" fill="none"/>`;
    return (
      `<rect x="${n(x - 2.7)}" y="40" width="5.4" height="${foot - 40}" rx="1.2" fill="#A87444"/>` +
      `<rect x="${n(x + 0.4)}" y="40" width="2.3" height="${foot - 40}" fill="#000000" opacity="0.1"/>` +
      rings +
      `<ellipse cx="${x}" cy="${foot}" rx="4.4" ry="1.1" fill="#000000" opacity="0.12"/>`
    );
  };
  const roof =
    `<rect x="0" y="31" width="160" height="9" fill="#8A6440"/>` +
    Array.from({ length: 20 }, (_, i) => `<path d="M${i * 8} 39 L${i * 8 + 4} 33 L${i * 8 + 8} 39" stroke="#6E8C3A" stroke-width="1.2" fill="none"/>`).join("") +
    `<rect x="0" y="38.6" width="160" height="1.6" fill="#6B4A2E"/>`;
  const wall =
    `<rect x="0" y="40" width="160" height="62" fill="#E5CFA6"/>` +
    [52, 64, 76, 88].map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#D6BD92" stroke-width="0.5"/>`).join("") +
    `<rect x="118" y="52" width="14" height="16" fill="#BFE3FA"/><rect x="118" y="52" width="14" height="16" fill="none" stroke="#C9AE80" stroke-width="1"/>`;
  const floor = `<rect x="0" y="${foot}" width="160" height="${120 - foot}" fill="#EAD9B4"/><rect x="10" y="108" width="34" height="7" rx="1" fill="#D8C08E"/>`;
  // The pulpit: three steps rising to the left, to a seat with its back at x 92.
  const pulpit =
    `<path d="M92 ${foot} L92 82 L98 82 L98 88 L104 88 L104 95 L110 95 L110 ${foot} Z" fill="#9C6B3F"/>` +
    `<rect x="92" y="75" width="1.8" height="7" fill="#7A5232"/>` +
    `<path d="M93 78 L110 93" stroke="#7A5232" stroke-width="0.9"/>` +
    `<path d="M92 82 L98 82 M98 88 L104 88 M104 95 L110 95" stroke="#C08A55" stroke-width="0.8"/>`;
  const up = "M64 104.4 C78 106 100 106 111 103.4 L110 96.6 L104.6 96 L104 89.6 L98.6 89 L98 83";
  return {
    kind: "crying-trunk",
    ms: 12000,
    parts: [
      { name: "the sky over the mosque", svg: `<rect width="160" height="31" fill="#BFE3FA"/>` },
      { name: "clouds", svg: cloud(40, 16, 0.4, "#FFFFFF", 0.9) + cloud(120, 12, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the mosque's wall", svg: wall },
      { name: "its floor", svg: floor },
      { name: "a palm trunk holding up the roof, on the left", svg: trunkAt(24) },
      { name: "a palm trunk holding up the roof, on the right", svg: trunkAt(138) },
      {
        name: "the palm trunk he stood by",
        svg: trunkAt(60),
        origin: { x: 60, y: foot },
        keys: track({
          rotate: [
            [0.5, 0],
            [0.52, 1.4],
            [0.545, -1.4],
            [0.57, 1.4],
            [0.595, -1.4],
            [0.62, 1.4],
            [0.645, -1.4],
            [0.665, 0]
          ]
        })
      },
      { name: "a roof of palm fronds", svg: roof },
      { name: "a row, sitting and listening", svg: [72, 80, 88, 96, 104, 112, 120, 128, 136, 144].map((x) => someone(x, 113, 1.5)).join("") },
      { name: "a voice by the trunk, speaking", svg: arcs(65, 66, VOICE), keys: showWhile(0.04, 0.06, 0.28, 0.3), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      {
        name: "a pulpit of three steps, made for him",
        svg: pulpit,
        origin: { x: 101, y: foot },
        keys: track({
          opacity: [
            [0.26, 0],
            [0.27, 1]
          ],
          scaleY: [
            [0.26, 0.15],
            [0.34, 1]
          ]
        })
      },
      { name: "a way, going up the pulpit", svg: way(up, BROWN), keys: showWhile(0.34, 0.38, 0.72, 0.74) },
      { name: "a voice from the pulpit", svg: arcsLeft(90, 76, VOICE), keys: showWhile(0.38, 0.4, 0.48, 0.5), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      { name: "its crying, to the left", svg: arcsLeft(55, 58, "#6F86A6"), keys: showWhile(0.5, 0.52, 0.8, 0.84), loop: { move: "twinkle", ms: 520, low: 0.35 } },
      { name: "its crying, to the right", svg: arcs(65, 58, "#6F86A6"), keys: showWhile(0.5, 0.52, 0.8, 0.84), loop: { move: "twinkle", ms: 520, low: 0.35, phase: 0.5 } },
      { name: "a way, from the pulpit to the trunk", svg: way("M98 83 L98.6 89 L104 89.6 L104.6 96 L110 96.6 L111 103.4 C100 106 78 106 64 104.4", GOLD), keys: showFrom(0.74, 0.8) },
      {
        name: "a glow, holding the trunk",
        svg: `${glow(60, 70, 9, "#FFF0C0", 0.1)}<ellipse cx="60" cy="70" rx="6.4" ry="2.6" fill="none" stroke="#E8B84A" stroke-width="1.3"/>`,
        keys: showFrom(0.8, 0.84)
      },
      ...risingSparks(
        "calm, rising",
        [
          [52, 62],
          [68, 58],
          [60, 52]
        ],
        0.86,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "On Fridays, he spoke standing by a palm trunk", from: 0.02, to: 0.22 },
      { text: "Then a pulpit was made for him", from: 0.24, to: 0.46 },
      { text: "And the trunk cried like a child", from: 0.48, to: 0.7 },
      { text: "Until he came down and held it", from: 0.72, to: 1 }
    ]
  };
}

// The rock that became sand. Digging the trench, they came to a great hard rock that their spades could not break. The
// Prophet ﷺ came down, a stone tied over his belly from hunger, for they had not eaten for three days; he took the
// spade and struck it, and it became like soft sand (Sahih al-Bukhari 4101). No one is drawn: the trench is dug across
// the land and reaches a great rock; two spades strike it and glance off; a way comes, a third spade strikes it once,
// and the rock becomes a heap of soft sand.
function trenchRock(): SignArt {
  const spade = (x: number, top: number) =>
    `<path d="M${x} ${top} L${x} ${top + 13}" stroke="#7A5634" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M${n(x - 2.6)} ${top + 13} L${n(x + 2.6)} ${top + 13} L${n(x + 2)} ${top + 18} Q${x} ${top + 19.6} ${n(x - 2)} ${top + 18} Z" fill="#8E969C"/>`;
  const trench =
    `<path d="M0 84 L160 84 L160 97 L0 97 Z" fill="#7A5634"/>` +
    `<path d="M0 84 L160 84 L160 87.4 L0 87.4 Z" fill="#5E3F24"/>` +
    `<path d="M0 97 L160 97" stroke="#CDB283" stroke-width="1"/>` +
    [10, 34, 58, 82, 130, 152].map((x) => `<ellipse cx="${x}" cy="83.6" rx="8.4" ry="2.8" fill="#C9A66B"/>`).join("");
  const rock =
    `<path d="M93 94 C92 87 95 80.6 102 79.6 C109 78.8 115.4 82 116 88.6 C116.6 92 115 94.6 112 95 L96 95.4 C94.4 95.4 93.2 95 93 94 Z" fill="#8F8A84"/>` +
    `<path d="M97 84 C99 82 103 81.4 106 82" stroke="#B5B0A9" stroke-width="1" fill="none"/><path d="M108 90 L112 88" stroke="#6F6A64" stroke-width="0.8"/>`;
  const sand =
    `<path d="M90 95.6 C94 88 100 84.6 104 84.6 C108 84.6 114 88 118 95.6 Z" fill="#EBD49A"/>` +
    `<path d="M96 92 C99 89.4 102 88.4 104 88.4" stroke="#F6E6B8" stroke-width="0.9" fill="none"/>`;
  return {
    kind: "trench-rock",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#CFE6F5", "#E3CDA0", 61) },
      { name: "the sun", svg: sun(132, 24) },
      { name: "clouds", svg: cloud(52, 26, 0.42, "#FFFFFF", 0.9) + cloud(100, 18, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hill beside the city", svg: hills("#B39A78") },
      {
        name: "the land",
        svg: landOf(
          [
            [14, 72],
            [64, 70],
            [120, 74],
            [30, 110],
            [140, 112]
          ],
          "#E3CDA0"
        )
      },
      {
        name: "the trench, being dug",
        svg: trench,
        origin: { x: 0, y: 90 },
        keys: track({
          scaleX: [
            [0.03, 0.22],
            [0.16, 1]
          ]
        })
      },
      { name: "a great rock in the trench", svg: rock, keys: track({ opacity: [
        [0.12, 0],
        [0.14, 1],
        [0.76, 1],
        [0.8, 0]
      ] }) },
      {
        name: "a spade, digging 1",
        svg: spade(40, 68),
        origin: { x: 40, y: 68 },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.08, 1],
            [0.5, 1],
            [0.52, 0]
          ],
          xy: [
            [0.27, 0, 0],
            [0.31, 49, -2]
          ],
          rotate: [
            [0.32, 0],
            [0.34, -28],
            [0.36, 0],
            [0.38, -28],
            [0.4, 0]
          ]
        }),
        loop: { move: "bob", ms: 650, y: -2.4 }
      },
      {
        name: "a spade, digging 2",
        svg: spade(66, 68),
        origin: { x: 66, y: 68 },
        keys: track({
          opacity: [
            [0.05, 0],
            [0.09, 1],
            [0.5, 1],
            [0.52, 0]
          ],
          xy: [
            [0.27, 0, 0],
            [0.31, 52, -2]
          ],
          rotate: [
            [0.36, 0],
            [0.38, 28],
            [0.4, 0],
            [0.42, 28],
            [0.44, 0]
          ]
        }),
        loop: { move: "bob", ms: 700, y: -2.4, phase: 0.5 }
      },
      flash("a strike, glancing off 1", 93, 84, 0.34),
      flash("a strike, glancing off 2", 115, 84, 0.38),
      flash("a strike, glancing off 3", 93, 86, 0.38),
      flash("a strike, glancing off 4", 115, 86, 0.42),
      { name: "a way, coming to the rock", svg: way("M0 103 C30 102.6 64 102 92 99.6", BROWN), keys: showFrom(0.52, 0.6) },
      {
        name: "a spade, striking once",
        svg: spade(100, 60),
        origin: { x: 100, y: 60 },
        keys: track({
          opacity: [
            [0.58, 0],
            [0.6, 1]
          ],
          rotate: [
            [0.6, 0],
            [0.63, -42],
            [0.655, 12],
            [0.67, 0]
          ]
        })
      },
      flash("the strike", 102, 80, 0.655),
      {
        name: "soft sand, where the rock was",
        svg: sand,
        origin: { x: 104, y: 95.6 },
        keys: track({
          opacity: [
            [0.76, 0],
            [0.78, 1]
          ],
          scale: [
            [0.76, 0.4],
            [0.84, 1]
          ]
        })
      },
      {
        name: "sand, running down",
        svg: [92, 96, 112, 116].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 92 : 93.6}" r="0.7" fill="#E0C27E"/>`).join(""),
        keys: track({
          opacity: [
            [0.82, 0],
            [0.83, 1],
            [0.88, 1],
            [0.9, 0]
          ],
          xy: [
            [0.82, 0, 0],
            [0.9, 0, 2.6]
          ]
        })
      },
      ...risingSparks(
        "the way cleared, rising",
        [
          [96, 80],
          [106, 76],
          [114, 80]
        ],
        0.88,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Digging the trench, they met a great rock", from: 0.02, to: 0.24 },
      { text: "None of their spades could break it", from: 0.26, to: 0.48 },
      { text: "He came, and struck it with the spade", from: 0.5, to: 0.72 },
      { text: "And it became like soft sand", from: 0.74, to: 1 }
    ]
  };
}

// The horse that threw its rider. On the road to Madinah, Abu Bakr turned and saw a horseman who had caught up with
// them. The Prophet ﷺ turned and said: O Allah, throw him down; and the horse threw him, then stood up neighing. The
// horseman said: O Prophet of Allah, order me what you wish. He ﷺ said: stay where you are, and let no one reach us.
// At the start of that day he was striving against the Prophet ﷺ, and at its end he was guarding him (Sahih al-Bukhari
// 3911). No one is drawn, not the two on the camel and not the horseman: a camel goes along the road, a dashed way
// behind it; a horse gallops after it and catches up; a voice from the camel makes du'a, and the horse pitches into
// the sand in a cloud of dust; it stands up neighing, and a voice from where it is asks; a voice from the camel
// answers; then the camel goes on toward the palms of Madinah, the horse turns to face the road behind, dust coming
// along it turns back, and the sun sets.
function chasingHorse(): SignArt {
  const camelS = 0.3;
  const horseS = 0.27;
  const camel = animalAt("camel", n(84 - 50 * camelS), n(98 - 73.4 * camelS), camelS);
  const horse = animalAt("horse", n(46 - 50 * horseS), n(100 - 73.4 * horseS), horseS);
  const puff = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#D9C7A4" opacity="0.85"/>`;
  return {
    kind: "chasing-horse",
    ms: 12000,
    parts: [
      { name: "the morning sky", svg: sky("#CFE6F5", "#E6D2A6", 61) },
      {
        name: "the sun, crossing the sky as the day ends",
        svg: sun(28, 34),
        keys: track({
          xy: [
            [0.82, 0, 0],
            [0.88, 56, -14],
            [0.95, 112, 22]
          ],
          opacity: [
            [0.92, 1],
            [0.96, 0]
          ]
        })
      },
      { name: "clouds", svg: cloud(70, 22, 0.4, "#FFFFFF", 0.9) + cloud(124, 30, 0.32, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills on the way to Madinah", svg: hills("#B8A07C") },
      {
        name: "the land",
        svg: landOf(
          [
            [12, 112],
            [60, 86],
            [104, 112],
            [146, 88]
          ],
          "#E6D2A6"
        )
      },
      { name: "the palms of Madinah, far off", svg: palm(140, 72, 12) + palm(148, 71, 15) + palm(156, 72, 11), origin: { x: 148, y: 72 }, loop: { move: "sway", ms: 5200, angle: 1 } },
      { name: "the road", svg: `<path d="M0 101 C40 99.6 100 98.4 160 96.6" stroke="#EFE0BC" stroke-width="6" fill="none" stroke-linecap="round"/>` },
      { name: "evening, falling", svg: `<rect width="160" height="61" fill="#F0A77E"/>`, keys: track({ opacity: [
        [0.84, 0],
        [0.95, 0.45]
      ] }) },
      { name: "dusk on the land", svg: `<rect y="61" width="160" height="59" fill="#8A5A3C"/>`, keys: track({ opacity: [
        [0.84, 0],
        [0.95, 0.16]
      ] }) },
      { name: "a way, along the road behind them", svg: way("M0 101.6 C20 101 44 100.2 70 99.4", BROWN), keys: showFrom(0.03, 0.12) },
      { name: "a way, going on to Madinah", svg: way("M96 99 C116 98.4 136 97.6 156 96.8", GOLD), keys: showFrom(0.84, 0.95) },
      {
        name: "a camel, going to Madinah",
        svg: camel,
        keys: track({
          xy: [
            [0.03, -22, 0.6],
            [0.16, 0, 0],
            [0.83, 0, 0],
            [0.95, 48, -1.4]
          ]
        }),
        loop: { move: "bob", ms: 1700, y: -0.4 }
      },
      {
        name: "a horse, chasing them",
        svg: horse,
        origin: { x: 48, y: 100 },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.06, 1]
          ],
          xy: [
            [0.04, -66, 0],
            [0.16, 0, 0],
            [0.31, 0, 0],
            [0.35, 0, 3],
            [0.45, 0, 3],
            [0.49, 0, 0]
          ],
          rotate: [
            [0.31, 0],
            [0.35, 38],
            [0.45, 38],
            [0.49, 0]
          ],
          scaleX: [
            [0.83, 1],
            [0.85, -1]
          ]
        })
      },
      { name: "a voice from the camel, making du'a", svg: arcsLeft(74, 80, VOICE), keys: showWhile(0.23, 0.25, 0.3, 0.32), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      ...[
        [50, 98, 2.4],
        [56, 96, 3],
        [44, 97, 2]
      ].map(
        ([x, y, r], i): SignPart => ({
          name: `dust, as it falls ${i + 1}`,
          svg: puff(x, y, r),
          keys: track({
            opacity: [
              [0.33 + i * 0.008, 0],
              [0.336 + i * 0.008, 1],
              [0.4, 1],
              [0.42, 0]
            ],
            xy: [
              [0.33 + i * 0.008, 0, 0],
              [0.385, i - 1, -7]
            ]
          })
        })
      ),
      { name: "its neighing", svg: arcs(59, 86, "#7A5634"), keys: showWhile(0.5, 0.51, 0.57, 0.58), loop: { move: "twinkle", ms: 420, low: 0.3 } },
      { name: "a voice from where the horse is, asking", svg: arcs(52, 78, VOICE), keys: showWhile(0.54, 0.56, 0.6, 0.62), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      { name: "a voice from the camel, answering", svg: arcsLeft(74, 80, VOICE), keys: showWhile(0.65, 0.67, 0.74, 0.76), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      {
        name: "dust on the road behind, coming and turning back",
        svg: puff(17, 98, 2.6) + puff(12, 97, 3.2) + puff(7, 98.4, 2.4),
        keys: track({
          opacity: [
            [0.85, 0],
            [0.86, 1],
            [0.92, 1],
            [0.95, 0]
          ],
          xy: [
            [0.85, -14, 0],
            [0.89, 0, 0],
            [0.91, 0, 0],
            [0.95, -20, 0]
          ]
        })
      },
      { name: "a voice from where the horse is, guarding", svg: arcsLeft(38, 82, VOICE), keys: showWhile(0.88, 0.89, 0.93, 0.95), loop: { move: "twinkle", ms: 1400, low: 0.55 } }
    ],
    words: [
      { text: "On the road to Madinah, a horseman caught up", from: 0.02, to: 0.2 },
      { text: "O Allah, throw him down: and the horse threw him", from: 0.22, to: 0.42 },
      { text: "It stood up neighing: order me what you wish", from: 0.44, to: 0.62 },
      { text: "Stay where you are: let no one reach us", from: 0.64, to: 0.8 },
      { text: "Chasing them in the morning, guarding them by evening", from: 0.82, to: 1 }
    ]
  };
}

// One bowl of milk. Abu Hurairah said: the Prophet ﷺ found a bowl of milk that had been given to him, and told me to
// call the people of the Suffah. I gave the bowl to each man, and he drank his fill, until all had drunk. Then he
// said: there remain you and I; sit and drink. I drank until I had no room, and he drank what was left (Sahih
// al-Bukhari 6452). No one is drawn: a bowl of milk at the door of a home; a way goes to the Suffah, the shaded place by
// the mosque, and places fill in a row; the bowl goes from place to place and stays full; it comes to one more place
// by the door; then it goes in, and what was left is drunk.
function milkBowl(): SignArt {
  const places = [60, 72, 84, 96, 108];
  const bowl =
    `<ellipse cx="122" cy="102.4" rx="4.6" ry="0.9" fill="#000000" opacity="0.14"/>` +
    `<path d="M117.4 98.6 Q117.8 102.6 122 102.6 Q126.2 102.6 126.6 98.6 Z" fill="#A8703F"/>`;
  const milk = `<ellipse cx="122" cy="98.6" rx="4.6" ry="1.2" fill="#FFFDF6"/>`;
  const moves: [number, number, number][] = [
    [0.385, 0, 0],
    [0.395, places[0] - 122, 4],
    [0.42, places[0] - 122, 4],
    [0.43, places[1] - 122, 4],
    [0.455, places[1] - 122, 4],
    [0.465, places[2] - 122, 4],
    [0.49, places[2] - 122, 4],
    [0.5, places[3] - 122, 4],
    [0.525, places[3] - 122, 4],
    [0.535, places[4] - 122, 4],
    [0.63, places[4] - 122, 4],
    [0.66, 114 - 122, 4],
    [0.84, 114 - 122, 4],
    [0.87, 0, 0]
  ];
  const suffah =
    `<rect x="2" y="94" width="50" height="6" fill="#D8C08E"/>` +
    [6, 27, 48].map((x) => `<rect x="${x - 1.1}" y="70" width="2.2" height="24" fill="#8A6440"/>`).join("") +
    `<rect x="0" y="66" width="54" height="5" fill="#8A6440"/>` +
    Array.from({ length: 7 }, (_, i) => `<path d="M${i * 8} 71 L${i * 8 + 4} 66.6 L${i * 8 + 8} 71" stroke="#6E8C3A" stroke-width="1" fill="none"/>`).join("") +
    `<rect x="8" y="91" width="14" height="3" rx="0.6" fill="#C9A66B"/><rect x="30" y="91" width="14" height="3" rx="0.6" fill="#C9A66B"/>`;
  return {
    kind: "milk-bowl",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(84, 22) },
      { name: "clouds", svg: cloud(40, 24, 0.4, "#FFFFFF", 0.9) + cloud(132, 16, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [70, 72],
          [100, 74],
          [20, 112],
          [146, 114]
        ])
      },
      { name: "the mosque's wall", svg: `<rect x="0" y="58" width="160" height="22" fill="#D9BE8E"/><rect x="0" y="57" width="160" height="1.8" fill="#BC9060"/>` },
      { name: "the Suffah, a shaded place by the mosque", svg: suffah },
      { name: "a home", svg: home(130, 100, 30, 26) },
      { name: "a bowl of milk, given as a gift", svg: bowl, keys: track({ opacity: [
        [0.04, 0],
        [0.07, 1]
      ], xy: moves }) },
      {
        name: "the milk in it",
        svg: milk,
        origin: { x: 122, y: 99.8 },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.07, 1]
          ],
          xy: moves,
          scaleY: [
            [0.89, 1],
            [0.94, 0.2]
          ]
        })
      },
      { name: "its glow", svg: glow(122, 99, 7, "#FFFDF0", 0.12), keys: showWhile(0.07, 0.1, 0.16, 0.18) },
      { name: "a way to the Suffah", svg: way("M126 103.4 C100 106.6 60 106.6 40 100.6", BROWN), keys: showWhile(0.22, 0.26, 0.37, 0.38) },
      { name: "a way back from the Suffah", svg: way("M40 100.6 C48 104 54 106 58 106.4", GOLD), keys: showFrom(0.27, 0.3) },
      ...places.map(
        (x, i): SignPart => ({
          name: `a place, sitting ${i + 1}`,
          svg: ring(x, 106.6, 3.4, "#B98A4A"),
          keys: { at: [0, at3(0.28 + i * 0.01), at3(0.285 + i * 0.01)], opacity: [0, 0, 1] }
        })
      ),
      ...goldSparks(
        "filled, rising",
        places.map((x): [number, number] => [x, 98]),
        0.395,
        0.035
      ),
      { name: "a place by the door", svg: ring(114, 106.6, 3.4, GOLD), keys: showFrom(0.63, 0.64) },
      { name: "a voice from the home, saying drink", svg: arcsLeft(124, 90, VOICE), keys: showWhile(0.64, 0.66, 0.73, 0.75), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      ...goldSparks(
        "drinking again",
        [
          [112, 97],
          [116, 96],
          [114, 95]
        ],
        0.675,
        0.03
      ),
      ...risingSparks(
        "praise, rising",
        [
          [118, 92],
          [126, 88],
          [122, 84]
        ],
        0.9,
        0.015,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "One bowl of milk, given as a gift", from: 0.02, to: 0.18 },
      { text: "Call the people of the Suffah", from: 0.2, to: 0.36 },
      { text: "Each drank his fill, one by one", from: 0.38, to: 0.6 },
      { text: "There remain you and I: drink", from: 0.62, to: 0.8 },
      { text: "And he drank what was left", from: 0.82, to: 1 }
    ]
  };
}

// Bread for seventy. Anas said: Abu Talhah heard hunger in the voice of the Messenger of Allah ﷺ, and Umm Sulaym
// wrapped some barley loaves in a cloth and sent me with them. He ﷺ came with all who were with him. The bread was
// broken into pieces and butter poured on it; then he said: let ten come in. Ten came in, ate their fill and went out,
// then ten more, until all had eaten their fill, seventy or eighty men (Sahih al-Bukhari 3578). No one is drawn: a
// bundle of loaves goes along a small way to the mosque; ways come back with it; the bread is broken on a cloth; ten
// small dashed circles go in and come out, again and again; and the bread is still there.
function breadForSeventy(): SignArt {
  const bundle =
    `<path d="M47 101.6 C46 98 48 95.6 51 95.6 C54 95.6 56 98 55 101.6 Z" fill="#D9C7A0"/>` +
    `<path d="M49.4 95.8 L51 93.4 L52.6 95.8" stroke="#BFA77A" stroke-width="0.8" fill="#D9C7A0"/>`;
  const cloth = `<rect x="58" y="104" width="26" height="8" rx="1" fill="#E8DCC0"/><rect x="58" y="104" width="26" height="8" rx="1" fill="none" stroke="#CDBA90" stroke-width="0.5"/>`;
  const loaf = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="2.8" ry="1.5" fill="#C99A55"/><path d="M${n(x - 1.4)} ${y} L${n(x + 1.4)} ${y}" stroke="#A97B3E" stroke-width="0.5"/>`;
  const piece = (x: number, y: number) => `<path d="M${x} ${y} l1.6 -1 l1.4 0.8 l-0.6 1.2 Z" fill="#C99A55"/>`;
  const mosque =
    `<rect x="112" y="78" width="48" height="22" fill="#D9BE8E"/><rect x="110" y="75.6" width="50" height="3" fill="#8A6440"/>` +
    Array.from({ length: 7 }, (_, i) => `<path d="M${110 + i * 7.2} 78.4 L${113.6 + i * 7.2} 75.8 L${117.2 + i * 7.2} 78.4" stroke="#6E8C3A" stroke-width="0.9" fill="none"/>`).join("") +
    `<path d="M120 100 L120 92 Q123 88.6 126 92 L126 100 Z" fill="#6B4A2E"/>`;
  const group = (label: string, start: number): SignPart[] => [
    {
      name: `ten, coming in, ${label}`,
      svg: ten(46, 108),
      keys: track({
        opacity: [
          [start, 0],
          [start + 0.004, 1],
          [start + 0.026, 1],
          [start + 0.03, 0]
        ],
        xy: [
          [start, 40, 2],
          [start + 0.026, 0, -2]
        ]
      })
    },
    {
      name: `ten, going out full, ${label}`,
      svg: ten(46, 108),
      keys: track({
        opacity: [
          [start + 0.035, 0],
          [start + 0.039, 1],
          [start + 0.056, 1],
          [start + 0.06, 0]
        ],
        xy: [
          [start + 0.035, 0, -2],
          [start + 0.06, -36, 2]
        ]
      })
    }
  ];
  return {
    kind: "bread-for-seventy",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(84, 24) },
      { name: "clouds", svg: cloud(30, 22, 0.4, "#FFFFFF", 0.9) + cloud(124, 16, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [92, 72],
          [74, 92],
          [100, 112],
          [146, 112]
        ])
      },
      { name: "a home in Madinah", svg: home(44, 100, 40, 28) },
      { name: "the mosque", svg: mosque },
      { name: "a small way, carrying them", svg: way("M48 103 C70 106 100 106 121 101.4", BROWN, 0.9), keys: showWhile(0.06, 0.14, 0.18, 0.2) },
      {
        name: "barley loaves, wrapped in a cloth",
        svg: bundle,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.06, 1],
            [0.38, 1],
            [0.4, 0]
          ],
          xy: [
            [0.07, 0, 0],
            [0.145, 70, -1],
            [0.22, 70, -1],
            [0.3, 0, 0]
          ]
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a way from the mosque, coming ${i + 1}`,
          svg: way(`M121 ${101.4 + i * 2.6} C100 ${106.4 + i * 3.4} 70 ${106.4 + i * 3.4} 50 ${103 + i * 2.6}`, GOLD),
          keys: showFrom(0.22 + i * 0.015, 0.28 + i * 0.015)
        })
      ),
      { name: "a cloth spread out", svg: cloth, keys: showFrom(0.4, 0.42) },
      { name: "the loaves, whole", svg: loaf(64, 107) + loaf(71, 109) + loaf(78, 107), keys: showWhile(0.4, 0.42, 0.45, 0.47) },
      {
        name: "the bread, broken in pieces",
        svg: [61, 64.6, 68.4, 72, 75.6, 79].map((x, i) => piece(x, i % 2 ? 109.6 : 107.4)).join(""),
        keys: showFrom(0.45, 0.47)
      },
      { name: "butter, poured on it", svg: [63, 70, 77].map((x) => `<ellipse cx="${x}" cy="107.6" rx="1.5" ry="0.8" fill="#F5D36A"/>` + sparkle(x + 0.6, 106.6, 1, "#FFF6CC")).join(""), keys: showFrom(0.48, 0.5), loop: { move: "twinkle", ms: 900, low: 0.4 } },
      ...group("first", 0.575),
      ...group("second", 0.635),
      ...group("third", 0.695),
      { name: "the bread, still there", svg: glow(71, 108, 10, "#FFF3C0", 0.1), keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...risingSparks(
        "all fed, rising",
        [
          [36, 84],
          [46, 80],
          [56, 84]
        ],
        0.88,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "A few barley loaves, sent in a cloth", from: 0.02, to: 0.18 },
      { text: "He came, and all with him", from: 0.2, to: 0.36 },
      { text: "Broken in pieces, with butter on them", from: 0.38, to: 0.54 },
      { text: "Let ten come in: they ate their fill, and went out", from: 0.56, to: 0.8 },
      { text: "Until all had eaten: seventy or eighty", from: 0.82, to: 1 }
    ]
  };
}

// Home at nightfall. The Prophet ﷺ said: when night falls, keep your children close, for the devils spread out then;
// close the doors and mention Allah's name, for Satan does not open a closed door (Sahih al-Bukhari 3304); put out the
// lamps when you go to bed, close the doors, tie the mouths of the water skins, and cover food and drink, even by laying
// a stick across it (Sahih al-Bukhari 5624). No devil is drawn, and no one: night falls on a home; two small ways come
// in; the door closes as a voice says Allah's name; a cord ties the water skin and a stick is laid across the cup; then
// the lamp in the window goes out, and the stars come out.
function nightfall(): SignArt {
  const wallX = 74;
  const homeSvg =
    `<rect x="${wallX}" y="66" width="56" height="34" fill="#D3A872"/><rect x="104" y="66" width="26" height="34" fill="#000000" opacity="0.08"/>` +
    `<rect x="${wallX - 1}" y="64.4" width="58" height="1.8" fill="#BC9060"/>` +
    `<path d="M92 100 L92 89 Q96 84.4 100 89 L100 100 Z" fill="#3A2A1C"/>` +
    `<rect x="112" y="76" width="9" height="8" fill="#3A2A1C"/>` +
    `<path d="M86 80 L86 81.6" stroke="#5E3F24" stroke-width="0.9"/>`;
  const skin = `<path d="M86 81.4 C82 83 81.4 90 84 92.6 C86 94 88 94 89.4 92 C91 88.6 89.6 83 86 81.4 Z" fill="#9A6A3E"/><path d="M85 82.6 L87 82.6" stroke="#7A5232" stroke-width="0.8"/>`;
  const bench = `<rect x="58" y="96" width="18" height="1.8" fill="#8A6440"/><path d="M60 97.8 L60 101 M74 97.8 L74 101" stroke="#6B4A2E" stroke-width="1.2"/>`;
  const cup = `<path d="M65 96 L65.6 91.6 L70.4 91.6 L71 96 Z" fill="#C67B4E"/><ellipse cx="68" cy="91.6" rx="2.4" ry="0.6" fill="#7AA6C9"/>`;
  const stars = (list: [number, number][]) => list.map(([x, y], i) => sparkle(x, y, i % 2 ? 0.9 : 1.2, "#FFF6D0")).join("");
  return {
    kind: "nightfall",
    ms: 12000,
    parts: [
      { name: "the sky at sunset", svg: sky("#F0A77E", "#D9C49A", 62) + `<rect y="44" width="160" height="18" fill="#F7C99A" opacity="0.6"/>` },
      {
        name: "the setting sun",
        svg: `${glow(26, 56, 12, "#FFE0B0", 0.14)}<circle cx="26" cy="56" r="5" fill="#FFD27A"/>`,
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.16, 0, 10]
          ],
          opacity: [
            [0.1, 1],
            [0.17, 0]
          ]
        })
      },
      { name: "hills", svg: hills("#B59A78") },
      {
        name: "the land",
        svg: landOf(
          [
            [14, 76],
            [46, 112],
            [140, 112]
          ],
          "#D9C49A"
        )
      },
      { name: "a palm in the yard", svg: palm(20, 100, 30), origin: { x: 20, y: 100 }, loop: { move: "sway", ms: 4800, angle: 1 } },
      { name: "a home", svg: homeSvg },
      { name: "a water skin by the door", svg: skin },
      { name: "a bench", svg: bench },
      { name: "a cup on it", svg: cup },
      {
        name: "night, falling",
        svg: `<rect width="160" height="62" fill="#1B2A4A"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.2, 0.82]
          ]
        })
      },
      {
        name: "dusk over the land",
        svg: `<rect y="62" width="160" height="58" fill="#0F1C3A"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.2, 0.42]
          ]
        })
      },
      { name: "the moon", svg: crescent(132, 22, 5, 2.6, "#FFF2C0"), keys: showFrom(0.14, 0.18) },
      {
        name: "the first stars",
        svg: stars([
          [40, 18],
          [96, 12],
          [150, 40]
        ]),
        keys: showFrom(0.14, 0.18),
        loop: { move: "twinkle", ms: 1300, low: 0.4 }
      },
      { name: "a small way, coming home", svg: way("M8 106 C30 107 66 106 93 101", "#FFF0C4", 0.9), keys: showFrom(0.08, 0.18) },
      { name: "another small way, coming home", svg: way("M14 113 C40 113 72 110 96 101.6", "#FFF0C4", 0.9), keys: showFrom(0.1, 0.2) },
      {
        name: "the door, closing",
        svg: `<path d="M92 100 L92 89 Q96 84.4 100 89 L100 100 Z" fill="#5E4430"/><circle cx="98.4" cy="94" r="0.6" fill="#E2B862"/>`,
        origin: { x: 92, y: 100 },
        keys: track({
          scaleX: [
            [0.3, 0.12],
            [0.36, 1]
          ]
        })
      },
      { name: "a voice, saying Bismillah at the door", svg: arcsLeft(90, 90, "#FFF6DC"), keys: showWhile(0.28, 0.3, 0.4, 0.42), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      { name: "a cord, tying the water skin", svg: `<path d="M84.4 83.4 L87.6 83.4" stroke="#E8D9B0" stroke-width="1"/><circle cx="87.8" cy="84.4" r="0.7" fill="none" stroke="#E8D9B0" stroke-width="0.5"/>`, keys: showFrom(0.52, 0.55) },
      {
        name: "a stick, laid across the cup",
        svg: `<path d="M63 91 L73 91" stroke="#7A5232" stroke-width="1" stroke-linecap="round"/>`,
        origin: { x: 68, y: 91 },
        keys: track({
          opacity: [
            [0.56, 0],
            [0.58, 1]
          ],
          xy: [
            [0.6, -12, 13],
            [0.66, 0, 0]
          ],
          rotate: [
            [0.6, 36],
            [0.66, 0]
          ]
        })
      },
      { name: "the lamp's light in the window", svg: `<rect x="112" y="76" width="9" height="8" fill="#FFD27A"/>${glow(116.5, 80, 9, "#FFE6A0", 0.1)}`, keys: track({ opacity: [
        [0.78, 1],
        [0.84, 0]
      ] }), loop: { move: "twinkle", ms: 1600, low: 0.85 } },
      { name: "the window, dark", svg: `<rect x="112" y="76" width="9" height="8" fill="#2A2630"/>`, keys: track({ opacity: [
        [0.78, 0],
        [0.84, 1]
      ] }) },
      {
        name: "more stars, coming out",
        svg: stars([
          [20, 26],
          [62, 20],
          [78, 34],
          [112, 26],
          [140, 52],
          [8, 44]
        ]),
        keys: showFrom(0.84, 0.9),
        loop: { move: "twinkle", ms: 1100, low: 0.35, phase: 0.4 }
      }
    ],
    words: [
      { text: "When night first falls, keep the children close", from: 0.02, to: 0.24 },
      { text: "Close the door, and say Allah's name", from: 0.26, to: 0.48 },
      { text: "Tie the water skin, and cover the cup", from: 0.5, to: 0.72 },
      { text: "And put out the lamp when you sleep", from: 0.74, to: 1 }
    ]
  };
}

// Even half a date. The Prophet ﷺ said: shield yourselves from the Fire, even with half a date; and if you have none,
// then with a good word (Sahih al-Bukhari 1417, 6023). No one is drawn, and nothing of the Fire: a way comes out of a
// home with a date, the date is split, and half of it goes to a home in need, as a shield of light rises around the
// way; then a way from another home, with nothing to give, says a good word to that home, and a shield rises around
// it too.
function halfDate(): SignArt {
  const date = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.5" fill="#8C3A1C"/><path d="M${n(x - 1.4)} ${n(y - 0.5)} Q${x} ${n(y - 1)} ${n(x + 1.4)} ${n(y - 0.5)}" stroke="#B7603A" stroke-width="0.4" fill="none"/>`;
  const halfOf = (x: number, y: number, left: boolean) =>
    left
      ? `<path d="M${x} ${n(y - 1.5)} A2.6 1.5 0 0 0 ${x} ${n(y + 1.5)} Z" fill="#8C3A1C"/><path d="M${x} ${n(y - 1.4)} L${x} ${n(y + 1.4)}" stroke="#D9A066" stroke-width="0.5"/>`
      : `<path d="M${x} ${n(y - 1.5)} A2.6 1.5 0 0 1 ${x} ${n(y + 1.5)} Z" fill="#8C3A1C"/><path d="M${x} ${n(y - 1.4)} L${x} ${n(y + 1.4)}" stroke="#D9A066" stroke-width="0.5"/>`;
  const shield = (x: number, y: number) =>
    `<path d="M${x - 13} ${y} A13 12 0 0 1 ${x + 13} ${y}" fill="#FFF3CF" opacity="0.34"/><path d="M${x - 13} ${y} A13 12 0 0 1 ${x + 13} ${y}" stroke="#E0A93E" stroke-width="1.2" fill="none"/>`;
  const grow = (from: number, x: number, y: number): Pick<SignPart, "keys" | "origin"> => ({
    origin: { x, y },
    keys: track({
      opacity: [
        [from, 0],
        [from + 0.03, 1]
      ],
      scale: [
        [from, 0.5],
        [from + 0.04, 1]
      ]
    })
  });
  return {
    kind: "half-date",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(120, 24) },
      { name: "clouds", svg: cloud(62, 22, 0.4, "#FFFFFF", 0.9) + cloud(146, 30, 0.32, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [60, 72],
          [116, 74],
          [76, 114],
          [150, 112]
        ])
      },
      { name: "a date palm", svg: palm(14, 100, 40) + dateBunch(13, 64) + dateBunch(19, 66), origin: { x: 14, y: 100 }, loop: { move: "sway", ms: 4600, angle: 1 } },
      { name: "another home, further off", svg: home(88, 80, 20, 14) },
      { name: "the home that gives", svg: home(42, 100, 30, 24) },
      { name: "a home in need", svg: home(134, 100, 24, 18, "#C9A777", "#AF9064") + `<path d="M140 86 L138.6 89 L140.4 91.6" stroke="#9A7C52" stroke-width="0.6" fill="none"/>` },
      { name: "a way, from the home that gives", svg: way("M42 102.6 C50 104.6 58 104.6 64 103.4", BROWN), keys: showFrom(0.04, 0.1) },
      { name: "a date", svg: date(67, 99.4), keys: showWhile(0.1, 0.12, 0.17, 0.18) },
      { name: "half a date, kept", svg: halfOf(66.4, 99.4, true), keys: showFrom(0.17, 0.18) },
      {
        name: "half a date, given",
        svg: halfOf(67.8, 99.4, false),
        keys: track({
          opacity: [
            [0.17, 0],
            [0.18, 1]
          ],
          xy: [
            [0.28, 0, 0],
            [0.4, 62, 1]
          ]
        })
      },
      { name: "a way to the home in need", svg: way("M66 104 C86 106.6 112 106.6 128 101.6", GOLD), keys: showFrom(0.28, 0.4) },
      { name: "a shield of light around the way", svg: shield(64, 104), ...grow(0.42, 64, 104) },
      { name: "a way, from another home", svg: way("M88 81 C89 90 93 97 98 103", BROWN), keys: showFrom(0.54, 0.62) },
      { name: "a voice, saying a good word", svg: arcs(101, 97, VOICE), keys: showWhile(0.64, 0.66, 0.82, 0.84), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      { name: "a shield of light around that way too", svg: shield(98, 104), ...grow(0.74, 98, 104) },
      ...risingSparks(
        "a good deed, rising",
        [
          [64, 90],
          [98, 90],
          [81, 86]
        ],
        0.86,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Shield yourselves from the Fire", from: 0.02, to: 0.24 },
      { text: "Even with half a date", from: 0.26, to: 0.5 },
      { text: "And if you have none, with a good word", from: 0.52, to: 1 }
    ]
  };
}

export const LIFE_ART = {
  "crying-trunk": cryingTrunk,
  "trench-rock": trenchRock,
  "chasing-horse": chasingHorse,
  "milk-bowl": milkBowl,
  "bread-for-seventy": breadForSeventy,
  nightfall,
  "half-date": halfDate
} as const;
