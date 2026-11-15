import { cloud, glow, n, palm, sky, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * What the Prophet ﷺ taught of the deeds Allah loves, drawn as the scenes of worship and of what we say are
 * (worshipArt.ts, speechArt.ts): the prayer at its time and then kindness to one's parents; truthfulness leading to
 * righteousness and Paradise, and falsehood to wickedness; easing a hardship, covering a fault and helping, and the
 * path of knowledge made easy; no one saved by his deeds alone, only by Allah's mercy; the charity given while healthy;
 * the strong believer who seeks Allah's help and does not say "if"; and the prayer that was forgotten, prayed when it is
 * remembered. Only the land, the sky, buildings, things and plants are drawn. No Prophet and no person is ever drawn,
 * not even a hand or a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed
 * circle, and a voice is arcs in the air. Nothing is drawn for Allah and nothing comes down from the sky: prayers, good
 * deeds and rewards are sparks rising or lights; mercy and help are a warm glow.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** The grey of someone who does wrong or is weighed down, and the dark of a wrong done. */
export const GREY = "#7D746C";
export const DARK = "#4A3A2A";
export const DIM = "#A89F94";

/** A prayer mat, its middle at (x, y). */
export const prayerMat = (x: number, y: number) =>
  `<path d="M${n(x - 9)} ${n(y + 2.6)} L${n(x + 7)} ${n(y + 2.6)} L${n(x + 9.6)} ${n(y - 2.4)} L${n(x - 6.4)} ${n(y - 2.4)} Z" fill="#B5473A"/>` +
  `<path d="M${n(x - 7.4)} ${n(y + 1.6)} L${n(x + 5.8)} ${n(y + 1.6)} L${n(x + 8)} ${n(y - 1.4)} L${n(x - 5.4)} ${n(y - 1.4)} Z" stroke="#E8C45A" stroke-width="0.5" fill="none"/>` +
  `<path d="M${n(x - 4.4)} ${n(y + 0.4)} Q${n(x + 0.4)} ${n(y - 2)} ${n(x + 3.4)} ${n(y + 0.4)}" stroke="#E8C45A" stroke-width="0.4" fill="none"/>`;

/** A dashed ring in the sky about (x, y): where the sun stands when a prayer's time comes. */
const timeMark = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6.4" stroke="${GOLD}" stroke-width="0.7" stroke-dasharray="1.6 1.3" fill="#FFFFFF" fill-opacity="0.18"/>`;

/** A small dark speck over (x, y): a wrong, or a fault. */
export const speck = (x: number, y: number, r = 1.2) => `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${DARK}"/>`;

/** A good light over (x, y): a good deed, or righteousness. */
export const goodLight = (x: number, y: number) => glow(x, y, 3.4, WARM, 0.3) + sparkle(x, y, 1.6, SPARK);

/** [at, x, y] keys that hold a part where it is drawn until `from`, then move it by (dx, dy) by `to`. */
export const goes = (from: number, to: number, dx: number, dy: number): [number, number, number][] => [
  [from, 0, 0],
  [to, dx, dy]
];

// The dearest deeds. Abdullah ibn Mas'ud said: I asked the Prophet ﷺ: which deed is the dearest to Allah? He said: to
// offer the prayers at their early fixed times. I asked: then what? He said: to be good and dutiful to your parents. I
// asked: then what? He said: to strive in Allah's cause (Sahih al-Bukhari 527). No one is drawn: by the masjid, a golden
// ring, his place; a way comes to it and a voice asks; a voice answers; the sun comes to the mark of a prayer's time, a
// voice calls from the masjid, and the one who asked goes at once to a prayer mat, and his prayer rises; then a way goes
// to the home of the two who raised him, a basket of dates goes with him, a warm glow comes on their home, and good
// rises.
function dearestDeeds(): SignArt {
  const asks: [number, number] = [76, 98];
  const mat: [number, number] = [96, 99.4];
  const mark: [number, number] = [122, 46];
  const by: [number, number] = [120, 99];
  const toMat: [number, number] = [mat[0] - asks[0], mat[1] - 1 - asks[1]];
  const toHome: [number, number] = [by[0] - asks[0], by[1] - asks[1]];
  return {
    kind: "dearest-deeds",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "clouds", svg: cloud(30, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the mark of a prayer's time", svg: timeMark(mark[0], mark[1]), keys: showFrom(0.26, 0.29) },
      {
        name: "the sun, coming to the prayer's time",
        svg: sun(mark[0], mark[1]),
        keys: track({
          xy: [
            [0.3, -62, -24],
            [0.34, -30, -21],
            [0.38, 0, 0]
          ]
        })
      },
      { name: "the prayer's time, come", svg: glow(mark[0], mark[1], 9, "#FFF3C0", 0.2), keys: showFrom(0.38, 0.4), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(4, 92, 0.9) },
      { name: "the home of the two who raised him", svg: home(138, 95, 20, 14) },
      { name: "the two who raised him, by their home", svg: someone(130.6, 99.6, 1.7) + someone(145.6, 99.6, 1.7) },
      { name: "a golden ring, his place", svg: ring(56, 98, 3.2, GOLD) },
      { name: "a way, coming to ask", svg: way(`M156 104 C134 106 104 104 ${asks[0] + 4} 99.6`, BROWN), keys: showFrom(0.03, 0.08) },
      { name: "a voice from him, asking", svg: arcsLeft(asks[0] - 3.6, asks[1] - 3, VOICE), keys: showWhile(0.1, 0.12, 0.22, 0.24), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from his place, answering", svg: arcs(59.8, 95, GOLD), keys: showFrom(0.26, 0.28), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from the masjid, calling to prayer", svg: arcs(48.6, 79, GOLD), keys: showWhile(0.4, 0.42, 0.54, 0.56), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a prayer mat", svg: prayerMat(mat[0], mat[1]), keys: showFrom(0.41, 0.43) },
      { name: "a light on the prayer mat", svg: glow(mat[0], mat[1] - 1.4, 9, WARM, 0.12) + wash(mat[0], mat[1], 11, 3, "#FFF6D0", 0.14), keys: showFrom(0.5, 0.54), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...risingSparks(
        "the prayer, rising",
        [
          [mat[0] - 4, mat[1] - 6],
          [mat[0], mat[1] - 8],
          [mat[0] + 4, mat[1] - 6]
        ],
        0.49,
        0.02,
        { color: SPARK, rise: 14, stay: true }
      ),
      { name: "a way to their home", svg: way(`M${mat[0] + 8} 100.8 C110 102.4 118 102.4 ${by[0] + 4} 100.6`, GOLD), keys: showFrom(0.65, 0.68) },
      {
        name: "a basket of dates, for them",
        svg: basketOfDates(by[0] + 4.6, 102.6),
        keys: track({
          opacity: [
            [0.66, 0],
            [0.67, 1]
          ],
          xy: [
            [0.68, n(mat[0] + 9 - (by[0] + 4.6)), 0],
            [0.76, 0, 0]
          ]
        })
      },
      { name: "a warm glow on their home", svg: glow(138, 92, 14, WARM, 0.12), keys: showFrom(0.78, 0.82), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...risingSparks(
        "good to them, rising",
        [
          [129, 92],
          [138, 86],
          [147, 92]
        ],
        0.83,
        0.02,
        { color: SPARK, rise: 14, stay: true }
      ),
      { name: "a warm glow on his place, dutiful", svg: glow(by[0], by[1], 6, WARM, 0.22), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "someone asking, then praying, then going to their home",
        svg: someone(asks[0], asks[1], 2),
        keys: track({
          opacity: [
            [0.08, 0],
            [0.1, 1]
          ],
          xy: [
            [0.43, 0, 0],
            [0.47, toMat[0], toMat[1]],
            [0.68, toMat[0], toMat[1]],
            [0.76, toHome[0], toHome[1]]
          ]
        })
      }
    ],
    words: [
      { text: "Which deed is the dearest to Allah?", from: 0.02, to: 0.24 },
      { text: "The prayers at their early fixed times", from: 0.26, to: 0.62 },
      { text: "Then, to be good and dutiful to your parents", from: 0.64, to: 1 }
    ]
  };
}

// Truthfulness leads to righteousness. The Prophet ﷺ said: truthfulness leads to righteousness, and righteousness leads
// to Paradise, and a man keeps on telling the truth until he becomes a truthful person. Falsehood leads to wickedness,
// and wickedness leads to the Fire, and a man may keep on telling lies until he is written before Allah a liar (Sahih
// al-Bukhari 6094). No one is drawn: two places side by side; a voice tells the truth, and a golden way goes from it past
// good lights, righteousness, and on up to a light at its end; the voice tells the truth again and again, and a light
// grows within its place; then a crooked voice lies from the other place, and a grey way goes from it past dark specks,
// wickedness, and on down into a darkness at its end. No fire is drawn.
function truthLeads(): SignArt {
  const truthful: [number, number] = [70, 98];
  const liar: [number, number] = [92, 98];
  const good: [number, number][] = [
    [58, 96.6],
    [50, 93.4],
    [43.4, 89.6]
  ];
  const wicked: [number, number][] = [
    [106, 99.2],
    [113.6, 100],
    [121, 100.8]
  ];
  return {
    kind: "truth-leads",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "clouds", svg: cloud(130, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a home", svg: home(81, 90, 18, 12) },
      { name: "someone's place, truthful", svg: someone(truthful[0], truthful[1], 2) },
      { name: "someone's place, lying", svg: someone(liar[0], liar[1], 2, GREY) },
      { name: "a voice from it, telling the truth", svg: arcsLeft(truthful[0] - 3.6, truthful[1] - 3, GOLD), keys: showFrom(0.03, 0.05), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a golden way, to righteousness", svg: way(`M${truthful[0] - 4} 99.6 C60 99.4 50 96.6 42 90.6`, GOLD), keys: showFrom(0.05, 0.09) },
      ...good.map((at, i): SignPart => ({ name: `righteousness, a good light ${i + 1}`, svg: goodLight(at[0], at[1] - 3.4), keys: showFrom(at3(0.09 + i * 0.02), at3(0.1 + i * 0.02)), loop: { move: "twinkle", ms: 1200, low: 0.6, phase: i / 3 } })),
      { name: "the golden way, going on up", svg: way("M40.4 89 C34 84 27 77.4 21 71.4", GOLD), keys: showFrom(0.23, 0.27) },
      { name: "a light at the end of the golden way", svg: glow(18, 68, 11, WARM, 0.22) + glow(18, 68, 4, "#FFF6D0", 0.4), keys: showFrom(0.28, 0.33), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...risingSparks(
        "the truth, told again",
        [
          [truthful[0] - 2, truthful[1] - 6],
          [truthful[0] + 1, truthful[1] - 7],
          [truthful[0] - 4, truthful[1] - 7]
        ],
        0.43,
        0.03,
        { color: SPARK, rise: 10 }
      ),
      {
        name: "a light within it, truthful",
        svg: glow(truthful[0], truthful[1], 5, "#FFC83A", 0.4),
        origin: { x: truthful[0], y: truthful[1] },
        keys: track({
          opacity: [
            [0.44, 0],
            [0.45, 1]
          ],
          scale: [
            [0.44, 0.3],
            [0.54, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      },
      { name: "a crooked voice from it, lying", svg: crooked(liar[0] + 3.4, liar[1] - 3.4), keys: showFrom(0.61, 0.63), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      { name: "a grey way, to wickedness", svg: way(`M${liar[0] + 4} 99.6 C104 100 112 100.8 122 101.8`, GREY, 1.1), keys: showFrom(0.63, 0.67) },
      ...wicked.map((at, i): SignPart => ({ name: `wickedness, a dark speck ${i + 1}`, svg: speck(at[0], at[1] - 3.2), keys: showFrom(at3(0.68 + i * 0.02), at3(0.69 + i * 0.02)) })),
      { name: "the grey way, going on down", svg: way("M124 102 C132 102.8 139 103.4 146 104", GREY, 1.1), keys: showFrom(0.82, 0.86) },
      { name: "a darkness at the end of the grey way", svg: glow(151, 103.6, 9, DARK, 0.3), keys: showFrom(0.87, 0.92) }
    ],
    words: [
      { text: "Truthfulness leads to righteousness", from: 0.02, to: 0.2 },
      { text: "And righteousness leads to Paradise", from: 0.22, to: 0.4 },
      { text: "A man keeps telling the truth until he is truthful", from: 0.42, to: 0.58 },
      { text: "Falsehood leads to wickedness", from: 0.6, to: 0.78 },
      { text: "And wickedness leads to the Fire", from: 0.8, to: 1 }
    ]
  };
}

/** A crooked voice from (x, y), facing right: the words of a lie, or of "if". */
export const crooked = (x: number, y: number) =>
  `<path d="M${x} ${n(y + 1.2)} l1 -1.4 l1 1.4 l1 -1.4 l1 1.4 M${x} ${n(y - 1.2)} l1.4 -1.6 l1.4 1.6 l1.4 -1.6 l1.4 1.6" stroke="${GREY}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;

/** A soft cover over (x, y): a fault kept hidden. */
export const cover = (x: number, y: number) =>
  `<path d="M${n(x - 3.6)} ${n(y + 1.6)} Q${n(x - 3.4)} ${n(y - 2.8)} ${x} ${n(y - 3)} Q${n(x + 3.4)} ${n(y - 2.8)} ${n(x + 3.6)} ${n(y + 1.6)} Z" fill="#FFF3DA" stroke="#E2C48C" stroke-width="0.4"/>`;

// Easing a hardship. The Prophet ﷺ said: he who alleviates the suffering of a brother out of the sufferings of the
// world, Allah will alleviate his suffering from the sufferings of the Day of Resurrection; and he who finds relief for
// one who is hard-pressed, Allah will make things easy for him in the Hereafter; and he who conceals the faults of a
// Muslim, Allah will conceal his faults in this world and in the Hereafter. Allah helps a servant as long as the
// servant helps his brother; and he who treads the path in search of knowledge, Allah makes that path easy for him,
// leading to Paradise (Sahih Muslim 2699a). No one is drawn: someone's place in hardship, a grey cloud over it and a
// heavy sack by it; another goes to him along a dashed way, and the cloud lifts; a grey cloud comes over the one who
// eased it, and it lifts too; a fault, a dark speck, shows on each, and a soft cover hides it; he takes up the sack, and
// a warm glow of help is on him as they go; then a way goes to the masjid, and from it a smooth golden way to a light.
function easeAHardship(): SignArt {
  const eases: [number, number] = [30, 98];
  const hard: [number, number] = [58, 98];
  /** Where the one who eases it stands by the one in hardship. */
  const beside = 14;
  const together: [number, number, number][] = [
    [0.63, 0, 0],
    [0.71, 30, 0]
  ];
  const easesMoves: [number, number, number][] = [
    [0.06, 0, 0],
    [0.1, beside, 0],
    ...together.map(([t, x, y]): [number, number, number] => [t, x + beside, y]),
    [0.82, 30 + beside, 0],
    [0.87, 84, -4]
  ];
  const easesPlace: [number, number] = [eases[0] + beside, eases[1]];
  /** The same moves, for what is drawn on his place where he stands by the one in hardship. */
  const easesAfter = easesMoves.filter(([t]) => t >= 0.6).map(([t, x, y]): [number, number, number] => [t, n(x - beside), y]);
  const masjidDoor: [number, number] = [114, 94];
  return {
    kind: "ease-a-hardship",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(70, 18) },
      { name: "clouds", svg: cloud(28, 24, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his home", svg: home(14, 94, 18, 13) },
      { name: "the masjid", svg: madinahMasjid(96, 90, 0.9) },
      { name: "a light at the end, far", svg: glow(152, 58, 9, WARM, 0.12), keys: showFrom(0.9, 0.93), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "a way to the one in hardship", svg: way(`M${eases[0] + 4} 100 C40 101.6 46 101.6 ${hard[0] - 5} 100.4`, GOLD, 1), keys: showFrom(0.03, 0.06) },
      {
        name: "a grey cloud of hardship over him",
        svg: cloud(hard[0], hard[1] - 12.4, 0.3, "#8E98A6", 0.95),
        keys: track({
          opacity: [
            [0.1, 1],
            [0.13, 0]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: 0.8 }
      },
      {
        name: "a heavy sack by him, then taken up",
        svg: sack(hard[0] + 7, 101.4, 1.2),
        keys: track({
          xy: [
            [0.6, 0, 0],
            [0.63, -15, -3],
            [0.71, 15, -3]
          ]
        })
      },
      {
        name: "someone in hardship, then going on",
        svg: someone(hard[0], hard[1], 2),
        keys: track({ xy: together })
      },
      {
        name: "a warm glow on him, relieved",
        svg: glow(hard[0], hard[1], 6, WARM, 0.2),
        keys: track({
          opacity: [
            [0.11, 0],
            [0.14, 1]
          ],
          xy: together
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.7 }
      },
      {
        name: "a grey cloud over his own place, then lifting",
        svg: cloud(easesPlace[0], easesPlace[1] - 12.4, 0.3, "#8E98A6", 0.95),
        keys: track({
          opacity: [
            [0.23, 0],
            [0.25, 1],
            [0.29, 1],
            [0.32, 0]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: 0.8 }
      },
      {
        name: "a brightness on his place, eased",
        svg: glow(easesPlace[0], easesPlace[1], 7, "#FFE9A8", 0.2),
        keys: track({
          opacity: [
            [0.3, 0],
            [0.34, 1]
          ],
          xy: easesAfter
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.7 }
      },
      {
        name: "a fault on the one in hardship, a dark speck",
        svg: speck(hard[0], hard[1] - 6),
        keys: track({
          opacity: [
            [0.41, 0],
            [0.42, 1],
            [0.46, 1],
            [0.48, 0]
          ]
        })
      },
      {
        name: "a cover over his fault",
        svg: cover(hard[0], hard[1] - 6),
        keys: track({
          opacity: [
            [0.45, 0],
            [0.47, 1]
          ],
          xy: together
        })
      },
      {
        name: "a fault on the one who eased it, a dark speck",
        svg: speck(easesPlace[0], easesPlace[1] - 6),
        keys: track({
          opacity: [
            [0.48, 0],
            [0.49, 1],
            [0.51, 1],
            [0.53, 0]
          ]
        })
      },
      {
        name: "a cover over his own fault",
        svg: cover(easesPlace[0], easesPlace[1] - 6),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.52, 1]
          ],
          xy: easesAfter
        })
      },
      {
        name: "help on him, as he helps",
        svg: glow(easesPlace[0], easesPlace[1], 8, WARM, 0.22),
        keys: track({
          opacity: [
            [0.64, 0],
            [0.67, 1]
          ],
          xy: easesAfter
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.6 }
      },
      { name: "a way to the masjid", svg: way(`M${easesPlace[0] + 34} 100 C92 101 102 99.4 ${masjidDoor[0] - 4} 95.4`, GOLD, 1), keys: showFrom(0.79, 0.82) },
      { name: "knowledge, a light at the masjid's door", svg: glow(117.6, 87, 5, "#FFF3C0", 0.3), keys: showFrom(0.86, 0.88), loop: { move: "twinkle", ms: 1200, low: 0.6 } },
      {
        name: "a path made easy, to a light",
        svg: `<path d="M${masjidDoor[0] + 8} 95 C132 96.6 142 92 147 82 C150 75 151.4 68 152 62" stroke="#FFE07A" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.85"/>`,
        keys: showFrom(0.88, 0.92)
      },
      { name: "someone's place, easing it", svg: someone(eases[0], eases[1], 2), keys: track({ xy: easesMoves }) }
    ],
    words: [
      { text: "He who relieves the suffering of a brother", from: 0.02, to: 0.18 },
      { text: "Allah relieves him on the Day of Resurrection", from: 0.2, to: 0.38 },
      { text: "He who hides a Muslim's faults, Allah hides his", from: 0.4, to: 0.56 },
      { text: "Allah helps him as long as he helps his brother", from: 0.58, to: 0.76 },
      { text: "A path for knowledge, made easy to Paradise", from: 0.78, to: 1 }
    ]
  };
}

// Saved by mercy. The Prophet ﷺ said: the deeds of anyone of you will not save you. They said: not even you, O
// Messenger of Allah? He said: not even I, unless Allah bestows His Mercy on me. So do good deeds properly, sincerely and
// moderately, and worship Allah in the forenoon and in the afternoon and during a part of the night, and always keep to
// a middle, moderate course, and you will reach your target (Sahih al-Bukhari 6463). No one is drawn: a long road to a
// light far off; someone's place at its start, and his deeds rise and fade; by the masjid, a golden ring, his place, a
// voice from it, and a warm glow of mercy grows about it; then the place goes on along the road, steadily, deeds rising;
// the sun stands in the forenoon, crosses to the afternoon and sets, night falls with the moon, and at each he worships
// and it rises; then he goes on to the light at the end of the road.
function savedByMercy(): SignArt {
  const walks: [number, number] = [62, 99];
  const target: [number, number] = [148, 64];
  const steps: [number, number, number][] = [
    [0.42, 0, 0],
    [0.52, 22, 2.4],
    [0.83, 22, 2.4],
    [0.86, 46, -1.6],
    [0.89, 64, -13],
    [0.92, n(target[0] - 2 - walks[0]), n(target[1] + 3 - walks[1])]
  ];
  const night = (x: number, y: number) => risingSparks("worship in a part of the night, rising", [[x, y]], 0.71, 0, { color: "#FFE7A0", rise: 12, stay: true });
  return {
    kind: "saved-by-mercy",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      {
        name: "the sun, in the forenoon, then the afternoon",
        svg: sun(34, 40),
        keys: track({
          xy: [
            [0.62, 0, 0],
            [0.64, 44, -20],
            [0.66, 88, -6],
            [0.67, 88, -6],
            [0.7, 104, 14]
          ],
          opacity: [
            [0.68, 1],
            [0.7, 0]
          ]
        })
      },
      { name: "clouds", svg: cloud(110, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "night, falling", svg: `<rect width="160" height="61" fill="#1B2A4A"/>`, keys: track({ opacity: [[0.67, 0], [0.7, 0.82]] }) },
      { name: "the moon", svg: crescent(40, 24, 4.6, 2.4, "#FFF2C0"), keys: showFrom(0.69, 0.71) },
      { name: "hills", svg: hills() },
      { name: "the hills at night", svg: hills("#3E4258"), keys: track({ opacity: [[0.67, 0], [0.7, 0.6]] }) },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(2, 90, 0.8) },
      { name: "a golden ring, his place", svg: ring(48, 99, 3, GOLD) },
      { name: "the road, long", svg: way(`M${walks[0] + 4} 100 C88 103.4 108 98 122 88 C132 81 140 74 ${target[0] - 2} 68`, BROWN) },
      { name: "dusk over the land", svg: `<rect y="61" width="160" height="59" fill="#0F1C3A"/>`, keys: track({ opacity: [[0.67, 0], [0.7, 0.36]] }) },
      { name: "a light at the end of the road, far", svg: glow(target[0], target[1], 8, WARM, 0.2) + glow(target[0], target[1], 3, "#FFF6D0", 0.5), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      ...risingSparks(
        "his deeds, rising and fading",
        [
          [walks[0] - 3, walks[1] - 6],
          [walks[0] + 1, walks[1] - 7],
          [walks[0] + 4, walks[1] - 6]
        ],
        0.03,
        0.025,
        { color: SPARK, rise: 9 }
      ),
      { name: "a voice from his place", svg: arcs(51, 96, GOLD), keys: showWhile(0.21, 0.23, 0.33, 0.35), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "mercy, a warm glow about his place",
        svg: glow(48, 98, 11, "#FFE9A8", 0.16),
        origin: { x: 48, y: 98 },
        keys: track({
          opacity: [
            [0.27, 0],
            [0.28, 1]
          ],
          scale: [
            [0.27, 0.3],
            [0.33, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.75 }
      },
      ...risingSparks(
        "good deeds, steadily",
        [
          [70, 95],
          [77, 96.4],
          [84, 96.6]
        ],
        0.43,
        0.025,
        { color: SPARK, rise: 12, stay: true }
      ),
      ...risingSparks("worship in the forenoon, rising", [[88, 95]], 0.59, 0, { color: SPARK, rise: 12, stay: true }),
      ...risingSparks("worship in the afternoon, rising", [[82, 95.4]], 0.66, 0, { color: SPARK, rise: 12, stay: true }),
      ...night(86, 93.6),
      { name: "the light, reached", svg: glow(target[0], target[1], 15, WARM, 0.14), keys: showFrom(0.92, 0.95), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "someone's place, going on steadily",
        svg: someone(walks[0], walks[1], 2, "#E8D5B0"),
        origin: { x: walks[0], y: walks[1] },
        keys: track({
          xy: steps,
          scale: [
            [0.83, 1],
            [0.92, 0.6]
          ]
        })
      },
      {
        name: "someone's place, going on steadily, by day",
        svg: someone(walks[0], walks[1], 2),
        origin: { x: walks[0], y: walks[1] },
        keys: track({
          xy: steps,
          opacity: [
            [0.68, 1],
            [0.7, 0]
          ]
        })
      }
    ],
    words: [
      { text: "The deeds of anyone of you will not save you", from: 0.02, to: 0.18 },
      { text: "Not even I, unless Allah has mercy on me", from: 0.2, to: 0.38 },
      { text: "Do good deeds properly, sincerely and moderately", from: 0.4, to: 0.56 },
      { text: "Forenoon, afternoon, and part of the night", from: 0.58, to: 0.8 },
      { text: "Be moderate, and you will reach your target", from: 0.82, to: 1 }
    ]
  };
}

/** A hoped-for coin over (x, y): dashed, silver, not had. */
const hopedCoin = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="1.6" stroke="#98A2AD" stroke-width="0.5" stroke-dasharray="0.8 0.6" fill="#DDE2E8" fill-opacity="0.5"/>`;

// Give while healthy. A man asked the Prophet ﷺ: which charity is the most superior in reward? He said: the charity you
// give while you are healthy, afraid of poverty and wishing to become wealthy. Do not delay it until death is near and
// then say: give so much to such and such, and so much to such and such, when it already belongs to such and such
// (Sahih al-Bukhari 1419). No one is drawn: someone's place by his home, sacks kept by it; a way to the golden ring by the
// masjid, and a voice asks; a voice answers; the sun is high, a sack goes from him to one in need by the masjid, and a
// great reward rises; a grey cloud of worry over him, and dashed coins he hopes for, and the reward grows; then the sun
// sinks and evening comes, while the sacks wait by his home; then they go along grey ways to two other homes, and
// nothing rises.
function giveWhileHealthy(): SignArt {
  const gives: [number, number] = [100, 98];
  const asked: [number, number] = [62, 98];
  const needy: [number, number] = [34, 99];
  const kept: [number, number][] = [
    [110, 101.2],
    [116.4, 101.6]
  ];
  const others: [number, number][] = [
    [84, 77],
    [98, 75]
  ];
  return {
    kind: "give-while-healthy",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      {
        name: "the evening",
        svg: `<rect width="160" height="34" fill="#E7A27A" opacity="0.85"/><rect y="34" width="160" height="27" fill="#F5C787" opacity="0.85"/>`,
        keys: showFrom(0.64, 0.7)
      },
      {
        name: "the sun, high, then sinking",
        svg: sun(80, 20),
        keys: track({
          xy: [
            [0.6, 0, 0],
            [0.64, 40, 8],
            [0.68, 66, 34]
          ]
        })
      },
      { name: "clouds", svg: cloud(30, 26, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "dusk over the land", svg: `<rect y="61" width="160" height="59" fill="#E08A4A"/>`, keys: track({ opacity: [[0.64, 0], [0.7, 0.12]] }) },
      ...others.map(([x, y], i): SignPart => ({ name: `another home, far ${i + 1}`, svg: home(x, y, 9, 7, "#C9A777", "#AF9064") })),
      { name: "the masjid", svg: madinahMasjid(2, 90, 0.9) },
      { name: "someone in need, by the masjid", svg: someone(needy[0], needy[1], 1.8) },
      { name: "a golden ring, his place", svg: ring(52, 98, 3.2, GOLD) },
      { name: "his home", svg: home(124, 94, 22, 15) },
      { name: "a way, going to ask", svg: way(`M${gives[0] - 4} 99.6 C90 102 76 102 ${asked[0] + 4} 99.6`, BROWN), keys: showFrom(0.03, 0.07) },
      { name: "a voice from him, asking", svg: arcsLeft(asked[0] - 3.6, asked[1] - 3, VOICE), keys: showWhile(0.1, 0.12, 0.16, 0.18), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from his place, answering", svg: arcs(55.8, 95, GOLD), keys: showFrom(0.21, 0.23), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "his place, healthy, a bright glow", svg: glow(asked[0], asked[1], 5, "#FFF3C0", 0.36), keys: showFrom(0.22, 0.25), loop: { move: "twinkle", ms: 1200, low: 0.7 } },
      { name: "a way to the one in need", svg: way(`M${asked[0] - 4} 101.6 C54 104 44 104 ${needy[0] + 4} 101.4`, GOLD, 1), keys: showFrom(0.22, 0.24) },
      {
        name: "charity, a sack going",
        svg: sack(needy[0] + 6.4, 102.2, 1.1),
        keys: track({
          opacity: [
            [0.23, 0],
            [0.24, 1]
          ],
          xy: [
            [0.24, n(asked[0] + 2 - (needy[0] + 6.4)), -0.6],
            [0.28, 0, 0]
          ]
        })
      },
      { name: "a warm glow on the one in need", svg: glow(needy[0], needy[1], 6, WARM, 0.2), keys: showFrom(0.28, 0.3), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      ...risingSparks(
        "a great reward, rising",
        [
          [asked[0] - 4.4, asked[1] - 6],
          [asked[0], asked[1] - 8],
          [asked[0] + 4.4, asked[1] - 6]
        ],
        0.28,
        0.01,
        { color: SPARK, rise: 14, stay: true }
      ),
      { name: "a grey cloud of worry over him, afraid of poverty", svg: cloud(asked[0] + 10, asked[1] - 16, 0.26, "#8E98A6", 0.9), keys: showFrom(0.41, 0.44), loop: { move: "bob", ms: 2400, y: 0.8 } },
      { name: "the wealth he hopes for, dashed coins", svg: hopedCoin(76, 89) + hopedCoin(80, 86.6) + hopedCoin(84, 89), keys: showFrom(0.45, 0.48), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      {
        name: "the reward, growing",
        svg: glow(asked[0], asked[1] - 16, 11, WARM, 0.16),
        origin: { x: asked[0], y: asked[1] - 16 },
        keys: track({
          opacity: [
            [0.49, 0],
            [0.5, 1]
          ],
          scale: [
            [0.49, 0.4],
            [0.53, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.75 }
      },
      ...kept.map(
        ([x, y], i): SignPart => ({
          name: `a grey way to another home ${i + 1}`,
          svg: way(i === 0 ? `M${x - 2} ${y - 2} C${x - 8} 92 ${others[0][0] + 6} 84 ${others[0][0] + 2} 78.4` : `M${x - 1} ${y - 3} C${x - 4} 90 ${others[1][0] + 8} 82 ${others[1][0] + 2} 76.4`, GREY, 0.9),
          keys: showFrom(0.79, 0.82)
        })
      ),
      { name: "someone's place, giving", svg: someone(gives[0], gives[1], 2), keys: track({ xy: goes(0.07, 0.1, asked[0] - gives[0], 0) }) },
      ...kept.map(
        ([x, y], i): SignPart => ({
          name: `a sack kept by his home, then going to another ${i + 1}`,
          svg: sack(x, y, 1.1),
          origin: { x, y },
          keys: track({
            xy: goes(at3(0.82 + i * 0.02), at3(0.88 + i * 0.02), n(others[i][0] + 5 - x), n(others[i][1] + 0.6 - y)),
            scale: [
              [at3(0.82 + i * 0.02), 1],
              [at3(0.88 + i * 0.02), 0.6]
            ]
          })
        })
      )
    ],
    words: [
      { text: "Which charity is the most superior in reward?", from: 0.02, to: 0.18 },
      { text: "The charity you give while you are healthy", from: 0.2, to: 0.38 },
      { text: "Afraid of poverty and wishing to be wealthy", from: 0.4, to: 0.56 },
      { text: "Do not delay it until death is near", from: 0.58, to: 0.76 },
      { text: "And it already belongs to such and such", from: 0.78, to: 1 }
    ]
  };
}

/** A strong place about (x, y): a bold dashed circle. */
const strong = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="2.6" stroke="${VOICE}" stroke-width="1.3" stroke-dasharray="1.4 0.7" fill="none"/>`;

// The strong believer. The Prophet ﷺ said: a strong believer is better and more lovable to Allah than a weak believer,
// and there is good in everyone. Cherish what benefits you, seek help from Allah and do not lose heart; and if trouble
// comes to you, do not say: if I had not done that, it would not have happened so; but say: Allah did what He had
// ordained, for your "if" opens the gate for Satan (Sahih Muslim 2664). No one is drawn, and nothing for Satan: a strong
// place and a weak place side by side, and a warm glow comes on the strong one; a small light of good comes on each;
// then a way goes to a garden, what benefits him, and the strong place goes along it as a voice asks for help, and help
// rises; a grey cloud of trouble comes over it, a crooked voice says "if", and a dark gate by the garden opens a crack;
// then the crooked voice is gone, a calm voice speaks, a calm comes on his place, the gate shuts, and a bar is set
// across it, kept shut.
function strongBeliever(): SignArt {
  const s: [number, number] = [40, 98];
  const weak: [number, number] = [60, 98];
  const there: [number, number] = [108, 98];
  const along: [number, number, number][] = goes(0.36, 0.42, there[0] - s[0], 0);
  const gate = { x: 146, y: 100, w: 12, h: 18 };
  return {
    kind: "strong-believer",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(26, 18) },
      { name: "clouds", svg: cloud(96, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a garden, what benefits him", svg: palm(122, 95, 18) + palm(134, 97, 14) + basketOfDates(128, 101.6) },
      { name: "darkness behind the gate", svg: `<rect x="${gate.x + 1}" y="${gate.y - gate.h + 1}" width="${gate.w - 2}" height="${gate.h - 1}" fill="#2A2018"/>` },
      {
        name: "the gate's door, opening a crack, then shut",
        svg: `<rect x="${gate.x + 1}" y="${gate.y - gate.h + 1}" width="${gate.w - 2}" height="${gate.h - 1}" fill="#A4794A"/><path d="M${gate.x + 6} ${gate.y - gate.h + 2} L${gate.x + 6} ${gate.y}" stroke="#7A5530" stroke-width="0.6"/>`,
        origin: { x: gate.x + 1, y: gate.y - gate.h / 2 },
        keys: track({
          scaleX: [
            [0.58, 1],
            [0.62, 0.55],
            [0.72, 0.55],
            [0.76, 1]
          ]
        })
      },
      {
        name: "a gate",
        svg: `<rect x="${gate.x - 0.6}" y="${gate.y - gate.h}" width="1.6" height="${gate.h}" fill="#6E5532"/><rect x="${gate.x + gate.w - 1}" y="${gate.y - gate.h}" width="1.6" height="${gate.h}" fill="#6E5532"/><rect x="${gate.x - 1.4}" y="${gate.y - gate.h - 1.6}" width="${gate.w + 2.8}" height="2" fill="#5A4428"/>`
      },
      {
        name: "a bar across the gate, kept shut",
        svg: `<rect x="${gate.x - 1}" y="${gate.y - gate.h / 2 - 0.8}" width="${gate.w + 2}" height="1.6" rx="0.6" fill="#5A4428"/>`,
        keys: track({
          opacity: [
            [0.88, 0],
            [0.89, 1]
          ],
          xy: [
            [0.88, -6, 0],
            [0.91, 0, 0]
          ]
        })
      },
      { name: "a weak place, dim", svg: someone(weak[0], weak[1], 1.8, DIM) },
      { name: "a small light of good on the weak place", svg: glow(weak[0], weak[1], 3.6, WARM, 0.2) + sparkle(weak[0], weak[1] - 4.4, 1.2, SPARK), keys: showFrom(0.21, 0.23), loop: { move: "twinkle", ms: 1300, low: 0.6 } },
      { name: "a way to what benefits him", svg: way(`M${s[0] + 4} 100.4 C62 103.6 88 103 ${there[0] - 4} 99.6`, GOLD), keys: showFrom(0.33, 0.36) },
      ...risingSparks(
        "help, rising",
        [
          [92, 94],
          [104, 92.6]
        ],
        0.38,
        0.02,
        { color: SPARK, rise: 12, stay: true }
      ),
      { name: "a grey cloud of trouble over him", svg: cloud(there[0], there[1] - 12.6, 0.3, "#8E98A6", 0.95), keys: track({ opacity: [[0.51, 0], [0.54, 1], [0.76, 1], [0.8, 0.45]] }), loop: { move: "bob", ms: 2400, y: 0.8 } },
      { name: "a crooked voice from him, saying if", svg: crooked(there[0] + 3.6, there[1] - 3.4), keys: showWhile(0.56, 0.58, 0.69, 0.71), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      { name: "a calm voice from him, saying it", svg: arcs(there[0] + 3.8, there[1] - 3, GOLD), keys: showFrom(0.71, 0.73), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a calm on his place", svg: wash(there[0], there[1], 10, 3.4, "#FFFBEA", 0.22), keys: showFrom(0.73, 0.77), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      {
        name: "a warm glow on the strong place, loved",
        svg: glow(s[0], s[1], 8, WARM, 0.2),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.08, 1]
          ],
          xy: along
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.7 }
      },
      {
        name: "a small light of good on the strong place",
        svg: sparkle(s[0], s[1] - 5.4, 1.4, SPARK),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.21, 1]
          ],
          xy: along
        }),
        loop: { move: "twinkle", ms: 1300, low: 0.6, phase: 0.5 }
      },
      {
        name: "a voice from him, asking for help",
        svg: arcs(s[0] + 4.2, s[1] - 3.4, GOLD),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.36, 1],
            [0.48, 1],
            [0.5, 0]
          ],
          xy: along
        }),
        loop: { move: "twinkle", ms: 1000, low: 0.5 }
      },
      { name: "a strong place", svg: strong(s[0], s[1]), keys: track({ xy: along }) }
    ],
    words: [
      { text: "A strong believer is more lovable to Allah", from: 0.02, to: 0.15 },
      { text: "Than a weak believer; there is good in everyone", from: 0.17, to: 0.3 },
      { text: "Cherish what benefits you, seek Allah's help", from: 0.32, to: 0.48 },
      { text: "If trouble comes, don't say: If only I had", from: 0.5, to: 0.66 },
      { text: "But say: Allah did what He had ordained", from: 0.68, to: 0.84 },
      { text: "For your 'if' opens the gate for Satan", from: 0.86, to: 1 }
    ]
  };
}

// A forgotten prayer. The Prophet ﷺ said: if anyone forgets a prayer, he should pray it when he remembers it. There is
// no expiation except to pray it (Sahih al-Bukhari 597). He then recited an ayah of the Quran, which is not drawn. No one
// is drawn: someone's place by his home, a prayer mat waiting; the sun comes to the mark of a prayer's time, a voice
// calls from the masjid, but his place goes off to the palms, busy, and the sun passes on while the mat waits; a spark of
// remembering comes over him, he goes back to the mat at once, and his prayer rises; then a dashed sack and a dashed dish
// show and fade, standing for nothing, and only the light of the prayer grows.
function forgottenPrayer(): SignArt {
  const at: [number, number] = [88, 98];
  const mat: [number, number] = [66, 99.4];
  const mark: [number, number] = [114, 46];
  const busy: [number, number] = [134, 98];
  const back: [number, number] = [mat[0], mat[1] - 1];
  return {
    kind: "forgotten-prayer",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "clouds", svg: cloud(30, 26, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the mark of a prayer's time", svg: timeMark(mark[0], mark[1]) },
      {
        name: "the sun, coming to the prayer's time and passing it",
        svg: sun(mark[0], mark[1]),
        keys: track({
          xy: [
            [0.04, -44, -24],
            [0.07, -22, -20],
            [0.1, 0, 0],
            [0.2, 0, 0],
            [0.26, 20, -1]
          ]
        })
      },
      {
        name: "the prayer's time, come, then passing",
        svg: glow(mark[0], mark[1], 9, "#FFF3C0", 0.2),
        keys: track({
          opacity: [
            [0.1, 0],
            [0.12, 1],
            [0.22, 1],
            [0.26, 0]
          ]
        })
      },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid", svg: madinahMasjid(2, 90, 0.9) },
      { name: "his home", svg: home(104, 94, 20, 14) },
      { name: "palms, where he is busy", svg: palm(140, 95, 18) + palm(152, 97, 14) },
      { name: "a voice from the masjid, calling to prayer", svg: arcs(46.6, 79, GOLD), keys: showWhile(0.11, 0.13, 0.2, 0.22), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a prayer mat, waiting", svg: prayerMat(mat[0], mat[1]) },
      { name: "a way off to the palms", svg: way(`M${at[0] + 4} 100.4 C104 102.6 120 102.6 ${busy[0] - 4} 100`, BROWN), keys: showFrom(0.12, 0.14) },
      {
        name: "a spark of remembering over him",
        svg: sparkle(busy[0], busy[1] - 8, 2.4, "#FFF3C0") + glow(busy[0], busy[1] - 8, 4, WARM, 0.3),
        origin: { x: busy[0], y: busy[1] - 8 },
        keys: track({
          opacity: [
            [0.34, 0],
            [0.35, 1],
            [0.44, 1],
            [0.46, 0]
          ],
          scale: [
            [0.34, 0.3],
            [0.37, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 700, low: 0.5 }
      },
      { name: "a way back to the prayer mat", svg: way(`M${busy[0] - 4} 101.6 C116 104.6 92 104.6 ${mat[0] + 9} 101.4`, GOLD), keys: showFrom(0.37, 0.39) },
      ...risingSparks(
        "the prayer, rising",
        [
          [mat[0] - 4, mat[1] - 6],
          [mat[0], mat[1] - 8],
          [mat[0] + 4, mat[1] - 6]
        ],
        0.5,
        0.02,
        { color: SPARK, rise: 14, stay: true }
      ),
      { name: "a light on the prayer mat", svg: glow(mat[0], mat[1] - 1.4, 9, WARM, 0.12) + wash(mat[0], mat[1], 11, 3, "#FFF6D0", 0.14), keys: showFrom(0.52, 0.56), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "a dashed sack, no expiation",
        svg: `<path d="M83.6 103 C82.8 99.6 84.2 97.4 85.6 96.8 L88 96.8 C89.4 97.4 90.8 99.6 90 103 Z" stroke="#A8957A" stroke-width="0.6" stroke-dasharray="1 0.8" fill="none"/>`,
        keys: track({
          opacity: [
            [0.68, 0],
            [0.71, 1],
            [0.78, 1],
            [0.82, 0]
          ]
        })
      },
      {
        name: "a dashed dish, no expiation",
        svg: `<ellipse cx="97" cy="102" rx="4" ry="1.6" stroke="#A8957A" stroke-width="0.6" stroke-dasharray="1 0.8" fill="none"/>`,
        keys: track({
          opacity: [
            [0.7, 0],
            [0.73, 1],
            [0.78, 1],
            [0.82, 0]
          ]
        })
      },
      {
        name: "the light of the prayer, growing",
        svg: glow(mat[0], mat[1] - 2, 16, "#FFE9A8", 0.12),
        origin: { x: mat[0], y: mat[1] - 2 },
        keys: track({
          opacity: [
            [0.84, 0],
            [0.85, 1]
          ],
          scale: [
            [0.84, 0.35],
            [0.9, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.8 }
      },
      {
        name: "someone's place, going off, then back to pray",
        svg: someone(at[0], at[1], 2),
        keys: track({
          xy: [
            [0.14, 0, 0],
            [0.2, busy[0] - at[0], busy[1] - at[1]],
            [0.38, busy[0] - at[0], busy[1] - at[1]],
            [0.46, back[0] - at[0], back[1] - at[1]]
          ]
        })
      }
    ],
    words: [
      { text: "If anyone forgets a prayer", from: 0.02, to: 0.3 },
      { text: "He should pray it when he remembers it", from: 0.32, to: 0.64 },
      { text: "There is no expiation except to pray it", from: 0.66, to: 1 }
    ]
  };
}

export const LOVED_ART = {
  "dearest-deeds": dearestDeeds,
  "truth-leads": truthLeads,
  "ease-a-hardship": easeAHardship,
  "saved-by-mercy": savedByMercy,
  "give-while-healthy": giveWhileHealthy,
  "strong-believer": strongBeliever,
  "forgotten-prayer": forgottenPrayer
} as const;
