import type { ScoutReportForm } from '../../../types/scoutReportForm'
import { formatReportDisplayDate } from './formatReportDisplayDate'

export function DetailReportHero({
  reportId,
  form,
}: {
  reportId: string
  form: ScoutReportForm
}) {
  const name = form.playerInformation.name || 'Player'
  const club = form.playerInformation.club
  const rating = form.teamFit.ratingOutOfFive

  return (
    <div className="rounded-2xl border border-fume-200/90 bg-gradient-to-br from-white via-white to-shell/40 p-5 shadow-sm shadow-fume-950/10 dark:border-fume-800 dark:from-fume-900/80 dark:to-fume-950/50 dark:shadow-none sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
            Scout report
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
            {name}
          </h1>
          <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
            {formatReportDisplayDate(form.reportDate)}
            {club ? ` · ${club}` : null}
            {rating != null ? ` · ${rating}/5` : null}
          </p>
        </div>
        <span className="rounded-lg border border-fume-200/80 bg-white/80 px-2.5 py-1 font-mono text-[11px] text-fume-500 dark:border-fume-700 dark:bg-fume-900/60 dark:text-fume-400">
          {reportId}
        </span>
      </div>
    </div>
  )
}
