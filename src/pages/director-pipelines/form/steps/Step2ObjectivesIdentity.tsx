import {
  academyIntegrationLevels,
  labelForOption,
  playingStyles,
} from '../../../../types/directorPipeline'
import {
  pipelineFieldLabelClass,
  pipelineGridClass,
  pipelineInputClass,
  pipelineMultiLineListClass,
  pipelineTextareaClass,
} from '../../directorPipelineStyles'
import type { DirectorPipelineFormStepHandlers } from '../directorPipelineFormStepHandlers'

type Props = DirectorPipelineFormStepHandlers

export function Step2ObjectivesIdentity({
  context,
  updateObjectives,
  updatePlayingIdentity,
  parseInteger,
}: Props) {
  return (
    <>
      <div className={pipelineGridClass}>
        <label className="md:col-span-2">
          <span className={pipelineFieldLabelClass}>Secondary objectives</span>
          <textarea
            value={context.objectives.secondaryObjectives ?? ''}
            onChange={(event) => updateObjectives('secondaryObjectives', event.target.value)}
            placeholder="Free text"
            rows={4}
            className={pipelineMultiLineListClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Cup ambitions</span>
          <input
            value={context.objectives.cupAmbitions ?? ''}
            onChange={(event) => updateObjectives('cupAmbitions', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>League position from</span>
          <input
            type="number"
            value={context.objectives.targetLeaguePositionFrom ?? ''}
            onChange={(event) => updateObjectives('targetLeaguePositionFrom', parseInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>League position to</span>
          <input
            type="number"
            value={context.objectives.targetLeaguePositionTo ?? ''}
            onChange={(event) => updateObjectives('targetLeaguePositionTo', parseInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Playing style</span>
          <select
            value={context.playingIdentity?.style ?? ''}
            onChange={(event) =>
              updatePlayingIdentity('style', (event.target.value || undefined) as (typeof playingStyles)[number] | undefined)
            }
            className={pipelineInputClass}
          >
            <option value="">Not set</option>
            {playingStyles.map((item) => (
              <option key={item} value={item}>
                {labelForOption(item)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Academy integration</span>
          <select
            value={context.playingIdentity?.academyIntegration ?? ''}
            onChange={(event) =>
              updatePlayingIdentity(
                'academyIntegration',
                (event.target.value || undefined) as (typeof academyIntegrationLevels)[number] | undefined,
              )
            }
            className={pipelineInputClass}
          >
            <option value="">Not set</option>
            {academyIntegrationLevels.map((item) => (
              <option key={item} value={item}>
                {labelForOption(item)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span className={pipelineFieldLabelClass}>Preferred formations</span>
        <textarea
          value={context.playingIdentity?.preferredFormations ?? ''}
          onChange={(event) => updatePlayingIdentity('preferredFormations', event.target.value)}
          placeholder="Free text"
          rows={3}
          className={pipelineMultiLineListClass}
        />
      </label>
      <label>
        <span className={pipelineFieldLabelClass}>Style notes</span>
        <textarea
          value={context.playingIdentity?.styleNotes ?? ''}
          onChange={(event) => updatePlayingIdentity('styleNotes', event.target.value)}
          className={pipelineTextareaClass}
        />
      </label>
      <label>
        <span className={pipelineFieldLabelClass}>Non-negotiables</span>
        <textarea
          value={context.playingIdentity?.nonNegotiables ?? ''}
          onChange={(event) => updatePlayingIdentity('nonNegotiables', event.target.value)}
          className={pipelineTextareaClass}
        />
      </label>
    </>
  )
}
