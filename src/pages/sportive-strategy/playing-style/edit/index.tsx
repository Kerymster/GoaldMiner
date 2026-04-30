import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActivePlayingStyle, getPlayingStyle } from '../../../../api/playingStyle'
import { EmptyState } from '../../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../../components/styles/pageChromeStyles'
import type { PlayingStyleRecord } from '../../../../types/playingStyle'
import { PlayingStyleForm } from '../PlayingStyleForm'

const BREADCRUMB = [
  { label: 'Sportive Strategy', to: '/sportive-strategy/playing-style' },
  { label: 'Edit playing style' as const },
]

export function EditPlayingStylePage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [record, setRecord] = useState<PlayingStyleRecord | null>(null)

  useEffect(() => {
    const id = searchParams.get('id')
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const data = id ? await getPlayingStyle(id) : await getActivePlayingStyle()
        if (cancelled) return
        setRecord(data)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Playing style could not be loaded.')
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
        title="Edit playing style"
        description="Update the saved blueprint and wizard progress for this record."
      />
      {status === 'loading' ? <p className={proseMutedSm}>Loading playing style…</p> : null}
      {status === 'error' ? <p className={proseErrorSm}>{error}</p> : null}
      {status === 'ready' && !record ? (
        <EmptyState
          title="No active playing style"
          description="There is no active playing style to edit right now."
          helper="Create one first or open an archived record from View playing styles."
          icon="fileCheck"
        />
      ) : null}
      {status === 'ready' && record ? (
        <PlayingStyleForm
          key={`${record.id}-${record.updatedAt}`}
          mode="edit"
          initialRecord={record}
          onSaved={setRecord}
        />
      ) : null}
    </div>
  )
}
