import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailComparisonSection({ form }: { form: ScoutReportForm }) {
  const c = form.comparison
  return (
    <DetailSection title="Comparison" id="comparison">
      <div className={detailGrid}>
        <DetailRow label="Playing-style comparison" value={c.playingStyleComparison} />
        <DetailRow label="Level comparison" value={c.levelComparison} />
      </div>
    </DetailSection>
  )
}
