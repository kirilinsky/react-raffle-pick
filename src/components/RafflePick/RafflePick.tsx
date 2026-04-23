import { useEffect } from 'react'
import { useNumberCycle } from '../../hooks/useNumberCycle'
import { useSelection } from '../../hooks/useSelection'
import type { RafflePickProps } from '../../types'

export function RafflePick({
  min = 1,
  max = 100,
  interval = 80,
  buttonLabel = 'Pick Winner',
  autoStart = true,
  onSelect,
  className,
}: RafflePickProps) {
  const { start: cycleStart, stop: cycleStop, currentValue } = useNumberCycle(min, max, interval)
  const { state, start, freeze, reset } = useSelection(onSelect)

  useEffect(() => {
    if (autoStart) {
      start()
      cycleStart()
    }
  }, [])

  const handleClick = () => {
    if (state === 'running') {
      cycleStop()
      freeze(currentValue)
    } else {
      reset()
      start()
      cycleStart()
    }
  }

  const label = state === 'frozen' ? 'Pick Again' : buttonLabel

  return (
    <div className={className} style={{ display: 'flex', gap: '5px' }}>
      <span style={{ width: max.toString().length + 'ch' }}>{currentValue}</span>
      <button onClick={handleClick}>{label}</button>
    </div>
  )
}
