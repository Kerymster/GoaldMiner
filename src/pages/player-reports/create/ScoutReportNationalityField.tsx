import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { overlayAutocompletePanelClass } from '../../../components/overlay-select/overlayDropdownStyles'
import { proseError } from '../../../components/styles/pageChromeStyles'
import {
  overlaySelectOptionHighlightClass,
  overlaySelectOptionInactiveClass,
  overlaySelectOptionSelectedClass,
  overlaySelectTriggerClass,
} from '../../../components/overlay-select/overlaySelectStyles'
import { loadNationalities } from '../../../features/nationalities/nationalitiesSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import type { NationalityItem } from '../../../types/nationalities'
import { nationalitiesMatchingQuery } from '../../../utils/nationalitiesMatchingQuery'
import { FieldError } from './ScoutReportField'
import {
  reportFieldClass,
  reportFieldErrorClass,
  reportLabelClass,
} from './reportFormStyles'

function NationalityFlag({ item, className }: { item: NationalityItem; className?: string }) {
  const src = item.flag_png ?? item.flag_svg
  const alt = item.flag_alt ?? `${item.country} flag`
  if (!src) {
    return (
      <span
        className={`flex h-5 w-7 shrink-0 items-center justify-center rounded border border-dashed border-surface-field-border text-[9px] font-semibold text-fume-500 dark:text-fume-400 ${className ?? ''}`}
        aria-hidden
      >
        {item.code.slice(0, 2)}
      </span>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`h-5 w-7 shrink-0 rounded border border-surface-field-border object-cover ${className ?? ''}`}
      loading="lazy"
      decoding="async"
    />
  )
}

const panelClass = overlayAutocompletePanelClass

export function ScoutReportNationalityField({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (nationality: string) => void
  error?: string
}) {
  const dispatch = useAppDispatch()
  const { items, status, error: loadError } = useAppSelector((s) => s.nationalities)

  useEffect(() => {
    void dispatch(loadNationalities())
  }, [dispatch])

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)

  const filtered = useMemo(() => nationalitiesMatchingQuery(items, query), [items, query])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const el = containerRef.current
      if (el && !el.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const selected = useMemo(
    () => items.find((i) => i.nationality === value) ?? null,
    [items, value],
  )

  const pick = useCallback(
    (item: NationalityItem) => {
      onChange(item.nationality)
      setOpen(false)
      setQuery('')
      triggerRef.current?.focus()
    },
    [onChange],
  )

  const displayIndex =
    filtered.length === 0 ? 0 : Math.min(Math.max(0, highlight), filtered.length - 1)

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || filtered.length === 0) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((prev) => {
        const clamped = Math.min(Math.max(0, prev), filtered.length - 1)
        return (clamped + 1) % filtered.length
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((prev) => {
        const clamped = Math.min(Math.max(0, prev), filtered.length - 1)
        return (clamped - 1 + filtered.length) % filtered.length
      })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const row = filtered[displayIndex]
      if (row) pick(row)
    } else if (e.key === 'Escape') {
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  const stateClass = error ? reportFieldErrorClass : ''
  const triggerClass = `${overlaySelectTriggerClass} flex cursor-pointer items-center justify-between gap-2 text-left ${stateClass}`

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="flex flex-col gap-1">
        <span className={reportLabelClass}>Nationality</span>
        <div
          className={`${reportFieldClass} text-fume-500 dark:text-fume-400`}
          aria-busy="true"
        >
          Loading nationalities…
        </div>
        <FieldError message={error} />
      </div>
    )
  }

  if (status === 'failed' || items.length === 0) {
    return (
      <div className="flex flex-col gap-1">
        <label className={`${reportLabelClass} flex flex-col gap-1`}>
          Nationality
          <span className="text-[11px] font-normal normal-case tracking-normal text-fume-600 dark:text-fume-400">
            {status === 'failed' ? (
              <span className={proseError}>{loadError}</span>
            ) : (
              'No nationalities were returned.'
            )}{' '}
            Enter the demonym manually (e.g. Turkish) — it must match what the API expects on save.
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
            aria-invalid={Boolean(error)}
            className={`${reportFieldClass} ${stateClass}`}
          />
        </label>
        {status === 'failed' ? (
          <button
            type="button"
            onClick={() => void dispatch(loadNationalities())}
            className="cursor-pointer self-start text-xs font-medium text-gold-700 underline-offset-2 hover:underline dark:text-gold-400"
          >
            Retry loading list
          </button>
        ) : null}
        <FieldError message={error} />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      <span className={reportLabelClass} id="scout-nationality-label">
        Nationality
      </span>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Nationality"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="scout-nationality-options"
        aria-invalid={Boolean(error)}
        onClick={() => {
          if (open) {
            setOpen(false)
          } else {
            setQuery('')
            setHighlight(0)
            setOpen(true)
            window.setTimeout(() => searchRef.current?.focus(), 0)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') e.preventDefault()
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            if (!open) {
              setQuery('')
              setHighlight(0)
              setOpen(true)
              window.setTimeout(() => searchRef.current?.focus(), 0)
            }
          }
        }}
        className={triggerClass}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {selected ? (
            <>
              <NationalityFlag item={selected} />
              <span className="min-w-0 truncate">
                <span className="font-medium text-fume-900 dark:text-fume-100">
                  {selected.country}
                </span>
                <span className="text-fume-500 dark:text-fume-400"> · {selected.nationality}</span>
              </span>
            </>
          ) : value ? (
            <span className="min-w-0 truncate text-fume-800 dark:text-fume-200">{value}</span>
          ) : (
            <span className="text-fume-500 dark:text-fume-400">Search or select nationality…</span>
          )}
        </span>
        <span
          className="shrink-0 text-fume-400 transition-transform dark:text-fume-500"
          aria-hidden
        >
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open ? (
        <div id="scout-nationality-panel" className={panelClass}>
          <div className="sticky top-0 z-[1] border-b border-surface-divider bg-inherit px-2 py-2">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlight(0)
              }}
              onKeyDown={onSearchKeyDown}
              placeholder="Filter by country, nationality, or code…"
              autoComplete="off"
              className={`${reportFieldClass} w-full`}
              aria-label="Filter nationalities"
            />
          </div>
          <div id="scout-nationality-options" role="listbox" aria-labelledby="scout-nationality-label">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-fume-500 dark:text-fume-400">
                No matches. Try another spelling.
              </p>
            ) : (
              filtered.map((item, idx) => {
                const isCurrent = item.nationality === value
                const isHi = idx === displayIndex
                return (
                  <button
                    key={item.code}
                    type="button"
                    role="option"
                    aria-selected={isCurrent}
                    onMouseEnter={() => setHighlight(idx)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(item)}
                    className={[
                      'flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors',
                      isCurrent
                        ? isHi
                          ? `${overlaySelectOptionSelectedClass} ${overlaySelectOptionHighlightClass}`
                          : overlaySelectOptionSelectedClass
                        : isHi
                          ? `${overlaySelectOptionInactiveClass} ${overlaySelectOptionHighlightClass}`
                          : overlaySelectOptionInactiveClass,
                    ].join(' ')}
                  >
                    <NationalityFlag item={item} />
                    <span className="min-w-0 flex-1">
                      <span className="font-medium text-fume-900 dark:text-fume-100">
                        {item.country}
                      </span>
                      <span className="text-fume-500 dark:text-fume-400"> · {item.nationality}</span>
                      <span className="ml-1 text-[10px] uppercase tracking-wide text-fume-400">
                        {item.code}
                      </span>
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      ) : null}

      <FieldError message={error} />
    </div>
  )
}

