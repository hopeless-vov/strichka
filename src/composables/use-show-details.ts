import { showsApi } from '@/api/shows'
import type { ShowDetails } from '@/types/show'
import { mapShowDetails } from '@/utils/mappers'
import { computed, type Ref,ref, watch } from 'vue'

export function useShowDetails(id: Ref<string | undefined>) {
  const show = ref<ShowDetails | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedSeason = ref<number>(1)

  const episodesBySeason = computed(() => {
    if (!show.value) return new Map<number, ShowDetails['episodes']>()
    const map = new Map<number, ShowDetails['episodes']>()
    for (const ep of show.value.episodes) {
      const arr = map.get(ep.seasonNumber) ?? []
      arr.push(ep)
      map.set(ep.seasonNumber, arr)
    }
    return map
  })

  const currentSeasonEpisodes = computed(() =>
    episodesBySeason.value.get(selectedSeason.value) ?? []
  )

  async function fetchShow() {
    if (!id.value) return
    loading.value = true
    error.value = null

    try {
      const data = await showsApi.getShowDetails(id.value)
      show.value = mapShowDetails(data)
      if (show.value.seasons.length > 0) {
        selectedSeason.value = show.value.seasons[0].number
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      show.value = null
    } finally {
      loading.value = false
    }
  }

  watch(id, (newId) => {
    if (newId) fetchShow()
  }, { immediate: true })

  return { show, loading, error, selectedSeason, currentSeasonEpisodes, fetchShow }
}
