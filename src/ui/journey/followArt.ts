import { cloud, glow, n, peaks, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, lightIn, palms, track } from "./daysArt";
import { greyRing, soft, spark, speaking } from "./fastArt";
import { road, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, FOLK, glints, linesOn, plainLand, SEVEN, SIX, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { coins } from "./tradeArt";
import { GREY } from "./lovedArt";
import { kabah } from "./historyArt";

/**
 * Following and giving well: Umar, who wished to share out the gold and silver of the Ka'bah, and held back because the
 * two before him had not done it; Maymunah, who freed her slave-girl, and was told a gift to her maternal uncles would
 * have had more reward; a judge who does his best, with two rewards when right and one when wrong; a du'a that is
 * answered as long as one does not grow impatient; Asma, told to give and not hold back; and the masjids, not built
 * for calling out about lost things. Only the land, the sky, buildings, things and plants are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring
 * or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is
 * drawn for Allah, no book or page is drawn, and nothing comes down from the sky: a deed or a du'a is a spark that
 * rises, what is good is a light, glints and a soft golden ring, and what is not to be done a grey dashed ring. No
 * name, word or number is written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** A small prayer mat on the ground, its middle at (x, y). */
const mat = (x: number, y: number, fill = "#9C5A4A") =>
  `<rect x="${n(x - 5)}" y="${n(y - 0.6)}" width="10" height="3" rx="0.8" fill="${fill}"/><rect x="${n(x - 4)}" y="${n(y - 0.1)}" width="8" height="2" rx="0.5" stroke="#E8C9A0" stroke-width="0.3" fill="none"/>`;

/** A small box, shut, its foot's middle at (x, y): what is kept back. */
const box = (x: number, y: number) =>
  `<rect x="${n(x - 3)}" y="${n(y - 4)}" width="6" height="4" rx="0.5" fill="#8A5E36"/><path d="M${n(x - 3)} ${n(y - 2.6)} L${n(x + 3)} ${n(y - 2.6)}" stroke="#5E3E22" stroke-width="0.4"/><rect x="${n(x - 0.5)}" y="${n(y - 3.1)}" width="1" height="1.2" fill="#D4A93C"/>`;

/** A shade of palm leaves on two trunks, from x1 to x2, its foot at y. */
const shade = (x1: number, x2: number, y: number) =>
  `<path d="M${n(x1 + 2)} ${y} L${n(x1 + 2)} ${n(y - 14)} M${n(x2 - 2)} ${y} L${n(x2 - 2)} ${n(y - 14)}" stroke="#8A6A44" stroke-width="1.4"/>` +
  `<path d="M${x1} ${n(y - 14)} L${x2} ${n(y - 14)} L${n(x2 - 3)} ${n(y - 17)} L${n(x1 + 3)} ${n(y - 17)} Z" fill="#6E8F3A"/>` +
  `<path d="M${n(x1 + 4)} ${n(y - 15.4)} L${n(x1 + 9)} ${n(y - 16.6)} M${n(x1 + 12)} ${n(y - 15.2)} L${n(x1 + 17)} ${n(y - 16.6)} M${n(x2 - 16)} ${n(y - 15.4)} L${n(x2 - 11)} ${n(y - 16.6)} M${n(x2 - 8)} ${n(y - 15.2)} L${n(x2 - 4)} ${n(y - 16.4)}" stroke="#56742B" stroke-width="0.5"/>`;

/** Something lost, far off: the faint dashed outline of a small bundle, its foot's middle at (x, y). */
const lostThing = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${y} Q${n(x - 3.6)} ${n(y - 4)} ${x} ${n(y - 4.4)} Q${n(x + 3.6)} ${n(y - 4)} ${n(x + 3.2)} ${y} Z" stroke="#9A9088" stroke-width="0.6" stroke-dasharray="0.9 0.7" fill="none"/>`;

/** Shaybah's place and voice, the keeper of the House: a slate blue. */
const KEEPER = "#4E6E7E";
/** Abu Wa'il's place and voice: a muted violet. */
const WAIL = "#8B6B9E";
/** Umar's place and voice: a deep brown. */
const UMAR = "#6B4A2E";
/** Maymunah's place and voice, and Asma's: a soft rose. */
const ROSE = "#B5708A";
/** The place of the one Maymunah freed: a plain olive. */
const FREED = "#8A8A4A";
/** The judge's place: a deep teal. */
const JUDGE = "#3E6B6B";
/** The place that keeps asking: a plain green. */
const ASKS = "#5E8A52";
/** The place that grows impatient: a muted violet. */
const HASTY = "#7E6A9A";
/** Az-Zubair's place: a deep red-brown. */
const ZUBAIR = "#9C4F36";
/** The place crying out about something lost: a dull brown. */
const CRIES = "#8A6A5A";

// The two to follow. Abu Wa'il said: I sat with Shaybah in this masjid, and he said: Umar sat with me where you sit,
// and said: I meant to leave in it no yellow and no white but that I share it out among the Muslims. I said: you are
// not one to do that. He said: why? I said: your two companions did not do it. He said: they are the two men who are
// followed (Sahih al-Bukhari 7275; the English page: I feel like distributing all the gold and silver that are in it,
// the Ka'bah, among the Muslims, and they are the two persons whom one must follow; the two are the Prophet ﷺ and Abu
// Bakr). No one is drawn: al-Masjid al-Haram, the Ka'bah on the open ground about it, the mountains and homes of Makkah,
// and Shaybah's place with Abu Wa'il's beside it. Abu Wa'il's voice tells of it; Shaybah's voice tells, and Umar's
// place shows beside his. Umar's voice speaks: gold and white glints show at the door of the House, the places of the
// Muslims show far off, and faint dashed ways go from the House to them. Shaybah's voice: the ways fade. Umar's voice
// asks why; Shaybah's voice answers, and his place and Abu Bakr's show by the House, a golden ring and a soft golden
// one, and a soft golden ring comes about the gold and silver, left as it was. Umar's voice speaks: a soft golden way
// shows from his place to theirs, his place goes along it and stays behind them, and a soft golden ring comes about
// the three.
function theTwoToFollow(): SignArt {
  const shaybah: [number, number] = [108, 107];
  const wail: [number, number] = [120, 109];
  const umar: [number, number] = [94, 108];
  const behind: [number, number] = [46, 111];
  const theirs: [number, number][] = [
    [36, 111],
    [26, 112]
  ];
  const muslims: [number, number][] = [
    [96, 86],
    [106, 85],
    [116, 86],
    [126, 85],
    [136, 86],
    [146, 85]
  ];
  const door: [number, number] = [63, 93];
  return {
    kind: "the-two-to-follow",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(142, 16) },
      { name: "a cloud", svg: cloud(76, 24, 0.46, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the mountains of Makkah",
        svg: peaks(
          [
            [18, 16, 26],
            [60, 12, 22],
            [104, 18, 28],
            [148, 14, 24]
          ],
          66,
          "#A88E6A",
          false
        )
      },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 118], [84, 118], [150, 117]]) },
      { name: "homes of Makkah, far off", svg: home(12, 80, 10, 7) + home(26, 78.4, 9, 6) + home(134, 79, 10, 7) + home(148, 80.6, 9, 6) },
      { name: "the open ground about the House", svg: `<ellipse cx="60" cy="102" rx="54" ry="12.6" fill="#EADFC6"/>` },
      { name: "the Ka'bah, the House", svg: kabah(50, 100, 18) },
      { name: "Shaybah's place", svg: someone(shaybah[0], shaybah[1], 1.6, KEEPER) },
      { name: "Abu Wa'il's place, beside Shaybah's", svg: someone(wail[0], wail[1], 1.6, WAIL) },
      { name: "Abu Wa'il's voice: telling of it", svg: arcsLeft(n(wail[0] - 3.2), n(wail[1] - 2.8), WAIL), keys: showFor(0.024, 0.03, 0.084, 0.09), loop: speaking },
      { name: "Shaybah's voice: telling of Umar", svg: arcs(n(shaybah[0] + 3.2), n(shaybah[1] - 2.8), KEEPER), keys: showFor(0.146, 0.152, 0.206, 0.212), loop: speaking },
      {
        name: "Umar's place: beside Shaybah's where Abu Wa'il sits, then going behind the two",
        svg: someone(umar[0], umar[1], 1.6, UMAR),
        keys: track({
          opacity: [
            [0.17, 0],
            [0.182, 1]
          ],
          xy: [
            [0.9, 0, 0],
            [0.94, behind[0] - umar[0], behind[1] - umar[1]]
          ]
        })
      },
      { name: "Umar's voice: I would share out all of it", svg: arcs(n(umar[0] + 3.2), n(umar[1] - 2.8), UMAR), keys: showFor(0.27, 0.276, 0.45, 0.456), loop: speaking },
      {
        name: "the gold and silver in it: glints of gold and white at the door of the House",
        svg:
          glints(
            [
              [n(door[0] - 2.4), n(door[1] - 1.6)],
              [n(door[0] + 2.4), n(door[1] - 2.6)]
            ],
            0.9
          ) +
          glints(
            [
              [door[0], n(door[1] - 3.8)],
              [n(door[0] + 0.6), n(door[1] + 0.6)]
            ],
            0.8,
            "#F4F6FA"
          ),
        keys: showAt(0.4, 0.412),
        loop: twinkle()
      },
      { name: "the places of the Muslims, far off", svg: muslims.map(([x, y]) => someone(x, y, 1.3, FOLK)).join(""), keys: showAt(0.43, 0.442) },
      {
        name: "shared out among them: faint dashed ways from the House to their places",
        svg: [muslims[0], muslims[2], muslims[4]].map(([x, y], i) => way(`M${n(door[0] + 4.4)} ${n(door[1] + 1 - i * 2)} Q${n(door[0] + 14 + i * 8)} ${n(door[1] + 6 - i * 7)} ${n(x - 1.6)} ${n(y + 1.2)}`, "#E8D9A8", 0.8)).join(""),
        keys: showFor(0.51, 0.522, 0.56, 0.572)
      },
      { name: "Shaybah's voice: you cannot do that", svg: arcsLeft(n(shaybah[0] - 3.2), n(shaybah[1] - 2.8), KEEPER), keys: showFor(0.52, 0.526, 0.572, 0.578), loop: speaking },
      { name: "Umar's voice: why", svg: arcs(n(umar[0] + 3.2), n(umar[1] - 2.8), UMAR), keys: showFor(0.634, 0.64, 0.66, 0.666), loop: speaking },
      { name: "Shaybah's voice: your two did not do it", svg: arcsLeft(n(shaybah[0] - 3.2), n(shaybah[1] - 2.8), KEEPER), keys: showFor(0.672, 0.678, 0.812, 0.818), loop: speaking },
      { name: "the two: his place and Abu Bakr's by the House, a golden ring and a soft golden ring", svg: ring(theirs[0][0], theirs[0][1], 2.6, GOLD) + ring(theirs[1][0], theirs[1][1], 2.4, SOFT_GOLD), keys: showAt(0.688, 0.7) },
      { name: "left as it was: a soft golden ring about the gold and silver", svg: care(door[0], n(door[1] - 1.4), 5.4, 4, SOFT_GOLD), keys: showAt(0.79, 0.802), loop: soft },
      { name: "Umar's voice: they are the two to follow", svg: arcs(n(umar[0] + 3.2), n(umar[1] - 2.8), UMAR), keys: showFor(0.81, 0.816, 0.88, 0.886), loop: speaking },
      { name: "the way of the two: a soft golden dashed way from Umar's place to theirs", svg: way(`M${n(umar[0] - 2.6)} ${n(umar[1] + 1.2)} Q72 116 ${n(behind[0] + 2.6)} ${n(behind[1] + 0.6)}`, SOFT_GOLD, 1), keys: showAt(0.88, 0.892) },
      { name: "the two to follow: a soft golden ring about the two and Umar's place behind them", svg: care(36, n(behind[1] + 0.2), 15.4, 4.2, SOFT_GOLD), keys: showAt(0.946, 0.958), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Abu Wa'il: I sat with Shaybah in this",
      "Masjid. Shaybah: Umar sat beside me",
      "Here and said: I feel like distributing",
      "All the gold and silver in it among the",
      "Muslims. I said: you cannot do that.",
      "Umar said: why? I said: your two",
      "Companions did not do it. Umar said:",
      "They are the two whom one must follow."
    ])
  };
}

// To her maternal uncles. Kurayb, the freed servant of Ibn Abbas, said that Maymunah bint al-Harith told him that she
// freed a slave-girl without asking the Prophet ﷺ. On her day, when he came to her, she said: do you know, O Messenger
// of Allah, that I have freed my slave-girl? He said: have you? She said: yes. He said: had you given her to your
// maternal uncles, it would have been greater for your reward (Sahih al-Bukhari 2592; the English page: you would have
// got more reward if you had given her to one of your maternal uncles). No one is drawn: Madinah, Maymunah's home, the
// masjid, his place at it, a golden ring, and Maymunah's place with a small place beside it. The small place goes out
// on its way, freed, with a small light, and a spark rises from Maymunah's place. His place comes over to her home on
// her day; her voice asks, his voice asks, her voice says yes, and his voice speaks: far off, the home of one of her
// maternal uncles shows, a pale dashed way goes from her home to it, a pale small place shows at its door, and a soft
// golden ring and glints come about it, with two sparks rising: more reward.
function toHerUncles(): SignArt {
  const maymunah: [number, number] = [56, 106];
  const freed: [number, number] = [62, 108.4];
  const out: [number, number] = [150, 114];
  const his: [number, number] = [124, 104];
  const visit: [number, number] = [70, 105];
  const uncles: [number, number] = [18, 82];
  return {
    kind: "to-her-uncles",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(84, 16) },
      { name: "a cloud", svg: cloud(132, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[14, 117], [90, 118], [150, 116]]) },
      { name: "the road out", svg: road(80, 160, 113.4) },
      { name: "Maymunah's home", svg: home(50, 100, 24, 16) },
      { name: "the masjid", svg: madinahMasjid(110, 92, 0.8) },
      ...palms([[96, 92, 12]], "Madinah"),
      {
        name: "his place, a golden ring: at the masjid, then coming to her home on her day",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.2, 0, 0],
            [0.25, visit[0] - his[0], visit[1] - his[1]]
          ]
        })
      },
      { name: "Maymunah's place, by her door", svg: someone(maymunah[0], maymunah[1], 1.6, ROSE) },
      {
        name: "the one she freed: a small place by her side, going out on its way",
        svg: someone(freed[0], freed[1], 1.2, FREED),
        keys: track({
          xy: [
            [0.05, 0, 0],
            [0.1, out[0] - freed[0], out[1] - freed[1]]
          ]
        })
      },
      {
        name: "freed: a small light with it",
        svg: glow(freed[0], freed[1], 3, "#FFE07A", 0.4),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1]
          ],
          xy: [
            [0.05, 0, 0],
            [0.1, out[0] - freed[0], out[1] - freed[1]]
          ]
        })
      },
      spark("freed: a spark rising from Maymunah's place", maymunah[0], n(maymunah[1] - 3), 0.06, 0.104),
      { name: "Maymunah's voice: do you know that I have freed her", svg: arcs(n(maymunah[0] + 3.2), n(maymunah[1] - 2.8), ROSE), keys: showFor(0.33, 0.336, 0.53, 0.536), loop: speaking },
      { name: "his voice: have you", svg: arcsLeft(n(visit[0] - 3.2), n(visit[1] - 2.8), GOLD), keys: showFor(0.6, 0.606, 0.63, 0.636), loop: speaking },
      { name: "Maymunah's voice: yes", svg: arcs(n(maymunah[0] + 3.2), n(maymunah[1] - 2.8), ROSE), keys: showFor(0.642, 0.648, 0.664, 0.67), loop: speaking },
      { name: "his voice: more reward", svg: arcsLeft(n(visit[0] - 3.2), n(visit[1] - 2.8), GOLD), keys: showFor(0.676, 0.682, 0.95, 0.956), loop: speaking },
      { name: "one of her maternal uncles: a home far off", svg: home(uncles[0], uncles[1], 10, 7), keys: showAt(0.888, 0.9) },
      { name: "had you given her to them: a pale dashed way from her home to theirs", svg: way(`M${n(maymunah[0] - 9)} ${n(maymunah[1] - 1)} Q30 98 ${n(uncles[0] + 3)} ${n(uncles[1] + 1.4)}`, "#F2E6C2", 0.9), keys: showAt(0.894, 0.906) },
      { name: "given to them: a pale small place at their door", svg: someone(n(uncles[0] - 1.8), n(uncles[1] + 1.4), 0.9, FREED), keys: track({ opacity: [[0.9, 0], [0.912, 0.6]] }) },
      {
        name: "more reward: a soft golden ring and glints about their home",
        svg:
          care(uncles[0], n(uncles[1] - 2.4), 8, 5.4, SOFT_GOLD) +
          glints(
            [
              [n(uncles[0] - 7), n(uncles[1] - 8.4)],
              [n(uncles[0] + 7.4), n(uncles[1] - 7.8)]
            ],
            0.8
          ),
        keys: showAt(0.916, 0.928),
        loop: soft
      },
      spark("more reward: a spark rising from their home 1", n(uncles[0] - 2.4), n(uncles[1] - 9), 0.904, 0.944),
      spark("more reward: a spark rising from their home 2", n(uncles[0] + 2.6), n(uncles[1] - 9), 0.916, 0.956)
    ],
    words: linesOn(SEVEN, [
      "Kurayb: Maymunah freed a slave-girl",
      "Without asking his permission. On her",
      "Day with him she said: do you know that",
      "I have freed my slave-girl? He said:",
      "Have you really? She said yes. He said:",
      "You would have got more reward had you",
      "Given her to one of your maternal uncles."
    ])
  };
}

// A judge's reward. Amr ibn al-As said that he heard the Messenger of Allah ﷺ say: when a judge judges, and strives,
// and then is right, he has two rewards; and when he judges, and strives, and then is wrong, he has one reward (Sahih
// al-Bukhari 7352; the English page: gives a verdict according to the best of his knowledge, a double reward, and even
// then he will get a reward). No one is drawn: a shade of palm leaves in Madinah, the judge's place under it, and two
// places that come before it from either side. A small light shows in the judge's place: his best, with glints. A
// golden line goes from it to the right one's place, and a soft golden ring comes about it: right; two sparks rise,
// and two small lights stay over the line: two rewards. Glints come again about the judge's place; a grey line goes
// from it to the left one's place, and a grey dashed ring comes about it: wrong; a spark rises, and one small light
// stays over the grey line: a reward.
function twoRewardsForAJudge(): SignArt {
  const judge: [number, number] = [80, 101];
  const left: [number, number] = [60, 109];
  const right: [number, number] = [100, 109];
  return {
    kind: "two-rewards-for-a-judge",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(24, 16) },
      { name: "a cloud", svg: cloud(116, 24, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a home of Madinah", svg: home(24, 96, 20, 14) },
      ...palms(
        [
          [138, 95, 13],
          [150, 97, 11]
        ],
        "Madinah"
      ),
      { name: "a shade of palm leaves", svg: shade(64, 96, 104) },
      { name: "the judge's place, under the shade", svg: someone(judge[0], judge[1], 1.7, JUDGE) },
      {
        name: "the left one's place: coming before the judge",
        svg: someone(left[0], left[1], 1.6, FOLK),
        keys: track({
          xy: [
            [0.03, -50, 4],
            [0.09, 0, 0]
          ]
        })
      },
      {
        name: "the right one's place: coming before the judge",
        svg: someone(right[0], right[1], 1.6, FOLK),
        keys: track({
          xy: [
            [0.03, 50, 4],
            [0.09, 0, 0]
          ]
        })
      },
      { name: "to the best of his knowledge: a small light in the judge's place", svg: lightIn(judge[0], judge[1], 3.4), keys: showAt(0.2, 0.212), loop: soft },
      {
        name: "his best: glints about the judge's place",
        svg: glints(
          [
            [n(judge[0] - 4.4), n(judge[1] - 4)],
            [n(judge[0] + 4.6), n(judge[1] - 4.6)]
          ],
          0.7
        ),
        keys: showFor(0.22, 0.232, 0.32, 0.332),
        loop: twinkle()
      },
      { name: "the verdict, right: a golden line from the judge's place to the right one's", svg: `<path d="M${n(judge[0] + 2)} ${n(judge[1] + 1.4)} L${n(right[0] - 2.2)} ${n(right[1] - 0.8)}" stroke="${SOFT_GOLD}" stroke-width="1" stroke-linecap="round"/>`, keys: showAt(0.34, 0.352) },
      { name: "right: a soft golden ring about the right one's place", svg: care(right[0], right[1], 3.6, 2, SOFT_GOLD), keys: showAt(0.36, 0.372), loop: soft },
      spark("two rewards: a spark rising from the judge's place 1", n(judge[0] + 1.4), n(judge[1] - 3), 0.456, 0.5),
      spark("two rewards: a spark rising from the judge's place 2", n(judge[0] + 4.2), n(judge[1] - 2.4), 0.476, 0.52),
      { name: "two rewards: two small lights over the golden line, kept", svg: lightIn(88, 101.6, 2.4) + lightIn(93.6, 103.4, 2.4), keys: showAt(0.5, 0.512), loop: soft },
      {
        name: "his best again: glints about the judge's place",
        svg: glints(
          [
            [n(judge[0] - 4.4), n(judge[1] - 4.6)],
            [n(judge[0] + 4.6), n(judge[1] - 4)]
          ],
          0.7
        ),
        keys: showFor(0.6, 0.612, 0.67, 0.682),
        loop: twinkle()
      },
      { name: "the verdict, wrong: a grey line from the judge's place to the left one's", svg: `<path d="M${n(judge[0] - 2)} ${n(judge[1] + 1.4)} L${n(left[0] + 2.2)} ${n(left[1] - 0.8)}" stroke="${GREY}" stroke-width="1" stroke-linecap="round"/>`, keys: showAt(0.75, 0.762) },
      { name: "wrong: a grey dashed ring about the left one's place", svg: greyRing(left[0], left[1], 3.6, 2), keys: showAt(0.77, 0.782) },
      spark("a reward: a spark rising from the judge's place", n(judge[0] - 1.4), n(judge[1] - 3), 0.888, 0.93),
      { name: "a reward: one small light over the grey line, kept", svg: lightIn(70, 103.6, 2.4), keys: showAt(0.92, 0.932), loop: soft }
    ],
    words: linesOn(SEVEN, [
      "Amr ibn al-As heard him say: if a judge",
      "Gives a verdict to the best of his",
      "Knowledge and it is correct, he will",
      "Receive a double reward; and if he gives",
      "A verdict to the best of his knowledge",
      "And it is wrong, even then he will get",
      "A reward."
    ])
  };
}

// Not grown impatient. Abu Hurairah said that the Messenger of Allah ﷺ said: it is answered for one of you as long as
// he does not hurry and say: I made du'a, and it was not answered for me (Sahih Muslim 2735; the English page: the
// supplication of every one of you is granted if he does not grow impatient and says: I supplicated but it was not
// granted). No one is drawn: Madinah, and two places, each on a small mat. The left one's voice asks, sparks rise from
// it, and a soft golden ring and glints come about it: granted. The right one's voice asks, and a spark rises; then its
// voice grows quick and grey: I made du'a, and no answer; its place leaves its mat, and a grey dashed ring comes about
// the empty mat.
function notGrownImpatient(): SignArt {
  const keeps: [number, number] = [40, 104.6];
  const hasty: [number, number] = [120, 104.6];
  return {
    kind: "not-grown-impatient",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(80, 18) },
      { name: "a cloud", svg: cloud(36, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[14, 117], [80, 118], [150, 116]]) },
      { name: "a home of Madinah", svg: home(80, 96, 22, 15) },
      ...palms(
        [
          [16, 94, 12],
          [146, 94, 12]
        ],
        "Madinah"
      ),
      { name: "the left one's mat", svg: mat(keeps[0], n(keeps[1] + 1.6)) },
      { name: "the right one's mat", svg: mat(hasty[0], n(hasty[1] + 1.6), "#5A6E8C") },
      { name: "the place that keeps asking, on its mat", svg: someone(keeps[0], keeps[1], 1.6, ASKS) },
      { name: "the left one's voice: asking, and asking", svg: arcs(n(keeps[0] + 3.2), n(keeps[1] - 2.8), ASKS), keys: showAt(0.06, 0.066), loop: speaking },
      spark("its du'a: a spark rising from the left one's place 1", keeps[0], n(keeps[1] - 3), 0.1, 0.15),
      spark("its du'a: a spark rising from the left one's place 2", keeps[0], n(keeps[1] - 3), 0.16, 0.206),
      spark("its du'a: a spark rising from the left one's place 3", keeps[0], n(keeps[1] - 3), 0.3, 0.35),
      {
        name: "granted: a soft golden ring and glints about the left one's place",
        svg:
          care(keeps[0], n(keeps[1] + 0.6), 6.4, 3, SOFT_GOLD) +
          glints(
            [
              [n(keeps[0] - 5), n(keeps[1] - 5)],
              [n(keeps[0] + 5.4), n(keeps[1] - 5.6)]
            ],
            0.7
          ),
        keys: showAt(0.38, 0.392),
        loop: soft
      },
      {
        name: "the place that grows impatient: on its mat, then leaving it",
        svg: someone(hasty[0], hasty[1], 1.6, HASTY),
        keys: track({
          xy: [
            [0.88, 0, 0],
            [0.92, 18, 7]
          ]
        })
      },
      { name: "the right one's voice: asking", svg: arcsLeft(n(hasty[0] - 3.2), n(hasty[1] - 2.8), HASTY), keys: showFor(0.52, 0.526, 0.6, 0.606), loop: speaking },
      spark("its du'a: a spark rising from the right one's place", hasty[0], n(hasty[1] - 3), 0.53, 0.58),
      {
        name: "impatient: its voice, quick and grey, I made du'a and no answer",
        svg: arcsLeft(n(hasty[0] - 3.2), n(hasty[1] - 2.8), GREY),
        keys: showFor(0.62, 0.626, 0.86, 0.866),
        loop: { move: "twinkle", ms: 420, low: 0.35 }
      },
      { name: "giving up: a grey dashed ring about the empty mat", svg: greyRing(hasty[0], n(hasty[1] + 1.6), 6.6, 2.6), keys: showAt(0.93, 0.942) }
    ],
    words: linesOn(FOUR, ["Abu Hurairah: he said: the supplication", "Of every one of you is granted if he", "Does not grow impatient and say:", "I supplicated but it was not granted."])
  };
}

// Do not hold it back. Asma said: I said: O Messenger of Allah, I have no wealth but what az-Zubayr brought in to me;
// may I give in charity? He said: give in charity, and do not hold it back, lest it be held back from you (Sahih
// al-Bukhari 2590; the English page: I have no property except what has been given to me by Az-Zubair; give in charity
// and do not withhold it, otherwise Allah will withhold it back from you). No one is drawn: Madinah, Asma's home, the
// masjid with his place at it, a golden ring, and Asma's place by her door. Asma's voice asks; az-Zubayr's place
// shows, and coins go from it to her home. A place in need shows far off. His voice speaks: coins go from her home to
// the one in need, and a spark rises from it. A small box shows by the home, shut, with a grey dashed ring: do not
// hold it back; and a grey dashed ring comes on the way into the home: lest it be held back from you.
function doNotWithhold(): SignArt {
  const asma: [number, number] = [56, 106];
  const zubair: [number, number] = [16, 109];
  const given: [number, number] = [60, 107.6];
  const need: [number, number] = [96, 112];
  const his: [number, number] = [126, 104];
  return {
    kind: "do-not-withhold",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(26, 16) },
      { name: "a cloud", svg: cloud(88, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "Asma's home", svg: home(50, 100, 24, 16) },
      { name: "the masjid", svg: madinahMasjid(112, 92, 0.8) },
      ...palms([[100, 92, 12]], "Madinah"),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Asma's place, by her door", svg: someone(asma[0], asma[1], 1.6, ROSE) },
      { name: "Asma's voice: may I give in charity", svg: arcs(n(asma[0] + 3.2), n(asma[1] - 2.8), ROSE), keys: showFor(0.03, 0.036, 0.43, 0.436), loop: speaking },
      { name: "Az-Zubair's place", svg: someone(zubair[0], zubair[1], 1.6, ZUBAIR), keys: showAt(0.18, 0.192) },
      { name: "the way in: dashed, from Az-Zubair's place to the home", svg: way(`M${n(zubair[0] + 2.6)} ${n(zubair[1] - 0.4)} Q30 110 ${n(given[0] - 4)} ${n(given[1] + 0.6)}`, "#FFF0C4", 0.9), keys: showAt(0.186, 0.198) },
      {
        name: "what Az-Zubair gives: coins going from his place into the home",
        svg: coins(given[0], given[1], 2),
        keys: track({
          opacity: [
            [0.2, 0],
            [0.21, 1]
          ],
          xy: [
            [0.21, zubair[0] - given[0] + 2, zubair[1] - given[1]],
            [0.26, 0, 0]
          ]
        })
      },
      { name: "one in need: a place far off", svg: someone(need[0], need[1], 1.4, FOLK), keys: showAt(0.38, 0.392) },
      { name: "his voice: give in charity, and do not hold it back", svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.5, 0.506, 0.95, 0.956), loop: speaking },
      {
        name: "give in charity: a coin going from the home to the one in need",
        svg: coins(n(need[0] - 3.6), n(need[1] + 0.4), 1),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.53, 1]
          ],
          xy: [
            [0.53, given[0] - need[0] + 3.6, given[1] - need[1] - 0.4],
            [0.58, 0, 0]
          ]
        })
      },
      spark("given: a spark rising from the one in need", need[0], n(need[1] - 3), 0.55, 0.594),
      { name: "do not hold it back: a small box by the home, shut, with a grey dashed ring", svg: box(68, 106) + greyRing(68, 104, 5, 3.4), keys: showAt(0.67, 0.682) },
      { name: "lest it be held back: a grey dashed ring on the way into the home", svg: greyRing(36, 110.4, 4.4, 2.2), keys: showAt(0.84, 0.852) }
    ],
    words: linesOn(SIX, [
      "Asma: once I said to him: I have no",
      "Property except what has been given",
      "To me by Az-Zubair. May I give in charity?",
      "He said: give in charity and do not",
      "Withhold it; otherwise Allah will",
      "Withhold it back from you."
    ])
  };
}

// Not built for this. Abu Hurairah said that the Messenger of Allah ﷺ said: whoever hears someone calling out in the
// masjid for a lost thing, let him say: may Allah not return it to you, for the masjids were not built for this
// (Sahih Muslim 568a; the English page: a man crying out in the mosque about something he has lost). No one is drawn:
// the masjid of Madinah, and rows of places at prayer before it, with sparks rising. A place shows by the rows, its
// voice loud and grey on both sides: crying out. Far off, a faint dashed outline of something lost shows. The voice of
// one in the rows speaks; then the loud voice falls quiet, a grey dashed ring comes about its place, and a soft golden
// ring comes about the masjid and the rows, with sparks rising.
function notBuiltForThis(): SignArt {
  const rows: [number, number][] = [
    ...[60, 68, 76, 84, 92, 100].map((x): [number, number] => [x, 100]),
    ...[60, 68, 76, 84, 92, 100].map((x): [number, number] => [x, 106])
  ];
  const cries: [number, number] = [124, 104];
  const hears: [number, number] = [100, 100];
  const lost: [number, number] = [146, 92];
  return {
    kind: "not-built-for-this",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(28, 16) },
      { name: "a cloud", svg: cloud(110, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(56, 92, 1) },
      ...palms(
        [
          [20, 94, 13],
          [36, 96, 11]
        ],
        "Madinah"
      ),
      { name: "the rows of places at prayer, before the masjid", svg: rows.map(([x, y]) => someone(x, y, 1.4, FOLK)).join("") },
      spark("at prayer: a spark rising from the rows 1", 68, 97, 0.05, 0.1),
      spark("at prayer: a spark rising from the rows 2", 88, 97, 0.08, 0.13),
      { name: "the place crying out, by the rows", svg: someone(cries[0], cries[1], 1.6, CRIES), keys: showAt(0.22, 0.232) },
      {
        name: "its voice: loud and grey, crying out",
        svg: arcs(n(cries[0] + 3.2), n(cries[1] - 2.8), GREY) + arcsLeft(n(cries[0] - 3.2), n(cries[1] - 2.8), GREY),
        keys: showFor(0.24, 0.246, 0.83, 0.836),
        loop: { move: "twinkle", ms: 520, low: 0.35 }
      },
      { name: "something lost: a faint dashed outline far off", svg: lostThing(lost[0], lost[1]), keys: showAt(0.42, 0.432) },
      { name: "the voice of one in the rows: may it not be returned to you", svg: arcs(n(hears[0] + 2.6), n(hears[1] - 3.2), "#6B4A2E"), keys: showFor(0.612, 0.618, 0.83, 0.836), loop: speaking },
      { name: "not for this: a grey dashed ring about the place that cried out", svg: greyRing(cries[0], cries[1], 3.6, 2), keys: showAt(0.84, 0.852) },
      { name: "what the masjids were built for: a soft golden ring about the masjid and the rows", svg: care(80, 100, 30, 10.4, SOFT_GOLD), keys: showAt(0.86, 0.872), loop: soft },
      spark("at prayer: a spark rising from the rows 3", 72, 103, 0.88, 0.924),
      spark("at prayer: a spark rising from the rows 4", 92, 103, 0.9, 0.944)
    ],
    words: linesOn(FIVE, [
      "Abu Hurairah: he said: if anyone hears",
      "A man crying out in the masjid about",
      "Something he has lost, he should say:",
      "May Allah not restore it to you, for the",
      "Masjids were not built for this."
    ])
  };
}

export const FOLLOW_ART = {
  "the-two-to-follow": theTwoToFollow,
  "to-her-uncles": toHerUncles,
  "two-rewards-for-a-judge": twoRewardsForAJudge,
  "not-grown-impatient": notGrownImpatient,
  "do-not-withhold": doNotWithhold,
  "not-built-for-this": notBuiltForThis
} as const;
