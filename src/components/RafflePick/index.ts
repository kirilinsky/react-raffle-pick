import { RafflePickRoot } from './RafflePick'
import { RafflePickValue } from './RafflePickValue'
import { RafflePickButton } from './RafflePickButton'
import { RafflePickCountdown } from './RafflePickCountdown'
import { RafflePickSlots } from './RafflePickSlots'

type RafflePickCompound = typeof RafflePickRoot & {
  Value: typeof RafflePickValue
  Button: typeof RafflePickButton
  Countdown: typeof RafflePickCountdown
  Slots: typeof RafflePickSlots
}

const RafflePick = RafflePickRoot as RafflePickCompound
RafflePick.Value = RafflePickValue
RafflePick.Button = RafflePickButton
RafflePick.Countdown = RafflePickCountdown
RafflePick.Slots = RafflePickSlots

export { RafflePick, RafflePickValue, RafflePickButton, RafflePickCountdown, RafflePickSlots }
export { useRaffleContext, RaffleContext } from './context'
export type { RaffleContextValue } from './context'
export type { RafflePickPhase } from '../../utils/inertia'
