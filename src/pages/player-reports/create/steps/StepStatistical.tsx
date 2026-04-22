import { pageStack } from '../../../../components/styles/pageChromeStyles'
import { reportSectionTitleClass } from '../reportFormStyles'
import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepStatistical({ form, setForm, errors }: ScoutReportStepProps) {
  return (
    <div className={pageStack}>
      <ScoutReportField
        label="Data source"
        hint="e.g. SofaScore, Wyscout, club or competition data pages"
        value={form.statisticalSnapshot.dataSource}
        error={errors.dataSource}
        onChange={(dataSource) =>
          setForm((f) => ({
            ...f,
            statisticalSnapshot: { ...f.statisticalSnapshot, dataSource },
          }))
        }
      />
      <p className={reportSectionTitleClass}>Per match (raw or rounded)</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <ScoutReportField
          label="Pass %"
          value={form.statisticalSnapshot.perMatch.passPercent}
          error={errors.passPercent}
          onChange={(passPercent) =>
            setForm((f) => ({
              ...f,
              statisticalSnapshot: {
                ...f.statisticalSnapshot,
                perMatch: {
                  ...f.statisticalSnapshot.perMatch,
                  passPercent,
                },
              },
            }))
          }
        />
        <ScoutReportField
          label="Shots"
          value={form.statisticalSnapshot.perMatch.shots}
          error={errors.shots}
          onChange={(shots) =>
            setForm((f) => ({
              ...f,
              statisticalSnapshot: {
                ...f.statisticalSnapshot,
                perMatch: { ...f.statisticalSnapshot.perMatch, shots },
              },
            }))
          }
        />
        <ScoutReportField
          label="Key passes"
          value={form.statisticalSnapshot.perMatch.keyPasses}
          error={errors.keyPasses}
          onChange={(keyPasses) =>
            setForm((f) => ({
              ...f,
              statisticalSnapshot: {
                ...f.statisticalSnapshot,
                perMatch: { ...f.statisticalSnapshot.perMatch, keyPasses },
              },
            }))
          }
        />
        <ScoutReportField
          label="Ball losses"
          value={form.statisticalSnapshot.perMatch.ballLosses}
          error={errors.ballLosses}
          onChange={(ballLosses) =>
            setForm((f) => ({
              ...f,
              statisticalSnapshot: {
                ...f.statisticalSnapshot,
                perMatch: { ...f.statisticalSnapshot.perMatch, ballLosses },
              },
            }))
          }
        />
        <ScoutReportField
          label="Defensive actions"
          value={form.statisticalSnapshot.perMatch.defensiveActions}
          error={errors.defensiveActions}
          onChange={(defensiveActions) =>
            setForm((f) => ({
              ...f,
              statisticalSnapshot: {
                ...f.statisticalSnapshot,
                perMatch: {
                  ...f.statisticalSnapshot.perMatch,
                  defensiveActions,
                },
              },
            }))
          }
        />
      </div>
      <ScoutReportField
        label="Interpretation"
        hint="Explain what the numbers mean in context — not a naked stat dump."
        value={form.statisticalSnapshot.interpretation}
        error={errors.interpretation}
        onChange={(interpretation) =>
          setForm((f) => ({
            ...f,
            statisticalSnapshot: {
              ...f.statisticalSnapshot,
              interpretation,
            },
          }))
        }
        multiline
      />
    </div>
  )
}

