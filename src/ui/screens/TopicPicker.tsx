import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, View, type DimensionValue } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText, hasQuranMarks, isArabicOnly } from "../ArabicText";
import { Icon, topicIcon, type IconName } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { ScholarTree } from "./ScholarTree";
import { colors, darken, fonts, lighten, text, topicPalette } from "../theme";
import { getActiveLanguage, isRtlLanguage, t } from "../../i18n";
import { isContentHit, type SearchHit } from "../../utils/appSearch";
import type { ContentHit } from "../../utils/contentSearch";
import type { TopicSearchHit } from "../../utils/topicSearch";

export type TopicPickerUnit = {
  id: string;
  title: string;
  arabic?: ArabicTerm;
  done: number;
  total: number;
  /** On a family tree (Scholars): the unit's row, oldest first, with its years and who it learned from. */
  tree?: { row: number; years: string; note: string };
};

export type TopicPickerTopic = {
  topicId: string;
  title: string;
  accent: string;
  arabic?: ArabicTerm;
  done: number;
  total: number;
  /**
   * The topic's sub-topics (a companion, a surah). With two or more, tapping the tile opens their list, and the
   * learner picks one to learn on its own, or the whole topic.
   */
  units?: TopicPickerUnit[];
};

export type TopicPickerProps = {
  visible: boolean;
  onClose: () => void;
  topics: TopicPickerTopic[];
  activeTopicId: string;
  /** The sub-topic the path shows on its own, if any. */
  activeUnitId?: string;
  /** A tile or sub-topic row (unitId), or a search hit: a unit hit names its unit and first circle, a lesson hit its unit and circle. */
  onSelect: (topicId: string, unitId?: string, nodeId?: string) => void;
  /**
   * Finds topics, units and lessons, and the hadith and ayahs lessons teach, for the search field (appSearch.ts).
   * Without it there is no search field.
   */
  search?: (query: string) => SearchHit[];
  /** Called when the search field is touched, so the search can get ready before the first letter. */
  prepareSearch?: () => void;
  /** Opened from the top bar's magnifier: the field is ready to type in, with a few searches to try. */
  startSearching?: boolean;
  /** Opens a hadith's or ayah's source at its words. Without it there is no source button. */
  onOpenSource?: (source: NonNullable<ContentHit["source"]>) => void;
  /** Gap above the sheet. Default 40. */
  topGap?: number;
  /** Bottom safe-area inset; tiles scroll to the screen edge and clear it. Default 0. */
  bottomInset?: number;
};

/** Topic emblem: the topic's own icon (Fasting has the dates the Prophet ﷺ broke his fast with). */
export function worldIcon(topicId: string): IconName {
  return topicIcon(topicId);
}

const GAP = 12;
/** Dark brown label on gold, as in the kit's gold GameButton. */
const GOLD_INK = darken(colors.goldLip, 0.52);

function TopicTile({ topic, active, width, onPress }: { topic: TopicPickerTopic; active: boolean; width: DimensionValue; onPress: () => void }) {
  const palette = topicPalette(topic.accent);
  const progress = topic.total > 0 ? topic.done / topic.total : 0;
  const finished = topic.total > 0 && topic.done >= topic.total;
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.95}
      accessibilityLabel={t("{topic}, {done} of {total}", { topic: topic.title, done: topic.done, total: topic.total })}
      accessibilityState={{ selected: active }}
      testID={`topic-tile-${topic.topicId}`}
      style={[styles.tile, { width }, active ? styles.tileActive : null]}
    >
      <View style={[styles.emblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
        <Icon name={worldIcon(topic.topicId)} size={38} />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {topic.title}
      </Text>
      {topic.arabic ? (
        // Never cut: a long name drops a size and may wrap (web ignores adjustsFontSizeToFit).
        <ArabicText size={topic.arabic.ar.length > 12 ? 15 : 18} weight="bold" color={palette.ink} style={styles.arabic}>
          {topic.arabic.ar}
        </ArabicText>
      ) : null}
      {finished ? (
        <View style={styles.donePill} testID={`topic-done-${topic.topicId}`}>
          <Icon name="crown" size={18} color={colors.white} />
          <Text style={styles.doneText}>{t("DONE")}</Text>
        </View>
      ) : (
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={palette.main} height={8} style={styles.bar} />
          <Text style={styles.count} numberOfLines={1}>{`${topic.done}/${topic.total}`}</Text>
        </View>
      )}
      {active ? (
        <View style={styles.activeBadge}>
          <Icon name="check" size={14} color={colors.white} />
        </View>
      ) : null}
    </Tappable>
  );
}

/** One search hit: its topic's emblem, its name, and where it sits (topic, or unit and topic). */
function SearchRow({ hit, topic, onPress }: { hit: TopicSearchHit; topic?: TopicPickerTopic; onPress: () => void }) {
  const palette = topicPalette(topic?.accent ?? colors.gem);
  const title = hit.kind === "topic" ? topic?.title ?? t(hit.title) : t(hit.title);
  const where = hit.kind === "topic" ? t("Topic") : hit.unitTitle ? `${t(hit.unitTitle)} · ${topic?.title ?? ""}` : topic?.title ?? "";
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={`${title}, ${where}`}
      testID={`topic-search-hit-${hit.nodeId ?? hit.unitId ?? hit.topicId}`}
      style={styles.hit}
    >
      <View style={[styles.hitEmblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
        <Icon name={worldIcon(hit.topicId)} size={24} />
      </View>
      <View style={styles.hitText}>
        <Text style={styles.hitTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.hitWhere} numberOfLines={1}>
          {where}
        </Text>
      </View>
      <Icon name="chevronRight" size={20} color={colors.inkSoft} />
    </Tappable>
  );
}

/** How long typing must pause before the hits change, so each letter shows at once even on a slow phone. */
export const SEARCH_PAUSE_MS = 150;

/** Searches to try, shown under an empty field: a hadith number, an ayah, a word, a person and a lesson. */
const SEARCH_EXAMPLES: Record<string, string[]> = {
  en: ["Bukhari 1", "2:255", "Patience", "Abu Bakr", "Wudu"],
  bn: ["বুখারী ১", "2:255", "ধৈর্য", "আবু বকর", "অজু"],
  ur: ["بخاری 1", "2:255", "صبر", "ابو بکر", "وضو"],
  ar: ["البخاري 1", "2:255", "الصبر", "أبو بكر", "الوضوء"],
  id: ["Bukhari 1", "2:255", "Sabar", "Abu Bakar", "Wudu"]
};

/**
 * A hadith or ayah hit: its book and number (or surah and ayah), its words, and the lesson that teaches it. A tap
 * opens it in place, in full, with its source and the way to its lesson.
 */
function ContentRow({
  hit,
  topic,
  open,
  onToggle,
  onGoToLesson,
  onOpenSource
}: {
  hit: ContentHit;
  topic?: TopicPickerTopic;
  open: boolean;
  onToggle: () => void;
  onGoToLesson: () => void;
  onOpenSource?: (source: NonNullable<ContentHit["source"]>) => void;
}) {
  const palette = topicPalette(topic?.accent ?? colors.gem);
  const words = t(hit.text);
  const arabic = isArabicOnly(words);
  const meaning = hit.meaning ? t(hit.meaning) : undefined;
  const reference = t(hit.reference);
  const lesson = `${t(hit.lessonTitle)}${hit.unitTitle ? ` · ${t(hit.unitTitle)}` : ""}`;
  const tag = hit.kind === "hadith" ? t("Hadith") : t("Ayah");
  const key = hit.id;
  return (
    <View style={[styles.hit, styles.contentHit, open ? styles.contentHitOpen : null]} testID={`search-content-${key}`}>
      <Tappable
        onPress={onToggle}
        sound="node_tap"
        pressScale={0.98}
        accessibilityLabel={`${tag}, ${reference}. ${arabic && meaning ? meaning : words}`}
        accessibilityState={{ expanded: open }}
        testID={`search-content-toggle-${key}`}
        style={styles.contentTop}
      >
        <View style={styles.contentHead}>
          <View style={[styles.kindPill, { backgroundColor: hit.kind === "hadith" ? palette.main : colors.gem }]}>
            <Icon name={hit.kind === "hadith" ? "bookOpen" : "quran"} size={14} color={colors.white} />
            <Text style={styles.kindText}>{tag}</Text>
          </View>
          <Text style={styles.reference} numberOfLines={1}>
            {reference}
          </Text>
          <View style={open ? styles.chevronOpen : null}>
            <Icon name="chevronDown" size={18} color={colors.inkSoft} />
          </View>
        </View>
        {arabic ? (
          <ArabicText quran={hasQuranMarks(words)} size={20} align="right" numberOfLines={open ? undefined : 2} style={styles.contentArabic}>
            {words}
          </ArabicText>
        ) : (
          <Text style={styles.contentWords} numberOfLines={open ? undefined : 3}>
            {words}
          </Text>
        )}
        {meaning && (open || arabic) ? (
          <Text style={styles.contentWords} numberOfLines={open ? undefined : 2}>
            {meaning}
          </Text>
        ) : null}
        {open && (hit.from || hit.grade) ? (
          <Text style={styles.hitWhere}>{[hit.from ? t("Narrated by {name}", { name: t(hit.from) }) : "", hit.grade ? t(hit.grade) : ""].filter(Boolean).join(" · ")}</Text>
        ) : null}
        {!open ? (
          <Text style={styles.hitWhere} numberOfLines={1}>
            {lesson}
          </Text>
        ) : null}
      </Tappable>
      {open ? (
        <View style={styles.contentActions}>
          <Tappable
            onPress={onGoToLesson}
            sound="node_tap"
            pressScale={0.96}
            accessibilityLabel={t("Go to the lesson: {lesson}", { lesson })}
            testID={`search-content-lesson-${key}`}
            style={[styles.actionButton, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}
          >
            <Icon name={worldIcon(hit.topicId)} size={18} />
            <Text style={[styles.actionText, { color: colors.white }]} numberOfLines={2}>
              {t("Go to the lesson: {lesson}", { lesson: t(hit.lessonTitle) })}
            </Text>
          </Tappable>
          {hit.source?.url && onOpenSource ? (
            <Tappable
              onPress={() => hit.source && onOpenSource(hit.source)}
              sound="node_tap"
              pressScale={0.96}
              accessibilityLabel={t("Read it in the source")}
              testID={`search-content-source-${key}`}
              style={[styles.actionButton, styles.sourceButton]}
            >
              <Icon name="globe" size={16} color={colors.gemLip} />
              <Text style={[styles.actionText, { color: colors.gemLip }]} numberOfLines={1}>
                {t("Read it in the source")}
              </Text>
            </Tappable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

function UnitRow({ unit, accent, active, onPress }: { unit: TopicPickerUnit; accent: string; active: boolean; onPress: () => void }) {
  const palette = topicPalette(accent);
  const finished = unit.total > 0 && unit.done >= unit.total;
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={t("{topic}, {done} of {total}", { topic: unit.title, done: unit.done, total: unit.total })}
      accessibilityState={{ selected: active }}
      testID={`topic-unit-${unit.id}`}
      style={[styles.unitRow, active ? styles.tileActive : null]}
    >
      <View style={styles.unitText}>
        <Text style={styles.unitTitle} numberOfLines={2}>
          {unit.title}
        </Text>
        {unit.arabic ? (
          <ArabicText size={15} weight="bold" color={palette.ink} style={styles.unitArabic}>
            {unit.arabic.ar}
          </ArabicText>
        ) : null}
      </View>
      {finished ? (
        <Icon name="crown" size={22} color={colors.goldLip} />
      ) : (
        <View style={styles.unitProgress}>
          <ProgressBar progress={unit.total > 0 ? unit.done / unit.total : 0} color={palette.main} height={8} style={styles.bar} />
          <Text style={styles.count} numberOfLines={1}>{`${unit.done}/${unit.total}`}</Text>
        </View>
      )}
    </Tappable>
  );
}

/** A topic's sub-topics: the whole topic first, then each unit (a companion, a surah) to learn on its own. */
function UnitList({
  topic,
  activeUnitId,
  onPick,
  topics,
  onPickElsewhere
}: {
  topic: TopicPickerTopic;
  activeUnitId?: string;
  onPick: (unitId?: string) => void;
  topics: TopicPickerTopic[];
  onPickElsewhere: (topicId: string, unitId: string) => void;
}) {
  const palette = topicPalette(topic.accent);
  return (
    <View testID={`topic-units-${topic.topicId}`}>
      <Tappable
        onPress={() => onPick(undefined)}
        sound="node_tap"
        pressScale={0.97}
        accessibilityLabel={t("All of {topic}", { topic: topic.title })}
        accessibilityState={{ selected: !activeUnitId }}
        testID="topic-unit-all"
        style={[styles.unitRow, styles.allRow, { backgroundColor: palette.main, borderColor: palette.lip, borderBottomColor: palette.lip }]}
      >
        <Icon name={worldIcon(topic.topicId)} size={30} />
        <Text style={[styles.unitTitle, styles.allTitle]} numberOfLines={2}>
          {t("All of {topic}", { topic: topic.title })}
        </Text>
      </Tappable>
      {(topic.units ?? []).every((unit) => unit.tree) ? (
        <ScholarTree
          units={topic.units ?? []}
          onPick={onPick}
          onPickElsewhere={onPickElsewhere}
          findElsewhere={(topicId, unitId) => {
            const other = topics.find((item) => item.topicId === topicId);
            const unit = other?.units?.find((item) => item.id === unitId);
            return other && unit ? { title: unit.title, topicTitle: other.title } : undefined;
          }}
        />
      ) : (
        (topic.units ?? []).map((unit) => (
          <UnitRow key={unit.id} unit={unit} accent={topic.accent} active={unit.id === activeUnitId} onPress={() => onPick(unit.id)} />
        ))
      )}
    </View>
  );
}

/** Full-height sheet with a search field and a grid of topic worlds; while the field has text, its hits replace the grid. */
export function TopicPicker({
  visible,
  onClose,
  topics,
  activeTopicId,
  activeUnitId,
  onSelect,
  search,
  prepareSearch,
  startSearching = false,
  onOpenSource,
  topGap = 40,
  bottomInset = 0
}: TopicPickerProps) {
  const [gridWidth, setGridWidth] = useState(0);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  // The hit opened in full (a hadith or ayah), if any.
  const [openHit, setOpenHit] = useState<string | undefined>(undefined);
  const input = useRef<TextInput>(null);
  // Typing never waits for the search: the letters show at once, and the hits follow a moment after the last one.
  const [searched, setSearched] = useState("");
  useEffect(() => {
    if (!query.trim()) {
      setSearched("");
      return undefined;
    }
    const timer = setTimeout(() => setSearched(query), SEARCH_PAUSE_MS);
    return () => clearTimeout(timer);
  }, [query]);
  const hits = useMemo(() => (search && query.trim() && searched.trim() ? search(searched) : undefined), [query, searched, search]);
  // The first letters typed hide the grid at once, before their hits come.
  const waitingForHits = Boolean(search && query.trim() && !hits);
  const topicById = useMemo(() => new Map(topics.map((topic) => [topic.topicId, topic])), [topics]);
  const rtl = isRtlLanguage();
  // The topic whose sub-topics are listed; the grid shows again each time the sheet opens.
  const [openTopicId, setOpenTopicId] = useState<string | undefined>(undefined);

  // Each opening starts on the grid.
  useEffect(() => {
    if (!visible) {
      setQuery("");
      setOpenTopicId(undefined);
      setOpenHit(undefined);
      return;
    }
    if (startSearching && search) {
      prepareSearch?.();
      // After the sheet's slide starts, so the keyboard comes up with it.
      const timer = setTimeout(() => input.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, startSearching]);
  useEffect(() => setOpenHit(undefined), [searched]);
  const openTopic = topics.find((topic) => topic.topicId === openTopicId);
  const columns = gridWidth > 0 && gridWidth < 260 ? 1 : 2;
  const tileWidth: DimensionValue = gridWidth > 0 ? Math.floor((gridWidth - GAP * (columns - 1)) / columns) : "47%";

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="topic-picker">
      <View style={styles.header}>
        {openTopic ? (
          <Tappable onPress={() => setOpenTopicId(undefined)} accessibilityLabel={t("Back")} testID="topic-picker-back" style={[styles.close, styles.back]} hitSlop={8} pressScale={0.88}>
            <Icon name="arrowLeft" size={22} color={colors.inkSoft} />
          </Tappable>
        ) : null}
        <Text style={styles.heading} numberOfLines={2}>
          {openTopic ? openTopic.title : startSearching ? t("Search") : t("Choose a topic")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="topic-picker-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      {search ? (
        <View style={[styles.searchBox, focused ? styles.searchBoxFocused : null]}>
          <Icon name="search" size={20} />
          <TextInput
            ref={input}
            value={query}
            onChangeText={setQuery}
            onFocus={() => {
              setFocused(true);
              prepareSearch?.();
            }}
            onBlur={() => setFocused(false)}
            placeholder={t("Search hadith, ayahs, topics, lessons")}
            placeholderTextColor={colors.inkSoft}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            accessibilityLabel={t("Search hadith, ayahs, topics, lessons")}
            testID="topic-search"
            style={[styles.searchInput, { textAlign: rtl ? "right" : "left", writingDirection: rtl ? "rtl" : "ltr" }]}
          />
          {query ? (
            <Tappable onPress={() => setQuery("")} accessibilityLabel={t("Clear search")} testID="topic-search-clear" hitSlop={8} pressScale={0.88} style={styles.searchClear}>
              <Icon name="close" size={14} color={colors.white} />
            </Tappable>
          ) : null}
        </View>
      ) : null}
      {search && !query.trim() && (focused || startSearching) ? (
        <View style={styles.examples} testID="search-examples">
          <Text style={styles.examplesLabel}>{t("Try:")}</Text>
          {(SEARCH_EXAMPLES[getActiveLanguage()] ?? SEARCH_EXAMPLES.en).map((example) => (
            <Tappable
              key={example}
              onPress={() => {
                prepareSearch?.();
                setQuery(example);
              }}
              sound="node_tap"
              pressScale={0.94}
              accessibilityLabel={t("Search {text}", { text: example })}
              testID={`search-example-${example}`}
              style={styles.example}
            >
              <Text style={styles.exampleText}>{example}</Text>
            </Tappable>
          ))}
        </View>
      ) : null}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 + bottomInset }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {waitingForHits ? (
          <View testID="topic-search-waiting" />
        ) : hits ? (
          <View style={styles.hits} testID="topic-search-results">
            {hits.length ? (
              hits.map((hit) =>
                isContentHit(hit) ? (
                  <ContentRow
                    key={hit.id}
                    hit={hit}
                    topic={topicById.get(hit.topicId)}
                    open={openHit === hit.id}
                    onToggle={() => setOpenHit((current) => (current === hit.id ? undefined : hit.id))}
                    onGoToLesson={() => {
                      onSelect(hit.topicId, hit.unitId, hit.nodeId);
                      onClose();
                    }}
                    onOpenSource={onOpenSource}
                  />
                ) : (
                  <SearchRow
                    key={`${hit.kind}-${hit.nodeId ?? hit.unitId ?? hit.topicId}`}
                    hit={hit}
                    topic={topicById.get(hit.topicId)}
                    onPress={() => {
                      onSelect(hit.topicId, hit.unitId, hit.nodeId);
                      onClose();
                    }}
                  />
                )
              )
            ) : (
              <Text style={styles.noHits} testID="topic-search-empty">
                {t("Nothing found. Try other words, or a hadith number like Bukhari 1.")}
              </Text>
            )}
          </View>
        ) : openTopic ? (
          <UnitList
            topic={openTopic}
            activeUnitId={openTopic.topicId === activeTopicId ? activeUnitId : undefined}
            onPick={(unitId) => {
              onSelect(openTopic.topicId, unitId);
              onClose();
            }}
            topics={topics}
            onPickElsewhere={(topicId, unitId) => {
              onSelect(topicId, unitId);
              onClose();
            }}
          />
        ) : (
          <View style={styles.grid} onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)}>
            {topics.map((topic) => (
              <TopicTile
                key={topic.topicId}
                topic={topic}
                width={tileWidth}
                active={topic.topicId === activeTopicId}
                onPress={() => {
                  if ((topic.units?.length ?? 0) > 1) {
                    setOpenTopicId(topic.topicId);
                    return;
                  }
                  onSelect(topic.topicId);
                  onClose();
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingTop: 14
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  heading: {
    ...text.h2,
    flex: 1,
    minWidth: 0
  },
  back: {
    marginEnd: 10
  },
  unitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 64,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: colors.lineLip,
    borderRadius: 18,
    backgroundColor: colors.white
  },
  allRow: {
    justifyContent: "flex-start"
  },
  unitText: {
    flex: 1,
    minWidth: 0
  },
  unitTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    flexShrink: 1
  },
  allTitle: {
    flex: 1,
    color: colors.white
  },
  unitArabic: {
    alignSelf: "flex-start",
    maxWidth: "100%"
  },
  unitProgress: {
    flexDirection: "row",
    alignItems: "center",
    width: 96
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist
  },
  scroll: {
    flex: 1
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist
  },
  searchBoxFocused: {
    borderColor: colors.gem,
    backgroundColor: colors.white
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
    marginHorizontal: 10,
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
    // The box border shows focus; no browser focus ring.
    ...(Platform.OS === "web" ? ({ outlineWidth: 0, outlineStyle: "none" } as object) : null)
  },
  searchClear: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.inkSoft
  },
  hits: {
    gap: 10
  },
  hit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  hitEmblem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  hitText: {
    flex: 1,
    minWidth: 0
  },
  hitTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink
  },
  hitWhere: {
    marginTop: 2,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.inkSoft
  },
  contentHit: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 0,
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  contentHitOpen: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip
  },
  contentTop: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6
  },
  contentHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  kindPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999
  },
  kindText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    lineHeight: 16,
    color: colors.white
  },
  reference: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 19,
    color: colors.ink
  },
  contentWords: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink
  },
  chevronOpen: {
    transform: [{ rotate: "180deg" }]
  },
  contentArabic: {
    alignSelf: "stretch"
  },
  contentActions: {
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 12
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderBottomWidth: 4
  },
  sourceButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip
  },
  actionText: {
    flexShrink: 1,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 19,
    textAlign: "center"
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginTop: -2,
    marginBottom: 12
  },
  examplesLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.inkSoft
  },
  example: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 3,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  exampleText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: colors.gemLip
  },
  noHits: {
    ...text.body,
    marginTop: 24,
    textAlign: "center",
    color: colors.inkSoft
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    minHeight: 1
  },
  tile: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: colors.lineLip,
    borderRadius: 18,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 12
  },
  tileActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.92)
  },
  emblem: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginTop: 8,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    textAlign: "center",
    flexShrink: 1,
    maxWidth: "100%"
  },
  arabic: {
    marginTop: 0,
    maxWidth: "100%"
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: "auto",
    paddingTop: 6
  },
  bar: {
    flex: 1,
    width: undefined,
    minWidth: 0
  },
  donePill: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    paddingStart: 8,
    paddingEnd: 12,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors.gold,
    borderBottomWidth: 3,
    borderBottomColor: colors.goldLip
  },
  doneText: {
    marginStart: 4,
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: GOLD_INK
  },
  count: {
    marginStart: 6,
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 17,
    color: colors.inkSoft
  },
  activeBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.gem,
    alignItems: "center",
    justifyContent: "center"
  }
});
