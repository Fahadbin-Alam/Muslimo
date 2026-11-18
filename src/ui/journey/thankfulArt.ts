import { animalAt, cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { at3 } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { care, LIGHT, lightIn, palms, sparkRising, track } from "./daysArt";
import { cloth, greyRing, soft, speaking } from "./fastArt";
import { prayerMat } from "./lovedArt";
import { faintRing, litWindow, nightLand } from "./heedArt";
import { dish } from "./worthArt";
import { restingCamel, showAt, showFor } from "./roadArt";
import { roofOnTrunks } from "./gentleArt";
import { coins, jar, stall } from "./tradeArt";
import { food } from "./hopeArt";

/**
 * Thankful: he stood in prayer at night until his feet swelled, and said: should I not be a thankful servant; each day
 * one asks that the one who spends be given something in its place, and the other ruin for the one who holds back; the
 * Hour comes so suddenly that a garment spread for sale is never folded, the milk is never drunk and the trough never
 * watered from; when the cold was hard he prayed early, and when the heat was hard he waited for it to cool; the rope
 * in the masjid untied: pray while fresh, and when tired, sit; the doors of mercy on going in, and His bounty on going
 * out; and charity from the food of the home, with a reward for the one who gives, the one who earned and the keeper of
 * the store, none lessening another's. Only the land, the sky, buildings, things, plants and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face: where someone was, a ring or a
 * small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn
 * for Allah, for the angels or for the Hour, and nothing comes down from the sky: a prayer is a spark that rises, and
 * what is given is a light, glints and a soft golden ring. No name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The walls of homes at night: wall, trim and the dark of a door. */
const NIGHT_WALLS = ["#6A5A4C", "#5A4C40", "#2E2620"] as const;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number, sunY = 20): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, sunY) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts, fill);

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** `svg` drawn `s` times its size about (x, y). */
const bigger = (x: number, y: number, s: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${svg}</g>`;

/** A spark at (x, y) that rises by `rise` from `from` and is gone by `to`. */
const rising = (name: string, x: number, y: number, from: number, to: number, rise = 10): SignPart => ({
  name,
  svg: sparkle(x, y, 1.4, "#FFE7A0"),
  keys: sparkRising(from, to, rise),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

/** The masjid of Madinah, small at the left, and his place, a golden ring, by it. */
const masjidAtLeft = (): SignPart[] => [
  { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.36) },
  { name: "his place, a golden ring", svg: ring(10.6, 100.4, 2.2, GOLD) }
];

/** His voice by his place at the left. */
const HIS_VOICE = arcs(12.8, 97.4, GOLD);

/** A sack gone flat, empty and grey, its foot's middle at (x, y). */
const flatSack = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${y} Q${n(x - 2.6)} ${n(y - 1.9)} ${n(x - 0.6)} ${n(y - 1.7)} L${n(x + 1.4)} ${n(y - 2.3)} Q${n(x + 3)} ${n(y - 1.5)} ${n(x + 3.2)} ${y} Z" fill="#9A938C"/>` +
  `<path d="M${n(x - 1.4)} ${n(y - 0.7)} L${n(x + 1.6)} ${n(y - 1.1)}" stroke="#7D746C" stroke-width="0.4" stroke-linecap="round"/>`;

/** A wooden bowl of milk, its foot's middle at (x, y). */
const bowlOfMilk = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y - 2.2)} Q${n(x - 2.2)} ${y} ${x} ${y} Q${n(x + 2.2)} ${y} ${n(x + 2.4)} ${n(y - 2.2)} Z" fill="#9A6A3E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.2)}" rx="2.3" ry="0.55" fill="#FAF6EC"/>`;

/** A low trough of mud for watering the flock, its foot's middle at (x, y), dry inside. */
const trough = (x: number, y: number) =>
  `<path d="M${n(x - 9)} ${n(y - 4)} L${n(x + 9)} ${n(y - 4)} L${n(x + 8)} ${y} L${n(x - 8)} ${y} Z" fill="#B08A5E"/>` +
  `<path d="M${n(x - 7.6)} ${n(y - 4)} L${n(x + 7.6)} ${n(y - 4)} L${n(x + 7)} ${n(y - 2.8)} L${n(x - 7)} ${n(y - 2.8)} Z" fill="#8E6C46"/>` +
  `<path d="M${n(x - 9)} ${n(y - 4)} L${n(x + 9)} ${n(y - 4)}" stroke="#97744C" stroke-width="0.5"/>`;

/** A sheep of the picture cards, `s` times its size, with its feet at (x, y). */
const sheepAt = (x: number, y: number, s = 0.12, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);

// A thankful servant. Al-Mughirah ibn Shu'bah said: the Prophet ﷺ would stand to pray until his feet swelled, or his
// legs (Sahih al-Bukhari 1130, 6471); it was said to him: Allah has forgiven you what came before of your sins and what
// is to come; and he said: should I not be a thankful servant? (4836). No one is drawn: at night, by his home, his place,
// a golden ring, stands on a prayer mat, and sparks rise from it, one and then another, while the moon goes on across
// the sky and the lit windows of the far homes go dark one by one. A place comes, and its voice speaks to him; a soft
// white glow and a soft white ring come about his place. His voice answers, sparks rise again, and a warm glow comes
// about his place.
function aThankfulServant(): SignArt {
  const his: [number, number] = [96, 103.2];
  const mughirah: [number, number] = [146, 106.4];
  const asker: [number, number] = [66, 105.6];
  const farLeft: [number, number, number, number] = [22, 95, 16, 10];
  const farRight: [number, number, number, number] = [128, 94, 16, 10];
  const own: [number, number, number, number] = [76, 97, 18, 12];
  const spark = (name: string, from: number, to: number, dx: number) => rising(name, n(his[0] + dx), n(his[1] - 4.8), from, to, 12);
  return {
    kind: "a-thankful-servant",
    ms: 11000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars of the night",
        svg: stars([
          [8, 12],
          [26, 42],
          [44, 10],
          [62, 44],
          [82, 14],
          [100, 40],
          [118, 10],
          [136, 34],
          [152, 12],
          [150, 52]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the moon, going on across the sky",
        svg: `${glow(22, 28, 7, "#FFF3C4", 0.08)}${crescent(22, 28, 4, 1.5, "#FFF3C4")}`,
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.12, 16, -4],
            [0.19, 16, -4],
            [0.28, 32, -7]
          ]
        })
      },
      { name: "hills in the dark", svg: hills("#3A4263") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [18, 76],
          [62, 74],
          [112, 78],
          [30, 116],
          [124, 116]
        ])
      },
      { name: "a far home", svg: home(farLeft[0], farLeft[1], farLeft[2], farLeft[3], ...NIGHT_WALLS) },
      { name: "the far home's window, lit, then dark", svg: litWindow(farLeft[0], farLeft[1], farLeft[3]), keys: track({ opacity: [[0.2, 1], [0.23, 0]] }) },
      { name: "another far home", svg: home(farRight[0], farRight[1], farRight[2], farRight[3], ...NIGHT_WALLS) },
      { name: "the other far home's window, lit, then dark", svg: litWindow(farRight[0], farRight[1], farRight[3]), keys: track({ opacity: [[0.24, 1], [0.27, 0]] }) },
      { name: "his home, its window lit", svg: home(own[0], own[1], own[2], own[3], ...NIGHT_WALLS) + litWindow(own[0], own[1], own[3]) },
      { name: "a prayer mat, his place of prayer", svg: prayerMat(his[0], n(his[1] + 2.2)) },
      { name: "his place, a golden ring, standing in prayer", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "al-Mughirah's place", svg: someone(mughirah[0], mughirah[1], 1.5, LIGHT) },
      { name: "al-Mughirah's voice: he would stand to pray", svg: arcsLeft(n(mughirah[0] - 2), n(mughirah[1] - 3.4), LIGHT), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      spark("standing in prayer: a spark rising", 0.03, 0.11, -1),
      spark("and another spark rising", 0.06, 0.13, 1.2),
      spark("on through the night: a spark rising", 0.19, 0.27, -1),
      spark("and another spark rising through the night", 0.22, 0.29, 1.2),
      { name: "one who speaks to him: its place", svg: someone(asker[0], asker[1], 1.5, LIGHT), keys: showAt(0.35, 0.36) },
      { name: "its voice: you are forgiven", svg: arcs(n(asker[0] + 2), n(asker[1] - 3.4), LIGHT), keys: showFor(0.37, 0.38, 0.68, 0.69), loop: speaking },
      { name: "forgiven: a soft white glow about his place", svg: glow(his[0], n(his[1] - 1), 6, "#FFFFFF", 0.2), keys: showAt(0.52, 0.55), loop: soft },
      { name: "what came before and what is to come: a soft white ring about his place", svg: care(his[0], n(his[1] + 0.6), 4.8, 2.2, "#FFFFFF"), keys: showAt(0.58, 0.6), loop: soft },
      { name: "his voice: should I not be thankful", svg: arcsLeft(n(his[0] - 3), n(his[1] - 3.8), GOLD), keys: showAt(0.69, 0.7), loop: speaking },
      spark("thankful: a spark rising", 0.85, 0.93, -1),
      spark("thankful: another spark rising", 0.88, 0.95, 1.2),
      { name: "a warm glow about his place", svg: glow(his[0], n(his[1] - 1), 5.4, WARM, 0.3), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: [
      { text: "Al-Mughirah: he would stand to pray", from: 0.02, to: 0.17 },
      { text: "until his feet swelled.", from: 0.185, to: 0.335 },
      { text: "He was told: Allah has forgiven you", from: 0.35, to: 0.5 },
      { text: "what came before and what is to come.", from: 0.515, to: 0.665 },
      { text: "He said: should I not be", from: 0.68, to: 0.83 },
      { text: "a thankful servant?", from: 0.845, to: 1 }
    ]
  };
}

// Spend, and it is replaced. Abu Hurairah said that the Prophet ﷺ said: there is no day on which the servants wake but
// two angels come down; one of them says: O Allah, give the one who spends something in its place; and the other says:
// O Allah, give the one who holds back ruin (Sahih al-Bukhari 1442). Nothing is drawn for Allah or for the angels, and
// nothing comes down from the sky: the sun rises over two homes, and the place of each steps out of its home. The first
// one's sack goes to a place in need, by its empty dish, and a warm glow comes about it; then a new sack shows by the
// first home, with glints, and a soft golden ring comes about the one who spends. A grey ring comes about the second
// one's sack, tied and held back; it grows flat and grey, and a grey haze comes about the one who holds back.
function spendAndReplace(): SignArt {
  const abu: [number, number] = [27, 104.6];
  const homeA: [number, number] = [52, 96];
  const homeB: [number, number] = [126, 96];
  const giver: [number, number] = [62, 103.6];
  const holder: [number, number] = [136, 103.6];
  const needy: [number, number] = [96, 104.2];
  const sackA: [number, number] = [68, 106.6];
  const sackB: [number, number] = [143.4, 106.6];
  const out = (door: [number, number], to: [number, number]) =>
    track({
      opacity: [
        [0.19, 0],
        [0.2, 1]
      ],
      xy: [
        [0.2, n(door[0] - to[0]), n(door[1] - to[1])],
        [0.27, 0, 0]
      ]
    });
  return {
    kind: "spend-and-replace",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the dawn over the sky, fading as the sun rises", svg: `<rect width="160" height="62" fill="#F6CFA0" opacity="0.55"/>`, keys: track({ opacity: [[0.03, 1], [0.12, 0]] }) },
      {
        name: "the sun, rising",
        svg: sun(34, 24),
        keys: track({
          xy: [
            [0.03, 0, 34],
            [0.12, 0, 0]
          ]
        })
      },
      { name: "a cloud", svg: cloud(110, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...masjidAtLeft(),
      { name: "Abu Hurairah's place", svg: someone(abu[0], abu[1], 1.4) },
      { name: "Abu Hurairah's voice: he said", svg: arcs(n(abu[0] + 1.8), n(abu[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      { name: "his voice: every day", svg: HIS_VOICE, keys: showAt(0.1, 0.11), loop: speaking },
      { name: "the home of the one who spends", svg: home(homeA[0], homeA[1], 18, 12) },
      { name: "the home of the one who holds back", svg: home(homeB[0], homeB[1], 18, 12) },
      { name: "waking: the place of the one who spends, stepping out", svg: someone(giver[0], giver[1], 1.5), keys: out([n(homeA[0] - 1.8), n(homeA[1] - 1.6)], giver) },
      { name: "waking: the place of the one who holds back, stepping out", svg: someone(holder[0], holder[1], 1.5), keys: out([n(homeB[0] - 1.8), n(homeB[1] - 1.6)], holder) },
      { name: "a place in need by the way", svg: someone(needy[0], needy[1], 1.4) },
      { name: "an empty dish by the place in need", svg: dish(n(needy[0] + 5.4), 107.4) },
      {
        name: "spending: its sack going to the place in need",
        svg: sack(sackA[0], sackA[1], 0.7),
        keys: track({
          xy: [
            [0.36, 0, 0],
            [0.44, n(needy[0] - 5.6 - sackA[0]), 0.6]
          ]
        })
      },
      { name: "a warm glow about the place in need", svg: glow(needy[0], n(needy[1] - 0.6), 5, WARM, 0.32), keys: showAt(0.44, 0.455), loop: soft },
      { name: "in its place: a new sack by the one who spends", svg: sack(sackA[0], sackA[1], 0.7), keys: showAt(0.52, 0.53) },
      {
        name: "glints over the new sack",
        svg: glints(
          [
            [n(sackA[0] - 2.4), n(sackA[1] - 6.2)],
            [n(sackA[0] + 2.6), n(sackA[1] - 6.6)]
          ],
          0.9,
          "#FFD866"
        ),
        keys: showAt(0.56, 0.57),
        loop: twinkle()
      },
      { name: "a soft golden ring about the one who spends", svg: care(giver[0], n(giver[1] + 0.6), 3.6, 1.6, SOFT_GOLD), keys: showAt(0.6, 0.62), loop: soft },
      { name: "holding back: its sack, tied", svg: sack(sackB[0], sackB[1], 0.7), keys: track({ opacity: [[0.85, 1], [0.9, 0]] }) },
      { name: "holding back: a grey ring about its sack", svg: greyRing(sackB[0], n(sackB[1] - 2.2), 4.2, 3.6), keys: showAt(0.69, 0.71) },
      { name: "ruin: its sack, grown flat and grey", svg: flatSack(sackB[0], sackB[1]), keys: showAt(0.85, 0.9) },
      { name: "a grey haze about the one who holds back", svg: wash(holder[0], n(holder[1] - 0.6), 6, 4, "#8C8580", 0.12), keys: showAt(0.9, 0.92) }
    ],
    words: [
      { text: "Abu Hurairah: he said: every day", from: 0.02, to: 0.17 },
      { text: "the servants wake, two angels come down;", from: 0.185, to: 0.335 },
      { text: "one says: O Allah, give the one who spends", from: 0.35, to: 0.5 },
      { text: "something in its place;", from: 0.515, to: 0.665 },
      { text: "the other says: O Allah, give", from: 0.68, to: 0.83 },
      { text: "ruin to the one who holds back", from: 0.845, to: 1 }
    ]
  };
}

// A garment left spread. Abu Hurairah said that the Messenger of Allah ﷺ said: ... and the Hour will surely come while
// two men have spread a garment between them, and they will not sell it or fold it; and while a man goes off with the
// milk of his she-camel, and does not drink it; and while one plasters his trough, and does not water from it; and while
// one has raised his food to his mouth, and does not eat it (Sahih al-Bukhari 6506). Nothing is drawn for the Hour, and
// no one is drawn: two places step apart and a garment spreads on the ground between them; coins show by one of them,
// and a grey ring comes about the garment, never folded, and about the coins, never paid. A place goes off from its
// resting she-camel with a bowl of milk, and a grey ring comes about the bowl, never drunk. A trough is plastered with
// mud, patch by patch, while sheep wait by it; a grey ring comes about the dry trough, and a pale stillness comes over
// everything, left as it was.
function aGarmentLeftSpread(): SignArt {
  const abu: [number, number] = [24, 107.4];
  const t1: [number, number] = [41, 102.4];
  const t2: [number, number] = [51, 102.4];
  const coinsAt: [number, number] = [61.6, 106.8];
  const carrier: [number, number] = [70.4, 105];
  const bowl0: [number, number] = [73.6, 107.4];
  const off: [number, number] = [28, 2.6];
  const troughAt: [number, number] = [134, 104.8];
  const plasterer: [number, number] = [121.4, 102.6];
  const patch = (t: number) => showAt(t, at3(t + 0.01));
  return {
    kind: "a-garment-left-spread",
    ms: 12000,
    parts: [
      ...daySky(128, 62, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...masjidAtLeft(),
      { name: "Abu Hurairah's place", svg: someone(abu[0], abu[1], 1.4) },
      { name: "Abu Hurairah's voice: he said", svg: arcs(n(abu[0] + 1.8), n(abu[1] - 3.2), ITS_VOICE), keys: showFor(0.025, 0.035, 0.08, 0.09), loop: speaking },
      { name: "his voice: the Hour will come", svg: HIS_VOICE, keys: showAt(0.06, 0.07), loop: speaking },
      {
        name: "a garment, spread on the ground between them",
        svg:
          cloth(39, 53, 102.8, "#BFD6E8") +
          `<path d="M38.4 104 L53.6 104 M37.8 105.2 L54.2 105.2" stroke="#8FB0CC" stroke-width="0.4"/>`,
        origin: { x: 46, y: 104.4 },
        keys: track({
          opacity: [
            [0.27, 0],
            [0.275, 1]
          ],
          scaleX: [
            [0.275, 0.2],
            [0.32, 1]
          ]
        })
      },
      {
        name: "one of the two, stepping back",
        svg: someone(t1[0], t1[1], 1.5),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.2, -6, 0]
          ]
        })
      },
      {
        name: "the other of the two, stepping back",
        svg: someone(t2[0], t2[1], 1.5),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.2, 6, 0]
          ]
        })
      },
      { name: "a she-camel, resting", svg: restingCamel(84, 101.6, 0.75), loop: { move: "bob", ms: 3200, y: -0.2 } },
      {
        name: "the place of the one going off with the milk",
        svg: someone(carrier[0], carrier[1], 1.5),
        keys: track({
          xy: [
            [0.51, 0, 0],
            [0.57, off[0], off[1]]
          ]
        })
      },
      {
        name: "the milk of its camel: a bowl going off with it",
        svg: bowlOfMilk(bowl0[0], bowl0[1]),
        keys: track({
          xy: [
            [0.51, 0, 0],
            [0.57, off[0], off[1]]
          ]
        })
      },
      { name: "a trough of mud, dry", svg: trough(troughAt[0], troughAt[1]) },
      { name: "the place of the one plastering it", svg: someone(plasterer[0], plasterer[1], 1.5) },
      { name: "sheep, waiting by the trough", svg: sheepAt(148.6, 108.6, 0.12, true) + sheepAt(155, 105.4, 0.11, true), loop: { move: "bob", ms: 1800, y: -0.3 } },
      { name: "plastering: a patch of wet mud", svg: `<ellipse cx="${n(troughAt[0] - 5)}" cy="${n(troughAt[1] - 1.5)}" rx="1.7" ry="0.9" fill="#6E4A2C"/>`, keys: patch(0.756) },
      { name: "plastering: a second patch", svg: `<ellipse cx="${troughAt[0]}" cy="${n(troughAt[1] - 1.4)}" rx="1.8" ry="0.9" fill="#6E4A2C"/>`, keys: patch(0.776) },
      { name: "plastering: a third patch", svg: `<ellipse cx="${n(troughAt[0] + 5)}" cy="${n(troughAt[1] - 1.5)}" rx="1.7" ry="0.9" fill="#6E4A2C"/>`, keys: patch(0.796) },
      { name: "the price: coins by the other", svg: coins(coinsAt[0], coinsAt[1], 3), keys: showAt(0.39, 0.4) },
      { name: "left as it was: a pale stillness over everything", svg: `<rect width="160" height="120" fill="#F6F3EC" opacity="0.34"/>`, keys: showAt(0.9, 0.95) },
      { name: "never folded: a grey ring about the garment", svg: greyRing(46, 104.4, 10.6, 3.4), keys: showAt(0.41, 0.43) },
      { name: "never paid: a grey ring about the coins", svg: greyRing(coinsAt[0], n(coinsAt[1] - 1.2), 3.6, 2.4), keys: showAt(0.43, 0.45) },
      { name: "never drunk: a grey ring about the bowl", svg: greyRing(n(bowl0[0] + off[0]), n(bowl0[1] + off[1] - 1.2), 3.6, 2.4), keys: showAt(0.634, 0.65) },
      { name: "never watered from: a grey ring about the dry trough", svg: greyRing(troughAt[0], n(troughAt[1] - 2.2), 11.4, 4), keys: showAt(0.878, 0.89) }
    ],
    words: [
      { text: "Abu Hurairah: he said:", from: 0.02, to: 0.13 },
      { text: "The Hour will come while two men", from: 0.142, to: 0.252 },
      { text: "have spread a garment between them,", from: 0.264, to: 0.374 },
      { text: "and will not sell it or fold it;", from: 0.386, to: 0.496 },
      { text: "while one goes off with his camel's milk", from: 0.508, to: 0.618 },
      { text: "and does not drink it;", from: 0.63, to: 0.74 },
      { text: "while one plasters his trough", from: 0.752, to: 0.862 },
      { text: "and does not water from it", from: 0.874, to: 1 }
    ]
  };
}

// Cold and heat. Anas ibn Malik said: when the cold was hard, the Prophet ﷺ would pray early, and when the heat was hard,
// he would wait for it to cool, meaning the Jumu'ah (Sahih al-Bukhari 906). No one is drawn: before the masjid of
// Madinah, his place, a golden ring, on a prayer mat, and the places of the folk behind it. On a cold day, under a pale
// sky with frost on the ground, sparks rise from his place while the sun is still high, and a soft golden ring comes
// about the mat. Then a hot day: the sky grows warm, the sun's heat glows and shimmers over the ground; only when the sun
// has gone on, and the shade of the masjid has grown out over his place and the heat has eased, do the sparks rise.
function coldAndHeat(): SignArt {
  const his: [number, number] = [70, 104.2];
  const anas: [number, number] = [148, 106.6];
  const folk: [number, number][] = [
    [88, 106.6],
    [98, 106.6],
    [108, 106.6]
  ];
  const sunAt: [number, number] = [66, 19];
  const later: [number, number, number][] = [
    [0.74, 0, 0],
    [0.82, -34, 11]
  ];
  const heat = (x: number, y: number) =>
    `<path d="M${x} ${y} Q${n(x + 1)} ${n(y - 1.4)} ${x} ${n(y - 2.8)} Q${n(x - 1)} ${n(y - 4.2)} ${x} ${n(y - 5.6)}" stroke="#F2C66A" stroke-width="0.5" fill="none" stroke-linecap="round"/>`;
  const spark = (name: string, from: number, to: number, dx: number) => rising(name, n(his[0] + dx), n(his[1] - 4.6), from, to, 11);
  return {
    kind: "cold-and-heat",
    ms: 9000,
    parts: [
      { name: "a cold day's pale sky", svg: sky("#D3E2EC", "#E6EEF3", 62) },
      { name: "a hot day's warm sky", svg: sky("#F2D49A", "#FAE6BE", 62), keys: showAt(0.5, 0.56) },
      { name: "the sun, high, then going on", svg: sun(sunAt[0], sunAt[1]), keys: track({ xy: later }) },
      {
        name: "the heat of the sun, glowing",
        svg: glow(sunAt[0], sunAt[1], 24, "#FFC861", 0.1),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.56, 1],
            [0.8, 1],
            [0.84, 0]
          ],
          xy: later
        })
      },
      { name: "a cloud", svg: cloud(118, 28, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      {
        name: "the cold: frost on the ground",
        svg: `<rect y="61" width="160" height="59" fill="#E6F0F8" opacity="0.3"/>` + [12, 30, 52, 80, 100, 122, 140, 156].map((x, i) => `<circle cx="${x}" cy="${n(108 + (i % 3) * 2.4)}" r="0.55" fill="#F4FAFF"/>`).join(""),
        keys: track({ opacity: [[0.5, 1], [0.56, 0]] })
      },
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 100, 0.8) },
      {
        name: "the shade of the masjid, growing long",
        svg: `<path d="M44.4 99.8 L50.2 99.8 L52.2 103 L44.4 103 Z" fill="#000000" opacity="0.13"/>`,
        origin: { x: 44.4, y: 101.4 },
        keys: track({
          scaleX: [
            [0.74, 1],
            [0.82, 4.4]
          ]
        })
      },
      {
        name: "the heat, shimmering over the ground",
        svg: [96, 112, 126, 140, 154].map((x, i) => heat(x, i % 2 ? 98 : 100.4)).join(""),
        keys: track({
          opacity: [
            [0.58, 0],
            [0.62, 1],
            [0.8, 1],
            [0.84, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.3 }
      },
      { name: "a prayer mat, his place of prayer", svg: prayerMat(his[0], n(his[1] + 2.2)) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the folk's places, praying with him", svg: folk.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "Anas ibn Malik's place", svg: someone(anas[0], anas[1], 1.4) },
      { name: "Anas's voice: when the cold was hard", svg: arcsLeft(n(anas[0] - 1.8), n(anas[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.19, 0.2), loop: speaking },
      spark("early, in the cold: a spark rising", 0.27, 0.34, -1),
      spark("and another spark rising", 0.31, 0.38, 1.2),
      {
        name: "prayed early: a soft golden ring about the mat",
        svg: care(his[0], n(his[1] + 1.6), 10, 3.2, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.4, 0],
            [0.42, 1],
            [0.5, 1],
            [0.53, 0]
          ]
        }),
        loop: soft
      },
      spark("once it is cooler: a spark rising", 0.85, 0.92, -1),
      spark("and another spark rising once it is cooler", 0.88, 0.95, 1.2),
      { name: "prayed in the cool: a soft golden ring about the mat", svg: care(his[0], n(his[1] + 1.6), 10, 3.2, SOFT_GOLD), keys: showAt(0.93, 0.95), loop: soft }
    ],
    words: [
      { text: "Anas: when the cold was hard,", from: 0.02, to: 0.245 },
      { text: "he would pray early;", from: 0.26, to: 0.485 },
      { text: "and when the heat was hard,", from: 0.5, to: 0.725 },
      { text: "he would wait for it to cool", from: 0.74, to: 1 }
    ]
  };
}

// The rope untied. Anas said: the Messenger of Allah ﷺ came into the masjid, and a rope was stretched between two
// pillars. He said: what is this? They said: it is Zaynab's; she prays, and when she grows weary or tired, she holds on
// to it. He said: untie it; let one of you pray while fresh, and when weary or tired, let him sit (Sahih Muslim 784a). No
// one is drawn: inside the masjid, under its roof of palm leaves on palm trunks, a rope is stretched between two of its
// trunks over a prayer mat. His place, a golden ring, comes in at the doorway; a soft white ring comes about the rope;
// his voice asks, and the voice of the folk answers. A faint ring shows on the mat, where she prays, and a faint line
// from it up to the rope. His voice speaks: the rope goes, and lies coiled by its trunk. One of the folk goes
// to a mat of its own, and sparks rise from it, quick and bright; then a pale haze comes about it, and it goes to sit in
// the shade, and a warm glow comes about it.
function theRopeUntied(): SignArt {
  const doorway: [number, number] = [142.2, 96.6];
  const his: [number, number] = [118, 103.8];
  const anas: [number, number] = [132, 106.6];
  const herMat: [number, number] = [55, 104.6];
  const folk: [number, number][] = [
    [16, 104.4],
    [22, 106.8]
  ];
  const goer: [number, number] = [31, 105];
  const prays: [number, number] = [84, 102.6];
  const sits: [number, number] = [93.6, 106.6];
  const pebbles = Array.from({ length: 30 }, (_, i) => `<ellipse cx="${n(3 + ((i * 41) % 154))}" cy="${n(100.6 + ((i * 7) % 9) * 1.05)}" rx="0.5" ry="0.3" fill="#CDB384"/>`).join("");
  const goes = (p: [number, number]): [number, number] => [n(p[0] - goer[0]), n(p[1] - goer[1])];
  const away = (from: number, to: number) => track({ opacity: [[from, 1], [to, 0]] });
  return {
    kind: "the-rope-untied",
    ms: 12000,
    parts: [
      ...daySky(126, 60, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([
        [112, 86, 20],
        [134, 85.4, 22],
        [154, 86, 18]
      ]),
      {
        name: "the masjid's wall of mud brick",
        svg:
          `<rect x="0" y="84" width="160" height="15" fill="#D2B98C"/><rect x="0" y="84" width="160" height="1.4" fill="#BFA275"/>` +
          `<path d="M0 89.4 L160 89.4 M0 94.4 L160 94.4" stroke="#BFA275" stroke-width="0.3" opacity="0.6"/>`
      },
      {
        name: "the doorway, the light of the day beyond it",
        svg: `<rect x="138" y="88.6" width="8.4" height="10.4" fill="#F7EBCB"/><path d="M137.6 99 L137.6 88.2 L146.8 88.2 L146.8 99" stroke="#9C7F55" stroke-width="0.8" fill="none"/>`
      },
      { name: "the floor of small pebbles", svg: `<rect x="0" y="99" width="160" height="21" fill="#E6D3A6"/>${pebbles}` },
      { name: "the shade under the roof", svg: `<path d="M8 98 L104 98 L109 108 L6 108 Z" fill="#000000" opacity="0.14"/><rect x="8" y="88.4" width="96" height="10.6" fill="#000000" opacity="0.1"/>` },
      { name: "the roof of palm leaves on palm trunks", svg: roofOnTrunks(10, 100) },
      { name: "a prayer mat under the rope", svg: bigger(herMat[0], herMat[1], 0.7, prayerMat(herMat[0], herMat[1])) },
      { name: "another prayer mat", svg: bigger(prays[0], n(prays[1] + 2.2), 0.7, prayerMat(prays[0], n(prays[1] + 2.2))) },
      {
        name: "a rope stretched between two of the trunks",
        svg: `<path d="M40.8 94.4 Q55 97.4 69.2 94.4" stroke="#8A6A3E" stroke-width="0.7" fill="none" stroke-linecap="round"/><circle cx="40.9" cy="94.4" r="0.7" fill="#8A6A3E"/><circle cx="69.1" cy="94.4" r="0.7" fill="#8A6A3E"/>`,
        keys: away(0.65, 0.68)
      },
      {
        name: "untied: the rope, coiled by its trunk",
        svg: `<ellipse cx="43.6" cy="104.6" rx="2.4" ry="0.9" stroke="#8A6A3E" stroke-width="0.6" fill="none"/><ellipse cx="43.6" cy="103.9" rx="1.8" ry="0.7" stroke="#8A6A3E" stroke-width="0.6" fill="none"/>`,
        keys: showAt(0.66, 0.69)
      },
      { name: "the folk's places, sitting in the shade", svg: folk.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.4) },
      { name: "Anas's voice: he came into the masjid", svg: arcsLeft(n(anas[0] - 1.8), n(anas[1] - 3.2), ITS_VOICE), keys: showFor(0.025, 0.035, 0.08, 0.09), loop: speaking },
      {
        name: "his place, a golden ring, coming in at the doorway",
        svg: ring(his[0], his[1], 2.4, GOLD),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.025, 1]
          ],
          xy: [
            [0.03, n(doorway[0] - his[0]), n(doorway[1] - his[1])],
            [0.085, 0, 0]
          ]
        })
      },
      {
        name: "a soft white ring about the rope",
        svg: care(55, 95.8, 16.6, 3.4, "#FFFFFF"),
        keys: track({
          opacity: [
            [0.15, 0],
            [0.17, 1],
            [0.65, 1],
            [0.68, 0]
          ]
        }),
        loop: soft
      },
      { name: "his voice: what is this", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 3.8), GOLD), keys: showFor(0.27, 0.28, 0.32, 0.33), loop: speaking },
      { name: "the folk's voice: it is Zaynab's", svg: arcs(n(folk[0][0] + 2.2), n(folk[0][1] - 3.4), ITS_VOICE), keys: showFor(0.39, 0.4, 0.56, 0.57), loop: speaking },
      {
        name: "where she prays: a faint ring on the mat",
        svg: faintRing(herMat[0], n(herMat[1] - 2.6), 2.2),
        keys: track({
          opacity: [
            [0.41, 0],
            [0.42, 1],
            [0.65, 1],
            [0.68, 0]
          ]
        })
      },
      {
        name: "when tired, she holds on to it: a faint line from the mat to the rope",
        svg: `<path d="M${herMat[0]} 99.6 L${herMat[0]} 96.6" stroke="#FFFFFF" stroke-width="0.5" stroke-dasharray="0.8 0.7" opacity="0.85"/>`,
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1],
            [0.65, 1],
            [0.68, 0]
          ]
        })
      },
      { name: "his voice: untie it", svg: arcsLeft(n(his[0] - 2.8), n(his[1] - 3.8), GOLD), keys: showFor(0.635, 0.645, 0.69, 0.7), loop: speaking },
      {
        name: "one of you: a place going to pray",
        svg: someone(goer[0], goer[1], 1.4),
        keys: track({
          xy: [
            [0.755, 0, 0],
            [0.775, ...goes(prays)],
            [0.89, ...goes(prays)],
            [0.92, ...goes(sits)]
          ]
        })
      },
      rising("while fresh: a spark rising, quick and bright", n(prays[0] - 1), n(prays[1] - 4.4), 0.78, 0.81, 10),
      rising("and another, quick and bright", n(prays[0] + 1.2), n(prays[1] - 4.4), 0.79, 0.82, 10),
      {
        name: "tired: a pale haze about it",
        svg: wash(prays[0], n(prays[1] - 0.6), 4.6, 3.4, "#B8B2AA", 0.16),
        keys: track({
          opacity: [
            [0.876, 0],
            [0.886, 1],
            [0.9, 1],
            [0.91, 0]
          ]
        })
      },
      { name: "sitting: a warm glow about it", svg: glow(sits[0], n(sits[1] - 0.6), 4.6, WARM, 0.32), keys: showAt(0.93, 0.95), loop: soft }
    ],
    words: [
      { text: "Anas: he came into the masjid,", from: 0.02, to: 0.13 },
      { text: "a rope stretched between two pillars.", from: 0.142, to: 0.252 },
      { text: "He said: what is this?", from: 0.264, to: 0.374 },
      { text: "They said: Zaynab's; she prays,", from: 0.386, to: 0.496 },
      { text: "and when tired, she holds on to it.", from: 0.508, to: 0.618 },
      { text: "He said: untie it.", from: 0.63, to: 0.74 },
      { text: "Let one of you pray while fresh,", from: 0.752, to: 0.862 },
      { text: "and when tired, sit", from: 0.874, to: 1 }
    ]
  };
}

// The doors of mercy. Abu Humayd, or Abu Usayd, said that the Messenger of Allah ﷺ said: when one of you enters the
// masjid, let him say: O Allah, open for me the doors of Your mercy; and when he goes out, let him say: O Allah, I ask
// You of Your bounty (Sahih Muslim 713a). Nothing is drawn for Allah, and no one is drawn: a masjid's wall of mud brick,
// its door shut, and a market's stall beyond it. A place comes to the door, and its voice speaks; the door opens, a
// warm light comes in the doorway, with glints, and the place goes in. It comes out again and goes on to the market;
// its voice speaks there, glints come over the stall, and a soft golden ring comes about it.
function doorsOfMercy(): SignArt {
  const teller: [number, number] = [8, 109];
  const his: [number, number] = [14, 101.8];
  const start: [number, number] = [100, 108.4];
  const door: [number, number] = [57, 102.2];
  const inside: [number, number] = [57, 98.6];
  const market: [number, number] = [121, 105.8];
  const d = (p: [number, number]): [number, number] => [n(p[0] - start[0]), n(p[1] - start[1])];
  const leaf = (x: number) =>
    `<rect x="${x}" y="87.2" width="5" height="12.8" fill="#8A5E36"/><path d="M${n(x + 2.5)} 88 L${n(x + 2.5)} 99.4" stroke="#6E4A2A" stroke-width="0.4"/>` +
    `<path d="M${n(x + 0.6)} 91 L${n(x + 4.4)} 91 M${n(x + 0.6)} 96 L${n(x + 4.4)} 96" stroke="#6E4A2A" stroke-width="0.4"/>`;
  return {
    kind: "doors-of-mercy",
    ms: 10000,
    parts: [
      ...daySky(134, 66, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms(
        [
          [34, 82, 16],
          [80, 82, 18],
          [154, 100, 20]
        ],
        "the masjid"
      ),
      {
        name: "a masjid's wall of mud brick",
        svg:
          `<rect x="24" y="80" width="68" height="20" fill="#D2B98C"/><rect x="23.4" y="79" width="69.2" height="1.6" fill="#BFA275"/>` +
          `<path d="M24 86 L92 86 M24 93 L92 93" stroke="#BFA275" stroke-width="0.3" opacity="0.6"/>`
      },
      { name: "the doorway, dark inside", svg: `<rect x="52" y="87.2" width="10" height="12.8" fill="#4E3C2A"/>` },
      { name: "the doors of mercy: a warm light in the doorway", svg: `<rect x="52" y="87.2" width="10" height="12.8" fill="#FFE7A8"/>${glow(57, 94, 8, WARM, 0.22)}`, keys: showAt(0.52, 0.55), loop: soft },
      { name: "the door's left leaf, opening", svg: leaf(52), origin: { x: 52, y: 93.6 }, keys: track({ scaleX: [[0.38, 1], [0.45, 0.22]] }) },
      { name: "the door's right leaf, opening", svg: leaf(57), origin: { x: 62, y: 93.6 }, keys: track({ scaleX: [[0.38, 1], [0.45, 0.22]] }) },
      { name: "a market's stall", svg: stall(136, 24, "#B8603A", 80, 94) },
      { name: "goods on the stall", svg: jar(129, 94, 0.6) + jar(133.4, 94, 0.6, "#C47E46") + coins(140, 93.6, 2) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "the place of the one who told it, Abu Humayd or Abu Usayd", svg: someone(teller[0], teller[1], 1.4) },
      { name: "the teller's voice: he said", svg: arcs(n(teller[0] + 1.8), n(teller[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      { name: "his voice: when one of you enters the masjid", svg: arcs(n(his[0] + 2.2), n(his[1] - 3), GOLD), keys: showAt(0.1, 0.11), loop: speaking },
      {
        name: "one of you: a place going to the masjid and out to the market",
        svg: someone(start[0], start[1], 1.5),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1],
            [0.59, 1],
            [0.62, 0],
            [0.685, 0],
            [0.695, 1]
          ],
          xy: [
            [0.19, 0, 0],
            [0.29, ...d(door)],
            [0.59, ...d(door)],
            [0.62, ...d(inside)],
            [0.68, ...d(inside)],
            [0.685, ...d(door)],
            [0.7, ...d(door)],
            [0.785, ...d(market)]
          ]
        })
      },
      { name: "its voice: open for me", svg: arcs(n(door[0] + 2), n(door[1] - 3.4), ITS_VOICE), keys: showFor(0.355, 0.365, 0.45, 0.46), loop: speaking },
      {
        name: "glints about the doorway",
        svg: glints(
          [
            [49.4, 89],
            [64.6, 88.4],
            [57, 85]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.56, 0.57),
        loop: twinkle()
      },
      { name: "its voice: I ask of Your bounty", svg: arcs(n(market[0] + 2), n(market[1] - 3.4), ITS_VOICE), keys: showAt(0.85, 0.86), loop: speaking },
      {
        name: "bounty: glints over the stall",
        svg: glints(
          [
            [128, 88.6],
            [136, 87.4],
            [144, 88.8]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.89, 0.9),
        loop: twinkle()
      },
      { name: "a soft golden ring about it", svg: care(market[0], n(market[1] + 0.6), 3.6, 1.6, SOFT_GOLD), keys: showAt(0.92, 0.94), loop: soft }
    ],
    words: [
      { text: "Abu Humayd or Abu Usayd: he said:", from: 0.02, to: 0.17 },
      { text: "When one of you enters the masjid,", from: 0.185, to: 0.335 },
      { text: "let him say: O Allah, open for me", from: 0.35, to: 0.5 },
      { text: "the doors of Your mercy;", from: 0.515, to: 0.665 },
      { text: "and when he goes out, let him say:", from: 0.68, to: 0.83 },
      { text: "O Allah, I ask You of Your bounty", from: 0.845, to: 1 }
    ]
  };
}

// From the home. Aishah said that the Messenger of Allah ﷺ said: when a woman gives of the food of her home, not
// wasting it, she has her reward for what she gave, her husband has his reward for what he earned, and the keeper of
// the store has the same; none of them lessens the reward of another at all (Sahih al-Bukhari 1425). No one is drawn: a
// home with its store of jars and sacks, and three places: the one who gives, by the home; the one who keeps the store,
// by the store; and the one who earned, at the market. A place in need comes to the door; a dish of food goes to it from
// the store, a warm glow comes about it, and a soft white ring about the store, still full. A small light comes by the
// one who gives; the one who earned comes home with a small sack, and a small light comes by it; a small light comes by
// the keeper of the store. Three soft golden rings come about the three, alike, and glints over them all.
function fromTheHome(): SignArt {
  const aishah: [number, number] = [27, 104.6];
  const homeAt: [number, number] = [60, 97];
  const giver: [number, number] = [67.6, 103.8];
  const keeper: [number, number] = [93, 104];
  const earner: [number, number] = [104, 104.2];
  const fromMarket: [number, number] = [146, 104.8];
  const needy: [number, number] = [46, 105.2];
  const needyFrom: [number, number] = [34, 113.4];
  const dish0: [number, number] = [80, 100.2];
  const dishTo: [number, number] = [n(needy[0] + 4.6), 108.2];
  const lightBy = (p: [number, number]) => lightIn(p[0], n(p[1] - 4.2), 3.6);
  return {
    kind: "from-the-home",
    ms: 11000,
    parts: [
      ...daySky(138, 58, 11000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...masjidAtLeft(),
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.4) },
      { name: "Aishah's voice: he said", svg: arcs(n(aishah[0] + 1.8), n(aishah[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      { name: "his voice: when one gives of the home's food", svg: HIS_VOICE, keys: showAt(0.1, 0.11), loop: speaking },
      { name: "the home", svg: home(homeAt[0], homeAt[1], 24, 14) },
      {
        name: "the home's store, its jars and sacks",
        svg:
          `<rect x="72" y="86" width="16" height="11" fill="#C9A273"/><rect x="71.4" y="84.8" width="17.2" height="1.4" fill="#B08A5A"/>` +
          `<rect x="74.2" y="88.4" width="11.6" height="8.6" fill="#5A4530"/>` +
          jar(76.6, 97, 0.7) +
          jar(80.2, 97, 0.7, "#C47E46") +
          sack(84, 97, 0.5)
      },
      { name: "a market's stall", svg: stall(147, 22, "#C27A3C", 80, 94) },
      { name: "the place of the one who gives", svg: someone(giver[0], giver[1], 1.5) },
      { name: "the place of the one who keeps the store", svg: someone(keeper[0], keeper[1], 1.5) },
      {
        name: "a place in need, coming to the door",
        svg: someone(needy[0], needy[1], 1.4),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: [
            [0.04, n(needyFrom[0] - needy[0]), n(needyFrom[1] - needy[1])],
            [0.12, 0, 0]
          ]
        })
      },
      {
        name: "of the home's food: a dish going from the store to the place in need",
        svg: food(dish0[0], dish0[1]),
        keys: track({
          opacity: [
            [0.19, 0],
            [0.2, 1]
          ],
          xy: [
            [0.2, 0, 0],
            [0.27, n(dishTo[0] - dish0[0]), n(dishTo[1] - dish0[1])]
          ]
        })
      },
      { name: "not wasting it: a soft white ring about the store, still full", svg: care(80, 97.6, 9.4, 2.4, "#FFFFFF"), keys: showAt(0.27, 0.285), loop: soft },
      { name: "a warm glow about the place in need", svg: glow(needy[0], n(needy[1] - 0.6), 5, WARM, 0.32), keys: showAt(0.275, 0.29), loop: soft },
      { name: "for what was given: a small light by the one who gives", svg: lightBy(giver), keys: showAt(0.36, 0.38), loop: soft },
      {
        name: "the place of the one who earned, coming home",
        svg: someone(earner[0], earner[1], 1.5),
        keys: track({
          xy: [
            [0.52, n(fromMarket[0] - earner[0]), n(fromMarket[1] - earner[1])],
            [0.6, 0, 0]
          ]
        })
      },
      {
        name: "what it earned: a small sack coming with it",
        svg: sack(n(earner[0] + 3.6), n(earner[1] + 2.4), 0.5),
        keys: track({
          xy: [
            [0.52, n(fromMarket[0] - earner[0]), n(fromMarket[1] - earner[1])],
            [0.6, 0, 0]
          ]
        })
      },
      { name: "for what it earned: a small light by it", svg: lightBy(earner), keys: showAt(0.605, 0.62), loop: soft },
      { name: "the same: a small light by the one who keeps the store", svg: lightBy(keeper), keys: showAt(0.69, 0.71), loop: soft },
      {
        name: "none lessens another's: three soft golden rings, alike",
        svg: [giver, keeper, earner].map(([x, y]) => care(x, n(y + 0.6), 3.4, 1.6, SOFT_GOLD)).join(""),
        keys: showAt(0.85, 0.87),
        loop: soft
      },
      {
        name: "glints over all three",
        svg: glints(
          [
            [giver[0], n(giver[1] - 8.4)],
            [keeper[0], n(keeper[1] - 8.4)],
            [earner[0], n(earner[1] - 8.4)]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Aishah: he said: when a woman gives", from: 0.02, to: 0.17 },
      { text: "of her home's food, not wasting it,", from: 0.185, to: 0.335 },
      { text: "she has her reward for what she gave,", from: 0.35, to: 0.5 },
      { text: "her husband his, for what he earned,", from: 0.515, to: 0.665 },
      { text: "and the keeper of the store the same;", from: 0.68, to: 0.83 },
      { text: "none lessens the reward of another", from: 0.845, to: 1 }
    ]
  };
}

export const THANKFUL_ART = {
  "a-thankful-servant": aThankfulServant,
  "spend-and-replace": spendAndReplace,
  "a-garment-left-spread": aGarmentLeftSpread,
  "cold-and-heat": coldAndHeat,
  "the-rope-untied": theRopeUntied,
  "doors-of-mercy": doorsOfMercy,
  "from-the-home": fromTheHome
};
