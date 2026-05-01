import { useCallback, useEffect, useRef, useState } from 'react'
import { useNumberCycle } from '../../hooks/useNumberCycle'
import { useSelection } from '../../hooks/useSelection'
import type { RafflePickProps } from '../../types'

const START_INERTIA_MS = 460
const STOP_INERTIA_MS = 1080
const START_INERTIA_INTERVAL_MULTIPLIERS = [2.4, 1.55, 1]
const STOP_INERTIA_INTERVAL_MULTIPLIERS = [1.15, 1.65, 2.35, 3.25]
const START_INERTIA_STEPS = [
  { delay: 140, step: 1 },
  { delay: 300, step: 2 },
]
const STOP_INERTIA_STEPS = [
  { delay: 180, step: 1 },
  { delay: 460, step: 2 },
  { delay: 760, step: 3 },
]

type RafflePickPhase = 'idle' | 'starting' | 'running' | 'settling' | 'frozen'

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ')

export function RafflePick({
  items,
  min = 1,
  max = 100,
  interval = 80,
  random = true,
  inertia = false,
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
  const itemCount = items?.length ?? 0
  const hasItems = itemCount > 0
  const cycleMin = hasItems ? 0 : min
  const cycleMax = hasItems ? itemCount - 1 : max
  const initialPhase = autoStart ? (inertia ? 'starting' : 'running') : 'idle'
  const [phase, setPhase] = useState<RafflePickPhase>(initialPhase)
  const [inertiaStep, setInertiaStep] = useState(0)
  const inertiaIntervalMultiplier =
    inertia && phase === 'starting'
      ? (START_INERTIA_INTERVAL_MULTIPLIERS[inertiaStep] ?? 1)
      : inertia && phase === 'settling'
        ? (STOP_INERTIA_INTERVAL_MULTIPLIERS[inertiaStep] ??
          STOP_INERTIA_INTERVAL_MULTIPLIERS[STOP_INERTIA_INTERVAL_MULTIPLIERS.length - 1])
        : 1
  const cycleInterval = Math.max(16, Math.round(interval * inertiaIntervalMultiplier))
  const {
    start: cycleStart,
    stop: cycleStop,
    currentValue,
  } = useNumberCycle(cycleMin, cycleMax, cycleInterval, random, autoStart)
  const { state, start, freeze, reset } = useSelection(onSelect, autoStart ? 'running' : 'idle')
  const selectedValue = hasItems ? items![currentValue] : currentValue
  const selectedValueRef = useRef(selectedValue)
  const inertiaTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([])

  const clearInertiaTimers = useCallback(() => {
    inertiaTimersRef.current.forEach(clearTimeout)
    inertiaTimersRef.current = []
  }, [])

  const queueInertiaTimer = useCallback((callback: () => void, delay: number) => {
    const timerId = setTimeout(callback, delay)
    inertiaTimersRef.current.push(timerId)
  }, [])

  const setRunningPhase = useCallback(() => {
    if (!inertia) {
      setPhase('running')
      return
    }

    setInertiaStep(0)
    setPhase('starting')
  }, [inertia])

  const startRaffle = useCallback(() => {
    clearInertiaTimers()
    reset()
    start()
    cycleStart()
    setRunningPhase()
  }, [clearInertiaTimers, cycleStart, reset, setRunningPhase, start])

  const freezeRaffle = useCallback(() => {
    if (!inertia) {
      cycleStop()
      freeze(selectedValueRef.current)
      setPhase('frozen')
      return
    }

    clearInertiaTimers()
    setInertiaStep(0)
    setPhase('settling')
  }, [clearInertiaTimers, cycleStop, freeze, inertia])

  useEffect(() => {
    selectedValueRef.current = selectedValue
  }, [selectedValue])

  useEffect(() => {
    if (phase !== 'starting') {
      return
    }

    clearInertiaTimers()
    START_INERTIA_STEPS.forEach(({ delay, step }) => {
      queueInertiaTimer(() => setInertiaStep(step), delay)
    })

    queueInertiaTimer(() => {
      setInertiaStep(0)
      setPhase('running')
      clearInertiaTimers()
    }, START_INERTIA_MS)

    return clearInertiaTimers
  }, [clearInertiaTimers, phase, queueInertiaTimer])

  useEffect(() => {
    if (phase !== 'settling') {
      return
    }

    clearInertiaTimers()
    STOP_INERTIA_STEPS.forEach(({ delay, step }) => {
      queueInertiaTimer(() => setInertiaStep(step), delay)
    })

    queueInertiaTimer(() => {
      cycleStop()
      freeze(selectedValueRef.current)
      setInertiaStep(0)
      setPhase('frozen')
      clearInertiaTimers()
    }, STOP_INERTIA_MS)

    return clearInertiaTimers
  }, [clearInertiaTimers, cycleStop, freeze, phase, queueInertiaTimer])

  useEffect(() => clearInertiaTimers, [clearInertiaTimers])

  const handleClick = () => {
    if (phase === 'settling') {
      return
    }

    if (state === 'running') {
      freezeRaffle()
      return
    }

    startRaffle()
  }

  const label = state === 'frozen' ? 'Pick Again' : buttonLabel
  const valueKey = state === 'frozen' ? `${animationType}-${String(selectedValue)}` : animationType

  return (
    <div
      className={joinClassNames('rrp', className)}
      data-state={state}
      data-phase={phase}
      data-inertia-step={inertiaStep}
      data-animation={animationType}
      data-inertia={inertia ? '' : undefined}
      style={style}
    >
      <span
        key={valueKey}
        className={joinClassNames('rrp-value', valueClassName)}
        data-animation={animationType}
        data-value={selectedValue}
        data-phase={phase}
        data-inertia-step={inertiaStep}
        style={valueStyle}
      >
        {selectedValue}
      </span>
      <button
        className={joinClassNames('rrp-button', buttonClassName)}
        disabled={phase === 'settling'}
        style={buttonStyle}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  )
}
