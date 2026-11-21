import { cloud, glow, n, nightSky, peaks, sky, stars, type SignArt } from "./signDraw";
import { ring } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, spark, speaking } from "./fastArt";
import { road, showAt, SOFT_GOLD } from "./roadArt";
import { EIGHT, glints, linesOn, plainLand, SEVEN, twinkle } from "./shareArt";
import { aDay, spoken, voice } from "./stepsArt";
import { farHills } from "./wideArt";
import { litWindow, nightLand } from "./heedArt";
import { boat, waves } from "./companyArt";
import { jar } from "./tradeArt";
import { lane } from "./freshArt";
import { prayerMat } from "./lovedArt";

/**
 * More of his ﷺ teaching in Sunan Abi Dawud, each told around something asked: the low voice and the loud voice he
 * heard at night, and the middle voice he asked for; the one who asked to come in without the salam, taught to say
 * it; Abu Rafi', sent by Quraysh, who asked to stay; the one who asked about the water of the sea; and the woman who
 * asked for his time, and the street corner he sat at with her. Only the land, the sea, the sky, homes, things and
 * plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a
 * face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice
 * is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer is a spark that rises.
 * No name, word or number is written.
 */

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

/** Abu Qatadah's place and voice: a soft violet, seen at night. */
const ABU_QATADAH = "#C3B4E2";
/** Abu Bakr's place and voice: a soft sky blue, seen at night. */
const ABU_BAKR = "#A9CBEB";
/** Umar's place and voice: a soft sand, seen at night. */
const UMAR = "#E5C29A";

/** A home at night, its foot's middle at (x, y), `w` wide and `h` high, its window lit. */
const homeAtNight = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#6A5A4C", "#5A4C40", "#2E2620") + litWindow(x, y, h);

/** A voice of `count` arcs from (x, y), facing right (or left), the first `h` high and each `step` wider than the last. */
const voiceOf = (x: number, y: number, color: string, count: number, h: number, step: number, width: number, left = false) =>
  Array.from({ length: count }, (_, i) => {
    const ax = n(left ? x - i * (step + 0.6) : x + i * (step + 0.6));
    const high = h + i * step;
    const bend = n(left ? -high * 0.7 : high * 0.7);
    return `<path d="M${ax} ${n(y - high)} Q${n(ax + bend)} ${y} ${ax} ${n(y + high)}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
  }).join("");

/** A low voice: two small, thin arcs. */
const lowVoice = (x: number, y: number, color: string, left = false) => voiceOf(x, y, color, 2, 1.2, 0.8, 0.6, left);
/** A loud voice: four large, bold arcs. */
const loudVoice = (x: number, y: number, color: string, left = false) => voiceOf(x, y, color, 4, 1.8, 1.6, 1.1, left);

// A little higher, a little lower. Abu Qatadah said: the Prophet ﷺ went out at night and found Abu Bakr praying in a
// low voice, and he passed Umar ibn al-Khattab, who was raising his voice while praying. When they both met him, he told
// each what he had heard, and each told him why; and he said: raise your voice a little, Abu Bakr; and to Umar: lower
// your voice a little (Sunan Abi Dawud 1329). The lines say Umar "was praying in a loud voice", as he ﷺ says it later on
// the page, where its opening says "raising his voice", since he alone means the Prophet ﷺ in the lines. They leave out
// what he ﷺ said to each when they met, and Abu Bakr's answer, which speaks of Allah as Him. No one is drawn: at night,
// three homes of Madinah, Abu Bakr's on the left, his ﷺ in the middle and Umar's on the right, their windows lit, and a
// mat before each of theirs. Abu Qatadah's voice tells of it. His place, a golden ring, comes out of his door, and goes
// to Abu Bakr's home and stops; only then does Abu Bakr's voice show, low: two small, thin arcs, and a spark of his
// prayer rises. It goes on to Umar's home, whose voice is loud: four large, bold arcs, and a spark of his prayer rises.
// Then the two come to him, and Umar's voice tells why. His voice, soft and golden, speaks to Abu Bakr, and Abu Bakr's
// low voice shows again and grows a little; then to Umar, and Umar's loud voice shows again and grows a little smaller.
function aMiddleVoice(): SignArt {
  const qatadah: [number, number] = [10, 108.6];
  const bakr: [number, number] = [25, 99.6];
  const umar: [number, number] = [133, 99.6];
  const door: [number, number] = [78.2, 97.6];
  const met: [number, number] = [80, 105.8];
  const bakrMet: [number, number] = [68, 106.6];
  const umarMet: [number, number] = [92, 106.6];
  return {
    kind: "a-middle-voice",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars of the night",
        svg: stars([
          [8, 12],
          [24, 38],
          [40, 10],
          [60, 44],
          [78, 14],
          [100, 40],
          [116, 10],
          [130, 34],
          [152, 14],
          [16, 54],
          [92, 52]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon of the night", svg: `${glow(142, 30, 7, "#FFF3C4", 0.08)}${crescent(142, 30, 4, 1.4, "#FFF3C4")}` },
      { name: "hills in the dark", svg: hills("#3A4263") },
      { name: "the land at night", svg: nightLand(62, [[18, 76], [62, 74], [112, 78], [150, 112], [44, 114]]) },
      { name: "the lane between the homes", svg: lane([[4, 105.4], [156, 105.4]], "#4E5374") },
      { name: "Abu Bakr's home", svg: homeAtNight(26, 95, 30, 21) },
      { name: "his home", svg: homeAtNight(80, 94, 28, 21) },
      { name: "Umar's home", svg: homeAtNight(134, 95, 30, 21) },
      { name: "a mat, Abu Bakr's place of prayer", svg: prayerMat(26, 100.6) },
      { name: "a mat, Umar's place of prayer", svg: prayerMat(134, 100.6) },
      {
        name: "Abu Bakr's place: praying, then coming to him",
        svg: someone(bakr[0], bakr[1], 1.8, ABU_BAKR),
        keys: track({
          xy: [
            [0.452, 0, 0],
            [0.49, n(bakrMet[0] - bakr[0]), n(bakrMet[1] - bakr[1])]
          ]
        })
      },
      { name: "Abu Bakr's voice, low: two small, thin arcs", svg: lowVoice(n(bakr[0] + 2.4), n(bakr[1] - 2.4), ABU_BAKR), keys: voice([[0.125, 0.452]]), loop: speaking },
      spark("Abu Bakr's prayer: a spark rising", bakr[0], n(bakr[1] - 4.4), 0.128, 0.19),
      {
        name: "Umar's place: praying, then coming to him",
        svg: someone(umar[0], umar[1], 1.8, UMAR),
        keys: track({
          xy: [
            [0.452, 0, 0],
            [0.49, n(umarMet[0] - umar[0]), n(umarMet[1] - umar[1])]
          ]
        })
      },
      { name: "Umar's voice, loud: four large, bold arcs", svg: loudVoice(n(umar[0] - 2.4), n(umar[1] - 2.4), UMAR, true), keys: voice([[0.236, 0.452]]), loop: speaking },
      spark("Umar's prayer: a spark rising", umar[0], n(umar[1] - 4.4), 0.24, 0.3),
      {
        name: "his place, a golden ring: going out at night, by Abu Bakr's home, then Umar's",
        svg: ring(door[0], door[1], 2.2, GOLD),
        keys: track({
          xy: [
            [0.02, 0, 0],
            [0.035, -0.2, 8],
            [0.1, n(44 - door[0]), 8],
            [0.235, n(44 - door[0]), 8],
            [0.3, n(116 - door[0]), 8],
            [0.452, n(116 - door[0]), 8],
            [0.49, n(met[0] - door[0]), n(met[1] - door[1])]
          ]
        })
      },
      { name: "Umar's voice: telling why", svg: arcsLeft(n(umarMet[0] - 2.6), n(umarMet[1] - 3.4), UMAR), keys: voice([[0.494, 0.65]]), loop: speaking },
      { name: "his voice, soft and golden: to Abu Bakr", svg: arcsLeft(n(met[0] - 2.8), n(met[1] - 2.6), SOFT_GOLD), keys: voice([[0.67, 0.8]]), loop: speaking },
      { name: "his voice, soft and golden: to Umar", svg: arcs(n(met[0] + 2.8), n(met[1] - 2.6), SOFT_GOLD), keys: voice([[0.81, 0.98]]), loop: speaking },
      {
        name: "Abu Bakr's low voice again, growing a little",
        svg: lowVoice(n(bakrMet[0] - 2.4), n(bakrMet[1] - 2.6), ABU_BAKR, true),
        origin: { x: n(bakrMet[0] - 2.4), y: n(bakrMet[1] - 2.6) },
        keys: track({
          opacity: [
            [0.778, 0],
            [0.786, 1]
          ],
          scale: [
            [0.79, 1],
            [0.83, 1.6]
          ]
        }),
        loop: soft
      },
      {
        name: "Umar's loud voice again, growing a little smaller",
        svg: loudVoice(n(umarMet[0] + 2.4), n(umarMet[1] - 2.6), UMAR),
        origin: { x: n(umarMet[0] + 2.4), y: n(umarMet[1] - 2.6) },
        keys: track({
          opacity: [
            [0.886, 0],
            [0.894, 1]
          ],
          scale: [
            [0.9, 1],
            [0.94, 0.66]
          ]
        }),
        loop: soft
      },
      { name: "Abu Qatadah's place", svg: someone(qatadah[0], qatadah[1], 1.7, ABU_QATADAH) },
      { name: "Abu Qatadah's voice: telling of it", svg: arcs(n(qatadah[0] + 2.6), n(qatadah[1] - 3.4), ABU_QATADAH), keys: voice([[0.02, 0.43]]), loop: speaking }
    ],
    words: linesOn(NINE, [
      "Abu Qatadah: the Prophet went out at night",
      "And found Abu Bakr praying in a low voice,",
      "And he passed Umar ibn al-Khattab, who",
      "Was praying in a loud voice.",
      "Umar said: I was awakening the drowsy",
      "And driving away the Devil.",
      "The Prophet said: Raise your voice",
      "A little, Abu Bakr, and he said to Umar:",
      "Lower your voice a little."
    ])
  };
}

/** The place and voice of the one of Banu Amir: a pine green. */
const BANU_AMIR = "#4E7E62";
/** The place of the one who served in his ﷺ home: a soft brown, seen in the doorway. */
const IN_SERVICE = "#D9B48A";

/**
 * A home with an open doorway, its foot's middle at (x, y), `w` wide and `h` high, the doorway `dw` wide and `dh` high
 * with its middle at `dx`: through it, the room inside shows, dim, and its floor.
 */
const homeWithDoorway = (x: number, y: number, w: number, h: number, dx: number, dw: number, dh: number) => {
  const l = n(x - w / 2);
  const top = n(y - h);
  const dl = n(dx - dw / 2);
  return (
    `<rect x="${l}" y="${top}" width="${w}" height="${h}" fill="#D3A872"/>` +
    `<rect x="${n(x + w * 0.2)}" y="${top}" width="${n(w * 0.3)}" height="${h}" fill="#000000" opacity="0.1"/>` +
    `<rect x="${n(l - 0.8)}" y="${n(top - 1.4)}" width="${n(w + 1.6)}" height="1.6" fill="#BC9060"/>` +
    `<path d="M${n(dl - 1)} ${y} L${n(dl - 1)} ${n(y - dh + 3)} Q${dx} ${n(y - dh - 3)} ${n(dl + dw + 1)} ${n(y - dh + 3)} L${n(dl + dw + 1)} ${y} Z" fill="#BC9060"/>` +
    `<path d="M${dl} ${y} L${dl} ${n(y - dh + 3)} Q${dx} ${n(y - dh - 1.6)} ${n(dl + dw)} ${n(y - dh + 3)} L${n(dl + dw)} ${y} Z" fill="#5A4232"/>` +
    `<rect x="${dl}" y="${n(y - 4.2)}" width="${dw}" height="4.2" fill="#6E5038"/>` +
    `<rect x="${n(l + w * 0.1)}" y="${n(top + h * 0.24)}" width="4.4" height="4.4" fill="#6B4A2E"/>` +
    `<rect x="${n(x + w * 0.34)}" y="${n(top + h * 0.24)}" width="4.4" height="4.4" fill="#6B4A2E"/>`
  );
};

/** The open doorway's outline, `dw` wide and `dh` high, its foot's middle at (x, y): a soft golden arch. */
const doorwayArch = (x: number, y: number, dw: number, dh: number) =>
  `<path d="M${n(x - dw / 2 - 1.6)} ${y} L${n(x - dw / 2 - 1.6)} ${n(y - dh + 3)} Q${x} ${n(y - dh - 4.4)} ${n(x + dw / 2 + 1.6)} ${n(y - dh + 3)} L${n(x + dw / 2 + 1.6)} ${y}" stroke="${GOLD}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;

// Salam, then may I come in? Rib'i said: a man of Banu Amir told that he asked the Prophet ﷺ for permission while he
// was in the house, saying: may I enter? The Prophet ﷺ said to his servant: go out to this man and teach him how to ask
// permission; tell him to say: peace be upon you, may I enter? The man heard it and said: peace be upon you, may I
// enter? The Prophet ﷺ gave him permission, and he entered (Sunan Abi Dawud 5177). The lines name the man where the page
// says "he asked" and "he entered", and say "this man" for the page's "this (man)" and "him", since he alone means the
// Prophet ﷺ in the lines; they leave out the page's "to enter the house, and say to him". No one is drawn: a home with
// an open doorway, and in it his place, a golden ring, and the place of the one who served in his home. The place of the
// one of Banu Amir comes along the lane and stops before it; only then does its voice ask. His voice, soft and golden,
// speaks to the one who served him. The one of Banu Amir's voice asks again, with the salam. Then his voice speaks to it,
// and only then does its place go in at the doorway, and a soft golden arch comes about the doorway, with glints.
function mayIEnter(): SignArt {
  const [x, foot, w, h] = [104, 104, 72, 44];
  const [dx, dw, dh] = [104, 24, 26];
  const his: [number, number] = [100.6, 102.2];
  const served: [number, number] = [110, 102.4];
  const amir: [number, number] = [10, 106.4];
  const before: [number, number] = [82, 106.6];
  const inside: [number, number] = [94.8, 102.8];
  return {
    kind: "may-i-enter",
    ms: 12000,
    parts: [
      ...aDay([30, 24], [56, 30]),
      ...palms([[152, 99, 16], [6, 96, 11]], "the land"),
      { name: "the lane to the home", svg: lane([[0, 106], [92, 106]]) },
      { name: "a home, its doorway open", svg: homeWithDoorway(x, foot, w, h, dx, dw, dh) },
      { name: "his place, a golden ring, in the home", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "the place of the one who served in his home", svg: someone(served[0], served[1], 1.5, IN_SERVICE) },
      { name: "his voice, soft and golden: to the one who served in his home", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.343, 0.65]]), loop: speaking },
      { name: "his voice, soft and golden: giving leave", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.886, 0.93]]), loop: speaking },
      {
        name: "the place of the one of Banu Amir: coming to the home, and at last going in",
        svg: someone(amir[0], amir[1], 1.7, BANU_AMIR),
        keys: track({
          xy: [
            [0.02, 0, 0],
            [0.1, n(before[0] - amir[0]), n(before[1] - amir[1])],
            [0.934, n(before[0] - amir[0]), n(before[1] - amir[1])],
            [0.97, n(inside[0] - amir[0]), n(inside[1] - amir[1])]
          ]
        })
      },
      { name: "the voice of the one of Banu Amir: asking to come in", svg: arcs(n(before[0] + 2.6), n(before[1] - 3.4), BANU_AMIR), keys: voice([[0.234, 0.32], [0.67, 0.84]]), loop: speaking },
      {
        name: "a soft golden arch about the doorway, and glints",
        svg: doorwayArch(dx, foot, dw, dh) + glints([[dx, n(foot - dh - 6)], [n(dx - 16), n(foot - dh + 2)], [n(dx + 16), n(foot - dh + 2)]], 1.1),
        keys: showAt(0.965, 0.985),
        loop: soft
      }
    ],
    words: linesOn(NINE, [
      "A man of Banu Amir asked the Prophet for",
      "Permission when he was in the house,",
      "Saying: May I enter?",
      "He said to his servant: Go out and teach",
      "This man how to ask permission:",
      "Say: Peace be upon you. May I enter?",
      "The man heard it and said: Peace be upon",
      "You! May I enter?",
      "He gave permission, and the man entered."
    ])
  };
}

/** Abu Rafi's place and voice: a deep violet. */
const ABU_RAFI = "#6E5E9A";

/** The homes of Quraysh, far off: two small homes, with hills behind them. */
const homesFarOff = () =>
  peaks([[12, 16, 18], [34, 12, 16]], 99, "#C2A374", false) + home(14, 101, 18, 13, "#C99E6A", "#B08658", "#5E422A") + home(33, 102, 16, 11, "#C99E6A", "#B08658", "#5E422A");

// Sent by Quraysh. Abu Rafi' said: Quraysh sent me to the Messenger of Allah ﷺ, and when I saw him, Islam was cast into
// my heart, and I said: O Messenger of Allah, by Allah, I will never go back to them. He said: I do not break a covenant
// or keep envoys; but go back, and if you still feel as you do now, come back. So I went, then came to the Prophet ﷺ and
// became Muslim (Sunan Abi Dawud 2758). The lines leave out "Messenger of Allah, I swear by Allah" in what Abu Rafi'
// said, and what is told after it of who he was. No one is drawn: the homes of Quraysh far off on the left; on the right,
// his home among palms, and his place, a golden ring, by it. Abu Rafi's place comes along the road from the homes of
// Quraysh, and his voice tells of it. Once it is said that Islam was cast into him, a warm light comes about his place,
// and stays with it. His voice, soft and golden, answers. Abu Rafi's place goes back along the road toward the homes of
// Quraysh, the warm light still about it, and comes again; and a spark rises from it.
function sentByQuraysh(): SignArt {
  const rafi: [number, number] = [24, 105.8];
  const his: [number, number] = [122, 105.6];
  const way: [number, number, number][] = [
    [0.03, 0, 0],
    [0.19, 80, 0.2],
    [0.805, 80, 0.2],
    [0.85, 4, 0],
    [0.87, 4, 0],
    [0.935, 80, 0.2]
  ];
  return {
    kind: "sent-by-quraysh",
    ms: 12000,
    parts: [
      ...aDay([136, 24], [72, 28]),
      { name: "the homes of Quraysh, far off on the left", svg: homesFarOff() },
      { name: "the road", svg: road(0, 160, 106.4) },
      { name: "his home", svg: home(140, 100, 24, 17) },
      ...palms([[154, 98, 15], [118, 96, 12]]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden: answering", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.452, 0.8]]), loop: speaking },
      {
        name: "a warm light about Abu Rafi's place: Islam, come into him",
        svg: glow(rafi[0], n(rafi[1] - 1), 7, WARM, 0.12) + `<ellipse cx="${rafi[0]}" cy="${n(rafi[1] + 0.4)}" rx="4.6" ry="2" fill="${WARM}" opacity="0.5"/>`,
        keys: track({
          xy: way,
          opacity: [
            [0.24, 0],
            [0.27, 1]
          ]
        }),
        loop: soft
      },
      { name: "Abu Rafi's place: coming, going back, and coming again", svg: someone(rafi[0], rafi[1], 1.7, ABU_RAFI), keys: track({ xy: way }) },
      {
        name: "Abu Rafi's voice: telling of it",
        svg: arcs(n(rafi[0] + 2.6), n(rafi[1] - 3.4), ABU_RAFI),
        keys: track({
          xy: way,
          opacity: spoken([
            [0.02, 0.43],
            [0.81, 0.98]
          ])
        }),
        loop: speaking
      },
      spark("Abu Rafi's Islam: a spark rising", n(rafi[0] + 80), n(rafi[1] - 4.4), 0.94, 0.99)
    ],
    words: linesOn(NINE, [
      "Abu Rafi': the Quraysh sent me to the",
      "Messenger of Allah, and when I saw him,",
      "Islam was cast into my heart, so I said:",
      "I shall never return to them.",
      "He replied: I do not break a covenant",
      "Or imprison messengers, but return, and",
      "If you feel the same as you do just now,",
      "Come back. So I went away, and then came",
      "To the Prophet and accepted Islam."
    ])
  };
}

/** Abu Hurairah's place and voice: a warm brown. */
const ABU_HURAIRAH = "#8A5A3A";
/** The place and voice of the one who asked: a sea blue. */
const WHO_ASKED = "#2E6E96";

/** The sea, from y 66 down, and the shore along its left. */
const SEA = `<rect y="66" width="160" height="54" fill="#5FA8D3"/><rect y="66" width="160" height="6" fill="#86C0E0"/>`;
const SHORE = `<path d="M0 64 L56 64 Q64 76 56 92 Q48 106 54 120 L0 120 Z" fill="#E2CB9C"/><path d="M56 64 Q64 76 56 92 Q48 106 54 120" stroke="#F4EBD2" stroke-width="1.4" fill="none"/>`;

// A question at sea. Abu Hurairah said: a man asked the Messenger of Allah ﷺ: O Messenger of Allah, we travel on the
// sea and take only a little water with us; if we use it for wudu, we go thirsty. Can we make wudu with sea water? The
// Messenger of Allah ﷺ said: its water is pure, and what dies in it is lawful food (Sunan Abi Dawud 83). The lines end
// with its water being pure: they leave out the last words, on what dies in the sea, which the schools of fiqh read in
// different ways. No one is drawn: on the shore, his place, a golden ring, and the place of the one who asked, whose
// voice asks; Abu Hurairah's voice begins it. As it is said that they travel on the sea, a boat shows out on the sea,
// rocking on its waves; as it is said that they take a little water, a small jar shows on its deck. Once he answers,
// his voice soft and golden, glints and a clear shimmer come over the water of the sea.
function aQuestionAtSea(): SignArt {
  const hurairah: [number, number] = [6, 108.6];
  const his: [number, number] = [20, 104.4];
  const asked: [number, number] = [36, 104.8];
  const rocking = { move: "bob", ms: 2600, y: 0.8, rotate: 2 } as const;
  const deck: [number, number] = [114, 90];
  return {
    kind: "a-question-at-sea",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 66) },
      { name: "the sun", svg: sun(132, 24) },
      { name: "a cloud", svg: cloud(70, 28, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "the sea", svg: SEA },
      { name: "waves of the sea", svg: waves(62, 158, 78, 10, "#D6EEF8") + waves(66, 158, 92, 12, "#D6EEF8") + waves(60, 158, 108, 11, "#D6EEF8"), loop: { move: "swim", ms: 4200, x: 2 } },
      { name: "the shore", svg: SHORE },
      ...palms([[10, 96, 14], [32, 90, 10]], "the shore"),
      {
        name: "a boat on the sea, rocking",
        svg: boat(deck[0], deck[1]),
        origin: { x: deck[0], y: n(deck[1] + 3) },
        keys: showAt(0.31, 0.34),
        loop: rocking
      },
      {
        name: "a small jar of water on its deck",
        svg: jar(n(deck[0] - 9), deck[1], 0.7),
        origin: { x: deck[0], y: n(deck[1] + 3) },
        keys: showAt(0.455, 0.48),
        loop: rocking
      },
      {
        name: "a clear shimmer over the water of the sea",
        svg: `<ellipse cx="108" cy="96" rx="42" ry="12" fill="#FFFFFF" opacity="0.12"/><ellipse cx="100" cy="110" rx="34" ry="6" fill="#FFFFFF" opacity="0.09"/>`,
        keys: showAt(0.9, 0.94),
        loop: soft
      },
      { name: "glints over the water of the sea", svg: glints([[74, 84], [92, 102], [134, 106], [150, 84], [104, 78], [124, 96], [84, 92]], 1.7), keys: showAt(0.92, 0.95), loop: twinkle() },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden: answering", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.888, 0.98]]), loop: speaking },
      { name: "the place of the one who asked", svg: someone(asked[0], asked[1], 1.7, WHO_ASKED) },
      { name: "the voice of the one who asked", svg: arcsLeft(n(asked[0] - 2.6), n(asked[1] - 3.4), WHO_ASKED), keys: voice([[0.164, 0.84]]), loop: speaking },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.7, ABU_HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(hurairah[0] + 2.6), n(hurairah[1] - 3.4), ABU_HURAIRAH), keys: voice([[0.02, 0.146]]), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Abu Hurairah: a man asked the Messenger",
      "Of Allah: Messenger of Allah, we travel",
      "On the sea and take a small quantity of",
      "Water with us. If we use this for",
      "Ablution, we would suffer from thirst.",
      "Can we perform ablution with sea water?",
      "The Messenger replied: Its water is pure."
    ])
  };
}

/** Anas's place and voice: a steel blue (as in stepsArt). */
const ANAS = "#4E6E8E";
/** The place and voice of the one who came with her need: a soft plum. */
const SHE_CAME = "#9A5E7E";

/** A lane going back from the front lane at x, from y `front` up to y `back`, narrowing as it goes. */
const sideLane = (x: number, front: number, back: number) =>
  `<path d="M${n(x - 5)} ${front} L${n(x - 2.4)} ${back} L${n(x + 2.4)} ${back} L${n(x + 5)} ${front} Z" fill="#D3BB8A" opacity="0.75"/>`;

// He sat with her. Anas ibn Malik said: a woman came to the Messenger of Allah ﷺ and said: O Messenger of Allah, I have
// a need with you. He said to her: mother of so and so, sit in the corner of any street you wish, and I shall sit with
// you. So she sat, and the Messenger of Allah ﷺ sat with her until she had met her need (Sunan Abi Dawud 4818). The
// lines leave out the last words, "till she fulfilled her need", which one of those who told it did not tell. No one is
// drawn: homes of Madinah in a row, lanes going back between them from the lane in front. His place, a golden ring, is
// on the lane in front; the place of the one who came with her need comes to it, and her voice asks. His voice, soft
// and golden, answers; once he says "in the corner of any street", soft golden marks show at the corners where the
// lanes meet. Only once it is said that she sat does her place go to a corner; once it is said that he sat with her,
// his place goes there too, and a warm glow comes about them.
function heSatWithHer(): SignArt {
  const anas: [number, number] = [8, 108.6];
  const his: [number, number] = [80, 106.6];
  const came: [number, number] = [152, 106.8];
  const stood: [number, number] = [94, 106.8];
  const corner: [number, number] = [117.6, 104.2];
  const beside: [number, number] = [111.2, 104.6];
  return {
    kind: "he-sat-with-her",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(28, 24) },
      { name: "a cloud", svg: cloud(122, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[24, 116], [70, 118], [140, 117]]) },
      { name: "the lane behind the homes", svg: lane([[0, 83.4], [160, 83.4]]) },
      { name: "lanes going back between the homes", svg: sideLane(50, 104, 84) + sideLane(110, 104, 84) },
      {
        name: "homes of Madinah in a row",
        svg:
          home(16, 100, 20, 17) +
          home(36, 100.4, 16, 15, "#CFA06A", "#B88A58", "#6B4A2E") +
          home(70, 100, 22, 18) +
          home(91, 100.4, 16, 15, "#CFA06A", "#B88A58", "#6B4A2E") +
          home(128, 100, 18, 17, "#CFA06A", "#B88A58", "#6B4A2E") +
          home(147, 100.4, 20, 15)
      },
      { name: "the lane in front", svg: lane([[0, 105.6], [160, 105.6]]) },
      {
        name: "soft golden marks at the corners where the lanes meet",
        svg: care(43, 104.2, 4, 1.3, GOLD) + care(57, 104.2, 4, 1.3, GOLD) + care(103, 104.2, 4, 1.3, GOLD) + care(117, 104.2, 4, 1.3, GOLD),
        keys: showAt(0.52, 0.55),
        loop: soft
      },
      {
        name: "his place, a golden ring: going to sit with her",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({
          xy: [
            [0.88, 0, 0],
            [0.94, n(beside[0] - his[0]), n(beside[1] - his[1])]
          ]
        })
      },
      { name: "his voice, soft and golden: answering", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.39, 0.735]]), loop: speaking },
      {
        name: "the place of the one who came with her need: coming, and sitting at a corner",
        svg: someone(came[0], came[1], 1.7, SHE_CAME),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.12, n(stood[0] - came[0]), 0],
            [0.76, n(stood[0] - came[0]), 0],
            [0.82, n(corner[0] - came[0]), n(corner[1] - came[1])]
          ]
        })
      },
      { name: "her voice: asking", svg: arcsLeft(n(stood[0] - 2.6), n(stood[1] - 3.4), SHE_CAME), keys: voice([[0.15, 0.36]]), loop: speaking },
      { name: "a warm glow about the two at the corner", svg: glow(n((corner[0] + beside[0]) / 2), n(corner[1] - 1), 9, WARM, 0.1), keys: showAt(0.95, 0.98), loop: soft },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.7, ANAS) },
      {
        name: "Anas's voice: telling of it",
        svg: arcs(n(anas[0] + 2.6), n(anas[1] - 3.4), ANAS),
        keys: voice([
          [0.02, 0.135],
          [0.756, 0.98]
        ]),
        loop: speaking
      }
    ],
    words: linesOn(EIGHT, [
      "Anas ibn Malik: a woman came to the",
      "Messenger of Allah and said: Messenger of",
      "Allah, I have some need with you.",
      "He said to her: Mother of so and so, sit",
      "In the corner of any street you wish,",
      "And I shall sit with you.",
      "So she sat, and the Messenger of Allah",
      "Also sat with her."
    ])
  };
}

export const ASKING_ART = {
  "a-middle-voice": aMiddleVoice,
  "may-i-enter": mayIEnter,
  "sent-by-quraysh": sentByQuraysh,
  "a-question-at-sea": aQuestionAtSea,
  "he-sat-with-her": heSatWithHer
};

