import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadScoutReportsForPlayer } from '../../../../features/scoutReports/scoutReportsSlice'
import {
  selectScoutReportRow,
  selectScoutReportsForPlayer,
} from '../../../../features/scoutReports/scoutReportsSelectors'
import type { BreadcrumbItem } from '../../../../components/Breadcrumbs'
import { PageHeader } from '../../../../components/PageHeader'
import { pageInlineLinkGold, pageStack } from '../../../../components/pageChromeStyles'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { CreateReportForm } from '../../create/CreateReportForm'

const EDIT_FLOW_CRUMB_PREFIX: [BreadcrumbItem, BreadcrumbItem] = [
  { label: 'Player Reports', to: '/player-reports' },
  { label: 'Edit reports', to: '/player-reports/edit' },
]

function editFlowBreadcrumbs(lastLabel: string): BreadcrumbItem[] {
  return [...EDIT_FLOW_CRUMB_PREFIX, { label: lastLabel }]
}

function BackToEditReportsLink() {
  return (
    <Link to="/player-reports/edit" className={pageInlineLinkGold}>
      ← Back to edit reports
    </Link>
  )
}

type EditFlowHeaderProps = {
  breadcrumbLast: string
  title: string
  description: string
}

function EditFlowPageHeader({ breadcrumbLast, title, description }: EditFlowHeaderProps) {
  return (
    <PageHeader
      breadcrumbItems={editFlowBreadcrumbs(breadcrumbLast)}
      title={title}
      description={description}
    />
  )
}

export function ScoutReportEditPage() {
  const { playerId: playerIdParam, reportId } = useParams<{
    playerId: string
    reportId: string
  }>()
  const playerId = playerIdParam ?? undefined

  const dispatch = useAppDispatch()
  const bundle = useAppSelector((s) => selectScoutReportsForPlayer(s, playerId))
  const record = useAppSelector((s) => selectScoutReportRow(s, playerId, reportId))

  useEffect(() => {
    if (!playerId || !reportId) return
    if (bundle.items.some((r) => r.id === reportId)) return
    if (bundle.status === 'loading' || bundle.status === 'failed' || bundle.status === 'succeeded') {
      return
    }
    void dispatch(loadScoutReportsForPlayer(playerId))
  }, [dispatch, playerId, reportId, bundle.items, bundle.status])

  const awaitingData =
    !record &&
    bundle.status !== 'failed' &&
    (bundle.status === 'loading' || bundle.status === 'idle')

  if (!playerId || !reportId) {
    return (
      <div className={pageStack}>
        <EditFlowPageHeader
          breadcrumbLast="Edit"
          title="Report not found"
          description="Missing player or report in the URL."
        />
        <BackToEditReportsLink />
      </div>
    )
  }

  if (awaitingData) {
    return (
      <div className={pageStack}>
        <EditFlowPageHeader
          breadcrumbLast="Edit"
          title="Edit scout report"
          description="Loading…"
        />
      </div>
    )
  }

  if (bundle.status === 'failed') {
    return (
      <div className={pageStack}>
        <EditFlowPageHeader
          breadcrumbLast="Edit"
          title="Could not load reports"
          description={bundle.error ?? 'Unknown error'}
        />
        <BackToEditReportsLink />
      </div>
    )
  }

  if (!record) {
    return (
      <div className={pageStack}>
        <EditFlowPageHeader
          breadcrumbLast="Edit"
          title="Report not found"
          description="No report with this id for this player. Open it from the edit list or check the link."
        />
        <BackToEditReportsLink />
      </div>
    )
  }

  return (
    <div className={pageStack}>
      <EditFlowPageHeader
        breadcrumbLast="Edit report"
        title="Edit scout report"
        description="Update the same step-by-step template; changes are saved to the existing report."
      />
      <CreateReportForm
        key={record.id}
        mode="edit"
        initialForm={record.form}
        reportId={record.id}
        playerId={playerId}
      />
    </div>
  )
}
