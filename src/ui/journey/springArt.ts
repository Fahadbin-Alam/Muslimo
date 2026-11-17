import { cloud, glow, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, palms, sparkRising, track } from "./daysArt";
import { date, greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";

/**
 * Good ends and gentle ways: the spring Umm al-Ala saw flowing for Uthman ibn Maz'un, whom the Ansar's lots had brought
 * to her home, and his deed that flows for him; the ships of his ummah he was shown on the middle of the sea, like kings
 * on thrones, with Umm Haram among the first; Anjashah, whose fine voice drove the camels on, told to go gently with the
 * glass vessels; the right sandal first on and last off, and never one sandal alone; Uways of Yemen, kind to his
 * mother, found by Umar among the help from Yemen; Hazn, rough ground, who would not take the name Sahl, smooth ground;
 * and ajwa dates in the morning, and the day kept safe until night. Only the land, the sea, the sky, buildings, things,
 * plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face,
 * and no one is drawn on a camel: where someone was, a ring or a small dashed circle shows it, where someone went, the
 * circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a hope
 * or a prayer is a spark that rises, and a dream is a soft white glow.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** Something drawn closer: `k` times its size about (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** The land from y 61 down, with a few tufts of dry grass. */
const springLand = () =>
  landOf([
    [18, 110],
    [64, 113],
    [112, 111],
    [148, 112]
  ]);

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across, the hills and the land. */
const day = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: springLand() }
];

/** Night over the whole scene, laid on what is under it. */
const NIGHT = `<rect width="160" height="120" fill="#0F1C3A" opacity="0.52"/>`;

/** Stars in the night sky. */
const NIGHT_STARS = stars([
  [16, 16],
  [38, 28],
  [62, 12],
  [88, 24],
  [112, 14],
  [138, 26],
  [152, 12],
  [26, 44],
  [128, 42]
]);

/** A lot drawn: a small stick of wood with a notch, standing, its middle at (x, y). */
const lot = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 4)} L${x} ${n(y + 3.6)}" stroke="#C9A26A" stroke-width="1.5" stroke-linecap="round"/>` +
  `<path d="M${n(x - 0.75)} ${n(y - 2.2)} L${n(x + 0.75)} ${n(y - 2.2)} M${n(x - 0.75)} ${n(y - 1.2)} L${n(x + 0.75)} ${n(y - 1.2)}" stroke="#7A5634" stroke-width="0.45"/>`;

/** A spring: a small pool among stones, its middle at (x, y), and its water running off to the right, to `x2`. */
const springPool = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="8.6" ry="2.9" fill="#4F9FD0"/><ellipse cx="${n(x - 1)}" cy="${n(y - 0.6)}" rx="5.8" ry="1.5" fill="#7DBCE4"/>` +
  [
    [-9, 0.6, 2],
    [-6.2, 2.4, 1.6],
    [7.4, 2.1, 1.7],
    [-1.6, 3.1, 1.4],
    [3.4, 3, 1.3],
    [-8.2, -1.6, 1.3]
  ]
    .map(([dx, dy, r]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="${r}" ry="${n(r * 0.6)}" fill="#9C9384"/>`)
    .join("");

/** The spring's stream, from the pool at (x, y) along to (x2, y2). */
const springStream = (x: number, y: number, x2: number, y2: number) =>
  `<path d="M${n(x + 7.6)} ${n(y + 0.2)} C${n(x + 13)} ${n(y + 0.6)} ${n(x2 - 6)} ${n(y2 + 1)} ${x2} ${y2}" stroke="#4F9FD0" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x + 7.6)} ${n(y + 0.2)} C${n(x + 13)} ${n(y + 0.6)} ${n(x2 - 6)} ${n(y2 + 1)} ${x2} ${y2}" stroke="#7DBCE4" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;

/** Ripples along a run of water from x to x2 at height y, `gap` apart, to slide along it. */
const ripples = (x: number, x2: number, y: number, gap: number) => {
  const list: string[] = [];
  for (let at = x - gap; at < x2 + gap; at += gap) list.push(`<path d="M${n(at)} ${y} q0.9 -0.5 1.8 0" stroke="#FFFFFF" stroke-width="0.45" fill="none" stroke-linecap="round"/>`);
  return list.join("");
};

// The spring that flows for him. Umm al-Ala, a woman of the Ansar who pledged to the Messenger of Allah ﷺ, said: Uthman
// ibn Maz'un fell to us for lodging when the Ansar drew lots to house the Muhajirun. He fell ill, and we nursed him until
// he died, and we put him in his clothes. The Messenger of Allah ﷺ came in to us, and I said: Allah's mercy on you, Abu
// as-Sa'ib; my witness for you is that Allah has honored you. He said: how do you know? I said: I do not know, by Allah.
// He said: as for him, the certain end has come to him; I hope good for him from Allah. Umm al-Ala said: by Allah, I will
// never vouch for anyone after him. And I saw in my sleep a spring flowing for Uthman, and I came to the Messenger of
// Allah ﷺ and told him, and he said: that is his deed, flowing for him (Sahih al-Bukhari 7018; and 3929, 1243). No one
// is drawn: the homes of the Ansar along a way in Madinah, the masjid at its end, and the places of three of the
// Muhajirun coming in along it; three lots, drawn, and each flies to a home, the third to Umm al-Ala's, where Uthman's
// place goes. A grey ring comes about his place, and a soft ring of care about it and Umm al-Ala's; his place grows
// faint. His place, a golden ring, comes along the way from the masjid; Umm al-Ala's voice speaks, then his, and a spark
// of hope rises from his place. Night falls; in a soft white glow, a spring shows, its water running to Uthman's place.
// Morning comes, his voice speaks, and a soft golden glow comes about the spring, and a soft golden ring about Uthman's
// place.
function flowingSpring(): SignArt {
  const homeA: [number, number] = [42, 91];
  const homeB: [number, number] = [64, 90.6];
  const hers: [number, number] = [132, 92];
  const comers: [number, number][] = [
    [24, 99.2],
    [29.4, 100],
    [34.8, 99.4]
  ];
  const lodged: [number, number][] = [
    [40.4, 94.6],
    [62.6, 94.4],
    [127, 96.6]
  ];
  const ummAlAla: [number, number] = [137.6, 97.2];
  const his: [number, number] = [13, 95.4];
  const came: [number, number] = [115, 98.6];
  const lots: [number, number][] = [
    [83, 101.6],
    [87.4, 101],
    [91.8, 101.8]
  ];
  const landed: [number, number][] = [
    [43.2, 88.2],
    [66.6, 87.8],
    [130.4, 85.4]
  ];
  const pool: [number, number] = [100, 104.2];
  const streamEnd: [number, number] = [125, 99.6];
  const comeIn = (i: number, from: number, to: number): SignPart => ({
    name: i === 2 ? "Uthman's place" : `the place of one of the Muhajirun ${i + 1}`,
    svg: someone(comers[i][0], comers[i][1]),
    keys: track({
      opacity: [
        [0.025, 0],
        [0.035, 1],
        ...(i === 2
          ? ([
              [0.31, 1],
              [0.33, 0.32]
            ] as [number, number][])
          : [])
      ],
      xy: [
        [0.025, -44, 0.6],
        [0.07, 0, 0],
        [from, 0, 0],
        [to, n(lodged[i][0] - comers[i][0]), n(lodged[i][1] - comers[i][1])]
      ]
    })
  });
  const flies = (i: number, from: number, to: number, hide: number): SignPart => ({
    name: i === 2 ? "the lot that fell to Umm al-Ala's home" : `a lot drawn, for a home ${i + 1}`,
    svg: lot(lots[i][0], lots[i][1]),
    keys: track({
      opacity: [
        [0.03, 0],
        [0.05, 1],
        [hide, 1],
        [n(hide + 0.01), 0]
      ],
      xy: [
        [from, 0, 0],
        [to, n(landed[i][0] - lots[i][0]), n(landed[i][1] - lots[i][1])]
      ]
    })
  });
  const night = track({
    opacity: [
      [0.766, 0],
      [0.79, 1],
      [0.888, 1],
      [0.912, 0]
    ]
  });
  return {
    kind: "flowing-spring",
    ms: 12000,
    parts: [
      ...day(118, 44, 12000).map((part): SignPart =>
        part.name === "the sun"
          ? {
              ...part,
              keys: track({
                opacity: [
                  [0.766, 1],
                  [0.79, 0],
                  [0.888, 0],
                  [0.912, 1]
                ]
              })
            }
          : part
      ),
      ...palms([
        [96, 89, 11],
        [152, 90, 13]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 92, 0.46) },
      { name: "the homes of the Ansar", svg: home(homeA[0], homeA[1], 13, 9.4) + home(homeB[0], homeB[1], 12, 9) },
      { name: "Umm al-Ala's home", svg: home(hers[0], hers[1], 19, 13) },
      { name: "the way through Madinah", svg: way("M12 96.4 C44 99 92 99.4 150 96.6", "#F4E3BC", 0.8) },
      comeIn(0, 0.15, 0.18),
      comeIn(1, 0.16, 0.19),
      comeIn(2, 0.17, 0.205),
      { name: "Umm al-Ala's place", svg: someone(ummAlAla[0], ummAlAla[1]) },
      flies(0, 0.148, 0.168, 0.17),
      flies(1, 0.158, 0.178, 0.18),
      flies(2, 0.168, 0.19, 0.198),
      { name: "lots drawn: a small glint", svg: sparkle(86.6, 97.8, 1, "#FFE7A0"), keys: showFor(0.035, 0.05, 0.144, 0.154), loop: speaking },
      { name: "ill: a grey ring about Uthman's place", svg: greyRing(lodged[2][0], n(lodged[2][1] + 0.4), 3.2, 1.7), keys: showFor(0.27, 0.28, 0.31, 0.33) },
      {
        name: "nursed: a soft ring of care about Uthman's place and Umm al-Ala's",
        svg: care(132.3, 97.2, 8.6, 2.4, SOFT_GOLD),
        keys: showFor(0.282, 0.296, 0.392, 0.402),
        loop: soft
      },
      {
        name: "his place, a golden ring",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.395, 0, 0],
            [0.44, n(came[0] - his[0]), n(came[1] - his[1])]
          ]
        })
      },
      { name: "Umm al-Ala's voice: I testify", svg: arcsLeft(135.4, 93.4, VOICE), keys: showFor(0.442, 0.452, 0.516, 0.526), loop: speaking },
      { name: "his voice: how do you know", svg: arcs(n(came[0] + 2.2), n(came[1] - 3.6), GOLD), keys: showFor(0.52, 0.53, 0.64, 0.65), loop: speaking },
      { name: "his voice: I hope good for him", svg: arcs(n(came[0] + 2.2), n(came[1] - 3.6), GOLD), keys: showFor(0.645, 0.655, 0.764, 0.774), loop: speaking },
      { name: "a hope: a spark rising from his place", svg: sparkle(came[0], n(came[1] - 3.2), 1.4, SPARK), keys: sparkRising(0.66, 0.705, 10), loop: speaking },
      { name: "night over Madinah", svg: NIGHT, keys: night },
      { name: "stars", svg: NIGHT_STARS, keys: night, loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "in a dream: a soft white glow", svg: wash(112, 102.4, 24, 7, "#FFFFFF", 0.1), keys: showFor(0.792, 0.812, 0.888, 0.912) },
      { name: "a spring, its pool among stones", svg: springPool(pool[0], pool[1]), keys: showAt(0.795, 0.815) },
      { name: "its water, flowing to Uthman's place", svg: springStream(pool[0], pool[1], streamEnd[0], streamEnd[1]), keys: showAt(0.8, 0.82) },
      {
        name: "ripples on the flowing water",
        svg: ripples(n(pool[0] - 6), n(pool[0] + 6), n(pool[1] + 0.4), 3),
        keys: showAt(0.805, 0.825),
        loop: { move: "slide", ms: 1600, period: 3 },
        clip: { x: n(pool[0] - 6), y: n(pool[1] - 1.2), w: 12, h: 2.6 }
      },
      { name: "the spring welling up: small glints", svg: sparkle(n(pool[0] - 2.4), n(pool[1] - 1.2), 0.9, "#FFFFFF") + sparkle(n(pool[0] + 2.8), n(pool[1] - 0.6), 0.8, "#FFFFFF"), keys: showAt(0.805, 0.825), loop: speaking },
      { name: "his voice: that is his deed", svg: arcs(n(came[0] + 2.2), n(came[1] - 3.6), GOLD), keys: showAt(0.892, 0.902), loop: speaking },
      { name: "his deed, flowing: a soft golden glow about the spring", svg: glow(108, 103, 12, WARM, 0.26), keys: showAt(0.905, 0.935) },
      { name: "flowing for him: a soft golden ring about Uthman's place", svg: care(lodged[2][0], n(lodged[2][1] + 0.4), 3.4, 1.7, SOFT_GOLD), keys: showAt(0.915, 0.94), loop: soft }
    ],
    words: [
      { text: "The Ansar drew lots to house the Muhajirun", from: 0.02, to: 0.129 },
      { text: "and Uthman ibn Maz'un fell to us", from: 0.144, to: 0.253 },
      { text: "We nursed Uthman until his death", from: 0.268, to: 0.377 },
      { text: "I said: I testify Allah has honored you", from: 0.392, to: 0.501 },
      { text: "He said: how do you know?", from: 0.516, to: 0.625 },
      { text: "He said: I hope good for him from Allah", from: 0.64, to: 0.749 },
      { text: "I dreamt of a flowing spring for Uthman", from: 0.764, to: 0.873 },
      { text: "He said: that is his deed, flowing for him", from: 0.888, to: 1 }
    ]
  };
}

/** A ship with one mast and its sails, the middle of its deck at (x, y), and at its stern a raised golden seat with a
 * small canopy, like a throne. */
const ship = (x: number, y: number) =>
  `<path d="M${n(x - 7.6)} ${y} L${n(x + 7.6)} ${y} L${n(x + 5.4)} ${n(y + 3)} L${n(x - 5.6)} ${n(y + 3)} Z" fill="#8A5530"/>` +
  `<path d="M${n(x - 7.1)} ${n(y + 1.1)} L${n(x + 7.1)} ${n(y + 1.1)} M${n(x - 6.4)} ${n(y + 2.1)} L${n(x + 6.3)} ${n(y + 2.1)}" stroke="#A86C3C" stroke-width="0.35"/>` +
  `<path d="M${n(x + 1.4)} ${y} L${n(x + 1.4)} ${n(y - 11)}" stroke="#6B4226" stroke-width="0.6"/>` +
  `<path d="M${n(x + 1.9)} ${n(y - 10.2)} Q${n(x + 7.6)} ${n(y - 6)} ${n(x + 1.9)} ${n(y - 1.4)} Z" fill="#FFFDF5"/>` +
  `<path d="M${n(x + 0.9)} ${n(y - 9.4)} Q${n(x - 3.4)} ${n(y - 5.6)} ${n(x + 0.9)} ${n(y - 1.8)} Z" fill="#F4ECDA"/>` +
  `<rect x="${n(x - 6.2)}" y="${n(y - 1.8)}" width="3.8" height="1.4" fill="#E8C25A"/>` +
  `<rect x="${n(x - 6.4)}" y="${n(y - 3.6)}" width="0.8" height="3.4" fill="#C8963E"/>` +
  `<path d="M${n(x - 6.4)} ${n(y - 4.4)} Q${n(x - 4.3)} ${n(y - 5.8)} ${n(x - 2.2)} ${n(y - 4.4)}" stroke="#C8963E" stroke-width="0.5" fill="none"/>` +
  `<path d="M${n(x - 2.4)} ${n(y - 4.4)} L${n(x - 2.4)} ${n(y - 1.8)}" stroke="#C8963E" stroke-width="0.35"/>`;

/** Short wave crests in a row at height y, `gap` apart, from `offset`. */
const crests = (y: number, gap: number, offset: number, from = 0) => {
  const list: string[] = [];
  for (let x = from + offset; x < 160; x += gap) list.push(`<path d="M${n(x)} ${y} q1.6 -1.1 3.2 0" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.7" stroke-linecap="round"/>`);
  return list.join("");
};

// Like kings on thrones. Anas said: the Messenger of Allah ﷺ used to visit Umm Haram bint Milhan, and she would feed
// him. He woke smiling, and she said: what makes you smile? He said: some of my ummah were shown to me, going out in the
// way of Allah, riding the middle of this sea, kings on thrones, or like kings on thrones. She said: O Messenger of Allah,
// pray to Allah to make me one of them, and he prayed for her. He said again what he had said, and she asked again, and
// he said: you are among the first. She sailed the sea in the time of Mu'awiyah ibn Abi Sufyan (Sahih al-Bukhari 2788).
// Umm Haram also heard him say: the first army of my ummah to go out by sea has earned it; she said: am I among them? He
// said: you are among them (Sahih al-Bukhari 2924). No one is drawn: by Umm Haram's home, on the land by the sea, his
// place, a golden ring, and Umm Haram's place. As his voice speaks, three ships show far off on the sea, a raised golden
// seat on each; they sail to the middle of the sea, and glints show on their seats, with a soft golden glow over them.
// Umm Haram's voice speaks, then his, and a soft golden ring comes about her place, with a faint golden line to the
// first ship. Years on, the first ship comes in to the shore, her place goes onto it, and it sails out with her.
function kingsOnTheSea(): SignArt {
  const ships: [number, number][] = [
    [94, 86],
    [119, 82],
    [143, 88.6]
  ];
  const his: [number, number] = [27.4, 97.4];
  const hers: [number, number] = [38.6, 98.6];
  const shore: [number, number] = [70, 100.6];
  const out: [number, number] = [96, 90];
  // The first ship: comes in to the shore, then sails out again with her.
  const firstShip: [number, number, number][] = [
    [0.85, 0, 0],
    [0.875, n(shore[0] - ships[0][0]), n(shore[1] - ships[0][1])],
    [0.91, n(shore[0] - ships[0][0]), n(shore[1] - ships[0][1])],
    [0.95, n(out[0] - ships[0][0]), n(out[1] - ships[0][1])]
  ];
  const deck: [number, number] = [n(shore[0] - 4.2), n(shore[1] - 2.4)];
  const far: [number, number][] = [
    [106, 70.4],
    [128, 68.6],
    [148, 71.2]
  ];
  const sail = (i: number): SignPart => ({
    name: `a ship of his ummah, shown to him ${i + 1}`,
    svg: ship(ships[i][0], ships[i][1]),
    origin: { x: ships[i][0], y: ships[i][1] },
    keys: track({
      opacity: [
        [0.04, 0],
        [0.07, 0.75],
        [0.19, 0.75],
        [0.28, 1]
      ],
      xy: [
        [0.19, n(far[i][0] - ships[i][0]), n(far[i][1] - ships[i][1])],
        [0.28, 0, 0],
        ...(i === 0 ? firstShip : [])
      ],
      scale: [
        [0.19, 0.55],
        [0.28, 1]
      ]
    }),
    loop: { move: "bob", ms: 2400 + i * 300, y: -0.5, rotate: 1.2, phase: i / 3 }
  });
  const glintsOn = (i: number): SignPart => ({
    name: `like thrones: glints on the golden seat ${i + 1}`,
    svg: sparkle(n(ships[i][0] - 4.3), n(ships[i][1] - 3.4), 1, "#FFE7A0"),
    keys: track({
      opacity: [
        [0.355, 0],
        [0.375, 1]
      ],
      ...(i === 0 ? { xy: firstShip } : {})
    }),
    loop: speaking
  });
  return {
    kind: "kings-on-the-sea",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(128, 22) },
      { name: "a cloud", svg: cloud(52, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "the sea", svg: `<rect y="61" width="160" height="59" fill="#4F9FD0"/><rect y="61" width="160" height="4" fill="#7DBCE4"/>` },
      { name: "the waves, far", svg: crests(68, 14, 4), loop: { move: "slide", ms: 12000 } },
      { name: "the waves, nearer", svg: crests(78, 18, 10), loop: { move: "slide", ms: 10000 } },
      { name: "the waves, near", svg: crests(96, 16, 2), loop: { move: "slide", ms: 8000 } },
      { name: "the land by the sea", svg: `<path d="M0 61 L44 61 C54 70 50 90 64 120 L0 120 Z" fill="#E2CB9C"/><path d="M44 61 C54 70 50 90 64 120" stroke="#F4ECDA" stroke-width="1.2" fill="none"/>` },
      ...palms([
        [8, 90, 11],
        [42, 78, 9]
      ]),
      { name: "Umm Haram's home", svg: home(20, 92, 16, 11) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      sail(0),
      sail(1),
      sail(2),
      { name: "his voice: some of my ummah were shown to me", svg: arcs(n(his[0] + 2.2), n(his[1] - 3.6), GOLD), keys: showFor(0.03, 0.04, 0.185, 0.195), loop: speaking },
      glintsOn(0),
      glintsOn(1),
      glintsOn(2),
      { name: "like kings: a soft golden glow over the ships", svg: wash(118, 84, 34, 8, WARM, 0.12), keys: showFor(0.36, 0.39, 0.515, 0.535) },
      {
        name: "Umm Haram's place",
        svg: someone(hers[0], hers[1]),
        keys: track({
          xy: [
            [0.878, 0, 0],
            [0.9, n(deck[0] - hers[0]), n(deck[1] - hers[1])],
            [0.91, n(deck[0] - hers[0]), n(deck[1] - hers[1])],
            [0.95, n(deck[0] - hers[0] + out[0] - shore[0]), n(deck[1] - hers[1] + out[1] - shore[1])]
          ]
        })
      },
      { name: "Umm Haram's voice: pray I am one of them", svg: arcs(n(hers[0] + 2.2), n(hers[1] - 3.6), VOICE), keys: showFor(0.52, 0.53, 0.68, 0.69), loop: speaking },
      { name: "his voice: you are among the first", svg: arcs(n(his[0] + 2.2), n(his[1] - 3.6), GOLD), keys: showFor(0.685, 0.695, 0.845, 0.855), loop: speaking },
      {
        name: "among the first: a soft golden ring about Umm Haram's place",
        svg: care(hers[0], n(hers[1] + 0.4), 3.4, 1.7, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.7, 0],
            [0.72, 1]
          ],
          xy: [
            [0.878, 0, 0],
            [0.9, n(deck[0] - hers[0]), n(deck[1] - hers[1])],
            [0.91, n(deck[0] - hers[0]), n(deck[1] - hers[1])],
            [0.95, n(deck[0] - hers[0] + out[0] - shore[0]), n(deck[1] - hers[1] + out[1] - shore[1])]
          ]
        }),
        loop: soft
      },
      { name: "a faint golden line from Umm Haram's place to the first ship", svg: lookLine(n(hers[0] + 2), n(hers[1] - 1.6), n(ships[0][0] - 6), n(ships[0][1] - 2), 80, SOFT_GOLD), keys: showFor(0.71, 0.73, 0.845, 0.86) }
    ],
    words: [
      { text: "He said: I was shown some of my ummah", from: 0.02, to: 0.17 },
      { text: "riding the middle of this sea", from: 0.185, to: 0.335 },
      { text: "like kings on thrones", from: 0.35, to: 0.5 },
      { text: "Umm Haram said: pray I am one of them", from: 0.515, to: 0.665 },
      { text: "He said: you are among the first", from: 0.68, to: 0.83 },
      { text: "Umm Haram sailed in Mu'awiyah's time", from: 0.845, to: 1 }
    ]
  };
}

/** A closed howdah on a camel's back, the middle of its foot at (x, y), in `cloth` with a gold edge. */
const howdah = (x: number, y: number, cloth: string, edge: string) =>
  `<path d="M${n(x - 4.2)} ${y} L${n(x - 4.2)} ${n(y - 2.6)} Q${x} ${n(y - 6.4)} ${n(x + 4.2)} ${n(y - 2.6)} L${n(x + 4.2)} ${y} Z" fill="${cloth}"/>` +
  `<path d="M${n(x - 4.2)} ${n(y - 2.6)} Q${x} ${n(y - 6.4)} ${n(x + 4.2)} ${n(y - 2.6)}" stroke="${edge}" stroke-width="0.5" fill="none"/>` +
  `<path d="M${n(x - 4.2)} ${n(y - 0.4)} L${n(x + 4.2)} ${n(y - 0.4)}" stroke="${edge}" stroke-width="0.5"/>` +
  `<path d="M${n(x - 1.4)} ${n(y - 0.4)} L${n(x - 1.4)} ${n(y - 4.4)} M${n(x + 1.4)} ${n(y - 0.4)} L${n(x + 1.4)} ${n(y - 4.4)}" stroke="${edge}" stroke-width="0.3" opacity="0.8"/>`;

/** A puff of dust on the road, its middle at (x, y). */
const dust = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="1.6" fill="#F8F0DE" opacity="0.9"/><ellipse cx="${n(x - 3)}" cy="${n(y - 1)}" rx="2.4" ry="1.3" fill="#FBF5E8" opacity="0.85"/><ellipse cx="${n(x - 5.4)}" cy="${n(y - 0.2)}" rx="1.5" ry="0.9" fill="#FBF5E8" opacity="0.7"/>`;

// The glass vessels. Anas ibn Malik said: the Prophet ﷺ was on a journey of his, and the driver drove the camels on with
// his chant, and the Prophet ﷺ said: be gentle, O Anjashah, woe to you, with the glass vessels (Sahih al-Bukhari 6209).
// And: the Prophet ﷺ had a camel driver named Anjashah, and he had a fine voice, and the Prophet ﷺ said to him: gently,
// O Anjashah, do not break the glass vessels. Qatadah said: he meant the weak women (Sahih al-Bukhari 6211). No one is
// drawn, and no one on a camel: along a road in the desert, three camels, a closed howdah on each, with Anjashah's place
// before them and his place, a golden ring, behind them. Anjashah's voice chants, and the camels go fast, with dust
// behind them. His voice speaks, and the camels go gently, the dust settles, and Anjashah's voice grows soft. Soft
// glints show on the howdahs: the glass; a soft white ring comes about them, and then a soft golden glow.
function glassVessels(): SignArt {
  const k = 0.21;
  const camels: [number, number][] = [
    [40, 104.4],
    [63, 104],
    [86, 104.2]
  ];
  const cloths: [string, string][] = [
    ["#B5483A", "#E8C25A"],
    ["#5E8F4E", "#E8C25A"],
    ["#4A6FA5", "#E8C25A"]
  ];
  const hump = ([x, y]: [number, number]): [number, number] => [n(x - 10 * k), n(y - 52 * k)];
  const anjashah: [number, number] = [102, 104.6];
  const his: [number, number] = [24, 104.8];
  // The caravan's way along the road: fast while Anjashah chants, then gently.
  const along: [number, number, number][] = [
    [0.025, -32, 0],
    [0.125, -10, 0],
    [0.19, -10, 0],
    [0.29, 12, 0],
    [0.38, 12, 0],
    [0.455, 15, 0],
    [0.52, 15, 0],
    [0.62, 18, 0],
    [0.685, 18, 0],
    [0.785, 21, 0],
    [0.85, 21, 0],
    [0.95, 24, 0]
  ];
  const go = (opacity?: [number, number][]) => track({ xy: along, ...(opacity ? { opacity } : {}) });
  return {
    kind: "glass-vessels",
    ms: 10000,
    parts: [
      ...day(34, 110, 10000),
      { name: "dunes far off", svg: `<path d="M0 72 Q24 64 48 71 Q74 63 100 70 Q128 62 160 69 L160 76 L0 76 Z" fill="#E8D2A2"/>` },
      { name: "the road through the desert", svg: way("M0 106.4 C40 107.6 100 107.4 160 105.6", "#F4E3BC", 0.9) },
      { name: "dust behind the camels, going fast", svg: camels.map(([x, y]) => dust(n(x - 11), n(y + 0.6))).join(""), keys: go([[0.03, 0], [0.05, 1], [0.36, 1], [0.39, 0]]), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      {
        name: "the camels, a closed howdah on each",
        svg: camels.map(([x, y], i) => camel(x, y, k) + big(howdah(hump([x, y])[0], n(hump([x, y])[1] + 0.8), cloths[i][0], cloths[i][1]), hump([x, y])[0], n(hump([x, y])[1] + 0.8), 1.2)).join(""),
        keys: go(),
        loop: { move: "bob", ms: 1100, y: -0.4 }
      },
      { name: "Anjashah's place", svg: someone(anjashah[0], anjashah[1]), keys: go() },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD), keys: go() },
      {
        name: "Anjashah's voice, chanting",
        svg: arcsLeft(n(anjashah[0] - 2), n(anjashah[1] - 3.6), VOICE),
        keys: go([
          [0.03, 0],
          [0.04, 1],
          [0.39, 1],
          [0.42, 0.35]
        ]),
        loop: speaking
      },
      { name: "his voice: gently, Anjashah, with the glass", svg: arcs(n(his[0] + 2.2), n(his[1] - 3.6), GOLD), keys: go([[0.355, 0], [0.365, 1], [0.845, 1], [0.855, 0]]), loop: speaking },
      {
        name: "the glass: soft glints on the howdahs",
        svg: camels.map((c) => sparkle(n(hump(c)[0] - 2), n(hump(c)[1] - 4), 0.9, "#FFFFFF") + sparkle(n(hump(c)[0] + 2.2), n(hump(c)[1] - 2.4), 0.7, "#E6F6FF")).join(""),
        keys: go([
          [0.52, 0],
          [0.54, 1]
        ]),
        loop: speaking
      },
      {
        name: "with care: a soft white ring about the howdahs",
        svg: care(n((camels[0][0] + camels[2][0]) / 2 - 2.1), n(camels[1][1] - 11.6), 30, 5.6, "#FFFFFF"),
        keys: go([
          [0.69, 0],
          [0.71, 1]
        ]),
        loop: soft
      },
      {
        name: "the weak: a soft golden glow about the howdahs",
        svg: wash(n((camels[0][0] + camels[2][0]) / 2 - 2.1), n(camels[1][1] - 13), 33, 6.4, WARM, 0.14),
        keys: go([
          [0.86, 0],
          [0.89, 1]
        ])
      }
    ],
    words: [
      { text: "On a journey of his, the driver chanted", from: 0.02, to: 0.17 },
      { text: "a driver, Anjashah, who had a fine voice", from: 0.185, to: 0.335 },
      { text: "He said: gently, Anjashah", from: 0.35, to: 0.5 },
      { text: "with the glass vessels!", from: 0.515, to: 0.665 },
      { text: "Do not break the glass vessels", from: 0.68, to: 0.83 },
      { text: "Qatadah said: he meant the weak women", from: 0.845, to: 1 }
    ]
  };
}

/** A smooth closed outline through `points`. */
const smoothClosed = (points: [number, number][]) => {
  const at = (i: number) => points[(i + points.length) % points.length];
  let d = `M${n(at(0)[0])} ${n(at(0)[1])}`;
  for (let i = 0; i < points.length; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d += ` C${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)} ${n(p2[0] - (p3[0] - p1[0]) / 6)} ${n(p2[1] - (p3[1] - p1[1]) / 6)} ${n(p2[0])} ${n(p2[1])}`;
  }
  return `${d} Z`;
};

/** The sole of a right sandal, toe up, about its middle: the big toe's side, the inner side, is to the left. */
const SOLE: [number, number][] = [
  [0.1, 3],
  [1, 2.5],
  [1.15, 0.8],
  [1.45, -1.2],
  [1.2, -2.5],
  [0.1, -3.1],
  [-1.15, -2.6],
  [-1.35, -1.2],
  [-0.85, 0.6],
  [-0.95, 2.3]
];

/** A sandal of leather lying on the ground, seen from above, toe away, its middle at (x, y), `s` times its size: the
 * right one, or the left (drawn the other way about), with its strap from the toe to both sides. */
const sandal = (x: number, y: number, right: boolean, s = 1.7) => {
  const d = right ? 1 : -1;
  const p = (dx: number, dy: number) => `${n(x + dx * d * s)} ${n(y + dy * s)}`;
  return (
    `<path d="${smoothClosed(SOLE.map(([dx, dy]): [number, number] => [n(x + dx * d * s + 0.5), n(y + dy * s + 0.6)]))}" fill="#000000" opacity="0.1"/>` +
    `<path d="${smoothClosed(SOLE.map(([dx, dy]): [number, number] => [n(x + dx * d * s), n(y + dy * s)]))}" fill="#C8955F" stroke="#8A5A32" stroke-width="0.45"/>` +
    `<path d="${smoothClosed(SOLE.map(([dx, dy]): [number, number] => [n(x + dx * 0.72 * d * s), n(y + (dy * 0.84 + 0.1) * s)]))}" fill="#D9AC78"/>` +
    `<path d="M${p(-1.32, 0.2)} Q${p(-0.7, -1.2)} ${p(-0.42, -2.2)} Q${p(-0.1, -1.1)} ${p(1.4, 0.2)}" stroke="#5A3820" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="${n(x - 0.42 * d * s)}" cy="${n(y - 2.2 * s)}" r="0.55" fill="#5A3820"/>`
  );
};

/** A place where someone stands on the ground: a dashed ring, `rx` across, about (x, y). */
const placeOn = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${VOICE}" stroke-width="0.8" stroke-dasharray="1 0.8" fill="none"/>`;

// The right sandal first. Abu Hurairah said that the Messenger of Allah ﷺ said: when one of you puts on sandals, let him
// begin with the right, and when he takes them off, let him begin with the left, so that the right is the first of them
// to be put on and the last of them to be taken off (Sahih al-Bukhari 5855). And: let none of you walk in one sandal;
// let him take both off, or put both on (Sahih al-Bukhari 5856). Drawn close: no one is drawn, not even a foot. A pair
// of sandals lies on the ground, and by them, the place where one who wears them stands, a dashed ring on the ground;
// his place, a golden ring, is to the left, and to the right, a home. His voice speaks. A soft golden ring comes about
// the right sandal, which goes into the place first, then the left. The place goes to the door, the sandals with it; the
// left comes off first, then the right, and a soft golden ring shows about the right: first on, last off. His voice
// speaks again; the right goes into the place alone, it steps away, and a grey ring comes about it. Then the left comes
// to it too, the grey ring fades, and a soft golden ring comes about both.
function rightSandalFirst(): SignArt {
  const s = 1.7;
  const place: [number, number] = [70, 99.8];
  const half = 3.6;
  const right0: [number, number] = [48.6, 101.8];
  const left0: [number, number] = [40, 101.8];
  const step: [number, number] = [56, 1.4];
  const back: [number, number] = [-36, -0.6];
  const offL: [number, number] = [113, 102.4];
  const offR: [number, number] = [139, 102.4];
  const his: [number, number] = [14, 100.4];
  // Where a sandal is, from where it lies (`start`), with its side of the place (`side`): into the place at `on`, to
  // the door with it, off to `rest` at `off`, then into the place again at `again`.
  const sandalXY = (start: [number, number], side: number, on: [number, number], off: [number, number], rest: [number, number], again: [number, number]): [number, number, number][] => {
    const worn: [number, number] = [n(place[0] + side * half - start[0]), n(place[1] - start[1])];
    const atDoor: [number, number] = [n(worn[0] + step[0]), n(worn[1] + step[1])];
    const r: [number, number] = [n(rest[0] - start[0]), n(rest[1] - start[1])];
    const stepped: [number, number] = [n(atDoor[0] + back[0]), n(atDoor[1] + back[1])];
    const late = again[0] > 0.8;
    return [
      [on[0], 0, 0],
      [on[1], worn[0], worn[1]],
      [0.355, worn[0], worn[1]],
      [0.39, atDoor[0], atDoor[1]],
      [off[0], atDoor[0], atDoor[1]],
      [off[1], r[0], r[1]],
      [again[0], r[0], r[1]],
      [again[1], late ? stepped[0] : atDoor[0], late ? stepped[1] : atDoor[1]],
      ...(late
        ? []
        : ([
            [0.705, atDoor[0], atDoor[1]],
            [0.75, stepped[0], stepped[1]]
          ] as [number, number, number][]))
    ];
  };
  const rightXY = sandalXY(right0, 1, [0.205, 0.235], [0.43, 0.45], offR, [0.685, 0.7]);
  const leftXY = sandalXY(left0, -1, [0.25, 0.28], [0.4, 0.42], offL, [0.85, 0.875]);
  const last: [number, number] = [n(place[0] + step[0] + back[0]), n(place[1] + step[1] + back[1])];
  return {
    kind: "right-sandal-first",
    ms: 10000,
    parts: [
      ...day(30, 120, 10000),
      { name: "a home, its door", svg: home(126, 99, 30, 21) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: when you put on sandals", svg: arcs(n(his[0] + 2.2), n(his[1] - 3.6), GOLD), keys: showFor(0.03, 0.04, 0.185, 0.195), loop: speaking },
      {
        name: "the place where one who wears them stands",
        svg: placeOn(place[0], place[1], 9, 6.4),
        keys: track({
          xy: [
            [0.355, 0, 0],
            [0.39, step[0], step[1]],
            [0.705, step[0], step[1]],
            [0.75, n(step[0] + back[0]), n(step[1] + back[1])]
          ]
        })
      },
      { name: "start with the right: a soft golden ring about the right sandal", svg: care(right0[0], right0[1], 4.2, 6.4), keys: showFor(0.19, 0.2, 0.24, 0.25), loop: soft },
      { name: "the right sandal", svg: sandal(right0[0], right0[1], true, s), keys: track({ xy: rightXY }) },
      { name: "the left sandal", svg: sandal(left0[0], left0[1], false, s), keys: track({ xy: leftXY }) },
      { name: "first on, last off: a soft golden ring about the right sandal", svg: care(offR[0], offR[1], 4.2, 6.4, SOFT_GOLD), keys: showFor(0.52, 0.54, 0.68, 0.69), loop: soft },
      { name: "the right sandal: a glint", svg: sparkle(n(offR[0] + 3.4), n(offR[1] - 5.6), 0.9, "#FFE7A0"), keys: showFor(0.525, 0.545, 0.68, 0.69), loop: speaking },
      { name: "his voice: not in one sandal", svg: arcs(n(his[0] + 2.2), n(his[1] - 3.6), GOLD), keys: showFor(0.685, 0.695, 0.845, 0.855), loop: speaking },
      { name: "in one sandal: a grey ring about the place", svg: greyRing(last[0], last[1], 11.4, 7.6), keys: showFor(0.755, 0.77, 0.85, 0.87) },
      { name: "both worn: a soft golden ring about them", svg: care(last[0], last[1], 11.4, 7.6, SOFT_GOLD), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: [
      { text: "He said: when you put on sandals", from: 0.02, to: 0.17 },
      { text: "start with the right", from: 0.185, to: 0.335 },
      { text: "and when you take them off, the left", from: 0.35, to: 0.5 },
      { text: "the right is first on and last off", from: 0.515, to: 0.665 },
      { text: "He said: do not walk in one sandal", from: 0.68, to: 0.83 },
      { text: "take both off, or wear both", from: 0.845, to: 1 }
    ]
  };
}

/** A few small dashed circles side by side from (x, y), `gap` apart: the places of a group. */
const group = (x: number, y: number, count: number, gap: number, r = 1.4) =>
  Array.from({ length: count }, (_, i) => someone(n(x + i * gap), n(y + (i % 2 ? -0.6 : 0)), r)).join("");

/** A small home far off, its foot's middle at (x, y). */
const farHome = (x: number, y: number) =>
  `<rect x="${n(x - 2.6)}" y="${n(y - 3.4)}" width="5.2" height="3.4" fill="#A88B66"/><rect x="${n(x - 3)}" y="${n(y - 3.9)}" width="6" height="0.6" fill="#8E7454"/><rect x="${n(x - 0.6)}" y="${n(y - 1.8)}" width="1.1" height="1.8" fill="#5E4630"/>`;

// Uways of Yemen. Usayr ibn Jabir said: when help came to Umar ibn al-Khattab from the people of Yemen, he would ask
// them: is Uways ibn Amir among you? until he came upon Uways, and said: are you Uways ibn Amir? He said: yes. From
// Murad, then from Qaran? Yes. You have a mother? Yes. Umar said: I heard the Messenger of Allah ﷺ say: Uways ibn Amir
// will come to you with the help of the people of Yemen, from Murad, then from Qaran; he has a mother to whom he is
// dutiful; were he to swear by Allah, Allah would fulfil it. If you can have him ask forgiveness for you, do so. So ask
// forgiveness for me; and he asked forgiveness for him. Umar said: where are you going? He said: Kufa. Shall I write to
// its governor for you? He said: I would rather be among the poor of the people (Sahih Muslim 2542c). No one is drawn:
// by the masjid of Madinah, Umar's place. Along the road from Yemen a group of the help comes in; Umar's voice asks;
// they go on, and another group comes. Umar's place goes to them, and a soft ring comes about one place among them:
// Uways. Umar's voice asks, Uways's voice answers, and a faint golden line goes from Uways's place back along the road
// to a home far off in Qaran, with a warm glow about it. Umar's voice asks again; a spark rises from Uways's place, and a
// soft white glow comes about Umar's place. Uways's voice speaks, and his place goes off along a way to the plain folk.
function uwaysOfYemen(): SignArt {
  const umar: [number, number] = [32, 99.4];
  const metAt: [number, number] = [66, 101.2];
  const groupAt: [number, number] = [84, 101.2];
  const uways: [number, number] = [84, 100.6];
  const qaran: [number, number] = [148, 75.6];
  const plain: [number, number] = [50, 82.4];
  const toPlain: [number, number] = [n(plain[0] + 13 - uways[0]), n(plain[1] - uways[1])];
  const uwaysGoes: [number, number, number][] = [
    [0.905, 0, 0],
    [0.945, toPlain[0], toPlain[1]]
  ];
  const comeIn = (from: number, to: number): [number, number, number][] => [
    [from, 76, -3.6],
    [to, 0, 0]
  ];
  return {
    kind: "uways-of-yemen",
    ms: 12000,
    parts: [
      ...day(120, 50, 12000),
      { name: "hills of Yemen, far off", svg: `<path d="M118 66 Q130 58 142 64 Q152 59 160 62 L160 70 L118 70 Z" fill="#BFA67C"/>` },
      { name: "a home in Qaran, far off", svg: farHome(qaran[0], qaran[1]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      { name: "the road from Yemen", svg: way("M160 97 C130 98.8 96 101.6 40 102.4", "#F4E3BC", 0.9) },
      { name: "the way to the plain folk", svg: way(`M${n(uways[0] - 3)} ${n(uways[1] - 1.4)} C76 92 66 86 ${n(plain[0] + 14)} ${n(plain[1] + 0.4)}`, "#F4E3BC", 0.7), keys: showAt(0.89, 0.905) },
      { name: "the places of the plain folk", svg: group(plain[0], plain[1], 4, 3.4, 1.1) },
      {
        name: "the help from Yemen, a first group",
        svg: group(groupAt[0], groupAt[1], 3, 5.4),
        keys: track({
          opacity: [
            [0.025, 0],
            [0.035, 1],
            [0.18, 1],
            [0.205, 0]
          ],
          xy: [...comeIn(0.025, 0.075), [0.175, 0, 0], [0.205, -30, 2.4]]
        })
      },
      {
        name: "the help from Yemen, another group",
        svg: someone(n(groupAt[0] + 5.6), groupAt[1], 1.4) + someone(n(groupAt[0] + 11.2), n(groupAt[1] - 0.6), 1.4),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.19, 1]
          ],
          xy: comeIn(0.18, 0.21)
        })
      },
      {
        name: "Uways's place",
        svg: someone(uways[0], uways[1], 1.4),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.19, 1]
          ],
          xy: [...comeIn(0.18, 0.21), ...uwaysGoes]
        })
      },
      {
        name: "Umar's place",
        svg: someone(umar[0], umar[1], 1.6),
        keys: track({
          xy: [
            [0.272, 0, 0],
            [0.31, n(metAt[0] - umar[0]), n(metAt[1] - umar[1])]
          ]
        })
      },
      { name: "Umar's voice: he asked them", svg: arcs(n(umar[0] + 2.2), n(umar[1] - 3.6), VOICE), keys: showFor(0.075, 0.085, 0.144, 0.154), loop: speaking },
      { name: "Umar's voice: is Uways among you", svg: arcs(n(umar[0] + 2.2), n(umar[1] - 3.6), VOICE), keys: showFor(0.148, 0.158, 0.268, 0.278), loop: speaking },
      {
        name: "found: a soft ring about Uways's place",
        svg: care(uways[0], n(uways[1] + 0.4), 3.4, 1.7, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.31, 0],
            [0.325, 1]
          ],
          xy: uwaysGoes
        }),
        loop: soft
      },
      { name: "Umar's voice: you have one at home", svg: arcs(n(metAt[0] + 2.2), n(metAt[1] - 3.6), VOICE), keys: showFor(0.395, 0.405, 0.516, 0.526), loop: speaking },
      { name: "Uways's voice: yes", svg: arcsLeft(n(uways[0] - 2.2), n(uways[1] - 4), VOICE), keys: showFor(0.43, 0.44, 0.516, 0.526), loop: speaking },
      { name: "kind to her: a faint golden line from Uways's place to the home in Qaran", svg: way(`M${n(uways[0] + 2)} ${n(uways[1] - 1.4)} C112 94 132 84 ${n(qaran[0] - 3)} ${n(qaran[1] + 0.6)}`, SOFT_GOLD, 0.7), keys: showFor(0.52, 0.545, 0.64, 0.655) },
      { name: "a warm glow about the home in Qaran", svg: glow(qaran[0], n(qaran[1] - 1.6), 6, WARM, 0.32), keys: showAt(0.53, 0.56) },
      { name: "Umar's voice: ask forgiveness for me", svg: arcs(n(metAt[0] + 2.2), n(metAt[1] - 3.6), VOICE), keys: showFor(0.645, 0.655, 0.764, 0.774), loop: speaking },
      { name: "a prayer: a spark rising from Uways's place", svg: sparkle(uways[0], n(uways[1] - 3.4), 1.4, SPARK), keys: sparkRising(0.77, 0.815, 10), loop: speaking },
      { name: "forgiveness asked: a soft white glow about Umar's place", svg: wash(metAt[0], metAt[1], 6, 2.4, "#FFFFFF", 0.16), keys: showAt(0.8, 0.83) },
      {
        name: "Uways's voice: among the poor",
        svg: arcsLeft(n(uways[0] - 2.2), n(uways[1] - 4), VOICE),
        keys: track({
          opacity: [
            [0.89, 0],
            [0.9, 1]
          ],
          xy: uwaysGoes
        }),
        loop: speaking
      },
      { name: "a warm glow among the plain folk", svg: wash(n(plain[0] + 6), plain[1], 12, 2.6, WARM, 0.18), keys: showAt(0.935, 0.955) }
    ],
    words: [
      { text: "Help came from Yemen, and Umar asked them", from: 0.02, to: 0.129 },
      { text: "Is Uways ibn Amir among you?", from: 0.144, to: 0.253 },
      { text: "until Umar came upon Uways", from: 0.268, to: 0.377 },
      { text: "Umar asked: you have a mother? Uways: yes", from: 0.392, to: 0.501 },
      { text: "He had said: Uways is kind to his mother", from: 0.516, to: 0.625 },
      { text: "Umar said: so ask forgiveness for me", from: 0.64, to: 0.749 },
      { text: "And Uways asked forgiveness for Umar", from: 0.764, to: 0.873 },
      { text: "Uways: I'd rather be among the poor", from: 0.888, to: 1 }
    ]
  };
}

/** Sharp stones on rough ground about (x, y): grey and jagged. */
const roughStones = (x: number, y: number) =>
  [
    [-15, 1.4, 1.3],
    [-11, -2.2, 1],
    [-7.4, 2.6, 1.4],
    [-4, -1.4, 0.9],
    [4.2, -1.8, 1.1],
    [7.2, 2.4, 1.3],
    [11.4, -1, 1],
    [15, 1.8, 1.2],
    [-1, 3.6, 1],
    [2.4, 4, 0.8]
  ]
    .map(
      ([dx, dy, s]) =>
        `<path d="M${n(x + dx - 1.6 * s)} ${n(y + dy + 0.8 * s)} L${n(x + dx - 0.6 * s)} ${n(y + dy - 1.4 * s)} L${n(x + dx + 0.4 * s)} ${n(y + dy - 0.4 * s)} L${n(x + dx + 1.2 * s)} ${n(y + dy - 1.8 * s)} L${n(x + dx + 1.8 * s)} ${n(y + dy + 0.8 * s)} Z" fill="#8F8678"/>` +
        `<path d="M${n(x + dx - 0.6 * s)} ${n(y + dy - 1.4 * s)} L${n(x + dx + 0.4 * s)} ${n(y + dy - 0.4 * s)}" stroke="#B3AA9A" stroke-width="0.3"/>`
    )
    .join("");

// Rough ground and smooth. Al-Musayyib said that his father came to the Prophet ﷺ, who asked: what is your name? He
// said: Hazn. He said: you are Sahl. He said: I will not change a name my father gave me. Ibn al-Musayyib said: the
// roughness has stayed among us ever since (Sahih al-Bukhari 6190). Hazn is rough, stony ground; Sahl is smooth, easy
// ground. No one is drawn: Hazn's place stands on rough ground, sharp stones all about it; his place, a golden ring, is on
// smooth ground. His voice asks; Hazn's voice answers, and a grey ring comes about the stones. His voice speaks again:
// the stones fade, and a soft green plain shows under Hazn's place, with a soft golden ring. Hazn's voice speaks: the
// plain fades, the stones come back, and a faint line goes back to an old home far off: the name from long ago. Years
// on, three places of those after him show among the stones, with a grey ring about them all.
function haznAndSahl(): SignArt {
  const hazn: [number, number] = [52, 100.4];
  const his: [number, number] = [110, 101.6];
  const old: [number, number] = [16, 84];
  const stones = track({
    opacity: [
      [0.38, 1],
      [0.42, 0.14],
      [0.55, 0.14],
      [0.6, 1]
    ]
  });
  return {
    kind: "hazn-and-sahl",
    ms: 10000,
    parts: [
      ...day(126, 40, 10000),
      { name: "rough ground about Hazn's place", svg: `<path d="M30 104 Q34 97.6 44 97 Q54 95.8 62 97.4 Q72 98.4 75 104 Q70 108.6 52 108.8 Q36 108.6 30 104 Z" fill="#C9B38C"/>` },
      { name: "rough ground: sharp stones", svg: roughStones(hazn[0], n(hazn[1] + 2.6)), keys: stones },
      {
        name: "smooth ground: a soft green plain",
        svg: `<path d="M30 104 Q34 97.6 44 97 Q54 95.8 62 97.4 Q72 98.4 75 104 Q70 108.6 52 108.8 Q36 108.6 30 104 Z" fill="#CFE3A4"/>` + `<path d="M36 104.4 Q52 102.6 68 104.2" stroke="#B9D58A" stroke-width="0.6" fill="none"/>`,
        keys: track({
          opacity: [
            [0.38, 0],
            [0.42, 1],
            [0.55, 1],
            [0.6, 0]
          ]
        })
      },
      { name: "an old home, far off", svg: farHome(old[0], old[1]) },
      { name: "the name from long ago: a faint line to the old home", svg: lookLine(n(hazn[0] - 2), n(hazn[1] - 1.6), n(old[0] + 3), n(old[1] - 1), 80, "#A08A68"), keys: showFor(0.69, 0.71, 0.845, 0.86) },
      { name: "Hazn's place", svg: someone(hazn[0], hazn[1], 1.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: what is your name", svg: arcsLeft(n(his[0] - 2.2), n(his[1] - 3.6), GOLD), keys: showFor(0.03, 0.04, 0.185, 0.195), loop: speaking },
      { name: "Hazn's voice: Hazn", svg: arcs(n(hazn[0] + 2.4), n(hazn[1] - 3.8), VOICE), keys: showFor(0.19, 0.2, 0.35, 0.36), loop: speaking },
      { name: "rough: a grey ring about the stones", svg: greyRing(hazn[0], n(hazn[1] + 2.4), 22, 5.6), keys: showFor(0.21, 0.23, 0.38, 0.4) },
      { name: "his voice: you are Sahl", svg: arcsLeft(n(his[0] - 2.2), n(his[1] - 3.6), GOLD), keys: showFor(0.355, 0.365, 0.515, 0.525), loop: speaking },
      { name: "easy: a soft golden ring about Hazn's place", svg: care(hazn[0], n(hazn[1] + 0.6), 4.4, 2.1, SOFT_GOLD), keys: showFor(0.41, 0.43, 0.55, 0.575), loop: soft },
      { name: "Hazn's voice: I will not change it", svg: arcs(n(hazn[0] + 2.4), n(hazn[1] - 3.8), VOICE), keys: showFor(0.52, 0.53, 0.845, 0.855), loop: speaking },
      { name: "years on: the places of those after Hazn", svg: someone(41, 104.4, 1.3) + someone(63, 104, 1.3) + someone(n(hazn[0] + 1), 106.2, 1.3), keys: showAt(0.85, 0.88) },
      { name: "the roughness stayed: a grey ring about them all", svg: greyRing(hazn[0], n(hazn[1] + 3.6), 16, 4.4), keys: showAt(0.885, 0.91) }
    ],
    words: [
      { text: "He asked: what is your name?", from: 0.02, to: 0.17 },
      { text: "The man said: Hazn", from: 0.185, to: 0.335 },
      { text: "He said: you are Sahl", from: 0.35, to: 0.5 },
      { text: "Hazn said: I will not change the name", from: 0.515, to: 0.665 },
      { text: "my father gave me", from: 0.68, to: 0.83 },
      { text: "Ibn al-Musayyib: roughness stayed in us", from: 0.845, to: 1 }
    ]
  };
}

/** A dish on a cloth, the dish's middle at (x, y). */
const dishOnCloth = (x: number, y: number) =>
  `<path d="M${n(x - 9)} ${n(y + 0.6)} L${n(x + 9)} ${n(y + 0.6)} L${n(x + 10.4)} ${n(y + 3.6)} L${n(x - 10.4)} ${n(y + 3.6)} Z" fill="#EFE0BC"/>` +
  `<ellipse cx="${x}" cy="${n(y + 1.2)}" rx="5.6" ry="1.6" fill="#C9A26A"/><ellipse cx="${x}" cy="${n(y + 0.9)}" rx="4.6" ry="1.1" fill="#E3C38C"/>`;

// Ajwa in the morning. Sa'd said that the Prophet ﷺ said: whoever eats a few ajwa dates in the morning, every day, no
// poison and no magic will harm him that day, until night. Another said: seven dates (Sahih al-Bukhari 5768). No one is
// drawn: at dawn, by a home, a dish of ajwa dates on a cloth, and the place of one who eats them; far off, the masjid,
// and his place, a golden ring. His voice speaks as the sun comes up. The dates go one by one. A soft white ring comes
// about the place, and small grey specks of harm come near and fade at it. The sun goes across the sky and sets, night
// falls, and the white ring fades. A new morning, and seven ajwa dates show on the dish, with glints.
function ajwaMorning(): SignArt {
  const dish: [number, number] = [100, 100.4];
  const k = 1.9;
  const place: [number, number] = [125, 103.2];
  const few: [number, number][] = [
    [97.6, 100.8],
    [99.4, 100.4],
    [101.2, 100.9],
    [102.8, 100.4]
  ];
  const seven: [number, number][] = [
    [96.6, 100.9],
    [97.8, 100.3],
    [99, 100.9],
    [100.2, 100.3],
    [101.4, 100.9],
    [102.6, 100.3],
    [103.8, 100.9]
  ];
  const night = track({
    opacity: [
      [0.7, 0],
      [0.745, 1],
      [0.816, 1],
      [0.84, 0]
    ]
  });
  const eaten = (i: number): SignPart => ({
    name: `an ajwa date on the dish ${i + 1}`,
    svg: big(date(few[i][0], few[i][1]), dish[0], dish[1], k),
    keys: track({
      opacity: [
        [at3(0.23 + i * 0.025), 1],
        [at3(0.24 + i * 0.025), 0]
      ]
    })
  });
  return {
    kind: "ajwa-morning",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "dawn: a warm tint over the sky", svg: `<rect width="160" height="62" fill="#FFB07A" opacity="0.6"/>`, keys: track({ opacity: [[0.08, 1], [0.15, 0]] }) },
      {
        name: "the sun",
        svg: sun(22, 60),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.15, 12, -26],
            [0.62, 12, -26],
            [0.68, 62, -34],
            [0.74, 128, 6]
          ],
          opacity: [
            [0.72, 1],
            [0.745, 0]
          ]
        })
      },
      {
        name: "the sun of the next morning",
        svg: sun(22, 60),
        keys: track({
          opacity: [
            [0.816, 0],
            [0.83, 1]
          ],
          xy: [
            [0.82, 0, 0],
            [0.9, 10, -22]
          ]
        })
      },
      { name: "a cloud", svg: cloud(70, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: springLand() },
      { name: "the masjid, far off", svg: madinahMasjid(2, 94, 0.46) },
      { name: "his place, a golden ring", svg: ring(14, 98.6, 2.4, GOLD) },
      { name: "a home", svg: home(140, 97, 18, 12) },
      { name: "a dish on a cloth", svg: big(dishOnCloth(dish[0], dish[1]), dish[0], dish[1], k) },
      eaten(0),
      eaten(1),
      eaten(2),
      eaten(3),
      { name: "the place of one who eats them", svg: someone(place[0], place[1], 1.8) },
      { name: "his voice: whoever eats in the morning", svg: arcs(16.2, 95, GOLD), keys: showFor(0.03, 0.04, 0.219, 0.229), loop: speaking },
      { name: "kept safe: a soft white ring about the place", svg: care(place[0], n(place[1] + 0.6), 4.6, 2.2, "#FFFFFF"), keys: showFor(0.42, 0.44, 0.74, 0.76), loop: soft },
      {
        name: "harm turned away: small grey specks",
        svg: [
          [0, 0],
          [1.4, -1.6],
          [0.6, 1.4],
          [-1.2, -0.8]
        ]
          .map(([dx, dy]) => `<circle cx="${n(place[0] + 12 + dx)}" cy="${n(place[1] + dy)}" r="0.45" fill="#8C8C8C"/>`)
          .join(""),
        keys: track({
          opacity: [
            [0.45, 0],
            [0.46, 1],
            [0.5, 1],
            [0.53, 0]
          ],
          xy: [
            [0.45, 10, 0],
            [0.5, -4, 0]
          ]
        })
      },
      { name: "night", svg: NIGHT, keys: night },
      { name: "stars", svg: NIGHT_STARS, keys: night, loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "seven ajwa dates, in the other telling", svg: big(seven.map(([x, y]) => date(x, y)).join(""), dish[0], dish[1], k), keys: showAt(0.825, 0.85) },
      { name: "seven ajwa dates: glints", svg: sparkle(91.6, 98.4, 0.8, "#FFE7A0") + sparkle(108.6, 98.6, 0.7, "#FFE7A0"), keys: showAt(0.83, 0.855), loop: speaking }
    ],
    words: [
      { text: "He said: whoever eats in the morning", from: 0.02, to: 0.204 },
      { text: "every day, a few ajwa dates", from: 0.219, to: 0.403 },
      { text: "no poison or magic will harm him", from: 0.418, to: 0.602 },
      { text: "that day, until night", from: 0.617, to: 0.801 },
      { text: "Another said: seven dates", from: 0.816, to: 1 }
    ]
  };
}

export const SPRING_ART = {
  "flowing-spring": flowingSpring,
  "kings-on-the-sea": kingsOnTheSea,
  "glass-vessels": glassVessels,
  "right-sandal-first": rightSandalFirst,
  "uways-of-yemen": uwaysOfYemen,
  "hazn-and-sahl": haznAndSahl,
  "ajwa-morning": ajwaMorning
} as const;
