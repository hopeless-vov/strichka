import { showsApi } from '@/api/shows'
import { useShowsStore } from '@/stores/shows'
import type { Show } from '@/types/show'
import { mapShow } from '@/utils/mappers'
import { rankShows } from '@/utils/sort'
import { computed, ref } from 'vue'

export interface HomeRow {
  key: string
  shows: Show[]
}

const GENRE_ROWS: { key: string; genres: string[] }[] = [
  { key: 'home.popular', genres: [] },
  { key: 'home.drama', genres: ['Drama'] },
  { key: 'home.actionAdventure', genres: ['Action', 'Adventure'] },
  { key: 'home.comedy', genres: ['Comedy'] },
  { key: 'home.thrillerCrime', genres: ['Thriller', 'Crime'] },
  { key: 'home.sciFiFantasy', genres: ['Science-Fiction', 'Fantasy'] },
]

export function useHome() {
  const showsStore = useShowsStore()
  const rows = ref<HomeRow[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null

    try {
      const all = rankShows((await showsApi.getShows(0)).map(mapShow))

      rows.value = GENRE_ROWS.map(({ key, genres }) => ({
        key,
        shows: genres.length
          ? all.filter((s) => s.genres.some((g) => genres.includes(g)))
          : all,
      }))

      showsStore.setGenreRows(rows.value)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const heroShow = computed(() => rows.value[0]?.shows.find((s) => s.image && s.summary) ?? null)

  return { rows, loading, error, load, heroShow }
}
