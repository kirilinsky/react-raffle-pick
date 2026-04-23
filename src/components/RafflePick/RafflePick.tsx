import { useNumberCycle } from '../../hooks/useNumberCycle'
import type { RafflePickProps } from '../../types'

export function RafflePick({
  min = 1,
  max = 100,
  interval = 80,
  buttonLabel = 'Pick Winner',
  className,
}: RafflePickProps) {
  const { start, stop, currentValue, started } = useNumberCycle(min, max, interval)

  return (
    <div className={className} style={{ display: 'flex', gap: '5px' }}>
      <span style={{ width: max.toString().length + 'ch' }}>{currentValue}</span>
      <button onClick={started ? stop : start}>{buttonLabel}</button>
    </div>
  )
}
