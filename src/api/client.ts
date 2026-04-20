import { supabase } from '../supabaseClient'
import { createApiErr } from '../types/api'
import { getApiBaseUrl } from './config'
import { notifyUnauthorized } from './unauthorized'

/** Paths that must not send `Authorization` (public backend routes). */
const PUBLIC_API_PATHS = new Set<string>(['/api/nationalities'])

function pathWithoutQuery(relativePath: string): string {
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  const q = normalized.indexOf('?')
  return q === -1 ? normalized : normalized.slice(0, q)
}

function isPublicApiPath(relativePath: string): boolean {
  return PUBLIC_API_PATHS.has(pathWithoutQuery(relativePath))
}

function needsBearer(relativePath: string): boolean {
  const base = pathWithoutQuery(relativePath)
  return base.startsWith('/api/') && !isPublicApiPath(relativePath)
}

async function accessTokenForRequest(relativePath: string): Promise<string | null> {
  if (!needsBearer(relativePath)) return null
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await accessTokenForRequest(path)

  if (needsBearer(path) && !token) {
    notifyUnauthorized()
    throw createApiErr(401, 'Not authenticated')
  }

  const headers = new Headers(init?.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const url = `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, {
    ...init,
    headers,
  })
  const text = await res.text()
  let body: unknown = null
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = null
  }
  if (!res.ok) {
    if (res.status === 401) {
      notifyUnauthorized()
    }
    const msg =
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof (body as { error: unknown }).error === 'string'
        ? (body as { error: string }).error
        : res.statusText
    const issues =
      typeof body === 'object' && body !== null && 'issues' in body
        ? (body as { issues: unknown }).issues
        : undefined
    throw createApiErr(res.status, msg, issues)
  }
  return body as T
}
