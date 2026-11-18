import { cloud, glow, n, nightSky, palm, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { at3 } from "./storyArt";
import { dish } from "./worthArt";
import { jar } from "./tradeArt";
import { litWindow } from "./heedArt";

/**
 * Sharing: the Ansar, offered land in Bahrain, asked for a similar share for their emigrant brethren, and he said: be
 * patient till you meet me, for after me others will be given preference to you; he asked an Ansari: how is my brother
 * Sa'd ibn Ubadah? and: who amongst you would visit him?, and more than ten walked with him on the barren land to Sa'd;
 * after two rak'ahs of an evening prayer Dhul-Yadayn asked: has the prayer been reduced or have you forgotten?, and he
 * offered two more rak'ahs and a prostration of Sahu; when your servant brings your food, ask him to take one or two
 * handfuls, for he has suffered from its heat; on every Muslim there is enjoined Sadaqa: work and give, help the one in
 * need, enjoin what is good, or refrain from doing evil; an honest Muslim storekeeper who gives in full and with a good
 * heart what he was ordered to give is one of the two charitable persons; and he delayed the Isha prayer until midnight
 * and said: you were in the prayer as long as you were waiting for it. Only the land, the sky, buildings, things, plants
 * and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head or a
 * face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is
 * arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer is a spark that rises,
 * what is good is a light, glints and a soft golden ring. No fire is drawn: heat is a shimmer. No name or word is
 * written.
 */

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The places of the folk: of a town, of a gathering, of a row. */
const FOLK = "#C39A5A";

/** A place at night: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A spark that rises from its place from `from` until `to`, `rise` high, and stays there. */
const sparkStays = (from: number, to: number, rise = 10): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, -1, -rise]
});

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 114], [64, 117], [112, 115], [150, 116]]) => landOf(tufts, fill);

/** `svg` drawn `k` times its size about (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** How far it is from `a` to `b`, as [dx, dy]. */
const rel = (a: [number, number], b: [number, number]): [number, number] => [n(b[0] - a[0]), n(b[1] - a[1])];

/** Dashed places at each of `list`, `r` across, in `color`. */
const places = (list: [number, number][], r = 1.6, color = FOLK) => list.map(([x, y]) => someone(x, y, r, color)).join("");

/** A light mat of palm leaves to sit on, its middle at (x, y), `w` across. */
const mat = (x: number, y: number, w = 8) =>
  `<path d="M${n(x - w / 2)} ${n(y - 1.4)} L${n(x + w / 2)} ${n(y - 1.4)} L${n(x + w / 2 + 1.2)} ${n(y + 1.4)} L${n(x - w / 2 - 1.2)} ${n(y + 1.4)} Z" fill="#E9D7AE"/>` +
  `<path d="M${n(x - w / 2 + 0.6)} ${y} L${n(x + w / 2 - 0.6)} ${y}" stroke="#C9AE7C" stroke-width="0.3"/>`;

/** A little food on a small dish, its middle at (x, y), `s` times its size (3.2 wide). */
const portion = (x: number, y: number, s = 1) =>
  `<path d="M${n(x - 1.6 * s)} ${n(y - 0.4 * s)} Q${x} ${n(y + 0.8 * s)} ${n(x + 1.6 * s)} ${n(y - 0.4 * s)} Z" fill="#B8864A"/><ellipse cx="${x}" cy="${n(y - 0.8 * s)}" rx="${n(1 * s)}" ry="${n(0.5 * s)}" fill="#D9A35E"/>`;

/** An empty bowl of wood, its middle at (x, y). */
const bowl = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${n(y - 1.2)} Q${x} ${n(y + 2)} ${n(x + 2.6)} ${n(y - 1.2)} Z" fill="#9A6A38"/><ellipse cx="${x}" cy="${n(y - 1.2)}" rx="2.6" ry="0.6" fill="#6E4A26"/>`;

/** A few dates in a bowl whose middle is at (x, y). */
const datesIn = (x: number, y: number) =>
  [-1.2, 0, 1.2, -0.6, 0.6].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 1.6 - (i < 3 ? 0 : 0.8))}" rx="0.7" ry="0.55" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`).join("");

/** The words of eight lines, in turn, over the whole scene. */
const EIGHT = [
  [0.02, 0.13],
  [0.142, 0.252],
  [0.264, 0.374],
  [0.386, 0.496],
  [0.508, 0.618],
  [0.63, 0.74],
  [0.752, 0.862],
  [0.874, 1]
] as const;

/** The words of seven lines. */
const SEVEN = [
  [0.02, 0.148],
  [0.164, 0.292],
  [0.308, 0.436],
  [0.452, 0.58],
  [0.596, 0.724],
  [0.74, 0.868],
  [0.884, 1]
] as const;

/** The words of six lines. */
const SIX = [
  [0.02, 0.16],
  [0.176, 0.32],
  [0.336, 0.48],
  [0.496, 0.64],
  [0.656, 0.8],
  [0.816, 1]
] as const;

/** Lines of words on the given times. */
const linesOn = (times: readonly (readonly [number, number])[], lines: string[]) => lines.map((text, i) => ({ text, from: times[i][0], to: times[i][1] }));

// A similar share. Anas ibn Malik said: the Prophet ﷺ called the Ansar in order to give them the territory of Bahrain;
// they said: no, unless you give to our emigrant brethren a similar share; he said: if you do not agree to it, then be
// patient till you meet me, for after me others will be given preference to you (Sahih al-Bukhari 3794). No one is
// drawn: in Madinah, by the masjid, the homes of the Ansar stand on one side and the homes of the emigrants on the
// other, and far off by the sea is the land of Bahrain with its palms. Anas's place is by the masjid, and his voice
// tells of it. His place, a golden ring, calls, and the places of the Ansar come to it from their homes. A piece of
// land in Bahrain is marked out with a soft golden ring, and a faint golden way goes to it from them. Their voice
// answers; a soft golden ring comes about the emigrants' homes, a second piece of land like the first is marked out
// with a way to it from their homes, and a warm glow comes about the Ansar, who asked for their brothers too. His voice
// answers; a soft golden ring of patience comes about the Ansar's places; then sacks go by them, to others; and glints
// come over the Ansar's places, patient.
function aSimilarShare(): SignArt {
  const his: [number, number] = [30, 100];
  const anas: [number, number] = [18, 108];
  const ansarHomes: [number, number, number, number][] = [
    [54, 90, 13, 8.4],
    [70, 92, 13, 8.4],
    [56, 114, 14, 8.4]
  ];
  const emigrantHomes: [number, number, number, number][] = [
    [100, 92, 13, 8.4],
    [116, 93.4, 13, 8.4],
    [132, 91.6, 12, 8],
    [110, 110, 14, 8.4]
  ];
  const doors: [number, number][] = ansarHomes.map(([x, y]) => [n(x - 1.8), n(y + 2.4)]);
  const ansar: [number, number][] = [
    [42, 97],
    [44.6, 101],
    [41.6, 105]
  ];
  const homesOf = (list: [number, number, number, number][], wall: string) => list.map(([x, y, w, h]) => home(x, y, w, h, wall)).join("");
  const plot = (x: number) => `<ellipse cx="${x}" cy="60.2" rx="6.4" ry="1.2" fill="${SOFT_GOLD}" opacity="0.22"/>` + care(x, 60.2, 6.4, 1.2, SOFT_GOLD);
  const goods = [48, 57, 66].map((x) => sack(x, 118.4, 0.8, "#C9A66B")).join("");
  return {
    kind: "a-similar-share",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(22, 16) },
      { name: "a cloud", svg: cloud(76, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118], [88, 117], [150, 116]]) },
      {
        name: "the sea, far off",
        svg:
          `<path d="M100 61.4 Q112 57.2 128 56.4 L160 55.6 L160 61.4 Z" fill="#6FB3DC"/>` +
          `<path d="M114 57.8 q2 -0.8 4 0 M132 57 q2 -0.8 4 0 M150 56.6 q2 -0.8 4 0" stroke="#D8EEF8" stroke-width="0.4" fill="none"/>`,
        loop: { move: "bob", ms: 4200, x: 0.8 }
      },
      { name: "the land of Bahrain, far off by the sea", svg: `<path d="M106 61.6 Q118 58.8 132 58.8 Q146 58.4 160 58.8 L160 61.6 Z" fill="#C9B38C"/>` },
      { name: "the palms of Bahrain, far off", svg: big(palm(112, 60.2, 12), 112, 60.2, 0.32) + big(palm(134, 59.4, 12), 134, 59.4, 0.36) + big(palm(155, 59.6, 12), 155, 59.6, 0.3) },
      { name: "a piece of land in Bahrain, marked out for them", svg: plot(123), keys: showAt(0.15, 0.165), loop: soft },
      { name: "a similar share: a second piece of land, marked out", svg: plot(145), keys: showAt(0.405, 0.415), loop: soft },
      { name: "the hills of Madinah, far off", svg: `<path d="M0 61.4 L0 57.6 Q12 53.4 26 56.2 Q40 52.6 54 56.8 L60 61.4 Z" fill="#C9B38C"/>` },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 92, 0.56) },
      ...palms(
        [
          [40, 82, 14],
          [148, 84, 12]
        ],
        "Madinah"
      ),
      { name: "the homes of the Ansar", svg: homesOf(ansarHomes, "#D3A872") },
      { name: "the homes of the emigrants", svg: homesOf(emigrantHomes, "#D8B07A") },
      { name: "a faint golden way from the Ansar to the land", svg: way("M48 100 C62 102 76 100 82 92 C88 80 104 66 120 61.8", SOFT_GOLD, 0.7), keys: showAt(0.17, 0.19) },
      { name: "a faint golden way from the emigrants' homes to the second piece", svg: way("M119 83.4 C125 76 135 68 143 61.8", SOFT_GOLD, 0.7), keys: showAt(0.42, 0.43) },
      { name: "the emigrants' homes: a soft golden ring", svg: care(116, 98.6, 26, 17, SOFT_GOLD), keys: showAt(0.39, 0.4), loop: soft },
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.5, ITS_VOICE) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 3.4), n(anas[1] - 1.6), ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.09), loop: speaking },
      { name: "his voice: calling the Ansar", svg: arcs(n(his[0] - 1), n(his[1] - 5.6), GOLD), keys: showFor(0.03, 0.04, 0.15, 0.16), loop: speaking },
      ...doors.map(
        (from, i): SignPart => ({
          name: `the place of one of the Ansar ${i + 1}`,
          svg: someone(from[0], from[1], 1.6, FOLK),
          keys: track({
            xy: [
              [0.04, 0, 0],
              [0.086, ...rel(from, ansar[i])]
            ]
          })
        })
      ),
      { name: "the voice of the Ansar: no, unless you give", svg: arcsLeft(41, 91.6, ITS_VOICE), keys: showFor(0.27, 0.28, 0.51, 0.52), loop: speaking },
      { name: "a warm glow about the Ansar, who asked for the emigrants too", svg: wash(43, 101, 7, 6, WARM, 0.12), keys: showAt(0.435, 0.45), loop: soft },
      { name: "his voice: be patient", svg: arcs(n(his[0] - 1), n(his[1] - 5.6), GOLD), keys: showAt(0.525, 0.535), loop: speaking },
      { name: "patience: a soft golden ring about the Ansar's places", svg: care(43.2, 101, 5.6, 7, SOFT_GOLD), keys: showAt(0.64, 0.66), loop: soft },
      {
        name: "after him: sacks going by the Ansar, to others",
        svg: goods,
        keys: track({
          opacity: [
            [0.752, 0],
            [0.758, 1],
            [0.812, 1],
            [0.82, 0]
          ],
          xy: [
            [0.758, 0, 0],
            [0.81, 80, 0]
          ]
        })
      },
      { name: "glints over the Ansar's places, patient", svg: glints(ansar.map(([x, y]) => [n(x + 1.4), n(y - 3.6)]), 1.3), keys: showAt(0.88, 0.9), loop: twinkle() }
    ],
    words: linesOn(EIGHT, [
      "Anas: once he called the Ansar",
      "to give them the territory of Bahrain.",
      "They said: No, unless you give",
      "to our emigrant brethren a similar share.",
      "He said: If you do not agree to it,",
      "then be patient till you meet me,",
      "for after me others will be given",
      "preference to you."
    ])
  };
}

// Who will visit him. Abdullah ibn Umar said: while we were sitting with the Messenger of Allah ﷺ, one of the Ansar came
// to him and greeted him, then turned back; he said: O brother of Ansar, how is my brother Sa'd ibn Ubadah? He said: he
// is better. He said: who amongst you would visit him? He stood up and we got up along with him, and we were more than
// ten; we had neither shoes, nor socks, nor caps, nor shirts; we walked on the barren land till we came to him, and the
// people around him kept away till he and his Companions came near him (Sahih Muslim 925). No one is drawn: on a mat
// where they sat, his place, a golden ring, and the places of those with him; far off across the barren land, white
// with salt, is Sa'd's home with Sa'd's place at its door. Ibn Umar's voice tells of it. An Ansari's place comes,
// greets, and turns back; his voice asks after Sa'd, and a soft golden ring comes about Sa'd's place; his voice asks
// who will visit him. His place stands and steps forward, the others get up with him, and a glint shows over each of
// them, more than ten. They walk across the barren land, his place first; the places about Sa'd make room, his place
// comes near Sa'd, and a warm light comes about Sa'd's place.
function whoWillVisitHim(): SignArt {
  const his: [number, number] = [43, 101];
  const ibnUmar: [number, number] = [9, 114];
  const sitting: [number, number][] = [
    [9, 98],
    [15, 98],
    [21, 98],
    [27, 98],
    [33, 98],
    [12, 103.6],
    [18, 103.6],
    [24, 103.6],
    [30, 103.6],
    [36, 103.6],
    [24, 109],
    [30, 109]
  ];
  const sad: [number, number] = [137.6, 97.6];
  const sadFolk: [number, number][] = [
    [128, 103],
    [147, 102]
  ];
  const ansari: [number, number] = [110, 99];
  // Those who sat with him: they get up, then walk with him across the barren land and on to Sa'd.
  const going = track({
    xy: [
      [0.546, 0, 0],
      [0.566, 2, -1.2],
      [0.758, 2, -1.2],
      [0.82, 42, -1.2],
      [0.896, 42, -1.2],
      [0.93, 76, -1.2]
    ]
  });
  const crusts = [
    [64, 99, 4, 0.8],
    [78, 104, 5, 1],
    [92, 99.6, 3.6, 0.7],
    [70, 111, 4.4, 0.9],
    [104, 106, 4.8, 0.9],
    [86, 115, 5, 1],
    [116, 113, 3.8, 0.8],
    [112, 99, 3, 0.6]
  ]
    .map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#F3EFE6"/>`)
    .join("");
  return {
    kind: "who-will-visit-him",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(140, 16) },
      { name: "a cloud", svg: cloud(60, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills, far off", svg: `<path d="M0 61.4 L0 57 Q14 51.4 30 55 Q44 50.6 60 55.4 Q70 53 80 56.6 L84 61.4 Z" fill="#C9B38C"/>` },
      { name: "the land", svg: plainLand("#E2CB9C", [[6, 92], [48, 116], [150, 114]]) },
      { name: "the barren land, white with salt", svg: `<path d="M56 96 Q88 92.6 124 96 L128 119.6 L52 119.6 Z" fill="#D7CCB2"/>` + crusts },
      { name: "palms of Madinah", svg: palm(20, 86, 16) + palm(152, 88, 13), origin: { x: 20, y: 86 }, loop: { move: "sway", ms: 5600, angle: 1.2 } },
      { name: "Sa'd's home", svg: home(140, 94, 16, 10) },
      { name: "the mat where they sat", svg: `<rect x="3" y="94.4" width="46" height="18" rx="2" fill="#E9D7AE"/><rect x="5" y="96.4" width="42" height="14" rx="1.4" fill="none" stroke="#C9AE7C" stroke-width="0.5"/>` },
      { name: "Sa'd's place", svg: someone(sad[0], sad[1], 1.8, ITS_VOICE) },
      { name: "a soft golden ring about Sa'd's place", svg: care(sad[0], sad[1], 4.6, 3.2, SOFT_GOLD), keys: showAt(0.27, 0.285), loop: soft },
      ...sadFolk.map(
        (at, i): SignPart => ({
          name: `the place of one of Sa'd's household ${i + 1}, making room`,
          svg: someone(at[0], at[1], 1.6, FOLK),
          keys: track({
            xy: [
              [0.876, 0, 0],
              [0.894, i === 0 ? -6 : 6, i === 0 ? 8.6 : 7]
            ]
          })
        })
      ),
      { name: "a warm light about Sa'd's place", svg: wash(sad[0], sad[1], 9, 5, WARM, 0.14), keys: showAt(0.935, 0.955), loop: soft },
      {
        name: "the Ansari's place: coming, greeting and turning back",
        svg: someone(ansari[0], ansari[1], 1.6, FOLK),
        keys: track({
          opacity: [
            [0.024, 0],
            [0.03, 1]
          ],
          xy: [
            [0.03, 0, 0],
            [0.062, -60, 1],
            [0.142, -60, 1],
            [0.16, -50, -7]
          ]
        })
      },
      { name: "the Ansari's voice: greeting", svg: arcsLeft(48.6, 95.4, ITS_VOICE), keys: showFor(0.064, 0.07, 0.082, 0.088), loop: speaking },
      { name: "his voice: how is Sa'd", svg: arcs(46.6, 98.4, GOLD), keys: showFor(0.164, 0.172, 0.322, 0.332), loop: speaking },
      { name: "his voice: who amongst you would visit him", svg: arcs(46.6, 98.4, GOLD), keys: showFor(0.392, 0.4, 0.51, 0.518), loop: speaking },
      {
        name: "his place: standing up and going first",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.524, 0, 0],
            [0.54, 7, 0],
            [0.758, 7, 0],
            [0.82, 47, 0],
            [0.896, 47, 0],
            [0.93, 86, -0.6]
          ]
        })
      },
      { name: "the places of those who sat with him", svg: places(sitting), keys: going },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.6, ITS_VOICE), keys: going },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(n(ibnUmar[0] + 3), n(ibnUmar[1] - 1.4), ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.09), loop: speaking },
      {
        name: "more than ten: a glint over each of them",
        svg: glints([...sitting, ibnUmar].map(([x, y]) => [n(x + 2), n(y - 3.6)]), 1.1, "#F5B83A"),
        keys: showFor(0.64, 0.655, 0.752, 0.758),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Ibn Umar: one of the Ansar greeted him.",
      "He said: O brother of Ansar, how is",
      "my brother Sa'd ibn Ubadah?",
      "He said: Who amongst you would visit Sa'd?",
      "He stood up and we got up along with him,",
      "and we were more than ten persons.",
      "We walked on the barren land",
      "till we came to Sa'd."
    ])
  };
}

// Has the prayer been reduced. Abu Hurairah said: the Prophet ﷺ offered one of the evening prayers, and he finished it
// after offering two rak'ahs only; he then stood near a piece of wood in front of the masjid and put his hand over it.
// Abu Bakr and Umar were amongst those who were present, but they dared not talk to him about that, and those who were
// in a hurry went out. A man whom he called Dhul-Yadayn said: has the prayer been reduced or have you forgotten? He
// said: neither have I forgotten, nor has the prayer been reduced. He said: certainly you have forgotten. So he offered
// two more rak'ahs and performed taslim, then said takbir and performed a prostration of Sahu, and then another
// (Sahih al-Bukhari 1229). No one is drawn, and no hand: in the masjid of Madinah, under its roof of palm leaves on
// palm trunks, his place, a golden ring, is at the front, with the rows' places behind. Abu Hurairah's voice tells of
// it. A gold mark shows for each rak'ah: two, and glints go to his right and then his left for the taslim. His place
// goes to the piece of wood at the front; a soft golden ring comes about Abu Bakr's place and Umar's, and grows faint:
// they dared not speak; and the places of those in a hurry go out of the door. Dhul-Yadayn's place is marked out and
// his voice asks; two dashed marks show the two rak'ahs not prayed. His place goes back to the front, the two marks
// are filled in gold, glints go to his right and left for the taslim, and two sparks rise: the prostrations.
function hasThePrayerBeenReduced(): SignArt {
  const front: [number, number] = [80, 70];
  const byWood: [number, number] = [124, 73];
  const row1: [number, number][] = [32, 44, 56, 80, 104, 116].map((x): [number, number] => [x, 84]);
  const row2: [number, number][] = [50, 62, 74, 86, 98, 110, 122].map((x): [number, number] => [x, 96]);
  const row3: [number, number][] = [44, 56, 68, 80, 92].map((x): [number, number] => [x, 108]);
  const hurry: [number, number][] = [104, 116, 128].map((x): [number, number] => [x, 108]);
  const abuBakr: [number, number] = [68, 84];
  const umar: [number, number] = [92, 84];
  const dhulYadayn: [number, number] = [128, 84];
  const abuHurairah: [number, number] = [38, 96];
  const marks = [66, 74, 82, 90];
  const mark = (x: number, fill: string) => `<circle cx="${x}" cy="116" r="1.4" fill="${fill}"/>`;
  const dashed = (x: number) => `<circle cx="${x}" cy="116" r="1.4" stroke="#B98F5A" stroke-width="0.6" stroke-dasharray="0.8 0.6" fill="none"/>`;
  const trunks = [8, 40, 72, 104, 136]
    .map((x) => `<rect x="${n(x - 1.4)}" y="10" width="2.8" height="54" fill="#A87444"/>` + [18, 28, 38, 48, 58].map((y) => `<path d="M${n(x - 1.4)} ${y} L${n(x + 1.4)} ${n(y + 0.8)}" stroke="#8A5A33" stroke-width="0.4"/>`).join(""))
    .join("");
  return {
    kind: "has-the-prayer-been-reduced",
    ms: 12000,
    parts: [
      {
        name: "the masjid of Madinah: its wall of mud brick, and its floor",
        svg:
          `<rect width="160" height="64" fill="#C9A878"/>` +
          [18, 28, 38, 48].map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#B48F5E" stroke-width="0.4"/>`).join("") +
          `<rect y="64" width="160" height="56" fill="#E3CFA4"/><path d="M0 64 L160 64" stroke="#A07C52" stroke-width="0.8"/>`
      },
      { name: "the door of the masjid, with the day outside", svg: `<rect x="150" y="90" width="10" height="26" fill="#CFE8F6"/><rect x="150" y="106" width="10" height="10" fill="#E7D3A8"/><path d="M150 116 L150 90 L160 90" stroke="#7C5A36" stroke-width="1.2" fill="none"/>` },
      { name: "the palm trunks that hold up the roof", svg: trunks },
      { name: "the roof of palm leaves", svg: `<rect width="160" height="11" fill="#6E8F3A"/><path d="${Array.from({ length: 20 }, (_, i) => `M${i * 8 + 1} 9 L${i * 8 + 6} 3`).join(" ")}" stroke="#56742B" stroke-width="0.7"/>` },
      { name: "a piece of wood at the front of the masjid", svg: `<rect x="114" y="62.6" width="24" height="2.6" rx="0.6" fill="#8A5A33"/><path d="M117 65.2 L117 69 M135 65.2 L135 69" stroke="#6B4A2E" stroke-width="1"/>` },
      { name: "the places of the rows", svg: places([...row1, ...row2, ...row3], 1.8) },
      { name: "Abu Bakr's place", svg: someone(abuBakr[0], abuBakr[1], 1.8, ITS_VOICE) },
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.8, ITS_VOICE) },
      { name: "Dhul-Yadayn's place", svg: someone(dhulYadayn[0], dhulYadayn[1], 1.8, ITS_VOICE) },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.8, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(abuHurairah[0] - 3), n(abuHurairah[1] - 1.4), ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.09), loop: speaking },
      {
        name: "the places of those in a hurry, going out",
        svg: places(hurry, 1.8),
        keys: track({
          opacity: [
            [0.44, 1],
            [0.452, 0]
          ],
          xy: [
            [0.41, 0, 0],
            [0.45, 30, 0]
          ]
        })
      },
      {
        name: "his place: at the front, by the piece of wood, then at the front again",
        svg: ring(front[0], front[1], 3, GOLD),
        keys: track({
          xy: [
            [0.266, 0, 0],
            [0.29, ...rel(front, byWood)],
            [0.76, ...rel(front, byWood)],
            [0.78, 0, 0]
          ]
        })
      },
      { name: "the first rak'ah: a gold mark", svg: mark(marks[0], "#E8A93A"), keys: showAt(0.05, 0.06) },
      { name: "the second rak'ah: a gold mark", svg: mark(marks[1], "#E8A93A"), keys: showAt(0.146, 0.156) },
      { name: "the taslim after two: a glint to his right", svg: sparkle(n(front[0] + 6), front[1], 1.3, "#FFF3C0"), keys: showFor(0.162, 0.168, 0.178, 0.184), loop: twinkle(900) },
      { name: "the taslim after two: a glint to his left", svg: sparkle(n(front[0] - 6), front[1], 1.3, "#FFF3C0"), keys: showFor(0.186, 0.192, 0.202, 0.208), loop: twinkle(900) },
      {
        name: "a soft golden ring about Abu Bakr's place, then faint",
        svg: care(abuBakr[0], abuBakr[1], 3.6, 2.6, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.3, 0],
            [0.314, 1],
            [0.39, 1],
            [0.404, 0.4]
          ]
        })
      },
      {
        name: "a soft golden ring about Umar's place, then faint",
        svg: care(umar[0], umar[1], 3.6, 2.6, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.3, 0],
            [0.314, 1],
            [0.39, 1],
            [0.404, 0.4]
          ]
        })
      },
      { name: "Dhul-Yadayn's place: a soft golden ring", svg: care(dhulYadayn[0], dhulYadayn[1], 3.6, 2.6, SOFT_GOLD), keys: showAt(0.512, 0.522), loop: soft },
      { name: "Dhul-Yadayn's voice: has the prayer been reduced", svg: arcsLeft(n(dhulYadayn[0] - 2.6), n(dhulYadayn[1] - 2.6), ITS_VOICE), keys: showFor(0.526, 0.534, 0.752, 0.758), loop: speaking },
      { name: "the third rak'ah, not prayed: a dashed mark", svg: dashed(marks[2]), keys: showFor(0.64, 0.652, 0.788, 0.798) },
      { name: "the fourth rak'ah, not prayed: a dashed mark", svg: dashed(marks[3]), keys: showFor(0.656, 0.668, 0.806, 0.816) },
      { name: "the third rak'ah, prayed: a gold mark", svg: mark(marks[2], "#E8A93A"), keys: showAt(0.788, 0.798) },
      { name: "the fourth rak'ah, prayed: a gold mark", svg: mark(marks[3], "#E8A93A"), keys: showAt(0.806, 0.816) },
      { name: "the taslim: a glint to his right", svg: sparkle(n(front[0] + 6), front[1], 1.3, "#FFF3C0"), keys: showAt(0.878, 0.884), loop: twinkle(900) },
      { name: "the taslim: a glint to his left", svg: sparkle(n(front[0] - 6), front[1], 1.3, "#FFF3C0"), keys: showAt(0.888, 0.894), loop: twinkle(900) },
      { name: "the prostration of Sahu: a spark rising", svg: sparkle(n(front[0] - 2), n(front[1] - 4), 1.5, "#FFE7A0"), keys: sparkStays(0.9, 0.92), loop: twinkle(900) },
      { name: "the second prostration: a spark rising", svg: sparkle(n(front[0] + 2), n(front[1] - 4), 1.5, "#FFE7A0"), keys: sparkStays(0.926, 0.946), loop: twinkle(900) }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: he offered one of",
      "the evening prayers, two rak'ahs only.",
      "Abu Bakr and Umar were present,",
      "but they dared not talk to him.",
      "Dhul-Yadayn said: Has the prayer",
      "been reduced or have you forgotten?",
      "So he offered two more rak'ahs,",
      "then taslim and a prostration of Sahu."
    ])
  };
}

// One or two handfuls. Abu Hurairah said: the Prophet ﷺ said: when your servant brings your food to you, if you do not
// ask him to join you, then at least ask him to take one or two handfuls, for he has suffered from its heat and has
// taken pains to cook it nicely (Sahih al-Bukhari 5460). No one is drawn, and no hand, and no fire: by a home, a pot
// stands on its stones with steam rising from it and a shimmer of heat about it, and the cook's place is by it; the
// place of the one the food is for is on a mat at the door. Abu Hurairah's voice tells of it. The cook's place comes
// with the dish and sets it before the mat; a soft light shows an empty place on the mat beside: to sit and eat with
// him. The voice by the mat asks, and one handful, then another, goes from the dish to the cook. The shimmer over the
// pot glows, and a warm ring comes about the cook's place: the heat he bore; then glints come over the dish, nicely
// cooked, and a warm light about the two places.
function oneOrTwoHandfuls(): SignArt {
  const K = 1.5;
  const pot: [number, number] = [30, 100];
  const cook: [number, number] = [48, 104];
  const cookAt: [number, number] = [98, 104];
  const owner: [number, number] = [110, 97.6];
  const beside: [number, number] = [124, 97.6];
  const dishFrom: [number, number] = [56, 105];
  const dishAt: [number, number] = [111, 104.4];
  const dishTop: [number, number] = [dishAt[0], n(dishAt[1] - 2.4)];
  const abuHurairah: [number, number] = [12, 113];
  const potSvg = big(
    [-4, 0, 4].map((dx) => `<ellipse cx="${n(pot[0] + dx)}" cy="${n(pot[1] + 1.4)}" rx="2" ry="1.2" fill="#8C8C86"/>`).join("") +
      `<path d="M${n(pot[0] - 5.6)} ${n(pot[1] - 7)} C${n(pot[0] - 7)} ${n(pot[1] - 2)} ${n(pot[0] - 4)} ${n(pot[1] + 0.6)} ${pot[0]} ${n(pot[1] + 0.6)} C${n(pot[0] + 4)} ${n(pot[1] + 0.6)} ${n(pot[0] + 7)} ${n(pot[1] - 2)} ${n(pot[0] + 5.6)} ${n(pot[1] - 7)} Z" fill="#7A4A2A"/>` +
      `<ellipse cx="${pot[0]}" cy="${n(pot[1] - 7)}" rx="5.8" ry="1.2" fill="#5C3720"/><ellipse cx="${pot[0]}" cy="${n(pot[1] - 7.2)}" rx="4.6" ry="0.8" fill="#9A5B2E"/>`,
    pot[0],
    pot[1],
    K
  );
  const steam = big(
    [-2, 1.4].map((dx, i) => `<path d="M${n(pot[0] + dx)} ${n(pot[1] - 9)} q${i ? -1.6 : 1.6} -2.6 0 -5.2 q${i ? 1.6 : -1.6} -2.6 0 -5.2" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.75" stroke-linecap="round"/>`).join(""),
    pot[0],
    pot[1],
    K
  );
  const shimmer = (high: number, color: string, opacity: number) =>
    big(
      [-4.6, 4.6].map((dx) => `<path d="M${n(pot[0] + dx)} ${n(pot[1] - 3)} q0.8 -1.2 0 -${high / 2} q-0.8 -1.2 0 -${high / 2}" stroke="${color}" stroke-width="0.5" fill="none" opacity="${opacity}"/>`).join(""),
      pot[0],
      pot[1],
      K
    );
  const food = big(dish(dishFrom[0], dishFrom[1]) + `<ellipse cx="${dishFrom[0]}" cy="${n(dishFrom[1] - 1.6)}" rx="2.6" ry="0.9" fill="#9A5B2E"/>`, dishFrom[0], dishFrom[1], K);
  const handful = (i: number): SignPart => {
    const to: [number, number] = i === 0 ? [92, 108.4] : [100, 109.6];
    const t = i === 0 ? 0.606 : 0.642;
    return {
      name: i === 0 ? "one handful, to the cook" : "and two: another handful, to the cook",
      svg: portion(dishTop[0], dishTop[1], 1.5),
      keys: track({
        opacity: [
          [t, 0],
          [at3(t + 0.004), 1]
        ],
        xy: [
          [at3(t + 0.004), 0, 0],
          [at3(t + 0.03), ...rel(dishTop, to)]
        ]
      })
    };
  };
  return {
    kind: "one-or-two-handfuls",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(24, 16) },
      { name: "a cloud", svg: cloud(70, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118], [70, 117], [148, 116]]) },
      { name: "the home", svg: home(120, 90, 34, 20) },
      { name: "a palm by the home", svg: palm(150, 92, 20), origin: { x: 150, y: 92 }, loop: { move: "sway", ms: 5600, angle: 1.2 } },
      { name: "a mat at the door", svg: mat(117, 99.6, 30) },
      { name: "the pot on its stones", svg: potSvg },
      { name: "steam rising from the pot", svg: steam, loop: { move: "bob", ms: 2600, y: -1.2 } },
      { name: "the heat of the cooking: a shimmer about the pot", svg: shimmer(4.8, "#F2B36A", 0.7), loop: { move: "twinkle", ms: 1100, low: 0.4 } },
      { name: "its heat: the shimmer over the pot, stronger", svg: shimmer(9.6, "#F09A3E", 0.9), keys: showAt(0.744, 0.758), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the place of the one the food is for", svg: someone(owner[0], owner[1], 2.2, FOLK) },
      { name: "an empty place on the mat beside: a soft light", svg: someone(beside[0], beside[1], 2.2, SOFT_GOLD) + glow(beside[0], beside[1], 5, "#FFE7A0", 0.22), keys: showAt(0.312, 0.33), loop: soft },
      {
        name: "the dish of food, brought and set before the mat",
        svg: food,
        keys: track({
          xy: [
            [0.168, 0, 0],
            [0.226, ...rel(dishFrom, dishAt)]
          ]
        })
      },
      {
        name: "the cook's place, bringing the food",
        svg: someone(cook[0], cook[1], 2.2, FOLK),
        keys: track({
          xy: [
            [0.168, 0, 0],
            [0.226, ...rel(cook, cookAt)]
          ]
        })
      },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.6, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 3), n(abuHurairah[1] - 1.6), ITS_VOICE), keys: showFor(0.022, 0.03, 0.098, 0.106), loop: speaking },
      { name: "the voice by the mat: take some", svg: arcsLeft(n(owner[0] - 3.4), n(owner[1] - 3.4), ITS_VOICE), keys: showFor(0.456, 0.464, 0.6, 0.606), loop: speaking },
      handful(0),
      handful(1),
      { name: "the heat he bore: a warm ring about the cook's place", svg: care(cookAt[0], cookAt[1], 4.4, 3.2, "#E89A4A"), keys: showAt(0.77, 0.786), loop: soft },
      { name: "cooked nicely: glints over the dish", svg: glints([[n(dishAt[0] - 3), n(dishAt[1] - 6)], [n(dishAt[0] + 3.4), n(dishAt[1] - 6.6)]], 1.3), keys: showAt(0.888, 0.9), loop: twinkle() },
      { name: "a warm light about the two places", svg: wash(105, 102, 16, 7, WARM, 0.12), keys: showAt(0.91, 0.93), loop: soft }
    ],
    words: linesOn(SEVEN, [
      "Abu Hurairah: he said: When your servant",
      "brings your food to you,",
      "if you do not ask him to join you,",
      "then at least ask him to take",
      "one or two handfuls,",
      "for he has suffered from its heat",
      "and has taken pains to cook it nicely."
    ])
  };
}

// Charity on every Muslim. Abu Musa al-Ash'ari said: the Prophet ﷺ said: on every Muslim there is enjoined Sadaqa. They
// said: if one has nothing? He said: he should work with his hands so that he may benefit himself and give in charity.
// They said: if he cannot work? He said: then he should help the oppressed unhappy person. They said: if he does not?
// He said: then he should enjoin what is good. They said: if he does not? He said: then he should refrain from doing
// evil, for that will be considered for him as a Sadaqa (Sahih al-Bukhari 6022). No one is drawn, and no hand: his
// place, a golden ring, with the places of those asking him; Abu Musa's voice tells of it. A glint shows over every
// place: on every Muslim. Their voice asks; a ring shows about the empty bowl of one who has nothing, and his voice
// answers. A hoe works the field; dates show in that one's own bowl, and some go to a poor one's bowl. The hoe goes:
// one who cannot work; that place goes to one in need, whose sack has fallen, and the sack is set up again and the
// soft blue of distress goes. Its voice enjoins what is good, and glints come over the places it speaks to; then a
// soft golden ring comes about it, refraining from evil, with glints: that too is a Sadaqa.
function charityOnEveryMuslim(): SignArt {
  const his: [number, number] = [22, 96];
  const asking: [number, number][] = [
    [40, 92],
    [44, 99],
    [38, 106]
  ];
  const abuMusa: [number, number] = [14, 108];
  const one: [number, number] = [66, 102];
  const helping: [number, number] = [136, 98];
  const itsBowl: [number, number] = [72, 105];
  const poor: [number, number] = [128, 112];
  const poorBowl: [number, number] = [134, 114.6];
  const needy: [number, number] = [146, 94];
  const fallen: [number, number] = [152, 99];
  const hoe = `<path d="M92 92 L100.6 106" stroke="#8A5A33" stroke-width="1.1" stroke-linecap="round"/><path d="M98.6 105.6 L103.6 104.2 L103 107.6 Z" fill="#7C7C7C"/>`;
  const field =
    `<rect x="84" y="97" width="36" height="16" rx="1" fill="#B98A55"/>` +
    [100, 103, 106, 109].map((y) => `<path d="M86 ${y} L118 ${y}" stroke="#9A6E3E" stroke-width="0.6"/>`).join("") +
    [88, 96, 104, 112].map((x) => tuft(x, 99.4, "#7FA34A", 2.4)).join("");
  return {
    kind: "charity-on-every-muslim",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(142, 16) },
      { name: "a cloud", svg: cloud(72, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118], [52, 116], [96, 118]]) },
      { name: "homes of the town", svg: home(56, 86, 14, 9) + home(90, 84, 13, 8.4) + home(140, 85, 14, 9) },
      { name: "a palm of the town", svg: palm(116, 86, 15), origin: { x: 116, y: 86 }, loop: { move: "sway", ms: 5600, angle: 1.2 } },
      { name: "a small field", svg: field },
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of those asking him", svg: places(asking) },
      { name: "al-Ash'ari's place", svg: someone(abuMusa[0], abuMusa[1], 1.5, ITS_VOICE) },
      { name: "al-Ash'ari's voice: telling of it", svg: arcs(n(abuMusa[0] + 3), n(abuMusa[1] - 1.6), ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.09), loop: speaking },
      { name: "his voice: on every Muslim", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 1.6), GOLD), keys: showFor(0.04, 0.05, 0.264, 0.27), loop: speaking },
      { name: "a bowl, empty", svg: bowl(itsBowl[0], itsBowl[1]) },
      { name: "a poor one's bowl", svg: bowl(poorBowl[0], poorBowl[1]) },
      { name: "the place of a poor one", svg: someone(poor[0], poor[1], 1.6, FOLK) },
      { name: "the place of one in need, in distress", svg: someone(needy[0], needy[1], 1.6, FOLK) },
      { name: "the soft blue of distress about it", svg: care(needy[0], needy[1], 3.6, 2.6, "#7FA6D6"), keys: track({ opacity: [[0.682, 1], [0.696, 0]] }), loop: soft },
      {
        name: "its sack, fallen, then set up again",
        svg: sack(fallen[0], fallen[1], 0.7),
        origin: { x: fallen[0], y: fallen[1] },
        keys: track({
          rotate: [
            [0.664, 80],
            [0.68, 0]
          ]
        })
      },
      {
        name: "on every Muslim: a glint over every place",
        svg: glints([...asking, one, poor, needy].map(([x, y]) => [n(x + 2), n(y - 3.4)]), 0.8),
        keys: showFor(0.15, 0.165, 0.27, 0.28),
        loop: twinkle()
      },
      { name: "their voice: if one has nothing", svg: arcsLeft(36.4, 96, ITS_VOICE), keys: showAt(0.272, 0.28), loop: speaking },
      { name: "nothing: a ring about the empty bowl", svg: care(itsBowl[0], n(itsBowl[1] - 0.6), 4, 2.4, "#9A9A9A"), keys: showFor(0.284, 0.296, 0.39, 0.4) },
      { name: "his voice: answering", svg: arcs(n(his[0] - 1), n(his[1] - 6.4), GOLD), keys: showAt(0.3, 0.31), loop: speaking },
      {
        name: "a hoe, working the field, then gone",
        svg: hoe,
        origin: { x: 92, y: 92 },
        keys: track({
          opacity: [
            [0.512, 1],
            [0.524, 0]
          ],
          rotate: [
            [0.39, 0],
            [0.396, -22],
            [0.402, 0],
            [0.408, -22],
            [0.414, 0],
            [0.42, -22],
            [0.426, 0]
          ]
        })
      },
      { name: "to benefit itself: dates in its own bowl", svg: datesIn(itsBowl[0], itsBowl[1]), keys: showAt(0.428, 0.436) },
      {
        name: "and to give in charity: dates going to a poor one's bowl",
        svg: datesIn(104, 104),
        keys: track({
          opacity: [
            [0.436, 0],
            [0.44, 1]
          ],
          xy: [
            [0.44, 0, 0],
            [0.454, ...rel([104, 104], poorBowl)]
          ]
        })
      },
      {
        name: "the place of one who has nothing: working, then going to help",
        svg: someone(one[0], one[1], 1.8, ITS_VOICE),
        keys: track({
          xy: [
            [0.632, 0, 0],
            [0.66, ...rel(one, helping)]
          ]
        })
      },
      { name: "its voice: enjoining what is good", svg: arcsLeft(n(helping[0] - 3.4), n(helping[1] - 2.6), ITS_VOICE), keys: showFor(0.756, 0.766, 0.874, 0.882), loop: speaking },
      { name: "what is good: glints over the places it speaks to", svg: glints([poor, needy].map(([x, y]) => [n(x + 2), n(y - 3.6)]), 1), keys: showAt(0.78, 0.8), loop: twinkle() },
      { name: "refraining from evil: a soft golden ring about its place", svg: care(helping[0], helping[1], 4.2, 3, SOFT_GOLD), keys: showAt(0.884, 0.9), loop: soft },
      { name: "a Sadaqa for it: glints over its place", svg: glints([[n(helping[0] - 2), n(helping[1] - 4.4)], [n(helping[0] + 2.4), n(helping[1] - 3.8)]], 1.1), keys: showAt(0.91, 0.926), loop: twinkle() }
    ],
    words: linesOn(EIGHT, [
      "Abu Musa: he said: On every Muslim",
      "there is enjoined Sadaqa.",
      "If one has nothing? He said: He should",
      "work with his hands and give in charity.",
      "If he cannot work? He said: He should",
      "help the oppressed unhappy person.",
      "Then he should enjoin what is good.",
      "Then he should refrain from doing evil."
    ])
  };
}

// The honest storekeeper. Abu Musa said: the Prophet ﷺ said: an honest Muslim storekeeper who carries out the orders of
// his master and pays fully what he has been ordered to give with a good heart, and pays to that person to whom he was
// ordered to pay, is regarded as one of the two charitable persons (Sahih al-Bukhari 1438). No one is drawn, and no
// hand: a storehouse with its sacks and jars, the storekeeper's place at its door, the owner's place by the owner's
// home, and far along a way the home of the one who is to be paid. Abu Musa's voice tells of it. The owner's voice
// gives the order; a sack by the store is filled to the top, with glints over it: in full; and a warm glow comes about
// the storekeeper's place: with a good heart. A soft golden ring comes about the home of the one to be paid, and the
// storekeeper's place carries the sack along the way and sets it at that door. Then a soft golden ring and glints come
// over the owner's place, one of the two, and over the storekeeper's, the other.
function theHonestStorekeeper(): SignArt {
  const keeper: [number, number] = [26, 102];
  const keeperAt: [number, number] = [124, 105];
  const owner: [number, number] = [60, 90];
  const paid: [number, number] = [146, 104];
  const sackAt: [number, number] = [32, 106];
  const carrying = track({
    xy: [
      [0.528, 0, 0],
      [0.574, 54, 10.4],
      [0.632, 54, 10.4],
      [0.66, ...rel(keeper, keeperAt)]
    ]
  });
  const store =
    `<rect x="6" y="76" width="40" height="22" fill="#C9A070"/><rect x="6" y="76" width="40" height="22" fill="#000000" opacity="0.04"/>` +
    `<rect x="4.6" y="74" width="42.8" height="2.4" fill="#A8804E"/><rect x="20" y="84" width="12" height="14" fill="#4E3420"/>` +
    sack(23.6, 97.6, 0.6, "#C9A66B") +
    jar(28.6, 97.6, 0.6) +
    sack(11, 98, 0.7) +
    jar(16, 98, 0.7, "#A85E34") +
    sack(41, 98, 0.7, "#BF9A5C");
  return {
    kind: "the-honest-storekeeper",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(140, 16) },
      { name: "a cloud", svg: cloud(80, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [60, 118], [104, 102], [154, 116]]) },
      { name: "the storehouse, with its sacks and jars", svg: store },
      { name: "the owner's home", svg: home(72, 86, 18, 11) },
      { name: "the home of the one to be paid", svg: home(140, 100, 16, 10) },
      { name: "a palm by the way", svg: palm(100, 92, 15), origin: { x: 100, y: 92 }, loop: { move: "sway", ms: 5600, angle: 1.2 } },
      { name: "the way", svg: way("M40 108 C64 114 100 112 124 104", "#F4E3BC", 0.9) },
      { name: "the owner's place", svg: someone(owner[0], owner[1], 1.8, FOLK) },
      { name: "the place of the one to be paid", svg: someone(paid[0], paid[1], 1.6, FOLK) },
      { name: "al-Ash'ari's place", svg: someone(10, 112, 1.5, ITS_VOICE) },
      { name: "al-Ash'ari's voice: telling of it", svg: arcs(13, 110.4, ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.09), loop: speaking },
      { name: "the owner's voice: giving the order", svg: arcsLeft(n(owner[0] - 3.4), n(owner[1] - 2), ITS_VOICE), keys: showFor(0.15, 0.16, 0.322, 0.332), loop: speaking },
      {
        name: "a sack, filled to the top, then carried along the way",
        svg: sack(sackAt[0], sackAt[1], 0.8, "#C9A66B"),
        origin: { x: sackAt[0], y: sackAt[1] },
        keys: track({
          scaleY: [
            [0.27, 0.5],
            [0.3, 1]
          ],
          xy: [
            [0.528, 0, 0],
            [0.574, 54, 10.4],
            [0.632, 54, 10.4],
            [0.66, ...rel(keeper, keeperAt)],
            [0.664, ...rel(keeper, keeperAt)],
            [0.68, ...rel(sackAt, [137, 104])]
          ]
        })
      },
      { name: "in full: glints over the sack", svg: glints([[n(sackAt[0] - 1.6), n(sackAt[1] - 7.6)], [n(sackAt[0] + 2), n(sackAt[1] - 7)]], 1), keys: showFor(0.31, 0.32, 0.512, 0.52), loop: twinkle() },
      {
        name: "with a good heart: a warm glow about the storekeeper's place",
        svg: wash(keeper[0], keeper[1], 6, 4, WARM, 0.16),
        keys: track({ opacity: [[0.39, 0], [0.406, 1]], xy: [[0.528, 0, 0], [0.574, 54, 10.4], [0.632, 54, 10.4], [0.66, ...rel(keeper, keeperAt)]] }),
        loop: soft
      },
      { name: "the storekeeper's place", svg: someone(keeper[0], keeper[1], 1.8, ITS_VOICE), keys: carrying },
      { name: "a soft golden ring about the home of the one to be paid", svg: care(141, 100, 13, 7.4, SOFT_GOLD), keys: showAt(0.512, 0.524), loop: soft },
      { name: "one of the two: a soft golden ring about the owner's place", svg: care(owner[0], owner[1], 3.8, 2.8, SOFT_GOLD), keys: showAt(0.756, 0.77), loop: soft },
      { name: "glints over the owner's place", svg: glints([[n(owner[0] - 1.6), n(owner[1] - 4.4)], [n(owner[0] + 2.2), n(owner[1] - 3.8)]], 1), keys: showAt(0.776, 0.79), loop: twinkle() },
      { name: "and the other: a soft golden ring about the storekeeper's place", svg: care(keeperAt[0], keeperAt[1], 3.8, 2.8, SOFT_GOLD), keys: showAt(0.878, 0.892), loop: soft },
      { name: "glints over the storekeeper's place", svg: glints([[n(keeperAt[0] - 1.6), n(keeperAt[1] - 4.4)], [n(keeperAt[0] + 2.2), n(keeperAt[1] - 3.8)]], 1), keys: showAt(0.896, 0.91), loop: twinkle() }
    ],
    words: linesOn(EIGHT, [
      "Abu Musa: he said: An honest Muslim",
      "storekeeper who carries out the orders",
      "of his master and pays fully what he",
      "has been ordered to give with a good heart",
      "and pays to that person to whom",
      "he was ordered to pay,",
      "is regarded as one of the two",
      "charitable persons."
    ])
  };
}

// As long as you were waiting. Anas ibn Malik said: once the Prophet ﷺ delayed the Isha prayer until midnight and then
// came to us; having prayed he faced us and said: the people had prayed and slept, but you were in the prayer as long
// as you were waiting for it (Sahih al-Bukhari 847). No one is drawn: at night, by the masjid of Madinah with a soft
// light in it, the places of those waiting sit in rows; the homes of the town have their windows lit, and the moon is
// low. Anas's voice tells of it. The moon goes up until midnight; his place, a golden ring, comes from his home to the
// front of the rows. A spark of the prayer rises, and his voice speaks. Sparks rise from the homes of the town, and
// their windows go dark one by one, asleep. A soft golden ring comes about the places of those who waited, then glints
// over each, and a warm light over the masjid.
function asLongAsYouWereWaiting(): SignArt {
  const moon: [number, number] = [14, 44];
  const door: [number, number] = [120.2, 98.6];
  const front: [number, number] = [77, 101.4];
  const row1: [number, number][] = [56, 64, 72, 80, 88, 96].map((x): [number, number] => [x, 107]);
  const row2: [number, number][] = [60, 76, 84, 92].map((x): [number, number] => [x, 113]);
  const anas: [number, number] = [68, 113];
  const town: [number, number, number, number][] = [
    [18, 98, 14, 9],
    [36, 104, 12, 8],
    [146, 104, 14, 9]
  ];
  return {
    kind: "as-long-as-you-were-waiting",
    ms: 10000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [30, 10],
          [52, 22],
          [70, 8],
          [96, 18],
          [118, 9],
          [138, 24],
          [152, 12],
          [40, 34],
          [108, 32],
          [128, 44]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the moon, going up until midnight",
        svg: glow(moon[0], moon[1], 9, "#F4EBC8", 0.12) + `<circle cx="${moon[0]}" cy="${moon[1]}" r="4" fill="#F4EBC8"/>`,
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.25, 66, -30]
          ]
        })
      },
      { name: "the land at night", svg: `<rect y="61" width="160" height="59" fill="#2E3556"/><path d="M0 61 L160 61" stroke="#454B6A" stroke-width="0.7"/>` + [[10, 116], [48, 118], [128, 117]].map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("") },
      { name: "the homes of the town", svg: town.map(([x, y, w, h]) => home(x, y, w, h, "#5E5470", "#4E4660", "#2A2438")).join("") },
      ...town.map(
        ([x, y, , h], i): SignPart => ({
          name: `a lit window of the town ${i + 1}, then dark`,
          svg: litWindow(x, y, h),
          keys: track({
            opacity: [
              [at3(0.53 + i * 0.02), 1],
              [at3(0.545 + i * 0.02), 0]
            ]
          })
        })
      ),
      {
        name: "they had prayed: sparks rising from the homes of the town",
        svg: glints(town.map(([x, y, , h]) => [n(x - 3), n(y - h - 3)]), 1.3, "#FFE7A0"),
        keys: sparkStays(0.5, 0.52, 6),
        loop: twinkle(900)
      },
      { name: "asleep: a soft blue hush over the homes of the town", svg: town.map(([x, y, w, h]) => wash(x, n(y - h / 2), n(w * 0.7), n(h * 0.7), "#7FA6D6", 0.1)).join(""), keys: showAt(0.588, 0.598), loop: soft },
      { name: "the masjid of Madinah", svg: madinahMasjid(48, 98, 1.2).replace(/#7E6447/g, "#4E4258").replace(/#D8B98A/g, "#6E6070").replace(/#A9895C/g, "#6A5A60").replace(/#6E8F3A/g, "#3E5240").replace(/#56742B/g, "#2E4030") },
      { name: "a soft light in the masjid", svg: wash(77, 92, 26, 8, "#FFD866", 0.1), loop: soft },
      { name: "his home, by the masjid", svg: home(122, 96, 14, 9, "#5E5470", "#4E4660", "#2A2438") + litWindow(122, 96, 9) },
      { name: "the places of those waiting for the prayer", svg: places([...row1, ...row2], 1.6, LIGHT) },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.6, "#F0C890") },
      { name: "Anas's voice: telling of it", svg: arcsLeft(n(anas[0] - 3), n(anas[1] + 0.4), "#F0C890"), keys: showFor(0.022, 0.03, 0.1, 0.11), loop: speaking },
      {
        name: "his place: coming from his home to the front",
        svg: ring(door[0], door[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.252, 0],
            [0.256, 1]
          ],
          xy: [
            [0.256, 0, 0],
            [0.278, ...rel(door, front)]
          ]
        })
      },
      { name: "the prayer: a spark rising", svg: sparkle(front[0], n(front[1] - 5), 1.6, "#FFE7A0"), keys: sparkStays(0.34, 0.37), loop: twinkle(900) },
      { name: "his voice: facing them", svg: arcs(n(front[0] + 3.4), n(front[1] + 0.6), GOLD), keys: showAt(0.39, 0.4), loop: speaking },
      { name: "in the prayer: a soft golden ring about those who waited", svg: care(76, 110, 26, 7.4, SOFT_GOLD), keys: showAt(0.66, 0.68), loop: soft },
      { name: "as long as they waited: glints over each place", svg: glints([...row1, ...row2, anas].map(([x, y]) => [n(x + 1.8), n(y - 3.4)]), 0.8), keys: showAt(0.82, 0.836), loop: twinkle() },
      { name: "a warm light over the masjid", svg: wash(77, 88, 34, 12, WARM, 0.1), keys: showAt(0.85, 0.87), loop: soft }
    ],
    words: linesOn(SIX, [
      "Anas: once he delayed the Isha prayer",
      "until midnight and then came to us.",
      "Having prayed he faced us and said:",
      "The people had prayed and slept",
      "but you were in the prayer",
      "as long as you were waiting for it."
    ])
  };
}

export const SHARE_ART = {
  "a-similar-share": aSimilarShare,
  "who-will-visit-him": whoWillVisitHim,
  "has-the-prayer-been-reduced": hasThePrayerBeenReduced,
  "one-or-two-handfuls": oneOrTwoHandfuls,
  "charity-on-every-muslim": charityOnEveryMuslim,
  "the-honest-storekeeper": theHonestStorekeeper,
  "as-long-as-you-were-waiting": asLongAsYouWereWaiting
} as const;
