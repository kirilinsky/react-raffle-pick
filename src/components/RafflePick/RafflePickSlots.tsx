import { useEffect, useMemo, useRef } from 'react'
import { joinClassNames } from '../../utils/class-names'
import type { RafflePickSlotsProps } from '../../types'
import { useRaffleContext } from './context'

const pickRandom = (pool: string[]) => pool[Math.floor(Math.random() * pool.length)] ?? ''

const SLOT_BASE_CSS = `
.rrp-slot{display:inline-block;position:relative;overflow:hidden;vertical-align:baseline}
.rrp-slot__col{position:absolute;top:0;left:0;right:0;height:300%;transform:translate3d(0,-33.3333%,0);animation:rrp-slot-reel var(--rrp-tick,80ms) linear infinite;will-change:transform}
.rrp-slot__cell{height:33.3333%;display:grid;place-items:center;padding:0;margin:0;box-sizing:border-box;text-align:center}
.rrp-slot[data-stopped] .rrp-slot__col{animation:rrp-slot-settle 320ms cubic-bezier(0.2,1.4,0.4,1) forwards}
@keyframes rrp-slot-reel{from{transform:translate3d(0,-33.3333%,0)}to{transform:translate3d(0,-66.6666%,0)}}
@keyframes rrp-slot-settle{0%{transform:translate3d(0,-38%,0)}60%{transform:translate3d(0,-31%,0)}100%{transform:translate3d(0,-33.3333%,0)}}
@media (prefers-reduced-motion: reduce) {
  .rrp-slot__col { animation: none !important; }
}
`

const SLOT_STYLES_VERSION = '5'
const injectSlotStyles = () => {
  if (typeof document === 'undefined') return
  const existing = document.querySelector('style[data-rrp-slot-base]') as HTMLStyleElement | null
  if (existing) {
    if (existing.getAttribute('data-rrp-slot-base') === SLOT_STYLES_VERSION) return
    existing.textContent = SLOT_BASE_CSS
    existing.setAttribute('data-rrp-slot-base', SLOT_STYLES_VERSION)
    return
  }
  const tag = document.createElement('style')
  tag.setAttribute('data-rrp-slot-base', SLOT_STYLES_VERSION)
  tag.textContent = SLOT_BASE_CSS
  document.head.appendChild(tag)
}

interface SlotRefs {
  root: HTMLSpanElement | null
  col: HTMLSpanElement | null
  prev: HTMLSpanElement | null
  curr: HTMLSpanElement | null
  next: HTMLSpanElement | null
  currChar: string
  stopped: boolean
}

const makeRefs = (): SlotRefs => ({
  root: null,
  col: null,
  prev: null,
  curr: null,
  next: null,
  currChar: '',
  stopped: false,
})

export function RafflePickSlots({
  length = 3,
  chars = '0123456789',
  spinInterval = 80,
  staggerMs = 220,
  className,
  slotClassName,
  style,
  slotStyle,
  onResult,
}: RafflePickSlotsProps) {
  useEffect(injectSlotStyles, [])
  const { phase, initialValue, finalValue } = useRaffleContext('RafflePick.Slots')

  const initialChars = useMemo(() => {
    const seed = typeof initialValue === 'string' ? initialValue : ''
    return Array.from({ length }, (_, i) => seed[i] ?? '')
  }, [initialValue, length])

  const finalChars = useMemo(() => {
    if (typeof finalValue !== 'string') return null
    return Array.from({ length }, (_, i) => finalValue[i] ?? '')
  }, [finalValue, length])

  const finalCharsRef = useRef(finalChars)
  useEffect(() => {
    finalCharsRef.current = finalChars
  }, [finalChars])

  const slotsRef = useRef<SlotRefs[]>([])
  const stopTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([])
  const finalRef = useRef<string[]>([])

  const onResultRef = useRef(onResult)
  useEffect(() => {
    onResultRef.current = onResult
  })

  if (slotsRef.current.length !== length) {
    slotsRef.current = Array.from({ length }, (_, i) => slotsRef.current[i] ?? makeRefs())
  }

  const pool = useMemo(() => Array.from(chars), [chars])
  const safeInterval = Math.max(50, spinInterval)
  const running = phase === 'starting' || phase === 'running'
  const settling = phase === 'settling' || phase === 'frozen'

  const writeSlot = (s: SlotRefs, prev: string, curr: string, next: string) => {
    if (s.prev) s.prev.textContent = prev
    if (s.curr) s.curr.textContent = curr
    if (s.next) s.next.textContent = next
    s.currChar = curr
    if (s.root) s.root.setAttribute('data-value', curr)
    if (s.col && typeof s.col.getAnimations === 'function') {
      const anims = s.col.getAnimations()
      for (let a = 0; a < anims.length; a++) anims[a].currentTime = 0
    }
  }

  useEffect(() => {
    if (!running) return
    for (let i = 0; i < length; i++) {
      const s = slotsRef.current[i]
      s.stopped = false
      if (s.root) s.root.removeAttribute('data-stopped')
      writeSlot(s, pickRandom(pool), pickRandom(pool), pickRandom(pool))
    }
    finalRef.current = new Array(length).fill('')
    const id = setInterval(() => {
      for (let i = 0; i < length; i++) {
        const s = slotsRef.current[i]
        if (s.stopped) continue
        const newPrev = s.currChar
        const newCurr = s.next?.textContent ?? pickRandom(pool)
        const newNext = pickRandom(pool)
        writeSlot(s, newPrev, newCurr, newNext)
      }
    }, safeInterval)
    return () => clearInterval(id)
  }, [running, length, pool, safeInterval])

  useEffect(() => {
    if (!settling) return
    const clear = () => {
      stopTimersRef.current.forEach(clearTimeout)
      stopTimersRef.current = []
    }
    clear()
    for (let i = 0; i < length; i++) {
      const id = setTimeout(() => {
        const s = slotsRef.current[i]
        const forced = finalCharsRef.current?.[i]
        if (forced) {
          writeSlot(s, s.currChar, forced, forced)
        }
        s.stopped = true
        if (s.root) s.root.setAttribute('data-stopped', '')
        finalRef.current[i] = s.currChar
        if (i === length - 1) {
          onResultRef.current?.(finalRef.current.join(''))
        }
      }, i * staggerMs)
      stopTimersRef.current.push(id)
    }
    return clear
  }, [settling, length, staggerMs])

  useEffect(() => {
    if (phase !== 'idle') return
    const fallback = pool[0] ?? ''
    for (let i = 0; i < length; i++) {
      const s = slotsRef.current[i]
      const c = initialChars[i] || fallback
      s.stopped = true
      writeSlot(s, c, c, c)
      if (s.root) {
        s.root.setAttribute('data-stopped', '')
      }
    }
  }, [phase, length, pool, initialChars])

  const cls = useMemo(() => joinClassNames('rrp-slots', className), [className])
  const slotCls = useMemo(() => joinClassNames('rrp-slot', slotClassName), [slotClassName])
  const mergedSlotStyle = useMemo(
    () => ({ ...slotStyle, ['--rrp-tick' as string]: `${safeInterval}ms` }),
    [slotStyle, safeInterval]
  )

  return (
    <div className={cls} style={style} data-phase={phase}>
      {Array.from({ length }, (_, i) => (
        <span
          key={i}
          ref={(n) => {
            slotsRef.current[i].root = n
          }}
          className={slotCls}
          style={mergedSlotStyle}
          data-slot-index={i}
        >
          <span
            className="rrp-slot__col"
            ref={(n) => {
              slotsRef.current[i].col = n
            }}
          >
            <span
              className="rrp-slot__cell"
              ref={(n) => {
                slotsRef.current[i].prev = n
              }}
            >
              {pool[0] ?? ''}
            </span>
            <span
              className="rrp-slot__cell"
              ref={(n) => {
                slotsRef.current[i].curr = n
              }}
            >
              {pool[0] ?? ''}
            </span>
            <span
              className="rrp-slot__cell"
              ref={(n) => {
                slotsRef.current[i].next = n
              }}
            >
              {pool[0] ?? ''}
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}
