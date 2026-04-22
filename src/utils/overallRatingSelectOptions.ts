import type { OverlaySelectOption } from '../components/overlay-select/OverlaySelect'
import { STAFF_RATING_MAX, STAFF_RATING_MIN } from '../types/scoutReportForm'

/** Options for `OverlaySelect`: unset + every integer from `STAFF_RATING_MIN` to `STAFF_RATING_MAX`. */
export function overallRatingOverlayOptions(): OverlaySelectOption[] {
  return [
    { value: '', label: 'Not set' },
    ...Array.from({ length: STAFF_RATING_MAX - STAFF_RATING_MIN + 1 }, (_, i) => {
      const n = STAFF_RATING_MIN + i
      return { value: String(n), label: String(n) }
    }),
  ]
}

