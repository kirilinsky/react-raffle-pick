import type { Meta, StoryObj } from '@storybook/react-vite'
import { RafflePick } from '../src/components/RafflePick'
import './RafflePick.stories.css'

const meta = {
  title: 'Compound/Countdown',
  component: RafflePick.Countdown,
  tags: ['autodocs'],
  argTypes: {
    seconds: { control: { type: 'number', min: 1, max: 30 } },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <RafflePick min={1} max={100} interval={100} inertia autoStart={false} className="raffle-demo raffle-panel">
        <RafflePick.Value animation="roll" className="raffle-demo__value" />
        <RafflePick.Button className="raffle-demo__button" startLabel="Start" stopLabel="Stop" />
        <Story />
      </RafflePick>
    ),
  ],
} satisfies Meta<typeof RafflePick.Countdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    seconds: 5,
    className: 'raffle-countdown',
  },
}

export const Short: Story = {
  args: {
    seconds: 3,
    className: 'raffle-countdown',
  },
}

export const Long: Story = {
  args: {
    seconds: 10,
    className: 'raffle-countdown',
  },
}

export const CustomRender: Story = {
  args: {
    seconds: 6,
  },
  render: (args) => (
    <RafflePick.Countdown {...args}>
      {(r) => <span className="recipe-badge__timer">closes in {r}s</span>}
    </RafflePick.Countdown>
  ),
}
