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
const NUMERIC_DEBOUNCE_MS = 400

const EMPTY_NUMERIC_KEY = JSON.stringify(['', '', '', ''] as const)

function optQueryNumber(s: string): number | undefined {
  const t = s.trim()
  if (!t) return undefined
  const n = Number(t)
  return Number.isFinite(n) ? n : undefined
}

export function usePlayersList() {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [sort, setSort] = useState<PlayersSort>('underratedScore_desc')

  const [minRating, setMinRating] = useState('')
  const [maxRating, setMaxRating] = useState('')
  const [minUnderrated, setMinUnderrated] = useState('')
  const [maxUnderrated, setMaxUnderrated] = useState('')
  const [debouncedNumericKey, setDebouncedNumericKey] = useState(EMPTY_NUMERIC_KEY)

  const [data, setData] = useState<PaginatedResponse<Player> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQ(q.trim())
    }, SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(id)
  }, [q])

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedNumericKey(
        JSON.stringify([
          minRating.trim(),
          maxRating.trim(),
          minUnderrated.trim(),
          maxUnderrated.trim(),
        ]),
      )
    }, NUMERIC_DEBOUNCE_MS)
    return () => window.clearTimeout(id)
  }, [minRating, maxRating, minUnderrated, maxUnderrated])

  const [dr, mr, minU, maxU] = JSON.parse(debouncedNumericKey) as [
    string,
    string,
    string,
    string,
  ]

  useLayoutEffect(() => {
    setPage(1)
  }, [debouncedQ, sort, debouncedNumericKey])

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
          minRating: optQueryNumber(dr),
          maxRating: optQueryNumber(mr),
          minUnderrated: optQueryNumber(minU),
          maxUnderrated: optQueryNumber(maxU),
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
  }, [page, debouncedQ, sort, dr, mr, minU, maxU])

  return {
    page,
    setPage,
    q,
    setQ,
    sort,
    setSort,
    minRating,
    setMinRating,
    maxRating,
    setMaxRating,
    minUnderrated,
    setMinUnderrated,
    maxUnderrated,
    setMaxUnderrated,
    data,
    loading,
    error,
    items: data?.items ?? [],
  }
}
