import { useMemo } from 'react'
import {
  setComparePlayerA,
  setComparePlayerB,
} from '../../features/compare/compareSlice'
import { useComparePlayersPool } from '../../hooks/useComparePlayersPool'
import { useCompareSelectionSync } from '../../hooks/useCompareSelectionSync'
import { PageHeader } from '../../components/PageHeader'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectComparePlayerAId,
  selectComparePlayerBId,
} from '../../store/selectors/compareSelectors'
import { ComparePlayerSelectors } from './ComparePlayerSelectors'
import { CompareStatsTable } from './CompareStatsTable'

const BREADCRUMB = [{ label: 'Compare' as const }]
const TITLE = 'Compare'
const DESCRIPTION =
  'Pick two players from the first page of results (up to 50).'

export function ComparePage() {
  const dispatch = useAppDispatch()
  const aId = useAppSelector(selectComparePlayerAId)
  const bId = useAppSelector(selectComparePlayerBId)
  const { pool, loading, error } = useComparePlayersPool()

  useCompareSelectionSync(pool, loading, aId, bId)

  const a = useMemo(() => pool.find((p) => p.id === aId), [pool, aId])
  const b = useMemo(() => pool.find((p) => p.id === bId), [pool, bId])

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className="text-fume-600 dark:text-fume-400">Loading…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  if (pool.length < 2) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className="text-fume-600 dark:text-fume-400">
          Need at least two players in the API to compare.
        </p>
      </div>
    )
  }

  if (!a || !b) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className="text-fume-600 dark:text-fume-400">Loading…</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title={TITLE}
        description={DESCRIPTION}
      />
      <ComparePlayerSelectors
        pool={pool}
        playerAId={aId}
        playerBId={bId}
        onPlayerAChange={(id) => dispatch(setComparePlayerA(id))}
        onPlayerBChange={(id) => dispatch(setComparePlayerB(id))}
      />
      <CompareStatsTable playerA={a} playerB={b} />
    </div>
  )
}
