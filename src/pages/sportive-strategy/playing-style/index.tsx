import { EmptyState } from '../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack } from '../../../components/styles/pageChromeStyles'

const BREADCRUMB = [{ label: 'Sportive Strategy' as const }, { label: 'Playing Style' as const }]

export function PlayingStylePage() {
  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Playing Style"
        description="Define game model principles and tactical identity."
      />
      <EmptyState
        title="Playing Style module is ready"
        description="This page is currently empty."
        helper="Next step: add your framework, principles, and role profiles."
        icon="circleHelp"
      />
    </div>
  )
}
