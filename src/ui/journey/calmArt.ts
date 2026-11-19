import { cloud, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { at3 } from "./storyArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, lightIn, palms, tent, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, FOLK, glints, linesOn, mat, places, plainLand, SIX, sparkStays, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { GREY } from "./lovedArt";
import { QUICK } from "./dailyArt";
import { pulpit } from "./fairArt";
import { stall } from "./tradeArt";

/**
 * Calm, quiet and asking: not judging between two while angry, as Abu Bakrah wrote to his son; keeping quiet while the
 * khutbah is given, for even telling another to keep quiet is idle talk; the istikharah, two rak'ahs and asking Allah
 * to guide, for He knows and we do not; swearing by Allah or keeping quiet, never by one's fathers; the two rak'ahs at
 * Mina, when they were more and safer than ever; and not forbidding her who asks to go to the masjid. Only the land,
 * the sky, buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. No one rides the camel. Nothing is drawn for Allah, no book,
 * page or letter is drawn, and nothing comes down from the sky: a prayer is a spark that rises, what is good is a
 * light, glints and a soft golden ring, and what is not to be done a grey dashed ring. No name, word or number is
 * written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.5],
  [0.516, 0.75],
  [0.766, 1]
] as const;

/** The words of five lines. */
const FIVE = [
  [0.02, 0.2],
  [0.216, 0.4],
  [0.416, 0.6],
  [0.616, 0.8],
  [0.816, 1]
] as const;

/** The words of nine lines. */
const NINE = [
  [0.012, 0.117],
  [0.121, 0.226],
  [0.23, 0.335],
  [0.339, 0.444],
  [0.448, 0.553],
  [0.557, 0.662],
  [0.666, 0.771],
  [0.775, 0.88],
  [0.884, 1]
] as const;

/** Abdur Rahman ibn Abi Bakrah's place and voice: a slate blue. */
const ABDUR = "#5E6E8E";
/** Abu Bakrah's place: a warm brown. */
const BAKRAH = "#8A5A3A";
/** The place that judges, in Sijistan: a sea green. */
const JUDGES = "#4E7A6E";
/** The one who comes to be judged from the left: a plum. */
const LEFT_SIDE = "#7A5A8A";
/** The one who comes to be judged from the right: an olive. */
const RIGHT_SIDE = "#5E6E3A";
/** The red of anger. */
const ANGER = "#E8735A";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** The place on the pulpit, giving the khutbah, and its voice: a deep blue. */
const KHATIB = "#4E5E9A";
/** The place that talks in the khutbah: a dusty red. */
const TALKS = "#9A6E5E";
/** The place beside it, that tells it to keep quiet: a blue green. */
const TELLS = "#4E7A9A";
/** Jabir ibn Abdullah's place and voice: a deep teal. */
const JABIR = "#3E6E7A";
/** The place of one who thinks of doing a thing: a plain green. */
const ONE = "#5E8A52";
/** Ibn Umar's place and voice: a muted purple. */
const IBN_UMAR = "#6A5E8E";
/** Umar ibn al-Khattab's place and voice: a deep blue green. */
const UMAR = "#3E5E7A";
/** Harithah ibn Wahb's place and voice: an ochre. */
const HARITHAH = "#8A6E3A";
/** Her place and voice: a soft rose. */
const HER = "#9A6E8E";
/** The place she asks, at home, and its voice: an olive. */
const ASKED = "#5E6E3A";

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** A lane along the given points, the places going along it a little above its middle. */
const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A shade of palm leaves on two posts, its middle at x and `w` across, its roof at y `top` and the posts' feet at y `foot`. */
const shade = (x: number, w: number, top: number, foot: number) =>
  `<rect x="${n(x - w / 2 + 1)}" y="${top}" width="1.6" height="${n(foot - top)}" fill="#7A5634"/>` +
  `<rect x="${n(x + w / 2 - 2.6)}" y="${top}" width="1.6" height="${n(foot - top)}" fill="#7A5634"/>` +
  `<path d="M${n(x - w / 2 - 2.4)} ${n(top + 2.2)} L${n(x - w / 2 + 1)} ${n(top - 2.6)} L${n(x + w / 2 - 1)} ${n(top - 2.6)} L${n(x + w / 2 + 2.4)} ${n(top + 2.2)} Z" fill="#D9BC7E"/>` +
  `<path d="M${n(x - w / 2 - 2.4)} ${n(top + 2.2)} L${n(x + w / 2 + 2.4)} ${n(top + 2.2)}" stroke="#A88A50" stroke-width="0.7"/>` +
  [0.12, 0.27, 0.42, 0.57, 0.72, 0.87].map((f) => `<path d="M${n(x - w / 2 + w * f)} ${n(top - 2.2)} L${n(x - w / 2 + w * f - 1.6)} ${n(top + 1.8)}" stroke="#B89A5E" stroke-width="0.5"/>`).join("");

/** A field of young green crops from x `x1` to `x2`, its far edge at y. */
const field = (x1: number, x2: number, y: number) =>
  `<path d="M${x1} ${y} L${x2} ${y} L${n(x2 + 3)} ${n(y + 5)} L${n(x1 - 3)} ${n(y + 5)} Z" fill="#9CB86A"/>` +
  [1, 2, 3, 4].map((i) => `<path d="M${n(x1 - i * 0.7)} ${n(y + i)} L${n(x2 + i * 0.7)} ${n(y + i)}" stroke="#7E9C52" stroke-width="0.4"/>`).join("");

/** A spark of a prayer at (x, y), rising from `from` until `to` and staying there. */
const sparkStaying = (name: string, x: number, y: number, from: number, to: number): SignPart => ({
  name,
  svg: sparkle(x, y, 1.6, "#FFE7A0"),
  keys: sparkStays(from, to, 9),
  loop: twinkle(900)
});

// Not while angry. Abdur Rahman ibn Abi Bakrah said: Abu Bakrah wrote to his son who was in Sijistan: do not judge
// between two persons when you are angry, for I heard the Prophet ﷺ saying: a judge should not judge between two
// persons while he is in an angry mood (Sahih al-Bukhari 7158). No one is drawn, and no letter or page: Abu Bakrah's
// home on the left, with palms, his place by it and Abdur Rahman's; a long way across the land to Sijistan on the
// right, with its hills, and a shade on posts there with a mat, where the place of the one he wrote to sits to judge.
// Abdur Rahman's voice tells of it. Glints come by Abu Bakrah's place, his advice, and go along the long way to the
// place in Sijistan, and stay by it. Two places come to it, one from each side, their voices quick: to be judged. A
// red glow of anger shows on the place that judges, and a grey dashed ring about it: not now. Soft golden glints show
// by Abu Bakrah's place: what he heard from him. The sun goes lower: the judging waits. Then the red glow fades, the
// grey ring goes, a calm soft light shows in its place, its voice speaks, calm and soft, and a soft golden ring comes
// about the three places.
function notWhileAngry(): SignArt {
  const bakrah: [number, number] = [32, 100.4];
  const abdur: [number, number] = [16, 103];
  const judge: [number, number] = [125, 97.6];
  const fromLeft: [number, number] = [98, 105.6];
  const fromRight: [number, number] = [154, 105.6];
  const left: [number, number] = [115, 103];
  const right: [number, number] = [135, 103];
  const advice = along(
    [
      [36, 96.4],
      [60, 91.6],
      [86, 91.4],
      [108, 93.4],
      [n(judge[0] - 4), n(judge[1] - 4.6)]
    ],
    [0.18, 0.198, 0.216, 0.234, 0.25]
  );
  return {
    kind: "not-while-angry",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      {
        name: "the sun, going lower while the judging waits",
        svg: sun(64, 22),
        keys: track({
          xy: [
            [0.66, 0, 0],
            [0.76, 0, 6]
          ]
        })
      },
      { name: "a cloud", svg: cloud(100, 30, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      {
        name: "the hills of Sijistan, far off on the right",
        svg: peaks(
          [
            [116, 12, 10],
            [136, 17, 13],
            [155, 12, 10]
          ],
          78,
          "#A0866A",
          false
        )
      },
      { name: "Abu Bakrah's home", svg: home(20, 93, 18, 12) },
      ...palms(
        [
          [6, 91, 7],
          [44, 91.4, 6.4]
        ],
        "Abu Bakrah's home"
      ),
      { name: "the long way to Sijistan", svg: way("M38 100.6 Q62 92.4 88 93 T116 99", "#C9A66E", 0.9) },
      { name: "a shade on posts in Sijistan, where the judging is", svg: shade(125, 30, 84, 102) },
      { name: "a mat under the shade", svg: mat(judge[0], n(judge[1] + 1.4), 12) },
      { name: "Abu Bakrah's place, by his home", svg: someone(bakrah[0], bakrah[1], 1.5, BAKRAH) },
      { name: "Abdur Rahman's place", svg: someone(abdur[0], abdur[1], 1.5, ABDUR) },
      { name: "Abdur Rahman's voice: telling of it", svg: arcs(n(abdur[0] + 3.2), n(abdur[1] - 2.8), ABDUR), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "the place that judges, in Sijistan", svg: someone(judge[0], judge[1], 1.6, JUDGES) },
      {
        name: "Abu Bakrah's advice: glints by his place, going along the long way to Sijistan",
        svg: glints([
          [36, 96.4],
          [38.6, 94.2]
        ]),
        keys: track({
          opacity: [
            [0.1, 0],
            [0.11, 1],
            [0.25, 1],
            [0.26, 0]
          ],
          xy: advice
        }),
        loop: twinkle()
      },
      {
        name: "the advice reaches it: glints by the place that judges",
        svg: glints([
          [n(judge[0] - 4), n(judge[1] - 4.6)],
          [n(judge[0] - 1.4), n(judge[1] - 6.8)]
        ]),
        keys: showAt(0.252, 0.262),
        loop: twinkle()
      },
      {
        name: "one who comes to be judged, from the left",
        svg: someone(fromLeft[0], fromLeft[1], 1.5, LEFT_SIDE),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.35, 1]
          ],
          xy: [
            [0.34, 0, 0],
            [0.38, n(left[0] - fromLeft[0]), n(left[1] - fromLeft[1])]
          ]
        })
      },
      {
        name: "the other who comes to be judged, from the right",
        svg: someone(fromRight[0], fromRight[1], 1.5, RIGHT_SIDE),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.35, 1]
          ],
          xy: [
            [0.34, 0, 0],
            [0.38, n(right[0] - fromRight[0]), n(right[1] - fromRight[1])]
          ]
        })
      },
      {
        name: "their voices, quick: each telling its side",
        svg: arcs(n(left[0] + 3), n(left[1] - 2.8), LEFT_SIDE) + arcsLeft(n(right[0] - 3), n(right[1] - 2.8), RIGHT_SIDE),
        keys: showFor(0.384, 0.39, 0.44, 0.446),
        loop: QUICK
      },
      {
        name: "angry: a red glow on the place that judges",
        svg: glow(judge[0], judge[1], 6, ANGER, 0.32),
        keys: track({
          opacity: [
            [0.4, 0],
            [0.41, 1],
            [0.82, 1],
            [0.86, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 700, low: 0.6 }
      },
      { name: "not while angry: a grey dashed ring about it", svg: greyRing(judge[0], n(judge[1] + 0.8), 6.4, 2.8), keys: showFor(0.43, 0.44, 0.86, 0.87) },
      {
        name: "what Abu Bakrah heard from him: soft golden glints by his place",
        svg: glints([
          [n(bakrah[0] - 2.4), n(bakrah[1] - 5.2)],
          [n(bakrah[0] + 2.6), n(bakrah[1] - 6.6)]
        ]),
        keys: showAt(0.52, 0.53),
        loop: twinkle(1500)
      },
      { name: "calm: a soft light in the place that judges", svg: lightIn(judge[0], n(judge[1] - 0.4), 3.4), keys: showAt(0.875, 0.885), loop: soft },
      { name: "its voice, calm and soft: judging between them", svg: arcs(n(judge[0] + 3.2), n(judge[1] - 3.2), "#FFF3CF"), keys: showAt(0.9, 0.906), loop: speaking },
      { name: "a soft golden ring about the three places", svg: care(125, 101.8, 16, 4.6, SOFT_GOLD), keys: showAt(0.94, 0.955), loop: soft }
    ],
    words: linesOn(SIX, [
      "Abdur Rahman: Abu Bakrah wrote to his",
      "Son who was in Sijistan: do not judge",
      "Between two persons when you are angry,",
      "For I heard him saying: a judge should",
      "Not judge between two persons while he",
      "Is in an angry mood."
    ])
  };
}

// Quiet in the khutbah. Abu Hurairah said that the Messenger of Allah ﷺ said: when the Imam is delivering the khutbah,
// and you ask your companion to keep quiet and listen, then no doubt you have done an evil act (Sahih al-Bukhari 934;
// the Arabic: if you say to your companion on Friday: keep quiet, while the Imam is giving the khutbah, you have
// engaged in idle talk). No one is drawn: Madinah on a Friday at midday, the masjid behind with palms, a pulpit, the
// place on it giving the khutbah, and rows of places sitting before it, Abu Hurairah's among them. Abu Hurairah's
// voice tells of it. The voice from the pulpit gives the khutbah, and a soft light comes over the rows: listening. A
// place in the first row talks, its voice quick and grey; the place beside it turns to it and speaks: keep quiet and
// listen. A grey dashed ring comes about the one that told it: an evil act. The khutbah goes on, with glints by its
// voice.
function quietInTheKhutbah(): SignArt {
  const top: [number, number] = [19.4, 93.9];
  const talks: [number, number] = [62, 100];
  const tells: [number, number] = [70, 100];
  const hurairah: [number, number] = [98, 106.4];
  const rows: [number, number][] = [
    ...[38, 46, 54, 78, 86, 94, 102].map((x): [number, number] => [x, 100]),
    ...[34, 42, 50, 58, 66, 74, 82, 90].map((x): [number, number] => [x, 106.4])
  ];
  return {
    kind: "quiet-in-the-khutbah",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun, high at midday", svg: sun(132, 16) },
      { name: "a cloud", svg: cloud(64, 24, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 116], [80, 117], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(104, 91, 0.94) },
      ...palms(
        [
          [98, 91, 11],
          [154, 92.4, 10]
        ],
        "the town"
      ),
      { name: "a pulpit", svg: big(pulpit(16, 104), 16, 104, 1.3) },
      { name: "the place on the pulpit, giving the khutbah", svg: someone(top[0], top[1], 1.6, KHATIB) },
      { name: "its voice: the khutbah", svg: arcs(n(top[0] + 3.4), n(top[1] - 2.8), KHATIB), keys: showAt(0.1, 0.11), loop: speaking },
      { name: "the rows of places, sitting before the pulpit", svg: places(rows, 1.4) },
      { name: "Abu Hurairah's place, in the second row", svg: someone(hurairah[0], hurairah[1], 1.4, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 2.8), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.2, 0.206), loop: speaking },
      { name: "a place in the first row", svg: someone(talks[0], talks[1], 1.4, TALKS) },
      { name: "the place beside it", svg: someone(tells[0], tells[1], 1.4, TELLS) },
      { name: "listening: a soft light over the rows", svg: wash(68, 103.4, 40, 6.6, WARM, 0.14), keys: showAt(0.28, 0.3), loop: soft },
      { name: "talking: a quick grey voice from the place in the first row", svg: arcsLeft(n(talks[0] - 2.8), n(talks[1] - 2.8), GREY), keys: showFor(0.38, 0.386, 0.46, 0.466), loop: QUICK },
      { name: "the place beside it, turning to it: keep quiet and listen", svg: arcsLeft(n(tells[0] - 2.8), n(tells[1] - 3), TELLS), keys: showFor(0.53, 0.536, 0.68, 0.686), loop: speaking },
      { name: "an evil act: a grey dashed ring about the one that told it", svg: greyRing(tells[0], n(tells[1] + 0.6), 4.4, 2.2), keys: showAt(0.78, 0.79) },
      {
        name: "the khutbah goes on: glints by its voice",
        svg: glints(
          [
            [n(top[0] + 8), n(top[1] - 5.4)],
            [n(top[0] + 9.4), n(top[1] - 1.8)]
          ],
          0.7
        ),
        keys: showAt(0.88, 0.9),
        loop: twinkle()
      }
    ],
    words: linesOn(FOUR, [
      "Abu Hurairah: he said: when the Imam is",
      "Delivering the khutbah, and you ask your",
      "Companion to keep quiet and listen, then",
      "No doubt you have done an evil act."
    ])
  };
}

// The istikharah. Jabir ibn Abdullah said: the Prophet ﷺ used to teach us the way of doing istikharah in all matters,
// as he taught us the surahs of the Quran. He said: if anyone of you thinks of doing any job, he should offer a
// two-rak'ah prayer other than the compulsory ones and say: O Allah! I ask guidance from Your knowledge, and power from
// Your might, and I ask for Your great blessings. You are capable and I am not. You know and I do not, and You know the
// unseen ... (Sahih al-Bukhari 1166; the words of the prayer in Arabic letters, "and power from Your might" to "I am
// not", and the rest of the prayer are left out of the lines). No one is drawn: the masjid of Madinah on the left, his
// place, a golden ring, with Jabir's place and the places of those he taught, sitting; the town, a home and the
// market, and a field with palms on the right. Jabir's voice tells of it; his voice, soft and golden, teaches, and
// small lights come in their places. Small lights come over the home, the market and the field, one after another:
// in all matters. The place of one who thinks of doing a thing comes to where the way parts, one way to the market and
// one to the field, and a faint dashed ring comes about it: thinking of it. A mat shows under it, and two sparks rise
// from it and stay: two rak'ahs. Its voice, soft, asks; soft golden glints come about it; then the faint ring goes and
// a soft golden ring comes about its place. Nothing is drawn for Allah.
function theIstikharah(): SignArt {
  const his: [number, number] = [22, 99.6];
  const jabir: [number, number] = [34, 101.6];
  const taught: [number, number][] = [
    [12, 104.6],
    [26, 106],
    [40, 106.4]
  ];
  const start: [number, number] = [72, 106];
  const one: [number, number] = [102, 104.6];
  return {
    kind: "the-istikharah",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(126, 20) },
      { name: "a cloud", svg: cloud(70, 30, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the masjid", svg: madinahMasjid(4, 91, 0.7) },
      { name: "a home of the town", svg: home(58, 90, 14, 9.6) },
      { name: "the market of the town", svg: big(stall(84, 22, "#3E7FB0", 66, 84), 84, 92, 0.46) },
      { name: "a field", svg: field(126, 152, 88) },
      ...palms(
        [
          [120, 88, 8],
          [156, 88.6, 7.4]
        ],
        "the field"
      ),
      { name: "the way to the market", svg: way(`M${one[0]} ${n(one[1] + 1.2)} Q92 99 86 94`, "#C9A66E", 0.9) },
      { name: "the way to the field", svg: way(`M${one[0]} ${n(one[1] + 1.2)} Q122 100 136 94`, "#C9A66E", 0.9) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.5, JABIR) },
      { name: "the places of those he taught, sitting", svg: places(taught, 1.4) },
      { name: "Jabir's voice: telling of it", svg: arcs(n(jabir[0] + 3.2), n(jabir[1] - 2.8), JABIR), keys: showFor(0.014, 0.02, 0.06, 0.066), loop: speaking },
      { name: "his voice, soft and golden: teaching", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.07, 0.076, 0.516, 0.522), loop: speaking },
      {
        name: "what they were taught: small lights in their places",
        svg: glints([...taught, jabir].map(([x, y]) => [x, n(y - 3.6)]), 0.7),
        keys: showAt(0.13, 0.14),
        loop: twinkle()
      },
      { name: "in all matters: a small light over the home", svg: lightIn(58, 78, 2.8), keys: showAt(0.24, 0.248), loop: soft },
      { name: "a small light over the market", svg: lightIn(84, 80.4, 2.8), keys: showAt(0.256, 0.264), loop: soft },
      { name: "and a small light over the field", svg: lightIn(139, 84, 2.8), keys: showAt(0.272, 0.28), loop: soft },
      {
        name: "the place of one who thinks of doing a thing, coming to where the way parts",
        svg: someone(start[0], start[1], 1.5, ONE),
        keys: track({
          opacity: [
            [0.35, 0],
            [0.36, 1]
          ],
          xy: [
            [0.36, 0, 0],
            [0.4, n(one[0] - start[0]), n(one[1] - start[1])]
          ]
        })
      },
      { name: "thinking of it: a faint dashed ring about its place", svg: `<g opacity="0.75">${care(one[0], n(one[1] + 0.6), 5.6, 2.4, "#FFFFFF")}</g>`, keys: showFor(0.46, 0.47, 0.89, 0.9) },
      { name: "a mat to pray on, under it", svg: mat(one[0], n(one[1] + 1.6), 8), keys: showAt(0.56, 0.566) },
      sparkStaying("the first rak'ah: a spark rising from its place", n(one[0] - 1.4), n(one[1] - 3), 0.57, 0.6),
      sparkStaying("the second rak'ah: a spark rising from its place", n(one[0] + 1.6), n(one[1] - 3), 0.605, 0.63),
      { name: "its voice, soft: asking", svg: arcs(n(one[0] + 3.2), n(one[1] - 2.8), "#FFF3CF"), keys: showAt(0.7, 0.706), loop: speaking },
      {
        name: "asking for guidance: soft golden glints about its voice",
        svg: glints(
          [
            [n(one[0] + 8.6), n(one[1] - 5.2)],
            [n(one[0] + 9.2), n(one[1] - 1.4)]
          ],
          0.7
        ),
        keys: showAt(0.79, 0.8),
        loop: twinkle()
      },
      { name: "leaving it to be chosen: a soft golden ring about its place", svg: care(one[0], n(one[1] + 0.6), 6, 2.6, SOFT_GOLD), keys: showAt(0.91, 0.925), loop: soft }
    ],
    words: linesOn(NINE, [
      "Jabir ibn Abdullah: he used to teach us",
      "The way of doing istikharah, in all",
      "Matters as he taught us the surahs of",
      "The Quran. He said: if anyone of you",
      "Thinks of doing any job he should offer",
      "A two-rak'ah prayer other than the",
      "Compulsory ones and say: O Allah! I ask",
      "Guidance from Your knowledge. You know",
      "And I do not and You know the unseen."
    ])
  };
}

// Swear by Allah or keep quiet. Ibn Umar said that the Messenger of Allah ﷺ met Umar ibn al-Khattab, while he was
// going with a group of riders, and he was swearing by his father. He said: Lo! Allah forbids you to swear by your
// fathers, so whoever has to take an oath, he should swear by Allah or keep quiet (Sahih al-Bukhari 6646; "while he
// was going with a group of camel-riders" is left out of the lines, and no one rides the camel). No one is drawn: a
// road across the desert, with dunes and hills far off; Umar's place and the places of those with him going along it,
// and a camel walking with them; Ibn Umar's place by the road. Ibn Umar's voice tells of it. His place, a golden ring,
// comes along the road and meets them. Umar's voice speaks: swearing by his father. His voice, soft and golden: a grey
// dashed ring comes about Umar's voice: not by your fathers. Glints come by his voice. Then Umar's voice is quiet and
// the grey ring goes; a soft golden ring comes about Umar's place, and a soft light over the places on the road.
function swearByAllah(): SignArt {
  const ibnUmar: [number, number] = [12, 106.4];
  const umar: [number, number] = [36, 101];
  const step: [number, number] = [32, -1];
  const umarAt: [number, number] = [n(umar[0] + step[0]), n(umar[1] + step[1])];
  const others: [number, number][] = [
    [26, 102.6],
    [18, 100.4]
  ];
  const meets: [number, number] = [102, 100.6];
  const goes = track({
    xy: [
      [0.03, 0, 0],
      [0.15, step[0], step[1]]
    ]
  });
  return {
    kind: "swear-by-allah",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 22) },
      { name: "a cloud", svg: cloud(108, 28, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E8CF9E", [[20, 116], [70, 118], [140, 117]]) },
      {
        name: "dunes",
        svg: `<path d="M0 84 Q24 77 48 82 T96 80 T144 78 T160 78 L160 92 L0 92 Z" fill="#E6C998" opacity="0.8"/>`
      },
      { name: "the road across the desert", svg: way("M0 102.6 Q40 100.4 80 101.8 T160 100.6", "#C9A66E", 1) },
      { name: "a camel, walking with them along the road", svg: camel(6, 101.4, 0.15), keys: goes, loop: { move: "bob", ms: 900, y: 0.4 } },
      { name: "Umar's place, going along the road", svg: someone(umar[0], umar[1], 1.5, UMAR), keys: goes },
      { name: "the places of those with him, going along the road", svg: places(others, 1.4), keys: goes },
      { name: "Ibn Umar's place, by the road", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(n(ibnUmar[0] + 3.2), n(ibnUmar[1] - 2.8), IBN_UMAR), keys: showFor(0.024, 0.03, 0.16, 0.166), loop: speaking },
      {
        name: "his place, a golden ring, coming along the road to meet them",
        svg: ring(146, 99.6, 2.6, GOLD),
        keys: track({
          xy: [
            [0.05, 0, 0],
            [0.15, n(meets[0] - 146), n(meets[1] - 99.6)]
          ]
        })
      },
      { name: "Umar's voice: swearing as he went", svg: arcs(n(umarAt[0] + 3.2), n(umarAt[1] - 2.8), UMAR), keys: showFor(0.22, 0.226, 0.82, 0.826), loop: speaking },
      { name: "his voice, soft and golden", svg: arcsLeft(n(meets[0] - 3.6), n(meets[1] - 2.8), SOFT_GOLD), keys: showAt(0.33, 0.336), loop: speaking },
      { name: "not by your fathers: a grey dashed ring about Umar's voice", svg: greyRing(n(umarAt[0] + 5), n(umarAt[1] - 3), 4.6, 3), keys: showFor(0.43, 0.44, 0.82, 0.826) },
      {
        name: "his words: glints by his voice",
        svg: glints(
          [
            [n(meets[0] - 9), n(meets[1] - 5.4)],
            [n(meets[0] - 9.6), n(meets[1] - 1.8)]
          ],
          0.7
        ),
        keys: showAt(0.64, 0.65),
        loop: twinkle()
      },
      { name: "keeping quiet: a soft golden ring about Umar's place", svg: care(umarAt[0], n(umarAt[1] + 0.6), 5.6, 2.4, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "a soft light over the places on the road", svg: wash(62, 101, 30, 5, WARM, 0.14), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Ibn Umar: he met Umar ibn al-Khattab",
      "Swearing by his father. He said: Lo! Allah",
      "Forbids you to swear by your fathers, so",
      "Whoever has to take an oath, he should",
      "Swear by Allah or keep quiet."
    ])
  };
}

// Two rak'ahs at Mina. Harithah ibn Wahb al-Khuza'i said: the Prophet ﷺ led us in a two-rak'ah prayer at Mina,
// although our number was more than ever and we were in better security than ever (Sahih al-Bukhari 1656). No one is
// drawn: the valley of Mina between its rocky hills, the pilgrims' tents, his place, a golden ring, at the front, and
// the pilgrims' places coming into rows behind him, Harithah's among them. Harithah's voice tells of it. Two sparks
// rise from his place and stay, one after the other, and a spark from the rows with each: two rak'ahs. More places
// come into the valley, one group and then another: more than ever. Then a soft golden glow over the valley, glints
// over the tents, and a soft golden ring about all the places: safer than ever.
function twoRakahsAtMina(): SignArt {
  const his: [number, number] = [30, 100];
  const harithah: [number, number] = [62, 106];
  const rows: [number, number][] = [
    ...[52, 60, 68, 76, 84].map((x): [number, number] => [x, 100]),
    ...[54, 70, 78, 86].map((x): [number, number] => [x, 106])
  ];
  const more1: [number, number][] = [100, 108, 116, 124].map((x): [number, number] => [x, 100]);
  const more2: [number, number][] = [102, 110, 118, 126].map((x): [number, number] => [x, 106]);
  const rowsIn = track({
    xy: [
      [0.06, 0, 0],
      [0.16, -10, 0]
    ]
  });
  const comes = (from: number): SignPart["keys"] =>
    track({
      opacity: [
        [from, 0],
        [at3(from + 0.01), 1]
      ],
      xy: [
        [from, 24, 0],
        [at3(from + 0.07), 0, 0]
      ]
    });
  return {
    kind: "two-rakahs-at-mina",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#CFE3F0", "#EEDDB8", 62) },
      { name: "the sun", svg: sun(80, 18) },
      { name: "a cloud", svg: cloud(116, 26, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "the ground of the valley", svg: plainLand("#C9AE84", [[30, 116], [90, 118], [146, 116]]) },
      {
        name: "the rocky hills of Mina, on the left",
        svg: peaks(
          [
            [8, 18, 30],
            [34, 16, 22]
          ],
          84,
          "#9C7E62",
          false
        )
      },
      {
        name: "the rocky hills of Mina, on the right",
        svg: peaks(
          [
            [128, 16, 24],
            [154, 18, 30]
          ],
          84,
          "#9C7E62",
          false
        )
      },
      { name: "the pilgrims' tents", svg: tent(50, 91, 12, 8) + tent(66, 90.4, 11, 7.4) + tent(84, 91, 12, 8) + tent(102, 90.4, 11, 7.4) + tent(120, 91, 12, 8) },
      { name: "his place, a golden ring, at the front", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the pilgrims' places, coming into rows behind him", svg: places(rows, 1.4), keys: rowsIn },
      { name: "Harithah's place, in the rows", svg: someone(harithah[0], harithah[1], 1.4, HARITHAH), keys: rowsIn },
      {
        name: "Harithah's voice: telling of it",
        svg: arcs(n(harithah[0] + 2.8), n(harithah[1] - 2.8), HARITHAH),
        keys: track({
          opacity: [
            [0.024, 0],
            [0.03, 1],
            [0.2, 1],
            [0.206, 0]
          ],
          xy: [
            [0.06, 0, 0],
            [0.16, -10, 0]
          ]
        }),
        loop: speaking
      },
      sparkStaying("the first rak'ah: a spark rising from his place", n(his[0] - 1.6), n(his[1] - 3), 0.28, 0.32),
      spark("and a spark rising from the rows", 62, 97, 0.29, 0.34),
      sparkStaying("the second rak'ah: a spark rising from his place", n(his[0] + 1.6), n(his[1] - 3), 0.38, 0.42),
      spark("and another spark rising from the rows", 70, 97, 0.39, 0.44),
      { name: "more than ever: more places coming into the valley", svg: places(more1, 1.4), keys: comes(0.53) },
      { name: "and more places after them", svg: places(more2, 1.4), keys: comes(0.6) },
      { name: "safer than ever: a soft golden glow over the valley", svg: wash(78, 101, 58, 8, WARM, 0.12), keys: showAt(0.78, 0.8), loop: soft },
      {
        name: "glints over the tents",
        svg: glints([
          [50, 80],
          [84, 80],
          [120, 80]
        ]),
        keys: showAt(0.83, 0.85),
        loop: twinkle()
      },
      { name: "a soft golden ring about all the places", svg: care(76, 103.4, 56, 7.6, SOFT_GOLD), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: linesOn(FOUR, [
      "Harithah ibn Wahb: he led us in a",
      "Two-rak'ah prayer at Mina although our",
      "Number was more than ever and we were",
      "In better security than ever."
    ])
  };
}

// Let her go to the masjid. Ibn Umar (Salim's father) said that the Prophet ﷺ said: if the wife of anyone of you asks
// permission to go to the mosque, he should not forbid her (Sahih al-Bukhari 5238). No one is drawn: a lane in Madinah
// from a home on the left to the masjid on the right, with palms; her place and the place she asks by the home; his
// place, a golden ring, at the masjid, and Ibn Umar's place by it. Ibn Umar's voice tells of it, and his voice, soft
// and golden, speaks. Her voice, soft, asks; a faint soft golden way shows along the lane: where she would go. The
// place she asks answers, its voice soft and golden; her place goes along the lane to the masjid, a soft golden ring
// comes about it there, and glints over the masjid.
function letHerGo(): SignArt {
  const her: [number, number] = [36, 100.6];
  const asked: [number, number] = [24, 102];
  const his: [number, number] = [118, 101.6];
  const ibnUmar: [number, number] = [132, 103.4];
  const walk: [number, number][] = [her, [64, 99], [84, 98.6], [104, 100.4]];
  return {
    kind: "let-her-go",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(70, 20) },
      { name: "a cloud", svg: cloud(36, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "her home", svg: home(18, 93, 20, 13) },
      { name: "the masjid", svg: madinahMasjid(106, 93, 1) },
      ...palms(
        [
          [48, 90, 7],
          [96, 91, 8]
        ],
        "Madinah"
      ),
      {
        name: "a lane from her home to the masjid",
        svg: lane([
          [30, 101],
          [64, 99],
          [84, 98.6],
          [110, 100.6]
        ])
      },
      { name: "her place, by her home", svg: someone(her[0], her[1], 1.5, HER), keys: track({ xy: along(walk, [0.75, 0.79, 0.83, 0.87]) }) },
      { name: "the place she asks, by the home", svg: someone(asked[0], asked[1], 1.5, ASKED) },
      { name: "his place, a golden ring, at the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ibn Umar's place, by him", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(n(ibnUmar[0] + 3.2), n(ibnUmar[1] - 2.8), IBN_UMAR), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showAt(0.13, 0.136), loop: speaking },
      { name: "her voice, soft: asking", svg: arcsLeft(n(her[0] - 3.2), n(her[1] - 2.8), HER), keys: showFor(0.37, 0.376, 0.5, 0.506), loop: speaking },
      { name: "where she would go: a faint soft golden way along the lane", svg: `<g opacity="0.7">${way("M40 99.4 Q64 96.4 84 96.6 T104 98.6", SOFT_GOLD, 0.7)}</g>`, keys: showAt(0.52, 0.54) },
      { name: "not forbidding her: its voice, soft and golden", svg: arcs(n(asked[0] + 3.2), n(asked[1] - 2.8), SOFT_GOLD), keys: showFor(0.69, 0.696, 0.74, 0.746), loop: speaking },
      { name: "a soft golden ring about her place, at the masjid", svg: care(walk[3][0], n(walk[3][1] + 0.6), 5.6, 2.4, SOFT_GOLD), keys: showAt(0.89, 0.905), loop: soft },
      {
        name: "glints over the masjid",
        svg: glints([
          [112, 72],
          [130, 70.4],
          [148, 72]
        ]),
        keys: showAt(0.92, 0.94),
        loop: twinkle()
      }
    ],
    words: linesOn(THREE, ["Ibn Umar: he said: if the wife of anyone", "Of you asks permission to go to the", "Mosque, he should not forbid her."])
  };
}

export const CALM_ART = {
  "not-while-angry": notWhileAngry,
  "quiet-in-the-khutbah": quietInTheKhutbah,
  "the-istikharah": theIstikharah,
  "swear-by-allah": swearByAllah,
  "two-rakahs-at-mina": twoRakahsAtMina,
  "let-her-go": letHerGo
} as const;
