import { useNumberCycle } from '../../hooks/useNumberCycle'
import type { RafflePickProps } from '../../types'

export function RafflePick(_props: RafflePickProps) {
  const { buttonLabel, min, max, interval = 100 } = _props
  if (!min || !max) return
  const { start, stop, currentValue } = useNumberCycle(min, max, interval)

  return (
    <div>
      {currentValue} - currentValue
      {buttonLabel && <button onClick={start}>{buttonLabel}</button>}
      <button onClick={stop}>stop</button>
    </div>
  )
}
