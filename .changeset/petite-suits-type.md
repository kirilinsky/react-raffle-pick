---
'react-raffle-picker': minor
---

### Slot reel base styles bundled

- Reel CSS auto-injects on `<RafflePick.Slots>` mount — animates out of the box.
- New `react-raffle-picker/styles.css` export for SSR / strict CSP setups.
- Stylesheet also provides opt-in keyframes for `<RafflePick.Value animation="roll|fade|blur|reel">`.

### New `<RafflePick>` props

- `initialValue` — sets displayed value before first run (numeric or items mode).
- `finalValue` — rigs settle to land on this value while cycle still appears random.
