/** Create / edit stepper — 7 sections aligned with API `stage` 1–7. */
export const ORGANIZATION_FORM_STEPS = [
  {
    title: 'Governance & sporting decision-making',
    description:
      'How the club is run: context, board vs sporting line, roles, decision rights, committees, escalation, ethics, and document versioning.',
  },
  {
    title: 'Sporting operations & department architecture',
    description:
      'Department inventory, reporting lines, core process ownership, capacity, facilities, outsourcing, org chart, and capability gaps.',
  },
  {
    title: 'Development system: training, learning & technical standards',
    description:
      'Link to playing philosophy, age-group matrix, curriculum, coach standards, evaluation cadence, video routine, terminology, and KPIs.',
  },
  {
    title: 'Academy & performance pathway',
    description:
      'Pathway stages, transition decisions, load policy, dual career, scouting, first-team bridge, exit policy, and women’s / parallel notes.',
  },
  {
    title: 'Health, performance science & player welfare',
    description:
      'Medical structure, MDT roles, screening, load & injury monitoring, RTP, mental health, nutrition, and minimum standards.',
  },
  {
    title: 'Data, analytics & information management',
    description:
      'Data inventory, integrations, reporting rituals, decision-support rules, access & privacy, quality, roadmap, and continuity.',
  },
  {
    title: 'Corporate interface (admin, finance, legal, comms)',
    description:
      'Budget process, spending authority, compliance, HR interface, communications & crisis, stakeholders, and contract lifecycle.',
  },
] as const

export type OrganizationFormStepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6
