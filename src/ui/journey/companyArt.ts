import { animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, wall, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { GREY } from "./lovedArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * Stories of those who were with him ﷺ, and two things he ﷺ taught, drawn as the scenes of the first revelation are
 * (revealArt.ts): the lamps in the sky over Usayd's recitation; the prayer Mu'adh made too long; every one of you a
 * shepherd; the garden gate opened with good news of Paradise; the ship that took Abu Musa's people to Abyssinia, and
 * home again at Khaybar; Anas's ten years of serving him; and the better of two who cut each other off, the one who greets
 * first. Only the land, the sky, the sea, buildings, things, plants and animals are drawn. No Prophet, no Companion and
 * no person is ever drawn, not even a hand or a face, and no angel: where someone went, a dashed way shows it, where
 * someone was, a ring or a small dashed circle, and a voice is arcs in the air. What Usayd saw is only a soft cloud of
 * light with small lights like lamps, and it rises out of sight; nothing comes down from the sky.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A place at night, or in the light: a small dashed circle, light on the dark. */
const LIGHT = "#F3E3C0";

/** A dark land at night, from y `top` down, with a few tufts. */
const nightLand = (top: number, tufts: [number, number][]) =>
  `<rect y="${top}" width="160" height="${120 - top}" fill="#2E3556"/><path d="M0 ${top} L160 ${top}" stroke="#454B6A" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("");

/** A home at night, darker, its foot's middle at (x, y). */
const nightHome = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#8C7350", "#77603F", "#3A2A1C");

/** The window of a home (trialArt.ts), lit. */
const litWindow = (x: number, y: number, w: number, h: number) => {
  const [wx, wy] = [n(x + 2), n(y - h + 2.4)];
  return `${glow(n(wx + 1.3), n(wy + 1.3), 4, "#FFD866", 0.16)}<rect x="${wx}" y="${wy}" width="2.6" height="2.6" fill="#FFD866"/>`;
};

/** A dashed ring of care on the ground about (x, y), `rx` across and `ry` high. */
const care = (x: number, y: number, rx: number, ry: number, color = GOLD) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="${color}" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="none"/>`;

/** Keys that show a part from `from` (at once) and lift it by `rise` by `to`: a word of praise, rising and staying. */
const risesAndStays = (from: number, to: number, rise: number): SignKeys => ({
  at: [0, from, at3(from + 0.005), to],
  opacity: [0, 0, 1, 1],
  y: [0, 0, n(-rise * 0.15), -rise]
});

/** Keys that show a part at each [from, to] of `spans`, and hide it again at the next one's start (quickly). */
const onAt = (spans: [number, number][], quick = 0.005): SignKeys => {
  const at = [0];
  const opacity = [0];
  for (const [from, to] of spans) {
    at.push(from, at3(from + quick), to, at3(to + quick));
    opacity.push(0, 1, 1, 0);
  }
  return { at, opacity };
};

/** The same keys, but a part shown at first and hidden at each span. */
const offAt = (spans: [number, number][], quick = 0.005): SignKeys => {
  const keys = onAt(spans, quick);
  return { at: keys.at, opacity: (keys.opacity ?? []).map((value, i) => (i === 0 ? 1 : 1 - value)) };
};

/** A boat with one mast and its sails (hopeArt.ts), the middle of its deck at (x, y). */
const boat = (x: number, y: number) =>
  `<path d="M${n(x - 18)} ${y} L${n(x + 18)} ${y} L${n(x + 13)} ${n(y + 7)} L${n(x - 13.6)} ${n(y + 7)} Z" fill="#8A5530"/>` +
  `<path d="M${n(x - 17)} ${n(y + 2.4)} L${n(x + 17)} ${n(y + 2.4)} M${n(x - 15.4)} ${n(y + 4.8)} L${n(x + 15)} ${n(y + 4.8)}" stroke="#A86C3C" stroke-width="0.7"/>` +
  `<path d="M${x} ${y} L${x} ${n(y - 26)}" stroke="#6B4226" stroke-width="1.2"/>` +
  `<path d="M${n(x + 1)} ${n(y - 24)} Q${n(x + 14)} ${n(y - 14)} ${n(x + 1)} ${n(y - 3)} Z" fill="#FFFDF5"/><path d="M${n(x - 1)} ${n(y - 22)} Q${n(x - 10)} ${n(y - 13)} ${n(x - 1)} ${n(y - 4)} Z" fill="#F4ECDA"/>`;

/** Short waves in a row at height y, from x to x2, `gap` apart. */
const waves = (x: number, x2: number, y: number, gap: number, color: string) => {
  let d = "";
  for (let at = x; at < x2; at += gap) d += `M${n(at)} ${y} q${n(gap / 4)} -1.4 ${n(gap / 2)} 0 `;
  return `<path d="${d}" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;
};

/** A few small dashed circles side by side from (x, y), `gap` apart: places of a group. */
const group = (x: number, y: number, count: number, gap: number, color = LIGHT, r = 1.3) =>
  Array.from({ length: count }, (_, i) => someone(n(x + i * gap), n(y + (i % 2 ? 0.6 : 0)), r, color)).join("");

// Lamps in the sky. Usayd ibn Hudayr said: while he was reciting Surat al-Baqarah at night, his horse tied beside him,
// the horse was startled; he stopped, and it was quiet; he recited, and it was startled; he stopped, and it was quiet;
// then he recited, and it was startled. His son Yahya was near it, and he feared it would strike him; he drew him away, and
// raised his head to the sky: there was something like a cloud with what looked like lamps in it. In the morning he
// told the Prophet ﷺ, who said: those were the angels, who came near to your voice; had you recited on, people would
// have seen them in the morning, not hidden from them (Sahih al-Bukhari 5018). No one is drawn and no angel: the one
// reciting is a small dashed circle by his home at night, and his recitation is a voice with sparks rising; the horse
// by its post is startled when he recites and is quiet when he stops; the little one's place is near it, and he draws it
// away; what he saw is a soft cloud of light high in the sky with small lights like lamps, and it rises out of sight;
// at dawn his place goes to the golden ring by the masjid, and a voice answers; the sun rises, and a warm glow comes on
// the one who recited.
function lampsInTheSky(): SignArt {
  const reader: [number, number] = [42, 104.4];
  const little: [number, number] = [55, 105.4];
  const s = 0.3;
  const foot: [number, number] = [74, 105.4];
  const horse = animalAt("horse", n(foot[0] - 50 * s), n(foot[1] - 73.4 * s), s);
  const prophet: [number, number] = [128, 105.6];
  const go = n(prophet[0] - 5 - reader[0]);
  // He recites three times, and stops three times; the horse is startled each time he recites, a moment later.
  const recited: [number, number][] = [
    [0.03, 0.31],
    [0.33, 0.36],
    [0.45, 0.47]
  ];
  const jumped: [number, number][] = [
    [0.18, 0.31],
    [0.335, 0.365],
    [0.455, 0.475]
  ];
  const lamps: [number, number][] = [
    [64, 47.6],
    [72, 45.4],
    [80, 47.8],
    [88, 45.2],
    [96, 47.6],
    [76, 50.4],
    [92, 50.6]
  ];
  return {
    kind: "lamps-in-the-sky",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(84) },
      {
        name: "stars",
        svg: stars([
          [8, 14],
          [24, 30],
          [40, 12],
          [56, 26],
          [104, 18],
          [118, 36],
          [132, 12],
          [150, 30],
          [12, 56],
          [30, 70],
          [116, 62],
          [146, 70],
          [138, 50]
        ]),
        keys: track({ opacity: [[0.73, 1], [0.78, 0.3]] }),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon", svg: `${glow(140, 22, 7, "#FFF3C4", 0.08)}${crescent(140, 22, 4, 1.4, "#FFF3C4")}` },
      { name: "the dawn", svg: `<rect width="160" height="84" fill="#6A7BAE" opacity="0.5"/><rect y="56" width="160" height="28" fill="#F2B98A" opacity="0.5"/><rect y="70" width="160" height="14" fill="#FBD9A6" opacity="0.6"/>`, keys: showFrom(0.73, 0.78) },
      { name: "the land", svg: nightLand(84, [[60, 114], [10, 90], [150, 114], [96, 116], [104, 90]]) },
      { name: "his home", svg: nightHome(20, 104, 28, 19) },
      { name: "a lit window in his home", svg: litWindow(20, 104, 28, 19), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "the masjid of Madinah, far off", svg: `<g opacity="0.85">${madinahMasjid(108, 103, 0.82)}</g>` },
      {
        name: "the post the horse is tied to",
        svg: `<path d="M93 105.6 L93 95.6" stroke="#6B4A2E" stroke-width="1.1" stroke-linecap="round"/><path d="M87.4 92.2 Q90.6 95.4 93 96.6" stroke="#B89A6C" stroke-width="0.5" fill="none"/>`
      },
      { name: "the horse, tied beside him, quiet", svg: horse, keys: offAt(jumped) },
      {
        name: "the horse, startled",
        svg: horse,
        origin: { x: foot[0] - 8, y: foot[1] },
        keys: { ...onAt(jumped), rotate: [-9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9] },
        loop: { move: "bob", ms: 420, y: -1.4 }
      },
      { name: "the little one's place, near the horse", svg: someone(little[0], little[1], 1.05, LIGHT), keys: track({ xy: [[0.5, 0, 0], [0.52, -14, 0]] }) },
      {
        name: "the place of the one reciting",
        svg: someone(reader[0], reader[1], 1.6, LIGHT),
        keys: track({
          xy: [
            [0.48, 0, 0],
            [0.5, 9, 0],
            [0.52, -4, 0],
            [0.75, -4, 0],
            [0.78, go, 0]
          ]
        })
      },
      { name: "his recitation: a voice", svg: arcs(n(reader[0] + 3), n(reader[1] - 1.8), LIGHT), keys: onAt(recited), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...[0, 1, 2].map(
        (i): SignPart => {
          const from = at3(0.03 + 0.0075 * i);
          return {
            name: `his recitation, rising ${i + 1}`,
            svg: sparkle(n(reader[0] + 2 + i * 2.4), n(reader[1] - 6), i % 2 ? 1.6 : 2, "#FFE7A0"),
            keys: { at: [0, from, at3(from + 0.005), at3(from + 0.05), at3(from + 0.065)], opacity: [0, 0, 1, 1, 0], y: [0, 0, -2.4, -22, -26] }
          };
        }
      ),
      { name: "a worry on the one reciting, for the little one", svg: glow(reader[0], n(reader[1] - 0.6), 5, "#C9C3D8", 0.22), keys: showWhile(0.47, 0.48, 0.52, 0.53) },
      {
        name: "like a cloud, with lights like lamps in it",
        svg:
          `${wash(80, 47.4, 30, 8.6, "#FFF6DA", 0.1)}${cloud(80, 53.6, 1.15, "#FFF6DA", 0.22)}` +
          lamps.map(([x, y]) => `${glow(x, y, 2.6, "#FFE9A8", 0.3)}<circle cx="${x}" cy="${y}" r="0.75" fill="#FFF7DA"/>`).join(""),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.64, 1],
            [0.72, 1],
            [0.75, 0]
          ],
          xy: [
            [0.72, 0, 0],
            [0.75, 0, -16]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.75 }
      },
      { name: "a golden ring, his place by the masjid", svg: ring(prophet[0], prophet[1], 2.6, GOLD), keys: showFrom(0.74, 0.76) },
      {
        name: "the way to the masjid",
        svg: way(`M${reader[0] - 2} 108 L${prophet[0] - 4} 108`, LIGHT, 0.9),
        origin: { x: reader[0] - 2, y: 108 },
        keys: track({
          opacity: [
            [0.745, 0],
            [0.75, 1]
          ],
          scaleX: [
            [0.745, 0.02],
            [0.77, 1]
          ]
        })
      },
      { name: "his voice: those came near for your voice", svg: arcsLeft(n(prophet[0] - 3.2), n(prophet[1] - 1.8), GOLD), keys: showFrom(0.79, 0.8), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "the sun, rising", svg: sun(150, 80), keys: track({ opacity: [[0.87, 0], [0.875, 1]], xy: [[0.87, 0, 8], [0.92, 0, 0]] }) },
      { name: "a warm glow on the one who recited", svg: glow(n(reader[0] + go), n(reader[1] - 0.8), 6, WARM, 0.22), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "He recited al-Baqarah at night", from: 0.02, to: 0.14 },
      { text: "His horse, tied beside him, was startled", from: 0.16, to: 0.28 },
      { text: "He stopped, and the horse was quiet", from: 0.3, to: 0.42 },
      { text: "His son Yahya was near it; he feared for him", from: 0.44, to: 0.56 },
      { text: "He looked up: like a cloud, with lamps in it", from: 0.58, to: 0.7 },
      { text: "Those were angels, come near for your voice", from: 0.72, to: 0.84 },
      { text: "Had you read on, people would have seen them", from: 0.86, to: 1 }
    ]
  };
}

// A prayer made too long. Jabir ibn Abdullah said: a man came with two camels for watering, as night was falling, and
// found Mu'adh praying; he left his camels and came to Mu'adh, who recited Surat al-Baqarah or an-Nisa, so the man went
// away. He heard that Mu'adh spoke against him, and he came to the Prophet ﷺ and complained of Mu'adh. The Prophet ﷺ
// said: O Mu'adh, are you putting people to trial? three times. Why did you not pray with Sabbih isma rabbik (al-A'la),
// wash-shamsi wa duhaha (ash-Shams) and wal-layli idha yaghsha (al-Layl)? For behind you pray the old, the weak and the
// one in need (Sahih al-Bukhari 705). No one is drawn: the last light of the day goes; a place comes with two camels
// and joins the row before a masjid at night; a golden band on the wall grows long with the recitation as the moon
// goes over; the place leaves the row, goes back to the camels and along a way to the golden ring, and a grey voice
// complains; his voice calls three times; the long band goes, three short ones show; and a warm glow comes on the
// old, the weak and the needy in the row.
function prayerTooLong(): SignArt {
  const imam: [number, number] = [118, 104.4];
  const row: [number, number][] = [
    [110, 104.6],
    [104, 104.4],
    [98, 104.6]
  ];
  const joins: [number, number] = [92, 104.4];
  const came: [number, number] = [46, 104.4];
  const prophet: [number, number] = [148, 105.4];
  const tired = n(joins[0] - came[0]);
  const complains = n(prophet[0] - 6 - came[0]);
  const s = 0.16;
  const camel = (x: number, y: number, left = false) => animalAt("camel", n(x - 50 * s), n(y - 73 * s), s, left);
  const callsAt: [number, number][] = [
    [0.58, 0.6],
    [0.61, 0.63]
  ];
  return {
    kind: "prayer-too-long",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(86) },
      {
        name: "stars",
        svg: stars([
          [10, 16],
          [26, 34],
          [44, 14],
          [66, 30],
          [84, 12],
          [100, 34],
          [124, 18],
          [142, 36],
          [154, 14],
          [16, 60],
          [134, 62]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the last light of the day, going",
        svg: `<rect y="56" width="160" height="30" fill="#D98C5F" opacity="0.5"/><rect y="72" width="160" height="14" fill="#F0B27A" opacity="0.5"/>`,
        keys: track({
          opacity: [
            [0.04, 1],
            [0.1, 0]
          ]
        })
      },
      {
        name: "the moon, going over",
        svg: `${glow(24, 30, 7, "#FFF3C4", 0.08)}${crescent(24, 30, 4, 1.4, "#FFF3C4")}`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.1, 1]
          ],
          xy: [
            [0.31, 0, 0],
            [0.38, 46, -8]
          ]
        })
      },
      { name: "the land", svg: nightLand(86, [[20, 114], [60, 92], [150, 114], [84, 116], [132, 92]]) },
      { name: "homes of Madinah", svg: nightHome(16, 96, 12, 8) + nightHome(34, 95, 10, 7) + nightHome(146, 96, 12, 8) },
      { name: "palms", svg: palm(132, 104, 22, "#3E6B39") + palm(156, 102, 18, "#3E6B39") },
      { name: "a masjid", svg: `<g opacity="0.9">${madinahMasjid(76, 101, 0.94)}</g>` },
      {
        name: "a golden band on the wall: how long the recitation is",
        svg: `<rect x="82" y="83.4" width="34" height="1.8" rx="0.9" fill="${GOLD}"/>`,
        origin: { x: 82, y: 84.3 },
        keys: track({
          opacity: [
            [0.3, 0],
            [0.305, 1],
            [0.72, 1],
            [0.74, 0]
          ],
          scaleX: [
            [0.305, 0.06],
            [0.38, 1]
          ]
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a short surah instead, a short golden band ${i + 1}`,
          svg: `<rect x="${82 + i * 12}" y="83.4" width="7" height="1.8" rx="0.9" fill="${GOLD}"/>`,
          keys: showFrom(at3(0.74 + 0.02 * i), at3(0.75 + 0.02 * i))
        })
      ),
      { name: "the place of the one leading the prayer", svg: someone(imam[0], imam[1], 1.5, LIGHT) },
      { name: "the voice of the one leading, reciting long", svg: arcs(n(imam[0] + 2.4), n(imam[1] - 2), LIGHT), keys: showWhile(0.3, 0.31, 0.72, 0.73), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "an old one's place in the row", svg: someone(row[0][0], row[0][1], 1.5, "#D9D3CA") },
      { name: "a weak one's place in the row", svg: someone(row[1][0], row[1][1], 1.2, "#C9C2B8") },
      { name: "a place in the row of one in need", svg: someone(row[2][0], row[2][1], 1.4, "#C9C2B8") },
      { name: "two camels for watering", svg: camel(30, 105.6) + camel(16, 106.2), keys: comeInFrom(0.03, 0.09, -40), loop: { move: "bob", ms: 1200, y: -0.3 } },
      {
        name: "the one who came with the camels",
        svg: someone(came[0], came[1], 1.5, LIGHT),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: [
            [0.03, -40, 0],
            [0.09, 0, 0],
            [0.17, 0, 0],
            [0.21, tired, 0],
            [0.44, tired, 0],
            [0.46, 0, 0],
            [0.466, 0, 0],
            [0.5, complains, 1.4]
          ]
        })
      },
      { name: "joining the row: a soft glow", svg: glow(joins[0], n(joins[1] - 0.8), 4.6, "#FFF3C4", 0.2), keys: showWhile(0.21, 0.24, 0.44, 0.45) },
      { name: "tired: a grey weight on the one who came", svg: glow(joins[0], n(joins[1] - 0.8), 4.4, GREY, 0.3), keys: showWhile(0.36, 0.38, 0.44, 0.45) },
      {
        name: "the way to the golden ring",
        svg: way(`M${came[0] + 2} 108.4 L${prophet[0] - 8} 108.4`, LIGHT, 0.9),
        origin: { x: came[0] + 2, y: 108.4 },
        keys: track({
          opacity: [
            [0.462, 0],
            [0.466, 1]
          ],
          scaleX: [
            [0.462, 0.02],
            [0.49, 1]
          ]
        })
      },
      { name: "a golden ring, his place", svg: ring(prophet[0], prophet[1], 2.6, GOLD) },
      { name: "a grey voice, complaining", svg: arcs(n(came[0] + complains + 2.2), n(came[1] - 0.4), GREY), keys: showWhile(0.5, 0.505, 0.57, 0.575) },
      ...callsAt.map(
        ([from, to], i): SignPart => ({
          name: `his voice: are you putting them to trial ${i + 1}`,
          svg: arcsLeft(n(prophet[0] - 3.2), n(prophet[1] - 1.8), GOLD),
          keys: showWhile(from, at3(from + 0.005), to, at3(to + 0.005))
        })
      ),
      { name: "his voice: are you putting them to trial 3", svg: arcsLeft(n(prophet[0] - 3.2), n(prophet[1] - 1.8), GOLD), keys: showFrom(0.64, 0.645), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      ...row.map(
        ([x, y], i): SignPart => ({
          name: `behind him, a warm glow on ${["the old one", "the weak one", "the one in need"][i]}`,
          svg: glow(x, n(y - 0.8), 4.4, WARM, 0.24),
          keys: showFrom(at3(0.86 + 0.02 * i), at3(0.89 + 0.02 * i)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 3 }
        })
      ),
      { name: "a soft light over the row", svg: wash(106, 100, 18, 6, "#FFF3C4", 0.12), keys: showFrom(0.92, 0.96) }
    ],
    words: [
      { text: "A man came with two camels, as night fell", from: 0.02, to: 0.13 },
      { text: "He found Mu'adh praying, and joined him", from: 0.15, to: 0.27 },
      { text: "Mu'adh recited al-Baqarah or an-Nisa", from: 0.29, to: 0.41 },
      { text: "The man left, and complained of Mu'adh", from: 0.43, to: 0.55 },
      { text: "O Mu'adh, are you putting people to trial?", from: 0.57, to: 0.69 },
      { text: "Why not al-A'la, ash-Shams or al-Layl?", from: 0.71, to: 0.83 },
      { text: "Behind you pray the old, the weak and the needy", from: 0.85, to: 1 }
    ]
  };
}

/** Keys that bring a part in from `dx` away, fading in at once, between `from` and `to` (charityArt.ts's comeIn). */
const comeInFrom = (from: number, to: number, dx: number): SignKeys => ({
  at: [0, from, at3(from + 0.006), to],
  opacity: [0, 0, 1, 1],
  x: [dx, dx, n(dx * (1 - 0.006 / (to - from))), 0],
  y: [0, 0, 0, 0]
});

// Every one of you a shepherd. Ibn Umar said: I heard the Messenger of Allah ﷺ say: each of you is a shepherd, and each
// of you is asked about his flock. The leader is a shepherd and is asked about his flock; a man is a shepherd in his
// family and is asked about his flock; a woman is a shepherd in her husband's house and is asked about her flock; and a
// servant is a shepherd of his master's wealth and is asked about his flock. Each of you is a shepherd, and each of
// you is asked about his flock (Sahih al-Bukhari 893). No one is drawn: a shepherd's place keeps a flock of sheep; a
// place stands before the homes of the town; a place at the door of a home with its family's places before it; a
// place in the doorway of another home, its window lit; a place by sacks of wealth kept safe; each gets a dashed golden
// ring of care about what is in its care, and at the end each ring glows, and a soft light rises from each.
function everyOneAShepherd(): SignArt {
  const cares: [string, number, number, number, number, number][] = [
    ["the flock", 24, 104.4, 20, 4.6, 0.05],
    ["the town", 64, 97.6, 20, 5.2, 0.2],
    ["the family", 92, 105.4, 13, 3.6, 0.35],
    ["the home", 120, 105, 12, 3.6, 0.5],
    ["the wealth", 147, 105.2, 12, 3.4, 0.65]
  ];
  const sheep = (x: number, y: number, left = false) => animalAt("sheep", n(x - 50 * 0.12), n(y - 73 * 0.12), 0.12, left);
  return {
    kind: "every-one-a-shepherd",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(138, 22) },
      { name: "clouds", svg: cloud(30, 28, 0.8, "#FFFFFF", 0.9) + cloud(96, 20, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a pasture", svg: `<ellipse cx="24" cy="104" rx="22" ry="5" fill="#8DBE5A" opacity="0.55"/>` + tuft(8, 108, "#5FA344", 4) + tuft(38, 108.6, "#5FA344", 4) },
      { name: "sheep grazing", svg: sheep(14, 104.6) + sheep(26, 106) + sheep(36, 103.8, true), loop: { move: "bob", ms: 1600, y: -0.3 } },
      { name: "a shepherd's staff", svg: `<path d="M44.6 106 L44.6 95.6 Q44.6 93.4 46.6 93.6 Q48.2 94 47.8 95.6" stroke="#8A5A33" stroke-width="0.8" fill="none" stroke-linecap="round"/>` },
      { name: "the shepherd's place", svg: someone(42, 104.4, 1.5, VOICE) },
      { name: "homes of the town", svg: home(52, 94, 11, 8) + home(64, 93, 12, 9) + home(77, 94, 11, 8) },
      { name: "the place of the one who leads the town", svg: someone(64, 98.2, 1.6, VOICE) },
      { name: "a home and its family", svg: home(92, 102, 16, 11) },
      { name: "the family's places before it", svg: someone(86, 105.6, 1.1, VOICE) + someone(90.4, 106, 1, VOICE) + someone(98, 105.8, 1.1, VOICE) },
      { name: "the place of the one at its door", svg: someone(94, 104.2, 1.5, VOICE) },
      { name: "the home she keeps", svg: home(120, 102, 15, 11) },
      { name: "a lit window in it, kept", svg: `${glow(123.3, 94.4, 3.4, "#FFD866", 0.24)}<rect x="122" y="93.4" width="2.6" height="2.6" fill="#FFD866"/>` },
      { name: "her place before its door", svg: someone(119, 104.6, 1.4, VOICE) },
      { name: "sacks of the owner's wealth", svg: sack(142, 106.4, 0.9) + sack(149, 106.6, 0.8, "#BF9A5E") + `<rect x="152.6" y="102" width="6" height="4.6" rx="0.6" fill="#8A5530"/><path d="M152.6 103.6 L158.6 103.6" stroke="#6B4226" stroke-width="0.5"/>` },
      { name: "the place of the one keeping the wealth", svg: someone(138.6, 104.8, 1.5, VOICE) },
      ...cares.map(
        ([about, x, y, rx, ry, at], i): SignPart => ({
          name: `a golden ring of care about ${about}`,
          svg: care(x, y, rx, ry),
          keys: showFrom(at3(at), at3(at + 0.04)),
          loop: { move: "twinkle", ms: 1800, low: 0.7, phase: i / 5 }
        })
      ),
      ...cares.map(
        ([about, x, y, rx], i): SignPart => ({
          name: `responsible for ${about}: a warm glow`,
          svg: wash(x, n(y - 2), n(rx * 0.8), 4, WARM, 0.12),
          keys: showFrom(at3(0.85 + 0.012 * i), at3(0.88 + 0.012 * i)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 5 }
        })
      ),
      ...cares.map(
        ([about, x, y], i): SignPart => ({
          name: `responsible for ${about}: a soft light rising`,
          svg: sparkle(x, n(y - 8), 1.8, "#FFE7A0"),
          keys: risesAndStays(at3(0.88 + 0.012 * i), at3(0.92 + 0.012 * i), 10),
          loop: { move: "twinkle", ms: 1000, low: 0.5, phase: i / 5 }
        })
      )
    ],
    words: [
      { text: "Each of you is a shepherd", from: 0.02, to: 0.14 },
      { text: "The leader is a shepherd of his people", from: 0.16, to: 0.29 },
      { text: "A man is a shepherd of his family", from: 0.31, to: 0.44 },
      { text: "A woman, of her husband's home", from: 0.46, to: 0.59 },
      { text: "A servant, of his master's wealth", from: 0.61, to: 0.74 },
      { text: "Each of you is responsible for his flock", from: 0.76, to: 1 }
    ]
  };
}

// The garden gate. Abu Musa said: I was with the Prophet ﷺ in one of the gardens of Madinah, and a man came and asked
// for the gate to be opened. The Prophet ﷺ said: open for him, and give him the good news of Paradise. I opened for
// him, and it was Abu Bakr; I gave him the good news of what the Prophet ﷺ said, and he praised Allah. Then another
// man came and asked for it to be opened, and he ﷺ said: open for him and give him the good news of Paradise; I opened
// for him, and it was Umar, and he praised Allah. Then a man asked for it to be opened, and he ﷺ said to me: open for
// him and give him the good news of Paradise, with a calamity that will strike him; it was Uthman, and he praised Allah and
// said: Allah is the One whose help is sought (Sahih al-Bukhari 3693). No one is drawn: inside the low wall of a garden
// of palms, the golden ring by the well, and by the gate the place of the one keeping it; one after another a place
// comes along the way outside and knocks; his voice; the gate opens, a warm glow of good news comes on the one who
// came, and he goes in to sit by him, a light of praise rising over him; the third also has a grey shade of the calamity
// with the good news, and a steady warm light as he says that Allah's help is sought.
function theGardenGate(): SignArt {
  const prophet: [number, number] = [112, 93];
  const keeper: [number, number] = [80, 93.2];
  const atGate: [number, number] = [62, 106.4];
  const inside: [number, number] = [72, 93.2];
  const seats: [number, number][] = [
    [122, 93.2],
    [128.4, 93.6],
    [134.8, 93.2]
  ];
  // [comes from, at the gate, his voice, gate open, good news, goes in, seated, gate shut]
  const visits = [
    { come: [0.15, 0.2], knock: 0.205, voice: [0.28, 0.4], open: [0.31, 0.33], news: 0.33, through: [0.4, 0.415], seat: 0.43, shut: [0.435, 0.45], keeper: [0.29, 0.31, 0.45, 0.47] },
    { come: [0.535, 0.565], knock: 0.565, voice: [0.57, 0.62], open: [0.58, 0.59], news: 0.59, through: [0.595, 0.605], seat: 0.615, shut: [0.615, 0.625], keeper: [0.57, 0.58, 0.62, 0.63] },
    { come: [0.685, 0.715], knock: 0.715, voice: [0.72, 0.86], open: [0.73, 0.745], news: 0.745, through: [0.93, 0.945], seat: 0.96, shut: [0.955, 0.965], keeper: [0.72, 0.73, 0.94, 0.96] }
  ];
  const names = ["the first", "the second", "the third"];
  // Keys that go with the one who came (i): along the way to the gate, through it and to a seat by him; shown from
  // `from`, over `fade`.
  const withComer = (i: number, from: number, fade = 0.005) => {
    const v = visits[i];
    const [sx, sy] = seats[i];
    return track({
      opacity: [
        [from, 0],
        [at3(from + fade), 1]
      ],
      xy: [
        [v.come[0], -72, 0],
        [v.come[1], 0, 0],
        [v.through[0], 0, 0],
        [v.through[1], n(inside[0] - atGate[0]), n(inside[1] - atGate[1])],
        [v.seat, n(sx - atGate[0]), n(sy - atGate[1])]
      ]
    });
  };
  const gate = track({
    scaleX: visits.flatMap((v): [number, number][] => [
      [v.open[0], 1],
      [v.open[1], 0.14],
      [v.shut[0], 0.14],
      [v.shut[1], 1]
    ])
  });
  const keeperKeys = track({
    xy: visits.flatMap((v): [number, number, number][] => [
      [v.keeper[0], 0, 0],
      [v.keeper[1], -4, 0],
      [v.keeper[2], -4, 0],
      [v.keeper[3], 0, 0]
    ])
  });
  return {
    kind: "the-garden-gate",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(24, 22) },
      { name: "clouds", svg: cloud(70, 24, 0.8, "#FFFFFF", 0.9) + cloud(128, 30, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms of the garden", svg: palm(30, 96, 24) + palm(48, 96, 20) + palm(96, 95, 26) + palm(144, 95, 24) + palm(156, 96, 18) },
      { name: "the garden's green inside", svg: `<rect x="20" y="88" width="136" height="9" fill="#9CCB6A" opacity="0.55"/>` },
      { name: "the well", svg: `<ellipse cx="104" cy="95.6" rx="4.4" ry="1.6" fill="#6B5A4A"/><path d="M99.6 95.6 L99.6 98.6 Q104 100.4 108.4 98.6 L108.4 95.6" fill="#A39280"/><ellipse cx="104" cy="95.6" rx="2.8" ry="0.9" fill="#3E5C7A"/>` },
      { name: "a warm light over the garden", svg: wash(96, 92, 40, 7, "#FFF3C4", 0.12), keys: showFrom(0.03, 0.07) },
      { name: "a golden ring, his place by the well", svg: ring(prophet[0], prophet[1], 2.4, GOLD) },
      { name: "the place of the one keeping the gate", svg: someone(keeper[0], keeper[1], 1.4, VOICE), keys: keeperKeys },
      ...visits.map(
        (v, i): SignPart => ({
          name: `his voice: open for him, and give him good news ${i + 1}`,
          svg: arcsLeft(n(prophet[0] - 3), n(prophet[1] - 1.6), GOLD),
          keys: showWhile(v.voice[0], at3(v.voice[0] + 0.005), v.voice[1], at3(v.voice[1] + 0.005)),
          loop: { move: "twinkle", ms: 1000, low: 0.5 }
        })
      ),
      ...visits.map(
        (v, i): SignPart => ({
          name: `${names[i]} one's place, coming`,
          svg: someone(atGate[0], atGate[1], 1.5, VOICE),
          keys: withComer(i, v.come[0])
        })
      ),
      ...visits.map(
        (v, i): SignPart => ({
          name: `knocking at the gate ${i + 1}`,
          svg: arcs(n(atGate[0] + 2.2), n(atGate[1] - 1.6), VOICE),
          keys: showWhile(v.knock, at3(v.knock + 0.004), v.open[0], at3(v.open[0] + 0.005))
        })
      ),
      ...visits.map(
        (v, i): SignPart => ({
          name: `good news of Paradise: a warm glow on ${names[i]} one`,
          svg: glow(atGate[0], n(atGate[1] - 0.8), 4.4, WARM, 0.26),
          keys: withComer(i, v.news, 0.02),
          loop: { move: "twinkle", ms: 1500, low: 0.7 }
        })
      ),
      { name: "with a calamity to strike him: a grey shade", svg: glow(atGate[0], n(atGate[1] - 0.8), 5.6, GREY, 0.22), keys: withComer(2, 0.76, 0.02) },
      { name: "the wall of the garden", svg: wall(20, 66, 100.6, 5) + wall(76, 156, 100.6, 5) },
      { name: "the gateway", svg: `<rect x="66" y="94.6" width="10" height="6" fill="#4A3A2A"/><path d="M65.4 94.4 L76.6 94.4" stroke="#8A6A44" stroke-width="1"/>` },
      { name: "the gate", svg: `<rect x="66" y="94.8" width="10" height="5.8" fill="#9A6B3E"/><path d="M68.5 95 L68.5 100.6 M71 95 L71 100.6 M73.5 95 L73.5 100.6" stroke="#7E5530" stroke-width="0.5"/>`, origin: { x: 66, y: 97.7 }, keys: gate },
      { name: "the way outside", svg: way(`M0 108.6 L66 108.6 L70 101`, "#E7D3A8", 0.9) },
      ...seats.map(
        ([x, y], i): SignPart => ({
          name: `his praise, rising over ${names[i]} one`,
          svg: sparkle(x, n(y - 5), 1.8, "#FFE7A0"),
          keys: i === 2 ? risesAndStays(0.86, 0.9, 8) : risesAndStays(at3(visits[i].seat), at3(visits[i].seat + 0.015), 8),
          loop: { move: "twinkle", ms: 1000, low: 0.5, phase: i / 3 }
        })
      ),
      { name: "help is sought: a steady warm light on the third", svg: glow(atGate[0], n(atGate[1] - 0.8), 6.6, "#FFF3C4", 0.2), keys: withComer(2, 0.9, 0.02) }
    ],
    words: [
      { text: "I was with him in a garden of Madinah", from: 0.02, to: 0.13 },
      { text: "One came, and asked me to open the gate", from: 0.14, to: 0.25 },
      { text: "Open for him; give him good news of Paradise", from: 0.27, to: 0.38 },
      { text: "It was Abu Bakr, and he praised Allah", from: 0.4, to: 0.51 },
      { text: "Then it was Umar, and he praised Allah", from: 0.53, to: 0.66 },
      { text: "Then Uthman: with a calamity to strike him", from: 0.68, to: 0.83 },
      { text: "He praised Allah: Allah's help is sought", from: 0.85, to: 1 }
    ]
  };
}

// The ship to Abyssinia. Abu Musa said: the news of the Prophet's ﷺ migration reached us while we were in Yemen, so we
// set out to him as emigrants, my two brothers and I with fifty-odd of my people, and we boarded a ship. Our ship cast
// us to the Negus in Abyssinia, and there we met Ja'far ibn Abi Talib and his companions. Ja'far said: the Messenger of
// Allah ﷺ sent us here and told us to stay, so stay with us. We stayed with him until we came all together, and we met
// the Prophet ﷺ when he had taken Khaybar, and he gave us a share of it; he gave none who had not been at Khaybar but
// the people of our ship, with Ja'far and his companions (Sahih al-Bukhari 3136). No one is drawn: by a home in Yemen
// on the far shore, their places hear a voice of the news; they go to a ship, which sails across the sea and is cast
// on the shore of Abyssinia; there are the places of those already there, and a warm glow as they meet; a voice tells
// them to stay, and a soft ring stays about them all; the ship takes them all back across; they go up a way to the
// palms of Khaybar, where the golden ring is, and a share is given to them.
function shipToAbyssinia(): SignArt {
  const deck: [number, number] = [116, 90.4];
  // The ship's way: from the shore of Yemen across to Abyssinia, and back.
  const shipXY: [number, number, number][] = [
    [0.3, 0, 0],
    [0.34, -30, 2.4],
    [0.38, -74, 1.2],
    [0.77, -74, 1.2],
    [0.79, 0, -1.6]
  ];
  const yemen: [number, number] = [138, 104.4];
  const landed: [number, number] = [28, 104.6];
  const there: [number, number] = [8, 104.4];
  const khaybar: [number, number] = [146, 73.4];
  const board: [number, number] = [n(deck[0] - 6 - yemen[0]), n(deck[1] - 1.6 - yemen[1])];
  // Abu Musa's people: at home in Yemen, on the ship, landed in Abyssinia, on the ship again, then up to Khaybar.
  const theirs = track({
    xy: [
      [0.16, 0, 0],
      [0.2, board[0], board[1]],
      [0.3, board[0], board[1]],
      [0.34, n(board[0] - 30), n(board[1] + 2.4)],
      [0.38, n(board[0] - 74), n(board[1] + 1.2)],
      [0.44, n(board[0] - 74), n(board[1] + 1.2)],
      [0.47, n(landed[0] - yemen[0]), n(landed[1] - yemen[1])],
      [0.755, n(landed[0] - yemen[0]), n(landed[1] - yemen[1])],
      [0.77, n(board[0] - 74), n(board[1] + 1.2)],
      [0.79, board[0], n(board[1] - 1.6)],
      [0.86, board[0], n(board[1] - 1.6)],
      [0.9, n(khaybar[0] - 16 - yemen[0]), n(khaybar[1] + 1 - yemen[1])]
    ]
  });
  const boardThere: [number, number] = [n(deck[0] - 74 + 2 - there[0]), n(deck[1] + 1.2 - 1.6 - there[1])];
  const jafars = track({
    xy: [
      [0.755, 0, 0],
      [0.77, boardThere[0], boardThere[1]],
      [0.79, n(boardThere[0] + 74), n(boardThere[1] - 2.8)],
      [0.86, n(boardThere[0] + 74), n(boardThere[1] - 2.8)],
      [0.9, n(khaybar[0] - 6 - there[0]), n(khaybar[1] + 1.4 - there[1])]
    ]
  });
  return {
    kind: "ship-to-abyssinia",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(80, 20) },
      { name: "clouds", svg: cloud(36, 30, 0.7, "#FFFFFF", 0.9) + cloud(118, 24, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the sea", svg: `<rect y="86" width="160" height="34" fill="#5B9BD0"/><rect y="86" width="160" height="3" fill="#7DB4E0"/>${waves(4, 156, 96, 9, "#A8D0F0")}${waves(8, 156, 104, 11, "#A8D0F0")}${waves(2, 156, 112, 10, "#A8D0F0")}` },
      { name: "the shore of Abyssinia, green", svg: `<path d="M0 84 Q20 80 36 86 L40 120 L0 120 Z" fill="#7FB061"/><path d="M0 100 Q18 98 38 104 L40 120 L0 120 Z" fill="#E2CFA0"/>` },
      { name: "hills of Abyssinia", svg: peaks([[10, 16, 14], [26, 11, 12]], 86, "#5E9450", false) },
      { name: "a home in Abyssinia", svg: home(14, 99, 14, 10, "#E8DCC4", "#CDBF9F", "#7A6A50") },
      { name: "the shore of Arabia", svg: `<path d="M118 120 L124 86 Q140 80 160 82 L160 120 Z" fill="#E3C98F"/>` },
      { name: "a home in Yemen", svg: home(148, 101, 14, 10) },
      { name: "the hill of Khaybar", svg: `<path d="M118 84 Q136 62 160 64 L160 86 Z" fill="#C9AE78"/>` },
      { name: "palms of Khaybar", svg: palm(134, 76, 13, "#4F9A3C") + palm(152, 72, 15, "#4F9A3C") + palm(158, 74, 12, "#4F9A3C") },
      { name: "the way up to Khaybar", svg: way(`M122 88 Q128 80 ${khaybar[0] - 14} ${khaybar[1] + 1.6}`, "#FFF0C4", 0.9), keys: showFrom(0.86, 0.87) },
      { name: "a golden ring, his place at Khaybar", svg: ring(khaybar[0], khaybar[1], 2.4, GOLD), keys: showFrom(0.86, 0.88) },
      { name: "the news of his migration: a voice", svg: arcsLeft(n(yemen[0] + 14), n(yemen[1] - 6), VOICE), keys: showWhile(0.03, 0.04, 0.15, 0.16), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "glad at the news: a warm glow on them", svg: glow(n(yemen[0] + 4), n(yemen[1] - 0.6), 7, WARM, 0.2), keys: showWhile(0.05, 0.08, 0.15, 0.16) },
      { name: "the ship", svg: boat(deck[0], deck[1]), keys: track({ xy: shipXY }), loop: { move: "bob", ms: 1400, y: -0.6, rotate: 1 } },
      { name: "the places of those who came from Yemen", svg: group(yemen[0], yemen[1], 3, 4.4, LIGHT, 1.2), keys: theirs },
      { name: "the places of those already in Abyssinia", svg: group(there[0], there[1], 3, 4.4, "#FFF6DA", 1.2), keys: jafars },
      { name: "a warm glow as they meet", svg: wash(22, 102.6, 18, 4, WARM, 0.14), keys: showWhile(0.47, 0.5, 0.755, 0.765) },
      { name: "the voice of one already there: stay with us", svg: arcs(n(there[0] + 11.6), n(there[1] - 1.8), "#FFF6DA"), keys: showWhile(0.58, 0.59, 0.72, 0.73), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "staying: a soft ring about them all", svg: `<ellipse cx="22" cy="104.4" rx="17" ry="3.6" stroke="#FFF6DA" stroke-width="0.8" stroke-dasharray="1.6 1.2" fill="none"/>`, keys: showWhile(0.6, 0.63, 0.755, 0.765) },
      { name: "a share given to them: a sack", svg: sack(n(khaybar[0] - 4), n(khaybar[1] + 3.4), 0.6), keys: track({ opacity: [[0.9, 0], [0.905, 1]], xy: [[0.905, 0, 0], [0.93, -6, 0.4]] }) },
      { name: "a warm glow on those of the ship", svg: wash(n(khaybar[0] - 10), n(khaybar[1] + 0.6), 12, 3.4, WARM, 0.16), keys: showFrom(0.93, 0.95), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "In Yemen, we got news of his migration", from: 0.02, to: 0.13 },
      { text: "We set out to him, and boarded a ship", from: 0.15, to: 0.27 },
      { text: "Our ship took us to the Negus in Abyssinia", from: 0.29, to: 0.41 },
      { text: "There we found Ja'far and his companions", from: 0.43, to: 0.55 },
      { text: "He sent us here to stay; so stay with us", from: 0.57, to: 0.69 },
      { text: "We stayed until we all left together", from: 0.71, to: 0.83 },
      { text: "Khaybar was won, and he gave us a share", from: 0.85, to: 1 }
    ]
  };
}

// Ten years of serving him. Anas said: the Messenger of Allah ﷺ came to Madinah with no one to serve him. Abu Talhah
// took me to the Messenger of Allah ﷺ and said: O Messenger of Allah, Anas is a clever boy, so let him serve you. So I
// served him on journeys and at home (Sahih al-Bukhari 2768). Anas said: I served the Prophet ﷺ for ten years, and he
// never said to me: uff; nor: why did you do this? nor: why did you not do this? (Sahih al-Bukhari 6038). No one is
// drawn: the golden ring comes along a way into Madinah, alone; a place comes with a little one's place to him, and a
// voice speaks for the little one; the little one stays, serving by his home and going with him on a way out of the
// town with a camel; ten years go by, one small sun after another, and the little one's place grows; his voice is
// only gentle, and a warm glow comes on the one who served, and stays.
function tenYearsServing(): SignArt {
  const atHome: [number, number] = [66, 105.2];
  const brought: [number, number] = [76, 105.6];
  const talhah: [number, number] = [82, 105.2];
  const fromHome = 146;
  const s = 0.15;
  return {
    kind: "ten-years-serving",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(140, 20) },
      { name: "clouds", svg: cloud(40, 26, 0.7, "#FFFFFF", 0.9) + cloud(104, 30, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "palms of Madinah", svg: palm(18, 98, 22) + palm(124, 96, 20) + palm(156, 98, 18) },
      { name: "the masjid of Madinah", svg: madinahMasjid(86, 100.6, 0.72) },
      { name: "his home by the masjid", svg: home(72, 101, 13, 10) },
      { name: "the home of the one who brought him", svg: home(fromHome, 102, 14, 10) },
      { name: "the way into Madinah", svg: way(`M0 108.4 L${atHome[0] - 3} 108.4`, "#E7D3A8", 0.9), keys: showFrom(0.02, 0.03) },
      {
        name: "a golden ring, his place",
        svg: ring(atHome[0], atHome[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.025, 1]
          ],
          xy: [
            [0.02, -66, 0],
            [0.09, 0, 0],
            [0.47, 0, 0],
            [0.49, -30, 0],
            [0.51, 0, 0]
          ]
        })
      },
      {
        name: "the place of the one who brought him",
        svg: someone(talhah[0], talhah[1], 1.5, VOICE),
        keys: track({
          opacity: [
            [0.16, 0],
            [0.165, 1],
            [0.47, 1],
            [0.48, 0]
          ],
          xy: [
            [0.16, n(fromHome - 6 - talhah[0]), 0],
            [0.22, 0, 0],
            [0.44, 0, 0],
            [0.47, n(fromHome - 6 - talhah[0]), 0]
          ]
        })
      },
      {
        name: "the little one's place, brought to serve",
        svg: someone(brought[0], brought[1], 1, VOICE),
        origin: { x: brought[0], y: brought[1] },
        keys: track({
          opacity: [
            [0.16, 0],
            [0.165, 1]
          ],
          xy: [
            [0.16, n(fromHome - 10 - brought[0]), 0],
            [0.22, 0, 0],
            [0.44, 0, 0],
            [0.46, -4, 0],
            [0.47, -4, 0],
            [0.49, -26, 0],
            [0.51, -4, 0]
          ],
          scale: [
            [0.58, 1],
            [0.65, 1.6]
          ]
        })
      },
      { name: "a voice for the little one: let him serve you", svg: arcsLeft(n(talhah[0] - 2.6), n(talhah[1] - 1.8), VOICE), keys: showWhile(0.3, 0.31, 0.43, 0.44), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a warm glow on the little one", svg: glow(brought[0], n(brought[1] - 0.6), 4, WARM, 0.22), keys: showWhile(0.33, 0.36, 0.44, 0.45) },
      { name: "serving at home: a jug of water by the door", svg: `<path d="M77.4 106.4 Q76.6 103.4 77.8 102.2 L79.6 102.2 Q80.8 103.4 80 106.4 Z" fill="#B5733F"/><path d="M80.2 103 Q81.6 103.4 80.6 104.8" stroke="#B5733F" stroke-width="0.5" fill="none"/>`, keys: showFrom(0.45, 0.46) },
      { name: "on journeys: a way out of the town", svg: way(`M${atHome[0] - 4} 110 L4 110`, "#E7D3A8", 0.9), keys: showWhile(0.465, 0.47, 0.57, 0.58) },
      { name: "a camel for the journey", svg: animalAt("camel", n(30 - 50 * s), n(109.4 - 73 * s), s), keys: showWhile(0.47, 0.48, 0.57, 0.58), loop: { move: "bob", ms: 900, y: -0.4 } },
      ...Array.from({ length: 10 }, (_, i): SignPart => {
        const from = at3(0.58 + 0.0068 * i);
        return {
          name: `a year of serving him, a small sun ${i + 1}`,
          svg: `${glow(n(14 + i * 9.6), 48, 2.6, "#FFF0C0", 0.2)}<circle cx="${n(14 + i * 9.6)}" cy="48" r="1.3" fill="#FFD866"/>`,
          keys: showFrom(from, at3(from + 0.006)),
          loop: { move: "twinkle", ms: 1600, low: 0.75, phase: i / 10 }
        };
      }),
      { name: "his voice, only gentle", svg: arcs(n(atHome[0] + 3), n(atHome[1] - 1.8), "#FFE9A8"), keys: showFrom(0.72, 0.73), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "a warm glow on the one who served", svg: glow(n(brought[0] - 4), n(brought[1] - 0.6), 6, WARM, 0.22), keys: showFrom(0.74, 0.78), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "a soft light over the years", svg: wash(57, 48, 50, 5, "#FFF3C4", 0.12), keys: showFrom(0.87, 0.92) }
    ],
    words: [
      { text: "He came to Madinah, and had no servant", from: 0.02, to: 0.13 },
      { text: "Abu Talhah took me to him", from: 0.15, to: 0.27 },
      { text: "Anas is a wise boy; let him serve you", from: 0.29, to: 0.41 },
      { text: "I served him at home and on journeys", from: 0.43, to: 0.55 },
      { text: "I served him for ten years", from: 0.57, to: 0.69 },
      { text: "He never said to me: uff", from: 0.71, to: 0.83 },
      { text: "Nor: why did you do so, or why not?", from: 0.85, to: 1 }
    ]
  };
}

// The one who greets first. The Messenger of Allah ﷺ said: it is not lawful for a man to cut off his brother beyond three
// nights, the two meeting, and this one turning away and that one turning away; and the better of the two is the one
// who begins with the salam (Sahih al-Bukhari 6077). No one is drawn: two places by their homes, a grey shade between
// them; three nights go by, a moon over each; the two meet on the way, and each turns away, a grey voice from each,
// facing away, and they draw apart; then one gives the salam first, a golden voice; the grey goes, a warm glow comes on
// the one who began, the other answers, and a soft light comes over both.
function greetFirst(): SignArt {
  const one: [number, number] = [40, 104.4];
  const other: [number, number] = [120, 104.4];
  const meet = 24;
  const nights: [number, number, number, number][] = [
    [0.03, 0.06, 0.09, 0.11],
    [0.11, 0.14, 0.17, 0.19],
    [0.19, 0.22, 0.25, 0.27]
  ];
  return {
    kind: "greet-first",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(80, 22) },
      { name: "clouds", svg: cloud(36, 28, 0.7, "#FFFFFF", 0.9) + cloud(128, 22, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...nights.map(
        ([a, b, c, d], i): SignPart => ({
          name: `a night ${i + 1}: the sky darkening`,
          svg: `<rect width="160" height="84" fill="#16284C" opacity="0.7"/>${glow(80, 34, 7, "#FFF3C4", 0.1)}${crescent(80, 34, 4, 1.4, "#FFF3C4")}`,
          keys: showWhile(a, b, c, d)
        })
      ),
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a night gone by, counted ${i + 1}`,
          svg: crescent(n(70 + i * 10), 46, 2.4, 0.9, "#8C7350"),
          keys: showFrom(at3(nights[i][1]), at3(nights[i][1] + 0.01))
        })
      ),
      { name: "a home on one side", svg: home(24, 102, 16, 11) },
      { name: "a home on the other side", svg: home(136, 102, 16, 11) },
      { name: "palms", svg: palm(6, 100, 18) + palm(154, 100, 18) + palm(80, 92, 14) },
      { name: "the way between them", svg: way(`M44 108.6 L116 108.6`, "#E7D3A8", 0.9) },
      { name: "a grey shade between them: cut off", svg: wash(80, 103, 26, 5, GREY, 0.14), keys: track({ opacity: [[0.62, 1], [0.72, 0]] }) },
      {
        name: "the place of one of the two",
        svg: someone(one[0], one[1], 1.5, VOICE),
        keys: track({
          xy: [
            [0.33, 0, 0],
            [0.4, meet, 0],
            [0.47, meet, 0],
            [0.52, meet - 8, 0]
          ]
        })
      },
      {
        name: "the place of the other",
        svg: someone(other[0], other[1], 1.5, VOICE),
        keys: track({
          xy: [
            [0.33, 0, 0],
            [0.4, -meet, 0],
            [0.47, -meet, 0],
            [0.52, -meet + 8, 0]
          ]
        })
      },
      { name: "one turning away: a grey voice, facing away", svg: arcsLeft(n(one[0] + meet - 2.6), n(one[1] - 1.8), GREY), keys: track({ opacity: [[0.43, 0], [0.435, 1], [0.62, 1], [0.625, 0]], xy: [[0.47, 0, 0], [0.52, -8, 0]] }) },
      { name: "the other turning away: a grey voice, facing away", svg: arcs(n(other[0] - meet + 2.6), n(other[1] - 1.8), GREY), keys: track({ opacity: [[0.44, 0], [0.445, 1], [0.62, 1], [0.625, 0]], xy: [[0.47, 0, 0], [0.52, 8, 0]] }) },
      { name: "the grey between them, deeper", svg: wash(80, 103.4, 14, 3.6, GREY, 0.18), keys: showWhile(0.45, 0.5, 0.66, 0.72) },
      { name: "the salam, first: a golden voice", svg: arcs(n(one[0] + meet - 8 + 2.6), n(one[1] - 1.8), GOLD), keys: showFrom(0.64, 0.645), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "the better of the two: a warm glow on the one who began", svg: glow(n(one[0] + meet - 8), n(one[1] - 0.8), 6.4, WARM, 0.26), keys: showFrom(0.7, 0.76), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "the other answering the salam", svg: arcsLeft(n(other[0] - meet + 8 - 2.6), n(other[1] - 1.8), "#FFE9A8"), keys: showFrom(0.78, 0.785), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "a soft light over both", svg: wash(80, 102.6, 22, 5, "#FFF3C4", 0.14), keys: showFrom(0.84, 0.9) }
    ],
    words: [
      { text: "None may cut off a brother over three nights", from: 0.02, to: 0.3 },
      { text: "They meet: this one turns away, and that one", from: 0.32, to: 0.6 },
      { text: "The better of the two greets first", from: 0.62, to: 1 }
    ]
  };
}

export const COMPANY_ART = {
  "lamps-in-the-sky": lampsInTheSky,
  "prayer-too-long": prayerTooLong,
  "every-one-a-shepherd": everyOneAShepherd,
  "the-garden-gate": theGardenGate,
  "ship-to-abyssinia": shipToAbyssinia,
  "ten-years-serving": tenYearsServing,
  "greet-first": greetFirst
} satisfies Record<string, () => SignArt>;
