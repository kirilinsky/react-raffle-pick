import type { Meta, StoryObj } from '@storybook/react'
import { RafflePick } from '../src/components/RafflePick'

const meta = {
  title: 'Components/RafflePick',
  component: RafflePick,
  tags: ['autodocs'],
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    interval: { control: { type: 'number' } },
    animationType: {
      control: { type: 'select' },
      options: ['roll', 'fade', 'blur'],
    },
    buttonLabel: { control: 'text' },
    className: { control: 'text' },
    autoStart: { control: 'boolean' },
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof RafflePick>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    min: 1,
    max: 100,
  },
}

export const WithRollAnimation: Story = {
  args: {
    min: 1,
    max: 50,
    animationType: 'roll',
    buttonLabel: 'Roll!',
  },
}

export const WithFadeAnimation: Story = {
  args: {
    min: 1,
    max: 50,
    animationType: 'fade',
    buttonLabel: 'Pick',
  },
}

export const WithBlurAnimation: Story = {
  args: {
    min: 1,
    max: 50,
    animationType: 'blur',
    buttonLabel: 'Go',
  },
}

export const AutoStart: Story = {
  args: {
    min: 1,
    max: 10,
    autoStart: true,
    interval: 100,
  },
}

export const CustomRange: Story = {
  args: {
    min: 1000,
    max: 9999,
    buttonLabel: 'Pick winner',
  },
}
