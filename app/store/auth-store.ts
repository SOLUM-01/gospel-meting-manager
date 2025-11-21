import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Admin } from '@/types/admin'

interface AuthState {
  admin: Omit<Admin, 'password'> | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (admin: Omit<Admin, 'password'>, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      setAuth: (admin, token) =>
        set({ admin, token, isAuthenticated: true }),
      logout: () =>
        set({ admin: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

