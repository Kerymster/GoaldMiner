import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { useLeagueDetail } from '../../hooks/useLeagueDetail'
import { LeagueDetailHero } from './LeagueDetailHero'
import { LeagueTeamsSection } from './LeagueTeamsSection'

export function LeagueDetailPage() {
  const { leagueId } = useParams<{ leagueId: string }>()
  const {
    league,
    leagueLoading,
    teamsRes,
    teams,
    teamsPage,
    setTeamsPage,
    teamsLoading,
    error,
  } = useLeagueDetail(leagueId)

  if (leagueLoading) {
    return <p className="text-fume-600 dark:text-fume-400">Loading…</p>
  }

  if (error && !league) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Link
          to="/leagues"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
        >
          All leagues
        </Link>
      </div>
    )
  }

  if (!league) {
    return (
      <div className="space-y-4">
        <p className="text-fume-600 dark:text-fume-400">League not found.</p>
        <Link
          to="/leagues"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
        >
          All leagues
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Leagues', to: '/leagues' },
          { label: league.name },
        ]}
      />
      <LeagueDetailHero league={league} />
      <LeagueTeamsSection
        teams={teams}
        teamsRes={teamsRes}
        teamsPage={teamsPage}
        setTeamsPage={setTeamsPage}
        teamsLoading={teamsLoading}
        error={error}
      />
    </div>
  )
}
