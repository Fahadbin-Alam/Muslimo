import { n, type SignArt } from "./signDraw";
import { ring } from "./giveArt";
import { arcs } from "./mannersArt";
import { GOLD, someone, sun } from "./worshipArt";
import { track } from "./daysArt";
import { speaking } from "./fastArt";
import { showAt, SOFT_GOLD } from "./roadArt";
import { linesOn } from "./shareArt";
import { voice } from "./stepsArt";

/**
 * A feather in the wind: the heart is like a feather that the wind blows about in the desert. Only the land, the sky,
 * the wind and a feather are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a
 * head, a mouth or a face, and no heart is drawn: where someone was, a ring or a small dashed circle shows it, and a
 * voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes down from
 * the sky. No name, word or number is written.
 */

/** The words of four lines (as in pickArt). */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** Abu Musa al-Ash'ari's place and voice: a deep plum (the parts name him al-Ash'ari, as gainArt does). */
const ABU_MUSA = "#7A4E6E";

/** The sand of the open desert, its low dunes, and the dunes far off. */
const SAND = "#E8CF9E";
const DUNE = "#E0C08A";
const FAR_DUNE = "#EBD9B2";

/** The open desert, from the far dunes down: wide sand, low dunes over it, and a few dry tufts far apart. */
const openDesert = () =>
  `<path d="M0 66 Q18 61 38 64 T78 63 T118 62 T160 64 L160 72 L0 72 Z" fill="${FAR_DUNE}"/>` +
  `<rect y="68" width="160" height="52" fill="${SAND}"/>` +
  `<path d="M0 84 Q26 77 52 82 T104 80 T160 78 L160 120 L0 120 Z" fill="${DUNE}" opacity="0.55"/>` +
  `<path d="M70 99 Q98 92 126 97 T160 95 L160 120 L70 120 Z" fill="${DUNE}" opacity="0.5"/>` +
  [
    [30, 78],
    [118, 76],
    [150, 88]
  ]
    .map(([x, y]) => `<path d="M${x - 1.6} ${y} L${x - 0.6} ${y - 2.2} M${x} ${y} L${x} ${y - 2.8} M${x + 1.6} ${y} L${x + 0.6} ${y - 2.2}" stroke="#B49A62" stroke-width="0.5" stroke-linecap="round"/>`)
    .join("");

/**
 * A feather, its middle at (x, y), `s` times its size, lying along the ground: a thin quill, curving a little, with a
 * soft vane on each side of it, and a few fine barbs.
 */
const feather = (x: number, y: number, s = 1.4) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-4.2, 0.4)} Q${p(-1, -3.2)} ${p(5.4, -1)} Q${p(0.6, -0.6)} ${p(-4.2, 0.4)} Z" fill="#FBF7EE"/>` +
    `<path d="M${p(-4.2, 0.5)} Q${p(0, 2.2)} ${p(5.4, -0.7)} Q${p(0.4, 0.1)} ${p(-4.2, 0.5)} Z" fill="#EFE6D4"/>` +
    `<path d="M${p(-1.2, -1)} L${p(-0.2, -0.3)} M${p(1, -1.4)} L${p(1.8, -0.6)} M${p(3, -1.4)} L${p(3.6, -0.8)} M${p(-0.6, 1)} L${p(0.2, 0.2)} M${p(1.6, 0.9)} L${p(2.2, 0)}" stroke="#DCCFB6" stroke-width="${n(0.25 * s)}" stroke-linecap="round"/>` +
    `<path d="M${p(-6, 1.2)} Q${p(0, -0.6)} ${p(5.6, -0.9)}" stroke="#A8957A" stroke-width="${n(0.4 * s)}" stroke-linecap="round" fill="none"/>`
  );
};

/** The wind: soft white curves across the open desert, as gusts that blow from the left. */
const gusts = () =>
  `<g fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" opacity="0.85">` +
  `<path d="M8 74 C20 71 32 76 46 73 C50 72 50 68 46 69"/><path d="M64 86 C76 83 88 87 100 84"/>` +
  `<path d="M112 72 C124 69 136 73 148 70 C152 69 151 65 147 66"/><path d="M24 94 C36 91 48 95 60 92"/>` +
  `<path d="M98 100 C110 97 120 101 132 98"/></g>`;

// A feather in the wind. Abu Musa al-Ash'ari said: the Messenger of Allah ﷺ said: the likeness of the heart is that
// of a feather blown about by the wind in the desert (Sunan Ibn Majah 88). No one is drawn: the open desert, wide sand
// under a clear sky, with low dunes and a few dry tufts far apart; on the left his place, a golden ring, and Abu
// Musa's place by it. Abu Musa's voice tells of it, and his voice, soft and golden, speaks. No heart is drawn. A
// feather shows, lying still on the sand. Then the wind comes over the desert, and the feather is blown about: it
// lifts and goes across the sand, up and down, turning over and over, until it comes down far off, turned over.
// Nothing moves before the line that says so: the feather shows only after the heart is named, and the wind only after
// the feather is.
function aFeatherInTheWind(): SignArt {
  const his: [number, number] = [24, 104.6];
  const abuMusa: [number, number] = [10, 105.8];
  const at: [number, number] = [58, 101];
  return {
    kind: "feather-in-the-wind",
    ms: 9000,
    parts: [
      { name: "sky", svg: `<rect width="160" height="120" fill="#BFE3FA"/><rect y="52" width="160" height="20" fill="#E4EEF0"/>` },
      { name: "the sun", svg: sun(132, 24) },
      { name: "the open desert, wide sand with low dunes", svg: openDesert() },
      { name: "the wind, blowing over the desert", svg: gusts(), keys: showAt(0.765, 0.775), loop: { move: "slide", ms: 1500 } },
      {
        name: "a feather, lying on the sand, then blown about by the wind",
        svg: feather(at[0], at[1]),
        origin: { x: at[0], y: at[1] },
        keys: track({
          opacity: [
            [0.53, 0],
            [0.55, 1]
          ],
          xy: [
            [0.77, 0, 0],
            [0.81, 14, -12],
            [0.85, 30, -5],
            [0.89, 46, -16],
            [0.93, 64, -7],
            [0.96, 78, 0]
          ],
          rotate: [
            [0.77, 0],
            [0.96, 360]
          ],
          scaleY: [
            [0.8, 1],
            [0.84, -1],
            [0.88, -1],
            [0.92, 1],
            [0.94, 1],
            [0.96, -1]
          ]
        })
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.3, 0.96]]), loop: speaking },
      { name: "al-Ash'ari's place", svg: someone(abuMusa[0], abuMusa[1], 1.8, ABU_MUSA) },
      { name: "al-Ash'ari's voice: telling of it", svg: arcs(n(abuMusa[0] + 2.6), n(abuMusa[1] - 3.4), ABU_MUSA), keys: voice([[0.02, 0.21]]), loop: speaking }
    ],
    words: linesOn(FOUR, ["Abu Musa al-Ash'ari: the Messenger of", "Allah said: the likeness of the heart", "Is that of a feather blown about by", "The wind in the desert."])
  };
}

export const FEATHER_ART = {
  "feather-in-the-wind": aFeatherInTheWind
};
