import { useEffect, useState } from 'react'
import { getPlayerById } from '../api/players'
import { isApiErr, type Player } from '../types/api'

export function usePlayerDetail(id: string | undefined) {
  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setPlayer(null)
      setLoading(false)
      setError(null)
      return
    }
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const p = await getPlayerById(id)
        if (!cancelled) setPlayer(p)
      } catch (e) {
        if (!cancelled) {
          if (isApiErr(e) && e.status === 404) {
            setPlayer(null)
            setError(null)
          } else {
            setError(isApiErr(e) ? e.message : 'Could not load player')
            setPlayer(null)
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  return { player, loading, error }
}
