import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { useTeamDetail } from '../../hooks/useTeamDetail'
import { useAppSelector } from '../../store/hooks'
import { selectLeagueMetaById } from '../../store/selectors/leaguesSelectors'
import { TeamDetailCard } from './TeamDetailCard'
import { TeamRosterSection } from './TeamRosterSection'

const backToTeamsClass =
  'text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300'

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>()
  const {
    team,
    teamLoading,
    rosterRes,
    roster,
    rosterPage,
    setRosterPage,
    rosterLoading,
    error,
  } = useTeamDetail(teamId)

  const leagueMeta = useAppSelector((s) =>
    selectLeagueMetaById(s, team?.leagueId),
  )

  if (teamLoading) {
    return <p className="text-fume-600 dark:text-fume-400">Loading…</p>
  }

  if (error && !team) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Link to="/teams" className={backToTeamsClass}>
          All teams
        </Link>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="space-y-4">
        <p className="text-fume-600 dark:text-fume-400">Team not found.</p>
        <Link to="/teams" className={backToTeamsClass}>
          All teams
        </Link>
      </div>
    )
  }

  const leagueName = leagueMeta?.name ?? team.leagueId

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Leagues', to: '/leagues' },
          {
            label: leagueName,
            to: `/leagues/${team.leagueId}`,
          },
          { label: team.name },
        ]}
      />
      <TeamDetailCard
        team={team}
        leagueMeta={leagueMeta}
        leagueName={leagueName}
        rosterRes={rosterRes}
        rosterLoading={rosterLoading}
      />
      <TeamRosterSection
        roster={roster}
        rosterRes={rosterRes}
        rosterPage={rosterPage}
        setRosterPage={setRosterPage}
        rosterLoading={rosterLoading}
        error={error}
      />
    </div>
  )
}
