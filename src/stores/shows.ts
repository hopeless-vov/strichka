import type { Show } from '@/types/show'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowsStore = defineStore('shows', () => {
  const selectedShow = ref<Show | null>(null)
  const genreRows = ref<{ key: string; shows: Show[] }[]>([])

  function selectShow(show: Show) {
    selectedShow.value = show
  }

  function setGenreRows(rows: { key: string; shows: Show[] }[]) {
    genreRows.value = rows
  }

  return { selectedShow, genreRows, selectShow, setGenreRows }
})
