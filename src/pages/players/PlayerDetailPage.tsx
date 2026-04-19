import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { usePlayerDetail } from '../../hooks/usePlayerDetail'
import { useAppSelector } from '../../store/hooks'
import { PlayerDetailNote } from './PlayerDetailNote'
import { PlayerProfileHeader } from './PlayerProfileHeader'
import { PlayerStatsGrid } from './PlayerStatsGrid'
import { playerDetailCardClass } from './playerDetailStyles'

const backLinkClass =
  'text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300'

export function PlayerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { player, loading, error } = usePlayerDetail(id)
  const nationalities = useAppSelector((s) => s.nationalities.items)

  if (loading) {
    return <p className="text-fume-600 dark:text-fume-400">Loading…</p>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Link to="/players" className={backLinkClass}>
          Back to players
        </Link>
      </div>
    )
  }

  if (!player) {
    return (
      <div className="space-y-4">
        <p className="text-fume-600 dark:text-fume-400">Player not found.</p>
        <Link to="/players" className={backLinkClass}>
          Back to players
        </Link>
      </div>
    )
  }

  const countryLabel = player.countryId
    ? nationalities.find((n) => n.code === player.countryId)?.country
    : undefined

  const breadcrumbItems = [{ label: 'Players', to: '/players' }, { label: player.name }]

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className={playerDetailCardClass}>
        <PlayerProfileHeader player={player} countryLabel={countryLabel} />
        <PlayerStatsGrid
          rating={player.rating}
          underratedScore={player.underratedScore}
        />
        {player.note ? <PlayerDetailNote note={player.note} /> : null}
      </div>
      <Link
        to="/players"
        className="inline-flex text-sm font-medium text-fume-500 hover:text-gold-700 dark:text-fume-400 dark:hover:text-gold-400"
      >
        ← All players
      </Link>
    </div>
  )
}
