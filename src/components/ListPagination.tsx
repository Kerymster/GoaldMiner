import type { Dispatch, SetStateAction } from 'react'
import type { PaginatedResponse } from '../types/api'

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
    <div
      className={`flex flex-wrap items-center gap-2 text-sm ${className}`.trim()}
    >
      <button
        type="button"
        disabled={page <= 1 || loading}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="cursor-pointer rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-fume-700"
      >
        Previous
      </button>
      <span className="text-fume-600 dark:text-fume-400">
        Page {data.page} of {data.totalPages} ({data.total} total)
      </span>
      <button
        type="button"
        disabled={page >= data.totalPages || loading}
        onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
        className="cursor-pointer rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-fume-700"
      >
        Next
      </button>
    </div>
  )
}
