import { animalAt, cloud, dateBunch, flame, glow, n, palm, peaks, sky, stars, tuft, type SignArt } from "./signDraw";
import { madinahMasjid, ring, showWhile, way } from "./giveArt";
import { comeIn, risingSparks } from "./charityArt";
import { arcs, BROWN, CREAM, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";

/**
 * Stories of the Companions, drawn as the scenes of manners and worship are (mannersArt.ts): Ka'b ibn Malik, who stayed
 * behind from Tabuk and told the truth; the cave of Thawr on the Hijrah; and the plague in Sham, when Umar turned back
 * from Sargh. Only the land, the sky, homes, the masjid, a cave, things and animals are drawn. No Prophet, no Companion
 * and no person is ever drawn: where someone went, a dashed way shows it, and a voice is arcs or rings in the air.
 * Nothing is drawn for Allah, and nothing comes down from the sky: joy is sparks rising from where it was.
 */

const NIGHT = "#0F1C3A";

/** A voice's three arcs, from (x, y), facing left. */
export const arcsLeft = (x: number, y: number, color = "#FFFFFF") =>
  [0, 1, 2]
    .map((i) => {
      const ax = n(x - i * 2.2);
      const h = 1.6 + i * 1.1;
      return `<path d="M${ax} ${n(y - h)} Q${n(ax - h * 0.7)} ${y} ${ax} ${n(y + h)}" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
    })
    .join("");

/** A tent, its foot's middle at (x, y), `w` wide and `h` high, with its dark doorway. */
const tent = (x: number, y: number, w: number, h: number, fill = "#EFE3C6") =>
  `<path d="M${n(x - w / 2)} ${y} L${x} ${n(y - h)} L${n(x + w / 2)} ${y} Z" fill="${fill}"/>` +
  `<path d="M${x} ${n(y - h)} L${n(x + w / 2)} ${y} L${n(x + w * 0.18)} ${y} Z" fill="#000000" opacity="0.1"/>` +
  `<path d="M${n(x - w * 0.12)} ${y} L${x} ${n(y - h * 0.5)} L${n(x + w * 0.12)} ${y} Z" fill="#6B4A2E"/>` +
  `<path d="M${x} ${n(y - h)} L${x} ${n(y - h - 1.6)}" stroke="#7E6447" stroke-width="0.6"/>`;

/** Keys for a night that falls from `from` and has lifted by `to`. */
const nightKeys = (from: number, to: number, value = 1) => ({ at: [0, from, at3(from + 0.012), at3(to - 0.03), to], opacity: [0, 0, value, value, 0] });

// Ka'b ibn Malik and Tabuk. Ka'b said: I was never stronger or richer than when I stayed behind from Tabuk; I had two
// she-camels for the first time. It was in great heat, when the fruit was ripe and the shade pleasant. I would go out
// to get ready and come back with nothing done, telling myself: I can do it; until the army had gone. When the Prophet
// ﷺ came back to the masjid, over eighty made excuses; I said: by Allah, I had no excuse; and he said: this one has told
// the truth. No one spoke to us for fifty nights, and the earth itself seemed strange to me. A letter came from the
// king of Ghassan, and I put it in the oven. After Fajr on the fiftieth morning, a voice called from the top of Sala': O
// Ka'b ibn Malik, be happy! And the voice was faster than the horse (Sahih al-Bukhari 4418); the earth had closed in on
// them, wide as it was (Quran 9:118). No one is drawn: his two camels by his home under the ripe palms; the army's ways
// up the road to Tabuk while his way goes out and back; their ways back, and his way to the masjid with the truth
// told; nights, and the land closing in; a letter along a way from Sham into the oven's fire; then the call in rings
// from Sala', a horse galloping, the land opening, and sparks rising from his home.
function tabuk(): SignArt {
  const sala = peaks([[24, 30, 30]], 62, "#8E6E55", false);
  const hills = peaks(
    [
      [88, 10, 24],
      [146, 12, 26]
    ],
    62,
    "#A88466",
    false
  );
  const road = `<path d="M36 106 C50 99 62 91 72 83 C82 75 92 67 100 61 L104 61 C97 67 88 75 79 84 C69 93 57 101 46 108 Z" fill="#EEDDB0"/>`;
  const palms = palm(104, 90, 22) + palm(150, 88, 16) + palm(64, 76, 11);
  const dates = dateBunch(103.4, 71.6) + dateBunch(108.6, 72.2) + dateBunch(149.4, 75.4) + dateBunch(153.6, 75.8) + dateBunch(64.9, 67.8);
  const oven =
    `<path d="M131 106 Q131 97.6 138 97 Q145 97.6 145 106 Z" fill="#B77448"/><path d="M138 97 Q145 97.6 145 106 L141 106 Q141 99 138 97 Z" fill="#000000" opacity="0.12"/>` +
    `<ellipse cx="138" cy="97.6" rx="3" ry="1" fill="#3E2616"/><rect x="130" y="105.4" width="16" height="1.4" rx="0.6" fill="#9C6038"/>`;
  const heat = [
    [28, 72],
    [70, 68],
    [120, 70],
    [52, 82]
  ]
    .map(([x, y]) => `<path d="M${x} ${y} q1.5 -1.6 3 0 q1.5 1.6 3 0 q1.5 -1.6 3 0" stroke="#FFFFFF" stroke-width="0.6" fill="none" opacity="0.7"/>`)
    .join("");
  // Two columns of the army's ways up the road, nearer to farther.
  const columns = [
    ["M40 103 C52 97 62 89 72 81", "M72 81 C80 74 88 68 95 63.8", "M95 63.8 C97 62.6 99 61.6 101 60.8"],
    ["M45 106 C57 100 67 92 77 84", "M77 84 C85 77 92 70.6 98 65.6", "M98 65.6 C100 64 101.6 62.6 103 61.4"]
  ];
  const widths = [1.1, 0.9, 0.6];
  const outAndBack = "M124 99 C116 101.6 108 103.4 100 103.2 C108 105.2 116 104.4 124.4 100.8";
  const toMasjid = ["M124 99.4 C108 104 90 108 70 108.4", "M70 108.4 C58 108.6 50 108 44 106.6"];
  const fromSham = ["M164 110 C152 109 142 106.6 134 103.4", "M134 103.4 C130 101.8 128 100.4 126.6 99"];
  const letter =
    `<rect x="123" y="93" width="6" height="4" fill="#F7F0DE" stroke="#B8A070" stroke-width="0.3"/>` +
    `<path d="M123 93 L126 95.4 L129 93" stroke="#B8A070" stroke-width="0.3" fill="none"/><circle cx="126" cy="95.6" r="0.7" fill="#B23A2E"/>`;
  // The earth closing in: dark all round, but for an oval in the middle.
  const narrow = [1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48]
    .map((k) => {
      const rx = n(66 * k);
      const ry = n(36 * k);
      return `<path d="M-80 -60 H240 V180 H-80 Z M${n(80 - rx)} 76 A${rx} ${ry} 0 1 0 ${n(80 + rx)} 76 A${rx} ${ry} 0 1 0 ${n(80 - rx)} 76 Z" fill="#0B1426" opacity="0.13" fill-rule="evenodd"/>`;
    })
    .join("");
  const flicker = { at: [0, 0.5, 0.512, 0.524, 0.536, 0.548, 0.56, 0.84, 0.87] };
  return {
    kind: "tabuk",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E3F5", "#F1E7CC", 52) },
      {
        name: "the sun, in great heat",
        svg: `${glow(136, 30, 20, "#FFF4C8", 0.14)}<circle cx="136" cy="30" r="6.5" fill="#FFF0B0"/>`,
        // It comes with the heat (so a question on the weather does not show it before it is answered), and goes with
        // the nights.
        keys: { at: [0, 0.03, 0.07, 0.5, 0.51, 0.86, 0.9], opacity: [0, 0, 1, 1, 0, 0, 1] },
        loop: { move: "twinkle", ms: 1800, low: 0.85 }
      },
      { name: "clouds", svg: cloud(70, 36, 0.5, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "the mountain of Sala'", svg: sala },
      { name: "the hills of Madinah", svg: hills },
      {
        name: "the land",
        svg: landOf([
          [60, 70],
          [118, 70],
          [150, 114],
          [10, 114],
          [92, 116]
        ])
      },
      { name: "the road to Tabuk", svg: road },
      { name: "palms of Madinah", svg: palms, origin: { x: 104, y: 90 }, loop: { move: "sway", ms: 3600, angle: 0.6 } },
      { name: "ripe dates on the palms", svg: dates, keys: showFrom(0.08, 0.11), origin: { x: 104, y: 90 }, loop: { move: "sway", ms: 3600, angle: 0.6 } },
      { name: "the pleasant shade", svg: `<ellipse cx="96" cy="104" rx="18" ry="3.2" fill="#5A4026" opacity="0.18"/>`, keys: showFrom(0.1, 0.13) },
      { name: "the masjid in Madinah", svg: madinahMasjid(4, 106, 0.8) },
      { name: "his home", svg: home(126, 98, 30, 19) },
      { name: "the oven by his home", svg: oven },
      { name: "his first she-camel", svg: animalAt("camel", 64, 87, 0.21), keys: { at: [0, 0.03, 0.07], opacity: [0, 0, 1], y: [3, 3, 0] } },
      { name: "his second she-camel", svg: animalAt("camel", 82, 90, 0.21), keys: { at: [0, 0.06, 0.1], opacity: [0, 0, 1], y: [3, 3, 0] } },
      { name: "heat in the air", svg: heat, keys: showWhile(0.03, 0.07, 0.49, 0.5), loop: { move: "bob", ms: 1600, y: -1.5 } },
      ...columns.flatMap((list, i) =>
        list.map((d, j) => ({
          name: `the army's way to Tabuk ${i + 1}, part ${j + 1}`,
          svg: way(d, BROWN, widths[j]),
          keys: showWhile(at3(0.18 + j * 0.03 + i * 0.012), at3(0.21 + j * 0.03 + i * 0.012), 0.336, 0.35)
        }))
      ),
      ...[0, 1, 2].map((i) => {
        const t = at3(0.19 + i * 0.014);
        return {
          name: `a camel of the army ${i + 1}`,
          svg: animalAt("camel", 41.5, 90, 0.13),
          keys: { at: [0, t, at3(t + 0.004), at3(t + 0.06), at3(t + 0.064)], opacity: [0, 0, 1, 1, 0], x: [0, 0, 0, 50, 50], y: [0, 0, 0, -36.6, -36.6], scale: [1, 1, 1, 0.3, 0.3] },
          origin: { x: 48, y: 100 },
          loop: { move: "bob" as const, ms: 700, y: -0.5 }
        };
      }),
      { name: "his way out to get ready, the first morning", svg: way(outAndBack, BROWN, 1), keys: showWhile(0.19, 0.2, 0.218, 0.226) },
      { name: "his way out to get ready, the next morning", svg: way(outAndBack, BROWN, 1), keys: showWhile(0.236, 0.246, 0.264, 0.272) },
      ...columns.flatMap((list, i) =>
        list.map((d, j) => ({
          name: `the army's way back from Tabuk ${i + 1}, part ${j + 1}`,
          svg: way(d, BROWN, widths[j]),
          keys: showWhile(at3(0.35 + (2 - j) * 0.016 + i * 0.008), at3(0.366 + (2 - j) * 0.016 + i * 0.008), 0.49, 0.5)
        }))
      ),
      ...toMasjid.map((d, i) => ({ name: `his way to the masjid, part ${i + 1}`, svg: way(d, CREAM, 1.2), keys: showFrom(at3(0.396 + i * 0.014), at3(0.41 + i * 0.014)) })),
      { name: "the truth, told", svg: arcsLeft(42, 103.4), keys: showWhile(0.426, 0.436, 0.49, 0.5), origin: { x: 40, y: 103.4 }, loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "night", svg: `<rect width="160" height="120" fill="${NIGHT}"/>`, keys: { ...flicker, opacity: [0, 0, 0.68, 0.24, 0.68, 0.24, 0.68, 0.68, 0] } },
      {
        name: "the moon and stars of the nights",
        svg: `${glow(70, 30, 8, "#FFF6D0", 0.1)}${crescent(70, 30, 4, 1.6, "#FFF6D0")}${stars([
          [44, 40],
          [96, 34],
          [112, 46],
          [140, 30],
          [150, 44],
          [58, 26]
        ])}`,
        keys: { ...flicker, opacity: [0, 0, 1, 0, 1, 0, 1, 1, 0] },
        loop: { move: "twinkle", ms: 2400, low: 0.7 }
      },
      { name: "the earth, closing in", svg: narrow, keys: { at: [0, 0.556, 0.6, 0.84, 0.88], opacity: [0, 0, 1, 1, 0], scale: [1.6, 1.6, 1, 1, 1.6] }, origin: { x: 80, y: 76 } },
      { name: "his greeting, with no answer", svg: arcsLeft(42, 103.4), keys: showWhile(0.578, 0.588, 0.614, 0.626), origin: { x: 40, y: 103.4 }, loop: { move: "twinkle", ms: 700, low: 0.5 } },
      ...fromSham.map((d, i) => ({ name: `a way from Sham, with a letter, part ${i + 1}`, svg: way(d, "#C9B48A", 1), keys: showWhile(at3(0.664 + i * 0.006), at3(0.676 + i * 0.006), 0.826, 0.84) })),
      {
        name: "a letter from Ghassan",
        svg: letter,
        keys: { at: [0, 0.676, 0.68, 0.716, 0.73, 0.75, 0.762], opacity: [0, 0, 1, 1, 1, 1, 0], x: [36, 36, 35, 0, 0, 12, 12], y: [13, 13, 12.6, 0, 0, 2.6, 3.2], scale: [1, 1, 1, 1, 1, 0.7, 0.3] },
        origin: { x: 126, y: 95 }
      },
      { name: "the oven's fire, burning it", svg: flame(138, 97.4, 6), keys: { at: [0, 0.75, 0.766], opacity: [0, 0, 1], scale: [0.3, 0.3, 1] }, origin: { x: 138, y: 97.4 }, loop: { move: "twinkle", ms: 500, low: 0.75 } },
      { name: "the light of the fiftieth morning", svg: `<rect width="160" height="62" fill="#F6C9A8" opacity="0.5"/>`, keys: { at: [0, 0.84, 0.86, 0.92, 0.96], opacity: [0, 0, 1, 1, 0] } },
      ...[4, 7.5, 11].map((r, i) => ({
        name: `the call from the top of Sala', ring ${i + 1}`,
        svg: ring(24, 33, r, "#FFFFFF"),
        keys: showFrom(at3(0.862 + i * 0.014), at3(0.872 + i * 0.014)),
        loop: { move: "twinkle" as const, ms: 1000, low: 0.3, phase: i / 3 }
      })),
      { name: "the call, heard at his home", svg: arcs(102, 84), keys: showFrom(0.9, 0.91), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "a horse, galloping with the good news", svg: animalAt("horse", 46, 94, 0.17), keys: comeIn(0.9, 0.946, -56), loop: { move: "bob", ms: 420, y: -0.8 } },
      ...risingSparks(
        "a spark of joy, rising",
        [
          [114, 82],
          [122, 79],
          [130, 82],
          [118, 76],
          [127, 74],
          [136, 80]
        ],
        0.88,
        0.007,
        { stay: true, rise: 14 }
      )
    ],
    words: [
      { text: "Never stronger, never richer", from: 0.02, to: 0.16 },
      { text: "Ka'b: I kept delaying, and the army left", from: 0.18, to: 0.32 },
      { text: "Ka'b: I told him the plain truth", from: 0.34, to: 0.48 },
      { text: "Ka'b: Fifty nights, no one spoke to me", from: 0.5, to: 0.64 },
      { text: "A king's letter went into the oven", from: 0.66, to: 0.82 },
      { text: "O Ka'b ibn Malik, be happy!", from: 0.84, to: 1 }
    ]
  };
}

// The cave of Thawr. Abu Bakr was told to wait to make the Hijrah with the Prophet ﷺ, and he fed two she-camels the
// leaves of the samur tree for four months. Then one day at noon, at an hour he never came, the Prophet ﷺ came to his
// door: leave had been given. They packed food in a bag, and Asma cut her belt to tie its mouth, and was named the one
// with two belts. They stayed three nights in a cave on the mountain of Thawr, and Amir ibn Fuhayrah grazed sheep near
// them; their guide brought their two camels on the morning after the third night, and took them by the coast (Sahih
// al-Bukhari 3905). Abu Bakr said: if one of them looked down at his feet, he would see us; he ﷺ said: what do you think
// of two, the third of whom is Allah? (Sahih al-Bukhari 3653). No one is drawn, and nothing for Allah: the two camels
// under the samur tree, its leaves falling, four moons counted; the sun at noon and a way to the door; the food bag,
// the belt cut in two and its half tying the bag; at night two ways up to the cave, sheep grazing below, three nights
// counted; the ways of those chasing them, standing above the cave; then the morning, a way bringing the two camels, and
// the way setting out.
function thawr(): SignArt {
  const hills = peaks(
    [
      [30, 14, 26],
      [74, 10, 22]
    ],
    62,
    "#7F6650",
    false
  );
  const mountain =
    `<path d="M74 104 C84 88 94 70 106 56 C112 48 120 40 128 37 C136 39 144 46 150 54 C155 60 159 64 162 68 L162 104 Z" fill="#8A6D55"/>` +
    `<path d="M128 37 C136 39 144 46 150 54 C155 60 159 64 162 68 L162 104 L138 104 C142 84 138 58 128 37 Z" fill="#000000" opacity="0.12"/>` +
    `<path d="M92 80 L98 78 M100 90 L108 88 M138 76 L144 78 M112 66 L116 64 M146 92 L152 90" stroke="#6E5440" stroke-width="0.9" stroke-linecap="round"/>`;
  const cave = `<path d="M118.6 60 Q119.4 51.6 125.6 50.6 Q131.8 51.6 132.6 60 Z" fill="#241A12"/><path d="M116.8 60.6 Q125.6 58.4 134.4 60.6" stroke="#6E5440" stroke-width="1.2" fill="none"/>`;
  const samur =
    `<path d="M59.4 100 L59.8 90 L56 85 M59.8 90 L63.8 84.6 M59.8 92 L60.6 84" stroke="#6B4A2E" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="60" cy="82.6" rx="15" ry="3.8" fill="#6E8B3D"/><ellipse cx="60" cy="81.2" rx="12" ry="2.6" fill="#7FA04A"/>`;
  const leaves = [
    [50, 86],
    [56, 90],
    [63, 87.4],
    [69, 92],
    [53, 95],
    [66, 97],
    [59, 99]
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.5" fill="#7FA04A"/>`)
    .join("");
  const bag =
    `<path d="M35.6 108 Q34.6 102 37.4 100.4 L42.6 100.4 Q45.4 102 44.4 108 Z" fill="#9A6A3A"/>` +
    `<path d="M37.4 100.4 Q40 98.4 42.6 100.4" stroke="#7A4E28" stroke-width="0.8" fill="none"/><path d="M36.8 104 Q40 105 43.2 104" stroke="#7A4E28" stroke-width="0.4" stroke-dasharray="0.8 0.8" fill="none"/>`;
  const halfBelt = (x: number) => `<rect x="${x}" y="105.4" width="7" height="1.6" rx="0.8" fill="#C0566A"/><path d="M${n(x + 1)} 106.2 L${n(x + 6)} 106.2" stroke="#F0C9A0" stroke-width="0.3" stroke-dasharray="0.6 0.6"/>`;
  const toCave = [
    ["M31 101 C44 104 58 105 72 103", "M72 103 C84 100 94 92 102 82", "M102 82 C108 74 114 66 119 60.6"],
    ["M31 103.6 C45 106.6 60 107.4 75 105.4", "M75 105.4 C87 102.4 97 94 105 84", "M105 84 C111 76 117 68 122 61.4"]
  ];
  const chasing = [
    ["M-2 116 C24 114 48 112 66 108", "M66 108 C82 102 98 90 106 76", "M106 76 C108 66 110 56 114 50", "M114 50 C117 47.6 120 46.6 124 46.4"],
    ["M-2 119 C26 118 52 116 72 111", "M72 111 C88 104 102 92 110 78", "M110 78 C112 68 114 58 118 51.4", "M118 51.4 C121 48.6 125 47.6 129 47.4"]
  ];
  const guide = ["M-2 112 C24 111 52 110 78 108.6", "M78 108.6 C84 108.2 88 107.4 92 106.4"];
  const setOut = ["M124 61 C116 72 108 84 102 94", "M102 94 C112 100 132 104 150 106", "M150 106 C154 106.4 158 106.8 162 107"];
  const months = [96, 106, 116, 126];
  const nights = [40, 48, 56];
  return {
    kind: "thawr",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      {
        name: "the sun",
        svg: `${glow(84, 36, 11, "#FFF0C0", 0.12)}<circle cx="84" cy="36" r="5" fill="#FFE07A"/>`,
        // Low in the morning; at noon, high (below the words, so a small phone still shows it); gone at night; low again
        // on the morning they set out.
        keys: { at: [0, 0.18, 0.23, 0.5, 0.51, 0.514, 0.85, 0.88], opacity: [1, 1, 1, 1, 0, 0, 0, 1], x: [-58, -58, 0, 0, 0, -64, -64, -64], y: [18, 18, 0, 0, 0, 20, 20, 16] }
      },
      ...months.map((x, i) => ({
        name: `a month gone, ${i + 1}`,
        svg: crescent(x, 30, 3, 1.2, "#FFF3C4").replace("/>", ' stroke="#D8BE72" stroke-width="0.3"/>'),
        keys: { at: [0, at3(0.04 + i * 0.022), at3(0.05 + i * 0.022), 0.17, 0.18], opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1, 1, 1] },
        origin: { x, y: 30 }
      })),
      { name: "the hills of Makkah", svg: hills },
      {
        name: "the land",
        svg: landOf([
          [10, 70],
          [66, 72],
          [8, 112],
          [52, 116],
          [150, 112]
        ])
      },
      { name: "the mountain of Thawr", svg: mountain },
      { name: "the cave on the mountain", svg: cave },
      { name: "his home in Makkah", svg: home(30, 100, 30, 20) },
      { name: "the samur tree", svg: samur, origin: { x: 60, y: 100 }, loop: { move: "sway", ms: 4200, angle: 0.5 } },
      { name: "its leaves, falling", svg: leaves, clip: { x: 46, y: 84, w: 28, h: 16 }, keys: showWhile(0.02, 0.04, 0.16, 0.18), loop: { move: "fall", ms: 2600, period: 16 } },
      { name: "two she-camels, fed and ready", svg: animalAt("camel", 44, 88, 0.16) + animalAt("camel", 60, 90, 0.16, true), keys: showWhile(0.02, 0.05, 0.49, 0.5) },
      ...["M-2 107 C6 106 14 104.4 21 102.6", "M21 102.6 C24 101.8 26.4 101 28 100.4"].map((d, i) => ({
        name: `the way that came at noon, part ${i + 1}`,
        svg: way(d, CREAM, 1.2),
        keys: showWhile(at3(0.236 + i * 0.014), at3(0.25 + i * 0.012), 0.33, 0.345)
      })),
      { name: "the news at the door: it is time", svg: arcs(31.4, 95), keys: showWhile(0.264, 0.274, 0.33, 0.345), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "a bag of food for the way", svg: bag, keys: { at: [0, 0.35, 0.364, 0.49, 0.5], opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 1] }, origin: { x: 40, y: 108 } },
      { name: "a belt, one half", svg: halfBelt(48), keys: { at: [0, 0.368, 0.38, 0.39, 0.4, 0.49, 0.5], opacity: [0, 0, 1, 1, 1, 1, 0], x: [0, 0, 0, 0, -1.2, -1.2, -1.2] } },
      {
        name: "the belt's other half, tying the bag",
        svg: halfBelt(55),
        keys: { at: [0, 0.368, 0.38, 0.39, 0.4, 0.418, 0.432, 0.49, 0.5], opacity: [0, 0, 1, 1, 1, 1, 1, 1, 0], x: [0, 0, 0, 0, 1.2, 1.2, -18.5, -18.5, -18.5], y: [0, 0, 0, 0, 0, 0, -5.8, -5.8, -5.8], scale: [1, 1, 1, 1, 1, 1, 0.55, 0.55, 0.55] },
        origin: { x: 58.5, y: 106.2 }
      },
      { name: "the bag, tied", svg: `<circle cx="40" cy="100.4" r="0.9" fill="#C0566A"/>`, keys: showWhile(0.432, 0.44, 0.49, 0.5) },
      { name: "night", svg: `<rect width="160" height="120" fill="${NIGHT}" opacity="0.7"/>`, keys: nightKeys(0.5, 0.866) },
      {
        name: "the moon and stars of the nights",
        svg: `${glow(100, 28, 8, "#FFF6D0", 0.1)}${crescent(100, 28, 4, 1.6, "#FFF6D0")}${stars([
          [20, 36],
          [72, 30],
          [118, 26],
          [140, 32],
          [150, 46],
          [86, 42]
        ])}`,
        keys: nightKeys(0.5, 0.866),
        loop: { move: "twinkle", ms: 2400, low: 0.7 }
      },
      ...toCave.flatMap((list, i) =>
        list.map((d, j) => ({ name: `a way up to the cave ${i + 1}, part ${j + 1}`, svg: way(d, CREAM, 1.1), keys: showWhile(at3(0.52 + j * 0.018 + i * 0.006), at3(0.538 + j * 0.018 + i * 0.006), 0.84, 0.856) }))
      ),
      { name: "three rings, to count the nights", svg: nights.map((x) => `<circle cx="${x}" cy="30" r="2.4" fill="none" stroke="${CREAM}" stroke-width="0.7"/>`).join(""), keys: showWhile(0.53, 0.54, 0.836, 0.866) },
      ...nights.map((x, i) => ({
        name: `a night in the cave, ${i + 1}`,
        svg: `<circle cx="${x}" cy="30" r="1.6" fill="${CREAM}"/>`,
        keys: { at: [0, at3(0.55 + i * 0.02), at3(0.56 + i * 0.02), 0.836, 0.866], opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1, 1, 1] },
        origin: { x, y: 30 }
      })),
      { name: "sheep, grazing below the cave by night", svg: animalAt("sheep", 88, 95, 0.12) + animalAt("sheep", 100, 97, 0.12), keys: comeIn(0.56, 0.6, -36), loop: { move: "bob", ms: 1800, y: 0.4 } },
      ...chasing.flatMap((list, i) =>
        list.map((d, j) => ({
          name: `the way of those chasing them ${i + 1}, part ${j + 1}`,
          svg: way(d, "#D2604C", 1),
          keys: showWhile(at3(0.664 + j * 0.014 + i * 0.006), at3(0.678 + j * 0.014 + i * 0.006), 0.84, 0.856)
        }))
      ),
      ...guide.map((d, i) => ({ name: `the way that brought the camels, part ${i + 1}`, svg: way(d, "#C9B48A", 1.1), keys: showFrom(at3(0.866 + i * 0.014), at3(0.88 + i * 0.01)) })),
      { name: "their two she-camels, brought", svg: animalAt("camel", 84, 93, 0.16) + animalAt("camel", 98, 95, 0.16), keys: comeIn(0.87, 0.92, -60) },
      ...setOut.map((d, i) => ({ name: `the way setting out, by the coast, part ${i + 1}`, svg: way(d, CREAM, 1.2), keys: showFrom(at3(0.926 + i * 0.014), at3(0.94 + i * 0.012)) }))
    ],
    words: [
      { text: "Two camels, fed for four months", from: 0.02, to: 0.16 },
      { text: "At noon came the news: it is time", from: 0.18, to: 0.32 },
      { text: "Asma cut her belt to tie the food", from: 0.34, to: 0.48 },
      { text: "Three nights in the cave of Thawr", from: 0.5, to: 0.64 },
      { text: "Two, the third of whom is Allah", from: 0.66, to: 0.82 },
      { text: "Then the guide brought the camels", from: 0.84, to: 1 }
    ]
  };
}

// The plague in Sham. Umar set out for Sham, and at Sargh the leaders of the army met him and told him that plague had
// broken out in Sham. He called the first emigrants and asked their counsel, and they differed; then the Ansar, and they
// differed; then the elders of Quraysh, and they all said: go back. So he called out: I will go back in the morning. Abu
// Ubaydah said: running from Allah's decree? He said: yes, from Allah's decree to Allah's decree; if you had camels and
// came down into a valley with two sides, one green and one dry, would you not graze on the green by Allah's decree,
// and on the dry by Allah's decree? Then Abd ar-Rahman ibn Awf came, and said he heard the Prophet ﷺ say: if you hear
// of it in a land, do not go to it; and if it breaks out in a land you are in, do not leave it, fleeing from it (Sahih
// al-Bukhari 5729). No one is drawn: a way comes to the tents at Sargh, and ways come to it from Sham; a sickly haze
// settles over Sham; voices at the tents in turn; a night, the morning sun, and the way back; a valley with a green
// side and a dry side, and camels grazing the green; then a way comes with the hadith, the land of the plague is
// ringed, a way toward it stops outside, and the ways inside stay in.
function plague(): SignArt {
  const hills = peaks(
    [
      [30, 12, 26],
      [76, 9, 22]
    ],
    62,
    "#A88466",
    false
  );
  const sham =
    `<path d="M92 64 C108 58 128 56 146 58 C152 58.6 158 60 162 61 L162 86 C140 88 116 88 96 84 Z" fill="#A9C27A"/>` +
    [
      [104, 76],
      [152, 78],
      [124, 82],
      [140, 66]
    ]
      .map(([x, y]) => `<rect x="${n(x - 0.6)}" y="${y}" width="1.2" height="3.6" fill="#7E6447"/><ellipse cx="${x}" cy="${n(y - 0.4)}" rx="3.4" ry="2.6" fill="#6E9A44"/>`)
      .join("") +
    home(116, 76, 10, 7, "#E5D3B0", "#C9B48A") +
    home(131, 73, 11, 8, "#E5D3B0", "#C9B48A") +
    home(146, 76, 10, 7, "#E5D3B0", "#C9B48A");
  const haze =
    `<path d="M100 66 C104 58 116 56 124 60 C130 54 144 54 150 60 C158 60 162 66 158 72 C156 80 104 80 100 72 Z" fill="#7F8B66" opacity="0.5"/>` +
    [
      [110, 66],
      [126, 62],
      [140, 66],
      [150, 70],
      [118, 72]
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#5E6A48" opacity="0.5"/>`)
      .join("");
  const tents = tent(54, 91, 14, 11) + tent(69, 89, 15, 12, "#F3E9D2") + tent(84, 91.6, 14, 11);
  const coming = ["M-2 101 C12 99 24 96 36 93.6", "M36 93.6 C40 93 44 92.6 47 92.4"];
  const leaders = ["M110 79 C104 82 98 84.6 92 86.6", "M114 82.6 C108 85.6 102 88 94 89.6"];
  const back = ["M50 94.6 C42 96.4 32 99 20 102", "M20 102 C12 104 6 105.6 -2 107"];
  const greenSide =
    `<path d="M-2 121 L-2 95 C20 93 44 95 64 100 C70 102 74 106 76 121 Z" fill="#8DBB5A"/>` +
    [
      [8, 100],
      [22, 98.6],
      [40, 100],
      [56, 104],
      [14, 110],
      [34, 108],
      [62, 112]
    ]
      .map(([x, y]) => tuft(x, y, "#5F9A3A", 4))
      .join("");
  const drySide =
    `<path d="M162 121 L162 95 C140 93 116 95 96 100 C90 102 86 106 84 121 Z" fill="#D9B27A"/>` +
    `<path d="M104 104 L110 106 L108 110 M126 100 L132 102 M140 108 L146 106 L150 110 M116 112 L122 110" stroke="#B48E58" stroke-width="0.6" fill="none"/>` +
    [
      [98, 108],
      [134, 106],
      [152, 102],
      [120, 104]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.8" ry="1.1" fill="#A88A62"/>`)
      .join("");
  const bed = `<path d="M76 121 C74 106 70 102 64 100 L96 100 C90 102 86 106 84 121 Z" fill="#E8D2A0"/>`;
  const grazing: [number, number][] = [
    [6, 94],
    [26, 96],
    [44, 99]
  ];
  return {
    kind: "plague",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      {
        name: "the sun",
        svg: `${glow(136, 26, 11, "#FFF0C0", 0.12)}<circle cx="136" cy="26" r="5" fill="#FFE07A"/>`,
        keys: { at: [0, 0.5, 0.51], opacity: [1, 1, 0] }
      },
      { name: "clouds", svg: cloud(52, 34, 0.6, "#FFFFFF", 0.9) + cloud(110, 28, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills },
      {
        name: "the land",
        svg: landOf([
          [20, 72],
          [62, 70],
          [86, 100],
          [30, 112],
          [130, 104]
        ])
      },
      { name: "Sham, green, with its towns", svg: sham },
      { name: "the tents at Sargh", svg: tents },
      ...coming.map((d, i) => ({ name: `the way from Madinah to Sargh, part ${i + 1}`, svg: way(d, BROWN, 1.1), keys: showWhile(at3(0.02 + i * 0.03), at3(0.05 + i * 0.02), 0.49, 0.5) })),
      ...leaders.map((d, i) => ({ name: `a way from Sham to Sargh ${i + 1}`, svg: way(d, "#5E7EA8", 1), keys: showWhile(at3(0.08 + i * 0.012), at3(0.11 + i * 0.012), 0.49, 0.5) })),
      { name: "the sickness over Sham", svg: haze, keys: showFrom(0.19, 0.25), loop: { move: "twinkle", ms: 2600, low: 0.7 } },
      { name: "the news, told at Sargh", svg: arcsLeft(91, 84), keys: showWhile(0.22, 0.23, 0.3, 0.31), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "the counsel of the first emigrants, differing", svg: arcs(56, 81) + arcsLeft(52, 81), keys: showWhile(0.35, 0.358, 0.378, 0.386), loop: { move: "twinkle", ms: 600, low: 0.5 } },
      { name: "the counsel of the Ansar, differing", svg: arcs(71, 78) + arcsLeft(67, 78), keys: showWhile(0.39, 0.398, 0.418, 0.426), loop: { move: "twinkle", ms: 600, low: 0.5 } },
      { name: "the counsel of the elders of Quraysh: go back", svg: arcsLeft(82, 81.6), keys: showWhile(0.43, 0.44, 0.49, 0.5), loop: { move: "twinkle", ms: 600, low: 0.5 } },
      { name: "a night at Sargh", svg: `<rect width="160" height="120" fill="${NIGHT}" opacity="0.6"/>`, keys: { at: [0, 0.5, 0.515, 0.54, 0.56], opacity: [0, 0, 1, 1, 0] } },
      { name: "the morning sun, rising", svg: `${glow(22, 46, 10, "#FFE2B0", 0.14)}<circle cx="22" cy="46" r="5" fill="#FFD27A"/>`, keys: { at: [0, 0.54, 0.58], opacity: [0, 0, 1], y: [10, 10, 0] } },
      ...back.map((d, i) => ({ name: `the way back to Madinah, part ${i + 1}`, svg: way(d, BROWN, 1.1), keys: showFrom(at3(0.578 + i * 0.012), at3(0.59 + i * 0.012)) })),
      { name: "a valley's green side", svg: greenSide, keys: showFrom(0.66, 0.69) },
      { name: "a valley's dry side", svg: drySide, keys: showFrom(0.66, 0.69) },
      { name: "the valley's dry bed", svg: bed, keys: showFrom(0.66, 0.69) },
      ...grazing.map(([x, y], i) => ({
        name: `a camel grazing on the green side ${i + 1}`,
        svg: animalAt("camel", x, y, 0.14),
        keys: comeIn(at3(0.69 + i * 0.012), at3(0.74 + i * 0.012), -40, -8),
        loop: { move: "bob" as const, ms: 1800, y: 0.4, phase: i / 3 }
      })),
      { name: "a way that came with the hadith", svg: way("M-2 84 C12 84 26 84.8 40 86.4", "#5E7EA8", 1), keys: showFrom(0.842, 0.856) },
      { name: "the hadith, told at Sargh", svg: arcs(42, 84), keys: showFrom(0.86, 0.87), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "the land of the plague, ringed", svg: `<ellipse cx="130" cy="69" rx="31" ry="14" stroke="#C94F3D" stroke-width="0.8" stroke-dasharray="1.6 1.6" fill="none"/>`, keys: showFrom(0.874, 0.886) },
      { name: "a way toward it, stopping outside", svg: way("M92 87 C94 82 96 78 98.4 75", BROWN, 1.1), keys: showFrom(0.89, 0.904) },
      { name: "where it stops", svg: `<path d="M96.5 73.5 L100.3 76.5" stroke="#C94F3D" stroke-width="1.2" stroke-linecap="round"/>`, keys: showFrom(0.904, 0.912) },
      ...[
        "M116 74 C119 70 125 70 127 73.6 C125 77 119 77 116 74",
        "M134 70 C137 66.4 143 66.4 145 70 C143 73.4 137 73.4 134 70"
      ].map((d, i) => ({ name: `a way inside it, staying ${i + 1}`, svg: way(d, "#F3E9D2", 0.8), keys: showFrom(at3(0.916 + i * 0.014), at3(0.93 + i * 0.014)) }))
    ],
    words: [
      { text: "At Sargh, on the way to Sham", from: 0.02, to: 0.16 },
      { text: "Plague had broken out in Sham", from: 0.18, to: 0.32 },
      { text: "Umar asked them all for counsel", from: 0.34, to: 0.48 },
      { text: "We will go back in the morning", from: 0.5, to: 0.64 },
      { text: "Umar: from Allah's decree to His decree", from: 0.66, to: 0.82 },
      { text: "Do not go to it, nor flee from it", from: 0.84, to: 1 }
    ]
  };
}

export const COMPANION_ART = { tabuk, thawr, plague };
