import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error: string | null }>
  register: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null; session: Session | null }>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
