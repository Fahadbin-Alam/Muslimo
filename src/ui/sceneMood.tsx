import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Animated, AppState, Easing, View, type StyleProp, type ViewStyle } from "react-native";
import { sampleCurve, useReduceMotion } from "./motion";
import { Floater, Word } from "./reactions";
import { skyNow, skyTimeAt, type SkyTime } from "../services/skyClock";

/**
 * Day and night on the Learn path. The sky follows the phone's own clock (and so the learner's
 * timezone): warm at sunrise and sunset, dark with the moon at night (see services/skyClock.ts).
 * Tapping the sun still turns it into the moon and the sky goes dark; tapping the moon brings the
 * day back, until the real sky changes again. If nobody touches the screen for a while, night falls by
 * itself and everyone on the path (the kid, the camel, the sheep) goes to sleep; any touch wakes them.
 */

/** How long the path waits without a touch before everyone falls asleep. */
export const IDLE_MS = 30000;
/** How long the sky takes to go dark or light again. */
export const DUSK_MS = 900;
/** How often the real time is looked at again (a cheap check; the sky only changes a few times a day). */
export const SKY_CHECK_MS = 60000;

export type SceneMood = {
  /** The sky is dark: it is night where the learner is, the learner picked night, or everyone fell asleep. */
  night: boolean;
  /** The real sky is at sunrise or sunset: clear skies look warm, the sun low. */
  twilight: boolean;
  /** The real time of day on the phone: dawn, day, dusk or night. */
  skyTime: SkyTime;
  /** Nobody touched the screen for a while: everyone sleeps. */
  asleep: boolean;
  /** 0 by day, 1 at night; eases between them (native driver). */
  dark: Animated.Value;
  /** The learner turns night on or off (the sun or the moon was tapped), until the real sky changes. */
  setNight: (night: boolean) => void;
  /** A touch or a scroll: wakes everyone and restarts the idle clock. */
  wake: () => void;
  /** 0..1 clock of the last ground bump (a meteor landing): the whole path shakes for a moment. */
  quake: Animated.Value;
  /** Shakes the whole path once, then everything settles back. */
  rumble: () => void;
};

const DAYLIGHT = new Animated.Value(0);
const STILL = new Animated.Value(0);
const SceneContext = createContext<SceneMood>({ night: false, twilight: false, skyTime: "day", asleep: false, dark: DAYLIGHT, setNight: () => undefined, wake: () => undefined, quake: STILL, rumble: () => undefined });

/** How long the path shakes after a meteor lands. */
export const QUAKE_MS = 650;

/** The path's sideways shake for a quake clock: a few quick swings that die away. */
export function quakeShift(quake: Animated.Value) {
  return quake.interpolate(sampleCurve(0, 1, 40, (p) => (p >= 1 ? 0 : 7 * (1 - p) * Math.sin(p * Math.PI * 9))));
}

export function useScene() {
  return useContext(SceneContext);
}

export type SceneProviderProps = {
  children: ReactNode;
  /** Follow the phone's real time of day. Off: always day until the sun is tapped. */
  clock?: boolean;
  /** Watch for an idle screen. Off: nobody ever falls asleep by themselves. */
  idle?: boolean;
  idleMs?: number;
  /** Filled with `wake`, for a parent that sees activity the touch watcher can't (a wheel scroll). */
  wakeRef?: { current: (() => void) | null };
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/** Holds day/night for everything inside it, and wakes everyone on any touch inside it. */
export function SceneProvider({ children, clock = true, idle = true, idleMs = IDLE_MS, wakeRef, style, testID }: SceneProviderProps) {
  const [skyTime, setSkyTime] = useState<SkyTime>(() => (clock ? skyTimeAt(skyNow()) : "day"));
  // What the learner picked by tapping the sun or the moon; null: the real sky.
  const [picked, setPicked] = useState<boolean | null>(null);
  const [asleep, setAsleep] = useState(false);
  const dark = useRef(new Animated.Value(skyTime === "night" ? 1 : 0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sleeping = useRef(false);
  const reduceMotion = useReduceMotion();

  const arm = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (!idle) return;
    timer.current = setTimeout(() => {
      sleeping.current = true;
      setAsleep(true);
    }, idleMs);
  }, [idle, idleMs]);

  const wake = useCallback(() => {
    if (sleeping.current) {
      sleeping.current = false;
      setAsleep(false);
    }
    arm();
  }, [arm]);

  if (wakeRef) wakeRef.current = wake;

  useEffect(() => {
    arm();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [arm]);

  // The real sky: looked at again every minute, and when the app comes back from the background.
  useEffect(() => {
    if (!clock) {
      setSkyTime("day");
      return undefined;
    }
    const check = () => setSkyTime(skyTimeAt(skyNow()));
    check();
    const timer = setInterval(check, SKY_CHECK_MS);
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") check();
    });
    return () => {
      clearInterval(timer);
      sub.remove();
    };
  }, [clock]);
  // When the real sky changes (sunset, sunrise), it takes over again from the learner's tap.
  const realNight = skyTime === "night";
  useEffect(() => {
    setPicked(null);
  }, [realNight]);

  const night = (picked ?? realNight) || asleep;
  const twilight = !night && picked === null && (skyTime === "dawn" || skyTime === "dusk");
  useEffect(() => {
    const animation = Animated.timing(dark, { toValue: night ? 1 : 0, duration: reduceMotion ? 0 : DUSK_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [night, dark, reduceMotion]);

  const setNight = useCallback((value: boolean) => {
    setPicked(value === realNight ? null : value);
    // Picking day while everyone sleeps wakes them too.
    if (!value && sleeping.current) {
      sleeping.current = false;
      setAsleep(false);
    }
  }, [realNight]);

  const quake = useRef(new Animated.Value(0)).current;
  const rumble = useCallback(() => {
    if (reduceMotion) return;
    quake.setValue(0);
    Animated.timing(quake, { toValue: 1, duration: QUAKE_MS, easing: Easing.linear, useNativeDriver: true }).start();
  }, [quake, reduceMotion]);

  const value = useMemo<SceneMood>(() => ({ night, twilight, skyTime, asleep, dark, setNight, wake, quake, rumble }), [night, twilight, skyTime, asleep, dark, setNight, wake, quake, rumble]);
  return (
    <SceneContext.Provider value={value}>
      <View
        style={style}
        testID={testID}
        // Sees every touch that starts inside, without taking it from the buttons.
        onStartShouldSetResponderCapture={() => {
          wake();
          return false;
        }}
      >
        {children}
      </View>
    </SceneContext.Provider>
  );
}

/** A view that shakes with the scene's quakes (see `rumble`). Takes the props of a View. */
export function QuakeView({ style, ...rest }: React.ComponentProps<typeof View>) {
  const { quake } = useScene();
  return <Animated.View {...rest} style={[style, { transform: [{ translateX: quakeShift(quake) }] }]} />;
}

/** A looping clock for the snoring Zs. */
function useSnoreClock(active: boolean) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    value.setValue(0);
    if (!active) return undefined;
    // Wrapped in a sequence: a lone native-driver timing loops natively, which the web preview can't do.
    const loop = Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration: 2400, easing: Easing.linear, useNativeDriver: true })]));
    loop.start();
    return () => loop.stop();
  }, [active, value]);
  return value;
}

/** Little Zs floating up from a sleeper's head, over and over. `x`, `y`: where the head is. */
export function Snooze({ x, y, size = 14, color = "#F2F5FF" }: { x: number; y: number; size?: number; color?: string }) {
  const reduceMotion = useReduceMotion();
  const t = useSnoreClock(!reduceMotion);
  if (reduceMotion) {
    return (
      <View pointerEvents="none" style={{ position: "absolute", left: x, top: y - size }}>
        <Word size={size} color={color}>z</Word>
      </View>
    );
  }
  return (
    <>
      {[0, 0.33, 0.66].map((from, index) => (
        <Floater key={from} t={t} from={from} to={from + 0.34} x={x + index * size * 0.35} y={y - index * size * 0.2} rise={size * 1.6} drift={size * 0.7}>
          <Word size={size * (0.75 + index * 0.2)} color={color}>Z</Word>
        </Floater>
      ))}
    </>
  );
}
