# Fantasy Cricket — Complete React Native Expo Static UI Agent Specification

**Version:** 2.0 | **Target:** Bangladesh (BDT / ৳) | **Deliverable:** polished Android-first Expo app with fully navigable **mock-only** UI.

> **Scope boundary:** Build UI and local demo interactions only. Do not implement real payments, wallet transfers, payouts, cash-contest activation, backend, authentication services, cricket provider calls, or payment SDKs. Paid-entry, wallet, winnings and withdrawal interfaces are **visual prototypes** with clearly labeled sample data. Before a real-money release, commission Bangladesh-specific legal, licensing, age-verification, AML/KYC, and provider-policy review. Direct APK distribution does not itself establish legality.

## 1. Agent mission

Create a premium, original fantasy cricket mobile experience inspired by common sports fantasy UX patterns, **not a pixel-for-pixel Dream11 clone**. Every screen below must exist; every visible button must navigate, update mock state, open a modal, or explicitly explain its demo-only behavior. No dead taps. Use realistic fictional fixtures, teams, players, and scores; do not present sample data as live. Do not use trademarked team logos without rights.

### Required stack
- Expo (latest compatible stable SDK in the project), React Native, TypeScript, Expo Router.
- **Custom React Native styling exclusively:** `StyleSheet.create`, style arrays, reusable theme tokens, and built-in React Native components. **No NativeWind, Tailwind, CSS files, styled-components, UI kits, WebView-based layouts, or external component libraries.**
- Expo-compatible libraries for icons, gradients, safe areas, image loading, and animations where needed. Prefer `@expo/vector-icons`, `expo-linear-gradient`, `react-native-safe-area-context`, `react-native-reanimated` only if already compatible.
- Zustand or Context for mock local state; keep a service interface to replace with APIs later. `AsyncStorage` only for harmless demo preferences/onboarding, not sensitive credentials.
- Android-first responsive layout; support iOS safe areas as a bonus.

## 2. Design system

### Visual direction
- Premium, contemporary sports UI, crisp hierarchy, confident typography, rounded cards, soft shadows, subtle gradients, lively score indicators.
- Original brand placeholder **ElevenArena** (rename centrally), primary `#172554` navy, secondary `#2563EB` electric blue, accent `#F59E0B` amber, success `#16A34A`, danger `#DC2626`, canvas `#F5F7FB`, card `#FFFFFF`, text `#0F172A`, muted `#64748B`, border `#E2E8F0`.
- Header/nav: navy/blue gradient; content: bright light surfaces. Do not overuse gradients.
- Use 8-point spacing scale (4,8,12,16,20,24,32); card radius 16–20; controls min height 44–48; accessible contrast and touch areas.
- Typography sizes: display 28–32, page 22–24, section 17–19, body 14–16, caption 11–13; readable number formatting.
- Provide consistent icons, skeletons, empty states, error states, loading indicators, toast feedback, bottom sheets, confirmation dialogs.
- Use `৳` for BDT and local Bangladesh context. English-first UI; architecture ready for localization.
- Respect small screens (~360dp), large screens, Android keyboard, safe areas, text scaling, and scroll behavior.

### Shared UI components
`AppHeader`, `ScreenContainer`, `PrimaryButton`, `SecondaryButton`, `IconButton`, `BottomTabBar`, `MatchCard`, `ContestCard`, `PlayerRow`, `TeamFormation`, `ScoreStrip`, `PointsBadge`, `RankRow`, `WalletBalanceCard`, `TransactionRow`, `PrizeBreakdown`, `SegmentTabs`, `FilterChips`, `CountdownPill`, `StatTile`, `StatusBadge`, `EmptyState`, `SkeletonCard`, `ConfirmModal`, `InfoBottomSheet`, `TextField`, `OtpInput`, `Toast`, `ProgressBar`, `SectionHeader`, `Avatar`, `ShimmerPlaceholder`.

## 3. Navigation architecture

**Auth stack:** Splash → Welcome/Onboarding → Login → OTP → Profile Setup → Main Tabs.

**Bottom tabs (5):** Home, My Matches, Contests, Wallet (Demo), Profile.

**Nested routes:** Match Details, Players, Create Team, Captain/VC, Team Preview, My Teams, Contest Details, Join Confirmation, Contest Leaderboard, Live Score, Scorecard, Player Details, Rewards, Transactions, Add Cash Demo, Withdrawal Demo, KYC Demo, Payment Status Demo, Notifications, Support, FAQs, Settings, Edit Profile, Referral Demo, Legal & About.

Use Expo Router typed navigation and clear back navigation. Persist draft fantasy team during screen transitions. Implement deep-link-safe fallbacks for missing mock IDs.

## 4. Complete screen inventory and exact UI requirements

### A. Onboarding & account (7)
1. **Splash:** logo, animated entry, short tagline, route to welcome.
2. **Onboarding carousel:** three slides (pick match, build XI, track rankings), skip/next/start.
3. **Welcome:** login CTA, preview matches, terms links.
4. **Phone login:** Bangladesh +880 prefix, input validation, terms checkbox, Continue button.
5. **OTP verification:** six digit input, mock countdown/resend, wrong-code UI, mock success (e.g. `123456` clearly shown as demo), edit number.
6. **Profile setup:** display name, username, avatar placeholder, favorite cricket team optional.
7. **Session/demo state:** simulated logged-in state and sign-out confirmation, no actual token.

### B. Home & cricket discovery (7)
8. **Home:** brand header, notifications, wallet demo teaser, promotional carousel, Upcoming/Live/Completed tabs, featured matches, series chips, contest CTA.
9. **All matches:** search, series filter, match status, skeleton/empty views.
10. **Match details:** opposing teams, tournament, venue, start time, countdown, lineup note, tabs for contests/teams/score.
11. **Match player list:** tabs WK/BAT/AR/BOWL, credits, team, selection percentage mock, status, sorting/filter.
12. **Player detail:** image placeholder, role, credits, sample performance stats, recent matches, add/remove to draft.
13. **Live match:** runs, wickets, overs, innings, key batters/bowlers, simulated refresh button, "Demo data" label.
14. **Scorecard:** batting, bowling, wickets, partnerships placeholder, innings switch.

### C. Fantasy team builder (7)
15. **Create team:** 11-player counter, 100-credit budget, role counts, selectable player rows, team filters, bottom next CTA; rules: WK 1–4, BAT 3–6, AR 1–4, BOWL 3–6, max 7 from one side; validate instantly.
16. **Captain & vice-captain:** choose exactly one each from selected XI, 2x and 1.5x chips, mutually exclusive, confirm CTA.
17. **Team preview:** cricket field formation, role-positioned player avatars, captain/VC labels, team split, credits, edit button.
18. **My teams for match:** saved mock teams, duplicate, edit, preview, delete confirmation; lock state.
19. **Team details:** selected players, points breakdown, captain multipliers, lineup lock info.
20. **Team save success:** subtle celebration, view team, explore contests.
21. **Team builder validation states:** insufficient roles, exceeded budget, max team players, 11/11 full, locked match, unsaved changes.

### D. Contests (7)
22. **Contests for match:** segmented Free / Paid Demo; featured, head-to-head, small league, mega contest; search/sort/filter; entry fee and prize pool visible only as sample in paid demo.
23. **Contest details:** rules, entry, spots filled, sample prize breakdown, eligible teams, user entries, joining policy.
24. **Join contest sheet:** choose saved team, free contest join via local state; **paid demo: preview only, no enrollment for money**, show non-actionable legal/demo notice.
25. **My contests:** upcoming/live/completed, joined free entries, paid demo examples visually distinct.
26. **Contest leaderboard:** top three podium, ranked list, pinned current user, points, tie example, simulated live indicator.
27. **Contest result:** final ranks, team breakdown, sample rewards; sample cash prize clearly marked "Demo — not payable".
28. **Prize breakup:** rank ranges, sample prize values, winner count, explanatory terms.

### E. Wallet / paid content prototype (9)
29. **Wallet overview (DEMO):** sample total balance, deposit/winnings/promo categories, Add Cash and Withdraw buttons lead only to demo screens, disclosure banner.
30. **Add cash demo:** amount presets ৳100/৳500/৳1000, custom amount, mock provider choice (bKash/Nagad icons as text placeholders only; no official marks or SDK), review UI; CTA says **Preview Payment**.
31. **Payment review demo:** amount, fee example, simulated provider, disclaimer, no actual payment action.
32. **Payment status demo:** sample success/pending/failure state selector, visual confirmation; must not change a real balance or imply a real deposit.
33. **Transactions:** filters All/Deposits/Contest Entries/Winnings/Withdrawals/Refunds, sample items and detail sheet; clearly sample.
34. **Withdraw demo:** sample withdrawable balance, input, mock bank/mobile-wallet destination, validation; CTA says **Preview Withdrawal**, never submit.
35. **Withdrawal review/status demo:** sample processing/approved/rejected states, status timeline; no payout call.
36. **KYC demo:** identity verification info and placeholder form only; **do not collect/store real ID documents or numbers**.
37. **Paid contest information:** demo entry amount, sample prize pool, sample ranks, terms and jurisdiction disclaimer; cash entry disabled.

### F. Profile, rewards, support & settings (9)
38. **Profile:** avatar, display name, sample stats, menu sections.
39. **Edit profile:** local editable name and avatar placeholder, save mock state.
40. **Rewards:** badges, XP, achievements, trophy details; no redemption to cash.
41. **Notifications:** match start, team locked, points update, result, promo; read/unread local state.
42. **Referral demo:** referral code copy, sample share sheet, no cash incentive.
43. **Help center:** FAQ search, categories, article detail.
44. **Support ticket demo:** subject, message, sample ticket history, local-only submit.
45. **Settings:** push preferences, language placeholder, privacy, terms, sign out, clear demo data.
46. **Legal/About:** terms placeholder, privacy placeholder, age notice, demo disclaimer, app version.

## 5. Sample data contract (mock only)

Create strongly typed fixtures under `src/mocks/`:
- 8–12 matches covering upcoming/live/completed, at least 3 series.
- 2 realistic fictional cricket squads of 15+ players each per sample match, with IDs, roles, credits, team and sample stats.
- 6–10 contests per featured match including free and paid-demo labels.
- 3 saved fantasy teams; one valid 11-player team with captain and VC.
- Leaderboard of 20–30 fictional users with ties and current-user placement.
- Live score/scorecard mock states, user rewards, notification feed, transaction history, payment/withdrawal sample states.
- Deterministic sample IDs and timestamps; all data explicitly labeled sample/mock where relevant.
- Use `src/services/contracts/` to define future repository interfaces (`AuthRepository`, `MatchRepository`, `FantasyTeamRepository`, `ContestRepository`, `WalletRepository`) and `src/services/mock/` implementations; **no network calls**.

## 6. Functional local interactions (must work)

- Onboarding next/skip; login → OTP → profile → home via demo auth.
- Tab navigation, back buttons, search, sort, filters, segmented controls.
- Match selection → players → build XI → captain/VC → save → team preview.
- Budget/role/team-count validation, selected states, warnings, disabled CTA until valid.
- Team duplicate/edit/delete using local mock state; prompt before destructive actions.
- Join free contest using saved team and update local participant count; prevent duplicate joins.
- Contest ranking and live score views with simulated demo updates; no fake claims of actual live data.
- Wallet demo navigation through amount input → review → simulated status, without payment SDK or real money balance updates.
- Withdrawal demo form → review → sample status, without transmitting financial data.
- Transaction filters, profile edits, notification read state, support demo, copy referral code, logout.
- Loading, empty, error, offline-placeholder, locked-match and validation UI states.

## 7. Suggested project structure

```text
fantasy-cricket-app/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (auth)/
│   │   ├── welcome.tsx
│   │   ├── login.tsx
│   │   ├── otp.tsx
│   │   └── profile-setup.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── my-matches.tsx
│   │   ├── contests.tsx
│   │   ├── wallet.tsx
│   │   └── profile.tsx
│   ├── match/[id].tsx
│   ├── match/[id]/players.tsx
│   ├── match/[id]/scorecard.tsx
│   ├── fantasy-team/create.tsx
│   ├── fantasy-team/captain.tsx
│   ├── fantasy-team/preview.tsx
│   ├── fantasy-team/[id].tsx
│   ├── contest/[id].tsx
│   ├── contest/[id]/leaderboard.tsx
│   ├── wallet/add-cash-demo.tsx
│   ├── wallet/payment-review-demo.tsx
│   ├── wallet/payment-status-demo.tsx
│   ├── wallet/withdraw-demo.tsx
│   ├── wallet/withdraw-status-demo.tsx
│   ├── wallet/transactions.tsx
│   ├── wallet/kyc-demo.tsx
│   └── ...other routes for all inventory screens
├── src/
│   ├── components/{common,matches,teams,contests,wallet}/
│   ├── theme/{colors,spacing,typography,shadows,index}.ts
│   ├── mocks/{matches,players,contests,leaderboards,wallet,user}.ts
│   ├── services/{contracts,mock}/
│   ├── store/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── assets/
├── app.json
├── package.json
└── tsconfig.json
```

## 8. Style implementation rules

- Use `StyleSheet.create` for screen and component styles, referencing centralized theme constants.
- Never use web CSS selectors or CSS-in-JS runtime styling libraries.
- Example:

```tsx
import { StyleSheet, Text, View } from 'react-native';

const palette = { navy: '#172554', canvas: '#F5F7FB', white: '#FFFFFF' };
export function SampleCard() {
  return <View style={styles.card}><Text style={styles.title}>Upcoming Matches</Text></View>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: palette.white, borderRadius: 18, padding: 16, marginBottom: 12 },
  title: { color: palette.navy, fontSize: 18, fontWeight: '700' },
});
```

- Support pressed, disabled, selected, focus, loading states. Use safe-area insets; avoid hardcoded device widths.
- Use reusable theme, not repeated ad hoc color literals. Keep UI animations subtle and performance-friendly.

## 9. Agent execution milestones

**M1 — Foundation:** initialize Expo, TypeScript, Expo Router, theme, reusable components, mock data contracts, bottom navigation. Verify Android app starts.

**M2 — Authentication:** splash, onboarding, welcome, login, OTP, profile setup, demo session.

**M3 — Cricket discovery:** home, match cards, filters, match details, player detail, live score, scorecard.

**M4 — Team builder:** player selection, credits and roles validation, captain/VC, preview, save/edit/duplicate/delete, locked states.

**M5 — Contests:** free contest listing/details/join, My Contests, leaderboard, results, prize breakdown, paid demo cards.

**M6 — Wallet and paid UI:** wallet overview, add-cash/payment review/status, transactions, withdraw/status, KYC info, paid contest info. All demo-only.

**M7 — Profile and polish:** profile, rewards, notifications, referral, help, support, settings, legal, empty/loading/error states, accessibility, animation.

**M8 — QA:** `npx tsc --noEmit`, Expo start, Android navigation smoke tests, validate all screens, fix layout overflow, ensure zero API calls/payment SDKs, update README and screenshots if possible.

## 10. Acceptance criteria

- [ ] All 46 screens/states from inventory implemented and reachable.
- [ ] No screen is blank or a generic unfinished placeholder.
- [ ] Custom React Native `StyleSheet` styling used everywhere; no Tailwind/NativeWind/UI kit.
- [ ] Bottom tabs and nested navigation work without broken routes.
- [ ] Team builder enforces all selection rules and Captain/VC uniqueness.
- [ ] Free contest join works locally; paid demo cannot take money or create real cash stakes.
- [ ] Wallet/payment/withdrawal UI clearly says **DEMO / SAMPLE** and makes no network calls.
- [ ] Responsive on Android 360dp and larger; no clipped buttons or unsafe-area overlap.
- [ ] Mock data consistent across match, team, contest and leaderboard screens.
- [ ] TypeScript checks pass; no obvious runtime errors.
- [ ] Clear README: install, run Android, mock OTP, navigation, demo-only financial scope, future API integration points.

## 11. Agent prompt (paste verbatim)

> Read `FANTASY_CRICKET_EXPO_COMPLETE_STATIC_UI_AGENT.md` in full. Build the entire Expo + React Native + TypeScript Android-first app described there, implementing every screen and navigation path. Use **only custom React Native StyleSheet styles** with reusable theme tokens; no NativeWind, Tailwind, CSS, UI component libraries, backend calls, or payment SDKs. Make the visual quality premium and original. Implement realistic deterministic mock cricket data and functional local interactions, especially 11-player team creation, Captain/VC selection, contest discovery, free contest joining, live leaderboard mock views, and full paid contest/wallet/deposit/withdrawal **demo UI**. Financial screens must be clearly labeled non-transactional demos and must not move money. Work in milestones M1–M8; run TypeScript checks and verify navigation after each milestone. Do not stop after only creating scaffolding. Document completed screens, mock OTP, and future API integration interfaces in README.

## 12. Future API integration notes (not part of this task)

- Replace mock repositories with HTTP adapters while keeping screen props and TypeScript models stable.
- Future auth endpoints: OTP request/verify and profile.
- Future match endpoints: fixtures, squads, scorecards, stats.
- Future fantasy endpoints: create/update team, contest list, free join, leaderboard.
- Payment and payout integrations require separate legality and provider approval before any implementation or activation.

**End of specification.**
