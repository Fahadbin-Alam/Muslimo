import { cloud, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, farOff, gardenIn, lightIn, palms, track } from "./daysArt";
import { soft, spark, speaking } from "./fastArt";
import { dayLit, showAt, showFor, SOFT_GOLD, weekDay } from "./roadArt";
import { EIGHT, FOLK, glints, ITS_VOICE, linesOn, mat, places, plainLand, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { kabah } from "./historyArt";
import { GREY } from "./lovedArt";
import { at3 } from "./storyArt";
import { puffs, smallLight, twoStay } from "./hourArt";

/**
 * Steady in faith and worship: many prostrations, each raising a degree and removing a sin; haya, a part of faith;
 * "do not become angry", said again and again; Sa'd, a third of Islam for seven days; Anas, ten years old when he came
 * to Madinah, and serving him for ten years; the words of praise for which the doors were opened; and the seven rounds
 * of the Ka'bah, two rak'ahs behind the Maqam and the seven rounds between Safa and Marwah. Only the land, the sky,
 * buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot,
 * a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle
 * goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer or
 * praise is a spark that rises, what is good is a light, glints and a soft golden ring. Paradise is only far off, in a
 * soft circle of light with no sun in it. No name, word or number is written.
 */

/** The words of eight lines, the sixth and seventh a little longer. */
const EIGHT_LONGER = [
  [0.02, 0.125],
  [0.137, 0.242],
  [0.254, 0.359],
  [0.371, 0.476],
  [0.488, 0.593],
  [0.605, 0.73],
  [0.742, 0.877],
  [0.889, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of four lines, the third longer: seven days. */
const FOUR_DAYS = [
  [0.02, 0.22],
  [0.236, 0.44],
  [0.456, 0.76],
  [0.776, 1]
] as const;

/** The words of five lines, the second and the last longer: the rounds. */
const ROUNDS = [
  [0.02, 0.125],
  [0.141, 0.42],
  [0.436, 0.541],
  [0.557, 0.662],
  [0.678, 1]
] as const;

/** A low hill from x0 to x1 on y `foot`, its top at `top`. */
const hill = (x0: number, x1: number, top: number, foot: number) => {
  const mid = n((x0 + x1) / 2);
  return (
    `<path d="M${x0} ${foot} C${n(x0 + 4)} ${n(top + 8)} ${n(mid - 8)} ${top} ${mid} ${top} C${n(mid + 8)} ${top} ${n(x1 - 4)} ${n(top + 8)} ${x1} ${foot} Z" fill="#A9896A"/>` +
    `<path d="M${mid} ${top} C${n(mid + 8)} ${top} ${n(x1 - 4)} ${n(top + 8)} ${x1} ${foot} L${mid} ${foot} Z" fill="#000000" opacity="0.1"/>` +
    `<ellipse cx="${n(mid - 5)}" cy="${n(top + 6)}" rx="2.4" ry="1.3" fill="#94775A"/>`
  );
};

// Many prostrations. Ma'dan said: I met Thawban, the freed servant of the Messenger of Allah ﷺ, and asked him to tell
// me about an act for which, if I do it, Allah will admit me to Paradise. He gave no reply. I asked again and he gave no
// reply. I asked him for the third time, and he said: I asked the Messenger of Allah ﷺ about that and he said: make
// frequent prostrations before Allah, for you will not make one prostration without its raising you a degree and
// removing a sin from you. Ma'dan said: then I met Abu ad-Darda, and when I asked him, he gave me a reply like that of
// Thawban (Sahih Muslim 488). No one is drawn: a lane between homes, with a palm. Thawban's place and Ma'dan's place are
// on the left. Ma'dan's voice asks, and far off a soft circle of light with a garden in it shows: Paradise. Thawban's
// place is quiet; Ma'dan's voice asks again, and a third time, and then Thawban's voice speaks. His place, a golden ring,
// shows in a soft light as Thawban tells of it, and his voice speaks. A mat shows, and a place on it goes low and rises,
// again and again: prostrations. A faint stair shows by the mat, with a small light on its first step, and a grey puff by
// the place; the place goes low, the small light goes up a step and the step lights, and the grey puff fades away: a
// degree raised and a sin removed. Then a dashed way goes from Ma'dan's place to Abu ad-Darda's place on the right, its
// voice speaks, and glints come about the mat and the stair: the same reply.
function manyProstrations(): SignArt {
  const thawban: [number, number] = [24, 106];
  const madan: [number, number] = [40, 107];
  const his: [number, number] = [72, 99];
  const onMat: [number, number] = [98, 106.6];
  const abuDarda: [number, number] = [146, 106];
  const stair = "M108 112 L108 109 L114 109 L114 106 L120 106 L120 103 L126 103 L126 100 L132 100";
  const askOf = (name: string, from: number, gone: number): SignPart => ({
    name,
    svg: arcsLeft(n(madan[0] - 3.2), n(madan[1] - 2.8), ITS_VOICE),
    keys: showFor(from, at3(from + 0.006), at3(gone - 0.006), gone),
    loop: speaking
  });
  return {
    kind: "many-prostrations",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(146, 16) },
      { name: "a cloud", svg: cloud(52, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "Paradise, far off: a soft circle of light with a garden in it", svg: farOff(118, 28, 9) + gardenIn(118, 28, 9), keys: showAt(0.14, 0.158), loop: soft },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[60, 116], [120, 117], [154, 115]]) },
      { name: "homes along the lane", svg: home(12, 96, 16, 12) + home(150, 96, 16, 12) + home(56, 92, 12, 9) },
      ...palms([[92, 93, 13]], "the lane"),
      { name: "Thawban's place", svg: someone(thawban[0], thawban[1], 1.6, FOLK) },
      { name: "Ma'dan's place", svg: someone(madan[0], madan[1], 1.6, ITS_VOICE) },
      askOf("Ma'dan's voice: asking of an act for Paradise", 0.024, 0.202),
      askOf("Ma'dan's voice: asking again", 0.29, 0.316),
      askOf("Ma'dan's voice: asking a third time", 0.384, 0.41),
      { name: "Thawban's voice: telling of it", svg: arcs(n(thawban[0] + 3.2), n(thawban[1] - 2.8), FOLK), keys: showFor(0.418, 0.424, 0.89, 0.896), loop: speaking },
      { name: "his place, a golden ring, as Thawban tells of it", svg: ring(his[0], his[1], 2.6, GOLD), keys: showAt(0.49, 0.504) },
      { name: "a soft light about his place", svg: wash(his[0], his[1], 9, 5, WARM, 0.14), keys: showAt(0.492, 0.506), loop: soft },
      { name: "his voice: make frequent prostrations", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.536, 0.542, 0.89, 0.896), loop: speaking },
      { name: "a mat", svg: mat(onMat[0], 110, 12), keys: showAt(0.607, 0.615) },
      { name: "a sin: a grey puff by the place on the mat, fading away", svg: puffs([[90, 103.4]], GREY, 0.85), keys: showFor(0.746, 0.756, 0.778, 0.806) },
      {
        name: "a place on the mat, going low and rising: prostrations",
        svg: someone(onMat[0], onMat[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.607, 0],
            [0.615, 1]
          ],
          xy: [
            [0.622, 0, 0],
            [0.63, 0, 1.8],
            [0.642, 0, 1.8],
            [0.65, 0, 0],
            [0.662, 0, 0],
            [0.67, 0, 1.8],
            [0.68, 0, 1.8],
            [0.688, 0, 0],
            [0.762, 0, 0],
            [0.77, 0, 1.8],
            [0.814, 0, 1.8],
            [0.822, 0, 0]
          ]
        })
      },
      { name: "degrees: a faint stair by the mat", svg: `<path d="${stair}" stroke="#FFF6DC" stroke-width="0.9" fill="none"/>`, keys: showAt(0.744, 0.754) },
      { name: "the step it reaches lights", svg: `<path d="M114 106 L120 106" stroke="#FFE7A0" stroke-width="1.2"/>` + glow(117, 104.6, 3.6, "#FFE7A0", 0.3), keys: showAt(0.796, 0.806), loop: soft },
      {
        name: "a small light on the first step, going up a step: raised a degree",
        svg: smallLight(111, 107.6, 0.9),
        keys: track({
          opacity: [
            [0.744, 0],
            [0.754, 1]
          ],
          xy: [
            [0.776, 0, 0],
            [0.796, 6, -3]
          ]
        }),
        loop: soft
      },
      { name: "a dashed way from Ma'dan's place to Abu ad-Darda's place", svg: way("M43 110 C64 118 120 119 142 109.6"), keys: showAt(0.891, 0.902) },
      { name: "Abu ad-Darda's place", svg: someone(abuDarda[0], abuDarda[1], 1.6, FOLK), keys: showAt(0.894, 0.904) },
      { name: "Abu ad-Darda's voice: a reply like it", svg: arcsLeft(n(abuDarda[0] - 3.2), n(abuDarda[1] - 2.8), FOLK), keys: showAt(0.912, 0.918), loop: speaking },
      {
        name: "the same reply: glints about the mat and the stair",
        svg: glints([
          [90, 98],
          [106, 98],
          [126, 95],
          [134, 104]
        ]),
        keys: showAt(0.928, 0.94),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT_LONGER, [
      "Ma'dan: I asked Thawban about an act",
      "For which Allah will admit me to Paradise.",
      "Thawban gave no reply; I asked again,",
      "No reply; the third time, Thawban said:",
      "I asked him about that, and he said:",
      "Make frequent prostrations to Allah;",
      "Each raises you a degree, removes a sin.",
      "Then Abu ad-Darda gave a similar reply."
    ])
  };
}

// Haya is a part of faith. Abdullah ibn Umar said: once the Messenger of Allah ﷺ passed by a man of the Ansar who was
// admonishing his brother regarding haya. On that the Messenger of Allah ﷺ said: leave him, as haya is a part of faith
// (Sahih al-Bukhari 24). No one is drawn: a lane of Madinah between homes and palms. Ibn Umar's place is on the left,
// and his voice tells of it. His place, a golden ring, comes along the lane from the right, passing by the Ansari's
// place and the place of the one it is admonishing. The Ansari's voice speaks to the other, and a soft rosy glow comes
// about the other's place: its haya. His voice speaks, and the Ansari's voice stops. Then a light comes within the
// other's place: faith, and a soft golden ring and glints come about it.
function hayaIsFaith(): SignArt {
  const ibnUmar: [number, number] = [22, 108];
  const ansari: [number, number] = [62, 106];
  const other: [number, number] = [78, 107];
  const his: [number, number] = [100, 108];
  return {
    kind: "haya-is-faith",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "a cloud", svg: cloud(110, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 117], [120, 116], [150, 117]]) },
      { name: "homes of Madinah along the lane", svg: home(12, 98, 18, 13) + home(34, 96.6, 14, 10) + home(128, 96.6, 14, 10) + home(150, 98, 18, 13) },
      ...palms(
        [
          [52, 96, 15],
          [112, 96, 14]
        ],
        "Madinah"
      ),
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.6, ITS_VOICE) },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(n(ibnUmar[0] + 3.2), n(ibnUmar[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.2, 0.208), loop: speaking },
      { name: "the Ansari's place", svg: someone(ansari[0], ansari[1], 1.6, FOLK) },
      { name: "its haya: a soft rosy glow about the place of the one admonished", svg: wash(other[0], other[1], 5, 3.4, "#F4B6B0", 0.18), keys: showAt(0.3, 0.32), loop: soft },
      { name: "the place of the one admonished", svg: someone(other[0], other[1], 1.6, FOLK) },
      { name: "the Ansari's voice: admonishing it regarding haya", svg: arcs(n(ansari[0] + 3.2), n(ansari[1] - 2.8), FOLK), keys: showFor(0.27, 0.278, 0.52, 0.528), loop: speaking },
      {
        name: "his place, a golden ring, passing by along the lane",
        svg: ring(150, 109, 2.6, GOLD),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.06, 1]
          ],
          xy: [
            [0.06, 0, 0],
            [0.15, -50, -1]
          ]
        })
      },
      { name: "his voice: leave him", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.54, 0.548), loop: speaking },
      { name: "faith: a light within the place of the one admonished", svg: lightIn(other[0], other[1], 3.4), keys: showAt(0.77, 0.784), loop: soft },
      { name: "a part of faith: a soft golden ring about it", svg: care(other[0], n(other[1] + 0.4), 5.4, 3.2, SOFT_GOLD), keys: showAt(0.79, 0.804), loop: soft },
      {
        name: "glints about it",
        svg: glints([
          [n(other[0] - 6), n(other[1] - 5)],
          [n(other[0] + 6), n(other[1] - 4.6)],
          [other[0], n(other[1] - 7)]
        ]),
        keys: showAt(0.82, 0.834),
        loop: twinkle()
      }
    ],
    words: linesOn(FOUR, ["Ibn Umar: he passed by an Ansari", "Admonishing a brother regarding haya.", "On that he said: leave him,", "As haya is a part of faith."])
  };
}

// Do not become angry. Abu Hurairah said: a man said to the Prophet ﷺ: advise me! He said: do not become angry. The man
// asked again and again, and he said in each case: do not become angry (Sahih al-Bukhari 6116). No one is drawn: by the
// masjid of Madinah, with palms. His place, a golden ring, is before the masjid, and Abu Hurairah's place is by it; Abu
// Hurairah's voice tells of it. The asker's place comes from the right, and its voice asks. His voice answers; a short
// jagged red line shows over the asker's place: anger, and it smooths into a calm soft wave. The asker's voice asks
// again and again, and his voice answers each time. Then his voice speaks once more, and a cool soft ring and glints
// come about the asker's place: calm.
function doNotGetAngry(): SignArt {
  const his: [number, number] = [66, 104];
  const abuHurairah: [number, number] = [40, 109];
  const asker: [number, number] = [96, 106];
  const asks = (i: number, from: number): SignPart => ({
    name: `the asker's voice: asking again ${i}`,
    svg: arcsLeft(n(asker[0] - 3.2), n(asker[1] - 2.8), FOLK),
    keys: showFor(from, at3(from + 0.006), at3(from + 0.024), at3(from + 0.03)),
    loop: speaking
  });
  const answers = (i: number, from: number): SignPart => ({
    name: `his voice: in each case ${i}`,
    svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD),
    keys: showFor(from, at3(from + 0.006), at3(from + 0.024), at3(from + 0.03)),
    loop: speaking
  });
  return {
    kind: "do-not-get-angry",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(80, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[70, 116], [120, 117], [150, 116]]) },
      ...palms(
        [
          [118, 99, 15],
          [134, 100, 17],
          [150, 99, 14]
        ],
        "Madinah"
      ),
      { name: "the masjid", svg: madinahMasjid(4, 100, 1) },
      { name: "his place, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.6, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 3.2), n(abuHurairah[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.15, 0.158), loop: speaking },
      {
        name: "the asker's place, coming to him",
        svg: someone(asker[0] + 40, asker[1] + 1, 1.6, FOLK),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.06, 1]
          ],
          xy: [
            [0.06, 0, 0],
            [0.14, -40, -1]
          ]
        })
      },
      { name: "the asker's voice: advise me", svg: arcsLeft(n(asker[0] - 3.2), n(asker[1] - 2.8), FOLK), keys: showFor(0.22, 0.228, 0.258, 0.266), loop: speaking },
      { name: "his voice: do not become angry", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.276, 0.284, 0.34, 0.348), loop: speaking },
      {
        name: "anger: a short jagged red line over the asker's place",
        svg: `<path d="M90 99.4 L92 97.8 L94 99.4 L96 97.8 L98 99.4 L100 97.8 L102 99.4" stroke="#B5544E" stroke-width="0.8" fill="none" stroke-linejoin="round"/>`,
        keys: showFor(0.29, 0.298, 0.318, 0.332)
      },
      {
        name: "calm: the line smooths into a soft wave",
        svg: `<path d="M90 98.6 C92 97.6 94 99.6 96 98.6 C98 97.6 100 99.6 102 98.6" stroke="#8FBEDC" stroke-width="0.8" fill="none"/>`,
        keys: showAt(0.32, 0.334),
        loop: soft
      },
      asks(1, 0.416),
      asks(2, 0.462),
      asks(3, 0.508),
      answers(1, 0.612),
      answers(2, 0.656),
      answers(3, 0.7),
      { name: "his voice: do not become angry, once more", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showAt(0.808, 0.816), loop: speaking },
      {
        name: "calm: a cool soft ring about the asker's place",
        svg: `<ellipse cx="${asker[0]}" cy="${n(asker[1] + 0.4)}" rx="5.2" ry="3" stroke="#8FBEDC" stroke-width="0.8" fill="#CFE6F5" fill-opacity="0.25"/>`,
        keys: showAt(0.83, 0.846),
        loop: soft
      },
      {
        name: "glints of calm about it",
        svg: glints(
          [
            [n(asker[0] - 8), n(asker[1] - 5)],
            [n(asker[0] + 8), n(asker[1] - 5)],
            [asker[0], n(asker[1] - 13.4)]
          ],
          0.9,
          "#E6F3FB"
        ),
        keys: showAt(0.86, 0.874),
        loop: twinkle()
      }
    ],
    words: linesOn(FIVE, ["Abu Hurairah: a man said to him:", "Advise me! He said: do not become angry.", "The man asked again and again,", "And he said in each case:", "Do not become angry."])
  };
}

// A third of Islam. Sa'd ibn Abi Waqqas said: no man embraced Islam before the day on which I embraced Islam, and I
// remained for seven days as one third of the then extant Muslims (Sahih al-Bukhari 3727). No one is drawn: a valley of
// Makkah among its mountains, with homes and the Ka'bah far off. Sa'd's place is in the valley, and his voice tells of
// it as the sun rises: the day. A small light comes within Sa'd's place, a soft golden ring comes about it, and a spark
// rises: he embraced Islam. Seven small circles show in the sky and light one by one: seven days. Then a band in three
// equal parts shows over Sa'd's place, and one part lights, with a soft golden ring and glints about it: one third.
function aThirdOfIslam(): SignArt {
  const sad: [number, number] = [60, 106];
  const days = [44, 56, 68, 80, 92, 104, 116];
  const [cx, cy] = [60, 88];
  const thirds =
    `<rect x="${cx - 9}" y="${n(cy - 2.2)}" width="18" height="4.4" rx="1" fill="#FFFFFF" fill-opacity="0.45" stroke="#B8A27A" stroke-width="0.6"/>` +
    `<path d="M${cx - 3} ${n(cy - 2.2)} L${cx - 3} ${n(cy + 2.2)} M${cx + 3} ${n(cy - 2.2)} L${cx + 3} ${n(cy + 2.2)}" stroke="#B8A27A" stroke-width="0.6"/>`;
  const oneThird = `<rect x="${cx - 9}" y="${n(cy - 2.2)}" width="6" height="4.4" rx="1" fill="#FFE07A" stroke="#B8A27A" stroke-width="0.6"/>`;
  return {
    kind: "a-third-of-islam",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C9E4F5", "#EAF2F6", 62) },
      {
        name: "the sun, rising: the day",
        svg: sun(132, 66),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.14, 0, -36]
          ]
        })
      },
      { name: "a cloud", svg: cloud(30, 30, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [18, 16, 26],
            [60, 12, 22],
            [104, 18, 28],
            [142, 22, 28]
          ],
          66,
          "#A88E6A",
          false
        )
      },
      { name: "the valley", svg: plainLand("#E6D3A8", [[20, 116], [96, 117], [146, 115]]) },
      { name: "homes of Makkah", svg: home(16, 90, 12, 8) + home(31, 88.6, 10, 7) + home(126, 90, 12, 8) + home(144, 91.4, 10, 7) },
      { name: "the Ka'bah, far off", svg: kabah(84, 88, 9) },
      { name: "Sa'd's place", svg: someone(sad[0], sad[1], 1.8, ITS_VOICE) },
      { name: "Sa'd's voice: telling of it", svg: arcs(n(sad[0] + 3.4), n(sad[1] - 3), ITS_VOICE), keys: showFor(0.024, 0.032, 0.17, 0.178), loop: speaking },
      { name: "Islam: a small light within Sa'd's place", svg: lightIn(sad[0], sad[1], 3.6), keys: showAt(0.25, 0.264), loop: soft },
      { name: "a soft golden ring about Sa'd's place", svg: care(sad[0], n(sad[1] + 0.4), 5.4, 3.2, SOFT_GOLD), keys: showAt(0.27, 0.284), loop: soft },
      spark("embracing Islam: a spark rising from Sa'd's place", sad[0], 101, 0.3, 0.38),
      { name: "seven days: seven small circles in the sky", svg: days.map((x) => weekDay(x, 14)).join(""), keys: showAt(0.458, 0.47) },
      ...days.map((x, k): SignPart => {
        const at = at3(0.48 + k * 0.034);
        return { name: `day ${k + 1} lights`, svg: dayLit(x, 14, "#FFF0B8"), keys: showAt(at, at3(at + 0.01)) };
      }),
      { name: "a band in three parts, over Sa'd's place", svg: thirds, keys: showAt(0.778, 0.79) },
      { name: "one third: one part lights", svg: oneThird, keys: showAt(0.8, 0.814), loop: soft },
      { name: "a soft golden ring about the lit third", svg: care(cx - 6, cy, 4.8, 4.4, SOFT_GOLD), keys: showAt(0.83, 0.844), loop: soft },
      {
        name: "glints about the lit third",
        svg: glints([
          [cx - 13, cy - 4],
          [cx - 6, cy - 7],
          [cx + 1, cy - 4.4]
        ]),
        keys: showAt(0.86, 0.874),
        loop: twinkle()
      }
    ],
    words: linesOn(FOUR_DAYS, ["Sa'd: no man embraced Islam before the day", "On which I embraced Islam,", "And I remained for seven days", "As one third of the then extant Muslims."])
  };
}

// Ten years of service. Anas ibn Malik said: I was ten years old when the Messenger of Allah ﷺ arrived at Madinah. My
// mother and aunts used to urge me to serve the Prophet ﷺ regularly, and I served him for ten years (Sahih al-Bukhari
// 5166; what the page tells after this is left out). No one is drawn: Madinah, its homes and palms. Anas's small place
// is by his home, and his voice tells of it; ten small lights come over it one by one: ten years old. A road comes into
// the town from the right, and his place, a golden ring, comes along it to the homes of Madinah. The places of Anas's
// family show by his home, and their voices speak to him: urging him. Anas's small place goes to his place and stays
// beside it, and a soft golden ring comes about both: serving him. Then ten small glints come over them one by one: ten
// years.
function tenYearsOfService(): SignArt {
  const anas: [number, number] = [30, 109];
  const family: [number, number][] = [
    [14, 108],
    [8, 113.4],
    [40, 113]
  ];
  const lights = Array.from({ length: 10 }, (_, i): [number, number] => [n(19.6 + i * 2.3), n(102 - 1.6 * Math.sin((Math.PI * i) / 9))]);
  const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="0.75" fill="#FFD24A" stroke="#C8963E" stroke-width="0.2"/>`;
  return {
    kind: "ten-years-of-service",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(80, 16) },
      { name: "a cloud", svg: cloud(126, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[60, 117], [90, 115], [150, 117]]) },
      ...palms(
        [
          [58, 97, 15],
          [72, 98, 13],
          [138, 97, 16],
          [152, 98, 14]
        ],
        "Madinah"
      ),
      { name: "Anas's home", svg: home(24, 98, 18, 13) },
      { name: "homes of Madinah", svg: home(100, 97, 16, 11) + home(118, 98, 14, 10) },
      { name: "the road into Madinah", svg: way("M160 104 C146 106 132 108 114 106.4"), keys: showAt(0.218, 0.23) },
      {
        name: "his place, a golden ring, arriving",
        svg: ring(158, 104, 2.6, GOLD),
        keys: track({
          opacity: [
            [0.222, 0],
            [0.232, 1]
          ],
          xy: [
            [0.232, 0, 0],
            [0.31, -48, 2]
          ]
        })
      },
      {
        name: "Anas's small place",
        svg: someone(anas[0], anas[1], 1.2, ITS_VOICE),
        keys: track({
          xy: [
            [0.612, 0, 0],
            [0.664, 74, -1]
          ]
        })
      },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 2.4), n(anas[1] - 2.2), ITS_VOICE), keys: showFor(0.024, 0.032, 0.15, 0.158), loop: speaking },
      ...lights.map(([x, y], i): SignPart => {
        const at = at3(0.04 + i * 0.011);
        return { name: `ten years old: a small light ${i + 1}`, svg: dot(x, y), keys: showFor(at, at3(at + 0.006), 0.414, 0.426) };
      }),
      { name: "the places of Anas's family, by Anas's home", svg: places(family, 1.6, FOLK), keys: showAt(0.414, 0.428) },
      {
        name: "their voices: urging Anas",
        svg: arcs(n(family[0][0] + 3.2), n(family[0][1] - 2.8), FOLK) + arcsLeft(n(family[2][0] - 3.2), n(family[2][1] - 2.8), FOLK),
        keys: showFor(0.44, 0.448, 0.54, 0.548),
        loop: speaking
      },
      { name: "serving him: a soft golden ring about both places", svg: care(107, 107.4, 8.4, 3.6, SOFT_GOLD), keys: showAt(0.68, 0.696), loop: soft },
      ...Array.from({ length: 10 }, (_, i): SignPart => {
        const at = at3(0.81 + i * 0.012);
        return { name: `ten years: a small light ${i + 1}`, svg: dot(n(95.3 + i * 2.6), 100.4), keys: showAt(at, at3(at + 0.006)) };
      })
    ],
    words: linesOn(FIVE, ["Anas: I was ten years old", "When he arrived at Madinah.", "My mother and aunts used to urge me", "To serve him regularly,", "And I served him for ten years."])
  };
}

// The doors were opened for it. Ibn Umar said: while we were praying with the Messenger of Allah ﷺ, one among the people
// said: Allah is truly great, praise be to Allah in abundance, glory be to Allah in the morning and the evening. The
// Messenger of Allah ﷺ said: who uttered such and such a word? A man among the people said: it is I, Messenger of Allah.
// He said: it surprised me, for the doors of heaven were opened for it. Ibn Umar said: I have not abandoned them since I
// heard the Messenger of Allah ﷺ saying this (Sahih Muslim 601). No one is drawn: by the masjid of Madinah, his place, a
// golden ring, before two rows of places, Ibn Umar's place among them, and glints over the rows: the prayer. Ibn Umar's
// voice tells of it, and one place's voice speaks; three sparks rise from it one after another and stay: its words of
// praise. The glints go: the prayer is done. His voice asks; the place's voice answers, and a soft ring comes about it.
// His voice speaks again, and far up two soft doors show; they open, with a soft light within, and the three sparks rise
// to them and go into the light, with glints about the doors. Then Ibn Umar's voice speaks, and sparks rise from Ibn
// Umar's place one after another: he kept saying them.
function doorsOpenedForIt(): SignArt {
  const his: [number, number] = [94, 100];
  const ibnUmar: [number, number] = [74, 106];
  const sayer: [number, number] = [99, 112.4];
  const rows: [number, number][] = [...[84, 94, 104, 114].map((x): [number, number] => [x, 106]), ...[79, 89, 109].map((x): [number, number] => [x, 112.4])];
  const [dx, dy] = [124, 22];
  const frame =
    `<rect x="${dx - 9}" y="${dy - 10}" width="2" height="21" fill="#D9B24E"/><rect x="${dx + 7}" y="${dy - 10}" width="2" height="21" fill="#D9B24E"/>` +
    `<rect x="${dx - 11}" y="${n(dy - 12.4)}" width="22" height="2.6" rx="0.6" fill="#E3BF5C"/><rect x="${dx - 10}" y="${dy + 11}" width="20" height="1.4" fill="#D9B24E"/>`;
  const within = glow(dx, dy, 6.4, "#FFF3C0", 0.5) + `<rect x="${dx - 7}" y="${n(dy - 9.8)}" width="14" height="20.8" fill="#FFF6D8"/>`;
  const leaf = (side: number) => {
    const x0 = side < 0 ? dx - 7 : dx;
    return (
      `<rect x="${x0}" y="${n(dy - 9.8)}" width="7" height="20.8" fill="${side < 0 ? "#B98A4A" : "#AE8042"}"/>` +
      `<path d="M${n(x0 + 0.8)} ${dy - 4} L${n(x0 + 6.2)} ${dy - 4} M${n(x0 + 0.8)} ${dy + 2} L${n(x0 + 6.2)} ${dy + 2} M${n(x0 + 0.8)} ${dy + 7} L${n(x0 + 6.2)} ${dy + 7}" stroke="#8A6432" stroke-width="0.4"/>` +
      `<circle cx="${n(dx + side * 1.6)}" cy="${n(dy + 0.6)}" r="0.7" stroke="#E3BF5C" stroke-width="0.4" fill="none"/>`
    );
  };
  const opening = { at: [0, 0.66, 0.676, 0.756, 0.78], opacity: [0, 0, 1, 1, 1], scaleX: [1, 1, 1, 1, 0.16] };
  const word = (i: number, from: number, to: number, sx: number, sy: number, ex: number, ey: number): SignPart => ({
    name: `its words of praise: spark ${i}, rising and staying, then rising to the doors`,
    svg: sparkle(sayer[0], n(sayer[1] - 4), 1.6, "#FFE7A0"),
    keys: { at: [0, from, at3(from + 0.005), to, 0.78, 0.81, 0.82], opacity: [0, 0, 1, 1, 1, 1, 0], x: [0, 0, 0, sx, sx, ex, ex], y: [0, 0, -1, sy, sy, ey, ey] },
    loop: twinkle(900)
  });
  return {
    kind: "doors-opened-for-it",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(20, 18) },
      { name: "a cloud", svg: cloud(64, 28, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "far up, a gateway: its posts and lintel", svg: frame, keys: showAt(0.66, 0.676) },
      { name: "the light within the open gateway", svg: within, keys: showAt(0.758, 0.78), loop: soft },
      { name: "far up, the left door, opening", svg: leaf(-1), origin: { x: dx - 7, y: dy }, keys: opening },
      { name: "far up, the right door, opening", svg: leaf(1), origin: { x: dx + 7, y: dy }, keys: opening },
      {
        name: "glints about the open doors",
        svg: glints([
          [n(dx - 12), n(dy - 6)],
          [n(dx + 12), n(dy - 6)],
          [dx, n(dy - 17)]
        ]),
        keys: showAt(0.8, 0.814),
        loop: twinkle()
      },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[60, 117], [130, 116], [150, 117]]) },
      ...palms(
        [
          [140, 98, 15],
          [154, 99, 13]
        ],
        "Madinah"
      ),
      { name: "the masjid", svg: madinahMasjid(4, 100, 1) },
      {
        name: "praying: glints over the rows",
        svg: glints([
          [76, 98],
          [96, 95],
          [116, 98],
          [86, 93.4],
          [106, 93.4]
        ]),
        keys: showFor(0.03, 0.044, 0.508, 0.52),
        loop: twinkle()
      },
      { name: "his place, before the rows", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the rows of places behind him", svg: places(rows, 1.6) },
      { name: "Ibn Umar's place, in the first row", svg: someone(ibnUmar[0], ibnUmar[1], 1.6, ITS_VOICE) },
      { name: "the place of the one who said it, in the second row", svg: someone(sayer[0], sayer[1], 1.6, FOLK) },
      { name: "Ibn Umar's voice: telling of it", svg: arcsLeft(n(ibnUmar[0] - 3.2), n(ibnUmar[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.06, 0.066), loop: speaking },
      { name: "its voice: words of praise", svg: arcs(n(sayer[0] + 3.2), n(sayer[1] - 2.8), FOLK), keys: showFor(0.07, 0.076, 0.45, 0.456), loop: speaking },
      word(1, 0.15, 0.2, -5, -22.4, 22, -82.4),
      word(2, 0.27, 0.32, 3, -26.4, 25, -85.4),
      word(3, 0.39, 0.44, 11, -22.4, 28, -82.4),
      { name: "his voice: who said it?", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.522, 0.528, 0.54, 0.546), loop: speaking },
      { name: "its voice: it is I", svg: arcs(n(sayer[0] + 3.2), n(sayer[1] - 2.8), FOLK), keys: showFor(0.552, 0.558, 0.572, 0.578), loop: speaking },
      { name: "it is I: a soft ring about its place", svg: care(sayer[0], n(sayer[1] + 0.4), 4.6, 2.8, SOFT_GOLD), keys: showAt(0.556, 0.568), loop: soft },
      { name: "his voice: it surprised me", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.632, 0.638, 0.876, 0.882), loop: speaking },
      { name: "Ibn Umar's voice: I have not left them since", svg: arcsLeft(n(ibnUmar[0] - 3.2), n(ibnUmar[1] - 2.8), ITS_VOICE), keys: showAt(0.878, 0.886), loop: speaking },
      spark("he kept saying them: a spark rising from Ibn Umar's place 1", ibnUmar[0], 102, 0.89, 0.915),
      spark("he kept saying them: a spark rising from Ibn Umar's place 2", ibnUmar[0], 102, 0.91, 0.935),
      spark("he kept saying them: a spark rising from Ibn Umar's place 3", ibnUmar[0], 102, 0.93, 0.955)
    ],
    words: linesOn(EIGHT, [
      "Ibn Umar: as we prayed with him, one said:",
      "Allah is truly great, praise be to Allah",
      "In abundance, glory be to Allah in",
      "The morning and the evening.",
      "He asked who said it; one said: it is I.",
      "He said: it surprised me, for the doors",
      "Of heaven were opened for it.",
      "Ibn Umar: I have not abandoned them since."
    ])
  };
}

// Seven rounds. Ibn Umar said: the Prophet ﷺ reached Makkah and performed the seven rounds of the Ka'bah, and then
// offered a two-rak'ah prayer behind Maqam Ibrahim, and then performed the seven rounds between Safa and Marwah (Sahih
// al-Bukhari 1645; the question asked of Ibn Umar, and his last words, which quote an ayah, are left out). No one is
// drawn: Makkah among its mountains, the Ka'bah on its ground with the Maqam, a stone, before it, and the hills of Safa
// and Marwah with the way between them. Ibn Umar's place is on the right, and his voice tells of it. His place, a golden
// ring, comes into Makkah and goes round the Ka'bah seven times with the House on its left, a glint for each round. It
// goes to behind the Maqam, and two sparks rise and stay: two rak'ahs; a soft light and glints come about the Maqam. Then
// it goes to Safa, and between Safa and Marwah seven times, a glint for each going.
function sevenRounds(): SignArt {
  const [kx, ky, kw] = [36, 96, 20];
  const ground = { x: 48, y: 100, rx: 30, ry: 8 };
  const start = 113.6;
  const base: [number, number] = [2, 107];
  const maqam: [number, number] = [64, 103];
  const behind: [number, number] = [64, 110];
  const safa: [number, number] = [106, 99];
  const marwah: [number, number] = [144, 99];
  const on = (deg: number): [number, number] => [ground.x + ground.rx * Math.cos((deg * Math.PI) / 180), ground.y + ground.ry * Math.sin((deg * Math.PI) / 180)];
  const xy: [number, number, number][] = [];
  const goTo = (t: number, [x, y]: [number, number]) => xy.push([at3(t), n(x - base[0]), n(y - base[1])]);
  const STEPS = 8;
  const roundEnds: number[] = [];
  const goEnds: number[] = [];
  goTo(0.032, base);
  goTo(0.08, on(start));
  goTo(0.15, on(start));
  for (let k = 1; k <= 7 * STEPS; k += 1) {
    const t = at3(0.15 + (0.224 * k) / (7 * STEPS));
    goTo(t, on(start - (360 / STEPS) * k));
    if (k % STEPS === 0) roundEnds.push(t);
  }
  goTo(0.438, on(start));
  goTo(0.46, behind);
  goTo(0.68, behind);
  goTo(0.71, safa);
  for (let k = 1; k <= 7; k += 1) {
    const t = at3(0.71 + 0.034 * k);
    goTo(t, k % 2 ? marwah : safa);
    goEnds.push(t);
  }
  return {
    kind: "seven-rounds",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(80, 16) },
      { name: "a cloud", svg: cloud(122, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [14, 16, 24],
            [52, 12, 22],
            [96, 18, 26],
            [138, 14, 24]
          ],
          66,
          "#A88E6A",
          false
        )
      },
      { name: "the land", svg: plainLand("#E6D3A8", [[90, 117], [120, 116], [154, 117]]) },
      { name: "homes of Makkah, far off", svg: home(12, 80, 10, 7) + home(26, 78.6, 9, 6) + home(88, 79, 10, 7) },
      { name: "Safa and Marwah", svg: hill(92, 114, 84, 99) + hill(136, 158, 86, 99) },
      { name: "the way between Safa and Marwah", svg: `<path d="M104 99.4 C116 98.4 132 100.4 146 99.4" stroke="#F4E3BC" stroke-width="3.6" fill="none" stroke-linecap="round"/>` },
      { name: "the ground about the House", svg: `<ellipse cx="${ground.x}" cy="${ground.y}" rx="${ground.rx + 2}" ry="${ground.ry + 2}" fill="#EADFC6"/>` },
      {
        name: "the Maqam: a stone before the House",
        svg: `<rect x="${n(maqam[0] - 2.4)}" y="${n(maqam[1] - 2)}" width="4.8" height="3.4" rx="1.2" fill="#B9A37A" stroke="#8F7A54" stroke-width="0.4"/>`
      },
      { name: "behind the Maqam: a soft light about it", svg: wash(maqam[0], maqam[1], 6, 3.4, WARM, 0.16), keys: showAt(0.56, 0.574), loop: soft },
      {
        name: "his place, a golden ring: going round the House, then between Safa and Marwah",
        svg: ring(base[0], base[1], 2.4, GOLD),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.036, 1]
          ],
          xy
        })
      },
      { name: "the Ka'bah, the House", svg: kabah(kx, ky, kw) },
      { name: "Ibn Umar's place", svg: someone(140, 111, 1.6, ITS_VOICE) },
      { name: "Ibn Umar's voice: telling of it", svg: arcsLeft(136.8, 108.2, ITS_VOICE), keys: showFor(0.022, 0.03, 0.078, 0.085), loop: speaking },
      ...roundEnds.map(
        (end, i): SignPart => ({
          name: `round ${i + 1} of the House: a glint`,
          svg: sparkle(24 + 8 * i, 116.4, 1.4, "#FFE7A0"),
          keys: showAt(at3(end - 0.004), end),
          loop: twinkle()
        })
      ),
      twoStay("two rak'ahs behind the Maqam: two sparks rising, staying", behind[0], 106, 0.466, 0.498, 0, -12),
      {
        name: "glints about the Maqam",
        svg: glints([
          [n(maqam[0] - 6), n(maqam[1] - 4)],
          [n(maqam[0] + 6), n(maqam[1] - 4)],
          [maqam[0], n(maqam[1] - 6.4)]
        ]),
        keys: showAt(0.584, 0.598),
        loop: twinkle()
      },
      ...goEnds.map(
        (end, i): SignPart => ({
          name: `going ${i + 1} between Safa and Marwah: a glint`,
          svg: sparkle(n(110 + 5.6 * i), 104.4, 1.2, "#FFE7A0"),
          keys: showAt(at3(end - 0.004), end),
          loop: twinkle()
        })
      )
    ],
    words: linesOn(ROUNDS, [
      "Ibn Umar: he reached Makkah",
      "And performed seven rounds of the Ka'bah,",
      "Then offered a two-rak'ah prayer",
      "Behind Maqam Ibrahim, then",
      "Seven rounds between Safa and Marwah."
    ])
  };
}

export const STEADY_ART = {
  "many-prostrations": manyProstrations,
  "haya-is-faith": hayaIsFaith,
  "do-not-get-angry": doNotGetAngry,
  "a-third-of-islam": aThirdOfIslam,
  "ten-years-of-service": tenYearsOfService,
  "doors-opened-for-it": doorsOpenedForIt,
  "seven-rounds": sevenRounds
} as const;
