'use client'

import { createContext, useContext, useState } from 'react'

import { clientSessionToken } from '@/config/http'
import { loadFromStorage } from '@/hooks/useLocalStorage'

interface User {
  id: string
  name: string
  email: string
  roles: string[]
}

const AuthContext = createContext<{ user?: undefined | User; setUser: (user: any) => void }>({
  user: undefined,
  setUser: (user: any) => {},
})

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AppProvider')
  }
  return context
}

export default function AuthProvider({ children, initialToken }: { children: React.ReactNode; initialToken: string }) {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialToken ?? ''
    }
  })

  const item = loadFromStorage('user')
  const [user, setUser] = useState(item)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
