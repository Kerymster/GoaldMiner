import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ApiUnauthorizedBridge } from './bootstrap/ApiUnauthorizedBridge'
import { Layout } from './components/Layout'
import { ComparePage } from './pages/compare'
import { PlayerDetailPage } from './pages/players/player-detail'
import { AllPlayersPage } from './pages/players/all-players'
import { CreateReportPage } from './pages/player-reports/create-report'
import { EditReportsPage } from './pages/player-reports/edit-reports'
import { ScoutReportDetailPage } from './pages/player-reports/detail/scout-report'
import { ScoutReportEditPage } from './pages/player-reports/detail/scout-report-edit'
import { ViewReportsPage } from './pages/player-reports/view-reports'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/auth/login'
import { RegisterPage } from './pages/auth/register'

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
            <Route path="player-reports/edit" element={<EditReportsPage />} />
            <Route path="player-reports/create" element={<CreateReportPage />} />
            <Route
              path="player-reports/players/:playerId/reports/:reportId/edit"
              element={<ScoutReportEditPage />}
            />
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
