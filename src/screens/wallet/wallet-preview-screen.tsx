import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppShell } from '@/screens/shared/app-shell';
import { FilterChips, PrimaryButton, SecondaryButton } from '@/components/ui/primitives';
import { colors, radius, space, type } from '@/theme';

const amounts = ['₹100', '₹250', '₹500'] as const;

export function WalletPreviewScreen({ withdrawal = false }: { withdrawal?: boolean }) {
  const [amount, setAmount] = useState<(typeof amounts)[number]>('₹100');
  const [review, setReview] = useState(false);
  const action = withdrawal ? 'Withdrawal' : 'Payment';
  return (
    <AppShell title={action + ' preview'} caption="Wallet · Demo only" active="Wallet">
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.panel}>
          <Text style={styles.label}>{review ? 'Sample receipt' : 'Sample amount'}</Text>
          <Text style={styles.total}>{amount}</Text>
          <Text style={styles.body}>{review
            ? 'Preview complete. Your demo balance is unchanged.'
            : 'Choose an amount to see a simulated receipt.'}</Text>
        </View>
        {review ? <SecondaryButton label="Choose another amount" onPress={() => setReview(false)} /> : <>
          <FilterChips values={amounts} value={amount} onChange={setAmount} />
          <PrimaryButton label={'Preview ' + action} onPress={() => setReview(true)} />
        </>}
        <SecondaryButton label="Back to wallet" onPress={() => router.replace('/wallet')} />
      </ScrollView>
    </AppShell>
  );
}
const styles = StyleSheet.create({
  content: { padding: space.md, gap: space.md },
  panel: { backgroundColor: colors.navy, borderRadius: radius.lg, padding: space.lg, gap: space.xs },
  label: { color: colors.blueSoft, fontSize: type.caption, fontWeight: '700' },
  total: { color: colors.onPrimary, fontSize: type.display, fontWeight: '900' },
  body: { color: colors.blueSoft, fontSize: type.bodySmall, lineHeight: type.lineBody },
});
