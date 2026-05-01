import { useCallback, useEffect, useState } from 'react'
import { getActivePlayingStyle } from '../api/playingStyle'
import type { PlayingStyleRecord } from '../types/playingStyle'

/**
 * Loads the active playing style record once (create flow gate, dashboards).
 * Mirrors the “check active pipeline” pattern used in Club Vision.
 */
export function useActivePlayingStyle() {
  const [record, setRecord] = useState<PlayingStyleRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const active = await getActivePlayingStyle()
      setRecord(active)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Active playing style could not be checked.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { record, loading, error, refetch }
}
