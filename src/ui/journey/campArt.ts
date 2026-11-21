import { n, stars, type SignArt, type SignPart } from "./signDraw";
import { ring } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM } from "./worshipArt";
import { DAWN, palms, tent, track } from "./daysArt";
import { soft, spark, speaking } from "./fastArt";
import { restingCamel, road, showAt, SOFT_GOLD } from "./roadArt";
import { big, glints, linesOn, SEVEN, SIX, twinkle } from "./shareArt";
import { aDay, voice } from "./stepsArt";
import { farHills, FIVE } from "./wideArt";
import { NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";
import { loaded } from "./historyArt";

/**
 * More of his ﷺ teaching in Sunan Abi Dawud: the one who stood in the sun while he spoke, moved into the shade; the
 * butter and dates he liked, offered him on a visit; camping close together, not scattered in the glens; and the
 * blessing in the early mornings, when Sakhr sent off his goods. Only the land, the sky, homes, tents, things, plants
 * and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth
 * or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a
 * voice is arcs in the air. No one is drawn on an animal. Nothing is drawn for Allah, and nothing comes down from the
 * sky: a du'a is a spark that rises. No name, word or number is written.
 */

/** Qays's place and voice: a steel blue. */
const QAYS = "#5E7E9A";
/** The place of the one who came, Qays's father: a clay red. */
const WHO_CAME = "#B5683E";

/** A shelter of palm fronds laid on palm trunks, from x `l` to `r`, the foot of its roof at y `top`, its trunks' feet on y. */
const shelter = (l: number, r: number, top: number, y: number) =>
  [l + 4, (l + r) / 2, r - 4]
    .map(
      (x) =>
        `<rect x="${n(x - 1.3)}" y="${top}" width="2.6" height="${n(y - top)}" fill="#8A6440"/>` +
        `<path d="M${n(x - 1.3)} ${n(top + 7)} L${n(x + 1.3)} ${n(top + 7)} M${n(x - 1.3)} ${n(top + 15)} L${n(x + 1.3)} ${n(top + 15)}" stroke="#6E4E30" stroke-width="0.5"/>`
    )
    .join("") +
  `<path d="M${n(l - 4)} ${top} L${n(r + 4)} ${top} L${n(r + 1)} ${n(top - 5)} L${n(l - 1)} ${n(top - 5)} Z" fill="#8E9A52"/>` +
  Array.from({ length: Math.floor((r - l + 6) / 4) }, (_, i) => {
    const x = n(l - 2 + i * 4);
    return `<path d="M${x} ${n(top - 4.6)} L${n(x + 2.6)} ${n(top + 1.6)}" stroke="#6E7A3A" stroke-width="0.7" stroke-linecap="round"/>`;
  }).join("");

/** The shade on the ground under the shelter, from x `l` to `r`, about y. */
const shadeUnder = (l: number, r: number, y: number) =>
  `<path d="M${n(l - 2)} ${n(y - 5)} L${n(r + 2)} ${n(y - 5)} L${n(r + 7)} ${n(y + 5)} L${n(l + 3)} ${n(y + 5)} Z" fill="#4A3E2A" opacity="0.26"/>`;

// Into the shade. Qays said that his father came while the Messenger of Allah ﷺ was addressing, and stood in the sun;
// he ordered him, and he shifted to the shade (Sunan Abi Dawud 4822). The lines say "Qays's father" where the page says
// "he", and "He gave an order" for "He ordered him (to shift)", so "he" and "him" are only ever the Prophet ﷺ. No one is
// drawn: under a shelter of palm fronds on palm trunks is its shade, with his ﷺ place, a golden ring, and his voice,
// soft and golden, speaks to the people. Only once it is said that Qays's father stood in the sun does his place come,
// and stop out in the open, the sun's warmth about it. Once it is said that he shifted to the shade, his place goes in
// under the shelter, into its shade, and the warmth goes.
function intoTheShade(): SignArt {
  const qays: [number, number] = [10, 108.4];
  const [l, r, top, feet] = [98, 152, 76, 104];
  const his: [number, number] = [140, 105.4];
  const stood: [number, number] = [56, 104.6];
  const shaded: [number, number] = [114, 104.2];
  return {
    kind: "into-the-shade",
    ms: 9000,
    parts: [
      ...aDay([40, 38], [92, 26]),
      ...palms([[24, 92, 13], [8, 90, 10]], "the land"),
      { name: "the shade under the shelter", svg: shadeUnder(l, r, feet + 1) },
      { name: "a shelter of palm fronds on palm trunks", svg: shelter(l, r, top, feet) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden: addressing", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.216, 0.98]]), loop: speaking },
      {
        name: "the sun's warmth about the place of the one who came",
        svg: `<ellipse cx="${stood[0]}" cy="${n(stood[1] + 0.6)}" rx="6.6" ry="2.8" fill="${WARM}" opacity="0.55"/>` + glints([[n(stood[0] - 4.6), n(stood[1] - 4.4)], [n(stood[0] + 4.4), n(stood[1] - 5.2)], [stood[0], n(stood[1] - 7.4)]], 1),
        keys: track({ opacity: [[0.5, 0], [0.53, 1], [0.81, 1], [0.86, 0]] }),
        loop: soft
      },
      {
        name: "the place of the one who came: coming to stand in the sun, then shifting into the shade",
        svg: someone(stood[0], stood[1], 1.7, WHO_CAME),
        keys: track({
          xy: [
            [0.42, -66, -2],
            [0.52, 0, 0],
            [0.81, 0, 0],
            [0.92, n(shaded[0] - stood[0]), n(shaded[1] - stood[1])]
          ],
          opacity: [
            [0.42, 0],
            [0.44, 1]
          ]
        })
      },
      { name: "Qays's place", svg: someone(qays[0], qays[1], 1.7, QAYS) },
      { name: "Qays's voice: telling of it", svg: arcs(n(qays[0] + 2.6), n(qays[1] - 3.4), QAYS), keys: voice([[0.02, 0.164]]), loop: speaking }
    ],
    words: linesOn(FIVE, ["Qays's father came when the Messenger", "Of Allah was addressing.", "Qays's father stood in the sun.", "He gave an order, and Qays's father", "Shifted to the shade."])
  };
}

/** Abdullah ibn Busr's place and voice: a rust brown, as in creaturesArt. */
const IBN_BUSR = "#A0643A";
/** The place of one of his family at home: a dusty green. */
const AT_HOME = "#7A8A6E";

/** A cloth spread on the ground, its middle at (x, y), with a bowl of butter and a plate of dates on it. */
const butterAndDatesOn = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="11.4" ry="2.9" fill="#B5523A"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="9.8" ry="2.2" stroke="#E2B85A" stroke-width="0.5" stroke-dasharray="1 1" fill="none"/>` +
  `<path d="M${n(x - 8.8)} ${n(y - 1)} Q${n(x - 8.8)} ${n(y - 4.8)} ${n(x - 4.8)} ${n(y - 4.8)} Q${n(x - 0.8)} ${n(y - 4.8)} ${n(x - 0.8)} ${n(y - 1)} Z" fill="#B87A48"/>` +
  `<ellipse cx="${n(x - 4.8)}" cy="${n(y - 4.8)}" rx="4" ry="1" fill="#8E5A30"/>` +
  `<path d="M${n(x - 7.8)} ${n(y - 5)} Q${n(x - 4.8)} ${n(y - 8)} ${n(x - 1.8)} ${n(y - 5)} Z" fill="#F6E7A6"/>` +
  `<ellipse cx="${n(x + 4.8)}" cy="${n(y - 1.4)}" rx="5" ry="1.4" fill="#DCCBA4"/>` +
  [
    [2.4, -2.2],
    [4.6, -2.6],
    [6.8, -2.2],
    [3.5, -3.5],
    [5.7, -3.5],
    [4.6, -4.6]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="1.15" ry="0.72" fill="#7A3418"/>`)
    .join("");

// Butter and dates. Abdullah ibn Busr said: the Messenger of Allah ﷺ came to visit us, and we offered him butter and
// dates, for he liked butter and dates (Sunan Abi Dawud 3837). No one is drawn: by a home are the places of those who
// live in it, Ibn Busr's among them, and his voice tells of it. His ﷺ place, a golden ring, comes along the way to the
// home. Only once it is said what they offered him do a cloth, a bowl of butter and a plate of dates show before him;
// once it is said that he liked butter and dates, golden glints show over them.
function butterAndDates(): SignArt {
  const home0: [number, number] = [116, 102];
  const busr: [number, number] = [100, 106.6];
  const one: [number, number] = [132, 106.8];
  const his: [number, number] = [14, 106.4];
  const there: [number, number] = [70, 106.6];
  const cloth: [number, number] = [85, 106];
  return {
    kind: "butter-and-dates",
    ms: 9000,
    parts: [
      ...aDay([138, 22], [46, 28]),
      ...palms([[152, 97, 18]], "the land"),
      { name: "the way to the home", svg: road(0, 96, 107.4) },
      { name: "a home", svg: home(home0[0], home0[1], 46, 28) },
      { name: "the place of one of the family at home", svg: someone(one[0], one[1], 1.7, AT_HOME) },
      { name: "a cloth spread, with a bowl of butter and a plate of dates", svg: big(butterAndDatesOn(cloth[0], cloth[1]), cloth[0], cloth[1], 1.5), keys: showAt(0.62, 0.66) },
      {
        name: "golden glints over the butter and dates",
        svg: glints([[n(cloth[0] - 7), n(cloth[1] - 15)], [n(cloth[0] + 7), n(cloth[1] - 13)], [cloth[0], n(cloth[1] - 19)]], 1.4),
        keys: showAt(0.82, 0.85),
        loop: twinkle()
      },
      {
        name: "his place, a golden ring: coming to visit",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({ xy: [[0.23, 0, 0], [0.36, n(there[0] - his[0]), n(there[1] - his[1])]] })
      },
      { name: "Ibn Busr's place", svg: someone(busr[0], busr[1], 1.7, IBN_BUSR) },
      { name: "Ibn Busr's voice: telling of it", svg: arcs(n(busr[0] + 2.6), n(busr[1] - 3.4), IBN_BUSR), keys: voice([[0.02, 0.98]]), loop: speaking }
    ],
    words: linesOn(FIVE, ["Abdullah ibn Busr: the Messenger", "Of Allah came to visit us,", "And we offered him", "Butter and dates,", "For he liked butter and dates."])
  };
}

/** Abu Tha'labah al-Khushani's place and voice: a mauve. */
const ABU_THALABAH = "#8A5E7A";

/** Low rounded hills, each [x of its foot's middle, height, half width], their feet on `base`, every other one a little darker. */
const roundHills = (list: [number, number, number][], base: number) =>
  list
    .map(
      ([x, h, w], i) =>
        `<path d="M${n(x - w)} ${base} C${n(x - w * 0.5)} ${n(base - h * 1.3)} ${n(x + w * 0.5)} ${n(base - h * 1.3)} ${n(x + w)} ${base} Z" fill="${i % 2 ? "#B49668" : "#C2A676"}"/>`
    )
    .join("");

/** Dry wadi beds of pale sand, winding down from the glens between the hills, wider toward the front of the land. */
const wadis = [
  [30, 86, 25, 94, 35, 101, 27, 114],
  [80, 86, 85, 95, 74, 102, 82, 114],
  [130, 86, 125, 95, 137, 101, 133, 114]
]
  .map(([x0, y0, x1, y1, x2, y2, x3, y3]) => {
    const edge = (dx0: number, dx3: number) => `M${n(x0 + dx0)} ${y0} C${n(x1 + dx0 * 1.6)} ${y1} ${n(x2 + dx3 * 0.8)} ${y2} ${n(x3 + dx3)} ${y3}`;
    const back = (dx0: number, dx3: number) => `L${n(x3 + dx3)} ${y3} C${n(x2 + dx3 * 0.8)} ${y2} ${n(x1 + dx0 * 1.6)} ${y1} ${n(x0 + dx0)} ${y0} Z`;
    return `<path d="${edge(-1.2, -4.2)} ${back(1.2, 4.2)}" fill="#D9C396"/>`;
  })
  .join("");

// Camp close together. Abu Tha'labah al-Khushani said: when the people encamped, they scattered in the glens and wadis.
// The Messenger of Allah ﷺ said: your scattering in these glens and wadis is only of the devil. After that, whenever they
// encamped, they kept close together, so that it used to be said: if a cloth were spread over them, it would cover them
// all (Sunan Abi Dawud 2628). The lines take the page's first telling, "when the people encamped", leave out the
// narrator's note in parentheses, and stop before the cloth, which was only said. Nothing is drawn for the devil. No one
// is drawn: among hills, with glens between them and wadis winding down, are his ﷺ place, a golden ring, and camels
// resting. Only once it is said where they scattered do the tents show, far apart, in the glens and down the wadis. His
// voice, soft and golden, speaks; once it is said that they kept close together, the tents come in close about his
// place.
function campCloseTogether(): SignArt {
  const abu: [number, number] = [150, 108.4];
  const his: [number, number] = [80, 106];
  const s: [number, number] = [11, 8.4];
  const tents: [number, number, number, number][] = [
    [30, 92, 66, 103.6],
    [130, 92, 94, 103.6],
    [14, 104.4, 72, 98.6],
    [146, 104.4, 88, 98.6]
  ];
  return {
    kind: "camp-close-together",
    ms: 11000,
    parts: [
      ...aDay([136, 22], [52, 26]),
      { name: "hills about the glens", svg: roundHills([[8, 13, 30], [56, 18, 27], [104, 14, 27], [152, 19, 30]], 86) },
      { name: "the wadis winding down", svg: wadis },
      { name: "camels resting", svg: restingCamel(46, 109, 0.56) + restingCamel(114, 109, 0.56) },
      ...tents.map(
        ([x, y, cx, cy], i): SignPart => ({
          name: `a tent ${i + 1}: scattered, then close together`,
          svg: tent(x, y, s[0], s[1]),
          keys: track({
            opacity: [
              [0.31 + i * 0.02, 0],
              [0.33 + i * 0.02, 1]
            ],
            xy: [
              [0.75, 0, 0],
              [0.83, n(cx - x), n(cy - y)]
            ]
          })
        })
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.452, 0.704]]), loop: speaking },
      { name: "Abu Tha'labah's place", svg: someone(abu[0], abu[1], 1.7, ABU_THALABAH) },
      { name: "Abu Tha'labah's voice: telling of it", svg: arcsLeft(n(abu[0] - 2.6), n(abu[1] - 3.4), ABU_THALABAH), keys: voice([[0.02, 0.39], [0.74, 0.98]]), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Abu Tha'labah al-Khushani: when the",
      "People encamped, they scattered in",
      "The glens and wadis. He said:",
      "Your scattering in these glens and",
      "Wadis is only of the devil.",
      "They afterwards kept close together",
      "When they encamped."
    ])
  };
}

/** Sakhr al-Ghamidi's place and voice: an ochre. */
const SAKHR = "#9A7A3E";

/** Goods heaped by a home, their feet on y, from x: bales and sacks of trade. */
const goodsHeaped = (x: number, y: number) =>
  [
    [0, 0, 9, 6, "#C8A274"],
    [10, 0, 9, 6, "#B58D5E"],
    [20, 0, 9, 6, "#C8A274"],
    [5, -6, 9, 6, "#B58D5E"],
    [15, -6, 9, 6, "#C8A274"],
    [10, -12, 9, 6, "#B58D5E"]
  ]
    .map(
      ([dx, dy, w, h, fill]) =>
        `<rect x="${n(x + (dx as number))}" y="${n(y + (dy as number) - (h as number))}" width="${w}" height="${h}" rx="1.6" fill="${fill}"/>` +
        `<path d="M${n(x + (dx as number) + 4.5)} ${n(y + (dy as number) - (h as number))} L${n(x + (dx as number) + 4.5)} ${n(y + (dy as number))}" stroke="#8C6A44" stroke-width="0.6"/>`
    )
    .join("");

// Blessed early mornings. Sakhr al-Ghamidi said: the Prophet ﷺ said: O Allah, bless my people in their early mornings.
// Sakhr was a merchant, and he would send off his merchandise at the beginning of the day; and he became rich and had
// much wealth (Sunan Abi Dawud 2606). The lines leave out the detachments and armies he sent out at the start of the day,
// and say "would send off merchandise" and "became rich" without "he" or "his", which are only ever the Prophet ﷺ. No one
// is drawn: it is night, with its stars. Sakhr's voice begins it, and his ﷺ voice, soft and golden, speaks from his
// place, a golden ring, and a spark of the du'a rises. Once he says "in their early mornings", the night goes, the dawn
// comes and the sun rises. By Sakhr's home stand his laden camels; once it is said that he sent off his merchandise at
// the beginning of the day, they go off along the way, no one on them. Once it is said that he became rich, goods are
// heaped by his home, and glints show over them.
function blessedEarlyMornings(): SignArt {
  const sakhr: [number, number] = [52, 107];
  const his: [number, number] = [20, 106.4];
  const home0: [number, number] = [64, 102];
  const camels = [80, 112];
  const cs = 0.3;
  return {
    kind: "blessed-early-mornings",
    ms: 10000,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      {
        name: "the sun, rising",
        svg: sun(128, 58),
        keys: track({
          xy: [
            [0.36, 0, 8],
            [0.44, 0, 0]
          ],
          opacity: [
            [0.36, 0],
            [0.4, 1]
          ]
        }),
        clip: { x: 0, y: 0, w: 160, h: 62 }
      },
      { name: "hills at dawn", svg: farHills().replace(/#CDB892/g, "#8D7E68") },
      { name: "the land at dawn", svg: landOf([[14, 112], [64, 116], [110, 113], [148, 115]], "#C4AC84") + `<rect y="61" width="160" height="59" fill="#2E3D6E" opacity="0.12"/>` },
      { name: "the way", svg: road(70, 160, 106.6, "#D6C094") },
      { name: "Sakhr's home", svg: home(home0[0], home0[1], 34, 24) },
      { name: "the night, before the dawn", svg: NIGHT_OVER_SKY + NIGHT_OVER_LAND, keys: track({ opacity: [[0.34, 1], [0.44, 0]] }) },
      { name: "stars", svg: stars([[14, 14], [36, 26], [58, 12], [84, 22], [106, 10], [124, 30], [150, 18], [70, 38], [22, 44], [140, 46]]), keys: track({ opacity: [[0.34, 1], [0.4, 0]] }), loop: twinkle() },
      {
        name: "Sakhr's laden camels: standing by his home, then going off at the start of the day",
        svg: camels.map((x) => loaded(x, n(105 - 73 * cs), cs, false)).join(""),
        keys: track({
          xy: [
            [0.66, 0, 0],
            [0.77, 104, 0]
          ]
        }),
        loop: { move: "bob", ms: 700, y: 0.4 }
      },
      { name: "goods heaped by Sakhr's home", svg: goodsHeaped(86, 105.4), keys: showAt(0.83, 0.87) },
      { name: "and glints over them", svg: glints([[96, 82], [108, 86], [86, 88], [118, 92]], 1.3), keys: showAt(0.9, 0.93), loop: twinkle() },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden: the du'a", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.18, 0.46]]), loop: speaking },
      spark("the du'a: a spark rising", his[0], n(his[1] - 6), 0.19, 0.29),
      { name: "Sakhr's place", svg: someone(sakhr[0], sakhr[1], 1.7, SAKHR) },
      { name: "Sakhr's voice: telling of it", svg: arcs(n(sakhr[0] + 2.6), n(sakhr[1] - 3.4), SAKHR), keys: voice([[0.02, 0.15]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Sakhr al-Ghamidi: the Prophet said:",
      "O Allah, bless my people",
      "In their early mornings.",
      "Sakhr was a merchant, and would send off",
      "Merchandise at the beginning of the day,",
      "And became rich and had much wealth."
    ])
  };
}

export const CAMP_ART = {
  "into-the-shade": intoTheShade,
  "butter-and-dates": butterAndDates,
  "camp-close-together": campCloseTogether,
  "blessed-early-mornings": blessedEarlyMornings
};
