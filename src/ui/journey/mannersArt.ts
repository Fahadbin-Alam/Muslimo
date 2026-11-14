import { animalAt, cloud, glow, n, palm, peaks, rainStreaks, sky, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, way } from "./giveArt";
import { comeIn, risingSparks } from "./charityArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";

/**
 * Manners and worship, drawn as the stories of charity are (charityArt.ts): asking permission three times at a door
 * and going back, the first call to prayer in Madinah and walking calmly to the prayer, the wet grain hidden in a heap
 * of food, and the well of Rumah and the army of hardship. Only the land, the sky, homes, the masjid, things and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn: where someone went, a dashed way shows it,
 * and a voice is arcs or rings in the air. No bell and no horn is drawn. A deed's reward is sparks rising from where
 * it was done, never light coming down.
 */

const BROWN = "#8A6440";
const CREAM = "#FFF6DC";

const hillsOfMadinah = () =>
  peaks(
    [
      [22, 12, 28],
      [82, 16, 34],
      [142, 12, 26]
    ],
    62,
    "#A88466",
    false
  );

/** The land from y 61 down, with a few tufts of dry grass. */
const landOf = (tufts: [number, number][], fill = "#E2CB9C") =>
  `<rect y="61" width="160" height="59" fill="${fill}"/><path d="M0 61 L160 61" stroke="#CDB283" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#A99A5A", 3.4)).join("");

/** A voice's three arcs, from (x, y), facing right. */
const arcs = (x: number, y: number, color = "#FFFFFF") =>
  [0, 1, 2]
    .map((i) => {
      const ax = n(x + i * 2.2);
      const h = 1.6 + i * 1.1;
      return `<path d="M${ax} ${n(y - h)} Q${n(ax + h * 0.7)} ${y} ${ax} ${n(y + h)}" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
    })
    .join("");

// Asking permission three times. Abu Musa came to a gathering of the Ansar as if afraid, and said: I asked permission
// to come in to Umar three times, and it was not given to me, so I went back; for the Prophet ﷺ said: if one of you
// asks permission three times and it is not given, let him go back. Umar asked him for a witness to it, and Ubayy ibn
// Ka'b said: none will go with you but the youngest of us; so Abu Sa'id, the youngest, went with him and told Umar
// (Sahih al-Bukhari 6245). No one is drawn: a dashed way comes to a shut door; each asking is a voice's arcs toward it,
// counted in three rings over the home; the way goes back; then two ways, one of them the youngest's, come from the
// gathering place of the Ansar to the door, and the witness's voice is heard at it.
function permission(): SignArt {
  const house =
    `<rect x="104" y="70" width="46" height="30" fill="#D3A872"/><rect x="132" y="70" width="18" height="30" fill="#000000" opacity="0.08"/>` +
    `<rect x="102.8" y="68.4" width="48.4" height="1.8" fill="#BC9060"/>` +
    `<rect x="109" y="76" width="4.4" height="4.4" fill="#6B4A2E"/><rect x="140" y="76" width="4.4" height="4.4" fill="#6B4A2E"/>` +
    `<rect x="118.6" y="83.2" width="12.8" height="1.6" fill="#BC9060"/>`;
  const door =
    `<rect x="120" y="84.8" width="10" height="15.2" fill="#8A5A30"/>` +
    `<path d="M122.5 84.8 L122.5 100 M125 84.8 L125 100 M127.5 84.8 L127.5 100" stroke="#6E4524" stroke-width="0.45"/>` +
    `<rect x="120" y="88.4" width="10" height="0.8" fill="#6E4524"/><rect x="120" y="95.6" width="10" height="0.8" fill="#6E4524"/>` +
    `<circle cx="128.4" cy="92.4" r="0.9" fill="none" stroke="#3E2816" stroke-width="0.5"/>`;
  const step = `<rect x="117.8" y="100" width="14.4" height="1.4" fill="#BFA477"/>`;
  // The gathering place of the Ansar: a shade of palm leaves on two posts, over a mat with cushions and a jug.
  const shade =
    `<rect x="11.4" y="86" width="1.4" height="13" fill="#7E6447"/><rect x="40" y="86" width="1.4" height="13" fill="#7E6447"/>` +
    `<path d="M7 87.4 L46 87.4 L43 81.6 L10 81.6 Z" fill="#7C9440"/>` +
    `<path d="M11 85.6 L15 83 M17 86 L21 83.2 M23 85.6 L27 83 M29 86 L33 83.2 M35 85.6 L39 83 M41 86 L44 83.6" stroke="#5E7630" stroke-width="0.6"/>` +
    `<rect x="12" y="98" width="29.4" height="2" rx="0.8" fill="#B5543C"/><path d="M14 99 L39.4 99" stroke="#E0A060" stroke-width="0.4" stroke-dasharray="1.2 1"/>` +
    `<ellipse cx="17" cy="97.4" rx="3" ry="1.3" fill="#C9884A"/><ellipse cx="36" cy="97.4" rx="3" ry="1.3" fill="#C9884A"/>` +
    `<path d="M25.6 97.6 C24.8 95 25.4 93.4 26.6 92.8 L26.6 92 L28.2 92 L28.2 92.8 C29.4 93.4 30 95 29.2 97.6 Z" fill="#B0704A"/>`;
  const palms = palm(62, 76, 14) + palm(90, 70, 10) + palm(4, 80, 12) + palm(156, 72, 10);
  const pips = [117, 127, 137].map((x) => `<circle cx="${x}" cy="63.6" r="2.6" fill="${CREAM}" stroke="${BROWN}" stroke-width="0.7"/>`).join("");
  const mark = (x: number) => `<circle cx="${x}" cy="63.6" r="1.7" fill="#E8A33A"/>`;
  const inWay = ["M62 122 C66 116 72 112 80 109", "M80 109 C88 106 96 104 104 102.8", "M104 102.8 C108 102.2 111 101.8 114 101.6"];
  const backWay = ["M114 103.6 C110 104 106 104.6 102 105.4", "M102 105.4 C94 107 86 109.2 78 112.2", "M78 112.2 C70 115.2 64 118.6 60 122"];
  const again = ["M30 101.2 C40 102.2 50 102.9 60 103.2", "M60 103.2 C74 103.6 88 103.4 100 102.6", "M100 102.6 C105 102.2 109 101.8 113 101.4"];
  const youngest = ["M30 104 C40 105.2 50 106 60 106.2", "M60 106.2 C74 106.6 88 106.2 100 105.2", "M100 105.2 C105.4 104.6 110 104 115 103.4"];
  const asking = (i: number, at: number): SignPart => ({
    name: `asking, the ${["first", "second", "third"][i]} time`,
    svg: arcs(115.4, 95.4),
    keys: { at: [0, at, at3(at + 0.012), at3(at + 0.05), at3(at + 0.062)], opacity: [0, 0, 1, 1, 0], scale: [0.7, 0.7, 0.9, 1.15, 1.2] },
    origin: { x: 115, y: 95.4 },
    loop: { move: "twinkle", ms: 600, low: 0.5 }
  });
  const counted = (name: string, x: number, at: number): SignPart => ({ name, svg: mark(x), keys: { at: [0, at, at3(at + 0.01)], opacity: [0, 0, 1], scale: [0.4, 0.4, 1] }, origin: { x, y: 63.6 } });
  return {
    kind: "permission",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "the sun", svg: `${glow(22, 24, 11, "#FFF0C0", 0.12)}<circle cx="22" cy="24" r="5" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(62, 32, 0.6, "#FFFFFF", 0.9) + cloud(120, 24, 0.7, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the dark hills of Madinah", svg: hillsOfMadinah() },
      {
        name: "the land",
        svg: landOf([
          [52, 72],
          [96, 76],
          [150, 110],
          [8, 112],
          [92, 117]
        ])
      },
      { name: "palms of Madinah", svg: palms, origin: { x: 80, y: 76 }, loop: { move: "sway", ms: 3600, angle: 0.6 } },
      { name: "the gathering place of the Ansar", svg: shade },
      { name: "the home he came to", svg: house },
      { name: "its door, shut", svg: door },
      { name: "its doorstep", svg: step },
      ...inWay.map((d, i) => ({ name: `the way to the door, part ${i + 1}`, svg: way(d, BROWN, 1.1), keys: showWhile(at3(0.006 + i * 0.025), at3(0.031 + i * 0.025), 0.646, 0.66) })),
      { name: "three rings, to count the askings", svg: pips, keys: showFrom(0.166, 0.18) },
      asking(0, 0.19),
      counted("asked once", 117, 0.255),
      asking(1, 0.35),
      counted("asked a second time", 127, 0.415),
      asking(2, 0.51),
      counted("asked a third time", 137, 0.575),
      ...backWay.map((d, i) => ({ name: `the way back, part ${i + 1}`, svg: way(d, BROWN, 1.1), keys: showWhile(at3(0.662 + i * 0.025), at3(0.687 + i * 0.025), 0.826, 0.84) })),
      ...again.map((d, i) => ({ name: `the way to the door again, part ${i + 1}`, svg: way(d, BROWN, 1.1), keys: showFrom(at3(0.842 + i * 0.025), at3(0.867 + i * 0.025)) })),
      ...youngest.map((d, i) => ({ name: `the way of the youngest, the witness, part ${i + 1}`, svg: way(d, "#5E7EA8", 0.8), keys: showFrom(at3(0.846 + i * 0.025), at3(0.871 + i * 0.025)) })),
      { name: "the witness tells it at the door", svg: arcs(115.4, 95.4), keys: showFrom(0.925, 0.94), origin: { x: 115, y: 95.4 }, loop: { move: "twinkle", ms: 600, low: 0.5 } }
    ],
    words: [
      { text: "At Umar's door", from: 0.02, to: 0.16 },
      { text: "He asked permission once", from: 0.18, to: 0.32 },
      { text: "Then a second time", from: 0.34, to: 0.48 },
      { text: "A third time: no permission given", from: 0.5, to: 0.64 },
      { text: "So he went back", from: 0.66, to: 0.82 },
      { text: "The youngest went with him as witness", from: 0.84, to: 1 }
    ]
  };
}

// The first call to prayer. When the Muslims came to Madinah, they used to gather for the prayer, guessing its time,
// and no one called to it. They talked about it: some said a bell, some a horn; Umar said: why not send a man to call
// to the prayer? And the Prophet ﷺ said: O Bilal, stand and call to prayer (Sahih al-Bukhari 604). And he ﷺ said: when
// you hear the iqamah, walk to the prayer with calm and dignity, and do not rush (Sahih al-Bukhari 636). No one is
// drawn, and no bell or horn: dashed ways reach the masjid one at a time, each at its own guess; then the call rises
// from the masjid in rings, and spreads over Madinah, and the homes' doors light up; the iqamah is rings at the
// masjid's door; and calm ways come to it from every home, slowly.
function adhan(): SignArt {
  const homes =
    home(18, 102, 20, 13) + home(144, 102, 20, 13, "#D8B585", "#BF9A6A") + home(30, 80, 13, 9, "#DCBD8E", "#C2A272") + home(128, 79, 13, 9, "#D8B585", "#BF9A6A");
  const doors: [number, number][] = [
    [16.2, 98.4],
    [142.2, 98.4],
    [28.2, 76.8],
    [126.2, 75.8]
  ];
  // From each home's door to the masjid's door: the home on the left, on the right, back left and back right.
  const routes = [
    ["M16.2 102.6 C24 104 34 104.4 44 103.6", "M44 103.6 C56 102.6 66 100.6 72 98.4", "M72 98.4 C75 97.2 77.4 95.8 79 94.4"],
    ["M142.2 102.6 C134 104 124 104.4 114 103.6", "M114 103.6 C102 102.6 94 100.6 88 98.4", "M88 98.4 C85 97.2 82.6 95.8 81 94.4"],
    ["M28.2 80.6 C30 86 34 90 40 93.4", "M40 93.4 C48 97.6 58 98.6 68 97.8", "M68 97.8 C72.4 97.2 76 96 78.6 94.6"],
    ["M126.2 79.6 C126 85 124 90 118 93.6", "M118 93.6 C110 97.6 100 98.6 92 97.8", "M92 97.8 C87.6 97.2 84 96 81.4 94.6"]
  ];
  // Before the adhan, each came at his own guess: one way, then another a while later, then a third.
  const guessed: [number, number][] = [
    [0, 0.008],
    [3, 0.058],
    [1, 0.108]
  ];
  const palms = palm(48, 80, 13) + palm(112, 78, 12) + palm(6, 84, 12) + palm(156, 86, 12);
  return {
    kind: "adhan",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "the sun", svg: `${glow(140, 24, 11, "#FFF0C0", 0.12)}<circle cx="140" cy="24" r="5" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(36, 34, 0.6, "#FFFFFF", 0.9) + cloud(104, 28, 0.7, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the dark hills of Madinah", svg: hillsOfMadinah() },
      {
        name: "the land",
        svg: landOf([
          [44, 70],
          [100, 68],
          [150, 112],
          [6, 114],
          [80, 116]
        ])
      },
      { name: "palms of Madinah", svg: palms, origin: { x: 80, y: 80 }, loop: { move: "sway", ms: 3600, angle: 0.6 } },
      { name: "the masjid in Madinah", svg: madinahMasjid(56, 93, 1) },
      { name: "homes of Madinah", svg: homes },
      ...guessed.flatMap(([route, from], i) =>
        routes[route].map((d, j) => ({
          name: `a way to the prayer at a guess ${i + 1}, part ${j + 1}`,
          svg: way(d, BROWN, 1.1),
          keys: showWhile(at3(from + j * 0.01), at3(from + (j + 1) * 0.01), 0.186, 0.2)
        }))
      ),
      ...[4, 7.5, 11].map((r, i) => ({
        name: `the call to prayer, ring ${i + 1}`,
        svg: ring(80, 69, r, "#FFFFFF"),
        keys: showWhile(at3(0.23 + i * 0.02), at3(0.245 + i * 0.02), 0.606, 0.62),
        loop: { move: "twinkle" as const, ms: 1100, low: 0.2, phase: i / 3 }
      })),
      ...[24, 42, 62].map((r, i) => ({
        name: `the call over Madinah, ring ${i + 1}`,
        svg: ring(80, 70, r, "#FFFFFF"),
        keys: { at: [0, at3(0.42 + i * 0.02), at3(0.46 + i * 0.02), 0.606, 0.62], opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1, 1, 1] },
        origin: { x: 80, y: 70 },
        loop: { move: "twinkle" as const, ms: 1400, low: 0.3, phase: i / 3 }
      })),
      { name: "the doors of the homes, hearing the call", svg: doors.map(([x, y]) => glow(x, y, 5, "#FFE7A0", 0.22)).join(""), keys: showFrom(0.5, 0.53), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      ...[3, 5.5, 8].map((r, i) => ({
        name: `the iqamah, ring ${i + 1}`,
        svg: ring(80, 88.6, r, "#FFFFFF"),
        keys: showFrom(at3(0.63 + i * 0.016), at3(0.642 + i * 0.016)),
        loop: { move: "twinkle" as const, ms: 900, low: 0.2, phase: i / 3 }
      })),
      ...routes.flatMap((list, i) =>
        list.map((d, j) => ({ name: `a calm way to the prayer ${i + 1}, part ${j + 1}`, svg: way(d, CREAM, 1.3), keys: showFrom(at3(0.826 + j * 0.04), at3(0.856 + j * 0.04)) }))
      )
    ],
    words: [
      { text: "They used to guess the prayer time", from: 0.02, to: 0.18 },
      { text: "O Bilal, stand and call to prayer", from: 0.2, to: 0.4 },
      { text: "Calling the people to prayer", from: 0.42, to: 0.6 },
      { text: "When you hear the iqamah", from: 0.62, to: 0.8 },
      { text: "Walk to it calmly, do not rush", from: 0.82, to: 1 }
    ]
  };
}

// The wet grain. The Prophet ﷺ passed by a heap of food and put his hand into it, and his fingers came out wet. He
// said: what is this? Its owner said: rain fell on it, Messenger of Allah. He said: why did you not put it on top of the
// food, so that people could see it? Whoever cheats is not of me (Sahih Muslim 102). No one is drawn, and no hand: rain
// falls on the heap and wets it; dry grain is heaped over the wet; a dashed way comes to the heap, and an opening in it
// shows the wet inside; the wet part comes up on top, where it is seen; and buyers' ways come to the heap.

const DRY = "#E2BF6E";
const WET = "#9C7A44";

/** Grains over a heap whose foot runs from x1 to x2 at y, its curve pulled up to `pull`: little ovals in rows. */
function grainsOn(x1: number, x2: number, y: number, pull: number, color: string, top = 0) {
  let out = "";
  const height = (y - pull) / 2;
  for (let row = 0, gy = y - 1.6; gy > y - height + 1.6; row += 1, gy -= 2.4) {
    if (top && gy > top) continue;
    // Where the curve is at this height: y - 4 * height * t * (1 - t) = gy.
    const k = (y - gy) / (4 * height);
    const t = (1 - Math.sqrt(Math.max(0, 1 - 4 * k))) / 2;
    const left = x1 + (x2 - x1) * t + 1.4;
    const right = x2 - (x2 - x1) * t - 1.4;
    for (let gx = left + (row % 2) * 1.6; gx < right; gx += 3.2) out += `<ellipse cx="${n(gx)}" cy="${n(gy)}" rx="0.7" ry="0.45" fill="${color}"/>`;
  }
  return out;
}

/** A market stall: a striped awning on two posts, from x to x + 30, its foot at y. */
const stall = (x: number, y: number, stripe: string) =>
  `<rect x="${n(x + 2)}" y="${n(y - 16)}" width="1.2" height="16" fill="#7E6447"/><rect x="${n(x + 27)}" y="${n(y - 16)}" width="1.2" height="16" fill="#7E6447"/>` +
  `<path d="M${x} ${n(y - 16)} L${n(x + 30)} ${n(y - 16)} L${n(x + 27)} ${n(y - 21)} L${n(x + 3)} ${n(y - 21)} Z" fill="#F3E6C8"/>` +
  [0, 1, 2, 3, 4]
    .map((i) => `<path d="M${n(x + 1 + i * 6)} ${n(y - 16)} L${n(x + 4 + i * 6)} ${n(y - 16)} L${n(x + 5.4 + i * 4.8)} ${n(y - 21)} L${n(x + 3 + i * 4.8)} ${n(y - 21)} Z" fill="${stripe}"/>`)
    .join("");

function wetGrain(): SignArt {
  const heap = `<path d="M60 101 Q80 70 100 101 Z" fill="${DRY}"/>` + grainsOn(60, 100, 101, 70, "#C9A24E");
  const wetHeap = `<path d="M60 101 Q80 70 100 101 Z" fill="${WET}"/>` + grainsOn(60, 100, 101, 70, "#7A5A2E");
  const dryOver =
    `<path d="M54 101 Q80 62 106 101 Z" fill="${DRY}"/><path d="M80 81.6 Q94 84 106 101 L92 101 Q88 90 80 81.6 Z" fill="#000000" opacity="0.06"/>` + grainsOn(54, 106, 101, 62, "#C9A24E");
  const opening =
    `<ellipse cx="66" cy="95.6" rx="5.6" ry="3.4" fill="#6E5230"/><ellipse cx="66" cy="95.2" rx="4.4" ry="2.4" fill="#5A4226"/>` +
    [
      [63.8, 95.2],
      [66.2, 96.6],
      [68.2, 95],
      [64.8, 96.8],
      [67.4, 96.4]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.7" ry="0.45" fill="#9C7A44"/>`)
      .join("");
  const drops = (list: [number, number][]) => list.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.6" ry="0.85" fill="#6CC0EE"/>`).join("");
  const wetTop = `<path d="M67 86.4 Q80 76.6 93 86.4 Q80 90 67 86.4 Z" fill="${WET}"/>` + grainsOn(67, 93, 88, 76.6, "#7A5A2E", 87);
  const stalls =
    stall(4, 96, "#C8553D") +
    stall(126, 96, "#3E7CB1") +
    `<path d="M10 96 L12 91 L18 91 L20 96 Z" fill="#B88A4A"/>` +
    [11.6, 13.6, 15.6, 17.6, 12.6, 14.6, 16.6].map((x, i) => `<ellipse cx="${x}" cy="${i < 4 ? 90.4 : 89.4}" rx="0.9" ry="0.7" fill="#93391B"/>`).join("") +
    sack(26, 96, 0.8) +
    sack(134, 96, 0.8, "#D3B27A") +
    `<path d="M142 96 L144 91 L150 91 L152 96 Z" fill="#B88A4A"/>` +
    [143.6, 145.6, 147.6, 149.6, 144.6, 146.6, 148.6].map((x, i) => `<ellipse cx="${x}" cy="${i < 4 ? 90.4 : 89.4}" rx="0.9" ry="0.7" fill="#E2BF6E"/>`).join("");
  const passing = ["M-2 106 C14 105 28 103.6 40 102.6", "M40 102.6 C46 102 50 101 54 99.6"];
  const buyers = [
    ["M-2 113 C14 112 28 110 40 108", "M40 108 C46 107 50 105.6 54 103.6"],
    ["M162 113 C146 112 132 110 120 108", "M120 108 C114 107 110 105.6 106 103.6"]
  ];
  return {
    kind: "wet-grain",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "the sun", svg: `${glow(138, 24, 11, "#FFF0C0", 0.12)}<circle cx="138" cy="24" r="5" fill="#FFE07A"/>` },
      { name: "a grey sky of rain", svg: `<rect width="160" height="120" fill="#6E8096" opacity="0.28"/>`, keys: showWhile(0.01, 0.03, 0.12, 0.14) },
      { name: "the dark hills of Madinah", svg: hillsOfMadinah() },
      {
        name: "the land",
        svg: landOf([
          [44, 72],
          [116, 70],
          [150, 112],
          [8, 114],
          [36, 116]
        ])
      },
      { name: "palms of Madinah", svg: palm(40, 74, 12) + palm(118, 72, 11) + palm(156, 80, 12), origin: { x: 80, y: 74 }, loop: { move: "sway", ms: 3600, angle: 0.6 } },
      { name: "stalls of the market", svg: stalls },
      { name: "the cloth under the heap", svg: `<ellipse cx="80" cy="101.4" rx="32" ry="3.4" fill="#BFA77A"/>` },
      { name: "rain on the heap", svg: rainStreaks(50, 110, 40, 102), clip: { x: 50, y: 46, w: 60, h: 56 }, keys: showWhile(0.024, 0.034, 0.12, 0.13), loop: { move: "fall", ms: 650, period: 60 } },
      { name: "a rain cloud", svg: cloud(80, 50, 1, "#8FA3B8"), keys: { at: [0, 0.004, 0.022, 0.126, 0.146], opacity: [0, 0, 1, 1, 0], x: [-40, -40, 0, 0, 40] } },
      { name: "a heap of food for sale", svg: heap },
      { name: "the heap, wet with rain", svg: wetHeap, keys: showFrom(0.04, 0.12) },
      { name: "dry grain heaped over the wet", svg: dryOver, keys: { at: [0, 0.2, 0.212, 0.3], opacity: [0, 0, 1, 1], scale: [0.78, 0.78, 0.8, 1] }, origin: { x: 80, y: 101 } },
      ...passing.map((d, i) => ({ name: `the way of one passing by, part ${i + 1}`, svg: way(d, BROWN, 1.1), keys: showWhile(at3(0.406 + i * 0.02), at3(0.426 + i * 0.02), 0.606, 0.62) })),
      { name: "inside, wet", svg: opening, keys: { at: [0, 0.46, 0.49, 0.606, 0.62], opacity: [0, 0, 1, 1, 0], scale: [0.3, 0.3, 1, 1, 1] }, origin: { x: 66, y: 95.6 } },
      {
        name: "water inside",
        svg: drops([
          [63.6, 94.2],
          [66.8, 95.2],
          [69, 94.4]
        ]),
        keys: { at: [0, 0.48, 0.5, 0.606, 0.62], opacity: [0, 0, 1, 1, 0] },
        loop: { move: "twinkle", ms: 900, low: 0.4 }
      },
      { name: "the wet part, on top", svg: wetTop, keys: { at: [0, 0.63, 0.68], opacity: [0, 0, 1], y: [8, 8, 0] } },
      {
        name: "water on the wet part",
        svg: drops([
          [75, 82.6],
          [82, 81.4],
          [87.6, 83.6]
        ]),
        keys: { at: [0, 0.68, 0.7], opacity: [0, 0, 1] },
        loop: { move: "twinkle", ms: 900, low: 0.4 }
      },
      ...buyers.flatMap((list, i) =>
        list.map((d, j) => ({ name: `a buyer's way ${i + 1}, part ${j + 1}`, svg: way(d, BROWN, 1.1), keys: showFrom(at3(0.826 + j * 0.03 + i * 0.01), at3(0.856 + j * 0.03 + i * 0.01)) }))
      ),
      { name: "the wet part, seen by all", svg: glow(80, 84, 14, "#FFF4D0", 0.12), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.6 } }
    ],
    words: [
      { text: "Rain fell on a heap of food", from: 0.02, to: 0.18 },
      { text: "The wet part hidden under dry", from: 0.2, to: 0.4 },
      { text: "Inside, it was wet", from: 0.42, to: 0.6 },
      { text: "Why not on top, for people to see?", from: 0.62, to: 0.8 },
      { text: "Whoever cheats is not of me", from: 0.82, to: 1 }
    ]
  };
}

// The well of Rumah. Uthman reminded them that the Prophet ﷺ said: whoever digs the well of Rumah will have Paradise,
// and he dug it; and he ﷺ said: whoever equips the army of hardship will have Paradise, and he equipped it; and they
// bore witness to what he said (Sahih al-Bukhari 2778, in its chapter: whoever buys the well of Rumah, his bucket in it
// is like the buckets of the Muslims, and Uthman bought it). No one is drawn: a dashed way comes to the place of the
// well and it is dug, and its water rises; ways come to it, and buckets come up full; camels for the army come, and a
// dashed way comes to them, and saddles and packs are on them; then sparks rise from the well and from the camels.

/** A bucket full of water, its foot's middle at (x, y). */
const bucket = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${n(y - 3.4)} L${n(x + 2.2)} ${n(y - 3.4)} L${n(x + 1.7)} ${y} L${n(x - 1.7)} ${y} Z" fill="#7E5A36"/>` +
  `<ellipse cx="${x}" cy="${n(y - 3.4)}" rx="2.2" ry="0.6" fill="#5EB1E4"/>` +
  `<path d="M${n(x - 2)} ${n(y - 3.4)} Q${x} ${n(y - 6.4)} ${n(x + 2)} ${n(y - 3.4)}" stroke="#4E3420" stroke-width="0.4" fill="none"/>`;

/** A camel's saddle cloth and its packs, in the camel card's units: drawn over a camel set at (x, y), `s` its size. */
const packs = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M28 37 C29 25 51 18 57 34 L55.4 42 L30 42 Z" fill="#B5543C"/><path d="M30 39.4 L55.6 39.4" stroke="#E0A060" stroke-width="1.6"/>` +
  `<rect x="31" y="14" width="22" height="9" rx="3" fill="#C9A66B"/><path d="M36 14 L36 23 M48 14 L48 23" stroke="#7A5A30" stroke-width="1.2"/>` +
  `<ellipse cx="55" cy="45" rx="4" ry="5.6" fill="#8A6A3E"/>` +
  `</g>`;

function rumah(): SignArt {
  const homes = home(14, 96, 18, 12) + home(36, 78, 12, 8, "#DCBD8E", "#C2A272");
  const place = `<ellipse cx="58" cy="91.4" rx="9" ry="2.4" fill="#C9AE7E"/><ellipse cx="58" cy="91.4" rx="9" ry="2.4" fill="none" stroke="#A88E62" stroke-width="0.6" stroke-dasharray="1.4 1.2"/>`;
  const well =
    `<ellipse cx="58" cy="95.2" rx="10.4" ry="1.3" fill="#000000" opacity="0.1"/>` +
    `<path d="M49 88 A9 2.3 0 0 0 67 88 L67 95 L49 95 Z" fill="#A89276"/>` +
    `<path d="M49 91.6 L67 91.6 M53.6 90 L53.6 91.6 M62.4 90 L62.4 91.6 M51.4 91.6 L51.4 95 M58 91.6 L58 95 M64.6 91.6 L64.6 95" stroke="#8A7458" stroke-width="0.5"/>` +
    `<ellipse cx="58" cy="88" rx="9" ry="2.3" fill="#7D6A52"/>`;
  const water = `<ellipse cx="58" cy="88.3" rx="7" ry="1.5" fill="#3F86B8"/>`;
  const ripples = `<ellipse cx="58" cy="88.3" rx="2.4" ry="0.5" stroke="#FFFFFF" stroke-width="0.4" fill="none"/><ellipse cx="58" cy="88.3" rx="4.6" ry="0.9" stroke="#FFFFFF" stroke-width="0.35" fill="none" opacity="0.7"/>`;
  const toWell = ["M-2 106 C12 104 26 100.6 38 97", "M38 97 C42 95.6 45 94.4 48 93"];
  const comers = ["M12.2 96.6 C24 97.2 36 96 47 92.4", "M34.2 78.6 C39 82 44 85 50 87.4", "M64 122 C64 112 63 104 62 96.4"];
  const camels: [number, number][] = [
    [92, 74.6],
    [112, 74.6],
    [132, 74.6]
  ];
  const s = 0.26;
  return {
    kind: "rumah",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "the sun", svg: `${glow(24, 24, 11, "#FFF0C0", 0.12)}<circle cx="24" cy="24" r="5" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(70, 32, 0.6, "#FFFFFF", 0.9) + cloud(128, 26, 0.7, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the dark hills of Madinah", svg: hillsOfMadinah() },
      {
        name: "the land",
        svg: landOf([
          [80, 70],
          [150, 72],
          [146, 112],
          [10, 114],
          [94, 116]
        ])
      },
      { name: "palms of Madinah", svg: palm(76, 78, 13) + palm(4, 82, 12) + palm(156, 70, 10), origin: { x: 80, y: 78 }, loop: { move: "sway", ms: 3600, angle: 0.6 } },
      { name: "homes of Madinah", svg: homes },
      { name: "the place of the well", svg: place },
      { name: "where the well would be", svg: glow(58, 90, 14, "#FFF4D0", 0.1), keys: showWhile(0.04, 0.09, 0.2, 0.24), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      ...toWell.map((d, i) => ({ name: `the way to the well, part ${i + 1}`, svg: way(d, BROWN, 1.1), keys: showFrom(at3(0.166 + i * 0.014), at3(0.18 + i * 0.014)) })),
      { name: "the well of Rumah, dug", svg: well, keys: { at: [0, 0.2, 0.24], opacity: [0, 0, 1], scaleY: [0.1, 0.1, 1] }, origin: { x: 58, y: 95 } },
      { name: "its water", svg: water, keys: showFrom(0.24, 0.27) },
      { name: "ripples on its water", svg: ripples, keys: showFrom(0.26, 0.28), origin: { x: 58, y: 88.3 }, loop: { move: "twinkle", ms: 1400, low: 0.4 } },
      ...comers.map((d, i) => ({ name: `a way to the water ${i + 1}`, svg: way(d, CREAM, 1.1), keys: showFrom(at3(0.336 + i * 0.02), at3(0.356 + i * 0.02)) })),
      ...(
        [
          [51, 87.6],
          [58, 86.4],
          [65, 87.6]
        ] as [number, number][]
      ).map(([x, y], i) => ({
        name: `a bucket, full, for all who come ${i + 1}`,
        svg: bucket(x, y),
        keys: { at: [0, at3(0.396 + i * 0.006), at3(0.404 + i * 0.006), at3(0.426 + i * 0.006)], opacity: [0, 0, 1, 1], y: [5, 5, 5, 0] }
      })),
      ...camels.map(([x, y], i) => ({
        name: `a camel for the army ${i + 1}`,
        svg: animalAt("camel", x, y, s),
        keys: comeIn(at3(0.49 + i * 0.02), at3(0.54 + i * 0.02), 64),
        origin: { x: n(x + 50 * s), y: n(y + 73 * s) },
        loop: { move: "bob" as const, ms: 1000, y: -0.3, phase: i / 3 }
      })),
      { name: "the way to the camels", svg: way("M68 97 C76 98.8 84 99.4 92 98.4", BROWN, 1.1), keys: showFrom(0.646, 0.666) },
      ...camels.map(([x, y], i) => ({
        name: `saddle and packs ${i + 1}`,
        svg: packs(x, y, s),
        keys: { at: [0, at3(0.68 + i * 0.02), at3(0.7 + i * 0.02)], opacity: [0, 0, 1], scale: [0.5, 0.5, 1] },
        origin: { x: n(x + 42 * s), y: n(y + 26 * s) },
        loop: { move: "bob" as const, ms: 1000, y: -0.3, phase: i / 3 }
      })),
      { name: "provisions for the army", svg: sack(110, 100.6, 0.65) + sack(130, 100.6, 0.65, "#D3B27A") + sack(150, 100.6, 0.65), keys: showFrom(0.75, 0.77) },
      ...risingSparks(
        "a spark of the good deed, rising",
        [
          [52, 84],
          [58, 82],
          [64, 84],
          [103, 78],
          [123, 78],
          [143, 78]
        ],
        0.85,
        0.012,
        { stay: true, rise: 18 }
      )
    ],
    words: [
      { text: "Whoever digs the well of Rumah", from: 0.02, to: 0.16 },
      { text: "And Uthman dug it", from: 0.18, to: 0.32 },
      { text: "Its water for all the Muslims", from: 0.34, to: 0.48 },
      { text: "Whoever equips the army of hardship", from: 0.5, to: 0.64 },
      { text: "And Uthman equipped it", from: 0.66, to: 0.82 },
      { text: "Both were promised Paradise", from: 0.84, to: 1 }
    ]
  };
}

export const MANNERS_ART = { permission, adhan, "wet-grain": wetGrain, rumah };
