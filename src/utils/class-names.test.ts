import { describe, expect, it } from 'vitest'
import { joinClassNames } from './class-names'

describe('joinClassNames', () => {
  it('joins truthy values with a space', () => {
    expect(joinClassNames('a', 'b', 'c')).toBe('a b c')
  })

  it('skips undefined and empty strings', () => {
    expect(joinClassNames('a', undefined, '', 'b')).toBe('a b')
  })

  it('returns empty string when all inputs are falsy', () => {
    expect(joinClassNames(undefined, '', undefined)).toBe('')
  })
})
