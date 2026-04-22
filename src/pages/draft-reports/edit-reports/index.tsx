import { pageStack } from '../../../components/styles/pageChromeStyles'
import { DraftReportsList } from '../DraftReportsList'

const TITLE = 'Edit draft reports'
const DESCRIPTION =
  'Continue working on saved drafts, update sections freely, and publish when the report is ready.'

export function EditDraftReportsPage() {
  return (
    <div className={pageStack}>
      <DraftReportsList
        breadcrumbLabel="Draft Reports"
        title={TITLE}
        description={DESCRIPTION}
        rowActionLabel="Edit draft"
      />
    </div>
  )
}
