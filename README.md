<div align="center">
  <img src="https://i.ibb.co/k2MRQCqT/logo-nbg.png" alt="react-raffle-picker logo placeholder" width="160" />

  <h1>react-raffle-picker</h1>

  <p><strong>Tiny raffle engine. Big winner energy.</strong></p>

  <p>
    <a href="https://react-raffle-one.vercel.app/">Live demo</a>
  </p>

  <p>
    <a href="https://codecov.io/gh/kirilinsky/react-raffle-picker">
      <img src="https://codecov.io/gh/kirilinsky/react-raffle-picker/branch/main/graph/badge.svg" alt="Codecov coverage" />
    </a>
    <a href="https://bundlephobia.com/package/react-raffle-picker">
      <img src="https://img.shields.io/bundlephobia/minzip/react-raffle-picker?label=gzip" alt="Gzip bundle size" />
    </a>
  </p>
</div>

A headless, composable React component for giveaways, raffles, and slot-machine UIs. Cycles numbers or names with smooth animations and freezes on a winner. Performant on slow devices — high-frequency tick updates bypass React.

```bash
npm install react-raffle-picker
```

## Preview

<table>
  <tr>
    <td align="center">
      <img src="https://i.ibb.co/C3T73bkM/1.gif" alt="Headless" width="280" /><br/>
      <sub><b>Headless</b> — zero styles, full control</sub>
    </td>
    <td align="center">
      <img src="https://i.ibb.co/mVMHJztJ/2.gif" alt="English Names" width="280" /><br/>
      <sub><b>English Names</b> — items mode + reel</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://i.ibb.co/ZrdSS7G/3.gif" alt="Countdown" width="280" /><br/>
      <sub><b>Countdown</b> — auto-freeze with ring</sub>
    </td>
    <td align="center">
      <img src="https://i.ibb.co/kVSXdPnJ/4.gif" alt="Slot Machine" width="280" /><br/>
      <sub><b>Slot Machine</b> — independent reels</sub>
    </td>
  </tr>
</table>

## Idea

`react-raffle-picker` ships as a **headless compound component**, not a monolithic widget. The root owns the engine — cycling, phase machine, freeze logic — and exposes it through React context. Sub-components (`Value`, `Button`, `Countdown`, `Slots`) are dumb consumers that you compose anywhere in your tree.

This means:

- **No layout opinions.** Wrap pieces in your own card, modal, sidebar, paragraph.
- **No style props soup.** Style each piece directly via `className` / `style`.
- **One source of truth.** All state lives in the root. Sub-components read context.
- **Performance preserved.** Tick updates write to DOM imperatively via refs — no React re-render per tick. Context only re-renders on phase boundaries (start, settle, freeze).

```tsx
import { RafflePick } from 'react-raffle-picker';
---

<RafflePick min={1} max={100} interval={100} inertia onSelect={(v) => console.log(v)}>
  <RafflePick.Value animation="roll" className="my-value" />
  <RafflePick.Button startLabel="Pick" stopLabel="Stop" />
</RafflePick>
```

## Components

### `<RafflePick>` (root)

Provides context. Renders an optional wrapper element (`as` prop, default `'div'`).

| Prop         | Type                        | Default    | Notes                                         |
| ------------ | --------------------------- | ---------- | --------------------------------------------- |
| `min`, `max` | `number`                    | `1`, `100` | Numeric range. Ignored if `items` provided.   |
| `items`      | `string[]`                  | —          | Switches to item mode (cycles through names). |
| `interval`   | `number` (ms, clamped ≥ 50) | `100`      | Tick speed.                                   |
| `random`     | `boolean`                   | `true`     | Random pick vs sequential.                    |
| `inertia`    | `boolean`                   | `false`    | Soft start / soft stop ramp.                  |
| `autoStart`  | `boolean`                   | `true`     | Begin cycling on mount.                       |
| `onSelect`   | `(value) => void`           | —          | Fires once per round on freeze.               |
| `as`         | `ElementType`               | `'div'`    | Wrapper tag.                                  |
| `className`  | `string`                    | —          | Wrapper class.                                |
| `style`      | `CSSProperties`             | —          | Wrapper style.                                |
| `children`   | `ReactNode`                 | —          | Sub-components.                               |

### `<RafflePick.Value>`

Renders the cycling value. Updates `textContent` imperatively each tick (no React re-render).

| Prop        | Type                                   | Default  |
| ----------- | -------------------------------------- | -------- |
| `animation` | `'roll' \| 'fade' \| 'blur' \| 'reel'` | `'roll'` |
| `as`        | `ElementType`                          | `'span'` |
| `className` | `string`                               | —        |
| `style`     | `CSSProperties`                        | —        |

Multiple `Value` instances inside one root are supported — all subscribe to the same tick.

### `<RafflePick.Button>`

Toggles start / freeze based on phase. Disabled during settling.

| Prop         | Type            | Notes                                            |
| ------------ | --------------- | ------------------------------------------------ |
| `startLabel` | `ReactNode`     | Shown in `idle` / `frozen` (click starts).       |
| `stopLabel`  | `ReactNode`     | Shown in `running` / `starting` (click stops).   |
| `waitLabel`  | `ReactNode`     | Shown in `settling` (button disabled).           |
| `children`   | `ReactNode`     | Fallback label when state-specific label absent. |
| `className`  | `string`        | —                                                |
| `style`      | `CSSProperties` | —                                                |

### `<RafflePick.Countdown>`

Schedules auto-freeze after `seconds`. Renders an SVG ring + numeric label by default. Optional render-prop for custom output.

| Prop        | Type                               | Notes                                          |
| ----------- | ---------------------------------- | ---------------------------------------------- |
| `seconds`   | `number` (required)                | Auto-freeze delay. Renders only while running. |
| `className` | `string`                           | —                                              |
| `style`     | `CSSProperties`                    | —                                              |
| `children`  | `(remaining: number) => ReactNode` | Render-prop for custom UI.                     |

### `<RafflePick.Slots>`

Independent multi-reel slot machine. Each reel ticks on its own and stops with a stagger.

| Prop                                               | Type                       | Default        | Notes                                        |
| -------------------------------------------------- | -------------------------- | -------------- | -------------------------------------------- |
| `length`                                           | `number`                   | `3`            | Number of reels.                             |
| `chars`                                            | `string`                   | `'0123456789'` | Charset pool. Emoji-safe (code-point split). |
| `spinInterval`                                     | `number` (ms, ≥ 50)        | `80`           | Tick rate per reel.                          |
| `staggerMs`                                        | `number`                   | `220`          | Delay between consecutive reel stops.        |
| `onResult`                                         | `(joined: string) => void` | —              | Fires when the last reel lands.              |
| `className`, `slotClassName`, `style`, `slotStyle` | various                    | —              | Style hooks.                                 |

## Recipes

### Inline chip in a sentence

```tsx
<RafflePick min={1} max={36} as="p" autoStart={false}>
  Roulette landed on <RafflePick.Value animation="roll" className="chip" /> —{' '}
  <RafflePick.Button startLabel="spin again" stopLabel="stop" className="link-btn" />
</RafflePick>
```

### Hero with countdown ring

```tsx
<RafflePick min={1} max={999} inertia autoStart={false} className="hero">
  <RafflePick.Countdown seconds={5} className="hero__ring" />
  <RafflePick.Value animation="blur" className="hero__value" />
  <RafflePick.Button startLabel="Start Draw" stopLabel="Stop" className="hero__btn" />
</RafflePick>
```

### Slot machine with custom result handler

```tsx
<RafflePick inertia autoStart={false}>
  <RafflePick.Slots
    length={5}
    chars="0123456789"
    staggerMs={260}
    onResult={(code) => console.log('winning code:', code)}
  />
  <RafflePick.Button startLabel="Spin" stopLabel="Stop" />
</RafflePick>
```

## Roadmap

- **Winner position** — emit row/index alongside value (`onSelect` receives `{ value, index }`) and a `<RafflePick.WinnerPosition>` consumer that reflects the landed position.
- **`bounce` animation** — vertical hop on each tick, easing back to baseline.
- **`glitch` animation** — offset color-channel pulse for a digital noise feel during running.
- Headless `useRafflePick()` hook for users who want zero rendering from the lib.
- Render-prop variant of `<Value>` for fully custom DOM.

## Performance notes

- Cycle ticks (every `interval` ms) write `textContent` directly via refs — no React render.
- Phase machine re-renders only on transitions (start, inertia step, settle, freeze).
- CSS animation duration is bound to `--rrp-tick` so each cycle aligns with one tick — no cross-frame tearing.
- `will-change` is scoped to running / inertia phases only, so idle / frozen text renders with crisp subpixel anti-aliasing.

## License

MIT
