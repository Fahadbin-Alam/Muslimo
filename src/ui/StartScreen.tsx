import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, Platform, StyleSheet, Text, View } from "react-native";

// What the learner sees while the app opens, in place of a plain white screen: the camel on the phone's own opening
// screen colour (app.json "splash" and "backgroundColor"), the app's name, and three dots that keep hopping.
// It imports nothing of the app itself, so it shows before the lessons are read. Its fonts are the phone's own,
// because the app's fonts may still be loading. The dots move on the phone's drawing thread (useNativeDriver), so
// they keep moving while the app reads its lessons.

export const START_BACKGROUND = "#F4FBF7";
const CAMEL = require("../../assets/splash-icon.png");
const DOT_COLORS = ["#21B573", "#FFC21A", "#FF8A1F"];

function HoppingDots() {
  const hops = useRef(DOT_COLORS.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    const native = Platform.OS !== "web";
    const loops = hops.map((hop, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 160),
          Animated.timing(hop, { toValue: 1, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: native }),
          Animated.timing(hop, { toValue: 0, duration: 320, easing: Easing.in(Easing.quad), useNativeDriver: native }),
          Animated.delay((DOT_COLORS.length - 1 - index) * 160 + 200)
        ])
      )
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [hops]);
  return (
    <View style={styles.dots}>
      {hops.map((hop, index) => (
        <Animated.View
          key={DOT_COLORS[index]}
          style={[styles.dot, { backgroundColor: DOT_COLORS[index], transform: [{ translateY: hop.interpolate({ inputRange: [0, 1], outputRange: [0, -9] }) }] }]}
        />
      ))}
    </View>
  );
}

export function StartScreen({ message }: { message?: string }) {
  return (
    <View style={styles.screen} testID="start-screen" accessibilityLabel="Muslimo is opening">
      <Image source={CAMEL} style={styles.camel} resizeMode="contain" />
      <Text style={styles.name}>Muslimo</Text>
      <HoppingDots />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: START_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  camel: { width: 240, height: 240, marginTop: -40 },
  name: { marginTop: -28, fontSize: 30, fontWeight: "900", color: "#1F2D27", letterSpacing: 0.5 },
  dots: { flexDirection: "row", marginTop: 18, height: 24, alignItems: "flex-end" },
  dot: { width: 12, height: 12, borderRadius: 6, marginHorizontal: 5 },
  message: { marginTop: 14, fontSize: 16, fontWeight: "700", color: "#6A7A73", textAlign: "center" }
});
