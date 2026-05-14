import { http } from '@/api/http'
import type { TvMazeSearchResult, TvMazeShow, TvMazeShowDetailed } from '@/types/tvmaze'

export const showsApi = {
  search: (q: string) =>
    http<TvMazeSearchResult[]>(`/search/shows?q=${encodeURIComponent(q)}`),

  getShows: (page = 0) =>
    http<TvMazeShow[]>(`/shows?page=${page}`),

  getShowDetails: (id: number | string) =>
    http<TvMazeShowDetailed>(`/shows/${id}?embed[]=episodes&embed[]=cast&embed[]=seasons`),
}
