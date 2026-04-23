import { useMemo } from 'react'
import {
  setComparePlayerA,
  setComparePlayerB,
} from '../../features/compare/compareSlice'
import { useComparePlayersPool } from '../../hooks/useComparePlayersPool'
import { useCompareSelectionSync } from '../../hooks/useCompareSelectionSync'
import { PageHeader } from '../../components/page-header/PageHeader'
import { pageStack, proseError, proseMuted } from '../../components/styles/pageChromeStyles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectComparePlayerAId,
  selectComparePlayerBId,
} from '../../store/selectors/compareSelectors'
import { ComparePlayerSelectors } from './ComparePlayerSelectors'
import { CompareStatsTable } from './CompareStatsTable'

const BREADCRUMB = [{ label: 'Compare' as const }]
const TITLE = 'Compare'
const DESCRIPTION = 'Choose two players from the list (up to 50 shown) to compare side by side.'

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
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className={proseMuted}>Loading…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className={proseError}>{error}</p>
      </div>
    )
  }

  if (pool.length < 2) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className={proseMuted}>Add at least two players before you can run a comparison.</p>
      </div>
    )
  }

  if (!a || !b) {
    return (
      <div className={pageStack}>
        <PageHeader
          breadcrumbItems={BREADCRUMB}
          title={TITLE}
          description={DESCRIPTION}
        />
        <p className={proseMuted}>Loading…</p>
      </div>
    )
  }

  return (
    <div className={pageStack}>
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

