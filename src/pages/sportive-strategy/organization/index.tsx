import { EmptyState } from '../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack } from '../../../components/styles/pageChromeStyles'

const BREADCRUMB = [{ label: 'Sportive Strategy' as const }, { label: 'Organization' as const }]

export function OrganizationPage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Organization"
        description="Align structure, roles, and responsibilities across sport operations."
      />
      <EmptyState
        title="Organization module is ready"
        description="This page is currently empty."
        helper="Next step: add governance model, workflows, and ownership."
        icon="circleHelp"
      />
    </div>
  )
}
