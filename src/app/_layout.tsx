import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { TeamProvider } from '@/store/team-store';
import { AuthProvider } from '@/store/auth-store';
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.frame} edges={['bottom', 'left', 'right']}>
        <AuthProvider>
          <TeamProvider>
            <StatusBar style="light" />
            <Stack screenOptions={{
              headerShown: false,
              headerStyle: { backgroundColor: colors.navy },
              headerTintColor: colors.onPrimary,
              animation: 'slide_from_right',
            }}>
              <Stack.Screen name="match/[id]" options={{ headerShown: true, title: 'Match centre' }} />
              <Stack.Screen name="match/[id]/scorecard" options={{ headerShown: true, title: 'Scorecard' }} />
              <Stack.Screen name="contest/[id]/leaderboard" options={{ headerShown: true, title: 'Rankings' }} />
              <Stack.Screen name="fantasy-team/preview" options={{ headerShown: true, title: 'Team preview' }} />
            </Stack>
          </TeamProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ frame: { flex: 1, backgroundColor: colors.card } });
