export type AnimationType = 'roll' | 'fade' | 'blur'

export interface RafflePickProps {
  min?: number
  max?: number
  interval?: number
  animationType?: AnimationType
  onSelect?: (value: number) => void
  buttonLabel?: string
  className?: string
  autoStart?: boolean
}
