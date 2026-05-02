import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
} from 'react'
import { useNumberCycle } from '../../hooks/useNumberCycle'
import { useRafflePhase } from '../../hooks/useRafflePhase'
import { joinClassNames } from '../../utils/class-names'
import { getInertiaMultiplier, type RafflePickPhase } from '../../utils/inertia'
import type { RafflePickRootProps, RafflePickValue } from '../../types'
import { RaffleContext, type RaffleContextValue } from './context'

export function RafflePickRoot({
  items,
  min = 1,
  max = 100,
  interval = 100,
  random = true,
  inertia = false,
  autoStart = true,
  initialValue,
  finalValue,
  onSelect,
  as = 'div',
  className,
  style,
  children,
}: RafflePickRootProps) {
  const itemCount = items?.length ?? 0
  const hasItems = itemCount > 0
  const cycleMin = hasItems ? 0 : min
  const cycleMax = hasItems ? itemCount - 1 : max

  const initialPhase: RafflePickPhase = autoStart
    ? inertia
      ? 'starting'
      : 'running'
    : 'idle'

  const itemsRef = useRef(items)
  useEffect(() => {
    itemsRef.current = items
  }, [items])

  const displayValue = useCallback((index: number): RafflePickValue => {
    const its = itemsRef.current
    return its && its.length > 0 ? its[index] : index
  }, [])

  const valueToIndex = useCallback(
    (value: RafflePickValue | undefined): number | undefined => {
      if (value === undefined) return undefined
      const its = itemsRef.current
      if (its && its.length > 0) {
        const i = its.indexOf(String(value))
        return i >= 0 ? i : undefined
      }
      return typeof value === 'number' ? value : undefined
    },
    []
  )

  const initialIndex = (() => {
    if (initialValue === undefined) return cycleMin
    if (items && items.length > 0) {
      const i = items.indexOf(String(initialValue))
      return i >= 0 ? i : cycleMin
    }
    return typeof initialValue === 'number' ? initialValue : cycleMin
  })()

  const [displayed, setDisplayed] = useState<RafflePickValue>(() => {
    if (initialValue !== undefined) {
      const its = items
      if (its && its.length > 0) {
        const i = its.indexOf(String(initialValue))
        if (i >= 0) return its[i]
      } else if (typeof initialValue === 'number') {
        return initialValue
      }
    }
    return items && items.length > 0 ? items[cycleMin] : cycleMin
  })

  const subscribersRef = useRef<Set<(value: number) => void>>(new Set())
  const subscribe = useCallback((fn: (value: number) => void) => {
    subscribersRef.current.add(fn)
    return () => {
      subscribersRef.current.delete(fn)
    }
  }, [])

  const onTick = useCallback((value: number) => {
    const subs = subscribersRef.current
    subs.forEach((fn) => fn(value))
  }, [])

  const valueRef = useRef<number>(initialIndex)

  const finalValueRef = useRef(finalValue)
  useEffect(() => {
    finalValueRef.current = finalValue
  }, [finalValue])

  const onSettle = useCallback(() => {
    const forced = valueToIndex(finalValueRef.current)
    if (forced !== undefined) {
      valueRef.current = forced
    }
    const v = displayValue(valueRef.current)
    setDisplayed(v)
    onSelect?.(v)
  }, [displayValue, onSelect, valueToIndex])

  const { phase, step, start, freeze, reset } = useRafflePhase(
    inertia,
    initialPhase,
    onSettle
  )

  const multiplier = getInertiaMultiplier(phase, step, inertia)
  const safeInterval = Math.max(50, interval)
  const cycleInterval = Math.round(safeInterval * multiplier)
  const running = phase === 'starting' || phase === 'running' || phase === 'settling'

  useNumberCycle({
    min: cycleMin,
    max: cycleMax,
    interval: cycleInterval,
    random,
    running,
    valueRef,
    onTick,
  })

  const ctxValue: RaffleContextValue = useMemo(
    () => ({
      phase,
      step,
      displayed,
      cycleInterval,
      inertia,
      hasItems,
      initialIndex,
      valueRef,
      displayValue,
      subscribe,
      start,
      freeze,
      reset,
    }),
    [
      phase,
      step,
      displayed,
      cycleInterval,
      inertia,
      hasItems,
      initialIndex,
      displayValue,
      subscribe,
      start,
      freeze,
      reset,
    ]
  )

  const selectionState =
    phase === 'idle' ? 'idle' : phase === 'frozen' ? 'frozen' : 'running'

  return createElement(
    as as ElementType,
    {
      className: joinClassNames('rrp', className),
      'data-state': selectionState,
      'data-phase': phase,
      'data-inertia-step': step,
      'data-inertia': inertia ? '' : undefined,
      style,
    },
    <RaffleContext.Provider value={ctxValue}>{children}</RaffleContext.Provider>
  )
}
