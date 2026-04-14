import { useEffect, useState } from 'react'
import { getPlayers } from '../api/players'
import { isApiErr, type Player } from '../types/api'

export function useComparePlayersPool() {
  const [pool, setPool] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const r = await getPlayers({ page: 1, pageSize: 50, sort: 'name_asc' })
        if (!cancelled) setPool(r.items)
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
  }, [])

  return { pool, loading, error }
}
