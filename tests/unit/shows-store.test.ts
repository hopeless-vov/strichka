import { useShowsStore } from '@/stores/shows'
import type { Show } from '@/types/show'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

const makeShow = (id: number): Show => ({ id, title: `Show ${id}`, genres: [] })

describe('useShowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty genreRows and allShows', () => {
    const store = useShowsStore()
    expect(store.genreRows).toEqual([])
    expect(store.allShows).toEqual([])
  })

  it('setGenreRows updates genreRows', () => {
    const store = useShowsStore()
    const rows = [
      { key: 'home.drama', shows: [makeShow(1), makeShow(2)] },
    ]
    store.setGenreRows(rows)
    expect(store.genreRows).toHaveLength(1)
    expect(store.genreRows[0].key).toBe('home.drama')
    expect(store.genreRows[0].shows).toHaveLength(2)
  })

  it('setAllShows updates allShows', () => {
    const store = useShowsStore()
    const shows = [makeShow(1), makeShow(2), makeShow(3)]
    store.setAllShows(shows)
    expect(store.allShows).toHaveLength(3)
    expect(store.allShows[0].id).toBe(1)
  })

  it('setGenreRows replaces previous rows', () => {
    const store = useShowsStore()
    store.setGenreRows([{ key: 'home.drama', shows: [makeShow(1)] }])
    store.setGenreRows([{ key: 'home.comedy', shows: [makeShow(2), makeShow(3)] }])
    expect(store.genreRows).toHaveLength(1)
    expect(store.genreRows[0].key).toBe('home.comedy')
  })

  it('setAllShows replaces previous shows', () => {
    const store = useShowsStore()
    store.setAllShows([makeShow(1)])
    store.setAllShows([makeShow(2), makeShow(3)])
    expect(store.allShows).toHaveLength(2)
    expect(store.allShows[0].id).toBe(2)
  })
})
