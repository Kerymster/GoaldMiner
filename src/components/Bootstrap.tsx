import { useEffect, type ReactNode } from 'react'
import { loadNationalities } from '../features/nationalities/nationalitiesSlice'
import { useAppDispatch } from '../store/hooks'

export function Bootstrap({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(loadNationalities())
  }, [dispatch])

  return <>{children}</>
}
