import { animalAt, cloud, glow, n, palm, sky, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { GREY, prayerMat } from "./lovedArt";
import { food, ledge } from "./hopeArt";
import { roundTree } from "./worthArt";
import { risingSparks } from "./charityArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * Ways he ﷺ taught, drawn as the scenes of counsel he gave are (counselArt.ts): the du'a of setting out on a journey;
 * wishing for a brother what one likes for oneself; the eight gates of Paradise opened after wudu; a house in Paradise
 * for twelve rak'ahs; getting ready for Friday; Allah's right on His servants, told on the donkey 'Ufayr; and "pray as
 * you have seen me pray". Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand or a face, and no one rides: where someone went, a dashed way
 * shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is drawn for
 * Allah, and nothing comes down from the sky: a du'a, or a word of witness, is a spark that rises. Paradise is only
 * far off, in a soft circle of light with no sun in it.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A point of a move: when, and how far across and down. */
type At = [number, number, number];

/** A place in white: a small dashed circle, light on a darker ground. */
const LIGHT = "#F3E3C0";

/** A dashed ring of care on the ground about (x, y), `rx` across and `ry` high. */
const care = (x: number, y: number, rx: number, ry: number, color = GOLD) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="none"/>`;

/** A few small dashed circles at the given points: places of a gathering. */
const places = (list: [number, number][], color = VOICE, r = 1.3) => list.map(([x, y]) => someone(x, y, r, color)).join("");

/** Keys that show a part at `from` (at once) and lift it by `rise` by `to`, where it stays. */
const risesAndStays = (from: number, to: number, rise: number): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, n(-rise * 0.15), -rise]
});

/** A small drop of water, its middle at (x, y). */
const drop = (x: number, y: number, fill = "#7EC3EA") =>
  `<path d="M${x} ${n(y - 1.2)} Q${n(x + 0.8)} ${n(y + 0.1)} ${x} ${n(y + 0.7)} Q${n(x - 0.8)} ${n(y + 0.1)} ${x} ${n(y - 1.2)} Z" fill="${fill}"/>`;

/** A water jug with a spout on its right, its foot's middle at (x, y). */
const jug = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${y} Q${n(x - 3.2)} ${n(y - 3)} ${n(x - 1.4)} ${n(y - 5.2)} L${n(x - 1.4)} ${n(y - 6.4)} L${n(x + 1.4)} ${n(y - 6.4)} L${n(x + 1.4)} ${n(y - 5.2)} Q${n(x + 3.2)} ${n(y - 3)} ${n(x + 2.2)} ${y} Z" fill="#B87A48"/>` +
  `<path d="M${n(x + 2)} ${n(y - 3.6)} L${n(x + 4.4)} ${n(y - 5.4)}" stroke="#B87A48" stroke-width="0.9" stroke-linecap="round"/><path d="M${n(x - 1.4)} ${n(y - 6.4)} L${n(x + 1.4)} ${n(y - 6.4)}" stroke="#8E5A30" stroke-width="0.5"/>`;

/** A wide basin of water, its middle at (x, y). */
const basin = (x: number, y: number, w = 4.4) =>
  `<path d="M${n(x - w)} ${n(y - 1)} Q${x} ${n(y + 2.4)} ${n(x + w)} ${n(y - 1)} Z" fill="#A57A50"/><ellipse cx="${x}" cy="${n(y - 1)}" rx="${w}" ry="0.9" fill="#8CC8EA"/>`;

/** A small flask of scent, its foot's middle at (x, y). */
const flask = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} Q${n(x - 2.2)} ${n(y - 2.2)} ${n(x - 0.6)} ${n(y - 3.2)} L${n(x - 0.6)} ${n(y - 4.2)} L${n(x + 0.6)} ${n(y - 4.2)} L${n(x + 0.6)} ${n(y - 3.2)} Q${n(x + 2.2)} ${n(y - 2.2)} ${n(x + 1.6)} ${y} Z" fill="#B9A2D6"/><rect x="${n(x - 0.8)}" y="${n(y - 5.2)}" width="1.6" height="1" fill="#8A6A3E"/>`;

/** A soft curl of scent going up from (x, y). */
const curl = (x: number, y: number, color = "#C9B2E6") =>
  `<path d="M${x} ${y} q-1.4 -1.6 0 -3.2 q1.4 -1.6 0 -3.2" stroke="${color}" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;

/** A small gate of Paradise, open: two golden posts and an arch, its foot's middle at (x, y). */
const smallGate = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${y} L${n(x - 2.6)} ${n(y - 3)} Q${x} ${n(y - 6)} ${n(x + 2.6)} ${n(y - 3)} L${n(x + 2.6)} ${y}" stroke="${GOLD}" stroke-width="0.8" fill="none"/>` +
  `<path d="M${n(x - 1.8)} ${y} L${n(x - 1.8)} ${n(y - 2.7)} Q${x} ${n(y - 4.9)} ${n(x + 1.8)} ${n(y - 2.7)} L${n(x + 1.8)} ${y} Z" fill="#FFFBEA"/>`;

/** Paradise far off: a soft circle of light with no sun in it, a garden ledge low in it, its middle at (x, y). */
const farOff = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF8E6" opacity="0.92" stroke="#E8D8B0" stroke-width="0.6"/>` + glow(x, y, n(r * 0.8), "#FFF3C0", 0.3);

/** A pulpit of three steps facing left, its foot's right at (x, y). */
const pulpit = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x - 6)} ${y} L${n(x - 6)} ${n(y - 2)} L${n(x - 4)} ${n(y - 2)} L${n(x - 4)} ${n(y - 4)} L${n(x - 2)} ${n(y - 4)} L${n(x - 2)} ${n(y - 6)} L${x} ${n(y - 6)} Z" fill="#8E6A42"/><path d="M${x} ${n(y - 6)} L${x} ${n(y - 9)}" stroke="#8E6A42" stroke-width="0.7"/>`;

/** The morning or the day: sky, sun, a cloud or two, the hills and the land, with palms of Madinah at the sides. */
const dayAround = (sunAt: [number, number], ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunAt[0], sunAt[1]) },
  { name: "clouds", svg: cloud(46, 28, 0.6, "#FFFFFF", 0.9) + cloud(104, 22, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: land() }
];

// Setting out on a journey. Ibn Umar said: when the Messenger of Allah ﷺ mounted his camel to set out on a journey, he
// said Allahu Akbar three times, then: glory to Him who made this serve us, and we could not have done it ourselves, and
// to our Lord we will return. O Allah, we ask You in this journey of ours for righteousness and piety, and deeds that
// please You; O Allah, make this journey of ours easy for us, and fold its distance for us; O Allah, You are the
// Companion on the journey and the One left over the family... And when he returned, he said them, and added:
// returning, repenting, worshipping, praising our Lord (Sahih Muslim 1342). No one is drawn and no one rides: by his home
// in Madinah his place is a golden ring that comes out to his camel; three times a spark rises from it; his voice says
// the words, and a warm glow comes on the camel; its loads go up onto its back; then it sets out along the way with his
// place beside it, far off to the hills, and a soft light stays over the home; it comes back along the way, and his
// voice says the words again, sparks rise and stay, and a warm glow comes on the home.
function settingOut(): SignArt {
  const feet: [number, number] = [72, 104.6];
  const s = 0.24;
  const his: [number, number] = [60, 105.8];
  const origin = { x: feet[0], y: feet[1] };
  const go: [number, number] = [70, -13];
  const far = 0.5;
  // Out along the way from 0.58 to 0.65, and back from 0.72 to 0.79, smaller far off.
  const away = (before: At[] = [[0.58, 0, 0]]): { xy: At[]; scale: [number, number][] } => ({
    xy: [...before, [0.65, go[0], go[1]], [0.72, go[0], go[1]], [0.79, 0, 0]],
    scale: [
      [0.58, 1],
      [0.65, far],
      [0.72, far],
      [0.79, 1]
    ]
  });
  const takbir = [-3, 0, 3].map((dx, i): SignPart => {
    const from = at3(0.16 + i * 0.025);
    const to = at3(from + 0.02);
    const rise = 10 + i * 4;
    return {
      name: `the takbir, rising ${i + 1}`,
      svg: sparkle(n(his[0] + dx), n(his[1] - 6), 1.8, "#FFE7A0") + glow(n(his[0] + dx), n(his[1] - 6), 3, WARM, 0.22),
      keys: { at: [0, from, at3(from + 0.005), to, 0.58, 0.59], opacity: [0, 0, 1, 1, 1, 0], y: [0, 0, n(-rise * 0.15), -rise, -rise, -rise] },
      loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 3 }
    };
  });
  const back = risingSparks(
    "returning, praising: its words, rising",
    [
      [56, 99],
      [60, 98],
      [64, 99.4],
      [58, 96.6]
    ],
    0.87,
    0.015,
    { stay: true, rise: 22 }
  );
  return {
    kind: "setting-out",
    ms: 12000,
    parts: [
      ...dayAround([128, 18], 12000),
      { name: "palms of Madinah", svg: palm(10, 98, 19) + palm(22, 99, 15) },
      { name: "his home", svg: home(36, 101, 16, 11) },
      { name: "the way out to the hills", svg: way("M80 108 Q112 104 144 92", "#FFF0C4", 1) },
      { name: "kept while he is away: a soft light over the home", svg: glow(36, 86, 7, "#FFF6DA", 0.24), keys: showFrom(0.6, 0.64), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      {
        name: "his camel, standing by",
        svg: animalAt("camel", n(feet[0] - 50 * s), n(feet[1] - 73 * s), s),
        origin,
        keys: track(away()),
        loop: { move: "bob", ms: 1800, y: -0.3 }
      },
      {
        name: "made to serve us: a warm glow on the camel",
        svg: glow(feet[0], n(feet[1] - 10), 9, WARM, 0.22),
        origin,
        keys: track({
          opacity: [
            [0.31, 0],
            [0.35, 1]
          ],
          ...away()
        })
      },
      ...[
        [67.9, 94.6, 0.72],
        [75.6, 95.1, 0.66]
      ].map(
        ([x, y, k], i): SignPart => ({
          name: `its load, lifted onto it ${i + 1}`,
          svg: sack(x, y, k, i ? "#B8915A" : "#C9A66B"),
          origin,
          keys: track(
            away([
              [0.44 + i * 0.02, 0, 10.6],
              [0.48 + i * 0.02, 0, 0],
              [0.58, 0, 0]
            ])
          )
        })
      ),
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.6, GOLD),
        origin,
        keys: track(
          away([
            [0.04, -18, -0.8],
            [0.09, 0, 0],
            [0.58, 0, 0]
          ])
        )
      },
      ...takbir,
      { name: "his voice: glory to Him who made this serve us", svg: arcs(n(his[0] + 4), n(his[1] - 5), VOICE), keys: showWhile(0.3, 0.31, 0.58, 0.59), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "his voice, back home: returning, repenting", svg: arcs(n(his[0] + 4), n(his[1] - 5), VOICE), keys: showFrom(0.86, 0.87), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...back,
      { name: "a warm glow on the home", svg: wash(36, 102.4, 10, 2.6, WARM, 0.22), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "When he mounted his camel for a journey", from: 0.02, to: 0.13 },
      { text: "He said Allahu Akbar three times", from: 0.15, to: 0.27 },
      { text: "Glory to Him who made this serve us", from: 0.29, to: 0.41 },
      { text: "We could not have done it ourselves", from: 0.43, to: 0.55 },
      { text: "And to our Lord we will return", from: 0.57, to: 0.69 },
      { text: "When he returned, he said them and added", from: 0.71, to: 0.83 },
      { text: "We return, repent, worship, praise our Lord", from: 0.85, to: 1 }
    ]
  };
}

// For his brother. Anas said: the Prophet ﷺ said: none of you will have faith till he wishes for his brother what he
// likes for himself (Sahih al-Bukhari 13). No one is drawn: by one home is a place, a small dashed circle, with good food
// it likes by it and a warm glow; a faint light of faith is on it; a golden way goes to the home next to it, and a soft
// light of its wish goes over; the same good food comes at the other home, with a warm glow; and the light on its place
// grows full, and a soft ring of light comes about both homes.
function forHisBrother(): SignArt {
  const one: [number, number] = [52, 105];
  const other: [number, number] = [108, 105.2];
  return {
    kind: "for-his-brother",
    ms: 9000,
    parts: [
      ...dayAround([26, 18], 9000),
      { name: "palms", svg: palm(10, 98, 18) + palm(150, 97, 19) },
      { name: "a home", svg: home(44, 101, 15, 10) },
      { name: "another home, next to it", svg: home(116, 101, 15, 10, "#D8B07A", "#C29660", "#6B4A2E") },
      { name: "a place by the home", svg: someone(one[0], one[1]) },
      { name: "a place by the other home", svg: someone(other[0], other[1]) },
      { name: "what it likes: good food by it", svg: food(n(one[0] + 7), 107) },
      { name: "a warm glow on its good food", svg: wash(n(one[0] + 7), 106, 6, 2.4, WARM, 0.24), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      {
        name: "its faith: a light on its place, faint, then full",
        svg: glow(one[0], n(one[1] - 1), 5, "#FFF3C0", 0.34),
        origin: { x: one[0], y: n(one[1] - 1) },
        keys: track({
          opacity: [
            [0.05, 0],
            [0.1, 0.45],
            [0.74, 0.45],
            [0.8, 1]
          ],
          scale: [
            [0.74, 1],
            [0.82, 1.5]
          ]
        })
      },
      { name: "wishing for the other: a golden way between the homes", svg: way(`M${n(one[0] + 4)} 109.6 L${n(other[0] - 4)} 109.6`, GOLD, 1), keys: showFrom(0.37, 0.41) },
      {
        name: "its wish: a soft light going over",
        svg: sparkle(n(one[0] + 4), n(one[1] - 6), 1.6, "#FFF3C0") + glow(n(one[0] + 4), n(one[1] - 6), 3, "#FFF3C0", 0.3),
        keys: track({
          opacity: [
            [0.41, 0],
            [0.42, 1],
            [0.57, 1],
            [0.59, 0]
          ],
          xy: [
            [0.42, 0, 0],
            [0.56, n(other[0] - one[0] - 8), 0]
          ]
        })
      },
      { name: "a soft glow on the other home", svg: glow(other[0], n(other[1] - 5), 6, "#FFF6DA", 0.22), keys: showFrom(0.55, 0.59), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "the same good at the other home: good food", svg: food(n(other[0] - 7), 107), keys: showFrom(0.68, 0.7) },
      { name: "a warm glow on that good food", svg: wash(n(other[0] - 7), 106, 6, 2.4, WARM, 0.24), keys: showFrom(0.7, 0.74), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "a soft ring of light about both homes", svg: care(80, 105, 40, 6.6, "#FFF6DA"), keys: showFrom(0.84, 0.9) }
    ],
    words: [
      { text: "None of you will have faith", from: 0.02, to: 0.32 },
      { text: "Till he wishes for his brother", from: 0.34, to: 0.64 },
      { text: "What he likes for himself", from: 0.66, to: 1 }
    ]
  };
}

// The eight gates. Uqbah ibn Amir said: tending the camels was on us, and my turn came; I brought them back in the
// evening, and found the Messenger of Allah ﷺ standing, speaking to the people... and Umar said: he ﷺ said: none of you
// does wudu and does it well, then says: I bear witness that there is no god but Allah, and that Muhammad is the slave
// of Allah and His Messenger, but the eight gates of Paradise are opened for him; he enters by whichever of them he
// wishes (Sahih Muslim 234). No one is drawn: at evening camels come in with the place of the one tending them; by the
// masjid of Madinah his place is a golden ring, with the places of those about him, and his voice is arcs; near, a jug
// pours into a basin, and drops of water shine about the place of one doing wudu, with a soft light on it; two sparks of
// its witness rise and stay; far off, in a soft circle of light with no sun in it, eight gates show one after another;
// and its place shows at the gate it wishes, with a warm glow.
function eightGates(): SignArt {
  const his: [number, number] = [68, 105];
  const one: [number, number] = [34, 106];
  const far: [number, number] = [112, 36];
  const gates: [number, number][] = [98, 107.4, 116.6, 126].flatMap((x): [number, number][] => [
    [x, 33],
    [x, 45]
  ]);
  const camels = [
    [120, 0.13],
    [133, 0.12],
    [145, 0.13]
  ];
  return {
    kind: "eight-gates",
    ms: 12000,
    parts: [
      { name: "the evening sky", svg: sky("#F2B98A", "#FBE2C4", 62) + wash(80, 62, 80, 8, "#FFD9A8", 0.3) },
      { name: "clouds", svg: cloud(40, 22, 0.55, "#FFE9D2", 0.85) + cloud(150, 52, 0.5, "#FFE9D2", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills("#C9A982") },
      { name: "the land", svg: land() },
      { name: "palms of Madinah", svg: palm(8, 98, 18) + palm(152, 99, 16) },
      { name: "the masjid of Madinah", svg: madinahMasjid(56, 100.6, 0.5) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the places of those about him",
        svg: places([
          [60, 109],
          [65, 110.6],
          [71, 110.6],
          [76, 109],
          [56, 107],
          [80, 107]
        ])
      },
      { name: "the way in from the pasture", svg: way("M160 106 L96 107", "#FFF0C4", 1) },
      ...camels.map(
        ([x, k], i): SignPart => ({
          name: `a camel, brought back ${i + 1}`,
          svg: animalAt("camel", n(x - 50 * k), n(106 - 73 * k), k),
          keys: track({
            opacity: [
              [0.03, 0],
              [0.035, 1]
            ],
            xy: [
              [0.03, 40, 0],
              [0.095, 0, 0]
            ]
          }),
          loop: { move: "bob", ms: 1600 + i * 200, y: -0.3, phase: i / 3 }
        })
      ),
      {
        name: "the place of the one tending them",
        svg: someone(112, 106.6),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: [
            [0.03, 40, 0],
            [0.095, 0, 0],
            [0.17, 0, 0],
            [0.23, -26, 1]
          ]
        })
      },
      { name: "his voice, speaking to them", svg: arcs(n(his[0] + 4), n(his[1] - 5), VOICE), keys: showFrom(0.16, 0.17), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a jug of water", svg: jug(22, 106.4) },
      { name: "a basin", svg: basin(27.6, 109) },
      { name: "the place of one doing wudu", svg: someone(one[0], one[1]) },
      {
        name: "wudu: water poured from the jug",
        svg: `<path d="M26.4 101 Q27.4 104 27.6 108" stroke="#8CC8EA" stroke-width="0.7" fill="none"/>`,
        origin: { x: 26.4, y: 101 },
        keys: track({
          opacity: [
            [0.3, 0],
            [0.305, 1],
            [0.44, 1],
            [0.45, 0]
          ],
          scaleY: [
            [0.3, 0.1],
            [0.33, 1]
          ]
        })
      },
      {
        name: "done well: drops of water shining about its place",
        svg: drop(n(one[0] - 3), n(one[1] - 3)) + drop(n(one[0] + 3), n(one[1] - 4)) + drop(n(one[0] + 1), n(one[1] - 6.4)) + drop(n(one[0] - 1.6), n(one[1] - 7)),
        keys: showFrom(0.32, 0.35),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      { name: "done well: a soft light on its place", svg: glow(one[0], one[1], 3.6, "#FFFFFF", 0.3), keys: showFrom(0.34, 0.37) },
      { name: "its witness, rising: no god but Him", svg: sparkle(one[0], n(one[1] - 6), 1.8, "#FFE7A0") + glow(one[0], n(one[1] - 6), 3, WARM, 0.22), keys: risesAndStays(0.45, 0.5, 16), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      { name: "its witness, rising: Muhammad, His slave", svg: sparkle(n(one[0] + 3), n(one[1] - 6), 1.6, "#FFE7A0") + glow(n(one[0] + 3), n(one[1] - 6), 3, WARM, 0.22), keys: risesAndStays(0.59, 0.64, 22), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: 0.5 } },
      { name: "far off: a soft circle of light, with no sun in it", svg: farOff(far[0], far[1], 22) + ledge(far[0], n(far[1] + 14), 16), keys: showFrom(0.72, 0.74) },
      ...gates.map((at, i): SignPart => ({ name: `a gate of Paradise, opened ${i + 1}`, svg: smallGate(at[0], at[1]), keys: showFrom(at3(0.735 + i * 0.007), at3(0.74 + i * 0.007)) })),
      { name: "at the gate it wishes: its place", svg: someone(107.4, 46.4, 1.2), keys: showFrom(0.87, 0.89) },
      { name: "at the gate it wishes: a warm glow", svg: glow(107.4, 42.6, 6, WARM, 0.36), keys: showFrom(0.89, 0.93), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "My turn came to tend the camels", from: 0.02, to: 0.13 },
      { text: "I found him standing, speaking to the people", from: 0.15, to: 0.27 },
      { text: "Whoever does wudu, and does it well", from: 0.29, to: 0.41 },
      { text: "Then says: I testify, no god but Allah", from: 0.43, to: 0.55 },
      { text: "And Muhammad is His slave and Messenger", from: 0.57, to: 0.69 },
      { text: "The eight gates of Paradise open for him", from: 0.71, to: 0.83 },
      { text: "He enters by whichever he wishes", from: 0.85, to: 1 }
    ]
  };
}

// A house for twelve. Umm Habibah said: I heard the Messenger of Allah ﷺ say: whoever prays twelve rak'ahs in a day and
// night, a house is built for him by them in Paradise. Umm Habibah said: I never left them since I heard them from the
// Messenger of Allah ﷺ; and each who heard it after said the same (Sahih Muslim 728). No one is drawn: by a home, on a
// prayer mat, a place at prayer, and twelve small lights come about it one after another; far off, in a soft circle of
// light with no sun in it, a garden shows and a house rises in it, with a warm glow; then her voice, from her place by
// the home, and a warm glow on the mat; and the places of those who heard it after her each get a warm glow in turn.
function houseForTwelve(): SignArt {
  const mat: [number, number] = [60, 106];
  const place: [number, number] = [60, 101.6];
  const far: [number, number] = [118, 38];
  const lights = Array.from({ length: 12 }, (_, i): SignPart => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const [x, y] = [n(place[0] + 15 * Math.cos(a)), n(place[1] - 2 + 8.4 * Math.sin(a))];
    return {
      name: `twelve rak'ahs, counted ${i + 1}`,
      svg: sparkle(x, y, 1.3, "#FFE7A0") + glow(x, y, 2.4, WARM, 0.24),
      keys: showFrom(at3(0.04 + i * 0.018), at3(0.045 + i * 0.018)),
      loop: { move: "twinkle", ms: 1400, low: 0.65, phase: i / 12 }
    };
  });
  const after: [number, number][] = [
    [96, 110],
    [110, 111],
    [124, 110]
  ];
  return {
    kind: "house-for-twelve",
    ms: 10000,
    parts: [
      ...dayAround([22, 16], 10000),
      { name: "palms of Madinah", svg: palm(8, 98, 18) + palm(152, 98, 17) },
      { name: "a home", svg: home(28, 101, 16, 11) },
      { name: "her place, by the home", svg: someone(37, 105.4) },
      { name: "a prayer mat", svg: prayerMat(mat[0], mat[1]) },
      { name: "a place at prayer", svg: someone(place[0], place[1], 1.6) },
      ...lights,
      { name: "far off: a soft circle of light, with no sun in it", svg: farOff(far[0], far[1], 24), keys: showFrom(0.33, 0.36) },
      {
        name: "a garden in it",
        svg: ledge(far[0], n(far[1] + 12), 18) + roundTree(n(far[0] - 14), n(far[1] + 11.6), 8) + roundTree(n(far[0] + 14), n(far[1] + 11.6), 8),
        keys: showFrom(0.35, 0.38)
      },
      {
        name: "a house built for it, rising",
        svg: `<rect x="${n(far[0] - 7)}" y="${n(far[1] - 2)}" width="14" height="13" fill="#F2DDA6"/><rect x="${n(far[0] - 7)}" y="${n(far[1] - 2)}" width="5" height="13" fill="#000000" opacity="0.06"/><path d="M${n(far[0] - 2)} ${n(far[1] + 11)} L${n(far[0] - 2)} ${n(far[1] + 5)} Q${far[0]} ${n(far[1] + 3)} ${n(far[0] + 2)} ${n(far[1] + 5)} L${n(far[0] + 2)} ${n(far[1] + 11)} Z" fill="#C8963E"/>`,
        origin: { x: far[0], y: n(far[1] + 11) },
        keys: track({
          opacity: [
            [0.38, 0],
            [0.385, 1]
          ],
          scaleY: [
            [0.38, 0.05],
            [0.47, 1]
          ]
        })
      },
      { name: "its top, golden", svg: `<path d="M${n(far[0] - 8.4)} ${n(far[1] - 2)} L${n(far[0] + 8.4)} ${n(far[1] - 2)} L${n(far[0] + 6)} ${n(far[1] - 5)} L${n(far[0] - 6)} ${n(far[1] - 5)} Z" fill="${GOLD}"/>`, keys: showFrom(0.47, 0.49) },
      { name: "a warm glow on the house", svg: glow(far[0], n(far[1] + 3), 12, WARM, 0.3), keys: showFrom(0.49, 0.54), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "her voice: I never left them", svg: arcs(41, 100.4, VOICE), keys: showFrom(0.63, 0.64), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "kept: a warm glow on the mat", svg: wash(mat[0], mat[1], 11, 3, WARM, 0.24), keys: showFrom(0.65, 0.69), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "the places of those who heard it after her", svg: places(after) },
      ...after.map(([x, y], i): SignPart => ({ name: `kept by those who heard it after: a warm glow ${i + 1}`, svg: glow(x, n(y - 1), 4.4, WARM, 0.4), keys: showFrom(at3(0.72 + i * 0.06), at3(0.75 + i * 0.06)) }))
    ],
    words: [
      { text: "Whoever prays twelve rak'ahs, day and night", from: 0.02, to: 0.3 },
      { text: "A house is built for him in Paradise", from: 0.32, to: 0.6 },
      { text: "Umm Habibah said: I never left them since", from: 0.62, to: 1 }
    ]
  };
}

// Ready for Friday. Salman al-Farisi said: the Prophet ﷺ said: whoever bathes on Friday and cleans himself as much as
// he can, and puts on his oil, or touches the scent of his home, then goes out, and does not part two people, then
// prays what was written for him, then is quiet when the imam speaks, is forgiven what is between it and the other
// Friday (Sahih al-Bukhari 883). No one is drawn: by a home, a place, a small dashed circle; drops of water about it
// and a soft white light, by a basin; a small flask, and curls of scent about it; it goes along a dashed way to the
// masjid, passing behind two sitting together, not parting them, to its place among the rows; a soft glow on it as it
// prays, and sparks rise; the voice of the one who speaks, at the pulpit, and a calm light on it, quiet; and last, in
// the sky between this Friday and the other, a grey band goes, and a warm light comes on its place.
function readyForFriday(): SignArt {
  const at: [number, number] = [30, 105.4];
  const to: [number, number] = [104, 105.4];
  const walk = (): At[] => [
    [0.35, 0, 0],
    [0.39, 30, -4.4],
    [0.43, n(to[0] - at[0]), n(to[1] - at[1])]
  ];
  const moving = (svg: string, name: string, keys: SignKeys, loop?: SignPart["loop"]): SignPart => ({ name, svg, keys, ...(loop ? { loop } : {}) });
  const prayed = risingSparks(
    "what was written for it: its prayer, rising",
    [
      [102, 99.6],
      [106, 99]
    ],
    0.52,
    0.02,
    { stay: true, rise: 16 }
  );
  return {
    kind: "ready-for-friday",
    ms: 12000,
    parts: [
      ...dayAround([136, 16], 12000),
      { name: "palms of Madinah", svg: palm(150, 98, 18) },
      { name: "a home", svg: home(20, 101, 16, 11) },
      { name: "a basin of water by it", svg: basin(42, 108.6, 3.6), loop: { move: "twinkle", ms: 2000, low: 0.85 } },
      { name: "the masjid of Madinah", svg: madinahMasjid(98, 100.6, 0.55) },
      { name: "a pulpit", svg: pulpit(97, 104.2) },
      {
        name: "the places sitting in rows",
        svg: places([
          [100, 109.6],
          [106, 109.6],
          [112, 109.6],
          [118, 109.6],
          [124, 109.6],
          [103, 113],
          [109, 113],
          [115, 113],
          [121, 113]
        ])
      },
      { name: "two sitting together", svg: places([[89, 108.6], [92.6, 108.6]]) + care(90.8, 108.6, 4.8, 2.2, "#FFF6DA") },
      { name: "its way to the masjid, behind them", svg: way("M34 106 Q62 98 100 104.6", "#FFF0C4", 1), keys: showFrom(0.34, 0.35) },
      moving(
        someone(at[0], at[1]),
        "a place, by its home",
        track({ xy: walk() })
      ),
      moving(
        drop(n(at[0] - 3), n(at[1] - 3)) + drop(n(at[0] + 3), n(at[1] - 4)) + drop(n(at[0] + 1), n(at[1] - 6.4)) + drop(n(at[0] - 1.4), n(at[1] - 6.8)),
        "bathed: drops of water about its place",
        track({
          opacity: [
            [0.04, 0],
            [0.07, 1],
            [0.34, 1],
            [0.345, 0]
          ]
        }),
        { move: "twinkle", ms: 900, low: 0.5 }
      ),
      moving(
        glow(at[0], at[1], 3.6, "#FFFFFF", 0.3),
        "clean: a soft white light on its place",
        track({
          opacity: [
            [0.08, 0],
            [0.11, 1]
          ],
          xy: walk()
        })
      ),
      { name: "its oil and scent: a small flask by the home", svg: flask(12, 107), keys: showFrom(0.19, 0.21) },
      moving(
        curl(n(at[0] - 3), n(at[1] - 2)) + curl(n(at[0] + 3), n(at[1] - 2.6)) + curl(at[0], n(at[1] - 4)),
        "the scent about its place: soft curls rising",
        track({
          opacity: [
            [0.22, 0],
            [0.26, 1]
          ],
          xy: walk()
        }),
        { move: "twinkle", ms: 1400, low: 0.55 }
      ),
      { name: "praying: a soft glow on its place", svg: glow(to[0], to[1], 4, "#FFF6DA", 0.32), keys: showFrom(0.5, 0.53) },
      ...prayed,
      { name: "the voice of the one who speaks, at the pulpit", svg: arcsLeft(91, 96.6, VOICE), keys: showFrom(0.66, 0.67), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "quiet, listening: a calm light on its place", svg: glow(to[0], to[1], 4.4, "#DCEBFA", 0.4), keys: showFrom(0.68, 0.72) },
      { name: "this Friday and the other: two golden marks", svg: `<circle cx="40" cy="30" r="1.8" fill="${GOLD}"/><circle cx="120" cy="30" r="1.8" fill="${GOLD}"/>`, keys: showFrom(0.82, 0.84) },
      {
        name: "what is between them: a grey band, forgiven",
        svg: `<rect x="42" y="29" width="76" height="2" rx="1" fill="${GREY}"/>`,
        origin: { x: 42, y: 30 },
        keys: track({
          opacity: [
            [0.82, 0],
            [0.84, 1],
            [0.9, 1],
            [0.95, 0]
          ],
          scaleX: [
            [0.86, 1],
            [0.95, 0.1]
          ]
        })
      },
      { name: "a warm light on its place", svg: glow(to[0], n(to[1] - 1), 4.6, WARM, 0.36), keys: showFrom(0.93, 0.96), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "Whoever bathes on Friday, cleans himself", from: 0.02, to: 0.15 },
      { text: "Puts on oil, or the scent of his home", from: 0.17, to: 0.31 },
      { text: "Then goes out, not parting two people", from: 0.33, to: 0.47 },
      { text: "Then prays what was written for him", from: 0.49, to: 0.63 },
      { text: "Then is quiet when the imam speaks", from: 0.65, to: 0.79 },
      { text: "Forgiven what is between the two Fridays", from: 0.81, to: 1 }
    ]
  };
}

// The right on His servants. Mu'adh said: I rode behind the Prophet ﷺ on a donkey called 'Ufayr, and he said: O
// Mu'adh, do you know what Allah's right on His servants is, and what the servants' right on Allah is? I said: Allah and
// His Messenger know best. He said: Allah's right on the servants is that they worship Him and join nothing with Him,
// and the servants' right on Allah is that He does not punish one who joins nothing with Him. I said: O Messenger of
// Allah, shall I not give the people the good news? He said: do not give them the good news, lest they rely on it
// (Sahih al-Bukhari 2856). No one is drawn and no one rides: the donkey walks the road from Madinah with his place, a
// golden ring, and the place of the one behind him, a small dashed circle; his voice asks, and the other's voice answers;
// far off, at homes that worship Him alone, a warm glow and a spark rising from each; a soft shelter of light comes over
// them; a way toward them shows, for the good news; and at "do not" the way goes, while their deeds keep rising.
function rightOnServants(): SignArt {
  const feet: [number, number] = [68, 104.6];
  const s = 0.18;
  const his: [number, number] = [56, 105.8];
  const other: [number, number] = [49.6, 105.8];
  const comes: { opacity: [number, number][]; xy: At[] } = {
    opacity: [
      [0.03, 0],
      [0.035, 1]
    ],
    xy: [
      [0.03, -40, 0],
      [0.095, 0, 0]
    ]
  };
  const homes: [number, number][] = [
    [110, 92],
    [126, 90],
    [142, 93]
  ];
  const deeds = risingSparks(
    "kept at their deeds: rising again",
    homes.map(([x, y]): [number, number] => [x, n(y - 8)]),
    0.875,
    0.015
  );
  return {
    kind: "right-on-servants",
    ms: 12000,
    parts: [
      ...dayAround([136, 18], 12000),
      { name: "palms of Madinah", svg: palm(8, 98, 18) + palm(20, 99, 15) },
      ...homes.map(([x, y], i): SignPart => ({ name: `a home far off ${i + 1}`, svg: home(x, y, 10, 7, "#D8B07A", "#C29660", "#6B4A2E") })),
      { name: "the road", svg: `<path d="M0 107.6 L160 107.6" stroke="#CDB58E" stroke-width="3.2"/>` },
      { name: "the donkey 'Ufayr, walking", svg: animalAt("donkey", n(feet[0] - 50 * s), n(feet[1] - 73 * s), s), keys: track(comes), loop: { move: "bob", ms: 900, y: -0.4, rotate: 0.6 } },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD), keys: track(comes) },
      { name: "the place of the one behind him", svg: someone(other[0], other[1]), keys: track(comes) },
      { name: "his voice, asking: do you know?", svg: arcs(n(his[0] + 3), n(his[1] - 5), VOICE), keys: showWhile(0.16, 0.17, 0.295, 0.305), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the voice of the one behind him: they know best", svg: arcsLeft(n(other[0] - 4), n(other[1] - 5), VOICE), keys: showWhile(0.3, 0.31, 0.435, 0.445), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: the right on them", svg: arcs(n(his[0] + 3), n(his[1] - 5), VOICE), keys: showWhile(0.44, 0.45, 0.712, 0.72), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...homes.map(([x, y], i): SignPart => ({ name: `worshipping Him alone: a warm glow at the home ${i + 1}`, svg: glow(x, n(y - 3), 6, WARM, 0.34), keys: showFrom(0.45, 0.49), loop: { move: "twinkle", ms: 1800, low: 0.75, phase: i / 3 } })),
      ...homes.map(([x, y], i): SignPart => ({
        name: `worshipping Him alone: a spark rising ${i + 1}`,
        svg: sparkle(x, n(y - 8), 1.5, "#FFE7A0"),
        keys: risesAndStays(at3(0.46 + i * 0.01), at3(0.48 + i * 0.01), 8),
        loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 3 }
      })),
      { name: "not punished: a soft shelter of light over them", svg: `<path d="M100 96 Q126 64 152 96" stroke="#FFF3C0" stroke-width="1" fill="#FFF8E6" fill-opacity="0.3"/>`, keys: showFrom(0.59, 0.64) },
      { name: "the voice of the one behind him: shall I tell them?", svg: arcsLeft(n(other[0] - 4), n(other[1] - 5), VOICE), keys: showWhile(0.72, 0.73, 0.855, 0.865), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the good news: a way toward the homes", svg: way("M60 106 Q84 100 104 95", "#FFF0C4", 1), keys: showWhile(0.74, 0.78, 0.87, 0.9) },
      { name: "his voice: do not", svg: arcs(n(his[0] + 3), n(his[1] - 5), VOICE), keys: showFrom(0.86, 0.87), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...deeds
    ],
    words: [
      { text: "I rode behind him on a donkey called Ufayr", from: 0.02, to: 0.13 },
      { text: "Do you know Allah's right on His servants?", from: 0.15, to: 0.27 },
      { text: "I said: Allah and His Messenger know best", from: 0.29, to: 0.41 },
      { text: "To worship Him and join nothing with Him", from: 0.43, to: 0.55 },
      { text: "Their right: He does not punish who joins none", from: 0.57, to: 0.69 },
      { text: "Shall I not give the people the good news?", from: 0.71, to: 0.83 },
      { text: "Do not, lest they rely on it", from: 0.85, to: 1 }
    ]
  };
}

// Pray as you have seen me pray. Malik ibn al-Huwayrith said: we came to the Prophet ﷺ, young men close in age, and
// stayed with him twenty days and nights. The Messenger of Allah ﷺ was merciful and gentle. When he thought we longed
// for our families, he asked us of those we had left behind, and we told him. He said: go back to your families, stay
// with them, teach them and bid them... and pray as you have seen me pray; and when the prayer comes, let one of you
// call the adhan for you, and let the eldest of you lead you (Sahih al-Bukhari 631). No one is drawn: by the masjid of
// Madinah his place is a golden ring; the places of the young ones come in and stay; twenty small marks of days and
// nights light up; a warm glow and a ring of care come about them; their homes far off get a soft light; his voice asks,
// and theirs answer; they go back along a way to their homes; a warm glow comes on them by a prayer mat; a voice calls
// the adhan, and the eldest's place goes in front.
function prayAsYouSaw(): SignArt {
  const his: [number, number] = [20, 105];
  const group: [number, number][] = [
    [36, 108.4],
    [41, 110.4],
    [46, 108.4],
    [51, 110.4],
    [56, 108.4]
  ];
  const eldest: [number, number] = [31, 110.4];
  const go: [number, number] = [62, -2];
  const travel = (front: At[] = []): At[] => [[0.03, 60, 0], [0.095, 0, 0], [0.6, 0, 0], [0.65, go[0], go[1]], ...front];
  const marks = [0, 1, 2, 3].map((k): SignPart => {
    const xs = [0, 1, 2, 3, 4].map((i) => 28 + (k * 5 + i) * 5.4);
    return {
      name: `twenty days and nights, counted ${k * 5 + 1} to ${k * 5 + 5}`,
      svg: xs.map((x) => `<circle cx="${n(x)}" cy="44" r="1.5" fill="#FFF3C0" stroke="${GOLD}" stroke-width="0.5"/>`).join(""),
      keys: showFrom(at3(0.16 + k * 0.018), at3(0.17 + k * 0.018))
    };
  });
  const mat: [number, number] = [108, 103.4];
  return {
    kind: "pray-as-you-saw",
    ms: 12000,
    parts: [
      ...dayAround([140, 16], 12000),
      { name: "palms of Madinah", svg: palm(4, 99, 16) + palm(70, 98, 17) },
      { name: "the masjid of Madinah", svg: madinahMasjid(8, 100.6, 0.5) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the homes they left behind, far off", svg: home(128, 99, 13, 9, "#D8B07A", "#C29660", "#6B4A2E") + home(146, 100, 12, 8) },
      { name: "a prayer mat by the homes", svg: prayerMat(mat[0], mat[1]) },
      {
        name: "the places of the young ones, close in age",
        svg: places(group),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: travel()
        })
      },
      {
        name: "the place of the eldest of them",
        svg: someone(eldest[0], eldest[1]),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: travel([
            [0.88, go[0], go[1]],
            [0.94, n(mat[0] - eldest[0]), n(mat[1] - 2.4 - eldest[1])]
          ])
        })
      },
      ...marks,
      { name: "merciful and gentle: a warm glow over them", svg: wash(44, 109, 22, 5, WARM, 0.24), keys: showWhile(0.31, 0.35, 0.6, 0.61) },
      { name: "a ring of care about them", svg: care(44, 109.4, 20, 4.6), keys: showWhile(0.33, 0.37, 0.6, 0.61) },
      { name: "missed: a soft light on the homes far off", svg: glow(136, 92, 9, "#FFF6DA", 0.22), keys: showFrom(0.45, 0.49), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "his voice, asking of those left behind", svg: arcs(n(his[0] + 4), n(his[1] - 5), VOICE), keys: showWhile(0.44, 0.45, 0.572, 0.58), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "their voices, telling him", svg: arcsLeft(32, 103, VOICE), keys: showWhile(0.48, 0.49, 0.572, 0.58), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: go back, teach them, pray as you saw", svg: arcs(n(his[0] + 4), n(his[1] - 5), VOICE), keys: showWhile(0.58, 0.59, 0.86, 0.87), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "their way back to their homes", svg: way("M60 109 Q82 107 96 106", "#FFF0C4", 1), keys: showFrom(0.585, 0.595) },
      { name: "teaching them: a warm glow on the homes", svg: wash(136, 100.4, 14, 3, WARM, 0.24), keys: showFrom(0.645, 0.655), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "praying as they saw: a warm glow by the mat", svg: wash(108, 106.4, 16, 4, "#FFF6DA", 0.3), keys: showFrom(0.73, 0.77) },
      { name: "the adhan: a voice from one of them", svg: arcs(n(group[4][0] + go[0] + 3), n(group[4][1] + go[1] - 5), VOICE), keys: showFrom(0.86, 0.87), loop: { move: "twinkle", ms: 800, low: 0.45 } },
      { name: "the eldest, in front: a golden glow", svg: glow(mat[0], n(mat[1] - 2.4), 4.4, WARM, 0.4), keys: showFrom(0.94, 0.97), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "We came to him, young men close in age", from: 0.02, to: 0.13 },
      { text: "We stayed with him twenty days and nights", from: 0.15, to: 0.27 },
      { text: "He was merciful and gentle", from: 0.29, to: 0.41 },
      { text: "When we missed our families, he asked", from: 0.43, to: 0.55 },
      { text: "Go back to your families, teach them", from: 0.57, to: 0.69 },
      { text: "Pray as you have seen me pray", from: 0.71, to: 0.83 },
      { text: "One of you calls the adhan, the eldest leads", from: 0.85, to: 1 }
    ]
  };
}

export const SUNNAH_ART = {
  "setting-out": settingOut,
  "for-his-brother": forHisBrother,
  "eight-gates": eightGates,
  "house-for-twelve": houseForTwelve,
  "ready-for-friday": readyForFriday,
  "right-on-servants": rightOnServants,
  "pray-as-you-saw": prayAsYouSaw
};
