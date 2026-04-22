import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  STAFF_RATING_MAX,
  STAFF_RATING_MIN,
  type ScoutReportForm,
} from '../../../types/scoutReportForm'
import { formatReportDisplayDate } from './formatReportDisplayDate'

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const starOn =
  'text-gold-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]'
const starOff = 'text-fume-400 dark:text-fume-700'
const heroRootClass =
  'relative isolate min-h-[200px] overflow-hidden rounded-3xl border-2 border-gold-500/35 bg-gradient-to-br from-white via-fume-50 to-fume-100 text-fume-900 shadow-lg shadow-gold-900/10 dark:border-gold-400/50 dark:from-fume-950 dark:via-fume-950 dark:to-fume-950 dark:text-fume-50 dark:shadow-fume-950/40 sm:min-h-[220px]'
const heroGlowGoldClass =
  'pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-gold-500/18 opacity-0 blur-3xl dark:opacity-100 dark:bg-gold-500/18'
const heroGlowSeaClass =
  'pointer-events-none absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-sea-500/10 opacity-0 blur-3xl dark:opacity-100 dark:bg-sea-500/10'
const heroEditLinkClass =
  'inline-flex items-center rounded-full border border-gold-600/35 bg-gold-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-800 transition hover:border-gold-600/50 hover:bg-gold-500/15 dark:border-gold-500/45 dark:bg-gold-500/15 dark:text-gold-300 dark:hover:border-gold-400/60 dark:hover:bg-gold-500/20'
const heroCopyButtonClass =
  'inline-flex items-center gap-1.5 rounded-full border border-fume-300 bg-white/70 px-2.5 py-0.5 text-[10px] font-medium text-fume-700 transition hover:border-gold-500/35 hover:text-fume-900 dark:border-fume-600/80 dark:bg-fume-900/60 dark:text-fume-400 dark:hover:border-gold-500/40 dark:hover:text-fume-200'
const heroMetaPillClass =
  'inline-flex items-center rounded-full border border-fume-300 bg-white/70 px-3 py-1 text-xs font-medium text-fume-700 dark:border-fume-600/70 dark:bg-fume-900/40 dark:text-fume-200'
const heroInitialsClass =
  'flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-2xl border border-gold-500/35 bg-gradient-to-br from-white via-gold-50 to-gold-100 text-2xl font-bold tracking-tight text-gold-800 shadow-inner shadow-gold-900/10 dark:from-fume-800/90 dark:via-fume-900 dark:to-fume-950 dark:text-gold-300 dark:shadow-black/30 sm:h-24 sm:w-24 sm:rounded-3xl sm:text-3xl'

function StaffRatingStars({ rating }: { rating: number }) {
  if (rating >= STAFF_RATING_MIN && rating <= STAFF_RATING_MAX) {
    const steps = STAFF_RATING_MAX - STAFF_RATING_MIN + 1
    const filled = rating - (STAFF_RATING_MIN - 1)
    return (
      <div
        className="flex items-center gap-0.5"
        aria-label={`Rating ${rating} on a scale from ${STAFF_RATING_MIN} to ${STAFF_RATING_MAX}`}
      >
        {Array.from({ length: steps }, (_, i) => (
          <span key={i} className={i < filled ? starOn : starOff}>
            ★
          </span>
        ))}
      </div>
    )
  }
  return null
}

export function DetailReportHero({
  playerId,
  reportId,
  form,
}: {
  playerId?: string
  reportId: string
  form: ScoutReportForm
}) {
  const p = form.playerInformation
  const name = p.name || 'Player'
  const club = p.club?.trim()
  const rating = form.teamFit.ratingOutOfFive

  const ratingCaption =
    rating != null
      ? rating >= STAFF_RATING_MIN && rating <= STAFF_RATING_MAX
        ? `${rating} (${STAFF_RATING_MIN}–${STAFF_RATING_MAX})`
        : String(rating)
      : null
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
    <div className={heroRootClass}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(51,65,85,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.22) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div
        className={heroGlowGoldClass}
        aria-hidden
      />
      <div
        className={heroGlowSeaClass}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" aria-hidden />

      <div className="relative flex flex-col gap-8 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-700 dark:text-gold-400">
              Scout report
            </p>
            {playerId ? (
              <Link
                to={`/player-reports/players/${encodeURIComponent(playerId)}/reports/${encodeURIComponent(reportId)}/edit`}
                className={heroEditLinkClass}
              >
                Edit report
              </Link>
            ) : null}
            <button
              type="button"
              onClick={copyId}
              className={heroCopyButtonClass}
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
                  className={heroMetaPillClass}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-center gap-5 sm:flex-col sm:items-end">
          <div
            className={heroInitialsClass}
            aria-hidden
          >
            {initialsFromName(name)}
          </div>
          {rating != null && rating > 0 ? (
            <div className="flex flex-col gap-1.5 sm:items-end">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fume-600 dark:text-fume-500">Staff rating</p>
              <div className="flex items-center gap-2">
                <StaffRatingStars rating={rating} />
                <span className="text-sm font-semibold tabular-nums text-gold-700 dark:text-gold-300">
                  {ratingCaption}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
