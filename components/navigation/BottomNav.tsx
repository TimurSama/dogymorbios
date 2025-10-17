'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Map, Home as FeedIcon, User, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'home', label: 'Главная', icon: Home, path: '/' },
  { id: 'map', label: 'Карта', icon: Map, path: '/map' },
  { id: 'feed', label: 'Лента', icon: FeedIcon, path: '/feed' },
  { id: 'account', label: 'Аккаунт', icon: User, path: '/account' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-around h-16 px-4 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => {
                console.log('Navigating to:', item.path)
                router.push(item.path)
              }}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full relative',
                'transition-colors duration-150 cursor-pointer',
                isActive
                  ? 'text-blue-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-4 top-0 h-1 bg-blue-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn('text-xs mt-1', isActive && 'font-semibold')}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

