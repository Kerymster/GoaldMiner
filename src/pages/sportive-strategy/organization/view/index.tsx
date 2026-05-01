import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack } from '../../../../components/styles/pageChromeStyles'
import { OrganizationsList } from '../OrganizationsList'

const BREADCRUMB = [{ label: 'Sportive Strategy' as const }, { label: 'Organization' as const }]

export function ViewOrganizationsPage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Organization"
        description="Structure sporting governance, operations, pathway, medical, data, and corporate interfaces."
      />
      <OrganizationsList />
    </div>
  )
}
