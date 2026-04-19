import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function RegisterPage() {
  const navigate = useNavigate()
  const { user, loading, register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate('/players', { replace: true })
    }
  }, [loading, user, navigate])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setSubmitting(true)
    const { error: msg, session } = await register(email, password)
    setSubmitting(false)
    if (msg) {
      setError(msg)
      return
    }
    if (session) {
      navigate('/players', { replace: true })
      return
    }
    setInfo('Check your email to confirm your account, then sign in.')
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-shell px-4 font-sans text-fume-900 dark:bg-fume-950 dark:text-fume-100">
      <div className="w-full max-w-sm rounded-xl border border-surface-panel-border bg-surface-panel p-6 shadow-sm">
        <h1 className="text-lg font-semibold tracking-tight">Create account</h1>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">Register with email and password.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="register-email" className="block text-xs font-medium text-fume-600 dark:text-fume-400">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm outline-none ring-gold-500/40 focus:ring-2 dark:border-fume-700 dark:bg-fume-900"
            />
          </div>
          <div>
            <label
              htmlFor="register-password"
              className="block text-xs font-medium text-fume-600 dark:text-fume-400"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
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
          {info ? (
            <p className="text-sm text-sea-700 dark:text-sea-300" role="status">
              {info}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gold-500 px-3 py-2 text-sm font-medium text-fume-950 hover:bg-gold-400 disabled:opacity-60"
          >
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-fume-600 dark:text-fume-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-gold-600 hover:text-gold-500 dark:text-gold-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
