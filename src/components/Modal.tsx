import { useEffect, useId, useMemo, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon, type IconName } from './icons'
import { primaryCtaButtonClass, secondaryCtaButtonClass } from './pageChromeStyles'
import {
  modalBackdropClass,
  modalBodyClass,
  modalButtonBaseClass,
  modalCloseButtonClass,
  modalContentClass,
  modalDescriptionClass,
  modalFooterClass,
  modalIconWrapBaseClass,
  modalPanelClass,
  modalTextStackClass,
  modalTitleClass,
  modalViewportClass,
} from './modalStyles'

export type ModalVariant = 'confirmation' | 'danger' | 'info' | 'success'

type ModalProps = {
  isOpen: boolean
  title: string
  description?: string
  variant?: ModalVariant
  confirmLabel?: string
  cancelLabel?: string
  hideCancel?: boolean
  isConfirming?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  onClose: () => void
  children?: ReactNode
}

type VariantPresentation = {
  iconName: IconName
  iconClass: string
  confirmButtonClass: string
}

const VARIANT_PRESENTATIONS: Record<ModalVariant, VariantPresentation> = {
  confirmation: {
    iconName: 'fileCheck',
    iconClass:
      'bg-gold-500/[0.08] text-gold-600 ring-gold-500/15 dark:bg-gold-400/[0.07] dark:text-gold-400 dark:ring-gold-400/20',
    /** Superseded by `primaryCtaButtonClass` in footer — kept for typing only. */
    confirmButtonClass: '',
  },
  danger: {
    iconName: 'alertTriangle',
    iconClass:
      'bg-rose-500/[0.08] text-rose-600 ring-rose-500/15 dark:bg-rose-400/[0.08] dark:text-rose-300 dark:ring-rose-400/25',
    confirmButtonClass:
      'border-rose-600 bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 dark:border-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400',
  },
  info: {
    iconName: 'info',
    iconClass:
      'bg-sky-500/[0.08] text-sky-600 ring-sky-500/15 dark:bg-sky-400/[0.08] dark:text-sky-300 dark:ring-sky-400/25',
    confirmButtonClass:
      'border-sky-600 bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 dark:border-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400',
  },
  success: {
    iconName: 'checkCircle',
    iconClass:
      'bg-sea-500/[0.08] text-sea-600 ring-sea-500/15 dark:bg-sea-400/[0.08] dark:text-sea-300 dark:ring-sea-400/25',
    confirmButtonClass:
      'border-sea-600 bg-sea-600 text-white hover:bg-sea-700 focus:ring-sea-500 dark:border-sea-500 dark:bg-sea-500 dark:hover:bg-sea-400',
  },
}

export function Modal({
  isOpen,
  title,
  description,
  variant = 'confirmation',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  hideCancel = false,
  isConfirming = false,
  closeOnBackdrop = true,
  closeOnEscape = true,
  onConfirm,
  onCancel,
  onClose,
  children,
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const previousOverflowRef = useRef<string | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const variantPresentation = useMemo(() => VARIANT_PRESENTATIONS[variant], [variant])

  useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    previousOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      document.body.style.overflow = previousOverflowRef.current ?? ''
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeOnEscape, isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') return null

  const confirmButtonClassName =
    variant === 'confirmation'
      ? primaryCtaButtonClass
      : `${modalButtonBaseClass} ${variantPresentation.confirmButtonClass}`

  const onCancelClick = () => {
    onCancel?.()
    onClose()
  }

  const onConfirmClick = () => {
    onConfirm?.()
  }

  return createPortal(
    <div className={modalViewportClass} role="presentation">
      <button
        type="button"
        aria-label="Close modal"
        className={modalBackdropClass}
        onClick={closeOnBackdrop ? onCancelClick : undefined}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={modalPanelClass}
      >
        <button type="button" aria-label="Close" className={modalCloseButtonClass} onClick={onCancelClick}>
          <Icon name="close" size={16} />
        </button>
        <div className={modalContentClass}>
          <span className={`${modalIconWrapBaseClass} ${variantPresentation.iconClass}`} aria-hidden>
            <Icon name={variantPresentation.iconName} size={20} strokeWidth={1.75} />
          </span>
          <div className={modalTextStackClass}>
            <h2 id={titleId} className={modalTitleClass}>
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className={modalDescriptionClass}>
                {description}
              </p>
            ) : null}
            {children ? <div className={modalBodyClass}>{children}</div> : null}
          </div>
        </div>
        <div className={modalFooterClass}>
          {!hideCancel ? (
            <button type="button" onClick={onCancelClick} className={secondaryCtaButtonClass}>
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onConfirmClick}
            disabled={isConfirming}
            className={confirmButtonClassName}
          >
            {isConfirming ? 'Processing…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
