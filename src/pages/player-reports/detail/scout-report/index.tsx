import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadScoutReportsForPlayer } from '../../../../features/scoutReports/scoutReportsSlice'
import {
  selectScoutReportRow,
  selectScoutReportsForPlayer,
} from '../../../../features/scoutReports/scoutReportsSelectors'
import { PageHeader } from '../../../../components/PageHeader'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { DetailReportHero } from '../DetailReportHero'
import { ScoutReportDetailBody } from '../ScoutReportDetailBody'

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
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={[
            { label: 'Player Reports', to: '/player-reports' },
            { label: 'Report' },
          ]}
          title="Report not found"
          description="Missing player or report in the URL."
        />
        <Link
          to="/player-reports"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:underline dark:text-gold-400"
        >
          ← Back to reports
        </Link>
      </div>
    )
  }

  if (awaitingData) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={[
            { label: 'Player Reports', to: '/player-reports' },
            { label: 'Report' },
          ]}
          title="Scout report"
          description="Loading…"
        />
      </div>
    )
  }

  if (bundle.status === 'failed') {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={[
            { label: 'Player Reports', to: '/player-reports' },
            { label: 'Report' },
          ]}
          title="Could not load reports"
          description={bundle.error ?? 'Unknown error'}
        />
        <Link
          to="/player-reports"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:underline dark:text-gold-400"
        >
          ← Back to reports
        </Link>
      </div>
    )
  }

  if (!record) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={[
            { label: 'Player Reports', to: '/player-reports' },
            { label: 'Report' },
          ]}
          title="Report not found"
          description="No report with this id for this player. Open it from the report list or check the link."
        />
        <Link
          to="/player-reports"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:underline dark:text-gold-400"
        >
          ← Back to reports
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DetailReportHero playerId={playerId} reportId={record.id} form={record.form} />
      <ScoutReportDetailBody form={record.form} />
    </div>
  )
}
