import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useRef } from 'react'
import { useNumberCycle } from './useNumberCycle'

describe('useNumberCycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not tick when running is false', () => {
    const onTick = vi.fn()
    renderHook(() => {
      const valueRef = useRef(0)
      return useNumberCycle({
        min: 0,
        max: 10,
        interval: 100,
        random: false,
        running: false,
        valueRef,
        onTick,
      })
    })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(onTick).not.toHaveBeenCalled()
  })

  it('ticks at interval when running and increments sequentially', () => {
    const onTick = vi.fn()
    const valueRef = { current: 0 }
    renderHook(() =>
      useNumberCycle({
        min: 0,
        max: 5,
        interval: 100,
        random: false,
        running: true,
        valueRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(onTick).toHaveBeenCalledTimes(3)
    expect(onTick).toHaveBeenNthCalledWith(1, 1)
    expect(onTick).toHaveBeenNthCalledWith(2, 2)
    expect(onTick).toHaveBeenNthCalledWith(3, 3)
    expect(valueRef.current).toBe(3)
  })

  it('wraps around at max in sequential mode', () => {
    const onTick = vi.fn()
    const valueRef = { current: 4 }
    renderHook(() =>
      useNumberCycle({
        min: 0,
        max: 5,
        interval: 100,
        random: false,
        running: true,
        valueRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(onTick).toHaveBeenNthCalledWith(1, 5)
    expect(onTick).toHaveBeenNthCalledWith(2, 0)
  })

  it('uses random pick within range when random=true', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const onTick = vi.fn()
    const valueRef = { current: 0 }
    renderHook(() =>
      useNumberCycle({
        min: 1,
        max: 10,
        interval: 100,
        random: true,
        running: true,
        valueRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(onTick).toHaveBeenCalledTimes(1)
    const v = onTick.mock.calls[0][0]
    expect(v).toBeGreaterThanOrEqual(1)
    expect(v).toBeLessThanOrEqual(10)
    vi.restoreAllMocks()
  })

  it('random mode skips excluded values', () => {
    const onTick = vi.fn()
    const valueRef = { current: 0 }
    const excludedRef = { current: new Set([2, 3, 4, 5]) }
    renderHook(() =>
      useNumberCycle({
        min: 1,
        max: 5,
        interval: 100,
        random: true,
        running: true,
        valueRef,
        excludedRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(500)
    })
    for (const [value] of onTick.mock.calls) {
      expect(value).toBe(1)
    }
    expect(onTick).toHaveBeenCalled()
  })

  it('random mode terminates even with a degenerate (constant) RNG', () => {
    // Regression: a mocked/constant Math.random must never spin the
    // rejection-sampling loop forever — it must fall back to a deterministic
    // scan once retries are exhausted.
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const onTick = vi.fn()
    const valueRef = { current: 1 }
    const excludedRef = { current: new Set([1]) }
    renderHook(() =>
      useNumberCycle({
        min: 1,
        max: 5,
        interval: 100,
        random: true,
        running: true,
        valueRef,
        excludedRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(onTick).toHaveBeenCalledTimes(1)
    expect(onTick).toHaveBeenCalledWith(2)
    vi.restoreAllMocks()
  })

  it('sequential mode wraps past excluded values', () => {
    const onTick = vi.fn()
    const valueRef = { current: 0 }
    const excludedRef = { current: new Set([1, 2]) }
    renderHook(() =>
      useNumberCycle({
        min: 0,
        max: 3,
        interval: 100,
        random: false,
        running: true,
        valueRef,
        excludedRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(onTick).toHaveBeenNthCalledWith(1, 3)
    expect(onTick).toHaveBeenNthCalledWith(2, 0)
    expect(onTick).toHaveBeenNthCalledWith(3, 3)
  })

  it('ignores an exhausted excluded set (falls back to full range)', () => {
    const onTick = vi.fn()
    const valueRef = { current: 0 }
    const excludedRef = { current: new Set([0, 1, 2]) }
    renderHook(() =>
      useNumberCycle({
        min: 0,
        max: 2,
        interval: 100,
        random: false,
        running: true,
        valueRef,
        excludedRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(onTick).toHaveBeenCalledWith(1)
  })

  it('clears interval on unmount', () => {
    const onTick = vi.fn()
    const valueRef = { current: 0 }
    const { unmount } = renderHook(() =>
      useNumberCycle({
        min: 0,
        max: 5,
        interval: 100,
        random: false,
        running: true,
        valueRef,
        onTick,
      })
    )
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(onTick).toHaveBeenCalledTimes(1)
    unmount()
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(onTick).toHaveBeenCalledTimes(1)
  })
})
