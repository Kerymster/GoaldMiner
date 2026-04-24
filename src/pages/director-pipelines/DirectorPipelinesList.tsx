import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  activateDirectorPipeline,
  archiveDirectorPipeline,
  deleteDirectorPipeline,
  getActiveDirectorPipeline,
  listDirectorPipelines,
} from '../../api/directorPipelines'
import { EmptyState } from '../../components/empty-state/EmptyState'
import { Modal } from '../../components/modal/Modal'
import { proseErrorSm, proseMutedSm } from '../../components/styles/pageChromeStyles'
import { isApiErr } from '../../types/api'
import { type DirectorPipeline } from '../../types/directorPipeline'
import { DirectorPipelineListRow } from './DirectorPipelineListRow'
import { DirectorPipelineSeasonCompare } from './DirectorPipelineSeasonCompare'
import { pipelineListRowTitle } from './directorPipelineListFormat'
import {
  pipelineCardClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
} from './directorPipelineStyles'

type StatusFilter = 'all' | 'active' | 'archived'

type PendingPipelineAction =
  | { kind: 'archive'; row: DirectorPipeline }
  | { kind: 'activate'; row: DirectorPipeline }
  | { kind: 'delete'; row: DirectorPipeline }

export function DirectorPipelinesList() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<DirectorPipeline[]>([])
  const [hasActivePipeline, setHasActivePipeline] = useState(false)
  const [selectedCompareId, setSelectedCompareId] = useState<string>('')
  const [pendingAction, setPendingAction] = useState<PendingPipelineAction | null>(null)
  const [actionBusy, setActionBusy] = useState(false)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const [items, activePipeline] = await Promise.all([
        listDirectorPipelines(statusFilter),
        getActiveDirectorPipeline(),
      ])
      setRows(items)
      setHasActivePipeline(Boolean(activePipeline))
      setStatus('ready')
    } catch (e) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Pipelines could not be loaded.')
    }
  }, [statusFilter])

  useEffect(() => {
    void load()
  }, [load])

  const active = useMemo(() => rows.find((row) => row.status === 'active') ?? null, [rows])
  const archived = useMemo(() => rows.filter((row) => row.status === 'archived'), [rows])
  const compareWith = useMemo(
    () => archived.find((row) => row.id === selectedCompareId) ?? archived[0] ?? null,
    [archived, selectedCompareId],
  )

  async function performPendingAction() {
    if (!pendingAction) return
    const { kind, row } = pendingAction
    setActionBusy(true)
    setError(null)
    try {
      if (kind === 'archive') {
        await archiveDirectorPipeline(row.id)
      } else if (kind === 'activate') {
        await activateDirectorPipeline(row.id)
      } else {
        await deleteDirectorPipeline(row.id)
      }
      setPendingAction(null)
      await load()
    } catch (e) {
      if (isApiErr(e) && e.status === 409) {
        if (kind === 'activate') {
          setError('An active pipeline already exists. Archive it first, then try again.')
        } else if (kind === 'delete') {
          setError('Active pipelines cannot be deleted. Archive this pipeline first.')
        } else {
          setError(e.message || 'This action could not be completed (409).')
        }
      } else {
        setError(e instanceof Error ? e.message : 'Request failed.')
      }
      setPendingAction(null)
    } finally {
      setActionBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className={pipelineCardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(['all', 'active', 'archived'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatusFilter(item)}
                className={item === statusFilter ? pipelinePrimaryButtonClass : pipelineSecondaryButtonClass}
              >
                {item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          {!hasActivePipeline ? (
            <Link to="/director-pipelines/create" className={pipelinePrimaryButtonClass}>
              Create vision
            </Link>
          ) : null}
        </div>
      </div>

      {status === 'loading' ? <p className={proseMutedSm}>Loading pipelines…</p> : null}
      {error ? <p className={proseErrorSm}>{error}</p> : null}

      {status === 'ready' && rows.length === 0 ? (
        <EmptyState
          title="No pipelines yet"
          description="Create your first club vision pipeline to set strategic direction."
          helper="Only one pipeline can be active at the same time."
          icon="fileCheck"
          extra={
            !hasActivePipeline ? (
              <Link to="/director-pipelines/create" className={pipelinePrimaryButtonClass}>
                Create vision
              </Link>
            ) : undefined
          }
        />
      ) : null}

      {rows.length > 0 ? (
        <ul className="space-y-3">
          {rows.map((row) => (
            <DirectorPipelineListRow
              key={row.id}
              row={row}
              onRequestArchive={() => setPendingAction({ kind: 'archive', row })}
              onRequestActivate={() => setPendingAction({ kind: 'activate', row })}
              onRequestDelete={() => setPendingAction({ kind: 'delete', row })}
            />
          ))}
        </ul>
      ) : null}

      {active && compareWith ? (
        <DirectorPipelineSeasonCompare
          active={active}
          compareWith={compareWith}
          archived={archived}
          onSelectArchivedId={setSelectedCompareId}
        />
      ) : null}

      {pendingAction ? (
        <Modal
          isOpen
          variant={pendingAction.kind === 'delete' ? 'danger' : 'confirmation'}
          title={
            pendingAction.kind === 'archive'
              ? 'Archive this pipeline?'
              : pendingAction.kind === 'activate'
                ? 'Activate this pipeline?'
                : 'Delete this pipeline?'
          }
          description={
            pendingAction.kind === 'archive'
              ? `${pipelineListRowTitle(pendingAction.row)} will move to archived status. You can create a new active pipeline afterward, or re-activate this one when no other pipeline is active.`
              : pendingAction.kind === 'activate'
                ? `${pipelineListRowTitle(pendingAction.row)} will become your active club vision. If another pipeline is already active, archive it first.`
                : `Permanently delete ${pipelineListRowTitle(pendingAction.row)}? Only archived pipelines can be removed. This cannot be undone.`
          }
          confirmLabel={
            pendingAction.kind === 'archive'
              ? 'Archive pipeline'
              : pendingAction.kind === 'activate'
                ? 'Activate pipeline'
                : 'Delete permanently'
          }
          cancelLabel="Cancel"
          isConfirming={actionBusy}
          closeOnBackdrop={!actionBusy}
          onClose={() => {
            if (actionBusy) return
            setPendingAction(null)
          }}
          onConfirm={() => void performPendingAction()}
        />
      ) : null}
    </div>
  )
}
