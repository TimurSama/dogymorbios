'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Home as FeedIcon, User, MessageCircle, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'map', label: 'Карта', icon: Map, path: '/map' },
  { id: 'feed', label: 'Лента', icon: FeedIcon, path: '/feed' },
  { id: 'messages', label: 'Сообщения', icon: MessageCircle, path: '/messages' },
  { id: 'wallet', label: 'Кошелёк', icon: Wallet, path: '/wallet' },
  { id: 'account', label: 'Профиль', icon: User, path: '/account' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'bg-[var(--surface)] dark:bg-[var(--surface)]',
      'border-t border-[var(--outline)]',
      'shadow-soft-lg',
      'safe-area-bottom' // Для устройств с вырезом
    )}>
      <div className="flex items-center justify-around h-16 px-2 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
          const Icon = item.icon

          return (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full relative',
                'touch-target', // Минимум 44x44px
                'transition-all duration-200',
                'state-layer',
                'rounded-lg mx-1',
                isActive
                  ? 'text-[var(--sky)]'
                  : 'text-[var(--text-secondary)]'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[var(--sky)] bg-opacity-10 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  />
                )}
              </AnimatePresence>
              
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                className="relative z-10"
              >
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    'transition-all duration-200',
                    isActive && 'text-[var(--sky)]'
                  )}
                />
              </motion.div>
              
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  scale: isActive ? 1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'text-xs mt-0.5 relative z-10',
                  'font-medium',
                  isActive && 'text-[var(--sky)]'
                )}
              >
                {item.label}
              </motion.span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}

