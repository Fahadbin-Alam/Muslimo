import { animalAt, cloud, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, farOff, gardenIn, jug, palms, tent, track } from "./daysArt";
import { soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { EIGHT, FOLK, glints, ITS_VOICE, linesOn, mat, places, plainLand, SIX, twinkle } from "./shareArt";
import { farHills, insideTheMasjid } from "./wideArt";
import { GREY } from "./lovedArt";
import { at3 } from "./storyArt";
import { coins, jar, stall } from "./tradeArt";
import { puffs, smallLight } from "./hourArt";

/**
 * The bounty of a good deed: four words said three times that outweigh a whole morning of remembrance; a dinar that
 * came back as a sheep and a dinar, and a trade blessed even in dust; a good deed rewarded ten to seven hundred times
 * and an evil deed only as it is; looking at those below, not those above; hoping to be half of the people of Paradise;
 * and Abu Bakrah's eagerness to join the bowing. Only the land, the sky, buildings, things, plants and animals are
 * drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face:
 * where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs
 * in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a prayer or praise is a spark that
 * rises, what is good is a light, glints and a soft golden ring. Paradise is only far off, in a soft circle of light
 * with no sun in it. No name, word or number is written.
 */

/** The pans of a balance hung from (x, 50): three strings and a shallow bowl, its rim on y 61. */
const pan = (x: number) =>
  `<path d="M${x} 50 L${n(x - 5.4)} 61 M${x} 50 L${x} 61 M${x} 50 L${n(x + 5.4)} 61" stroke="#C9A65A" stroke-width="0.4"/>` +
  `<path d="M${x - 6} 61 Q${x} 65.6 ${x + 6} 61 Z" fill="#E8C878" stroke="#B8903E" stroke-width="0.5"/>`;

/** A sheep of the picture cards facing left, a little smaller than a camel, its feet at (x, y). */
const sheep = (x: number, y: number) => animalAt("sheep", n(x - 50 * 0.13), n(y - 73 * 0.13), 0.13, true);

/** A black ox standing on the plain, facing left, its body's middle at (x, y). */
const blackOx = (x: number, y: number) =>
  [-7, -3.4, 3.4, 7].map((dx) => `<rect x="${n(x + dx - 0.9)}" y="${n(y + 3.4)}" width="1.8" height="6.6" rx="0.6" fill="#1F1B18"/>`).join("") +
  `<ellipse cx="${x}" cy="${y}" rx="11" ry="6" fill="#2B2622"/>` +
  `<path d="M${n(x - 9.6)} ${n(y - 3.6)} Q${n(x - 16.4)} ${n(y - 4.6)} ${n(x - 17.6)} ${n(y + 0.8)} Q${n(x - 17.2)} ${n(y + 3.6)} ${n(x - 13.8)} ${n(y + 3.2)} Q${n(x - 11)} ${n(y + 2.4)} ${n(x - 8.6)} ${n(y + 1)} Z" fill="#2B2622"/>` +
  `<ellipse cx="${n(x - 16.6)}" cy="${n(y + 1.6)}" rx="1.5" ry="1.2" fill="#3D3530"/>` +
  `<path d="M${n(x - 13.6)} ${n(y - 4.2)} Q${n(x - 15.8)} ${n(y - 8.2)} ${n(x - 18.6)} ${n(y - 7.6)} M${n(x - 11.8)} ${n(y - 4.2)} Q${n(x - 11)} ${n(y - 8)} ${n(x - 8.4)} ${n(y - 8.2)}" stroke="#E8DCC4" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x + 10.6)} ${n(y - 2)} Q${n(x + 13.4)} ${n(y + 1)} ${n(x + 12.6)} ${n(y + 5.4)}" stroke="#1F1B18" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;

// Four words. Juwayriyah reported that the Messenger of Allah ﷺ came out from her apartment in the morning as she was
// busy in observing her dawn prayer in her place of worship. He came back in the forenoon and she was still sitting
// there. He said: you have been in the same seat since I left you. She said: yes. The Messenger of Allah ﷺ said: I
// recited four words three times after I left you, and if these are weighed against what you have recited since
// morning, these would outweigh them (Sahih Muslim 2726). No one is drawn: a room in the early morning, the dawn through
// its window, a door, and a mat. Juwayriyah's place is on the mat, and his place, a golden ring, by her; his place goes
// out at the door. A soft light comes about her place and a spark rises: her dawn prayer, and small pale glints come
// about her place, more and more: what she recited. The sun climbs in the window to the forenoon, and his place comes
// back in at the door. A soft golden ring comes about her place: still sitting there. His voice speaks, and twelve
// golden glints come over his place, four at a time: four words, three times. A balance shows between them; her glints
// go into its left pan and his into its right pan, and the right pan goes down: they outweigh them.
function fourWords(): SignArt {
  const her: [number, number] = [50, 103];
  const his: [number, number] = [96, 102];
  const recited = (i: number, list: [number, number][], from: number, dx: number, dy: number): SignPart => ({
    name: `what she recited: small pale glints about her place ${i}`,
    svg: glints(list, 0.8, "#FFF4CF"),
    keys: track({
      opacity: [
        [from, 0],
        [at3(from + 0.008), 1],
        [0.756, 1],
        [0.79, 0]
      ],
      xy: [
        [0.756, 0, 0],
        [0.79, dx, dy]
      ]
    }),
    loop: twinkle(1500)
  });
  const said = (i: number): SignPart => {
    const from = at3(0.524 + i * 0.016);
    const y = 90 - i * 4;
    const dy = n(60 - 1.8 * i - y);
    return {
      name: `the four words, said ${["once", "twice", "a third time"][i]}: four golden glints`,
      svg: glints(
        [92, 95, 98, 101].map((x): [number, number] => [x, y]),
        1.1,
        "#FFD45A"
      ),
      keys: track({
        opacity: [
          [from, 0],
          [at3(from + 0.006), 1]
        ],
        xy: [
          [0.878, 0, 0],
          [0.91, -11.5, dy],
          [0.916, -11.5, dy],
          [0.95, -11.5, n(dy + 2.1)]
        ]
      }),
      loop: twinkle(1100)
    };
  };
  const shown = (from: number, to: number) =>
    track({
      opacity: [
        [from, 0],
        [to, 1]
      ]
    });
  return {
    kind: "four-words",
    ms: 12000,
    parts: [
      { name: "the wall of the room", svg: `<rect width="160" height="94" fill="#E2C99C"/><path d="M0 30 L160 30 M0 62 L160 62" stroke="#D3B88A" stroke-width="0.5"/>` },
      { name: "the floor", svg: `<rect y="94" width="160" height="26" fill="#C9A470"/><path d="M0 94 L160 94" stroke="#A8865A" stroke-width="0.6"/>` },
      { name: "the dawn through the window", svg: `<rect x="14" y="16" width="28" height="28" fill="#9DB6DA"/><rect x="14" y="33" width="28" height="11" fill="#F2C28F" opacity="0.85"/>` },
      { name: "the forenoon through the window", svg: `<rect x="14" y="16" width="28" height="28" fill="#BFE3FA"/>`, keys: showAt(0.266, 0.29) },
      {
        name: "the sun through the window, climbing to the forenoon",
        svg: glow(24, 44, 5, "#FFF0C0", 0.3) + `<circle cx="24" cy="44" r="3" fill="#FFE07A"/>`,
        clip: { x: 14, y: 16, w: 28, h: 28 },
        keys: track({
          xy: [
            [0.266, 0, 0],
            [0.31, 10, -21]
          ]
        })
      },
      { name: "the window's frame", svg: `<rect x="14" y="16" width="28" height="28" fill="none" stroke="#8A6A48" stroke-width="1.4"/><path d="M28 16 L28 44 M14 30 L42 30" stroke="#8A6A48" stroke-width="0.8"/>` },
      { name: "the door, open on the morning", svg: `<rect x="142" y="56" width="14" height="38" fill="#F3DDB0"/>` },
      { name: "the door's frame", svg: `<rect x="142" y="56" width="14" height="38" fill="none" stroke="#8A6A48" stroke-width="1.2"/>` },
      { name: "a jug by the wall", svg: jug(124, 99) },
      { name: "a mat", svg: mat(her[0], 105, 16) },
      { name: "Juwayriyah's place, at her prayer", svg: someone(her[0], her[1], 1.6, ITS_VOICE) },
      {
        name: "his place, a golden ring: going out at the door, and coming back",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.075, 1],
            [0.085, 0],
            [0.3, 0],
            [0.306, 1]
          ],
          xy: [
            [0.03, 0, 0],
            [0.075, 53, -11],
            [0.306, 53, -11],
            [0.33, 0, 0]
          ]
        })
      },
      { name: "a soft light about her place: her dawn prayer", svg: wash(her[0], 101, 9, 5, WARM, 0.16), keys: showAt(0.144, 0.156), loop: soft },
      spark("her dawn prayer: a spark rising from her place", her[0], 97, 0.16, 0.2),
      recited(
        1,
        [
          [43, 97],
          [47, 94],
          [53, 94.5],
          [57, 97.5]
        ],
        0.176,
        11,
        -36.3
      ),
      recited(
        2,
        [
          [41, 101],
          [45, 91],
          [55, 91],
          [59, 101]
        ],
        0.31,
        11,
        -36.5
      ),
      recited(
        3,
        [
          [50, 88.5],
          [40, 95],
          [60, 95],
          [44, 87.5]
        ],
        0.4,
        12.5,
        -32
      ),
      { name: "still sitting there: a soft golden ring about her place", svg: care(her[0], her[1], 6.4, 3.4, SOFT_GOLD), keys: showAt(0.392, 0.404), loop: soft },
      { name: "his voice: four words, three times", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.512, 0.518, 0.95, 0.956), loop: speaking },
      said(0),
      said(1),
      said(2),
      { name: "a balance: its stand", svg: `<path d="M73 50 L73 92.6" stroke="#B8903E" stroke-width="1.2"/><path d="M67 94 L79 94 L76.6 91.8 L69.4 91.8 Z" fill="#B8903E"/><circle cx="73" cy="49" r="1.2" fill="#D9B45A"/>`, keys: shown(0.634, 0.65) },
      {
        name: "a balance: its crossbar",
        svg: `<path d="M60.6 50 L85.4 50" stroke="#D9B45A" stroke-width="1.2" stroke-linecap="round"/>`,
        origin: { x: 73, y: 50 },
        keys: track({
          opacity: [
            [0.634, 0],
            [0.65, 1]
          ],
          rotate: [
            [0.916, 0],
            [0.95, 10]
          ]
        })
      },
      {
        name: "a balance: the left pan",
        svg: pan(61),
        keys: track({
          opacity: [
            [0.634, 0],
            [0.65, 1]
          ],
          xy: [
            [0.916, 0, 0],
            [0.95, 0, -2.1]
          ]
        })
      },
      {
        name: "a balance: the right pan",
        svg: pan(85),
        keys: track({
          opacity: [
            [0.634, 0],
            [0.65, 1]
          ],
          xy: [
            [0.916, 0, 0],
            [0.95, 0, 2.1]
          ]
        })
      },
      {
        name: "what she recited, in the left pan: small pale glints",
        svg: glints(
          [
            [57.6, 59.8],
            [61, 60.2],
            [64.4, 59.8],
            [59.3, 58],
            [62.7, 58],
            [61, 56.4]
          ],
          0.8,
          "#FFF4CF"
        ),
        keys: track({
          opacity: [
            [0.774, 0],
            [0.794, 1]
          ],
          xy: [
            [0.916, 0, 0],
            [0.95, 0, -2.1]
          ]
        }),
        loop: twinkle(1500)
      },
      {
        name: "outweighing: a soft light and glints about the right pan",
        svg:
          wash(85, 63, 9, 5, WARM, 0.18) +
          glints(
            [
              [78, 64],
              [92, 64],
              [85, 55.5]
            ],
            1.2,
            "#FFE7A0"
          ),
        keys: showAt(0.948, 0.958),
        loop: soft
      }
    ],
    words: linesOn(EIGHT, [
      "Juwayriyah: he went out in the morning",
      "As she prayed at dawn in her place.",
      "He came back in the forenoon,",
      "And she was still sitting there.",
      "He said: I recited four words three times",
      "After I left you; if weighed against",
      "What you have recited since morning,",
      "These would outweigh them."
    ])
  };
}

// A dinar and a sheep. Urwah narrated that the Prophet ﷺ gave him one dinar to buy a sheep for him. Urwah bought two
// sheep for him with the money, then sold one of the sheep for one dinar, and brought one dinar and a sheep to the
// Prophet. On that, he invoked Allah to bless him in his deals, and Urwah used to gain even if he bought dust (Sahih
// al-Bukhari 3642). No one is drawn: a lane of Madinah with homes and palms, and the market with a stall and its sheep.
// His place, a golden ring, is by the homes, and Urwah's place by it. His voice speaks, and a dinar goes from his place
// to Urwah's place. Urwah's place goes along a dashed way to the market with it; the dinar goes to the seller's place
// and two sheep come to Urwah. One of them goes to a buyer's place, and a dinar comes back to Urwah. Urwah's place goes
// back with the other sheep and the dinar, the sheep stays by his place and the dinar goes to it. His voice speaks, a
// spark rises: his du'a, and a soft golden ring and glints come about Urwah's place: blessing. Then a small heap of
// dust shows by Urwah's place, and a dinar rises out of it and goes to Urwah, with glints: gain, even from dust.
function aDinarAndASheep(): SignArt {
  const his: [number, number] = [28, 106];
  const urwah: [number, number] = [42, 108];
  const seller: [number, number] = [138, 88];
  const buyer: [number, number] = [151, 113];
  return {
    kind: "a-dinar-and-a-sheep",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(84, 18) },
      { name: "a cloud", svg: cloud(48, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[66, 117], [96, 116], [120, 118], [156, 119]]) },
      { name: "homes of Madinah", svg: home(12, 96, 16, 12) + home(54, 92, 12, 9) },
      ...palms([[38, 92, 13]], "the lane"),
      { name: "the market: a stall", svg: stall(136, 34, "#C9824A", 72, 90) },
      { name: "the seller's place, behind the stall", svg: someone(seller[0], seller[1], 1.6, FOLK) },
      { name: "a sheep of the market, staying", svg: sheep(146, 110), origin: { x: 146, y: 110 }, loop: { move: "bob", ms: 1900, y: -0.3 } },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: buy a sheep", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.024, 0.03, 0.104, 0.11), loop: speaking },
      { name: "a dashed way to the market", svg: way("M46 110 C70 114 92 114 108 110"), keys: showAt(0.178, 0.19) },
      {
        name: "Urwah's place: to the market and back",
        svg: someone(urwah[0], urwah[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.235, 64, 0],
            [0.5, 64, 0],
            [0.555, 10, 0]
          ]
        })
      },
      {
        name: "the dinar he gave: to Urwah, then to the seller",
        svg: coins(33, 101, 1),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.036, 1],
            [0.258, 1],
            [0.268, 0]
          ],
          xy: [
            [0.045, 0, 0],
            [0.075, 10, 3],
            [0.18, 10, 3],
            [0.235, 74, 3],
            [0.24, 74, 3],
            [0.258, 104, -3]
          ]
        })
      },
      {
        name: "a sheep, bought: going with Urwah, then staying by his place",
        svg: sheep(118, 110),
        keys: track({
          xy: [
            [0.245, 0, 0],
            [0.275, -20, 2],
            [0.5, -20, 2],
            [0.555, -80, 4]
          ]
        })
      },
      {
        name: "a sheep, bought: then sold to the buyer",
        svg: sheep(128, 112),
        keys: track({
          xy: [
            [0.245, 0, 0],
            [0.275, -16, 1],
            [0.35, -16, 1],
            [0.385, 14, 3]
          ]
        })
      },
      { name: "the buyer's place", svg: someone(buyer[0], buyer[1], 1.6, FOLK), keys: showAt(0.338, 0.348) },
      {
        name: "the dinar of the sale: to Urwah, then to his place",
        svg: coins(149, 109, 1),
        keys: track({
          opacity: [
            [0.39, 0],
            [0.396, 1]
          ],
          xy: [
            [0.4, 0, 0],
            [0.43, -43, -5],
            [0.5, -43, -5],
            [0.555, -97, -5],
            [0.565, -97, -5],
            [0.585, -117, -8]
          ]
        })
      },
      { name: "his voice: the du'a", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.66, 0.666, 0.95, 0.956), loop: speaking },
      spark("his du'a: a spark rising from his place", his[0], 101, 0.672, 0.72),
      { name: "blessing in Urwah's deals: a soft golden ring about Urwah's place", svg: care(52, 108, 5.6, 3, SOFT_GOLD), keys: showAt(0.724, 0.736), loop: soft },
      {
        name: "blessing: glints about Urwah's place",
        svg: glints(
          [
            [46, 103],
            [58, 103],
            [52, 100.6]
          ],
          1,
          "#FFE7A0"
        ),
        keys: showAt(0.736, 0.748),
        loop: twinkle()
      },
      { name: "a small heap of dust by Urwah's place", svg: `<path d="M60 115 Q66 109.6 72 115 Z" fill="#CDB68A"/><path d="M62.6 113.4 Q66 111 69.4 113.4" stroke="#B89F70" stroke-width="0.4" fill="none"/>`, keys: showAt(0.82, 0.832) },
      {
        name: "gain, even buying dust: a dinar rising from the heap to Urwah",
        svg: coins(66, 110, 1),
        keys: track({
          opacity: [
            [0.85, 0],
            [0.856, 1]
          ],
          xy: [
            [0.86, 0, 0],
            [0.884, 0, -5],
            [0.89, 0, -5],
            [0.92, -12, -6]
          ]
        })
      },
      {
        name: "gain: glints about Urwah's place",
        svg: glints(
          [
            [45, 101],
            [59, 101.6],
            [52, 98]
          ],
          1.1,
          "#FFE7A0"
        ),
        keys: showAt(0.926, 0.938),
        loop: twinkle(1100)
      }
    ],
    words: linesOn(SIX, [
      "He gave Urwah one dinar to buy a sheep;",
      "Urwah bought two sheep with the money,",
      "Then sold one of the sheep for one dinar,",
      "And brought one dinar and a sheep to him.",
      "He invoked Allah to bless Urwah's deals;",
      "So Urwah used to gain, even buying dust."
    ])
  };
}

// Ten to seven hundred. Abu Sa'id al-Khudri said: the Messenger of Allah ﷺ said: if a person embraces Islam sincerely,
// then Allah shall forgive all his past sins, and after that starts the settlement of accounts: the reward of his good
// deeds will be ten times to seven hundred times for each good deed, and one evil deed will be recorded as it is unless
// Allah forgives it (Sahih al-Bukhari 41). No one is drawn: the land of Madinah with the masjid, and the place of one
// who embraces Islam, with grey puffs about it: its past sins. Abu Sa'id's voice tells of it, and his voice speaks from
// his place, a golden ring. A small light comes within the place, and a soft golden ring about it: sincerely, and the
// grey puffs fade away: forgiven. A dashed way goes on from it, and up in the sky two soft circles show: the account of
// good deeds, golden, and the account of evil deeds, small and grey. A glint rises from the place into the golden
// circle, and ten glints show in a row: ten times; then more rows, one by one, fill it, with a soft golden ring about it:
// up to seven hundred. A grey puff rises from the place into the grey circle, and a dashed grey ring comes about it: one,
// as it is. Then a soft light comes over the grey circle, and the grey puff fades away: unless Allah forgives it.
function tenToSevenHundred(): SignArt {
  const place: [number, number] = [70, 106];
  const his: [number, number] = [38, 104];
  const abuSaid: [number, number] = [22, 109];
  const good: [number, number] = [112, 34];
  const evil: [number, number] = [148, 38];
  const row = (i: number): SignPart => {
    const from = i === 0 ? 0.546 : at3(0.634 + (i - 1) * 0.01);
    const y = n(good[1] + 10.5 - i * 3);
    return {
      name: i === 0 ? "ten times: a row of ten glints in the golden circle" : `up to seven hundred: another row of glints ${i}`,
      svg: Array.from({ length: 10 }, (_, k) => sparkle(n(good[0] - 10.8 + k * 2.4), y, 0.75, "#FFD45A")).join(""),
      keys: showAt(from, at3(from + 0.006)),
      loop: twinkle(1300 + i * 100)
    };
  };
  return {
    kind: "ten-to-seven-hundred",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(22, 20) },
      { name: "a cloud", svg: cloud(70, 28, 0.44, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 92, 0.56) },
      ...palms([[96, 94, 12]], "Madinah"),
      { name: "Abu Sa'id's place", svg: someone(abuSaid[0], abuSaid[1], 1.6, ITS_VOICE) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcs(n(abuSaid[0] + 3.2), n(abuSaid[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.088), loop: speaking },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: telling of the reward", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.05, 0.056, 0.95, 0.956), loop: speaking },
      { name: "the place of one who embraces Islam", svg: someone(place[0], place[1], 1.6, FOLK) },
      {
        name: "its past sins: grey puffs about its place, fading away",
        svg: puffs(
          [
            [63, 100.6],
            [77, 101],
            [70, 97]
          ],
          GREY,
          0.8
        ),
        keys: track({
          opacity: [
            [0.17, 1],
            [0.2, 0]
          ]
        })
      },
      { name: "embracing Islam: a small light within its place", svg: smallLight(place[0], place[1], 0.9), keys: showAt(0.06, 0.072), loop: soft },
      { name: "sincerely: a soft golden ring about its place", svg: care(place[0], place[1], 5.6, 3, SOFT_GOLD), keys: showAt(0.146, 0.158), loop: soft },
      { name: "after that: a dashed way on from its place", svg: way("M76 108 C96 112 122 112 152 106"), keys: showAt(0.27, 0.284) },
      {
        name: "the account of good deeds: a soft golden circle, up in the sky",
        svg: `<circle cx="${good[0]}" cy="${good[1]}" r="16" fill="#FFF8E6" fill-opacity="0.55" stroke="#E8C878" stroke-width="0.6"/>`,
        keys: showAt(0.39, 0.406),
        loop: soft
      },
      {
        name: "the account of evil deeds: a small grey circle, up in the sky",
        svg: `<circle cx="${evil[0]}" cy="${evil[1]}" r="7" fill="#F4F1EC" fill-opacity="0.5" stroke="#9A918A" stroke-width="0.5" stroke-dasharray="1 0.9"/>`,
        keys: showAt(0.4, 0.416)
      },
      {
        name: "a good deed: a glint rising from its place to the golden circle",
        svg: sparkle(place[0], 100, 1.4, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.51, 0],
            [0.516, 1],
            [0.54, 1],
            [0.546, 0]
          ],
          xy: [
            [0.516, 0, 0],
            [0.54, good[0] - place[0], n(good[1] + 10.5 - 100)]
          ]
        })
      },
      ...Array.from({ length: 7 }, (_, i) => row(i)),
      { name: "up to seven hundred: a soft golden ring about the full circle", svg: care(good[0], good[1], 17.4, 17.4, SOFT_GOLD), keys: showAt(0.692, 0.7), loop: soft },
      {
        name: "an evil deed: a grey puff rising from its place to the grey circle",
        svg: puffs([[place[0], 100]], GREY, 0.85),
        keys: track({
          opacity: [
            [0.756, 0],
            [0.762, 1],
            [0.91, 1],
            [0.94, 0]
          ],
          xy: [
            [0.762, 0, 0],
            [0.79, evil[0] - place[0], evil[1] - 100]
          ]
        })
      },
      {
        name: "as it is: a dashed grey ring about the one grey puff",
        svg: care(evil[0], evil[1], 4.2, 3, GREY),
        keys: track({
          opacity: [
            [0.8, 0],
            [0.81, 1],
            [0.91, 1],
            [0.94, 0]
          ]
        })
      },
      { name: "unless forgiven: a soft light over the grey circle", svg: wash(evil[0], evil[1], 10, 10, WARM, 0.22), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Abu Sa'id: he said: if a person embraces",
      "Islam sincerely, Allah shall forgive",
      "All the past sins; after that starts",
      "The settlement of accounts: the reward",
      "Of good deeds will be ten times",
      "To seven hundred times for each good deed,",
      "And one evil deed will be recorded",
      "As it is, unless Allah forgives it."
    ])
  };
}

// Look at those below you. Abu Hurairah reported the Messenger of Allah ﷺ as saying: look at those who stand at a
// lower level than you, but don't look at those who stand at a higher level than you, for that is better suited that
// you do not disparage Allah's favors (Sahih Muslim 2963). No one is drawn: a hillside in three levels. Low down, a
// small tent with a little pot and a place by it; on the middle level, a modest home with a jar, his place, a
// golden ring, and Abu Hurairah's place; high up, a large home with a palm and a camel. Abu Hurairah's voice tells of
// it, and his voice speaks. A dashed way goes from Abu Hurairah's place down to the place by the tent, and a soft ring
// comes about it: those at a lower level. A grey dashed way goes up to the large home, then fades away: not those at a
// higher level. Glints come about the modest home and its things, and a soft golden ring about Abu Hurairah's place:
// its own blessings; a spark rises from it, and a soft warm light comes over the home: favors not disparaged.
function lookBelow(): SignArt {
  const his: [number, number] = [68, 98];
  const abuHurairah: [number, number] = [80, 99];
  const low: [number, number] = [41, 114.6];
  return {
    kind: "look-below",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(26, 18) },
      { name: "a cloud", svg: cloud(92, 26, 0.46, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the low ground", svg: `<rect y="66" width="160" height="54" fill="#E2CB9C"/><path d="M0 66 L160 66" stroke="#CDB283" stroke-width="0.7"/>` },
      { name: "the middle level of the hillside", svg: `<path d="M50 112 L62 94 L160 94 L160 120 L44 120 Z" fill="#D9BF8E"/><path d="M62 94 L160 94" stroke="#C4A674" stroke-width="0.6"/>` },
      { name: "the high level of the hillside", svg: `<path d="M100 94 L110 74 L160 74 L160 94 Z" fill="#CBAE7A"/><path d="M110 74 L160 74" stroke="#B89A66" stroke-width="0.6"/>` },
      { name: "a large home high up", svg: home(138, 74, 26, 16) },
      ...palms([[118, 74, 15]], "the high level"),
      { name: "a camel by the large home", svg: camel(155, 74, 0.13, true), origin: { x: 155, y: 74 }, loop: { move: "bob", ms: 2200, y: -0.3 } },
      { name: "jars by the large home", svg: jar(124, 74, 0.6) + jar(128, 74, 0.55) },
      { name: "a modest home on the middle level", svg: home(98, 94, 14, 10) },
      { name: "a jar by the modest home", svg: jar(108.6, 94, 0.6) },
      { name: "a small tent low down", svg: tent(26, 112, 18, 10) },
      { name: "a little pot by the tent", svg: jar(12, 112, 0.5) },
      { name: "the place by the tent", svg: someone(low[0], low[1], 1.6, FOLK) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place", svg: someone(abuHurairah[0], abuHurairah[1], 1.6, ITS_VOICE) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairah[0] + 3.2), n(abuHurairah[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.09, 0.096), loop: speaking },
      { name: "his voice: look at those below you", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.05, 0.056, 0.95, 0.956), loop: speaking },
      { name: "looking lower: a dashed way down to the place by the tent", svg: way("M78 101.6 C66 108 54 112 44.6 114"), keys: showAt(0.18, 0.196) },
      { name: "those at a lower level: a soft ring about the place by the tent", svg: ring(low[0], low[1], 3.6, "#FFF3CF"), keys: showAt(0.2, 0.214), loop: soft },
      {
        name: "looking higher: a grey dashed way up to the large home, fading away",
        svg: way("M84 97.6 C98 99.4 109 99 112.6 93 C115 86.6 118 79 126 76.6", GREY, 1),
        keys: track({
          opacity: [
            [0.34, 0],
            [0.356, 1],
            [0.5, 1],
            [0.53, 0]
          ]
        })
      },
      {
        name: "its own blessings: glints about the modest home and its things",
        svg: glints(
          [
            [90, 84],
            [106, 84.6],
            [98, 80.4],
            [112, 89]
          ],
          1,
          "#FFE7A0"
        ),
        keys: showAt(0.66, 0.676),
        loop: twinkle()
      },
      { name: "a soft golden ring about Abu Hurairah's place", svg: care(abuHurairah[0], abuHurairah[1], 5, 2.8, SOFT_GOLD), keys: showAt(0.7, 0.712), loop: soft },
      spark("thankful: a spark rising from Abu Hurairah's place", abuHurairah[0], 95, 0.82, 0.87),
      { name: "favors not disparaged: a soft warm light over the modest home", svg: wash(98, 89, 16, 8, WARM, 0.14), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: linesOn(SIX, [
      "Abu Hurairah: he said: look at those",
      "Who stand at a lower level than you,",
      "But don't look at those who stand",
      "At a higher level than you,",
      "For that is better suited, that you",
      "Do not disparage Allah's favors."
    ])
  };
}

// Half of Paradise. Abdullah said: while we were in the company of the Prophet ﷺ in a tent, he said: would it please you
// to be one fourth of the people of Paradise? We said: yes. He said: would it please you to be one third of the people
// of Paradise? We said: yes. He said: would it please you to be half of the people of Paradise? We said: yes. Thereupon
// he said: I hope that you will be one half of the people of Paradise, for none will enter Paradise but a Muslim soul,
// and you, in comparison to the people who associate others in worship with Allah, are like a white hair on the skin of
// a black ox, or a black hair on the skin of a red ox (Sahih al-Bukhari 6528). No one is drawn: a plain with a domed
// leather tent, his place, a golden ring, at its door and their places about it. Abdullah's voice tells of it, and his
// voice asks. Paradise shows far off, a soft circle of light with a garden in it, and a band in four parts under it:
// one part lights. Their voice says yes; the band shows three parts and one lights, and their voice says yes again. His
// voice speaks: the band shows two halves and one lights, with a soft golden ring and glints about it, and a soft golden
// ring comes about Paradise far off. A black ox walks in on the plain, and one short white line shows on its side,
// with a soft ring about it: a white hair on a black ox.
function halfOfParadise(): SignArt {
  const his: [number, number] = [66, 106];
  const abdullah: [number, number] = [52, 109];
  const them: [number, number][] = [
    [80, 109],
    [44, 113],
    [60, 113.6],
    [74, 113.6],
    [88, 113]
  ];
  const [bx, by, bw, bh] = [114, 44, 28, 5];
  const band = (parts: number) =>
    `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="1" fill="#FFFFFF" fill-opacity="0.45" stroke="#B8A27A" stroke-width="0.6"/>` +
    Array.from({ length: parts - 1 }, (_, i) => {
      const x = n(bx + (bw * (i + 1)) / parts);
      return `<path d="M${x} ${by} L${x} ${by + bh}" stroke="#B8A27A" stroke-width="0.6"/>`;
    }).join("");
  const lit = (parts: number) => `<rect x="${bx}" y="${by}" width="${n(bw / parts)}" height="${bh}" rx="1" fill="#FFE07A" stroke="#B8A27A" stroke-width="0.6"/>`;
  const between = (from: number, to: number, hide: number, gone: number) =>
    track({
      opacity: [
        [from, 0],
        [to, 1],
        [hide, 1],
        [gone, 0]
      ]
    });
  return {
    kind: "half-of-paradise",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(24, 18) },
      { name: "a cloud", svg: cloud(70, 22, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the plain", svg: plainLand("#E2CB9C", [[18, 116], [104, 117], [150, 117]]) },
      {
        name: "a domed leather tent",
        svg:
          `<path d="M40 104 Q40 78 66 76 Q92 78 92 104 Z" fill="#B98A5E"/>` +
          `<path d="M66 76 Q92 78 92 104 L78 104 Q78 84 66 76 Z" fill="#000000" opacity="0.1"/>` +
          `<path d="M52 79.6 Q50 92 50 104 M80 79.6 Q82 92 82 104" stroke="#9C7048" stroke-width="0.5" fill="none"/>` +
          `<path d="M58 104 Q58 92 66 91 Q74 92 74 104 Z" fill="#6B4A2E"/>`
      },
      { name: "his place, a golden ring, at the tent's door", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abdullah's place", svg: someone(abdullah[0], abdullah[1], 1.6, ITS_VOICE) },
      { name: "their places about the tent", svg: places(them) },
      { name: "Abdullah's voice: telling of it", svg: arcsLeft(n(abdullah[0] - 3.2), n(abdullah[1] - 2.8), ITS_VOICE), keys: showFor(0.022, 0.03, 0.082, 0.088), loop: speaking },
      { name: "his voice: would it please you", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.146, 0.152, 0.326, 0.332), loop: speaking },
      { name: "Paradise, far off: a soft circle of light with a garden in it", svg: farOff(128, 24, 12) + gardenIn(128, 24, 12), keys: showAt(0.268, 0.284), loop: soft },
      { name: "a band in four parts, under Paradise", svg: band(4), keys: between(0.29, 0.3, 0.418, 0.428) },
      { name: "one fourth: one part lights", svg: lit(4), keys: between(0.306, 0.316, 0.418, 0.428) },
      { name: "their voice: yes", svg: arcs(n(them[0][0] + 3.2), n(them[0][1] - 2.8), FOLK), keys: showFor(0.39, 0.396, 0.41, 0.416), loop: speaking },
      { name: "a band in three parts", svg: band(3), keys: between(0.418, 0.43, 0.522, 0.532) },
      { name: "one third: one part lights", svg: lit(3), keys: between(0.42, 0.43, 0.522, 0.532) },
      { name: "their voice: yes, again", svg: arcs(n(them[0][0] + 3.2), n(them[0][1] - 2.8), FOLK), keys: showFor(0.436, 0.442, 0.448, 0.454), loop: speaking },
      { name: "his voice: I hope", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.51, 0.516, 0.95, 0.956), loop: speaking },
      { name: "a band in two halves", svg: band(2), keys: showAt(0.522, 0.536) },
      { name: "one half: one half lights", svg: lit(2), keys: showAt(0.524, 0.536), loop: soft },
      { name: "a soft golden ring about the lit half", svg: care(n(bx + bw / 4), n(by + bh / 2), 9, 4.6, SOFT_GOLD), keys: showAt(0.55, 0.562), loop: soft },
      {
        name: "glints about the lit half",
        svg: glints(
          [
            [113, 41.6],
            [129, 41.6],
            [121, 51.6]
          ],
          1,
          "#FFE7A0"
        ),
        keys: showAt(0.564, 0.574),
        loop: twinkle()
      },
      { name: "a soft golden ring about Paradise far off", svg: care(128, 24, 13.6, 13.6, SOFT_GOLD), keys: showAt(0.634, 0.648), loop: soft },
      {
        name: "a black ox, walking in on the plain",
        svg: blackOx(132, 99),
        origin: { x: 132, y: 105 },
        keys: track({
          opacity: [
            [0.756, 0],
            [0.766, 1]
          ],
          xy: [
            [0.756, 14, 0],
            [0.8, 0, 0]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: -0.3 }
      },
      { name: "a white hair on the black ox: one short white line", svg: `<path d="M132.4 97.9 Q134 96.5 135.6 97.5" stroke="#FFFFFF" stroke-width="0.5" fill="none" stroke-linecap="round"/>`, keys: showAt(0.88, 0.89), loop: { move: "bob", ms: 2400, y: -0.3 } },
      { name: "a soft ring about the white hair", svg: ring(134, 97.4, 3.6, "#FFF3CF"), keys: showAt(0.9, 0.912), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Abdullah: we were with him in a tent;",
      "He said: would it please you to be",
      "One fourth of the people of Paradise?",
      "We said: yes. One third? We said: yes.",
      "He said: I hope that you will be one half",
      "Of the people of Paradise; compared to",
      "Those who associate others with Allah,",
      "You are like a white hair on a black ox."
    ])
  };
}

// Before the row. Abu Bakrah said: I reached the Prophet ﷺ in the mosque while he was bowing in prayer, and I too bowed
// before joining the row. I mentioned it to the Prophet ﷺ, and he said to me: may Allah increase your love for the
// good, but do not repeat it again (Sahih al-Bukhari 783). No one is drawn: inside the masjid, under its roof of palm
// fronds on palm trunks, with its door in the back wall. His place, a golden ring, is in front, and a row of places
// behind it. Abu Bakrah's place comes in at the door and hurries across. His place and the row go low: bowing. Abu
// Bakrah's place goes low before it reaches the row, a small grey dashed ring stays where it bowed, and it goes on, low,
// to the end of the row. All rise, and a spark of the prayer rises. Abu Bakrah's voice tells him of it, and his voice
// speaks: a spark rises, his du'a, and a small light, a soft golden ring and glints come about Abu Bakrah's place: more
// love for the good. Then the grey ring and the grey way where it bowed fade away: not again.
function beforeTheRow(): SignArt {
  const foot = 96;
  const his: [number, number] = [136, 103];
  const row: [number, number][] = [96, 104, 112, 120].map((x): [number, number] => [x, 108]);
  const lowAndUp = (from: number, to: number) =>
    track({
      xy: [
        [from, 0, 0],
        [to, 0, 1],
        [0.5, 0, 1],
        [0.515, 0, 0]
      ]
    });
  return {
    kind: "before-the-row",
    ms: 10000,
    parts: [
      ...insideTheMasjid(foot),
      { name: "the door in the back wall, open on the day", svg: `<rect x="20" y="70" width="12" height="26" fill="#F3DDB0"/><rect x="20" y="70" width="12" height="26" fill="none" stroke="#8A6A48" stroke-width="1"/>` },
      { name: "his place, a golden ring, in front", svg: ring(his[0], his[1], 2.6, GOLD), keys: lowAndUp(0.18, 0.195) },
      { name: "the row behind him", svg: places(row), keys: lowAndUp(0.184, 0.2) },
      {
        name: "Abu Bakrah's place: in at the door, hurrying, going low before the row",
        svg: someone(26, 99, 1.6, ITS_VOICE),
        keys: track({
          opacity: [
            [0.024, 0],
            [0.032, 1]
          ],
          xy: [
            [0.04, 0, 0],
            [0.1, 30, 10],
            [0.2, 30, 10],
            [0.24, 42, 10],
            [0.34, 42, 10],
            [0.352, 42, 11],
            [0.362, 42, 11],
            [0.41, 62, 10],
            [0.5, 62, 10],
            [0.515, 62, 9]
          ]
        })
      },
      {
        name: "where Abu Bakrah bowed, before the row: a small grey dashed ring",
        svg: care(68, 110.2, 3.4, 1.8, GREY),
        keys: track({
          opacity: [
            [0.352, 0],
            [0.362, 1],
            [0.85, 1],
            [0.9, 0]
          ]
        })
      },
      {
        name: "its way to the row, low: a short grey dashed way",
        svg: way("M71 110.2 L85 109.4", GREY, 0.8),
        keys: track({
          opacity: [
            [0.364, 0],
            [0.374, 1],
            [0.85, 1],
            [0.9, 0]
          ]
        })
      },
      spark("the prayer: a spark rising from the row", 108, 103, 0.52, 0.56),
      { name: "Abu Bakrah's voice: telling him of it", svg: arcs(91.2, 105.2, ITS_VOICE), keys: showFor(0.53, 0.536, 0.58, 0.586), loop: speaking },
      { name: "his voice: a du'a for Abu Bakrah", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.8), GOLD), keys: showFor(0.588, 0.594, 0.95, 0.956), loop: speaking },
      spark("his du'a: a spark rising from his place", his[0], 98, 0.66, 0.705),
      { name: "more love for the good: a small light within Abu Bakrah's place", svg: smallLight(88, 108, 0.9), keys: showAt(0.71, 0.722), loop: soft },
      { name: "a soft golden ring about Abu Bakrah's place", svg: care(88, 108, 5, 2.8, SOFT_GOLD), keys: showAt(0.728, 0.74), loop: soft },
      {
        name: "glints about Abu Bakrah's place",
        svg: glints(
          [
            [82, 103.6],
            [94, 103.6],
            [88, 100.6]
          ],
          1,
          "#FFE7A0"
        ),
        keys: showAt(0.742, 0.754),
        loop: twinkle()
      }
    ],
    words: linesOn(SIX, [
      "Abu Bakrah: I reached him in the mosque",
      "While he was bowing in prayer, and I too",
      "Bowed before joining the row.",
      "I mentioned it to him, and he said to me:",
      "May Allah increase your love for the good.",
      "But do not repeat it again."
    ])
  };
}


export const BOUNTY_ART = {
  "four-words": fourWords,
  "a-dinar-and-a-sheep": aDinarAndASheep,
  "ten-to-seven-hundred": tenToSevenHundred,
  "look-below": lookBelow,
  "half-of-paradise": halfOfParadise,
  "before-the-row": beforeTheRow
} as const;
