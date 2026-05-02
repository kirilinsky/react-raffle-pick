import {
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type ElementType,
} from 'react'
import { joinClassNames } from '../../utils/class-names'
import type { RafflePickValueProps } from '../../types'
import { useRaffleContext } from './context'

export function RafflePickValue({
  animation = 'roll',
  className,
  style,
  as = 'span',
}: RafflePickValueProps) {
  const {
    phase,
    step,
    displayed,
    cycleInterval,
    valueRef,
    displayValue,
    subscribe,
  } = useRaffleContext('RafflePick.Value')

  const nodeRef = useRef<HTMLElement | null>(null)

  const writeNode = useCallback(
    (value: number) => {
      const node = nodeRef.current
      if (!node) return
      const txt = String(displayValue(value))
      node.textContent = txt
      node.setAttribute('data-value', txt)
      if (typeof node.getAnimations === 'function') {
        const anims = node.getAnimations({ subtree: true })
        for (let i = 0; i < anims.length; i++) anims[i].currentTime = 0
      }
    },
    [displayValue]
  )

  useEffect(() => subscribe(writeNode), [subscribe, writeNode])

  const running =
    phase === 'starting' || phase === 'running' || phase === 'settling'

  useLayoutEffect(() => {
    if (running) writeNode(valueRef.current)
  })

  const cls = useMemo(
    () => joinClassNames('rrp-value', className),
    [className]
  )

  const mergedStyle = useMemo(
    () => ({ ...style, ['--rrp-tick' as string]: `${cycleInterval}ms` }),
    [style, cycleInterval]
  )

  return createElement(
    as as ElementType,
    {
      ref: nodeRef,
      className: cls,
      'data-animation': animation,
      'data-value': displayed,
      'data-phase': phase,
      'data-inertia-step': step,
      style: mergedStyle,
    },
    displayed
  )
}
