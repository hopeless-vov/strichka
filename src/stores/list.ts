import type { Show } from '@/types/show'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'strichka:my-list'

function loadFromStorage(): Show[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Show[]) : []
  } catch {
    return []
  }
}

export const useListStore = defineStore('list', () => {
  const items = ref<Show[]>(loadFromStorage())

  watch(
    items,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true, flush: 'sync' },
  )

  function add(show: Show) {
    if (!items.value.some((s) => s.id === show.id)) {
      items.value.push(show)
    }
  }

  function remove(id: number | string) {
    items.value = items.value.filter((s) => s.id !== id)
  }

  function has(id: number | string): boolean {
    return items.value.some((s) => s.id === id)
  }

  function toggle(show: Show) {
    if (has(show.id)) {
      remove(show.id)
    } else {
      add(show)
    }
  }

  return { items, add, remove, has, toggle }
})
