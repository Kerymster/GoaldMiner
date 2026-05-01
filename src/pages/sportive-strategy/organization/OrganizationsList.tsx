import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  activateOrganization,
  archiveOrganization,
  deleteOrganization,
  getActiveOrganization,
  listOrganizations,
} from '../../../api/organization'
import { EmptyState } from '../../../components/empty-state/EmptyState'
import { Modal } from '../../../components/modal/Modal'
import { proseErrorSm, proseMutedSm } from '../../../components/styles/pageChromeStyles'
import { isApiErr } from '../../../types/api'
import type { OrganizationRecord } from '../../../types/organization'
import { OrganizationListRow } from './OrganizationListRow'
import { organizationListRowTitle } from './organizationListFormat'
import {
  pipelineCardClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
} from '../playing-style/playingStyleStyles'

type StatusFilter = 'all' | 'active' | 'archived'

type PendingAction =
  | { kind: 'archive'; row: OrganizationRecord }
  | { kind: 'activate'; row: OrganizationRecord }
  | { kind: 'delete'; row: OrganizationRecord }

export function OrganizationsList() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<OrganizationRecord[]>([])
  const [hasActiveRecord, setHasActiveRecord] = useState(false)
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null)
  const [actionBusy, setActionBusy] = useState(false)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const [items, activeRecord] = await Promise.all([
        listOrganizations(statusFilter),
        getActiveOrganization(),
      ])
      setRows(items)
      setHasActiveRecord(Boolean(activeRecord))
      setStatus('ready')
    } catch (e) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Organization records could not be loaded.')
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
        await archiveOrganization(row.id)
      } else if (kind === 'activate') {
        await activateOrganization(row.id)
      } else {
        await deleteOrganization(row.id)
      }
      setPendingAction(null)
      await load()
    } catch (e) {
      if (isApiErr(e) && e.status === 409) {
        if (kind === 'activate') {
          setError('An active organization blueprint already exists. Archive it first, then try again.')
        } else if (kind === 'delete') {
          setError('Active records cannot be deleted. Archive this blueprint first.')
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
            <Link to="/sportive-strategy/organization/create" className={pipelinePrimaryButtonClass}>
              Create organization blueprint
            </Link>
          ) : null}
        </div>
      </div>

      {status === 'loading' ? <p className={proseMutedSm}>Loading organization records…</p> : null}
      {error ? <p className={proseErrorSm}>{error}</p> : null}

      {status === 'ready' && rows.length === 0 ? (
        <EmptyState
          title="No organization blueprints yet"
          description="Capture governance, departments, pathway, medical, data, and corporate interfaces in one place."
          helper="Only one organization blueprint can be active at the same time."
          icon="fileCheck"
          extra={
            !hasActiveRecord ? (
              <Link to="/sportive-strategy/organization/create" className={pipelinePrimaryButtonClass}>
                Create organization blueprint
              </Link>
            ) : undefined
          }
        />
      ) : null}

      {rows.length > 0 ? (
        <ul className="space-y-3">
          {rows.map((row) => (
            <OrganizationListRow
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
              ? 'Archive this blueprint?'
              : pendingAction.kind === 'activate'
                ? 'Activate this blueprint?'
                : 'Delete this blueprint?'
          }
          description={
            pendingAction.kind === 'archive'
              ? `${organizationListRowTitle(pendingAction.row)} will move to archived status. You can create a new active record afterward, or re-activate this one when no other record is active.`
              : pendingAction.kind === 'activate'
                ? `${organizationListRowTitle(pendingAction.row)} will become your active organization blueprint. If another record is already active, archive it first.`
                : `Permanently delete ${organizationListRowTitle(pendingAction.row)}? Only archived records can be removed. This cannot be undone.`
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
