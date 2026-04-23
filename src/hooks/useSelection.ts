import { useCallback, useState } from 'react'

type SelectionState = 'idle' | 'running' | 'frozen'

export function useSelection(onSelect?: (value: number) => void) {
  const [state, setState] = useState<SelectionState>('idle')

  const start = useCallback(() => {
    setState('running')
  }, [])

  const freeze = useCallback(
    (value: number) => {
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
