import { useEffect, useState } from 'react'
import { getRandom } from '../utils/get-random'

export const useNumberCycle = (min: number, max: number, interval: number) => {
  const [currentValue, setCurrentValue] = useState(min)
  const [startFlag, setStartFlag] = useState<boolean>(false)
  const [stopFlag, setStopFlag] = useState<boolean>(true)

  const start = () => {
    setStopFlag(false)
    setStartFlag(true)
  }

  const stop = () => {
    setStopFlag(true)
    setStartFlag(false)
  }

  useEffect(() => {
    if (stopFlag && !startFlag) return
    const intervalId = setInterval(() => {
      const rNum = getRandom(min, max)
      setCurrentValue(rNum)
    }, interval)
    return () => clearInterval(intervalId)
  }, [startFlag, stopFlag])

  return { currentValue, start, stop }
}
