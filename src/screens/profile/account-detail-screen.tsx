import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SecondaryButton } from '@/components/ui/primitives';
import { AppShell } from '@/screens/shared/app-shell';
import { colors, radius, space, type } from '@/theme';

const sections = {
  rewards: {
    title: 'Rewards',
    entries: [
      ['1,204 sample XP', 'Your demo profile has 7 achievement badges.'],
      ['Team builder', 'Sample badge for completing a playing XI.'],
      ['Captain’s pick', 'Sample badge for selecting both point multipliers.'],
    ],
  },
  notifications: {
    title: 'Notifications',
    entries: [
      ['Mumbai vs Chennai', 'The sample squads are available for team selection.'],
      ['Bengaluru vs Delhi', 'The demo scorecard is available in Match centre.'],
    ],
  },
  help: {
    title: 'Help centre',
    entries: [
      ['How do I save a team?', 'Choose 11 players within 100 credits. Assign a Captain and Vice Captain to two different players, then tap Save team & preview.'],
      ['Where are the rankings?', 'Open a match and tap Rankings to see the sample leaderboard.'],
      ['How does the wallet work?', 'Choose a sample amount to preview a receipt. All wallet activity is simulated.'],
    ],
  },
};

export function AccountDetailScreen({ section }: { section: keyof typeof sections }) {
  const { title, entries } = sections[section];
  const [read, setRead] = useState(false);
  return (
    <AppShell title={title} active="Profile">
      <ScrollView contentContainerStyle={styles.content}>
        {entries.map(([heading, body]) => (
          <View key={heading} style={styles.card}>
            <Text accessibilityRole="header" style={styles.heading}>{heading}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        ))}
        {section === 'notifications' && (
          <SecondaryButton disabled={read} label={read ? 'All caught up' : 'Mark all as read'} onPress={() => setRead(true)} />
        )}
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  content: { padding: space.md, gap: space.sm },
  card: { padding: space.md, borderRadius: radius.md, backgroundColor: colors.card, gap: space.xs },
  heading: { color: colors.navy, fontSize: type.body, fontWeight: '800' },
  body: { color: colors.muted, fontSize: type.bodySmall, lineHeight: type.lineBody },
});
