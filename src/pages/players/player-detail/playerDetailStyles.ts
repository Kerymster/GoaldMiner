/**
 * Player detail route — profile card, footer links, vertical rhythm.
 */

import { primaryCtaButtonClass } from '../../../components/styles/pageChromeStyles'

export const playerDetailCardClass =
  'rounded-2xl border border-surface-panel-border bg-surface-panel p-6 shadow-md shadow-fume-950/12 ring-1 ring-fume-900/5 dark:shadow-none dark:ring-0'

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

/** Primary action — open reports list (same gold primary as Create player). */
export const playerDetailReportsLinkClass = primaryCtaButtonClass

/** Footer action container aligned to the right edge of detail card. */
export const playerDetailReportsActionWrapClass = 'mt-8 flex flex-wrap justify-end gap-2'

/** Secondary action link for editing current player profile. */
export const playerDetailEditLinkClass =
  'inline-flex items-center rounded-lg border border-surface-field-border bg-surface-soft px-4 py-2 text-sm font-medium text-fume-800 transition-colors hover:border-gold-500/40 hover:text-gold-700 dark:text-fume-200 dark:hover:text-gold-300'

/** Long-form note under stats — bordered, relaxed line height. */
export const playerDetailNoteClass =
  'mt-8 border-t border-surface-divider pt-6 text-sm leading-relaxed text-gold-800 dark:text-gold-300'

/** Profile header wrapper with divider and responsive layout. */
export const playerProfileHeaderWrapClass =
  'flex flex-col gap-6 border-b border-surface-divider pb-6 sm:flex-row sm:items-start sm:justify-between'

/** Player name + age row in header. */
export const playerProfileTitleRowClass = 'flex flex-wrap items-center gap-2'

/** Player name typography in detail header. */
export const playerProfileNameClass =
  'text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50'

/** Age badge shown next to player name. */
export const playerProfileAgeBadgeClass =
  'rounded-full border border-surface-divider bg-surface-soft px-2.5 py-0.5 text-xs font-semibold text-fume-700 dark:text-fume-300'

/** Position / role badges row under profile meta. */
export const playerProfileBadgeRowClass = 'mt-3 flex flex-wrap items-center gap-2'

/** Gold accent badge for primary + secondary positions. */
export const playerProfilePositionBadgeClass =
  'rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-medium text-gold-800 dark:text-gold-300'

/** Neutral badge for role labels. */
export const playerProfileRoleBadgeClass =
  'rounded-full bg-surface-soft px-2.5 py-1 text-xs font-medium text-fume-700 dark:text-fume-300'

/** Stats grid layout for player detail cards. */
export const playerStatsGridClass = 'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'

/** Base card style used by each stat tile. */
export const playerStatsCardClass =
  'rounded-xl border border-surface-divider bg-surface-soft p-4'

/** Compact uppercase label style for stat keys. */
export const playerStatsLabelClass =
  'text-[11px] font-semibold uppercase tracking-[0.14em] text-fume-500'

/** Emphasized numeric stat value style. */
export const playerStatsValueStrongClass =
  'text-lg font-semibold tabular-nums text-fume-900 dark:text-fume-100'

/** Default stat value style for descriptive fields. */
export const playerStatsValueDefaultClass =
  'text-sm font-medium text-fume-800 dark:text-fume-200'

/** Full-width roles card at the bottom of stat grid. */
export const playerStatsRolesCardClass =
  'rounded-xl border border-surface-divider bg-surface-soft p-4 sm:col-span-2 lg:col-span-3'

