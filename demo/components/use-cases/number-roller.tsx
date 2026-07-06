'use client'

import { useState } from 'react'
import { RafflePick, useRaffleContext } from 'react-raffle-picker'
import { NumberField, ToggleField } from '../playground/fields'

const buttonCls =
  'rounded-2 bg-ink px-5 py-2.5 font-mono text-sm text-gold-light transition-colors hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-40'

function DrawnBar({ drawn }: { drawn: number[] }) {
  const { exhausted, resetHistory, noRepeat } = useRaffleContext('NumberRoller')
  if (!noRepeat || drawn.length === 0) return null
  return (
    <div className="flex w-full flex-wrap items-center gap-2 border-t border-line pt-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">Drawn:</span>
      {drawn.map((n, i) => (
        <span key={i} className="rounded-full bg-gold/15 px-2.5 py-1 font-mono text-xs text-gold-deep">
          {n}
        </span>
      ))}
      {exhausted && (
        <button
          type="button"
          onClick={resetHistory}
          className="ml-auto font-mono text-xs text-burgundy underline underline-offset-2 hover:no-underline"
        >
          reset
        </button>
      )}
    </div>
  )
}

export function NumberRoller() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [noRepeat, setNoRepeat] = useState(true)
  const [drawn, setDrawn] = useState<number[]>([])

  const lo = Math.min(min, max)
  const hi = Math.max(min, max)

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Min" value={min} onChange={setMin} />
        <NumberField label="Max" value={max} onChange={setMax} />
      </div>
      <ToggleField
        label="No repeats"
        value={noRepeat}
        onChange={(v) => {
          setNoRepeat(v)
          setDrawn([])
        }}
      />
      <RafflePick
        key={`${lo}-${hi}-${noRepeat}`}
        min={lo}
        max={hi}
        noRepeat={noRepeat}
        autoStart={false}
        onSelect={(v) => setDrawn((d) => [...d, Number(v)])}
        className="flex flex-col items-center gap-4 rounded-2 bg-bg p-5"
      >
        <RafflePick.Value
          animation="roll"
          className="font-display text-[clamp(36px,5vw,52px)] font-bold text-burgundy"
        />
        <RafflePick.Button
          startLabel="Roll"
          stopLabel="Stop"
          waitLabel="…"
          className={buttonCls}
        />
        <DrawnBar drawn={drawn} />
      </RafflePick>
    </div>
  )
}
