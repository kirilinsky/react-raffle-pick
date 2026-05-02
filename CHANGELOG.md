# react-raffle-picker

## 0.2.1

### Patch Changes

- 6119c99: ### Slots: `initialValue` / `finalValue` support + `autoStart={false}` fix
  - `<RafflePick.Slots>` now respects root `initialValue` (seeds reels char-by-char) and `finalValue` (forces final reel result while cycle stays random).
  - Fixed: idle phase no longer leaves reel column animating when `autoStart={false}`.

## 0.2.0

### Minor Changes

- 0bfc1cb: ### Slot reel base styles bundled
  - Reel CSS auto-injects on `<RafflePick.Slots>` mount — animates out of the box.
  - New `react-raffle-picker/styles.css` export for SSR / strict CSP setups.
  - Stylesheet also provides opt-in keyframes for `<RafflePick.Value animation="roll|fade|blur|reel">`.

  ### New `<RafflePick>` props
  - `initialValue` — sets displayed value before first run (numeric or items mode).
  - `finalValue` — rigs settle to land on this value while cycle still appears random.
