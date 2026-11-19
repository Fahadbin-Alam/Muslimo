import { cloud, glow, n, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun } from "./worshipArt";
import { care, goldCoin, jug, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { restingCamel, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, EIGHT, glints, linesOn, mat, plainLand, SIX, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { lane } from "./freshArt";
import { kaaba } from "./rewardArt";

/**
 * Green ways: wiping over leather socks, three days and nights on a journey and one at home; following those before,
 * span by span, even into a lizard's hole; a tied rope cut at the Ka'bah, and one led by the hand; wealth, green and
 * sweet, blessed for the one who takes it without greed; the one bound to money, pleased only when given; and two
 * sandals with two straps. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring
 * or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is
 * drawn for Allah, no book, page or letter is drawn, and nothing comes down from the sky: what is good is a light,
 * glints and a soft golden ring. No name, word or number is written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of nine lines. */
const NINE = [
  [0.012, 0.117],
  [0.121, 0.226],
  [0.23, 0.335],
  [0.339, 0.444],
  [0.448, 0.553],
  [0.557, 0.662],
  [0.666, 0.771],
  [0.775, 0.88],
  [0.884, 1]
] as const;

/** Shurayh's place and voice: a violet brown. */
const SHURAYH = "#7A5E8E";
/** Aishah's place and voice: a plum. */
const AISHAH = "#9A5E7A";
/** Ali's place and voice: a deep green. */
const ALI = "#3E6E5E";
/** The place of one on a journey: a sand brown. */
const ON_A_JOURNEY = "#A07E56";
/** The place of one at home: a warm brown. */
const AT_HOME = "#8E7458";
/** Abu Sa'id's place and voice: a slate blue. */
const ABU_SAID = "#5E6E9A";
/** The places of those who were before: a grey brown. */
const BEFORE = "#8C8274";
/** The places of those who follow them: a warm clay. */
const FOLLOWING = "#B07A4E";
/** Ibn Abbas's place and voice: a deep blue. */
const IBN_ABBAS = "#3E5E8A";
/** The places of those about the House: a warm brown. */
const ABOUT_THE_HOUSE = "#9A7A56";
/** The two places tied together: a dark clay. */
const TIED = "#7E5A44";
/** Hakim's place and voice: a dusk violet. */
const HAKIM = "#6A5A8A";
/** The place of the one who takes without greed: a leaf green. */
const CONTENT = "#5E8A4E";
/** The place of the one who takes with greed: a dull brown. */
const GREEDY = "#8A6A4E";
/** Abu Hurairah's place and voice: a rose brown. */
const ABU_HURAIRAH = "#8A5E6E";
/** The place of the one bound to money: a grey brown. */
const BOUND = "#7A6E62";
/** Pleased: a pale yellow. */
const PLEASED = "#E9D77E";
/** Isa's place and voice: a sea blue. */
const ISA = "#4E7A8A";
/** Anas's place: an olive. */
const ANAS = "#6E7E4E";
/** Thabit's place and voice: an olive brown. */
const THABIT = "#7A6A3E";
/** The places of those with them: a sand brown. */
const WITH_THEM = "#A88A66";

/** A thousandth: times written as the sum of two are kept exact. */
const at3 = (time: number) => Math.round(time * 1000) / 1000;

/** A voice that speaks from `on` until `off`, for each pair. */
const voice = (spans: [number, number][]) =>
  track({
    opacity: spans.flatMap(([on, off]): [number, number][] => [
      [on, 0],
      [at3(on + 0.006), 1],
      [off, 1],
      [at3(off + 0.006), 0]
    ])
  });

/** `svg` made `kx` times as wide and `ky` times as high, about (x, y). */
const stretch = (svg: string, x: number, y: number, kx: number, ky: number) => `<g transform="translate(${x} ${y}) scale(${kx} ${ky}) translate(${-x} ${-y})">${svg}</g>`;

/** A pair of leather socks standing, the back of the first one's sole at (x, y): each up to above the ankle, seamed. */
const leatherSocks = (x: number, y: number) =>
  [0, 5.4]
    .map(
      (dx) =>
        `<rect x="${n(x + dx)}" y="${n(y - 8.4)}" width="2.6" height="6" fill="#86603C"/>` +
        `<path d="M${n(x + dx)} ${y} L${n(x + dx)} ${n(y - 2.6)} L${n(x + dx + 2.6)} ${n(y - 2.6)} Q${n(x + dx + 5.4)} ${n(y - 2)} ${n(x + dx + 5)} ${y} Z" fill="#7A5232"/>` +
        `<path d="M${n(x + dx)} ${n(y - 2.6)} L${n(x + dx + 2.6)} ${n(y - 2.6)} M${n(x + dx + 1.3)} ${n(y - 8.4)} L${n(x + dx + 1.3)} ${n(y - 2.6)}" stroke="#5A3A22" stroke-width="0.3"/>`
    )
    .join("");

/** A sheen of water on the tops of the leather socks, its middle at (x, y). */
const wetSheen = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="0.5" fill="#BFE6FA" opacity="0.9"/><ellipse cx="${n(x - 0.4)}" cy="${n(y - 0.1)}" rx="0.6" ry="0.2" fill="#FFFFFF"/>`;

/** A day: a small sun, its middle at (x, y). */
const aDay = (x: number, y: number) => glow(x, y, 3.6, "#FFF0C0", 0.22) + `<circle cx="${x}" cy="${y}" r="2" fill="#FFD95E" stroke="#E0A83A" stroke-width="0.3"/>`;

/** A night: a small dark round with a crescent in it, its middle at (x, y). */
const aNight = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="2.3" fill="#2E3D6E"/>` + crescent(n(x - 0.3), y, 1.4, 0.7, "#F4E7B0");

/** A small mound of earth and the hole of a lizard in it, the hole's middle at (x, y). */
const mound = (x: number, y: number) =>
  `<path d="M${n(x - 11)} ${n(y + 1.6)} Q${n(x - 6)} ${n(y - 7)} ${n(x + 1)} ${n(y - 6.4)} Q${n(x + 8)} ${n(y - 6)} ${n(x + 11)} ${n(y + 1.6)} Z" fill="#C9AE7C"/>` +
  `<path d="M${n(x - 7)} ${n(y - 2.6)} Q${n(x - 2)} ${n(y - 4.4)} ${n(x + 4)} ${n(y - 3.4)}" stroke="#B39566" stroke-width="0.4" fill="none"/>`;

/** The dark mouth of the hole whose middle is at (x, y). */
const holeMouth = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 0.4)}" rx="2.8" ry="1.7" fill="#3E2E1E"/><ellipse cx="${x}" cy="${n(y + 0.9)}" rx="3.2" ry="0.5" fill="#B39566"/>`;

/** A spiny-tailed lizard facing left, its head's middle at (x, y): a stout body, four short legs and a thick, banded tail. */
const lizard = (x: number, y: number) =>
  `<path d="M${n(x + 6.6)} ${n(y - 0.6)} Q${n(x + 10.6)} ${n(y - 0.6)} ${n(x + 13.4)} ${n(y + 0.9)} Q${n(x + 10.4)} ${n(y + 1.1)} ${n(x + 6.6)} ${n(y + 1.2)} Z" fill="#A07A44"/>` +
  `<path d="M${n(x + 8)} ${n(y - 0.5)} L${n(x + 8)} ${n(y + 1.1)} M${n(x + 9.6)} ${n(y - 0.4)} L${n(x + 9.6)} ${n(y + 1)} M${n(x + 11.2)} ${n(y - 0.1)} L${n(x + 11.2)} ${n(y + 1)}" stroke="#7E5A2E" stroke-width="0.45"/>` +
  `<path d="M${n(x + 2)} ${n(y + 0.8)} L${n(x + 1)} ${n(y + 2.2)} M${n(x + 3)} ${n(y + 0.9)} L${n(x + 3.6)} ${n(y + 2.2)} M${n(x + 5.4)} ${n(y + 0.8)} L${n(x + 4.8)} ${n(y + 2.2)} M${n(x + 6.4)} ${n(y + 0.8)} L${n(x + 7.4)} ${n(y + 2.1)}" stroke="#8A6A3A" stroke-width="0.55" stroke-linecap="round"/>` +
  `<ellipse cx="${n(x + 4)}" cy="${n(y + 0.1)}" rx="3.4" ry="1.3" fill="#B08A52"/>` +
  `<ellipse cx="${x}" cy="${n(y - 0.1)}" rx="1.6" ry="1" fill="#B08A52"/>` +
  `<circle cx="${n(x - 0.6)}" cy="${n(y - 0.4)}" r="0.22" fill="#2A1E10"/>`;

/** The spiny-tailed lizard facing right, its head's middle at (x, y). */
const lizardRight = (x: number, y: number) => `<g transform="translate(${n(2 * x)} 0) scale(-1 1)">${lizard(x, y)}</g>`;

/** Small marks across the way, at each of `list`, `h` high: a span, or a cubit, measured off. */
const marks = (list: [number, number][], h: number, color: string) =>
  `<path d="${list.map(([x, y]) => `M${x} ${n(y - h / 2)} L${x} ${n(y + h / 2)}`).join(" ")}" stroke="${color}" stroke-width="0.5" stroke-linecap="round"/>`;

/** A rope from (x1, y1) to (x2, y2), sagging a little. */
const rope = (x1: number, y1: number, x2: number, y2: number) =>
  `<path d="M${x1} ${y1} Q${n((x1 + x2) / 2)} ${n((y1 + y2) / 2 + 1)} ${x2} ${y2}" stroke="#8C6A3E" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;

/** A bush of green fruit, its foot's middle at (x, y): leaves about a short stem, and the fruit. */
const fruitBush = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - 5)}" stroke="#6E5A2E" stroke-width="1"/>` +
  `<ellipse cx="${x}" cy="${n(y - 8)}" rx="9" ry="6" fill="#4F9A3C"/>` +
  `<ellipse cx="${n(x - 4)}" cy="${n(y - 9.6)}" rx="4.6" ry="3.4" fill="#5FAE48"/>` +
  `<ellipse cx="${n(x + 4)}" cy="${n(y - 6.6)}" rx="4.4" ry="3.2" fill="#468A34"/>`;

/** Where each green fruit hangs on the bush whose foot's middle is at (x, y). */
const FRUIT_ON_BUSH: [number, number][] = [
  [-5, -9],
  [-1.6, -11.6],
  [2.4, -9.6],
  [5.6, -7],
  [-3, -5.6],
  [1.4, -5],
  [-6.4, -6.2]
];

/** A green fruit, its middle at (x, y). */
const greenFruit = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="1.3" fill="#A8D84E" stroke="#6E9A2E" stroke-width="0.3"/><circle cx="${n(x - 0.4)}" cy="${n(y - 0.4)}" r="0.35" fill="#E6F6B0"/>`;

/** A silver coin, its middle at (x, y). */
const silverCoin = (x: number, y: number, r = 1.5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#DDE2E8" stroke="#98A2AD" stroke-width="0.4"/><circle cx="${x}" cy="${y}" r="${n(r * 0.55)}" fill="none" stroke="#B8C0C9" stroke-width="0.3"/>`;

/** A thick soft cloth, folded, with a fringe, its foot's middle at (x, y). */
const softCloth = (x: number, y: number) =>
  `<rect x="${n(x - 3.4)}" y="${n(y - 3)}" width="6.8" height="3" rx="1.2" fill="#C98A5A"/>` +
  `<path d="M${n(x - 3.2)} ${n(y - 1.5)} Q${x} ${n(y - 0.6)} ${n(x + 3.2)} ${n(y - 1.5)}" stroke="#A86A3E" stroke-width="0.4" fill="none"/>` +
  `<path d="${[-2.6, -1.6, -0.6, 0.4, 1.4, 2.4].map((dx) => `M${n(x + dx)} ${y} L${n(x + dx)} ${n(y + 0.9)}`).join(" ")}" stroke="#A86A3E" stroke-width="0.35"/>`;

/** A garment of black wool with a pattern of marks on it, folded, its foot's middle at (x, y). */
const markedGarment = (x: number, y: number) =>
  `<rect x="${n(x - 3.4)}" y="${n(y - 3.6)}" width="6.8" height="3.6" rx="0.4" fill="#2E2A2A"/>` +
  `<path d="M${n(x - 3.4)} ${n(y - 2.4)} L${n(x + 3.4)} ${n(y - 2.4)} M${n(x - 3.4)} ${n(y - 1)} L${n(x + 3.4)} ${n(y - 1)}" stroke="#C9A65A" stroke-width="0.35" stroke-dasharray="0.6 0.6"/>`;

/** A bundle of cloth, tied at its top, its foot's middle at (x, y). */
const bundle = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y - 2)}" rx="3" ry="2.2" fill="#E9DCC0"/>` +
  `<path d="M${n(x - 0.8)} ${n(y - 4)} L${n(x - 1.4)} ${n(y - 5.4)} M${n(x + 0.8)} ${n(y - 4)} L${n(x + 1.4)} ${n(y - 5.4)}" stroke="#C9B996" stroke-width="0.7" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 3.8)} L${n(x + 1.6)} ${n(y - 3.8)}" stroke="#9A7A4E" stroke-width="0.5"/>`;

/** The cloth of the bundle, opened and spread, its middle at (x, y). */
const openCloth = (x: number, y: number) =>
  `<path d="M${n(x - 6.4)} ${n(y - 2.4)} L${n(x + 6.4)} ${n(y - 2.4)} L${n(x + 7.6)} ${n(y + 2)} L${n(x - 7.6)} ${n(y + 2)} Z" fill="#E9DCC0"/>` +
  `<path d="M${n(x - 6.4)} ${n(y - 2.4)} L${n(x - 7.6)} ${n(y + 2)} M${n(x + 6.4)} ${n(y - 2.4)} L${n(x + 7.6)} ${n(y + 2)}" stroke="#C9B996" stroke-width="0.4"/>`;

/** A sandal of leather lying on the cloth on its sole, its toe to the right, its middle at (x, y): its sole, and its
 * two straps across it. */
const sandalWithTwoStraps = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${y} C${n(x - 6)} ${n(y - 1.8)} ${n(x - 3)} ${n(y - 1.9)} ${x} ${n(y - 1.9)} C${n(x + 3.6)} ${n(y - 2.1)} ${n(x + 6.2)} ${n(y - 1.8)} ${n(x + 6.2)} ${y} C${n(x + 6.2)} ${n(y + 1.8)} ${n(x + 3.6)} ${n(y + 2.1)} ${x} ${n(y + 1.9)} C${n(x - 3)} ${n(y + 1.9)} ${n(x - 6)} ${n(y + 1.8)} ${n(x - 6)} ${y} Z" fill="#8A5A30"/>` +
  `<path d="M${n(x - 5.2)} ${y} C${n(x - 5.2)} ${n(y - 1.2)} ${n(x - 2.6)} ${n(y - 1.3)} ${x} ${n(y - 1.3)} C${n(x + 3.2)} ${n(y - 1.5)} ${n(x + 5.4)} ${n(y - 1.2)} ${n(x + 5.4)} ${y} C${n(x + 5.4)} ${n(y + 1.2)} ${n(x + 3.2)} ${n(y + 1.5)} ${x} ${n(y + 1.3)} C${n(x - 2.6)} ${n(y + 1.3)} ${n(x - 5.2)} ${n(y + 1.2)} ${n(x - 5.2)} ${y} Z" fill="#A87444"/>` +
  `<path d="M${n(x + 0.6)} ${n(y - 1.9)} Q${n(x - 0.8)} ${y} ${n(x + 0.6)} ${n(y + 1.9)} M${n(x + 3)} ${n(y - 2)} Q${n(x + 1.6)} ${y} ${n(x + 3)} ${n(y + 2)}" stroke="#4E2F16" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;

// Wiping over the socks. Shurayh ibn Hani said: I came to Aishah to ask her about wiping over the socks. She said: you
// better ask the son of Abu Talib, for he used to travel with the Messenger of Allah ﷺ. We asked him, and he said: the
// Messenger of Allah ﷺ stipulated three days and three nights for a traveller and one day and one night for the
// resident (Sahih Muslim 276a). The words leave out the translator's words and "we asked him", and name Ali where he
// speaks. No one is drawn: in a town, Aishah's home on the left and her place by it, a home in the middle with the
// place of one at home by it, Ali's place, and the road out of the town on the right, with a camel resting by it and
// the place of one on a journey. Shurayh's place comes along the road to before Aishah's home, and its voice asks: a
// pair of leather socks shows, and a sheen of water passes over their tops. Aishah's voice answers: a soft ring comes
// about Ali's place, and a faint golden way along the road: he used to travel. Shurayh's place goes to Ali's place,
// and Ali's voice speaks. Three small suns show over the road, one by one, then three nights: for the one on a
// journey, and a soft golden ring comes about its place. One small sun and one night show over the home: for the one
// at home, and a soft golden ring comes about its place.
function wipingOverTheSocks(): SignArt {
  const aishahHome: [number, number] = [22, 96];
  const aishah: [number, number] = [34, 105];
  const shurayh: [number, number] = [46, 106.2];
  const atAli: [number, number] = [90, 106.6];
  const ali: [number, number] = [104, 105.6];
  const socks: [number, number] = [52.6, 106];
  const homeAt: [number, number] = [76, 91];
  const atHome: [number, number] = [85.4, 97.6];
  const camel: [number, number] = [140, 97];
  const journey: [number, number] = [126, 100.6];
  const days = [116, 128, 140];
  const sheen = n(socks[1] - 8.4);
  /** The socks, the sheen and the jug are drawn 1.35 times as big, about this point. */
  const [kx, ky, K] = [58, 106, 1.35];
  return {
    kind: "wiping-over-the-socks",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(12, 18) },
      { name: "a cloud", svg: cloud(42, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[30, 116], [96, 118], [150, 117]]) },
      ...palms(
        [
          [8, 86, 10],
          [60, 84, 9]
        ],
        "the town"
      ),
      { name: "Aishah's home", svg: home(aishahHome[0], aishahHome[1], 16, 10) },
      { name: "a home in the middle of the town", svg: home(homeAt[0], homeAt[1], 12, 8) },
      { name: "the road out of the town, on the right", svg: lane([[96, 106.4], [118, 103.6], [140, 101.6], [160, 100.4]]) },
      { name: "a camel resting by the road", svg: restingCamel(camel[0], camel[1], 0.62), loop: { move: "bob", ms: 2800, y: -0.2 } },
      { name: "the place of one on a journey, by the camel", svg: someone(journey[0], journey[1], 1.4, ON_A_JOURNEY) },
      { name: "the place of one at home, by the home", svg: someone(atHome[0], atHome[1], 1.3, AT_HOME) },
      { name: "he used to travel: a faint golden way along the road", svg: way(`M${n(ali[0] + 4)} 104.6 L118 102.4 L140 100.4 L158 99.4`, "#F3D58A", 0.9), keys: showAt(0.425, 0.44), loop: soft },
      ...days.map((x, i) => {
        const from = at3(0.64 + i * 0.02);
        return { name: `three days: a small sun ${i + 1} over the road`, svg: aDay(x, 40), keys: showAt(from, at3(from + 0.008)), loop: soft };
      }),
      ...days.map((x, i) => {
        const from = at3(0.76 + i * 0.016);
        return { name: `and three nights: a night ${i + 1} over the road`, svg: aNight(x, 49), keys: showAt(from, at3(from + 0.008)) };
      }),
      { name: "for one on a journey: a soft golden ring about its place and the camel", svg: care(n((journey[0] + camel[0]) / 2 + 2), 99.4, 15, 4.4, SOFT_GOLD), keys: showAt(0.81, 0.825), loop: soft },
      { name: "one day: a small sun over the home", svg: aDay(homeAt[0], 40), keys: showAt(0.88, 0.888), loop: soft },
      { name: "and one night over the home", svg: aNight(homeAt[0], 49), keys: showAt(0.9, 0.908) },
      { name: "for one at home: a soft golden ring about its place", svg: care(atHome[0], n(atHome[1] + 0.2), 3.4, 1.8, SOFT_GOLD), keys: showAt(0.93, 0.945), loop: soft },
      { name: "a pair of leather socks", svg: big(leatherSocks(socks[0], socks[1]), kx, ky, K), keys: showAt(0.145, 0.155) },
      {
        name: "wiping over the socks: a sheen of water passing over their tops",
        svg: big(wetSheen(n(socks[0] + 1.3), sheen), kx, ky, K),
        keys: track({
          opacity: [
            [0.17, 0],
            [0.175, 1],
            [0.205, 1],
            [0.21, 0]
          ],
          xy: [
            [0.175, 0, 0],
            [0.205, n(5.4 * K), 0]
          ]
        })
      },
      { name: "a jug of water by the socks", svg: big(jug(n(socks[0] + 13.6), n(socks[1] + 0.2)), kx, ky, K), keys: showAt(0.145, 0.155) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: answering", svg: arcs(n(aishah[0] + 2.4), n(aishah[1] - 3.2), AISHAH), keys: voice([[0.264, 0.46]]), loop: speaking },
      { name: "Ali's place", svg: someone(ali[0], ali[1], 1.5, ALI) },
      { name: "the one to ask: a soft ring about Ali's place", svg: care(ali[0], n(ali[1] + 0.2), 3.6, 1.9, ALI), keys: showAt(0.39, 0.405), loop: soft },
      { name: "Ali's voice: three days and nights, and one", svg: arcsLeft(n(ali[0] - 2.4), n(ali[1] - 3.2), ALI), keys: voice([[0.56, 0.96]]), loop: speaking },
      {
        name: "Shurayh's place, coming along the road to Aishah, then going to Ali",
        svg: someone(shurayh[0], shurayh[1], 1.5, SHURAYH),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.026, 1]
          ],
          xy: [
            [0.02, 110, -5.6],
            [0.1, 0, 0],
            [0.51, 0, 0],
            [0.55, n(atAli[0] - shurayh[0]), n(atAli[1] - shurayh[1])]
          ]
        })
      },
      { name: "Shurayh's voice: asking about wiping over the socks", svg: arcsLeft(n(shurayh[0] - 2.4), n(shurayh[1] - 3.2), SHURAYH), keys: voice([[0.142, 0.216]]), loop: speaking }
    ],
    words: linesOn(EIGHT, [
      "Shurayh ibn Hani: I came to Aishah to",
      "Ask her about wiping over the socks.",
      "She said: you better ask the son of Abu",
      "Talib, for he used to travel with the",
      "Messenger of Allah. Ali said: the",
      "Messenger of Allah stipulated three days",
      "And three nights for a traveller and",
      "One day and one night for the resident."
    ])
  };
}

// Into a lizard's hole. Abu Sa'id al-Khudri said: the Prophet ﷺ said: you will follow the ways of those nations who were
// before you, span by span and cubit by cubit, so much so that even if they entered a hole of a mastigure, you would
// follow them (Sahih al-Bukhari 7320). The words leave out the translator's words and what was asked after. No one is
// drawn: a plain with a way across it, the masjid of Madinah far off and his place by it, a golden ring; a mound of
// earth at the end of the way; Abu Sa'id's place on the right. Abu Sa'id's voice tells of it, and his voice, soft and
// golden, speaks. The places of those who were before go ahead along the way, and a faint grey trail shows behind them.
// The places of those who follow come after them along it in small steps, past small marks: span by span; then in
// longer steps, past longer marks: cubit by cubit. The hole shows in the mound, a lizard comes out of it and goes back
// in, and the places of those before go into the hole, one by one. Then those who follow go in after them, one by one,
// and a grey dashed ring comes about the hole.
function intoALizardsHole(): SignArt {
  const abuSaid: [number, number] = [152, 107];
  const his: [number, number] = [30, 84.4];
  const hole: [number, number] = [142, 94.6];
  /** Where the way is at x. */
  const wayAt = (x: number) => n(101.6 - 0.055 * (x - 12));
  const befores = [44, 52, 60, 68];
  const followers = [12, 20, 28, 36];
  const spans = [0, 1, 2, 3].map((i) => at3(0.34 + i * 0.028));
  const cubits = [0, 1, 2].map((i) => at3(0.5 + i * 0.035));
  return {
    kind: "into-a-lizards-hole",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E8F0F0", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(80, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E6CF9E", [[40, 116], [100, 118], [126, 115]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(4, 80, 0.36) },
      ...palms([[46, 82, 9]], "Madinah"),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.07, 0.96]]), loop: speaking },
      { name: "the way across the plain", svg: lane([[4, wayAt(4)], [60, wayAt(60)], [110, wayAt(110)], [134, wayAt(134)]]) },
      { name: "the ways of those before: a faint grey trail along the way", svg: way(`M${befores[0]} ${wayAt(befores[0])} L${n(befores[3] + 50)} ${wayAt(befores[3] + 50)}`, "#A8A094", 0.7), keys: showAt(0.27, 0.285) },
      {
        name: "span by span: small marks across the way",
        svg: marks(
          [0, 1, 2, 3].map((i): [number, number] => [n(followers[3] + 5 + i * 5), wayAt(followers[3] + 5 + i * 5)]),
          1.6,
          "#9A7A4E"
        ),
        keys: showAt(0.336, 0.342)
      },
      {
        name: "cubit by cubit: longer marks across the way",
        svg: marks(
          [0, 1, 2].map((i): [number, number] => [n(followers[3] + 30 + i * 10), wayAt(followers[3] + 30 + i * 10)]),
          3,
          "#9A7A4E"
        ),
        keys: showAt(0.496, 0.502)
      },
      { name: "a mound of earth at the end of the way", svg: big(mound(hole[0], hole[1]), hole[0], hole[1], 1.4) },
      { name: "a hole in the mound", svg: big(holeMouth(hole[0], hole[1]), hole[0], hole[1], 1.4), keys: showAt(0.656, 0.664) },
      {
        name: "a lizard by its hole, going into it",
        svg: big(lizardRight(n(hole[0] - 3.6), n(hole[1] + 0.4)), hole[0], hole[1], 1.25),
        keys: track({
          opacity: [
            [0.664, 0],
            [0.672, 1],
            [0.69, 1],
            [0.698, 0]
          ],
          xy: [
            [0.68, 0, 0],
            [0.698, 7, -0.5]
          ]
        })
      },
      ...befores.map((x, i) => {
        const go = at3(0.7 + (3 - i) * 0.015);
        return {
          name: `the place of one of those before ${i + 1}, going ahead, then into the hole`,
          svg: someone(x, wayAt(x), 1.5, BEFORE),
          keys: track({
            opacity: [
              [0.176, 0],
              [0.186, 1],
              [go, 1],
              [at3(go + 0.015), 0]
            ],
            xy: [
              [0.19, 0, 0],
              [0.27, 50, n(wayAt(x + 50) - wayAt(x))],
              [go, 50, n(wayAt(x + 50) - wayAt(x))],
              [at3(go + 0.015), n(hole[0] - x), n(hole[1] - wayAt(x))]
            ]
          })
        };
      }),
      ...followers.map((x, i) => {
        const go = at3(0.82 + (3 - i) * 0.02);
        const xy: [number, number, number][] = [[0.336, 0, 0]];
        spans.forEach((from, k) => {
          const dx = 5 * (k + 1);
          xy.push([at3(from + 0.018), dx, n(wayAt(x + dx) - wayAt(x))]);
          if (k < 3) xy.push([spans[k + 1], dx, n(wayAt(x + dx) - wayAt(x))]);
        });
        cubits.forEach((from, k) => {
          const before = 20 + 10 * k;
          const dx = before + 10;
          xy.push([from, before, n(wayAt(x + before) - wayAt(x))]);
          xy.push([at3(from + 0.02), dx, n(wayAt(x + dx) - wayAt(x))]);
        });
        xy.push([go, 50, n(wayAt(x + 50) - wayAt(x))]);
        xy.push([at3(go + 0.015), n(hole[0] - x), n(hole[1] - wayAt(x))]);
        return {
          name: `the place of one of those who follow ${i + 1}, coming after them, then into the hole`,
          svg: someone(x, wayAt(x), 1.5, FOLLOWING),
          keys: track({
            opacity: [
              [go, 1],
              [at3(go + 0.015), 0]
            ],
            xy
          })
        };
      }),
      { name: "a grey dashed ring about the hole", svg: greyRing(hole[0], n(hole[1] - 0.6), 9, 4.6), keys: showAt(0.92, 0.935) },
      { name: "Abu Sa'id's place", svg: someone(abuSaid[0], abuSaid[1], 1.5, ABU_SAID) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcsLeft(n(abuSaid[0] - 2.4), n(abuSaid[1] - 3.2), ABU_SAID), keys: voice([[0.024, 0.064]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Abu Sa'id al-Khudri: he said: you will",
      "Follow the ways of those nations who",
      "Were before you, span by span and cubit",
      "By cubit, so much so that even if they",
      "Entered a hole of a mastigure, you would",
      "Follow them."
    ])
  };
}

// Lead him by the hand. Ibn Abbas said: while the Prophet ﷺ was performing Tawaf of the Ka'bah, he passed by a person who
// had tied his hands to another person with a rope or string or something like that. The Prophet ﷺ cut it with his own
// hands and said: lead him by the hand (Sahih al-Bukhari 1620; and 6702: he cut that rope). No one is drawn, and no hand
// is drawn: in Makkah, the Ka'bah in the middle of its ground, the places of those about it, and Ibn Abbas's place on
// the left. Ibn Abbas's voice tells of it. The places go round the Ka'bah, and his place, a golden ring, goes round on
// the inside. Two places come along the front, one behind the other, and his place passes by them. A rope shows between
// them, and a grey dashed ring comes about it. Then the rope is cut, with a glint, and its ends are gone. His voice
// speaks, soft and golden: the one behind comes up beside the other, and they go on together, as his place goes on; a
// soft golden ring comes about the two.
function leadHimByTheHand(): SignArt {
  const ibnAbbas: [number, number] = [8, 106.8];
  const [cx, cy] = [80, 93];
  const on = (phi: number, [rx, ry]: [number, number]): [number, number] => [n(cx + rx * Math.sin(phi)), n(cy + ry * Math.cos(phi))];
  /** The tracks about the Ka'bah: the places', his on the inside, and the two's on the outside. */
  const [CROWD, INNER, OUTER]: [number, number][] = [
    [32, 7.6],
    [25, 5.8],
    [38, 10.6]
  ];
  /** Where those about the Ka'bah start, so that after half a round none stands where the two and his place come. */
  const starts = [-2.54, -1.64, -0.74, 0.46, 1.46];
  const front = on(-0.42, OUTER);
  const behind = on(-0.78, OUTER);
  const cameFrom = on(-1.45, OUTER);
  const beside: [number, number] = [n(front[0] - 2.4), n(front[1] - 3.4)];
  const onward = 12;
  const cut: [number, number] = [n((front[0] + behind[0]) / 2), n((front[1] + behind[1]) / 2 + 0.5)];
  /** A quarter round of the place that starts at `phi`, from `t0` to `t1`; then the next quarter. */
  const half = (phi: number, t0: number, t1: number): [number, number, number][] => {
    const [x0, y0] = on(phi, CROWD);
    return Array.from({ length: 7 }, (_, j): [number, number, number] => {
      const [x, y] = on(phi + (j * Math.PI) / 12, CROWD);
      return [at3(t0 + ((t1 - t0) * j) / 6), n(x - x0), n(y - y0)];
    });
  };
  const half2 = (phi: number, t0: number, t1: number): [number, number, number][] => {
    const [x0, y0] = on(phi, CROWD);
    return Array.from({ length: 7 }, (_, j): [number, number, number] => {
      const [x, y] = on(phi + Math.PI / 2 + (j * Math.PI) / 12, CROWD);
      return [at3(t0 + ((t1 - t0) * j) / 6), n(x - x0), n(y - y0)];
    });
  };
  /** His place, going round on the inside from `a` to `b` (radians), from `t0` to `t1`. */
  const his = on(-2.6, INNER);
  const byThem = on(-0.42, INNER);
  const hisRound = (a: number, b: number, t0: number, t1: number): [number, number, number][] =>
    Array.from({ length: 7 }, (_, j): [number, number, number] => {
      const [x, y] = on(a + ((b - a) * j) / 6, INNER);
      return [at3(t0 + ((t1 - t0) * j) / 6), n(x - his[0]), n(y - his[1])];
    });
  return {
    kind: "lead-him-by-the-hand",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(40, 24, 0.46, "#FFFFFF", 0.88), loop: { move: "slide", ms: 10000 } },
      { name: "the hills of Makkah", svg: hills("#A88E6A") },
      { name: "the land", svg: plainLand("#E2CB9C", [[22, 116], [60, 118], [140, 117]]) },
      { name: "homes of Makkah, far off", svg: home(12, 82.6, 10, 7) + home(26, 81.4, 9, 6) + home(134, 81.6, 10, 7) + home(148, 82.6, 9, 6) },
      { name: "the ground about the Ka'bah", svg: `<ellipse cx="80" cy="95" rx="62" ry="13" fill="#EADFC6"/>` },
      ...starts.map((phi, i) => {
        const [x, y] = on(phi, CROWD);
        return {
          name: `the place of one about the Ka'bah ${i + 1}, going round it`,
          svg: someone(x, y, 1.4, ABOUT_THE_HOUSE),
          keys: track({ xy: [...half(phi, 0.03, 0.12), ...half2(phi, 0.18, 0.28)] })
        };
      }),
      {
        name: "his place, a golden ring, going round, then passing by them",
        svg: ring(his[0], his[1], 1.7, GOLD),
        keys: track({ xy: [...hisRound(-2.6, -1.95, 0.03, 0.12), ...hisRound(-1.95, -1.3, 0.18, 0.28), ...hisRound(-1.3, -0.42, 0.34, 0.42), ...hisRound(-0.42, 0.3, 0.9, 0.95)] })
      },
      { name: "the Ka'bah", svg: kaaba(80, 90.4, 2.6) },
      { name: "a rope between the two places", svg: rope(n(behind[0] + 1.6), behind[1], n(front[0] - 1.6), front[1]), keys: showFor(0.34, 0.35, 0.7, 0.71) },
      { name: "tied: a grey dashed ring about the rope", svg: greyRing(cut[0], n(cut[1] - 0.4), 9.4, 3.4), keys: showFor(0.5, 0.515, 0.7, 0.71) },
      { name: "cut: a glint where the rope was cut", svg: glints([[cut[0], n(cut[1] - 1.4)]], 1.6), keys: showFor(0.7, 0.708, 0.73, 0.745), loop: twinkle() },
      {
        name: "the cut ends of the rope, then gone",
        svg: `<path d="M${n(behind[0] + 1.6)} ${behind[1]} L${n(cut[0] - 1.4)} ${n(cut[1] + 1)} M${n(front[0] - 1.6)} ${front[1]} L${n(cut[0] + 1.4)} ${n(cut[1] + 1)}" stroke="#8C6A3E" stroke-width="0.7" stroke-linecap="round"/>`,
        keys: showFor(0.7, 0.71, 0.73, 0.745)
      },
      {
        name: "the place ahead of the two, going on",
        svg: someone(front[0], front[1], 1.5, TIED),
        keys: track({
          opacity: [
            [0.176, 0],
            [0.186, 1]
          ],
          xy: [
            [0.186, n(cameFrom[0] - front[0] + 8), n(cameFrom[1] - front[1])],
            [0.28, 0, 0],
            [0.9, 0, 0],
            [0.95, onward, 0.5]
          ]
        })
      },
      {
        name: "the place behind it, then beside it, going on",
        svg: someone(behind[0], behind[1], 1.5, TIED),
        keys: track({
          opacity: [
            [0.176, 0],
            [0.186, 1]
          ],
          xy: [
            [0.186, n(cameFrom[0] - behind[0]), n(cameFrom[1] - behind[1])],
            [0.28, 0, 0],
            [0.86, 0, 0],
            [0.89, n(beside[0] - behind[0]), n(beside[1] - behind[1])],
            [0.9, n(beside[0] - behind[0]), n(beside[1] - behind[1])],
            [0.95, n(beside[0] - behind[0] + onward), n(beside[1] - behind[1] + 0.5)]
          ]
        })
      },
      { name: "side by side: a soft golden ring about the two", svg: care(n(front[0] + onward - 1.2), n(front[1] - 1.4), 5, 3.8, SOFT_GOLD), keys: showAt(0.952, 0.965), loop: soft },
      { name: "his voice, soft and golden: lead him", svg: arcs(n(byThem[0] + 2.6), n(byThem[1] - 2.4), SOFT_GOLD), keys: voice([[0.82, 0.89]]), loop: speaking },
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.5, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 2.4), n(ibnAbbas[1] - 3.2), IBN_ABBAS), keys: voice([[0.024, 0.444]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Ibn Abbas: while he was performing",
      "Tawaf of the Ka'bah, he passed by a",
      "Person who had tied his hands to another",
      "Person with a rope or string or",
      "Something like that. He cut it with his",
      "Own hands and said: lead him by the hand."
    ])
  };
}

// Green and sweet. Hakim ibn Hizam said: I asked the Prophet ﷺ and he gave me, and then again I asked him and he gave me,
// and then again I asked him and he gave me, and he then said: this wealth is green and sweet, and whoever takes it
// without greed, Allah will bless it for him, but whoever takes it with greed, Allah will not bless it for him, and he
// will be like the one who eats but is never satisfied. And the upper hand is better than the lower hand (Sahih
// al-Bukhari 6441; and 1472). The words leave out the translator's words, "Allah will not bless it for him" and the last
// part, so they stay short. No one is drawn, and nothing is drawn for Allah: in Madinah, the masjid far off, his place,
// a golden ring, and Hakim's place before it; a bush on the right, the place of one who takes without greed by it, and
// the place of one who takes with greed. Hakim's voice asks, three times, and each time a coin goes from his place to
// Hakim's. His voice, soft and golden, speaks: a soft ring comes about the coins, this wealth; the bush shows with its
// green fruit, a soft green light about it and glints: green and sweet. A fruit goes, slowly, to the one who takes
// without greed, and a soft golden glow and glints come about it: blessed. Fruit after fruit goes, fast, to the one
// who takes with greed; then it is gone, as food that is eaten, and a grey dashed ring comes about that place: never
// satisfied.
function greenAndSweet(): SignArt {
  const his: [number, number] = [48, 95];
  const hakim: [number, number] = [70, 104.4];
  const coinsAt: [number, number][] = [
    [75.4, 105.6],
    [79.6, 105.8],
    [83.8, 106]
  ];
  const bush: [number, number] = [122, 101];
  const content: [number, number] = [104, 106.4];
  const greedy: [number, number] = [148, 105.4];
  const gives = [0.065, 0.232, 0.342];
  const heap: [number, number][] = [
    [139.6, 106.6],
    [142.2, 106.8],
    [140.8, 105],
    [138.4, 104.8],
    [143.2, 105.2]
  ];
  return {
    kind: "green-and-sweet",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(70, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [92, 118], [130, 116]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(2, 80, 0.4) },
      ...palms(
        [
          [34, 83, 10],
          [92, 84, 11]
        ],
        "Madinah"
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 1.7, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: voice([[0.37, 0.96]]), loop: speaking },
      ...coinsAt.map(([x, y], i) => {
        const from = gives[i];
        return {
          name: `he gave: a coin ${i + 1}, going to Hakim`,
          svg: goldCoin(x, y, 1.8),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.004), 1]
            ],
            xy: [
              [from, n(his[0] + 3 - x), n(his[1] + 1 - y)],
              [at3(from + 0.018), 0, 0]
            ]
          })
        };
      }),
      { name: "this wealth: a soft ring about the coins", svg: care(coinsAt[1][0], n(coinsAt[1][1] + 0.2), 7.6, 2.8, SOFT_GOLD), keys: showAt(0.39, 0.405), loop: soft },
      { name: "green: a soft green light about the bush", svg: glow(bush[0], n(bush[1] - 8), 13, "#D8F5B0", 0.3), keys: showAt(0.455, 0.47), loop: soft },
      { name: "a bush of green fruit", svg: fruitBush(bush[0], bush[1]), keys: showAt(0.448, 0.456) },
      ...FRUIT_ON_BUSH.map(([dx, dy], i) => {
        const [x, y] = [n(bush[0] + dx), n(bush[1] + dy)];
        const base: [number, number, number][] = [];
        if (i === 0) {
          base.push([0.56, 0, 0], [0.6, n(content[0] + 4.6 - x), n(content[1] + 0.4 - y)]);
        } else if (i <= 5) {
          const from = at3(0.67 + (i - 1) * 0.012);
          const [hx, hy] = heap[i - 1];
          base.push([from, 0, 0], [at3(from + 0.012), n(hx - x), n(hy - y)]);
        }
        const gone = i >= 1 && i <= 5 ? at3(0.78 + (i - 1) * 0.012) : 0;
        return {
          name: i === 0 ? "a green fruit, taken without greed, slowly" : i <= 5 ? `a green fruit ${i}, taken with greed, fast, then gone` : "a green fruit, left on the bush",
          svg: greenFruit(x, y),
          keys: track({
            opacity:
              i >= 1 && i <= 5
                ? [
                    [0.448, 0],
                    [0.456, 1],
                    [gone, 1],
                    [at3(gone + 0.008), 0]
                  ]
                : [
                    [0.448, 0],
                    [0.456, 1]
                  ],
            ...(base.length ? { xy: base } : {})
          })
        };
      }),
      {
        name: "sweet: glints on the green fruit",
        svg: glints(FRUIT_ON_BUSH.slice(0, 4).map(([dx, dy]): [number, number] => [n(bush[0] + dx + 1.4), n(bush[1] + dy - 1.4)]), 1),
        keys: showFor(0.48, 0.495, 0.557, 0.563),
        loop: twinkle()
      },
      { name: "blessed: a soft golden glow about the one who takes without greed", svg: glow(content[0], n(content[1] - 1), 7, "#FFF3CF", 0.36), keys: showAt(0.605, 0.62), loop: soft },
      { name: "and glints over it", svg: glints([[n(content[0] - 3), n(content[1] - 4)], [n(content[0] + 3.6), n(content[1] - 4.6)]], 1.1), keys: showAt(0.62, 0.632), loop: twinkle() },
      { name: "the place of one who takes without greed", svg: someone(content[0], content[1], 1.5, CONTENT) },
      { name: "the place of one who takes with greed", svg: someone(greedy[0], greedy[1], 1.5, GREEDY) },
      { name: "never satisfied: a grey dashed ring about the one who takes with greed", svg: greyRing(n(greedy[0] - 3.6), n(greedy[1] - 0.4), 7.4, 3.2), keys: showAt(0.89, 0.905) },
      { name: "Hakim's place", svg: someone(hakim[0], hakim[1], 1.5, HAKIM) },
      {
        name: "Hakim's voice: asking, three times",
        svg: arcsLeft(n(hakim[0] - 2.4), n(hakim[1] - 3.2), HAKIM),
        keys: voice([
          [0.024, 0.06],
          [0.14, 0.19],
          [0.26, 0.298]
        ]),
        loop: speaking
      }
    ],
    words: linesOn(NINE, [
      "Hakim ibn Hizam: I asked him and he gave",
      "Me, and then again I asked him and he",
      "Gave me, and then again I asked him and",
      "He gave me and he then said: this wealth",
      "Is green and sweet, and whoever takes",
      "It without greed, Allah will bless it",
      "For him, but whoever takes it with",
      "Greed, he will be like the one who eats",
      "But is never satisfied."
    ])
  };
}

// The one bound to money. Abu Hurairah said: the Prophet ﷺ said: perish the slave of Dinar, Dirham, Qatifa and
// Khamisa, for if he is given, he is pleased; otherwise he is dissatisfied (Sahih al-Bukhari 6435). The words leave out
// the translator's words. No one is drawn: in Madinah, the masjid far off and his place by it, a golden ring; Abu
// Hurairah's place on the left; on the right, a home, the place of one bound to money before it, and by that place a
// gold dinar, a silver dirham, a thick soft cloth and a garment of marked black wool. Abu Hurairah's voice tells of it,
// and his voice, soft and golden, speaks. The place goes round its things and back: bound to them, and a grey dashed
// ring comes about it and them. Each thing glints as it is named, and the ring goes. A coin comes to its things: given,
// and a pale ring comes about the place: pleased. Then the coin is gone and the pale ring goes, and a grey dashed ring
// comes about the place: dissatisfied.
function boundToMoney(): SignArt {
  const abuHurairah: [number, number] = [12, 106.6];
  const his: [number, number] = [34, 84.4];
  const bound: [number, number] = [94, 102];
  /** The middles of the dinar and the dirham, and the feet's middles of the cloth and the garment. */
  const things: [number, number][] = [
    [104.4, 101.8],
    [111.6, 101.8],
    [121.6, 104.2],
    [135, 104.6]
  ];
  /** The cloth and the garment are drawn this many times as big, about their feet. */
  const K = 1.8;
  const given: [number, number] = [103, 97.6];
  return {
    kind: "bound-to-money",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(76, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [80, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(6, 80, 0.4) },
      ...palms(
        [
          [52, 83, 10],
          [150, 84, 10]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.09, 0.96]]), loop: speaking },
      { name: "a home", svg: home(124, 93, 18, 11) },
      { name: "a gold dinar", svg: goldCoin(things[0][0], things[0][1], 2.7) },
      { name: "a silver dirham", svg: silverCoin(things[1][0], things[1][1], 2.5) },
      { name: "a thick soft cloth", svg: big(softCloth(things[2][0], things[2][1]), things[2][0], things[2][1], K) },
      { name: "a garment of marked black wool", svg: big(markedGarment(things[3][0], things[3][1]), things[3][0], things[3][1], K) },
      { name: "the dinar glints", svg: glints([[n(things[0][0] + 2), n(things[0][1] - 3.6)]], 1.2), keys: showFor(0.28, 0.288, 0.455, 0.461), loop: twinkle() },
      { name: "the dirham glints", svg: glints([[n(things[1][0] + 2), n(things[1][1] - 3.6)]], 1.2), keys: showFor(0.32, 0.328, 0.455, 0.461), loop: twinkle() },
      { name: "the soft cloth glints", svg: glints([[n(things[2][0] + 4.4), n(things[2][1] - 6.4)]], 1.2), keys: showFor(0.37, 0.378, 0.455, 0.461), loop: twinkle() },
      { name: "the marked garment glints", svg: glints([[n(things[3][0] + 4.4), n(things[3][1] - 7.2)]], 1.2), keys: showFor(0.42, 0.428, 0.455, 0.461), loop: twinkle() },
      { name: "bound to them: a grey dashed ring about the place and its things", svg: greyRing(116.6, 101.8, 28, 6.6), keys: showFor(0.18, 0.2, 0.455, 0.461) },
      {
        name: "if given: a gold coin coming to its things, then gone when nothing is given",
        svg: goldCoin(given[0], given[1], 2.2),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.526, 1],
            [0.76, 1],
            [0.77, 0]
          ],
          xy: [
            [0.52, -44, -8],
            [0.56, 0, 0]
          ]
        })
      },
      { name: "pleased: a pale ring about the place", svg: care(bound[0], n(bound[1] + 0.2), 4.4, 2.4, PLEASED), keys: showFor(0.58, 0.595, 0.76, 0.77), loop: soft },
      { name: "dissatisfied: a grey dashed ring about the place", svg: greyRing(bound[0], n(bound[1] + 0.2), 4.6, 2.6), keys: showAt(0.82, 0.835) },
      {
        name: "the place of one bound to money, going round its things",
        svg: someone(bound[0], bound[1], 1.5, BOUND),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.048, 4, -5.6],
            [0.066, 16, -7.2],
            [0.084, 30, -7.6],
            [0.102, 44, -7.4],
            [0.12, 51.6, -3],
            [0.138, 50.6, 4.2],
            [0.156, 36, 5.4],
            [0.174, 20, 5.4],
            [0.192, 6, 4.6],
            [0.21, 0, 0]
          ]
        })
      },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ABU_HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 2.4), n(abuHurairah[1] - 3.2), ABU_HURAIRAH), keys: voice([[0.024, 0.08]]), loop: speaking }
    ],
    words: linesOn(FOUR, ["Abu Hurairah: he said: perish the slave", "Of Dinar, Dirham, Qatifa, and Khamisa,", "For if he is given, he is pleased;", "Otherwise, he is dissatisfied."])
  };
}

// Two sandals with two straps. Isa ibn Tahman said: Anas ibn Malik brought out for us two sandals having two straps.
// Thabit al-Bunani said: these were the sandals of the Prophet ﷺ (Sahih al-Bukhari 5858). No one is drawn, and no foot
// is drawn: a home with palms by it, Anas's place within its door, the places of those he brought them out for before
// it, Isa's and Thabit's among them. Isa's voice tells of it. Anas's place comes out of the home with a bundle of cloth
// beside it, and the bundle is set down on a mat before them and opened: two sandals show on it, each with two straps,
// and glints on the straps. Thabit's voice speaks, and a soft golden ring comes about the sandals: his.
function twoSandalsTwoStraps(): SignArt {
  const homeAt: [number, number] = [32, 94];
  const anasIn: [number, number] = [30.2, 92.6];
  const anas: [number, number] = [50, 102.4];
  const bundleBy: [number, number] = [56, 103.6];
  const matAt: [number, number] = [80, 101.6];
  const clothAt: [number, number] = [80, 101];
  /** The two sandals, side by side, the one behind first. */
  const sandals: [number, number][] = [
    [78.6, 99.2],
    [81.4, 102.4]
  ];
  const isa: [number, number] = [108, 104.4];
  const thabit: [number, number] = [126.4, 104];
  const others: [number, number][] = [
    [114.6, 98.6],
    [134, 99],
    [141, 105]
  ];
  return {
    kind: "two-sandals-two-straps",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(134, 18) },
      { name: "a cloud", svg: cloud(70, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [92, 118], [150, 117]]) },
      ...palms(
        [
          [10, 85, 11],
          [58, 84, 10],
          [148, 85, 11]
        ],
        "the town"
      ),
      { name: "Anas's home", svg: home(homeAt[0], homeAt[1], 18, 11) },
      { name: "a mat before them", svg: stretch(mat(matAt[0], matAt[1], 15), matAt[0], matAt[1], 2, 1.8) },
      {
        name: "Anas's place, coming out of the home",
        svg: someone(anas[0], anas[1], 1.5, ANAS),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1]
          ],
          xy: [
            [0.04, n(anasIn[0] - anas[0]), n(anasIn[1] - anas[1])],
            [0.16, 0, 0]
          ]
        })
      },
      {
        name: "a bundle of cloth, brought out beside it, then set down on the mat",
        svg: big(bundle(bundleBy[0], bundleBy[1]), bundleBy[0], bundleBy[1], 1.6),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1],
            [0.31, 1],
            [0.32, 0]
          ],
          xy: [
            [0.04, n(anasIn[0] - anas[0]), n(anasIn[1] - anas[1])],
            [0.16, 0, 0],
            [0.27, 0, 0],
            [0.3, n(clothAt[0] - bundleBy[0]), n(clothAt[1] + 1.4 - bundleBy[1])]
          ]
        })
      },
      { name: "the cloth, opened on the mat", svg: stretch(openCloth(clothAt[0], clothAt[1]), clothAt[0], clothAt[1], 1.9, 1.7), keys: showAt(0.31, 0.32) },
      {
        name: "two sandals, each with two straps",
        svg: sandals.map(([x, y]) => sandalWithTwoStraps(x, y)).join(""),
        keys: showAt(0.33, 0.345)
      },
      {
        name: "glints on the two straps of each",
        svg: glints(
          sandals.map(([x, y]): [number, number] => [n(x + 2.2), n(y - 0.6)]),
          1.1
        ),
        keys: showFor(0.37, 0.385, 0.45, 0.46),
        loop: twinkle()
      },
      { name: "his: a soft golden ring about the sandals", svg: care(clothAt[0], n(clothAt[1] - 0.2), 11, 5.4, SOFT_GOLD), keys: showAt(0.78, 0.795), loop: soft },
      { name: "the places of those with them", svg: others.map(([x, y]) => someone(x, y, 1.5, WITH_THEM)).join("") },
      { name: "Isa's place", svg: someone(isa[0], isa[1], 1.5, ISA) },
      { name: "Isa's voice: telling of it", svg: arcsLeft(n(isa[0] - 2.4), n(isa[1] - 3.2), ISA), keys: voice([[0.024, 0.2]]), loop: speaking },
      { name: "Thabit's place", svg: someone(thabit[0], thabit[1], 1.5, THABIT) },
      { name: "Thabit's voice: these were his", svg: arcsLeft(n(thabit[0] - 2.4), n(thabit[1] - 3.2), THABIT), keys: voice([[0.515, 0.95]]), loop: speaking }
    ],
    words: linesOn(FOUR, ["Isa ibn Tahman: Anas ibn Malik brought", "Out for us, two sandals having two straps.", "Thabit al-Bunani said: these were the", "Sandals of the Prophet."])
  };
}

export const GREEN_ART = {
  "wiping-over-the-socks": wipingOverTheSocks,
  "into-a-lizards-hole": intoALizardsHole,
  "lead-him-by-the-hand": leadHimByTheHand,
  "green-and-sweet": greenAndSweet,
  "bound-to-money": boundToMoney,
  "two-sandals-two-straps": twoSandalsTwoStraps
};
