import { animalAt, cloud, glow, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, jug, palms, sparkRising, track } from "./daysArt";
import { DUSK, greyRing, soft, speaking } from "./fastArt";
import { food } from "./hopeArt";
import { lookLine, waterskin } from "./truthArt";
import { road, showAt, showFor } from "./roadArt";

/**
 * Kin and kindness: a Muslim, the brother of a Muslim, who meets his need, relieves his hardship and covers him; Usamah
 * and al-Hasan, taken up together, and his du'a that Allah love them both; the traveller who hurries home to his family
 * once his work is done; the people of Yemen, gentle and soft-hearted; his modest pace setting off from Arafat, faster
 * where there was room; Anas's salam to the boys, as he used to give it; and his joy at the families coming back from a
 * wedding. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no
 * person is ever drawn, not even a hand, a foot or a face, and no one is drawn on a camel: where someone was, a ring or a
 * small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn
 * for Allah, and nothing comes down from the sky: a du'a is a spark that rises, and what Allah gives is a light that
 * comes about its place.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A grey for what is hard or not to be done. */
const GREY = "#8C8C8C";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of dry grass. */
const kinLand = (tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts);

/** Places of a group, each a small dashed circle of radius `r`. */
const placesAt = (list: [number, number][], r = 1.4) => list.map(([x, y]) => someone(x, y, r)).join("");

/** A group of places coming from `dx`, `dy` away to where they are drawn, from `from` to `to`, showing as they start. */
const comingIn = (dx: number, dy: number, from: number, to: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.01), 1]
    ],
    xy: [
      [from, dx, dy],
      [to, 0, 0]
    ]
  });

/** A place drawn at `a` that shows at `from` and goes to `b` by `to`. */
const comingFrom = (a: [number, number], b: [number, number], from: number, to: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.01), 1]
    ],
    xy: [
      [from, 0, 0],
      [to, n(b[0] - a[0]), n(b[1] - a[1])]
    ]
  });

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheep = (x: number, y: number, s: number, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73 * s), s, left);

/** A puff of dust on the ground at (x, y), there for a moment from `start`, rising a little. */
const puff = (name: string, x: number, y: number, start: number): SignPart => ({
  name,
  svg: `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.4" fill="#F4EAD2" opacity="0.9"/><ellipse cx="${n(x + 2.2)}" cy="${n(y + 0.4)}" rx="1.7" ry="1" fill="#F8F0DE" opacity="0.85"/>`,
  keys: track({
    opacity: [
      [start, 0],
      [at3(start + 0.006), 0.9],
      [at3(start + 0.024), 0]
    ],
    xy: [
      [start, 0, 0],
      [at3(start + 0.024), 0, -3]
    ]
  })
});

/** Water at the mouth of a jug whose foot's middle is at (x, y). */
const waterIn = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y - 6.3)}" rx="1.25" ry="0.5" fill="#7FB8E0"/><path d="M${n(x - 0.6)} ${n(y - 6.45)} L${n(x + 0.3)} ${n(y - 6.45)}" stroke="#D8ECF8" stroke-width="0.3"/>`;

/** The dark mouth of an empty jug whose foot's middle is at (x, y). */
const emptyMouth = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 6.3)}" rx="1.25" ry="0.5" fill="#4E3218"/>`;

/** A wide pale plain over the whole scene: the Day. */
const PLAIN = `<rect width="160" height="120" fill="#EEE8F0"/><rect y="70" width="160" height="50" fill="#E6DECD"/><path d="M0 70 L160 70" stroke="#D6CCB8" stroke-width="0.6"/>`;

// A Muslim's brother. Abdullah ibn Umar said that the Messenger of Allah ﷺ said: a Muslim is the brother of a Muslim;
// he does not wrong him, nor hand him over. Whoever is meeting his brother's need, Allah is meeting his need; whoever
// relieves a Muslim of a hardship, Allah relieves him of one of the hardships of the Day of Resurrection; and whoever
// covers a Muslim, Allah covers him on the Day of Resurrection (Sahih al-Bukhari 2442). No one is drawn: by the masjid
// of Madinah, his place, a golden ring, his voice speaking, and the places of two Muslims, with a soft golden ring about
// both. A grey place comes to wrong one of them; the other stands in its way, and it turns back. An empty jug, with a
// grey ring, is by the one in need; the other's full jug goes to it, and a new jug of water comes by the one who gave,
// with a glint and a glow. A grey haze of hardship comes about the one in need; the other comes to its side, a soft
// golden ring of care comes, and the haze lifts. Then a wide pale plain, the Day: the one who helped stands on it, a
// grey haze about it, which lifts in a soft golden glow. Back in Madinah, a small grey mark, a fault, shows by the one
// in need, and a soft white veil comes over it; then the pale plain of that Day comes back, faint, and a soft white veil
// comes about the one who covered it, for Allah covers him on the Day of Resurrection.
function brotherOfAMuslim(): SignArt {
  const his: [number, number] = [24, 99.8];
  const inNeed: [number, number] = [60, 102.4];
  const helps: [number, number] = [92, 102.4];
  const beside: [number, number] = [73.4, 102.4];
  const needJug: [number, number] = [66.4, 105.6];
  const fullJug: [number, number] = [85.6, 105.6];
  const wrong0: [number, number] = [150, 102.6];
  const wrong: [number, number] = [106, 102.6];
  const onThatDay: [number, number] = [80, 103];
  return {
    kind: "brother-of-a-muslim",
    ms: 12000,
    parts: [
      ...daySky(132, 62, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: kinLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      { name: "the home of the one in need", svg: home(44, 94, 14, 10) },
      { name: "the home of the one who helps", svg: home(120, 94, 15, 10.4) },
      ...palms([
        [104, 92.6, 12],
        [148, 93, 11]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: each Muslim is kin to a Muslim", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.025, 0.035), loop: speaking },
      { name: "the one in need: a place", svg: someone(inNeed[0], inNeed[1], 1.5) },
      {
        name: "the one who helps: a place",
        svg: someone(helps[0], helps[1], 1.5),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.165, 6, 0],
            [0.198, 6, 0],
            [0.21, 0, 0],
            [0.53, 0, 0],
            [0.55, n(beside[0] - helps[0]), 0]
          ]
        })
      },
      { name: "one in Islam: a soft golden ring about the two places", svg: care(n((inNeed[0] + helps[0]) / 2), n(inNeed[1] + 0.6), 19.6, 3.4, SOFT_GOLD), keys: showFor(0.04, 0.07, 0.146, 0.152), loop: soft },
      {
        name: "one who would wrong: a grey place",
        svg: someone(wrong[0], wrong[1], 1.5, GREY) + greyRing(wrong[0], n(wrong[1] + 0.5), 3.2, 1.7),
        keys: track({
          opacity: [
            [0.146, 0],
            [0.152, 1],
            [0.19, 1],
            [0.205, 0]
          ],
          xy: [
            [0.146, n(wrong0[0] - wrong[0]), 0],
            [0.165, 0, 0],
            [0.175, 0, 0],
            [0.205, n(wrong0[0] - wrong[0]), 0]
          ]
        })
      },
      { name: "not handed over: a soft ring about the one in need", svg: care(inNeed[0], n(inNeed[1] + 0.5), 3.4, 1.7, SOFT_GOLD), keys: showFor(0.168, 0.18, 0.268, 0.275), loop: soft },
      {
        name: "in need: an empty jug by the one in need",
        svg: jug(needJug[0], needJug[1]) + emptyMouth(needJug[0], needJug[1]),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.28, 1],
            [0.305, 1],
            [0.315, 0]
          ]
        })
      },
      { name: "in need: a grey ring about the empty jug", svg: greyRing(needJug[0], n(needJug[1] - 1.2), 4, 2), keys: showFor(0.27, 0.28, 0.315, 0.325) },
      {
        name: "the need met: the full jug of the one who helps, given",
        svg: jug(fullJug[0], fullJug[1]) + waterIn(fullJug[0], fullJug[1]),
        keys: track({
          xy: [
            [0.29, 0, 0],
            [0.315, n(needJug[0] - fullJug[0]), 0]
          ]
        })
      },
      { name: "the need met: a glint on the jug", svg: sparkle(n(needJug[0] + 2.6), n(needJug[1] - 8), 0.9, "#FFE7A0"), keys: showFor(0.318, 0.328, 0.518, 0.528), loop: speaking },
      { name: "the need of the one who helps, met: a jug of water", svg: jug(fullJug[0], fullJug[1]) + waterIn(fullJug[0], fullJug[1]), keys: showAt(0.4, 0.415) },
      { name: "met: a glint on the new jug", svg: sparkle(n(fullJug[0] - 2.6), n(fullJug[1] - 8), 0.9, "#FFE7A0"), keys: showFor(0.415, 0.425, 0.518, 0.528), loop: speaking },
      { name: "met: a soft golden glow about the one who helps", svg: glow(helps[0], n(helps[1] - 1.4), 6.4, WARM, 0.22), keys: showFor(0.42, 0.445, 0.518, 0.528) },
      {
        name: "a hardship: a grey haze about the one in need",
        svg: wash(inNeed[0], n(inNeed[1] - 0.6), 6, 3.2, "#7A7A7A", 0.12),
        keys: track({
          opacity: [
            [0.518, 0],
            [0.53, 1],
            [0.56, 1],
            [0.58, 0]
          ]
        })
      },
      { name: "relieved: a soft golden ring about the one in need", svg: care(inNeed[0], n(inNeed[1] + 0.5), 3.6, 1.8, SOFT_GOLD), keys: showAt(0.552, 0.568), loop: soft },
      {
        name: "a fault: a small grey mark by the one in need",
        svg: `<circle cx="${n(inNeed[0] - 3.4)}" cy="${n(inNeed[1] + 2.4)}" r="0.9" fill="${GREY}"/><circle cx="${n(inNeed[0] - 2.2)}" cy="${n(inNeed[1] + 3.2)}" r="0.5" fill="${GREY}"/>`,
        keys: track({
          opacity: [
            [0.905, 0],
            [0.912, 1],
            [0.92, 1],
            [0.935, 0]
          ]
        })
      },
      { name: "covered: a soft white veil over the one in need", svg: wash(n(inNeed[0] - 1.2), n(inNeed[1] + 0.4), 6.4, 3.6, "#FFFFFF", 0.22), keys: showAt(0.915, 0.93) },
      {
        name: "that Day: a wide pale plain",
        svg: PLAIN,
        keys: track({
          opacity: [
            [0.645, 0],
            [0.672, 1],
            [0.889, 1],
            [0.905, 0]
          ]
        })
      },
      { name: "the one who helped, on that Day", svg: someone(onThatDay[0], onThatDay[1], 1.6), keys: showFor(0.66, 0.672, 0.889, 0.9) },
      {
        name: "the hardships of that Day: a grey haze about the one who helped",
        svg: wash(onThatDay[0], n(onThatDay[1] - 0.6), 7, 3.6, "#6E6E6E", 0.13),
        keys: track({
          opacity: [
            [0.676, 0],
            [0.7, 1],
            [0.77, 1],
            [0.8, 0]
          ]
        })
      },
      { name: "relieved on that Day: a soft golden glow about the one who helped", svg: glow(onThatDay[0], n(onThatDay[1] - 1.4), 7.4, WARM, 0.26), keys: showFor(0.785, 0.815, 0.889, 0.9) },
      { name: "relieved on that Day: a soft golden ring about the one who helped", svg: care(onThatDay[0], n(onThatDay[1] + 0.5), 3.8, 1.9, SOFT_GOLD), keys: showFor(0.8, 0.815, 0.889, 0.9), loop: soft },
      // Allah covers him on the Day of Resurrection: that Day comes back, faint, for the last veil.
      { name: "that Day again: the wide pale plain, faint", svg: PLAIN, keys: track({ opacity: [[0.93, 0], [0.946, 0.5]] }) },
      { name: "the one who covered, on that Day", svg: someone(beside[0], beside[1], 1.5), keys: showAt(0.93, 0.946) },
      { name: "covered in turn: a soft white veil about the one who helps", svg: wash(beside[0], n(beside[1] + 0.4), 6, 3.4, "#FFFFFF", 0.22), keys: showAt(0.94, 0.955) }
    ],
    words: [
      { text: "A Muslim is a brother of a Muslim", from: 0.02, to: 0.129 },
      { text: "who must not be wronged or handed over", from: 0.144, to: 0.253 },
      { text: "whoever meets his brother's need", from: 0.268, to: 0.377 },
      { text: "Allah meets his need", from: 0.392, to: 0.501 },
      { text: "whoever relieves a Muslim of a hardship", from: 0.516, to: 0.625 },
      { text: "Allah relieves him of a hardship", from: 0.64, to: 0.749 },
      { text: "of the Day of Resurrection", from: 0.764, to: 0.873 },
      { text: "whoever covers a Muslim, Allah covers him", from: 0.888, to: 1 }
    ]
  };
}

// Love them both. Usamah ibn Zayd said that the Prophet ﷺ would take him and al-Hasan, and say: O Allah, love them
// both, for I love them both (Sahih al-Bukhari 3735). No one is drawn: by the masjid of Madinah, his place, a golden
// ring. Usamah's small place comes from its home to his side, and a soft golden ring comes about it; then al-Hasan's
// small place comes from another home to his other side, with a soft golden ring, and a soft golden ring comes about
// the three. His voice speaks, a spark of du'a rises, and a warm glow comes about each small place; then a soft golden
// glow comes about the three, and glints over the two small places.
function loveThemBoth(): SignArt {
  const his: [number, number] = [64, 100.8];
  const usamah0: [number, number] = [124.4, 101.8];
  const usamah: [number, number] = [69.8, 102.2];
  const hasan0: [number, number] = [36.4, 101.6];
  const hasan: [number, number] = [58.2, 102.2];
  return {
    kind: "love-them-both",
    ms: 9000,
    parts: [
      ...daySky(130, 70, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: kinLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      { name: "Usamah's home", svg: home(126, 94, 15, 10) },
      { name: "a home of Madinah", svg: home(38, 94, 13, 9.4) },
      ...palms([
        [92, 92.4, 12],
        [150, 93, 11]
      ]),
      {
        name: "sheep grazing by Usamah's home",
        svg: sheep(140, 105, 0.1) + sheep(150, 106.2, 0.1, true),
        loop: { move: "bob", ms: 2600, y: 0.3 }
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Usamah's small place", svg: someone(usamah0[0], usamah0[1], 1.1), keys: comingFrom(usamah0, usamah, 0.04, 0.16) },
      { name: "taken up: a soft golden ring about Usamah's small place", svg: care(usamah[0], n(usamah[1] + 0.4), 2.4, 1.3, SOFT_GOLD), keys: showAt(0.17, 0.19), loop: soft },
      { name: "al-Hasan's small place", svg: someone(hasan0[0], hasan0[1], 1.1), keys: comingFrom(hasan0, hasan, 0.28, 0.38) },
      { name: "taken up: a soft golden ring about al-Hasan's small place", svg: care(hasan[0], n(hasan[1] + 0.4), 2.4, 1.3, SOFT_GOLD), keys: showAt(0.39, 0.41), loop: soft },
      { name: "held close: a soft golden ring about the three places", svg: care(his[0], n(his[1] + 1.2), 10.4, 3.4, SOFT_GOLD), keys: showAt(0.42, 0.45), loop: soft },
      { name: "his voice: a du'a for the two", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      { name: "his du'a: a spark rising", svg: sparkle(his[0], n(his[1] - 5), 1.6, "#FFE7A0"), keys: sparkRising(0.54, 0.6, 12), loop: speaking },
      { name: "loved: a warm glow about Usamah's small place", svg: glow(usamah[0], n(usamah[1] - 0.8), 4.4, WARM, 0.3), keys: showAt(0.6, 0.64) },
      { name: "loved: a warm glow about al-Hasan's small place", svg: glow(hasan[0], n(hasan[1] - 0.8), 4.4, WARM, 0.3), keys: showAt(0.61, 0.65) },
      { name: "his love: a soft golden glow about the three places", svg: wash(his[0], n(his[1] + 0.2), 15, 5.4, WARM, 0.12), keys: showAt(0.77, 0.8) },
      {
        name: "his love: glints over the two small places",
        svg: glints([
          [n(usamah[0] + 1.4), n(usamah[1] - 4)],
          [n(hasan[0] - 1.4), n(hasan[1] - 4)]
        ]),
        keys: showAt(0.8, 0.815),
        loop: speaking
      }
    ],
    words: [
      { text: "He would take Usamah", from: 0.02, to: 0.253 },
      { text: "and al-Hasan", from: 0.268, to: 0.501 },
      { text: "and say: O Allah, love them both", from: 0.516, to: 0.749 },
      { text: "for I love them both", from: 0.764, to: 1 }
    ]
  };
}

/** Night over the whole scene, laid on what is under it. */
const NIGHT = `<rect width="160" height="120" fill="#0F1C3A" opacity="0.52"/>`;

/** Stars in the night sky. */
const NIGHT_STARS = stars([
  [12, 14],
  [30, 46],
  [58, 10],
  [86, 46],
  [104, 10],
  [138, 46],
  [150, 14],
  [146, 30]
]);

/** Shown while `from` to `to` and gone from `hide` to `gone`, for the night: its keys. */
const nightKeys = () =>
  track({
    opacity: [
      [0.52, 0],
      [0.55, 1],
      [0.59, 1],
      [0.62, 0]
    ]
  });

/** Goods in a tied cloth bundle, its foot's middle at (x, y): what the traveller came for. */
const goods = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${y} Q${n(x - 3.6)} ${n(y - 2.6)} ${n(x - 1)} ${n(y - 3.6)} L${n(x + 1)} ${n(y - 3.6)} Q${n(x + 3.6)} ${n(y - 2.6)} ${n(x + 3)} ${y} Z" fill="#8F6A9E"/>` +
  `<path d="M${n(x - 1)} ${n(y - 3.6)} L${n(x - 1.8)} ${n(y - 5)} M${n(x + 1)} ${n(y - 3.6)} L${n(x + 1.8)} ${n(y - 5)}" stroke="#8F6A9E" stroke-width="0.9" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.2)} ${n(y - 3.4)} L${n(x + 1.2)} ${n(y - 3.4)}" stroke="#E8C25A" stroke-width="0.6"/><path d="M${n(x - 2.6)} ${n(y - 1.4)} L${n(x + 2.6)} ${n(y - 1.4)}" stroke="#E8C25A" stroke-width="0.35"/>`;

/** A mat on the ground, its middle at (x, y). */
const mat = (x: number, y: number) => `<path d="M${n(x - 4)} ${n(y - 0.8)} L${n(x + 4)} ${n(y - 0.8)} L${n(x + 4.8)} ${n(y + 0.8)} L${n(x - 4.8)} ${n(y + 0.8)} Z" fill="#B98F5A"/>`;

// Hurry home. Abu Hurairah said that the Prophet ﷺ said: travel is a piece of torment; it keeps one of you from his
// food, his drink and his sleep. So when he has done what he came for, let him hurry home to his family (Sahih
// al-Bukhari 1804). No one is drawn, and no one on a camel: a traveller's place sets out from its home with its camel,
// along the road under the hot sun, a grey ring of weariness about it. At the halt, a dish of food shows by it with a
// grey ring, then a waterskin with a grey ring; night falls, and grey specks of sleeplessness show over it. Day comes,
// and it goes on to the town; a bundle of what it came for shows, with a glint, and goes onto the camel's back. Then
// the camel turns, and the place hurries home with it, dust rising behind; its family's places by the home grow clear,
// a warm glow comes about the home, and glints over them.
function hurryHome(): SignArt {
  const k = 0.18;
  const home0: [number, number] = [14, 94];
  const family: [number, number][] = [
    [6.4, 103.4],
    [10.8, 104.8]
  ];
  const t0: [number, number] = [42, 102.4];
  const c0: [number, number] = [30, 104.2];
  // The traveller's way: out to the halt, on to the town, round the camel, and home in a hurry.
  const out: [number, number, number][] = [
    [0.03, 0, 0],
    [0.12, 40, 0],
    [0.685, 40, 0],
    [0.74, 80, 0]
  ];
  const traveller: [number, number, number][] = [...out, [0.85, 80, 0], [0.86, 56, 0], [0.862, 56, 0], [0.905, -14, 0]];
  const halt: [number, number] = [t0[0] + 40, t0[1]];
  const town: [number, number] = [t0[0] + 80, t0[1]];
  const cTown: [number, number] = [c0[0] + 80, c0[1]];
  const goodsAt: [number, number] = [n(town[0] + 5), n(town[1] + 3.8)];
  const backRight: [number, number] = [n(cTown[0] - 7 * k), n(cTown[1] - 55 * k + 1.2)];
  const backLeft: [number, number] = [n(cTown[0] + 7 * k), n(cTown[1] - 55 * k + 1.2)];
  const homeward = (t: number) => n(cTown[0] - (70 * (t - 0.862)) / 0.043);
  const gone = (from: number, to: number) => showFor(from, to, 0.685, 0.695);
  return {
    kind: "hurry-home",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun",
        svg: sun(112, 20),
        keys: track({
          opacity: [
            [0.52, 1],
            [0.54, 0],
            [0.6, 0],
            [0.62, 1]
          ]
        })
      },
      { name: "a cloud", svg: cloud(60, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: kinLand() },
      { name: "the road", svg: road(0, 160, 104.2) },
      { name: "the traveller's home", svg: home(home0[0], home0[1], 14, 10) },
      { name: "the town the traveller went to", svg: home(142, 94, 12, 9) + home(155, 95, 10, 8, "#C99A66", "#B08452") },
      {
        name: "the traveller's family: small places by the home",
        svg: someone(family[0][0], family[0][1], 1.3) + someone(family[1][0], family[1][1], 1),
        keys: track({
          opacity: [
            [0.905, 0.45],
            [0.92, 1]
          ]
        })
      },
      { name: "the heat of the road: a shimmer", svg: [98, 112, 126].map((x, i) => `<path d="M${x} ${98 - (i % 2) * 1.4} q1.6 -1 3.2 0 q1.6 1 3.2 0" stroke="#FFF6DE" stroke-width="0.5" fill="none" opacity="0.85"/>`).join(""), keys: showFor(0.06, 0.09, 0.185, 0.2), loop: speaking },
      {
        name: "the traveller's camel, going out",
        svg: camel(c0[0], c0[1], k),
        keys: track({
          xy: out,
          opacity: [
            [0.846, 1],
            [0.85, 0]
          ]
        }),
        loop: { move: "bob", ms: 1100, y: -0.3 }
      },
      { name: "the traveller's place", svg: someone(t0[0], t0[1], 1.5), keys: track({ xy: traveller }) },
      {
        name: "torment: a grey ring about the traveller's place",
        svg: greyRing(t0[0], n(t0[1] + 0.5), 3.2, 1.7),
        keys: track({
          xy: traveller,
          opacity: [
            [0.09, 0],
            [0.11, 1],
            [0.905, 1],
            [0.915, 0]
          ]
        })
      },
      { name: "kept from food: a dish by the traveller's place", svg: food(n(halt[0] + 6.4), n(halt[1] + 3.6)), keys: gone(0.19, 0.2) },
      { name: "kept from it: a grey ring about the dish", svg: greyRing(n(halt[0] + 6.4), n(halt[1] + 3.4), 4.4, 2), keys: gone(0.205, 0.22) },
      { name: "kept from drink: a waterskin, nearly empty", svg: waterskin(n(halt[0] + 13), n(halt[1] + 4.4)), keys: gone(0.355, 0.365) },
      { name: "kept from it: a grey ring about the waterskin", svg: greyRing(n(halt[0] + 13), n(halt[1] + 2.4), 3.6, 2.6), keys: gone(0.37, 0.385) },
      { name: "a mat for the night by the traveller's place", svg: mat(n(halt[0] - 0.4), n(halt[1] + 3.4)), keys: showFor(0.525, 0.54, 0.6, 0.615) },
      { name: "the night", svg: NIGHT, keys: nightKeys() },
      { name: "stars", svg: NIGHT_STARS, keys: nightKeys(), loop: { move: "twinkle", ms: 2200, low: 0.5 } },
      { name: "the moon", svg: crescent(124, 24, 4.2, 2, "#FFF3B8"), keys: nightKeys() },
      {
        name: "kept from sleep: grey specks over the traveller's place",
        svg: [
          [-2.2, -4.4],
          [0, -5.6],
          [2.2, -4.4]
        ]
          .map(([dx, dy]) => `<circle cx="${n(halt[0] + dx)}" cy="${n(halt[1] + dy)}" r="0.5" fill="#B9B9B9"/>`)
          .join(""),
        keys: showFor(0.55, 0.565, 0.595, 0.61),
        loop: speaking
      },
      {
        name: "what the traveller came for: a bundle of goods",
        svg: goods(goodsAt[0], goodsAt[1]),
        keys: track({
          opacity: [
            [0.745, 0],
            [0.755, 1],
            [0.846, 1],
            [0.85, 0]
          ],
          xy: [
            [0.765, 0, 0],
            [0.785, n(backRight[0] - goodsAt[0]), n(backRight[1] - goodsAt[1])]
          ]
        })
      },
      { name: "done: a glint over the bundle", svg: sparkle(n(goodsAt[0] + 2.6), n(goodsAt[1] - 6.4), 1, "#FFE7A0"), keys: showFor(0.752, 0.76, 0.765, 0.772), loop: speaking },
      {
        name: "the camel, laden, going home",
        svg: camel(cTown[0], cTown[1], k, true) + goods(backLeft[0], backLeft[1]),
        keys: track({
          opacity: [
            [0.846, 0],
            [0.85, 1]
          ],
          xy: [
            [0.862, 0, 0],
            [0.905, -70, 0]
          ]
        }),
        loop: { move: "bob", ms: 700, y: -0.4 }
      },
      ...[0.868, 0.88, 0.892].map((t, i) => puff(`hurrying: dust behind the camel ${i + 1}`, n(homeward(t) + 10), 105.4, t)),
      { name: "home again: a warm glow about the home", svg: glow(n(home0[0] - 1), n(home0[1] - 3), 12, WARM, 0.2), keys: showAt(0.91, 0.935) },
      { name: "glad: glints over the family's places", svg: glints(family.map(([x, y]) => [n(x + 1.6), n(y - 4.2)])), keys: showAt(0.92, 0.932), loop: speaking }
    ],
    words: [
      { text: "Travel is a piece of torment", from: 0.02, to: 0.17 },
      { text: "it keeps one of you from food", from: 0.185, to: 0.335 },
      { text: "from drink", from: 0.35, to: 0.5 },
      { text: "and from sleep", from: 0.515, to: 0.665 },
      { text: "So when one has done what one came for", from: 0.68, to: 0.83 },
      { text: "let one hurry home to one's family", from: 0.845, to: 1 }
    ]
  };
}

// The soft hearts of Yemen. Abu Hurairah said that the Prophet ﷺ said: the people of Yemen have come to you; they are
// more gentle and soft-hearted. Faith is Yemeni, and wisdom is Yemeni; pride and haughtiness are among the owners of
// camels, and calm and dignity among the owners of sheep (Sahih al-Bukhari 4388). No one is drawn: by the masjid of
// Madinah, his place, a golden ring, his voice speaking. The places of the folk of Yemen come in along the road; a
// soft warm glow comes about them, and soft rings. Golden glints show over them: faith; soft white glints: wisdom; and
// a faint golden way goes back along the road toward Yemen. Far off, camels graze with their owners' places by them, and
// grey rings come about the owners; near, sheep graze with their owners' places, and a soft white glow and soft golden
// rings come about them.
function softHeartsOfYemen(): SignArt {
  const his: [number, number] = [26, 99.8];
  const folk: [number, number][] = [
    [50, 101.8],
    [56, 104.4],
    [62, 101.6],
    [68, 104.2],
    [74, 101.8]
  ];
  const camelOwners: [number, number][] = [
    [128.4, 95.6],
    [148, 96]
  ];
  const sheepOwners: [number, number][] = [
    [100.6, 107.2],
    [148, 107.4]
  ];
  return {
    kind: "soft-hearts-of-yemen",
    ms: 10000,
    parts: [
      ...daySky(134, 90, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: kinLand() },
      { name: "the road from Yemen", svg: road(24, 160, 102.8) },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([[40, 92, 11]]),
      { name: "camels grazing, far off", svg: camel(118, 92.6, 0.12) + camel(139, 93.4, 0.13, true), loop: { move: "bob", ms: 3200, y: 0.3 } },
      { name: "the camels' owners: places by the camels", svg: placesAt(camelOwners, 1.3) },
      { name: "sheep grazing, near", svg: sheep(112, 108, 0.1) + sheep(124, 108.6, 0.1, true) + sheep(136, 108, 0.1), loop: { move: "bob", ms: 2600, y: 0.3 } },
      { name: "the sheep's owners: places by the sheep", svg: placesAt(sheepOwners, 1.3) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: the folk of Yemen have come", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.025, 0.035), loop: speaking },
      { name: "the folk of Yemen: places coming in along the road", svg: placesAt(folk), keys: comingIn(100, 0, 0.03, 0.12) },
      { name: "soft-hearted: a soft warm glow about the folk of Yemen", svg: wash(62, 103, 16, 4.6, WARM, 0.12), keys: showAt(0.19, 0.22) },
      { name: "gentle: soft rings about the folk of Yemen", svg: folk.map(([x, y]) => care(x, n(y + 0.5), 2.6, 1.3, SOFT_GOLD)).join(""), keys: showAt(0.2, 0.23), loop: soft },
      { name: "faith: golden glints over the folk of Yemen", svg: glints([[50, 97.6], [62, 97.4], [74, 97.6]], 1, "#F0C24A"), keys: showAt(0.355, 0.375), loop: speaking },
      { name: "wisdom: soft white glints over the folk of Yemen", svg: glints([[56, 100.2], [68, 100]], 0.9, "#FFFFFF"), keys: showAt(0.52, 0.54), loop: speaking },
      { name: "Yemeni: a faint golden way back along the road", svg: way("M80 102.6 C104 102.2 132 101.8 160 101.4", SOFT_GOLD, 0.8), keys: showAt(0.55, 0.585) },
      { name: "pride and haughtiness: grey rings about the camels' owners", svg: camelOwners.map(([x, y]) => greyRing(x, n(y + 0.5), 3, 1.6)).join(""), keys: showAt(0.685, 0.7) },
      { name: "calm: a soft white glow about the sheep's owners", svg: sheepOwners.map(([x, y]) => wash(x, n(y - 0.4), 5, 2.8, "#FFFFFF", 0.2)).join(""), keys: showAt(0.85, 0.88) },
      { name: "dignity: soft golden rings about the sheep's owners", svg: sheepOwners.map(([x, y]) => care(x, n(y + 0.5), 2.8, 1.4, SOFT_GOLD)).join(""), keys: showAt(0.865, 0.89), loop: soft }
    ],
    words: [
      { text: "The people of Yemen have come to you", from: 0.02, to: 0.17 },
      { text: "they are more gentle and soft-hearted", from: 0.185, to: 0.335 },
      { text: "faith is Yemeni", from: 0.35, to: 0.5 },
      { text: "and wisdom is Yemeni", from: 0.515, to: 0.665 },
      { text: "pride and haughtiness with camel owners", from: 0.68, to: 0.83 },
      { text: "calm and dignity with the owners of sheep", from: 0.845, to: 1 }
    ]
  };
}

/** Places in a row from x1, `step` apart, at y, `count` of them. */
const row = (x1: number, step: number, y: number, count: number, r = 1.2) =>
  Array.from({ length: count }, (_, i) => someone(n(x1 + i * step), y, r)).join("");

// A modest pace. Urwah said: Usamah was asked, while I was sitting there, how the Messenger of Allah ﷺ travelled in the
// Farewell Hajj when he set off. He said: he went at a modest pace, and when he found an open space, he went faster
// (Sahih al-Bukhari 1666). No one is drawn, and no one on a camel: a voice asks Usamah's place. At Arafat, at evening,
// the sun goes down behind the mount, and the pilgrims' places all about set off; his camel, with no one on it, and his
// place, a golden ring, by it, go on with them. Usamah's voice speaks; they go at a modest pace. The places ahead go
// on, and an open space shows before him, with a faint golden way; then the camel and his place go faster across it,
// dust rising behind.
function aModestPace(): SignArt {
  const k = 0.17;
  const usamah: [number, number] = [12, 104.6];
  const asker: [number, number] = [22, 106];
  const c0: [number, number] = [36, 104.4];
  const his0: [number, number] = [48, 102.6];
  // All of them setting off, then at a modest pace; and he, faster across the open space.
  const together: [number, number, number][] = [
    [0.31, 0, 0],
    [0.36, 4, 0],
    [0.43, 4, 0],
    [0.555, 14, 0]
  ];
  const his: [number, number, number][] = [...together, [0.82, 14, 0], [0.86, 38, 0]];
  const ahead: [number, number, number][] = [...together, [0.62, 14, 0], [0.69, 30, 0]];
  const cAt = (t: number) => n(c0[0] + 14 + (24 * (t - 0.82)) / 0.04);
  return {
    kind: "a-modest-pace",
    ms: 9000,
    parts: [
      { name: "the evening sky", svg: sky("#E9B482", "#F8DFB8", 62) },
      {
        name: "the sun, going down",
        svg: sun(120, 40),
        keys: track({
          xy: [
            [0.222, 0, 0],
            [0.3, 0, 20]
          ],
          opacity: [
            [0.27, 1],
            [0.3, 0]
          ]
        })
      },
      { name: "dusk over the sky", svg: DUSK, keys: showAt(0.28, 0.34) },
      { name: "hills", svg: hills("#BFA57E") },
      { name: "the land", svg: kinLand() },
      {
        name: "the mount of Arafat",
        svg:
          `<path d="M34 79 Q44 71 54 67 Q60 62 68 60.2 Q76 57 84 58.2 Q92 59 99 62.6 Q110 67 126 79 Z" fill="#A08A6C"/>` +
          [
            [56, 67.4, 3.2],
            [66, 62.6, 2.8],
            [78, 59.8, 3.4],
            [90, 61.4, 3],
            [100, 66, 3.4],
            [62, 72.6, 3.6],
            [84, 66.8, 4],
            [106, 73, 3.2],
            [48, 74.4, 3]
          ]
            .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.62)}" fill="#8C765A"/><ellipse cx="${n(x - r * 0.3)}" cy="${n(y - r * 0.22)}" rx="${n(r * 0.5)}" ry="${n(r * 0.26)}" fill="#B49E7E"/>`)
            .join("")
      },
      { name: "the pilgrims, far side: places setting off", svg: row(46, 8, 94.6, 14, 1.1), keys: track({ xy: together }) },
      {
        name: "his camel, with no one on it",
        svg: camel(c0[0], c0[1], k),
        keys: track({ xy: his }),
        loop: { move: "bob", ms: 1300, y: -0.3 }
      },
      { name: "his place, a golden ring", svg: ring(his0[0], his0[1], 2.4, GOLD), keys: track({ xy: his }) },
      { name: "the pilgrims ahead: places", svg: row(66, 8, 102.6, 8), keys: track({ xy: ahead }) },
      { name: "the pilgrims, near side: places setting off", svg: row(40, 8, 107.4, 15), keys: track({ xy: together }) },
      { name: "Usamah's place", svg: someone(usamah[0], usamah[1], 1.5) },
      { name: "the one who asked Usamah: a place", svg: someone(asker[0], asker[1], 1.4) },
      { name: "a voice asking Usamah", svg: arcs(n(asker[0] + 2), n(asker[1] - 3.6), VOICE), keys: showFor(0.03, 0.04, 0.42, 0.43), loop: speaking },
      { name: "Usamah's voice: he went at a modest pace", svg: arcsLeft(n(usamah[0] - 2), n(usamah[1] - 3.6), VOICE), keys: showAt(0.42, 0.43), loop: speaking },
      { name: "an open space: a faint golden way ahead", svg: way(`M${n(his0[0] + 19)} 102.8 L${n(his0[0] + 44)} 102.8`, SOFT_GOLD, 0.8), keys: showFor(0.69, 0.71, 0.85, 0.86) },
      ...[0.826, 0.838, 0.85].map((t, i) => puff(`faster: dust behind his camel ${i + 1}`, n(cAt(t) - 13), 104.8, t))
    ],
    words: [
      { text: "Usamah was asked how he travelled", from: 0.02, to: 0.204 },
      { text: "in the Farewell Hajj, setting off", from: 0.219, to: 0.403 },
      { text: "Usamah said: he went at a modest pace", from: 0.418, to: 0.602 },
      { text: "and when he found an open space", from: 0.617, to: 0.801 },
      { text: "he went faster", from: 0.816, to: 1 }
    ]
  };
}

// Salam to the boys. Anas ibn Malik passed by some boys and greeted them with salam, and said: the Prophet ﷺ used to do
// so (Sahih al-Bukhari 6247). No one is drawn: along a lane of Madinah, the small places of the young ones at play.
// Anas's place comes along the lane to them; its voice gives the salam, glints show over them, their voices answer,
// and a soft golden ring comes about them all. Anas's voice speaks again; long before, by the masjid, his place, a
// golden ring, shows with small places by it; his voice gives the salam, glints show over them, and a faint golden line
// goes from his place to Anas's.
function salamToTheBoys(): SignArt {
  const his: [number, number] = [26, 100];
  const young: [number, number][] = [
    [92, 103.4],
    [98, 105.6],
    [104, 103],
    [110, 105.4]
  ];
  const then: [number, number][] = [
    [34, 103.2],
    [39, 105],
    [44, 103.4]
  ];
  const anas0: [number, number] = [30, 102.6];
  const anas: [number, number] = [84, 102.8];
  return {
    kind: "salam-to-the-boys",
    ms: 8000,
    parts: [
      ...daySky(126, 52, 8000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: kinLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.4) },
      { name: "homes along the lane", svg: home(64, 94, 13, 9.4) + home(116, 94, 14, 10) + home(146, 94.4, 13, 9.6, "#C99A66", "#B08452") },
      ...palms([[88, 92.6, 11]]),
      { name: "the young ones' small places, at play", svg: placesAt(young, 1.1), loop: { move: "bob", ms: 900, y: -0.8 } },
      { name: "Anas's place", svg: someone(anas0[0], anas0[1], 1.5), keys: track({ xy: [[0.03, 0, 0], [0.24, n(anas[0] - anas0[0]), n(anas[1] - anas0[1])]] }) },
      { name: "Anas's voice: as-salamu alaykum", svg: arcs(n(anas[0] + 2.2), n(anas[1] - 3.8), VOICE), keys: showFor(0.35, 0.36, 0.6, 0.61), loop: speaking },
      { name: "greeted: glints over the young ones", svg: glints(young.map(([x, y]) => [x, n(y - 4.2)])), keys: showAt(0.38, 0.4), loop: speaking },
      { name: "the young ones' voices, answering", svg: [young[0], young[2]].map(([x, y]) => arcs(n(x + 1.6), n(y - 3.2), "#8A6A4E")).join(""), keys: showFor(0.43, 0.45, 0.6, 0.61), loop: speaking },
      { name: "a soft golden ring about them all", svg: care(98, 104.6, 17, 3.8, SOFT_GOLD), keys: showAt(0.47, 0.5), loop: soft },
      { name: "Anas's voice: he used to do so", svg: arcsLeft(n(anas[0] - 2.2), n(anas[1] - 3.8), VOICE), keys: showAt(0.675, 0.685), loop: speaking },
      { name: "long before: his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: showAt(0.69, 0.71) },
      { name: "long before: small places by his place", svg: placesAt(then, 1.1), keys: track({ opacity: [[0.7, 0], [0.72, 0.75]] }) },
      { name: "his voice: salam to them", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.73, 0.74), loop: speaking },
      { name: "his salam: glints over the small places", svg: glints(then.map(([x, y]) => [x, n(y - 4.2)])), keys: showAt(0.75, 0.77), loop: speaking },
      { name: "followed: a faint golden line from his place to Anas's place", svg: lookLine(n(his[0] + 2.4), n(his[1] - 1.4), n(anas[0] - 1.8), n(anas[1] - 1.6), 88, SOFT_GOLD), keys: showAt(0.79, 0.81) }
    ],
    words: [
      { text: "Anas passed by some boys", from: 0.02, to: 0.33 },
      { text: "and greeted them with salam", from: 0.345, to: 0.655 },
      { text: "Anas said: he used to do so", from: 0.67, to: 1 }
    ]
  };
}

// Joy at a wedding. Anas ibn Malik said: the Prophet ﷺ saw some women and children coming back from a wedding, and he
// stood up, energetic and happy, and said: by Allah, you are among the people most beloved to me, meaning the Ansar
// (Sahih al-Bukhari 5180). No one is drawn: his place, a golden ring, by the masjid of Madinah; far off, a home of the
// Ansar with warm lights, a wedding. The families' places, large and small, show at its door, and a faint golden line
// goes from his place to them; they come along the way toward him. His place rises, standing, with glints and a warm
// glow about it; his voice speaks, and a soft golden glow and glints come over them.
function joyAtAWedding(): SignArt {
  const his: [number, number] = [28, 101.6];
  const families: [number, number, number][] = [
    [62, 101.4, 1.5],
    [67, 104.6, 1.1],
    [72, 101.2, 1.5],
    [77, 104.4, 1.1],
    [82, 101.6, 1.5],
    [87, 104.8, 1.1]
  ];
  const dx = 62;
  return {
    kind: "joy-at-a-wedding",
    ms: 9000,
    parts: [
      ...daySky(44, 96, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: kinLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 94, 0.42) },
      ...palms([
        [48, 92.6, 11],
        [112, 92.2, 12]
      ]),
      { name: "the wedding home of the Ansar", svg: home(140, 94, 18, 12) },
      { name: "the wedding: warm lights by its door", svg: [131, 140, 149].map((x) => glow(x, 84.4, 2.4, WARM, 0.55) + `<circle cx="${x}" cy="84.4" r="0.8" fill="#FFE7A0"/>`).join(""), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      {
        name: "the families' places, large and small",
        svg: families.map(([x, y, r]) => someone(x, y, r)).join(""),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ],
          xy: [
            [0.23, dx, 0],
            [0.34, 0, 0]
          ]
        })
      },
      { name: "he saw them: a faint golden line", svg: lookLine(n(his[0] + 2.4), n(his[1] - 1.6), n(families[0][0] + dx - 2), n(families[0][1] - 1.6), 88, SOFT_GOLD), keys: showFor(0.08, 0.1, 0.22, 0.23) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: track({ xy: [[0.425, 0, 0], [0.44, 0, -3.2]] }) },
      {
        name: "energetic: glints about his place",
        svg: glints([
          [n(his[0] - 3.6), n(his[1] - 6.4)],
          [n(his[0] + 3.8), n(his[1] - 6.8)]
        ]),
        keys: showAt(0.445, 0.46),
        loop: speaking
      },
      { name: "happy: a warm glow about his place", svg: glow(his[0], n(his[1] - 4.4), 7, WARM, 0.24), keys: showAt(0.45, 0.48) },
      { name: "his voice: you are among the most beloved", svg: arcs(n(his[0] + 2.6), n(his[1] - 6.8), GOLD), keys: showAt(0.62, 0.63), loop: speaking },
      { name: "most beloved: a soft golden glow over the families' places", svg: wash(74.6, 103, 17, 4.8, WARM, 0.13), keys: showAt(0.82, 0.85) },
      {
        name: "most beloved: glints over the families' places",
        svg: glints(families.filter((_, i) => i % 2 === 0).map(([x, y]) => [n(x + 1), n(y - 4.4)])),
        keys: showAt(0.84, 0.86),
        loop: speaking
      }
    ],
    words: [
      { text: "Anas said: he saw women and children", from: 0.02, to: 0.204 },
      { text: "coming back from a wedding", from: 0.219, to: 0.403 },
      { text: "he stood up, energetic and happy", from: 0.418, to: 0.602 },
      { text: "and said: by Allah, you are among", from: 0.617, to: 0.801 },
      { text: "the people most beloved to me", from: 0.816, to: 1 }
    ]
  };
}

export const KIN_ART = {
  "brother-of-a-muslim": brotherOfAMuslim,
  "love-them-both": loveThemBoth,
  "hurry-home": hurryHome,
  "soft-hearts-of-yemen": softHeartsOfYemen,
  "a-modest-pace": aModestPace,
  "salam-to-the-boys": salamToTheBoys,
  "joy-at-a-wedding": joyAtAWedding
};
