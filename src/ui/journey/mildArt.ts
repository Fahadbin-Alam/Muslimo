import { cloud, glow, n, nightSky, peaks, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { restingCamel, saddled, showAt, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, SIX, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { lane } from "./freshArt";
import { kaaba } from "./rewardArt";
import { dish } from "./worthArt";

/**
 * Mild ways: four Umrahs and one Hajj; a Hajj made for one too old to sit firm on the mount; the Tawaf of the Ka'bah as the
 * last thing before leaving; leaving Jam' earlier at night, for one who was slow; talbina, disliked yet beneficial; and
 * the children of Adam, who come in the colors of the earth. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a
 * face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is
 * arcs in the air. Adam is not drawn. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes
 * down from the sky: what is good is a light, glints and a soft golden ring. No name, word or number is written.
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
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of seven lines. */
const SEVEN = [
  [0.02, 0.15],
  [0.166, 0.29],
  [0.306, 0.43],
  [0.446, 0.57],
  [0.586, 0.71],
  [0.726, 0.85],
  [0.866, 1]
] as const;

/** Qatadah's place and voice: a slate blue. */
const QATADAH = "#5E6E9A";
/** Anas's place and voice: an olive. */
const ANAS = "#6E7E4E";
/** Ibn Abbas's place and voice: a deep blue. */
const IBN_ABBAS = "#3E5E8A";
/** The place and voice of the one from Khath'am who asked: a rose brown. */
const KHATHAM = "#9A5E5E";
/** The old place far off: a grey brown. */
const OLD = "#6E665A";
/** Old and weak: a soft blue grey. */
const WEAK = "#7E8EA8";
/** The places of those on Hajj: a sand brown. */
const ON_HAJJ = "#B49A78";
/** The places of those about the House: a warm brown. */
const ABOUT_THE_HOUSE = "#9A7A56";
/** Aishah's place and voice by night: a soft rose. */
const AISHAH_NIGHT = "#E8B4CC";
/** Sawdah's place and voice by night: a soft violet. */
const SAWDAH = "#D2B6EE";
/** The places of those resting at Jam' by night: a pale sand. */
const RESTING = "#D8CCB0";
/** Slow: a soft sand. */
const SLOW = "#E3D2A8";
/** Aishah's place and voice: a plum. */
const AISHAH = "#9A5E7A";
/** Urwah's place and voice: a dark brown. */
const URWAH = "#6E5A44";
/** Abu Musa's place and voice: a teal. */
const ABU_MUSA = "#3E7A6E";
/** What is grey: what is not liked, what cannot be. */
const GREY = "#8C8C96";

/** The lands of the earth, side by side: a red land, a white land, a black land and one between. */
const EARTH = {
  red: { land: "#B4553C", wall: "#C2694C", trim: "#A85A40", place: "#A8442C" },
  white: { land: "#EDE7DA", wall: "#F6F2E8", trim: "#DCD4C4", place: "#FBF8F0" },
  black: { land: "#3E3A3A", wall: "#4E4846", trim: "#36302E", place: "#2E2A2A" },
  between: { land: "#B08A5E", wall: "#BE9466", trim: "#A07A50", place: "#7E5A34" }
};

/** A thousandth: times written as the sum of two are kept exact. */
const at3 = (time: number) => Math.round(time * 1000) / 1000;

/** A voice that speaks from `on` until `off`, for each pair. */
const voice = (spans: [number, number][]) =>
  track({
    opacity: spans.flatMap(([on, off]): [number, number][] => [
      [on, 0],
      [at3(on + 0.006), 1],
      [off, 1],
      [at3(off + 0.006), 0]
    ])
  });

/** A small soft golden dot, its middle at (x, y). */
const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="0.85" fill="#EDB846" stroke="#B07E2A" stroke-width="0.25"/>`;

/** A pot on stones, its foot's middle at (x, y). */
const pot = (x: number, y: number) =>
  `<ellipse cx="${n(x - 2.6)}" cy="${n(y - 0.4)}" rx="1.2" ry="0.7" fill="#8E8272"/><ellipse cx="${n(x + 2.6)}" cy="${n(y - 0.4)}" rx="1.2" ry="0.7" fill="#8E8272"/>` +
  `<path d="M${n(x - 3)} ${n(y - 5)} Q${n(x - 3.6)} ${n(y - 0.6)} ${x} ${n(y - 0.6)} Q${n(x + 3.6)} ${n(y - 0.6)} ${n(x + 3)} ${n(y - 5)} Z" fill="#5E4A3A"/>` +
  `<ellipse cx="${x}" cy="${n(y - 5)}" rx="3.2" ry="0.8" fill="#7A644E"/>`;

/** Steam rising over a pot whose foot's middle is at (x, y). */
const steam = (x: number, y: number) =>
  [-1.6, 0, 1.6]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 9 - (i % 2) * 1.4);
      return `<path d="M${sx} ${n(y - 6)} Q${n(sx + 1)} ${n(y - 7.4)} ${sx} ${n(y - 8)} Q${n(sx - 1)} ${n(y - 8.6)} ${sx} ${top}" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.8" stroke-linecap="round"/>`;
    })
    .join("");

/** A bowl of talbina, pale and smooth, its middle at (x, y). */
const talbinaBowl = (x: number, y: number) =>
  dish(x, y) + `<ellipse cx="${x}" cy="${n(y - 1)}" rx="3.3" ry="0.55" fill="#EFE7D4"/><ellipse cx="${n(x - 0.8)}" cy="${n(y - 1.1)}" rx="1.1" ry="0.2" fill="#FFFFFF" opacity="0.7"/>`;

/** Stalks of barley, their feet at (x, y). */
const barley = (x: number, y: number) =>
  [-1.4, 0, 1.4]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 6.4 - (i % 2) * 0.8);
      const lean = n(sx + dx * 0.4);
      return (
        `<path d="M${sx} ${y} Q${sx} ${n(y - 3)} ${lean} ${top}" stroke="#B8994E" stroke-width="0.4" fill="none" stroke-linecap="round"/>` +
        `<ellipse cx="${lean}" cy="${n(top - 1)}" rx="0.55" ry="1.4" fill="#D9B860"/>` +
        `<path d="M${lean} ${n(top - 2.4)} L${lean} ${n(top - 3.6)}" stroke="#D9B860" stroke-width="0.25"/>`
      );
    })
    .join("");

/** A speck of earth, the color of its land, its middle at (x, y). */
const speck = (x: number, y: number, fill: string) =>
  `<path d="M${n(x - 1.3)} ${y} L${x} ${n(y - 1.3)} L${n(x + 1.3)} ${y} L${x} ${n(y + 1.3)} Z" fill="${fill}" stroke="#FFF3CF" stroke-width="0.35"/>`;

/** A land of the earth from x1 to x2, from about y 88 down to the lane. */
const landOfEarth = (x1: number, x2: number, fill: string) =>
  `<path d="M${x1} 89.4 Q${n((x1 + x2) / 2)} 87 ${x2} 89.4 L${x2} 101.2 L${x1} 101.2 Z" fill="${fill}"/>`;

// Four Umrahs, one Hajj. Qatadah said: I asked Anas how many times the Prophet ﷺ had performed Umrah. He replied: four
// times. ... I asked: how many times did he perform Hajj? He replied: once (Sahih al-Bukhari 1778). The words leave out
// the list of the four Umrahs. No one is drawn: in Makkah, the Ka'bah among its hills, homes far off, and far off on the
// left the hill of Arafah; Qatadah's place and Anas's place on the right, and a camel resting. Qatadah's voice asks, and
// a soft light comes about the Ka'bah: Umrah. Anas's voice answers, and four soft golden dots show over the Ka'bah, one by
// one: four times. Qatadah's voice asks again, and a soft light comes about the hill of Arafah: Hajj. Anas's voice
// answers, and one soft golden dot shows over the hill: once.
function fourUmrahsOneHajj(): SignArt {
  const qatadah: [number, number] = [152, 106.8];
  const anas: [number, number] = [134, 106];
  const k: [number, number] = [80, 101];
  const arafah: [number, number] = [24, 84];
  return {
    kind: "four-umrahs-one-hajj",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(128, 20) },
      { name: "a cloud", svg: cloud(70, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "the hills of Makkah", svg: hills("#B89E76") },
      { name: "the land", svg: plainLand("#E2CB9C", [[56, 116], [100, 118], [140, 117]]) },
      { name: "far off on the left: the hill of Arafah", svg: peaks([[arafah[0], 12, 22]], 96, "#B39A72", false) },
      { name: "homes of Makkah, far off", svg: home(108, 89, 9, 6) + home(122, 88.4, 8, 5.4) + home(146, 89.2, 9, 6) },
      { name: "Umrah: a soft light about the Ka'bah", svg: glow(k[0], 95, 11, "#FFF3CF", 0.2), keys: showAt(0.33, 0.345), loop: soft },
      { name: "the Ka'bah", svg: kaaba(k[0], k[1], 1.6) },
      ...[0, 1, 2, 3].map((i) => {
        const from = at3(0.52 + i * 0.02);
        return { name: `four times: a soft golden dot ${i + 1} over the Ka'bah`, svg: dot(n(k[0] + (i - 1.5) * 2.6), 85.4), keys: showAt(from, at3(from + 0.008)) };
      }),
      { name: "Hajj: a soft light about the hill of Arafah", svg: glow(arafah[0], 90, 12, "#FFF3CF", 0.22), keys: showAt(0.78, 0.795), loop: soft },
      { name: "once: one soft golden dot over the hill of Arafah", svg: dot(arafah[0], 80.4), keys: showAt(0.93, 0.94) },
      { name: "a camel resting by the way", svg: restingCamel(110, 105.4, 0.8), loop: { move: "bob", ms: 2600, y: -0.2 } },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.5, ANAS) },
      {
        name: "Anas's voice: answering",
        svg: arcsLeft(n(anas[0] - 2.4), n(anas[1] - 3.2), ANAS),
        keys: voice([
          [0.43, 0.6],
          [0.86, 0.96]
        ]),
        loop: speaking
      },
      { name: "Qatadah's place", svg: someone(qatadah[0], qatadah[1], 1.5, QATADAH) },
      {
        name: "Qatadah's voice: asking",
        svg: arcsLeft(n(qatadah[0] - 2.4), n(qatadah[1] - 3.2), QATADAH),
        keys: voice([
          [0.024, 0.4],
          [0.62, 0.84]
        ]),
        loop: speaking
      }
    ],
    words: linesOn(FOUR, ["Qatadah: I asked Anas how many times", "He had performed Umrah. Anas replied:", "Four times. I asked: how many times did", "He perform Hajj? Anas replied: once."])
  };
}

// Hajj on his behalf. Ibn Abbas said: a woman from the tribe of Khath'am came. The woman said: O Allah's Messenger! The
// obligation of Hajj enjoined by Allah on His devotees has become due on my father and he is old and weak, and he cannot
// sit firm on the mount; may I perform Hajj on his behalf? The Prophet ﷺ replied: yes, you may (Sahih al-Bukhari 1513).
// The words leave out al-Fadl riding behind him and what came of it, "O Allah's Messenger" and "enjoined by Allah on His
// devotees". No one is drawn, and no one is drawn on a camel: in Makkah, the Ka'bah with the places of those on Hajj
// about it, and his place, a golden ring, by it; far off on the right, a home in the land of Khath'am, a camel by it with
// its saddle empty. Ibn Abbas's voice tells of it. Her place comes from the right to before his place, and her voice
// asks. A soft light comes about the Ka'bah: Hajj, due. A small grey place shows by the far home, and a soft blue-grey
// ring about it: old and weak. A grey dashed ring comes about the empty saddle: it cannot sit firm on it. A faint golden
// way goes from the far place to her place: on its behalf. His voice answers, a soft golden ring comes about her place,
// and a soft golden glow about the far place.
function hajjOnHisBehalf(): SignArt {
  const ibnAbbas: [number, number] = [154, 106.8];
  const his: [number, number] = [74, 106.4];
  const herFrom: [number, number] = [130, 107.4];
  const her: [number, number] = [86, 106.8];
  const farHome: [number, number] = [126, 88.6];
  const old: [number, number] = [119.4, 87.8];
  const mount: [number, number] = [139, 88.8];
  const k: [number, number] = [56, 100.6];
  const onHajj: [number, number][] = [
    [34, 103.8],
    [41, 106.4],
    [48.4, 107.4],
    [100, 104.2],
    [107, 106.8]
  ];
  return {
    kind: "hajj-on-his-behalf",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(96, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "far off on the right: a home in the land of Khath'am", svg: home(farHome[0], farHome[1], 9, 6) },
      { name: "a camel by that home, its saddle empty", svg: saddled(mount[0], mount[1], 0.11), loop: { move: "bob", ms: 2400, y: -0.15 } },
      { name: "Hajj, due: a soft light about the Ka'bah", svg: glow(k[0], 94.8, 10, "#FFF3CF", 0.2), keys: showAt(0.33, 0.345), loop: soft },
      { name: "the Ka'bah", svg: kaaba(k[0], k[1], 1.5) },
      { name: "the places of those on Hajj", svg: onHajj.map(([x, y]) => someone(x, y, 1.5, ON_HAJJ)).join("") },
      { name: "his place, a golden ring, by the Ka'bah", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "far off by that home: a small grey place, old", svg: someone(old[0], old[1], 1.2, OLD), keys: showAt(0.46, 0.475) },
      { name: "old and weak: a soft blue-grey ring about it", svg: care(old[0], n(old[1] + 0.4), 3.4, 1.7, WEAK), keys: showAt(0.5, 0.515), loop: soft },
      { name: "it cannot sit firm on it: a grey dashed ring about the empty saddle", svg: care(n(mount[0] - 0.4), n(mount[1] - 5.6), 2.6, 1.4, GREY), keys: showAt(0.6, 0.615) },
      {
        name: "on its behalf: a faint golden way from the far place to her place",
        svg: way(`M${n(old[0] - 1.2)} ${n(old[1] + 1.2)} Q104 96 ${n(her[0] + 1.6)} ${n(her[1] - 1.8)}`, SOFT_GOLD, 0.8),
        keys: showAt(0.74, 0.755)
      },
      {
        name: "her place, coming from the right to before his place",
        svg: someone(herFrom[0], herFrom[1], 1.5, KHATHAM),
        keys: track({
          opacity: [
            [0.166, 0],
            [0.172, 1]
          ],
          xy: [
            [0.172, 0, 0],
            [0.25, n(her[0] - herFrom[0]), n(her[1] - herFrom[1])]
          ]
        })
      },
      { name: "her voice, asking", svg: arcsLeft(n(her[0] - 2.4), n(her[1] - 3.2), KHATHAM), keys: voice([[0.252, 0.8]]), loop: speaking },
      { name: "his voice, soft and golden: yes", svg: arcs(n(his[0] + 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: voice([[0.81, 0.96]]), loop: speaking },
      { name: "yes: a soft golden ring about her place", svg: care(her[0], n(her[1] + 0.6), 3.8, 1.9, SOFT_GOLD), keys: showAt(0.89, 0.905), loop: soft },
      { name: "and a soft golden glow about the far place", svg: glow(old[0], old[1], 4.4, "#FFF3CF", 0.3), keys: showAt(0.93, 0.945), loop: soft },
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.5, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcsLeft(n(ibnAbbas[0] - 2.4), n(ibnAbbas[1] - 3.2), IBN_ABBAS), keys: voice([[0.024, 0.2]]), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Ibn Abbas: a woman from the tribe of",
      "Khath'am came. The woman said: the",
      "Obligation of Hajj has become due on my",
      "Father, and he is old and weak, and he",
      "Cannot sit firm on the mount; may I",
      "Perform Hajj on his behalf? He replied:",
      "Yes, you may."
    ])
  };
}

// Last at the House. Ibn Abbas said: the people were ordered to perform the Tawaf of the Ka'bah as the last thing, before
// leaving (Sahih al-Bukhari 1755). The words leave out the translator's words and the women who were excused. No one is
// drawn: in Makkah, the Ka'bah in the middle of its ground, the places of those about it, and the road out of Makkah on
// the right. Ibn Abbas's voice tells of it. The places go round the Ka'bah, once round. A soft light comes about the
// Ka'bah: the last thing there. Then the places go out, one after another, along the road out of Makkah.
function lastAtTheHouse(): SignArt {
  const ibnAbbas: [number, number] = [8, 106.8];
  const [cx, cy, rx, ry] = [80, 101, 26, 5.6];
  const at = (phi: number): [number, number] => [n(cx + rx * Math.sin(phi)), n(cy + ry * Math.cos(phi))];
  const exit: [number, number] = [110, 104.2];
  const out: [number, number] = [152, 106.6];
  const count = 8;
  const starts = Array.from({ length: count }, (_, i) => at((2 * Math.PI * i) / count));
  const order = starts
    .map(([x, y], i) => [Math.hypot(x - exit[0], y - exit[1]), i] as const)
    .sort((a, b) => a[0] - b[0])
    .map(([, i]) => i);
  const goesRound = (i: number) => {
    const [x0, y0] = starts[i];
    const round = Array.from({ length: 13 }, (_, j): [number, number, number] => {
      const [x, y] = at((2 * Math.PI * i) / count + (j * Math.PI) / 6);
      return [at3(0.36 + j * 0.02), n(x - x0), n(y - y0)];
    });
    const go = at3(0.69 + order.indexOf(i) * 0.02);
    return track({
      xy: [...round, [go, 0, 0], [at3(go + 0.03), n(exit[0] - x0), n(exit[1] - y0)], [at3(go + 0.09), n(out[0] - x0), n(out[1] - y0)]],
      opacity: [
        [at3(go + 0.09), 1],
        [at3(go + 0.1), 0]
      ]
    });
  };
  return {
    kind: "last-at-the-house",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(44, 24, 0.46, "#FFFFFF", 0.88), loop: { move: "slide", ms: 10000 } },
      { name: "the hills of Makkah", svg: hills("#A88E6A") },
      { name: "the land", svg: plainLand("#E2CB9C", [[22, 116], [60, 118], [140, 117]]) },
      { name: "homes of Makkah, far off", svg: home(14, 84, 10, 7) + home(28, 82.6, 9, 6) + home(132, 83.6, 10, 7) + home(148, 84.6, 9, 6) },
      { name: "the ground about the Ka'bah", svg: `<ellipse cx="80" cy="100.6" rx="44" ry="9.2" fill="#EADFC6"/>` },
      { name: "the road out of Makkah, on the right", svg: lane([[106, 103.4], [130, 105.6], [160, 105.2]]) },
      { name: "the last thing: a soft light about the Ka'bah", svg: glow(80, 91, 14, "#FFF3CF", 0.2), keys: showAt(0.68, 0.695), loop: soft },
      ...starts.map(([x, y], i) => ({
        name: `the place of one about the Ka'bah ${i + 1}, going round it, then out along the road`,
        svg: someone(x, y, 1.4, ABOUT_THE_HOUSE),
        keys: goesRound(i)
      })),
      { name: "the Ka'bah", svg: kaaba(80, 98.4, 2) },
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.5, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 2.4), n(ibnAbbas[1] - 3.2), IBN_ABBAS), keys: voice([[0.024, 0.28]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Ibn Abbas: the people were ordered", "To perform the Tawaf of the Ka'bah as", "The last thing, before leaving."])
  };
}

// Leaving Jam' early. Aishah said: Sawdah asked the permission of the Prophet ﷺ to leave earlier at the night of Jam', and
// she was a fat and very slow woman. The Prophet ﷺ gave her permission (Sahih al-Bukhari 1680). The words leave out "fat
// and". No one is drawn: the plain of Muzdalifah at night, under the stars and a crescent, the places of those resting
// there, his place, a golden ring, among them, and Sawdah's place by it; the road on to Mina on the right, and Aishah's
// place on the left. Aishah's voice tells of it, and Sawdah's voice asks. A faint way shows from her place along the
// road: to leave earlier. A soft light of the night comes over the plain: the night of Jam'. A soft sand ring comes about
// her place: slow. His voice answers, a soft golden ring comes about her place, and her place goes on ahead along the road.
function leavingEarlyFromJam(): SignArt {
  const aishah: [number, number] = [8, 107];
  const his: [number, number] = [84, 106.4];
  const sawdah: [number, number] = [99, 106.8];
  const ahead: [number, number] = [25, -2.8];
  const goesAhead = (opacity: [number, number][]) =>
    track({
      opacity,
      xy: [
        [0.9, 0, 0],
        [0.97, ahead[0], ahead[1]]
      ]
    });
  const resting: [number, number][] = [
    [26, 103.4],
    [34, 106.6],
    [42, 103.2],
    [50, 106.8],
    [58, 103.6],
    [66, 107],
    [74, 103.4],
    [114, 100.4],
    [126, 99.4],
    [138, 98.8],
    [150, 98.2]
  ];
  const NIGHT_STARS: [number, number][] = [
    [12, 12],
    [30, 30],
    [46, 10],
    [64, 24],
    [86, 8],
    [100, 30],
    [112, 14],
    [146, 10],
    [152, 34],
    [74, 42],
    [22, 46],
    [138, 46]
  ];
  return {
    kind: "leaving-early-from-jam",
    ms: 8000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      { name: "stars of the night", svg: stars(NIGHT_STARS), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
      { name: "the moon, a crescent", svg: crescent(128, 22, 4.6, 2.4, "#F4EBC8") },
      {
        name: "the hills about Muzdalifah, dark",
        svg: peaks(
          [
            [22, 10, 28],
            [72, 7, 22],
            [138, 11, 28]
          ],
          66,
          "#2A3450",
          false
        )
      },
      { name: "the plain of Muzdalifah at night", svg: plainLand("#3E4458", []) },
      { name: "the road on to Mina, on the right", svg: lane([[100, 105.8], [128, 103.6], [160, 101.8]], "#5A5E74") },
      { name: "the night of Jam': a soft light over the plain", svg: wash(80, 106, 64, 8, "#C8D4F0", 0.05), keys: showAt(0.38, 0.395) },
      { name: "to leave earlier: a faint way from her place along the road", svg: way("M101.4 105.8 Q114 104.4 128 103.4 L150 102.2", "#D8CCB0", 0.8), keys: showAt(0.3, 0.315) },
      { name: "the places of those resting at Jam'", svg: resting.map(([x, y]) => someone(x, y, 1.3, RESTING)).join("") },
      { name: "his place, a golden ring, among them", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice, soft and golden: he gave her leave", svg: arcs(n(his[0] + 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: voice([[0.78, 0.88]]), loop: speaking },
      {
        name: "slow: a soft sand ring about her place",
        svg: care(sawdah[0], n(sawdah[1] + 0.6), 3.6, 1.8, SLOW),
        keys: goesAhead([
          [0.56, 0],
          [0.575, 1]
        ]),
        loop: soft
      },
      {
        name: "leave given: a soft golden ring about her place",
        svg: care(sawdah[0], n(sawdah[1] + 0.6), 5, 2.4, SOFT_GOLD),
        keys: goesAhead([
          [0.86, 0],
          [0.875, 1]
        ]),
        loop: soft
      },
      { name: "Sawdah's place, by his place, then going on ahead along the road", svg: someone(sawdah[0], sawdah[1], 1.5, SAWDAH), keys: goesAhead([[0.9, 1]]) },
      { name: "Sawdah's voice, asking", svg: arcsLeft(n(sawdah[0] - 2.4), n(sawdah[1] - 3.2), SAWDAH), keys: voice([[0.13, 0.42]]), loop: speaking },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5, AISHAH_NIGHT) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 2.4), n(aishah[1] - 3.2), AISHAH_NIGHT), keys: voice([[0.024, 0.12]]), loop: speaking }
    ],
    words: linesOn(FOUR, ["Aishah: Sawdah asked his permission to", "Leave earlier at the night of Jam',", "And she was a very slow woman.", "He gave her permission."])
  };
}

// Talbina. Hisham's father said: Aishah used to recommend at-talbina and used to say: it is disliked, although it is
// beneficial (Sahih al-Bukhari 5690). The words leave out the translator's "(by the patient)". No one is drawn: in
// Madinah, a home with its door, Aishah's place by it, barley by the wall and a pot on stones; Urwah's place on the right.
// Urwah's voice tells of it. Steam rises from the pot, a bowl of talbina shows, and Aishah's voice speaks. A grey dashed
// ring comes about the bowl: disliked. A soft golden ring comes about it, and glints: beneficial.
function talbina(): SignArt {
  const urwah: [number, number] = [154, 106.8];
  const aishah: [number, number] = [44, 106.2];
  const potAt: [number, number] = [66, 105.6];
  const bowl: [number, number] = [80, 106];
  return {
    kind: "talbina",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(128, 20) },
      { name: "a cloud", svg: cloud(84, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([
        [18, 98, 9],
        [128, 96, 8]
      ]),
      { name: "Aishah's home", svg: home(50, 100.4, 22, 12) },
      { name: "barley by the wall", svg: barley(58, 100.4), loop: { move: "sway", ms: 3000, angle: 2 } },
      { name: "a pot on stones", svg: pot(potAt[0], potAt[1]) },
      { name: "talbina: steam rising from the pot", svg: steam(potAt[0], potAt[1]), keys: showAt(0.35, 0.365), loop: { move: "twinkle", ms: 1400, low: 0.3 } },
      { name: "talbina: a bowl of it", svg: talbinaBowl(bowl[0], bowl[1]), keys: showAt(0.38, 0.395) },
      { name: "disliked: a grey dashed ring about the bowl", svg: care(bowl[0], n(bowl[1] - 0.4), 4.8, 1.9, GREY), keys: showAt(0.72, 0.735) },
      { name: "yet beneficial: a soft golden ring about it", svg: care(bowl[0], n(bowl[1] - 0.4), 6.6, 2.7, SOFT_GOLD), keys: showAt(0.84, 0.855), loop: soft },
      {
        name: "glints over the bowl",
        svg: glints([
          [n(bowl[0] - 4), 100.6],
          [bowl[0], 99],
          [n(bowl[0] + 4), 100.6]
        ]),
        keys: showAt(0.87, 0.885),
        loop: twinkle()
      },
      { name: "Aishah's place, by her door", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: recommending it", svg: arcs(n(aishah[0] + 2.6), n(aishah[1] - 3.2), AISHAH), keys: voice([[0.345, 0.94]]), loop: speaking },
      { name: "Urwah's place", svg: someone(urwah[0], urwah[1], 1.5, URWAH) },
      { name: "Urwah's voice: telling of it", svg: arcsLeft(n(urwah[0] - 2.4), n(urwah[1] - 3.2), URWAH), keys: voice([[0.024, 0.28]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Hisham's father: Aishah used to", "Recommend at-talbina and used to say:", "It is disliked, although it is beneficial."])
  };
}

// Colors like the earth. Abu Musa al-Ash'ari said: the Messenger of Allah ﷺ said: indeed Allah Most High created Adam
// from a handful that He took from all of the earth. So the children of Adam come in accordance with the earth: some of
// them come red, and white and black, and between that (Jami at-Tirmidhi 2955, Sahih). The words leave out "that He took"
// and what comes after. No one is drawn, Adam is not drawn, and nothing is drawn for Allah: the earth, its lands side by
// side, a red land, a white land, a black land and one between, a home of its own earth on each, and a lane before them;
// far off, the masjid of Madinah and his place by it, a golden ring; al-Ash'ari's place on the right. Al-Ash'ari's voice tells
// of it, and his voice, soft and golden, speaks. A speck rises from each land and is gone: a handful from all of the
// earth. Then places show along the lane before each land, each the color of its land. A soft golden ring comes about
// the places of the red land, then of the white, of the black and of the one between, and glints show over all the lands.
function colorsLikeTheEarth(): SignArt {
  const abuMusa: [number, number] = [154, 104.8];
  const his: [number, number] = [130, 83.2];
  const lands = [
    { land: "the red land", of: "the red earth", says: "some come red", at: [-2, 40], home: 24, speck: 10, places: [8, 17, 27], earth: EARTH.red },
    { land: "the white land", of: "the white earth", says: "and white", at: [39, 80], home: 64, speck: 50, places: [48, 57, 67], earth: EARTH.white },
    { land: "the black land", of: "the black earth", says: "and black", at: [79, 121], home: 104, speck: 90, places: [88, 97, 107], earth: EARTH.black },
    { land: "the land between", of: "the earth between", says: "and between that", at: [120, 162], home: 144, speck: 131, places: [124, 133, 142], earth: EARTH.between }
  ] as const;
  const placeY = [104.2, 106.2, 104];
  const ringAt = [0.7, 0.83, 0.87, 0.91];
  return {
    kind: "colors-like-the-earth",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(70, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land far off", svg: plainLand("#D9CB98", [[40, 116], [100, 118], [146, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(107, 81, 0.4) },
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.1, 0.96]]), loop: speaking },
      ...lands.map((l) => ({ name: l.land, svg: landOfEarth(l.at[0], l.at[1], l.earth.land) })),
      ...lands.map((l) => ({ name: `a home of ${l.of}, on it`, svg: home(l.home, 96.6, 10, 6.4, l.earth.wall, l.earth.trim) })),
      { name: "the lane before the lands", svg: lane([[0, 103.2], [80, 104], [160, 103.4]], "#B89E72") },
      ...lands.map((l, i) => {
        const from = at3(0.345 + i * 0.02);
        return {
          name: `from all of the earth: a speck rising from ${l.land}, and gone`,
          svg: speck(l.speck, 95.6, l.earth.land),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.006), 1],
              [at3(from + 0.034), 1],
              [at3(from + 0.04), 0]
            ],
            xy: [
              [from, 0, 0],
              [at3(from + 0.04), 0, -7]
            ]
          })
        };
      }),
      ...lands.map((l, i) => {
        const from = at3(0.51 + i * 0.02);
        return {
          name: `places along the lane before ${l.land}, the color of its earth`,
          svg: l.places.map((x, j) => someone(x, placeY[j], 1.5, l.earth.place)).join(""),
          keys: showAt(from, at3(from + 0.01))
        };
      }),
      ...lands.map((l, i) => ({
        name: `${l.says}: a soft golden ring about the places before ${l.land}`,
        svg: care(l.places[1], 105.2, 14, 3, SOFT_GOLD),
        keys: showAt(ringAt[i], at3(ringAt[i] + 0.015)),
        loop: soft
      })),
      {
        name: "glints over all the lands",
        svg: glints([
          [20, 85.4],
          [59, 85],
          [99, 85.4],
          [146, 85]
        ], 1.3),
        keys: showAt(0.945, 0.96),
        loop: twinkle()
      },
      { name: "al-Ash'ari's place", svg: someone(abuMusa[0], abuMusa[1], 1.5, ABU_MUSA) },
      { name: "al-Ash'ari's voice: telling of it", svg: arcsLeft(n(abuMusa[0] - 2.4), n(abuMusa[1] - 3.2), ABU_MUSA), keys: voice([[0.024, 0.09]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Abu Musa al-Ash'ari: he said: indeed",
      "Allah Most High created Adam from a",
      "Handful from all of the earth. So the",
      "Children of Adam come in accordance with",
      "The earth: some of them come red, and",
      "White and black, and between that."
    ])
  };
}

export const MILD_ART = {
  "four-umrahs-one-hajj": fourUmrahsOneHajj,
  "hajj-on-his-behalf": hajjOnHisBehalf,
  "last-at-the-house": lastAtTheHouse,
  "leaving-early-from-jam": leavingEarlyFromJam,
  talbina,
  "colors-like-the-earth": colorsLikeTheEarth
};
