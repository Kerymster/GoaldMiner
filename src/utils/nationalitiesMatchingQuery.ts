import type { NationalityItem } from '../types/nationalities'

/** Client-side filter: country name, demonym, or ISO code (case-insensitive). */
export function nationalitiesMatchingQuery(items: NationalityItem[], q: string) {
  const s = q.trim().toLowerCase()
  if (!s) return items
  return items.filter(
    (i) =>
      i.country.toLowerCase().includes(s) ||
      i.nationality.toLowerCase().includes(s) ||
      i.code.toLowerCase().includes(s),
  )
}
