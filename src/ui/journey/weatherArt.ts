import { animalAt, cloud, dateBunch, flower, glow, GUSTS, n, nightSky, palm, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, LIGHT, lightIn, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";

/**
 * Rain and wind, as he ﷺ taught of them: his du'a when he saw the rain; the famine that comes though it rains; the
 * cloud that watered a garden; praying in one's home on a cold night; a house to keep off the rain and the sun; sheep
 * on the mountain tops; and his du'a when the wind blew hard. Only the land, the sky, homes, things, plants and animals
 * are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a face: where someone was, a ring
 * or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is
 * drawn for Allah, and no angel is drawn: a voice in a cloud is only arcs in it. Nothing comes down from the sky but the
 * rain itself, which is drops: a du'a or a deed is a spark that rises.
 */

/** Drops of a shower: short slanting strokes from x1 to x2 and from y1 to y2; `seed` sets them apart. */
const drops = (x1: number, x2: number, y1: number, y2: number, seed: number, color = "#6E9CCB") => {
  let d = "";
  let k = seed;
  for (let y = y1; y < y2; y += 8) {
    for (let x = x1 + ((k * 5) % 12); x < x2; x += 12) d += `M${n(x)} ${n(y)} l-0.5 2.6 `;
    k += 1;
  }
  return `<path d="${d.trim()}" stroke="${color}" stroke-width="0.7" stroke-linecap="round"/>`;
};

/**
 * A shower: three layers of drops, each falling a little and fading, one after another, so the drops never stop while
 * it shows; `clip`: only under its cloud.
 */
const shower = (label: string, x1: number, x2: number, y1: number, y2: number, keys: SignKeys, seed = 0, color?: string, clip?: SignPart["clip"]): SignPart[] =>
  [0, 1, 2].map((i) => ({
    name: `${label} ${i + 1}`,
    svg: drops(x1, x2, y1, y2, seed + i * 4, color),
    keys,
    loop: { move: "drip" as const, ms: 900, distance: 7, phase: i / 3 },
    ...(clip ? { clip } : {})
  }));

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A home at night, darker, its foot's middle at (x, y). */
const nightHome = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#8C7350", "#77603F", "#3A2A1C");

/** Keys that show a part from `from` to `to`, then fade it from `hide` to `gone`, to `low`. */
const dimFrom = (from: number, to: number, hide: number, gone: number, low: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, low] });

// The du'a when it rains. Aishah said: whenever the Messenger of Allah ﷺ saw the rain, he would say: a strong, fruitful
// rain (Sahih al-Bukhari 1032). No one is drawn: in Madinah under grey clouds, his place is a golden ring at the door
// of his home. Drops begin to fall; his voice speaks, and a spark of du'a rises; the clouds grow heavy and the drops
// fall thick; then the land and the hills grow green, grass and flowers come up, dates hang on the palms, and a warm
// glow comes over the land.
function rainDua(): SignArt {
  const his: [number, number] = [58.2, 104.4];
  const trees: [number, number, number][] = [
    [14, 100, 26],
    [96, 98, 30],
    [145, 101, 24]
  ];
  const clouds = (fill: string) => cloud(38, 38, 1, fill) + cloud(90, 33, 1.1, fill) + cloud(136, 40, 0.9, fill);
  const far = [8, 24, 42, 80, 106, 120, 140, 156].map((x, i) => tuft(x, 80 + (i % 3) * 2, i % 2 ? "#5FA344" : "#6DB24F", 5)).join("");
  const near = [6, 20, 38, 76, 88, 108, 132, 146].map((x, i) => tuft(x, 108 + (i % 2), i % 2 ? "#5FA344" : "#6DB24F", 6)).join("");
  const flowers = flower(28, 108, "#F47C9B") + flower(70, 109, "#FFFFFF") + flower(118, 108, "#F6B73C") + flower(140, 109, "#F47C9B");
  return {
    kind: "rain-dua",
    ms: 8000,
    parts: [
      { name: "a grey sky", svg: sky("#A9B8C8", "#C4D0DC", 62) },
      { name: "hills", svg: hills("#B9AE92") },
      { name: "fruitful: the hills grow green", svg: hills("#9DBF7E"), keys: showFrom(0.76, 0.84) },
      { name: "the land", svg: land() },
      { name: "fruitful: the land grows green", svg: `<rect y="61" width="160" height="59" fill="#A3CD7E"/><path d="M0 61 L160 61" stroke="#86B562" stroke-width="0.7"/>`, keys: showFrom(0.76, 0.84) },
      { name: "fruitful: grass coming up, far", svg: far, origin: { x: 80, y: 82 }, keys: { at: [0, 0.78, 0.88], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 3000, x: 0.5 } },
      ...palms(trees),
      ...trees.map(
        ([x, y, h], i): SignPart => ({
          name: `fruitful: dates on a palm ${i + 1}`,
          svg: dateBunch(n(x + h * 0.08), n(y - h + 2.6)),
          origin: { x, y },
          keys: showFrom(at3(0.84 + i * 0.02), at3(0.87 + i * 0.02)),
          loop: { move: "sway", ms: 5200 + i * 600, angle: 1.4, phase: i / 3 }
        })
      ),
      { name: "homes of Madinah", svg: home(30, 101, 18, 12) + home(124, 100, 18, 12) },
      { name: "his home", svg: home(60, 102, 20, 13) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "fruitful: grass coming up, near", svg: near, origin: { x: 80, y: 108 }, keys: { at: [0, 0.78, 0.88], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 3000, x: 0.5, phase: 0.4 } },
      { name: "fruitful: flowers coming up", svg: flowers, origin: { x: 80, y: 108 }, keys: { at: [0, 0.82, 0.9], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 2600, x: 0.5, phase: 0.3 } },
      ...shower("he saw it: drops falling", 0, 160, 40, 104, showFrom(0.05, 0.12)),
      ...shower("a strong downpour: more drops", 4, 160, 44, 106, showFrom(0.5, 0.58), 2, "#5B87B8"),
      { name: "grey clouds", svg: clouds("#8C9AAB"), loop: { move: "slide", ms: 12000 } },
      { name: "a strong downpour: the clouds grow heavy", svg: clouds("#6E7D90"), keys: showFrom(0.5, 0.58), loop: { move: "slide", ms: 12000 } },
      { name: "his voice: let it be strong and fruitful", svg: arcs(61.6, 99.4, VOICE), keys: showFrom(0.3, 0.33), loop: speaking },
      spark("his du'a: a spark rising", his[0], 96.4, 0.34, 0.42),
      { name: "fruitful: a warm glow over the land", svg: wash(80, 96, 72, 12, WARM, 0.12), keys: showFrom(0.88, 0.94), loop: soft }
    ],
    words: [
      { text: "Whenever he saw the rain", from: 0.02, to: 0.26 },
      { text: "He would say", from: 0.28, to: 0.46 },
      { text: "O Allah, let it be a strong rain", from: 0.48, to: 0.72 },
      { text: "And a fruitful one", from: 0.74, to: 1 }
    ]
  };
}

/** A sown field in four furrows, from x 22 to 138 and y 78 to 100, its seeds in the furrows. */
const field = (fill: string) =>
  `<path d="M30 78 L130 78 L140 100 L20 100 Z" fill="${fill}"/>` +
  [82.4, 87.8, 93.4].map((y) => `<path d="M${n(28 - (y - 78) * 0.45)} ${y} L${n(132 + (y - 78) * 0.45)} ${y}" stroke="#000000" stroke-width="0.6" opacity="0.18"/>`).join("");

// Famine, though it rains. Abu Hurairah said that the Messenger of Allah ﷺ said: the famine is not that you get no
// rain; the famine is that you get rain and rain again, and the earth grows nothing (Sahih Muslim 2904). No one is
// drawn: under a hot sun, a field lies sown in its furrows, dry and cracked, and by it stands a place with an empty
// basket. The sun goes behind grey clouds; drops fall and stop, then fall again; the field darkens, its cracks close,
// and pools of water stand in it. Then the drops stop, and nothing comes up: a grey dashed ring comes about the bare
// field, and about the empty basket.
function nothingGrows(): SignArt {
  const seeds = [80.2, 85.6, 91.2, 96.6]
    .map((y) => {
      let out = "";
      for (let x = 34 - (y - 78) * 0.45; x < 128 + (y - 78) * 0.45; x += 9) out += `<ellipse cx="${n(x)}" cy="${y}" rx="0.7" ry="0.45" fill="#8A6A3C"/>`;
      return out;
    })
    .join("");
  const cracks = `<path d="M40 84 l5 2 l-2 4 M62 92 l5 -2 l3 3 M88 82 l-3 4 l5 2 M110 90 l5 -3 l3 3 M124 96 l-4 2" stroke="#A9773F" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;
  const pools = [
    [52, 90, 6],
    [84, 96, 7],
    [112, 86, 5]
  ]
    .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.3)}" fill="#7FB3DA" opacity="0.8"/>`)
    .join("");
  const clouds = cloud(36, 38, 1.05, "#8C9AAB") + cloud(84, 33, 1.2, "#8C9AAB") + cloud(130, 40, 0.95, "#8C9AAB");
  const basket = `<path d="M146.4 104.4 L153.6 104.4 L152.6 108.6 L147.4 108.6 Z" fill="#B88A50"/><path d="M146.4 104.4 L153.6 104.4" stroke="#8E6634" stroke-width="0.6"/><path d="M147.8 106 L152.2 106 M148 107.4 L152 107.4" stroke="#8E6634" stroke-width="0.35"/>`;
  return {
    kind: "nothing-grows",
    ms: 9000,
    parts: [
      { name: "a grey sky", svg: sky("#9DAEC0", "#B6C4D2", 62) },
      { name: "a hot clear sky", svg: sky("#F1D9A8", "#F6E6C4", 62), keys: { at: [0, 0.34, 0.42], opacity: [1, 1, 0] } },
      { name: "the sun", svg: sun(128, 24), keys: { at: [0, 0.34, 0.4], opacity: [1, 1, 0] } },
      { name: "no showers: the sun's heat spreads", svg: glow(128, 24, 26, "#FFE9A6", 0.24), keys: showWhile(0.06, 0.14, 0.34, 0.4), loop: soft },
      { name: "hills", svg: hills("#C9B38C") },
      { name: "the land", svg: land() },
      { name: "the field, dry", svg: field("#D2A266") },
      { name: "the field, wet and dark", svg: field("#94683E"), keys: showFrom(0.45, 0.52) },
      { name: "the seeds in its furrows", svg: seeds },
      { name: "no showers: the field cracked", svg: cracks, keys: { at: [0, 0.45, 0.52], opacity: [1, 1, 0] } },
      { name: "pools of water on the field", svg: pools, keys: dimFrom(0.55, 0.6, 0.72, 0.78, 0.5), loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      { name: "the place of the one who sowed it", svg: someone(144, 101.4, 1.7) },
      { name: "an empty basket", svg: basket },
      ...shower("showers: drops falling", 0, 160, 42, 104, { at: [0, 0.43, 0.46, 0.5, 0.52], opacity: [0, 0, 1, 1, 0] }),
      ...shower("showers again: drops falling", 0, 160, 42, 104, { at: [0, 0.53, 0.56, 0.68, 0.72], opacity: [0, 0, 1, 1, 0] }, 2),
      { name: "grey clouds", svg: clouds, keys: track({ xy: [[0.34, -60, 0], [0.44, 0, 0]], opacity: [[0.34, 0], [0.38, 1]] }) },
      { name: "nothing grows: a grey dashed ring about the field", svg: greyRing(80, 89, 64, 15), keys: showFrom(0.76, 0.84) },
      { name: "famine: a grey dashed ring about the empty basket", svg: greyRing(150, 106, 6.4, 3), keys: showFrom(0.86, 0.92) }
    ],
    words: [
      { text: "Famine is not that no rain comes", from: 0.02, to: 0.3 },
      { text: "But that rain comes, and comes again", from: 0.32, to: 0.64 },
      { text: "And the earth grows nothing", from: 0.66, to: 1 }
    ]
  };
}

/** A small spade standing in the ground, its blade's foot at (x, y). */
const spadeAt = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 3)} L${x} ${n(y - 11)}" stroke="#7A5634" stroke-width="0.8" stroke-linecap="round"/><path d="M${n(x - 1.4)} ${n(y - 11)} L${n(x + 1.4)} ${n(y - 11)}" stroke="#7A5634" stroke-width="0.7" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 3.4)} L${n(x + 1.6)} ${n(y - 3.4)} L${n(x + 1.2)} ${n(y - 0.4)} Q${x} ${y} ${n(x - 1.2)} ${n(y - 0.4)} Z" fill="#8E969C"/>`;

/** A small heap of dates, a third of what a garden gave, its middle at (x, y). */
const heap = (x: number, y: number) =>
  [
    [-1.6, 0],
    [0, 0],
    [1.6, 0],
    [-0.8, -1.1],
    [0.8, -1.1],
    [0, -2.1]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="0.65" fill="#8E3518"/>`)
    .join("");

// The cloud and the garden. Abu Hurairah said that the Prophet ﷺ said: while a man was in the wilderness, he heard a
// voice in a cloud: water the garden of so-and-so. That cloud moved aside and poured its water on stony ground, and a
// channel among its channels took all that water. He followed the water, and there was a man standing in his garden,
// turning the water with his spade. He asked his name, and it was the name he had heard in the cloud; and he said: I
// look at what comes out of it; I give a third in charity, I and my family eat a third, and I put a third back into it
// (Sahih Muslim 2984a). No one is drawn, and no angel: the voice is only arcs in the cloud. In the wilderness a place
// hears the voice; a faint way goes from the cloud toward a garden far off. The cloud moves aside and its drops pour on
// the black stony ground; the water runs into a channel, and the place follows it to the garden, where a spade turns
// the water into the beds. What the garden gives is three small heaps: one goes to a place in need, and a spark rises;
// one goes to his home, with a warm glow; and one goes back into the garden, which grows, with a warm glow over it.
function cloudAndGarden(): SignArt {
  const traveller: [number, number] = [22, 104];
  const owner: [number, number] = [118, 99.6];
  const needy: [number, number] = [70, 104.4];
  const homeDoor: [number, number] = [130.2, 82.4];
  const thirds: [number, number][] = [
    [106, 106.6],
    [112, 106.6],
    [124, 106.6]
  ];
  const harrah =
    `<path d="M34 74 C38 68.4 52 67.4 62 68 C72 68.4 80 71 78.4 75.6 C76.6 79.6 60 80.6 48 80 C40 79.8 32.6 78.4 34 74 Z" fill="#4A4644"/>` +
    [
      [42, 74],
      [50, 71],
      [58, 76],
      [66, 72],
      [72, 75.4]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="1" fill="#5E5955"/>`)
      .join("");
  const bed = (x: number, y: number) => `<rect x="${x}" y="${y}" width="13" height="3" rx="0.6" fill="#9C7A4E"/>`;
  const beds: [number, number][] = [
    [108, 89],
    [126, 89],
    [142, 89],
    [126, 96],
    [142, 96],
    [130, 103],
    [144, 103]
  ];
  const sprouts = beds.map(([x, y]) => tuft(x + 3.5, y + 0.6, "#5FA344", 3) + tuft(x + 9.5, y + 0.6, "#6DB24F", 3)).join("");
  const water = beds.map(([x, y]) => `<path d="M${x + 1} ${y + 1.5} L${x + 12} ${y + 1.5}" stroke="#5EA9DA" stroke-width="0.9" stroke-linecap="round"/>`).join("");
  const channel = (d: string) => `<path d="${d}" stroke="#5EA9DA" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  const legs = ["M77 76.6 C82 77.6 86 80 88.6 83", "M88.6 83 C91 86 94.6 87.6 99 88.4", "M99 88.4 C103 89.2 105.4 90.4 108 90.6"];
  return {
    kind: "cloud-and-garden",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E0F2", "#DDEFF9", 62) },
      { name: "hills", svg: hills("#C9B38C") },
      {
        name: "the wilderness",
        svg: landOf([
          [14, 74],
          [96, 70],
          [30, 116],
          [62, 112]
        ])
      },
      { name: "the stony ground, black", svg: harrah },
      { name: "the stony ground, wet", svg: harrah.replace(/#4A4644/g, "#3A4A58").replace(/#5E5955/g, "#56677A"), keys: showFrom(0.42, 0.44) },
      { name: "a dry channel", svg: `<path d="${legs.join(" ")}" stroke="#C2A574" stroke-width="2.2" fill="none" stroke-linecap="round"/>` },
      ...legs.map((d, i): SignPart => ({ name: `the channel takes it all: water ${i + 1}`, svg: channel(d), keys: showFrom(at3(0.52 + i * 0.02), at3(0.54 + i * 0.02)) })),
      { name: "the garden", svg: `<path d="M104 84 Q130 80.6 158 82 L158 109 L100 109 Z" fill="#8CC56A"/>` },
      ...palms(
        [
          [112, 84, 18],
          [148, 84, 18]
        ],
        "the garden"
      ),
      { name: "his home by the garden", svg: home(132, 82.4, 14, 10) },
      { name: "the beds of the garden", svg: beds.map(([x, y]) => bed(x, y)).join("") + sprouts },
      { name: "turned by his spade: water in the beds", svg: water, keys: showFrom(0.59, 0.62), loop: { move: "twinkle", ms: 2000, low: 0.75 } },
      {
        name: "put back into it: the garden grows",
        svg: beds.map(([x, y]) => tuft(x + 6.5, y + 0.6, "#4F9A3C", 4.4)).join(""),
        origin: { x: 132, y: 99 },
        keys: { at: [0, 0.9, 0.94], scaleY: [0, 0, 1] },
        loop: { move: "bob", ms: 3000, x: 0.4 }
      },
      { name: "the place of the one in his garden", svg: someone(owner[0], owner[1], 1.7) },
      {
        name: "his spade, turning the water",
        svg: spadeAt(121.6, 103),
        origin: { x: 121.6, y: 103 },
        keys: { at: [0, 0.58, 0.595, 0.61], rotate: [0, 0, -16, 0] }
      },
      { name: "the place of one in need", svg: someone(needy[0], needy[1], 1.5) },
      {
        name: "the place of the one in the wilderness",
        svg: someone(traveller[0], traveller[1], 1.7),
        keys: track({
          xy: [
            [0.53, 0, 0],
            [0.56, 36, -6],
            [0.59, 70, -8]
          ]
        })
      },
      ...thirds.map(([x, y], i): SignPart => {
        const label = ["a third, given in charity", "a third, eaten at home", "a third, put back into it"][i];
        const go: [number, number, number][][] = [
          [
            [0.71, 0, 0],
            [0.74, needy[0] - x + 2.8, needy[1] - y + 1.4]
          ],
          [
            [0.74, 0, 0],
            [0.77, homeDoor[0] - x, homeDoor[1] - y + 1.2]
          ],
          [
            [0.86, 0, 0],
            [0.89, 142 + 6.5 - x, 103 + 1.2 - y]
          ]
        ];
        const fade: [number, number][] = i === 2 ? [[0.69, 0], [0.71, 1], [0.89, 1], [0.91, 0]] : [[0.69, 0], [0.71, 1]];
        return { name: label, svg: heap(x, y), keys: track({ xy: go[i], opacity: fade }) };
      }),
      spark("given in charity: a spark rising", needy[0], 100.4, 0.74, 0.79),
      { name: "eaten at home: a warm glow at his home", svg: wash(132, 78.4, 9, 5, WARM, 0.22), keys: showFrom(0.76, 0.79), loop: soft },
      { name: "a warm glow over the garden", svg: wash(130, 96, 30, 12, WARM, 0.14), keys: showFrom(0.9, 0.94), loop: soft },
      ...shower("it poured its water: drops on the stony ground", 34, 80, 40, 80, showWhile(0.41, 0.43, 0.51, 0.53), 0, "#5E86AE", { x: 34, y: 38, w: 46, h: 42 }),
      {
        name: "the cloud",
        svg: cloud(40, 38, 0.9, "#F2F5F8"),
        keys: track({
          xy: [
            [0.37, 0, 0],
            [0.41, 17, 0]
          ]
        })
      },
      { name: "a voice in the cloud", svg: arcs(36, 31.6, "#8A9AAE"), keys: showWhile(0.08, 0.11, 0.35, 0.37), loop: speaking },
      { name: "the voice: a faint way toward the garden", svg: way("M58 34 C86 28 112 44 128 72", "#FFFFFF", 0.9), keys: showWhile(0.2, 0.26, 0.35, 0.37) }
    ],
    words: [
      { text: "One in the wilderness heard a voice", from: 0.02, to: 0.16 },
      { text: "In a cloud: water so-and-so's garden", from: 0.18, to: 0.32 },
      { text: "It poured its water on stony ground", from: 0.34, to: 0.48 },
      { text: "The man followed the water to a gardener", from: 0.5, to: 0.66 },
      { text: "Gardener: A third I give, a third we eat", from: 0.68, to: 0.83 },
      { text: "And a third I put back into it", from: 0.85, to: 1 }
    ]
  };
}

// Praying in one's home on a cold night. Nafi' said: Ibn Umar called the adhan for the prayer on a night of cold and
// wind, then said: pray in your homes. Then he said: the Messenger of Allah ﷺ used to tell the caller, on a night of
// cold and rain, to say: pray in your homes (Sahih al-Bukhari 666). No one is drawn: on a cold night, wind blows over
// the homes, and Ibn Umar's place stands on a rise. Ibn Umar's voice calls the adhan, and its call spreads; then
// pray in your homes, and a warm light comes in each home. Then his place, a golden ring, comes by the rise with the
// place of his caller beside it, not Ibn Umar's, and a golden way goes from the ring to that caller; drops fall on the
// cold night; his caller's voice speaks, and from each home a spark of prayer rises.
function prayInYourHomes(): SignArt {
  const caller: [number, number] = [30, 91.6];
  // His caller, in his time: beside the golden ring, on the land before the rise.
  const told: [number, number] = [34, 106];
  const homes: [number, number, number, number][] = [
    [72, 100, 16, 11],
    [96, 103, 16, 11],
    [120, 100, 16, 11],
    [144, 103, 16, 11]
  ];
  const doors = homes.map(([x, y]): [number, number] => [n(x - 1.8), n(y - 2.6)]);
  const clouds = (fill: string) => cloud(30, 34, 0.9, fill) + cloud(86, 31, 1.05, fill) + cloud(134, 36, 0.85, fill);
  return {
    kind: "pray-in-your-homes",
    ms: 12000,
    parts: [
      { name: "the night", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [12, 16],
          [52, 14],
          [70, 38],
          [108, 14],
          [150, 18],
          [118, 44]
        ]),
        loop: { move: "twinkle", ms: 3000, low: 0.5 }
      },
      { name: "hills", svg: hills("#1E2A44") },
      { name: "the land at night", svg: `<rect y="61" width="160" height="59" fill="#27324D"/><path d="M0 61 L160 61" stroke="#34405E" stroke-width="0.7"/>` },
      { name: "a cold night: frost on the land", svg: `<rect y="61" width="160" height="59" fill="#BFD9F2" opacity="0.16"/>` + [14, 40, 64, 88, 112, 136, 152].map((x, i) => `<circle cx="${x}" cy="${106 + (i % 3)}" r="0.5" fill="#E6F2FC"/>`).join(""), keys: showFrom(0.05, 0.1) },
      { name: "a rise", svg: `<path d="M8 100 Q30 85.6 54 100 Z" fill="#2F3B58"/>` },
      { name: "a palm at night", svg: palm(58, 99, 20, "#2F5530"), origin: { x: 58, y: 99 }, loop: { move: "sway", ms: 2400, angle: 2.4 } },
      { name: "the homes", svg: homes.map(([x, y, w, h]) => nightHome(x, y, w, h)).join("") },
      ...doors.map(([x, y], i): SignPart => ({ name: `pray in your homes: a warm light in a home ${i + 1}`, svg: lightIn(x, y, 4), keys: showFrom(at3(0.36 + i * 0.01), at3(0.39 + i * 0.01)), loop: soft })),
      { name: "Ibn Umar's place, the caller on the rise", svg: someone(caller[0], caller[1], 1.7, LIGHT) },
      { name: "Ibn Umar's voice: the adhan, then pray in your homes", svg: arcs(33, 89.4), keys: showWhile(0.2, 0.23, 0.5, 0.53), loop: speaking },
      { name: "the adhan: its call spreading", svg: `<circle cx="${caller[0]}" cy="${caller[1]}" r="12" stroke="#F3E3C0" stroke-width="0.5" fill="none" opacity="0.6"/>`, origin: { x: caller[0], y: caller[1] }, keys: { at: [0, 0.21, 0.26, 0.28], scale: [0.2, 0.2, 1, 1], opacity: [0, 0, 1, 0] } },
      { name: "a golden ring, his place", svg: ring(12, 104.4, 2.4, GOLD) + glow(12, 104.4, 4, WARM, 0.2), keys: showFrom(0.51, 0.54) },
      { name: "his caller's place, by him", svg: someone(told[0], told[1], 1.6, LIGHT), keys: showFrom(0.51, 0.54) },
      { name: "he told the caller: a golden way to the caller", svg: way(`M14.8 104.8 Q24 101.4 ${n(told[0] - 2.6)} ${n(told[1] - 0.8)}`, "#E8C25A", 0.9), keys: showFrom(0.55, 0.59) },
      { name: "his voice: tell them", svg: arcs(14.6, 100.2, "#E8C25A"), keys: showWhile(0.53, 0.56, 0.66, 0.69), loop: speaking },
      ...shower("a night of cold and wet: drops falling", 0, 160, 36, 104, showFrom(0.68, 0.72), 0, "#9DC0E0"),
      { name: "dark clouds", svg: clouds("#2E3A5C"), loop: { move: "slide", ms: 12000 } },
      { name: "a cold, wet night: the clouds grow heavy", svg: clouds("#3E4A6A"), keys: showFrom(0.67, 0.72), loop: { move: "slide", ms: 12000 } },
      { name: "the cold wind blowing", svg: GUSTS, keys: showFrom(0.03, 0.08), loop: { move: "slide", ms: 2400 } },
      { name: "the caller's voice: pray in your homes", svg: arcs(n(told[0] + 3.4), n(told[1] - 3.4)), keys: showFrom(0.84, 0.87), loop: speaking },
      ...doors.map(([x, y], i): SignPart => spark(`praying at home: a spark rising from a home ${i + 1}`, x, n(y - 6), at3(0.87 + i * 0.015), at3(0.91 + i * 0.015)))
    ],
    words: [
      { text: "On a night of cold and wind", from: 0.02, to: 0.16 },
      { text: "Ibn Umar called the adhan", from: 0.18, to: 0.32 },
      { text: "Then said: pray in your homes", from: 0.34, to: 0.48 },
      { text: "He used to tell the caller", from: 0.5, to: 0.64 },
      { text: "On nights of cold and rain", from: 0.66, to: 0.81 },
      { text: "To say: pray in your homes", from: 0.83, to: 1 }
    ]
  };
}

/** A row of mud bricks from x1 to x2, its foot at y, 3 high; `k` sets its joints apart; none in the doorway `gap`. */
const brickRow = (x1: number, x2: number, y: number, k: number, gap?: [number, number]) => {
  const pieces: [number, number][] = [];
  for (let x = x1 - (k % 2) * 2; x < x2; x += 4) {
    const a = Math.max(x, x1);
    const b = Math.min(x + 4, x2);
    if (!gap || b <= gap[0] || a >= gap[1]) pieces.push([a, b]);
    else {
      if (a < gap[0]) pieces.push([a, gap[0]]);
      if (b > gap[1]) pieces.push([gap[1], b]);
    }
  }
  return pieces
    .filter(([a, b]) => b - a >= 0.6)
    .map(([a, b], i) => `<rect x="${n(a + 0.15)}" y="${n(y - 2.85)}" width="${n(b - a - 0.3)}" height="2.7" rx="0.25" fill="${(i + k) % 3 === 1 ? "#C49A66" : "#CDA572"}"/>`)
    .join("");
};

// A house for the rain and the sun. Ibn Umar said: I saw myself in the time of the Prophet ﷺ: I built a house with my
// own hand, to shelter me from the rain and shade me from the sun; none of Allah's creation helped me build it (Sahih
// al-Bukhari 6302). No one is drawn, and no hand: by Madinah, with his masjid and his place, a golden ring, far off,
// Ibn Umar's place stands by the ground where the house will be, and it rises row by row of mud brick, and a roof of
// palm leaves comes on it. Clouds come, and drops fall about the house; his place goes in at its door, and a warm glow
// comes inside. Then the sky clears and the sun is hot; the house casts its shade, and his place goes into it. A warm
// glow comes about the small house he built alone, and about his place.
function houseForRainAndSun(): SignArt {
  const rows = [100, 97, 94, 91];
  const gap: [number, number] = [103.6, 108.4];
  const inside: [number, number] = [106, 99.4];
  return {
    kind: "house-for-rain-and-sun",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "a grey sky", svg: sky("#A9B8C8", "#C4D0DC", 62), keys: showWhile(0.28, 0.34, 0.51, 0.56) },
      { name: "the sun", svg: sun(132, 22), keys: { at: [0, 0.28, 0.32, 0.52, 0.56], opacity: [1, 1, 0, 0, 1] } },
      { name: "the sun's heat", svg: glow(132, 22, 26, "#FFE9A6", 0.24), keys: showFrom(0.55, 0.6), loop: soft },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [44, 96, 22],
        [146, 98, 22]
      ]),
      { name: "his masjid, far off", svg: madinahMasjid(4, 90, 0.55) },
      { name: "a golden ring, his place, far off", svg: ring(17.2, 92.2, 1.8, GOLD) },
      ...shower("drops falling about the house", 0, 160, 40, 104, showWhile(0.33, 0.37, 0.51, 0.54)),
      { name: "the house's shade", svg: `<path d="M120 100 L144 100 L150 106 L124 106 Z" fill="#000000" opacity="0.16"/>`, keys: showFrom(0.56, 0.6) },
      { name: "the ground of the house", svg: `<ellipse cx="106" cy="100.4" rx="18" ry="1.6" fill="#C9AE7E"/>` },
      ...rows.map((y, i): SignPart => ({ name: `built by him: mud bricks, row ${i + 1}`, svg: brickRow(90, 122, y, i, i < 2 ? gap : undefined), keys: showFrom(at3(0.04 + i * 0.03), at3(0.07 + i * 0.03)) })),
      { name: "built by him: its doorway", svg: `<rect x="${gap[0]}" y="94" width="${n(gap[1] - gap[0])}" height="6" fill="#5E4628"/>`, keys: showFrom(0.07, 0.1) },
      { name: "built by him: a roof of palm leaves", svg: `<path d="M87.6 88.6 L124.4 88.6 L123 86 L89 86 Z" fill="#6E8F3A"/><path d="M90 87.8 L94 86.4 M96 87.8 L100 86.4 M102 87.8 L106 86.4 M108 87.8 L112 86.4 M114 87.8 L118 86.4 M120 87.8 L123 86.6" stroke="#56742B" stroke-width="0.5"/>`, keys: showFrom(0.16, 0.2) },
      { name: "sheltered: a warm glow inside the house", svg: wash(inside[0], 97, 4, 3, WARM, 0.36), keys: showWhile(0.4, 0.44, 0.6, 0.64), loop: soft },
      {
        name: "Ibn Umar's place",
        svg: someone(80, 102.4, 1.7),
        keys: track({
          xy: [
            [0.37, 0, 0],
            [0.42, inside[0] - 80, inside[1] - 102.4],
            [0.6, inside[0] - 80, inside[1] - 102.4],
            [0.66, 50, 1.6]
          ]
        })
      },
      { name: "shaded: a soft ring about his place in the shade", svg: ring(130, 104, 3.4, "#FFF3CF"), keys: showFrom(0.64, 0.67) },
      { name: "grey clouds", svg: cloud(48, 37, 1, "#8C9AAB") + cloud(100, 33, 1.15, "#8C9AAB") + cloud(138, 40, 0.85, "#8C9AAB"), keys: showWhile(0.28, 0.34, 0.51, 0.56), loop: { move: "slide", ms: 12000 } },
      { name: "a house he built alone: a warm glow about it", svg: wash(106, 94, 22, 10, WARM, 0.14), keys: showFrom(0.76, 0.82), loop: soft },
      { name: "none helped him: a soft golden ring about his place", svg: ring(130, 104, 4.4, "#E8C25A"), keys: showFrom(0.82, 0.88), loop: soft }
    ],
    words: [
      { text: "Ibn Umar: In his lifetime, I built a house", from: 0.02, to: 0.24 },
      { text: "To shelter me from the rain", from: 0.26, to: 0.48 },
      { text: "And shade me from the sun", from: 0.5, to: 0.72 },
      { text: "None of Allah's creation helped me", from: 0.74, to: 1 }
    ]
  };
}

// Sheep on the mountain tops. Abu Sa'id al-Khudri said that the Messenger of Allah ﷺ said: soon the best wealth of a
// man will be sheep that he follows to the tops of the mountains and the places where the rain falls, fleeing with his
// faith from trials (Sahih al-Bukhari 3300). No one is drawn: by a town in the valley, a place stands with three sheep,
// and a warm glow comes about them. They go up the path to the mountain's top; a cloud comes over it, drops fall, and
// green grass comes up where they fall, and the sheep graze. Down in the town, a grey haze and a grey dashed ring come
// about its homes: its trials; and a soft golden ring comes about his place on the mountain: his faith kept safe.
function sheepOnTheHills(): SignArt {
  const start: [number, number] = [64, 104];
  const top: [number, number] = [128, 62.4];
  // The way up, and where each sheep goes along it: a little beside the way, and where it grazes on the top.
  const bends: [number, number][] = [
    [88, 94],
    [112, 78]
  ];
  const flock: { from: [number, number]; beside: [number, number]; to: [number, number] }[] = [
    { from: [74, 105], beside: [6, 1.2], to: [137, 63.4] },
    { from: [82, 104.4], beside: [12, 0.6], to: [146, 62.8] },
    { from: [90, 105.4], beside: [-6, 2.4], to: [118, 64.6] }
  ];
  const up = (from: [number, number], beside: [number, number], to: [number, number], lag: number) =>
    track({
      xy: [from, ...bends.map(([x, y]): [number, number] => [x + beside[0], y + beside[1]]), to].map(([x, y], i): [number, number, number] => [at3(0.265 + lag + i * 0.04), n(x - from[0]), n(y - from[1])])
    });
  const mountain = `<path d="M66 100 L100 68 Q116 55.6 134 57 Q150 58 160 65 L160 100 Z" fill="#A08E70"/><path d="M134 57 Q150 58 160 65 L160 100 L140 100 Z" fill="#000000" opacity="0.1"/>`;
  return {
    kind: "sheep-on-the-hills",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(26, 22) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the mountain", svg: mountain },
      { name: "the way up the mountain", svg: `<path d="M64 104 L88 94 L112 78 L128 62" stroke="#C9B48A" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-dasharray="3 1.6"/>` },
      { name: "where the drops fall: green grass on the top", svg: `<path d="M106 63 Q118 55.6 134 57 Q150 58 160 64.4 L160 68 Q132 62 106 66 Z" fill="#8CC56A"/>` + [112, 122, 132, 142, 152].map((x) => tuft(x, 62.6, "#5FA344", 3.4)).join(""), origin: { x: 132, y: 66 }, keys: { at: [0, 0.56, 0.64], opacity: [0, 0, 1], scaleY: [0.4, 0.4, 1] } },
      ...palms([[40, 96, 20]], "the town"),
      { name: "homes of the town", svg: home(12, 100, 14, 10) + home(30, 102, 16, 11) + home(50, 100, 14, 10) },
      { name: "its trials: a grey haze over the town", svg: wash(30, 96, 30, 12, "#7D746C", 0.14), keys: showFrom(0.76, 0.84) },
      { name: "its trials: a grey dashed ring about the town", svg: greyRing(31, 97, 30, 10), keys: showFrom(0.78, 0.84) },
      { name: "his best wealth: a warm glow about the sheep", svg: wash(82, 102.6, 14, 4.6, WARM, 0.3), keys: { at: [0, 0.06, 0.12, 0.27, 0.29], opacity: [0, 0, 1, 1, 0] }, loop: soft },
      ...flock.map(({ from, beside, to }, i): SignPart => ({
        name: `a sheep of the flock ${i + 1}`,
        svg: sheepAt(from[0], from[1], 0.09),
        keys: up(from, beside, to, i * 0.012),
        loop: { move: "bob", ms: 900 + i * 120, y: -0.4, phase: i / 3 }
      })),
      { name: "the place of the one with the flock", svg: someone(start[0], start[1], 1.7), keys: up(start, [0, 0], top, 0.04) },
      { name: "his faith kept safe: a soft golden ring about his place", svg: ring(top[0], n(top[1] + 0.4), 3.6, "#E8C25A"), keys: showFrom(0.84, 0.9), loop: soft },
      ...shower("where the drops fall on the mountain", 106, 160, 38, 64, showFrom(0.53, 0.57), 0, "#5E86AE", { x: 104, y: 36, w: 56, h: 28 }),
      { name: "a cloud over the mountain top", svg: cloud(134, 38, 0.85, "#9AA8B8"), keys: showFrom(0.51, 0.55) }
    ],
    words: [
      { text: "Soon a man's best wealth will be sheep", from: 0.02, to: 0.24 },
      { text: "The man follows them to the mountain tops", from: 0.26, to: 0.48 },
      { text: "And to where the rain falls", from: 0.5, to: 0.72 },
      { text: "Fleeing with one's faith from trials", from: 0.74, to: 1 }
    ]
  };
}

/** Palms bending in a strong wind. */
const windyPalms = (list: [number, number, number][]): SignPart[] =>
  list.map(([x, y, h], i) => ({ name: `a palm of Madinah in the wind ${i + 1}`, svg: palm(x, y, h), origin: { x, y }, loop: { move: "sway", ms: 1600 + i * 220, angle: 3.2, phase: i / 3 } }));

// The du'a when the wind blows. Aishah said: when the wind blew hard, the Prophet ﷺ would say: O Allah, I ask You for
// its good, the good in it and the good it is sent with, and I seek refuge in You from its evil, the evil in it and
// the evil it is sent with. When clouds gathered in the sky, his colour changed, and he went out and in, forward and
// back; and when it rained, it was lifted from him. I asked him, and he said: perhaps it is, Aishah, as the people of
// 'Ad said: when they saw it as a cloud coming toward their valleys, they said: this is a cloud bringing us rain (Sahih
// Muslim 899b; Sahih al-Bukhari 4829 tells of the clouds and 'Ad too). No one is drawn, and no storm: the wind sweeps
// over Madinah and bends the palms; his place is a golden ring at his door. His voice speaks; a spark of his du'a rises,
// and small lights of its good go with the wind; a golden ring of refuge comes about the homes. Dark clouds gather; a
// faint grey ring comes about his place, and it goes out from his door and back in. Drops fall: the grey ring fades and
// a warm glow comes about his place. His voice speaks to her place at the door, and far off, a cloud over the valleys
// gets a grey dashed ring.
function whenTheWindBlows(): SignArt {
  const his: [number, number] = [78.2, 104.6];
  const hers: [number, number] = [66.4, 104.2];
  const out = track({
    xy: [
      [0.56, 0, 0],
      [0.585, 9, 1.6],
      [0.61, 0, 0]
    ]
  });
  const dark = cloud(54, 32, 1.1, "#6E7D90") + cloud(100, 27, 1.2, "#6E7D90") + cloud(140, 33, 0.9, "#6E7D90");
  const goodLights = [
    [14, 30],
    [46, 44],
    [92, 24],
    [128, 46],
    [150, 26]
  ]
    .map(([x, y]) => sparkle(x, y, 1.2, "#FFE7A0"))
    .join("");
  const dust = [6, 22, 40, 58, 76, 94, 112, 130, 148].map((x, i) => `<circle cx="${x}" cy="${56 + (i % 4) * 9}" r="0.55" fill="#C8B08A" opacity="0.8"/>`).join("");
  return {
    kind: "when-the-wind-blows",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFD6E8", "#D9E8F2", 62) },
      { name: "the sky clouded over: it darkens", svg: sky("#8C9BAC", "#A6B3C1", 62), keys: { at: [0, 0.51, 0.56, 0.7, 0.76], opacity: [0, 0, 1, 1, 0.6] } },
      { name: "hills", svg: hills("#C9B38C") },
      { name: "the land", svg: land() },
      ...windyPalms([
        [14, 101, 24],
        [110, 99, 28],
        [146, 102, 22]
      ]),
      { name: "homes of Madinah", svg: home(30, 100, 18, 12) + home(132, 100, 18, 12) },
      { name: "his home", svg: home(80, 102, 22, 14) },
      { name: "her place, at the door", svg: someone(hers[0], hers[1], 1.6) },
      { name: "refuge: a golden ring of care about the homes", svg: care(82, 101.6, 70, 7, GOLD), keys: showFrom(0.36, 0.42), loop: soft },
      { name: "his look changed: a faint grey ring about his place", svg: greyRing(his[0], his[1], 4.4, 2.6), keys: track({
          xy: [
            [0.56, 0, 0],
            [0.585, 9, 1.6],
            [0.61, 0, 0]
          ],
          opacity: [
            [0.54, 0],
            [0.56, 1],
            [0.72, 1],
            [0.75, 0]
          ]
        })
      },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD), keys: out },
      { name: "it was lifted from him: a warm glow about his place", svg: wash(his[0], n(his[1] - 1), 7, 3.6, WARM, 0.3), keys: showFrom(0.74, 0.78), loop: soft },
      ...shower("when it fell: drops falling", 0, 160, 42, 104, showFrom(0.69, 0.72)),
      { name: "the wind blowing hard", svg: GUSTS, keys: showFrom(0.03, 0.07), loop: { move: "slide", ms: 1500 } },
      { name: "dust blown by the wind", svg: dust, keys: showFrom(0.03, 0.07), loop: { move: "slide", ms: 1900 } },
      { name: "its good: small lights going with the wind", svg: goodLights, keys: showWhile(0.22, 0.27, 0.5, 0.53), loop: { move: "slide", ms: 4200 } },
      { name: "clouds gathering in the sky", svg: dark, keys: track({ xy: [[0.51, -24, 0], [0.56, 0, 0]], opacity: [[0.51, 0], [0.54, 1], [0.7, 1], [0.76, 0.7]] }) },
      { name: "his voice: I ask You for its good", svg: arcs(81.6, 99.4, VOICE), keys: showWhile(0.09, 0.12, 0.5, 0.53), loop: speaking },
      spark("his du'a: a spark rising", his[0], 96.6, 0.2, 0.28),
      spark("his refuge: a spark rising", his[0], 96.6, 0.37, 0.44),
      {
        name: "far off: the valleys of 'Ad, in a soft circle",
        svg:
          `<circle cx="20" cy="42" r="12.4" fill="#EFE6D4" stroke="#B7A68A" stroke-width="0.6"/>` +
          `<path d="M8.6 47 Q13 41.6 18 46 Q23 40.6 31.4 46.4 L31 49 Q20 54.4 9 49 Z" fill="#C2AE88"/><path d="M15 47.6 Q18 46.4 21 47.8" stroke="#9E8A64" stroke-width="0.5" fill="none"/>`,
        keys: showFrom(0.88, 0.91)
      },
      { name: "far off: a cloud facing their valleys", svg: cloud(19.4, 39, 0.34, "#6E7D90"), keys: showFrom(0.89, 0.92) },
      { name: "as 'Ad said: a grey dashed ring about their cloud", svg: `<ellipse cx="19.6" cy="36.4" rx="8.4" ry="4.6" stroke="#5A524C" stroke-width="0.6" stroke-dasharray="1 0.9" fill="none"/>`, keys: showFrom(0.92, 0.95) },
      { name: "his voice: perhaps it is as 'Ad said", svg: arcsLeft(75.2, 99.4, VOICE), keys: showFrom(0.85, 0.88), loop: speaking }
    ],
    words: [
      { text: "When the wind blew hard, he said", from: 0.02, to: 0.16 },
      { text: "O Allah, I ask You for its good", from: 0.18, to: 0.32 },
      { text: "And seek refuge in You from its evil", from: 0.34, to: 0.48 },
      { text: "When clouds gathered, his look changed", from: 0.5, to: 0.66 },
      { text: "When it rained, it was lifted from him", from: 0.68, to: 0.82 },
      { text: "Perhaps, Aishah, it is as 'Ad said", from: 0.84, to: 1 }
    ]
  };
}

export const WEATHER_ART = {
  "rain-dua": rainDua,
  "nothing-grows": nothingGrows,
  "cloud-and-garden": cloudAndGarden,
  "pray-in-your-homes": prayInYourHomes,
  "house-for-rain-and-sun": houseForRainAndSun,
  "sheep-on-the-hills": sheepOnTheHills,
  "when-the-wind-blows": whenTheWindBlows
};
