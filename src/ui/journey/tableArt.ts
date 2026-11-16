import { glow, n, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { dish } from "./worthArt";
import { cup, food } from "./hopeArt";
import { GREY } from "./lovedArt";
import { GOLD, someone, VOICE, WARM, wash } from "./worshipArt";
import { care, dayAround, lightIn, palms, sparkRising, tent, track } from "./daysArt";
import { faintRing, goldLight } from "./heedArt";

/**
 * At the table, drawn as the scenes of home are (homeArt.ts): seven dates each; two dates at once; the one on his right;
 * praise when the meal is done; a little food on one leather sheet; food he never found fault with; and a date in the
 * street. Only the land, the sky, buildings, things and plants are drawn. No Prophet, no Companion and no person is ever
 * drawn, not even a hand, a mouth or a face: where someone was, a ring or a small dashed circle shows it, a voice is arcs
 * in the air, and food that is eaten is simply gone. Nothing is drawn for Allah, and nothing comes down from the sky: a
 * praise or a du'a is a spark that rises, and a blessing is a soft light that comes about its place.
 */

/** A voice twinkling as it speaks. */
const speaking = { move: "twinkle", ms: 900, low: 0.5 } as const;

/** A light twinkling softly. */
const soft = { move: "twinkle", ms: 1800, low: 0.75 } as const;

/** A date, its middle at (x, y). */
const date = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.65" fill="#7A2E14"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.25)}" rx="0.3" ry="0.15" fill="#B0563A"/>`;

/** A dry, hard date, grey-brown and wrinkled, its middle at (x, y). */
const dryDate = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.62" fill="#8E7A5E"/>` +
  `<path d="M${n(x - 0.5)} ${n(y - 0.3)} q0.25 0.3 0 0.6 M${x} ${n(y - 0.4)} q0.25 0.4 0 0.8 M${n(x + 0.5)} ${n(y - 0.3)} q0.25 0.3 0 0.6" stroke="#5F4F3A" stroke-width="0.18" fill="none"/>`;

/** Seven dates in a little heap, its foot's middle at (x, y): four below and three on them. */
const HEAP: [number, number][] = [
  [-2.7, 0],
  [-0.9, 0],
  [0.9, 0],
  [2.7, 0],
  [-1.8, -1.1],
  [0, -1.1],
  [1.8, -1.1]
];

/** A ring of grey dashes about (x, y): something not to be done. */
const greyRing = (x: number, y: number, r = 2.6) => `<circle cx="${x}" cy="${y}" r="${r}" stroke="${GREY}" stroke-width="0.6" stroke-dasharray="1 0.9" fill="none"/>`;

/** A spark of praise or of du'a at (x, y), rising from `from` until `to`. */
const praiseSpark = (name: string, x: number, y: number, from: number, to: number): SignPart => ({
  name,
  svg: sparkle(x, y, 1.6, "#FFE7A0"),
  keys: sparkRising(from, to),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

/** A cloth spread on the ground for a meal, from x1 to x2 at its back (y) and a little wider at its front. */
const cloth = (x1: number, x2: number, y: number, fill = "#EFE0BC", line = "#D9C49A") =>
  `<path d="M${x1} ${y} L${x2} ${y} L${n(x2 + 3)} ${n(y + 4.2)} L${n(x1 - 3)} ${n(y + 4.2)} Z" fill="${fill}"/><path d="M${n(x1 - 0.6)} ${n(y + 1)} L${n(x2 + 0.6)} ${n(y + 1)}" stroke="${line}" stroke-width="0.5"/>`;

/** A small bowl, its foot's middle at (x, y), empty. */
const bowl = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${n(y - 1.8)} Q${n(x - 2)} ${n(y + 0.2)} ${x} ${n(y + 0.2)} Q${n(x + 2)} ${n(y + 0.2)} ${n(x + 2.2)} ${n(y - 1.8)} Z" fill="#9C6B3C"/>` +
  `<ellipse cx="${x}" cy="${n(y - 1.8)}" rx="2.2" ry="0.5" fill="#6E4524"/>`;

/** What fills a bowl at (x, y): a heap of dates over its rim. */
const bowlFull = (x: number, y: number) =>
  `<path d="M${n(x - 2.1)} ${n(y - 1.8)} Q${x} ${n(y - 4)} ${n(x + 2.1)} ${n(y - 1.8)} Z" fill="#7E3016"/>` +
  [-1.1, 0, 1.1, -0.5, 0.5].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 2.3 - (i < 3 ? 0 : 0.9))}" rx="0.6" ry="0.45" fill="#A2441F"/>`).join("");

/** A little of what was left, a few dates and a crust, its middle at (x, y). */
const leftOver = (x: number, y: number) =>
  `<ellipse cx="${n(x - 0.9)}" cy="${y}" rx="1.3" ry="0.6" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.25"/>` + date(n(x + 0.8), n(y - 0.1)) + date(n(x + 0.1), n(y - 0.8));

// Seven dates each. Abu Hurairah said: one day the Prophet ﷺ shared out dates among his companions, and gave each one
// seven dates. He gave me seven dates, one of which was dry and hard, yet none of them pleased me more than it, for it
// made my chewing last long (Sahih al-Bukhari 5411). No one is drawn: by his home, his place is a golden ring with a
// basket of dates beside it, and the places of those with him come and sit in a row. A handful of seven dates goes from
// the basket to each place in turn; the last seven go to the place of the one who tells it, and one of them is dry and
// grey, with a faint ring about it. A warm glow comes about that date; then the other six are gone one by one, and the
// dry one goes on, little by little.
function sevenDates(): SignArt {
  const his: [number, number] = [52, 104.6];
  const basket: [number, number] = [59, 107.4];
  const from: [number, number] = [59, 102.4];
  const places: [number, number][] = [
    [78, 104.6],
    [92, 103],
    [106, 104.6],
    [120, 103]
  ];
  const teller: [number, number] = [136, 104.6];
  const heapAt = ([x, y]: [number, number]): [number, number] => [n(x + 5.2), n(y + 1.2)];
  const [tx, ty] = heapAt(teller);
  const dry = HEAP[3];
  const [dx, dy] = [n(tx + dry[0]), n(ty + dry[1])];
  // Each place comes and sits, a little from the right, one after another.
  const sits = (i: number): SignKeys => {
    const start = at3(0.04 + i * 0.025);
    return track({
      opacity: [
        [start, 0],
        [at3(start + 0.02), 1]
      ],
      xy: [
        [start, 8, 0],
        [at3(start + 0.04), 0, 0]
      ]
    });
  };
  // A handful of seven goes from the basket to its heap, from `go` for 0.04.
  const handfulWay = (at: [number, number], go: number): [number, number, number][] => {
    const [hx, hy] = heapAt(at);
    return [
      [go, n(from[0] - hx), n(from[1] - hy)],
      [at3(go + 0.04), 0, 0]
    ];
  };
  const handful = (at: [number, number], go: number): SignKeys =>
    track({
      opacity: [
        [go, 0],
        [at3(go + 0.005), 1]
      ],
      xy: handfulWay(at, go)
    });
  const goodSix = HEAP.filter((each) => each !== dry);
  return {
    kind: "seven-dates",
    ms: 10000,
    parts: [
      ...dayAround([140, 20], 10000),
      ...palms([
        [8, 99, 12],
        [151, 98, 12]
      ]),
      { name: "his home", svg: home(28, 100, 26, 16) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "a basket of dates", svg: basketOfDates(basket[0], basket[1]) },
      ...places.map((at, i): SignPart => ({ name: `a place of those with him ${i + 1}`, svg: someone(at[0], at[1], 1.6), keys: sits(i) })),
      { name: "the place of the one who tells it", svg: someone(teller[0], teller[1], 1.6), keys: sits(4) },
      ...places.map((at, i): SignPart => {
        const [hx, hy] = heapAt(at);
        return { name: `seven dates for each: a handful ${i + 1}`, svg: HEAP.map(([ex, ey]) => date(n(hx + ex), n(hy + ey))).join(""), keys: handful(at, at3(0.25 + i * 0.04)) };
      }),
      ...goodSix.map(([ex, ey], i): SignPart => {
        const gone = at3(0.87 + i * 0.012);
        return {
          name: `his seven: a good date ${i + 1}`,
          svg: date(n(tx + ex), n(ty + ey)),
          keys: track({
            opacity: [
              [0.49, 0],
              [0.495, 1],
              [gone, 1],
              [at3(gone + 0.005), 0]
            ],
            xy: handfulWay(teller, 0.49)
          })
        };
      }),
      {
        name: "his seven: one dry and hard",
        svg: dryDate(dx, dy),
        origin: { x: dx, y: dy },
        keys: track({
          opacity: [
            [0.49, 0],
            [0.495, 1]
          ],
          xy: handfulWay(teller, 0.49),
          scale: [
            [0.88, 1],
            [0.95, 0.6]
          ]
        })
      },
      { name: "dry and hard: a faint ring about it", svg: faintRing(dx, dy, 2), keys: showFrom(0.55, 0.58) },
      { name: "none pleased him more: a warm glow about the dry date", svg: glow(dx, dy, 3, WARM, 0.4), keys: showFrom(0.71, 0.75), loop: soft },
      { name: "a warm glow about the place of the one who tells it", svg: wash(teller[0], n(teller[1] - 2.4), 5.6, 4, WARM, 0.2), keys: showFrom(0.72, 0.76), loop: soft }
    ],
    words: [
      { text: "He shared out dates among his Companions", from: 0.02, to: 0.22 },
      { text: "He gave each one seven dates", from: 0.24, to: 0.46 },
      { text: "He gave me seven: one was dry and hard", from: 0.48, to: 0.68 },
      { text: "None of them pleased me more than it", from: 0.7, to: 0.84 },
      { text: "For it made my chewing last long", from: 0.86, to: 1 }
    ]
  };
}

// Two dates at once. Jabalah ibn Suhaym said: a year of hunger struck us in the time of Ibn al-Zubayr, and he gave us
// dates to eat. Abdullah ibn Umar would pass by us as we ate and say: do not take two dates at once, for the Prophet ﷺ
// forbade taking two at once. Then he would say: unless one asks his brother's permission. Shu'bah said: the
// permission is from the words of Ibn Umar (Sahih al-Bukhari 5446). No one is drawn: in a year of hunger, a dry haze
// comes over the land, and three places sit at a cloth with an empty dish before each. Ibn al-Zubayr's place sends a
// basket, and dates come on each dish. Ibn Umar's place passes by and stops; his voice speaks, two dates go up together
// from the middle dish, and a grey ring comes about them. Golden arcs come, the words of the Prophet ﷺ as he tells
// them, and the two dates go back on the dish. Then the middle place's voice asks the place beside it, a warm glow
// comes about that place, and the two dates go to the middle place together.
function twoDates(): SignArt {
  const zubayr: [number, number] = [26, 105];
  const seats: [number, number][] = [
    [62, 99.2],
    [80, 98.6],
    [98, 99.2]
  ];
  const dishes: [number, number][] = [
    [62, 106],
    [80, 105.6],
    [98, 106]
  ];
  const umar: [number, number] = [120, 98.6];
  // The dates on each dish, and the two of the middle dish that go up together.
  const on: [number, number][] = [
    [-1.4, -1.4],
    [0, -1.6],
    [1.4, -1.4],
    [-0.7, -2.4],
    [0.7, -2.4]
  ];
  const pair: [number, number] = [dishes[1][0], n(dishes[1][1] - 1.6)];
  return {
    kind: "two-dates",
    ms: 12000,
    parts: [
      ...dayAround([138, 18], 12000),
      ...palms([
        [8, 99, 11],
        [150, 98, 13]
      ]),
      { name: "a year of hunger: a dry haze over the land", svg: `<rect y="58" width="160" height="62" fill="#E8C98E" opacity="0.32"/>`, keys: showFrom(0.03, 0.08) },
      { name: "a year of hunger: a dry haze in the sky", svg: `<rect width="160" height="62" fill="#EDC98F" opacity="0.6"/>`, keys: showFrom(0.04, 0.09) },
      { name: "the way along the homes", svg: way("M104 96.6 Q128 95.2 156 96.2", "#FFFFFF", 0.7) },
      { name: "a home", svg: home(36, 97, 22, 14) },
      { name: "a cloth spread for eating", svg: cloth(56, 104, 103.2) },
      ...seats.map((at, i): SignPart => ({ name: `a place at the cloth ${i + 1}`, svg: someone(at[0], at[1], 1.6) })),
      ...dishes.map((at, i): SignPart => ({ name: `an empty dish ${i + 1}`, svg: dish(at[0], at[1]) })),
      { name: "Ibn al-Zubayr's place", svg: someone(zubayr[0], zubayr[1], 1.7) },
      {
        name: "dates to eat: a basket from Ibn al-Zubayr",
        svg: basketOfDates(n(zubayr[0] + 6), n(zubayr[1] + 2)),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.185, 1],
            [0.25, 1],
            [0.26, 0]
          ],
          xy: [
            [0.185, 0, 0],
            [0.24, 18, -0.6]
          ]
        })
      },
      ...dishes.flatMap(([x, y], d) =>
        on
          .map(([ex, ey], i): [number, number, number] => [n(x + ex), n(y + ey), i])
          .filter(([, , i]) => !(d === 1 && (i === 3 || i === 4)))
          .map(
            ([ex, ey, i]): SignPart => ({
              name: `dates on dish ${d + 1}, ${i + 1}`,
              svg: date(ex, ey),
              keys: showFrom(at3(0.242 + d * 0.01 + i * 0.002), at3(0.247 + d * 0.01 + i * 0.002))
            })
          )
      ),
      {
        name: "two dates together, at once",
        svg: date(n(pair[0] - 0.7), n(pair[1] - 0.8)) + date(n(pair[0] + 0.7), n(pair[1] - 0.8)),
        keys: track({
          opacity: [
            [0.252, 0],
            [0.257, 1]
          ],
          xy: [
            [0.51, 0, 0],
            [0.54, 0, -2.4],
            [0.7, 0, -2.4],
            [0.73, 0, 0],
            [0.89, 0, 0],
            [0.93, 0, -4.4]
          ]
        })
      },
      { name: "two at once: a grey ring about them", svg: greyRing(pair[0], n(pair[1] - 3.2), 2.2), keys: showWhile(0.545, 0.56, 0.69, 0.7) },
      {
        name: "Ibn Umar's place, passing by",
        svg: someone(umar[0], umar[1], 1.7),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.36, 1]
          ],
          xy: [
            [0.34, 34, -2],
            [0.44, 0, 0]
          ]
        })
      },
      { name: "Ibn Umar's voice: do not take two at once", svg: arcsLeft(n(umar[0] - 3.2), n(umar[1] - 3.6), VOICE), keys: showFrom(0.5, 0.505), loop: speaking },
      { name: "he forbade it: golden arcs of his words, as Ibn Umar tells them", svg: arcsLeft(n(umar[0] - 3.4), n(umar[1] - 9.4), GOLD), keys: showWhile(0.66, 0.67, 0.75, 0.755), loop: speaking },
      { name: "the middle place's voice: may I take two?", svg: arcs(n(seats[1][0] + 3), n(seats[1][1] - 3.6), VOICE), keys: showFrom(0.83, 0.835), loop: speaking },
      { name: "permission: a warm glow about the place beside it", svg: wash(seats[2][0], n(seats[2][1] - 2), 5.2, 3.8, WARM, 0.24), keys: showFrom(0.86, 0.89), loop: soft },
      { name: "with permission: a warm glow about the middle place", svg: wash(seats[1][0], n(seats[1][1] - 2), 5.2, 3.8, WARM, 0.24), keys: showFrom(0.92, 0.95), loop: soft }
    ],
    words: [
      { text: "A year of hunger struck us", from: 0.02, to: 0.16 },
      { text: "Ibn al-Zubayr gave us dates to eat", from: 0.18, to: 0.32 },
      { text: "Ibn Umar passed by us as we ate", from: 0.34, to: 0.48 },
      { text: "Do not take two dates at once", from: 0.5, to: 0.64 },
      { text: "For he forbade taking two at once", from: 0.66, to: 0.8 },
      { text: "Unless one asks his brother's permission", from: 0.82, to: 1 }
    ]
  };
}

// The one on his right. Sahl ibn Sa'd said: a cup was brought to the Prophet ﷺ, and he drank from it. On his right was
// a boy, the youngest of those there, and the elders were on his left. He said: O boy, will you let me give it to the
// elders? He said: I will not give anyone my share from you, O Messenger of Allah. So he gave it to him (Sahih
// al-Bukhari 2351). No one is drawn: by his home, his place is a golden ring, and a cup comes to it; the drink in it
// goes down a little. A small place comes and sits on his right, with a faint ring about it, and the places of the
// elders sit on his left. His voice asks the small place, and a faint dashed way goes from the cup to the elders; the
// small place's voice answers, and the way fades; then the cup goes to the small place, and a warm glow comes about it.
function boyOnRight(): SignArt {
  const his: [number, number] = [80, 104.4];
  const cupAt: [number, number] = [84.6, 106];
  const small: [number, number] = [98, 105];
  const elders: [number, number][] = [
    [64, 105],
    [52, 105.6],
    [40, 105]
  ];
  const door: [number, number] = [78.2, 97];
  const toSmall: [number, number] = [n(small[0] + 4 - cupAt[0]), 0];
  return {
    kind: "boy-on-right",
    ms: 12000,
    parts: [
      ...dayAround([136, 20], 12000),
      ...palms([
        [14, 99, 12],
        [146, 99, 13]
      ]),
      { name: "his home", svg: home(80, 100, 28, 16) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "a cup, brought to him",
        svg: cup(cupAt[0], cupAt[1]),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: [
            [0.035, n(door[0] - cupAt[0]), n(door[1] - cupAt[1])],
            [0.08, 0, 0],
            [0.83, 0, 0],
            [0.89, toSmall[0], toSmall[1]]
          ]
        })
      },
      {
        name: "the drink in the cup",
        svg: `<ellipse cx="${cupAt[0]}" cy="${n(cupAt[1] - 3.2)}" rx="1.4" ry="0.35" fill="#FFFFFF"/>`,
        origin: { x: cupAt[0], y: n(cupAt[1] - 3.2) },
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1],
            [0.09, 1],
            [0.12, 0.55]
          ],
          xy: [
            [0.035, n(door[0] - cupAt[0]), n(door[1] - cupAt[1])],
            [0.08, 0, 0],
            [0.09, 0, 0],
            [0.12, 0, 0.8],
            [0.83, 0, 0.8],
            [0.89, toSmall[0], n(toSmall[1] + 0.8)]
          ],
          scale: [
            [0.09, 1],
            [0.12, 0.8]
          ]
        })
      },
      {
        name: "on his right: the small place, the youngest there",
        svg: someone(small[0], small[1], 1.2),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.21, 1]
          ],
          xy: [
            [0.19, 10, 0],
            [0.24, 0, 0]
          ]
        })
      },
      { name: "on his right: a faint ring about the small place", svg: faintRing(small[0], small[1], 2.6), keys: showFrom(0.25, 0.28) },
      ...elders.map(
        ([x, y], i): SignPart => ({
          name: `on his left: an elder's place ${i + 1}`,
          svg: someone(x, y, 1.7),
          keys: track({
            opacity: [
              [at3(0.35 + i * 0.01), 0],
              [at3(0.37 + i * 0.01), 1]
            ],
            xy: [
              [at3(0.35 + i * 0.01), -10, 0],
              [at3(0.4 + i * 0.01), 0, 0]
            ]
          })
        })
      ),
      { name: "his voice: may I give it to the elders?", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.49, 0.495, 0.645, 0.65), loop: speaking },
      { name: "may I give it: a faint dashed way from the cup to the elders", svg: way(`M${n(cupAt[0] - 2)} 108 Q60 110 ${n(elders[2][0] + 2)} 108`, "#FFFFFF", 0.7), keys: showWhile(0.5, 0.53, 0.68, 0.71) },
      { name: "the small place's voice: I will not give my share", svg: arcsLeft(n(small[0] - 2.6), n(small[1] - 4), VOICE), keys: showWhile(0.65, 0.655, 0.82, 0.825), loop: speaking },
      { name: "he gave it to him: a warm glow about the small place", svg: wash(small[0], n(small[1] - 2), 5.6, 4.2, WARM, 0.24), keys: showFrom(0.9, 0.94), loop: soft }
    ],
    words: [
      { text: "A cup was brought to him, and he drank", from: 0.02, to: 0.16 },
      { text: "On his right, a boy, the youngest there", from: 0.18, to: 0.32 },
      { text: "And the elders on his left", from: 0.34, to: 0.46 },
      { text: "Boy, may I give it to the elders?", from: 0.48, to: 0.62 },
      { text: "I will not give anyone my share from you", from: 0.64, to: 0.8 },
      { text: "So he gave it to him", from: 0.82, to: 1 }
    ]
  };
}

// Praise when the meal is done. Abu Umamah said that whenever the dining sheet of the Prophet ﷺ was taken away, he would
// say: praise be to Allah, much, good and blessed praise, never enough, never given up and never done without, our
// Lord (Sahih al-Bukhari 5458). No one is drawn: by his home, his place is a golden ring beside a dining sheet with a
// dish and a cup on it. The dish and the cup are gone, the sheet is rolled up, and it is taken into the home. His voice
// speaks, and a spark of praise rises; three small golden lights come one after another; a golden ring of care comes
// about his place and sparks of praise rise one after another; then a warm glow comes over his home and the land.
function afterEating(): SignArt {
  const his: [number, number] = [58, 104.4];
  const sheet: [number, number] = [82, 105.6];
  const door: [number, number] = [38.2, 97];
  return {
    kind: "after-eating",
    ms: 10000,
    parts: [
      ...dayAround([138, 20], 10000),
      ...palms([
        [10, 99, 12],
        [150, 99, 13]
      ]),
      { name: "his home", svg: home(40, 100, 28, 17) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "his dining sheet, taken away",
        svg:
          `<ellipse cx="${sheet[0]}" cy="${sheet[1]}" rx="14" ry="3.2" fill="#C99A62"/>` +
          `<ellipse cx="${sheet[0]}" cy="${sheet[1]}" rx="12.6" ry="2.5" stroke="#9C7040" stroke-width="0.4" stroke-dasharray="1 0.8" fill="none"/>`,
        origin: { x: n(sheet[0] - 14), y: sheet[1] },
        keys: track({
          opacity: [
            [0.12, 1],
            [0.18, 0]
          ],
          scaleX: [
            [0.07, 1],
            [0.11, 0.16]
          ],
          xy: [
            [0.12, 0, 0],
            [0.18, n(door[0] - (sheet[0] - 14)), n(door[1] - sheet[1])]
          ]
        })
      },
      {
        name: "the meal on the sheet: a dish",
        svg: food(n(sheet[0] - 4), n(sheet[1] - 0.2)),
        keys: track({
          opacity: [
            [0.03, 1],
            [0.06, 0]
          ]
        })
      },
      {
        name: "the meal on the sheet: a cup",
        svg: cup(n(sheet[0] + 6), n(sheet[1] + 0.8)),
        keys: track({
          opacity: [
            [0.04, 1],
            [0.07, 0]
          ]
        })
      },
      { name: "his voice: the praise", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showFrom(0.27, 0.275), loop: speaking },
      praiseSpark("praise: a spark rising", his[0], n(his[1] - 6), 0.28, 0.4),
      ...[
        [n(his[0] - 7), 95.6],
        [his[0], 92.4],
        [n(his[0] + 7), 95.6]
      ].map(([x, y], i): SignPart => ({ name: `much, good and blessed: a small golden light ${i + 1}`, svg: goldLight(x, y, 1.6), keys: showFrom(at3(0.47 + i * 0.04), at3(0.5 + i * 0.04)), loop: soft })),
      { name: "never given up: a golden ring of care about his place", svg: care(his[0], his[1], 6, 2.8), keys: showFrom(0.65, 0.69) },
      ...[0.66, 0.69, 0.72].map((from, i) => praiseSpark(`never given up: a spark of praise rising ${i + 1}`, n(his[0] - 3 + i * 3), n(his[1] - 5), from, at3(from + 0.04))),
      { name: "our Lord: a warm light in his home", svg: lightIn(43.3, 86.7, 3), keys: showFrom(0.83, 0.87), loop: soft },
      { name: "our Lord: a warm glow over the land", svg: wash(80, 100, 70, 10, WARM, 0.1), keys: showFrom(0.84, 0.9), loop: soft }
    ],
    words: [
      { text: "When his dining sheet was taken away", from: 0.02, to: 0.24 },
      { text: "He said: praise be to Allah", from: 0.26, to: 0.44 },
      { text: "Much, good and blessed praise", from: 0.46, to: 0.62 },
      { text: "Never enough, never given up", from: 0.64, to: 0.8 },
      { text: "And never done without, our Lord", from: 0.82, to: 1 }
    ]
  };
}

// A little food on one leather sheet. Salamah said: our provisions ran low on a journey, and the people were in need.
// The Messenger of Allah ﷺ said: call on the people to bring what is left of their provisions. A leather sheet was
// spread for it, and they heaped it all on the sheet. Then the Messenger of Allah ﷺ stood, asked Allah to bless it,
// and called them with their vessels, and the people took from it until they all had enough. Then he said: I bear
// witness that there is no god but Allah, and that I am the Messenger of Allah (Sahih al-Bukhari 2484). No one is
// drawn: in a camp of tents, the places of the people sit about, each with a sack that grows small. His place is a
// golden ring; his voice calls, and a faint ring comes about each sack. A leather sheet is spread out, and a little
// from each sack goes onto it. His place comes to the sheet, a spark of du'a rises, and a soft golden light comes over
// the heap. A bowl comes from each place to the sheet, and each goes back full, with a warm glow about each place.
function oneSheet(): SignArt {
  const his: [number, number] = [80, 97.6];
  const sheetAt: [number, number] = [80, 104.6];
  const places: [number, number][] = [
    [34, 104.6],
    [50, 100.6],
    [110, 100.6],
    [126, 104.6],
    [140, 99.6]
  ];
  const sackAt = ([x, y]: [number, number]): [number, number] => [n(x + 4.6), n(y + 1.4)];
  const heapSpots: [number, number][] = [
    [74, 104.4],
    [77.6, 103.6],
    [81.6, 104.6],
    [85, 103.8],
    [79.6, 105.6]
  ];
  const bowlSpots: [number, number][] = [
    [63.4, 107.4],
    [64.6, 102.8],
    [95.6, 102.4],
    [97, 107.4],
    [99.6, 104.8]
  ];
  const bowlHome = ([x, y]: [number, number]): [number, number] => [n(x - 4.4), n(y + 2)];
  return {
    kind: "one-sheet",
    ms: 12000,
    parts: [
      ...dayAround([136, 18], 12000),
      { name: "a tent of the camp 1", svg: tent(18, 97, 20, 13) },
      { name: "a tent of the camp 2", svg: tent(62, 92, 16, 10) },
      { name: "a tent of the camp 3", svg: tent(102, 92, 16, 10) },
      { name: "a tent of the camp 4", svg: tent(146, 96, 20, 13) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD), keys: track({ xy: [[0.53, 0, 0], [0.56, 0, 3]] }) },
      ...places.map((at, i): SignPart => ({ name: `the place of one of the camp ${i + 1}`, svg: someone(at[0], at[1], 1.6) })),
      ...places.map((at, i): SignPart => {
        const [x, y] = sackAt(at);
        return { name: `provisions running low: a sack ${i + 1}`, svg: sack(x, y, 0.8), origin: { x, y }, keys: track({ scale: [[at3(0.03 + i * 0.01), 1], [at3(0.07 + i * 0.01), 0.55]] }) };
      }),
      { name: "his voice: bring what is left", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.2), VOICE), keys: showWhile(0.18, 0.185, 0.35, 0.355), loop: speaking },
      ...places.map((at, i): SignPart => {
        const [x, y] = sackAt(at);
        return { name: `what is left: a faint ring about a sack ${i + 1}`, svg: faintRing(x, n(y - 2), 3.2), keys: showWhile(at3(0.2 + i * 0.01), at3(0.23 + i * 0.01), 0.4, 0.43) };
      }),
      {
        name: "a leather sheet, spread out",
        svg: `<rect x="${n(sheetAt[0] - 13)}" y="${n(sheetAt[1] - 2.6)}" width="26" height="5.8" rx="1.4" fill="#B98A57"/><rect x="${n(sheetAt[0] - 12)}" y="${n(sheetAt[1] - 1.9)}" width="24" height="4.4" rx="1" stroke="#8E6438" stroke-width="0.4" stroke-dasharray="1 0.8" fill="none"/>`,
        origin: { x: sheetAt[0], y: sheetAt[1] },
        keys: track({
          opacity: [
            [0.35, 0],
            [0.355, 1]
          ],
          scaleX: [
            [0.35, 0.1],
            [0.39, 1]
          ]
        })
      },
      ...places.map((at, i): SignPart => {
        const [sx, sy] = sackAt(at);
        const [hx, hy] = heapSpots[i];
        const go = at3(0.4 + i * 0.006);
        return {
          name: `heaped on the sheet: what was left ${i + 1}`,
          svg: leftOver(hx, hy),
          keys: track({
            opacity: [
              [go, 0],
              [at3(go + 0.005), 1]
            ],
            xy: [
              [go, n(sx - hx), n(sy - 3 - hy)],
              [at3(go + 0.03), 0, 0]
            ]
          })
        };
      }),
      { name: "his voice: a du'a", svg: arcs(n(his[0] + 3.4), n(his[1] - 1.2), VOICE), keys: showWhile(0.565, 0.57, 0.86, 0.865), loop: speaking },
      praiseSpark("his du'a: a spark rising", his[0], n(his[1] - 3), 0.57, 0.62),
      { name: "his blessing on it: a soft golden light over the heap", svg: wash(sheetAt[0], n(sheetAt[1] - 0.6), 14, 4.4, WARM, 0.26) + sparkle(sheetAt[0], n(sheetAt[1] - 3.4), 1.2, "#E8A93A"), keys: showFrom(0.58, 0.61), loop: soft },
      ...places.map((at, i): SignPart => {
        const [hx, hy] = bowlHome(at);
        const [bx, by] = bowlSpots[i];
        return {
          name: `with their vessels: a bowl ${i + 1}`,
          svg: bowl(hx, hy),
          keys: track({
            opacity: [
              [0.69, 0],
              [0.72, 1]
            ],
            xy: [
              [at3(0.72 + i * 0.008), 0, 0],
              [at3(0.745 + i * 0.008), n(bx - hx), n(by - hy)],
              [at3(0.86 + i * 0.008), n(bx - hx), n(by - hy)],
              [at3(0.89 + i * 0.008), 0, 0]
            ]
          })
        };
      }),
      ...places.map((at, i): SignPart => {
        const [hx, hy] = bowlHome(at);
        const [bx, by] = bowlSpots[i];
        return {
          name: `till all had enough: a bowl filled ${i + 1}`,
          svg: bowlFull(hx, hy),
          keys: track({
            opacity: [
              [at3(0.85 + i * 0.002), 0],
              [at3(0.855 + i * 0.002), 1]
            ],
            xy: [
              [at3(0.86 + i * 0.008), n(bx - hx), n(by - hy)],
              [at3(0.89 + i * 0.008), 0, 0]
            ]
          })
        };
      }),
      ...places.map((at, i): SignPart => ({ name: `till all had enough: a warm glow about a place ${i + 1}`, svg: wash(at[0], n(at[1] - 2), 5.2, 3.8, WARM, 0.22), keys: showFrom(at3(0.92 + i * 0.006), at3(0.93 + i * 0.006)), loop: soft }))
    ],
    words: [
      { text: "The people's provisions ran low", from: 0.02, to: 0.15 },
      { text: "Call on them to bring what is left", from: 0.17, to: 0.32 },
      { text: "It was all heaped on a leather sheet", from: 0.34, to: 0.5 },
      { text: "He stood and asked Allah to bless it", from: 0.52, to: 0.66 },
      { text: "Then he called them with their vessels", from: 0.68, to: 0.82 },
      { text: "They took from it till all had enough", from: 0.84, to: 1 }
    ]
  };
}

// Food he never found fault with. Abu Hurairah said: the Prophet ﷺ never found fault with any food. If he liked it, he
// ate it, and if not, he left it (Sahih al-Bukhari 3563). No one is drawn: in his home, his place is a golden ring at a
// cloth, and two dishes are brought to it one after the other; a calm warm glow comes about his place. The food on the
// first dish is gone, a date at a time and then the bread; the second dish goes gently aside, whole, with a faint ring
// about it.
function neverFaulted(): SignArt {
  const his: [number, number] = [64, 104];
  const first: [number, number] = [80, 106.4];
  const second: [number, number] = [96, 106.4];
  const door: [number, number] = [118.2, 98];
  const servedWay = (at: [number, number], go: number, there: number): [number, number, number][] => [
    [go, n(door[0] - at[0]), n(door[1] - at[1])],
    [there, 0, 0]
  ];
  const served = (at: [number, number], go: number, there: number) =>
    track({
      opacity: [
        [go, 0],
        [at3(go + 0.005), 1]
      ],
      xy: servedWay(at, go, there)
    });
  const dates: [number, number][] = [
    [1.6, -1.8],
    [2.7, -1.5],
    [2.2, -2.6]
  ];
  return {
    kind: "never-faulted",
    ms: 8000,
    parts: [
      ...dayAround([30, 20], 8000),
      ...palms([[150, 99, 13]]),
      { name: "his home", svg: home(120, 101, 26, 17) },
      { name: "a cloth spread for the meal", svg: cloth(70, 104, 103.8) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "a dish brought to him", svg: dish(first[0], first[1]), keys: served(first, 0.04, 0.12) },
      ...dates.map(
        ([ex, ey], i): SignPart => ({
          name: `a date on the dish ${i + 1}`,
          svg: date(n(first[0] + ex), n(first[1] + ey)),
          keys: track({
            opacity: [
              [0.04, 0],
              [0.045, 1],
              [at3(0.4 + i * 0.04), 1],
              [at3(0.405 + i * 0.04), 0]
            ],
            xy: servedWay(first, 0.04, 0.12)
          })
        })
      ),
      {
        name: "he ate it: the bread is gone",
        svg: `<ellipse cx="${n(first[0] - 0.8)}" cy="${n(first[1] - 2.2)}" rx="2.2" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.045, 1],
            [0.52, 1],
            [0.56, 0]
          ],
          xy: servedWay(first, 0.04, 0.12)
        })
      },
      {
        name: "another dish brought to him",
        svg: dish(second[0], second[1]) + `<path d="M${n(second[0] - 2.6)} ${n(second[1] - 1)} Q${second[0]} ${n(second[1] - 3.4)} ${n(second[0] + 2.6)} ${n(second[1] - 1)} Z" fill="#A9773F"/>`,
        keys: track({
          opacity: [
            [0.12, 0],
            [0.125, 1]
          ],
          xy: [
            [0.12, n(door[0] - second[0]), n(door[1] - second[1])],
            [0.2, 0, 0],
            [0.68, 0, 0],
            [0.78, 12, 1]
          ]
        })
      },
      { name: "never found fault: a calm warm glow about his place", svg: wash(his[0], n(his[1] - 2.2), 6, 4.2, WARM, 0.22), keys: showFrom(0.22, 0.27), loop: soft },
      { name: "he ate it: a warm glow about the first dish", svg: glow(first[0], n(first[1] - 1), 3.6, WARM, 0.3), keys: showFrom(0.57, 0.6), loop: soft },
      { name: "he left it: a faint ring about the other dish", svg: faintRing(n(second[0] + 12), n(second[1] - 1), 3.4), keys: showFrom(0.8, 0.83) }
    ],
    words: [
      { text: "He never found fault with any food", from: 0.02, to: 0.34 },
      { text: "If he liked it, he ate it", from: 0.36, to: 0.64 },
      { text: "And if not, he left it", from: 0.66, to: 1 }
    ]
  };
}

// A date in the street. Anas ibn Malik said that the Messenger of Allah ﷺ found a date in the street and said: if it
// were not from the charity, I would have eaten it (Sahih Muslim 1071a). No one is drawn: along a street of Madinah,
// between its homes, his place is a golden ring that goes along the way and stops by a date lying there, and a faint
// ring comes about the date. His voice speaks, and a faint dashed way goes from the date to the heap of charity dates
// by the masjid. A faint dashed way goes from the date to his place and fades; then his place goes on, and the date
// stays where it lay.
function dateInStreet(): SignArt {
  const start: [number, number] = [12, 106.4];
  const found: [number, number] = [56, 106.4];
  const dateAt: [number, number] = [66, 107];
  const charity: [number, number] = [134, 104.6];
  return {
    kind: "date-in-street",
    ms: 8000,
    parts: [
      ...dayAround([30, 18], 8000),
      ...palms([[96, 97, 12]]),
      { name: "a home along the street 1", svg: home(18, 99, 22, 15) },
      { name: "a home along the street 2", svg: home(48, 98, 20, 14, "#D8B585", "#BF9A6A") },
      { name: "a home along the street 3", svg: home(76, 99, 22, 15, "#CDAA7C", "#B38E60") },
      { name: "the masjid at the end of the street", svg: madinahMasjid(110, 99, 0.8) },
      { name: "the street", svg: `<path d="M0 103.6 L160 103.6 L160 109.6 L0 109.6 Z" fill="#D9BE8E" opacity="0.6"/>` },
      { name: "the charity: a heap of dates by the masjid", svg: basketOfDates(charity[0], charity[1]) + basketOfDates(n(charity[0] + 8), n(charity[1] + 0.6)) },
      { name: "a date in the street", svg: date(dateAt[0], dateAt[1]) },
      {
        name: "a golden ring, his place, along the street",
        svg: ring(start[0], start[1], 2.4, GOLD),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.18, n(found[0] - start[0]), 0],
            [0.78, n(found[0] - start[0]), 0],
            [0.92, n(found[0] - start[0] + 26), 0]
          ]
        })
      },
      { name: "he found it: a faint ring about the date", svg: faintRing(dateAt[0], dateAt[1], 2), keys: showFrom(0.2, 0.24) },
      {
        name: "his voice: if it were not from the charity",
        svg: arcs(n(found[0] + 3.4), n(found[1] - 4.4), VOICE),
        keys: track({
          opacity: [
            [0.33, 0],
            [0.335, 1],
            [0.76, 1],
            [0.765, 0]
          ]
        }),
        loop: speaking
      },
      { name: "from the charity: a faint dashed way from the heap to the date", svg: way(`M${n(charity[0] - 4)} 106.8 Q100 109 ${n(dateAt[0] + 2)} 108.2`, "#FFFFFF", 0.7), keys: showFrom(0.36, 0.4) },
      { name: "would have eaten it: a faint dashed way from the date to his place", svg: way(`M${n(dateAt[0] - 1.4)} 108.4 Q${n((dateAt[0] + found[0]) / 2)} 109.2 ${n(found[0] + 1)} 108.4`, "#E8B85A", 0.6), keys: showWhile(0.67, 0.7, 0.73, 0.76) }
    ],
    words: [
      { text: "He found a date in the street", from: 0.02, to: 0.3 },
      { text: "If it were not from the charity", from: 0.32, to: 0.64 },
      { text: "I would have eaten it", from: 0.66, to: 1 }
    ]
  };
}

export const TABLE_ART = {
  "seven-dates": sevenDates,
  "two-dates": twoDates,
  "boy-on-right": boyOnRight,
  "after-eating": afterEating,
  "one-sheet": oneSheet,
  "never-faulted": neverFaulted,
  "date-in-street": dateInStreet
};
