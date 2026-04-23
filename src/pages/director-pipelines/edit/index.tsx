import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActiveDirectorPipeline, getDirectorPipeline } from '../../../api/directorPipelines'
import { EmptyState } from '../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../components/styles/pageChromeStyles'
import type { DirectorPipeline } from '../../../types/directorPipeline'
import { DirectorPipelineForm } from '../DirectorPipelineForm'

const BREADCRUMB = [
  { label: 'Club Vision Strategy', to: '/director-pipelines' },
  { label: 'Edit pipeline' as const },
]

export function EditDirectorPipelinePage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [pipeline, setPipeline] = useState<DirectorPipeline | null>(null)

  useEffect(() => {
    const id = searchParams.get('id')
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const data = id ? await getDirectorPipeline(id) : await getActiveDirectorPipeline()
        if (cancelled) return
        setPipeline(data)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Pipeline could not be loaded.')
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
        title="Edit pipeline"
        description="Adjust strategy blocks with partial updates while keeping one active pipeline policy."
      />
      {status === 'loading' ? <p className={proseMutedSm}>Loading pipeline…</p> : null}
      {status === 'error' ? <p className={proseErrorSm}>{error}</p> : null}
      {status === 'ready' && !pipeline ? (
        <EmptyState
          title="No active pipeline"
          description="There is no active pipeline to edit right now."
          helper="Create one first or open an archived pipeline from View pipelines."
          icon="fileCheck"
        />
      ) : null}
      {status === 'ready' && pipeline ? (
        <DirectorPipelineForm mode="edit" initialPipeline={pipeline} onSaved={setPipeline} />
      ) : null}
    </div>
  )
}
