import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNumberCycle } from '../../hooks/useNumberCycle'
import { useRafflePhase } from '../../hooks/useRafflePhase'
import { joinClassNames } from '../../utils/class-names'
import { getInertiaMultiplier, type RafflePickPhase } from '../../utils/inertia'
import type { RafflePickProps, RafflePickValue } from '../../types'

export function RafflePick({
  items,
  min = 1,
  max = 100,
  interval = 110,
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

  const initialPhase: RafflePickPhase = autoStart
    ? inertia
      ? 'starting'
      : 'running'
    : 'idle'

  const itemsRef = useRef(items)
  itemsRef.current = items

  const displayValue = useCallback((v: number): RafflePickValue => {
    const its = itemsRef.current
    return its && its.length > 0 ? its[v] : v
  }, [])

  const spanRef = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState<RafflePickValue>(() =>
    displayValue(cycleMin)
  )

  const writeSpan = useCallback(
    (value: number) => {
      const node = spanRef.current
      if (!node) return
      const txt = String(displayValue(value))
      node.textContent = txt
      node.setAttribute('data-value', txt)
      const anims = node.getAnimations({ subtree: true })
      for (let i = 0; i < anims.length; i++) anims[i].currentTime = 0
    },
    [displayValue]
  )

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
  const cycleInterval = Math.max(16, Math.round(interval * multiplier))
  const running = phase === 'starting' || phase === 'running' || phase === 'settling'

  useNumberCycle({
    min: cycleMin,
    max: cycleMax,
    interval: cycleInterval,
    random,
    running,
    valueRef,
    onTick: writeSpan,
  })

  useLayoutEffect(() => {
    if (running) writeSpan(valueRef.current)
  })

  const handleClick = useCallback(() => {
    if (phase === 'settling') return
    if (running) {
      freeze()
      return
    }
    reset()
    start()
  }, [phase, running, freeze, reset, start])

  const selectionState = phase === 'idle' ? 'idle' : phase === 'frozen' ? 'frozen' : 'running'
  const label = selectionState === 'frozen' ? 'Pick Again' : buttonLabel
  const valueKey =
    selectionState === 'frozen' ? `${animationType}-${String(displayed)}` : animationType

  const rootClass = useMemo(() => joinClassNames('rrp', className), [className])
  const valueClass = useMemo(
    () => joinClassNames('rrp-value', valueClassName),
    [valueClassName]
  )
  const buttonClass = useMemo(
    () => joinClassNames('rrp-button', buttonClassName),
    [buttonClassName]
  )

  return (
    <div
      className={rootClass}
      data-state={selectionState}
      data-phase={phase}
      data-inertia-step={step}
      data-animation={animationType}
      data-inertia={inertia ? '' : undefined}
      style={style}
    >
      <span
        ref={spanRef}
        key={valueKey}
        className={valueClass}
        data-animation={animationType}
        data-value={displayed}
        data-phase={phase}
        data-inertia-step={step}
        style={{ ...valueStyle, ['--rrp-tick' as string]: `${cycleInterval}ms` }}
      >
        {displayed}
      </span>
      <button
        className={buttonClass}
        disabled={phase === 'settling'}
        style={buttonStyle}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  )
}
