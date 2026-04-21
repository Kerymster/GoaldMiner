import { useEffect, useId, useMemo, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon, type IconName } from './icons'
import {
  modalBackdropClass,
  modalBodyClass,
  modalButtonBaseClass,
  modalButtonSecondaryClass,
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
    iconName: 'circleHelp',
    iconClass: 'border-gold-200 bg-gold-100 text-gold-800 dark:border-gold-500/45 dark:bg-gold-500/25',
    confirmButtonClass:
      'border-gold-600 bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 dark:border-gold-500 dark:bg-gold-500 dark:hover:bg-gold-400',
  },
  danger: {
    iconName: 'alertTriangle',
    iconClass: 'border-rose-200 bg-rose-100 text-rose-700 dark:border-rose-500/45 dark:bg-rose-500/20 dark:text-rose-100',
    confirmButtonClass:
      'border-rose-600 bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 dark:border-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400',
  },
  info: {
    iconName: 'info',
    iconClass: 'border-sky-200 bg-sky-100 text-sky-700 dark:border-sky-500/45 dark:bg-sky-500/20 dark:text-sky-100',
    confirmButtonClass:
      'border-sky-600 bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 dark:border-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400',
  },
  success: {
    iconName: 'checkCircle',
    iconClass: 'border-sea-200 bg-sea-100 text-sea-700 dark:border-sea-500/45 dark:bg-sea-500/20 dark:text-sea-100',
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
            <Icon name={variantPresentation.iconName} size={18} />
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
            <button type="button" onClick={onCancelClick} className={`${modalButtonBaseClass} ${modalButtonSecondaryClass}`}>
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onConfirmClick}
            disabled={isConfirming}
            className={`${modalButtonBaseClass} ${variantPresentation.confirmButtonClass}`}
          >
            {isConfirming ? 'Processing…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
