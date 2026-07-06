---
"react-raffle-picker": minor
---

### `noRepeat` — no duplicate winners across draws

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
