import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ApiUnauthorizedBridge } from './bootstrap/ApiUnauthorizedBridge'
import { Layout } from './components/layout/Layout'
import { ComparePage } from './pages/compare'
import { PlayerDetailPage } from './pages/players/player-detail'
import { AllPlayersPage } from './pages/players/all-players'
import { NewPlayerPage } from './pages/players/new'
import { EditPlayerPage } from './pages/players/edit'
import { CreateReportPage } from './pages/player-reports/create-report'
import { EditReportsPage } from './pages/player-reports/edit-reports'
import { ScoutReportDetailPage } from './pages/player-reports/detail/scout-report'
import { ScoutReportEditPage } from './pages/player-reports/detail/scout-report-edit'
import { ViewReportsPage } from './pages/player-reports/view-reports'
import { CreateDraftReportPage } from './pages/draft-reports/create-report'
import { EditDraftReportsPage } from './pages/draft-reports/edit-reports'
import { ViewDraftReportsPage } from './pages/draft-reports/view-reports'
import { DraftReportEditPage } from './pages/draft-reports/detail/draft-report-edit'
import { CreateDirectorPipelinePage } from './pages/director-pipelines/create'
import { EditDirectorPipelinePage } from './pages/director-pipelines/edit'
import { ViewDirectorPipelinesPage } from './pages/director-pipelines/view'
import { DirectorPipelineDetailPage } from './pages/director-pipelines/detail'
import { ViewPlayingStylesPage } from './pages/sportive-strategy/playing-style'
import { CreatePlayingStylePage } from './pages/sportive-strategy/playing-style/create'
import { EditPlayingStylePage } from './pages/sportive-strategy/playing-style/edit'
import { PlayingStyleDetailPage } from './pages/sportive-strategy/playing-style/detail'
import { ViewOrganizationsPage } from './pages/sportive-strategy/organization'
import { CreateOrganizationPage } from './pages/sportive-strategy/organization/create'
import { EditOrganizationPage } from './pages/sportive-strategy/organization/edit'
import { OrganizationDetailPage } from './pages/sportive-strategy/organization/detail'
import { RecruitmentPage } from './pages/sportive-strategy/recruitment'
import { ProtectedRoute } from './components/routing/ProtectedRoute'
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
            <Route path="players/new" element={<NewPlayerPage />} />
            <Route path="players/:id/edit" element={<EditPlayerPage />} />
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
            <Route path="draft-reports" element={<ViewDraftReportsPage />} />
            <Route path="draft-reports/edit" element={<EditDraftReportsPage />} />
            <Route path="draft-reports/create" element={<CreateDraftReportPage />} />
            <Route path="draft-reports/:draftId/edit" element={<DraftReportEditPage />} />
            <Route path="director-pipelines" element={<ViewDirectorPipelinesPage />} />
            <Route path="director-pipelines/create" element={<CreateDirectorPipelinePage />} />
            <Route path="director-pipelines/edit" element={<EditDirectorPipelinePage />} />
            <Route path="director-pipelines/:pipelineId" element={<DirectorPipelineDetailPage />} />
            <Route path="sportive-strategy/playing-style/create" element={<CreatePlayingStylePage />} />
            <Route path="sportive-strategy/playing-style/edit" element={<EditPlayingStylePage />} />
            <Route path="sportive-strategy/playing-style/:playingStyleId" element={<PlayingStyleDetailPage />} />
            <Route path="sportive-strategy/playing-style" element={<ViewPlayingStylesPage />} />
            <Route path="sportive-strategy/organization/create" element={<CreateOrganizationPage />} />
            <Route path="sportive-strategy/organization/edit" element={<EditOrganizationPage />} />
            <Route path="sportive-strategy/organization/:organizationId" element={<OrganizationDetailPage />} />
            <Route path="sportive-strategy/organization" element={<ViewOrganizationsPage />} />
            <Route path="sportive-strategy/recruitment" element={<RecruitmentPage />} />
            <Route path="*" element={<Navigate to="/players" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

