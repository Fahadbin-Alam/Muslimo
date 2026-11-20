import { cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { camel, care, palms, track } from "./daysArt";
import { greyRing, soft, speaking } from "./fastArt";
import { showAt, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, twinkle } from "./shareArt";
import { at3 } from "./storyArt";
import { coins } from "./tradeArt";
import { farHills, FIVE } from "./wideArt";

/**
 * Lead: a share of the prayer given to the house; more time given to one in difficulty, an act of charity for each
 * day; charity to a relative, which is two things; leading another to good; the morning prayer, under protection;
 * and the oath asked of the one a claim is made against. Only the land, the sky, buildings, things, plants and a camel
 * with no one on it are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a
 * mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes,
 * and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn, and nothing comes down
 * from the sky: what is good is a light, glints and a soft golden ring. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of eight lines. */
const EIGHT = [
  [0.012, 0.132],
  [0.136, 0.256],
  [0.26, 0.38],
  [0.384, 0.504],
  [0.508, 0.628],
  [0.632, 0.752],
  [0.756, 0.876],
  [0.88, 1]
] as const;

/** Abu Sa'id al-Khudri's place and voice: a slate blue (as in greenArt). */
const ABU_SAID = "#5E6E9A";
/** The places and voices of the folk: a soft brown. */
const FOLK = "#9A8A70";
/** Buraidah al-Aslami's place and voice: a deep olive. */
const BURAIDAH = "#6E6A3E";
/** The place and voice of the one who gives respite: a sage green. */
const GIVER = "#5E7A5E";
/** The place of the one in difficulty: a soft grey brown. */
const HARD_UP = "#8E8476";
/** Salman ibn Amir's place and voice: a deep teal. */
const SALMAN = "#4E7A7A";
/** The one who gives and the relative: one family, one soft violet. */
const KIN = "#7A6E9A";
/** The place of a poor one: a soft grey olive. */
const POOR = "#8E8A6E";
/** The ties of kinship: a soft rose. */
const TIES = "#D08C9A";
/** Anas's place and voice: a steel blue (as in carefulArt). */
const ANAS = "#4E6E8E";
/** The place and voice of the one who asked for a mount: a warm brown. */
const ASKER = "#9A6A4E";
/** The place and voice of the one who gave him a mount: a deep green. */
const GAVE = "#4E7E5E";
/** Samurah ibn Jundub's place and voice: a soft rose brown, seen at night too. */
const SAMURAH = "#B88080";
/** Ibn Abbas's place and voice: a deep blue (as in pureArt). */
const IBN_ABBAS = "#3E5E8A";
/** The place and voice of the one the claim is made against: a slate teal. */
const CLAIMED = "#5E7A8A";
/** The places and voices of those who claim: grey. */
const CLAIMING = "#8E8E8E";

/** How a voice that speaks from `on` until `off`, for each pair, shows and goes. */
const spoken = (spans: [number, number][]) =>
  spans.flatMap(([on, off]): [number, number][] => [
    [on, 0],
    [at3(on + 0.006), 1],
    [off, 1],
    [at3(off + 0.006), 0]
  ]);

/** A voice that speaks from `on` until `off`, for each pair. */
const voice = (spans: [number, number][]) => track({ opacity: spoken(spans) });

/** Shown until `from`, and gone by `gone`. */
const hide = (from: number, gone: number) =>
  track({
    opacity: [
      [from, 1],
      [gone, 0]
    ]
  });

/** The sky, a cloud, the far hills and the land, with the sun at `sunAt` unless it moves (as in carefulArt). */
const aDay = (sunAt: [number, number] | null, cloudAt: [number, number]): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
  ...(sunAt ? [{ name: "the sun", svg: sun(sunAt[0], sunAt[1]) }] : []),
  { name: "a cloud", svg: cloud(cloudAt[0], cloudAt[1], 0.42, "#FFFFFF", 0.85), loop: { move: "slide" as const, ms: 9000 } },
  { name: "hills far off", svg: farHills() },
  { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [92, 118], [150, 117]]) }
];

/** One gold coin lying on the land, with a soft light about it, its middle at (x, y). */
const aCoin = (x: number, y: number) => `${glow(x, n(y - 0.4), 2.8, "#FFE7A0", 0.3)}${coins(x, y, 1)}`;

/** A small prayer mat, red with a gold edge, lying before a door, its middle at (x, y). */
const smallMat = (x: number, y: number) =>
  `<path d="M${n(x - 4.4)} ${n(y + 1.2)} L${n(x + 3.6)} ${n(y + 1.2)} L${n(x + 4.6)} ${n(y - 1.2)} L${n(x - 3.4)} ${n(y - 1.2)} Z" fill="#B5473A"/>` +
  `<path d="M${n(x - 3.6)} ${n(y + 0.7)} L${n(x + 3)} ${n(y + 0.7)} L${n(x + 3.8)} ${n(y - 0.7)} L${n(x - 2.8)} ${n(y - 0.7)} Z" stroke="#E8C45A" stroke-width="0.35" fill="none"/>`;

/** An empty sack, lying flat, its foot's middle at (x, y). */
const emptySack = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${y} L${n(x + 2.6)} ${y} L${n(x + 1.8)} ${n(y - 1.3)} L${n(x - 1.8)} ${n(y - 1.3)} Z" fill="#B3AA9A"/>` +
  `<path d="M${n(x + 1.8)} ${n(y - 1.3)} L${n(x + 3)} ${n(y - 2)}" stroke="#B3AA9A" stroke-width="0.6" stroke-linecap="round"/>`;

// A share for the house. Abu Sa'id al-Khudri said: the Prophet ﷺ said: when anyone of you has finished his prayer,
// let him give his house a share of that, for Allah will put something good in his house because of that prayer
// (Sunan Ibn Majah 1376). No one is drawn: in Madinah, the masjid on the left and his place before it, a golden ring,
// with Abu Sa'id's place by it; the place of one of the folk by the masjid, and a home on the right. Abu Sa'id's voice
// tells of it, and his voice, soft and golden, speaks. Its prayer finished, the place of one of the folk goes from the
// masjid to the home; a prayer mat shows at the door of the home, and a soft light about the place on it: a share of
// that prayer. Then a soft golden light comes about the home, a light in its window, a soft golden ring about it and
// glints over it: something good in the house; and the light about the place on the mat grows: because of that
// prayer.
function aShareForTheHouse(): SignArt {
  const his: [number, number] = [26, 100.4];
  const abuSaid: [number, number] = [8, 106.4];
  const from: [number, number] = [42, 102.4];
  const atHome: [number, number] = [128.2, 101.4];
  const go: [number, number] = [n(atHome[0] - from[0]), n(atHome[1] - from[1])];
  return {
    kind: "a-share-for-the-house",
    ms: 8000,
    parts: [
      ...aDay([138, 18], [70, 24]),
      ...palms([
        [62, 95, 11],
        [96, 96, 12]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.8) },
      { name: "something good in the house: a soft golden light about the home", svg: glow(130, 91, 15, "#FFE7A0", 0.2), keys: showAt(0.62, 0.66), loop: soft },
      { name: "a home on the right", svg: home(130, 100, 26, 16) },
      {
        name: "and a light in the window of the home",
        svg: `${glow(133.3, 87.7, 3.4, "#FFE7A0", 0.34)}<rect x="132" y="86.4" width="2.6" height="2.6" fill="#FFE7A0"/>`,
        keys: showAt(0.64, 0.66),
        loop: soft
      },
      { name: "a prayer mat at the door of the home", svg: smallMat(atHome[0], n(atHome[1] + 1.4)), keys: showAt(0.42, 0.44) },
      {
        name: "a share of that prayer: a soft light about the place on the mat, growing",
        svg: glow(atHome[0], atHome[1], 5, "#FFE7A0", 0.3),
        keys: track({
          opacity: [
            [0.44, 0],
            [0.46, 0.6],
            [0.82, 0.6],
            [0.85, 1]
          ]
        }),
        loop: soft
      },
      { name: "and a soft golden ring about the home", svg: care(130, 100.6, 16, 3.4, SOFT_GOLD), keys: showAt(0.64, 0.66), loop: soft },
      {
        name: "and glints over it",
        svg: glints(
          [
            [122, 81.4],
            [130, 78.6],
            [138, 81.4]
          ],
          1
        ),
        keys: showAt(0.7, 0.71),
        loop: twinkle()
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.07, 0.96]]), loop: speaking },
      { name: "Abu Sa'id's place", svg: someone(abuSaid[0], abuSaid[1], 1.8, ABU_SAID) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcs(n(abuSaid[0] + 2.6), n(abuSaid[1] - 3.4), ABU_SAID), keys: voice([[0.02, 0.06]]), loop: speaking },
      {
        name: "the place of one of the folk: its prayer finished, going from the masjid to the home",
        svg: someone(from[0], from[1], 1.8, FOLK),
        keys: track({
          xy: [
            [0.23, 0, 0],
            [0.36, go[0], go[1]]
          ]
        })
      }
    ],
    words: linesOn(FIVE, ["Abu Sa'id: he said: when anyone of you", "Has finished his prayer, let him give his", "House a share of that, for Allah will", "Put something good in his house because", "Of that prayer."])
  };
}

// An act of charity for each day. Buraidah al-Aslami said: the Prophet ﷺ said: whoever gives respite to one in
// difficulty will have an act of charity for each day; and whoever gives him respite after payment becomes due will
// have an act of charity equal to the amount of the loan for each day (Sunan Ibn Majah 2418). The words leave out the
// second saying, whose "(the amount of the loan)" is the translator's, and the page's ", he" and "(the reward of)", so
// they read: whoever gives respite to one in difficulty will have an act of charity for each day. No one is drawn: his
// place, a golden ring, with Buraidah's place by it; the place of one who gives respite by its home, with its sack. The
// place of one in difficulty comes, with its sack empty. Buraidah's voice tells of it, and his voice, soft and golden,
// speaks. The voice of the one who gives respite: more time; and the one in difficulty goes on its way. Then the days
// go by: the sun goes over the sky, and comes up again, three times; and for each day a gold coin with a soft light
// shows by the place of the one who gave respite: an act of charity for each day.
function charityForEachDay(): SignArt {
  const his: [number, number] = [20, 100.4];
  const buraidah: [number, number] = [8, 106.4];
  const giver: [number, number] = [62, 102.4];
  const hardUp: [number, number] = [86, 103.4];
  const away = 66;
  const top: [number, number] = [80, 17];
  const set: [number, number] = [50, 12];
  const days = [0.69, 0.79, 0.89];
  return {
    kind: "charity-for-each-day",
    ms: 9000,
    parts: [
      ...aDay(null, [112, 26]),
      {
        name: "the sun, going over the sky: the days going by",
        svg: sun(top[0], top[1]),
        keys: track({
          xy: [
            [0.7, 0, 0],
            [0.74, set[0], set[1]],
            [0.742, -set[0], set[1]],
            [0.79, 0, 0],
            [0.8, 0, 0],
            [0.84, set[0], set[1]],
            [0.842, -set[0], set[1]],
            [0.89, 0, 0]
          ],
          opacity: [
            [0.73, 1],
            [0.74, 0],
            [0.742, 0],
            [0.752, 1],
            [0.83, 1],
            [0.84, 0],
            [0.842, 0],
            [0.852, 1]
          ]
        })
      },
      ...palms([
        [112, 96, 12],
        [150, 97, 10]
      ]),
      { name: "a home", svg: home(44, 100, 20, 13) },
      { name: "the sack of the one who gives respite", svg: sack(n(giver[0] + 4.2), 105.6, 0.55) },
      ...days.map(
        (day, i): SignPart => ({
          name: `an act of charity for a day: a gold coin with a soft light by the place of the one who gave respite ${i + 1}`,
          svg: aCoin(n(giver[0] - 6 + i * 4.8), 107.4),
          keys: showAt(day, at3(day + 0.01)),
          loop: soft
        })
      ),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.07, 0.96]]), loop: speaking },
      { name: "Buraidah's place", svg: someone(buraidah[0], buraidah[1], 1.8, BURAIDAH) },
      { name: "Buraidah's voice: telling of it", svg: arcs(n(buraidah[0] + 2.6), n(buraidah[1] - 3.4), BURAIDAH), keys: voice([[0.02, 0.06]]), loop: speaking },
      { name: "the place of the one who gives respite", svg: someone(giver[0], giver[1], 1.8, GIVER) },
      { name: "its voice, soft: more time", svg: arcs(n(giver[0] + 2.6), n(giver[1] - 3.4), GIVER), keys: voice([[0.4, 0.5]]), loop: speaking },
      {
        name: "the place of one in difficulty, with its sack empty: coming, and then going on its way",
        svg: someone(hardUp[0], hardUp[1], 1.8, HARD_UP) + emptySack(n(hardUp[0] + 4.4), n(hardUp[1] + 3.4)),
        keys: track({
          xy: [
            [0.1, away, 0],
            [0.2, 0, 0],
            [0.52, 0, 0],
            [0.62, away, 0]
          ],
          opacity: [
            [0.1, 0],
            [0.12, 1],
            [0.6, 1],
            [0.62, 0]
          ]
        })
      }
    ],
    words: linesOn(THREE, ["Buraidah: he said: whoever gives", "Respite to one in difficulty will have", "An act of charity for each day."])
  };
}

// Two things for a relative. Salman ibn Amir said: the Prophet ﷺ said: giving charity to a poor person is charity, and
// to a relative is two things, charity and upholding the ties of kinship (Sunan an-Nasa'i 2582). The words leave out
// the page's "(giving)". No one is drawn: his place, a golden ring, with Salman's place by it; the place of one who
// gives, with gold coins by it; on the left the place of a poor one, and on the right, by its home, the place of a
// relative, of one colour with the one who gives: one family. Salman's voice tells of it, and his voice, soft and
// golden, speaks. A coin goes from the one who gives to the poor one, and a soft golden ring comes about the poor one's
// place: charity. Then a coin goes to the relative, and a soft golden ring comes about the relative's place: charity;
// and a second ring, soft rose, about it, and a soft rose thread from the one who gives to the relative: upholding the
// ties of kinship. Glints show over the relative's place: two things.
function twoForARelative(): SignArt {
  const his: [number, number] = [18, 100.4];
  const salman: [number, number] = [6, 106.4];
  const giver: [number, number] = [74, 102.4];
  const poor: [number, number] = [46, 104.4];
  const kin: [number, number] = [110, 102.8];
  const purse: [number, number] = [n(giver[0] + 4.4), n(giver[1] + 3.2)];
  const toPoor: [number, number] = [n(poor[0] + 3.8 - purse[0]), n(poor[1] + 3 - purse[1])];
  const toKin: [number, number] = [n(kin[0] - 3.8 - purse[0]), n(kin[1] + 3 - purse[1])];
  const coinGoing = (name: string, to: [number, number], from: number, reach: number): SignPart => ({
    name,
    svg: coins(purse[0], n(purse[1] - 3.3), 1),
    keys: track({
      opacity: [
        [at3(from - 0.01), 0],
        [from, 1]
      ],
      xy: [
        [from, 0, 0],
        [reach, to[0], n(to[1] + 3.3)]
      ]
    })
  });
  return {
    kind: "two-for-a-relative",
    ms: 7000,
    parts: [
      ...aDay([140, 18], [86, 24]),
      ...palms([
        [60, 95, 11],
        [92, 96, 12]
      ]),
      { name: "the home of the relative", svg: home(130, 100, 22, 14) },
      { name: "the gold coins of the one who gives", svg: coins(purse[0], purse[1], 3) },
      coinGoing("charity: a coin going from the one who gives to the poor one", toPoor, 0.28, 0.33),
      coinGoing("and to the relative: a coin going from the one who gives to the relative", toKin, 0.53, 0.58),
      { name: "charity: a soft golden ring about the poor one's place", svg: care(poor[0], n(poor[1] + 0.4), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.34, 0.36), loop: soft },
      { name: "charity: a soft golden ring about the relative's place", svg: care(kin[0], n(kin[1] + 0.4), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.59, 0.61), loop: soft },
      { name: "and upholding the ties of kinship: a second ring, soft rose, about the relative's place", svg: care(kin[0], n(kin[1] + 0.4), 6.6, 3.8, TIES), keys: showAt(0.77, 0.79), loop: soft },
      {
        name: "and a soft rose thread from the one who gives to the relative: the ties of kinship, kept",
        svg: `<path d="M${n(giver[0] + 2.4)} ${n(giver[1] - 1.6)} Q${n((giver[0] + kin[0]) / 2)} ${n(giver[1] - 9)} ${n(kin[0] - 2.4)} ${n(kin[1] - 1.6)}" stroke="${TIES}" stroke-width="0.7" stroke-dasharray="1.4 1" fill="none" stroke-linecap="round"/>`,
        keys: showAt(0.79, 0.82)
      },
      {
        name: "and glints over the relative's place: two things",
        svg: glints(
          [
            [n(kin[0] - 3), 95.6],
            [n(kin[0] + 3), 95.6]
          ],
          1
        ),
        keys: showAt(0.86, 0.87),
        loop: twinkle()
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.07, 0.96]]), loop: speaking },
      { name: "Salman's place", svg: someone(salman[0], salman[1], 1.8, SALMAN) },
      { name: "Salman's voice: telling of it", svg: arcs(n(salman[0] + 2.6), n(salman[1] - 3.4), SALMAN), keys: voice([[0.02, 0.06]]), loop: speaking },
      { name: "the place of one who gives", svg: someone(giver[0], giver[1], 1.8, KIN) },
      { name: "the place of a poor one", svg: someone(poor[0], poor[1], 1.8, POOR) },
      { name: "the place of a relative, of one family with the one who gives", svg: someone(kin[0], kin[1], 1.8, KIN) }
    ],
    words: linesOn(FOUR, ["Salman ibn Amir: he said: giving charity", "To a poor person is charity, and to a", "Relative is two things, charity and", "Upholding the ties of kinship."])
  };
}

// Whoever leads to good. Anas ibn Malik said: a man came to the Prophet ﷺ to get a mount, but he ﷺ did not have
// anything to mount him on with him. So he was led to another person to give him a mount. He came to the Prophet ﷺ to
// inform him about that, and he said: whoever leads to good, he is like the one who does it (Jami at-Tirmidhi 2670).
// The words say "the man" for the page's "him" and "He" where they are the man, so that they are not read as the
// Prophet ﷺ, and leave out the second "he" of what he said; "lead" is spelled "led". No one is drawn, and no one is on
// the camel: his place, a golden ring, with Anas's place by it; the place of one who gives, by its home, on the right.
// Anas's voice tells of it. The place of the man comes to his place and asks; his voice: he has nothing to mount him
// on. Then his voice again, and a soft golden way shows from the man's place to the one who gives: so he was led to
// him. The man's place goes along it, the voice of the one who gives answers, and a camel comes, with no one on it:
// a mount. The man's place comes back to his place with the camel beside it, and its voice tells him. Then his voice:
// whoever leads to good: a soft golden ring comes about his place; is like the one who does it: a soft golden ring
// comes about the place of the one who gave; and glints over both.
function whoeverLeadsToGood(): SignArt {
  const his: [number, number] = [48, 100.4];
  const anas: [number, number] = [12, 106.4];
  const asker: [number, number] = [60, 102.6];
  const gave: [number, number] = [118, 102.4];
  const comeFrom = -40;
  const there: [number, number] = [48, 0.4];
  const back: [number, number] = [6, 0.4];
  const camelAt: [number, number] = [131, 106.2];
  const camelBack = -48;
  return {
    kind: "whoever-leads-to-good",
    ms: 11000,
    parts: [
      ...aDay([140, 18], [84, 26]),
      ...palms(
        [
          [28, 96, 12],
          [88, 95, 11]
        ],
        "the town"
      ),
      { name: "the home of the one who gives", svg: home(134, 100, 22, 14) },
      {
        name: "the way he showed: a soft golden dashed way to the place of the one who gives",
        svg: `<path d="M${n(asker[0] + 3.4)} ${n(asker[1] + 2.2)} C${n(asker[0] + 16)} ${n(asker[1] + 4.2)} ${n(gave[0] - 22)} ${n(gave[1] + 4.2)} ${n(gave[0] - 7.4)} ${n(gave[1] + 2.6)}" stroke="${SOFT_GOLD}" stroke-width="0.8" stroke-dasharray="1.6 1.4" fill="none" stroke-linecap="round"/>`,
        keys: showAt(0.28, 0.3)
      },
      {
        name: "a mount: a camel, with no one on it, coming to the one who gives, and then going with the place of the one who asked",
        svg: camel(camelAt[0], camelAt[1], 0.15, true),
        keys: track({
          opacity: [
            [0.4, 0],
            [0.41, 1]
          ],
          xy: [
            [0.4, 18, 0],
            [0.46, 0, 0],
            [0.515, 0, 0],
            [0.59, camelBack, 0]
          ]
        }),
        loop: { move: "bob", ms: 2600, y: -0.3 }
      },
      { name: "the one who leads to good: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.4), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.77, 0.79), loop: soft },
      { name: "is like the one who does it: a soft golden ring about the place of the one who gives", svg: care(gave[0], n(gave[1] + 0.4), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.89, 0.91), loop: soft },
      {
        name: "and glints over both",
        svg: glints(
          [
            [his[0], 94.6],
            [gave[0], 96.6]
          ],
          1
        ),
        keys: showAt(0.93, 0.94),
        loop: twinkle()
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      {
        name: "his voice, soft and golden",
        svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD),
        keys: voice([
          [0.14, 0.22],
          [0.27, 0.33],
          [0.71, 0.96]
        ]),
        loop: speaking
      },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.8, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcs(n(anas[0] + 2.6), n(anas[1] - 3.4), ANAS), keys: voice([[0.012, 0.05]]), loop: speaking },
      { name: "the place of the one who gives", svg: someone(gave[0], gave[1], 1.8, GAVE) },
      { name: "its voice: answering, and giving a mount", svg: arcsLeft(n(gave[0] - 2.6), n(gave[1] - 3.4), GAVE), keys: voice([[0.39, 0.45]]), loop: speaking },
      {
        name: "the place of the one who asked: coming to his place, going on the way, and coming back",
        svg: someone(asker[0], asker[1], 1.8, ASKER),
        keys: track({
          xy: [
            [0.02, comeFrom, 0],
            [0.064, 0, 0],
            [0.3, 0, 0],
            [0.345, there[0], there[1]],
            [0.515, there[0], there[1]],
            [0.59, back[0], back[1]]
          ]
        })
      },
      { name: "its voice: asking for a mount", svg: arcsLeft(n(asker[0] - 2.6), n(asker[1] - 3.4), ASKER), keys: voice([[0.066, 0.094]]), loop: speaking },
      {
        name: "its voice again: telling him of it",
        svg: arcsLeft(n(asker[0] + back[0] - 2.6), n(asker[1] + back[1] - 3.4), ASKER),
        keys: voice([[0.64, 0.7]]),
        loop: speaking
      }
    ],
    words: linesOn(EIGHT, [
      "Anas: a man came to the Prophet to get a",
      "Mount, but he did not have anything to",
      "Mount the man on with him. So the man",
      "Was led to another person to give him a",
      "Mount. The man came to the Prophet to",
      "Inform him about that, and he said:",
      "Whoever leads to good is like the one",
      "Who does it."
    ])
  };
}

// Under the protection. Samurah ibn Jundub said: the Prophet ﷺ said: whoever offers the morning prayer, he is under
// the protection of Allah, the Mighty and Sublime (Sunan Ibn Majah 3946). The words leave out "he" before "is under".
// No one is drawn, and nothing is drawn for Allah: at night, in Madinah, the masjid, with a lamp's light at its door;
// his place, a golden ring, with Samurah's place by it. Samurah's voice tells of it, and his voice, soft and golden,
// speaks. The night lifts and the dawn comes, the stars fade, the lamp's light goes, and the places of the folk come
// to the masjid: the morning prayer. Then a soft golden ring comes about each of their places, one after another:
// under the protection; and glints over them.
function underTheProtection(): SignArt {
  const his: [number, number] = [22, 100.4];
  const samurah: [number, number] = [8, 106.4];
  const folk: [number, number][] = [
    [64, 104.2],
    [72, 105.8],
    [80, 104.2],
    [88, 105.8]
  ];
  const come = 64;
  const dawn = sky("#F2C6A0", "#F9E3C6", 62) + glow(124, 64, 34, "#FFE2AE", 0.08);
  return {
    kind: "under-the-protection",
    ms: 7000,
    parts: [
      { name: "the sky at dawn", svg: dawn },
      { name: "the night sky, giving way to the dawn", svg: nightSky(62), keys: hide(0.28, 0.42) },
      {
        name: "stars, fading",
        svg: stars([
          [14, 16],
          [34, 26],
          [58, 12],
          [86, 22],
          [104, 10],
          [128, 24],
          [148, 14]
        ]),
        keys: hide(0.28, 0.38),
        loop: twinkle(2400)
      },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 116], [100, 118], [150, 117]]) },
      ...palms([
        [118, 97, 12],
        [146, 98, 10]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(52, 96, 0.8) },
      { name: "a lamp's light at the door of the masjid, going at dawn", svg: `${glow(71.2, 93.2, 4.6, "#FFD27A", 0.34)}<circle cx="71.2" cy="93.6" r="0.8" fill="#FFE29A"/>`, keys: hide(0.3, 0.4), loop: twinkle(900) },
      { name: "the night over the land, lifting", svg: `<rect y="62" width="160" height="58" fill="#0F1C3A" opacity="0.5"/>`, keys: hide(0.28, 0.42) },
      ...folk.map(
        ([x, y], i): SignPart => ({
          name: `under the protection: a soft golden ring about each of their places ${i + 1}`,
          svg: care(x, n(y + 0.3), 3.6, 2.2, SOFT_GOLD),
          keys: showAt(at3(0.53 + i * 0.02), at3(0.545 + i * 0.02)),
          loop: soft
        })
      ),
      {
        name: "and glints over them",
        svg: glints(
          [
            [64, 98.6],
            [76, 97.8],
            [88, 98.6]
          ],
          1
        ),
        keys: showAt(0.78, 0.79),
        loop: twinkle()
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.07, 0.96]]), loop: speaking },
      { name: "Samurah's place", svg: someone(samurah[0], samurah[1], 1.8, SAMURAH) },
      { name: "Samurah's voice: telling of it", svg: arcs(n(samurah[0] + 2.6), n(samurah[1] - 3.4), SAMURAH), keys: voice([[0.02, 0.06]]), loop: speaking },
      ...folk.map(
        ([x, y], i): SignPart => ({
          name: `the place of one of the folk, coming at dawn to the masjid ${i + 1}`,
          svg: someone(x, y, 1.8, FOLK),
          keys: track({
            opacity: [
              [0.28, 0],
              [0.3, 1]
            ],
            xy: [
              [0.28, come, 0],
              [0.38, 0, 0]
            ]
          })
        })
      )
    ],
    words: linesOn(FOUR, ["Samurah ibn Jundub: he said: whoever", "Offers the morning prayer is under the", "Protection of Allah, the Mighty and", "Sublime."])
  };
}

// An oath, not a claim. Ibn Abbas said: the Messenger of Allah ﷺ said: if the people were given what they claimed,
// some would have claimed the lives and property of men. But the one the claim is made against is obliged to swear an
// oath (Sunan Ibn Majah 2321). No one is drawn, and nothing is drawn for the lives: his place, a golden ring, with Ibn
// Abbas's place by it; the place of one by its home on the right, with its property by it, sacks and gold coins; and
// the places of some who claim, on the left. Ibn Abbas's voice tells of it, and his voice, soft and golden, speaks. The
// places of those who claim come near the property, and their voices, grey, claim; a ring of grey dashes comes about
// them. Then a soft light comes about the place of the one the claim is made against, and its voice swears an oath: a
// soft golden ring comes about it and its property, kept; and those who claim go back, and their grey ring goes.
function anOathNotAClaim(): SignArt {
  const his: [number, number] = [20, 100.4];
  const ibnAbbas: [number, number] = [8, 106.4];
  const claimed: [number, number] = [116, 102.6];
  const claiming: [number, number][] = [
    [50, 102.4],
    [58, 105.6],
    [66, 102.4]
  ];
  const near = 18;
  return {
    kind: "an-oath-not-a-claim",
    ms: 8000,
    parts: [
      ...aDay([140, 18], [80, 24]),
      ...palms([
        [36, 95, 11],
        [90, 96, 12]
      ]),
      { name: "the home on the right", svg: home(134, 100, 22, 14) },
      { name: "its property: sacks and gold coins", svg: sack(103, 105.8, 0.55) + sack(108, 106.2, 0.5, "#B8955A") + coins(98.4, 106.6, 3) },
      { name: "the one the claim is made against: a soft light about its place", svg: glow(claimed[0], claimed[1], 5, "#FFF3CF", 0.32), keys: showAt(0.62, 0.64), loop: soft },
      { name: "its property, kept: a soft golden ring about its place and its property", svg: care(110, 105.2, 13, 3.8, SOFT_GOLD), keys: showAt(0.86, 0.88), loop: soft },
      {
        name: "what they claimed: a ring of grey dashes about those who claim, going when they go back",
        svg: greyRing(n(claiming[1][0] + near), 104.2, 15, 5),
        keys: track({
          opacity: [
            [0.43, 0],
            [0.45, 1],
            [0.88, 1],
            [0.9, 0]
          ]
        })
      },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.2, GOLD) },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] - 2.6), SOFT_GOLD), keys: voice([[0.07, 0.96]]), loop: speaking },
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.8, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 2.6), n(ibnAbbas[1] - 3.4), IBN_ABBAS), keys: voice([[0.02, 0.06]]), loop: speaking },
      { name: "the place of the one the claim is made against", svg: someone(claimed[0], claimed[1], 1.8, CLAIMED) },
      { name: "its voice: swearing an oath", svg: arcsLeft(n(claimed[0] - 2.6), n(claimed[1] - 3.4), CLAIMED), keys: voice([[0.81, 0.95]]), loop: speaking },
      ...claiming.map(
        ([x, y], i): SignPart => ({
          name: `the place of one who claims, coming near, and then going back ${i + 1}`,
          svg: someone(x, y, 1.8, CLAIMING),
          keys: track({
            xy: [
              [0.22, 0, 0],
              [0.28, near, 0],
              [0.88, near, 0],
              [0.94, 0, 0]
            ]
          })
        })
      ),
      {
        name: "their voices, grey: claiming",
        svg: arcs(n(claiming[0][0] + near + 2.6), n(claiming[0][1] - 3.4), CLAIMING) + arcs(n(claiming[2][0] + near + 2.6), n(claiming[2][1] - 3.4), CLAIMING),
        keys: voice([[0.29, 0.55]]),
        loop: speaking
      }
    ],
    words: linesOn(FIVE, [
      "Ibn Abbas: he said: if the people were",
      "Given what they claimed, some would have",
      "Claimed the lives and property of men.",
      "But the one the claim is made against is",
      "Obliged to swear an oath."
    ])
  };
}

export const LEAD_ART = {
  "a-share-for-the-house": aShareForTheHouse,
  "charity-for-each-day": charityForEachDay,
  "two-for-a-relative": twoForARelative,
  "whoever-leads-to-good": whoeverLeadsToGood,
  "under-the-protection": underTheProtection,
  "an-oath-not-a-claim": anOathNotAClaim
};
