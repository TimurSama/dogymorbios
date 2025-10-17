'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { DoghouseIcon } from '@/components/icons/DogymorbisIcons'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/account')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <DoghouseIcon size={64} className="mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <DoghouseIcon size={80} className="mx-auto mb-4 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dogymorbis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Гуляй, общайся, получай косточки 🦴
          </p>
        </div>

        {mode === 'login' ? (
          <LoginForm onSwitchToRegister={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode('login')} />
        )}
      </div>
    </div>
  )
}


