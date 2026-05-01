import { useEffect, useRef, type RefObject } from 'react'
import { getRandom } from '../utils/get-random'

interface UseNumberCycleArgs {
  min: number
  max: number
  interval: number
  random: boolean
  running: boolean
  valueRef: RefObject<number>
  onTick?: (value: number) => void
}

export const useNumberCycle = ({
  min,
  max,
  interval,
  random,
  running,
  valueRef,
  onTick,
}: UseNumberCycleArgs) => {
  const onTickRef = useRef(onTick)

  useEffect(() => {
    onTickRef.current = onTick
  })

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      const cur = valueRef.current
      const next = random
        ? getRandom(min, max)
        : cur >= max
          ? min
          : cur + 1
      valueRef.current = next
      onTickRef.current?.(next)
    }, interval)
    return () => clearInterval(id)
  }, [running, interval, min, max, random])

  return valueRef
}
