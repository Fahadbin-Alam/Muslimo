import { cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, wash } from "./worshipArt";
import { care, DAWN, farOff, gardenIn, palms, sparkRising, tent, track } from "./daysArt";
import { soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, FOLK, glints, ITS_VOICE, linesOn, mat, places, plainLand, twinkle } from "./shareArt";
import { farHills, insideTheMasjid } from "./wideArt";
import { at3 } from "./storyArt";
import { coins } from "./tradeArt";
import { smallLight } from "./hourArt";

/**
 * What is better: a place in Paradise the length of a bow, better than the whole earth the sun rises and sets on; the
 * handkerchiefs of Sa'd ibn Mu'adh, better and softer than a silken cloth all admired; waiting forty rather than
 * passing in front of one praying; respite for one hard up, or the debt remitted; the seven pebbles of each Jamrah, each
 * with a Takbir, and the long du'a after them; and the pillar Salamah sought to pray by, for he had seen the Prophet ﷺ
 * pray there. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no
 * person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed
 * circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and
 * nothing comes down from the sky: a prayer or a du'a is a spark that rises, what is good is a light, glints and a soft
 * golden ring. Paradise is only far off, in a soft circle of light with no sun in it. No name, word or number is written.
 */

/** The words of five lines, the last longer: the sun rises and sets. */
const RISES_AND_SETS = [
  [0.02, 0.17],
  [0.186, 0.34],
  [0.356, 0.5],
  [0.516, 0.66],
  [0.676, 1]
] as const;

/** The words of seven lines. */
const SEVEN_LINES = [
  [0.02, 0.15],
  [0.162, 0.29],
  [0.302, 0.43],
  [0.442, 0.57],
  [0.582, 0.71],
  [0.722, 0.85],
  [0.862, 1]
] as const;

/** The words of eight lines, the third longer: seven pebbles, one after another. */
const PEBBLES = [
  [0.02, 0.125],
  [0.135, 0.24],
  [0.25, 0.41],
  [0.42, 0.525],
  [0.535, 0.64],
  [0.65, 0.755],
  [0.765, 0.87],
  [0.88, 1]
] as const;

/** A sky at sunset: dusky above, warm low down over the hills. */
const SUNSET = `<rect width="160" height="120" fill="#5E5A8C"/><rect y="26" width="160" height="16" fill="#8E6E96"/><rect y="42" width="160" height="10" fill="#D38C82"/><rect y="52" width="160" height="10" fill="#F2B486"/>`;

/** A lane of Madinah between homes: a pale band from y 90 to y 97. */
const lane = () => `<path d="M0 90 L160 90 L160 97 L0 97 Z" fill="#EAD7AE"/><path d="M0 97 L160 97" stroke="#D2B886" stroke-width="0.5"/>`;

/** A Jamrah: a stone pillar in a low round basin, its middle at x, the basin's rim at y 100. */
const jamrah = (x: number) =>
  `<ellipse cx="${x}" cy="100.6" rx="7.4" ry="2.4" fill="#A89676"/><ellipse cx="${x}" cy="100" rx="6.4" ry="1.8" fill="#C9B898"/>` +
  `<rect x="${n(x - 2)}" y="86" width="4" height="14" rx="0.6" fill="#B9A88E"/><path d="M${n(x - 2)} 86 L${n(x + 2)} 86" stroke="#9C8A6C" stroke-width="0.6"/>`;

/** Seven small stones about (x, y), as they lie in a basin. */
const sevenIn = (x: number, y: number) =>
  [-3, -2, -1, 0, 1, 2, 3].map((k, i) => `<circle cx="${n(x + k * 1.1)}" cy="${n(y + (i % 2) * 0.5)}" r="0.5" fill="#7E7466"/>`).join("");

// A bow's length. Abu Hurairah said: the Prophet ﷺ said: a place in Paradise equal to an arrow bow of one of you is
// better than the whole earth on which the sun rises and sets (Sahih al-Bukhari 3253; the tree before it is drawn in
// the scene of a tree of a hundred years). No one is drawn: a wide land in the dim light before sunrise, with hills,
// a river, a town far off and palms. His place, a golden ring, is on the land, and Abu Hurairah's place by it. Abu
// Hurairah's voice tells of it, and his voice speaks. Paradise shows far off, a soft circle of light with a garden in
// it, and a small patch of light in its garden: a place in it; a short curved line under the patch, as long as it:
// equal to a bow of one of you. Glints come about the patch: better, and a soft light passes over the whole land: the
// whole earth. The sun rises over the land, crosses the sky by day and sets; the land dims again, and a soft golden ring
// comes about the small place: better than all of it.
function aBowsLength(): SignArt {
  const his: [number, number] = [88, 104];
  const hurairah: [number, number] = [74, 107];
  const [px, py] = [130, 29.6];
  return {
    kind: "a-bows-length",
    ms: 12000,
    parts: [
      { name: "the sky before sunrise", svg: DAWN },
      {
        name: "the sky by day",
        svg: sky("#BFE3FA", "#E3F2FB", 62),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.74, 1]
          ]
        })
      },
      {
        name: "the sky at sunset",
        svg: SUNSET,
        keys: track({
          opacity: [
            [0.9, 0],
            [0.95, 1]
          ]
        })
      },
      {
        name: "the sun: rising, crossing the sky and setting",
        svg: sun(14, 78),
        keys: track({
          xy: [
            [0.68, 0, 0],
            [0.72, 4, -22],
            [0.76, 14, -38],
            [0.8, 30, -48],
            [0.82, 38, -50],
            [0.86, 54, -46],
            [0.9, 70, -34],
            [0.93, 80, -18],
            [0.955, 86, 0]
          ]
        })
      },
      { name: "Paradise, far off: a soft circle of light with a garden in it", svg: farOff(130, 24, 12) + gardenIn(130, 24, 12), keys: showAt(0.19, 0.205), loop: soft },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[18, 116], [104, 117], [150, 117]]) },
      { name: "a river winding over the land", svg: `<path d="M160 72 Q132 78 112 75 Q86 71 66 79 Q44 88 0 86" stroke="#86B8DC" stroke-width="2.2" fill="none"/>` },
      { name: "homes of a town far off", svg: home(24, 72, 9, 6) + home(35, 71.4, 7, 5) + home(120, 70.6, 8, 5.4) },
      ...palms(
        [
          [50, 74, 9],
          [58, 75, 8],
          [142, 76, 9]
        ],
        "the land"
      ),
      {
        name: "the dim light before sunrise, over the land",
        svg: `<rect y="61" width="160" height="59" fill="#2E3D6E" opacity="0.28"/>`,
        keys: track({
          opacity: [
            [0.69, 1],
            [0.74, 0],
            [0.9, 0],
            [0.95, 1]
          ]
        })
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.6, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.074, 0.08), loop: speaking },
      { name: "his voice: a place in Paradise", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.086, 0.092, 0.6, 0.606), loop: speaking },
      {
        name: "a place in Paradise: a small patch of light in its garden",
        svg: `<ellipse cx="${px}" cy="${py}" rx="4.4" ry="1.4" fill="#FFE07A" fill-opacity="0.7" stroke="#E8B84A" stroke-width="0.4"/>` + smallLight(px, py, 0.6, "#FFF6D0"),
        keys: showAt(0.25, 0.262),
        loop: soft
      },
      {
        name: "equal to an arrow bow of one of you: a short curved line under it, as long as it",
        svg:
          `<path d="M${n(px - 4.4)} 32.8 Q${px} 31.2 ${n(px + 4.4)} 32.8" stroke="#C8963E" stroke-width="0.6" fill="none" stroke-linecap="round"/>` +
          `<path d="M${n(px - 4.4)} 32 L${n(px - 4.4)} 33.6 M${n(px + 4.4)} 32 L${n(px + 4.4)} 33.6" stroke="#C8963E" stroke-width="0.4"/>`,
        keys: showAt(0.36, 0.372)
      },
      {
        name: "better: glints about the small place",
        svg: glints(
          [
            [123, 26.6],
            [137, 26.6],
            [130, 21.4]
          ],
          0.9,
          "#FFE7A0"
        ),
        keys: showAt(0.52, 0.53),
        loop: twinkle()
      },
      { name: "the whole earth: a soft light passing over all of the land", svg: wash(80, 88, 84, 28, "#FFF3CF", 0.08), keys: showFor(0.556, 0.57, 0.6, 0.614) },
      { name: "better than all of it: a soft golden ring about the small place", svg: care(px, n(py + 0.6), 7, 3.2, SOFT_GOLD), keys: showAt(0.94, 0.955), loop: soft }
    ],
    words: linesOn(RISES_AND_SETS, ["Abu Hurairah: he said:", "A place in Paradise equal to", "An arrow bow of one of you", "Is better than the whole earth", "On which the sun rises and sets."])
  };
}

// Better and softer. Al-Bara said: a silken cloth was given as a present to the Prophet ﷺ. His companions started
// touching it and admiring its softness. He said: are you admiring its softness? The handkerchiefs of Sa'd ibn Mu'adh
// (in Paradise, as the English page has it) are better and softer than it (Sahih al-Bukhari 3802). No one is drawn: the
// masjid of Madinah, a palm and the open ground before it. His place, a golden ring, is there, their places about it,
// and Al-Bara's place a little apart. Al-Bara's voice tells of it; a place comes in with a silken cloth, rosy and
// shining, and lays it before his place: a present to him, then steps aside. Two places come close to the cloth, and
// soft ripples show on it: touching it, and glints come about it, with their voice: admiring its softness. His voice
// speaks. Paradise shows far off, a soft circle of light with a garden in it, and two soft white cloths in its garden:
// the handkerchiefs of Sa'd ibn Mu'adh, and a soft golden ring and glints come about them: better and softer.
function betterAndSofter(): SignArt {
  const his: [number, number] = [84, 99.6];
  const bara: [number, number] = [118, 108];
  const near: [number, number][] = [
    [68, 106],
    [100, 106]
  ];
  const back: [number, number][] = [
    [62, 111.6],
    [76, 113],
    [92, 113],
    [106, 111.6]
  ];
  const giver: [number, number] = [150, 105.6];
  const comeClose = (i: number): SignPart => ({
    name: `a place coming close to the cloth ${i + 1}`,
    svg: someone(near[i][0], near[i][1], 1.6, FOLK),
    keys: track({
      xy: [
        [0.306, 0, 0],
        [0.34, i === 0 ? 6 : -6, 0.4]
      ]
    })
  });
  return {
    kind: "better-and-softer",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(22, 16) },
      { name: "a cloud", svg: cloud(70, 22, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "Paradise, far off: a soft circle of light with a garden in it", svg: farOff(130, 24, 12) + gardenIn(130, 24, 12), keys: showAt(0.725, 0.74), loop: soft },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground before the masjid", svg: plainLand("#E2CB9C", [[18, 116], [124, 117], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(4, 96, 1) },
      ...palms([[146, 96, 13]], "Madinah"),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "their places, sitting about him", svg: places(back) },
      comeClose(0),
      comeClose(1),
      { name: "Al-Bara's place", svg: someone(bara[0], bara[1], 1.6, ITS_VOICE) },
      { name: "Al-Bara's voice: telling of it", svg: arcsLeft(n(bara[0] - 3.2), n(bara[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.1, 0.106), loop: speaking },
      {
        name: "a place bringing the silken cloth, then stepping aside",
        svg: someone(giver[0], giver[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.042, 1]
          ],
          xy: [
            [0.165, 0, 0],
            [0.215, -54, 0],
            [0.222, -54, 0],
            [0.25, -22, 3]
          ]
        })
      },
      {
        name: "the silken cloth: rosy and shining, a present to him",
        svg:
          `<path d="M77 104.4 L91 104.4 L93 107.6 L75 107.6 Z" fill="#E9B8C8"/>` +
          `<path d="M78.4 105.4 Q84 104.6 89.6 105.4 M77.6 106.6 Q84 105.8 90.4 106.6" stroke="#FFF2F6" stroke-width="0.45" fill="none"/>` +
          `<path d="M91 104.4 L93 107.6 L90.6 107.6 Z" fill="#D49AAE"/>`,
        keys: track({
          opacity: [
            [0.03, 0],
            [0.042, 1]
          ],
          xy: [
            [0.165, 62, 0],
            [0.215, 8, 0],
            [0.235, 0, 0]
          ]
        })
      },
      {
        name: "touching it: soft ripples on the silken cloth",
        svg: `<path d="M79 105 Q81 104.4 83 105 Q85 105.6 87 105 Q89 104.4 90.4 105" stroke="#FFFFFF" stroke-width="0.4" fill="none" opacity="0.9"/>`,
        keys: showAt(0.344, 0.356),
        loop: twinkle(1400)
      },
      {
        name: "admiring its softness: glints about the silken cloth",
        svg: glints(
          [
            [74, 102.4],
            [94, 102.4],
            [84, 109.8]
          ],
          0.9,
          "#FFE7A0"
        ),
        keys: showAt(0.446, 0.456),
        loop: twinkle()
      },
      { name: "their voice: admiring it", svg: arcs(77.2, 103.6, FOLK), keys: showFor(0.46, 0.466, 0.524, 0.53), loop: speaking },
      { name: "his voice: are you admiring its softness", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.585, 0.591, 0.95, 0.956), loop: speaking },
      {
        name: "the handkerchiefs of Sa'd ibn Mu'adh: two soft white cloths in its garden",
        svg:
          `<path d="M122.8 29.2 L128.8 29.2 L129.6 31 L122 31 Z" fill="#FFFFFF" stroke="#E4DCC8" stroke-width="0.3"/>` +
          `<path d="M131.2 29.2 L137.2 29.2 L138 31 L130.4 31 Z" fill="#FFFFFF" stroke="#E4DCC8" stroke-width="0.3"/>`,
        keys: showAt(0.765, 0.777),
        loop: soft
      },
      { name: "better and softer: a soft golden ring about them", svg: care(130, 30.2, 9.2, 3.4, SOFT_GOLD), keys: showAt(0.865, 0.877), loop: soft },
      {
        name: "better and softer: glints about them",
        svg: glints(
          [
            [120.4, 27.2],
            [139.6, 27.2],
            [130, 34]
          ],
          0.9,
          "#FFE7A0"
        ),
        keys: showAt(0.885, 0.895),
        loop: twinkle()
      }
    ],
    words: linesOn(SEVEN_LINES, [
      "Al-Bara: a silken cloth was given",
      "As a present to him.",
      "His companions started touching it",
      "And admiring its softness.",
      "He said: are you admiring its softness?",
      "The handkerchiefs of Sa'd ibn Mu'adh",
      "Are better and softer than it."
    ])
  };
}

// Better to wait. Busr ibn Sa'id said that Zayd ibn Khalid sent him to Abu Juhaim to ask him what he had heard from the
// Messenger of Allah ﷺ about a person passing in front of another person who was praying. Abu Juhaim said: the
// Messenger of Allah ﷺ said: if the person who passes in front of another person in prayer knew the magnitude of his
// sin, he would prefer to wait for forty rather than to pass in front of him (Sahih al-Bukhari 510). No one is drawn: a
// lane of Madinah between Zayd's home and Abu Juhaim's home, and a mat on the ground before it. Zayd's voice sends
// Busr's place along the lane to Abu Juhaim, and Busr's voice asks. A place on the mat shows, with a small light within
// it: one praying. Abu Juhaim's voice tells of it, with golden glints: his words. A dashed way shows across the space in
// front of the one praying, and a passer's place at its far end. A large grey shadow comes over the way in front: the
// magnitude of the sin. The passer's place comes along the way and stops short of the front, and forty small marks
// show, a row of ten after another: forty. A spark rises from the one praying, the grey shadow fades, and a soft golden
// ring comes about the waiting place: better.
function betterToWait(): SignArt {
  const zayd: [number, number] = [32, 94];
  const busr: [number, number] = [40, 94.6];
  const juhaim: [number, number] = [128, 94];
  const praying: [number, number] = [80, 109.6];
  const passer: [number, number] = [150, 103];
  const waits = 110;
  const forty = (row: number): SignPart => {
    const from = at3(0.785 + row * 0.01);
    return {
      name: `forty: a row of ten small marks by the waiting place ${row + 1}`,
      svg: Array.from({ length: 10 }, (_, i) => `<circle cx="${n(113 + i * 2)}" cy="${n(107.6 + row * 2)}" r="0.55" fill="#C8963E"/>`).join(""),
      keys: showAt(from, at3(from + 0.005))
    };
  };
  return {
    kind: "better-to-wait",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(138, 16) },
      { name: "a cloud", svg: cloud(60, 20, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[16, 117], [104, 118], [150, 117]]) },
      ...palms(
        [
          [62, 86, 12],
          [100, 86, 11]
        ],
        "the lane"
      ),
      { name: "Zayd's home", svg: home(20, 90, 22, 16) },
      { name: "Abu Juhaim's home", svg: home(140, 90, 22, 16) },
      { name: "a lane of Madinah", svg: lane() },
      { name: "Zayd's place", svg: someone(zayd[0], zayd[1], 1.6, FOLK) },
      { name: "Zayd's voice: sending Busr", svg: arcs(n(zayd[0] - 0.6), n(zayd[1] - 4), FOLK), keys: showFor(0.022, 0.03, 0.058, 0.064), loop: speaking },
      { name: "Busr's way along the lane", svg: way(`M${busr[0]} ${busr[1]} L122 ${busr[1]}`), keys: showAt(0.066, 0.078) },
      {
        name: "Busr's place, going to Abu Juhaim",
        svg: someone(busr[0], busr[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.07, 0, 0],
            [0.09, 12, 0],
            [0.142, 12, 0],
            [0.2, 78, 0]
          ]
        })
      },
      { name: "Abu Juhaim's place", svg: someone(juhaim[0], juhaim[1], 1.6, FOLK) },
      { name: "Busr's voice: asking", svg: arcs(121.4, 91.8, ITS_VOICE), keys: showFor(0.204, 0.21, 0.326, 0.332), loop: speaking },
      { name: "a mat on the ground", svg: mat(praying[0], 112, 16) },
      { name: "one praying: a place on the mat", svg: someone(praying[0], praying[1], 1.8, FOLK), keys: showAt(0.268, 0.282) },
      { name: "at prayer: a small light within that place", svg: smallLight(praying[0], praying[1], 0.7), keys: showAt(0.29, 0.3), loop: soft },
      { name: "Abu Juhaim's voice: telling his words", svg: arcsLeft(124.8, 91.2, FOLK), keys: showFor(0.39, 0.396, 0.95, 0.956), loop: speaking },
      {
        name: "his words, as Abu Juhaim heard them: golden glints over the voice",
        svg: glints(
          [
            [118.6, 87],
            [122.4, 85.4]
          ],
          0.8,
          "#FFD45A"
        ),
        keys: showFor(0.41, 0.42, 0.95, 0.956),
        loop: twinkle()
      },
      { name: "the space in front of the one praying: a dashed way across it", svg: way(`M${passer[0]} ${passer[1]} L40 ${passer[1]}`, "#FFF0C4", 1), keys: showAt(0.51, 0.522) },
      {
        name: "the magnitude of the sin: a large grey shadow on the way in front",
        svg: `<ellipse cx="80" cy="103" rx="14" ry="3.2" fill="#6E6A66" opacity="0.5"/><ellipse cx="80" cy="103" rx="9" ry="2" fill="#5A5652" opacity="0.4"/>`,
        keys: track({
          opacity: [
            [0.632, 0],
            [0.65, 1],
            [0.92, 1],
            [0.94, 0]
          ]
        })
      },
      {
        name: "a passer's place: coming along the way, and waiting short of the front",
        svg: someone(passer[0], passer[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.53, 0],
            [0.542, 1]
          ],
          xy: [
            [0.752, 0, 0],
            [0.78, waits - passer[0], 0]
          ]
        })
      },
      forty(0),
      forty(1),
      forty(2),
      forty(3),
      spark("the prayer: a spark rising from the one praying", praying[0], n(praying[1] - 3), 0.876, 0.91),
      { name: "better: a soft golden ring about the waiting place", svg: care(waits, passer[1], 4.6, 2.6, SOFT_GOLD), keys: showAt(0.944, 0.956), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Zayd ibn Khalid sent Busr to Abu Juhaim",
      "To ask about a person passing in front",
      "Of another person who was praying.",
      "Abu Juhaim: he said: if the person",
      "Who passes in front of another person",
      "In prayer knew the magnitude of his sin,",
      "He would prefer to wait for forty",
      "Rather than to pass in front of him."
    ])
  };
}

// Give respite. Abdullah ibn Abi Qatadah said that Abu Qatadah demanded the payment of his debt from his debtor, but he
// disappeared; later on he found him, and he said: I am hard up financially. Abu Qatadah said: by God? He said: by God.
// Upon this Abu Qatadah said: I heard the Messenger of Allah ﷺ saying: he who loves that Allah saves him from the
// torments of the Day of Resurrection should give respite to the insolvent or remit his debt (Sahih Muslim 1563a). No
// one is drawn: a lane of Madinah between Abu Qatadah's home and the debtor's home, and a dinar over the lane between
// them: the debt. Abu Qatadah's place goes to the debtor's door, and Abu Qatadah's voice asks for it; the debtor's
// place goes in at its door and is gone, and Abu Qatadah's place goes back. The sun goes on: later on. Abu Qatadah's
// place comes again, and the debtor's place comes out; the debtor's voice speaks, and an empty bag shows by it: hard
// up. Abu Qatadah's voice tells of it, with golden glints: his words. A soft pale ring comes about the debtor's place,
// and Abu Qatadah's place steps back: respite. The dinar fades away, with glints where it was: remitted, and a soft
// golden ring comes about Abu Qatadah's place.
function giveRespite(): SignArt {
  const qatadah: [number, number] = [36, 95];
  const debtor: [number, number] = [118, 95];
  const at = 104;
  const back = 94;
  return {
    kind: "give-respite",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun, going on: later on",
        svg: sun(24, 20),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.21, 40, -6]
          ]
        })
      },
      { name: "a cloud", svg: cloud(96, 24, 0.4, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[16, 116], [80, 117], [150, 116]]) },
      ...palms([[58, 86, 12]], "the lane"),
      { name: "Abu Qatadah's home", svg: home(20, 90, 22, 16) },
      { name: "the debtor's home", svg: home(132, 90, 22, 16) },
      { name: "a lane of Madinah", svg: lane() },
      { name: "the debt: a dinar over the lane, between them", svg: coins(78, 76, 1, undefined, undefined, true), keys: track({ opacity: [[0.07, 0], [0.08, 1], [0.878, 1], [0.9, 0]] }) },
      {
        name: "the debtor's place: going in at its door, and coming out again",
        svg: someone(debtor[0], debtor[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.152, 1],
            [0.17, 0],
            [0.3, 0],
            [0.31, 1]
          ],
          xy: [
            [0.145, 0, 0],
            [0.168, 14, -1],
            [0.29, 14, -1],
            [0.308, 0, 0]
          ]
        })
      },
      {
        name: "Abu Qatadah's place: going to the debtor, back, again, and stepping back",
        svg: someone(qatadah[0], qatadah[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.022, 0, 0],
            [0.058, at - qatadah[0], 0],
            [0.175, at - qatadah[0], 0],
            [0.205, 0, 0],
            [0.266, 0, 0],
            [0.298, at - qatadah[0], 0],
            [0.775, at - qatadah[0], 0],
            [0.81, back - qatadah[0], 0]
          ]
        })
      },
      { name: "Abu Qatadah's voice: asking for the debt", svg: arcs(n(at + 3.4), n(qatadah[1] - 2.8), ITS_VOICE), keys: showFor(0.062, 0.068, 0.084, 0.09), loop: speaking },
      { name: "the debtor's voice: I am hard up", svg: arcsLeft(n(debtor[0] - 3.2), n(debtor[1] - 2.8), FOLK), keys: showFor(0.312, 0.318, 0.39, 0.396), loop: speaking },
      {
        name: "hard up: an empty bag by the debtor's place",
        svg: `<path d="M121.4 98.4 Q121 95.6 122.6 95.2 L124.6 95.2 Q126.2 95.6 125.8 98.4 Z" fill="#C9AE84" stroke="#9C8058" stroke-width="0.4"/><path d="M122.4 95.2 L124.8 95.2" stroke="#7A5A38" stroke-width="0.5"/>`,
        keys: showAt(0.32, 0.33)
      },
      { name: "Abu Qatadah's voice: I heard him saying", svg: arcs(n(at + 3.4), n(qatadah[1] - 2.8), ITS_VOICE), keys: showFor(0.39, 0.396, 0.756, 0.762), loop: speaking },
      {
        name: "his words, as Abu Qatadah heard them: golden glints over the voice",
        svg: glints(
          [
            [108.6, 89.4],
            [112, 87.6]
          ],
          0.8,
          "#FFD45A"
        ),
        keys: showFor(0.41, 0.42, 0.756, 0.762),
        loop: twinkle()
      },
      { name: "respite for the one hard up: a soft pale ring about the debtor's place", svg: care(debtor[0], debtor[1], 4.4, 2.4, "#FFF3CF"), keys: showAt(0.756, 0.768), loop: soft },
      {
        name: "remitted: glints where the debt was",
        svg: glints(
          [
            [74, 74],
            [82, 74],
            [78, 70.6]
          ],
          0.9,
          "#FFE7A0"
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle()
      },
      { name: "relief: a soft golden ring about Abu Qatadah's place", svg: care(back, qatadah[1], 4.6, 2.6, SOFT_GOLD), keys: showAt(0.92, 0.932), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Abu Qatadah demanded from his debtor,",
      "Who disappeared. Later on, Abu Qatadah",
      "Found the debtor, who said: I am hard up.",
      "Abu Qatadah: I heard him saying:",
      "He who loves that Allah saves him from",
      "The torments of the Day of Resurrection",
      "Should give respite to the insolvent",
      "Or remit."
    ])
  };
}

// Seven pebbles. Salim said: Ibn Umar used to do Rami of the Jamrat-ud-Dunya with seven small stones, reciting Takbir
// on throwing every pebble. Then he would go ahead till he reached the level ground, where he would stand facing the
// Qibla for a long time to invoke, raising his hands. Then he would do Rami of the Jamrat-ul-Wusta, then go to the left
// towards the middle ground, where he would stand facing the Qibla for a long period to invoke. Then he would do Rami
// of the Jamrat-ul-Aqaba from the middle of the valley, but would not stay by it; then he would leave and say: I saw
// the Prophet ﷺ doing like this (Sahih al-Bukhari 1751). No one is drawn: the valley of Mina between its hills, white
// tents far off, and three Jamrahs on the valley floor, each a stone pillar in a low basin. Salim's voice tells of it.
// Seven small stones show by Ibn Umar's place, and a soft ring about the first Jamrah. The stones go one by one into
// its basin, each with a small glint over Ibn Umar's place: a Takbir for every pebble. That place goes ahead to the
// level ground and a soft light comes about it: facing the Qibla; Ibn Umar's voice speaks and two sparks rise slowly: a
// long du'a. The place goes to the middle Jamrah, seven stones show in its basin, and it goes to the left; a spark
// rises. It goes into the middle of the valley below the Jamrat-ul-Aqaba, seven stones show in its basin, and it goes
// on without staying. Ibn Umar's voice speaks, and a faint golden dashed way shows along the whole way: as Ibn Umar had
// seen it done.
function sevenPebbles(): SignArt {
  const start: [number, number] = [138, 104];
  const salim: [number, number] = [150, 110];
  const [first, middle, aqaba] = [124, 84, 40];
  const throwAt = (i: number) => at3(0.256 + i * 0.016);
  const pebble = (i: number): SignPart => {
    const [x, y] = [n(134 + i * 1.2), 107.6];
    const [dx, dy] = [n(first + (i - 3) * 0.9 - x), n(99.6 - y)];
    const t = throwAt(i);
    return {
      name: `a pebble, thrown into the basin of the Jamrat-ud-Dunya ${i + 1}`,
      svg: `<circle cx="${x}" cy="${y}" r="0.55" fill="#7E7466"/>`,
      keys: track({
        opacity: [
          [0.14, 0],
          [0.152, 1]
        ],
        xy: [
          [t, 0, 0],
          [at3(t + 0.006), n(dx / 2), n(dy / 2 - 3)],
          [at3(t + 0.012), dx, dy]
        ]
      })
    };
  };
  const takbir = (i: number): SignPart => {
    const t = throwAt(i);
    return {
      name: `a Takbir with pebble ${i + 1}: a small glint over Ibn Umar's place`,
      svg: glints([[n(131 + i * 2), 95.8]], 0.7, "#FFD45A"),
      keys: track({
        opacity: [
          [t, 0],
          [at3(t + 0.004), 1],
          [0.42, 1],
          [0.426, 0]
        ]
      })
    };
  };
  const stonesIn = (name: string, x: number, from: number): SignPart => ({ name, svg: sevenIn(x, 99.8), keys: showAt(from, at3(from + 0.008)) });
  const path: [number, number][] = [start, [106, 110], [96, 104], [72, 110], [48, 108], [14, 112]];
  const step = (i: number): [number, number] => [path[i][0] - start[0], path[i][1] - start[1]];
  return {
    kind: "seven-pebbles",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(146, 14) },
      { name: "a cloud", svg: cloud(88, 20, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the valley floor of Mina", svg: plainLand("#E2CB9C", [[30, 116], [96, 117], [150, 116]]) },
      { name: "white tents far off in the valley", svg: tent(60, 72, 7, 5) + tent(72, 71.4, 6, 4.4) + tent(98, 72, 7, 5) + tent(110, 71.4, 6, 4.4) + tent(122, 72, 7, 5) },
      { name: "a hill at the valley's edge", svg: `<path d="M0 50 Q20 52 30 64 Q38 76 44 88 L0 92 Z" fill="#C2A77E"/><path d="M0 50 Q20 52 30 64" stroke="#A88E66" stroke-width="0.6" fill="none"/>` },
      { name: "the Jamrat-ul-Aqaba", svg: jamrah(aqaba) },
      { name: "the Jamrat-ul-Wusta", svg: jamrah(middle) },
      { name: "the Jamrat-ud-Dunya", svg: jamrah(first) },
      { name: "Salim's place", svg: someone(salim[0], salim[1], 1.6, FOLK) },
      { name: "Salim's voice: telling of it", svg: arcsLeft(n(salim[0] - 3.2), n(salim[1] - 2.8), FOLK), keys: showFor(0.022, 0.03, 0.074, 0.08), loop: speaking },
      { name: "the Jamrat-ud-Dunya: a soft ring about it", svg: care(first, 99.4, 9.6, 3.6, "#FFF3CF"), keys: showFor(0.16, 0.172, 0.19, 0.2) },
      ...[0, 1, 2, 3, 4, 5, 6].map(pebble),
      ...[0, 1, 2, 3, 4, 5, 6].map(takbir),
      { name: "Ibn Umar's voice: a Takbir with every pebble", svg: arcs(n(start[0] + 3.2), n(start[1] - 2.8), ITS_VOICE), keys: showFor(0.252, 0.258, 0.364, 0.37), loop: speaking },
      {
        name: "Ibn Umar's place: to the level ground, the middle Jamrah, the valley, and on",
        svg: someone(start[0], start[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.42, 0, 0],
            [0.46, ...step(1)],
            [0.65, ...step(1)],
            [0.668, ...step(2)],
            [0.684, ...step(2)],
            [0.7, ...step(3)],
            [0.765, ...step(3)],
            [0.785, ...step(4)],
            [0.805, ...step(4)],
            [0.83, ...step(5)]
          ]
        })
      },
      { name: "facing the Qibla: a soft light about Ibn Umar's place", svg: glow(path[1][0], path[1][1], 5, "#FFF3C0", 0.3), keys: showFor(0.466, 0.476, 0.65, 0.656), loop: soft },
      { name: "Ibn Umar's voice: a long du'a", svg: arcs(n(path[1][0] + 3.2), n(path[1][1] - 2.8), ITS_VOICE), keys: showFor(0.538, 0.544, 0.594, 0.6), loop: speaking },
      { name: "Ibn Umar's long du'a: a spark rising slowly 1", svg: spark("", path[1][0], n(path[1][1] - 3), 0, 1).svg, keys: sparkRising(0.545, 0.575), loop: twinkle(900) },
      { name: "Ibn Umar's long du'a: a spark rising slowly 2", svg: spark("", n(path[1][0] - 2), n(path[1][1] - 3), 0, 1).svg, keys: sparkRising(0.566, 0.598), loop: twinkle(900) },
      stonesIn("seven stones in the basin of the Jamrat-ul-Wusta", middle, 0.672),
      spark("Ibn Umar's du'a at the middle ground: a spark rising", path[3][0], n(path[3][1] - 3), 0.7, 0.715),
      stonesIn("seven stones in the basin of the Jamrat-ul-Aqaba", aqaba, 0.79),
      { name: "Ibn Umar's voice: I saw him doing like this", svg: arcs(n(path[5][0] + 3.2), n(path[5][1] - 2.8), ITS_VOICE), keys: showFor(0.884, 0.89, 0.95, 0.956), loop: speaking },
      { name: "as Ibn Umar had seen it done: a faint golden way along the whole way", svg: way(`M${path.map(([x, y]) => `${x} ${y}`).join(" L")}`, "#F3D58A", 0.9), keys: showAt(0.9, 0.915), loop: soft }
    ],
    words: linesOn(PEBBLES, [
      "Salim: Ibn Umar used to do Rami",
      "Of the Jamrat-ud-Dunya with seven stones,",
      "Reciting Takbir on throwing every pebble.",
      "Then Ibn Umar would stand facing the Qibla",
      "For a long time to invoke.",
      "Then Rami of the Jamrat-ul-Wusta,",
      "Then of the Jamrat-ul-Aqaba;",
      "Ibn Umar: I saw him doing like this."
    ])
  };
}

// The pillar he chose. Yazid ibn Abi Ubayd said: I used to accompany Salamah ibn al-Akwa', and he used to pray behind
// the pillar which was near the place where the copies of the Quran were kept. I said: O Abu Muslim, I see you always
// seeking to pray behind this pillar. He replied: I saw the Prophet ﷺ always seeking to pray near that pillar (Sahih
// al-Bukhari 502). No one is drawn: inside the masjid, under its roof of palm fronds on palm trunks. Yazid's place and
// Salamah's place come in; Yazid's voice tells of it. Salamah's place goes to the middle palm trunk and stands before
// it, a small light within it and a spark rising: his prayer. A soft ring comes about the base of the trunk: the
// pillar, and Yazid's voice asks. Two more sparks rise from Salamah's place: always. Salamah's voice replies, and a
// golden ring shows about the same spot: his place, as Salamah saw it, and a spark rises from it. A soft golden ring
// comes about the whole trunk, with glints at its base: that pillar.
function thePillarHeChose(): SignArt {
  const foot = 96;
  const salamah: [number, number] = [80, 104];
  const yazid: [number, number] = [104, 108];
  const from: [number, number] = [150, 108];
  return {
    kind: "the-pillar-he-chose",
    ms: 12000,
    parts: [
      ...insideTheMasjid(foot),
      {
        name: "Yazid's place, coming in",
        svg: someone(yazid[0], yazid[1], 1.6, ITS_VOICE),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.042, 1]
          ],
          xy: [
            [0.165, from[0] - yazid[0], from[1] - yazid[1]],
            [0.21, 0, 0]
          ]
        })
      },
      {
        name: "Salamah's place, coming in and standing before the pillar",
        svg: someone(salamah[0], salamah[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.042, 1]
          ],
          xy: [
            [0.165, from[0] - 12 - salamah[0], from[1] - salamah[1]],
            [0.21, 0, 0]
          ]
        })
      },
      { name: "Yazid's voice: telling of it", svg: arcsLeft(n(from[0] - 3.2), n(from[1] - 2.8), ITS_VOICE), keys: showFor(0.05, 0.056, 0.1, 0.106), loop: speaking },
      { name: "at prayer: a small light within Salamah's place", svg: smallLight(salamah[0], salamah[1], 0.7), keys: showAt(0.214, 0.224), loop: soft },
      spark("Salamah's prayer: a spark rising", salamah[0], n(salamah[1] - 3), 0.222, 0.25),
      { name: "the pillar: a soft ring about the base of the palm trunk", svg: care(80, 96.6, 6, 2, "#FFF3CF"), keys: showAt(0.305, 0.317), loop: soft },
      { name: "Yazid's voice: O Abu Muslim", svg: arcsLeft(n(yazid[0] - 3.2), n(yazid[1] - 2.8), ITS_VOICE), keys: showFor(0.33, 0.336, 0.585, 0.591), loop: speaking },
      spark("always: Salamah's prayer there again, a spark rising 1", salamah[0], n(salamah[1] - 3), 0.446, 0.48),
      spark("always: Salamah's prayer there again, a spark rising 2", salamah[0], n(salamah[1] - 3), 0.49, 0.525),
      { name: "Salamah's voice: I saw him", svg: arcs(n(salamah[0] + 3.2), n(salamah[1] - 2.8), FOLK), keys: showFor(0.6, 0.606, 0.95, 0.956), loop: speaking },
      { name: "his place, as Salamah saw it: a golden ring about the same spot", svg: ring(salamah[0], salamah[1], 2.8, GOLD), keys: showAt(0.725, 0.74), loop: soft },
      spark("always seeking to pray there: a spark rising from his place", salamah[0], n(salamah[1] - 3.4), 0.75, 0.8),
      { name: "that pillar: a soft golden ring about the whole palm trunk", svg: care(80, 68, 6, 29, SOFT_GOLD), keys: showAt(0.865, 0.877), loop: soft },
      {
        name: "that pillar: glints at its base",
        svg: glints(
          [
            [73, 95.4],
            [87, 95.4]
          ],
          0.9,
          "#FFE7A0"
        ),
        keys: showAt(0.885, 0.895),
        loop: twinkle()
      }
    ],
    words: linesOn(SEVEN_LINES, [
      "Yazid: I used to accompany",
      "Salamah ibn al-Akwa', who used to pray",
      "Behind the pillar. I said: O Abu Muslim!",
      "I see you always seeking to pray",
      "Behind this pillar. Salamah replied:",
      "I saw him always seeking to pray",
      "Near that pillar."
    ])
  };
}

export const BETTER_ART = {
  "a-bows-length": aBowsLength,
  "better-and-softer": betterAndSofter,
  "better-to-wait": betterToWait,
  "give-respite": giveRespite,
  "seven-pebbles": sevenPebbles,
  "the-pillar-he-chose": thePillarHeChose
} as const;
