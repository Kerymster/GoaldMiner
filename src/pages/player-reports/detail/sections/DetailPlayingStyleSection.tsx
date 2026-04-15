import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailPlayingStyleSection({ form }: { form: ScoutReportForm }) {
  const s = form.playingStyle
  return (
    <DetailSection title="Playing style & role" id="playing-style">
      <div className={detailGrid}>
        <DetailRow label="Role" value={s.role} />
        <DetailRow label="System fit" value={s.systemFit} />
        <DetailRow label="Tactical intelligence" value={s.tacticalIntelligence} />
        <DetailRow label="Role on the pitch" value={s.roleOnPitch} />
        <DetailRow label="System vs individual" value={s.systemVsIndividual} />
        <DetailRow label="Best formations" value={s.bestFormations} />
      </div>
    </DetailSection>
  )
}
