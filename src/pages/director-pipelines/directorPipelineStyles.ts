import { primaryCtaButtonClass, secondaryCtaButtonClass } from '../../components/styles/pageChromeStyles'

export const pipelineCardClass = 'rounded-xl border border-surface-field-border bg-surface-panel p-4 md:p-5'
export const pipelineFieldLabelClass =
  'text-xs font-semibold uppercase tracking-wide text-fume-500 dark:text-fume-400'
export const pipelineInputClass =
  'mt-1 w-full rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm text-fume-900 shadow-sm placeholder:text-fume-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25 dark:text-fume-100 dark:placeholder:text-fume-500'
export const pipelineTextareaClass = `${pipelineInputClass} min-h-24`
/** Optional multi-line free-text blocks (objectives, formations, constraints). */
export const pipelineMultiLineListClass = `${pipelineInputClass} min-h-[6.5rem] resize-y py-2 leading-relaxed`
export const pipelineSectionTitleClass = 'text-sm font-semibold text-fume-900 dark:text-fume-100'
export const pipelineHelpClass = 'text-xs text-fume-500 dark:text-fume-400'
export const pipelineErrorClass = 'text-sm text-red-600 dark:text-red-400'
export const pipelineGridClass = 'grid gap-4 md:grid-cols-2'
export const pipelinePrimaryButtonClass = primaryCtaButtonClass
export const pipelineSecondaryButtonClass = secondaryCtaButtonClass
export const pipelineDangerButtonClass =
  'inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-rose-600/70 bg-rose-600/10 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition-colors hover:bg-rose-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 disabled:opacity-60 dark:border-rose-500/50 dark:text-rose-300'

export const pipelineTabListClass =
  'flex flex-wrap gap-1 rounded-xl border border-surface-inset-border bg-surface-inset p-1'
export const pipelineTabButtonClass =
  'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40'
export const pipelineTabButtonActiveClass =
  'bg-white text-fume-950 shadow-sm dark:bg-surface-panel dark:text-fume-50'
export const pipelineTabButtonIdleClass =
  'text-fume-600 hover:bg-white/70 dark:text-fume-400 dark:hover:bg-surface-panel/70'
export const pipelineDetailSectionClass =
  'rounded-xl border border-surface-field-border bg-surface-panel p-4'
