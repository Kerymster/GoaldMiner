import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../../components/styles/pageChromeStyles'
import type { PlayingStyleRecord } from '../../../../types/playingStyle'
import { useActivePlayingStyle } from '../../../../hooks/usePlayingStyleWizard'
import { PlayingStyleForm } from '../PlayingStyleForm'

const BREADCRUMB = [
  { label: 'Sportive Strategy', to: '/sportive-strategy/playing-style' },
  { label: 'Create playing style' as const },
]

export function CreatePlayingStylePage() {
  const navigate = useNavigate()
  const { record: active, loading, error } = useActivePlayingStyle()

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title="Create playing style"
        description="Capture the club’s on-pitch identity and tactical operating system."
      />
      {loading ? <p className={proseMutedSm}>Checking active playing style…</p> : null}
      {error ? <p className={proseErrorSm}>{error}</p> : null}
      {!loading ? (
        <PlayingStyleForm
          mode="create"
          hasActiveRecord={Boolean(active)}
          onSaved={(saved: PlayingStyleRecord) =>
            navigate(`/sportive-strategy/playing-style/edit?id=${encodeURIComponent(saved.id)}`)
          }
        />
      ) : null}
    </div>
  )
}
