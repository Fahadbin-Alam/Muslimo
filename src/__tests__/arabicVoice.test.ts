const mockVoices = jest.fn();
jest.mock("expo-speech", () => ({ getAvailableVoicesAsync: () => mockVoices() }));

import { arabicLetters, findArabicVoice, recitationForArabic, resetArabicVoiceForTests } from "../services/arabicVoice";
import { findTeacherVoice, knownTeacherVoice, speakable } from "../services/teacherVoice";

const AUDIO = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/";

beforeEach(() => {
  resetArabicVoiceForTests();
  mockVoices.mockReset();
});

describe("words that are a whole ayah play the reciter", () => {
  test("Al-hamdu lillahi rabbil-alamin is Quran 1:2, and Iyyaka na'budu is 1:5", () => {
    expect(recitationForArabic("الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ")).toBe(`${AUDIO}2.mp3`);
    expect(recitationForArabic("إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ")).toBe(`${AUDIO}5.mp3`);
  });

  test("a word from the ayah its card cites plays that ayah, and only when the word is really in it", () => {
    expect(recitationForArabic("الصِّرَاطَ الْمُسْتَقِيمَ", ["Quran 1:6"])).toBe(`${AUDIO}6.mp3`);
    expect(recitationForArabic("بِيَدِهِ الْمُلْكُ", [undefined, "Quran 67:1"])).toBe(`${AUDIO}5242.mp3`);
    expect(recitationForArabic("الصِّرَاطَ الْمُسْتَقِيمَ", ["Quran 1:7", "Sahih al-Bukhari 1"])).toBeNull();
    expect(recitationForArabic("نُوحٌ", ["Quran 11:37"])).toBeNull();
  });

  test("other words and parts of an ayah with no cited ayah get no recitation", () => {
    expect(recitationForArabic("السَّلَامُ عَلَيْكُمْ")).toBeNull();
    expect(recitationForArabic("الْحَمْدُ لِلَّهِ")).toBeNull();
  });

  test("the plain and Uthmani spellings of an ayah read as the same letters", () => {
    expect(arabicLetters("ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ")).toBe(arabicLetters("الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"));
  });
});

describe("the device's Arabic voice", () => {
  test("is never used, even on a device with one: a machine voice gets Arabic vowels and case endings wrong", async () => {
    mockVoices.mockResolvedValue([
      { identifier: "en-1", language: "en-US" },
      { identifier: "ar-1", language: "ar-SA" }
    ]);
    await expect(findArabicVoice()).resolves.toBeNull();
    mockVoices.mockResolvedValue([{ identifier: "en-1", language: "en-US" }]);
    await expect(findArabicVoice()).resolves.toBeNull();
  });
});

describe("the teacher's voice and Arabic", () => {
  test("has no Arabic voice, even on a device with one", async () => {
    mockVoices.mockResolvedValue([{ identifier: "ar-1", language: "ar-SA" }]);
    await expect(findTeacherVoice("ar")).resolves.toBeNull();
    expect(knownTeacherVoice("ar")).toBeUndefined();
  });

  test("the Urdu voice skips Quran, hadith and dua words quoted in Arabic, and keeps the Urdu", () => {
    const line = "نبی ﷺ نے فرمایا: أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ، یہ دعا تقریباً ہر شام پڑھو۔";
    const said = speakable(line, "ur");
    expect(said).not.toMatch(/أَعُوذُ|بِكَلِمَاتِ|التَّامَّاتِ|اللَّهِ/);
    expect(said).toContain("نبی");
    expect(said).toContain("صلی اللہ علیہ وسلم");
    expect(said).toContain("تقریباً");
    expect(said).toContain("دعا");
    expect(speakable("ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ سورہ فاتحہ کی آیت ہے", "ur")).toBe("سورہ فاتحہ کی آیت ہے");
  });
});
