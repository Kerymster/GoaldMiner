import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepPlayingStyle({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-6">
      <ScoutReportField
        label="Role"
        hint="e.g. Inverted winger, box-to-box, ball-playing CB"
        value={form.playingStyle.role}
        onChange={(role) =>
          setForm((f) => ({
            ...f,
            playingStyle: { ...f.playingStyle, role },
          }))
        }
      />
      <ScoutReportField
        label="System fit"
        value={form.playingStyle.systemFit}
        onChange={(systemFit) =>
          setForm((f) => ({
            ...f,
            playingStyle: { ...f.playingStyle, systemFit },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Tactical intelligence"
        value={form.playingStyle.tacticalIntelligence}
        onChange={(tacticalIntelligence) =>
          setForm((f) => ({
            ...f,
            playingStyle: { ...f.playingStyle, tacticalIntelligence },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Role on the pitch"
        hint="What job are they doing in the team?"
        value={form.playingStyle.roleOnPitch}
        onChange={(roleOnPitch) =>
          setForm((f) => ({
            ...f,
            playingStyle: { ...f.playingStyle, roleOnPitch },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="System player vs individual"
        value={form.playingStyle.systemVsIndividual}
        onChange={(systemVsIndividual) =>
          setForm((f) => ({
            ...f,
            playingStyle: { ...f.playingStyle, systemVsIndividual },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Best formations"
        value={form.playingStyle.bestFormations}
        onChange={(bestFormations) =>
          setForm((f) => ({
            ...f,
            playingStyle: { ...f.playingStyle, bestFormations },
          }))
        }
        multiline
      />
    </div>
  )
}
