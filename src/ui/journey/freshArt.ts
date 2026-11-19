import { animalAt, cloud, glow, n, sky, type SignArt } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sparkle } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, palms, tent, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, glints, linesOn, mat, plainLand, SEVEN, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { dish } from "./worthArt";

/**
 * Fresh starts and lighter loads: the one whose fruit was lost and whose debt grew, given charity; the one who accepted
 * Islam and was told to bathe with water and sidr; the little one held up at the Hajj; the one who rode a donkey, wore
 * a plain cloak and milked the sheep, with no pride in him; the one who hears and passes it on as he heard it; and the
 * one who visits the ill and asks for his cure seven times. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or
 * a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice
 * is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes down from the
 * sky: a du'a is glints that rise, and what is good is a light, glints and a soft golden ring. No name, word or number
 * is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** Abu Sa'id al-Khudri's place and voice: an olive green. */
const KHUDRI = "#5E7A4E";
/** The place of the one in debt: a dusty red. */
const OWES = "#9A6E5E";
/** The places of those who give: a blue green. */
const GIVES = "#4E7A9A";
/** The places of those he owed: a slate. */
const OWED = "#6E6A84";
/** A debt, a weight or what is said wrongly of someone: a grey dashed ring. */
const GREYED = "#8C8C96";
/** Qais ibn Asim's place: a green. */
const QAIS = "#4E8A6E";
/** Jabir's place and voice: a slate blue. */
const JABIR = "#4E6E8E";
/** The place and voice of the one who asks, with her little one: a soft rose. */
const ASKS = "#9A6E8E";
/** Her little one's place. */
const LITTLE = "#C08A5E";
/** The places of those who travel. */
const TRAVELS = "#8A7A5E";
/** Jubayr ibn Mut'im's place and voice: a deep teal. */
const JUBAYR = "#3E6E7A";
/** Ibn Mas'ud's place and voice: a deep brown. */
const MASUD = "#7A5C3E";
/** The place of the one it is passed on to: a dusty red. */
const REACHED = "#9A6E5E";
/** Ibn Abbas's place and voice: a soft purple. */
const ABBAS = "#8A6EB0";
/** The place of the one who is ill: a pale grey blue. */
const ILL = "#8E98A6";

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** A lane along the given points, the places going along it a little above its middle. */
export const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A donkey of the picture cards, `s` times its size, with its feet at (x, y). */
const donkey = (x: number, y: number, s: number, left = false) => animalAt("donkey", n(x - 50 * s), n(y - 73 * s), s, left);

/** A silver coin, its middle at (x, y). */
const coin = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="1.1" fill="#DDE2E8" stroke="#98A2AD" stroke-width="0.35"/><circle cx="${x}" cy="${y}" r="0.55" fill="none" stroke="#B8C0C9" stroke-width="0.25"/>`;

/** A few silver coins about (x, y). */
const coins = (x: number, y: number) => coin(n(x - 1), y) + coin(n(x + 1), n(y + 0.3)) + coin(x, n(y - 0.9));

/** The same basket of dates, its fruit spoiled: dull and grey. */
const spoiled = (svg: string) => svg.replace(/#7A2E14/g, "#6A6258").replace(/#93391B/g, "#857A6A");

/** A stall of the market from x1 to x2, its feet on `foot`: two posts, an awning of cloth and a table of planks. */
const stall = (x1: number, x2: number, foot: number) =>
  `<rect x="${x1}" y="${n(foot - 18)}" width="1.2" height="18" fill="#7E6447"/><rect x="${n(x2 - 1.2)}" y="${n(foot - 18)}" width="1.2" height="18" fill="#7E6447"/>` +
  `<path d="M${n(x1 - 2)} ${n(foot - 18)} L${n(x2 + 2)} ${n(foot - 18)} L${n(x2 - 1)} ${n(foot - 23)} L${n(x1 + 1)} ${n(foot - 23)} Z" fill="#E9D3A4"/>` +
  `<path d="M${n(x1 - 2)} ${n(foot - 18)} L${n(x2 + 2)} ${n(foot - 18)}" stroke="#C9A66E" stroke-width="0.6"/>` +
  `<rect x="${n(x1 + 0.6)}" y="${n(foot - 6)}" width="${n(x2 - x1 - 1.2)}" height="1.4" fill="#9A7A52"/>` +
  `<path d="M${n(x1 + 2.4)} ${n(foot - 4.6)} L${n(x1 + 2.4)} ${foot} M${n(x2 - 2.4)} ${n(foot - 4.6)} L${n(x2 - 2.4)} ${foot}" stroke="#7E6447" stroke-width="0.8"/>`;

/** A basin of water, its foot's middle at (x, y), 14 wide. */
const basin = (x: number, y: number) =>
  `<path d="M${n(x - 7)} ${n(y - 4)} L${n(x + 7)} ${n(y - 4)} L${n(x + 6)} ${y} L${n(x - 6)} ${y} Z" fill="#A88A64"/>` +
  `<ellipse cx="${x}" cy="${n(y - 4)}" rx="7" ry="1.2" fill="#7E6447"/><ellipse cx="${x}" cy="${n(y - 4)}" rx="6.2" ry="0.9" fill="#7FB8DA"/>`;

/** A cloth hung on two poles for cover, from x1 to x2, from `top` down to `foot`. */
export const screen = (x1: number, x2: number, top: number, foot: number) =>
  `<path d="M${x1} ${foot} L${x1} ${n(top - 1)} M${x2} ${foot} L${x2} ${n(top - 1)}" stroke="#7E6447" stroke-width="0.8"/>` +
  `<path d="M${x1} ${top} L${x2} ${top} L${n(x2 - 0.4)} ${n(foot - 2)} Q${n((x1 + x2) / 2)} ${n(foot - 1.2)} ${n(x1 + 0.4)} ${n(foot - 2)} Z" fill="#E6D6B4"/>` +
  `<path d="M${n(x1 + (x2 - x1) / 3)} ${n(top + 0.6)} L${n(x1 + (x2 - x1) / 3)} ${n(foot - 1.8)} M${n(x1 + ((x2 - x1) * 2) / 3)} ${n(top + 0.6)} L${n(x1 + ((x2 - x1) * 2) / 3)} ${n(foot - 1.8)}" stroke="#CDB98E" stroke-width="0.4"/>`;

/** A small round leaf of the lote tree, its middle at (x, y). */
const leaf = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="0.8" ry="0.55" fill="#6E8F3A"/><path d="M${n(x - 0.6)} ${y} L${n(x + 0.6)} ${y}" stroke="#4E6A28" stroke-width="0.2"/>`;

/** A few leaves of the lote tree about (x, y). */
const leaves = (x: number, y: number) => leaf(n(x - 1.2), y) + leaf(n(x + 1), n(y - 0.3)) + leaf(n(x - 0.1), n(y - 0.9)) + leaf(n(x + 1.9), n(y - 0.9));

/** A wooden bowl, its foot's middle at (x, y). */
const bowl = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y - 1.8)} Q${n(x - 2.4)} ${y} ${x} ${y} Q${n(x + 2.4)} ${y} ${n(x + 2.4)} ${n(y - 1.8)} Z" fill="#B5713F"/><ellipse cx="${x}" cy="${n(y - 1.8)}" rx="2.4" ry="0.6" fill="#8A5530"/>`;

/** Milk in the bowl whose foot's middle is at (x, y). */
const milkIn = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 1.8)}" rx="2.1" ry="0.5" fill="#FBF7EC"/>`;

/** A line between two posts, from x1 to x2 at the height y. */
const clothesLine = (x1: number, x2: number, y: number) =>
  `<path d="M${x1} ${n(y + 12)} L${x1} ${n(y - 1)} M${x2} ${n(y + 12)} L${x2} ${n(y - 1)}" stroke="#7E6447" stroke-width="0.7"/>` +
  `<path d="M${x1} ${y} Q${n((x1 + x2) / 2)} ${n(y + 1)} ${x2} ${y}" stroke="#8A7A5E" stroke-width="0.35" fill="none"/>`;

/** A plain, coarse cloak, hung from its top's middle at (x, y): 8 wide and 7 long. */
const cloak = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${y} L${n(x + 4)} ${y} L${n(x + 3.4)} ${n(y + 7)} L${n(x - 3.4)} ${n(y + 7)} Z" fill="#C9B48A"/>` +
  `<path d="M${n(x - 3.7)} ${n(y + 2.4)} L${n(x + 3.7)} ${n(y + 2.4)} M${n(x - 3.5)} ${n(y + 4.8)} L${n(x + 3.5)} ${n(y + 4.8)}" stroke="#A8936A" stroke-width="0.4"/>`;

// A man deep in debt. Abu Sa'id al-Khudri said: during the time of the Messenger of Allah ﷺ, a man suffered a loss on
// fruits that he had sold, resulting in more debt. The Messenger of Allah ﷺ said: give him charity. So the people gave
// him charity, but it did not cover his debt. So the Messenger of Allah ﷺ said to his creditors: take what you have,
// and there is nothing for you but that (Jami at-Tirmidhi 655). The English page says the fruit was sold and calls
// those he owed "debtors"; in the Arabic he had bought it, and they are his creditors. So the lines leave out "that he
// had sold" and say "the man's creditors". No one is drawn: a stall of the market on the left, and the place of the one
// whose fruit it is by it; homes in the middle with the places of those who live in them; the masjid of Madinah on the
// right, and his place, a golden ring, by it. Abu Sa'id's voice tells of it. Baskets of fruit show on the stall and
// spoil, and a grey dashed ring comes about the place of the one whose fruit it is and grows: his debt. His voice
// speaks, soft and golden, and silver coins go from the places of those who give to him; the grey ring grows a little
// smaller but stays. The places of those he owed come along the road; his voice speaks again, the coins go to them, and
// they go back with what there is. A soft golden ring comes about the place of the one in debt.
function deepInDebt(): SignArt {
  const owes: [number, number] = [50, 103];
  const gave: [number, number][] = [
    [70, 101],
    [82, 99.6],
    [92, 102.4]
  ];
  const pile: [number, number][] = [
    [54.6, 104.6],
    [57.2, 105.4],
    [55.8, 106.4]
  ];
  const taken: [number, number][] = [
    [35.6, 103],
    [36.8, 104.4],
    [43.6, 105.2]
  ];
  const owed: [number, number][] = [
    [32, 105.6],
    [40, 106.8]
  ];
  const came = -46;
  const back = -26;
  const his: [number, number] = [108, 104];
  const khudri: [number, number] = [154, 106.8];
  const baskets: [number, number][] = [
    [17, 94],
    [26, 94],
    [35, 94]
  ];
  return {
    kind: "deep-in-debt",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(70, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(116, 100, 0.66) },
      { name: "homes of Madinah", svg: home(64, 98.4, 11, 7.4) + home(80, 97.6, 13, 8.4) },
      { name: "the road", svg: lane([[0, 105.4], [30, 105], [48, 104.4]]) },
      { name: "a stall of the market", svg: stall(10, 42, 100) },
      ...baskets.map(([x, y], i) => ({ name: `a basket of the fruit, fresh ${i + 1}`, svg: basketOfDates(x, y), keys: track({ opacity: [[0.144, 0], [0.152, 1], [0.17, 1], [0.2, 0]] }) })),
      ...baskets.map(([x, y], i) => ({ name: `a loss on the fruit: the same basket, spoiled ${i + 1}`, svg: spoiled(basketOfDates(x, y)), keys: track({ opacity: [[0.17, 0], [0.2, 1]] }) })),
      { name: "the place of the one whose fruit it is, then in debt", svg: someone(owes[0], owes[1], 1.5, OWES), keys: track({ opacity: [[0.29, 1], [0.31, 0.6]] }) },
      {
        name: "more debt: a grey dashed ring about its place, growing",
        svg: care(owes[0], n(owes[1] + 0.6), 4, 2, GREYED),
        origin: { x: owes[0], y: n(owes[1] + 0.6) },
        keys: track({
          opacity: [
            [0.27, 0],
            [0.28, 1]
          ],
          scale: [
            [0.28, 1],
            [0.32, 1.5],
            [0.52, 1.5],
            [0.56, 1.25]
          ]
        })
      },
      ...gave.map(([x, y], i) => ({ name: `the place of one who gives ${i + 1}`, svg: someone(x, n(y + 3), 1.5, GIVES) })),
      ...gave.map(([x, y], i) => ({
        name: `charity: silver coins from it ${i + 1}`,
        svg: coins(x, y),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.43, 1]
          ],
          xy: [
            [0.43, 0, 0],
            [0.46, n(pile[i][0] - x), n(pile[i][1] - y)],
            [0.76, n(pile[i][0] - x), n(pile[i][1] - y)],
            [0.8, n(taken[i][0] - x), n(taken[i][1] - y)],
            [0.88, n(taken[i][0] - x), n(taken[i][1] - y)],
            [0.94, n(taken[i][0] - x + back), n(taken[i][1] - y)]
          ]
        })
      })),
      ...owed.map(([x, y], i) => ({ name: `the place of one he owed ${i + 1}`, svg: someone(x, y, 1.5, OWED), keys: track({ xy: [[0.64, came, 0], [0.7, 0, 0], [0.88, 0, 0], [0.94, back, 0]] }) })),
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: give him charity", svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.4), SOFT_GOLD), keys: showFor(0.33, 0.336, 0.41, 0.416), loop: speaking },
      { name: "his voice, soft and golden: take what you have", svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.4), SOFT_GOLD), keys: showFor(0.7, 0.706, 0.826, 0.832), loop: speaking },
      { name: "a soft golden ring about the place of the one in debt", svg: care(owes[0], n(owes[1] + 0.6), 3, 1.6, SOFT_GOLD), keys: showAt(0.945, 0.96), loop: soft },
      { name: "Abu Sa'id's place", svg: someone(khudri[0], khudri[1], 1.5, KHUDRI) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcsLeft(n(khudri[0] - 2.4), n(khudri[1] - 3.2), KHUDRI), keys: showFor(0.024, 0.03, 0.094, 0.1), loop: speaking }
    ],
    words: linesOn(EIGHT, [
      "Abu Sa'id: during his time, a man",
      "Suffered a loss on fruits, resulting in",
      "More debt. He said: give him charity.",
      "So the people gave him charity,",
      "But it did not cover his debt.",
      "So he said to the man's creditors: take",
      "What you have and there is nothing for",
      "You but that."
    ])
  };
}

// Water and sidr. Qais ibn Asim said that he accepted Islam, and the Prophet ﷺ ordered him to perform ghusl with water
// and sidr (Jami at-Tirmidhi 605). No one is drawn: the masjid of Madinah on the left and his place, a golden ring, by
// it; a home on the right. Qais's place comes along the lane, and a soft golden ring comes about it: he accepts Islam.
// His voice speaks, soft and golden, and a basin of water shows. Leaves of sidr, the lote tree, are set by it on a
// small dish and go into the water. A cloth is hung for cover; Qais's place goes behind it, and glints of the water
// rise. Then it comes out, a clear soft light about it, and a soft golden ring.
function waterAndSidr(): SignArt {
  const his: [number, number] = [48, 104];
  const qais: [number, number] = [60, 104];
  const came = 88;
  const tub: [number, number] = [104, 105.6];
  const behind: [number, number] = [104, 101.6];
  const out: [number, number] = [86, 104.4];
  const dishAt: [number, number] = [117, 107.6];
  return {
    kind: "water-and-sidr",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(110, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms(
        [
          [126, 92, 7.2],
          [154, 93, 7.6]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah", svg: madinahMasjid(8, 100, 0.66) },
      { name: "a home", svg: home(130, 99, 16, 10) },
      { name: "the lane", svg: lane([[40, 103.6], [96, 103.6], [150, 103.2]]) },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: he ordered him", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.34, 0.346, 0.6, 0.606), loop: speaking },
      { name: "ghusl with water: a basin of it", svg: basin(tub[0], tub[1]), keys: showAt(0.44, 0.45) },
      { name: "glints on the water", svg: glints([[101.6, 101.4], [106.4, 101.8]], 0.7, "#E6F4FF"), keys: showAt(0.46, 0.47), loop: twinkle(900) },
      { name: "a small dish by it", svg: dish(dishAt[0], dishAt[1]), keys: showAt(0.68, 0.69) },
      { name: "sidr: leaves of the lote tree, going into the water", svg: leaves(dishAt[0], n(dishAt[1] - 1.4)), keys: track({ opacity: [[0.68, 0], [0.69, 1]], xy: [[0.7, 0, 0], [0.74, n(tub[0] - dishAt[0]), n(behind[1] + 0.2 - dishAt[1] + 1.4)]] }) },
      { name: "the water, with the sidr in it", svg: `<ellipse cx="${tub[0]}" cy="${n(tub[1] - 4)}" rx="6.2" ry="0.9" fill="#9CC47E" opacity="0.6"/>`, keys: showAt(0.74, 0.76) },
      {
        name: "Qais's place, coming, then going behind the cloth to wash, then coming out",
        svg: someone(qais[0], qais[1], 1.5, QAIS),
        keys: track({
          xy: [
            [0.03, came, 0],
            [0.16, 0, 0],
            [0.78, 0, 0],
            [0.84, n(behind[0] - qais[0]), n(behind[1] - qais[1])],
            [0.88, n(behind[0] - qais[0]), n(behind[1] - qais[1])],
            [0.92, n(out[0] - qais[0]), n(out[1] - qais[1])]
          ]
        })
      },
      { name: "he accepts Islam: a soft golden ring about Qais's place", svg: care(qais[0], n(qais[1] + 0.6), 4, 2, SOFT_GOLD), keys: showFor(0.2, 0.215, 0.76, 0.77), loop: soft },
      { name: "a cloth, hung for cover", svg: screen(95, 113, 91, 104.4), keys: showAt(0.76, 0.77) },
      { name: "washing: glints of the water rising behind it", svg: glints([[100, 89], [105, 88], [109, 89.4]], 0.8, "#E6F4FF"), keys: track({ opacity: [[0.84, 0], [0.85, 1], [0.87, 1], [0.88, 0]], xy: [[0.85, 0, 0], [0.88, 0, -3]] }) },
      { name: "fresh and clean: a clear soft light about Qais's place", svg: glow(out[0], n(out[1] - 0.6), 5, "#E6F4FF", 0.16), keys: showAt(0.92, 0.935), loop: soft },
      { name: "a soft golden ring about it", svg: care(out[0], n(out[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.95, 0.965), loop: soft }
    ],
    words: linesOn(THREE, ["Qais ibn Asim accepted Islam, and he", "Ordered him to perform ghusl with water", "And sidr."])
  };
}

// Hajj for this one. Jabir ibn Abdullah said: a woman held a boy of hers up for the Messenger of Allah ﷺ and said: O
// Messenger of Allah, is there Hajj for this one? He said: yes, and you will be rewarded (Jami at-Tirmidhi 924). No one
// is drawn: a camp of those who travel, its tents and camels, and his place, a golden ring, among them. Jabir's voice
// tells of it. The place of the one who asks comes, with the small place of her little one beside it, and her little
// one is held up. Her voice asks. His voice answers, soft and golden: a soft golden ring comes about her little one,
// who is set down again, and then a soft golden ring about her place: she will be rewarded.
function hajjForThisOne(): SignArt {
  const his: [number, number] = [86, 103.4];
  const asks: [number, number] = [72, 104.6];
  const little: [number, number] = [68, 105.6];
  const up: [number, number] = [4, -5.2];
  const came = -58;
  const jabir: [number, number] = [154, 106.8];
  const travels: [number, number][] = [
    [34, 106.2],
    [112, 105.4],
    [128, 107]
  ];
  return {
    kind: "hajj-for-this-one",
    ms: 7500,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#EEF3EA", 62) },
      { name: "the sun", svg: sun(126, 20) },
      { name: "a cloud", svg: cloud(40, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7500 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the tents of the camp", svg: tent(24, 100, 16, 10) + tent(142, 99.4, 15, 9.4, "#E9DCC0") },
      { name: "a camel of the camp, standing, no one on it", svg: camel(46, 101.6, 0.11) },
      { name: "another camel of the camp", svg: camel(122, 100.8, 0.1, true) },
      { name: "the road", svg: lane([[0, 104.6], [40, 104.8], [72, 104.6]]) },
      ...travels.map(([x, y], i) => ({ name: `the place of one who travels ${i + 1}`, svg: someone(x, y, 1.5, TRAVELS) })),
      { name: "his place, a golden ring, in the camp", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: yes", svg: arcsLeft(n(his[0] - 2.4), n(his[1] - 3.4), SOFT_GOLD), keys: showFor(0.69, 0.696, 0.85, 0.856), loop: speaking },
      { name: "the place of the one who asks, coming", svg: someone(asks[0], asks[1], 1.5, ASKS), keys: track({ xy: [[0.04, came, 0], [0.16, 0, 0]] }) },
      {
        name: "the small place of her little one, then held up",
        svg: someone(little[0], little[1], 1, LITTLE),
        keys: track({
          xy: [
            [0.04, came, 0],
            [0.16, 0, 0],
            [0.2, 0, 0],
            [0.26, up[0], up[1]],
            [0.86, up[0], up[1]],
            [0.9, 0, 0]
          ]
        })
      },
      { name: "her voice: is there Hajj for this one?", svg: arcs(n(asks[0] + 2.6), n(asks[1] - 3.2), ASKS), keys: showFor(0.4, 0.406, 0.6, 0.606), loop: speaking },
      {
        name: "yes: a soft golden ring about her little one",
        svg: care(n(little[0] + up[0]), n(little[1] + up[1] + 0.4), 2.4, 1.3, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.8, 0],
            [0.815, 1]
          ],
          xy: [
            [0.86, 0, 0],
            [0.9, -up[0], n(-up[1])]
          ]
        }),
        loop: soft
      },
      { name: "and you will be rewarded: a soft golden ring about her place", svg: care(asks[0], n(asks[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft },
      { name: "glints over them", svg: glints([[66, 100.6], [74, 100.2]]), keys: showAt(0.92, 0.935), loop: twinkle() },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.5, JABIR) },
      { name: "Jabir's voice: telling of it", svg: arcsLeft(n(jabir[0] - 2.4), n(jabir[1] - 3.2), JABIR), keys: showFor(0.024, 0.03, 0.13, 0.136), loop: speaking }
    ],
    words: linesOn(THREE, ["Jabir: a woman held a boy of hers up for", "Him and said: is there Hajj for this one?", "He said: yes, and you will be rewarded."])
  };
}

// No pride in him. Jubayr ibn Mut'im said: they told me that I was proud, while I rode a donkey, wore a cloak, and I
// milked the sheep. And the Messenger of Allah ﷺ said to me: whoever does these, then there is no pride in him (Jami
// at-Tirmidhi 2001). No one is drawn: Jubayr's home, a line with a plain cloak hung on it and a sheep; the places of
// those who said he was proud on the right, and his place, a golden ring, on the left. Jubayr's voice tells of it, and
// the voices of the others speak, quick and grey: a grey dashed ring comes about Jubayr's place. A donkey shows by the
// home, and Jubayr's place goes along the lane with it, no one on it; the plain cloak goes with Jubayr's place; it goes
// to the sheep, and a bowl under it fills with milk. His voice speaks, soft and golden: the grey ring goes, and a soft
// golden ring comes about Jubayr's place.
function noPrideInHim(): SignArt {
  const jubayr: [number, number] = [94, 104.4];
  const donkeyAt: [number, number] = [108, 106.2];
  const rode = -30;
  const sheepAt: [number, number] = [40, 105.6];
  const milked: [number, number] = [51, 106.2];
  const bowlAt: [number, number] = [45.4, 107.8];
  const lineAt: [number, number] = [66, 88.6];
  const said: [number, number][] = [
    [132, 104.6],
    [142, 106.8],
    [150, 104]
  ];
  const his: [number, number] = [16, 104.4];
  const goes: [number, number, number][] = [
    [0.25, 0, 0],
    [0.33, rode, 0],
    [0.46, rode, 0],
    [0.49, n(milked[0] - jubayr[0]), n(milked[1] - jubayr[1])]
  ];
  const wornAt: [number, number] = [n(jubayr[0] + rode + 3.6), n(jubayr[1] - 3.4)];
  return {
    kind: "no-pride-in-him",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(100, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "Jubayr's home", svg: home(100, 99, 16, 10) },
      { name: "homes of the others", svg: home(128, 98.6, 12, 8) + home(144, 99.4, 13, 8.6) },
      { name: "the lane", svg: lane([[10, 104.6], [60, 104.8], [120, 104.8]]) },
      { name: "a line by the home", svg: clothesLine(58, 74, 88) },
      {
        name: "a plain cloak, hung on it, then worn: going with his place",
        svg: cloak(lineAt[0], lineAt[1]),
        origin: { x: lineAt[0], y: lineAt[1] },
        keys: track({
          xy: [
            [0.416, 0, 0],
            [0.45, n(wornAt[0] - lineAt[0]), n(wornAt[1] - lineAt[1])],
            [0.46, n(wornAt[0] - lineAt[0]), n(wornAt[1] - lineAt[1])],
            [0.49, n(wornAt[0] - lineAt[0] + milked[0] - jubayr[0] - rode), n(wornAt[1] - lineAt[1] + milked[1] - jubayr[1])]
          ],
          scale: [
            [0.416, 1],
            [0.45, 0.5]
          ]
        })
      },
      { name: "a sheep by the home", svg: sheep(sheepAt[0], sheepAt[1], 0.09), origin: { x: sheepAt[0], y: sheepAt[1] }, loop: { move: "bob", ms: 2600, y: 0.3 } },
      { name: "a bowl under it", svg: bowl(bowlAt[0], bowlAt[1]), keys: showAt(0.495, 0.505) },
      { name: "milked: milk in the bowl", svg: milkIn(bowlAt[0], bowlAt[1]), keys: showAt(0.51, 0.55) },
      { name: "the donkey he rode, no one on it", svg: donkey(donkeyAt[0], donkeyAt[1], 0.11, true), keys: track({ opacity: [[0.216, 0], [0.226, 1]], xy: [[0.25, 0, 0], [0.33, rode, 0]] }) },
      { name: "Jubayr's place, going with it, then to the sheep", svg: someone(jubayr[0], jubayr[1], 1.5, JUBAYR), keys: track({ xy: goes }) },
      { name: "they say he is proud: a grey dashed ring about Jubayr's place", svg: care(jubayr[0], n(jubayr[1] + 0.6), 4, 2, GREYED), keys: track({ opacity: [[0.22, 0], [0.235, 1], [0.81, 1], [0.83, 0]], xy: goes }) },
      { name: "Jubayr's voice: telling of it", svg: arcsLeft(n(jubayr[0] - 2.4), n(jubayr[1] - 3.2), JUBAYR), keys: showFor(0.024, 0.03, 0.094, 0.1), loop: speaking },
      ...said.map(([x, y], i) => ({ name: `the place of one who says he is proud ${i + 1}`, svg: someone(x, y, 1.5, GREYED) })),
      { name: "their voices, quick and grey", svg: arcsLeft(n(said[0][0] - 2.4), n(said[0][1] - 3.2), GREYED) + arcsLeft(n(said[2][0] - 2.4), n(said[2][1] - 3.2), GREYED), keys: showFor(0.1, 0.106, 0.23, 0.236), loop: speaking },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: there is no pride in him", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.62, 0.626, 0.75, 0.756), loop: speaking },
      { name: "a soft golden ring about Jubayr's place", svg: care(milked[0], n(milked[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "glints over it", svg: glints([[48, 101.4], [55, 101]]), keys: showAt(0.88, 0.895), loop: twinkle() }
    ],
    words: linesOn(FIVE, ["Jubayr ibn Mut'im: they told me that I", "Was proud, while I rode a donkey, wore a", "Cloak, and I milked the sheep. And he", "Said to me: whoever does these, then", "There is no pride in him."])
  };
}

// Pass it on as you heard it. Abdullah ibn Mas'ud said: I heard the Messenger of Allah ﷺ saying: may Allah gladden a
// man who hears something from us, so he conveys it as he heard it. Perhaps the one it is conveyed to is more
// understanding than the one who heard it (Jami at-Tirmidhi 2657). No one is drawn: the masjid of Madinah on the left,
// his place, a golden ring, by it, and the places of a few sitting before it; a home far along a lane on the right,
// and the place of one by it. Ibn Mas'ud's voice tells of it. His voice speaks, soft and golden, and glints go from it
// to one of those sitting: it hears. A soft golden light comes about its place: gladness. It goes along the lane to
// the far home, its voice speaks, and the same glints go from it to the other place, just as they were. A small light
// comes about that place, then grows clear and wide: it understands more. Then a soft golden ring comes about it.
function passItOn(): SignArt {
  const his: [number, number] = [46, 103.6];
  const hears: [number, number] = [60, 106];
  const sitting: [number, number][] = [
    [56, 103.2],
    [66, 104.2],
    [68, 106.6]
  ];
  const went: [number, number] = [112, 104.6];
  const reached: [number, number] = [126, 104];
  const masud: [number, number] = [154, 106.8];
  const heard: [number, number][] = [
    [-2.6, -3.6],
    [0, -4.6],
    [2.6, -3.6]
  ];
  const fromHis = (dx: number, dy: number): [number, number] => [n(his[0] + 4 + dx * 0.6), n(his[1] - 3 + dy * 0.4)];
  return {
    kind: "pass-it-on",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(80, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[100, 92, 7]], "the way"),
      { name: "the masjid of Madinah", svg: madinahMasjid(8, 100, 0.66) },
      { name: "a home far along the lane", svg: home(132, 98, 14, 9) },
      { name: "the lane", svg: lane([[60, 105.6], [90, 105.8], [128, 104.2]]) },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: a du'a of gladness", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.14, 0.146, 0.36, 0.366), loop: speaking },
      ...sitting.map(([x, y], i) => ({ name: `the place of one sitting before it ${i + 1}`, svg: someone(x, y, 1.5, "#B49A78") })),
      { name: "the place of one who hears, then going along the lane to pass it on", svg: someone(hears[0], hears[1], 1.5, GIVES), keys: track({ xy: [[0.42, 0, 0], [0.5, n(went[0] - hears[0]), n(went[1] - hears[1])]] }) },
      {
        name: "gladness: a soft golden light about its place",
        svg: glow(hears[0], n(hears[1] - 0.6), 4.2, "#FFE7A0", 0.2),
        keys: track({
          opacity: [
            [0.3, 0],
            [0.315, 1]
          ],
          xy: [
            [0.42, 0, 0],
            [0.5, n(went[0] - hears[0]), n(went[1] - hears[1])]
          ]
        }),
        loop: soft
      },
      ...heard.map(([dx, dy], i) => {
        const [x, y] = fromHis(dx, dy);
        const at: [number, number] = [n(hears[0] + dx), n(hears[1] + dy)];
        const by: [number, number] = [n(went[0] + dx), n(went[1] + dy)];
        const to: [number, number] = [n(reached[0] + dx), n(reached[1] + dy)];
        return {
          name: `what it hears: a glint ${i + 1}, then passed on just as it was`,
          svg: sparkle(x, y, 0.9, "#FFE7A0"),
          keys: track({
            opacity: [
              [0.22, 0],
              [0.23, 1]
            ],
            xy: [
              [0.23, 0, 0],
              [0.28, n(at[0] - x), n(at[1] - y)],
              [0.42, n(at[0] - x), n(at[1] - y)],
              [0.5, n(by[0] - x), n(by[1] - y)],
              [0.52, n(by[0] - x), n(by[1] - y)],
              [0.555, n(to[0] - x), n(to[1] - y)]
            ]
          }),
          loop: twinkle(1300 + i * 200)
        };
      }),
      { name: "its voice, passing it on", svg: arcs(n(went[0] + 2.6), n(went[1] - 3.2), GIVES), keys: showFor(0.51, 0.516, 0.55, 0.556), loop: speaking },
      { name: "the place of one it is passed on to", svg: someone(reached[0], reached[1], 1.5, REACHED) },
      {
        name: "understanding: a clear light about its place, growing",
        svg: glow(reached[0], n(reached[1] - 0.6), 4, "#E6F4FF", 0.2),
        origin: { x: reached[0], y: n(reached[1] - 0.6) },
        keys: track({
          opacity: [
            [0.62, 0],
            [0.635, 1]
          ],
          scale: [
            [0.81, 1],
            [0.84, 1.7]
          ]
        }),
        loop: soft
      },
      { name: "a soft golden ring about it", svg: care(reached[0], n(reached[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft },
      { name: "Ibn Mas'ud's place", svg: someone(masud[0], masud[1], 1.5, MASUD) },
      { name: "Ibn Mas'ud's voice: telling of it", svg: arcsLeft(n(masud[0] - 2.4), n(masud[1] - 3.2), MASUD), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking }
    ],
    words: linesOn(FIVE, ["Ibn Mas'ud: I heard him saying: may Allah", "Gladden a man who hears something from", "Us, so he conveys it as he heard it.", "Perhaps the one it is conveyed to is more", "Understanding than the one who heard it."])
  };
}

// Seven times for the one who is ill. Ibn Abbas said that the Prophet ﷺ said: there is no Muslim worshiper who visits
// one who is ill, other than at the time of death, and he says seven times: I ask Allah the Magnificent, Lord of the
// Magnificent Throne, to cure you, except when he will be cured (Jami at-Tirmidhi 2083). No one is drawn, and nothing
// is drawn for the Throne: a home on the left with the place of one by it; a home on the right with the place of one
// who is ill on a mat before it, faint, a grey dashed ring about it. Ibn Abbas's voice tells of it. The place on the
// left goes along the lane to visit and stays by the one who is ill. Its voice speaks, soft, and seven glints come one
// after another; they rise. Then the grey ring goes, a clear warm light comes about the place of the one who was ill,
// and it rises from the mat: cured; a soft golden ring comes about it.
function sevenTimesForTheSick(): SignArt {
  const visits: [number, number] = [30, 104];
  const by: [number, number] = [102, 104.8];
  const ill: [number, number] = [114, 105.4];
  const up = -1.8;
  const abbas: [number, number] = [154, 106.8];
  const seven = [0, 1, 2, 3, 4, 5, 6].map((i): [number, number] => [n(by[0] - 6 + i * 2), n(by[1] - 7 - (i % 2) * 1.2)]);
  return {
    kind: "seven-times-for-the-sick",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(80, 20) },
      { name: "a cloud", svg: cloud(126, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[64, 92, 7.4]], "the lane"),
      { name: "a home on the left", svg: home(10, 99, 14, 9) },
      { name: "the home of the one who is ill", svg: home(106, 98.4, 22, 11) },
      { name: "the lane", svg: lane([[30, 103.4], [70, 104.4], [100, 104.4]]) },
      { name: "a mat before it", svg: mat(ill[0], n(ill[1] + 1.4), 10) },
      { name: "the place of the one who is ill, faint, then cured: rising from the mat", svg: someone(ill[0], ill[1], 1.5, ILL), keys: track({ opacity: [[0.886, 0.5], [0.92, 1]], xy: [[0.92, 0, 0], [0.95, 0, up]] }) },
      { name: "ill: a faint grey dashed ring about it", svg: care(ill[0], n(ill[1] + 0.6), 4, 2, GREYED), keys: track({ opacity: [[0.886, 1], [0.92, 0]] }) },
      { name: "the place of one who visits, going to it", svg: someone(visits[0], visits[1], 1.5, GIVES), keys: track({ xy: along([[visits[0], visits[1]], [70, 105.2], [by[0], by[1]]], [0.17, 0.21, 0.25]) }) },
      { name: "its voice, soft: asking for the cure", svg: arcs(n(by[0] + 2.6), n(by[1] - 3.2), "#E8A04E"), keys: showFor(0.455, 0.461, 0.8, 0.806), loop: speaking },
      ...seven.map(([x, y], i) => ({
        name: `seven times: a glint ${i + 1}, rising`,
        svg: sparkle(x, y, 0.8, "#FFE7A0"),
        keys: track({
          opacity: [
            [Math.round((0.465 + i * 0.011) * 1000) / 1000, 0],
            [Math.round((0.471 + i * 0.011) * 1000) / 1000, 1],
            [0.76, 1],
            [0.78, 0]
          ],
          xy: [
            [0.6, 0, 0],
            [0.69, 0, -10]
          ]
        }),
        loop: twinkle(1200 + i * 100)
      })),
      { name: "cured: a clear warm light about its place", svg: wash(ill[0], n(ill[1] + up - 0.4), 6, 3.4, WARM, 0.16), keys: showAt(0.9, 0.92), loop: soft },
      { name: "a soft golden ring about it", svg: care(ill[0], n(ill[1] + up + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.95, 0.965), loop: soft },
      { name: "Ibn Abbas's place", svg: someone(abbas[0], abbas[1], 1.5, ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcsLeft(n(abbas[0] - 2.4), n(abbas[1] - 3.2), ABBAS), keys: showFor(0.024, 0.03, 0.112, 0.118), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Ibn Abbas: he said: there is no Muslim",
      "Worshiper who visits one who is ill,",
      "Other than at the time of death, and he",
      "Says seven times: I ask Allah the",
      "Magnificent, Lord of the Magnificent",
      "Throne to cure you, except when he will",
      "Be cured."
    ])
  };
}

export const FRESH_ART = {
  "deep-in-debt": deepInDebt,
  "water-and-sidr": waterAndSidr,
  "hajj-for-this-one": hajjForThisOne,
  "no-pride-in-him": noPrideInHim,
  "pass-it-on": passItOn,
  "seven-times-for-the-sick": sevenTimesForTheSick
} as const;
