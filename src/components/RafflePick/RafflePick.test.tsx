import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { RafflePick } from './index'

describe('<RafflePick> compound', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders Value with initial display when autoStart=false', () => {
    render(
      <RafflePick min={1} max={10} autoStart={false}>
        <RafflePick.Value />
      </RafflePick>
    )
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('Button toggles start → freeze and calls onSelect on freeze', () => {
    const onSelect = vi.fn()
    render(
      <RafflePick min={1} max={10} interval={100} autoStart={false} onSelect={onSelect}>
        <RafflePick.Value />
        <RafflePick.Button startLabel="Start" stopLabel="Stop" />
      </RafflePick>
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveTextContent('Start')

    act(() => {
      btn.click()
    })
    expect(btn).toHaveTextContent('Stop')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    act(() => {
      btn.click()
    })
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(btn).toHaveTextContent('Start')
  })

  it('Countdown auto-freezes after seconds and decrements label', () => {
    const onSelect = vi.fn()
    render(
      <RafflePick min={1} max={10} autoStart={false} onSelect={onSelect}>
        <RafflePick.Value />
        <RafflePick.Button startLabel="Start" stopLabel="Stop" />
        <RafflePick.Countdown seconds={3} />
      </RafflePick>
    )

    act(() => {
      screen.getByRole('button').click()
    })

    expect(screen.getByText('3')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('2')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(2100)
    })
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('items mode passes string to onSelect', () => {
    const onSelect = vi.fn()
    render(
      <RafflePick
        items={['Alice', 'Bob', 'Carol']}
        autoStart={false}
        onSelect={onSelect}
      >
        <RafflePick.Value />
        <RafflePick.Button startLabel="Go" stopLabel="Stop" />
      </RafflePick>
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
    act(() => {
      screen.getByRole('button').click()
    })
    act(() => {
      screen.getByRole('button').click()
    })
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(typeof onSelect.mock.calls[0][0]).toBe('string')
    expect(['Alice', 'Bob', 'Carol']).toContain(onSelect.mock.calls[0][0])
  })

  it('throws when sub-component is rendered outside root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<RafflePick.Value />)).toThrow(/RafflePick.Value/)
    spy.mockRestore()
  })

  it('Button waitLabel shown during settling, button disabled', () => {
    render(
      <RafflePick min={1} max={10} inertia autoStart={false}>
        <RafflePick.Value />
        <RafflePick.Button
          startLabel="Start"
          stopLabel="Stop"
          waitLabel="Wait"
        />
      </RafflePick>
    )
    const btn = screen.getByRole('button')
    act(() => btn.click())
    act(() => {
      vi.advanceTimersByTime(500)
    })
    act(() => btn.click())
    expect(btn).toHaveTextContent('Wait')
    expect(btn).toBeDisabled()
  })
})
