'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { getUserByEmail } from '@/lib/db'

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    if (formData.password.length < 6) {
      setError('Пароль должен быть минимум 6 символов')
      return
    }

    // Проверка существующего email
    const existingUser = getUserByEmail(formData.email)
    if (existingUser) {
      setError('Пользователь с таким email уже существует')
      return
    }

    setLoading(true)

    const success = await register({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    })
    
    if (!success) {
      setError('Ошибка регистрации. Попробуйте снова')
    }
    
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Регистрация
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          label="Имя и фамилия"
          value={formData.name}
          onChange={handleChange}
          placeholder="Иван Петров"
          required
        />
        
        <Input
          name="username"
          label="Имя пользователя"
          value={formData.username}
          onChange={handleChange}
          placeholder="ivan_petrov"
          required
        />
        
        <Input
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@mail.com"
          required
        />
        
        <Input
          name="password"
          type="password"
          label="Пароль"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          helperText="Минимум 6 символов"
          required
        />
        
        <Input
          name="confirmPassword"
          type="password"
          label="Подтвердите пароль"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
        
        {error && (
          <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          loading={loading}
        >
          Зарегистрироваться
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Уже есть аккаунт?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Войти
          </button>
        </p>
      </div>
    </Card>
  )
}


