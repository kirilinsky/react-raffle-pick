export type AnimationKind = 'none' | 'roll' | 'fade' | 'blur' | 'reel'

export interface PlaygroundState {
  mode: 'range' | 'items'
  min: number
  max: number
  itemsRaw: string
  interval: number
  inertia: boolean
  animation: AnimationKind
  countdown: number
  autoStart: boolean
}

export const DEFAULT_STATE: PlaygroundState = {
  mode: 'range',
  min: 1,
  max: 100,
  itemsRaw: 'Alice\nBob\nChloe\nDmitri\nElena\nFinn',
  interval: 80,
  inertia: true,
  animation: 'roll',
  countdown: 0,
  autoStart: false,
}
