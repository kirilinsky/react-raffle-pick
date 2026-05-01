import { useCallback, useEffect, useReducer, useRef } from 'react'
import {
  START_INERTIA_MS,
  START_INERTIA_STEPS,
  STOP_INERTIA_MS,
  STOP_INERTIA_STEPS,
  type RafflePickPhase,
} from '../utils/inertia'

type State = { phase: RafflePickPhase; step: number }
type Action =
  | { type: 'phase'; phase: RafflePickPhase }
  | { type: 'step'; step: number }

const reducer = (s: State, a: Action): State =>
  a.type === 'phase' ? { phase: a.phase, step: 0 } : { phase: s.phase, step: a.step }

export function useRafflePhase(
  inertia: boolean,
  initialPhase: RafflePickPhase,
  onSettle: () => void
) {
  const [state, dispatch] = useReducer(reducer, { phase: initialPhase, step: 0 })
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([])
  const onSettleRef = useRef(onSettle)

  useEffect(() => {
    onSettleRef.current = onSettle
  })

  const clear = useCallback(() => {
    const timers = timersRef.current
    for (let i = 0; i < timers.length; i++) clearTimeout(timers[i])
    timersRef.current = []
  }, [])

  useEffect(() => {
    if (state.phase === 'starting') {
      for (const { delay, step } of START_INERTIA_STEPS) {
        timersRef.current.push(
          setTimeout(() => dispatch({ type: 'step', step }), delay)
        )
      }
      timersRef.current.push(
        setTimeout(() => dispatch({ type: 'phase', phase: 'running' }), START_INERTIA_MS)
      )
    } else if (state.phase === 'settling') {
      for (const { delay, step } of STOP_INERTIA_STEPS) {
        timersRef.current.push(
          setTimeout(() => dispatch({ type: 'step', step }), delay)
        )
      }
      timersRef.current.push(
        setTimeout(() => {
          onSettleRef.current()
          dispatch({ type: 'phase', phase: 'frozen' })
        }, STOP_INERTIA_MS)
      )
    }
    return clear
  }, [state.phase, clear])

  const start = useCallback(() => {
    clear()
    dispatch({ type: 'phase', phase: inertia ? 'starting' : 'running' })
  }, [clear, inertia])

  const freeze = useCallback(() => {
    clear()
    if (inertia) {
      dispatch({ type: 'phase', phase: 'settling' })
    } else {
      onSettleRef.current()
      dispatch({ type: 'phase', phase: 'frozen' })
    }
  }, [clear, inertia])

  const reset = useCallback(() => {
    clear()
    dispatch({ type: 'phase', phase: 'idle' })
  }, [clear])

  return { phase: state.phase, step: state.step, start, freeze, reset }
}
