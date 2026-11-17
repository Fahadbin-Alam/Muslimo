import React from "react";
import { Platform } from "react-native";

type AppleAuthModule = typeof import("expo-apple-authentication");

function loadApple(): AppleAuthModule | null {
  try {
    return require("expo-apple-authentication") as AppleAuthModule;
  } catch {
    return null;
  }
}

export type AppleSignInButtonProps = {
  onPress: () => void;
  /** Shown only where Apple's own button can't be drawn (no native module). */
  fallback: React.ReactElement;
};

// App Review (guideline 4) requires Apple's own Sign in with Apple button, drawn by iOS with Apple's logo,
// not a home-made button or logo. So on iPhone and iPad the system button is used.
export function AppleSignInButton({ onPress, fallback }: AppleSignInButtonProps) {
  const apple = Platform.OS === "ios" ? loadApple() : null;

  if (!apple?.AppleAuthenticationButton) {
    return fallback;
  }

  const { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } = apple;
  return (
    <AppleAuthenticationButton
      buttonType={AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={14}
      style={{ width: "100%", height: 50 }}
      onPress={onPress}
      testID="account-social-apple-native"
    />
  );
}
