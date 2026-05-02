import { describe, expect, it, vi } from 'vitest'
import { getRandom } from './get-random'

describe('getRandom', () => {
  it('returns min when Math.random returns 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(getRandom(5, 10)).toBe(5)
    vi.restoreAllMocks()
  })

  it('returns max when Math.random returns just under 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999999)
    expect(getRandom(5, 10)).toBe(10)
    vi.restoreAllMocks()
  })

  it('stays within [min, max] for many samples', () => {
    for (let i = 0; i < 200; i++) {
      const v = getRandom(1, 100)
      expect(v).toBeGreaterThanOrEqual(1)
      expect(v).toBeLessThanOrEqual(100)
      expect(Number.isInteger(v)).toBe(true)
    }
  })

  it('handles single-value range', () => {
    expect(getRandom(7, 7)).toBe(7)
  })
})
