import type { Meta, StoryObj } from '@storybook/react-vite'
import { RafflePick } from '../src/components/RafflePick'
import './RafflePick.stories.css'

const meta = {
  title: 'Compound/Value',
  component: RafflePick.Value,
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: { type: 'select' },
      options: ['roll', 'fade', 'blur', 'reel'],
    },
    className: { control: 'text' },
  },
} satisfies Meta<typeof RafflePick.Value>

export default meta
type Story = StoryObj<typeof meta>

const wrap = (args: Parameters<typeof RafflePick.Value>[0], reel = false) => (
  <RafflePick
    min={1}
    max={100}
    interval={reel ? 90 : 100}
    inertia
    autoStart={false}
    className={
      reel
        ? 'raffle-demo raffle-panel raffle-panel--reel'
        : 'raffle-demo raffle-panel'
    }
  >
    <RafflePick.Value {...args} />
    <RafflePick.Button
      className="raffle-demo__button"
      startLabel={reel ? 'Spin' : 'Start'}
      stopLabel="Stop"
    />
  </RafflePick>
)

export const Roll: Story = {
  args: { animation: 'roll', className: 'raffle-demo__value' },
  render: (args) => wrap(args),
}

export const Fade: Story = {
  args: { animation: 'fade', className: 'raffle-demo__value' },
  render: (args) => wrap(args),
}

export const Blur: Story = {
  args: { animation: 'blur', className: 'raffle-demo__value' },
  render: (args) => wrap(args),
}

export const Reel: Story = {
  args: {
    animation: 'reel',
    className: 'raffle-demo__value raffle-demo__value--reel',
  },
  render: (args) => wrap(args, true),
}

export const MultipleInstances: Story = {
  render: () => (
    <RafflePick
      min={1}
      max={100}
      interval={100}
      inertia
      autoStart={false}
      className="raffle-demo raffle-panel"
    >
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <RafflePick.Value animation="roll" className="raffle-demo__value" />
        <RafflePick.Value animation="fade" className="raffle-demo__value" />
        <RafflePick.Value animation="blur" className="raffle-demo__value" />
      </div>
      <RafflePick.Button
        className="raffle-demo__button"
        startLabel="Start"
        stopLabel="Stop"
      />
    </RafflePick>
  ),
}
