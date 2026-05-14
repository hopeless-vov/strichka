import type { Episode, Season, Show, ShowDetails } from '@/types/show'
import type { TvMazeEpisode, TvMazeSeason, TvMazeShow, TvMazeShowDetailed } from '@/types/tvmaze'

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
    weight: raw.weight,
  }
}

export function mapEpisode(raw: TvMazeEpisode): Episode {
  return {
    id: raw.id,
    name: raw.name,
    seasonNumber: raw.season,
    episodeNumber: raw.number,
    airdate: raw.airdate,
    runtime: raw.runtime,
    image: raw.image?.medium ?? undefined,
    summary: raw.summary,
  }
}

export function mapSeason(raw: TvMazeSeason): Season {
  return {
    id: raw.id,
    number: raw.number,
    episodeCount: raw.episodeOrder,
    premiereDate: raw.premiereDate,
    endDate: raw.endDate,
    image: raw.image?.medium ?? undefined,
  }
}

export function mapShowDetails(raw: TvMazeShowDetailed): ShowDetails {
  return {
    ...mapShow(raw),
    episodes: raw._embedded?.episodes?.map(mapEpisode) ?? [],
    seasons: raw._embedded?.seasons?.map(mapSeason) ?? [],
    cast: raw._embedded?.cast?.map(m => m.person.name) ?? [],
  }
}
