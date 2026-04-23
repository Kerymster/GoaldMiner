import type { RootState } from '../../store/store'
import type { StoredScoutReportDraft } from '../../api/scoutReportDrafts'

const EMPTY_ITEMS: StoredScoutReportDraft[] = []

export function selectDraftReportsListBundle(state: RootState): {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  items: StoredScoutReportDraft[]
} {
  const feature = state.draftReports
  const items = feature.listIds
    .map((id) => feature.byId[id])
    .filter((item): item is StoredScoutReportDraft => item != null)
  return {
    status: feature.listStatus,
    error: feature.listError,
    items: items.length > 0 ? items : EMPTY_ITEMS,
  }
}

export function selectDraftReportBundle(
  state: RootState,
  draftId: string | undefined,
): {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  item: StoredScoutReportDraft | null
} {
  if (!draftId) {
    return {
      status: 'failed',
      error: 'This draft could not be opened.',
      item: null,
    }
  }
  const detail = state.draftReports.byDraftId[draftId] ?? { status: 'idle' as const, error: null }
  return {
    status: detail.status,
    error: detail.error,
    item: state.draftReports.byId[draftId] ?? null,
  }
}
