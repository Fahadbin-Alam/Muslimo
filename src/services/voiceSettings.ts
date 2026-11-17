import { Linking, Platform } from "react-native";

/** Google's free speech engine on Google Play: a phone with no working voice can get one here. */
export const GOOGLE_SPEECH_ENGINE = "com.google.android.tts";

/** Android only: phones that have the voice settings page open it, the rest open Google's speech engine on Google Play. */
export const canOpenVoiceSettings = Platform.OS === "android";

/**
 * Opens the phone's text-to-speech settings (Android), where the learner picks a speech engine and adds a
 * language's voice. A phone without that page opens Google's speech engine on Google Play instead.
 */
export async function openVoiceSettings() {
  try {
    await Linking.sendIntent("com.android.settings.TTS_SETTINGS");
    return;
  } catch {
    // This phone has no such page: Google Play next.
  }
  try {
    await Linking.openURL(`market://details?id=${GOOGLE_SPEECH_ENGINE}`);
  } catch {
    await Linking.openURL(`https://play.google.com/store/apps/details?id=${GOOGLE_SPEECH_ENGINE}`).catch(() => undefined);
  }
}
