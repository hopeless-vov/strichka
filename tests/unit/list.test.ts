import { useListStore } from '@/stores/list'
import type { Show } from '@/types/show'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

const makeShow = (id: number): Show => ({ id, title: `Show ${id}`, genres: [] })

// happy-dom v20 does not expose a working localStorage — provide a minimal stub
let fakeStorage: Record<string, string> = {}
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (key: string) => fakeStorage[key] ?? null,
    setItem: (key: string, value: string) => { fakeStorage[key] = value },
    removeItem: (key: string) => { delete fakeStorage[key] },
  },
})

describe('useListStore', () => {
  beforeEach(() => {
    fakeStorage = {}
    setActivePinia(createPinia())
  })

  it('starts empty when localStorage is empty', () => {
    const store = useListStore()
    expect(store.items).toEqual([])
  })

  it('loads persisted items from localStorage on init', () => {
    const show = makeShow(42)
    fakeStorage['strichka:my-list'] = JSON.stringify([show])
    const store = useListStore()
    expect(store.items).toHaveLength(1)
    expect(store.items[0].id).toBe(42)
  })

  it('adds a show', () => {
    const store = useListStore()
    store.add(makeShow(1))
    expect(store.items).toHaveLength(1)
    expect(store.items[0].id).toBe(1)
  })

  it('does not add duplicates', () => {
    const store = useListStore()
    store.add(makeShow(1))
    store.add(makeShow(1))
    expect(store.items).toHaveLength(1)
  })

  it('removes a show by id', () => {
    const store = useListStore()
    store.add(makeShow(1))
    store.add(makeShow(2))
    store.remove(1)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].id).toBe(2)
  })

  it('has returns true for an added show', () => {
    const store = useListStore()
    store.add(makeShow(1))
    expect(store.has(1)).toBe(true)
  })

  it('has returns false for a missing show', () => {
    const store = useListStore()
    expect(store.has(99)).toBe(false)
  })

  it('toggle adds a show not in the list', () => {
    const store = useListStore()
    store.toggle(makeShow(1))
    expect(store.has(1)).toBe(true)
  })

  it('toggle removes a show already in the list', () => {
    const store = useListStore()
    const show = makeShow(1)
    store.add(show)
    store.toggle(show)
    expect(store.has(1)).toBe(false)
  })

  it('persists to localStorage on add', () => {
    const store = useListStore()
    store.add(makeShow(7))
    const stored = JSON.parse(fakeStorage['strichka:my-list'] ?? '[]') as Show[]
    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe(7)
  })

  it('persists to localStorage on remove', () => {
    const store = useListStore()
    store.add(makeShow(1))
    store.add(makeShow(2))
    store.remove(1)
    const stored = JSON.parse(fakeStorage['strichka:my-list'] ?? '[]') as Show[]
    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe(2)
  })
})
