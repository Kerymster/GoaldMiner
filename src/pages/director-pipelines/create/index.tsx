import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getActiveDirectorPipeline } from '../../../api/directorPipelines'
import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../components/styles/pageChromeStyles'
import type { DirectorPipeline } from '../../../types/directorPipeline'
import { DirectorPipelineForm } from '../DirectorPipelineForm'

const BREADCRUMB = [
  { label: 'Club Vision Strategy', to: '/director-pipelines' },
  { label: 'Create vision' as const },
]

export function CreateDirectorPipelinePage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [hasActive, setHasActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const active = await getActiveDirectorPipeline()
        if (cancelled) return
        setHasActive(Boolean(active))
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Active pipeline state could not be checked.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Create club vision pipeline"
        description="Capture the club's direction for this period."
      />
      {status === 'loading' ? <p className={proseMutedSm}>Checking active pipeline status…</p> : null}
      {status === 'error' ? <p className={proseErrorSm}>{error}</p> : null}
      {status === 'ready' ? (
        <DirectorPipelineForm
          mode="create"
          hasActivePipeline={hasActive}
          onSaved={(pipeline: DirectorPipeline) => navigate(`/director-pipelines/edit?id=${pipeline.id}`)}
        />
      ) : null}
    </div>
  )
}
