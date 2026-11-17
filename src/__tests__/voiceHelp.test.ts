const mockSpeak = jest.fn();
const mockStop = jest.fn(() => Promise.resolve());
jest.mock("expo-speech", () => ({ speak: (...args: unknown[]) => mockSpeak(...args), stop: () => mockStop() }));

import { resetTeacherVoiceForTests, setVoiceHelp, speakTeacherParts, stopTeacher, VOICE_START_MS } from "../services/teacherVoice";

describe("a speaker on a phone whose voice never starts", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSpeak.mockReset();
    mockStop.mockClear();
    resetTeacherVoiceForTests();
  });
  afterEach(() => {
    setVoiceHelp(null);
    jest.useRealTimers();
  });

  it("says why, and ends the reading, when the voice stays silent", () => {
    const help = jest.fn();
    const onEnd = jest.fn();
    setVoiceHelp(help);
    speakTeacherParts(["Salam.", "Peace."], "en", "", { onEnd });
    jest.advanceTimersByTime(VOICE_START_MS - 1);
    expect(help).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(help).toHaveBeenCalledWith("silent", "en");
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("says nothing when the voice starts", () => {
    const help = jest.fn();
    setVoiceHelp(help);
    mockSpeak.mockImplementation((_text: string, options: { onStart?: () => void }) => options.onStart?.());
    speakTeacherParts(["Salam."], "bn", "bn-voice");
    jest.advanceTimersByTime(VOICE_START_MS * 2);
    expect(help).not.toHaveBeenCalled();
  });

  it("says nothing when the learner stops it first", () => {
    const help = jest.fn();
    setVoiceHelp(help);
    speakTeacherParts(["Salam."], "en", "");
    stopTeacher();
    jest.advanceTimersByTime(VOICE_START_MS * 2);
    expect(help).not.toHaveBeenCalled();
  });

  it("says why when the voice fails before it starts, or the speech module is missing", () => {
    const help = jest.fn();
    setVoiceHelp(help);
    mockSpeak.mockImplementationOnce((_text: string, options: { onError?: () => void }) => options.onError?.());
    speakTeacherParts(["Salam."], "ar", "ar-voice");
    expect(help).toHaveBeenCalledTimes(1);
    mockSpeak.mockImplementationOnce(() => {
      throw new Error("no native module");
    });
    speakTeacherParts(["Salam."], "ur", "ur-voice");
    expect(help).toHaveBeenLastCalledWith("silent", "ur");
    jest.advanceTimersByTime(VOICE_START_MS * 2);
    expect(help).toHaveBeenCalledTimes(2);
  });
});
