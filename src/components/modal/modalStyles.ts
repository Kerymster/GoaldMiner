/**
 * Root wrapper pinned to viewport and centered.
 */
export const modalViewportClass =
  'fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6'

/**
 * Backdrop behind the dialog panel.
 */
export const modalBackdropClass = 'absolute inset-0 bg-fume-950/55 backdrop-blur-[1px] cursor-default'

/**
 * Card shell for modal content.
 */
export const modalPanelClass =
  'relative z-[1] w-full max-w-lg overflow-hidden rounded-2xl border border-surface-panel-border bg-surface-panel shadow-2xl shadow-fume-950/25 ring-1 ring-fume-950/10 dark:ring-gold-400/20'

/**
 * Main content area containing icon, title, description and body.
 */
export const modalContentClass = 'flex gap-4 px-5 py-5 sm:px-6'

/**
 * Icon holder: soft tile (no nested “circle in circle” with round icons).
 */
export const modalIconWrapBaseClass =
  'mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-inset'

/**
 * Text stack next to icon.
 */
export const modalTextStackClass = 'min-w-0 flex-1 space-y-2'

/**
 * Modal title.
 */
export const modalTitleClass = 'text-base font-semibold text-text-primary dark:text-text-inverse'

/**
 * Optional supporting description.
 */
export const modalDescriptionClass = 'text-sm text-text-muted dark:text-fume-300'

/**
 * Optional custom body slot.
 */
export const modalBodyClass = 'pt-1 text-sm text-text-secondary dark:text-fume-200'

/**
 * Footer row with actions.
 */
export const modalFooterClass =
  'flex flex-col-reverse gap-2 border-t border-surface-divider bg-surface-inset/50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6 dark:border-surface-divider'

/**
 * Shared button chrome for footer actions.
 */
export const modalButtonBaseClass =
  'inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-panel disabled:cursor-not-allowed disabled:opacity-55'

/**
 * Quiet icon close button in top-right corner.
 */
export const modalCloseButtonClass =
  'absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg-soft hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:text-fume-300 dark:hover:bg-fume-700 dark:hover:text-fume-100'
