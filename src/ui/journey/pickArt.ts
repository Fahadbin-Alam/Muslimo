import { animalAt, glow, n, nightSky, peaks, stars, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { ring, sparkle } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { nightLand } from "./heedArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, rel, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { coins } from "./tradeArt";
import { aDay, SEVEN, voice } from "./stepsArt";

/**
 * Picks: the black fruit of the arak trees, which he ﷺ told them to pick, for it is the best; the nights when they saw
 * him ﷺ praying whenever they wished, and sleeping whenever they wished; and a gathering that talked of riches, when he
 * ﷺ said there is nothing wrong with riches for one who has piety, but good health is better. Only the land, the sky,
 * homes, trees, sheep and things are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a
 * foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the
 * circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and
 * nothing comes down from the sky: what is good is a light, glints and a soft golden ring. No name, word or number is
 * written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** Jabir's place and voice: a deep teal. */
const JABIR = "#3E7272";
/** The places and voices of the Companions picking with them: a soft brown. */
const PICKERS = "#8A6A4A";
/** Anas's place and voice, seen at night: a soft steel blue. */
const ANAS = "#9AB4D4";
/** The places and voices of the gathering: a muted olive. */
const GATHERING = "#6E7A4E";

/** The fruit of the arak tree: green, then red, then black when it is ripe. */
const GREEN_FRUIT = "#8DBA4A";
const RED_FRUIT = "#C2453A";
const BLACK_FRUIT = "#2B2233";

/**
 * An arak tree, its foot's middle at (x, y), `s` times its size: a short crooked trunk, and a wide, low crown of pale
 * green, its twigs hanging.
 */
const arakTree = (x: number, y: number, s = 1) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  const crown = (dx: number, dy: number, rx: number, ry: number, fill: string) =>
    `<ellipse cx="${n(x + dx * s)}" cy="${n(y + dy * s)}" rx="${n(rx * s)}" ry="${n(ry * s)}" fill="${fill}"/>`;
  return (
    `<path d="M${p(0, 0)} Q${p(-1, -3)} ${p(0.6, -5.6)} M${p(0.2, -3.4)} L${p(-3.4, -6)} M${p(0.4, -4.2)} L${p(4, -6.4)}" stroke="#7A5E40" stroke-width="${n(1.1 * s)}" stroke-linecap="round" fill="none"/>` +
    crown(0, -9.6, 12.4, 5.4, "#7E9E58") +
    crown(-6.4, -8.2, 6.8, 3.8, "#8CAE64") +
    crown(6.6, -8.4, 6.6, 3.8, "#749452") +
    crown(1, -12.6, 7.4, 3.6, "#94B66C") +
    `<path d="${[-10, -6.4, -2.6, 2.4, 6.2, 10].map((dx) => `M${p(dx, -5.6)} Q${p(dx + 0.4, -4)} ${p(dx, -2.6)}`).join(" ")}" stroke="#6E8E4A" stroke-width="${n(0.4 * s)}" fill="none" stroke-linecap="round"/>`
  );
};

/** How much larger than the drawing above the two arak trees near by are. */
const NEAR_TREE = 1.2;

/** Where each fruit hangs on an arak tree whose foot's middle is at (0, 0), at the size drawn above, and its color: the first six on the twigs. */
const FRUIT: [number, number, string][] = [
  [-10, -3.2, GREEN_FRUIT],
  [-6.4, -3, RED_FRUIT],
  [-2.6, -3.2, BLACK_FRUIT],
  [2.4, -3, GREEN_FRUIT],
  [6.2, -3.2, RED_FRUIT],
  [10, -3, BLACK_FRUIT],
  [-8, -7.4, BLACK_FRUIT],
  [-4, -9.6, GREEN_FRUIT],
  [0.6, -7.8, RED_FRUIT],
  [4.4, -10.4, BLACK_FRUIT],
  [8.2, -7.6, GREEN_FRUIT],
  [-1.2, -12.4, RED_FRUIT]
];

/** A fruit of the arak tree, its middle at (x, y). */
const fruit = (x: number, y: number, color: string) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="1" fill="${color}"/><circle cx="${n(x - 0.3)}" cy="${n(y - 0.3)}" r="0.28" fill="#FFFFFF" opacity="0.3"/>`;

/** A small basket, its foot's middle at (x, y). */
const basket = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${n(y - 2.6)} L${n(x + 3)} ${n(y - 2.6)} L${n(x + 2.2)} ${y} L${n(x - 2.2)} ${y} Z" fill="#B58A4E"/>` +
  `<path d="M${n(x - 2.7)} ${n(y - 1.7)} L${n(x + 2.7)} ${n(y - 1.7)} M${n(x - 2.4)} ${n(y - 0.8)} L${n(x + 2.4)} ${n(y - 0.8)}" stroke="#8E6A38" stroke-width="0.35"/>` +
  `<path d="M${n(x - 3)} ${n(y - 2.6)} L${n(x + 3)} ${n(y - 2.6)}" stroke="#8E6A38" stroke-width="0.6" stroke-linecap="round"/>`;

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y), facing left. */
const sheep = (x: number, y: number, s: number) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, true);

/** A mat of palm leaves for the prayer, its middle at (x, y), seen at night. */
const nightMat = (x: number, y: number) =>
  `<path d="M${n(x - 9)} ${n(y - 1.6)} L${n(x + 9)} ${n(y - 1.6)} L${n(x + 10.4)} ${n(y + 1.6)} L${n(x - 10.4)} ${n(y + 1.6)} Z" fill="#5E5648"/>` +
  `<path d="M${n(x - 9.5)} ${n(y - 0.5)} L${n(x + 9.5)} ${n(y - 0.5)} M${n(x - 10)} ${n(y + 0.6)} L${n(x + 10)} ${n(y + 0.6)}" stroke="#4A4438" stroke-width="0.3"/>`;

/** A spark that rises from `from` until `to`, `rise` high, stays, and fades from `fade` until `gone`. */
const sparkThenFade = (from: number, to: number, fade: number, gone: number, rise = 8): SignKeys => ({
  at: [0, from, at3(from + 0.005), to, fade, gone],
  opacity: [0, 0, 1, 1, 1, 0],
  y: [0, 0, -1, -rise, -rise, -rise]
});

// The black arak fruit. Jabir ibn Abdullah said: we were with Allah's Messenger ﷺ picking the fruits of the arak
// trees, and Allah's Messenger ﷺ said: pick the black fruit, for it is the best. The Companions asked: were you a
// shepherd? He replied: there was no prophet who was not a shepherd (Sahih al-Bukhari 3406). No one is drawn: two
// arak trees on a plain, their fruit green, red and black, with a basket at the foot of each; his place, a golden ring,
// on the left, with Jabir's place by it, and the places of two Companions by the trees. Jabir's voice tells of it, and
// a green, a red and a black fruit go from each tree into its basket, one after another: picking. His voice, soft and
// golden, speaks, and a soft light comes about the black fruit on the trees, with glints over them: the best. The
// Companions' voices ask, and sheep show far off, grazing; then his voice speaks again. No prophet is drawn, not even
// as a place.
function theBlackArakFruit(): SignArt {
  const his: [number, number] = [28, 104.6];
  const jabir: [number, number] = [42, 105.8];
  const pickers: [number, number][] = [
    [88, 105.4],
    [138, 105.8]
  ];
  const trees: [number, number][] = [
    [64, 100.6],
    [114, 100]
  ];
  const baskets: [number, number][] = [
    [53, 106.8],
    [103, 106.4]
  ];
  // A green, a red and a black fruit, picked from the twigs of each tree one after another.
  const picked = [0, 1, 2];
  const pickedWhen: [number, number][][] = [
    [
      [0.17, 0.2],
      [0.19, 0.22],
      [0.21, 0.24]
    ],
    [
      [0.18, 0.21],
      [0.2, 0.23],
      [0.22, 0.25]
    ]
  ];
  const stays = FRUIT.map((_, i) => i).filter((i) => !picked.includes(i));
  const black = stays.filter((i) => FRUIT[i][2] === BLACK_FRUIT);
  const on = ([x, y]: [number, number], i: number): [number, number] => [n(x + FRUIT[i][0] * NEAR_TREE), n(y + FRUIT[i][1] * NEAR_TREE)];
  const inBasket = ([x, y]: [number, number], k: number): [number, number] => [n(x - 1.4 + k * 1.4), n(y - 2.9)];
  return {
    kind: "the-black-arak-fruit",
    ms: 11000,
    parts: [
      ...aDay([140, 18], [56, 24]),
      { name: "arak trees far off", svg: arakTree(20, 80, 0.42) + arakTree(88, 78, 0.36) + arakTree(152, 79.4, 0.4) },
      {
        name: "sheep far off, grazing",
        svg: sheep(136, 86.6, 0.07) + sheep(147, 88, 0.07),
        keys: showAt(0.6, 0.63),
        loop: { move: "bob", ms: 1800, y: -0.3 }
      },
      ...trees.map((t, i): SignPart => ({ name: `an arak tree ${i + 1}`, svg: arakTree(t[0], t[1], NEAR_TREE) })),
      ...trees.map(
        (t, i): SignPart => ({
          name: `the best: a soft light about the black fruit of the tree ${i + 1}`,
          svg: black.map((k) => glow(...on(t, k), 2.4, "#FFE7A0", 0.12)).join(""),
          keys: showAt(0.452, 0.466),
          loop: soft
        })
      ),
      ...trees.map(
        (t, i): SignPart => ({
          name: `the fruit of the tree, green, red and black ${i + 1}`,
          svg: stays.map((k) => fruit(...on(t, k), FRUIT[k][2])).join("")
        })
      ),
      ...trees.flatMap((t, i) =>
        picked.map(
          (k, j): SignPart => ({
            name: `picking: a fruit of the tree ${i + 1}, going into its basket ${j + 1}`,
            svg: fruit(...on(t, k), FRUIT[k][2]),
            keys: track({
              xy: [
                [pickedWhen[i][j][0], 0, 0],
                [pickedWhen[i][j][1], ...rel(on(t, k), inBasket(baskets[i], j))]
              ]
            })
          })
        )
      ),
      ...baskets.map((b, i): SignPart => ({ name: `a basket under the tree ${i + 1}`, svg: basket(b[0], b[1]) })),
      ...trees.map(
        (t, i): SignPart => ({
          name: `and glints over the black fruit of the tree ${i + 1}`,
          svg: glints(
            black.map((k) => {
              const [x, y] = on(t, k);
              return [x, n(y - 2.4)];
            }),
            0.8
          ),
          keys: showAt(0.47, 0.48),
          loop: twinkle()
        })
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      {
        name: "his voice, soft and golden",
        svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD),
        keys: voice([
          [0.38, 0.53],
          [0.74, 0.96]
        ]),
        loop: speaking
      },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.8, JABIR) },
      { name: "Jabir's voice: telling of it", svg: arcs(n(jabir[0] + 2.6), n(jabir[1] - 3.4), JABIR), keys: voice([[0.02, 0.36]]), loop: speaking },
      ...pickers.map((p, i): SignPart => ({ name: `the place of one picking with them ${i + 1}`, svg: someone(p[0], p[1], 1.8, PICKERS) })),
      {
        name: "their voices: asking",
        svg: pickers.map(([x, y]) => arcs(n(x + 2.6), n(y - 3.4), PICKERS)).join(""),
        keys: voice([[0.6, 0.67]]),
        loop: speaking
      }
    ],
    words: linesOn(SEVEN, [
      "Jabir: we were with Allah's Messenger",
      "Picking the fruits of the 'Arak trees,",
      "And Allah's Messenger said: pick the",
      "Black fruit, for it is the best. The",
      "Companions asked: were you a shepherd?",
      "He replied: there was no prophet who",
      "Was not a shepherd."
    ])
  };
}

// Praying and sleeping. Anas said: every time we wanted to see the Messenger of Allah ﷺ praying at night, we saw him,
// and every time we wanted to see him sleeping, we saw him (Sunan an-Nasa'i 1627). No one is drawn: it is night over
// Madinah, with stars, the moon, dark hills and dark homes; his home, with a mat of palm leaves before it, his place on
// the mat, a golden ring, and Anas's place on the left. Anas's voice tells of it. A soft golden light comes about his
// place on the mat, and sparks rise from it: the night prayer. Then the light and the sparks go, his place goes from
// the mat to the door of his home, and a soft blue hush comes over his home: asleep. No sun is drawn, and no lamp.
function prayingAndSleeping(): SignArt {
  const homeAt: [number, number] = [98, 100];
  const mat: [number, number] = [72, 105.8];
  const his: [number, number] = [72, 104.8];
  const door: [number, number] = [n(homeAt[0] - 1.8), n(homeAt[1] + 0.4)];
  const anas: [number, number] = [12, 106.4];
  const sparks: [number, number, number, number][] = [
    [70.2, 100.4, 0.3, 0.38],
    [72, 99.4, 0.32, 0.4],
    [73.8, 100.4, 0.34, 0.42]
  ];
  return {
    kind: "praying-and-sleeping",
    ms: 8000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [14, 16],
          [36, 28],
          [56, 12],
          [92, 22],
          [106, 10],
          [146, 16],
          [72, 34]
        ]),
        loop: twinkle(2400)
      },
      { name: "the moon", svg: `${glow(126, 22, 6, "#FFF4D0", 0.12)}${crescent(126, 22, 3.4, 1.6, "#F5E9C0")}` },
      { name: "hills in the dark, far off", svg: peaks([[18, 9, 24], [50, 12, 30], [86, 8, 22], [116, 11, 28], [150, 9, 22]], 67, "#3A4263", false) },
      { name: "the land at night", svg: nightLand(62, [[18, 76], [62, 74], [124, 78], [30, 116], [140, 116]]) },
      { name: "homes of Madinah, dark", svg: home(34, 98, 14, 10, "#5A4C40", "#4E4236", "#2E2620") + home(140, 99, 16, 11, "#5A4C40", "#4E4236", "#2E2620") },
      { name: "his home", svg: home(homeAt[0], homeAt[1], 22, 13, "#6A5A4C", "#5A4C40", "#2E2620") },
      {
        name: "asleep: a soft blue hush over his home",
        svg: wash(homeAt[0], n(homeAt[1] - 6.5), 15, 9, "#7EA6E0", 0.08),
        keys: showAt(0.87, 0.89),
        loop: soft
      },
      { name: "a mat of palm leaves before his home, for the prayer", svg: nightMat(mat[0], mat[1]) },
      {
        name: "the night prayer: a soft golden light about his place on the mat",
        svg: glow(his[0], n(his[1] - 1.2), 6, "#FFE7A0", 0.11),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.3, 1],
            [0.77, 1],
            [0.79, 0]
          ]
        }),
        loop: soft
      },
      ...sparks.map(
        ([x, y, from, to], i): SignPart => ({
          name: `and a spark rising from it ${i + 1}`,
          svg: sparkle(x, y, 1.1, "#FFE7A0"),
          keys: sparkThenFade(from, to, 0.77, 0.79),
          loop: twinkle(900)
        })
      ),
      {
        name: "his place, a golden ring: on the mat, then going to the door of his home",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({
          xy: [
            [0.8, 0, 0],
            [0.85, ...rel(his, door)]
          ],
          opacity: [
            [0.84, 1],
            [0.86, 0.6]
          ]
        })
      },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.8, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 2.6), n(anas[1] - 3.4), ANAS), keys: voice([[0.02, 0.96]]), loop: speaking }
    ],
    words: linesOn(FOUR, ["Anas: every time we wanted to see the", "Messenger of Allah praying at night we", "Saw him, and every time we wanted to", "See him sleeping, we saw him."])
  };
}

// Riches with piety. Mu'adh ibn Abdullah ibn Khubaib reported from his father that his uncle said: we were sitting in a
// gathering, and the Prophet ﷺ came. Then the people talked about being rich, and he ﷺ said: there is nothing wrong
// with being rich for one who has piety, but good health for one who has piety is better than riches, and being of good
// cheer is a blessing (Sunan Ibn Majah 2141). The page says "then he spoke to the people about being rich", where the
// Arabic says that the people talked of riches at length, so the words say "Then the people talked". They leave out
// the traces of water on his head, and the words about his good cheer that day, so that the words fit. No one is
// drawn: palms of Madinah, and the places of a gathering sitting in a half ring. The voice of one who sat there tells of
// it; his place, a golden ring, comes to them; the voices of the people talk, and coins show in the middle: riches. His
// voice, soft and golden, speaks: a soft golden ring comes about the coins (nothing wrong), a soft light about their
// places (piety), then a soft green light about them, wider than the ring (good health, better than riches); then
// glints over them, and a soft golden light about his place (good cheer, a blessing).
function richesWithPiety(): SignArt {
  // The gathering sits in a ring about the coins: one who tells of it at the back on the left, the people who talk of
  // riches at the back and on the right, one more at the front, and his place comes to the left of the ring.
  const teller: [number, number] = [79, 96.6];
  const talkers: [number, number][] = [
    [96, 94.8],
    [113, 96.6],
    [122, 101.4]
  ];
  const front: [number, number] = [96, 106.2];
  const gathering = [teller, ...talkers, front];
  const wealth: [number, number] = [96, 101];
  const his: [number, number] = [70, 101.4];
  return {
    kind: "riches-with-piety",
    ms: 11000,
    parts: [
      ...aDay([28, 18], [116, 24]),
      ...palms([
        [16, 96, 12],
        [40, 88, 8],
        [132, 88, 8],
        [148, 97, 12]
      ]),
      {
        name: "piety: a soft light about their places",
        svg: gathering.map(([x, y]) => glow(x, y, 4.4, "#FFE7A0", 0.16)).join(""),
        keys: showAt(0.6, 0.62),
        loop: soft
      },
      {
        name: "good health, better than riches: a soft green light about their places",
        svg: gathering.map(([x, y]) => glow(x, y, 6.4, "#B4E39A", 0.16)).join(""),
        keys: showAt(0.74, 0.76),
        loop: soft
      },
      { name: "his good cheer: a soft golden light about his place", svg: glow(his[0], his[1], 5.6, "#FFE7A0", 0.2), keys: showAt(0.9, 0.92), loop: soft },
      { name: "riches: coins in the middle of the gathering", svg: coins(n(wealth[0] - 1.6), wealth[1], 3) + coins(n(wealth[0] + 1.8), n(wealth[1] + 0.4), 2), keys: showAt(0.31, 0.33) },
      { name: "nothing wrong: a soft golden ring about the coins", svg: care(wealth[0], n(wealth[1] - 0.6), 5.4, 3, SOFT_GOLD), keys: showAt(0.46, 0.48), loop: soft },
      {
        name: "his place, a golden ring, coming to the gathering",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({
          opacity: [
            [0.17, 0],
            [0.19, 1]
          ],
          xy: [
            [0.17, -30, 0],
            [0.25, 0, 0]
          ]
        })
      },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.36, 0.96]]), loop: speaking },
      ...gathering.map((p, i): SignPart => ({ name: `the place of one in the gathering ${i + 1}`, svg: someone(p[0], p[1], 1.8, GATHERING) })),
      { name: "the voice of one who sat there: telling of it", svg: arcsLeft(n(teller[0] - 2.6), n(teller[1] - 3.4), GATHERING), keys: voice([[0.02, 0.11]]), loop: speaking },
      {
        name: "their voices: talking of riches",
        svg: talkers.map(([x, y]) => arcs(n(x + 2.6), n(y - 3.4), GATHERING)).join(""),
        keys: voice([[0.24, 0.39]]),
        loop: speaking
      },
      {
        name: "a blessing: glints over the gathering",
        svg: glints(
          [his, ...gathering].map(([x, y]): [number, number] => [x, n(y - 4.6)]),
          1
        ),
        keys: showAt(0.88, 0.89),
        loop: twinkle()
      }
    ],
    words: linesOn(SEVEN, [
      "We were sitting in a gathering, and the",
      "Prophet came. Then the people talked",
      "About being rich. He said: there is",
      "Nothing wrong with being rich for one",
      "Who has piety, but good health for one",
      "Who has piety is better than riches, and",
      "Being of good cheer is a blessing."
    ])
  };
}

export const PICK_ART = {
  "the-black-arak-fruit": theBlackArakFruit,
  "praying-and-sleeping": prayingAndSleeping,
  "riches-with-piety": richesWithPiety
};
