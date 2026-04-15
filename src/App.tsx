import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ComparePage } from './pages/compare/ComparePage'
import { LeagueDetailPage } from './pages/leagues/LeagueDetailPage'
import { AllLeaguesPage } from './pages/all-leagues/AllLeaguesPage'
import { PlayerDetailPage } from './pages/players/PlayerDetailPage'
import { AllPlayersPage } from './pages/players/AllPlayersPage'
import { TeamDetailPage } from './pages/teams/TeamDetailPage'
import { TeamsPage } from './pages/teams/TeamsPage'
import { CreateReportPage } from './pages/player-reports/CreateReportPage'
import { ScoutReportDetailPage } from './pages/player-reports/detail/ScoutReportDetailPage'
import { ViewReportsPage } from './pages/player-reports/ViewReportsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/players" replace />} />
          <Route path="players" element={<AllPlayersPage />} />
          <Route path="players/:id" element={<PlayerDetailPage />} />
          <Route path="leagues" element={<AllLeaguesPage />} />
          <Route path="leagues/:leagueId" element={<LeagueDetailPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="teams/:teamId" element={<TeamDetailPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="player-reports" element={<ViewReportsPage />} />
          <Route path="player-reports/create" element={<CreateReportPage />} />
          <Route path="player-reports/report/:reportId" element={<ScoutReportDetailPage />} />
          <Route path="*" element={<Navigate to="/players" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
