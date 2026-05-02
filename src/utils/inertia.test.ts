import { describe, expect, it } from 'vitest'
import { getInertiaMultiplier } from './inertia'

describe('getInertiaMultiplier', () => {
  it('returns 1 when inertia is disabled', () => {
    expect(getInertiaMultiplier('starting', 0, false)).toBe(1)
    expect(getInertiaMultiplier('settling', 2, false)).toBe(1)
  })

  it('returns 1 for non-inertia phases (running, idle, frozen)', () => {
    expect(getInertiaMultiplier('running', 0, true)).toBe(1)
    expect(getInertiaMultiplier('idle', 0, true)).toBe(1)
    expect(getInertiaMultiplier('frozen', 0, true)).toBe(1)
  })

  it('returns starting multipliers in descending order', () => {
    const m0 = getInertiaMultiplier('starting', 0, true)
    const m1 = getInertiaMultiplier('starting', 1, true)
    const m2 = getInertiaMultiplier('starting', 2, true)
    expect(m0).toBeGreaterThan(m1)
    expect(m1).toBeGreaterThan(m2)
  })

  it('returns settling multipliers in ascending order', () => {
    const m0 = getInertiaMultiplier('settling', 0, true)
    const m1 = getInertiaMultiplier('settling', 1, true)
    const m2 = getInertiaMultiplier('settling', 2, true)
    const m3 = getInertiaMultiplier('settling', 3, true)
    expect(m0).toBeLessThan(m1)
    expect(m1).toBeLessThan(m2)
    expect(m2).toBeLessThan(m3)
  })

  it('clamps out-of-range step to last value', () => {
    const last = getInertiaMultiplier('settling', 3, true)
    expect(getInertiaMultiplier('settling', 99, true)).toBe(last)
  })
})
