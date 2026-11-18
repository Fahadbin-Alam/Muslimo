import { animalAt, cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, goldCoin, palms, track } from "./daysArt";
import { cloth, greyRing, soft, spark, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { kabah } from "./historyArt";
import { at3 } from "./storyArt";

/**
 * Promises kept and gifts given, in his ﷺ days and after: the wealth of Bahrain he promised Jabir, given by Abu Bakr
 * after him; the one who swore by Allah at the door that he would not ease a debt, and then gave all that was asked;
 * Hudhayfah and his father, who kept the covenant Quraysh took from them, and missed Badr for it; the coarse dress that
 * every bride in Madinah borrowed; the shade of the Ka'bah, where he said the wealthy are the losers but those who give
 * this way and that; the secret Anas kept, even from his mother; and the blessing he asked on all who brought their
 * charity. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no
 * person is ever drawn, not even a hand or a face: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down
 * from the sky: a du'a or a deed is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#E8C878";

/** Grey, for words that should not have been said. */
const GREY = "#8E8E8E";

/** Grey, for the places of those who were not with him. */
const OTHERS = "#7A7A7A";

/** Opacity keys through the given points, each [time, opacity]. */
const fade = (points: [number, number][]) => track({ opacity: points });

/** A small heap of gold coins, its foot's middle at (x, y). */
const goldHeap = (x: number, y: number) =>
  [
    [-2.2, -0.9],
    [0, -1.1],
    [2.2, -0.9],
    [-1.1, -2.5],
    [1.1, -2.5],
    [0, -3.9]
  ]
    .map(([dx, dy]) => goldCoin(n(x + dx), n(y + dy), 1.2))
    .join("");

/** A handful of gold: three coins, its middle at (x, y). */
const handful = (x: number, y: number) => goldCoin(n(x - 1.1), y, 1) + goldCoin(n(x + 1.1), y, 1) + goldCoin(x, n(y - 1.3), 1);

/** A camel of the picture cards with its load, its feet's middle at (x, y), `s` times its size; `left`: facing left. */
const ladenCamel = (x: number, y: number, s: number, left = false) => {
  const cx = x - 50 * s;
  const cy = y - 73 * s;
  const hump = left ? cx + 60 * s : cx + 40 * s;
  const top = cy + 26 * s;
  return {
    camel: animalAt("camel", n(cx), n(cy), s, left),
    load:
      `<rect x="${n(hump - 9 * s)}" y="${n(top - 2 * s)}" width="${n(18 * s)}" height="${n(5 * s)}" rx="${n(2 * s)}" fill="#9C3D1E"/>` +
      `<rect x="${n(hump - 13 * s)}" y="${n(top + 2 * s)}" width="${n(9 * s)}" height="${n(14 * s)}" rx="${n(2 * s)}" fill="#C8A274"/>` +
      `<rect x="${n(hump + 4 * s)}" y="${n(top + 2 * s)}" width="${n(9 * s)}" height="${n(14 * s)}" rx="${n(2 * s)}" fill="#B58D5E"/>`
  };
};

/** A dress of coarse cloth, folded, its middle at (x, y), with the rough weave of its cloth: no one in it. */
const coarseDress = (x: number, y: number) =>
  `<rect x="${n(x - 3.6)}" y="${n(y - 1.3)}" width="7.2" height="2.6" rx="0.6" fill="#A86A4A"/>` +
  `<path d="M${n(x - 3.6)} ${n(y - 0.2)} L${n(x + 3.6)} ${n(y - 0.2)}" stroke="#7E4A30" stroke-width="0.35"/>` +
  [-2.4, -1.2, 0, 1.2, 2.4].map((dx) => `<path d="M${n(x + dx - 0.3)} ${n(y + 0.3)} L${n(x + dx + 0.3)} ${n(y + 1)}" stroke="#7E4A30" stroke-width="0.3" opacity="0.7"/>`).join("");

/** A small silver coin, its middle at (x, y). */
const dirham = (x: number, y: number, r = 0.8) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#DDE2E8" stroke="#98A2AD" stroke-width="0.3"/>`;

/** A well of stones, its rim's middle at (x, y). */
const well = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.2" fill="#3E5A6E"/><path d="M${n(x - 3.2)} ${y} L${n(x - 3.2)} ${n(y + 1.6)} Q${x} ${n(y + 3)} ${n(x + 3.2)} ${n(y + 1.6)} L${n(x + 3.2)} ${y}" fill="#A99678"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.2" fill="none" stroke="#8C7A5C" stroke-width="0.5"/>`;

/** A ball of rags for play, its middle at (x, y). */
const ragBall = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="1" fill="#D9C7A0"/><path d="M${n(x - 0.9)} ${n(y - 0.2)} Q${x} ${n(y + 0.5)} ${n(x + 0.9)} ${n(y - 0.2)}" stroke="#A88E5E" stroke-width="0.3" fill="none"/>`;

/** The land from y 61 down, with a few tufts of dry grass. */
const dryLand = () =>
  landOf([
    [24, 110],
    [70, 112],
    [118, 110],
    [150, 108]
  ]);

// The promise of Bahrain. Jabir said: the Prophet ﷺ said to me: if the wealth of Bahrain came, I would give you this
// much, three times. It did not come until the Prophet ﷺ passed away. Then Abu Bakr had a caller call out: whoever had
// a promise or a debt from the Prophet ﷺ, let him come to us. I came to him and said: the Prophet ﷺ promised me; and he
// scooped out three handfuls for me (Sahih al-Bukhari 2598). No one is drawn: by the masjid of Madinah, his place, a
// golden ring, and Jabir's place beside it; the way from Bahrain goes off far to the right. His voice speaks, and faint
// golden rings show far off on that way, where the wealth would come from; three small lights show over Jabir's place,
// one by one: promised. His voice ends, and his ring fades softly into a faint golden ring where his place stood. A
// camel comes along the way from Bahrain, laden, and Abu Bakr's place shows by the masjid; a caller's place by its door
// calls out, and wide faint arcs go out over Madinah. A faint way shows from Jabir's place to Abu Bakr's; Jabir's place
// goes along it, and its voice speaks. Three handfuls of gold come from Abu Bakr's place to Jabir's, one by one, each
// in place of a light, and a soft golden ring comes about Jabir's place: the promise kept.
function promiseOfBahrain(): SignArt {
  const s = 0.13;
  const laden = ladenCamel(172, 100.4, s, true);
  const coming = track({
    xy: [
      [0.395, 0, 0],
      [0.455, -66, 0.8]
    ]
  });
  // Jabir's place, and what goes with it, along the faint way to Abu Bakr's place.
  const going: [number, number, number][] = [
    [0.775, 0, 0],
    [0.815, -27, 0.2]
  ];
  // A small light over Jabir's place, shown at `from`, gone as the handful in its place comes at `gone`.
  const promised = (i: number, x: number, y: number, from: number, gone: number): SignPart => ({
    name: `promised: a small light over Jabir's place ${i}`,
    svg: glow(x, y, 1.8, WARM, 0.3) + sparkle(x, y, 0.9, "#E8A93A"),
    keys: track({
      opacity: [
        [from, 0],
        [at3(from + 0.01), 1],
        [gone, 1],
        [at3(gone + 0.01), 0]
      ],
      xy: going
    }),
    loop: soft
  });
  // A handful of gold, from Abu Bakr's place to Jabir's at `from`.
  const scooped = (i: number, x: number, y: number, from: number): SignPart => ({
    name: `a handful of gold ${i}`,
    svg: handful(x, y),
    keys: track({
      opacity: [
        [from, 0],
        [at3(from + 0.005), 1]
      ],
      xy: [
        [from, n(38.4 - x), n(102.4 - y)],
        [at3(from + 0.015), 0, 0]
      ]
    })
  });
  return {
    kind: "promise-of-bahrain",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(118, 20) },
      { name: "a cloud", svg: cloud(70, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: dryLand() },
      { name: "the way from Bahrain", svg: way("M160 97.6 C138 98.6 112 100.8 86 102.8", "#F4E3BC", 1) },
      ...palms([
        [4, 96, 13],
        [92, 93, 11],
        [156, 95, 14]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(10, 98, 0.62) },
      {
        name: "his place, a golden ring",
        svg: ring(64, 103.6, 2.6, GOLD),
        keys: fade([
          [0.28, 1],
          [0.32, 0]
        ])
      },
      { name: "where his place stood: a faint golden ring", svg: care(64, 103.6, 3.4, 1.6, GOLD), keys: showAt(0.29, 0.33), loop: soft },
      { name: "his voice: if the wealth of Bahrain came", svg: arcs(66.8, 102.2, GOLD), keys: showFor(0.03, 0.04, 0.26, 0.27), loop: speaking },
      {
        name: "still to come: faint golden rings far off on the way from Bahrain",
        svg: care(144, 97.2, 2.8, 1.2, GOLD) + care(151, 96.8, 2.6, 1.1, GOLD),
        keys: showFor(0.05, 0.07, 0.395, 0.41),
        loop: soft
      },
      { name: "Jabir's place", svg: someone(78, 104.2), keys: track({ xy: going }) },
      promised(1, 74.8, 99.6, 0.145, 0.895),
      promised(2, 78, 98.6, 0.165, 0.915),
      promised(3, 81.2, 99.6, 0.185, 0.935),
      { name: "a camel from Bahrain, laden", svg: laden.camel, keys: coming },
      { name: "its load: the wealth of Bahrain", svg: laden.load, keys: coming },
      { name: "Abu Bakr's place", svg: someone(38.4, 104), keys: showAt(0.4, 0.41) },
      { name: "the caller's place, by the door of the masjid", svg: someone(24.4, 103.4), keys: showAt(0.42, 0.43) },
      { name: "the caller's voice: calling out", svg: arcs(27.2, 102, VOICE), keys: showFor(0.44, 0.45, 0.775, 0.785), loop: speaking },
      {
        name: "the call, reaching far: wide faint arcs over Madinah",
        svg: [0, 1, 2]
          .map((i) => {
            const h = 6 + i * 3.4;
            const ax = n(46 + i * 5);
            return `<path d="M${ax} ${n(96 - h)} Q${n(ax + h * 0.6)} 96 ${ax} ${n(96 + h * 0.4)}" stroke="#FFFFFF" stroke-width="0.6" stroke-dasharray="1.4 1.2" fill="none" opacity="0.8"/>`;
          })
          .join(""),
        keys: showFor(0.525, 0.545, 0.775, 0.785),
        loop: soft
      },
      { name: "come to us: a faint way from Jabir's place to Abu Bakr's", svg: way("M75 106 C66 107 52 107 42 105.6", "#FFFFFF", 0.6), keys: showFor(0.655, 0.675, 0.82, 0.83) },
      { name: "Jabir's voice: he promised me", svg: arcsLeft(48.4, 102.8, VOICE), keys: showFor(0.82, 0.83, 0.895, 0.905), loop: speaking },
      scooped(1, 54.4, 106, 0.895),
      scooped(2, 57.6, 106, 0.915),
      scooped(3, 56, 104.4, 0.935),
      { name: "kept: a soft golden ring about Jabir's place", svg: care(54, 105, 6.4, 2.4, SOFT_GOLD), keys: showAt(0.945, 0.96), loop: soft }
    ],
    words: [
      { text: "He said: if the wealth of Bahrain came,", from: 0.02, to: 0.125 },
      { text: "I would give you this much, three times", from: 0.14, to: 0.245 },
      { text: "It did not come until he passed away", from: 0.26, to: 0.375 },
      { text: "Abu Bakr had a caller call out:", from: 0.39, to: 0.505 },
      { text: "whoever had a promise or a debt,", from: 0.52, to: 0.635 },
      { text: "let him come to us", from: 0.65, to: 0.755 },
      { text: "Jabir: I went to Abu Bakr: he promised me", from: 0.77, to: 0.875 },
      { text: "and Abu Bakr scooped out three handfuls", from: 0.89, to: 1 }
    ]
  };
}

// The one who swore at the door. Aishah said: the Messenger of Allah ﷺ heard the voices of disputants at the door,
// their voices raised, and one of them was asking the other to reduce his debt and to be lenient with him in it, and
// the other was saying: by Allah, I will not do it. The Messenger of Allah ﷺ went out to them and said: where is the
// one who swears by Allah that he will not do a good deed? He said: I, O Messenger of Allah, and he may have whichever
// of that he likes (Sahih al-Bukhari 2705). No one is drawn: his home, and his place, a golden ring, in its doorway;
// outside, the places of the two, with the debt between them, a few coins on the ground. Their voices rise; the
// debtor's voice asks, and two of the coins glint: to be let off. The lender's voice answers in grey, and a faint grey
// ring comes about its place: I will not. His place goes out to them, and his voice speaks; a faint golden outline
// shows about the debt: the good deed not done. The lender's voice speaks softly, the grey ring fades, a soft golden
// line goes from the lender's place to the debtor's, a soft golden ring comes about the debt, and a warm glow about
// the two.
function sworeAtTheDoor(): SignArt {
  const debt = [
    [67.6, 106.2],
    [69.8, 106.6],
    [72, 106.2],
    [70.8, 105]
  ];
  return {
    kind: "swore-at-the-door",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(128, 20) },
      { name: "a cloud", svg: cloud(88, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: dryLand() },
      ...palms([
        [8, 97, 14],
        [118, 94, 12],
        [154, 96, 15]
      ]),
      { name: "his home", svg: home(36, 100, 26, 19) },
      { name: "the way past his door", svg: way("M30 104.2 C52 105.6 84 105.6 112 103.8", "#F4E3BC", 1) },
      {
        name: "his place, a golden ring, in the doorway",
        svg: ring(34.2, 98.4, 2.4, GOLD),
        keys: track({
          xy: [
            [0.395, 0, 0],
            [0.44, 12.8, 6.4]
          ]
        })
      },
      { name: "the debtor's place", svg: someone(59, 104.6) },
      { name: "the lender's place", svg: someone(83, 104.2) },
      { name: "the debt: a few coins on the ground", svg: debt.map(([x, y]) => goldCoin(x, y, 0.9)).join("") },
      { name: "the debtor's voice, raised", svg: arcs(61.8, 103.2, VOICE), keys: showFor(0.03, 0.04, 0.265, 0.275), loop: speaking },
      { name: "the lender's voice, raised", svg: arcsLeft(80.2, 102.8, GREY), keys: showFor(0.03, 0.04, 0.14, 0.15), loop: speaking },
      {
        name: "to be let off: two of the coins glint",
        svg: sparkle(67.6, 105, 0.8, "#FFFFFF") + sparkle(69.8, 105.4, 0.8, "#FFFFFF"),
        keys: showFor(0.15, 0.165, 0.265, 0.275),
        loop: soft
      },
      { name: "the lender's voice: I will not", svg: arcsLeft(80.2, 102.8, GREY), keys: showFor(0.265, 0.275, 0.395, 0.405), loop: speaking },
      { name: "I will not: a faint grey ring about the lender's place", svg: greyRing(83, 104.2, 3.4, 1.6), keys: showFor(0.29, 0.31, 0.79, 0.81) },
      { name: "his voice: where is the one who swears", svg: arcs(49.8, 103.4, GOLD), keys: showFor(0.525, 0.535, 0.775, 0.785), loop: speaking },
      { name: "the good deed, not done: a faint golden outline about the debt", svg: care(70, 105.8, 4.6, 1.7, GOLD), keys: showFor(0.655, 0.675, 0.915, 0.935), loop: soft },
      { name: "the lender's voice, softly: I", svg: arcsLeft(80.2, 102.8, VOICE), keys: showFor(0.775, 0.785, 0.895, 0.905), loop: speaking },
      { name: "given: a soft golden line from the lender's place to the debtor's", svg: lookLine(81, 103, 61, 103.4, 98.6, GOLD), keys: showAt(0.895, 0.915) },
      { name: "eased: a soft golden ring about the debt", svg: care(70, 105.8, 4.8, 1.8, SOFT_GOLD), keys: showAt(0.915, 0.935), loop: soft },
      { name: "a warm glow about the two", svg: glow(59, 104.4, 4, WARM, 0.26) + glow(83, 104, 4, WARM, 0.26), keys: showAt(0.935, 0.955) }
    ],
    words: [
      { text: "He heard disputants at the door,", from: 0.02, to: 0.125 },
      { text: "one asking the other to reduce his debt", from: 0.14, to: 0.245 },
      { text: "and the other saying: by Allah, I will not", from: 0.26, to: 0.375 },
      { text: "He went out to them and said:", from: 0.39, to: 0.505 },
      { text: "where is the one who swears by Allah", from: 0.52, to: 0.635 },
      { text: "that he will not do a good deed?", from: 0.65, to: 0.755 },
      { text: "The man said: I,", from: 0.77, to: 0.875 },
      { text: "and the debtor may have whichever he likes", from: 0.89, to: 1 }
    ]
  };
}

// The covenant kept. Hudhayfah ibn al-Yaman said: nothing kept me from being at Badr but that I went out with my
// father, Husayl, and the disbelievers of Quraysh took us. They said: you are going to Muhammad. We said: we are not
// going to him; we want nothing but Madinah. So they took from us Allah's covenant and pledge that we would go on to
// Madinah and not fight alongside him. We came to the Messenger of Allah ﷺ and told him the news, and he said: go on,
// both of you; we will keep their covenant, and ask Allah's help against them (Sahih Muslim 1787). No one is drawn: a
// road across the land, the wells of Badr far off on the left, the palms of Madinah far off on the right. The places of
// Hudhayfah and his father come along the road; grey places of Quraysh come up behind them, and a grey ring comes about
// the two: taken. A soft white glow comes about the two, the covenant, and a grey voice speaks. The grey places go off;
// a faint way shows toward Madinah. The two go along the road to near his place, a golden ring, with the places of the
// folk below the road, and Hudhayfah's voice tells him. His voice speaks; a soft golden ring comes about the two, the
// covenant kept, and they go on along the road toward Madinah. A spark rises from his place, asking Allah's help, and
// he and the folk go on toward Badr.
function covenantKept(): SignArt {
  // The two, and what goes with them: along the road, then on to near his place, then on along the road toward
  // Madinah, above his place and the places of the folk.
  const two: [number, number, number][] = [
    [0.145, 0, 0],
    [0.2, 22, -0.4],
    [0.655, 22, -0.4],
    [0.7, 62, -1.4],
    [0.8, 62, -1.4],
    [0.835, 100, -2.8],
    [0.9, 100, -2.8],
    [0.96, 134, -4]
  ];
  const quraysh = track({
    opacity: [
      [0.265, 0],
      [0.275, 1],
      [0.545, 1],
      [0.59, 0]
    ],
    xy: [
      [0.265, 0, 0],
      [0.3, 20, -0.4],
      [0.545, 20, -0.4],
      [0.59, -16, 0]
    ]
  });
  // His place and the places of the folk, on toward Badr at the end.
  const onToBadr = track({
    xy: [
      [0.925, 0, 0],
      [0.96, -16, 0.2]
    ]
  });
  return {
    kind: "covenant-kept",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(110, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: dryLand() },
      { name: "the road", svg: way("M0 104 C40 103.6 90 102 160 99", "#F4E3BC", 1.1) },
      { name: "the wells of Badr, far off", svg: well(8, 95) + well(17, 94.2) },
      { name: "Badr: a faint ring about its wells", svg: care(12.6, 95.2, 9, 2.4, "#FFFFFF"), keys: showAt(0.04, 0.06), loop: soft },
      ...palms(
        [
          [146, 92, 10],
          [153, 93, 11]
        ],
        "Madinah, far off"
      ),
      {
        name: "the covenant: a soft white glow about the two",
        svg: glow(8.5, 103.8, 5, "#FFFFFF", 0.22),
        keys: track({
          opacity: [
            [0.4, 0],
            [0.42, 1]
          ],
          xy: two
        }),
        loop: soft
      },
      { name: "Husayl's place", svg: someone(6, 104), keys: track({ xy: two }) },
      { name: "Hudhayfah's place", svg: someone(11, 103.8), keys: track({ xy: two }) },
      {
        name: "the places of Quraysh",
        svg: someone(-8, 103.2, 1.5, OTHERS) + someone(-3.4, 106.2, 1.5, OTHERS) + someone(-13, 106.4, 1.5, OTHERS),
        keys: quraysh
      },
      { name: "taken: a grey ring about the two", svg: greyRing(30.5, 103.4, 6.4, 2.2), keys: showFor(0.305, 0.32, 0.525, 0.535) },
      { name: "the voice of Quraysh", svg: arcs(18.4, 104.4, GREY), keys: showFor(0.395, 0.405, 0.525, 0.535), loop: speaking },
      { name: "toward Madinah: a faint way", svg: way("M40 102.6 C70 101.8 110 100.4 140 99.2", "#FFFFFF", 0.6), keys: showFor(0.525, 0.545, 0.82, 0.835) },
      { name: "his place, a golden ring", svg: ring(86, 106.4, 2.6, GOLD), keys: onToBadr },
      {
        name: "the places of the folk with him",
        svg: someone(93.6, 107.2) + someone(99, 105.8) + someone(104.4, 107.4) + someone(110, 105.8),
        keys: onToBadr
      },
      { name: "Hudhayfah's voice: telling him", svg: arcs(75.8, 102.6, VOICE), keys: showFor(0.705, 0.715, 0.775, 0.785), loop: speaking },
      { name: "his voice: go, we will keep their covenant", svg: arcsLeft(83, 104.6, GOLD), keys: showFor(0.775, 0.785, 0.895, 0.905), loop: speaking },
      {
        name: "kept: a soft golden ring about the two",
        svg: care(70.5, 102.4, 6.4, 2.2, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.785, 0],
            [0.8, 1]
          ],
          xy: [
            [0.8, 0, 0],
            [0.835, 38, -1.4],
            [0.9, 38, -1.4],
            [0.96, 72, -2.6]
          ]
        }),
        loop: soft
      },
      spark("asking for help: a spark rising from his place", 86, 103.4, 0.895, 0.925)
    ],
    words: [
      { text: "Hudhayfah: Only this kept me from Badr:", from: 0.02, to: 0.125 },
      { text: "I went out with my father, Husayl,", from: 0.14, to: 0.245 },
      { text: "and the disbelievers of Quraysh took us", from: 0.26, to: 0.375 },
      { text: "They took from us Allah's covenant", from: 0.39, to: 0.505 },
      { text: "to go on to Madinah and not fight with him", from: 0.52, to: 0.635 },
      { text: "We came and told him the news", from: 0.65, to: 0.755 },
      { text: "He said: go; we will keep their covenant", from: 0.77, to: 0.875 },
      { text: "and ask Allah's help against them", from: 0.89, to: 1 }
    ]
  };
}

// The dress every bride borrowed. Ayman said: I went in to Aishah, and on her was a coarse dress costing five dirhams.
// She said: look up at my slave girl, look at her: she is too proud to wear it at home. Yet I had a dress like it in
// the time of the Messenger of Allah ﷺ, and no woman in Madinah was made ready as a bride but she sent to me to borrow
// it (Sahih al-Bukhari 2628). No one is drawn, and the dress is drawn folded, with no one in it: Aishah's home in
// Madinah, her place before it, and the coarse dress by her place; the masjid and the homes of Madinah behind. Ayman's
// place comes. The dress glints, and five small silver coins show by it: its price. Her voice speaks; the place of her
// slave shows by the home, a faint line goes to it from Ayman's place, and a faint grey ring comes about it: too proud.
// Then the land grows warm and pale, long ago: the places of now fade, his place, a golden ring, shows by the masjid,
// and the dress takes on a soft golden sheen. Faint rings come about two homes of Madinah; the dress goes to the first,
// and a soft glow comes about it, a bride made ready; then to the second, and a soft glow comes about it; then it comes
// back.
function dressToBorrow(): SignArt {
  // The dress, lent: to the door of the first home, then of the second, then back.
  const lent: [number, number, number][] = [
    [0.835, 0, 0],
    [0.865, 67, -10.4],
    [0.88, 67, -10.4],
    [0.91, 95, -9.2],
    [0.925, 95, -9.2],
    [0.955, 0, 0]
  ];
  return {
    kind: "dress-to-borrow",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "a cloud", svg: cloud(96, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: dryLand() },
      ...palms([
        [6, 97, 14],
        [152, 96, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(62, 92, 0.5) },
      { name: "a home of Madinah 1", svg: home(104, 94, 13, 10) },
      { name: "a home of Madinah 2", svg: home(132, 95, 13, 10) },
      { name: "the way between the homes", svg: way("M44 104.6 C70 104.8 100 102 132 97.6", "#F4E3BC", 1) },
      { name: "Aishah's home", svg: home(30, 100, 22, 16) },
      { name: "Aishah's place", svg: someone(42, 104.2) },
      {
        name: "Ayman's place",
        svg: someone(-6, 104.6),
        keys: track({
          opacity: [
            [0.565, 1],
            [0.58, 0]
          ],
          xy: [
            [0.03, 0, 0],
            [0.085, 62, 0]
          ]
        })
      },
      {
        name: "a dress like it, long ago: a soft golden sheen",
        svg: glow(36, 104.4, 3.6, WARM, 0.24),
        keys: track({
          opacity: [
            [0.59, 0],
            [0.61, 1]
          ],
          xy: lent
        }),
        loop: soft
      },
      { name: "made ready: a soft glow about the first home", svg: glow(104, 88.6, 6, WARM, 0.26), keys: showAt(0.865, 0.875) },
      { name: "made ready: a soft glow about the second home", svg: glow(132, 89.6, 6, WARM, 0.26), keys: showAt(0.91, 0.92) },
      {
        name: "a coarse dress, folded, by Aishah's place",
        svg: coarseDress(36, 104.4),
        keys: track({
          xy: lent
        })
      },
      { name: "a glint on the dress", svg: sparkle(37.8, 103.4, 0.8, "#FFFFFF"), keys: showFor(0.16, 0.17, 0.29, 0.3), loop: soft },
      { name: "its price: five small silver coins", svg: [0, 1, 2, 3, 4].map((i) => dirham(n(32.8 + i * 1.6), 107.6)).join(""), keys: showFor(0.18, 0.19, 0.565, 0.58) },
      { name: "Aishah's voice", svg: arcs(44.8, 102.8, VOICE), keys: showFor(0.295, 0.305, 0.565, 0.575), loop: speaking },
      { name: "the slave's place", svg: someone(20, 104.6), keys: track({ opacity: [[0.31, 0], [0.32, 1], [0.565, 1], [0.58, 0]] }) },
      { name: "look: a faint line from Ayman's place to the slave's", svg: lookLine(54, 103.6, 22, 103.4, 97, "#FFFFFF"), keys: showFor(0.32, 0.34, 0.425, 0.435) },
      { name: "too proud: a faint grey ring about the slave's place", svg: greyRing(20, 104.6, 3.2, 1.5), keys: showFor(0.43, 0.45, 0.565, 0.58) },
      { name: "long ago: the land warm and pale", svg: wash(80, 100, 90, 22, "#FFF2D6", 0.16), keys: showAt(0.565, 0.58) },
      { name: "his place, a golden ring, by the masjid", svg: ring(76, 97, 2.2, GOLD), keys: showAt(0.6, 0.62) },
      { name: "brides to be: faint rings about two homes of Madinah", svg: care(104, 94.6, 8.4, 2.2, "#FFFFFF") + care(132, 95.6, 8.4, 2.2, "#FFFFFF"), keys: showAt(0.7, 0.72), loop: soft }
    ],
    words: [
      { text: "I went in to Aishah, and on her was", from: 0.02, to: 0.14 },
      { text: "a coarse dress costing five dirhams", from: 0.155, to: 0.275 },
      { text: "She said: look up at my slave girl", from: 0.29, to: 0.41 },
      { text: "she is too proud to wear it at home", from: 0.425, to: 0.545 },
      { text: "Yet I had one like it in his time,", from: 0.56, to: 0.68 },
      { text: "and no bride in Madinah was made ready", from: 0.695, to: 0.815 },
      { text: "but she sent to me to borrow it", from: 0.83, to: 1 }
    ]
  };
}

// In the shade of the Ka'bah. Abu Dharr said: I came to him as he was saying, in the shade of the Ka'bah: they are the
// losers, by the Lord of the Ka'bah; they are the losers, by the Lord of the Ka'bah. I said: what is the matter with
// me? Is something seen in me? What is the matter with me? I sat by him as he was saying it, and could not keep quiet,
// and there came over me what Allah willed. I said: who are they? He said: those with the most wealth, except one who
// does like this, and like this, and like this (Sahih al-Bukhari 6638). No one is drawn: in Makkah, the Ka'bah, its
// shade on the ground beside it, and his place, a golden ring, in the shade, the places of the folk about the open
// ground, and heaps of gold far off by the homes of Makkah. Abu Dharr's place comes. His voice speaks, and speaks
// again. Abu Dharr's voice speaks, low, and a faint grey ring comes about its place: worried; then its voice asks. His
// voice answers, and faint grey rings come about the heaps; then from the middle heap small lights go out, one way,
// another, and a third, and a soft golden ring comes about that heap in place of its grey one, and Abu Dharr's grey
// ring fades.
function shadeOfTheKabah(): SignArt {
  const coming = track({
    xy: [
      [0.03, 0, 0],
      [0.08, 34, -0.4]
    ]
  });
  // A small light, given: from the middle heap, out along (dx, dy), from `from`.
  const given = (i: number, dx: number, dy: number, from: number): SignPart => ({
    name: `given like this: a small light from the heap ${i}`,
    svg: glow(128, 99.4, 1.6, WARM, 0.36) + sparkle(128, 99.4, 0.8, "#E8A93A"),
    keys: track({
      opacity: [
        [from, 0],
        [at3(from + 0.005), 1]
      ],
      xy: [
        [from, 0, 0],
        [at3(from + 0.025), dx, dy]
      ]
    }),
    loop: soft
  });
  return {
    kind: "shade-of-the-kabah",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(40, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "the hills of Makkah", svg: hills("#B9A27C") },
      { name: "the land", svg: dryLand() },
      { name: "the open ground about the House", svg: `<ellipse cx="72" cy="101" rx="52" ry="8" fill="#F3EAD6"/>` },
      { name: "the shade of the Ka'bah", svg: `<path d="M50 99 L67 99 L58 104.6 L36 104.6 Z" fill="#5A4A36" opacity="0.16"/>` },
      { name: "the Ka'bah", svg: kabah(67, 99, 20) },
      { name: "a home of Makkah 1", svg: home(120, 95, 13, 10) },
      { name: "a home of Makkah 2", svg: home(146, 96, 13, 10) },
      { name: "the places of the folk about the House", svg: someone(96, 104.2) + someone(104, 102.4) + someone(30, 101.4) + someone(88, 106.4) },
      { name: "his place, a golden ring, in the shade", svg: ring(52, 102.4, 2.6, GOLD) },
      { name: "Abu Dharr's place", svg: someone(6, 104.4), keys: coming },
      { name: "his voice: they are the losers", svg: arcsLeft(49.4, 101, GOLD), keys: showFor(0.145, 0.155, 0.39, 0.4), loop: speaking },
      { name: "his voice, again", svg: arcsLeft(49.4, 96.4, GOLD), keys: showFor(0.265, 0.275, 0.39, 0.4), loop: speaking },
      { name: "Abu Dharr's voice, low", svg: arcsLeft(37.4, 103, VOICE), keys: showFor(0.395, 0.405, 0.655, 0.665), loop: speaking },
      {
        name: "worried: a faint grey ring about Abu Dharr's place",
        svg: greyRing(40, 104, 3.2, 1.5),
        keys: showFor(0.41, 0.43, 0.9, 0.92)
      },
      { name: "Abu Dharr's voice: who are they", svg: arcs(42.2, 102.6, VOICE), keys: showFor(0.665, 0.675, 0.775, 0.785), loop: speaking },
      { name: "his voice: those with the most wealth", svg: arcs(55, 101, GOLD), keys: showFor(0.775, 0.785, 0.895, 0.905), loop: speaking },
      { name: "the most wealth: heaps of gold by the homes of Makkah", svg: goldHeap(114, 101.6) + goldHeap(128, 102.4) + goldHeap(142, 102) },
      {
        name: "the losers: faint grey rings about the heaps",
        svg: greyRing(114, 100.4, 4, 2.2) + greyRing(142, 100.8, 4, 2.2),
        keys: showAt(0.795, 0.815)
      },
      { name: "a faint grey ring about the middle heap", svg: greyRing(128, 101.2, 4, 2.2), keys: showFor(0.795, 0.815, 0.94, 0.955) },
      given(1, -10, 3.4, 0.895),
      given(2, 10, 3.2, 0.91),
      given(3, 0, 6, 0.925),
      { name: "given: a soft golden ring about the middle heap", svg: care(128, 101.2, 4.4, 2.4, SOFT_GOLD), keys: showAt(0.94, 0.955), loop: soft }
    ],
    words: [
      { text: "Abu Dharr: I came to him by the Ka'bah", from: 0.02, to: 0.125 },
      { text: "He said: they are the losers,", from: 0.14, to: 0.245 },
      { text: "by the Lord of the Ka'bah", from: 0.26, to: 0.375 },
      { text: "I said: what is the matter with me?", from: 0.39, to: 0.505 },
      { text: "Is something seen in me?", from: 0.52, to: 0.635 },
      { text: "I said: who are they?", from: 0.65, to: 0.755 },
      { text: "He said: those with the most wealth,", from: 0.77, to: 0.875 },
      { text: "but one who does like this, and like this", from: 0.89, to: 1 }
    ]
  };
}

// The secret kept. Anas said: the Messenger of Allah ﷺ came to me as I was playing with the boys; he greeted us and
// sent me on an errand, and I was late coming to my mother. When I came, she said: what kept you? I said: the Messenger
// of Allah ﷺ sent me on an errand. She said: what was it? I said: it is a secret. She said: do not tell anyone the
// secret of the Messenger of Allah ﷺ (Sahih Muslim 2482). No one is drawn: a lane in Madinah, the places of the boys at
// play with a ball of rags, and Anas's place among them; a home along the way, and Umm Sulaym's home on the right. His
// place, a golden ring, comes; his voice greets them, and Anas's place goes off on the errand, a small golden glint
// with it. A warm, late light comes over the land, and Anas's place comes on to Umm Sulaym's home. Her voice asks, and
// Anas's voice answers; she asks again, and Anas's voice answers, and a soft golden ring comes about Anas's place: a
// secret. Her voice speaks again, and a warm glow comes about the home: kept.
function secretKept(): SignArt {
  const errand: [number, number, number][] = [
    [0.19, 0, 0],
    [0.23, 42, -8.4],
    [0.33, 42, -8.4],
    [0.37, 76, -0.2]
  ];
  return {
    kind: "secret-kept",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(62, 20) },
      { name: "a cloud", svg: cloud(120, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: dryLand() },
      ...palms([
        [4, 96, 13],
        [112, 93, 11]
      ]),
      { name: "the lane", svg: way("M0 105 C40 105.4 90 104.6 160 103.4", "#F4E3BC", 1) },
      { name: "the way to the home of the errand", svg: way("M46 104.4 C60 101 72 98 84 96", "#F4E3BC", 0.8) },
      { name: "the home of the errand", svg: home(86, 94.6, 12, 9) },
      { name: "Umm Sulaym's home", svg: home(136, 100, 20, 15) },
      { name: "Umm Sulaym's place", svg: someone(129, 104) },
      { name: "the places of the little ones at play", svg: someone(30, 104.4, 1.3) + someone(36, 102.4, 1.3) + someone(46, 104.8, 1.3), loop: { move: "bob", ms: 1400, y: -0.6 } },
      { name: "a ball of rags", svg: ragBall(40.6, 105.6), loop: { move: "bob", ms: 1100, x: 3, y: -1 } },
      { name: "Anas's place", svg: someone(40, 103.4, 1.3), keys: track({ xy: errand }) },
      {
        name: "his place, a golden ring",
        svg: ring(-6, 104.2, 2.6, GOLD),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.085, 28, 0]
          ]
        })
      },
      { name: "his voice: greeting them", svg: arcs(24.8, 102.8, GOLD), keys: showFor(0.16, 0.17, 0.2, 0.21), loop: speaking },
      {
        name: "the errand: a small golden glint with Anas's place",
        svg: sparkle(42.2, 101, 0.8, "#E8A93A"),
        keys: track({
          opacity: [
            [0.175, 0],
            [0.185, 1],
            [0.33, 1],
            [0.345, 0]
          ],
          xy: errand
        }),
        loop: soft
      },
      { name: "late: a warm evening light over the land", svg: wash(80, 98, 96, 26, "#FFD9A0", 0.14), keys: showAt(0.295, 0.33) },
      { name: "Umm Sulaym's voice: what kept you", svg: arcsLeft(126.2, 102.6, VOICE), keys: showFor(0.43, 0.44, 0.565, 0.575), loop: speaking },
      { name: "Anas's voice: he sent me", svg: arcs(118.6, 102, VOICE), keys: showFor(0.565, 0.575, 0.7, 0.71), loop: speaking },
      { name: "Umm Sulaym's voice: what was it", svg: arcsLeft(126.2, 102.6, VOICE), keys: showFor(0.7, 0.71, 0.735, 0.745), loop: speaking },
      { name: "Anas's voice: a secret", svg: arcs(118.6, 102, VOICE), keys: showFor(0.74, 0.75, 0.835, 0.845), loop: speaking },
      { name: "a secret: a soft golden ring about Anas's place", svg: care(116, 103.2, 3, 1.5, SOFT_GOLD), keys: showAt(0.755, 0.77), loop: soft },
      { name: "Umm Sulaym's voice: tell no one", svg: arcsLeft(126.2, 102.6, VOICE), keys: showAt(0.845, 0.855), loop: speaking },
      { name: "kept: a warm glow about the home", svg: glow(136, 93, 8, WARM, 0.26), keys: showAt(0.88, 0.91) }
    ],
    words: [
      { text: "Anas: he came to me as I played with boys", from: 0.02, to: 0.14 },
      { text: "He greeted us and sent me on an errand", from: 0.155, to: 0.275 },
      { text: "and I was late coming to my mother", from: 0.29, to: 0.41 },
      { text: "When I came, she said: what kept you?", from: 0.425, to: 0.545 },
      { text: "I said: he sent me on an errand", from: 0.56, to: 0.68 },
      { text: "She said: what was it? I said: a secret", from: 0.695, to: 0.815 },
      { text: "She said: tell no one his secret", from: 0.83, to: 1 }
    ]
  };
}

// A blessing on the givers. Abdullah ibn Abi Awfa said: when folk came to the Prophet ﷺ with their charity, he would
// say: O Allah, bless the family of so-and-so. My father came to him with his charity, and he said: O Allah, bless the
// family of Abu Awfa (Sahih al-Bukhari 1497). No one is drawn: by the masjid of Madinah, his place, a golden ring, and
// the charity gathered on a cloth; Abu Awfa's home far off on the left. The places of some folk come along the way
// with a sack, and set it down. His voice speaks, and a spark rises: the du'a. A soft golden glow comes about the folk,
// and they go back. Abu Awfa's place comes with a sack, and sets it down. His voice speaks, and a spark rises; a soft
// golden glow comes over Abu Awfa's home and the places of his household, and a soft golden ring about his place.
function blessTheGivers(): SignArt {
  const folkXY: [number, number, number][] = [
    [0.03, 0, 0],
    [0.09, 90, -0.4],
    [0.37, 90, -0.4],
    [0.42, 6, 0]
  ];
  const folk = track({ xy: folkXY });
  const awfa = track({
    xy: [
      [0.49, 0, 0],
      [0.55, 60, -0.4]
    ]
  });
  return {
    kind: "bless-the-givers",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(44, 20) },
      { name: "a cloud", svg: cloud(118, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: dryLand() },
      ...palms([
        [150, 96, 15],
        [60, 93, 11]
      ]),
      { name: "Abu Awfa's home, far off", svg: home(20, 94.4, 14, 10) },
      { name: "the places of Abu Awfa's household", svg: someone(30.6, 97.2, 1.2) + someone(34.4, 98.4, 1.2) },
      { name: "the way to the masjid", svg: way("M0 104.6 C30 105 60 104.6 86 103.4", "#F4E3BC", 1) },
      { name: "the masjid of Madinah", svg: madinahMasjid(98, 98, 0.62) },
      { name: "the charity, gathered: a cloth by the masjid", svg: cloth(100, 118, 102.4, "#E8D8B4") },
      { name: "a sack on the cloth", svg: sack(112, 104.6, 0.7, "#B8925A") },
      { name: "his place, a golden ring", svg: ring(92, 103.2, 2.6, GOLD) },
      { name: "the places of some folk", svg: someone(-14, 104.6) + someone(-20, 106) + someone(-26, 104.2), keys: folk },
      {
        name: "their charity: a sack",
        svg: sack(-10, 104.4, 0.7, "#C9A66B"),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.09, 90, -0.4],
            [0.095, 90, -0.4],
            [0.12, 113, -0.2]
          ]
        })
      },
      { name: "his voice: bless them", svg: arcsLeft(89.2, 101.8, GOLD), keys: showFor(0.18, 0.19, 0.335, 0.345), loop: speaking },
      spark("the du'a: a spark rising", 92, 100.4, 0.2, 0.245),
      {
        name: "blessed: a soft golden glow about the folk",
        svg: glow(-20, 104, 7, WARM, 0.3),
        keys: track({
          opacity: [
            [0.335, 0],
            [0.36, 1]
          ],
          xy: folkXY
        })
      },
      { name: "Abu Awfa's place", svg: someone(10, 104.8), keys: awfa },
      {
        name: "Abu Awfa's charity: a sack",
        svg: sack(14, 104.6, 0.7, "#C9A66B"),
        keys: track({
          xy: [
            [0.49, 0, 0],
            [0.55, 60, -0.4],
            [0.555, 60, -0.4],
            [0.57, 93.5, -0.2]
          ]
        })
      },
      { name: "his voice: bless the family of Abu Awfa", svg: arcsLeft(89.2, 101.8, GOLD), keys: showAt(0.645, 0.655), loop: speaking },
      spark("the du'a for Abu Awfa: a spark rising", 92, 100.4, 0.66, 0.705),
      { name: "blessed: a soft golden glow over Abu Awfa's home", svg: glow(20, 89.4, 8, WARM, 0.26), keys: showAt(0.8, 0.83) },
      { name: "a soft golden ring about Abu Awfa's place", svg: care(70, 104.4, 3.4, 1.6, SOFT_GOLD), keys: showAt(0.83, 0.85), loop: soft }
    ],
    words: [
      { text: "When folk came to him with their charity,", from: 0.02, to: 0.16 },
      { text: "he said: O Allah, bless the family", from: 0.175, to: 0.315 },
      { text: "of so-and-so", from: 0.33, to: 0.47 },
      { text: "Abdullah: My father came with his charity", from: 0.485, to: 0.625 },
      { text: "He said: O Allah, bless the family", from: 0.64, to: 0.78 },
      { text: "of Abu Awfa", from: 0.795, to: 1 }
    ]
  };
}

export const PROMISE_ART = {
  "promise-of-bahrain": promiseOfBahrain,
  "swore-at-the-door": sworeAtTheDoor,
  "covenant-kept": covenantKept,
  "dress-to-borrow": dressToBorrow,
  "shade-of-the-kabah": shadeOfTheKabah,
  "secret-kept": secretKept,
  "bless-the-givers": blessTheGivers
} as const;
