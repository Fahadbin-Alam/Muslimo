import { animalAt, cloud, flame, glow, n, palm, peaks, rainStreaks, sky, tuft, type SignArt, type SignPart } from "./signDraw";
import { ring, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { track } from "./toldArt";

/**
 * More scenes from the Prophet's ﷺ life and from what he told, drawn as the scenes of his life are (lifeArt.ts): the
 * lamp put out so a guest could eat, his help at home until the prayer, the man who killed a hundred and was forgiven
 * a span from the good land, Uhud shaking under him and three of his companions, the stone in Makkah that greeted him,
 * the rain that fell "around us, not on us", and the blessed water and the food that glorified Allah. Only the land,
 * the sky, buildings, things, plants and animals are drawn. No Prophet and no person is ever drawn, not even a hand:
 * where someone went, a dashed way shows it, where someone sat or stood, a ring or a small dashed circle, and a voice
 * is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky but the rain: a blessing, a
 * prayer and praise are sparks rising.
 */

/** Colors that show on the light ground of these scenes: a voice, a way, and sparks rising. */
const VOICE = "#6B4A2E";
const GOLD = "#C8963E";
const SPARK = "#E8A93A";
/** A voice and a way in the dark, or on dark ground. */
const CREAM = "#FFF6DC";

/** A small dashed circle where someone is, its middle at (x, y). */
const someone = (x: number, y: number, r = 1.6, color = VOICE) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1 0.8" fill="none"/>`;

/** A small sun, its middle at (x, y). */
const sun = (x: number, y: number) => `${glow(x, y, 11, "#FFF0C0", 0.12)}<circle cx="${x}" cy="${y}" r="4.8" fill="#FFE07A"/>`;

/** A puff of dust at (x, y), there for a moment from `start`, rising a little. */
const puff = (name: string, x: number, y: number, start: number): SignPart => ({
  name,
  svg: `<circle cx="${x}" cy="${y}" r="2.2" fill="#E9DCC0"/><circle cx="${n(x + 2)}" cy="${n(y + 0.6)}" r="1.6" fill="#E9DCC0"/>`,
  keys: track({
    opacity: [
      [start, 0],
      [at3(start + 0.006), 0.9],
      [at3(start + 0.024), 0]
    ],
    xy: [
      [start, 0, 0],
      [at3(start + 0.024), 0, -4]
    ]
  })
});

// The lamp put out. A hungry man came to the Prophet ﷺ, and nothing was found in his homes. He asked who would host
// him that night, and a man of the Ansar took him home. His wife had only the little ones' food; he told her to put
// them to sleep and put out the light, and that they would go hungry that night, and she did. Then Allah revealed
// 59:9: they prefer others over themselves, even when in need (Sahih al-Bukhari 4889). No one is drawn: inside the
// home, a ring shows where each one sat and a dashed way where each went; the lamp goes out, the food is eaten in the
// dark, the rings go to the mat, and with the morning sparks rise.
function lampOut(): SignArt {
  const floor = 92;
  const room =
    `<rect width="160" height="120" fill="#E2C796"/><rect y="${floor}" width="160" height="${120 - floor}" fill="#CFAE7C"/>` +
    `<path d="M0 ${floor} L160 ${floor}" stroke="#B48F5E" stroke-width="0.8"/>` +
    `<path d="M8 ${floor} L8 70 Q15 61 22 70 L22 ${floor} Z" fill="#4A3624"/>` +
    `<rect x="122.6" y="48.6" width="16.8" height="14.8" fill="#8A6440"/><rect x="124" y="50" width="14" height="12" fill="#1B2A4A"/>` +
    sparkle(128, 54, 0.9, "#FFF6D0") +
    sparkle(134, 58, 0.7, "#FFF6D0") +
    `<path d="M70 74 L70 62 Q80 52 90 62 L90 74 Z" fill="#C9A877"/><rect x="68" y="74" width="24" height="1.8" fill="#8A6440"/>`;
  const lamp =
    `<path d="M74.5 74 Q74.5 69.6 80 69.6 Q85.5 69.6 85.5 74 Z" fill="#B5713F"/>` +
    `<path d="M84.6 71.2 L89.2 70.2 L88.8 72.2 Z" fill="#B5713F"/><path d="M74.6 72.4 Q71.8 71.4 73 69.2" stroke="#B5713F" stroke-width="1" fill="none"/>`;
  const cloth = `<path d="M30 99 L96 99 L100 108 L26 108 Z" fill="#EFE0BC"/><path d="M30.6 100.4 L95.4 100.4" stroke="#D9C49A" stroke-width="0.6"/>`;
  const mat =
    `<path d="M112 100 L156 100 L158 108 L110 108 Z" fill="#B98A5A"/>` +
    [116, 124, 132, 140, 148].map((x) => `<path d="M${x} 100.6 L${x - 0.6} 107.4" stroke="#9C7048" stroke-width="0.6"/>`).join("");
  const pot = `<path d="M54 102 Q54 106 60 106 Q66 106 66 102 Z" fill="#8A5A33"/><ellipse cx="60" cy="102" rx="6" ry="1.4" fill="#6B4A2E"/>`;
  const food = `<ellipse cx="60" cy="101.4" rx="4.6" ry="1.6" fill="#D9A44A"/>`;
  const potMove: [number, number, number][] = [
    [0.6, 0, 0],
    [0.63, -6, 0]
  ];
  const toTheMat = (dx: number): [number, number, number][] => [
    [0.725, 0, 0],
    [0.745, dx, 0]
  ];
  return {
    kind: "lamp-out",
    ms: 12000,
    parts: [
      { name: "a room at night", svg: room },
      { name: "a cloth on the floor", svg: cloth },
      { name: "a mat to sleep on", svg: mat },
      { name: "a clay lamp", svg: lamp },
      {
        name: "the lamp's light",
        svg: `${glow(89, 66, 34, "#FFE6A0", 0.08)}${flame(89.2, 70.6, 4.2)}`,
        keys: track({
          opacity: [
            [0.47, 1],
            [0.5, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1500, low: 0.85 }
      },
      {
        name: "a wisp of smoke from the lamp",
        svg: `<path d="M89.2 68 Q87.6 65.6 89.2 63.4 Q90.8 61.2 89.2 58.8" stroke="#8C8C8C" stroke-width="0.7" fill="none"/>`,
        keys: track({
          opacity: [
            [0.5, 0],
            [0.505, 0.8],
            [0.52, 0]
          ],
          xy: [
            [0.5, 0, 0],
            [0.52, 0, -5]
          ]
        })
      },
      { name: "a small pot of food", svg: pot, keys: track({ xy: potMove }) },
      {
        name: "the food in it",
        svg: food,
        origin: { x: 54, y: 102.4 },
        keys: track({
          xy: potMove,
          scaleY: [
            [0.64, 1],
            [0.71, 0.12]
          ]
        })
      },
      {
        name: "a way, coming in at the door",
        svg: way("M16 91 C22 98 32 103 40 103.6", VOICE, 1),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.09, 1],
            [0.2, 1],
            [0.22, 0]
          ]
        })
      },
      {
        name: "another way, coming in with it",
        svg: way("M18 92 C30 100 56 104 72 104", VOICE, 1),
        keys: track({
          opacity: [
            [0.06, 0],
            [0.11, 1],
            [0.2, 1],
            [0.22, 0]
          ]
        })
      },
      { name: "the place where the visitor sat", svg: ring(42, 104, 4.4, VOICE), keys: showFrom(0.11, 0.14) },
      {
        name: "the host's place",
        svg: ring(74, 104, 4.2, VOICE),
        keys: track({
          opacity: [
            [0.12, 0],
            [0.15, 1]
          ],
          xy: toTheMat(47)
        })
      },
      { name: "her place by the cloth", svg: ring(85, 104, 4.2, VOICE), keys: track({ xy: toTheMat(67) }) },
      {
        name: "the little ones' places",
        svg: ring(97, 105, 2.6, VOICE) + ring(104, 105, 2.6, VOICE),
        keys: track({
          xy: [
            [0.27, 0, 0],
            [0.32, 37, 0]
          ]
        })
      },
      {
        name: "a blanket over the little ones",
        svg: `<rect x="128" y="101.4" width="19" height="5" rx="2.4" fill="#8FA3C8"/>`,
        keys: track({
          opacity: [
            [0.325, 0],
            [0.34, 1]
          ]
        })
      },
      { name: "a voice, saying: let them sleep", svg: arcs(78, 98, VOICE), keys: showWhile(0.22, 0.24, 0.29, 0.31), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      { name: "a way, from her place to the lamp", svg: way("M86 101 C88 92 90 82 88.6 76", VOICE, 1), keys: showFrom(0.42, 0.46) },
      {
        name: "the room, dark",
        svg: `<rect width="160" height="120" fill="#141C34"/>`,
        keys: track({
          opacity: [
            [0.47, 0],
            [0.51, 0.6],
            [0.82, 0.6],
            [0.9, 0.1]
          ]
        })
      },
      {
        name: "small sounds in the dark, as if eating",
        svg: arcs(77, 98.6, CREAM) + arcs(88, 98.6, CREAM),
        keys: showWhile(0.62, 0.64, 0.69, 0.71),
        loop: { move: "twinkle", ms: 900, low: 0.4 }
      },
      {
        name: "the window at dawn",
        svg: `<rect x="124" y="50" width="14" height="12" fill="#F7C99A"/>${glow(131, 60, 8, "#FFE0B0", 0.16)}`,
        keys: track({
          opacity: [
            [0.82, 0],
            [0.88, 1]
          ]
        })
      },
      ...risingSparks(
        "praise, rising",
        [
          [42, 98],
          [124, 98],
          [146, 98]
        ],
        0.86,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "A hungry man came: who will host this man?", from: 0.02, to: 0.18 },
      { text: "Only the little ones' food: let them sleep", from: 0.2, to: 0.38 },
      { text: "And she put out the light", from: 0.4, to: 0.56 },
      { text: "In the dark the guest ate; they did not", from: 0.58, to: 0.78 },
      { text: "Then Allah revealed 59:9 about them", from: 0.8, to: 1 }
    ]
  };
}

// He helped at home. Aishah was asked what the Prophet ﷺ did at home. She said: he was busy serving his family, and
// when the time for prayer came, he went out to the prayer (Sahih al-Bukhari 676). Nothing is added to what she said,
// so no chore is drawn. No one is drawn: a dashed way comes home, then goes from one of his family to the next, a ring
// where each one sits and a warm glow on each in turn; the call to prayer rises from the mosque's roof (it had no
// minaret then), and the way goes out from his door, which was by the mosque, to the prayer.
function helpedHome(): SignArt {
  // His home was a room by the mosque, its roof of palm fronds and its walls low.
  const house =
    `<rect x="62" y="76" width="40" height="24" fill="#D9AE78"/><rect x="84" y="76" width="18" height="24" fill="#000000" opacity="0.07"/>` +
    `<rect x="61" y="74.4" width="42" height="1.8" fill="#B88A56"/>` +
    `<path d="M88 100 L88 89 Q92 84.6 96 89 L96 100 Z" fill="#6B4A2E"/><rect x="68" y="81" width="5" height="5" fill="#6B4A2E"/>`;
  const mosque =
    `<rect x="102" y="80" width="52" height="20" fill="#C2A06E"/><rect x="132" y="80" width="22" height="20" fill="#000000" opacity="0.08"/>` +
    `<path d="M102 76 L102 100" stroke="#8A6440" stroke-width="0.8"/>` +
    `<rect x="101" y="77" width="54" height="3.4" fill="#8A6440"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${n(102 + i * 5.8)} 77.4 L${n(104.9 + i * 5.8)} 74 L${n(107.8 + i * 5.8)} 77.4" stroke="#6E8C3A" stroke-width="1" fill="none"/>`).join("") +
    `<path d="M124 100 L124 90 Q128 85.6 132 90 L132 100 Z" fill="#6B4A2E"/>`;
  // Where his family sit by the home: three rings, the way going from one to the next.
  const family: [number, number][] = [
    [82, 104.6],
    [71, 105.4],
    [60, 104.6]
  ];
  const warm = (x: number, y: number) => glow(x, y, 5.2, "#FFD27A", 0.24);
  return {
    kind: "helped-at-home",
    ms: 12000,
    parts: [
      { name: "the sky", svg: sky("#CFE6F2", "#E6D2A4", 64) },
      {
        name: "the sun",
        svg: sun(34, 30),
        keys: track({
          xy: [
            [0.55, 0, 0],
            [0.62, 52, -8]
          ]
        })
      },
      {
        name: "the land",
        svg: landOf(
          [
            [8, 112],
            [44, 116],
            [152, 112]
          ],
          "#E6D2A4"
        )
      },
      { name: "a palm by the home", svg: palm(30, 100, 30), origin: { x: 30, y: 100 }, loop: { move: "sway", ms: 5200, angle: 1 } },
      { name: "a home by the mosque", svg: house },
      { name: "the mosque, roofed with palm fronds", svg: mosque },
      { name: "his family's places by the home", svg: family.map(([x, y]) => ring(x, y, 2.6, VOICE)).join("") },
      {
        name: "a way, coming home",
        svg: way("M4 111 C30 114 72 115 86 112 C90 111 92 106 92 101.6", GOLD, 1.1),
        keys: track({
          opacity: [
            [0.06, 0],
            [0.14, 1],
            [0.235, 1],
            [0.255, 0]
          ]
        })
      },
      { name: "a way, going to the first of them", svg: way("M91 102.4 C90 107.2 86.4 109 82 108.4", GOLD, 1.1), keys: showFrom(0.27, 0.3) },
      { name: "a warm glow on the first place", svg: warm(82, 104.6), keys: showFrom(0.3, 0.32) },
      { name: "the way, going to the next", svg: way("M82 108.4 C78.6 109.6 74.4 110 71 109.2", GOLD, 1.1), keys: showFrom(0.34, 0.37) },
      { name: "a warm glow on the next place", svg: warm(71, 105.4), keys: showFrom(0.37, 0.39) },
      { name: "the way, going to the last", svg: way("M71 109.2 C67.4 109.8 63.4 109.6 60 108.4", GOLD, 1.1), keys: showFrom(0.41, 0.44) },
      { name: "a warm glow on the last place", svg: warm(60, 104.6), keys: showFrom(0.44, 0.46) },
      {
        name: "the call to prayer, from the mosque's roof",
        svg: arcsLeft(126, 69, VOICE) + arcs(134, 69, VOICE),
        keys: showWhile(0.6, 0.62, 0.66, 0.68),
        loop: { move: "twinkle", ms: 1400, low: 0.55 }
      },
      { name: "a way, out to the mosque", svg: way("M93 101.6 C102 108 116 108 127 101.6", GOLD, 1.1), keys: showFrom(0.76, 0.84) },
      ...risingSparks(
        "the prayer, rising",
        [
          [120, 86],
          [130, 82],
          [142, 86]
        ],
        0.86,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Aishah was asked: what did he do at home?", from: 0.02, to: 0.22 },
      { text: "He was busy serving his family", from: 0.24, to: 0.52 },
      { text: "When the time for prayer came", from: 0.54, to: 0.72 },
      { text: "He went out to the prayer", from: 0.74, to: 1 }
    ]
  };
}

// A span closer. Among the Children of Israel was a man who had killed ninety-nine. He set out asking whether he could
// repent; a monk told him no, and he killed him too. He kept on asking until a man told him to go to such and such a
// village, and death overtook him on the way. Allah told that village to come near and the one he had left to go far;
// then the two were measured, and he was found a span closer to the village ahead, so he was forgiven (Sahih
// al-Bukhari 3470). No one is drawn, and nothing of the killing: only the two villages, the road between them, a voice
// asking and a voice answering, a dashed way that stops on the road, a ring where it stopped, the villages moving, and
// the lines that measure them. Before they move, the way's end is nearer the village he left; after, it is nearer the
// village ahead, by a little.
function spanCloser(): SignArt {
  const darkTown =
    home(12, 98, 14, 16, "#8E7E70", "#6E6054", "#3A2E28") +
    home(28, 98, 13, 21, "#837364", "#655649", "#3A2E28");
  const goodTown =
    home(130, 98, 13, 18, "#D9A66A", "#B98546", "#7A5A38") +
    home(145, 98, 15, 14, "#F7EBD0", "#D9BF8E", "#9C7A4E") +
    palm(122, 99, 20) +
    palm(157, 99, 22) +
    tuft(124, 100, "#7FB24E", 4) +
    tuft(150, 102, "#7FB24E", 4) +
    glow(140, 88, 18, "#FFF0C0", 0.08);
  const hut = `<path d="M47 96 L47 89 L52.5 85 L58 89 L58 96 Z" fill="#B59A78"/><rect x="51" y="91" width="3" height="5" fill="#6B4A2E"/>`;
  const measure = (from: number, to: number, y: number, color: string) =>
    `<path d="M${from} ${y} L${to} ${y}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1.6 1.2"/>` +
    `<path d="M${from} ${n(y - 2)} L${from} ${n(y + 2)} M${to} ${n(y - 2)} L${to} ${n(y + 2)}" stroke="${color}" stroke-width="0.9"/>`;
  // Both villages move 6 to the left: the one ahead comes near, the one he left goes far. The way stops at 74, 39.5
  // from the village he left (its edge at 34.5) and 48 from the one ahead (its first palm at 122); after the move, 45.5
  // and 42.
  const moving: [number, number, number][] = [
    [0.62, 0, 0],
    [0.7, -6, 0]
  ];
  return {
    kind: "a-span-closer",
    ms: 12000,
    parts: [
      { name: "the sky", svg: sky("#EBDDBE", "#DCC79C", 64) },
      {
        name: "the land",
        svg: landOf(
          [
            [70, 112],
            [100, 108],
            [8, 110]
          ],
          "#DCC79C"
        )
      },
      { name: "far hills", svg: peaks([[58, 8, 30], [100, 10, 34]], 64, "#D2BC92", false) },
      { name: "the road between the two villages", svg: `<path d="M0 100 C40 98 110 102 160 99" stroke="#F5EBD3" stroke-width="5" fill="none" stroke-linecap="round"/>` },
      { name: "the village he left", svg: darkTown, keys: track({ xy: moving }) },
      { name: "the village ahead", svg: goodTown, keys: track({ xy: moving }) },
      { name: "a hut by the road", svg: hut },
      { name: "a voice, asking: can I repent?", svg: arcs(37, 88, VOICE), keys: showWhile(0.05, 0.07, 0.13, 0.15), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      { name: "a voice from the hut, answering", svg: arcsLeft(46, 87, VOICE), keys: showWhile(0.24, 0.26, 0.3, 0.32), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      { name: "a way, setting out for the village", svg: way("M38 101.6 C44 101.2 50 101 56 101.1", GOLD, 1.1), keys: showFrom(0.32, 0.36) },
      { name: "the way, going on", svg: way("M56 101.1 C62 101.3 67 101.4 71.4 101.4", GOLD, 1.1), keys: showFrom(0.44, 0.5) },
      { name: "a ring, where the way stopped", svg: ring(74, 102, 3.4, VOICE), keys: showFrom(0.5, 0.52) },
      { name: "a line, measured to the village he left", svg: measure(74, 28.5, 110, VOICE), keys: showFrom(0.82, 0.85) },
      { name: "a line, measured to the village ahead", svg: measure(74, 116, 110, GOLD), keys: showFrom(0.84, 0.87) },
      { name: "a glow, where the way stopped", svg: glow(74, 100, 10, "#FFE6A0", 0.14), keys: showFrom(0.86, 0.9) },
      ...risingSparks(
        "forgiveness, rising",
        [
          [69, 98],
          [74, 96],
          [79, 98]
        ],
        0.86,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "A killer of a hundred asked: can I repent?", from: 0.02, to: 0.2 },
      { text: "The man was told: go to such a village", from: 0.22, to: 0.4 },
      { text: "On the way, death overtook the man", from: 0.42, to: 0.58 },
      { text: "This village was told: come near; that, go far", from: 0.6, to: 0.78 },
      { text: "A span closer to that village: forgiven", from: 0.8, to: 1 }
    ]
  };
}

// Uhud shook. The Prophet ﷺ went up Uhud with Abu Bakr, Umar and Uthman, and the mountain shook beneath them. He ﷺ said:
// be firm, Uhud, for on you are a Prophet, a Siddiq and two martyrs (Sahih al-Bukhari 3675, 3686). No one is drawn: a
// dashed way climbs the mountain and four rings stand on its top; the mountain shakes, a voice says "be firm" and it
// stills, and a glow comes on each ring in turn, one, one, then two.
function uhudShook(): SignArt {
  const mountain =
    `<path d="M4 96 C18 84 30 74 44 68 C56 62 68 54 80 50 C88 48 92 50 100 56 C112 64 128 72 142 82 C150 88 156 92 160 96 Z" fill="#B5715A"/>` +
    `<path d="M80 50 C88 48 92 50 100 56 C112 64 128 72 142 82 C150 88 156 92 160 96 L110 96 C104 82 92 66 80 50 Z" fill="#000000" opacity="0.12"/>` +
    `<path d="M40 76 C46 74 52 76 56 73 M108 70 C114 72 118 70 124 74 M66 66 C70 65 72 66 76 64" stroke="#9A5C48" stroke-width="0.8" fill="none"/>`;
  const shake: [number, number, number][] = [
    [0.28, 0, 0],
    [0.295, 1.4, 0],
    [0.31, -1.4, 0],
    [0.325, 1.4, 0],
    [0.34, -1.4, 0],
    [0.355, 1.2, 0],
    [0.37, -1.2, 0],
    [0.385, 1, 0],
    [0.4, -0.8, 0],
    [0.415, 0, 0],
    [0.49, 0, 0],
    [0.495, 1, 0],
    [0.5, -1, 0],
    [0.505, 0.6, 0],
    [0.51, 0, 0]
  ];
  const places: [number, number][] = [
    [74, 56.4],
    [80, 54],
    [86.6, 54.6],
    [92.4, 57]
  ];
  return {
    kind: "uhud-shook",
    ms: 11000,
    parts: [
      { name: "the sky", svg: sky("#CFE3F0", "#E2CB9C", 92) },
      {
        name: "the land",
        svg: `<rect y="92" width="160" height="28" fill="#E2CB9C"/>` + tuft(40, 110, "#A99A5A", 3.4) + tuft(120, 112, "#A99A5A", 3.4)
      },
      { name: "Mount Uhud", svg: mountain, keys: track({ xy: shake }) },
      { name: "a palm of Madinah", svg: palm(14, 108, 24), origin: { x: 14, y: 108 }, loop: { move: "sway", ms: 4800, angle: 1 } },
      { name: "another palm of Madinah", svg: palm(148, 110, 20), origin: { x: 148, y: 110 }, loop: { move: "sway", ms: 5400, angle: 1, phase: 0.4 } },
      {
        name: "a way, climbing the mountain",
        svg: way("M58 98 C66 90 60 84 68 76 C76 68 70 62 79 56", CREAM, 1.1),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.14, 1]
          ],
          xy: shake
        })
      },
      {
        name: "four places on the top",
        svg: places.map(([x, y]) => ring(x, y, 2.3, CREAM)).join(""),
        keys: track({
          opacity: [
            [0.14, 0],
            [0.18, 1]
          ],
          xy: shake
        })
      },
      puff("dust below the mountain 1", 30, 92, 0.3),
      puff("dust below the mountain 2", 126, 92, 0.33),
      puff("dust below the mountain 3", 62, 94, 0.36),
      {
        name: "a pebble, rolling down",
        svg: `<circle cx="104" cy="60" r="1.4" fill="#8A5444"/>`,
        keys: track({
          opacity: [
            [0.3, 0],
            [0.305, 1],
            [0.37, 1],
            [0.38, 0]
          ],
          xy: [
            [0.3, 0, 0],
            [0.38, 22, 26]
          ]
        })
      },
      {
        name: "a voice on the top, saying: be firm",
        svg: arcs(96, 52, CREAM),
        keys: showWhile(0.505, 0.515, 0.58, 0.6),
        loop: { move: "twinkle", ms: 1300, low: 0.6 }
      },
      { name: "a glow on the first place", svg: glow(74, 56.4, 7, "#FFE6A0", 0.22), keys: showFrom(0.68, 0.7) },
      { name: "a glow on the second place", svg: glow(80, 54, 7, "#FFE6A0", 0.22), keys: showFrom(0.74, 0.76) },
      { name: "glows on the other two places", svg: glow(86.6, 54.6, 7, "#FFE6A0", 0.22) + glow(92.4, 57, 7, "#FFE6A0", 0.22), keys: showFrom(0.8, 0.82) },
      ...risingSparks(
        "light, rising from the top",
        [
          [72, 52],
          [82, 49],
          [92, 52]
        ],
        0.84,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "Up Uhud with Abu Bakr, Umar and Uthman", from: 0.02, to: 0.24 },
      { text: "And the mountain shook beneath them", from: 0.26, to: 0.46 },
      { text: "Be firm, Uhud!", from: 0.48, to: 0.64 },
      { text: "On you are a Prophet, a Siddiq and two martyrs", from: 0.66, to: 1 }
    ]
  };
}

// The stone that greeted him. The Prophet ﷺ said: I know a stone in Makkah that used to greet me with salam before I
// was sent as a Prophet; I know it even now (Sahih Muslim 2277). No one is drawn: a dashed way goes along a valley of
// Makkah past a stone, and a voice greets from the stone; a night passes and it greets again, for it used to greet
// him; then the stone shines, and light rises from it.
function greetingStone(): SignArt {
  const hills =
    peaks(
      [
        [14, 30, 26],
        [146, 34, 28]
      ],
      70,
      "#8C6E5A",
      false
    ) +
    peaks(
      [
        [44, 20, 22],
        [116, 22, 24]
      ],
      70,
      "#7A5E4C",
      false
    );
  const town = [58, 66, 74, 84, 92, 100].map((x, i) => `<rect x="${x}" y="${64 - (i % 2) * 2}" width="6" height="${6 + (i % 2) * 2}" fill="#C9A877"/>`).join("");
  const stone = `<path d="M90 101 Q89 90 100 89 Q112 89 111 101 Z" fill="#9C8B78"/><path d="M93 95 Q96 91.4 101 91" stroke="#BDAE9A" stroke-width="1.1" fill="none"/>`;
  return {
    kind: "greeting-stone",
    ms: 11000,
    parts: [
      { name: "the sky at morning", svg: sky("#F3D9B5", "#E8D0A2", 70) },
      {
        name: "the sun, rising",
        svg: sun(80, 50),
        keys: track({
          xy: [
            [0.02, 0, 14],
            [0.14, 0, 0],
            [0.53, 0, 0],
            [0.555, 0, 24],
            [0.585, 0, 24],
            [0.61, 0, 0]
          ]
        })
      },
      { name: "homes of Makkah, far off", svg: town },
      { name: "the hills of Makkah", svg: hills },
      {
        name: "the valley",
        svg: `<rect y="70" width="160" height="50" fill="#E8D0A2"/><path d="M0 70 L160 70" stroke="#D2B47E" stroke-width="0.7"/>` + tuft(20, 112, "#A99A5A", 3.4) + tuft(130, 114, "#A99A5A", 3.4)
      },
      { name: "a path through the valley", svg: `<path d="M0 112 C40 108 80 103 160 100" stroke="#F2E4C4" stroke-width="5" fill="none" stroke-linecap="round"/>` },
      { name: "a stone by the path", svg: stone },
      { name: "a way along the valley", svg: way("M4 111 C30 108 60 104 84 102.6", GOLD, 1.1), keys: showFrom(0.06, 0.16) },
      { name: "the way, passing the stone", svg: way("M84 102.6 C104 101.6 120 101 140 100.6", GOLD, 1.1), keys: showFrom(0.27, 0.31) },
      { name: "a voice from the stone, greeting", svg: arcsLeft(89, 93, VOICE), keys: showWhile(0.32, 0.34, 0.48, 0.5), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      { name: "a glow on the stone", svg: glow(100, 95, 13, "#FFE6A0", 0.14), keys: showWhile(0.32, 0.34, 0.48, 0.5) },
      {
        name: "a night, passing",
        svg: `<rect width="160" height="120" fill="#1B2A4A"/>`,
        keys: track({
          opacity: [
            [0.53, 0],
            [0.56, 0.5],
            [0.58, 0.5],
            [0.61, 0]
          ]
        })
      },
      { name: "the voice from the stone, again", svg: arcsLeft(89, 93, VOICE), keys: showWhile(0.625, 0.64, 0.665, 0.68), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      { name: "the stone, shining", svg: glow(100, 95, 15, "#FFE6A0", 0.16), keys: showFrom(0.76, 0.8) },
      ...risingSparks(
        "light, rising from the stone",
        [
          [94, 90],
          [100, 88],
          [106, 90]
        ],
        0.82,
        0.02,
        { color: SPARK, rise: 10, stay: true }
      )
    ],
    words: [
      { text: "In Makkah, before he was sent as a Prophet", from: 0.02, to: 0.22 },
      { text: "A stone would greet him with salam", from: 0.24, to: 0.5 },
      { text: "It greeted him again and again", from: 0.52, to: 0.72 },
      { text: "He said: I know that stone, even now", from: 0.74, to: 1 }
    ]
  };
}

// Around us, not on us. On a Friday, while the Prophet ﷺ gave the khutbah, a man said: the animals are dying and the
// roads are cut, so pray to Allah for rain. He ﷺ prayed, and a cloud like a shield rose from behind Sal'; it spread and
// rained, and they did not see the sun for a week. The next Friday a man asked him to pray for it to stop, and he ﷺ
// said: O Allah, around us, not on us; on the hills and the valleys. The clouds moved off the town, and they walked out
// in the sun (Sahih al-Bukhari 1013). No one is drawn: voices in the mosque, the cloud, the rain on the town and the
// land turning green; then the clouds part, the rain stays on the hills around, and ways go out in the sun.
function aroundUs(): SignArt {
  const roof =
    `<rect x="50" y="80" width="50" height="5" fill="#8A6440"/>` +
    Array.from({ length: 7 }, (_, i) => `<path d="M${50 + i * 7} 84 L${53.5 + i * 7} 80.6 L${57 + i * 7} 84" stroke="#6E8C3A" stroke-width="1" fill="none"/>`).join("");
  const mosque =
    roof +
    `<rect x="52" y="85" width="46" height="15" fill="#E9D6A8"/>` +
    [58, 70, 82, 94].map((x) => `<rect x="${x - 1.2}" y="85" width="2.4" height="15" fill="#A87444"/>`).join("") +
    `<path d="M72 100 L72 92 Q75 89 78 92 L78 100 Z" fill="#8A6440"/>`;
  const town = home(38, 100, 18, 16) + home(122, 100, 20, 18);
  const cracks = `<path d="M10 106 L16 108 L14 112 M36 110 L44 107 L48 111 M104 108 L112 111 L118 108 M130 112 L138 109" stroke="#B89A6A" stroke-width="0.8" fill="none"/>`;
  const greenLand = `<rect y="70" width="160" height="50" fill="#B9D48A"/>` + [12, 40, 108, 136, 150].map((x, i) => tuft(x, 108 + (i % 2) * 4, "#5FA344", 4)).join("");
  const band = (from: number, to: number) => [from, from + 20, from + 40].filter((x) => x < to).map((x, i) => cloud(x + 10, 38 + (i % 2) * 4, 0.9, "#8E99A8")).join("");
  return {
    kind: "around-us",
    ms: 12000,
    parts: [
      { name: "the sky", svg: sky("#D9E8F0", "#E2CB9C", 70) },
      {
        name: "the sun",
        svg: sun(28, 28),
        keys: track({
          opacity: [
            [0.42, 1],
            [0.45, 0],
            [0.82, 0],
            [0.85, 1]
          ]
        })
      },
      {
        name: "a cloud like a shield",
        svg: cloud(118, 62, 0.5, "#9AA6B4"),
        origin: { x: 118, y: 62 },
        keys: track({
          xy: [
            [0.28, 0, 0],
            [0.345, -6, -22]
          ],
          scale: [
            [0.28, 1],
            [0.345, 1.8]
          ],
          opacity: [
            [0.42, 1],
            [0.46, 0]
          ]
        })
      },
      {
        name: "the mountain Sal'",
        svg: peaks([[118, 26, 30]], 70, "#A88466", false)
      },
      {
        name: "hills around the town",
        svg: peaks(
          [
            [8, 14, 20],
            [154, 14, 20]
          ],
          70,
          "#B59A78",
          false
        )
      },
      {
        name: "the land",
        svg: `<rect y="70" width="160" height="50" fill="#E2CB9C"/><path d="M0 70 L160 70" stroke="#CDB283" stroke-width="0.7"/>` + tuft(30, 112, "#A99A5A", 3.4) + tuft(90, 114, "#A99A5A", 3.4)
      },
      {
        name: "cracks in the dry land",
        svg: cracks,
        keys: track({
          opacity: [
            [0.46, 1],
            [0.52, 0]
          ]
        })
      },
      {
        name: "the land, green again",
        svg: greenLand,
        keys: track({
          opacity: [
            [0.46, 0],
            [0.54, 1]
          ]
        })
      },
      {
        name: "puddles",
        svg: `<ellipse cx="44" cy="110" rx="6" ry="1.4" fill="#9CC0DA"/><ellipse cx="110" cy="112" rx="7" ry="1.5" fill="#9CC0DA"/>`,
        keys: track({
          opacity: [
            [0.5, 0],
            [0.54, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.7 }
      },
      { name: "homes of the town", svg: town },
      { name: "the mosque", svg: mosque },
      { name: "a palm in the town", svg: palm(108, 102, 22), origin: { x: 108, y: 102 }, loop: { move: "sway", ms: 4600, angle: 1 } },
      { name: "a voice in the mosque, asking", svg: arcs(64, 92, VOICE), keys: showWhile(0.04, 0.06, 0.16, 0.18), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      { name: "a voice from the mosque, praying", svg: arcs(84, 90, VOICE), keys: showWhile(0.21, 0.23, 0.27, 0.29), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      {
        name: "the sky, gray with rain",
        svg: `<rect width="160" height="70" fill="#5E6A7A"/>`,
        keys: track({
          opacity: [
            [0.42, 0],
            [0.46, 0.4],
            [0.68, 0.4],
            [0.74, 0.08]
          ]
        })
      },
      {
        name: "rain clouds to the left",
        svg: band(-10, 80),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.46, 1]
          ],
          xy: [
            [0.68, 0, 0],
            [0.74, -38, 6]
          ]
        })
      },
      {
        name: "rain clouds to the right",
        svg: band(70, 170),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.46, 1]
          ],
          xy: [
            [0.68, 0, 0],
            [0.74, 38, 6]
          ]
        })
      },
      {
        name: "rain on the town",
        svg: rainStreaks(26, 134, 40, 110),
        clip: { x: 26, y: 44, w: 108, h: 64 },
        keys: track({
          opacity: [
            [0.44, 0],
            [0.46, 1],
            [0.68, 1],
            [0.72, 0]
          ]
        }),
        loop: { move: "fall", ms: 650, period: 60 }
      },
      {
        name: "rain on the hills around",
        svg: rainStreaks(0, 26, 40, 110) + rainStreaks(134, 160, 40, 110),
        clip: { x: 0, y: 44, w: 160, h: 64 },
        keys: track({
          opacity: [
            [0.44, 0],
            [0.46, 1]
          ]
        }),
        loop: { move: "fall", ms: 650, period: 60 }
      },
      { name: "a voice from the mosque, praying again", svg: arcs(84, 90, VOICE), keys: showWhile(0.61, 0.63, 0.67, 0.69), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      { name: "a way, walking out in the sun", svg: way("M74 100 C64 106 50 108 36 108", VOICE, 1), keys: showFrom(0.84, 0.88) },
      { name: "another way, walking out in the sun", svg: way("M77 100 C88 106 104 108 118 108", VOICE, 1), keys: showFrom(0.86, 0.9) }
    ],
    words: [
      { text: "On a Friday, in the khutbah: pray for rain", from: 0.02, to: 0.18 },
      { text: "A cloud like a shield rose behind Sal'", from: 0.2, to: 0.38 },
      { text: "It rained, and no sun was seen for a week", from: 0.4, to: 0.58 },
      { text: "Around us, not on us", from: 0.6, to: 0.78 },
      { text: "And they walked out in the sun", from: 0.8, to: 1 }
    ]
  };
}

// The blessed water, and the food that glorified Allah. On a journey the water ran short. A little water was brought
// in a vessel, and the Prophet ﷺ said: come to the blessed water, and the blessing is from Allah. Ibn Mas'ud saw the
// water flow, and said: we used to hear the food glorifying Allah as it was eaten (Sahih al-Bukhari 3579). No one is
// drawn, not even a hand: the bowl is brought along a dashed way, a voice speaks by it, the water wells up and spills
// over, and small dashed circles come to the water in turn; then a meal is set out, and voices and sparks rise from
// the food.
function blessedWater(): SignArt {
  const dunes =
    `<path d="M0 66 C20 58 40 58 60 64 C80 58 100 56 122 62 C138 58 150 58 160 62 L160 70 L0 70 Z" fill="#E1C48E"/>` +
    `<path d="M0 70 L160 70" stroke="#D2B47E" stroke-width="0.7"/>`;
  const bowl = `<path d="M70 96 Q70 103.4 80 103.4 Q90 103.4 90 96 Z" fill="#B5713F"/><ellipse cx="80" cy="96" rx="10" ry="2.2" fill="#9C5E32"/>`;
  const water = `<ellipse cx="80" cy="96.2" rx="8.4" ry="1.6" fill="#7AB4DE"/>`;
  const spring =
    [-1, 1]
      .map((s) => `<path d="M80 95.4 Q${n(80 + s * 3)} 89 ${n(80 + s * 7)} 94.4" stroke="#8CC4EA" stroke-width="1" fill="none" stroke-linecap="round"/>`)
      .join("") + `<path d="M80 95.4 L80 90.6" stroke="#8CC4EA" stroke-width="1" stroke-linecap="round"/>`;
  const meal =
    `<path d="M106 104 L132 104 L134 110 L104 110 Z" fill="#EFE0BC"/>` +
    `<ellipse cx="113" cy="104" rx="4.4" ry="1.6" fill="#D9A44A"/><ellipse cx="113" cy="103.6" rx="3.4" ry="1" fill="#E8C070"/>` +
    [124, 126.6, 129.2].map((x) => `<ellipse cx="${x}" cy="104.4" rx="1.1" ry="1.5" fill="#9C3D1E"/>`).join("");
  const toTheWater = (i: number, x: number, y: number): SignPart => {
    const from = at3(0.46 + i * 0.015);
    return { name: `someone, coming to the water ${i + 1}`, svg: someone(x, y, 2.6), keys: showWhile(from, at3(from + 0.01), at3(from + 0.04), at3(from + 0.05)) };
  };
  return {
    kind: "blessed-water",
    ms: 12000,
    parts: [
      { name: "the sky", svg: sky("#F2DDB4", "#E8D2A2", 66) },
      { name: "dunes", svg: dunes },
      {
        name: "the land",
        svg: `<rect y="70" width="160" height="50" fill="#E8D2A2"/>` + tuft(10, 112, "#A99A5A", 3.4) + tuft(150, 114, "#A99A5A", 3.4)
      },
      { name: "a camel, resting", svg: animalAt("camel", 2, 66, 0.2), loop: { move: "bob", ms: 3600, y: 0.4 } },
      { name: "another camel, resting", svg: animalAt("camel", 132, 64, 0.2, true), loop: { move: "bob", ms: 4200, y: 0.4, phase: 0.5 } },
      {
        name: "a way, bringing a little water",
        svg: way("M152 106 C130 108 108 106 91 100.6", GOLD, 1.1),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.1, 1],
            [0.205, 1],
            [0.215, 0]
          ]
        })
      },
      {
        name: "a bowl with a little water",
        svg: bowl,
        keys: track({
          opacity: [
            [0.08, 0],
            [0.09, 1]
          ],
          xy: [
            [0.08, 56, 6],
            [0.16, 0, 0]
          ]
        })
      },
      {
        name: "the water in the bowl",
        svg: water,
        origin: { x: 80, y: 96.2 },
        keys: track({
          opacity: [
            [0.08, 0],
            [0.09, 1]
          ],
          xy: [
            [0.08, 56, 6],
            [0.16, 0, 0]
          ],
          scale: [
            [0.32, 0.4],
            [0.37, 1]
          ]
        })
      },
      { name: "a voice by the bowl", svg: arcs(62, 92, VOICE), keys: showWhile(0.24, 0.26, 0.4, 0.42), loop: { move: "twinkle", ms: 1300, low: 0.55 } },
      {
        name: "water, welling up",
        svg: spring,
        keys: track({
          opacity: [
            [0.365, 0],
            [0.38, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 700, low: 0.6 }
      },
      {
        name: "water, spilling over",
        svg: `<path d="M70.6 97 L70.2 101 M89.4 97 L89.8 101" stroke="#8CC4EA" stroke-width="0.9" stroke-linecap="round"/>`,
        keys: track({
          opacity: [
            [0.365, 0],
            [0.38, 1]
          ]
        }),
        loop: { move: "drip", ms: 900, distance: 3 }
      },
      toTheWater(0, 62, 103),
      toTheWater(1, 98, 103),
      toTheWater(2, 66, 109.6),
      toTheWater(3, 94, 109.6),
      toTheWater(4, 74, 113.4),
      toTheWater(5, 86, 113.4),
      {
        name: "a meal on a cloth",
        svg: meal,
        keys: track({
          opacity: [
            [0.66, 0],
            [0.69, 1]
          ]
        })
      },
      {
        name: "voices from the food",
        svg: arcsLeft(110, 99, VOICE) + arcs(130, 99, VOICE),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.74, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.45 }
      },
      ...risingSparks(
        "praise, rising from the food",
        [
          [113, 100],
          [120, 98],
          [127, 100]
        ],
        0.76,
        0.03,
        { color: SPARK, rise: 12, stay: true }
      )
    ],
    words: [
      { text: "On a journey, the water ran short", from: 0.02, to: 0.2 },
      { text: "Come to the water: the blessing is from Allah", from: 0.22, to: 0.42 },
      { text: "The water flowed from among his fingers", from: 0.44, to: 0.62 },
      { text: "Abdullah: we heard the food glorify Allah", from: 0.64, to: 1 }
    ]
  };
}

export const GRACE_ART = {
  "lamp-out": lampOut,
  "helped-at-home": helpedHome,
  "a-span-closer": spanCloser,
  "uhud-shook": uhudShook,
  "greeting-stone": greetingStone,
  "around-us": aroundUs,
  "blessed-water": blessedWater
} as const;
