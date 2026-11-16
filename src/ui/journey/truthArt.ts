import { cloud, glow, n, rainStreaks, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GREY, prayerMat } from "./lovedArt";
import { kabah } from "./historyArt";
import { dish } from "./worthArt";
import { food } from "./hopeArt";
import { EVENING } from "./heartArt";
import { GOLD, hills, land, someone, SPARK, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, DAWN, dayAround, lightIn, palms, sparkRising, tent, track } from "./daysArt";

/**
 * Truth sought and truth told, drawn as the scenes of faith are (faithArt.ts): Abu Dharr, who came to Makkah to find
 * him; Jubayr, whose heart was about to fly at the recitation of at-Tur; Heraclius, who asked about him; Umar, kept safe
 * in Makkah, and the Muslims mighty since he became Muslim; Salman, who gave every right its due; the first masjid on
 * earth; and the rain at al-Hudaybiyah, from Allah's grace and not from the stars. Only the land, the sky, buildings,
 * things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, an eye
 * or a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice
 * is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky but the rain: a recitation, a
 * prayer or a thanks is a spark that rises, and a letter is a golden spark on its way, with no page drawn.
 */

/** A small light of faith at (x, y), `k` times its size: a soft glow with a spark in its middle. */
const faithIn = (x: number, y: number, k = 1) => glow(x, y, n(3.4 * k), WARM, 0.36) + sparkle(x, y, n(1.1 * k), SPARK);

/** A soft warm light about a place at (x, y): honor, strength or truth. */
const warmOn = (x: number, y: number, r = 4.4) => glow(x, y, r, WARM, 0.42);

/** A faint golden line from (x1, y1) to (x2, y2), bowed up to `top`: a look, or a hearing. */
const lookLine = (x1: number, y1: number, x2: number, y2: number, top: number, color = GOLD) =>
  `<path d="M${x1} ${y1} Q${n((x1 + x2) / 2)} ${top} ${x2} ${y2}" stroke="${color}" stroke-width="0.5" stroke-dasharray="1 1.2" fill="none" opacity="0.8"/>`;

/** A waterskin of leather, its foot's middle at (x, y). */
const waterskin = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${y} Q${n(x - 3.2)} ${n(y - 2.4)} ${n(x - 1.2)} ${n(y - 3.4)} L${n(x - 0.6)} ${n(y - 4.4)} L${n(x + 0.6)} ${n(y - 4.4)} L${n(x + 1.2)} ${n(y - 3.4)} Q${n(x + 3.2)} ${n(y - 2.4)} ${n(x + 2.4)} ${y} Z" fill="#8A5A2E"/>` +
  `<path d="M${n(x - 0.8)} ${n(y - 4.4)} L${n(x + 0.8)} ${n(y - 4.4)}" stroke="#5E3C1E" stroke-width="0.5"/><path d="M${n(x - 1.6)} ${n(y - 1.4)} Q${x} ${n(y - 0.6)} ${n(x + 1.6)} ${n(y - 1.4)}" stroke="#6E4724" stroke-width="0.4" fill="none"/>`;

/** The night over the scene: the sky dark, and a dark veil over the land. */
const NIGHT = `<rect width="160" height="62" fill="#1B2A52" opacity="0.9"/><rect y="62" width="160" height="58" fill="#1B2547" opacity="0.42"/>`;

/** Short grey strokes about a place at (x, y): hurt. */
const greyMarks = (x: number, y: number) =>
  [
    [-4.4, -2.6, -3, -1.4],
    [4.4, -2.8, 3, -1.6],
    [-4.6, 1.6, -3.2, 1],
    [4.6, 1.4, 3.2, 0.8],
    [0, -4.6, 0, -3.4]
  ]
    .map(([x1, y1, x2, y2]) => `<path d="M${n(x + x1)} ${n(y + y1)} L${n(x + x2)} ${n(y + y2)}" stroke="${GREY}" stroke-width="0.7" stroke-linecap="round"/>`)
    .join("");

/** A hall of columns at Ilya, from x to x + w, its floor at y and its roof `h` above it. */
const court = (x: number, y: number, w: number, h: number) => {
  let columns = "";
  for (let i = 0; i <= 6; i += 1) columns += `<rect x="${n(x + 1 + (i * (w - 3.8)) / 6)}" y="${n(y - h + 0.4)}" width="1.8" height="${n(h - 2)}" fill="#F4EEE2"/>`;
  return (
    `<rect x="${x}" y="${n(y - h)}" width="${w}" height="${n(h - 1.6)}" fill="#C9BBA2"/>` +
    columns +
    `<rect x="${n(x - 1.2)}" y="${n(y - 1.6)}" width="${n(w + 2.4)}" height="1.6" fill="#DCD0B8"/>` +
    `<rect x="${n(x - 1)}" y="${n(y - h - 1.6)}" width="${n(w + 2)}" height="2" fill="#E6DAC2"/>` +
    `<path d="M${n(x - 1.6)} ${n(y - h - 1.6)} L${n(x + w / 2)} ${n(y - h - 8.4)} L${n(x + w + 1.6)} ${n(y - h - 1.6)} Z" fill="#EADFC8"/>` +
    `<path d="M${n(x + 4)} ${n(y - h - 2.6)} L${n(x + w / 2)} ${n(y - h - 6.6)} L${n(x + w - 4)} ${n(y - h - 2.6)}" stroke="#D2C4A8" stroke-width="0.5" fill="none"/>`
  );
};

/** Al-Masjid al-Aqsa, far off: a long hall with a grey dome, its foot's middle at (x, y). */
const aqsa = (x: number, y: number) =>
  `<rect x="${n(x - 15)}" y="${n(y - 9)}" width="30" height="9" fill="#D9C7A4"/><rect x="${n(x + 2)}" y="${n(y - 9)}" width="13" height="9" fill="#000000" opacity="0.08"/>` +
  [-11, -7, -3, 5, 9].map((dx) => `<path d="M${n(x + dx - 1.1)} ${y} L${n(x + dx - 1.1)} ${n(y - 4)} Q${n(x + dx)} ${n(y - 5.6)} ${n(x + dx + 1.1)} ${n(y - 4)} L${n(x + dx + 1.1)} ${y} Z" fill="#7A6448"/>`).join("") +
  `<rect x="${n(x - 4.6)}" y="${n(y - 11)}" width="9.2" height="2.2" fill="#CDBB96"/><path d="M${n(x - 4.6)} ${n(y - 11)} A4.6 4.6 0 0 1 ${n(x + 4.6)} ${n(y - 11)} Z" fill="#8E9AA6"/><path d="M${x} ${n(y - 15.6)} L${x} ${n(y - 17)}" stroke="#8E9AA6" stroke-width="0.5"/>`;

/** A small prayer mat, its middle at (x, y). */
const smallMat = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${n(y + 1.3)} L${n(x + 3.4)} ${n(y + 1.3)} L${n(x + 4.6)} ${n(y - 1.2)} L${n(x - 3.2)} ${n(y - 1.2)} Z" fill="#B5473A"/><path d="M${n(x - 3.6)} ${n(y + 0.8)} L${n(x + 2.8)} ${n(y + 0.8)} L${n(x + 3.8)} ${n(y - 0.7)} L${n(x - 2.6)} ${n(y - 0.7)} Z" stroke="#E8C45A" stroke-width="0.35" fill="none"/>`;

/** Small pools of water on the wet land, at the given middles. */
const pools = (list: [number, number, number][]) =>
  list.map(([x, y, rx]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${n(rx * 0.28)}" fill="#9CC4E4" opacity="0.85"/><ellipse cx="${n(x - rx * 0.3)}" cy="${n(y - rx * 0.06)}" rx="${n(rx * 0.3)}" ry="0.3" fill="#FFFFFF" opacity="0.7"/>`).join("");

// Abu Dharr comes to find him. Ibn Abbas said: when the news of the Prophet's ﷺ sending reached Abu Dharr, he sent his
// brother to the valley of Makkah, who came back and said: I saw him enjoining good character, and saying words that
// are not poetry. Abu Dharr took his provision and a waterskin of his, and came to Makkah. Ali saw him and knew that he
// was a stranger; on the third day he said: follow me, and enter where I enter. He heard him ﷺ and became Muslim on the
// spot, then went to the masjid and called out as loud as he could: I bear witness that none has the right to be
// worshipped but Allah, and that Muhammad is the Messenger of Allah. The people beat him, and al-Abbas came and knelt
// over him and said: woe to you, do you not know that he is of Ghifar, and that the road of your trade to Sham is
// through them? (Sahih al-Bukhari 3861; and 3522, as Abu Dharr told it.) No one is drawn, and no blow: far off are the
// tents of Ghifar, and in Makkah the Ka'bah and the home where he was, his place a golden ring. The place of the one Abu
// Dharr sent comes back to him and speaks. Abu Dharr's place takes its waterskin along the way to Makkah. Night comes;
// Ali's place comes, a faint golden line goes from it to Abu Dharr's place, and a cool ring shows about it, a stranger.
// Day comes; Ali's place goes to the home, and Abu Dharr's follows it in. His voice speaks, and a light of faith comes
// in Abu Dharr's place. It goes back to the Ka'bah and calls out in gold, sparks rising. Grey places of Quraysh come
// close, grey marks show about it; al-Abbas's place comes over it and speaks, the road to Sham through Ghifar shows,
// the grey places go back, and a ring of care comes about Abu Dharr's place.
function abuDharrSeeks(): SignArt {
  const his: [number, number] = [84, 104.8];
  const start: [number, number] = [138, 102.4];
  const atMasjid: [number, number] = [50, 103.8];
  const within: [number, number] = [74, 104.6];
  const calling: [number, number] = [44, 104.2];
  const sent: [number, number] = [94, 103.8];
  const sentBack: [number, number] = [128, 102.6];
  const ali: [number, number] = [104, 104.4];
  const aliBy: [number, number] = [62, 104.6];
  const aliIn: [number, number] = [94, 104.4];
  const abbas: [number, number] = [44, 100.4];
  const crowd: [number, number, number, number][] = [
    [33, 101.6, -9, -1],
    [55, 101.6, 9, -1],
    [36, 107.6, -7, 0.4],
    [53, 107.8, 7, 0.2]
  ];
  const night = (from: number, to: number, hide: number, gone: number) => showWhile(from, to, hide, gone);
  return {
    kind: "abu-dharr-seeks",
    ms: 12000,
    parts: [
      ...dayAround([150, 16], 12000),
      { name: "the tents of Ghifar, far off", svg: tent(143, 95.6, 8, 6) + tent(153, 94.8, 7, 5.4) },
      { name: "a camel of Ghifar", svg: camel(152, 100.6, 0.1) },
      { name: "the Ka'bah", svg: kabah(20, 98, 12) },
      { name: "the home where he was", svg: home(84, 98, 15, 10) },
      { name: "a home of Makkah 1", svg: home(108, 97, 11, 8) },
      { name: "a home of Makkah 2", svg: home(60, 96.6, 10, 7.4) },
      { name: "the way from Ghifar to Makkah", svg: way("M46 104.6 Q92 100 136 101.4", "#FFF0C4", 1.1) },
      { name: "the night", svg: NIGHT, keys: night(0.29, 0.32, 0.43, 0.46) },
      {
        name: "the stars of the night",
        svg: stars([
          [12, 14],
          [38, 26],
          [64, 12],
          [96, 22],
          [124, 10],
          [146, 24]
        ]),
        keys: night(0.29, 0.32, 0.43, 0.46),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "the moon", svg: crescent(112, 30, 4.4, 2.2, "#FFF3B8"), keys: night(0.29, 0.32, 0.43, 0.46) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the place of the one he sent, coming back",
        svg: someone(sent[0], sent[1], 1.4),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.07, n(sentBack[0] - sent[0]), n(sentBack[1] - sent[1])]
          ]
        })
      },
      { name: "the voice of the one he sent", svg: arcs(n(sentBack[0] + 2.4), n(sentBack[1] - 3.8), VOICE), keys: showWhile(0.07, 0.08, 0.15, 0.16), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "good character, as it saw: a warm light by its voice", svg: glow(n(sentBack[0] + 5.4), n(sentBack[1] - 6.6), 3, WARM, 0.45), keys: showWhile(0.08, 0.1, 0.15, 0.16), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "Abu Dharr's place",
        svg: someone(start[0], start[1], 1.5),
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.24, n(atMasjid[0] - start[0]), n(atMasjid[1] - start[1])],
            [0.47, n(atMasjid[0] - start[0]), n(atMasjid[1] - start[1])],
            [0.52, n(within[0] - start[0]), n(within[1] - start[1])],
            [0.71, n(within[0] - start[0]), n(within[1] - start[1])],
            [0.75, n(calling[0] - start[0]), n(calling[1] - start[1])]
          ]
        })
      },
      {
        name: "his waterskin, taken along to Makkah",
        svg: waterskin(n(start[0] + 3.6), n(start[1] + 2.4)),
        keys: track({
          opacity: [
            [0.15, 0],
            [0.17, 1]
          ],
          xy: [
            [0.18, 0, 0],
            [0.24, n(atMasjid[0] - start[0]), n(atMasjid[1] - start[1])]
          ]
        })
      },
      {
        name: "Ali's place, coming by night",
        svg: someone(ali[0], ali[1], 1.5),
        keys: track({
          opacity: [
            [0.31, 0],
            [0.32, 1]
          ],
          xy: [
            [0.32, 0, 0],
            [0.35, n(aliBy[0] - ali[0]), n(aliBy[1] - ali[1])],
            [0.47, n(aliBy[0] - ali[0]), n(aliBy[1] - ali[1])],
            [0.51, n(aliIn[0] - ali[0]), n(aliIn[1] - ali[1])]
          ]
        })
      },
      { name: "seeing him: a faint golden line from Ali's place", svg: lookLine(n(aliBy[0] - 2.2), n(aliBy[1] - 1.8), n(atMasjid[0] + 2.2), n(atMasjid[1] - 1.8), 97), keys: showWhile(0.35, 0.37, 0.43, 0.45) },
      { name: "a stranger: a cool ring about Abu Dharr's place", svg: care(atMasjid[0], atMasjid[1], 3.8, 2.2, "#A9C2E0"), keys: showWhile(0.36, 0.38, 0.43, 0.45) },
      {
        name: "Ali's voice: follow me",
        svg: arcsLeft(n(aliBy[0] - 2.4), n(aliBy[1] - 3.8), VOICE),
        keys: track({
          opacity: [
            [0.44, 0],
            [0.45, 1],
            [0.5, 1],
            [0.51, 0]
          ],
          xy: [
            [0.47, 0, 0],
            [0.51, n(aliIn[0] - aliBy[0]), n(aliIn[1] - aliBy[1])]
          ]
        }),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      { name: "his voice", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.57, 0.58, 0.71, 0.72), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "Islam: a light of faith in Abu Dharr's place",
        svg: faithIn(within[0], within[1], 0.9),
        keys: track({
          opacity: [
            [0.61, 0],
            [0.65, 1]
          ],
          xy: [
            [0.71, 0, 0],
            [0.75, n(calling[0] - within[0]), n(calling[1] - within[1])]
          ]
        }),
        loop: { move: "twinkle", ms: 1500, low: 0.75 }
      },
      { name: "the shahadah, called out loud: a golden voice from Abu Dharr's place", svg: arcs(n(calling[0] + 2.6), n(calling[1] - 4), GOLD), keys: showWhile(0.75, 0.76, 0.85, 0.86), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      ...[0.76, 0.775].map((from, i): SignPart => ({ name: `the shahadah, called out: a golden spark rising ${i + 1}`, svg: sparkle(n(calling[0] + 1 + i * 2.4), n(calling[1] - 7), 1.4, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.025), 12) })),
      ...crowd.map(
        ([x, y, dx, dy], i): SignPart => ({
          name: `the crowd of Quraysh: a grey place coming close ${i + 1}`,
          svg: someone(x, y, 1.4, GREY),
          keys: track({
            opacity: [
              [0.85, 0],
              [0.86, 1],
              [0.93, 1],
              [0.96, 0]
            ],
            xy: [
              [0.85, dx, dy],
              [0.88, 0, 0],
              [0.93, 0, 0],
              [0.96, n(dx * 2), n(dy * 2)]
            ]
          })
        })
      ),
      { name: "beaten: grey marks about Abu Dharr's place", svg: greyMarks(calling[0], calling[1]), keys: showWhile(0.87, 0.88, 0.93, 0.95) },
      {
        name: "al-Abbas's place, coming over him",
        svg: someone(abbas[0], abbas[1], 1.5),
        keys: track({
          opacity: [
            [0.87, 0],
            [0.88, 1]
          ],
          xy: [
            [0.88, -32, 4.4],
            [0.91, 0, 0]
          ]
        })
      },
      { name: "al-Abbas's voice: he is of Ghifar", svg: arcs(n(abbas[0] + 2.6), n(abbas[1] - 3.8), VOICE), keys: showFrom(0.91, 0.92), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the road of their trade to Sham, through Ghifar", svg: way("M140 100.6 Q150 97.6 160 92.6", "#FFE7A0", 1.1), keys: showFrom(0.91, 0.94) },
      { name: "Ghifar: a soft light on its tents", svg: wash(148, 93.4, 10, 4.4, WARM, 0.2), keys: showFrom(0.92, 0.95), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "kept safe: a ring of care about Abu Dharr's place", svg: care(calling[0], n(calling[1] - 1.6), 6, 3.8), keys: showFrom(0.94, 0.97) }
    ],
    words: [
      { text: "His brother said: he enjoins good character", from: 0.02, to: 0.13 },
      { text: "He took his waterskin and came to Makkah", from: 0.15, to: 0.27 },
      { text: "Ali saw him, and knew he was a stranger", from: 0.29, to: 0.41 },
      { text: "Follow me, and enter where I enter", from: 0.43, to: 0.55 },
      { text: "He heard him, and became Muslim at once", from: 0.57, to: 0.69 },
      { text: "He called out the shahadah at the masjid", from: 0.71, to: 0.83 },
      { text: "Al-Abbas knelt over him: he is of Ghifar", from: 0.85, to: 1 }
    ]
  };
}

// My heart was about to fly. Jubayr ibn Mut'im said: I heard the Prophet ﷺ recite at-Tur in the Maghrib prayer, and
// when he reached the ayah: were they created by nothing, or were they themselves the creators? Or did they create the
// heavens and the earth? Nay, but they have no firm belief. Or do they have the treasures of your Lord, or are they the
// ones in control? My heart was about to fly (Sahih al-Bukhari 4854). No one is drawn: it is evening at the masjid of
// Madinah; his place is a golden ring before the rows, and his voice recites in gold. Jubayr's place is outside, by its
// camel, with a grey ring about it; a faint golden line goes to it from his place. With each ayah a golden spark rises:
// an empty ring shows in the air, with nothing in it; faint grey places show far off; the first stars of the evening
// come out and a soft light comes along the land; a grey shade comes over the far places, and the grey ring about
// Jubayr's place goes. Then a warm light comes in Jubayr's place, a small light lifts from it and flutters, and a ring
// of light comes about it.
function heartAlmostFlew(): SignArt {
  const his: [number, number] = [48, 101];
  const jubayr: [number, number] = [128, 103.4];
  const rows: [number, number][] = [];
  for (let i = 0; i < 5; i += 1) rows.push([62 + i * 9, 98.6]);
  for (let i = 0; i < 4; i += 1) rows.push([66.5 + i * 9, 104.4]);
  const far: [number, number][] = [
    [16, 77.4],
    [24, 79],
    [32, 77.6]
  ];
  const evening: [number, number][] = [
    [22, 16],
    [52, 24],
    [84, 14],
    [116, 22],
    [140, 12]
  ];
  const ayah = (from: number, i: number): SignPart => ({ name: `the ayah, recited: a golden spark rising ${i}`, svg: sparkle(his[0], n(his[1] - 7), 1.5, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.09), 12) });
  return {
    kind: "heart-almost-flew",
    ms: 12000,
    parts: [
      { name: "the evening sky, at Maghrib", svg: EVENING },
      { name: "the last light of the sun, low in the west", svg: wash(150, 60, 34, 7, "#FFB070", 0.16) },
      { name: "the evening, deepening", svg: `<rect width="160" height="36" fill="#454C88" opacity="0.42"/><rect y="36" width="160" height="26" fill="#8A7AA0" opacity="0.22"/>`, keys: showFrom(0.5, 0.55) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the earth: a soft light along the land", svg: wash(80, 96, 84, 14, "#FFF3C0", 0.12), keys: showFrom(0.56, 0.6) },
      ...palms([
        [9, 99, 13],
        [28, 99, 11]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(54, 92, 1.15) },
      { name: "the rows, praying Maghrib", svg: rows.map(([x, y]) => someone(x, y, 1.6)).join("") },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 3, GOLD) },
      { name: "his voice, reciting at-Tur", svg: arcs(n(his[0] + 3.6), n(his[1] - 4), GOLD), keys: showFrom(0.03, 0.04), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "Jubayr's camel", svg: camel(144, 104.4, 0.14) },
      { name: "Jubayr's place, outside", svg: someone(jubayr[0], jubayr[1], 1.6) },
      { name: "not yet Muslim: a grey ring about Jubayr's place", svg: care(jubayr[0], jubayr[1], 3.8, 2.1, GREY), keys: track({ opacity: [[0.68, 1], [0.73, 0]] }) },
      { name: "hearing: a faint golden line from his place to Jubayr's", svg: lookLine(n(his[0] + 3), n(his[1] - 2.6), n(jubayr[0] - 2.2), n(jubayr[1] - 1.8), 84), keys: showFrom(0.07, 0.1), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      ayah(0.18, 1),
      {
        name: "by nothing: an empty ring in the air, with nothing in it",
        svg: `<circle cx="90" cy="42" r="6" stroke="${GREY}" stroke-width="0.7" stroke-dasharray="1.4 1.2" fill="none"/>`,
        keys: track({
          opacity: [
            [0.2, 0],
            [0.24, 1],
            [0.33, 1],
            [0.37, 0.35]
          ]
        })
      },
      ayah(0.34, 2),
      ...far.map(([x, y], i): SignPart => ({ name: `themselves: a faint grey place far off ${i + 1}`, svg: someone(x, y, 1.1, GREY), keys: showFrom(at3(0.36 + i * 0.015), at3(0.375 + i * 0.015)) })),
      ayah(0.5, 3),
      ...evening.map(
        ([x, y], i): SignPart => ({ name: `the sky above: a first star of the evening ${i + 1}`, svg: stars([[x, y]]), keys: showFrom(at3(0.51 + i * 0.015), at3(0.525 + i * 0.015)), loop: { move: "twinkle", ms: 2000, low: 0.5, phase: i / 5 } })
      ),
      ayah(0.66, 4),
      { name: "no firm belief: a grey shade over the far places", svg: wash(24, 78.4, 14, 4.4, GREY, 0.1), keys: showFrom(0.67, 0.71) },
      { name: "about to fly: a warm light in Jubayr's place", svg: warmOn(jubayr[0], jubayr[1], 4.8) + sparkle(jubayr[0], jubayr[1], 1.2, SPARK), keys: showFrom(0.82, 0.85), loop: { move: "twinkle", ms: 1200, low: 0.7 } },
      {
        name: "about to fly: a small light lifting from Jubayr's place",
        svg: glow(jubayr[0], n(jubayr[1] - 4), 2.4, "#FFE7A0", 0.4) + sparkle(jubayr[0], n(jubayr[1] - 4), 1.3, "#FFE7A0"),
        keys: { at: [0, 0.86, 0.865, 0.92], opacity: [0, 0, 1, 1], y: [0, 0, -1, -6] },
        loop: { move: "bob", ms: 700, y: 1.2 }
      },
      { name: "a ring of light about Jubayr's place", svg: care(jubayr[0], n(jubayr[1] + 0.2), 5.4, 2.8), keys: showFrom(0.9, 0.94) }
    ],
    words: [
      { text: "Jubayr heard him recite at-Tur in Maghrib", from: 0.02, to: 0.15 },
      { text: "Were they created by nothing?", from: 0.17, to: 0.31 },
      { text: "Or were they themselves the creators?", from: 0.33, to: 0.47 },
      { text: "Or did they create the heavens and the earth?", from: 0.49, to: 0.63 },
      { text: "Nay, but they have no firm belief", from: 0.65, to: 0.79 },
      { text: "My heart was about to fly", from: 0.81, to: 1 }
    ]
  };
}

// Heraclius asks. Ibn Abbas said: Abu Sufyan told me that Heraclius sent for him while he was with a caravan of Quraysh,
// trading in Sham; they came to him at Ilya, and he called them into his court, with the great men of Rome about him.
// He asked: do the nobles of the people follow him, or the weak? I said: the weak. He asked: are they increasing, or
// decreasing? I said: increasing. He asked: did you ever accuse him of lying before he said what he said? I said: no.
// He said: and they are the followers of the messengers. Then he called for the letter of the Messenger of Allah ﷺ,
// and read it: accept Islam, and you will be safe; and: O People of the Book, come to a word common to us and you
// (Sahih al-Bukhari 7). No one is drawn, and no page: on the left are the caravan's camels and Abu Sufyan's place, and
// on the right the court at Ilya, Heraclius's place in it among the nobles' places. Far off is his golden ring. Abu
// Sufyan's place goes to the court, its companions' places behind it. Heraclius's voice asks and Abu Sufyan's voice
// answers: small places come by the far ring, then more; a warm light comes about the ring; a ring of care comes about
// the far places. Then the letter goes as a golden spark from the far ring to the court, a soft light comes in the
// court, and a level golden band shows between the two.
function heracliusAsks(): SignArt {
  const heraclius: [number, number] = [127, 96.4];
  const nobles: [number, number][] = [
    [111, 96.8],
    [118, 97.2],
    [136, 97.2],
    [143, 96.8]
  ];
  const abuSufyan: [number, number] = [96, 104.6];
  const from: [number, number] = [42, 103.4];
  const companions: [number, number, number, number][] = [
    [88, 102.4, 36, 104.8],
    [86, 107, 32, 107.2],
    [80, 104.8, 46, 107.4]
  ];
  const farRing: [number, number] = [26, 76.6];
  const poor: [number, number][] = [
    [19, 78.6],
    [33, 78.6],
    [26, 80.4]
  ];
  const more: [number, number][] = [
    [13, 80.8],
    [39, 80.8],
    [20, 82.4],
    [32, 82.4]
  ];
  const asks = (from: number, hide: number, i: number): SignPart => ({ name: `Heraclius's voice, asking ${i}`, svg: arcsLeft(n(heraclius[0] - 2.6), n(heraclius[1] - 3.8), VOICE), keys: showWhile(from, at3(from + 0.01), hide, at3(hide + 0.01)), loop: { move: "twinkle", ms: 900, low: 0.5 } });
  const answers = (from: number, hide: number, i: number): SignPart => ({ name: `Abu Sufyan's voice, answering ${i}`, svg: arcs(n(abuSufyan[0] + 2.4), n(abuSufyan[1] - 3.8), VOICE), keys: showWhile(from, at3(from + 0.01), hide, at3(hide + 0.01)), loop: { move: "twinkle", ms: 900, low: 0.5 } });
  return {
    kind: "heraclius-asks",
    ms: 12000,
    parts: [
      ...dayAround([136, 16], 12000),
      { name: "the court at Ilya", svg: court(102, 100.6, 50, 20) },
      { name: "Heraclius's place, in his court", svg: someone(heraclius[0], heraclius[1], 1.6) },
      ...nobles.map(([x, y], i): SignPart => ({ name: `the great of Rome about him: a place ${i + 1}`, svg: someone(x, y, 1.2) })),
      { name: "the caravan of Quraysh: its camels", svg: camel(16, 104.4, 0.13) + camel(30, 103.4, 0.12) },
      { name: "the caravan's goods", svg: sack(46, 107.6, 0.55) + sack(51, 107.2, 0.5) },
      { name: "the way to the court", svg: way("M46 103.6 Q72 101.4 98 104.4", "#FFF0C4", 1), keys: showFrom(0.03, 0.05) },
      {
        name: "Abu Sufyan's place, going to the court",
        svg: someone(abuSufyan[0], abuSufyan[1], 1.5),
        keys: track({
          xy: [
            [0.05, n(from[0] - abuSufyan[0]), n(from[1] - abuSufyan[1])],
            [0.09, 0, 0]
          ]
        })
      },
      ...companions.map(
        ([x, y, x0, y0], i): SignPart => ({
          name: `the rest of the caravan, behind it: a place ${i + 1}`,
          svg: someone(x, y, 1.3),
          keys: track({
            xy: [
              [0.06, n(x0 - x), n(y0 - y)],
              [0.1, 0, 0]
            ]
          })
        })
      ),
      { name: "far off, in the land of the Arabs: a golden ring, his place", svg: ring(farRing[0], farRing[1], 2, GOLD) },
      asks(0.15, 0.2, 1),
      answers(0.2, 0.29, 1),
      ...poor.map(([x, y], i): SignPart => ({ name: `the poor who follow him: a small place by the far ring ${i + 1}`, svg: someone(x, y, 1), keys: showFrom(at3(0.21 + i * 0.01), at3(0.22 + i * 0.01)) })),
      asks(0.3, 0.34, 2),
      answers(0.34, 0.43, 2),
      ...more.map(([x, y], i): SignPart => ({ name: `increasing: another place by the far ring ${i + 1}`, svg: someone(x, y, 1), keys: showFrom(at3(0.345 + i * 0.008), at3(0.355 + i * 0.008)) })),
      asks(0.44, 0.48, 3),
      answers(0.48, 0.57, 3),
      { name: "never a lie: a warm light about the far ring", svg: warmOn(farRing[0], farRing[1], 5), keys: showFrom(0.49, 0.52), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "Heraclius's voice: they are the followers of the messengers", svg: arcsLeft(n(heraclius[0] - 2.6), n(heraclius[1] - 3.8), VOICE), keys: showWhile(0.58, 0.59, 0.71, 0.72), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the followers of the messengers: a ring of care about the far places", svg: care(26, 80, 18, 4), keys: showFrom(0.6, 0.64) },
      { name: "the letter's way, from the far ring to the court", svg: way(`M${farRing[0] + 2} ${farRing[1] + 0.4} L${heraclius[0] - 2} ${heraclius[1] - 8}`, GOLD, 0.6), keys: showFrom(0.71, 0.73) },
      {
        name: "his letter: a golden spark on its way to the court",
        svg: glow(farRing[0], farRing[1], 2.4, "#FFE7A0", 0.4) + sparkle(farRing[0], farRing[1], 1.4, "#FFE7A0"),
        keys: {
          at: [0, 0.72, 0.725, 0.77, 0.775],
          opacity: [0, 0, 1, 1, 0],
          x: [0, 0, 0, n(heraclius[0] - 2 - farRing[0]), n(heraclius[0] - 2 - farRing[0])],
          y: [0, 0, 0, n(heraclius[1] - 8 - farRing[1]), n(heraclius[1] - 8 - farRing[1])]
        }
      },
      { name: "the letter, read: a soft light in the court", svg: wash(127, 92, 20, 7, WARM, 0.14), keys: showFrom(0.77, 0.8), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "a word common to us and you: a level golden band between the two", svg: `<path d="M24 86 L104 86" stroke="${GOLD}" stroke-width="1" stroke-linecap="round"/>` + wash(64, 86, 42, 2.4, "#FFE7A0", 0.16), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "Heraclius called Abu Sufyan to his court", from: 0.02, to: 0.13 },
      { text: "Do nobles or the poor follow him? The poor", from: 0.15, to: 0.27 },
      { text: "Increasing or decreasing? I said: increasing", from: 0.29, to: 0.41 },
      { text: "Did you ever accuse him of lying? I said: no", from: 0.43, to: 0.55 },
      { text: "They are the followers of the messengers", from: 0.57, to: 0.69 },
      { text: "His letter: accept Islam, and be safe", from: 0.71, to: 0.83 },
      { text: "Come to a word common to us and you", from: 0.85, to: 1 }
    ]
  };
}

// Mighty since Umar. Abdullah ibn Umar said: while Umar was at home in fear, al-As ibn Wa'il came to him and said:
// what is the matter with you? He said: your people claim they will kill me because I became Muslim. He said: there is
// no way to you. Al-As went out and met the people streaming through the whole valley, and said: where are you going?
// They said: we want Ibn al-Khattab, who became Muslim. He said: there is no way to him. So the people went back
// (Sahih al-Bukhari 3864). Abdullah ibn Mas'ud said: we have been mighty since Umar became Muslim (Sahih al-Bukhari
// 3684). No one is drawn: in the valley of Makkah, by the Ka'bah, are the places of the few Muslims, and Umar's place
// by his home, a grey shade of fear over it. Al-As's place comes; Umar's voice speaks, and faint grey places show far
// off. Al-As's voice speaks, and a ring of care comes about the home. Al-As's place goes out, and grey places stream in
// through the whole valley; their voice speaks, his answers, and they go back; the grey shade goes. Then a warm glow of
// strength comes about Umar's place, a light comes in each place of the Muslims, and a ring of care about them all.
function mightySinceUmar(): SignArt {
  const umar: [number, number] = [46, 104.4];
  const al: [number, number] = [60, 104.6];
  const out = 28;
  const muslims: [number, number][] = [
    [18, 106.6],
    [24, 103.8],
    [30, 106.8],
    [12, 103.6]
  ];
  const far: [number, number][] = [
    [140, 103],
    [148, 105.6],
    [154, 102.6]
  ];
  const crowd: [number, number][] = [
    [98, 102.4],
    [104, 106.8],
    [110, 101.6],
    [116, 105.6],
    [122, 102],
    [128, 107],
    [134, 101.8],
    [140, 105.4],
    [146, 102.6],
    [152, 106.6]
  ];
  return {
    kind: "mighty-since-umar",
    ms: 12000,
    parts: [
      ...dayAround([24, 16], 12000),
      { name: "the Ka'bah", svg: kabah(4, 96, 10) },
      { name: "Umar's home", svg: home(40, 98, 16, 11) },
      { name: "a home of Makkah", svg: home(76, 97, 12, 8.4) },
      { name: "the way along the valley", svg: way("M54 104.8 L156 104.8", "#FFF0C4", 1) },
      ...muslims.map(([x, y], i): SignPart => ({ name: `the few Muslims of Makkah: a place ${i + 1}`, svg: someone(x, y, 1.3) })),
      { name: "Umar's place", svg: someone(umar[0], umar[1], 1.6) },
      {
        name: "in fear: a grey shade over Umar's home",
        svg: wash(43, 99, 14, 9.4, GREY, 0.1),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.07, 1],
            [0.77, 1],
            [0.8, 0]
          ]
        })
      },
      {
        name: "al-As's place",
        svg: someone(al[0], al[1], 1.5),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1]
          ],
          xy: [
            [0.05, 40, 0],
            [0.09, 0, 0],
            [0.43, 0, 0],
            [0.47, out, 0]
          ]
        })
      },
      { name: "Umar's voice: they will kill me", svg: arcs(n(umar[0] + 2.6), n(umar[1] - 4), VOICE), keys: showWhile(0.16, 0.17, 0.29, 0.3), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...far.map(([x, y], i): SignPart => ({ name: `a threat far off: a faint grey place ${i + 1}`, svg: someone(x, y, 1.2, GREY), keys: track({ opacity: [[0.18, 0], [0.22, 0.6], [0.43, 0.6], [0.45, 0]] }) })),
      { name: "al-As's voice: there is no way to you", svg: arcsLeft(n(al[0] - 2.4), n(al[1] - 3.8), VOICE), keys: showWhile(0.3, 0.31, 0.43, 0.44), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "kept safe: a ring of care about Umar's home",
        svg: care(43, 101.4, 13, 5),
        keys: track({
          opacity: [
            [0.33, 0],
            [0.37, 1],
            [0.86, 1],
            [0.89, 0]
          ]
        })
      },
      ...crowd.map(
        ([x, y], i): SignPart => ({
          name: `the crowd streaming through the valley: a grey place ${i + 1}`,
          svg: someone(x, y, 1.3, GREY),
          keys: track({
            opacity: [
              [0.44, 0],
              [0.46, 1],
              [0.75, 1],
              [0.8, 0]
            ],
            xy: [
              [0.44, 36, 0],
              [0.51, 0, 0],
              [0.75, 0, 0],
              [0.8, 30, 0]
            ]
          })
        })
      ),
      { name: "the crowd's voice: we want Ibn al-Khattab", svg: arcsLeft(n(crowd[0][0] - 2.4), n(crowd[0][1] - 3.8), GREY), keys: showWhile(0.58, 0.59, 0.71, 0.72), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "al-As's voice: there is no way to him", svg: arcs(n(al[0] + out + 2.4), n(al[1] - 3.8), VOICE), keys: showWhile(0.72, 0.73, 0.85, 0.86), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "mighty: a warm glow of strength about Umar's place", svg: warmOn(umar[0], umar[1], 5.8) + sparkle(umar[0], n(umar[1] - 5), 1.2, SPARK), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      ...muslims.map(
        ([x, y], i): SignPart => ({
          name: `mighty since Umar: a light in a place of the Muslims ${i + 1}`,
          svg: faithIn(x, y, 0.8),
          keys: showFrom(at3(0.88 + i * 0.015), at3(0.9 + i * 0.015)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 4 }
        })
      ),
      { name: "mighty together: a ring of care about them all", svg: care(29, 105.2, 22, 3.6), keys: showFrom(0.93, 0.97) }
    ],
    words: [
      { text: "Umar was at home, in fear", from: 0.02, to: 0.13 },
      { text: "Your people claim they will kill me", from: 0.15, to: 0.27 },
      { text: "Al-As said: there is no way to you", from: 0.29, to: 0.41 },
      { text: "The people streamed through the whole valley", from: 0.43, to: 0.55 },
      { text: "We want Ibn al-Khattab, who became Muslim", from: 0.57, to: 0.69 },
      { text: "There is no way to him. So they went back", from: 0.71, to: 0.83 },
      { text: "We stayed mighty since Umar became Muslim", from: 0.85, to: 1 }
    ]
  };
}

// Every right its due. Abu Juhayfah said: the Prophet ﷺ made Salman and Abu ad-Darda brothers. Salman visited Abu
// ad-Darda and saw Umm ad-Darda poorly dressed, and asked her why. She said: your brother Abu ad-Darda has no need of
// this world. Abu ad-Darda came and made him food, and said: eat, for I am fasting. He said: I will not eat until you
// eat; so he ate. When it was night, Abu ad-Darda went to stand in prayer, and Salman said: sleep; and he slept. At the
// end of the night Salman said: get up now, and both of them prayed. Salman said: your Lord has a right on you, your
// self has a right on you, and your family has a right on you, so give each one who has a right its right. He came to
// the Prophet ﷺ and told him, and the Prophet ﷺ said: Salman has spoken the truth (Sahih al-Bukhari 1968). No one is
// drawn: by Abu ad-Darda's home, Umm ad-Darda's place has a grey shade about it. Salman's place comes; her voice speaks.
// Abu ad-Darda's place comes, food shows on a dish, its voice and Salman's speak, and the food is eaten. Night comes:
// Abu ad-Darda's place goes to a prayer mat, Salman's voice speaks, and it comes back to rest, a soft ring about it. At
// the end of the night a faint light shows low in the east, both places go to the mats, and two sparks rise. Salman's
// voice speaks: a golden light comes on the mats, a soft light of rest where Abu ad-Darda slept, and a warm light about
// Umm ad-Darda's place, her grey shade gone. Day comes; Abu ad-Darda's place goes to his golden ring by the masjid, his
// voice speaks, and a warm glow comes on Salman's place.
function everyRight(): SignArt {
  const umm: [number, number] = [40, 104.6];
  const salman0: [number, number] = [102, 104.6];
  const salman: [number, number] = [60, 104.4];
  const darda0: [number, number] = [104, 105];
  const darda: [number, number] = [72, 104.8];
  // Where each one stands to pray, at the far end of its mat.
  const matA: [number, number] = [84, 102.6];
  const matB: [number, number] = [98, 102.6];
  const his: [number, number] = [114, 105];
  const toHim: [number, number] = [123, 105.4];
  const dishAt: [number, number] = [66, 107];
  const night = track({
    opacity: [
      [0.44, 0],
      [0.47, 1],
      [0.87, 1],
      [0.9, 0]
    ]
  });
  return {
    kind: "every-right",
    ms: 12000,
    parts: [
      ...dayAround([140, 16], 12000),
      ...palms([[8, 99, 13]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(118, 99, 0.8) },
      { name: "Abu ad-Darda's home", svg: home(48, 98, 18, 12) },
      { name: "a prayer mat 1", svg: prayerMat(matA[0], n(matA[1] + 3.6)) },
      { name: "a prayer mat 2", svg: prayerMat(matB[0], n(matB[1] + 3.6)) },
      { name: "Umm ad-Darda's place", svg: someone(umm[0], umm[1], 1.5) },
      { name: "uncared for: a grey shade about Umm ad-Darda's place", svg: glow(umm[0], umm[1], 4, GREY, 0.26), keys: track({ opacity: [[0.79, 1], [0.82, 0]] }) },
      { name: "the night", svg: NIGHT, keys: night },
      {
        name: "the stars of the night",
        svg: stars([
          [14, 16],
          [40, 26],
          [70, 12],
          [100, 24],
          [128, 12],
          [150, 26]
        ]),
        keys: night,
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "the moon", svg: crescent(30, 30, 4.4, 2.2, "#FFF3B8"), keys: night },
      { name: "the end of the night: a faint light low in the sky", svg: `<rect y="48" width="160" height="14" fill="#7F8FC2" opacity="0.34"/><rect y="55" width="160" height="7" fill="#B6BEDD" opacity="0.34"/>`, keys: track({ opacity: [[0.59, 0], [0.62, 1], [0.87, 1], [0.9, 0]] }) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Salman's place",
        svg: someone(salman0[0], salman0[1], 1.5),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.03, 1]
          ],
          xy: [
            [0.03, 0, 0],
            [0.07, n(salman[0] - salman0[0]), n(salman[1] - salman0[1])],
            [0.6, n(salman[0] - salman0[0]), n(salman[1] - salman0[1])],
            [0.63, n(matA[0] - salman0[0]), n(matA[1] - salman0[1])]
          ]
        })
      },
      { name: "Umm ad-Darda's voice: no need of this world", svg: arcs(n(umm[0] + 2.4), n(umm[1] - 3.8), VOICE), keys: showWhile(0.15, 0.16, 0.27, 0.28), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "Abu ad-Darda's place",
        svg: someone(darda0[0], darda0[1], 1.5),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.28, 1]
          ],
          xy: [
            [0.28, 0, 0],
            [0.3, n(darda[0] - darda0[0]), n(darda[1] - darda0[1])],
            [0.48, n(darda[0] - darda0[0]), n(darda[1] - darda0[1])],
            [0.5, n(matB[0] - darda0[0]), n(matB[1] - darda0[1])],
            [0.52, n(matB[0] - darda0[0]), n(matB[1] - darda0[1])],
            [0.535, n(darda[0] - darda0[0]), n(darda[1] - darda0[1])],
            [0.6, n(darda[0] - darda0[0]), n(darda[1] - darda0[1])],
            [0.63, n(matB[0] - darda0[0]), n(matB[1] - darda0[1])],
            [0.88, n(matB[0] - darda0[0]), n(matB[1] - darda0[1])],
            [0.92, n(toHim[0] - darda0[0]), n(toHim[1] - darda0[1])]
          ]
        })
      },
      { name: "a meal made for Salman, on a dish", svg: food(dishAt[0], dishAt[1]), keys: track({ opacity: [[0.3, 0], [0.31, 1], [0.37, 1], [0.39, 0]] }) },
      { name: "the dish, eaten from", svg: dish(dishAt[0], dishAt[1]), keys: showFrom(0.37, 0.39) },
      { name: "Abu ad-Darda's voice: eat, for I am fasting", svg: arcsLeft(n(darda[0] - 2.4), n(darda[1] - 3.8), VOICE), keys: showWhile(0.3, 0.31, 0.34, 0.35), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Salman's voice: I will not eat until you eat", svg: arcs(n(salman[0] + 2.4), n(salman[1] - 3.8), VOICE), keys: showWhile(0.34, 0.35, 0.44, 0.45), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Salman's voice: sleep", svg: arcs(n(salman[0] + 2.4), n(salman[1] - 3.8), VOICE), keys: showWhile(0.5, 0.51, 0.59, 0.6), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "sleep: a soft ring of rest about Abu ad-Darda's place", svg: care(darda[0], darda[1], 3.6, 2, "#B9C9E8"), keys: showWhile(0.53, 0.54, 0.59, 0.61) },
      ...[matA, matB].map(([x, y], i): SignPart => ({ name: `their prayer: a spark rising from a mat ${i + 1}`, svg: sparkle(x, n(y - 5), 1.4, "#FFE7A0"), keys: sparkRising(at3(0.635 + i * 0.01), at3(0.655 + i * 0.01), 10) })),
      { name: "Salman's voice: each has a right", svg: arcs(n(matA[0] + 2.4), n(matA[1] - 3.8), VOICE), keys: showWhile(0.72, 0.73, 0.87, 0.88), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "your Lord's right: a golden light on the prayer mats", svg: wash(91, 105, 15, 4.4, WARM, 0.18), keys: showFrom(0.74, 0.77), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "your self's right: a soft light of rest where Abu ad-Darda slept", svg: wash(darda[0], darda[1], 5.4, 2.8, "#E4ECFA", 0.3), keys: showFrom(0.76, 0.79), loop: { move: "twinkle", ms: 1600, low: 0.75, phase: 0.3 } },
      { name: "your family's right: a warm light about Umm ad-Darda's place", svg: warmOn(umm[0], umm[1], 4.2), keys: showFrom(0.78, 0.81), loop: { move: "twinkle", ms: 1600, low: 0.75, phase: 0.6 } },
      { name: "his voice: Salman has spoken the truth", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.92, 0.93), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the truth: a warm glow on Salman's place", svg: warmOn(matA[0], matA[1], 5) + sparkle(matA[0], n(matA[1] - 4.6), 1.1, SPARK), keys: showFrom(0.93, 0.96), loop: { move: "twinkle", ms: 1500, low: 0.75 } }
    ],
    words: [
      { text: "Salman visited his brother Abu ad-Darda", from: 0.02, to: 0.13 },
      { text: "Your brother has no need of this world", from: 0.14, to: 0.25 },
      { text: "Salman said: I will not eat until you eat", from: 0.27, to: 0.42 },
      { text: "At night he got up. Salman said: sleep", from: 0.44, to: 0.57 },
      { text: "At the end of the night, both of them prayed", from: 0.59, to: 0.7 },
      { text: "Your Lord, self and family each have a right", from: 0.72, to: 0.85 },
      { text: "He said: Salman has spoken the truth", from: 0.87, to: 1 }
    ]
  };
}

// The first masjid. Abu Dharr said: I said: O Messenger of Allah, which masjid was set up on earth first? He said:
// al-Masjid al-Haram. I said: then which? He said: al-Masjid al-Aqsa. I said: how long was between them? He said: forty
// years; then wherever the prayer reaches you, pray, for the virtue is in it (Sahih al-Bukhari 3366). No one is drawn:
// on a wide land his place is a golden ring, and Abu Dharr's place is near. Its voice asks, and his answers: the Ka'bah
// shows on the left, a soft light about it. It asks again, and his voice answers: al-Masjid al-Aqsa shows on the right,
// far off, with its grey dome, and a soft light about it. It asks how long, and forty small marks show between the two,
// ten at a time. Then small prayer mats show all over the land, each with a soft light.
function firstMasjid(): SignArt {
  const his: [number, number] = [70, 104.8];
  const abuDharr: [number, number] = [84, 104.4];
  const asks = (from: number, hide: number, i: number): SignPart => ({ name: `Abu Dharr's voice, asking ${i}`, svg: arcsLeft(n(abuDharr[0] - 2.4), n(abuDharr[1] - 3.8), VOICE), keys: showWhile(from, at3(from + 0.01), hide, at3(hide + 0.01)), loop: { move: "twinkle", ms: 900, low: 0.5 } });
  const marks: [number, number][] = [];
  for (let i = 0; i < 40; i += 1) {
    const t = i / 39;
    marks.push([n(38 + t * 78), n(84 - 18 * t * (1 - t) * 1.6)]);
  }
  const mats: [number, number][] = [
    [12, 106.4],
    [40, 103.6],
    [52, 108],
    [102, 106],
    [122, 103.4],
    [146, 106.6]
  ];
  return {
    kind: "first-masjid",
    ms: 10000,
    parts: [
      ...dayAround([88, 15], 10000),
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Dharr's place", svg: someone(abuDharr[0], abuDharr[1], 1.5) },
      asks(0.03, 0.21, 1),
      { name: "his voice, answering 1", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.21, 0.22, 0.41, 0.42), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a soft light about the Ka'bah", svg: glow(24, 88, 15, "#FFF3C0", 0.2), keys: showFrom(0.27, 0.31), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "the first: al-Masjid al-Haram, the Ka'bah", svg: kabah(14, 94, 14), keys: showFrom(0.23, 0.27) },
      { name: "about al-Masjid al-Haram: a ring of care", svg: care(24, 95.6, 15, 3.2), keys: showFrom(0.29, 0.33) },
      asks(0.41, 0.47, 2),
      { name: "his voice, answering 2", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showWhile(0.47, 0.48, 0.61, 0.62), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a soft light about al-Masjid al-Aqsa", svg: glow(132, 87, 14, "#FFF3C0", 0.2), keys: showFrom(0.53, 0.56), loop: { move: "twinkle", ms: 1800, low: 0.75, phase: 0.5 } },
      { name: "then al-Masjid al-Aqsa, far off", svg: aqsa(132, 93), keys: showFrom(0.49, 0.53) },
      asks(0.61, 0.66, 3),
      { name: "his voice, answering 3", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.66, 0.67), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...[0, 1, 2, 3].map(
        (k): SignPart => ({
          name: `forty years: ten small marks ${k + 1}`,
          svg: marks
            .slice(k * 10, k * 10 + 10)
            .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.55" fill="${GOLD}"/>`)
            .join(""),
          keys: showFrom(at3(0.68 + k * 0.02), at3(0.69 + k * 0.02))
        })
      ),
      ...mats.map(
        ([x, y], i): SignPart => ({
          name: `wherever the prayer reaches you: a small mat with a soft light ${i + 1}`,
          svg: smallMat(x, y) + glow(x, n(y - 1), 4, WARM, 0.3),
          keys: showFrom(at3(0.82 + i * 0.02), at3(0.83 + i * 0.02)),
          loop: { move: "twinkle", ms: 1600, low: 0.75, phase: i / 6 }
        })
      )
    ],
    words: [
      { text: "Which masjid was built first on earth?", from: 0.02, to: 0.19 },
      { text: "He said: al-Masjid al-Haram", from: 0.21, to: 0.39 },
      { text: "Then which? He said: al-Masjid al-Aqsa", from: 0.41, to: 0.59 },
      { text: "How long between them? Forty years", from: 0.61, to: 0.79 },
      { text: "Wherever the prayer reaches you, pray there", from: 0.81, to: 1 }
    ]
  };
}

// The rain and the stars. Zayd ibn Khalid al-Juhani said: the Messenger of Allah ﷺ led us in the Fajr prayer at
// al-Hudaybiyah, after rain in the night. When he finished, he faced the people and said: do you know what your Lord
// has said? They said: Allah and His Messenger know best. He said: this morning some of My servants believe in Me and
// some disbelieve. Whoever said: we were given rain by the grace of Allah and His mercy, believes in Me and disbelieves
// in the star; and whoever said: by such and such a star, disbelieves in Me and believes in the star (Sahih al-Bukhari
// 846). No one is drawn: it is the end of a rainy night at the camp of al-Hudaybiyah; rain falls from dark clouds, then
// stops, and small pools shine on the wet land. His place is a golden ring before the rows, and a calm light comes on
// them. The dawn brightens and the stars fade, all but one. His voice speaks, the voices of the rows answer, and his
// voice speaks again; two places show by the tents. The first one's voice speaks in gold, sparks of thanks rise, and a
// warm light comes in it, and on the pools. The second one's voice speaks in grey, a grey line goes up from it to the
// star, a grey shade comes about it, and the star fades in the dawn.
function rainAndStars(): SignArt {
  const his: [number, number] = [36, 101.6];
  const rows: [number, number][] = [];
  for (let i = 0; i < 5; i += 1) rows.push([48 + i * 9, 98.2]);
  for (let i = 0; i < 4; i += 1) rows.push([52.5 + i * 9, 104.2]);
  const first: [number, number] = [116, 104.4];
  const second: [number, number] = [142, 105.2];
  const star: [number, number] = [130, 20];
  const wet: [number, number, number][] = [
    [18, 107.6, 6],
    [62, 108.2, 5],
    [96, 107.4, 6.4],
    [132, 108.4, 5]
  ];
  return {
    kind: "rain-and-stars",
    ms: 12000,
    parts: [
      { name: "the dawn sky", svg: DAWN },
      {
        name: "the stars, fading as the dawn comes",
        svg: stars([
          [14, 12],
          [40, 22],
          [66, 10],
          [92, 18],
          [112, 8],
          [150, 16]
        ]),
        keys: track({ opacity: [[0.18, 1], [0.24, 0]] }),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "one bright star, high in the sky", svg: `<circle cx="${star[0]}" cy="${star[1]}" r="1.2" fill="#FFFFFF"/>` + glow(star[0], star[1], 3.4, "#FFFFFF", 0.14), keys: track({ opacity: [[0.92, 1], [0.96, 0]] }), loop: { move: "twinkle", ms: 1800, low: 0.7 } },
      { name: "the dawn, brightening: a warm light low over the hills", svg: wash(80, 58, 84, 9, "#FFD9A0", 0.12), keys: showFrom(0.18, 0.24) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "the tents of the camp at al-Hudaybiyah", svg: tent(122, 95.4, 9, 6.6) + tent(136, 94.2, 10, 7.4) + tent(150, 95.6, 9, 6.4) },
      { name: "the dark clouds of the night", svg: cloud(40, 22, 0.8, "#5A6478", 0.95) + cloud(110, 18, 0.9, "#4E586C", 0.95), keys: track({ opacity: [[0.06, 1], [0.1, 0]] }), loop: { move: "slide", ms: 12000 } },
      { name: "a rainy night: water falling on the camp", svg: rainStreaks(0, 160, 20, 110), clip: { x: 0, y: 26, w: 160, h: 82 }, keys: track({ opacity: [[0.05, 1], [0.08, 0]] }), loop: { move: "fall", ms: 650, period: 60 } },
      { name: "the wet land: small pools of water", svg: pools(wet), keys: showFrom(0.06, 0.09), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      { name: "the rows, praying Fajr", svg: rows.map(([x, y]) => someone(x, y, 1.6)).join("") },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 3, GOLD) },
      { name: "Fajr: a calm light on the rows", svg: wash(66, 101.4, 28, 7, "#FFF6D8", 0.14), keys: showFrom(0.09, 0.12) },
      { name: "his voice, facing them", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.2), VOICE), keys: showWhile(0.17, 0.18, 0.33, 0.34), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...[0, 2, 4].map(
        (k, i): SignPart => ({
          name: `the rows' voices, answering ${i + 1}`,
          svg: arcsLeft(n(rows[k][0] - 2.4), n(rows[k][1] - 3.8), VOICE),
          keys: showWhile(at3(0.34 + i * 0.01), at3(0.35 + i * 0.01), 0.49, 0.5),
          loop: { move: "twinkle", ms: 900, low: 0.5, phase: i / 3 }
        })
      ),
      { name: "his voice, telling what his Lord said", svg: arcs(n(his[0] + 3.6), n(his[1] - 4.2), VOICE), keys: showFrom(0.49, 0.5), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "this morning: the first place by the tents", svg: someone(first[0], first[1], 1.5), keys: showFrom(0.52, 0.54) },
      { name: "this morning: the second place by the tents", svg: someone(second[0], second[1], 1.5), keys: showFrom(0.54, 0.56) },
      { name: "the first place's voice, in gold: by grace and mercy", svg: arcs(n(first[0] + 2.4), n(first[1] - 3.8), GOLD), keys: showFrom(0.66, 0.67), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...[0.67, 0.7].map((from, i): SignPart => ({ name: `thanks, rising: a golden spark ${i + 1}`, svg: sparkle(n(first[0] + 1 + i * 2.6), n(first[1] - 7), 1.4, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.05), 12) })),
      { name: "belief: a warm light in the first place", svg: lightIn(first[0], first[1], 4.4), keys: showFrom(0.72, 0.76), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "the water, a mercy: a soft light on the pools", svg: wet.map(([x, y, rx]) => wash(x, y, n(rx * 1.3), n(rx * 0.45), "#FFF3C0", 0.2)).join(""), keys: showFrom(0.73, 0.76), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "the second place's voice, in grey: by such a star", svg: arcs(n(second[0] + 2.4), n(second[1] - 3.8), GREY), keys: showFrom(0.82, 0.83), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "turned to the star: a faint grey line up from the second place", svg: lookLine(n(second[0] - 0.4), n(second[1] - 2.2), star[0], n(star[1] + 2.4), 44, GREY), keys: showFrom(0.84, 0.87) },
      { name: "disbelief: a grey shade about the second place", svg: glow(second[0], second[1], 4.2, GREY, 0.24), keys: showFrom(0.87, 0.91) }
    ],
    words: [
      { text: "At Hudaybiyah he led Fajr after night rain", from: 0.02, to: 0.15 },
      { text: "Do you know what your Lord has said?", from: 0.17, to: 0.31 },
      { text: "They said: Allah and His Messenger know best", from: 0.33, to: 0.47 },
      { text: "My servants woke: some believing, some not", from: 0.49, to: 0.63 },
      { text: "By Allah's grace and mercy: a believer in Me", from: 0.65, to: 0.79 },
      { text: "By such a star: a disbeliever in Me", from: 0.81, to: 1 }
    ]
  };
}

export const TRUTH_ART = {
  "abu-dharr-seeks": abuDharrSeeks,
  "heart-almost-flew": heartAlmostFlew,
  "heraclius-asks": heracliusAsks,
  "mighty-since-umar": mightySinceUmar,
  "every-right": everyRight,
  "first-masjid": firstMasjid,
  "rain-and-stars": rainAndStars
};
