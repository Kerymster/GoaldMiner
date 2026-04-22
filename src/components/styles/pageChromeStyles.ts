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

/**
 * Gold primary CTA — same chrome as player form “Create / Update player” (border-gold-600/80, bg-gold-600/15).
 * Use for Add player, View reports, wizard Save/Update, confirmation modals, etc.
 */
export const primaryCtaButtonClass =
  'inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-gold-600/80 bg-gold-600/15 px-4 py-2 text-sm font-semibold text-fume-900 shadow-sm transition-colors hover:bg-gold-600/25 hover:text-fume-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 disabled:cursor-wait disabled:opacity-70 dark:border-gold-500/50 dark:text-gold-100 dark:hover:bg-gold-500/20 dark:hover:text-fume-50'

/**
 * Outlined secondary CTA — wizard “Next”, Cancel, modal dismiss; pairs with `primaryCtaButtonClass`.
 */
export const secondaryCtaButtonClass =
  'inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-surface-field-border bg-surface-soft px-4 py-2 text-sm font-medium text-fume-800 shadow-sm transition-colors hover:border-gold-500/45 hover:bg-fume-50 hover:text-fume-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/30 dark:text-fume-200 dark:hover:border-gold-400/40 dark:hover:bg-fume-800/50 dark:hover:text-fume-50'
