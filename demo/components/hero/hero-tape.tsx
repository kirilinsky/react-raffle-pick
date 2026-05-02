const TAPE_TEXT =
  'GIVEAWAYS · RAFFLES · LOTTERY · DECISION MAKERS · CASINO UI · SLOT MACHINES · COUNTDOWN · OTP CODES · NICKNAMES · CLASSROOM PICKER ·  '

export function HeroTape() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-14 overflow-hidden border-y-4 border-gold bg-ink py-3.5 text-gold-light"
    >
      <div className="flex whitespace-nowrap will-change-transform animate-marquee">
        <span className="flex-shrink-0 pr-8 font-display text-[22px] uppercase tracking-[0.18em]">
          {TAPE_TEXT}
        </span>
        <span className="flex-shrink-0 pr-8 font-display text-[22px] uppercase tracking-[0.18em]">
          {TAPE_TEXT}
        </span>
      </div>
    </div>
  )
}
