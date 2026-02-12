'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Главная страница - редирект на лендинг
 * Для новых пользователей показываем лендинг
 * Для авторизованных - дашборд
 */
export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Проверяем авторизацию (можно добавить проверку через контекст)
    // Пока всегда редиректим на лендинг
    router.push('/landing')
  }, [router])

  return null
}

