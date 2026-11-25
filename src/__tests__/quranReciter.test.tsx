import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { QURAN_AYAHS } from "../data/quranAyahs";

// A small fake of the phone's file storage: a map from file uri to its size.
const mockFiles = new Map<string, number>();
const mockDownload = jest.fn<Promise<void>, [string]>(() => Promise.resolve());
jest.mock("expo-file-system", () => {
  const join = (parts: unknown[]) => parts.map((part) => (typeof part === "string" ? part : (part as { uri: string }).uri)).join("/");
  class Directory {
    uri: string;
    constructor(...parts: unknown[]) {
      this.uri = join(parts);
    }
    get exists() {
      return [...mockFiles.keys()].some((uri) => uri.startsWith(`${this.uri}/`));
    }
    create() {}
    delete() {
      [...mockFiles.keys()].filter((uri) => uri.startsWith(`${this.uri}/`)).forEach((uri) => mockFiles.delete(uri));
    }
  }
  class File {
    uri: string;
    constructor(...parts: unknown[]) {
      this.uri = join(parts);
    }
    get name() {
      return this.uri.slice(this.uri.lastIndexOf("/") + 1);
    }
    get exists() {
      return mockFiles.has(this.uri);
    }
    get size() {
      return mockFiles.get(this.uri) ?? 0;
    }
    delete() {
      mockFiles.delete(this.uri);
    }
    move(destination: File) {
      mockFiles.set(destination.uri, mockFiles.get(this.uri) ?? 0);
      mockFiles.delete(this.uri);
      this.uri = destination.uri;
    }
    static async downloadFileAsync(url: string, destination: File) {
      await mockDownload(url);
      mockFiles.set(destination.uri, 100_000);
      return destination;
    }
  }
  return { Directory, File, Paths: { document: new Directory("file:///docs") } };
});

type Status = { playing: boolean; didJustFinish: boolean; isLoaded?: boolean; duration?: number };
const mockCreatePlayer = jest.fn();
jest.mock("expo-audio", () => ({
  setAudioModeAsync: () => Promise.resolve(),
  createAudioPlayer: (source: string) => {
    let listener: (status: Status) => void = () => undefined;
    const player = {
      source,
      loop: false,
      play: jest.fn(),
      pause: jest.fn(),
      replace: jest.fn((next: string) => {
        player.source = next;
      }),
      seekTo: jest.fn(() => Promise.resolve()),
      addListener: jest.fn((_event: string, next: (status: Status) => void) => {
        listener = next;
        return { remove: jest.fn() };
      }),
      emit: (status: Status) => listener({ isLoaded: true, duration: 6, ...status })
    };
    mockCreatePlayer(player);
    return player;
  }
}));

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import { localAyahUri, offlineAyahUri, saveAyahForOffline } from "../services/offlineAudio";
import { playAyah, resetAyahPlayerForTests } from "../services/ayahPlayer";
import { resetNetworkForTests, setOnline } from "../services/network";
import {
  RECITERS,
  getReciterId,
  isTimedRecitation,
  quranAudioUrl,
  recitationOfUrl,
  resetReciterForTests,
  setReciterId
} from "../services/quranAudio";
import { fitsRecitation } from "../ui/lesson/RecitedAyah";
import { reciterCredit } from "../ui/lesson/AyahListen";
import { ReciterPicker } from "../ui/screens/ReciterPicker";
import { lessonAyahUrls } from "../services/offlineLessons";
import { recitationForArabic } from "../services/arabicVoice";
import { setActiveLanguage } from "../i18n";

const ALAFASY_2 = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3";
const SUDAIS_2 = "https://verses.quran.com/Sudais/mp3/001002.mp3";
const SAVED_2 = "file:///docs/quran-audio-alafasy-128/2.mp3";

beforeEach(() => {
  mockFiles.clear();
  mockDownload.mockReset();
  mockDownload.mockImplementation(() => Promise.resolve());
  mockCreatePlayer.mockClear();
  resetAyahPlayerForTests();
  resetReciterForTests();
  resetNetworkForTests(true);
  setActiveLanguage("en");
});

afterEach(() => {
  resetAyahPlayerForTests();
});

describe("reciter urls", () => {
  test("Alafasy stays the default, with the same urls as before", () => {
    expect(getReciterId()).toBe("alafasy");
    expect(quranAudioUrl("Quran 1:2")).toBe(ALAFASY_2);
    expect(quranAudioUrl("Quran 114:6")).toBe("https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3");
  });

  test("a picked reciter's urls use surah and ayah, 3 digits each", () => {
    setReciterId("sudais");
    expect(quranAudioUrl("Quran 1:2")).toBe(SUDAIS_2);
    expect(quranAudioUrl("Quran 2:255")).toBe("https://verses.quran.com/Sudais/mp3/002255.mp3");
    expect(quranAudioUrl("Quran 1:2", "alafasy")).toBe(ALAFASY_2);
    expect(quranAudioUrl("Quran 6:84-86")).toBeNull();
  });

  test("every reciter's url reads back as that reciter and ayah", () => {
    for (const reciter of RECITERS) {
      for (const key of ["1:1", "2:255", "67:2", "114:6"]) {
        const url = quranAudioUrl(`Quran ${key}`, reciter.id) as string;
        const found = recitationOfUrl(url);
        expect(found?.reciter.id).toBe(reciter.id);
        expect(`${found?.key.surah}:${found?.key.ayah}`).toBe(key);
      }
    }
    expect(recitationOfUrl("https://example.org/2.mp3")).toBeNull();
    expect(recitationOfUrl("https://verses.quran.com/Sudais/mp3/115001.mp3")).toBeNull();
  });

  test("only reciters the app may keep on the phone are Alafasy's source; the rest are Quran Foundation", () => {
    expect(RECITERS.filter((reciter) => reciter.savesOffline).map((reciter) => reciter.id)).toEqual(["alafasy"]);
    RECITERS.filter((reciter) => !reciter.savesOffline).forEach((reciter) => {
      expect(reciter.credit).toBe("Quran Foundation");
      expect(reciter.urlTemplate.startsWith("https://verses.quran.com/")).toBe(true);
    });
  });

  test("the pick is kept until changed again", () => {
    setReciterId("minshawi");
    expect(getReciterId()).toBe("minshawi");
    setReciterId("alafasy");
    expect(getReciterId()).toBe("alafasy");
  });
});

describe("what follows the reciter and what keeps Alafasy", () => {
  test("words light up only with Alafasy", () => {
    expect(isTimedRecitation(ALAFASY_2)).toBe(true);
    expect(isTimedRecitation(SUDAIS_2)).toBe(false);
    const text = QURAN_AYAHS["1:2"];
    expect(fitsRecitation(text, [{ key: "1:2", url: ALAFASY_2 }])).toBe(true);
    expect(fitsRecitation(text, [{ key: "1:2", url: SUDAIS_2 }])).toBe(false);
  });

  test("lessons save Alafasy ahead for offline, whoever is picked", () => {
    setReciterId("shatri");
    expect(lessonAyahUrls({ quote: { text: "x", reference: "Quran 1:2" } } as never)).toEqual([ALAFASY_2]);
  });

  test("the word speaker plays the picked reciter", () => {
    setReciterId("rifai");
    expect(recitationForArabic("x", ["Quran 1:2"])).toBeNull();
    const url = recitationForArabic(QURAN_AYAHS["1:2"]);
    expect(url).toBe("https://verses.quran.com/Rifai/mp3/001002.mp3");
  });
});

describe("offline", () => {
  test("a streaming reciter is never saved, and with no internet plays the saved Alafasy copy", async () => {
    expect(await saveAyahForOffline(SUDAIS_2)).toBe(false);
    expect(offlineAyahUri(SUDAIS_2)).toBeNull();
    await saveAyahForOffline(ALAFASY_2);
    expect(localAyahUri(SUDAIS_2)).toBeNull();
    expect(offlineAyahUri(SUDAIS_2)).toBe(SAVED_2);

    // Online it streams the picked reciter, even with Alafasy saved.
    playAyah(SUDAIS_2);
    expect(mockCreatePlayer.mock.calls[0][0].source).toBe(SUDAIS_2);

    resetAyahPlayerForTests();
    mockCreatePlayer.mockClear();
    setOnline(false);
    playAyah(SUDAIS_2);
    expect(mockCreatePlayer.mock.calls[0][0].source).toBe(SAVED_2);
  });

  test("a streamed Quran Foundation ayah is not kept on the phone", async () => {
    playAyah(SUDAIS_2);
    const player = mockCreatePlayer.mock.calls[0][0];
    await act(async () => {
      player.emit({ playing: true, didJustFinish: false });
    });
    expect(mockDownload).not.toHaveBeenCalled();
    expect([...mockFiles.keys()]).toEqual([]);
  });
});

describe("credit line and Settings", () => {
  test("credits the reciter, and Quran Foundation for its reciters", () => {
    expect(reciterCredit(ALAFASY_2)).toBe("Recited by Mishary Alafasy");
    expect(reciterCredit(SUDAIS_2)).toBe("Recited by Abdur-Rahman as-Sudais · Quran Foundation");
    expect(reciterCredit(SUDAIS_2, false)).toBe("Recited by Mishary Alafasy");
  });

  test("reciter names are in Bangla, Urdu and Arabic", () => {
    for (const language of ["bn", "ur", "ar"] as const) {
      setActiveLanguage(language);
      for (const reciter of RECITERS) {
        expect(reciterCredit(quranAudioUrl("Quran 1:1", reciter.id) as string)).not.toContain(reciter.name);
      }
    }
  });

  test("picking a reciter in Settings changes it at once, and its sample plays", async () => {
    await render(<ReciterPicker />);
    expect(screen.getByTestId("settings-reciter-open")).toHaveTextContent(/Mishary Alafasy/);
    expect(screen.queryByTestId("settings-reciter-list")).toBeNull();
    await fireEvent.press(screen.getByTestId("settings-reciter-open"));
    await fireEvent.press(screen.getByTestId("settings-reciter-minshawi"));
    expect(getReciterId()).toBe("minshawi");
    expect(screen.getByTestId("settings-reciter-open")).toHaveTextContent(/Minshawi/);
    expect(quranAudioUrl("Quran 1:2")).toBe("https://verses.quran.com/Minshawi/Murattal/mp3/001002.mp3");

    await fireEvent.press(screen.getByTestId("settings-reciter-play-abdulbasit"));
    expect(mockCreatePlayer.mock.calls[0][0].source).toBe("https://verses.quran.com/AbdulBaset/Murattal/mp3/001002.mp3");
    // Playing a sample does not change the pick.
    expect(getReciterId()).toBe("minshawi");
  });
});
