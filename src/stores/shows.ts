import type { Show } from '@/types/show'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowsStore = defineStore('shows', () => {
  const selectedShow = ref<Show | null>(null)

  function selectShow(show: Show) {
    selectedShow.value = show
  }

  return { selectedShow, selectShow }
})
