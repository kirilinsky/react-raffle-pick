import { useEffect, useRef, type RefObject } from 'react'
import { getRandom } from '../utils/get-random'

interface UseNumberCycleArgs {
  min: number
  max: number
  interval: number
  random: boolean
  running: boolean
  valueRef: RefObject<number>
  /**
   * Ref to a set of values to never land on (no-repeat draws). Read inside
   * the tick, not as a dependency — mutating the set in place does not
   * restart the interval.
   */
  excludedRef?: RefObject<Set<number>>
  onTick?: (value: number) => void
}

export const useNumberCycle = ({
  min,
  max,
  interval,
  random,
  running,
  valueRef,
  excludedRef,
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
      const excluded = excludedRef?.current
      const total = max - min + 1
      let next: number

      if (excluded && excluded.size > 0 && excluded.size < total) {
        if (random) {
          // Rejection sampling — bounded, since a degenerate RNG (or plain
          // bad luck) must not spin forever. Deterministic scan (guaranteed
          // to terminate: `excluded.size < total` means a free value exists)
          // is the fallback once the retry budget runs out.
          next = getRandom(min, max)
          let attempts = 0
          while (excluded.has(next) && attempts < 20) {
            next = getRandom(min, max)
            attempts++
          }
          while (excluded.has(next)) {
            next = next >= max ? min : next + 1
          }
        } else {
          next = cur
          do {
            next = next >= max ? min : next + 1
          } while (excluded.has(next))
        }
      } else {
        next = random ? getRandom(min, max) : cur >= max ? min : cur + 1
      }

      valueRef.current = next
      onTickRef.current?.(next)
    }, interval)
    return () => clearInterval(id)
  }, [running, interval, min, max, random, valueRef, excludedRef])

  return valueRef
}
