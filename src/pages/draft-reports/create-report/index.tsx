import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack } from '../../../components/styles/pageChromeStyles'
import { DraftReportForm } from '../DraftReportForm'

const BREADCRUMB = [
  { label: 'Draft Reports', to: '/draft-reports' },
  { label: 'Create draft' as const },
]
const TITLE = 'Create draft report'
const DESCRIPTION =
  'Start a scout report draft, save it at any point, and publish only when every section is complete.'

export function CreateDraftReportPage() {
  return (
    <div className={pageStack}>
      <PageHeader breadcrumbItems={BREADCRUMB} title={TITLE} description={DESCRIPTION} />
      <DraftReportForm />
    </div>
  )
}
