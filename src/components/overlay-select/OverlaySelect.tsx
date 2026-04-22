import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  overlayAutocompletePanelAboveClass,
  overlayAutocompletePanelClass,
} from './overlayDropdownStyles'
import {
  overlaySelectOptionDisabledClass,
  overlaySelectOptionHighlightClass,
  overlaySelectOptionInactiveClass,
  overlaySelectOptionSelectedClass,
  overlaySelectTriggerClass,
} from './overlaySelectStyles'

export type OverlaySelectOption = {
  value: string
  label: string
  disabled?: boolean
}

function nextEnabledIndex(options: OverlaySelectOption[], from: number, dir: 1 | -1) {
  const n = options.length
  if (n === 0) return 0
  let i = from
  for (let step = 0; step < n; step++) {
    i = (i + dir + n) % n
    if (!options[i]?.disabled) return i
  }
  return from
}

export function OverlaySelect({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  disabled = false,
  triggerClassName,
  popoverPlacement = 'below',
  'aria-invalid': ariaInvalid,
  id: idProp,
}: {
  value: string
  onChange: (value: string) => void
  options: OverlaySelectOption[]
  placeholder?: string
  disabled?: boolean
  triggerClassName?: string
  /** When `above`, the list opens upward (use near bottom of scroll containers). */
  popoverPlacement?: 'below' | 'above'
  'aria-invalid'?: boolean
  id?: string
}) {
  const reactId = useId()
  const listboxId = idProp ? `${idProp}-listbox` : `${reactId}-listbox`
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)

  const selectedLabel = useMemo(() => {
    const o = options.find((x) => x.value === value)
    return o?.label ?? placeholder
  }, [options, value, placeholder])

  const hasSelection = useMemo(
    () => options.some((o) => o.value === value && !o.disabled),
    [options, value],
  )

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const el = containerRef.current
      if (el && !el.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const resetHighlightToValue = useCallback(() => {
    const idx = options.findIndex((o) => o.value === value && !o.disabled)
    const first = options.findIndex((o) => !o.disabled)
    setHighlight(idx >= 0 ? idx : first >= 0 ? first : 0)
  }, [options, value])

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (e.key === 'Escape' && open) {
      e.preventDefault()
      setOpen(false)
      return
    }

    const enabledCount = options.filter((o) => !o.disabled).length
    if (open && enabledCount > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlight((h) => nextEnabledIndex(options, h, 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlight((h) => nextEnabledIndex(options, h, -1))
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const o = options[highlight]
        if (o && !o.disabled) {
          onChange(o.value)
          setOpen(false)
        }
        return
      }
    }

    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      resetHighlightToValue()
      setOpen(true)
    }
  }

  const triggerClass = [
    overlaySelectTriggerClass,
    'flex cursor-pointer items-center justify-between gap-2 text-left',
    disabled ? 'cursor-not-allowed opacity-50' : '',
    triggerClassName ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const listboxPanelClass =
    popoverPlacement === 'above' ? overlayAutocompletePanelAboveClass : overlayAutocompletePanelClass

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={idProp}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={ariaInvalid}
        onClick={() => {
          if (disabled) return
          if (open) {
            setOpen(false)
          } else {
            resetHighlightToValue()
            setOpen(true)
          }
        }}
        onKeyDown={onTriggerKeyDown}
        className={triggerClass}
      >
        <span
          className={[
            'min-w-0 truncate',
            hasSelection
              ? 'text-fume-900 dark:text-fume-100'
              : 'text-fume-500 dark:text-fume-400',
          ].join(' ')}
        >
          {selectedLabel}
        </span>
        <span className="shrink-0 text-fume-400 transition-transform dark:text-fume-500" aria-hidden>
          {open ? '▴' : '▾'}
        </span>
      </button>
      {open && !disabled ? (
        <div id={listboxId} role="listbox" className={listboxPanelClass}>
          {options.map((opt, idx) => {
            const isCurrent = opt.value === value
            const isHi = idx === highlight && !opt.disabled
            const rowClass = [
              'flex w-full cursor-pointer px-3 py-2.5 text-left text-sm transition-colors',
              opt.disabled
                ? overlaySelectOptionDisabledClass
                : isCurrent
                  ? isHi
                    ? `${overlaySelectOptionSelectedClass} ${overlaySelectOptionHighlightClass}`
                    : overlaySelectOptionSelectedClass
                  : isHi
                    ? `${overlaySelectOptionInactiveClass} ${overlaySelectOptionHighlightClass}`
                    : overlaySelectOptionInactiveClass,
            ].join(' ')
            return (
              <button
                key={`${opt.value}-${idx}`}
                type="button"
                role="option"
                tabIndex={-1}
                aria-selected={isCurrent}
                disabled={opt.disabled}
                onMouseEnter={() => !opt.disabled && setHighlight(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (!opt.disabled) {
                    onChange(opt.value)
                    setOpen(false)
                    triggerRef.current?.focus()
                  }
                }}
                className={rowClass}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
