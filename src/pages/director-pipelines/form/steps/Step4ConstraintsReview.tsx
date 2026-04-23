import { buildMandateBrief } from '../../../../types/directorPipeline'
import {
  pipelineDangerButtonClass,
  pipelineFieldLabelClass,
  pipelineGridClass,
  pipelineHelpClass,
  pipelineInputClass,
  pipelineMultiLineListClass,
  pipelineSecondaryButtonClass,
  pipelineSectionTitleClass,
  pipelineTextareaClass,
} from '../../directorPipelineStyles'
import type { DirectorPipelineFormStepHandlers } from '../directorPipelineFormStepHandlers'

type Props = DirectorPipelineFormStepHandlers & {
  onGenerateBrief: () => void
  onRequestReplaceMandate: () => void
}

export function Step4ConstraintsReview({
  context,
  setContextPatch,
  updateConstraints,
  updateStakeholders,
  onGenerateBrief,
  onRequestReplaceMandate,
}: Props) {
  return (
    <>
      <label>
        <span className={pipelineFieldLabelClass}>Constraints</span>
        <textarea
          value={context.constraints?.items ?? ''}
          onChange={(event) => updateConstraints('items', event.target.value)}
          placeholder="Free text"
          rows={5}
          className={pipelineMultiLineListClass}
        />
      </label>
      <label>
        <span className={pipelineFieldLabelClass}>Key risks</span>
        <textarea
          value={context.constraints?.keyRisks ?? ''}
          onChange={(event) => updateConstraints('keyRisks', event.target.value)}
          className={pipelineTextareaClass}
        />
      </label>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Owner</span>
          <input
            value={context.stakeholders?.ownerName ?? ''}
            onChange={(event) => updateStakeholders('ownerName', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>CEO</span>
          <input
            value={context.stakeholders?.ceoName ?? ''}
            onChange={(event) => updateStakeholders('ceoName', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Current head coach</span>
          <input
            value={context.stakeholders?.currentHeadCoach ?? ''}
            onChange={(event) => updateStakeholders('currentHeadCoach', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Reports to</span>
          <input
            value={context.stakeholders?.reportsTo ?? ''}
            onChange={(event) => updateStakeholders('reportsTo', event.target.value)}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <label>
        <span className={pipelineFieldLabelClass}>Director notes</span>
        <textarea
          value={context.notes ?? ''}
          onChange={(event) => setContextPatch({ notes: event.target.value })}
          className={pipelineTextareaClass}
        />
      </label>
      <div className="rounded-lg border border-surface-field-border bg-surface-soft p-3">
        <p className={pipelineSectionTitleClass}>Review snapshot</p>
        <p className={`mt-2 ${pipelineHelpClass}`}>{buildMandateBrief(context)}</p>
        <p className={`mt-2 ${pipelineHelpClass}`}>Current mandate text: {context.mandate || 'Not written yet.'}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={onGenerateBrief} className={pipelineSecondaryButtonClass}>
            Generate planning brief
          </button>
          <button type="button" onClick={onRequestReplaceMandate} className={pipelineDangerButtonClass}>
            Replace mandate with brief
          </button>
        </div>
      </div>
    </>
  )
}
