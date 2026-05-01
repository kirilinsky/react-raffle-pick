import type { CSSProperties } from 'react'

export type AnimationType = 'roll' | 'fade' | 'blur' | 'reel'
export type RafflePickValue = number | string

export interface RafflePickProps {
  items?: string[]
  min?: number
  max?: number
  interval?: number
  random?: boolean
  inertia?: boolean
  animationType?: AnimationType
  onSelect?: (value: RafflePickValue) => void
  buttonLabel?: string
  className?: string
  valueClassName?: string
  buttonClassName?: string
  style?: CSSProperties
  valueStyle?: CSSProperties
  buttonStyle?: CSSProperties
  autoStart?: boolean
}
