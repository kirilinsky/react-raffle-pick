export interface PropRow {
  name: string
  type: string
  default?: string
  description: string
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-3 border border-line">
      <table className="w-full min-w-[560px] table-fixed border-collapse text-sm">
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[27%]" />
          <col className="w-[12%]" />
          <col className="w-[43%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-line bg-bg-2 text-left">
            <th className="px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-3">
              Prop
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-3">
              Type
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-3">
              Default
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-3">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-line last:border-0">
              <td className="break-words px-4 py-3 align-top font-mono text-xs text-burgundy">
                {r.name}
              </td>
              <td className="break-words px-4 py-3 align-top font-mono text-xs text-ink-2">
                {r.type}
              </td>
              <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-xs text-ink-3">
                {r.default ?? '—'}
              </td>
              <td className="px-4 py-3 align-top text-sm leading-relaxed text-ink-2">
                {r.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
