import { ffpStatuses, labelForOption, transferApproaches } from '../../../../types/directorPipeline'
import {
  pipelineFieldLabelClass,
  pipelineGridClass,
  pipelineHelpClass,
  pipelineInputClass,
} from '../../directorPipelineStyles'
import type { DirectorPipelineFormStepHandlers } from '../directorPipelineFormStepHandlers'

type Props = DirectorPipelineFormStepHandlers

export function Step3FinancialSquad({
  context,
  updateFinancial,
  updateSquad,
  parseInteger,
  parseNullableInteger,
  parseOptionalNumber,
}: Props) {
  return (
    <>
      <p className={pipelineHelpClass}>
        Budget amounts below are in millions of EUR (M EUR). Example: 35 means €35m. Percentages and FFP status are not
        in M EUR.
      </p>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Currency (reference)</span>
          <input
            value={context.financial?.currency ?? 'EUR'}
            onChange={(event) => updateFinancial('currency', event.target.value.toUpperCase())}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>FFP status</span>
          <select
            value={context.financial?.ffpStatus ?? ''}
            onChange={(event) =>
              updateFinancial('ffpStatus', (event.target.value || undefined) as (typeof ffpStatuses)[number] | undefined)
            }
            className={pipelineInputClass}
          >
            <option value="">Not set</option>
            {ffpStatuses.map((item) => (
              <option key={item} value={item}>
                {labelForOption(item)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Season operating budget (M EUR)</span>
          <input
            type="number"
            value={context.financial?.seasonOperatingBudget ?? ''}
            onChange={(event) => updateFinancial('seasonOperatingBudget', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Annual wage budget (M EUR)</span>
          <input
            type="number"
            value={context.financial?.annualWageBudget ?? ''}
            onChange={(event) => updateFinancial('annualWageBudget', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Transfer budget net (M EUR)</span>
          <input
            type="number"
            value={context.financial?.transferBudgetNet ?? ''}
            onChange={(event) => updateFinancial('transferBudgetNet', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Transfer budget gross (M EUR)</span>
          <input
            type="number"
            min={0}
            value={context.financial?.transferBudgetGross ?? ''}
            onChange={(event) => updateFinancial('transferBudgetGross', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Wage / revenue cap (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={context.financial?.wageToRevenueCapPct ?? ''}
            onChange={(event) => updateFinancial('wageToRevenueCapPct', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Profit target per season (M EUR)</span>
          <input
            type="number"
            value={context.financial?.profitTargetPerSeason ?? ''}
            onChange={(event) => updateFinancial('profitTargetPerSeason', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Transfer approach</span>
          <select
            value={context.squadStrategy?.transferApproach ?? ''}
            onChange={(event) =>
              updateSquad('transferApproach', (event.target.value || undefined) as (typeof transferApproaches)[number] | undefined)
            }
            className={pipelineInputClass}
          >
            <option value="">Not set</option>
            {transferApproaches.map((item) => (
              <option key={item} value={item}>
                {labelForOption(item)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Target squad size</span>
          <input
            type="number"
            value={context.squadStrategy?.targetSquadSize ?? ''}
            onChange={(event) => updateSquad('targetSquadSize', parseInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <div className={pipelineGridClass}>
        <label>
          <span className={pipelineFieldLabelClass}>Foreign player limit</span>
          <input
            type="number"
            min={0}
            max={40}
            value={context.squadStrategy?.foreignPlayerLimit ?? ''}
            onChange={(event) => updateSquad('foreignPlayerLimit', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
        <label>
          <span className={pipelineFieldLabelClass}>Homegrown quota (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={context.squadStrategy?.homegrownQuotaPct ?? ''}
            onChange={(event) => updateSquad('homegrownQuotaPct', parseNullableInteger(event.target.value))}
            className={pipelineInputClass}
          />
        </label>
      </div>
      <label>
        <span className={pipelineFieldLabelClass}>Target average age</span>
        <input
          type="number"
          min={17}
          max={35}
          step="0.1"
          value={context.squadStrategy?.targetAverageAge ?? ''}
          onChange={(event) => updateSquad('targetAverageAge', parseOptionalNumber(event.target.value))}
          className={pipelineInputClass}
        />
      </label>
    </>
  )
}
