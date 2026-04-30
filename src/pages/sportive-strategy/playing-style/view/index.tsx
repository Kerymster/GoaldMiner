import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack } from '../../../../components/styles/pageChromeStyles'
import { PlayingStylesList } from '../PlayingStylesList'

const BREADCRUMB = [{ label: 'Sportive Strategy' as const }, { label: 'Playing Style' as const }]

export function ViewPlayingStylesPage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="View playing styles"
        description="Open, edit, or archive playing style blueprints. Only one record can be active at a time."
      />
      <PlayingStylesList />
    </div>
  )
}
