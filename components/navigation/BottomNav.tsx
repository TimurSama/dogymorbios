'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, User, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DoghouseIcon } from '@/components/icons/DogymorbisIcons'

const navItems = [
  { id: 'account', label: 'Аккаунт', icon: DoghouseIcon, path: '/account', position: 'left' },
  { id: 'map', label: 'Карта', icon: Map, path: '/map', position: 'center' },
  { id: 'action', label: 'Действие', icon: Zap, path: '/dashboard', position: 'right', isRed: true },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Скрываем навигацию на публичных страницах
  const publicPages = ['/landing', '/register', '/partner-register', '/auth', '/presentation', '/presentation/detailed', '/about', '/investors', '/help', '/contact']
  const isPublicPage = publicPages.some(page => pathname === page || pathname.startsWith(page))

  if (isPublicPage) {
    return null
  }

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'bg-plush-cream backdrop-blur-xl bg-opacity-95',
      'border-t border-plush-graphite/10',
      'shadow-soft-lg',
      'safe-area-bottom'
    )}>
      <div className="flex items-center justify-between h-20 px-4 max-w-screen-xl mx-auto safe-area-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
          const Icon = item.icon
          const isCenter = item.position === 'center'
          const isRed = item.isRed

          return (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={cn(
                'flex flex-col items-center justify-center relative',
                'touch-target',
                'transition-all duration-200',
                isCenter ? 'flex-1' : 'w-16',
                isRed && 'text-plush-alert'
              )}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      'absolute inset-0 rounded-full',
                      isRed 
                        ? 'bg-plush-alert/20' 
                        : 'bg-plush-primary/10'
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  />
                )}
              </AnimatePresence>
              
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                className={cn(
                  'relative z-10',
                  isCenter && 'w-14 h-14 rounded-full bg-plush-primary flex items-center justify-center',
                  isRed && isActive && 'bg-plush-alert'
                )}
              >
                {typeof Icon === 'function' ? (
                  <Icon 
                    size={isCenter ? 28 : 24} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn(
                      'transition-all duration-200',
                      isCenter && 'text-white',
                      isRed && !isCenter && 'text-plush-alert',
                      !isRed && !isCenter && isActive && 'text-plush-primary',
                      !isRed && !isCenter && !isActive && 'text-plush-graphite/60'
                    )}
                  />
                ) : (
                  <Icon 
                    size={isCenter ? 28 : 24} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn(
                      'transition-all duration-200',
                      isCenter && 'text-white',
                      isRed && !isCenter && 'text-plush-alert',
                      !isRed && !isCenter && isActive && 'text-plush-primary',
                      !isRed && !isCenter && !isActive && 'text-plush-graphite/60'
                    )}
                  />
                )}
              </motion.div>
              
              {!isCenter && (
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'text-xs mt-1 relative z-10 font-medium',
                    isRed && 'text-plush-alert',
                    !isRed && isActive && 'text-plush-primary',
                    !isRed && !isActive && 'text-plush-graphite/60'
                  )}
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}

