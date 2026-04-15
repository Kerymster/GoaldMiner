import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import { DetailRow, DetailSection } from '../DetailPrimitives'

export function DetailExecutiveSection({ form }: { form: ScoutReportForm }) {
  return (
    <DetailSection title="Executive summary" id="executive-summary">
      <DetailRow label="Summary" value={form.executiveSummary.narrative} />
    </DetailSection>
  )
}
