import { animalAt, cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { ring, sack, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { kabah } from "./historyArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, wash } from "./worshipArt";
import { care, LIGHT, palms, sparkRising, tent, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor } from "./roadArt";
import { at3 } from "./storyArt";
import { lookLine } from "./truthArt";
import { jar } from "./tradeArt";
import { dish } from "./worthArt";
import { arcsLeft } from "./companionArt";
import { litWindow, NIGHT_OVER_LAND, NIGHT_OVER_SKY, nightLand } from "./heedArt";

/**
 * Open: he said the one who favored him most with his company and wealth was Abu Bakr, that if he were to take a
 * Khalil other than his Lord he would have taken Abu Bakr, and that all the gates of the masjid should be closed except
 * the gate of Abu Bakr. He would accept an invitation even to a meal of a sheep's trotter, and a gift even of an arm or
 * a trotter of a sheep. Al-Abbas asked his permission to stay in Makkah during the nights of Mina, to give the pilgrims
 * water to drink, and he permitted him. The best charity is practiced by one who is well off, and giving starts with
 * one's dependents. He saw the traces of Sufra on Abdur-Rahman, who had married for gold the weight of a datestone, and
 * said: may Allah bless you; offer a wedding banquet even with one sheep. Milk mixed with water was brought to him, a
 * bedouin on his right and Abu Bakr on his left; he drank and gave it to the bedouin: the right, the right. And had the
 * one stung by a scorpion in the night said in the evening, I seek refuge in the Perfect Word of Allah from the evil of
 * what He created, it would not have harmed him. Only the land, the sky, buildings, things, plants and animals are
 * drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face: where someone was, a
 * ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing
 * comes down from the sky: what is good is a light, glints and a soft golden ring, and what was hard a grey haze. No
 * name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number, sunY = 20): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, sunY) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 112], [64, 115], [112, 113], [150, 114]]) => landOf(tufts, fill);

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A picture made `s` times bigger about the point (x, y). */
const bigger = (svg: string, x: number, y: number, s: number) => `<g transform="translate(${n(x * (1 - s))} ${n(y * (1 - s))}) scale(${s})">${svg}</g>`;

/** A picture turned about the upright line through x `cx`. */
const turned = (svg: string, cx: number) => `<g transform="translate(${n(cx * 2)} 0) scale(-1 1)">${svg}</g>`;

/** Keys that hold a part still, then move it by (dx, dy) from `from` to `to`. */
const goes = (from: number, to: number, dx: number, dy: number) => track({ xy: [[from, 0, 0], [to, n(dx), n(dy)]] });

/** A small arched gate in a wall, `w` wide and `h` high, its foot's middle at (x, y). */
const gateway = (x: number, y: number, w = 4.6, h = 8, fill = "#4A3420") =>
  `<path d="M${n(x - w / 2)} ${y} L${n(x - w / 2)} ${n(y - h + w / 2)} Q${x} ${n(y - h - w / 4)} ${n(x + w / 2)} ${n(y - h + w / 2)} L${n(x + w / 2)} ${y} Z" fill="${fill}"/>`;

/** A wooden door shut in the gate at (x, y): its planks and a ring to pull it by. */
const shutDoor = (x: number, y: number, w = 4.6, h = 8) =>
  gateway(x, y, w, h, "#8A5A32") +
  `<path d="M${n(x - w / 6)} ${n(y - h + 1.2)} L${n(x - w / 6)} ${y} M${n(x + w / 6)} ${n(y - h + 1.2)} L${n(x + w / 6)} ${y}" stroke="#6B4423" stroke-width="0.35"/>` +
  `<circle cx="${n(x + w / 3.2)}" cy="${n(y - h / 2.6)}" r="0.4" fill="#3A2614"/>`;

/** The masjid's long wall, from x `x1` to `x2`, its foot at y, `h` high, with its roof of palm fronds. */
const masjidWall = (x1: number, x2: number, y: number, h: number) =>
  `<rect x="${x1}" y="${n(y - h)}" width="${n(x2 - x1)}" height="${h}" fill="#CDAE80"/>` +
  `<path d="M${x1} ${n(y - 0.4)} L${x2} ${n(y - 0.4)}" stroke="#B0915F" stroke-width="0.8"/>` +
  `<path d="M${n(x1 - 2)} ${n(y - h + 0.6)} L${n(x2 + 2)} ${n(y - h + 0.6)} L${n(x2 + 0.6)} ${n(y - h - 3.4)} L${n(x1 - 0.6)} ${n(y - h - 3.4)} Z" fill="#6E8F3A"/>` +
  Array.from({ length: Math.floor((x2 - x1) / 6) }, (_, i) => {
    const fx = x1 + 2 + i * 6;
    return `<path d="M${fx} ${n(y - h - 1)} L${n(fx + 4)} ${n(y - h - 2.6)}" stroke="#56742B" stroke-width="0.6"/>`;
  }).join("");

// The gate of Abu Bakr. Abu Sa'id al-Khudri said: the Messenger of Allah ﷺ addressed the people, and said: the person
// who has favored me most of all, both with his company and wealth, is Abu Bakr. If I were to take a Khalil other than
// my Lord, I would have taken Abu Bakr as such, but it is the Islamic brotherhood and friendliness. All the gates of the
// masjid should be closed except the gate of Abu Bakr (Sahih al-Bukhari 3654). No one is drawn: in the masjid of
// Madinah, his place, a golden ring, before the places sitting there, and Abu Bakr's place by his own gate. Along the
// masjid's wall are the small gates of the homes about it. Abu Sa'id's voice speaks, then his. A faint golden line goes
// from his place to Abu Bakr's, for his company, and glints come over a small sack by Abu Bakr's place, for his
// wealth; a warm light, then a soft golden ring, come about Abu Bakr's place. One by one the gates are shut with
// wooden doors, all but Abu Bakr's, which stays open with a warm light in it.
function theGateOfAbuBakr(): SignArt {
  const his: [number, number] = [34, 104];
  const abuBakr: [number, number] = [92, 102.6];
  const gates = [24, 46, 68, 92, 114, 136];
  const shutAt = [0.67, 0.69, 0.71, 0, 0.79, 0.81];
  const wallFoot = 94;
  return {
    kind: "the-gate-of-abu-bakr",
    ms: 12000,
    parts: [
      ...daySky(140, 30, 12000, 16),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 116], [150, 117]]) },
      ...palms([
        [6, 74, 18],
        [154, 73, 17]
      ]),
      { name: "the homes about the masjid", svg: gates.map((x) => home(x, 74, 14, 9)).join("") },
      { name: "the masjid's wall, with its roof of palm fronds", svg: masjidWall(12, 148, wallFoot, 18) },
      { name: "the small gates of the homes, open into the masjid", svg: gates.map((x) => gateway(x, wallFoot)).join("") },
      { name: "the masjid's floor", svg: `<rect x="12" y="${wallFoot}" width="136" height="${120 - wallFoot}" fill="#E9D5AA"/>` },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      {
        name: "places sitting in the masjid",
        svg: (
          [
            [52, 107],
            [62, 107.4],
            [72, 107],
            [82, 107.4],
            [104, 107.4],
            [114, 107],
            [124, 107.4],
            [134, 107],
            [57, 113],
            [67, 113.4],
            [77, 113],
            [87, 113.4],
            [97, 113],
            [107, 113.4],
            [117, 113],
            [137, 113.4]
          ] as [number, number][]
        )
          .map(([x, y]) => someone(x, y, 1.4))
          .join("")
      },
      { name: "Abu Sa'id's place", svg: someone(127, 113, 1.4, LIGHT) },
      { name: "Abu Sa'id's voice: he addressed them", svg: arcs(129.6, 109.6, ITS_VOICE), keys: showFor(0.03, 0.04, 0.075, 0.085), loop: speaking },
      { name: "Abu Bakr's place, by the gate of Abu Bakr", svg: someone(abuBakr[0], abuBakr[1], 1.6) },
      { name: "his voice: he addressed them", svg: arcs(36.6, 100.6, GOLD), keys: showFor(0.14, 0.15, 0.95, 0.96), loop: speaking },
      { name: "with his company: a faint golden line from his place to Abu Bakr's", svg: lookLine(36.6, 103, n(abuBakr[0] - 2), n(abuBakr[1] + 0.4), 92, SOFT_GOLD), keys: showAt(0.28, 0.31) },
      { name: "and wealth: a small sack by Abu Bakr's place", svg: sack(n(abuBakr[0] + 4.6), 106.4, 0.5), keys: showAt(0.3, 0.32) },
      {
        name: "glints over the small sack",
        svg: glints([
          [n(abuBakr[0] + 3.4), 101.6],
          [n(abuBakr[0] + 6.2), 102.4]
        ]),
        keys: showAt(0.32, 0.34),
        loop: twinkle()
      },
      { name: "the one who favored him most: a warm light about Abu Bakr's place", svg: wash(abuBakr[0], abuBakr[1], 7, 3, "#FFE9B0", 0.22), keys: showAt(0.33, 0.355), loop: soft },
      { name: "I would have taken Abu Bakr: a soft golden ring about Abu Bakr's place", svg: care(abuBakr[0], n(abuBakr[1] + 0.4), 4.6, 2.2, GOLD), keys: showAt(0.545, 0.58), loop: soft },
      ...gates.flatMap((x, i): SignPart[] =>
        i === 3 ? [] : [{ name: `should be closed: the door of gate ${i < 3 ? i + 1 : i}`, svg: shutDoor(x, wallFoot), keys: showAt(shutAt[i], at3(shutAt[i] + 0.012)) }]
      ),
      { name: "except the gate of Abu Bakr: a warm light in it", svg: glow(abuBakr[0], 89, 5.4, "#FFE7A0", 0.32), keys: showAt(0.9, 0.93), loop: soft },
      {
        name: "glints about the open gate",
        svg: glints([
          [n(abuBakr[0] - 4), 86],
          [n(abuBakr[0] + 4.2), 87]
        ]),
        keys: showAt(0.92, 0.95),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abu Sa'id: he addressed the people:", from: 0.02, to: 0.125 },
      { text: "The person who has favored me most of all", from: 0.137, to: 0.262 },
      { text: "with his company and wealth, is Abu Bakr.", from: 0.274, to: 0.399 },
      { text: "If I were to take a Khalil other than", from: 0.411, to: 0.526 },
      { text: "my Lord, I would have taken Abu Bakr.", from: 0.538, to: 0.653 },
      { text: "All the gates of the masjid", from: 0.665, to: 0.77 },
      { text: "should be closed", from: 0.782, to: 0.887 },
      { text: "except the gate of Abu Bakr.", from: 0.895, to: 1 }
    ]
  };
}

/** A sheep's trotter, cooked, lying with its small hoof to the right, its middle at (x, y). */
const trotter = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y - 0.55)} L${n(x + 1.4)} ${n(y - 0.45)} L${n(x + 1.4)} ${n(y + 0.5)} L${n(x - 2.4)} ${n(y + 0.6)} Z" fill="#B07A4A"/>` +
  `<path d="M${n(x + 1.4)} ${n(y - 0.75)} L${n(x + 2.7)} ${n(y - 0.25)} L${n(x + 2.7)} ${n(y + 0.25)} L${n(x + 1.4)} ${n(y + 0.75)} Z" fill="#3E2E22"/>` +
  `<path d="M${n(x + 1.5)} ${y} L${n(x + 2.7)} ${y}" stroke="#B07A4A" stroke-width="0.25"/>` +
  `<ellipse cx="${n(x - 2.4)}" cy="${n(y + 0.05)}" rx="0.45" ry="0.62" fill="#F1E6D0"/>`;

/** A sheep's foreleg, cooked: its meat, and its bone's end to the right, its middle at (x, y). */
const foreleg = (x: number, y: number) =>
  `<path d="M${n(x - 3.6)} ${n(y + 0.4)} Q${n(x - 3.4)} ${n(y - 2.2)} ${n(x - 0.6)} ${n(y - 1.6)} L${n(x + 2.4)} ${n(y - 0.5)} L${n(x + 2.4)} ${n(y + 0.5)} L${n(x - 0.6)} ${n(y + 1.4)} Q${n(x - 3)} ${n(y + 2)} ${n(x - 3.6)} ${n(y + 0.4)} Z" fill="#A8683C"/>` +
  `<path d="M${n(x + 2.4)} ${n(y - 0.35)} L${n(x + 4)} ${n(y - 0.3)} L${n(x + 4)} ${n(y + 0.3)} L${n(x + 2.4)} ${n(y + 0.35)} Z" fill="#F1E6D0"/>` +
  `<circle cx="${n(x + 4.1)}" cy="${y}" r="0.55" fill="#F1E6D0"/>`;

/** A gift wrapped in a cloth, tied at the top, its foot's middle at (x, y). */
const bundle = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${y} Q${n(x - 3.4)} ${n(y - 3)} ${n(x - 0.8)} ${n(y - 3.6)} L${n(x + 0.8)} ${n(y - 3.6)} Q${n(x + 3.4)} ${n(y - 3)} ${n(x + 3)} ${y} Z" fill="#9FB7C9"/>` +
  `<path d="M${n(x - 0.8)} ${n(y - 3.6)} L${n(x - 1.4)} ${n(y - 4.8)} M${n(x + 0.8)} ${n(y - 3.6)} L${n(x + 1.4)} ${n(y - 4.8)}" stroke="#7F98AC" stroke-width="0.6" stroke-linecap="round"/>`;

/** The cloth of the gift, spread open on the ground about (x, y). */
const clothSpread = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="1.5" fill="#9FB7C9"/><ellipse cx="${x}" cy="${n(y - 0.2)}" rx="4.6" ry="1" fill="#B3C8D7"/>`;

// Even a trotter. Abu Hurairah said: the Prophet ﷺ said: I shall accept the invitation even if I were invited to a
// meal of a sheep's trotter, and I shall accept the gift even if it were an arm or a trotter of a sheep (Sahih
// al-Bukhari 2568). No one is drawn: his home and his place, a golden ring, and a small, plain home along a dashed way.
// Abu Hurairah's voice speaks, then his. The voice of the small home's place calls, and the way to it lights up; his
// place goes along it to the small home, and a dish with a sheep's trotter on it shows by its door, with glints. Then a
// place comes from the far side with a gift wrapped in a cloth; the cloth opens with a sheep's foreleg on it, and then
// a trotter in its place. A warm light comes about his place, and a soft golden ring about the gift.
function evenATrotter(): SignArt {
  const start: [number, number] = [44, 106.4];
  const there: [number, number] = [91, 105.6];
  const giver: [number, number] = [142, 108];
  const gift: [number, number] = [127, 111.6];
  const dishAt: [number, number] = [103, 110];
  return {
    kind: "even-a-trotter",
    ms: 10000,
    parts: [
      ...daySky(30, 70, 10000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [62, 117], [154, 116]]) },
      ...palms([
        [150, 100, 24],
        [6, 98, 22]
      ]),
      { name: "his home", svg: home(26, 100, 26, 18) },
      { name: "a small, plain home", svg: home(104, 98, 16, 11, "#C9A27A", "#B08A62", "#5E4128") },
      { name: "the small home's place, by its door", svg: someone(115, 104.4, 1.5) },
      { name: "the way to the small home", svg: way(`M${n(start[0] + 2)} ${n(start[1] + 0.8)} Q68 110 ${n(there[0] - 2)} ${n(there[1] + 0.8)}`, "#EFE2C4") },
      { name: "the invitation: the way lit", svg: way(`M${n(start[0] + 2)} ${n(start[1] + 0.8)} Q68 110 ${n(there[0] - 2)} ${n(there[1] + 0.8)}`, "#FFE7A0"), keys: showAt(0.17, 0.21) },
      { name: "Abu Hurairah's place", svg: someone(14, 109, 1.4, LIGHT) },
      { name: "Abu Hurairah's voice: he said", svg: arcs(16.6, 105.6, ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      { name: "the small home's voice: an invitation", svg: arcsLeft(112.4, 101, ITS_VOICE), keys: showFor(0.155, 0.165, 0.22, 0.23), loop: speaking },
      {
        name: "his place, a golden ring, going to the small home",
        svg: ring(start[0], start[1], 2.4, GOLD),
        keys: goes(0.29, 0.35, there[0] - start[0], there[1] - start[1])
      },
      { name: "his voice: I shall accept", svg: arcs(n(start[0] + 2.6), n(start[1] - 3.4), GOLD), keys: track({ opacity: [[0.15, 0], [0.16, 1]], xy: [[0.29, 0, 0], [0.35, n(there[0] - start[0]), n(there[1] - start[1])]] }), loop: speaking },
      { name: "a meal of a sheep's trotter: a dish by the small home's door", svg: bigger(dish(dishAt[0], dishAt[1]) + trotter(dishAt[0], n(dishAt[1] - 1.6)), dishAt[0], dishAt[1], 1.9), keys: showAt(0.415, 0.45) },
      {
        name: "glints over the dish",
        svg: glints([
          [n(dishAt[0] - 5.4), n(dishAt[1] - 6)],
          [n(dishAt[0] + 5.6), n(dishAt[1] - 5.4)]
        ]),
        keys: showAt(0.46, 0.49),
        loop: twinkle()
      },
      { name: "a place coming with a gift", svg: someone(giver[0], giver[1], 1.5), keys: track({ opacity: [[0.555, 0], [0.565, 1]], xy: [[0.555, 30, 0], [0.62, 0, 0]] }) },
      {
        name: "the gift, wrapped in a cloth",
        svg: bigger(bundle(gift[0], gift[1]), gift[0], gift[1], 1.8),
        keys: track({
          opacity: [
            [0.555, 0],
            [0.565, 1],
            [0.695, 1],
            [0.705, 0]
          ],
          xy: [
            [0.555, 30, 0],
            [0.62, 0, 0]
          ]
        })
      },
      { name: "the gift's cloth, spread open", svg: bigger(clothSpread(gift[0], gift[1]), gift[0], gift[1], 1.8), keys: showAt(0.695, 0.705) },
      { name: "even if it were a sheep's foreleg, on the cloth", svg: bigger(foreleg(n(gift[0] - 0.4), n(gift[1] - 0.8)), gift[0], gift[1], 1.8), keys: showFor(0.7, 0.73, 0.82, 0.85) },
      { name: "or a trotter of a sheep, on the cloth", svg: bigger(trotter(gift[0], n(gift[1] - 0.8)), gift[0], gift[1], 1.8), keys: showAt(0.82, 0.85) },
      { name: "accepted: a warm light about his place", svg: wash(there[0], there[1], 7, 3, "#FFE9B0", 0.22), keys: showAt(0.86, 0.9), loop: soft },
      { name: "a soft golden ring about the gift", svg: care(gift[0], n(gift[1] + 0.2), 12.4, 3.6, GOLD), keys: showAt(0.9, 0.94), loop: soft }
    ],
    words: [
      { text: "Abu Hurairah: he said:", from: 0.02, to: 0.13 },
      { text: "I shall accept the invitation", from: 0.145, to: 0.27 },
      { text: "even if I were invited", from: 0.285, to: 0.395 },
      { text: "to a meal of a sheep's trotter,", from: 0.41, to: 0.535 },
      { text: "and I shall accept the gift", from: 0.55, to: 0.675 },
      { text: "even if it were an arm", from: 0.69, to: 0.8 },
      { text: "or a trotter of a sheep.", from: 0.815, to: 1 }
    ]
  };
}

/** The moon nearly full, as on the nights after the tenth of the month: a round of light, a thin shade on its left, a glow. */
const moonNearlyFull = (x: number, y: number, r: number) =>
  glow(x, y, n(r * 2.2), "#FFF3B8", 0.06) +
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF3B8"/>` +
  `<path d="M${x} ${n(y - r)} A${r} ${r} 0 0 0 ${x} ${n(y + r)} A${n(r * 0.72)} ${r} 0 0 1 ${x} ${n(y - r)} Z" fill="#16284C" opacity="0.7"/>`;

/** A small cup of water, its foot's middle at (x, y). */
const cup = (x: number, y: number) =>
  `<path d="M${n(x - 1.2)} ${n(y - 2)} L${n(x + 1.2)} ${n(y - 2)} L${n(x + 0.9)} ${y} L${n(x - 0.9)} ${y} Z" fill="#B98A58"/><ellipse cx="${x}" cy="${n(y - 2)}" rx="1.2" ry="0.35" fill="#8FC6E8"/>`;

// Water for the pilgrims. Ibn Umar said: Al-Abbas ibn Abdul-Muttalib asked the permission of the Messenger of Allah ﷺ
// to stay in Makkah during the nights of Mina, in order to provide the pilgrims with water to drink, and he permitted
// him (Sahih al-Bukhari 1634). No one is drawn: at night, Makkah and the House on one side, with jars of water by it,
// and on the other the valley of Mina, its tents among the hills, his place, a golden ring, and the places of the
// pilgrims. Ibn Umar's voice speaks; then Al-Abbas's voice asks, from his place by his. The tents of Mina are lit in the
// night. Some pilgrims' places go along the way to the House; glints come over the jars, and cups of water go from them
// to the pilgrims' places, with a warm light. His voice speaks, and Al-Abbas's place goes to the jars by the House, with
// a warm light about it.
function waterForThePilgrims(): SignArt {
  const his: [number, number] = [124, 109.4];
  const abbas: [number, number] = [110, 110.4];
  const atJars: [number, number] = [56, 109.2];
  const jars: [number, number][] = [
    [46, 107.4],
    [51, 108],
    [61, 107.6]
  ];
  const goers: [number, number][] = [
    [100, 112.4],
    [106, 114],
    [112, 112.6]
  ];
  const arrive: [number, number][] = [
    [66, 113.4],
    [72, 114.6],
    [78, 113.2]
  ];
  const tents: [number, number, number, number][] = [
    [100, 101, 9, 6],
    [114, 99, 10, 7],
    [130, 100.4, 9, 6],
    [146, 99.6, 10, 6.6],
    [137, 106, 8, 5]
  ];
  return {
    kind: "water-for-the-pilgrims",
    ms: 9000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [10, 12],
          [26, 34],
          [48, 16],
          [70, 40],
          [96, 10],
          [112, 32],
          [140, 14],
          [152, 40]
        ]),
        loop: { move: "twinkle", ms: 2400, low: 0.5 }
      },
      { name: "the moon of the nights of Mina, nearly full", svg: moonNearlyFull(84, 20, 4.2) },
      { name: "the hills about Makkah and Mina", svg: hills("#3A466E") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [20, 114],
          [90, 116],
          [150, 115]
        ])
      },
      { name: "the homes of Makkah", svg: home(12, 96, 10, 7, "#8E7A66", "#7A6855", "#2A2238") + home(76, 95, 10, 7, "#8E7A66", "#7A6855", "#2A2238") },
      { name: "a home's window, lit", svg: litWindow(76, 95, 7) },
      { name: "the Ka'bah, the House", svg: kabah(24, 104, 14) },
      { name: "the water of Al-Abbas: jars by the House", svg: jars.map(([x, y]) => jar(x, y, 0.9, "#9A6A44")).join("") },
      { name: "the way between Mina and Makkah", svg: way("M100 112 Q86 116 66 112", "#5A6488") },
      { name: "the tents of Mina", svg: tents.map(([x, y, w, h]) => tent(x, y, w, h, "#C9BFA8")).join("") },
      { name: "the nights of Mina: the tents lit", svg: tents.map(([x, y, , h]) => glow(x, n(y - h * 0.25), 2.4, "#FFD98A", 0.28)).join(""), keys: showAt(0.35, 0.4), loop: soft },
      {
        name: "the pilgrims' places in Mina",
        svg: (
          [
            [96, 105.6],
            [122, 104.4],
            [148, 106],
            [142, 112.4]
          ] as [number, number][]
        )
          .map(([x, y]) => someone(x, y, 1.3, LIGHT))
          .join("")
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Ibn Umar's place", svg: someone(150, 114.4, 1.3, LIGHT) },
      { name: "Ibn Umar's voice: Al-Abbas asked", svg: arcsLeft(147.4, 111, LIGHT), keys: showFor(0.03, 0.04, 0.11, 0.12), loop: speaking },
      {
        name: "Al-Abbas's place",
        svg: someone(abbas[0], abbas[1], 1.6, LIGHT),
        keys: goes(0.86, 0.93, atJars[0] - abbas[0], atJars[1] - abbas[1])
      },
      { name: "Al-Abbas's voice: Al-Abbas asked his permission", svg: arcs(n(abbas[0] + 2.6), n(abbas[1] - 3.4), LIGHT), keys: showFor(0.18, 0.19, 0.28, 0.29), loop: speaking },
      ...goers.map(
        ([x, y], i): SignPart => ({
          name: `a pilgrim's place, going to the House ${i + 1}`,
          svg: someone(x, y, 1.3, LIGHT),
          keys: goes(at3(0.51 + 0.01 * i), at3(0.57 + 0.01 * i), arrive[i][0] - x, arrive[i][1] - y)
        })
      ),
      {
        name: "water to drink: glints over the jars",
        svg: glints(jars.map(([x, y]) => [x, n(y - 9.6)] as [number, number])),
        keys: showAt(0.66, 0.68),
        loop: twinkle()
      },
      ...arrive.map(([x, y], i): SignPart => {
        const [jx, jy] = jars[i];
        return {
          name: `a cup of water going to a pilgrim's place ${i + 1}`,
          svg: cup(jx, n(jy + 1.6)),
          keys: track({
            opacity: [
              [at3(0.67 + 0.01 * i), 0],
              [at3(0.675 + 0.01 * i), 1]
            ],
            xy: [
              [at3(0.675 + 0.01 * i), 0, 0],
              [at3(0.715 + 0.01 * i), n(x + 2.6 - jx), n(y - 0.4 - jy - 1.6)]
            ]
          })
        };
      }),
      { name: "a warm light about the pilgrims' places", svg: wash(72, 114, 12, 3.4, "#FFE9B0", 0.2), keys: showAt(0.72, 0.75), loop: soft },
      { name: "his voice: he permitted Al-Abbas", svg: turned(arcs(n(his[0] - 2.6), n(his[1] - 3.4), GOLD), n(his[0] - 2.6)), keys: showFor(0.81, 0.82, 0.86, 0.87), loop: speaking },
      { name: "to stay in Makkah: a warm light about Al-Abbas's place by the jars", svg: wash(atJars[0], atJars[1], 7, 3, "#FFE9B0", 0.24), keys: showAt(0.93, 0.955), loop: soft }
    ],
    words: [
      { text: "Ibn Umar: Al-Abbas ibn Abdul-Muttalib", from: 0.02, to: 0.16 },
      { text: "asked his permission to stay in Makkah", from: 0.175, to: 0.33 },
      { text: "during the nights of Mina", from: 0.345, to: 0.49 },
      { text: "in order to provide the pilgrims", from: 0.505, to: 0.64 },
      { text: "with water to drink,", from: 0.655, to: 0.79 },
      { text: "so he permitted Al-Abbas.", from: 0.805, to: 1 }
    ]
  };
}

/** A heap of dates: a low mound `w` wide and `h` high, its foot's middle at (x, y), with rows of dates over it. */
const dateHeap = (x: number, y: number, w: number, h: number) => {
  let out =
    `<ellipse cx="${n(x + 0.8)}" cy="${n(y + 0.4)}" rx="${n(w / 2 + 1)}" ry="1.4" fill="#000000" opacity="0.1"/>` +
    `<path d="M${n(x - w / 2)} ${y} Q${x} ${n(y - 2 * h)} ${n(x + w / 2)} ${y} Z" fill="#7A3C1A"/>`;
  [0.16, 0.42, 0.66, 0.86].forEach((f, row) => {
    const half = (w / 2) * Math.sqrt(1 - f) * 0.8;
    const count = Math.max(1, Math.round((half * 2) / 2.8));
    for (let i = 0; i < count; i += 1) {
      const dx = count === 1 ? 0 : -half + (2 * half * i) / (count - 1);
      const dy = -f * h + (i % 2 ? 0.3 : -0.2);
      out += `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="1" ry="0.62" fill="${(row + i) % 2 ? "#5A2810" : "#9C5428"}"/>`;
    }
  });
  return out;
};

/** A measure of wood heaped with dates, its foot's middle at (x, y). */
const measure = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} L${n(x - 2.1)} ${n(y - 2.8)} L${n(x + 2.1)} ${n(y - 2.8)} L${n(x + 1.6)} ${y} Z" fill="#A87444"/>` +
  `<path d="M${n(x - 2.1)} ${n(y - 2.8)} Q${x} ${n(y - 4.8)} ${n(x + 2.1)} ${n(y - 2.8)} Z" fill="#6E3418"/>` +
  `<path d="M${n(x - 1.9)} ${n(y - 1.3)} L${n(x + 1.9)} ${n(y - 1.3)}" stroke="#86552C" stroke-width="0.35"/>`;

// Start with your dependents. Abu Hurairah said: the Prophet ﷺ said: the best charity is that which is practiced by a
// wealthy person; and start giving first to your dependents (Sahih al-Bukhari 1426). No one is drawn: his place, a
// golden ring, and Abu Hurairah's place; a home with plenty by it, a heap of dates and full jars, the places of the
// home's own, its dependents, in its yard, and further off two places in need, a grey ring about each. Abu
// Hurairah's voice speaks, then his. A soft golden ring comes about the heap; glints come over the heap and the jars,
// and a warm light about the home. Then measures of dates go first to the home's own places, a warm light about them,
// and then to the places in need, whose grey rings go; and glints show over the heap, still plenty.
function startWithYourDependents(): SignArt {
  const heap: [number, number] = [64, 108];
  const own: [number, number][] = [
    [74, 112.6],
    [81, 113.6],
    [88, 112.4]
  ];
  const need: [number, number][] = [
    [128, 108.4],
    [142, 110.6]
  ];
  const from: [number, number] = [70, 107];
  const measured = (to: [number, number], start: number, name: string): SignPart => {
    const [dx, dy] = [n(to[0] + 3 - from[0]), n(to[1] + 1.8 - from[1])];
    return {
      name,
      svg: measure(from[0], from[1]),
      keys: track({
        opacity: [
          [start, 0],
          [at3(start + 0.006), 1]
        ],
        xy: [
          [at3(start + 0.006), 0, 0],
          [at3(start + 0.02), n(dx / 2), n(dy / 2 - 6)],
          [at3(start + 0.034), dx, dy]
        ]
      })
    };
  };
  return {
    kind: "start-with-your-dependents",
    ms: 8000,
    parts: [
      ...daySky(132, 30, 8000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [112, 116], [152, 117]]) },
      ...palms([
        [104, 96, 22],
        [154, 98, 20]
      ]),
      { name: "the home with plenty", svg: home(80, 101, 30, 20) },
      { name: "a heap of dates by the home", svg: dateHeap(heap[0], heap[1], 14, 5.4) },
      { name: "full jars by the home", svg: jar(96, 108.4, 1.1) + jar(101.6, 109, 1) },
      { name: "your dependents: the home's own places in its yard", svg: own.map(([x, y]) => someone(x, y, 1.3)).join("") },
      { name: "places in need, further off", svg: need.map(([x, y]) => someone(x, y, 1.5)).join("") },
      ...need.map(([x, y], i): SignPart => ({ name: `in need: a grey ring about place ${i + 1}`, svg: greyRing(x, y, 3.4, 1.8), keys: track({ opacity: [[0, 1], [at3(0.86 + 0.03 * i), 1], [at3(0.89 + 0.03 * i), 0]] }) })),
      { name: "his place, a golden ring", svg: ring(20, 108.6, 2.4, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(33, 111, 1.4, LIGHT) },
      { name: "Abu Hurairah's voice: he said", svg: arcs(35.6, 107.6, ITS_VOICE), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      { name: "his voice: the best charity", svg: arcs(22.6, 105.2, GOLD), keys: showFor(0.19, 0.2, 0.95, 0.96), loop: speaking },
      { name: "the best charity: a soft golden ring about the heap", svg: care(heap[0], n(heap[1] + 0.2), 9.6, 2.6, GOLD), keys: showAt(0.25, 0.3), loop: soft },
      {
        name: "plenty: glints over the heap and the jars",
        svg: glints([
          [n(heap[0] - 3), n(heap[1] - 8)],
          [n(heap[0] + 3.6), n(heap[1] - 7)],
          [97, 97.6],
          [103, 98.6]
        ]),
        keys: showAt(0.43, 0.47),
        loop: twinkle()
      },
      { name: "a warm light about the home with plenty", svg: wash(80, 96, 18, 8, "#FFE9B0", 0.16), keys: showAt(0.48, 0.53), loop: soft },
      ...own.map((to, i) => measured(to, at3(0.66 + 0.03 * i), `start first: a measure of dates to the home's own ${i + 1}`)),
      { name: "a warm light about the home's own", svg: wash(81, 113, 11, 3, "#FFE9B0", 0.24), keys: showAt(0.75, 0.79), loop: soft },
      ...need.map((to, i) => measured(to, at3(0.8 + 0.03 * i), `then a measure of dates to a place in need ${i + 1}`)),
      {
        name: "still plenty: glints over the heap",
        svg: glints([
          [n(heap[0] - 2), n(heap[1] - 9)],
          [n(heap[0] + 2.4), n(heap[1] - 9.6)]
        ]),
        keys: showAt(0.91, 0.94),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abu Hurairah reported: he said:", from: 0.02, to: 0.17 },
      { text: "The best charity is that which", from: 0.19, to: 0.4 },
      { text: "is practiced by a wealthy person.", from: 0.42, to: 0.63 },
      { text: "And start giving first to your dependents.", from: 0.65, to: 1 }
    ]
  };
}

/** A balance: its post on a foot at (x, y), its beam level, and two pans hanging from it. */
const balance = (x: number, y: number) =>
  `<path d="M${n(x - 3)} ${y} L${n(x + 3)} ${y}" stroke="#7A5A3A" stroke-width="0.9" stroke-linecap="round"/>` +
  `<path d="M${x} ${y} L${x} ${n(y - 11)}" stroke="#7A5A3A" stroke-width="0.7"/>` +
  `<path d="M${n(x - 8)} ${n(y - 11)} L${n(x + 8)} ${n(y - 11)}" stroke="#7A5A3A" stroke-width="0.7" stroke-linecap="round"/>` +
  [-1, 1]
    .map((side) => {
      const px = n(x + side * 7.4);
      return `<path d="M${px} ${n(y - 11)} L${n(px - 2.2)} ${n(y - 6.4)} M${px} ${n(y - 11)} L${n(px + 2.2)} ${n(y - 6.4)}" stroke="#9C7A52" stroke-width="0.3"/><path d="M${n(px - 2.6)} ${n(y - 6.4)} Q${px} ${n(y - 4.6)} ${n(px + 2.6)} ${n(y - 6.4)} Z" fill="#B8864A"/>`;
    })
    .join("");

/** A datestone, its middle at (x, y). */
const datestone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.45" fill="#8A6A48"/><path d="M${n(x - 0.6)} ${y} L${n(x + 0.6)} ${y}" stroke="#5E4428" stroke-width="0.2"/>`;

/** A small piece of gold, its middle at (x, y). */
const goldPiece = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.45" fill="#E8B830"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.12)}" rx="0.35" ry="0.15" fill="#FFF0B0"/>`;

/** The traces of Sufra, the yellow scent: small yellow dots about (x, y). */
const sufra = (x: number, y: number) =>
  (
    [
      [-2.6, -1.4],
      [2.4, -1.6],
      [-1.4, 1.6],
      [2.2, 1.2],
      [0.2, -2.4]
    ] as [number, number][]
  )
    .map(([dx, dy]) => `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="0.62" fill="#F2C230"/>`)
    .join("") + `<ellipse cx="${x}" cy="${y}" rx="3.8" ry="2.8" fill="#F2C230" opacity="0.16"/>`;

/** A dish of a wedding banquet: bread and meat heaped on a wide dish, its middle at (x, y). */
const banquet = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${n(y - 1)} Q${x} ${n(y + 2.6)} ${n(x + 6)} ${n(y - 1)} Z" fill="#B8864A"/>` +
  `<path d="M${n(x - 4.6)} ${n(y - 1)} Q${x} ${n(y - 4.6)} ${n(x + 4.6)} ${n(y - 1)} Z" fill="#E3C48A"/>` +
  `<ellipse cx="${n(x - 1.4)}" cy="${n(y - 2.4)}" rx="1.4" ry="0.8" fill="#A8683C"/><ellipse cx="${n(x + 1.6)}" cy="${n(y - 2.2)}" rx="1.3" ry="0.7" fill="#9A5C34"/>`;

// Even with one sheep. Anas said: the Prophet ﷺ saw the traces of Sufra on Abdur-Rahman ibn Awf and said: what is
// this? Abdur-Rahman said: I have married a woman and have paid gold equal to the weight of a datestone. He said to
// him: may Allah bless you: offer a wedding banquet even with one sheep (Sahih al-Bukhari 5155; and 5167). No one is
// drawn: by the homes of Madinah, his place, a golden ring, Anas's place, and Abdur-Rahman's place. Anas's voice
// speaks, and small yellow dots come about Abdur-Rahman's place, the traces of Sufra; a faint line goes from his place
// to Abdur-Rahman's, and his voice asks. Abdur-Rahman's voice answers; a new home's window glows warm; a balance shows, a datestone in one pan and
// a small piece of gold in the other, level, and glints come over the gold. His voice speaks: a warm light comes about
// Abdur-Rahman's place, and sparks rise from it. A dish of a wedding banquet shows by the new home, places come to it,
// one sheep comes and grazes by the home, and a soft golden ring comes about the banquet.
function evenWithOneSheep(): SignArt {
  const his: [number, number] = [40, 106];
  const abdurRahman: [number, number] = [62, 107.4];
  const scale: [number, number] = [86, 112];
  const feast: [number, number] = [118, 110.6];
  const guests: [number, number][] = [
    [101, 113.8],
    [135, 114],
    [143, 110.6]
  ];
  const pan = [n(7.4 * 1.4), n(6.8 * 1.4)];
  return {
    kind: "even-with-one-sheep",
    ms: 12000,
    parts: [
      ...daySky(30, 90, 12000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [96, 117], [152, 117]]) },
      ...palms([
        [6, 98, 22],
        [154, 97, 22]
      ]),
      { name: "homes of Madinah, far off", svg: home(22, 86, 12, 8) + home(44, 84.6, 10, 7) + home(70, 86.4, 11, 7.4) },
      { name: "the new home", svg: home(120, 100, 22, 15) },
      { name: "I have married: the new home's window, warm", svg: glow(124.3, 88.9, 3.2, "#FFE7A0", 0.34), keys: showAt(0.29, 0.33), loop: soft },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Anas's place", svg: someone(22, 110.4, 1.4, LIGHT) },
      { name: "Anas's voice: he saw", svg: arcs(24.6, 107, ITS_VOICE), keys: showFor(0.03, 0.04, 0.075, 0.085), loop: speaking },
      { name: "Abdur-Rahman's place", svg: someone(abdurRahman[0], abdurRahman[1], 1.6) },
      { name: "the traces of Sufra: small yellow dots about Abdur-Rahman's place", svg: sufra(abdurRahman[0], abdurRahman[1]), keys: showAt(0.03, 0.05), loop: twinkle(1600) },
      { name: "he saw: a faint line from his place to Abdur-Rahman's", svg: lookLine(42.4, 105, n(abdurRahman[0] - 2), n(abdurRahman[1] - 1), 98, SOFT_GOLD), keys: showFor(0.04, 0.07, 0.21, 0.22) },
      { name: "his voice: what is this?", svg: arcs(42.6, 102.6, GOLD), keys: showFor(0.14, 0.15, 0.21, 0.22), loop: speaking },
      { name: "Abdur-Rahman's voice: I have married", svg: arcs(n(abdurRahman[0] + 2.6), n(abdurRahman[1] - 3.4), ITS_VOICE), keys: showFor(0.28, 0.29, 0.58, 0.59), loop: speaking },
      { name: "a balance", svg: bigger(balance(scale[0], scale[1]), scale[0], scale[1], 1.4), keys: showAt(0.405, 0.42) },
      { name: "the weight of a datestone: a datestone in one pan", svg: bigger(datestone(n(scale[0] - pan[0]), n(scale[1] - pan[1])), n(scale[0] - pan[0]), n(scale[1] - pan[1]), 1.7), keys: showAt(0.42, 0.43) },
      { name: "gold equal to it: a small piece of gold in the other pan", svg: bigger(goldPiece(n(scale[0] + pan[0]), n(scale[1] - pan[1])), n(scale[0] + pan[0]), n(scale[1] - pan[1]), 1.7), keys: showAt(0.43, 0.44) },
      {
        name: "glints over the gold",
        svg: glints([
          [n(scale[0] + 8.4), n(scale[1] - 14)],
          [n(scale[0] + 12.8), n(scale[1] - 12.6)]
        ]),
        keys: showAt(0.45, 0.465),
        loop: twinkle()
      },
      { name: "equal: a soft golden ring about the balance", svg: care(scale[0], n(scale[1] + 0.2), 13.6, 2.6, SOFT_GOLD), keys: showAt(0.53, 0.57), loop: soft },
      { name: "his voice: a blessing on Abdur-Rahman", svg: arcs(42.6, 102.6, GOLD), keys: showFor(0.65, 0.66, 0.95, 0.96), loop: speaking },
      { name: "a warm light about Abdur-Rahman's place", svg: wash(abdurRahman[0], abdurRahman[1], 7, 3, "#FFE9B0", 0.24), keys: showAt(0.66, 0.7), loop: soft },
      ...[0, 1].map(
        (i): SignPart => ({
          name: `blessed: a spark rising from Abdur-Rahman's place ${i + 1}`,
          svg: sparkle(n(abdurRahman[0] - 1.6 + 3.2 * i), n(abdurRahman[1] - 3.4), 0.9, "#FFE07A"),
          keys: sparkRising(at3(0.67 + 0.02 * i), at3(0.7 + 0.02 * i), 8)
        })
      ),
      { name: "a wedding banquet: a dish by the new home", svg: bigger(banquet(feast[0], feast[1]), feast[0], feast[1], 1.8), keys: showAt(0.775, 0.8) },
      ...guests.map(
        ([x, y], i): SignPart => ({
          name: `a place coming to the banquet ${i + 1}`,
          svg: someone(x, y, 1.4),
          keys: track({
            opacity: [
              [at3(0.776 + 0.008 * i), 0],
              [at3(0.784 + 0.008 * i), 1]
            ],
            xy: [
              [at3(0.784 + 0.008 * i), i === 0 ? -10 : 10, 0],
              [at3(0.814 + 0.008 * i), 0, 0]
            ]
          })
        })
      ),
      {
        name: "even with one sheep: a sheep grazing by the home",
        svg: animalAt("sheep", n(143 - 50 * 0.16), n(104 - 73 * 0.16), 0.16, true),
        keys: track({
          opacity: [
            [0.89, 0],
            [0.9, 1]
          ],
          xy: [
            [0.9, 14, 0],
            [0.93, 0, 0]
          ]
        }),
        loop: { move: "bob", ms: 1400, y: 0.4 }
      },
      { name: "a soft golden ring about the banquet", svg: care(feast[0], n(feast[1] + 1), 14.4, 3.6, GOLD), keys: showAt(0.93, 0.955), loop: soft }
    ],
    words: [
      { text: "Anas: he saw the traces of Sufra", from: 0.02, to: 0.125 },
      { text: "on Abdur-Rahman and said: What is this?", from: 0.137, to: 0.262 },
      { text: "Abdur-Rahman: I have married a woman", from: 0.274, to: 0.389 },
      { text: "and have paid gold equal to", from: 0.401, to: 0.506 },
      { text: "the weight of a datestone.", from: 0.518, to: 0.633 },
      { text: "He said: May Allah bless you:", from: 0.645, to: 0.76 },
      { text: "Offer a wedding banquet", from: 0.772, to: 0.877 },
      { text: "even with one sheep.", from: 0.889, to: 1 }
    ]
  };
}

/** A bowl, its middle at (x, y), with milk in it: `full`, or lower after drinking. */
const bowl = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${n(y - 1.6)} Q${x} ${n(y + 2.2)} ${n(x + 3.2)} ${n(y - 1.6)} Z" fill="#A8743E"/><path d="M${n(x - 3.2)} ${n(y - 1.6)} L${n(x + 3.2)} ${n(y - 1.6)}" stroke="#86592C" stroke-width="0.4"/>`;
const milk = (x: number, y: number, full: boolean) =>
  full ? `<ellipse cx="${x}" cy="${n(y - 1.6)}" rx="2.8" ry="0.6" fill="#FBF7EE"/>` : `<ellipse cx="${x}" cy="${n(y - 1.1)}" rx="2.2" ry="0.45" fill="#F3EEE2"/>`;
const ripples = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${n(y - 1.6)} Q${n(x - 0.8)} ${n(y - 2)} ${x} ${n(y - 1.6)} M${n(x + 0.3)} ${n(y - 1.5)} Q${n(x + 1)} ${n(y - 1.9)} ${n(x + 1.7)} ${n(y - 1.5)}" stroke="#8FC6E8" stroke-width="0.3" fill="none"/>`;

// The right, then the right. Anas ibn Malik said: milk mixed with water was brought to the Messenger of Allah ﷺ while a
// bedouin was on his right and Abu Bakr was on his left. He drank, and then gave it to the bedouin, and said: the
// right! the right (Sahih al-Bukhari 5619). No one is drawn: by a home, his place, a golden ring, Abu Bakr's place on
// his left and a bedouin's place on his right, a jar of water and a bowl of milk, and Anas's place further off. Anas's
// voice speaks; water pours from the jar into the bowl, and ripples show in the milk. The bowl goes to his place; a
// soft ring comes about the bedouin's place on his right, then about Abu Bakr's on his left. The milk in the bowl goes
// lower, for he drank, and the bowl goes to the bedouin. His voice speaks; glints come to his right, twice, and a warm
// light comes about the bedouin's place.
function theRightThenTheRight(): SignArt {
  const his: [number, number] = [80, 105];
  const abuBakr: [number, number] = [62, 106.4];
  const bedouin: [number, number] = [98, 106.4];
  const start: [number, number] = [42, 113];
  const before: [number, number] = [80, 113.6];
  const after: [number, number] = [98, 114.6];
  const big = (svg: string, at: [number, number]) => bigger(svg, at[0], at[1], 1.8);
  return {
    kind: "the-right-then-the-right",
    ms: 9000,
    parts: [
      ...daySky(140, 40, 9000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [120, 117], [152, 115]]) },
      ...palms([
        [130, 97, 24],
        [152, 99, 20]
      ]),
      { name: "the home", svg: home(80, 97, 34, 22) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 3, GOLD) },
      { name: "Abu Bakr's place, on his left", svg: someone(abuBakr[0], abuBakr[1], 2) },
      { name: "the bedouin's place, on his right", svg: someone(bedouin[0], bedouin[1], 2) },
      { name: "Anas's place", svg: someone(141, 112, 1.4, LIGHT) },
      { name: "Anas's voice: milk was brought", svg: arcs(143.6, 108.6, ITS_VOICE), keys: showFor(0.03, 0.04, 0.1, 0.11), loop: speaking },
      { name: "a jar of water", svg: jar(30, 113, 1.4, "#9A6A44") },
      {
        name: "mixed with water: water pouring from the jar into the bowl",
        svg: `<path d="M33 101.6 Q39 100.6 41.4 109.4" stroke="#8FC6E8" stroke-width="0.9" fill="none" stroke-linecap="round"/>`,
        keys: showFor(0.04, 0.05, 0.09, 0.1)
      },
      { name: "the bowl", svg: big(bowl(start[0], start[1]), start), keys: track({ xy: [[0.17, 0, 0], [0.23, n(before[0] - start[0]), n(before[1] - start[1])], [0.65, n(before[0] - start[0]), n(before[1] - start[1])], [0.71, n(after[0] - start[0]), n(after[1] - start[1])]] }) },
      { name: "the milk in the bowl", svg: big(milk(start[0], start[1], true), start), keys: track({ opacity: [[0.6, 1], [0.63, 0]], xy: [[0.17, 0, 0], [0.23, n(before[0] - start[0]), n(before[1] - start[1])]] }) },
      { name: "ripples of the water in the milk", svg: big(ripples(start[0], start[1]), start), keys: track({ opacity: [[0.06, 0], [0.09, 1], [0.6, 1], [0.63, 0]], xy: [[0.17, 0, 0], [0.23, n(before[0] - start[0]), n(before[1] - start[1])]] }) },
      { name: "he drank: the milk lower in the bowl", svg: big(milk(before[0], before[1], false), before), keys: track({ opacity: [[0.6, 0], [0.63, 1]], xy: [[0.65, 0, 0], [0.71, n(after[0] - before[0]), n(after[1] - before[1])]] }) },
      { name: "a soft ring about the bedouin's place, on his right", svg: care(bedouin[0], n(bedouin[1] + 0.4), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.3, 0.34), loop: soft },
      { name: "a soft ring about Abu Bakr's place, on his left", svg: care(abuBakr[0], n(abuBakr[1] + 0.4), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.45, 0.49), loop: soft },
      { name: "his voice: the right! the right", svg: arcs(83.2, 101.2, GOLD), keys: showFor(0.78, 0.79, 0.95, 0.96), loop: speaking },
      { name: "the right: a glint to his right", svg: sparkle(106, 103.6, 1.2, "#FFE07A"), keys: showAt(0.82, 0.84), loop: twinkle() },
      { name: "the right again: a second glint to his right", svg: sparkle(111, 105.8, 1.2, "#FFE07A"), keys: showAt(0.87, 0.89), loop: twinkle() },
      { name: "a warm light about the bedouin's place", svg: wash(bedouin[0], bedouin[1], 7.4, 3.4, "#FFE9B0", 0.24), keys: showAt(0.9, 0.94), loop: soft }
    ],
    words: [
      { text: "Anas: milk mixed with water", from: 0.02, to: 0.15 },
      { text: "was brought to him", from: 0.165, to: 0.28 },
      { text: "while a bedouin was on his right", from: 0.295, to: 0.43 },
      { text: "and Abu Bakr was on his left.", from: 0.445, to: 0.58 },
      { text: "He drank and then gave to the bedouin", from: 0.595, to: 0.76 },
      { text: "and said: The right! The right.", from: 0.775, to: 1 }
    ]
  };
}

/** Stones about a scorpion's hole, its middle at (x, y). */
const stonesAt = (x: number, y: number) =>
  `<ellipse cx="${n(x - 3)}" cy="${y}" rx="2.6" ry="1.5" fill="#9C8E7A"/><ellipse cx="${n(x + 2.6)}" cy="${n(y + 0.3)}" rx="2.2" ry="1.3" fill="#8A7C68"/><ellipse cx="${x}" cy="${n(y - 1)}" rx="2" ry="1.3" fill="#ABA08C"/><ellipse cx="${n(x - 0.4)}" cy="${n(y + 0.8)}" rx="1" ry="0.45" fill="#4A3E30"/>`;

/** The evening over the day: the sky warm and low, the land a little dim. */
const EVENING =
  `<rect width="160" height="62" fill="#F2A066" opacity="0.42"/><rect width="160" height="22" fill="#5A6AA8" opacity="0.32"/>` +
  `<rect y="62" width="160" height="58" fill="#6F5A70" opacity="0.14"/>`;

// Stung by a scorpion. Abu Hurairah said that a person came to the Messenger of Allah ﷺ and said: Messenger of Allah, I
// was stung by a scorpion during the night. He said: had you recited these words in the evening: I seek refuge in the
// Perfect Word of Allah from the evil of what He created, it would not have done any harm to you (Sahih Muslim 2709).
// No one is drawn: by his home, his place, a golden ring, and the place of one who was stung, a grey haze about it.
// That place comes along the way to his and its voice speaks; a scorpion shows by some stones, and the night comes over
// the sky for a while, with stars. His voice speaks; the evening comes over the sky, the grey haze is gone,
// and the place's voice says the words; a soft golden ring comes about it. The scorpion comes towards it, stops at the
// ring and goes back, and goes; glints come over the ring and a warm light about the place.
function stungByAScorpion(): SignArt {
  const his: [number, number] = [122, 106];
  const start: [number, number] = [38, 107.6];
  const there: [number, number] = [100, 106.6];
  const toHim = goes(0.03, 0.08, there[0] - start[0], there[1] - start[1]);
  const sx = 0.16;
  const sting: [number, number] = [78, 112];
  return {
    kind: "stung-by-a-scorpion",
    ms: 12000,
    parts: [
      ...daySky(24, 70, 12000, 34),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [60, 117], [150, 116]]) },
      ...palms([
        [150, 98, 24],
        [8, 99, 22]
      ]),
      { name: "his home", svg: home(140, 100, 24, 17) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the way to his place", svg: way(`M${n(start[0] + 2)} ${n(start[1] + 0.8)} Q70 112 ${n(there[0] - 2)} ${n(there[1] + 0.8)}`, "#EFE2C4") },
      { name: "stones by the way", svg: stonesAt(sting[0], n(sting[1] + 1.2)) },
      { name: "Abu Hurairah's place", svg: someone(16, 110, 1.4, LIGHT) },
      { name: "Abu Hurairah's voice: one came to him", svg: arcs(18.6, 106.6, ITS_VOICE), keys: showFor(0.025, 0.03, 0.075, 0.08), loop: speaking },
      { name: "the place of one who was stung", svg: someone(start[0], start[1], 1.6), keys: toHim },
      { name: "stung: a grey haze about the place", svg: wash(start[0], start[1], 5.4, 2.6, "#8C8C8C", 0.16), keys: track({ opacity: [[0.53, 1], [0.56, 0]], xy: [[0.03, 0, 0], [0.08, n(there[0] - start[0]), n(there[1] - start[1])]] }) },
      { name: "its voice: I was stung", svg: arcs(n(there[0] + 2.6), n(there[1] - 3.4), ITS_VOICE), keys: showFor(0.14, 0.15, 0.32, 0.33), loop: speaking },
      {
        name: "a scorpion by the stones",
        svg: animalAt("scorpion", n(sting[0] - 50 * sx), n(sting[1] - 52 * sx), sx),
        keys: track({
          opacity: [
            [0.15, 0],
            [0.17, 1],
            [0.4, 1],
            [0.42, 0],
            [0.785, 0],
            [0.79, 1],
            [0.9, 1],
            [0.92, 0]
          ],
          xy: [
            [0.79, 0, 0],
            [0.815, 9, -2],
            [0.82, 9, -2],
            [0.845, 0, 0]
          ]
        })
      },
      { name: "during the night: the night over the sky", svg: NIGHT_OVER_SKY, keys: showFor(0.28, 0.31, 0.395, 0.42) },
      { name: "during the night: the night over the land", svg: NIGHT_OVER_LAND, keys: showFor(0.28, 0.31, 0.395, 0.42) },
      {
        name: "stars of that night",
        svg: stars([
          [14, 14],
          [40, 30],
          [66, 12],
          [100, 36],
          [124, 14],
          [150, 30]
        ]),
        keys: showFor(0.285, 0.32, 0.395, 0.42)
      },
      { name: "his voice: had you recited these words", svg: turned(arcs(n(his[0] - 2.6), n(his[1] - 3.4), GOLD), n(his[0] - 2.6)), keys: showFor(0.395, 0.405, 0.95, 0.96), loop: speaking },
      { name: "in the evening: the evening over the sky", svg: EVENING, keys: showAt(0.53, 0.56) },
      { name: "the words in the evening: the place's voice", svg: arcs(n(there[0] + 2.6), n(there[1] - 3.4), LIGHT), keys: showFor(0.565, 0.575, 0.84, 0.845), loop: speaking },
      { name: "I seek refuge: a soft golden ring about the place", svg: care(there[0], n(there[1] + 0.4), 6.4, 2.8, GOLD), keys: showAt(0.66, 0.7), loop: soft },
      {
        name: "no harm: glints over the ring",
        svg: glints([
          [n(there[0] - 6), n(there[1] - 2)],
          [n(there[0] + 6.4), n(there[1] - 1.4)]
        ]),
        keys: showAt(0.91, 0.94),
        loop: twinkle()
      },
      { name: "a warm light about the place", svg: wash(there[0], there[1], 6.4, 2.8, "#FFE9B0", 0.24), keys: showAt(0.93, 0.955), loop: soft }
    ],
    words: [
      { text: "Abu Hurairah: a person came to him:", from: 0.02, to: 0.125 },
      { text: "I was stung by a scorpion", from: 0.137, to: 0.262 },
      { text: "during the night.", from: 0.274, to: 0.379 },
      { text: "He said: Had you recited these words", from: 0.391, to: 0.516 },
      { text: "in the evening: I seek refuge", from: 0.528, to: 0.643 },
      { text: "in the Perfect Word of Allah", from: 0.655, to: 0.77 },
      { text: "from the evil of what He created,", from: 0.782, to: 0.887 },
      { text: "it would not have done any harm to you.", from: 0.895, to: 1 }
    ]
  };
}

export const OPEN_ART = {
  "the-gate-of-abu-bakr": theGateOfAbuBakr,
  "even-a-trotter": evenATrotter,
  "water-for-the-pilgrims": waterForThePilgrims,
  "start-with-your-dependents": startWithYourDependents,
  "even-with-one-sheep": evenWithOneSheep,
  "the-right-then-the-right": theRightThenTheRight,
  "stung-by-a-scorpion": stungByAScorpion
};
