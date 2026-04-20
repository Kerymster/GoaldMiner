/**
 * Cross-page UI tokens: vertical rhythm, muted prose, inline links, pagination.
 * Prefer colocated `*Styles.ts` for feature-specific composites (see `detailStyles.ts`).
 */

/** Default vertical stack inside `<main>` for routed pages. */
export const pageStack = 'space-y-6'

/** Tighter stack (errors + actions, short messages). */
export const pageStackCompact = 'space-y-4'

/** Looser stack (dense hero + sections, some form steps). */
export const pageStackSpacious = 'space-y-8'

/**
 * Gold inline link — underline on hover (scout report flows, secondary nav).
 * For player-detail back link with stronger hover, use `playerDetailBackLinkClass`.
 */
export const pageInlineLinkGold =
  'text-sm font-medium text-gold-700 underline-offset-4 hover:underline dark:text-gold-400'

/** Body text — muted, default size (loading lines, short status). */
export const proseMuted = 'text-fume-600 dark:text-fume-400'

/** Body text — muted `text-sm`. */
export const proseMutedSm = 'text-sm text-fume-600 dark:text-fume-400'

/** Inline error without guaranteed `text-sm` (compact spans). */
export const proseError = 'text-red-600 dark:text-red-400'

/** Standard form/page error line. */
export const proseErrorSm = 'text-sm text-red-600 dark:text-red-400'

/** Hint under lists (player reports pick-a-player). */
export const pageHintNarrow = 'max-w-xl text-sm text-fume-600 dark:text-fume-400'

/** Full-viewport loading gate (e.g. auth session check). */
export const sessionGateLoadingClass =
  'flex min-h-dvh items-center justify-center bg-shell font-sans text-fume-600 dark:bg-fume-950 dark:text-fume-400'

/** Paginated list prev/next — matches `ListPagination`. */
export const paginationBarClass = 'flex flex-wrap items-center gap-2 text-sm'

export const paginationNavButtonClass =
  'cursor-pointer rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-fume-700'
