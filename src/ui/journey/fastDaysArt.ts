import { glow, n, peaks, sky, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { dish } from "./worthArt";
import { cup } from "./hopeArt";
import { GREY } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, dayAround, palms, tent, track } from "./daysArt";
import { goldLight } from "./heedArt";
import { aboutDay, cloth, date, dayTile, drink, DUSK, fastRing, greyRing, ON_DISH, soft, spark, speaking } from "./fastArt";

/**
 * More days of fasting, drawn as the scenes of fasting and Ramadan are (fastArt.ts): fasting on a very hot day; no
 * fasting on without a break; three days a month; not just before Ramadan; no fast on the days of Eid; Ashura and
 * Ramadan; and the milk at Arafah. Only the land, the sky, buildings, things, plants and camels are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand, a mouth or a face: where someone was, a ring or a small dashed
 * circle shows it, a voice is arcs in the air, and what is eaten or drunk is simply gone. Nothing is drawn for Allah,
 * and nothing comes down from the sky: a fast is a soft golden ring about its place, and a deed is a spark that rises.
 */

/** A small shade held over a place at (x, y), against the heat: a short dark arc above it. */
const shadeOver = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y - 3)} Q${x} ${n(y - 5)} ${n(x + 2.4)} ${n(y - 3)}" stroke="#7A5A34" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;

/** A shallow dish with round bread on it, its middle at (x, y). */
const dishOfFood = (x: number, y: number) =>
  dish(x, y) + `<ellipse cx="${x}" cy="${n(y - 1.7)}" rx="2.7" ry="0.95" fill="#E2B878" stroke="#B98A4C" stroke-width="0.3"/>`;

/** A shimmer of heat over the land, rising in thin wavy lines between x1 and x2 at y. */
const shimmer = (x1: number, x2: number, y: number) =>
  [0, 1, 2]
    .map((i) => {
      const yy = n(y - i * 3.4);
      const parts: string[] = [];
      for (let x = x1 + (i % 2) * 6; x < x2; x += 12) parts.push(`M${n(x)} ${yy} q1.5 -1.1 3 0 t3 0`);
      return `<path d="${parts.join(" ")}" stroke="#FFF4D8" stroke-width="0.6" fill="none" opacity="0.7"/>`;
    })
    .join("");

/** Keys of a walk from `dx` across to where it stands, between `from` and `to`. */
const walkIn = (dx: number, from: number, to: number): SignKeys =>
  track({
    xy: [
      [from, dx, 0],
      [to, 0, 0]
    ]
  });

// Fasting in the heat. Abu ad-Darda' said: we set out with the Prophet ﷺ on one of his journeys on a very hot day,
// until one of us would put his hand on his head from the great heat, and none of us was fasting except the Prophet ﷺ
// and Ibn Rawahah (Sahih al-Bukhari 1945). No one is drawn, and no one rides: under a blazing sun, his place is a golden
// ring on a road through the desert, with Ibn Rawahah's place, the places of those with him and two camels, and they
// come along the road. The heat spreads over the land and shimmers; a small shade comes over three of the places; a cup
// of water comes by each of them; then a soft golden ring comes about his place and Ibn Rawahah's: the two fasting.
function fastingInHeat(): SignArt {
  const his: [number, number] = [62, 104.8];
  const rawahah: [number, number] = [72, 105.4];
  const others: [number, number][] = [
    [84, 104.6],
    [94, 105.6],
    [104, 104.6]
  ];
  const walk = walkIn(-40, 0.03, 0.15);
  return {
    kind: "fasting-in-heat",
    ms: 10000,
    parts: [
      { name: "a hot sky", svg: sky("#F1D49A", "#FAEBC4", 62) },
      { name: "the sun", svg: sun(126, 22) },
      { name: "a very hot day: the sun's glow spreads", svg: glow(126, 22, 26, "#FFF2C2", 0.22) + glow(126, 22, 16, "#FFE9A6", 0.3), keys: showFrom(0.23, 0.29), loop: soft },
      { name: "hills", svg: hills("#D7BB8A") },
      { name: "the land", svg: land() },
      { name: "the road through the desert", svg: `<path d="M0 101.4 Q80 99 160 101.4 L160 108.6 Q80 106 0 108.6 Z" fill="#E8D3A6"/>` },
      { name: "a very hot day: heat shimmering over the land", svg: shimmer(10, 150, 92), keys: showFrom(0.24, 0.3), loop: { move: "bob", ms: 1400, y: -0.8 } },
      { name: "a camel of the journey 1", svg: camel(26, 105, 0.15), keys: walk },
      { name: "a camel of the journey 2", svg: camel(41, 105.6, 0.15), keys: walk },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD), keys: walk },
      { name: "Ibn Rawahah's place", svg: someone(rawahah[0], rawahah[1], 1.7), keys: walk },
      ...others.map(([x, y], i): SignPart => ({ name: `a place of those with him ${i + 1}`, svg: someone(x, y, 1.7), keys: walk })),
      ...others.map(
        ([x, y], i): SignPart => ({
          name: `from the great heat: a shade over a place ${i + 1}`,
          svg: shadeOver(x, y),
          keys: showFrom(at3(0.42 + i * 0.03), at3(0.45 + i * 0.03))
        })
      ),
      ...others.map(
        ([x, y], i): SignPart => ({
          name: `not fasting: a cup of water by a place ${i + 1}`,
          svg: cup(n(x + 3.6), n(y + 2.8)) + drink(n(x + 3.6), n(y + 2.8)),
          keys: showFrom(at3(0.63 + i * 0.03), at3(0.66 + i * 0.03))
        })
      ),
      { name: "fasting: a soft golden ring about his place", svg: fastRing(his[0], n(his[1] + 0.4)), keys: showFrom(0.81, 0.84), loop: soft },
      { name: "fasting: a soft golden ring about Ibn Rawahah's place", svg: fastRing(rawahah[0], n(rawahah[1] + 0.4)), keys: showFrom(0.83, 0.86), loop: soft },
      { name: "the two fasting: a warm glow about them", svg: wash(67, 103.4, 11, 4.4, WARM, 0.2), keys: showFrom(0.87, 0.91), loop: soft }
    ],
    words: [
      { text: "We set out with him on a journey", from: 0.02, to: 0.2 },
      { text: "On a very hot day", from: 0.22, to: 0.38 },
      { text: "One put his hand on his head from the heat", from: 0.4, to: 0.6 },
      { text: "None of us was fasting", from: 0.62, to: 0.78 },
      { text: "Except him and Ibn Rawahah", from: 0.8, to: 1 }
    ]
  };
}

/** A night of the days and nights: a dark tile with a crescent, its foot's middle at (x, y). */
const nightTile = (x: number, y: number) =>
  `<rect x="${n(x - 7)}" y="${n(y - 18)}" width="14" height="18" rx="2.4" fill="#2A3A66" stroke="#4A5B8C" stroke-width="0.6"/>` +
  crescent(n(x - 1), n(y - 11.4), 2.6, 1.1, "#F3E3A2") +
  `<circle cx="${n(x + 3.6)}" cy="${n(y - 14.4)}" r="0.45" fill="#F3E3C0"/><circle cx="${n(x - 4)}" cy="${n(y - 5.6)}" r="0.4" fill="#F3E3C0"/>`;

// No fasting on without a break. Aishah said: the Messenger of Allah ﷺ forbade al-wisal, out of mercy for them. They
// said: but you do al-wisal. He said: I am not like you; my Lord gives me food and drink (Sahih al-Bukhari 1964); and
// Ibn Umar told it too: I am not like you; I am given food and drink (Sahih al-Bukhari 1962). No one is drawn: at dusk by
// the masjid of Madinah, his place is a golden ring at its door, and three places sit at a cloth. Above, a day, a night,
// a day and a night stand in a row; a grey dashed line joins the first day to the next through the night, and a grey
// dashed ring comes about it. A golden ring of care comes about the places, and dates come on their cloth, and a warm
// light on the night. Their voice asks; a soft golden ring stays about his place; his voice answers, and a soft warm
// glow comes about his place.
function noWisal(): SignArt {
  const his: [number, number] = [21.3, 103.6];
  const sitting: [number, number][] = [
    [80, 102.8],
    [94, 103.8],
    [108, 102.8]
  ];
  const tiles: [number, number, boolean][] = [
    [64, 50, true],
    [84, 50, false],
    [104, 50, true],
    [124, 50, false]
  ];
  return {
    kind: "no-wisal",
    ms: 12000,
    parts: [
      { name: "the dusk sky", svg: DUSK },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [140, 96, 13],
        [150, 94, 12]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.72) },
      { name: "a golden ring, his place at the door of the masjid", svg: ring(his[0], his[1], 2.4, GOLD) },
      ...tiles.map(([x, y, day], i): SignPart => ({ name: day ? `a day of fasting ${i / 2 + 1}` : `a night ${(i + 1) / 2}`, svg: day ? dayTile(x, y) : nightTile(x, y) })),
      {
        name: "al-wisal: a grey dashed line joining a day to the next, through the night",
        svg: way(`M${tiles[0][0] + 7} ${tiles[0][1] - 9} L${tiles[2][0] - 7} ${tiles[2][1] - 9}`, GREY, 1),
        keys: showFrom(0.04, 0.08)
      },
      { name: "he forbade it: a grey dashed ring about the joined days", svg: greyRing(84, 41, 30, 14), keys: showFrom(0.09, 0.12) },
      { name: "a cloth for breaking the fast", svg: cloth(76, 112, 104.8) },
      ...sitting.map(([x, y], i): SignPart => ({ name: `a place at the cloth ${i + 1}`, svg: someone(x, y, 1.7) })),
      { name: "out of mercy for them: a golden ring of care about the places", svg: care(94, 103.4, 20, 4.2), keys: showFrom(0.2, 0.24) },
      {
        name: "eating at night: dates on the cloth",
        svg: [86, 94, 102].map((x, i) => ON_DISH.map(([dx, dy]) => date(n(x + dx), n(106 + dy * 0.5 + (i % 2) * 0.2))).join("")).join(""),
        keys: showFrom(0.22, 0.25)
      },
      { name: "eating at night: a warm light on the night", svg: glow(84, 41, 8, WARM, 0.3), keys: showFrom(0.24, 0.28), loop: soft },
      { name: "their voice: but you do al-wisal", svg: arcsLeft(n(sitting[0][0] - 3.2), n(sitting[0][1] - 4.2), VOICE), keys: showWhile(0.35, 0.355, 0.52, 0.525), loop: speaking },
      { name: "his fast, kept on: a soft golden ring about his place", svg: fastRing(his[0], n(his[1] + 0.4)), keys: showFrom(0.38, 0.42), loop: soft },
      { name: "his voice: I am not like you", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showFrom(0.53, 0.535), loop: speaking },
      { name: "not like you: a soft warm glow about his place", svg: wash(his[0], n(his[1] - 1), 9, 5, WARM, 0.22), keys: showFrom(0.73, 0.79), loop: soft }
    ],
    words: [
      { text: "He forbade al-wisal", from: 0.02, to: 0.16 },
      { text: "Out of mercy for them", from: 0.18, to: 0.32 },
      { text: "They said: but you do al-wisal", from: 0.34, to: 0.5 },
      { text: "He said: I am not like you", from: 0.52, to: 0.68 },
      { text: "My Lord feeds me and gives me drink", from: 0.7, to: 1 }
    ]
  };
}

/** The thirty days of a month as small lights in three rows of ten, the first at (x, y), `step` apart. */
const monthDays = (x: number, y: number, step: number): [number, number][] =>
  Array.from({ length: 30 }, (_, i) => [n(x + (i % 10) * step), n(y + Math.floor(i / 10) * step)]);

// Three days a month. Abdullah ibn Amr ibn al-As said: the Prophet ﷺ said to me: you fast all the time and pray all
// night? I said: yes. He said: ... whoever fasts all the time has not fasted; fasting three days is fasting all the time
// (Sahih al-Bukhari 1979). No one is drawn: by a home, his place is a golden ring, and Abdullah's place is beside it, with
// a small lamp. Above, the thirty days of a month are small lights; a soft golden ring comes on every one of them. His
// voice asks, and Abdullah's voice answers. A grey dashed ring comes about all the days, and the golden rings fade; then
// three days get a soft golden ring, and a warm light comes over all the days of the month, and a warm glow about
// Abdullah's place.
function threeDays(): SignArt {
  const his: [number, number] = [44, 104.6];
  const abdullah: [number, number] = [58, 105.2];
  const days = monthDays(66, 30, 8.6);
  const three = [days[12], days[13], days[14]];
  return {
    kind: "three-days-a-month",
    ms: 10000,
    parts: [
      ...dayAround([22, 20], 10000),
      ...palms([
        [146, 94, 13],
        [151, 92, 11]
      ]),
      { name: "a home", svg: home(110, 101, 24, 15) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Abdullah's place", svg: someone(abdullah[0], abdullah[1], 1.7) },
      { name: "the days of a month: thirty small lights", svg: days.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="#FFF7E2" stroke="#D9C49A" stroke-width="0.5"/>`).join("") },
      {
        name: "fasting all the time: a soft golden ring on every day",
        svg: days.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" stroke="#E8C25A" stroke-width="0.6" fill="#FFE07A" fill-opacity="0.18"/>`).join(""),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.1, 1],
            [0.44, 1],
            [0.5, 0]
          ]
        })
      },
      { name: "praying all night: a small lamp by Abdullah's place", svg: glow(n(abdullah[0] + 4), 103.6, 3, WARM, 0.4) + `<path d="M${n(abdullah[0] + 2.6)} 106.4 L${n(abdullah[0] + 5.4)} 106.4 L${n(abdullah[0] + 4.6)} 105.2 L${n(abdullah[0] + 3.4)} 105.2 Z" fill="#B07A3A"/>` + sparkle(n(abdullah[0] + 4), 104, 0.9, "#E8A93A"), keys: showFrom(0.1, 0.14), loop: soft },
      { name: "his voice: you fast all the time?", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showWhile(0.03, 0.035, 0.22, 0.225), loop: speaking },
      { name: "Abdullah's voice: yes", svg: arcsLeft(n(abdullah[0] - 3.2), n(abdullah[1] - 4.2), VOICE), keys: showWhile(0.23, 0.235, 0.34, 0.345), loop: speaking },
      { name: "his voice: whoever fasts all the time has not fasted", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showFrom(0.35, 0.355), loop: speaking },
      {
        name: "has not fasted: a grey dashed ring about all the days",
        svg: greyRing(n(days[0][0] + 4.5 * 8.6), n(days[0][1] + 8.6), 46, 15),
        keys: track({
          opacity: [
            [0.38, 0],
            [0.42, 1],
            [0.6, 1],
            [0.64, 0]
          ]
        })
      },
      ...three.map(([x, y], i): SignPart => ({ name: `three days: a soft golden ring on a day ${i + 1}`, svg: `<circle cx="${x}" cy="${y}" r="2.8" stroke="#E8C25A" stroke-width="0.8" fill="#FFE07A" fill-opacity="0.3"/>`, keys: showFrom(at3(0.6 + i * 0.02), at3(0.63 + i * 0.02)), loop: soft })),
      { name: "like fasting all the time: a warm light over all the days", svg: wash(n(days[0][0] + 4.5 * 8.6), n(days[0][1] + 8.6), 46, 15, WARM, 0.14), keys: showFrom(0.78, 0.84), loop: soft },
      { name: "a warm glow about Abdullah's place", svg: wash(abdullah[0], n(abdullah[1] - 1), 7, 4, WARM, 0.24), keys: showFrom(0.85, 0.89), loop: soft }
    ],
    words: [
      { text: "You fast all the time and pray all night?", from: 0.02, to: 0.2 },
      { text: "Abdullah said: yes", from: 0.22, to: 0.32 },
      { text: "Whoever fasts all the time has not fasted", from: 0.34, to: 0.56 },
      { text: "Fasting three days a month", from: 0.58, to: 0.74 },
      { text: "Is like fasting all the time", from: 0.76, to: 1 }
    ]
  };
}

/** A small square of the days, its middle at (x, y), `fill` inside. */
const daySquare = (x: number, y: number, fill: string, line: string) =>
  `<rect x="${n(x - 5)}" y="${n(y - 4)}" width="10" height="8" rx="1.6" fill="${fill}" stroke="${line}" stroke-width="0.5"/>`;

// Not a day or two before. Abu Hurairah said that the Prophet ﷺ said: none of you should go before Ramadan with a fast
// of a day or two, unless one used to fast that fast; then let him fast that day (Sahih al-Bukhari 1914). No one is
// drawn: the last weeks of Sha'ban and the first days of Ramadan are small squares, week under week, under the new moon
// of Ramadan; the days of Ramadan glow. A grey dashed ring comes about each of the two days just before it. The place of
// one who fasts the same day every week is by its home; a soft golden ring comes on that day in the weeks before, and a
// golden line joins them down to the day before Ramadan; its grey ring fades, a soft golden ring comes on it, and about
// the place, and a spark rises.
function notBeforeRamadan(): SignArt {
  const col = (c: number) => n(52 + c * 13.4);
  const row = (r: number) => n(26 + r * 12);
  // Three weeks: the first two all Sha'ban; in the third, two days of Sha'ban, then Ramadan from the third day.
  const cells: [number, number, number][] = [];
  for (let r = 0; r < 3; r += 1) for (let c = 0; c < 7; c += 1) cells.push([col(c), row(r), r * 7 + c]);
  const sha = cells.filter(([, , i]) => i < 16);
  const ram = cells.filter(([, , i]) => i >= 16);
  const before = [cells[14], cells[15]];
  const habit = [cells[1], cells[8]];
  const place: [number, number] = [96, 104.8];
  return {
    kind: "not-before-ramadan",
    ms: 10000,
    parts: [
      ...dayAround([136, 18], 10000),
      { name: "the new moon of Ramadan", svg: crescent(22, 24, 4, 1.6, "#F2DFA0") },
      ...palms([
        [20, 96, 13],
        [148, 94, 12]
      ]),
      { name: "a home", svg: home(118, 101, 22, 14) },
      { name: "the days of Sha'ban, week under week", svg: sha.map(([x, y]) => daySquare(x, y, "#FFF7E2", "#D9C49A")).join("") },
      { name: "the days of Ramadan", svg: ram.map(([x, y]) => daySquare(x, y, "#FFF0C0", "#E2C46A")).join("") },
      { name: "Ramadan: a soft golden light on its days", svg: ram.map(([x, y]) => glow(x, y, 6, WARM, 0.22)).join(""), keys: showFrom(0.04, 0.09), loop: soft },
      ...before.map(([x, y], i): SignPart => ({
        name: `a day or two before it: a grey dashed ring about a day ${i + 1}`,
        svg: greyRing(x, y, 7, 5.6),
        keys:
          i === 1
            ? track({
                opacity: [
                  [at3(0.26 + i * 0.03), 0],
                  [at3(0.29 + i * 0.03), 1],
                  [0.74, 1],
                  [0.78, 0]
                ]
              })
            : showFrom(at3(0.26 + i * 0.03), at3(0.29 + i * 0.03))
      })),
      { name: "the place of one who fasts his day every week", svg: someone(place[0], place[1], 1.7) },
      ...habit.map(([x, y], i): SignPart => ({ name: `his habit: a soft golden ring on his day, week ${i + 1}`, svg: fastRing(x, y, 5.6, 4.6), keys: showFrom(at3(0.48 + i * 0.04), at3(0.51 + i * 0.04)), loop: soft })),
      { name: "his habit: a golden line down his day", svg: way(`M${habit[0][0]} ${n(habit[0][1] + 4.6)} L${before[1][0]} ${n(before[1][1] - 4.6)}`, GOLD, 0.9), keys: showFrom(0.58, 0.62) },
      { name: "that day: a soft golden ring on it", svg: fastRing(before[1][0], before[1][1], 5.6, 4.6), keys: showFrom(0.74, 0.78), loop: soft },
      { name: "let him fast it: a soft golden ring about his place", svg: fastRing(place[0], n(place[1] + 0.4)), keys: showFrom(0.8, 0.84), loop: soft },
      spark("his fast: a spark rising", place[0], n(place[1] - 4), 0.85, 0.92)
    ],
    words: [
      { text: "None of you should go before Ramadan", from: 0.02, to: 0.22 },
      { text: "With a fast of a day or two", from: 0.24, to: 0.44 },
      { text: "Unless one used to fast that fast", from: 0.46, to: 0.7 },
      { text: "Then let that person fast that day", from: 0.72, to: 1 }
    ]
  };
}

// No fast on the days of Eid. Abu Ubayd said: I attended the Eid with Umar ibn al-Khattab, and he said: these are two
// days the Messenger of Allah ﷺ forbade fasting: the day you break your fast from your fasting, and the other day, on
// which you eat from your sacrifices (Sahih al-Bukhari 1990). No one is drawn: at the place of the Eid prayer outside
// Madinah, among palms, the places of the people sit in rows, and Umar's place is before them. His voice speaks, and
// two days show above: the day of breaking the fast, with its new moon, and the other day; a grey dashed ring comes
// about each. Dates and a cup come by the places, and a warm glow on the first day; then a dish of food comes by them,
// and a warm glow on the other day, and a warm glow over the gathering.
function noFastOnEid(): SignArt {
  const umar: [number, number] = [80, 93.6];
  const rows: [number, number][] = [
    [56, 99],
    [68, 99],
    [80, 99],
    [92, 99],
    [104, 99],
    [62, 103],
    [74, 103],
    [86, 103],
    [98, 103]
  ];
  const fitr: [number, number] = [62, 54];
  const adha: [number, number] = [98, 54];
  return {
    kind: "no-fast-on-eid",
    ms: 10000,
    parts: [
      ...dayAround([132, 20], 10000),
      ...palms([
        [16, 96, 13],
        [30, 94, 11],
        [140, 96, 13],
        [151, 94, 11]
      ]),
      { name: "the place of the Eid prayer", svg: `<path d="M40 95 L120 95 L126 105.6 L34 105.6 Z" fill="#EEDDB4"/>` },
      { name: "Umar's place, before them", svg: someone(umar[0], umar[1], 1.8) },
      ...rows.map(([x, y], i): SignPart => ({ name: `a place at the Eid prayer ${i + 1}`, svg: someone(x, y, 1.6) })),
      { name: "Umar's voice: these are two days", svg: arcs(n(umar[0] + 3.2), n(umar[1] - 4.2), VOICE), keys: showFrom(0.23, 0.235), loop: speaking },
      { name: "the day you break your fast: a day with its new moon", svg: dayTile(fitr[0], fitr[1]) + crescent(n(fitr[0] + 3.6), n(fitr[1] - 14.6), 1.6, 0.7, "#E2B84A"), keys: showFrom(0.25, 0.29) },
      { name: "the other day: a day", svg: dayTile(adha[0], adha[1]), keys: showFrom(0.27, 0.31) },
      { name: "he forbade fasting them: a grey dashed ring about the first day", svg: aboutDay(fitr[0], fitr[1], 1.6, GREY, 0.7), keys: showFrom(0.33, 0.36) },
      { name: "he forbade fasting them: a grey dashed ring about the other day", svg: aboutDay(adha[0], adha[1], 1.6, GREY, 0.7), keys: showFrom(0.35, 0.38) },
      {
        name: "breaking the fast: dates and a cup by the places",
        svg: [60, 84, 108].map((x) => ON_DISH.map(([dx, dy]) => date(n(x + dx), n(96.6 + dy * 0.5))).join("")).join("") + cup(72, 96.4) + drink(72, 96.4) + cup(96, 96.4) + drink(96, 96.4),
        keys: showFrom(0.5, 0.54)
      },
      { name: "the day you break your fast: a warm glow on it", svg: glow(fitr[0], n(fitr[1] - 9), 12, WARM, 0.32), keys: showFrom(0.55, 0.6), loop: soft },
      { name: "the other day: a dish of food by the places", svg: dishOfFood(66, 107) + dishOfFood(92, 107), keys: showFrom(0.74, 0.78) },
      { name: "the other day: a warm glow on it", svg: glow(adha[0], n(adha[1] - 9), 12, WARM, 0.32), keys: showFrom(0.79, 0.84), loop: soft },
      { name: "the days of Eid: a warm glow over the gathering", svg: wash(80, 99, 40, 8, WARM, 0.14), keys: showFrom(0.86, 0.91), loop: soft }
    ],
    words: [
      { text: "Abu Ubayd: I attended the Eid with Umar", from: 0.02, to: 0.2 },
      { text: "Umar: These two days he forbade fasting", from: 0.22, to: 0.46 },
      { text: "The day you break your fast", from: 0.48, to: 0.7 },
      { text: "And the day you eat from your sacrifices", from: 0.72, to: 1 }
    ]
  };
}

// Ashura and Ramadan. Aishah said: the Messenger of Allah ﷺ ordered fasting the day of Ashura; and when Ramadan was
// made a duty, whoever wished fasted it, and whoever wished did not (Sahih al-Bukhari 2001). Ibn Abbas said: I never
// saw the Prophet ﷺ seek to fast a day he preferred over others but this day, the day of Ashura, and this month,
// meaning the month of Ramadan (Sahih al-Bukhari 2006). No one is drawn: the twelve months of the year are crescents
// in two rows across the sky. His place is a golden ring, and four places are by it. His voice speaks; a small golden
// light comes on the first month, the day of Ashura, and a soft golden ring about each place. A golden ring comes about
// the ninth month, Ramadan, and a golden light on it. A warm glow comes about the two places that fast; the rings of the
// other two fade, and dates and a cup come by them. Then Ashura's light shines brighter, and a warm glow comes about
// Ramadan.
function ashuraAndRamadan(): SignArt {
  const months: [number, number][] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => [n(34 + 18.4 * (i % 6)), i < 6 ? 26 : 42]);
  const ashura = months[0];
  const ramadan = months[8];
  const his: [number, number] = [40, 104.6];
  const places: [number, number][] = [
    [64, 105],
    [80, 105.8],
    [96, 105],
    [112, 105.8]
  ];
  return {
    kind: "ashura-and-ramadan",
    ms: 12000,
    parts: [
      ...dayAround([11, 30], 12000),
      ...palms([
        [140, 96, 13],
        [151, 94, 11]
      ]),
      { name: "the year: its twelve months together", svg: `<rect x="22" y="17" width="116" height="34" rx="4" fill="#FFFFFF" opacity="0.4"/>` },
      ...months.map(([x, y], i): SignPart => ({ name: `a month of the year ${i + 1}`, svg: crescent(x, y, 3.2, 1.3, "#E9C766") })),
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      ...places.map(([x, y], i): SignPart => ({ name: `a place by him ${i + 1}`, svg: someone(x, y, 1.7) })),
      { name: "his voice: fast the day of Ashura", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showWhile(0.03, 0.035, 0.18, 0.185), loop: speaking },
      { name: "the day of Ashura: a small golden light on the first month", svg: goldLight(n(ashura[0] + 4.4), n(ashura[1] + 3.6), 1.4), keys: showFrom(0.05, 0.08), loop: soft },
      ...places.map(
        ([x, y], i): SignPart => ({
          name: `fasting Ashura: a soft golden ring about a place ${i + 1}`,
          svg: fastRing(x, n(y + 0.4)),
          keys:
            i < 2
              ? showFrom(0.09, 0.12)
              : track({
                  opacity: [
                    [0.09, 0],
                    [0.12, 1],
                    [0.49, 1],
                    [0.53, 0]
                  ]
                }),
          loop: soft
        })
      ),
      { name: "Ramadan made a duty: a golden ring about the ninth month", svg: `<ellipse cx="${ramadan[0]}" cy="${ramadan[1]}" rx="6.4" ry="5.6" stroke="${GOLD}" stroke-width="0.9" fill="none"/>`, keys: showFrom(0.2, 0.24) },
      { name: "the month of Ramadan: a golden light on it", svg: glow(ramadan[0], ramadan[1], 7, WARM, 0.4), keys: showFrom(0.22, 0.26), loop: soft },
      { name: "whoever wished fasted it: a warm glow about the two that fast", svg: wash(72, 104.4, 14, 4.4, WARM, 0.2), keys: showFrom(0.36, 0.4), loop: soft },
      ...places.slice(2).map(
        ([x, y], i): SignPart => ({
          name: `whoever wished did not: dates and a cup by a place ${i + 1}`,
          svg: [-1.6, 0, 1.6].map((dx) => date(n(x + dx - 0.4), n(y + 2.2))).join("") + cup(n(x + 3.4), n(y + 2.6)) + drink(n(x + 3.4), n(y + 2.6)),
          keys: showFrom(at3(0.5 + i * 0.02), at3(0.53 + i * 0.02))
        })
      ),
      { name: "Ashura, sought more than any day: its light shines brighter", svg: glow(n(ashura[0] + 4.4), n(ashura[1] + 3.6), 6, WARM, 0.45) + sparkle(n(ashura[0] + 4.4), n(ashura[1] + 3.6), 2.2, "#FFE7A0"), keys: showFrom(0.64, 0.69), loop: soft },
      { name: "and this month: a warm glow about Ramadan", svg: wash(ramadan[0], ramadan[1], 11, 8, WARM, 0.3), keys: showFrom(0.84, 0.89), loop: soft }
    ],
    words: [
      { text: "He ordered fasting the day of Ashura", from: 0.02, to: 0.16 },
      { text: "When Ramadan was made a duty", from: 0.18, to: 0.32 },
      { text: "Whoever wished fasted it", from: 0.34, to: 0.46 },
      { text: "And whoever wished did not", from: 0.48, to: 0.6 },
      { text: "No day he sought to fast more than Ashura", from: 0.62, to: 0.8 },
      { text: "And this month: Ramadan", from: 0.82, to: 1 }
    ]
  };
}

/** A cup of milk: the cup of hopeArt.ts with white milk to its brim, its foot's middle at (x, y). */
const milk = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 3.3)}" rx="1.45" ry="0.45" fill="#FFFDF4"/>`;

// The milk at Arafah. Maymunah said: the people doubted whether the Prophet ﷺ was fasting on the day of Arafah, so I
// sent him a cup of milk while he stood at the standing place, and he drank from it while the people were looking
// (Sahih al-Bukhari 1989). No one is drawn: on the plain of Arafah, with its hill and white tents, his place is a golden
// ring, and the places of the people are about it. Grey voices of doubt come from three of them. A cup of milk goes
// from Maymunah's place by her tent to his place, and a soft light comes about it as he stands. The milk in the cup is
// gone, and the grey voices stop; faint warm lines go from the places to his, and a warm glow comes over them all.
function milkAtArafah(): SignArt {
  const his: [number, number] = [82, 103.8];
  const maymunah: [number, number] = [140, 105.4];
  const people: [number, number][] = [
    [40, 106],
    [54, 104.6],
    [66, 107],
    [100, 107],
    [112, 104.6],
    [124, 106.4]
  ];
  const doubting = [people[1], people[3], people[5]];
  const cupFrom: [number, number] = [n(maymunah[0] - 3.6), 107.6];
  const cupTo: [number, number] = [n(his[0] + 3.6), 106.2];
  const cupGoes = track({
    opacity: [
      [0.25, 0],
      [0.27, 1]
    ],
    xy: [
      [0.27, 0, 0],
      [0.38, n(cupTo[0] - cupFrom[0]), n(cupTo[1] - cupFrom[1])]
    ]
  });
  return {
    kind: "milk-at-arafah",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(30, 22) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a hill on the plain of Arafah", svg: peaks([[80, 17, 20]], 100, "#B39A72", false) + `<path d="M72 94 L76 92 L80 94 M84 90 L88 92" stroke="#9C8460" stroke-width="0.7" fill="none"/>` },
      { name: "white tents on the plain", svg: tent(22, 100, 12, 8) + tent(34, 101, 10, 7) + tent(118, 100, 10, 7) + tent(146, 100, 12, 8), loop: { move: "bob", ms: 3000, y: -0.2 } },
      { name: "a golden ring, his place, standing at Arafah", svg: ring(his[0], his[1], 2.4, GOLD) },
      ...people.map(([x, y], i): SignPart => ({ name: `a place on the plain of Arafah ${i + 1}`, svg: someone(x, y, 1.6) })),
      { name: "Maymunah's place, by her tent", svg: someone(maymunah[0], maymunah[1], 1.6) },
      ...doubting.map(
        ([x, y], i): SignPart => ({
          name: `doubting his fast: a grey voice ${i + 1}`,
          svg: arcs(n(x + 2.8), n(y - 3.8), GREY),
          keys: showWhile(at3(0.04 + i * 0.03), at3(0.045 + i * 0.03), 0.62, 0.625),
          loop: speaking
        })
      ),
      { name: "a cup of milk, sent to him", svg: cup(cupFrom[0], cupFrom[1]), keys: cupGoes },
      {
        name: "the milk in the cup",
        svg: milk(cupFrom[0], cupFrom[1]),
        keys: track({
          opacity: [
            [0.25, 0],
            [0.27, 1],
            [0.63, 1],
            [0.69, 0]
          ],
          xy: [
            [0.27, 0, 0],
            [0.38, n(cupTo[0] - cupFrom[0]), n(cupTo[1] - cupFrom[1])]
          ]
        })
      },
      { name: "standing at Arafah: a soft light about his place", svg: wash(his[0], n(his[1] - 1), 8, 4.4, "#FFF6D6", 0.3), keys: showFrom(0.46, 0.5), loop: soft },
      ...[people[1], people[2], people[3], people[4]].map(([x, y], i): SignPart => ({
        name: `looking on: a faint warm line to his place ${i + 1}`,
        svg: `<path d="M${x} ${n(y - 2.2)} L${n(x + (his[0] - x) * 0.7)} ${n(y - 2.2 + (his[1] - y) * 0.7 - 1.2)}" stroke="${WARM}" stroke-width="0.6" stroke-dasharray="1 1" opacity="0.9"/>`,
        keys: showFrom(at3(0.78 + i * 0.015), at3(0.81 + i * 0.015))
      })),
      { name: "they saw it: a warm glow over them all", svg: wash(84, 102.5, 44, 6, WARM, 0.14), keys: showFrom(0.87, 0.92), loop: soft }
    ],
    words: [
      { text: "The people doubted if he fasted at Arafah", from: 0.02, to: 0.22 },
      { text: "Maymunah: So I sent him a cup of milk", from: 0.24, to: 0.42 },
      { text: "While he stood at Arafah", from: 0.44, to: 0.58 },
      { text: "He drank from it", from: 0.6, to: 0.74 },
      { text: "And the people were looking", from: 0.76, to: 1 }
    ]
  };
}

export const FAST_DAYS_ART = {
  "fasting-in-heat": fastingInHeat,
  "no-wisal": noWisal,
  "three-days-a-month": threeDays,
  "not-before-ramadan": notBeforeRamadan,
  "no-fast-on-eid": noFastOnEid,
  "ashura-and-ramadan": ashuraAndRamadan,
  "milk-at-arafah": milkAtArafah
};
