import type { ReactNode } from 'react'
import type { PlayingStyleFormStepHandlers } from './playingStyleStepTypes'
import {
  labelForPlayingStyleOption,
  pressingHeights,
  styleModels,
  transitionApproaches,
} from '../../../../types/playingStyle'
import {
  pipelineFieldLabelClass,
  pipelineGridClass,
  pipelineHelpClass,
  pipelineInputClass,
  pipelineMultiLineListClass,
  pipelineSectionTitleClass,
} from '../playingStyleStyles'

function Field({
  label,
  help,
  children,
}: {
  label: string
  help?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className={pipelineFieldLabelClass}>{label}</span>
      {help ? <p className={`mt-0.5 ${pipelineHelpClass}`}>{help}</p> : null}
      {children}
    </label>
  )
}

function TextArea({
  value,
  onChange,
  maxLength,
}: {
  value: string
  onChange: (v: string) => void
  maxLength?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      rows={4}
      className={pipelineMultiLineListClass}
    />
  )
}

function OptionalNumber({
  value,
  onChange,
  min,
  max,
  step,
}: {
  value: number | null | undefined
  onChange: (v: number | null) => void
  min?: number
  max?: number
  step?: number
}) {
  return (
    <input
      type="number"
      value={value === null || value === undefined ? '' : value}
      onChange={(e) => {
        const raw = e.target.value
        if (raw === '') {
          onChange(null)
          return
        }
        const n = Number(raw)
        if (Number.isNaN(n)) return
        onChange(n)
      }}
      min={min}
      max={max}
      step={step}
      className={pipelineInputClass}
    />
  )
}

export function PlayingStyleStepBody({ step, context, patchContext }: PlayingStyleFormStepHandlers & { step: number }) {
  const idn = context.identity
  const ip = context.inPossession ?? {}
  const ot = context.offensiveTransition ?? {}
  const fin = context.finishing ?? {}
  const oop = context.outOfPossession ?? {}
  const dt = context.defensiveTransition ?? {}
  const sp = context.setPieces ?? {}
  const pp = context.playerProfiles ?? {}
  const mm = context.matchManagement ?? {}
  const kpi = context.kpiTargets ?? {}
  const road = context.implementationRoadmap ?? {}
  const gov = context.governance ?? {}

  if (step === 0) {
    return (
      <div className="space-y-5">
        <Field label="Three-year playing vision" help="What we want the team to look like over the next three years.">
          <TextArea
            value={idn.threeYearVision}
            onChange={(threeYearVision) => patchContext({ identity: { ...idn, threeYearVision } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Style statement (one sentence)" help="How we describe our playing style in one line.">
          <TextArea
            value={idn.styleStatement}
            onChange={(styleStatement) => patchContext({ identity: { ...idn, styleStatement } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Primary style model" help="Dominant tactical model for the club.">
          <select
            value={idn.styleModel ?? ''}
            onChange={(e) =>
              patchContext({
                identity: {
                  ...idn,
                  styleModel: e.target.value ? (e.target.value as (typeof styleModels)[number]) : undefined,
                },
              })
            }
            className={pipelineInputClass}
          >
            <option value="">—</option>
            {styleModels.map((m) => (
              <option key={m} value={m}>
                {labelForPlayingStyleOption(m)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Non-negotiable principles" help="Principles we refuse to compromise on.">
          <TextArea
            value={idn.nonNegotiables ?? ''}
            onChange={(nonNegotiables) => patchContext({ identity: { ...idn, nonNegotiables } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Fan experience intent" help="What kind of match experience we want supporters to feel.">
          <TextArea
            value={idn.fanExperienceIntent ?? ''}
            onChange={(fanExperienceIntent) => patchContext({ identity: { ...idn, fanExperienceIntent } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Head coach profile fit" help="Profile that best executes this model.">
          <TextArea
            value={idn.coachProfileFit ?? ''}
            onChange={(coachProfileFit) => patchContext({ identity: { ...idn, coachProfileFit } })}
            maxLength={1200}
          />
        </Field>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="space-y-5">
        <Field label="Build-up approach from the back" help="How we restart and build against pressure.">
          <TextArea
            value={ip.buildUpApproach ?? ''}
            onChange={(buildUpApproach) => patchContext({ inPossession: { ...ip, buildUpApproach } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Progression from zones 1–2 to zone 3" help="How we move the ball into the final third.">
          <TextArea
            value={ip.progressionPlan ?? ''}
            onChange={(progressionPlan) => patchContext({ inPossession: { ...ip, progressionPlan } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Settled attack plan" help="Organised attacking structure against a set defence.">
          <TextArea
            value={ip.finalThirdPlan ?? ''}
            onChange={(finalThirdPlan) => patchContext({ inPossession: { ...ip, finalThirdPlan } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Width creation" help="Who creates width and how.">
          <TextArea
            value={ip.widthCreationPlan ?? ''}
            onChange={(widthCreationPlan) => patchContext({ inPossession: { ...ip, widthCreationPlan } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Tempo control" help="How we speed up or slow the game.">
          <TextArea
            value={ip.tempoControlPlan ?? ''}
            onChange={(tempoControlPlan) => patchContext({ inPossession: { ...ip, tempoControlPlan } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Press resistance / exit vs high press" help="Plan when opponents step up aggressively.">
          <TextArea
            value={ip.pressResistancePlan ?? ''}
            onChange={(pressResistancePlan) => patchContext({ inPossession: { ...ip, pressResistancePlan } })}
            maxLength={1500}
          />
        </Field>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="space-y-5">
        <Field label="First five seconds after winning the ball" help="Immediate priorities in transition.">
          <TextArea
            value={ot.firstFiveSecondsPlan ?? ''}
            onChange={(firstFiveSecondsPlan) => patchContext({ offensiveTransition: { ...ot, firstFiveSecondsPlan } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Directness level" help="How vertical we want to be in transition.">
          <TextArea
            value={ot.directnessPolicy ?? ''}
            onChange={(directnessPolicy) => patchContext({ offensiveTransition: { ...ot, directnessPolicy } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Runner priority profiles" help="Which runner profiles we prioritise.">
          <TextArea
            value={ot.runnerPriority ?? ''}
            onChange={(runnerPriority) => patchContext({ offensiveTransition: { ...ot, runnerPriority } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Trigger zones for transitions" help="Where ball wins should launch attacks.">
          <TextArea
            value={ot.triggerZones ?? ''}
            onChange={(triggerZones) => patchContext({ offensiveTransition: { ...ot, triggerZones } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Support structure (near options)" help="How we provide secure outlets in transition.">
          <TextArea
            value={ot.supportStructure ?? ''}
            onChange={(supportStructure) => patchContext({ offensiveTransition: { ...ot, supportStructure } })}
            maxLength={1500}
          />
        </Field>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="space-y-5">
        <Field label="Primary chance-creation pattern" help="The main pattern we want to manufacture goals from.">
          <TextArea
            value={fin.chanceCreationPattern ?? ''}
            onChange={(chanceCreationPattern) => patchContext({ finishing: { ...fin, chanceCreationPattern } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Box occupation rules" help="How we populate and time runs inside the box.">
          <TextArea
            value={fin.boxOccupationRules ?? ''}
            onChange={(boxOccupationRules) => patchContext({ finishing: { ...fin, boxOccupationRules } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Shot selection policy" help="When we shoot vs recycle or combine.">
          <TextArea
            value={fin.shotSelectionPolicy ?? ''}
            onChange={(shotSelectionPolicy) => patchContext({ finishing: { ...fin, shotSelectionPolicy } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Crossing policy" help="When and how we cross.">
          <TextArea
            value={fin.crossingPolicy ?? ''}
            onChange={(crossingPolicy) => patchContext({ finishing: { ...fin, crossingPolicy } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Cut-back policy" help="Cut-back zones and triggers.">
          <TextArea
            value={fin.cutbackPolicy ?? ''}
            onChange={(cutbackPolicy) => patchContext({ finishing: { ...fin, cutbackPolicy } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Fallback when settled attack stalls" help="Plan B when the block will not break.">
          <TextArea
            value={fin.setAttackFallbackPlan ?? ''}
            onChange={(setAttackFallbackPlan) => patchContext({ finishing: { ...fin, setAttackFallbackPlan } })}
            maxLength={1200}
          />
        </Field>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="space-y-5">
        <Field label="Pressing height" help="Default line of engagement.">
          <select
            value={oop.pressingHeight ?? ''}
            onChange={(e) =>
              patchContext({
                outOfPossession: {
                  ...oop,
                  pressingHeight: e.target.value
                    ? (e.target.value as (typeof pressingHeights)[number])
                    : undefined,
                },
              })
            }
            className={pipelineInputClass}
          >
            <option value="">—</option>
            {pressingHeights.map((h) => (
              <option key={h} value={h}>
                {labelForPlayingStyleOption(h)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Defensive block structure" help="Lines, distances, and roles out of possession.">
          <TextArea
            value={oop.blockStructure ?? ''}
            onChange={(blockStructure) => patchContext({ outOfPossession: { ...oop, blockStructure } })}
            maxLength={1000}
          />
        </Field>
        <Field label="Press triggers" help="Cues that launch coordinated pressure.">
          <TextArea
            value={oop.pressingTriggers ?? ''}
            onChange={(pressingTriggers) => patchContext({ outOfPossession: { ...oop, pressingTriggers } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Central protection rules" help="How we protect the middle.">
          <TextArea
            value={oop.centralProtectionRules ?? ''}
            onChange={(centralProtectionRules) =>
              patchContext({ outOfPossession: { ...oop, centralProtectionRules } })
            }
            maxLength={1500}
          />
        </Field>
        <Field label="Wide defending principles" help="Full-back / winger interactions in defence.">
          <TextArea
            value={oop.wideDefendingRules ?? ''}
            onChange={(wideDefendingRules) => patchContext({ outOfPossession: { ...oop, wideDefendingRules } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Line compactness rules" help="Vertical spacing between lines.">
          <TextArea
            value={oop.lineCompactnessRules ?? ''}
            onChange={(lineCompactnessRules) => patchContext({ outOfPossession: { ...oop, lineCompactnessRules } })}
            maxLength={1500}
          />
        </Field>
      </div>
    )
  }

  if (step === 5) {
    return (
      <div className="space-y-5">
        <Field label="Transition approach after losing the ball" help="Counter-press vs regroup vs mixed.">
          <select
            value={dt.transitionApproach ?? ''}
            onChange={(e) =>
              patchContext({
                defensiveTransition: {
                  ...dt,
                  transitionApproach: e.target.value
                    ? (e.target.value as (typeof transitionApproaches)[number])
                    : undefined,
                },
              })
            }
            className={pipelineInputClass}
          >
            <option value="">—</option>
            {transitionApproaches.map((t) => (
              <option key={t} value={t}>
                {labelForPlayingStyleOption(t)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Rest-defence plan" help="How we secure danger when the press fails.">
          <TextArea
            value={dt.restDefensePlan ?? ''}
            onChange={(restDefensePlan) => patchContext({ defensiveTransition: { ...dt, restDefensePlan } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Tactical foul policy" help="Where and when fouling is acceptable.">
          <TextArea
            value={dt.tacticalFoulPolicy ?? ''}
            onChange={(tacticalFoulPolicy) => patchContext({ defensiveTransition: { ...dt, tacticalFoulPolicy } })}
            maxLength={1000}
          />
        </Field>
        <Field
          label="Counter-press duration (seconds)"
          help="How long we commit to immediate pressure (0–15), empty if not used."
        >
          <OptionalNumber
            value={dt.counterPressDurationSeconds ?? null}
            onChange={(counterPressDurationSeconds) =>
              patchContext({ defensiveTransition: { ...dt, counterPressDurationSeconds } })
            }
            min={0}
            max={15}
            step={1}
          />
        </Field>
        <Field label="Emergency recovery shape" help="Shape when we are opened up quickly.">
          <TextArea
            value={dt.emergencyRecoveryShape ?? ''}
            onChange={(emergencyRecoveryShape) =>
              patchContext({ defensiveTransition: { ...dt, emergencyRecoveryShape } })
            }
            maxLength={1200}
          />
        </Field>
      </div>
    )
  }

  if (step === 6) {
    return (
      <div className="space-y-5">
        <Field label="Attacking corners plan">
          <TextArea
            value={sp.attackingCornersPlan ?? ''}
            onChange={(attackingCornersPlan) => patchContext({ setPieces: { ...sp, attackingCornersPlan } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Defensive set-piece plan">
          <TextArea
            value={sp.defensiveSetPiecePlan ?? ''}
            onChange={(defensiveSetPiecePlan) => patchContext({ setPieces: { ...sp, defensiveSetPiecePlan } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Throw-in organisation">
          <TextArea
            value={sp.throwInPlan ?? ''}
            onChange={(throwInPlan) => patchContext({ setPieces: { ...sp, throwInPlan } })}
            maxLength={1000}
          />
        </Field>
        <Field label="Attacking free kick plan">
          <TextArea
            value={sp.attackingFreeKickPlan ?? ''}
            onChange={(attackingFreeKickPlan) => patchContext({ setPieces: { ...sp, attackingFreeKickPlan } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Defensive free kick plan">
          <TextArea
            value={sp.defensiveFreeKickPlan ?? ''}
            onChange={(defensiveFreeKickPlan) => patchContext({ setPieces: { ...sp, defensiveFreeKickPlan } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Second-ball plan">
          <TextArea
            value={sp.secondBallPlan ?? ''}
            onChange={(secondBallPlan) => patchContext({ setPieces: { ...sp, secondBallPlan } })}
            maxLength={1200}
          />
        </Field>
      </div>
    )
  }

  if (step === 7) {
    return (
      <div className="space-y-5">
        <Field label="Key role profiles" help="Critical roles and ideal player prototypes.">
          <TextArea
            value={pp.keyRoleProfiles ?? ''}
            onChange={(keyRoleProfiles) => patchContext({ playerProfiles: { ...pp, keyRoleProfiles } })}
            maxLength={2500}
          />
        </Field>
        <Field label="Recruitment style-fit rules" help="How we judge fit in the market.">
          <TextArea
            value={pp.recruitmentFitRules ?? ''}
            onChange={(recruitmentFitRules) => patchContext({ playerProfiles: { ...pp, recruitmentFitRules } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Academy alignment rules" help="How academy players are channelled into the model.">
          <TextArea
            value={pp.academyFitRules ?? ''}
            onChange={(academyFitRules) => patchContext({ playerProfiles: { ...pp, academyFitRules } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Role depth targets" help="How many alternatives we want per key role.">
          <TextArea
            value={pp.roleDepthRequirements ?? ''}
            onChange={(roleDepthRequirements) =>
              patchContext({ playerProfiles: { ...pp, roleDepthRequirements } })
            }
            maxLength={1500}
          />
        </Field>
        <Field label="Leadership profile criteria">
          <TextArea
            value={pp.leadershipProfileRules ?? ''}
            onChange={(leadershipProfileRules) =>
              patchContext({ playerProfiles: { ...pp, leadershipProfileRules } })
            }
            maxLength={1200}
          />
        </Field>
        <Field label="Physical threshold criteria">
          <TextArea
            value={pp.physicalThresholdRules ?? ''}
            onChange={(physicalThresholdRules) =>
              patchContext({ playerProfiles: { ...pp, physicalThresholdRules } })
            }
            maxLength={1200}
          />
        </Field>
      </div>
    )
  }

  if (step === 8) {
    return (
      <div className="space-y-5">
        <Field label="Ahead in the game — management plan">
          <TextArea
            value={mm.gameStateAheadPlan ?? ''}
            onChange={(gameStateAheadPlan) => patchContext({ matchManagement: { ...mm, gameStateAheadPlan } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Behind in the game — risk and tempo plan">
          <TextArea
            value={mm.gameStateBehindPlan ?? ''}
            onChange={(gameStateBehindPlan) => patchContext({ matchManagement: { ...mm, gameStateBehindPlan } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Down to ten players">
          <TextArea
            value={mm.tenMenPlan ?? ''}
            onChange={(tenMenPlan) => patchContext({ matchManagement: { ...mm, tenMenPlan } })}
            maxLength={1000}
          />
        </Field>
        <Field label="Level score — management plan">
          <TextArea
            value={mm.equalGameStatePlan ?? ''}
            onChange={(equalGameStatePlan) => patchContext({ matchManagement: { ...mm, equalGameStatePlan } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Substitution model" help="Timing, profiles, and communication.">
          <TextArea
            value={mm.substitutionModel ?? ''}
            onChange={(substitutionModel) => patchContext({ matchManagement: { ...mm, substitutionModel } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Opponent-specific in-game tweaks">
          <TextArea
            value={mm.opponentSpecificAdjustments ?? ''}
            onChange={(opponentSpecificAdjustments) =>
              patchContext({ matchManagement: { ...mm, opponentSpecificAdjustments } })
            }
            maxLength={1500}
          />
        </Field>
      </div>
    )
  }

  if (step === 9) {
    return (
      <div className={pipelineGridClass}>
        <Field label="Target possession %" help="Leave empty if not tracked (20–80).">
          <OptionalNumber
            value={kpi.possessionPctTarget ?? null}
            onChange={(possessionPctTarget) => patchContext({ kpiTargets: { ...kpi, possessionPctTarget } })}
            min={20}
            max={80}
            step={1}
          />
        </Field>
        <Field label="PPDA target" help="Passes per defensive action (1–30).">
          <OptionalNumber
            value={kpi.ppdaTarget ?? null}
            onChange={(ppdaTarget) => patchContext({ kpiTargets: { ...kpi, ppdaTarget } })}
            min={1}
            max={30}
            step={0.1}
          />
        </Field>
        <Field label="Final-third entries target">
          <OptionalNumber
            value={kpi.finalThirdEntriesTarget ?? null}
            onChange={(finalThirdEntriesTarget) =>
              patchContext({ kpiTargets: { ...kpi, finalThirdEntriesTarget } })
            }
            min={0}
            max={200}
            step={1}
          />
        </Field>
        <Field label="Box entries target">
          <OptionalNumber
            value={kpi.boxEntriesTarget ?? null}
            onChange={(boxEntriesTarget) => patchContext({ kpiTargets: { ...kpi, boxEntriesTarget } })}
            min={0}
            max={100}
            step={1}
          />
        </Field>
        <Field label="High regains target">
          <OptionalNumber
            value={kpi.highRegainsTarget ?? null}
            onChange={(highRegainsTarget) => patchContext({ kpiTargets: { ...kpi, highRegainsTarget } })}
            min={0}
            max={60}
            step={1}
          />
        </Field>
        <Field label="Field tilt % target" help="0–100.">
          <OptionalNumber
            value={kpi.fieldTiltPctTarget ?? null}
            onChange={(fieldTiltPctTarget) => patchContext({ kpiTargets: { ...kpi, fieldTiltPctTarget } })}
            min={0}
            max={100}
            step={0.1}
          />
        </Field>
        <Field label="Transition xG for (target)" help="0–5 per match scale.">
          <OptionalNumber
            value={kpi.transitionXgForTarget ?? null}
            onChange={(transitionXgForTarget) => patchContext({ kpiTargets: { ...kpi, transitionXgForTarget } })}
            min={0}
            max={5}
            step={0.01}
          />
        </Field>
        <Field label="Transition xG against (cap)">
          <OptionalNumber
            value={kpi.transitionXgAgainstCap ?? null}
            onChange={(transitionXgAgainstCap) => patchContext({ kpiTargets: { ...kpi, transitionXgAgainstCap } })}
            min={0}
            max={5}
            step={0.01}
          />
        </Field>
        <Field label="Set-piece xG for (target)">
          <OptionalNumber
            value={kpi.setPieceXgForTarget ?? null}
            onChange={(setPieceXgForTarget) => patchContext({ kpiTargets: { ...kpi, setPieceXgForTarget } })}
            min={0}
            max={3}
            step={0.01}
          />
        </Field>
        <Field label="Set-piece xG against (cap)">
          <OptionalNumber
            value={kpi.setPieceXgAgainstCap ?? null}
            onChange={(setPieceXgAgainstCap) => patchContext({ kpiTargets: { ...kpi, setPieceXgAgainstCap } })}
            min={0}
            max={3}
            step={0.01}
          />
        </Field>
      </div>
    )
  }

  if (step === 10) {
    return (
      <div className="space-y-5">
        <p className={pipelineSectionTitleClass}>Season priorities</p>
        <Field label="Season one focus">
          <TextArea
            value={road.seasonOneFocus ?? ''}
            onChange={(seasonOneFocus) => patchContext({ implementationRoadmap: { ...road, seasonOneFocus } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Season two focus">
          <TextArea
            value={road.seasonTwoFocus ?? ''}
            onChange={(seasonTwoFocus) => patchContext({ implementationRoadmap: { ...road, seasonTwoFocus } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Season three focus">
          <TextArea
            value={road.seasonThreeFocus ?? ''}
            onChange={(seasonThreeFocus) => patchContext({ implementationRoadmap: { ...road, seasonThreeFocus } })}
            maxLength={2000}
          />
        </Field>
        <Field label="Monthly milestones">
          <TextArea
            value={road.monthlyMilestones ?? ''}
            onChange={(monthlyMilestones) => patchContext({ implementationRoadmap: { ...road, monthlyMilestones } })}
            maxLength={2500}
          />
        </Field>
        <Field label="Capability gaps">
          <TextArea
            value={road.capabilityGaps ?? ''}
            onChange={(capabilityGaps) => patchContext({ implementationRoadmap: { ...road, capabilityGaps } })}
            maxLength={1500}
          />
        </Field>
        <Field label="Hiring plan for the team">
          <TextArea
            value={road.hiringPlan ?? ''}
            onChange={(hiringPlan) => patchContext({ implementationRoadmap: { ...road, hiringPlan } })}
            maxLength={1500}
          />
        </Field>
      </div>
    )
  }

  if (step === 11) {
    return (
      <div className="space-y-5">
        <div className={pipelineGridClass}>
          <Field label="Owner (accountable executive)">
            <input
              value={gov.owner ?? ''}
              onChange={(e) => patchContext({ governance: { ...gov, owner: e.target.value } })}
              maxLength={120}
              className={pipelineInputClass}
            />
          </Field>
          <Field label="Technical owner">
            <input
              value={gov.technicalOwner ?? ''}
              onChange={(e) => patchContext({ governance: { ...gov, technicalOwner: e.target.value } })}
              maxLength={120}
              className={pipelineInputClass}
            />
          </Field>
          <Field label="Review cadence">
            <input
              value={gov.reviewCadence ?? ''}
              onChange={(e) => patchContext({ governance: { ...gov, reviewCadence: e.target.value } })}
              maxLength={120}
              className={pipelineInputClass}
            />
          </Field>
          <Field label="Decision forum / board">
            <input
              value={gov.decisionForum ?? ''}
              onChange={(e) => patchContext({ governance: { ...gov, decisionForum: e.target.value } })}
              maxLength={240}
              className={pipelineInputClass}
            />
          </Field>
        </div>
        <Field label="Approval rules">
          <TextArea
            value={gov.approvalRules ?? ''}
            onChange={(approvalRules) => patchContext({ governance: { ...gov, approvalRules } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Escalation rules">
          <TextArea
            value={gov.escalationRules ?? ''}
            onChange={(escalationRules) => patchContext({ governance: { ...gov, escalationRules } })}
            maxLength={1200}
          />
        </Field>
        <Field label="Working notes" help="Internal notes; stored on the record context.">
          <TextArea
            value={context.notes ?? ''}
            onChange={(notes) => patchContext({ notes })}
            maxLength={4000}
          />
        </Field>
      </div>
    )
  }

  return null
}
