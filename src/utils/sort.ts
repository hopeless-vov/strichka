import type { Show } from '@/types/show'

export function rankShows(shows: Show[]): Show[] {
  return [...shows].sort((a, b) => {
    const scoreA = (a.weight ?? 0) + (a.rating ?? 0) * 10
    const scoreB = (b.weight ?? 0) + (b.rating ?? 0) * 10
    return scoreB - scoreA
  })
}
