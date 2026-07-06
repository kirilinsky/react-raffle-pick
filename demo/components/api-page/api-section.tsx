import type { ReactNode } from 'react'

export function ApiSection({
  id,
  title,
  kicker,
  children,
}: {
  id: string
  title: string
  kicker?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-10 first:border-0 first:pt-0">
      <div className="mb-5 flex items-baseline gap-3">
        <h2 className="font-display text-2xl font-bold leading-tight">{title}</h2>
        {kicker && (
          <span className="rounded-full border border-gold/30 bg-gold/15 px-2.5 py-1 font-mono text-[11px] text-gold-deep">
            {kicker}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}
