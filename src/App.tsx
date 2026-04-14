import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ComparePage } from './pages/compare/ComparePage'
import { LeagueDetailPage } from './pages/leagues/LeagueDetailPage'
import { AllLeaguesPage } from './pages/all-leagues/AllLeaguesPage'
import { PlayerDetailPage } from './pages/players/PlayerDetailPage'
import { PlayerListPage } from './pages/PlayerListPage'
import { TeamDetailPage } from './pages/TeamDetailPage'
import { TeamsPage } from './pages/teams/TeamsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/players" replace />} />
          <Route path="players" element={<PlayerListPage />} />
          <Route path="players/:id" element={<PlayerDetailPage />} />
          <Route path="leagues" element={<AllLeaguesPage />} />
          <Route path="leagues/:leagueId" element={<LeagueDetailPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="teams/:teamId" element={<TeamDetailPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="*" element={<Navigate to="/players" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
