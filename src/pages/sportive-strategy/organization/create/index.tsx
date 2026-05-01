import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../../components/styles/pageChromeStyles'
import { useActiveOrganization } from '../../../../hooks/useActiveOrganization'
import type { OrganizationRecord } from '../../../../types/organization'
import { OrganizationForm } from '../OrganizationForm'

const BREADCRUMB = [
  { label: 'Sportive Strategy', to: '/sportive-strategy/organization' },
  { label: 'Create organization' as const },
]

export function CreateOrganizationPage() {
  const navigate = useNavigate()
  const { record: active, loading, error } = useActiveOrganization()

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Create organization blueprint"
        description="Capture how your club governs sport, runs departments, and interfaces with the rest of the business."
      />
      {loading ? <p className={proseMutedSm}>Checking active organization blueprint…</p> : null}
      {error ? <p className={proseErrorSm}>{error}</p> : null}
      {!loading ? (
        <OrganizationForm
          mode="create"
          hasActiveRecord={Boolean(active)}
          onSaved={(saved: OrganizationRecord) =>
            navigate(`/sportive-strategy/organization/edit?id=${encodeURIComponent(saved.id)}`)
          }
        />
      ) : null}
    </div>
  )
}
