import { animalAt, camelAt, cloud, glow, n, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { track as trackFrom } from "./toldArt";
import { cover, crooked, DARK, DIM, GREY, prayerMat } from "./lovedArt";
import { dish } from "./worthArt";
import { GOLD, hills, land, someone, SPARK, sun, VOICE, WARM, wash } from "./worshipArt";

/**
 * Hope and warning, as the Prophet ﷺ taught them, drawn as the scenes of what lasts are (lastingArt.ts): the seven
 * shaded on the Day when there is no shade but His; the shield of fasting and the two joys of the one who fasts; passing
 * the ruins of al-Hijr weeping, and hurrying through its valley; every child born on the fitrah, as a young animal is
 * born whole; the ten best days for good deeds; the sparrow that dipped its beak in the sea; and the lofty mansions of
 * Paradise, seen like a bright star on the horizon. Only the land, the sky, the sea, buildings, things, plants and
 * animals are drawn. No Prophet and no person is ever drawn, not even a hand or a face: where someone went, a dashed way
 * shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in the air. Nothing is drawn for
 * Allah and nothing comes down from the sky: deeds and words are sparks rising, what He gives is a warm glow or a cool
 * shade, and Paradise is a light far off, or gardens in a soft light.
 */

/** Keys through the given points (toldArt.ts), with no "-0" left by rounding, so an end at 0 reads as 0. */
const track = (points: Parameters<typeof trackFrom>[0]): SignKeys => {
  const keys = trackFrom(points) as Record<string, number[]>;
  for (const key of Object.keys(keys)) keys[key] = keys[key].map((value) => value + 0);
  return keys as SignKeys;
};

/** A light color for places, voices and ways at night. */
const PALE = "#E9E1D2";

/** The cool blue of the shade, and of tears. */
const COOL = "#6FAED3";

/** A crooked voice from (x, y), facing left: lovedArt.ts's crooked voice, turned about. */
const crookedLeft = (x: number, y: number) => `<g transform="translate(${n(2 * x)} 0) scale(-1 1)">${crooked(x, y)}</g>`;

/** Shapes drawn about (x, y), `s` times their size. */
const bigger = (x: number, y: number, s: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${svg}</g>`;

/** A small prayer mat, its middle at (x, y): lovedArt.ts's prayer mat at a little under half its size. */
const smallMat = (x: number, y: number) => bigger(x, y, 0.42, prayerMat(x, y));

/** A tear, a small drop, its middle at (x, y). */
const tear = (x: number, y: number) =>
  `<path d="M${x} ${n(y - 1.3)} Q${n(x + 0.9)} ${n(y + 0.1)} ${x} ${n(y + 0.8)} Q${n(x - 0.9)} ${n(y + 0.1)} ${x} ${n(y - 1.3)} Z" fill="${COOL}"/>`;

/** A soft, cool shade on the ground about (x, y), `rx` across and `ry` high, darkest in the middle. */
export const shadeOf = (x: number, y: number, rx: number, ry: number) =>
  [1, 0.9, 0.8, 0.7, 0.6, 0.5].map((k) => `<ellipse cx="${x}" cy="${y}" rx="${n(rx * k)}" ry="${n(ry * k)}" fill="#5C6F7A" opacity="0.07"/>`).join("") +
  `<ellipse cx="${x}" cy="${y}" rx="${n(rx * 0.85)}" ry="${n(ry * 0.7)}" fill="#CFE6F0" opacity="0.12"/>`;

/** A balance, level: a post with a beam and two pans, its foot's middle at (x, y). */
const balance = (x: number, y: number, color = "#9A6B2E") =>
  `<path d="M${x} ${y} L${x} ${n(y - 7)} M${n(x - 5)} ${n(y - 7)} L${n(x + 5)} ${n(y - 7)} M${n(x - 2)} ${y} L${n(x + 2)} ${y}" stroke="${color}" stroke-width="0.7" stroke-linecap="round"/>` +
  `<path d="M${n(x - 5)} ${n(y - 7)} L${n(x - 6.4)} ${n(y - 3.6)} M${n(x - 5)} ${n(y - 7)} L${n(x - 3.6)} ${n(y - 3.6)} M${n(x + 5)} ${n(y - 7)} L${n(x + 3.6)} ${n(y - 3.6)} M${n(x + 5)} ${n(y - 7)} L${n(x + 6.4)} ${n(y - 3.6)}" stroke="${color}" stroke-width="0.35"/>` +
  `<path d="M${n(x - 7)} ${n(y - 3.6)} Q${n(x - 5)} ${n(y - 1.6)} ${n(x - 3)} ${n(y - 3.6)} Z M${n(x + 3)} ${n(y - 3.6)} Q${n(x + 5)} ${n(y - 1.6)} ${n(x + 7)} ${n(y - 3.6)} Z" fill="#E2B33C"/>`;

/** A little masjid with its dome and minaret, its foot's middle at (x, y). */
const littleMasjid = (x: number, y: number) =>
  `<rect x="${n(x - 6)}" y="${n(y - 6)}" width="12" height="6" fill="#EFE2C2"/>` +
  `<path d="M${n(x - 3.6)} ${n(y - 6)} Q${x} ${n(y - 11.6)} ${n(x + 3.6)} ${n(y - 6)} Z" fill="#7FB07A"/>` +
  `<rect x="${n(x + 6.4)}" y="${n(y - 12)}" width="1.8" height="12" fill="#E6D6B2"/><path d="M${n(x + 6.2)} ${n(y - 12)} L${n(x + 7.3)} ${n(y - 13.8)} L${n(x + 8.4)} ${n(y - 12)} Z" fill="#7FB07A"/>` +
  `<path d="M${n(x - 1.2)} ${y} L${n(x - 1.2)} ${n(y - 2.8)} Q${x} ${n(y - 4)} ${n(x + 1.2)} ${n(y - 2.8)} L${n(x + 1.2)} ${y} Z" fill="#6B4A2E"/>`;

/** A cup, its foot's middle at (x, y). */
export const cup = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${n(y - 3.4)} L${n(x + 1.6)} ${n(y - 3.4)} L${n(x + 1.1)} ${y} L${n(x - 1.1)} ${y} Z" fill="#8FB8D6"/><path d="M${n(x - 1.4)} ${n(y - 2.8)} L${n(x + 1.4)} ${n(y - 2.8)}" stroke="#D8ECF8" stroke-width="0.4"/>`;

/** Food on a dish whose middle is at (x, y): a round loaf and a few dates. */
export const food = (x: number, y: number) =>
  dish(x, y) +
  `<ellipse cx="${n(x - 0.8)}" cy="${n(y - 2.2)}" rx="2.2" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>` +
  [
    [1.6, -1.8],
    [2.7, -1.5],
    [2.2, -2.6]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.8" ry="0.6" fill="#7A2E14"/>`)
    .join("");

/** A small jar of musk, its foot's middle at (x, y). */
export const muskJar = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${y} L${n(x - 2.4)} ${n(y - 4.4)} Q${n(x - 2.4)} ${n(y - 5.8)} ${n(x - 1)} ${n(y - 6.2)} L${n(x - 1)} ${n(y - 7.4)} L${n(x + 1)} ${n(y - 7.4)} L${n(x + 1)} ${n(y - 6.2)} Q${n(x + 2.4)} ${n(y - 5.8)} ${n(x + 2.4)} ${n(y - 4.4)} L${n(x + 2.4)} ${y} Z" fill="#7A4E2E"/>` +
  `<rect x="${n(x - 1.3)}" y="${n(y - 8.6)}" width="2.6" height="1.4" rx="0.4" fill="#D9B26A"/><path d="M${n(x - 1.4)} ${n(y - 4.4)} L${n(x - 1.4)} ${n(y - 1.2)}" stroke="#FFFFFF" stroke-width="0.5" opacity="0.45"/>`;

/** A sweet smell rising: a curl going up from (x, y), `h` high. */
export const curl = (x: number, y: number, color: string, h = 6) =>
  `<path d="M${x} ${y} c-1.4 ${n(-h / 6)} 1.4 ${n(-h / 3)} 0 ${n(-h / 2)} c-1.4 ${n(-h / 6)} 1.4 ${n(-h / 3)} 0 ${n(-h / 2)}" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;

/** A boat with one mast and its sail, the middle of its deck at (x, y). */
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

/** A carved front in the rock of al-Hijr, its foot's middle at (x, y), `w` wide and `h` high: a doorway, and steps at its top. */
const carvedFront = (x: number, y: number, w: number, h: number) => {
  const l = n(x - w / 2);
  const top = n(y - h);
  const step = n(w / 6);
  return (
    `<rect x="${l}" y="${top}" width="${w}" height="${h}" fill="#DDB07E"/>` +
    `<path d="M${l} ${top} L${l} ${n(top - step)} L${n(x - w / 2 + step)} ${n(top - step)} L${n(x - w / 2 + step)} ${n(top - 2 * step)} L${n(x - w / 2 + 2 * step)} ${n(top - 2 * step)} L${n(x - w / 2 + 2 * step)} ${top} Z" fill="#D2A06E"/>` +
    `<path d="M${n(x + w / 2)} ${top} L${n(x + w / 2)} ${n(top - step)} L${n(x + w / 2 - step)} ${n(top - step)} L${n(x + w / 2 - step)} ${n(top - 2 * step)} L${n(x + w / 2 - 2 * step)} ${n(top - 2 * step)} L${n(x + w / 2 - 2 * step)} ${top} Z" fill="#D2A06E"/>` +
    `<rect x="${n(x - w / 2 + 1)}" y="${n(top + h * 0.18)}" width="${n(w - 2)}" height="0.8" fill="#B98552"/>` +
    `<rect x="${n(x - w * 0.16)}" y="${n(y - h * 0.42)}" width="${n(w * 0.32)}" height="${n(h * 0.42)}" fill="#6A4428"/>`
  );
};

/** A doorway of a carved front, as carvedFront() draws it: only its dark opening. */
const doorway = (x: number, y: number, w: number, h: number, fill: string) =>
  `<rect x="${n(x - w * 0.16)}" y="${n(y - h * 0.42)}" width="${n(w * 0.32)}" height="${n(h * 0.42)}" fill="${fill}"/>`;

/** A lofty mansion of Paradise: a white palace with a golden dome, its foot's middle at (x, y), `s` times its size. */
const mansion = (x: number, y: number, s = 1) =>
  bigger(
    x,
    y,
    s,
    `<rect x="${n(x - 4)}" y="${n(y - 5)}" width="8" height="5" fill="#FFF8E8"/>` +
      `<path d="M${n(x - 2.6)} ${n(y - 5)} Q${x} ${n(y - 9.4)} ${n(x + 2.6)} ${n(y - 5)} Z" fill="#F2C94C"/>` +
      `<rect x="${n(x - 5.6)}" y="${n(y - 7.4)}" width="1.4" height="7.4" fill="#FFF3D6"/><rect x="${n(x + 4.2)}" y="${n(y - 7.4)}" width="1.4" height="7.4" fill="#FFF3D6"/>` +
      `<path d="M${n(x - 0.8)} ${y} L${n(x - 0.8)} ${n(y - 2.2)} Q${x} ${n(y - 3)} ${n(x + 0.8)} ${n(y - 2.2)} L${n(x + 0.8)} ${y} Z" fill="#E2B33C"/>`
  );

/** A garden ledge of Paradise about (x, y), `w` from its middle to its ends. */
export const ledge = (x: number, y: number, w: number, top = "#9FD487", face = "#E6D7AE") =>
  `<ellipse cx="${x}" cy="${n(y + 1.8)}" rx="${w}" ry="2.4" fill="${face}"/><ellipse cx="${x}" cy="${y}" rx="${w}" ry="2.4" fill="${top}"/>`;

/** A small round sun-disc for a day of the month, its middle at (x, y). */
const dayDisc = (x: number, y: number, fill: string) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${fill}"/>`;

// Seven in the shade. The Prophet ﷺ said: Allah will give shade, to seven, on the Day when there will be no shade but
// His: a just ruler; a youth who has been brought up in the worship of Allah; a man whose heart is attached to the
// mosques; two persons who love each other only for Allah's sake, and they meet and part in Allah's cause only; a man
// who refuses the call of a charming woman of noble birth, and says: I am afraid of Allah; a man who gives charitable
// gifts so secretly that his left hand does not know what his right hand has given; and a person who remembers Allah in
// seclusion and his eyes are then flooded with tears (Sahih al-Bukhari 660). Nothing is drawn for Allah, and no one is
// drawn: on a wide, flat plain, the places of very many, with heat rising; a hot glare comes over all, and there is no
// shade; then a cool shade spreads over the near plain, and seven places show in it; by the first, a level balance; by
// the second, a prayer mat, and the small place by it grows; a little masjid, and a golden thread from the third place
// to it; two places come together, a warm glow between them, and part; a fine place, sparkling, calls with a crooked
// call, and the fifth place turns away from it, its voice saying: I am afraid of Allah; a sack goes from the sixth
// place to one in need under a cover, unseen; last, the seventh is alone, in a quiet, its tears showing, its
// remembrance rising, and all seven glow in the shade.
function sevenInTheShade(): SignArt {
  const ruler: [number, number] = [16, 100];
  const youth: [number, number] = [34, 101];
  const tied: [number, number] = [52, 100];
  const two: [number, number][] = [
    [70, 101],
    [78, 101]
  ];
  const refuser: [number, number] = [98, 100];
  const giver: [number, number] = [114, 101];
  const needy: [number, number] = [131, 101];
  const alone: [number, number] = [146, 100];
  const seven: [number, number][] = [ruler, youth, tied, [74, 101], [refuser[0] - 5, refuser[1]], giver, alone];
  const gathered: [number, number][] = [
    [10, 70],
    [22, 74],
    [34, 69],
    [46, 73],
    [58, 70],
    [70, 74],
    [82, 69],
    [94, 73],
    [106, 70],
    [118, 74],
    [130, 69],
    [142, 73],
    [152, 69],
    [28, 79],
    [64, 79],
    [100, 79],
    [136, 79]
  ];
  const heat = [
    [20, 66],
    [60, 64],
    [100, 66],
    [140, 64],
    [40, 77],
    [120, 77]
  ]
    .map(([x, y]) => `<path d="M${x} ${y} q1.5 -2 0 -4 q-1.5 -2 0 -4" stroke="#F0BC72" stroke-width="0.6" fill="none"/>`)
    .join("");
  const placeIn = (from: number) => track({ opacity: [[from, 0], [from + 0.02, 1]] });
  return {
    kind: "seven-in-the-shade",
    ms: 12000,
    parts: [
      { name: "a pale sky", svg: sky("#FBF1DC", "#F4E4BF", 58) },
      { name: "a wide, flat plain", svg: `<rect y="58" width="160" height="62" fill="#EADBB7"/><path d="M0 58 L160 58" stroke="#DCC79C" stroke-width="0.6"/>` },
      { name: "the places of very many, on the plain", svg: gathered.map(([x, y]) => someone(x, y, 1.3, GREY)).join("") },
      { name: "heat rising off the plain", svg: heat, loop: { move: "bob", ms: 1800, y: -1.2 } },
      { name: "a hot glare over all, no shade", svg: `<rect width="160" height="120" fill="#FFF7E2" opacity="0.45"/>`, keys: showFrom(0.03, 0.07) },
      {
        name: "a cool shade, spreading",
        svg: shadeOf(80, 99, 80, 13),
        origin: { x: 80, y: 99 },
        keys: track({
          opacity: [
            [0.15, 0],
            [0.17, 1]
          ],
          scaleX: [
            [0.15, 0.2],
            [0.2, 1]
          ]
        })
      },
      { name: "a prayer mat by the second place", svg: smallMat(youth[0] + 1, youth[1] + 2.6), keys: showFrom(0.3, 0.32) },
      { name: "a little masjid", svg: littleMasjid(62, 95), keys: showFrom(0.41, 0.43) },
      { name: "a golden thread from the third place to the masjid", svg: way(`M${tied[0] + 1.6} ${tied[1] - 1.4} Q57 92 61 94.6`, GOLD, 0.8), keys: showFrom(0.43, 0.45) },
      { name: "the first place in the shade", svg: someone(ruler[0], ruler[1], 1.6), keys: placeIn(0.18) },
      {
        name: "the second place, growing up",
        svg: someone(youth[0], youth[1], 1.6),
        origin: { x: youth[0], y: youth[1] },
        keys: track({
          opacity: [
            [0.18, 0],
            [0.2, 1]
          ],
          scale: [
            [0.31, 0.55],
            [0.345, 1]
          ]
        })
      },
      { name: "the third place in the shade", svg: someone(tied[0], tied[1], 1.6), keys: placeIn(0.18) },
      ...two.map(
        ([x, y], i): SignPart => ({
          name: `two who love each other for His sake ${i + 1}`,
          svg: someone(x, y, 1.6),
          keys: track({
            opacity: [
              [0.18, 0],
              [0.2, 1]
            ],
            xy: [
              [0.53, 0, 0],
              [0.555, i ? -2.4 : 2.4, 0],
              [0.575, i ? -2.4 : 2.4, 0],
              [0.595, 0, 0]
            ]
          })
        })
      ),
      {
        name: "the fifth place, turning away",
        svg: someone(refuser[0], refuser[1], 1.6),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.2, 1]
          ],
          xy: [
            [0.67, 0, 0],
            [0.69, -5, 0]
          ]
        })
      },
      { name: "the sixth place in the shade", svg: someone(giver[0], giver[1], 1.6), keys: placeIn(0.18) },
      { name: "the seventh place in the shade", svg: someone(alone[0], alone[1], 1.6), keys: placeIn(0.18) },
      { name: "a just ruler: a balance, level", svg: balance(ruler[0], ruler[1] - 4), keys: showFrom(0.28, 0.3) },
      { name: "its heart, a warm light, tied to the masjid", svg: glow(tied[0], tied[1], 3, WARM, 0.4), keys: showFrom(0.44, 0.47), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "a warm glow between the two, for His sake", svg: glow(74, 101, 5.4, WARM, 0.26), keys: showFrom(0.555, 0.575), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      {
        name: "a fine place, sparkling, calling",
        svg: home(126, 83, 14, 9, "#F6E6C4", "#E2B33C", "#8C6A3A") + sparkle(120, 75.6, 1, "#FFFFFF") + sparkle(132.4, 76.4, 1.2, SPARK),
        keys: showWhile(0.645, 0.665, 0.77, 0.79),
        loop: { move: "twinkle", ms: 900, low: 0.75 }
      },
      { name: "a crooked call from the fine place", svg: crookedLeft(117, 86), keys: showWhile(0.65, 0.665, 0.69, 0.7), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      { name: "a voice from him, refusing: I am afraid", svg: arcsLeft(refuser[0] - 8.4, refuser[1] - 3.6, VOICE), keys: showWhile(0.685, 0.7, 0.77, 0.78), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a calm on the fifth place", svg: glow(refuser[0] - 5, refuser[1], 5, WARM, 0.24), keys: showFrom(0.695, 0.712) },
      { name: "one in need", svg: someone(needy[0], needy[1], 1.4), keys: showFrom(0.765, 0.78) },
      {
        name: "a sack, given in secret",
        svg: sack(giver[0] + 2, 103.4, 0.5),
        keys: track({
          opacity: [
            [0.77, 0],
            [0.78, 1]
          ],
          xy: [
            [0.785, 0, 0],
            [0.82, 13.6, 0]
          ]
        })
      },
      { name: "a cover over it, unseen", svg: bigger(123, 103.6, 1.3, cover(123, 103.6)), keys: showFrom(0.77, 0.785) },
      { name: "a warm glow on the one in need", svg: glow(needy[0], needy[1], 5, WARM, 0.24), keys: showFrom(0.815, 0.83) },
      { name: "a quiet about the seventh, alone", svg: wash(alone[0], alone[1], 8, 6, "#7A93B8", 0.14), keys: showFrom(0.885, 0.91) },
      { name: "its tears, flowing", svg: tear(alone[0] - 2.4, alone[1] - 1.6) + tear(alone[0] + 2.4, alone[1] - 1.4), keys: showFrom(0.9, 0.92), loop: { move: "drip", ms: 1400, distance: 2.4 } },
      {
        name: "its remembrance, rising",
        svg: sparkle(alone[0], alone[1] - 5, 1.3, SPARK),
        keys: track({
          opacity: [
            [0.905, 0],
            [0.915, 1],
            [0.95, 1],
            [0.96, 0]
          ],
          xy: [
            [0.915, 0, 0],
            [0.95, 0, -12]
          ]
        })
      },
      {
        name: "all seven, glowing in the shade",
        svg: seven.map(([x, y]) => glow(x, y, 4.6, WARM, 0.2)).join(""),
        keys: showFrom(0.93, 0.96),
        loop: { move: "twinkle", ms: 1600, low: 0.7 }
      }
    ],
    words: [
      { text: "When there will be no shade but His", from: 0.02, to: 0.125 },
      { text: "Allah will give shade to seven", from: 0.14, to: 0.25 },
      { text: "A just ruler, a youth brought up in worship", from: 0.27, to: 0.38 },
      { text: "One whose heart is attached to the mosques", from: 0.4, to: 0.505 },
      { text: "Two who love each other for Allah's sake", from: 0.52, to: 0.625 },
      { text: "One refuses, saying: I am afraid of Allah", from: 0.64, to: 0.745 },
      { text: "Left hand knows not what the right gave", from: 0.76, to: 0.865 },
      { text: "One remembers Allah alone, eyes in tears", from: 0.88, to: 1 }
    ]
  };
}

// The two joys of the one who fasts. The Prophet ﷺ said: fasting is a shield. So the one fasting should not behave
// foolishly, and if somebody fights with him or abuses him, he should tell him twice: I am fasting. By Him in Whose
// Hands my soul is, the smell coming out from the mouth of a fasting person is better in the sight of Allah than the
// smell of musk. Allah says of him: he has left his food, drink and desires for My sake. The fast is for Me, so I will
// reward it (Sahih al-Bukhari 1894). And: there are two pleasures for the fasting person, one at the time of breaking
// his fast, and the other at the time when he will meet his Lord (Sahih al-Bukhari 1904). Nothing is drawn for Allah,
// and no one is drawn: before dawn, by a home, someone's place, his food and drink by him; as the day breaks, a shield
// of light closes about him; another comes with a crooked voice, his voice answers twice, and the shield holds; the
// other goes away; his food and drink are covered, left; his fast rises as a light and is kept high up; a jar of musk,
// its sweet smell rising, and a sweeter one rising from him; two small lights of joy show over him; the sun sets, the
// food is uncovered, and the first joy comes down on him, a warm glow; last, at night, a golden way goes up to a light
// far off, the second joy rises along it, and a warm glow comes there. The sun crosses the sky as the day goes by.
function twoJoys(): SignArt {
  const faster: [number, number] = [46, 101];
  const other: [number, number] = [74, 102];
  const jar: [number, number] = [62, 104.4];
  const far: [number, number] = [128, 42];
  const firstJoy: [number, number] = [40, 86];
  const secondJoy: [number, number] = [52, 86];
  const shield = `<path d="M${faster[0] - 6.4} 103.4 Q${faster[0] - 6.4} 92 ${faster[0]} 91 Q${faster[0] + 6.4} 92 ${faster[0] + 6.4} 103.4" stroke="#BFE3F5" stroke-width="1" fill="#DFF3FF" fill-opacity="0.25"/>`;
  return {
    kind: "two-joys",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sky at sunset", svg: `<rect width="160" height="61" fill="#EDB28A"/>`, keys: showWhile(0.77, 0.8, 0.885, 0.91) },
      {
        name: "the sun, crossing the sky",
        svg: sun(16, 68),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.09, 12, -26],
            [0.15, 12, -26],
            [0.21, 30, -42],
            [0.28, 30, -42],
            [0.34, 54, -50],
            [0.41, 54, -50],
            [0.47, 78, -48],
            [0.53, 78, -48],
            [0.59, 98, -42],
            [0.65, 98, -42],
            [0.71, 116, -30],
            [0.77, 116, -30],
            [0.8, 132, 0]
          ]
        })
      },
      { name: "clouds", svg: cloud(84, 24, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "his home", svg: home(22, 104, 22, 15) },
      { name: "his food and drink", svg: food(28, 105.6) + cup(35, 105.2) },
      { name: "a jar of musk", svg: muskJar(jar[0], jar[1]), keys: showFrom(0.53, 0.545) },
      { name: "the musk's sweet smell", svg: curl(jar[0], jar[1] - 9.4, "#D99AC8", 5), keys: showFrom(0.545, 0.56), loop: { move: "bob", ms: 2400, y: -1 } },
      { name: "the night before dawn", svg: `<rect width="160" height="120" fill="#16284C" opacity="0.6"/>`, keys: track({ opacity: [[0.03, 1], [0.09, 0]] }) },
      { name: "dusk on the land", svg: `<rect y="61" width="160" height="59" fill="#E8824A" opacity="0.16"/>`, keys: showFrom(0.77, 0.8) },
      { name: "the night", svg: `<rect width="160" height="120" fill="#16284C" opacity="0.62"/>`, keys: showFrom(0.885, 0.91) },
      {
        name: "stars",
        svg: stars([
          [12, 14],
          [34, 26],
          [58, 12],
          [78, 30],
          [96, 16],
          [146, 22],
          [104, 36],
          [20, 40]
        ]),
        keys: showFrom(0.89, 0.92),
        loop: { move: "twinkle", ms: 2200, low: 0.5 }
      },
      { name: "a cover over his food and drink: left", svg: bigger(31.4, 105.6, 1.8, cover(31.4, 105.6)), keys: showWhile(0.29, 0.32, 0.785, 0.8) },
      { name: "fasting, a shield about him", svg: shield, keys: track({ opacity: [[0.04, 0], [0.08, 1]] }), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "someone's place, fasting", svg: someone(faster[0], faster[1], 1.6), keys: track({ opacity: [[0.885, 1], [0.91, 0]] }) },
      { name: "his place, at night", svg: someone(faster[0], faster[1], 1.6, PALE), keys: showFrom(0.885, 0.91) },
      {
        name: "another's place, coming to fight",
        svg: someone(other[0], other[1], 1.5, GREY),
        keys: track({
          opacity: [
            [0.145, 0],
            [0.16, 1],
            [0.31, 1],
            [0.34, 0]
          ],
          xy: [
            [0.28, 0, 0],
            [0.34, 26, 0]
          ]
        })
      },
      { name: "a crooked voice from the other", svg: crookedLeft(other[0] - 3, other[1] - 3.4), keys: showWhile(0.15, 0.165, 0.28, 0.29), loop: { move: "twinkle", ms: 800, low: 0.4 } },
      {
        name: "his voice, twice: I am fasting",
        svg: arcs(faster[0] + 7.6, faster[1] - 3.6, VOICE),
        keys: track({
          opacity: [
            [0.175, 0],
            [0.18, 1],
            [0.188, 1],
            [0.192, 0],
            [0.196, 0],
            [0.2, 1],
            [0.28, 1],
            [0.29, 0]
          ]
        })
      },
      { name: "the shield, holding", svg: glow(faster[0], 97, 7, "#DFF3FF", 0.3), keys: showWhile(0.19, 0.2, 0.28, 0.29) },
      {
        name: "his fast, rising",
        svg: sparkle(faster[0], faster[1] - 7, 1.6, SPARK),
        keys: track({
          opacity: [
            [0.41, 0],
            [0.415, 1],
            [0.455, 1],
            [0.46, 0]
          ],
          xy: [
            [0.415, 0, 0],
            [0.455, 8, -40]
          ]
        })
      },
      { name: "his fast, kept high up, shining", svg: glow(faster[0] + 8, faster[1] - 47, 6.4, WARM, 0.3) + sparkle(faster[0] + 8, faster[1] - 47, 2.6, SPARK), keys: showFrom(0.455, 0.465), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      {
        name: "a sweeter smell from him, rising",
        svg: curl(faster[0] - 2, faster[1] - 12, SPARK, 7) + curl(faster[0] + 2, faster[1] - 13, GOLD, 8),
        keys: track({
          opacity: [
            [0.56, 0],
            [0.57, 1]
          ],
          xy: [
            [0.56, 0, 0],
            [0.59, 0, -6]
          ]
        }),
        loop: { move: "bob", ms: 2000, y: -1.2 }
      },
      {
        name: "the first joy, a small light",
        svg: sparkle(firstJoy[0], firstJoy[1], 1.5, SPARK),
        keys: track({
          opacity: [
            [0.65, 0],
            [0.665, 1],
            [0.81, 1],
            [0.825, 0]
          ],
          xy: [
            [0.8, 0, 0],
            [0.82, faster[0] - firstJoy[0], faster[1] - 4 - firstJoy[1]]
          ]
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.6 }
      },
      {
        name: "the second joy, a small light",
        svg: sparkle(secondJoy[0], secondJoy[1], 1.5, SPARK),
        keys: track({
          opacity: [
            [0.66, 0],
            [0.675, 1],
            [0.95, 1],
            [0.96, 0]
          ],
          xy: [
            [0.92, 0, 0],
            [0.955, far[0] - secondJoy[0], far[1] - secondJoy[1]]
          ]
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.6, phase: 0.5 }
      },
      { name: "the first joy, breaking the fast: a warm glow on him", svg: glow(faster[0], faster[1], 6.4, WARM, 0.26), keys: showFrom(0.805, 0.83), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a light far off, the Hereafter", svg: glow(far[0], far[1], 9, "#FFF3C0", 0.3) + sparkle(far[0], far[1], 2, "#FFF6D0"), keys: showFrom(0.9, 0.925), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "a golden way, up to it", svg: way(`M${faster[0] + 3} 98 C70 84 100 62 ${far[0] - 4} ${far[1] + 3}`, GOLD), keys: showFrom(0.905, 0.93) },
      { name: "the second joy, there: a warm glow", svg: glow(far[0], far[1], 6, WARM, 0.36), keys: showFrom(0.95, 0.965), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "Fasting is a shield", from: 0.02, to: 0.125 },
      { text: "If someone fights, say twice: I am fasting", from: 0.14, to: 0.25 },
      { text: "Allah: they leave food and drink for Me", from: 0.27, to: 0.38 },
      { text: "The fast is for Me, and I will reward it", from: 0.4, to: 0.505 },
      { text: "Better with Allah than the smell of musk", from: 0.52, to: 0.625 },
      { text: "The fasting person has two joys", from: 0.64, to: 0.745 },
      { text: "One at the time of breaking the fast", from: 0.76, to: 0.865 },
      { text: "And the other, when they meet their Lord", from: 0.88, to: 1 }
    ]
  };
}

// The ruins of al-Hijr. When the Prophet ﷺ passed by al-Hijr, he said: do not enter the dwelling places of those people
// who were unjust to themselves unless you enter in a weeping state, lest the same calamity as of theirs should befall
// you. Then he covered his head and made his speed fast till he crossed the valley (Sahih al-Bukhari 4419). And: if you
// do not weep, do not enter (Sahih al-Bukhari 433). No one is drawn: in a valley between rocks with fronts carved into
// them, the dwellings of Thamud; a golden ring, his place, comes along the valley floor, with the places of those with
// him; his voice, and the doorways show dark and empty; tears show by their places; one turns toward a doorway and
// turns back; a dark shade over the dwellings, what befell them, and cracks in the rock; a cover comes over the ring, and
// they all hurry on; last, they cross the valley, and a calm light shows beyond it.
function ruinsOfAlHijr(): SignArt {
  const fronts: [number, number, number, number][] = [
    [22, 90, 12, 17],
    [44, 88, 10, 14],
    [112, 87, 11, 15],
    [134, 89, 12, 17]
  ];
  const leader: [number, number] = [40, 101];
  const followers: [number, number][] = [
    [31, 102],
    [24, 100.6],
    [17, 102],
    [10, 101]
  ];
  // The group comes in from the left, rests, hurries on, then crosses the valley.
  const going = (opacity?: [number, number][]): SignKeys =>
    track({
      opacity,
      xy: [
        [0.03, -40, 0],
        [0.1, 0, 0],
        [0.74, 0, 0],
        [0.8, 44, 0],
        [0.86, 44, 0],
        [0.93, 100, 0]
      ]
    });
  const rockShapes = ["M0 94 L0 66 C6 58 18 56 30 60 C40 54 54 56 62 64 C66 72 66 84 62 94 Z", "M100 92 C96 82 96 70 102 62 C110 54 124 54 134 58 C146 54 158 58 160 64 L160 92 Z"];
  const rocks =
    `<path d="${rockShapes[0]}" fill="#C98F5A"/>` +
    `<path d="${rockShapes[1]}" fill="#C4884F"/>` +
    `<path d="M8 70 C14 66 22 66 28 68 M106 66 C112 62 122 62 128 64" stroke="#E0AE78" stroke-width="1" fill="none" stroke-linecap="round"/>`;
  const farRocks = `<path d="M0 66 C20 58 40 60 60 63 C80 58 100 59 120 62 C140 57 152 58 160 60 L160 70 L0 70 Z" fill="#D9A877"/>`;
  return {
    kind: "ruins-of-al-hijr",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBD3A5", 62) },
      { name: "the sun", svg: sun(140, 18) },
      { name: "rocks far off", svg: farRocks },
      { name: "the valley floor", svg: `<rect y="88" width="160" height="32" fill="#E5C590"/><path d="M0 88 L160 88" stroke="#D3AE74" stroke-width="0.6"/>` + tuft(70, 112, "#B9A060", 4) + tuft(150, 114, "#B9A060", 4) },
      { name: "the rocks of al-Hijr", svg: rocks },
      { name: "their dwellings, carved into the rock", svg: fronts.map(([x, y, w, h]) => carvedFront(x, y, w, h)).join("") },
      { name: "the doorways, dark and empty", svg: fronts.map(([x, y, w, h]) => doorway(x, y, w, h, "#2E1C10")).join(""), keys: showFrom(0.17, 0.2) },
      { name: "what befell them: a dark shade over the dwellings", svg: rockShapes.map((d) => `<path d="${d}" fill="#3A2A26" opacity="0.4"/>`).join(""), keys: showWhile(0.58, 0.61, 0.74, 0.76) },
      {
        name: "cracks in the rock",
        svg: `<path d="M14 72 l3 5 l-2 4 l3 5 M56 66 l-2 5 l3 4 M118 64 l2 5 l-3 4 l2 5 M150 68 l-2 6 l3 5" stroke="#6E4524" stroke-width="0.8" fill="none" stroke-linejoin="round"/>`,
        keys: showFrom(0.59, 0.62)
      },
      { name: "the way along the valley floor", svg: way("M0 101.6 C40 101 90 102 160 100.6", "#B48B5A", 1), keys: showFrom(0.03, 0.08) },
      ...followers.map(([x, y], i): SignPart => ({ name: `the place of one with him ${i + 1}`, svg: someone(x, y, 1.4), keys: going() })),
      {
        name: "one who turns toward a doorway, and back",
        svg: someone(58, 99, 1.4),
        keys: track({
          xy: [
            [0.03, -40, 0],
            [0.1, 0, 0],
            [0.44, 0, 0],
            [0.47, -9, -9.2],
            [0.5, 0, 0],
            [0.74, 0, 0],
            [0.8, 44, 0],
            [0.86, 44, 0],
            [0.93, 100, 0]
          ]
        })
      },
      { name: "a way turning back from the doorway", svg: way("M49.8 90.4 C50.6 95.8 53.8 98.6 56.6 99.2", "#9C7A55", 0.9), keys: showWhile(0.47, 0.5, 0.74, 0.76) },
      { name: "a golden ring, his place", svg: ring(leader[0], leader[1], 3, GOLD), keys: going() },
      {
        name: "a cover over his place",
        svg: `<path d="M${leader[0] - 3.8} ${leader[1] - 0.6} Q${leader[0]} ${leader[1] - 6.4} ${leader[0] + 3.8} ${leader[1] - 0.6} Z" fill="#EFE6D2" stroke="#C9B79A" stroke-width="0.4"/>`,
        keys: going([
          [0.72, 0],
          [0.735, 1]
        ])
      },
      { name: "his voice: do not enter", svg: arcs(leader[0] + 3.6, leader[1] - 3.8, VOICE), keys: showWhile(0.16, 0.17, 0.58, 0.59), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "tears by their places",
        svg: followers.map(([x, y]) => bigger(x + 2.4, y - 2.4, 1.5, tear(x + 2.4, y - 2.4))).join("") + bigger(leader[0] + 3, leader[1] - 3, 1.5, tear(leader[0] + 3, leader[1] - 3)),
        keys: showWhile(0.3, 0.33, 0.72, 0.73),
        loop: { move: "drip", ms: 1400, distance: 2 }
      },
      { name: "a calm light beyond the valley", svg: glow(152, 96, 9, "#FFF3C0", 0.3), keys: showFrom(0.92, 0.95), loop: { move: "twinkle", ms: 1800, low: 0.8 } }
    ],
    words: [
      { text: "When he passed by al-Hijr", from: 0.02, to: 0.13 },
      { text: "Do not enter their dwelling places", from: 0.15, to: 0.27 },
      { text: "Unless you enter weeping", from: 0.29, to: 0.41 },
      { text: "If you do not weep, do not enter", from: 0.43, to: 0.55 },
      { text: "Lest what befell them befall you", from: 0.57, to: 0.69 },
      { text: "Then he covered his head and hurried", from: 0.71, to: 0.83 },
      { text: "Till he crossed the valley", from: 0.85, to: 1 }
    ]
  };
}

// Born on the fitrah. The Prophet ﷺ said: every child is born on the fitrah, and his parents make him a Jew, a
// Christian or a Magian, as an animal gives birth to a whole young one: do you find any part of it cut off? (Sahih
// al-Bukhari 1385). No one is drawn, not the little one, not his parents: by a home, a small new place shows, and a
// soft, pure light on it, the fitrah; two places by him, his parents', and a dashed way from them turns off to the side;
// on the pasture, a she-camel, and a young one shows by her, whole, with a warm glow; last, a ring of looking passes
// over it, and it is whole, with not a part cut off, sparkling.
function bornOnTheFitrah(): SignArt {
  const little: [number, number] = [40, 102];
  const parents: [number, number][] = [
    [33, 101.6],
    [47.4, 101.4]
  ];
  return {
    kind: "born-on-the-fitrah",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "clouds", svg: cloud(82, 24, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a pasture", svg: `<ellipse cx="118" cy="104" rx="40" ry="9" fill="#B9CF7E"/>` + tuft(96, 104, "#6FA348", 5) + tuft(140, 106, "#6FA348", 5) + tuft(124, 110, "#6FA348", 4) },
      { name: "a home", svg: home(24, 100, 24, 16) },
      { name: "a way, turning off to the side", svg: way(`M${parents[1][0] + 2.4} 100.4 C54 98 58 93 60 86.6`, DIM, 1), keys: showFrom(0.31, 0.35) },
      { name: "the she-camel", svg: camelAt(92, 72, 0.3) },
      {
        name: "a young one, born whole",
        svg: camelAt(121.4, 86.3, 0.2),
        origin: { x: 131, y: 101 },
        keys: track({
          opacity: [
            [0.52, 0],
            [0.54, 1]
          ],
          scale: [
            [0.52, 0.6],
            [0.58, 1]
          ]
        })
      },
      { name: "a warm glow by them", svg: glow(131, 95, 10, WARM, 0.2), keys: showFrom(0.57, 0.6), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      {
        name: "a ring of looking, passing over it",
        svg: ring(126, 91, 3.6, "#FFFFFF"),
        keys: track({
          opacity: [
            [0.78, 0],
            [0.79, 1],
            [0.86, 1],
            [0.87, 0]
          ],
          xy: [
            [0.79, 0, 0],
            [0.86, 12, 3]
          ]
        })
      },
      { name: "whole: not a part cut off, sparkling", svg: sparkle(126, 87.6, 1.2, "#FFFFFF") + sparkle(135, 91, 1, "#FFF6D0") + sparkle(141, 97, 1.1, "#FFFFFF"), keys: showFrom(0.86, 0.89), loop: { move: "twinkle", ms: 1100, low: 0.4 } },
      ...parents.map(([x, y], i): SignPart => ({ name: `a place by him ${i + 1}`, svg: someone(x, y, 1.9), keys: showFrom(0.27, 0.3) })),
      {
        name: "the little one's place, new",
        svg: someone(little[0], little[1], 1.1),
        origin: { x: little[0], y: little[1] },
        keys: track({
          opacity: [
            [0.04, 0],
            [0.06, 1]
          ],
          scale: [
            [0.04, 0.4],
            [0.08, 1]
          ]
        })
      },
      { name: "the fitrah, a pure light on him", svg: glow(little[0], little[1], 5, "#FFFFFF", 0.38) + sparkle(little[0], little[1] - 4.4, 1.1, "#FFFFFF"), keys: showFrom(0.07, 0.11), loop: { move: "twinkle", ms: 1600, low: 0.7 } }
    ],
    words: [
      { text: "Every child is born on the fitrah", from: 0.02, to: 0.24 },
      { text: "Parents make one Jew, Christian or Magian", from: 0.26, to: 0.48 },
      { text: "As an animal gives birth to a whole young one", from: 0.5, to: 0.74 },
      { text: "Do you find any part of it cut off?", from: 0.76, to: 1 }
    ]
  };
}

// The best ten days. The Prophet ﷺ said: no good deeds done on other days are superior to those done on these, the first
// ten days of Dhul-Hijjah. Some of his companions said: not even jihad? He replied: not even jihad, except that of a man
// who went out, putting himself and his property in danger, and did not return with any of those things (Sahih
// al-Bukhari 969). Nothing is drawn for Allah, and no one is drawn: a row of days across the sky, each a small disc;
// places doing good, praying, giving and remembering Allah, and the good of other days rises a little; a new crescent,
// and ten of the days turn golden one after another, and the good of these days rises high and bright; by a golden
// ring, his place, a voice asks from among those with him; a voice answers from the ring, and a way goes out from one
// of them toward the horizon; he goes along it with his sack; last, he and his sack go on over the horizon and do not
// come back, and a light shows there.
function bestTenDays(): SignArt {
  const days = Array.from({ length: 20 }, (_, i): [number, number] => [n(12 + i * 7.2), 46]);
  const ten = days.slice(5, 15);
  const doers: [number, number][] = [
    [26, 101],
    [52, 102],
    [84, 101]
  ];
  const ringAt: [number, number] = [132, 103];
  const withHim: [number, number][] = [
    [122, 104.4],
    [142, 104],
    [138, 98.6]
  ];
  const goer: [number, number] = [112, 104];
  const horizon: [number, number] = [150, 64];
  // Along the way out, up past the places by the ring, to the horizon.
  const goingOut = (opacity: [number, number][]): SignKeys =>
    track({
      opacity,
      xy: [
        [0.67, 0, 0],
        [0.72, 7, -15],
        [0.76, 20, -28],
        [0.83, 20, -28],
        [0.88, horizon[0] - 2 - goer[0], horizon[1] + 1 - goer[1]]
      ]
    });
  return {
    kind: "best-ten-days",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "clouds", svg: cloud(80, 22, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a row of days, other days", svg: days.map(([x, y]) => dayDisc(x, y, "#E3D6BC")).join("") },
      { name: "a new crescent, the month of Hajj", svg: crescent(ten[0][0] - 3, 38, 3, 1.4, "#FFF3C0"), keys: showFrom(0.18, 0.2) },
      ...ten.map(
        ([x, y], i): SignPart => ({
          name: `one of the ten days, golden ${i + 1}`,
          svg: glow(x, y, 4, "#FFF3C0", 0.3) + dayDisc(x, y, "#F2C94C"),
          keys: showFrom(at3(0.19 + i * 0.006), at3(0.2 + i * 0.006))
        })
      ),
      { name: "a prayer mat", svg: smallMat(doers[0][0], doers[0][1] + 2.4) },
      { name: "a sack, given", svg: sack(doers[1][0] + 4, 104, 0.5) },
      { name: "places doing good", svg: doers.map(([x, y]) => someone(x, y, 1.5)).join("") + someone(doers[1][0] + 9, doers[1][1], 1.4) },
      { name: "a voice of remembrance", svg: arcs(doers[2][0] + 3.4, doers[2][1] - 3.6, VOICE), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      ...doers.map(
        ([x, y], i): SignPart => ({
          name: `the good of other days, rising a little ${i + 1}`,
          svg: sparkle(x, y - 5, 1.3, "#D9B25C"),
          keys: track({
            opacity: [
              [0.04, 0],
              [0.05, 1]
            ],
            xy: [
              [0.05, 0, 0],
              [0.1, 0, -8]
            ]
          }),
          loop: { move: "twinkle", ms: 1400, low: 0.6, phase: i / 3 }
        })
      ),
      ...doers.map(
        ([x, y], i): SignPart => ({
          name: `the good of these days, rising high ${i + 1}`,
          svg: sparkle(x, y - 5, 2, SPARK) + glow(x, y - 5, 3.4, WARM, 0.3),
          keys: track({
            opacity: [
              [0.24, 0],
              [0.25, 1]
            ],
            xy: [
              [0.25, 0, 0],
              [0.285, 0, -30]
            ]
          }),
          loop: { move: "twinkle", ms: 1200, low: 0.7, phase: i / 3 }
        })
      ),
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "the places of those with him", svg: withHim.map(([x, y]) => someone(x, y, 1.5)).join("") },
      { name: "a voice from among them, asking", svg: arcsLeft(withHim[2][0] - 3.4, withHim[2][1] - 3.4, VOICE), keys: showWhile(0.35, 0.36, 0.51, 0.52), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from the ring, answering", svg: arcsLeft(ringAt[0] - 4.6, ringAt[1] - 3.6, GOLD), keys: showWhile(0.51, 0.52, 0.67, 0.68), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a way going out, toward the horizon", svg: way(`M${goer[0]} ${goer[1] - 3} C116 88 132 74 ${horizon[0] - 2} ${horizon[1] + 2}`, VOICE, 1), keys: showFrom(0.53, 0.57) },
      {
        name: "one who went out",
        svg: someone(goer[0], goer[1], 1.5),
        keys: goingOut([
          [0.86, 1],
          [0.89, 0]
        ])
      },
      {
        name: "his wealth, a sack, going with him",
        svg: sack(goer[0] + 3.4, goer[1] + 2.6, 0.45),
        keys: goingOut([
          [0.86, 1],
          [0.89, 0]
        ])
      },
      { name: "a light at the horizon, where he went", svg: glow(horizon[0], horizon[1] - 2, 8, "#FFF3C0", 0.3) + sparkle(horizon[0], horizon[1] - 2, 1.6, "#FFF6D0"), keys: showFrom(0.89, 0.93), loop: { move: "twinkle", ms: 1600, low: 0.7 } }
    ],
    words: [
      { text: "No good deeds done on other days", from: 0.02, to: 0.15 },
      { text: "Are better than those done on these days", from: 0.17, to: 0.32 },
      { text: "They asked: not even jihad?", from: 0.34, to: 0.48 },
      { text: "Not even jihad, except one who went out", from: 0.5, to: 0.64 },
      { text: "Risking himself and his wealth", from: 0.66, to: 0.8 },
      { text: "And did not return with anything", from: 0.82, to: 1 }
    ]
  };
}

// The sparrow and the sea. The Prophet ﷺ said: Musa stood up and addressed Bani Israel, and he was asked: who is the
// most learned of the people? He said: I am the most learned. Allah admonished him, for he did not attribute knowledge
// to Him, and told him: at the junction of the two seas there is a servant of Mine more learned than you. ... A boat
// passed by them, and they asked to be taken aboard; its crew knew al-Khadir, and carried them without fare. Then a
// sparrow came and stood on the edge of the boat, and dipped its beak once or twice in the sea. Al-Khadir said: O Musa,
// my knowledge and your knowledge have not decreased Allah's knowledge except as much as this sparrow has decreased the
// sea with its beak. ... The Prophet ﷺ said: may Allah have mercy on Musa; we wish he had been patient, so that more of
// their story would be told to us (Sahih al-Bukhari 122). Nothing is drawn for Allah, and no one is drawn, not a
// prophet, not the boy of the story: on a shore, a ring of light, his place, among the places of many; a voice asks
// from them, and his voice answers; a dashed way goes along the shore to where the two seas meet, and a ring shows
// there; a boat comes, and the two rings show on it; a sparrow comes to its edge and dips its beak in the sea, once
// and twice; two small lights show over them, their knowledge, and a light runs over the wide sea; so little on the
// sparrow's beak, a glint, and the sea shines, as full as before; last, the sparrow flies off, and the boat sails on
// into a soft mist far off, where faint lights twinkle.
function sparrowAndTheSea(): SignArt {
  const musa: [number, number] = [28, 101];
  const many: [number, number][] = [
    [14, 98],
    [18, 106],
    [38, 106.4],
    [42, 98],
    [24, 95],
    [34, 94.4]
  ];
  const meeting: [number, number] = [60, 99];
  const deck: [number, number] = [108, 84];
  const aboard: [number, number][] = [
    [101, 82.4],
    [113, 82.4]
  ];
  // The sparrow's box: it sits on the boat's right end (126, 84), facing out over the sea, its beak at about (133, 80.8).
  const edge: [number, number] = [116, 73];
  const dip: [number, number] = [134, 89.6];
  const sails = (opacity: [number, number][]): SignKeys =>
    track({
      opacity,
      xy: [
        [0.89, 0, 0],
        [0.95, 26, -2]
      ]
    });
  const bob = { move: "bob" as const, ms: 2400, y: 0.8 };
  const seas =
    `<path d="M62 120 C64 100 68 80 72 61 L160 61 L160 120 Z" fill="#43A6D6"/>` +
    `<path d="M118 61 C114 74 122 86 116 98 C112 106 116 112 114 120 L160 120 L160 61 Z" fill="#2A6FB4"/>` +
    `<path d="M62 120 C64 100 68 80 72 61" stroke="#F1E6CC" stroke-width="1.2" fill="none"/>`;
  const seam = `<path d="M118 61 C114 74 122 86 116 98 C112 106 116 112 114 120" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="2 3" fill="none" opacity="0.8"/>`;
  return {
    kind: "sparrow-and-the-sea",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 61) },
      { name: "the sun", svg: sun(22, 18) },
      { name: "clouds", svg: cloud(74, 22, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the shore", svg: land() },
      { name: "the two seas", svg: seas },
      { name: "where the two seas meet", svg: seam, loop: { move: "twinkle", ms: 2000, low: 0.4 } },
      { name: "waves", svg: waves(76, 158, 70, 10, "#8FCBEB") + waves(72, 158, 82, 12, "#7FC0E6") + waves(68, 158, 96, 13, "#74B6E0") + waves(66, 158, 110, 14, "#6AAED9"), loop: { move: "bob", ms: 3200, x: 1.6 } },
      { name: "the wide sea, softly shining", svg: `<path d="M62 120 C64 100 68 80 72 61 L160 61 L160 120 Z" fill="#FFFFFF" opacity="0.12"/>`, keys: showFrom(0.7, 0.71) },
      { name: "a rock by the meeting of the seas", svg: `<path d="M58 104 C58 98 61 95 65 95 C69 95 72 98 72 104 Z" fill="#8F8B84"/><path d="M61 99.4 C62 97.6 63.4 96.8 65 96.8" stroke="#B4B0A8" stroke-width="1" fill="none" stroke-linecap="round"/>` },
      { name: "the places of many on the shore", svg: many.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "a voice from them, asking", svg: arcs(many[0][0] + 3.4, many[0][1] - 3.4, VOICE), keys: showWhile(0.03, 0.04, 0.15, 0.16), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "his place, a ring of light", svg: ring(musa[0], musa[1], 3, "#FFF3CF") + ring(musa[0], musa[1], 2, GOLD), keys: track({ opacity: [[0.45, 1], [0.47, 0]] }) },
      { name: "his voice: I am the most learned", svg: arcs(musa[0] + 4, musa[1] - 3.6, VOICE), keys: showWhile(0.15, 0.16, 0.28, 0.29), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a way along the shore to where the seas meet", svg: way(`M${musa[0] + 4} ${musa[1] + 1} C40 104 50 103 ${meeting[0] - 3} ${meeting[1] + 1}`, "#B48B5A", 1), keys: showFrom(0.28, 0.33) },
      { name: "one more learned: a ring there", svg: ring(meeting[0], meeting[1], 3, "#FFF3CF") + ring(meeting[0], meeting[1], 2, "#8FCBEB"), keys: track({ opacity: [[0.32, 0], [0.35, 1], [0.45, 1], [0.47, 0]] }) },
      {
        name: "a boat, carrying them",
        svg: boat(deck[0], deck[1]),
        origin: { x: deck[0], y: deck[1] + 4 },
        keys: track({
          opacity: [
            [0.41, 0],
            [0.42, 1]
          ],
          xy: [
            [0.41, 50, 0],
            [0.46, 0, 0],
            [0.89, 0, 0],
            [0.95, 26, -2]
          ]
        }),
        loop: bob
      },
      ...aboard.map(
        ([x, y], i): SignPart => ({
          name: i ? "one more learned, on the boat" : "his place, on the boat",
          svg: ring(x, y, 2.6, "#FFF3CF") + ring(x, y, 1.7, i ? "#8FCBEB" : GOLD),
          keys: sails([
            [0.46, 0],
            [0.475, 1]
          ]),
          loop: bob
        })
      ),
      {
        name: "a sparrow, on the edge of the boat",
        svg: animalAt("sparrow", edge[0], edge[1], 0.2),
        origin: { x: 126, y: 84 },
        keys: track({
          opacity: [
            [0.53, 0],
            [0.535, 1],
            [0.89, 1],
            [0.9, 0]
          ],
          xy: [
            [0.53, 26, -28],
            [0.56, 0, 0],
            [0.565, 0, 0],
            [0.572, 3, 6],
            [0.579, 0, 0],
            [0.586, 3, 6],
            [0.593, 0, 0],
            [0.89, 0, 0],
            [0.9, 16, -20]
          ],
          rotate: [
            [0.565, 0],
            [0.572, 30],
            [0.579, 0],
            [0.586, 30],
            [0.593, 0]
          ]
        }),
        loop: bob
      },
      ...[0, 1].map(
        (i): SignPart => ({
          name: `a ring on the water ${i + 1}`,
          svg: ring(dip[0], dip[1], 2, "#FFFFFF"),
          origin: { x: dip[0], y: dip[1] },
          keys: track({
            opacity: [
              [0.572 + i * 0.014, 0],
              [0.575 + i * 0.014, 1],
              [0.594, 0.6],
              [0.65, 0.6],
              [0.66, 0]
            ],
            scale: [
              [0.572 + i * 0.014, 0.4],
              [0.594, 1.6]
            ]
          })
        })
      ),
      ...aboard.map(
        ([x, y], i): SignPart => ({
          name: `their knowledge, a small light ${i + 1}`,
          svg: sparkle(x, y - 5.4, 1.4, SPARK),
          keys: sails([
            [0.65 + i * 0.01, 0],
            [0.665 + i * 0.01, 1]
          ]),
          loop: bob
        })
      ),
      {
        name: "a light running over the wide sea",
        svg: `<path d="M66 120 L72 120 L80 61 L75 61 Z" fill="#FFF6D0" opacity="0.32"/>`,
        keys: track({
          opacity: [
            [0.68, 0],
            [0.685, 1],
            [0.705, 1],
            [0.71, 0]
          ],
          xy: [
            [0.68, 0, 0],
            [0.71, 78, 0]
          ]
        })
      },
      { name: "so little on its beak, a glint", svg: glow(edge[0] + 17, edge[1] + 7.8, 2.4, "#FFFFFF", 0.3) + sparkle(edge[0] + 17, edge[1] + 7.8, 1.3, "#FFFFFF"), keys: showWhile(0.77, 0.785, 0.89, 0.9), loop: bob },
      { name: "the sea, as full as before, shining", svg: [84, 96, 132, 146, 108].map((x, i) => sparkle(x, 76 + (i % 2 ? 14 : 0) + (i === 4 ? 26 : 0), 1.2, "#FFF6D0")).join(""), keys: showFrom(0.79, 0.82), loop: { move: "twinkle", ms: 1200, low: 0.4 } },
      { name: "a soft mist far off: more of their story, untold", svg: wash(150, 74, 24, 14, "#FFFFFF", 0.3) + sparkle(144, 70, 0.9, "#FFFFFF") + sparkle(154, 78, 0.8, "#FFF6D0") + sparkle(148, 82, 0.7, "#FFFFFF"), keys: showFrom(0.89, 0.92), loop: { move: "twinkle", ms: 1800, low: 0.5 } }
    ],
    words: [
      { text: "Musa was asked: who is the most learned?", from: 0.02, to: 0.125 },
      { text: "Musa said: I am the most learned", from: 0.14, to: 0.25 },
      { text: "At the two seas is one more learned than you", from: 0.27, to: 0.38 },
      { text: "A boat carried them without fare", from: 0.4, to: 0.505 },
      { text: "A sparrow dipped its beak in the sea", from: 0.52, to: 0.625 },
      { text: "Al-Khidr: our knowing lessens not Allah's", from: 0.64, to: 0.745 },
      { text: "Except as this sparrow decreased the sea", from: 0.76, to: 0.865 },
      { text: "If only Musa had been more patient", from: 0.88, to: 1 }
    ]
  };
}

// The lofty mansions. The Prophet ﷺ said: the people of Paradise will look at the dwellers of the lofty mansions above
// them as one looks at a brilliant star far away on the horizon, in the East or in the West, because of their
// superiority over one another. The people said: O Messenger of Allah, are these lofty mansions for the prophets, which
// nobody else can reach? He replied: no, by Him in Whose Hand my soul is, these are for men who believed in Allah and
// believed the messengers (Sahih al-Bukhari 3256). Nothing is drawn for Allah, and no one is drawn: far off, in a soft
// light, the gardens of Paradise, one above another, and small places in them; high above, lofty mansions on its far
// horizon; they shine like bright stars, first those in the east, then those in the west; the gardens glow, one above
// another; below, in this world, by the masjid, a golden ring, his place, and the places of those with him; a voice
// asks from them, and a voice answers from the ring; last, golden ways rise from their places up to the mansions, and a
// warm glow comes on the mansions.
function loftyMansions(): SignArt {
  const ringAt: [number, number] = [40, 104];
  const withHim: [number, number][] = [
    [29, 105],
    [51, 105],
    [60, 102.6]
  ];
  const east: [number, number][] = [
    [134, 47],
    [148, 49]
  ];
  const west: [number, number][] = [
    [78, 47],
    [92, 49]
  ];
  const ledges: [number, number, number][] = [
    [112, 86, 44],
    [114, 74, 34],
    [113, 62, 26]
  ];
  const dwellers: [number, number][] = [
    [88, 85],
    [104, 86],
    [128, 85],
    [142, 86],
    [100, 73],
    [122, 73],
    [110, 61],
    [118, 61]
  ];
  return {
    kind: "lofty-mansions",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#E9D7AF", 92) },
      { name: "clouds", svg: cloud(30, 30, 0.3, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the land of this world", svg: `<rect y="92" width="160" height="28" fill="#E2CB9C"/><path d="M0 92 L160 92" stroke="#CDB27F" stroke-width="0.6"/>` + tuft(80, 110, "#B9A060", 4) + tuft(150, 112, "#B9A060", 4) },
      { name: "the masjid", svg: madinahMasjid(4, 103, 0.38) },
      { name: "Paradise, a soft light far off", svg: wash(114, 66, 52, 30, "#FFF8E0", 0.36) + glow(114, 60, 26, "#FFF3C0", 0.08), keys: showFrom(0.03, 0.06), loop: { move: "twinkle", ms: 2200, low: 0.85 } },
      ...ledges.map(([x, y, w], i): SignPart => ({ name: `a garden of Paradise, one above another ${i + 1}`, svg: ledge(x, y, w), keys: showFrom(0.03, 0.06) })),
      { name: "the places of the dwellers there", svg: dwellers.map(([x, y]) => someone(x, y, 1, "#C39A5A")).join(""), keys: showFrom(0.05, 0.08) },
      { name: "the lofty mansions in the east", svg: east.map(([x, y]) => mansion(x, y, 0.9)).join(""), keys: showFrom(0.07, 0.1) },
      { name: "the lofty mansions in the west", svg: west.map(([x, y]) => mansion(x, y, 0.9)).join(""), keys: showFrom(0.07, 0.1) },
      {
        name: "the mansions, shining like bright stars",
        svg: [...east, ...west].map(([x, y]) => glow(x, y - 5, 5.4, WARM, 0.22) + sparkle(x, y - 10.4, 2.4, SPARK) + sparkle(x, y - 10.4, 1.2, "#FFFFFF")).join(""),
        keys: showFrom(0.16, 0.2),
        loop: { move: "twinkle", ms: 1200, low: 0.45 }
      },
      { name: "the east, brighter", svg: glow(141, 44, 12, "#FFF3C0", 0.24), keys: showFrom(0.3, 0.33), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "the west, brighter", svg: glow(85, 44, 12, "#FFF3C0", 0.24), keys: showFrom(0.34, 0.37), loop: { move: "twinkle", ms: 1600, low: 0.7, phase: 0.5 } },
      ...ledges.map(
        ([x, y, w], i): SignPart => ({
          name: `a rank above another, glowing ${i + 1}`,
          svg: `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="2.4" fill="none" stroke="${SPARK}" stroke-width="0.9" opacity="${0.6 + 0.2 * i}"/>` + sparkle(x, y - 3.4, 1 + 0.3 * i, SPARK),
          keys: showFrom(at3(0.44 + i * 0.02), at3(0.46 + i * 0.02))
        })
      ),
      { name: "a golden ring, his place", svg: ring(ringAt[0], ringAt[1], 3.2, GOLD) },
      { name: "the places of those with him", svg: withHim.map(([x, y]) => someone(x, y, 1.5)).join("") },
      { name: "a voice from among them, asking", svg: arcsLeft(withHim[1][0] - 3.4, withHim[1][1] - 3.6, VOICE), keys: showWhile(0.58, 0.59, 0.73, 0.74), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "a voice from the ring, answering", svg: arcs(ringAt[0] + 4.4, ringAt[1] - 3.6, GOLD), keys: showWhile(0.72, 0.73, 0.86, 0.87), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      {
        name: "golden ways up to the mansions, for those who believed",
        svg:
          way(`M${withHim[0][0] + 1} ${withHim[0][1] - 3} C34 84 60 62 ${west[0][0] - 2} ${west[0][1] + 2}`, GOLD) +
          way(`M${withHim[1][0] + 1} ${withHim[1][1] - 3} C70 84 100 64 ${east[0][0] - 3} ${east[0][1] + 2}`, GOLD) +
          way(`M${withHim[2][0] + 2} ${withHim[2][1] - 3} C90 84 130 70 ${east[1][0] - 2} ${east[1][1] + 2}`, GOLD),
        keys: showFrom(0.86, 0.91)
      },
      { name: "the mansions, a warm glow", svg: [...east, ...west].map(([x, y]) => glow(x, y - 4, 6, WARM, 0.3)).join(""), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1400, low: 0.7 } }
    ],
    words: [
      { text: "They will see the lofty mansions above them", from: 0.02, to: 0.13 },
      { text: "Like a brilliant star far away on the horizon", from: 0.15, to: 0.27 },
      { text: "In the East or in the West", from: 0.29, to: 0.41 },
      { text: "Because of the ranks between them", from: 0.43, to: 0.55 },
      { text: "They asked: are these only for the prophets?", from: 0.57, to: 0.69 },
      { text: "No: by Him in whose Hand my soul is", from: 0.71, to: 0.83 },
      { text: "Believers in Allah and in the messengers", from: 0.85, to: 1 }
    ]
  };
}

export const HOPE_ART = {
  "seven-in-the-shade": sevenInTheShade,
  "two-joys": twoJoys,
  "ruins-of-al-hijr": ruinsOfAlHijr,
  "born-on-the-fitrah": bornOnTheFitrah,
  "best-ten-days": bestTenDays,
  "sparrow-and-the-sea": sparrowAndTheSea,
  "lofty-mansions": loftyMansions
};
