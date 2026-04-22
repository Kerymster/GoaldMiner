/**
 * `PageHeader` shell — panel card, gold accent bar, title block.
 * Keep in sync with `src/components/page-header/PageHeader.tsx`.
 */

export const pageHeaderShellClass =
  'relative overflow-hidden rounded-2xl border border-surface-panel-border bg-surface-panel p-5 shadow-sm shadow-fume-950/10 dark:shadow-none sm:p-6 lg:p-7'

export const pageHeaderBottomGlowClass =
  'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent'

export const pageHeaderInnerClass = 'relative space-y-5'

export const pageHeaderTitleRowClass = 'flex gap-3 sm:gap-4'

/** Vertical gold bar beside the title block */
export const pageHeaderAccentBarClass =
  'mt-0.5 w-1 shrink-0 self-stretch min-h-[2.5rem] rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700/55'

export const pageHeaderTextBlockClass = 'min-w-0 flex-1 space-y-2'

export const pageHeaderEyebrowClass =
  'text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-400'

export const pageHeaderTitleClass =
  'text-balance text-2xl font-bold tracking-tight text-gold-950 dark:text-gold-200 sm:text-[1.65rem] sm:leading-snug'

export const pageHeaderMetaLineClass = 'text-sm text-fume-600 dark:text-fume-400'

export const pageHeaderDescriptionClass =
  'max-w-2xl text-sm leading-relaxed text-fume-600 dark:text-fume-400'

