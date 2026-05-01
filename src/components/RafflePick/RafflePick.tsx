import { useEffect } from 'react'
import { useNumberCycle } from '../../hooks/useNumberCycle'
import { useSelection } from '../../hooks/useSelection'
import type { RafflePickProps } from '../../types'

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ')

export function RafflePick({
  min = 1,
  max = 100,
  interval = 80,
  animationType = 'roll',
  buttonLabel = 'Pick Winner',
  autoStart = true,
  onSelect,
  className,
  valueClassName,
  buttonClassName,
  style,
  valueStyle,
  buttonStyle,
}: RafflePickProps) {
  const { start: cycleStart, stop: cycleStop, currentValue } = useNumberCycle(min, max, interval)
  const { state, start, freeze, reset } = useSelection(onSelect)

  useEffect(() => {
    if (autoStart) {
      start()
      cycleStart()
    }
  }, [autoStart, cycleStart, start])

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
  const valueKey = `${animationType}-${currentValue}`

  return (
    <div
      className={joinClassNames('rrp', className)}
      data-state={state}
      data-animation={animationType}
      style={style}
    >
      <span
        key={valueKey}
        className={joinClassNames('rrp-value', valueClassName)}
        data-animation={animationType}
        style={valueStyle}
      >
        {currentValue}
      </span>
      <button
        className={joinClassNames('rrp-button', buttonClassName)}
        style={buttonStyle}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  )
}
