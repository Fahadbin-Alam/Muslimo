import { cloud, n, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, lightIn, palms, track } from "./daysArt";
import { date, greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, FOLK, glints, linesOn, plainLand, SEVEN, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { coins, stall } from "./tradeArt";
import { GREY } from "./lovedArt";

/**
 * Fair to one another: the believer, brother of the believer, who does not outbid him or propose over his proposal;
 * Ammar's short and eloquent khutbah, and a long prayer with a short sermon as a sign of understanding; Ka'b ibn Malik,
 * told to keep some of his wealth; the two groups of advisors about every caliph; standing for the prayer only on
 * seeing him, and calmly; and speaking up for one in need, for a reward. Only the land, the sky, buildings, things and
 * plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a
 * face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice
 * is arcs in the air. Nothing is drawn for Allah, no book or page is drawn, and nothing comes down from the sky: a deed
 * is a spark that rises, what is good is a light, glints and a soft golden ring, and what is not to be done a grey
 * dashed ring. No name, word or number is written.
 */

/** A pulpit of three steps facing right, its foot's left at (x, y). */
export const pulpit = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x + 6)} ${y} L${n(x + 6)} ${n(y - 2)} L${n(x + 4)} ${n(y - 2)} L${n(x + 4)} ${n(y - 4)} L${n(x + 2)} ${n(y - 4)} L${n(x + 2)} ${n(y - 6)} L${x} ${n(y - 6)} Z" fill="#8E6A42"/><path d="M${x} ${n(y - 6)} L${x} ${n(y - 9)}" stroke="#8E6A42" stroke-width="0.7"/>`;

/** A faint dashed coin, its middle at (x, y): an offer not to be made. */
const faintCoin = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="0.85" stroke="${GREY}" stroke-width="0.45" stroke-dasharray="0.8 0.6" fill="none"/>`;

/** Something needed: the faint dashed outline of a small bundle, its foot's middle at (x, y). */
const bundle = (x: number, y: number) =>
  `<path d="M${n(x - 3.2)} ${y} Q${n(x - 3.6)} ${n(y - 4)} ${x} ${n(y - 4.4)} Q${n(x + 3.6)} ${n(y - 4)} ${n(x + 3.2)} ${y} Z" stroke="#9A9088" stroke-width="0.6" stroke-dasharray="0.9 0.7" fill="none"/>`;

/** A soft line on the ground from x1 to x2 at y: how long a thing is. */
const line = (x1: number, x2: number, y: number) =>
  `<path d="M${x1} ${y} L${x2} ${y}" stroke="${SOFT_GOLD}" stroke-width="1" stroke-linecap="round"/>`;

/** Uqbah's place and voice: a slate blue. */
const UQBAH = "#5A6E8C";
/** The place of the one who came first, to buy and to propose: a plain green. */
const FIRST = "#5E8A52";
/** The place of the other one, who holds back: a muted violet. */
const OTHER = "#8B6B9E";
/** Ammar's place and voice: a deep brown. */
const AMMAR = "#7A5C3E";
/** Abu Wa'il's place and voice: a muted violet. */
const WAIL = "#8B6B9E";
/** Ka'b's place and voice: a slate blue. */
const KAAB = "#4E6E7E";
/** The caliph's place: a deep teal. */
const CALIPH = "#3E6B6B";
/** Abu Sa'id's place and voice: a deep red-brown. */
const SAID = "#9C4F36";
/** Abu Qatada's place and voice: a plain green. */
const QATADA = "#5E8A52";
/** The place calling the iqamah: a muted violet. */
const CALLER = "#7E6A9A";
/** A place in need: a dull brown. */
const NEED = "#8A6A5A";

// The brother of a believer. Abd ar-Rahman ibn Shumasah heard Uqbah ibn Amir say on the pulpit that the Messenger of
// Allah ﷺ said: the believer is the brother of the believer, so it is not lawful for the believer to buy over the sale
// of his brother, nor to propose over the proposal of his brother, until he leaves it (Sahih Muslim 1414; the English
// page: it is not lawful for a believer to outbid his brother, and he should not propose an engagement when his
// brother has thus proposed until he gives it up). No one is drawn: a pulpit with Uqbah's place on it, two places side
// by side, a market stall with the seller's place behind it, and a home. Uqbah's voice tells of it. A soft golden ring
// comes about the two places, with glints: brothers. The first goes to the stall, and its coins show on the counter; by
// the other, a faint dashed coin shows with a grey dashed ring: no outbidding. The first goes on to the door of the
// home; a grey dashed way shows from the other toward it, with a grey dashed ring at its end: no proposing over it. The
// first one's voice speaks at the door: it has proposed. Then the first goes away from the door, given up, and the
// grey dashed way and ring fade.
function brotherOfABeliever(): SignArt {
  const uqbah: [number, number] = [10.6, 103.2];
  const first: [number, number] = [38, 110];
  const other: [number, number] = [48, 111];
  const atStall: [number, number] = [66, 109];
  const atDoor: [number, number] = [119, 107];
  const away: [number, number] = [100, 112.4];
  const seller: [number, number] = [82, 97.6];
  const wayEnd: [number, number] = [n(atDoor[0] - 6), n(atDoor[1] + 4)];
  return {
    kind: "brother-of-a-believer",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(140, 16) },
      { name: "a cloud", svg: cloud(60, 24, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a pulpit", svg: pulpit(8, 111) },
      { name: "Uqbah's place, on the pulpit", svg: someone(uqbah[0], uqbah[1], 1.5, UQBAH) },
      { name: "Uqbah's voice: telling what he said", svg: arcs(n(uqbah[0] + 3.2), n(uqbah[1] - 2.8), UQBAH), keys: showFor(0.024, 0.03, 0.236, 0.242), loop: speaking },
      { name: "a market stall", svg: stall(82, 22, "#B5543C", 88, 101) },
      { name: "dates on its counter", svg: date(88, 100.3) + date(90, 100.3) + date(89, 99.4) },
      { name: "the seller's place, behind the counter", svg: someone(seller[0], seller[1], 1.4, FOLK) },
      { name: "a home", svg: home(126, 104, 22, 15) },
      ...palms([[148, 96, 12]], "the town"),
      { name: "the other one's place, beside the first", svg: someone(other[0], other[1], 1.6, OTHER) },
      {
        name: "the first one's place: going to the stall, then to the door of the home, then away",
        svg: someone(first[0], first[1], 1.6, FIRST),
        keys: track({
          xy: [
            [0.456, 0, 0],
            [0.5, atStall[0] - first[0], atStall[1] - first[1]],
            [0.6, atStall[0] - first[0], atStall[1] - first[1]],
            [0.66, atDoor[0] - first[0], atDoor[1] - first[1]],
            [0.888, atDoor[0] - first[0], atDoor[1] - first[1]],
            [0.93, away[0] - first[0], n(away[1] - first[1])]
          ]
        })
      },
      { name: "close as kin: a soft golden ring about the two places", svg: care(43, 110.6, 9.4, 3.4, SOFT_GOLD), keys: showFor(0.2, 0.212, 0.452, 0.462), loop: soft },
      {
        name: "close as kin: glints about the two places",
        svg: glints(
          [
            [36, 104.8],
            [50.4, 105.2]
          ],
          0.7
        ),
        keys: showFor(0.32, 0.332, 0.452, 0.462),
        loop: twinkle()
      },
      { name: "the first one's coins on the counter: its offer", svg: coins(74.4, 100.6, 2), keys: showAt(0.5, 0.512) },
      { name: "no outbidding: a faint dashed coin by the other one's place, with a grey dashed ring", svg: faintCoin(54, 110.2) + greyRing(54, 110, 3.6, 2), keys: showAt(0.52, 0.532) },
      {
        name: "no proposing over it: a grey dashed way from the other one's place toward the home",
        svg: way(`M${n(other[0] + 2.6)} ${n(other[1] + 1.6)} Q84 116.4 ${wayEnd[0]} ${n(wayEnd[1] + 0.4)}`, GREY, 0.8),
        keys: showFor(0.664, 0.676, 0.93, 0.942)
      },
      { name: "not to propose: a grey dashed ring at the way's end", svg: greyRing(wayEnd[0], wayEnd[1], 3, 1.8), keys: showFor(0.672, 0.684, 0.934, 0.946) },
      { name: "the first one's voice at the door: it has proposed", svg: arcs(n(atDoor[0] + 3.2), n(atDoor[1] - 2.8), FIRST), keys: showFor(0.744, 0.75, 0.82, 0.826), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Uqbah ibn Amir said on the pulpit that",
      "He said: a believer is the brother",
      "Of a believer, so it is not lawful",
      "For a believer to outbid his brother,",
      "And he should not propose an engagement",
      "When his brother has thus proposed",
      "Until he gives it up."
    ])
  };
}

// Short and eloquent. Abu Wa'il said: Ammar gave us a khutbah, and he was brief and eloquent. When he came down we
// said: O Abu al-Yaqzan, you were eloquent and brief; if only you had made it longer. He said: I heard the Messenger of
// Allah ﷺ say: a man's long prayer and short khutbah are a sign of his understanding, so make the prayer long and the
// khutbah short, and some speech is enchanting (Sahih Muslim 869; the English page: the lengthening of prayer by a man
// and the shortness of the sermon is the sign of his understanding). What they said to Ammar, and the last words on
// speech, are left out. No one is drawn: a masjid, a pulpit with Ammar's place on it, and rows of places sitting
// before it, Abu Wa'il's among them. Abu Wa'il's voice tells of it. Ammar's voice speaks for a short while, with glints:
// short and eloquent. Ammar's voice tells what he heard. A long soft golden line shows along the rows, with sparks
// rising: the long prayer; a short soft golden line shows by the pulpit: the short sermon. A small light and glints
// show in Ammar's place: understanding. A soft golden ring comes about the rows, with a spark: lengthen the prayer; and
// a soft golden ring comes about the pulpit, with a spark: shorten the sermon.
function shortAndEloquent(): SignArt {
  const ammar: [number, number] = [22.6, 102.2];
  const wail: [number, number] = [36, 106];
  const rows: [number, number][] = [
    ...[44, 52, 60, 68, 76, 84].map((x): [number, number] => [x, 106]),
    ...[36, 44, 52, 60, 68, 76, 84].map((x): [number, number] => [x, 112])
  ];
  return {
    kind: "short-and-eloquent",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(132, 16) },
      { name: "a cloud", svg: cloud(64, 24, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(100, 94, 1) },
      ...palms(
        [
          [94, 94, 12],
          [154, 96, 11]
        ],
        "the town"
      ),
      { name: "a pulpit", svg: pulpit(20, 110) },
      { name: "Ammar's place, on the pulpit", svg: someone(ammar[0], ammar[1], 1.6, AMMAR) },
      { name: "the rows of places, sitting before the pulpit", svg: rows.map(([x, y]) => someone(x, y, 1.4, FOLK)).join("") },
      { name: "Abu Wa'il's place, in the first row", svg: someone(wail[0], wail[1], 1.4, WAIL) },
      { name: "Abu Wa'il's voice: telling of it", svg: arcs(n(wail[0] + 2.8), n(wail[1] - 2.8), WAIL), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "Ammar's voice: the sermon, for a short while", svg: arcs(n(ammar[0] + 3.2), n(ammar[1] - 2.8), AMMAR), keys: showFor(0.146, 0.152, 0.19, 0.196), loop: speaking },
      {
        name: "eloquent: glints by Ammar's voice",
        svg: glints(
          [
            [n(ammar[0] + 7.4), n(ammar[1] - 5.2)],
            [n(ammar[0] + 8.6), n(ammar[1] - 1.6)]
          ],
          0.7
        ),
        keys: showFor(0.15, 0.162, 0.268, 0.28),
        loop: twinkle()
      },
      { name: "Ammar's voice: I have heard him saying", svg: arcs(n(ammar[0] + 3.2), n(ammar[1] - 2.8), AMMAR), keys: showFor(0.284, 0.29, 0.326, 0.332), loop: speaking },
      { name: "the prayer, long: a long soft golden line along the rows", svg: line(32, 90, 116), keys: showAt(0.39, 0.402) },
      spark("at prayer: a spark rising from the rows 1", 52, 103, 0.404, 0.45),
      spark("at prayer: a spark rising from the rows 2", 72, 103, 0.41, 0.456),
      { name: "the sermon, short: a short soft golden line by the pulpit", svg: line(18, 28, 116), keys: showAt(0.512, 0.524) },
      { name: "his understanding: a small light in Ammar's place", svg: lightIn(ammar[0], ammar[1], 3.2), keys: showAt(0.634, 0.646), loop: soft },
      {
        name: "understanding: glints about Ammar's place",
        svg: glints(
          [
            [n(ammar[0] - 4.6), n(ammar[1] - 4)],
            [n(ammar[0] + 4.8), n(ammar[1] - 4.6)]
          ],
          0.7
        ),
        keys: showAt(0.65, 0.662),
        loop: twinkle()
      },
      { name: "lengthen the prayer: a soft golden ring about the rows", svg: care(60, 109.2, 29, 6.8, SOFT_GOLD), keys: showAt(0.756, 0.768), loop: soft },
      spark("at prayer: a spark rising from the rows 3", 64, 103, 0.77, 0.816),
      { name: "shorten the sermon: a soft golden ring about the pulpit", svg: care(23.4, 107, 6.6, 6.4, SOFT_GOLD), keys: showAt(0.878, 0.89), loop: soft },
      spark("a spark rising from Ammar's place", ammar[0], n(ammar[1] - 3), 0.89, 0.934)
    ],
    words: linesOn(EIGHT, [
      "Abu Wa'il said: Ammar delivered to us",
      "The sermon. It was short and eloquent.",
      "Ammar said: I have heard him saying:",
      "The lengthening of prayer by a man",
      "And the shortness of the sermon is",
      "The sign of his understanding.",
      "So lengthen the prayer",
      "And shorten the sermon."
    ])
  };
}

// Keep some of your wealth. Abdullah ibn Ka'b, who led Ka'b when he lost his sight, heard Ka'b ibn Malik say, at the
// end of his account of the three who were left behind: part of my repentance is that I give up my wealth as charity
// to Allah and His Messenger. The Prophet ﷺ said: keep some of your wealth, for that is better for you (Sahih al-Bukhari
// 6690; the English page: as a proof of my true repentance, I shall give up all my property for the sake of Allah and
// His Apostle). What they stayed behind from is left out of the lines, and so is "and His Apostle". No one is drawn:
// Madinah, Ka'b's home, his wealth before it as coins, and the masjid with his place at it, a golden ring. Ka'b's voice
// speaks: a small light shows in his place, his repentance, and a pale dashed way goes out from the home; the coins go
// out along it, all of them, and a place in need shows far off. His voice speaks: some of the coins come back to the
// home, and a soft golden ring comes about them, kept; the rest go on to the one in need, and a spark rises from it.
// Glints come about the coins kept, and a soft golden ring about Ka'b's place: better for you.
function keepSomeOfYourWealth(): SignArt {
  const kaab: [number, number] = [58, 106];
  const some: [number, number] = [46.2, 107];
  const rest: [number, number] = [51, 107];
  const partway: [number, number] = [-16, 3.4];
  const need: [number, number] = [14, 111.4];
  const his: [number, number] = [124, 104];
  return {
    kind: "keep-some-of-your-wealth",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(26, 16) },
      { name: "a cloud", svg: cloud(92, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "Ka'b's home", svg: home(52, 100, 24, 16) },
      { name: "the masjid", svg: madinahMasjid(108, 92, 0.8) },
      ...palms([[98, 92, 12]], "Madinah"),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ka'b's place, by his door", svg: someone(kaab[0], kaab[1], 1.6, KAAB) },
      { name: "Ka'b's voice: I shall give up all my property", svg: arcs(n(kaab[0] + 3.2), n(kaab[1] - 2.8), KAAB), keys: showFor(0.024, 0.03, 0.54, 0.546), loop: speaking },
      { name: "his true repentance: a small light in Ka'b's place", svg: lightIn(kaab[0], kaab[1], 3), keys: showAt(0.22, 0.232), loop: soft },
      { name: "the way out: a pale dashed way from the home", svg: way(`M42 108.8 Q30 113.8 ${n(need[0] + 4.4)} ${n(need[1] + 1.2)}`, "#FFF0C4", 0.9), keys: showAt(0.3, 0.312) },
      {
        name: "some of his wealth: coins going out, then back to the home, kept",
        svg: coins(some[0], some[1], 3),
        keys: track({
          xy: [
            [0.416, 0, 0],
            [0.47, partway[0], partway[1]],
            [0.62, partway[0], partway[1]],
            [0.66, 0, 0]
          ]
        })
      },
      {
        name: "the rest of his wealth: coins going out, then on to the one in need",
        svg: coins(rest[0], rest[1], 3),
        keys: track({
          xy: [
            [0.416, 0, 0],
            [0.47, partway[0], partway[1]],
            [0.672, partway[0], partway[1]],
            [0.716, n(need[0] + 3.8 - rest[0]), n(need[1] + 0.6 - rest[1])]
          ]
        })
      },
      { name: "one in need: a place far off", svg: someone(need[0], need[1], 1.4, NEED), keys: showAt(0.416, 0.428) },
      { name: "his voice: keep some of your wealth", svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.612, 0.618, 0.94, 0.946), loop: speaking },
      { name: "kept: a soft golden ring about the coins brought back", svg: care(some[0], n(some[1] - 0.8), 3.8, 2.4, SOFT_GOLD), keys: showAt(0.664, 0.676), loop: soft },
      spark("given: a spark rising from the one in need", need[0], n(need[1] - 3), 0.704, 0.746),
      {
        name: "better for you: glints about the coins kept",
        svg: glints(
          [
            [n(some[0] - 3.6), n(some[1] - 4.4)],
            [n(some[0] + 3.2), n(some[1] - 5)]
          ],
          0.7
        ),
        keys: showAt(0.808, 0.82),
        loop: twinkle()
      },
      { name: "better for you: a soft golden ring about Ka'b's place", svg: care(kaab[0], n(kaab[1] + 0.4), 3.8, 2.2, SOFT_GOLD), keys: showAt(0.83, 0.842), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Ka'b ibn Malik said: as a proof of my",
      "True repentance, I shall give up all my",
      "Property for the sake of Allah.",
      "He said: keep some of your wealth,",
      "For that is better for you."
    ])
  };
}

// Two groups of advisors. Abu Sa'id al-Khudri said that the Prophet ﷺ said: no caliph is made caliph but that he has
// two close circles: a circle that bids him good and urges him to it, and a circle that bids him evil and urges him to
// it; and the protected one is whom Allah protects (Sahih al-Bukhari 6611; the English page: no Caliph is appointed
// but has two groups of advisors; and the protected is the one whom Allah protects). No one is drawn: a large home, the
// caliph's place before it, Abu Sa'id's place far off, and two groups of places, one on each side. Abu Sa'id's voice
// tells of it. The caliph's place shows, and then the two groups. The left group's voice speaks, soft gold, and a soft
// golden way goes from it to the caliph's place, with glints: to do good. The right group's voice speaks, quick and
// grey, and a grey dashed way goes from it to the caliph's place: to do bad. Then the grey way fades, and a soft golden
// ring, glints and a small light come about the caliph's place: the protected. Nothing is drawn for Allah.
function twoGroupsOfAdvisors(): SignArt {
  const said: [number, number] = [14, 112];
  const caliph: [number, number] = [80, 105];
  const goodOnes: [number, number][] = [
    [52, 106],
    [45, 110.4],
    [57.4, 112.4]
  ];
  const badOnes: [number, number][] = [
    [108, 106],
    [102.6, 112.4],
    [115, 110.4]
  ];
  return {
    kind: "two-groups-of-advisors",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(136, 16) },
      { name: "a cloud", svg: cloud(40, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a large home, the caliph's seat", svg: home(80, 98, 28, 18) },
      ...palms(
        [
          [26, 96, 13],
          [138, 97, 12]
        ],
        "the town"
      ),
      { name: "Abu Sa'id's place, far off", svg: someone(said[0], said[1], 1.5, SAID) },
      { name: "Abu Sa'id's voice: telling what he said", svg: arcs(n(said[0] + 3.2), n(said[1] - 2.8), SAID), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "the caliph's place: appointed, before the seat", svg: someone(caliph[0], caliph[1], 1.8, CALIPH), keys: showAt(0.146, 0.158) },
      { name: "the first group of advisors: three places on the left", svg: goodOnes.map(([x, y]) => someone(x, y, 1.4, FOLK)).join(""), keys: showAt(0.19, 0.202) },
      { name: "the other group of advisors: three places on the right", svg: badOnes.map(([x, y]) => someone(x, y, 1.4, FOLK)).join(""), keys: showAt(0.194, 0.206) },
      { name: "the first group's voice: advising good", svg: arcs(n(goodOnes[0][0] + 3), n(goodOnes[0][1] - 2.8), SOFT_GOLD), keys: showFor(0.268, 0.274, 0.45, 0.456), loop: speaking },
      {
        name: "to do good: a soft golden way from the first group to the caliph's place",
        svg: way(`M${n(goodOnes[0][0] + 2.4)} 108.6 Q66 111.4 ${n(caliph[0] - 3)} ${n(caliph[1] + 1.2)}`, SOFT_GOLD, 1),
        keys: showAt(0.39, 0.402)
      },
      {
        name: "urging it: glints along the soft golden way",
        svg: glints(
          [
            [62, 106.6],
            [70, 107.4]
          ],
          0.7
        ),
        keys: showAt(0.41, 0.422),
        loop: twinkle()
      },
      {
        name: "the other group's voice: advising bad, quick and grey",
        svg: arcsLeft(n(badOnes[0][0] - 3), n(badOnes[0][1] - 2.8), GREY),
        keys: showFor(0.512, 0.518, 0.69, 0.696),
        loop: { move: "twinkle", ms: 420, low: 0.35 }
      },
      {
        name: "to do bad: a grey dashed way from the other group to the caliph's place",
        svg: way(`M${n(badOnes[0][0] - 2.4)} 108.6 Q94 111.4 ${n(caliph[0] + 3)} ${n(caliph[1] + 1.2)}`, GREY, 1),
        keys: showFor(0.634, 0.646, 0.76, 0.772)
      },
      { name: "the protected: a soft golden ring about the caliph's place", svg: care(caliph[0], n(caliph[1] + 0.6), 5.4, 3, SOFT_GOLD), keys: showAt(0.756, 0.768), loop: soft },
      {
        name: "protected: glints about the caliph's place",
        svg: glints(
          [
            [n(caliph[0] - 5.4), n(caliph[1] - 4.8)],
            [n(caliph[0] + 5.6), n(caliph[1] - 5.4)]
          ],
          0.8
        ),
        keys: showAt(0.878, 0.89),
        loop: twinkle()
      },
      { name: "kept safe: a small light in the caliph's place", svg: lightIn(caliph[0], caliph[1], 3), keys: showAt(0.9, 0.912), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Abu Sa'id al-Khudri: he said:",
      "No caliph is appointed but has two",
      "Groups of advisors: one group advises him",
      "To do good and urges him to adopt it,",
      "And the other group advises him to do",
      "Bad and urges him to adopt it;",
      "And the protected is the one",
      "Whom Allah protects."
    ])
  };
}

// Till you see me. Abdullah ibn Abi Qatada said that his father said: the Messenger of Allah ﷺ said: when the prayer is
// called for, do not stand until you see me, and keep to calm (Sahih al-Bukhari 638; the English page: if the Iqama is
// pronounced, then do not stand for the prayer till you see me, in front of you, and do it calmly). No one is drawn:
// the masjid of Madinah, his home beside it, and rows of places sitting before the masjid, Abu Qatada's among them. Abu
// Qatada's voice tells of it. The voice of the one calling the iqamah speaks. One place in the rows rises too soon, and
// a grey dashed ring comes about it; the ring fades and it sits back. His place comes out of his home, a golden ring,
// to the front. Then all the rows rise, slowly, together, and a soft golden ring comes about them: calmly.
function tillYouSeeMe(): SignArt {
  const seats: [number, number][] = [
    ...[48, 56, 64, 72, 80, 88].map((x): [number, number] => [x, 106]),
    ...[48, 56, 64, 72, 80, 88].map((x): [number, number] => [x, 112])
  ];
  const qatada: [number, number] = [88, 112];
  const soon: [number, number] = [56, 106];
  const caller: [number, number] = [88, 106];
  const same = (a: [number, number], b: [number, number]) => a[0] === b[0] && a[1] === b[1];
  const rows = seats.filter((p) => !same(p, qatada) && !same(p, soon) && !same(p, caller));
  const door: [number, number] = [20.2, 102.4];
  const front: [number, number] = [36, 105];
  const rise = () =>
    track({
      xy: [
        [0.81, 0, 0],
        [0.93, 0, -2.6]
      ]
    });
  return {
    kind: "till-you-see-me",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(140, 16) },
      { name: "a cloud", svg: cloud(116, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(52, 92, 1) },
      { name: "his home, beside the masjid", svg: home(22, 100, 20, 14) },
      ...palms(
        [
          [118, 95, 13],
          [136, 97, 11]
        ],
        "Madinah"
      ),
      { name: "the rows of places, sitting", svg: rows.map(([x, y]) => someone(x, y, 1.4, FOLK)).join(""), keys: rise() },
      { name: "Abu Qatada's place, in the rows", svg: someone(qatada[0], qatada[1], 1.4, QATADA), keys: rise() },
      { name: "the place calling the iqamah, at the end of the first row", svg: someone(caller[0], caller[1], 1.4, CALLER), keys: rise() },
      {
        name: "one place in the rows: rising too soon, sitting back, then rising with the rest",
        svg: someone(soon[0], soon[1], 1.4, FOLK),
        keys: track({
          xy: [
            [0.416, 0, 0],
            [0.436, 0, -2.6],
            [0.514, 0, -2.6],
            [0.544, 0, 0],
            [0.81, 0, 0],
            [0.93, 0, -2.6]
          ]
        })
      },
      { name: "Abu Qatada's voice: telling of it", svg: arcs(n(qatada[0] + 2.8), n(qatada[1] - 2.8), QATADA), keys: showFor(0.024, 0.03, 0.15, 0.156), loop: speaking },
      { name: "the iqamah: the caller's voice", svg: arcs(n(caller[0] + 2.8), n(caller[1] - 2.8), CALLER), keys: showFor(0.22, 0.226, 0.346, 0.352), loop: speaking },
      { name: "not yet: a grey dashed ring about the place that rose too soon", svg: greyRing(soon[0], n(soon[1] - 2.6), 3.2, 2), keys: showFor(0.44, 0.452, 0.5, 0.512) },
      {
        name: "his place, a golden ring: coming out of his home to the front",
        svg: ring(door[0], door[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.612, 0],
            [0.624, 1]
          ],
          xy: [
            [0.626, 0, 0],
            [0.68, n(front[0] - door[0]), n(front[1] - door[1])]
          ]
        })
      },
      { name: "calmly: a soft golden ring about the rows, standing", svg: care(68, 106.4, 25, 7, SOFT_GOLD), keys: showAt(0.934, 0.946), loop: soft }
    ],
    words: linesOn(FIVE, ["Abdullah ibn Abi Qatada: my father said:", "He said: if the iqamah is pronounced,", "Then do not stand for the prayer", "Till you see me,", "And do it calmly."])
  };
}

// Help and recommend him. Abu Burda ibn Abi Musa said that his father said: whenever one asking came to the Messenger
// of Allah ﷺ, or he was asked for something needed, he would say: intercede, and you will be rewarded; and Allah
// decrees on the tongue of His Prophet ﷺ what He wills (Sahih al-Bukhari 1432; the English page: whenever a beggar came
// to Allah's Messenger, or he was asked for something, he used to say to his companions: help and recommend him and you
// will receive the reward for it). The last words are left out. No one is drawn: the masjid of Madinah, his place
// before it, a golden ring, with places sitting about him. A place in need comes from far off along a pale dashed way,
// and its voice asks, with the faint dashed outline of a small bundle: something it needs. His voice speaks to those
// about him; their voices speak to him for the one in need, sparks rise from their places, and a soft golden ring comes
// about them: the reward.
function helpAndRecommend(): SignArt {
  const his: [number, number] = [100, 104];
  const about: [number, number][] = [
    [84, 106],
    [90, 112],
    [110, 112],
    [116, 106]
  ];
  const start: [number, number] = [12, 112];
  const near: [number, number] = [72, 108.6];
  return {
    kind: "help-and-recommend",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(30, 16) },
      { name: "a cloud", svg: cloud(70, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(96, 92, 1) },
      ...palms(
        [
          [26, 95, 13],
          [42, 97, 11]
        ],
        "Madinah"
      ),
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "places sitting about him", svg: about.map(([x, y]) => someone(x, y, 1.4, FOLK)).join("") },
      { name: "the way in: a pale dashed way from far off", svg: way(`M${n(start[0] + 2.4)} ${n(start[1] + 0.6)} Q44 116.4 ${n(near[0] - 2.6)} ${n(near[1] + 1)}`, "#FFF0C4", 0.9), keys: showAt(0.22, 0.232) },
      {
        name: "the place in need: coming from far off to him",
        svg: someone(start[0], start[1], 1.5, NEED),
        keys: track({
          opacity: [
            [0.22, 0],
            [0.232, 1]
          ],
          xy: [
            [0.24, 0, 0],
            [0.32, near[0] - start[0], near[1] - start[1]]
          ]
        })
      },
      { name: "its voice: asking", svg: arcs(n(near[0] + 3), n(near[1] - 2.8), NEED), keys: showFor(0.416, 0.422, 0.54, 0.546), loop: speaking },
      { name: "something it needs: the faint dashed outline of a small bundle", svg: bundle(66.6, 106), keys: showAt(0.44, 0.452) },
      {
        name: "his voice: help and recommend",
        svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), GOLD) + arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), GOLD),
        keys: showFor(0.612, 0.618, 0.69, 0.696),
        loop: speaking
      },
      {
        name: "their voices: speaking up for the one in need",
        svg:
          arcs(n(about[0][0] + 2.6), n(about[0][1] - 2.8), SOFT_GOLD) +
          arcs(n(about[1][0] + 2.6), n(about[1][1] - 2.8), SOFT_GOLD) +
          arcsLeft(n(about[2][0] - 2.6), n(about[2][1] - 2.8), SOFT_GOLD) +
          arcsLeft(n(about[3][0] - 2.6), n(about[3][1] - 2.8), SOFT_GOLD),
        keys: showFor(0.7, 0.706, 0.9, 0.906),
        loop: speaking
      },
      spark("the reward: a spark rising from a place about him 1", about[0][0], n(about[0][1] - 3), 0.81, 0.856),
      spark("the reward: a spark rising from a place about him 2", about[1][0], n(about[1][1] - 3), 0.83, 0.876),
      spark("the reward: a spark rising from a place about him 3", about[2][0], n(about[2][1] - 3), 0.85, 0.896),
      spark("the reward: a spark rising from a place about him 4", about[3][0], n(about[3][1] - 3), 0.87, 0.916),
      { name: "the reward: a soft golden ring about the places sitting about him", svg: care(his[0], n(his[1] + 3.6), 19.6, 6.4, SOFT_GOLD), keys: showAt(0.91, 0.922), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Abu Burda ibn Abu Musa: my father said:",
      "Whenever a beggar came to him,",
      "Or he was asked for something,",
      "He used to say: help and recommend him,",
      "And you will receive the reward for it."
    ])
  };
}

export const FAIR_ART = {
  "brother-of-a-believer": brotherOfABeliever,
  "short-and-eloquent": shortAndEloquent,
  "keep-some-of-your-wealth": keepSomeOfYourWealth,
  "two-groups-of-advisors": twoGroupsOfAdvisors,
  "till-you-see-me": tillYouSeeMe,
  "help-and-recommend": helpAndRecommend
} as const;
