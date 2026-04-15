import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'
import { detailGrid } from '../detailStyles'

export function DetailTeamFitSection({ form }: { form: ScoutReportForm }) {
  const tf = form.teamFit
  const rating =
    tf.ratingOutOfFive != null ? `${tf.ratingOutOfFive} / 5` : '—'
  return (
    <DetailSection title="Team fit & recommendation" id="team-fit">
      <div className={detailGrid}>
        <DetailRow label="Clubs / profiles" value={tf.whichTeams} />
        <DetailRow label="Systems" value={tf.whichSystems} />
        <DetailRow label="Transfer recommendation" value={tf.transferRecommendation} />
        <DetailRow label="Final verdict" value={tf.finalVerdict} />
        <DetailRow label="Overall rating" value={rating} />
      </div>
    </DetailSection>
  )
}
