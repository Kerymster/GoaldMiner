import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUnauthorizedHandler } from '../api/unauthorized'
import { supabase } from '../supabaseClient'

/**
 * Registers global 401 handling for `fetchJson`: sign out and send the user to login.
 * Must render under `BrowserRouter`.
 */
export function ApiUnauthorizedBridge() {
  const navigate = useNavigate()

  useEffect(() => {
    setUnauthorizedHandler(() =>
      supabase.auth.signOut().then(() => {
        navigate('/login', { replace: true })
      }),
    )
    return () => setUnauthorizedHandler(null)
  }, [navigate])

  return null
}
