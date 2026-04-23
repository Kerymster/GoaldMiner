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

/**
 * Right rail in the pipeline detail `PageHeader` — reads as part of the header: soft wash + gold edge,
 * not a separate floating widget (`PipelineDetailHeaderRecord`).
 */
export const pipelineDetailHeaderRecordPanelClass =
  'rounded-r-xl border-y border-r border-gold-500/20 border-l-2 border-l-gold-500/45 bg-gradient-to-r from-gold-500/[0.07] to-transparent py-3 pl-4 pr-3 dark:border-gold-400/20 dark:border-l-gold-400/50 dark:from-gold-400/[0.06] sm:py-3.5 sm:pl-5 sm:pr-4'

/** Panel eyebrow (“Pipeline record”) in the header summary rail. */
export const pipelineDetailHeaderRecordPanelTitleClass =
  'text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400'

/** Field labels in the header record rail — slightly stronger than body `detailRow` for hierarchy. */
export const pipelineDetailHeaderRecordFieldLabelClass =
  'text-xs font-semibold uppercase tracking-[0.1em] text-fume-500 dark:text-fume-400'

/** Primary value line inside the header record panel (e.g. last updated). */
export const pipelineDetailHeaderRecordValueEmphasisClass =
  'mt-1.5 text-sm font-medium leading-snug text-fume-800 dark:text-fume-100'

/**
 * Read-only pipeline detail section shell — aligned with scout report `detailSectionCard`
 * (`src/pages/player-reports/detail/detailStyles.ts`): panel border, shadow, generous padding.
 */
export const pipelineDetailViewCardClass =
  'rounded-2xl border border-surface-panel-border bg-surface-panel p-5 shadow-md shadow-fume-950/12 ring-1 ring-fume-900/5 dark:shadow-none dark:ring-0 sm:p-6'

/** Section title row (h2): gold vertical accent + label. */
export const pipelineDetailViewTitleRowClass = 'flex items-center gap-3 border-b border-surface-divider pb-4'

export const pipelineDetailViewTitleAccentClass =
  'h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700/55'

export const pipelineDetailViewTitleLabelClass =
  'min-w-0 flex-1 text-base font-bold leading-snug tracking-tight text-gold-950 dark:text-gold-200'

/** Body below the titled header inside `pipelineDetailViewCardClass`. */
export const pipelineDetailViewBodyClass = 'pt-5'

/** Label / value pairs in read-only cards — two columns from `sm`. */
export const pipelineDetailViewGridClass = 'grid gap-4 sm:grid-cols-2'

export const pipelineDetailViewRowLabelClass =
  'text-[11px] font-semibold uppercase tracking-[0.06em] text-fume-500 dark:text-fume-400'

export const pipelineDetailViewRowValueClass =
  'mt-1 text-sm leading-relaxed text-fume-900 dark:text-fume-100'

/** In-card subsection title (e.g. “Secondary objectives”). */
export const pipelineDetailViewSubheadingClass =
  'text-xs font-semibold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400'

/** Inset prose / list container for long free-text fields. */
export const pipelineDetailViewInsetClass =
  'rounded-xl border border-surface-inset-border bg-surface-inset/80 px-4 py-3 dark:bg-surface-inset/60'

export const pipelineDetailViewMutedClass = 'text-sm text-fume-500 dark:text-fume-400'

/** Short contextual note (e.g. M EUR legend) inside a financial card. */
export const pipelineDetailViewCalloutClass =
  'rounded-lg border border-gold-500/20 bg-gold-500/[0.06] px-3 py-2 text-xs leading-relaxed text-fume-700 dark:border-gold-400/25 dark:bg-gold-400/[0.07] dark:text-fume-300'

export const pipelineDetailViewStatusActiveClass =
  'inline-flex items-center rounded-full border border-gold-600/40 bg-gold-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gold-900 dark:border-gold-400/35 dark:bg-gold-400/10 dark:text-gold-200'

export const pipelineDetailViewStatusArchivedClass =
  'inline-flex items-center rounded-full border border-surface-divider bg-fume-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-fume-600 dark:text-fume-400'
