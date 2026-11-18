import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout, radius, space, type } from '@/theme';

type Tab = 'Home' | 'My Matches' | 'Contests' | 'Wallet' | 'Profile';
export function AppShell({ title, caption = 'INDIA DEMO · LOCAL ONLY', active, children }: { title: string; caption?: string; active: Tab; children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return <View style={styles.page}><View style={[styles.header, { paddingTop: insets.top + space.sm }]}><View><Text style={styles.title}>{title}</Text><Text style={styles.caption}>{caption}</Text></View></View><View style={styles.content}>{children}</View><BottomTabs active={active} /></View>;
}
export function BottomTabs({ active }: { active: Tab }) { const tabs: [React.ComponentProps<typeof Icon>['name'], Tab, string][] = [['home-variant-outline', 'Home', '/'], ['calendar-blank-outline', 'My Matches', '/my-matches'], ['trophy-outline', 'Contests', '/contests'], ['wallet-outline', 'Wallet', '/wallet'], ['account-circle-outline', 'Profile', '/profile']]; return <View style={styles.tabs}>{tabs.map(([icon, label, href]) => <Pressable key={label} accessibilityRole="tab" accessibilityState={{ selected: active === label }} onPress={() => router.replace(href as never)} style={({ pressed }) => [styles.tab, pressed && styles.pressed]}><Icon name={icon} size={22} color={active === label ? colors.blue : colors.muted} /><Text maxFontSizeMultiplier={1.3} style={[styles.tabText, active === label && styles.tabTextActive]}>{label}</Text></Pressable>)}</View>; }
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, header: { backgroundColor: colors.navy, paddingHorizontal: space.md, paddingBottom: space.md }, title: { color: colors.onPrimary, fontSize: type.page, fontWeight: '900' }, caption: { color: colors.blueSoft, fontSize: type.micro, fontWeight: '800', marginTop: space.xxs }, content: { flex: 1 }, tabs: { minHeight: layout.tabBarHeight, flexDirection: 'row', backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border }, tab: { flex: 1, minHeight: layout.controlHeight, alignItems: 'center', justifyContent: 'center' }, tabText: { color: colors.muted, fontSize: type.micro, fontWeight: '800', marginTop: space.xxs }, tabTextActive: { color: colors.blue }, pressed: { opacity: 0.86, transform: [{ scale: 0.97 }] }, });
