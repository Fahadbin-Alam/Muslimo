import { glow, n, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { cover, crooked, GREY } from "./lovedArt";
import { dish, goldHeap } from "./worthArt";
import { GOLD, someone, VOICE, WARM, wash } from "./worshipArt";
import { care, dayAround, jug, lightIn, palms, sparkRising, track } from "./daysArt";
import { faithIn, lookLine, waterskin } from "./truthArt";

/**
 * Good ways with people, drawn as the scenes of truth are (truthArt.ts): making room in a gathering, the rights of the
 * road, honest trade, the six he was told to keep close, a small gift to the next home, the meal of dates that they
 * will be asked about, and the valley of gold. Only the land, the sky, buildings, things and plants are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand, an eye or a face: where someone went, a dashed way
 * shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is drawn for
 * Allah, and nothing comes down from the sky: a call on one's Lord is a spark that rises.
 */

/** A long woven mat on the ground, from x1 to x2, its middle at y. */
const mat = (x1: number, x2: number, y: number) =>
  `<rect x="${x1}" y="${n(y - 2.6)}" width="${n(x2 - x1)}" height="5.2" rx="0.6" fill="#D8B46A"/>` +
  `<path d="M${x1} ${n(y - 0.9)} L${x2} ${n(y - 0.9)} M${x1} ${n(y + 0.9)} L${x2} ${n(y + 0.9)}" stroke="#C49C52" stroke-width="0.3"/>` +
  `<rect x="${n(x1 + 0.4)}" y="${n(y - 2.2)}" width="${n(x2 - x1 - 0.8)}" height="4.4" rx="0.4" stroke="#B98F48" stroke-width="0.4" fill="none"/>`;

/** A market stall with its middle at x and its feet at y: two posts, a striped awning, and a table. */
const stall = (x: number, y: number) => {
  let stripes = "";
  for (let i = 0; i < 7; i += 1) stripes += `<rect x="${n(x - 14 + i * 4)}" y="${n(y - 19.4)}" width="4" height="4" fill="${i % 2 ? "#F4E7C8" : "#C2603A"}"/>`;
  let edge = "";
  for (let i = 0; i < 7; i += 1) edge += `<path d="M${n(x - 14 + i * 4)} ${n(y - 15.4)} A2 1.4 0 0 0 ${n(x - 10 + i * 4)} ${n(y - 15.4)} Z" fill="${i % 2 ? "#F4E7C8" : "#C2603A"}"/>`;
  return (
    `<rect x="${n(x - 12.6)}" y="${n(y - 17)}" width="1.2" height="17" fill="#8A5A33"/><rect x="${n(x + 11.4)}" y="${n(y - 17)}" width="1.2" height="17" fill="#8A5A33"/>` +
    stripes +
    edge +
    `<rect x="${n(x - 14.4)}" y="${n(y - 20.2)}" width="28.8" height="1" fill="#8A5A33"/>` +
    `<rect x="${n(x - 10)}" y="${n(y - 6.4)}" width="20" height="1.6" fill="#A87444"/>` +
    `<path d="M${n(x - 8.6)} ${n(y - 4.8)} L${n(x - 8.6)} ${y} M${n(x + 8.6)} ${n(y - 4.8)} L${n(x + 8.6)} ${y}" stroke="#8A5A33" stroke-width="0.9"/>`
  );
};

/** A small tear in a sack at (x, y): a fault in the goods. */
const fault = (x: number, y: number) =>
  `<path d="M${n(x - 1.3)} ${n(y - 0.7)} L${n(x - 0.4)} ${n(y + 0.4)} L${n(x + 0.3)} ${n(y - 0.5)} L${n(x + 1.3)} ${n(y + 0.6)}" stroke="#5E3C1E" stroke-width="0.55" fill="none" stroke-linecap="round"/>`;

/** A crooked voice from (x, y), facing left: the words of a lie. */
const crookedLeft = (x: number, y: number) =>
  `<path d="M${x} ${n(y + 1.2)} l-1 -1.4 l-1 1.4 l-1 -1.4 l-1 1.4 M${x} ${n(y - 1.2)} l-1.4 -1.6 l-1.4 1.6 l-1.4 -1.6 l-1.4 1.6" stroke="${GREY}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;

/** A grey tangle at (x, y): a wrong. */
const tangle = (x: number, y: number) =>
  `<path d="M${n(x - 3.4)} ${y} Q${n(x - 2)} ${n(y - 3)} ${n(x - 0.4)} ${n(y - 0.4)} Q${n(x + 1.2)} ${n(y + 2.4)} ${n(x + 2.6)} ${n(y - 0.8)} Q${n(x + 3.4)} ${n(y - 2.8)} ${n(x + 1)} ${n(y - 2.6)} Q${n(x - 1.6)} ${n(y - 2.2)} ${n(x - 1.8)} ${n(y + 1.2)}" stroke="${GREY}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;

/** A short dashed golden line from (x1, y1) to (x2, y2): a look. */
const gaze = (x1: number, y1: number, x2: number, y2: number) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${GOLD}" stroke-width="0.45" stroke-dasharray="0.8 0.8" stroke-linecap="round"/>`;

/** A cluster of dates on its stalk, its middle at (x, y): yellow, dry and fresh dates together. */
const cluster = (x: number, y: number) =>
  `<path d="M${n(x - 3.6)} ${n(y - 3.4)} Q${x} ${n(y - 4.6)} ${n(x + 3.8)} ${n(y - 3)}" stroke="#C9A25A" stroke-width="0.7" fill="none"/>` +
  [
    [-3, -1.6, "#E2B33C"],
    [-1.2, -2, "#7A3A1C"],
    [0.6, -1.8, "#A2441F"],
    [2.4, -1.6, "#E2B33C"],
    [-2.2, -0.2, "#A2441F"],
    [-0.4, -0.4, "#E2B33C"],
    [1.4, -0.2, "#7A3A1C"],
    [3.2, -0.2, "#A2441F"],
    [-1.2, 1.2, "#7A3A1C"],
    [0.6, 1.1, "#A2441F"],
    [2.2, 1.2, "#E2B33C"]
  ]
    .map(([dx, dy, fill]) => `<ellipse cx="${n(x + Number(dx))}" cy="${n(y + Number(dy))}" rx="0.9" ry="0.7" fill="${fill}"/>`)
    .join("");

/** Gold filling a band of a valley between its two slopes: the corners, from the top left round to the top right. */
const goldBand = (points: [number, number][]) =>
  `<path d="M${points.map(([x, y]) => `${x} ${y}`).join(" L")} Z" fill="#F2C94C"/>` +
  `<path d="M${points[0][0]} ${points[0][1]} L${points[points.length - 1][0]} ${points[points.length - 1][1]}" stroke="#D9AE3C" stroke-width="0.4"/>`;

// Making room. Ibn Umar said: the Prophet ﷺ forbade that a man be made to rise from his seat so that another may sit in
// it, but make room and spread out. And Ibn Umar disliked that a man rise from his seat and he then sit in its place
// (Sahih al-Bukhari 6270). No one is drawn: a gathering sits on a long mat, his place a golden ring at its end. One
// comes and stands behind the mat. His voice speaks: a grey copy of a place rises from its seat, and the place itself
// grows faint; a grey copy of the one who came moves into the seat. Both grey copies go, the place comes back, and a
// ring of care comes about its seat. His voice speaks again: the places spread out, a gap opens, and the one who came
// sits in it; a warm wash comes over the mat, and a ring of care about the gathering. Then Ibn Umar's place comes; the
// place at the end rises for it, with a faint ring about its seat, but Ibn Umar's place does not take it: the place
// sits back down, Ibn Umar's place sits at the end of the mat, and a warm light comes in it.
function makeRoom(): SignArt {
  const his: [number, number] = [118, 104];
  const seats = [50, 58, 66, 74, 82, 90];
  const spread = [-6, -5, -4, 12, 13, 14];
  const came: [number, number] = [150, 98];
  const standing: [number, number] = [100, 97];
  const ibnUmar: [number, number] = [4, 100];
  return {
    kind: "make-room",
    ms: 10000,
    parts: [
      ...dayAround([136, 18], 10000),
      { name: "a home far off 1", svg: home(22, 92, 16, 10) },
      { name: "a home far off 2", svg: home(140, 91.6, 14, 9) },
      ...palms([
        [8, 97, 18],
        [152, 97.4, 17]
      ]),
      { name: "the mat of the gathering", svg: mat(30, 130, 104) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...seats.map(
        (x, i): SignPart => ({
          name: `a place on the mat ${i + 1}`,
          svg: someone(x, 104, 1.5),
          keys:
            i === 0
              ? track({
                  xy: [
                    [0.52, 0, 0],
                    [0.58, spread[i], 0],
                    [0.8, spread[i], 0],
                    [0.83, spread[i], -7],
                    [0.86, spread[i], -7],
                    [0.89, spread[i], 0]
                  ]
                })
              : i === 3
                ? track({
                    opacity: [
                      [0.08, 1],
                      [0.14, 0.35],
                      [0.4, 0.35],
                      [0.43, 1]
                    ],
                    xy: [
                      [0.52, 0, 0],
                      [0.58, spread[i], 0]
                    ]
                  })
                : track({
                    xy: [
                      [0.52, 0, 0],
                      [0.58, spread[i], 0]
                    ]
                  })
        })
      ),
      {
        name: "the place of the one who came",
        svg: someone(came[0], came[1], 1.5),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: [
            [0.04, 0, 0],
            [0.1, n(standing[0] - came[0]), n(standing[1] - came[1])],
            [0.6, n(standing[0] - came[0]), n(standing[1] - came[1])],
            [0.66, n(74 - came[0]), n(104 - came[1])]
          ]
        })
      },
      { name: "his voice: he forbade it", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.03, 0.04, 0.19, 0.2), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "made to rise: a grey copy of the fourth place",
        svg: someone(74, 104, 1.5, GREY),
        keys: track({
          opacity: [
            [0.08, 0],
            [0.1, 1],
            [0.4, 1],
            [0.43, 0]
          ],
          xy: [
            [0.08, 0, 0],
            [0.14, 0, -7]
          ]
        })
      },
      {
        name: "to sit in its seat: a grey copy of the one who came",
        svg: someone(standing[0], standing[1], 1.5, GREY),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.28, 1],
            [0.4, 1],
            [0.43, 0]
          ],
          xy: [
            [0.28, 0, 0],
            [0.36, n(74 - standing[0]), n(104 - standing[1])]
          ]
        })
      },
      { name: "the seat kept: a ring of care about the fourth place", svg: care(74, 104.4, 4, 2.4), keys: showWhile(0.41, 0.44, 0.5, 0.52) },
      { name: "his voice: make room, and spread out", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.5, 0.51, 0.69, 0.7), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "room made: a warm wash over the mat", svg: wash(80, 104, 52, 6, WARM, 0.12), keys: showFrom(0.64, 0.68) },
      { name: "a ring of care about the gathering", svg: care(80, 103.8, 54, 4.8), keys: showFrom(0.66, 0.7) },
      {
        name: "Ibn Umar's place",
        svg: someone(ibnUmar[0], ibnUmar[1], 1.5),
        keys: track({
          opacity: [
            [0.75, 0],
            [0.76, 1]
          ],
          xy: [
            [0.76, 0, 0],
            [0.8, 22, -2],
            [0.89, 22, -2],
            [0.92, 32, 4]
          ]
        })
      },
      { name: "the seat left for Ibn Umar: a faint ring", svg: care(44, 104.4, 3.4, 2, "#E8D9B0"), keys: showWhile(0.81, 0.83, 0.86, 0.88) },
      { name: "Ibn Umar's place at the end of the mat: a warm light", svg: lightIn(36, 104, 3.6), keys: showFrom(0.92, 0.95), loop: { move: "twinkle", ms: 1500, low: 0.75 } }
    ],
    words: [
      { text: "He forbade making one rise from his seat", from: 0.02, to: 0.23 },
      { text: "So that another may sit in it", from: 0.25, to: 0.48 },
      { text: "But make room, and spread out", from: 0.5, to: 0.73 },
      { text: "Ibn Umar disliked sitting where one rose", from: 0.75, to: 1 }
    ]
  };
}

// The rights of the road. Abu Sa'id al-Khudri said: the Prophet ﷺ said: beware of sitting on the roads. They said: we
// cannot do without it; they are our sittings where we talk. He said: if you must sit, then give the road its right.
// They said: and what is the right of the road? He said: lowering the gaze, holding back harm, returning the salam,
// and enjoining good and forbidding wrong (Sahih al-Bukhari 2465). No one is drawn: a road runs past the homes, and
// three places sit on a mat at its edge, his place a golden ring nearby. His voice speaks, and a grey shade comes over
// the mat; their voice answers. His voice speaks again: the grey shade goes and a golden band shows along the road.
// One passes, and faint lines go from the places to the road, then turn down to the ground. Their sack and jug, at the
// road's edge, move back out of the way; another passes and greets in gold, and the places answer in gold. A third
// turns off down a grey side path to a grey tangle; the places' voice calls to it, and it comes back and goes on along
// the road with a soft light, the tangle goes, and a warm wash comes along the road.
function rightsOfTheRoad(): SignArt {
  const his: [number, number] = [24, 102.4];
  const places = [60, 70, 80];
  const voiceAt = (from: number, to: number, hide: number, gone: number, name: string): SignPart => ({
    name,
    svg: arcs(n(his[0] + 2.8), n(his[1] - 4.2), VOICE),
    keys: showWhile(from, to, hide, gone),
    loop: { move: "twinkle", ms: 900, low: 0.5 }
  });
  const passing = (name: string, x: number, opacity: [number, number][], xy: [number, number, number][]): SignPart => ({
    name,
    svg: someone(x, 91.4, 1.4),
    keys: track({ opacity, xy })
  });
  return {
    kind: "rights-of-the-road",
    ms: 12000,
    parts: [
      ...dayAround([136, 16], 12000),
      { name: "a home by the road 1", svg: home(30, 87, 16, 10) },
      { name: "a home by the road 2", svg: home(64, 86.4, 12, 8.6) },
      { name: "a home by the road 3", svg: home(96, 86.8, 14, 9.4) },
      { name: "a home by the road 4", svg: home(134, 87, 16, 10) },
      { name: "the road", svg: `<rect x="0" y="89" width="160" height="4.8" fill="#E9D7B0"/><path d="M0 89 L160 89 M0 93.8 L160 93.8" stroke="#CDB283" stroke-width="0.5"/>` },
      { name: "a grey side path off the road", svg: way("M116 89.2 Q115.4 84.4 114.4 80.4", GREY, 0.8), keys: showWhile(0.83, 0.85, 0.92, 0.95) },
      { name: "a wrong: a grey tangle at its end", svg: tangle(113.6, 77.8), keys: showWhile(0.85, 0.87, 0.92, 0.95) },
      { name: "the mat by the road", svg: mat(52, 88, 100.2) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...places.map((x, i): SignPart => ({ name: `a place sitting by the road ${i + 1}`, svg: someone(x, 100, 1.5) })),
      { name: "their sack and jug, at the road's edge", svg: sack(90, 94.8, 0.7) + jug(96.6, 94.6), keys: track({ xy: [[0.66, 0, 0], [0.7, 2, 6.6]] }) },
      voiceAt(0.02, 0.03, 0.11, 0.12, "his voice: beware of sitting on the roads"),
      { name: "a grey shade over the sitting by the road", svg: wash(70, 100, 22, 5, GREY, 0.1), keys: showWhile(0.03, 0.05, 0.33, 0.36) },
      { name: "their voice: it is where we talk", svg: arcsLeft(56.6, 96, VOICE), keys: showWhile(0.17, 0.18, 0.27, 0.28), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      voiceAt(0.33, 0.34, 0.43, 0.44, "his voice: give the road its right"),
      { name: "the road's right: a golden band along it", svg: `<path d="M2 91.4 L158 91.4" stroke="#E8C45A" stroke-width="1" stroke-dasharray="3 2" opacity="0.6"/>`, keys: showFrom(0.36, 0.4) },
      { name: "their voice: what is its right?", svg: arcsLeft(56.6, 96, VOICE), keys: showWhile(0.49, 0.5, 0.52, 0.53), loop: { move: "twinkle", ms: 600, low: 0.5 } },
      voiceAt(0.53, 0.54, 0.59, 0.6, "his voice: lowering the gaze"),
      passing(
        "one passing on the road",
        150,
        [
          [0.49, 0],
          [0.5, 1],
          [0.59, 1],
          [0.6, 0]
        ],
        [
          [0.5, 0, 0],
          [0.6, -130, 0]
        ]
      ),
      { name: "looking: faint lines from the places to the road", svg: places.map((x) => gaze(x, 98, n(x + 3), 94.2)).join(""), keys: showWhile(0.5, 0.52, 0.54, 0.55) },
      { name: "the gaze lowered: faint lines to the ground", svg: places.map((x) => gaze(x, 102, n(x + 1.6), 105.8)).join(""), keys: showWhile(0.54, 0.56, 0.65, 0.66) },
      voiceAt(0.65, 0.66, 0.75, 0.76, "his voice: holding back harm, returning the salam"),
      passing(
        "a second one passing, who greets",
        30,
        [
          [0.65, 0],
          [0.66, 1],
          [0.75, 1],
          [0.76, 0]
        ],
        [
          [0.66, 0, 0],
          [0.69, 38, 0],
          [0.73, 38, 0],
          [0.76, 76, 0]
        ]
      ),
      { name: "the salam: a golden voice from the one passing", svg: arcs(70.6, 87.4, GOLD), keys: showWhile(0.69, 0.7, 0.72, 0.73), loop: { move: "twinkle", ms: 600, low: 0.5 } },
      { name: "the salam returned: a golden voice from the places", svg: arcs(83, 96.2, GOLD), keys: showWhile(0.72, 0.73, 0.75, 0.76), loop: { move: "twinkle", ms: 600, low: 0.5 } },
      voiceAt(0.81, 0.82, 0.96, 0.97, "his voice: enjoining good, and forbidding wrong"),
      passing(
        "a third one passing, who turns off",
        156,
        [
          [0.81, 0],
          [0.82, 1],
          [0.95, 1],
          [0.97, 0]
        ],
        [
          [0.82, 0, 0],
          [0.84, -40, 0],
          [0.87, -41.6, -10.4],
          [0.9, -41.6, -10.4],
          [0.93, -40, 0],
          [0.97, -110, 0]
        ]
      ),
      { name: "forbidding wrong: a golden voice from the places", svg: arcs(83, 96.2, GOLD), keys: showWhile(0.86, 0.87, 0.9, 0.91), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      {
        name: "good: a soft light going on with the third one",
        svg: glow(116, 91.4, 3.4, WARM, 0.45),
        keys: track({
          opacity: [
            [0.91, 0],
            [0.93, 1],
            [0.95, 1],
            [0.97, 0]
          ],
          xy: [
            [0.93, 0, 0],
            [0.97, -70, 0]
          ]
        })
      },
      { name: "the road given its right: a warm wash along it", svg: wash(80, 91.4, 80, 4, WARM, 0.12), keys: showFrom(0.93, 0.96) }
    ],
    words: [
      { text: "Beware of sitting on the roads", from: 0.02, to: 0.15 },
      { text: "They said: we must, it is where we talk", from: 0.17, to: 0.31 },
      { text: "If you must, give the road its right", from: 0.33, to: 0.47 },
      { text: "What is its right? Lowering the gaze", from: 0.49, to: 0.63 },
      { text: "Holding back harm, returning the salam", from: 0.65, to: 0.79 },
      { text: "Enjoining good, and forbidding wrong", from: 0.81, to: 1 }
    ]
  };
}

// Honest trade. Hakim ibn Hizam said: the Messenger of Allah ﷺ said: the buyer and the seller may choose as long as
// they have not parted; if they tell the truth and make clear, they are blessed in their sale, and if they hide and lie,
// the blessing of their sale is wiped out (Sahih al-Bukhari 2079). No one is drawn: two stalls in a market, each with
// a sack that has a small tear, and a faint warm light of blessing. At each stall a seller's place stands, and a
// buyer's place comes; a ring about the two shows that they may choose, and the ways they would part by show. At the
// left stall both voices speak in gold and a golden ring comes about the tear: it is made clear. A warm glow comes on
// the stall and the seller's place, and the buyer's place goes with its sack and a soft light. At the right stall a
// cover comes over the tear and both voices speak crooked and grey; its warm light fades, a grey shade comes over it,
// and the buyer's place goes with its sack and no light.
function honestTrade(): SignArt {
  const left = 44;
  const right = 116;
  const y = 96;
  const buyerIn = (name: string, from: [number, number], to: [number, number], leave: [number, number, number, number]): SignPart => ({
    name,
    svg: someone(from[0], from[1], 1.5),
    keys: track({
      opacity: [
        [0.03, 0],
        [0.04, 1],
        [at3(leave[1] - 0.01), 1],
        [leave[1], 0]
      ],
      xy: [
        [0.03, 0, 0],
        [0.09, n(to[0] - from[0]), n(to[1] - from[1])],
        [leave[0], n(to[0] - from[0]), n(to[1] - from[1])],
        [leave[1], n(to[0] - from[0] + leave[2]), n(to[1] - from[1] + leave[3])]
      ]
    })
  });
  return {
    kind: "honest-trade",
    ms: 12000,
    parts: [
      ...dayAround([80, 14], 12000),
      { name: "the left stall", svg: stall(left, y) },
      { name: "the right stall", svg: stall(right, y) },
      { name: "the blessing on the left stall: a faint warm light", svg: wash(left, y - 5, 15, 7, WARM, 0.1) },
      { name: "the blessing on the right stall: a faint warm light", svg: wash(right, y - 5, 15, 7, WARM, 0.1), keys: track({ opacity: [[0.82, 1], [0.86, 0]] }) },
      { name: "the goods of the left stall", svg: sack(left - 5, y - 6.4, 0.72) + basketOfDates(left + 4.6, y - 6.4) },
      { name: "the goods of the right stall", svg: sack(right - 5, y - 6.4, 0.72) + basketOfDates(right + 4.6, y - 6.4) },
      { name: "a fault in the left stall's sack: a small tear", svg: fault(n(left - 4.4), y - 8.4) },
      { name: "a fault in the right stall's sack: a small tear", svg: fault(n(right - 4.4), y - 8.4) },
      { name: "the left seller's place", svg: someone(left - 16, y, 1.5) },
      { name: "the right seller's place", svg: someone(right + 16, y, 1.5) },
      buyerIn("the left buyer's place", [4, 108], [left, y + 7], [0.54, 0.59, -36, 6]),
      buyerIn("the right buyer's place", [156, 108], [right, y + 7], [0.88, 0.93, 36, 6]),
      { name: "they may choose: a ring about the left buyer and seller", svg: care(36, y + 3.6, 12.4, 6.2), keys: showWhile(0.09, 0.11, 0.55, 0.57), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      { name: "they may choose: a ring about the right buyer and seller", svg: care(124, y + 3.6, 12.4, 6.2), keys: showWhile(0.09, 0.11, 0.88, 0.9), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      { name: "the ways they part by", svg: way("M44 105.4 Q28 110 6 112", "#FFF0C4", 1) + way("M116 105.4 Q132 110 154 112", "#FFF0C4", 1), keys: showFrom(0.18, 0.22) },
      { name: "the truth: the left seller's golden voice", svg: arcs(30.8, y - 4, GOLD), keys: showWhile(0.33, 0.34, 0.38, 0.39), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "the truth: the left buyer's golden voice", svg: arcsLeft(41.4, y + 3, GOLD), keys: showWhile(0.38, 0.39, 0.43, 0.44), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "made clear: a golden ring about the tear", svg: care(n(left - 4.4), y - 8.4, 2.8, 1.8), keys: showWhile(0.35, 0.37, 0.55, 0.56) },
      { name: "blessed in their sale: a warm glow on the left stall", svg: wash(left, y - 8, 18, 9, WARM, 0.16), keys: showFrom(0.5, 0.54), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "a warm light on the left seller's place", svg: lightIn(left - 16, y, 3.4), keys: showFrom(0.5, 0.53) },
      {
        name: "the sack the left buyer takes, with its blessing",
        svg: sack(48, y + 10.4, 0.55) + glow(48, y + 7.8, 3.4, WARM, 0.4),
        keys: track({
          opacity: [
            [0.51, 0],
            [0.53, 1],
            [0.58, 1],
            [0.59, 0]
          ],
          xy: [
            [0.54, 0, 0],
            [0.59, -36, 6]
          ]
        })
      },
      { name: "hidden: a cover over the right stall's tear", svg: cover(n(right - 4.4), y - 8.2), keys: showFrom(0.66, 0.68) },
      { name: "a lie: the right seller's crooked voice", svg: crookedLeft(n(right + 13.4), y - 3.8), keys: showWhile(0.68, 0.69, 0.75, 0.76) },
      { name: "a lie: the right buyer's crooked voice", svg: crooked(118.6, y + 3.4), keys: showWhile(0.7, 0.71, 0.75, 0.76) },
      { name: "the blessing wiped out: a grey shade over the right stall", svg: wash(right, y - 4, 22, 10, GREY, 0.08), keys: showFrom(0.85, 0.88) },
      {
        name: "the sack the right buyer takes",
        svg: sack(120, y + 10.4, 0.55),
        keys: track({
          opacity: [
            [0.83, 0],
            [0.85, 1],
            [0.92, 1],
            [0.93, 0]
          ],
          xy: [
            [0.88, 0, 0],
            [0.93, 36, 6]
          ]
        })
      }
    ],
    words: [
      { text: "The buyer and the seller may choose", from: 0.02, to: 0.15 },
      { text: "As long as they have not parted", from: 0.17, to: 0.31 },
      { text: "If they tell the truth and make it clear", from: 0.33, to: 0.47 },
      { text: "They are blessed in their sale", from: 0.49, to: 0.63 },
      { text: "If they hide, and lie", from: 0.65, to: 0.79 },
      { text: "The blessing of their sale is wiped out", from: 0.81, to: 1 }
    ]
  };
}

// Keep them close. Sa'd said: the ayah "do not drive away those who call their Lord morning and evening" was revealed
// about six; I and Ibn Mas'ud were among them. The idolaters had said to him ﷺ: do not keep these near you (Sahih Muslim
// 2413). No one is drawn: among the homes and the hills, his place is a golden ring, and six places come one by one in
// a curve about it. A light comes in Sa'd's place, then in Abdullah's. Grey places of the idolaters come, their grey
// voice speaks, and a grey shade comes over the six. Then the grey shade goes, a ring of care comes about the six, and
// the grey places go back. A soft glow of the morning shows low in the east, then of the evening in the west; a golden
// spark rises from each of the six as they call on their Lord, a light comes in the other four, and a warm wash about
// them all.
function keepThemClose(): SignArt {
  const his: [number, number] = [78, 104.6];
  const six: [number, number][] = [
    [64, 104.4],
    [68.4, 100.6],
    [75, 98.8],
    [83, 98.8],
    [89.4, 100.6],
    [93.6, 104.4]
  ];
  const names = ["Sa'd's place", "Abdullah's place", "one of the six 3", "one of the six 4", "one of the six 5", "one of the six 6"];
  const idolaters: [number, number][] = [
    [140, 101.4],
    [148, 104.6],
    [154, 99.4]
  ];
  const day = dayAround([30, 18], 12000);
  return {
    kind: "keep-them-close",
    ms: 12000,
    parts: [
      day[0],
      { name: "the morning: a soft glow low in the east", svg: wash(146, 58, 30, 10, "#FFC98A", 0.28), keys: showWhile(0.81, 0.83, 0.86, 0.88) },
      { name: "the evening: a soft glow low in the west", svg: wash(14, 58, 30, 10, "#F2A07A", 0.28), keys: showFrom(0.87, 0.9) },
      ...day.slice(1),
      { name: "a home 1", svg: home(20, 94, 14, 9) },
      { name: "a home 2", svg: home(46, 93.4, 12, 8) },
      { name: "a home 3", svg: home(116, 93.4, 12, 8) },
      { name: "a home 4", svg: home(142, 94, 14, 9) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...six.map(([x, y], i): SignPart => ({ name: names[i], svg: someone(x, y, 1.5), keys: track({ opacity: [[at3(0.03 + i * 0.02), 0], [at3(0.04 + i * 0.02), 1]] }) })),
      { name: "Sa'd's place: a light in it", svg: lightIn(six[0][0], six[0][1], 3.2), keys: showFrom(0.22, 0.25), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "Abdullah's place: a light in it", svg: lightIn(six[1][0], six[1][1], 3.2), keys: showFrom(0.26, 0.29), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      ...idolaters.map(
        ([x, y], i): SignPart => ({
          name: `the idolaters: a grey place ${i + 1}`,
          svg: someone(x, y, 1.4, GREY),
          keys: track({
            opacity: [
              [0.4, 0],
              [0.41, 1],
              [0.64, 1],
              [0.7, 0]
            ],
            xy: [
              [0.41, 0, 0],
              [0.45, -22, 0],
              [0.64, -22, 0],
              [0.7, 0, 0]
            ]
          })
        })
      ),
      { name: "the idolaters' grey voice: do not keep these near", svg: arcsLeft(115.4, 97.4, GREY), keys: showWhile(0.45, 0.46, 0.53, 0.54), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "looked down on: a grey shade over the six", svg: wash(79, 101.6, 20, 6, GREY, 0.08), keys: showWhile(0.46, 0.5, 0.6, 0.64) },
      { name: "do not drive them away: a ring of care about the six", svg: care(79, 102, 21, 7.4), keys: showFrom(0.6, 0.64) },
      ...six.map(([x, y], i): SignPart => {
        const from = at3(0.82 + i * 0.02);
        return { name: `calling on their Lord: a golden spark rising ${i + 1}`, svg: sparkle(x, n(y - 4.4), 1.4, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.04), 10) };
      }),
      ...six.slice(2).map(([x, y], i): SignPart => ({ name: `one of the six ${i + 3}: a light in it`, svg: lightIn(x, y, 3.2), keys: showFrom(0.88, 0.91), loop: { move: "twinkle", ms: 1500 + i * 100, low: 0.75 } })),
      { name: "a warm wash over the six", svg: wash(79, 102, 22, 7, WARM, 0.12), keys: showFrom(0.9, 0.94) }
    ],
    words: [
      { text: "Sa'd said: an ayah was revealed about six", from: 0.02, to: 0.19 },
      { text: "I and Ibn Mas'ud were among them", from: 0.21, to: 0.38 },
      { text: "The idolaters said: do not keep these near", from: 0.4, to: 0.57 },
      { text: "Do not drive away those who call their Lord", from: 0.59, to: 0.78 },
      { text: "In the morning and the evening", from: 0.8, to: 1 }
    ]
  };
}

// A small gift. Abu Hurairah said: the Prophet ﷺ said: O Muslim women, let none of you look down on a gift for her
// neighbor, even if it is a sheep's trotter (Sahih al-Bukhari 2566). No one is drawn: two homes side by side, and his
// place a golden ring before them. His voice speaks, and a place comes to the door of each home; a way shows between
// them. A small dish shows at the left door, with a grey shade about it, as if it were too little; the shade goes, and
// the place carries the dish along the way to the next home, sets it down, and comes back. A warm light comes on the
// dish, then a ring about it, warm glows on both homes, and a ring of care about the two.
function smallGift(): SignArt {
  const his: [number, number] = [20, 106];
  const voice = (from: number, to: number, hide: number, gone: number, i: number): SignPart => ({
    name: `his voice ${i}`,
    svg: arcs(n(his[0] + 2.6), n(his[1] - 4.2), VOICE),
    keys: showWhile(from, to, hide, gone),
    loop: { move: "twinkle", ms: 900, low: 0.5 }
  });
  return {
    kind: "small-gift",
    ms: 10000,
    parts: [
      ...dayAround([132, 16], 10000),
      { name: "the left home", svg: home(46, 99, 20, 13) },
      { name: "the next home", svg: home(114, 99, 20, 13) },
      ...palms([[150, 100, 18]]),
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      voice(0.02, 0.03, 0.27, 0.28, 1),
      {
        name: "the place at the left home's door",
        svg: someone(44.2, 104.4, 1.5),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.06, 1]
          ],
          xy: [
            [0.04, 0, -3],
            [0.08, 0, 0],
            [0.43, 0, 0],
            [0.52, 58, 0.4],
            [0.55, 58, 0.4],
            [0.6, 0, 0]
          ]
        })
      },
      {
        name: "the place at the next home's door",
        svg: someone(112.2, 104.4, 1.5),
        keys: track({
          opacity: [
            [0.06, 0],
            [0.08, 1]
          ],
          xy: [
            [0.06, 0, -3],
            [0.1, 0, 0]
          ]
        })
      },
      { name: "the way between the two homes", svg: way("M48 104.6 Q80 99.8 108 104.6"), keys: showFrom(0.12, 0.18) },
      voice(0.33, 0.34, 0.6, 0.61, 2),
      {
        name: "the gift: a small dish with a little on it",
        svg: dish(48.6, 106.4) + `<ellipse cx="48.6" cy="105.1" rx="1.3" ry="0.7" fill="#C98E5A"/>`,
        keys: track({
          opacity: [
            [0.34, 0],
            [0.36, 1]
          ],
          xy: [
            [0.43, 0, 0],
            [0.52, 58, 0.2]
          ]
        })
      },
      { name: "thought too little: a grey shade about the dish", svg: wash(48.6, 105.4, 5, 3, GREY, 0.14), keys: showWhile(0.36, 0.38, 0.41, 0.43) },
      { name: "received: a warm light on the gift", svg: glow(106.6, 105.2, 3.6, WARM, 0.4), keys: showFrom(0.53, 0.56), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      voice(0.66, 0.67, 0.96, 0.97, 3),
      { name: "even a little: a ring about the gift", svg: care(106.6, 105.8, 4.4, 2.2), keys: showFrom(0.67, 0.7) },
      { name: "a warm glow on the left home", svg: wash(46, 93, 14, 10, WARM, 0.12), keys: showFrom(0.72, 0.76) },
      { name: "a warm glow on the next home", svg: wash(114, 93, 14, 10, WARM, 0.12), keys: showFrom(0.74, 0.78) },
      { name: "a ring of care about the two homes", svg: care(80, 101.4, 46, 6.6), keys: showFrom(0.8, 0.84) }
    ],
    words: [
      { text: "O Muslim women", from: 0.02, to: 0.31 },
      { text: "Let none look down on a gift for her neighbor", from: 0.33, to: 0.64 },
      { text: "Even if it is a sheep's trotter", from: 0.66, to: 1 }
    ]
  };
}

// Asked about this blessing. Abu Hurairah said: the Messenger of Allah ﷺ went out one day, or one night, and found Abu
// Bakr and Umar. He said: what brought you out of your homes at this hour? They said: hunger. He said: and I, by Him in
// whose hand is my soul, what brought you out brought me out. They went with him to a man of the Ansar, who was not at
// home; she said: welcome. He had gone to fetch sweet water for them. Then the Ansari came, and said: praise be to Allah,
// no one today has more honored guests than I. He brought them a cluster with yellow, dry and fresh dates, and said: eat
// of these. When they had eaten and drunk their fill, he ﷺ said: you will be asked about this blessing on the Day of
// Resurrection (Sahih Muslim 2038). No one is drawn: his place, a golden ring, comes out of his home, and the places of
// Abu Bakr and Umar come out of theirs; they meet. Voices ask and answer, and a grey shade of hunger comes about each
// place. The three go to the Ansari's home among the palms; a voice at the door says welcome, and the Ansari's place
// comes back with its waterskin and speaks in gold, and a warm wash comes on the three. It goes to the palm and brings a
// cluster of dates to them; the dates are eaten and the grey shades go. His voice speaks: soft lights come on the dates
// and on the water, and a golden ring about them.
function askedAboutBlessings(): SignArt {
  const hisStart: [number, number] = [16.2, 100.4];
  const abuBakrStart: [number, number] = [44.2, 99.8];
  const umarStart: [number, number] = [70.2, 100.2];
  const hisXy: [number, number, number][] = [
    [0.03, 0, 0],
    [0.06, 9.8, 4.2],
    [0.43, 9.8, 4.2],
    [0.47, 87.8, 4.2]
  ];
  const abuBakrXy: [number, number, number][] = [
    [0.05, 0, 0],
    [0.09, -6.2, 5.2],
    [0.43, -6.2, 5.2],
    [0.47, 67.8, 6.6]
  ];
  const umarXy: [number, number, number][] = [
    [0.06, 0, 0],
    [0.1, -20.2, 5.2],
    [0.43, -20.2, 5.2],
    [0.47, 49.8, 6.4]
  ];
  const hunger = (name: string, at: [number, number], xy: [number, number, number][], from: number, to: number): SignPart => ({
    name,
    svg: wash(at[0], at[1], 4.4, 2.8, GREY, 0.16),
    keys: track({
      opacity: [
        [from, 0],
        [to, 1],
        [0.77, 1],
        [0.8, 0]
      ],
      xy
    })
  });
  const ansari: [number, number] = [152, 101.4];
  return {
    kind: "asked-about-blessings",
    ms: 12000,
    parts: [
      ...dayAround([130, 14], 12000),
      { name: "his home", svg: home(18, 97, 14, 9) },
      { name: "Abu Bakr's home", svg: home(46, 96.4, 13, 8.6) },
      { name: "Umar's home", svg: home(72, 96.8, 13, 8.6) },
      { name: "the Ansari's home", svg: home(128, 96.4, 16, 10) },
      ...palms([
        [108, 98, 20],
        [150, 99, 22]
      ]),
      {
        name: "a golden ring, his place",
        svg: ring(hisStart[0], hisStart[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: hisXy
        })
      },
      {
        name: "Abu Bakr's place",
        svg: someone(abuBakrStart[0], abuBakrStart[1], 1.5),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.06, 1]
          ],
          xy: abuBakrXy
        })
      },
      {
        name: "Umar's place",
        svg: someone(umarStart[0], umarStart[1], 1.5),
        keys: track({
          opacity: [
            [0.06, 0],
            [0.07, 1]
          ],
          xy: umarXy
        })
      },
      { name: "his voice: what brought you out?", svg: arcs(28.8, 100.4, VOICE), keys: showWhile(0.15, 0.16, 0.19, 0.2), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "their voices: hunger", svg: arcsLeft(35.4, 100.8, VOICE) + arcsLeft(47.4, 101.2, VOICE), keys: showWhile(0.19, 0.2, 0.23, 0.24), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      hunger("hunger: a grey shade about Abu Bakr's place", abuBakrStart, abuBakrXy, 0.2, 0.23),
      hunger("hunger: a grey shade about Umar's place", umarStart, umarXy, 0.2, 0.23),
      { name: "his voice: what brought you out brought me out", svg: arcs(28.8, 100.4, VOICE), keys: showWhile(0.29, 0.3, 0.37, 0.38), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      hunger("hunger: a grey shade about his place", hisStart, hisXy, 0.31, 0.34),
      { name: "a voice at the door: welcome", svg: arcsLeft(124, 99, GOLD), keys: showWhile(0.47, 0.48, 0.51, 0.52), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      {
        name: "the Ansari's place, coming back",
        svg: someone(ansari[0], ansari[1], 1.5),
        keys: track({
          opacity: [
            [0.47, 0],
            [0.48, 1]
          ],
          xy: [
            [0.48, 0, 0],
            [0.52, -16, 0],
            [0.71, -16, 0],
            [0.73, -6, 0.4],
            [0.74, -6, 0.4],
            [0.77, -22, 3]
          ]
        })
      },
      {
        name: "the sweet water it fetched, in a waterskin",
        svg: waterskin(n(ansari[0] + 3.4), n(ansari[1] + 2.4)),
        keys: track({
          opacity: [
            [0.47, 0],
            [0.48, 1]
          ],
          xy: [
            [0.48, 0, 0],
            [0.52, -16, 0]
          ]
        })
      },
      { name: "the Ansari's golden voice: none has more honored ones today", svg: arcsLeft(133.4, 97.4, GOLD), keys: showWhile(0.57, 0.58, 0.65, 0.66), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "honored: a warm wash on the three", svg: wash(112, 104.6, 16, 4.4, WARM, 0.14), keys: showFrom(0.6, 0.64) },
      {
        name: "a cluster of yellow, dry and fresh dates",
        svg: cluster(146, 105),
        keys: track({
          opacity: [
            [0.73, 0],
            [0.74, 1],
            [0.77, 1],
            [0.79, 0.45]
          ],
          xy: [
            [0.74, 0, 0],
            [0.77, -30, 1]
          ]
        })
      },
      { name: "his voice: you will be asked about this blessing", svg: arcsLeft(101.4, 100.6, VOICE), keys: showWhile(0.85, 0.86, 0.96, 0.97), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "this blessing: a soft light on the dates", svg: glow(116, 104.8, 4, WARM, 0.4), keys: showFrom(0.87, 0.9), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "this blessing: a soft light on the water", svg: glow(n(ansari[0] - 12.6), 101.6, 3.6, WARM, 0.4), keys: showFrom(0.89, 0.92), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "a golden ring about this blessing", svg: care(124, 103.6, 18, 4.6), keys: showFrom(0.92, 0.95) }
    ],
    words: [
      { text: "He went out and found Abu Bakr and Umar", from: 0.02, to: 0.13 },
      { text: "What brought you out? They said: hunger", from: 0.15, to: 0.27 },
      { text: "What brought you out brought me out too", from: 0.29, to: 0.41 },
      { text: "They went with him to a man of the Ansar", from: 0.43, to: 0.55 },
      { text: "No one today has more honored guests than I", from: 0.57, to: 0.69 },
      { text: "He brought a cluster of fresh and dry dates", from: 0.71, to: 0.83 },
      { text: "You will be asked about this blessing", from: 0.85, to: 1 }
    ]
  };
}

// A valley of gold. Anas ibn Malik said: the Messenger of Allah ﷺ said: if the son of Adam had a valley of gold, he
// would love to have two valleys; nothing fills his mouth but dust, and Allah turns to whoever repents (Sahih
// al-Bukhari 6439). No one is drawn: among the hills, a valley fills with gold, band by band, and a place goes to its
// mouth. A second valley shows beside it as a dashed golden outline; a golden line goes from the place to it, and the
// place goes toward it. Then a haze of dust comes over the land, the gold grows dim, and dust comes about the place.
// It turns back from the valleys; the dust about it goes, a light of faith comes in it, and a ring of care about it.
function valleyOfGold(): SignArt {
  const start: [number, number] = [20, 104];
  const dim = (from: number, to: number) =>
    track({
      opacity: [
        [from, 0],
        [to, 1],
        [0.56, 1],
        [0.62, 0.4]
      ]
    });
  return {
    kind: "valley-of-gold",
    ms: 10000,
    parts: [
      ...dayAround([140, 16], 10000),
      {
        name: "the hills of the valleys",
        svg:
          `<path d="M2 92 L26 72 L50 92 Z" fill="#C2A878"/><path d="M26 72 L50 92 L34.4 92 Z" fill="#000000" opacity="0.1"/>` +
          `<path d="M50 92 L76 68 L102 92 Z" fill="#BFA474"/><path d="M76 68 L102 92 L85.1 92 Z" fill="#000000" opacity="0.1"/>` +
          `<path d="M102 92 L126 70 L150 92 Z" fill="#C2A878"/><path d="M126 70 L150 92 L134.4 92 Z" fill="#000000" opacity="0.1"/>` +
          `<path d="M150 92 L168 72 L186 92 Z" fill="#BFA474"/>`
      },
      {
        name: "the first valley, filling with gold 1",
        svg: goldBand([
          [45.2, 88],
          [50, 92],
          [54.3, 88]
        ]),
        keys: dim(0.04, 0.08)
      },
      {
        name: "the first valley, filling with gold 2",
        svg: goldBand([
          [41.6, 85],
          [45.2, 88],
          [54.3, 88],
          [57.6, 85]
        ]),
        keys: dim(0.08, 0.12)
      },
      {
        name: "the first valley, filling with gold 3",
        svg:
          goldBand([
            [38, 82],
            [41.6, 85],
            [57.6, 85],
            [60.8, 82]
          ]) + goldHeap(49.4, 82.6, 0.8),
        keys: dim(0.12, 0.16)
      },
      { name: "a golden glow over the first valley", svg: glow(50, 84, 12, WARM, 0.12), keys: dim(0.14, 0.18), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      {
        name: "the place of the one with the valley",
        svg: someone(start[0], start[1], 1.5),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.1, 30, -7],
            [0.36, 30, -7],
            [0.44, 56, -6],
            [0.76, 56, -6],
            [0.84, 60, -2]
          ]
        })
      },
      {
        name: "a second valley it wants: a dashed golden outline",
        svg: `<path d="M91.2 82 L102 92 L112.9 82 Z" stroke="#E8C45A" stroke-width="0.7" stroke-dasharray="1.6 1.2" fill="#F2C94C" fill-opacity="0.12"/>`,
        keys: track({
          opacity: [
            [0.26, 0],
            [0.32, 1],
            [0.6, 1],
            [0.66, 0.3]
          ]
        })
      },
      { name: "wanting more: a golden line to the second valley", svg: lookLine(52.4, 95.2, 100, 91, 86), keys: showWhile(0.3, 0.34, 0.52, 0.56) },
      { name: "dust: a haze over the land", svg: wash(80, 92, 76, 14, "#B8A27E", 0.1), keys: showWhile(0.52, 0.58, 0.82, 0.86) },
      { name: "dust about its place", svg: wash(76, 98, 5.4, 3.2, "#9C8A6A", 0.22), keys: showWhile(0.6, 0.64, 0.82, 0.86) },
      { name: "turned to: a light of faith in its place", svg: faithIn(80, 102), keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "a ring of care about its place", svg: care(80, 102.6, 6, 3.4), keys: showFrom(0.88, 0.92) }
    ],
    words: [
      { text: "If the son of Adam had a valley of gold", from: 0.02, to: 0.23 },
      { text: "He would love to have two valleys", from: 0.25, to: 0.48 },
      { text: "Nothing fills his mouth but dust", from: 0.5, to: 0.73 },
      { text: "And Allah turns to whoever repents", from: 0.75, to: 1 }
    ]
  };
}

export const WAYS_ART = {
  "make-room": makeRoom,
  "rights-of-the-road": rightsOfTheRoad,
  "honest-trade": honestTrade,
  "keep-them-close": keepThemClose,
  "small-gift": smallGift,
  "asked-about-blessings": askedAboutBlessings,
  "valley-of-gold": valleyOfGold
};
