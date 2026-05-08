import { http } from '@/api/http'
import type { TvMazeSearchResult } from '@/types/tvmaze'

export const showsApi = {
  search: (q: string) =>
    http<TvMazeSearchResult[]>(`/search/shows?q=${encodeURIComponent(q)}`),
}
