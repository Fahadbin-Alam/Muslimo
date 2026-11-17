import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { latitudeForZone, skyTimeAt, sunTimes, summerHour } from "../services/skyClock";
import { PathWeather } from "../ui/PathWeather";
import { SKY_CHECK_MS, SceneProvider, useScene } from "../ui/sceneMood";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const g = globalThis as { __SKY_NOW__?: () => Date };
const midday = g.__SKY_NOW__;

/** A local time on the phone's calendar. */
const at = (month: number, day: number, hour: number, minute = 0) => new Date(2026, month - 1, day, hour, minute);

describe("the real sky's clock", () => {
  it("puts sunrise and sunset close to the real ones", () => {
    // Real times (no summer clock change in these places): Dhaka, Riyadh, Karachi, Jakarta.
    const places = [
      { lat: 23.8, date: at(11, 17, 12), rise: 6 * 60 + 15, set: 17 * 60 + 13 },
      { lat: 24.7, date: at(6, 21, 12), rise: 5 * 60 + 5, set: 18 * 60 + 40 },
      { lat: 24.9, date: at(12, 21, 12), rise: 7 * 60 + 15, set: 17 * 60 + 47 },
      { lat: -6.2, date: at(3, 20, 12), rise: 5 * 60 + 58, set: 18 * 60 + 5 },
      // New York on Fahad's evening (winter clock): 6:46 AM to 4:44 PM.
      { lat: 40.7, date: at(11, 16, 12), rise: 6 * 60 + 46, set: 16 * 60 + 44 }
    ];
    for (const place of places) {
      const { sunrise, sunset } = sunTimes(place.date, place.lat);
      // The timezone's middle stands in for the city (Karachi sits half an hour west of its zone's middle).
      expect(Math.abs(sunset - sunrise - (place.set - place.rise))).toBeLessThan(15);
      expect(Math.abs(sunrise - place.rise)).toBeLessThan(40);
      expect(Math.abs(sunset - place.set)).toBeLessThan(40);
    }
  });

  it("is night at 8:15 PM in November and in the small hours, day at noon", () => {
    const newYork = latitudeForZone("America/New_York");
    expect(skyTimeAt(at(11, 16, 20, 15), newYork)).toBe("night");
    expect(skyTimeAt(at(11, 16, 2, 0), newYork)).toBe("night");
    expect(skyTimeAt(at(11, 16, 12, 0), newYork)).toBe("day");
    expect(skyTimeAt(at(11, 16, 20, 15), latitudeForZone("Asia/Dhaka"))).toBe("night");
    expect(skyTimeAt(at(11, 16, 20, 15), latitudeForZone("Europe/London"))).toBe("night");
  });

  it("goes warm around sunrise and sunset", () => {
    const lat = latitudeForZone("Asia/Dhaka");
    const { sunrise, sunset } = sunTimes(at(11, 17, 12), lat);
    const minute = (m: number) => at(11, 17, Math.floor(m / 60), Math.floor(m % 60));
    expect(skyTimeAt(minute(sunrise + 10), lat)).toBe("dawn");
    expect(skyTimeAt(minute(sunset - 20), lat)).toBe("dusk");
    expect(skyTimeAt(minute(sunset + 60), lat)).toBe("night");
  });

  it("knows a timezone's part of the world, even when the city isn't listed", () => {
    expect(latitudeForZone("Australia/Sydney")).toBeLessThan(0);
    expect(latitudeForZone("Europe/Nowhere")).toBeGreaterThan(40);
    expect(latitudeForZone("")).toBe(30);
  });

  it("a southern summer evening is still light when a northern one is dark", () => {
    const sydney = latitudeForZone("Australia/Sydney");
    const london = latitudeForZone("Europe/London");
    // 6:30 PM on the shortest northern day, with no clock change counted.
    const evening = at(12, 21, 18, 30);
    const extra = summerHour(evening);
    expect(sunTimes(evening, sydney).sunset - extra * 60).toBeGreaterThan(sunTimes(evening, london).sunset - extra * 60 + 3 * 60);
  });
});

let seen = { night: false, twilight: false, skyTime: "" };
/** Writes down what the scene says about the sky. */
function Peek() {
  const { night, twilight, skyTime } = useScene();
  seen = { night, twilight, skyTime };
  return null;
}
const peek = () => seen;

describe("the Learn path's sky follows the phone's time", () => {
  let now = at(6, 15, 12);
  beforeEach(() => {
    jest.useFakeTimers();
    g.__SKY_NOW__ = () => now;
  });
  afterEach(() => {
    jest.useRealTimers();
    g.__SKY_NOW__ = midday;
  });

  const scene = () => (
    <SceneProvider idle={false}>
      <Peek />
      <PathWeather weather="sunny" width={390} height={700} />
    </SceneProvider>
  );

  it("shows the moon at night, not the sun", async () => {
    now = at(11, 16, 20, 15);
    await render(scene());
    expect(peek().night).toBe(true);
    expect(screen.getByLabelText("moon")).toBeTruthy();
  });

  it("shows the sun by day, and turns to night when the evening comes", async () => {
    now = at(11, 16, 12, 0);
    await render(scene());
    expect(peek().night).toBe(false);
    expect(screen.getByLabelText("sun")).toBeTruthy();
    now = at(11, 16, 21, 0);
    await act(async () => {
      jest.advanceTimersByTime(SKY_CHECK_MS);
    });
    expect(peek().night).toBe(true);
    expect(screen.getByLabelText("moon")).toBeTruthy();
  });

  it("makes a sunny sky a sunset one around the real sunset", async () => {
    const lat = 30;
    const { sunset } = sunTimes(at(11, 16, 12), lat);
    now = at(11, 16, Math.floor((sunset - 20) / 60), Math.floor((sunset - 20) % 60));
    // The test machine's zone (UTC) has no city, so the sky uses latitude 30.
    expect(skyTimeAt(now)).toBe("dusk");
    await render(scene());
    expect(peek().twilight).toBe(true);
    expect(screen.getByTestId("weather-sunny")).toBeTruthy();
  });

  it("a tap on the moon still brings the day back, until the real sky changes again", async () => {
    now = at(11, 16, 22, 0);
    await render(scene());
    // The moon's looks (full, gibbous, half), then day.
    for (let tap = 0; tap < 4 && peek().night; tap += 1) {
      await fireEvent.press(screen.getByLabelText("moon"));
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });
    }
    expect(peek().night).toBe(false);
    // Morning comes: the real day, and the tap no longer matters.
    now = at(11, 17, 12, 0);
    await act(async () => {
      jest.advanceTimersByTime(SKY_CHECK_MS);
    });
    expect(peek().night).toBe(false);
    // Night again: the real night takes over.
    now = at(11, 17, 22, 0);
    await act(async () => {
      jest.advanceTimersByTime(SKY_CHECK_MS);
    });
    expect(peek().night).toBe(true);
  });
});
