import type { ReactNode } from 'react'

type HeroPillProps = {
  children: ReactNode
}

export function HeroPill({ children }: HeroPillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-burgundy/20 bg-burgundy/10 px-2.5 py-1 font-mono text-xs text-burgundy">
      {children}
    </span>
  )
}
