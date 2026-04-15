import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailStrengthsWeaknessesSection({ form }: { form: ScoutReportForm }) {
  const sw = form.strengthsWeaknesses
  return (
    <DetailSection title="Strengths & weaknesses" id="strengths-weaknesses">
      <div className={detailGrid}>
        <DetailRow label="Strengths" value={sw.strengths} />
        <DetailRow label="Weaknesses" value={sw.weaknesses} />
      </div>
    </DetailSection>
  )
}
