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

  valueRef: RefObject<number>
  displayValue: (index: number) => RafflePickValue

  subscribe: (fn: (value: number) => void) => () => void

  start: () => void
  freeze: () => void
  reset: () => void
}

export const RaffleContext = createContext<RaffleContextValue | null>(null)

export const useRaffleContext = (componentName: string): RaffleContextValue => {
  const ctx = useContext(RaffleContext)
  if (!ctx) {
    throw new Error(
      `<${componentName}> must be rendered inside <RafflePick>.`
    )
  }
  return ctx
}
