import { playerListInputClass } from '../../players/playerListStyles'

export const reportFieldClass = playerListInputClass

export const reportTextareaClass = `${playerListInputClass} min-h-[5rem] resize-y`

export const reportLabelClass =
  'flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-600 dark:text-fume-400'

export const reportSectionTitleClass =
  'text-sm font-semibold text-fume-900 dark:text-fume-100'

export const reportSubLabelClass =
  'text-[11px] font-medium normal-case tracking-normal text-fume-500 dark:text-fume-500'

/** Append to inputs/textareas when the field failed validation. */
export const reportFieldErrorClass =
  'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500 dark:focus:border-red-500'

/** Inline validation + step-level warnings — compact, muted red. */
export const reportValidationMessageClass =
  'text-[11px] font-normal leading-snug text-red-500/75 dark:text-red-400/65'
