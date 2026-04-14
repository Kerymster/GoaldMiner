import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPlayers } from '../api/players'
import { getTeamById } from '../api/teams'
import { Breadcrumbs } from '../components/Breadcrumbs'
import {
  isApiErr,
  type PaginatedResponse,
  type Player,
  type TeamRow,
} from '../types/api'
import { useAppSelector } from '../store/hooks'
import { selectLeagueMetaById } from '../store/selectors/leaguesSelectors'

const cardSurface =
  'rounded-2xl border border-fume-200/90 bg-white p-6 shadow-sm shadow-fume-950/5 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

const ROSTER_PAGE_SIZE = 10

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>()
  const [team, setTeam] = useState<TeamRow | null>(null)
  const [rosterPage, setRosterPage] = useState(1)
  const [rosterRes, setRosterRes] = useState<PaginatedResponse<Player> | null>(
    null,
  )
  const [teamLoading, setTeamLoading] = useState(true)
  const [rosterLoading, setRosterLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const leagueMeta = useAppSelector((s) => selectLeagueMetaById(s, team?.leagueId))

  useEffect(() => {
    if (!teamId) {
      setTeam(null)
      setRosterRes(null)
      setRosterPage(1)
      setTeamLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setTeamLoading(true)
      setError(null)
      try {
        const t = await getTeamById(teamId)
        if (!cancelled) {
          setTeam(t)
          setRosterPage(1)
        }
      } catch (e) {
        if (!cancelled) {
          if (isApiErr(e) && e.status === 404) {
            setTeam(null)
            setError(null)
          } else {
            setError(isApiErr(e) ? e.message : 'Could not load team')
            setTeam(null)
          }
          setRosterRes(null)
        }
      } finally {
        if (!cancelled) setTeamLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [teamId])

  useEffect(() => {
    if (!team) {
      setRosterRes(null)
      return
    }
    let cancelled = false
    ;(async () => {
      setRosterLoading(true)
      setError(null)
      try {
        const res = await getPlayers({
          teamId: team.id,
          page: rosterPage,
          pageSize: ROSTER_PAGE_SIZE,
          sort: 'name_asc',
        })
        if (!cancelled) setRosterRes(res)
      } catch (e) {
        if (!cancelled) {
          setRosterRes(null)
          setError(isApiErr(e) ? e.message : 'Could not load roster')
        }
      } finally {
        if (!cancelled) setRosterLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [team, rosterPage])

  if (teamLoading) {
    return <p className="text-fume-600 dark:text-fume-400">Loading…</p>
  }

  if (error && !team) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Link
          to="/teams"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
        >
          All teams
        </Link>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="space-y-4">
        <p className="text-fume-600 dark:text-fume-400">Team not found.</p>
        <Link
          to="/teams"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
        >
          All teams
        </Link>
      </div>
    )
  }

  const leagueName = leagueMeta?.name ?? team.leagueId
  const roster = rosterRes?.items ?? []

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
      <div className={cardSurface}>
        <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
          {leagueMeta?.countryName ?? team.countryId}
          {leagueName ? ` · ${leagueName}` : ''}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          {team.name}
        </h2>
        {team.note ? (
          <p className="mt-2 text-sm text-fume-600 dark:text-fume-400">
            {team.note}
          </p>
        ) : null}
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          {rosterRes
            ? `${rosterRes.total} players · showing page ${rosterRes.page} of ${rosterRes.totalPages}`
            : rosterLoading
              ? 'Loading roster…'
              : null}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-fume-900 dark:text-fume-100">
          Roster
        </h3>
        {error && team ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}
        <ul className={`mt-3 ${listSurface}`}>
          {roster.map((player) => (
            <li key={player.id}>
              <Link
                to={`/players/${player.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{player.name}</p>
                  <p className="truncate text-sm text-fume-500 dark:text-fume-400">
                    {player.position}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold tabular-nums text-gold-700 dark:text-gold-400">
                    {player.underratedScore ?? '—'}
                  </p>
                  <p className="text-xs text-fume-500 dark:text-fume-400">
                    underrated
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {rosterRes && roster.length === 0 ? (
          <p className="mt-3 text-sm text-fume-500 dark:text-fume-400">
            No players returned for this team.
          </p>
        ) : null}
        {rosterRes && rosterRes.totalPages > 1 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              disabled={rosterPage <= 1 || rosterLoading}
              onClick={() => setRosterPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-fume-700"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={
                rosterPage >= rosterRes.totalPages || rosterLoading
              }
              onClick={() =>
                setRosterPage((p) => Math.min(rosterRes.totalPages, p + 1))
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
