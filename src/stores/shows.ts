import type { Show } from '@/types/show'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const SELECTED_KEY = 'strichka:selected-show'

function loadSelected(): Show | null {
  try {
    const raw = localStorage.getItem(SELECTED_KEY)
    return raw ? (JSON.parse(raw) as Show) : null
  } catch {
    return null
  }
}

export const useShowsStore = defineStore('shows', () => {
  const selectedShow = ref<Show | null>(loadSelected())
  const genreRows = ref<{ key: string; shows: Show[] }[]>([])

  watch(selectedShow, (val) => {
    if (val) localStorage.setItem(SELECTED_KEY, JSON.stringify(val))
    else localStorage.removeItem(SELECTED_KEY)
  }, { flush: 'sync' })

  function selectShow(show: Show) {
    selectedShow.value = show
  }

  function setGenreRows(rows: { key: string; shows: Show[] }[]) {
    genreRows.value = rows
  }

  return { selectedShow, genreRows, selectShow, setGenreRows }
})
