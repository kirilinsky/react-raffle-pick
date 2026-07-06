export type SlotsPreset = 'digits' | 'symbols' | 'letters' | 'custom'

export const PRESET_CHARS: Record<Exclude<SlotsPreset, 'custom'>, string> = {
  digits: '0123456789',
  symbols: '🍒🍋🍇🍊🍎🔔⭐',
  letters: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
}

export interface SlotsState {
  preset: SlotsPreset
  customChars: string
  length: number
  spinInterval: number
  staggerMs: number
  inertia: boolean
}

export const DEFAULT_SLOTS_STATE: SlotsState = {
  preset: 'digits',
  customChars: '0123456789',
  length: 5,
  spinInterval: 70,
  staggerMs: 220,
  inertia: true,
}

export function resolveChars(state: SlotsState): string {
  return state.preset === 'custom' ? state.customChars : PRESET_CHARS[state.preset]
}

export function buildSlotsCode(state: SlotsState): string {
  const chars = resolveChars(state)
  const props: string[] = [`length={${state.length}}`]
  if (chars !== PRESET_CHARS.digits) props.push(`chars="${chars}"`)
  if (state.spinInterval !== 80) props.push(`spinInterval={${state.spinInterval}}`)
  if (state.staggerMs !== 220) props.push(`staggerMs={${state.staggerMs}}`)

  const indent = '\n        '
  return `import { RafflePick } from 'react-raffle-picker'

export function Demo() {
  return (
    <RafflePick${state.inertia ? ' inertia' : ''} autoStart={false}>
      <RafflePick.Slots${indent}${props.join(indent)}
      />
      <RafflePick.Button startLabel="Spin" stopLabel="Stop" />
    </RafflePick>
  )
}`
}
