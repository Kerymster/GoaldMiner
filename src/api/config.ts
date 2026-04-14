export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL ?? 'http://localhost:3050'
  return raw.replace(/\/$/, '')
}
