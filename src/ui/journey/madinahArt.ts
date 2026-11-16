import { animalAt, cloud, flame, flower, glow, n, sky, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3 } from "./storyArt";
import { home } from "./trialArt";
import { prayerMat } from "./lovedArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, palms, sparkRising, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { goldLight } from "./heedArt";
import { kabah } from "./historyArt";
import { risingSparks } from "./charityArt";
import { dayLit, road, saddled, showAt, showFor, SOFT_GOLD, weekDay } from "./roadArt";

/**
 * Madinah, his city ﷺ, and his masjid: hurrying home at the sight of its walls; faith going back to it as a snake goes
 * back to its hole; a plot against its folk melting like salt in water; the furnace that drives out its dross; between
 * his house and his pulpit, a garden of the gardens of Paradise; a prayer in his masjid better than a thousand; and
 * Masjid Quba every Saturday. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand or a face, and no one is drawn on a camel: where someone was,
 * a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing
 * is drawn for Allah, and nothing comes down from the sky: a prayer is a spark that rises, and what is loved or blessed
 * is a warm glow about its place. Paradise is not drawn: the garden between his house and his pulpit is only a soft
 * green light with small leaves, and his Pool only a soft blue light.
 */

/** The low mud-brick walls of Madinah from x1 to x2, their foot at y, `h` high; `gate`: the middle of a way in. */
const townWall = (x1: number, x2: number, y: number, h: number, gate?: number) => {
  const top = n(y - h);
  const rows = [0.36, 0.68].map((k) => `<path d="M${x1} ${n(y - h * k)} L${x2} ${n(y - h * k)}" stroke="#B48F5E" stroke-width="0.4"/>`).join("");
  const joints = Array.from({ length: Math.floor((x2 - x1) / 6) }, (_, i) => {
    const x = n(x1 + 3 + i * 6);
    return `<path d="M${x} ${n(y - h * 0.36)} L${x} ${y} M${n(x + 3)} ${n(y - h * 0.68)} L${n(x + 3)} ${n(y - h * 0.36)}" stroke="#B48F5E" stroke-width="0.35"/>`;
  }).join("");
  const way =
    gate === undefined
      ? ""
      : `<path d="M${n(gate - 3)} ${y} L${n(gate - 3)} ${n(top + 2.6)} Q${gate} ${n(top + 0.4)} ${n(gate + 3)} ${n(top + 2.6)} L${n(gate + 3)} ${y} Z" fill="#6E5638"/>`;
  return `<rect x="${x1}" y="${top}" width="${n(x2 - x1)}" height="${h}" fill="#D4B07C"/>` + rows + joints + `<rect x="${x1}" y="${top}" width="${n(x2 - x1)}" height="1" fill="#BC955F"/>` + way;
};

/** Quick brown strokes behind (x, y): going fast. */
const quick = (x: number, y: number) =>
  [
    [0, -3.2, 6],
    [-2, 0, 7.4],
    [0, 3.2, 5]
  ]
    .map(([dx, dy, w]) => `<path d="M${n(x + dx - w)} ${n(y + dy)} L${n(x + dx)} ${n(y + dy)}" stroke="#A88458" stroke-width="0.8" stroke-linecap="round" opacity="0.85"/>`)
    .join("");

// Hurrying home with love. Anas said: whenever the Prophet ﷺ came back from a journey and saw the walls of Madinah,
// he made his mount go fast, and if he was on a riding animal, he urged it on, out of his love for Madinah (Sahih
// al-Bukhari 1886). No one is drawn, and no one is drawn on a camel: a camel with a saddle cloth comes along the road
// with a golden ring about its feet, his place, back from a journey. Far off, Madinah is pale in the haze: its walls,
// its homes, its masjid and its palms. The haze clears, a faint golden line goes from the camel to the walls, and a soft
// ring comes about them: seen. The camel goes fast, quick strokes behind it, up to the walls; and a warm glow comes over
// Madinah, with sparks rising from it: his love for it.
function wallsOfMadinah(): SignArt {
  const s = 0.2;
  const y = 101;
  const x0 = 10;
  const walked = 34;
  const ran = 84;
  const town: [number, number] = [129, 86];
  return {
    kind: "walls-of-madinah",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "clouds", svg: cloud(76, 22, 0.55, "#FFFFFF", 0.9) + cloud(132, 14, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms(
        [
          [104, 92, 22],
          [140, 88, 18],
          [148, 93, 20]
        ],
        "Madinah"
      ),
      { name: "homes of Madinah", svg: home(112, 93, 11, 14) + home(153, 93, 10, 15) },
      { name: "the masjid of Madinah", svg: madinahMasjid(119, 93, 0.55) },
      { name: "the walls of Madinah", svg: townWall(100, 160, 100, 9, 106) },
      { name: "a haze over Madinah, far off", svg: wash(town[0], town[1], 36, 18, "#EEF6FB", 0.3), keys: track({ opacity: [[0.25, 1], [0.28, 0]] }) },
      { name: "the road home", svg: road(0, 106, y + 1) },
      {
        name: "a golden ring about his mount: his place",
        svg: ring(x0, y + 1.2, 6.6, GOLD),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.17, walked, 0],
            [0.48, walked, 0],
            [0.62, ran, 0]
          ]
        })
      },
      {
        name: "his mount, back from a journey",
        svg: saddled(x0, y, s),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.17, walked, 0]
          ],
          opacity: [
            [0.47, 1],
            [0.48, 0]
          ]
        }),
        loop: { move: "bob", ms: 1800, y: -0.3 }
      },
      { name: "Madinah in sight: a faint golden line", svg: lookLine(n(x0 + walked + 7.4), n(y - 12), 100, 92, 82), keys: showFor(0.28, 0.3, 0.46, 0.47) },
      { name: "Madinah in sight: a soft ring about its walls", svg: care(town[0], 91, 30, 12, SOFT_GOLD), keys: showAt(0.3, 0.33), loop: soft },
      {
        name: "his mount, going fast",
        svg: saddled(x0 + walked, y, s),
        keys: track({
          opacity: [
            [0.47, 0],
            [0.48, 1]
          ],
          xy: [
            [0.48, 0, 0],
            [0.62, ran - walked, 0]
          ]
        }),
        loop: { move: "bob", ms: 520, y: -0.9 }
      },
      {
        name: "going fast: quick strokes behind it",
        svg: quick(x0 + walked - 11, y - 7),
        keys: track({
          opacity: [
            [0.48, 0],
            [0.49, 1],
            [0.61, 1],
            [0.62, 0]
          ],
          xy: [
            [0.48, 0, 0],
            [0.62, ran - walked, 0]
          ]
        })
      },
      { name: "his love for Madinah: a warm glow over it", svg: wash(town[0], town[1], 34, 16, WARM, 0.14), keys: showAt(0.73, 0.76), loop: soft },
      ...risingSparks(
        "love for Madinah, rising",
        [
          [112, 78],
          [128, 74],
          [142, 77],
          [154, 80]
        ],
        0.76,
        0.03,
        { color: SPARK, rise: 12, stay: true }
      )
    ],
    words: [
      { text: "When he came back from a journey", from: 0.02, to: 0.22 },
      { text: "And saw the walls of Madinah", from: 0.24, to: 0.44 },
      { text: "He made his mount go faster", from: 0.46, to: 0.7 },
      { text: "Out of his love for Madinah", from: 0.72, to: 1 }
    ]
  };
}

/** Madinah in the middle of the land: palms behind, homes, its masjid, and its walls with the gate at x 84. */
const middleTown = (): SignPart[] => [
  ...palms(
    [
      [50, 85, 20],
      [96, 76, 13],
      [124, 86, 22]
    ],
    "Madinah"
  ),
  { name: "homes of Madinah", svg: home(56, 86, 12, 13) + home(105, 86, 12, 14) + home(117, 86, 8, 10) },
  { name: "the masjid of Madinah", svg: madinahMasjid(65, 86, 0.6) },
  { name: "the walls of Madinah", svg: townWall(46, 122, 91, 7, 84) }
];

// Faith goes home to Madinah. Abu Hurairah said that the Messenger of Allah ﷺ said: faith returns to Madinah, as a
// snake returns to its hole (Sahih al-Bukhari 1876). No one is drawn: Madinah stands in the middle of the land, its
// walls, homes, masjid and palms, with ways coming to it from far. Small golden lights, faith, come along the ways from
// far off, go in at its gate and stay there, and a warm glow and a soft ring come about it. Then, among rocks, a snake
// comes and slides along to its hole, and goes into it, and a soft ring comes about the hole.
function faithReturns(): SignArt {
  const gate: [number, number] = [84, 92];
  const left: [number, number][] = [
    [4, 100],
    [44, 97.4]
  ];
  const right: [number, number][] = [
    [156, 103],
    [120, 99.6]
  ];
  const lights: { way: [number, number][]; end: [number, number]; at: number }[] = [
    { way: left, end: [62, 79], at: 0.04 },
    { way: right, end: [104, 77], at: 0.07 },
    { way: left, end: [74, 76], at: 0.11 },
    { way: right, end: [92, 75], at: 0.14 },
    { way: left, end: [80, 81], at: 0.18 },
    { way: right, end: [114, 80], at: 0.21 }
  ];
  const head: [number, number] = [18.3, 88.5];
  const hole: [number, number] = [52.6, 96.6];
  const rocks =
    `<ellipse cx="38" cy="103.4" rx="4.4" ry="2.4" fill="#A88E66"/><ellipse cx="80" cy="104" rx="3.6" ry="2.1" fill="#A88E66"/>` +
    `<path d="M45 104.6 Q46 92 58.6 91 Q72 90.4 76 104.6 Z" fill="#B49A72"/>` +
    `<path d="M60 93 Q68 94 70 101" stroke="#9A8060" stroke-width="0.6" fill="none"/><ellipse cx="66" cy="98" rx="2.2" ry="1.4" fill="#A0865E"/>` +
    `<ellipse cx="${hole[0]}" cy="${hole[1]}" rx="3.4" ry="2.5" fill="#3A2A1C"/><path d="M49.4 95.4 Q52.6 93.4 55.8 95.4" stroke="#8C7350" stroke-width="0.6" fill="none"/>`;
  return {
    kind: "faith-returns",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(140, 20) },
      { name: "clouds", svg: cloud(40, 20, 0.55, "#FFFFFF", 0.9) + cloud(100, 30, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a way from far off, on the left", svg: way(`M${left[0][0]} ${left[0][1]} Q${left[1][0]} ${left[1][1]} ${gate[0] - 2} ${gate[1]}`, "#F4E3BC", 1.1) },
      { name: "a way from far off, on the right", svg: way(`M${right[0][0]} ${right[0][1]} Q${right[1][0]} ${right[1][1]} ${gate[0] + 2} ${gate[1]}`, "#F4E3BC", 1.1) },
      ...middleTown(),
      ...lights.map(
        ({ way: [from, mid], end, at }, i): SignPart => ({
          name: `faith, a small light going back to Madinah ${i + 1}`,
          svg: goldLight(from[0], from[1], 1.5),
          keys: track({
            opacity: [
              [at, 0],
              [at3(at + 0.01), 1]
            ],
            xy: [
              [at3(at + 0.01), 0, 0],
              [at3(at + 0.05), n(mid[0] - from[0]), n(mid[1] - from[1])],
              [at3(at + 0.09), n(gate[0] - from[0]), n(gate[1] - 1 - from[1])],
              [at3(at + 0.13), n(end[0] - from[0]), n(end[1] - from[1])]
            ]
          }),
          loop: { move: "twinkle", ms: 1100, low: 0.6, phase: i / 6 }
        })
      ),
      { name: "faith at home in Madinah: a warm glow", svg: wash(84, 80, 40, 14, WARM, 0.14), keys: showAt(0.36, 0.39), loop: soft },
      { name: "faith at home in Madinah: a soft ring about it", svg: care(84, 86, 42, 12, SOFT_GOLD), keys: showAt(0.37, 0.4), loop: soft },
      { name: "rocks, and a hole among them", svg: rocks, keys: showAt(0.49, 0.5) },
      {
        name: "a snake, going back to its hole",
        svg: animalAt("snake", 2, 82, 0.24),
        origin: { x: head[0], y: head[1] },
        keys: track({
          opacity: [
            [0.49, 0],
            [0.5, 1],
            [0.62, 1],
            [0.66, 0]
          ],
          xy: [
            [0.5, 0, 0],
            [0.62, n(hole[0] - head[0]), n(hole[1] - head[1])]
          ],
          scale: [
            [0.62, 1],
            [0.66, 0.25]
          ]
        }),
        loop: { move: "bob", ms: 700, y: -0.4 }
      },
      { name: "home in its hole: a soft ring about it", svg: care(hole[0], n(hole[1] + 0.8), 6.4, 3.2, SOFT_GOLD), keys: showAt(0.67, 0.7), loop: soft }
    ],
    words: [
      { text: "Faith returns to Madinah", from: 0.02, to: 0.46 },
      { text: "As a snake returns to its hole", from: 0.48, to: 1 }
    ]
  };
}

// Like salt in water. Sa'd said: I heard the Prophet ﷺ say: no one plots against the people of Madinah but he melts
// away, as salt melts in water (Sahih al-Bukhari 1877). No one is drawn: Madinah stands on the right, its walls, homes,
// masjid and palms, and small dashed circles are places of its folk before its walls. A plot, a grey haze, creeps
// toward it from the left; then it shrinks and melts away before it comes near, and a soft ring comes about Madinah.
// Then a bowl of water is set down with a heap of salt in it, and the salt melts into the water until none is left.
function saltInWater(): SignArt {
  const haze: [number, number] = [22, 91];
  const bowl =
    `<path d="M18 97 Q20 108 39 108 Q58 108 60 97 Z" fill="#A8703F"/><path d="M22.4 103 Q39 106.4 55.6 103" stroke="#8E5A30" stroke-width="0.6" fill="none"/>` +
    `<ellipse cx="39" cy="97" rx="21" ry="3.8" fill="#8E5A30"/><ellipse cx="39" cy="97.2" rx="19" ry="3" fill="#7FB8E0"/>`;
  const salt =
    `<path d="M30 97.8 Q32.6 91.6 38.6 90.8 Q44.6 91.4 48 97.8 Z" fill="#F7F6F0"/>` +
    `<path d="M33.4 95.6 L36.6 92.8 M40.4 93 L44 95.8 M37.6 96.6 L40.6 94.4" stroke="#D3D6DB" stroke-width="0.5"/>` +
    `<rect x="45.6" y="95.6" width="1.6" height="1.6" fill="#F7F6F0"/><rect x="28.4" y="96" width="1.4" height="1.4" fill="#F7F6F0"/>`;
  const ripples = [
    [31, 97.6, 2.2],
    [46.4, 97.2, 2],
    [39, 98.6, 2.8]
  ]
    .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.3)}" fill="none" stroke="#FFFFFF" stroke-width="0.4"/>`)
    .join("");
  return {
    kind: "salt-in-water",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(30, 18) },
      { name: "clouds", svg: cloud(84, 22, 0.55, "#FFFFFF", 0.9) + cloud(140, 16, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms(
        [
          [104, 90, 21],
          [148, 82, 17]
        ],
        "Madinah"
      ),
      { name: "homes of Madinah", svg: home(116, 88, 12, 14) + home(155, 88, 9, 12) },
      { name: "the masjid of Madinah", svg: madinahMasjid(124, 88, 0.55) },
      { name: "the walls of Madinah", svg: townWall(98, 160, 94, 8, 106) },
      {
        name: "places of Madinah's folk, before its walls",
        svg: [
          [104, 100],
          [116, 102],
          [130, 100.6],
          [144, 102.4],
          [154, 100]
        ]
          .map(([x, y]) => someone(x, y))
          .join("")
      },
      {
        name: "a plot: a grey haze, creeping toward Madinah",
        svg: cloud(haze[0], n(haze[1] + 6), 0.7, "#8A8D95", 0.85) + cloud(n(haze[0] + 1.6), n(haze[1] + 6), 0.42, "#62656D", 0.75) + greyRing(haze[0], n(haze[1] + 6.4), 15, 2.4),
        origin: { x: haze[0], y: haze[1] },
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.22, 44, 2]
          ],
          scale: [
            [0.34, 1],
            [0.5, 0.12]
          ],
          opacity: [
            [0.4, 1],
            [0.5, 0]
          ]
        }),
        loop: { move: "bob", ms: 1600, y: -0.6 }
      },
      { name: "Madinah kept: a soft ring about it", svg: care(128, 91, 30, 12, SOFT_GOLD), keys: showAt(0.5, 0.53), loop: soft },
      { name: "a bowl of water", svg: bowl, keys: showAt(0.63, 0.64) },
      {
        name: "a heap of salt in the water, melting",
        svg: salt,
        origin: { x: 39, y: 97.8 },
        keys: track({
          opacity: [
            [0.63, 0],
            [0.64, 1],
            [0.84, 1],
            [0.88, 0]
          ],
          scaleY: [
            [0.67, 1],
            [0.86, 0.08]
          ],
          scaleX: [
            [0.67, 1],
            [0.86, 0.6]
          ]
        })
      },
      { name: "ripples in the water", svg: ripples, keys: showFor(0.68, 0.7, 0.88, 0.9), loop: { move: "twinkle", ms: 700, low: 0.3 } },
      { name: "the salt all gone: the water clear", svg: sparkle(46, 96.8, 1.4, "#FFFFFF") + sparkle(33, 97.4, 1, "#FFFFFF"), keys: showAt(0.88, 0.9), loop: { move: "twinkle", ms: 900, low: 0.3 } }
    ],
    words: [
      { text: "No one plots against Madinah's people", from: 0.02, to: 0.3 },
      { text: "But he melts away", from: 0.32, to: 0.6 },
      { text: "As salt melts in water", from: 0.62, to: 1 }
    ]
  };
}

// Like a furnace. Jabir said: a Bedouin came to the Prophet ﷺ and gave him his pledge on Islam. The next day he came
// with a fever and said: cancel my pledge. He refused three times, and said: Madinah is like a furnace: it drives out its
// dross, and its good shines pure (Sahih al-Bukhari 1883). No one is drawn: his place is a golden ring before the
// masjid of Madinah, and the Bedouin's place comes from his tent to it; a golden line joins them, the pledge. Night
// passes, and the next day waves of heat rise over the Bedouin's place and it shakes: a fever. The Bedouin's voice asks,
// and his voice answers no, three times, three small dots lighting one by one, and the golden line stays. Then a smith's
// furnace glows on the right, its bellows blow, dark dross flies out of the crucible and is gone, and the metal left in
// it shines bright and pure.
function likeAFurnace(): SignArt {
  const his: [number, number] = [26, 101.6];
  const tentAt: [number, number] = [74, 99];
  const came = -28;
  const at: [number, number] = [tentAt[0] + came, 103];
  const fever = [-2.4, 0, 2.4]
    .map((dx, i) => `<path d="M${n(at[0] + dx)} ${n(99.4 - (i % 2) * 0.8)} q1.1 -1.2 0 -2.4 q-1.1 -1.2 0 -2.4" stroke="#D9643A" stroke-width="0.7" fill="none" stroke-linecap="round"/>`)
    .join("");
  const forge =
    `<path d="M138 68 L138 55 L146 55 L146 70 Z" fill="#6A5B50"/>` +
    `<path d="M98 101 L98 71 Q125 64 152 71 L152 101 Z" fill="#7A6A5E"/>` +
    [
      [104, 75],
      [146, 77],
      [102, 89],
      [148, 91],
      [140, 83]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.5" fill="#8E7E70"/>`)
      .join("") +
    `<path d="M108 101 L108 85 Q119 77 130 85 L130 101 Z" fill="#2E2420"/><ellipse cx="119" cy="99" rx="7" ry="1.6" fill="#B5432C"/>`;
  const crucible = `<path d="M114.6 91.4 L123.4 91.4 L122.4 97 Q119 98.2 115.6 97 Z" fill="#5C5650"/><ellipse cx="119" cy="91.4" rx="4.4" ry="1.1" fill="#9C8466"/>`;
  const bellows =
    `<path d="M90 96 Q90 91.4 95.4 91.6 L101.4 95.2 L101.4 96.8 L95.4 100.4 Q90 100.6 90 96 Z" fill="#A0703F"/>` +
    `<path d="M93 93.4 L99.6 95.6 L99.6 96.4 L93 98.6 Z" fill="#6E4626"/>` +
    `<path d="M90.4 94.6 L86 94.6 M90.4 97.4 L86 97.4" stroke="#6E4626" stroke-width="0.9" stroke-linecap="round"/>` +
    `<path d="M101.4 96 L110 96" stroke="#4D2E18" stroke-width="1.1"/>`;
  const dross: [number, number, number, number][] = [
    [117.4, 90.6, -14, -9],
    [120.6, 90.4, -6, -13],
    [118.6, 90.2, -20, -4],
    [121.4, 90.8, -11, -15]
  ];
  return {
    kind: "like-a-furnace",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(64, 18) },
      { name: "clouds", svg: cloud(30, 26, 0.55, "#FFFFFF", 0.9) + cloud(112, 22, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 97, 1) },
      { name: "the Bedouin's tent", svg: tent(tentAt[0], tentAt[1], 18, 13) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the Bedouin's place",
        svg: someone(tentAt[0], at[1]),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.08, came, 0],
            [0.25, came, 0],
            [0.255, came + 0.8, 0],
            [0.26, came - 0.8, 0],
            [0.265, came + 0.8, 0],
            [0.27, came - 0.8, 0],
            [0.275, came, 0]
          ]
        })
      },
      {
        name: "the pledge: a golden line between them",
        svg: `<path d="M${n(his[0] + 2.6)} ${n(his[1] - 0.8)} Q${n((his[0] + at[0]) / 2)} 94 ${n(at[0] - 2)} ${n(at[1] - 1)}" stroke="${GOLD}" stroke-width="0.9" fill="none" stroke-linecap="round"/>`,
        keys: showAt(0.08, 0.1)
      },
      { name: "his Islam: a soft ring about the Bedouin's place", svg: care(at[0], at[1], 4, 2.4, SOFT_GOLD), keys: showAt(0.1, 0.12), loop: soft },
      { name: "night passing, to the next day", svg: `<rect width="160" height="120" fill="#0F1C3A"/>`, keys: track({ opacity: [[0.2, 0], [0.22, 0.5], [0.23, 0.5], [0.25, 0]] }) },
      { name: "a fever: waves of heat over the Bedouin's place", svg: fever, keys: showFor(0.25, 0.27, 0.66, 0.68), loop: { move: "twinkle", ms: 600, low: 0.4 } },
      { name: "the Bedouin's voice: cancel my pledge", svg: arcsLeft(n(at[0] - 3), n(at[1] - 4.4), VOICE), keys: showFor(0.37, 0.38, 0.5, 0.51), loop: speaking },
      {
        name: "his voice: no, three times",
        svg: arcs(n(his[0] + 3.6), n(his[1] - 4.2), VOICE),
        keys: track({
          opacity: [
            [0.51, 0],
            [0.515, 1],
            [0.53, 1],
            [0.535, 0],
            [0.54, 0],
            [0.545, 1],
            [0.56, 1],
            [0.565, 0],
            [0.57, 0],
            [0.575, 1],
            [0.66, 1],
            [0.67, 0]
          ]
        }),
        loop: speaking
      },
      ...[0.515, 0.545, 0.575].map(
        (t, i): SignPart => ({
          name: `three times: a small dot ${i + 1}`,
          svg: glow(31 + i * 3.4, 87.6, 2.2, "#FFF0B0", 0.3) + `<circle cx="${n(31 + i * 3.4)}" cy="87.6" r="0.9" fill="#FFD84A"/>`,
          keys: showAt(t, at3(t + 0.01))
        })
      ),
      { name: "a smith's furnace, for the likeness", svg: forge, keys: showAt(0.67, 0.69) },
      {
        name: "the glow in the furnace",
        svg: flame(119, 99, 10),
        origin: { x: 119, y: 99 },
        keys: track({
          opacity: [
            [0.68, 0],
            [0.7, 1]
          ],
          scale: [
            [0.68, 0.5],
            [0.7, 0.7],
            [0.83, 0.7],
            [0.89, 1.1]
          ]
        }),
        loop: { move: "twinkle", ms: 600, low: 0.8 }
      },
      { name: "a crucible of metal in the furnace", svg: crucible, keys: showAt(0.67, 0.69) },
      {
        name: "the bellows, blowing",
        svg: bellows,
        origin: { x: 95, y: 96 },
        keys: track({
          opacity: [
            [0.67, 0],
            [0.69, 1]
          ],
          scaleY: [
            [0.83, 1],
            [0.845, 0.55],
            [0.86, 1],
            [0.875, 0.55],
            [0.89, 1]
          ]
        })
      },
      ...dross.map(
        ([x, y, dx, dy], i): SignPart => {
          const t = at3(0.84 + i * 0.015);
          return {
            name: `dross, driven out ${i + 1}`,
            svg: `<path d="M${x} ${y} l2 -0.9 l1.2 1.4 l-1.4 1.3 l-1.9 -0.6 Z" fill="#3A3632" stroke="#C9C0B4" stroke-width="0.3"/>`,
            keys: track({
              opacity: [
                [t, 0],
                [at3(t + 0.005), 1],
                [at3(t + 0.03), 1],
                [at3(t + 0.04), 0]
              ],
              xy: [
                [t, 0, 0],
                [at3(t + 0.04), dx, dy]
              ]
            })
          };
        }
      ),
      {
        name: "its good, shining pure",
        svg: glow(119, 90.6, 7, "#FFF0B0", 0.22) + `<ellipse cx="119" cy="91.4" rx="4.4" ry="1.1" fill="#FFD84A"/>` + sparkle(119, 90.2, 1.8, "#FFFFFF"),
        keys: showAt(0.9, 0.92),
        loop: soft
      }
    ],
    words: [
      { text: "A Bedouin gave him his pledge on Islam", from: 0.02, to: 0.18 },
      { text: "The next day he came with a fever", from: 0.2, to: 0.34 },
      { text: "And said: cancel my pledge", from: 0.36, to: 0.48 },
      { text: "He refused, three times", from: 0.5, to: 0.64 },
      { text: "Madinah is like a furnace", from: 0.66, to: 0.8 },
      { text: "Its dross goes out, its good shines pure", from: 0.82, to: 1 }
    ]
  };
}

/** A palm trunk holding up a roof, its foot at (x, foot), from y 40. */
const trunk = (x: number, foot: number) => {
  let rings = "";
  for (let y = 46; y < foot - 2; y += 5) rings += `<path d="M${n(x - 2.4)} ${y} Q${x} ${n(y + 1.3)} ${n(x + 2.4)} ${y}" stroke="#7A5232" stroke-width="0.7" fill="none"/>`;
  return (
    `<rect x="${n(x - 2.7)}" y="40" width="5.4" height="${foot - 40}" rx="1.2" fill="#A87444"/>` +
    `<rect x="${n(x + 0.4)}" y="40" width="2.3" height="${foot - 40}" fill="#000000" opacity="0.1"/>` +
    rings +
    `<ellipse cx="${x}" cy="${foot}" rx="4.4" ry="1.1" fill="#000000" opacity="0.12"/>`
  );
};

// Between my house and my pulpit. Abu Hurairah said that the Prophet ﷺ said: between my house and my pulpit is a
// garden of the gardens of Paradise, and my pulpit is over my Pool (Sahih al-Bukhari 1196). No one is drawn: inside the
// masjid, under its roof of palm fronds on palm trunks, the door of his house is on the left, with its curtain, and his
// pulpit of three steps on the right. A soft ring comes at the door and at the pulpit, and a golden dashed line between
// them. Then a soft green light comes over the floor between them, small leaves grow there and small flowers open, and
// soft light rises from it: a garden. Then a soft blue light comes under the pulpit, with a ring and small glints: his
// Pool. Paradise itself is not drawn.
function betweenHouseAndPulpit(): SignArt {
  const foot = 102;
  const roof =
    `<rect x="0" y="31" width="160" height="9" fill="#8A6440"/>` +
    Array.from({ length: 20 }, (_, i) => `<path d="M${i * 8} 39 L${i * 8 + 4} 33 L${i * 8 + 8} 39" stroke="#6E8C3A" stroke-width="1.2" fill="none"/>`).join("") +
    `<rect x="0" y="38.6" width="160" height="1.6" fill="#6B4A2E"/>`;
  const wallIn =
    `<rect x="0" y="40" width="160" height="62" fill="#E5CFA6"/>` +
    [52, 64, 76, 88].map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#D6BD92" stroke-width="0.5"/>`).join("") +
    `<rect x="62" y="52" width="14" height="16" fill="#BFE3FA"/><rect x="62" y="52" width="14" height="16" fill="none" stroke="#C9AE80" stroke-width="1"/>`;
  const house =
    `<rect x="0" y="40" width="34" height="62" fill="#D6BC8E"/><path d="M34 40 L34 ${foot}" stroke="#BFA172" stroke-width="0.8"/>` +
    `<rect x="11" y="72" width="14" height="30" fill="#5E4628"/>` +
    `<path d="M11 72 L25 72 L25 96.6 Q21.8 98.4 18 96.6 Q14.2 98.4 11 96.6 Z" fill="#CDB68A"/>` +
    `<path d="M14.6 72 L14.6 97 M18 72 L18 96.4 M21.4 72 L21.4 97" stroke="#B49B6E" stroke-width="0.5"/><rect x="10.4" y="71" width="15.2" height="1.4" fill="#7A5232"/>`;
  const floor = `<rect x="0" y="${foot}" width="160" height="${120 - foot}" fill="#EAD9B4"/>`;
  const pulpit =
    `<path d="M118 ${foot} L118 82 L124 82 L124 88 L130 88 L130 95 L136 95 L136 ${foot} Z" fill="#9C6B3F"/>` +
    `<rect x="118" y="75" width="1.8" height="7" fill="#7A5232"/>` +
    `<path d="M119 78 L136 93" stroke="#7A5232" stroke-width="0.9"/>` +
    `<path d="M118 82 L124 82 M124 88 L130 88 M130 95 L136 95" stroke="#C08A55" stroke-width="0.8"/>`;
  const leaves = [40, 52, 64, 76, 88, 100, 110];
  const flowers: [number, string][] = [
    [46, "#F7C6D9"],
    [70, "#FFE07A"],
    [94, "#C9B6F2"]
  ];
  return {
    kind: "between-house-and-pulpit",
    ms: 9000,
    parts: [
      { name: "the sky over the masjid", svg: `<rect width="160" height="31" fill="#BFE3FA"/>` },
      { name: "clouds", svg: cloud(40, 16, 0.4, "#FFFFFF", 0.9) + cloud(120, 12, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the masjid's wall", svg: wallIn },
      { name: "his house, by the masjid, and its door with a curtain", svg: house },
      { name: "the floor of the masjid", svg: floor },
      { name: "a palm trunk holding up the roof 1", svg: trunk(46, foot) },
      { name: "a palm trunk holding up the roof 2", svg: trunk(96, foot) },
      { name: "a palm trunk holding up the roof 3", svg: trunk(150, foot) },
      { name: "a roof of palm fronds", svg: roof },
      { name: "his pulpit of three steps", svg: pulpit },
      { name: "his house: a soft ring at its door", svg: care(18, 103.4, 9, 2.4, SOFT_GOLD), keys: showAt(0.04, 0.07), loop: soft },
      { name: "his pulpit: a soft ring at its steps", svg: care(127, 103.4, 11, 2.6, SOFT_GOLD), keys: showAt(0.1, 0.13), loop: soft },
      { name: "between them: a golden dashed line", svg: way("M28 105.4 L115 105.4", GOLD, 1), keys: showAt(0.15, 0.19) },
      { name: "a garden of the gardens of Paradise: a soft green light", svg: wash(72, 104.6, 46, 6, "#A7DB8C", 0.22), keys: showAt(0.34, 0.38), loop: soft },
      ...leaves.map(
        (x, i): SignPart => ({
          name: `small leaves, growing ${i + 1}`,
          svg: tuft(x, 108, "#5FA344", 5),
          origin: { x, y: 108 },
          keys: track({
            opacity: [
              [at3(0.38 + i * 0.015), 0],
              [at3(0.385 + i * 0.015), 1]
            ],
            scaleY: [
              [at3(0.38 + i * 0.015), 0.1],
              [at3(0.41 + i * 0.015), 1]
            ]
          })
        })
      ),
      ...flowers.map(
        ([x, petal], i): SignPart => ({
          name: `a small flower, opening ${i + 1}`,
          svg: flower(x, 107.6, petal, 6),
          origin: { x, y: 107.6 },
          keys: track({
            opacity: [
              [at3(0.5 + i * 0.02), 0],
              [at3(0.505 + i * 0.02), 1]
            ],
            scale: [
              [at3(0.5 + i * 0.02), 0.2],
              [at3(0.53 + i * 0.02), 1]
            ]
          }),
          loop: { move: "sway", ms: 3000 + i * 400, angle: 2, phase: i / 3 }
        })
      ),
      ...risingSparks(
        "the garden's soft light, rising",
        [
          [52, 101],
          [80, 100],
          [104, 101]
        ],
        0.5,
        0.02,
        { color: "#7FC35A", rise: 12 }
      ),
      { name: "his Pool: a soft blue light under the pulpit", svg: wash(127, 104.4, 16, 4.4, "#8ECDF2", 0.24), keys: showAt(0.7, 0.74), loop: soft },
      { name: "his Pool: a soft blue ring", svg: care(127, 104.4, 13, 3, "#4F9BD0"), keys: showAt(0.74, 0.77), loop: soft },
      {
        name: "his Pool: small glints",
        svg: sparkle(120, 104.6, 1, "#FFFFFF") + sparkle(133, 103.8, 1.2, "#FFFFFF") + sparkle(127, 105.6, 0.9, "#FFFFFF"),
        keys: showAt(0.77, 0.8),
        loop: { move: "twinkle", ms: 900, low: 0.3 }
      }
    ],
    words: [
      { text: "Between my house and my pulpit", from: 0.02, to: 0.3 },
      { text: "Is a garden of the gardens of Paradise", from: 0.32, to: 0.66 },
      { text: "And my pulpit is over my Pool", from: 0.68, to: 1 }
    ]
  };
}

// A thousand prayers. Abu Hurairah said that the Prophet ﷺ said: a prayer in this masjid of mine is better than a
// thousand prayers in any other, except al-Masjid al-Haram (Sahih al-Bukhari 1190). No one is drawn: his masjid stands
// near, a prayer mat before it. A prayer there is a spark that rises, and a warm light comes about his masjid. Far off,
// other masjids stand on the land, and many small sparks rise from them, one after another: a thousand prayers; and the
// light about his masjid grows. A dashed ring comes about each of the other masjids. Then, farther off still, the Ka'bah
// shows, with a warm light and a soft golden ring of its own: al-Masjid al-Haram, left out of the count.
function thousandPrayers(): SignArt {
  const others: [number, number, number][] = [
    [100, 82, 0.32],
    [122, 78, 0.3],
    [140, 84, 0.32]
  ];
  const tops = others.map(([x, y, s]): [number, number] => [n(x + 24 * s), n(y - 19 * s)]);
  const many = tops.flatMap(([x, y]) => [-4, -2, 0, 2, 4].map((dx, k): [number, number] => [n(x + dx), n(y - 1 - (k % 2) * 1.4)]));
  const order = [0, 5, 10, 2, 7, 12, 4, 9, 14, 1, 6, 11, 3, 8, 13];
  return {
    kind: "thousand-prayers",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(146, 18) },
      { name: "clouds", svg: cloud(60, 20, 0.55, "#FFFFFF", 0.9) + cloud(110, 30, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...others.map(([x, y, s], i): SignPart => ({ name: `another masjid, far off ${i + 1}`, svg: madinahMasjid(x, y, s) })),
      { name: "his masjid", svg: madinahMasjid(40, 100, 1.05) },
      { name: "a prayer mat before it", svg: prayerMat(64, 105) },
      { name: "a prayer in his masjid: a spark rising", svg: sparkle(64, 101, 1.8, SPARK), keys: sparkRising(0.04, 0.12, 14), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "the prayer there: a warm light about his masjid",
        svg: wash(65, 90, 32, 16, WARM, 0.16),
        origin: { x: 65, y: 90 },
        keys: track({
          opacity: [
            [0.12, 0],
            [0.16, 1]
          ],
          scale: [
            [0.42, 1],
            [0.45, 1.3]
          ]
        }),
        loop: soft
      },
      ...order.map(
        (k, i): SignPart => ({
          name: `prayers in other masjids: a small spark ${i + 1}`,
          svg: sparkle(many[k][0], many[k][1], 1.3, SPARK),
          keys: sparkRising(at3(0.28 + i * 0.008), at3(0.32 + i * 0.008), 6)
        })
      ),
      ...tops.map(
        ([x, y], i): SignPart => ({
          name: `a thousand prayers: many small lights over it ${i + 1}`,
          svg: [0, 1, 2].flatMap((row) => [-4.4, -2.2, 0, 2.2, 4.4].map((dx) => `<circle cx="${n(x + dx + (row % 2) * 1.1)}" cy="${n(y - 2.6 - row * 2.2)}" r="0.5" fill="#F2C04A"/>`)).join(""),
          keys: showAt(at3(0.3 + i * 0.04), at3(0.32 + i * 0.04)),
          loop: { move: "twinkle", ms: 1400, low: 0.6, phase: i / 3 }
        })
      ),
      ...tops.map(([x, y], i): SignPart => ({ name: `any other masjid: a dashed ring about it ${i + 1}`, svg: care(x, n(y + 3.6), 10, 6, GOLD), keys: showAt(at3(0.54 + i * 0.03), at3(0.56 + i * 0.03)) })),
      { name: "al-Masjid al-Haram far off: the Ka'bah", svg: kabah(12, 76, 11), keys: showAt(0.77, 0.8) },
      { name: "al-Masjid al-Haram: a warm light of its own", svg: glow(19, 70, 13, "#FFF1C4", 0.2), keys: showAt(0.8, 0.83), loop: soft },
      { name: "left out of the count: a soft golden ring about it", svg: care(19, 74, 13, 5.6, SOFT_GOLD), keys: showAt(0.82, 0.85), loop: soft }
    ],
    words: [
      { text: "A prayer in this masjid of mine", from: 0.02, to: 0.24 },
      { text: "Is better than a thousand prayers", from: 0.26, to: 0.5 },
      { text: "In any other masjid", from: 0.52, to: 0.74 },
      { text: "Except al-Masjid al-Haram", from: 0.76, to: 1 }
    ]
  };
}

/** Two small marks of steps, side by side, their middle at (x, y). */
const steps = (x: number, y: number, color: string) =>
  `<ellipse cx="${n(x - 0.8)}" cy="${y}" rx="0.6" ry="1" fill="${color}"/><ellipse cx="${n(x + 0.8)}" cy="${n(y - 0.7)}" rx="0.6" ry="1" fill="${color}"/>`;

// Masjid Quba every Saturday. Ibn Umar said: the Prophet ﷺ used to come to Masjid Quba every Saturday, walking and
// riding; and Abdullah ibn Umar used to do the same (Sahih al-Bukhari 1193). No one is drawn, and no one is drawn on a
// camel: his masjid stands on the left and Masjid Quba among its palms on the right, a way between them, and the seven
// days of the week are small circles in the sky. The way shows, and a soft ring comes about Masjid Quba. Saturday, the
// seventh day, lights golden, with a golden ring about it. His place, a golden ring, goes along the way to Quba with
// small steps behind it: walking; then it goes again with a camel with a saddle cloth: riding. Then Ibn Umar's place
// goes the same way, step by step, to Masjid Quba.
function qubaEverySaturday(): SignArt {
  const days = [0, 1, 2, 3, 4, 5, 6].map((i): [number, number] => [44 + i * 12, 20]);
  const sat = days[6];
  const start: [number, number] = [24, 101];
  const along = (t0: number, t1: number, lift = 0): [number, number, number][] => {
    const d = (t1 - t0) / 4;
    return [
      [t0, 0, 0],
      [at3(t0 + d), 27.8, n(3.2 + lift)],
      [at3(t0 + 2 * d), 55, n(4 + lift)],
      [at3(t0 + 3 * d), 81.8, n(2.2 + lift)],
      [t1, 108, n(-2 + lift)]
    ];
  };
  const path: [number, number][] = [
    [34, 102.6],
    [45, 103.6],
    [57, 104.5],
    [69, 104.9],
    [81, 105],
    [93, 104.6],
    [105, 103.5],
    [116, 101.9],
    [126, 100.3]
  ];
  return {
    kind: "quba-every-saturday",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(146, 40) },
      { name: "clouds", svg: cloud(50, 44, 0.5, "#FFFFFF", 0.85) + cloud(110, 46, 0.45, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the days of the week", svg: days.map(([x, y]) => weekDay(x, y)).join("") },
      { name: "Saturday: the seventh day, lit golden", svg: glow(sat[0], sat[1], 6, "#FFE7A0", 0.2) + dayLit(sat[0], sat[1], "#FFD84A"), keys: showAt(0.25, 0.27) },
      { name: "Saturday: a golden ring about it", svg: `<circle cx="${sat[0]}" cy="${sat[1]}" r="5" stroke="${GOLD}" stroke-width="0.9" fill="none"/>`, keys: showAt(0.26, 0.28), loop: soft },
      ...palms(
        [
          [112, 95, 18],
          [134, 84, 13],
          [149, 93, 20]
        ],
        "Quba"
      ),
      { name: "his masjid in Madinah", svg: madinahMasjid(4, 98, 0.8) },
      { name: "Masjid Quba, among the palms", svg: madinahMasjid(116, 97, 0.72) },
      { name: "the way to Quba", svg: way(`M${start[0]} ${start[1]} Q80 110 132 99`, "#F4E3BC", 1.2), keys: showAt(0.03, 0.06) },
      { name: "Masjid Quba: a soft ring about it", svg: care(133, 93, 24, 9, SOFT_GOLD), keys: showAt(0.08, 0.11), loop: soft },
      ...path.map(
        ([x, y], k): SignPart => ({
          name: `his steps on the way ${k + 1}`,
          svg: steps(x, y, GOLD),
          keys: showAt(at3(0.432 + k * 0.008), at3(0.437 + k * 0.008))
        })
      ),
      {
        name: "a golden ring, his place, walking",
        svg: ring(start[0], start[1], 2.4, GOLD),
        keys: track({
          xy: along(0.43, 0.51),
          opacity: [
            [0.51, 1],
            [0.52, 0]
          ]
        })
      },
      {
        name: "riding: a camel with a saddle cloth",
        svg: saddled(start[0] + 6, start[1] + 1, 0.2),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1]
          ],
          xy: along(0.53, 0.6, -1.6).map(([t, x, y]): [number, number, number] => [t, n(x - 14), y])
        }),
        loop: { move: "bob", ms: 900, y: -0.5 }
      },
      {
        name: "a golden ring about the camel: his place, riding",
        svg: ring(start[0] + 6, start[1] + 1.4, 6.6, GOLD),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1]
          ],
          xy: along(0.53, 0.6, -1.6).map(([t, x, y]): [number, number, number] => [t, n(x - 14), y])
        })
      },
      ...path.map(
        ([x, y], k): SignPart => ({
          name: `Ibn Umar's steps on the way ${k + 1}`,
          svg: steps(x, n(y + 2.4), VOICE),
          keys: showAt(at3(0.705 + k * 0.015), at3(0.71 + k * 0.015))
        })
      ),
      {
        name: "Ibn Umar's place, going the same way",
        svg: someone(start[0], n(start[1] + 2.4)),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.7, 1]
          ],
          xy: along(0.7, 0.84)
        })
      },
      { name: "the same: a soft ring about Ibn Umar's place at Quba", svg: care(132, 101.4, 4.4, 2.4, SOFT_GOLD), keys: showAt(0.86, 0.89), loop: soft }
    ],
    words: [
      { text: "He used to come to Masjid Quba", from: 0.02, to: 0.22 },
      { text: "Every Saturday", from: 0.24, to: 0.4 },
      { text: "Sometimes walking, sometimes riding", from: 0.42, to: 0.66 },
      { text: "And Ibn Umar used to do the same", from: 0.68, to: 1 }
    ]
  };
}

export const MADINAH_ART = {
  "walls-of-madinah": wallsOfMadinah,
  "faith-returns": faithReturns,
  "salt-in-water": saltInWater,
  "like-a-furnace": likeAFurnace,
  "between-house-and-pulpit": betweenHouseAndPulpit,
  "thousand-prayers": thousandPrayers,
  "quba-every-saturday": qubaEverySaturday
};
