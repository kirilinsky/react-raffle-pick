'use client'

import { useState } from 'react'
import { RafflePick, useRaffleContext } from 'react-raffle-picker'
import { NameListInput, parseNames } from './name-list-input'

const DEFAULT_NAMES = 'Alice\nBob\nCarol\nDmitri\nElena'

const buttonCls =
  'rounded-2 bg-ink px-5 py-2.5 font-mono text-sm text-gold-light transition-colors hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-40'

function OrderList({ order }: { order: string[] }) {
  const { exhausted, resetHistory } = useRaffleContext('SpeakerOrder')
  return (
    <div className="flex w-full flex-col gap-2 border-t border-line pt-4">
      {order.length === 0 ? (
        <p className="font-mono text-xs text-ink-3">No one drawn yet.</p>
      ) : (
        <ol className="flex flex-col gap-1.5">
          {order.map((name, i) => (
            <li key={i} className="flex items-center gap-2 font-mono text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-burgundy text-[10px] text-gold-light">
                {i + 1}
              </span>
              {name}
            </li>
          ))}
        </ol>
      )}
      {exhausted && order.length > 0 && (
        <button
          type="button"
          onClick={resetHistory}
          className="self-start font-mono text-xs text-burgundy underline underline-offset-2 hover:no-underline"
        >
          all drawn — reset for next round
        </button>
      )}
    </div>
  )
}

export function SpeakerOrder() {
  const [raw, setRaw] = useState(DEFAULT_NAMES)
  const [order, setOrder] = useState<string[]>([])
  const items = parseNames(raw)

  return (
    <div className="flex flex-col gap-5">
      <NameListInput
        value={raw}
        onChange={(v) => {
          setRaw(v)
          setOrder([])
        }}
        label="Participants (one per line)"
      />
      {items.length > 0 && (
        <RafflePick
          key={raw}
          items={items}
          autoStart={false}
          interval={60}
          onSelect={(v) => setOrder((o) => [...o, String(v)])}
          className="flex flex-col items-center gap-4 rounded-2 bg-bg p-5"
        >
          <RafflePick.Value
            animation="fade"
            className="font-display text-[clamp(24px,3vw,32px)] font-bold text-burgundy"
          />
          <RafflePick.Button
            startLabel="Draw next"
            stopLabel="Stop"
            waitLabel="…"
            className={buttonCls}
          />
          <OrderList order={order} />
        </RafflePick>
      )}
    </div>
  )
}
