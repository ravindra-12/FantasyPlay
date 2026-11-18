# ElevenArena UX audit

Audit date: 18 November 2026. Scope: the 46-screen specification in `FANTASY_CRICKET_EXPO_COMPLETE_STATIC_UI_AGENT.md` versus the current Expo Router implementation. The current app exposes `index` plus a catch-all route, so many inventory paths resolve but do not yet have screen-specific UX. Locale content now follows the requested India / INR demo direction.

## P0 — broken or unusable

- **Global / all 46:** routes are consolidated in one catch-all screen; deep links often show a generic fallback rather than the intended screen. No shared loading, empty, error, confirmation, toast, or bottom-sheet patterns exist.
- **4 Phone login, 5 OTP, 6 Profile setup, 7 Session:** phone / OTP are condensed into one view; no profile setup, resend/error state, or complete sign-out journey.
- **16 Captain & VC, 17 Preview, 18 My teams, 19 Team details, 20 Save success, 21 Validation:** only team selection is active; the required later team flows and validation states are unavailable.
- **23–28 Contests:** list cards work, but contest detail, join sheet, my contests, leaderboard, result, and prize breakup are generic fallbacks.
- **30–37 Wallet demo:** only the overview resolves with generic controls; review, status, transaction, withdrawal, KYC, and paid-information routes lack their specified UI and safeguards.
- **39–46 Profile/support:** profile is partial; edit, rewards, notifications, referral, help, support, settings, and legal routes need dedicated content and local interaction.

## P1 — clearly weak

- **1 Splash, 2 Onboarding, 3 Welcome:** missing as dedicated screens; hierarchy and navigation handoff are unclear.
- **8 Home:** polished starting point but still needs consistent India / ₹ demo content across every routed screen; hard-coded visual values create drift at 360dp and enlarged fonts.
- **9 All matches:** no search, series filter, empty, loading, or offline state.
- **10 Match details, 11 Players, 12 Player detail, 13 Live, 14 Scorecard:** only broad generic content; missing segmented navigation, player states, score tables, and sample labels close to values.
- **15 Create team:** player rows are readable, but role count / budget validation is incomplete and the bottom action can be pushed below the fold.
- **22 Contests:** status and sample-money distinctions are not consistently visible; touch targets and filters are not standardized.
- **29 Wallet:** demo disclosure is present but amount typography and action labels are inconsistent; no secure-looking input states.
- **38 Profile:** sign-out exists after this pass, but information grouping and profile actions lack reusable components.

## P2 — polish

- **Global:** spacing, radius, typography, shadows, press feedback, and icon sizing are duplicated and use literals instead of a full token system.
- **Global:** several strings are mojibake (`Â·`, `â‚¹`, etc.), which hurts trust and accessibility.
- **Global:** visual status colors need semantic names and accessible contrast; no dark-ready token shape.
- **Global:** cards lack consistent pressed states; a few icon/text controls are below the 44dp tap-target goal.
- **8–46:** section headers, chips, badges, inputs, empty states, and confirmation surfaces are inconsistent or absent.

## Fix order

1. P0: document route coverage, preserve catch-all fallback, provide shared feedback / confirmation primitives, and repair auth/profile/logout entry points.
2. P1: harden the theme and reusable controls, then upgrade the active Home, Wallet, Profile, match, team, and contest surfaces without removing paths.
3. P2: replace remaining literals and mojibake, improve responsive spacing and text scaling, and add state polish as each dedicated route is implemented.

## Inventory status

| Range | Screens | Current status |
| --- | --- | --- |
| 1–7 | Onboarding & account | Partial catch-all only |
| 8–14 | Discovery & match | Home partial; other paths generic |
| 15–21 | Team builder | Create-team partial; later states missing |
| 22–28 | Contests | List partial; details and states generic |
| 29–37 | Wallet / paid demo | Overview partial; remaining states generic |
| 38–46 | Profile / support | Profile partial; remaining states generic |

## Per-screen findings

1. Splash — P1: missing dedicated entry and branded transition.
2. Onboarding — P1: missing carousel, progress, and skip action.
3. Welcome — P1: resolves as generic content rather than a clear account choice.
4. Phone login — P0: no dedicated India-prefixed, terms-aware state.
5. OTP — P0: no resend timer, incorrect-code state, or separate step.
6. Profile setup — P0: absent.
7. Session — P0: no clear post-auth setup handoff or persistent demo state.
8. Home — P1: India/₹ references, literal styles, and no reusable status patterns.
9. All matches — P1: no search, filters, empty, or skeleton state.
10. Match details — P1: generic fallback; no clear contest/team/score hierarchy.
11. Match players — P1: generic fallback; role filters and row actions missing.
12. Player detail — P1: generic fallback; no stats or add/remove feedback.
13. Live match — P1: partial; simulated-data label and refresh feedback need prominence.
14. Scorecard — P1: generic fallback; no accessible inning tables.
15. Create team — P1: budget/role errors and sticky next action are incomplete.
16. Captain & VC — P0: unavailable.
17. Team preview — P0: unavailable.
18. My teams — P0: unavailable.
19. Team details — P0: unavailable.
20. Team save success — P0: unavailable.
21. Team validation states — P0: unavailable.
22. Contests — P1: partial list only; filters and paid-demo distinction need work.
23. Contest details — P0: generic fallback.
24. Join contest sheet — P0: generic fallback; no safe paid-demo explanation.
25. My contests — P0: generic fallback.
26. Leaderboard — P0: generic fallback.
27. Contest result — P0: generic fallback.
28. Prize breakup — P0: generic fallback.
29. Wallet — P1: partial; disclosure and actions need shared demo treatment.
30. Add cash demo — P0: generic fallback.
31. Payment review demo — P0: generic fallback.
32. Payment status demo — P0: generic fallback.
33. Transactions — P0: generic fallback.
34. Withdraw demo — P0: generic fallback.
35. Withdrawal review/status — P0: generic fallback.
36. KYC demo — P0: generic fallback.
37. Paid contest information — P0: generic fallback.
38. Profile — P1: partial; account grouping and state feedback need standardization.
39. Edit profile — P0: generic fallback.
40. Rewards — P0: generic fallback.
41. Notifications — P0: generic fallback.
42. Referral demo — P0: generic fallback.
43. Help center — P0: generic fallback.
44. Support ticket demo — P0: generic fallback.
45. Settings — P0: generic fallback.
46. Legal/About — P0: generic fallback.
