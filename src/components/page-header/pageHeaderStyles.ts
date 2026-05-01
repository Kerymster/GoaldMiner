/**
 * `PageHeader` shell — elevated “hero” band: top→bottom gradient (slightly darker → `surface-panel`),
 * stronger shadow + gold frame than generic cards so wayfinding stays clear above the tactical backdrop
 * (`layoutPageBackdropImageClass`). We intentionally do not tile the same PNG here — the
 * layout already full-bleeds it; re-layering would add noise and scale clashes.
 * Keep in sync with `src/components/page-header/PageHeader.tsx`.
 */

export const pageHeaderShellClass =
  'relative overflow-hidden rounded-2xl border border-surface-panel-border bg-gradient-to-b from-fume-200/50 from-0% via-fume-50/80 via-45% to-surface-panel to-100% p-5 shadow-lg shadow-fume-950/15 ring-1 ring-fume-900/[0.07] dark:border-gold-400/48 dark:from-fume-900 dark:via-fume-900/55 dark:via-40% dark:to-surface-panel dark:shadow-[0_20px_52px_-18px_var(--shadow-elevated-header)] dark:ring-1 dark:ring-gold-400/30 sm:p-6 lg:p-7'

/** Thin gold cap — pairs with bottom glow so the header reads as a bounded band, not a floating card. */
export const pageHeaderTopGlowClass =
  'pointer-events-none absolute inset-x-0 top-0 z-[1] h-0.5 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent dark:via-gold-400/60'

export const pageHeaderBottomGlowClass =
  'pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent dark:via-gold-400/48'

export const pageHeaderInnerClass = 'relative z-[2] space-y-5'

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

