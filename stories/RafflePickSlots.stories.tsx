import type { Meta, StoryObj } from '@storybook/react'
import { RafflePick } from '../src/components/RafflePick'
import './RafflePick.stories.css'

const meta = {
  title: 'Compound/Slots',
  component: RafflePick.Slots,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 1, max: 8 } },
    chars: { control: 'text' },
    spinInterval: { control: { type: 'number', min: 50, max: 500 } },
    staggerMs: { control: { type: 'number', min: 0, max: 1000 } },
  },
  decorators: [
    (Story) => (
      <RafflePick inertia autoStart={false} className="slot-machine">
        <Story />
        <RafflePick.Button className="slot-machine__button" startLabel="Spin" stopLabel="Stop" />
      </RafflePick>
    ),
  ],
} satisfies Meta<typeof RafflePick.Slots>

export default meta
type Story = StoryObj<typeof meta>

export const Numeric: Story = {
  args: {
    length: 5,
    chars: '0123456789',
    spinInterval: 70,
    staggerMs: 260,
    className: 'slot-machine__row',
    slotClassName: 'slot-machine__cell',
  },
}

export const Symbols: Story = {
  args: {
    length: 3,
    chars: '🍒🍋🍇🍊🍎🔔⭐',
    spinInterval: 90,
    staggerMs: 320,
    className: 'slot-machine__row',
    slotClassName: 'slot-machine__cell slot-machine__cell--symbol',
  },
}

export const Letters: Story = {
  args: {
    length: 6,
    chars: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    spinInterval: 60,
    staggerMs: 180,
    className: 'slot-machine__row',
    slotClassName: 'slot-machine__cell',
  },
}

export const FastStagger: Story = {
  args: {
    length: 4,
    chars: '0123456789',
    spinInterval: 60,
    staggerMs: 80,
    className: 'slot-machine__row',
    slotClassName: 'slot-machine__cell',
  },
}

export const SlowStagger: Story = {
  args: {
    length: 4,
    chars: '0123456789',
    spinInterval: 100,
    staggerMs: 600,
    className: 'slot-machine__row',
    slotClassName: 'slot-machine__cell',
  },
}
