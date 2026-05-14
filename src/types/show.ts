export interface Show {
  id: number | string
  title: string
  image?: string
  rating?: number | null
  runtime?: number | null
  genres: string[]
  summary?: string | null
  status?: string | null
  year?: number | null
  network?: string | null
  weight?: number
}

export interface Episode {
  id: number
  name: string
  seasonNumber: number
  episodeNumber: number
  airdate: string | null
  runtime: number | null
  image?: string
  summary?: string | null
}

export interface Season {
  id: number
  number: number
  episodeCount: number | null
  premiereDate: string | null
  endDate: string | null
  image?: string
}

export interface ShowDetails extends Show {
  episodes: Episode[]
  seasons: Season[]
  cast: string[]
}
