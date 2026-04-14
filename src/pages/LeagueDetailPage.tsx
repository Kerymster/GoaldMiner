import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLeagueById } from '../api/leagues'
import { getTeams } from '../api/teams'
import { Breadcrumbs } from '../components/Breadcrumbs'
import {
  isApiErr,
  type LeagueMeta,
  type PaginatedTeamsResponse,
  type TeamRow,
} from '../types/api'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

const PAGE_SIZE = 10

export function LeagueDetailPage() {
  const { leagueId } = useParams<{ leagueId: string }>()
  const [league, setLeague] = useState<LeagueMeta | null>(null)
  const [teamsPage, setTeamsPage] = useState(1)
  const [teamsRes, setTeamsRes] = useState<PaginatedTeamsResponse | null>(null)
  const [leagueLoading, setLeagueLoading] = useState(true)
  const [teamsLoading, setTeamsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!leagueId) {
      setLeague(null)
      setTeamsRes(null)
      setTeamsPage(1)
      setLeagueLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setLeagueLoading(true)
      setError(null)
      try {
        const L = await getLeagueById(leagueId)
        if (!cancelled) {
          setLeague(L)
          setTeamsPage(1)
        }
      } catch (e) {
        if (!cancelled) {
          if (isApiErr(e) && e.status === 404) {
            setLeague(null)
            setError(null)
          } else {
            setError(isApiErr(e) ? e.message : 'Could not load league')
            setLeague(null)
          }
          setTeamsRes(null)
        }
      } finally {
        if (!cancelled) setLeagueLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [leagueId])

  useEffect(() => {
    if (!league) {
      setTeamsRes(null)
      return
    }
    let cancelled = false
    ;(async () => {
      setTeamsLoading(true)
      setError(null)
      try {
        const res = await getTeams({
          leagueId: league.leagueId,
          page: teamsPage,
          pageSize: PAGE_SIZE,
          sort: 'name_asc',
        })
        if (!cancelled) setTeamsRes(res)
      } catch (e) {
        if (!cancelled) {
          setTeamsRes(null)
          setError(isApiErr(e) ? e.message : 'Could not load teams')
        }
      } finally {
        if (!cancelled) setTeamsLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [league, teamsPage])

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

  const teams: TeamRow[] = teamsRes?.items ?? []

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
                <span className="font-medium">{team.name}</span>
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
