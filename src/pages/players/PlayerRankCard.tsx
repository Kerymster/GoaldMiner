type PlayerRankCardProps = {
  underratedScore: number | undefined
}

/** Highlights the underrated metric (treated as a “rank” style callout). */
export function PlayerRankCard({ underratedScore }: PlayerRankCardProps) {
  return (
    <div className="shrink-0 rounded-xl border border-gold-500/30 bg-gold-500/10 px-5 py-4 text-center dark:bg-gold-400/10">
      <p className="text-3xl font-semibold tabular-nums text-gold-800 dark:text-gold-300">
        {underratedScore ?? '—'}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-700/90 dark:text-gold-400/90">
        Rank
      </p>
    </div>
  )
}
