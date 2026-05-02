import { Section } from '../section'
import { CodeBlock } from '../code-block'

const COMPOSE_SNIPPET = `// React like you just won.
import { RafflePick } from 'react-raffle-picker'

export function Giveaway() {
  return (
    <RafflePick min={1} max={999} inertia onSelect={(v) => alert(v)}>
      <RafflePick.Value animation="roll" className="text-6xl" />
      <RafflePick.Button startLabel="Pick" stopLabel="Stop" />
    </RafflePick>
  )
}`

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-base text-gold-light">
      {n}
    </span>
  )
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-wide text-ink-3">
      {children}
    </span>
  )
}

export function Quickstart() {
  return (
    <Section space="md">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="min-w-0">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
            30 seconds
          </p>
          <h2 className="mb-4 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] leading-[1.05]">
            Drop it in.
          </h2>
          <p className="mb-8 text-ink-2 leading-relaxed">
            Compose the root with the pieces you need. Style them with your own
            CSS. Done.
          </p>

          <div className="flex items-start gap-4">
            <StepBadge n={1} />
            <div className="min-w-0 flex-1">
              <StepLabel>Install</StepLabel>
              <div className="mt-2">
                <CodeBlock code="npm install react-raffle-picker" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-4">
          <StepBadge n={2} />
          <div className="min-w-0 flex-1">
            <StepLabel>Compose</StepLabel>
            <div className="mt-2">
              <CodeBlock code={COMPOSE_SNIPPET} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
