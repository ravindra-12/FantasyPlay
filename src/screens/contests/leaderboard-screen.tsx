import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBadge } from '@/components/ui/primitives';
import { leaderboard } from '@/mocks/data';
import { colors, radius, shadows, space, type } from '@/theme';
export function LeaderboardScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const current = leaderboard.find((entry) => entry.name.includes('You'));
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.subtitle}>YOUR STANDING · {id?.toUpperCase()}</Text>
        <Text style={styles.title}>{current ? `#${current.rank} of ${leaderboard.length}` : 'Unranked'}</Text>
        <Text style={styles.subtitle}>{current?.points ?? 0} fantasy points</Text>
        <StatusBadge label="Sample rankings" />
      </View>
      {leaderboard.map((entry) => (
        <View key={entry.rank} style={[styles.row, entry === current && styles.current]}>
          <Text style={styles.rank}>#{entry.rank}</Text>
          <Text style={styles.name}>{entry.name}</Text>
          <Text style={styles.points}>{entry.points} pts</Text>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, content: { padding: space.md, paddingBottom: space.xxl }, hero: { backgroundColor: colors.navy, borderRadius: radius.lg, padding: space.lg, marginBottom: space.lg }, title: { color: colors.onPrimary, fontSize: type.page, fontWeight: '900' }, subtitle: { color: colors.blueSoft, fontSize: type.micro, fontWeight: '800', marginVertical: space.xs }, row: { minHeight: 54, alignItems: 'center', flexDirection: 'row', gap: space.sm, paddingHorizontal: space.md, marginBottom: space.xs, borderRadius: radius.sm, backgroundColor: colors.card, ...shadows.sm }, current: { backgroundColor: colors.softBlue, borderWidth: 1, borderColor: colors.blueSoft }, rank: { width: 32, color: colors.muted, fontSize: type.bodySmall, fontWeight: '900' }, name: { flex: 1, color: colors.text, fontSize: type.bodySmall, fontWeight: '800' }, points: { color: colors.blue, fontSize: type.caption, fontWeight: '900' }, });
