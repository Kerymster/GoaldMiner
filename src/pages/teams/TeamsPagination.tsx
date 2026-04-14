import type { Dispatch, SetStateAction } from 'react'
import type { PaginatedTeamsResponse } from '../../types/api'

type TeamsPaginationProps = {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  data: PaginatedTeamsResponse | null
  /** When true, disables prev/next (e.g. league detail teams refetch). */
  loading?: boolean
  className?: string
}

export function TeamsPagination({
  page,
  setPage,
  data,
  loading = false,
  className = '',
}: TeamsPaginationProps) {
  if (!data || data.totalPages <= 1) return null

  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-sm ${className}`.trim()}
    >
      <button
        type="button"
        disabled={page <= 1 || loading}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-fume-700"
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
        className="rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-fume-700"
      >
        Next
      </button>
    </div>
  )
}
