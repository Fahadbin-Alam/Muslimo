import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Sheet } from "../Sheet";
import { colors, lighten, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type WelcomeSheetProps = {
  visible: boolean;
  /** Opens the sign up form (the age question comes first on a phone). */
  onCreateAccount: () => void;
  /** Opens the log in form, with Google (and Apple on iPhone). */
  onLogIn: () => void;
  /** Plays as a guest; an account can still be made later from Me. */
  onSkip: () => void;
};

// Shown once on a first launch, right after the language: someone who already has an account logs in here
// before playing, and anyone else can make one or just start. An account stays optional (the app is for all ages).
export function WelcomeSheet({ visible, onCreateAccount, onLogIn, onSkip }: WelcomeSheetProps) {
  // Back is the same as "Start without an account".
  useBackToClose(visible, onSkip);

  return (
    <Sheet visible={visible} dismissOnBackdrop={false} testID="welcome-sheet">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
        <View style={styles.badge}>
          <Icon name="bookOpen" size={40} color={colors.green} />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          {t("Welcome to Muslimo!")}
        </Text>
        <Text style={styles.line}>{t("Sign in to keep your progress safe on every phone.")}</Text>
        <GameButton label={t("I already have an account")} icon="key" fullWidth onPress={onLogIn} testID="welcome-log-in" />
        <GameButton label={t("Create account")} variant="white" icon="profile" fullWidth onPress={onCreateAccount} testID="welcome-create" />
        <GameButton label={t("Start without an account")} variant="ghost" fullWidth onPress={onSkip} testID="welcome-skip" />
        <Text style={styles.note}>{t("You can sign in later from Me.")}</Text>
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  badge: {
    alignSelf: "center",
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: lighten(colors.green, 0.86),
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    ...text.h2,
    textAlign: "center"
  },
  line: {
    ...text.body,
    textAlign: "center",
    color: colors.inkSoft
  },
  note: {
    ...text.body,
    fontSize: 14,
    textAlign: "center",
    color: colors.inkSoft
  }
});
