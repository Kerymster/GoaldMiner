import { PageHeader } from '../../../components/PageHeader'
import { pageStack } from '../../../components/pageChromeStyles'
import { CreateReportForm } from '../create/CreateReportForm'

const BREADCRUMB = [
  { label: 'Player Reports', to: '/player-reports' },
  { label: 'Create report' as const },
]
const TITLE = 'Create report'
const DESCRIPTION =
  'Pro-level scout template — step through each block. Your answers map 1:1 to the save payload.'

export function CreateReportPage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title={TITLE}
        description={DESCRIPTION}
      />
      <CreateReportForm />
    </div>
  )
}
