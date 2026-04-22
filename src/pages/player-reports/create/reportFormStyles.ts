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

/** Optional edit-mode setting row that controls report-to-player sync behavior. */
export const reportSyncSettingCardClass =
  'mt-5 rounded-xl border border-surface-panel-border bg-surface-panel px-3 py-2'

/** Checkbox + copy layout used inside the edit-mode sync setting row. */
export const reportSyncSettingLabelClass = 'flex items-start gap-3'

/** Gold-accented checkbox that stays on project palette when checked. */
export const reportSyncSettingCheckboxClass =
  'mt-0.5 h-4 w-4 rounded border-surface-field-border bg-surface-field accent-gold-500 text-gold-500 shadow-sm focus:ring-2 focus:ring-gold-500/45 focus:ring-offset-0'

/** Main copy for the sync-to-player option. */
export const reportSyncSettingTitleClass =
  'block text-sm font-medium text-fume-900 dark:text-fume-100'

/** Helper copy clarifying the default snapshot behavior. */
export const reportSyncSettingHintClass =
  'block text-xs text-fume-600 dark:text-fume-300'
