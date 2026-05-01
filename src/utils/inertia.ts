export type RafflePickPhase = 'idle' | 'starting' | 'running' | 'settling' | 'frozen'

export const START_INERTIA_MS = 460
export const STOP_INERTIA_MS = 1080

const START_INTERVAL_MULTIPLIERS = [2.4, 1.55, 1]
const STOP_INTERVAL_MULTIPLIERS = [1.15, 1.65, 2.35, 3.25]

export const START_INERTIA_STEPS = [
  { delay: 140, step: 1 },
  { delay: 300, step: 2 },
] as const

export const STOP_INERTIA_STEPS = [
  { delay: 180, step: 1 },
  { delay: 460, step: 2 },
  { delay: 760, step: 3 },
] as const

export const getInertiaMultiplier = (
  phase: RafflePickPhase,
  step: number,
  inertia: boolean
) => {
  if (!inertia) return 1
  if (phase === 'starting') return START_INTERVAL_MULTIPLIERS[step] ?? 1
  if (phase === 'settling') {
    return (
      STOP_INTERVAL_MULTIPLIERS[step] ??
      STOP_INTERVAL_MULTIPLIERS[STOP_INTERVAL_MULTIPLIERS.length - 1]
    )
  }
  return 1
}
