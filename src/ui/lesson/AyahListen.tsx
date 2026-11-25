import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getAyahPlayback, playAyah, setAyahRepeat, stopAyah, subscribeAyahPlayback } from "../../services/ayahPlayer";
import { DEFAULT_RECITER, recitationOfUrl, reciterById } from "../../services/quranAudio";
import { AYAH_WORD_TIMES_CREDIT } from "../../services/ayahWords";
import { useOnline } from "../../services/network";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space } from "../theme";

/** Follows the shared ayah player, so every card shows whether its own ayah is the one playing. */
export function useAyahPlayback() {
  const [playback, setPlayback] = useState(getAyahPlayback);
  useEffect(() => subscribeAyahPlayback(setPlayback), []);
  return playback;
}

/**
 * Under an ayah: Listen (or Stop), a Repeat switch that keeps reciting it for memorizing, and who recites.
 * The recitation stops when the card leaves the screen. `timed`: the ayah's words light up as they are recited
 * (RecitedAyah), so the line also credits the word timings.
 */
export function AyahListen({ url, accent, timed = false }: { url: string; accent: string; timed?: boolean }) {
  const playback = useAyahPlayback();
  const online = useOnline();
  const mine = playback.url === url;
  const status = mine ? playback.status : "idle";
  const active = status === "playing" || status === "loading";

  useEffect(() => () => stopAyah(url), [url]);
  const credit = reciterCredit(url, online);

  return (
    <View testID="ayah-listen">
      <View style={styles.row}>
        <Tappable
          onPress={() => (active ? stopAyah(url) : playAyah(url))}
          style={[styles.button, { backgroundColor: accent }]}
          pressScale={0.94}
          accessibilityRole="button"
          accessibilityLabel={active ? t("Stop") : t("Listen")}
          testID="ayah-listen-play"
        >
          {status === "loading" ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : active ? (
            <View style={styles.stopSquare} />
          ) : (
            <Icon name="play" size={18} color={colors.white} />
          )}
          <Text style={styles.buttonText}>{active ? t("Stop") : t("Listen")}</Text>
        </Tappable>
        <Tappable
          onPress={() => setAyahRepeat(!playback.repeat)}
          style={[styles.toggle, playback.repeat ? { borderColor: accent, backgroundColor: colors.snow } : null]}
          pressScale={0.94}
          accessibilityRole="switch"
          accessibilityState={{ checked: playback.repeat }}
          accessibilityLabel={t("Repeat")}
          testID="ayah-listen-repeat"
        >
          <Icon name="repeat" size={18} color={playback.repeat ? accent : colors.inkSoft} />
          <Text style={[styles.toggleText, playback.repeat ? { color: accent } : null]}>{t("Repeat")}</Text>
        </Tappable>
      </View>
      {status === "error" ? (
        <Text style={styles.note} testID="ayah-listen-error">
          {online ? t("Could not load. Check your internet.") : t("No internet. This is not saved on your phone yet.")}
        </Text>
      ) : (
        <Text style={styles.note} testID="ayah-listen-credit">
          <Text>{credit}</Text>
          {timed ? <Text>{` · ${t("Word timing: {credit}", { credit: AYAH_WORD_TIMES_CREDIT })}`}</Text> : null}
        </Text>
      )}
    </View>
  );
}

/**
 * "Recited by Mishary Alafasy", and for a reciter from Quran Foundation also "· Quran Foundation", which its terms
 * ask for. With no internet a reciter that only streams is heard from the saved Alafasy copy, so the line says so.
 */
export function reciterCredit(url: string, online = true) {
  const picked = recitationOfUrl(url)?.reciter ?? reciterById(DEFAULT_RECITER);
  const heard = !online && !picked.savesOffline ? reciterById(DEFAULT_RECITER) : picked;
  const name = t("Recited by {name}", { name: t(heard.name) });
  return heard.savesOffline ? name : `${name} · ${heard.credit}`;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: space.sm
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.pill,
    minHeight: 40,
    paddingHorizontal: 14,
    marginEnd: space.sm,
    marginTop: 4
  },
  buttonText: {
    marginStart: 6,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white
  },
  stopSquare: {
    width: 13,
    height: 13,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: colors.white
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.line,
    minHeight: 40,
    paddingHorizontal: 12,
    marginTop: 4
  },
  toggleText: {
    marginStart: 5,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft
  },
  note: {
    marginTop: 6,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.inkSoft
  }
});
