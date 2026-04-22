import { pageStack } from '../../../components/styles/pageChromeStyles'
import { DraftReportsList } from '../DraftReportsList'

const TITLE = 'View draft reports'
const DESCRIPTION =
  'See every in-progress draft in one list. Drafts are isolated from players and published reports until you publish.'

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
