import type { Dispatch, SetStateAction } from 'react'
import type { PaginatedResponse } from '../types/api'
import {
  paginationBarClass,
  paginationNavButtonClass,
  proseMuted,
} from './pageChromeStyles'

type ListPaginationProps<T = unknown> = {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  data: PaginatedResponse<T> | null
  loading?: boolean
  className?: string
}

/** Shared prev/next for any paginated list (players, teams, etc.). */
export function ListPagination<T>({
  page,
  setPage,
  data,
  loading = false,
  className = '',
}: ListPaginationProps<T>) {
  if (!data || data.totalPages <= 1) return null

  return (
    <div className={`${paginationBarClass} ${className}`.trim()}>
      <button
        type="button"
        disabled={page <= 1 || loading}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className={paginationNavButtonClass}
      >
        Previous
      </button>
      <span className={proseMuted}>
        Page {data.page} of {data.totalPages} ({data.total} total)
      </span>
      <button
        type="button"
        disabled={page >= data.totalPages || loading}
        onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
        className={paginationNavButtonClass}
      >
        Next
      </button>
    </div>
  )
}
