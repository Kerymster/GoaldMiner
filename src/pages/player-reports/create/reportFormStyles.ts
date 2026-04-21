import { playerListInputClass } from '../../players/all-players/playerListStyles'

/**
 * Scout report create/edit flow — fields, step panel, validation copy.
 */

export const reportFieldClass = playerListInputClass

export const reportTextareaClass = `${playerListInputClass} min-h-[5rem] resize-y`

export const reportLabelClass =
  'flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-gold-700 dark:text-gold-400'

export const reportSectionTitleClass =
  'text-sm font-semibold text-gold-800 dark:text-gold-300'

export const reportSubLabelClass =
  'text-[11px] font-medium normal-case tracking-normal text-fume-500 dark:text-fume-500'

/** Append to inputs/textareas when the field failed validation. */
export const reportFieldErrorClass =
  'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500 dark:focus:border-red-500'

/** Inline validation + step-level warnings — compact, muted red. */
export const reportValidationMessageClass =
  'text-[11px] font-normal leading-snug text-red-500/75 dark:text-red-400/65'

/** Step body card in `CreateReportForm` (title + fields + nav). */
export const reportStepCardClass =
  'rounded-xl border border-surface-panel-border bg-surface-panel p-5 shadow-sm shadow-fume-950/10 dark:shadow-none sm:p-6'
