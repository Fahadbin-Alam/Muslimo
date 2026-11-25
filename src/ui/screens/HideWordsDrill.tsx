import React, { useMemo, useState } from "react";
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { t } from "../../i18n";
import { ayahPieces } from "../../services/ayahWords";
import { HIDE_ROUNDS, hiddenWords, hideStars } from "../../services/hideWords";
import { ArabicText } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { useAyahQueue } from "../lesson/useAyahQueue";
import { scaleFont } from "../textScale";
import { colors, darken, lighten, text } from "../theme";
import { Tappable } from "../Tappable";

/** One block of Arabic: an ayah (with its number), or a whole dua. */
export type HidePassage = { key: string; text: string; number?: number };

export type HideWordsDrillProps = {
  /** Keeps the order words hide in the same for this surah or dua. */
  seed: string;
  passages: readonly HidePassage[];
  /** The reciter, for Quran text: Listen plays these one after another. */
  recitations?: readonly string[];
  /** "Sahih al-Bukhari 6306": tap to open it. */
  source?: { label: string; onPress?: () => void };
  /** The last round said from memory, with its stars (3 with no "Not yet" and no peek). */
  onFinish?: (stars: number) => void;
  /** Done, after the last round. */
  onDone: () => void;
  bottomInset?: number;
};

const SIZE = 24;
/** Room under the buttons for the iPhone's home bar, as the surah page has. */
const FOOTER_INSET = Platform.OS === "ios" ? 30 : 16;
const LAST_ROUND = HIDE_ROUNDS.length - 1;
const GAP = lighten(colors.gem, 0.78);
const PEEK = darken(colors.gold, 0.35);
const SHOWN = colors.correctInk;
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const arabicNumber = (value: number) => String(value).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);

function Stars({ stars }: { stars: number }) {
  return (
    <View style={styles.stars} testID="hide-stars" accessible accessibilityLabel={t("{count} of {max} stars", { count: stars, max: 3 })}>
      {[1, 2, 3].map((star) => (
        <Icon key={star} name="star" size={34} color={star <= stars ? colors.gold : colors.line} />
      ))}
    </View>
  );
}

/**
 * Hide words: the text in full first, to read a few times; then each round hides more of its words (the ones before
 * and more), until all are hidden. The learner says it from memory, may tap a gap to peek at that word, then Check
 * shows every word (the hidden ones in green) and they say if they knew it. "Not yet" tries the same round again.
 */
export function HideWordsDrill({ seed, passages, recitations, source, onFinish, onDone, bottomInset = 0 }: HideWordsDrillProps) {
  const { queue, playback, play, stop } = useAyahQueue();
  const [round, setRound] = useState(0);
  const [checking, setChecking] = useState(false);
  const [peeked, setPeeked] = useState<ReadonlySet<number>>(new Set());
  const [misses, setMisses] = useState(0);
  const [stars, setStars] = useState<number | null>(null);

  // Each passage's pieces, with its words numbered across the whole text.
  const blocks = useMemo(() => {
    let offset = 0;
    return passages.map((passage) => {
      const { pieces, words } = ayahPieces(passage.text);
      const block = { passage, pieces: pieces.map((piece) => ({ text: piece.text, word: piece.word < 0 ? -1 : piece.word + offset })) };
      offset += words;
      return block;
    });
  }, [passages]);
  const total = useMemo(() => blocks.reduce((count, block) => count + block.pieces.filter((piece) => piece.word >= 0).length, 0), [blocks]);
  const hidden = useMemo(() => hiddenWords(total, round, seed), [round, seed, total]);

  const listening = queue !== null;
  const loading = listening && playback.status === "loading";
  const listen = () => (listening ? stop() : recitations?.length ? play([...recitations], 0, 1) : undefined);

  const reset = (next: number) => {
    stop();
    setRound(next);
    setChecking(false);
    setPeeked(new Set());
  };
  const knewIt = () => {
    const missed = misses + (peeked.size > 0 ? 1 : 0);
    setMisses(missed);
    if (round >= LAST_ROUND) {
      stop();
      const earned = hideStars(missed);
      setStars(earned);
      onFinish?.(earned);
      return;
    }
    reset(round + 1);
  };
  const notYet = () => {
    setMisses((count) => count + 1);
    reset(round);
  };
  const again = () => {
    setStars(null);
    setMisses(0);
    reset(0);
  };

  if (stars !== null) {
    return (
      <View style={[styles.finish, { paddingBottom: 24 + bottomInset }]} testID="hide-finish">
        <Icon name="sparkle" size={56} />
        <Text style={styles.finishTitle} accessibilityRole="header">
          {t("Said from memory!")}
        </Text>
        <Stars stars={stars} />
        <View style={styles.finishButtons}>
          <GameButton label={t("Again")} variant="secondary" icon="repeat" onPress={again} testID="hide-again" fullWidth />
          <GameButton label={t("Done")} onPress={onDone} testID="hide-done" fullWidth />
        </View>
      </View>
    );
  }

  const line = round === 0 ? t("Read it a few times, out loud.") : checking ? t("Did you say every word?") : t("Say it from memory. Tap a gap to peek.");
  return (
    <>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} testID="hide-words">
        <View style={styles.head}>
          <Text style={styles.round} testID="hide-round">
            {t("Round {number} of {count}", { number: round + 1, count: HIDE_ROUNDS.length })}
          </Text>
          <View style={styles.dots}>
            {HIDE_ROUNDS.map((_, index) => (
              <View key={index} style={[styles.dot, index < round ? styles.dotDone : index === round ? styles.dotNow : null]} />
            ))}
          </View>
        </View>
        <Text style={styles.line} testID="hide-line">
          {line}
        </Text>
        {recitations?.length ? (
          <Tappable onPress={listen} style={styles.listen} pressScale={0.94} accessibilityLabel={listening ? t("Stop") : t("Listen")} testID="hide-listen">
            {loading ? <ActivityIndicator size="small" color={colors.white} /> : <Icon name={listening ? "close" : "play"} size={16} color={colors.white} />}
            <Text style={styles.listenText}>{listening ? t("Stop") : t("Listen")}</Text>
          </Tappable>
        ) : null}
        {blocks.map(({ passage, pieces }) => (
          <View key={passage.key} style={styles.card} testID={`hide-passage-${passage.key}`}>
            <ArabicText size={scaleFont(SIZE)} quran align="right" color={colors.ink} style={styles.arabic}>
              {pieces.map((piece, index) => {
                if (piece.word < 0 || !hidden.has(piece.word)) return piece.text;
                if (checking) {
                  return (
                    <Text key={index} style={styles.shown} testID={`hide-shown-${piece.word}`}>
                      {piece.text}
                    </Text>
                  );
                }
                if (peeked.has(piece.word)) {
                  return (
                    <Text key={index} style={styles.peeked} testID={`hide-peeked-${piece.word}`}>
                      {piece.text}
                    </Text>
                  );
                }
                return (
                  <Text
                    key={index}
                    style={styles.gap}
                    onPress={() => setPeeked((before) => new Set(before).add(piece.word))}
                    accessibilityRole="button"
                    accessibilityLabel={t("Hidden word")}
                    testID={`hide-gap-${piece.word}`}
                  >
                    {piece.text}
                  </Text>
                );
              })}
              {passage.number ? ` ﴿${arabicNumber(passage.number)}﴾` : ""}
            </ArabicText>
          </View>
        ))}
        {source ? (
          <Tappable onPress={source.onPress} disabled={!source.onPress} style={styles.source} accessibilityRole="link" accessibilityLabel={source.label} testID="hide-source">
            <Icon name="book" size={16} color={colors.inkSoft} />
            <Text style={styles.sourceText} numberOfLines={2}>
              {source.label}
            </Text>
          </Tappable>
        ) : null}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: FOOTER_INSET + bottomInset }]}>
        {round === 0 ? (
          <GameButton label={t("Hide words")} icon="sparkle" fullWidth onPress={() => reset(1)} testID="hide-start" />
        ) : checking ? (
          <View style={styles.pair}>
            <GameButton label={t("Not yet")} variant="secondary" onPress={notYet} testID="hide-not-yet" style={styles.half} />
            <GameButton label={t("I knew it")} onPress={knewIt} testID="hide-knew" style={styles.half} />
          </View>
        ) : (
          <GameButton label={t("Check")} variant="blue" fullWidth onPress={() => setChecking(true)} testID="hide-check" />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  content: {
    paddingBottom: 20
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 6
  },
  round: {
    ...text.bodyBold,
    color: darken(colors.gem, 0.25)
  },
  dots: {
    flexDirection: "row",
    gap: 6
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.line
  },
  dotDone: {
    backgroundColor: colors.green
  },
  dotNow: {
    backgroundColor: colors.gem
  },
  line: {
    ...text.bodyBold,
    color: colors.inkSoft,
    marginBottom: 12
  },
  listen: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    minHeight: 40,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    borderBottomWidth: 3,
    borderBottomColor: colors.greenLip,
    backgroundColor: colors.green
  },
  listenText: {
    ...text.bodyBold,
    color: colors.white
  },
  card: {
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: 18,
    backgroundColor: colors.white
  },
  arabic: {
    width: "100%"
  },
  gap: {
    color: "transparent",
    backgroundColor: GAP
  },
  peeked: {
    color: PEEK
  },
  shown: {
    color: SHOWN
  },
  source: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4
  },
  sourceText: {
    ...text.tiny,
    flexShrink: 1,
    textDecorationLine: "underline"
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: colors.line,
    backgroundColor: colors.white
  },
  pair: {
    flexDirection: "row",
    gap: 10
  },
  half: {
    flex: 1
  },
  finish: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14
  },
  finishTitle: {
    ...text.h2,
    textAlign: "center"
  },
  stars: {
    flexDirection: "row",
    gap: 6
  },
  finishButtons: {
    alignSelf: "stretch",
    gap: 10,
    marginTop: 10
  }
});
