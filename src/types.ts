import type { CSSProperties, ElementType, ReactNode } from 'react'

export type AnimationType = 'roll' | 'fade' | 'blur' | 'reel'
export type RafflePickValue = number | string

export interface RafflePickRootProps {
  items?: string[]
  min?: number
  max?: number
  interval?: number
  random?: boolean
  inertia?: boolean
  autoStart?: boolean
  /** Value shown before first run. Number in min/max mode, string in items mode. */
  initialValue?: RafflePickValue
  /** When set, settle always lands on this value while cycle still appears random. */
  finalValue?: RafflePickValue
  onSelect?: (value: RafflePickValue) => void
  as?: ElementType
  className?: string
  style?: CSSProperties
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
