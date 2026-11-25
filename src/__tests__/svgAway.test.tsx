import fs from "fs";
import path from "path";
import React from "react";
import { AppState, Platform, StyleSheet, View } from "react-native";
import { act, render, screen } from "@testing-library/react-native";

/** Every SVG must come through src/ui/svg.tsx, so Android can put the pictures away in the background. */
test("no app file imports react-native-svg directly", () => {
  const root = path.join(__dirname, "..");
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "__tests__") walk(full);
      } else if (/\.tsx?$/.test(entry.name) && full !== path.join(root, "ui", "svg.tsx")) {
        if (/from\s+["']react-native-svg["']|require\(["']react-native-svg["']\)/.test(fs.readFileSync(full, "utf8"))) {
          offenders.push(path.relative(root, full));
        }
      }
    }
  };
  walk(root);
  expect(offenders).toEqual([]);
});

describe("pictures put away in the background on Android", () => {
  test("swaps each SVG for an empty box of the same size, and brings it back", async () => {
    let listener: ((status: string) => void) | undefined;
    Platform.OS = "android";
    jest.spyOn(AppState, "addEventListener").mockImplementation(((_type: string, call: (status: string) => void) => {
      listener = call;
      return { remove: () => undefined };
    }) as never);
    // Read after the platform is set: the file decides at load whether to watch.
    const { default: Svg, Circle, SvgXml } = require("../ui/svg") as typeof import("../ui/svg");
    const xml = '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>';
    await render(
      <View>
        <Svg width={40} height={30} testID="pic">
          <Circle cx={5} cy={5} r={4} />
        </Svg>
        <SvgXml xml={xml} width={20} height={20} testID="xml" />
      </View>,
    );
    const circles = () => (JSON.stringify(screen.toJSON()).match(/"type":"RNSVGCircle"/g) ?? []).length;
    expect(circles()).toBe(2);

    await act(async () => listener?.("inactive"));
    expect(circles()).toBe(2);

    await act(async () => listener?.("background"));
    expect(circles()).toBe(0);
    expect(StyleSheet.flatten(screen.getByTestId("pic").props.style)).toMatchObject({ width: 40, height: 30 });
    expect(StyleSheet.flatten(screen.getByTestId("xml").props.style)).toMatchObject({ width: 20, height: 20 });

    await act(async () => listener?.("active"));
    expect(circles()).toBe(2);
  });
});
