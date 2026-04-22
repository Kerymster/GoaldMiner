import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack } from '../../../components/styles/pageChromeStyles'
import { PlayerForm } from '../form/PlayerForm'

const BREADCRUMB = [{ label: 'Players', to: '/players' }, { label: 'Add player' as const }]

export function NewPlayerPage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Add player"
        description="Create a player profile without needing a scout report first."
      />
      <PlayerForm mode="create" />
    </div>
  )
}

