/**
 * Player detail route — profile card, footer links, vertical rhythm.
 */

export const playerDetailCardClass =
  'rounded-2xl border border-surface-panel-border bg-surface-panel p-6 shadow-sm shadow-fume-950/10 dark:shadow-none'

/** Error / empty state block (message + back link). */
export const playerDetailStateStackClass = 'space-y-4'

/** Main column when profile is shown. */
export const playerDetailPageStackClass = 'space-y-8'

/**
 * Prominent gold link — hover brightens before underline (error + not-found footers).
 */
export const playerDetailBackLinkClass =
  'text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300'

/** Muted inline footer — “← All players”. */
export const playerDetailFooterLinkClass =
  'inline-flex text-sm font-medium text-fume-500 hover:text-gold-700 dark:text-fume-400 dark:hover:text-gold-400'

/** Long-form note under stats — bordered, relaxed line height. */
export const playerDetailNoteClass =
  'mt-8 border-t border-surface-divider pt-6 text-sm leading-relaxed text-fume-600 dark:text-fume-400'
