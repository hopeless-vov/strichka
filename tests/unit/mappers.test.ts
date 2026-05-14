import { mapEpisode, mapSeason, mapShow, mapShowDetails } from '@/utils/mappers'
import type { TvMazeEpisode, TvMazeSeason, TvMazeShow, TvMazeShowDetailed } from '@/types/tvmaze'
import { describe, expect, it } from 'vitest'

const rawShow: TvMazeShow = {
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
  weight: 99,
  image: { medium: 'https://img.com/m.jpg', original: 'https://img.com/o.jpg' },
  summary: '<p>A chemistry teacher.</p>',
  network: { name: 'AMC' },
  webChannel: null,
}

describe('mapShow', () => {
  it('maps basic fields', () => {
    const show = mapShow(rawShow)
    expect(show.id).toBe(1)
    expect(show.title).toBe('Breaking Bad')
    expect(show.rating).toBe(9.2)
    expect(show.runtime).toBe(60)
    expect(show.genres).toEqual(['Drama', 'Crime'])
    expect(show.status).toBe('Ended')
    expect(show.network).toBe('AMC')
    expect(show.weight).toBe(99)
  })

  it('uses medium image url', () => {
    expect(mapShow(rawShow).image).toBe('https://img.com/m.jpg')
  })

  it('returns undefined image when null', () => {
    expect(mapShow({ ...rawShow, image: null }).image).toBeUndefined()
  })

  it('extracts year from premiered date', () => {
    expect(mapShow(rawShow).year).toBe(2008)
  })

  it('returns null year when premiered is null', () => {
    expect(mapShow({ ...rawShow, premiered: null }).year).toBeNull()
  })

  it('falls back to averageRuntime when runtime is null', () => {
    expect(mapShow({ ...rawShow, runtime: null, averageRuntime: 45 }).runtime).toBe(45)
  })

  it('falls back to webChannel name when network is null', () => {
    const show = mapShow({ ...rawShow, network: null, webChannel: { name: 'Netflix' } })
    expect(show.network).toBe('Netflix')
  })

  it('returns null network when both are null', () => {
    expect(mapShow({ ...rawShow, network: null, webChannel: null }).network).toBeNull()
  })
})

describe('mapEpisode', () => {
  const rawEp: TvMazeEpisode = {
    id: 10,
    name: 'Pilot',
    season: 1,
    number: 1,
    airdate: '2008-01-20',
    runtime: 58,
    image: { medium: 'https://img.com/ep.jpg', original: 'https://img.com/ep-o.jpg' },
    summary: '<p>Walt cooks.</p>',
  }

  it('maps episode fields', () => {
    const ep = mapEpisode(rawEp)
    expect(ep.id).toBe(10)
    expect(ep.name).toBe('Pilot')
    expect(ep.seasonNumber).toBe(1)
    expect(ep.episodeNumber).toBe(1)
    expect(ep.airdate).toBe('2008-01-20')
    expect(ep.runtime).toBe(58)
    expect(ep.image).toBe('https://img.com/ep.jpg')
    expect(ep.summary).toBe('<p>Walt cooks.</p>')
  })

  it('returns undefined image when null', () => {
    expect(mapEpisode({ ...rawEp, image: null }).image).toBeUndefined()
  })
})

describe('mapSeason', () => {
  const rawSeason: TvMazeSeason = {
    id: 5,
    number: 1,
    episodeOrder: 7,
    premiereDate: '2008-01-20',
    endDate: '2008-03-09',
    image: { medium: 'https://img.com/s.jpg', original: 'https://img.com/s-o.jpg' },
  }

  it('maps season fields', () => {
    const s = mapSeason(rawSeason)
    expect(s.id).toBe(5)
    expect(s.number).toBe(1)
    expect(s.episodeCount).toBe(7)
    expect(s.premiereDate).toBe('2008-01-20')
    expect(s.endDate).toBe('2008-03-09')
    expect(s.image).toBe('https://img.com/s.jpg')
  })

  it('returns undefined image when null', () => {
    expect(mapSeason({ ...rawSeason, image: null }).image).toBeUndefined()
  })
})

describe('mapShowDetails', () => {
  const rawDetailed: TvMazeShowDetailed = {
    ...rawShow,
    _embedded: {
      episodes: [
        { id: 1, name: 'Pilot', season: 1, number: 1, airdate: '2008-01-20', runtime: 58, image: null, summary: null },
        { id: 2, name: 'Cat\'s in the Bag', season: 1, number: 2, airdate: '2008-01-27', runtime: 58, image: null, summary: null },
      ],
      seasons: [
        { id: 10, number: 1, episodeOrder: 7, premiereDate: '2008-01-20', endDate: '2008-03-09', image: null },
      ],
      cast: [
        { person: { id: 100, name: 'Bryan Cranston', image: null }, character: { id: 200, name: 'Walter White' } },
        { person: { id: 101, name: 'Aaron Paul', image: null }, character: { id: 201, name: 'Jesse Pinkman' } },
      ],
    },
  }

  it('includes base show fields', () => {
    const details = mapShowDetails(rawDetailed)
    expect(details.id).toBe(1)
    expect(details.title).toBe('Breaking Bad')
  })

  it('maps episodes array', () => {
    const details = mapShowDetails(rawDetailed)
    expect(details.episodes).toHaveLength(2)
    expect(details.episodes[0].name).toBe('Pilot')
  })

  it('maps seasons array', () => {
    const details = mapShowDetails(rawDetailed)
    expect(details.seasons).toHaveLength(1)
    expect(details.seasons[0].number).toBe(1)
  })

  it('extracts cast as array of names', () => {
    const details = mapShowDetails(rawDetailed)
    expect(details.cast).toEqual(['Bryan Cranston', 'Aaron Paul'])
  })

  it('returns empty arrays when _embedded is missing', () => {
    const details = mapShowDetails({ ...rawShow })
    expect(details.episodes).toEqual([])
    expect(details.seasons).toEqual([])
    expect(details.cast).toEqual([])
  })
})
