import { STAFF_RATING_MAX, STAFF_RATING_MIN } from '../types/scoutReportForm'

/** List / chip line (compact). */
export function formatStaffRatingCompact(r: number): string {
  if (r >= STAFF_RATING_MIN && r <= STAFF_RATING_MAX) return String(r)
  return String(r)
}

/** Detail rows — clarifies scale (e.g. 7 (1–10)). */
export function formatStaffRatingVerbose(r: number): string {
  if (r >= STAFF_RATING_MIN && r <= STAFF_RATING_MAX) {
    return `${r} (${STAFF_RATING_MIN}–${STAFF_RATING_MAX})`
  }
  return String(r)
}
