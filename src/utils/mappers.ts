import type { Show } from '@/types/show'
import type { TvMazeShow } from '@/types/tvmaze'

export function mapShow(raw: TvMazeShow): Show {
  return {
    id: raw.id,
    title: raw.name,
    image: raw.image?.medium ?? undefined,
    rating: raw.rating.average,
    runtime: raw.runtime ?? raw.averageRuntime,
    genres: raw.genres,
    summary: raw.summary,
    status: raw.status,
    year: raw.premiered ? new Date(raw.premiered).getFullYear() : null,
    network: raw.network?.name ?? raw.webChannel?.name ?? null,
  }
}
