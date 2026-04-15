import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection, DetailSubheading } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailTechnicalSection({ form }: { form: ScoutReportForm }) {
  const t = form.technical
  return (
    <DetailSection title="Technical analysis" id="technical">
      <DetailSubheading>Ball control</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="First touch" value={t.ballControl.firstTouch} />
        <DetailRow label="Quality in tight spaces" value={t.ballControl.tightSpaceQuality} />
      </div>
      <DetailSubheading>Passing</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="Short / long passing" value={t.passing.shortAndLong} />
        <DetailRow label="Creativity" value={t.passing.creativity} />
      </div>
      <DetailSubheading>Dribbling</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="1v1 success" value={t.dribbling.oneVsOne} />
        <DetailRow label="Change of direction" value={t.dribbling.changeOfDirection} />
      </div>
      <DetailSubheading>Finishing</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="Shot quality" value={t.finishing.shotQuality} />
        <DetailRow label="Penalty-area effectiveness" value={t.finishing.penaltyAreaEffectiveness} />
      </div>
    </DetailSection>
  )
}
