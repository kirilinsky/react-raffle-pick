'use client'

import { useState } from 'react'
import { RafflePick } from 'react-raffle-picker'
import { parseItems, type CountdownState } from './types'

export function CountdownPreviewStage({ state }: { state: CountdownState }) {
  const [last, setLast] = useState<string | number | null>(null)

  const items = parseItems(state.itemsRaw)
  const safeItems = items.length > 0 ? items : ['—']
  const modeProps = state.mode === 'range' ? { min: state.min, max: state.max } : { items: safeItems }

  // Only remount on domain change (mode/range/items) — seconds, animation,
  // inertia, and customRender are all reactive props / children swaps and
  // don't need a fresh instance. See playground/preview-stage.tsx for why
  // keying on the full state here would be a bug (freezes mid drag).
  const domainKey = state.mode === 'range' ? `range:${state.min}-${state.max}` : `items:${safeItems.join('|')}`

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-3 border border-line bg-bg-card bg-[radial-gradient(circle_at_50%_30%,rgba(212,160,74,0.06),transparent_60%)] p-10">
      <RafflePick
        key={domainKey}
        {...modeProps}
        inertia={state.inertia}
        autoStart={false}
        onSelect={(v) => setLast(v)}
        className="flex flex-col items-center gap-5"
      >
        <RafflePick.Countdown
          seconds={state.seconds}
          className={state.customRender ? undefined : 'countdown-ring'}
          {...(state.customRender
            ? {
                children: (remaining: number) => (
                  <span className="font-mono text-sm text-ink-2">
                    Auto-freezing in {remaining}s…
                  </span>
                ),
              }
            : {})}
        />

        <RafflePick.Value
          {...(state.animation !== 'none' ? { animation: state.animation } : {})}
          className="font-display text-[clamp(60px,10vw,120px)] leading-none tabular-nums text-burgundy"
        />

        <RafflePick.Button
          className="inline-flex items-center justify-center gap-2 rounded-3 border-2 border-gold bg-gradient-to-b from-burgundy-light via-burgundy to-burgundy-deep px-6 py-3 font-display text-base uppercase tracking-wider text-gold-light shadow-[0_4px_0_var(--burgundy-deep),0_8px_20px_rgba(0,0,0,0.2)] hover:brightness-105 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          startLabel="Start"
          stopLabel="Stop"
          waitLabel="…"
        />
      </RafflePick>

      <p className="font-mono text-xs text-ink-3">last → {last == null ? '—' : String(last)}</p>
    </div>
  )
}
