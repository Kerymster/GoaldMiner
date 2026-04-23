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
          description="This link is incomplete. Open the draft from your draft list."
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
          description={error ?? 'This draft could not be loaded.'}
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
          description="This draft could not be found. Return to the draft list and try again."
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
        description="Edit section by section, save as you go, and publish when the report is finished."
      />
      <DraftReportForm initialDraft={draft} />
    </div>
  )
}
