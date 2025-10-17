'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, getCurrentUser, login as dbLogin, logout as dbLogout, register as dbRegister } from '@/lib/db'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: { email: string; password: string; name: string; username: string }) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Загружаем текущего пользователя при монтировании
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const loggedUser = dbLogin(email, password)
    if (loggedUser) {
      setUser(loggedUser)
      return true
    }
    return false
  }

  const register = async (data: { 
    email: string
    password: string
    name: string
    username: string 
  }): Promise<boolean> => {
    try {
      const newUser = dbRegister(data)
      setUser(newUser)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    dbLogout()
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates }
      setUser(updated)
      // В реальном приложении обновить на сервере
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}


