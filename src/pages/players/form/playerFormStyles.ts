/**
 * Shared form styles for Add/Edit player flows (outer shell + actions).
 * Field-level styles come from `reportFormStyles` to match scout report create UI.
 */

import { primaryCtaButtonClass } from '../../../components/styles/pageChromeStyles'

/** Card shell that contains the entire player form. */
export const playerFormShellClass =
  'rounded-2xl border border-surface-panel-border bg-surface-panel p-6 shadow-sm shadow-fume-950/10 dark:shadow-none'

/** Bottom action row for cancel + submit controls. */
export const playerFormActionsRowClass =
  'mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-surface-divider pt-5'

/** Submit — global primary CTA (same as Add player, View reports, …). */
export const playerFormSubmitClass = primaryCtaButtonClass

