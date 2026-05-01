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
    interval: 90,
    random: true,
    inertia: false,
    animationType: 'roll',
    buttonLabel: 'Pick Winner',
    autoStart: true,
  },
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    items: { control: 'object' },
    interval: { control: { type: 'number' } },
    random: { control: 'boolean' },
    inertia: { control: 'boolean' },
    animationType: {
      control: { type: 'select' },
      options: ['roll', 'fade', 'blur', 'flip', 'reel'],
    },
    buttonLabel: { control: 'text' },
    className: { control: 'text' },
    valueClassName: { control: 'text' },
    buttonClassName: { control: 'text' },
    style: { control: 'object' },
    valueStyle: { control: 'object' },
    buttonStyle: { control: 'object' },
    autoStart: { control: 'boolean' },
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof RafflePick>

export default meta
type Story = StoryObj<typeof meta>

export const Headless: Story = {
  args: {
    autoStart: false,
  },
}

export const StyledWithClasses: Story = {
  args: {
    className: 'raffle-demo',
    valueClassName: 'raffle-demo__value',
    buttonClassName: 'raffle-demo__button',
  },
  render: (args) => (
    <div className="raffle-story">
      <RafflePick {...args} />
      <p className="raffle-story__caption">
        Styles come from consumer-provided classes; the component does not import CSS.
      </p>
    </div>
  ),
}

export const StyledWithInlineStyles: Story = {
  args: {
    min: 1000,
    max: 9999,
    buttonLabel: 'Pick',
    style: {
      alignItems: 'center',
      display: 'inline-flex',
      gap: 12,
    },
    valueStyle: {
      minWidth: '4ch',
      fontSize: 40,
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 700,
      lineHeight: 1,
      textAlign: 'center',
    },
    buttonStyle: {
      border: 0,
      borderRadius: 8,
      background: '#0f766e',
      color: '#fff',
      cursor: 'pointer',
      font: 'inherit',
      fontWeight: 600,
      padding: '10px 14px',
    },
  },
}

export const RollAnimation: Story = {
  args: {
    animationType: 'roll',
    interval: 90,
    className: 'raffle-demo raffle-panel',
    valueClassName: 'raffle-demo__value',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Roll',
  },
}

export const FadeAnimation: Story = {
  args: {
    animationType: 'fade',
    interval: 90,
    className: 'raffle-demo raffle-panel',
    valueClassName: 'raffle-demo__value',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Pick',
  },
}

export const BlurAnimation: Story = {
  args: {
    animationType: 'blur',
    interval: 90,
    className: 'raffle-demo raffle-panel',
    valueClassName: 'raffle-demo__value',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Go',
  },
}

export const FlipAnimation: Story = {
  args: {
    animationType: 'flip',
    interval: 90,
    className: 'raffle-demo raffle-panel raffle-panel--flip',
    valueClassName: 'raffle-demo__value raffle-demo__value--flip',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Flip',
  },
}

export const ReelAnimation: Story = {
  args: {
    animationType: 'reel',
    interval: 75,
    className: 'raffle-demo raffle-panel raffle-panel--reel',
    valueClassName: 'raffle-demo__value raffle-demo__value--reel',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Spin',
  },
}

export const ReelWithInertia: Story = {
  args: {
    animationType: 'reel',
    inertia: true,
    interval: 70,
    className: 'raffle-demo raffle-panel raffle-panel--reel',
    valueClassName: 'raffle-demo__value raffle-demo__value--reel',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Spin',
  },
}

export const EnglishNames: Story = {
  args: {
    items: ['Olivia', 'Noah', 'Emma', 'Liam', 'Ava', 'Lucas', 'Mia', 'Ethan'],
    animationType: 'reel',
    inertia: true,
    interval: 80,
    className: 'raffle-demo raffle-panel raffle-panel--reel',
    valueClassName: 'raffle-demo__value raffle-demo__value--reel raffle-demo__value--name',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Pick',
  },
}

export const SequentialMode: Story = {
  args: {
    random: false,
    interval: 120,
    animationType: 'roll',
    className: 'raffle-demo raffle-panel',
    valueClassName: 'raffle-demo__value',
    buttonClassName: 'raffle-demo__button',
    buttonLabel: 'Sequence',
  },
}

export const ManualStart: Story = {
  args: {
    autoStart: false,
    className: 'raffle-demo',
    valueClassName: 'raffle-demo__value',
    buttonClassName: 'raffle-demo__button',
  },
}
