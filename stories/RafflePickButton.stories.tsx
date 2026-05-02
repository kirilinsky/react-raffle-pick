import type { Meta, StoryObj } from '@storybook/react'
import { RafflePick } from '../src/components/RafflePick'
import './RafflePick.stories.css'

const meta = {
  title: 'Compound/Button',
  component: RafflePick.Button,
  tags: ['autodocs'],
  argTypes: {
    startLabel: { control: 'text' },
    stopLabel: { control: 'text' },
    waitLabel: { control: 'text' },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <RafflePick min={1} max={100} interval={100} inertia autoStart={false} className="raffle-demo raffle-panel">
        <RafflePick.Value animation="roll" className="raffle-demo__value" />
        <Story />
      </RafflePick>
    ),
  ],
} satisfies Meta<typeof RafflePick.Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Pick',
    className: 'raffle-demo__button',
  },
}

export const StateLabels: Story = {
  args: {
    startLabel: 'Start',
    stopLabel: 'Stop',
    waitLabel: 'Settling…',
    className: 'raffle-demo__button',
  },
}

export const IconLabels: Story = {
  args: {
    startLabel: '▶ Spin',
    stopLabel: '⏸ Stop',
    waitLabel: '⏳',
    className: 'raffle-demo__button',
  },
}

export const FallbackChildrenOnly: Story = {
  args: {
    children: 'Toggle',
    className: 'raffle-demo__button',
  },
}
