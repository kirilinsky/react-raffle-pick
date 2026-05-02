---
'react-raffle-picker': patch
---

### Slots: `initialValue` / `finalValue` support + `autoStart={false}` fix

- `<RafflePick.Slots>` now respects root `initialValue` (seeds reels char-by-char) and `finalValue` (forces final reel result while cycle stays random).
- Fixed: idle phase no longer leaves reel column animating when `autoStart={false}`.
