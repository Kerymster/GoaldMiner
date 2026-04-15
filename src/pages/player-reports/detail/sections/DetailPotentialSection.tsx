import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailPotentialSection({ form }: { form: ScoutReportForm }) {
  const po = form.potential
  return (
    <DetailSection title="Potential assessment" id="potential">
      <div className={detailGrid}>
        <DetailRow label="Ceiling" value={po.ceiling} />
        <DetailRow label="Development areas" value={po.developmentAreas} />
        <DetailRow label="Risk factors" value={po.riskFactors} />
      </div>
    </DetailSection>
  )
}
