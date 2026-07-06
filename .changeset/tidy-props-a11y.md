---
"react-raffle-picker": minor
---

### Accessibility, DX, and small correctness fixes

- `<RafflePick.Value>` now announces the frozen result to screen readers once
  per round via a hidden `aria-live="polite"` region (the visual node is
  `aria-hidden` and no longer silent on freeze). Cycling ticks are not
  announced.
- `<RafflePick.Countdown>` no longer fully `aria-hidden`s its output — it adds
  a one-time sr-only announcement that a countdown started, instead of hiding
  the whole thing from assistive tech.
- `styles.css` now respects `prefers-reduced-motion: reduce` for both the
  value animations and the slot reel.
- `<RafflePick.Button>` accepts a new `disabled` prop for external disabling
  (e.g. form not valid), on top of the existing auto-disable during
  `settling`.
- Fixed: `<RafflePick.Slots>` injected its base stylesheet as a render
  side-effect; moved into `useEffect`.
- Fixed: changing `initialValue` while idle no longer leaves the internal
  cycle ref out of sync with the displayed value.
- `RaffleContextValue` and `RafflePickPhase` types are now exported from the
  package root, for consumers building custom sub-components on top of
  `useRaffleContext`.
- Added JSDoc to all `<RafflePick>` root props for editor tooltips.
