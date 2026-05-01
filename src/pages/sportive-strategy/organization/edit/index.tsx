import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActiveOrganization, getOrganization } from '../../../../api/organization'
import { EmptyState } from '../../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../../components/styles/pageChromeStyles'
import type { OrganizationRecord } from '../../../../types/organization'
import { OrganizationForm } from '../OrganizationForm'

const BREADCRUMB = [
  { label: 'Sportive Strategy', to: '/sportive-strategy/organization' },
  { label: 'Edit organization' as const },
]

export function EditOrganizationPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [record, setRecord] = useState<OrganizationRecord | null>(null)

  useEffect(() => {
    const id = searchParams.get('id')
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const data = id ? await getOrganization(id) : await getActiveOrganization()
        if (cancelled) return
        setRecord(data)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Organization blueprint could not be loaded.')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [searchParams])

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Edit organization blueprint"
        description="Update the saved blueprint and wizard progress for this record."
      />
      {status === 'loading' ? <p className={proseMutedSm}>Loading organization blueprint…</p> : null}
      {status === 'error' ? <p className={proseErrorSm}>{error}</p> : null}
      {status === 'ready' && !record ? (
        <EmptyState
          title="No active organization blueprint"
          description="There is no active blueprint to edit right now."
          helper="Create one first or open an archived record from the organization list."
          icon="fileCheck"
        />
      ) : null}
      {status === 'ready' && record ? (
        <OrganizationForm
          key={`${record.id}-${record.updatedAt}`}
          mode="edit"
          initialRecord={record}
          onSaved={setRecord}
        />
      ) : null}
    </div>
  )
}
