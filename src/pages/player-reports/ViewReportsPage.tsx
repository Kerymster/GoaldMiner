import { PageHeader } from '../../components/PageHeader'

const BREADCRUMB = [{ label: 'Player Reports' as const }]
const TITLE = 'View reports'
const DESCRIPTION = 'Browse saved player reports.'

export function ViewReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title={TITLE}
        description={DESCRIPTION}
      />
    </div>
  )
}
