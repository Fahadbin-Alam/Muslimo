import { cloud, n, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { bowl, FOLK, glints, linesOn, mat, plainLand, SIX, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { coins, jar, stall } from "./tradeArt";
import { shadeOf } from "./hopeArt";
import { GREY } from "./lovedArt";

/**
 * The day's ways: swearing that sells the goods but takes the blessing away; looking also at the one who has less; the
 * Jumu'ah prayed early, then the afternoon nap; remembering Allah at all moments; the garment he loved most; and no
 * vessels of gold or silver to drink or eat from. Only the land, the sky, buildings, things and plants are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone
 * was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air.
 * Nothing is drawn for Allah, no book or page is drawn, and nothing comes down from the sky: a deed is a spark that
 * rises, what is good is a light, glints and a soft golden ring, and what is not to be done a grey dashed ring. No
 * name, word or number is written.
 */

/** The words of two lines. */
const TWO = [
  [0.02, 0.46],
  [0.476, 1]
] as const;

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** A quick grey voice: arcs that flicker fast. */
export const QUICK = { move: "twinkle", ms: 420, low: 0.35 } as const;

/** Gold and silver, for vessels. */
const GOLDEN = ["#E3B23C", "#B8862A"] as const;
const SILVER = ["#C9CDD2", "#9AA0A6"] as const;

/** A drinking vessel with a stem, its foot's middle at (x, y). */
const goblet = (x: number, y: number, [fill, edge]: readonly [string, string]) =>
  `<path d="M${n(x - 1.8)} ${n(y - 5)} L${n(x + 1.8)} ${n(y - 5)} Q${n(x + 1.7)} ${n(y - 2.6)} ${x} ${n(y - 2.2)} Q${n(x - 1.7)} ${n(y - 2.6)} ${n(x - 1.8)} ${n(y - 5)} Z" fill="${fill}" stroke="${edge}" stroke-width="0.3"/>` +
  `<path d="M${x} ${n(y - 2.2)} L${x} ${n(y - 0.5)}" stroke="${edge}" stroke-width="0.6"/><ellipse cx="${x}" cy="${n(y - 0.3)}" rx="1.3" ry="0.4" fill="${fill}" stroke="${edge}" stroke-width="0.3"/>`;

/** A plate, its middle at (x, y). */
const plate = (x: number, y: number, [fill, edge]: readonly [string, string]) =>
  `<ellipse cx="${x}" cy="${y}" rx="3" ry="0.9" fill="${fill}" stroke="${edge}" stroke-width="0.35"/><ellipse cx="${x}" cy="${n(y - 0.15)}" rx="1.8" ry="0.45" fill="none" stroke="${edge}" stroke-width="0.25"/>`;

/** A plain cup of clay, its foot's middle at (x, y). */
const clayCup = (x: number, y: number) =>
  `<path d="M${n(x - 1.5)} ${n(y - 3)} L${n(x + 1.5)} ${n(y - 3)} L${n(x + 1.1)} ${y} L${n(x - 1.1)} ${y} Z" fill="#A0703F"/><path d="M${n(x - 1.5)} ${n(y - 3)} L${n(x + 1.5)} ${n(y - 3)}" stroke="#7E5530" stroke-width="0.4"/>`;

/** A faint dotted line of looking, along `d`. */
export const looking = (d: string) => `<path d="${d}" stroke="#FFF6DA" stroke-width="0.7" stroke-dasharray="0.5 1.3" stroke-linecap="round" fill="none"/>`;

/** A cloth hanging from a line, its top's middle at (x, y), 5 wide and `h` long. */
const hanging = (x: number, y: number, fill: string, edge: string, h = 7) =>
  `<path d="M${n(x - 2.5)} ${y} L${n(x + 2.5)} ${y} L${n(x + 2.7)} ${n(y + h)} L${n(x - 2.7)} ${n(y + h)} Z" fill="${fill}" stroke="${edge}" stroke-width="0.3"/>`;

/** The Hibra hanging: a striped cloth, its top's middle at (x, y). */
const hibra = (x: number, y: number) =>
  hanging(x, y, "#4F7F63", "#3B624B", 7.4) +
  [-1.5, 0, 1.5].map((dx) => `<path d="M${n(x + dx)} ${n(y + 0.2)} L${n(x + dx * 1.06)} ${n(y + 7.2)}" stroke="#B5543C" stroke-width="0.55"/>`).join("") +
  `<path d="M${n(x - 2.6)} ${n(y + 6.2)} L${n(x + 2.6)} ${n(y + 6.2)}" stroke="#E2C27A" stroke-width="0.4"/>`;

/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** The place of the one buying: a slate blue. */
const BUYER = "#4E6E7E";
/** The place of the one who looks: a plain green. */
const LOOKER = "#5E8A52";
/** The place of one given more: a muted violet. */
const MORE = "#6E5A8C";
/** The place of one who has less: a slate grey. */
const LESS = "#6F7C85";
/** Anas's place and voice: a slate blue. */
const ANAS = "#5A6E8C";
/** Aishah's place and voice: a muted violet. */
const AISHAH = "#8B6B9E";
/** Hudhayfah's place and voice: a deep teal. */
const HUDHAYFAH = "#3E6B6B";

// Swearing to sell. Abu Hurairah said: I heard the Messenger of Allah ﷺ say: swearing makes the goods sell, and wipes
// out the blessing (Sahih al-Bukhari 2087; the English page: the swearing may persuade the buyer to purchase the goods,
// but that will be deprived of Allah's blessing). No one is drawn: a market stall with jars on its counter and the
// seller's place behind it, and Abu Hurairah's place far off. Abu Hurairah's voice tells of it. A pale dashed way
// shows, and the buyer's place comes along it to the stall. The seller's voice is quick and grey: the swearing; and
// the buyer's place steps closer. A jar goes from the counter to the buyer, and its coins go to the counter. Then the
// coins on the counter dwindle, and a grey dashed ring comes about them: the blessing taken away.
function swearingToSell(): SignArt {
  const hurairah: [number, number] = [146, 108];
  const seller: [number, number] = [114, 96.6];
  const start: [number, number] = [20, 110];
  const buyer: [number, number] = [84, 108];
  const closer = 4;
  const jarAt: [number, number] = [96, 100];
  const jarTo: [number, number] = [84, 110.6];
  const paidFrom: [number, number] = [88, 105.4];
  const paidTo: [number, number] = [107.6, 99.6];
  return {
    kind: "swearing-to-sell",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(26, 22) },
      { name: "a cloud", svg: cloud(70, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a home of the town", svg: home(40, 100, 16, 12) },
      ...palms([[60, 98, 12]], "the town"),
      { name: "a market stall", svg: stall(106, 30, "#3E7A6B", 86, 100) },
      { name: "the seller's place, behind the counter", svg: someone(seller[0], seller[1], 1.4, FOLK) },
      { name: "a jar on the counter", svg: jar(100.6, 100, 0.55, "#A65E36") },
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he heard", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the way to the stall: a pale dashed way", svg: way(`M${n(start[0] + 2.4)} ${n(start[1] + 0.6)} Q52 113.6 ${n(buyer[0] - 2.6)} ${n(buyer[1] + 1)}`, "#FFF0C4", 0.9), keys: showAt(0.1, 0.112) },
      {
        name: "the buyer's place: coming to the stall, then stepping closer",
        svg: someone(start[0], start[1], 1.6, BUYER),
        keys: track({
          xy: [
            [0.12, 0, 0],
            [0.2, buyer[0] - start[0], buyer[1] - start[1]],
            [0.42, buyer[0] - start[0], buyer[1] - start[1]],
            [0.45, buyer[0] - start[0] + closer, buyer[1] - start[1]]
          ]
        })
      },
      { name: "the swearing: the seller's voice, quick and grey", svg: arcsLeft(n(seller[0] - 3.2), n(seller[1] + 0.2), GREY), keys: showFor(0.28, 0.286, 0.4, 0.406), loop: QUICK },
      {
        name: "the goods: a jar going from the counter to the buyer",
        svg: jar(jarAt[0], jarAt[1], 0.55),
        keys: track({
          xy: [
            [0.52, 0, 0],
            [0.58, n(jarTo[0] - jarAt[0]), n(jarTo[1] - jarAt[1])]
          ]
        })
      },
      {
        name: "the price: coins going from the buyer to the counter, then dwindling",
        svg: coins(paidFrom[0], paidFrom[1], 2),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.606, 1],
            [0.78, 1],
            [0.84, 0.35]
          ],
          xy: [
            [0.61, 0, 0],
            [0.66, n(paidTo[0] - paidFrom[0]), n(paidTo[1] - paidFrom[1])]
          ]
        })
      },
      { name: "the blessing taken away: a grey dashed ring about the coins", svg: greyRing(paidTo[0], n(paidTo[1] - 0.6), 3.4, 2), keys: showAt(0.86, 0.872) }
    ],
    words: linesOn(FOUR, ["Abu Hurairah said: I heard him saying:", "The swearing may persuade the buyer", "To purchase the goods but that will be", "Deprived of Allah's blessing."])
  };
}

// Look at the one below. Abu Hurairah said that the Messenger of Allah ﷺ said: when one of you looks at one who has
// been given more than him in wealth and in form, let him look at one who is below him (Sahih al-Bukhari 6490; the
// English page: if anyone of you looked at a person who was made superior to him in property and in appearance, then he
// should also look at the one who is inferior to him). Appearance is left out of the lines, since no one is drawn. No
// one is drawn: a small home and a large home, the place of the one who looks between them, and Abu Hurairah's place
// far off. Abu Hurairah's voice tells of it. A place shows at the large home's door, and a faint dotted line of
// looking goes to it from the one who looks; many coins show by the large home: more in property. Then the line of
// looking to the large home fades, and one goes the other way, to the small home, where a place with one coin shows:
// the one who has less. A soft golden ring comes about the one who looks.
function lookBelowYou(): SignArt {
  const hurairah: [number, number] = [8, 108];
  const looker: [number, number] = [80, 108];
  const more: [number, number] = [120, 106];
  const less: [number, number] = [43, 107.4];
  return {
    kind: "look-below-you",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(30, 22) },
      { name: "a cloud", svg: cloud(108, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a small home", svg: home(32, 104, 12, 9) },
      { name: "a large home", svg: home(126, 102, 28, 18) },
      ...palms([[60, 99, 12]], "the town"),
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he said", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the place of the one who looks", svg: someone(looker[0], looker[1], 1.6, LOOKER) },
      { name: "the place of one given more, at the large home's door", svg: someone(more[0], more[1], 1.6, MORE), keys: showAt(0.22, 0.232) },
      {
        name: "looking at the one given more: a faint dotted line to it",
        svg: looking(`M${n(looker[0] + 2)} ${n(looker[1] - 1.6)} Q100 102 ${n(more[0] - 2.4)} ${n(more[1] - 1)}`),
        keys: showFor(0.26, 0.272, 0.61, 0.622)
      },
      { name: "more in property: many coins by the large home", svg: coins(145, 108, 5) + coins(149.6, 108, 4) + coins(154.2, 108, 3), keys: showAt(0.42, 0.432) },
      {
        name: "also looking at the one below: a faint dotted line the other way, to the small home",
        svg: looking(`M${n(looker[0] - 2)} ${n(looker[1] - 1.6)} Q62 102.4 ${n(less[0] + 2.4)} ${n(less[1] - 1.2)}`),
        keys: showAt(0.64, 0.652)
      },
      { name: "the place of one who has less, at the small home", svg: someone(less[0], less[1], 1.5, LESS) + coins(n(less[0] + 4.4), n(less[1] + 1), 1), keys: showAt(0.81, 0.822) },
      { name: "looking at the one below too: a soft golden ring about the one who looks", svg: care(looker[0], n(looker[1] + 0.4), 4, 2.4, SOFT_GOLD), keys: showAt(0.88, 0.892), loop: soft }
    ],
    words: linesOn(FIVE, ["Abu Hurairah: he said: if anyone of you", "Looked at a person who was made", "Superior to him in property,", "Then he should also look at the one", "Who is inferior to him."])
  };
}

// The nap after Jumu'ah. Anas said: we used to go early to the Jumu'ah, then take the midday rest (Sahih al-Bukhari
// 940; the English page: we used to offer the Jumua prayer early and then have the afternoon nap). No one is drawn:
// the masjid of Madinah, homes on either side with a palm by each, and the places of Anas and those with him at the
// homes. Anas's voice tells of it. The places go to the masjid early, the sun not yet at its height, and sparks rise
// from the rows: the prayer. Then the places go back to the palms by the homes. Mats and the shade of the palms show
// there, the places rest, softened, and the sun goes on into the afternoon.
function napAfterJumuah(): SignArt {
  const left: [number, number][] = [
    [10, 108],
    [15, 108.6],
    [20, 108],
    [25, 108.6]
  ];
  const right: [number, number][] = [
    [135, 108],
    [140, 108.6],
    [145, 108],
    [150, 108.6]
  ];
  const go = 46;
  const back = 20;
  const group = (side: [number, number][], first?: string) => side.map(([x, y], i) => someone(x, y, 1.5, i === 0 && first ? first : FOLK)).join("");
  const going = (dx: number) =>
    track({
      xy: [
        [0.1, 0, 0],
        [0.24, dx * go, 0],
        [0.5, dx * go, 0],
        [0.58, dx * back, 0]
      ],
      opacity: [
        [0.74, 1],
        [0.8, 0.7]
      ]
    });
  return {
    kind: "nap-after-jumuah",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun: rising toward its height, then going on into the afternoon",
        svg: sun(28, 40),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.22, 36, -22],
            [0.7, 36, -22],
            [0.8, 94, -10]
          ]
        })
      },
      { name: "a cloud", svg: cloud(116, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a home on the left", svg: home(18, 104, 18, 12) },
      { name: "a home on the right", svg: home(142, 104, 18, 12) },
      { name: "the masjid", svg: madinahMasjid(56, 100, 1) },
      ...palms(
        [
          [38, 102, 14],
          [122, 102, 14]
        ],
        "Madinah"
      ),
      {
        name: "the afternoon nap: the shade of the palms, with mats in it",
        svg: shadeOf(n(left[0][0] + back + 7.5), 106.8, 12, 3.4) + mat(n(left[0][0] + back + 7.5), 109.8, 20) + shadeOf(n(right[0][0] - back + 7.5), 106.8, 12, 3.4) + mat(n(right[0][0] - back + 7.5), 109.8, 20),
        keys: showAt(0.7, 0.72)
      },
      { name: "Anas's voice: telling of it", svg: arcsLeft(n(left[0][0] - 3.2), n(left[0][1] - 2.8), ANAS), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "Anas's place and those beside it: to the masjid early, then back to rest", svg: group(left, ANAS), keys: going(1) },
      { name: "the places from the right: to the masjid early, then back to rest", svg: group(right), keys: going(-1) },
      spark("the prayer: a spark rising from the rows on the left", 64, 104, 0.34, 0.42),
      spark("the prayer: a spark rising from the rows on the right", 96, 104, 0.36, 0.44)
    ],
    words: linesOn(THREE, ["Anas: we used to offer the Jumu'ah", "Prayer early and then have", "The afternoon nap."])
  };
}

// At all moments. Aishah said: the Prophet ﷺ used to remember Allah at all his moments (Sahih Muslim 373; the English
// page: the Apostle of Allah used to remember Allah at all moments). No one is drawn: his home in Madinah with palms
// about it, his place before it, a golden ring, and Aishah's place far off. Aishah's voice tells of it, as the dawn
// turns to day. Then his voice, soft and golden, speaks in the morning, and a spark rises; the sun goes to its height
// and his voice speaks again; the sun goes down toward evening, the sky warms, and it speaks again; the sun sets, the
// night comes with the moon and the stars, and it speaks again. A soft golden ring comes about his place: at all
// moments.
function atAllMoments(): SignArt {
  const his: [number, number] = [84, 106.4];
  const aishah: [number, number] = [22, 108];
  return {
    kind: "at-all-moments",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the dawn sky, turning to day",
        svg: `<rect width="160" height="62" fill="#F3C49B" opacity="0.85"/>`,
        keys: track({
          opacity: [
            [0.06, 1],
            [0.18, 0]
          ]
        })
      },
      {
        name: "the sun: rising, at its height, going down, and setting",
        svg: sun(20, 58),
        keys: track({
          xy: [
            [0.06, 0, 0],
            [0.2, 18, -26],
            [0.5, 18, -26],
            [0.58, 62, -44],
            [0.64, 62, -44],
            [0.7, 108, -20],
            [0.74, 108, -20],
            [0.79, 126, 14]
          ]
        })
      },
      { name: "a cloud", svg: cloud(116, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "the evening sky", svg: `<rect width="160" height="62" fill="#F2B98C" opacity="0.75"/>`, keys: showAt(0.66, 0.7) },
      { name: "the night sky", svg: `<rect width="160" height="64" fill="#1B2A50"/>`, keys: showAt(0.77, 0.82) },
      {
        name: "stars",
        svg: stars([
          [14, 12],
          [36, 26],
          [58, 8],
          [84, 20],
          [104, 10],
          [148, 18],
          [72, 38],
          [44, 42]
        ]),
        keys: showAt(0.8, 0.83),
        loop: twinkle(1600)
      },
      { name: "the moon", svg: crescent(128, 24, 4, 2.2, "#FFF3C4"), keys: showAt(0.81, 0.84) },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "his home", svg: home(92, 101, 22, 14) },
      ...palms(
        [
          [50, 99, 13],
          [128, 99, 15],
          [144, 100, 13]
        ],
        "Madinah"
      ),
      { name: "the night over the land", svg: `<rect y="50" width="160" height="70" fill="#1B2A50" opacity="0.4"/>`, keys: showAt(0.77, 0.82) },
      { name: "Aishah's place, far off", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 3.2), n(aishah[1] - 2.8), AISHAH), keys: showFor(0.03, 0.036, 0.16, 0.166), loop: speaking },
      { name: "his place, a golden ring, before his home", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "his voice, soft and golden, remembering: in the morning, at midday, toward evening and at night",
        svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), SOFT_GOLD),
        keys: track({
          opacity: [
            [0.48, 0],
            [0.486, 1],
            [0.53, 1],
            [0.536, 0],
            [0.59, 0],
            [0.596, 1],
            [0.63, 1],
            [0.636, 0],
            [0.7, 0],
            [0.706, 1],
            [0.73, 1],
            [0.736, 0],
            [0.83, 0],
            [0.836, 1],
            [0.88, 1],
            [0.886, 0]
          ]
        }),
        loop: speaking
      },
      spark("in the morning: a spark rising from his place", n(his[0] - 2), n(his[1] - 4), 0.49, 0.56),
      spark("at midday: a spark rising from his place", n(his[0] + 2), n(his[1] - 4), 0.6, 0.67),
      spark("toward evening: a spark rising from his place", n(his[0] - 2), n(his[1] - 4), 0.71, 0.78),
      spark("at night: a spark rising from his place", n(his[0] + 2), n(his[1] - 4), 0.84, 0.91),
      { name: "at all moments: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 5, 3, SOFT_GOLD), keys: showAt(0.92, 0.932), loop: soft }
    ],
    words: linesOn(TWO, ["Aishah said: he used to remember", "Allah at all moments."])
  };
}

// The Hibra. Anas ibn Malik said: the garment the Prophet ﷺ loved most to wear was the Hibra (Sahih al-Bukhari 5813;
// the English page: the most beloved garment to the Prophet to wear was the Hibra). What the Hibra is, a translator's
// note, is left out of the lines. No one is drawn: his home in Madinah, his place before it, a golden ring, a line
// for clothes between two posts with a plain white cloth and a dark cloak on it, and Anas's place far off. Anas's
// voice tells of it. Then the Hibra, a striped cloth, shows on the line, and glints and a soft golden ring come about
// it: the most beloved. A soft golden way shows from his place to it: to him, to wear. Glints and a soft golden ring
// come about his place.
function theHibra(): SignArt {
  const his: [number, number] = [102, 106.4];
  const anas: [number, number] = [16, 108];
  const posts = [38, 78];
  const at = (x: number) => {
    const t = (x - posts[0]) / (posts[1] - posts[0]);
    return n(92.6 + 2 * t * (1 - t) * 2.8);
  };
  return {
    kind: "the-hibra",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(132, 22) },
      { name: "a cloud", svg: cloud(60, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "his home", svg: home(110, 101, 22, 14) },
      ...palms(
        [
          [134, 100, 15],
          [148, 101, 13]
        ],
        "Madinah"
      ),
      {
        name: "a line for clothes, between two posts",
        svg:
          posts.map((x) => `<rect x="${n(x - 0.6)}" y="92" width="1.2" height="16" fill="#8A6440"/>`).join("") +
          `<path d="M${posts[0]} 92.6 Q58 95.4 ${posts[1]} 92.6" stroke="#B49B6E" stroke-width="0.4" fill="none"/>`
      },
      { name: "a plain white cloth on the line", svg: hanging(46, at(46), "#F4F1E8", "#D8D2C2") },
      { name: "a dark woollen cloak on the line", svg: hanging(70, at(70), "#5A4A3A", "#45382B", 7.6) },
      { name: "Anas's place, far off", svg: someone(anas[0], anas[1], 1.5, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 3.2), n(anas[1] - 2.8), ANAS), keys: showFor(0.03, 0.036, 0.2, 0.206), loop: speaking },
      { name: "his place, a golden ring, before his home", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the Hibra: a striped cloth, put on the line", svg: hibra(58, at(58)), keys: showAt(0.48, 0.5) },
      {
        name: "the most beloved garment: glints about the Hibra",
        svg: glints(
          [
            [52.6, 93.4],
            [63.6, 96.6],
            [53.4, 101.8]
          ],
          0.7
        ),
        keys: showAt(0.54, 0.552),
        loop: twinkle()
      },
      { name: "the most beloved garment: a soft golden ring about the Hibra", svg: care(58, 98, 4.6, 5.4, SOFT_GOLD), keys: showAt(0.58, 0.592), loop: soft },
      { name: "to him, to wear: a soft golden way from his place to the Hibra", svg: way(`M${n(his[0] - 2.8)} ${n(his[1] - 0.6)} Q82 107 ${62.4} 101.6`, SOFT_GOLD, 1), keys: showAt(0.66, 0.672) },
      {
        name: "glints about his place",
        svg: glints(
          [
            [n(his[0] - 4.6), n(his[1] - 4.2)],
            [n(his[0] + 4.8), n(his[1] - 4.6)]
          ],
          0.7
        ),
        keys: showAt(0.8, 0.812),
        loop: twinkle()
      },
      { name: "a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 5, 3, SOFT_GOLD), keys: showAt(0.84, 0.852), loop: soft }
    ],
    words: linesOn(TWO, ["Anas ibn Malik: the most beloved garment", "To him to wear was the Hibra."])
  };
}

// Not in gold or silver. Abdur-Rahman ibn Abi Layla said that they were with Hudhayfah, who said: I heard the Prophet ﷺ
// say: do not drink in vessels of gold and silver, and do not eat in plates of them, for they are theirs in this world
// and ours in the Hereafter (Sahih al-Bukhari 5426; the English page: do not drink in silver or golden vessels, and do
// not eat in plates of such metals, for such things are for the unbelievers in this worldly life and for us in the
// Hereafter). What came before it, and silk, are left out. No one is drawn: a mat with the places of Hudhayfah and
// those sitting with him, a plain cup of clay and a wooden bowl before them. Hudhayfah's voice tells of it. Cups of
// gold and silver show, and a grey dashed ring comes about them; plates of gold and silver show, and a grey dashed ring
// comes about them. Then the vessels go away. A soft golden ring comes about the sitting places: for us; and sparks rise
// from them, with glints high above: in the Hereafter.
function goldAndSilver(): SignArt {
  const hudhayfah: [number, number] = [80, 107.6];
  const others: [number, number][] = [
    [70, 108],
    [90.4, 108]
  ];
  const away = 40;
  const going = (from: number, dx: number) =>
    track({
      opacity: [
        [from, 0],
        [n(from + 0.012), 1],
        [0.54, 1],
        [0.594, 0]
      ],
      xy: [
        [0.5, 0, 0],
        [0.58, dx, 0]
      ]
    });
  return {
    kind: "gold-and-silver",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(24, 24) },
      { name: "a cloud", svg: cloud(104, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a home of the town", svg: home(30, 100, 18, 12) },
      ...palms([[140, 100, 15]], "the town"),
      { name: "a mat to sit on", svg: mat(80, 108.6, 26) },
      { name: "Hudhayfah's place, on the mat", svg: someone(hudhayfah[0], hudhayfah[1], 1.5, HUDHAYFAH) },
      { name: "the places of those sitting with Hudhayfah", svg: others.map(([x, y]) => someone(x, y, 1.5, FOLK)).join("") },
      { name: "a plain cup of clay and a wooden bowl before them", svg: clayCup(75.2, 110.6) + bowl(85.2, 110.8) },
      { name: "Hudhayfah's voice: telling what he heard", svg: arcs(n(hudhayfah[0] + 3.2), n(hudhayfah[1] - 4.4), HUDHAYFAH), keys: showFor(0.024, 0.03, 0.11, 0.116), loop: speaking },
      { name: "cups of gold and silver: showing, then going away", svg: goblet(102, 110, GOLDEN) + goblet(107.4, 110, SILVER), keys: going(0.18, away) },
      { name: "do not drink in them: a grey dashed ring about the cups", svg: greyRing(104.7, 107.6, 5.2, 3.6), keys: showFor(0.24, 0.252, 0.5, 0.512) },
      { name: "plates of gold and silver: showing, then going away", svg: plate(52, 110, GOLDEN) + plate(60, 110, SILVER), keys: going(0.34, -away) },
      { name: "do not eat in them: a grey dashed ring about the plates", svg: greyRing(56, 109.4, 7.6, 2.6), keys: showFor(0.4, 0.412, 0.5, 0.512) },
      { name: "for us: a soft golden ring about the sitting places", svg: care(80, 108.4, 14, 3.4, SOFT_GOLD), keys: showAt(0.66, 0.672), loop: soft },
      spark("in the Hereafter: a spark rising from the sitting places", 72, 104, 0.82, 0.9),
      spark("in the Hereafter: a spark rising from Hudhayfah's place", 80, 103, 0.84, 0.92),
      spark("in the Hereafter: a spark rising from the sitting places on the right", 88, 104, 0.86, 0.94),
      {
        name: "in the Hereafter: glints high above",
        svg: glints(
          [
            [64, 46],
            [80, 38],
            [96, 46]
          ],
          1.3
        ),
        keys: showAt(0.88, 0.892),
        loop: twinkle()
      }
    ],
    words: linesOn(SIX, [
      "Hudhayfah: I heard him saying: do not",
      "Drink in silver or golden vessels,",
      "And do not eat in plates of such metals,",
      "For such things are for the unbelievers",
      "In this worldly life and for us",
      "In the Hereafter."
    ])
  };
}

export const DAILY_ART = {
  "swearing-to-sell": swearingToSell,
  "look-below-you": lookBelowYou,
  "nap-after-jumuah": napAfterJumuah,
  "at-all-moments": atAllMoments,
  "the-hibra": theHibra,
  "gold-and-silver": goldAndSilver
} as const;
