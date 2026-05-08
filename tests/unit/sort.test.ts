import { rankShows } from '@/utils/sort'
import type { Show } from '@/types/show'
import { describe, expect, it } from 'vitest'

const makeShow = (id: number, weight: number, rating: number | null): Show => ({
  id,
  title: `Show ${id}`,
  genres: [],
  weight,
  rating,
})

describe('rankShows', () => {
  it('sorts by combined weight + rating score descending', () => {
    const shows = [
      makeShow(1, 50, 6.0),  // score: 50 + 60 = 110
      makeShow(2, 99, 9.2),  // score: 99 + 92 = 191
      makeShow(3, 80, 5.0),  // score: 80 + 50 = 130
    ]

    const ranked = rankShows(shows)

    expect(ranked.map((s) => s.id)).toEqual([2, 3, 1])
  })

  it('treats null rating as 0', () => {
    const shows = [
      makeShow(1, 60, null), // score: 60
      makeShow(2, 50, 5.0),  // score: 50 + 50 = 100
    ]

    const ranked = rankShows(shows)

    expect(ranked.map((s) => s.id)).toEqual([2, 1])
  })

  it('treats missing weight as 0', () => {
    const shows: Show[] = [
      { id: 1, title: 'A', genres: [], rating: 8.0 },  // score: 80
      makeShow(2, 90, null),                             // score: 90
    ]

    const ranked = rankShows(shows)

    expect(ranked.map((s) => s.id)).toEqual([2, 1])
  })

  it('does not mutate the original array', () => {
    const shows = [makeShow(1, 50, 5.0), makeShow(2, 99, 9.0)]
    const original = [...shows]

    rankShows(shows)

    expect(shows).toEqual(original)
  })
})
