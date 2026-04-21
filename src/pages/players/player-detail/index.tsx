import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { proseError, proseMuted } from '../../../components/pageChromeStyles'
import { usePlayerDetail } from '../../../hooks/usePlayerDetail'
import { PlayerDetailNote } from './PlayerDetailNote'
import { PlayerProfileHeader } from './PlayerProfileHeader'
import { PlayerStatsGrid } from './PlayerStatsGrid'
import {
  playerDetailBackLinkClass,
  playerDetailCardClass,
  playerDetailEditLinkClass,
  playerDetailFooterLinkClass,
  playerDetailPageStackClass,
  playerDetailReportsActionWrapClass,
  playerDetailReportsLinkClass,
  playerDetailStateStackClass,
} from './playerDetailStyles'

export function PlayerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { player, loading, error } = usePlayerDetail(id)

  if (loading) {
    return <p className={proseMuted}>Loading…</p>
  }

  if (error) {
    return (
      <div className={playerDetailStateStackClass}>
        <p className={proseError}>{error}</p>
        <Link to="/players" className={playerDetailBackLinkClass}>
          Back to players
        </Link>
      </div>
    )
  }

  if (!player) {
    return (
      <div className={playerDetailStateStackClass}>
        <p className={proseMuted}>Player not found.</p>
        <Link to="/players" className={playerDetailBackLinkClass}>
          Back to players
        </Link>
      </div>
    )
  }

  const breadcrumbItems = [{ label: 'Players', to: '/players' }, { label: player.name }]

  return (
    <div className={playerDetailPageStackClass}>
      <Breadcrumbs items={breadcrumbItems} />
      <div className={playerDetailCardClass}>
        <PlayerProfileHeader player={player} />
        <PlayerStatsGrid player={player} />
        {player.note ? <PlayerDetailNote note={player.note} /> : null}
        <div className={playerDetailReportsActionWrapClass}>
          <Link to={`/players/${player.id}/edit`} className={playerDetailEditLinkClass}>
            Edit player
          </Link>
          <Link
            to={`/player-reports?playerId=${encodeURIComponent(player.id)}`}
            state={{
              selectedPlayer: {
                id: player.id,
                name: player.name,
                team: player.team,
                position: player.position,
              },
            }}
            className={playerDetailReportsLinkClass}
          >
            View reports
          </Link>
        </div>
      </div>
      <Link to="/players" className={playerDetailFooterLinkClass}>
        ← All players
      </Link>
    </div>
  )
}
