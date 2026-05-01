import type { CSSProperties } from 'react'

export type AnimationType = 'roll' | 'fade' | 'blur'

export interface RafflePickProps {
  min?: number
  max?: number
  interval?: number
  animationType?: AnimationType
  onSelect?: (value: number) => void
  buttonLabel?: string
  className?: string
  valueClassName?: string
  buttonClassName?: string
  style?: CSSProperties
  valueStyle?: CSSProperties
  buttonStyle?: CSSProperties
  autoStart?: boolean
}
