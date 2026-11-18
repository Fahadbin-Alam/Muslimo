import { animalAt, cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { GREY } from "./lovedArt";
import { dish } from "./worthArt";
import { food } from "./hopeArt";
import { EVENING } from "./heartArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, dayAround, farOff, gardenIn, lightIn, palms, sparkRising, track } from "./daysArt";

/**
 * Rights and mercy, drawn as the scenes of blessings and the Quran are (blessingArt.ts): spread the salam, and you will
 * love one another; feed people, and give salam to those you know and those you do not; be fair between your
 * children; a garden given in charity for a mother who died; rights paid on the Day, even to the hornless sheep; the
 * one who forgets and eats while fasting; and the kiss of mercy. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, an eye or a face: where
 * someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the
 * air. Nothing is drawn for Allah, and nothing comes down from the sky: a charity is a spark that rises, and what Allah
 * gives is a light that comes about its place. Paradise is only far off, in a soft circle of light with no sun in it.
 */

/** A grey shade over a place at (x, y): hunger, or a wrong done to it. */
const greyOn = (x: number, y: number, r = 4.4) => glow(x, y, r, GREY, 0.3);

/** A soft warm light about a place at (x, y). */
const warmOn = (x: number, y: number, r = 4.4) => glow(x, y, r, WARM, 0.42);

/** The shape of a small gift, a bundle, its foot's middle at (x, y). */
const bundle = (x: number, y: number) => `M${n(x - 1.5)} ${y} L${n(x + 1.5)} ${y} L${n(x + 1.3)} ${n(y - 2.4)} L${n(x - 1.3)} ${n(y - 2.4)} Z`;

/** A gift: a small bundle tied with a golden band, its foot's middle at (x, y). */
const gift = (x: number, y: number) =>
  `<path d="${bundle(x, y)}" fill="#B5473A"/>` +
  `<path d="M${x} ${y} L${x} ${n(y - 2.4)} M${n(x - 1.4)} ${n(y - 1.2)} L${n(x + 1.4)} ${n(y - 1.2)}" stroke="#E8C45A" stroke-width="0.4"/>` +
  `<path d="M${x} ${n(y - 2.4)} q-1 -1 -1.2 -0.1 M${x} ${n(y - 2.4)} q1 -1 1.2 -0.1" stroke="#E8C45A" stroke-width="0.4" fill="none"/>`;

/** Where no gift is: only the faint dashed outline of one, its foot's middle at (x, y). */
const noGift = (x: number, y: number) => `<path d="${bundle(x, y)}" stroke="${GREY}" stroke-width="0.4" stroke-dasharray="0.8 0.6" fill="none"/>`;

/** A level band of light from x `from` to `to` along y: fairness, the same for each. */
const levelBand = (from: number, to: number, y: number) =>
  `<rect x="${from}" y="${n(y - 0.7)}" width="${n(to - from)}" height="1.4" rx="0.7" fill="${WARM}" opacity="0.85"/><path d="M${from} ${y} L${to} ${y}" stroke="${GOLD}" stroke-width="0.4"/>`;

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y): with no horns, as the hornless one is. */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A ram's horns, curling back from the top of the sheep's head, in the picture card's own units. */
const HORNS = ["#8C7350 3.6", "#C9B48A 2.2"]
  .map((each) => {
    const [color, width] = each.split(" ");
    return `<path d="M70 26 C64 19 55 23 57 30 C58.6 35 65 35 64 30" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
  })
  .join("");

/** The horned sheep: the sheep of the picture cards, with horns. */
const hornedSheep = (x: number, y: number, s: number, left = false) => sheep(x, y, s, left).replace(/<\/g>$/, `${HORNS}</g>`);

/** A date, its middle at (x, y). */
const oneDate = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.55" fill="#8A4B24"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.2)}" rx="0.3" ry="0.15" fill="#B9774A"/>`;

/** A clear cup, its foot's middle at (x, y), `k` times its size. */
const clearCup = (x: number, y: number, k = 1) =>
  `<path d="M${n(x - 1.8 * k)} ${n(y - 4.4 * k)} L${n(x + 1.8 * k)} ${n(y - 4.4 * k)} L${n(x + 1.3 * k)} ${y} L${n(x - 1.3 * k)} ${y} Z" fill="#FFFFFF" fill-opacity="0.5" stroke="#8FB8D6" stroke-width="0.4"/>`;

/** The water in a clear cup whose foot's middle is at (x, y), `k` times its size. */
const waterIn = (x: number, y: number, k = 1) =>
  `<path d="M${n(x - 1.45 * k)} ${n(y - 3.4 * k)} L${n(x + 1.45 * k)} ${n(y - 3.4 * k)} L${n(x + 1.2 * k)} ${n(y - 0.3 * k)} L${n(x - 1.2 * k)} ${n(y - 0.3 * k)} Z" fill="#7FBCE6"/>`;

/** Shapes made `k` times bigger about (x, y). */
const bigger = (x: number, y: number, k: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

// Spread the salam. Abu Hurairah said: the Messenger of Allah ﷺ said: you will not enter Paradise until you believe,
// and you will not believe until you love one another. Shall I not point you to something which, if you do it, you
// will love one another? Spread the salam among you (Sahih Muslim 54). No one is drawn: his place is a golden ring,
// and six places stand on the land; far off, a soft circle of light shows faintly, with a garden in it. A faint light
// of faith comes in each place; two places come together, a ring of care comes about them, and their lights grow
// full. His voice speaks, and faint threads show between the places; then a voice of salam goes from each place, the
// threads shine, every light grows full, a ring of care comes about them all, and the far circle of light shines full.
function spreadTheSalam(): SignArt {
  const his: [number, number] = [20, 104.6];
  const places: [number, number][] = [
    [46, 101.4],
    [60, 104.8],
    [74, 100.6],
    [96, 104.6],
    [110, 100.8],
    [126, 104.4]
  ];
  // The two that come together when they love one another, and how far each comes.
  const comes: [number, number][] = [
    [0, 0],
    [0, 0],
    [5, 1.6],
    [-8, -1.6],
    [0, 0],
    [0, 0]
  ];
  const now = places.map(([x, y], i): [number, number] => [n(x + comes[i][0]), n(y + comes[i][1])]);
  const moved = (i: number): { xy?: [number, number, number][] } =>
    comes[i][0]
      ? {
          xy: [
            [0.22, 0, 0],
            [0.27, comes[i][0], comes[i][1]]
          ]
        }
      : {};
  const faith = (i: number): [number, number][] =>
    i === 2 || i === 3
      ? [
          [0.21, 0],
          [0.26, 0.45],
          [0.28, 0.45],
          [0.33, 1]
        ]
      : [
          [0.21, 0],
          [0.26, 0.45],
          [0.86, 0.45],
          [0.9, 1]
        ];
  const facesLeft = [false, false, true, false, true, true];
  const threads = now.slice(1).map(([x, y], i) => `M${now[i][0]} ${n(now[i][1] - 1.8)} Q${n((now[i][0] + x) / 2)} ${n(Math.min(now[i][1], y) - 5)} ${x} ${n(y - 1.8)}`);
  return {
    kind: "spread-the-salam",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [8, 99, 15],
        [150, 100, 14]
      ]),
      {
        name: "Paradise, far off: a soft circle of light with a garden in it",
        svg: farOff(128, 34, 12) + gardenIn(128, 34, 12),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.1, 0.5],
            [0.9, 0.5],
            [0.95, 1]
          ]
        })
      },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...places.map(([x, y], i): SignPart => ({ name: `a place ${i + 1}`, svg: someone(x, y, 1.5), ...(comes[i][0] ? { keys: track(moved(i)) } : {}) })),
      ...places.map(
        ([x, y], i): SignPart => ({
          name: `faith: a light in a place ${i + 1}`,
          svg: lightIn(x, y, 3.4),
          keys: track({ opacity: faith(i), ...moved(i) }),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 6 }
        })
      ),
      { name: "love: a ring of care about two places", svg: care(n((now[2][0] + now[3][0]) / 2), n((now[2][1] + now[3][1]) / 2), 8.4, 3.6), keys: showFrom(0.28, 0.32) },
      { name: "his voice: shall I not point you to something?", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showFrom(0.41, 0.42), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...threads.map(
        (d, i): SignPart => ({
          name: `love to come: a thread between places ${i + 1}`,
          svg: way(d, GOLD, 0.6),
          keys: track({
            opacity: [
              [0.62, 0],
              [0.68, 0.35],
              [0.86, 0.35],
              [0.9, 1]
            ]
          })
        })
      ),
      ...now.map(
        ([x, y], i): SignPart => ({
          name: `salam: a voice from a place ${i + 1}`,
          svg: facesLeft[i] ? arcsLeft(n(x - 2.4), n(y - 3.6), VOICE) : arcs(n(x + 2.4), n(y - 3.6), VOICE),
          keys: showFrom(at3(0.81 + i * 0.008), at3(0.816 + i * 0.008)),
          loop: { move: "twinkle", ms: 900, low: 0.5, phase: i / 6 }
        })
      ),
      { name: "loving one another: a ring of care about them all", svg: care(86, 103, 46, 5.8), keys: showFrom(0.88, 0.92) }
    ],
    words: [
      { text: "You will not enter Paradise till you believe", from: 0.02, to: 0.18 },
      { text: "Nor believe until you love one another", from: 0.2, to: 0.38 },
      { text: "Shall I not point you to something?", from: 0.4, to: 0.58 },
      { text: "If you do it, you will love one another", from: 0.6, to: 0.78 },
      { text: "Spread the salam among you", from: 0.8, to: 1 }
    ]
  };
}

// Feed and greet. Abdullah ibn Amr said: a man asked the Prophet ﷺ: what in Islam is best? He said: that you feed
// people, and give salam to those you know and those you do not know (Sahih al-Bukhari 12). No one is drawn: his place
// is a golden ring, and the place of the one who asks is beside it; its voice asks, and his voice answers. A place
// comes out of a home with food on a dish and brings it to a place under a grey shade of hunger; the grey goes, and a
// warm glow comes on it. Its voice gives salam to two places it knows, in a ring of care, and soft lights come on them;
// then a place comes along the road from far off, a soft light comes on that one too, and a wide ring of care comes
// about them all.
function feedAndGreet(): SignArt {
  const his: [number, number] = [18, 104.6];
  const asks: [number, number] = [30, 103.4];
  const giver: [number, number] = [72, 103.4];
  // How far the giver's place starts from where it stops: at the home's door.
  const out: [number, number] = [-15.8, -9.2];
  const hungry: [number, number] = [82.4, 104.4];
  const known: [number, number][] = [
    [100, 100.6],
    [108, 103.4]
  ];
  const stranger: [number, number] = [128, 101.4];
  const carried: [number, number, number][] = [
    [0.28, out[0], out[1]],
    [0.34, 0, 0]
  ];
  const comesOut: [number, number][] = [
    [0.27, 0],
    [0.275, 1]
  ];
  return {
    kind: "feed-and-greet",
    ms: 10000,
    parts: [
      ...dayAround([140, 18], 10000),
      ...palms([
        [6, 99, 14],
        [154, 99, 13]
      ]),
      { name: "a home", svg: home(58, 96, 16, 11) },
      { name: "the road from far off", svg: way("M160 99 Q142 99.4 124 101.8", "#FFF0C4", 1.1) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the place of the one who asks", svg: someone(asks[0], asks[1], 1.5) },
      { name: "its voice, asking: what in Islam is best?", svg: arcsLeft(n(asks[0] - 2.4), n(asks[1] - 3.8), VOICE), keys: showWhile(0.04, 0.05, 0.25, 0.26), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice, answering", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showFrom(0.26, 0.27), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "hunger: a grey shade on a place",
        svg: greyOn(hungry[0], hungry[1]),
        keys: track({
          opacity: [
            [0.36, 1],
            [0.4, 0]
          ]
        })
      },
      { name: "a place in need", svg: someone(hungry[0], hungry[1], 1.5) },
      { name: "a place, coming out of the home with food", svg: someone(giver[0], giver[1], 1.5), keys: track({ opacity: comesOut, xy: carried }) },
      { name: "food on a dish, given", svg: food(n(giver[0] + 4.4), n(giver[1] + 0.6)), keys: track({ opacity: comesOut, xy: carried }) },
      { name: "fed: a warm glow on the place in need", svg: warmOn(hungry[0], hungry[1]), keys: showFrom(0.37, 0.42), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "known: a ring of care about two places", svg: care(104, 102, 7.6, 3.4) },
      ...known.map(([x, y], i): SignPart => ({ name: `a place it knows ${i + 1}`, svg: someone(x, y, 1.5) })),
      { name: "its voice: salam", svg: arcs(n(giver[0] + 2.4), n(giver[1] - 3.8), VOICE), keys: showFrom(0.51, 0.52), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...known.map(
        ([x, y], i): SignPart => ({
          name: `salam: a soft light on a place it knows ${i + 1}`,
          svg: lightIn(x, y, 3.4),
          keys: showFrom(at3(0.55 + i * 0.02), at3(0.58 + i * 0.02)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 2 }
        })
      ),
      {
        name: "a place it does not know, coming along the road",
        svg: someone(stranger[0], stranger[1], 1.5),
        keys: track({
          opacity: [
            [0.76, 0],
            [0.765, 1]
          ],
          xy: [
            [0.76, 30, -2.4],
            [0.82, 0, 0]
          ]
        })
      },
      { name: "salam: a soft light on the place it does not know", svg: lightIn(stranger[0], stranger[1], 3.4), keys: showFrom(0.85, 0.9), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "salam to all: a wide ring of care", svg: care(100, 102.6, 31, 5.4), keys: showFrom(0.88, 0.93) }
    ],
    words: [
      { text: "A man asked him: what in Islam is best?", from: 0.02, to: 0.23 },
      { text: "He said: that you feed people", from: 0.25, to: 0.48 },
      { text: "And give salam to those you know", from: 0.5, to: 0.73 },
      { text: "And to those you do not know", from: 0.75, to: 1 }
    ]
  };
}

// A fair gift. Amir said: I heard an-Nu'man ibn Bashir on the minbar saying: my father gave me a gift, and Amrah bint
// Rawahah said: I will not be pleased until you make the Messenger of Allah ﷺ witness. So he came to the Messenger of
// Allah ﷺ and said: I have given my son by Amrah bint Rawahah a gift, and she told me to make you witness, O Messenger
// of Allah. He said: have you given the rest of your children the like of this? He said: no. He said: then fear Allah,
// and be fair between your children. So he went back and took back his gift (Sahih al-Bukhari 2587). No one is drawn:
// by a home, the giver's place gives a small gift to one young place, Nu'man's, with three other young places beside
// it; her place is by the home, her voice speaks, and a way shows to the masjid, where his place is a golden ring. The
// giver's place goes along it to him, and its voice speaks; his voice asks, and by each of the other young places shows
// only the faint outline of a gift. The giver's voice answers; his voice speaks, and a level band of light comes under
// all four young places. The giver's place goes back along the way, the gift goes back to it, the outlines go, and the
// band stays level under them all.
function aFairGift(): SignArt {
  const giver: [number, number] = [34, 103.4];
  const her: [number, number] = [12, 103.8];
  const numan: [number, number] = [44, 104.4];
  const giftAt: [number, number] = [47.8, 105.6];
  const others: [number, number][] = [
    [56, 103.4],
    [63, 104.8],
    [70, 103.6]
  ];
  const his: [number, number] = [126, 104.6];
  // How far the giver's place goes along the way, to stand before him; and the gift's way back to it.
  const to: [number, number] = [76, 1];
  const back: [number, number] = [-10.2, -0.8];
  const there: [number, number] = [giver[0] + to[0], giver[1] + to[1]];
  return {
    kind: "a-fair-gift",
    ms: 12000,
    parts: [
      ...dayAround([144, 16], 12000),
      { name: "a home", svg: home(22, 96, 18, 12) },
      { name: "the masjid of Madinah", svg: madinahMasjid(108, 99, 0.8) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the way to him", svg: way("M38 100.6 Q80 96.6 118 103", "#FFF0C4", 1.1), keys: showFrom(0.18, 0.22) },
      { name: "her place", svg: someone(her[0], her[1], 1.5) },
      {
        name: "the giver's place, going to him and back",
        svg: someone(giver[0], giver[1], 1.6),
        keys: track({
          xy: [
            [0.3, 0, 0],
            [0.33, 38, -4],
            [0.36, to[0], to[1]],
            [0.86, to[0], to[1]],
            [0.885, 38, -4],
            [0.91, 0, 0]
          ]
        })
      },
      { name: "the young place given the gift", svg: someone(numan[0], numan[1], 1.15) },
      ...others.map(([x, y], i): SignPart => ({ name: `another young place ${i + 1}`, svg: someone(x, y, 1.15) })),
      {
        name: "the gift, given and taken back",
        svg: gift(giftAt[0], giftAt[1]),
        keys: track({
          xy: [
            [0.03, back[0], back[1]],
            [0.075, 0, 0],
            [0.92, 0, 0],
            [0.95, back[0], back[1]]
          ]
        })
      },
      { name: "her voice: not until he is witness", svg: arcs(n(her[0] + 2.4), n(her[1] - 3.8), VOICE), keys: showWhile(0.16, 0.17, 0.29, 0.3), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the giver's voice: I gave a gift", svg: arcs(n(there[0] + 2.4), n(there[1] - 3.8), VOICE), keys: showWhile(0.362, 0.37, 0.43, 0.44), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice, asking: all the same?", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.44, 0.45, 0.57, 0.58), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...others.map(
        ([x, y], i): SignPart => ({
          name: `no gift like it: a faint outline by another young place ${i + 1}`,
          svg: noGift(n(x + 3.4), n(y + 1.2)),
          keys: track({
            opacity: [
              [at3(0.46 + i * 0.012), 0],
              [at3(0.47 + i * 0.012), 1],
              [0.92, 1],
              [0.95, 0]
            ]
          })
        })
      ),
      { name: "the giver's voice: no", svg: arcs(n(there[0] + 2.4), n(there[1] - 3.8), VOICE), keys: showWhile(0.58, 0.59, 0.71, 0.72), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: be fair", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.72, 0.73, 0.85, 0.86), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "be fair: a level band of light under the young places", svg: levelBand(40, 75, 107.6), keys: showFrom(0.74, 0.79), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "My father gave me a gift", from: 0.02, to: 0.13 },
      { text: "My mother asked for the Prophet as witness", from: 0.15, to: 0.27 },
      { text: "My father told him: I gave my son a gift", from: 0.29, to: 0.41 },
      { text: "Have you given all your children the same?", from: 0.43, to: 0.55 },
      { text: "My father said: no", from: 0.57, to: 0.69 },
      { text: "Fear Allah, and be fair to your children", from: 0.71, to: 0.83 },
      { text: "My father went back, took back his gift", from: 0.85, to: 1 }
    ]
  };
}

// A garden in charity. Ibn Abbas said: the mother of Sa'd ibn Ubadah died while he was away from her. He said: O
// Messenger of Allah, my mother died while I was away from her; will it help her if I give anything in charity for
// her? He said: yes. He said: then I make you witness that my garden al-Mikhraf is charity for her (Sahih al-Bukhari
// 2756). No one is drawn: her home stands by a palm, and the light in it goes out softly; far off, Sa'd's place comes
// back along the road to where his place is a golden ring, and its voice asks; a faint way shows from the garden
// al-Mikhraf to her home. His voice answers, and the way grows clearer; Sa'd's voice speaks again, and a golden light
// comes over the garden; then the way turns golden, sparks rise from the garden, and a soft light comes about her home.
function gardenInCharity(): SignArt {
  const herHome: [number, number] = [20, 96];
  const his: [number, number] = [58, 103.6];
  const sad: [number, number] = [70, 103];
  const toHer = "M112 103 Q68 116 22 97.6";
  const garden: [number, number, number][] = [
    [118, 99.6, 14],
    [128, 98.6, 15],
    [138, 99.6, 14],
    [148, 98.6, 15]
  ];
  return {
    kind: "garden-in-charity",
    ms: 12000,
    parts: [
      ...dayAround([146, 18], 12000),
      ...palms([[6, 99, 14]], "her home"),
      { name: "her home", svg: home(herHome[0], herHome[1], 16, 11) },
      {
        name: "her home: its light going out",
        svg: `<rect x="22" y="87.4" width="2.6" height="2.6" fill="${WARM}"/>` + glow(23.3, 88.7, 3.6, WARM, 0.4),
        keys: track({
          opacity: [
            [0.04, 1],
            [0.1, 0]
          ]
        })
      },
      { name: "the road from far off", svg: way("M100 63 Q92 86 72 102.6", "#FFF0C4", 1.1) },
      ...palms(garden, "al-Mikhraf"),
      {
        name: "the dates of al-Mikhraf",
        svg: garden
          .map(([x, y, h]) => {
            const tx = x + h * 0.08;
            const top = y - h;
            return `<circle cx="${n(tx - 1.4)}" cy="${n(top + 2.2)}" r="0.9" fill="#C0702E"/><circle cx="${n(tx + 1.4)}" cy="${n(top + 2.2)}" r="0.9" fill="#C0702E"/>`;
          })
          .join("")
      },
      { name: "the wall of the garden al-Mikhraf", svg: `<rect x="112" y="99.4" width="44" height="3.4" fill="#C9A06A"/><path d="M112 99.4 L156 99.4" stroke="#A9834F" stroke-width="0.5"/>` },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Sa'd's place, coming back from far off",
        svg: someone(sad[0], sad[1], 1.6),
        keys: track({
          xy: [
            [0.18, 29.4, -37.6],
            [0.21, 19, -18.4],
            [0.24, 0, 0]
          ]
        })
      },
      { name: "Sa'd's voice, asking", svg: arcsLeft(n(sad[0] - 2.4), n(sad[1] - 3.8), VOICE), keys: showWhile(0.25, 0.26, 0.49, 0.5), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "the way to her, faint",
        svg: way(toHer, "#FFF0C4", 0.9),
        keys: track({
          opacity: [
            [0.35, 0],
            [0.41, 0.4],
            [0.51, 0.4],
            [0.55, 0.7]
          ]
        })
      },
      { name: "his voice: yes", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.49, 0.5, 0.65, 0.66), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "Sa'd's voice: I make you witness", svg: arcsLeft(n(sad[0] - 2.4), n(sad[1] - 3.8), VOICE), keys: showFrom(0.65, 0.66), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the garden given: a golden light over it", svg: wash(134, 90, 24, 12, WARM, 0.26), keys: showFrom(0.68, 0.73), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "charity for her: the way turns golden", svg: way(toHer, GOLD, 1.1), keys: showFrom(0.82, 0.86) },
      ...[
        [122, 80],
        [134, 78],
        [146, 80]
      ].map(([x, y], i): SignPart => ({ name: `charity: a spark rising from the garden ${i + 1}`, svg: sparkle(x, y, 1.8, "#FFE7A0"), keys: sparkRising(at3(0.84 + i * 0.012), at3(0.88 + i * 0.012), 10) })),
      { name: "for her: a soft light about her home", svg: glow(herHome[0], 91, 10, WARM, 0.3) + care(herHome[0], 97.4, 11, 2.8), keys: showFrom(0.89, 0.94), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "Sa'd's mother died while Sa'd was away", from: 0.02, to: 0.15 },
      { text: "Sa'd: My mother died while I was away", from: 0.17, to: 0.31 },
      { text: "Will it help her if I give charity for her?", from: 0.33, to: 0.47 },
      { text: "He said: yes", from: 0.49, to: 0.63 },
      { text: "Sa'd: I make you witness: my garden", from: 0.65, to: 0.79 },
      { text: "al-Mikhraf is charity for her", from: 0.81, to: 1 }
    ]
  };
}

// The hornless sheep. Abu Hurairah said: the Messenger of Allah ﷺ said: rights will surely be paid to their owners on
// the Day of Resurrection, until the hornless sheep gets its due from the horned sheep (Sahih Muslim 2582). Only the
// land, the sky, the palms and the two sheep are drawn: the horned sheep butts the hornless one, and a grey mark of the
// wrong stays on it. Then the Day comes, a wide pale plain; a soft light comes about the hornless sheep; it butts the
// horned one back, the grey mark goes, a level band of light comes under both, and the light about it grows full.
function hornlessSheep(): SignArt {
  const horned: [number, number] = [92, 104];
  const hornless: [number, number] = [120, 104];
  const butted: [number, number, number][] = [
    [0.08, 0, 0],
    [0.095, 3, 0],
    [0.13, 0, 0]
  ];
  const buttsBack: [number, number, number][] = [
    [0.77, 0, 0],
    [0.8, -11, 0],
    [0.83, 0, 0]
  ];
  return {
    kind: "hornless-sheep",
    ms: 10000,
    parts: [
      ...dayAround([26, 18], 10000),
      ...palms(
        [
          [10, 99, 14],
          [150, 99, 13]
        ],
        "the pasture"
      ),
      {
        name: "the Day: a wide pale plain",
        svg: `<rect width="160" height="120" fill="#EEE8F0"/><rect y="70" width="160" height="50" fill="#E6DECD"/><path d="M0 70 L160 70" stroke="#D6CCB8" stroke-width="0.6"/>`,
        keys: showFrom(0.26, 0.31)
      },
      {
        name: "its due: a soft light about the hornless sheep",
        svg: glow(hornless[0], n(hornless[1] - 8), 10, WARM, 0.32) + care(hornless[0], n(hornless[1] + 0.6), 12, 2.6),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.57, 0.6],
            [0.88, 0.6],
            [0.93, 1]
          ],
          xy: buttsBack
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.75 }
      },
      { name: "justice: a level band of light under both", svg: levelBand(78, 134, 105.6), keys: showFrom(0.86, 0.9) },
      {
        name: "the horned sheep",
        svg: hornedSheep(horned[0], horned[1], 0.28),
        keys: track({
          xy: [
            [0.05, 0, 0],
            [0.08, 11, 0],
            [0.11, 0, 0],
            [0.8, 0, 0],
            [0.815, -3, 0],
            [0.85, 0, 0]
          ]
        })
      },
      { name: "the hornless sheep", svg: sheep(hornless[0], hornless[1], 0.28, true), keys: track({ xy: [...butted, ...buttsBack] }) },
      {
        name: "a wrong done: a grey mark on the hornless sheep",
        svg: greyOn(n(hornless[0] + 1.4), n(hornless[1] - 8.6), 4.6),
        keys: track({
          opacity: [
            [0.09, 0],
            [0.11, 1],
            [0.82, 1],
            [0.86, 0]
          ],
          xy: [...butted, ...buttsBack]
        })
      }
    ],
    words: [
      { text: "Rights will surely be paid to their owners", from: 0.02, to: 0.23 },
      { text: "On the Day of Resurrection", from: 0.25, to: 0.48 },
      { text: "Until the hornless sheep gets its due", from: 0.5, to: 0.73 },
      { text: "From the horned sheep", from: 0.75, to: 1 }
    ]
  };
}

// If he forgets, and eats. Abu Hurairah said: the Prophet ﷺ said: if he forgets, and eats and drinks, let him complete
// his fast, for it was Allah who fed him and gave him drink (Sahih al-Bukhari 1933). No one is drawn: by a home, a
// place sits fasting on a cloth, a soft ring of light about it; a date goes from the dish to it, and the water in the
// cup goes down. The ring of its fast grows full, and the sun goes on toward evening; then a warm glow comes on the
// dish, on the cup, and on its place.
function forgotAndAte(): SignArt {
  const at: [number, number] = [80, 102.4];
  const dishAt: [number, number] = [70, 104.6];
  const cupAt: [number, number] = [90, 104.6];
  return {
    kind: "forgot-and-ate",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "evening coming: a warm sky", svg: EVENING, keys: showFrom(0.47, 0.53) },
      {
        name: "the sun, going on toward evening",
        svg: sun(62, 16),
        keys: track({
          xy: [
            [0.43, 0, 0],
            [0.52, 70, 32]
          ]
        })
      },
      { name: "clouds", svg: cloud(40, 30, 0.6, "#FFFFFF", 0.9) + cloud(108, 24, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [10, 99, 15],
        [150, 99, 14]
      ]),
      { name: "a home", svg: home(118, 96, 18, 12) },
      {
        name: "a cloth spread to sit on",
        svg: `<path d="M60 107 L100 107 L97 100.8 L63 100.8 Z" fill="#C9A06A"/><path d="M62.4 106 L97.6 106 L95.4 101.8 L64.6 101.8 Z" stroke="#E8C45A" stroke-width="0.5" fill="none"/>`
      },
      {
        name: "fasting: a soft ring of light about its place",
        svg: care(at[0], n(at[1] + 0.6), 5.4, 2.4, WARM) + glow(at[0], at[1], 4.6, WARM, 0.16),
        keys: track({
          opacity: [
            [0.41, 0.5],
            [0.45, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.75 }
      },
      { name: "the place of the one fasting", svg: someone(at[0], at[1], 1.6) },
      {
        name: "a dish of dates",
        svg: bigger(
          dishAt[0],
          dishAt[1],
          1.5,
          dish(dishAt[0], dishAt[1]) +
            [
              [-1.8, -1.5],
              [-0.2, -1.7],
              [1.6, -1.4]
            ]
              .map(([dx, dy]) => oneDate(n(dishAt[0] + dx), n(dishAt[1] + dy)))
              .join("")
        )
      },
      {
        name: "a date, eaten",
        svg: bigger(dishAt[0], dishAt[1], 1.5, oneDate(n(dishAt[0] + 0.8), n(dishAt[1] - 2.6))),
        keys: track({
          opacity: [
            [0.07, 1],
            [0.09, 0]
          ],
          xy: [
            [0.04, 0, 0],
            [0.08, 6.6, -2.2]
          ]
        })
      },
      { name: "a cup", svg: clearCup(cupAt[0], cupAt[1], 1.5) },
      {
        name: "the cup's water, going down",
        svg: waterIn(cupAt[0], cupAt[1], 1.5),
        origin: { x: cupAt[0], y: n(cupAt[1] - 0.45) },
        keys: track({
          scaleY: [
            [0.22, 1],
            [0.27, 0.4]
          ]
        })
      },
      { name: "fed him: a warm glow on the dish", svg: warmOn(dishAt[0], n(dishAt[1] - 1.6), 5.4), keys: showFrom(0.62, 0.67), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "gave him drink: a warm glow on the cup", svg: warmOn(cupAt[0], n(cupAt[1] - 3), 5), keys: showFrom(0.82, 0.86), loop: { move: "twinkle", ms: 1500, low: 0.7, phase: 0.3 } },
      { name: "a warm glow on its place", svg: glow(at[0], at[1], 6, WARM, 0.36), keys: showFrom(0.88, 0.93), loop: { move: "twinkle", ms: 1700, low: 0.75 } }
    ],
    words: [
      { text: "If someone forgets, and eats", from: 0.02, to: 0.18 },
      { text: "And drinks", from: 0.2, to: 0.38 },
      { text: "Let that person complete the fast", from: 0.4, to: 0.58 },
      { text: "For it was Allah who fed that person", from: 0.6, to: 0.78 },
      { text: "And gave that person drink", from: 0.8, to: 1 }
    ]
  };
}

// The kiss of mercy. Abu Hurairah said: the Messenger of Allah ﷺ kissed al-Hasan ibn Ali while al-Aqra' ibn Habis
// at-Tamimi was sitting with him. Al-Aqra' said: I have ten children, and I have never kissed one of them. The Messenger
// of Allah ﷺ looked at him, then said: whoever is not merciful is not shown mercy (Sahih al-Bukhari 5997). No one is
// drawn: by a home, his place is a golden ring, and a small place, al-Hasan's, is beside it; a warm light comes about
// the small place. Al-Aqra's place comes and sits with him; its voice speaks, ten small places show as it tells of them,
// and a cool shade comes over them. His look goes to it as a faint golden line; his voice speaks, and a soft light of
// mercy comes about his place and the small one.
function kissOfMercy(): SignArt {
  const his: [number, number] = [46, 104.6];
  const hasan: [number, number] = [54.4, 104.4];
  const aqra: [number, number] = [84, 103.4];
  const ten = Array.from({ length: 10 }, (_, i): [number, number] => [n(102 + (i % 5) * 7 + Math.floor(i / 5) * 3.5), Math.floor(i / 5) ? 103.6 : 99.4]);
  const middle = n((his[0] + hasan[0]) / 2);
  return {
    kind: "kiss-of-mercy",
    ms: 12000,
    parts: [
      ...dayAround([136, 18], 12000),
      ...palms([
        [8, 99, 15],
        [154, 99, 13]
      ]),
      { name: "a home", svg: home(26, 96, 18, 12) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "al-Hasan's small place", svg: someone(hasan[0], hasan[1], 1.1) },
      { name: "a kiss of mercy: a warm light about the small place", svg: lightIn(hasan[0], hasan[1], 3.6), keys: showFrom(0.04, 0.08), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      {
        name: "al-Aqra's place, coming to sit with him",
        svg: someone(aqra[0], aqra[1], 1.6),
        keys: track({
          opacity: [
            [0.16, 0],
            [0.165, 1]
          ],
          xy: [
            [0.16, 26, -3],
            [0.21, 0, 0]
          ]
        })
      },
      { name: "al-Aqra's voice: ten, and never kissed", svg: arcsLeft(n(aqra[0] - 2.6), n(aqra[1] - 4), VOICE), keys: showWhile(0.3, 0.31, 0.57, 0.58), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...ten.map(
        ([x, y], i): SignPart => ({
          name: `ten small places, as it tells of them ${i + 1}`,
          svg: someone(x, y, 1.05),
          keys: track({
            opacity: [
              [at3(0.31 + i * 0.005), 0],
              [at3(0.314 + i * 0.005), 0.75]
            ]
          })
        })
      ),
      { name: "never kissed: a cool shade over the ten", svg: wash(119, 101.6, 21, 5.4, "#9FB4C8", 0.12), keys: showFrom(0.45, 0.5) },
      {
        name: "his look: a faint golden line to al-Aqra's place",
        svg: `<path d="M${n(his[0] + 2.6)} ${n(his[1] - 2.4)} Q${n((his[0] + aqra[0]) / 2)} 96.4 ${n(aqra[0] - 2.2)} ${n(aqra[1] - 1.6)}" stroke="${GOLD}" stroke-width="0.5" stroke-dasharray="1 1.2" fill="none" opacity="0.8"/>`,
        keys: showWhile(0.59, 0.63, 0.71, 0.72)
      },
      { name: "his voice: whoever is not merciful", svg: arcs(n(his[0] + 3.4), n(his[1] - 5), VOICE), keys: showFrom(0.72, 0.73), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "mercy: a soft light about his place and the small one",
        svg: glow(middle, 103.4, 9, WARM, 0.3) + care(middle, 104.8, 9.6, 3),
        keys: showFrom(0.87, 0.92),
        loop: { move: "twinkle", ms: 1700, low: 0.75 }
      }
    ],
    words: [
      { text: "He kissed al-Hasan ibn Ali", from: 0.02, to: 0.13 },
      { text: "Al-Aqra' ibn Habis was sitting with him", from: 0.15, to: 0.27 },
      { text: "Al-Aqra' said: I have ten children", from: 0.29, to: 0.41 },
      { text: "I have never kissed one of them", from: 0.43, to: 0.55 },
      { text: "He looked at him", from: 0.57, to: 0.69 },
      { text: "Then said: whoever is not merciful", from: 0.71, to: 0.83 },
      { text: "Is not shown mercy", from: 0.85, to: 1 }
    ]
  };
}

export const RIGHTS_ART = {
  "spread-the-salam": spreadTheSalam,
  "feed-and-greet": feedAndGreet,
  "a-fair-gift": aFairGift,
  "garden-in-charity": gardenInCharity,
  "hornless-sheep": hornlessSheep,
  "forgot-and-ate": forgotAndAte,
  "kiss-of-mercy": kissOfMercy
};
