# react-raffle-picker

## 0.3.0

### Minor Changes

- 0389ab7: ### `noRepeat` — no duplicate winners across draws

  `<RafflePick>` now excludes previously frozen values from later rounds by
  default, so sequential draws from the same `items`/numeric pool never repeat
  a winner within one mounted instance.

  **Behavior change:** this is `true` by default. Apps that relied on the same
  value being drawable twice in a row should pass `noRepeat={false}` to keep
  the old behavior.
  - New root prop `noRepeat?: boolean` (default `true`).
  - New root prop `onExhausted?: () => void` — fires when `start()` runs after
    every candidate has already been drawn.
  - `<RafflePick.Button>` auto-disables once the pool is exhausted (on top of
    its existing `disabled` prop and settling auto-disable).
  - `useRaffleContext()` exposes `noRepeat`, `exhausted`, `remaining`, and
    `resetHistory()` (clears draw history without unmounting — or remount with
    a new `key` for the same effect).
  - Fixed: the random-mode tick could in principle spin forever trying to land
    on a non-excluded value under a degenerate RNG; it's now bounded with a
    deterministic fallback scan.

- 6c8618a: ### Accessibility, DX, and small correctness fixes
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

## 0.2.2

### Patch Changes

- 5d9a085: ### Slot reel layout fix

  Reel cells now correctly center the current value vertically and horizontally regardless of font metrics or external CSS.

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
