/** Create / edit stepper — titles only; step body copy stays in field labels. */
export const PIPELINE_FORM_STEPS = [
  { title: 'Core mandate', description: '' },
  { title: 'Club and ownership', description: '' },
  { title: 'Objectives and playing identity', description: '' },
  { title: 'Financial and squad strategy', description: '' },
  { title: 'Constraints, stakeholders and review', description: '' },
] as const

export type PipelineFormStepIndex = 0 | 1 | 2 | 3 | 4
