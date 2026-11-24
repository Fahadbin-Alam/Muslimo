import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";
import { Camel } from "./Camel";

// What the learner sees while the app opens, in place of a plain white screen: the app's camel walking across a
// sand dune on the phone's own opening screen colour (app.json "splash" and "backgroundColor"), the app's name and
// three hopping dots. A tap on the camel plays one of its little shows, as on the path. It imports none of the
// lessons, so it shows before they are read. Its fonts are the phone's own, because the app's may still be loading.
// The walk and the dots move on the phone's drawing thread (useNativeDriver), so they keep moving while the app
// reads its lessons.

export const START_BACKGROUND = "#F4FBF7";
const SAND = "#F6D58E";
const SAND_DEEP = "#EBC172";
const CAMEL_SIZE = 110;
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
  const [width, setWidth] = useState(0);
  return (
    <View style={styles.screen} testID="start-screen" accessibilityLabel="Muslimo is opening" onLayout={(event) => setWidth(Math.round(event.nativeEvent.layout.width))}>
      <Text style={styles.name}>Muslimo</Text>
      <View style={styles.desert}>
        <View style={styles.sun} />
        <View style={styles.dune} />
        <View style={styles.duneFront} />
        {width > 0 ? (
          <Camel size={CAMEL_SIZE} wrapWidth={width} home={Math.round((width - CAMEL_SIZE) / 2)} walking tappable style={styles.camel} testID="start-camel" />
        ) : null}
      </View>
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
    overflow: "hidden"
  },
  name: { fontSize: 34, fontWeight: "900", color: "#1F2D27", letterSpacing: 0.5, marginBottom: 12 },
  desert: { alignSelf: "stretch", height: 170, overflow: "hidden" },
  sun: { position: "absolute", alignSelf: "center", top: 4, width: 96, height: 96, borderRadius: 48, backgroundColor: "#FFE08A", opacity: 0.7, marginLeft: 120 },
  // Two wide ovals, mostly below the band, show as gentle dunes.
  // Two big circles stretched wide, mostly below the band, show as gentle dunes.
  dune: { position: "absolute", left: -120, bottom: -205, width: 300, height: 300, borderRadius: 150, backgroundColor: SAND_DEEP, transform: [{ scaleX: 1.9 }] },
  duneFront: { position: "absolute", right: -160, bottom: -265, width: 340, height: 340, borderRadius: 170, backgroundColor: SAND, transform: [{ scaleX: 2.1 }] },
  camel: { position: "absolute", left: 0, bottom: 22 },
  dots: { flexDirection: "row", marginTop: 18, height: 24, alignItems: "flex-end" },
  dot: { width: 12, height: 12, borderRadius: 6, marginHorizontal: 5 },
  message: { marginTop: 14, fontSize: 16, fontWeight: "700", color: "#6A7A73", textAlign: "center" }
});
