import React from "react";
import { Platform, Pressable, Text } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock("expo-apple-authentication", () => {
  const { Pressable: P, Text: T } = require("react-native");
  return {
    AppleAuthenticationButtonType: { SIGN_IN: 0, CONTINUE: 1 },
    AppleAuthenticationButtonStyle: { WHITE: 0, WHITE_OUTLINE: 1, BLACK: 2 },
    AppleAuthenticationButton: ({ onPress, testID, buttonType }: { onPress: () => void; testID: string; buttonType: number }) => (
      <P onPress={onPress} testID={testID}>
        <T>{buttonType === 1 ? "system Continue with Apple" : "system Sign in with Apple"}</T>
      </P>
    )
  };
});

import { AppleSignInButton } from "../ui/screens/AppleSignInButton.native";

const fallback = (
  <Pressable testID="home-made">
    <Text>Continue with Apple</Text>
  </Pressable>
);

describe("Sign in with Apple button (App Review guideline 4)", () => {
  const os = Platform.OS;
  afterEach(() => {
    Platform.OS = os;
  });

  it("uses Apple's own system button on iPhone, never a home-made button or logo", async () => {
    Platform.OS = "ios";
    const onPress = jest.fn();
    await render(<AppleSignInButton onPress={onPress} fallback={fallback} />);
    expect(screen.queryByTestId("home-made")).toBeNull();
    expect(screen.getByText("system Continue with Apple")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("account-social-apple-native"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("keeps the plain button anywhere else", async () => {
    Platform.OS = "android";
    await render(<AppleSignInButton onPress={jest.fn()} fallback={fallback} />);
    expect(screen.getByTestId("home-made")).toBeTruthy();
  });
});
