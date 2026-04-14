import { useEffect, useState } from 'react'
import { getPlayers } from '../api/players'
import { getTeamById } from '../api/teams'
import {
  isApiErr,
  type PaginatedResponse,
  type Player,
  type TeamRow,
} from '../types/api'

const ROSTER_PAGE_SIZE = 10

export function useTeamDetail(teamId: string | undefined) {
  const [team, setTeam] = useState<TeamRow | null>(null)
  const [rosterPage, setRosterPage] = useState(1)
  const [rosterRes, setRosterRes] = useState<PaginatedResponse<Player> | null>(
    null,
  )
  const [teamLoading, setTeamLoading] = useState(true)
  const [rosterLoading, setRosterLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const roster = rosterRes?.items ?? []

  return {
    team,
    teamLoading,
    rosterRes,
    roster,
    rosterPage,
    setRosterPage,
    rosterLoading,
    error,
  }
}
