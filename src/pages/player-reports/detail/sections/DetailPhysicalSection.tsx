import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailPhysicalSection({ form }: { form: ScoutReportForm }) {
  const p = form.physical
  return (
    <DetailSection title="Physical profile" id="physical">
      <div className={detailGrid}>
        <DetailRow label="Pace (acceleration / sprint)" value={p.paceAccelerationSprint} />
        <DetailRow label="Stamina" value={p.stamina} />
        <DetailRow label="Strength" value={p.strength} />
        <DetailRow label="Balance" value={p.balance} />
      </div>
    </DetailSection>
  )
}
