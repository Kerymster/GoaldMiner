import { createEmptyScoutReportForm, type ScoutReportForm } from '../types/scoutReportForm'

export type MockScoutReportRecord = {
  id: string
  form: ScoutReportForm
}

function entry(
  id: string,
  reportDate: string,
  init: (form: ScoutReportForm) => void,
): MockScoutReportRecord {
  const form = createEmptyScoutReportForm()
  form.reportDate = reportDate
  init(form)
  return { id, form }
}

/** In-memory mock list (`ScoutReportForm`) — replace with API when ready. */
export const MOCK_SCOUT_REPORTS: MockScoutReportRecord[] = [
  entry('sr-mock-marco-1', '2025-10-12', (f) => {
    f.playerInformation.name = 'Marco Ruiz'
    f.playerInformation.club = 'CD Castellón'
    f.playerInformation.position = 'LW'
    f.playerInformation.nationality = 'Spain'
    f.playerInformation.ageOrDob = '22'
    f.playerInformation.heightWeight = '178 cm / 72 kg'
    f.playerInformation.preferredFoot = 'Right'
    f.playerInformation.contractIfKnown = '2027 (club option)'
    f.playingStyle.role = 'Direct wide forward'
    f.playingStyle.systemFit = 'Counter and wide overloads; less ideal in slow circulation.'
    f.executiveSummary.narrative =
      'Pace-heavy winger who stretches back lines. Crossing selection is still raw; better in transition than settled possession. Risky but interesting for counter-heavy sides.'
    f.strengthsWeaknesses.strengths = 'Acceleration, willingness to take defenders on.'
    f.strengthsWeaknesses.weaknesses = 'Final ball and defensive tracking from the front.'
    f.teamFit.transferRecommendation = 'Loan with option if minutes are guaranteed.'
    f.teamFit.finalVerdict = 'Developmental target — not a day-one starter at a higher level.'
    f.teamFit.ratingOutOfFive = 3
  }),
  entry('sr-mock-marco-2', '2026-01-08', (f) => {
    f.playerInformation.name = 'Marco Ruiz'
    f.playerInformation.club = 'CD Castellón'
    f.playerInformation.position = 'LW'
    f.playerInformation.nationality = 'Spain'
    f.playerInformation.ageOrDob = '22'
    f.playerInformation.heightWeight = '178 cm / 72 kg'
    f.playerInformation.preferredFoot = 'Right'
    f.playerInformation.contractIfKnown = '2027 (club option)'
    f.playingStyle.role = 'Inside-cutting winger'
    f.playingStyle.systemFit = 'Better when he can combine narrow and attack the box late.'
    f.executiveSummary.narrative =
      'Six months on: decision-making in the box improved; still loses structure when pressed. Same athletic profile, clearer ceiling if coached in a defined role.'
    f.teamFit.finalVerdict = 'Worth a second look if the price stays modest.'
    f.teamFit.ratingOutOfFive = 4
  }),
]

export function uniquePlayerNamesFromMock(): string[] {
  const set = new Set<string>()
  for (const { form } of MOCK_SCOUT_REPORTS) {
    const n = form.playerInformation.name.trim()
    if (n) set.add(n)
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}

export function filterPlayersByQuery(query: string): string[] {
  const q = query.trim().toLowerCase()
  if (!q) return uniquePlayerNamesFromMock()
  return uniquePlayerNamesFromMock().filter((name) => name.toLowerCase().includes(q))
}

export function reportsForPlayerName(playerName: string): MockScoutReportRecord[] {
  const target = playerName.trim().toLowerCase()
  return MOCK_SCOUT_REPORTS.filter(
    (r) => r.form.playerInformation.name.trim().toLowerCase() === target,
  ).sort((a, b) => b.form.reportDate.localeCompare(a.form.reportDate))
}

/** Mock names that have at least one report and match `query` (for demo picker). */
export function mockReportPlayerNameSuggestions(
  query: string,
  excludeNamesLower: Set<string>,
): string[] {
  const q = query.trim().toLowerCase()
  const names = uniquePlayerNamesFromMock()
  return names.filter((name) => {
    const n = name.toLowerCase()
    if (excludeNamesLower.has(n)) return false
    if (!q) return true
    return n.includes(q)
  })
}

export function getMockReportById(id: string): MockScoutReportRecord | undefined {
  return MOCK_SCOUT_REPORTS.find((r) => r.id === id)
}
