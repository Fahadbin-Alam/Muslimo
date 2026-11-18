import { animalAt, cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, goldCoin, jug, palms, sparkRising, track } from "./daysArt";
import { cloth, greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { thornyTree } from "./dearArt";
import { food } from "./hopeArt";
import { at3 } from "./storyArt";

/**
 * Visits, gifts and the table in his ﷺ days: the wild donkey As-Sa'b gave him at al-Abwa' or Waddan, given back with a
 * kind word, since they were in ihram; the silk cloak Umar was sent, not to wear but to sell or give, which he sent to
 * his brother in Makkah; his visit to Jabir, sick and unconscious, when he poured of his wudu water on him and Jabir
 * woke; his visit to the sick youth who used to serve him, who accepted Islam; the room between the place where he
 * prayed and the wall, just enough for a sheep to pass; the barley they ground and blew on, with no sieve; and the food
 * of two that is enough for three. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet,
 * no Companion and no person is ever drawn, not even a hand or a face: where someone was, a ring or a small dashed
 * circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and
 * nothing comes down from the sky: what was revealed to him is a soft golden glow about his place, and a praise is a
 * spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#E8C878";

/** A pale light, for a mark or a ring that is not gold. */
const PALE = "#FFF3D6";

/** Water, for a drop or a glint of it. */
const WATER = "#7FB8E6";

/** Opacity keys through the given points, each [time, opacity]. */
const fade = (points: [number, number][]) => track({ opacity: points });

/** The land from y 61 down, with a few tufts of dry grass. */
const visitLand = () =>
  landOf([
    [20, 111],
    [66, 113],
    [114, 111],
    [146, 109]
  ]);

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across, the hills and the land. */
const day = (sunX: number, cloudX: number, ms: number): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, 20) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } },
  { name: "hills", svg: hills() },
  { name: "the land", svg: visitLand() }
];

/** An animal of the picture cards, its feet's middle at (x, y), `s` times its size. */
const animal = (kind: "donkey" | "sheep", x: number, y: number, s: number, left = false) => animalAt(kind, n(x - 50 * s), n(y - 73 * s), s, left);

/** A wild donkey: the donkey of the picture cards in the sandy coat of the wild ones, its feet's middle at (x, y). */
const wildDonkey = (x: number, y: number, s: number, left = false) =>
  animal("donkey", x, y, s, left).replace(/#9EA4AA/g, "#C9A77E").replace(/#80868D/g, "#A8875F").replace(/#E2E4E7/g, "#F3E8D4").replace(/#4A4F55/g, "#5E4630");

/** A few small homes far off, the middle of their foot at (x, y). */
const farHomes = (x: number, y: number) =>
  `<rect x="${n(x - 7)}" y="${n(y - 3.6)}" width="5" height="3.6" fill="#A88B66"/>` +
  `<rect x="${n(x - 1.2)}" y="${n(y - 3)}" width="4.2" height="3" fill="#9C805C"/>` +
  `<rect x="${n(x + 3.6)}" y="${n(y - 3.3)}" width="3.8" height="3.3" fill="#A88B66"/>` +
  `<rect x="${n(x - 5)}" y="${n(y - 1.8)}" width="0.9" height="1.8" fill="#5E4630"/>` +
  `<rect x="${n(x + 0.4)}" y="${n(y - 1.5)}" width="0.8" height="1.5" fill="#5E4630"/>` +
  `<rect x="${n(x + 5)}" y="${n(y - 1.6)}" width="0.8" height="1.6" fill="#5E4630"/>`;

/** A drop of water, its middle at (x, y). */
const drop = (x: number, y: number) => `<path d="M${x} ${n(y - 1)} Q${n(x + 0.8)} ${n(y + 0.1)} ${x} ${n(y + 0.6)} Q${n(x - 0.8)} ${n(y + 0.1)} ${x} ${n(y - 1)} Z" fill="${WATER}"/>`;

// A gift given back, with a kind word. As-Sa'b ibn Jaththamah said that he gave the Messenger of Allah ﷺ a wild donkey
// at al-Abwa', or at Waddan, and he gave it back to him. When he saw what was in his face, he said: we did not give it
// back to you, except that we are in ihram (Sahih al-Bukhari 2573). No one is drawn: on the way through the valley, his
// place, a golden ring, with the places of those with him; far off, the homes of al-Abwa' and of Waddan. As-Sa'b's
// place comes from the right with a wild donkey, led, no one on it, and a small glint shows by it: a gift. A soft ring
// comes about each of the far places in turn. The donkey turns and goes back to As-Sa'b's side, and a grey ring comes
// about As-Sa'b's place: sorrow. A faint golden line goes from his place to As-Sa'b's: he saw it. His voice speaks; a
// soft white glow and a soft white ring come about his place and those with him: in ihram. The grey ring fades, and a
// soft golden ring comes about As-Sa'b's place.
function giftInIhram(): SignArt {
  const comes: [number, number, number][] = [
    [0.03, 40, 0],
    [0.12, 0, 0]
  ];
  return {
    kind: "gift-in-ihram",
    ms: 9000,
    parts: [
      ...day(126, 40, 9000),
      { name: "far off: the homes of al-Abwa'", svg: farHomes(28, 72) },
      { name: "far off: the homes of Waddan", svg: farHomes(134, 71) },
      { name: "a thorny tree of the valley 1", svg: thornyTree(10, 99, 0.62), origin: { x: 10, y: 99 }, loop: { move: "sway", ms: 5600, angle: 1.2 } },
      { name: "a thorny tree of the valley 2", svg: thornyTree(124, 95.4, 0.5), origin: { x: 124, y: 95.4 }, loop: { move: "sway", ms: 6200, angle: 1.2, phase: 0.4 } },
      { name: "the way through the valley", svg: way("M0 101.6 C40 100.6 116 100 160 101", "#F4E3BC", 1) },
      { name: "the places of those with him", svg: someone(42.4, 106.4) + someone(48.4, 104.2) + someone(54.4, 106.4) },
      { name: "his place, a golden ring", svg: ring(61.4, 103.8, 2.6, GOLD) },
      { name: "As-Sa'b's place", svg: someone(93, 104.6), keys: track({ xy: comes }) },
      {
        name: "the wild donkey, led, no one on it",
        svg: wildDonkey(80, 106, 0.15, true),
        origin: { x: 80, y: 101 },
        keys: track({
          xy: [...comes, [0.37, 0, 0], [0.44, 26, 0]],
          scaleX: [
            [0.35, 1],
            [0.37, -1]
          ]
        }),
        loop: { move: "bob", ms: 1600, y: 0.25 }
      },
      { name: "a gift: a small glint by the wild donkey", svg: sparkle(80, 93, 0.9, "#FFE7A0"), keys: showFor(0.115, 0.125, 0.27, 0.28), loop: speaking },
      { name: "at al-Abwa': a soft ring about it", svg: care(28.2, 70.6, 9, 2.4, "#FFFFFF"), keys: showFor(0.19, 0.21, 0.42, 0.44), loop: soft },
      { name: "or at Waddan: a soft ring about it", svg: care(134.2, 69.6, 9, 2.4, "#FFFFFF"), keys: showFor(0.235, 0.255, 0.42, 0.44), loop: { move: "twinkle", ms: 1800, low: 0.75, phase: 0.5 } },
      { name: "sorrow: a grey ring about As-Sa'b's place", svg: greyRing(93, 104.6, 3.4, 1.6), keys: showFor(0.42, 0.445, 0.86, 0.89) },
      { name: "he saw it: a faint golden line to As-Sa'b's place", svg: lookLine(63.6, 102.6, 90.6, 103.4, 96), keys: showFor(0.51, 0.54, 0.74, 0.76) },
      { name: "his voice: we did not give it back to you", svg: arcs(64.6, 102.4, GOLD), keys: showAt(0.67, 0.68), loop: speaking },
      { name: "in ihram: a soft white glow about his place and those with him", svg: wash(52, 104.8, 13, 4, "#FFFFFF", 0.12), keys: showAt(0.83, 0.86) },
      { name: "in ihram: a soft white ring about them", svg: care(52, 105.4, 13, 3.6, "#FFFFFF"), keys: showAt(0.84, 0.87), loop: soft },
      { name: "a soft golden ring about As-Sa'b's place", svg: care(93, 104.6, 3.6, 1.7, SOFT_GOLD), keys: showAt(0.9, 0.93), loop: soft }
    ],
    words: [
      { text: "As-Sa'b gave him a wild donkey", from: 0.02, to: 0.17 },
      { text: "at al-Abwa', or at Waddan", from: 0.185, to: 0.33 },
      { text: "and he gave it back to As-Sa'b", from: 0.345, to: 0.49 },
      { text: "When he saw the sorrow in As-Sa'b's face", from: 0.505, to: 0.65 },
      { text: "He said: we did not give it back to you", from: 0.665, to: 0.81 },
      { text: "except that we are in ihram", from: 0.825, to: 1 }
    ]
  };
}

/** A silk cloak, folded, its foot's middle at (x, y): striped, with a sheen. */
const silkCloak = (x: number, y: number) =>
  `<path d="M${n(x - 3.4)} ${y} L${n(x + 3.4)} ${y} L${n(x + 2.8)} ${n(y - 2.4)} L${n(x - 2.8)} ${n(y - 2.4)} Z" fill="#B5485A"/>` +
  `<path d="M${n(x - 3.1)} ${n(y - 0.8)} L${n(x + 3.1)} ${n(y - 0.8)} M${n(x - 2.9)} ${n(y - 1.6)} L${n(x + 2.9)} ${n(y - 1.6)}" stroke="#E8C46A" stroke-width="0.35"/>` +
  `<path d="M${n(x - 2.2)} ${n(y - 2.1)} L${n(x + 0.6)} ${n(y - 2.1)}" stroke="#FFFFFF" stroke-width="0.4" opacity="0.6" stroke-linecap="round"/>`;

// Not to wear, but to give. Ibn Umar said: Umar saw a silk cloak for sale and said to the Prophet ﷺ: buy this cloak and
// wear it on Fridays, and when delegations come to you. He said: only one who has no share in the Hereafter wears this.
// Then cloaks like it were brought to the Messenger of Allah ﷺ, and he sent one of them to Umar. Umar said: how can I
// wear it, when you said of it what you said? He said: I did not give it to you to wear; sell it, or give it to someone
// to wear. So Umar sent it to a brother of his in Makkah, before he accepted Islam (Sahih al-Bukhari 2619). No one is
// drawn: by the masjid of Madinah, his place, a golden ring, Umar's place, and a silk cloak for sale, folded, by the
// seller's place. A faint golden line goes from Umar's place to the cloak; Umar's voice speaks, then his, and a grey ring
// comes about the cloak for sale. Umar's place goes home. Then the seller's place and the cloak go on, cloaks like
// it show by his place, and the top one goes along a way to Umar's home. Umar's voice asks; his voice answers, and a soft
// golden ring comes about the cloak: to give. Then a way shows to Makkah, far off, and the cloak goes along it to the
// place of Umar's kin there, with a warm glow about it.
function cloakToGive(): SignArt {
  const umarHome = 98;
  const umarGoes: [number, number, number][] = [
    [0.395, 0, 0],
    [0.46, umarHome - 4 - 50, -0.4]
  ];
  return {
    kind: "cloak-to-give",
    ms: 12000,
    parts: [
      ...day(118, 70, 12000),
      ...palms([
        [36, 95, 11],
        [146, 96, 13]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 98, 0.6) },
      { name: "Umar's home", svg: home(umarHome, 100, 20, 14) },
      { name: "the way to Makkah, far off", svg: way("M106 104.6 C122 104.4 138 102.6 158 100.6", "#F4E3BC", 0.8), keys: showAt(0.89, 0.905) },
      { name: "far off in Makkah: the place of Umar's kin", svg: someone(152, 100.8, 1.2), keys: showAt(0.89, 0.905) },
      { name: "the seller's place", svg: someone(33, 105.2), keys: track({ xy: [[0.52, 0, 0], [0.55, -6, 0]], opacity: [[0.52, 1], [0.55, 0]] }) },
      {
        name: "the silk cloak for sale, folded",
        svg: silkCloak(39.4, 106.6),
        keys: track({ xy: [[0.52, 0, 0], [0.55, -6, 0]], opacity: [[0.52, 1], [0.55, 0]] })
      },
      { name: "his place, a golden ring", svg: ring(62, 103.8, 2.6, GOLD) },
      { name: "Umar's place", svg: someone(50, 104.8), keys: track({ xy: umarGoes }) },
      { name: "Umar saw it: a faint golden line to the cloak", svg: lookLine(48.6, 103.6, 41, 104.2, 100.6, SOFT_GOLD), keys: showFor(0.03, 0.06, 0.15, 0.17) },
      { name: "Umar's voice: buy it, wear it on Fridays", svg: arcs(52, 103.4, VOICE), keys: showFor(0.145, 0.155, 0.26, 0.27), loop: speaking },
      { name: "his voice: only one with no share wears it", svg: arcsLeft(59.4, 102.6, GOLD), keys: showFor(0.265, 0.275, 0.52, 0.53), loop: speaking },
      { name: "not to be worn: a grey ring about the cloak for sale", svg: greyRing(39.4, 105.4, 4.8, 2), keys: showFor(0.29, 0.32, 0.52, 0.55) },
      { name: "cloaks like it, by his place", svg: silkCloak(76, 106.8) + silkCloak(76, 104.4), keys: showAt(0.52, 0.55) },
      {
        name: "the cloak he sent to Umar",
        svg: silkCloak(76, 102),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.55, 1]
          ],
          xy: [
            [0.56, 0, 0],
            [0.59, 26, 4.4],
            [0.9, 26, 4.4],
            [0.955, 68, -1.2]
          ]
        })
      },
      { name: "sent to Umar: a way to his home", svg: way("M80 106.8 C87 108.2 94 108.2 100 107.4", PALE, 0.7), keys: showFor(0.55, 0.565, 0.65, 0.67) },
      { name: "Umar's voice: how can I wear it", svg: arcsLeft(umarHome - 6.6, 103.6, VOICE), keys: showFor(0.655, 0.665, 0.77, 0.78), loop: speaking },
      { name: "his voice: not to wear, but to sell or give", svg: arcs(64.8, 102.6, GOLD), keys: showFor(0.775, 0.785, 0.89, 0.9), loop: speaking },
      { name: "to give: a soft golden ring about the cloak", svg: care(102, 105.3, 4.8, 1.9, SOFT_GOLD), keys: showFor(0.79, 0.82, 0.89, 0.9), loop: soft },
      { name: "a warm glow about the place of Umar's kin", svg: glow(152, 100.6, 6, WARM, 0.28), keys: showAt(0.94, 0.958) }
    ],
    words: [
      { text: "Umar saw a silk cloak for sale", from: 0.02, to: 0.125 },
      { text: "and said: buy it, wear it on Fridays", from: 0.14, to: 0.245 },
      { text: "He said: this is worn by one", from: 0.26, to: 0.375 },
      { text: "who has no share in the Hereafter", from: 0.39, to: 0.505 },
      { text: "Such cloaks came, and he sent one to Umar", from: 0.52, to: 0.635 },
      { text: "Umar said: how can I wear it?", from: 0.65, to: 0.755 },
      { text: "He said: not to wear, but to sell or give", from: 0.77, to: 0.875 },
      { text: "So Umar sent it to his brother in Makkah", from: 0.89, to: 1 }
    ]
  };
}

// Water from his wudu. Jabir said: the Messenger of Allah ﷺ came to visit me while I was sick and could not think. He
// made wudu, and poured some of the water of his wudu on me, and I came to. I said: O Messenger of Allah, to whom will
// my inheritance go? I have no parent and no child to inherit from me. Then the ayah of the shares of inheritance was
// revealed (Sahih al-Bukhari 194). No one is drawn: by Jabir's home, Jabir's place, lying on a mat. His place, a golden
// ring, comes along the way from the masjid to Jabir's side, and Jabir's place grows dim, with a grey ring about it. A
// jug shows by him, with glints of water: his wudu. Drops of its water go one by one to Jabir's place. Jabir's place
// grows bright and the grey ring fades: he woke. Jabir's voice asks, and a sack of his wealth shows by the mat. Then a
// soft golden glow comes about his place, and the wealth's coins part into their shares, with a soft golden ring about
// them.
function waterForJabir(): SignArt {
  const jabir: [number, number] = [119, 104.8];
  const his: [number, number] = [105, 105.2];
  const coins: [number, number][] = [
    [142.4, 107.2],
    [143.8, 105.6],
    [145.2, 107.2]
  ];
  const shares: [number, number][] = [
    [-3.8, 0],
    [0, -1.8],
    [3.8, 0]
  ];
  return {
    kind: "water-for-jabir",
    ms: 10500,
    parts: [
      ...day(30, 120, 10500),
      ...palms([
        [155, 96, 13],
        [62, 95, 11]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 98, 0.5) },
      { name: "Jabir's home", svg: home(94, 100, 22, 15) },
      { name: "the way from the masjid", svg: way("M28 105.6 C50 107 76 107 100 106", "#F4E3BC", 0.8) },
      { name: "Jabir's mat", svg: cloth(110, 128, 103.4, "#D9C08E") },
      { name: "Jabir's place, lying sick", svg: someone(jabir[0], jabir[1]), keys: fade([[0.22, 1], [0.26, 0.5], [0.61, 0.5], [0.64, 1]]) },
      { name: "sick and not knowing: a grey ring about Jabir's place", svg: greyRing(jabir[0], jabir[1], 3.6, 1.7), keys: showFor(0.22, 0.25, 0.61, 0.64) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: track({ xy: [[0.03, -70, 0.6], [0.15, 0, 0]] }) },
      { name: "his wudu: a jug of water by his place", svg: jug(99.4, 107.6), keys: showAt(0.35, 0.37) },
      ...[
        [101.6, 102.2],
        [103.4, 100.8],
        [100.4, 100.4]
      ].map(
        ([x, y], i): SignPart => ({
          name: `his wudu: a glint of water ${i + 1}`,
          svg: sparkle(x, y, 0.7, "#DFF1FC"),
          keys: showFor(at3(0.36 + i * 0.012), at3(0.37 + i * 0.012), 0.48, 0.5),
          loop: { move: "twinkle", ms: 900, low: 0.4, phase: i / 3 }
        })
      ),
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `poured on Jabir: a drop of the water ${i + 1}`,
          svg: drop(106.6, 102.4),
          keys: track({
            xy: [
              [at3(0.48 + i * 0.014), 0, 0],
              [at3(0.492 + i * 0.014), 5.6, -4.2],
              [at3(0.504 + i * 0.014), 11.6 - i * 0.8, 0.6]
            ],
            opacity: [
              [at3(0.478 + i * 0.014), 0],
              [at3(0.482 + i * 0.014), 1],
              [at3(0.5 + i * 0.014), 1],
              [at3(0.506 + i * 0.014), 0]
            ]
          })
        })
      ),
      { name: "he woke: a soft white ring about Jabir's place", svg: care(jabir[0], jabir[1], 3.8, 1.8, "#FFFFFF"), keys: showAt(0.63, 0.66), loop: soft },
      { name: "Jabir's voice: to whom will my inheritance go", svg: arcsLeft(116.4, 103.2, VOICE), keys: showFor(0.74, 0.75, 0.87, 0.88), loop: speaking },
      { name: "his inheritance: a sack by the mat", svg: sack(134, 107.4, 0.8), keys: showAt(0.75, 0.78) },
      ...coins.map(
        ([x, y], i): SignPart => ({
          name: `his inheritance: a coin ${i + 1}`,
          svg: goldCoin(x, y, 1.1),
          keys: track({
            opacity: [
              [0.75, 0],
              [0.78, 1]
            ],
            xy: [
              [0.9, 0, 0],
              [0.93, shares[i][0], shares[i][1]]
            ]
          })
        })
      ),
      { name: "revealed: a soft golden glow about his place", svg: glow(his[0], his[1] - 1, 8, WARM, 0.3), keys: showAt(0.87, 0.9) },
      { name: "the shares: a soft golden ring about the coins", svg: care(143.8, 106.6, 8, 2.6, SOFT_GOLD), keys: showAt(0.93, 0.955), loop: soft }
    ],
    words: [
      { text: "Jabir said: he came to visit me", from: 0.02, to: 0.2 },
      { text: "while I was sick and unconscious", from: 0.215, to: 0.33 },
      { text: "He made wudu", from: 0.345, to: 0.46 },
      { text: "and poured of its water on me", from: 0.475, to: 0.59 },
      { text: "and I woke up", from: 0.605, to: 0.72 },
      { text: "I said: to whom will my inheritance go?", from: 0.735, to: 0.85 },
      { text: "Then the ayah of inheritance was revealed", from: 0.865, to: 1 }
    ]
  };
}

/** A small pillow, its middle at (x, y). */
const pillow = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="0.9" fill="#E9E2D0" stroke="#C9BFA6" stroke-width="0.3"/>`;

// The visit to the youth who served him. Anas said: a Jewish youth used to serve the Prophet ﷺ, and he fell ill. The
// Prophet ﷺ came to visit him, and sat by his head, and said to him: accept Islam. He looked at his father, who was with
// him, and his father said: obey Abul-Qasim ﷺ. So he accepted Islam, and the Prophet ﷺ came out saying: praise be to
// Allah, who saved him from the Fire (Sahih al-Bukhari 1356). No one is drawn: by the masjid of Madinah, his place, a
// golden ring, and the youth's place, serving, bringing a jug. Then the youth's place, lying ill on a mat by his home,
// with a grey ring about it, and the elder's place beside it. His place goes to the youth's head; his voice speaks. A
// faint golden line goes from the youth's place to the elder's; the elder's voice speaks. A soft golden ring comes about
// the youth's place and the grey ring fades. His place goes out along the way with his voice, and a spark of praise
// rises from it; a warm glow comes about the youth's place.
function visitToTheYouth(): SignArt {
  const youth: [number, number] = [98, 105.2];
  const elder: [number, number] = [113, 104.6];
  const head: [number, number] = [85.2, 105];
  const his: [number, number] = [40, 104];
  const out: [number, number] = [62, 104.6];
  return {
    kind: "visit-to-the-youth",
    ms: 12000,
    parts: [
      ...day(130, 64, 12000),
      ...palms([
        [32, 95, 11],
        [150, 96, 13]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 98, 0.56) },
      { name: "the youth's home", svg: home(78, 100, 20, 14) },
      { name: "the way between", svg: way("M44 106 C56 107.2 68 107 82 106.4", "#F4E3BC", 0.8) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD), keys: track({ xy: [[0.15, 0, 0], [0.225, head[0] - his[0], head[1] - his[1]], [0.77, head[0] - his[0], head[1] - his[1]], [0.8, out[0] - his[0], out[1] - his[1]]] }) },
      {
        name: "the youth's place, serving, bringing a jug",
        svg: someone(56, 105) + jug(61, 107),
        keys: track({
          xy: [
            [0.025, 0, 0],
            [0.08, -9, 0]
          ],
          opacity: [
            [0.14, 1],
            [0.165, 0]
          ]
        })
      },
      { name: "the youth's mat", svg: cloth(88, 108, 103.6, "#D9C08E") + pillow(89.6, 104.4), keys: showAt(0.145, 0.175) },
      { name: "the youth's place, lying ill", svg: someone(youth[0], youth[1]), keys: showAt(0.15, 0.18) },
      { name: "ill: a grey ring about the youth's place", svg: greyRing(youth[0], youth[1], 3.6, 1.7), keys: showFor(0.17, 0.2, 0.65, 0.68) },
      { name: "the elder's place, beside the youth", svg: someone(elder[0], elder[1]), keys: showAt(0.15, 0.18) },
      { name: "his voice: accept Islam", svg: arcs(head[0] + 2.6, 103.6, GOLD), keys: showFor(0.29, 0.3, 0.41, 0.42), loop: speaking },
      { name: "the youth looked: a faint golden line to the elder's place", svg: lookLine(99.8, 104, 111.2, 103.8, 100.4, SOFT_GOLD), keys: showFor(0.41, 0.44, 0.53, 0.55) },
      { name: "the elder's voice: obey him", svg: arcsLeft(elder[0] - 2.6, 103.2, VOICE), keys: showFor(0.53, 0.54, 0.65, 0.66), loop: speaking },
      { name: "accepted Islam: a soft golden ring about the youth's place", svg: care(youth[0], youth[1], 3.8, 1.8, SOFT_GOLD), keys: showAt(0.65, 0.68), loop: soft },
      { name: "his voice, going out: praise", svg: arcs(out[0] + 2.6, 103.2, GOLD), keys: showAt(0.8, 0.81), loop: speaking },
      { name: "his praise: a spark rising", svg: sparkle(out[0], n(out[1] - 4), 1.6, "#FFE7A0"), keys: sparkRising(0.8, 0.83, 10), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "saved: a warm glow about the youth's place", svg: glow(youth[0], youth[1] - 1, 7, WARM, 0.3), keys: showAt(0.89, 0.92) }
    ],
    words: [
      { text: "A Jewish youth used to serve him", from: 0.02, to: 0.125 },
      { text: "The youth fell ill, and he came to visit", from: 0.14, to: 0.27 },
      { text: "He sat by his head and said: accept Islam", from: 0.285, to: 0.39 },
      { text: "The youth looked at his father nearby", from: 0.405, to: 0.51 },
      { text: "The father said: obey him", from: 0.525, to: 0.63 },
      { text: "So the youth accepted Islam", from: 0.645, to: 0.75 },
      { text: "He came out, saying: praise be to Allah", from: 0.765, to: 0.87 },
      { text: "who saved the youth from the Fire", from: 0.885, to: 1 }
    ]
  };
}

// Room for a sheep. Sahl said: between the place where the Messenger of Allah ﷺ prayed and the wall there was room for a
// sheep to pass (Sahih al-Bukhari 496). Inside the masjid of Madinah, its wall of mud brick ahead, its roof of palm
// leaves on palm trunks. No one is drawn: his place, a golden ring, near the wall; a soft white ring comes about it, and
// a warm glow: praying. A soft golden line shows along the base of the wall. Then, in the room between, a faint sheep,
// still: just room for it; and a small golden measure marks the room from the wall to his place.
function roomForASheep(): SignArt {
  const his: [number, number] = [80, 100];
  const wallFoot = 80;
  const rows = [28, 40, 52, 64, 76];
  return {
    kind: "room-for-a-sheep",
    ms: 7000,
    parts: [
      {
        name: "the masjid's wall of mud brick",
        svg:
          `<rect width="160" height="${wallFoot}" fill="#D8B98A"/>` +
          rows.map((y) => `<path d="M0 ${y} L160 ${y}" stroke="#C9A676" stroke-width="0.4"/>`).join("") +
          [16, ...rows]
            .map((y, r) =>
              Array.from({ length: 9 }, (_, i) => n(i * 20 + (r % 2 ? 10 : 0) + 4))
                .map((x) => `<path d="M${x} ${y} L${x} ${Math.min(y + 12, wallFoot)}" stroke="#C9A676" stroke-width="0.4"/>`)
                .join("")
            )
            .join("")
      },
      { name: "its floor of sand", svg: `<rect y="${wallFoot}" width="160" height="${120 - wallFoot}" fill="#E2CB9C"/><path d="M0 ${wallFoot} L160 ${wallFoot}" stroke="#C9AE80" stroke-width="0.8"/>` },
      {
        name: "its roof of palm leaves",
        svg: `<rect width="160" height="16" fill="#6E8F3A"/><path d="M0 16 L160 16" stroke="#56742B" stroke-width="0.8"/>` + Array.from({ length: 20 }, (_, i) => `<path d="M${i * 8 + 1} 14 L${i * 8 + 5} 6" stroke="#56742B" stroke-width="0.6"/>`).join("")
      },
      {
        name: "its palm trunks",
        svg:
          [44, 116].map((x) => `<rect x="${n(x - 1.6)}" y="16" width="3.2" height="${wallFoot + 0.8 - 16}" fill="#B0916A"/>`).join("") +
          [14, 146].map((x) => `<rect x="${n(x - 2.6)}" y="16" width="5.2" height="${112 - 16}" fill="#A9895C"/><path d="M${x} 16 L${x} 112" stroke="#8C6E45" stroke-width="0.5"/>`).join("")
      },
      { name: "a soft light on the floor", svg: wash(80, 98, 58, 12, "#FFF6DC", 0.08), loop: { move: "twinkle", ms: 4200, low: 0.7 } },
      { name: "his place, a golden ring, where he prayed", svg: ring(his[0], his[1], 5, GOLD) },
      { name: "praying: a soft white ring about his place", svg: care(his[0], his[1], 7.6, 3.8, "#FFFFFF"), keys: showAt(0.04, 0.08), loop: soft },
      { name: "praying: a warm glow at his place", svg: glow(his[0], his[1] - 1, 8, WARM, 0.26), keys: showAt(0.06, 0.1), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "the wall: a soft golden line along its base",
        svg: `<path d="M48 ${wallFoot + 0.3} L112 ${wallFoot + 0.3}" stroke="${SOFT_GOLD}" stroke-width="1.2" stroke-linecap="round"/>`,
        origin: { x: 80, y: wallFoot },
        keys: track({
          opacity: [
            [0.34, 0],
            [0.36, 1]
          ],
          scaleX: [
            [0.34, 0.1],
            [0.42, 1]
          ]
        })
      },
      { name: "room for a sheep: a faint sheep, still", svg: animal("sheep", 80, 92.6, 0.18, true), keys: fade([[0.65, 0], [0.7, 0.55]]), loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      {
        name: "the room between: a small golden measure",
        svg:
          `<path d="M60 ${wallFoot + 0.8} L60 ${n(his[1] - 3)}" stroke="${SOFT_GOLD}" stroke-width="0.7" stroke-dasharray="1.2 0.9"/>` +
          `<path d="M57.8 ${wallFoot + 0.8} L62.2 ${wallFoot + 0.8} M57.8 ${n(his[1] - 3)} L62.2 ${n(his[1] - 3)}" stroke="${SOFT_GOLD}" stroke-width="0.8" stroke-linecap="round"/>`,
        keys: showAt(0.72, 0.76)
      }
    ],
    words: [
      { text: "Between the place where he prayed", from: 0.02, to: 0.32 },
      { text: "and the wall", from: 0.335, to: 0.62 },
      { text: "was room for a sheep to pass", from: 0.635, to: 1 }
    ]
  };
}

/** A shape drawn `k` times its size about the point (x, y). */
const big = (svg: string, x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${svg}</g>`;

/** A small heap of white flour, its foot's middle at (x, y). */
const whiteFlour = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${y} Q${x} ${n(y - 4.4)} ${n(x + 4)} ${y} Z" fill="#FFFFFF" stroke="#E2DCCF" stroke-width="0.3"/>`;

/** A sieve, a round frame with a mesh, seen from the side and a little above, its middle at (x, y). */
const sieve = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${y} L${n(x - 4.4)} ${n(y + 1.4)} Q${x} ${n(y + 3.2)} ${n(x + 4.4)} ${n(y + 1.4)} L${n(x + 4.4)} ${y}" fill="#C9A776"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="1.6" fill="#EEE0C2" stroke="#9A7A4E" stroke-width="0.5"/>` +
  `<path d="M${n(x - 3)} ${n(y - 1)} L${n(x + 3)} ${n(y + 1)} M${n(x - 3)} ${n(y + 1)} L${n(x + 3)} ${n(y - 1)} M${n(x - 4)} ${y} L${n(x + 4)} ${y} M${x} ${n(y - 1.5)} L${x} ${n(y + 1.5)}" stroke="#B89A6C" stroke-width="0.25"/>`;

/** A heap of barley grain, its foot's middle at (x, y). */
const barleyHeap = (x: number, y: number) =>
  `<path d="M${n(x - 4.6)} ${y} Q${x} ${n(y - 5.2)} ${n(x + 4.6)} ${y} Z" fill="#D9B864"/>` +
  [-2.6, -1, 0.6, 2.2, -1.8, 0, 1.6, -0.4]
    .map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 0.8 - (i < 4 ? 0 : i < 7 ? 1.2 : 2.3))}" rx="0.55" ry="0.3" fill="#B8963E"/>`)
    .join("");

/** A mill of two round stones, turned by its handle, its foot's middle at (x, y). */
const millStones = (x: number, y: number) =>
  `<path d="M${n(x - 6)} ${n(y - 2.2)} L${n(x + 6)} ${n(y - 2.2)} L${n(x + 6)} ${y} L${n(x - 6)} ${y} Z" fill="#8E8A82"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.2)}" rx="6" ry="1.2" fill="#A7A39A"/>` +
  `<path d="M${n(x - 5)} ${n(y - 4.6)} L${n(x + 5)} ${n(y - 4.6)} L${n(x + 5)} ${n(y - 2.6)} L${n(x - 5)} ${n(y - 2.6)} Z" fill="#9C978E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 4.6)}" rx="5" ry="1" fill="#B5B1A8"/><ellipse cx="${x}" cy="${n(y - 4.6)}" rx="0.9" ry="0.35" fill="#6E6A62"/>`;

/** Barley flour with its husk in it, a low heap, its foot's middle at (x, y). */
const flourHeap = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${y} Q${x} ${n(y - 3.6)} ${n(x + 4)} ${y} Z" fill="#E6D8B8"/>` +
  [-1.8, -0.4, 1.2, 0.4].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 0.7 - (i < 3 ? 0 : 1.2))}" rx="0.45" ry="0.22" fill="#B8963E"/>`).join("");

/** Dough of barley, wet and round, its foot's middle at (x, y). */
const dough = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 1.2)}" rx="3.4" ry="1.4" fill="#DCC290" stroke="#B89A62" stroke-width="0.3"/>`;

// The husk blown away. Abu Hazim said: I asked Sahl ibn Sa'd: did the Messenger of Allah ﷺ eat white flour? Sahl said:
// the Messenger of Allah ﷺ never saw white flour, from when Allah sent him until Allah took him. I said: did you have
// sieves in the time of the Messenger of Allah ﷺ? He said: the Messenger of Allah ﷺ never saw a sieve, from when Allah
// sent him until He took him. I said: how did you eat barley, unsifted? He said: we would grind it and blow on it, and
// what flew off flew, and what stayed, we wet and ate (Sahih al-Bukhari 5413). No one is drawn: by Sahl's home, on a
// mat, Abu Hazim's place and Sahl's, their voices in turn. A faint heap of white flour shows, and a grey ring comes about
// it: never seen; then a faint sieve, and a grey ring about it. A heap of barley shows by a mill of two round stones; the
// barley grows less as the handle of the mill goes to and fro, and a low heap of flour grows by the mill. A puff of air goes
// over it, and the flakes of husk fly off one by one; a soft ring comes about what stayed. Then a jug shows, its water
// goes on the flour, the flour becomes dough, and a warm glow comes about the two places.
function huskBlown(): SignArt {
  const k = 1.6;
  const mill: [number, number] = [100, 103.6];
  const flourAt: [number, number] = [119, 104.6];
  const jugAt: [number, number] = [135, 105.4];
  const handle = (x: number) => `<path d="M${x} ${n(mill[1] - 4.8 * k)} L${x} ${n(mill[1] - 8 * k)}" stroke="#7A5A3A" stroke-width="1.3" stroke-linecap="round"/>`;
  const flakes: [number, number, number][] = [
    [16, -9, 0.774],
    [24, -6, 0.78],
    [20, -14, 0.786],
    [30, -10, 0.792],
    [26, -16, 0.798]
  ];
  return {
    kind: "husk-blown",
    ms: 12000,
    parts: [
      ...day(124, 90, 12000),
      ...palms([
        [150, 96, 13],
        [62, 94, 11]
      ]),
      { name: "Sahl's home", svg: home(31, 93, 26, 17) },
      { name: "the mat before Sahl's home", svg: cloth(12, 52, 99.4, "#D9C08E") },
      { name: "Abu Hazim's place", svg: someone(20, 101, 2.2) },
      { name: "Sahl's place", svg: someone(44, 101, 2.2) },
      { name: "Abu Hazim's voice: did he eat white flour", svg: arcs(23.4, 99.6, VOICE), keys: showFor(0.025, 0.035, 0.14, 0.15), loop: speaking },
      { name: "white flour, faint", svg: big(whiteFlour(76, 102), 76, 102, k), keys: track({ opacity: [[0.035, 0], [0.065, 0.6], [0.26, 0.6], [0.28, 0]] }) },
      { name: "Sahl's voice: he never saw white flour", svg: arcsLeft(40.6, 99.6, VOICE), keys: showFor(0.145, 0.155, 0.26, 0.27), loop: speaking },
      { name: "never seen: a grey ring about the white flour", svg: greyRing(76, 100.4, 9, 3.6), keys: showFor(0.16, 0.19, 0.26, 0.28) },
      { name: "Abu Hazim's voice: did you have sieves", svg: arcs(23.4, 99.6, VOICE), keys: showFor(0.265, 0.275, 0.39, 0.4), loop: speaking },
      { name: "a sieve, faint", svg: big(sieve(76, 99.6), 76, 99.6, k), keys: track({ opacity: [[0.28, 0], [0.31, 0.6], [0.52, 0.6], [0.54, 0]] }) },
      { name: "Sahl's voice: he never saw a sieve", svg: arcsLeft(40.6, 99.6, VOICE), keys: showFor(0.395, 0.405, 0.52, 0.53), loop: speaking },
      { name: "never seen: a grey ring about the sieve", svg: greyRing(76, 100.4, 9.6, 4), keys: showFor(0.41, 0.44, 0.52, 0.54) },
      { name: "Abu Hazim's voice: how did you eat barley", svg: arcs(23.4, 99.6, VOICE), keys: showFor(0.525, 0.535, 0.65, 0.66), loop: speaking },
      { name: "a mill of two round stones", svg: big(millStones(mill[0], mill[1]), mill[0], mill[1], k) },
      {
        name: "the mill's wooden handle",
        svg: handle(n(mill[0] + 3.2 * k)),
        keys: track({
          xy: [
            [0.656, 0, 0],
            [0.664, -5.1, -0.5],
            [0.672, -10.2, 0],
            [0.68, -5.1, 0.5],
            [0.688, 0, 0],
            [0.696, -5.1, -0.5],
            [0.704, -10.2, 0],
            [0.71, 0, 0]
          ]
        })
      },
      {
        name: "barley, unsifted",
        svg: big(barleyHeap(78, 103.6), 78, 103.6, k),
        origin: { x: 78, y: 103.6 },
        keys: track({
          opacity: [
            [0.535, 0],
            [0.56, 1]
          ],
          scale: [
            [0.656, 1],
            [0.71, 0.3]
          ]
        })
      },
      { name: "Sahl's voice: we ground it and blew on it", svg: arcsLeft(40.6, 99.6, VOICE), keys: showFor(0.655, 0.665, 0.89, 0.9), loop: speaking },
      {
        name: "ground: barley flour, with its husk",
        svg: big(flourHeap(flourAt[0], flourAt[1]), flourAt[0], flourAt[1], k),
        origin: { x: flourAt[0], y: flourAt[1] },
        keys: track({
          opacity: [
            [0.664, 0],
            [0.672, 1],
            [0.925, 1],
            [0.94, 0]
          ],
          scale: [
            [0.664, 0.2],
            [0.71, 1]
          ]
        })
      },
      {
        name: "blowing: a puff of air over the flour",
        svg: `<path d="M106 96.4 Q111 94.8 116 96.4 M107.4 99 Q112.4 97.4 117.4 99" stroke="#FFFFFF" stroke-width="0.8" fill="none" stroke-linecap="round"/>`,
        keys: track({
          opacity: [
            [0.772, 0],
            [0.778, 0.9],
            [0.8, 0.9],
            [0.81, 0]
          ],
          xy: [
            [0.772, 0, 0],
            [0.81, 14, -2.4]
          ]
        })
      },
      ...flakes.map(([dx, dy, from], i): SignPart => {
        const x = n(flourAt[0] - 2.6 + i * 1.3);
        const y = n(flourAt[1] - 2.8);
        return {
          name: `what flew off: a flake of husk ${i + 1}`,
          svg: `<ellipse cx="${x}" cy="${y}" rx="1" ry="0.45" fill="#B8963E"/>`,
          origin: { x, y },
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.004), 1],
              [at3(from + 0.022), 1],
              [at3(from + 0.03), 0]
            ],
            xy: [
              [at3(from + 0.004), 0, 0],
              [at3(from + 0.03), dx, dy]
            ],
            rotate: [
              [at3(from + 0.004), 0],
              [at3(from + 0.03), 160]
            ]
          })
        };
      }),
      { name: "what stayed: a soft ring about the flour", svg: care(flourAt[0], flourAt[1] - 1.4, 8, 2.8, "#FFFFFF"), keys: showFor(0.81, 0.83, 0.91, 0.925), loop: soft },
      { name: "a jug of water by the flour", svg: `<g transform="translate(${jugAt[0]} ${jugAt[1]}) scale(-1.4 1.4) translate(${-jugAt[0]} ${-jugAt[1]})">${jug(jugAt[0], jugAt[1])}</g>`, keys: showAt(0.89, 0.9) },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `wet it: a drop from the jug ${i + 1}`,
          svg: drop(127.6, 98.4),
          keys: track({
            xy: [
              [at3(0.9 + i * 0.008), 0, 0],
              [at3(0.906 + i * 0.008), -3.2, -1.6],
              [at3(0.912 + i * 0.008), -7.6 + i * 1.6, 4]
            ],
            opacity: [
              [at3(0.9 + i * 0.008), 0],
              [at3(0.902 + i * 0.008), 1],
              [at3(0.91 + i * 0.008), 1],
              [at3(0.914 + i * 0.008), 0]
            ]
          })
        })
      ),
      { name: "the flour, wet: dough", svg: big(dough(flourAt[0], flourAt[1]), flourAt[0], flourAt[1], k), keys: showAt(0.925, 0.94) },
      { name: "ate it: a warm glow about the two places", svg: glow(32, 100.4, 8, WARM, 0.28), keys: showAt(0.94, 0.958) }
    ],
    words: [
      { text: "Abu Hazim: did he eat white flour?", from: 0.02, to: 0.125 },
      { text: "Sahl said: he never saw white flour", from: 0.14, to: 0.245 },
      { text: "I said: did you have sieves then?", from: 0.26, to: 0.375 },
      { text: "Sahl said: he never saw a sieve", from: 0.39, to: 0.505 },
      { text: "I said: how did you eat barley unsifted?", from: 0.52, to: 0.635 },
      { text: "Sahl said: we ground it and blew on it", from: 0.65, to: 0.755 },
      { text: "what flew off flew, and what stayed", from: 0.77, to: 0.875 },
      { text: "we wet it and ate it", from: 0.89, to: 1 }
    ]
  };
}

// Enough for one more. Abu Hurairah said: the Messenger of Allah ﷺ said: the food of two is enough for three, and the
// food of three is enough for four (Sahih al-Bukhari 5392). No one is drawn: by a home, on a cloth, food on a dish, and
// the places of two, one on each side; a soft white ring comes about the two and the food. A third place comes and sits
// before the cloth; the white ring fades, a soft golden ring comes about the three, and glints show on the food: enough.
// The golden ring fades and a soft white ring comes about the three and the food. A fourth place comes and sits behind
// the cloth; the white ring fades, a soft golden ring comes about the four, glints show on the food again, and a warm
// glow comes about them all.
function enoughForMore(): SignArt {
  const foodAt: [number, number] = [80, 103.6];
  const glints = (from: number, hide: number | undefined, label: string): SignPart[] =>
    [
      [77.4, 100.2],
      [81.4, 99.4],
      [83.6, 101.2]
    ].map(([x, y], i) => ({
      name: `${label}: a glint on the food ${i + 1}`,
      svg: sparkle(x, y, 0.8, "#FFE7A0"),
      keys: hide === undefined ? showAt(at3(from + i * 0.01), at3(from + 0.008 + i * 0.01)) : showFor(at3(from + i * 0.01), at3(from + 0.008 + i * 0.01), hide, at3(hide + 0.015)),
      loop: { move: "twinkle", ms: 900, low: 0.4, phase: i / 3 }
    }));
  return {
    kind: "enough-for-more",
    ms: 8000,
    parts: [
      ...day(26, 100, 8000),
      ...palms([
        [6, 97, 13],
        [148, 96, 12]
      ]),
      { name: "a home", svg: home(32, 100, 22, 15) },
      { name: "a sheep grazing by the home", svg: animal("sheep", 128, 101.4, 0.08, true), loop: { move: "bob", ms: 2600, y: 0.3 } },
      { name: "a cloth spread", svg: cloth(64, 96, 102.6) },
      { name: "food on a dish", svg: food(foodAt[0], foodAt[1]) },
      { name: "the places of two", svg: someone(67.6, 104) + someone(92.4, 104) },
      { name: "the food of two: a soft white ring about them", svg: care(80, 104, 16, 3.4, "#FFFFFF"), keys: showFor(0.05, 0.09, 0.37, 0.4), loop: soft },
      { name: "a third place, coming to sit", svg: someone(80, 107.8), keys: track({ xy: [[0.26, 56, -1.4], [0.36, 0, 0]], opacity: [[0.255, 0], [0.27, 1]] }) },
      { name: "enough for three: a soft golden ring about them", svg: care(80, 105, 17, 4.6, SOFT_GOLD), keys: showFor(0.37, 0.4, 0.5, 0.53), loop: soft },
      ...glints(0.38, 0.5, "enough for three"),
      { name: "the food of three: a soft white ring about them", svg: care(80, 105, 17, 4.6, "#FFFFFF"), keys: showFor(0.5, 0.54, 0.84, 0.86), loop: soft },
      { name: "a fourth place, coming to sit", svg: someone(80, 99.6), keys: track({ xy: [[0.74, -49.8, 0.4], [0.84, 0, 0]], opacity: [[0.735, 0], [0.75, 1]] }) },
      { name: "enough for four: a soft golden ring about them", svg: care(80, 103.8, 18, 6.2, SOFT_GOLD), keys: showAt(0.85, 0.88), loop: soft },
      ...glints(0.86, undefined, "enough for four"),
      { name: "a warm glow about them all", svg: glow(80, 103, 8, WARM, 0.28), keys: showAt(0.9, 0.93) }
    ],
    words: [
      { text: "He said: the food of two", from: 0.02, to: 0.24 },
      { text: "is enough for three", from: 0.255, to: 0.48 },
      { text: "and the food of three", from: 0.495, to: 0.72 },
      { text: "is enough for four", from: 0.735, to: 1 }
    ]
  };
}

export const VISIT_ART = {
  "gift-in-ihram": giftInIhram,
  "cloak-to-give": cloakToGive,
  "water-for-jabir": waterForJabir,
  "visit-to-the-youth": visitToTheYouth,
  "room-for-a-sheep": roomForASheep,
  "husk-blown": huskBlown,
  "enough-for-more": enoughForMore
} as const;
