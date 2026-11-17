/**
 * Real day and night for the Learn path's sky. The phone's own clock already follows the learner's
 * timezone, so no location permission is needed: the timezone's name (for example "America/New_York")
 * gives a rough latitude, the calendar gives the season, and together they give a sunrise and sunset
 * that are close to the real ones (within about half an hour, which is all a picture of the sky needs).
 *
 * The sky goes through four looks: "dawn" (warm, sun low), "day", "dusk" (warm, sun low) and "night"
 * (dark sky, the moon). Nothing is shown at the exact minute: it is a gentle picture, not a prayer time.
 */

export type SkyTime = "dawn" | "day" | "dusk" | "night";

/** Minutes around sunrise and sunset that the sky looks warm. */
const DAWN_BEFORE = 40;
const DAWN_AFTER = 45;
const DUSK_BEFORE = 60;
const DUSK_AFTER = 30;

/** Rough latitudes of common timezones (their main city). */
const ZONE_LAT: Record<string, number> = {
  "America/New_York": 40.7, "America/Detroit": 42.3, "America/Toronto": 43.7, "America/Chicago": 41.9, "America/Denver": 39.7,
  "America/Phoenix": 33.4, "America/Los_Angeles": 34.1, "America/Vancouver": 49.3, "America/Edmonton": 53.5, "America/Winnipeg": 49.9,
  "America/Halifax": 44.6, "America/Anchorage": 61.2, "America/Mexico_City": 19.4, "America/Bogota": 4.7, "America/Lima": -12.0,
  "America/Caracas": 10.5, "America/Santiago": -33.4, "America/Sao_Paulo": -23.5, "America/Argentina/Buenos_Aires": -34.6,
  "America/Buenos_Aires": -34.6, "America/Guyana": 6.8, "America/Paramaribo": 5.9, "America/Port_of_Spain": 10.7, "Pacific/Honolulu": 21.3,
  "Europe/London": 51.5, "Europe/Dublin": 53.3, "Europe/Paris": 48.9, "Europe/Brussels": 50.8, "Europe/Amsterdam": 52.4,
  "Europe/Berlin": 52.5, "Europe/Madrid": 40.4, "Europe/Lisbon": 38.7, "Europe/Rome": 41.9, "Europe/Vienna": 48.2, "Europe/Zurich": 47.4,
  "Europe/Stockholm": 59.3, "Europe/Oslo": 59.9, "Europe/Copenhagen": 55.7, "Europe/Helsinki": 60.2, "Europe/Warsaw": 52.2,
  "Europe/Athens": 38.0, "Europe/Bucharest": 44.4, "Europe/Sofia": 42.7, "Europe/Sarajevo": 43.9, "Europe/Belgrade": 44.8,
  "Europe/Tirane": 41.3, "Europe/Skopje": 42.0, "Europe/Istanbul": 41.0, "Europe/Moscow": 55.8, "Europe/Kiev": 50.5, "Europe/Kyiv": 50.5,
  "Africa/Cairo": 30.0, "Africa/Casablanca": 33.6, "Africa/Algiers": 36.8, "Africa/Tunis": 36.8, "Africa/Tripoli": 32.9,
  "Africa/Khartoum": 15.6, "Africa/Mogadishu": 2.0, "Africa/Addis_Ababa": 9.0, "Africa/Nairobi": -1.3, "Africa/Dar_es_Salaam": -6.8,
  "Africa/Lagos": 6.5, "Africa/Dakar": 14.7, "Africa/Abidjan": 5.3, "Africa/Accra": 5.6, "Africa/Bamako": 12.6, "Africa/Niamey": 13.5,
  "Africa/Ndjamena": 12.1, "Africa/Kampala": 0.3, "Africa/Johannesburg": -26.2, "Africa/Djibouti": 11.6, "Africa/Nouakchott": 18.1,
  "Asia/Riyadh": 24.7, "Asia/Dubai": 25.2, "Asia/Qatar": 25.3, "Asia/Kuwait": 29.4, "Asia/Bahrain": 26.2, "Asia/Muscat": 23.6,
  "Asia/Aden": 12.8, "Asia/Baghdad": 33.3, "Asia/Tehran": 35.7, "Asia/Amman": 32.0, "Asia/Beirut": 33.9, "Asia/Damascus": 33.5,
  "Asia/Jerusalem": 31.8, "Asia/Gaza": 31.5, "Asia/Hebron": 31.5, "Asia/Baku": 40.4, "Asia/Tbilisi": 41.7, "Asia/Yerevan": 40.2,
  "Asia/Karachi": 24.9, "Asia/Kolkata": 22.6, "Asia/Calcutta": 22.6, "Asia/Dhaka": 23.8, "Asia/Kathmandu": 27.7, "Asia/Colombo": 6.9,
  "Asia/Kabul": 34.5, "Asia/Tashkent": 41.3, "Asia/Almaty": 43.2, "Asia/Bishkek": 42.9, "Asia/Dushanbe": 38.6, "Asia/Ashgabat": 37.9,
  "Asia/Jakarta": -6.2, "Asia/Makassar": -5.1, "Asia/Kuala_Lumpur": 3.1, "Asia/Singapore": 1.3, "Asia/Brunei": 4.9, "Asia/Manila": 14.6,
  "Asia/Bangkok": 13.8, "Asia/Yangon": 16.8, "Asia/Ho_Chi_Minh": 10.8, "Asia/Shanghai": 31.2, "Asia/Urumqi": 43.8, "Asia/Hong_Kong": 22.3,
  "Asia/Taipei": 25.0, "Asia/Tokyo": 35.7, "Asia/Seoul": 37.6, "Indian/Maldives": 4.2, "Indian/Mauritius": -20.2,
  "Australia/Sydney": -33.9, "Australia/Melbourne": -37.8, "Australia/Brisbane": -27.5, "Australia/Perth": -31.9,
  "Australia/Adelaide": -34.9, "Pacific/Auckland": -36.8
};

/** When a timezone isn't in the list: a rough latitude for its part of the world. */
const REGION_LAT: Record<string, number> = { America: 35, Europe: 50, Africa: 10, Asia: 28, Australia: -32, Pacific: -20, Indian: -5, Atlantic: 40 };
const DEFAULT_LAT = 30;

/** The phone's timezone name, or "" if the phone can't say. */
export function phoneTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

/** A rough latitude for a timezone name. */
export function latitudeForZone(zone: string): number {
  if (zone in ZONE_LAT) return ZONE_LAT[zone];
  const region = zone.split("/")[0];
  return region in REGION_LAT ? REGION_LAT[region] : DEFAULT_LAT;
}

/** Day of the year, 1..366, on the phone's calendar. */
function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.floor((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - start.getTime()) / 86400000) + 1;
}

/** 1 when the phone's clock is moved forward for summer on `date` (daylight saving), else 0. */
export function summerHour(date: Date) {
  const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  if (jan === jul) return 0;
  return date.getTimezoneOffset() < Math.max(jan, jul) ? 1 : 0;
}

/** Sunrise and sunset on `date`, in minutes after the phone's midnight. */
export function sunTimes(date: Date, latitude: number) {
  // The sun's tilt for the day of the year (degrees), then the half-day length from the latitude.
  const tilt = -23.44 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear(date) + 10));
  const rad = Math.PI / 180;
  // -0.83 degrees: the sun's top edge just touching the horizon.
  const cosH = (Math.sin(-0.83 * rad) - Math.sin(latitude * rad) * Math.sin(tilt * rad)) / (Math.cos(latitude * rad) * Math.cos(tilt * rad));
  const halfDay = cosH <= -1 ? 12 * 60 : cosH >= 1 ? 0 : (Math.acos(cosH) / rad / 15) * 60;
  // The sun is highest near 12:00 in the middle of a timezone, moved a few minutes by the season (the
  // "equation of time": about 16 minutes early in November, 14 late in February), and an hour later in summer time.
  const b = ((2 * Math.PI) / 364) * (dayOfYear(date) - 81);
  const early = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const noon = 12 * 60 - early + summerHour(date) * 60;
  return { sunrise: noon - halfDay, sunset: noon + halfDay };
}

/** How the sky looks at `date`, for a place at `latitude`. */
export function skyTimeAt(date: Date, latitude: number = latitudeForZone(phoneTimeZone())): SkyTime {
  const { sunrise, sunset } = sunTimes(date, latitude);
  const minute = date.getHours() * 60 + date.getMinutes();
  // Midnight sun or polar night: the whole day is one look.
  if (sunset - sunrise >= 24 * 60 - 1) return "day";
  if (sunset - sunrise <= 1) return "night";
  if (minute < sunrise - DAWN_BEFORE) return "night";
  if (minute < sunrise + DAWN_AFTER) return "dawn";
  if (minute < sunset - DUSK_BEFORE) return "day";
  if (minute < sunset + DUSK_AFTER) return "dusk";
  return "night";
}

/** The phone's time for the sky. Tests set `globalThis.__SKY_NOW__` to hold a fixed time. */
export function skyNow(): Date {
  const fixed = (globalThis as { __SKY_NOW__?: () => Date }).__SKY_NOW__;
  return fixed ? fixed() : new Date();
}
