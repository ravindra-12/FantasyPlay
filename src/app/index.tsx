import { BottomTabs } from '@/screens/shared/app-shell';
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  IconButton,
  SectionHeader,
  SegmentTabs,
  StatusBadge,
} from "@/components/ui/primitives";
import { matches, type Match } from "@/mocks/data";
import { brand, colors, layout, radius, shadows, space, type } from "@/theme";

const navigate = (path: string) => router.push(path as never);
const tabs = ["Upcoming", "Live", "Completed"] as const;
type MatchTab = (typeof tabs)[number];

function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + space.sm }]}>
      <View>
        <Text maxFontSizeMultiplier={1.3} style={styles.brand}>
          {brand.name}
        </Text>
        <Text maxFontSizeMultiplier={1.3} style={styles.tag}>
          {brand.country.toUpperCase()} FANTASY CRICKET · DEMO
        </Text>
      </View>
      <View style={styles.notification}>
        <IconButton
          label="Open notifications"
          onPress={() => navigate("/notifications")}
        >
          <Icon name="bell-outline" size={22} color={colors.onPrimary} />
        </IconButton>
        <View style={styles.dot} />
      </View>
    </View>
  );
}
function MatchCard({ match }: { match: Match }) {
  const tone =
    match.status === "LIVE"
      ? "live"
      : match.status === "COMPLETED"
        ? "success"
        : "info";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${match.a} versus ${match.b}`}
      onPress={() => navigate(`/match/${match.id}`)}
      android_ripple={{ color: colors.blueSoft }}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.cardTop}>
        <Text
          maxFontSizeMultiplier={1.3}
          numberOfLines={1}
          style={styles.series}
        >
          {match.series}
        </Text>
        <StatusBadge
          label={match.status === "LIVE" ? "LIVE · DEMO" : match.status}
          tone={tone}
        />
      </View>
      <View style={styles.fixture}>
        <Team code={match.aShort} name={match.a} tone="blue" />
        <View style={styles.fixtureCenter}>
          <Text style={styles.vs}>VS</Text>
          <Text
            maxFontSizeMultiplier={1.3}
            numberOfLines={2}
            style={styles.time}
          >
            {match.time}
          </Text>
        </View>
        <Team code={match.bShort} name={match.b} tone="amber" />
      </View>
      <View style={styles.divider} />
      <View style={styles.cardBottom}>
        <Text
          maxFontSizeMultiplier={1.3}
          numberOfLines={1}
          style={styles.venue}
        >
          <Icon name="map-marker-outline" size={14} color={colors.muted} />{" "}
          {match.venue}
        </Text>
        <Text style={styles.sample}>Sample fixture</Text>
      </View>
    </Pressable>
  );
}
function Team({
  code,
  name,
  tone,
}: {
  code: string;
  name: string;
  tone: "blue" | "amber";
}) {
  return (
    <View style={styles.team}>
      <View
        style={[
          styles.crest,
          tone === "blue" ? styles.blueCrest : styles.amberCrest,
        ]}
      >
        <Text style={styles.crestText}>{code.slice(0, 1)}</Text>
      </View>
      <Text maxFontSizeMultiplier={1.3} style={styles.teamCode}>
        {code}
      </Text>
      <Text
        maxFontSizeMultiplier={1.3}
        numberOfLines={1}
        style={styles.teamName}
      >
        {name}
      </Text>
    </View>
  );
}
export default function Home() {
  const [selectedTab, setSelectedTab] = useState<MatchTab>("Upcoming");
  const visibleMatches = matches.filter(
    (match) => match.status === selectedTab.toUpperCase(),
  );
  return (
    <View style={styles.page}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <Icon
            name="cricket"
            size={72}
            color={colors.navySoft}
            style={styles.heroIcon}
          />
          <Text style={styles.heroOverline}>INDIA T20 DEMO SERIES</Text>
          <Text maxFontSizeMultiplier={1.3} style={styles.heroTitle}>
            Mumbai vs Chennai
          </Text>
          <Text maxFontSizeMultiplier={1.3} style={styles.heroText}>
            Pick 11 players for the India T20 opener at Wankhede Stadium.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigate("/fantasy-team/create")}
            style={({ pressed }) => [styles.heroCta, pressed && styles.pressed]}
          >
            <Text style={styles.heroCtaText}>Build your team</Text>
            <Icon name="arrow-right" size={18} color={colors.navy} />
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigate("/wallet")}
          style={({ pressed }) => [styles.wallet, pressed && styles.pressed]}
        >
          <View style={styles.walletMark}>
            <Icon name="wallet-outline" size={23} color={colors.blue} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.walletLabel}>DEMO WALLET</Text>
            <Text maxFontSizeMultiplier={1.3} style={styles.walletMoney}>
              {brand.currency} 1,240.00
            </Text>
            <Text maxFontSizeMultiplier={1.3} style={styles.walletHint}>
              Sample balance · no real money
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={colors.blue} />
        </Pressable>
        <SectionHeader
          title="Featured matches"
          actionLabel="See all"
          onAction={() => navigate("/all-matches")}
        />
        <SegmentTabs
          values={tabs}
          value={selectedTab}
          onChange={setSelectedTab}
        />
        <View style={styles.matchList}>
          {visibleMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </View>
      </ScrollView>
      <BottomTabs active="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  header: {
    backgroundColor: colors.navy,
    paddingHorizontal: space.lg,
    paddingBottom: space.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { color: colors.onPrimary, fontSize: type.page, fontWeight: "900" },
  tag: {
    color: colors.blueSoft,
    fontSize: type.micro,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginTop: space.xxs,
  },
  notification: { position: "relative" },
  dot: {
    position: "absolute",
    top: space.xs,
    right: space.xs,
    width: space.xs,
    height: space.xs,
    borderRadius: radius.full,
    backgroundColor: colors.amber,
  },
  content: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
    padding: space.md,
    paddingBottom: space.xl,
  },
  flex: { flex: 1 },
  pressed: { opacity: 0.88, transform: [{ scale: 0.97 }] },
  wallet: {
    minHeight: layout.controlHeight + space.md,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.sm,
    marginBottom: space.md,
    backgroundColor: colors.infoSoft,
    borderRadius: radius.md,
    borderColor: colors.blueSoft,
    borderWidth: 1,
  },
  walletMark: {
    width: layout.iconButton,
    height: layout.iconButton,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.blueSoft,
  },
  walletLabel: {
    color: colors.blue,
    fontSize: type.micro,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  walletMoney: { color: colors.navy, fontSize: type.page, fontWeight: "900" },
  walletHint: { color: colors.muted, fontSize: type.caption },
  hero: {
    overflow: "hidden",
    backgroundColor: colors.navy,
    borderRadius: radius.lg,
    padding: space.lg,
    marginBottom: space.xl,
  },
  heroIcon: { position: "absolute", top: space.xs, right: -space.xs },
  heroOverline: {
    color: colors.amber,
    fontSize: type.micro,
    fontWeight: "900",
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.onPrimary,
    fontSize: type.display,
    lineHeight: type.lineDisplay,
    fontWeight: "900",
    marginTop: space.xs,
    maxWidth: "82%",
  },
  heroText: {
    color: colors.blueSoft,
    fontSize: type.bodySmall,
    lineHeight: type.lineBody,
    marginTop: space.sm,
    maxWidth: "86%",
  },
  heroCta: {
    minHeight: layout.controlHeight,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    paddingHorizontal: space.md,
    marginTop: space.lg,
    borderRadius: radius.sm,
    backgroundColor: colors.amber,
  },
  heroCtaText: {
    color: colors.navy,
    fontSize: type.bodySmall,
    fontWeight: "900",
  },
  matchList: { marginTop: space.sm },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: space.md,
    marginBottom: space.sm,
    overflow: "hidden",
    ...shadows.md,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.sm,
  },
  series: {
    flex: 1,
    color: colors.muted,
    fontSize: type.micro,
    fontWeight: "800",
  },
  fixture: {
    minHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: space.sm,
  },
  team: { flex: 1, alignItems: "center" },
  crest: {
    width: layout.iconButton - space.xs,
    height: layout.iconButton - space.xs,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    marginBottom: space.xxs,
  },
  blueCrest: { backgroundColor: colors.blueSoft },
  amberCrest: { backgroundColor: colors.amberSoft },
  crestText: { color: colors.navy, fontWeight: "900" },
  teamCode: { color: colors.text, fontSize: type.section, fontWeight: "900" },
  teamName: {
    color: colors.muted,
    fontSize: type.micro,
    marginTop: space.xxs,
    textAlign: "center",
  },
  fixtureCenter: { width: 92, alignItems: "center" },
  vs: { color: colors.muted, fontSize: type.caption, fontWeight: "900" },
  time: {
    color: colors.red,
    fontSize: type.micro,
    fontWeight: "800",
    marginTop: space.xxs,
    textAlign: "center",
  },
  divider: { height: 1, backgroundColor: colors.border },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.sm,
    marginTop: space.sm,
  },
  venue: { flex: 1, color: colors.muted, fontSize: type.micro },
  sample: { color: colors.muted, fontSize: type.micro },
  tip: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.sm,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    ...shadows.sm,
  },
  tipTitle: { color: colors.text, fontSize: type.bodySmall, fontWeight: "900" },
  tipText: {
    color: colors.muted,
    fontSize: type.caption,
    lineHeight: type.lineCaption,
    marginTop: space.xxs,
  },
  nav: {
    minHeight: layout.tabBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navItem: {
    minHeight: layout.controlHeight,
    minWidth: 56,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    color: colors.muted,
    fontSize: type.micro,
    fontWeight: "800",
    marginTop: space.xxs,
  },
  navLabelActive: { color: colors.blue },
});
