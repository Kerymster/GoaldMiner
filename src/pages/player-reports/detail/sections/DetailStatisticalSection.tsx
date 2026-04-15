import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection, DetailSubheading } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailStatisticalSection({ form }: { form: ScoutReportForm }) {
  const s = form.statisticalSnapshot
  const pm = s.perMatch
  return (
    <DetailSection title="Statistical snapshot" id="statistical">
      <DetailRow label="Data source" value={s.dataSource} />
      <DetailSubheading>Per match</DetailSubheading>
      <div className={detailGrid}>
        <DetailRow label="Pass %" value={pm.passPercent} />
        <DetailRow label="Shots" value={pm.shots} />
        <DetailRow label="Key passes" value={pm.keyPasses} />
        <DetailRow label="Ball losses" value={pm.ballLosses} />
        <DetailRow label="Defensive actions" value={pm.defensiveActions} />
      </div>
      <DetailSubheading>Interpretation</DetailSubheading>
      <DetailRow label="Interpretation" value={s.interpretation} />
    </DetailSection>
  )
}
