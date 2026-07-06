export type CountdownAnimation = 'none' | 'roll' | 'fade' | 'blur' | 'reel'

export interface CountdownState {
  mode: 'range' | 'items'
  min: number
  max: number
  itemsRaw: string
  seconds: number
  animation: CountdownAnimation
  inertia: boolean
  customRender: boolean
}

export const DEFAULT_COUNTDOWN_STATE: CountdownState = {
  mode: 'items',
  min: 1,
  max: 100,
  itemsRaw: 'Alice\nBob\nCarol\nDmitri\nElena',
  seconds: 5,
  animation: 'roll',
  inertia: true,
  customRender: false,
}

export const parseItems = (raw: string) =>
  raw
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

export function buildCountdownCode(s: CountdownState): string {
  const props: string[] = []
  if (s.mode === 'range') {
    props.push(`min={${s.min}}`, `max={${s.max}}`)
  } else {
    const items = parseItems(s.itemsRaw)
    props.push(`items={${JSON.stringify(items.length ? items : ['—'])}}`)
  }
  if (s.inertia) props.push('inertia')
  props.push('autoStart={false}')

  const valueProp = s.animation !== 'none' ? ` animation="${s.animation}"` : ''
  const countdownLine = s.customRender
    ? `      <RafflePick.Countdown seconds={${s.seconds}}>
        {(remaining) => \`Auto-freezing in \${remaining}s…\`}
      </RafflePick.Countdown>`
    : `      <RafflePick.Countdown seconds={${s.seconds}} />`

  const indent = '\n      '
  return `import { RafflePick } from 'react-raffle-picker'

export function Demo() {
  return (
    <RafflePick${indent}${props.join(indent)}
    >
      <RafflePick.Value${valueProp} />
${countdownLine}
      <RafflePick.Button startLabel="Start" stopLabel="Stop" />
    </RafflePick>
  )
}`
}
