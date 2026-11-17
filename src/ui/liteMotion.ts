import { useSyncExternalStore } from "react";
import { AppState, PixelRatio, Platform } from "react-native";

/**
 * Lite motion for slower phones: the moving pictures keep their life but lighter (the camera drift holds still and
 * each picture keeps only its first two moving things), so a cheap phone never stutters. Calm mode in Settings and
 * the phone's own "reduce motion" go further and stop the motion; this only trims it.
 *
 * A phone counts as slow when it is an old or low-resolution Android, or when the app is seen drawing too slowly:
 * the frames are watched for a few seconds now and then while the app is open (not just once at start-up, when a
 * phone may still be busy loading), and a phone found slow is remembered, so the next start is light from the first
 * screen.
 */
const listeners = new Set<() => void>();
let lite: boolean | undefined;
let sampled = false;

const STORE_KEY = "sira-path-lite-motion" as const;
/** First look this long after start-up, then again every SAMPLE_EVERY_MS, at most SAMPLES times. */
const FIRST_SAMPLE_MS = 8000;
const SAMPLE_EVERY_MS = 40000;
const SAMPLES = 6;
const SAMPLE_MS = 2500;

/** Old Android (before 9) or a low-density screen: the phones that struggle most. */
export function looksLikeSlowPhone(os: string = Platform.OS, version: unknown = Platform.Version, density: number = PixelRatio.get()) {
  if (os !== "android") return false;
  const api = typeof version === "number" ? version : Number(version);
  return (Number.isFinite(api) && api < 28) || density < 2;
}

/** Frame gaps in ms → too slow? The middle gap tells, so one hiccup does not count. */
export function framesLookSlow(gaps: number[]) {
  if (gaps.length < 20) return false;
  const sorted = [...gaps].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] > 25;
}

/**
 * Frame gaps in ms → choppy? A quarter of the frames taking two frames' time or more (under 30 a second) is a
 * stutter a learner sees even when the middle frame is fine. Seen twice, it counts as a slow phone.
 */
export function framesLookChoppy(gaps: number[]) {
  if (gaps.length < 20) return false;
  const sorted = [...gaps].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length * 0.75)] > 33;
}

function storage(): typeof import("../services/appStorage") | null {
  try {
    return require("../services/appStorage") as typeof import("../services/appStorage");
  } catch {
    return null;
  }
}

function publish(value: boolean) {
  if (lite === value) return;
  lite = value;
  for (const listener of listeners) listener();
}

/** Found slow: lighter from now on, and from the first screen next time. */
function markSlow() {
  publish(true);
  try {
    storage()?.setStoredItem(STORE_KEY, "1");
  } catch {
    // Kept for this run.
  }
}

function rememberedSlow() {
  try {
    return storage()?.getStoredItem(STORE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Watches SAMPLE_MS of frames now and then while the app is in front (phones only): a slow middle frame once, or
 * choppy frames twice, turns lite motion on. Stops looking once it is on.
 */
function sampleFrames() {
  if (sampled || Platform.OS === "web" || process.env.NODE_ENV === "test" || typeof requestAnimationFrame !== "function") return;
  sampled = true;
  let looks = 0;
  let choppy = 0;
  const look = () => {
    if (lite) return;
    if (rememberedSlow()) {
      publish(true);
      return;
    }
    // Only while the app is in front: frames stop while it is in the background.
    if (AppState.currentState !== "active") {
      setTimeout(look, SAMPLE_EVERY_MS);
      return;
    }
    looks += 1;
    const gaps: number[] = [];
    let last = 0;
    const started = Date.now();
    const tick = (now: number) => {
      if (last) gaps.push(now - last);
      last = now;
      if (Date.now() - started < SAMPLE_MS) {
        requestAnimationFrame(tick);
        return;
      }
      if (framesLookChoppy(gaps)) choppy += 1;
      if (framesLookSlow(gaps) || choppy >= 2) markSlow();
      else if (looks < SAMPLES) setTimeout(look, SAMPLE_EVERY_MS);
    };
    requestAnimationFrame(tick);
  };
  setTimeout(look, FIRST_SAMPLE_MS);
}

export function isLiteMotion() {
  if (lite === undefined) {
    lite = looksLikeSlowPhone() || (Platform.OS !== "web" && rememberedSlow());
    sampleFrames();
  }
  return lite;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** True on a slow phone: draw moving pictures lighter. */
export function useLiteMotion() {
  return useSyncExternalStore(subscribe, isLiteMotion, isLiteMotion);
}

/** For tests. */
export function setLiteMotionForTests(value: boolean | undefined) {
  sampled = true;
  lite = value;
  for (const listener of listeners) listener();
}

/** How many moving things a picture keeps in lite motion. */
export const LITE_LIFE = 2;
