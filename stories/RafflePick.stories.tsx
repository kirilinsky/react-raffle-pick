import type { Meta, StoryObj } from '@storybook/react'
import { RafflePick } from '../src/components/RafflePick'
import './RafflePick.stories.css'

const meta = {
  title: 'Components/RafflePick',
  component: RafflePick,
  tags: ['autodocs'],
  args: {
    min: 1,
    max: 100,
    interval: 100,
    random: true,
    inertia: false,
    autoStart: true,
  },
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    items: { control: 'object' },
    interval: { control: { type: 'number' } },
    random: { control: 'boolean' },
    inertia: { control: 'boolean' },
    autoStart: { control: 'boolean' },
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof RafflePick>

export default meta
type Story = StoryObj<typeof meta>

export const Headless: Story = {
  args: { autoStart: false },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value />
      <RafflePick.Button>Pick Winner</RafflePick.Button>
    </RafflePick>
  ),
}

export const StyledWithClasses: Story = {
  args: { className: 'raffle-demo' },
  render: (args) => (
    <div className="raffle-story">
      <RafflePick {...args}>
        <RafflePick.Value className="raffle-demo__value" />
        <RafflePick.Button className="raffle-demo__button">Pick Winner</RafflePick.Button>
      </RafflePick>
      <p className="raffle-story__caption">
        Compose sub-components anywhere. Style each piece directly.
      </p>
    </div>
  ),
}

export const RollAnimation: Story = {
  args: { interval: 100, className: 'raffle-demo raffle-panel' },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value animation="roll" className="raffle-demo__value" />
      <RafflePick.Button className="raffle-demo__button">Roll</RafflePick.Button>
    </RafflePick>
  ),
}

export const FadeAnimation: Story = {
  args: { interval: 100, className: 'raffle-demo raffle-panel' },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value animation="fade" className="raffle-demo__value" />
      <RafflePick.Button className="raffle-demo__button">Pick</RafflePick.Button>
    </RafflePick>
  ),
}

export const BlurAnimation: Story = {
  args: { interval: 100, className: 'raffle-demo raffle-panel' },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value animation="blur" className="raffle-demo__value" />
      <RafflePick.Button className="raffle-demo__button">Go</RafflePick.Button>
    </RafflePick>
  ),
}

export const ReelAnimation: Story = {
  args: { interval: 90, className: 'raffle-demo raffle-panel raffle-panel--reel' },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value animation="reel" className="raffle-demo__value raffle-demo__value--reel" />
      <RafflePick.Button className="raffle-demo__button">Spin</RafflePick.Button>
    </RafflePick>
  ),
}

export const ReelWithInertia: Story = {
  args: {
    interval: 90,
    inertia: true,
    className: 'raffle-demo raffle-panel raffle-panel--reel',
  },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value animation="reel" className="raffle-demo__value raffle-demo__value--reel" />
      <RafflePick.Button className="raffle-demo__button">Spin</RafflePick.Button>
    </RafflePick>
  ),
}

export const EnglishNames: Story = {
  args: {
    items: ['Olivia', 'Noah', 'Emma', 'Sarah', 'John', 'Liam', 'Ava', 'Lucas', 'Mia', 'Ethan'],
    inertia: true,
    interval: 100,
    className: 'raffle-demo raffle-panel raffle-panel--reel',
  },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value
        animation="reel"
        className="raffle-demo__value raffle-demo__value--reel raffle-demo__value--name"
      />
      <RafflePick.Button className="raffle-demo__button">Pick</RafflePick.Button>
    </RafflePick>
  ),
}

export const SequentialMode: Story = {
  args: {
    random: false,
    interval: 130,
    className: 'raffle-demo raffle-panel',
  },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value animation="roll" className="raffle-demo__value" />
      <RafflePick.Button className="raffle-demo__button">Sequence</RafflePick.Button>
    </RafflePick>
  ),
}

export const ManualStart: Story = {
  args: { autoStart: false, className: 'raffle-demo' },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value className="raffle-demo__value" />
      <RafflePick.Button className="raffle-demo__button">Start</RafflePick.Button>
    </RafflePick>
  ),
}

export const Countdown: Story = {
  args: {
    autoStart: false,
    inertia: true,
    className: 'raffle-demo raffle-panel',
  },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Value animation="roll" className="raffle-demo__value" />
      <RafflePick.Button className="raffle-demo__button">Start 5s</RafflePick.Button>
      <RafflePick.Countdown seconds={5} className="raffle-countdown" />
    </RafflePick>
  ),
}

export const CustomLayout: Story = {
  args: { inertia: true, className: 'raffle-custom' },
  render: (args) => (
    <RafflePick {...args}>
      <div className="raffle-custom__row">
        <RafflePick.Countdown seconds={4} className="raffle-countdown" />
        <RafflePick.Value animation="fade" className="raffle-demo__value" />
      </div>
      <RafflePick.Button className="raffle-demo__button">Pick</RafflePick.Button>
    </RafflePick>
  ),
}

export const SlotMachine: Story = {
  args: { inertia: true, autoStart: false, className: 'slot-machine' },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Slots
        length={5}
        chars="0123456789"
        spinInterval={70}
        staggerMs={260}
        className="slot-machine__row"
        slotClassName="slot-machine__cell"
      />
      <RafflePick.Button className="slot-machine__button">Spin</RafflePick.Button>
    </RafflePick>
  ),
}

export const SlotMachineSymbols: Story = {
  args: { inertia: true, autoStart: false, className: 'slot-machine slot-machine--symbols' },
  render: (args) => (
    <RafflePick {...args}>
      <RafflePick.Slots
        length={5}
        chars="🍒🍋🍇🍊🍎🔔⭐7R"
        spinInterval={90}
        staggerMs={320}
        className="slot-machine__row"
        slotClassName="slot-machine__cell slot-machine__cell--symbol"
      />
      <RafflePick.Button className="slot-machine__button">Pull</RafflePick.Button>
    </RafflePick>
  ),
}

export const Recipes: Story = {
  args: { autoStart: false },
  render: () => (
    <div className="recipes">
      {/* 1. Profile card */}
      <RafflePick
        items={['Olivia', 'Noah', 'Emma', 'Liam', 'Ava']}
        inertia
        autoStart={false}
        className="recipe recipe--card"
      >
        <div className="recipe-card__header">
          <div className="recipe-card__avatar">★</div>
          <div className="recipe-card__meta">
            <div className="recipe-card__title">Lucky Winner</div>
            <RafflePick.Value animation="fade" className="recipe-card__value" />
          </div>
        </div>
        <RafflePick.Button className="recipe-card__button">Draw</RafflePick.Button>
      </RafflePick>

      {/* 2. Hero countdown */}
      <RafflePick min={1} max={999} inertia autoStart={false} className="recipe recipe--hero">
        <RafflePick.Countdown seconds={5} className="raffle-countdown recipe-hero__ring" />
        <RafflePick.Value animation="blur" className="recipe-hero__value" />
        <RafflePick.Button className="recipe-hero__button">Start Draw</RafflePick.Button>
      </RafflePick>

      {/* 3. Inline chip in sentence */}
      <RafflePick min={1} max={36} autoStart={false} className="recipe recipe--inline" as="p">
        Roulette landed on <RafflePick.Value animation="roll" className="recipe-inline__value" /> —{' '}
        <RafflePick.Button className="recipe-inline__button">spin again</RafflePick.Button>
      </RafflePick>

      {/* 4. Slot machine pull */}
      <RafflePick inertia autoStart={false} className="recipe recipe--split">
        <RafflePick.Slots
          length={3}
          chars="🍎🍊🍇🍒🍋🍓🔔⭐"
          spinInterval={90}
          staggerMs={300}
          className="recipe-split__display"
          slotClassName="slot-machine__cell slot-machine__cell--symbol"
        />
        <div className="recipe-split__controls">
          <RafflePick.Countdown seconds={3} className="raffle-countdown" />
          <RafflePick.Button className="recipe-split__button">Pull</RafflePick.Button>
        </div>
      </RafflePick>

      {/* 5. Custom countdown render-prop */}
      <RafflePick min={1} max={100} inertia autoStart={false} className="recipe recipe--badge">
        <RafflePick.Value animation="fade" className="recipe-badge__value" />
        <RafflePick.Countdown seconds={4}>
          {(r) => <span className="recipe-badge__timer">closes in {r}s</span>}
        </RafflePick.Countdown>
        <RafflePick.Button className="recipe-badge__button">Reveal</RafflePick.Button>
      </RafflePick>
    </div>
  ),
}
