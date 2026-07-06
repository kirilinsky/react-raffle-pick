import type { CSSProperties, ElementType, ReactNode } from 'react'

export type AnimationType = 'roll' | 'fade' | 'blur' | 'reel'
export type RafflePickValue = number | string

export interface RafflePickRootProps {
  /**
   * Item pool to cycle through (names, tickets, anything). Switches the
   * component to "items mode" — `min`/`max` are ignored. An empty array
   * (`[]`, as opposed to `undefined`) is treated as "no items" and falls
   * back to the numeric `min`/`max` range.
   */
  items?: string[]
  /** Range start in numeric mode. Ignored when `items` is set. */
  min?: number
  /** Range end in numeric mode. Ignored when `items` is set. */
  max?: number
  /** Tick speed in ms. Clamped to a minimum of 50. */
  interval?: number
  /** Pick the next tick value at random instead of incrementing sequentially. */
  random?: boolean
  /** Soft-start / soft-stop ramp (`starting`/`settling` phases) instead of an instant flip. */
  inertia?: boolean
  /** Begin cycling on mount. Set `false` to wait for `<RafflePick.Button>`/`start()`. */
  autoStart?: boolean
  /**
   * Exclude previously frozen values from future rounds within this mounted
   * instance — no duplicate winners across sequential draws. Default `true`.
   * Set `false` to allow the same value/entry to be picked again. History is
   * cleared on unmount (or via `resetHistory()` from `useRaffleContext()`) —
   * remount with a new `key` for a fresh no-repeat pool.
   */
  noRepeat?: boolean
  /** Value shown before first run. Number in min/max mode, string in items mode. */
  initialValue?: RafflePickValue
  /** When set, settle always lands on this value while cycle still appears random. */
  finalValue?: RafflePickValue
  /** Fires once per round, when the phase settles to `frozen`. */
  onSelect?: (value: RafflePickValue) => void
  /** Fires when `start()`/`<RafflePick.Button>` is used but `noRepeat` has exhausted the pool. */
  onExhausted?: () => void
  /** Wrapper element/component. Default `'div'`. */
  as?: ElementType
  /** Wrapper class. */
  className?: string
  /** Wrapper inline style. */
  style?: CSSProperties
  /** Compound sub-components: `<RafflePick.Value>`, `.Button`, `.Countdown`, `.Slots`. */
  children?: ReactNode
}

export interface RafflePickValueProps {
  animation?: AnimationType
  className?: string
  style?: CSSProperties
  as?: ElementType
}

export interface RafflePickButtonProps {
  className?: string
  style?: CSSProperties
  /** Fallback label across all states. */
  children?: ReactNode
  /** Label for idle / frozen (click starts a round). */
  startLabel?: ReactNode
  /** Label while running (click stops). */
  stopLabel?: ReactNode
  /** Label while settling (button disabled). */
  waitLabel?: ReactNode
  /** External disable (e.g. form not valid). Always disabled while settling regardless. */
  disabled?: boolean
}

export interface RafflePickSlotsProps {
  /** Number of slots. */
  length?: number
  /** Character pool each slot picks from. */
  chars?: string
  /** Tick interval per slot, ms. Clamped ≥ 50. */
  spinInterval?: number
  /** Delay between consecutive slot stops on settle, ms. */
  staggerMs?: number
  className?: string
  slotClassName?: string
  style?: CSSProperties
  slotStyle?: CSSProperties
  /** Fires when last slot stops with joined result. */
  onResult?: (result: string) => void
}

export interface RafflePickCountdownProps {
  /** Seconds before auto-freeze. Required. */
  seconds: number
  className?: string
  style?: CSSProperties
  /** Render-prop for fully custom output. Receives remaining seconds. */
  children?: (remaining: number) => ReactNode
}
