import { animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3 } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, LIGHT, sparkRising, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { kabah } from "./historyArt";
import { litWindow, nightLand } from "./heedArt";
import { restingCamel, road, saddled, showAt, showFor, SOFT_GOLD } from "./roadArt";

/**
 * What he ﷺ told of, was shown and did: guided to Friday, the last and yet the first; some prayers prayed at home;
 * voluntary prayers on his mount, facing the way it went; Abu Talhah's horse in a fright, found like a sea; the wolf
 * that spoke to a shepherd; the dream of the well; and the dream of a land of palms. Only the land, the sky, buildings,
 * things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a
 * face, and no one is drawn on a camel or a horse: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down
 * from the sky: a prayer is a spark that rises, and what is loved is a warm glow about its place.
 */

/** A day of the week: a circle in the sky about (x, y). */
const dayCircle = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#FFFFFF" fill-opacity="0.4" stroke="#9CC4E4" stroke-width="0.6"/>`;

/** A day of the week lit: its circle filled with `fill`. */
const dayFill = (x: number, y: number, fill: string) => `<circle cx="${x}" cy="${y}" r="4.8" fill="${fill}"/>`;

/** A day of the week lit gold: a pale gold fill with a golden star in it, so it is never taken for the sun. */
const dayStar = (x: number, y: number) => dayFill(x, y, "#FFF0C2") + sparkle(x, y, 3.2, "#E8A93A");

/** Five small places together, the middle one at (x, y). */
const fivePlaces = (x: number, y: number, color = VOICE) =>
  [
    [-8, 0],
    [-4, -3.6],
    [0, 0],
    [4, -3.6],
    [8, 0]
  ]
    .map(([dx, dy]) => someone(x + dx, y + dy, 1.6, color))
    .join("");

/** A soft slate blue, for rings that only mark a group out. */
const SLATE = "#7A8CA8";

// Guided to Friday. Abu Hurairah heard the Messenger of Allah ﷺ say: we are the last, yet the first on the Day of
// Resurrection, though they were given the Scripture before us. Then this was their day which was made a duty for
// them, and they differed over it, and Allah guided us to it; so the people follow us in it: the Jews tomorrow, and the
// Christians the day after (Sahih al-Bukhari 876). No one is drawn, and nothing of a scripture: three days of the week
// are circles in the sky, Friday, Saturday and Sunday, and on the land below them two groups of small places stand, come
// before. Five more places, this Ummah, come in last, behind them; then they go on ahead of them all and stand first,
// under Friday, with a golden ring about them. A soft ring comes about Friday, and dashed rings about the other two
// groups at the same time: their day; then their rings turn grey and their voices differ. Friday lights, a golden star
// in it, and a warm glow comes about this Ummah. Dashed ways go from Friday to Saturday, and from Saturday to Sunday:
// the days that follow. Then Saturday lights, and a ring comes about the Jews' places; then Sunday, and a ring about the
// Christians'. No line goes between the sky and the land.
function guidedToFriday(): SignArt {
  const friday: [number, number] = [40, 24];
  const saturday: [number, number] = [80, 24];
  const sunday: [number, number] = [120, 24];
  const came: [number, number] = [148, 97];
  const first: [number, number] = [40, 97];
  const jews: [number, number] = [80, 97];
  const christians: [number, number] = [120, 97];
  return {
    kind: "guided-to-friday",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "clouds", svg: cloud(60, 46, 0.5, "#FFFFFF", 0.85) + cloud(140, 42, 0.45, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "Friday, a day of the week", svg: dayCircle(...friday) },
      { name: "Saturday, the day after it", svg: dayCircle(...saturday) },
      { name: "Sunday, the day after that", svg: dayCircle(...sunday) },
      { name: "the Jews' places, come before", svg: fivePlaces(...jews) },
      { name: "the Christians' places, come before", svg: fivePlaces(...christians) },
      {
        name: "this Ummah's places, the last to come",
        svg: fivePlaces(...came),
        keys: track({
          xy: [
            [0.02, 20, 0],
            [0.08, 0, 0],
            [0.14, 0, 0],
            [0.155, -5, 8],
            [0.21, -103, 8],
            [0.225, first[0] - came[0], 0]
          ],
          opacity: [
            [0.02, 0],
            [0.03, 1]
          ]
        })
      },
      { name: "the first: a golden ring about this Ummah's places", svg: care(first[0], first[1] - 1.8, 12, 5.4, GOLD), keys: showAt(0.205, 0.225), loop: soft },
      { name: "their day: a soft ring about Friday", svg: care(friday[0], friday[1], 8.4, 8.4, SOFT_GOLD), keys: showAt(0.28, 0.3), loop: soft },
      { name: "made a duty for them: a ring about the Jews' places", svg: care(jews[0], jews[1] - 1.8, 12, 5.4, SLATE), keys: showFor(0.28, 0.3, 0.4, 0.42) },
      { name: "made a duty for them: a ring about the Christians' places", svg: care(christians[0], christians[1] - 1.8, 12, 5.4, SLATE), keys: showFor(0.28, 0.3, 0.4, 0.42) },
      { name: "they differed: a grey ring about the Jews' places", svg: greyRing(jews[0], jews[1] - 1.8, 12, 5.4), keys: showFor(0.4, 0.42, 0.64, 0.66) },
      { name: "they differed: a grey ring about the Christians' places", svg: greyRing(christians[0], christians[1] - 1.8, 12, 5.4), keys: showFor(0.4, 0.42, 0.64, 0.66) },
      { name: "they differed: a voice from the Jews' places", svg: arcs(jews[0] + 11, jews[1] - 7, VOICE), keys: showFor(0.41, 0.42, 0.52, 0.53), loop: speaking },
      { name: "they differed: a voice from the Christians' places", svg: arcsLeft(christians[0] - 11, christians[1] - 7, VOICE), keys: showFor(0.42, 0.43, 0.52, 0.53), loop: speaking },
      { name: "guided to it: Friday lit, a golden star in it", svg: dayStar(...friday), keys: showAt(0.52, 0.55), loop: soft },
      { name: "guided to it: a warm glow about this Ummah's places", svg: wash(first[0], first[1] - 2, 16, 7, WARM, 0.2), keys: showAt(0.54, 0.57), loop: soft },
      { name: "following: a dashed way from Friday to Saturday", svg: way(`M${friday[0] + 7} ${friday[1]} L${saturday[0] - 7} ${saturday[1]}`, "#FFFFFF", 0.9), keys: showAt(0.64, 0.66) },
      { name: "following: a dashed way from Saturday to Sunday", svg: way(`M${saturday[0] + 7} ${saturday[1]} L${sunday[0] - 7} ${sunday[1]}`, "#FFFFFF", 0.9), keys: showAt(0.66, 0.68) },
      { name: "tomorrow: Saturday lit", svg: dayFill(saturday[0], saturday[1], "#FFF6D6"), keys: showAt(0.76, 0.78) },
      { name: "tomorrow: a ring about the Jews' places", svg: care(jews[0], jews[1] - 1.8, 12, 5.4, "#FFFFFF"), keys: showAt(0.78, 0.81) },
      { name: "the day after: Sunday lit", svg: dayFill(sunday[0], sunday[1], "#FFF6D6"), keys: showAt(0.88, 0.9) },
      { name: "the day after: a ring about the Christians' places", svg: care(christians[0], christians[1] - 1.8, 12, 5.4, "#FFFFFF"), keys: showAt(0.9, 0.93) }
    ],
    words: [
      { text: "We are the last, yet the first", from: 0.02, to: 0.125 },
      { text: "On the Day of Resurrection", from: 0.14, to: 0.265 },
      { text: "This was their day, made a duty for them", from: 0.28, to: 0.385 },
      { text: "And they differed over it", from: 0.4, to: 0.505 },
      { text: "And Allah guided us to it", from: 0.52, to: 0.625 },
      { text: "People follow us in it", from: 0.64, to: 0.745 },
      { text: "The Jews tomorrow", from: 0.76, to: 0.865 },
      { text: "The Christians the day after", from: 0.88, to: 1 }
    ]
  };
}

/** The door of a home (trialArt.ts) whose foot's middle is at (x, y), lit from within. */
const litDoor = (x: number, y: number) =>
  `${glow(n(x - 1.8), n(y - 3.4), 4.6, "#FFD866", 0.24)}<path d="M${n(x - 3.6)} ${y} L${n(x - 3.6)} ${n(y - 5.4)} Q${n(x - 1.8)} ${n(y - 7.6)} ${x} ${n(y - 5.4)} L${x} ${y} Z" fill="#FFD866" opacity="0.85"/>`;

// Some prayers at home. Ibn Umar said that the Prophet ﷺ said: pray some of your prayers in your homes, and do not make
// them graves (Sahih al-Bukhari 432). No one is drawn, and no grave: at dusk four homes stand in a row, the masjid far
// off behind them. One home after another lights up within, its window and its door, and a spark of prayer rises from
// it, and a warm glow comes over the three. The fourth stays dark, a grey ring about it: a home with no prayer in it.
// Then the grey ring goes, the fourth home lights up too, a spark rises from it, and a warm glow comes over all four.
function prayersAtHome(): SignArt {
  const homes = [21, 57, 93, 129];
  const y = 102;
  const [w, h] = [26, 17];
  const lit = [0.05, 0.15, 0.25];
  const lightIn = (x: number) => litWindow(x, y, h) + litDoor(x, y);
  const sparkOf = (x: number, from: number, to: number, i: number): SignPart => ({
    name: `prayer in home ${i + 1}: a spark rising`,
    svg: sparkle(x, n(y - h - 4), 1.8, "#FFE7A0"),
    keys: sparkRising(from, to, 12),
    loop: { move: "twinkle", ms: 900, low: 0.5 }
  });
  return {
    kind: "prayers-at-home",
    ms: 9000,
    parts: [
      { name: "the sky at dusk", svg: sky("#F1B88E", "#F6D3A4", 52) },
      { name: "the setting sun", svg: `${glow(140, 56, 16, "#FFE2B0", 0.14)}<circle cx="140" cy="56" r="5.4" fill="#FFB35C"/>` },
      { name: "clouds", svg: cloud(40, 26, 0.42, "#FBE3CF", 0.9) + cloud(100, 18, 0.36, "#FBE3CF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "hills",
        svg: peaks(
          [
            [18, 9, 30],
            [92, 13, 40],
            [150, 9, 30]
          ],
          61,
          "#B08E6C",
          false
        )
      },
      {
        name: "the land",
        svg: landOf(
          [
            [12, 72],
            [76, 76],
            [146, 72],
            [40, 112],
            [112, 114]
          ],
          "#D9BE8E"
        )
      },
      { name: "the masjid, far off", svg: madinahMasjid(64, 75, 0.5) },
      ...homes.map((x, i): SignPart => ({ name: `home ${i + 1}`, svg: home(x, y, w, h) })),
      ...lit.map((t, i): SignPart => ({ name: `prayer in home ${i + 1}: its light`, svg: lightIn(homes[i]), keys: showAt(t, at3(t + 0.03)) })),
      ...lit.map((t, i) => sparkOf(homes[i], at3(t + 0.01), at3(t + 0.08), i)),
      { name: "homes with prayer: a warm glow over them", svg: wash(57, 93, 54, 16, WARM, 0.12), keys: showFor(0.38, 0.42, 0.8, 0.86), loop: soft },
      { name: "a home with no prayer: a grey ring about home 4", svg: greyRing(homes[3], 93.5, 17.5, 12), keys: showFor(0.53, 0.56, 0.62, 0.66) },
      { name: "prayer in home 4: its light", svg: lightIn(homes[3]), keys: showAt(0.66, 0.7) },
      sparkOf(homes[3], 0.7, 0.78, 3),
      { name: "all four homes with prayer: a warm glow over them", svg: wash(75, 93, 78, 17, WARM, 0.12), keys: showAt(0.8, 0.86), loop: soft }
    ],
    words: [
      { text: "Pray some of your prayers in your homes", from: 0.02, to: 0.5 },
      { text: "And do not make them graves", from: 0.52, to: 1 }
    ]
  };
}

/** A spark of prayer at (x, y), shown at `from`, rising by `from + 0.05` and gone by `from + 0.06`, drifting `dx` with its mount. */
const prayerSpark = (name: string, x: number, y: number, from: number, dx = 0): SignPart => ({
  name,
  svg: sparkle(x, y, 1.8, "#FFE7A0"),
  keys: {
    at: [0, from, at3(from + 0.01), at3(from + 0.05), at3(from + 0.06)],
    opacity: [0, 0, 1, 1, 0],
    x: [0, 0, n(dx / 6), n((dx * 5) / 6), dx],
    y: [0, 0, -2.8, -14, -16.8]
  },
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

// Praying on his mount. Jabir ibn Abdullah said that the Prophet ﷺ used to pray the voluntary prayers while he was
// riding, facing other than the qiblah (Sahih al-Bukhari 1094). No one is drawn, and no one is drawn on the camel: on a
// road, a camel with a saddle cloth stands, a golden ring about it, his place, and the Ka'bah is far off behind it on
// the left. A warm glow comes about it and sparks of prayer rise from it. Then it walks on along the road to the right,
// the glow going with it, and the sparks still rise as it goes. A soft ring comes about the Ka'bah far behind and a
// faint line goes back to it: the qiblah; a golden way shows ahead of the camel, the way it faces, and a spark rises.
function prayerOnHisMount(): SignArt {
  const s = 0.3;
  const y = 100;
  const x0 = 40;
  const went = 60;
  const along = (t: number) => n(x0 + (went * (t - 0.37)) / 0.22);
  const drift = n((went * 0.06) / 0.22);
  const top: [number, number] = [n(x0 - 2.5), 82];
  const walking: [number, number, number][] = [
    [0.37, 0, 0],
    [0.59, went, 0]
  ];
  return {
    kind: "prayer-on-his-mount",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(128, 20) },
      { name: "clouds", svg: cloud(56, 22, 0.55, "#FFFFFF", 0.9) + cloud(104, 32, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the Ka'bah, far off behind", svg: kabah(8, 70, 7) },
      { name: "the road", svg: road(0, 160, y + 1) },
      {
        name: "his prayer: a warm glow about his place",
        svg: glow(x0, 88, 16, WARM, 0.12),
        keys: track({
          xy: walking,
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ]
        }),
        loop: soft
      },
      { name: "a golden ring about his mount: his place, riding", svg: ring(x0, y + 1.6, 9.6, GOLD), keys: track({ xy: walking }) },
      { name: "his mount, a camel with a saddle cloth", svg: saddled(x0, y, s), keys: track({ xy: walking }), loop: { move: "bob", ms: 1800, y: -0.3 } },
      ...[0.05, 0.13, 0.21].map((t, i) => prayerSpark(`his voluntary prayers: a spark rising ${i + 1}`, top[0], top[1], t)),
      ...[0.4, 0.48].map((t, i) => prayerSpark(`praying while riding: a spark rising ${i + 1}`, n(top[0] + along(t) - x0), top[1], t, drift)),
      { name: "the qiblah: a soft ring about the Ka'bah, far behind", svg: care(12, 70.6, 7.4, 2.4, SOFT_GOLD), keys: showAt(0.66, 0.69), loop: soft },
      { name: "the qiblah behind: a faint line back to it", svg: lookLine(n(x0 + went - 12), 84, 15, 64, 54, GOLD), keys: showAt(0.68, 0.71) },
      { name: "facing the way it goes: a golden way ahead", svg: way(`M${n(x0 + went + 16)} ${y + 1} L158 ${y + 1}`, GOLD, 1.1), keys: showAt(0.73, 0.77) },
      prayerSpark("facing other than the qiblah: a spark rising", n(top[0] + went), top[1], 0.79)
    ],
    words: [
      { text: "He used to pray the voluntary prayers", from: 0.02, to: 0.34 },
      { text: "While he was riding", from: 0.36, to: 0.64 },
      { text: "Facing other than the qiblah", from: 0.66, to: 1 }
    ]
  };
}

/** The colors of a home (trialArt.ts) at night: its wall, its trim and its doorway. */
const NIGHT_HOME = ["#8C7656", "#7A6448", "#2E2418"] as const;

/** A grey ring at night, lighter than by day, about (x, y). */
export const nightGreyRing = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="#A8A6B4" stroke-width="0.6" stroke-dasharray="1 0.9" fill="none"/>`;

/** Light quick strokes behind (x, y): going fast; `left`: going left, so the strokes are behind it on the right. */
export const quickStrokes = (x: number, y: number, left = false) =>
  [
    [0, -3, 6],
    [-2, 0, 7.4],
    [0, 3, 5]
  ]
    .map(([dx, dy, w]) => {
      const [a, b] = left ? [x - dx, x - dx + w] : [x + dx - w, x + dx];
      return `<path d="M${n(a)} ${n(y + dy)} L${n(b)} ${n(y + dy)}" stroke="#DCE6F5" stroke-width="0.8" stroke-linecap="round" opacity="0.85"/>`;
    })
    .join("");

/** Soft blue waves along y from x1 to x2, as the sea's. */
const seaWaves = (x1: number, x2: number, y: number) =>
  [0, 3.2]
    .map((dy, i) => {
      let d = `M${x1 + i * 3} ${n(y + dy)}`;
      for (let x = x1 + i * 3; x < x2; x += 6) d += " q1.5 -1.4 3 0 t3 0";
      return `<path d="${d}" stroke="#7FB8E6" stroke-width="0.8" fill="none" stroke-linecap="round" opacity="${i ? 0.6 : 0.9}"/>`;
    })
    .join("");

// The horse like a sea. Anas said: there was a fright in Madinah, so the Prophet ﷺ borrowed a horse from Abu Talhah
// called al-Mandub, and rode it. When he came back he said: we saw nothing, and we found it a sea (Sahih al-Bukhari
// 2627). No one is drawn, and no one is drawn on the horse: at night in Madinah, grey rings come over its homes and its
// masjid, and worried voices: a fright. His place, a golden ring, goes from the masjid to Abu Talhah's place by his
// home, his voice asks, a golden line goes from Abu Talhah's place to the horse and a soft ring comes about it: lent.
// His place goes to the horse, a golden ring about it, and the horse runs out fast into the dark, quick strokes behind
// it, out of sight, and comes back fast. The grey rings and the voices go, and his voice speaks: nothing. Then soft blue
// waves show where it ran, and a soft blue ring comes about the horse: like a sea.
function fastHorse(): SignArt {
  const s = 0.28;
  const horseAt = (x: number, y: number, left = false) => animalAt("horse", n(x - 50 * s), n(y - 73 * s), s, left);
  const y = 101;
  const tied = 104;
  const out = 180;
  const door: [number, number] = [50.4, 102.6];
  const talhah: [number, number] = [78, 103.4];
  const met: [number, number] = [66, 104];
  const palmAt = (x: number, py: number, ph: number, i: number): SignPart => ({
    name: `a palm of Madinah ${i + 1}`,
    svg: palm(x, py, ph, "#2F5A3A"),
    origin: { x, y: py },
    loop: { move: "sway", ms: 5200 + i * 600, angle: 1.2, phase: i / 3 }
  });
  return {
    kind: "fast-horse",
    ms: 10000,
    parts: [
      { name: "the sky at night", svg: nightSky(62) },
      { name: "the moon", svg: `${glow(128, 26, 10, "#FFF6D0", 0.08)}${crescent(128, 26, 5, 2.4, "#FFF3B8")}` },
      {
        name: "stars",
        svg: stars([
          [12, 15],
          [34, 26],
          [58, 14],
          [86, 22],
          [112, 14],
          [136, 26],
          [152, 15]
        ]),
        loop: { move: "twinkle", ms: 2400, low: 0.6 }
      },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [20, 72],
          [124, 76],
          [150, 110],
          [60, 112]
        ])
      },
      palmAt(6, 92, 20, 0),
      palmAt(68, 90, 18, 1),
      palmAt(126, 95, 22, 2),
      { name: "homes of Madinah", svg: home(12, 98, 16, 15, ...NIGHT_HOME) + home(29, 95, 12, 12, ...NIGHT_HOME) },
      { name: "the masjid of Madinah", svg: madinahMasjid(36, 99, 0.6) },
      { name: "Abu Talhah's home", svg: home(82, 98, 16, 15, ...NIGHT_HOME) },
      { name: "lit windows in Madinah", svg: litWindow(12, 98, 15) + litWindow(82, 98, 15) },
      {
        name: "a fright: grey rings over Madinah",
        svg: nightGreyRing(20, 91, 15, 7) + nightGreyRing(50, 92, 16, 7) + nightGreyRing(82, 91, 10, 7),
        keys: showFor(0.03, 0.06, 0.71, 0.73),
        loop: { move: "twinkle", ms: 700, low: 0.4 }
      },
      { name: "a fright: worried voices", svg: arcs(36, 80, "#B8C0CC") + arcsLeft(74, 79, "#B8C0CC"), keys: showFor(0.05, 0.07, 0.71, 0.73), loop: speaking },
      { name: "Abu Talhah's place, by his home", svg: someone(talhah[0], talhah[1], 1.5, LIGHT) },
      {
        name: "a golden ring, his place",
        svg: ring(door[0], door[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.21, 0, 0],
            [0.26, met[0] - door[0], met[1] - door[1]],
            [0.4, met[0] - door[0], met[1] - door[1]],
            [0.42, tied - door[0], 0.2]
          ],
          opacity: [
            [0.42, 1],
            [0.43, 0]
          ]
        })
      },
      { name: "his voice, asking to borrow the horse", svg: arcs(met[0] + 3.4, met[1] - 4.4, "#FFE7A0"), keys: showFor(0.26, 0.27, 0.4, 0.41), loop: speaking },
      {
        name: "lent: a golden line from Abu Talhah's place to the horse",
        svg: lookLine(talhah[0] + 2, talhah[1] - 1.4, tied - 9, y - 9, 92, GOLD),
        keys: showFor(0.28, 0.3, 0.42, 0.44)
      },
      { name: "lent: a soft ring about the horse", svg: care(tied, y + 0.6, 14, 3.4, SOFT_GOLD), keys: showFor(0.3, 0.33, 0.42, 0.44), loop: soft },
      {
        name: "the horse, al-Mandub, by Abu Talhah's home",
        svg: horseAt(tied, y),
        keys: track({
          opacity: [
            [0.43, 1],
            [0.44, 0]
          ]
        })
      },
      {
        name: "a golden ring about the horse: his place, riding",
        svg: ring(tied, y + 1.4, 10.4, GOLD),
        keys: track({
          xy: [
            [0.44, 0, 0],
            [0.52, out - tied, 0],
            [0.61, out - tied, 0],
            [0.7, 0, 0]
          ],
          opacity: [
            [0.42, 0],
            [0.43, 1]
          ]
        })
      },
      {
        name: "the horse, going out fast",
        svg: horseAt(tied, y),
        keys: track({
          xy: [
            [0.44, 0, 0],
            [0.52, out - tied, 0]
          ],
          opacity: [
            [0.43, 0],
            [0.44, 1],
            [0.51, 1],
            [0.52, 0]
          ]
        }),
        loop: { move: "bob", ms: 420, y: -0.8 }
      },
      {
        name: "going out fast: quick strokes behind it",
        svg: quickStrokes(tied - 15, y - 12),
        keys: track({
          xy: [
            [0.44, 0, 0],
            [0.52, out - tied, 0]
          ],
          opacity: [
            [0.44, 0],
            [0.45, 1],
            [0.51, 1],
            [0.52, 0]
          ]
        })
      },
      {
        name: "the horse, coming back fast",
        svg: horseAt(out, y, true),
        keys: track({
          xy: [
            [0.61, 0, 0],
            [0.7, tied - out, 0]
          ],
          opacity: [
            [0.6, 0],
            [0.61, 1],
            [0.7, 1],
            [0.71, 0]
          ]
        }),
        loop: { move: "bob", ms: 420, y: -0.8 }
      },
      {
        name: "coming back fast: quick strokes behind it",
        svg: quickStrokes(out + 15, y - 12, true),
        keys: track({
          xy: [
            [0.61, 0, 0],
            [0.7, tied - out, 0]
          ],
          opacity: [
            [0.61, 0],
            [0.62, 1],
            [0.69, 1],
            [0.7, 0]
          ]
        })
      },
      { name: "the horse, back by Abu Talhah's home", svg: horseAt(tied, y, true), keys: showAt(0.7, 0.71) },
      { name: "his voice: we saw nothing", svg: arcsLeft(n(tied - 15), y - 16, "#FFE7A0"), keys: showAt(0.71, 0.72), loop: speaking },
      { name: "like a sea: soft blue waves where it ran", svg: seaWaves(120, 150, 104), keys: showAt(0.81, 0.85), loop: { move: "bob", ms: 2400, x: 1.4 } },
      { name: "like a sea: a soft blue ring about the horse", svg: care(tied, y + 0.6, 16, 3.6, "#8EC3EE"), keys: showAt(0.84, 0.87), loop: soft }
    ],
    words: [
      { text: "There was a fright in Madinah", from: 0.02, to: 0.18 },
      { text: "He borrowed a horse from Abu Talhah", from: 0.2, to: 0.38 },
      { text: "Called al-Mandub, and rode it", from: 0.4, to: 0.58 },
      { text: "He came back and said: we saw nothing", from: 0.6, to: 0.78 },
      { text: "And we found the horse like a sea", from: 0.8, to: 1 }
    ]
  };
}

// The wolf that spoke. Abu Hurairah said that the Messenger of Allah ﷺ said: while a shepherd was with his sheep, a
// wolf attacked and took a sheep from them. He went after it until he saved it from it. The wolf turned to him and
// said: who will guard it on the day of the wild beasts, when it has no shepherd but me? The people said: glory be to
// Allah! The Prophet ﷺ said: I believe it, and so do Abu Bakr and Umar; and Abu Bakr and Umar were not there (Sahih
// al-Bukhari 3690). No one is drawn: in a pasture, sheep graze and the shepherd's place is with them. A wolf runs in
// from the right and runs off with a sheep; the shepherd's place goes after it, and the sheep runs back to the flock.
// The wolf turns and its voice speaks, and the shepherd's place fades, a grey ring about the flock alone. Then a haze
// comes over the story, and a gathering shows: his place, a golden ring, and places about it, whose voices wonder. His
// voice speaks, and far off two places show, a soft golden ring about them; then grey rings show two empty spots
// beside his place: they were not there.
function talkingWolf(): SignArt {
  const s = 0.18;
  const w = 0.22;
  const sheepAt = (x: number, y: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);
  const wolfAt = (x: number, y: number, left = false) => animalAt("wolf", n(x - 50 * w), n(y - 73.4 * w), w, left);
  const flock: [number, number, boolean][] = [
    [36, 88, false],
    [50, 86, true],
    [44, 96, false],
    [28, 97, true]
  ];
  const taken: [number, number] = [62, 91];
  const ranTo: [number, number] = [110, 93];
  const wolfIn: [number, number] = [74, 92];
  const wolfOff: [number, number] = [122, 93];
  const wolfStood: [number, number] = [130, 93];
  const shepherd: [number, number] = [18, 91];
  const chased: [number, number] = [100, 94];
  const his: [number, number] = [80, 104.6];
  const sat: [number, number][] = [
    [50, 105.4],
    [58, 102.8],
    [64, 106.2],
    [96, 106.2],
    [102, 102.8],
    [110, 105.4]
  ];
  const empty: [number, number][] = [
    [72, 102.4],
    [88, 102.4]
  ];
  const far: [number, number][] = [
    [144, 70],
    [152, 70]
  ];
  return {
    kind: "talking-wolf",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: sun(26, 18) },
      { name: "clouds", svg: cloud(70, 22, 0.55, "#FFFFFF", 0.9) + cloud(128, 16, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills("#B9B98A") },
      {
        name: "the pasture",
        svg: landOf(
          [
            [12, 74],
            [70, 76],
            [104, 72],
            [140, 80],
            [24, 112],
            [132, 112]
          ],
          "#C3C98E"
        )
      },
      ...flock.map(([x, y, left], i): SignPart => ({ name: `a sheep of the flock ${i + 1}`, svg: sheepAt(x, y, left), loop: { move: "bob", ms: 2400 + i * 300, y: 0.3, phase: i / 4 } })),
      {
        name: "the sheep, taken",
        svg: sheepAt(...taken),
        keys: track({
          xy: [
            [0.175, 0, 0],
            [0.215, ranTo[0] - taken[0], ranTo[1] - taken[1]]
          ],
          opacity: [
            [0.32, 1],
            [0.325, 0]
          ]
        })
      },
      {
        name: "the sheep, saved, running back to the flock",
        svg: sheepAt(ranTo[0], ranTo[1], true),
        keys: track({
          xy: [
            [0.325, 0, 0],
            [0.345, taken[0] - ranTo[0], taken[1] - ranTo[1]]
          ],
          opacity: [
            [0.32, 0],
            [0.325, 1]
          ]
        })
      },
      {
        name: "the shepherd's staff",
        svg: `<path d="M${n(shepherd[0] + 2.8)} ${n(shepherd[1] + 2.4)} L${n(shepherd[0] + 2.8)} ${n(shepherd[1] - 8)} Q${n(shepherd[0] + 2.8)} ${n(shepherd[1] - 10.2)} ${n(shepherd[0] + 4.8)} ${n(shepherd[1] - 10)} Q${n(shepherd[0] + 6.4)} ${n(shepherd[1] - 9.6)} ${n(shepherd[0] + 6)} ${n(shepherd[1] - 8)}" stroke="#8A5A33" stroke-width="0.8" fill="none" stroke-linecap="round"/>`,
        keys: track({
          xy: [
            [0.28, 0, 0],
            [0.32, chased[0] - shepherd[0], chased[1] - shepherd[1]]
          ],
          opacity: [
            [0.52, 1],
            [0.55, 0.25]
          ]
        })
      },
      {
        name: "the shepherd's place",
        svg: someone(shepherd[0], shepherd[1], 1.8),
        keys: track({
          xy: [
            [0.28, 0, 0],
            [0.32, chased[0] - shepherd[0], chased[1] - shepherd[1]]
          ],
          opacity: [
            [0.52, 1],
            [0.55, 0.25]
          ]
        })
      },
      {
        name: "a wolf, attacking",
        svg: wolfAt(wolfIn[0] + 96, wolfIn[1], true),
        keys: track({
          xy: [
            [0.14, 0, 0],
            [0.17, -96, 0]
          ],
          opacity: [
            [0.14, 0],
            [0.145, 1],
            [0.17, 1],
            [0.175, 0]
          ]
        }),
        loop: { move: "bob", ms: 500, y: -0.6 }
      },
      {
        name: "the wolf, running off with the sheep",
        svg: wolfAt(...wolfIn),
        keys: track({
          xy: [
            [0.175, 0, 0],
            [0.215, wolfOff[0] - wolfIn[0], wolfOff[1] - wolfIn[1]],
            [0.32, wolfOff[0] - wolfIn[0], wolfOff[1] - wolfIn[1]],
            [0.34, wolfStood[0] - wolfIn[0], wolfStood[1] - wolfIn[1]]
          ],
          opacity: [
            [0.17, 0],
            [0.175, 1],
            [0.4, 1],
            [0.405, 0]
          ]
        })
      },
      { name: "the wolf, turned to the shepherd", svg: wolfAt(wolfStood[0], wolfStood[1], true), keys: showAt(0.4, 0.405) },
      { name: "the wolf's voice: who will guard it", svg: arcsLeft(n(wolfStood[0] - 13), 82, VOICE), keys: showFor(0.41, 0.42, 0.64, 0.65), loop: speaking },
      { name: "no shepherd but the wolf: a grey ring about the flock", svg: greyRing(42, 92, 22, 9), keys: showFor(0.53, 0.56, 0.64, 0.66) },
      { name: "the story he told: a haze over it", svg: `<rect width="160" height="120" fill="#FFFFFF"/>`, keys: track({ opacity: [[0.64, 0], [0.66, 0.55]] }) },
      { name: "the gathering: a golden ring, his place", svg: ring(his[0], his[1], 3.2, GOLD), keys: showAt(0.64, 0.66) },
      { name: "the gathering: places about him", svg: sat.map(([x, y]) => someone(x, y, 1.8)).join(""), keys: showAt(0.64, 0.66) },
      { name: "the folk's voices, wondering: glory be!", svg: arcsLeft(46, 100, VOICE) + arcs(114, 100, VOICE), keys: showFor(0.66, 0.67, 0.76, 0.77), loop: speaking },
      { name: "his voice: I believe it", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.4), GOLD), keys: showFor(0.77, 0.78, 0.88, 0.89), loop: speaking },
      { name: "Abu Bakr's and Umar's places, far off", svg: far.map(([x, y]) => someone(x, y, 1.8)).join(""), keys: showAt(0.78, 0.8) },
      { name: "they believe it too: a soft golden ring about them", svg: care(148, 70.2, 7.6, 2.8, SOFT_GOLD), keys: showAt(0.8, 0.82), loop: soft },
      { name: "not there: grey rings about two empty spots beside his place", svg: empty.map(([x, y]) => greyRing(x, y, 3, 2)).join(""), keys: showAt(0.88, 0.91) }
    ],
    words: [
      { text: "A shepherd was with his sheep", from: 0.02, to: 0.125 },
      { text: "A wolf attacked and took a sheep", from: 0.14, to: 0.265 },
      { text: "He went after it until he saved it", from: 0.28, to: 0.385 },
      { text: "The wolf turned and said: who guards it", from: 0.4, to: 0.505 },
      { text: "On the day of wild beasts, but me?", from: 0.52, to: 0.625 },
      { text: "The people said: Glory be to Allah!", from: 0.64, to: 0.745 },
      { text: "I believe it, as do Abu Bakr and Umar", from: 0.76, to: 0.865 },
      { text: "And Abu Bakr and Umar were not there", from: 0.88, to: 1 }
    ]
  };
}

/** The sky of a dream: deep violet, with stars. */
export const DREAM_STARS: [number, number][] = [
  [14, 14],
  [36, 26],
  [58, 13],
  [96, 15],
  [118, 30],
  [146, 14],
  [80, 36],
  [24, 46],
  [138, 48]
];

/** A bucket hanging by its handle, the handle's top at (x, y). */
const bucket = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${n(y + 3)} Q${x} ${n(y - 3)} ${n(x + 3.2)} ${n(y + 3)}" stroke="#5E4630" stroke-width="0.6" fill="none"/>` +
  `<path d="M${n(x - 3.6)} ${n(y + 3)} L${n(x + 3.6)} ${n(y + 3)} L${n(x + 2.8)} ${n(y + 8.6)} L${n(x - 2.8)} ${n(y + 8.6)} Z" fill="#8C5A2E"/>` +
  `<path d="M${n(x - 3.4)} ${n(y + 4.6)} L${n(x + 3.4)} ${n(y + 4.6)} M${n(x - 3.1)} ${n(y + 7)} L${n(x + 3.1)} ${n(y + 7)}" stroke="#6E4422" stroke-width="0.5"/>`;

// The dream of the well. Abu Hurairah heard the Prophet ﷺ say: while I was sleeping, I saw myself at a well with a
// bucket on it, and I drew from it as much as Allah willed. Then Ibn Abi Quhafah took it and drew a bucket or two. Then
// it became a huge bucket, and Ibn al-Khattab took it, and I never saw a mighty one among the people draw as Umar drew,
// until the people drank their fill and their camels knelt to rest (Sahih al-Bukhari 3664). No one is drawn: in the
// night of a dream, a well stands with two posts and a crossbar over it, a rope and a bucket hanging, and a trough
// beside it. His place, a golden ring, comes by the well; the bucket goes down into the well and comes up full, twice,
// and the water in the trough rises. His place goes aside, and another place comes to the well, Ibn Abi Quhafah's, and
// the bucket goes down and up twice more. The bucket grows huge. That place goes aside, and Umar's place comes, a soft
// golden ring about it; the huge bucket goes down and up, quickly, twice, and the trough is full. Then places come to the
// trough, and camels kneel by it.
function wellDream(): SignArt {
  const cx = 70;
  const bar = 52;
  const top = 60;
  const deep = 24;
  const rim = 84;
  const bottom = 103;
  const drawer: [number, number] = [52, 101];
  const draws: [number, number, number][] = [
    [0.16, 0.18, 0.2],
    [0.21, 0.23, 0.25],
    [0.36, 0.38, 0.4],
    [0.41, 0.43, 0.45],
    [0.76, 0.78, 0.8],
    [0.81, 0.825, 0.835]
  ];
  const dips: [number, number, number][] = draws.flatMap(([a, b, c]): [number, number, number][] => [
    [a, 0, 0],
    [b, 0, deep],
    [c, 0, 0]
  ]);
  const rope: [number, number][] = dips.map(([t, , dy]) => [t, Math.round(((top - bar + dy) / (top - bar)) * 1000) / 1000]);
  const grow: [number, number][] = [
    [0.53, 1],
    [0.56, 2.2]
  ];
  const full: [number, number][] = draws.flatMap(([, b, c]): [number, number][] => [
    [b, 0],
    [at3(b + 0.005), 1],
    [c, 1],
    [at3(c + 0.005), 0]
  ]);
  const levels: [number, number][] = [
    [0.2, 0.2],
    [0.25, 0.2],
    [0.26, 0.35],
    [0.4, 0.35],
    [0.41, 0.5],
    [0.45, 0.5],
    [0.46, 0.6],
    [0.8, 0.6],
    [0.81, 0.8],
    [0.835, 0.8],
    [0.84, 1]
  ];
  const opening = `<ellipse cx="${cx}" cy="${rim}" rx="13" ry="3" fill="#2A2438"/><ellipse cx="${cx}" cy="${rim}" rx="13" ry="3" stroke="#8E7E66" stroke-width="0.8" fill="none"/>`;
  const front =
    `<path d="M${cx - 13} ${rim} A13 3 0 0 0 ${cx + 13} ${rim} L${cx + 13} ${bottom} L${cx - 13} ${bottom} Z" fill="#A8957A"/>` +
    [90, 96].map((yy) => `<path d="M${cx - 13} ${yy} L${cx + 13} ${yy}" stroke="#8E7E66" stroke-width="0.5"/>`).join("") +
    [
      [62, 87, 90],
      [76, 87, 90],
      [66, 90, 96],
      [74, 90, 96],
      [61, 96, bottom],
      [70, 96, bottom],
      [79, 96, bottom]
    ]
      .map(([x, a, b]) => `<path d="M${x} ${a} L${x} ${b}" stroke="#8E7E66" stroke-width="0.5"/>`)
      .join("");
  const frame =
    `<rect x="${cx - 15}" y="${bar - 2}" width="1.8" height="${bottom - bar + 2}" fill="#7A5A3A"/><rect x="${cx + 13.2}" y="${bar - 2}" width="1.8" height="${bottom - bar + 2}" fill="#7A5A3A"/>` +
    `<rect x="${cx - 17}" y="${bar - 3.4}" width="34" height="2.2" rx="0.6" fill="#8C6A44"/><circle cx="${cx}" cy="${bar - 0.6}" r="1.8" fill="#6E5034"/>`;
  const trough = `<path d="M88 94 L122 94 L120.4 104 L89.6 104 Z" fill="#9C8A70"/><rect x="89.6" y="94.6" width="30.8" height="1.2" fill="#6E5E48"/>`;
  const folk: [number, number][] = [
    [94, 106.6],
    [105, 107.2],
    [116, 106.6]
  ];
  return {
    kind: "well-dream",
    ms: 12000,
    parts: [
      { name: "sky of the dream", svg: sky("#4F4A8C", "#7D77BE", 62) },
      { name: "stars of the dream", svg: stars(DREAM_STARS), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
      { name: "the land of the dream", svg: `<rect y="61" width="160" height="59" fill="#8A7EA8"/><path d="M0 61 L160 61" stroke="#9C90B8" stroke-width="0.7"/>` },
      { name: "a dream: a soft haze", svg: wash(80, 64, 96, 64, "#FFFFFF", 0.025), loop: { move: "twinkle", ms: 2600, low: 0.6 } },
      { name: "the well's posts and crossbar", svg: frame },
      { name: "the opening of the well", svg: opening },
      { name: "the rope", svg: `<path d="M${cx} ${bar} L${cx} ${top}" stroke="#C9A76E" stroke-width="0.7"/>`, origin: { x: cx, y: bar }, keys: track({ scaleY: rope }) },
      { name: "the bucket", svg: bucket(cx, top), origin: { x: cx, y: top }, keys: track({ xy: dips, scale: grow }) },
      { name: "water in the bucket", svg: `<ellipse cx="${cx}" cy="${top + 3.3}" rx="3.3" ry="0.7" fill="#5B9BD5"/>`, origin: { x: cx, y: top }, keys: track({ xy: dips, scale: grow, opacity: full }) },
      { name: "the well's front wall", svg: front },
      { name: "the trough", svg: trough },
      {
        name: "water in the trough",
        svg: `<rect x="90" y="96" width="30" height="6.4" fill="#5B9BD5"/>`,
        origin: { x: 105, y: 102.4 },
        keys: track({
          scaleY: levels,
          opacity: [
            [0.2, 0],
            [0.21, 1]
          ]
        })
      },
      {
        name: "a golden ring, his place",
        svg: ring(drawer[0], drawer[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.32, 0, 0],
            [0.34, -14, -6]
          ],
          opacity: [
            [0.04, 0],
            [0.07, 1]
          ]
        })
      },
      {
        name: "Ibn Abi Quhafah's place",
        svg: someone(24, 103, 1.5, LIGHT),
        keys: track({
          xy: [
            [0.33, 0, 0],
            [0.36, drawer[0] - 24, drawer[1] - 103],
            [0.64, drawer[0] - 24, drawer[1] - 103],
            [0.66, 10, 1.6]
          ],
          opacity: [
            [0.32, 0],
            [0.33, 1]
          ]
        })
      },
      {
        name: "Ibn al-Khattab's place, Umar's",
        svg: someone(14, 98, 1.5, LIGHT),
        keys: track({
          xy: [
            [0.66, 0, 0],
            [0.69, drawer[0] - 14, drawer[1] - 98]
          ],
          opacity: [
            [0.64, 0],
            [0.65, 1]
          ]
        })
      },
      { name: "a huge bucket: glints about it", svg: sparkle(58, 66, 1.4, "#FFE7A0") + sparkle(82, 70, 1.2, "#FFE7A0") + sparkle(64, 80, 1, "#FFE7A0"), keys: showFor(0.55, 0.57, 0.64, 0.66), loop: { move: "twinkle", ms: 900, low: 0.4 } },
      { name: "mighty in drawing: a soft golden ring about Umar's place", svg: care(drawer[0], drawer[1], 4.6, 2.4, SOFT_GOLD), keys: showAt(0.76, 0.78), loop: soft },
      { name: "the trough full: glints on its water", svg: sparkle(95, 97, 1, "#FFFFFF") + sparkle(106, 96.8, 1.2, "#FFFFFF") + sparkle(116, 97.2, 0.9, "#FFFFFF"), keys: showAt(0.92, 0.95), loop: { move: "twinkle", ms: 900, low: 0.4 } },
      { name: "the folk come to drink: places at the trough", svg: folk.map(([x, y]) => someone(x, y, 1.5, LIGHT)).join(""), keys: showAt(0.9, 0.93) },
      { name: "camels kneeling to rest by the trough", svg: restingCamel(134, 106, 0.8) + restingCamel(146, 97, 0.66), keys: showAt(0.9, 0.93) }
    ],
    words: [
      { text: "While I slept, I saw myself at a well", from: 0.02, to: 0.14 },
      { text: "I drew from it as much as Allah willed", from: 0.16, to: 0.3 },
      { text: "Then Ibn Abi Quhafah drew a bucket or two", from: 0.32, to: 0.5 },
      { text: "Then it became a huge bucket", from: 0.52, to: 0.625 },
      { text: "And Ibn al-Khattab took it", from: 0.64, to: 0.745 },
      { text: "I never saw a mighty one draw like Umar", from: 0.76, to: 0.88 },
      { text: "Until the people drank and camels knelt", from: 0.895, to: 1 }
    ]
  };
}

// The land of palms. Abu Musa said that the Prophet ﷺ said: I saw in a dream that I was migrating from Makkah to a land
// with palm trees, and I thought that it was al-Yamamah or Hajar; but it was Madinah, Yathrib (Sahih al-Bukhari 7035).
// No one is drawn: in the night of a dream, the Ka'bah stands among the hills of Makkah on the left, and his place, a
// golden ring, is by it. A dashed way shows, and his place sets out along it. A land of palm trees shows on the right,
// a soft ring about it, and his place goes on toward it. Far off, two small lands of palms show, lines going to them
// and rings about them: al-Yamamah or Hajar. Then they fade, homes show among the palms, Yathrib, with a golden ring
// about them: Madinah; his place goes there, and a warm glow comes over it.
function landOfPalms(): SignArt {
  const start: [number, number] = [30, 101.4];
  const going: [number, number][] = [
    [62, 103],
    [92, 103.4],
    [114, 104]
  ];
  const farLands: [number, number][] = [
    [64, 70],
    [98, 67]
  ];
  const tiny = (x: number, y: number) => palm(x - 2, y, 6, "#3E6A4A") + palm(x + 3, y + 0.6, 5, "#3E6A4A");
  const groveAt = (x: number, y: number, h: number, i: number): SignPart => ({
    name: `a palm of the land of palms ${i + 1}`,
    svg: palm(x, y, h, "#3E7A4A"),
    origin: { x, y },
    keys: showAt(0.26, 0.3),
    loop: { move: "sway", ms: 5200 + i * 600, angle: 1.4, phase: i / 4 }
  });
  return {
    kind: "land-of-palms",
    ms: 9000,
    parts: [
      { name: "sky of the dream", svg: sky("#4F4A8C", "#7D77BE", 62) },
      { name: "stars of the dream", svg: stars(DREAM_STARS), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
      {
        name: "hills of Makkah",
        svg: peaks(
          [
            [14, 20, 20],
            [40, 13, 18]
          ],
          62,
          "#3F3A6E",
          false
        )
      },
      { name: "the land of the dream", svg: `<rect y="61" width="160" height="59" fill="#8A7EA8"/><path d="M0 61 L160 61" stroke="#9C90B8" stroke-width="0.7"/>` },
      { name: "a dream: a soft haze", svg: wash(80, 64, 96, 64, "#FFFFFF", 0.025), loop: { move: "twinkle", ms: 2600, low: 0.6 } },
      { name: "the Ka'bah, in Makkah", svg: kabah(10, 99, 10) },
      { name: "the way of the migration", svg: way(`M${start[0] + 4} ${start[1] + 0.6} Q76 108 ${going[2][0]} ${going[2][1]}`, "#E8E0FF", 1), keys: showAt(0.04, 0.06) },
      { name: "homes among the palms: Yathrib", svg: home(122, 100, 11, 10, "#B89A78", "#A08462", "#3A2E3E") + home(138, 97, 12, 11, "#B89A78", "#A08462", "#3A2E3E") + home(152, 101, 9, 9, "#B89A78", "#A08462", "#3A2E3E"), keys: showAt(0.74, 0.78) },
      groveAt(116, 100, 20, 0),
      groveAt(130, 95, 24, 1),
      groveAt(146, 99, 20, 2),
      groveAt(150, 93, 16, 3),
      { name: "a land of palm trees: a soft ring about it", svg: care(136, 99, 24, 6, "#E8E0FF"), keys: showFor(0.3, 0.33, 0.74, 0.76), loop: soft },
      ...farLands.map(
        ([x, y], i): SignPart => ({ name: `a land of palms far off ${i + 1}`, svg: tiny(x, y), keys: showFor(0.5, 0.52, 0.74, 0.77) })
      ),
      ...farLands.map(
        ([x, y], i): SignPart => ({
          name: `thought of: a line to a land far off ${i + 1}`,
          svg: lookLine(going[1][0], n(going[1][1] - 3), x, n(y + 2), n(y + 14), "#D8D0F0"),
          keys: showFor(at3(0.5 + i * 0.03), at3(0.53 + i * 0.03), 0.74, 0.77)
        })
      ),
      ...farLands.map(
        ([x, y], i): SignPart => ({
          name: `thought of: a ring about a land far off ${i + 1}`,
          svg: care(x, n(y + 0.4), 7, 2.4, "#D8D0F0"),
          keys: showFor(at3(0.52 + i * 0.03), at3(0.55 + i * 0.03), 0.74, 0.77)
        })
      ),
      { name: "it was Madinah: a golden ring about Yathrib", svg: care(136, 99, 24, 6, SOFT_GOLD), keys: showAt(0.78, 0.81), loop: soft },
      {
        name: "a golden ring, his place",
        svg: ring(start[0], start[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.07, 0, 0],
            [0.18, going[0][0] - start[0], going[0][1] - start[1]],
            [0.34, going[0][0] - start[0], going[0][1] - start[1]],
            [0.42, going[1][0] - start[0], going[1][1] - start[1]],
            [0.82, going[1][0] - start[0], going[1][1] - start[1]],
            [0.9, going[2][0] - start[0], going[2][1] - start[1]]
          ]
        })
      },
      { name: "Madinah: a warm glow over it", svg: wash(132, 94, 26, 13, WARM, 0.16), keys: showAt(0.9, 0.94), loop: soft }
    ],
    words: [
      { text: "I saw in a dream that I was migrating", from: 0.02, to: 0.24 },
      { text: "From Makkah to a land of palm trees", from: 0.26, to: 0.48 },
      { text: "I thought it was al-Yamamah or Hajar", from: 0.5, to: 0.72 },
      { text: "But it was Madinah, Yathrib", from: 0.74, to: 1 }
    ]
  };
}

export const SEEN_ART = {
  "guided-to-friday": guidedToFriday,
  "prayers-at-home": prayersAtHome,
  "prayer-on-his-mount": prayerOnHisMount,
  "fast-horse": fastHorse,
  "talking-wolf": talkingWolf,
  "well-dream": wellDream,
  "land-of-palms": landOfPalms
};
