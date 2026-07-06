import { createContext, useContext, type RefObject } from 'react'
import type { RafflePickValue } from '../../types'
import type { RafflePickPhase } from '../../utils/inertia'

export interface RaffleContextValue {
  phase: RafflePickPhase
  step: number
  displayed: RafflePickValue
  cycleInterval: number
  inertia: boolean
  hasItems: boolean
  initialIndex: number
  initialValue?: RafflePickValue
  finalValue?: RafflePickValue

  /** Whether `noRepeat` is enabled for this round. */
  noRepeat: boolean
  /** `noRepeat` pool has no candidates left — `start()` is a no-op until `resetHistory()`. */
  exhausted: boolean
  /** Candidates left to draw. Equals the full pool size when `noRepeat` is off. */
  remaining: number

  valueRef: RefObject<number>
  displayValue: (index: number) => RafflePickValue

  subscribe: (fn: (value: number) => void) => () => void

  start: () => void
  freeze: () => void
  reset: () => void
  /** Clears the `noRepeat` history so previously drawn values can appear again. */
  resetHistory: () => void
}

export const RaffleContext = createContext<RaffleContextValue | null>(null)

export const useRaffleContext = (componentName: string): RaffleContextValue => {
  const ctx = useContext(RaffleContext)
  if (!ctx) {
    throw new Error(`<${componentName}> must be rendered inside <RafflePick>.`)
  }
  return ctx
}
