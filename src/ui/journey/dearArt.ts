import { animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3 } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, LIGHT, sparkRising, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { nightLand } from "./heedArt";
import { restingCamel, road, saddled, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { DREAM_STARS, nightGreyRing, quickStrokes } from "./seenArt";
import { GREY } from "./lovedArt";

/**
 * What he ﷺ held dear and what he taught by it: a surah dearer to him than all the sun rises on, revealed on a night
 * journey; the milk of his dream, given to Umar: knowledge; Al-Fatihah recited over a stung chief; his cloak snatched by
 * a thorny tree, and the camels he would have shared out; the ring of gold he threw away; the gourd he picked out at a
 * tailor's meal; and the eclipse on the day Ibrahim died. Only the land, the sky, buildings, things, plants and animals
 * are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a face, and no one is drawn on a
 * camel: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice
 * is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a recitation or a prayer is a
 * spark that rises, and what is loved is a warm glow about its place.
 */

/** A dot of light at (x, y). */
const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="0.9" fill="${LIGHT}"/>`;

/** A spark at (x, y), rising from `from` until `to`. */
const spark = (name: string, x: number, y: number, from: number, to: number, rise = 12): SignPart => ({
  name,
  svg: sparkle(x, y, 1.6, "#FFE7A0"),
  keys: sparkRising(from, to, rise),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

// Dearer than all the sun rises on. Aslam said that the Messenger of Allah ﷺ was travelling by night on one of his
// journeys, and Umar ibn al-Khattab was travelling with him. Umar asked him about something, and he did not answer him;
// he asked him again and again, and he did not answer him. Umar said: I moved my camel on and went ahead of the people,
// and I was afraid that Quran would be revealed about me. Soon I heard someone calling me, and I came to him and greeted
// him. He said: tonight a surah has been revealed to me that is dearer to me than all that the sun rises on; then he
// recited: We have given you a clear victory (Sahih al-Bukhari 4833). No one is drawn, and no one on any camel: on a
// road at night his mount goes on, a camel with a saddle cloth, a golden ring about it, his place; beside it Umar's
// mount, a light ring about it, Umar's place; and the folk's camels come behind. Umar's voice asks three times, a dot
// of light for each ask, and no voice answers. Umar's mount goes on fast, quick strokes behind it, far ahead, and a grey
// ring comes about it: afraid. A voice calls from behind, and Umar's mount comes back to his. His voice speaks. Then the
// dawn shows at the edge of the sky, the sun rises over the land and lights it, and a warm glow comes about his place:
// dearer than all the sun rises on. As he recites, sparks rise from his place, and a soft golden light lies on the way
// ahead.
function dearerThanTheWorld(): SignArt {
  const his: [number, number] = [58, 101];
  const umar: [number, number] = [92, 102.5];
  const ahead = 44;
  const back = 0.65;
  const umarGoes: [number, number, number][] = [
    [0.29, 0, 0],
    [0.33, ahead, 0],
    [back, ahead, 0],
    [0.68, 0, 0]
  ];
  const asks = [0.15, 0.18, 0.21];
  return {
    kind: "dearer-than-the-world",
    ms: 12000,
    parts: [
      { name: "the sky at night", svg: nightSky(62) },
      {
        name: "the dawn at the edge of the sky",
        svg: `<rect y="38" width="160" height="24" fill="#4F6196"/><rect y="48" width="160" height="14" fill="#B9928E"/><rect y="55" width="160" height="7" fill="#F0BF8E"/>`,
        keys: track({
          opacity: [
            [0.77, 0],
            [0.81, 0.85]
          ]
        })
      },
      { name: "the moon", svg: `${glow(26, 22, 10, "#FFF6D0", 0.08)}${crescent(26, 22, 5, 2.4, "#FFF3B8")}` },
      {
        name: "stars",
        svg: stars([
          [46, 14],
          [66, 26],
          [88, 13],
          [108, 24],
          [128, 14],
          [150, 26],
          [12, 34]
        ]),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      {
        name: "the sun, rising over the land",
        svg: sun(124, 68),
        keys: track({
          xy: [
            [0.77, 0, 0],
            [0.82, 0, -10]
          ],
          opacity: [
            [0.77, 0],
            [0.78, 1]
          ]
        })
      },
      {
        name: "hills far off",
        svg: peaks(
          [
            [24, 8, 26],
            [72, 6, 22]
          ],
          62,
          "#28304E",
          false
        )
      },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [16, 74],
          [70, 78],
          [112, 72],
          [142, 82],
          [30, 112],
          [128, 112]
        ])
      },
      { name: "the road", svg: road(0, 160, 102, "#454D6C") },
      {
        name: "the land in the sun's light",
        svg: `<rect y="62" width="160" height="58" fill="#FFE7A0"/>`,
        keys: track({
          opacity: [
            [0.79, 0],
            [0.82, 0.14]
          ]
        })
      },
      { name: "camels of the folk, behind", svg: saddled(12, 100, 0.2) + saddled(32, 99.4, 0.2), loop: { move: "bob", ms: 2000, y: -0.3 } },
      { name: "a golden ring about his mount: his place, riding", svg: ring(his[0], his[1] + 1.6, 9.6, GOLD) },
      { name: "his mount, a camel with a saddle cloth", svg: saddled(his[0], his[1], 0.27), loop: { move: "bob", ms: 1800, y: -0.3 } },
      {
        name: "a light ring about Umar's mount: Umar's place, riding",
        svg: ring(umar[0], umar[1] + 1.4, 8.6, LIGHT),
        keys: track({
          xy: umarGoes,
          opacity: [
            [0.04, 0],
            [0.06, 1]
          ]
        })
      },
      {
        name: "Umar's mount, going on ahead",
        svg: saddled(umar[0], umar[1], 0.25),
        keys: track({
          xy: [
            [0.29, 0, 0],
            [0.33, ahead, 0]
          ],
          opacity: [
            [0.645, 1],
            [back, 0]
          ]
        }),
        loop: { move: "bob", ms: 1900, y: -0.3 }
      },
      {
        name: "Umar's mount, coming back",
        svg: saddled(umar[0], umar[1], 0.25, true),
        keys: track({
          xy: [
            [back, ahead, 0],
            [0.68, 0, 0]
          ],
          opacity: [
            [0.645, 0],
            [back, 1]
          ]
        }),
        loop: { move: "bob", ms: 1900, y: -0.3 }
      },
      {
        name: "going on fast: quick strokes behind Umar's mount",
        svg: quickStrokes(umar[0] - 14, 94),
        keys: track({
          xy: [
            [0.29, 0, 0],
            [0.33, ahead, 0]
          ],
          opacity: [
            [0.29, 0],
            [0.295, 1],
            [0.33, 1],
            [0.335, 0]
          ]
        })
      },
      {
        name: "coming back fast: quick strokes behind it",
        svg: quickStrokes(umar[0] + 14, 94, true),
        keys: track({
          xy: [
            [back, ahead, 0],
            [0.68, 0, 0]
          ],
          opacity: [
            [back, 0],
            [0.655, 1],
            [0.675, 1],
            [0.68, 0]
          ]
        })
      },
      {
        name: "Umar's voice, asking three times",
        svg: arcsLeft(78, 89, LIGHT),
        keys: { at: [0, 0.145, 0.15, 0.165, 0.17, 0.175, 0.18, 0.195, 0.2, 0.205, 0.21, 0.22, 0.225], opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0] },
        loop: speaking
      },
      ...asks.map((t, i): SignPart => ({ name: `three times: a dot of light for each ask ${i + 1}`, svg: dot(umar[0] - 4 + i * 4, 80), keys: showFor(t, at3(t + 0.005), 0.28, 0.29) })),
      { name: "afraid: a grey ring about Umar's place", svg: nightGreyRing(umar[0] + ahead, umar[1] + 1.4, 11, 5), keys: showFor(0.41, 0.44, 0.64, 0.645) },
      { name: "someone calling: a voice from behind", svg: arcs(112, 91, LIGHT), keys: showFor(0.525, 0.53, 0.64, 0.645), loop: speaking },
      { name: "his voice: a surah revealed to him tonight", svg: arcs(71.6, 84, "#FFE7A0"), keys: showAt(0.685, 0.695), loop: speaking },
      { name: "dearer to him: a warm glow about his place", svg: wash(his[0], 95, 20, 10, WARM, 0.18), keys: showAt(0.79, 0.82), loop: soft },
      spark("his recitation: a spark rising 1", 52, 84, 0.89, 0.95, 14),
      spark("his recitation: a spark rising 2", 58, 82, 0.9, 0.955, 14),
      spark("his recitation: a spark rising 3", 64, 84, 0.91, 0.96, 14),
      { name: "a clear victory: a soft golden light on the way ahead", svg: wash(128, 102, 32, 4.4, WARM, 0.2), keys: showAt(0.9, 0.93), loop: soft }
    ],
    words: [
      { text: "On a journey by night, Umar with him", from: 0.02, to: 0.125 },
      { text: "Umar asked three times, with no answer", from: 0.14, to: 0.265 },
      { text: "Umar said: I moved my camel on ahead", from: 0.28, to: 0.385 },
      { text: "Afraid Quran would be revealed about me", from: 0.4, to: 0.505 },
      { text: "Soon I heard someone calling me", from: 0.52, to: 0.625 },
      { text: "He said: A surah revealed to me tonight", from: 0.64, to: 0.745 },
      { text: "Dearer to me than all the sun rises on", from: 0.76, to: 0.865 },
      { text: "We have given you a clear victory", from: 0.88, to: 1 }
    ]
  };
}

/** The inside of a wooden cup whose rim's middle is at (x, y). */
const cupInside = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="2.5" fill="#5E3A1E"/>`;

/** Milk filling a cup whose rim's middle is at (x, y). */
const cupMilk = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y + 0.3)}" rx="5.8" ry="2" fill="#FBF7EC"/>`;

/** The front of a wooden cup whose rim's middle is at (x, y). */
const cupFront = (x: number, y: number) =>
  `<path d="M${n(x - 6.4)} ${y} A6.4 2.5 0 0 0 ${n(x + 6.4)} ${y} L${n(x + 5)} ${n(y + 6.2)} Q${x} ${n(y + 8.2)} ${n(x - 5)} ${n(y + 6.2)} Z" fill="#B5713F"/>` +
  `<path d="M${n(x - 6.4)} ${y} A6.4 2.5 0 0 0 ${n(x + 6.4)} ${y}" stroke="#D9A066" stroke-width="0.6" fill="none"/>`;

// The milk of knowledge. Ibn Umar said: I heard the Messenger of Allah ﷺ say: while I was sleeping, I was brought a cup
// of milk, and I drank until I saw its wetness coming out of my nails. Then I gave what was left to Umar ibn al-Khattab.
// They said: how did you interpret it, O Messenger of Allah? He said: knowledge (Sahih al-Bukhari 82). No one is drawn:
// in the night of a dream, his place is a golden ring. A wooden cup full of milk comes to it; the milk in it goes down,
// and white glints and a soft white glow come about his place. Umar's place shows, and the cup goes to it with what is
// left. Places come, and their voices ask. His voice speaks: a golden glow comes about the cup, sparks rise from it, and
// a soft golden ring comes about Umar's place.
function milkOfKnowledge(): SignArt {
  const his: [number, number] = [52, 101];
  const cup: [number, number] = [64, 94.6];
  const toUmar = 44;
  const umar: [number, number] = [96, 102];
  const cupGoes: [number, number, number][] = [
    [0.04, 88, 0],
    [0.12, 0, 0],
    [0.45, 0, 0],
    [0.52, toUmar, 0]
  ];
  const shown: [number, number][] = [
    [0.03, 0],
    [0.04, 1]
  ];
  const asked: [number, number][] = [
    [128, 97],
    [138, 100.6],
    [148, 97]
  ];
  return {
    kind: "milk-of-knowledge",
    ms: 9000,
    parts: [
      { name: "sky of the dream", svg: sky("#4F4A8C", "#7D77BE", 62) },
      { name: "stars of the dream", svg: stars(DREAM_STARS), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
      { name: "the land of the dream", svg: `<rect y="61" width="160" height="59" fill="#8A7EA8"/><path d="M0 61 L160 61" stroke="#9C90B8" stroke-width="0.7"/>` },
      { name: "a dream: a soft haze", svg: wash(80, 64, 96, 64, "#FFFFFF", 0.025), loop: { move: "twinkle", ms: 2600, low: 0.6 } },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the inside of the cup", svg: cupInside(...cup), keys: track({ xy: cupGoes, opacity: shown }) },
      {
        name: "the milk in the cup",
        svg: cupMilk(...cup),
        origin: { x: cup[0], y: n(cup[1] + 0.3) },
        keys: track({
          xy: [
            [0.04, 88, 0],
            [0.12, 0, 0],
            [0.24, 0, 0],
            [0.32, 0, 1.3],
            [0.45, 0, 1.3],
            [0.52, toUmar, 1.3]
          ],
          scale: [
            [0.24, 1],
            [0.32, 0.72]
          ],
          opacity: shown
        })
      },
      { name: "a cup of milk, brought", svg: cupFront(...cup), keys: track({ xy: cupGoes, opacity: shown }) },
      {
        name: "drunk to his fill: its wetness, white glints about his place",
        svg: sparkle(45, 96, 1.1, "#FFFFFF") + sparkle(56.4, 93.6, 0.9, "#FFFFFF") + sparkle(50.6, 92.4, 1, "#FFFFFF"),
        keys: showFor(0.3, 0.33, 0.42, 0.45),
        loop: { move: "twinkle", ms: 900, low: 0.4 }
      },
      { name: "drunk to his fill: a soft white glow about his place", svg: wash(his[0], 99, 10, 6, "#FFFFFF", 0.12), keys: showFor(0.3, 0.33, 0.42, 0.45), loop: soft },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.5, LIGHT), keys: showAt(0.42, 0.44) },
      { name: "the places of those who asked", svg: asked.map(([x, y]) => someone(x, y, 1.5, LIGHT)).join(""), keys: showAt(0.62, 0.64) },
      { name: "their voices, asking", svg: arcsLeft(123, 95, LIGHT), keys: showFor(0.63, 0.64, 0.82, 0.83), loop: speaking },
      { name: "his voice: knowledge", svg: arcs(55.6, 96, "#FFE7A0"), keys: showAt(0.83, 0.84), loop: speaking },
      { name: "knowledge: a golden glow about the cup", svg: glow(cup[0] + toUmar, 96, 10, "#FFE7A0", 0.12), keys: showAt(0.85, 0.88), loop: soft },
      { name: "knowledge: a soft golden ring about Umar's place", svg: care(umar[0], umar[1], 4.4, 2.2, SOFT_GOLD), keys: showAt(0.85, 0.88), loop: soft },
      spark("knowledge: a spark rising from the cup 1", cup[0] + toUmar - 2, 92, 0.86, 0.93),
      spark("knowledge: a spark rising from the cup 2", cup[0] + toUmar + 2.4, 91, 0.88, 0.95)
    ],
    words: [
      { text: "While I slept, I was brought a cup of milk", from: 0.02, to: 0.2 },
      { text: "I drank till I saw it come out of my nails", from: 0.22, to: 0.4 },
      { text: "Then I gave what was left to Umar", from: 0.42, to: 0.6 },
      { text: "They asked: how did you interpret it?", from: 0.62, to: 0.8 },
      { text: "He said: knowledge", from: 0.82, to: 1 }
    ]
  };
}

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s = 0.13, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);

/** A cord tied in a loop about (x, y), with its knot: a tether. */
const tether = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="1.8" stroke="#8C7B63" stroke-width="0.7" fill="none"/><circle cx="${n(x + 3.4)}" cy="${y}" r="0.8" fill="#8C7B63"/>`;

// Al-Fatihah as a cure. Abu Sa'id said: some of the companions of the Prophet ﷺ set out on a journey and stopped by a
// tribe of the Arabs, and asked them to host them, but they would not. Then the chief of that tribe was stung, and they
// tried everything for him, and nothing helped him. They came to them: does any of you have anything? One of them said:
// by Allah, we asked you to host us and you did not, so I will not recite for you until you set us a reward. They agreed
// on a flock of sheep, and he went, blowing over him and reciting: All praise is for Allah, Lord of the worlds; and it
// was as if he had been freed from a tether, and he got up and walked. Then they came to the Messenger of Allah ﷺ and
// told him, and he said: and how did you know that it is a ruqyah? You did right; share it out, and give me a share
// with you (Sahih al-Bukhari 2276). No one is drawn: the tents of the tribe stand on the left, and the travellers'
// places and their kneeling camels on the right. A dashed way and a voice go to the tents, and a grey ring and a grey
// voice come there: they would not host them. A grey ring comes about the chief's place, and two of the tribe go to it,
// with grey voices; then they go to the travellers, and voices speak there. A flock of sheep shows, with a soft ring:
// agreed on. The reciter's place goes to the chief's, his voice speaks over it, and small sparkles show; a tied cord
// shows about the chief's place and opens and goes, the grey ring goes, and the chief's place walks, a soft light about
// it. Then a haze comes over all of it, and in Madinah his place shows, a golden ring, with the travellers' places and
// the flock. His voice speaks; the flock is shared out, and one sheep goes beside his place, a soft golden ring about it.
function fatihahCure(): SignArt {
  const chief: [number, number] = [28, 98];
  const two: [number, number][] = [
    [40, 100],
    [46, 97]
  ];
  const reciter: [number, number] = [112, 100];
  const recited: [number, number] = [40, 102];
  const travellers: [number, number][] = [
    [120, 103],
    [126, 99]
  ];
  const flock: [number, number][] = [
    [56, 108],
    [67, 107],
    [78, 108]
  ];
  const his: [number, number] = [70, 103];
  const given: [number, number][] = [
    [118, 108],
    [128, 107],
    [138, 108],
    [148, 107]
  ];
  const shared: [number, number][] = [
    [60, 108],
    [112, 108],
    [128, 107],
    [148, 107]
  ];
  const walked: [number, number, number][] = [
    [0.67, 0, 0],
    [0.7, 6, 2]
  ];
  return {
    kind: "fatihah-cure",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "clouds", svg: cloud(52, 26, 0.55, "#FFFFFF", 0.9) + cloud(98, 18, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "tents of the tribe", svg: tent(16, 92, 16, 11) + tent(34, 89, 14, 10) + tent(50, 92, 12, 9) },
      { name: "the travellers' camels, kneeling at their stop", svg: restingCamel(144, 99, 0.65) + restingCamel(150, 107, 0.5) },
      { name: "folk of the tribe", svg: someone(10, 99, 1.6) + someone(19, 103.4, 1.6) },
      { name: "the chief's place, by the tents", svg: someone(chief[0], chief[1], 1.8), keys: track({ xy: walked }) },
      {
        name: "two of the tribe",
        svg: two.map(([x, y]) => someone(x, y, 1.6)).join(""),
        keys: track({
          xy: [
            [0.16, 0, 0],
            [0.19, -3, 0],
            [0.28, -3, 0],
            [0.305, 52, 0]
          ]
        })
      },
      { name: "the travellers' places", svg: travellers.map(([x, y]) => someone(x, y, 1.6)).join("") },
      {
        name: "the reciter's place",
        svg: someone(reciter[0], reciter[1], 1.6),
        keys: track({
          xy: [
            [0.525, 0, 0],
            [0.56, recited[0] - reciter[0], recited[1] - reciter[1]]
          ]
        })
      },
      { name: "asking to be hosted: a dashed way to the tents", svg: way("M106 99 Q82 93 58 96", VOICE, 0.9), keys: showFor(0.03, 0.05, 0.14, 0.16) },
      { name: "asking to be hosted: the travellers' voice", svg: arcsLeft(108, 94, VOICE), keys: showFor(0.04, 0.05, 0.14, 0.15), loop: speaking },
      { name: "they would not host them: a grey ring about the tents", svg: greyRing(33, 93, 24, 8), keys: showFor(0.06, 0.08, 0.14, 0.16) },
      { name: "they would not: a grey voice from the tents", svg: arcs(58, 88, GREY), keys: showFor(0.065, 0.075, 0.14, 0.15), loop: speaking },
      { name: "stung: a grey ring about the chief's place", svg: greyRing(chief[0], chief[1], 4.4, 2.4), keys: showFor(0.15, 0.17, 0.66, 0.68) },
      { name: "nothing helped: grey voices about the chief", svg: arcsLeft(35, 92.6, GREY), keys: showFor(0.195, 0.2, 0.28, 0.29), loop: speaking },
      { name: "have you anything: a voice of the tribe", svg: arcs(100.6, 95, VOICE), keys: showFor(0.305, 0.31, 0.32, 0.325), loop: speaking },
      { name: "not till you set a reward: the reciter's voice", svg: arcsLeft(109.6, 95.4, VOICE), keys: showFor(0.325, 0.33, 0.4, 0.41), loop: speaking },
      ...flock.map(([x, y], i): SignPart => ({ name: `agreed on: a sheep of the flock ${i + 1}`, svg: sheepAt(x, y, 0.13, i % 2 === 1), keys: showAt(0.41, 0.44) })),
      { name: "agreed on: a soft ring about the flock", svg: care(67, 105.2, 17, 3.6, SOFT_GOLD), keys: showAt(0.42, 0.45), loop: soft },
      { name: "reciting Al-Fatihah over the chief: the reciter's voice", svg: arcsLeft(recited[0] - 2.4, 98.4, VOICE), keys: showFor(0.565, 0.57, 0.64, 0.65), loop: speaking },
      {
        name: "blowing over him: small soft sparkles",
        svg: sparkle(31.4, 94.4, 0.9, "#E8A93A") + sparkle(25, 95.4, 0.8, "#E8A93A") + sparkle(28.4, 92.8, 0.7, "#E8A93A"),
        keys: showFor(0.57, 0.58, 0.64, 0.66),
        loop: { move: "twinkle", ms: 900, low: 0.4 }
      },
      {
        name: "as if freed from a tether: a cord about the chief's place",
        svg: tether(chief[0], chief[1]),
        origin: { x: chief[0], y: chief[1] },
        keys: track({
          scale: [
            [0.66, 1],
            [0.69, 1.7]
          ],
          opacity: [
            [0.645, 0],
            [0.65, 1],
            [0.66, 1],
            [0.69, 0]
          ]
        })
      },
      {
        name: "freed: a soft light about the chief's place",
        svg: wash(chief[0], chief[1] - 1, 7, 4, WARM, 0.2),
        keys: track({
          xy: walked,
          opacity: [
            [0.68, 0],
            [0.7, 1]
          ]
        }),
        loop: soft
      },
      {
        name: "back in Madinah: the camp fades",
        svg: sky("#BFE3FA", "#DDF1FC", 62) + sun(132, 20) + hills() + land(),
        keys: track({
          opacity: [
            [0.76, 0],
            [0.79, 1]
          ]
        })
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(12, 99, 0.6), keys: showAt(0.77, 0.79) },
      { name: "in Madinah: a golden ring, his place", svg: ring(his[0], his[1], 2.8, GOLD), keys: showAt(0.77, 0.79) },
      {
        name: "in Madinah: the travellers' places, come to him",
        svg: [
          [84, 101],
          [92, 104],
          [100, 101]
        ]
          .map(([x, y]) => someone(x, y, 1.6))
          .join(""),
        keys: showAt(0.77, 0.79)
      },
      ...given.map(
        ([x, y], i): SignPart => ({
          name: `the flock they were given: a sheep ${i + 1}`,
          svg: sheepAt(x, y, 0.13, true),
          keys: track({
            xy: [
              [0.89, 0, 0],
              [0.93, shared[i][0] - x, shared[i][1] - y]
            ],
            opacity: [
              [0.77, 0],
              [0.79, 1]
            ]
          })
        })
      ),
      { name: "his voice: how did you know", svg: arcs(73.6, 98.6, GOLD), keys: showFor(0.79, 0.8, 0.88, 0.89), loop: speaking },
      { name: "his voice: you did right", svg: arcs(73.6, 98.6, GOLD), keys: showAt(0.89, 0.9), loop: speaking },
      { name: "a share for him: a soft golden ring about the sheep beside his place", svg: care(60, 106.4, 8.4, 2.6, SOFT_GOLD), keys: showAt(0.93, 0.95), loop: soft }
    ],
    words: [
      { text: "A tribe refused to host them as guests", from: 0.02, to: 0.125 },
      { text: "Its chief was stung; nothing helped him", from: 0.14, to: 0.265 },
      { text: "One of them: not till you set us a reward", from: 0.28, to: 0.385 },
      { text: "They agreed on a flock of sheep", from: 0.4, to: 0.505 },
      { text: "One of them blew and recited Al-Fatihah", from: 0.52, to: 0.625 },
      { text: "The chief walked as if freed from a tether", from: 0.64, to: 0.745 },
      { text: "How did you know it is a ruqyah?", from: 0.76, to: 0.865 },
      { text: "You did right; give me a share with you", from: 0.88, to: 1 }
    ]
  };
}

/** A thorny samurah tree, its trunk's foot at (x, y), `s` times its size: a flat crown on a forked trunk, thorns under it. */
export const thornyTree = (x: number, y: number, s = 1) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  const thorns = [-9, -6, -3, 0, 3, 6, 9]
    .map((dx, i) => {
      const dy = -14.2 + (i % 2) * 0.6;
      return `<path d="M${p(dx, dy)} L${p(dx + 0.5, dy + 1.6)}" stroke="#4E3A24" stroke-width="${n(0.45 * s)}" stroke-linecap="round"/>`;
    })
    .join("");
  return (
    `<path d="M${p(0, 0)} Q${p(-0.8, -5)} ${p(0.6, -9)} M${p(0.6, -9)} L${p(-6, -14)} M${p(0.6, -9)} L${p(7, -14.2)} M${p(0.4, -9)} L${p(0.8, -15)}" stroke="#6E5034" stroke-width="${n(1.2 * s)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${p(-12, -14.6)} Q${p(-11, -19)} ${p(-5, -18.6)} Q${p(0, -21)} ${p(5, -18.8)} Q${p(11.6, -19.4)} ${p(12.4, -14.8)} Q${p(0, -13.2)} ${p(-12, -14.6)} Z" fill="#6F8F45"/>` +
    `<path d="M${p(-11.6, -15)} Q${p(0, -13.8)} ${p(12, -15.2)}" stroke="#56703A" stroke-width="${n(0.8 * s)}" fill="none"/>` +
    thorns
  );
};

/** A cloak caught on thorns, hanging from (x, y). */
const cloak = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${y} Q${x} ${n(y - 1.2)} ${n(x + 5)} ${y} L${n(x + 4.2)} ${n(y + 7.4)} Q${x} ${n(y + 8.6)} ${n(x - 4.2)} ${n(y + 7.4)} Z" fill="#E8DCC0"/>` +
  `<path d="M${n(x - 1.8)} ${n(y + 0.6)} L${n(x - 2.4)} ${n(y + 7.6)} M${n(x + 1.6)} ${n(y + 0.6)} L${n(x + 2)} ${n(y + 7.8)}" stroke="#C9B994" stroke-width="0.5"/>` +
  `<path d="M${n(x - 4.6)} ${n(y + 6.4)} Q${x} ${n(y + 7.6)} ${n(x + 4.6)} ${n(y + 6.4)}" stroke="#B8946A" stroke-width="0.6" fill="none"/>`;

// His cloak on the thorny tree. Jubair ibn Mut'im said that while he was travelling with the Messenger of Allah ﷺ, with
// the people, on his way back from Hunayn, the people clung to him, asking him, until they pressed him to a samurah
// tree, which snatched his cloak. The Prophet ﷺ stopped and said: give me my cloak. If I had camels as many as these
// thorny trees, I would share them out among you, and then you would not find me a miser, a liar or a coward (Sahih
// al-Bukhari 2821). No one is drawn: thorny trees stand about the land, and a dashed way comes from the right. His
// place, a golden ring, comes along it with the folk's places about it. The folk's places close in about him, and
// their voices ask; then his place goes back to a thorny tree with them pressing about it, and a cloak goes from his
// place up into the tree and hangs on its thorns. His voice speaks. Soft rings come about the thorny trees, and faint
// camels show by them, one for each tree; the camels come over to the folk. Then three sparks rise from his place, and a
// warm glow comes about it.
function cloakOnTheThorns(): SignArt {
  const start: [number, number] = [124, 102];
  const met = 86;
  const pressed = 40;
  const trees: [number, number, number][] = [
    [30, 101, 1.15],
    [66, 87, 0.6],
    [96, 84, 0.55],
    [124, 86, 0.6],
    [150, 91, 0.75]
  ];
  const camelsAt: [number, number][] = [
    [12, 104],
    [77, 89],
    [107, 86],
    [135, 88],
    [146, 104]
  ];
  const sharedTo: [number, number][] = [
    [66, 107],
    [82, 108],
    [98, 107],
    [114, 108],
    [130, 107]
  ];
  // Where each of the folk is about his place: loosely on the way, then close about him.
  const loose: [number, number][] = [
    [12, -4],
    [16, 3],
    [24, -1],
    [-10, -3],
    [20, -6]
  ];
  const close: [number, number][] = [
    [6, -4],
    [8, 3],
    [13, -1],
    [3, 5],
    [12, -6]
  ];
  const hisMoves: [number, number, number][] = [
    [0.03, 0, 0],
    [0.08, met - start[0], 0],
    [0.29, met - start[0], 0],
    [0.33, pressed - start[0], 0]
  ];
  return {
    kind: "cloak-on-the-thorns",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "clouds", svg: cloud(60, 26, 0.55, "#FFFFFF", 0.9) + cloud(104, 20, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills("#C2A87E") },
      { name: "the land", svg: land() },
      { name: "the way back from Hunayn", svg: way(`M160 ${start[1] + 1} Q118 ${start[1] - 3} 48 ${start[1] + 1}`, "#C9AE80", 1) },
      ...trees.map(([x, y, s], i): SignPart => ({ name: `a thorny tree ${i + 1}`, svg: thornyTree(x, y, s), origin: { x, y }, loop: { move: "sway", ms: 5600 + i * 500, angle: 0.8, phase: i / 6 } })),
      {
        name: "his cloak, snatched by the thorny tree",
        svg: cloak(22, 86.4),
        origin: { x: 22, y: 90 },
        keys: track({
          xy: [
            [0.415, 18, 12],
            [0.45, 0, 0]
          ],
          rotate: [
            [0.415, 10],
            [0.45, -6]
          ],
          opacity: [
            [0.41, 0],
            [0.415, 1]
          ]
        })
      },
      ...trees.map(([x, y, s], i): SignPart => ({ name: `these thorny trees: a soft ring about tree ${i + 1}`, svg: care(x, n(y + 0.6), n(6 * s), n(1.8 * s), SOFT_GOLD), keys: showFor(0.65, 0.67, 0.76, 0.78) })),
      ...camelsAt.map(
        ([x, y], i): SignPart => ({
          name: `camels as many as the trees, if he had them ${i + 1}`,
          svg: camel(x, y, 0.15),
          keys: track({
            xy: [
              [0.77, 0, 0],
              [0.82, sharedTo[i][0] - x, sharedTo[i][1] - y]
            ],
            opacity: [
              [0.68, 0],
              [0.7, 0.6]
            ]
          })
        })
      ),
      { name: "a golden ring, his place", svg: ring(start[0], start[1], 2.8, GOLD), keys: track({ xy: hisMoves }) },
      ...loose.map(
        ([dx, dy], i): SignPart => ({
          name: `the folk's places ${i + 1}`,
          svg: someone(start[0] + dx, start[1] + dy, 1.5),
          keys: track({
            xy: [
              [0.03, 0, 0],
              [0.08, met - start[0], 0],
              [0.15, met - start[0], 0],
              [0.19, met - start[0] + close[i][0] - dx, close[i][1] - dy],
              [0.29, met - start[0] + close[i][0] - dx, close[i][1] - dy],
              [0.33, pressed - start[0] + close[i][0] - dx, close[i][1] - dy]
            ]
          })
        })
      ),
      { name: "the folk asking: voices about him", svg: arcsLeft(met + 12, start[1] - 9, VOICE) + arcsLeft(met + 20, start[1] - 4, VOICE), keys: showFor(0.195, 0.2, 0.28, 0.29), loop: speaking },
      { name: "pressing about him: a grey ring", svg: greyRing(pressed + 6, start[1] - 0.6, 11, 6), keys: showFor(0.32, 0.34, 0.52, 0.55) },
      { name: "his voice: give me my cloak", svg: arcs(pressed + 3.6, start[1] - 4.6, GOLD), keys: showFor(0.53, 0.54, 0.64, 0.65), loop: speaking },
      { name: "never a miser, a liar or a coward: a warm glow about his place", svg: wash(pressed, start[1] - 2, 12, 6, WARM, 0.2), keys: showAt(0.9, 0.93), loop: soft },
      spark("never a miser: a spark rising", pressed - 4, start[1] - 6, 0.89, 0.95, 14),
      spark("never a liar: a spark rising", pressed, start[1] - 8, 0.9, 0.955, 14),
      spark("never a coward: a spark rising", pressed + 4, start[1] - 6, 0.91, 0.96, 14)
    ],
    words: [
      { text: "Coming back from Hunayn, with the people", from: 0.02, to: 0.125 },
      { text: "The bedouins clung to him, asking him", from: 0.14, to: 0.265 },
      { text: "Till they pressed him to a thorny tree", from: 0.28, to: 0.385 },
      { text: "And it snatched his cloak away", from: 0.4, to: 0.505 },
      { text: "He stopped and said: give me my cloak", from: 0.52, to: 0.625 },
      { text: "Had I camels as many as these thorny trees", from: 0.64, to: 0.745 },
      { text: "I would share them out among you", from: 0.76, to: 0.865 },
      { text: "You'd find me no miser, liar or coward", from: 0.88, to: 1 }
    ]
  };
}

/** A ring of gold, a little turned, its middle at (x, y), `r` across, with a glint on its band. */
const goldRing = (x: number, y: number, r = 2.4) =>
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.86)}" stroke="#D9A520" stroke-width="${n(r * 0.42)}" fill="none"/>` +
  `<path d="M${n(x - r * 0.8)} ${n(y - r * 0.5)} Q${n(x - r * 0.5)} ${n(y - r * 0.86)} ${x} ${n(y - r * 0.86)}" stroke="#FFF0B0" stroke-width="${n(r * 0.16)}" fill="none" stroke-linecap="round"/>`;

// They threw their rings away. Ibn Umar said: the Prophet ﷺ took a ring of gold, and the people took rings of gold. Then
// the Prophet ﷺ said: I took a ring of gold. And he threw it away, and said: I will never wear it. And the people threw
// their rings away (Sahih al-Bukhari 7298). No one is drawn, and no hand: by the masjid in Madinah, his place is a
// golden ring on the ground, and the folk's places are about it. A ring of gold shows over his place, with a glint;
// then small rings of gold show over the folk's places, one after another. His voice speaks; his ring of gold is thrown
// away, up and off, and is gone. Then the folk's rings are thrown away, one after another, and are gone.
function ringsThrownAway(): SignArt {
  const his: [number, number] = [80, 102];
  const folk: [number, number][] = [
    [56, 104],
    [64, 99],
    [96, 99],
    [104, 104],
    [70, 106],
    [90, 106]
  ];
  return {
    kind: "rings-thrown-away",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "clouds", svg: cloud(64, 26, 0.55, "#FFFFFF", 0.9) + cloud(108, 20, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(8, 97, 0.6) },
      { name: "a palm of Madinah 1", svg: palm(46, 96, 18), origin: { x: 46, y: 96 }, loop: { move: "sway", ms: 5200, angle: 1.4 } },
      { name: "a palm of Madinah 2", svg: palm(145, 95, 20), origin: { x: 145, y: 95 }, loop: { move: "sway", ms: 5800, angle: 1.4, phase: 0.5 } },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.8, GOLD) },
      { name: "the folk's places", svg: folk.map(([x, y]) => someone(x, y, 1.5)).join("") },
      {
        name: "a ring of gold, his",
        svg: goldRing(his[0], 91, 2.6),
        keys: track({
          xy: [
            [0.63, 0, 0],
            [0.65, -12, -8],
            [0.67, -24, -11],
            [0.69, -34, -9]
          ],
          opacity: [
            [0.04, 0],
            [0.07, 1],
            [0.67, 1],
            [0.69, 0]
          ]
        })
      },
      {
        name: "a ring of gold, his: a glint on it",
        svg: sparkle(n(his[0] + 2.4), 88.4, 0.9, "#FFFFFF"),
        keys: showFor(0.07, 0.09, 0.62, 0.63),
        loop: { move: "twinkle", ms: 1200, low: 0.3 }
      },
      ...folk.map(([x, y], i): SignPart => {
        const shown = at3(0.23 + i * 0.02);
        const thrown = at3(0.83 + i * 0.01);
        const away = x < his[0] ? -1 : 1;
        return {
          name: `rings of gold, the folk's ${i + 1}`,
          svg: goldRing(x, y - 8.6, 1.6),
          keys: track({
            xy: [
              [thrown, 0, 0],
              [at3(thrown + 0.02), away * 9, -6],
              [at3(thrown + 0.04), away * 18, -5]
            ],
            opacity: [
              [shown, 0],
              [at3(shown + 0.01), 1],
              [at3(thrown + 0.02), 1],
              [at3(thrown + 0.04), 0]
            ]
          })
        };
      }),
      { name: "his voice: I took a ring of gold; I will never wear it", svg: arcs(84, 97, GOLD), keys: showFor(0.43, 0.44, 0.82, 0.83), loop: speaking }
    ],
    words: [
      { text: "He took a ring of gold", from: 0.02, to: 0.2 },
      { text: "And the people took gold rings too", from: 0.22, to: 0.4 },
      { text: "He said: I took a ring of gold", from: 0.42, to: 0.6 },
      { text: "He threw it away: I will never wear it", from: 0.62, to: 0.8 },
      { text: "And the people threw their rings away", from: 0.82, to: 1 }
    ]
  };
}

/** A wide wooden dish whose rim's middle is at (x, y), with broth in it. */
const dish = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="8" ry="2.4" fill="#5E3A1E"/><ellipse cx="${x}" cy="${n(y + 0.2)}" rx="7.2" ry="1.9" fill="#C98B4E"/>` +
  `<path d="M${n(x - 8)} ${y} A8 2.4 0 0 0 ${n(x + 8)} ${y} L${n(x + 6.4)} ${n(y + 4)} Q${x} ${n(y + 5.4)} ${n(x - 6.4)} ${n(y + 4)} Z" fill="#9A6234"/>` +
  `<path d="M${n(x - 8)} ${y} A8 2.4 0 0 0 ${n(x + 8)} ${y}" stroke="#C48A52" stroke-width="0.5" fill="none"/>`;

/** A flat loaf of barley bread, its middle at (x, y). */
const loaf = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.3" fill="#C9A26A" stroke="#A9824A" stroke-width="0.3"/>` +
  `<circle cx="${n(x - 1)}" cy="${n(y - 0.2)}" r="0.3" fill="#9A7440"/><circle cx="${n(x + 0.9)}" cy="${n(y + 0.2)}" r="0.3" fill="#9A7440"/>`;

/** A piece of gourd, its middle at (x, y). */
const gourdPiece = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.1" ry="0.65" fill="#7FA650"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.2)}" rx="0.4" ry="0.2" fill="#B5D488"/>`;

/** A whole gourd lying on its side, its middle at (x, y). */
const gourd = (x: number, y: number) =>
  `<path d="M${n(x - 4.6)} ${y} Q${n(x - 4.6)} ${n(y - 2.8)} ${n(x - 1.6)} ${n(y - 2.6)} Q${n(x + 0.6)} ${n(y - 2.4)} ${n(x + 1.6)} ${n(y - 1.4)} Q${n(x + 3)} ${n(y - 1.6)} ${n(x + 4.4)} ${n(y - 1)} Q${n(x + 5)} ${y} ${n(x + 4.4)} ${n(y + 0.8)} Q${n(x + 2.8)} ${n(y + 1.4)} ${n(x + 1.4)} ${n(y + 1.2)} Q${n(x - 1.2)} ${n(y + 2.8)} ${n(x - 3.4)} ${n(y + 2)} Q${n(x - 4.6)} ${n(y + 1.4)} ${n(x - 4.6)} ${y} Z" fill="#8DB04E"/>` +
  `<path d="M${n(x + 4.6)} ${n(y - 0.4)} L${n(x + 5.8)} ${n(y - 1)}" stroke="#6E5034" stroke-width="0.5" stroke-linecap="round"/><ellipse cx="${n(x - 2.4)}" cy="${n(y - 1.2)}" rx="1.1" ry="0.5" fill="#B5D488"/>`;

/** Cloth a tailor sews: a rail by his door with cloths over it, and two rolls of cloth leaning by it. */
const tailorsCloth = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 12)} L${n(x + 14)} ${n(y - 12)}" stroke="#7A5A3A" stroke-width="0.7"/>` +
  `<rect x="${n(x + 1)}" y="${n(y - 12)}" width="3.4" height="6" fill="#C25B4A"/><rect x="${n(x + 5.4)}" y="${n(y - 12)}" width="3.4" height="7.4" fill="#5C8FC2"/><rect x="${n(x + 9.8)}" y="${n(y - 12)}" width="3.4" height="5.4" fill="#E0C068"/>` +
  `<rect x="${n(x + 2)}" y="${n(y - 4.6)}" width="2.2" height="4.6" rx="1" fill="#9C6FA8"/><rect x="${n(x + 4.6)}" y="${n(y - 4)}" width="2.2" height="4" rx="1" fill="#6FA88C"/>`;

// The tailor's gourd. Anas ibn Malik said that a tailor invited the Prophet ﷺ to food he had made. I went with the
// Prophet ﷺ, and he brought barley bread and a broth with gourd and dried meat in it. I saw the Prophet ﷺ following
// the gourd from around the dish, and I have loved gourd ever since that day (Sahih al-Bukhari 5436). No one is drawn,
// and no hand: by the tailor's home, with cloths by its door, the tailor's place stands, and his place, a golden ring,
// is far off on the way. The tailor's voice calls; then his place comes along the way, and Anas's place with it. A cloth
// is spread, and on it a wide dish of broth, loaves of barley bread and pieces of gourd about the dish. A faint line goes
// from Anas's place to the dish, and the pieces of gourd go one by one to his side of the dish, and are gone. Then a
// whole gourd shows by Anas's place, with a warm glow: loved.
function tailorsGourd(): SignArt {
  const tailor: [number, number] = [46, 102];
  const start: [number, number] = [148, 102];
  const his: [number, number] = [90, 103];
  const anasFrom: [number, number] = [158, 106];
  const anas: [number, number] = [102, 106];
  const dishAt: [number, number] = [70, 99.6];
  const pieces: [number, number][] = [
    [63.6, 99.4],
    [66.4, 98.4],
    [70.4, 98.2],
    [73.6, 98.6],
    [66, 100.6]
  ];
  return {
    kind: "tailors-gourd",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "clouds", svg: cloud(70, 26, 0.55, "#FFFFFF", 0.9) + cloud(112, 20, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the tailor's home", svg: home(22, 99, 24, 18) },
      { name: "the tailor's cloths, by his door", svg: tailorsCloth(36, 99) },
      { name: "the way to the tailor's home", svg: way(`M160 ${start[1] + 1} Q124 ${start[1] - 3} 96 ${his[1] + 0.6}`, "#C9AE80", 1) },
      { name: "the tailor's place", svg: someone(tailor[0], tailor[1], 1.6) },
      { name: "the tailor's voice: inviting him", svg: arcs(49.6, 97, VOICE), keys: showFor(0.03, 0.04, 0.22, 0.23), loop: speaking },
      {
        name: "a golden ring, his place",
        svg: ring(start[0], start[1], 2.8, GOLD),
        keys: track({
          xy: [
            [0.23, 0, 0],
            [0.3, his[0] - start[0], his[1] - start[1]]
          ]
        })
      },
      {
        name: "Anas's place, going with him",
        svg: someone(anasFrom[0], anasFrom[1], 1.5),
        keys: track({
          xy: [
            [0.23, 0, 0],
            [0.3, anas[0] - anasFrom[0], anas[1] - anasFrom[1]]
          ],
          opacity: [
            [0.22, 0],
            [0.23, 1]
          ]
        })
      },
      { name: "a cloth spread for the food", svg: `<ellipse cx="${dishAt[0]}" cy="${n(dishAt[1] + 3.6)}" rx="16" ry="3" fill="#EFE0BC" stroke="#D9C49A" stroke-width="0.4"/>`, keys: showAt(0.43, 0.45) },
      { name: "a wide dish of broth", svg: dish(...dishAt), keys: showAt(0.44, 0.46) },
      { name: "loaves of barley bread", svg: loaf(58, 103.6) + loaf(82.4, 103.8), keys: showAt(0.46, 0.48) },
      { name: "dried meat in the broth", svg: `<rect x="${n(dishAt[0] - 2.4)}" y="${n(dishAt[1] - 0.6)}" width="2.2" height="0.9" rx="0.3" fill="#8A4A2E"/><rect x="${n(dishAt[0] + 0.8)}" y="${n(dishAt[1] + 0.2)}" width="2" height="0.8" rx="0.3" fill="#8A4A2E"/>`, keys: showAt(0.47, 0.49) },
      ...pieces.map(
        ([x, y], i): SignPart => {
          const go = at3(0.63 + i * 0.02);
          return {
            name: `a piece of gourd about the dish ${i + 1}`,
            svg: gourdPiece(x, y),
            keys: track({
              xy: [
                [go, 0, 0],
                [at3(go + 0.015), n(76 - x), n(99.4 - y)]
              ],
              opacity: [
                [0.48, 0],
                [0.5, 1],
                [at3(go + 0.015), 1],
                [at3(go + 0.02), 0]
              ]
            })
          };
        }
      ),
      { name: "I saw him: a faint line from Anas's place to the dish", svg: lookLine(anas[0] - 2, anas[1] - 1.6, 77, 99, 93, VOICE), keys: showFor(0.63, 0.65, 0.82, 0.83) },
      { name: "loved ever since: a warm glow about Anas's place", svg: wash(anas[0] + 4, anas[1] - 2, 11, 4.4, WARM, 0.22), keys: showAt(0.83, 0.86), loop: soft },
      { name: "loved ever since: a gourd by Anas's place", svg: gourd(anas[0] + 9, anas[1] - 0.6), keys: showAt(0.84, 0.87) },
      {
        name: "loved ever since: glints about the gourd",
        svg: sparkle(anas[0] + 6, anas[1] - 5, 0.9, "#FFE7A0") + sparkle(anas[0] + 13, anas[1] - 4, 0.8, "#FFE7A0"),
        keys: showAt(0.86, 0.88),
        loop: { move: "twinkle", ms: 900, low: 0.4 }
      }
    ],
    words: [
      { text: "A tailor made food and invited him", from: 0.02, to: 0.2 },
      { text: "Anas: I went along with him", from: 0.22, to: 0.4 },
      { text: "Barley bread, and broth with gourd in it", from: 0.42, to: 0.6 },
      { text: "I saw him pick the gourd around the dish", from: 0.62, to: 0.8 },
      { text: "I have loved gourd ever since that day", from: 0.82, to: 1 }
    ]
  };
}

// The eclipse. Al-Mughirah ibn Shu'bah said: the sun was eclipsed in the time of the Messenger of Allah ﷺ on the day
// Ibrahim died, and the people said: the sun was eclipsed for the death of Ibrahim. The Messenger of Allah ﷺ said: the
// sun and the moon are not eclipsed for anyone's death or for anyone's life; so when you see it, pray and call on Allah
// (Sahih al-Bukhari 1043). No one is drawn: over Madinah, with its masjid, homes and palms, the moon's dark disk slides
// over the sun and the sky grows dim; a grey ring comes about a home: the day Ibrahim died. Grey voices come from the
// folk's places. His voice speaks, and a soft ring comes about the sun and the moon. The grey voices go. Then sparks rise
// from the folk's places and his, one after another: prayer and calling on Allah, and a warm glow comes over them.
function theEclipse(): SignArt {
  const sunAt: [number, number] = [112, 30];
  const his: [number, number] = [76, 104];
  const folk: [number, number][] = [
    [56, 103],
    [62, 107],
    [92, 103],
    [98, 107],
    [106, 102]
  ];
  return {
    kind: "the-eclipse",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "clouds", svg: cloud(48, 28, 0.55, "#FFFFFF", 0.9) + cloud(150, 40, 0.45, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      {
        name: "the sky growing dim",
        svg: `<rect width="160" height="62" fill="#2E3D6E"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.12, 0.42]
          ]
        })
      },
      { name: "the sun", svg: `${glow(sunAt[0], sunAt[1], 14, "#FFF0C0", 0.12)}<circle cx="${sunAt[0]}" cy="${sunAt[1]}" r="7" fill="#FFE07A"/>` },
      {
        name: "the moon, its dark disk over the sun",
        svg: `<circle cx="${sunAt[0]}" cy="${sunAt[1]}" r="7.2" fill="#4A5470"/>`,
        keys: track({
          xy: [
            [0.03, 14, -6],
            [0.12, 2, -0.8]
          ],
          opacity: [
            [0.03, 0],
            [0.06, 1]
          ]
        })
      },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the masjid of Madinah", svg: madinahMasjid(16, 98, 0.6) },
      { name: "homes of Madinah", svg: home(132, 98, 16, 14) + home(148, 96, 12, 12) },
      { name: "a palm of Madinah 1", svg: palm(56, 95, 18), origin: { x: 56, y: 95 }, loop: { move: "sway", ms: 5200, angle: 1.4 } },
      { name: "a palm of Madinah 2", svg: palm(118, 94, 16), origin: { x: 118, y: 94 }, loop: { move: "sway", ms: 5800, angle: 1.4, phase: 0.5 } },
      {
        name: "the land growing dim",
        svg: `<rect y="62" width="160" height="58" fill="#1E2A44"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.12, 0.22]
          ]
        })
      },
      { name: "the day Ibrahim died: a grey ring about a home", svg: greyRing(132, 97, 12, 5.4), keys: showAt(0.12, 0.15) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.8, GOLD) },
      { name: "the folk's places", svg: folk.map(([x, y]) => someone(x, y, 1.5, LIGHT)).join("") },
      { name: "the folk saying it was for his death: grey voices", svg: arcs(59, 97, "#B8C0CC") + arcsLeft(103, 96, "#B8C0CC"), keys: showFor(0.23, 0.24, 0.63, 0.65), loop: speaking },
      { name: "his voice: the sun and the moon are not eclipsed for anyone", svg: arcs(79.6, 99, "#FFE7A0"), keys: showFor(0.43, 0.44, 0.82, 0.83), loop: speaking },
      {
        name: "the sun and the moon: a soft ring about them",
        svg: `<ellipse cx="${sunAt[0] + 1}" cy="${sunAt[1] - 0.4}" rx="12" ry="10.4" stroke="#FFF3CF" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="none"/>`,
        keys: showAt(0.45, 0.48),
        loop: soft
      },
      ...[...folk, his].map(([x, y], i) => spark(`praying and calling on Him: a spark rising ${i + 1}`, x, y - 4, at3(0.83 + i * 0.015), at3(0.88 + i * 0.015))),
      { name: "praying and calling on Him: a warm glow over them", svg: wash(80, 103, 34, 5.4, WARM, 0.16), keys: showAt(0.84, 0.87), loop: soft }
    ],
    words: [
      { text: "The sun eclipsed the day Ibrahim died", from: 0.02, to: 0.2 },
      { text: "The people said: it was for his death", from: 0.22, to: 0.4 },
      { text: "The sun and moon do not eclipse", from: 0.42, to: 0.6 },
      { text: "For anyone's death or for anyone's life", from: 0.62, to: 0.8 },
      { text: "When you see it, pray and call on Allah", from: 0.82, to: 1 }
    ]
  };
}

export const DEAR_ART = {
  "dearer-than-the-world": dearerThanTheWorld,
  "milk-of-knowledge": milkOfKnowledge,
  "fatihah-cure": fatihahCure,
  "cloak-on-the-thorns": cloakOnTheThorns,
  "rings-thrown-away": ringsThrownAway,
  "tailors-gourd": tailorsGourd,
  "the-eclipse": theEclipse
};
