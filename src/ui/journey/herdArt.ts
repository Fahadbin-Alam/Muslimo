import { animalAt, cloud, glow, n, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { GREY } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, DAWN, farOff, gardenIn, lightIn, palms, tent, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";

/**
 * Animals in his ﷺ teaching: the good in the foreheads of horses; the race he held for horses; al-Adba', his
 * she-camel that was outrun; the rooster and the donkey; milking only with the owner's leave; a she-goat lent for its
 * milk; and his she-camel as a sutrah. Only the land, the sky, homes, things, plants and animals are drawn. No Prophet,
 * no Companion and no person is ever drawn, not even a hand or a face, and no one is drawn on a horse or a camel: where
 * someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in
 * the air. Nothing is drawn for Allah, and no angel and no devil is drawn: what the rooster and the donkey saw is not
 * shown. Nothing comes down from the sky: a du'a or a prayer is a spark that rises, and Paradise is only far off, in a
 * soft circle of light with no sun in it.
 */

/** A soft golden ring: a place or a thing marked out. */
const SOFT_GOLD = "#E8C25A";

/**
 * A horse of the picture cards, `s` times its size, its feet at (x, y); `lean`: its belly drawn slimmer, as horses
 * made lean for racing; `coat`: its near and far sides in other colors.
 */
const horseAt = (x: number, y: number, s: number, left = false, lean = false, coat?: [string, string]) => {
  let svg = animalAt("horse", n(x - 50 * s), n(y - 73 * s), s, left);
  if (lean) svg = svg.replace('cx="44" cy="41" rx="21" ry="10"', 'cx="44" cy="39.8" rx="21" ry="7.8"');
  return coat ? svg.replace(/#A2622F/g, coat[0]).replace(/#80491F/g, coat[1]) : svg;
};

/** Where a horse's forehead is, under its forelock, for a horse `s` times its size with its feet at (x, y). */
const forehead = (x: number, y: number, s: number, left = false): [number, number] => [n(x + (left ? -28 : 28) * s), n(y - 56 * s)];

/** A small light of good, its middle at (x, y). */
const goodLight = (x: number, y: number, r = 1.1) => glow(x, y, n(r * 1.8), WARM, 0.5) + sparkle(x, y, r, "#FFE7A0");

/** A camel of the picture cards in another coat, `s` times its size, its feet at (x, y). */
const camelIn = (x: number, y: number, s: number, main: string, far: string, left = false) => camel(x, y, s, left).replace(/#E2AC62/g, main).replace(/#C48A42/g, far);

/** Where the top of a camel's hump is, for a camel of the picture cards `s` times its size with its feet at (x, y). */
const hump = (x: number, y: number, s: number): [number, number] => [n(x - 10 * s), n(y - 52 * s)];

/** A camel lying down, as camels kneel at a stop (blessingArt.ts), with no saddle: its belly's middle at (x, y), facing right, `s` times its size. */
const kneeler = (x: number, y: number, s = 1) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<ellipse cx="${n(x - 5 * s)}" cy="${n(y - 0.9 * s)}" rx="${n(2.6 * s)}" ry="${n(1.1 * s)}" fill="#C48A42"/>` +
    `<ellipse cx="${n(x + 5.4 * s)}" cy="${n(y - 0.9 * s)}" rx="${n(2.6 * s)}" ry="${n(1.1 * s)}" fill="#C48A42"/>` +
    `<path d="M${p(-8.6, -4.6)} Q${p(-10.6, -3.2)} ${p(-9.8, -1.4)}" stroke="#9C6A30" stroke-width="${n(0.7 * s)}" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${x}" cy="${n(y - 4.2 * s)}" rx="${n(9.2 * s)}" ry="${n(3.9 * s)}" fill="#E2AC62"/>` +
    `<path d="M${p(-5.6, -6.6)} Q${p(-1.4, -12.6)} ${p(3, -6.8)} Z" fill="#E2AC62"/>` +
    `<path d="M${p(6.6, -6)} Q${p(10.8, -8.4)} ${p(11.2, -13.2)} L${p(13.6, -13.4)} Q${p(13.4, -7.6)} ${p(8.8, -3.2)} Z" fill="#E2AC62"/>` +
    `<ellipse cx="${n(x + 13.8 * s)}" cy="${n(y - 13.9 * s)}" rx="${n(2.9 * s)}" ry="${n(1.6 * s)}" fill="#E2AC62"/>` +
    `<path d="M${p(11.8, -15.1)} L${p(11.4, -16.4)} L${p(12.7, -15.3)} Z" fill="#C48A42"/>` +
    `<circle cx="${n(x + 14.2 * s)}" cy="${n(y - 14.4 * s)}" r="${n(0.4 * s)}" fill="#2B2B2B"/>` +
    `<path d="M${p(-8.6, -3)} Q${p(0, -0.6)} ${p(8.6, -3)} Q${p(0, 0.4)} ${p(-8.6, -3)} Z" fill="#C48A42" opacity="0.55"/>`
  );
};

/** A goat of the picture cards with a white coat, `s` times its size, its feet at (x, y), facing right, with her udder under her. */
const sheGoat = (x: number, y: number, s: number) => {
  const ux = n(x - 10 * s);
  const uy = n(y - 21.4 * s);
  return (
    animalAt("goat", n(x - 50 * s), n(y - 73 * s), s).replace(/#D9B88E/g, "#F3EFE7").replace(/#B8946A/g, "#D3CCBE") +
    `<ellipse cx="${ux}" cy="${uy}" rx="${n(8 * s)}" ry="${n(5.4 * s)}" fill="#E8A6A0"/>` +
    `<path d="M${n(ux - 3.4 * s)} ${n(uy + 4 * s)} L${n(ux - 3.6 * s)} ${n(uy + 8.6 * s)} M${n(ux + 3.4 * s)} ${n(uy + 4 * s)} L${n(ux + 3.6 * s)} ${n(uy + 8.6 * s)}" stroke="#D88A84" stroke-width="${n(2.4 * s)}" stroke-linecap="round"/>`
  );
};

/** Where a she-goat's udder is (sheGoat), for a goat `s` times its size with its feet at (x, y). */
const udder = (x: number, y: number, s: number): [number, number] => [n(x - 10 * s), n(y - 21.4 * s)];

/** A bowl of milk, its foot's middle at (x, y). */
const milkBowl = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${n(y - 2.4)} Q${n(x - 3)} ${y} ${x} ${y} Q${n(x + 3)} ${y} ${n(x + 3)} ${n(y - 2.4)} Z" fill="#B5713F"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.4)}" rx="3" ry="0.8" fill="#FBF7EC"/>`;

/** A circle drawn as a ring about (x, y), `r` across: a light in the sky marked out. */
const round = (x: number, y: number, r: number, color: string) => `<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" stroke-width="0.8" fill="none"/>`;

// The good in horses. Ibn Umar said that the Messenger of Allah ﷺ said: good will remain in the foreheads of horses
// until the Day of Resurrection (Sahih al-Bukhari 2849). No one is drawn: three horses stand in a green meadow. A warm
// glow comes over them, and then a small light of good comes on the forehead of each, under its forelock. Then the
// days go by, each night falling and lifting, and the lights stay on their foreheads through the nights; a foal comes
// to the herd, and a light comes on its forehead too.
function goodInHorses(): SignArt {
  const herd: { at: [number, number]; s: number; left: boolean }[] = [
    { at: [30, 100], s: 0.34, left: false },
    { at: [88, 105], s: 0.36, left: true },
    { at: [132, 99], s: 0.32, left: false }
  ];
  const foal: [number, number] = [55, 104];
  const foalS = 0.19;
  const bob = (i: number) => ({ move: "bob" as const, ms: 1600 + i * 240, y: -0.5, phase: i / 4 });
  // Two days and two nights, one after the other.
  const days = [0, 0.56, 0.6, 0.68, 0.72, 0.78, 0.82, 0.9, 0.94];
  const nights = (value: number): SignKeys => ({ at: days, opacity: [0, 0, value, value, 0, 0, value, value, 0] });
  const meadow = `<rect y="61" width="160" height="59" fill="#B7D68A"/><path d="M0 61 L160 61" stroke="#9DC173" stroke-width="0.7"/>`;
  const grass = [
    [10, 76],
    [48, 72],
    [70, 80],
    [112, 74],
    [150, 78],
    [14, 110],
    [64, 112],
    [108, 110],
    [146, 112]
  ]
    .map(([x, y], i) => tuft(x, y, i % 2 ? "#6DB24F" : "#5FA344", 4.4))
    .join("");
  const night: [number, number][] = [
    [14, 12],
    [36, 20],
    [52, 8],
    [70, 16],
    [92, 10],
    [110, 22],
    [128, 12],
    [146, 18],
    [22, 34],
    [60, 30],
    [100, 34],
    [140, 36]
  ];
  return {
    kind: "good-in-horses",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(26, 22), keys: { at: days, opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1] } },
      { name: "clouds", svg: cloud(70, 26, 0.6, "#FFFFFF", 0.9) + cloud(128, 20, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "green hills", svg: hills("#A9C98A") },
      { name: "the meadow", svg: meadow },
      { name: "grass of the meadow", svg: grass, origin: { x: 80, y: 110 }, loop: { move: "bob", ms: 3000, x: 0.5 } },
      { name: "good will remain: a warm glow over the horses", svg: wash(80, 96, 70, 14, WARM, 0.14), keys: showFrom(0.06, 0.14), loop: soft },
      ...herd.map(({ at: [x, y], s, left }, i): SignPart => ({ name: `a horse of the herd ${i + 1}`, svg: horseAt(x, y, s, left), loop: bob(i) })),
      {
        name: "a foal, come to the herd",
        svg: horseAt(foal[0], foal[1], foalS),
        keys: track({
          xy: [
            [0.72, -10, 0],
            [0.76, 0, 0]
          ],
          opacity: [
            [0.72, 0],
            [0.73, 1]
          ]
        }),
        loop: bob(3)
      },
      { name: "the days go by: night over the meadow", svg: `<rect width="160" height="120" fill="#0F1C3A"/>`, keys: nights(0.56) },
      { name: "the days go by: stars at night", svg: stars(night), keys: nights(1) },
      ...herd.map(
        ({ at: [x, y], s, left }, i): SignPart => ({
          name: `in the foreheads of horses: a light of good ${i + 1}`,
          svg: goodLight(...forehead(x, y, s, left)),
          keys: showFrom(at3(0.3 + i * 0.03), at3(0.33 + i * 0.03)),
          loop: bob(i)
        })
      ),
      { name: "in the foal's forehead too: a light of good", svg: goodLight(...forehead(foal[0], foal[1], foalS), 0.8), keys: showFrom(0.76, 0.79), loop: bob(3) }
    ],
    words: [
      { text: "Good will remain", from: 0.02, to: 0.24 },
      { text: "In the foreheads of horses", from: 0.26, to: 0.5 },
      { text: "Till the Day of Resurrection", from: 0.52, to: 1 }
    ]
  };
}

/** Dust thrown up behind a galloping horse whose feet are at (x, y). */
const dust = (x: number, y: number, s: number) =>
  `<ellipse cx="${n(x - 52 * s)}" cy="${n(y - 1.4)}" rx="2.8" ry="1.4" fill="#D9C291" opacity="0.9"/><ellipse cx="${n(x - 72 * s)}" cy="${n(y - 0.7)}" rx="1.9" ry="1" fill="#E3CFA2" opacity="0.8"/>`;

// The race of horses. Ibn Umar said: the Prophet ﷺ held a race of the horses made lean, from al-Hafya' to Thaniyat
// al-Wada', and of the horses not made lean, from the Thaniyah to the masjid of Bani Zurayq; and Ibn Umar was among
// those who raced (Sahih al-Bukhari 2868). No one is drawn, and no one is drawn on a horse: his place is a golden ring
// at the pass of Thaniyat al-Wada', between two low hills. Three lean horses come to the palms of al-Hafya', and a
// golden dashed way shows their course; they gallop along it, the fastest to the pass. Then they are gone, two horses
// not made lean wait at the pass, a second way shows their course, and they gallop to the masjid of Bani Zurayq. A soft
// ring comes about the first of them at the masjid, and a voice: Ibn Umar was among those who raced.
function horseRace(): SignArt {
  const his: [number, number] = [100, 105.6];
  const lean: { from: [number, number]; run: number; end: number }[] = [
    { from: [26, 92], run: 58, end: 0.37 },
    { from: [16, 95.5], run: 58, end: 0.38 },
    { from: [8, 99], run: 86, end: 0.36 }
  ];
  const heavy: { from: [number, number]; run: number; end: number }[] = [
    { from: [100, 95.5], run: 30, end: 0.76 },
    { from: [94, 99], run: 48, end: 0.75 }
  ];
  const leanS = 0.18;
  const heavyS = 0.21;
  const gallop = (i: number) => ({ move: "bob" as const, ms: 520 + i * 40, y: -0.6, phase: i / 3 });
  const leanRun = (run: number, end: number, show: [number, number][]) =>
    track({
      xy: [
        [0.04, -28, 0],
        [0.1, 0, 0],
        [0.24, 0, 0],
        [end, run, 0]
      ],
      opacity: show
    });
  const heavyRun = (run: number, end: number, show: [number, number][]) =>
    track({
      xy: [
        [0.64, 0, 0],
        [end, run, 0]
      ],
      opacity: show
    });
  const mounds =
    `<path d="M66 87 Q86 58 100 87 Z" fill="#C2A878"/><path d="M84.5 72.5 Q93 78 100 87 L90 87 Z" fill="#000000" opacity="0.08"/>` +
    `<path d="M100 87 Q117 56 134 87 Z" fill="#B89E70"/><path d="M117 71.5 Q126 78 134 87 L122 87 Z" fill="#000000" opacity="0.08"/>`;
  const road = `<path d="M0 87 L160 87 L160 103.2 L0 103.2 Z" fill="#EBDAB0"/><path d="M0 87 L160 87 M0 103.2 L160 103.2" stroke="#CDB283" stroke-width="0.5"/>`;
  return {
    kind: "horse-race",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "clouds", svg: cloud(46, 26, 0.6, "#FFFFFF", 0.9) + cloud(96, 18, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "Thaniyat al-Wada': the pass between two hills", svg: mounds },
      { name: "the masjid of Bani Zurayq", svg: madinahMasjid(138, 87, 0.42) },
      ...palms(
        [
          [5, 87, 17],
          [17, 85, 14],
          [27, 87, 12]
        ],
        "al-Hafya'"
      ),
      { name: "the way of the race", svg: road },
      { name: "a golden ring, his place at the pass", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "he held a race: the course from al-Hafya' to the pass", svg: way("M8 101 L96 101", SOFT_GOLD, 0.9), keys: showFrom(0.1, 0.14) },
      { name: "for the horses not made lean: the course from the pass to the masjid", svg: way("M100 101 L148 101", SOFT_GOLD, 0.9), keys: showFrom(0.5, 0.54) },
      ...lean.flatMap(({ from: [x, y], run, end }, i): SignPart[] => [
        {
          name: `dust behind a lean horse ${i + 1}`,
          svg: dust(x, y, leanS),
          keys: leanRun(run, end, [
            [0.24, 0],
            [0.26, 0.9],
            [at3(end - 0.02), 0.9],
            [end, 0]
          ])
        },
        {
          name: `a lean horse ${i + 1}`,
          svg: horseAt(x, y, leanS, false, true),
          keys: leanRun(run, end, [
            [0.04, 0],
            [0.045, 1],
            [0.44, 1],
            [0.47, 0]
          ]),
          loop: gallop(i)
        }
      ]),
      ...heavy.flatMap(({ from: [x, y], run, end }, i): SignPart[] => [
        {
          name: `dust behind a horse not made lean ${i + 1}`,
          svg: dust(x, y, heavyS),
          keys: heavyRun(run, end, [
            [0.64, 0],
            [0.66, 0.9],
            [at3(end - 0.02), 0.9],
            [end, 0]
          ])
        },
        {
          name: `a horse not made lean ${i + 1}`,
          svg: horseAt(x, y, heavyS, false, false, ["#6E4A2E", "#573823"]),
          keys: heavyRun(run, end, [
            [0.46, 0],
            [0.5, 1]
          ]),
          loop: gallop(i + 1)
        }
      ]),
      { name: "Ibn Umar among those who raced: a soft ring about a horse", svg: ring(142, 99.6, 9.4, SOFT_GOLD), keys: showFrom(0.86, 0.9), loop: soft },
      { name: "Ibn Umar's voice: I was among them", svg: arcs(152, 89.4, VOICE), keys: showFrom(0.87, 0.9), loop: speaking }
    ],
    words: [
      { text: "He held a race for the lean horses", from: 0.02, to: 0.2 },
      { text: "From al-Hafya' to Thaniyat al-Wada'", from: 0.22, to: 0.42 },
      { text: "And for the horses not made lean", from: 0.44, to: 0.6 },
      { text: "From the Thaniyah to Bani Zurayq's masjid", from: 0.62, to: 0.82 },
      { text: "Ibn Umar: I was among those who raced", from: 0.84, to: 1 }
    ]
  };
}

// Al-Adba'. Anas said: the Prophet ﷺ had a she-camel called al-Adba', and she could not be outrun. A bedouin came on a
// young camel of his and outran her, and that was hard on the Muslims. He ﷺ said: it is due from Allah that nothing of
// this world rises but He lowers it (Sahih al-Bukhari 6501). No one is drawn, and no one is drawn on a camel: his place
// is a golden ring by the track, among the places watching. Al-Adba' waits at the start in a soft ring; she runs with
// two camels and comes first, and a small light rises above her. Then a young camel comes, with a striped cloth on its
// back, and outruns her: her light goes down to her and fades, and a light rises above the young camel. His voice
// speaks, and the light above the young camel goes down to it and fades too.
function alAdba(): SignArt {
  const his: [number, number] = [94, 86];
  const s = 0.2;
  const youngS = 0.17;
  const adba: [number, number] = [18, 100.5];
  const young: [number, number] = [6, 105];
  const others: { from: [number, number]; run: number; main: string; far: string }[] = [
    { from: [26, 96], run: 92, main: "#C9965A", far: "#A8773E" },
    { from: [10, 105], run: 96, main: "#B98A55", far: "#986C3A" }
  ];
  const watching = [34, 46, 58, 70, 82];
  const stride = (i: number) => ({ move: "bob" as const, ms: 560 + i * 60, y: -0.5, phase: i / 4 });
  const cloth = (x: number, y: number, k: number) => {
    const p = (cx: number, cy: number) => `${n(x + (cx - 50) * k)} ${n(y + (cy - 73) * k)}`;
    return (
      `<path d="M${p(29, 31)} L${p(56, 31)} L${p(58, 40)} L${p(27, 40)} Z" fill="#B5473A"/>` +
      `<path d="M${p(28, 35.4)} L${p(57, 35.4)}" stroke="#F0D8A8" stroke-width="${n(2.2 * k)}"/>`
    );
  };
  const track1 = (run: number, end: number): [number, number, number][] => [
    [0.17, 0, 0],
    [end, run, 0]
  ];
  const adbaLight = hump(adba[0], adba[1], s);
  const youngEnd: [number, number] = [young[0] + 138, young[1]];
  const youngLight = hump(youngEnd[0], youngEnd[1], youngS);
  const post = `<path d="M153 107 L153 82" stroke="#7A5A38" stroke-width="0.9"/><path d="M153.4 82.2 L158.8 83.8 L153.4 85.4 Z" fill="#B5473A"/>`;
  const course = `<path d="M0 90 L160 90 L160 107.6 L0 107.6 Z" fill="#EBDAB0"/><path d="M0 90 L160 90 M0 107.6 L160 107.6" stroke="#CDB283" stroke-width="0.5"/>`;
  return {
    kind: "al-adba",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(28, 20) },
      { name: "clouds", svg: cloud(70, 24, 0.6, "#FFFFFF", 0.9) + cloud(124, 18, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...watching.map((x, i): SignPart => ({ name: `a place watching by the track ${i + 1}`, svg: someone(x, his[1]) })),
      { name: "a golden ring, his place by the track", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the track", svg: course },
      { name: "the post at the end of the track", svg: post },
      {
        name: "his she-camel called al-Adba': a soft ring about her",
        svg: ring(adba[0], n(adba[1] + 0.8), 9.6, SOFT_GOLD),
        keys: showWhile(0.04, 0.08, 0.17, 0.19),
        loop: soft
      },
      {
        name: "a camel in the first race 1",
        svg: camelIn(others[0].from[0], others[0].from[1], s, others[0].main, others[0].far),
        keys: track({
          xy: track1(others[0].run, 0.27),
          opacity: [
            [0.36, 1],
            [0.38, 0]
          ]
        }),
        loop: stride(0)
      },
      {
        name: "al-Adba' in the first race",
        svg: camel(adba[0], adba[1], s),
        keys: track({
          xy: track1(124, 0.25),
          opacity: [
            [0.36, 1],
            [0.38, 0]
          ]
        }),
        loop: stride(1)
      },
      {
        name: "a camel in the first race 2",
        svg: camelIn(others[1].from[0], others[1].from[1], s, others[1].main, others[1].far),
        keys: track({
          xy: track1(others[1].run, 0.27),
          opacity: [
            [0.36, 1],
            [0.38, 0]
          ]
        }),
        loop: stride(2)
      },
      {
        name: "she could not be outrun: a light rising above her",
        svg: goodLight(n(adbaLight[0] + 124), n(adbaLight[1] - 2.4)),
        keys: track({
          xy: [
            [0.255, 0, 0],
            [0.29, 0, -6]
          ],
          opacity: [
            [0.25, 0],
            [0.255, 1],
            [0.36, 1],
            [0.38, 0]
          ]
        })
      },
      {
        name: "al-Adba' at the start again",
        svg: camel(adba[0], adba[1], s),
        keys: track({
          xy: [
            [0.53, 0, 0],
            [0.61, 114, 0]
          ],
          opacity: [
            [0.37, 0],
            [0.39, 1]
          ]
        }),
        loop: stride(1)
      },
      {
        name: "the light above al-Adba'",
        svg: goodLight(adbaLight[0], n(adbaLight[1] - 2.4)),
        keys: track({
          xy: [
            [0.53, 0, -6],
            [0.61, 114, -6],
            [0.64, 114, 0]
          ],
          opacity: [
            [0.37, 0],
            [0.39, 1],
            [0.62, 1],
            [0.64, 0]
          ]
        })
      },
      {
        name: "a bedouin's young camel, with a striped cloth",
        svg: camelIn(young[0], young[1], youngS, "#A8743E", "#875A2C") + cloth(young[0], young[1], youngS),
        keys: track({
          xy: [
            [0.38, -28, 0],
            [0.45, 0, 0],
            [0.53, 0, 0],
            [0.6, 138, 0]
          ],
          opacity: [
            [0.38, 0],
            [0.385, 1]
          ]
        }),
        loop: stride(3)
      },
      {
        name: "it outran her: a light rising above the young camel",
        svg: goodLight(youngLight[0], n(youngLight[1] - 2.2)),
        keys: track({
          xy: [
            [0.615, 0, 0],
            [0.64, 0, -6],
            [0.86, 0, -6],
            [0.91, 0, 0]
          ],
          opacity: [
            [0.61, 0],
            [0.615, 1],
            [0.89, 1],
            [0.92, 0]
          ]
        })
      },
      { name: "his voice: it is due", svg: arcs(97, 85, VOICE), keys: showFrom(0.71, 0.74), loop: speaking }
    ],
    words: [
      { text: "He had a she-camel called al-Adba'", from: 0.02, to: 0.14 },
      { text: "She could not be outrun", from: 0.16, to: 0.34 },
      { text: "A bedouin came on a young camel of his", from: 0.36, to: 0.5 },
      { text: "And it outran her", from: 0.52, to: 0.68 },
      { text: "It is due from Allah", from: 0.7, to: 0.8 },
      { text: "Nothing worldly rises but He lowers it", from: 0.82, to: 1 }
    ]
  };
}

/** A rooster, its feet at (x, y), `s` times its size, facing right: dark green tail feathers, a red comb and wattle, and a beak. */
const rooster = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M-2.6 -5.6 Q-7.4 -9.6 -6.4 -14.2 Q-4.6 -10.4 -1.6 -8.4 Z" fill="#2F4A3A"/>` +
  `<path d="M-2.8 -5 Q-8.6 -6.4 -8.8 -11.4 Q-5.6 -8.4 -2 -7.4 Z" fill="#3E6B4E"/>` +
  `<path d="M-0.9 -3.2 L-1.2 0 M0.9 -3.2 L1.2 0 M-1.2 0 L-2.2 0.2 M1.2 0 L2.4 0.2" stroke="#E0A030" stroke-width="0.55" stroke-linecap="round"/>` +
  `<ellipse cx="0" cy="-5.4" rx="3.8" ry="2.7" fill="#B5502E"/>` +
  `<ellipse cx="-0.6" cy="-5.4" rx="2.3" ry="1.5" fill="#8E3A20"/>` +
  `<path d="M1.8 -6.6 Q2.4 -9.4 3 -10.6 L4.6 -10.2 Q4.4 -8 3.8 -5.6 Z" fill="#E08A3C"/>` +
  `<circle cx="3.6" cy="-10.4" r="1.45" fill="#E08A3C"/>` +
  `<path d="M2.6 -11.6 Q2.8 -12.9 3.5 -12 Q3.9 -13.2 4.5 -12 Q5 -12.6 5 -11.3 Z" fill="#D8302A"/>` +
  `<ellipse cx="4.5" cy="-8.9" rx="0.5" ry="0.8" fill="#D8302A"/>` +
  `<path d="M4.9 -10.8 L6.4 -10.2 L4.9 -9.7 Z" fill="#F2C14E"/>` +
  `<circle cx="3.9" cy="-10.7" r="0.32" fill="#2B2B2B"/>` +
  `</g>`;

// The rooster and the donkey. Abu Hurairah said that the Prophet ﷺ said: when you hear the crowing of the roosters,
// ask Allah for His favor, for they have seen an angel; and when you hear the braying of the donkey, seek refuge in
// Allah from Shaytan, for it has seen a devil (Sahih Muslim 2729). No one is drawn, and no angel and no devil is drawn:
// what each saw is not shown. At dawn, by a home, a rooster stands on a fence and crows; at the door, a place asks, a
// spark of du'a rises and a warm light comes about it. The rooster crows again. Then a donkey, tied to a post, brays;
// a golden ring of care comes about the place, and a spark of du'a rises; and the donkey brays again.
function roosterAndDonkey(): SignArt {
  const place: [number, number] = [30, 104.4];
  const fence =
    [46, 58, 70, 82, 94].map((x) => `<rect x="${n(x - 0.7)}" y="90.6" width="1.4" height="10.4" fill="#8E6A42"/>`).join("") +
    `<path d="M44 92.4 L96 92.4 M44 96.8 L96 96.8" stroke="#A07A4E" stroke-width="1"/>`;
  const donkey = animalAt("donkey", n(130 - 50 * 0.3), n(102 - 73 * 0.3), 0.3, true);
  const tie = `<rect x="107.4" y="88" width="1.4" height="14" fill="#7A5A38"/><path d="M108.6 90 Q114 94.4 120.2 89.4" stroke="#C9A877" stroke-width="0.5" fill="none"/>`;
  return {
    kind: "rooster-and-donkey",
    ms: 12000,
    parts: [
      { name: "the sky at dawn", svg: DAWN },
      { name: "clouds at dawn", svg: cloud(40, 30, 0.6, "#8C7F9E", 0.8) + cloud(116, 24, 0.5, "#8C7F9E", 0.75), loop: { move: "slide", ms: 12000 } },
      { name: "hills at dawn", svg: hills("#8D7E68") },
      { name: "the land at dawn", svg: landOf([[14, 74], [60, 72], [110, 76], [36, 108], [124, 108]], "#C4AC84") + `<rect y="61" width="160" height="59" fill="#2E3D6E" opacity="0.14"/>` },
      ...palms([[150, 94, 20]], "the town"),
      { name: "a home", svg: home(24, 100, 24, 15) },
      { name: "a place at the door", svg: someone(place[0], place[1], 1.7) },
      { name: "a fence", svg: fence },
      { name: "a rooster on the fence", svg: rooster(70, 90.8, 1.1), origin: { x: 70, y: 90.8 }, loop: { move: "bob", ms: 1400, y: -0.3 } },
      { name: "the donkey's post", svg: tie },
      { name: "a donkey, tied to its post", svg: donkey, loop: { move: "bob", ms: 2600, y: -0.25 } },
      { name: "the rooster crows", svg: arcs(78.6, 79.6, VOICE), keys: showWhile(0.04, 0.07, 0.18, 0.2), loop: speaking },
      spark("asking for His favor: a spark rising", place[0], 100.6, 0.2, 0.28),
      { name: "His favor: a warm light about the place", svg: lightIn(place[0], place[1], 4.6), keys: showFrom(0.24, 0.28), loop: soft },
      { name: "the rooster crows again", svg: arcs(79.2, 79, VOICE), keys: showWhile(0.35, 0.38, 0.5, 0.52), loop: speaking },
      { name: "the donkey brays", svg: arcsLeft(117.4, 88.4, GREY), keys: showWhile(0.52, 0.55, 0.66, 0.68), loop: speaking },
      { name: "refuge: a golden ring of care about the place", svg: care(place[0], n(place[1] + 0.2), 5, 2.6, GOLD), keys: showFrom(0.68, 0.72), loop: soft },
      spark("seeking refuge: a spark rising", place[0], 100.6, 0.7, 0.77),
      { name: "the donkey brays again", svg: arcsLeft(116.8, 88, GREY), keys: showFrom(0.85, 0.88), loop: speaking }
    ],
    words: [
      { text: "When you hear the rooster crow", from: 0.02, to: 0.16 },
      { text: "Then ask Allah for His favor", from: 0.18, to: 0.32 },
      { text: "For it has seen an angel", from: 0.34, to: 0.48 },
      { text: "When you hear the donkey bray", from: 0.5, to: 0.64 },
      { text: "Seek refuge in Allah from Shaytan", from: 0.66, to: 0.81 },
      { text: "For it has seen a devil", from: 0.83, to: 1 }
    ]
  };
}

/** A jar of food, its foot's middle at (x, y). */
const jar = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} Q${n(x - 2.3)} ${n(y - 2)} ${n(x - 1)} ${n(y - 3.4)} L${n(x + 1)} ${n(y - 3.4)} Q${n(x + 2.3)} ${n(y - 2)} ${n(x + 1.6)} ${y} Z" fill="#C98E52"/>` +
  `<rect x="${n(x - 1.2)}" y="${n(y - 4.1)}" width="2.4" height="0.8" fill="#8E6634"/>`;

// Milking only with leave. Ibn Umar said that the Messenger of Allah ﷺ said: let none milk another's animals without
// his leave. Would any of you like his store to be come to, his cupboard broken, and his food taken away? Their
// animals' udders store their food for them, so let none milk anyone's animals but with his leave (Sahih al-Bukhari
// 2435). No one is drawn: a she-goat grazes by her owner's home, and his place is at his door. A passer-by's place
// comes from its own home and stops by the goat: a grey dashed ring comes about her, and a dashed way goes from her to
// her owner. A way goes back to the passer-by's own store: its door is broken open, a grey ring comes about it, and a
// jar of its food is taken away. Then the store is shut, and a soft ring comes about the goat's udder, with a golden
// way to her owner's home. The passer-by goes to the owner's door and asks, the owner answers, a bowl of milk comes,
// and a warm glow; the grey ring about the goat is gone.
function askBeforeMilking(): SignArt {
  const owner: [number, number] = [25, 104.2];
  const goat: [number, number] = [64, 104];
  const goatS = 0.3;
  const [ux, uy] = udder(goat[0], goat[1], goatS);
  const graze = { move: "bob" as const, ms: 2400, y: -0.3 };
  const store =
    `<rect x="108" y="86" width="14" height="12" fill="#C9A06A"/><rect x="107.2" y="84.8" width="15.6" height="1.6" fill="#B08650"/>` +
    `<rect x="110.2" y="88.4" width="9.6" height="9.6" fill="#4A3424"/>`;
  const door =
    `<rect x="110.2" y="88.4" width="9.6" height="9.6" fill="#8E6634"/>` +
    `<path d="M113.4 88.4 L113.4 98 M116.6 88.4 L116.6 98" stroke="#6E4E28" stroke-width="0.4"/><circle cx="118.6" cy="93.4" r="0.45" fill="#3A2A1C"/>`;
  return {
    kind: "ask-before-milking",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "clouds", svg: cloud(36, 26, 0.6, "#FFFFFF", 0.9) + cloud(124, 20, 0.55, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the owner's home", svg: home(22, 100, 22, 14) },
      { name: "the owner's place at his door", svg: someone(owner[0], owner[1], 1.6) },
      { name: "a home on the other side", svg: home(142, 98, 18, 12) },
      { name: "its store", svg: store },
      { name: "a jar in the store", svg: jar(112.8, 98) },
      {
        name: "his food taken away: a jar",
        svg: jar(117.2, 98),
        keys: track({
          xy: [
            [0.53, 0, 0],
            [0.59, 28, 7]
          ],
          opacity: [
            [0.57, 1],
            [0.6, 0]
          ]
        })
      },
      {
        name: "his store broken open: its door",
        svg: door,
        origin: { x: 110.2, y: 93.2 },
        keys: { at: [0, 0.38, 0.42, 0.67, 0.7], scaleX: [1, 1, 0.18, 0.18, 1], rotate: [0, 0, -6, -6, 0] }
      },
      { name: "his food taken away: a grey way", svg: way("M118 97 L146 104.6", GREY, 0.8), keys: showWhile(0.53, 0.56, 0.67, 0.69) },
      { name: "his store broken: a grey dashed ring about it", svg: greyRing(115, 92, 10, 8), keys: showWhile(0.4, 0.44, 0.67, 0.69) },
      { name: "a she-goat, grazing", svg: sheGoat(goat[0], goat[1], goatS), loop: graze },
      { name: "not without his permission: a grey dashed ring about her", svg: greyRing(63.5, 94.6, 13.6, 11.6), keys: showWhile(0.1, 0.12, 0.9, 0.93) },
      { name: "his permission: a way to her owner", svg: way("M52.6 95 Q40 88 27.8 101.6", VOICE, 0.9), keys: showFrom(0.19, 0.23) },
      { name: "his permission: a soft ring about the owner's place", svg: ring(owner[0], n(owner[1] + 0.2), 3, SOFT_GOLD), keys: showFrom(0.22, 0.25), loop: soft },
      { name: "his own store: a way back to it", svg: way("M86.4 103.2 Q98 94 109 94.8", VOICE, 0.8), keys: showWhile(0.35, 0.38, 0.67, 0.69) },
      { name: "their udders store their food: a soft ring about her udder", svg: ring(ux, n(uy + 0.6), 2.6, SOFT_GOLD), keys: showFrom(0.69, 0.72), loop: graze },
      { name: "their food: a golden way to the owner's home", svg: way("M59.6 99.4 Q42 110 26 102.4", SOFT_GOLD, 0.9), keys: showFrom(0.71, 0.75) },
      {
        name: "a passer-by's place",
        svg: someone(138, 102.4, 1.6),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, -54, 2.6],
            [0.83, -54, 2.6],
            [0.85, -74, 6],
            [0.87, -92, 3.4]
          ]
        })
      },
      { name: "the passer-by's voice: asking leave", svg: arcsLeft(43.4, 104.6, VOICE), keys: showFrom(0.86, 0.88), loop: speaking },
      { name: "the owner's voice: his leave", svg: arcs(27.6, 104.4, VOICE), keys: showFrom(0.88, 0.9), loop: speaking },
      { name: "with leave: a bowl of milk", svg: milkBowl(61, 108.4), keys: showFrom(0.9, 0.93) },
      { name: "with leave: a warm glow", svg: wash(56, 106.4, 13, 3.6, WARM, 0.3), keys: showFrom(0.91, 0.94), loop: soft }
    ],
    words: [
      { text: "None should milk another's animals", from: 0.02, to: 0.16 },
      { text: "Without his permission", from: 0.18, to: 0.32 },
      { text: "Would any of you like his store broken", from: 0.34, to: 0.5 },
      { text: "And his food taken away?", from: 0.52, to: 0.64 },
      { text: "Their udders store their food", from: 0.66, to: 0.8 },
      { text: "So none should milk them but with leave", from: 0.82, to: 1 }
    ]
  };
}

// A she-goat lent for its milk. Abdullah ibn Amr said that the Messenger of Allah ﷺ said: there are forty good deeds,
// the highest of them lending a she-goat for its milk; no one does one of them, hoping for its reward and believing in
// its promise, but Allah admits him into Paradise by it. Hassan said: we counted the deeds below lending a she-goat,
// returning a greeting, answering one who sneezes, moving harm from the road and the like, and we could not reach
// fifteen (Sahih al-Bukhari 2631). No one is drawn: forty small lights stand in rows, one at the top. A ring comes about
// the highest, and a she-goat goes from one home to the next, along a golden way: a bowl of milk comes, and a warm glow.
// A soft ring comes about the place of the one who lent her, and a spark rises; far off, a soft circle of light with a
// garden comes, and a golden way to it. Then rings come about the lights below the highest, one by one, fourteen of
// them; the fifteenth gets a grey dashed ring.
function goatLentForMilk(): SignArt {
  const lender: [number, number] = [32, 104.4];
  const neighbor: [number, number] = [124, 104.4];
  const goat: [number, number] = [46, 104];
  const goatS = 0.26;
  const rows = [1, 5, 8, 11, 15].map((count, r) => Array.from({ length: count }, (_, i): [number, number] => [n(80 + (i - (count - 1) / 2) * 7), 15 + r * 7]));
  const below = rows.slice(1).flat();
  const light = (x: number, y: number, r = 1.1) => glow(x, y, n(r * 2), WARM, 0.45) + sparkle(x, y, r, "#F2B33D");
  const walk = track({
    xy: [
      [0.19, 0, 0],
      [0.26, 58, 0]
    ]
  });
  return {
    kind: "goat-lent-for-milk",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "clouds", svg: cloud(140, 56, 0.5, "#FFFFFF", 0.85) + cloud(30, 58, 0.45, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...rows.map(
        (row, r): SignPart => ({
          name: r ? `forty good deeds: small lights, row ${r + 1}` : "forty good deeds: the highest light",
          svg: row.map(([x, y]) => light(x, y, r ? 1.1 : 1.7)).join(""),
          keys: showFrom(at3(0.03 + r * 0.014), at3(0.044 + r * 0.014)),
          loop: { move: "twinkle", ms: 2400 + r * 300, low: 0.7 }
        })
      ),
      { name: "the highest: a ring about it", svg: round(80, 15, 3.6, SOFT_GOLD), keys: showFrom(0.17, 0.2) },
      { name: "a home", svg: home(22, 100, 20, 13) },
      { name: "the place of the one who lends her", svg: someone(lender[0], lender[1], 1.6) },
      { name: "the next home", svg: home(136, 100, 20, 13) },
      { name: "the place of the one she is lent to", svg: someone(neighbor[0], neighbor[1], 1.6) },
      { name: "lent: a golden way to the next home", svg: way("M35 107 L121 107", SOFT_GOLD, 0.9), keys: showFrom(0.19, 0.23) },
      { name: "a she-goat, lent for her milk", svg: sheGoat(goat[0], goat[1], goatS), keys: walk, loop: { move: "bob", ms: 900, y: -0.4 } },
      { name: "for her milk: a bowl of milk", svg: milkBowl(118, 107.6), keys: showFrom(0.26, 0.28) },
      { name: "for her milk: a warm glow at the next home", svg: wash(126, 103.4, 13, 4.6, WARM, 0.3), keys: showFrom(0.27, 0.3), loop: soft },
      { name: "hoping for its reward: a soft ring about the lender's place", svg: ring(lender[0], n(lender[1] + 0.2), 3.2, SOFT_GOLD), keys: showFrom(0.37, 0.4), loop: soft },
      spark("hoping for its reward: a spark rising", lender[0], 100.6, 0.4, 0.46),
      { name: "Paradise far off, in a soft circle of light", svg: farOff(17, 24, 9) + gardenIn(17, 24, 9), keys: showFrom(0.53, 0.57) },
      { name: "admitted by it: a golden way to it", svg: way("M33.4 101 Q40 66 18.6 34.4", SOFT_GOLD, 0.9), keys: showFrom(0.56, 0.6) },
      { name: "Hassan's place", svg: someone(80, 104.6, 1.6), keys: showFrom(0.69, 0.71) },
      { name: "Hassan's voice: we counted", svg: arcs(82.4, 103.4, VOICE), keys: showFrom(0.69, 0.71), loop: speaking },
      ...below.slice(0, 14).map(
        ([x, y], i): SignPart => ({
          name: `counted below it: a ring about a light ${i + 1}`,
          svg: round(x, y, 2.6, SOFT_GOLD),
          keys: showFrom(at3(0.7 + i * 0.005), at3(0.712 + i * 0.005))
        })
      ),
      { name: "not reaching fifteen: a grey dashed ring about the fifteenth", svg: greyRing(below[14][0], below[14][1], 3, 3), keys: showFrom(0.86, 0.9) }
    ],
    words: [
      { text: "There are forty good deeds", from: 0.02, to: 0.14 },
      { text: "The highest: a she-goat lent for milk", from: 0.16, to: 0.34 },
      { text: "Whoever does one, hoping for its reward", from: 0.36, to: 0.5 },
      { text: "Allah admits him into Paradise by it", from: 0.52, to: 0.66 },
      { text: "Hassan: we counted the deeds below it", from: 0.68, to: 0.82 },
      { text: "And could not reach fifteen", from: 0.84, to: 1 }
    ]
  };
}

/**
 * A camel's saddle of wood, its foot's middle at (x, y), `k` times its size: a base, a short front post, a taller back
 * post, and a cloth between.
 */
const saddle = (x: number, y: number, k = 1) => {
  const p = (dx: number, dy: number) => `${n(x + dx * k)} ${n(y + dy * k)}`;
  return (
    `<path d="M${p(-5, 0)} L${p(5, 0)} L${p(4.4, -1.4)} L${p(-4.4, -1.4)} Z" fill="#9C6A3C"/>` +
    `<path d="M${p(3.6, -1.2)} Q${p(4.4, -3.6)} ${p(5.4, -5.6)}" stroke="#7A4E2A" stroke-width="${n(1 * k)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${p(-3.6, -1.2)} Q${p(-4.6, -4.2)} ${p(-5.8, -7)}" stroke="#7A4E2A" stroke-width="${n(1.1 * k)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${p(-3.4, -1.6)} L${p(3.4, -1.6)} L${p(3.8, -3.4)} Q${p(0, -2.6)} ${p(-4, -3.8)} Z" fill="#B5473A"/>`
  );
};

// His she-camel as a sutrah. Ibn Umar said that the Prophet ﷺ would make his she-camel sit across in front of him and
// pray facing it. One who heard it asked: what if the camels got up and moved? The answer: he would take the saddle
// and set it up, and pray facing its back part. And Ibn Umar used to do the same (Sahih al-Bukhari 507). No one is
// drawn: his place is a golden ring in the camp. A she-camel comes and kneels across in front of it; a golden line goes
// from his place to her, a soft ring of prayer comes about it, and a spark rises. Two places come, one asks, and the
// camel gets up and goes off. The other answers: his place goes to the saddle lying on the ground, and comes back with
// it, setting it up in front of him; a golden line goes from his place to its back part. Then Ibn Umar's place comes,
// with a camel kneeling in front of it, a soft ring about it and a line to the camel.
function camelAsSutrah(): SignArt {
  const his: [number, number] = [58, 106];
  const asker: [number, number] = [102, 106];
  const asked: [number, number] = [120, 106];
  const ibnUmar: [number, number] = [138, 106];
  const stands: [number, number] = [58, 99.4];
  const s = 0.25;
  const kneel: [number, number] = [60, 96.4];
  const lies: [number, number] = [90, 103];
  const k = 1.35;
  const prayer: SignKeys = { at: [0, 0.2, 0.23, 0.36, 0.38, 0.67, 0.7], opacity: [0, 0, 1, 1, 0, 0, 1] };
  return {
    kind: "camel-as-sutrah",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(128, 20) },
      { name: "clouds", svg: cloud(48, 26, 0.6, "#FFFFFF", 0.9) + cloud(96, 18, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a tent of the camp", svg: tent(128, 86, 14, 10) },
      {
        name: "a she-camel, coming",
        svg: camel(stands[0], stands[1], s),
        keys: track({
          xy: [
            [0.03, -80, 0],
            [0.09, 0, 0]
          ],
          opacity: [
            [0.1, 1],
            [0.12, 0]
          ]
        }),
        loop: { move: "bob", ms: 900, y: -0.4 }
      },
      { name: "his she-camel, sitting across in front of him", svg: kneeler(kneel[0], kneel[1], 1.15), keys: showWhile(0.1, 0.12, 0.38, 0.4) },
      {
        name: "the camel, got up and moving off",
        svg: camel(stands[0], stands[1], s, true),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.44, -42, 0]
          ],
          opacity: [
            [0.38, 0],
            [0.4, 1]
          ]
        }),
        loop: { move: "bob", ms: 900, y: -0.4 }
      },
      {
        name: "the saddle, set up in front of him",
        svg: saddle(lies[0], lies[1], k),
        origin: { x: lies[0], y: n(lies[1] - 3.4 * k) },
        keys: track({
          xy: [
            [0.55, 0, 0],
            [0.58, -31, -4]
          ],
          rotate: [
            [0.55, -70],
            [0.58, 0]
          ]
        })
      },
      { name: "praying: a soft ring about his place", svg: ring(his[0], n(his[1] + 0.2), 3.8, SOFT_GOLD), keys: prayer, loop: soft },
      { name: "facing it: a golden line to his she-camel", svg: way("M58 104 L59.4 97.6", SOFT_GOLD, 0.9), keys: showWhile(0.21, 0.24, 0.36, 0.38) },
      spark("his prayer: a spark rising", his[0], 102.6, 0.22, 0.28),
      {
        name: "a golden ring, his place",
        svg: ring(his[0], his[1], 2.4, GOLD),
        keys: track({
          xy: [
            [0.51, 0, 0],
            [0.54, 26, -1.6],
            [0.55, 26, -1.6],
            [0.58, 0, 0]
          ]
        })
      },
      { name: "the asker's place", svg: someone(asker[0], asker[1], 1.6), keys: showFrom(0.34, 0.36) },
      { name: "the place of the one asked", svg: someone(asked[0], asked[1], 1.6), keys: showFrom(0.34, 0.36) },
      { name: "the asker's voice: what if the camels moved", svg: arcs(104.2, 104.6, VOICE), keys: showWhile(0.35, 0.38, 0.5, 0.52), loop: speaking },
      { name: "the answer: he would take the saddle", svg: arcsLeft(117.8, 104.6, VOICE), keys: showWhile(0.5, 0.52, 0.66, 0.68), loop: speaking },
      { name: "facing its back part: a golden line to it", svg: way("M57.4 104 L51.8 91.2", SOFT_GOLD, 0.9), keys: showFrom(0.69, 0.73) },
      { name: "its back part: a soft ring about it", svg: ring(51.2, 89.8, 2.2, SOFT_GOLD), keys: showFrom(0.71, 0.75), loop: soft },
      spark("his prayer facing it: a spark rising", his[0], 102.6, 0.7, 0.76),
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.6), keys: showFrom(0.83, 0.85) },
      { name: "Ibn Umar's she-camel, sitting across in front of him", svg: kneeler(140, 96.8, 0.95), keys: showFrom(0.84, 0.88) },
      { name: "Ibn Umar did the same: a soft ring about his place", svg: ring(ibnUmar[0], n(ibnUmar[1] + 0.2), 3.4, SOFT_GOLD), keys: showFrom(0.88, 0.91), loop: soft },
      { name: "Ibn Umar did the same: a golden line to his she-camel", svg: way("M138.2 104.2 L140.4 98.2", SOFT_GOLD, 0.9), keys: showFrom(0.9, 0.93) }
    ],
    words: [
      { text: "He would make his she-camel sit across", from: 0.02, to: 0.16 },
      { text: "And pray facing it", from: 0.18, to: 0.32 },
      { text: "What if the camels got up and moved?", from: 0.34, to: 0.48 },
      { text: "He would take the saddle and set it up", from: 0.5, to: 0.64 },
      { text: "And pray facing its back part", from: 0.66, to: 0.8 },
      { text: "Ibn Umar used to do the same", from: 0.82, to: 1 }
    ]
  };
}

export const HERD_ART = {
  "good-in-horses": goodInHorses,
  "horse-race": horseRace,
  "al-adba": alAdba,
  "rooster-and-donkey": roosterAndDonkey,
  "ask-before-milking": askBeforeMilking,
  "goat-lent-for-milk": goatLentForMilk,
  "camel-as-sutrah": camelAsSutrah
};
