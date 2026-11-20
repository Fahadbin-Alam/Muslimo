import { glow, n, type SignArt, type SignPart } from "./signDraw";
import { ring } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { GOLD, someone } from "./worshipArt";
import { palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, twinkle } from "./shareArt";
import { FIVE } from "./wideArt";
import { aDay, voice } from "./stepsArt";

/**
 * A sermon: he ﷺ stood up to give a sermon, and among what he said was that fear of people should not stop a man from
 * speaking the truth, if he knows it. Only the land, the sky and palms are drawn: where the sermon was is not told, so
 * no masjid is drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or
 * a face: where someone was, a ring or a small dashed circle shows it, and a voice is arcs in the air. Nothing is drawn
 * for Allah, no book, page or letter is drawn, and nothing comes down from the sky: the truth is a soft golden light
 * and glints. No name, word or number is written.
 */

/** Abu Sa'id al-Khudri's place and voice: a slate blue. */
const ABU_SAID = "#5E6E9A";
/** The places of those who sat for the sermon, and the voice of one of them: a soft brown. */
const SITTING = "#8A6E52";

// The truth you know. Abu Sa'id al-Khudri said: the Messenger of Allah ﷺ stood up to deliver a sermon, and one of the
// things he said was: indeed, fear of people should not prevent a man from speaking the truth, if he knows it (Sunan
// Ibn Majah 4007). The words leave out the page's "Indeed", say "the man" for its "he", so that "he" is only the
// Prophet ﷺ, and leave out Abu Sa'id's weeping after it. No one is drawn: his place, a golden ring, on the left, and
// before him the places of those who sat for the sermon, in two rows, Abu Sa'id's among them. Abu Sa'id's voice tells
// of it, and his place rises: he stood up. His voice, soft and golden, speaks. A soft grey hush comes over the place of
// one of them: the awe of people. Then the hush goes: it should not stop it. Last, a soft golden light comes about that
// place, its voice speaks, and glints show over it: the truth, which it knows. Nothing shows before the line that says
// so: the hush only once the fear of people is named, and the light only once the truth is.
function theTruthYouKnow(): SignArt {
  const his: [number, number] = [48, 101];
  const rise = -2.6;
  const abuSaid: [number, number] = [64, 103.4];
  const sitting: [number, number][] = [
    [77, 103.4],
    [90, 103.4],
    [103, 103.4],
    [70.5, 97.4],
    [83.5, 97.4],
    [109.5, 97.4]
  ];
  const knows: [number, number] = [96.5, 97.4];
  return {
    kind: "the-truth-you-know",
    ms: 10500,
    parts: [
      ...aDay([140, 20], [96, 26]),
      ...palms([
        [16, 94, 11],
        [128, 90, 9],
        [152, 96, 12]
      ]),
      {
        name: "awe of others: a soft grey hush over the place of one who knows the truth",
        svg: glow(knows[0], knows[1], 4.6, "#7E8796", 0.3),
        keys: track({
          opacity: [
            [0.45, 0],
            [0.47, 1],
            [0.66, 1],
            [0.68, 0]
          ]
        })
      },
      { name: "the truth it knows: a soft golden light about its place", svg: glow(knows[0], knows[1], 5, "#FFE7A0", 0.24), keys: showAt(0.83, 0.85), loop: soft },
      {
        name: "his place, a golden ring: standing up to give the sermon",
        svg: ring(his[0], his[1], 2.2, GOLD),
        keys: track({
          xy: [
            [0.08, 0, 0],
            [0.14, 0, rise]
          ]
        })
      },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 2.8), n(his[1] + rise - 2.6), SOFT_GOLD), keys: voice([[0.24, 0.96]]), loop: speaking },
      ...sitting.map((p, i): SignPart => ({ name: `the place of one sitting for the sermon ${i + 1}`, svg: someone(p[0], p[1], 1.8, SITTING) })),
      { name: "the place of one who knows the truth", svg: someone(knows[0], knows[1], 1.8, SITTING) },
      { name: "Abu Sa'id's place", svg: someone(abuSaid[0], abuSaid[1], 1.8, ABU_SAID) },
      { name: "Abu Sa'id's voice: telling of it", svg: arcs(n(abuSaid[0] + 2.6), n(abuSaid[1] - 3.4), ABU_SAID), keys: voice([[0.02, 0.164]]), loop: speaking },
      { name: "its voice: speaking the truth", svg: arcsLeft(n(knows[0] - 2.6), n(knows[1] - 3.4), SITTING), keys: voice([[0.86, 0.95]]), loop: speaking },
      { name: "and glints over it", svg: glints([[knows[0], n(knows[1] - 5.2)], [n(knows[0] - 3.6), n(knows[1] - 3.8)], [n(knows[0] + 3.6), n(knows[1] - 3.8)]], 1), keys: showAt(0.88, 0.89), loop: twinkle() }
    ],
    words: linesOn(FIVE, ["Abu Sa'id: the Messenger of Allah", "Stood up to deliver a sermon, and one", "Of the things he said was: fear of people", "Should not prevent a man from speaking", "The truth, if the man knows it."])
  };
}

export const SERMON_ART = {
  "the-truth-you-know": theTruthYouKnow
};
