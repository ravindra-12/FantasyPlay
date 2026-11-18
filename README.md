# ElevenArena — Fantasy Cricket UI Demo

A polished, Android-first Expo Router prototype for fantasy cricket. All fixtures, players, scores, rankings, balances, prizes, payment and withdrawal states are deterministic **sample data**.

## Run

```bash
npm install
npx expo start
```

Press **A** to open Android when an Android emulator/device is available.

## Demo flows

- Home: filter upcoming, live and completed fixture cards.
- Match centre: fixture navigation, team-player selection and simulated live score.
- Team builder: select up to 11 mock players, inspect credit use and role filters.
- Contests: free contest local join state and clearly separate paid-demo previews.
- Wallet: sample BDT balance, add-cash and withdrawal prototype entry points; no payment flow exists.
- Profile and notifications paths are local UI screens.
- Mock OTP shown in UI: **123456**.

## Safety and scope

This is a visual/UI prototype only. It makes no HTTP calls, does not authenticate a real user, does not collect identity or payment information, and cannot deposit, withdraw, transfer, or stake money. Any future real-money work requires Bangladesh legal, licensing, KYC/AML, provider-policy, security, and payment-provider review.

## Future integration

Repository interfaces live in `src/services/contracts/repositories.ts`. Replace mock fixture access with API-backed implementations while keeping UI screen models stable.
