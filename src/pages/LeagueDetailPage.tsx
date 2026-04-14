import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { TeamLogo } from '../components/TeamLogo'
import { useLeagueDetail } from '../hooks/useLeagueDetail'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

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
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
          {league.countryName} · Tier {league.tier}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          {league.name}
        </h2>
        {league.nameLocal !== league.name ? (
          <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
            {league.nameLocal}
          </p>
        ) : null}
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Open a team to see its roster and jump to player profiles.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-fume-900 dark:text-fume-100">
          Teams
        </h3>
        {teamsLoading && !teamsRes ? (
          <p className="mt-2 text-sm text-fume-500 dark:text-fume-400">
            Loading teams…
          </p>
        ) : null}
        {error && league ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}
        {!teamsLoading || teamsRes ? (
          <p className="mt-1 text-xs text-fume-500 dark:text-fume-400">
            {teamsRes
              ? `Page ${teamsRes.page} of ${teamsRes.totalPages} (${teamsRes.total} teams)`
              : null}
          </p>
        ) : null}
        <ul className={`mt-3 ${listSurface}`}>
          {teams.map((team) => (
            <li key={team.id}>
              <Link
                to={`/teams/${team.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
              >
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <TeamLogo
                    key={`${team.id}-${team.logoUrl ?? ''}`}
                    name={team.name}
                    logoUrl={team.logoUrl}
                    size="sm"
                  />
                  <span className="truncate font-medium">{team.name}</span>
                </span>
                <span className="text-sm text-gold-700 dark:text-gold-500">
                  View roster →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {teamsRes && teams.length === 0 ? (
          <p className="mt-3 text-sm text-fume-500 dark:text-fume-400">
            No teams returned for this league.
          </p>
        ) : null}
        {teamsRes && teamsRes.totalPages > 1 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              disabled={teamsPage <= 1 || teamsLoading}
              onClick={() => setTeamsPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-fume-700"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={
                teamsPage >= teamsRes.totalPages || teamsLoading
              }
              onClick={() =>
                setTeamsPage((p) => Math.min(teamsRes.totalPages, p + 1))
              }
              className="rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-fume-700"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
