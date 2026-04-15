import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailMentalSection({ form }: { form: ScoutReportForm }) {
  const m = form.mental
  return (
    <DetailSection title="Mental profile" id="mental">
      <div className={detailGrid}>
        <DetailRow label="Decision-making" value={m.decisionMaking} />
        <DetailRow label="Game intelligence" value={m.gameIntelligence} />
        <DetailRow label="Discipline" value={m.discipline} />
        <DetailRow label="Confidence" value={m.confidence} />
        <DetailRow label="Performance under pressure" value={m.performanceUnderPressure} />
      </div>
    </DetailSection>
  )
}
