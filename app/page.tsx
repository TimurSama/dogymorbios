'use client'

import { useRouter } from 'next/navigation'
import { Map, Home as HomeIcon, User, ShoppingBag, Calendar } from 'lucide-react'
import { DoghouseIcon } from '@/components/icons/DogymorbisIcons'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Home() {
  const router = useRouter()
  
  const quickLinks = [
    { label: 'Карта прогулок', path: '/map', icon: Map, color: 'text-blue-500' },
    { label: 'Лента', path: '/feed', icon: HomeIcon, color: 'text-green-500' },
    { label: 'Мой аккаунт', path: '/account', icon: User, color: 'text-purple-500' },
    { label: 'Магазин', path: '/store', icon: ShoppingBag, color: 'text-orange-500' },
    { label: 'События', path: '/events', icon: Calendar, color: 'text-pink-500' },
  ]
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="text-center max-w-2xl w-full">
        <DoghouseIcon size={80} className="mx-auto mb-6 text-blue-500" strokeWidth={2} />
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Dogymorbis
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Гуляй, общайся, получай косточки 🦴
        </p>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Социальная сеть и DAO для владельцев собак
        </p>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Быстрый переход
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => router.push(link.path)}
                className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <link.icon size={32} className={link.color} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => router.push('/map')}
            className="min-w-[200px]"
          >
            Начать прогулку
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => router.push('/presentation')}
            className="min-w-[200px]"
          >
            Презентация проекта
          </Button>
        </div>

        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          © 2025 Dogymorbis. Все права защищены
        </p>
      </div>
    </div>
  )
}

