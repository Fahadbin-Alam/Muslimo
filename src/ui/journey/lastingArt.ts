import { cloud, glow, n, palm, sky, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { cover, crooked, GREY, prayerMat, speck } from "./lovedArt";
import { dish, goldHeap, roundTree } from "./worthArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * What lasts, as the Prophet ﷺ taught it, drawn as the scenes of what truly counts are (worthArt.ts): a masjid built
 * for Allah, and a place like it built in Paradise; the wealth that is truly ours, only what we ate, wore or gave; the
 * hour on Friday when a du'a is answered; the life of Paradise, where no one falls ill, dies, grows old or is in want;
 * suspicion, spying, envy, deserting and hate, and being brothers instead; the dhikr after every prayer by which the
 * poor catch up; and the five things he ﷺ was given, among them that he was sent to all mankind. Only the land, the
 * sky, buildings, things and plants are drawn. No Prophet and no person is ever drawn, not even a hand or a face: where
 * someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the
 * air. Nothing is drawn for Allah and nothing comes down from the sky: words, deeds and du'as are sparks rising, what
 * He gives is a warm glow, and Paradise is a light far off, or gardens in a soft light.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** The red of anger and hate. */
const RED = "#D8513A";

/** A crooked voice from (x, y), facing left: lovedArt.ts's crooked voice, turned about. */
const crookedLeft = (x: number, y: number) => `<g transform="translate(${n(2 * x)} 0) scale(-1 1)">${crooked(x, y)}</g>`;

/** One row of a masjid built of stone, `i` rows up from its foot, in its own units: its foot's left at (0, 0), 36 wide. */
const stoneRow = (i: number, stone = "#D9C9A8", joint = "#B39E78") => {
  const top = n(-3.5 * (i + 1));
  const foot = n(-3.5 * i);
  let joints = `M0 ${top} L36 ${top}`;
  for (let x = i % 2 ? 3 : 6; x < 36; x += 6) joints += ` M${x} ${top} L${x} ${foot}`;
  return `<rect x="0" y="${top}" width="36" height="3.5" fill="${stone}"/><path d="${joints}" stroke="${joint}" stroke-width="0.4"/>`;
};

/** The door and two windows of the masjid of stone, in its own units. */
const stoneDoor = (dark = "#6E5638") =>
  `<path d="M15.6 0 L15.6 -5 Q18 -7.6 20.4 -5 L20.4 0 Z" fill="${dark}"/><rect x="5" y="-10" width="2.4" height="2.6" fill="${dark}"/><rect x="28.6" y="-10" width="2.4" height="2.6" fill="${dark}"/>`;

/** The flat roof of the masjid of stone, in its own units. */
const stoneRoof = (fill = "#BFAE8C") => `<rect x="-1.4" y="-15.6" width="38.8" height="1.6" fill="${fill}"/><path d="M-1.4 -14 L37.4 -14" stroke="#A8966F" stroke-width="0.4"/>`;

/** Shapes in the masjid of stone's own units, set with its foot's left at (x, y), `s` times its size. */
const atStone = (x: number, y: number, s: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${s})">${svg}</g>`;

/** A garment, a tunic laid out, its foot's middle at (x, y): 10 across its sleeves and 7 high. */
const garment = (x: number, y: number, fill = "#5C8FC2", trim = "#3F6E9E") =>
  `<path d="M${n(x - 2)} ${n(y - 7)} L${n(x - 5)} ${n(y - 5.4)} L${n(x - 4)} ${n(y - 3.4)} L${n(x - 2.6)} ${n(y - 4)} L${n(x - 2.6)} ${y} L${n(x + 2.6)} ${y} ` +
  `L${n(x + 2.6)} ${n(y - 4)} L${n(x + 4)} ${n(y - 3.4)} L${n(x + 5)} ${n(y - 5.4)} L${n(x + 2)} ${n(y - 7)} Q${x} ${n(y - 5.8)} ${n(x - 2)} ${n(y - 7)} Z" fill="${fill}"/>` +
  `<path d="M${n(x - 2.6)} ${n(y - 1)} L${n(x + 2.6)} ${n(y - 1)}" stroke="${trim}" stroke-width="0.5"/>`;

/** Food over a dish whose middle is at (x, y): a round loaf and a few dates. */
const food = (x: number, y: number) =>
  `<ellipse cx="${n(x - 0.8)}" cy="${n(y - 2.2)}" rx="2.2" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>` +
  [
    [1.6, -1.8],
    [2.7, -1.5],
    [2.2, -2.6]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.8" ry="0.6" fill="#7A2E14"/>`)
    .join("");

/** Shapes drawn about (x, y), `s` times their size. */
const bigger = (x: number, y: number, s: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${svg}</g>`;

/** A small prayer mat, its middle at (x, y): lovedArt.ts's prayer mat at a little under half its size. */
const smallMat = (x: number, y: number) => bigger(x, y, 0.42, prayerMat(x, y));

/** A row of thirty-three small dots from x, `gap` apart, at height y. */
const thirtyThreeDots = (x: number, y: number, gap: number, fill: string) =>
  Array.from({ length: 33 }, (_, i) => `<circle cx="${n(x + i * gap)}" cy="${y}" r="0.4" fill="${fill}"/>`).join("");

// A place like it in Paradise. Ubaidullah al-Khaulani said: I heard Uthman ibn Affan say, when people argued too much
// about his rebuilding the masjid of the Messenger of Allah ﷺ: you have talked too much. I heard the Prophet ﷺ say:
// whoever built a mosque, Allah would build for him a similar place in Paradise; a narrator thought he also said:
// intending Allah's pleasure (Sahih al-Bukhari 450). No one is drawn: by the masjid of mud brick and palm, someone's
// place, and the places of those who argued, their crooked voices toward him; a voice from him, and a calm comes on
// them; the old masjid fades as a masjid of stone rises in its place, row by row; a light of intention within him, and
// it rises; far off, in a light, a place just like it rises in a garden of Paradise; a golden way from him to it.
function houseInParadise(): SignArt {
  const builder: [number, number] = [54, 103];
  const arguing: [number, number][] = [
    [72, 104],
    [81, 105.8],
    [90, 104]
  ];
  const far: [number, number] = [128, 50];
  const rows = [0.33, 0.355, 0.38, 0.405];
  return {
    kind: "house-in-paradise",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "clouds", svg: cloud(70, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid as it was, of mud brick and palm", svg: madinahMasjid(8, 101, 0.75), keys: { at: [0, 0.33, 0.44], opacity: [1, 1, 0] } },
      ...rows.map((from, i): SignPart => ({ name: `a row of stone, rising ${i + 1}`, svg: atStone(8, 101, 1, stoneRow(i)), keys: showFrom(from, at3(from + 0.02)) })),
      { name: "the door and windows of the masjid of stone", svg: atStone(8, 101, 1, stoneDoor()), keys: showFrom(0.41, 0.43) },
      { name: "the roof of the masjid of stone", svg: atStone(8, 101, 1, stoneRoof()), keys: showFrom(0.43, 0.45) },
      { name: "someone's place, rebuilding the masjid", svg: someone(builder[0], builder[1], 1.7) },
      { name: "the places of those who argued", svg: arguing.map(([x, y]) => someone(x, y, 1.5)).join("") },
      {
        name: "crooked voices, arguing too much",
        svg: arguing.map(([x, y]) => crookedLeft(x - 1.6, y - 5)).join(""),
        keys: showWhile(0.03, 0.05, 0.19, 0.21),
        loop: { move: "twinkle", ms: 800, low: 0.4 }
      },
      { name: "a voice from him: you have talked too much", svg: arcs(builder[0] + 3.4, builder[1] - 3.6, VOICE), keys: showWhile(0.18, 0.19, 0.33, 0.35), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a calm over those who argued", svg: wash(81, 104, 15, 4.4, "#FFF6D0", 0.16), keys: showFrom(0.21, 0.25) },
      { name: "his intention, a light within", svg: glow(builder[0], builder[1], 3.4, WARM, 0.35), keys: showFrom(0.51, 0.55), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "his intention, rising",
        svg: sparkle(builder[0], builder[1] - 5, 1.6, SPARK),
        keys: track({
          opacity: [
            [0.53, 0],
            [0.54, 1],
            [0.64, 1],
            [0.66, 0]
          ],
          xy: [
            [0.54, 0, 0],
            [0.59, 0, -24]
          ]
        }),
        loop: { move: "twinkle", ms: 1000, low: 0.6 }
      },
      { name: "Paradise, a light far off", svg: glow(far[0], far[1], 13, "#FFF3C0", 0.26) + wash(far[0], far[1] + 4, 18, 6, "#FFFBEA", 0.14), keys: showFrom(0.64, 0.67), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "a garden of Paradise, far off", svg: `<ellipse cx="${far[0]}" cy="${n(far[1] + 10.6)}" rx="17" ry="2.2" fill="#A6D97E"/>` + roundTree(113, 60.6, 5, "#5FA344") + roundTree(143, 60.6, 5, "#5FA344"), keys: showFrom(0.64, 0.67) },
      {
        name: "a similar place in Paradise, built",
        svg: atStone(116, 60.6, 0.66, stoneRow(0, "#F3E2B5", "#D9BE7E") + stoneRow(1, "#F3E2B5", "#D9BE7E") + stoneRow(2, "#F3E2B5", "#D9BE7E") + stoneRow(3, "#F3E2B5", "#D9BE7E") + stoneDoor("#C9A25A") + stoneRoof("#E8CF8E")),
        origin: { x: far[0], y: 60.6 },
        keys: track({
          opacity: [
            [0.665, 0],
            [0.67, 1]
          ],
          scaleY: [
            [0.67, 0.1],
            [0.76, 1]
          ]
        })
      },
      {
        name: "the place in Paradise, sparkling",
        svg: sparkle(114, 50, 1.3, "#FFFFFF") + sparkle(142, 52, 1.1, SPARK) + sparkle(far[0], 46, 1.5, SPARK),
        keys: showFrom(0.83, 0.87),
        loop: { move: "twinkle", ms: 1100, low: 0.4 }
      },
      { name: "a golden way from his place to it", svg: way(`M${builder[0] + 3} 101 C84 96 110 78 124 63`, GOLD), keys: showFrom(0.83, 0.88) },
      { name: "a warm glow on his place", svg: glow(builder[0], builder[1], 7, WARM, 0.22), keys: showFrom(0.85, 0.9), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "When people argued too much", from: 0.02, to: 0.15 },
      { text: "You have talked too much", from: 0.17, to: 0.3 },
      { text: "Whoever built a mosque", from: 0.32, to: 0.48 },
      { text: "Intending Allah's Pleasure", from: 0.5, to: 0.62 },
      { text: "Allah would build for him", from: 0.64, to: 0.8 },
      { text: "A similar place in Paradise", from: 0.82, to: 1 }
    ]
  };
}

// My wealth, my wealth. Mutarrif's father said: I came to the Prophet ﷺ as he was reciting: Abundance diverts you. He
// said: the son of Adam claims: my wealth, my wealth. O son of Adam, is there anything as your belonging except that
// which you consumed, which you utilised, or which you wore and then it was worn out, or you gave as charity and sent it
// forward? (Sahih Muslim 2958). No one is drawn: by his home, his heap of gold and his sacks, someone's place, and his
// voice, twice; a voice answers from the golden ring by the masjid, and a grey shade comes on the heap; food on a dish,
// with a warm glow, is eaten up; a garment, with a warm glow, gets patches and wears away; last, a sack goes by itself
// to someone in need, a warm glow comes on them, and a light rises along a golden way to a light far off, and stays.
function myWealth(): SignArt {
  const owner: [number, number] = [36, 103];
  const dishAt: [number, number] = [74, 104];
  const garmentAt: [number, number] = [89, 103.4];
  const needy: [number, number] = [106, 104];
  const gift: [number, number] = [61.5, 104.6];
  const ringAt: [number, number] = [132, 104];
  const far: [number, number] = [134, 48];
  return {
    kind: "my-wealth",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(22, 18) },
      { name: "clouds", svg: cloud(76, 26, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a date palm", svg: palm(20, 104, 24) },
      { name: "the masjid", svg: madinahMasjid(118, 100, 0.6) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "his wealth, a heap of gold", svg: goldHeap(48, 104, 1.6) },
      { name: "someone's place, by his wealth", svg: someone(owner[0], owner[1], 1.7) },
      {
        name: "his voice, saying: my wealth, my wealth",
        svg: arcs(owner[0] + 3.4, owner[1] - 3.6, VOICE),
        keys: { at: [0, 0.03, 0.04, 0.07, 0.08, 0.09, 0.1, 0.21, 0.23], opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0] }
      },
      { name: "a voice from the ring, asking", svg: arcsLeft(ringAt[0] - 4.6, ringAt[1] - 3.6, GOLD), keys: showWhile(0.2, 0.21, 0.39, 0.41), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a grey shade on the heap, not truly his", svg: wash(50, 102.6, 11.4, 4.8, GREY, 0.18), keys: showFrom(0.25, 0.31) },
      { name: "a dish", svg: bigger(dishAt[0], dishAt[1], 1.5, dish(dishAt[0], dishAt[1])) },
      { name: "what he consumed, a warm glow", svg: glow(dishAt[0], dishAt[1] - 2, 7, WARM, 0.28), keys: showWhile(0.39, 0.41, 0.58, 0.6) },
      { name: "food on the dish, eaten up", svg: bigger(dishAt[0], dishAt[1], 1.5, food(dishAt[0], dishAt[1])), keys: { at: [0, 0.42, 0.52], opacity: [1, 1, 0] } },
      { name: "what he wore, a warm glow", svg: glow(garmentAt[0], garmentAt[1] - 4.6, 8, WARM, 0.28), keys: showWhile(0.59, 0.6, 0.79, 0.81) },
      { name: "a garment, worn out", svg: bigger(garmentAt[0], garmentAt[1], 1.35, garment(garmentAt[0], garmentAt[1])), keys: { at: [0, 0.67, 0.73, 0.79, 0.81], opacity: [1, 1, 0.4, 0.4, 0] } },
      {
        name: "the garment's patches",
        svg: bigger(
          garmentAt[0],
          garmentAt[1],
          1.35,
          `<rect x="${n(garmentAt[0] - 1.8)}" y="${n(garmentAt[1] - 3.4)}" width="1.6" height="1.4" fill="#B8A88A"/>` +
            `<rect x="${n(garmentAt[0] + 0.6)}" y="${n(garmentAt[1] - 5.8)}" width="1.4" height="1.2" fill="#9E8E70"/>` +
            `<rect x="${n(garmentAt[0] - 4.4)}" y="${n(garmentAt[1] - 5.2)}" width="1.2" height="1.1" fill="#B8A88A"/>`
        ),
        keys: showWhile(0.61, 0.66, 0.79, 0.81)
      },
      { name: "someone's place, in need", svg: someone(needy[0], needy[1], 1.6) },
      {
        name: "a sack, given as charity",
        svg: sack(gift[0], gift[1], 0.85),
        keys: track({
          xy: [
            [0.79, 0, 0],
            [0.815, 20, -4],
            [0.84, needy[0] - 4.6 - gift[0], 0]
          ]
        })
      },
      { name: "a warm glow on the one in need", svg: glow(needy[0] - 2, needy[1] - 1, 6, WARM, 0.26), keys: showFrom(0.83, 0.86), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a golden way, forward", svg: way(`M${needy[0] + 2} 99 C${needy[0] + 6} 80 ${far[0] - 12} 62 ${far[0] - 4} 52`, GOLD), keys: showFrom(0.85, 0.88) },
      { name: "a light far off, where it is kept", svg: glow(far[0], far[1], 9, "#FFF3C0", 0.26) + sparkle(far[0], far[1], 2, SPARK), keys: showFrom(0.85, 0.88), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "the charity, sent forward, rising",
        svg: sparkle(needy[0], needy[1] - 6, 1.8, SPARK),
        keys: track({
          opacity: [
            [0.85, 0],
            [0.86, 1],
            [0.93, 1],
            [0.94, 0]
          ],
          xy: [
            [0.86, 0, 0],
            [0.89, 8, -24],
            [0.93, far[0] - needy[0], far[1] - (needy[1] - 6)]
          ]
        }),
        loop: { move: "twinkle", ms: 1000, low: 0.6 }
      },
      { name: "the charity, kept, shining", svg: glow(far[0], far[1], 14, WARM, 0.22), keys: showFrom(0.93, 0.96), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "The son of Adam claims: My wealth, my wealth", from: 0.02, to: 0.18 },
      { text: "Is there anything as your belonging", from: 0.2, to: 0.36 },
      { text: "Except that which you consumed", from: 0.38, to: 0.56 },
      { text: "Or which you wore and then it was worn out", from: 0.58, to: 0.76 },
      { text: "Or you gave as charity and sent it forward", from: 0.78, to: 1 }
    ]
  };
}

// The hour on Friday. Abu Hurairah said: the Messenger of Allah ﷺ talked about Friday and said: there is an hour on
// Friday, and if a Muslim gets it while praying and asks something from Allah, then Allah will definitely meet his
// demand; and he pointed out the shortness of that time with his hands (Sahih al-Bukhari 935). When in the day the hour
// is, is not drawn: no sun moves. No one is drawn, not even a hand: ways come to the masjid on Friday, and the places of
// those who came; a golden band of light, the hour, shows across the sky; someone's place on a prayer mat, and a golden
// glow comes on it; his du'a rises; a warm glow comes on him; last, two marks show at the hour's ends and come close
// together as the band grows short.
function hourOnFriday(): SignArt {
  const prays: [number, number] = [60, 103];
  const band: [number, number] = [80, 44];
  const half = 34;
  const short = 0.25;
  const came: [number, number][] = [
    [14, 104],
    [21, 105.6],
    [28, 104],
    [35, 105.6],
    [42, 104]
  ];
  return {
    kind: "hour-on-friday",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "clouds", svg: cloud(36, 24, 0.3, "#FFFFFF", 0.9) + cloud(118, 18, 0.24, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(8, 100, 0.8) },
      { name: "ways coming to the masjid on Friday", svg: way("M156 99 C128 97 100 99 74 102", "#8A6440") + way("M156 106 C130 108 100 108 74 105.4", "#8A6440"), keys: showFrom(0.03, 0.07) },
      { name: "the places of those who came for Friday", svg: came.map(([x, y]) => someone(x, y, 1.4)).join(""), keys: showFrom(0.05, 0.09) },
      {
        name: "an hour on Friday, a golden band of light",
        svg: wash(band[0], band[1], half + 4, 6, "#FFF3C0", 0.14) + `<rect x="${band[0] - half}" y="${band[1] - 2.6}" width="${half * 2}" height="5.2" rx="2.6" fill="#FFE08A" opacity="0.7" stroke="#E8B84A" stroke-width="0.5"/>`,
        origin: { x: band[0], y: band[1] },
        keys: track({
          opacity: [
            [0.08, 0],
            [0.12, 1]
          ],
          scaleX: [
            [0.8, 1],
            [0.88, short]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.75 }
      },
      { name: "a prayer mat", svg: prayerMat(prays[0], prays[1] + 1.6), keys: showFrom(0.21, 0.24) },
      { name: "someone's place, praying", svg: someone(prays[0], prays[1], 1.7), keys: showFrom(0.21, 0.24) },
      { name: "the hour, come to him: a golden glow on his place", svg: glow(prays[0], prays[1], 7, "#FFE7A0", 0.32), keys: showFrom(0.27, 0.32), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...risingSparks(
        "his du'a, rising",
        [
          [prays[0] - 4, prays[1] - 6],
          [prays[0], prays[1] - 8],
          [prays[0] + 4, prays[1] - 6]
        ],
        0.41,
        0.03,
        { color: SPARK, rise: 16, stay: true }
      ),
      { name: "what he asked, given: a warm glow", svg: glow(prays[0], prays[1], 10, WARM, 0.22), keys: showFrom(0.59, 0.64), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "given, sparkling",
        svg: sparkle(prays[0] - 6, prays[1] - 4.6, 1.3, SPARK) + sparkle(prays[0] + 6, prays[1] - 5.4, 1.1, SPARK) + sparkle(prays[0], prays[1] - 8.4, 1.4, "#FFFFFF"),
        keys: showFrom(0.62, 0.66),
        loop: { move: "twinkle", ms: 1100, low: 0.4 }
      },
      ...[-1, 1].map(
        (side): SignPart => ({
          name: side < 0 ? "a mark at the hour's start" : "a mark at the hour's end",
          svg: `<path d="M${band[0] + side * half} ${band[1] - 5} L${band[0] + side * half} ${band[1] + 5}" stroke="${GOLD}" stroke-width="1" stroke-linecap="round"/>`,
          keys: track({
            opacity: [
              [0.79, 0],
              [0.8, 1]
            ],
            xy: [
              [0.8, 0, 0],
              [0.88, n(-side * half * (1 - short)), 0]
            ]
          })
        })
      ),
      { name: "the hour, short, shining", svg: sparkle(band[0], band[1], 2, "#FFFFFF") + glow(band[0], band[1], 6, WARM, 0.3), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1000, low: 0.5 } }
    ],
    words: [
      { text: "There is an hour on Friday", from: 0.02, to: 0.18 },
      { text: "If a Muslim gets it while praying", from: 0.2, to: 0.38 },
      { text: "And asks something from Allah", from: 0.4, to: 0.56 },
      { text: "Allah will definitely meet his demand", from: 0.58, to: 0.76 },
      { text: "He pointed out the shortness of that time", from: 0.78, to: 1 }
    ]
  };
}

// Never old. Abu Sa'id al-Khudri and Abu Hurairah reported that the Messenger of Allah ﷺ said: there would be an
// announcer in Paradise who would announce: there is in store for you health, and that you should never fall ill; that
// you live and do not die at all; that you would remain young and never grow old; that you would always live in
// affluent circumstances and never become destitute (Sahih Muslim 2837). No sun is drawn in Paradise (Quran 76:13), and
// no one is drawn, not even the announcer: in gardens in a soft light, by a river, the places of the people of
// Paradise; a voice calls out to them; a glow of health comes on each; a grey shade of illness comes near and is kept
// away; a light that lasts shows on each; blossoms open on the trees; fruit comes by each place and the river shines;
// last, a grey empty dish of want comes near and is kept away, and everything sparkles.
function neverOld(): SignArt {
  const places: [number, number][] = [
    [46, 98],
    [72, 101],
    [98, 97],
    [124, 100]
  ];
  const trees: [number, number, number][] = [
    [20, 79, 17],
    [58, 77, 14],
    [106, 78, 16],
    [146, 79, 14]
  ];
  const river = "M0 86 Q40 81 80 84 Q120 87 160 82";
  return {
    kind: "never-old",
    ms: 12000,
    parts: [
      { name: "a soft light, Paradise", svg: sky("#FFF5DC", "#F7E9C8", 64) },
      { name: "light, all about", svg: glow(84, 56, 70, "#FFFFFF", 0.06), loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      {
        name: "gardens far off, in the light",
        svg: `<path d="M0 70 Q14 52 34 60 Q56 46 80 57 Q104 44 126 56 Q144 48 160 58 L160 74 L0 74 Z" fill="#D4EBB6"/><path d="M0 70 Q14 52 34 60 Q56 46 80 57 Q104 44 126 56 Q144 48 160 58" stroke="#E6F4D2" stroke-width="0.8" fill="none"/>`
      },
      { name: "the gardens of Paradise", svg: `<path d="M0 74 Q80 66 160 74 L160 120 L0 120 Z" fill="#BFE09A"/><path d="M0 74 Q80 66 160 74" stroke="#A6D97E" stroke-width="1" fill="none"/>` + tuft(14, 106, "#4F9A3C", 4) + tuft(150, 107, "#4F9A3C", 4) + tuft(86, 109, "#4F9A3C", 3.6) },
      { name: "trees of the gardens", svg: trees.map(([x, y, h], i) => roundTree(x, y, h, i % 2 ? "#5FA344" : "#4F9A3C")).join("") },
      { name: "a river of Paradise", svg: `<path d="${river}" stroke="#6FB8E8" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="${river}" stroke="#E4F4FF" stroke-width="0.5" stroke-dasharray="1.6 2.4" fill="none"/>` },
      { name: "the places in Paradise", svg: places.map(([x, y]) => someone(x, y, 2)).join("") },
      { name: "a voice, calling out to them", svg: arcs(12, 94, GOLD), keys: showFrom(0.03, 0.06), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      {
        name: "health, a soft glow on each",
        svg: places.map(([x, y]) => glow(x, y, 6.4, "#FFFFFF", 0.16) + `<circle cx="${x}" cy="${y}" r="4.2" stroke="#6DBF5A" stroke-width="0.7" fill="none"/>`).join(""),
        keys: showFrom(0.15, 0.2),
        loop: { move: "twinkle", ms: 1600, low: 0.75 }
      },
      {
        name: "illness, a grey shade, kept away",
        svg: wash(146, 98, 10, 6, GREY, 0.3),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.3, 1],
            [0.33, 1],
            [0.36, 0]
          ],
          xy: [
            [0.3, 0, 0],
            [0.36, 14, 0]
          ]
        })
      },
      { name: "life that lasts, a light on each", svg: places.map(([x, y]) => sparkle(x, y - 6.4, 1.7, SPARK)).join(""), keys: showFrom(0.43, 0.48), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...trees.map(
        ([x, y, h], i): SignPart => ({
          name: `blossoms opening, young and fresh ${i + 1}`,
          svg: [
            [-0.2, -0.86],
            [0.18, -0.64],
            [-0.12, -0.56],
            [0.1, -0.94],
            [0.24, -0.8]
          ]
            .map(([dx, dy]) => `<circle cx="${n(x + dx * h)}" cy="${n(y + dy * h)}" r="1.3" fill="#F7C6D9"/><circle cx="${n(x + dx * h)}" cy="${n(y + dy * h)}" r="0.5" fill="#FFF3C0"/>`)
            .join(""),
          origin: { x, y: n(y - h * 0.7) },
          keys: track({
            opacity: [
              [0.565, 0],
              [0.57, 1]
            ],
            scale: [
              [0.57, 0.3],
              [0.63, 1]
            ]
          })
        })
      ),
      ...places.map(([x, y], i): SignPart => ({ name: `fruit by each place, plenty ${i + 1}`, svg: bigger(x + 7, y + 3, 1.3, basketOfDates(x + 7, y + 3)), keys: showFrom(at3(0.73 + i * 0.015), at3(0.75 + i * 0.015)) })),
      {
        name: "the river, shining",
        svg: [
          [20, 83.4],
          [58, 82.6],
          [100, 85.4],
          [136, 84.4]
        ]
          .map(([x, y]) => sparkle(x, y, 1, "#FFFFFF"))
          .join(""),
        keys: showFrom(0.76, 0.8),
        loop: { move: "twinkle", ms: 1000, low: 0.3 }
      },
      {
        name: "want, a grey empty dish, kept away",
        svg: bigger(148, 104, 1.6, `<g opacity="0.8">${dish(148, 104)}</g>`) + wash(148, 103, 8, 4, GREY, 0.24),
        keys: track({
          opacity: [
            [0.86, 0],
            [0.87, 1],
            [0.9, 1],
            [0.94, 0]
          ],
          xy: [
            [0.9, 0, 0],
            [0.94, 12, 0]
          ]
        })
      },
      { name: "plenty, sparkling", svg: places.map(([x, y]) => sparkle(x + 8.6, y - 4, 1.3, "#FFFFFF") + sparkle(x - 4.4, y - 4.8, 1, SPARK)).join(""), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1100, low: 0.4 } }
    ],
    words: [
      { text: "There would be an announcer", from: 0.02, to: 0.125 },
      { text: "There is in store for you health", from: 0.14, to: 0.26 },
      { text: "And that you should never fall ill", from: 0.28, to: 0.4 },
      { text: "That you live and do not die at all", from: 0.42, to: 0.54 },
      { text: "You would remain young and never grow old", from: 0.56, to: 0.7 },
      { text: "Always live in affluent circumstances", from: 0.72, to: 0.84 },
      { text: "And never become destitute", from: 0.86, to: 1 }
    ]
  };
}

// Beware of suspicion. Abu Hurairah said: the Prophet ﷺ said: beware of suspicion, for suspicion is the worst of false
// tales; and do not look for the others' faults and do not spy, and do not be jealous of one another, and do not desert
// one another, and do not hate one another; and O Allah's worshipers, be brothers (Sahih al-Bukhari 6064). No one is
// drawn: three homes, and someone's place by each; a grey cloud of suspicion comes over one, a crooked tale goes out
// with dark specks and fades, and the cloud goes; a way toward another's faults breaks off, and a cover stays over
// them; a creeping way toward another's window is gone; a grey look at another's basket of dates fades; his place
// turns away and comes back; a red glow of hate is held back; last, golden ways join all three, with warm glows and a
// calm over them all.
function bewareOfSuspicion(): SignArt {
  const one: [number, number] = [38, 104];
  const other: [number, number] = [94, 102.6];
  const third: [number, number] = [121, 104];
  const basketAt: [number, number] = [62, 104.6];
  return {
    kind: "beware-of-suspicion",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "clouds", svg: cloud(52, 24, 0.3, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a home", svg: home(22, 99, 22, 15) },
      { name: "another home", svg: home(80, 97, 22, 15) },
      { name: "a third home", svg: home(138, 99, 22, 15) },
      { name: "a basket of dates by another's home", svg: basketOfDates(basketAt[0], basketAt[1]) },
      {
        name: "someone's place",
        svg: someone(one[0], one[1], 1.7),
        keys: track({
          xy: [
            [0.62, 0, 0],
            [0.65, -8, 0],
            [0.67, -8, 0],
            [0.69, 0, 0]
          ]
        })
      },
      { name: "another's place", svg: someone(other[0], other[1], 1.6) },
      { name: "a third's place", svg: someone(third[0], third[1], 1.6) },
      { name: "suspicion, a grey cloud over him", svg: cloud(one[0], one[1] - 6, 0.2, GREY, 0.75), keys: showWhile(0.03, 0.06, 0.26, 0.28), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a crooked tale from him, false", svg: crooked(one[0] + 3, one[1] - 4), keys: showWhile(0.14, 0.15, 0.26, 0.28), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      {
        name: "dark specks of the tale, going out and fading",
        svg: speck(one[0] + 10, one[1] - 5, 0.9) + speck(one[0] + 13, one[1] - 3.4, 0.8) + speck(one[0] + 16, one[1] - 5.6, 0.7),
        keys: track({
          opacity: [
            [0.15, 0],
            [0.16, 1],
            [0.26, 1],
            [0.28, 0]
          ],
          xy: [
            [0.16, 0, 0],
            [0.2, 30, -2]
          ]
        })
      },
      { name: "a way toward another's faults, broken off", svg: way(`M${one[0] + 3} 105 C48 107.4 56 107.8 66 107.4`, "#8A6440"), keys: showWhile(0.26, 0.28, 0.38, 0.4) },
      { name: "a cover over another's faults", svg: cover(other[0], other[1] - 4.4), keys: showFrom(0.28, 0.31) },
      { name: "a creeping way toward another's window, stopped", svg: way(`M${one[0] + 2} 101 C46 95 56 91 66 88.6`, GREY, 1), keys: showWhile(0.38, 0.4, 0.5, 0.52) },
      { name: "another's window, kept shut", svg: `<rect x="81.6" y="84" width="3.4" height="3.4" fill="#A8865A" stroke="#7E6447" stroke-width="0.4"/><path d="M83.3 84 L83.3 87.4" stroke="#7E6447" stroke-width="0.4"/>`, keys: showFrom(0.41, 0.43) },
      { name: "a grey look at the basket, jealous", svg: `<path d="M${one[0] + 3} ${one[1] - 2} L${basketAt[0] - 5} ${basketAt[1] - 3}" stroke="${GREY}" stroke-width="0.8" stroke-dasharray="1 1"/>`, keys: showWhile(0.5, 0.52, 0.62, 0.63) },
      { name: "a grey shade on him, jealous", svg: wash(one[0], one[1], 6, 3.6, GREY, 0.22), keys: showWhile(0.5, 0.52, 0.62, 0.63) },
      {
        name: "hate, a red glow, held back",
        svg: glow(one[0], one[1], 6, RED, 0.22),
        origin: { x: one[0], y: one[1] },
        keys: track({
          opacity: [
            [0.74, 0],
            [0.76, 1],
            [0.79, 1],
            [0.81, 0]
          ],
          scale: [
            [0.74, 0.6],
            [0.77, 1.1],
            [0.81, 0.4]
          ]
        })
      },
      { name: "a calm on him, hate held back", svg: glow(one[0], one[1], 5, "#FFF6D0", 0.45), keys: showFrom(0.79, 0.81) },
      {
        name: "golden ways, joining them all",
        svg: way(`M${one[0] + 2.4} 104.6 C56 108 76 106.6 ${other[0] - 2.4} 103.4`, GOLD) + way(`M${other[0] + 2.4} 103.4 C104 106 112 106 ${third[0] - 2.4} 104.4`, GOLD),
        keys: showFrom(0.87, 0.91)
      },
      { name: "warm glows on them all", svg: [one, other, third].map(([x, y]) => glow(x, y, 5.6, WARM, 0.26)).join(""), keys: showFrom(0.89, 0.94), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a calm over them all", svg: wash(80, 103, 62, 7, "#FFF6D0", 0.12), keys: showFrom(0.9, 0.95) }
    ],
    words: [
      { text: "Beware of suspicion", from: 0.02, to: 0.125 },
      { text: "For suspicion is the worst of false tales", from: 0.14, to: 0.245 },
      { text: "Do not look for the others' faults", from: 0.26, to: 0.365 },
      { text: "And do not spy", from: 0.38, to: 0.485 },
      { text: "Do not be jealous of one another", from: 0.5, to: 0.605 },
      { text: "Do not desert one another", from: 0.62, to: 0.725 },
      { text: "Do not hate one another", from: 0.74, to: 0.845 },
      { text: "O Allah's worshipers! Be brothers", from: 0.86, to: 1 }
    ]
  };
}

// Thirty-three each. Abu Hurairah said: some poor people came to the Prophet ﷺ and said: the wealthy people will get
// higher grades and will have permanent enjoyment; they pray like us and fast as we do, and they have more money, by
// which they perform the Hajj and Umrah, struggle in Allah's cause and give in charity. He said: shall I not tell you a
// thing upon which, if you acted, you would catch up with those who have surpassed you? Nobody would overtake you, and
// you would be better than those among whom you live, except those who would do the same. Say Subhan Allah, Al hamdu
// lillah and Allahu Akbar thirty three times each after every prayer (Sahih al-Bukhari 843). No one is drawn: the
// places of the poor come to the golden ring by the masjid; by fine homes, the places of the wealthy, and a high light
// to which their good rises; both pray on mats and fast, and their prayers rise; the wealthy give a sack, and a grey
// worry comes on the poor; a voice from the ring; a golden way rises from the poor to the high light, and the worry
// goes; their dhikr rises; last, three rows of thirty-three show, and a light climbs from them to the high light.
function thirtyThree(): SignArt {
  const poor: [number, number][] = [
    [24, 104],
    [32, 105.8],
    [40, 104]
  ];
  const wealthy: [number, number][] = [
    [114, 104],
    [122, 105.8],
    [130, 104]
  ];
  const ringAt: [number, number] = [78, 104];
  const high: [number, number] = [124, 48];
  const giving: [number, number] = [135.4, 104.6];
  const start: [number, number] = [41, 99];
  return {
    kind: "thirty-three",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(20, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.3, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(62, 100, 0.66) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "fine homes of the wealthy", svg: home(126, 98, 20, 14, "#E3C08A", "#C9A060") + home(150, 99, 16, 12, "#E3C08A", "#C9A060") },
      { name: "the places of the wealthy", svg: wealthy.map(([x, y]) => someone(x, y, 1.5)).join("") },
      { name: "the wealth of the wealthy, sacks", svg: sack(141.4, 104.4, 0.75) + sack(147, 104.8, 0.65) },
      {
        name: "the places of the poor, coming",
        svg: poor.map(([x, y]) => someone(x, y, 1.5)).join(""),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: [
            [0.03, -34, 0],
            [0.09, 0, 0]
          ]
        })
      },
      { name: "a high light, the higher grades", svg: glow(high[0], high[1], 10, "#FFF3C0", 0.28) + sparkle(high[0], high[1], 2.2, SPARK), keys: showFrom(0.15, 0.18), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "the good of the wealthy, rising toward it",
        svg: wealthy.map(([x, y], i) => sparkle(x, y - 6 - (i % 2) * 1.6, 1.4, SPARK)).join(""),
        keys: track({
          opacity: [
            [0.16, 0],
            [0.17, 1],
            [0.27, 1],
            [0.29, 0]
          ],
          xy: [
            [0.17, 0, 0],
            [0.22, 0, -14]
          ]
        })
      },
      { name: "prayer mats, for the poor and the wealthy", svg: [...poor, ...wealthy].map(([x, y]) => smallMat(x, y + 1.6)).join(""), keys: showFrom(0.28, 0.3) },
      {
        name: "their prayers, rising alike",
        svg: [...poor, ...wealthy].map(([x, y], i) => sparkle(x, y - 6 - (i % 2) * 1.4, 1.2, SPARK)).join(""),
        keys: track({
          opacity: [
            [0.29, 0],
            [0.3, 1],
            [0.4, 1],
            [0.42, 0]
          ],
          xy: [
            [0.3, 0, 0],
            [0.35, 0, -14]
          ]
        })
      },
      { name: "fasting, a small crescent over each", svg: crescent(32, 95.6, 2.2, 1.2, "#E8C45A") + crescent(122, 95.6, 2.2, 1.2, "#E8C45A"), keys: showWhile(0.31, 0.33, 0.44, 0.46) },
      {
        name: "a sack, given by the wealthy",
        svg: sack(giving[0], giving[1], 0.7),
        keys: track({
          opacity: [
            [0.52, 1],
            [0.54, 0]
          ],
          xy: [
            [0.41, 0, 0],
            [0.46, 10, -10]
          ]
        })
      },
      {
        name: "the good of their giving, rising",
        svg: sparkle(giving[0] + 10, giving[1] - 16, 1.5, SPARK),
        keys: track({
          opacity: [
            [0.43, 0],
            [0.44, 1],
            [0.52, 1],
            [0.54, 0]
          ],
          xy: [
            [0.44, 0, 0],
            [0.47, 0, -10]
          ]
        })
      },
      { name: "a grey worry on the poor", svg: wash(32, 104, 13, 4.6, GREY, 0.2), keys: showWhile(0.43, 0.47, 0.66, 0.7) },
      { name: "a voice from the ring, telling them", svg: arcsLeft(ringAt[0] - 4.6, ringAt[1] - 3.6, GOLD), keys: showWhile(0.52, 0.53, 0.65, 0.67), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a golden way up for the poor, to the high light", svg: way(`M${start[0]} ${start[1]} C46 82 76 58 ${high[0] - 4} ${high[1] + 2}`, GOLD), keys: showFrom(0.65, 0.69) },
      ...risingSparks(
        "their dhikr, rising",
        poor.map(([x, y]): [number, number] => [x, y - 6]),
        0.78,
        0,
        { color: SPARK, rise: 12, stay: true }
      ),
      ...[84, 87.5, 91].map((y, i): SignPart => ({ name: `thirty-three times, row ${i + 1}`, svg: thirtyThreeDots(4, y, 1.2, i === 1 ? GOLD : SPARK), keys: showFrom(at3(0.89 + i * 0.02), at3(0.91 + i * 0.02)) })),
      {
        name: "their light, climbing to the high light",
        svg: sparkle(start[0], start[1], 1.8, SPARK),
        keys: track({
          opacity: [
            [0.9, 0],
            [0.905, 1],
            [0.96, 1],
            [0.97, 0]
          ],
          xy: [
            [0.905, 0, 0],
            [0.93, 22, -30],
            [0.96, high[0] - 2 - start[0], high[1] + 1 - start[1]]
          ]
        }),
        loop: { move: "twinkle", ms: 1000, low: 0.6 }
      },
      { name: "the high light, reached: a warm glow", svg: glow(high[0], high[1], 14, WARM, 0.2), keys: showFrom(0.94, 0.97), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "Some poor people came", from: 0.02, to: 0.125 },
      { text: "The wealthy people will get higher grades", from: 0.14, to: 0.25 },
      { text: "They pray like us and fast as we do", from: 0.27, to: 0.38 },
      { text: "They have more money", from: 0.4, to: 0.505 },
      { text: "Shall I not tell you a thing", from: 0.52, to: 0.625 },
      { text: "Catch up with those who have surpassed you", from: 0.64, to: 0.75 },
      { text: "Subhan Allah, Al hamdu lillah, Allahu Akbar", from: 0.77, to: 0.875 },
      { text: "Thirty three times each after every prayer", from: 0.89, to: 1 }
    ]
  };
}

// Five things given. Jabir ibn Abdullah said: the Prophet ﷺ said: I have been given five things which were not given to
// anyone else before me. Allah made me victorious by awe for a distance of one month's journey. The earth has been made
// for me a place for praying and a thing to perform Tayammum, so anyone of my followers can pray wherever the time of a
// prayer is due. The booty has been made lawful for me. I have been given the right of intercession. And every Prophet
// used to be sent to his nation only, but I have been sent to all mankind (Sahih al-Bukhari 335). No one is drawn: by
// the masjid, a golden ring, his place, and five lights over it, one after another; a ring of awe spreads far from it;
// a long way goes out, and the moon goes from new to full and wanes over it, a month, and a glow comes at its end; a
// soft light comes over the land; prayer mats show all over it, a place on each, and clean earth shines by each; then
// three nations, each about a small ring, the one sent to it, kept to itself; last, golden ways go from his place to
// all of them, and a warm light over all.
function fiveGifts(): SignArt {
  const ringAt: [number, number] = [24, 103];
  const mats: [number, number][] = [
    [52, 100],
    [80, 103],
    [108, 99],
    [136, 102]
  ];
  const nations: [number, number][] = [
    [52, 74],
    [92, 72],
    [132, 75]
  ];
  const moons: [number, number][] = [
    [50, 44],
    [78, 43],
    [106, 42],
    [134, 43]
  ];
  const moonFill = "#E8C45A";
  const moonShapes = [
    crescent(moons[0][0], moons[0][1], 3.4, 2.3, moonFill),
    crescent(moons[1][0], moons[1][1], 3.4, 0, moonFill),
    `<circle cx="${moons[2][0]}" cy="${moons[2][1]}" r="3.4" fill="${moonFill}"/>`,
    `<g transform="translate(${2 * moons[3][0]} 0) scale(-1 1)">${crescent(moons[3][0], moons[3][1], 3.4, 0, moonFill)}</g>`
  ];
  return {
    kind: "five-gifts",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "clouds", svg: cloud(96, 22, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(4, 98, 0.55) },
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      ...[
        [8, 80],
        [14, 77],
        [20, 76],
        [26, 77],
        [32, 80]
      ].map(([x, y], i): SignPart => ({ name: `the five things given, a light ${i + 1}`, svg: glow(x, y, 2.6, WARM, 0.35) + sparkle(x, y, 1.3, SPARK), keys: showFrom(at3(0.03 + i * 0.012), at3(0.04 + i * 0.012)), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 5 } })),
      {
        name: "awe, spreading far",
        svg: ring(ringAt[0], ringAt[1], 3, GOLD),
        origin: { x: ringAt[0], y: ringAt[1] },
        keys: track({
          opacity: [
            [0.15, 0],
            [0.155, 0.9],
            [0.22, 0.25],
            [0.27, 0.25],
            [0.29, 0]
          ],
          scale: [
            [0.15, 1],
            [0.22, 9]
          ]
        })
      },
      { name: "a long way, a month's journey", svg: way(`M${ringAt[0] + 4} 101 C70 96 110 94 156 96`, GOLD), keys: showWhile(0.28, 0.31, 0.4, 0.43) },
      ...moonShapes.map((svg, i): SignPart => ({ name: `the moon, as the month goes ${i + 1}`, svg, keys: showWhile(at3(0.29 + i * 0.015), at3(0.3 + i * 0.015), 0.4, 0.43) })),
      { name: "the awe, reaching that far: a glow", svg: glow(150, 96, 7, "#FFF3C0", 0.32), keys: showWhile(0.33, 0.35, 0.4, 0.43) },
      { name: "the earth, made for him: a soft light over the land", svg: wash(88, 90, 80, 22, "#FFF6D0", 0.12), keys: showFrom(0.41, 0.46), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      ...mats.map(([x, y], i): SignPart => ({ name: `a place for praying, a prayer mat ${i + 1}`, svg: prayerMat(x, y + 1.6) + someone(x, y, 1.8), keys: showFrom(at3(0.53 + i * 0.015), at3(0.54 + i * 0.015)) })),
      {
        name: "clean earth by each mat, for Tayammum",
        svg: mats.map(([x, y]) => glow(x + 13, y + 2, 3, "#FFF3C0", 0.4) + sparkle(x + 13, y + 1.4, 1, "#FFFFFF")).join(""),
        keys: showFrom(0.65, 0.7),
        loop: { move: "twinkle", ms: 1100, low: 0.5 }
      },
      ...nations.map(
        ([x, y], i): SignPart => ({
          name: `a nation, about the one sent to it only ${i + 1}`,
          svg:
            `<ellipse cx="${x}" cy="${y}" rx="11" ry="5" stroke="#A89F94" stroke-width="0.6" stroke-dasharray="1.4 1.2" fill="none"/>` +
            ring(x, y, 2, "#B88A4A") +
            [
              [-6, 1.4],
              [-3.4, -2],
              [3.4, -2],
              [6, 1.4]
            ]
              .map(([dx, dy]) => someone(x + dx, y + dy, 1, VOICE))
              .join(""),
          keys: showFrom(at3(0.77 + i * 0.02), at3(0.79 + i * 0.02))
        })
      ),
      {
        name: "golden ways from his place to all of them",
        svg:
          way(`M${ringAt[0] + 3} 100 C34 90 42 81 ${nations[0][0] - 4} 77.6`, GOLD) +
          way(`M${ringAt[0] + 4} 99 C50 86 76 76 ${nations[1][0] - 6} 73.6`, GOLD) +
          way(`M${ringAt[0] + 5} 101 C70 90 110 80 ${nations[2][0] - 6} 76.6`, GOLD),
        keys: showFrom(0.89, 0.93)
      },
      { name: "a warm light over all", svg: wash(88, 86, 80, 28, WARM, 0.1), keys: showFrom(0.92, 0.96), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      {
        name: "every nation, sparkling",
        svg: nations.map(([x, y]) => sparkle(x, y - 6.6, 1.2, SPARK)).join("") + mats.map(([x, y]) => sparkle(x, y - 5.4, 1, SPARK)).join(""),
        keys: showFrom(0.93, 0.96),
        loop: { move: "twinkle", ms: 1100, low: 0.4 }
      }
    ],
    words: [
      { text: "I have been given five things", from: 0.02, to: 0.125 },
      { text: "Allah made me victorious by awe", from: 0.14, to: 0.25 },
      { text: "For a distance of one month's journey", from: 0.27, to: 0.38 },
      { text: "The earth has been made for me", from: 0.4, to: 0.505 },
      { text: "A place for praying", from: 0.52, to: 0.625 },
      { text: "And a thing to perform Tayammum", from: 0.64, to: 0.745 },
      { text: "Every Prophet used to be sent to his nation only", from: 0.76, to: 0.865 },
      { text: "But I have been sent to all mankind", from: 0.88, to: 1 }
    ]
  };
}

export const LASTING_ART = {
  "house-in-paradise": houseInParadise,
  "my-wealth": myWealth,
  "hour-on-friday": hourOnFriday,
  "never-old": neverOld,
  "beware-of-suspicion": bewareOfSuspicion,
  "thirty-three": thirtyThree,
  "five-gifts": fiveGifts
};
