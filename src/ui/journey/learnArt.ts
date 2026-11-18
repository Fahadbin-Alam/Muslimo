import { cloud, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { restingCamel, road, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { at3 } from "./storyArt";
import { stall } from "./tradeArt";
import { big, EIGHT, FOLK, glints, ITS_VOICE, linesOn, mat, places, plainLand, rel, SEVEN, sparkStays, twinkle } from "./shareArt";

/**
 * Learning from him: the pulpit made for him of tamarisk wood, on which he prayed and bowed, and at whose foot he
 * prostrated, so that they would follow him and learn the way he prayed; the man reciting in the masjid who reminded
 * him of ayahs of a surah; the bedouin who pulled his garment so hard, and to whom he turned and smiled, and ordered a
 * gift; the sign Ibn Mas'ud had that he might come in, the curtain raised or his quiet voice heard; the newborn son of
 * Abu Usayd, whom he named al-Mundhir; the masjid Abu Bakr built in his courtyard, where he wept as he recited; and the
 * third adhan at az-Zawra, added when the Muslims grew in number. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head or a face:
 * where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs
 * in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer is a spark that rises, what is
 * good is a light, glints and a soft golden ring. No name or word is written.
 */

/** The words of five lines. */
const FIVE = [
  [0.02, 0.2],
  [0.216, 0.396],
  [0.412, 0.592],
  [0.608, 0.788],
  [0.804, 1]
] as const;

/** A palm trunk holding up a roof, its middle at x, from y `top` down to the floor at y `foot`. */
const trunk = (x: number, top: number, foot: number) => {
  let rings = "";
  for (let y = top + 6; y < foot - 2; y += 5) rings += `<path d="M${n(x - 2)} ${y} Q${x} ${n(y + 1.1)} ${n(x + 2)} ${y}" stroke="#7A5232" stroke-width="0.6" fill="none"/>`;
  return `<rect x="${n(x - 2.2)}" y="${top}" width="4.4" height="${n(foot - top)}" rx="1" fill="#A87444"/>` + rings;
};

/** A roof of palm fronds from x `l` to `r` (a whole number of eights across), from y 31 down to y 40. */
const fronds = (l: number, r: number) =>
  `<rect x="${l}" y="31" width="${r - l}" height="9" fill="#8A6440"/>` +
  Array.from({ length: Math.round((r - l) / 8) }, (_, i) => `<path d="M${l + i * 8} 39 L${l + i * 8 + 4} 33 L${l + i * 8 + 8} 39" stroke="#6E8C3A" stroke-width="1.2" fill="none"/>`).join("");

/** A block of the pulpit's wood from x `l`, `w` wide, from its top at y `top` down to the floor at y `foot`. */
const block = (l: number, w: number, top: number, foot: number) =>
  `<rect x="${l}" y="${top}" width="${w}" height="${n(foot - top)}" fill="#B07A48"/><path d="M${l} ${top} L${n(l + w)} ${top}" stroke="#D29A62" stroke-width="0.8"/>` +
  `<path d="M${n(l + 0.8)} ${n(top + 3)} L${n(l + w - 0.8)} ${n(top + 3)}" stroke="#946238" stroke-width="0.35"/>`;

/** A pulpit of three steps rising to the left, its seat from x `l` with a low back, its foot on the floor at y `foot`. */
const pulpit = (l: number, foot: number) =>
  block(l, 6, foot - 20, foot) + block(l + 6, 6, foot - 14, foot) + block(l + 12, 6, foot - 7, foot) + `<rect x="${l}" y="${foot - 27}" width="1.8" height="7" fill="#946238"/>`;

/** A tamarisk tree, its foot at (x, y), `h` high: a thin trunk and soft, feathery grey-green crowns. */
const tamarisk = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h * 0.45)}" stroke="#7A5E44" stroke-width="${n(h * 0.07)}" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y - h * 0.62)}" rx="${n(h * 0.42)}" ry="${n(h * 0.3)}" fill="#8FA77A"/>` +
  `<ellipse cx="${n(x - h * 0.18)}" cy="${n(y - h * 0.78)}" rx="${n(h * 0.24)}" ry="${n(h * 0.2)}" fill="#A3B78E"/>` +
  `<ellipse cx="${n(x + h * 0.16)}" cy="${n(y - h * 0.84)}" rx="${n(h * 0.2)}" ry="${n(h * 0.16)}" fill="#B2C49C"/>`;

/** Three short strokes by (x, y), toward the right: pulled hard. */
const jolt = (x: number, y: number, color: string) =>
  [-1.6, 0, 1.6].map((dy) => `<path d="M${x} ${n(y + dy)} l2.4 ${n(dy * 0.3)}" stroke="${color}" stroke-width="0.6" stroke-linecap="round"/>`).join("");

// Learn the way I pray. Sahl ibn Sa'd said: the Messenger of Allah ﷺ sent for an Ansari woman and said to her: order
// your carpenter to prepare for me some pieces of wood on which I may sit; and he made it from the tamarisk of the
// forest. Then I saw him praying on it, and he bowed on it; then he stepped back, got down and prostrated on the ground
// near the foot of the pulpit, and again ascended it. When he finished, he faced the people and said: I have done this
// so that you may follow me and learn the way I pray (Sahih al-Bukhari 917). No one is drawn: inside the masjid, under
// its roof of palm fronds on palm trunks, with the rows sitting; through a wide doorway, a home of the Ansar and the
// tamarisk trees of the forest far off. Sahl's voice tells of it. A way goes out from his place to the home of the
// Ansar, and his voice asks for pieces of wood to sit on. A soft light comes over the tamarisk trees, and three pieces
// of their wood come in through the doorway, one by one, and stand as a pulpit of three steps. His place goes up the
// steps, and a spark of the prayer rises; it bows; it steps back down to the pulpit's foot, and a spark rises there as
// it prostrates; a soft golden ring comes about the foot, and his place goes up again. Then his voice speaks to those
// in the masjid, and glints and a soft light come over the rows: learning the way he prays.
function learnTheWayIPray(): SignArt {
  const foot = 102;
  const start: [number, number] = [88, 104];
  const step1: [number, number] = [75, 93.6];
  const step2: [number, number] = [69, 86.6];
  const top: [number, number] = [63, 80.6];
  const bowed: [number, number] = [63, 81.6];
  const base: [number, number] = [82.4, 103.2];
  const down: [number, number] = [82.4, 104.6];
  const sahl: [number, number] = [30, 110.6];
  const rows: [number, number][] = [
    ...[14, 22, 38, 46, 54, 62, 70, 78, 86, 94, 102].map((x): [number, number] => [x, 110.6]),
    ...[18, 26, 34, 42, 50, 58, 66, 74, 82, 90, 98].map((x): [number, number] => [x, 116])
  ];
  // The pieces of wood: where each one's left is, how wide, its top, how far right it comes in from, and when.
  const pieces: [number, number, number, number, number][] = [
    [60, 6, 82, 65, 0.398],
    [66, 6, 88, 59, 0.41],
    [72, 6, 95, 53, 0.422]
  ];
  return {
    kind: "learn-the-way-i-pray",
    ms: 12000,
    parts: [
      { name: "the sky over the masjid", svg: `<rect width="160" height="31" fill="#BFE3FA"/>` },
      { name: "clouds", svg: cloud(40, 16, 0.4, "#FFFFFF", 0.9) + cloud(118, 12, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the masjid's wall", svg: `<rect x="0" y="40" width="160" height="${foot - 40}" fill="#E5CFA6"/>` + [52, 64, 76, 88].map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#D6BD92" stroke-width="0.5"/>`).join("") },
      { name: "the day outside its wide doorway", svg: `<rect x="116" y="50" width="34" height="30" fill="#CFE8F6"/><rect x="116" y="80" width="34" height="22" fill="#E7D3A8"/>` },
      { name: "a home of the Ansar, far off", svg: big(home(124, 86, 18, 13), 124, 86, 0.5) },
      {
        name: "the tamarisk trees of the forest, far off",
        svg: tamarisk(134, 86.6, 12) + tamarisk(141, 85, 14) + tamarisk(147.4, 87, 11),
        origin: { x: 141, y: 86 },
        loop: { move: "sway", ms: 6200, angle: 0.8 }
      },
      { name: "the frame of the doorway", svg: `<path d="M116 ${foot} L116 50 L150 50 L150 ${foot}" stroke="#7C5A36" stroke-width="1.4" fill="none"/>` },
      { name: "the floor of the masjid", svg: `<rect x="0" y="${foot}" width="160" height="${120 - foot}" fill="#EAD9B4"/><path d="M0 ${foot} L160 ${foot}" stroke="#C9AE80" stroke-width="0.6"/>` },
      { name: "a palm trunk holding up the roof 1", svg: trunk(24, 40, foot) },
      { name: "a palm trunk holding up the roof 2", svg: trunk(104, 40, foot) },
      { name: "a roof of palm fronds", svg: fronds(0, 160) },
      { name: "the places of the rows, sitting", svg: places(rows, 1.5) },
      { name: "Sahl's place, in the rows", svg: someone(sahl[0], sahl[1], 1.5, ITS_VOICE) },
      { name: "Sahl's voice: telling of it", svg: arcs(n(sahl[0] + 3), n(sahl[1] - 3), ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.088), loop: speaking },
      {
        name: "sent for: a way out to the home of the Ansar",
        svg: way("M90.6 102.6 C100 100 110 96 116.6 91.6 C119.6 89.6 121.6 88 123.6 86.6", SOFT_GOLD, 0.7),
        keys: showFor(0.04, 0.07, 0.388, 0.396)
      },
      { name: "his voice: asking for pieces of wood to sit on", svg: arcs(n(start[0] + 3.4), n(start[1] - 2.8), GOLD), keys: showFor(0.144, 0.152, 0.388, 0.396), loop: speaking },
      { name: "made of tamarisk: a soft light over the trees of the forest", svg: wash(141, 80, 12, 7, WARM, 0.2), keys: showAt(0.388, 0.398), loop: soft },
      ...pieces.map(
        ([l, w, top, dx, at], i): SignPart => ({
          name: `a piece of tamarisk wood, brought in for the pulpit ${i + 1}`,
          svg: block(l, w, top, foot) + (i === 0 ? `<rect x="${l}" y="${foot - 27}" width="1.8" height="7" fill="#946238"/>` : ""),
          keys: track({
            opacity: [
              [at, 0],
              [at3(at + 0.004), 1]
            ],
            xy: [
              [at3(at + 0.004), dx, 0],
              [at3(at + 0.027), 0, 0]
            ]
          })
        })
      ),
      {
        name: "his place: up on the pulpit, bowing, back down to its base, and up again",
        svg: ring(start[0], start[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.51, 0, 0],
            [0.52, ...rel(start, step1)],
            [0.53, ...rel(start, step2)],
            [0.54, ...rel(start, top)],
            [0.562, ...rel(start, top)],
            [0.572, ...rel(start, bowed)],
            [0.632, ...rel(start, bowed)],
            [0.638, ...rel(start, top)],
            [0.646, ...rel(start, step2)],
            [0.654, ...rel(start, step1)],
            [0.664, ...rel(start, base)],
            [0.668, ...rel(start, base)],
            [0.676, ...rel(start, down)],
            [0.766, ...rel(start, down)],
            [0.772, ...rel(start, base)],
            [0.784, ...rel(start, step1)],
            [0.796, ...rel(start, step2)],
            [0.808, ...rel(start, top)]
          ]
        })
      },
      { name: "his prayer on the pulpit: a spark rising", svg: sparkle(top[0], n(top[1] - 5), 1.5, "#FFE7A0"), keys: sparkStays(0.542, 0.558), loop: twinkle(900) },
      { name: "prostrating below the pulpit: a spark rising", svg: sparkle(base[0], n(base[1] - 5), 1.4, "#FFE7A0"), keys: sparkStays(0.678, 0.696), loop: twinkle(900) },
      { name: "near the base of the pulpit: a soft golden ring", svg: care(base[0], n(base[1] + 0.6), 5, 2.2, SOFT_GOLD), keys: showAt(0.754, 0.764), loop: soft },
      { name: "his voice: to those in the masjid", svg: arcs(n(top[0] + 3.6), n(top[1] - 2.8), GOLD), keys: showAt(0.876, 0.884), loop: speaking },
      {
        name: "learning the way he prays: glints over the rows",
        svg: glints([
          [20, 106.6],
          [44, 106],
          [68, 106.6],
          [92, 106],
          [56, 112.6]
        ]),
        keys: showAt(0.9, 0.914),
        loop: twinkle()
      },
      { name: "following him: a soft light over the rows", svg: wash(58, 113, 52, 6, WARM, 0.12), keys: showAt(0.92, 0.94), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Sahl: he sent for an Ansari woman:",
      "order your carpenter to prepare for me",
      "pieces of wood on which I may sit.",
      "It was made from tamarisk of the forest.",
      "I saw him praying on it; he bowed on it,",
      "then he stepped back, got down, prostrated",
      "near the foot of the pulpit, and went up.",
      "He said: follow me, learn the way I pray."
    ])
  };
}

// He has reminded me. Aishah said: the Prophet ﷺ heard a man reciting the Quran in the masjid and said: may Allah
// bestow His mercy on him, as he has reminded me of such-and-such verses of such a surah (Sahih al-Bukhari 5037). No
// one is drawn: in Madinah, the masjid under its roof of palm leaves, with his house beside it and its curtained door,
// palms and the day. The place of one reciting sits in the shade of the masjid, and the arcs of the recitation go on
// all through. Aishah's voice tells of it from the house. His place is in front, and his voice speaks; a soft golden
// ring and a soft warm light come about the reciter's place: mercy. Then glints go, one by one, from the recitation to
// his place, and a soft golden ring comes about it, with glints over it: the ayahs he was reminded of.
function heHasRemindedMe(): SignArt {
  const reciter: [number, number] = [40.8, 83];
  const his: [number, number] = [104, 106];
  const READING = "#BFE6C4";
  return {
    kind: "he-has-reminded-me",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(132, 16) },
      { name: "a cloud", svg: cloud(70, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 116], [84, 118], [148, 116]]) },
      ...palms(
        [
          [6, 100, 15],
          [150, 101, 17]
        ],
        "Madinah"
      ),
      { name: "the masjid of Madinah, under its roof of palm leaves", svg: madinahMasjid(12, 100, 1.8) },
      { name: "his house beside the masjid, its door with a curtain", svg: home(124, 100, 26, 22) + `<path d="M120.4 100 L120.4 94.6 Q122.2 92.4 124 94.6 L124 100 Z" fill="#CDB68A"/>` },
      { name: "the place of one reciting, in the shade of the masjid", svg: someone(reciter[0], reciter[1], 1.6, READING) },
      { name: "the recitation: going on", svg: arcs(n(reciter[0] + 3.4), n(reciter[1] - 2.8), READING), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "Aishah's voice: telling of it, from the house", svg: arcsLeft(n(118.4), 92.4, ITS_VOICE), keys: showFor(0.022, 0.03, 0.14, 0.15), loop: speaking },
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: speaking of the reciter", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.3, 0.31), loop: speaking },
      { name: "mercy: a soft golden ring about the reciter's place", svg: care(reciter[0], reciter[1], 5.2, 3, SOFT_GOLD), keys: showAt(0.42, 0.44), loop: soft },
      { name: "mercy: a soft warm light about the reciter's place", svg: wash(reciter[0], reciter[1], 9, 5.4, WARM, 0.18), keys: showAt(0.45, 0.48), loop: soft },
      ...[0, 1, 2].map((i): SignPart => {
        const from = at3(0.614 + i * 0.03);
        const begin: [number, number] = [n(reciter[0] + 5), n(reciter[1] - 4)];
        const end: [number, number] = [n(his[0] - 3 + i * 3), n(his[1] - 6.6 - (i % 2) * 1.4)];
        return {
          name: `reminded: a glint from the recitation to his place ${i + 1}`,
          svg: sparkle(begin[0], begin[1], 1, "#FFE7A0"),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.004), 1]
            ],
            xy: [
              [at3(from + 0.004), 0, 0],
              [at3(from + 0.05), ...rel(begin, end)]
            ]
          }),
          loop: twinkle(900)
        };
      }),
      { name: "remembered: a soft golden ring about his place", svg: care(his[0], his[1], 5.4, 3.4, SOFT_GOLD), keys: showAt(0.81, 0.83), loop: soft },
      {
        name: "the ayahs of a surah: more glints over his place",
        svg: glints([
          [n(his[0] - 4.6), n(his[1] - 4.4)],
          [n(his[0] + 4.6), n(his[1] - 4.4)]
        ]),
        keys: showAt(0.85, 0.87),
        loop: twinkle(1500)
      }
    ],
    words: linesOn(FIVE, ["Aishah: he heard a man reciting", "the Quran in the masjid, and said:", "May Allah have mercy on the man", "who has reminded me of such-and-such", "ayahs of such a surah."])
  };
}

// He turned and smiled. Anas ibn Malik said: while I was walking with the Prophet ﷺ, who was wearing a Najrani outer
// garment with a thick hem, a bedouin came upon him and pulled his garment so violently; then the bedouin said: order
// for me something from Allah's fortune which you have. He turned to him and smiled, and ordered that a gift be given
// to him (Sahih al-Bukhari 3149). The mark of the hem is not drawn. No one is drawn: a road through Madinah, with homes
// and palms, and a camel lying down. Anas's voice tells of it. His place, a golden ring, and Anas's place walk along
// the road; the bedouin's place comes running up behind them. A tug shows between them, short strokes by his place, and
// his place is jolted back. The bedouin's voice speaks, rough and quick. A soft golden ring comes about his place,
// turned to the bedouin, then a soft warm light: he smiled. Then his voice speaks, a sack comes along the road from a
// home to the bedouin's place, and a soft golden ring comes about it: the gift.
function heTurnedAndSmiled(): SignArt {
  const his: [number, number] = [26, 101.4];
  const walked: [number, number] = [48, 101.4];
  const there: [number, number] = [66, 101.4];
  const pulled: [number, number] = [63.6, 101.6];
  const anas: [number, number] = [30, 106];
  const bedouin: [number, number] = [-6, 100.4];
  const behind: [number, number] = [59.4, 100.2];
  const ROUGH = "#B5653A";
  const giftFrom: [number, number] = [124.4, 104.6];
  const giftTo: [number, number] = [56.8, 104.8];
  return {
    kind: "he-turned-and-smiled",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(22, 16) },
      { name: "clouds", svg: cloud(70, 24, 0.5, "#FFFFFF", 0.9) + cloud(128, 18, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [84, 118], [146, 116]]) },
      { name: "homes of Madinah, along the road", svg: home(34, 94, 22, 16) + home(66, 92, 18, 14) + home(128, 95, 26, 18) },
      ...palms(
        [
          [94, 92, 18],
          [152, 96, 15]
        ],
        "Madinah"
      ),
      { name: "the road", svg: road(0, 160, 103) },
      { name: "a camel lying down by a home", svg: restingCamel(146, 112, 0.62), loop: { move: "bob", ms: 3400, y: -0.2 } },
      {
        name: "Anas's place: walking with him",
        svg: someone(anas[0], anas[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.146, 0, 0],
            [0.208, walked[0] - his[0], 0],
            [0.266, walked[0] - his[0], 0],
            [0.296, there[0] - his[0], 0]
          ]
        })
      },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 3.2), n(anas[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.088), loop: speaking },
      {
        name: "his place: walking, then jolted back as the garment is pulled",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.146, 0, 0],
            [0.208, ...rel(his, walked)],
            [0.266, ...rel(his, walked)],
            [0.296, ...rel(his, there)],
            [0.392, ...rel(his, there)],
            [0.398, ...rel(his, pulled)]
          ]
        })
      },
      {
        name: "the bedouin's place: coming up behind him",
        svg: someone(bedouin[0], bedouin[1], 1.6, ROUGH),
        keys: track({
          xy: [
            [0.292, 0, 0],
            [0.33, ...rel(bedouin, behind)]
          ]
        })
      },
      { name: "pulled so hard: a tug between the bedouin's place and his", svg: way(`M${n(behind[0] + 1.6)} ${behind[1]} L${n(pulled[0] - 2.4)} ${n(pulled[1] - 0.4)}`, ROUGH, 0.9), keys: showFor(0.388, 0.392, 0.44, 0.448) },
      { name: "so violently: short strokes by his place", svg: jolt(n(there[0] + 1.4), n(there[1] - 0.4), ROUGH), keys: showFor(0.392, 0.396, 0.44, 0.448) },
      {
        name: "the bedouin's voice: asking, rough and quick",
        svg: arcsLeft(n(behind[0] - 3.4), n(behind[1] - 2.8), ROUGH),
        keys: showFor(0.51, 0.518, 0.69, 0.698),
        loop: { move: "twinkle", ms: 600, low: 0.4 }
      },
      { name: "he smiled: a soft warm light about his place", svg: wash(pulled[0], pulled[1], 7, 4.4, WARM, 0.24), keys: showAt(0.776, 0.792), loop: soft },
      { name: "turned to the bedouin: a soft golden ring about his place", svg: care(pulled[0], pulled[1], 4.6, 2.8, SOFT_GOLD), keys: showAt(0.756, 0.768), loop: soft },
      { name: "his voice: ordering a gift", svg: arcs(n(pulled[0] + 3.4), n(pulled[1] - 2.8), GOLD), keys: showAt(0.876, 0.884), loop: speaking },
      {
        name: "a gift: a sack, brought along the road to the bedouin's place",
        svg: sack(giftFrom[0], giftFrom[1], 0.7),
        keys: track({
          opacity: [
            [0.888, 0],
            [0.892, 1]
          ],
          xy: [
            [0.892, 0, 0],
            [0.93, ...rel(giftFrom, giftTo)]
          ]
        })
      },
      { name: "given to the bedouin: a soft golden ring about the bedouin's place", svg: care(behind[0], n(behind[1] + 1.6), 5, 3.4, SOFT_GOLD), keys: showAt(0.934, 0.948), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Anas: I was walking with him;",
      "he was wearing a Najrani outer garment",
      "with a thick hem. A bedouin came upon him",
      "and pulled his garment so violently.",
      "The bedouin said: order for me",
      "something from Allah's fortune you have.",
      "He turned to the bedouin and smiled,",
      "and ordered a gift for the bedouin."
    ])
  };
}

// The curtain is raised. Ibn Mas'ud said: the Messenger of Allah ﷺ said to me: the sign that you have been permitted to
// come in is that the curtain is raised, or that you hear me speaking quietly, until I forbid you (Sahih Muslim 2169a).
// No one is drawn: his house, its wall of mud brick, with a curtain over its doorway; palms and the day. Ibn Mas'ud's
// place is at the door, and his voice tells of it; his voice speaks from behind the curtain. The curtain is raised, and
// his place shows inside, a golden ring on a mat; a golden way goes from Ibn Mas'ud's place to the doorway: permitted.
// The curtain comes down again, and the way goes; his quiet voice shows on the curtain, small and soft, and the way
// shows again. Then Ibn Mas'ud's place goes along it, in behind the curtain, and a soft golden ring comes about the
// doorway: so it is, until he forbids.
function theCurtainIsRaised(): SignArt {
  const ibnMasud: [number, number] = [54, 104.6];
  const inside: [number, number] = [80, 99];
  const his: [number, number] = [80, 95.6];
  return {
    kind: "the-curtain-is-raised",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(146, 14) },
      { name: "a cloud", svg: cloud(16, 22, 0.46, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [104, 118], [150, 115]]) },
      ...palms(
        [
          [10, 101, 22],
          [150, 101, 20]
        ],
        "Madinah"
      ),
      {
        name: "his house: its wall of mud brick",
        svg:
          `<rect x="26" y="38" width="108" height="62" fill="#D6BC8E"/><rect x="24.6" y="36.4" width="110.8" height="2" fill="#BC9060"/>` +
          [50, 62, 74, 86].map((y) => `<path d="M26 ${y} L134 ${y}" stroke="#C4A878" stroke-width="0.5"/>`).join("") +
          `<rect x="108" y="50" width="10" height="8" fill="#6B4A2E"/>`
      },
      { name: "inside the doorway: the room", svg: `<rect x="68" y="56" width="24" height="44" fill="#4A3828"/><rect x="68" y="92" width="24" height="8" fill="#6B5038"/>` + mat(80, 97.4, 12) },
      { name: "his place, inside", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Ibn Mas'ud's place: at the door, then going in",
        svg: someone(ibnMasud[0], ibnMasud[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.81, 0, 0],
            [0.83, ...rel(ibnMasud, [70.6, 102.4])],
            [0.85, ...rel(ibnMasud, inside)]
          ]
        })
      },
      {
        name: "the curtain over the doorway: raised, then let down again",
        svg:
          `<rect x="68.4" y="56.6" width="23.2" height="43.4" fill="#C8A878"/>` +
          [72.2, 76.2, 80.2, 84.2, 88.2].map((x) => `<path d="M${x} 57 L${n(x - 0.3)} 100" stroke="#AE8E60" stroke-width="0.5"/>`).join(""),
        origin: { x: 80, y: 56.6 },
        keys: track({
          scaleY: [
            [0.414, 1],
            [0.432, 0.14],
            [0.61, 0.14],
            [0.628, 1]
          ]
        })
      },
      { name: "the rod over the doorway", svg: `<rect x="66.6" y="55.4" width="26.8" height="1.6" rx="0.6" fill="#7A5232"/>` },
      { name: "Ibn Mas'ud's voice: telling of it", svg: arcsLeft(n(ibnMasud[0] - 3.4), n(ibnMasud[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.14, 0.15), loop: speaking },
      { name: "his voice: from behind the curtain", svg: arcsLeft(66, 82, GOLD), keys: showFor(0.22, 0.23, 0.34, 0.35), loop: speaking },
      {
        name: "permitted to come in: a golden way to the doorway",
        svg: way(`M${n(ibnMasud[0] + 2.6)} ${n(ibnMasud[1] - 0.4)} C61 103.6 65 102.8 69.4 101.8`, GOLD, 0.9),
        keys: track({
          opacity: [
            [0.45, 0],
            [0.47, 1],
            [0.61, 1],
            [0.618, 0],
            [0.68, 0],
            [0.7, 1]
          ]
        })
      },
      { name: "his quiet voice: small and soft, on the curtain", svg: big(arcsLeft(74, 84, GOLD), 74, 84, 0.6), keys: showAt(0.636, 0.646), loop: { move: "twinkle", ms: 1600, low: 0.35 } },
      { name: "until he forbids: a soft golden ring about the doorway", svg: care(80, 101.6, 9, 2.4, SOFT_GOLD), keys: showAt(0.87, 0.89), loop: soft }
    ],
    words: linesOn(FIVE, ["Ibn Mas'ud: he said to me:", "The sign that you have been permitted", "to come in is that the curtain is raised,", "or that you hear me speaking quietly,", "until I forbid you."])
  };
}

// His name is al-Mundhir. Sahl said: when al-Mundhir ibn Abu Usayd was born, he was brought to the Prophet ﷺ, who
// placed him on his thigh. The Prophet ﷺ was busy with something in his hands, so Abu Usayd told someone to take his
// son. When he finished, he said: where is the boy? Abu Usayd said: we have sent him home. He said: what is his name?
// Abu Usayd said: so-and-so. He said: no, his name is al-Mundhir (Sahih al-Bukhari 6191). No one is drawn: a shade of
// palm leaves on poles, with a mat under it, and Abu Usayd's home beyond; palms and the day. Sahl's voice tells of it.
// The newborn's place, a small dashed circle, comes from the home to his place on the mat, and settles close by it,
// with a soft golden ring: held. A soft light comes before his place: busy. Abu Usayd's voice speaks, and the place of
// one who takes the newborn comes from the home and goes back with it. His voice asks, and Abu Usayd's voice answers; a
// soft ring comes about the newborn's place at the home. He asks again, and is answered. Then his voice speaks, and
// glints and a soft warm light come over the newborn's place: his name is al-Mundhir.
function hisNameIsAlMundhir(): SignArt {
  const his: [number, number] = [52, 101.2];
  const abuUsayd: [number, number] = [68, 102.4];
  const door: [number, number] = [132.2, 100.6];
  const near: [number, number] = [58, 100.6];
  const held: [number, number] = [54.8, 99.8];
  const back: [number, number] = [132.2, 101.8];
  const taker: [number, number] = [128, 103.4];
  const LITTLE = "#E59A6A";
  return {
    kind: "his-name-is-al-mundhir",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(24, 16) },
      { name: "a cloud", svg: cloud(96, 22, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 116], [92, 118], [150, 116]]) },
      ...palms(
        [
          [8, 99, 18],
          [100, 93, 16]
        ],
        "Madinah"
      ),
      { name: "Abu Usayd's home", svg: home(134, 101, 30, 24) },
      {
        name: "a shade of palm leaves on poles",
        svg:
          `<path d="M36 74 L36 104 M80 74 L80 104" stroke="#8A6440" stroke-width="1.4"/><path d="M30 71 L86 71 L84 75.4 L32 75.4 Z" fill="#6E8F3A"/>` +
          [34, 42, 50, 58, 66, 74].map((x) => `<path d="M${x} 72.6 L${x + 6} 74.4" stroke="#56742B" stroke-width="0.6"/>`).join("")
      },
      { name: "a mat under the shade", svg: mat(58, 103.4, 32) },
      { name: "his place, sitting", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Usayd's place, sitting", svg: someone(abuUsayd[0], abuUsayd[1], 1.6, ITS_VOICE) },
      { name: "Sahl's voice: telling of it", svg: arcsLeft(24, 92, ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.088), loop: speaking },
      {
        name: "the newborn's place: brought to him, then taken home",
        svg: someone(door[0], door[1], 1, LITTLE),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.034, 1]
          ],
          xy: [
            [0.034, 0, 0],
            [0.086, ...rel(door, near)],
            [0.146, ...rel(door, near)],
            [0.16, ...rel(door, held)],
            [0.42, ...rel(door, held)],
            [0.452, ...rel(door, back)]
          ]
        })
      },
      { name: "held close: a soft golden ring about the newborn's place", svg: care(held[0], held[1], 2.4, 1.8, SOFT_GOLD), keys: showFor(0.166, 0.18, 0.388, 0.396), loop: soft },
      { name: "busy with something: a soft light before his place", svg: wash(n(his[0] - 3.4), n(his[1] + 3.6), 5, 2.6, WARM, 0.24), keys: showFor(0.27, 0.284, 0.512, 0.52), loop: soft },
      {
        name: "the place of one who takes the newborn home",
        svg: someone(taker[0], taker[1], 1.5, FOLK),
        keys: track({
          opacity: [
            [0.392, 0],
            [0.396, 1],
            [0.452, 1],
            [0.456, 0]
          ],
          xy: [
            [0.396, 0, 0],
            [0.416, ...rel(taker, [59.4, 103.6])],
            [0.42, ...rel(taker, [59.4, 103.6])],
            [0.452, ...rel(taker, [129.4, 103.8])]
          ]
        })
      },
      {
        name: "Abu Usayd's voice: speaking, then answering him",
        svg: arcs(n(abuUsayd[0] + 3.2), n(abuUsayd[1] - 2.8), ITS_VOICE),
        keys: track({
          opacity: [
            [0.388, 0],
            [0.394, 1],
            [0.446, 1],
            [0.454, 0],
            [0.632, 0],
            [0.64, 1],
            [0.692, 1],
            [0.7, 0],
            [0.796, 0],
            [0.804, 1],
            [0.814, 1],
            [0.82, 0]
          ]
        }),
        loop: speaking
      },
      {
        name: "his voice: asking, then naming",
        svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD),
        keys: track({
          opacity: [
            [0.524, 0],
            [0.532, 1],
            [0.57, 1],
            [0.578, 0],
            [0.754, 0],
            [0.762, 1],
            [0.786, 1],
            [0.794, 0],
            [0.876, 0],
            [0.884, 1]
          ]
        }),
        loop: speaking
      },
      { name: "sent home: a soft ring about the newborn's place, at the home", svg: care(back[0], back[1], 3, 2, SOFT_GOLD), keys: showAt(0.65, 0.664), loop: soft },
      {
        name: "his name is al-Mundhir: glints over the newborn's place",
        svg: glints([
          [n(back[0] - 2.4), n(back[1] - 4.4)],
          [n(back[0] + 2.2), n(back[1] - 5.2)]
        ]),
        keys: showAt(0.9, 0.914),
        loop: twinkle()
      },
      { name: "named: a soft warm light about the newborn's place", svg: wash(back[0], back[1], 6, 3.6, WARM, 0.2), keys: showAt(0.92, 0.94), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Sahl: when Abu Usayd's son was born,",
      "he placed the boy on his thigh.",
      "He was busy with something in his hands,",
      "so Abu Usayd had someone take the boy.",
      "He finished and said: where is the boy?",
      "Abu Usayd: we have sent the boy home.",
      "He asked the boy's name: so-and-so.",
      "He said: no, the boy's name is Al-Mundhir."
    ])
  };
}

// A masjid in the courtyard. Aishah, the wife of the Prophet ﷺ, said: not a day passed but the Prophet ﷺ visited us,
// both in the mornings and evenings. My father Abu Bakr thought of building a masjid in the courtyard of his house, and
// he did so; he used to pray and recite the Quran in it. The pagan women and their children used to stand by him and
// look at him with surprise. Abu Bakr was a soft-hearted person and could not help weeping while reciting the Quran
// (Sahih al-Bukhari 476). What the chiefs of Quraysh feared is left out. No one is drawn: in Makkah, under its rocky
// hills, Abu Bakr's home with its courtyard, and a way to it. Aishah's voice tells of it. His place comes along the way
// to Abu Bakr's door, with a soft light of the morning; it goes back, and comes again with a warm light of the evening,
// then goes on its way. A small masjid rises in the courtyard: its low walls, its floor. Abu Bakr's place comes into
// it, a spark of the prayer rises, and the arcs of his recitation go on. The places of those who stood by come from
// both sides, and small glints show over them: surprise. A soft golden ring comes about Abu Bakr's place: soft-hearted;
// then a soft blue glow: weeping as he recited.
function aMasjidInTheCourtyard(): SignArt {
  const his: [number, number] = [6, 108.4];
  const door: [number, number] = [112.4, 100.4];
  const abuBakr: [number, number] = [116.2, 100.6];
  const inIt: [number, number] = [85, 107];
  const ABU_BAKR = "#5E8FC2";
  const STOOD = "#9C8E7A";
  const stoodBy: [number, number, number, number][] = [
    [56, 106, -8, 1.6],
    [52, 111, -8, 1.1],
    [57, 115.6, -8, 1.5],
    [113, 106.6, 168, 1.6],
    [117.6, 112, 168, 1.1]
  ];
  return {
    kind: "a-masjid-in-the-courtyard",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 64) },
      { name: "the sun", svg: sun(80, 14) },
      { name: "the morning: a soft light low in the sky", svg: wash(16, 58, 30, 14, "#FFC98A", 0.2), keys: showFor(0.03, 0.05, 0.146, 0.156), loop: soft },
      { name: "the evening: a warm light low in the sky", svg: wash(144, 58, 30, 14, "#F7A86A", 0.2), keys: showFor(0.168, 0.18, 0.268, 0.28), loop: soft },
      { name: "a cloud", svg: cloud(46, 26, 0.46, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the rocky hills of Makkah",
        svg: peaks(
          [
            [20, 16, 30],
            [70, 22, 36],
            [130, 18, 34]
          ],
          66,
          "#A88A6A",
          false
        )
      },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [40, 118], [150, 117]]) },
      { name: "Abu Bakr's home", svg: home(118, 98, 34, 26) },
      { name: "the courtyard of Abu Bakr's home", svg: `<path d="M60 98.4 L150 98.4 L156 117 L54 117 Z" fill="#EAD9B4"/>` },
      { name: "the way to Abu Bakr's home", svg: way("M2 108.6 C30 108.4 60 106.4 84 104 C96 102.8 106 101.2 112.4 100.4", "#FFF0C4", 0.8) },
      { name: "Aishah's voice: telling of it, from the home", svg: arcs(124.6, 86, ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.088), loop: speaking },
      {
        name: "his place: visiting in the morning and the evening",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.034, 1],
            [0.29, 1],
            [0.296, 0]
          ],
          xy: [
            [0.034, 0, 0],
            [0.086, ...rel(his, door)],
            [0.144, ...rel(his, door)],
            [0.168, 0, 0],
            [0.184, 0, 0],
            [0.208, ...rel(his, door)],
            [0.266, ...rel(his, door)],
            [0.29, 0, 0]
          ]
        })
      },
      {
        name: "a small masjid, built in the courtyard: its low walls and its floor",
        svg:
          `<path d="M68 103 L102 103 L106 112 L64 112 Z" fill="#E3CFA0"/><path d="M68 103 L102 103" stroke="#A9895C" stroke-width="2"/>` +
          `<path d="M68 103 L64 112 M102 103 L106 112" stroke="#A9895C" stroke-width="1.6"/><rect x="63" y="111" width="44" height="2.6" fill="#B48F5E"/>`,
        origin: { x: 85, y: 112 },
        keys: track({
          opacity: [
            [0.3, 0],
            [0.304, 1]
          ],
          scaleY: [
            [0.3, 0.1],
            [0.33, 1]
          ]
        })
      },
      {
        name: "Abu Bakr's place: coming into his masjid",
        svg: someone(abuBakr[0], abuBakr[1], 1.6, ABU_BAKR),
        keys: track({
          opacity: [
            [0.388, 0],
            [0.392, 1]
          ],
          xy: [
            [0.392, 0, 0],
            [0.41, ...rel(abuBakr, inIt)]
          ]
        })
      },
      { name: "Abu Bakr's prayer: a spark rising", svg: sparkle(inIt[0], n(inIt[1] - 5), 1.4, "#FFE7A0"), keys: sparkStays(0.414, 0.43), loop: twinkle(900) },
      { name: "Abu Bakr's voice: reciting the Quran", svg: arcs(n(inIt[0] + 3.4), n(inIt[1] - 2.8), ABU_BAKR), keys: showAt(0.436, 0.446), loop: speaking },
      ...stoodBy.map(
        ([x, y, from, r], i): SignPart => ({
          name: `the place of one who stood by and looked ${i + 1}`,
          svg: someone(from, y, r, STOOD),
          keys: track({
            xy: [
              [at3(0.512 + i * 0.006), 0, 0],
              [at3(0.546 + i * 0.006), n(x - from), 0]
            ]
          })
        })
      ),
      { name: "with surprise: small glints over those who stood by", svg: glints(stoodBy.map(([x, y]): [number, number] => [x, n(y - 4.2)]), 0.7, "#FFF6D8"), keys: showAt(0.64, 0.656), loop: twinkle(800) },
      { name: "soft-hearted: a soft golden ring about Abu Bakr's place", svg: care(inIt[0], inIt[1], 4.6, 2.8, SOFT_GOLD), keys: showAt(0.756, 0.77), loop: soft },
      { name: "weeping as he recited: a soft blue glow about Abu Bakr's place", svg: wash(inIt[0], n(inIt[1] - 1), 8, 4.6, "#8ECDF2", 0.24), keys: showAt(0.88, 0.9), loop: { move: "twinkle", ms: 2000, low: 0.6 } }
    ],
    words: linesOn(EIGHT, [
      "Aishah: not a day passed but he visited us",
      "both in the mornings and evenings.",
      "Abu Bakr built a masjid in the courtyard",
      "and prayed and recited the Quran in it.",
      "Pagan women and their children stood by",
      "and looked at Abu Bakr with surprise.",
      "Abu Bakr was soft-hearted and could not",
      "help weeping while reciting the Quran."
    ])
  };
}

// A third adhan at az-Zawra. As-Sa'ib ibn Yazid said: in the lifetime of the Messenger of Allah ﷺ, and Abu Bakr and
// Umar, the adhan for the Jumu'ah prayer used to be pronounced when the imam sat on the pulpit; but when the people
// increased in number during the caliphate of Uthman, he introduced a third adhan, and it was pronounced at az-Zawra,
// and that new state of affairs remained so in the succeeding years (Sahih al-Bukhari 916; and 912, where it is the
// Muslims who increased, and az-Zawra is a place in the market of Madinah). No one is drawn: on the left, the masjid,
// open to see inside, with its pulpit and its rows under a roof of palm fronds; on the right, the market of Madinah
// with its stalls, and the raised place of az-Zawra; homes of the town far off. As-Sa'ib's voice tells of it, and the
// caller's place stands in the masjid. The place of the one who sits on the pulpit, a plain ring, goes up its steps,
// and then the adhan's voice is heard; a soft ring comes at the pulpit's steps: so it was, in their time. It comes down
// again. More homes rise in the town, and more places come into the rows and the market: the Muslims grew in number.
// A caller's place shows on the roof of az-Zawra, and its voice calls out over the market; a soft light and a soft
// golden ring come about az-Zawra: and so it remained.
function aThirdAdhanAtAzZawra(): SignArt {
  const foot = 100;
  const below: [number, number] = [47, 102.6];
  const step1: [number, number] = [37, 91.6];
  const step2: [number, number] = [31, 84.6];
  const seat: [number, number] = [25, 78.6];
  const caller: [number, number] = [60, 99.4];
  const zawra: [number, number] = [143, 46.4];
  const PLAIN = "#8E5E2E";
  const rows: [number, number][] = [
    ...[10, 18, 26, 34, 42, 50, 58, 66].map((x): [number, number] => [x, 108.4]),
    ...[14, 30, 46, 62].map((x): [number, number] => [x, 114])
  ];
  const moreRows: [number, number][] = [
    [22, 114],
    [38, 114],
    [54, 114],
    [70, 114],
    [10, 118.6],
    [26, 118.6],
    [42, 118.6],
    [58, 118.6]
  ];
  const market: [number, number][] = [
    [92, 104],
    [106, 106.4],
    [122, 104.4]
  ];
  const moreMarket: [number, number][] = [
    [86, 111],
    [98, 113],
    [112, 110.6],
    [126, 112.6],
    [138, 108.6],
    [150, 111.4]
  ];
  const homes: [number, number, number, number][] = [
    [90, 74, 12, 10],
    [114, 72, 12, 10]
  ];
  const moreHomes: [number, number, number, number][] = [
    [102, 76, 12, 9],
    [126, 76, 12, 9],
    [84, 79, 10, 8]
  ];
  return {
    kind: "a-third-adhan-at-az-zawra",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 66) },
      { name: "the sun", svg: sun(122, 14) },
      { name: "a cloud", svg: cloud(100, 30, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[92, 118], [130, 116], [152, 118]]) },
      { name: "homes of the town, far off", svg: homes.map(([x, y, w, h]) => big(home(x, y, w * 2, h * 2), x, y, 0.5)).join("") },
      ...moreHomes.map(
        ([x, y, w, h], i): SignPart => ({
          name: `a home more in the town ${i + 1}`,
          svg: big(home(x, y, w * 2, h * 2), x, y, 0.5),
          origin: { x, y },
          keys: track({
            opacity: [
              [at3(0.598 + i * 0.006), 0],
              [at3(0.602 + i * 0.006), 1]
            ],
            scaleY: [
              [at3(0.598 + i * 0.006), 0.1],
              [at3(0.622 + i * 0.006), 1]
            ]
          })
        })
      ),
      { name: "the stalls of the market of Madinah", svg: stall(98, 16, "#D9774A", 80, 92) + stall(118, 16, "#4A8FD9", 80, 92) },
      {
        name: "az-Zawra: a place in the market, raised high",
        svg:
          `<rect x="134" y="50" width="18" height="${foot - 50}" fill="#C9A470"/><rect x="132.8" y="48.6" width="20.4" height="1.8" fill="#A8834E"/>` +
          `<rect x="138" y="58" width="3" height="3.4" fill="#6B4A2E"/><rect x="145" y="58" width="3" height="3.4" fill="#6B4A2E"/><rect x="138" y="72" width="3" height="3.4" fill="#6B4A2E"/><rect x="145" y="72" width="3" height="3.4" fill="#6B4A2E"/>` +
          `<path d="M141 ${foot} L141 92 Q143 89.6 145 92 L145 ${foot} Z" fill="#6B4A2E"/>`
      },
      { name: "the masjid's wall", svg: `<rect x="0" y="40" width="80" height="${foot - 40}" fill="#E5CFA6"/>` + [52, 64, 76, 88].map((y) => `<path d="M0 ${y} L80 ${y}" stroke="#D6BD92" stroke-width="0.5"/>`).join("") },
      { name: "the masjid's floor", svg: `<rect x="0" y="${foot}" width="80" height="${120 - foot}" fill="#EAD9B4"/><path d="M0 ${foot} L80 ${foot}" stroke="#C9AE80" stroke-width="0.6"/>` },
      { name: "a palm trunk holding up the roof 1", svg: trunk(6, 40, foot) },
      { name: "a palm trunk holding up the roof 2", svg: trunk(77, 40, foot) },
      { name: "a roof of palm fronds", svg: fronds(0, 80) },
      { name: "the pulpit of three steps", svg: pulpit(22, foot) },
      { name: "the places of the rows", svg: places(rows, 1.5) },
      ...moreRows.map(
        ([x, y], i): SignPart => ({
          name: `a place more in the rows ${i + 1}`,
          svg: someone(x, y, 1.5, FOLK),
          keys: showAt(at3(0.636 + i * 0.003), at3(0.642 + i * 0.003))
        })
      ),
      { name: "places in the market", svg: places(market, 1.5) },
      ...moreMarket.map(
        ([x, y], i): SignPart => ({
          name: `a place more in the market ${i + 1}`,
          svg: someone(x, y, 1.5, FOLK),
          keys: showAt(at3(0.642 + i * 0.004), at3(0.648 + i * 0.004))
        })
      ),
      { name: "As-Sa'ib's voice: telling of it", svg: arcs(8, 102, ITS_VOICE), keys: showFor(0.022, 0.03, 0.1, 0.108), loop: speaking },
      { name: "so it was in their time: a soft ring at the pulpit's steps", svg: care(31, 101.4, 12, 2.6, SOFT_GOLD), keys: showAt(0.31, 0.324), loop: soft },
      { name: "the caller's place, in the masjid", svg: someone(caller[0], caller[1], 1.6, ITS_VOICE), keys: showAt(0.04, 0.05) },
      {
        name: "the place of the one who sits on the pulpit: up its steps, and down again",
        svg: ring(below[0], below[1], 2.6, PLAIN),
        keys: track({
          xy: [
            [0.166, 0, 0],
            [0.176, ...rel(below, step1)],
            [0.186, ...rel(below, step2)],
            [0.196, ...rel(below, seat)],
            [0.454, ...rel(below, seat)],
            [0.464, ...rel(below, step2)],
            [0.474, ...rel(below, step1)],
            [0.484, 0, 0]
          ]
        })
      },
      {
        name: "the adhan for Jumu'ah: the caller's voice",
        svg: arcs(n(caller[0] + 3.2), n(caller[1] - 3), ITS_VOICE) + arcsLeft(n(caller[0] - 3.2), n(caller[1] - 3), ITS_VOICE),
        keys: showFor(0.2, 0.208, 0.388, 0.396),
        loop: speaking
      },
      { name: "the caller's place, on the roof of az-Zawra", svg: someone(zawra[0], zawra[1], 1.6, ITS_VOICE), keys: showAt(0.742, 0.748) },
      {
        name: "a third adhan: a voice calling out from az-Zawra over the market",
        svg: arcs(n(zawra[0] + 3.4), n(zawra[1] - 3), ITS_VOICE) + arcsLeft(n(zawra[0] - 3.4), n(zawra[1] - 3), ITS_VOICE),
        keys: showAt(0.756, 0.766),
        loop: speaking
      },
      { name: "in the years after: a soft light over az-Zawra and the market", svg: wash(124, 94, 34, 12, WARM, 0.12), keys: showAt(0.886, 0.904), loop: soft },
      { name: "and so it remained: a soft golden ring about az-Zawra", svg: care(143, 101.4, 11, 2.6, SOFT_GOLD), keys: showAt(0.91, 0.924), loop: soft }
    ],
    words: linesOn(SEVEN, [
      "As-Sa'ib: the adhan for Jumu'ah",
      "was given when the imam sat on the pulpit,",
      "in his lifetime, Abu Bakr's and Umar's.",
      "In the caliphate of Uthman,",
      "when the Muslims increased in number,",
      "a third adhan at az-Zawra was added,",
      "and so it remained in the years after."
    ])
  };
}

export const LEARN_ART = {
  "learn-the-way-i-pray": learnTheWayIPray,
  "he-has-reminded-me": heHasRemindedMe,
  "he-turned-and-smiled": heTurnedAndSmiled,
  "the-curtain-is-raised": theCurtainIsRaised,
  "his-name-is-al-mundhir": hisNameIsAlMundhir,
  "a-masjid-in-the-courtyard": aMasjidInTheCourtyard,
  "a-third-adhan-at-az-zawra": aThirdAdhanAtAzZawra
} as const;
