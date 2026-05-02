'use client'

import { useState } from 'react'
import { RafflePick, useRaffleContext } from 'react-raffle-picker'
import { ConfettiBurst } from './confetti-burst'
import { SlotLever } from './slot-lever'

function LeverLabel() {
  const { phase } = useRaffleContext('SlotCabinet.Lever')
  const pulled = phase === 'starting' || phase === 'running' || phase === 'settling'
  return <SlotLever pulled={pulled} />
}

export function SlotCabinet() {
  const [confettiKey, setConfettiKey] = useState(0)

  return (
    <>
      <ConfettiBurst trigger={confettiKey} />

      <div className="inline-flex flex-col items-center">
        <RafflePick
          inertia
          autoStart={false}
          initialValue="⚛raffled"
          finalValue="you⭐win"
          onSelect={(v) => {
            setConfettiKey((k) => k + 1)
          }}
          className="relative inline-block rounded-[28px] border-[5px] border-ink bg-gradient-to-b from-burgundy-light via-burgundy to-burgundy-deep px-8 py-7 shadow-[0_18px_50px_rgba(60,15,25,0.45),0_4px_12px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.15),inset_0_-4px_12px_rgba(0,0,0,0.25)] before:pointer-events-none before:absolute before:inset-3.5 before:rounded-2 before:border-4 before:border-gold before:content-[''] before:shadow-[inset_0_0_0_2px_var(--gold-deep)] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_18px_18px,var(--gold-light)_0_4px,var(--gold-deep)_4px_7px,transparent_8px),radial-gradient(circle_at_calc(100%-18px)_18px,var(--gold-light)_0_4px,var(--gold-deep)_4px_7px,transparent_8px),radial-gradient(circle_at_18px_calc(100%-18px),var(--gold-light)_0_4px,var(--gold-deep)_4px_7px,transparent_8px),radial-gradient(circle_at_calc(100%-18px)_calc(100%-18px),var(--gold-light)_0_4px,var(--gold-deep)_4px_7px,transparent_8px)] after:content-[''] max-[600px]:scale-[0.92] max-[600px]:px-3 max-[600px]:py-4"
        >
          <RafflePick.Slots
            length={7}
            spinInterval={70}
            staggerMs={220}
            className="hero-slots relative z-10 flex gap-1.15 rounded-2 bg-gradient-to-b from-bg-card to-[#f5e8cc] p-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.18),0_0_0_2px_var(--gold-deep)] max-[600px]:gap-1 max-[600px]:p-2"
            slotClassName="hero-slot relative inline-block h-[1.25em] w-[clamp(64px,12vw,104px)] overflow-hidden rounded-1 border border-[#d8c8a0] bg-bg-card font-display text-[clamp(48px,8.8vw,78px)] font-bold leading-none tabular-nums text-burgundy shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(0,0,0,0.1)] data-[stopped]:border-green max-[600px]:w-[38px] max-[600px]:text-[34px]"
          />

          <div className="relative z-10 mt-3 h-3.5 rounded-2 bg-gradient-to-b from-gold to-gold-deep shadow-[inset_0_-2px_4px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.15)]" />

          <RafflePick.Button
            className="absolute -right-9 top-1/2 z-30 h-44 w-14 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed max-[600px]:-right-7 max-[600px]:h-36 max-[600px]:w-12"
            startLabel={<LeverLabel />}
            stopLabel={<LeverLabel />}
            waitLabel={<LeverLabel />}
          />
        </RafflePick>
      </div>
    </>
  )
}
