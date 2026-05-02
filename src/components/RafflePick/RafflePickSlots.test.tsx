import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render } from '@testing-library/react'
import { RafflePick } from './index'

describe('<RafflePick.Slots>', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the requested number of reels', () => {
    const { container } = render(
      <RafflePick autoStart={false}>
        <RafflePick.Slots length={4} />
        <RafflePick.Button startLabel="Spin" stopLabel="Stop" />
      </RafflePick>
    )
    expect(container.querySelectorAll('.rrp-slot')).toHaveLength(4)
  })

  it('staggered onResult fires once with joined string', () => {
    const onResult = vi.fn()
    const { getByRole } = render(
      <RafflePick autoStart={false}>
        <RafflePick.Slots
          length={3}
          chars="ABC"
          spinInterval={60}
          staggerMs={100}
          onResult={onResult}
        />
        <RafflePick.Button startLabel="Spin" stopLabel="Stop" />
      </RafflePick>
    )
    const btn = getByRole('button')
    act(() => btn.click())
    act(() => {
      vi.advanceTimersByTime(300)
    })
    act(() => btn.click())
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(onResult).toHaveBeenCalledTimes(1)
    const result = onResult.mock.calls[0][0]
    expect(typeof result).toBe('string')
    expect(result).toHaveLength(3)
    for (const c of result) expect('ABC').toContain(c)
  })

  it('handles emoji charset via code-point iteration', () => {
    const { container } = render(
      <RafflePick autoStart={false}>
        <RafflePick.Slots length={2} chars="🍒🍋🍇" />
      </RafflePick>
    )
    const cells = container.querySelectorAll('.rrp-slot__cell')
    expect(cells.length).toBeGreaterThan(0)
    cells.forEach((c) => {
      expect(['🍒', '🍋', '🍇']).toContain(c.textContent)
    })
  })

  it('clamps spinInterval to >= 50ms', () => {
    const { container } = render(
      <RafflePick autoStart={false}>
        <RafflePick.Slots length={1} spinInterval={1} />
      </RafflePick>
    )
    const slot = container.querySelector('.rrp-slot') as HTMLElement
    expect(slot.style.getPropertyValue('--rrp-tick')).toBe('50ms')
  })
})
