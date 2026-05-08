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
  image: { medium: string; original: string } | null
  summary: string | null
  network: { name: string } | null
  webChannel: { name: string } | null
}

export interface TvMazeSearchResult {
  score: number
  show: TvMazeShow
}
