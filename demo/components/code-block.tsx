'use client'

import { useState } from 'react'

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard blocked — silent */
    }
  }

  return (
    <pre className="relative overflow-x-auto rounded-3 border border-[#2a241d] bg-[#1c1814] p-5 font-mono text-[13px] leading-relaxed text-[#e8dfc8]">
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy code"
        className="absolute right-2.5 top-2.5 rounded-2 border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-[#c8bfa8] transition-colors hover:bg-white/10"
      >
        {copied ? '✓ copied' : 'Copy'}
      </button>
      <code>{code}</code>
    </pre>
  )
}
