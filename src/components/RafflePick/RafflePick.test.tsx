import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { RafflePick, useRaffleContext } from './index'

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
    // Value cycles 1-10 at random; pin it to 1 so it can never collide with
    // the countdown's own remaining-seconds label (e.g. "2").
    vi.spyOn(Math, 'random').mockReturnValue(0)
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
    vi.restoreAllMocks()
  })

  it('items mode passes string to onSelect', () => {
    const onSelect = vi.fn()
    render(
      <RafflePick items={['Alice', 'Bob', 'Carol']} autoStart={false} onSelect={onSelect}>
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

  it('initialValue sets starting display in numeric mode', () => {
    render(
      <RafflePick min={1} max={10} initialValue={7} autoStart={false}>
        <RafflePick.Value />
      </RafflePick>
    )
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('initialValue sets starting display in items mode', () => {
    render(
      <RafflePick items={['Alice', 'Bob', 'Carol']} initialValue="Carol" autoStart={false}>
        <RafflePick.Value />
      </RafflePick>
    )
    expect(screen.getByText('Carol')).toBeInTheDocument()
  })

  it('finalValue forces settle result in numeric mode', () => {
    const onSelect = vi.fn()
    render(
      <RafflePick min={1} max={10} finalValue={5} autoStart={false} onSelect={onSelect}>
        <RafflePick.Value />
        <RafflePick.Button startLabel="Start" stopLabel="Stop" />
      </RafflePick>
    )
    const btn = screen.getByRole('button')
    act(() => {
      btn.click()
    })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    act(() => {
      btn.click()
    })
    expect(onSelect).toHaveBeenCalledWith(5)
  })

  it('finalValue forces settle result in items mode', () => {
    const onSelect = vi.fn()
    render(
      <RafflePick
        items={['Alice', 'Bob', 'Carol']}
        finalValue="Bob"
        autoStart={false}
        onSelect={onSelect}
      >
        <RafflePick.Value />
        <RafflePick.Button startLabel="Go" stopLabel="Stop" />
      </RafflePick>
    )
    act(() => {
      screen.getByRole('button').click()
    })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    act(() => {
      screen.getByRole('button').click()
    })
    expect(onSelect).toHaveBeenCalledWith('Bob')
  })

  it('throws when sub-component is rendered outside root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<RafflePick.Value />)).toThrow(/RafflePick.Value/)
    spy.mockRestore()
  })

  it('noRepeat (default) excludes previously drawn winners across rounds', () => {
    const seen: string[] = []
    render(
      <RafflePick
        items={['Alice', 'Bob', 'Carol']}
        autoStart={false}
        onSelect={(v) => seen.push(String(v))}
      >
        <RafflePick.Value />
        <RafflePick.Button startLabel="Go" stopLabel="Stop" />
      </RafflePick>
    )
    const btn = screen.getByRole('button')
    for (let round = 0; round < 3; round++) {
      act(() => btn.click())
      act(() => {
        vi.advanceTimersByTime(500)
      })
      act(() => btn.click())
    }
    expect(seen).toHaveLength(3)
    expect(new Set(seen).size).toBe(3)
    expect(new Set(seen)).toEqual(new Set(['Alice', 'Bob', 'Carol']))
  })

  it('noRepeat exhaustion disables the button after the last draw', () => {
    render(
      <RafflePick items={['Alice', 'Bob']} autoStart={false}>
        <RafflePick.Value />
        <RafflePick.Button startLabel="Go" stopLabel="Stop" />
      </RafflePick>
    )
    const btn = screen.getByRole('button', { name: /Go|Stop/ })
    // Draw both entries.
    act(() => btn.click())
    act(() => vi.advanceTimersByTime(500))
    act(() => btn.click())
    act(() => btn.click())
    act(() => vi.advanceTimersByTime(500))
    act(() => btn.click())

    expect(btn).toBeDisabled()
  })

  it('onExhausted fires when start() is invoked directly (bypassing the auto-disabled Button)', () => {
    const onExhausted = vi.fn()
    function CustomStart() {
      const { start } = useRaffleContext('Test')
      return (
        <button type="button" data-testid="custom-start" onClick={start}>
          custom
        </button>
      )
    }
    render(
      <RafflePick items={['Alice', 'Bob']} autoStart={false} onExhausted={onExhausted}>
        <RafflePick.Value />
        <RafflePick.Button startLabel="Go" stopLabel="Stop" />
        <CustomStart />
      </RafflePick>
    )
    const btn = screen.getByRole('button', { name: /Go|Stop/ })
    const customStart = screen.getByTestId('custom-start')
    for (let round = 0; round < 2; round++) {
      act(() => btn.click())
      act(() => vi.advanceTimersByTime(500))
      act(() => btn.click())
    }
    expect(btn).toBeDisabled()
    expect(onExhausted).not.toHaveBeenCalled()

    // Pool exhausted — direct start() must be a no-op and fire onExhausted.
    act(() => customStart.click())
    expect(onExhausted).toHaveBeenCalledTimes(1)
  })

  it('noRepeat={false} allows repeat winners', () => {
    const seen: string[] = []
    render(
      <RafflePick
        items={['Alice']}
        noRepeat={false}
        autoStart={false}
        onSelect={(v) => seen.push(String(v))}
      >
        <RafflePick.Value />
        <RafflePick.Button startLabel="Go" stopLabel="Stop" />
      </RafflePick>
    )
    const btn = screen.getByRole('button')
    for (let round = 0; round < 2; round++) {
      act(() => btn.click())
      act(() => vi.advanceTimersByTime(200))
      act(() => btn.click())
    }
    expect(seen).toEqual(['Alice', 'Alice'])
    expect(btn).not.toBeDisabled()
  })

  it('resetHistory clears noRepeat exhaustion via context', () => {
    function Reopen() {
      const { resetHistory } = useRaffleContext('Test')
      return (
        <button type="button" onClick={resetHistory} data-testid="reopen">
          reopen
        </button>
      )
    }
    render(
      <RafflePick items={['Alice']} autoStart={false}>
        <RafflePick.Value />
        <RafflePick.Button startLabel="Go" stopLabel="Stop" />
        <Reopen />
      </RafflePick>
    )
    const btn = screen.getByRole('button', { name: /Go|Stop/ })
    act(() => btn.click())
    act(() => vi.advanceTimersByTime(200))
    act(() => btn.click())
    expect(btn).toBeDisabled()

    act(() => screen.getByTestId('reopen').click())
    expect(btn).not.toBeDisabled()
  })

  it('Button waitLabel shown during settling, button disabled', () => {
    render(
      <RafflePick min={1} max={10} inertia autoStart={false}>
        <RafflePick.Value />
        <RafflePick.Button startLabel="Start" stopLabel="Stop" waitLabel="Wait" />
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
