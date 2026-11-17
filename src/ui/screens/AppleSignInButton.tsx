import type React from "react";

export type AppleSignInButtonProps = {
  onPress: () => void;
  fallback: React.ReactElement;
};

// Sign in with Apple is offered only on iPhone and iPad (see AppleSignInButton.native.tsx).
export function AppleSignInButton({ fallback }: AppleSignInButtonProps) {
  return fallback;
}
