import { useState } from 'react'
import type { ScoutReportForm } from '../../../types/scoutReportForm'
import { formatReportDisplayDate } from './formatReportDisplayDate'

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < rating
              ? 'text-gold-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]'
              : 'text-fume-600 dark:text-fume-700'
          }
        >
          ★
        </span>
      ))}
    </div>
  )
}

export function DetailReportHero({
  reportId,
  form,
}: {
  reportId: string
  form: ScoutReportForm
}) {
  const p = form.playerInformation
  const name = p.name || 'Player'
  const club = p.club?.trim()
  const rating = form.teamFit.ratingOutOfFive
  const [copied, setCopied] = useState(false)

  const positionLine = [p.position?.trim(), (p.mostlyUsedRole ?? '').trim()]
    .filter(Boolean)
    .join(' · ')

  const metaItems = [
    formatReportDisplayDate(form.reportDate),
    club || null,
    positionLine || null,
    p.nationality?.trim() || null,
  ].filter(Boolean) as string[]

  const copyId = () => {
    void navigator.clipboard.writeText(reportId).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative isolate min-h-[200px] overflow-hidden rounded-3xl border-2 border-gold-500/55 bg-fume-950 text-fume-50 shadow-lg shadow-fume-950/25 dark:border-gold-400/50 dark:shadow-fume-950/40 sm:min-h-[220px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-gold-500/25 blur-3xl dark:bg-gold-500/18"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-sea-500/15 blur-3xl dark:bg-sea-500/10"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" aria-hidden />

      <div className="relative flex flex-col gap-8 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-400">
              Scout report
            </p>
            <button
              type="button"
              onClick={copyId}
              className="inline-flex items-center gap-1.5 rounded-full border border-fume-600/80 bg-fume-900/60 px-2.5 py-0.5 text-[10px] font-medium text-fume-400 transition hover:border-gold-500/40 hover:text-fume-200"
              title="Copy full report ID"
            >
              <svg className="h-3 w-3 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M8 7V5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2M8 7h8a2 2 0 012 2v0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-mono tabular-nums tracking-tight">
                {copied ? 'Copied' : `${reportId.slice(0, 8)}…`}
              </span>
            </button>
          </div>

          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              {name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {metaItems.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-fume-600/70 bg-fume-900/40 px-3 py-1 text-xs font-medium text-fume-200"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-center gap-5 sm:flex-col sm:items-end">
          <div
            className="flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-2xl border border-gold-500/35 bg-gradient-to-br from-fume-800/90 to-fume-950 text-2xl font-bold tracking-tight text-gold-300 shadow-inner shadow-black/30 sm:h-24 sm:w-24 sm:rounded-3xl sm:text-3xl"
            aria-hidden
          >
            {initialsFromName(name)}
          </div>
          {rating != null && rating > 0 ? (
            <div className="flex flex-col gap-1.5 sm:items-end">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fume-500">Staff rating</p>
              <div className="flex items-center gap-2">
                <RatingStars rating={rating} />
                <span className="text-sm font-semibold tabular-nums text-gold-300">{rating}/5</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
