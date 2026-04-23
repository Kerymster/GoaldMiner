import { pageStack } from '../../../components/styles/pageChromeStyles'
import { DraftReportsList } from '../DraftReportsList'

const TITLE = 'View draft reports'
const DESCRIPTION = 'All in-progress drafts in one place until you publish them.'

export function ViewDraftReportsPage() {
  return (
    <div className={pageStack}>
      <DraftReportsList
        breadcrumbLabel="Draft Reports"
        title={TITLE}
        description={DESCRIPTION}
        rowActionLabel="Open draft"
      />
    </div>
  )
}
