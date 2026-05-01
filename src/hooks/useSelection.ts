import { useCallback, useState } from 'react'
import type { RafflePickValue } from '../types'

type SelectionState = 'idle' | 'running' | 'frozen'

export function useSelection(
  onSelect?: (value: RafflePickValue) => void,
  initialState: SelectionState = 'idle'
) {
  const [state, setState] = useState<SelectionState>(initialState)

  const start = useCallback(() => {
    setState('running')
  }, [])

  const freeze = useCallback(
    (value: RafflePickValue) => {
      setState('frozen')
      onSelect?.(value)
    },
    [onSelect]
  )

  const reset = useCallback(() => {
    setState('idle')
  }, [])

  return { state, start, freeze, reset }
}
