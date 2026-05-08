const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function http<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }

  return res.json() as Promise<T>
}
