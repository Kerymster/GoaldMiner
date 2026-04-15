import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection, DetailSubheading } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailTacticalSection({ form }: { form: ScoutReportForm }) {
  const t = form.tactical
  return (
    <DetailSection title="Tactical analysis" id="tactical">
      <DetailSubheading>Positioning</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="In the right places?" value={t.positioning.rightPlace} />
        <DetailRow label="Finding space" value={t.positioning.findingSpace} />
      </div>
      <DetailSubheading>Off-ball movement</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="Runs without the ball" value={t.offBallMovement.runsWithoutBall} />
        <DetailRow label="Creating space" value={t.offBallMovement.creatingSpace} />
      </div>
      <DetailSubheading>Defensive contribution</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="Pressing" value={t.defensiveContribution.pressing} />
        <DetailRow label="Tracking back" value={t.defensiveContribution.trackingBack} />
        <DetailRow label="Tackle / duel timing" value={t.defensiveContribution.tackleTiming} />
      </div>
    </DetailSection>
  )
}
