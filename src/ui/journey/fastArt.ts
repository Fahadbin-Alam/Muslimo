import { cloud, glow, n, nightSky, sky, stars, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { dish } from "./worthArt";
import { cup } from "./hopeArt";
import { EVENING } from "./heartArt";
import { GREY } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, dayAround, LIGHT, lightIn, palms, sparkRising, tent, track } from "./daysArt";
import { faintRing, goldLight, goldLine, litWindow, NIGHT_OVER_LAND, NIGHT_OVER_SKY, nightLand } from "./heedArt";

/**
 * Fasting and Ramadan, drawn as the scenes of the table are (tableArt.ts): eating until the second call; toys of wool
 * on the day of Ashura; more generous than the blowing wind; fasting on a journey; not Friday on its own; fasting with
 * faith; and leaving false speech. Only the land, the sky, buildings, things, plants and camels are drawn. No Prophet,
 * no Companion and no person is ever drawn, not even a hand, a mouth or a face: where someone was, a ring or a small
 * dashed circle shows it, a voice is arcs in the air, and food that is eaten is simply gone. Nothing is drawn for
 * Allah, and no angel is drawn. Nothing comes down from the sky: a du'a or a deed is a spark that rises, and a fast is a
 * soft golden ring about its place.
 */

/** A voice twinkling as it speaks. */
const speaking = { move: "twinkle", ms: 900, low: 0.5 } as const;

/** A light twinkling softly. */
const soft = { move: "twinkle", ms: 1800, low: 0.75 } as const;

/** A date, its middle at (x, y). */
const date = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.65" fill="#7A2E14"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.25)}" rx="0.3" ry="0.15" fill="#B0563A"/>`;

/** Three dates on a dish whose middle is at (x, y), as offsets from it. */
const ON_DISH: [number, number][] = [
  [-1.5, -1.5],
  [0, -1.9],
  [1.5, -1.5]
];

/** A drink in a cup (hopeArt.ts) whose foot's middle is at (x, y): water to its brim. */
const drink = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 3.3)}" rx="1.45" ry="0.45" fill="#4F86B8"/>`;

/** A small cloth spread on the ground, from x1 to x2 at its back (y), a little wider at its front. */
const cloth = (x1: number, x2: number, y: number, fill = "#EFE0BC") =>
  `<path d="M${x1} ${y} L${x2} ${y} L${n(x2 + 2)} ${n(y + 3.2)} L${n(x1 - 2)} ${n(y + 3.2)} Z" fill="${fill}"/>`;

/** A soft golden ring on the ground about (x, y): a fast being kept. */
const fastRing = (x: number, y: number, rx = 3.4, ry = 1.8) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="#E8C25A" stroke-width="0.7" fill="#FFE07A" fill-opacity="0.16"/>`;

/** A ring of grey dashes about (x, y): something not to be done. */
const greyRing = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${GREY}" stroke-width="0.6" stroke-dasharray="1 0.9" fill="none"/>`;

/** A spark of a deed at (x, y), rising from `from` until `to`. */
const spark = (name: string, x: number, y: number, from: number, to: number): SignPart => ({
  name,
  svg: sparkle(x, y, 1.6, "#FFE7A0"),
  keys: sparkRising(from, to),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

/** A home at night, darker, its foot's middle at (x, y). */
const nightHome = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#8C7350", "#77603F", "#3A2A1C");

/** The masjid of Madinah (giveArt.ts), darkened for the night. */
const nightMasjid = (x: number, y: number, s: number) =>
  madinahMasjid(x, y, s) +
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#0F1C3A" opacity="0.45"><rect x="0" y="-15.6" width="48" height="15.6"/><path d="M-2.4 -15 L50.4 -15 L48.6 -19 L-0.6 -19 Z"/></g>`;

/** The rings of a call to prayer about (x, y), each shown from `from`, a little after the one before. */
const callRings = (label: string, x: number, y: number, from: number, hide?: [number, number]): SignPart[] =>
  [4, 7.5, 11].map((r, i) => ({
    name: `${label}, ring ${i + 1}`,
    svg: ring(x, y, r, "#FFFFFF"),
    keys: hide ? showWhile(at3(from + i * 0.015), at3(from + 0.01 + i * 0.015), hide[0], hide[1]) : showFrom(at3(from + i * 0.015), at3(from + 0.01 + i * 0.015)),
    loop: { move: "twinkle", ms: 1100, low: 0.2, phase: i / 3 }
  }));

/** Keys that hide a part quickly at `at`. */
const goneAt = (at: number): SignKeys => ({ at: [0, at, at3(at + 0.005)], opacity: [1, 1, 0] });

// Eat until the second call. Salim ibn Abdullah said that his father said that the Messenger of Allah ﷺ said: Bilal
// calls the adhan at night, so eat and drink until Ibn Umm Maktum calls the adhan. Salim said: he was a blind man, and he
// would not call until he was told: morning has come, morning has come (Sahih al-Bukhari 617). No one is drawn: at night,
// Bilal's place is on the roof of the masjid of Madinah, and the first call rings out. By two homes, the places of the
// households sit at the meal before dawn, and its dates and drink go, little by little. Ibn Umm Maktum's place waits on
// the roof, with a faint ring about it; the first light of dawn shows along the land, and a place comes from the homes to
// the masjid. Its voice speaks; the dawn spreads, the second call rings out, the meal is put away, and a soft golden
// ring comes about each place: the fast has begun.
function suhurTwoCalls(): SignArt {
  const bilal: [number, number] = [18, 81.2];
  const second: [number, number] = [40, 81.2];
  const homes: [number, number, number, number][] = [
    [100, 103, 22, 15],
    [140, 101, 20, 14]
  ];
  const dishes: [number, number][] = [
    [87, 106.2],
    [124.6, 104.6]
  ];
  const cups: [number, number][] = [
    [91.6, 106.8],
    [129.2, 105.2]
  ];
  const sitting: [number, number][] = [
    [77.4, 105.4],
    [98.4, 106.4],
    [115, 104],
    [136, 105]
  ];
  // When each date is eaten: the first home, then the second, in turn.
  const eaten = [
    [0.215, 0.255, 0.42],
    [0.235, 0.275, 0.45]
  ];
  const drunk = [0.295, 0.31];
  const teller: [number, number] = [104, 107];
  const tellerTo: [number, number] = [56, 104.6];
  return {
    kind: "suhur-two-calls",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars of the night",
        svg: stars([
          [12, 16],
          [34, 26],
          [58, 14],
          [86, 22],
          [112, 14],
          [136, 24],
          [152, 40],
          [24, 44],
          [70, 38],
          [124, 46]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the sky growing pale at dawn",
        svg: `<rect y="40" width="160" height="22" fill="#4F6196"/><rect y="52" width="160" height="10" fill="#9C8FA8"/>`,
        keys: track({
          opacity: [
            [0.8, 0],
            [0.86, 0.7]
          ]
        })
      },
      { name: "hills in the dark", svg: hills("#26304E") },
      {
        name: "the first light of dawn, along the land far off",
        svg: wash(118, 61.6, 40, 3.4, "#F6E7C8", 0.3),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.66, 0.5],
            [0.8, 0.5],
            [0.86, 1]
          ]
        })
      },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [14, 112],
          [64, 70],
          [110, 72],
          [150, 114]
        ])
      },
      { name: "the masjid of Madinah, at night", svg: nightMasjid(6, 100, 0.9) },
      { name: "a lamp's light at the door of the masjid", svg: glow(27.6, 97.2, 4, "#FFD866", 0.2), loop: soft },
      ...homes.map(([x, y, w, h], i): SignPart => ({ name: `a home ${i + 1}, at night`, svg: nightHome(x, y, w, h) })),
      ...homes.map(([x, y, , h], i): SignPart => ({ name: `a lit window in home ${i + 1}`, svg: litWindow(x, y, h), loop: soft })),
      { name: "Bilal's place, on the roof of the masjid", svg: someone(bilal[0], bilal[1], 1.5, LIGHT) },
      { name: "Bilal's voice: the call at night", svg: arcs(n(bilal[0] + 3.2), n(bilal[1] - 3.6), LIGHT), keys: showWhile(0.03, 0.035, 0.2, 0.205), loop: speaking },
      ...callRings("the call at night", bilal[0], 73, 0.03, [0.2, 0.205]),
      { name: "Ibn Umm Maktum's place, on the roof of the masjid", svg: someone(second[0], second[1], 1.5, LIGHT) },
      { name: "waiting: a faint ring about Ibn Umm Maktum's place", svg: faintRing(second[0], n(second[1] - 0.2), 3.2), keys: showWhile(0.39, 0.42, 0.85, 0.855) },
      ...homes.map(([x, y], i): SignPart => ({ name: `the meal before dawn, by home ${i + 1}: a cloth`, svg: cloth(n(dishes[i][0] - 6), n(cups[i][0] + 3), n(y + 1.4)), keys: goneAt(0.9) })),
      ...dishes.map(([x, y], i): SignPart => ({ name: `the meal before dawn, by home ${i + 1}: a dish`, svg: dish(x, y), keys: goneAt(0.9) })),
      ...dishes.flatMap(([x, y], i) =>
        ON_DISH.map(([dx, dy], j): SignPart => ({ name: `eat: a date on the dish by home ${i + 1}, ${j + 1}`, svg: date(n(x + dx), n(y + dy)), keys: goneAt(eaten[i][j]) }))
      ),
      ...cups.map(([x, y], i): SignPart => ({ name: `drink: a cup by home ${i + 1}`, svg: cup(x, y), keys: goneAt(0.9) })),
      ...cups.map(([x, y], i): SignPart => ({ name: `drink: the water in the cup by home ${i + 1}`, svg: drink(x, y), keys: goneAt(drunk[i]) })),
      ...sitting.map(([x, y], i): SignPart => ({ name: `a place of the households at the meal ${i + 1}`, svg: someone(x, y, 1.6, LIGHT) })),
      {
        name: "the one who tells him: a place going to the masjid",
        svg: someone(teller[0], teller[1], 1.6, LIGHT),
        keys: track({
          opacity: [
            [0.59, 0],
            [0.6, 1]
          ],
          xy: [
            [0.6, 0, 0],
            [0.7, n(tellerTo[0] - teller[0]), n(tellerTo[1] - teller[1])]
          ]
        })
      },
      { name: "its voice: morning has come, morning has come", svg: arcsLeft(n(tellerTo[0] - 3.2), n(tellerTo[1] - 4), LIGHT), keys: showWhile(0.79, 0.795, 0.85, 0.855), loop: speaking },
      { name: "Ibn Umm Maktum's voice: the second call", svg: arcs(n(second[0] + 3.2), n(second[1] - 3.6), LIGHT), keys: showFrom(0.86, 0.865), loop: speaking },
      ...callRings("the second call, at dawn", second[0], 73, 0.86),
      ...sitting.map(([x, y], i): SignPart => ({ name: `the fast has begun: a soft golden ring about a place ${i + 1}`, svg: fastRing(x, n(y + 0.4), 3.2, 1.7), keys: showFrom(0.91, 0.93), loop: soft }))
    ],
    words: [
      { text: "Bilal calls the adhan at night", from: 0.02, to: 0.18 },
      { text: "So eat and drink", from: 0.2, to: 0.36 },
      { text: "Until Ibn Umm Maktum calls the adhan", from: 0.38, to: 0.56 },
      { text: "He would not call until he was told", from: 0.58, to: 0.76 },
      { text: "Morning has come, morning has come", from: 0.78, to: 1 }
    ]
  };
}

/** A toy of wool: a soft round ball of dyed wool with a loose strand, its middle at (x, y). */
const woolToy = (x: number, y: number, fill: string, line: string) =>
  `<circle cx="${x}" cy="${y}" r="1.5" fill="${fill}"/>` +
  `<path d="M${n(x - 1.1)} ${n(y - 0.5)} Q${x} ${n(y - 1.4)} ${n(x + 1.1)} ${n(y - 0.5)} M${n(x - 1.2)} ${n(y + 0.4)} Q${x} ${n(y - 0.4)} ${n(x + 1.2)} ${n(y + 0.4)} M${n(x + 1.3)} ${n(y + 0.6)} q1.2 0.6 2.2 0.1" stroke="${line}" stroke-width="0.35" fill="none"/>`;

// Toys of wool. Ar-Rubayyi' bint Mu'awwidh said: on the morning of Ashura, the Prophet ﷺ sent word to the villages of
// the Ansar: whoever woke up not fasting, let him complete the rest of his day, and whoever woke up fasting, let him
// fast. She said: so we used to fast it after that, and make our little ones fast, and we made toys of wool for them;
// when one of them cried for food, we gave him that, until it was time to break the fast (Sahih al-Bukhari 1960). No one
// is drawn: in the morning, his place is a golden ring at the door of the masjid of Madinah, and a place goes along a
// golden way to the villages of the Ansar, among their palms; its voice speaks there. A soft golden ring comes about the
// places of the villages, and then about their small places: their fast. The sun climbs; toys of wool show by the elder
// places; one small place cries for food, a toy goes to it, and a warm glow comes about the two. The sun sets, the sky
// grows warm, and dates and a cup come by each home: the time to break the fast.
function woolToys(): SignArt {
  const his: [number, number] = [21.3, 103.6];
  const word: [number, number] = [28, 104.4];
  const wordTo: [number, number] = [92, 105.6];
  const elders: [number, number][] = [
    [116, 104.8],
    [140, 104]
  ];
  const little: [number, number][] = [
    [106.4, 107.2],
    [130.6, 106.4]
  ];
  const toys: [number, number][] = [
    [120.6, 106.8],
    [144.4, 106]
  ];
  const toyTo: [number, number] = [109.4, 107.4];
  const iftar: [number, number][] = [
    [100.6, 105.6],
    [124.2, 104.8]
  ];
  return {
    kind: "wool-toys",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the evening sky",
        svg: EVENING,
        keys: track({
          opacity: [
            [0.87, 0],
            [0.93, 0.9]
          ]
        })
      },
      {
        name: "the sun, going over the day",
        svg: sun(24, 40),
        keys: track({
          xy: [
            [0.43, 0, 0],
            [0.49, 56, -22],
            [0.87, 56, -22],
            [0.93, 120, 12]
          ]
        })
      },
      { name: "clouds", svg: cloud(52, 30, 0.55, "#FFFFFF", 0.9) + cloud(110, 24, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.72) },
      { name: "a golden ring, his place at the door of the masjid", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "the way to the villages of the Ansar", svg: way(`M${n(word[0] + 2)} ${n(word[1] + 1)} Q60 109 ${n(wordTo[0] - 2)} ${n(wordTo[1] + 0.6)}`, "#FFF0C4", 1), keys: showFrom(0.14, 0.16) },
      ...palms(
        [
          [98, 92, 12],
          [124, 86, 11],
          [152, 90, 11]
        ],
        "the villages of the Ansar"
      ),
      { name: "a home of the villages of the Ansar 1", svg: home(110, 101, 18, 12) },
      { name: "a home of the villages of the Ansar 2", svg: home(136, 99, 16, 11, "#D8B585", "#BF9A6A") },
      {
        name: "his word, going to the villages: a place",
        svg: someone(word[0], word[1], 1.6),
        keys: track({
          opacity: [
            [0.14, 0],
            [0.15, 1]
          ],
          xy: [
            [0.15, 0, 0],
            [0.21, n(wordTo[0] - word[0]), n(wordTo[1] - word[1])]
          ]
        })
      },
      { name: "his word at the villages: a voice", svg: arcs(n(wordTo[0] + 3), n(wordTo[1] - 4.2), VOICE), keys: showWhile(0.29, 0.295, 0.42, 0.425), loop: speaking },
      ...elders.map(([x, y], i): SignPart => ({ name: `a place of the villages ${i + 1}`, svg: someone(x, y, 1.7) })),
      ...little.map(([x, y], i): SignPart => ({ name: `a small place of their little ones ${i + 1}`, svg: someone(x, y, 1.1) })),
      ...elders.map(([x, y], i): SignPart => ({ name: `whoever woke up fasting: a soft golden ring about a place ${i + 1}`, svg: fastRing(x, n(y + 0.4)), keys: showFrom(0.31, 0.34), loop: soft })),
      ...little.map(([x, y], i): SignPart => ({
        name: `their little ones fasting: a soft golden ring about a small place ${i + 1}`,
        svg: fastRing(x, n(y + 0.3), 2.4, 1.3),
        keys: showFrom(0.44, 0.47),
        loop: soft
      })),
      {
        name: "a toy of wool 1",
        svg: woolToy(toys[0][0], toys[0][1], "#D8574A", "#F4B2A8"),
        keys: track({
          opacity: [
            [0.57, 0],
            [0.6, 1]
          ],
          xy: [
            [0.72, 0, 0],
            [0.76, n(toyTo[0] - toys[0][0]), n(toyTo[1] - toys[0][1])]
          ]
        })
      },
      { name: "a toy of wool 2", svg: woolToy(toys[1][0], toys[1][1], "#4A86C8", "#B8D4F0"), keys: showFrom(0.58, 0.61) },
      { name: "a small place's voice: crying for food", svg: arcsLeft(n(little[0][0] - 2.4), n(little[0][1] - 3.2), "#7C93A8"), keys: showWhile(0.71, 0.715, 0.76, 0.765), loop: speaking },
      { name: "playing: a warm glow about the small place and its toy", svg: wash(n(little[0][0] + 1.4), n(little[0][1] - 1.2), 5.2, 2.8, WARM, 0.24), keys: showFrom(0.765, 0.79), loop: soft },
      ...iftar.map(([x, y], i): SignPart => ({ name: `time to break the fast: a dish of dates by home ${i + 1}`, svg: dish(x, y) + ON_DISH.map(([dx, dy]) => date(n(x + dx), n(y + dy))).join(""), keys: showFrom(0.9, 0.92) })),
      ...iftar.map(([x, y], i): SignPart => ({ name: `time to break the fast: a cup by home ${i + 1}`, svg: cup(n(x + 4.4), n(y + 0.6)) + drink(n(x + 4.4), n(y + 0.6)), keys: showFrom(0.9, 0.92) })),
      { name: "breaking the fast: a warm glow over the villages", svg: wash(124, 102, 30, 6, WARM, 0.16), keys: showFrom(0.91, 0.94), loop: soft },
      spark("breaking the fast: a spark rising", 118, 98, 0.9, 0.95)
    ],
    words: [
      { text: "On the morning of Ashura", from: 0.02, to: 0.13 },
      { text: "He sent word to the villages of the Ansar", from: 0.14, to: 0.26 },
      { text: "Whoever woke up fasting, let him fast", from: 0.28, to: 0.4 },
      { text: "We fasted, and made our little ones fast", from: 0.42, to: 0.54 },
      { text: "We made them toys of wool", from: 0.56, to: 0.68 },
      { text: "If one cried for food, we gave him the toy", from: 0.7, to: 0.84 },
      { text: "Until it was time to break the fast", from: 0.86, to: 1 }
    ]
  };
}

/** A gust of wind from (x, y), `w` long: a long stroke with a curled end. */
const gust = (x: number, y: number, w: number) =>
  `<path d="M${x} ${y} C${n(x + w * 0.3)} ${n(y - 3)} ${n(x + w * 0.6)} ${n(y + 2)} ${n(x + w)} ${n(y - 1)} C${n(x + w + 4)} ${n(y - 3)} ${n(x + w + 2)} ${n(y - 7)} ${n(x + w - 2)} ${n(y - 5)}" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.9"/>`;

/** The nights of a month, five small lights in a group from (x, y), each 3.6 apart. */
const fiveNights = (x: number, y: number) =>
  [0, 1, 2, 3, 4].map((i) => `<circle cx="${n(x + i * 3.6)}" cy="${y}" r="0.8" fill="#FFF3C0"/><circle cx="${n(x + i * 3.6)}" cy="${y}" r="1.8" fill="#FFF3C0" opacity="0.18"/>`).join("");

// More generous than the blowing wind. Ibn Abbas said: the Prophet ﷺ was the most generous of people with good, and he
// was most generous of all in Ramadan, when Jibril met him; Jibril would meet him every night of Ramadan until it ended,
// and the Prophet ﷺ would recite the Quran to him; and when Jibril met him, he was more generous with good than the wind
// sent out (Sahih al-Bukhari 1902). No one is drawn, and no angel is drawn: by day, his place is a golden ring at the
// door of his home, and a sack goes from it to a home in need, where a warm light comes. Night falls, the new moon of
// Ramadan shows, and his window is lit; small lights come in the sky, five by five, for the nights of the month. Golden
// arcs come from his home as he recites the Quran. Then the day comes, and the wind blows across the land: gifts go out
// from his home on it to every home, a warm light comes in each, and a warm glow over them all.
function generousWind(): SignArt {
  const his: [number, number] = [36.2, 103.6];
  const homes: [number, number, number, number][] = [
    [92, 102, 18, 12],
    [118, 97, 16, 11],
    [144, 102, 18, 13]
  ];
  const doors = homes.map(([x, y]): [number, number] => [n(x - 1.8), n(y - 3)]);
  // A gift goes from his door to the door of home `i`, from `go` for 0.06.
  const gift = (i: number, go: number, name: string, svg: string): SignPart => ({
    name,
    svg,
    keys: track({
      opacity: [
        [go, 0],
        [at3(go + 0.005), 1]
      ],
      xy: [
        [at3(go + 0.005), 0, 0],
        [at3(go + 0.06), n(doors[i][0] - his[0] - 3), n(doors[i][1] - his[1] + 4.4)]
      ]
    })
  });
  return {
    kind: "generous-wind",
    ms: 12000,
    parts: [
      ...dayAround([24, 22], 12000),
      {
        name: "night over the sky",
        svg: NIGHT_OVER_SKY,
        keys: track({
          opacity: [
            [0.19, 0],
            [0.24, 1],
            [0.69, 1],
            [0.74, 0]
          ]
        })
      },
      { name: "the new moon of Ramadan", svg: glow(132, 30, 6, "#FFF6D8", 0.12) + crescent(132, 30, 3.2, 1.4, "#FFF6D8"), keys: showWhile(0.22, 0.25, 0.69, 0.72) },
      {
        name: "stars of the night",
        svg: stars([
          [14, 30],
          [50, 40],
          [76, 32],
          [104, 42],
          [150, 34],
          [118, 52]
        ]),
        keys: showWhile(0.23, 0.26, 0.69, 0.72),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      ...[0, 1, 2, 3, 4, 5].map(
        (i): SignPart => ({
          name: `every night of Ramadan: small lights, five by five ${i + 1}`,
          svg: fiveNights(n(24 + i * 19.6), n(15 + (i % 2) * 1.6)),
          keys: showWhile(at3(0.35 + i * 0.015), at3(0.355 + i * 0.015), 0.69, 0.72),
          loop: { move: "twinkle", ms: 2000, low: 0.7, phase: i / 6 }
        })
      ),
      ...palms([
        [64, 96, 12],
        [132, 90, 11]
      ]),
      { name: "his home", svg: home(40, 100, 26, 16) },
      ...homes.map(([x, y, w, h], i): SignPart => ({ name: `a home of Madinah ${i + 1}`, svg: home(x, y, w, h, i % 2 ? "#D8B585" : "#D3A872", i % 2 ? "#BF9A6A" : "#BC9060") })),
      {
        name: "night over the land",
        svg: NIGHT_OVER_LAND,
        keys: track({
          opacity: [
            [0.19, 0],
            [0.24, 1],
            [0.69, 1],
            [0.74, 0]
          ]
        })
      },
      { name: "a lit window in his home", svg: litWindow(40, 100, 16), keys: showWhile(0.24, 0.27, 0.69, 0.72), loop: soft },
      { name: "a golden ring, his place at his door", svg: ring(his[0], his[1], 2.4, GOLD) },
      gift(0, 0.03, "the most generous: a sack going to a home", sack(his[0] + 3, his[1] - 4.4, 0.8)),
      { name: "the most generous: a warm light in the home it reached", svg: lightIn(doors[0][0], doors[0][1], 4), keys: showFrom(0.09, 0.11), loop: soft },
      { name: "his voice: reciting the Quran, golden arcs", svg: arcs(n(his[0] + 3.4), n(his[1] - 6), GOLD), keys: showWhile(0.53, 0.535, 0.69, 0.695), loop: speaking },
      { name: "reciting: a soft light at his door", svg: wash(his[0], n(his[1] - 4), 6, 5, WARM, 0.2), keys: showWhile(0.54, 0.58, 0.69, 0.72), loop: soft },
      {
        name: "the blowing wind: gusts across the land",
        svg: gust(10, 76, 30) + gust(64, 84, 26) + gust(112, 72, 28),
        keys: showFrom(0.7, 0.72),
        loop: { move: "slide", ms: 3000 }
      },
      {
        name: "the blowing wind: gusts higher up",
        svg: gust(30, 66, 24) + gust(96, 64, 22),
        keys: showFrom(0.72, 0.74),
        loop: { move: "slide", ms: 3800 }
      },
      gift(1, 0.74, "more generous than the wind: dates going to a home", `<g>${date(his[0] + 2, his[1] - 4.2)}${date(his[0] + 3.6, his[1] - 4.6)}${date(his[0] + 4.4, his[1] - 3.6)}</g>`),
      gift(2, 0.78, "more generous than the wind: a sack going to a home", sack(his[0] + 3, his[1] - 4.4, 0.8)),
      ...[0.8, 0.84].map(
        (from, i): SignPart => ({ name: `more generous than the wind: a warm light in a home ${i + 1}`, svg: lightIn(doors[i + 1][0], doors[i + 1][1], 4), keys: showFrom(from, at3(from + 0.02)), loop: soft })
      ),
      { name: "with good for all: a warm glow over the homes", svg: wash(104, 96, 50, 12, WARM, 0.14), keys: showFrom(0.88, 0.92), loop: soft }
    ],
    words: [
      { text: "He was the most generous of people", from: 0.02, to: 0.16 },
      { text: "And most generous in Ramadan", from: 0.18, to: 0.32 },
      { text: "Jibril met him every night of Ramadan", from: 0.34, to: 0.5 },
      { text: "He recited the Quran to him", from: 0.52, to: 0.66 },
      { text: "More generous than the blowing wind", from: 0.68, to: 1 }
    ]
  };
}

// Fasting on a journey. Aishah said that Hamzah ibn Amr al-Aslami, who fasted much, said to the Prophet ﷺ: shall I
// fast on a journey? He ﷺ said: fast if you wish, and do not fast if you wish (Sahih al-Bukhari 1943). Anas ibn Malik
// said: we used to travel with the Prophet ﷺ, and the one fasting did not blame the one not fasting, nor the one not
// fasting the one fasting (Sahih al-Bukhari 1947). No one is drawn, and no one rides: on a road through the desert, his
// place is a golden ring, with the places of those with him and two camels. Hamzah's place asks, and his voice answers;
// a soft golden ring and a cup show over the place that asked, both warm. They go on along the road to a camp among
// palms. There two places keep their fast, with a soft golden ring about each, and two eat dates and drink; a warm
// dashed way goes from the fasting to the others, and then from them back, and a warm glow and a golden ring of care
// come about them all.
function fastOnAJourney(): SignArt {
  const walk = (from: number): SignKeys =>
    track({
      xy: [
        [from, 0, 0],
        [at3(from + 0.06), 40, 0]
      ]
    });
  const his: [number, number] = [50, 104.8];
  const hamzah: [number, number] = [60, 105.4];
  const others: [number, number][] = [
    [68, 104.6],
    [76, 105.6],
    [84, 104.6]
  ];
  const after = ([x, y]: [number, number]): [number, number] => [x + 40, y];
  const fasting = [after(hamzah), after(others[0])];
  const eating = [after(others[1]), after(others[2])];
  return {
    kind: "fast-on-a-journey",
    ms: 12000,
    parts: [
      ...dayAround([128, 20], 12000),
      { name: "the road through the desert", svg: `<path d="M0 101.4 Q80 99 160 101.4 L160 108.6 Q80 106 0 108.6 Z" fill="#E8D3A6"/>` },
      ...palms([
        [132, 94, 12],
        [152, 92, 12]
      ]),
      { name: "a tent of the camp", svg: tent(142, 99, 14, 9) },
      { name: "a camel of the journey 1", svg: camel(22, 105, 0.15), keys: walk(0.39) },
      { name: "a camel of the journey 2", svg: camel(37, 105.6, 0.15), keys: walk(0.39) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD), keys: walk(0.39) },
      { name: "Hamzah's place", svg: someone(hamzah[0], hamzah[1], 1.7), keys: walk(0.39) },
      ...others.map(([x, y], i): SignPart => ({ name: `a place of those with him ${i + 1}`, svg: someone(x, y, 1.7), keys: walk(0.39) })),
      { name: "Hamzah's voice: shall I fast on a journey?", svg: arcs(n(hamzah[0] + 3.2), n(hamzah[1] - 4.2), VOICE), keys: showWhile(0.03, 0.035, 0.18, 0.185), loop: speaking },
      { name: "his voice: fast if you wish, or do not", svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 4.2), VOICE), keys: showWhile(0.19, 0.195, 0.38, 0.385), loop: speaking },
      { name: "if you wish, fast: a soft golden ring", svg: fastRing(n(hamzah[0] - 3.4), 94.6, 2.8, 1.5), keys: showWhile(0.22, 0.25, 0.39, 0.4), loop: soft },
      { name: "if you wish, do not: a cup", svg: cup(n(hamzah[0] + 3.4), 96) + drink(n(hamzah[0] + 3.4), 96), keys: showWhile(0.23, 0.26, 0.39, 0.4) },
      { name: "either, as he wishes: a warm glow over the two", svg: wash(hamzah[0], 94.4, 8, 3.6, WARM, 0.2), keys: showWhile(0.26, 0.29, 0.39, 0.4), loop: soft },
      ...fasting.map(([x, y], i): SignPart => ({ name: `the one fasting: a soft golden ring about a place ${i + 1}`, svg: fastRing(x, n(y + 0.4)), keys: showFrom(0.53, 0.56), loop: soft })),
      ...eating.map(([x, y], i): SignPart => ({
        name: `the one not fasting: dates and a cup by a place ${i + 1}`,
        svg: [-1.6, 0, 1.6].map((dx) => date(n(x + dx - 0.4), n(y + 2.2))).join("") + cup(n(x + 3.4), n(y + 2.6)) + drink(n(x + 3.4), n(y + 2.6)),
        keys: showFrom(0.54, 0.57)
      })),
      { name: "no blame: a warm dashed way from the fasting to the others", svg: way(`M${n(fasting[1][0] + 2.4)} ${n(fasting[1][1] - 2.6)} Q${n((fasting[1][0] + eating[0][0]) / 2)} 96.6 ${n(eating[0][0] - 2.4)} ${n(eating[0][1] - 2.6)}`, WARM, 0.9), keys: showFrom(0.6, 0.63) },
      { name: "nor any blame back: a warm dashed way from the others to the fasting", svg: way(`M${n(eating[1][0])} ${n(eating[1][1] - 3)} Q${n((fasting[0][0] + eating[1][0]) / 2)} 92 ${n(fasting[0][0])} ${n(fasting[0][1] - 3)}`, WARM, 0.9), keys: showFrom(0.79, 0.82) },
      { name: "together on the journey: a warm glow over them all", svg: wash(112, 102, 22, 7, WARM, 0.2), keys: showFrom(0.84, 0.88), loop: soft },
      { name: "together: a golden ring of care about them all", svg: care(108, 105, 22, 3.8), keys: showFrom(0.86, 0.9) }
    ],
    words: [
      { text: "Shall I fast on a journey?", from: 0.02, to: 0.16 },
      { text: "Fast if you wish, or do not if you wish", from: 0.18, to: 0.36 },
      { text: "We traveled with him", from: 0.38, to: 0.5 },
      { text: "One fasting did not blame one not fasting", from: 0.52, to: 0.74 },
      { text: "Nor one not fasting blame one fasting", from: 0.76, to: 1 }
    ]
  };
}

/** A day of the week: a small light tile with a sun over a line of land, its foot's middle at (x, y). */
const dayTile = (x: number, y: number) =>
  `<rect x="${n(x - 7)}" y="${n(y - 18)}" width="14" height="18" rx="2.4" fill="#FFF7E2" stroke="#D9C49A" stroke-width="0.6"/>` +
  `<path d="M${n(x - 5.6)} ${n(y - 5)} L${n(x + 5.6)} ${n(y - 5)}" stroke="#C9B38C" stroke-width="0.6"/>` +
  `<circle cx="${x}" cy="${n(y - 11.4)}" r="2.4" fill="#FFE07A"/>`;

/** A little dome and minaret standing on the land of a day's tile whose foot's middle is at (x, y): Friday. */
const fridayDome = (x: number, y: number) =>
  `<rect x="${n(x - 3.4)}" y="${n(y - 8.2)}" width="6" height="3.2" fill="#EFE2C2"/>` +
  `<path d="M${n(x - 2.4)} ${n(y - 8.2)} Q${n(x - 0.4)} ${n(y - 11.6)} ${n(x + 1.6)} ${n(y - 8.2)} Z" fill="#7FB07A"/>` +
  `<rect x="${n(x + 3.2)}" y="${n(y - 12)}" width="1" height="7" fill="#E6D6B2"/><path d="M${n(x + 3.1)} ${n(y - 12)} L${n(x + 3.7)} ${n(y - 13)} L${n(x + 4.3)} ${n(y - 12)} Z" fill="#7FB07A"/>`;

/** A dashed ring about a day's tile whose foot's middle is at (x, y), `pad` out from it. */
const aboutDay = (x: number, y: number, pad: number, color: string, width = 0.9) =>
  `<rect x="${n(x - 7 - pad)}" y="${n(y - 18 - pad)}" width="${n(14 + pad * 2)}" height="${n(18 + pad * 2)}" rx="${n(2.4 + pad)}" stroke="${color}" stroke-width="${width}" stroke-dasharray="1.6 1.2" fill="none"/>`;

// Not Friday on its own. Muhammad ibn Abbad said: I asked Jabir: did the Prophet ﷺ forbid fasting on Friday? He said:
// yes (Sahih al-Bukhari 1984). Abu Hurairah said: I heard the Prophet ﷺ say: none of you should fast on Friday, unless
// with a day before it or after it (Sahih al-Bukhari 1985). No one is drawn: the seven days of a week stand in a row,
// each a small tile with its sun, and Friday's has a little masjid on it. A place asks and another answers. A soft
// golden ring comes about Friday, a fast on it, and a grey dashed ring about it: not on its own. Then a golden ring comes
// about the day before it, a golden line joins the two, and the grey ring goes; then that day's ring and the line go,
// and a golden ring comes about the day after it, a golden line joins those two, and a warm glow over them.
function fridayAlone(): SignArt {
  const days = [20, 40, 60, 80, 100, 120, 140];
  const y = 88;
  const [before, friday, after] = [days[4], days[5], days[6]];
  const asker: [number, number] = [16, 104.6];
  const asked: [number, number] = [28, 104.6];
  return {
    kind: "friday-alone",
    ms: 10000,
    parts: [
      ...dayAround([136, 22], 10000),
      ...days.map((x, i): SignPart => ({ name: `the days of the week: a day ${i + 1}`, svg: dayTile(x, y) })),
      { name: "Friday: a little masjid on its day", svg: fridayDome(friday, y) },
      { name: "Friday: a soft light about its day", svg: wash(friday, n(y - 9), 9, 11, WARM, 0.12), loop: soft },
      { name: "the place of the one who asks", svg: someone(asker[0], asker[1], 1.7) },
      { name: "the place of the one asked", svg: someone(asked[0], asked[1], 1.7) },
      { name: "the one who asks: a voice", svg: arcs(n(asker[0] - 1.6), n(asker[1] - 4.2), VOICE), keys: showWhile(0.03, 0.035, 0.1, 0.105), loop: speaking },
      { name: "the one asked: a voice: yes", svg: arcs(n(asked[0] + 3.2), n(asked[1] - 4.2), VOICE), keys: showWhile(0.11, 0.115, 0.26, 0.265), loop: speaking },
      { name: "a fast on Friday: a soft golden ring about its day", svg: aboutDay(friday, y, 1.4, "#E8C25A"), keys: showFrom(0.27, 0.3), loop: soft },
      { name: "on its own: a grey dashed ring about it", svg: aboutDay(friday, y, 3, GREY, 0.7), keys: showWhile(0.33, 0.36, 0.55, 0.58) },
      { name: "a day before it: a soft golden ring about its day", svg: aboutDay(before, y, 1.4, "#E8C25A"), keys: showWhile(0.49, 0.52, 0.75, 0.78), loop: soft },
      { name: "joined: a golden line from the day before to Friday", svg: goldLine(before, friday, 92.6), keys: showWhile(0.53, 0.56, 0.75, 0.78) },
      { name: "a day after it: a soft golden ring about its day", svg: aboutDay(after, y, 1.4, "#E8C25A"), keys: showFrom(0.79, 0.82), loop: soft },
      { name: "joined: a golden line from Friday to the day after", svg: goldLine(friday, after, 92.6), keys: showFrom(0.83, 0.86) },
      { name: "two days together: a warm glow over them", svg: wash(130, n(y - 9), 22, 12, WARM, 0.14), keys: showFrom(0.87, 0.9), loop: soft }
    ],
    words: [
      { text: "Did he forbid fasting on Friday? Yes", from: 0.02, to: 0.24 },
      { text: "None of you should fast on Friday", from: 0.26, to: 0.46 },
      { text: "Unless with a day before it", from: 0.48, to: 0.72 },
      { text: "Or a day after it", from: 0.74, to: 1 }
    ]
  };
}

/** A grey shade in the air about (x, y): a sin, drawn as a dim haze. */
const shade = (x: number, y: number) => wash(x, y, 3.8, 2.4, "#5C6F7A", 0.17) + `<ellipse cx="${x}" cy="${y}" rx="1.4" ry="1" fill="#5C6F7A" opacity="0.22"/>`;

/** A dusk sky: blue above, warm low down over the hills, and the land's light below. */
const DUSK =
  `<rect width="160" height="120" fill="#DDF1FC"/><rect width="160" height="62" fill="#6F7FB4"/><rect y="24" width="160" height="38" fill="#A98FB0"/>` +
  `<rect y="40" width="160" height="22" fill="#E2A98E"/><rect y="52" width="160" height="10" fill="#F7D3A8"/>`;

// Fasting with faith. Abu Hurairah said that the Messenger of Allah ﷺ said: whoever fasts Ramadan out of faith and
// hoping for its reward, his past sins are forgiven (Sahih al-Bukhari 38). No one is drawn: in the evening, the new
// moon of Ramadan is in the sky, and the place of one who fasts is by its home, with grey shades about it: its past
// sins. The days of the month come as small lights, five by five. A golden ring comes about the place: faith; and a small
// golden light above it: hoping for the reward. Then the grey shades go, one by one, a warm glow comes about the place,
// and a spark rises.
function fastWithFaith(): SignArt {
  const place: [number, number] = [74, 104.6];
  const shades: [number, number][] = [
    [66.4, 100.4],
    [81.8, 99.8],
    [69.4, 95.2],
    [79, 94.6],
    [74.2, 98.4]
  ];
  return {
    kind: "fast-with-faith",
    ms: 10000,
    parts: [
      { name: "the dusk sky", svg: DUSK },
      { name: "the new moon of Ramadan", svg: glow(28, 24, 6, "#FFF6D8", 0.14) + crescent(28, 24, 3.2, 1.4, "#FFF6D8") },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [36, 96, 12],
        [130, 94, 12]
      ]),
      { name: "a home", svg: home(88, 101, 22, 15) },
      ...[0, 1, 2, 3, 4, 5].map(
        (i): SignPart => ({
          name: `the days of Ramadan: small lights, five by five ${i + 1}`,
          svg: fiveNights(n(46 + i * 18.6), n(15.4 + (i % 2) * 1.4)),
          keys: showFrom(at3(0.03 + i * 0.025), at3(0.04 + i * 0.025)),
          loop: { move: "twinkle", ms: 2000, low: 0.7, phase: i / 6 }
        })
      ),
      { name: "the place of one who fasts", svg: someone(place[0], place[1], 1.8) },
      { name: "fasting Ramadan: a soft golden ring about the place", svg: fastRing(place[0], n(place[1] + 0.4)), keys: showFrom(0.06, 0.09), loop: soft },
      ...shades.map(([x, y], i): SignPart => ({
        name: `past sins: a grey shade ${i + 1}`,
        svg: shade(x, y),
        keys: { at: [0, at3(0.71 + i * 0.03), at3(0.73 + i * 0.03)], opacity: [1, 1, 0] },
        loop: { move: "bob", ms: 2600 + i * 300, y: -0.7, phase: i / 5 }
      })),
      { name: "out of faith: a golden ring about the place", svg: care(place[0], n(place[1] + 0.4), 6.4, 3.2), keys: showFrom(0.27, 0.31) },
      { name: "hoping for its reward: a small golden light above the place", svg: goldLight(place[0], 90.4), keys: showFrom(0.47, 0.51), loop: soft },
      { name: "forgiven: a warm glow about the place", svg: wash(place[0], n(place[1] - 3), 10, 7, WARM, 0.24), keys: showFrom(0.87, 0.9), loop: soft },
      spark("forgiven: a spark rising", n(place[0] + 4), 98, 0.88, 0.94)
    ],
    words: [
      { text: "Whoever fasts Ramadan", from: 0.02, to: 0.24 },
      { text: "Out of faith", from: 0.26, to: 0.44 },
      { text: "And hoping for its reward", from: 0.46, to: 0.68 },
      { text: "His past sins are forgiven", from: 0.7, to: 1 }
    ]
  };
}

// Leaving false speech. Abu Hurairah said that the Messenger of Allah ﷺ said: whoever does not leave false speech and
// acting on it, Allah has no need of his leaving his food and drink (Sahih al-Bukhari 1903). No one is drawn: by a home,
// the place of one who fasts sits with its food and drink left beside it, and a soft golden ring about them: its fast.
// Harsh grey arcs come from the place: false speech; then a grey dashed way goes from it to the place next door, and a
// grey shade comes over that place: acting on it. The soft golden ring about the food and drink fades, and a faint grey
// ring comes about them: no need of it.
function falseSpeech(): SignArt {
  const place: [number, number] = [56, 104.6];
  const next: [number, number] = [108, 104.6];
  const left: [number, number] = [42.4, 106.4];
  const cupAt: [number, number] = [48, 106.8];
  return {
    kind: "false-speech",
    ms: 10000,
    parts: [
      ...dayAround([136, 20], 10000),
      ...palms([
        [22, 96, 12],
        [140, 94, 12]
      ]),
      { name: "his home", svg: home(44, 100, 22, 15) },
      { name: "the home next door", svg: home(116, 100, 22, 15, "#D8B585", "#BF9A6A") },
      { name: "his food, left: a dish of dates", svg: dish(left[0], left[1]) + ON_DISH.map(([dx, dy]) => date(n(left[0] + dx), n(left[1] + dy))).join("") },
      { name: "his drink, left: a cup", svg: cup(cupAt[0], cupAt[1]) + drink(cupAt[0], cupAt[1]) },
      {
        name: "his fast: a soft golden ring about his food and drink",
        svg: fastRing(45, 106.2, 6.6, 2.4),
        keys: track({
          opacity: [
            [0.49, 1],
            [0.55, 0]
          ]
        }),
        loop: soft
      },
      { name: "the place of one who fasts", svg: someone(place[0], place[1], 1.8) },
      { name: "the place next door", svg: someone(next[0], next[1], 1.8) },
      { name: "false speech: harsh grey arcs", svg: arcs(n(place[0] + 3.2), n(place[1] - 4.4), GREY), keys: showFrom(0.03, 0.04), loop: speaking },
      { name: "acting on it: a grey dashed way to the place next door", svg: way(`M${n(place[0] + 2.6)} ${n(place[1] + 1)} Q82 109 ${n(next[0] - 2.6)} ${n(next[1] + 1)}`, GREY, 0.9), keys: showFrom(0.29, 0.33) },
      { name: "acting on it: a grey shade over the place next door", svg: wash(next[0], n(next[1] - 1.4), 6, 4.4, "#5C6F7A", 0.16), keys: showFrom(0.34, 0.38) },
      { name: "no need of it: a faint grey ring about his food and drink", svg: greyRing(45, 105.6, 7.6, 3.2), keys: showFrom(0.69, 0.73) }
    ],
    words: [
      { text: "Whoever does not leave false speech", from: 0.02, to: 0.26 },
      { text: "And acting on it", from: 0.28, to: 0.46 },
      { text: "Allah has no need", from: 0.48, to: 0.66 },
      { text: "That he leave his food and drink", from: 0.68, to: 1 }
    ]
  };
}

export const FAST_ART = {
  "suhur-two-calls": suhurTwoCalls,
  "wool-toys": woolToys,
  "generous-wind": generousWind,
  "fast-on-a-journey": fastOnAJourney,
  "friday-alone": fridayAlone,
  "fast-with-faith": fastWithFaith,
  "false-speech": falseSpeech
};
