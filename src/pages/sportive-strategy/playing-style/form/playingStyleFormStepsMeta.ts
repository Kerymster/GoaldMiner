/** Create / edit stepper — 12 sections aligned with API `stage` 1–12. */
export const PLAYING_STYLE_FORM_STEPS = [
  { title: 'Identity', description: 'Vision, statement, model, and coach fit.' },
  { title: 'In possession', description: 'Build-up, progression, and tempo.' },
  { title: 'Offensive transition', description: 'First seconds after winning the ball.' },
  { title: 'Finishing', description: 'Chance patterns and box behaviour.' },
  { title: 'Out of possession', description: 'Pressing height, block, and triggers.' },
  { title: 'Defensive transition', description: 'Loss of ball and rest-defence.' },
  { title: 'Set pieces', description: 'Corners, free kicks, and second balls.' },
  { title: 'Player profiles', description: 'Roles, recruitment fit, and depth.' },
  { title: 'Match management', description: 'Game states and substitutions.' },
  { title: 'KPI targets', description: 'Possession, PPDA, and transition goals.' },
  { title: 'Implementation roadmap', description: 'Season focus and milestones.' },
  { title: 'Governance', description: 'Owners, cadence, and notes.' },
] as const

export type PlayingStyleFormStepIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
