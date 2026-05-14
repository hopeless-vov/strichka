import { useShowDetails } from '@/composables/use-show-details'
import type { TvMazeShowDetailed } from '@/types/tvmaze'
import { ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/api/shows', () => ({
  showsApi: {
    getShowDetails: vi.fn(),
  },
}))

import { showsApi } from '@/api/shows'

const mockedGetShowDetails = vi.mocked(showsApi.getShowDetails)

const makeApiResponse = (overrides: Partial<TvMazeShowDetailed> = {}): TvMazeShowDetailed => ({
  id: 1,
  name: 'Breaking Bad',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama'],
  status: 'Ended',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2008-01-20',
  rating: { average: 9.2 },
  weight: 99,
  image: { medium: 'https://img.com/m.jpg', original: 'https://img.com/o.jpg' },
  summary: '<p>A story.</p>',
  network: { name: 'AMC' },
  webChannel: null,
  _embedded: {
    episodes: [
      { id: 1, name: 'Pilot', season: 1, number: 1, airdate: '2008-01-20', runtime: 58, image: null, summary: null },
      { id: 2, name: 'Episode 2', season: 1, number: 2, airdate: '2008-01-27', runtime: 58, image: null, summary: null },
      { id: 3, name: 'S2 Ep1', season: 2, number: 1, airdate: '2009-03-08', runtime: 58, image: null, summary: null },
    ],
    seasons: [
      { id: 10, number: 1, episodeOrder: 7, premiereDate: '2008-01-20', endDate: '2008-03-09', image: null },
      { id: 11, number: 2, episodeOrder: 13, premiereDate: '2009-03-08', endDate: '2009-06-01', image: null },
    ],
    cast: [
      { person: { id: 100, name: 'Bryan Cranston', image: null }, character: { id: 200, name: 'Walter White' } },
    ],
  },
  ...overrides,
})

describe('useShowDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts with null show and no loading', () => {
    const id = ref<string | undefined>(undefined)
    const { show, loading, error } = useShowDetails(id)
    expect(show.value).toBeNull()
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('fetches show when id is provided', async () => {
    mockedGetShowDetails.mockResolvedValueOnce(makeApiResponse())
    const id = ref<string | undefined>('1')
    const { show, loading } = useShowDetails(id)

    expect(loading.value).toBe(true)
    await vi.waitUntil(() => loading.value === false)

    expect(show.value?.title).toBe('Breaking Bad')
    expect(show.value?.cast).toEqual(['Bryan Cranston'])
    expect(show.value?.episodes).toHaveLength(3)
    expect(show.value?.seasons).toHaveLength(2)
  })

  it('does not fetch when id is undefined', () => {
    const id = ref<string | undefined>(undefined)
    useShowDetails(id)
    expect(mockedGetShowDetails).not.toHaveBeenCalled()
  })

  it('sets error and clears show on API failure', async () => {
    mockedGetShowDetails.mockRejectedValueOnce(new Error('Not found'))
    const id = ref<string | undefined>('999')
    const { show, error, loading } = useShowDetails(id)

    await vi.waitUntil(() => loading.value === false)

    expect(error.value).toBe('Not found')
    expect(show.value).toBeNull()
  })

  it('sets selectedSeason to first season number after fetch', async () => {
    mockedGetShowDetails.mockResolvedValueOnce(makeApiResponse())
    const id = ref<string | undefined>('1')
    const { selectedSeason, loading } = useShowDetails(id)

    await vi.waitUntil(() => loading.value === false)

    expect(selectedSeason.value).toBe(1)
  })

  it('currentSeasonEpisodes returns only episodes for selected season', async () => {
    mockedGetShowDetails.mockResolvedValueOnce(makeApiResponse())
    const id = ref<string | undefined>('1')
    const { selectedSeason, currentSeasonEpisodes, loading } = useShowDetails(id)

    await vi.waitUntil(() => loading.value === false)

    expect(currentSeasonEpisodes.value).toHaveLength(2)

    selectedSeason.value = 2
    expect(currentSeasonEpisodes.value).toHaveLength(1)
    expect(currentSeasonEpisodes.value[0].name).toBe('S2 Ep1')
  })

  it('currentSeasonEpisodes returns empty array for unknown season', async () => {
    mockedGetShowDetails.mockResolvedValueOnce(makeApiResponse())
    const id = ref<string | undefined>('1')
    const { selectedSeason, currentSeasonEpisodes, loading } = useShowDetails(id)

    await vi.waitUntil(() => loading.value === false)

    selectedSeason.value = 99
    expect(currentSeasonEpisodes.value).toEqual([])
  })

  it('re-fetches when id changes', async () => {
    mockedGetShowDetails.mockResolvedValue(makeApiResponse())
    const id = ref<string | undefined>('1')
    const { loading } = useShowDetails(id)

    await vi.waitUntil(() => loading.value === false)
    expect(mockedGetShowDetails).toHaveBeenCalledTimes(1)

    id.value = '2'
    await vi.waitUntil(() => loading.value === false)
    expect(mockedGetShowDetails).toHaveBeenCalledTimes(2)
    expect(mockedGetShowDetails).toHaveBeenLastCalledWith('2')
  })
})
