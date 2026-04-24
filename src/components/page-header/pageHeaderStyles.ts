/**
 * `PageHeader` shell — panel card, gold accent bar, title block.
 * Keep in sync with `src/components/page-header/PageHeader.tsx`.
 */

export const pageHeaderShellClass =
  'relative overflow-hidden rounded-2xl border border-surface-panel-border bg-surface-panel p-5 shadow-md shadow-fume-950/12 ring-1 ring-fume-900/5 dark:shadow-none dark:ring-0 sm:p-6 lg:p-7'

export const pageHeaderBottomGlowClass =
  'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent'

export const pageHeaderInnerClass = 'relative space-y-5'

export const pageHeaderTitleRowClass = 'flex gap-3 sm:gap-4'

/**
 * Title area when `end` is set: main column + trailing slot. On large screens `justify-between` pins the
 * trailing slot to the far right of the header shell (e.g. pipeline record rail).
 */
export const pageHeaderHeroSplitRowClass =
  'flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-x-6 lg:gap-y-0 xl:gap-x-8'

/** Main column inside split header — grows so space sits between title block and `end`, not past `end`. */
export const pageHeaderHeroMainClass = 'flex min-w-0 flex-1 gap-3 sm:gap-4'

/** Trailing panel wrapper for `PageHeader` `end` — right-aligned in the split row on large screens. */
export const pageHeaderHeroEndClass =
  'w-full min-w-0 shrink-0 lg:w-auto lg:max-w-[min(100%,18.5rem)] xl:max-w-[19.5rem] lg:self-start'

/** Vertical gold bar beside the title block */
export const pageHeaderAccentBarClass =
  'mt-0.5 w-1 shrink-0 self-stretch min-h-[2.5rem] rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700/55'

export const pageHeaderTextBlockClass = 'min-w-0 flex-1 space-y-2'

export const pageHeaderEyebrowClass =
  'text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-400'

export const pageHeaderTitleClass =
  'text-balance text-2xl font-bold tracking-tight text-gold-950 dark:text-gold-200 sm:text-[1.65rem] sm:leading-snug'

export const pageHeaderMetaLineClass = 'text-sm text-text-muted dark:text-text-subtle'

/**
 * Optional row directly under the `<h1>` (e.g. status pills + timestamps). Used by `PageHeader` `afterTitle`.
 */
export const pageHeaderAfterTitleSlotClass =
  'mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-text-muted dark:text-text-subtle'

export const pageHeaderDescriptionClass =
  'max-w-2xl text-sm leading-relaxed text-text-muted dark:text-text-subtle'

