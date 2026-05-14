import type { Show } from '@/types/show'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowsStore = defineStore('shows', () => {
  const genreRows = ref<{ key: string; shows: Show[] }[]>([])
  const allShows = ref<Show[]>([])

  function setGenreRows(rows: { key: string; shows: Show[] }[]) {
    genreRows.value = rows
  }

  function setAllShows(shows: Show[]) {
    allShows.value = shows
  }

  return { genreRows, setGenreRows, allShows, setAllShows }
})
