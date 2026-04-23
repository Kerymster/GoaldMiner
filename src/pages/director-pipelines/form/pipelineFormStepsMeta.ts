/** Create / edit stepper labels — used by progress UI and step body titles. */
export const PIPELINE_FORM_STEPS = [
  { title: 'Core mandate', description: 'Required fields that define the objective window and baseline intent.' },
  { title: 'Club and ownership', description: 'Context around club profile and board logic.' },
  { title: 'Objectives and playing identity', description: 'Sporting direction and on-pitch principles.' },
  { title: 'Financial and squad strategy', description: 'Budget boundaries and squad construction philosophy.' },
  {
    title: 'Constraints, stakeholders and review',
    description: 'Risk map, reporting lines, and final mandate summary.',
  },
] as const

export type PipelineFormStepIndex = 0 | 1 | 2 | 3 | 4
