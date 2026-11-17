import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { colors, space, text } from "../theme";
import { MascotSays, moodSound, useBackToClose, useOpenSound } from "./sheetParts";
import { t } from "../../i18n";
import { VIDEOS_PER_HEART } from "../../services/monetizationConfig";

export type RefillSheetProps = {
  visible: boolean;
  maxHearts: number;
  mascotVariant: string;
  /** Mascot color (topic accent). */
  accent?: string;
  onShop: () => void;
  /** Default: onShop. */
  onEndLesson?: () => void;
  /** The ghost button. Default "End lesson"; on the path, where no lesson is running, "Not now". */
  endLabel?: string;
  /**
   * The shop can give hearts now (enough gems for a heart item, or a store that sells
   * hearts or videos). When false GET HEARTS is left out, so the sheet never opens a shop that only
   * says "Need more gems". Default true.
   */
  canGetHearts?: boolean;
  /** PRACTICE, shown when no hearts can be had. Practice needs no hearts. */
  onPractice?: () => void;
  /**
   * FREE HEART plays one short video toward a heart (three videos make one), right here instead of in
   * the shop. Left out when videos can't play (no ads in this build, or premium).
   */
  onWatchVideo?: () => void;
  /** Videos already watched toward the next heart (0 to videosPerHeart - 1). */
  videosWatched?: number;
  videosPerHeart?: number;
  /**
   * UNLIMITED HEARTS opens the plans. Left out when this build cannot sell plans, the learner already
   * has Premium, or the learner is a child.
   */
  onPlans?: () => void;
  /** The video is loading or playing: its button spins and the other buttons wait. */
  videoBusy?: boolean;
  /** When the slow refill's next heart lands (ms since 1970). Left out: the line only says how the refill works. */
  nextHeartAt?: number;
};

/** "Next heart in 4 h 12 min": the time left, rounded up to the minute, so it never says 0 min too early. */
export function nextHeartLine(msLeft: number | undefined) {
  if (msLeft === undefined) return t("1 new heart every 5 hours");
  const minutes = Math.max(1, Math.ceil(msLeft / 60000));
  const hours = Math.floor(minutes / 60);
  return hours > 0
    ? t("Next heart in {hours} h {minutes} min", { hours, minutes: minutes % 60 })
    : t("Next heart in {minutes} min", { minutes });
}


/**
 * Out of hearts: the row of hearts stays empty. There is no free refill: hearts come back with videos, dates,
 * a heart pack, Premium, or the slow refill (one heart every 5 hours, regainHearts). Practice needs no hearts.
 */
export function RefillSheet({
  visible,
  maxHearts,
  mascotVariant,
  accent,
  onShop,
  onEndLesson,
  endLabel = t("End lesson"),
  canGetHearts = true,
  onPractice,
  onWatchVideo,
  videosWatched = 0,
  videosPerHeart = VIDEOS_PER_HEART,
  onPlans,
  videoBusy = false,
  nextHeartAt
}: RefillSheetProps) {
  // The countdown ticks while the sheet is open.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!visible) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, [visible]);
  const endLesson = onEndLesson ?? onShop;
  useBackToClose(visible && !videoBusy, endLesson);
  // Opens with its sad mascot's sound, like the app's other sad sheets (the test-out result). The lesson's
  // GOT IT that opens it stays quiet, so this is the one sound.
  useOpenSound(visible, moodSound("sad"), "out-of-hearts");

  // With no way to get hearts now, PRACTICE (or END LESSON) takes the big button instead of a dead-end shop.
  const practice = !canGetHearts && !onWatchVideo && onPractice;
  // While a video loads or plays, no other button may close the sheet under it.
  const unlessBusy = (action: () => void) => () => {
    if (!videoBusy) action();
  };

  return (
    <Sheet visible={visible} onClose={endLesson} dismissOnBackdrop={false} testID="refill-sheet">
      <View style={styles.stack}>
        <MascotSays variant={mascotVariant} mood="sad" accent={accent} line={t("Out of hearts!")} />
        <View style={styles.heartRow} accessibilityLabel={t("{count} of {max} hearts", { count: 0, max: maxHearts })} testID="refill-hearts">
          {Array.from({ length: maxHearts }, (_, index) => (
            <PopIn key={`empty-${index}`} delay={120 + index * 60}>
              <Icon name="heart" size={34} color={colors.lockedLip} />
            </PopIn>
          ))}
        </View>
          <>
            {/* True to regainHearts: one heart comes back every 5 hours. */}
            <Text style={styles.centerLine} testID="refill-next-heart">
              {nextHeartLine(typeof nextHeartAt === "number" ? Math.max(0, nextHeartAt - now) : undefined)}
            </Text>
            {onPlans ? (
              <GameButton
                label={t("Unlimited hearts")}
                icon="crown"
                variant="gold"
                fullWidth
                onPress={unlessBusy(onPlans)}
                accessibilityLabel={t("Unlimited hearts, see Premium")}
                testID="refill-plans"
              />
            ) : null}
            {onWatchVideo ? (
              <View
                style={styles.videoDots}
                accessibilityLabel={t("{count} of {total} videos watched", { count: videosWatched, total: videosPerHeart })}
                testID="refill-video-progress"
              >
                {Array.from({ length: videosPerHeart }, (_, index) => (
                  <View key={index} style={[styles.videoDot, index < videosWatched ? styles.videoDotDone : null]} testID={index < videosWatched ? "refill-video-dot-done" : "refill-video-dot"}>
                    <Icon name={index < videosWatched ? "check" : "play"} size={14} color={index < videosWatched ? colors.white : colors.goldLip} />
                  </View>
                ))}
                <Text style={styles.videoLine} numberOfLines={2}>
                  {t("{total} videos = 1 heart", { total: videosPerHeart })}
                </Text>
              </View>
            ) : null}
            {onWatchVideo ? (
              videoBusy ? (
                <View style={styles.videoBusy} accessibilityLabel={t("Loading video")} testID="refill-video-busy">
                  <ActivityIndicator color={colors.goldLip} />
                </View>
              ) : (
                <GameButton
                  label={t("Watch video {count} of {total}", { count: videosWatched + 1, total: videosPerHeart })}
                  icon="play"
                  variant={onPlans ? "blue" : "gold"}
                  fullWidth
                  onPress={onWatchVideo}
                  accessibilityLabel={t("Free heart, watch video {count} of {total}", { count: videosWatched + 1, total: videosPerHeart })}
                  testID="refill-video"
                />
              )
            ) : null}
            {canGetHearts ? (
              <GameButton
                label={t("Get hearts")}
                icon={onWatchVideo ? undefined : "heart"}
                variant={onWatchVideo ? "ghost" : undefined}
                color={onWatchVideo ? undefined : colors.heart}
                fullWidth
                onPress={unlessBusy(onShop)}
                testID="refill-get"
              />
            ) : practice ? (
              <GameButton label={t("Practice")} icon="practice" color={accent} fullWidth onPress={practice} testID="refill-practice" />
            ) : null}
            <GameButton
              label={endLabel}
              variant={canGetHearts || practice || onWatchVideo || onPlans ? "ghost" : "primary"}
              color={canGetHearts || practice || onWatchVideo || onPlans ? colors.inkSoft : accent}
              fullWidth
              onPress={unlessBusy(endLesson)}
              testID="refill-end"
            />
          </>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  centerLine: {
    ...text.bodyBold,
    textAlign: "center"
  },
  videoBusy: {
    height: 58,
    alignItems: "center",
    justifyContent: "center"
  },
  videoDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: space.xs
  },
  videoDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: colors.white
  },
  videoDotDone: {
    backgroundColor: colors.green,
    borderColor: colors.green
  },
  videoLine: {
    ...text.tiny,
    fontSize: 14,
    lineHeight: 19,
    marginLeft: space.xs,
    flexShrink: 1
  },
  heartRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: space.sm
  }
});
