import { useCallback, useEffect, useState } from 'react'
import { getActiveOrganization } from '../api/organization'
import type { OrganizationRecord } from '../types/organization'

/** Loads the active organization record once (create flow gate). */
export function useActiveOrganization() {
  const [record, setRecord] = useState<OrganizationRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const active = await getActiveOrganization()
      setRecord(active)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Active organization could not be checked.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { record, loading, error, refetch }
}
