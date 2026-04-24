/**
 * `EmptyState` — centered “no data / pick next step” panel, visually lighter than
 * solid list cards (dashed border, no drop shadow) so it reads as guidance, not a result row.
 */
export const emptyStateContainerClass =
  'mx-auto flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-dashed border-surface-panel-border/80 bg-surface-panel/50 px-6 py-10 text-center dark:border-fume-600/50 dark:bg-fume-950/40 sm:px-10 sm:py-12'

/**
 * Icon badge — oversized so empty states read as illustration, not a UI chip.
 */
export const emptyStateIconWrapClass =
  'inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-gold-500/35 bg-gold-500/[0.14] text-gold-800 shadow-inner shadow-gold-900/[0.06] dark:text-gold-200 dark:shadow-black/25 sm:h-[5.25rem] sm:w-[5.25rem] sm:rounded-3xl'

/**
 * Main title in empty-state blocks.
 */
export const emptyStateTitleClass =
  'text-balance text-sm font-semibold tracking-tight text-text-primary dark:text-text-inverse'

/**
 * Body copy under the empty-state title.
 */
export const emptyStateDescriptionClass =
  'mx-auto max-w-md text-balance text-sm leading-relaxed text-text-muted dark:text-text-subtle'

/**
 * Optional helper hint with accent color.
 */
export const emptyStateHelperClass =
  'mx-auto max-w-md text-balance text-xs font-medium tracking-wide text-gold-800 dark:text-gold-300'
