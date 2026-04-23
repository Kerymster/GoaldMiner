import { labelForOption, ownershipTenures } from '../../../../types/directorPipeline'
import {
  pipelineFieldLabelClass,
  pipelineGridClass,
  pipelineInputClass,
  pipelineTextareaClass,
} from '../../directorPipelineStyles'
import type { DirectorPipelineFormStepHandlers } from '../directorPipelineFormStepHandlers'

type Props = DirectorPipelineFormStepHandlers

export function Step1ClubOwnership({ context, updateClub, updateOwnership, parseInteger }: Props) {
  return (
    <>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Club short name</span>
          <input
            value={context.club.clubShortName ?? ''}
            onChange={(event) => updateClub('clubShortName', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Country</span>
          <input
            value={context.club.country ?? ''}
            onChange={(event) => updateClub('country', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>League</span>
          <input
            value={context.club.league ?? ''}
            onChange={(event) => updateClub('league', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Season label</span>
          <input
            value={context.club.seasonLabel ?? ''}
            onChange={(event) => updateClub('seasonLabel', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <label>
        <span className={pipelineFieldLabelClass}>League tier (1–6)</span>
        <input
          type="number"
          min={1}
          max={6}
          value={context.club.leagueTier ?? ''}
          onChange={(event) => updateClub('leagueTier', parseInteger(event.target.value))}
          className={pipelineInputClass}
        />
      </label>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Ownership display name</span>
          <input
            value={context.ownership.displayName ?? ''}
            onChange={(event) => updateOwnership('displayName', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Ownership tenure</span>
          <select
            value={context.ownership.tenure ?? ''}
            onChange={(event) =>
              updateOwnership('tenure', (event.target.value || undefined) as (typeof ownershipTenures)[number] | undefined)
            }
            className={pipelineInputClass}
          >
            <option value="">Not set</option>
            {ownershipTenures.map((item) => (
              <option key={item} value={item}>
                {labelForOption(item)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span className={pipelineFieldLabelClass}>Board expectations</span>
        <textarea
          value={context.ownership.boardExpectations ?? ''}
          onChange={(event) => updateOwnership('boardExpectations', event.target.value)}
          className={pipelineTextareaClass}
        />
      </label>
    </>
  )
}
