import { cloud, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { basketOfDates, madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, SIX, sparkStays, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { quickSparks } from "./toldArt";
import { farHills } from "./wideArt";
import { coins, jar, stall } from "./tradeArt";

/**
 * The path: the parable of the straight path, with walls at its sides, open doors in them and a curtain on each door,
 * and callers calling; a sitting of much empty talk, closed before getting up with Subhanaka Allahumma wa bihamdika;
 * rushing to good deeds before a trial like a portion of the dark night; and no du'a wasted: what was asked is given,
 * or a harm like it is kept away, as long as it is not for something evil or for cutting the ties of kin. Only the
 * land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn,
 * not even a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it,
 * where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or
 * letter is drawn, and nothing comes down from the sky: what is good is a light, glints, a soft golden ring and sparks
 * that rise, and what is not to be done has a grey dashed ring about it. No name, word or number is written.
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

/** An-Nawwas's place and voice: a slate blue. */
const NAWWAS = "#5A7290";
/** The voices of the two callers: an amber. */
const CALLER = "#B0742E";
/** The place of one who walks the path: a warm brown. */
const WALKS = "#8E6A48";
/** Abu Hurairah's place and voice: a deep teal. */
const ABU_HURAIRAH = "#3E6E7A";
/** The place of the one who sits in the sitting: a violet. */
const SITS = "#6A5E8E";
/** The places of the others in the sitting: a soft brown. */
const OTHERS = "#A08260";
/** Empty talk, and what is not to be done: a grey. */
const GREY = "#8C8C96";
/** The places of the folk who rush to good deeds: a warm brown. */
const FOLK = "#9A7A56";
/** The place of the one whose morning comes first: a plum. */
const MORNING = "#9A5E7A";
/** The place of the one whose evening comes first: a sea green. */
const EVENING = "#4E7E6E";
/** The place of the one who sells: a clay brown. */
const SELLS = "#8E6A48";
/** Jabir's place and voice: an olive brown. */
const JABIR = "#7A6A4E";
/** The places of those who make du'a: a violet, a deep teal and a clay brown. */
const GIVEN = "#6A5E8E";
const KEPT = "#3E6E7A";
const ASKS_EVIL = "#8E6A48";

/** How a voice that speaks from `on` until `off`, for each pair, shows and goes. */
const spoken = (spans: [number, number][]) =>
  spans.flatMap(([on, off]): [number, number][] => [
    [on, 0],
    [at3(on + 0.006), 1],
    [off, 1],
    [at3(off + 0.006), 0]
  ]);

/** A voice that speaks from `on` until `off`, for each pair. */
const voice = (spans: [number, number][]) => track({ opacity: spoken(spans) });

/** The sky, the sun (if any), a cloud, the far hills and the land of Madinah. */
const madinahDay = (sunAt: [number, number] | undefined, cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  ...(sunAt ? [{ name: "the sun", svg: sun(sunAt[0], sunAt[1]) }] : []),
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** A shape through the given corners, filled. */
const shape = (corners: [number, number][], fill: string) => `<path d="M${corners.map(([x, y]) => `${n(x)} ${n(y)}`).join(" L")} Z" fill="${fill}"/>`;

/** A point `f` of the way from `a` to `b`. */
const between = (a: [number, number], b: [number, number], f: number): [number, number] => [n(a[0] + (b[0] - a[0]) * f), n(a[1] + (b[1] - a[1]) * f)];

/** The foot of the left wall, `t` of the way along the path (0 near, 1 far); the right wall's is its mirror. */
const foot = (t: number): [number, number] => [n(44 + 33 * t), n(112 - 48 * t)];

/** How high the walls are, `t` of the way along the path. */
const high = (t: number) => 30 - 23 * t;

/** The doors in each wall, from and to, of the way along it. */
const DOORS: [number, number][] = [
  [0.08, 0.24],
  [0.38, 0.5],
  [0.62, 0.71]
];

/** The corners of a door from `t1` to `t2` along the left wall (or the right): near foot, far foot, far top, near top. */
const doorAt = ([t1, t2]: [number, number], right: boolean): [number, number][] => {
  const side = ([x, y]: [number, number]): [number, number] => (right ? [n(160 - x), y] : [x, y]);
  const [a, b] = [foot(t1), foot(t2)];
  return [side(a), side(b), side([b[0], n(b[1] - 0.72 * high(t2))]), side([a[0], n(a[1] - 0.72 * high(t1))])];
};

/** Every door, the left wall's first. */
const ALL_DOORS = [false, true].flatMap((right) => DOORS.map((d) => doorAt(d, right)));

/** A curtain hanging over a door with the given corners: cloth with two folds, on a rod along its top. */
const curtain = (c: [number, number][]) => {
  const folds = [1 / 3, 2 / 3]
    .map((f) => {
      const [top, low] = [between(c[3], c[2], f), between(c[0], c[1], f)];
      return `M${top[0]} ${top[1]} L${low[0]} ${low[1]}`;
    })
    .join(" ");
  return shape(c, "#8A3E34") + `<path d="${folds}" stroke="#A85A4A" stroke-width="0.35"/>` + `<path d="M${c[3][0]} ${c[3][1]} L${c[2][0]} ${c[2][1]}" stroke="#5A3A26" stroke-width="0.6" stroke-linecap="round"/>`;
};

/** The same curtain lifted: gathered up along its rod. */
const liftedCurtain = (c: [number, number][]) => {
  const [near, far] = [between(c[3], c[0], 0.22), between(c[2], c[1], 0.22)];
  return (
    shape([near, far, c[2], c[3]], "#8A3E34") +
    `<path d="M${between(near, far, 1 / 3).join(" ")} L${between(c[3], c[2], 1 / 3).join(" ")} M${between(near, far, 2 / 3).join(" ")} L${between(c[3], c[2], 2 / 3).join(" ")}" stroke="#A85A4A" stroke-width="0.35"/>` +
    `<path d="M${c[3][0]} ${c[3][1]} L${c[2][0]} ${c[2][1]}" stroke="#5A3A26" stroke-width="0.6" stroke-linecap="round"/>`
  );
};

/** A dashed edge just outside a door with the given corners, in `color`. */
const doorEdge = (c: [number, number][], color: string) => {
  const [cx, cy] = [c.reduce((s, [x]) => s + x, 0) / 4, c.reduce((s, [, y]) => s + y, 0) / 4];
  const out = c.map(([x, y]): [number, number] => [n(cx + (x - cx) * 1.3), n(cy + (y - cy) * 1.14)]);
  return `<path d="M${out.map(([x, y]) => `${x} ${y}`).join(" L")} Z" stroke="${color}" stroke-width="0.6" stroke-dasharray="1 0.9" fill="none"/>`;
};

/** A wall at the side of the path, its inner face toward the path, with its top edge; `right`: the right wall. */
const sideWall = (right: boolean, fill: string) => {
  const side = ([x, y]: [number, number]): [number, number] => (right ? [n(160 - x), y] : [x, y]);
  const [nearFoot, farFoot] = [foot(0), foot(1)];
  const [nearTop, farTop] = [side([nearFoot[0], n(nearFoot[1] - high(0))]), side([farFoot[0], n(farFoot[1] - high(1))])];
  return shape([side(nearFoot), side(farFoot), farTop, nearTop], fill) + `<path d="M${nearTop.join(" ")} L${farTop.join(" ")}" stroke="#A8865A" stroke-width="1.2" stroke-linecap="round"/>`;
};

// A parable of the path. An-Nawwas ibn Sam'an said: the Messenger of Allah ﷺ said: Allah has made a parable of the
// straight path: at the sides of the path there are walls with open doors, each door having a curtain. There is a
// caller at the head of the path calling, and a caller above it calling. ... The doors on the sides of the path are
// the Hudud of Allah; no one breaches the Hudud of Allah except that curtain is lifted (Jami at-Tirmidhi 2859). The
// words leave out the ayah he recited and the last words, and "which are" and "(legal limitations)". No one is
// drawn, and nothing for Allah: on the land, his place, a golden ring, and An-Nawwas's place on the left. An-Nawwas's
// voice tells of it, and his voice, soft and golden, speaks. A straight path shows, running far off, and the place of
// one who walks it goes along it. Walls stand at its sides; open doors show in them, and a curtain comes over each
// door. A caller's voice calls at the head of the path, where it begins, and a caller's voice calls above it; no place
// is drawn for either. The place on the path goes on, straight. The doors are picked out in light, and then a grey
// dashed edge comes about each: the limits. The curtain of the near door on the right is lifted.
function parableOfThePath(): SignArt {
  const nawwas: [number, number] = [11, 105.6];
  const his: [number, number] = [27, 101.4];
  const lifts = ALL_DOORS[3];
  return {
    kind: "parable-of-the-path",
    ms: 12000,
    parts: [
      ...madinahDay([136, 20], [70, 24]),
      ...palms(
        [
          [22, 86, 9],
          [132, 98, 12],
          [150, 90, 10]
        ],
        "the land"
      ),
      {
        name: "the straight path, running far off",
        svg: shape(
          [
            [44, 112],
            [116, 112],
            [83, 64],
            [77, 64]
          ],
          "#EFE0BC"
        ) + `<path d="M80 111 L80 66" stroke="#E2CDA0" stroke-width="0.6" stroke-dasharray="2.4 2.4"/>`,
        keys: showAt(0.124, 0.142)
      },
      {
        name: "the place of one who walks the path, going along it",
        svg: someone(80, 107.6, 1.7, WALKS),
        origin: { x: 80, y: 107.6 },
        keys: track({
          opacity: [
            [0.144, 0],
            [0.15, 1]
          ],
          xy: [
            [0.15, 0, 0],
            [0.19, 0, -13],
            [0.672, 0, -13],
            [0.73, 0, -24]
          ],
          scale: [
            [0.15, 1],
            [0.19, 0.86],
            [0.672, 0.86],
            [0.73, 0.72]
          ]
        })
      },
      { name: "a wall at the left side of the path", svg: sideWall(false, "#CFAF84"), keys: showAt(0.234, 0.256) },
      { name: "a wall at the right side of the path", svg: sideWall(true, "#C4A275"), keys: showAt(0.234, 0.256) },
      { name: "open doors in the walls", svg: ALL_DOORS.map((c) => shape(c, "#4A3424")).join(""), keys: showAt(0.342, 0.354) },
      { name: "a curtain on each door", svg: ALL_DOORS.filter((c) => c !== lifts).map(curtain).join(""), keys: showAt(0.37, 0.39) },
      { name: "a curtain on the near door on the right", svg: curtain(lifts), keys: showFor(0.37, 0.39, 0.89, 0.91) },
      { name: "that curtain lifted", svg: liftedCurtain(lifts), keys: showAt(0.89, 0.91) },
      { name: "the doors on the sides of the path, picked out in light", svg: ALL_DOORS.map((c) => doorEdge(c, "#FFF6DC")).join(""), keys: showFor(0.672, 0.684, 0.78, 0.79) },
      { name: "the limits: a grey dashed edge about each door", svg: ALL_DOORS.map((c) => doorEdge(c, GREY)).join(""), keys: showAt(0.78, 0.792) },
      {
        name: "a caller at the head of the path, where it begins, calling",
        svg: `<g transform="rotate(-90 80 104)">${arcs(80, 104, CALLER)}</g>`,
        keys: voice([[0.452, 0.96]]),
        loop: speaking
      },
      { name: "and a caller above it, calling", svg: arcs(82.4, 72, CALLER) + arcsLeft(77.6, 72, CALLER), keys: voice([[0.562, 0.96]]), loop: speaking },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.066, 0.96]]), loop: speaking },
      { name: "An-Nawwas's place", svg: someone(nawwas[0], nawwas[1], 1.5, NAWWAS) },
      { name: "An-Nawwas's voice: telling of it", svg: arcs(n(nawwas[0] + 2.4), n(nawwas[1] - 3.2), NAWWAS), keys: voice([[0.024, 0.06]]), loop: speaking }
    ],
    words: linesOn(NINE, [
      "An-Nawwas: he said: Allah has made a",
      "Parable of the straight path: at the",
      "Sides of the path there are walls with",
      "Open doors, each door having a curtain.",
      "There is a caller at the head of the path",
      "Calling, and a caller above it calling.",
      "The doors on the sides of the path are the",
      "Hudud of Allah; no one breaches the Hudud",
      "Of Allah except that curtain is lifted."
    ])
  };
}

/** A wide mat of palm leaves for a sitting, its middle at (x, y), `w` across and `h` deep. */
const bigMat = (x: number, y: number, w: number, h: number) =>
  shape(
    [
      [n(x - w / 2 + 3), n(y - h / 2)],
      [n(x + w / 2 - 3), n(y - h / 2)],
      [n(x + w / 2), n(y + h / 2)],
      [n(x - w / 2), n(y + h / 2)]
    ],
    "#E9D7AE"
  ) +
  [0.25, 0.5, 0.75].map((f) => `<path d="M${n(x - w / 2 + 3 - 3 * f)} ${n(y - h / 2 + h * f)} L${n(x + w / 2 - 3 + 3 * f)} ${n(y - h / 2 + h * f)}" stroke="#C9AE7C" stroke-width="0.3"/>`).join("");

// Closing a sitting. Abu Hurairah said: the Messenger of Allah ﷺ said: whoever sits in a sitting and engages in much
// empty, meaningless speech and then says before getting up from that sitting of his: Subhanaka Allahumma wa
// bihamdika, ashhadu an la ilaha illa anta, astaghfiruka wa atubu ilaik, whatever occurred in that sitting would be
// forgiven to him (Jami at-Tirmidhi 3433). The words give his words as the page writes them in Arabic, leave out
// their English, and read "getting up" for the page's "getting". No one is drawn, and no mouth: in Madinah, the
// masjid far off; a mat in the shade of palms, and the places of a sitting on it; his place, a golden ring, and Abu
// Hurairah's place on the left. Abu Hurairah's voice tells of it, and his voice, soft and golden, speaks. The place of
// one comes and sits in the sitting. Grey arcs of empty talk show in the sitting, and more of them. A faint way shows
// from the one's place out of the sitting: before getting up. Its voice, soft and golden, says the words, and with
// each part of them a spark rises. It gets up and goes along the way. The grey arcs of talk are gone: forgiven, and a
// soft golden ring with glints comes about its place.
function closingASitting(): SignArt {
  const abuHurairah: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const sits: [number, number] = [111, 100.8];
  /** Where it comes from, and where it goes when it gets up, from where it sits. */
  const comes: [number, number] = [40, 5.4];
  const goes: [number, number] = [34, 5];
  const others: [number, number][] = [
    [73, 100.8],
    [79, 96.4],
    [92, 95],
    [105, 96.4],
    [84, 104.6],
    [100, 104.6]
  ];
  /** Where a voice of talk shows, above a place. */
  const above = ([x, y]: [number, number]): [number, number] => [x, n(y - 5)];
  return {
    kind: "closing-a-sitting",
    ms: 12000,
    parts: [
      ...madinahDay([140, 18], [84, 24]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(4, 80, 0.4) },
      ...palms(
        [
          [72, 92, 13],
          [128, 89, 11],
          [152, 86, 10]
        ],
        "Madinah"
      ),
      { name: "a mat in the shade of the palms", svg: bigMat(92, 100, 46, 12) },
      { name: "the places of the others in the sitting", svg: others.map(([x, y]) => someone(x, y, 1.6, OTHERS)).join("") },
      {
        name: "empty, meaningless talk in the sitting: grey arcs",
        svg: arcsLeft(...above([n(sits[0] - 1.6), sits[1]]), GREY) + arcs(...above([n(others[2][0] + 1.6), others[2][1]]), GREY),
        keys: showFor(0.13, 0.14, 0.89, 0.91),
        loop: speaking
      },
      {
        name: "much of it: more grey arcs of talk",
        svg: arcs(...above([n(others[0][0] + 1.6), others[0][1]]), GREY) + arcsLeft(...above([n(others[3][0] - 1.6), others[3][1]]), GREY) + arcs(...above([n(others[4][0] + 1.6), others[4][1]]), GREY),
        keys: showFor(0.236, 0.246, 0.89, 0.91),
        loop: speaking
      },
      {
        name: "before getting up: a faint way out of the sitting",
        svg: way(`M${n(sits[0] + 2)} ${n(sits[1] + 0.6)} Q${n(sits[0] + 18)} ${n(sits[1] + 5)} ${n(sits[0] + goes[0])} ${n(sits[1] + goes[1])}`, "#FFF0C4", 0.8),
        keys: showAt(0.344, 0.36)
      },
      ...[
        [0.47, 0.51, 0],
        [0.575, 0.615, -3],
        [0.684, 0.724, 3]
      ].map(
        ([from, to, dx], i): SignPart => ({
          name: `the words said: a spark rising ${i + 1}`,
          svg: glints([[n(sits[0] + 3 + dx), n(sits[1] - 7)]], 1.4),
          keys: sparkStays(from, to, 9),
          loop: twinkle(900)
        })
      ),
      {
        name: "the place of one who sits in the sitting",
        svg: someone(sits[0], sits[1], 1.6, SITS),
        keys: track({
          xy: [
            [0.05, comes[0], comes[1]],
            [0.086, 0, 0],
            [0.78, 0, 0],
            [0.84, goes[0], goes[1]]
          ]
        })
      },
      { name: "its voice, soft and golden, saying the words", svg: arcs(n(sits[0] + 2.4), n(sits[1] - 3.2), SOFT_GOLD), keys: voice([[0.452, 0.732]]), loop: speaking },
      { name: "forgiven: a soft golden ring about its place", svg: care(n(sits[0] + goes[0]), n(sits[1] + goes[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showAt(0.912, 0.924), loop: soft },
      {
        name: "and glints over it",
        svg: glints([[n(sits[0] + goes[0] - 3), n(sits[1] + goes[1] - 6.4)], [n(sits[0] + goes[0] + 3.4), n(sits[1] + goes[1] - 8)]], 1),
        keys: showAt(0.93, 0.94),
        loop: twinkle()
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.04, 0.96]]), loop: speaking },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ABU_HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 2.4), n(abuHurairah[1] - 3.2), ABU_HURAIRAH), keys: voice([[0.016, 0.034]]), loop: speaking }
    ],
    words: linesOn(NINE, [
      "Abu Hurairah: he said: whoever sits in",
      "A sitting and engages in much empty,",
      "Meaningless speech and then says before",
      "Getting up from that sitting of his:",
      "Subhanaka Allahumma wa bihamdika,",
      "Ashhadu an la ilaha illa anta,",
      "Astaghfiruka wa atubu ilaik,",
      "Whatever occurred in that sitting would",
      "Be forgiven to him."
    ])
  };
}

/** A portion of the dark night: a band of the night sky from x, `w` across, down to the land, with a few small stars. */
const nightBand = (x: number, w: number, list: [number, number][]) =>
  `<rect x="${x}" y="0" width="${w}" height="34" fill="#0F1C3A"/><rect x="${x}" y="34" width="${w}" height="27.6" fill="#16284C"/>` + stars(list);

/** A ring of pale grey dashes about (x, y), to show on a land grown dim: something not to be done. */
const paleGreyRing = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="#C4C4CC" stroke-width="0.7" stroke-dasharray="1 0.9" fill="none"/>`;

/** A small sun over a home, its middle at (x, y): morning. */
const smallSun = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4.2" fill="#FFF0C0" opacity="0.35"/><circle cx="${x}" cy="${y}" r="2.6" fill="#FFE07A"/>`;

/** A small crescent over a home, its middle at (x, y): evening. */
const smallMoon = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4.2" fill="#16284C" opacity="0.3"/>${crescent(x, y, 2.6, 1.4, "#F3E3C0")}`;

// Rush to good deeds. Abu Hurairah said: the Messenger of Allah ﷺ said: rush to do good deeds. A Fitnah will occur
// that is like a portion of the dark night, morning will come upon a man as a believer, who will be a disbeliever in
// the evening, and evening will come upon a believer, who will be a disbeliever in the morning. One of them will sell
// his religion for goods of the world (Jami at-Tirmidhi 2195). No one is drawn: in Madinah, the masjid far off; two
// homes, a stall in the market between them, and the places of some folk on the way before them; his place, a golden
// ring, and Abu Hurairah's place on the left. Abu Hurairah's voice tells of it, and his voice, soft and golden,
// speaks. The folk hurry along the way, and sparks rise from them: good deeds. Portions of the dark night come over
// the sky, one after another, from the side, and the land grows dim. A small sun shows over the first home, morning,
// and a soft golden ring comes about the place by it; then a small crescent, evening, and its ring goes, and a grey
// dashed ring comes about it. A small crescent shows over the other home, evening, and a soft golden ring comes about
// its place; then a small sun, morning, and its ring goes, and a grey dashed ring comes about it. A small light by the
// place before the stall goes into the stall, and goods come out to it: coins, cloth and a jar. A grey dashed ring
// comes about it and its goods.
function rushToGoodDeeds(): SignArt {
  const abuHurairah: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const folk: [number, number][] = [
    [44, 107.6],
    [56, 108.2],
    [68, 107.6]
  ];
  const hurry: [number, number] = [16, 0];
  const firstHome: [number, number] = [50, 95];
  const first: [number, number] = [61.4, 98.4];
  const secondHome: [number, number] = [130, 95];
  const second: [number, number] = [141.4, 98.4];
  const stallAt = 94;
  const sells: [number, number] = [94, 104];
  /** Where the light goes in the stall, and where the goods come out to. */
  const intoStall: [number, number] = [0, -10.4];
  const goods: [number, number] = [101, 105.4];
  const fromStall: [number, number] = [-6.4, -10.6];
  return {
    kind: "rush-to-good-deeds",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      {
        name: "a cloud",
        svg: cloud(100, 30, 0.42, "#FFFFFF", 0.85),
        keys: track({
          opacity: [
            [0.234, 1],
            [0.262, 0]
          ]
        }),
        loop: { move: "slide", ms: 9000 }
      },
      ...(
        [
          [-2, 58, 0.234, [[10, 20], [28, 33], [44, 14]]],
          [54, 54, 0.25, [[64, 25], [84, 13], [100, 37]]],
          [104, 58, 0.266, [[116, 17], [134, 31], [150, 12]]]
        ] as [number, number, number, [number, number][]][]
      ).map(
        ([x, w, from, list], i): SignPart => ({
          name: `a trial like a portion of the dark night ${i + 1}`,
          svg: nightBand(x, w, list),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.022), 1]
            ],
            xy: [
              [from, -14, 0],
              [at3(from + 0.022), 0, 0]
            ]
          })
        })
      ),
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(4, 80, 0.4) },
      ...palms(
        [
          [74, 90, 10],
          [114, 90, 10],
          [154, 86, 10]
        ],
        "Madinah"
      ),
      { name: "the first home", svg: home(firstHome[0], firstHome[1], 16, 10) },
      { name: "the other home", svg: home(secondHome[0], secondHome[1], 16, 10) },
      { name: "a stall in the market", svg: stall(stallAt, 18, "#7A6A9A", 82, 95) },
      { name: "the goods of the stall", svg: coins(n(stallAt - 4.6), 94.6, 3) + jar(stallAt, 95, 0.5, "#C98A4A") + `<rect x="${n(stallAt + 3)}" y="91.8" width="4.4" height="3" rx="0.6" fill="#5E7E8E"/>` },
      { name: "the land grown dim under the trial", svg: `<rect y="48" width="160" height="72" fill="#16284C" opacity="0.26"/>`, keys: showAt(0.268, 0.29) },
      ...folk.map(
        ([x, y], i): SignPart => ({
          name: `the place of one of the folk, hurrying ${i + 1}`,
          svg: someone(x, y, 1.4, FOLK),
          keys: track({
            xy: [
              [0.05, 0, 0],
              [0.08, hurry[0], hurry[1]]
            ]
          })
        })
      ),
      ...quickSparks(
        "good deeds: a spark rising from one of the folk",
        folk.map(([x, y]): [number, number] => [n(x + hurry[0]), n(y - 3.4)]),
        0.13,
        0.014
      ),
      // The first: a believer in the morning, a disbeliever in the evening.
      { name: "morning: a small sun over the first home", svg: smallSun(n(firstHome[0] - 3), 79), keys: showFor(0.342, 0.352, 0.452, 0.462) },
      { name: "the place of one by the first home", svg: someone(first[0], first[1], 1.5, MORNING) },
      { name: "faith: a soft golden ring about its place", svg: care(first[0], n(first[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showFor(0.36, 0.372, 0.47, 0.48), loop: soft },
      { name: "evening: a small crescent over the first home", svg: smallMoon(n(firstHome[0] - 3), 79), keys: showAt(0.456, 0.468) },
      { name: "faith gone: a grey dashed ring about its place", svg: paleGreyRing(first[0], n(first[1] + 0.2), 3.8, 2.4), keys: showAt(0.48, 0.492) },
      // The other: a believer in the evening, a disbeliever in the morning.
      { name: "evening: a small crescent over the other home", svg: smallMoon(n(secondHome[0] - 3), 79), keys: showFor(0.562, 0.574, 0.672, 0.682) },
      { name: "the place of one by the other home", svg: someone(second[0], second[1], 1.5, EVENING) },
      { name: "faith: a soft golden ring about the other's place", svg: care(second[0], n(second[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showFor(0.58, 0.592, 0.692, 0.702), loop: soft },
      { name: "morning: a small sun over the other home", svg: smallSun(n(secondHome[0] - 3), 79), keys: showAt(0.676, 0.688) },
      { name: "faith gone: a grey dashed ring about the other's place", svg: paleGreyRing(second[0], n(second[1] + 0.2), 3.8, 2.4), keys: showAt(0.702, 0.714) },
      // One of them sells his religion for goods of the world.
      { name: "the place of one before the stall", svg: someone(sells[0], sells[1], 1.5, SELLS) },
      {
        name: "his religion: a small light by its place, going into the stall",
        svg: glints([[n(sells[0] - 2.6), n(sells[1] - 2.4)]], 1.2, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.778, 0],
            [0.784, 1],
            [0.814, 1],
            [0.822, 0]
          ],
          xy: [
            [0.79, 0, 0],
            [0.814, intoStall[0], intoStall[1]]
          ]
        }),
        loop: twinkle(900)
      },
      {
        name: "goods of the world: coins, cloth and a jar, coming out of the stall to it",
        svg: coins(goods[0], goods[1], 3) + `<rect x="${n(goods[0] + 2.8)}" y="${n(goods[1] - 2.6)}" width="4.4" height="3" rx="0.6" fill="#5E7E8E"/>` + jar(n(goods[0] - 3.6), n(goods[1] + 0.6), 0.45, "#C98A4A"),
        keys: track({
          opacity: [
            [0.822, 0],
            [0.828, 1]
          ],
          xy: [
            [0.828, fromStall[0], fromStall[1]],
            [0.846, 0, 0]
          ]
        })
      },
      { name: "a grey dashed ring about it and its goods", svg: paleGreyRing(n((sells[0] + goods[0] + 2) / 2), n(sells[1] + 0.2), 8.6, 3.4), keys: showAt(0.89, 0.902) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.04, 0.96]]), loop: speaking },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ABU_HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 2.4), n(abuHurairah[1] - 3.2), ABU_HURAIRAH), keys: voice([[0.016, 0.034]]), loop: speaking }
    ],
    words: linesOn(NINE, [
      "Abu Hurairah: he said: rush to do good",
      "Deeds. A Fitnah will occur that is like",
      "A portion of the dark night, morning will",
      "Come upon a man as a believer, who will",
      "Be a disbeliever in the evening, and",
      "Evening will come upon a believer, who",
      "Will be a disbeliever in the morning. One",
      "Of them will sell his religion for goods",
      "Of the world."
    ])
  };
}

/** Harm: three short grey jagged marks, their feet about (x, y). */
const harmMarks = (x: number, y: number) =>
  [-2.2, 0, 2.2]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 3.4 - (i % 2) * 0.8);
      return `<path d="M${n(sx - 0.6)} ${y} L${n(sx + 0.5)} ${n(y - 1.2)} L${n(sx - 0.5)} ${n(y - 2.2)} L${n(sx + 0.6)} ${top}" stroke="#7E7E76" stroke-width="0.55" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");

// No du'a is wasted. Jabir said: the Messenger of Allah ﷺ said: there is none who utters a supplication, except that
// Allah gives him what he asked, or prevents evil from him that is equal to it, as long as he does not supplicate for
// something evil, or the cutting of ties of the womb (Jami at-Tirmidhi 3381). No one is drawn, and no hand, and
// nothing for Allah: in Madinah, the masjid far off; the places of three, each by its home, and a home of kin beyond
// the third, with a way between them; his place, a golden ring, and Jabir's place on the left. Jabir's voice tells of
// it, and his voice, soft and golden, speaks. Sparks rise from the first two places: du'as. A basket of dates shows
// by the first, with glints: given what it asked. Grey jagged marks of harm come toward the second, stop, and are
// gone, and a soft golden ring comes about it: a harm kept away. Grey arcs of asking rise from the third, and a grey
// dashed ring comes about them: asking for something evil. They turn to the way to its kin, and a grey dashed ring
// comes about the way: asking to cut the ties.
function noDuaWasted(): SignArt {
  const jabir: [number, number] = [10, 106.4];
  const his: [number, number] = [26, 101.2];
  const givenHome: [number, number] = [46, 95];
  const given: [number, number] = [56.6, 99.4];
  const basketAt: [number, number] = [63.4, 101.4];
  const keptHome: [number, number] = [82, 95];
  const kept: [number, number] = [92.6, 99.4];
  const harmAt: [number, number] = [98.6, 103];
  const comes: [number, number] = [12, 5];
  const asksHome: [number, number] = [126, 94];
  const asks: [number, number] = [115.4, 100.4];
  const kinHome: [number, number] = [151, 92];
  /** The third's asking: grey arcs rising above its place. */
  const askingAt: [number, number] = [asks[0], n(asks[1] - 3.4)];
  return {
    kind: "no-dua-wasted",
    ms: 9000,
    parts: [
      ...madinahDay([140, 18], [70, 24]),
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(4, 80, 0.4) },
      ...palms(
        [
          [32, 90, 10],
          [104, 88, 10],
          [134, 86, 9]
        ],
        "Madinah"
      ),
      { name: "the home of the first", svg: home(givenHome[0], givenHome[1], 16, 10) },
      { name: "the home of the second", svg: home(keptHome[0], keptHome[1], 16, 10) },
      { name: "the home of the third", svg: home(asksHome[0], asksHome[1], 14, 9) },
      { name: "the home of its kin", svg: home(kinHome[0], kinHome[1], 14, 9) },
      { name: "the ties of kin: a way between the two homes", svg: way(`M${n(asksHome[0] + 2)} ${n(asksHome[1] + 0.4)} Q${n((asksHome[0] + kinHome[0]) / 2)} ${n(asksHome[1] + 4)} ${n(kinHome[0] - 1.8)} ${n(kinHome[1] + 0.4)}`, "#FFF0C4", 0.8) },
      // The first: given what it asked.
      { name: "the place of the first", svg: someone(given[0], given[1], 1.5, GIVEN) },
      { name: "its du'a: a spark rising", svg: glints([[given[0], n(given[1] - 3.6)]], 1.5), keys: sparkStays(0.19, 0.25, 9), loop: twinkle(900) },
      { name: "given what it asked: a basket of dates by its place", svg: basketOfDates(basketAt[0], basketAt[1]), keys: showAt(0.34, 0.354) },
      { name: "glints over the basket", svg: glints([[n(basketAt[0] - 3), n(basketAt[1] - 7.6)], [n(basketAt[0] + 3.2), n(basketAt[1] - 8.8)]], 1), keys: showAt(0.358, 0.366), loop: twinkle() },
      // The second: a harm like it kept away.
      { name: "the place of the second", svg: someone(kept[0], kept[1], 1.5, KEPT) },
      { name: "its du'a: a spark rising too", svg: glints([[kept[0], n(kept[1] - 3.6)]], 1.5), keys: sparkStays(0.21, 0.27, 9), loop: twinkle(900) },
      {
        name: "evil: grey jagged marks of harm coming toward it, then gone",
        svg: harmMarks(harmAt[0], harmAt[1]),
        keys: track({
          opacity: [
            [0.372, 0],
            [0.378, 1],
            [0.5, 1],
            [0.516, 0]
          ],
          xy: [
            [0.378, comes[0], comes[1]],
            [0.44, 0, 0]
          ]
        })
      },
      { name: "kept away: a soft golden ring about the second's place", svg: care(kept[0], n(kept[1] + 0.4), 3.6, 2.2, SOFT_GOLD), keys: showAt(0.526, 0.538), loop: soft },
      // The third: asking for something evil, or for cutting the ties of kin.
      { name: "the place of the third", svg: someone(asks[0], asks[1], 1.5, ASKS_EVIL) },
      {
        name: "its asking for something evil, and to cut the ties: grey arcs rising",
        svg: `<g transform="rotate(-90 ${askingAt[0]} ${askingAt[1]})">${arcs(askingAt[0], askingAt[1], GREY)}</g>`,
        keys: voice([
          [0.66, 0.762],
          [0.82, 0.92]
        ]),
        loop: speaking
      },
      { name: "a grey dashed ring about that asking", svg: greyRing(askingAt[0], n(askingAt[1] - 3.4), 4.4, 4.4), keys: showAt(0.7, 0.712) },
      { name: "a grey dashed ring about the way", svg: greyRing(n((asksHome[0] + kinHome[0]) / 2), n(asksHome[1] + 2.4), 13.6, 3.6), keys: showAt(0.84, 0.852) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.066, 0.96]]), loop: speaking },
      { name: "Jabir's place", svg: someone(jabir[0], jabir[1], 1.5, JABIR) },
      { name: "Jabir's voice: telling of it", svg: arcs(n(jabir[0] + 2.4), n(jabir[1] - 3.2), JABIR), keys: voice([[0.024, 0.06]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Jabir: he said: there is none who",
      "Utters a supplication, except that Allah",
      "Gives him what he asked, or prevents evil",
      "From him that is equal to it – as long",
      "As he does not supplicate for something",
      "Evil, or the cutting of ties of the womb."
    ])
  };
}

export const PATH_ART = {
  "parable-of-the-path": parableOfThePath,
  "closing-a-sitting": closingASitting,
  "rush-to-good-deeds": rushToGoodDeeds,
  "no-dua-wasted": noDuaWasted
};
