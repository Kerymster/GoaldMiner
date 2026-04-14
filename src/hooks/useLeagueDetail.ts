import { useEffect, useState } from 'react'
import { getLeagueById } from '../api/leagues'
import { getTeams } from '../api/teams'
import {
  isApiErr,
  type LeagueMeta,
  type PaginatedTeamsResponse,
  type TeamRow,
} from '../types/api'

const TEAMS_PAGE_SIZE = 10

export function useLeagueDetail(leagueId: string | undefined) {
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
          pageSize: TEAMS_PAGE_SIZE,
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

  const teams: TeamRow[] = teamsRes?.items ?? []

  return {
    league,
    leagueLoading,
    teamsRes,
    teams,
    teamsPage,
    setTeamsPage,
    teamsLoading,
    error,
  }
}
