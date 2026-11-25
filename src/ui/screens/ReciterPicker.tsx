import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAyahPlayback, playAyah, stopAyah, subscribeAyahPlayback } from "../../services/ayahPlayer";
import { RECITERS, reciterAyahUrl, reciterById, setReciterId, useReciterId } from "../../services/quranAudio";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
import { LinkRow } from "./sheetParts";

/** The ayah each reciter says when its play button is tapped: Al-Fatihah 1:2. */
const SAMPLE = { surah: 1, ayah: 2 } as const;

/**
 * Settings row: who recites the Quran ayahs in lessons, the daily ayah and the adhkar. Tapping it opens the list;
 * tapping a reciter picks it at once (no Save, like the path scenery), and the play button says a sample ayah.
 * Kept on this phone only. Recite and memorize questions follow Mishary Alafasy's words, so they keep him.
 */
export function ReciterPicker() {
  const chosen = useReciterId();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(
    () =>
      subscribeAyahPlayback((playback) => {
        setPlaying(playback.status === "loading" || playback.status === "playing" ? playback.url : null);
      }),
    []
  );
  // A sample still playing stops when the list closes.
  useEffect(() => {
    if (!open) {
      const now = getAyahPlayback();
      if (now.url && RECITERS.some((reciter) => reciterAyahUrl(SAMPLE, reciter.id) === now.url)) stopAyah(now.url);
    }
  }, [open]);

  return (
    <View testID="settings-reciter">
      <LinkRow label={t("Quran reciter")} value={t(reciterById(chosen).name)} icon="quran" onPress={() => setOpen(!open)} testID="settings-reciter-open" />
      {open ? (
        <View style={styles.list} testID="settings-reciter-list">
          {RECITERS.map((reciter) => {
            const active = reciter.id === chosen;
            const sample = reciterAyahUrl(SAMPLE, reciter.id);
            const sampling = playing === sample;
            return (
              <View key={reciter.id} style={[styles.row, active ? styles.rowActive : null]}>
                <Tappable
                  onPress={() => setReciterId(reciter.id)}
                  pressScale={0.98}
                  style={styles.name}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: active }}
                  accessibilityLabel={t(reciter.name)}
                  testID={`settings-reciter-${reciter.id}`}
                >
                  <View style={[styles.dot, active ? styles.dotActive : null]}>{active ? <Icon name="check" size={14} color={colors.white} /> : null}</View>
                  <Text style={[styles.nameText, active ? styles.nameTextActive : null]}>{t(reciter.name)}</Text>
                </Tappable>
                <Tappable
                  onPress={() => (sampling ? stopAyah(sample) : playAyah(sample, { once: true }))}
                  pressScale={0.92}
                  hitSlop={6}
                  style={styles.play}
                  accessibilityRole="button"
                  accessibilityLabel={`${sampling ? t("Stop") : t("Listen")}, ${t(reciter.name)}`}
                  testID={`settings-reciter-play-${reciter.id}`}
                >
                  {sampling ? <View style={styles.stopSquare} /> : <Icon name="play" size={16} color={colors.white} />}
                </Tappable>
              </View>
            );
          })}
          <Text style={styles.hint}>
            {t("Words light up with Mishary Alafasy, who also says the recite and memorize questions. With no internet, his saved recitation plays.")}
          </Text>
          <Text style={styles.credit}>{t("Other reciters: audio from Quran Foundation")}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: space.xs,
    paddingBottom: space.md
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    paddingHorizontal: space.sm,
    minHeight: 48
  },
  rowActive: {
    borderColor: colors.green,
    backgroundColor: colors.correctBg
  },
  name: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    minHeight: 44
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center"
  },
  dotActive: {
    borderColor: colors.green,
    backgroundColor: colors.green
  },
  nameText: {
    ...text.body,
    flexShrink: 1
  },
  nameTextActive: {
    fontFamily: fonts.displayHeavy
  },
  play: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  stopSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.white
  },
  hint: {
    ...text.small,
    textAlign: "center",
    marginTop: space.xs
  },
  credit: {
    ...text.tiny,
    textAlign: "center"
  }
});
