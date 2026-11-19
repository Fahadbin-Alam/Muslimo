import { cloud, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { road, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, EIGHT, FOLK, glints, ITS_VOICE, linesOn, places, plainLand, SEVEN, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { coins } from "./tradeArt";
import { smallLight } from "./hourArt";
import { kabah } from "./historyArt";
import { at3 } from "./storyArt";
import { GREY } from "./lovedArt";

/**
 * Raised and kept: Ibn Abza, a freed slave put over the valley of Makkah because he knew the Book of Allah well, for by
 * this Book Allah exalts some peoples and degrades others; a person's own wealth, what he spends, and his heirs' wealth,
 * what he leaves; Umar, who knew Adi ibn Hatim for what he did when his people turned away; Hajj, made obligatory but
 * not every year; the whole Quran in a month, and not in less than seven days; and the authority of ruling, not given to
 * those who ask for it. Only the land, the sky, buildings, things and plants are drawn. No Prophet, no Companion and no
 * person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed
 * circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no
 * book or page is drawn, and nothing comes down from the sky: a deed is a spark that rises, what is good is a light,
 * glints and a soft golden ring, and what is not to be done a grey dashed ring. No name, word or number is written.
 */

/** The words of seven lines, the fifth longer: three coins spent, one after another. */
const SPENT = [
  [0.02, 0.13],
  [0.142, 0.26],
  [0.272, 0.38],
  [0.392, 0.5],
  [0.512, 0.7],
  [0.712, 0.85],
  [0.862, 1]
] as const;

/** The words of eight lines, the second longer: the delegation called one by one. */
const ONE_BY_ONE = [
  [0.02, 0.125],
  [0.135, 0.3],
  [0.31, 0.415],
  [0.425, 0.53],
  [0.54, 0.645],
  [0.655, 0.76],
  [0.77, 0.875],
  [0.885, 1]
] as const;

/** The valley of Makkah far off: two hills, and the Ka'bah small between them, its foot at y `base`. */
const makkahFar = (x: number, base: number) =>
  peaks(
    [
      [n(x - 16), 9, 11],
      [n(x + 16), 8, 11]
    ],
    base,
    "#BFA57E",
    false
  ) + kabah(n(x - 4), base, 3.4);

// Raised by this Book. Amir ibn Wathilah said that Nafi' ibn Abd al-Harith met Umar at Usfan, and Umar had employed him
// as collector in Makkah. Umar said to Nafi': whom have you appointed as collector over the people of the valley? He
// said: Ibn Abza. Umar said: who is Ibn Abza? He said: one of our freed slaves. Umar said: so you have appointed a freed
// slave over them? He said: he is well versed in the Book of Allah, the Exalted and Great, and well versed in the
// commandments. Umar said: the Prophet ﷺ said: by this Book Allah would exalt some peoples and degrade others (Sahih
// Muslim 817). No one is drawn: a road over the land at Usfan, with its palms, and far off on the left the valley of
// Makkah, the Ka'bah small between its hills. Umar's place comes along the road from the right and Nafi''s from the
// left, and they meet. Umar's voice asks, and a soft pale ring comes about the valley. Nafi''s voice answers, and a
// small place shows in the valley: Ibn Abza. Their voices speak, one after the other; when Nafi' says he knows the
// Book of Allah, a small light shows in Ibn Abza's place and glints come about it. Umar's voice tells what he said,
// with golden glints: his words, and a row of places shows on the land: peoples. Some of them rise, each with a soft
// golden ring: exalted; the others go lower and grey: degraded; and a soft golden ring comes about Ibn Abza's place.
function raisedByThisBook(): SignArt {
  const umar: [number, number] = [88, 92];
  const nafi: [number, number] = [72, 92];
  const abza: [number, number] = [30, 70.6];
  const rows: [number, number][] = [
    [34, 108],
    [50, 109],
    [66, 108],
    [94, 108],
    [110, 109],
    [126, 108]
  ];
  const umarVoice = (name: string, from: number, hide: number): SignPart => ({
    name,
    svg: arcsLeft(n(umar[0] - 3.2), n(umar[1] - 2.8), VOICE_OF_UMAR),
    keys: showFor(from, at3(from + 0.006), hide, at3(hide + 0.006)),
    loop: speaking
  });
  const nafiVoice = (name: string, from: number, hide: number): SignPart => ({
    name,
    svg: arcs(n(nafi[0] + 3.4), n(nafi[1] - 2.8), ITS_VOICE),
    keys: showFor(from, at3(from + 0.006), hide, at3(hide + 0.006)),
    loop: speaking
  });
  const peoples = rows.map(
    ([x, y], i): SignPart => ({
      name: i % 2 ? `a place among them going lower ${(i + 1) / 2}` : `a place among them rising ${i / 2 + 1}`,
      svg: someone(x, y, 1.5, FOLK),
      keys: track({
        opacity: i % 2 ? [[0.79, 0], [0.8, 1], [0.9, 1], [0.92, 0.45]] : [[0.79, 0], [0.8, 1]],
        xy: i % 2 ? [[0.89, 0, 0], [0.92, 0, 3]] : [[0.88, 0, 0], [0.91, 0, -8]]
      })
    })
  );
  return {
    kind: "raised-by-this-book",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(70, 22, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land at Usfan", svg: plainLand("#E2CB9C", [[14, 116], [80, 117], [150, 116]]) },
      { name: "the valley of Makkah far off, the Ka'bah small between its hills", svg: makkahFar(26, 72) },
      { name: "the road through Usfan", svg: road(0, 160, 92) },
      ...palms(
        [
          [112, 88, 12],
          [124, 89, 10],
          [146, 88, 12]
        ],
        "Usfan"
      ),
      {
        name: "Umar's place: coming along the road",
        svg: someone(umar[0], umar[1], 1.6, VOICE_OF_UMAR),
        keys: track({
          xy: [
            [0.022, 64, 0],
            [0.08, 0, 0]
          ]
        })
      },
      {
        name: "Nafi''s place: coming along the road from Makkah",
        svg: someone(nafi[0], nafi[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.022, -64, 0],
            [0.08, 0, 0]
          ]
        })
      },
      umarVoice("Umar's voice: whom have you appointed over the valley", 0.146, 0.2),
      { name: "the valley in question: a soft pale ring about it", svg: care(26, 69.4, 15, 4.6, "#FFF3CF"), keys: showAt(0.16, 0.172), loop: soft },
      nafiVoice("Nafi''s voice: Ibn Abza", 0.268, 0.292),
      { name: "Ibn Abza's place, small in the valley", svg: someone(abza[0], abza[1], 1, FOLK), keys: showAt(0.276, 0.286) },
      umarVoice("Umar's voice: who is Ibn Abza", 0.302, 0.326),
      nafiVoice("Nafi''s voice: one of our freed slaves", 0.39, 0.448),
      umarVoice("Umar's voice: so you have appointed a freed slave", 0.512, 0.57),
      nafiVoice("Nafi''s voice: well versed in it", 0.634, 0.692),
      { name: "well versed in the Quran: a small light in Ibn Abza's place", svg: smallLight(abza[0], abza[1], 0.6), keys: showAt(0.648, 0.66), loop: soft },
      {
        name: "what Ibn Abza knows: glints about his place",
        svg: glints(
          [
            [28.4, 67.6],
            [33.6, 68.4]
          ],
          0.6
        ),
        keys: showAt(0.664, 0.676),
        loop: twinkle()
      },
      umarVoice("Umar's voice: he said", 0.756, 0.95),
      {
        name: "his words, as Umar told them: golden glints over the voice",
        svg: glints(
          [
            [80.6, 86.4],
            [77.4, 84.6]
          ],
          0.8,
          "#FFD45A"
        ),
        keys: showFor(0.77, 0.78, 0.95, 0.956),
        loop: twinkle()
      },
      ...peoples,
      ...[0, 2, 4].map(
        (i): SignPart => ({
          name: `exalted: a soft golden ring about a rising place ${i / 2 + 1}`,
          svg: care(rows[i][0], n(rows[i][1] - 8), 3.6, 2, SOFT_GOLD),
          keys: showAt(0.91, 0.922),
          loop: soft
        })
      ),
      ...[1, 3, 5].map(
        (i): SignPart => ({
          name: `degraded: a grey dashed ring about a place gone lower ${(i + 1) / 2}`,
          svg: greyRing(rows[i][0], n(rows[i][1] + 3), 3.4, 1.9),
          keys: showAt(0.92, 0.932)
        })
      ),
      { name: "exalted by it: a soft golden ring about Ibn Abza's place", svg: care(abza[0], abza[1], 3, 1.6, SOFT_GOLD), keys: showAt(0.93, 0.942), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Nafi' met Umar at Usfan. Umar said:",
      "Whom did you appoint over the valley?",
      "Nafi': Ibn Abza. Umar: who is Ibn Abza?",
      "Nafi': one of our freed slaves.",
      "Umar: so you appointed a freed slave?",
      "Nafi': he is well versed in Allah's Book.",
      "Umar: he said: by this Book Allah would",
      "Exalt some peoples and degrade others."
    ])
  };
}

/** Umar's place and voice: a deep brown. */
const VOICE_OF_UMAR = "#6B4A2E";

// His real wealth. Abdullah said: the Prophet ﷺ said: who among you considers the wealth of his heirs dearer to him than
// his own wealth? They said: O Messenger of Allah, there is none among us but loves his own wealth more. He said: so his
// wealth is whatever he spends during his life, while the wealth of his heirs is whatever he leaves after his death
// (Sahih al-Bukhari 6442; the English page's "in Allah's Cause" and "on good deeds" are its own notes). No one is drawn,
// and no one's death: the masjid of Madinah and the open ground before it, his place, a golden ring, their places
// about it, and Abdullah's place a little apart. Abdullah's voice tells of it, and his voice asks. On the right, a
// place with its heap of coins: a person's own wealth, and two small places by it: his heirs. Their voice answers, and
// a soft golden ring comes about the heap: loved more. His voice speaks: three coins go one by one from the heap along a
// dashed way to the door of a home, and a spark rises from it for each: what he spends; the coins left stay in the
// heap: what he leaves. A soft pale ring comes about the heirs' places; the heap goes over to them: their wealth, and
// a soft golden ring and glints come about the sparks over the home: his own.
function hisRealWealth(): SignArt {
  const his: [number, number] = [52, 100];
  const abdullah: [number, number] = [30, 108];
  const one: [number, number] = [96, 99];
  const heap: [number, number] = [104, 101];
  const heirs: [number, number][] = [
    [117, 103.4],
    [135, 101.4]
  ];
  const door: [number, number] = [146.2, 90];
  const spent = (i: number): SignPart => {
    const from = [0.528, 0.552, 0.576][i];
    const to = at3(from + 0.026);
    const y = n(heap[1] - (3 + i) * 1.1);
    return {
      name: `a coin spent ${i + 1}: going to the door of the home`,
      svg: coins(heap[0], y, 1),
      keys: track({
        opacity: [
          [0.074, 0],
          [0.084, 1],
          [to, 1],
          [at3(to + 0.006), 0]
        ],
        xy: [
          [from, 0, 0],
          [to, n(door[0] - heap[0]), n(door[1] - y)]
        ]
      })
    };
  };
  return {
    kind: "his-real-wealth",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "a cloud", svg: cloud(84, 24, 0.4, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground before the masjid", svg: plainLand("#E2CB9C", [[18, 117], [86, 117], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(2, 92, 0.8) },
      { name: "a home of Madinah", svg: home(148, 92, 16, 12) },
      ...palms([[134, 90, 12]], "Madinah"),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "their places, sitting about him",
        svg: places([
          [44, 107.6],
          [58, 108.4],
          [70, 106.4]
        ])
      },
      { name: "Abdullah's place", svg: someone(abdullah[0], abdullah[1], 1.6, ITS_VOICE) },
      { name: "Abdullah's voice: he said", svg: arcs(n(abdullah[0] + 3.4), n(abdullah[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.03, 0.05, 0.056), loop: speaking },
      { name: "his voice: who among you", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.062, 0.068, 0.212, 0.218), loop: speaking },
      { name: "a place, with its own wealth", svg: someone(one[0], one[1], 1.6, VOICE_OF_UMAR), keys: showAt(0.074, 0.084) },
      {
        name: "its own wealth: a heap of coins, and what he leaves going over to the heirs",
        svg: coins(heap[0], heap[1], 3),
        keys: track({
          opacity: [
            [0.074, 0],
            [0.084, 1]
          ],
          xy: [
            [0.872, 0, 0],
            [0.9, 22, 3.6]
          ]
        })
      },
      spent(0),
      spent(1),
      spent(2),
      { name: "the heirs' places", svg: places(heirs, 1.3), keys: showAt(0.17, 0.182) },
      { name: "their voice: none of us but loves his own more", svg: arcs(73.4, 103.6, FOLK), keys: showFor(0.276, 0.282, 0.452, 0.458), loop: speaking },
      { name: "loved more: a soft golden ring about the heap", svg: care(heap[0], n(heap[1] - 2.6), 5.4, 3.6, SOFT_GOLD), keys: showFor(0.41, 0.422, 0.866, 0.876), loop: soft },
      { name: "his voice: so his wealth is what he spends", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.516, 0.522, 0.95, 0.956), loop: speaking },
      { name: "the way the coins go: dashed, to the door of the home", svg: way(`M${heap[0] + 3} ${heap[1] - 4} Q128 86 ${door[0] - 2} ${door[1]}`), keys: showFor(0.516, 0.526, 0.62, 0.63) },
      spark("what he spends: a spark rising from the door 1", door[0], n(door[1] - 6), 0.56, 0.61),
      spark("what he spends: a spark rising from the door 2", n(door[0] - 2.4), n(door[1] - 6), 0.584, 0.634),
      spark("what he spends: a spark rising from the door 3", n(door[0] + 2.4), n(door[1] - 6), 0.606, 0.656),
      { name: "his heirs' wealth: a soft pale ring about the heirs' places", svg: care(126, 103, 13, 4.8, "#FFF3CF"), keys: showAt(0.77, 0.782), loop: soft },
      {
        name: "what he spends is his: a soft golden ring and glints over the home",
        svg:
          care(door[0], n(door[1] - 17), 6, 3, SOFT_GOLD) +
          glints(
            [
              [n(door[0] - 5), n(door[1] - 20)],
              [n(door[0] + 4.6), n(door[1] - 19)]
            ],
            0.8
          ),
        keys: showAt(0.92, 0.932),
        loop: soft
      }
    ],
    words: linesOn(SPENT, [
      "Abdullah: he said: who among you holds",
      "His heirs' wealth dearer than his own?",
      "They said: there is none among us",
      "But loves his own wealth more.",
      "He said: so his wealth is what he spends",
      "During his life, and his heirs' wealth",
      "Is whatever he leaves."
    ])
  };
}

// Umar knew Adi. Adi ibn Hatim said: we came to Umar in a delegation. He started calling the men one by one, calling
// each by his name. I said to him: don't you know me, O chief of the Believers? He said: yes: you embraced Islam when
// they disbelieved; you came when they ran away; you fulfilled your promises when they broke theirs; and you recognized
// it when they denied it. On that, Adi said: I therefore don't care (Sahih al-Bukhari 4394). No one is drawn: the
// masjid of Madinah and the open ground before it, Umar's place before it. The delegation's places come in from the
// left, Adi's among them, and stand in a row. Umar's voice calls, and the places step forward one by one, each with a
// glint as it is called; Adi's place stays where it is. Adi's voice asks, and Umar's voice answers. Far off on the
// left, his people's places show, grey: they disbelieved, and a small light shows in Adi's place: he embraced Islam. A
// dashed way shows from far off to Adi's place: he came, and his people's places go further away: they ran away. A
// golden line shows from Adi's place to the masjid: his promise kept, and a grey line far off by his people's places
// parts in two: theirs broken. A soft light comes about Adi's place: he recognized it, and his people's places fade:
// they denied it. Adi's voice speaks, and a soft golden ring comes about his place.
function umarKnewAdi(): SignArt {
  const umar: [number, number] = [124, 100];
  const adi: [number, number] = [46, 104];
  const row: [number, number][] = [
    [58, 104],
    [68, 105],
    [78, 104],
    [88, 105],
    [98, 104]
  ];
  const tayy: [number, number][] = [
    [16, 80],
    [22, 81.4],
    [28, 79.8],
    [34, 81.2]
  ];
  const called = (i: number): SignPart => {
    const at = 0.15 + i * 0.02;
    return {
      name: `a place of the delegation called by name ${i + 1}`,
      svg: someone(row[i][0], row[i][1], 1.5, FOLK),
      keys: track({
        xy: [
          [0.024, -60, 0],
          [0.08, 0, 0],
          [at3(at), 0, 0],
          [at3(at + 0.014), 4, -3]
        ]
      })
    };
  };
  return {
    kind: "umar-knew-adi",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(84, 16) },
      { name: "a cloud", svg: cloud(40, 24, 0.4, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground before the masjid", svg: plainLand("#E2CB9C", [[18, 117], [82, 117], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(108, 92, 0.9) },
      ...palms([[100, 90, 12]], "Madinah"),
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6, VOICE_OF_UMAR) },
      ...[0, 1, 2, 3, 4].map(called),
      ...[0, 1, 2, 3, 4].map(
        (i): SignPart => ({
          name: `called by name: a glint over the place ${i + 1}`,
          svg: glints([[n(row[i][0] + 4), n(row[i][1] - 7.4)]], 0.7),
          keys: showFor(at3(0.15 + i * 0.02 + 0.008), at3(0.15 + i * 0.02 + 0.016), 0.344, 0.35),
          loop: twinkle()
        })
      ),
      {
        name: "Adi's place: coming in with the delegation, not called early",
        svg: someone(adi[0], adi[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.024, -60, 0],
            [0.08, 0, 0]
          ]
        })
      },
      { name: "Umar's voice: calling each by name", svg: arcsLeft(n(umar[0] - 3.2), n(umar[1] - 2.8), VOICE_OF_UMAR), keys: showFor(0.138, 0.144, 0.25, 0.256), loop: speaking },
      { name: "Adi's voice: don't you know me", svg: arcs(n(adi[0] + 3.4), n(adi[1] - 2.8), ITS_VOICE), keys: showFor(0.314, 0.32, 0.344, 0.35), loop: speaking },
      { name: "Umar's voice: yes", svg: arcsLeft(n(umar[0] - 3.2), n(umar[1] - 2.8), VOICE_OF_UMAR), keys: showFor(0.356, 0.362, 0.83, 0.835), loop: speaking },
      {
        name: "the places of Adi's tribe far off: grey, they disbelieved",
        svg: places(tayy, 1.1, GREY),
        keys: track({
          opacity: [
            [0.43, 0],
            [0.442, 1],
            [0.78, 1],
            [0.82, 0.3]
          ],
          xy: [
            [0.556, 0, 0],
            [0.6, -8, 0]
          ]
        })
      },
      { name: "Adi embraced Islam: a small light in Adi's place", svg: smallLight(adi[0], adi[1], 0.7), keys: showAt(0.452, 0.464), loop: soft },
      { name: "Adi came: a dashed way from far off to Adi's place", svg: way(`M34 85 Q38 98 ${adi[0] - 2.6} ${adi[1] - 0.6}`), keys: showAt(0.544, 0.556) },
      { name: "Adi's promise kept: a golden line from Adi's place to the masjid", svg: `<path d="M${adi[0] + 2.4} ${adi[1] + 2.4} Q86 113 ${umar[0] - 2} ${umar[1] + 1.8}" stroke="${SOFT_GOLD}" stroke-width="0.8" fill="none"/>`, keys: showAt(0.66, 0.672) },
      {
        name: "their promises broken: a grey line far off, one half going",
        svg: `<path d="M12 86 L18.6 86" stroke="${GREY}" stroke-width="0.7"/>`,
        keys: track({
          opacity: [
            [0.66, 0],
            [0.666, 1],
            [0.78, 1],
            [0.82, 0.3]
          ],
          xy: [
            [0.68, 0, 0],
            [0.71, -2, 1]
          ]
        })
      },
      {
        name: "their promises broken: a grey line far off, the other half going",
        svg: `<path d="M18.6 86 L25 86" stroke="${GREY}" stroke-width="0.7"/>`,
        keys: track({
          opacity: [
            [0.66, 0],
            [0.666, 1],
            [0.78, 1],
            [0.82, 0.3]
          ],
          xy: [
            [0.68, 0, 0],
            [0.71, 2, 1]
          ]
        })
      },
      { name: "Adi recognized it: a soft light about Adi's place", svg: glow(adi[0], adi[1], 7, "#FFF3C0", 0.34), keys: showAt(0.776, 0.79), loop: soft },
      { name: "Adi's voice: I therefore don't care", svg: arcs(n(adi[0] + 3.4), n(adi[1] - 2.8), ITS_VOICE), keys: showFor(0.888, 0.894, 0.95, 0.956), loop: speaking },
      { name: "known: a soft golden ring about Adi's place", svg: care(adi[0], adi[1], 4.4, 2.4, SOFT_GOLD), keys: showAt(0.9, 0.912), loop: soft }
    ],
    words: linesOn(ONE_BY_ONE, [
      "Adi: we came to Umar in a delegation.",
      "Umar called the men one by one, by name.",
      "Adi: don't you know me? Umar said: yes,",
      "You embraced Islam when they disbelieved;",
      "You came when they ran away; you fulfilled",
      "Your promises when they broke theirs;",
      "You recognized it when they denied it.",
      "Adi said: I therefore don't care."
    ])
  };
}

// Every year? Abu Hurairah said: the Messenger of Allah ﷺ addressed us and said: O people, Allah has made Hajj
// obligatory for you, so perform Hajj. A person said: Messenger of Allah, every year? He kept quiet, and the person
// repeated it three times. Then the Messenger of Allah ﷺ said: if I were to say yes, it would become obligatory, and you
// would not be able to do it. Then he said: leave me with what I have left to you (Sahih Muslim 1337; what comes after it
// is not drawn). No one is drawn: the masjid of Madinah, his place, a golden ring, before it, and their places sitting
// before him; far off on the right, the valley of Makkah with the Ka'bah. Abu Hurairah's voice tells of it, and his
// voice speaks: a soft golden ring comes about the Ka'bah far off: obligatory, and a dashed way shows from Madinah to
// it: so perform Hajj. A place among them asks, its voice once, and then twice more: three times; no voice comes from
// his place: he kept quiet. His voice speaks: a row of faint rings shows along the way, one for every year; they turn
// grey and fade: you would not be able. His voice speaks again, and one soft golden ring shows on the way, with
// glints: what he left to them.
function everyYear(): SignArt {
  const his: [number, number] = [50, 98];
  const asker: [number, number] = [96, 102];
  const hurairah: [number, number] = [108, 110];
  const yearly: [number, number][] = [
    [64, 89],
    [74, 87.4],
    [84, 86],
    [94, 84.8],
    [104, 83.6],
    [114, 82.4],
    [124, 81.2],
    [134, 80]
  ];
  const askerVoice = (k: number, from: number, hide: number): SignPart => ({
    name: `the asker's voice: every year ${k}`,
    svg: arcsLeft(n(asker[0] - 3.2), n(asker[1] - 2.8), ITS_VOICE),
    keys: showFor(from, at3(from + 0.006), hide, at3(hide + 0.006)),
    loop: speaking
  });
  return {
    kind: "every-year",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(84, 16) },
      { name: "a cloud", svg: cloud(28, 24, 0.4, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground before the masjid", svg: plainLand("#E2CB9C", [[18, 117], [82, 118], [150, 116]]) },
      { name: "the valley of Makkah far off, with the Ka'bah", svg: makkahFar(140, 74) },
      { name: "the masjid", svg: madinahMasjid(2, 90, 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "their places, sitting before him",
        svg: places([
          [64, 101],
          [76, 102],
          [86, 101],
          [70, 109],
          [82, 110],
          [94, 109]
        ])
      },
      { name: "the asker's place among them", svg: someone(asker[0], asker[1], 1.6, ITS_VOICE) },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.6, VOICE_OF_UMAR) },
      { name: "Abu Hurairah's voice: he addressed us", svg: arcs(n(hurairah[0] + 3.4), n(hurairah[1] - 2.8), VOICE_OF_UMAR), keys: showFor(0.022, 0.028, 0.05, 0.056), loop: speaking },
      { name: "his voice: Hajj is made obligatory for you", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.06, 0.066, 0.29, 0.296), loop: speaking },
      { name: "obligatory: a soft golden ring about the Ka'bah far off", svg: care(138, 72.4, 6.4, 3, SOFT_GOLD), keys: showAt(0.16, 0.172), loop: soft },
      { name: "so perform Hajj: a dashed way from Madinah to Makkah", svg: way("M56 92 Q96 82 132 74"), keys: showAt(0.268, 0.28) },
      askerVoice(1, 0.318, 0.404),
      askerVoice(2, 0.512, 0.53),
      askerVoice(3, 0.54, 0.558),
      { name: "his voice: if I were to say yes", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.634, 0.64, 0.95, 0.956), loop: speaking },
      {
        name: "every year: a row of faint rings along the way",
        svg: yearly.map(([x, y]) => ring(x, y, 1.8, "#FFF3CF")).join(""),
        keys: track({
          opacity: [
            [0.648, 0],
            [0.664, 0.9],
            [0.756, 0.9],
            [0.766, 0]
          ]
        })
      },
      {
        name: "obligatory every year: the rings gone grey, then fading",
        svg: yearly.map(([x, y]) => greyRing(x, y, 1.8, 1)).join(""),
        keys: track({
          opacity: [
            [0.756, 0],
            [0.766, 1],
            [0.78, 1],
            [0.81, 0]
          ]
        })
      },
      {
        name: "what he has left to you: one soft golden ring on the way, with glints",
        svg:
          care(94, 84.8, 3.2, 1.8, SOFT_GOLD) +
          glints(
            [
              [89.6, 81.6],
              [98.6, 81]
            ],
            0.7
          ),
        keys: showAt(0.89, 0.902),
        loop: soft
      }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: he addressed us and said:",
      "O people, Allah has made Hajj obligatory",
      "For you, so perform Hajj. A person said:",
      "Every year? He kept quiet, and the person",
      "Repeated it three times.",
      "He said: if I were to say yes, it would",
      "Become obligatory; you would not be able.",
      "Leave me with what I have left to you."
    ])
  };
}

// In seven days. Abdullah ibn Amr said: the Messenger of Allah ﷺ said to me: recite the whole Quran in one month's time.
// I said: but I have power (to do more than that, as the English page has it). He said: then finish the recitation of
// the Quran in seven days, and do not finish it in less than this period (Sahih al-Bukhari 5054). No one is drawn, and
// no book or page: a home of Madinah, his place, a golden ring, and Abdullah's place by it. Abdullah's voice tells of
// it, and his voice speaks. A thin crescent shows low in the sky, and a row of small pale marks across it: the days of
// a month, and a soft golden line runs along the whole row: the whole Quran in a month. Abdullah's voice speaks, and
// glints come about his place: he has power. His voice speaks: the long line fades, and a short one runs along the
// first seven marks only, which glow: in seven days. The other marks dim, and a soft golden ring comes about the seven:
// not in less than this.
function inSevenDays(): SignArt {
  const his: [number, number] = [62, 100];
  const abdullah: [number, number] = [80, 103];
  const days = Array.from({ length: 30 }, (_, i): [number, number] => [n(14 + i * 4.6), n(44 - Math.sin((i / 29) * Math.PI) * 6)]);
  const mark = ([x, y]: [number, number], fill: string) => `<circle cx="${x}" cy="${y}" r="0.8" fill="${fill}"/>`;
  const along = (list: [number, number][]) => `<path d="${list.map(([x, y], i) => `${i ? "L" : "M"}${x} ${n(y + 2.6)}`).join(" ")}" stroke="${SOFT_GOLD}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;
  return {
    kind: "in-seven-days",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[18, 117], [100, 117], [150, 116]]) },
      { name: "a home of Madinah", svg: home(34, 94, 22, 16) },
      ...palms([[122, 92, 13]], "Madinah"),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abdullah's place", svg: someone(abdullah[0], abdullah[1], 1.6, ITS_VOICE) },
      { name: "Abdullah's voice: he said to me", svg: arcs(n(abdullah[0] + 3.4), n(abdullah[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.03, 0.07, 0.076), loop: speaking },
      { name: "his voice: recite the whole Quran in one month", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.086, 0.092, 0.34, 0.346), loop: speaking },
      { name: "a month: a thin crescent low in the sky", svg: `<path d="M8 50 A3 3 0 0 1 8 56 A1.6 3 0 0 0 8 50 Z" fill="#FFF6D8"/>`, keys: showAt(0.226, 0.238) },
      {
        name: "the days of a month: a row of small pale marks",
        svg: days.map((d) => mark(d, "#FFFFFF")).join(""),
        keys: track({
          opacity: [
            [0.24, 0],
            [0.254, 0.95],
            [0.82, 0.95],
            [0.85, 0.35]
          ]
        })
      },
      { name: "the whole Quran in a month: a soft golden line along the whole row", svg: along(days), keys: showFor(0.27, 0.29, 0.63, 0.645) },
      { name: "Abdullah's voice: but I have power", svg: arcs(n(abdullah[0] + 3.4), n(abdullah[1] - 2.8), ITS_VOICE), keys: showFor(0.416, 0.422, 0.536, 0.542), loop: speaking },
      {
        name: "Abdullah has power: glints about Abdullah's place",
        svg: glints(
          [
            [n(abdullah[0] - 3.6), n(abdullah[1] - 4.6)],
            [n(abdullah[0] + 3.4), n(abdullah[1] - 6.8)]
          ],
          0.7
        ),
        keys: showFor(0.44, 0.452, 0.536, 0.546),
        loop: twinkle()
      },
      { name: "his voice: then finish it in seven days", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.612, 0.618, 0.95, 0.956), loop: speaking },
      { name: "in seven days: a short golden line along the first seven marks", svg: along(days.slice(0, 7)), keys: showAt(0.65, 0.664) },
      { name: "the seven days: their marks glowing", svg: days.slice(0, 7).map((d) => mark(d, "#FFE7A0") + glow(d[0], d[1], 2, "#FFE7A0", 0.3)).join(""), keys: showAt(0.67, 0.684), loop: soft },
      { name: "not in less than this: a soft golden ring about the seven marks", svg: care(n((days[0][0] + days[6][0]) / 2), n(days[3][1] + 0.6), 17, 4.4, SOFT_GOLD), keys: showAt(0.86, 0.874), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Abdullah ibn Amr: he said to me:",
      "Recite the whole Quran in one month.",
      "I said: but I have power.",
      "He said: then finish it in seven days,",
      "And do not finish it in less than this."
    ])
  };
}

// Not for those who ask. Abu Musa said: two men from my tribe and I entered upon the Prophet ﷺ. One of the two men said
// to him: O Messenger of Allah, appoint me as a governor, and so did the second. He ﷺ said: we do not assign the
// authority of ruling to those who ask for it, nor to those who are keen to have it (Sahih al-Bukhari 7149). No one is
// drawn: the masjid of Madinah, his place, a golden ring, before it; far off on the left, a town on the land: a land to
// be governed. Abu Musa's place and the two places with it come in. Abu Musa's voice tells of it; the first one's voice
// asks, and a dashed way shows from its place toward the town far off, with a soft pale ring about the town: the
// authority of ruling over it; the second one's voice asks too, and another dashed way shows. His voice speaks: the two
// ways fade, and a grey dashed ring comes about the first one's place: not to those who ask for it; then about the
// second one's place: nor to those who are keen to have it. The town stays apart, its soft ring about it.
function notForThoseWhoAsk(): SignArt {
  const his: [number, number] = [108, 100];
  const musa: [number, number] = [64, 104];
  const first: [number, number] = [80, 101];
  const second: [number, number] = [92, 104];
  const comeIn = (name: string, at: [number, number], color: string): SignPart => ({
    name,
    svg: someone(at[0], at[1], 1.6, color),
    keys: track({
      xy: [
        [0.022, -56, 0],
        [0.08, 0, 0]
      ]
    })
  });
  return {
    kind: "not-for-those-who-ask",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(84, 16) },
      { name: "a cloud", svg: cloud(122, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the open ground before the masjid", svg: plainLand("#E2CB9C", [[18, 117], [82, 118], [150, 116]]) },
      {
        name: "a town far off on the land",
        svg: ([
          [14, 77, 16, 12],
          [23, 76.4, 14, 11],
          [31, 77.2, 16, 13],
          [39, 76.6, 14, 10]
        ] as [number, number, number, number][])
          .map(([x, y, w, h]) => big(home(x, y, w, h), x, y, 0.42))
          .join("")
      },
      { name: "the masjid", svg: madinahMasjid(112, 92, 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      comeIn("al-Ash'ari's place: coming in", musa, VOICE_OF_UMAR),
      comeIn("the first one's place: coming in", first, ITS_VOICE),
      comeIn("the second one's place: coming in", second, FOLK),
      { name: "al-Ash'ari's voice: two of my tribe and I", svg: arcs(n(musa[0] + 3.4), n(musa[1] - 2.8), VOICE_OF_UMAR), keys: showFor(0.086, 0.092, 0.17, 0.176), loop: speaking },
      { name: "the first one's voice: appoint me as a governor", svg: arcs(n(first[0] + 3.4), n(first[1] - 2.8), ITS_VOICE), keys: showFor(0.22, 0.226, 0.38, 0.386), loop: speaking },
      { name: "asking for it: a dashed way from the first one's place toward the town", svg: way(`M${first[0] - 2.4} ${first[1] - 1.4} Q60 84 42 79`, "#FFF0C4"), keys: showFor(0.32, 0.332, 0.62, 0.64) },
      { name: "the authority of ruling over it: a soft pale ring about the town", svg: care(27, 74.6, 16, 4.6, "#FFF3CF"), keys: showAt(0.336, 0.348), loop: soft },
      { name: "the second one's voice: and so did the second", svg: arcs(n(second[0] + 3.4), n(second[1] - 2.8), FOLK), keys: showFor(0.456, 0.462, 0.492, 0.498), loop: speaking },
      { name: "asking for it too: a dashed way from the second one's place toward the town", svg: way(`M${second[0] - 1.4} ${second[1] - 2.2} Q88 78 31 76.4`, "#FFF0C4"), keys: showFor(0.47, 0.482, 0.62, 0.64) },
      { name: "his voice: we do not assign it", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.504, 0.51, 0.95, 0.956), loop: speaking },
      { name: "not to those who ask for it: a grey dashed ring about the first one's place", svg: greyRing(first[0], first[1], 3.6, 2), keys: showAt(0.752, 0.764) },
      { name: "nor to those keen to have it: a grey dashed ring about the second one's place", svg: greyRing(second[0], second[1], 3.6, 2), keys: showAt(0.894, 0.906) }
    ],
    words: linesOn(SEVEN, [
      "Abu Musa: I came in to him with two men",
      "Of my tribe. One of the two men said:",
      "Appoint me as a governor,",
      "And so did the second. He said:",
      "We do not assign the authority of ruling",
      "To those who ask for it,",
      "Nor to those who are keen to have it."
    ])
  };
}

export const RAISED_ART = {
  "raised-by-this-book": raisedByThisBook,
  "his-real-wealth": hisRealWealth,
  "umar-knew-adi": umarKnewAdi,
  "every-year": everyYear,
  "in-seven-days": inSevenDays,
  "not-for-those-who-ask": notForThoseWhoAsk
} as const;
