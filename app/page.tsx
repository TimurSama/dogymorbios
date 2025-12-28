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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--pastel-lavender)]/20 to-[var(--pastel-pink)]/20 dark:from-[var(--bg)] dark:to-[var(--surface)] p-4 safe-area-top safe-area-bottom">
      <div className="text-center max-w-2xl w-full">
        <DoghouseIcon size={80} className="mx-auto mb-6 text-blue-500" strokeWidth={2} />
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dogymorbis
        </motion.h1>
        
        <motion.p 
          className="text-xl text-[var(--text-secondary)] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Гуляй, общайся, получай косточки 🦴
        </motion.p>
        
        <motion.p 
          className="text-[var(--text-secondary)] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Социальная сеть и DAO для владельцев собак
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-4 md:p-6 mb-8" elevation={1}>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Быстрый переход
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors touch-target"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <link.icon size={32} className={link.color} strokeWidth={2} />
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button 
            variant="honey" 
            size="lg" 
            onClick={() => router.push('/map')}
            className="w-full sm:min-w-[200px]"
          >
            Начать прогулку
          </Button>
          <Button 
            variant="sky" 
            size="lg" 
            onClick={() => router.push('/presentation')}
            className="w-full sm:min-w-[200px]"
          >
            Презентация проекта
          </Button>
        </motion.div>

        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          © 2025 Dogymorbis. Все права защищены
        </p>
      </div>
    </div>
  )
}

