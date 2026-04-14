import { useEffect } from 'react'
import {
  setComparePlayerA,
  setComparePlayerB,
} from '../features/compare/compareSlice'
import type { Player } from '../types/api'
import { useAppDispatch } from '../store/hooks'

/**
 * Seeds Redux compare ids from the loaded player pool when empty or invalid.
 */
export function useCompareSelectionSync(
  pool: Player[],
  loading: boolean,
  aId: string,
  bId: string,
) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (pool.length < 2 || loading) return
    if (!aId) dispatch(setComparePlayerA(pool[0].id))
  }, [pool, loading, aId, dispatch])

  useEffect(() => {
    if (pool.length < 2 || loading) return
    const curA = aId || pool[0].id
    if (!bId || bId === curA) {
      const alt = pool.find((p) => p.id !== curA)
      if (alt) dispatch(setComparePlayerB(alt.id))
    }
  }, [pool, loading, aId, bId, dispatch])
}
