import { cloud, glow, n, sky, type SignArt } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sparkle } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, glints, linesOn, mat, plainLand, SIX, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { dish } from "./worthArt";
import { curl, muskJar } from "./hopeArt";
import { jar } from "./tradeArt";
import { pulpit } from "./fairArt";
import { lane, screen } from "./freshArt";

/**
 * Small deeds and what they gain: sitting to eat what he ate; the one who bathes on Friday, goes early, sits close and
 * listens in silence, a reward in every step; thanking those who help; eating a little, a third for food, a third for
 * drink and a third for breath; beginning a du'a with oneself; and musk, the best of scents. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn,
 * and nothing comes down from the sky: a du'a or a thanks is glints that rise, and what is good is a light, glints and
 * a soft golden ring. No name, word or number is written.
 */

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

/** Zahdam al-Jarmi's place and voice: a blue green. */
const ZAHDAM = "#4E7A9A";
/** Abu Musa's place and voice: a deep brown. */
const ABU_MUSA = "#7A5C3E";
/** Aws ibn Aws's place and voice: an olive green. */
const AWS = "#5E7A4E";
/** The place of the one who goes early on Friday: a slate blue. */
const EARLY = "#4E6E8E";
/** The places of those who come later. */
const LATER = "#B49A78";
/** The voice from the minbar: a pale cream. */
const KHUTBAH = "#F4E6C8";
/** Abu Hurairah's place and voice: a soft purple. */
const HURAIRAH = "#8A6EB0";
/** The place of the one who helps: a green. */
const HELPS = "#4E8A6E";
/** The place and voice of the one who is helped and thanks: a dusty red. */
const THANKS = "#9A6E5E";
/** Al-Miqdam's place and voice: a slate. */
const MIQDAM = "#6E6A84";
/** The place of the one who eats: a soft rose. */
const EATS = "#9A6E8E";
/** Too much, or what is not good: a grey dashed ring. */
const GREYED = "#8C8C96";
/** Ubayy ibn Ka'b's place and voice: a deep teal. */
const UBAYY = "#3E6E7A";
/** The place of the one he mentions: a warm brown. */
const MENTIONED = "#C08A5E";
/** Abu Sa'id's place and voice: a moss green. */
const KHUDRI = "#6E7A3E";
/** The place and voice of the one who asks about musk: a sand brown. */
const ASKS = "#8A7A5E";

/** A roast chicken on a dish, the dish's middle at (x, y). */
const chicken = (x: number, y: number) =>
  dish(x, y) +
  `<ellipse cx="${x}" cy="${n(y - 2.4)}" rx="2.6" ry="1.5" fill="#C9863E" stroke="#A86A2E" stroke-width="0.3"/>` +
  `<ellipse cx="${n(x - 0.7)}" cy="${n(y - 3)}" rx="1.1" ry="0.45" fill="#E2A85E" opacity="0.8"/>`;

/** A piece of roast chicken, its middle at (x, y), its bone end to the right when `right`. */
const piece = (x: number, y: number, right = true) => {
  const d = right ? 1 : -1;
  return `<ellipse cx="${x}" cy="${y}" rx="1.1" ry="0.65" fill="#C9863E" stroke="#A86A2E" stroke-width="0.25"/><path d="M${n(x + d * 0.9)} ${y} L${n(x + d * 1.9)} ${n(y - 0.3)}" stroke="#F2E6D0" stroke-width="0.5" stroke-linecap="round"/>`;
};

/** A heap of food on a big dish, the dish's middle at (x, y): more than is needed. */
const heap = (x: number, y: number) =>
  `<path d="M${n(x - 3.4)} ${n(y - 1)} Q${n(x - 2.6)} ${n(y - 5.6)} ${x} ${n(y - 6.4)} Q${n(x + 2.6)} ${n(y - 5.6)} ${n(x + 3.4)} ${n(y - 1)} Z" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>` +
  [
    [-1.6, -2.6],
    [0.4, -4.4],
    [1.8, -2.4],
    [-0.4, -1.8]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.8" ry="0.6" fill="#7A2E14"/>`)
    .join("");

/** A date, its middle at (x, y). */
const date = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.8" ry="0.6" fill="#7A2E14"/>`;

/** A heap of grain in the mouth of a jar whose foot's middle is at (x, y), `s` times the jar's size. */
const grainIn = (x: number, y: number, s: number) =>
  `<path d="M${n(x - 1.8 * s)} ${n(y - 8 * s)} Q${x} ${n(y - 11.4 * s)} ${n(x + 1.8 * s)} ${n(y - 8 * s)} Z" fill="#D9B26A" stroke="#B8924E" stroke-width="0.3"/>`;

/** A clear vessel, its foot's middle at (x, y): 10 wide and 12 high, with faint lines at its thirds. */
const vessel = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 12)} L${n(x - 5)} ${n(y - 3)} Q${n(x - 5)} ${y} ${n(x - 2)} ${y} L${n(x + 2)} ${y} Q${n(x + 5)} ${y} ${n(x + 5)} ${n(y - 3)} L${n(x + 5)} ${n(y - 12)}" stroke="#7FA6C0" stroke-width="0.6" fill="#EAF4FA" fill-opacity="0.55"/>` +
  `<ellipse cx="${x}" cy="${n(y - 12)}" rx="5" ry="0.8" stroke="#7FA6C0" stroke-width="0.5" fill="#F4FAFD"/>` +
  `<path d="M${n(x - 4.6)} ${n(y - 4)} L${n(x + 4.6)} ${n(y - 4)} M${n(x - 4.6)} ${n(y - 8)} L${n(x + 4.6)} ${n(y - 8)}" stroke="#A9C6D8" stroke-width="0.35" stroke-dasharray="0.9 0.7"/>`;

/** The lowest third of the vessel whose foot's middle is at (x, y): food. */
const foodThird = (x: number, y: number) =>
  `<path d="M${n(x - 4.6)} ${n(y - 4)} L${n(x - 4.6)} ${n(y - 3)} Q${n(x - 4.6)} ${n(y - 0.4)} ${n(x - 2)} ${n(y - 0.4)} L${n(x + 2)} ${n(y - 0.4)} Q${n(x + 4.6)} ${n(y - 0.4)} ${n(x + 4.6)} ${n(y - 3)} L${n(x + 4.6)} ${n(y - 4)} Z" fill="#D9A35E"/>` +
  date(n(x - 2), n(y - 2.2)) +
  date(n(x + 0.6), n(y - 1.6)) +
  date(n(x + 2.6), n(y - 2.6));

/** The middle third of the vessel whose foot's middle is at (x, y): drink. */
const drinkThird = (x: number, y: number) => `<rect x="${n(x - 4.6)}" y="${n(y - 8)}" width="9.2" height="4" fill="#8FC4E4"/><path d="M${n(x - 4.2)} ${n(y - 7.4)} L${n(x + 4.2)} ${n(y - 7.4)}" stroke="#D8ECF8" stroke-width="0.4"/>`;

/** The top third of the vessel whose foot's middle is at (x, y), left empty: soft curls of air, for breath. */
const breathThird = (x: number, y: number) => curl(n(x - 2.2), n(y - 8.4), "#FFFFFF", 3.4) + curl(n(x + 1.8), n(y - 8.4), "#FFFFFF", 3.4);

// Sit and eat. Zahdam al-Jarmi said: I entered upon Abu Musa while he was eating chicken, and he said: sit and eat, for
// indeed I saw the Messenger of Allah ﷺ eating it (Jami at-Tirmidhi 1826). The lines name Abu Musa where the English
// page says "he said", since he alone means the Prophet ﷺ in the lines. No one is drawn: Abu Musa's home in the middle,
// a mat before it and his place on it; a lane from the left. Zahdam's voice tells of it, and his place comes along the
// lane to the mat. A dish of chicken shows on the mat, and a piece of it goes to Abu Musa's place: he eats. Abu Musa's
// voice speaks; Zahdam's place sits at the mat, and a piece goes to it too. Then, far off on the right, the masjid of
// Madinah shows, with his place, a golden ring, and a dish of chicken before it: what Abu Musa saw. A soft golden ring
// comes about the dish on the mat, and glints over it.
function sitAndEat(): SignArt {
  const musa: [number, number] = [93.4, 104.6];
  const zahdam: [number, number] = [18, 104.2];
  const came: [number, number] = [70, 104.6];
  const sat: [number, number] = [76.6, 104.8];
  const dishAt: [number, number] = [84.6, 106.4];
  const his: [number, number] = [127, 103.6];
  const hisDish: [number, number] = [133, 105.8];
  const toCame: [number, number] = [n(came[0] - zahdam[0]), n(came[1] - zahdam[1])];
  const toSat: [number, number] = [n(sat[0] - zahdam[0]), n(sat[1] - zahdam[1])];
  const pieceA: [number, number] = [n(dishAt[0] + 3.4), n(dishAt[1] - 1.6)];
  const pieceZ: [number, number] = [n(dishAt[0] - 3.4), n(dishAt[1] - 1.6)];
  return {
    kind: "sit-and-eat",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(110, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[42, 92, 7]], "the lane"),
      { name: "al-Ash'ari's home", svg: home(84, 99, 24, 12) },
      { name: "far off: the masjid of Madinah, what al-Ash'ari saw", svg: madinahMasjid(114, 100, 0.6), keys: showAt(0.77, 0.79) },
      { name: "his place, a golden ring, by it", svg: ring(his[0], his[1], 2.6, GOLD), keys: showAt(0.77, 0.79) },
      { name: "a dish of chicken before his place", svg: chicken(hisDish[0], hisDish[1]), keys: showAt(0.79, 0.81) },
      { name: "the lane", svg: lane([[12, 104.4], [44, 104.8], [70, 104.4]]) },
      { name: "a mat before the home", svg: mat(dishAt[0], n(dishAt[1] + 0.2), 18) },
      { name: "a dish of chicken on the mat", svg: chicken(dishAt[0], dishAt[1]), keys: showAt(0.27, 0.285) },
      {
        name: "a piece of it, eaten: going to al-Ash'ari's place",
        svg: piece(pieceA[0], pieceA[1]),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.285, 1],
            [0.37, 1],
            [0.39, 0]
          ],
          xy: [
            [0.33, 0, 0],
            [0.37, n(musa[0] - 1.6 - pieceA[0]), n(musa[1] + 0.4 - pieceA[1])]
          ]
        })
      },
      {
        name: "a piece of it for Zahdam: going to Zahdam's place",
        svg: piece(pieceZ[0], pieceZ[1], false),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.285, 1],
            [0.7, 1],
            [0.712, 0]
          ],
          xy: [
            [0.67, 0, 0],
            [0.7, n(sat[0] + 1.6 - pieceZ[0]), n(sat[1] + 0.4 - pieceZ[1])]
          ]
        })
      },
      { name: "al-Ash'ari's place, on the mat", svg: someone(musa[0], musa[1], 1.5, ABU_MUSA) },
      {
        name: "Zahdam's place, coming along the lane, then sitting at the mat",
        svg: someone(zahdam[0], zahdam[1], 1.5, ZAHDAM),
        keys: track({
          xy: [
            [0.1, 0, 0],
            [0.21, toCame[0], toCame[1]],
            [0.6, toCame[0], toCame[1]],
            [0.66, toSat[0], toSat[1]]
          ]
        })
      },
      { name: "Zahdam's voice: telling of it", svg: arcsLeft(n(zahdam[0] - 2.4), n(zahdam[1] - 3.2), ZAHDAM), keys: showFor(0.024, 0.03, 0.084, 0.09), loop: speaking },
      { name: "al-Ash'ari's voice: sit and eat", svg: arcs(n(musa[0] + 2.6), n(musa[1] - 3.2), ABU_MUSA), keys: showFor(0.52, 0.526, 0.84, 0.846), loop: speaking },
      { name: "a soft golden ring about the dish on the mat", svg: care(dishAt[0], n(dishAt[1] + 0.2), 6.4, 2.2, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "glints over it", svg: glints([[79.4, 101.2], [89.6, 100.8]]), keys: showAt(0.88, 0.895), loop: twinkle() }
    ],
    words: linesOn(FOUR, ["Zahdam al-Jarmi: I entered upon", "Abu Musa while he was eating chicken,", "And Abu Musa said: sit and eat, for", "Indeed I saw him eating it."])
  };
}

// A year for each step. Aws ibn Aws said: the Messenger of Allah ﷺ said to me: whoever performs ghusl on Friday, and
// bathes completely, and goes early, arriving early, gets close and listens and is silent, there will be for him in
// every step he takes the reward of a year of fasting and standing (Jami at-Tirmidhi 496). "And bathes completely" is
// left out of the lines and the caption, since what that word means is not agreed; "he take" is mended to "he takes".
// No one is drawn: on a Friday morning, a home on the left with a cloth hung for cover by it, and the place of one by
// it; the masjid of Madinah on the right, with the minbar before it. Aws's voice tells of it. The place goes behind the
// cloth, water glints over it, and it comes out with a clear light about it. It goes along the lane early, a glint
// showing at each step, and sits close by the minbar while no one else has come. A voice speaks from the minbar; the
// places of others come later and sit further off, and a soft light comes about the place, still and silent,
// listening. Then the glints of its steps rise, each becomes a soft golden light, and a soft golden ring comes about it.
function aYearForEachStep(): SignArt {
  const by: [number, number] = [22, 104.2];
  const washed: [number, number] = [34, 104.2];
  const out: [number, number] = [46, 104.4];
  const close: [number, number] = [114.6, 104.8];
  const later: [number, number][] = [
    [124, 105],
    [132, 104.6],
    [140, 105.2]
  ];
  const aws: [number, number] = [154, 106.8];
  const steps = [52, 59, 66, 73, 80, 87, 94, 101];
  const stepY = 107.2;
  const walk = (x: number) => Math.round((0.34 + ((x - out[0]) / (close[0] - out[0])) * 0.1) * 1000) / 1000;
  const goes: [number, number, number][] = [
    [0.18, 0, 0],
    [0.2, n(washed[0] - by[0]), 0],
    [0.25, n(washed[0] - by[0]), 0],
    [0.27, n(out[0] - by[0]), n(out[1] - by[1])],
    [0.34, n(out[0] - by[0]), n(out[1] - by[1])],
    [0.44, n(close[0] - by[0]), n(close[1] - by[1])]
  ];
  return {
    kind: "a-year-for-each-step",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C9E6F8", "#EEF5F2", 62) },
      { name: "the sun, low in the morning", svg: sun(20, 38) },
      { name: "a cloud", svg: cloud(90, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "a home on the left", svg: home(14, 99, 18, 10) },
      { name: "the masjid of Madinah", svg: madinahMasjid(104, 100, 0.9) },
      { name: "the minbar before it", svg: pulpit(104, 104.8) },
      { name: "the lane", svg: lane([[44, 104.6], [76, 105.4], [104, 105.4]]) },
      ...steps.map((x, i) => ({
        name: `a step taken: a glint ${i + 1}, then rising`,
        svg: sparkle(x, stepY, 1, "#FFE7A0"),
        keys: track({
          opacity: [
            [walk(x), 0],
            [Math.round((walk(x) + 0.006) * 1000) / 1000, 1]
          ],
          xy: [
            [0.66, 0, 0],
            [0.72, 0, -6]
          ]
        }),
        loop: twinkle(1200 + i * 100)
      })),
      { name: "a year's reward for each step: soft golden lights", svg: steps.map((x) => glow(x, n(stepY - 6), 2.2, "#FFE7A0", 0.2)).join(""), keys: showAt(0.82, 0.84), loop: soft },
      {
        name: "the place of the one who bathes on Friday, then going early and sitting close",
        svg: someone(by[0], by[1], 1.5, EARLY),
        keys: track({ xy: goes })
      },
      { name: "a cloth hung for cover", svg: screen(28, 40, 92.4, 107.8) },
      { name: "washing: glints of water over the cloth", svg: glints([[31.6, 90.8], [35.4, 90]]), keys: showFor(0.205, 0.211, 0.235, 0.241), loop: twinkle() },
      {
        name: "washed: a clear light about its place, going with it",
        svg: glow(washed[0], n(washed[1] - 0.6), 3.8, "#E6F4FF", 0.2),
        keys: track({
          opacity: [
            [0.25, 0],
            [0.26, 1]
          ],
          xy: [
            [0.25, 0, 0],
            [0.27, n(out[0] - washed[0]), n(out[1] - washed[1])],
            [0.34, n(out[0] - washed[0]), n(out[1] - washed[1])],
            [0.44, n(close[0] - washed[0]), n(close[1] - washed[1])]
          ]
        }),
        loop: soft
      },
      ...later.map(([x, y], i) => ({
        name: `the place of one who comes later ${i + 1}, sitting further off`,
        svg: someone(x, y, 1.5, LATER),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.54, 1]
          ],
          xy: [
            [0.52, 8, 0],
            [0.58, 0, 0]
          ]
        })
      })),
      { name: "a voice from the minbar", svg: arcs(107, 96.2, KHUTBAH), keys: showFor(0.5, 0.506, 0.75, 0.756), loop: speaking },
      { name: "listening, silent: a soft light about its place", svg: glow(close[0], n(close[1] - 0.6), 4.2, "#FFF3CF", 0.2), keys: showAt(0.53, 0.545), loop: soft },
      { name: "a soft golden ring about its place", svg: care(close[0], n(close[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.88, 0.895), loop: soft },
      { name: "Aws's place", svg: someone(aws[0], aws[1], 1.5, AWS) },
      { name: "Aws's voice: telling of it", svg: arcsLeft(n(aws[0] - 2.4), n(aws[1] - 3.2), AWS), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Aws ibn Aws: he said to me: whoever",
      "Performs ghusl on Friday, and goes",
      "Early, arriving early, gets close and",
      "Listens and is silent, there will be for",
      "Him in every step he takes the reward",
      "Of a year of fasting and standing."
    ])
  };
}

// Thank people too. Abu Hurairah said: the Messenger of Allah ﷺ said: whoever is not grateful to the people, he is not
// grateful to Allah (Jami at-Tirmidhi 1954). No one is drawn: a home on the left with the place of one by it, and a
// home on the right with the place of another. Abu Hurairah's voice tells of it. The place on the left brings a basket
// of dates along the lane and sets it down by the other: help. The other's voice speaks, soft, and glints go from it
// to the one who helped, and a soft light comes about that place: thanked. Then glints rise from the place of the one
// who thanked, and a soft golden ring comes about it.
function thankPeopleToo(): SignArt {
  const helps: [number, number] = [30, 104.2];
  const came: [number, number] = [94, 104.6];
  const thanks: [number, number] = [106, 104.2];
  const basketAt: [number, number] = [34.4, 104.8];
  const setDown: [number, number] = [112, 106.6];
  const hurairah: [number, number] = [154, 106.8];
  const back: [number, number][] = [
    [-2, -4],
    [0, -5.2],
    [2, -4]
  ];
  const up: [number, number][] = [
    [-2.2, -4.2],
    [0, -5.6],
    [2.2, -4.2]
  ];
  const toCame: [number, number] = [n(came[0] - helps[0]), n(came[1] - helps[1])];
  return {
    kind: "thank-people-too",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(70, 20) },
      { name: "a cloud", svg: cloud(126, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[64, 92, 7.4]], "the lane"),
      { name: "a home on the left", svg: home(22, 99, 18, 10) },
      { name: "a home on the right", svg: home(110, 98.6, 20, 11) },
      { name: "the lane", svg: lane([[30, 103.4], [70, 104.2], [100, 103.6]]) },
      {
        name: "a basket of dates, brought and set down: help",
        svg: basketOfDates(basketAt[0], basketAt[1]),
        keys: track({
          xy: [
            [0.06, 0, 0],
            [0.2, toCame[0], toCame[1]],
            [0.22, toCame[0], toCame[1]],
            [0.25, n(setDown[0] - basketAt[0]), n(setDown[1] - basketAt[1])]
          ]
        })
      },
      { name: "the place of the one who helps, bringing it", svg: someone(helps[0], helps[1], 1.5, HELPS), keys: track({ xy: [[0.06, 0, 0], [0.2, toCame[0], toCame[1]]] }) },
      { name: "the place of the one who is helped", svg: someone(thanks[0], thanks[1], 1.5, THANKS) },
      { name: "its voice, soft: thanking", svg: arcsLeft(n(thanks[0] - 2.4), n(thanks[1] - 3.2), THANKS), keys: showFor(0.34, 0.346, 0.5, 0.506), loop: speaking },
      ...back.map(([dx, dy], i) => ({
        name: `its thanks: a glint ${i + 1}, going to the one who helped`,
        svg: sparkle(n(thanks[0] + dx), n(thanks[1] + dy), 0.8, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.38, 0],
            [0.39, 1],
            [0.5, 1],
            [0.52, 0]
          ],
          xy: [
            [0.4, 0, 0],
            [0.46, n(came[0] - thanks[0]), n(came[1] - thanks[1])]
          ]
        }),
        loop: twinkle(1200 + i * 150)
      })),
      { name: "thanked: a soft light about the place of the one who helped", svg: glow(came[0], n(came[1] - 0.6), 4, "#FFF3CF", 0.2), keys: showAt(0.47, 0.485), loop: soft },
      ...up.map(([dx, dy], i) => ({
        name: `its thanks rising too: a glint ${i + 1}`,
        svg: sparkle(n(thanks[0] + dx), n(thanks[1] + dy), 0.8, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.68, 0],
            [0.69, 1]
          ],
          xy: [
            [0.69, 0, 0],
            [0.76, 0, -9]
          ]
        }),
        loop: twinkle(1300 + i * 150)
      })),
      { name: "a soft golden ring about the one who thanked", svg: care(thanks[0], n(thanks[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.8, 0.815), loop: soft },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(hurairah[0] - 2.4), n(hurairah[1] - 3.2), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(THREE, ["Abu Hurairah: he said: whoever is not", "Grateful to the people, he is not", "Grateful to Allah."])
  };
}

// A third for food. Al-Miqdam ibn Ma'dikarib said: I heard the Messenger of Allah ﷺ saying: the human does not fill any
// container that is worse than his stomach. It is sufficient for the son of Adam to eat what will support his back. If
// this is not possible, then a third for food, a third for drink, and a third for his breath (Jami at-Tirmidhi 2380).
// "And third" is mended to "and a third". No one is drawn, and nothing of a body: the masjid of Madinah on the left and
// his place, a golden ring, by it; a home on the right, a mat before it, and the place of one who eats on it. Al-Miqdam's
// voice tells of it, and his voice speaks, soft and golden. A clay jar fills with grain to its top: a container filled.
// A big dish heaped with food is set before the one who eats; the food goes to its place, and a grey dashed ring comes
// about it: too much. The grey ring goes; a few dates show on the dish and go to its place, and it rises upright. Then a
// clear vessel shows, and its thirds fill one after another: food, then drink, and the top third stays empty, with
// soft curls of air. A soft golden ring comes about it.
function aThirdForFood(): SignArt {
  const his: [number, number] = [40, 103.6];
  const eats: [number, number] = [113, 104.6];
  const dishAt: [number, number] = [104, 106.4];
  const jarAt: [number, number] = [95, 106];
  const vesselAt: [number, number] = [131, 106.8];
  const miqdam: [number, number] = [154, 106.8];
  const few: [number, number][] = [
    [-1.4, -1.8],
    [0.2, -2.4],
    [1.6, -1.7]
  ];
  return {
    kind: "a-third-for-food",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(78, 20) },
      { name: "a cloud", svg: cloud(130, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[62, 92, 7.4]], "the lane"),
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.6) },
      { name: "a home on the right", svg: home(104, 98.6, 22, 11) },
      { name: "the lane", svg: lane([[44, 105], [70, 105.6], [92, 104.8]]) },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.145, 0.151, 0.9, 0.906), loop: speaking },
      { name: "a mat before the home", svg: mat(dishAt[0], n(dishAt[1] + 0.2), 20) },
      { name: "a clay jar", svg: jar(jarAt[0], jarAt[1], 1.1) },
      { name: "filled to its top: a heap of grain in it", svg: grainIn(jarAt[0], jarAt[1], 1.1), origin: { x: jarAt[0], y: n(jarAt[1] - 8.8) }, keys: track({ opacity: [[0.15, 0], [0.16, 1]], scaleY: [[0.15, 0.2], [0.21, 1]] }) },
      { name: "a big dish", svg: dish(dishAt[0], dishAt[1]), keys: showAt(0.27, 0.285) },
      {
        name: "heaped with food, then eaten up: going to the place of the one who eats",
        svg: heap(dishAt[0], dishAt[1]),
        origin: { x: dishAt[0], y: n(dishAt[1] - 3) },
        keys: track({
          opacity: [
            [0.27, 0],
            [0.285, 1],
            [0.41, 1],
            [0.43, 0]
          ],
          xy: [
            [0.39, 0, 0],
            [0.43, n(eats[0] - dishAt[0]), n(eats[1] - dishAt[1] + 1)]
          ],
          scale: [
            [0.39, 1],
            [0.43, 0.3]
          ]
        })
      },
      ...few.map(([dx, dy], i) => ({
        name: `a few bites: a date ${i + 1}, eaten`,
        svg: date(n(dishAt[0] + dx), n(dishAt[1] + dy)),
        keys: track({
          opacity: [
            [0.53, 0],
            [0.545, 1],
            [0.575, 1],
            [0.585, 0]
          ],
          xy: [
            [0.55, 0, 0],
            [0.575, n(eats[0] - 1.4 - dishAt[0] - dx), n(eats[1] + 0.6 - dishAt[1] - dy)]
          ]
        })
      })),
      { name: "the place of the one who eats, then rising upright", svg: someone(eats[0], eats[1], 1.5, EATS), keys: track({ xy: [[0.56, 0, 0], [0.585, 0, -1.2]] }) },
      { name: "too much: a grey dashed ring about it", svg: care(eats[0], n(eats[1] + 0.6), 4, 2, GREYED), keys: track({ opacity: [[0.43, 0], [0.445, 1], [0.51, 1], [0.53, 0]] }) },
      { name: "a clear vessel", svg: vessel(vesselAt[0], vesselAt[1]), keys: showAt(0.635, 0.65) },
      { name: "a third for food", svg: foodThird(vesselAt[0], vesselAt[1]), keys: showAt(0.756, 0.77) },
      { name: "a third for drink", svg: drinkThird(vesselAt[0], vesselAt[1]), keys: showAt(0.79, 0.805) },
      { name: "a third left for breath: soft curls of air", svg: breathThird(vesselAt[0], vesselAt[1]), keys: showAt(0.88, 0.895), loop: soft },
      { name: "a soft golden ring about it", svg: care(vesselAt[0], n(vesselAt[1] + 0.2), 6.6, 2, SOFT_GOLD), keys: showAt(0.92, 0.935), loop: soft },
      { name: "Al-Miqdam's place", svg: someone(miqdam[0], miqdam[1], 1.5, MIQDAM) },
      { name: "Al-Miqdam's voice: telling of it", svg: arcsLeft(n(miqdam[0] - 2.4), n(miqdam[1] - 3.2), MIQDAM), keys: showFor(0.024, 0.03, 0.09, 0.096), loop: speaking }
    ],
    words: linesOn(EIGHT, [
      "Al-Miqdam ibn Ma'dikarib: I heard him",
      "Saying: the human does not fill any",
      "Container that is worse than his",
      "Stomach. It is sufficient for the son of",
      "Adam to eat what will support his back.",
      "If this is not possible, then a third for",
      "Food, a third for drink, and a third for",
      "His breath."
    ])
  };
}

// Begin with yourself. Ubayy ibn Ka'b said that whenever the Messenger of Allah ﷺ would mention someone and supplicate
// for him, he would begin with himself (Jami at-Tirmidhi 3385). No one is drawn: the masjid of Madinah on the left and
// his place, a golden ring, by it; a home far along the lane on the right and the place of one by it. Ubayy's voice
// tells of it. His voice speaks, soft and golden, and a faint golden way shows from his place to the far one, and a soft
// light comes about it: he mentions it. Then glints rise over his own place first, and only then over the far place;
// soft golden rings come about both.
function beginWithYourself(): SignArt {
  const his: [number, number] = [46, 103.6];
  const mentioned: [number, number] = [120, 104.2];
  const ubayy: [number, number] = [154, 106.8];
  const rise: [number, number][] = [
    [-2.2, -4.6],
    [0, -6],
    [2.2, -4.6]
  ];
  const way = `<path d="M${n(his[0] + 4)} ${n(his[1] + 0.4)} Q${n((his[0] + mentioned[0]) / 2)} ${n(his[1] - 4)} ${n(mentioned[0] - 3)} ${n(mentioned[1] + 0.2)}" stroke="${SOFT_GOLD}" stroke-width="0.6" stroke-dasharray="1.2 1.2" fill="none" opacity="0.7"/>`;
  const glintsOver = (at: [number, number], from: number, label: string) =>
    rise.map(([dx, dy], i) => ({
      name: `${label}: a glint ${i + 1}, rising`,
      svg: sparkle(n(at[0] + dx), n(at[1] + dy), 0.85, "#FFE7A0"),
      keys: track({
        opacity: [
          [from, 0],
          [Math.round((from + 0.01) * 1000) / 1000, 1]
        ],
        xy: [
          [Math.round((from + 0.01) * 1000) / 1000, 0, 0],
          [Math.round((from + 0.06) * 1000) / 1000, 0, -8]
        ]
      }),
      loop: twinkle(1200 + i * 150)
    }));
  return {
    kind: "begin-with-yourself",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(96, 20) },
      { name: "a cloud", svg: cloud(136, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[88, 92, 7.4]], "the lane"),
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 100, 0.66) },
      { name: "a home far along the lane", svg: home(118, 98, 16, 10) },
      { name: "the lane", svg: lane([[54, 105.4], [90, 105.6], [114, 104.6]]) },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: a du'a", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.34, 0.346, 0.9, 0.906), loop: speaking },
      { name: "mentioned: a faint golden way to the far place", svg: way, keys: showAt(0.4, 0.42) },
      { name: "the place of the one he mentions", svg: someone(mentioned[0], mentioned[1], 1.5, MENTIONED) },
      { name: "a soft light about it", svg: glow(mentioned[0], n(mentioned[1] - 0.6), 4, "#FFF3CF", 0.2), keys: showAt(0.44, 0.455), loop: soft },
      ...glintsOver(his, 0.68, "for himself first"),
      ...glintsOver(mentioned, 0.76, "then for the other"),
      { name: "a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "a soft golden ring about the far place", svg: care(mentioned[0], n(mentioned[1] + 0.6), 4, 2, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "Ubayy's place", svg: someone(ubayy[0], ubayy[1], 1.5, UBAYY) },
      { name: "Ubayy's voice: telling of it", svg: arcsLeft(n(ubayy[0] - 2.4), n(ubayy[1] - 3.2), UBAYY), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(THREE, ["Ubayy ibn Ka'b: whenever he would", "Mention someone and supplicate for", "Him, he would begin with himself."])
  };
}

// Musk, the best scent. Abu Sa'id said that the Prophet ﷺ was asked about musk, and he said: it is the best of your
// perfumes (Jami at-Tirmidhi 992). No one is drawn: the masjid of Madinah on the left and his place, a golden ring, by
// it; homes on the right. Abu Sa'id's voice tells of it. The place of one comes along the lane with a small jar of
// musk, closed, and its voice asks. His voice answers, soft and golden, and soft golden curls of scent rise from the
// jar. Then a soft golden ring comes about the jar, and the same curls show far off by the homes: its scent goes far.
function muskTheBestScent(): SignArt {
  const his: [number, number] = [46, 103.6];
  const asks: [number, number] = [100, 104.6];
  const came: [number, number] = [64, 104.4];
  const jarAt: [number, number] = [104, 106.6];
  const khudri: [number, number] = [154, 106.8];
  const toCame: [number, number] = [n(came[0] - asks[0]), n(came[1] - asks[1])];
  const jarCame: [number, number] = [n(jarAt[0] + toCame[0]), n(jarAt[1] + toCame[1])];
  const scent = (x: number, y: number) => curl(n(x - 1.2), y, SOFT_GOLD, 6) + curl(n(x + 1.2), n(y - 0.6), SOFT_GOLD, 7);
  return {
    kind: "musk-the-best-scent",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(100, 20) },
      { name: "a cloud", svg: cloud(60, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[84, 92, 7.2]], "the lane"),
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 100, 0.66) },
      { name: "homes on the right", svg: home(118, 98.4, 14, 9) + home(140, 99, 13, 8.6) },
      { name: "the lane", svg: lane([[52, 105.4], [80, 105.6], [112, 104.4]]) },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "a small jar of musk, closed, brought along the lane", svg: muskJar(jarAt[0], jarAt[1]), keys: track({ xy: [[0.1, 0, 0], [0.18, toCame[0], toCame[1]]] }) },
      { name: "the place of the one who asks, bringing it", svg: someone(asks[0], asks[1], 1.5, ASKS), keys: track({ xy: [[0.1, 0, 0], [0.18, toCame[0], toCame[1]]] }) },
      { name: "its voice: asking about musk", svg: arcsLeft(n(came[0] - 2.4), n(came[1] - 3.2), ASKS), keys: showFor(0.2, 0.206, 0.264, 0.27), loop: speaking },
      { name: "his voice, soft and golden: the best of your perfumes", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.34, 0.346, 0.6, 0.606), loop: speaking },
      { name: "its scent: soft golden curls rising from the jar", svg: scent(jarCame[0], n(jarCame[1] - 9.2)), keys: track({ opacity: [[0.38, 0], [0.395, 1]], xy: [[0.4, 0, 0], [0.46, 0, -2]] }), loop: soft },
      { name: "a soft golden ring about the jar", svg: care(jarCame[0], n(jarCame[1] + 0.2), 4, 1.8, SOFT_GOLD), keys: showAt(0.69, 0.705), loop: soft },
      { name: "its scent far off, by the homes", svg: scent(116, 86) + scent(142, 87.4), keys: showAt(0.74, 0.76), loop: soft },
      { name: "Abu Sa'id's place", svg: someone(khudri[0], khudri[1], 1.5, KHUDRI) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcsLeft(n(khudri[0] - 2.4), n(khudri[1] - 3.2), KHUDRI), keys: showFor(0.024, 0.03, 0.09, 0.096), loop: speaking }
    ],
    words: linesOn(THREE, ["Abu Sa'id: he was asked about musk,", "And he said: it is the best of your", "Perfumes."])
  };
}

export const GAIN_ART = {
  "sit-and-eat": sitAndEat,
  "a-year-for-each-step": aYearForEachStep,
  "thank-people-too": thankPeopleToo,
  "a-third-for-food": aThirdForFood,
  "begin-with-yourself": beginWithYourself,
  "musk-the-best-scent": muskTheBestScent
} as const;
