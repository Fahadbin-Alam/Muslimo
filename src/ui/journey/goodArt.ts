import { animalAt, cloud, glow, n, peaks, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { care, lightIn, palms, sparkRising, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { prayerMat } from "./lovedArt";
import { lookLine } from "./truthArt";
import { dish } from "./worthArt";
import { saddled, showAt, showFor } from "./roadArt";
import { kabah } from "./historyArt";
import { roofOnTrunks } from "./gentleArt";

/**
 * Good: greeting the masjid with two rak'ahs before sitting; his dua for Madinah, twice the blessing of Makkah; Anas's
 * Hajj on a plain packsaddle, as he made his, the same camel carrying his baggage; the reward written for one who falls
 * ill or travels, the like of what was done at home in good health; a dua for a brother behind his back, and the same
 * for the one who makes it; a time when no one will accept charity; and the one who makes peace between people, who is
 * no liar. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no
 * person is ever drawn, not even a hand, a foot or a face, and no one is drawn on a camel: where someone was, a ring or
 * a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn
 * for Allah or for the angel: a prayer is a spark that rises, and what is given is a light, glints and a soft golden
 * ring. No name or word is written.
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
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts, fill);

/** The road across the land, from x 0 to 160 about y 104. */
const ROAD = `<path d="M0 101.4 Q80 99.8 160 101 L160 107.8 Q80 106.4 0 108 Z" fill="#EEDCAE"/>`;

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** `svg` drawn `s` times its size about (x, y). */
const bigger = (x: number, y: number, s: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${svg}</g>`;

/** The masjid of Madinah, small at the left, and his place, a golden ring, by it. */
const masjidAtLeft = (): SignPart[] => [
  { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.36) },
  { name: "his place, a golden ring", svg: ring(10.6, 100.4, 2.2, GOLD) }
];

/** His voice by his place at the left. */
const HIS_VOICE = arcs(12.8, 97.4, GOLD);

// Greeting the masjid. Abu Qatadah said that the Messenger of Allah ﷺ said: when one of you enters the masjid, let him
// pray two rak'ahs before he sits (Sahih al-Bukhari 444; and: let him not sit until he has prayed two rak'ahs, 1167).
// No one is drawn: in the masjid, with its wall of mud brick, its roof of palm leaves on palm trunks and its floor of
// small pebbles, his place, a golden ring, sits in the shade with the places of the folk, Abu Qatadah's among them. Abu
// Qatadah's voice speaks, and his. A place shows in the doorway and comes in across the open floor; a prayer mat shows
// under it, and two sparks rise from it, one and then the other, two rak'ahs, each leaving a glint over the mat. Only
// then does it go and sit in the shade with the folk, and a warm glow and a soft golden ring come about it.
function greetTheMasjid(): SignArt {
  const his: [number, number] = [16, 102.6];
  const qatadah: [number, number] = [41, 105.4];
  const doorway: [number, number] = [142.2, 96.6];
  const prays: [number, number] = [104, 101.6];
  const sits: [number, number] = [66, 104.6];
  const pebbles = Array.from({ length: 30 }, (_, i) => `<ellipse cx="${n(3 + ((i * 41) % 154))}" cy="${n(100.6 + ((i * 7) % 9) * 1.05)}" rx="0.5" ry="0.3" fill="#CDB384"/>`).join("");
  const into = (at: number, x: number, y: number): [number, number, number] => [at, n(x - doorway[0]), n(y - doorway[1])];
  return {
    kind: "greet-the-masjid",
    ms: 9000,
    parts: [
      ...daySky(126, 60, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([
        [98, 86, 22],
        [124, 85.4, 24],
        [152, 86, 20]
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
      { name: "the shade under the roof", svg: `<path d="M2 98 L76 98 L81 108 L0 108 Z" fill="#000000" opacity="0.14"/><rect x="0" y="88.4" width="76" height="10.6" fill="#000000" opacity="0.1"/>` },
      { name: "the roof of palm leaves on palm trunks", svg: roofOnTrunks(2, 74) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the folk's places, sitting in the shade", svg: someone(31, 104.4, 1.4) + someone(57, 104.6, 1.4) },
      { name: "Abu Qatadah's place", svg: someone(qatadah[0], qatadah[1], 1.4) },
      { name: "Abu Qatadah's voice: he said", svg: arcs(n(qatadah[0] + 1.8), n(qatadah[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.19, 0.2), loop: speaking },
      { name: "his voice: let him pray two rak'ahs", svg: arcs(n(his[0] + 2.6), n(his[1] - 3.8), GOLD), keys: showAt(0.1, 0.11), loop: speaking },
      { name: "the prayer: a prayer mat under it", svg: bigger(prays[0], n(prays[1] + 2.4), 0.7, prayerMat(prays[0], n(prays[1] + 2.4))), keys: showAt(0.5, 0.51) },
      {
        name: "one entering: a place in the doorway, coming in",
        svg: someone(doorway[0], doorway[1], 1.5),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.29, 1]
          ],
          xy: [into(0.3, doorway[0], doorway[1]), into(0.42, prays[0], prays[1]), into(0.75, prays[0], prays[1]), into(0.84, sits[0], sits[1])]
        })
      },
      { name: "the first rak'ah: a spark rising from it", svg: sparkle(102.2, 98.2, 1.4, "#FFE7A0"), keys: sparkRising(0.52, 0.58, 9), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the first rak'ah: a glint left over the mat", svg: sparkle(102.2, 88.6, 1.6, "#FFD866"), keys: showAt(0.58, 0.59), loop: twinkle() },
      { name: "the second rak'ah: a spark rising from it", svg: sparkle(105.8, 98.2, 1.4, "#FFE7A0"), keys: sparkRising(0.6, 0.66, 9), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the second rak'ah: a glint left over the mat", svg: sparkle(105.8, 88.6, 1.6, "#FFD866"), keys: showAt(0.66, 0.67), loop: twinkle(1500) },
      { name: "sitting after: a warm glow about it", svg: glow(sits[0], sits[1], 5, WARM, 0.32), keys: showAt(0.86, 0.88), loop: soft },
      { name: "a soft golden ring about it", svg: care(sits[0], n(sits[1] + 0.6), 3.6, 1.6, SOFT_GOLD), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: [
      { text: "Abu Qatadah: he said:", from: 0.02, to: 0.245 },
      { text: "When one of you enters the masjid,", from: 0.26, to: 0.485 },
      { text: "let him pray two rak'ahs", from: 0.5, to: 0.725 },
      { text: "before sitting", from: 0.74, to: 1 }
    ]
  };
}

// Twice the blessing. Anas said that the Prophet ﷺ said: O Allah, put in Madinah twice the blessing You put in Makkah
// (Sahih al-Bukhari 1885). Nothing is drawn for Allah, and no one is drawn: Makkah on the left, the Ka'bah and its
// homes under its dark mountains; Madinah on the right, its masjid and its homes among palms, and his place, a golden
// ring, by the masjid, with Anas's place. Anas's voice speaks, and his; a spark rises from his place, and a soft golden
// wash comes over Madinah. Then one small light shows over the Ka'bah and over each home of Makkah; over Madinah one
// light shows over the masjid and each home, and then a second beside each: twice. Soft golden rings come about the two
// towns, glints over Madinah, and a warm glow about his place.
function twiceTheBlessing(): SignArt {
  const his: [number, number] = [108.4, 103.4];
  const anas: [number, number] = [119, 104.8];
  // Where the lights show: over the Ka'bah and the homes of Makkah, and over the masjid and the homes of Madinah.
  const makkah: [number, number][] = [
    [27.2, 85.4],
    [44, 86.6],
    [59, 89.8]
  ];
  const madinah: [number, number][] = [
    [108.4, 84.2],
    [134, 86.6],
    [150, 88.6]
  ];
  return {
    kind: "twice-the-blessing",
    ms: 9000,
    parts: [
      ...daySky(140, 52, 9000),
      { name: "a hill of Madinah", svg: peaks([[124, 11, 34]], 61, "#C9B38C", false) },
      { name: "the land", svg: plainLand() },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [12, 30, 20],
            [40, 22, 18],
            [62, 14, 14]
          ],
          84,
          "#A08E7B",
          false
        )
      },
      { name: "the Ka'bah", svg: kabah(22, 98.6, 8) },
      { name: "the homes of Makkah", svg: home(44, 99.4, 11, 8) + home(59, 101, 9, 6.4) },
      { name: "the masjid of Madinah", svg: madinahMasjid(94, 99.4, 0.6) },
      { name: "the homes of Madinah", svg: home(134, 98.6, 10, 7) + home(150, 100.6, 10, 7) },
      ...palms([
        [89, 100.6, 12],
        [159, 100.4, 12]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Anas ibn Malik's place", svg: someone(anas[0], anas[1], 1.5) },
      { name: "Anas's voice: he said", svg: arcs(n(anas[0] + 1.8), n(anas[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.19, 0.2), loop: speaking },
      { name: "his voice: put in Madinah twice the blessing", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.1, 0.11), loop: speaking },
      { name: "his dua: a spark rising from his place", svg: sparkle(his[0], n(his[1] - 4), 1.4, "#FFE7A0"), keys: sparkRising(0.27, 0.37, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "over Madinah: a soft golden wash", svg: wash(122, 96, 40, 13, WARM, 0.14), keys: showAt(0.38, 0.42), loop: soft },
      { name: "Makkah's blessing: a soft golden wash over Makkah", svg: wash(38, 96, 34, 13, WARM, 0.1), keys: showAt(0.51, 0.54), loop: soft },
      { name: "Makkah's blessing: a small light over the Ka'bah and over each home", svg: makkah.map(([x, y]) => lightIn(x, y, 2.8)).join(""), keys: showAt(0.51, 0.53), loop: soft },
      { name: "Madinah's blessing: a small light over the masjid and over each home", svg: madinah.map(([x, y]) => lightIn(n(x - 2.6), y, 2.8)).join(""), keys: showAt(0.57, 0.59), loop: soft },
      { name: "twice: a second light beside each", svg: madinah.map(([x, y]) => lightIn(n(x + 2.6), y, 2.8)).join(""), keys: showAt(0.63, 0.65), loop: soft },
      { name: "a soft golden ring about Makkah", svg: care(40, 101.6, 26, 5, SOFT_GOLD), keys: showAt(0.76, 0.78), loop: soft },
      { name: "a soft golden ring about Madinah", svg: care(124, 102, 36, 5.4, GOLD), keys: showAt(0.8, 0.82), loop: soft },
      {
        name: "glints over Madinah",
        svg: glints(
          [
            [100, 80],
            [118, 79],
            [142, 82],
            [156, 84]
          ],
          1.3,
          "#FFD866"
        ),
        keys: showAt(0.86, 0.87),
        loop: twinkle()
      },
      { name: "a warm glow about his place", svg: glow(his[0], his[1], 5, WARM, 0.32), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: [
      { text: "Anas: he said:", from: 0.02, to: 0.245 },
      { text: "O Allah, put in Madinah", from: 0.26, to: 0.485 },
      { text: "twice what You put in Makkah", from: 0.5, to: 0.725 },
      { text: "of the blessing", from: 0.74, to: 1 }
    ]
  };
}

/**
 * A plain packsaddle of wood, in the picture card's own units: a pad of felt over the hump, a board along its side, a
 * post before and a post behind, and a girth under the belly.
 */
const PACKSADDLE =
  `<path d="M28.6 34.4 Q42 7 55.4 34.4 L53.6 35.4 Q42 13 30.4 35.4 Z" fill="#CDB487"/>` +
  `<path d="M43.2 23 L44.8 50.6" stroke="#8A6A44" stroke-width="1.3"/>` +
  `<path d="M31.4 29.4 L53 29.4" stroke="#8A5A33" stroke-width="2" stroke-linecap="round"/>` +
  `<path d="M33.6 29.4 L31.2 17.6 M50.8 29.4 L53.2 17.4" stroke="#7A4E2A" stroke-width="1.9" stroke-linecap="round"/>`;

/** Baggage, in the card's units: a sack of food and a water skin, hung from the packsaddle's board. */
const BAGGAGE =
  `<path d="M33.6 30.2 L41.2 30.2 L42.4 42 Q37.6 44.6 32.6 42 Z" fill="#C9A66B"/><path d="M33.4 33.4 L41.4 33.4" stroke="#7A5A30" stroke-width="0.9"/>` +
  `<ellipse cx="48" cy="37.6" rx="4" ry="5.6" fill="#8A5A2E"/><path d="M48 32 L48 30" stroke="#5E3C1E" stroke-width="1.4" stroke-linecap="round"/>`;

/** What is drawn on a camel, in the card's units, set where a camel `s` times its size with its feet at (x, y), facing right, carries it. */
const onCamel = (x: number, y: number, s: number, extra: string) => `<g transform="translate(${n(x - 50 * s)} ${n(y - 73 * s)}) scale(${s})">${extra}</g>`;

/** The camel of the picture cards with a plain packsaddle on its hump, its feet at (x, y), facing right, no one on it. */
const packsaddled = (x: number, y: number, s: number) => animalAt("camel", n(x - 50 * s), n(y - 73 * s), s) + onCamel(x, y, s, PACKSADDLE);

// A plain saddle. Thumamah ibn Abdullah ibn Anas said: Anas made Hajj on a packsaddle, and he was no miser; and he told
// that the Messenger of Allah ﷺ made Hajj on a packsaddle, and it carried his baggage too (Sahih al-Bukhari 1517). No
// one is drawn, and no one on any camel: two ways go toward the Ka'bah under the mountains of Makkah. Thumamah's voice
// speaks; on the far way Anas's camel shows, with a plain packsaddle on its hump, and goes on, Anas's place going with
// it. A warm glow and glints come about Anas's place: no miser (the hadith tells of no deed here, so none is drawn).
// Anas's voice speaks; on the near way his camel shows, with the same plain packsaddle, his place, a golden ring, going
// with it. A soft golden ring and glints come about his packsaddle, and a faint golden line goes to it from Anas's:
// alike. Then his baggage shows hung on that same packsaddle, a soft golden ring and glints come about it, and a warm
// glow about his place.
function aPlainSaddle(): SignArt {
  const anasCamel: [number, number] = [12, 91.6];
  const anasWalk = 28;
  const anas: [number, number] = [28, 94.4];
  const hisCamel: [number, number] = [40, 106.6];
  const hisWalk = 56;
  const his: [number, number] = [60, 107.6];
  const hisS = 0.32;
  const [saddleX, saddleY] = [n(hisCamel[0] + hisWalk + (42 - 50) * hisS), n(hisCamel[1] + (22 - 73) * hisS)];
  const [bagsX, bagsY] = [saddleX, n(hisCamel[1] + (38 - 73) * hisS)];
  const anasSaddle: [number, number] = [n(anasCamel[0] + anasWalk + (42 - 50) * 0.26), n(anasCamel[1] + (22 - 73) * 0.26)];
  const comes = (from: number) =>
    track({
      opacity: [
        [from, 0],
        [n(from + 0.02), 1]
      ],
      xy: [
        [0.45, 0, 0],
        [0.55, hisWalk, 0]
      ]
    });
  return {
    kind: "a-plain-saddle",
    ms: 12000,
    parts: [
      ...daySky(28, 92, 12000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [104, 20, 20],
            [146, 28, 20]
          ],
          84,
          "#A08E7B",
          false
        )
      },
      { name: "the Ka'bah", svg: kabah(130, 91.4, 8.4) },
      { name: "the far way to Makkah", svg: `<path d="M0 89.6 Q64 88.8 126 89.6 L126 93.2 Q64 92.4 0 93.6 Z" fill="#EEDCAE"/>` },
      { name: "the near way to Makkah", svg: `<path d="M0 103.6 Q80 102.4 160 103.2 L160 109.6 Q80 108.6 0 110.2 Z" fill="#EEDCAE"/>` },
      { name: "Thumamah ibn Abdullah's place", svg: someone(6, 100.4, 1.4) },
      { name: "Thumamah's voice: Anas made Hajj", svg: arcs(7.8, 97.2, ITS_VOICE), keys: showFor(0.03, 0.04, 0.345, 0.355), loop: speaking },
      {
        name: "Anas's camel, a plain packsaddle on it, no one on it",
        svg: packsaddled(anasCamel[0], anasCamel[1], 0.26),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ],
          xy: [
            [0.05, 0, 0],
            [0.15, anasWalk, 0]
          ]
        })
      },
      {
        name: "Anas ibn Malik's place, going with it",
        svg: someone(anas[0], anas[1], 1.5),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ],
          xy: [
            [0.05, 0, 0],
            [0.15, anasWalk, 0]
          ]
        })
      },
      { name: "no miser: a warm glow about Anas's place", svg: glow(n(anas[0] + anasWalk), anas[1], 5, WARM, 0.3), keys: showAt(0.23, 0.25), loop: soft },
      {
        name: "glints over Anas's place",
        svg: glints(
          [
            [n(anas[0] + anasWalk - 2.4), n(anas[1] - 4.6)],
            [n(anas[0] + anasWalk + 1.6), n(anas[1] - 4)]
          ],
          0.9,
          "#FFD866"
        ),
        keys: showAt(0.34, 0.35),
        loop: twinkle()
      },
      { name: "Anas's voice: he made Hajj on a packsaddle", svg: arcs(n(anas[0] + anasWalk + 1.8), n(anas[1] - 3.2), ITS_VOICE), keys: showAt(0.42, 0.43), loop: speaking },
      { name: "his camel, the same plain packsaddle on it, no one on it", svg: packsaddled(hisCamel[0], hisCamel[1], hisS), keys: comes(0.42) },
      { name: "his place, a golden ring, going with it", svg: ring(his[0], his[1], 2.4, GOLD), keys: comes(0.42) },
      { name: "on a packsaddle: a soft golden ring about his packsaddle", svg: care(saddleX, saddleY, 6.4, 3.4, GOLD), keys: showAt(0.61, 0.63), loop: soft },
      {
        name: "glints over his packsaddle",
        svg: glints(
          [
            [n(saddleX - 3), n(saddleY - 5)],
            [n(saddleX + 3.6), n(saddleY - 5.4)]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.65, 0.66),
        loop: twinkle()
      },
      { name: "alike: a faint golden line from Anas's packsaddle to his", svg: lookLine(n(anasSaddle[0] + 2.4), n(anasSaddle[1] - 1), n(saddleX - 2.8), n(saddleY - 2), 70, GOLD), keys: showAt(0.69, 0.71) },
      { name: "his baggage, hung on the same packsaddle", svg: onCamel(n(hisCamel[0] + hisWalk), hisCamel[1], hisS, BAGGAGE), keys: showAt(0.81, 0.83) },
      { name: "a soft golden ring about his baggage", svg: care(bagsX, bagsY, 5.4, 4.2, SOFT_GOLD), keys: showAt(0.86, 0.88), loop: soft },
      {
        name: "glints over his baggage",
        svg: glints(
          [
            [n(bagsX - 4), n(bagsY - 3)],
            [n(bagsX + 4.6), n(bagsY - 2.4)]
          ],
          0.9,
          "#FFD866"
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle(1500)
      },
      { name: "a warm glow about his place", svg: glow(n(his[0] + hisWalk), his[1], 5, WARM, 0.3), keys: showAt(0.93, 0.95), loop: soft }
    ],
    words: [
      { text: "Thumamah: Anas made Hajj on a packsaddle", from: 0.02, to: 0.2 },
      { text: "and Anas was no miser.", from: 0.215, to: 0.395 },
      { text: "Anas told that he made Hajj", from: 0.41, to: 0.59 },
      { text: "on a packsaddle,", from: 0.605, to: 0.785 },
      { text: "and it carried his baggage too", from: 0.8, to: 1 }
    ]
  };
}

// Ill or travelling. Abu Burdah said: I heard Abu Musa say, many times, that the Messenger of Allah ﷺ said: when a
// servant falls ill or travels, there is written for him the like of what he used to do at home and in good health
// (Sahih al-Bukhari 2996). No one is drawn: by the masjid of Madinah, his place, a golden ring, and the place of Abu
// Musa al-Ash'ari. Two places stand by their homes along the road, each with a row of glints over it, the good it has
// done; a spark rises from each, and a glint comes in each row. Then one falls ill: a pale haze comes about it, and it
// goes to rest on a mat at its door. The other travels: it sets out along the road with a camel, no one on it. Yet the
// glints keep coming in both rows, one and then another, though neither can do as it did. Soft golden rings come about
// the glints that were and about the new ones, alike; a warm glow comes about each home, a faint trace of each place
// shows where it stood at home and in good health, and a golden ring comes about each whole row.
function illOrTravelling(): SignArt {
  const musa: [number, number] = [21.4, 102.4];
  const ill: [number, number] = [50, 101.2];
  const rests: [number, number] = [38.2, 100.4];
  const away: [number, number] = [106, 100.8];
  const gone: [number, number] = [138, 105.2];
  const rowY = 79;
  const illRow = [42, 46, 50, 54, 58];
  const awayRow = [98, 102, 106, 110, 114];
  const glint = (x: number) => lightIn(x, rowY, 2.2);
  const toRest = track({
    xy: [
      [0.25, 0, 0],
      [0.3, n(rests[0] - ill[0]), n(rests[1] - ill[1])]
    ]
  });
  const setsOut = (dx: number, dy: number) =>
    track({
      xy: [
        [0.28, 0, 0],
        [0.35, dx, dy]
      ]
    });
  return {
    kind: "ill-or-travelling",
    ms: 10000,
    parts: [
      ...daySky(132, 70, 10000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the road", svg: ROAD },
      ...masjidAtLeft(),
      { name: "al-Ash'ari's place", svg: someone(musa[0], musa[1], 1.4) },
      { name: "the home of the one who falls ill", svg: home(40, 96, 12, 9) },
      { name: "the home of the one who travels", svg: home(96, 95.4, 12, 9) },
      { name: "al-Ash'ari's voice: he said", svg: arcs(n(musa[0] + 1.8), n(musa[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.15, 0.16), loop: speaking },
      { name: "his voice: there is written for him the like", svg: HIS_VOICE, keys: showAt(0.05, 0.06), loop: speaking },
      { name: "what was done before: glints in each row", svg: [illRow[0], illRow[1], awayRow[0], awayRow[1]].map(glint).join(""), loop: twinkle(1600) },
      { name: "a deed: a spark rising from the first place", svg: sparkle(ill[0], n(ill[1] - 3.8), 1.3, "#FFE7A0"), keys: sparkRising(0.07, 0.13, 18), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a deed: a spark rising from the second place", svg: sparkle(away[0], n(away[1] - 3.8), 1.3, "#FFE7A0"), keys: sparkRising(0.07, 0.13, 18), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "done at home in good health: a glint in each row", svg: glint(illRow[2]) + glint(awayRow[2]), keys: showAt(0.13, 0.14), loop: twinkle(1400) },
      { name: "resting: a small mat at its door", svg: `<path d="M${n(rests[0] - 4.4)} ${n(rests[1] + 1.2)} L${n(rests[0] + 4.4)} ${n(rests[1] + 1.2)} L${n(rests[0] + 3.6)} ${n(rests[1] + 2.8)} L${n(rests[0] - 3.6)} ${n(rests[1] + 2.8)} Z" fill="#B98F5A"/>`, keys: showAt(0.29, 0.3) },
      { name: "falls ill: a pale haze about its place", svg: wash(ill[0], ill[1], 5.4, 4.4, "#DDE3EA", 0.24), keys: track({ opacity: [[0.22, 0], [0.24, 1]], xy: [[0.25, 0, 0], [0.3, n(rests[0] - ill[0]), n(rests[1] - ill[1])]] }) },
      { name: "the place that falls ill, going to rest at its door", svg: someone(ill[0], ill[1], 1.5), keys: toRest },
      { name: "a camel for the road, a saddle cloth on it, no one on it", svg: saddled(124, 104.4, 0.2), keys: setsOut(26, 0) },
      { name: "the place that travels, setting out along the road", svg: someone(away[0], away[1], 1.5), keys: setsOut(n(gone[0] - away[0]), n(gone[1] - away[1])) },
      { name: "written for it: a new glint in the first row", svg: glint(illRow[3]), keys: showAt(0.42, 0.43), loop: twinkle(1500) },
      { name: "written for it: a new glint in the second row", svg: glint(awayRow[3]), keys: showAt(0.45, 0.46), loop: twinkle(1500) },
      { name: "and another in the first row", svg: glint(illRow[4]), keys: showAt(0.49, 0.5), loop: twinkle(1700) },
      { name: "and another in the second row", svg: glint(awayRow[4]), keys: showAt(0.52, 0.53), loop: twinkle(1700) },
      { name: "what it used to do: soft golden rings about the glints that were", svg: care(46, rowY, 6.6, 2.4, SOFT_GOLD) + care(102, rowY, 6.6, 2.4, SOFT_GOLD), keys: track({ opacity: [[0.61, 0], [0.63, 1], [0.88, 1], [0.9, 0]] }), loop: soft },
      { name: "the like: soft golden rings about the new glints", svg: care(56, rowY, 4.6, 2.4, SOFT_GOLD) + care(112, rowY, 4.6, 2.4, SOFT_GOLD), keys: track({ opacity: [[0.67, 0], [0.69, 1], [0.88, 1], [0.9, 0]] }), loop: soft },
      { name: "at home: a warm glow about each home", svg: glow(40, 91.6, 7, WARM, 0.2) + glow(96, 91, 7, WARM, 0.2), keys: showAt(0.81, 0.83), loop: soft },
      {
        name: "in good health: a faint trace of each place where it stood",
        svg: someone(ill[0], ill[1], 1.5) + someone(away[0], away[1], 1.5),
        keys: track({
          opacity: [
            [0.85, 0],
            [0.87, 0.45]
          ]
        })
      },
      { name: "a golden ring about each whole row", svg: care(50, rowY, 11.4, 3.6, GOLD) + care(106, rowY, 11.4, 3.6, GOLD), keys: showAt(0.9, 0.92), loop: soft }
    ],
    words: [
      { text: "Abu Musa: he said:", from: 0.02, to: 0.2 },
      { text: "When a servant falls ill or travels,", from: 0.215, to: 0.395 },
      { text: "there is written for him the like", from: 0.41, to: 0.59 },
      { text: "of what the servant used to do", from: 0.605, to: 0.785 },
      { text: "at home and in good health", from: 0.8, to: 1 }
    ]
  };
}

// For an absent brother. The Messenger of Allah ﷺ said: no Muslim servant prays for his brother behind his back but the
// angel says: and for you the same (Sahih Muslim 2732). Nothing is drawn for Allah or for the angel, and no one is
// drawn: by the masjid of Madinah, his place, a golden ring, and his voice. By its home, a place on a prayer mat; a
// spark rises from it. Far off, over a rise of the land, another place stands by its own home, not knowing. A faint
// golden line goes from the one who prays over the rise to the far one, and a soft golden ring and glints come about
// the far one; the line fades to a trace. Then the same soft golden ring and the same glints come about the one who
// prayed, and a warm glow.
function forAnAbsentBrother(): SignArt {
  const prays: [number, number] = [48, 101.4];
  const far: [number, number] = [146, 99.6];
  const ringAbout = (x: number, y: number) => care(x, n(y + 0.6), 4.4, 2.2, GOLD);
  const glintsOver = (x: number, y: number) =>
    glints(
      [
        [n(x - 2.4), n(y - 4.2)],
        [n(x + 2.4), n(y - 4.2)]
      ],
      1.3,
      "#FFD866"
    );
  return {
    kind: "for-an-absent-brother",
    ms: 9000,
    parts: [
      ...daySky(126, 60, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      {
        name: "a rise of the land between them",
        svg: `<path d="M60 101.6 Q72 86.4 82 87.6 Q94 88.8 104 101.6 Z" fill="#D6BC8A"/><path d="M82 87.6 Q94 88.8 104 101.6 L92 101.6 Q88 92 82 87.6 Z" fill="#000000" opacity="0.08"/>`
      },
      ...masjidAtLeft(),
      { name: "the home of the one who prays", svg: home(32, 96, 11, 8) },
      { name: "the far home", svg: home(136, 94.6, 11, 8) },
      ...palms([[154, 96.4, 12]]),
      { name: "a prayer mat", svg: bigger(prays[0], n(prays[1] + 2), 0.55, prayerMat(prays[0], n(prays[1] + 2))) },
      { name: "the place of the one who prays", svg: someone(prays[0], prays[1], 1.5) },
      { name: "the far place, not knowing", svg: someone(far[0], far[1], 1.5) },
      { name: "his voice: no Muslim prays for another", svg: HIS_VOICE, keys: showAt(0.03, 0.04), loop: speaking },
      { name: "a dua: a spark rising from the one who prays", svg: sparkle(prays[0], n(prays[1] - 3.8), 1.4, "#FFE7A0"), keys: sparkRising(0.08, 0.18, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "behind its back: a faint golden line over the rise to the far place",
        svg: lookLine(n(prays[0] + 2.4), n(prays[1] - 1.8), n(far[0] - 2.4), n(far[1] - 1.4), 70, GOLD),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.3, 1],
            [0.52, 1],
            [0.55, 0.3]
          ]
        })
      },
      { name: "a soft golden ring about the far place", svg: ringAbout(far[0], far[1]), keys: showAt(0.33, 0.35), loop: soft },
      { name: "glints over the far place", svg: glintsOver(far[0], far[1]), keys: showAt(0.38, 0.39), loop: twinkle() },
      { name: "and for you the same: a soft golden ring about the one who prays", svg: ringAbout(prays[0], prays[1]), keys: showAt(0.75, 0.77), loop: soft },
      { name: "the same glints over the one who prays", svg: glintsOver(prays[0], prays[1]), keys: showAt(0.8, 0.81), loop: twinkle() },
      { name: "a warm glow about the one who prays", svg: glow(prays[0], prays[1], 5, WARM, 0.32), keys: showAt(0.85, 0.87), loop: soft }
    ],
    words: [
      { text: "He said: no Muslim servant prays", from: 0.02, to: 0.245 },
      { text: "for his brother behind his back", from: 0.26, to: 0.485 },
      { text: "but the angel says:", from: 0.5, to: 0.725 },
      { text: "and for you the same", from: 0.74, to: 1 }
    ]
  };
}

// None to accept it. Harithah ibn Wahb said: I heard the Prophet ﷺ say: give charity, for a time will come to you when
// a man walks with his charity and finds no one to accept it. A man will say: had you brought it yesterday, I would
// have accepted it; but today I have no need of it (Sahih al-Bukhari 1411; and 1424). No one is drawn: by the masjid of
// Madinah, his place, a golden ring, and Harithah's place; homes along a lane, a place by each. Harithah's voice
// speaks, and his. Today a sack goes from the first place to the third, which has an empty dish, and a warm glow comes
// about it. Then the sun goes on across the sky, a time comes, and a full sack shows by every home; the empty dish
// goes. The first place sets out again with a sack, and goes from place to place: a soft white ring shows about each,
// none in need. The third place's voice speaks; a faint trace of its empty dish of yesterday shows, and fades; and
// glints come over its full sack, and a soft white ring about the sack no one takes.
function noneToAcceptIt(): SignArt {
  const harithah: [number, number] = [21.4, 102.4];
  const homes: [number, number][] = [
    [38, 95.4],
    [70, 95],
    [102, 95.4],
    [134, 95]
  ];
  const places = homes.map(([x, y]): [number, number] => [n(x + 8), n(y + 5.6)]);
  const [first, second, third] = places;
  const carrier: [number, number, number][] = [
    [0.33, 0, 0],
    [0.38, n(second[0] - 4 - first[0]), n(second[1] + 3.8 - first[1])],
    [0.46, n(second[0] - 4 - first[0]), n(second[1] + 3.8 - first[1])],
    [0.51, n(third[0] - 6.4 - first[0]), n(third[1] + 3.8 - first[1])]
  ];
  const carried: [number, number] = [n(first[0] + 3.4), n(first[1] + 2.6)];
  const [carriedX, carriedY] = [n(carried[0] + carrier[3][1]), n(carried[1] + carrier[3][2])];
  return {
    kind: "none-to-accept-it",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun, going on across the sky",
        svg: sun(30, 18),
        keys: track({
          xy: [
            [0.3, 0, 0],
            [0.38, 84, 2]
          ]
        })
      },
      { name: "a cloud", svg: cloud(96, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the lane", svg: ROAD },
      ...masjidAtLeft(),
      { name: "Harithah ibn Wahb's place", svg: someone(harithah[0], harithah[1], 1.4) },
      { name: "the homes along the lane", svg: homes.map(([x, y]) => home(x, y, 11, 8)).join("") },
      { name: "a place by each home", svg: places.slice(1).map(([x, y]) => someone(x, y, 1.5)).join("") },
      {
        name: "its empty dish of yesterday",
        svg: bigger(n(third[0] + 4.8), n(third[1] + 1.4), 1.3, dish(n(third[0] + 4.8), n(third[1] + 1.4))),
        keys: track({
          opacity: [
            [0.3, 1],
            [0.32, 0],
            [0.73, 0],
            [0.75, 0.6],
            [0.87, 0.6],
            [0.89, 0]
          ]
        })
      },
      { name: "Harithah's voice: I heard him say", svg: arcs(n(harithah[0] + 1.8), n(harithah[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.095, 0.105), loop: speaking },
      { name: "his voice: give charity", svg: HIS_VOICE, keys: showAt(0.06, 0.07), loop: speaking },
      {
        name: "today: a sack going from the first place to the one in need",
        svg: sack(carried[0], n(first[1] + 1.4), 0.7),
        keys: track({
          opacity: [
            [0.16, 0],
            [0.17, 1],
            [0.3, 1],
            [0.32, 0]
          ],
          xy: [
            [0.17, 0, 0],
            [0.22, n(third[0] - 3.6 - carried[0]), 0]
          ]
        })
      },
      {
        name: "a warm glow about the one in need",
        svg: glow(third[0], third[1], 5, WARM, 0.3),
        keys: track({
          opacity: [
            [0.225, 0],
            [0.24, 1],
            [0.3, 1],
            [0.32, 0]
          ]
        })
      },
      { name: "a time comes: a full sack by every home", svg: homes.map(([x, y]) => sack(n(x - 8), n(y + 1.2), 0.75)).join(""), keys: showAt(0.3, 0.32) },
      { name: "the first place, setting out with its charity", svg: someone(first[0], first[1], 1.5), keys: track({ xy: carrier }) },
      {
        name: "its charity: a sack going with it",
        svg: sack(carried[0], carried[1], 0.7),
        keys: track({
          opacity: [
            [0.32, 0],
            [0.33, 1]
          ],
          xy: carrier
        })
      },
      { name: "none to accept it: a soft white ring about the second place", svg: care(second[0], n(second[1] + 0.6), 3.4, 1.6, "#FFFFFF"), keys: showAt(0.44, 0.45) },
      { name: "none to accept it: a soft white ring about the third place", svg: care(third[0], n(third[1] + 0.6), 3.4, 1.6, "#FFFFFF"), keys: showAt(0.51, 0.52) },
      { name: "the third place's voice: had you brought it", svg: arcs(n(third[0] + 1.8), n(third[1] - 3.2), ITS_VOICE), keys: showAt(0.59, 0.6), loop: speaking },
      {
        name: "no need of it: glints over its full sack",
        svg: glints(
          [
            [n(homes[2][0] - 10), n(homes[2][1] - 7)],
            [n(homes[2][0] - 6), n(homes[2][1] - 6.2)]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle()
      },
      { name: "a soft white ring about the sack no one takes", svg: care(carriedX, n(carriedY - 0.6), 3.2, 1.4, "#FFFFFF"), keys: showAt(0.93, 0.94) }
    ],
    words: [
      { text: "Harithah ibn Wahb: I heard him say:", from: 0.02, to: 0.145 },
      { text: "Give charity, for a time will come to you", from: 0.16, to: 0.285 },
      { text: "when a man walks with his charity", from: 0.3, to: 0.425 },
      { text: "and finds none to accept it.", from: 0.44, to: 0.565 },
      { text: "A man will say: had you brought it", from: 0.58, to: 0.705 },
      { text: "yesterday, I would have accepted it,", from: 0.72, to: 0.845 },
      { text: "but today I have no need of it", from: 0.86, to: 1 }
    ]
  };
}

// Makes peace. Umm Kulthum bint Uqbah said that she heard the Messenger of Allah ﷺ say: the liar is not the one who
// makes peace between people, passing on good or saying good (Sahih al-Bukhari 2692). No one is drawn: by the masjid of
// Madinah, his place, a golden ring, and Umm Kulthum's place. Two places stand apart by their homes, at odds: a grey
// ring about each, and a grey jagged line between them. Umm Kulthum's voice speaks, and his. A place comes from its
// home in the middle to the first, its voice speaks good, and the first one's grey ring goes; a soft golden ring comes
// about the peacemaker. A small golden light, a good word, goes with it from the first to the second, and the second
// one's grey ring goes. Its voice speaks good again, the grey line between them goes, and the two come together; a soft
// golden ring comes about them both, a warm glow about the peacemaker, and glints.
function makesPeace(): SignArt {
  const umm: [number, number] = [21.4, 102.6];
  const first: [number, number] = [58, 101.6];
  const second: [number, number] = [122, 101.6];
  const maker: [number, number] = [88.2, 95.2];
  const byFirst: [number, number] = [64, 103.6];
  const bySecond: [number, number] = [116, 103.8];
  const between: [number, number] = [90, 98.4];
  const d = (p: [number, number]): [number, number] => [n(p[0] - maker[0]), n(p[1] - maker[1])];
  const goes: [number, number, number][] = [
    [0.27, 0, 0],
    [0.35, ...d(byFirst)],
    [0.52, ...d(byFirst)],
    [0.62, ...d(bySecond)],
    [0.82, ...d(bySecond)],
    [0.88, ...d(between)]
  ];
  const zigzag = Array.from({ length: 10 }, (_, i) => `L${n(first[0] + 4.4 + ((second[0] - first[0] - 8.8) * (i + 1)) / 10)} ${i % 2 ? 102.8 : 99.8}`).join(" ");
  return {
    kind: "makes-peace",
    ms: 9000,
    parts: [
      ...daySky(132, 64, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...masjidAtLeft(),
      { name: "Umm Kulthum's place", svg: someone(umm[0], umm[1], 1.4) },
      { name: "the first home", svg: home(44, 95.4, 11, 8) },
      { name: "the second home", svg: home(138, 95.4, 11, 8) },
      { name: "the peacemaker's home", svg: home(90, 91.6, 10, 7) },
      { name: "at odds: a grey jagged line between them", svg: `<path d="M${n(first[0] + 4.4)} 101.4 ${zigzag}" stroke="#8C8C8C" stroke-width="0.6" stroke-dasharray="1.2 1" fill="none"/>`, keys: track({ opacity: [[0.77, 1], [0.8, 0]] }) },
      { name: "at odds: a grey ring about the first", svg: greyRing(first[0], n(first[1] + 0.6), 3.4, 1.8), keys: track({ opacity: [[0.39, 1], [0.42, 0]] }) },
      { name: "at odds: a grey ring about the second", svg: greyRing(second[0], n(second[1] + 0.6), 3.4, 1.8), keys: track({ opacity: [[0.64, 1], [0.67, 0]] }) },
      {
        name: "the first place, coming together",
        svg: someone(first[0], first[1], 1.5),
        keys: track({
          xy: [
            [0.82, 0, 0],
            [0.9, 20, 0.4]
          ]
        })
      },
      {
        name: "the second place, coming together",
        svg: someone(second[0], second[1], 1.5),
        keys: track({
          xy: [
            [0.82, 0, 0],
            [0.9, -20, 0.4]
          ]
        })
      },
      { name: "Umm Kulthum's voice: she heard him say", svg: arcs(n(umm[0] + 1.8), n(umm[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.19, 0.2), loop: speaking },
      { name: "she heard him: a faint line from her place to his", svg: lookLine(n(umm[0] - 1.8), n(umm[1] - 1), 13, 99.8, 96.6, "#9A8A78"), keys: showFor(0.06, 0.08, 0.19, 0.2) },
      { name: "his voice: the liar is not the one who makes peace", svg: HIS_VOICE, keys: showAt(0.1, 0.11), loop: speaking },
      { name: "the peacemaker's place", svg: someone(maker[0], maker[1], 1.5), keys: track({ xy: goes }) },
      {
        name: "no liar: a soft golden ring about the peacemaker",
        svg: care(maker[0], n(maker[1] + 0.6), 3.2, 1.6, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.44, 1]
          ],
          xy: goes
        }),
        loop: soft
      },
      { name: "its voice to the first: saying good", svg: arcsLeft(n(byFirst[0] - 1.8), n(byFirst[1] - 3.2), SOFT_GOLD), keys: showFor(0.36, 0.37, 0.43, 0.44), loop: speaking },
      {
        name: "passing on good: a small golden light going from the first to the second",
        svg: sparkle(byFirst[0], n(byFirst[1] - 4.6), 1.2, "#FFD866"),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.51, 1],
            [0.64, 1],
            [0.67, 0]
          ],
          xy: [
            [0.52, 0, 0],
            [0.62, n(bySecond[0] - byFirst[0]), n(bySecond[1] - byFirst[1])]
          ]
        }),
        loop: twinkle(900)
      },
      { name: "its voice to the second: saying good", svg: arcs(n(bySecond[0] + 1.8), n(bySecond[1] - 3.2), SOFT_GOLD), keys: showFor(0.75, 0.76, 0.8, 0.81), loop: speaking },
      { name: "peace: a soft golden ring about them both", svg: care(between[0], 102.6, 16, 3.6, GOLD), keys: showAt(0.91, 0.93), loop: soft },
      { name: "a warm glow about the peacemaker", svg: glow(between[0], between[1], 5, WARM, 0.32), keys: showAt(0.93, 0.95), loop: soft },
      {
        name: "glints over them",
        svg: glints(
          [
            [78, 97],
            [90, 93.4],
            [102, 97]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.95, 0.96),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Umm Kulthum: she heard him say:", from: 0.02, to: 0.245 },
      { text: "The liar is not the one who makes peace", from: 0.26, to: 0.485 },
      { text: "between people, passing on good", from: 0.5, to: 0.725 },
      { text: "or saying good", from: 0.74, to: 1 }
    ]
  };
}

export const GOOD_ART = {
  "greet-the-masjid": greetTheMasjid,
  "twice-the-blessing": twiceTheBlessing,
  "a-plain-saddle": aPlainSaddle,
  "ill-or-travelling": illOrTravelling,
  "for-an-absent-brother": forAnAbsentBrother,
  "none-to-accept-it": noneToAcceptIt,
  "makes-peace": makesPeace
};
