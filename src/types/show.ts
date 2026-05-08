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
