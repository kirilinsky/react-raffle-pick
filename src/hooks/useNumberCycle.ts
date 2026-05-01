import { useCallback, useEffect, useState } from 'react'
import { getRandom } from '../utils/get-random'

export const useNumberCycle = (
  min: number,
  max: number,
  interval: number,
  random = true,
  initialStarted = false
) => {
  const [currentValue, setCurrentValue] = useState(min)
  const [startFlag, setStartFlag] = useState<boolean>(initialStarted)

  const start = useCallback(() => {
    setStartFlag(true)
  }, [])

  const stop = useCallback(() => {
    setStartFlag(false)
  }, [])

  useEffect(() => {
    if (!startFlag) return
    const intervalId = setInterval(() => {
      setCurrentValue((value) => {
        if (random) return getRandom(min, max)
        return value >= max ? min : value + 1
      })
    }, interval)
    return () => clearInterval(intervalId)
  }, [startFlag, min, max, interval, random])

  return { currentValue, start, stop, started: startFlag }
}
