import { useEffect, useState } from 'react'
import { getTeams } from '../api/teams'
import { isApiErr, type PaginatedTeamsResponse, type TeamsSort } from '../types/api'

const PAGE_SIZE = 10

export function useTeamsList() {
  const [page, setPage] = useState(1)
  const [leagueId, setLeagueId] = useState('')
  const [countryId, setCountryId] = useState('')
  const [sort, setSort] = useState<TeamsSort>('name_asc')
  const [data, setData] = useState<PaginatedTeamsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getTeams({
          page,
          pageSize: PAGE_SIZE,
          leagueId: leagueId || undefined,
          countryId: countryId || undefined,
          sort,
        })
        if (!cancelled) setData(res)
      } catch (e) {
        if (!cancelled) {
          setError(isApiErr(e) ? e.message : 'Could not load teams')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [page, leagueId, countryId, sort])

  return {
    page,
    setPage,
    leagueId,
    setLeagueId,
    countryId,
    setCountryId,
    sort,
    setSort,
    data,
    loading,
    error,
    items: data?.items ?? [],
  }
}
