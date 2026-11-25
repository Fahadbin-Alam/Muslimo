import React, { forwardRef, useSyncExternalStore } from "react";
import { AppState, Platform, StyleSheet, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import RealSvg, { SvgXml as RealSvgXml } from "react-native-svg";
import type { SvgProps, XmlProps } from "react-native-svg";

export * from "react-native-svg";

/**
 * The app's pictures (skies, scenery, animals, the mascot) are SVGs. On Android each SVG on the screen keeps a
 * full-size picture of itself in memory (react-native-svg draws into a bitmap), and it keeps it while the app sits
 * in the background too: a Learn path held tens of MB of these. Google Play counts the app's memory while it is in
 * the background ("Memory usage: bad behavior" in Android vitals), and phones close apps that hold a lot.
 *
 * So every SVG in the app comes from this file: while the app is in the background on Android, each SVG is swapped
 * for an empty box of the same size (nothing moves, nothing shows, the bitmap is freed), and the pictures come back
 * the moment the app is opened again. On screen nothing changes. Import Svg, SvgXml and the shapes from here, never
 * from "react-native-svg" itself (src/__tests__/svgAway.test.tsx checks).
 */

const WATCH = Platform.OS === "android";

let away = WATCH && AppState.currentState === "background";
const listeners = new Set<() => void>();
let watching = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!watching) {
    watching = true;
    AppState.addEventListener("change", (status) => {
      // Only "background": "inactive" is a pulled-down shade or a call screen, with the app still in sight.
      const next = status === "background";
      if (next === away) return;
      away = next;
      listeners.forEach((call) => call());
    });
  }
  return () => {
    listeners.delete(listener);
  };
}

const isAway = () => away;
const neverAway = () => false;

/** True while the app is in the background on Android (pictures are put away then). Always false elsewhere. */
export function usePicturesAway(): boolean {
  return useSyncExternalStore(WATCH ? subscribe : noSubscribe, WATCH ? isAway : neverAway, neverAway);
}

function noSubscribe() {
  return () => undefined;
}

/** An empty box the size the SVG would take, so nothing around it moves while it is put away. */
function Stand({
  width,
  height,
  style,
  testID,
}: {
  width?: SvgProps["width"];
  height?: SvgProps["height"];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}) {
  const flat = (StyleSheet.flatten(style) ?? {}) as ViewStyle;
  let w = width;
  let h = height;
  if (w === undefined && h === undefined && flat.position !== "absolute") {
    w = h = "100%";
  }
  const size: ViewStyle = {};
  if (w && h) {
    size.width = (typeof w === "number" || /%$/.test(String(w)) || isNaN(parseInt(String(w), 10)) ? w : parseInt(String(w), 10)) as ViewStyle["width"];
    size.height = (typeof h === "number" || /%$/.test(String(h)) || isNaN(parseInt(String(h), 10)) ? h : parseInt(String(h), 10)) as ViewStyle["height"];
    size.flex = 0;
  }
  return <View style={[style, size]} pointerEvents="none" testID={testID} />;
}

const Svg = forwardRef<RealSvg, SvgProps>(function Svg(props, ref) {
  const hidden = usePicturesAway();
  if (hidden) {
    return <Stand width={props.width} height={props.height} style={props.style as StyleProp<ViewStyle>} testID={props.testID} />;
  }
  return <RealSvg ref={ref} {...props} />;
});

export function SvgXml(props: XmlProps) {
  const hidden = usePicturesAway();
  if (hidden) {
    return <Stand width={props.width} height={props.height} style={props.style as StyleProp<ViewStyle>} testID={props.testID} />;
  }
  return <RealSvgXml {...props} />;
}

export { Svg };
export default Svg;
