import { useEffect, useMemo, useState } from 'react'
import { joinClassNames } from '../../utils/class-names'
import type { RafflePickCountdownProps } from '../../types'
import { useRaffleContext } from './context'

export function RafflePickCountdown({
  seconds,
  className,
  style,
  children,
}: RafflePickCountdownProps) {
  const { phase } = useRaffleContext('RafflePick.Countdown')
  if (phase !== 'running') return null
  return (
    <CountdownRunning
      key={`countdown-${seconds}`}
      seconds={seconds}
      className={className}
      style={style}
    >
      {children}
    </CountdownRunning>
  )
}

function CountdownRunning({
  seconds,
  className,
  style,
  children,
}: RafflePickCountdownProps) {
  const { freeze } = useRaffleContext('RafflePick.Countdown')

  const [remaining, setRemaining] = useState<number>(seconds)

  useEffect(() => {
    if (!seconds || seconds <= 0) return
    const tickId = setInterval(() => {
      setRemaining((r) => (r > 1 ? r - 1 : 0))
    }, 1000)
    const stopId = setTimeout(() => freeze(), seconds * 1000)
    return () => {
      clearInterval(tickId)
      clearTimeout(stopId)
    }
  }, [seconds, freeze])

  const cls = useMemo(
    () => joinClassNames('rrp-countdown', className),
    [className]
  )

  const mergedStyle = useMemo(
    () => ({ ...style, ['--rrp-countdown' as string]: `${seconds}s` }),
    [style, seconds]
  )

  if (children) {
    return (
      <span className={cls} style={mergedStyle} aria-hidden="true">
        {children(remaining)}
      </span>
    )
  }

  return (
    <span className={cls} style={mergedStyle} aria-hidden="true">
      <svg className="rrp-countdown__svg" viewBox="0 0 36 36">
        <circle className="rrp-countdown__track" cx="18" cy="18" r="16" />
        <circle className="rrp-countdown__bar" cx="18" cy="18" r="16" />
      </svg>
      <span className="rrp-countdown__label">{remaining}</span>
    </span>
  )
}
