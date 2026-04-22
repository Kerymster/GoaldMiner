import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { BreadcrumbItem } from '../../../../components/breadcrumbs/Breadcrumbs'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageInlineLinkGold, pageStack } from '../../../../components/styles/pageChromeStyles'
import { selectDraftReportBundle } from '../../../../features/draftReports/draftReportsSelectors'
import { loadDraftReportById } from '../../../../features/draftReports/draftReportsSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { DraftReportForm } from '../../DraftReportForm'

const BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Draft Reports', to: '/draft-reports' },
  { label: 'Edit drafts', to: '/draft-reports/edit' },
  { label: 'Edit draft' },
]

function BackToDraftsLink() {
  return (
    <Link to="/draft-reports/edit" className={pageInlineLinkGold}>
      ← Back to draft reports
    </Link>
  )
}

export function DraftReportEditPage() {
  const { draftId } = useParams<{ draftId: string }>()
  const dispatch = useAppDispatch()
  const { status, error, item: draft } = useAppSelector((state) =>
    selectDraftReportBundle(state, draftId),
  )

  useEffect(() => {
    if (!draftId) return
    if (status === 'loading') return
    if (draft) return
    void dispatch(loadDraftReportById(draftId))
  }, [dispatch, draft, draftId, status])

  if (!draftId) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMBS}
          title="Draft not found"
          description="Missing draft id in the URL."
        />
        <BackToDraftsLink />
      </div>
    )
  }

  if ((status === 'loading' || status === 'idle') && !draft) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMBS}
          title="Edit draft report"
          description="Loading draft…"
        />
      </div>
    )
  }

  if (status === 'failed' && !draft) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMBS}
          title="Draft not found"
          description={error ?? 'No draft found with this id.'}
        />
        <BackToDraftsLink />
      </div>
    )
  }

  if (!draft) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMBS}
          title="Draft not found"
          description="No draft found with this id."
        />
        <BackToDraftsLink />
      </div>
    )
  }

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMBS}
        title="Edit draft report"
        description="Keep iterating section by section, save whenever you want, and publish when complete."
      />
      <DraftReportForm initialDraft={draft} />
    </div>
  )
}
