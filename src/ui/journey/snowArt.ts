import { animalAt, cloud, glow, n, nightSky, palm, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, measure, heapOf, ring, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor } from "./roadArt";
import { at3 } from "./storyArt";
import { dish } from "./worthArt";

/**
 * Snow: he used to say: O Allah, wash away my sins with the water of snow and hail, and cleanse my heart from the sins
 * as a white garment is cleansed from the filth, and let there be a long distance between me and my sins, as You made
 * East and West far from each other; the earth will vomit long pieces of its liver like columns of gold and silver,
 * and the murderer will come and say: it was for this that I committed murder, and the breaker of family ties will
 * come, and the thief; then they will leave it and will not take anything out of it; the sun and the moon will be
 * folded up on the Day of Resurrection; Zayd ibn Amr used to criticize the way Quraysh used to slaughter their
 * animals, and used to say: Allah has created the sheep, and He has sent the water for it from the sky, and He has
 * grown the grass for it from the earth, yet you slaughter it in other than the Name of Allah; he gave a banquet with
 * two mudds of barley on marrying some of his wives; he never missed four rak'ahs before the Zuhr prayer and two
 * rak'ahs before the Fajr prayer; and Ibn Abbas was among those whom he sent on the night of Muzdalifah early, among
 * the weak members of his family. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet,
 * no Companion and no person is ever drawn, not even a hand, a foot or a face: where someone was, a ring or a small
 * dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for
 * Allah or for the Day, and no sin is drawn. Nothing comes down from the sky but the drops of the water He sent: a du'a
 * or a prayer is a spark that rises, what is good is a light, glints and a soft golden ring, and what does no good is
 * a grey ring. No idol is drawn, and nothing of a slaughter. No name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The places of the folk: of a town, of a banquet, of a family. */
const FOLK = "#C39A5A";

/** A place at night: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A picture made `s` times bigger about the point (x, y). */
const bigger = (svg: string, x: number, y: number, s: number) => `<g transform="translate(${n(x * (1 - s))} ${n(y * (1 - s))}) scale(${s})">${svg}</g>`;

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });

/** A spark that rises from its place from `from` until `to`, `rise` high, and stays there. */
const sparkStays = (from: number, to: number, rise = 10): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, -1, -rise]
});

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 112], [64, 115], [112, 113], [150, 114]]) => landOf(tufts, fill);

/** The land by night from y 61 down, with a few dark tufts of grass. */
const nightLand = (fill: string, tufts: [number, number][]) =>
  `<rect y="61" width="160" height="59" fill="${fill}"/><path d="M0 61 L160 61" stroke="#4A5878" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#4E5B78", 3.4)).join("");

/** Drops of the water He sent: short slanting strokes from x1 to x2 and from y1 to y2; `seed` sets them apart. */
const drops = (x1: number, x2: number, y1: number, y2: number, seed: number, color = "#6E9CCB") => {
  let d = "";
  let k = seed;
  for (let y = y1; y < y2; y += 8) {
    for (let x = x1 + ((k * 5) % 12); x < x2; x += 12) d += `M${n(x)} ${n(y)} l-0.5 2.6 `;
    k += 1;
  }
  return `<path d="${d.trim()}" stroke="${color}" stroke-width="0.7" stroke-linecap="round"/>`;
};

/** Three layers of drops, each coming down a little and fading, one after another, so they never stop while shown. */
const shower = (label: string, x1: number, x2: number, y1: number, y2: number, keys: SignKeys, clip: SignPart["clip"]): SignPart[] =>
  [0, 1, 2].map((i) => ({
    name: `${label} ${i + 1}`,
    svg: drops(x1, x2, y1, y2, i * 4),
    keys,
    loop: { move: "drip" as const, ms: 900, distance: 7, phase: i / 3 },
    clip
  }));

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** Snow on the tops of the hills (the peaks of `hills()`). */
const SNOW_ON_HILLS = [
  [20, 9, 30],
  [84, 13, 38],
  [148, 10, 30]
]
  .map(([x, h, w]) => `<path d="M${n(x - w * 0.22)} ${n(61 - h * 0.62)} L${x} ${n(61 - h)} L${n(x + w * 0.22)} ${n(61 - h * 0.62)} Q${x} ${n(61 - h * 0.5)} ${n(x - w * 0.22)} ${n(61 - h * 0.62)} Z" fill="#FFFFFF" opacity="0.92"/>`)
  .join("");

// Washed with snow and hail. Aishah said: the Prophet ﷺ used to say: O Allah, I seek refuge with You from laziness
// and old age, from sins and from debt, ... O Allah, wash away my sins with the water of snow and hail, and cleanse my
// heart from all the sins as a white garment is cleansed from the filth, and let there be a long distance between me
// and my sins, as You made East and West far from each other (Sahih al-Bukhari 6368). No sin is drawn, and no one: on
// a cold morning, by his home, his place, a golden ring, and Aishah's place, with her voice; his voice speaks, and a
// spark of du'a rises. A clear pool of the water of snow and hail lies on the land; snow lies about it and on the
// hills, and hailstones by the pool. A white garment is spread by the pool, with specks of filth on it; water runs to
// it from the pool, a sheen goes across it, the specks go one by one, and it shines white. Then a faint way runs
// across the land, and reaches far to the left and the right; a glow comes low on the right, in the East, and another
// low on the left, in the West, far from each other.
function washedWithSnowAndHail(): SignArt {
  const his: [number, number] = [22.2, 99.8];
  const aishah: [number, number] = [8, 106];
  const specks: [number, number][] = [
    [108, 101],
    [114, 102.6],
    [120, 100.2],
    [126, 102.2],
    [129.4, 99.8]
  ];
  const hail: [number, number][] = [
    [51, 101.6],
    [54.6, 107.2],
    [79.6, 101.8],
    [82.2, 106.6],
    [60, 108.6],
    [73, 108.8],
    [48.4, 105]
  ];
  const snow: [number, number, number, number][] = [
    [10, 113, 7, 1.6],
    [44, 116.4, 9, 1.8],
    [92, 112.6, 6, 1.4],
    [118, 116.4, 10, 1.8],
    [150, 110.6, 7, 1.5],
    [52, 95.2, 6, 1.2],
    [140, 94, 6, 1.2],
    [96, 90.4, 5, 1]
  ];
  return {
    kind: "washed-with-snow-and-hail",
    ms: 11000,
    parts: [
      { name: "the sky of a cold morning", svg: sky("#C9D8E6", "#E3ECF4", 62) },
      { name: "a pale sun", svg: glow(120, 20, 10, "#FFF6DC", 0.14) + `<circle cx="120" cy="20" r="4.2" fill="#FFF1C9"/>` },
      { name: "a cloud", svg: cloud(52, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills("#B9B2A4") },
      { name: "snow on the hills", svg: SNOW_ON_HILLS, keys: showAt(0.27, 0.29) },
      {
        name: "the land",
        svg: plainLand("#DCD2BC", [
          [70, 116],
          [104, 117],
          [138, 116]
        ])
      },
      { name: "his home", svg: home(24, 96, 22, 14) },
      { name: "his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, ITS_VOICE) },
      { name: "Aishah's voice: telling of him", svg: arcs(n(aishah[0] + 3), n(aishah[1] - 1.6), ITS_VOICE), keys: showFor(0.025, 0.035, 0.06, 0.07), loop: speaking },
      { name: "his voice: the du'a", svg: arcs(n(his[0] + 3), n(his[1] - 1.6), GOLD), keys: showAt(0.07, 0.08), loop: speaking },
      { name: "a spark of du'a rising", svg: sparkle(his[0], n(his[1] - 6), 1.4, "#FFE7A0"), keys: sparkStays(0.145, 0.21, 14), loop: twinkle() },
      {
        name: "the water of snow and hail: a clear pool",
        svg: `<ellipse cx="66" cy="104.2" rx="13" ry="3.2" fill="#BFE0F0"/><ellipse cx="66" cy="103.6" rx="10" ry="2" fill="#D8EEF8"/>`,
        keys: showAt(0.15, 0.17)
      },
      { name: "a sheen on the clear pool", svg: `<path d="M58 103.6 L64 103.6 M68 104.8 L74 104.8" stroke="#FFFFFF" stroke-width="0.5" stroke-linecap="round"/>`, keys: showAt(0.17, 0.19), loop: soft },
      { name: "snow lying on the land", svg: snow.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FFFFFF" opacity="0.94"/>`).join(""), keys: showAt(0.27, 0.29) },
      { name: "hailstones by the pool", svg: hail.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.8" fill="#FFFFFF" stroke="#C9D6E2" stroke-width="0.25"/>`).join(""), keys: showAt(0.3, 0.32) },
      { name: "a cool glint on the pool", svg: glints([[62, 103.2], [71, 104.4]], 1, "#FFFFFF"), keys: showAt(0.315, 0.33), loop: twinkle() },
      {
        name: "a white garment, spread",
        svg:
          `<path d="M104 98.6 L130 97.8 L133 103.6 L102 104.4 Z" fill="#FFFFFF" stroke="#D3D9E2" stroke-width="0.4"/>` +
          `<path d="M111 98.4 L110.4 104.2 M118 98.2 L118 104 M125 98 L126 103.8" stroke="#E2E6EE" stroke-width="0.4"/>`,
        keys: showAt(0.39, 0.41)
      },
      ...specks.map(([x, y], i): SignPart => ({
        name: `the filth on the garment: a speck ${i + 1}`,
        svg: `<circle cx="${x}" cy="${y}" r="0.9" fill="#8C7B64"/>`,
        keys: showWhile(0.42, 0.44, at3(0.53 + i * 0.008), at3(0.545 + i * 0.008))
      })),
      { name: "water from the pool to the garment", svg: `<path d="M79 104 Q85 102.6 90 103.6 T101.4 102.6" stroke="#9FD3EE" stroke-width="0.8" fill="none" stroke-linecap="round"/>`, keys: showWhile(0.51, 0.52, 0.63, 0.64), loop: soft },
      {
        name: "a sheen across the white garment",
        svg: `<rect x="102" y="97.6" width="3" height="7" fill="#E4F4FF" opacity="0.85"/>`,
        keys: track({
          opacity: [
            [0.52, 0],
            [0.525, 1],
            [0.57, 1],
            [0.575, 0]
          ],
          xy: [
            [0.52, 0, 0],
            [0.575, 28, 0]
          ]
        }),
        clip: { x: 101, y: 97, w: 33, h: 8 }
      },
      {
        name: "the garment cleansed: glints over it",
        svg: glints(
          [
            [108, 99.4],
            [117, 101.6],
            [125, 99.2],
            [131, 102]
          ],
          1,
          "#E9BE58"
        ),
        keys: showAt(0.566, 0.576),
        loop: twinkle()
      },
      { name: "a long distance: a faint way across the land", svg: way("M40 78 L120 78", "#F6F2E6", 0.8), keys: showAt(0.64, 0.67) },
      { name: "the way, reaching far to the left", svg: way("M6 78 L40 78", "#F6F2E6", 0.8), keys: showAt(0.76, 0.79) },
      { name: "the way, reaching far to the right", svg: way("M120 78 L154 78", "#F6F2E6", 0.8), keys: showAt(0.77, 0.8) },
      { name: "the East: a glow low on the right", svg: glow(156, 68, 10, "#FFE3A8", 0.26) + wash(153, 71, 7, 3, "#FFD99A", 0.22), keys: showAt(0.88, 0.9), loop: soft },
      { name: "the West: a glow low on the left", svg: glow(4, 68, 10, "#F7C9A0", 0.26) + wash(7, 71, 7, 3, "#F3BE94", 0.22), keys: showAt(0.9, 0.92), loop: soft },
      { name: "far from each other: glints at the two ends", svg: glints([[8, 76], [152, 76]], 1.2), keys: showAt(0.93, 0.95), loop: twinkle() }
    ],
    words: [
      { text: "Aishah: he used to say: O Allah!", from: 0.02, to: 0.13 },
      { text: "Wash away my sins with the water", from: 0.142, to: 0.252 },
      { text: "of snow and hail, and cleanse my heart", from: 0.264, to: 0.374 },
      { text: "from all the sins as a white garment", from: 0.386, to: 0.496 },
      { text: "is cleansed from the filth,", from: 0.508, to: 0.618 },
      { text: "and let there be a long distance", from: 0.63, to: 0.74 },
      { text: "between me and my sins, as You made", from: 0.752, to: 0.862 },
      { text: "East and West far from each other.", from: 0.874, to: 1 }
    ]
  };
}

/** A column standing on the earth, `w` wide and `h` high, its foot's middle at (x, y): of gold or of silver. */
const column = (x: number, y: number, w: number, h: number, of: "gold" | "silver") => {
  const [face, side, top] = of === "gold" ? ["#E2B33C", "#B88A26", "#F3D27A"] : ["#C9CED6", "#9EA6B2", "#E9EDF2"];
  const l = n(x - w / 2);
  return (
    `<rect x="${l}" y="${n(y - h)}" width="${w}" height="${h}" fill="${face}"/>` +
    `<rect x="${n(x + w * 0.15)}" y="${n(y - h)}" width="${n(w * 0.35)}" height="${h}" fill="${side}"/>` +
    `<ellipse cx="${x}" cy="${n(y - h)}" rx="${n(w / 2)}" ry="1" fill="${top}"/>`
  );
};

// Columns of gold and silver. Abu Hurairah reported the Messenger of Allah ﷺ as saying: the earth will vomit long
// pieces of its liver like columns of gold and silver, and the murderer will come and say: it was for this that I
// committed murder. The breaker of family ties will come and say: it was for this that I broke the family ties; and
// the thief will come and say: it is for this that my hands were cut off. They will then leave it and will not take
// anything out of it (Sahih Muslim 1013). Nothing is drawn for the Day, and no one is drawn: on a wide, still plain,
// the earth opens in four places, and long pieces rise out of it, columns of gold and of silver, which shine, with
// glints. A place comes from the left; its voice speaks, and a grey ring comes about it. A place comes from the right,
// and a grey ring comes about it. Then both go away, taking nothing, and the columns stand whole, with glints.
function columnsOfGoldAndSilver(): SignArt {
  // Each column: where it stands, how high, and what it is of.
  const columns: [number, number, number, "gold" | "silver"][] = [
    [40, 98, 24, "gold"],
    [64, 93, 28, "silver"],
    [96, 93, 30, "gold"],
    [120, 98, 24, "silver"]
  ];
  const left: [number, number] = [-6, 106];
  const right: [number, number] = [166, 105];
  return {
    kind: "columns-of-gold-and-silver",
    ms: 11000,
    parts: [
      { name: "a still sky", svg: sky("#D7D6CE", "#ECE9E0", 62) },
      { name: "a pale sun", svg: sun(134, 20) },
      { name: "hills", svg: hills("#C2B49A") },
      {
        name: "the land",
        svg: plainLand("#DCC79E", [
          [16, 114],
          [80, 117],
          [146, 114]
        ])
      },
      {
        name: "the earth opening in four places",
        svg: columns.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="1.4" fill="#6E5A3E"/>`).join(""),
        keys: showAt(0.04, 0.08)
      },
      ...columns.map(([x, y, h, of], i): SignPart => ({
        name: `a long piece rising from the earth: a column of ${of} ${i < 2 ? 1 : 2}`,
        svg: column(x, y, 7, h, of),
        keys: track({
          opacity: [
            [0.148, 0],
            [0.155, 1]
          ],
          xy: [
            [0.15, 0, h + 2],
            [0.205, 0, 0]
          ]
        }),
        clip: { x: x - 6, y: 30, w: 12, h: y - 30 }
      })),
      {
        name: "the gleam of the gold",
        svg: columns
          .filter(([, , , of]) => of === "gold")
          .map(([x, y, h]) => `<rect x="${n(x - 2.6)}" y="${n(y - h + 2)}" width="1" height="${n(h - 4)}" fill="#FFF2C2" opacity="0.8"/>`)
          .join(""),
        keys: showAt(0.27, 0.3),
        loop: soft
      },
      {
        name: "the gleam of the silver",
        svg: columns
          .filter(([, , , of]) => of === "silver")
          .map(([x, y, h]) => `<rect x="${n(x - 2.6)}" y="${n(y - h + 2)}" width="1" height="${n(h - 4)}" fill="#FFFFFF" opacity="0.85"/>`)
          .join(""),
        keys: showAt(0.29, 0.31),
        loop: soft
      },
      {
        name: "glints over the columns",
        svg: glints(
          columns.map(([x, y, h]) => [n(x + 1), n(y - h - 2)]),
          1.1
        ),
        keys: showAt(0.31, 0.33),
        loop: twinkle()
      },
      {
        name: "a place that comes from the left",
        svg: someone(left[0], left[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.388, 0],
            [0.395, 1]
          ],
          xy: [
            [0.39, 0, 0],
            [0.45, 32, 0],
            [0.76, 32, 0],
            [0.82, -2, 0]
          ]
        })
      },
      { name: "its voice: for this", svg: arcs(29, 104.4, ITS_VOICE), keys: showFor(0.51, 0.52, 0.755, 0.765), loop: speaking },
      {
        name: "a grey ring about the place from the left",
        svg: greyRing(26, 106.6, 4, 1.8),
        keys: track({
          opacity: [
            [0.53, 0],
            [0.55, 1]
          ],
          xy: [
            [0.76, 0, 0],
            [0.82, -34, 0]
          ]
        })
      },
      {
        name: "a place that comes from the right",
        svg: someone(right[0], right[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.632, 0],
            [0.64, 1]
          ],
          xy: [
            [0.635, 0, 0],
            [0.695, -32, 0],
            [0.76, -32, 0],
            [0.82, 2, 0]
          ]
        })
      },
      {
        name: "a grey ring about the place from the right",
        svg: greyRing(134, 105.6, 4, 1.8),
        keys: track({
          opacity: [
            [0.68, 0],
            [0.698, 1]
          ],
          xy: [
            [0.76, 0, 0],
            [0.82, 34, 0]
          ]
        })
      },
      {
        name: "nothing taken: glints over the columns, whole",
        svg: glints(
          columns.map(([x, y, h]) => [n(x - 1.4), n(y - h * 0.55)]),
          1,
          "#FFFFFF"
        ),
        keys: showAt(0.88, 0.91),
        loop: twinkle(1500)
      },
      { name: "a soft light about the columns", svg: wash(80, 86, 48, 10, "#FFF3C8", 0.1), keys: showAt(0.9, 0.93) }
    ],
    words: [
      { text: "Abu Hurairah: he said: The earth will", from: 0.02, to: 0.13 },
      { text: "vomit long pieces of its liver", from: 0.142, to: 0.252 },
      { text: "like columns of gold and silver,", from: 0.264, to: 0.374 },
      { text: "and the murderer will come and say:", from: 0.386, to: 0.496 },
      { text: "It was for this that I committed murder.", from: 0.508, to: 0.618 },
      { text: "The breaker of family ties will come.", from: 0.63, to: 0.74 },
      { text: "They will then leave it and will not", from: 0.752, to: 0.862 },
      { text: "take anything out of it.", from: 0.874, to: 1 }
    ]
  };
}

/** A pale full moon by day, its middle at (x, y), `r` across. */
const dayMoon = (x: number, y: number, r: number) =>
  glow(x, y, n(r * 2), "#FFFFFF", 0.1) +
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#F4F2EA"/>` +
  `<circle cx="${n(x - r * 0.3)}" cy="${n(y - r * 0.2)}" r="${n(r * 0.22)}" fill="#E2E0D6"/><circle cx="${n(x + r * 0.35)}" cy="${n(y + r * 0.3)}" r="${n(r * 0.16)}" fill="#E2E0D6"/>`;

// The sun and the moon folded up. Abu Hurairah said: the Prophet ﷺ said: the sun and the moon will be folded up on
// the Day of Resurrection (Sahih al-Bukhari 3200). Nothing is drawn for the Day, and no one is drawn: a day sky, with
// the sun high on the right and the moon pale on the left, over the hills and the land; glints come about both. Then
// they fold up, and their light goes; and a dim light comes over the sky, the hills and the land.
function theSunAndTheMoonFoldedUp(): SignArt {
  const fold = (start: number): SignKeys =>
    track({
      opacity: [
        [0.24, 1],
        [at3(start + 0.1), 1],
        [at3(start + 0.17), 0]
      ],
      scaleY: [
        [start, 1],
        [at3(start + 0.17), 0.08]
      ]
    });
  return {
    kind: "the-sun-and-the-moon-folded-up",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(118, 26), origin: { x: 118, y: 26 }, keys: fold(0.49) },
      { name: "the moon", svg: dayMoon(42, 28, 4.2), origin: { x: 42, y: 28 }, keys: fold(0.5) },
      {
        name: "clouds",
        svg: cloud(70, 34, 0.5, "#FFFFFF", 0.9) + cloud(146, 40, 0.42, "#FFFFFF", 0.85),
        keys: { at: [0, 0.75, 0.8], opacity: [1, 1, 0] },
        loop: { move: "slide", ms: 7000 }
      },
      { name: "a dim sky of that Day", svg: sky("#8E98A8", "#AEB6C2", 62), keys: showAt(0.75, 0.85) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      {
        name: "glints about the sun and the moon",
        svg: glints(
          [
            [110, 18],
            [127, 22],
            [114, 34],
            [36, 21],
            [50, 25],
            [40, 36]
          ],
          1
        ),
        keys: track({
          opacity: [
            [0.25, 0],
            [0.3, 1],
            [0.55, 1],
            [0.62, 0]
          ]
        }),
        loop: twinkle()
      },
      { name: "a dim light over the hills and the land", svg: `<rect y="44" width="160" height="76" fill="#5E6676" opacity="0.32"/>`, keys: showAt(0.76, 0.86) }
    ],
    words: [
      { text: "Abu Hurairah: he said:", from: 0.02, to: 0.22 },
      { text: "The sun and the moon", from: 0.24, to: 0.46 },
      { text: "will be folded up", from: 0.48, to: 0.72 },
      { text: "on the Day of Resurrection.", from: 0.74, to: 1 }
    ]
  };
}

// The sheep and its grass. Abdullah ibn Umar said: ... Zayd ibn Amr used to criticize the way Quraysh used to
// slaughter their animals, and used to say: Allah has created the sheep, and He has sent the water for it from the
// sky, and He has grown the grass for it from the earth; yet you slaughter it in other than the Name of Allah (Sahih
// al-Bukhari 3826). Nothing is drawn for Allah, no idol is drawn, and nothing of a slaughter: in a dry valley by
// Makkah, Zayd's place, and far off, by the homes of Makkah, the places of Quraysh, with a grey ring about them. Zayd's
// voice speaks. A sheep comes into the valley; clouds come, and the water He sent comes down in drops on the land; the
// land darkens with it, and the grass comes up green about the sheep, which grazes. The drops end and the clouds go; a
// second grey ring comes about the places of Quraysh, and glints show on the green grass.
function theSheepAndItsGrass(): SignArt {
  const zayd: [number, number] = [16, 106];
  const quraysh: [number, number][] = [
    [118, 92],
    [128, 93.2],
    [138, 92]
  ];
  const grass = [6, 22, 36, 54, 68, 98, 112, 128, 146, 156]
    .map((x, i) => tuft(x, 104 + (i % 3) * 5, i % 2 ? "#5FA344" : "#6DB24F", 5.4))
    .join("");
  const nearGrass = [44, 62, 92, 104].map((x, i) => tuft(x, 110 + (i % 2) * 2, i % 2 ? "#6DB24F" : "#5FA344", 4.6)).join("");
  return {
    kind: "the-sheep-and-its-grass",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "hills", svg: hills("#C4A87C") },
      {
        name: "the dry valley",
        svg: plainLand("#D9C49A", [
          [30, 116],
          [86, 118],
          [150, 117]
        ])
      },
      { name: "the land, wet with the water", svg: `<rect y="61" width="160" height="59" fill="#B69C6C" opacity="0.28"/>`, keys: showAt(0.54, 0.57) },
      { name: "the green that comes over the land", svg: `<rect y="61" width="160" height="59" fill="#A9CF7E" opacity="0.5"/>`, keys: showAt(0.64, 0.69) },
      { name: "homes of Makkah, far off", svg: home(124, 88, 12, 8) + home(140, 87, 14, 9) },
      { name: "Zayd ibn Amr's place", svg: someone(zayd[0], zayd[1], 1.6, ITS_VOICE), keys: showAt(0.03, 0.05) },
      { name: "the places of Quraysh, far off", svg: quraysh.map(([x, y]) => someone(x, y, 1.2, FOLK)).join(""), keys: showAt(0.15, 0.17) },
      { name: "a grey ring about the places of Quraysh", svg: greyRing(128, 92.8, 14, 3), keys: showAt(0.18, 0.2) },
      { name: "Zayd ibn Amr's voice", svg: arcs(n(zayd[0] + 3), n(zayd[1] - 1.6), ITS_VOICE), keys: showAt(0.27, 0.28), loop: speaking },
      { name: "a sheep created", svg: sheepAt(80, 108, 0.16), keys: showAt(0.39, 0.42), loop: { move: "bob", ms: 2600, y: 0.4 } },
      {
        name: "clouds",
        svg: cloud(58, 34, 0.75, "#E8EEF4") + cloud(104, 30, 0.85, "#E2E9F0"),
        keys: showWhile(0.43, 0.45, 0.77, 0.8),
        loop: { move: "slide", ms: 11000 }
      },
      ...shower("the water He sent for it: drops", 30, 112, 38, 110, showWhile(0.51, 0.53, 0.76, 0.78), { x: 30, y: 36, w: 82, h: 76 }),
      { name: "the grass grown for it", svg: grass, keys: showAt(0.65, 0.69) },
      { name: "the grass by the sheep", svg: nearGrass, keys: showAt(0.66, 0.7) },
      { name: "a second grey ring about the places of Quraysh", svg: greyRing(128, 92.8, 17, 4), keys: showAt(0.78, 0.8) },
      {
        name: "glints on the green grass",
        svg: glints(
          [
            [22, 100],
            [54, 104],
            [98, 100],
            [128, 106],
            [150, 102]
          ],
          1,
          "#FFFFFF"
        ),
        keys: showAt(0.88, 0.91),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Zayd ibn Amr used to criticize the way", from: 0.02, to: 0.13 },
      { text: "Quraysh used to slaughter their animals,", from: 0.142, to: 0.252 },
      { text: "and used to say: Allah has created", from: 0.264, to: 0.374 },
      { text: "the sheep and He has sent the water", from: 0.386, to: 0.496 },
      { text: "for it from the sky, and He has grown", from: 0.508, to: 0.618 },
      { text: "the grass for it from the earth;", from: 0.63, to: 0.74 },
      { text: "yet you slaughter it in other than", from: 0.752, to: 0.862 },
      { text: "the Name of Allah.", from: 0.874, to: 1 }
    ]
  };
}

// Two mudds of barley. Safiyyah bint Shaybah said: the Prophet ﷺ gave a banquet with two mudds of barley on marrying
// some of his wives (Sahih al-Bukhari 5172). No one is drawn: his home in Madinah among the palms, his place, a golden
// ring, by its door, and Safiyyah's place, with her voice. Two small measures of barley show by the home, one and then
// the other, with glints; a dish is set out for the banquet, and places come to it from either side. Then a warm light
// comes about his home, and a soft golden ring, with glints.
function twoMuddsOfBarley(): SignArt {
  const his: [number, number] = [74.2, 101.4];
  const safiyyah: [number, number] = [14, 108];
  const mudds: [number, number][] = [
    [100, 106],
    [110, 106]
  ];
  const feast: [number, number] = [56, 108];
  // The places that come to the banquet: where each starts, and where it sits by the dish.
  const guests: [[number, number], [number, number]][] = [
    [
      [20, 114],
      [46, 110]
    ],
    [
      [30, 118],
      [56, 113]
    ],
    [
      [120, 116],
      [66, 110]
    ]
  ];
  return {
    kind: "two-mudds-of-barley",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([
        [10, 96, 22],
        [148, 98, 22],
        [126, 92, 16]
      ]),
      { name: "his home", svg: home(76, 98, 26, 16) },
      { name: "his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Safiyyah's place", svg: someone(safiyyah[0], safiyyah[1], 1.5, ITS_VOICE) },
      { name: "Safiyyah's voice: telling of him", svg: arcs(n(safiyyah[0] + 3), n(safiyyah[1] - 1.6), ITS_VOICE), keys: showFor(0.03, 0.04, 0.24, 0.25), loop: speaking },
      ...mudds.map(([x, y], i): SignPart => ({
        name: `a mudd of barley ${i + 1}`,
        svg: bigger(measure(x, y) + heapOf(x, y, "barley"), x, y, 0.72),
        keys: showAt(at3(0.33 + i * 0.03), at3(0.35 + i * 0.03))
      })),
      { name: "glints on the barley", svg: glints(mudds.map(([x, y]) => [n(x + 0.6), n(y - 8)]), 0.9), keys: showAt(0.39, 0.41), loop: twinkle() },
      { name: "a banquet: a dish set out", svg: bigger(dish(feast[0], feast[1]), feast[0], feast[1], 1.6) + `<ellipse cx="${feast[0]}" cy="${n(feast[1] - 1.8)}" rx="4.4" ry="0.9" fill="#E2C374"/>`, keys: showAt(0.42, 0.45) },
      ...guests.map(([from, to], i): SignPart => ({
        name: `a place that comes to the banquet ${i + 1}`,
        svg: someone(from[0], from[1], 1.4, FOLK),
        keys: track({
          opacity: [
            [at3(0.45 + i * 0.02), 0],
            [at3(0.46 + i * 0.02), 1]
          ],
          xy: [
            [at3(0.46 + i * 0.02), 0, 0],
            [at3(0.54 + i * 0.02), n(to[0] - from[0]), n(to[1] - from[1])]
          ]
        })
      })),
      { name: "a warm light about his home", svg: wash(76, 92, 17, 9, WARM, 0.14), keys: showAt(0.68, 0.72), loop: soft },
      { name: "a soft golden ring about his home", svg: care(76, 99, 19, 5, SOFT_GOLD), keys: showAt(0.74, 0.78), loop: soft },
      {
        name: "glints about his home",
        svg: glints(
          [
            [60, 82],
            [76, 78],
            [92, 82],
            [66, 92],
            [88, 92]
          ],
          1,
          "#F2C94C"
        ),
        keys: showAt(0.8, 0.83),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Safiyyah bint Shaybah: he gave", from: 0.02, to: 0.3 },
      { text: "a banquet with two mudds of barley", from: 0.32, to: 0.64 },
      { text: "on marrying some of his wives.", from: 0.66, to: 1 }
    ]
  };
}

// Never missed. Aishah said: the Prophet ﷺ never missed four rak'ahs before the Zuhr prayer and two rak'ahs before the
// Fajr prayer (Sahih al-Bukhari 1182). No one is drawn: at midday in Madinah, his home by his masjid, his place, a
// golden ring, and Aishah's place, with her voice. Four sparks rise from his place, one after another, and stay; then
// a warm light comes in the masjid for the Zuhr prayer. The day ends and the night comes, with its stars, and the four
// sparks go. Then a glow comes low on the right, the dawn; two sparks rise from his place, one after the other; and a
// warm light comes in the masjid for the Fajr prayer.
function neverMissed(): SignArt {
  const his: [number, number] = [40.2, 100.8];
  const aishah: [number, number] = [16, 106];
  const sparks = (count: number, start: number, step: number, until?: [number, number]): SignPart[] =>
    Array.from({ length: count }, (_, i): SignPart => {
      const from = at3(start + i * step);
      const keys = sparkStays(from, at3(from + 0.04), 11 + (i % 2) * 2);
      if (until) {
        keys.at.push(until[0], until[1]);
        keys.opacity!.push(1, 0);
        keys.y!.push(keys.y![3], keys.y![3]);
      }
      return { name: `${count === 4 ? "before the Zuhr prayer" : "before the Fajr prayer"}: a spark rising ${i + 1}`, svg: sparkle(n(his[0] - 4.5 + i * 3), n(his[1] - 6), 1.2, "#FFE7A0"), keys, loop: twinkle() };
    });
  const NIGHT_STARS: [number, number][] = [
    [14, 12],
    [38, 24],
    [62, 10],
    [96, 16],
    [120, 8],
    [146, 22],
    [80, 32],
    [132, 40],
    [26, 44],
    [108, 36]
  ];
  return {
    kind: "never-missed",
    ms: 9000,
    parts: [
      { name: "the sky at midday", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun, high", svg: sun(80, 14), keys: { at: [0, 0.48, 0.52], opacity: [1, 1, 0] } },
      { name: "the night sky", svg: nightSky(62), keys: showWhile(0.48, 0.56, 0.68, 0.74) },
      { name: "stars of the night", svg: stars(NIGHT_STARS), keys: showWhile(0.52, 0.56, 0.7, 0.74), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
      { name: "the sky at dawn", svg: sky("#9FB6D6", "#E9D9C6", 62), keys: showAt(0.68, 0.74) },
      { name: "the dawn: a glow low on the right", svg: glow(150, 62, 18, "#FFD9A0", 0.36), keys: showAt(0.67, 0.72), loop: soft },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([
        [8, 96, 20],
        [150, 98, 22]
      ]),
      { name: "his masjid", svg: madinahMasjid(78, 102, 1) },
      { name: "his home", svg: home(42, 97, 20, 13) },
      { name: "the dark of the night over the land", svg: `<rect y="44" width="160" height="76" fill="#16284C" opacity="0.5"/>`, keys: showWhile(0.48, 0.56, 0.68, 0.74) },
      { name: "his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, ITS_VOICE) },
      { name: "Aishah's voice: telling of him", svg: arcs(n(aishah[0] + 3), n(aishah[1] - 1.6), ITS_VOICE), keys: showFor(0.025, 0.035, 0.2, 0.21), loop: speaking },
      ...sparks(4, 0.06, 0.045, [0.5, 0.54]),
      { name: "the Zuhr prayer: a warm light in the masjid", svg: wash(102, 96, 24, 6, WARM, 0.3), keys: showWhile(0.33, 0.36, 0.44, 0.47), loop: soft },
      ...sparks(2, 0.73, 0.07),
      { name: "the Fajr prayer: a warm light in the masjid", svg: wash(102, 96, 24, 6, WARM, 0.3), keys: showAt(0.87, 0.9), loop: soft }
    ],
    words: [
      { text: "Aishah: he never missed four rak'ahs", from: 0.02, to: 0.3 },
      { text: "before the Zuhr prayer and two rak'ahs", from: 0.32, to: 0.64 },
      { text: "before the Fajr prayer.", from: 0.66, to: 1 }
    ]
  };
}

/** The moon, more than half: a round of light, a shade on its left, a glow. */
const moonMoreThanHalf = (x: number, y: number, r: number) =>
  glow(x, y, n(r * 2.2), "#FFF3B8", 0.06) +
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF3B8"/>` +
  `<path d="M${x} ${n(y - r)} A${r} ${r} 0 0 0 ${x} ${n(y + r)} A${n(r * 0.45)} ${r} 0 0 1 ${x} ${n(y - r)} Z" fill="#16284C" opacity="0.78"/>`;

// The weak go early. Ibn Abbas said: I was among those whom the Prophet ﷺ sent on the night of Muzdalifah early,
// being among the weak members of his family (Sahih al-Bukhari 1678). No one is drawn: at night on the plain of
// Muzdalifah, under the stars and the moon, the places of the pilgrims rest; his place, a golden ring, and by it the
// places of the weak of his family, with Ibn Abbas's place among them. Ibn Abbas's voice speaks, and his. The places of
// the weak set off along the road to the right, early, while the others rest; a soft golden ring and a warm light come
// about them on their way, and the way ahead of them lights up.
function theWeakGoEarly(): SignArt {
  const his: [number, number] = [58, 101.4];
  const weak: [number, number][] = [
    [66, 104.4],
    [70.4, 101.6],
    [74.4, 105],
    [78.4, 102]
  ];
  const ibnAbbas: [number, number] = [71, 107.4];
  const resting: [number, number][] = [
    [18, 92],
    [30, 95],
    [42, 91],
    [12, 104],
    [26, 108],
    [40, 104],
    [20, 114],
    [36, 116],
    [50, 112],
    [48, 96],
    [86, 112],
    [100, 116],
    [104, 108],
    [92, 92],
    [110, 96]
  ];
  // The road to the right, and how far along it the weak go.
  const go: [number, number, number][] = [
    [0.34, 0, 0],
    [0.46, 30, -5],
    [0.58, 60, -10]
  ];
  const moving = (from: number, to: number): SignKeys =>
    track({
      opacity: [
        [0, 1],
        [from, 1]
      ],
      xy: go.map(([time, x, y]) => [at3(from + ((time - 0.34) * (to - from)) / 0.24), x, y])
    });
  const NIGHT_STARS: [number, number][] = [
    [14, 12],
    [62, 10],
    [96, 16],
    [120, 8],
    [146, 22],
    [80, 32],
    [132, 40],
    [26, 44],
    [108, 36],
    [8, 30]
  ];
  return {
    kind: "the-weak-go-early",
    ms: 9000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      { name: "stars of the night", svg: stars(NIGHT_STARS), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
      { name: "the moon", svg: moonMoreThanHalf(40, 22, 4.2) },
      { name: "hills by night", svg: hills("#2C3A5C") },
      {
        name: "the plain of Muzdalifah",
        svg: nightLand("#3A4766", [
          [60, 117],
          [120, 116],
          [150, 112]
        ])
      },
      { name: "the road on from the plain", svg: way("M80 104 Q112 98 160 92", "#9C916F", 1) },
      { name: "the places of the pilgrims, resting", svg: resting.map(([x, y]) => someone(x, y, 1.3, LIGHT)).join(""), loop: { move: "twinkle", ms: 2600, low: 0.7 } },
      { name: "his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 3), n(ibnAbbas[1] - 1.6), LIGHT), keys: showFor(0.03, 0.04, 0.2, 0.21), loop: speaking },
      { name: "his voice: sending them early", svg: arcs(n(his[0] + 3), n(his[1] - 1.6), GOLD), keys: showFor(0.12, 0.13, 0.24, 0.25), loop: speaking },
      ...weak.map(([x, y], i): SignPart => ({ name: `the place of one of the weak of his family ${i + 1}`, svg: someone(x, y, 1.2, LIGHT), keys: moving(at3(0.34 + i * 0.006), at3(0.58 - (3 - i) * 0.006)) })),
      { name: "Ibn Abbas's place, among them", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.1, "#FFE7A0"), keys: moving(0.344, 0.58) },
      { name: "a soft golden ring about the weak, on their way", svg: care(132, 94, 12, 4.4, SOFT_GOLD), keys: showAt(0.68, 0.72), loop: soft },
      { name: "a warm light about them", svg: wash(132, 94, 12, 5, WARM, 0.16), keys: showAt(0.73, 0.77), loop: soft },
      { name: "the way ahead of them, lit", svg: way("M144 90.4 Q152 89 160 88", "#FFE7A0", 1), keys: showAt(0.8, 0.84), loop: soft }
    ],
    words: [
      { text: "Ibn Abbas: I was among those whom he sent", from: 0.02, to: 0.3 },
      { text: "on the night of Muzdalifah early", from: 0.32, to: 0.64 },
      { text: "among the weak members of his family.", from: 0.66, to: 1 }
    ]
  };
}

export const SNOW_ART = {
  "washed-with-snow-and-hail": washedWithSnowAndHail,
  "columns-of-gold-and-silver": columnsOfGoldAndSilver,
  "the-sun-and-the-moon-folded-up": theSunAndTheMoonFoldedUp,
  "the-sheep-and-its-grass": theSheepAndItsGrass,
  "two-mudds-of-barley": twoMuddsOfBarley,
  "never-missed": neverMissed,
  "the-weak-go-early": theWeakGoEarly
};
