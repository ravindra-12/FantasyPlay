import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState, PrimaryButton } from "@/components/ui/primitives";
import { players } from "@/mocks/data";
import { useTeam } from "@/store/team-store";
import { colors, layout, radius, shadows, space, type } from "@/theme";

export function CaptainSelectionScreen() {
  const insets = useSafeAreaInsets();
  const { selected, captain, viceCaptain, chooseCaptain, chooseVice, save } =
    useTeam();
  const team = players.filter((player) => selected.includes(player.id));
  if (team.length !== 11)
    return (
      <View style={styles.page}>
        <View style={[styles.header, { paddingTop: insets.top + space.sm }]}>
          <Text style={styles.title}>Captain & Vice Captain</Text>
        </View>
        <View style={styles.center}>
          <EmptyState
            title="Build your XI first"
            message="Select a valid 11-player team before choosing Captain and Vice Captain."
            actionLabel="Build your XI"
            onAction={() => router.replace("/fantasy-team/create")}
          />
        </View>
      </View>
    );
  return (
    <View style={styles.page}>
      <View style={[styles.header, { paddingTop: insets.top + space.sm }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.back}
        >
          <Icon name="arrow-left" size={24} color={colors.onPrimary} />
        </Pressable>
        <View>
          <Text style={styles.title}>Captain & Vice Captain</Text>
          <Text style={styles.caption}>C earns 2× · VC earns 1.5×</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Icon name="crown-outline" size={32} color={colors.amber} />
          <Text style={styles.heroTitle}>Pick your point multipliers</Text>
          <Text style={styles.heroText}>
            Choose exactly one Captain and one Vice Captain from your XI.
          </Text>
        </View>
        {team.map((player) => (
          <View key={player.id} style={styles.player}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {player.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{player.name}</Text>
              <Text style={styles.meta}>
                {player.team} · {player.role} · {player.points} sample pts
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Make ${player.name} captain`}
              onPress={() => chooseCaptain(player.id)}
              style={[styles.choice, captain === player.id && styles.captainOn]}
            >
              <Text
                style={[
                  styles.choiceText,
                  captain === player.id && styles.choiceTextOn,
                ]}
              >
                C
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Make ${player.name} vice captain`}
              onPress={() => chooseVice(player.id)}
              style={[
                styles.choice,
                viceCaptain === player.id && styles.viceOn,
              ]}
            >
              <Text
                style={[
                  styles.choiceText,
                  viceCaptain === player.id && styles.choiceTextOn,
                ]}
              >
                VC
              </Text>
            </Pressable>
          </View>
        ))}
        <PrimaryButton
          label="Save team & preview"
          disabled={!captain || !viceCaptain}
          onPress={() => {
            save();
            router.push("/fantasy-team/preview");
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  header: {
    backgroundColor: colors.navy,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingHorizontal: space.md,
    paddingBottom: space.md,
  },
  back: {
    height: layout.iconButton,
    width: layout.iconButton,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  title: { color: colors.onPrimary, fontSize: type.page, fontWeight: "900" },
  caption: {
    color: colors.blueSoft,
    fontSize: type.caption,
    marginTop: space.xxs,
  },
  content: { padding: space.md, paddingBottom: space.xxl, gap: space.xs },
  center: { padding: space.md },
  hero: {
    alignItems: "center",
    backgroundColor: colors.navy,
    borderRadius: radius.lg,
    padding: space.lg,
    marginBottom: space.sm,
  },
  heroTitle: {
    color: colors.onPrimary,
    fontSize: type.section,
    fontWeight: "900",
    marginTop: space.xs,
  },
  heroText: {
    color: colors.blueSoft,
    fontSize: type.caption,
    lineHeight: type.lineCaption,
    marginTop: space.xxs,
    textAlign: "center",
  },
  player: {
    minHeight: layout.controlHeight + space.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.sm,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    ...shadows.sm,
  },
  avatar: {
    width: layout.iconButton - space.xs,
    height: layout.iconButton - space.xs,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.blueSoft,
  },
  avatarText: { color: colors.navy, fontSize: type.caption, fontWeight: "900" },
  info: { flex: 1 },
  name: { color: colors.text, fontSize: type.bodySmall, fontWeight: "900" },
  meta: { color: colors.muted, fontSize: type.caption, marginTop: space.xxs },
  choice: {
    minWidth: 40,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderColor: colors.blueSoft,
    borderWidth: 1,
  },
  captainOn: { backgroundColor: colors.blue, borderColor: colors.blue },
  viceOn: { backgroundColor: colors.amber, borderColor: colors.amber },
  choiceText: { color: colors.blue, fontSize: type.micro, fontWeight: "900" },
  choiceTextOn: { color: colors.onPrimary },
});
