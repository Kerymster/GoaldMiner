import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack } from '../../../components/styles/pageChromeStyles'
import { DirectorPipelinesList } from '../DirectorPipelinesList'

const BREADCRUMB = [{ label: 'Club Vision Strategy' as const }]

export function ViewDirectorPipelinesPage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="View pipelines"
        description="Manage active and archived club vision pipelines by season and status."
      />
      <DirectorPipelinesList />
    </div>
  )
}
