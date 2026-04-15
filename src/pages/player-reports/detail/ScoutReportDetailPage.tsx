import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/PageHeader'
import { getMockReportById } from '../../../mocks/scoutReportsMock'
import { DetailReportHero } from './DetailReportHero'
import { ScoutReportDetailBody } from './ScoutReportDetailBody'

export function ScoutReportDetailPage() {
  const { reportId } = useParams<{ reportId: string }>()
  const record = reportId ? getMockReportById(reportId) : undefined

  if (!record) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={[
            { label: 'Player Reports', to: '/player-reports' },
            { label: 'Report' },
          ]}
          title="Report not found"
          description="This ID is not in the mock dataset."
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
      <DetailReportHero reportId={record.id} form={record.form} />
      <ScoutReportDetailBody form={record.form} />
    </div>
  )
}
