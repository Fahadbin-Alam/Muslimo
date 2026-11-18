import { cloud, glow, n, peaks, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { crescent, home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { cloth, soft, speaking } from "./fastArt";
import { dayLit, showAt, showFor, SOFT_GOLD, weekDay } from "./roadArt";
import { EIGHT, FOLK, glints, ITS_VOICE, linesOn, mat, places, plainLand, SEVEN, SIX, sparkStays, twinkle } from "./shareArt";
import { acacia } from "./easeArt";
import { GREY } from "./lovedArt";
import { coins } from "./tradeArt";
import { dish } from "./worthArt";
import { farHills, insideTheMasjid } from "./wideArt";
import { at3 } from "./storyArt";

/**
 * The hours of worship and what stays: the two rak'at Ibn Umar prayed with him before and after the prayers; the Asr
 * prayer, lost by those before, with two rewards for whoever guards it; the gates of Paradise opened on Monday and
 * Thursday, and the two kept waiting until they make peace; his long prostration in the night prayer; thirty-three and
 * thirty-three and thirty-three after the prayer, made a hundred; the three things of wealth that are truly one's own;
 * and the fourteen hundred at al-Hudaybiyah, the best on the earth. Only the land, the sky, buildings, things and
 * plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or
 * a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice
 * is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer or praise is a spark
 * that rises, what is good is a light, glints and a soft golden ring. No name, word or number is written.
 */

/** Two sparks side by side rising from about (x, y) at `from`, to (x + dx, y + dy) by `to`, and staying: two rak'ahs. */
const twoStay = (name: string, x: number, y: number, from: number, to: number, dx: number, dy: number): SignPart => ({
  name,
  svg: sparkle(n(x - 2.2), y, 1.6, "#FFE7A0") + sparkle(n(x + 2.2), y, 1.6, "#FFE7A0"),
  keys:
    dx === 0
      ? { at: [0, from, at3(from + 0.005), to], opacity: [0, 0, 1, 1], y: [0, 0, -1, dy] }
      : { at: [0, from, at3(from + 0.005), to], opacity: [0, 0, 1, 1], x: [0, 0, 0, dx], y: [0, 0, -1, dy] },
  loop: twinkle(900)
});

/** A soft light that comes over (x, y) at `from` and goes again: a prayer prayed there. */
const prayedThere = (name: string, x: number, y: number, rx: number, ry: number, from: number): SignPart => ({
  name,
  svg: wash(x, y, rx, ry, WARM, 0.16),
  keys: showFor(from, at3(from + 0.008), at3(from + 0.02), at3(from + 0.028)),
  loop: soft
});

/** A small light, its middle at (x, y). */
const smallLight = (x: number, y: number, r = 1.1, fill = "#FFE7A0") => `${glow(x, y, n(r * 3.4), fill, 0.22)}<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

/** A few small round puffs about (x, y), like foam: grey for wrongs, white once they are washed. */
const puffs = (list: [number, number][], fill: string, opacity: number) =>
  list
    .map(
      ([x, y]) =>
        `<circle cx="${n(x - 1.3)}" cy="${n(y + 0.3)}" r="1.2" fill="${fill}" opacity="${opacity}"/>` +
        `<circle cx="${x}" cy="${n(y - 0.5)}" r="1.5" fill="${fill}" opacity="${opacity}"/>` +
        `<circle cx="${n(x + 1.4)}" cy="${n(y + 0.4)}" r="1.1" fill="${fill}" opacity="${opacity}"/>`
    )
    .join("");

// Two rak'ahs around the prayers. Abdullah ibn Umar said: I offered with the Messenger of Allah ﷺ two rak'at before the
// Zuhr prayer and two rak'at after the Zuhr prayer, two rak'at after Jumu'ah, Maghrib and Isha (Sahih al-Bukhari 1169).
// No one is drawn: the masjid of Madinah, palms, the land, and the sky through a day and into the night, with the seven
// days of the week as small circles in it. His place and Ibn Umar's place are before the masjid. Ibn Umar's voice tells
// of it in the morning. The sun climbs to noon, and two sparks rise from their places and stay over the masjid: two
// rak'ahs before Zuhr. A soft light comes over the masjid: the Zuhr prayer, and two more sparks rise: after it. The
// days show and Friday lights, more places come to the masjid and its light comes: Jumu'ah, and two more sparks rise.
// The sun goes down, the sky turns to evening and the masjid's light comes: Maghrib, and two more rise. The night
// comes, with stars and the moon, and a small light shows at the masjid's door: Isha, and two more rise, five pairs in
// a row.
function sunnahAroundThePrayers(): SignArt {
  const his: [number, number] = [24, 104.6];
  const ibnUmar: [number, number] = [34, 105.2];
  const days = [38, 52, 66, 80, 94, 108, 122];
  const friday = days[5];
  const dayY = 10;
  const gathered: [number, number][] = [
    [10, 108.6],
    [16, 112],
    [44, 112],
    [50, 108.6],
    [8, 115],
    [52, 115]
  ];
  const evening = () => showAt(0.662, 0.69);
  const night = () => showAt(0.82, 0.85);
  const theWeek = () => showFor(0.498, 0.51, 0.66, 0.672);
  return {
    kind: "sunnah-around-the-prayers",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun",
        svg: sun(18, 50),
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.24, 78, -24],
            [0.662, 78, -24],
            [0.7, 132, 22]
          ]
        })
      },
      { name: "a cloud", svg: cloud(120, 30, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "the evening sky", svg: `<rect width="160" height="62" fill="#F2B98C" opacity="0.75"/>`, keys: evening() },
      { name: "the night sky", svg: `<rect width="160" height="64" fill="#1B2A50"/>`, keys: night() },
      {
        name: "stars",
        svg: stars([
          [14, 12],
          [36, 26],
          [58, 8],
          [84, 20],
          [104, 10],
          [148, 18],
          [72, 38],
          [118, 40]
        ]),
        keys: showAt(0.84, 0.86),
        loop: twinkle(1600)
      },
      { name: "the moon", svg: crescent(132, 28, 4, 2.2, "#FFF3C4"), keys: showAt(0.85, 0.87) },
      { name: "the days of the week", svg: days.map((x) => weekDay(x, dayY)).join(""), keys: theWeek() },
      { name: "Friday lights", svg: dayLit(friday, dayY, "#FFE7A0"), keys: showFor(0.512, 0.522, 0.66, 0.672) },
      { name: "Friday: a soft golden ring about it", svg: care(friday, dayY, 4.6, 4.6, SOFT_GOLD), keys: showFor(0.522, 0.532, 0.66, 0.672), loop: soft },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[70, 116], [104, 118], [150, 116]]) },
      ...palms(
        [
          [118, 100, 15],
          [134, 101, 17],
          [150, 100, 14]
        ],
        "Madinah"
      ),
      { name: "the masjid", svg: madinahMasjid(4, 100, 1) },
      { name: "the night over the land", svg: `<rect y="50" width="160" height="70" fill="#1B2A50" opacity="0.4"/>`, keys: night() },
      { name: "a small light at the masjid's door", svg: smallLight(28, 95.4), keys: showAt(0.84, 0.86), loop: soft },
      prayedThere("the Zuhr prayer: a soft light over the masjid", 28, 92, 28, 10, 0.338),
      prayedThere("Jumu'ah: a soft light over the masjid", 28, 92, 28, 10, 0.528),
      prayedThere("Maghrib: a soft light over the masjid", 28, 92, 28, 10, 0.69),
      prayedThere("Isha: a soft light over the masjid", 28, 92, 28, 10, 0.866),
      { name: "Jumu'ah: more places come to the masjid", svg: places(gathered, 1.5), keys: showFor(0.5, 0.52, 0.66, 0.68) },
      { name: "his place, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.6, ITS_VOICE) },
      { name: "Ibn Umar's voice: telling of it", svg: arcs(n(ibnUmar[0] + 3.2), n(ibnUmar[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.104, 0.112), loop: speaking },
      twoStay("two rak'ahs before Zuhr: two sparks rising, staying over the masjid", 29, 99, 0.244, 0.278, -19, -19),
      twoStay("two rak'ahs after Zuhr: two sparks rising, staying over the masjid", 29, 99, 0.372, 0.432, -9, -19),
      twoStay("two rak'ahs after Jumu'ah: two sparks rising, staying over the masjid", 29, 99, 0.54, 0.59, 1, -19),
      twoStay("two rak'ahs after Maghrib: two sparks rising, staying over the masjid", 29, 99, 0.7, 0.75, 11, -19),
      twoStay("two rak'ahs after Isha: two sparks rising, staying over the masjid", 29, 99, 0.896, 0.946, 21, -19)
    ],
    words: linesOn(SIX, [
      "Ibn Umar: I prayed with him two rak'ahs",
      "Before the Zuhr prayer,",
      "And two rak'ahs after the Zuhr prayer,",
      "Two rak'ahs after Jumu'ah,",
      "After Maghrib,",
      "And after Isha."
    ])
  };
}

// Two rewards for Asr. Abu Basrah al-Ghifari said: the Messenger of Allah ﷺ led us in the Asr prayer at al-Mukhammas,
// and then said: this prayer was presented to those gone before you, but they lost it, and whoever guards it has two
// rewards; and there is no prayer after it till the onlooker appears, and the onlooker is the star (Sahih Muslim 830a).
// No one is drawn: a valley among hills, with acacias, in the afternoon. His place is in front and two rows of places
// behind him, Abu Basrah's place among them. Abu Basrah's voice tells of it; a spark of the prayer rises from his
// place, with glints over the rows. His voice speaks. Far off, faint places show, with a small light before them:
// presented; the small light goes grey and the faint places fade: lost, gone before. A soft golden ring comes about the
// rows, and two golden lights show over them: two rewards. The sun goes down and the sky turns to evening; nothing
// rises. Then a star appears, with glints and a soft ring about it: the onlooker.
function twoRewardsForAsr(): SignArt {
  const his: [number, number] = [100, 101];
  const abuBasrah: [number, number] = [92, 107.4];
  const front: [number, number][] = [72, 82, 102, 112, 122].map((x): [number, number] => [x, 107.4]);
  const back: [number, number][] = [77, 87, 97, 107, 117].map((x): [number, number] => [x, 113.4]);
  const before: [number, number][] = [
    [18, 79],
    [24, 77.4],
    [30, 79.4],
    [21, 82.4],
    [27, 82.6]
  ];
  const star: [number, number] = [134, 28];
  const dusk = () => showAt(0.886, 0.91);
  return {
    kind: "two-rewards-for-asr",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE6F5", "#F1E6CC", 62) },
      {
        name: "the sun of the afternoon",
        svg: sun(128, 40),
        keys: track({
          xy: [
            [0.744, 0, 0],
            [0.8, 20, 34]
          ]
        })
      },
      { name: "a cloud", svg: cloud(60, 22, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the evening sky", svg: `<rect width="160" height="62" fill="#F0B08A" opacity="0.7"/>`, keys: showAt(0.75, 0.79) },
      { name: "dusk", svg: `<rect width="160" height="62" fill="#3A3F6E" opacity="0.75"/>`, keys: dusk() },
      { name: "the onlooker: the star", svg: smallLight(star[0], star[1], 1.2, "#FFF6D6") + sparkle(star[0], star[1], 2.4, "#FFF6D6"), keys: showAt(0.9, 0.92), loop: twinkle(1600) },
      {
        name: "glints about the star",
        svg: glints([
          [n(star[0] - 6), n(star[1] - 4)],
          [n(star[0] + 6), n(star[1] - 3)],
          [star[0], n(star[1] + 6.4)]
        ]),
        keys: showAt(0.92, 0.94),
        loop: twinkle()
      },
      { name: "a soft ring about the star", svg: care(star[0], star[1], 5, 5, SOFT_GOLD), keys: showAt(0.93, 0.95), loop: soft },
      {
        name: "the hills about the valley",
        svg: peaks(
          [
            [14, 12, 26],
            [50, 16, 30],
            [92, 10, 24],
            [140, 14, 30]
          ],
          66,
          "#C9B48C",
          false
        )
      },
      { name: "the valley", svg: plainLand("#E2CB9C", [[40, 116], [60, 98], [150, 115]]) },
      { name: "acacias", svg: acacia(56, 97, 10) + acacia(148, 99, 11) },
      { name: "dusk over the land", svg: `<rect y="50" width="160" height="70" fill="#3A3F6E" opacity="0.3"/>`, keys: dusk() },
      {
        name: "those gone before: faint places far off",
        svg: places(before, 1.1, "#9A8A7A"),
        keys: track({
          opacity: [
            [0.31, 0],
            [0.34, 0.75],
            [0.49, 0.75],
            [0.53, 0]
          ]
        })
      },
      {
        name: "presented: a small light before them",
        svg: smallLight(24, 72, 1.1),
        keys: track({
          opacity: [
            [0.33, 0],
            [0.36, 1],
            [0.46, 1],
            [0.48, 0]
          ]
        }),
        loop: soft
      },
      {
        name: "lost: the small light gone grey",
        svg: `<circle cx="24" cy="72" r="1.1" fill="${GREY}"/>`,
        keys: track({
          opacity: [
            [0.46, 0],
            [0.48, 1],
            [0.5, 1],
            [0.53, 0]
          ]
        })
      },
      { name: "his place, in front", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of the rows behind him", svg: places([...front, ...back], 1.5) },
      { name: "Abu Basrah's place, among them", svg: someone(abuBasrah[0], abuBasrah[1], 1.5, ITS_VOICE) },
      { name: "Abu Basrah's voice: telling of it", svg: arcsLeft(n(abuBasrah[0] - 3.2), n(abuBasrah[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.1, 0.108), loop: speaking },
      { name: "the Asr prayer: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 5), 1.3, "#FFE7A0"), keys: sparkStays(0.05, 0.09), loop: twinkle(900) },
      {
        name: "praying in rows: glints over the rows",
        svg: glints([
          [76, 103.4],
          [96, 103],
          [116, 103.4],
          [84, 109.4],
          [110, 109.6]
        ]),
        keys: track({
          opacity: [
            [0.06, 0],
            [0.08, 1],
            [0.17, 1],
            [0.185, 0]
          ]
        }),
        loop: twinkle()
      },
      { name: "his voice: this prayer", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.18, 0.188, 0.82, 0.828), loop: speaking },
      { name: "whoever guards it: a soft golden ring about the rows", svg: care(97, 110, 30, 6.4, SOFT_GOLD), keys: showAt(0.6, 0.63), loop: soft },
      { name: "two rewards: a golden light over the rows", svg: smallLight(88, 92, 1.4, "#FFD873") + sparkle(88, 92, 2.2, "#FFD873"), keys: showAt(0.63, 0.65), loop: twinkle(1500) },
      { name: "two rewards: a second golden light over the rows", svg: smallLight(108, 92, 1.4, "#FFD873") + sparkle(108, 92, 2.2, "#FFD873"), keys: showAt(0.655, 0.675), loop: twinkle(1500) }
    ],
    words: linesOn(SEVEN, [
      "Abu Basrah: he led us in the Asr prayer",
      "At al-Mukhammas, and then said:",
      "This prayer was presented to those",
      "Gone before you, but they lost it,",
      "And whoever guards it has two rewards.",
      "And no prayer after it till the onlooker",
      "Appears; the onlooker is the star."
    ])
  };
}

// Until they make peace. Abu Hurairah reported the Messenger of Allah ﷺ as saying: the gates of Paradise are not opened
// but on two days, Monday and Thursday, and then every servant who does not associate anything with Allah is granted
// pardon, except the one who has rancour against his brother; and it is said: look towards both of them until there is
// reconciliation (Sahih Muslim 2565a, where it is said three times). No one is drawn: the land and the sky, with the
// seven days of the week as small circles in it, and far off a tall gate with a garden within, in a soft light. Monday
// and Thursday light, and the gate's doors open. Places stand on the land; a golden glint and a soft golden ring come
// about each: pardoned, and sparks rise from them. Two places stand apart; a grey jagged line comes between them, and a
// grey shade about each: rancour, and no glint comes to them. A soft dashed ring comes about the two: waiting. They
// come together, the grey line and the shades go, and a soft golden ring and glints come about both: reconciled.
function untilTheyMakePeace(): SignArt {
  const days = [38, 52, 66, 80, 94, 108, 122];
  const monday = days[1];
  const thursday = days[4];
  const dayY = 10;
  const pardoned: [number, number][] = [
    [16, 104],
    [28, 109],
    [40, 103],
    [52, 110],
    [64, 104],
    [24, 115.6],
    [44, 116],
    [60, 115.4]
  ];
  const one: [number, number] = [104, 106];
  const other: [number, number] = [140, 106];
  const opening = "M70.5 62 L70.5 42.4 Q70.5 35.6 80 35.6 Q89.5 35.6 89.5 42.4 L89.5 62 Z";
  return {
    kind: "until-they-make-peace",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "a cloud", svg: cloud(140, 30, 0.45, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the days of the week", svg: days.map((x) => weekDay(x, dayY)).join("") },
      { name: "a soft light, far off, about the garden", svg: wash(80, 46, 24, 18, "#FFF3C4", 0.2), loop: soft },
      { name: "the gates of Paradise: a soft light about the gate", svg: wash(80, 48, 24, 18, "#FFF3C4", 0.2), keys: showAt(0.03, 0.06), loop: soft },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 98], [96, 117], [150, 115]]) },
      {
        name: "the garden within the gate",
        svg:
          `<path d="${opening}" fill="#D7EFB8"/>` +
          `<ellipse cx="75" cy="58" rx="6" ry="3.4" fill="#9CC46E"/><ellipse cx="85" cy="57" rx="6" ry="3.8" fill="#8DBB60"/>` +
          `<ellipse cx="80" cy="45" rx="7" ry="5" fill="#FFF6D6" opacity="0.7"/>`
      },
      {
        name: "the gate's doors, shut",
        svg:
          `<path d="M70.5 62 L70.5 42.4 Q70.5 35.6 80 35.6 L80 62 Z" fill="#C9A15A"/>` +
          `<path d="M80 35.6 Q89.5 35.6 89.5 42.4 L89.5 62 L80 62 Z" fill="#BF9750"/>` +
          `<path d="M80 35.6 L80 62 M73 46 L78 46 M82 46 L87 46 M73 54 L78 54 M82 54 L87 54" stroke="#9A7838" stroke-width="0.5"/>`,
        keys: track({
          opacity: [
            [0.21, 1],
            [0.24, 0]
          ]
        })
      },
      { name: "the gates of Paradise, far off: a tall gate", svg: `<path d="M69 62 L69 42 Q69 34 80 34 Q91 34 91 42 L91 62" stroke="#D9B24E" stroke-width="1.4" fill="none"/>` },
      { name: "Monday lights", svg: dayLit(monday, dayY, "#FFE7A0"), keys: showAt(0.168, 0.178) },
      { name: "Thursday lights", svg: dayLit(thursday, dayY, "#FFE7A0"), keys: showAt(0.186, 0.196) },
      { name: "Monday and Thursday: soft golden rings about them", svg: care(monday, dayY, 4.6, 4.6, SOFT_GOLD) + care(thursday, dayY, 4.6, 4.6, SOFT_GOLD), keys: showAt(0.2, 0.21), loop: soft },
      {
        name: "the gate open: glints in the garden",
        svg: glints([
          [76, 46],
          [84, 44],
          [80, 53]
        ]),
        keys: showAt(0.236, 0.25),
        loop: twinkle()
      },
      { name: "the places on the land", svg: places(pardoned, 1.5) },
      { name: "the place of one at odds", svg: someone(one[0], one[1], 1.6, FOLK), keys: track({ xy: [[0.886, 0, 0], [0.92, 10, 0]] }) },
      { name: "the place of the other at odds", svg: someone(other[0], other[1], 1.6, FOLK), keys: track({ xy: [[0.886, 0, 0], [0.92, -10, 0]] }) },
      { name: "pardoned: a golden glint over each", svg: glints(pardoned.map(([x, y]): [number, number] => [x, n(y - 4.4)])), keys: showAt(0.31, 0.34), loop: twinkle() },
      { name: "pardoned: a soft golden ring about each", svg: pardoned.map(([x, y]) => care(x, n(y + 0.4), 3, 1.8, SOFT_GOLD)).join(""), keys: showAt(0.33, 0.36), loop: soft },
      { name: "a spark rising from the places 1", svg: sparkle(16, 99, 1.2, "#FFE7A0"), keys: sparkStays(0.456, 0.49), loop: twinkle(900) },
      { name: "a spark rising from the places 2", svg: sparkle(40, 98, 1.2, "#FFE7A0"), keys: sparkStays(0.466, 0.5), loop: twinkle(900) },
      { name: "a spark rising from the places 3", svg: sparkle(64, 99, 1.2, "#FFE7A0"), keys: sparkStays(0.476, 0.51), loop: twinkle(900) },
      {
        name: "rancour: a grey jagged line between the two",
        svg: `<path d="M107.4 104 L112 102 L116 106 L120 102 L124 106 L128 102 L132 106 L136.6 104" stroke="${GREY}" stroke-width="0.8" fill="none" stroke-linejoin="round"/>`,
        keys: track({
          opacity: [
            [0.6, 0],
            [0.62, 1],
            [0.886, 1],
            [0.9, 0]
          ]
        })
      },
      {
        name: "rancour: a grey shade about each of the two",
        svg: wash(one[0], one[1], 5, 3, GREY, 0.3) + wash(other[0], other[1], 5, 3, GREY, 0.3),
        keys: track({
          opacity: [
            [0.62, 0],
            [0.65, 1],
            [0.886, 1],
            [0.9, 0]
          ]
        })
      },
      {
        name: "look towards both: a soft dashed ring about the two, waiting",
        svg: care(122, 106.4, 24, 6, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.745, 0],
            [0.775, 1],
            [0.92, 1],
            [0.94, 0]
          ]
        }),
        loop: soft
      },
      { name: "reconciled: a soft golden ring about both", svg: care(122, 106.4, 13, 4, SOFT_GOLD), keys: showAt(0.92, 0.94), loop: soft },
      {
        name: "reconciled: glints about both",
        svg: glints([
          [114, 100],
          [130, 100],
          [122, 98]
        ]),
        keys: showAt(0.935, 0.955),
        loop: twinkle()
      }
    ],
    words: linesOn(SEVEN, [
      "Abu Hurairah: the gates of Paradise are",
      "Not opened but on Monday and Thursday,",
      "And every servant is granted pardon",
      "Who associates nothing with Allah,",
      "Except one with rancour against a brother.",
      "And it is said: look towards both of them",
      "Until there is reconciliation."
    ])
  };
}

// A sujud of fifty verses. Aishah said: the Messenger of Allah ﷺ used to offer eleven rak'at, and that was his prayer.
// He used to prolong the prostration to such an extent that one could recite fifty verses before he would lift his
// head. He used to pray two rak'at before the Fajr prayer, and then lie down on his right side till the call-maker came
// and informed him about the prayer (Sahih al-Bukhari 1123). No one is drawn: a room at night, its window with stars
// and the moon, a small light by the window, a mat, bedding and the door. Aishah's voice tells of it, and eleven small
// lights come one after another over his place on the mat: eleven rak'ahs, and a soft golden ring about them: that was
// his prayer. His place goes low, with a soft light about it: the prostration; fifty small glints come row by row:
// fifty verses; then his place rises again. The window's sky pales, and two sparks rise and stay: two rak'ahs before
// Fajr. His place on the mat goes, and shows on the bedding, lying: on his right side. The call-maker's place shows at
// the door, its voice calling, and the dawn grows.
function aSujudOfFiftyVerses(): SignArt {
  const his: [number, number] = [76, 102];
  const aishah: [number, number] = [28, 104];
  const caller: [number, number] = [151, 90.6];
  const lights = Array.from({ length: 11 }, (_, i): [number, number] => [56 + i * 4, n(80 - 8 * Math.sin((Math.PI * i) / 10))]);
  const litAt = (i: number) => (i < 6 ? at3(0.03 + i * 0.01) : at3(0.146 + (i - 6) * 0.012));
  const dim = (from: number, to: number) =>
    track({
      opacity: [
        [from, 0],
        [to, 1],
        [0.266, 1],
        [0.28, 0.35]
      ]
    });
  const fifty = (row: number): SignPart => ({
    name: `fifty verses: a row of small glints ${row + 1}`,
    svg: Array.from({ length: 10 }, (_, i) => `<circle cx="${n(62 + i * 3.1)}" cy="${n(84 + row * 2.4)}" r="0.55" fill="#FFF4CF"/>`).join(""),
    keys: showFor(at3(0.39 + row * 0.012), at3(0.398 + row * 0.012), 0.512, 0.53)
  });
  return {
    kind: "a-sujud-of-fifty-verses",
    ms: 12000,
    parts: [
      { name: "the wall of the room", svg: `<rect width="160" height="94" fill="#D9BE8E"/><path d="M0 30 L160 30 M0 62 L160 62" stroke="#CDAF7E" stroke-width="0.5"/>` },
      { name: "the floor", svg: `<rect y="94" width="160" height="26" fill="#C59E6A"/><path d="M0 94 L160 94" stroke="#A8865A" stroke-width="0.6"/>` },
      { name: "the night through the window", svg: `<rect x="18" y="16" width="32" height="30" fill="#16284C"/>` },
      {
        name: "stars through the window",
        svg: stars([
          [22, 20],
          [30, 38],
          [44, 19],
          [46, 40],
          [24, 30]
        ]),
        loop: twinkle(1600)
      },
      { name: "the moon through the window", svg: crescent(40, 27, 3, 1.8, "#FFF3C4") },
      { name: "before Fajr: the window's sky pales", svg: `<rect x="18" y="31" width="32" height="15" fill="#F2B98C" opacity="0.55"/>`, keys: showAt(0.632, 0.66) },
      { name: "the dawn grows in the window", svg: `<rect x="18" y="16" width="32" height="30" fill="#F7D9A8" opacity="0.7"/>`, keys: showAt(0.876, 0.91) },
      { name: "the window's frame", svg: `<rect x="18" y="16" width="32" height="30" fill="none" stroke="#8A6A48" stroke-width="1.4"/><path d="M34 16 L34 46 M18 31 L50 31" stroke="#8A6A48" stroke-width="0.8"/>` },
      { name: "a small light by the window", svg: `<rect x="58" y="42" width="12" height="1.4" fill="#8A6A48"/><path d="M61 41.6 Q64 38.8 67 41.6 Z" fill="#B8864A"/>` + smallLight(64, 38.6, 0.8), loop: soft },
      { name: "the door, open on the night", svg: `<rect x="144" y="56" width="14" height="38" fill="#2A3558"/>` },
      { name: "the dawn outside the door", svg: `<rect x="144" y="56" width="14" height="38" fill="#F7D9A8" opacity="0.7"/>`, keys: showAt(0.876, 0.91) },
      { name: "the door's frame", svg: `<rect x="144" y="56" width="14" height="38" fill="none" stroke="#8A6A48" stroke-width="1.2"/>` },
      { name: "the bedding", svg: `<rect x="104" y="100" width="30" height="5" rx="1.6" fill="#E8D8B4"/><rect x="127" y="98.4" width="7" height="3.6" rx="1.4" fill="#F4EAD2"/>` },
      { name: "a mat", svg: mat(his[0], 104, 14) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.6, ITS_VOICE) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 3.2), n(aishah[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.09), loop: speaking },
      ...lights.map(
        ([x, y], i): SignPart => ({
          name: `eleven rak'ahs: a small light ${i + 1}`,
          svg: smallLight(x, y, 1),
          keys: dim(litAt(i), at3(litAt(i) + 0.006))
        })
      ),
      { name: "that was his prayer: a soft golden ring about the lights", svg: care(76, 76, 24, 7, SOFT_GOLD), keys: dim(0.2, 0.21), loop: soft },
      {
        name: "his place, on the mat",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.282, 0, 0],
            [0.3, 0, 2.4],
            [0.51, 0, 2.4],
            [0.53, 0, 0]
          ],
          opacity: [
            [0.754, 1],
            [0.77, 0]
          ]
        })
      },
      { name: "the long prostration: a soft light about his place", svg: wash(his[0], 104, 8, 3, WARM, 0.14), keys: showFor(0.3, 0.32, 0.51, 0.53), loop: soft },
      fifty(0),
      fifty(1),
      fifty(2),
      fifty(3),
      fifty(4),
      twoStay("two rak'ahs before Fajr: two sparks rising, staying over the mat", his[0], 96, 0.64, 0.69, 0, -10),
      { name: "on his right side: his place on the bedding, lying", svg: `<ellipse cx="117" cy="101.6" rx="5" ry="1.6" stroke="${GOLD}" stroke-width="0.9" fill="none"/>`, keys: showAt(0.77, 0.79) },
      { name: "the call-maker's place, at the door", svg: someone(caller[0], caller[1], 1.6, ITS_VOICE), keys: showAt(0.876, 0.89) },
      { name: "the call-maker's voice: the prayer", svg: arcsLeft(n(caller[0] - 3.2), n(caller[1] - 2.8), ITS_VOICE), keys: showAt(0.89, 0.898), loop: speaking }
    ],
    words: linesOn(EIGHT, [
      "Aishah: he used to pray eleven rak'ahs,",
      "And that was his prayer.",
      "He would prolong the prostration such that",
      "One could recite fifty verses",
      "Before he would lift his head.",
      "He prayed two rak'ahs before Fajr,",
      "Then lay down on his right side",
      "Till the call-maker came to inform him."
    ])
  };
}

// Ninety-nine, and one to make a hundred. Abu Hurairah reported the Messenger of Allah ﷺ as saying: if anyone extols
// Allah after every prayer thirty-three times, and praises Allah thirty-three times, and declares His greatness
// thirty-three times, ninety-nine times in all, and says to complete a hundred: there is no god but Allah, having no
// partner with Him, to Him belongs sovereignty and to Him is praise due, and He is Potent over everything, his sins
// will be forgiven even if these are as abundant as the foam of the sea (Sahih Muslim 597a). No one is drawn: inside
// the masjid, under its roof of palm fronds on palm trunks. Two rows of places sit on the left, and on the right the
// place of one who says it. Glints over the rows show the prayer, and go. Thirty-three small glints come in a row, then
// a second row of thirty-three, then a third; a soft golden ring comes about the three rows: ninety-nine, and a small
// dashed circle by them. It lights, and a spark rises from the place: the hundredth. Small grey puffs come about the
// place, like foam: its sins, and they turn white: forgiven; then they melt away, and a soft white ring and glints come
// about the place.
function ninetyNineAndOne(): SignArt {
  const foot = 96;
  const one: [number, number] = [116, 106];
  const front: [number, number][] = [20, 30, 40, 50, 60].map((x): [number, number] => [x, 104]);
  const back: [number, number][] = [25, 35, 45, 55].map((x): [number, number] => [x, 110.4]);
  const foam: [number, number][] = [
    [100, 101],
    [106, 111],
    [126, 100],
    [133, 108.6],
    [99, 115],
    [118, 115.6],
    [131, 115],
    [110, 97]
  ];
  const third = (row: number, part: number, color: string, from: number): SignPart => ({
    name: `thirty-three: glints in row ${row + 1}, part ${part + 1}`,
    svg: Array.from({ length: 11 }, (_, i) => `<circle cx="${n(92 + (part * 11 + i) * 1.5)}" cy="${54 + row * 8}" r="0.6" fill="${color}"/>`).join(""),
    keys: showAt(from, at3(from + 0.008))
  });
  const row = (r: number, color: string, start: number): SignPart[] => [0, 1, 2].map((p) => third(r, p, color, at3(start + p * 0.02)));
  return {
    kind: "ninety-nine-and-one",
    ms: 12000,
    parts: [
      ...insideTheMasjid(foot),
      { name: "the places of the rows, sitting", svg: places([...front, ...back], 1.5) },
      { name: "the place of one who says it", svg: someone(one[0], one[1], 1.7, ITS_VOICE) },
      {
        name: "the prayer: glints over the rows",
        svg: glints([
          [24, 99.6],
          [44, 99.4],
          [34, 105.8],
          [54, 106]
        ]),
        keys: showFor(0.024, 0.04, 0.07, 0.084),
        loop: twinkle()
      },
      {
        name: "wrongs: small grey puffs about that place, like foam",
        svg: puffs(foam, "#8E8A86", 0.8),
        keys: track({
          opacity: [
            [0.756, 0],
            [0.78, 1],
            [0.79, 1],
            [0.82, 0]
          ]
        })
      },
      ...row(0, "#FFF4CF", 0.145),
      ...row(1, "#FFE7A0", 0.267),
      ...row(2, "#FFD873", 0.389),
      { name: "ninety-nine: a soft golden ring about the three rows", svg: care(116, 62, 28, 12, SOFT_GOLD), keys: showAt(0.51, 0.53), loop: soft },
      { name: "to make a hundred: a small dashed circle by them", svg: someone(116, 78, 1.6, SOFT_GOLD), keys: showAt(0.545, 0.56) },
      { name: "the hundredth: it lights", svg: smallLight(116, 78, 1.2) + sparkle(116, 78, 2.2, "#FFE7A0"), keys: showAt(0.632, 0.642), loop: twinkle(1500) },
      { name: "a spark rising from that place", svg: sparkle(one[0], n(one[1] - 5.4), 1.3, "#FFE7A0"), keys: sparkStays(0.645, 0.69), loop: twinkle(900) },
      {
        name: "forgiven: the puffs turn white, like foam",
        svg: puffs(foam, "#FFFFFF", 0.9),
        keys: track({
          opacity: [
            [0.79, 0],
            [0.82, 1],
            [0.876, 1],
            [0.92, 0]
          ]
        })
      },
      { name: "a soft white ring about that place", svg: care(one[0], n(one[1] + 0.4), 5, 2.6, "#FFFFFF"), keys: showAt(0.9, 0.93), loop: soft },
      {
        name: "glints about that place",
        svg: glints([
          [n(one[0] - 6), n(one[1] - 5)],
          [n(one[0] + 6), n(one[1] - 6)],
          [one[0], n(one[1] - 9)]
        ]),
        keys: showAt(0.92, 0.94),
        loop: twinkle()
      }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: whoever extols Allah",
      "After every prayer thirty-three times,",
      "Praises Allah thirty-three times,",
      "Declares Allah great thirty-three times,",
      "Ninety-nine in all; to complete a hundred:",
      "There is no god but Allah, no partner...",
      "The sins are forgiven, even if as abundant",
      "As the foam of the sea."
    ])
  };
}

// Three things are yours. Abu Hurairah reported the Messenger of Allah ﷺ as saying: a servant says: my wealth, my
// wealth, but out of his wealth three things are only his: whatever he eats and makes use of, or by means of which he
// dresses himself and it wears out, or he gives as charity, and this is what he stored for himself; and what is beyond
// this, you are to depart and leave it for other people (Sahih Muslim 2959). No one is drawn: a home, the land and the
// sky, and before the home its wealth: jars, coins, a dish of dates and a garment spread out. The place of one who says
// it is by the wealth; its voice speaks, and a dashed ring comes about the wealth: my wealth. Three soft rings come
// about the dish, the garment and a few coins. The dates go one by one: eaten, used up. The garment pales, worn out. The
// few coins go to the place of one in need, and a spark rises from there and goes far up, to a small store of light:
// stored up. The place of the one who said it goes off along the land and is gone: departed; other places come to the
// wealth, and a dashed ring comes about it: left for others.
function threeThingsAreYours(): SignArt {
  const owner: [number, number] = [40, 110];
  const needy: [number, number] = [142, 107];
  const others: [number, number][] = [
    [46, 110.6],
    [54, 113.4],
    [64, 112.6]
  ];
  return {
    kind: "three-things-are-yours",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(132, 22) },
      { name: "a cloud", svg: cloud(70, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[86, 117], [124, 118], [154, 116]]) },
      { name: "a home", svg: home(26, 100, 30, 22) },
      { name: "the wealth: jars and coins", svg: sack(50, 106, 1.2) + sack(58, 107, 1, "#B8925A") + coins(66, 107, 5) + coins(71, 106.4, 4) },
      { name: "a dish", svg: dish(90, 106) },
      { name: "a date on the dish 1", svg: `<ellipse cx="88.2" cy="104.4" rx="1" ry="0.6" fill="#6E3B1E"/>`, keys: track({ opacity: [[0.312, 1], [0.32, 0]] }) },
      { name: "a date on the dish 2", svg: `<ellipse cx="90.2" cy="104.1" rx="1" ry="0.6" fill="#7A4424"/>`, keys: track({ opacity: [[0.326, 1], [0.334, 0]] }) },
      { name: "a date on the dish 3", svg: `<ellipse cx="92.2" cy="104.5" rx="1" ry="0.6" fill="#6E3B1E"/>`, keys: track({ opacity: [[0.34, 1], [0.348, 0]] }) },
      { name: "a garment, spread out", svg: cloth(104, 116, 108.4, "#8FBBD6"), keys: track({ opacity: [[0.456, 1], [0.49, 0]] }) },
      {
        name: "worn out: the garment, pale and thin",
        svg: cloth(104, 116, 108.4, "#CBD3D8") + `<path d="M106 110 L108 111.4 M111 109.6 L112.4 111.2 M114.6 110.4 L116 111.6" stroke="#A3AEB4" stroke-width="0.4"/>`,
        keys: track({ opacity: [[0.456, 0], [0.49, 1]] })
      },
      { name: "a few coins to give", svg: coins(78, 108, 3), keys: track({ xy: [[0.6, 0, 0], [0.64, 62, -1]] }) },
      { name: "the place of one in need", svg: someone(needy[0], needy[1], 1.6, FOLK) },
      {
        name: "the place of one who says: my wealth",
        svg: someone(owner[0], owner[1], 1.7, ITS_VOICE),
        keys: track({
          xy: [
            [0.744, 0, 0],
            [0.81, 110, 6]
          ],
          opacity: [
            [0.8, 1],
            [0.826, 0]
          ]
        })
      },
      { name: "its voice: my wealth, my wealth", svg: arcs(n(owner[0] + 3.2), n(owner[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.236, 0.244), loop: speaking },
      {
        name: "my wealth: a dashed ring about the wealth",
        svg: care(60, 105, 15, 5, ITS_VOICE),
        keys: track({
          opacity: [
            [0.05, 0],
            [0.08, 1],
            [0.744, 1],
            [0.76, 0]
          ]
        })
      },
      { name: "three things: a soft ring about the dish", svg: care(90, 105.4, 6, 3, SOFT_GOLD), keys: showAt(0.2, 0.212), loop: soft },
      { name: "three things: a soft ring about the garment", svg: care(110, 110, 9, 3.4, SOFT_GOLD), keys: showAt(0.214, 0.226), loop: soft },
      { name: "three things: a soft ring about the few coins", svg: care(78, 107, 5, 2.6, SOFT_GOLD), keys: showAt(0.228, 0.24), loop: soft },
      { name: "eaten: a glint over the dish", svg: sparkle(90, 100.6, 1, "#FFE7A0"), keys: showAt(0.36, 0.374), loop: twinkle() },
      { name: "worn: a glint over the garment", svg: sparkle(110, 105.4, 1, "#FFE7A0"), keys: showAt(0.5, 0.514), loop: twinkle() },
      {
        name: "given: a spark rising far up",
        svg: sparkle(138, 102, 1.3, "#FFE7A0"),
        keys: track({
          xy: [
            [0.645, 0, 0],
            [0.68, -18, -68]
          ],
          opacity: [
            [0.64, 0],
            [0.645, 1]
          ]
        }),
        loop: twinkle(900)
      },
      { name: "stored up: a small store of light, far up", svg: wash(120, 33, 6, 4, "#FFF3C4", 0.3) + care(120, 33, 5, 3.4, SOFT_GOLD), keys: showAt(0.665, 0.684), loop: soft },
      ...others.map(
        ([x, y], i): SignPart => ({
          name: `left for others: a place coming to the wealth ${i + 1}`,
          svg: someone(x, y, 1.5, FOLK),
          keys: track({
            xy: [
              [0.886, -46, 0],
              [0.92, 0, 0]
            ],
            opacity: [
              [0.886, 0],
              [0.9, 1]
            ]
          })
        })
      ),
      { name: "left for others: a dashed ring about the wealth", svg: care(60, 106, 15, 5.6, FOLK), keys: showAt(0.93, 0.95) }
    ],
    words: linesOn(SEVEN, [
      "Abu Hurairah: a servant says: my wealth,",
      "My wealth! But only three things of it are",
      "The servant's: what is eaten and used up,",
      "What is worn and wears out,",
      "Or what is given in charity, stored up;",
      "What is beyond this, you are to depart",
      "And leave it for other people."
    ])
  };
}

// The best on the earth. Jabir ibn Abdullah said: on the day of al-Hudaybiyah, the Messenger of Allah ﷺ said to us: you
// are the best people on the earth. We were fourteen hundred then. If I could see now, I would have shown you the place
// of the Tree (Sahih al-Bukhari 4154). No one is drawn: the plain of al-Hudaybiyah, hills far off, and the Tree, an
// acacia. His place is by the Tree, Jabir's place near it, and the places of the fourteen hundred fill the plain in
// fourteen groups. Jabir's voice tells of it; his voice speaks; a warm light, glints and a soft golden ring come over
// them all: the best on the earth. A glint lights over each of the fourteen groups, one after another: fourteen hundred.
// Jabir's voice speaks again, and a dashed way goes from Jabir's place to the Tree; a soft golden ring, a soft light and
// glints come about the place of the Tree.
function bestPeopleOnEarth(): SignArt {
  const tree: [number, number] = [22, 98];
  const his: [number, number] = [34, 101];
  const jabir: [number, number] = [44, 105];
  const groups: [number, number][] = [
    ...[60, 74, 88, 102, 116, 130, 144].map((x): [number, number] => [x, 102]),
    ...[26, 42, 58, 74, 90, 106, 122].map((x): [number, number] => [x, 112])
  ];
  const group = ([x, y]: [number, number]) =>
    [
      [0, 0],
      [-2.6, 0],
      [2.6, 0],
      [-1.3, -2.2],
      [1.3, -2.2],
      [-1.3, 2.2],
      [1.3, 2.2]
    ]
      .map(([dx, dy]) => someone(n(x + dx), n(y + dy), 0.9, FOLK))
      .join("");
  return {
    kind: "best-people-on-earth",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E8EEEA", 62) },
      { name: "the sun", svg: sun(132, 22) },
      { name: "a cloud", svg: cloud(80, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the plain of al-Hudaybiyah", svg: plainLand("#E2CB9C", [[50, 118], [96, 119], [152, 117]]) },
      { name: "the Tree, an acacia", svg: acacia(tree[0], tree[1], 26) },
      { name: "his place, by the Tree", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Jabir's place, near it", svg: someone(jabir[0], jabir[1], 1.6, ITS_VOICE) },
      { name: "the places of the fourteen hundred, in fourteen groups", svg: groups.map(group).join("") },
      { name: "Jabir's voice: telling of it", svg: arcs(n(jabir[0] + 3.2), n(jabir[1] - 2.8), ITS_VOICE), keys: showFor(0.024, 0.032, 0.112, 0.12), loop: speaking },
      { name: "his voice: you are the best", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.18, 0.188, 0.43, 0.438), loop: speaking },
      { name: "the best on the earth: a warm light over them all", svg: wash(86, 107, 66, 10, WARM, 0.12), keys: showAt(0.34, 0.37), loop: soft },
      {
        name: "the best on the earth: glints over them",
        svg: glints([
          [60, 96.6],
          [88, 96.4],
          [116, 96.6],
          [144, 96.8],
          [42, 106.6],
          [74, 106.4],
          [106, 106.6]
        ]),
        keys: showAt(0.36, 0.39),
        loop: twinkle()
      },
      { name: "the best on the earth: a soft golden ring about them all", svg: care(84, 107.4, 70, 9.6, SOFT_GOLD), keys: showAt(0.38, 0.41), loop: soft },
      ...groups.map(
        ([x, y], i): SignPart => ({
          name: `fourteen hundred: a glint over group ${i + 1}`,
          svg: sparkle(x, n(y - 4.6), 1.1, "#FFE7A0"),
          keys: showAt(at3(0.5 + i * 0.007), at3(0.506 + i * 0.007)),
          loop: twinkle()
        })
      ),
      { name: "Jabir's voice: if I could see now", svg: arcsLeft(n(jabir[0] - 3.2), n(jabir[1] - 2.8), ITS_VOICE), keys: showAt(0.66, 0.668), loop: speaking },
      { name: "I would have shown you: a dashed way from Jabir's place to the Tree", svg: way("M41.4 104 C36 101.6 30 100.4 24.6 99.4", SOFT_GOLD, 0.7), keys: showAt(0.7, 0.74) },
      { name: "the place of the Tree: a soft golden ring about it", svg: care(tree[0], n(tree[1] + 0.6), 9, 3, SOFT_GOLD), keys: showAt(0.82, 0.85), loop: soft },
      { name: "the place of the Tree: a soft light about it", svg: wash(tree[0], 88, 18, 14, WARM, 0.14), keys: showAt(0.83, 0.86), loop: soft },
      {
        name: "the place of the Tree: glints",
        svg: glints([
          [10, 88],
          [34, 86],
          [22, 70]
        ]),
        keys: showAt(0.86, 0.89),
        loop: twinkle()
      }
    ],
    words: linesOn(SIX, [
      "Jabir: on the day of al-Hudaybiyah,",
      "He said to us:",
      "You are the best people on the earth!",
      "We were fourteen hundred then.",
      "If I could see now, I would have shown you",
      "The place of the Tree."
    ])
  };
}

export const HOUR_ART = {
  "sunnah-around-the-prayers": sunnahAroundThePrayers,
  "two-rewards-for-asr": twoRewardsForAsr,
  "until-they-make-peace": untilTheyMakePeace,
  "a-sujud-of-fifty-verses": aSujudOfFiftyVerses,
  "ninety-nine-and-one": ninetyNineAndOne,
  "three-things-are-yours": threeThingsAreYours,
  "best-people-on-earth": bestPeopleOnEarth
} as const;
