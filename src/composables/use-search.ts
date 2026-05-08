import { showsApi } from '@/api/shows'
import type { Show } from '@/types/show'
import { mapShow } from '@/utils/mappers'
import { rankShows } from '@/utils/sort'
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'

export function useSearch(debounce = 400) {
  const results = ref<Show[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch(q: string) {
    if (!q.trim()) {
      results.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await showsApi.search(q)
      results.value = rankShows(data.map((r) => mapShow(r.show)))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      results.value = []
    } finally {
      loading.value = false
    }
  }

  const debouncedFetch = useDebounceFn(fetch, debounce)

  function search(q: string) {
    if (q.trim()) loading.value = true
    return debouncedFetch(q)
  }

  return {
    results,
    loading,
    error,
    search,
  }
}
