'use client'

import { RafflePick } from 'react-raffle-picker'

function Lever({ pulled }: { pulled: boolean }) {
  return (
    <span
      className={`absolute right-2 top-1/2 flex origin-top -translate-y-1/2 flex-col items-center transition-transform duration-300 ease-[cubic-bezier(0.5,0,0.2,1)] ${
        pulled ? 'translate-y-9 rotate-[28deg]' : ''
      }`}
    >
      <span className="z-10 -mb-1 h-8 w-8 rounded-full border-2 border-ink bg-[radial-gradient(circle_at_30%_30%,var(--green-light)_0%,var(--green)_60%,#2a4a37_100%)] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_-3px_6px_rgba(0,0,0,0.25)]" />
      <span className="h-[60px] w-4 flex-1 rounded-1 bg-gradient-to-r from-green via-green-light to-green shadow-[0_0_0_2px_var(--ink),inset_0_1px_0_rgba(255,255,255,0.25)]" />
    </span>
  )
}

export function SlotCabinet() {
  return (
    <RafflePick
      inertia
      autoStart={false}
      initialValue="⚛raffled"
      finalValue="you⭐win"
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
        className="absolute -right-12 top-1/2 z-20 h-32 w-[60px] -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed max-[600px]:-right-10 max-[600px]:h-28 max-[600px]:w-12"
        startLabel={<Lever pulled={false} />}
        stopLabel={<Lever pulled />}
        waitLabel={<Lever pulled />}
      />
    </RafflePick>
  )
}
