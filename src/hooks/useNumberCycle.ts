import { useEffect, useRef, useState } from 'react'
import { getRandom } from '../utils/get-random'

export const useNumberCycle = (min: number, max: number, interval: number) => {
  const [currentValue, setCurrentValue] = useState(min)
  const intervalRef = useRef<number>(interval)
  const [startFlag, setStartFlag] = useState<boolean>(false)

  const start = () => {
    setStartFlag(true)
  }

  const stop = () => {
    setStartFlag(false)
  }

  useEffect(() => {
    if (!startFlag) return
    const intervalId = setInterval(() => {
      const rNum = getRandom(min, max)
      setCurrentValue(rNum)
    }, intervalRef.current)
    return () => clearInterval(intervalId)
  }, [startFlag, min, max])

  return { currentValue, start, stop, started: startFlag }
}
