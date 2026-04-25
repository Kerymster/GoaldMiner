import { EmptyState } from '../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack } from '../../../components/styles/pageChromeStyles'

const BREADCRUMB = [{ label: 'Sportive Strategy' as const }, { label: 'Recruitment' as const }]

export function RecruitmentPage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Recruitment"
        description="Shape recruitment strategy, target profiles, and market priorities."
      />
      <EmptyState
        title="Recruitment module is ready"
        description="This page is currently empty."
        helper="Next step: add scouting lanes, criteria, and decision checkpoints."
        icon="circleHelp"
      />
    </div>
  )
}
