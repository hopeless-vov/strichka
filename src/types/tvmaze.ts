export interface TvMazeShow {
  id: number
  name: string
  type: string
  language: string | null
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  rating: { average: number | null }
  weight: number
  image: { medium: string; original: string } | null
  summary: string | null
  network: { name: string } | null
  webChannel: { name: string } | null
}

export interface TvMazeSearchResult {
  score: number
  show: TvMazeShow
}

export interface TvMazeEpisode {
  id: number
  name: string
  season: number
  number: number
  airdate: string | null
  runtime: number | null
  image: { medium: string; original: string } | null
  summary: string | null
}

export interface TvMazeSeason {
  id: number
  number: number
  episodeOrder: number | null
  premiereDate: string | null
  endDate: string | null
  image: { medium: string; original: string } | null
}

export interface TvMazeCastMember {
  person: { id: number; name: string; image: { medium: string; original: string } | null }
  character: { id: number; name: string }
}

export interface TvMazeShowDetailed extends TvMazeShow {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _embedded?: {
    episodes?: TvMazeEpisode[]
    seasons?: TvMazeSeason[]
    cast?: TvMazeCastMember[]
  }
}
