import { reportSectionTitleClass } from '../reportFormStyles'
import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepStatistical({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-6">
      <ScoutReportField
        label="Data source"
        hint="e.g. SofaScore, Wyscout, league site"
        value={form.statisticalSnapshot.dataSource}
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
