import Link from 'next/link'
import { HeroPill } from './hero-pill'
import { SlotCabinet } from './slot-cabinet'

export function HeroText() {
  return (
    <div className="flex flex-col items-center text-center">
      <HeroPill>npm i react-raffle-picker</HeroPill>

      <h1 className="mt-5 text-balance font-display text-[clamp(44px,8vw,96px)] leading-[0.95] tracking-[-0.025em]">
        React like you just won.
      </h1>

      <div className="my-12 inline-block pr-10 max-[600px]:pr-7">
        <SlotCabinet />
      </div>

      <p className="my-2 text-balance font-display text-[clamp(22px,3.2vw,38px)] italic tracking-[-0.01em] text-burgundy">
        The raffle picker your UI deserves.
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-3.5">
        <Link
          href="/playground"
          className="inline-flex items-center justify-center gap-2 rounded-3 border border-line-2 px-[18px] py-3 text-sm font-semibold text-ink transition-colors hover:bg-bg-2"
        >
          Open playground →
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 font-mono text-xs text-ink-3">
        <span>~3.4 KB gzip</span>
        <span className="text-line-2">·</span>
        <span>headless</span>
        <span className="text-line-2">·</span>
        <span>React 18+</span>
        <span className="text-line-2">·</span>
        <span>MIT</span>
      </div>
    </div>
  )
}
