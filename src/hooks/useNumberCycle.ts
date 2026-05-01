import { useCallback, useEffect, useState } from 'react'
import { getRandom } from '../utils/get-random'

export const useNumberCycle = (min: number, max: number, interval: number) => {
  const [currentValue, setCurrentValue] = useState(min)
  const [startFlag, setStartFlag] = useState<boolean>(false)

  const start = useCallback(() => {
    setStartFlag(true)
  }, [])

  const stop = useCallback(() => {
    setStartFlag(false)
  }, [])

  useEffect(() => {
    if (!startFlag) return
    const intervalId = setInterval(() => {
      const rNum = getRandom(min, max)
      setCurrentValue(rNum)
    }, interval)
    return () => clearInterval(intervalId)
  }, [startFlag, min, max, interval])

  return { currentValue, start, stop, started: startFlag }
}
