import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  activatePlayingStyle,
  archivePlayingStyle,
  deletePlayingStyle,
  getActivePlayingStyle,
  listPlayingStyles,
} from '../../../api/playingStyle'
import { EmptyState } from '../../../components/empty-state/EmptyState'
import { Modal } from '../../../components/modal/Modal'
import { proseErrorSm, proseMutedSm } from '../../../components/styles/pageChromeStyles'
import { isApiErr } from '../../../types/api'
import type { PlayingStyleRecord } from '../../../types/playingStyle'
import { PlayingStyleListRow } from './PlayingStyleListRow'
import { playingStyleListRowTitle } from './playingStyleListFormat'
import {
  pipelineCardClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
} from './playingStyleStyles'

type StatusFilter = 'all' | 'active' | 'archived'

type PendingAction =
  | { kind: 'archive'; row: PlayingStyleRecord }
  | { kind: 'activate'; row: PlayingStyleRecord }
  | { kind: 'delete'; row: PlayingStyleRecord }

export function PlayingStylesList() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<PlayingStyleRecord[]>([])
  const [hasActiveRecord, setHasActiveRecord] = useState(false)
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null)
  const [actionBusy, setActionBusy] = useState(false)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const [items, activeRecord] = await Promise.all([
        listPlayingStyles(statusFilter),
        getActivePlayingStyle(),
      ])
      setRows(items)
      setHasActiveRecord(Boolean(activeRecord))
      setStatus('ready')
    } catch (e) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Playing styles could not be loaded.')
    }
  }, [statusFilter])

  useEffect(() => {
    void load()
  }, [load])

  async function performPendingAction() {
    if (!pendingAction) return
    const { kind, row } = pendingAction
    setActionBusy(true)
    setError(null)
    try {
      if (kind === 'archive') {
        await archivePlayingStyle(row.id)
      } else if (kind === 'activate') {
        await activatePlayingStyle(row.id)
      } else {
        await deletePlayingStyle(row.id)
      }
      setPendingAction(null)
      await load()
    } catch (e) {
      if (isApiErr(e) && e.status === 409) {
        if (kind === 'activate') {
          setError('An active playing style already exists. Archive it first, then try again.')
        } else if (kind === 'delete') {
          setError('Active records cannot be deleted. Archive this playing style first.')
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
          {!hasActiveRecord ? (
            <Link to="/sportive-strategy/playing-style/create" className={pipelinePrimaryButtonClass}>
              Create playing style
            </Link>
          ) : null}
        </div>
      </div>

      {status === 'loading' ? <p className={proseMutedSm}>Loading playing styles…</p> : null}
      {error ? <p className={proseErrorSm}>{error}</p> : null}

      {status === 'ready' && rows.length === 0 ? (
        <EmptyState
          title="No playing styles yet"
          description="Create your first playing style blueprint to align the club game model."
          helper="Only one playing style can be active at the same time."
          icon="fileCheck"
          extra={
            !hasActiveRecord ? (
              <Link to="/sportive-strategy/playing-style/create" className={pipelinePrimaryButtonClass}>
                Create playing style
              </Link>
            ) : undefined
          }
        />
      ) : null}

      {rows.length > 0 ? (
        <ul className="space-y-3">
          {rows.map((row) => (
            <PlayingStyleListRow
              key={row.id}
              row={row}
              onRequestArchive={() => setPendingAction({ kind: 'archive', row })}
              onRequestActivate={() => setPendingAction({ kind: 'activate', row })}
              onRequestDelete={() => setPendingAction({ kind: 'delete', row })}
            />
          ))}
        </ul>
      ) : null}

      {pendingAction ? (
        <Modal
          isOpen
          variant={pendingAction.kind === 'delete' ? 'danger' : 'confirmation'}
          title={
            pendingAction.kind === 'archive'
              ? 'Archive this playing style?'
              : pendingAction.kind === 'activate'
                ? 'Activate this playing style?'
                : 'Delete this playing style?'
          }
          description={
            pendingAction.kind === 'archive'
              ? `${playingStyleListRowTitle(pendingAction.row)} will move to archived status. You can create a new active record afterward, or re-activate this one when no other record is active.`
              : pendingAction.kind === 'activate'
                ? `${playingStyleListRowTitle(pendingAction.row)} will become your active playing style. If another record is already active, archive it first.`
                : `Permanently delete ${playingStyleListRowTitle(pendingAction.row)}? Only archived records can be removed. This cannot be undone.`
          }
          confirmLabel={
            pendingAction.kind === 'archive'
              ? 'Archive'
              : pendingAction.kind === 'activate'
                ? 'Activate'
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
