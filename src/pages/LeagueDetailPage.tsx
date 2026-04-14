import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLeagueById } from '../api/leagues'
import { getTeams } from '../api/teams'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { isApiErr, type LeagueMeta, type TeamRow } from '../types/api'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

const PAGE_SIZE = 50

export function LeagueDetailPage() {
  const { leagueId } = useParams<{ leagueId: string }>()
  const [league, setLeague] = useState<LeagueMeta | null>(null)
  const [teams, setTeams] = useState<TeamRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!leagueId) {
      setLeague(null)
      setTeams([])
      setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const L = await getLeagueById(leagueId)
        if (cancelled) return
        setLeague(L)
        const teamsRes = await getTeams({
          leagueId: L.leagueId,
          page: 1,
          pageSize: PAGE_SIZE,
          sort: 'name_asc',
        })
        if (!cancelled) setTeams(teamsRes.items)
      } catch (e) {
        if (!cancelled) {
          if (isApiErr(e) && e.status === 404) {
            setLeague(null)
            setTeams([])
            setError(null)
          } else {
            setError(isApiErr(e) ? e.message : 'Could not load league')
            setLeague(null)
            setTeams([])
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [leagueId])

  if (loading) {
    return <p className="text-fume-600 dark:text-fume-400">Loading…</p>
  }

  if (error) {
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
        <p className="mt-1 text-xs text-fume-500 dark:text-fume-400">
          Showing up to {PAGE_SIZE} teams from the API.
        </p>
        <ul className={`mt-3 ${listSurface}`}>
          {teams.map((team) => (
            <li key={team.id}>
              <Link
                to={`/teams/${team.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
              >
                <span className="font-medium">{team.name}</span>
                <span className="text-sm text-gold-700 dark:text-gold-500">
                  View roster →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {teams.length === 0 ? (
          <p className="mt-3 text-sm text-fume-500 dark:text-fume-400">
            No teams returned for this league.
          </p>
        ) : null}
      </div>
    </div>
  )
}
