import { useEffect, useLayoutEffect, useState } from 'react'
import { getPlayers } from '../api/players'
import {
  isApiErr,
  type PaginatedResponse,
  type Player,
  type PlayersSort,
} from '../types/api'

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 350

export function usePlayersList() {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [countryId, setCountryId] = useState('')
  const [sort, setSort] = useState<PlayersSort>('underratedScore_desc')
  const [data, setData] = useState<PaginatedResponse<Player> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQ(q.trim())
    }, SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(id)
  }, [q])

  useLayoutEffect(() => {
    setPage(1)
  }, [debouncedQ, countryId, sort])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getPlayers({
          page,
          pageSize: PAGE_SIZE,
          q: debouncedQ || undefined,
          countryId: countryId || undefined,
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
  }, [page, debouncedQ, countryId, sort])

  return {
    page,
    setPage,
    q,
    setQ,
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
