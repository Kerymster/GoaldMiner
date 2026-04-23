import { pipelineCardClass } from '../directorPipelineStyles'
import { PIPELINE_FORM_STEPS } from './pipelineFormStepsMeta'

type Props = { step: number; progress: number }

export function PipelineFormProgressCard({ step, progress }: Props) {
  return (
    <div className={pipelineCardClass}>
      <div className="mb-3 flex items-center justify-between text-xs text-fume-500 dark:text-fume-400">
        <span>
          Step {step + 1} of {PIPELINE_FORM_STEPS.length}
        </span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-fume-200 dark:bg-fume-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
