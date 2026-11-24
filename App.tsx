import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { hydrateAppStorage } from "./src/services/appStorage";
import { prepareStartLanguage } from "./src/services/startLanguage";
import { installWebAlert } from "./src/services/webAlert";
import { useAppFonts } from "./src/ui/fonts";
import { PhoneFrame } from "./src/ui/PhoneFrame";
import { StartScreen } from "./src/ui/StartScreen";
import { CrashGuard } from "./src/ui/CrashGuard";

installWebAlert();

// Dev gallery: on web, open the app at #gallery (or #gallery-learn, #gallery-lesson, #gallery-more).
const SHOW_GALLERY =
  Platform.OS === "web" && typeof window !== "undefined" && window.location.hash.startsWith("#gallery");

type Screen = React.ComponentType;

// The app itself (TopicApp) builds the whole lesson list when it is first read, which takes a few seconds on a phone.
// It is read only after the start screen is on the phone, so the learner sees the camel instead of a white screen.
function readApp(): Screen {
  return SHOW_GALLERY ? require("./src/ui/gallery/Gallery").default : require("./src/TopicApp").default;
}

export default function App() {
  const [storageReady, setStorageReady] = useState(false);
  const [Main, setMain] = useState<Screen | null>(null);
  const fontsReady = useAppFonts();

  useEffect(() => {
    // The learner's language's lesson text is a file of its own, read before the first screen (startLanguage.ts).
    void hydrateAppStorage()
      .then(() => prepareStartLanguage())
      .catch(() => undefined)
      .then(() => setStorageReady(true));
    // Two frames on, so the start screen is surely drawn before the long read blocks the app.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const screen = readApp();
        setMain(() => screen);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Saved progress is read synchronously on first render, so wait for it to load from the device.
  if (!fontsReady || !storageReady || !Main) {
    return (
      <PhoneFrame>
        <StartScreen />
      </PhoneFrame>
    );
  }

  if (SHOW_GALLERY) {
    return (
      <PhoneFrame>
        <Main />
      </PhoneFrame>
    );
  }

  return (
    <SafeAreaProvider>
      <PhoneFrame>
        <CrashGuard>
          <Main />
        </CrashGuard>
      </PhoneFrame>
    </SafeAreaProvider>
  );
}
