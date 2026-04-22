import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom'
import {
  authCardClass,
  authErrorClass,
  authFooterClass,
  authFooterLinkClass,
  authFormClass,
  authHeadingClass,
  authInputClass,
  authLabelClass,
  authLeadClass,
  authPageRootClass,
  authSubmitClass,
} from '../../../components/auth/authFormStyles'
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
    <div className={authPageRootClass}>
      <div className={authCardClass}>
        <h1 className={authHeadingClass}>Sign in</h1>
        <p className={authLeadClass}>Use your Supabase account credentials.</p>
        <form className={authFormClass} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className={authLabelClass}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClass}
            />
          </div>
          <div>
            <label htmlFor="login-password" className={authLabelClass}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={authInputClass}
            />
          </div>
          {error ? (
            <p className={authErrorClass} role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" disabled={submitting} className={authSubmitClass}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className={authFooterClass}>
          No account?{' '}
          <Link to="/register" className={authFooterLinkClass}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

