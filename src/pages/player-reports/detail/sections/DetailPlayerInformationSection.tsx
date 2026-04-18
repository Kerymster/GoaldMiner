import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'
import { formatReportDisplayDate } from '../formatReportDisplayDate'

export function DetailPlayerInformationSection({ form }: { form: ScoutReportForm }) {
  const p = form.playerInformation
  return (
    <DetailSection title="Player information" id="player-information">
      <div className={detailGrid}>
        <DetailRow label="Report date" value={formatReportDisplayDate(form.reportDate)} />
        <DetailRow label="Name" value={p.name} />
        <DetailRow
          label="Date of Birth"
          value={formatReportDisplayDate(p.ageOrDob)}
        />
        <DetailRow label="Nationality" value={p.nationality} />
        <DetailRow label="Height / weight" value={p.heightWeight} />
        <DetailRow label="Preferred foot" value={p.preferredFoot} />
        <DetailRow label="Position" value={p.position} />
        <DetailRow label="Club" value={p.club} />
        <DetailRow label="Contract" value={p.contractIfKnown} />
      </div>
    </DetailSection>
  )
}
