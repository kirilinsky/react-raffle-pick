export type AnimationKind = 'roll' | 'fade' | 'blur' | 'reel'

export const ANIMATION_KINDS: ReadonlyArray<AnimationKind> = ['roll', 'fade', 'blur', 'reel']

export interface AnimationsState {
  mode: 'range' | 'items'
  min: number
  max: number
  itemsRaw: string
  interval: number
  inertia: boolean
  countdown: number
}

export const DEFAULT_ANIMATIONS_STATE: AnimationsState = {
  mode: 'range',
  min: 1,
  max: 100,
  itemsRaw: 'Alice\nBob\nCarol\nDmitri\nElena',
  interval: 90,
  inertia: true,
  countdown: 0,
}

export const parseItems = (raw: string) =>
  raw
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

export function buildAnimationsCode(s: AnimationsState): string {
  const props: string[] = []
  if (s.mode === 'range') {
    props.push(`min={${s.min}}`, `max={${s.max}}`)
  } else {
    const items = parseItems(s.itemsRaw)
    props.push(`items={${JSON.stringify(items.length ? items : ['—'])}}`)
  }
  if (s.interval !== 100) props.push(`interval={${s.interval}}`)
  if (s.inertia) props.push('inertia')
  props.push('autoStart={false}')

  const countdownLine = s.countdown > 0 ? `\n      <RafflePick.Countdown seconds={${s.countdown}} className="countdown-ring" />` : ''

  const indent = '\n      '
  return `import { RafflePick } from 'react-raffle-picker'

export function Demo() {
  return (
    <RafflePick${indent}${props.join(indent)}
    >
      <RafflePick.Value animation="roll" />
      <RafflePick.Value animation="fade" />
      <RafflePick.Value animation="blur" />
      <RafflePick.Value animation="reel" />${countdownLine}
      <RafflePick.Button startLabel="Spin all" stopLabel="Stop" />
    </RafflePick>
  )
}`
}
