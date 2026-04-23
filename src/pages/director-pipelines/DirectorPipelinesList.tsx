import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  activateDirectorPipeline,
  archiveDirectorPipeline,
  deleteDirectorPipeline,
  listDirectorPipelines,
} from '../../api/directorPipelines'
import { EmptyState } from '../../components/empty-state/EmptyState'
import { proseErrorSm, proseMutedSm } from '../../components/styles/pageChromeStyles'
import { isApiErr } from '../../types/api'
import { buildMandateBrief, labelForOption, type DirectorPipeline } from '../../types/directorPipeline'
import {
  pipelineCardClass,
  pipelineDangerButtonClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
} from './directorPipelineStyles'

type StatusFilter = 'all' | 'active' | 'archived'

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}

export function DirectorPipelinesList() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<DirectorPipeline[]>([])
  const [selectedCompareId, setSelectedCompareId] = useState<string>('')

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const items = await listDirectorPipelines(statusFilter)
      setRows(items)
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

  async function handleArchive(id: string) {
    try {
      await archiveDirectorPipeline(id)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Archive failed.')
    }
  }

  async function handleActivate(id: string) {
    try {
      await activateDirectorPipeline(id)
      await load()
    } catch (e) {
      if (isApiErr(e) && e.status === 409) {
        setError('An active pipeline already exists. Archive it first.')
      } else {
        setError(e instanceof Error ? e.message : 'Activation failed.')
      }
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDirectorPipeline(id)
      await load()
    } catch (e) {
      if (isApiErr(e) && e.status === 409) {
        setError('Active pipelines cannot be deleted. Archive first.')
      } else {
        setError(e instanceof Error ? e.message : 'Delete failed.')
      }
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
          <Link to="/director-pipelines/create" className={pipelinePrimaryButtonClass}>
            Create vision
          </Link>
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
            <Link to="/director-pipelines/create" className={pipelinePrimaryButtonClass}>
              Create vision
            </Link>
          }
        />
      ) : null}

      {rows.length > 0 ? (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={row.id} className={pipelineCardClass}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-fume-900 dark:text-fume-100">
                    {row.title?.trim() || row.context.club.clubName}
                  </p>
                  <p className="text-xs text-fume-500 dark:text-fume-400">
                    {row.status.toUpperCase()} · Updated {formatDate(row.updatedAt)}
                  </p>
                  <p className="text-xs text-fume-600 dark:text-fume-300">{buildMandateBrief(row.context)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/director-pipelines/${encodeURIComponent(row.id)}`}
                    className={pipelineSecondaryButtonClass}
                  >
                    View
                  </Link>
                  <Link to={`/director-pipelines/edit?id=${encodeURIComponent(row.id)}`} className={pipelineSecondaryButtonClass}>
                    Edit
                  </Link>
                  {row.status === 'active' ? (
                    <button type="button" onClick={() => void handleArchive(row.id)} className={pipelineSecondaryButtonClass}>
                      Archive
                    </button>
                  ) : (
                    <>
                      <button type="button" onClick={() => void handleActivate(row.id)} className={pipelinePrimaryButtonClass}>
                        Activate
                      </button>
                      <button type="button" onClick={() => void handleDelete(row.id)} className={pipelineDangerButtonClass}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {active && compareWith ? (
        <section className={pipelineCardClass}>
          <h3 className="text-base font-semibold text-fume-900 dark:text-fume-100">Season change compare</h3>
          <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
            Compare active vision with one archived baseline.
          </p>
          <div className="mt-3">
            <label className="text-xs font-semibold uppercase tracking-wide text-fume-500 dark:text-fume-400">
              Archived baseline
            </label>
            <select
              value={compareWith.id}
              onChange={(event) => setSelectedCompareId(event.target.value)}
              className="mt-1 w-full rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm"
            >
              {archived.map((row) => (
                <option key={row.id} value={row.id}>
                  {(row.title?.trim() || row.context.club.clubName) + ' · ' + formatDate(row.updatedAt)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-surface-field-border bg-surface-soft p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-fume-500">Active</p>
              <p className="mt-1 text-sm">{active.context.club.clubName}</p>
              <p className="text-xs text-fume-500">{labelForOption(active.context.objectives.primaryObjective)}</p>
              <p className="mt-2 text-xs text-fume-600">{active.context.mandate}</p>
            </div>
            <div className="rounded-lg border border-surface-field-border bg-surface-soft p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-fume-500">Archived</p>
              <p className="mt-1 text-sm">{compareWith.context.club.clubName}</p>
              <p className="text-xs text-fume-500">{labelForOption(compareWith.context.objectives.primaryObjective)}</p>
              <p className="mt-2 text-xs text-fume-600">{compareWith.context.mandate}</p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
