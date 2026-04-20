import { Calendar } from 'react-calendar-datetime'
import { useNumberCycle } from '../../hooks/useNumberCycle'
import type { RafflePickProps } from '../../types'
import 'react-calendar-datetime/style.css'

export function RafflePick(_props: RafflePickProps) {
  const { buttonLabel, min, max, interval = 100 } = _props
  if (!min || !max) return
  const { start, stop, currentValue, started } = useNumberCycle(min, max, interval)

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <span style={{ width: max.toString().length + 'ch' }}> {currentValue}</span>
      <Calendar time={false}/>
      {buttonLabel && <button onClick={started ? stop : start}>{buttonLabel}</button>}
    </div>
  )
}
