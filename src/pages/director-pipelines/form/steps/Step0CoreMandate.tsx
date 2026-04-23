import {
  labelForOption,
  ownerMandates,
  ownershipModels,
  primaryObjectives,
} from '../../../../types/directorPipeline'
import {
  pipelineFieldLabelClass,
  pipelineGridClass,
  pipelineInputClass,
  pipelineTextareaClass,
} from '../../directorPipelineStyles'
import type { DirectorPipelineFormStepHandlers } from '../directorPipelineFormStepHandlers'

type Props = DirectorPipelineFormStepHandlers

export function Step0CoreMandate({
  context,
  updateClub,
  updateOwnership,
  updateObjectives,
  setContextPatch,
  parseInteger,
}: Props) {
  return (
    <>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Club name *</span>
          <input
            value={context.club.clubName}
            onChange={(event) => updateClub('clubName', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Time horizon years *</span>
          <input
            type="number"
            min={1}
            max={10}
            value={context.objectives.timeHorizonYears ?? ''}
            onChange={(event) => updateObjectives('timeHorizonYears', parseInteger(event.target.value) ?? 3)}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Ownership model *</span>
          <select
            value={context.ownership.model}
            onChange={(event) => updateOwnership('model', event.target.value as (typeof ownershipModels)[number])}
            className={pipelineInputClass}
          >
            {ownershipModels.map((item) => (
              <option key={item} value={item}>
                {labelForOption(item)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Owner mandate *</span>
          <select
            value={context.ownership.mandate}
            onChange={(event) => updateOwnership('mandate', event.target.value as (typeof ownerMandates)[number])}
            className={pipelineInputClass}
          >
            {ownerMandates.map((item) => (
              <option key={item} value={item}>
                {labelForOption(item)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span className={pipelineFieldLabelClass}>Primary objective *</span>
        <select
          value={context.objectives.primaryObjective}
          onChange={(event) =>
            updateObjectives('primaryObjective', event.target.value as (typeof primaryObjectives)[number])
          }
          className={pipelineInputClass}
        >
          {primaryObjectives.map((item) => (
            <option key={item} value={item}>
              {labelForOption(item)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={pipelineFieldLabelClass}>Mandate sentence *</span>
        <textarea
          value={context.mandate}
          onChange={(event) => setContextPatch({ mandate: event.target.value })}
          className={pipelineTextareaClass}
          placeholder="In one clear sentence, what are we chasing in this period?"
        />
      </label>
    </>
  )
}
