type PlayerStatsGridProps = {
  rating: number | undefined
  underratedScore: number | undefined
}

export function PlayerStatsGrid({
  rating,
  underratedScore,
}: PlayerStatsGridProps) {
  return (
    <dl className="mt-8 grid gap-4 sm:grid-cols-2">
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-fume-500">
          Rating
        </dt>
        <dd className="mt-1 text-lg tabular-nums">{rating ?? '—'}</dd>
      </div>
      <div className="sm:text-right">
        <dt className="text-xs font-medium uppercase tracking-wide text-fume-500">
          Ledger score
        </dt>
        <dd className="mt-1 text-lg tabular-nums text-gold-700 dark:text-gold-400">
          {underratedScore ?? '—'}
        </dd>
      </div>
    </dl>
  )
}
