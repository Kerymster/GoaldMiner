/**
 * Players list route — list container surface and filter/input controls.
 */

import { primaryCtaButtonClass } from '../../../components/styles/pageChromeStyles'

export const playerListSurface =
  'divide-y divide-surface-list-divider rounded-xl border border-surface-panel-border bg-surface-panel shadow-sm shadow-fume-950/10 dark:shadow-none'

export const playerListInputClass =
  'rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm text-fume-900 shadow-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25 dark:text-fume-100'

/** Separator row between filters and results area. */
export const playerListResultsDividerClass =
  'flex items-center gap-3'

/** Small uppercase title used in results divider. */
export const playerListResultsDividerLabelClass =
  'text-[11px] font-semibold uppercase tracking-[0.14em] text-fume-500'

/** Thin continuation line beside the divider label. */
export const playerListResultsDividerLineClass = 'h-px flex-1 bg-surface-divider'

/** Empty-state copy when no player matches filters. */
export const playerListEmptyStateClass =
  'rounded-xl border border-surface-panel-border bg-surface-panel px-4 py-5 text-sm text-fume-600 dark:text-fume-400'

/** Top-right action row for list-level controls (add player). */
export const playerListActionsRowClass = 'flex justify-end'

/** Add-player CTA — same gold primary as report wizard / detail actions. */
export const playerListAddActionClass = primaryCtaButtonClass

