import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useRafflePhase } from './useRafflePhase'

describe('useRafflePhase', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('initial phase is honored', () => {
    const { result } = renderHook(() =>
      useRafflePhase(false, 'idle', vi.fn())
    )
    expect(result.current.phase).toBe('idle')
    expect(result.current.step).toBe(0)
  })

  it('start without inertia goes directly to running', () => {
    const { result } = renderHook(() =>
      useRafflePhase(false, 'idle', vi.fn())
    )
    act(() => {
      result.current.start()
    })
    expect(result.current.phase).toBe('running')
  })

  it('start with inertia goes through starting → running with stepped multipliers', () => {
    const { result } = renderHook(() =>
      useRafflePhase(true, 'idle', vi.fn())
    )
    act(() => {
      result.current.start()
    })
    expect(result.current.phase).toBe('starting')
    expect(result.current.step).toBe(0)
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(result.current.step).toBe(1)
    act(() => {
      vi.advanceTimersByTime(160)
    })
    expect(result.current.step).toBe(2)
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current.phase).toBe('running')
  })

  it('freeze without inertia transitions to frozen and calls onSettle', () => {
    const onSettle = vi.fn()
    const { result } = renderHook(() =>
      useRafflePhase(false, 'running', onSettle)
    )
    act(() => {
      result.current.freeze()
    })
    expect(result.current.phase).toBe('frozen')
    expect(onSettle).toHaveBeenCalledTimes(1)
  })

  it('freeze with inertia goes through settling → frozen and fires onSettle at end', () => {
    const onSettle = vi.fn()
    const { result } = renderHook(() =>
      useRafflePhase(true, 'running', onSettle)
    )
    act(() => {
      result.current.freeze()
    })
    expect(result.current.phase).toBe('settling')
    expect(onSettle).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(1100)
    })
    expect(onSettle).toHaveBeenCalledTimes(1)
    expect(result.current.phase).toBe('frozen')
  })

  it('reset returns to idle', () => {
    const { result } = renderHook(() =>
      useRafflePhase(false, 'running', vi.fn())
    )
    act(() => {
      result.current.reset()
    })
    expect(result.current.phase).toBe('idle')
  })
})
