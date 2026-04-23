import { labelForOption, type DirectorPipeline } from '../../types/directorPipeline'
import { formatPipelineListDate, pipelineListRowTitle } from './directorPipelineListFormat'
import { pipelineCardClass, pipelineInputClass } from './directorPipelineStyles'

const compareSummaryPaneClass =
  'rounded-lg border border-surface-field-border bg-surface-soft p-3'

type Props = {
  active: DirectorPipeline
  compareWith: DirectorPipeline
  archived: DirectorPipeline[]
  onSelectArchivedId: (id: string) => void
}

export function DirectorPipelineSeasonCompare({
  active,
  compareWith,
  archived,
  onSelectArchivedId,
}: Props) {
  return (
    <section className={pipelineCardClass}>
      <h3 className="text-base font-semibold text-fume-900 dark:text-fume-100">Season change compare</h3>
      <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
        Compare active vision with one archived baseline.
      </p>
      <div className="mt-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-fume-500 dark:text-fume-400">
          Archived baseline
        </label>
        <select
          value={compareWith.id}
          onChange={(event) => onSelectArchivedId(event.target.value)}
          className={pipelineInputClass}
        >
          {archived.map((row) => (
            <option key={row.id} value={row.id}>
              {pipelineListRowTitle(row) + ' · ' + formatPipelineListDate(row.updatedAt)}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className={compareSummaryPaneClass}>
          <p className="text-xs font-semibold uppercase tracking-wide text-fume-500">Active</p>
          <p className="mt-1 text-sm">{active.context.club.clubName}</p>
          <p className="text-xs text-fume-500">{labelForOption(active.context.objectives.primaryObjective)}</p>
          <p className="mt-2 text-xs text-fume-600">{active.context.mandate}</p>
        </div>
        <div className={compareSummaryPaneClass}>
          <p className="text-xs font-semibold uppercase tracking-wide text-fume-500">Archived</p>
          <p className="mt-1 text-sm">{compareWith.context.club.clubName}</p>
          <p className="text-xs text-fume-500">{labelForOption(compareWith.context.objectives.primaryObjective)}</p>
          <p className="mt-2 text-xs text-fume-600">{compareWith.context.mandate}</p>
        </div>
      </div>
    </section>
  )
}
