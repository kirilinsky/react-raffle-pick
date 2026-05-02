import { useCallback, useMemo } from 'react'
import { joinClassNames } from '../../utils/class-names'
import type { RafflePickButtonProps } from '../../types'
import { useRaffleContext } from './context'

export function RafflePickButton({
  className,
  style,
  children,
  startLabel,
  stopLabel,
  waitLabel,
}: RafflePickButtonProps) {
  const { phase, start, freeze, reset } = useRaffleContext('RafflePick.Button')

  const running =
    phase === 'starting' || phase === 'running' || phase === 'settling'

  const handleClick = useCallback(() => {
    if (phase === 'settling') return
    if (running) {
      freeze()
      return
    }
    reset()
    start()
  }, [phase, running, freeze, reset, start])

  const cls = useMemo(
    () => joinClassNames('rrp-button', className),
    [className]
  )

  let label: typeof children
  if (phase === 'settling') label = waitLabel ?? stopLabel ?? children
  else if (phase === 'starting' || phase === 'running')
    label = stopLabel ?? children
  else label = startLabel ?? children

  return (
    <button
      className={cls}
      style={style}
      disabled={phase === 'settling'}
      onClick={handleClick}
      data-phase={phase}
    >
      {label}
    </button>
  )
}
