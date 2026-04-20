import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  authCardClass,
  authErrorClass,
  authFooterClass,
  authFooterLinkClass,
  authFormClass,
  authHeadingClass,
  authInfoClass,
  authInputClass,
  authLabelClass,
  authLeadClass,
  authPageRootClass,
  authSubmitClass,
} from '../../../components/authFormStyles'
import { useAuth } from '../../../hooks/useAuth'

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
    <div className={authPageRootClass}>
      <div className={authCardClass}>
        <h1 className={authHeadingClass}>Create account</h1>
        <p className={authLeadClass}>Register with email and password.</p>
        <form className={authFormClass} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="register-email" className={authLabelClass}>
              Email
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClass}
            />
          </div>
          <div>
            <label htmlFor="register-password" className={authLabelClass}>
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
              className={authInputClass}
            />
          </div>
          {error ? (
            <p className={authErrorClass} role="alert">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className={authInfoClass} role="status">
              {info}
            </p>
          ) : null}
          <button type="submit" disabled={submitting} className={authSubmitClass}>
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className={authFooterClass}>
          Already have an account?{' '}
          <Link to="/login" className={authFooterLinkClass}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
