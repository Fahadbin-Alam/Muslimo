import { animalAt, cloud, glow, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun, wash } from "./worshipArt";
import { care, LIGHT, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { road, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, FOLK, glints, ITS_VOICE, linesOn, places, plainLand, SIX, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { coins } from "./tradeArt";
import { GREY } from "./lovedArt";
import { NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";

/**
 * Weighed rightly: a poor Muslim better than an earth full of the like of one the people praised; a day the Prophet ﷺ
 * gave the women, at their asking, for lessons and commands; the one who came to Madinah and called the religion good
 * only when his wife bore a boy and his mares had foals; sleep before prayer for one who is drowsy; a gift taken when it
 * comes without asking or greed, and not run after when it does not; and the days of Ramadan Aishah made up in Sha'ban.
 * Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is
 * ever drawn, not even a hand, a foot, a head, a mouth or a face, and no one is drawn on an animal: where someone was, a
 * ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing
 * is drawn for Allah, no book or page is drawn, and nothing comes down from the sky: a deed is a spark that rises, what
 * is good is a light, glints and a soft golden ring, and what is not to be done a grey dashed ring. No name, word or
 * number is written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The door of a home (trialArt.ts) whose foot's middle is at (x, y), lit from within. */
const litDoor = (x: number, y: number) =>
  `${glow(n(x - 1.8), n(y - 3.4), 4.6, "#FFD866", 0.24)}<path d="M${n(x - 3.6)} ${y} L${n(x - 3.6)} ${n(y - 5.4)} Q${n(x - 1.8)} ${n(y - 7.6)} ${x} ${n(y - 5.4)} L${x} ${y} Z" fill="#FFD866" opacity="0.85"/>`;

/** Bedding on the floor, its middle at (x, y), `w` across: a long cushion with a pillow at its left. */
const bedding = (x: number, y: number, w = 22) =>
  `<rect x="${n(x - w / 2)}" y="${n(y - 1.8)}" width="${w}" height="5" rx="2" fill="#5E5276"/><rect x="${n(x - w / 2 + 1)}" y="${n(y - 1.8)}" width="5" height="2.6" rx="1.2" fill="#7A6E92"/>`;

/** Three small soft blue specks over a place at (x, y): drowsy. */
const specks = (x: number, y: number) =>
  [
    [-2, -4.6],
    [0.4, -6],
    [2.6, -4.4]
  ]
    .map(([dx, dy]) => `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="0.55" fill="#9DB8E8"/>`)
    .join("");

/** A small round mark at (x, y): a day. */
const mark = ([x, y]: [number, number], fill: string) => `<circle cx="${x}" cy="${y}" r="0.9" fill="${fill}"/>`;

/** A horse of the picture cards, `s` times its size, its feet at (x, y). */
const horse = (x: number, y: number, s: number, left = false) => animalAt("horse", n(x - 50 * s), n(y - 73 * s), s, left);

/** A pen of rails from x1 to x2, its foot at y, with a post every `step`. */
const pen = (x1: number, x2: number, y: number, step: number) => {
  const posts: number[] = [];
  for (let x = x1; x <= x2 + 0.01; x += step) posts.push(n(x));
  return (
    `<path d="M${x1} ${n(y - 6.4)} L${x2} ${n(y - 6.4)} M${x1} ${n(y - 3)} L${x2} ${n(y - 3)}" stroke="#9C7A50" stroke-width="0.6"/>` +
    posts.map((x) => `<path d="M${x} ${n(y - 8)} L${x} ${y}" stroke="#7E5E3A" stroke-width="0.8" stroke-linecap="round"/>`).join("")
  );
};

/** The place of the first one, whom they praised: a deep red-brown. */
const FIRST = "#9C4F36";
/** The place of the poor Muslim: a plain green. */
const POOR = "#5E8A52";
/** The places of the women, and their voice: a soft rose. */
const ROSE = "#C77D8E";
/** Umar's place and voice: a deep brown. */
const UMAR = "#6B4A2E";
/** The place and voice of the one who came to Madinah: a muted violet. */
const CAME = "#7E6A9A";

// Better than an earth full. Sahl said: a man passed by the Messenger of Allah ﷺ, and he asked: what do you say about
// this one? They said: if he proposes, he ought to be married; if he intercedes, his intercession accepted; and if he
// speaks, he listened to. He kept silent. Then a man of the poor Muslims passed by, and he asked: what do you say about
// this one? They said: if he proposes, he ought not to be married; if he intercedes, his intercession not accepted; and
// if he speaks, he not listened to. The Messenger of Allah ﷺ said: this one is better than an earth full of the like of
// that one (Sahih al-Bukhari 5091). No one is drawn: the masjid of Madinah, his place, a golden ring, their places
// about him, a home on the left and a road across the land. The first one's place comes along the road and stops; his
// voice asks, and a soft pale ring comes about it. Their voice answers: a dashed way goes from it to the home's door,
// which lights; its voice speaks, and soft golden rings come about their places: heard. It goes on its way, and the
// poor Muslim's place comes along the road and stays. Their voice answers again: a grey dashed way goes to the door,
// which stays dark, and its voice is faint and grey. His voice speaks, and a soft golden ring comes about the poor
// one's place; places like the first fill the land, then grow pale, and glints come about the poor one's place.
function betterThanAnEarthFull(): SignArt {
  const his: [number, number] = [96, 100];
  const stop: [number, number] = [52, 112];
  const door: [number, number] = [22, 92];
  const theirs: [number, number][] = [
    [84, 105.4],
    [106, 106],
    [118, 102]
  ];
  const likes: [number, number][] = [
    ...[8, 20, 32, 44, 56, 68, 80, 92, 104, 116, 128, 140, 152].map((x): [number, number] => [x, 70]),
    ...[4, 46, 58, 70, 82, 94, 104, 156].map((x): [number, number] => [x, 79]),
    ...[6, 50, 62, 74, 86].map((x): [number, number] => [x, 88]),
    [8, 102],
    [66, 97],
    [140, 98],
    [152, 104],
    [150, 113],
    [130, 113.4],
    [112, 114]
  ];
  const toDoor = `M${n(stop[0] - 2)} ${n(stop[1] - 1.4)} Q36 104 ${n(door[0] - 1.8)} ${n(door[1] + 0.6)}`;
  return {
    kind: "better-than-an-earth-full",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(26, 16) },
      { name: "a cloud", svg: cloud(84, 24, 0.4, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground of Madinah", svg: plainLand("#E2CB9C", [[60, 118], [100, 118], [146, 118]]) },
      { name: "the road across the land", svg: road(0, 160, 113) },
      { name: "a home of Madinah", svg: home(door[0], door[1], 20, 14) },
      ...palms([[38, 90, 12]], "Madinah"),
      { name: "the masjid", svg: madinahMasjid(112, 90, 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "their places, sitting about him", svg: places(theirs) },
      {
        name: "the first one's place: coming along the road, then going on its way",
        svg: someone(stop[0], stop[1], 1.6, FIRST),
        keys: track({
          opacity: [
            [0.546, 1],
            [0.556, 0]
          ],
          xy: [
            [0.03, -64, 0],
            [0.086, 0, 0],
            [0.514, 0, 0],
            [0.556, 60, 0]
          ]
        })
      },
      { name: "his voice: what do you say about this one", svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.07, 0.076, 0.19, 0.196), loop: speaking },
      { name: "the one in question: a soft pale ring about the first one's place", svg: care(stop[0], stop[1], 4.4, 2.6, "#FFF3CF"), keys: showFor(0.16, 0.172, 0.508, 0.514), loop: soft },
      { name: "their voice: what they say of the first one", svg: arcsLeft(80.8, 102.6, FOLK), keys: showFor(0.2, 0.206, 0.45, 0.456), loop: speaking },
      { name: "proposing: a dashed way from the first one's place to the door of the home", svg: way(toDoor), keys: showFor(0.27, 0.282, 0.508, 0.514) },
      { name: "to be married: the door of the home, lit", svg: litDoor(door[0], door[1]), keys: showFor(0.29, 0.302, 0.508, 0.514), loop: soft },
      { name: "the first one's voice: interceding and speaking", svg: arcs(n(stop[0] + 3.4), n(stop[1] - 2.8), FIRST), keys: showFor(0.39, 0.396, 0.45, 0.456), loop: speaking },
      {
        name: "heard: soft golden rings about their places",
        svg: theirs.map(([x, y]) => care(x, n(y + 0.4), 3.4, 2, SOFT_GOLD)).join(""),
        keys: showFor(0.41, 0.422, 0.508, 0.514),
        loop: soft
      },
      {
        name: "the poor Muslim's place: coming along the road, and staying",
        svg: someone(stop[0], stop[1], 1.6, POOR),
        keys: track({
          xy: [
            [0.53, -64, 0],
            [0.574, 0, 0]
          ]
        })
      },
      { name: "their voice: what they say of the poor one", svg: arcsLeft(80.8, 102.6, FOLK), keys: showFor(0.634, 0.64, 0.694, 0.7), loop: speaking },
      { name: "not to be married: a grey dashed way from the poor one's place to the door, which stays dark", svg: way(toDoor, GREY, 1), keys: showFor(0.65, 0.662, 0.756, 0.768) },
      {
        name: "nor heard: the poor one's voice, faint and grey",
        svg: arcs(n(stop[0] + 3.4), n(stop[1] - 2.8), GREY),
        keys: track({
          opacity: [
            [0.668, 0],
            [0.68, 0.5],
            [0.756, 0.5],
            [0.768, 0]
          ]
        })
      },
      { name: "his voice: this one is better", svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.756, 0.762, 0.95, 0.956), loop: speaking },
      { name: "better: a soft golden ring about the poor one's place", svg: care(stop[0], stop[1], 4.4, 2.6, SOFT_GOLD), keys: showAt(0.79, 0.802), loop: soft },
      {
        name: "an earth full of the likes of the first: places filling the land",
        svg: places(likes, 1.3, FIRST),
        keys: track({
          opacity: [
            [0.88, 0],
            [0.9, 1],
            [0.928, 1],
            [0.94, 0.4]
          ]
        })
      },
      {
        name: "better than all of them: glints about the poor one's place",
        svg: glints(
          [
            [n(stop[0] - 4.6), n(stop[1] - 3.6)],
            [n(stop[0] + 4.4), n(stop[1] - 4.4)]
          ],
          0.8
        ),
        keys: showAt(0.93, 0.942),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Sahl: a man passed by him. He asked:",
      "What do you say about this one? They:",
      "If he proposes, he should be married;",
      "If he intercedes or speaks, he is heard.",
      "He kept silent; a poor Muslim passed by.",
      "They: not to be married, nor heard.",
      "He said: this poor man is better than",
      "An earth full of the likes of the first."
    ])
  };
}

// A day for the women. Abu Sa'id al-Khudri said: the women said to the Prophet ﷺ: the men have taken all your time from
// us, so fix a day for us of your own. He promised them a day on which he met them, and he taught them and gave them
// commands (Sahih al-Bukhari 101; what he said to them that day is left out). No one is drawn: the masjid of Madinah on
// the left, his place, a golden ring, before it, with places crowding about him; Abu Sa'id's place a little apart; and
// on the right, on the open ground among palms, the places of the women. Abu Sa'id's voice tells of it, and the women's
// voice speaks. Two more places come to crowd about him, and a soft pale ring comes about him and the crowd: all his
// time. A soft pale ring comes about the women's places: a day for them. His voice promises; night falls and lifts,
// the crowd goes, and a new day's sun rises, and his place goes over to the women's places. His voice speaks, with
// golden glints, sparks rise from the women's places, and a soft golden ring comes about them.
function aDayForTheWomen(): SignArt {
  const his: [number, number] = [58, 100];
  const met: [number, number] = [128, 99];
  const abuSaid: [number, number] = [86, 110];
  const crowd: [number, number][] = [
    [48, 104],
    [52, 108.6],
    [63, 108.4],
    [69, 104.4],
    [68, 98.2],
    [47, 98.6]
  ];
  const more: [number, number][] = [
    [40, 106.6],
    [75, 108]
  ];
  const women: [number, number][] = [
    [116, 104.4],
    [124, 107.6],
    [133, 105],
    [141, 107.6]
  ];
  return {
    kind: "a-day-for-the-women",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun of that day, gone with the night",
        svg: sun(26, 18),
        keys: track({
          opacity: [
            [0.652, 1],
            [0.672, 0]
          ]
        })
      },
      {
        name: "the day promised: its sun, rising",
        svg: sun(136, 18),
        keys: track({
          opacity: [
            [0.69, 0],
            [0.7, 1]
          ],
          xy: [
            [0.69, 0, 22],
            [0.74, 0, 0]
          ]
        })
      },
      { name: "a cloud", svg: cloud(88, 26, 0.4, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground of Madinah", svg: plainLand("#E2CB9C", [[20, 117], [96, 118], [150, 117]]) },
      { name: "the masjid", svg: madinahMasjid(4, 90, 0.8) },
      ...palms(
        [
          [108, 92, 12],
          [150, 90, 13]
        ],
        "Madinah"
      ),
      { name: "a night, falling and lifting: over the sky", svg: NIGHT_OVER_SKY, keys: showFor(0.652, 0.672, 0.69, 0.71) },
      { name: "a night, falling and lifting: over the land", svg: NIGHT_OVER_LAND, keys: showFor(0.652, 0.672, 0.69, 0.71) },
      {
        name: "his place, a golden ring: going over to the places of those who asked",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.706, 0, 0],
            [0.744, n(met[0] - his[0]), n(met[1] - his[1])]
          ]
        })
      },
      {
        name: "the places crowding about him, gone with the night",
        svg: places(crowd),
        keys: track({
          opacity: [
            [0.656, 1],
            [0.672, 0]
          ]
        })
      },
      {
        name: "two more places, coming to crowd about him",
        svg: places(more),
        keys: track({
          opacity: [
            [0.226, 0],
            [0.24, 1],
            [0.656, 1],
            [0.672, 0]
          ]
        })
      },
      { name: "all his time taken: a soft pale ring about him and the crowd", svg: care(57, 103.4, 20, 7.6, "#FFF3CF"), keys: showFor(0.25, 0.262, 0.656, 0.668), loop: soft },
      { name: "Abu Sa'id's place", svg: someone(abuSaid[0], abuSaid[1], 1.6, ITS_VOICE) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcs(n(abuSaid[0] + 3.4), n(abuSaid[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "the places of those who asked for a day", svg: places(women, 1.6, ROSE) },
      { name: "the voice of those who asked: a day for us", svg: arcsLeft(n(women[0][0] - 3.2), n(women[0][1] - 2.8), ROSE), keys: showFor(0.12, 0.126, 0.546, 0.552), loop: speaking },
      { name: "a day for them: a soft pale ring about the places of those who asked", svg: care(128.6, 106.2, 16, 4.4, "#FFF3CF"), keys: showFor(0.44, 0.452, 0.84, 0.852), loop: soft },
      { name: "his voice: promising them a day", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.612, 0.618, 0.642, 0.648), loop: speaking },
      { name: "his voice: lessons and commands", svg: arcs(n(met[0] + 3.4), n(met[1] - 2.8), GOLD), keys: showFor(0.81, 0.816, 0.95, 0.956), loop: speaking },
      {
        name: "his lessons: golden glints over his voice",
        svg: glints(
          [
            [n(met[0] + 6.4), n(met[1] - 7)],
            [n(met[0] + 9.6), n(met[1] - 3.2)]
          ],
          0.8,
          "#FFD45A"
        ),
        keys: showFor(0.826, 0.838, 0.95, 0.956),
        loop: twinkle()
      },
      spark("learned: a spark rising from the places of those who asked 1", women[0][0], n(women[0][1] - 5), 0.85, 0.9),
      spark("learned: a spark rising from the places of those who asked 2", women[2][0], n(women[2][1] - 5), 0.87, 0.92),
      spark("learned: a spark rising from the places of those who asked 3", women[3][0], n(women[3][1] - 5), 0.89, 0.94),
      { name: "taught: a soft golden ring about the places of those who asked", svg: care(128.6, 106.2, 16, 4.4, SOFT_GOLD), keys: showAt(0.84, 0.852), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Abu Sa'id: the women said to him:",
      "The men have taken all your time,",
      "So fix a day of yours for us.",
      "He promised them a day and met them;",
      "He gave them lessons and commandments."
    ])
  };
}

// On the very edge. Ibn Abbas said, about the ayah (Quran 22:11): a man would come to Madinah; then if his wife gave
// birth to a boy and his mares had foals, he would say: this religion is good; and if his wife did not give birth and
// his mares had no foals, he would say: this religion is bad (Sahih al-Bukhari 4742). No one is drawn: a road over the
// land to Madinah, with its masjid and palms; a home there, and a pen with two mares by it. The place of the one who
// came comes along the road from far off to the home. A small place shows at its door: a boy born; two foals come by
// the mares. Its voice speaks, and a soft warm glow comes about its place. Then the other way: the small place and the
// foals fade, and grey dashed rings show where they were; its voice speaks in grey, its place sways this way and that,
// unsteady, and a grey dashed ring comes about it.
function onTheVeryEdge(): SignArt {
  const came: [number, number] = [74, 104];
  const boy: [number, number] = [90.2, 99.8];
  const mares: [number, number][] = [
    [119, 108.6],
    [139, 108.6]
  ];
  const foals: [number, number][] = [
    [129, 110.6],
    [149.4, 110.6]
  ];
  return {
    kind: "on-the-very-edge",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(22, 16) },
      { name: "a cloud", svg: cloud(70, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[14, 116], [60, 117], [104, 118]]) },
      { name: "the road to Madinah", svg: road(0, 96, 104) },
      { name: "the masjid of Madinah", svg: madinahMasjid(116, 84, 0.62) },
      ...palms(
        [
          [106, 86, 12],
          [154, 86, 12]
        ],
        "Madinah"
      ),
      { name: "a home in Madinah", svg: home(92, 98, 18, 13) },
      { name: "a paddock by the home", svg: pen(112, 156, 112, 11) },
      ...mares.map(([x, y], i): SignPart => ({ name: `a mare in the paddock ${i + 1}`, svg: horse(x, y, 0.12, i === 1), loop: { move: "bob", ms: 2600 + i * 400, y: -0.4 } })),
      ...foals.map(
        ([x, y], i): SignPart => ({
          name: `the mares had foals: a foal ${i + 1}`,
          svg: horse(x, y, 0.07, i === 0),
          keys: track({
            opacity: [
              [at(0.35, i), 0],
              [at(0.362, i), 1],
              [0.68, 1],
              [0.692, 0]
            ]
          })
        })
      ),
      {
        name: "the place of the one who came: coming along the road, then unsteady",
        svg: someone(came[0], came[1], 1.6, CAME),
        keys: track({
          xy: [
            [0.03, -86, 0],
            [0.1, 0, 0],
            [0.84, 0, 0],
            [0.856, -1.6, 0],
            [0.872, 1.6, 0],
            [0.888, -1.4, 0],
            [0.904, 1.2, 0],
            [0.92, 0, 0]
          ]
        })
      },
      {
        name: "a newborn: a small place at the door of the home",
        svg: someone(boy[0], boy[1], 1.1, "#9C7CC0"),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.202, 1],
            [0.66, 1],
            [0.672, 0]
          ]
        })
      },
      {
        name: "a newborn: a small light at the door",
        svg: glow(boy[0], n(boy[1] - 1), 4, "#FFE7A0", 0.26),
        keys: track({
          opacity: [
            [0.2, 0],
            [0.212, 1],
            [0.66, 1],
            [0.672, 0]
          ]
        }),
        loop: soft
      },
      { name: "the voice of the one who came: this religion is good", svg: arcs(n(came[0] + 3.4), n(came[1] - 2.8), CAME), keys: showFor(0.5, 0.506, 0.594, 0.6), loop: speaking },
      {
        name: "pleased: a soft warm glow about the place of the one who came",
        svg: wash(came[0], n(came[1] - 1), 7, 4, "#FFD866", 0.3),
        keys: track({
          opacity: [
            [0.51, 0],
            [0.522, 1],
            [0.66, 1],
            [0.672, 0]
          ]
        })
      },
      { name: "none born: a grey dashed ring at the door", svg: greyRing(boy[0], boy[1], 2.6, 1.6), keys: showAt(0.69, 0.702) },
      { name: "no foals: grey dashed rings by the mares", svg: foals.map(([x, y]) => greyRing(x, n(y - 1.6), 3.4, 1.8)).join(""), keys: showAt(0.71, 0.722) },
      { name: "the voice of the one who came: this religion is bad", svg: arcs(n(came[0] + 3.4), n(came[1] - 2.8), GREY), keys: showFor(0.82, 0.826, 0.93, 0.936), loop: speaking },
      { name: "on the very edge: a grey dashed ring about the place of the one who came", svg: greyRing(came[0], came[1], 4, 2.4), keys: showAt(0.93, 0.942) }
    ],
    words: linesOn(SIX, [
      "Ibn Abbas: a man would come to Madinah.",
      "If the man's wife gave birth to a boy",
      "And the man's mares had foals,",
      "The man said: this religion is good.",
      "But if no child was born, and no foals,",
      "The man said: this religion is bad."
    ])
  };
}

/** The time `t`, a little later for the second of two. */
const at = (t: number, i: number) => Number((t + i * 0.02).toFixed(3));

// Too drowsy to pray. Aishah said: the Messenger of Allah ﷺ said: if one of you is drowsy while praying, let him sleep
// until his sleep leaves him, for when one of you prays drowsy, he does not know whether he asks forgiveness or speaks
// ill of himself (Sahih al-Bukhari 212; the English page: whether one is asking for forgiveness or for a bad thing for
// oneself). No one is drawn: a room at night, a window on the night with its stars and the moon, a lamp on a shelf, a
// mat for the prayer and bedding by the wall. The place of one who prays stands on the mat; soft blue specks come over
// it, and it sways: drowsy. It goes to the bedding and a soft blue comes over it: asleep; the moon goes across the
// window, and the blue lifts: its slumber over, and a soft pale ring comes about it. Then a faint place shows on the mat
// with the blue specks: one who prays drowsy; a soft golden voice and a grey one come from it in turn, then both
// together, fainter: it does not know which it asks. A soft golden ring comes about the place that rested.
function tooDrowsyToPray(): SignArt {
  const mat: [number, number] = [74, 97.6];
  const bed: [number, number] = [124, 104];
  // A voice shown in turn at the given times, then both together, fainter, at the end: it does not know which it asks.
  const inTurn = (shown: [number, number][]) =>
    track({
      opacity: [
        ...shown.flatMap(([from, hide]): [number, number][] => [
          [from, 0],
          [Number((from + 0.006).toFixed(3)), 1],
          [hide, 1],
          [Number((hide + 0.006).toFixed(3)), 0]
        ]),
        [0.88, 0],
        [0.892, 0.6]
      ]
    });
  return {
    kind: "too-drowsy-to-pray",
    ms: 10000,
    parts: [
      { name: "the room at night: its wall and its floor", svg: `<rect width="160" height="120" fill="#3B3654"/><rect y="72" width="160" height="48" fill="#4E4566"/><path d="M0 72 L160 72" stroke="#2E2A44" stroke-width="0.8"/>` },
      { name: "a window on the night", svg: `<rect x="18" y="14" width="28" height="24" rx="1" fill="#16284C"/>` },
      { name: "stars, through the window", svg: stars([[21, 18], [28, 20], [36, 34], [43, 33]]), loop: { move: "twinkle", ms: 2600, low: 0.6 } },
      {
        name: "the moon, through the window: going across as the night goes on",
        svg: glow(25, 31, 5, "#F4EBC8", 0.1) + `<circle cx="25" cy="31" r="2.4" fill="#F4EBC8"/>`,
        keys: track({
          xy: [
            [0.42, 0, 0],
            [0.5, 14, -10]
          ]
        })
      },
      { name: "the frame of the window", svg: `<path d="M18 14 L46 14 L46 38 L18 38 Z M32 14 L32 38" stroke="#2A2438" stroke-width="1.2" fill="none"/>` },
      { name: "the roof of the room", svg: `<rect width="160" height="6" fill="#2C283E"/>` },
      { name: "a shelf on the wall", svg: `<rect x="96" y="50" width="20" height="1.6" rx="0.4" fill="#5A4A3A"/>` },
      { name: "a lamp on the shelf, its light", svg: glow(106, 46.6, 8, "#FFD27A", 0.14) + `<path d="M103 50 Q106 46.8 109 50 Z" fill="#B07A3A"/><circle cx="106" cy="46.4" r="0.9" fill="#FFE29A"/>`, loop: soft },
      { name: "a mat for the prayer", svg: `<path d="M56 95.2 L92 95.2 L95 100.6 L53 100.6 Z" fill="#6E6250"/><path d="M55 97 L93 97 M54.2 98.8 L93.8 98.8" stroke="#5A503F" stroke-width="0.3"/>` },
      { name: "the bedding by the wall", svg: bedding(bed[0], bed[1]) },
      {
        name: "the place of one who prays: on the mat, swaying, then going to the bedding",
        svg: someone(mat[0], mat[1], 1.6, LIGHT),
        keys: track({
          xy: [
            [0.11, 0, 0],
            [0.122, -0.8, 0],
            [0.134, 0.8, 0],
            [0.146, 0, 0],
            [0.27, 0, 0],
            [0.33, n(bed[0] - mat[0]), n(bed[1] - 0.6 - mat[1])]
          ]
        })
      },
      { name: "drowsy: soft blue specks over the place on the mat", svg: specks(mat[0], mat[1]), keys: showFor(0.08, 0.092, 0.256, 0.268), loop: twinkle(1600) },
      { name: "asleep: a soft blue over the place on the bedding", svg: wash(bed[0], n(bed[1] - 1), 10, 4, "#7EA6E0", 0.3), keys: showFor(0.34, 0.352, 0.5, 0.512) },
      { name: "its slumber over: a soft pale ring about the place on the bedding", svg: care(bed[0], n(bed[1] - 0.6), 6, 3, "#FFF3CF"), keys: showFor(0.516, 0.528, 0.9, 0.912), loop: soft },
      {
        name: "one who prays drowsy: a faint place on the mat, with the blue specks",
        svg: someone(mat[0], mat[1], 1.6, LIGHT) + specks(mat[0], mat[1]),
        keys: track({
          opacity: [
            [0.53, 0],
            [0.544, 0.55]
          ]
        })
      },
      {
        name: "asking for forgiveness: a soft golden voice from it, in turn",
        svg: arcs(n(mat[0] + 3.4), n(mat[1] - 2.8), SOFT_GOLD),
        keys: inTurn([
          [0.612, 0.64],
          [0.68, 0.708],
          [0.808, 0.836]
        ])
      },
      {
        name: "or a bad thing for oneself: a grey voice from it, in turn",
        svg: arcsLeft(n(mat[0] - 3.2), n(mat[1] - 2.8), "#9A98A8"),
        keys: inTurn([
          [0.646, 0.674],
          [0.714, 0.742],
          [0.842, 0.87]
        ])
      },
      { name: "the better way: a soft golden ring about the place that rested", svg: care(bed[0], n(bed[1] - 0.6), 6, 3, SOFT_GOLD), keys: showAt(0.9, 0.912), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Aishah: he said: if one of you is drowsy",
      "While praying, he should go to bed till",
      "His slumber is over; for praying drowsy,",
      "One does not know whether one asks for",
      "Forgiveness, or a bad thing for oneself."
    ])
  };
}

// Take it without greed. Umar said: the Messenger of Allah ﷺ used to give me something, and I would say: give it to one
// poorer than me. He said: take it; if something of this wealth comes to you while you are not looking out for it and
// not asking, take it; and what does not, do not let yourself run after it (Sahih al-Bukhari 1473). No one is drawn: the
// masjid of Madinah, his place, a golden ring, before it, and Umar's place on the open ground. Coins go from his place to
// Umar's: his gift. Umar's voice speaks: a place shows far off on the left, poorer, and a dashed way goes from Umar's
// place to it. His voice speaks: the way fades, and a soft golden ring comes about Umar's place and the coins: take it.
// Coins come by themselves along a dashed way from far off to Umar's place, which stays where it is, and a soft golden
// ring and glints come about them. Far off, coins show that do not come; a grey dashed way toward them shows and fades,
// and Umar's place stays where it is, with glints about it.
function takeItWithoutGreed(): SignArt {
  const his: [number, number] = [104, 100];
  const umar: [number, number] = [74, 104];
  const poorer: [number, number] = [34, 108];
  const gift: [number, number] = [79, 105];
  const come: [number, number] = [78, 109];
  const far: [number, number] = [20, 90];
  return {
    kind: "take-it-without-greed",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(136, 16) },
      { name: "a cloud", svg: cloud(70, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground before the masjid", svg: plainLand("#E2CB9C", [[14, 117], [60, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(112, 90, 0.8) },
      ...palms([[52, 90, 12]], "Madinah"),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6, UMAR) },
      {
        name: "his gift: coins, going from his place to Umar's",
        svg: coins(gift[0], gift[1], 2),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1]
          ],
          xy: [
            [0.05, 22, -3],
            [0.1, 0, 0]
          ]
        })
      },
      { name: "Umar's voice: give it to one poorer than me", svg: arcsLeft(n(umar[0] - 3.2), n(umar[1] - 2.8), UMAR), keys: showFor(0.104, 0.11, 0.274, 0.28), loop: speaking },
      { name: "one poorer: a place far off on the left", svg: someone(poorer[0], poorer[1], 1.4, FOLK), keys: showAt(0.19, 0.202) },
      { name: "to the poorer one: a dashed way from Umar's place to it", svg: way(`M${n(umar[0] - 3)} ${n(umar[1] + 1.4)} Q54 112 ${n(poorer[0] + 2.6)} ${n(poorer[1] + 0.4)}`), keys: showFor(0.21, 0.222, 0.36, 0.372) },
      { name: "his voice: take it", svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.34, 0.346, 0.95, 0.956), loop: speaking },
      { name: "take it: a soft golden ring about Umar's place and the coins", svg: care(n(umar[0] + 2.4), n(umar[1] + 0.6), 6.6, 3.4, SOFT_GOLD), keys: showAt(0.38, 0.392), loop: soft },
      { name: "the way it comes: dashed, from far off to Umar's place", svg: way(`M154 115 Q118 117 ${n(come[0] + 2.8)} ${n(come[1] + 0.4)}`), keys: showFor(0.5, 0.512, 0.7, 0.712) },
      {
        name: "something of this wealth: coins coming by themselves",
        svg: coins(come[0], come[1], 1),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.51, 1]
          ],
          xy: [
            [0.51, 74, 5.6],
            [0.58, 0, 0]
          ]
        })
      },
      {
        name: "taken without greed: a soft golden ring and glints about the coins that came",
        svg:
          care(come[0], n(come[1] - 0.4), 3.6, 2, SOFT_GOLD) +
          glints(
            [
              [n(come[0] - 4), n(come[1] - 3)],
              [n(come[0] + 4.2), n(come[1] - 3.6)]
            ],
            0.7
          ),
        keys: showAt(0.68, 0.692),
        loop: soft
      },
      { name: "not given: coins far off, that do not come", svg: coins(far[0], far[1], 2), keys: showAt(0.82, 0.832) },
      { name: "do not run for it: a grey dashed way toward them, that fades", svg: way(`M${n(umar[0] - 2.6)} ${n(umar[1] - 1.4)} Q42 94 ${n(far[0] + 3.2)} ${n(far[1] + 0.4)}`, GREY, 1), keys: showFor(0.85, 0.862, 0.9, 0.912) },
      {
        name: "Umar's place stays where it is: glints about it",
        svg: glints(
          [
            [n(umar[0] - 3.6), n(umar[1] - 4.2)],
            [n(umar[0] + 1), n(umar[1] - 6)]
          ],
          0.7
        ),
        keys: showAt(0.92, 0.932),
        loop: twinkle()
      }
    ],
    words: linesOn(SIX, [
      "Umar: he would give me something, and I",
      "Would say: give it to one poorer than me.",
      "He said: take it. If you are given some",
      "Of this wealth without asking for it",
      "Or having greed for it, take it;",
      "And if not given, do not run for it."
    ])
  };
}

// Made up in Sha'ban. Aishah said: I would have days of the fast of Ramadan to make up, and I could not make them up
// except in Sha'ban. Yahya, who told it on from her, said: it was her being busy with the Prophet ﷺ (Sahih al-Bukhari
// 1950; the English page: she used to be busy serving him). No one is drawn: across the sky the twelve months, as
// crescents, from Ramadan on the left to Sha'ban on the right; below, a home of Madinah, his place, a golden ring, and
// Aishah's place. Aishah's voice tells of it. Ramadan's crescent lights, and three small grey marks show under it: days
// missed. A soft ring goes along the months with the marks under it, still grey, to the month before Sha'ban; then
// Sha'ban's crescent lights, the marks come under it and turn golden, and a spark rises: made up. Then Aishah's place
// goes back and forth between the home's door and his place, busy, with glints, and a soft golden ring comes about it.
function madeUpInShaban(): SignArt {
  const months = Array.from({ length: 12 }, (_, i) => 14 + 12 * i);
  const ramadan = months[0];
  const shaban = months[11];
  const his: [number, number] = [100, 104];
  const aishah: [number, number] = [86, 106];
  const missed: [number, number][] = [
    [n(ramadan - 3.4), 31],
    [ramadan, 31],
    [n(ramadan + 3.4), 31]
  ];
  const along = shaban - ramadan;
  return {
    kind: "made-up-in-shaban",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      {
        name: "the months, from Ramadan to Sha'ban: twelve crescents",
        svg: `<rect x="6" y="14" width="148" height="22" rx="3" fill="#FFFFFF" opacity="0.32"/>` + months.map((x) => crescent(x, 22, 2.6, 1, "#D9CDA8")).join("")
      },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[18, 117], [120, 118], [150, 116]]) },
      { name: "a home of Madinah", svg: home(70, 100, 26, 17) },
      ...palms(
        [
          [30, 96, 13],
          [136, 95, 13]
        ],
        "Madinah"
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Aishah's place: busy, going back and forth",
        svg: someone(aishah[0], aishah[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.77, 0, 0],
            [0.79, -12, -3],
            [0.81, 0, 0],
            [0.83, -12, -3],
            [0.85, 0, 0],
            [0.87, -12, -3],
            [0.89, 0, 0]
          ]
        })
      },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 3.4), n(aishah[1] - 2.8), ITS_VOICE), keys: showFor(0.03, 0.036, 0.204, 0.21), loop: speaking },
      { name: "Ramadan: its crescent, lit", svg: glow(ramadan, 22, 5.6, "#FFF3C0", 0.3) + crescent(ramadan, 22, 2.6, 1, GOLD), keys: showAt(0.06, 0.072), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "days of Ramadan missed: three small grey marks, carried along the months",
        svg: missed.map((d) => mark(d, GREY)).join(""),
        keys: track({
          opacity: [
            [0.12, 0],
            [0.132, 1],
            [0.6, 1],
            [0.612, 0]
          ],
          xy: [
            [0.28, 0, 0],
            [0.44, along - 12, 0],
            [0.54, along - 12, 0],
            [0.56, along, 0]
          ]
        })
      },
      {
        name: "the months going by: a soft ring along the crescents",
        svg: care(ramadan, 23, 5, 6, "#FFF3CF"),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.28, 1],
            [0.56, 1],
            [0.572, 0]
          ],
          xy: [
            [0.28, 0, 0],
            [0.44, along - 12, 0],
            [0.54, along - 12, 0],
            [0.56, along, 0]
          ]
        })
      },
      { name: "Sha'ban: its crescent, lit", svg: glow(shaban, 22, 5.6, "#FFF3C0", 0.3) + crescent(shaban, 22, 2.6, 1, GOLD), keys: showAt(0.52, 0.532), loop: { move: "twinkle", ms: 1600, low: 0.7, phase: 0.5 } },
      { name: "made up in Sha'ban: the marks, golden", svg: missed.map(([x, y]) => mark([n(x + along), y], GOLD)).join(""), keys: showAt(0.6, 0.612) },
      spark("made up: a spark rising from the days fasted", shaban, 28, 0.62, 0.68),
      {
        name: "busy serving him: glints about the way between the door and his place",
        svg: glints(
          [
            [80, 99],
            [88, 98.4]
          ],
          0.7
        ),
        keys: showFor(0.79, 0.802, 0.95, 0.956),
        loop: twinkle()
      },
      { name: "busy serving him: a soft golden ring about Aishah's place", svg: care(aishah[0], aishah[1], 4, 2.4, SOFT_GOLD), keys: showAt(0.91, 0.922), loop: soft }
    ],
    words: linesOn(FOUR, ["Aishah: I missed some days of Ramadan,", "But could not make them up except", "In the month of Sha'ban.", "Yahya said: she was busy serving him."])
  };
}

export const EDGE_ART = {
  "better-than-an-earth-full": betterThanAnEarthFull,
  "a-day-for-the-women": aDayForTheWomen,
  "on-the-very-edge": onTheVeryEdge,
  "too-drowsy-to-pray": tooDrowsyToPray,
  "take-it-without-greed": takeItWithoutGreed,
  "made-up-in-shaban": madeUpInShaban
} as const;
