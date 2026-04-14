import { useEffect, type ReactNode } from 'react'
import { loadLeagues } from '../features/leagues/leaguesSlice'
import { useAppDispatch } from '../store/hooks'

export function Bootstrap({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(loadLeagues())
  }, [dispatch])

  return <>{children}</>
}
