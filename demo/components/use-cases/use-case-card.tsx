import type { ReactNode } from 'react'

export function UseCaseCard({
  title,
  tag,
  description,
  children,
}: {
  title: string
  tag: string
  description: string
  children: ReactNode
}) {
  return (
    <article className="flex flex-col gap-5 rounded-[16px] border border-line bg-bg-card p-6">
      <header className="flex items-start justify-between gap-3">
        <h2 className="font-display text-2xl leading-tight">{title}</h2>
        <span className="shrink-0 rounded-full border border-gold/30 bg-gold/15 px-2.5 py-1 font-mono text-[11px] text-gold-deep">
          {tag}
        </span>
      </header>
      <p className="text-sm leading-relaxed text-ink-2">{description}</p>
      {children}
    </article>
  )
}
