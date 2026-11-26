import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Mascot } from "../Mascot";
import { Sheet } from "../Sheet";
import { colors, space, text } from "../theme";
import { t } from "../../i18n";

export type HarderSheetProps = {
  visible: boolean;
  /** How many the learner got right (or, asking "Want it easier?", missed) in a row. */
  inARow: number;
  onHarder: () => void;
  onKeep: () => void;
  /** "easier": after a run of misses, "Want it easier?" (onHarder then makes it easier). Unset: "Want it harder?". */
  direction?: "harder" | "easier";
  /** The level YES moves to (1 Easy to 5 Extremely hard, questionTiers.ts), shown by name so they know what it does. */
  nextLevel?: 1 | 2 | 3 | 4 | 5;
  mascotVariant?: string;
  accent?: string;
};

/**
 * "Want it harder?": after a run of right first time in a row, the lesson asks. YES asks deeper questions on the same
 * topic now and makes the next lessons a step harder; NO keeps the lesson as it is (and the lesson does not ask
 * again). With direction "easier", after a run of misses: "Want it easier?", YES a step easier.
 */
export function HarderSheet({ visible, inARow, onHarder, onKeep, direction = "harder", nextLevel, mascotVariant = "girl", accent }: HarderSheetProps) {
  const easier = direction === "easier";
  return (
    <Sheet visible={visible} onClose={onKeep} testID={easier ? "easier-sheet" : "harder-sheet"}>
      <View style={styles.body}>
        <Mascot variant={mascotVariant} mood={easier ? "think" : "cheer"} accent={accent} size={96} />
        <Text style={[styles.streak, easier && styles.missed]}>
          {easier ? t("{count} missed in a row", { count: inARow }) : t("{count} right in a row!", { count: inARow })}
        </Text>
        <Text style={styles.title} accessibilityRole="header">
          {easier ? t("Want it easier?") : t("Want it harder?")}
        </Text>
        {nextLevel ? <Text style={styles.level}>{t("Next level: {level}", { level: levelName(nextLevel) })}</Text> : null}
        <Text style={styles.line}>
          {easier
            ? t("Easier questions for now. You can change it in Settings.")
            : t("Deeper questions on this same topic, with the same sources. You can change it in Settings.")}
        </Text>
      </View>
      <GameButton
        label={easier ? t("Yes, make it easier") : t("Yes, make it harder")}
        color={accent}
        fullWidth
        onPress={onHarder}
        testID={easier ? "easier-yes" : "harder-yes"}
      />
      <GameButton
        label={t("Keep it as it is")}
        variant="ghost"
        color={colors.inkSoft}
        fullWidth
        onPress={onKeep}
        style={styles.ghost}
        testID={easier ? "easier-no" : "harder-no"}
      />
    </Sheet>
  );
}

/** A level's name in the learner's language. */
function levelName(level: 1 | 2 | 3 | 4 | 5) {
  switch (level) {
    case 1:
      return t("Easy");
    case 2:
      return t("Medium");
    case 3:
      return t("Hard");
    case 4:
      return t("Super hard");
    default:
      return t("Extremely hard");
  }
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    marginBottom: space.xl
  },
  streak: {
    ...text.small,
    fontFamily: text.bodyBold.fontFamily,
    color: colors.flame,
    textAlign: "center",
    marginTop: space.sm
  },
  missed: {
    color: colors.inkSoft
  },
  level: {
    ...text.small,
    fontFamily: text.bodyBold.fontFamily,
    color: colors.ink,
    textAlign: "center",
    marginTop: space.xs
  },
  title: {
    ...text.h2,
    textAlign: "center",
    marginTop: space.xs,
    flexShrink: 1
  },
  line: {
    ...text.small,
    fontFamily: text.bodyBold.fontFamily,
    textAlign: "center",
    marginTop: space.xs,
    flexShrink: 1
  },
  ghost: {
    marginTop: space.xs
  }
});
