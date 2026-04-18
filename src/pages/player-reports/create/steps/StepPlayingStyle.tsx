import { ScoutReportField } from '../ScoutReportField'
import { reportSectionTitleClass } from '../reportFormStyles'
import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import type { ScoutReportStepProps } from './stepProps'

function PositionRoleFromPlayerStep({ form }: { form: ScoutReportForm }) {
  const p = form.playerInformation
  const position = p.position?.trim() ?? ''
  const role = p.mostlyUsedRole?.trim() ?? ''
  const secondary = (p.secondaryPosition ?? '').trim()
  const other = (p.otherRoles ?? '').trim()

  const hasCore = Boolean(position || role)
  const hasExtra = Boolean(secondary || other)

  if (!hasCore && !hasExtra) {
    return (
      <div className="rounded-lg border border-dashed border-surface-field-border bg-surface-field/30 px-4 py-3 text-sm text-fume-600 dark:text-fume-400">
        Position and role from <strong className="font-medium">Player information</strong> will
        appear here after you complete that step.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-surface-field-border bg-surface-field/40 px-4 py-3 dark:bg-surface-field/20">
      <p className={reportSectionTitleClass}>Position & role</p>
      <dl className="mt-3 space-y-2 text-sm text-fume-800 dark:text-fume-200">
        {position ? (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            <dt className="font-medium text-gold-700 dark:text-gold-400">Position:</dt>
            <dd>{position}</dd>
          </div>
        ) : null}
        {role ? (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            <dt className="font-medium text-gold-700 dark:text-gold-400">Mostly used role:</dt>
            <dd>{role}</dd>
          </div>
        ) : null}
        {secondary ? (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            <dt className="font-medium text-gold-700 dark:text-gold-400">Secondary position:</dt>
            <dd>{secondary}</dd>
          </div>
        ) : null}
        {other ? (
          <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:gap-x-2">
            <dt className="shrink-0 font-medium text-gold-700 dark:text-gold-400">Other roles:</dt>
            <dd className="min-w-0">{other}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  )
}

export function StepPlayingStyle({ form, setForm, errors }: ScoutReportStepProps) {
  return (
    <div className="space-y-6">
      <PositionRoleFromPlayerStep form={form} />
      <ScoutReportField
        label="System fit"
        value={form.playingStyle.systemFit}
        error={errors.systemFit}
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
        error={errors.tacticalIntelligence}
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
        error={errors.roleOnPitch}
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
        error={errors.systemVsIndividual}
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
        error={errors.bestFormations}
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
