import type { Dispatch, SetStateAction } from 'react'
import { ListPagination } from '../../components/ListPagination'
import type { PaginatedTeamsResponse } from '../../types/api'

type TeamsPaginationProps = {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  data: PaginatedTeamsResponse | null
  loading?: boolean
  className?: string
}

export function TeamsPagination({
  page,
  setPage,
  data,
  loading,
  className,
}: TeamsPaginationProps) {
  return (
    <ListPagination
      page={page}
      setPage={setPage}
      data={data}
      loading={loading}
      className={className}
    />
  )
}
