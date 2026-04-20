/**
 * Sticky route header — title, subtitle, account line, mobile actions slot.
 * Keep in sync with `TopBar.tsx`.
 */

export const topBarHeaderClass =
  'sticky top-0 z-30 border-b border-fume-200/80 bg-shell/80 backdrop-blur-xl backdrop-saturate-150 dark:border-fume-800 dark:bg-fume-950/88'

export const topBarInnerClass =
  'flex w-full flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8'

export const topBarTitleRowClass =
  'flex min-w-0 items-center justify-between gap-3 sm:justify-start'

export const topBarTitleBlockClass = 'min-w-0'

export const topBarTitleClass =
  'truncate text-sm font-medium text-fume-900 dark:text-fume-100'

export const topBarSubtitleClass = 'truncate text-xs text-fume-500 dark:text-fume-400'

export const topBarSignedInPrefixClass = 'text-fume-600 dark:text-fume-400'

export const topBarAccountEmphasisClass = 'font-medium text-fume-800 dark:text-fume-200'

export const topBarMobileActionsClass = 'shrink-0 sm:hidden'

export const topBarDesktopActionsClass = 'hidden shrink-0 sm:flex sm:justify-end'
