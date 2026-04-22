/**
 * Centered auth card (login / register) — shared shell, fields, actions.
 */

import { primaryCtaButtonClass } from '../styles/pageChromeStyles'

export const authPageRootClass =
  'flex min-h-dvh items-center justify-center bg-shell px-4 font-sans text-fume-900 dark:bg-fume-950 dark:text-fume-100'

export const authCardClass =
  'w-full max-w-sm rounded-xl border border-surface-panel-border bg-surface-panel p-6 shadow-md shadow-fume-950/12 ring-1 ring-fume-900/5 dark:ring-0'

export const authHeadingClass = 'text-lg font-semibold tracking-tight'

export const authLeadClass = 'mt-1 text-sm text-fume-600 dark:text-fume-400'

export const authFormClass = 'mt-6 space-y-4'

export const authLabelClass = 'block text-xs font-medium text-fume-600 dark:text-fume-400'

export const authInputClass =
  'mt-1 w-full rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm outline-none ring-gold-500/40 focus:ring-2 dark:border-fume-700 dark:bg-fume-900'

export const authErrorClass = 'text-sm text-red-600 dark:text-red-400'

export const authInfoClass = 'text-sm text-sea-700 dark:text-sea-300'

export const authSubmitClass = `w-full ${primaryCtaButtonClass}`

export const authFooterClass = 'mt-4 text-center text-sm text-fume-600 dark:text-fume-400'

export const authFooterLinkClass =
  'font-medium text-gold-600 hover:text-gold-500 dark:text-gold-400'
