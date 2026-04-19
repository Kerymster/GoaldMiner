import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ApiUnauthorizedBridge } from './components/ApiUnauthorizedBridge'
import { Layout } from './components/Layout'
import { ComparePage } from './pages/compare/ComparePage'
import { PlayerDetailPage } from './pages/players/PlayerDetailPage'
import { AllPlayersPage } from './pages/players/AllPlayersPage'
import { CreateReportPage } from './pages/player-reports/CreateReportPage'
import { ScoutReportDetailPage } from './pages/player-reports/detail/ScoutReportDetailPage'
import { ViewReportsPage } from './pages/player-reports/ViewReportsPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'

export default function App() {
  return (
    <BrowserRouter>
      <ApiUnauthorizedBridge />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/players" replace />} />
            <Route path="players" element={<AllPlayersPage />} />
            <Route path="players/:id" element={<PlayerDetailPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="player-reports" element={<ViewReportsPage />} />
            <Route path="player-reports/create" element={<CreateReportPage />} />
            <Route
              path="player-reports/players/:playerId/reports/:reportId"
              element={<ScoutReportDetailPage />}
            />
            <Route path="player-reports/report/:reportId" element={<Navigate to="/player-reports" replace />} />
            <Route path="*" element={<Navigate to="/players" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
