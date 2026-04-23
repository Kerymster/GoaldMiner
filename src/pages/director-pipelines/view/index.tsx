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
        description="Open, edit, or archive club vision pipelines."
      />
      <DirectorPipelinesList />
    </div>
  )
}
