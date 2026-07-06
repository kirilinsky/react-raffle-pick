'use client'

import { useId, useMemo } from 'react'

export function parseNames(raw: string): string[] {
  return raw
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function NameListInput({
  value,
  onChange,
  label = 'Names (one per line)',
}: {
  value: string
  onChange: (v: string) => void
  label?: string
}) {
  const id = useId()
  const count = useMemo(() => parseNames(value).length, [value])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          {label}
        </label>
        <span className="font-mono text-[10px] text-ink-3">
          {count} {count === 1 ? 'entry' : 'entries'}
        </span>
      </div>
      <textarea
        id={id}
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'Alice\nBob\nCarol'}
        className="w-full resize-none rounded-2 border border-line bg-bg-card px-3 py-2.5 font-mono text-sm text-ink focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
      />
    </div>
  )
}
