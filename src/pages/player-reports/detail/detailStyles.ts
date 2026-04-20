/**
 * Read-only scout report body — section cards, tabs, label/value grid.
 * Reference pattern for other feature-level `*Styles.ts` modules (named exports + JSDoc).
 */

export const detailPageStack = 'space-y-5 lg:space-y-6'

/** Root stack in `ScoutReportDetailBody` (tabs + panels). */
export const detailBodyShellStack = 'space-y-5'

/** Uses theme surface tokens — see index.css (--surface-panel) */
export const detailSectionCard =
  'rounded-2xl border border-surface-panel-border bg-surface-panel p-5 shadow-sm shadow-fume-950/10 dark:shadow-none sm:p-6'

/** Section card main title (h2) — row with gold accent */
export const detailSectionTitle =
  'flex items-center gap-3 border-b border-surface-divider pb-4'

/** Cap-height bar, centered with the title line (avoid stretching past text) */
export const detailSectionTitleAccent =
  'h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700/55'

/** Distinct from body values: deep gold-brown in light; gold tint in dark without glow */
export const detailSectionTitleLabel =
  'min-w-0 flex-1 text-base font-bold leading-snug tracking-tight text-gold-950 dark:text-gold-200'

/** In-card subsection (h3), e.g. “Ball control” */
export const detailSubTitle =
  'mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700 first:mt-0 dark:text-gold-400'

export const detailGrid = 'mt-4 grid gap-4 sm:grid-cols-2'

export const detailRowLabel =
  'text-[11px] font-semibold uppercase tracking-[0.06em] text-fume-500 dark:text-fume-400'

export const detailRowValue =
  'mt-1 text-sm leading-relaxed text-fume-900 dark:text-fume-100'

/** Segmented control — two “pages” without leaving the route */
export const detailTabList =
  'flex flex-wrap gap-1 rounded-xl border border-surface-inset-border bg-surface-inset p-1'

export const detailTabButton =
  'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40'

export const detailTabButtonActive =
  'bg-white text-fume-950 shadow-sm dark:bg-surface-panel dark:text-fume-50'

export const detailTabButtonIdle =
  'text-fume-600 hover:bg-white/70 dark:text-fume-400 dark:hover:bg-surface-panel/70'

/** Helper line under tabs (overview / full analysis) */
export const detailTabHint =
  'mt-2 max-w-2xl pl-2 text-xs leading-relaxed text-fume-600 sm:pl-3 dark:text-fume-400'
