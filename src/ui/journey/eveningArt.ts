import { cloud, glow, n, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sparkle } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun } from "./worshipArt";
import { care, palms, tent, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { restingCamel, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, glints, linesOn, plainLand, SIX, sparkStays, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { coins, jar } from "./tradeArt";

/**
 * Evening ways: Ghifar, granted pardon, and Aslam, granted safety; the whole Kingdom entering upon evening, and upon
 * morning; what the one in ihram does not wear; a vow, that neither hastens nor delays anything; a bath once in seven
 * days; and a thousand good deeds for a hundred tasbihat. Only the land, the sky, buildings, things, plants and animals
 * are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face:
 * where someone was, a ring or a small dashed circle shows it, and a voice is arcs in the air. Nothing is drawn for
 * Allah, no book, page or letter is drawn, and nothing comes down from the sky: what is good is a light, glints, a soft
 * golden ring and sparks that rise. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
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

/** Abu Dharr's place and voice: a dusk violet. */
const ABU_DHARR = "#6A5E8E";
/** The tents of Ghifar: a sand white. */
const GHIFAR_TENTS = "#E8D8B6";
/** The tents of Aslam: a pale clay. */
const ASLAM_TENTS = "#E2C9A4";
/** Abdullah's place and voice: a slate blue. */
const ABDULLAH = "#5E7A9A";
/** Ibn Umar's place and voice: a green grey. */
const IBN_UMAR = "#4E6E5E";
/** The place and voice of the one who asked what the Muhrim wears: a brown. */
const ASKER = "#8E6A4A";
/** Sa'id's place and voice: an olive brown. */
const SAID = "#7A6A3E";
/** The miser's place and voice: a dull grey brown. */
const MISER = "#7A6E62";
/** Abu Hurairah's place and voice: a rose brown. */
const ABU_HURAIRAH = "#8A5E6E";
/** The places of the Muslims by their homes: a warm brown. */
const MUSLIMS = "#9A7A56";
/** Sa'd's place and voice: a teal. */
const SAD = "#3E7A7A";
/** The places of those sitting with him: a sand brown. */
const SITTING = "#A88A66";
/** The place and voice of the one who asked how: a plum. */
const QUESTIONER = "#8A5A7E";
/** What is grey: the evil deeds. */
const GREY = "#8C8C96";

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

/** A line for drying clothes between two posts, at x 44 and x 136, its rope sagging a little in the middle. */
const clothesLine = () =>
  `<path d="M44 99 L44 73.6 M136 99 L136 73.6" stroke="#7E5E3E" stroke-width="1" stroke-linecap="round"/>` +
  `<path d="M44 75 Q90 81 136 75" stroke="#B8A27E" stroke-width="0.4" fill="none"/>`;

/** Where the drying line's rope is at x. */
const ropeAt = (x: number) => {
  const t = (x - 44) / 92;
  return n(75 + 12 * t * (1 - t));
};

/** A long shirt with sleeves, hung by its shoulders, its collar's middle at (x, y). */
const shirt = (x: number, y: number) =>
  `<path d="M${n(x - 2)} ${y} L${n(x - 5.4)} ${n(y + 0.8)} L${n(x - 7.2)} ${n(y + 5.4)} L${n(x - 5)} ${n(y + 6)} L${n(x - 4)} ${n(y + 3.4)} L${n(x - 4.2)} ${n(y + 13)} ` +
  `L${n(x + 4.2)} ${n(y + 13)} L${n(x + 4)} ${n(y + 3.4)} L${n(x + 5)} ${n(y + 6)} L${n(x + 7.2)} ${n(y + 5.4)} L${n(x + 5.4)} ${n(y + 0.8)} L${n(x + 2)} ${y} ` +
  `Q${x} ${n(y + 1.8)} ${n(x - 2)} ${y} Z" fill="#F2EDE2" stroke="#CFC6B2" stroke-width="0.35"/>`;

/** A turban, wound, hung on the rope with its top at (x, y), its loose end hanging. */
const turban = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y + 3.4)}" rx="4.6" ry="3" fill="#EEE5CF" stroke="#CDBF9E" stroke-width="0.35"/>` +
  `<ellipse cx="${x}" cy="${n(y + 2.2)}" rx="2.4" ry="0.9" fill="#BDB196"/>` +
  `<path d="M${n(x - 4.2)} ${n(y + 3.6)} Q${x} ${n(y + 6.4)} ${n(x + 4.2)} ${n(y + 3.6)} M${n(x - 3.6)} ${n(y + 5)} Q${x} ${n(y + 7.6)} ${n(x + 3.6)} ${n(y + 5)}" stroke="#CDBF9E" stroke-width="0.4" fill="none"/>` +
  `<path d="M${n(x + 3.2)} ${n(y + 5.4)} Q${n(x + 4.4)} ${n(y + 8.6)} ${n(x + 3.4)} ${n(y + 11.4)}" stroke="#EEE5CF" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;

/** Trousers hung by their waist, its middle at (x, y). */
const trousers = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${y} L${n(x + 4.4)} ${y} L${n(x + 5.4)} ${n(y + 12.4)} L${n(x + 1.4)} ${n(y + 12.4)} L${x} ${n(y + 4.6)} L${n(x - 1.4)} ${n(y + 12.4)} L${n(x - 5.4)} ${n(y + 12.4)} Z" fill="#E6DECB" stroke="#C4B898" stroke-width="0.35"/>` +
  `<path d="M${n(x - 4.4)} ${n(y + 1.1)} L${n(x + 4.4)} ${n(y + 1.1)}" stroke="#C4B898" stroke-width="0.5"/>`;

/** A cloak with a hood, hung by the top of its hood at (x, y). */
const headcloak = (x: number, y: number) =>
  `<path d="M${x} ${y} Q${n(x + 3)} ${n(y + 0.8)} ${n(x + 3.2)} ${n(y + 4)} L${n(x + 6.6)} ${n(y + 15)} L${n(x - 6.6)} ${n(y + 15)} L${n(x - 3.2)} ${n(y + 4)} Q${n(x - 3)} ${n(y + 0.8)} ${x} ${y} Z" fill="#B49A74" stroke="#94795A" stroke-width="0.35"/>` +
  `<path d="M${n(x - 2.2)} ${n(y + 3.4)} Q${x} ${n(y + 5.2)} ${n(x + 2.2)} ${n(y + 3.4)}" stroke="#94795A" stroke-width="0.4" fill="none"/>` +
  `<path d="M${x} ${n(y + 5)} L${x} ${n(y + 15)}" stroke="#94795A" stroke-width="0.3"/>`;

/** A cloth hung over the rope, its top's middle at (x, y), dyed `fill`, with two folds. */
const dyed = (x: number, y: number, fill: string, fold: string) =>
  `<path d="M${n(x - 4)} ${y} L${n(x + 4)} ${y} L${n(x + 4.4)} ${n(y + 11)} Q${x} ${n(y + 12.2)} ${n(x - 4.4)} ${n(y + 11)} Z" fill="${fill}"/>` +
  `<path d="M${n(x - 1.2)} ${n(y + 0.6)} L${n(x - 1.6)} ${n(y + 11.4)} M${n(x + 1.8)} ${n(y + 0.6)} L${n(x + 2)} ${n(y + 11.2)}" stroke="${fold}" stroke-width="0.4"/>`;

/** Faint curls of scent rising over a cloth whose top's middle is at (x, y). */
const scent = (x: number, y: number) =>
  [-2, 0.6, 3]
    .map((dx, i) => {
      const sx = n(x + dx);
      return `<path d="M${sx} ${n(y - 1)} Q${n(sx + 1.2)} ${n(y - 2.4)} ${sx} ${n(y - 3.4)} Q${n(sx - 1.2)} ${n(y - 4.4)} ${sx} ${n(y - 5.6 - (i % 2))}" stroke="#E9C25E" stroke-width="0.45" fill="none" opacity="0.9" stroke-linecap="round"/>`;
    })
    .join("");

/** A pair of leather socks standing, the back of the first one's sole at (x, y): their low part, with its seam. */
const socksLow = (x: number, y: number) =>
  [0, 5.4]
    .map(
      (dx) =>
        `<path d="M${n(x + dx)} ${y} L${n(x + dx)} ${n(y - 2.6)} L${n(x + dx + 2.6)} ${n(y - 2.6)} Q${n(x + dx + 5.4)} ${n(y - 2)} ${n(x + dx + 5)} ${y} Z" fill="#7A5232"/>` +
        `<path d="M${n(x + dx)} ${n(y - 2.6)} L${n(x + dx + 2.6)} ${n(y - 2.6)}" stroke="#5A3A22" stroke-width="0.35"/>`
    )
    .join("");

/** The tops of the pair of leather socks whose first sole's back is at (x, y): what is cut off. */
const socksTop = (x: number, y: number) => [0, 5.4].map((dx) => `<rect x="${n(x + dx)}" y="${n(y - 8.4)}" width="2.6" height="5.8" fill="#86603C"/>`).join("");

/** A box of wealth, its foot's middle at (x, y): its body, banded. */
const wealthBox = (x: number, y: number) =>
  `<rect x="${n(x - 5)}" y="${n(y - 5)}" width="10" height="5" rx="0.5" fill="#8C5A2E"/>` +
  `<path d="M${n(x - 5)} ${n(y - 2.5)} L${n(x + 5)} ${n(y - 2.5)} M${n(x - 3)} ${n(y - 5)} L${n(x - 3)} ${y} M${n(x + 3)} ${n(y - 5)} L${n(x + 3)} ${y}" stroke="#C99A3C" stroke-width="0.55"/>`;

/** The box's lid, shut, over the box whose foot's middle is at (x, y). */
const lidShut = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 5)} L${n(x - 5)} ${n(y - 6.2)} Q${x} ${n(y - 8.6)} ${n(x + 5)} ${n(y - 6.2)} L${n(x + 5)} ${n(y - 5)} Z" fill="#9E6A36" stroke="#C99A3C" stroke-width="0.5"/>`;

/** The box's lid, open, standing up at its back, and the gold within. */
const lidOpen = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 5)} L${n(x - 5.6)} ${n(y - 10.6)} Q${x} ${n(y - 12)} ${n(x + 5.6)} ${n(y - 10.6)} L${n(x + 5)} ${n(y - 5)} Z" fill="#7E5230" stroke="#C99A3C" stroke-width="0.5"/>` +
  `<ellipse cx="${x}" cy="${n(y - 5)}" rx="4.6" ry="0.9" fill="#E2B33C"/>`;

/** A basin of water, its foot's middle at (x, y). */
const basin = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y - 2.4)} L${n(x + 4)} ${n(y - 2.4)} L${n(x + 3)} ${y} L${n(x - 3)} ${y} Z" fill="#9A7A5A"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.4)}" rx="4" ry="0.8" fill="#6FB8E0"/>`;

/** Steam rising over a basin whose foot's middle is at (x, y). */
const steam = (x: number, y: number) =>
  [-1.6, 0, 1.6]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 8.6 - (i % 2) * 1.2);
      return `<path d="M${sx} ${n(y - 3.4)} Q${n(sx + 1)} ${n(y - 5)} ${sx} ${n(y - 6)} Q${n(sx - 1)} ${n(y - 7)} ${sx} ${top}" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.85" stroke-linecap="round"/>`;
    })
    .join("");

/** Twenty-five small soft lights in a row across the sky, at y. */
const lightsRow = (y: number) =>
  Array.from({ length: 25 }, (_, i) => `<circle cx="${n(40 + i * 3.8)}" cy="${y}" r="0.65" fill="#FBD86E" stroke="#D7A63A" stroke-width="0.2"/>`).join("");

/** Small grey specks at each of `list`: wrongs. */
const specks = (list: [number, number][]) => list.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.9" fill="${GREY}"/>`).join("");

// Ghifar and Aslam. Abu Dharr said: the Messenger of Allah ﷺ said: Ghifar, to whom Allah granted pardon, and Aslam,
// to whom Allah granted safety (Sahih Muslim 2514a). The words leave out the translator's words. No one is drawn: the
// tents of Ghifar on the left and the tents of Aslam on the right, a camel resting by each, and far off, the masjid of
// Madinah and his place by it, a golden ring; Abu Dharr's place before them. Abu Dharr's voice tells of it, and his
// voice, soft and golden, speaks. A soft golden glow comes over the tents of Ghifar, and glints: pardon. A soft golden
// ring comes about the tents of Aslam: safety.
function ghifarAndAslam(): SignArt {
  const abuDharr: [number, number] = [80, 106];
  const his: [number, number] = [90, 83.4];
  return {
    kind: "ghifar-and-aslam",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(134, 20) },
      { name: "a cloud", svg: cloud(60, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[50, 116], [98, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(66, 80, 0.4) },
      ...palms(
        [
          [60, 81, 9],
          [100, 81.6, 10]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.14, 0.96]]), loop: speaking },
      { name: "pardon: a soft golden glow over the tents of Ghifar", svg: glow(24, 95, 17, "#FFF3CF", 0.2), keys: showAt(0.4, 0.415), loop: soft },
      { name: "the tents of Ghifar, on the left", svg: tent(22, 92, 11, 7, GHIFAR_TENTS) + tent(12, 100, 14, 9.4, GHIFAR_TENTS) + tent(34, 101, 15, 10, GHIFAR_TENTS) },
      { name: "a camel resting by the tents of Ghifar", svg: restingCamel(48, 104.6, 0.66), loop: { move: "bob", ms: 2600, y: -0.2 } },
      {
        name: "and glints over the tents of Ghifar",
        svg: glints([
          [12, 86],
          [23, 81.6],
          [34, 86.6]
        ], 1.2),
        keys: showAt(0.43, 0.445),
        loop: twinkle()
      },
      { name: "the tents of Aslam, on the right", svg: tent(138, 92, 11, 7, ASLAM_TENTS) + tent(128, 101, 15, 10, ASLAM_TENTS) + tent(148, 100, 14, 9.4, ASLAM_TENTS) },
      { name: "a camel resting by the tents of Aslam", svg: restingCamel(108, 105, 0.66), loop: { move: "bob", ms: 2900, y: -0.2, phase: 0.4 } },
      { name: "safety: a soft golden ring about the tents of Aslam", svg: care(138, 98.4, 17, 7.4, SOFT_GOLD), keys: showAt(0.74, 0.755), loop: soft },
      { name: "Abu Dharr's place", svg: someone(abuDharr[0], abuDharr[1], 1.5, ABU_DHARR) },
      { name: "Abu Dharr's voice: telling of it", svg: arcs(n(abuDharr[0] + 2.4), n(abuDharr[1] - 3.2), ABU_DHARR), keys: voice([[0.024, 0.13]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Abu Dharr: he said: Ghifar, to whom Allah", "Granted pardon, and Aslam, to whom Allah", "Granted safety."])
  };
}

// The Kingdom at evening. Abdullah said: when it was evening, the Messenger of Allah ﷺ used to supplicate: we have
// entered upon evening, and so, too, the whole Kingdom of Allah has entered upon evening. Praise is due to Allah. ... And
// when it was morning he said like this: we entered upon morning, and the whole Kingdom of Allah entered upon morning
// (Sahih Muslim 2723b). The words leave out what comes between, and nothing is drawn for it. No one is drawn: Madinah,
// its masjid, its homes and palms, his place before the masjid, a golden ring, and Abdullah's place on the right.
// Abdullah's voice tells of it, as the sun goes down behind the hills and the sky turns to evening. His voice, soft and
// golden, speaks, and a dusk comes over all of it: the whole Kingdom has entered upon evening. A spark rises from his
// place: praise is due to Allah. Then the night comes, with the stars and the moon, and Abdullah's voice tells of the
// morning: the night goes, the dawn comes, his voice speaks again, the sun rises, and a soft morning light comes over
// all of it.
function kingdomAtEvening(): SignArt {
  const his: [number, number] = [72.4, 92];
  const abdullah: [number, number] = [124, 104];
  return {
    kind: "kingdom-at-evening",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the dawn sky", svg: `<rect width="160" height="62" fill="#F4C8A4"/><rect y="40" width="160" height="22" fill="#F8DCC0"/>`, keys: showFor(0.565, 0.575, 0.76, 0.8) },
      {
        name: "the evening sky",
        svg: `<rect width="160" height="62" fill="#F2B98C" opacity="0.8"/><rect y="44" width="160" height="18" fill="#F6CFA0" opacity="0.6"/>`,
        keys: showFor(0.03, 0.08, 0.565, 0.575)
      },
      { name: "the night sky", svg: `<rect width="160" height="62" fill="#1B2A50"/><rect width="160" height="30" fill="#14203F"/>`, keys: showFor(0.53, 0.56, 0.64, 0.68) },
      {
        name: "stars",
        svg: stars([
          [14, 14],
          [34, 26],
          [52, 12],
          [70, 30],
          [92, 16],
          [108, 34],
          [132, 12],
          [142, 26],
          [152, 40],
          [22, 40]
        ]),
        keys: showFor(0.54, 0.56, 0.645, 0.67),
        loop: twinkle(1600)
      },
      { name: "the moon", svg: crescent(116, 22, 4, 2.2, "#FFF3C4"), keys: showFor(0.545, 0.565, 0.645, 0.67) },
      {
        name: "the sun of the evening, going down behind the hills",
        svg: sun(126, 44),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, 6, 32]
          ]
        })
      },
      {
        name: "the sun of the morning, rising from behind the hills",
        svg: sun(30, 78),
        keys: track({
          xy: [
            [0.76, 0, 0],
            [0.83, 4, -36]
          ]
        })
      },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [100, 118], [150, 117]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(58, 86, 0.6) },
      { name: "homes of Madinah", svg: home(24, 92, 12, 8) + home(110, 90, 11, 7) + home(134, 93, 12, 8) },
      ...palms(
        [
          [44, 88, 12],
          [96, 87, 13],
          [152, 92, 12]
        ],
        "Madinah"
      ),
      { name: "the whole Kingdom at evening: a dusk over all of it", svg: `<rect width="160" height="62" fill="#9A6A9A" opacity="0.35"/><rect y="61" width="160" height="59" fill="#4A3E6E" opacity="0.22"/>`, keys: showFor(0.3, 0.34, 0.64, 0.68) },
      { name: "the night over all the land", svg: `<rect y="61" width="160" height="59" fill="#0F1C3A" opacity="0.5"/>`, keys: showFor(0.53, 0.56, 0.64, 0.68) },
      { name: "the whole Kingdom at morning: a soft morning light over all of it", svg: `<rect width="160" height="120" fill="#FFE9B8" opacity="0.2"/>`, keys: showAt(0.8, 0.83) },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 1.8, GOLD) },
      {
        name: "his voice, soft and golden",
        svg: arcs(n(his[0] + 2.6), n(his[1] - 2.4), SOFT_GOLD),
        keys: voice([
          [0.16, 0.54],
          [0.66, 0.96]
        ]),
        loop: speaking
      },
      spark("his praise: a spark rising from his place", his[0], n(his[1] - 4), 0.51, 0.55),
      { name: "Abdullah's place", svg: someone(abdullah[0], abdullah[1], 1.5, ABDULLAH) },
      {
        name: "Abdullah's voice: telling of it",
        svg: arcsLeft(n(abdullah[0] - 2.4), n(abdullah[1] - 3.2), ABDULLAH),
        keys: voice([
          [0.024, 0.15],
          [0.55, 0.65]
        ]),
        loop: speaking
      }
    ],
    words: linesOn(EIGHT, [
      "Abdullah: when it was evening, he used",
      "To supplicate: we have entered upon",
      "Evening, and so, too, the whole Kingdom",
      "Of Allah has entered upon evening.",
      "Praise is due to Allah. And when it was",
      "Morning he said like this: we entered",
      "Upon morning and the whole Kingdom of",
      "Allah entered upon morning."
    ])
  };
}

// What the Muhrim wears. Abdullah ibn Umar said: a man asked: O Messenger of Allah, what kind of clothes should a
// Muhrim wear? The Messenger of Allah ﷺ replied: he should not wear a shirt, a turban, trousers, a headcloak or leather
// socks, except if he can find no slippers; then he may wear leather socks after cutting off what might cover the
// ankles. And he should not wear clothes which are scented with saffron or wars (Sahih al-Bukhari 1542). The words leave
// out "O Allah's Messenger" and the translator's words. No one is drawn, and nothing is worn: in Madinah, a line for
// drying clothes, with a shirt, a turban, trousers, a cloak with a hood, and two cloths dyed with saffron and with wars
// hung on it; a pair of leather socks standing on the ground below, and an empty place by them; the masjid far off and
// his place by it, a golden ring; the place of the one who asked on the right, and Ibn Umar's place on the left. Ibn
// Umar's voice tells of it, the voice of the one who asked asks, and his voice, soft and golden, answers. A grey dashed
// ring comes about the shirt, the turban, the trousers, the cloak and the leather socks, one by one: they are not worn.
// A grey dashed ring comes about the empty place: no slippers are found. Then the grey ring about the leather socks goes,
// and a soft golden ring comes about them: they may be worn; their tops go: cut off. Scent rises from the dyed cloths,
// and a grey dashed ring comes about them.
function whatTheMuhrimWears(): SignArt {
  const ibnUmar: [number, number] = [12, 106];
  const asker: [number, number] = [148, 104];
  const his: [number, number] = [30, 84];
  const socks: [number, number] = [56, 104.6];
  const hung = (x: number) => ropeAt(x);
  const sway = (ms: number, phase: number) => ({ move: "sway", ms, angle: 1.6, phase }) as const;
  return {
    kind: "what-the-muhrim-wears",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "a cloud", svg: cloud(90, 22, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills about Madinah", svg: hills("#C2AA82") },
      { name: "the land", svg: plainLand("#E4CFA2", [[20, 116], [96, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(6, 80, 0.4) },
      ...palms(
        [
          [148, 84, 11],
          [158, 86, 10]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden: what is not worn", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.232, 0.96]]), loop: speaking },
      { name: "a line for drying clothes", svg: clothesLine() },
      { name: "a shirt on the line", svg: shirt(52, hung(52)), origin: { x: 52, y: hung(52) }, loop: sway(3200, 0) },
      { name: "a turban on the line", svg: turban(67, hung(67)), origin: { x: 67, y: hung(67) }, loop: sway(3500, 0.2) },
      { name: "trousers on the line", svg: trousers(82, hung(82)), origin: { x: 82, y: hung(82) }, loop: sway(3800, 0.4) },
      { name: "a cloak with a hood on the line", svg: headcloak(98, hung(98)), origin: { x: 98, y: hung(98) }, loop: sway(3300, 0.6) },
      { name: "a cloth dyed with saffron, on the line", svg: dyed(114, hung(114), "#E8A03A", "#C98420"), origin: { x: 114, y: hung(114) }, loop: sway(3600, 0.8) },
      { name: "a cloth dyed with wars, on the line", svg: dyed(126, hung(126), "#E3C450", "#C4A436"), origin: { x: 126, y: hung(126) }, loop: sway(3400, 0.1) },
      { name: "scent rising from the dyed cloths", svg: scent(114, hung(114)) + scent(126, hung(126)), keys: showAt(0.8, 0.815), loop: twinkle(1400) },
      { name: "not a shirt: a grey dashed ring about it", svg: greyRing(52, 82.4, 8.2, 8), keys: showAt(0.28, 0.29) },
      { name: "nor a turban: a grey dashed ring about it", svg: greyRing(67, 83.4, 6.4, 7.2), keys: showAt(0.345, 0.355) },
      { name: "nor trousers: a grey dashed ring about them", svg: greyRing(82, 84.1, 6.8, 7.6), keys: showAt(0.37, 0.38) },
      { name: "nor a cloak with a hood: a grey dashed ring about it", svg: greyRing(98, 85.4, 7.6, 8.6), keys: showAt(0.395, 0.405) },
      { name: "nor what is scented with saffron or wars: a grey dashed ring about the dyed cloths", svg: greyRing(120, 83, 12.6, 8.6), keys: showAt(0.9, 0.915) },
      { name: "the tops of the leather socks, then cut off and gone", svg: socksTop(socks[0], socks[1]), keys: track({ opacity: [[0.68, 1], [0.72, 0]] }) },
      { name: "a pair of leather socks, standing on the ground", svg: socksLow(socks[0], socks[1]) },
      { name: "nor leather socks: a grey dashed ring about them", svg: greyRing(61.6, 102.4, 7, 4.6), keys: showFor(0.45, 0.46, 0.56, 0.57) },
      { name: "if no slippers are found: a grey dashed ring about an empty place", svg: greyRing(80, 104.4, 5, 2.2), keys: showAt(0.5, 0.51) },
      { name: "then leather socks may be worn: a soft golden ring about them", svg: care(61.6, 102.4, 7, 4.6, SOFT_GOLD), keys: showAt(0.575, 0.59), loop: soft },
      { name: "the place of the one who asked", svg: someone(asker[0], asker[1], 1.5, ASKER) },
      { name: "the voice of the one who asked", svg: arcsLeft(n(asker[0] - 2.4), n(asker[1] - 3.2), ASKER), keys: voice([[0.07, 0.185]]), loop: speaking },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(n(ibnUmar[0] + 2.4), n(ibnUmar[1] - 3.2), IBN_UMAR), keys: voice([[0.016, 0.06]]), loop: speaking }
    ],
    words: linesOn(NINE, [
      "Abdullah ibn Umar: a man asked: what kind",
      "Of clothes should a Muhrim wear? He",
      "Replied: he should not wear a shirt, a",
      "Turban, trousers, a headcloak or leather",
      "Socks, except if he can find no slippers,",
      "He then may wear leather socks after",
      "Cutting off what might cover the ankles.",
      "And he should not wear clothes which are",
      "Scented with saffron or Wars."
    ])
  };
}

// A vow changes nothing. Sa'id ibn al-Harith heard Ibn Umar saying: weren't people forbidden to make vows? The Prophet
// ﷺ said: a vow neither hastens nor delays anything, but by the making of vows, some of the wealth of a miser is taken
// out (Sahih al-Bukhari 6692). No one is drawn: in Madinah, the masjid far off and his place by it, a golden ring; the
// places of Sa'id and Ibn Umar; on the right, the miser's home, his box of wealth by it, shut, and the miser's place.
// Sa'id's voice tells of it, Ibn Umar's voice asks, and his voice, soft and golden, speaks. The miser's voice makes a
// vow, and a grey dashed ring comes about it: it neither hastens nor delays anything. Then the box's lid opens, and a
// few coins go out of it, one by one, onto the ground before the home: taken out.
function aVowChangesNothing(): SignArt {
  const said: [number, number] = [54, 106];
  const ibnUmar: [number, number] = [66, 104];
  const miser: [number, number] = [140, 104];
  const his: [number, number] = [36, 84.4];
  const box: [number, number] = [108, 101];
  return {
    kind: "a-vow-changes-nothing",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(58, 24, 0.4, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[24, 116], [92, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(12, 80, 0.4) },
      ...palms(
        [
          [48, 83, 10],
          [92, 84, 11]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.36, 0.96]]), loop: speaking },
      { name: "the miser's home", svg: home(126, 94, 16, 10) },
      { name: "the box's lid, open, and the wealth in it", svg: lidOpen(box[0], box[1]), keys: showAt(0.68, 0.69) },
      { name: "the miser's box of wealth, by the home", svg: wealthBox(box[0], box[1]) },
      { name: "the box's lid, shut", svg: lidShut(box[0], box[1]), keys: track({ opacity: [[0.68, 1], [0.69, 0]] }) },
      ...[0, 1, 2].map((i) => {
        const from = at3(0.83 + i * 0.03);
        return {
          name: `some of the wealth taken out: a coin ${i + 1}, going out of the box`,
          svg: coins(box[0], n(box[1] - 3.6), 1),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.006), 1]
            ],
            xy: [
              [from, 0, 0],
              [at3(from + 0.015), -3, -4],
              [at3(from + 0.04), -12 - i * 5, [5.4, 6.2, 5][i]]
            ]
          })
        };
      }),
      { name: "the miser's place", svg: someone(miser[0], miser[1], 1.5, MISER) },
      { name: "the miser's voice: a vow", svg: arcsLeft(n(miser[0] - 2.4), n(miser[1] - 3.2), MISER), keys: voice([[0.4, 0.66]]), loop: speaking },
      { name: "it neither hastens nor delays anything: a grey dashed ring about the vow", svg: greyRing(n(miser[0] - 6.6), n(miser[1] - 3.2), 4.6, 3.6), keys: showFor(0.43, 0.445, 0.66, 0.67) },
      { name: "Sa'id's place", svg: someone(said[0], said[1], 1.5, SAID) },
      { name: "Sa'id's voice: telling of it", svg: arcsLeft(n(said[0] - 2.4), n(said[1] - 3.2), SAID), keys: voice([[0.024, 0.09]]), loop: speaking },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: asking", svg: arcs(n(ibnUmar[0] + 2.4), n(ibnUmar[1] - 3.2), IBN_UMAR), keys: voice([[0.1, 0.35]]), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Sa'id ibn al-Harith heard Ibn Umar",
      "Saying: weren't people forbidden to make",
      "Vows? He said: a vow neither hastens nor",
      "Delays anything, but by the making of",
      "Vows, some of the wealth of a miser is",
      "Taken out."
    ])
  };
}

// A bath every seven days. Abu Hurairah said: the Prophet ﷺ said: it is Allah's right on every Muslim that he should
// take a bath at least once in seven days (Sahih al-Bukhari 898). The words leave out the translator's "(at least)".
// No one is drawn, and nothing is drawn for Allah: in Madinah, homes with a jar and a basin of water by each, and far
// off, the masjid and his place by it, a golden ring; Abu Hurairah's place before them. Abu Hurairah's voice tells of
// it, and his voice, soft and golden, speaks. A place shows by each home, one by one: every Muslim. Seven soft golden
// dots show in the sky, one by one: seven days. Steam rises over each basin, and glints: the bath.
function aBathEverySevenDays(): SignArt {
  const abuHurairah: [number, number] = [80, 106];
  const his: [number, number] = [90, 82.6];
  const homes: [number, number][] = [
    [16, 96],
    [50, 97],
    [110, 97],
    [144, 96]
  ];
  return {
    kind: "a-bath-every-seven-days",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(130, 20) },
      { name: "a cloud", svg: cloud(30, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[30, 116], [96, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(66, 79, 0.4) },
      ...palms(
        [
          [58, 80, 9],
          [102, 80.6, 10]
        ],
        "Madinah"
      ),
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.6, GOLD) },
      { name: "his voice, soft and golden, far off", svg: arcs(n(his[0] + 2.4), n(his[1] - 2.2), SOFT_GOLD), keys: voice([[0.13, 0.96]]), loop: speaking },
      { name: "homes of Madinah", svg: homes.map(([x, y]) => home(x, y, 14, 9)).join("") },
      { name: "a jar and a basin of water by each home", svg: homes.map(([x, y]) => jar(n(x + 5.4), n(y + 6.4), 0.55) + basin(x, n(y + 6.4))).join("") },
      ...homes.map(([x, y], i) => {
        const from = at3(0.38 + i * 0.03);
        return { name: `every Muslim: a place by home ${i + 1}`, svg: someone(n(x - 6.6), n(y + 7.6), 1.5, MUSLIMS), keys: showAt(from, at3(from + 0.01)) };
      }),
      ...[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const from = at3(0.69 + i * 0.02);
        return { name: `seven days: a soft golden dot ${i + 1} in the sky`, svg: dot(56 + i * 6, 52), keys: showAt(from, at3(from + 0.008)) };
      }),
      { name: "the bath: steam rising over each basin", svg: homes.map(([x, y]) => steam(x, n(y + 6.4))).join(""), keys: showAt(0.85, 0.865), loop: { move: "bob", ms: 2400, y: -0.6 } },
      { name: "and glints of clean water over each basin", svg: glints(homes.map(([x, y]): [number, number] => [n(x + 2.6), n(y + 1.6)]), 1.1), keys: showAt(0.89, 0.905), loop: twinkle() },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.5, ABU_HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 2.4), n(abuHurairah[1] - 3.2), ABU_HURAIRAH), keys: voice([[0.024, 0.12]]), loop: speaking }
    ],
    words: linesOn(THREE, ["Abu Hurairah: he said: it is Allah's", "Right on every Muslim that he should", "Take a bath once in seven days."])
  };
}

// A thousand good deeds. Sa'd said: the Messenger of Allah ﷺ said to those sitting with him: is one of you incapable
// of attaining a thousand good deeds? So a questioner among those seated with him asked him: how can one of us earn a
// thousand good deeds? He said: when one of you recites a hundred tasbihat, a thousand good deeds are written for him,
// and a thousand evil deeds are wiped away from him (Jami at-Tirmidhi 3463, Sahih). The words leave out the
// translator's "(When)". No one is drawn: in Madinah, his place, a golden ring, with the places of those sitting with
// him before it, the masjid far off and palms; Sa'd's place on the right. Sa'd's voice tells of it, and his voice, soft
// and golden, asks. A soft ring comes about the place of one of them, and its voice asks how. His voice answers: a
// hundred small soft lights show in the sky, twenty-five at a time: a hundred tasbihat. Golden sparks rise from those
// sitting there and stay, high: a thousand good deeds. Grey specks show over them, and are wiped away.
function aThousandGoodDeeds(): SignArt {
  const sad: [number, number] = [146, 104];
  const his: [number, number] = [80, 90];
  const sitting: [number, number][] = [
    [58, 97],
    [64, 101.6],
    [72, 104.6],
    [88, 104.6],
    [102, 97]
  ];
  const questioner: [number, number] = [96, 101.6];
  const sparks = [56, 61, 66, 71, 76, 84, 89, 94, 99, 104];
  return {
    kind: "a-thousand-good-deeds",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(16, 18) },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[24, 116], [100, 118], [150, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(8, 80, 0.45) },
      ...palms(
        [
          [38, 82, 10],
          [128, 82, 11],
          [150, 84, 10]
        ],
        "Madinah"
      ),
      ...[26, 30, 34, 38].map((y, i) => {
        const from = at3(0.668 + i * 0.016);
        return { name: `a hundred tasbihat: twenty-five small lights in the sky, row ${i + 1}`, svg: lightsRow(y), keys: showAt(from, at3(from + 0.008)), loop: soft };
      }),
      ...sparks.map((x, i) => {
        const from = at3(0.776 + i * 0.002);
        return {
          name: `a thousand good deeds: a golden spark ${i + 1}, rising and kept`,
          svg: sparkle(x, n(95 + (i % 3) * 1.6), 1.5, "#FFE7A0"),
          keys: sparkStays(from, at3(from + 0.05), 44),
          loop: twinkle(900)
        };
      }),
      {
        name: "and a thousand evil deeds: grey specks over them, then wiped away",
        svg: specks([
          [58, 80],
          [64, 76],
          [70, 82],
          [74, 75],
          [80, 79],
          [86, 74.6],
          [90, 81.6],
          [96, 76],
          [102, 80.4],
          [67, 86],
          [93, 86.4],
          [80, 84.4]
        ]),
        keys: track({
          opacity: [
            [0.83, 0],
            [0.84, 1],
            [0.9, 1],
            [0.94, 0]
          ],
          xy: [
            [0.9, 0, 0],
            [0.94, 8, 0]
          ]
        })
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 1.8, GOLD) },
      {
        name: "his voice, soft and golden",
        svg: arcs(n(his[0] + 2.6), n(his[1] - 2.4), SOFT_GOLD),
        keys: voice([
          [0.06, 0.24],
          [0.58, 0.96]
        ]),
        loop: speaking
      },
      { name: "the places of those sitting with him", svg: sitting.map(([x, y]) => someone(x, y, 1.5, SITTING)).join("") },
      { name: "the place of the one who asked how", svg: someone(questioner[0], questioner[1], 1.5, QUESTIONER) },
      { name: "the one who asked: a soft ring about its place", svg: care(questioner[0], n(questioner[1] + 0.2), 3.6, 1.9, QUESTIONER), keys: showAt(0.27, 0.285), loop: soft },
      { name: "the voice of the one who asked how", svg: arcsLeft(n(questioner[0] - 2.4), n(questioner[1] - 3.2), QUESTIONER), keys: voice([[0.4, 0.56]]), loop: speaking },
      { name: "Sa'd's place", svg: someone(sad[0], sad[1], 1.5, SAD) },
      { name: "Sa'd's voice: telling of it", svg: arcsLeft(n(sad[0] - 2.4), n(sad[1] - 3.2), SAD), keys: voice([[0.014, 0.05]]), loop: speaking }
    ],
    words: linesOn(NINE, [
      "Sa'd: he said to those sitting with him:",
      "Is one of you incapable of attaining a",
      "Thousand good deeds? So a questioner",
      "Among those seated with him asked him:",
      "How can one of us earn a thousand good",
      "Deeds? He said: one of you recites a",
      "Hundred Tasbihat, a thousand good deeds",
      "Are written for him, and a thousand evil",
      "Deeds are wiped away from him."
    ])
  };
}

export const EVENING_ART = {
  "ghifar-and-aslam": ghifarAndAslam,
  "kingdom-at-evening": kingdomAtEvening,
  "what-the-muhrim-wears": whatTheMuhrimWears,
  "a-vow-changes-nothing": aVowChangesNothing,
  "a-bath-every-seven-days": aBathEverySevenDays,
  "a-thousand-good-deeds": aThousandGoodDeeds
};
