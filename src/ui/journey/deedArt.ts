import { animalAt, cloud, flame, glow, n, nightSky, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, sack, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { quickSparks, track } from "./toldArt";

/**
 * Good deeds and lessons the Prophet ﷺ taught with a picture, drawn as his likenesses are (likenessArt.ts,
 * exampleArt.ts): the camel lost in the desert and found again, the hole one is not stung from twice, the doors of
 * good, the square and the line he ﷺ drew, the soup with more water for the neighbors, and the charity owed for every
 * joint. Only the land, the sky, homes, things, plants and animals are drawn. No Prophet and no person is ever drawn,
 * not even a hand: where someone went, a dashed way shows it, and a voice is arcs in the air. Nothing is drawn for
 * Allah, and nothing comes down from the sky: a good deed is sparks rising.
 */

/** A small sun, its middle at (x, y). */
const sun = (x: number, y: number) => `${glow(x, y, 10, "#FFF0C0", 0.12)}<circle cx="${x}" cy="${y}" r="4.6" fill="#FFE07A"/>`;

/** The camel of the animal cards with a saddle cloth, a bag of food and a water skin on it; set as animalAt sets it. */
function packedCamel(x: number, y: number, s: number, left = false) {
  const packs =
    `<path d="M31 33 C35 24 49 22 55 33 L53 39 L33 39 Z" fill="#B5523B"/><path d="M33 38.6 L53 38.6" stroke="#E9C46A" stroke-width="1.4"/>` +
    `<path d="M29 38 L38.6 38 L39.6 49.6 C36 51.6 32 51.6 28.4 49.6 Z" fill="#C9A66B"/><path d="M29.4 41.4 L38.8 41.4" stroke="#7A5A30" stroke-width="1"/>` +
    `<ellipse cx="50.6" cy="45.4" rx="5" ry="6.2" fill="#7A4E2A"/><path d="M50.6 39.4 L50.6 36.4" stroke="#5E3A1E" stroke-width="1.8" stroke-linecap="round"/>` +
    `<ellipse cx="49" cy="43.4" rx="1.6" ry="2.6" fill="#9A6A3E"/>`;
  return animalAt("camel", x, y, s, left) + `<g transform="translate(${left ? n(x + 100 * s) : x} ${y}) scale(${left ? -s : s} ${s})">${packs}</g>`;
}

// The camel lost in the desert. The Prophet ﷺ said: Allah is more pleased with the repentance of His servant than one
// of you would be who was on his camel in a barren desert, and it ran off from him with his food and his drink; he
// lost hope of it, came to a tree and lay down in its shade, having lost hope of his camel; and then there it was,
// standing by him (Sahih Muslim 2747). No one is drawn: a dashed way comes with the camel, looks for it in loops, and
// lies down in the tree's shade; the camel comes back and stands by it, and gladness rises as sparks.
function lostCamel(): SignArt {
  const s = 0.3;
  const feet = { x: 48, y: 98 };
  const tree =
    `<ellipse cx="122" cy="95" rx="17" ry="3.2" fill="#000000" opacity="0.14"/>` +
    `<path d="M123 95 L124 80 M124 85 L117 76 M124 82.6 L131 75" stroke="#7A5634" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<ellipse cx="124" cy="73" rx="19" ry="5.6" fill="#6C9A44"/><ellipse cx="119" cy="71" rx="11" ry="3.6" fill="#80AE52"/><ellipse cx="131" cy="72" rx="7" ry="2.6" fill="#5E8C3A"/>`;
  return {
    kind: "lost-camel",
    ms: 12000,
    parts: [
      { name: "the desert sky", svg: sky("#CFE6F2", "#EAD7AA", 60) },
      {
        name: "the sun, high over the desert",
        svg: sun(40, 34),
        keys: track({
          xy: [
            [0.38, 0, 0],
            [0.47, 36, -8]
          ]
        })
      },
      {
        name: "dunes",
        svg: peaks(
          [
            [20, 9, 32],
            [80, 13, 40],
            [142, 10, 34]
          ],
          61,
          "#E4C68C",
          false
        )
      },
      {
        name: "the sand",
        svg: landOf(
          [
            [14, 72],
            [62, 76],
            [100, 70],
            [148, 78],
            [30, 106],
            [86, 110],
            [150, 104]
          ],
          "#EBD3A0"
        )
      },
      { name: "a lone tree, with its shade", svg: tree, loop: { move: "sway", ms: 4200, angle: 1.2 }, origin: { x: 124, y: 95 } },
      { name: "a way, with the camel", svg: way("M0 101 C12 100.4 24 99.6 38 99.4", BROWN), keys: showFrom(0.04, 0.1) },
      {
        name: "a camel, carrying food and drink",
        svg: packedCamel(n(feet.x - 50 * s), n(feet.y - 73.4 * s), s),
        origin: feet,
        keys: track({
          xy: [
            [0.02, -60, 0],
            [0.1, 0, 0],
            [0.2, 0, 0],
            [0.3, -100, -4],
            [0.6, -100, -4],
            [0.61, -70, 0],
            [0.7, -70, 0],
            [0.8, 50, -2]
          ],
          opacity: [
            [0.02, 0],
            [0.024, 1],
            [0.29, 1],
            [0.3, 0],
            [0.7, 0],
            [0.704, 1]
          ],
          scaleX: [
            [0.2, 1],
            [0.204, -1],
            [0.6, -1],
            [0.61, 1]
          ]
        }),
        loop: { move: "bob", ms: 1800, y: -0.5 }
      },
      { name: "a way, looking for it, part 1", svg: way("M38 99.4 C30 95 20 93 16 88", BROWN), keys: showFrom(0.37, 0.41) },
      { name: "a way, looking for it, part 2", svg: way("M16 88 C24 82 44 82 58 88", BROWN), keys: showFrom(0.41, 0.45) },
      { name: "a way, looking for it, part 3", svg: way("M58 88 C70 94 86 97 98 94", BROWN), keys: showFrom(0.45, 0.49) },
      { name: "a way, to the shade of the tree", svg: way("M98 94 C104 92 110 93 114 94.6", BROWN), keys: showFrom(0.55, 0.59) },
      { name: "a way, lying down in the shade", svg: way("M114 94.6 C116 96.4 124 96.6 129 95.4", BROWN, 0.9), keys: showFrom(0.6, 0.63) },
      { name: "gladness over the tree", svg: glow(118, 86, 24, "#FFE7A0", 0.06), keys: showFrom(0.86, 0.9) },
      ...risingSparks(
        "gladness, rising",
        [
          [110, 82],
          [119, 77],
          [128, 80],
          [114, 72]
        ],
        0.87,
        0.015,
        { stay: true, rise: 14 }
      )
    ],
    words: [
      { text: "A man in a desert, with his camel", from: 0.02, to: 0.16 },
      { text: "It ran off, with his food and drink", from: 0.18, to: 0.34 },
      { text: "He looked for it, and lost hope", from: 0.36, to: 0.52 },
      { text: "He lay down in the shade of a tree", from: 0.54, to: 0.68 },
      { text: "Then there it was, standing by him", from: 0.7, to: 0.84 },
      { text: "Allah is more pleased when we repent", from: 0.86, to: 1 }
    ]
  };
}

// Not stung twice. The Prophet ﷺ said: a believer is not stung from the same hole twice (Sahih al-Bukhari 6133). No
// one is drawn: a scorpion looks out of a hole in the rocks; a dashed way comes near it and is stung, and goes back;
// the hole is marked in the mind; then a new way passes far from it, and the scorpion comes out to find nothing.
function stungTwice(): SignArt {
  const sx = 0.16;
  const rocks =
    `<path d="M70 100 C68 88 79 78 94 78 C108 78 119 87 121 100 Z" fill="#9B8B74"/>` +
    `<path d="M94 78 C108 78 119 87 121 100 L104 100 C106 92 102 84 94 78 Z" fill="#000000" opacity="0.12"/>` +
    `<path d="M78 86 C82 82 88 80 92 80" stroke="#B7A78D" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="88" cy="95.4" rx="4.6" ry="3.2" fill="#2E2A26"/>` +
    `<ellipse cx="128" cy="99" rx="5" ry="2.4" fill="#8E7E68"/><ellipse cx="62" cy="100.4" rx="3.6" ry="1.8" fill="#8E7E68"/>`;
  return {
    kind: "stung-twice",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E8D6AE", 60) },
      { name: "the sun", svg: sun(132, 32) },
      { name: "clouds", svg: cloud(40, 36, 0.45, "#FFFFFF", 0.9) + cloud(94, 30, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [26, 10, 32],
            [96, 14, 40],
            [150, 9, 26]
          ],
          61,
          "#C9B38C",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [14, 70],
          [58, 74],
          [130, 70],
          [20, 108],
          [140, 108]
        ])
      },
      { name: "the rocks, with a hole", svg: rocks },
      {
        name: "a scorpion in the hole",
        svg: animalAt("scorpion", n(80 - 50 * sx), n(98 - 52 * sx), sx, true),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.055, 1],
            [0.12, 1],
            [0.125, 0],
            [0.24, 0],
            [0.245, 1],
            [0.3, 1],
            [0.305, 0],
            [0.62, 0],
            [0.625, 1],
            [0.68, 1],
            [0.685, 0]
          ],
          xy: [
            [0.05, 8, 0],
            [0.08, 0, 0],
            [0.11, 0, 0],
            [0.125, 8, 0],
            [0.24, 8, 0],
            [0.26, -2, 0],
            [0.29, -2, 0],
            [0.305, 8, 0],
            [0.62, 8, 0],
            [0.645, 0, 0],
            [0.665, 0, 0],
            [0.685, 8, 0]
          ]
        })
      },
      { name: "a way, coming near the hole", svg: way("M0 104 C24 103 50 101 77 98.4", BROWN), keys: showFrom(0.17, 0.23) },
      {
        name: "the sting",
        svg: sparkle(77, 97.6, 2.8, "#E2483C") + `<circle cx="77" cy="97.6" r="4.6" fill="#E2483C" opacity="0.2"/>`,
        keys: showWhile(0.26, 0.265, 0.285, 0.29)
      },
      { name: "a way, going back from it", svg: way("M77 98.4 C64 94.6 48 93.6 30 95.4", BROWN), keys: showFrom(0.27, 0.31) },
      {
        name: "the hole, kept in mind",
        svg: `<ellipse cx="88" cy="95.4" rx="9" ry="6.4" stroke="#E2483C" stroke-width="0.9" stroke-dasharray="1.6 1.6" fill="none"/>`,
        keys: showFrom(0.38, 0.42),
        loop: { move: "twinkle", ms: 1300, low: 0.45 }
      },
      { name: "a new way, far from the hole, part 1", svg: way("M0 109 C20 109 40 108.6 60 107.4", BROWN), keys: showFrom(0.55, 0.59) },
      { name: "a new way, far from the hole, part 2", svg: way("M60 107.4 C78 106 104 106 122 107.4 C134 108.4 146 109 160 109", BROWN), keys: showFrom(0.59, 0.64) },
      ...risingSparks(
        "a lesson learned, rising",
        [
          [136, 104],
          [145, 100],
          [128, 100]
        ],
        0.76,
        0.02,
        { stay: true, rise: 12 }
      )
    ],
    words: [
      { text: "There is a hole in the rocks", from: 0.02, to: 0.14 },
      { text: "One came near it, and was stung", from: 0.16, to: 0.34 },
      { text: "A believer is not stung", from: 0.36, to: 0.52 },
      { text: "From the same hole twice", from: 0.54, to: 0.72 },
      { text: "He learns, and keeps away from it", from: 0.74, to: 1 }
    ]
  };
}

// The doors of good. The Prophet ﷺ said to Mu'adh: shall I not tell you the doors of good? Fasting is a shield;
// charity puts out sins as water puts out fire; and a man's prayer deep in the night (Jami at-Tirmidhi 2616). No one is
// drawn: three doors in a wall open one by one, on a shield, on a fire that a gift dims and water puts out, and, when
// night comes, on a lamp and a voice praying, with sparks rising.
function doorsOfGood(): SignArt {
  const doors = [36, 80, 124];
  const top = 70;
  const w = 22;
  const h = 32;
  const wall =
    `<rect x="4" y="58" width="152" height="46" fill="#D9B98A"/><rect x="2" y="55.6" width="156" height="3" fill="#C29E6C"/>` +
    `<path d="M4 104 L156 104" stroke="#B48F5E" stroke-width="0.8"/>` +
    doors
      .map(
        (x) =>
          `<path d="M${x - 13} ${top} L${x - 13} ${top - 3} Q${x} ${top - 12} ${x + 13} ${top - 3} L${x + 13} ${top} Z" fill="#C7A472"/>` +
          `<path d="M${x - 11} ${top - 1} Q${x} ${top - 9.6} ${x + 11} ${top - 1}" stroke="#A9855A" stroke-width="0.8" fill="none"/>` +
          `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${h}" fill="#3E2C1E"/>`
      )
      .join("");
  const door = (x: number) =>
    `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${h}" fill="#8A5A33"/>` +
    `<path d="M${x - 5.5} ${top} L${x - 5.5} ${top + h} M${x} ${top} L${x} ${top + h} M${x + 5.5} ${top} L${x + 5.5} ${top + h}" stroke="#74482A" stroke-width="0.7"/>` +
    `<path d="M${x - w / 2} ${top + 8} L${x + w / 2} ${top + 8} M${x - w / 2} ${top + h - 8} L${x + w / 2} ${top + h - 8}" stroke="#5E3A1E" stroke-width="1.2"/>` +
    `<circle cx="${x + 6.6}" cy="${top + h / 2}" r="1.5" fill="none" stroke="#E9C46A" stroke-width="0.8"/>`;
  const opening = (x: number, from: number) => ({
    origin: { x: x - w / 2, y: top + h / 2 },
    keys: track({
      scaleX: [
        [from, 1],
        [from + 0.05, 0.08]
      ]
    })
  });
  const shield =
    `<circle cx="36" cy="86" r="8.4" fill="#C9A13B"/><circle cx="36" cy="86" r="6.4" fill="#E0BC52"/>` +
    `<circle cx="36" cy="86" r="6.4" fill="none" stroke="#9C7A24" stroke-width="0.7"/><circle cx="36" cy="86" r="1.8" fill="#9C7A24"/>` +
    `<path d="M36 79.6 L36 92.4 M29.6 86 L42.4 86" stroke="#9C7A24" stroke-width="0.6" opacity="0.6"/>`;
  const logs = `<path d="M72 101 L88 97.6 M72 97.6 L88 101" stroke="#6E4A2C" stroke-width="2" stroke-linecap="round"/>`;
  const jug =
    `<path d="M-4 5 C-6.4 -1 -3.4 -5.4 -2 -6.6 L2 -6.6 C3.4 -5.4 6.4 -1 4 5 Z" fill="#B86E3E"/>` +
    `<path d="M-2 -6.6 L-4.8 -8.4 L-2.4 -5.4 Z" fill="#B86E3E"/><path d="M3.6 -4 C7 -3.6 7 1.4 4.4 2.2" stroke="#8E5028" stroke-width="1" fill="none"/>` +
    `<path d="M-3.6 -1 L3.6 -1" stroke="#E9C46A" stroke-width="0.6"/>`;
  const lamp =
    `<path d="M118 99 C118 95.4 130 95.4 130 99 Z" fill="#B86E3E"/><path d="M128.6 97 L132 96" stroke="#B86E3E" stroke-width="1.4" stroke-linecap="round"/>` +
    flame(132.2, 96.2, 3.4);
  return {
    kind: "doors-of-good",
    ms: 12000,
    parts: [
      { name: "the sky by day", svg: sky("#BFE3FA", "#E9D7AF", 60) },
      { name: "the sun", svg: sun(142, 30) },
      { name: "clouds", svg: cloud(40, 34, 0.45, "#FFFFFF", 0.9) + cloud(102, 28, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the night, coming", svg: nightSky(60) + `<rect y="104" width="160" height="16" fill="#7E7768"/>`, keys: showFrom(0.73, 0.8) },
      {
        name: "stars",
        svg: stars([
          [14, 22],
          [34, 40],
          [58, 26],
          [76, 44],
          [98, 20],
          [116, 38],
          [140, 24],
          [150, 46]
        ]),
        keys: showFrom(0.78, 0.82),
        loop: { move: "twinkle", ms: 2600, low: 0.5 }
      },
      { name: "a crescent moon", svg: crescent(128, 36, 5, 2.4, "#FFF4C2"), keys: showFrom(0.76, 0.8) },
      { name: "the wall, with three doors", svg: wall },
      { name: "a shield, behind the first door", svg: shield },
      { name: "the shield, shining", svg: sparkle(41.6, 80.6, 1.8, "#FFFFFF") + sparkle(30.4, 91, 1.3, "#FFFFFF"), keys: showFrom(0.24, 0.27), loop: { move: "twinkle", ms: 1100, low: 0.35 } },
      { name: "logs, behind the second door", svg: logs },
      {
        name: "a fire, burning",
        svg: flame(80, 99, 15),
        origin: { x: 80, y: 99 },
        keys: track({
          scale: [
            [0.45, 1],
            [0.49, 0.6],
            [0.58, 0.6],
            [0.64, 0.02]
          ],
          opacity: [
            [0.63, 1],
            [0.64, 0]
          ]
        }),
        loop: { move: "sway", ms: 900, angle: 4 }
      },
      { name: "a coin, given", svg: `<circle cx="66" cy="99" r="2" fill="#E9C46A" stroke="#B8892A" stroke-width="0.5"/>`, keys: showWhile(0.43, 0.45, 0.47, 0.48) },
      ...quickSparks(
        "the gift, rising",
        [
          [66, 96],
          [70, 92]
        ],
        0.44,
        0.01
      ),
      {
        name: "a jug, pouring water",
        svg: `<g transform="translate(90 82)">${jug}</g>`,
        origin: { x: 90, y: 87 },
        keys: track({
          opacity: [
            [0.55, 0],
            [0.56, 1],
            [0.65, 1],
            [0.67, 0]
          ],
          rotate: [
            [0.56, 0],
            [0.58, -62]
          ]
        })
      },
      {
        name: "water, poured on the fire",
        svg: `<path d="M76.4 86 C77 89.6 78 93 79 97" stroke="#6FB7E8" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M77.2 86.4 C77.8 89.8 78.6 92.8 79.4 96" stroke="#BFE3FA" stroke-width="0.6" fill="none"/>`,
        keys: showWhile(0.58, 0.59, 0.64, 0.65)
      },
      {
        name: "smoke, as it goes out",
        svg: `<path d="M78 94 c-2 -3 2 -5 0 -8 c-2 -3 2 -5 0 -8" stroke="#B9B4AC" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.8"/><path d="M83 95 c-1.6 -2.4 1.6 -4 0 -6.4" stroke="#CFCAC2" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.7"/>`,
        keys: showFrom(0.62, 0.65),
        loop: { move: "bob", ms: 2200, y: -1.6 }
      },
      { name: "the third door's room, in the night", svg: `<rect x="113" y="70" width="22" height="32" fill="#1C2A4A"/>` },
      { name: "a lamp, lit", svg: lamp, loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a voice, praying deep in the night", svg: arcs(117, 85, "#FFF3CF"), keys: showFrom(0.8, 0.82), loop: { move: "twinkle", ms: 1500, low: 0.45 } },
      { name: "the first door", svg: door(36), ...opening(36, 0.19) },
      { name: "the second door", svg: door(80), ...opening(80, 0.37) },
      { name: "the third door", svg: door(124), ...opening(124, 0.74) },
      {
        name: "the night over the wall",
        svg: `<path d="M2 55.6 H158 V104 H2 Z M113 70 V102 H135 V70 Z" fill-rule="evenodd" fill="#0F1C3A" opacity="0.42"/>`,
        keys: showFrom(0.73, 0.8)
      },
      { name: "the doors, glowing", svg: doors.map((x) => glow(x, 86, 16, "#FFE7A0", 0.05)).join(""), keys: showWhile(0.04, 0.08, 0.14, 0.16) },
      ...risingSparks(
        "the prayer, rising",
        [
          [120, 80],
          [128, 76],
          [124, 70],
          [131, 66]
        ],
        0.83,
        0.02,
        { stay: true, rise: 12 }
      )
    ],
    words: [
      { text: "Shall I tell you the doors of good?", from: 0.02, to: 0.16 },
      { text: "Fasting is a shield", from: 0.18, to: 0.34 },
      { text: "Charity puts out sins", from: 0.36, to: 0.52 },
      { text: "As water puts out fire", from: 0.54, to: 0.7 },
      { text: "And prayer deep in the night", from: 0.72, to: 1 }
    ]
  };
}

// The square and the line. The Prophet ﷺ drew a square, and a line in the middle going out of it, and small lines
// beside the middle one, and said: this is the person, and this his term all around him; this going out is his hope;
// and these small lines are the troubles: if one misses him, another bites him (Sahih al-Bukhari 6417). Only the lines
// are drawn, on the ground, appearing as they were drawn; then the square, the line going out, and the small lines
// shine in turn as each is told.
function squareAndLine(): SignArt {
  const groove = (d: string) => `<path d="${d}" stroke="#A9865A" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#F4E3BE" stroke-width="0.5" fill="none" stroke-linecap="round" transform="translate(0.5 0.6)"/>`;
  const drawn = (name: string, d: string, origin: { x: number; y: number }, axis: "scaleX" | "scaleY", from: number, to: number): SignPart => ({
    name,
    svg: groove(d),
    origin,
    keys: track({
      opacity: [
        [from, 0],
        [from + 0.004, 1]
      ],
      ...(axis === "scaleX"
        ? {
            scaleX: [
              [from, 0.02],
              [to, 1]
            ]
          }
        : {
            scaleY: [
              [from, 0.02],
              [to, 1]
            ]
          })
    })
  });
  const small: [number, number, number][] = [
    [66, 50, 61],
    [72, 82, 71],
    [78, 50, 61],
    [84, 82, 71],
    [90, 50, 61],
    [96, 82, 71]
  ];
  const pebbles = [
    [18, 30, 1.6],
    [140, 22, 1.2],
    [26, 98, 1.4],
    [132, 96, 1.8],
    [150, 74, 1.1],
    [12, 66, 1.2],
    [116, 108, 1.3]
  ]
    .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.7)}" fill="#C9AE7E"/>`)
    .join("");
  return {
    kind: "square-and-line",
    ms: 11000,
    parts: [
      { name: "the ground", svg: `<rect width="160" height="120" fill="#E8D2A2"/>` + pebbles },
      {
        name: "the shade of a palm",
        svg: `<path d="M0 0 L36 0 C30 8 20 12 10 14 C18 18 10 26 0 28 Z" fill="#000000" opacity="0.08"/><path d="M160 120 L130 120 C134 112 144 106 160 104 Z" fill="#000000" opacity="0.06"/>`,
        loop: { move: "sway", ms: 5000, angle: 1 },
        origin: { x: 0, y: 0 }
      },
      drawn("the square: its top", "M50 40 L102 40", { x: 50, y: 40 }, "scaleX", 0.03, 0.06),
      drawn("the square: its right side", "M102 40 L102 92", { x: 102, y: 40 }, "scaleY", 0.06, 0.09),
      drawn("the square: its bottom", "M102 92 L50 92", { x: 102, y: 92 }, "scaleX", 0.09, 0.12),
      drawn("the square: its left side", "M50 92 L50 40", { x: 50, y: 92 }, "scaleY", 0.12, 0.15),
      drawn("the line in the middle, inside the square", "M58 66 L102 66", { x: 58, y: 66 }, "scaleX", 0.21, 0.26),
      drawn("the line going out of the square", "M102 66 L136 66", { x: 102, y: 66 }, "scaleX", 0.26, 0.31),
      ...small.map(([x, from, to], i) =>
        drawn(`a small line beside it ${i + 1}`, `M${x} ${from} L${x} ${to}`, { x, y: from }, "scaleY", Number((0.37 + i * 0.015).toFixed(3)), Number((0.385 + i * 0.015).toFixed(3)))
      ),
      {
        name: "the lifetime, all around inside the square",
        svg: `<rect x="51" y="41" width="50" height="50" fill="#FFE7A0" opacity="0.45"/>`,
        keys: showFrom(0.53, 0.57)
      },
      {
        name: "the hope, going out, shining",
        svg: `<path d="M102 66 L136 66" stroke="#F2B53A" stroke-width="2.4" stroke-linecap="round"/>` + sparkle(139.4, 66, 2.6, "#FFE7A0"),
        keys: showFrom(0.69, 0.72),
        loop: { move: "twinkle", ms: 1200, low: 0.55 }
      },
      ...small.map(
        ([x, from, to], i): SignPart => ({
          name: `a trouble, coming ${i + 1}`,
          svg: `<path d="M${x} ${from} L${x} ${to}" stroke="#D9534F" stroke-width="1.9" stroke-linecap="round"/>`,
          keys: track({
            opacity: [
              [0.85 + (i % 3) * 0.01, 0],
              [0.87 + (i % 3) * 0.01, 1]
            ],
            xy: [
              [0.88, 0, 0],
              [0.92, 0, from < to ? 2 : -2]
            ]
          }),
          loop: { move: "twinkle", ms: 1000, low: 0.6, phase: i / small.length }
        })
      )
    ],
    words: [
      { text: "A square, drawn on the ground", from: 0.02, to: 0.18 },
      { text: "And a line through it, going out", from: 0.2, to: 0.34 },
      { text: "And small lines beside it", from: 0.36, to: 0.5 },
      { text: "The square is our lifetime", from: 0.52, to: 0.66 },
      { text: "The line going out is our hope", from: 0.68, to: 0.82 },
      { text: "The small lines are troubles", from: 0.84, to: 1 }
    ]
  };
}

// More water in the soup. Abu Dharr said: my dear friend ﷺ advised me: when you cook a soup, add more water to it,
// then look to a household of your neighbors, and give them some of it kindly (Sahih Muslim 2625b). No one is drawn: a
// pot cooks on a fire before a home; a jug pours more water into it; the homes on each side are looked to, and two
// bowls of it go along dashed ways to them, and their windows light up, with sparks rising.
function moreWater(): SignArt {
  const pot =
    `<path d="M69.6 95 C69.6 106 90.4 106 90.4 95 Z" fill="#6E4A2C"/><ellipse cx="80" cy="95" rx="10.6" ry="2.3" fill="#5A3A20"/>` +
    `<path d="M71 99 C76 101 84 101 89 99" stroke="#8A6040" stroke-width="0.7" fill="none"/>` +
    `<ellipse cx="72" cy="105.6" rx="2.4" ry="1.4" fill="#8E7E68"/><ellipse cx="88" cy="105.6" rx="2.4" ry="1.4" fill="#8E7E68"/>`;
  const jug =
    `<path d="M-4 5 C-6.4 -1 -3.4 -5.4 -2 -6.6 L2 -6.6 C3.4 -5.4 6.4 -1 4 5 Z" fill="#B86E3E"/>` +
    `<path d="M-2 -6.6 L-4.8 -8.4 L-2.4 -5.4 Z" fill="#B86E3E"/><path d="M3.6 -4 C7 -3.6 7 1.4 4.4 2.2" stroke="#8E5028" stroke-width="1" fill="none"/>` +
    `<path d="M-3.6 -1 L3.6 -1" stroke="#E9C46A" stroke-width="0.6"/>`;
  const bowl = (x: number, y: number) =>
    `<path d="M${n(x - 4.4)} ${n(y - 1.6)} C${n(x - 4)} ${n(y + 2.6)} ${n(x + 4)} ${n(y + 2.6)} ${n(x + 4.4)} ${n(y - 1.6)} Z" fill="#E9D8B4"/>` +
    `<ellipse cx="${x}" cy="${n(y - 1.6)}" rx="4.4" ry="1" fill="#C98A3C"/>` +
    `<path d="M${n(x - 1)} ${n(y - 3)} c-0.8 -1 0.8 -2 0 -3" stroke="#FFFFFF" stroke-width="0.6" fill="none" opacity="0.8"/>`;
  const lit = (x: number) => `<rect x="${n(x + 2)}" y="${n(90 - 19 + 2.4)}" width="2.6" height="2.6" fill="#FFD66B"/>`;
  return {
    kind: "more-water",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: sun(140, 30) },
      { name: "clouds", svg: cloud(36, 36, 0.45, "#FFFFFF", 0.9) + cloud(100, 30, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [30, 9, 30],
            [92, 13, 36],
            [150, 8, 26]
          ],
          61,
          "#D8C7A0",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [10, 70],
          [60, 72],
          [110, 70],
          [150, 74],
          [6, 108],
          [150, 110]
        ])
      },
      { name: "the home where it is cooked", svg: home(80, 86, 34, 22) },
      { name: "the home on the left", svg: home(24, 90, 28, 19, "#CFA66F", "#B88A58") },
      { name: "the home on the right", svg: home(136, 90, 28, 19, "#CFA66F", "#B88A58") },
      { name: "the cooking fire", svg: flame(75, 108.4, 6) + flame(80, 108.6, 7) + flame(85, 108.4, 6), keys: showFrom(0.03, 0.06), loop: { move: "sway", ms: 800, angle: 4 }, origin: { x: 80, y: 108 } },
      { name: "a pot on the stones", svg: pot },
      {
        name: "the soup in it",
        svg: `<ellipse cx="80" cy="95.6" rx="9.2" ry="1.7" fill="#C98A3C"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.07, 1]
          ],
          xy: [
            [0.27, 0, 0],
            [0.32, 0, -0.7]
          ]
        })
      },
      {
        name: "steam, rising",
        svg: `<path d="M76 92 c-1.6 -2.4 1.6 -4 0 -6.4 c-1.6 -2.4 1.6 -4 0 -6.4" stroke="#FFFFFF" stroke-width="1" fill="none" opacity="0.85" stroke-linecap="round"/><path d="M84 92 c-1.6 -2.4 1.6 -4 0 -6.4" stroke="#FFFFFF" stroke-width="1" fill="none" opacity="0.85" stroke-linecap="round"/>`,
        origin: { x: 80, y: 92 },
        keys: track({
          opacity: [
            [0.08, 0],
            [0.12, 1]
          ],
          scale: [
            [0.3, 1],
            [0.34, 1.35]
          ]
        }),
        loop: { move: "bob", ms: 2000, y: -1.4 }
      },
      {
        name: "a jug, pouring in more water",
        svg: `<g transform="translate(93 84)">${jug}</g>`,
        origin: { x: 93, y: 89 },
        keys: track({
          opacity: [
            [0.21, 0],
            [0.23, 1],
            [0.38, 1],
            [0.4, 0]
          ],
          rotate: [
            [0.23, 0],
            [0.26, -64],
            [0.32, -64],
            [0.34, 0]
          ]
        })
      },
      {
        name: "more water, poured in",
        svg: `<path d="M79 88 C79 90.6 79.4 92.6 79.6 95" stroke="#6FB7E8" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
        keys: showWhile(0.26, 0.27, 0.31, 0.32)
      },
      {
        name: "the homes next door, looked to",
        svg: [24, 136].map((x) => `<ellipse cx="${x}" cy="80.6" rx="18" ry="13.4" stroke="#F2B53A" stroke-width="0.9" stroke-dasharray="1.6 1.6" fill="none"/>`).join(""),
        keys: showWhile(0.41, 0.45, 0.74, 0.76),
        loop: { move: "twinkle", ms: 1300, low: 0.45 }
      },
      { name: "a way to the home on the left", svg: way("M61 106.6 C50 106.6 36 101 26 91.4", BROWN), keys: showFrom(0.6, 0.7) },
      { name: "a way to the home on the right", svg: way("M99 106.6 C110 106.6 124 101 134 91.4", BROWN), keys: showFrom(0.62, 0.72) },
      {
        name: "a bowl of it, for the home on the left",
        svg: bowl(62, 105),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.52, 1],
            [0.72, 1],
            [0.74, 0]
          ],
          xy: [
            [0.6, 0, 0],
            [0.72, -38, -13]
          ]
        })
      },
      {
        name: "a bowl of it, for the home on the right",
        svg: bowl(98, 105),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.52, 1],
            [0.74, 1],
            [0.76, 0]
          ],
          xy: [
            [0.62, 0, 0],
            [0.74, 38, -13]
          ]
        })
      },
      { name: "their windows, lit", svg: lit(24) + lit(136), keys: showFrom(0.76, 0.79) },
      { name: "warmth in the homes on each side", svg: glow(24, 82, 18, "#FFE7A0", 0.06) + glow(136, 82, 18, "#FFE7A0", 0.06), keys: showFrom(0.75, 0.8) },
      ...risingSparks(
        "kindness, rising",
        [
          [22, 66],
          [30, 62],
          [134, 66],
          [142, 62]
        ],
        0.8,
        0.02,
        { stay: true, rise: 10 }
      )
    ],
    words: [
      { text: "When you cook a soup", from: 0.02, to: 0.18 },
      { text: "Add more water to it", from: 0.2, to: 0.38 },
      { text: "Then look to your neighbors' homes", from: 0.4, to: 0.56 },
      { text: "And give them some of it, kindly", from: 0.58, to: 1 }
    ]
  };
}

// A charity for every joint. The Prophet ﷺ said: every joint of a person owes a charity each day the sun rises:
// judging fairly between two is a charity; helping someone with his ride, lifting him or his load onto it, is a
// charity; a good word is a charity; every step to the prayer is a charity; and removing harm from the road is a
// charity (Sahih Muslim 1009, and most of it in Sahih al-Bukhari 2989). No one is drawn: the sun rises; a balance tips and comes level; a load rises onto a
// camel; a voice says a good word; a dashed way goes step by step to the masjid; and a stone is moved off the road.
// Each one rises as sparks.
function jointCharity(): SignArt {
  const s = 0.26;
  const feet = { x: 76, y: 89 };
  const road = `<path d="M0 92 L160 90 L160 100 L0 102 Z" fill="#EAD9B4"/><path d="M0 92 L160 90 M0 102 L160 100" stroke="#D2BC8E" stroke-width="0.6"/>`;
  const stand = `<rect x="25" y="88" width="10" height="1.6" fill="#7A5634"/><path d="M30 88 L30 70" stroke="#7A5634" stroke-width="1.6"/>`;
  const beam =
    `<path d="M19 70 L41 70" stroke="#8E6640" stroke-width="1.4" stroke-linecap="round"/><circle cx="30" cy="70" r="1.4" fill="#E9C46A"/>` +
    `<path d="M19 70 L16.4 78.4 M19 70 L21.6 78.4 M41 70 L38.4 78.4 M41 70 L43.6 78.4" stroke="#8E6640" stroke-width="0.5"/>` +
    `<path d="M15 78.4 Q19 82 23 78.4 Z" fill="#C9A13B"/><path d="M37 78.4 Q41 82 45 78.4 Z" fill="#C9A13B"/>`;
  const steps: [number, number][] = [
    [2, 93.6],
    [34, 93],
    [66, 92.4],
    [98, 91.8],
    [133, 89.4]
  ];
  return {
    kind: "joint-charity",
    ms: 12000,
    parts: [
      { name: "the sky at sunrise", svg: sky("#F6D7B0", "#FBE9D0", 60) },
      { name: "the sky by day", svg: sky("#BFE3FA", "#DDF1FC", 60), keys: showFrom(0.05, 0.1) },
      {
        name: "the sun, rising",
        svg: sun(22, 40),
        keys: track({
          xy: [
            [0.02, 0, 22],
            [0.1, 0, 0]
          ]
        })
      },
      {
        name: "hills",
        svg: peaks(
          [
            [24, 9, 30],
            [88, 12, 36],
            [148, 9, 26]
          ],
          61,
          "#D8C7A0",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [12, 70],
          [56, 74],
          [100, 70],
          [148, 76],
          [10, 108],
          [150, 108]
        ])
      },
      { name: "the road", svg: road },
      { name: "the masjid, past the road", svg: madinahMasjid(112, 89.6, 0.9) },
      { name: "a balance, standing", svg: stand },
      {
        name: "its crossbar and pans",
        svg: beam,
        origin: { x: 30, y: 70 },
        keys: track({
          rotate: [
            [0.17, 0],
            [0.19, 12],
            [0.21, -6],
            [0.23, 0]
          ]
        })
      },
      { name: "the balance, level and fair", svg: sparkle(30, 66, 2, "#FFE7A0"), keys: showFrom(0.23, 0.25), loop: { move: "twinkle", ms: 1100, low: 0.4 } },
      { name: "a camel, waiting for its load", svg: animalAt("camel", n(feet.x - 50 * s), n(feet.y - 73.4 * s), s), loop: { move: "bob", ms: 2000, y: -0.4 }, origin: feet },
      { name: "a way, coming to help load it", svg: way("M50 100 C54 96 58 93 61 91", BROWN, 0.9), keys: showFrom(0.33, 0.35) },
      {
        name: "a sack, lifted onto the camel",
        svg: sack(60, 91, 1.2),
        keys: track({
          xy: [
            [0.35, 0, 0],
            [0.4, 12, -10]
          ]
        })
      },
      ...quickSparks(
        "the help, rising",
        [
          [72, 76],
          [78, 72]
        ],
        0.4,
        0.012
      ),
      { name: "a voice, saying a good word", svg: arcs(47, 74), keys: showFrom(0.51, 0.52), loop: { move: "twinkle", ms: 1400, low: 0.45 } },
      ...quickSparks(
        "the good word, rising",
        [
          [52, 70],
          [56, 66]
        ],
        0.53,
        0.015
      ),
      ...steps.slice(1).map(([x, y], i): SignPart => {
        const [px, py] = steps[i];
        const from = Number((0.65 + i * 0.03).toFixed(3));
        return { name: `a step to the prayer ${i + 1}`, svg: way(`M${px} ${py} L${x} ${y}`, BROWN), keys: showFrom(from, Number((from + 0.03).toFixed(3))) };
      }),
      ...steps.slice(1).map(([x, y], i): SignPart => {
        const from = Number((0.67 + i * 0.03).toFixed(3));
        return { name: `a step's charity, shining ${i + 1}`, svg: sparkle(x, n(y - 4), 1.5, "#FFE7A0"), keys: showFrom(from, Number((from + 0.01).toFixed(3))), loop: { move: "twinkle", ms: 1000, low: 0.45, phase: i / 4 } };
      }),
      { name: "a way, to the stone", svg: way("M40 108 C44 104 48 101 50 99.6", BROWN, 0.9), keys: showFrom(0.83, 0.85) },
      {
        name: "a stone in the road, moved off it",
        svg: `<ellipse cx="54" cy="98.2" rx="3" ry="2" fill="#8E7E68"/><ellipse cx="53.2" cy="97.4" rx="1.4" ry="0.7" fill="#A99A82"/>`,
        keys: track({
          xy: [
            [0.85, 0, 0],
            [0.9, 7, 7]
          ]
        })
      },
      ...risingSparks(
        "the road cleared, rising",
        [
          [54, 96],
          [62, 94],
          [58, 90]
        ],
        0.88,
        0.015,
        { stay: true, rise: 10 }
      )
    ],
    words: [
      { text: "Each day the sun rises, every joint owes charity", from: 0.02, to: 0.14 },
      { text: "Judging fairly between two is charity", from: 0.16, to: 0.3 },
      { text: "Helping someone load his ride is charity", from: 0.32, to: 0.48 },
      { text: "A good word is charity", from: 0.5, to: 0.62 },
      { text: "Every step to the prayer is charity", from: 0.64, to: 0.8 },
      { text: "Removing harm from the road is charity", from: 0.82, to: 1 }
    ]
  };
}

export const DEED_ART = {
  "lost-camel": lostCamel,
  "stung-twice": stungTwice,
  "doors-of-good": doorsOfGood,
  "square-and-line": squareAndLine,
  "more-water": moreWater,
  "joint-charity": jointCharity
};
