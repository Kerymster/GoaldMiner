import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadScoutReportsForPlayer } from '../../../../features/scoutReports/scoutReportsSlice'
import {
  selectScoutReportRow,
  selectScoutReportsForPlayer,
} from '../../../../features/scoutReports/scoutReportsSelectors'
import type { BreadcrumbItem } from '../../../../components/breadcrumbs/Breadcrumbs'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageInlineLinkGold, pageStack } from '../../../../components/styles/pageChromeStyles'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { DetailReportHero } from '../DetailReportHero'
import { ScoutReportDetailBody } from '../ScoutReportDetailBody'

const REPORT_DETAIL_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Player Reports', to: '/player-reports' },
  { label: 'Report' },
]

function BackToReportsLink() {
  return (
    <Link to="/player-reports" className={pageInlineLinkGold}>
      ← Back to reports
    </Link>
  )
}

type ReportDetailStateShellProps = {
  title: string
  description: string
  backLink?: boolean
}

function ReportDetailStateShell({ title, description, backLink }: ReportDetailStateShellProps) {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={REPORT_DETAIL_BREADCRUMBS}
        title={title}
        description={description}
      />
      {backLink ? <BackToReportsLink /> : null}
    </div>
  )
}

export function ScoutReportDetailPage() {
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
      <ReportDetailStateShell
        title="Report not found"
        description="This link is incomplete. Open the report from the view or edit reports list."
        backLink
      />
    )
  }

  if (awaitingData) {
    return (
      <ReportDetailStateShell title="Scout report" description="Loading…" />
    )
  }

  if (bundle.status === 'failed') {
    return (
      <ReportDetailStateShell
        title="Could not load reports"
        description={bundle.error ?? 'Unknown error'}
        backLink
      />
    )
  }

  if (!record) {
    return (
      <ReportDetailStateShell
        title="Report not found"
        description="This report could not be opened. Go back to the report list and try again."
        backLink
      />
    )
  }

  return (
    <div className={pageStack}>
      <DetailReportHero playerId={playerId} reportId={record.id} form={record.form} />
      <ScoutReportDetailBody form={record.form} playerId={playerId} reportId={record.id} />
    </div>
  )
}

