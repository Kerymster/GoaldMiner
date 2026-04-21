/**
 * Shared form styles for Add/Edit player flows (outer shell + actions).
 * Field-level styles come from `reportFormStyles` to match scout report create UI.
 */

/** Card shell that contains the entire player form. */
export const playerFormShellClass =
  'rounded-2xl border border-surface-panel-border bg-surface-panel p-6 shadow-sm shadow-fume-950/10 dark:shadow-none'

/** Bottom action row for cancel + submit controls. */
export const playerFormActionsRowClass =
  'mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-surface-divider pt-5'

/** Gold-emphasis submit button for primary form action. */
export const playerFormSubmitClass =
  'rounded-lg border border-gold-600/80 bg-gold-600/15 px-4 py-2 text-sm font-semibold text-fume-900 shadow-sm transition-colors hover:bg-gold-600/25 disabled:cursor-wait disabled:opacity-70 dark:border-gold-500/50 dark:text-gold-100 dark:hover:bg-gold-500/20'
