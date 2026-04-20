import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

function postLoginPath(state: unknown): string {
  if (!state || typeof state !== 'object') return '/players'
  const from = (state as { from?: Location }).from
  const pathname = from?.pathname
  if (!pathname || !pathname.startsWith('/')) return '/players'
  if (pathname === '/login' || pathname === '/register') return '/players'
  return `${pathname}${from?.search ?? ''}${from?.hash ?? ''}`
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate('/players', { replace: true })
    }
  }, [loading, user, navigate])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error: msg } = await login(email, password)
    setSubmitting(false)
    if (msg) {
      setError(msg)
      return
    }
    navigate(postLoginPath(location.state), { replace: true })
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-shell px-4 font-sans text-fume-900 dark:bg-fume-950 dark:text-fume-100">
      <div className="w-full max-w-sm rounded-xl border border-surface-panel-border bg-surface-panel p-6 shadow-sm">
        <h1 className="text-lg font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Use your Supabase account credentials.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="block text-xs font-medium text-fume-600 dark:text-fume-400">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm outline-none ring-gold-500/40 focus:ring-2 dark:border-fume-700 dark:bg-fume-900"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-xs font-medium text-fume-600 dark:text-fume-400">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm outline-none ring-gold-500/40 focus:ring-2 dark:border-fume-700 dark:bg-fume-900"
            />
          </div>
          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gold-500 px-3 py-2 text-sm font-medium text-fume-950 hover:bg-gold-400 disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-fume-600 dark:text-fume-400">
          No account?{' '}
          <Link to="/register" className="font-medium text-gold-600 hover:text-gold-500 dark:text-gold-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
