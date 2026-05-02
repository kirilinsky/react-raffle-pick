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

  const [displayed, setDisplayed] = useState<RafflePickValue>(() =>
    items && items.length > 0 ? items[cycleMin] : cycleMin
  )

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

  const valueRef = useRef<number>(cycleMin)

  const onSettle = useCallback(() => {
    const v = displayValue(valueRef.current)
    setDisplayed(v)
    onSelect?.(v)
  }, [displayValue, onSelect])

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
      initialIndex: cycleMin,
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
      cycleMin,
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
