import { useEffect, useState } from 'react'
import { getPlayers } from '../api/players'
import {
  isApiErr,
  type PaginatedResponse,
  type Player,
  type PlayersSort,
} from '../types/api'

const PAGE_SIZE = 10

export function usePlayersList() {
  const [page, setPage] = useState(1)
  const [leagueId, setLeagueId] = useState('')
  const [sort, setSort] = useState<PlayersSort>('underratedScore_desc')
  const [data, setData] = useState<PaginatedResponse<Player> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getPlayers({
          page,
          pageSize: PAGE_SIZE,
          leagueId: leagueId || undefined,
          sort,
        })
        if (!cancelled) setData(res)
      } catch (e) {
        if (!cancelled) {
          setError(isApiErr(e) ? e.message : 'Could not load players')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [page, leagueId, sort])

  return {
    page,
    setPage,
    leagueId,
    setLeagueId,
    sort,
    setSort,
    data,
    loading,
    error,
    items: data?.items ?? [],
  }
}
