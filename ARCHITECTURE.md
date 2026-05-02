# Architecture

## Concept

`RafflePick` ships as a **headless compound component**, not a monolithic widget.

The root component owns the raffle engine (cycling, phase machine, selection) and exposes it through React context. Sub-components (`Value`, `Button`, `Countdown`) are dumb consumers that read the context and render minimal markup with stable class hooks. The user composes them anywhere inside the root — in any order, nested in any layout, repeated, or omitted.

This inverts the current model. Instead of one component with twenty style/class props, the consumer wires up the building blocks themselves. The library owns behavior; the consumer owns layout.

## Goals

- **Composition over configuration.** No more `valueClassName`, `buttonClassName`, `countdownStyle`. Style each piece directly where it lives in the tree.
- **Zero opinion on layout.** The root renders no DOM container by default (or a single `<div>` with no styling). Consumers wrap pieces in their own grid, flex, card, modal — whatever fits.
- **Single source of truth.** All state lives in the root. Sub-components subscribe via context. No prop drilling, no duplicated state.
- **Performance preserved.** High-frequency tick updates still bypass React (imperative DOM writes through refs exposed by context). Sub-components only re-render on phase boundaries.
- **Tree-shakeable.** Each sub-component is an independent export. A consumer who skips `Countdown` ships none of its code.

## Public API

```tsx
import { RafflePick } from 'react-raffle-pick'

<RafflePick min={1} max={100} interval={100} inertia onSelect={(v) => console.log(v)}>
  <RafflePick.Value animation="roll" className="my-value" />
  <RafflePick.Button>Pick Winner</RafflePick.Button>
  <RafflePick.Countdown seconds={5} className="my-ring" />
</RafflePick>
```

### Root: `<RafflePick>`

Holds engine state. Provides context. Renders children inside an optional wrapper element.

| Prop          | Type                            | Notes                               |
| ------------- | ------------------------------- | ----------------------------------- |
| `min`, `max`  | `number`                        | Numeric range (ignored if `items`). |
| `items`       | `string[]`                      | Switches to item mode.              |
| `interval`    | `number` (ms, clamped ≥ 50)     | Tick speed.                         |
| `random`      | `boolean`                       | Random vs sequential cycling.       |
| `inertia`     | `boolean`                       | Soft start / soft stop ramp.        |
| `autoStart`   | `boolean`                       | Begin cycling on mount.             |
| `onSelect`    | `(value) => void`               | Fires once on freeze.               |
| `as`          | `keyof JSX.IntrinsicElements`   | Wrapper tag (default `'div'`).      |
| `className`   | `string`                        | Wrapper class.                      |
| `children`    | `ReactNode`                     | Compound children.                  |

### `<RafflePick.Value>`

Renders the current cycling number / item. Receives `animation` prop (`'roll' | 'fade' | 'blur' | 'reel'`) and class/style hooks. Internally writes text imperatively to its own ref — no React re-render per tick.

### `<RafflePick.Button>`

Toggles start/freeze based on current phase. Accepts `children` for label override. Disabled during settling phase.

### `<RafflePick.Countdown>`

Optional. When `seconds` is set, schedules auto-freeze after expiry and renders a circular SVG ring + numeric label. Decrements label every second.

## Context shape

```ts
interface RaffleContext {
  // State (drives render of sub-components)
  phase: 'idle' | 'starting' | 'running' | 'settling' | 'frozen'
  step: number              // inertia step
  displayed: RafflePickValue // value to render in JSX (post-freeze, pre-cycle)

  // Imperative handles (for sub-components that bypass React)
  valueRef: RefObject<number>      // live cycling value
  cycleInterval: number            // current tick ms (post-multiplier)
  registerValueNode: (node: HTMLElement | null) => void  // for imperative DOM writes

  // Actions
  start: () => void
  freeze: () => void
  reset: () => void

  // Config (forwarded for sub-component defaults)
  inertia: boolean
  hasItems: boolean
  itemsRef: RefObject<string[] | undefined>
}
```

## Internal layering

```
src/
  components/
    RafflePick/
      RafflePick.tsx           # root: context provider, owns engine
      RafflePickValue.tsx      # consumer: renders cycling value
      RafflePickButton.tsx     # consumer: toggles state
      RafflePickCountdown.tsx  # consumer: ring + auto-freeze
      context.ts               # createContext + useRaffleContext hook
      index.ts                 # bundles compound API
  hooks/
    useNumberCycle.ts          # imperative interval, no value state
    useRafflePhase.ts          # phase reducer + inertia timers
  utils/
    inertia.ts                 # constants + multiplier
    class-names.ts             # joinClassNames
    get-random.ts
  types.ts                     # public type exports
```

## Rendering strategy

1. **Tick (high frequency, every `cycleInterval` ms)**
   - `useNumberCycle` updates `valueRef.current`.
   - Calls `onTick` → writes `textContent` + `data-value` directly to the registered node.
   - Resets CSS animations via Web Animations API (`getAnimations` + `currentTime = 0`).
   - **No React render.**

2. **Phase change (rare: start, inertia step, settle, freeze)**
   - Reducer dispatches new phase / step.
   - Context re-renders → consumers re-render.
   - `useLayoutEffect` syncs span text to `valueRef.current` to prevent flicker on phase boundary.

3. **Freeze**
   - `onSettle` reads `valueRef.current`, calls `setDisplayed(...)`, fires `onSelect`.
   - Frozen value lives in React state (only mutation point per raffle round).

## Migration from monolithic API

| Old                     | New                                                        |
| ----------------------- | ---------------------------------------------------------- |
| `<RafflePick {...all} />` | `<RafflePick {...engine}><Value /><Button /></RafflePick>` |
| `valueClassName="x"`    | `<RafflePick.Value className="x" />`                       |
| `buttonClassName="x"`   | `<RafflePick.Button className="x" />`                      |
| `countdown={5}`         | `<RafflePick.Countdown seconds={5} />`                     |
| `animationType="roll"`  | `<RafflePick.Value animation="roll" />`                    |
| `buttonLabel="Pick"`    | `<RafflePick.Button>Pick</RafflePick.Button>`              |

Engine props (`min`, `max`, `interval`, `random`, `inertia`, `autoStart`, `items`, `onSelect`) stay on the root.

## Why context, not render props

Render props would force one consumer pattern. Context lets sub-components live anywhere in the subtree — buried in modals, in separate columns of a grid, conditionally rendered. Composition is unconstrained.

Context cost (re-render on every value change) is mitigated because the high-frequency cycling value is **never put in context** — it lives in a ref. Context only carries phase/step/displayed, which change at human-perceptible rates (a few times per round).

## Open questions

- Should `Countdown` be a render-prop variant (`<Countdown>{(remaining) => ...}</Countdown>`) for fully custom rendering? Likely yes as a secondary API.
- Multiple `Value` instances inside one root — supported (each registers its own node)? Probably yes; useful for split-flap displays of the same number with different animations.
- Headless `useRafflePick()` hook for users who want zero rendering from the lib — easy to add once context exists.
