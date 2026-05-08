import { useCarousel } from '@/composables/use-carousel'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

type Item = { id: number; label: string }

const items: Item[] = [
  { id: 1, label: 'A' },
  { id: 2, label: 'B' },
  { id: 3, label: 'C' },
  { id: 4, label: 'D' },
  { id: 5, label: 'E' },
  { id: 6, label: 'F' },
  { id: 7, label: 'G' },
  { id: 8, label: 'H' },
]

// useBreakpoints resolves to xl+ (6 cards per page) in jsdom/happy-dom
// because window.innerWidth defaults to 1024, matchMedia always returns false

describe('useCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes list as a copy of items', () => {
    const { list } = useCarousel(items)
    expect(list.value).toEqual(items)
    expect(list.value).not.toBe(items)
  })

  describe('next()', () => {
    it('sets hasTransition and animationOffset to -100', () => {
      const { next, hasTransition, translateX } = useCarousel(items)

      next()

      expect(hasTransition.value).toBe(true)
      expect(translateX.value).toBeLessThan(-100)
    })

    it('ignores calls while navigation is in progress', () => {
      const { next, hasTransition } = useCarousel(items)

      next()
      hasTransition.value = false
      next()

      // second call is ignored, hasTransition stays false
      expect(hasTransition.value).toBe(false)
    })
  })

  describe('onTransitionEnd()', () => {
    it('rotates list forward after next()', () => {
      const { next, onTransitionEnd, list, cardsPerPage } = useCarousel(items)
      const originalOrder = [...items.map((i) => i.id)]
      const n = cardsPerPage.value

      next()
      onTransitionEnd()

      const rotated = list.value.map((i) => i.id)
      expect(rotated).toEqual([...originalOrder.slice(n), ...originalOrder.slice(0, n)])
    })

    it('resets hasTransition and unlocks navigation', () => {
      const { next, onTransitionEnd, hasTransition } = useCarousel(items)

      next()
      onTransitionEnd()

      expect(hasTransition.value).toBe(false)
    })

    it('allows next navigation after transition completes', () => {
      const { next, onTransitionEnd, hasTransition } = useCarousel(items)

      next()
      onTransitionEnd()
      next()

      expect(hasTransition.value).toBe(true)
    })
  })

  describe('prev()', () => {
    it('rotates list backward immediately (before animation)', async () => {
      const { prev, list, cardsPerPage } = useCarousel(items)
      const originalOrder = [...items.map((i) => i.id)]
      const n = cardsPerPage.value

      await prev()

      const rotated = list.value.map((i) => i.id)
      expect(rotated).toEqual([...originalOrder.slice(-n), ...originalOrder.slice(0, -n)])
    })

    it('ignores calls while navigation is in progress', async () => {
      const { prev, list } = useCarousel(items)
      const afterFirst = await prev().then(() => list.value.map((i) => i.id))

      // second call while still navigating (rAF not resolved)
      await prev()
      await nextTick()

      expect(list.value.map((i) => i.id)).toEqual(afterFirst)
    })
  })

  describe('cardWidthPercent', () => {
    it('is 100 divided by cardsPerPage', () => {
      const { cardWidthPercent, cardsPerPage } = useCarousel(items)
      expect(cardWidthPercent.value).toBe(100 / cardsPerPage.value)
    })
  })
})
