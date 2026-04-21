import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/PageHeader'
import { pageStack, proseErrorSm, proseMuted } from '../../../components/pageChromeStyles'
import { usePlayerDetail } from '../../../hooks/usePlayerDetail'
import { PlayerForm } from '../form/PlayerForm'

export function EditPlayerPage() {
  const { id } = useParams<{ id: string }>()
  const { player, loading, error } = usePlayerDetail(id)

  if (loading) {
    return <p className={proseMuted}>Loading…</p>
  }

  if (error) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={[{ label: 'Players', to: '/players' }, { label: 'Edit player' }]}
          title="Could not load player"
          description={error}
        />
        <p className={proseErrorSm}>{error}</p>
      </div>
    )
  }

  if (!player) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={[{ label: 'Players', to: '/players' }, { label: 'Edit player' }]}
          title="Player not found"
          description="This player could not be loaded for editing."
        />
      </div>
    )
  }

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={[
          { label: 'Players', to: '/players' },
          { label: player.name, to: `/players/${player.id}` },
          { label: 'Edit player' },
        ]}
        title="Edit player"
        description="Update the current player profile fields."
      />
      <PlayerForm mode="edit" initialPlayer={player} />
    </div>
  )
}
