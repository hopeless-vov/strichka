import { useSearch } from '@/composables/use-search'
import type { TvMazeSearchResult } from '@/types/tvmaze'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockResults: TvMazeSearchResult[] = [
  {
    score: 0.9,
    show: {
      id: 1,
      name: 'Breaking Bad',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama', 'Crime'],
      status: 'Ended',
      runtime: 60,
      averageRuntime: 60,
      premiered: '2008-01-20',
      rating: { average: 9.2 },
      image: { medium: 'https://example.com/bb.jpg', original: 'https://example.com/bb-lg.jpg' },
      summary: '<p>A chemistry teacher turns to crime.</p>',
      network: { name: 'AMC' },
      webChannel: null,
    },
  },
  {
    score: 0.7,
    show: {
      id: 2,
      name: 'Bad Blood',
      type: 'Scripted',
      language: 'English',
      genres: ['Crime'],
      status: 'Ended',
      runtime: null,
      averageRuntime: 45,
      premiered: null,
      rating: { average: null },
      image: null,
      summary: null,
      network: null,
      webChannel: { name: 'Netflix' },
    },
  },
]

vi.mock('@/api/shows', () => ({
  showsApi: {
    search: vi.fn(),
  },
}))

import { showsApi } from '@/api/shows'

const mockedSearch = vi.mocked(showsApi.search)

describe('useSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns empty results initially', () => {
    const { results, loading, error } = useSearch()

    expect(results.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('fetches and maps results on search()', async () => {
    mockedSearch.mockResolvedValueOnce(mockResults)
    const { results, loading, search } = useSearch(0)

    await search('breaking')

    expect(loading.value).toBe(false)
    expect(results.value).toHaveLength(2)
    expect(results.value[0]).toEqual({
      id: 1,
      title: 'Breaking Bad',
      image: 'https://example.com/bb.jpg',
      rating: 9.2,
      runtime: 60,
      genres: ['Drama', 'Crime'],
      summary: '<p>A chemistry teacher turns to crime.</p>',
      status: 'Ended',
      year: 2008,
      network: 'AMC',
    })
  })

  it('maps show with null image to undefined', async () => {
    mockedSearch.mockResolvedValueOnce(mockResults)
    const { results, search } = useSearch()

    await search('bad')

    expect(results.value[1].image).toBeUndefined()
    expect(results.value[1].rating).toBeNull()
  })

  it('clears results for empty query', async () => {
    mockedSearch.mockResolvedValueOnce(mockResults)
    const { results, search } = useSearch()

    await search('breaking')
    expect(results.value).toHaveLength(2)

    await search('   ')
    expect(results.value).toEqual([])
    expect(mockedSearch).toHaveBeenCalledTimes(1)
  })

  it('sets error on API failure', async () => {
    mockedSearch.mockRejectedValueOnce(new Error('Network error'))
    const { results, error, search } = useSearch()

    await search('test')

    expect(error.value).toBe('Network error')
    expect(results.value).toEqual([])
  })

  it('clears previous error on successful search', async () => {
    mockedSearch.mockRejectedValueOnce(new Error('fail'))
    const { error, search } = useSearch()

    await search('test')
    expect(error.value).toBe('fail')

    mockedSearch.mockResolvedValueOnce([])
    await search('test2')
    expect(error.value).toBeNull()
  })
})
